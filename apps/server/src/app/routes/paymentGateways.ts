import { NextFunction, Request, Response, Router } from "express"
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

function getGateway(req: Request, res: Response, next: NextFunction) {
  PaymentGatewaysService.getGateway(req.params.name)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateGateway(req: Request, res: Response, next: NextFunction) {
  PaymentGatewaysService.updateGateway(req.params.name, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

export default router
