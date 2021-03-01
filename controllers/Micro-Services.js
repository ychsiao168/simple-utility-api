//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import moment from "moment"

//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
export const handleTimestamp = (req, res) => {
  const { queryString } = req.params
  const dateFormat = "ddd, DD MMM yyyy HH:mm:ss"

  if (typeof queryString === "undefined") {
    // return now when no query string
    return res.json({ unix: moment.utc().valueOf(), utc: moment.utc().format(dateFormat) + " GMT" })
  }

  const date = queryString.length === 13 ?
    moment.unix(queryString / 1000).utc() :
    moment.utc(queryString)

  if (!date.isValid()) {
    res.json({ error: "Invalid Date" })
  } else {
    res.json({ unix: date.valueOf(), utc: date.format(dateFormat) + " GMT" })
  }

}