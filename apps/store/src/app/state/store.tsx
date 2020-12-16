import { configureStore } from "@reduxjs/toolkit"
import { loadState } from "./loadState"
import reducer from "./reducers"

let state

async function stateLoad() {
  state = await loadState()
}

stateLoad()

const store = configureStore({
  reducer,
  preloadedState: state,
})

export default store
