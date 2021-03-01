//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import "dotenv/config.js"
import express from "express"
import cors from "cors"

import simpleAppRoutes from "./routes/simple-app.js"
import linebotRoutes from "./routes/linebot.js"

//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const serverPort = process.env.PORT || 3000
const app = express();

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use("/", simpleAppRoutes)
app.use("/", linebotRoutes)

app.get("/", (req, res) => res.send("simple-utility-api is running"))

app.listen(serverPort, () => {
  console.log(`server is running on port ${serverPort}`)
});