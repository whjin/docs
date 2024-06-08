# 限定`webpack`处理文件范围

`loader`配置：推荐每个`loader`在定义`test`之后还需要定义`include`或`exclude`。

`resolve.extensions`配置遵守以下规则：

- 尽量减少后缀列表，只配置存在的文件后缀。
- 注意列表顺序，频率高的文件排到前面。
- 导入模块时手动加上后缀。

# `noParse`

`module.noParse`配置：可以告诉`webpack`忽略未采用模块系统文件的处理，可以有效地提高性能。

# `IgnorePlugin`

`webpack.IgnorePlugin`配置：在导入模块时，`webpack.IgnorePlugin`可以忽略指定模块的生成。比如`moment.js`在导入时会自动导入本地化文件，一般情况下它几乎不使用而且又比较大，此时可以通过`webpack.IgnorePlugin`忽略对本地化文件的生成，以减小文件大小。

# `DllPlugin/DllReferencePlugin`

`webpack.DllPlugin`配置：先将公共模块打包为独立的`Dll`模块，包含大量复用模块的动态链接库只需编译一次，然后在业务代码中直接引用这些模块。采用`DLLPlugin`之后会大大提升`webpack`构建的速度。

在`webpack`中使用动态链接库有以下两个步骤：

- 通过`webpack.DllPlugin`插件打包出`Dll`库。
- 通过`webpack.DllReferencePlugin`引用打包好的`Dll`库。

`Dll`库需要单独构建，需要一份单独的配置`webpack`文件。[webpack.dll.config.js](https://github.com/whjin/docs/blob/main/webpack/webpack.dll.config.js)

# `happyPack`

`happyPack`配置：`webpack`默认情况下是单进程执行的，因此无法利用多核优势，通过`happyPack`可以变成多进程构建，从而提升构建的速度。[webpack.happypack-config.js](https://github.com/whjin/docs/blob/main/webpack/webpack.config.js)

# `Tree-Shaking`

在实际开发中，虽然依赖了某个模块，但只使用了其中的部分代码，通过`Tree-Shaking`，可以将模块中未使用的代码剔除掉，从而减少构建结果的大小。

只有使用`ES6`模块系统的代码，在`mode`为`production`时，`Tree-Shaking`才会生效。因此，在编写代码时尽量使用`import/export`的方式。

# 按需加载

	import("echarts").then((modules) => {
	  const echarts = modules.default;
	  const chart = echarts.init(document.querySelector("#chart"));
	});

使用按需加载时，构建代码中会包含`Promise`调用，因此低版本浏览器需要注入`Promise`的`polyfill`实现。

# 提取公共代码

`webpack4`中可以将多个公共模块打包一份，减少代码冗余。

第三方库代码的变更一般比较少，因此构建出来的`vendor.js`基本不用变更就可以利用浏览器的缓存机制进行缓存。

而应用代码的变更比较频繁，因此单独打包为`common.js`，浏览器可以单独缓存，如果应用代码发生变更，浏览器只用重新下载`common.js`文件，而不用重新下载`vendor.js`。

# 热更新`HMR`