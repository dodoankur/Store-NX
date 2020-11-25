const nrwlConfig = require("@nrwl/react/plugins/webpack.js")

module.exports = (config, context) => {
  nrwlConfig(config)
  return {
    ...config, module: {
      ...config.module,
      rules:
          [
            ...config.module.rules,
            {
              test : /\.s[ac]ss$/i,
              use : [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
            },
          ],
    },
  }
}
