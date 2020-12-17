import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import CustomerGroupsService from "../services/customers/customerGroups"

const router = Router()

router
  .get(
    "/v1/customer_groups",
    security.checkUserScope.bind(this, security.scope.READ_CUSTOMER_GROUPS),
    getGroups.bind(this)
  )
  .post(
    "/v1/customer_groups",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMER_GROUPS),
    addGroup.bind(this)
  )
  .get(
    "/v1/customer_groups/:id",
    security.checkUserScope.bind(this, security.scope.READ_CUSTOMER_GROUPS),
    getSingleGroup.bind(this)
  )
  .put(
    "/v1/customer_groups/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMER_GROUPS),
    updateGroup.bind(this)
  )
  .delete(
    "/v1/customer_groups/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMER_GROUPS),
    deleteGroup.bind(this)
  )

async function getGroups(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomerGroupsService.getGroups(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomerGroupsService.getSingleGroup(req.params.id)
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

async function addGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomerGroupsService.addGroup(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomerGroupsService.updateGroup(
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

async function deleteGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomerGroupsService.deleteGroup(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
