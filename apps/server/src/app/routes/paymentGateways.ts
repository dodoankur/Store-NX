import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import PaymentGatewaysService from "../services/settings/paymentGateways"

const router = Router()

router
  .get(
    "/v1/payment_gateways/:name",
    security.checkUserScope.bind(this, security.scope.READ_PAYMENT_METHODS),
    getGateway.bind(this)
  )
  .put(
    "/v1/payment_gateways/:name",
    security.checkUserScope.bind(this, security.scope.WRITE_PAYMENT_METHODS),
    updateGateway.bind(this)
  )

async function getGateway(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PaymentGatewaysService.getGateway(req.params.name)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateGateway(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PaymentGatewaysService.updateGateway(
      req.params.name,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
