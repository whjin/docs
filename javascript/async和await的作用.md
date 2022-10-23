`async`是一个修饰符，`async`定义的函数会默认的返回一个`Promise`对象`resolve`的值，因此，对`async`函数可以直接进行`then`操作，返回的值即为`then`方法的传入函数。

`await`关键字只能放在`async`函数内部，`await`关键字的作用就是获取`Promise`中返回的内容，获取的是`Promise`函数中`resolve`或`reject`的值。

`async/await`在底层转换成了`Promise`和`then`回调函数。

也就是说，这个`Promise`的语法糖。

每次使用`await`解析器都创建一个`Promise`对象，然后把剩下的`async`函数中的操作放到`then`回调函数中。

`async/await`的实现，离不开`Promise`。