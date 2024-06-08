const path = require("path");

module.exports = {
  entry: "./src/main.ssr",
  target: "node", // 导出为 node.js 环境
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "ssr.bundle.js",
    // 打包为 commonjs2 模块，可以被 node.js 直接加载
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};
