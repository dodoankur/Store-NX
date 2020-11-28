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
  name: "customerGroups",
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
    requestGroups(state) {
      state.isFetching = true
    },
    receiveGroups(state, action: PayloadAction<any>) {
      state.isFetching = false
      state.isFetched = true
      state.items = action.payload
    },
    receiveErrorGroups(state, action: PayloadAction<any>) {
      state.errorFetch = action.payload
    },
    selectGroup(state, action: PayloadAction<any>) {
      state.selectedId = action.payload
    },
    deselectGroup(state) {
      state.selectedId = null
    },
    requestUpdateGroup(state, action: PayloadAction<any>) {
      state.isSaving = true
    },
    receiveUpdateGroup(state) {
      state.isSaving = false
    },

    errorUpdateGroup(state, action: PayloadAction<any>) {
      state.isSaving = false
      state.errorUpdate = action.payload
    },

    successCreateGroup(state, action: PayloadAction<any>) {},
    successDeleteGroup(state, action: PayloadAction<any>) {},
  },
  extraReducers: builder => {
    // builder.addCase(fetchFiles.pending, () => {})
  },
})

export const {
  requestGroups,
  receiveGroups,
  receiveErrorGroups,
  selectGroup,
  deselectGroup,
  requestUpdateGroup,
  receiveUpdateGroup,
  errorUpdateGroup,
  successCreateGroup,
  successDeleteGroup,
} = productSlice.actions

export default productSlice.reducer

function fetchGroups() {
  return dispatch => {
    dispatch(requestGroups())
    return api.customerGroups
      .list()
      .then(({ status, json }) => {
        json = json.sort((a, b) => a.position - b.position)

        json.forEach((element, index, theArray) => {
          if (theArray[index].name === "") {
            theArray[index].name = `<${messages.draft}>`
          }
        })

        dispatch(receiveGroups(json))
      })
      .catch(error => {
        dispatch(receiveErrorGroups(error))
      })
  }
}

function shouldFetchGroups(state) {
  const groups = state.customerGroups
  if (groups.isFetched || groups.isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchGroupsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGroups(getState())) {
      return dispatch(fetchGroups())
    }
  }
}

export function updateGroup(data) {
  return (dispatch, getState) => {
    dispatch(requestUpdateGroup(data.id))
    return api.customerGroups
      .update(data.id, data)
      .then(({ status, json }) => {
        dispatch(receiveUpdateGroup())
        dispatch(fetchGroups())
      })
      .catch(error => {
        dispatch(errorUpdateGroup(error))
      })
  }
}

export function createGroup(data) {
  return (dispatch, getState) => {
    return api.customerGroups
      .create(data)
      .then(({ status, json }) => {
        dispatch(successCreateGroup(json.id))
        dispatch(fetchGroups())
        dispatch(selectGroup(json.id))
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function deleteGroup(id) {
  return (dispatch, getState) => {
    return api.customerGroups
      .delete(id)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(successDeleteGroup(id))
          dispatch(deselectGroup())
          dispatch(fetchGroups())
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
