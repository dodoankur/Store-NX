class WebStoreServices {
  client: any
  constructor(client) {
    this.client = client
  }

  call(serviceID: string, actionID: string) {
    return this.client.post(`/services/${serviceID}/actions/${actionID}`)
  }
}

export default WebStoreServices
