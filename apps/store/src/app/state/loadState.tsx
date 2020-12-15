import api from "../lib/api"
import {
  getParsedProductFilter,
  getProductFilterForCategory,
  getProductFilterForSearch,
} from "./actions"
import { PAGE, PRODUCT, PRODUCT_CATEGORY, SEARCH } from "./pageTypes"

const PRODUCT_FIELDS =
  "path,id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags,position"
const CATEGORIES_FIELDS =
  "image,name,description,meta_description,meta_title,sort,parent_id,position,slug,id"

const getCurrentPage = path => {
  return api.sitemap
    .retrieve({ path: path, enabled: true })
    .then(sitemapResponse => {
      if (sitemapResponse.status === 200) {
        return sitemapResponse.json
      } else if (sitemapResponse.status === 404) {
        return {
          type: 404,
          path: path,
          resource: null,
        }
      } else {
        return Promise.reject(`Page response code = ${sitemapResponse.status}`)
      }
    })
}

const getProducts = (currentPage, productFilter) => {
  if (currentPage.type === PRODUCT_CATEGORY || currentPage.type === SEARCH) {
    let filter = getParsedProductFilter(productFilter)
    filter.enabled = true
    return api.products.list(filter).then(({ status, json }) => json)
  } else {
    return null
  }
}

const getProduct = currentPage => {
  if (currentPage.type === PRODUCT) {
    return api.products
      .retrieve(currentPage.resource)
      .then(({ status, json }) => json)
  } else {
    return {}
  }
}

const getPage = currentPage => {
  if (currentPage.type === PAGE) {
    return api.pages
      .retrieve(currentPage.resource)
      .then(({ status, json }) => json)
  } else {
    return {}
  }
}

const getThemeSettings = () => {
  return api.theme.settings
    .retrieve()
    .then(({ status, json }) => json)
    .catch(err => ({}))
}

const getAllData = async (currentPage, productFilter, cookie) => {
  const checkoutFields = await api.checkoutFields
    .list()
    .then(({ status, json }) => json)
  const categories = await api.productCategories
    .list({ enabled: true, fields: CATEGORIES_FIELDS })
    .then(({ status, json }) => json)
  const cart = await api.ajax.cart
    .retrieve(cookie)
    .then(({ status, json }) => json)
  const products = await getProducts(currentPage, productFilter)
  const product = await getProduct(currentPage)
  const page = await getPage(currentPage)
  const themeSettings = await getThemeSettings()

  let categoryDetails = null
  if (currentPage.type === PRODUCT_CATEGORY) {
    categoryDetails = categories.find(c => c.id === currentPage.resource)
  }
  return {
    checkoutFields,
    categories,
    cart,
    products,
    product,
    page,
    categoryDetails,
    themeSettings,
  }
}

const getState = (currentPage, settings, allData, location, productFilter) => {
  const {
    checkoutFields,
    categories,
    cart,
    products,
    product,
    page,
    categoryDetails,
    themeSettings,
  } = allData

  let productsTotalCount = 0
  let productsHasMore = false
  let productsMinPrice = 0
  let productsMaxPrice = 0
  let productsAttributes = []

  if (products) {
    productsTotalCount = products.total_count
    productsHasMore = products.has_more
    productsAttributes = products.attributes

    if (products.price) {
      productsMinPrice = products.price.min
      productsMaxPrice = products.price.max
    }
  }

  const state = {
    app: {
      settings: settings,
      location: location,
      currentPage: currentPage,
      pageDetails: page,
      categoryDetails: categoryDetails,
      productDetails: product,
      categories: categories,
      products: products && products.data ? products.data : [],
      productsTotalCount: productsTotalCount,
      productsHasMore: productsHasMore,
      productsMinPrice: productsMinPrice,
      productsMaxPrice: productsMaxPrice,
      productsAttributes: productsAttributes,
      paymentMethods: [],
      shippingMethods: [],
      loadingProducts: false,
      loadingMoreProducts: false,
      loadingShippingMethods: false,
      loadingPaymentMethods: false,
      processingCheckout: false,
      productFilter: {
        onSale: null,
        search: productFilter.search || "",
        categoryId: productFilter.categoryId,
        priceFrom: productFilter.priceFrom || 0,
        priceTo: productFilter.priceTo || 0,
        attributes: productFilter.attributes,
        sort: settings.default_product_sorting,
        fields:
          settings.product_fields && settings.product_fields !== ""
            ? settings.product_fields
            : PRODUCT_FIELDS,
        limit:
          settings.products_limit && settings.products_limit !== 0
            ? settings.products_limit
            : 30,
      },
      cart: cart,
      order: null,
      checkoutFields: checkoutFields,
      themeSettings: themeSettings,
    },
  }

  return state
}

const getFilter = (currentPage, urlQuery, settings) => {
  let productFilter: any = {}

  if (currentPage.type === PRODUCT_CATEGORY) {
    productFilter = getProductFilterForCategory(
      urlQuery,
      settings.default_product_sorting
    )
    productFilter.categoryId = currentPage.resource
  } else if (currentPage.type === SEARCH) {
    productFilter = getProductFilterForSearch(urlQuery)
  }

  productFilter.fields =
    settings.product_fields && settings.product_fields !== ""
      ? settings.product_fields
      : PRODUCT_FIELDS
  productFilter.limit =
    settings.products_limit && settings.products_limit !== 0
      ? settings.products_limit
      : 30

  return productFilter
}

export const loadState = async (req?, language?) => {
  // const cookie = req.get("cookie")
  // const urlPath = req.path
  // const urlQuery = req.url.includes("?")
  //   ? req.url.substring(req.url.indexOf("?"))
  //   : ""
  const empty = ""
  const cookie = "" //req.get("cookie")
  const urlPath = empty
  const urlQuery = empty.includes("?")
    ? empty.substring(empty.indexOf("?"))
    : ""
  const location = {
    hasHistory: false,
    pathname: urlPath,
    search: urlQuery,
    hash: "",
  }

  try {
    const currentPage = await getCurrentPage(empty)
    const { json } = await api.settings.retrieve()
    const settings = json
    const productFilter = getFilter(currentPage, urlQuery, settings)

    return getAllData(currentPage, productFilter, cookie).then(allData => {
      const state = getState(
        currentPage,
        settings,
        allData,
        location,
        productFilter
      )
      return {
        state: state,
      }
    })
  } catch (error) {
    console.error(error)
  }
}
