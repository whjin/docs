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

# `entry`和`context`

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

# `output`

构建的输出配置，只支持对象形式的配置。

对于多个入口的项目，需要借助`webpack`提供的占位符。

	module.exports = {
	  entry: {
	    main: "./src/main",
	    second: "./src/second",
	    third: "./src/third",
	  },
	  output: {
	    filename: "[name].js",
	    path: path.resolve(__dirname, "build"),
	  },
	};


|占位符|说明|
|:---:|:---|
|`id`|`chunk`的`id`，从`0`开始|
|`name`|`chunk`的名称|
|`hash`|项目级的哈希值，不管修改项目的什么文件都会变化|
|`chunkhash`|`chunk`的哈希值，只有修改该`chunk`内的代码才会变化|
|`contenthash`|基于内容的哈希值，只有修改该文件本身才会变化|

`hash/chunkhash/contenthash`的长度可以自定义，比如`[hash:16]`代表取`16`位的哈希值。

`chunkFilename`选项指明了非入口的`chunk`在输出时的文件名称。这些`chunk`一般是在`webpack`运行构建过程中产生，`chunkFilename`只对这些运行时生成的`chunk`生效。`chunkFilename`支持和`filename`同样的占位符。

`path`选项配置`webpack`输出文件的目录，必须使用绝对路径。

`publicPath`选项把输出目录配置为浏览器环境下的`URL`地址，默认是空字符串，使用相对路径。

如果生产环境下静态资源（`JS/CSS/图片`）托管到CDN，可以将`publicPath`配置为指定的地址。

	module.exports = {
	  output: {
	    publicPath: "https://cdn.ddhigh.com/assets/",
	  },
	};


