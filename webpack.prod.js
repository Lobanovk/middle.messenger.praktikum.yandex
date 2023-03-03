const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common.config, {
  mode: "production",
  optimization: {
    minimize: true
  },
});
