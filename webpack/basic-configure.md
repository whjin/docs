`webpack`支持两种方式传入配置：

- 通过Javascript文件配置，默认的配置文件名为`webpack.config.js`
- 通过命令行参数传入

`webpack`主要的配置项如下：

- `mode`：配置应用打包环境
- `entry`：配置应用入口
- `output`：配置构建输出
- `module`：配置模块处理规则
- `resolve`：配置寻找模块的规则
- `devtool`：配置开发工具
- `context`：配置解析入口起点（`entry`）和`loader`
- `externals`：配置外部运行环境提供的模块
- `devServer`：配置开发服务器
- `plugins`：配置插件

## `entry`和`context`

`webpack`通过`entry`入口来开始应用的构建，`context`是包含入口文件的目录，必须使用绝对路径。

	module.exports = {
	  entry: "./src/main.js",
	};
	
	module.exports = {
	  entry: "./main.js",
	  context: path.resolve(__dirname, "src"),
	};

`entry`支持字符串、对象或数组格式的配置。

|类型|说明|示例|
|:---:|:----|:----|
|字符串|单个入口文件，打包后的`chunk`名称为`main`|`'./src/main'`|
|数组|单个入口|`['./main','./second']`|
|对象|多个入口文件，打包后的`chunk`名称为对应的键名|`{main:'./main',second:'./second'}`|
