// import fetch from "cross-fetch"
import RestClient from "./restClient"

class WebStoreClient extends RestClient {
  constructor(options) {
    super({ baseUrl: "https://cezerin.domain/v1", token: options.token })
  }

  static authorize = (email: string, adminUrl: string) => {
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, admin_url: adminUrl }),
    }

    // return fetch("https://cezerin.domain/v1/account/authorize", config).then(
    //   RestClient.returnStatusAndJson
    // )
    return "Webstore is currently not working, Help to repair at github!"
  }
}

export default WebStoreClient
