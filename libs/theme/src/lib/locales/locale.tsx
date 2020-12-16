import { Store } from "@store/config"
import locales from "./"

const config = Store
const locale = locales.find(({ local }) => config.language == local)

export default locale
