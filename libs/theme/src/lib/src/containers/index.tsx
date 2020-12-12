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
    state: {
      pageDetails: {
        meta_title = "",
        meta_description = "",
        url = "",
        content = "",
      },
      settings,
    },
  } = props

  return (
    <>
      <MetaTags
        title={meta_title}
        description={meta_description}
        canonicalUrl={url}
        ogTitle={meta_title}
        ogDescription={meta_description}
      />

      <HomeSlider images={themeSettings.home_slider} />

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
