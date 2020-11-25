import cookieParser from "cookie-parser"
import * as express from "express"
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
app.use(express.static(path.join(__dirname, "../admin")))

const adminIndexPath = path.resolve("public/admin/index.html")
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
app.use("/assets", express.static("theme/assets", staticOptions))
app.use("/admin-assets", express.static("public/admin-assets", staticOptions))
app.use("/admin", (req, res) => {
  res.sendFile(adminIndexPath)
})
app.get(
  /^.+\.(jpg|jpeg|gif|png|bmp|ico|webp|svg|css|js|zip|rar|flv|swf|xls)$/,
  (req, res) => {
    // Send 404 image
    res.sendFile(path.resolve("public/content/404.svg"))
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
