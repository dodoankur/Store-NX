import { NextFunction, Request, Response, Router } from "express"
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

function getPages(req: Request, res: Response, next: NextFunction) {
  PagesService.getPages(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSinglePage(req: Request, res: Response, next: NextFunction) {
  PagesService.getSinglePage(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addPage(req: Request, res: Response, next: NextFunction) {
  PagesService.addPage(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updatePage(req: Request, res: Response, next: NextFunction) {
  PagesService.updatePage(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function deletePage(req: Request, res: Response, next: NextFunction) {
  PagesService.deletePage(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

export default router
