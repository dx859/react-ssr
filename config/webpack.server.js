const paths = require("./paths");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const config = {
  entry: paths.serverEntryPath,
  output: {
    path: paths.appBuild,
    filename: "server-entry.js",
    libraryTarget: "commonjs2"
  },
  externals: [nodeExternals()]
};

module.exports = merge(baseConfig(true), config);
