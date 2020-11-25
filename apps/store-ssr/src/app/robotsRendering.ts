import fse from "fs-extra"
import path from "path"
import api from "./api"

const robotsTemplatePath = "public/robots.template"

const robotsRendering = async (req, res) => {
  try {
    const settingsResponse = await api.settings.retrieve()
    fse.readFile(path.resolve(robotsTemplatePath), "utf8", (err, data) => {
      if (err) {
        res.status(500).end()
      } else {
        const robots = data.replace(/{domain}/g, settingsResponse.json.domain)
        res.header("Content-Type", "text/plain")
        res.send(robots)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export default robotsRendering
