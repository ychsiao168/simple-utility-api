//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import fetch from "node-fetch"
import NodeCache from "node-cache"
//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const API_KEY = process.env.EPA_API_KEY
const API_PREFIX = "https://data.epa.gov.tw/api/v2"

const siteArr = {
  "基隆市": ["基隆"],
  "臺北市": ["士林", "大同", "中山", "古亭", "松山", "陽明", "萬華"],
  "新北市": ["三重", "土城", "永和", "汐止", "板橋", "林口", "淡水", "菜寮", "新店", "新莊", "萬里", "新北(樹林)", "富貴角", "永和(環河)"],
  "桃園市": ["大園", "中壢", "平鎮", "桃園", "龍潭", "觀音"],
  "新竹市": ["新竹", "新竹(北區)"],
  "新竹縣": ["竹東", "湖口"],
  "苗栗縣": ["三義", "苗栗", "頭份"],
  "臺中市": ["大里", "西屯", "沙鹿", "忠明", "豐原"],
  "彰化縣": ["二林", "彰化", "線西", "彰化(員林)", "彰化(大城)"],
  "南投縣": ["竹山", "南投", "埔里"],
  "雲林縣": ["斗六", "崙背", "麥寮", "臺西"],
  "嘉義市": ["嘉義"],
  "嘉義縣": ["朴子", "新港"],
  "臺南市": ["安南", "善化", "新營", "臺南", "臺南(麻豆)", "臺南(北門)"],
  "高雄市": ["大寮", "小港", "仁武", "左營", "林園", "前金", "前鎮", "美濃", "復興", "楠梓", "鳳山", "橋頭"],
  "屏東縣": ["屏東", "恆春", "潮州", "屏東(琉球)", "屏東(枋寮)"],
  "宜蘭縣": ["冬山", "宜蘭"],
  "花蓮縣": ["花蓮"],
  "臺東縣": ["臺東", "關山"],
  "澎湖縣": ["馬公"],
  "金門縣": ["金門"],
  "連江縣": ["馬祖"],
}

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------

export class AQIData {

  constructor() {
    if (AQIData._singleton) {
      return AQIData._singleton
    }
    this.dataCache = new NodeCache({ stdTTL: 30 * 60 })
    AQIData._singleton = this
  }

  fetchAqiData = async () => {
    const api_url = encodeURI(`${API_PREFIX}/aqx_p_432?api_key=${API_KEY}`)
    let aqidata = null
    try {
      const response = await fetch(api_url)
      aqidata = response.json()
      console.log("Fetch AQI Data Done", new Date())
    } catch (err) {
      console.log("Fetch AQI Data Failed", err);
    }

    return aqidata
  }

  getAqiCachedData = async () => {
    let aqidata = this.dataCache.get("aqidata")
    if (aqidata === undefined) {
      // cache miss
      aqidata = await this.fetchAqiData()
      this.dataCache.set("aqidata", aqidata)
    }
    return aqidata
  }


  getRecords = async (countyIdx) => {
    const countyArr = Object.keys(siteArr)
    const countyName = countyArr[countyIdx]
    const aqidata = await this.getAqiCachedData()
    let retObj = []

    if (countyIdx < 0 || countyIdx >= countyArr.length) {
      console.log("Wrong county index")
      return null
    }

    if (aqidata.records !== null) {
      aqidata.records.forEach(r => {
        if (r.county === countyName) {
          retObj.push(r)
        }
      })
    }
    return retObj
  }
}