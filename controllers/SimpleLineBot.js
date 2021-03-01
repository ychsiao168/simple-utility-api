//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import line from "@line/bot-sdk"
import { createCarouselMessage, createWeatherMessage, createAQIMessage, MainMenuMessage } from "./linebot-messages.js"
import { CWBWeather } from "./Weather.js"
import { AQIData } from "./EpaData.js"

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


function handleEvent(event) {

  let returnMsg = {}

  if (event.type !== "message" || event.message.type !== "text") {
    // 目前僅過濾文字
    return Promise.resolve(null);
  }

  switch (true) {
    case /測試1/.test(event.message.text):
      returnMsg.type = "text"
      returnMsg.text = "5566"
      console.log("測試1")
      break

    case /測試2/.test(event.message.text):
      returnMsg.type = "sticker"
      returnMsg.packageId = "11537"
      returnMsg.stickerId = "52002734"
      console.log("測試2")
      break

    case /測試3/.test(event.message.text):
      const record = gWeather.get("新北市", 0)
      returnMsg = createWeatherMessage(record)
      break

    case /天氣\s*(\d+)/.test(event.message.text): {
      console.log("天氣", RegExp.$1)
      const locationIndex = RegExp.$1
      const records = gWeather.getRecords(locationIndex)
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


    case /空氣\s*(\d+)\s*(\d*)/.test(event.message.text): {
      console.log("空氣", RegExp.$1, RegExp.$2)
      const locationIndex = RegExp.$1
      const records = gAQIData.getRecords(locationIndex)

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


    default:
      // returnMsg = MainMenuMessage
      returnMsg.type = "text"
      returnMsg.text = helpText
      break
  }

  return client.replyMessage(event.replyToken, returnMsg);
}
