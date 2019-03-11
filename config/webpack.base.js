const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(isServer = false) {
  return {
    mode: "production",
    module: {
      rules: [
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
          use: [
            isServer && "isomorphic-style-loader",
            !isServer && MiniCssExtractPlugin.loader,
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
          ].filter(Boolean)
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
