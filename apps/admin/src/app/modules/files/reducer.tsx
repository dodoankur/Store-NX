import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../lib"

interface file {
  file: string
  size: number
  modified: string
}

export const fetchFiles = createAsyncThunk(
  "products/fetchFiles",
  async (args, { dispatch }) => {
    try {
      const { json } = await api.files.list()
      return dispatch(receiveFiles(json))
    } catch (error) {
      console.error(error)
    }
  }
)

export const uploadFiles = createAsyncThunk(
  "products/uploadFiles",
  async (form: any, { dispatch }) => {
    try {
      dispatch(filesUploadStart())
      await api.files.upload(form)
      dispatch(filesUploadEnd())
      dispatch(fetchFiles())
    } catch (error) {
      console.error(error)
      dispatch(filesUploadEnd())
    }
  }
)

export const deleteFile = createAsyncThunk(
  "products/deleteFile",
  async (fileName: string, { dispatch }) => {
    try {
      await api.files.delete(fileName)
      return dispatch(fetchFiles())
    } catch (error) {
      console.error(error)
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: {
    files: [],
    uploading: false,
  },
  reducers: {
    receiveFiles(state, action: PayloadAction<[file]>) {
      state.files = action.payload
    },
    filesUploadStart(state) {
      state.uploading = true
    },
    filesUploadEnd(state) {
      state.uploading = false
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFiles.pending, () => {}),
      builder.addCase(uploadFiles.pending, () => {}),
      builder.addCase(deleteFile.pending, () => {})
  },
})

export const {
  receiveFiles,
  filesUploadStart,
  filesUploadEnd,
} = productSlice.actions

export default productSlice.reducer
