**Promise**

`Promise`解决`callback`回调地狱问题。

`Promise`规范：`Promise`有三种状态，等待`pending`、已完成`fulfilled/resolved`、已拒绝`rejected`。`Promise`的状态只能从等待`pending`转到已完成`fulfilled/resolved`或者已拒绝`rejected`，不能逆向转换，同时已完成和已拒绝也不能相互转换。

`promise`必须提供一个`then`方法以访问其当前值、结果值和拒绝原因。`promise.then(resolve, reject)`，`resolve`和`reject`都是可选参数。如果`resolve`或`reject`不是函数，其必须被忽略。`then`方法必须返回一个`promise`对象。

实例化`Promise`对象需要传入函数（包含两个参数`resolve`和`reject`），内部确定状态。`resolve`和`reject`函数可以传入参数在回调函数中使用。

`resolve`和`reject`都是函数，传入的参数在`then`的回调函数中接收。

`then`接收两个函数，分别对应`resolve`和`reject`状态的回调，函数中接收实例化时传入的参数。

`catch`相当于`.then(null, rejection)`

当`then`中没有传入`rejection`时，错误会冒泡进入`catch`函数中，若传入了`rejection`，则错误会被`rejection`捕获，而且不会进入`catch`。此外，`then`中的回调函数中发生的错误只会在下一级的`then`中被捕获，不会影响该`promise`的状态。

`Promise`回调链：

`Promise`能够在回调函数里使用`return`和`throw`，在`then`中客以`return`出一个`promise`对象或其他值，也可以`throw`出一个错误对象，但如果没有`return`，将默认返回`undefined`，那么后面的`then`中的回调参数接收到的将是`undefined`。

-------------------

**Generator**

`generator`函数不会自动执行，每一次调用它的`next`方法，会停留在下一个`yield`的位置。利用这个特性，只要编写一个自动执行的函数，就可以让这个`generator`函数完全实现`async`函数的功能。

下一次调用`next`时，传的参数会被作为上一个`yield`前面接受的值。

`generator`函数使用：

1. 分阶段执行，可以暂停
2. 可以控制阶段和每个阶段的返回值
3. 可以知道是否执行到结尾

`generator`和异步控制：

利用`generator`函数的暂停执行的效果，可以把异步操作写在`yield`语句里面，等到调用`next`方法时再往后执行。异步操作的后续操作可以放在`yield`语句下面，等到调用`next`方法时再执行。`generator`函数用来处理异步操作，改写回调函数。

-------------------

**async/await**

`aysnc`和异步：

- `async`表示一个`async`函数，`await`只能用在这个函数里面
- `await`表示在这里等待异步操作返回结果，再继续执行
- `await`后一般是一个`promise`对象


`async`用于定义一个异步函数，该函数返回一个`Promise`

如果`async`函数返回的是一个同步的值，这个值将被包装成一个`resolve`的`Promise`，等同于`return Promise.resolve(true)`

`await`用于一个异步操作之前，表示要“等待”这个异步操作的返回值。`await`也可以用于同步的值。

> [async/await基本实现代码]()





