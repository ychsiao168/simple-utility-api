//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import express from "express"
import { handleTimestamp, handleWhoAmI, postFileAnalyse } from "../controllers/Micro-Services.js"
import multer from "multer"
//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const router = express.Router()
const upload = multer({ limit: { fileSize: 2000000 /* 2MB */ } })

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
router.get("/timestamp/:queryString?", handleTimestamp)
router.get("/whoami", handleWhoAmI)
router.post("/fileanalyse", upload.single("upfile"), postFileAnalyse)
router.post("/fileanalyse.html/api/fileanalyse", (req, res) => (res.redirect(307, "/api/fileanalyse"))) // only for passing freecamp.org testing

export default router