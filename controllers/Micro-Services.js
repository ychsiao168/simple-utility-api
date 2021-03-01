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

  const date = typeof queryString === "undefined" ?
    moment.utc() :
    queryString.length === 13 ?
      moment.unix(queryString / 1000).utc() :
      moment.utc(queryString, "YYYY-MM-DD", true)

  if (!date.isValid()) {
    res.json({ error: "Invalid Date" })
  } else {
    res.json({ unix: date.valueOf(), utc: date.format(dateFormat) + " GMT" })
  }

}

export const handleWhoAmI = (req, res) => {
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  })
}

export const postFileAnalyse = (req, res) => {
  const { originalname, mimetype, size } = req.file
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  })
}
