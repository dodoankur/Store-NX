import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
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

async function getRedirects(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await RedirectsService.getRedirects(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleRedirect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await RedirectsService.getSingleRedirect(req.params.id)
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

async function addRedirect(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await RedirectsService.addRedirect(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateRedirect(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await RedirectsService.updateRedirect(req.params.id, req.body)
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

async function deleteRedirect(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await RedirectsService.deleteRedirect(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
