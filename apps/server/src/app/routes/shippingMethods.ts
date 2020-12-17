import { NextFunction, Request, Response, Router } from "express"
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

function getMethods(req: Request, res: Response, next: NextFunction) {
  ShippingMethodsService.getMethods(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSingleMethod(req: Request, res: Response, next: NextFunction) {
  ShippingMethodsService.getSingleMethod(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addMethod(req: Request, res: Response, next: NextFunction) {
  ShippingMethodsService.addMethod(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateMethod(req: Request, res: Response, next: NextFunction) {
  ShippingMethodsService.updateMethod(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

async function deleteMethod(req: Request, res: Response, next: NextFunction) {
  const result = await ShippingMethodsService.deleteMethod(req.params.id)
  res.status(result ? 200 : 404).end()
}

export default router
