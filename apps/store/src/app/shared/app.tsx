import React, { FC, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import { animateScroll } from "react-scroll"
import { setCurrentPage } from "./actions"
import AccountContainer from "./containers/account"
import CategoryContainer from "./containers/category"
import CheckoutContainer from "./containers/checkout"
import CheckoutSuccessContainer from "./containers/checkoutSuccess"
import ForgotPasswordContainer from "./containers/forgotPassword"
import IndexContainer from "./containers/index"
import LoginContainer from "./containers/login"
import NotFoundContainer from "./containers/notfound"
import PageContainer from "./containers/page"
import ProductContainer from "./containers/product"
import RegisterContainer from "./containers/register"
import ResetPasswordContainer from "./containers/resetPassword"
import SearchContainer from "./containers/search"
import SharedContainer from "./containers/shared"
import { PAGE, PRODUCT, PRODUCT_CATEGORY, SEARCH } from "./pageTypes"

interface props {
  history: string
  location: { pathname: string; search: string }
  currentPage: { type: string }
  setCurrentPage: Function
}

const SwitchContainers: FC<props> = (props: props) => {
  const pathname = useRef(props.location.pathname)
  const search = useRef(props.location.search)
  const { location, currentPage, setCurrentPage } = props

  useEffect(() => {
    setCurrentPage(location)

    if (props.location) {
      const pathnameChanged = props.location.pathname !== pathname.current
      const queryChanged = props.location.search !== search.current
      const isSearchPage = props.location.pathname === "/search"

      if (pathnameChanged || (queryChanged && isSearchPage)) {
        animateScroll.scrollToTop({
          duration: 500,
          delay: 100,
          smooth: true,
        })
      }
    }
  }, [props.location])

  const locationPathname =
    location && location.pathname ? location.pathname : "/"
  switch (currentPage.type) {
    case PRODUCT:
      return <ProductContainer />
    case PRODUCT_CATEGORY:
      return <CategoryContainer />
    case SEARCH:
      return <SearchContainer />
    case PAGE:
      if (locationPathname === "/login") {
        return <LoginContainer />
      }
      if (locationPathname === "/register") {
        return <RegisterContainer />
      }
      if (locationPathname === "/customer-account") {
        return <AccountContainer />
      }
      if (locationPathname === "/forgot-password") {
        return <ForgotPasswordContainer />
      }
      if (locationPathname === "/reset-password") {
        return <ResetPasswordContainer />
      }
      if (locationPathname === "/") {
        return <IndexContainer />
      } else if (locationPathname === "/checkout") {
        return <CheckoutContainer />
      }
      if (locationPathname === "/checkout-success") {
        return <CheckoutSuccessContainer />
      } else {
        return <PageContainer />
      }
    default:
      return <NotFoundContainer />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentPage: state.app.currentPage,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentPage: location => {
      dispatch(setCurrentPage(location))
    },
  }
}

const SwitchContainersConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchContainers)

const App = () => (
  <SharedContainer>
    <Route component={SwitchContainersConnected} />
  </SharedContainer>
)

export default App
