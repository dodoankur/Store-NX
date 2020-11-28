import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  createOption,
  createVariant,
  deleteVariant,
  setVariantOption,
  updateVariant,
} from "../../reducer"
import ProductVariantsGrid from "./components/grid"

const mapStateToProps = (state, ownProps) => {
  const { productId } = ownProps.match.params
  const oldOptions = state.products.editProduct
    ? state.products.editProduct.options
    : null
  const oldVariants = state.products.editProduct
    ? state.products.editProduct.variants
    : null

  return {
    options: state.products.editProductOptions || oldOptions,
    variants: state.products.editProductVariants || oldVariants,
    productId: productId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSkuChange: (variantId, value) => {
      const { productId } = ownProps.match.params
      const variant = { sku: value }
      const args = { productId, variantId, variant }
      dispatch(updateVariant(args))
    },
    onPriceChange: (variantId, value) => {
      const { productId } = ownProps.match.params
      const variant = { price: value }
      const args = { productId, variantId, variant }
      dispatch(updateVariant(args))
    },
    onStockChange: (variantId, value) => {
      const { productId } = ownProps.match.params
      const variant = { stock_quantity: value }
      const args = { productId: productId, variantId: variantId, variant }
      dispatch(updateVariant(args))
    },
    onWeightChange: (variantId, value) => {
      const { productId } = ownProps.match.params
      const variant = { weight: value }
      dispatch(updateVariant({ productId, variantId, variant }))
    },
    onOptionChange: (variantId, optionId, valueId) => {
      const { productId } = ownProps.match.params
      const args = { productId, variantId, optionId, valueId }
      dispatch(setVariantOption(args))
    },
    createVariant: () => {
      const { productId } = ownProps.match.params
      dispatch(createVariant(productId))
    },
    deleteVariant: variantId => {
      const { productId } = ownProps.match.params
      dispatch(deleteVariant({ productId, variantId }))
    },
    createOption: () => {
      const { productId } = ownProps.match.params
      const newOption = {
        name: "New option",
        position: 0,
        required: true,
        control: "select",
      }
      dispatch(createOption({ productId, newOption }))
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductVariantsGrid)
)
