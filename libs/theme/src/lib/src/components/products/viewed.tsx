import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { text } from "../../lib/settings"
import CustomProductList from "./custom"

const ViewedProducts = props => {
  const [viewedProducts, setViewedProducts] = useState([])

  useEffect(() => {
    const { product } = props
    setViewedProducts(getArrayFromLocalStorage())

    if (product && product.id) {
      addProductIdToLocalStorage(product.id)
    }
  }, [])

  useEffect(() => {
    if (props.product.id) {
      addProductIdToLocalStorage(props.product.id)
    }
  }, [props.product])

  // shouldComponentUpdate(nextProps, nextState) {
  //   return viewedProducts !== nextState.viewedProducts
  // }

  const getArrayFromLocalStorage = () => {
    let values = []
    const viewedProducts = localStorage.getItem("viewedProducts")

    try {
      if (viewedProducts && viewedProducts.length > 0) {
        const viewedProductsParsed = JSON.parse(viewedProducts)
        if (Array.isArray(viewedProductsParsed)) {
          values = viewedProductsParsed
        }
      }
    } catch (e) {
      //
    }

    return values
  }

  const addProductIdToLocalStorage = productId => {
    if (productId && productId.length > 0) {
      const getViewedProducts = getArrayFromLocalStorage()

      if (getViewedProducts.includes(productId)) {
        const index = getViewedProducts.indexOf(productId)
        getViewedProducts.splice(index, 1)
        getViewedProducts.push(productId)
      } else {
        getViewedProducts.push(productId)
      }

      localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts))
      setViewedProducts(getViewedProducts)
    }
  }

  const { limit, settings, addCartItem, product } = props

  if (viewedProducts && product && product.id) {
    setViewedProducts(viewedProducts.filter(id => id !== product.id))
  }

  if (viewedProducts && viewedProducts.length > 0) {
    const ids = viewedProducts.reverse().slice(0, limit)
    return (
      <section className="section section-product-related">
        <div className="container">
          <div className="title is-4 has-text-centered">
            {text.recentlyViewed}
          </div>
          <CustomProductList
            ids={ids}
            settings={settings}
            addCartItem={addCartItem}
            limit={limit}
            isCentered
          />
        </div>
      </section>
    )
  }
  return null
}

ViewedProducts.propTypes = {
  limit: PropTypes.number.isRequired,
  settings: PropTypes.shape({}).isRequired,
  addCartItem: PropTypes.func.isRequired,
  product: PropTypes.shape({}).isRequired,
}

export default ViewedProducts
