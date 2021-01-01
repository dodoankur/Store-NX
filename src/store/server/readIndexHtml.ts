import fse from "fs-extra"
import path from "path"
import winston from "winston"

const filepath = path.resolve("theme/assets/index.html")
export let indexHtml = null

try {
  indexHtml = fse.readFileSync(filepath, "utf8")
} catch (err) {
  winston.error("Fail to read file", filepath, err)
}
