**基本原理**

1. `Promise`是一个类，在执行这个类时会传入一个执行器，这个执行器会立即执行
2. `Promise`会有三种状态
    - `Pending`等待
    - `Fulfilled`完成
    - `Rejected`失败
3. 状态只能有`Pending`-->`Fulfilled`或者`Pending`-->`Rejected`，且一旦发生改变便不可二次修改
4. `Promise`中使用`resolve`和`reject`两个函数来更改状态
5. `then`方法内部进行状态判断
    - 如果状态是成功，调用成功回调函数
    - 如果状态是失败，调用失败回调函数


**`Promise`状态**

- `pending`（进行中）
- `resolved/fulfilled`（已完成）
- `rejected`（已拒绝）

`Promise`只会从`pending`转换为`resolved/fulfilled`或者`rejected`，并且状态不可逆。

**`Promise`实例方法**

- `then()`：正确结果，接收两个函数参数（`resolve`、`reject`）
- `catch()`：异常结果
- `finally()`：执行完成结果

**`Promise`对象方法**

- `Promise.all()`：并发处理多个异步任务，所有任务都执行完成才能得到结果
- `Promise.race()`：并发处理多个异步任务，只要有一个任务完成就能得到结果

**`Promise.then()`方法**

- `then()`函数返回一个`Promise`对象（无论函数内部返回什么类型的数据，函数都会进行加工返回一个`Promise`对象）。
- `then()`函数内部返回为普通值（非`Promise`类型的属性），返回的普通值会直接传递给下一个`then`，通过`then`参数中函数的参数接收该值。
- 当`then()`函数内部返回的是`Promise`类型的对象时，返回的该`Promise`对象会调用下一个`then`方法。
- 当`then()`函数抛出异常，则`then()`函数的返回值状态是`reject`。

**`Promise.catch()`方法**

- `catch()`函数只有一个回调函数
