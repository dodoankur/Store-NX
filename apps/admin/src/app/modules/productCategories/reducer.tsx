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
  name: "productCategories",
  initialState: {
    items: [],
    isFetched: false,
    isFetching: false,
    isSaving: false,
    uploadingImage: false,
    errorFetch: null,
    errorUpdate: null,
    selectedId: "all",
  },
  reducers: {
    requestCategories(state) {
      state.isFetching = true
    },
    receiveCategories(state, action: PayloadAction<any>) {
      ;(state.isFetching = false),
        (state.isFetched = true),
        (state.items = action.payload)
    },
    receiveErrorCategories(state, action: PayloadAction<any>) {
      state.errorFetch = action.payload
    },
    selectCategory(state, action: PayloadAction<any>) {
      state.selectedId = action.payload
    },
    deselectCategory(state) {
      state.selectedId = null
    },
    requestUpdateCategory(state, action: PayloadAction<any>) {
      state.isSaving = true
    },
    receiveUpdateCategory(state) {
      state.isSaving = false
    },
    errorUpdateCategory(state, action: PayloadAction<any>) {
      state.isSaving = false
      state.errorUpdate = action.payload
    },
    imageUploadStart(state) {
      state.uploadingImage = true
    },
    imageUploadEnd(state) {
      state.uploadingImage = false
    },
    successCreateCategory(state, action: PayloadAction<any>) {},
    successDeleteCategory(state, action: PayloadAction<any>) {},
    successMoveUpDownCategory(state, action: PayloadAction<any>) {},
    successReplaceCategory(state) {},
  },
  extraReducers: builder => {
    // builder.addCase(fetchFiles.pending, () => {}),
  },
})

export const {
  requestCategories,
  receiveCategories,
  receiveErrorCategories,
  selectCategory,
  deselectCategory,
  requestUpdateCategory,
  receiveUpdateCategory,
  errorUpdateCategory,
  imageUploadStart,
  imageUploadEnd,
  successCreateCategory,
  successDeleteCategory,
  successMoveUpDownCategory,
  successReplaceCategory,
} = productSlice.actions

export default productSlice.reducer

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return api.productCategories
      .list()
      .then(({ status, json }) => {
        json.forEach((element, index, theArray) => {
          if (theArray[index].name === "") {
            theArray[index].name = `<${messages.draft}>`
          }
        })

        dispatch(receiveCategories(json))
      })
      .catch(error => {
        dispatch(receiveErrorCategories(error))
      })
  }
}

function shouldFetchCategories(state) {
  const categories = state.productCategories
  if (categories.isFetched || categories.isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories())
    }
  }
}

function sendUpdateCategory(id, data) {
  return dispatch => {
    dispatch(requestUpdateCategory(id))
    return api.productCategories
      .update(id, data)
      .then(({ status, json }) => {
        dispatch(receiveUpdateCategory())
        dispatch(fetchCategories())
      })
      .catch(error => {
        dispatch(errorUpdateCategory(error))
      })
  }
}

export function updateCategory(data) {
  return (dispatch, getState) => {
    return dispatch(sendUpdateCategory(data.id, data))
  }
}

export function createCategory() {
  return (dispatch, getState) => {
    return api.productCategories
      .create({ enabled: false })
      .then(({ status, json }) => {
        dispatch(successCreateCategory(json.id))
        dispatch(fetchCategories())
        dispatch(selectCategory(json.id))
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function deleteImage() {
  return (dispatch, getState) => {
    const state = getState()
    const categoryId = state.productCategories.selectedId

    return api.productCategories
      .deleteImage(categoryId)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(fetchCategories())
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

export function deleteCategory(id) {
  return (dispatch, getState) => {
    return api.productCategories
      .delete(id)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(successDeleteCategory(id))
          dispatch(deselectCategory())
          dispatch(fetchCategories())
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

function moveCategory(allCategories = [], selectedCategory, isUp = true) {
  return new Promise((resolve, reject) => {
    if (isUp) {
      allCategories = allCategories
        .filter(
          e =>
            e.parent_id === selectedCategory.parent_id &&
            e.id !== selectedCategory.id &&
            e.position < selectedCategory.position
        )
        .sort((a, b) => b.position - a.position)
    } else {
      allCategories = allCategories
        .filter(
          e =>
            e.parent_id === selectedCategory.parent_id &&
            e.id !== selectedCategory.id &&
            e.position > selectedCategory.position
        )
        .sort((a, b) => a.position - b.position)
    }

    if (allCategories.length > 0) {
      let targetCategory = allCategories[0]
      let newPosition = targetCategory.position

      api.productCategories
        .update(selectedCategory.id, { position: targetCategory.position })
        .then(() => {
          api.productCategories
            .update(targetCategory.id, { position: selectedCategory.position })
            .then(() => {
              resolve(newPosition)
            })
            .catch(err => {
              reject(err)
            })
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}

export function moveUpCategory() {
  return (dispatch, getState) => {
    let state = getState()
    var allCategories = state.productCategories.items
    var selectedCategory = allCategories.find(
      item => item.id === state.productCategories.selectedId
    )

    var isUp = true

    return moveCategory(allCategories, selectedCategory, isUp).then(
      newPosition => {
        dispatch(successMoveUpDownCategory(newPosition))
        dispatch(fetchCategories())
      }
    )
  }
}

export function moveDownCategory() {
  return (dispatch, getState) => {
    let state = getState()
    var allCategories = state.productCategories.items
    var selectedCategory = allCategories.find(
      item => item.id === state.productCategories.selectedId
    )
    var isUp = false

    return moveCategory(allCategories, selectedCategory, isUp).then(
      newPosition => {
        dispatch(successMoveUpDownCategory(newPosition))
        dispatch(fetchCategories())
      }
    )
  }
}

export function replaceCategory(parentId) {
  return (dispatch, getState) => {
    let state = getState()
    var selectedCategory = state.productCategories.items.find(
      item => item.id === state.productCategories.selectedId
    )

    return api.productCategories
      .update(selectedCategory.id, { parent_id: parentId })
      .then(({ status, json }) => {
        dispatch(successReplaceCategory())
        dispatch(fetchCategories())
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function uploadImage(form) {
  return (dispatch, getState) => {
    const state = getState()
    const categoryId = state.productCategories.selectedId

    dispatch(imageUploadStart())
    return api.productCategories
      .uploadImage(categoryId, form)
      .then(() => {
        dispatch(imageUploadEnd())
        dispatch(fetchCategories())
      })
      .catch(error => {
        dispatch(imageUploadEnd())
      })
  }
}
