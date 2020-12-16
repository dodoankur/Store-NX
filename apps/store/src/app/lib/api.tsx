import CezerinClient from "@store/client"
import { Server } from "@store/config"

const tokenPayload = { email: "store", scopes: ["admin"] }
const STORE_ACCESS_TOKEN = "jwt.sign(tokenPayload, Server.jwtSecretKey)"

const api = new CezerinClient({
  apiBaseUrl: Server.apiBaseUrl,
  ajaxBaseUrl: Server.ajaxBaseUrl,
  apiToken: STORE_ACCESS_TOKEN,
})

export default api

// import CezerinClient from "@store/client"
// import clientSettings from "./settings"

// const api = new CezerinClient({
//   ajaxBaseUrl: clientSettings.ajaxBaseUrl || "/ajax",
// })

// export default api
