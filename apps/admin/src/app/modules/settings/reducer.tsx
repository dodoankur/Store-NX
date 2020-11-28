import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "../../lib/api"

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
  name: "settings",
  initialState: {
    exportInProcess: false,
    installInProcess: false,
    settings: {
      language: "en",
      currency_code: "USD",
      currency_symbol: "$",
      currency_format: "${amount}",
      thousand_separator: "",
      decimal_separator: ".",
      decimal_number: 2,
      timezone: "Asia/Singapore",
      date_format: "MMMM D, YYYY",
      time_format: "h:mm a",
      weight_unit: "kg",
      length_unit: "cm",
    },
    emailSettings: null,
    importSettings: null,
    emailTemplate: null,
    checkoutField: null,
    checkoutFields: [],
    commerceSettings: null,
    shippingMethods: [],
    paymentMethods: [],
    shippingMethodEdit: {},
    paymentMethodEdit: {},
    paymentGatewayEdit: {},
    tokens: [],
    tokenEdit: {},
    newToken: null,
    redirects: [],
    redirectEdit: {},
    webhooks: [],
    webhookEdit: {},
    themeSettings: null,
    themeSettingsSchema: null,
  },
  reducers: {
    exportRequest(state) {
      state.exportInProcess = true
    },
    exportReceive(state) {
      state.exportInProcess = false
    },
    installRequest(state) {
      state.installInProcess = true
    },
    installReceive(state) {
      state.installInProcess = false
    },
    receiveSettings(state, action: PayloadAction<any>) {
      state.settings = action.payload
    },
    receiveEmailSettings(state, action: PayloadAction<any>) {
      state.emailSettings = action.payload
    },
    receiveImportSettings(state, action: PayloadAction<any>) {
      state.importSettings = action.payload
    },
    requestEmailTemplate(state) {
      state.emailTemplate = null
    },
    receiveEmailTemplate(state, action: PayloadAction<any>) {
      state.emailTemplate = action.payload
    },
    receiveShippingMethods(state, action: PayloadAction<any>) {
      state.shippingMethods = action.payload
    },
    receivePaymentMethods(state, action: PayloadAction<any>) {
      state.paymentMethods = action.payload
    },
    receiveShippingMethod(state, action: PayloadAction<any>) {
      state.shippingMethodEdit = action.payload
    },
    receivePaymentMethod(state, action: PayloadAction<any>) {
      state.paymentMethodEdit = action.payload
    },
    receivePaymentGateway(state, action: PayloadAction<any>) {
      state.paymentGatewayEdit = action.payload
    },
    requestCheckoutField(state) {
      state.checkoutField = null
    },
    receiveCheckoutField(state, action: PayloadAction<any>) {
      state.checkoutField = action.payload
    },
    requestCommerceSettings(state) {
      state.commerceSettings = null
    },
    receiveCommerceSettings(state, action: PayloadAction<any>) {
      state.commerceSettings = action.payload
    },
    receiveCheckoutFields(state, action: PayloadAction<any>) {
      state.checkoutFields = action.payload
    },
    receiveTokens(state, action: PayloadAction<any>) {
      state.tokens = action.payload
    },
    receiveToken(state, action: PayloadAction<any>) {
      state.tokenEdit = action.payload
      state.newToken = null
    },
    receiveNewToken(state, action: PayloadAction<any>) {
      state.newToken = action.payload
    },
    receiveThemeSettings(state, action: PayloadAction<any>) {
      state.themeSettings = action.payload
    },
    receiveThemeSettingsSchema(state, action: PayloadAction<any>) {
      state.themeSettingsSchema = action.payload
    },
    receiveRedirects(state, action: PayloadAction<any>) {
      state.redirects = action.payload
    },
    receiveRedirect(state, action: PayloadAction<any>) {
      state.redirectEdit = action.payload
    },
    receiveWebhooks(state, action: PayloadAction<any>) {
      state.webhooks = action.payload
    },
    receiveWebhook(state, action: PayloadAction<any>) {
      state.webhookEdit = action.payload
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchFiles.pending, () => {}),
  },
})

export const {
  exportRequest,
  exportReceive,
  installRequest,
  installReceive,
  receiveSettings,
  receiveEmailSettings,
  receiveImportSettings,
  requestEmailTemplate,
  receiveEmailTemplate,
  receiveShippingMethods,
  receivePaymentMethods,
  receiveShippingMethod,
  receivePaymentMethod,
  receivePaymentGateway,
  requestCheckoutField,
  receiveCheckoutField,
  requestCommerceSettings,
  receiveCommerceSettings,
  receiveCheckoutFields,
  receiveTokens,
  receiveToken,
  receiveNewToken,
  receiveThemeSettings,
  receiveThemeSettingsSchema,
  receiveRedirects,
  receiveRedirect,
  receiveWebhooks,
  receiveWebhook,
} = productSlice.actions

export default productSlice.reducer

export function fetchSettings() {
  return (dispatch, getState) => {
    // API can be not init on app start
    if (api) {
      return api.settings
        .retrieve()
        .then(({ status, json }) => {
          dispatch(receiveSettings(json))
        })
        .catch(error => {})
    }
  }
}

export function fetchEmailSettings() {
  return (dispatch, getState) => {
    return api.settings
      .retrieveEmailSettings()
      .then(({ status, json }) => {
        dispatch(receiveEmailSettings(json))
      })
      .catch(error => {})
  }
}

export function fetchImportSettings() {
  return (dispatch, getState) => {
    return api.settings
      .retrieveImportSettings()
      .then(({ status, json }) => {
        dispatch(receiveImportSettings(json))
      })
      .catch(error => {})
  }
}

export function deleteLogo() {
  return (dispatch, getState) => {
    return api.settings
      .deleteLogo()
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(fetchSettings())
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

export function updateSettings(settings) {
  return (dispatch, getState) => {
    delete settings.logo_file
    return api.settings
      .update(settings)
      .then(({ status, json }) => {
        dispatch(receiveSettings(json))
      })
      .catch(error => {})
  }
}

export function updateEmailSettings(emailSettings) {
  return (dispatch, getState) => {
    return api.settings
      .updateEmailSettings(emailSettings)
      .then(({ status, json }) => {
        dispatch(receiveEmailSettings(json))
      })
      .catch(error => {})
  }
}

export function updateImportSettings(importSettings) {
  return (dispatch, getState) => {
    return api.settings
      .updateImportSettings(importSettings)
      .then(({ status, json }) => {
        dispatch(receiveImportSettings(json))
      })
      .catch(error => {})
  }
}

export function fetchEmailTemplate(templateName) {
  return (dispatch, getState) => {
    dispatch(requestEmailTemplate())
    return api.settings
      .retrieveEmailTemplate(templateName)
      .then(({ status, json }) => {
        json.templateName = templateName
        dispatch(receiveEmailTemplate(json))
      })
      .catch(error => {})
  }
}

export function updateEmailTemplate(emailTemplate) {
  return (dispatch, getState) => {
    return api.settings
      .updateEmailTemplate(emailTemplate.templateName, emailTemplate)
      .then(({ status, json }) => {
        json.templateName = emailTemplate.templateName
        dispatch(receiveEmailTemplate(json))
      })
      .catch(error => {})
  }
}

export function fetchCheckoutFields() {
  return (dispatch, getState) => {
    return api.checkoutFields
      .list()
      .then(({ status, json }) => {
        dispatch(receiveCheckoutFields(json))
      })
      .catch(error => {})
  }
}

export function fetchCheckoutField(fieldName) {
  return (dispatch, getState) => {
    dispatch(requestCheckoutField())
    return api.checkoutFields
      .retrieve(fieldName)
      .then(({ status, json }) => {
        json.fieldName = fieldName
        dispatch(receiveCheckoutField(json))
      })
      .catch(error => {})
  }
}

export function updateCheckoutField(checkoutField) {
  return (dispatch, getState) => {
    return api.checkoutFields
      .update(checkoutField.fieldName, checkoutField)
      .then(({ status, json }) => {
        json.fieldName = checkoutField.fieldName
        dispatch(receiveCheckoutField(json))
      })
      .catch(error => {})
  }
}

export function fetchCommerceSettings(value) {
  return async (dispatch, getState) => {
    try {
      const { json } = await api.settings.retrieveCommerceSettings()
      dispatch(receiveCommerceSettings(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateCommerceSettings(commerceSettings) {
  return (dispatch, getState) => {
    return api.settings
      .updateCommerceSettings(commerceSettings)
      .then(({ status, json }) => {
        dispatch(receiveCommerceSettings(json))
      })
      .catch(error => {})
  }
}

export function fetchShippingMethods() {
  return (dispatch, getState) => {
    return api.shippingMethods
      .list()
      .then(({ status, json }) => {
        dispatch(receiveShippingMethods(json))
      })
      .catch(error => {})
  }
}

export function fetchPaymentMethods() {
  return (dispatch, getState) => {
    return api.paymentMethods
      .list()
      .then(({ status, json }) => {
        dispatch(receivePaymentMethods(json))
      })
      .catch(error => {})
  }
}

export function updateShippingMethod(method) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .update(method.id, method)
      .then(({ status, json }) => {
        dispatch(fetchShippingMethods())
      })
      .catch(error => {})
  }
}

export function updatePaymentMethod(method) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .update(method.id, method)
      .then(({ status, json }) => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
  }
}

export function fetchShippingMethod(id) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveShippingMethod(json))
      })
      .catch(error => {})
  }
}

export function fetchPaymentMethod(id) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receivePaymentMethod(json))
      })
      .catch(error => {})
  }
}

export function deleteShippingMethod(methodId) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .delete(methodId)
      .then(({ status, json }) => {
        dispatch(fetchShippingMethods())
      })
      .catch(error => {})
  }
}

export function deletePaymentMethod(methodId) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .delete(methodId)
      .then(({ status, json }) => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
  }
}

export function createShippingMethod(method) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .create(method)
      .then(({ status, json }) => {
        dispatch(fetchShippingMethods())
      })
      .catch(error => {})
  }
}

export function createPaymentMethod(method) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .create(method)
      .then(({ status, json }) => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
  }
}

export function fetchTokens() {
  return (dispatch, getState) => {
    return api.tokens
      .list()
      .then(({ status, json }) => {
        dispatch(receiveTokens(json))
      })
      .catch(error => {})
  }
}

export function fetchToken(id) {
  return (dispatch, getState) => {
    return api.tokens
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveToken(json))
      })
      .catch(error => {})
  }
}

export function createToken(token) {
  return (dispatch, getState) => {
    return api.tokens
      .create(token)
      .then(({ status, json }) => {
        console.log(json)
        dispatch(fetchTokens())
        dispatch(receiveNewToken(json.token))
      })
      .catch(error => {})
  }
}

export function updateToken(token) {
  return (dispatch, getState) => {
    return api.tokens
      .update(token.id, token)
      .then(({ status, json }) => {
        dispatch(fetchTokens())
      })
      .catch(error => {})
  }
}

export function deleteToken(tokenId) {
  return (dispatch, getState) => {
    return api.tokens
      .delete(tokenId)
      .then(({ status, json }) => {
        dispatch(fetchTokens())
      })
      .catch(error => {})
  }
}

export function fetchPaymentGateway(gatewayName) {
  return (dispatch, getState) => {
    if (gatewayName && gatewayName.length > 0) {
      return api.paymentGateways
        .retrieve(gatewayName)
        .then(({ status, json }) => {
          dispatch(receivePaymentGateway(json))
        })
        .catch(error => {})
    } else {
      dispatch(receivePaymentGateway(null))
    }
  }
}

export function updatePaymentGateway(gatewayName, data) {
  return (dispatch, getState) => {
    return api.paymentGateways
      .update(gatewayName, data)
      .then(({ status, json }) => {
        dispatch(receivePaymentGateway(json))
      })
      .catch(error => {})
  }
}

export function uploadLogo(form) {
  return (dispatch, getState) => {
    return api.settings
      .uploadLogo(form)
      .then(() => {
        dispatch(fetchSettings())
      })
      .catch(error => {})
  }
}

export function fetchThemeSettings() {
  return (dispatch, getState) => {
    return Promise.all([
      api.theme.settings.retrieve(),
      api.theme.settings.retrieveSchema(),
    ])
      .then(([settingsResponse, schemaResponse]) => {
        dispatch(receiveThemeSettings(settingsResponse.json))
        dispatch(receiveThemeSettingsSchema(schemaResponse.json))
      })
      .catch(error => {})
  }
}

export function updateThemeSettings(settings) {
  return (dispatch, getState) => {
    return api.theme.settings
      .update(settings)
      .then(() => {
        dispatch(fetchThemeSettings())
      })
      .catch(error => {})
  }
}

export function fetchRedirects() {
  return (dispatch, getState) => {
    return api.redirects
      .list()
      .then(({ status, json }) => {
        dispatch(receiveRedirects(json))
      })
      .catch(error => {})
  }
}

export function fetchRedirect(id) {
  return (dispatch, getState) => {
    return api.redirects
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveRedirect(json))
      })
      .catch(error => {})
  }
}

export function createRedirect(redirect) {
  return (dispatch, getState) => {
    return api.redirects
      .create(redirect)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
  }
}

export function updateRedirect(redirect) {
  return (dispatch, getState) => {
    return api.redirects
      .update(redirect.id, redirect)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
  }
}

export function deleteRedirect(redirectId) {
  return (dispatch, getState) => {
    return api.redirects
      .delete(redirectId)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
  }
}

export function fetchWebhooks() {
  return (dispatch, getState) => {
    return api.webhooks
      .list()
      .then(({ status, json }) => {
        dispatch(receiveWebhooks(json))
      })
      .catch(error => {})
  }
}

export function fetchWebhook(id) {
  return (dispatch, getState) => {
    return api.webhooks
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveWebhook(json))
      })
      .catch(error => {})
  }
}

export function createWebhook(webhook) {
  return (dispatch, getState) => {
    return api.webhooks
      .create(webhook)
      .then(({ status, json }) => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}

export function updateWebhook(webhook) {
  return (dispatch, getState) => {
    return api.webhooks
      .update(webhook.id, webhook)
      .then(({ status, json }) => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}

export function deleteWebhook(webhookId) {
  return (dispatch, getState) => {
    return api.webhooks
      .delete(webhookId)
      .then(({ status, json }) => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}
