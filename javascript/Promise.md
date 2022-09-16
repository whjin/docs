`Promis`对象用于表示一个异步操作的最终完成（或失败）及其结果值。

一个`Promise`有以下几种状态：

- `pending`：初始状态
- `fulfilled`：操作成功
- `rejected`：操作失败

`Promise`只会从`pending`转换为`fulfilled`或者`rejected`，整个转换只发生一次。

`Promise`构造函数接收一个执行函数，该函数接收`resolve`和`reject`两个回调函数，当执行函数运行成功时需调用`resolve`，执行错误时需调用`reject`。

`Promise`构造函数的签名如下：

	function Promise(function(resolve, reject): Promise {
	   // 原来的异步逻辑
	});

一旦`Promise`发生状态变化，就会触发`then`方法，`then`方法签名如下：

	Promise.prototype.then = function(onFulfilled[, onRejected]): Promise

- `onFulfilled Promise`：执行成功时回调。
- `onRejected Promise`：执行出错时回调，该参数是可选的。
- `then`方法：返回一个新的`Promise`对象，因此`Promise`支持链式调用。

由于`then`的第二个参数`onRejected`参数是可选的，因此`Promise`的原型上提供了`catch`方法来捕获异步错误，`catch`方法签名如下：

	Promise.prototype.catch = function(onRejected): Promise

- `onRejected Promise`：执行错误时回调。
- `catch`方法：返回一个新的`Promise`对象。

`Promise`的`then`或`catch`回调函数的返回值会作为下一个`then/catch`的输入参数，因此可以通过链式`Promise`来扁平化嵌套的回调函数。

多个`Promise`链式调用时一旦有一个出错，整个调用链就会终止，然后回调`catch`函数。

- `Promise.resolve(value)`	

- `Promise.reject(reason)`	

> `Promise.all(promises)`
> 
> 接收一个`Promise`数组，返回一个新的`Promise`对象。
> 
> - `Promise`数组中所有`Promise`都成功执行的情况下，返回的`Promise`最终会触发成功。
> - `Promise`数组中只要有一个`Promise`执行失败，返回的`Promise`最终会执行失败。

> `Promise.race(promises)`
>  
> 接收一个`Promise`数组，返回一个新的`Promise`对象。
> 当`Promise`数组中任意一个`Promise`执行成功或失败，返回的`Promise`则立即成功或失败。
