import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { text } from "../../lib/settings"
import CustomProductList from "./custom"

interface props {
  limit
  settings
  addCartItem
  product
}

const ViewedProducts = (props: props) => {
  const [viewedProducts, setViewedProducts] = useState([])

  const { limit, settings, addCartItem, product } = props

  useEffect(() => {
    const { product } = props
    setViewedProducts(getArrayFromLocalStorage())

    if (product && product.id) {
      addProductIdToLocalStorage(product.id)
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
    } catch (error) {
      console.error(error)
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
