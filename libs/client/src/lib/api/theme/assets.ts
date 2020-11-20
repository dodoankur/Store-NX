class ThemeAssets {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/theme/assets"
  }

  uploadFile(formData) {
    return this.client.postFormData(this.resourceUrl, formData)
  }

  deleteFile(fileName: string) {
    return this.client.delete(`${this.resourceUrl}/${fileName}`)
  }
}

export default ThemeAssets
