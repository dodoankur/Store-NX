import cookieParser from "cookie-parser"
import * as express from "express"
import fse from "fs-extra"
import helmet from "helmet"
import path from "path"
import responseTime from "response-time"
import winston from "winston"
import pageRendering from "./app/pageRendering"
import redirects from "./app/redirects"
import robotsRendering from "./app/robotsRendering"
import settings from "./app/settings"
import sitemapRendering from "./app/sitemapRendering"

const app = express()
const port = process.env.port || settings.storeListenPort || 3334

const staticOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365, // One year
}

app.set("trust proxy", 1)
app.use(helmet({ contentSecurityPolicy: false }))
app.get("/images/:entity/:id/:size/:filename", (req, res, next) => {
  // A stub of image resizing (can be done with Nginx)
  const newUrl = `/images/${req.params.entity}/${req.params.id}/${req.params.filename}`
  req.url = newUrl
  next()
})
app.use(express.static("public/content", staticOptions))
app.use(
  "/assets",
  express.static(
    path.join(__dirname, "../../libs/theme/src/lib/assets"),
    staticOptions
  )
)
app.use(
  "/admin",
  express.static(path.resolve(__dirname, "../admin"), staticOptions)
)

app.use("/admin", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../admin", "index.html"))
})

app.use("/", (req, res, next) => {
  if (fse.existsSync(path.resolve(__dirname, "../store/index.html"))) {
    fse.moveSync(
      path.resolve(__dirname, "../store/index.html"),
      path.resolve(__dirname, "../store/assets/index.html"),
      { overwrite: true }
    )
  }
  next()
})
app.use("/", express.static(path.resolve(__dirname, "../store"), staticOptions))

app.get(
  /^.+\.(jpg|jpeg|gif|png|bmp|ico|webp|svg|css|js|zip|rar|flv|swf|xls)$/,
  (req, res) => {
    // Send 404 image
    res.status(404)
  }
)
app.get("/robots.txt", robotsRendering)
app.get("/sitemap.xml", sitemapRendering)
app.get("*", redirects)
app.use(responseTime())
app.use(cookieParser(settings.cookieSecretKey))

app.get("*", pageRendering)

const server = app.listen(port, () => {
  winston.info(`Store running at http://localhost:${port}`)
})
server.on("error", console.error)
