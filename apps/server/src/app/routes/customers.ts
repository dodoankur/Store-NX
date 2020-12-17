import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import CustomersService from "../services/customers/customers"

const router = Router()

router
  .get(
    "/v1/customers",
    security.checkUserScope.bind(this, security.scope.READ_CUSTOMERS),
    getCustomers.bind(this)
  )
  .post(
    "/v1/customers",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
    addCustomer.bind(this)
  )
  .get(
    "/v1/customers/:id",
    security.checkUserScope.bind(this, security.scope.READ_CUSTOMERS),
    getSingleCustomer.bind(this)
  )
  .put(
    "/v1/customers/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
    updateCustomer.bind(this)
  )
  .delete(
    "/v1/customers/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
    deleteCustomer.bind(this)
  )
  .post(
    "/v1/customers/:id/addresses",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
    addAddress.bind(this)
  )
  .put(
    "/v1/customers/:id/addresses/:address_id",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
    updateAddress.bind(this)
  )
  .delete(
    "/v1/customers/:id/addresses/:address_id",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
    deleteAddress.bind(this)
  )
  .post(
    "/v1/customers/:id/addresses/:address_id/default_billing",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
    setDefaultBilling.bind(this)
  )
  .post(
    "/v1/customers/:id/addresses/:address_id/default_shipping",
    security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
    setDefaultShipping.bind(this)
  )

async function getCustomers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomersService.getCustomers(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CustomersService.getSingleCustomer(req.params.id)
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

async function addCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomersService.addCustomer(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomersService.updateCustomer(req.params.id, req.body)
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

async function deleteCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CustomersService.deleteCustomer(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function addAddress(req: Request, res: Response, next: NextFunction) {
  const customer_id = req.params.id
  try {
    await CustomersService.addAddress(customer_id, req.body)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateAddress(req: Request, res: Response, next: NextFunction) {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  try {
    await CustomersService.updateAddress(customer_id, address_id, req.body)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function deleteAddress(req: Request, res: Response, next: NextFunction) {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  try {
    await CustomersService.deleteAddress(customer_id, address_id)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function setDefaultBilling(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  try {
    await CustomersService.setDefaultBilling(customer_id, address_id)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function setDefaultShipping(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  try {
    await CustomersService.setDefaultShipping(customer_id, address_id)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
