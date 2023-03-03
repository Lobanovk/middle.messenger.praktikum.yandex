const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config  = {
  entry: {
    main: path.resolve(__dirname, "src", "index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[contenthash].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js", "..."],
    alias: {
      "handlebars": "handlebars/dist/handlebars.js",
      "core": path.resolve(__dirname, "src", "core"),
      "components": path.resolve(__dirname, "src", "components"),
      "helpers": path.resolve(__dirname, "src", "helpers"),
      "pages": path.resolve(__dirname, "src", "pages")
    }
  },
  watchOptions: {
    ignored: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env",
                  "postcss-import",
                  "postcss-nested",
                  "postcss-css-variables"
                ]
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html"
    }),
  ]
};

module.exports = { config };


