const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    react: ["react", "react-dom"],
  },
  output: {
    filename: "_dll_[name].js",
    path: path.resolve(__dirname, "dist"),
    lobrary: "_dll_[name]",
  },
  plugins: [
    // name 要等于 output.library 里的 name
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.resolve(__dirname, "dist", "manifest.json"), // 清单文件的路径
    }),
  ],
};
