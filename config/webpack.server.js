const paths = require("./paths");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "development",
  entry: paths.serverEntryPath,
  output: {
    path: paths.appBuild,
    filename: "server-entry.js",
    libraryTarget: "commonjs2"
  },
  externals: [nodeExternals()],
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
  }
};
