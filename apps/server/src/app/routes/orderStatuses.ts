import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
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

async function getStatuses(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrderStatusesService.getStatuses(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await OrderStatusesService.getSingleStatus(req.params.id)
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

async function addStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrderStatusesService.addStatus(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrderStatusesService.updateStatus(
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

async function deleteStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrderStatusesService.deleteStatus(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
