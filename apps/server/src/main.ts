import { json, urlencoded } from "body-parser"
import * as cookieParser from "cookie-parser"
import * as express from "express"
import * as helmet from "helmet"
import * as responseTime from "response-time"
import ajaxRouter from "./app/ajaxRouter"
import apiRouter from "./app/apiRouter"
import dashboardWebSocket from "./app/lib/dashboardWebSocket"
import logger from "./app/lib/logger"
import security from "./app/lib/security"
import settings from "./app/lib/settings"

const app = express()
const port = process.env.port || settings.apiListenPort || 3333

security.applyMiddleware(app)
app.set("trust proxy", 1)
app.use(helmet({ contentSecurityPolicy: false }))
app.all("*", (req, res, next) => {
  // CORS headers
  res.header(
    "Access-Control-Allow-Origin",
    security.getAccessControlAllowOrigin()
  )
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization"
  )
  next()
})
app.use(responseTime())
app.use(cookieParser(settings.cookieSecretKey))
app.use(urlencoded({ extended: true }))
app.use(json())
app.use("/ajax", ajaxRouter)
app.use("/api", apiRouter)
app.use(logger.sendResponse)

const server = app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}/`)
})

dashboardWebSocket.listen(server)

server.on("error", console.error)
