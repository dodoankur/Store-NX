class OrderDiscounts {
  client: any
  constructor(client) {
    this.client = client
  }

  create(orderId: string, data) {
    return this.client.post(`/orders/${orderId}/discounts`, data)
  }

  update(orderId: string, discountId: string, data) {
    return this.client.put(`/orders/${orderId}/discounts/${discountId}`, data)
  }

  delete(orderId: string, discountId: string) {
    return this.client.delete(`/orders/${orderId}/discounts/${discountId}`)
  }
}

export default OrderDiscounts
