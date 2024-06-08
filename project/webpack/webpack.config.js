const path = require("path");
const webpack = require("webpack");
const MiniCssPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HappyPackPlugin = require("happypack");

const config = {
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
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        // loader: "babel-loader",
        use: "happypack/loader?id=js", // 配置 id 为 js
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "lib")],
        options: {
          presets: ["es2015"],
        },
      },
      {
        test: /\.css$/,
        // use: [
        //   process.env.NODE_ENV === "production"
        //     ? minify.loader
        //     : "vue-style-loader",
        //   "css-loader",
        //   "postcss-loader",
        // ],
        use: "happypack/loader?id=css",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.scss$/,
        use: "happypack/loader?id=scss",
      },
    ],
    noParse: [/jquery/], // 不解析的模块
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "lib")], // 用于查找模块的目录
    },
    extensions: [".ts", ".vue", ".js", ".json"], // 模块扩展名
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
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "index.html",
      template: "index.html",
    }),
    new webpack.IgnorePlugin(/\.\/local/, /moment/),
    // 传入 manifest.json
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dist", "manifest.json"),
    }),
    new HappyPackPlugin({
      id: "js",
      use: [
        {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/transform-runtime"],
            presets: ["@babel/env"],
          },
        },
      ],
    }),
    new HappyPackPlugin({
      id: "css",
      use: ["style-loader", "css-loader"],
    }),
    new HappyPackPlugin({
      id: "scss",
      use: ["style-loader", "css-loader", "sass-loader"],
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 应用代码中公共模块
        common: {
          chunks: "all",
          // 最小公共模块引用次数
          minChunks: 2,
        },
        vendor: {
          // node_modules 中第三方模块
          test: /node_modules/,
          chunks: "all",
          minChunks: 1,
        },
      },
    },
  },
};

if (process.env.NODE_ENV === "production") {
  // 在生产环境中添加 css 提取插件
  config.plugins.push(
    new MiniCssPlugin({
      filename: "css/[name].css",
    })
  );
}

module.exports = config;
