import fse from "fs-extra"
import path from "path"
import winston from "winston"

const filePath = path.resolve(__dirname, "dist/apps/store/index.html")
export let indexHtml = null

try {
  indexHtml = fse.readFileSync(filePath, "utf8")
} catch (err) {
  winston.error("Fail to read file", filePath, err)
}
