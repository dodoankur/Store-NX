import PropTypes from "prop-types"
import React, { FC } from "react"
import HomeSlider from "../components/homeSlider"
import MetaTags from "../components/metaTags"
import CustomProducts from "../components/products/custom"
import { themeSettings } from "../lib/settings"

interface props {
  addCartItem: Function
  state: {
    pageDetails?: {
      meta_title?: string
      meta_description?: string
      url?: string
      content?: string
    }
    settings?: {}
  }
}

const IndexContainer: FC<props> = (props: props) => {
  const {
    addCartItem,
    state: { pageDetails = {}, settings },
  } = props

  const {
    meta_title = "",
    meta_description = "",
    url = "",
    content = "",
  } = pageDetails

  let validatedThemeSettings: { home_slider?: [] } = {}
  if (themeSettings) {
    validatedThemeSettings = themeSettings
  }

  const { home_slider } = validatedThemeSettings

  return (
    <>
      <MetaTags
        title={meta_title}
        description={meta_description}
        canonicalUrl={url}
        ogTitle={meta_title}
        ogDescription={meta_description}
      />

      {home_slider && <HomeSlider images={home_slider} />}

      {content && content.length > 10 && (
        <section className="section">
          <div className="container">
            <div className="content">
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
          </div>
        </section>
      )}
      {themeSettings ? (
        <section className="section">
          <div className="container">
            <div className="title is-4 has-text-centered">
              {themeSettings.home_products_title}
            </div>
            <CustomProducts
              sku={themeSettings.home_products_sku}
              sort={themeSettings.home_products_sort}
              limit={themeSettings.home_products_limit}
              settings={settings}
              addCartItem={addCartItem}
            />
          </div>
        </section>
      ) : null}
    </>
  )
}

IndexContainer.defaultProps = {
  addCartItem: () => {},
  state: {
    settings: {},
    pageDetails: { meta_title: "", meta_description: "", url: "", content: "" },
  },
}

IndexContainer.propTypes = {
  addCartItem: PropTypes.func.isRequired,
  state: PropTypes.shape({
    settings: PropTypes.shape({}),
    pageDetails: PropTypes.shape({
      meta_title: PropTypes.string,
      meta_description: PropTypes.string,
      url: PropTypes.string,
      content: PropTypes.string,
    }),
  }).isRequired,
}

export default IndexContainer
