class Products {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/products"
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(id: string, filter) {
    return this.client.get(`${this.resourceUrl}/${id}`, filter)
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

  skuExists(productId: string, sku) {
    return this.client.get(`${this.resourceUrl}/${productId}/sku`, { sku })
  }

  slugExists(productId: string, slug) {
    return this.client.get(`${this.resourceUrl}/${productId}/slug`, { slug })
  }
}

export default Products
