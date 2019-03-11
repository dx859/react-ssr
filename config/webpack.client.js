const paths = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const config = {
  entry: paths.indexPath,
  output: {
    path: paths.appBuild,
    filename: "[name].[contenthash:8].js",
    publicPath: "/public"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appTemplate
    })
  ]
};

module.exports = merge(baseConfig(), config);
