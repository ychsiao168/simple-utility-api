# CLAUDE.md

本檔案提供 Claude Code (claude.ai/code) 在此專案中工作時的指引。

## 常用指令

```bash
npm start          # 啟動伺服器 (node server.js)
npm run start:dev  # 以 nodemon 啟動（熱重載）
```

無測試框架，手動測試 API：
```bash
curl http://localhost:3001/weatherfc/
curl http://localhost:3001/aqi
curl -X POST http://localhost:3001/api/shorturl/new -H 'Content-Type: application/json' -d '{"url":"https://www.google.com"}'
curl http://localhost:3001/api/shorturl/Z1USYUD
```

## 環境變數

透過 `.env` (dotenv) 設定：
- `PORT` — 伺服器埠號（預設 3000）
- `MONGODB_ENABLE` — 設為 `1` 以連線 MongoDB（短網址功能需要）
- `MONGODB_URL` — MongoDB 連線字串
- `CWB_API_KEY` — 中央氣象署 open data API 金鑰（天氣）
- `EPA_API_KEY` — 環境部 open data API 金鑰（空氣品質）
- `LINEBOT_CHANNEL_SECRET`、`LINEBOT_CHANNEL_ACCESS_TOKEN` — LINE Bot 憑證

## 架構

使用 ES modules（package.json 中 `"type": "module"`）。Express 伺服器有三組路由：

### 路由群組（皆在 server.js 掛載）
- **`/` — simple-app 路由**（`routes/simple-app.js`）：台灣天氣（`/weatherfc/:locationName?`）與空氣品質（`/aqi`）端點。為 [simple-utility-app](https://github.com/ychsiao168/simple-utility-app) 的後端。
- **`/` — linebot 路由**（`routes/linebot.js`）：LINE Bot webhook（`POST /webhook`）。
- **`/api` — micro-services 路由**（`routes/micro-services.js`）：時間戳解析、whoami、檔案分析、短網址（MongoDB 支援）。

### 資料類別（Singleton + Cache 模式）
- `classes/weather.js` — `CWBWeather`：從中央氣象署 API（F-C0032-001）取得資料，透過 node-cache 快取（TTL 30 分鐘）。解析天氣要素（Wx、PoP、MinT、CI、MaxT），以索引 0-21 對應台灣各縣市。
- `classes/aqi.js` — `AQIData`：從環境部 API（aqx_p_432）取得資料，同樣的快取模式。依縣市分組 AQI 記錄。

兩個類別皆使用 Singleton 模式（`_singleton` 靜態屬性）與 `NodeCache` 快取 API 回應。

### LINE Bot
- `controllers/SimpleLineBot.js` — 主要事件處理。解析文字指令（`天氣 <編號>`、`空氣 <編號>`）與 postback 事件，回覆天氣/空氣品質資料。
- `controllers/linebot-messages.js` — 訊息模板建構器（carousel、天氣、AQI flex 訊息）。
- `controllers/linebot-richmenu.js` — 區域導覽用的 Rich Menu ID 常數。

### 短網址服務
- `controllers/Micro-Services.js` — 使用 `shorthash2` 雜湊 URL，存入 MongoDB（`models/url.js`）。上限 10 筆文件。
- MongoDB 連線依 `MONGODB_ENABLE=1` 條件啟用；不啟用時天氣/空氣品質/LINE Bot 功能仍可運作。
