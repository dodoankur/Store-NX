class WebStoreServices {
  client: any
  constructor(client) {
    this.client = client
  }

  list(serviceID: string) {
    return this.client.get(`/services/${serviceID}/logs`)
  }
}

export default WebStoreServices
