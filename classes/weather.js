//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import fetch from "node-fetch"
import NodeCache from "node-cache"
//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const API_KEY = process.env.CWB_API_KEY
const API_PREFIX = "https://opendata.cwa.gov.tw/api/v1/rest/datastore"

const locationArr = [
  "基隆市", "臺北市", "新北市", "桃園市",
  "新竹市", "新竹縣", "苗栗縣", "臺中市",
  "彰化縣", "南投縣", "雲林縣", "嘉義市",
  "嘉義縣", "臺南市", "高雄市", "屏東縣",
  "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣",
  "金門縣", "連江縣",
]
//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
export class CWBWeather {

  constructor() {
    if (CWBWeather._singleton) {
      return CWBWeather._singleton
    }

    this.dataCache = new NodeCache({ stdTTL: 30 * 60 });
    CWBWeather._singleton = this
  }

  fetchWxData = async () => {
    const api_url = encodeURI(`${API_PREFIX}/F-C0032-001?Authorization=${API_KEY}`)
    let wxdata = null
    try {
      const response = await fetch(api_url);
      wxdata = response.json()
      console.log("Fetch CWB Data Done", new Date())
    }
    catch (err) {
      console.log("Fetch CWB Data Failed", err);
    }
    return wxdata
  }

  getWxCachedData = async () => {
    let wxdata = this.dataCache.get("wxdata");
    if (wxdata === undefined) {
      // cache miss
      wxdata = await this.fetchWxData()
      this.dataCache.set("wxdata", wxdata)
    }
    return wxdata
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

  findLocationRecord = async (locName) => {
    let retObj = null
    const wxdata = await this.getWxCachedData()
    if (locName === "") {
      retObj = wxdata
    } else {
      wxdata.records.location.some(loc => {
        if (loc.locationName === locName) {
          retObj = Object.assign({}, loc)
          return true // it's break
        }
        return false  // it's continue
      })
    }

    return retObj
  }

  getRecords = async (locIdx) => {

    if (locIdx < 0 || locIdx >= locationArr.length) {
      console.log("Wrong location index")
      return null
    }

    const retObj = []
    const locName = locationArr[locIdx]

    for (let i = 0; i < 3; i++) {
      retObj.push(await this.get(locName, i))
    }

    return retObj
  }

  get = async (locName, index = 0) => {

    const locationRecord = await this.findLocationRecord(locName)
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