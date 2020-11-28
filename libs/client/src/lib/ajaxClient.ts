import RestClient from "./restClient"

class AjaxClient extends RestClient {
  getConfig(method: string, data, cookie) {
    const config: any = {
      credentials: this.getCredentialsConfig(this.baseUrl),
      method,
      headers: {
        "Content-Type": "application/json",
      },
    }

    if (cookie) {
      config.headers.Cookie = cookie
    }

    if (data) {
      config.body = JSON.stringify(data)
    }
    return config
  }

  getCredentialsConfig(baseUrl: string) {
    const includePrefix =
      baseUrl.includes("http://") || baseUrl.includes("https://")
    return includePrefix ? "include" : "same-origin"
  }
}

export default AjaxClient
