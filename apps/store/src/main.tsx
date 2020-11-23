import { initOnClient } from "@store/theme"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { applyMiddleware, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import api from "./app/client/api"
import clientSettings from "./app/client/settings"
import * as analytics from "./app/shared/analytics"
import App from "./app/shared/app"
import reducers from "./app/shared/reducers"

declare global {
  interface Window {
    __APP_STATE__: any
    __APP_TEXT__: any
  }
}

const initialState = window.__APP_STATE__
const themeText = window.__APP_TEXT__

initOnClient({
  themeSettings: initialState.app.themeSettings,
  text: themeText,
  language: clientSettings.language,
  api: api,
})

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

analytics.onPageLoad({ state: initialState })

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        console.log("SW registered.")
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
