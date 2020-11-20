class AjaxRegister {
  client: any
  constructor(client) {
    this.client = client
  }

  retrieve(data) {
    return this.client.post(`/register`, data)
  }
}

export default AjaxRegister
