改变函数内部`this`指针的指向函数（`call`、`apply`、`bind`）

通过`call`和`apply`改变函数的`this`指向，这两个函数的第一个参数都是要改变指向的对象，第二个参数，`call`是`arg1,arg2,arg3...`形式，`apply`则是数组。通过`bind`改变`this`作用域会返回一个新的函数，这个函数不会马上执行。