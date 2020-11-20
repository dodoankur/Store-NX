class PaymentGateways {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/payment_gateways"
  }

  retrieve(gatewayName) {
    return this.client.get(`${this.resourceUrl}/${gatewayName}`)
  }

  update(gatewayName: string, data) {
    return this.client.put(`${this.resourceUrl}/${gatewayName}`, data)
  }
}

export default PaymentGateways
