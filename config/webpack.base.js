const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

// common function to get style loaders
const getStyleLoaders = (isServer, preProcessor) => {
  const loaders = [
    isServer && "isomorphic-style-loader",
    !isServer && (isProduction ? MiniCssExtractPlugin.loader : "style-loader"),
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
        localIdentName: "[local]_[hash:6]",
        modules: true
      }
    },
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3
          })
        ]
      }
    }
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: preProcessor
    });
  }
  return loaders;
};

module.exports = function(isServer = false) {
  return {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    module: {
      rules: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "assets/[name].[hash:8].[ext]",
            publicPath: "/public/"
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        },
        {
          test: /\.css$/,
          exclude: /node_moduels/,
          use: getStyleLoaders(isServer)
        },
        {
          test: /\.less$/,
          exclude: /node_moduels/,
          use: getStyleLoaders(isServer, "less-loader")
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "css/[name].[hash:8].css"
      })
    ]
  };
};
