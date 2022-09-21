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

# `module`

`noParse`配置用来告知`webpack`忽略指定的、且未采用模块系统的模块，不对其进行递归解析和处理。这样做的好处是可以提高构建性能，因为一些大型的库（如`jQuery`）没有采用模块系统，让`webpack`解析浪费时间和资源。

`noParse`只能对文件级别进行控制，对于匹配的文件，任何模块系统都不会进行解析。

	// 以正则方式指定
	noParse: /jquery/

	// 以数组方式指定
	noParse: [/jquery/]

	// 以函数方式指定
	noParse: (content) => {
	  return content.test(/jquery/)
	}

被忽略的模块不应该含有`import、require、define`的调用，或其他任何导入机制。

`rules`是一个数组，配置`rules`时需要完成以下工作：

- 匹配条件：通过`test`、`include`、`exclude`来指定要应用或排除`loader`的文件。
- `loader`列表：对匹配成功的文件运用执行的`loader`，也可以传递数组，多个`loader`的运用顺序是从后往前应用的。此外，每个`loader`还支持传递选项。
	
	
	module: {
	  rules: [
	    {
	      test: /\.css$/,
	      // loader执行顺序从后往前，css-loader --> style-loader
	      use: ["style-loader", "css-loader"],
	    },
	    {
	      test: /\.js$/,
	      // 使用查询字符串形式传入选项
	      use: ["babel-loader?cacheDirectory"],
	      // 只对src目录下的文件应用规则
	      include: path.resolve(__dirname, "src"),
	      parser: {
	        amd: false, // 不解析 AMD
	        commonjs: false, // 不解析 commonjs
	        harmony: false, // 不解析 es6 import/export 模块语法
	        requirejs: false, // 不解析 requirejs
	      },
	    },
	    {
	      test: /\.less$/,
	      // 以数组方式运用loader
	      use: ["style-loader", "css-loader", "less-loader"],
	      // 忽略node_modules目录下的文件
	      exclude: path.resolve(__dirname, "node_modules"),
	    },
	    {
	      test: /\.(gif|png|jpe?g)$/,
	      // 以对象方式运用loader
	      use: [
	        {
	          loader: "file-loader",
	          // 以对象方式传递选项
	          options: {
	            name: "images/[name].[ext]",
	            esModule: false,
	          },
	        },
	      ],
	    },
	  ];
	}

`resolve/alias`创建`import`或`require`模块的别名。

	module.exports = {
	  resolve: {
	    alias: {
	      "@": "./src",
	    },
	  },
	};

	module.exports = {
	  resolve: {
	    alias: {
	      xyz$: path.resolve(__dirname, "path/to/file.js"),
	    },
	  },
	};

`extensions`当不带扩展名的模块导入时，`webpack`会读取本配置指定的扩展名去尝试访问文件是否存在。

	module.exports = {
	  extensions: [".vue", ".js", ".json"],
	};

`modules`该选项配置`webpack`去哪些目录下寻找第三方模块，默认情况下只会去`node_modules`目录下寻找。

	module.exports = {
	  modules: [path.resolve(__dirname, "lib"), "node_modules"],
	};

# `externals`

