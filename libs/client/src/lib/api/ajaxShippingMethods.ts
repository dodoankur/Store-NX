class AjaxShippingMethods {
  client: any
  constructor(client) {
    this.client = client
  }

  list() {
    return this.client.get("/shipping_methods")
  }
}

export default AjaxShippingMethods
