const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const nodeExternals = require("webpack-node-externals")

module.exports = {
  target : "node",
  entry : {
    server : "./src/store/server/index.ts",
  },

  performance : {
    hints : false,
  },

  output : {
    publicPath : "/",
    path : path.resolve(__dirname, "dist/store/server"),
    // filename: "[name]-[chunkhash].js",
    // chunkFilename: "[name]-[chunkhash].js",
    filename : "index.js",
  },
  externals : [ nodeExternals() ],
  optimization : {
    splitChunks : {
      cacheGroups : {
        vendor : {
          chunks : "initial",
          name : "theme",
          test : "theme",
          enforce : true,
        },
      },
    },
  },

  resolve : {
    alias : {
      "@store/client" : path.resolve("libs/client/src/index.ts"),
      "@store/config" : path.resolve("libs/config/src/index.ts"),
      "@store/theme" : path.resolve("libs/theme/src/index.ts"),
    },
    extensions : [ ".tsx", ".ts", ".js" ],
  },

  module : {
    rules : [
      {
        test : /\.tsx?$/,
        use : {loader : "ts-loader", options : {transpileOnly : true}},
        exclude : /node_modules/,
      },
      {
        test : /\.(js|jsx)$/,
        exclude : /node_modules/,
        use : {
          loader : "babel-loader",
          options : {
            presets : [ "@babel/env", "@babel/react" ],
            plugins : [ "transform-class-properties" ],
          },
        },
      },
      {
        test : /\.css$/,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : "css-loader",
            options : {
              modules : false,
              importLoaders : true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test : /\.s[ac]ss$/,
        use : [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test : /\.(png|jpe?g|gif)$/i,
        use : [
          {
            loader : "file-loader",
          },
        ],
      },
      {
        test : /\.(png|jpg|gif|otf|eot|png|svg|ttf|woff|woff2)$/i,
        use : [
          {
            loader : "url-loader",
            options : {
              limit : 8192,
            },
          },
        ],
      },
      {
        test : /\.svg$/,
        loader : "svg-inline-loader",
      },
    ],
  },

  plugins : [
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [
    //     path.resolve("theme/assets/js/*-*.js"),
    //     // path.resolve("theme/dist/*"),
    //     path.resolve("theme/assets/sw.js"),
    //     path.resolve("theme/assets/workbox-*.js"),
    //   ],
    // }),
    // new ForkTsCheckerWebpackPlugin({ async: true }),
    new MiniCssExtractPlugin({
      filename : "assets/css/bundle-[contenthash].css",
      chunkFilename : "assets/css/bundle-[contenthash].css",
    }),
    new webpack.BannerPlugin({
      banner : `Created: ${new Date().toUTCString()}`,
      raw : false,
      entryOnly : false,
    }),
  ],

  stats : {
    children : false,
    entrypoints : false,
    modules : false,
  },
}
