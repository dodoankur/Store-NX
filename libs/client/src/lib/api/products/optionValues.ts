class ProductOptionValues {
  client: any
  constructor(client) {
    this.client = client
  }

  list(productId: string, optionId: string) {
    return this.client.get(`/products/${productId}/options/${optionId}/values`)
  }

  retrieve(productId, optionId: string, valueId: string) {
    return this.client.get(
      `/products/${productId}/options/${optionId}/values/${valueId}`
    )
  }

  create(productId: string, optionId: string, data) {
    return this.client.post(
      `/products/${productId}/options/${optionId}/values`,
      data
    )
  }

  update(productId: string, optionId: string, valueId: string, data) {
    return this.client.put(
      `/products/${productId}/options/${optionId}/values/${valueId}`,
      data
    )
  }

  delete(productId: string, optionId: string, valueId: string) {
    return this.client.delete(
      `/products/${productId}/options/${optionId}/values/${valueId}`
    )
  }
}

export default ProductOptionValues
