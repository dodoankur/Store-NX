import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import PaymentMethodsService from "../services/orders/paymentMethods"

const router = Router()

router
  .get(
    "/v1/payment_methods",
    security.checkUserScope.bind(this, security.scope.READ_PAYMENT_METHODS),
    getMethods.bind(this)
  )
  .post(
    "/v1/payment_methods",
    security.checkUserScope.bind(this, security.scope.WRITE_PAYMENT_METHODS),
    addMethod.bind(this)
  )
  .get(
    "/v1/payment_methods/:id",
    security.checkUserScope.bind(this, security.scope.READ_PAYMENT_METHODS),
    getSingleMethod.bind(this)
  )
  .put(
    "/v1/payment_methods/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_PAYMENT_METHODS),
    updateMethod.bind(this)
  )
  .delete(
    "/v1/payment_methods/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_PAYMENT_METHODS),
    deleteMethod.bind(this)
  )

async function getMethods(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PaymentMethodsService.getMethods(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleMethod(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await PaymentMethodsService.getSingleMethod(req.params.id)
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

async function addMethod(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PaymentMethodsService.addMethod(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateMethod(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PaymentMethodsService.updateMethod(
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

async function deleteMethod(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PaymentMethodsService.deleteMethod(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
