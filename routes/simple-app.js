//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import express from "express"
import { handleWeatherFC } from "../controllers/Weather.js"
import { handleEpaData } from "../controllers/EpaData.js"
//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const router = express.Router()

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
router.get("/weatherfc/:locationName?", handleWeatherFC)
router.get("/epadata/:api_name", handleEpaData)

export default router