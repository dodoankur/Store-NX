import CezerinClient from "@store/client"
import clientSettings from "./settings"

const api = new CezerinClient({
  ajaxBaseUrl: clientSettings.ajaxBaseUrl || "/ajax",
})

export default api
