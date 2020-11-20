class AjaxPaymentMethods {
  client: any
  constructor(client) {
    this.client = client
  }

  list() {
    return this.client.get("/payment_methods")
  }
}

export default AjaxPaymentMethods
