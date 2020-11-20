import Countries from "./data/countries"
import Currencies from "./data/currencies"
import Timezones from "./data/timezones"

export default {
  countries: Countries,
  currencies: Currencies,
  timezones: Timezones,
}

export interface Reporter {
  log: (message: string) => void
}

const _SNOWPACK = true // https://github.com/snowpackjs/snowpack/discussions/1589
