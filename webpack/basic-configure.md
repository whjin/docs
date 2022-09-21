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