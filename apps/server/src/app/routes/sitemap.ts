import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import SitemapService from "../services/sitemap"

const router = Router()

router.get(
  "/v1/sitemap",
  security.checkUserScope.bind(this, security.scope.READ_SITEMAP),
  getPaths.bind(this)
)

async function getPaths(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.query.path) {
      const data = await SitemapService.getSinglePath(
        req.query.path,
        req.query.enabled === "true"
      )

      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    } else {
      const data = await SitemapService.getPaths(req.query.enabled)
      res.send(data)
    }
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
