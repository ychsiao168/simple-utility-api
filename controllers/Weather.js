//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import fetch from "node-fetch"

//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const API_KEY = process.env.CWB_API_KEY
const API_PREFIX = "https://opendata.cwb.gov.tw/api/v1/rest/datastore"
const locationArr = [
  "基隆市", "臺北市", "新北市", "桃園市",
  "新竹市", "新竹縣", "苗栗縣", "臺中市",
  "彰化縣", "南投縣", "雲林縣", "嘉義市",
  "嘉義縣", "臺南市", "高雄市", "屏東縣",
  "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣",
  "金門縣", "連江縣",
]
//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
export const handleWeatherFC = (req, res) => {

  let { locationName } = req.params

  if (!locationName) {
    locationName = ""
  }

  const api_url = encodeURI(`${API_PREFIX}/F-C0032-001?Authorization=${API_KEY}&locationName=${locationName}`)

  fetch(api_url)
    .then(rawData => rawData.json())
    .then(data => {
      res.send(data)
    })
    .catch(err => res.status(400).send(err))
}

export class CWBWeather {

  constructor() {
    this.records = null
    this.timerID = null
    this.init()
  }


  init() {
    const api_url = encodeURI(`${API_PREFIX}/F-C0032-001?Authorization=${API_KEY}`)
    fetch(api_url)
      .then(rawData => rawData.json())
      .then(({ records }) => {
        this.records = records
        console.log("Fetch CWB Data Done", new Date())
      })
      .catch(console.log)

    this.timerID = setTimeout(() => { this.init() }, 60 * 60 * 1000) // update every hour
  }

  _getTimeString = (start, end) => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const today = (new Date(Date.now() - tzoffset)).toISOString().substring(0, 10)
    const [sDate, sHour] = start.split(" ")

    if (sDate === today && (sHour === "06:00:00" || sHour === "12:00:00")) {
      return ("今日白天")
    } else if (sDate === today && sHour === "00:00:00") {
      return ("今日凌晨")
    } else if (sDate === today && sHour === "18:00:00") {
      return ("今晚明晨")
    } else if (sDate !== today && sHour === "00:00:00") {
      return ("今晚明晨")
    } else if (sDate !== today && sHour === "06:00:00") {
      return ("明日白天")
    } else if (sDate !== today && sHour === "18:00:00") {
      return ("明日晚上")
    } else {
      console.log("〇〇〇〇", today, sDate, sHour)
      return ("〇〇〇〇")
    }
  }

  _findLocationRecord = (locName) => {
    let retObj = null
    this.records.location.some(loc => {
      if (loc.locationName === locName) {
        retObj = Object.assign({}, loc)
        return true // it's break
      }
      return false  // it's continue
    })

    return retObj
  }

  getRecords(locIdx) {

    if (locIdx < 0 || locIdx >= locationArr.length) {
      console.log("Wrong location index")
      return null
    }

    const retObj = []
    const locName = locationArr[locIdx]

    for (let i = 0; i < 3; i++) {
      retObj.push(this.get(locName, i))
    }

    return retObj
  }

  get(locName, index = 0) {

    const locationRecord = this._findLocationRecord(locName)
    if (locationRecord) {
      const { weatherElement } = locationRecord

      const [wx, pop, mint, ci, maxt] = weatherElement.map(w => (w.time[index].parameter.parameterName))

      const { startTime, endTime } = weatherElement[0].time[index]
      const wxIndex = weatherElement[0].time[index].parameter.parameterValue
      const titleTimeString =
        `${startTime.substring(5, 16).replace("-", "/").replace(" ", "-")} ~ \
${endTime.substring(5, 16).replace("-", "/").replace(" ", "-")}`

      return {
        wx: wx,
        pop: pop,
        mint: mint,
        ci: ci,
        maxt: maxt,
        startTime: startTime,
        endTime: endTime,
        titleTimeString: titleTimeString, // 06:00 - 18:00
        periodString: this._getTimeString(startTime, endTime),  // 今日白天
        wxIndex: wxIndex,
        locationName: locName,
      }
    }

    return null
  }
}
