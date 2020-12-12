import { initOnClient, StoreLocales } from "@store/theme"
import React, { FC, useEffect, useRef } from "react"
import { connect, Provider } from "react-redux"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom"
import { animateScroll } from "react-scroll"
// import { animateScroll } from "react-scroll"
import { setCurrentPage } from "./actions"
import AccountContainer from "./containers/account"
import CategoryContainer from "./containers/category"
import CheckoutContainer from "./containers/checkout"
import CheckoutSuccessContainer from "./containers/checkoutSuccess"
import ForgotPasswordContainer from "./containers/forgotPassword"
import IndexContainer from "./containers/index"
// import LoginContainer from "./containers/login"
import NotFoundContainer from "./containers/notfound"
import PageContainer from "./containers/page"
import ProductContainer from "./containers/product"
import RegisterContainer from "./containers/register"
import ResetPasswordContainer from "./containers/resetPassword"
import SearchContainer from "./containers/search"
// import SharedContainer from "./containers/shared"
import api from "./lib/api"
import settings from "./lib/settings"
// import { PAGE, PRODUCT, PRODUCT_CATEGORY, SEARCH } from "./pageTypes"
import store from "./store"

interface props {
  history?: string
  location?: { pathname: string; search: string }
  currentPage?: { type: string }
  setCurrentPage?: Function
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

  return (
    <Router>
      {/* <SharedContainer> */}
      <Switch>
        <Route component={IndexContainer} path="/" />
        <Route component={ProductContainer} path="/product" />
        <Route component={CategoryContainer} path="/product-category" />
        <Route component={SearchContainer} path="/search" />
        {/* <Route component={LoginContainer} path="/login" /> */}
        <Route component={RegisterContainer} path="/register" />
        <Route component={AccountContainer} path="/customer-account" />
        <Route component={ForgotPasswordContainer} path="/forgot-password" />
        <Route component={ResetPasswordContainer} path="/reset-password" />
        <Route component={CheckoutContainer} path="/checkout" />
        <Route component={CheckoutSuccessContainer} path="/checkout-success" />
        <Route component={PageContainer} path="/page" />
        <Route component={NotFoundContainer} />
      </Switch>
      {/* </SharedContainer> */}
    </Router>
  )
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

const SwitchContainersConnected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SwitchContainers)
)

// const App = () => (
//   <SharedContainer>
//     <Route component={SwitchContainersConnected} />
//   </SharedContainer>
// )

const App = () => {
  initOnClient({
    //@ts-ignore
    themeSettings: store.getState().app.themeSettings,
    text: StoreLocales,
    language: settings.language,
    api: api,
  })

  return (
    <Provider store={store}>
      <Router>
        <SwitchContainersConnected />
      </Router>
    </Provider>
  )
}

export default App
