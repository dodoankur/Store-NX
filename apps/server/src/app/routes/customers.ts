import { NextFunction, Request, Response, Router } from "express"
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

function getCustomers(req: Request, res: Response, next: NextFunction) {
  CustomersService.getCustomers(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSingleCustomer(req: Request, res: Response, next: NextFunction) {
  CustomersService.getSingleCustomer(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addCustomer(req: Request, res: Response, next: NextFunction) {
  CustomersService.addCustomer(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateCustomer(req: Request, res: Response, next: NextFunction) {
  CustomersService.updateCustomer(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function deleteCustomer(req: Request, res: Response, next: NextFunction) {
  CustomersService.deleteCustomer(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

function addAddress(req: Request, res: Response, next: NextFunction) {
  const customer_id = req.params.id
  CustomersService.addAddress(customer_id, req.body)
    .then(data => {
      res.end()
    })
    .catch(next)
}

function updateAddress(req: Request, res: Response, next: NextFunction) {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  CustomersService.updateAddress(customer_id, address_id, req.body)
    .then(data => {
      res.end()
    })
    .catch(next)
}

function deleteAddress(req: Request, res: Response, next: NextFunction) {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  CustomersService.deleteAddress(customer_id, address_id)
    .then(data => {
      res.end()
    })
    .catch(next)
}

function setDefaultBilling(req: Request, res: Response, next: NextFunction) {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  CustomersService.setDefaultBilling(customer_id, address_id)
    .then(data => {
      res.end()
    })
    .catch(next)
}

function setDefaultShipping(req: Request, res: Response, next: NextFunction) {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  CustomersService.setDefaultShipping(customer_id, address_id)
    .then(data => {
      res.end()
    })
    .catch(next)
}

export default router
