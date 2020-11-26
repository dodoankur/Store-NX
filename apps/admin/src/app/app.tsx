import React, { useState } from "react"
import { Provider } from "react-redux"
import "./css/flexboxgrid.min.css"
import "./css/style.css"
import { apiWebSoket, auth, settings } from "./lib"
import { fetchSettings } from "./modules/settings/actions"
import Router from "./router"
import store from "./store"

const { connectToWebSocket } = apiWebSoket
const developerMode = settings.developerMode === true
if (developerMode === false) {
  auth.validateCurrentToken()
}

store.dispatch(fetchSettings())

if (window.WebSocket) {
  connectToWebSocket(store)
} else {
  console.info("WebSocket is not supported by your browser.")
}

const App = () => {
  const [databaseOnline, setDatabaseOnline] = useState(true)

  return (
    <React.StrictMode>
      {databaseOnline ? (
        <Provider store={store}>
          <Router />
        </Provider>
      ) : (
        <p>Database is offline!</p>
      )}
    </React.StrictMode>
  )
}

export default App
