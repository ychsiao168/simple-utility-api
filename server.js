//------------------------------------------------------------------------------
//  Modules
//------------------------------------------------------------------------------
import "dotenv/config.js"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import simpleAppRoutes from "./routes/simple-app.js"
import linebotRoutes from "./routes/linebot.js"
import microservicesRoutes from "./routes/micro-services.js"

//------------------------------------------------------------------------------
//  Global Variables
//------------------------------------------------------------------------------
const serverPort = process.env.PORT || 3000
const app = express();

//------------------------------------------------------------------------------
//  Code Start
//------------------------------------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static("public"))
app.use("/", simpleAppRoutes)
app.use("/", linebotRoutes)
app.use("/api", microservicesRoutes)
app.set('trust proxy', true);

app.get("/", (req, res) => res.send("simple-utility-api is running"))

if (process.env.MONGODB_ENABLE == 1) {
  mongoose.connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
    })
    .then(() => {
      app.listen(serverPort, () => {
        console.log(`server is running on port ${serverPort} w/ mongoDB`)
      });
    })
    .catch(err => (console.log))

  mongoose.connection.on('error', err => {
    console.log(err);
  });
} else {
  app.listen(serverPort, () => {
    console.log(`server is running on port ${serverPort} w/o mongoDB`)
  });
}

