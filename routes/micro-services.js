//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import express from "express"
import { handleTimestamp, handleWhoAmI, postShortUrl, getShortUrl } from "../controllers/Micro-Services.js"

//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const router = express.Router()

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
router.get("/timestamp/:queryString?", handleTimestamp)
router.get("/whoami", handleWhoAmI)
router.post("/shorturl/new", postShortUrl)
router.get("/shorturl/:short_url?", getShortUrl)
export default router
