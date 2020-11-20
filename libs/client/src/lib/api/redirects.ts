class Redirects {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/redirects"
  }

  list() {
    return this.client.get(this.resourceUrl)
  }

  retrieve(id: string) {
    return this.client.get(`${this.resourceUrl}/${id}`)
  }

  create(data) {
    return this.client.post(this.resourceUrl, data)
  }

  update(id: string, data) {
    return this.client.put(`${this.resourceUrl}/${id}`, data)
  }

  delete(id: string) {
    return this.client.delete(`${this.resourceUrl}/${id}`)
  }
}

export default Redirects
