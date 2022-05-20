//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
// todo: class
const CarouselTemplate = {
  type: "flex",
  altText: "myCausouelMessage",
  contents: {
    type: "carousel",
    contents: []
  }
}


const FlexWeatherMessage = {
  type: "flex",
  altText: "This is a Flex Message",
  contents: {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "今日白天",
          "align": "center"
        }
      ]
    },
    "hero": {
      "type": "image",
      "url": "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/png_icon/day/02.png"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "22 - 27℃",
          "align": "center",
          "weight": "bold"
        },
        {
          "type": "text",
          "text": "☂ 99%",
          "align": "center"
        },
        {
          "type": "text",
          "text": "稍有寒意至舒適",
          "align": "center",
          "size": "xs"
        }
      ]
    },
    "size": "nano"
  }
}

const FlexAQIMessage = {
  type: "flex",
  altText: "This is a Flex Message",
  contents: {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "2021/02/08 14:00",
          "size": "xxs",
          "align": "center"
        },
        {
          "type": "text",
          "text": "基隆市/基隆",
          "size": "xl",
          "align": "center",
          "color": "#14b4d0"
        },
        {
          "type": "text",
          "text": "行動站/一般站",
          "color": "#14b4d0",
          "size": "xxs",
          "align": "center"
        },
        {
          "type": "separator"
        },
        {
          "type": "text",
          "text": "空氣品質指標AQI",
          "size": "xxs",
          "align": "center",
          "margin": "sm"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "133",
              "size": "3xl",
              "weight": "bold",
              "align": "center"
            }
          ],
          "borderColor": "#ff00ff",
          "borderWidth": "bold",
          "width": "33%",
          "offsetStart": "33%",
          "offsetEnd": "33%",
          "cornerRadius": "50px"
        },
        {
          "type": "text",
          "text": "良好",
          "size": "xxs",
          "wrap": true,
          "align": "center"
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "PM2.5\n(μg/m3)\n細懸浮微粒",
              "wrap": true,
              "size": "xxs",
              "gravity": "center",
              "flex": 4
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "移動平均\t",
                      "size": "xxs",
                      "gravity": "center"
                    },
                    {
                      "type": "text",
                      "text": "13",
                      "align": "end",
                      "size": "xl"
                    }
                  ]
                },
                {
                  "type": "separator"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "小時濃度",
                      "size": "xxs",
                      "gravity": "center"
                    },
                    {
                      "type": "text",
                      "text": "13",
                      "align": "end",
                      "size": "xl"
                    }
                  ]
                }
              ],
              "flex": 8
            }
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "PM10\n(μg/m3)\n懸浮微粒",
              "size": "xxs",
              "wrap": true,
              "gravity": "center",
              "flex": 4
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "移動平均\t",
                      "size": "xxs",
                      "gravity": "center"
                    },
                    {
                      "type": "text",
                      "text": "22",
                      "align": "end",
                      "size": "xl"
                    }
                  ]
                },
                {
                  "type": "separator"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "小時濃度\t",
                      "size": "xxs",
                      "gravity": "center"
                    },
                    {
                      "type": "text",
                      "text": "25",
                      "size": "xl",
                      "align": "end"
                    }
                  ]
                }
              ],
              "flex": 8
            }
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "O3\n(ppb)\n臭氧",
              "wrap": true,
              "size": "xxs",
              "gravity": "center",
              "flex": 4
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "8小時\n移動平均",
                      "gravity": "center",
                      "size": "xxs",
                      "wrap": true
                    },
                    {
                      "type": "text",
                      "text": "44",
                      "size": "xl",
                      "align": "end"
                    }
                  ]
                },
                {
                  "type": "separator"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "小時濃度",
                      "size": "xxs",
                      "gravity": "center"
                    },
                    {
                      "type": "text",
                      "text": "52.2",
                      "size": "xl",
                      "align": "end"
                    }
                  ]
                }
              ],
              "flex": 8
            }
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "CO\n(ppm)\n一氧化碳",
              "size": "xxs",
              "wrap": true,
              "gravity": "center",
              "flex": 4
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "8小時\n移動平均",
                      "size": "xxs",
                      "gravity": "center",
                      "wrap": true
                    },
                    {
                      "type": "text",
                      "text": "0.30",
                      "size": "xl",
                      "align": "end"
                    }
                  ]
                },
                {
                  "type": "separator"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "小時濃度",
                      "size": "xxs",
                      "gravity": "center"
                    },
                    {
                      "type": "text",
                      "text": "0.28",
                      "size": "xl",
                      "align": "end"
                    }
                  ]
                }
              ],
              "flex": 8
            }
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "SO2(ppb)\n二氧化硫",
              "size": "xxs",
              "wrap": true,
              "gravity": "center",
              "flex": 4
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "小時濃度",
                  "size": "xxs",
                  "gravity": "center"
                },
                {
                  "type": "text",
                  "text": "1.3",
                  "size": "xl",
                  "align": "end",
                  "gravity": "center"
                }
              ],
              "flex": 8
            }
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "NO2(ppb)\n二氧化氮",
              "size": "xxs",
              "wrap": true,
              "gravity": "center",
              "flex": 4,
              "margin": "none"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "小時濃度",
                  "size": "xxs",
                  "gravity": "center"
                },
                {
                  "type": "text",
                  "text": "5.6",
                  "size": "xl",
                  "align": "end",
                  "gravity": "center"
                }
              ],
              "flex": 8
            }
          ]
        },
        {
          "type": "separator"
        }
      ]
    },
    "size": "kilo",
    "styles": {
      "footer": {
        "separator": true
      }
    }
  }
}

export const MainMenuMessage = {
  type: "flex",
  altText: "This is a Flex Message",
  contents: {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "基隆市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣0"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣0"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "臺北市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣1"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣1"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "新北市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣2"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣2"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "桃園市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣3"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣3"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "新竹市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣4"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣4"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "新竹縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣5"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣5"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "苗栗縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣6"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣6"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "臺中市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣7"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣7"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "彰化縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣8"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣8"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "南投縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣9"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣9"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "雲林縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣10"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣10"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "嘉義市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣11"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣11"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "嘉義縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣12"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣12"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "臺南市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣13"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣13"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "高雄市"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣14"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣14"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "屏東縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣15"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣15"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "宜蘭縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣16"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣16"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "花蓮縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣17"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣17"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "臺東縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣18"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣18"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "澎湖縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣19"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣19"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "金門縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣20"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣20"
              }
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "連江縣"
            },
            {
              "type": "text",
              "text": "天氣 ",
              "action": {
                "type": "message",
                "label": "action",
                "text": "天氣21"
              }
            },
            {
              "type": "text",
              "text": "空氣",
              "action": {
                "type": "message",
                "label": "action",
                "text": "空氣21"
              }
            }
          ]
        }
      ]
    }
  }
}

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
export const createWeatherMessage = (record) => {
  //let retObj = Object.assign({}, FlexWeatherMessage)        // not work !!!
  let retObj = JSON.parse(JSON.stringify(FlexWeatherMessage)) // deep clone
  const { wx, pop, mint, ci, maxt, startTime, endTime, titleTimeString, periodString, wxIndex } = record
  retObj.contents.hero.url = getWxImgUrl(wxIndex, startTime)
  retObj.contents.header.contents[0].text = periodString
  retObj.contents.body.contents[0].text = `${mint} - ${maxt} ℃`
  retObj.contents.body.contents[1].text = `☂ ${pop}%`
  retObj.contents.body.contents[2].text = `${ci}`

  return retObj
}

const getWxImgUrl = (index, startTime) => {
  const [, sHour] = startTime.split(" ")
  const DayOrNight = (sHour === "06:00:00" || sHour === "12:00:00") ? "day" : "night"
  const BaseURL = process.env.BASE_URL === undefined ?
    "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/png_icon" :
    process.env.BASE_URL + "/images"

  return `${BaseURL}/${DayOrNight}/${index.toString().padStart(2, "0")}.png`
}

export const createCarouselMessage = (records, altText, fSingleMsg) => {

  let retMsg = JSON.parse(JSON.stringify(CarouselTemplate)) // deep clone
  retMsg.altText = altText
  records.forEach(r => {
    retMsg.contents.contents.push(fSingleMsg(r).contents)
  })

  return retMsg
}

const _getAQIColor = (aqi) => {
  if (aqi < 51) {
    return "#00FF00"  // GREEN
  } else if (aqi < 101) {
    return "#FFDE33"  // YELLOW
  } else if (aqi < 151) {
    return "#FFA500"  // ORANGE
  } else if (aqi < 201) {
    return "#FF6347"  // RED
  } else if (aqi < 301) {
    return "#BA55D3"  // PURPLE
  } else if (aqi < 501) {
    return "#FF00FF"  // LIGHT PURPLE
  }
  return "#000000"
}

export const createAQIMessage = (record) => {

  let retMsg = JSON.parse(JSON.stringify(FlexAQIMessage)) // deep clone

  retMsg.altText = `${record["county"]}/${record["sitename"]} 空氣品質`
  retMsg.contents.body.contents[0].text = `${record["publishtime"]}`
  retMsg.contents.body.contents[1].text = `${record["county"]}/${record["sitename"]}`
  retMsg.contents.body.contents[2].text = "一般站"  // TODO: 建立資料庫
  retMsg.contents.body.contents[5].contents[0].text = `${record["aqi"]}`
  retMsg.contents.body.contents[5].borderColor = _getAQIColor(Number(record["aqi"]))///
  retMsg.contents.body.contents[6].text = `${record.Status}`;
  retMsg.contents.body.contents[8].contents[1].contents[0].contents[1].text = `${record["pm2.5_avg"]}`
  retMsg.contents.body.contents[8].contents[1].contents[2].contents[1].text = `${record["pm2.5"]}`
  retMsg.contents.body.contents[10].contents[1].contents[0].contents[1].text = `${record["pm10_avg"]}`
  retMsg.contents.body.contents[10].contents[1].contents[2].contents[1].text = `${record["pm10"]}`

  retMsg.contents.body.contents[12].contents[1].contents[0].contents[1].text = `${record["o3_8hr"]}`
  retMsg.contents.body.contents[12].contents[1].contents[2].contents[1].text = `${record["o3"]}`

  retMsg.contents.body.contents[14].contents[1].contents[0].contents[1].text = `${record["co_8hr"]}`
  retMsg.contents.body.contents[14].contents[1].contents[2].contents[1].text = `${record["co"]}`

  retMsg.contents.body.contents[16].contents[1].contents[1].text = `${record["so2"]}`
  retMsg.contents.body.contents[18].contents[1].contents[1].text = `${record["no2"]}`

  _fillEmptyItems(retMsg)

  return retMsg
}

const _fillEmptyItems = (msg) => {

  if (!msg.contents.body.contents[0].text) { msg.contents.body.contents[0].text = "..." }
  if (!msg.contents.body.contents[1].text) { msg.contents.body.contents[1].text = "..." }
  if (!msg.contents.body.contents[2].text) { msg.contents.body.contents[2].text = "..." }
  if (!msg.contents.body.contents[5].contents[0].text) { msg.contents.body.contents[5].contents[0].text = "..." }
  if (!msg.contents.body.contents[6].text) { msg.contents.body.contents[6].text = "..." }
  if (!msg.contents.body.contents[8].contents[1].contents[0].contents[1].text) { msg.contents.body.contents[8].contents[1].contents[0].contents[1].text = "..." }

  if (!msg.contents.body.contents[8].contents[1].contents[2].contents[1].text) { msg.contents.body.contents[8].contents[1].contents[2].contents[1].text = "..." }
  if (!msg.contents.body.contents[10].contents[1].contents[0].contents[1].text) { msg.contents.body.contents[10].contents[1].contents[0].contents[1].text = "..." }
  if (!msg.contents.body.contents[10].contents[1].contents[2].contents[1].text) { msg.contents.body.contents[10].contents[1].contents[2].contents[1].text = "..." }

  if (!msg.contents.body.contents[12].contents[1].contents[0].contents[1].text) { msg.contents.body.contents[12].contents[1].contents[0].contents[1].text = "..." }
  if (!msg.contents.body.contents[12].contents[1].contents[2].contents[1].text) { msg.contents.body.contents[12].contents[1].contents[2].contents[1].text = "..." }

  if (!msg.contents.body.contents[14].contents[1].contents[0].contents[1].text) { msg.contents.body.contents[14].contents[1].contents[0].contents[1].text = "..." }
  if (!msg.contents.body.contents[14].contents[1].contents[2].contents[1].text) { msg.contents.body.contents[14].contents[1].contents[2].contents[1].text = "..." }

  if (!msg.contents.body.contents[16].contents[1].contents[1].text) { msg.contents.body.contents[16].contents[1].contents[1].text = "..." }
  if (!msg.contents.body.contents[18].contents[1].contents[1].text) { msg.contents.body.contents[18].contents[1].contents[1].text = "..." }
}

