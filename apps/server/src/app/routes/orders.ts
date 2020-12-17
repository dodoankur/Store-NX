import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import PaymentGateways from "../paymentGateways"
import OrderAddressService from "../services/orders/orderAddress"
import OrdertDiscountsService from "../services/orders/orderDiscounts"
import OrderItemsService from "../services/orders/orderItems"
import OrdersService from "../services/orders/orders"
import OrdertTansactionsService from "../services/orders/orderTransactions"

const router = Router()

router
  .get(
    "/v1/orders",
    security.checkUserScope.bind(this, security.scope.READ_ORDERS),
    getOrders.bind(this)
  )
  .post(
    "/v1/orders",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    addOrder.bind(this)
  )
  .get(
    "/v1/orders/:id",
    security.checkUserScope.bind(this, security.scope.READ_ORDERS),
    getSingleOrder.bind(this)
  )
  .put(
    "/v1/orders/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    updateOrder.bind(this)
  )
  .delete(
    "/v1/orders/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    deleteOrder.bind(this)
  )

  .put(
    "/v1/orders/:id/recalculate",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    recalculateOrder.bind(this)
  )
  .put(
    "/v1/orders/:id/checkout",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    checkoutOrder.bind(this)
  )
  .put(
    "/v1/orders/:id/cancel",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    cancelOrder.bind(this)
  )
  .put(
    "/v1/orders/:id/close",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    closeOrder.bind(this)
  )

  .put(
    "/v1/orders/:id/billing_address",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    updateBillingAddress.bind(this)
  )
  .put(
    "/v1/orders/:id/shipping_address",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    updateShippingAddress.bind(this)
  )

  .post(
    "/v1/orders/:id/items",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    addItem.bind(this)
  )
  .put(
    "/v1/orders/:id/items/:item_id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    updateItem.bind(this)
  )
  .delete(
    "/v1/orders/:id/items/:item_id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    deleteItem.bind(this)
  )

  .post(
    "/v1/orders/:id/transactions",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    addTransaction.bind(this)
  )
  .put(
    "/v1/orders/:id/transactions/:transaction_id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    updateTransaction.bind(this)
  )
  .delete(
    "/v1/orders/:id/transactions/:transaction_id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    deleteTransaction.bind(this)
  )

  .post(
    "/v1/orders/:id/discounts",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    addDiscount.bind(this)
  )
  .put(
    "/v1/orders/:id/discounts/:discount_id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    updateDiscount.bind(this)
  )
  .delete(
    "/v1/orders/:id/discounts/:discount_id",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    deleteDiscount.bind(this)
  )

  .get(
    "/v1/orders/:id/payment_form_settings",
    security.checkUserScope.bind(this, security.scope.READ_ORDERS),
    getPaymentFormSettings.bind(this)
  )

  .post(
    "/v1/orders/:id/charge",
    security.checkUserScope.bind(this, security.scope.WRITE_ORDERS),
    chargeOrder.bind(this)
  )

async function getOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrdersService.getOrders(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrdersService.getSingleOrder(req.params.id)
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

async function addOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrdersService.addOrder(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrdersService.updateOrder(req.params.id, req.body)
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

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrdersService.deleteOrder(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function recalculateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await OrderItemsService.calculateAndUpdateAllItems(
      req.params.id
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

async function checkoutOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrdersService.checkoutOrder(req.params.id)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function cancelOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrdersService.cancelOrder(req.params.id)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function closeOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await OrdersService.closeOrder(req.params.id)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateBillingAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await OrderAddressService.updateBillingAddress(
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

async function updateShippingAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await OrderAddressService.updateShippingAddress(
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

async function addItem(req: Request, res: Response, next: NextFunction) {
  const order_id = req.params.id
  try {
    const data = await OrderItemsService.addItem(order_id, req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateItem(req: Request, res: Response, next: NextFunction) {
  const order_id = req.params.id
  const item_id = req.params.item_id
  try {
    const data = await OrderItemsService.updateItem(order_id, item_id, req.body)
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

async function deleteItem(req: Request, res: Response, next: NextFunction) {
  const order_id = req.params.id
  const item_id = req.params.item_id
  try {
    const data = await OrderItemsService.deleteItem(order_id, item_id)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function addTransaction(req: Request, res: Response, next: NextFunction) {
  const order_id = req.params.id
  try {
    const data = await OrdertTansactionsService.addTransaction(
      order_id,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const order_id = req.params.id
  const transaction_id = req.params.item_id
  try {
    const data = await OrdertTansactionsService.updateTransaction(
      order_id,
      transaction_id,
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

async function deleteTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const order_id = req.params.id
  const transaction_id = req.params.item_id
  try {
    const data = await OrdertTansactionsService.deleteTransaction(
      order_id,
      transaction_id
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function addDiscount(req: Request, res: Response, next: NextFunction) {
  const order_id = req.params.id
  try {
    const data = await OrdertDiscountsService.addDiscount(order_id, req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateDiscount(req: Request, res: Response, next: NextFunction) {
  const order_id = req.params.id
  const discount_id = req.params.item_id
  try {
    const data = await OrdertDiscountsService.updateDiscount(
      order_id,
      discount_id,
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

async function deleteDiscount(req: Request, res: Response, next: NextFunction) {
  const order_id = req.params.id
  const discount_id = req.params.item_id
  try {
    const data = await OrdertDiscountsService.deleteDiscount(
      order_id,
      discount_id
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getPaymentFormSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const orderId = req.params.id
  try {
    const data = await PaymentGateways.getPaymentFormSettings(orderId)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function chargeOrder(req: Request, res: Response, next: NextFunction) {
  const orderId = req.params.id
  try {
    const isSuccess = await OrdersService.chargeOrder(orderId)
    res.status(isSuccess ? 200 : 500).end()
  } catch (err) {
    next(err)
  }
}

export default router
