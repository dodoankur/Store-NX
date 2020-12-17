import { NextFunction, Request, Response, Router } from "express"
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
    getStatus.bind(this)
  )

function getStatus(req: Request, res: Response, next: NextFunction) {
  res.status(200).send("The Server is Working very well!")
}

function getUpdates(req: Request, res: Response, next: NextFunction) {
  // exec("git pull")
  // exec("nx build:server")
  // exec("nx build:admin")
  // exec("nx build:store")
  res.status(200).send("Cezerin3 has been updated!")
}

export default router
