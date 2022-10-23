`Promise.all(promiseArray)`方法是`Promise`对象上的静态方法，该方法的作用是将多个`promise`对象实例包装，生成并返回一个新的`promise`实例。

此方法用于集合多个`promise`的返回结果。返回值将会按照参数内的`promise`顺序排列，而不是调用`promise`的完成顺序决定。

`Promise.all`的特点：

- 接收一个`Promise`实例的数组或具有`Iterator`接口的对象
- 如果元素不是`Promise`对象，则使用`Promise.resolve`转成`Promise`对象
- 如果全部成功，状态变为`resolved`，返回值将组成一个数组传给回调
- 只要有一个失败，状态就变为`rejected`，返回值将直接传递给回调`all()`的返回值，也是新的`Promise`对象

``Promise.all方法参数是一个`Promise`的数组