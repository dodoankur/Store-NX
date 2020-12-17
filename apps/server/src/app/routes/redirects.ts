import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import RedirectsService from "../services/redirects"

const router = Router()

router
  .get(
    "/v1/redirects",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getRedirects.bind(this)
  )
  .post(
    "/v1/redirects",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    addRedirect.bind(this)
  )
  .get(
    "/v1/redirects/:id",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getSingleRedirect.bind(this)
  )
  .put(
    "/v1/redirects/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateRedirect.bind(this)
  )
  .delete(
    "/v1/redirects/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    deleteRedirect.bind(this)
  )

function getRedirects(req: Request, res: Response, next: NextFunction) {
  RedirectsService.getRedirects(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSingleRedirect(req: Request, res: Response, next: NextFunction) {
  RedirectsService.getSingleRedirect(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addRedirect(req: Request, res: Response, next: NextFunction) {
  RedirectsService.addRedirect(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateRedirect(req: Request, res: Response, next: NextFunction) {
  RedirectsService.updateRedirect(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function deleteRedirect(req: Request, res: Response, next: NextFunction) {
  RedirectsService.deleteRedirect(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

export default router
