class Status {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/status"
  }

  get() {
    return this.client.get(this.resourceUrl)
  }

  update() {
    return this.client.get(`${this.resourceUrl}/update`)
  }
}

export default Status
