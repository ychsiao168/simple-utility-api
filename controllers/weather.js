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
export const handleWeatherFC = async (req, res) => {

  let { locationName } = req.params

  if (!locationName) {
    locationName = ""
  }

  const data = await gWeather.findLocationRecord(locationName)
  res.send(data)
}


