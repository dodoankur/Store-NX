import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import AppSettingsService from "../services/apps/settings"

const router = Router()

router
  .get(
    "/v1/apps/:key/settings",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getSettings.bind(this)
  )
  .put(
    "/v1/apps/:key/settings",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateSettings.bind(this)
  )

async function getSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await AppSettingsService.getSettings(req.params.key)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await AppSettingsService.updateSettings(
      req.params.key,
      req.body
    )
    if (data) {
      res.send(data)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
