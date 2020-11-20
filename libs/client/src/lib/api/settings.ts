class Settings {
  client: any
  resourceUrl: string
  constructor(client: any) {
    this.client = client
    this.resourceUrl = "/settings"
  }

  retrieve() {
    return this.client.get(this.resourceUrl)
  }

  update(data: any) {
    return this.client.put(this.resourceUrl, data)
  }

  retrieveEmailSettings() {
    return this.client.get(`${this.resourceUrl}/email`)
  }

  updateEmailSettings(data: any) {
    return this.client.put(`${this.resourceUrl}/email`, data)
  }

  retrieveImportSettings() {
    return this.client.get(`${this.resourceUrl}/import`)
  }

  updateImportSettings(data: any) {
    return this.client.put(`${this.resourceUrl}/import`, data)
  }

  retrieveEmailTemplate(name: string) {
    return this.client.get(`${this.resourceUrl}/email/templates/${name}`)
  }

  updateEmailTemplate(name: string, data: any) {
    return this.client.put(`${this.resourceUrl}/email/templates/${name}`, data)
  }

  uploadLogo(formData: any) {
    return this.client.postFormData(`${this.resourceUrl}/logo`, formData)
  }

  deleteLogo() {
    return this.client.delete(`${this.resourceUrl}/logo`)
  }
}

export default Settings
