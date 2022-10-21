`async`是一个修饰符，`async`定义的函数会默认的返回一个`Promise`对象`resolve`的值，因此，对`async`函数可以直接进行`then`操作，返回的值即为`then`方法的传入函数。

`await`关键字只能放在`async`函数内部，`await`关键字的作用就是获取`Promise`中返回的内容，获取的是`Promise`函数中`resolve`或`reject`的值。