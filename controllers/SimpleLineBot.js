//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import line from "@line/bot-sdk"
import querystring from "querystring"
import { createCarouselMessage, createWeatherMessage, createAQIMessage, MainMenuMessage } from "./linebot-messages.js"
import { CWBWeather } from "../classes/weather.js"
import { AQIData } from "../classes/aqi.js"
import {
  MENU_MAIN, MENU_WX_ZONES, MENU_WX_NORTHZONE, MENU_WX_MIDDLEZONE, MENU_WX_SOUTHZONE, MENU_WX_EASTZONE,
  MENU_WX_ISLANDZONE, MENU_AQ_ZONES, MENU_AQ_NORTHZONE, MENU_AQ_MIDDLEZONE, MENU_AQ_SOUTHZONE, MENU_AQ_EASTZONE,
  MENU_AQ_ISLANDZONE,
} from "./linebot-richmenu.js"
//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const gWeather = new CWBWeather()
const gAQIData = new AQIData()
const config = {
  channelSecret: process.env.LINEBOT_CHANNEL_SECRET,
  channelAccessToken: process.env.LINEBOT_CHANNEL_ACCESS_TOKEN
}
const client = new line.Client(config);
const helpText = "指令1: 天氣 <地區編號>\n" +
  "指令2: 空氣 <地區編號>\n" +
  "例如: 「天氣 2」可查詢新北市天氣。\n" +
  "例如: 「空氣 9」可查詢南投縣空氣。\n" +
  "地區編號:\n" +
  "基隆市:0,  臺北市:1,  新北市:2,\n" +
  "桃園市:3,  新竹市:4,  新竹縣:5,\n" +
  "苗栗縣:6,  臺中市:7,  彰化縣:8,\n" +
  "南投縣:9,  雲林縣:10, 嘉義市:11,\n" +
  "嘉義縣:12, 臺南市:13, 高雄市:14,\n" +
  "屏東縣:15, 宜蘭縣:16, 花蓮縣:17,\n" +
  "臺東縣:18, 澎湖縣:19, 金門縣:20,\n" +
  "連江縣:21"

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
export const handleLineBot = (req, res) => {
  line.middleware(config)

  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
}


const handleEvent = async (event) => {

  let returnMsg = {}
  const { userId } = event.source

  if (!((event.type === "message" && event.message.type === "text") || (event.type === "postback"))) {
    // 目前僅過濾文字+POSTBACK
    return Promise.resolve(null);
  }

  switch (true) {
    case /測試1/.test(event?.message?.text):
      returnMsg.type = "text"
      returnMsg.text = "5566"
      console.log("測試1")
      break

    case /測試2/.test(event?.message?.text):
      returnMsg.type = "sticker"
      returnMsg.packageId = "11537"
      returnMsg.stickerId = "52002734"
      console.log("測試2")
      break

    case /測試3/.test(event?.message?.text):
      const record = await gWeather.get("新北市", 0)
      returnMsg = createWeatherMessage(record)
      break

    case /天氣\s*(\d+)/.test(event?.message?.text): {
      //console.log("天氣", RegExp.$1)
      const locationIndex = RegExp.$1
      const records = await gWeather.getRecords(locationIndex)
      if (records === null) {
        returnMsg.type = "text"
        returnMsg.text = "地區編號錯誤"
      } else {
        returnMsg = new Array(
          {
            type: "text",
            text: records[0].locationName,
          },
          createCarouselMessage(records, records[0].locationName + "天氣預報", createWeatherMessage),
        )
      }
      break
    }


    case /空氣\s*(\d+)\s*(\d*)/.test(event?.message?.text): {
      //console.log("空氣", RegExp.$1, RegExp.$2)
      const locationIndex = RegExp.$1
      const records = await gAQIData.getRecords(locationIndex)

      if (records === null) {
        returnMsg.type = "text"
        returnMsg.text = "地區編號錯誤"
      } else {

        if (records.length === 1) {
          returnMsg = createAQIMessage(records[0])
        } else {
          returnMsg = new Array(
            {
              type: "text",
              text: `${records[0]["County"]} 空氣品質`,
            },
            createCarouselMessage(records.slice(0, 10), `${records[0]["County"]} 空氣品質`, createAQIMessage),
          )

          if (records.length >= 10) {
            returnMsg.push(
              createCarouselMessage(records.slice(10,), `${records[0]["County"]} 空氣品質`, createAQIMessage)
            )
          }
        }
      }

      break
    }

    case /postback/.test(event.type): {
      const data = querystring.parse(event.postback.data);
      switch (data.menu) {
        case "Home": client.linkRichMenuToUser(userId, MENU_MAIN); break
        case "WX_ZONES": client.linkRichMenuToUser(userId, MENU_WX_ZONES); break
        case "AQ_ZONES": client.linkRichMenuToUser(userId, MENU_AQ_ZONES); break

        case "WX_NorthZone": client.linkRichMenuToUser(userId, MENU_WX_NORTHZONE); break
        case "WX_MiddleZone": client.linkRichMenuToUser(userId, MENU_WX_MIDDLEZONE); break
        case "WX_SouthZone": client.linkRichMenuToUser(userId, MENU_WX_SOUTHZONE); break
        case "WX_EastZone": client.linkRichMenuToUser(userId, MENU_WX_EASTZONE); break
        case "WX_IslandZone": client.linkRichMenuToUser(userId, MENU_WX_ISLANDZONE); break

        case "AQ_NorthZone": client.linkRichMenuToUser(userId, MENU_AQ_NORTHZONE); break
        case "AQ_MiddleZone": client.linkRichMenuToUser(userId, MENU_AQ_MIDDLEZONE); break
        case "AQ_SouthZone": client.linkRichMenuToUser(userId, MENU_AQ_SOUTHZONE); break
        case "AQ_EastZone": client.linkRichMenuToUser(userId, MENU_AQ_EASTZONE); break
        case "AQ_IslandZone": client.linkRichMenuToUser(userId, MENU_AQ_ISLANDZONE); break

        default: client.linkRichMenuToUser(userId, MENU_MAIN); break
      }
      return Promise.resolve(null);
    }

    default:
      // returnMsg = MainMenuMessage
      returnMsg.type = "text"
      returnMsg.text = helpText
      break
  }

  return client.replyMessage(event.replyToken, returnMsg);
}
