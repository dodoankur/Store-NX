class AjaxPaymentFormSettings {
  client: any
  constructor(client) {
    this.client = client
  }

  retrieve() {
    return this.client.get("/payment_form_settings")
  }
}

export default AjaxPaymentFormSettings
