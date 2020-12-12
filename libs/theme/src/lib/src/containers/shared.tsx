import React, { FC } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { themeSettings } from "../lib/settings"

interface props {
  children: Node
  state: { currentPage: { path: string }; settings: {} }
}

const SharedContainer: FC<props> = (props: props) => {
  const { children, state } = props

  const { currentPage, settings } = state

  let path: string

  if (currentPage) {
    if (currentPage.path) {
      path = currentPage.path ? currentPage.path : ""
    }
  }

  const hideFooter =
    (path === "/checkout-success" || path === "/checkout") &&
    themeSettings.hide_footer_on_checkout === true

  return (
    <>
      {themeSettings && <Header {...props} />}

      {children}
      {!hideFooter && settings && <Footer settings={settings} />}
    </>
  )
}

SharedContainer.propTypes = {
  // children: PropTypes.element.isRequired,
  // state: PropTypes.shape({
  //   currentPage: PropTypes.shape({}),
  //   settings: PropTypes.shape({}),
  // }).isRequired,
}

export default SharedContainer
