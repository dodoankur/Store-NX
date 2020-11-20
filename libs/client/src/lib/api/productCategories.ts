class ProductCategories {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/product_categories"
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(id: string) {
    return this.client.get(`${this.resourceUrl}/${id}`)
  }

  create(data: string) {
    return this.client.post(this.resourceUrl, data)
  }

  update(id: string, data) {
    return this.client.put(`${this.resourceUrl}/${id}`, data)
  }

  delete(id: string) {
    return this.client.delete(`${this.resourceUrl}/${id}`)
  }

  uploadImage(categoryId: string, formData) {
    return this.client.postFormData(
      `${this.resourceUrl}/${categoryId}/image`,
      formData
    )
  }

  deleteImage(id: string) {
    return this.client.delete(`${this.resourceUrl}/${id}/image`)
  }
}

export default ProductCategories
