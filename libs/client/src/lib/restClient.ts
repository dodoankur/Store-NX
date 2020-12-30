import fetch from "cross-fetch"
import queryString from "query-string"

class RestClient {
  baseUrl: string
  token?: string
  constructor({ baseUrl, token }: { baseUrl: string; token?: string }) {
    this.baseUrl = baseUrl
    this.token = token
  }

  getConfig(method: string, data?: any, cookie?: any) {
    const config: {
      method: string
      headers: { "Content-Type": string; Authorization: string }
      body?: string
    } = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    }

    if (data) {
      config.body = JSON.stringify(data)
    }
    return config
  }

  postFormDataConfig = formData => ({
    method: "post",
    body: formData,
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  })

  returnStatusAndJson = response =>
    response
      .json()
      .then(json => ({ status: response.status, json }))
      .catch(() => ({ status: response.status, json: null }))

  static returnStatusAndJsonStatic = response =>
    response
      .json()
      .then(json => ({ status: response.status, json }))
      .catch(() => ({ status: response.status, json: null }))

  get(endpoint: string, filter, cookie) {
    return fetch(
      `${this.baseUrl}${endpoint}?${queryString.stringify(filter)}`,
      this.getConfig("get", cookie)
    ).then(this.returnStatusAndJson)
  }

  post(endpoint: string, data) {
    return fetch(this.baseUrl + endpoint, this.getConfig("post", data)).then(
      this.returnStatusAndJson
    )
  }

  postFormData(endpoint: string, formData) {
    return fetch(
      this.baseUrl + endpoint,
      this.postFormDataConfig(formData)
    ).then(this.returnStatusAndJson)
  }

  put(endpoint: string, data) {
    return fetch(this.baseUrl + endpoint, this.getConfig("put", data)).then(
      this.returnStatusAndJson
    )
  }

  delete(endpoint: string) {
    return fetch(this.baseUrl + endpoint, this.getConfig("delete")).then(
      this.returnStatusAndJson
    )
  }
}

export default RestClient
