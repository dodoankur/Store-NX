import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"

const reducer = combineReducers({
  // here we will be adding reducers
  form: formReducer,
})

const store = configureStore({
  reducer,
})

export default store
