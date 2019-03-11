const paths = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: paths.indexPath,
  output: {
    path: paths.appBuild,
    filename: "[name].[contenthash:8].js",
    publicPath: "/public"
  },
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appTemplate
    })
  ]
};
