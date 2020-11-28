class Tokens {
  client: any
  resourceUrl: string
  constructor(client: any) {
    this.client = client
    this.resourceUrl = "/security/tokens"
  }

  list(filter?: any) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(id: string) {
    return this.client.get(`${this.resourceUrl}/${id}`)
  }

  create(data: any) {
    return this.client.post(this.resourceUrl, data)
  }

  update(id: string, data: any) {
    return this.client.put(`${this.resourceUrl}/${id}`, data)
  }

  delete(id: string) {
    return this.client.delete(`${this.resourceUrl}/${id}`)
  }
}

export default Tokens
