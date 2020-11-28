import CezerinClient from "@store/client"
import jwt from "jsonwebtoken"
import serverSettings from "./settings"

const tokenPayload = { email: "store", scopes: ["admin"] }
const STORE_ACCESS_TOKEN = jwt.sign(tokenPayload, serverSettings.jwtSecretKey)

const api = new CezerinClient({
  apiBaseUrl: serverSettings.apiBaseUrl,
  ajaxBaseUrl: serverSettings.ajaxBaseUrl,
  apiToken: STORE_ACCESS_TOKEN,
})

export default api
