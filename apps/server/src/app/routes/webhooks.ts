import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import WebhooksService from "../services/webhooks"

const router = Router()

router
  .get(
    "/v1/webhooks",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getWebhooks.bind(this)
  )
  .post(
    "/v1/webhooks",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    addWebhook.bind(this)
  )
  .get(
    "/v1/webhooks/:id",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getSingleWebhook.bind(this)
  )
  .put(
    "/v1/webhooks/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateWebhook.bind(this)
  )
  .delete(
    "/v1/webhooks/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    deleteWebhook.bind(this)
  )

async function getWebhooks(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await WebhooksService.getWebhooks(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleWebhook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await WebhooksService.getSingleWebhook(req.params.id)
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

async function addWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await WebhooksService.addWebhook(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await WebhooksService.updateWebhook(req.params.id, req.body)
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

async function deleteWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await WebhooksService.deleteWebhook(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
