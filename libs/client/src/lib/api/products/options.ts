class ProductOptions {
  client: any
  constructor(client) {
    this.client = client
  }

  list(productId: string) {
    return this.client.get(`/products/${productId}/options`)
  }

  retrieve(productId: string, optionId: string) {
    return this.client.get(`/products/${productId}/options/${optionId}`)
  }

  create(productId: string, data) {
    return this.client.post(`/products/${productId}/options`, data)
  }

  update(productId: string, optionId: string, data) {
    return this.client.put(`/products/${productId}/options/${optionId}`, data)
  }

  delete(productId: string, optionId: string) {
    return this.client.delete(`/products/${productId}/options/${optionId}`)
  }
}

export default ProductOptions
