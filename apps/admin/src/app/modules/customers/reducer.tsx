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
  name: "customers",
  initialState: {
    editCustomer: null,
    items: [],
    selected: [],
    hasMore: false,
    totalCount: 0,
    loadingItems: false,
    errorLoadingItems: null,
    search: "",
  },
  reducers: {
    requestCustomer(state) {
      // return Object.assign({}, state, {})
    },
    receiveCustomer(state, action: PayloadAction<any>) {
      state.editCustomer = action.payload
    },
    requestCustomers(state) {
      state.loadingItems = true
    },
    receiveCustomers(
      state,
      action: PayloadAction<{ has_more; total_count; data }>
    ) {
      state.loadingItems = false
      state.hasMore = action.payload.has_more
      state.totalCount = action.payload.total_count
      state.items = action.payload.data
    },
    receiveCustomersError(state, action: PayloadAction<any>) {
      ;(state.loadingItems = false), (state.errorLoadingItems = action.payload)
    },
    selectCustomer(state, action: PayloadAction<any>) {
      state.selected = [...state.selected, action.payload]
    },
    deselectCustomer(state, action: PayloadAction<any>) {
      state.selected = state.selected.filter(id => id !== action.payload)
    },
    deselectAllCustomer(state) {
      state.selected = []
    },
    selectAllCustomer(state) {
      state.selected = state.items.map(item => item.id)
    },
    setFilterSearch(state, action: PayloadAction<any>) {
      state.search = action.payload
    },
    requestMoreCustomers(state) {
      state.loadingItems = true
    },
    receiveCustomersMore(
      state,
      action: PayloadAction<{ has_more; total_count; data }>
    ) {
      state.loadingItems = false
      state.hasMore = action.payload.has_more
      state.totalCount = action.payload.total_count
      state.items = [...state.items, ...action.payload.data]
    },
    deleteCustomersSuccess(state) {},
    setGroupSuccess() {},
  },
  extraReducers: builder => {
    // builder.addCase(fetchFiles.pending, () => {}),
  },
})

export const {
  requestCustomer,
  receiveCustomer,
  requestCustomers,
  receiveCustomers,
  receiveCustomersError,
  selectCustomer,
  deselectCustomer,
  deselectAllCustomer,
  selectAllCustomer,
  setFilterSearch,
  requestMoreCustomers,
  receiveCustomersMore,
  deleteCustomersSuccess,
  setGroupSuccess,
} = productSlice.actions

export default productSlice.reducer

export function clearCustomerDetails() {
  return receiveCustomer(null)
}

const getFilter = (state, offset = 0) => {
  let filter: any = {
    limit: 50,
    offset: offset,
  }

  if (state.customers.search && state.customers.search !== "") {
    filter.search = state.customers.search
  }

  if (state.customerGroups.selectedId) {
    filter.group_id = state.customerGroups.selectedId
  }

  return filter
}

export function fetchCustomers() {
  return async (dispatch, getState) => {
    const state = getState()
    if (!state.customers.loadingItems) {
      dispatch(requestCustomers())
      dispatch(deselectAllCustomer())

      let filter = getFilter(state)

      try {
        const { json } = await api.customers.list(filter)
        dispatch(receiveCustomers(json))
      } catch (error) {
        console.error(error)
        dispatch(receiveCustomersError(error))
      }
    }
  }
}

export function fetchMoreCustomers() {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.customers.loadingItems) {
      dispatch(requestMoreCustomers())

      let filter = getFilter(state, state.customers.items.length)

      return api.customers
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveCustomersMore(json))
        })
        .catch(error => {
          dispatch(receiveCustomersError(error))
        })
    }
  }
}

export function deleteCustomers() {
  return (dispatch, getState) => {
    const state = getState()
    let promises = state.customers.selected.map(customerId =>
      api.customers.delete(customerId)
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(deleteCustomersSuccess())
        dispatch(deselectAllCustomer())
        dispatch(fetchCustomers())
      })
      .catch(err => {})
  }
}

export function deleteCurrentCustomer() {
  return (dispatch, getState) => {
    const state = getState()
    let customer = state.customers.editCustomer

    if (customer && customer.id) {
      return api.customers.delete(customer.id).catch(err => {
        console.log(err)
      })
    }
  }
}

export function setGroup(group_id) {
  return (dispatch, getState) => {
    const state = getState()
    let promises = state.customers.selected.map(customerId =>
      api.customers.update(customerId, { group_id: group_id })
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(setGroupSuccess())
        dispatch(deselectAllCustomer())
        dispatch(fetchCustomers())
      })
      .catch(err => {})
  }
}

export function updateCustomer(data) {
  return (dispatch, getState) => {
    return api.customers
      .update(data.id, data)
      .then(customerResponse => {
        dispatch(receiveCustomer(customerResponse.json))
      })
      .catch(error => {})
  }
}

export function fetchCustomer(customerId) {
  return (dispatch, getState) => {
    dispatch(requestCustomer())

    return api.customers
      .retrieve(customerId)
      .then(customerResponse => {
        dispatch(receiveCustomer(customerResponse.json))
      })
      .catch(error => {})
  }
}

export function updateAddress(customerId, addressId, data) {
  return (dispatch, getState) => {
    return api.customers
      .updateAddress(customerId, addressId, data)
      .then(customerResponse => {
        dispatch(fetchCustomer(customerId))
      })
      .catch(error => {})
  }
}

export function deleteAddress(customerId, addressId) {
  return (dispatch, getState) => {
    return api.customers
      .deleteAddress(customerId, addressId)
      .then(customerResponse => {
        dispatch(fetchCustomer(customerId))
      })
      .catch(error => {})
  }
}

export function setDefaultBillingAddress(customerId, addressId) {
  return (dispatch, getState) => {
    return api.customers
      .setDefaultBillingAddress(customerId, addressId)
      .then(customerResponse => {
        dispatch(fetchCustomer(customerId))
      })
      .catch(error => {})
  }
}

export function setDefaultShippingAddress(customerId, addressId) {
  return (dispatch, getState) => {
    return api.customers
      .setDefaultShippingAddress(customerId, addressId)
      .then(customerResponse => {
        dispatch(fetchCustomer(customerId))
      })
      .catch(error => {})
  }
}

export function fetchProducts() {}
export function setFilterActive(value) {}
export function setFilterDiscontinued(value) {}
export function setFilterOnSale(value) {}
export function setFilterStock(value) {}
