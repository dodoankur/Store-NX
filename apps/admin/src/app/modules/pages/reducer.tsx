import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../lib"

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
  name: "pages",
  initialState: {
    pages: [],
    pageEdit: null,
  },
  reducers: {
    receivePages(state, action: PayloadAction<any>) {
      state.pages = action.payload
    },
    receivePage(state, action: PayloadAction<any>) {
      state.pageEdit = action.payload
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchFiles.pending, () => {}),
  },
})

export const { receivePages, receivePage } = productSlice.actions

export default productSlice.reducer

export function fetchPages() {
  return (dispatch, getState) => {
    return api.pages
      .list()
      .then(({ status, json }) => {
        dispatch(receivePages(json))
      })
      .catch(error => {})
  }
}

export function fetchPage(id) {
  return (dispatch, getState) => {
    return api.pages
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receivePage(json))
      })
      .catch(error => {})
  }
}

export function createPage(page) {
  return (dispatch, getState) => {
    return api.pages
      .create(page)
      .then(({ status, json }) => {
        dispatch(fetchPages())
      })
      .catch(error => {})
  }
}

export function updatePage(page) {
  return (dispatch, getState) => {
    return api.pages
      .update(page.id, page)
      .then(({ status, json }) => {
        dispatch(receivePage(json))
      })
      .catch(error => {})
  }
}

export function deletePage(pageId) {
  return (dispatch, getState) => {
    return api.pages
      .delete(pageId)
      .then(({ status, json }) => {
        dispatch(fetchPages())
      })
      .catch(error => {})
  }
}
