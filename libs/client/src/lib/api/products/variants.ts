class ProductVariants {
  client: any
  constructor(client) {
    this.client = client
  }

  list(productId: string) {
    return this.client.get(`/products/${productId}/variants`)
  }

  create(productId: string, data) {
    return this.client.post(`/products/${productId}/variants`, data)
  }

  update(productId: string, variantId: string, data) {
    return this.client.put(`/products/${productId}/variants/${variantId}`, data)
  }

  delete(productId: string, variantId: string) {
    return this.client.delete(`/products/${productId}/variants/${variantId}`)
  }

  setOption(productId: string, variantId: string, data) {
    return this.client.put(
      `/products/${productId}/variants/${variantId}/options`,
      data
    )
  }
}

export default ProductVariants
