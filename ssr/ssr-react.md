# 服务端渲染`SSR`

同构应用：使同一份应用代码分别编译为浏览器和服务器环境下的代码。服务器环境使用`node.js`，因此有以下注意事项：

- 不能使用浏览器环境提供的`API`，比如`DOM`等，这些`API`在`node.js`下不可用。
- 不能将第三方`node_modules`模块打包，而需要通过`CommonJS`规范的`require`函数进行加载。

# `SSR`原理

- 使用`react-dom`提供的`renderToString`函数将`react`应用导出为一个`node.js`模块，该模块导出一个`render`函数。
- 使用`express`开启`http`服务器接收请求，在响应中将第1步的函数渲染输出到客户端。

1. 添加`SSR`下的应用入口文件。
2. 添加`SSR`环境下打包使用的`webpack`配置文件。
3. 使用`http`服务器承载`http`请求以输出`HTML`。

`node.js`下构建脚本变更：

- 入口文件变更。
- `target`修改为`node`，打包时不会打包`node.js`内置的模块。
- `libraryTarget`修改为`commonjs2`，以便被`node.js`加载。
- 去掉`HtmlWebpackPlugin`插件。

`package.json`需要添加`build-ssr`命令用来打包`SSR`环境下的`bundle`。