//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import { CWBWeather } from "../classes/weather.js"

//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const gWeather = new CWBWeather()

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
export const handleWeatherFC = (req, res) => {

  let { locationName } = req.params

  if (!locationName) {
    locationName = ""
  }

  const data = gWeather._findLocationRecord(locationName)
  res.send(data)
}


