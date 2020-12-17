import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import ShippingMethodsService from "../services/orders/shippingMethods"

const router = Router()

router
  .get(
    "/v1/shipping_methods",
    security.checkUserScope.bind(this, security.scope.READ_SHIPPING_METHODS),
    getMethods.bind(this)
  )
  .post(
    "/v1/shipping_methods",
    security.checkUserScope.bind(this, security.scope.WRITE_SHIPPING_METHODS),
    addMethod.bind(this)
  )
  .get(
    "/v1/shipping_methods/:id",
    security.checkUserScope.bind(this, security.scope.READ_SHIPPING_METHODS),
    getSingleMethod.bind(this)
  )
  .put(
    "/v1/shipping_methods/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_SHIPPING_METHODS),
    updateMethod.bind(this)
  )
  .delete(
    "/v1/shipping_methods/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_SHIPPING_METHODS),
    deleteMethod.bind(this)
  )

async function getMethods(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ShippingMethodsService.getMethods(req.query)
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
    const data = await ShippingMethodsService.getSingleMethod(req.params.id)
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
    const data = await ShippingMethodsService.addMethod(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateMethod(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ShippingMethodsService.updateMethod(
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
  const result = await ShippingMethodsService.deleteMethod(req.params.id)
  res.status(result ? 200 : 404).end()
}

export default router
