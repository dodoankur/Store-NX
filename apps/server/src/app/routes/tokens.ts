import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import SecurityTokensService from "../services/security/tokens"

const router = Router()

router
  .get(
    "/v1/security/tokens",
    security.checkUserScope.bind(this, security.scope.ADMIN),
    getTokens.bind(this)
  )
  .get(
    "/v1/security/tokens/blacklist",
    security.checkUserScope.bind(this, security.scope.ADMIN),
    getTokensBlacklist.bind(this)
  )
  .post(
    "/v1/security/tokens",
    security.checkUserScope.bind(this, security.scope.ADMIN),
    addToken.bind(this)
  )
  .get(
    "/v1/security/tokens/:id",
    security.checkUserScope.bind(this, security.scope.ADMIN),
    getSingleToken.bind(this)
  )
  .put(
    "/v1/security/tokens/:id",
    security.checkUserScope.bind(this, security.scope.ADMIN),
    updateToken.bind(this)
  )
  .delete(
    "/v1/security/tokens/:id",
    security.checkUserScope.bind(this, security.scope.ADMIN),
    deleteToken.bind(this)
  )
  .post("/v1/authorize", sendDashboardSigninUrl.bind(this))

async function getTokens(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await SecurityTokensService.getTokens(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getTokensBlacklist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await SecurityTokensService.getTokensBlacklist()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleToken(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await SecurityTokensService.getSingleToken(req.params.id)
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

async function addToken(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await SecurityTokensService.addToken(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await SecurityTokensService.updateToken(
      req.params.id,
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

async function deleteToken(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await SecurityTokensService.deleteToken(req.params.id)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function sendDashboardSigninUrl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await SecurityTokensService.sendDashboardSigninUrl(req)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
