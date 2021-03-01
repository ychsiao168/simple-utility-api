//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import express from "express"
import { handleTimestamp, handleWhoAmI } from "../controllers/Micro-Services.js"
//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const router = express.Router()

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
router.get("/timestamp/:queryString?", handleTimestamp)
router.get("/whoami", handleWhoAmI)

export default router