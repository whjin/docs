# 限定`webpack`处理文件范围

`loader`配置：推荐每个`loader`在定义`test`之后还需要定义`include`或`exclude`。

`resolve.extensions`配置遵守以下规则：

- 尽量减少后缀列表，只配置存在的文件后缀。
- 注意列表顺序，频率高的文件排到前面。
- 导入模块时手动加上后缀。

`module.noParse`配置：可以告诉`webpack`忽略未采用模块系统文件的处理，可以有效地提高性能。

`webpack.IgnorePlugin`配置：在导入模块时，`webpack.IgnorePlugin`可以忽略指定模块的生成。比如`moment.js`在导入时会自动导入本地化文件，一般情况下它几乎不使用而且又比较大，此时可以通过`webpack.IgnorePlugin`忽略对本地化文件的生成，以减小文件大小。

`webpack.DllPlugin`配置：先将公共模块打包为独立的`Dll`模块，包含大量复用模块的动态链接库只需编译一次，然后在业务代码中直接引用这些模块。采用`DLLPlugin`之后会大大提升`webpack`构建的速度。

在`webpack`中使用动态链接库有以下两个步骤：

- 通过`webpack.DllPlugin`插件打包出`Dll`库。
- 通过`webpack.DllReferencePlugin`引用打包好的`Dll`库。

`Dll`库需要单独构建，需要一份单独的配置`webpack`文件。

