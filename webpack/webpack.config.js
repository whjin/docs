const path = require("path");
const MiniCssPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash:16].js",
    publicPath: "https://static.ddhigh.com/assets", // CDN 地址
    library: "MyLibrary", // 导出库的名称
    libraryTarget: "umd", // 导出库的类型
    chunkFilename: "[name].[chunkhash:16].js", // chunk 文件的名称
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "lib")],
        options: {
          presets: ["es2015"],
        },
      },
    ],
    noParse: [/jquery/], // 不解析的模块
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "lib")], // 用于查找模块的目录
    },
    extensions: [".vue", ".js", ".json"], // 模块扩展名
    alias: {
      xyz$: path.resolve(__dirname, "path/to/file.js"),
    },
    mainFields: ["main"], // 模块的 package.json 中描述入口文件的属性名
  },
  devtool: "source-map",
  context: __dirname, // 上下文配置
  devServer: {
    hot: true,
    // devServer HTTP服务器文档根目录
    contentBase: path.join(__dirname, "public"),
    host: "127.0.0.1",
    port: 8080,
  },
  plugins: [
    new MiniCssPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "index.html",
      template: "index.html",
    }),
  ],
};
