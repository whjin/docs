`Symbol`是`ES6`的新增属性，代表用给定名称作为唯一标识，用于表示一个独一无二的值。

`Symbol`是基本类型，不能用`new`进行创建。

`Symbol`确保唯一，即使使用相同的名称，也会产生不同的值。

创建一个字段，仅为知道对应`symbol`的人能访问，使用`symbol`很有用，`symbol`并不是`100%`隐藏，有内置方法`Object.getOwnPropertySymbols(obj)`可以获得所有的`symbol`。

也有一个方法`Reflect.ownKeys(obj)`返回对象所有的键，包括`symbol`。

1. `Symbol` 属性不可枚举，不会被`for...in`获取
    可以通过`Object.getOwnPropertySymbols(obj)`访问`Symbol`属性
    也可以通过`Reflect.ownKeys(obj)`访问全部属性
    `Symbol.iterator`属性可以判断对象是否可以被`for...of`遍历
2. 对象中未被变量记录的`Symbol`属性名，将无法选中属性


**应用：**

1. 可以把一些不需要对外操作和访问的属性使用`Symbol`来定义
2. 保证常量的值是唯一性，保证常量和变量不相等
3. 为类创建私有属性方法，控制访问
