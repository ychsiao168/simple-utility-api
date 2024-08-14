//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import moment from "moment"
import Url from "../models/url.js"
import validUrl from "valid-url"
import shortHash from "shorthash2"

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

const _limitDocuments = async (maxDocs) => {
  const count = await Url.countDocuments({}).exec()
  if (count > maxDocs) {
    // delete oldest
    const oldestUrl = await Url.find({}).sort([["_id", +1]]).limit(1).exec()
    await Url.findOneAndDelete({ "_id": oldestUrl[0]._id }).exec()
  }
}

export const postShortUrl = async (req, res) => {
  const { url } = req.body

  if (typeof url === "undefined") {
    return res.json({ error: "invalid url" })
  }

  let newUrl = new Url({
    url: url,
    hash: shortHash(url)
  })

  // check url
  if (!validUrl.isUri(url)) {
    return res.json({ error: "invalid url" })
  }

  // add to db
  const foundUrl = await Url.findOne({ url: url }).exec()
  if (!foundUrl) {
    await newUrl.save()
    await _limitDocuments(10)
  } else {
    newUrl = foundUrl
  }
  res.json({
    original_url: newUrl.url,
    short_url: newUrl.hash
  })

}

export const getShortUrl = (req, res) => {
  const { short_url } = req.params

  if (typeof short_url === "undefined") {
    // return all
    Url.find({}).then((Urls)=>{
      const retArr = Urls.map((url) => ({ original_url: url.url, hash: url.hash }))
      res.json(retArr)
    }).catch((err)=>{
      console.log(err)
      res.status(500).json({ message: "Internal error" })
    })
  } else {
    // return exact one
    Url.findOne({ hash: short_url }).then((found)=>{
      if (found) {
        // res.json({ original_url: found.url })
        res.redirect(found.url)
      } else {
        res.status(404).json({ message: "not found" })
      }
    }).catch((err)=>{
      console.log(err)
      res.status(500).json({ message: "Internal error" })
    })
  }
}