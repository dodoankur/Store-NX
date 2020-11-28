import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { api, messages } from "../../lib"

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

const productSlice = createSlice({
  name: "orderStatus",
  initialState: {
    items: [],
    isFetched: false,
    isFetching: false,
    isSaving: false,
    errorFetch: null,
    errorUpdate: null,
    selectedId: "all",
  },
  reducers: {
    requestStatuses(state) {
      state.isFetching = true
    },
    receiveStatuses(state, action: PayloadAction<any>) {
      state.isFetching = false
      state.isFetched = true
      state.items = action.payload
    },
    receiveErrorStatuses(state, action: PayloadAction<any>) {
      state.errorFetch = action.payload
    },
    selectStatus(state, action: PayloadAction<any>) {
      state.selectedId = action.payload
    },
    deselectStatus(state) {
      state.selectedId = null
    },
    requestUpdateStatus(state, action: PayloadAction<any>) {
      state.isSaving = true
    },
    receiveUpdateStatus(state) {
      state.isSaving = false
    },
    errorUpdateStatus(state, action: PayloadAction<any>) {
      state.isSaving = false
      state.errorUpdate = action.payload
    },
    successCreateStatus(state, action: PayloadAction<any>) {},
    successDeleteStatus(state, action: PayloadAction<any>) {},
  },
  extraReducers: builder => {
    // builder.addCase(fetchFiles.pending, () => {}),
  },
})

export const {
  requestStatuses,
  receiveStatuses,
  receiveErrorStatuses,
  selectStatus,
  deselectStatus,
  requestUpdateStatus,
  receiveUpdateStatus,
  errorUpdateStatus,
  successCreateStatus,
  successDeleteStatus,
} = productSlice.actions

export default productSlice.reducer

function fetchStatuses() {
  return dispatch => {
    dispatch(requestStatuses())
    return api.orderStatuses
      .list()
      .then(({ status, json }) => {
        json = json.sort((a, b) => a.position - b.position)

        json.forEach((element, index, theArray) => {
          if (theArray[index].name === "") {
            theArray[index].name = `<${messages.draft}>`
          }
        })

        dispatch(receiveStatuses(json))
      })
      .catch(error => {
        dispatch(receiveErrorStatuses(error))
      })
  }
}

function shouldFetchStatuses(state) {
  const statuses = state.orderStatuses
  if (statuses.isFetched || statuses.isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchStatusesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchStatuses(getState())) {
      return dispatch(fetchStatuses())
    }
  }
}

export function updateStatus(data) {
  return (dispatch, getState) => {
    dispatch(requestUpdateStatus(data.id))
    return api.orderStatuses
      .update(data.id, data)
      .then(({ status, json }) => {
        dispatch(receiveUpdateStatus())
        dispatch(fetchStatuses())
      })
      .catch(error => {
        dispatch(errorUpdateStatus(error))
      })
  }
}

export function createStatus(data) {
  return (dispatch, getState) => {
    return api.orderStatuses
      .create(data)
      .then(({ status, json }) => {
        dispatch(successCreateStatus(json.id))
        dispatch(fetchStatuses())
        dispatch(selectStatus(json.id))
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function deleteStatus(id) {
  return (dispatch, getState) => {
    return api.orderStatuses
      .delete(id)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(successDeleteStatus(id))
          dispatch(deselectStatus())
          dispatch(fetchStatuses())
        } else {
          throw status
        }
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}
