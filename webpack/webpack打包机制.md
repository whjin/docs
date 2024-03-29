`webpack`打包原理

- 根据文件间的依赖关系对其进行静态分析，将这些模块按指定规则生成静态资源，当`webpack`处理程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，将所有模块打包成一个或多个`bundle`。

`webpack`构建流程

1. 初始化参数：从配置文件读取与合并参数，得出最终的参数
2. 开始编译：用最终参数初始化`compiler`对象，加载所有配置的插件，开始执行编译
3. 确定入口：根据配置中的`entry`找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的`loader`对模块进行编译，再找出该模块依赖的模块，再递归直到所有入口依赖的文件都经过编译处理
5. 完成模块编译：使用`loader`编译完所有模块后，得到每个模块被编译后的最终内容以及它们的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个包含多个模块的`chunk`，再把每个`chunk`转换成一个单独的文件加入到输出列表
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统