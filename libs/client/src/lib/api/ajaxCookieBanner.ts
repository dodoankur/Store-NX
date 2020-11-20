class AjaxCookieBanner {
  client: any
  constructor(client) {
    this.client = client
  }

  retrieve(data) {
    return this.client.post(`/`, data)
  }
}

export default AjaxCookieBanner
