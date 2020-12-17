import { NextFunction, Request, Response, Router } from "express"
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

function getWebhooks(req: Request, res: Response, next: NextFunction) {
  WebhooksService.getWebhooks(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSingleWebhook(req: Request, res: Response, next: NextFunction) {
  WebhooksService.getSingleWebhook(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addWebhook(req: Request, res: Response, next: NextFunction) {
  WebhooksService.addWebhook(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateWebhook(req: Request, res: Response, next: NextFunction) {
  WebhooksService.updateWebhook(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function deleteWebhook(req: Request, res: Response, next: NextFunction) {
  WebhooksService.deleteWebhook(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

export default router
