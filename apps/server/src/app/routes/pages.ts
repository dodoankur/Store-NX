import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import PagesService from "../services/pages/pages"

const router = Router()

router
  .get(
    "/v1/pages",
    security.checkUserScope.bind(this, security.scope.READ_PAGES),
    getPages.bind(this)
  )
  .post(
    "/v1/pages",
    security.checkUserScope.bind(this, security.scope.WRITE_PAGES),
    addPage.bind(this)
  )
  .get(
    "/v1/pages/:id",
    security.checkUserScope.bind(this, security.scope.READ_PAGES),
    getSinglePage.bind(this)
  )
  .put(
    "/v1/pages/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_PAGES),
    updatePage.bind(this)
  )
  .delete(
    "/v1/pages/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_PAGES),
    deletePage.bind(this)
  )

async function getPages(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PagesService.getPages(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSinglePage(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PagesService.getSinglePage(req.params.id)
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

async function addPage(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PagesService.addPage(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updatePage(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PagesService.updatePage(req.params.id, req.body)
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

async function deletePage(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PagesService.deletePage(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
