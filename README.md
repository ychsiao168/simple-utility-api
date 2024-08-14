# simple-utility-api
features:
- backend of [simple-utility-app](https://github.com/ychsiao168/simple-utility-app), including:
  - Taiwan weather (powered by [CWB opendata](https://opendata.cwa.gov.tw/dist/opendata-swagger.html), api name: F-C0032-001 ) <br>
    related source file:
    - classes/weather.js
    - controllers/weather.js
  - Taiwan air quality (powered by [EPA opendata](https://data.moenv.gov.tw/swagger/), api name: aqx_p_432 ) <br>
    related source file:
    - classes/aqi.js
    - controllers/aqi.js
  - url keeper

- backend of MySimpleLineBot (ID: @497vtswq, or [qr code](https://page.line.me/497vtswq)) <br>
  related source file:
  - controllers/SimpleLineBot.js
  - controllers/linebot-messages.js
  - controllers/linebot-richmenu.js <br>
  <img src="./linebot-preview-1.png" width="400" />
  <img src="./linebot-preview-2.png" width="400" />


# development notes
 - test api
    ```
    curl http://localhost:3001/weatherfc/
    ```
    ```
    curl http://localhost:3001/aqi
    ```
    ```
    curl -X POST http://localhost:3001/api/shorturl/new -H 'Content-Type: application/json' -d '{"url":"https://www.google.com"}'
    ```
    ```
    curl http://localhost:3001/api/shorturl/Z1USYUD
    ```
