import fse from "fs-extra"
import path from "path"
import api from "./api"

const robotsTemplatePath = "public/robots.template"

const robotsRendering = (req, res) => {
  api.settings.retrieve().then(settingsResponse => {
    fse.readFile(path.resolve(robotsTemplatePath), "utf8", (err, data) => {
      if (err) {
        res.status(500).end()
      } else {
        const robots = data.replace(/{domain}/g, settingsResponse.json.domain)
        res.header("Content-Type", "text/plain")
        res.send(robots)
      }
    })
  })
}

export default robotsRendering
