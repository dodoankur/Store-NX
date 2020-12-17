import { NextFunction, Request, Response, Router } from "express"
import PaymentGateways from "../paymentGateways"

const router = Router()

router.post("/v1/notifications/:gateway", paymentNotification.bind(this))

function paymentNotification(req: Request, res: Response, next: NextFunction) {
  PaymentGateways.paymentNotification(req, res, req.params.gateway)
}

export default router
