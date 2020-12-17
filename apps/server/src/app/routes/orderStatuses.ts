import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import OrderStatusesService from "../services/orders/orderStatuses"

const router = Router()

router
  .get(
    "/v1/order_statuses",
    security.checkUserScope.bind(this, security.scope.READ_ORDER_STATUSES),
    getStatuses.bind(this)
  )
  .post(
    "/v1/order_statuses",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDER_STATUSES),
    addStatus.bind(this)
  )
  .get(
    "/v1/order_statuses/:id",
    security.checkUserScope.bind(this, security.scope.READ_ORDER_STATUSES),
    getSingleStatus.bind(this)
  )
  .put(
    "/v1/order_statuses/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDER_STATUSES),
    updateStatus.bind(this)
  )
  .delete(
    "/v1/order_statuses/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDER_STATUSES),
    deleteStatus.bind(this)
  )

function getStatuses(req: Request, res: Response, next: NextFunction) {
  OrderStatusesService.getStatuses(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSingleStatus(req: Request, res: Response, next: NextFunction) {
  OrderStatusesService.getSingleStatus(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addStatus(req: Request, res: Response, next: NextFunction) {
  OrderStatusesService.addStatus(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateStatus(req: Request, res: Response, next: NextFunction) {
  OrderStatusesService.updateStatus(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function deleteStatus(req: Request, res: Response, next: NextFunction) {
  OrderStatusesService.deleteStatus(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

export default router
