import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../lib"

const productSlice = createSlice({
  name: "apps",
  initialState: {
    account: null,
    services: [],
    service: null,
    serviceSettings: null,
    serviceLogs: null,
    loadingEnableDisableService: false,
  },
  reducers: {
    receiveAccount(state, action: PayloadAction<any>) {
      state.account = action.payload
    },
    receiveServices(state, action: PayloadAction<any>) {
      state.services = action.payload
    },
    receiveService(state, action: PayloadAction<any>) {
      state.service = action.payload
    },
    requestServiceSettings(state) {
      state.serviceSettings = null
    },
    receiveServiceSettings(state, action: PayloadAction<any>) {
      state.serviceSettings = action.payload
    },
    receiveServiceLogs(state, action: PayloadAction<any>) {
      state.serviceLogs = action.payload
    },
    requestEnableDisableService(state) {
      state.loadingEnableDisableService = true
    },
    receiveEnableDisableService(state) {
      state.loadingEnableDisableService = false
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchFiles.pending, () => {})
  },
})

export const {
  receiveAccount,
  receiveServices,
  receiveService,
  requestServiceSettings,
  receiveServiceSettings,
  receiveServiceLogs,
  requestEnableDisableService,
  receiveEnableDisableService,
} = productSlice.actions

export default productSlice.reducer

// export const fetchFiles = createAsyncThunk(
//   "files/fetchFiles",
//   async (args, { dispatch }) => {
//     try {
//       const { json } = await api.files.list()
//       return dispatch(receiveFiles(json))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// )

export const fetchAccount = () => (dispatch, getState) => {
  return api.webstore.account.retrieve().then(({ status, json }) => {
    dispatch(receiveAccount(json))
  })
}

export const updateAccount = account => (dispatch, getState) => {
  return api.webstore.account.update(account).then(({ status, json }) => {
    dispatch(receiveAccount(json))
  })
}

export const updateDeveloperAccount = account => (dispatch, getState) => {
  return api.webstore.account
    .updateDeveloper(account)
    .then(({ status, json }) => {
      dispatch(receiveAccount(json))
    })
}

export const fetchServices = () => (dispatch, getState) => {
  return api.webstore.services.list().then(({ status, json }) => {
    dispatch(receiveServices(json))
  })
}

export const fetchService = serviceId => (dispatch, getState) => {
  return api.webstore.services.retrieve(serviceId).then(({ status, json }) => {
    const service = json
    dispatch(receiveService(service))
    if (service.enabled) {
      dispatch(fetchServiceSettings(serviceId))
      dispatch(fetchServiceLogs(serviceId))
    }
  })
}

export const enableService = serviceId => (dispatch, getState) => {
  dispatch(requestEnableDisableService())
  return api.webstore.services.enable(serviceId).then(({ status, json }) => {
    dispatch(receiveEnableDisableService())
    dispatch(fetchService(serviceId))
  })
}

export const disableService = serviceId => (dispatch, getState) => {
  dispatch(requestEnableDisableService())
  return api.webstore.services.disable(serviceId).then(({ status, json }) => {
    dispatch(receiveEnableDisableService())
    dispatch(fetchService(serviceId))
  })
}

export const fetchServiceSettings = serviceId => (dispatch, getState) => {
  dispatch(requestServiceSettings())
  return api.webstore.services.settings
    .retrieve(serviceId)
    .then(({ status, json }) => {
      const serviceSettings = json
      dispatch(receiveServiceSettings(serviceSettings))
    })
    .catch(error => {})
}

export const updateServiceSettings = (serviceId, settings) => (
  dispatch,
  getState
) => {
  return api.webstore.services.settings
    .update(serviceId, settings)
    .then(({ status, json }) => {
      dispatch(fetchServiceSettings(serviceId))
    })
    .catch(error => {})
}

export const fetchServiceLogs = serviceId => (dispatch, getState) => {
  return api.webstore.services.logs
    .list(serviceId)
    .then(({ status, json }) => {
      dispatch(receiveServiceLogs(json))
    })
    .catch(error => {})
}
