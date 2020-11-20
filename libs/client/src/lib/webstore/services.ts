class WebStoreServices {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/services"
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(id: string) {
    return this.client.get(`${this.resourceUrl}/${id}`)
  }

  enable(id: string) {
    return this.client.post(`${this.resourceUrl}/${id}/enable`)
  }

  disable(id: string) {
    return this.client.post(`${this.resourceUrl}/${id}/disable`)
  }
}

export default WebStoreServices
