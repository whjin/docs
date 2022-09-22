const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  plugin: [
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "index.html",
      template: "index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};
