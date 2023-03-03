const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common.config, {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: true,
  }
});
