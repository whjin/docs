`Object.is()`与原来的比较操作符`===`、`==`的区别？

- `==`判断，会在比较时进行类型转换
- `===`判断（严格判断），比较时不进行隐式类型转换，类型不同就会返回`false`
- `Object.is()`在`===`判断的基础上特别处理了`NaN`、`-0`和`+0`，保证`-0`和`+0`不再相同，但`Object.is(NaN,NaN)`会返回`true`

## ES6常用功能 ##

1. 关键字`let/const`
2. 新增基本数据类型`Symbol`
3. `Set`、`Map`
4. 多行字符串/模板变量，字符串模板
5. 解构赋值、函数默认参数、扩展操作符/剩余操作符等，新增语法
6. 块级作用域
7. 参数`rest/...`
8. 箭头函数
9. `Promise`、`generator`生成器、`async/await`
10. 类`Class`、`constructor`、`extends`
11. 支持模块化`Es6 Module`:`import/export`
12. 新增数组、字符串等内置构造函数方法，`Array.isArray`、`Array.from`、`Array.of`
13. 新增元编程，`Proxy`、`Reflect`

**let/const**

使用`let/const`关键字声明变量的`for`循环，会创建块级作用域，还会将它绑定到每个循环中，确保对上个循环结束时的值进行重新赋值。

**暂时性死区**

使用`let/const`声明的变量，从一开始就形成了封闭作用域，在声明变量之前无法使用这个变量。

`let/const`在进入块级作用域后，会因为提升的原因先创建，但不会被初始化，直到声明语句执行时才被初始化，初始化是如果使用`let`声明的变量没有赋值，则会默认赋值为`undefined`，而`const`必须在初始化时赋值。

创建到初始化之间的代码片段就形成了暂时性死区。

> 由`let/const`声明的变量，当它们包含的词法环境被实例化时会被创建，但只有在变量的词法绑定已经被求值运算后，才能够被访问。

**Iterator迭代器**

`Iterator`是`ES6`常用特性的实现基础（解构赋值、剩余/扩展运算符`.../...rest`、生成器、`for`循环）。

对于可迭代的数据解构，`ES6`在内部部署了一个`[Symbol.iterator]`属性，它是一个函数，执行后会返回`iterator`对象（也叫迭代器对象），而生成`iterator`对象`[Symbol.iterator]`属性叫`iterator`接口，有这个接口的数据结构即被视为可迭代。

数组中的`[Symbol.iterator]`方法（`iterator`接口）默认部署在数组原型上。

默认部署`iterator`接口的数据结构：`Array`、`Map`、`Set`、`String`、`TypedArray`（类数组）、函数的`arguments`对象、`NodeList`对象。

`Iterator`迭代器是一个对象，它具有一个`next`方法。

- 可迭代的数据结构会有一个`[Symbol.iterator]`方法
- `[Symbol.iterator]`执行后返回一个`iterator`对象
- `iterator`对象有一个`next`方法
- 执行一次`next`方法（消耗一次迭代器）会返回一个有`value, done`属性的对象

**解构赋值**

数组结构的原理其实是消耗数组的迭代器，把生产对象的`value`属性的值赋值给对应的变量。

**剩余运算符`rest`**

剩余运算符最重要的一个特点就是替代了以前的`arguments`。

箭头函数没有`arguments`，必须使用剩余运算符才能访问参数集合。

剩余运算符可以和数组的解构赋值一起使用，但是必须放在最后一个，因为剩余运算符的原理其实是利用了数组的迭代器，它会消耗`...`后面的数组的所有迭代器，读取所有迭代器生产对象的`value`属性。

剩余运算符和扩展运算符的区别是，剩余运算符会收集这些集合，放到右边的数组中，扩展运算符是将右边的数组拆分成元素的集合，它们是相反的。
    
## Promise

**基本使用和原理**

- 如何异常捕获
- 多个串联-链式执行的好处
- `Promise.all`和`Promise.race`
- `Promise`标准-状态变化、`then`函数

**`Promise`语法**

    function loadImg(src) {
      const promiss = new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.onload = function () {
          resolve(img);
        };
        img.onerror = function () {
          reject()
        };
        img.src = src;
      });
      return promiss;
    }
    
    let src = 'img_url';
    const result = loadImg(src);
    
    result.then(img => {
      console.log(img.width);
    }, () => {
      console.log('failed');
    });
    
    result.then(img => {
      console.log(img.height);
    });
    
**问题解答**

- `new Promiss()`实例，而且要`return`
- `new Promise`时要传入函数，函数有`resolve`、`reject`两个参数
- 成功时执行`resolve()`，失败时执行`reject()`
- `then`监听结果

**异常捕获**

    //规定：then只接受一个参数，最后统一用catch捕获异常
    result.then(function (img) {
      console.log(img.width);
    }).then(function (img) {
      console.log(img.height);
    }).catch(function (ex) {
    //  最后统一catch
      console.log(ex);
    });
    
**`Promise.all`&`Promise.race`**    

    //Promise.all接收一个promise对象的数组
    //待全部完成之后，统一执行success
    Promise.all([result1, result2]).then(datas => {
      //接收到的datas是一个数组，依次包含了多个promise返回的内容
      console.log(datas[0]);
      console.log(datas[1]);
    });
    
    //Promise,race接收一个包含多个promise对象的数组
    //只要有一个完成，就执行success
    Promise.race([result1, result2]).then(data => {
      //data即最先执行完成的，promise的返回值
      console.log(data);
    });
    
## Promise标准-状态变化 ##

- 三种状态：`pending`、`fullfilled`、`reject`
- 初始状态：`pending`
- `pending`变为`fullfilled`，或者`pending`变为`rejected`
- 变化状态不可逆

## Promise标准-`then` ##

- `Promise`实例必须实现`then`这个方法
- `then()`必须可以接收两个函数作为参数
- `then()`返回的必须是一个`Promise`实例

