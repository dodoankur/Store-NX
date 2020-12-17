import { exec } from "child_process"
import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"

const router = Router()

router
  .get(
    "/v1/status",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getStatus.bind(this)
  )
  .get(
    "/v1/status/update",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getUpdates.bind(this)
  )

function getStatus(req: Request, res: Response, next: NextFunction) {
  res.status(200).send("The Server is Working very well!")
}

function getUpdates(req: Request, res: Response, next: NextFunction) {
  exec("git pull", (err, stdout, stderr) => {
    if (err) {
      winston.error(err)
      return
    }
    winston.info(stdout)
  })

  exec("nx build server", (err, stdout, stderr) => {
    if (err) {
      winston.error(err)
      return
    }
    winston.info(stdout)
  })

  exec("nx build admin", (err, stdout, stderr) => {
    if (err) {
      winston.error(err)
      return
    }
    winston.info(stdout)
  })

  exec("nx build store", (err, stdout, stderr) => {
    if (err) {
      winston.error(err)
      return
    }
    winston.info(stdout)
  })

  winston.info("Cezerin3 has been updated!")
  res.status(200).send("Cezerin3 has been updated!")
}

export default router
