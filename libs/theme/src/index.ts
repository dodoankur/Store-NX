// export * from "./lib/theme"
export { default as Text } from "./lib/locales/locale"
export { default as AccountContainer } from "./lib/src/containers/account"
export { default as CategoryContainer } from "./lib/src/containers/category"
export { default as CheckoutContainer } from "./lib/src/containers/checkout"
export { default as CheckoutSuccessContainer } from "./lib/src/containers/checkoutSuccess"
export { default as ForgotPasswordContainer } from "./lib/src/containers/forgotPassword"
export { default as IndexContainer } from "./lib/src/containers/index"
export { default as LoginContainer } from "./lib/src/containers/login"
export { default as NotFoundContainer } from "./lib/src/containers/notfound"
export { default as PageContainer } from "./lib/src/containers/page"
export { default as ProductContainer } from "./lib/src/containers/product"
export { default as RegisterContainer } from "./lib/src/containers/register"
export { default as ResetPasswordContainer } from "./lib/src/containers/resetPassword"
export { default as SearchContainer } from "./lib/src/containers/search"
export { default as SharedContainer } from "./lib/src/containers/shared"
export { initOnClient } from "./lib/src/lib/settings"

// combine all css files into one with webpack. Hack to deal with server side rendering.
if (typeof window !== "undefined") {
  require("./lib/assets/scss/theme.scss")
}
