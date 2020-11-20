class AppSettings {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/apps"
  }

  retrieve(appKey: string) {
    return this.client.get(`${this.resourceUrl}/${appKey}/settings`)
  }

  update(appKey: string, data) {
    return this.client.put(`${this.resourceUrl}/${appKey}/settings`, data)
  }
}

export default AppSettings
