**Proxy**

在`Vue3`中使用`Proxy`对象代替`Vue2`中基于`Object.defineProperty`，消除了`Vue2`中基于`Object.defineProperty`存在的一些局限，比如无法监听数组索引，`length`属性等。

在`Proxy`中默认监听动态添加属性和属性的删除操作。

`Proxy`配合`Reflect`使用，代码运行期间用来设置或获取（操作）对象成员。

- `target`：参数表示所要拦截的目标对象
- `handler`：参数也是一个对象，用来定制拦截行为

`this`关键字代理`handler`对象，不能使用`this`要用`receiver`传递，`receiver`代表当前`proxy`对象或继承`proxy`对象，保证传递正确的`this`给`getter/setter`。

`set`和`deleteProperty`需要返回（添加`return`），返回一个布尔值，设置/删除成功返回`true`。

**reactive**

返回`proxy`对象，`reactive`可以深层次递归，子元素存在引用类型，递归处理。

**收集依赖/触发更新**

响应顺序：`effect>track>trigger>effect`

在组件渲染过程中，一个`effect`会触发`get`，对值进行`track`，当值发生变化，就会进行`trigger`，执行`effect`完成一个响应。

**触发更新**

在`set`中使用`trigger`函数触发更新。

**ref**

把一个基础类型包装成一个有`value`响应式对象（使用`get/set`存取器，进行追踪和触发），普通对象调用`reactive`创建响应式对象。

**toRef**

`toRef`传入两个参数，目标对象，对象中的属性名，返回结果是属性名的可响应式数据，将对象中的某个值转化为响应式数据`toRef(obj, key)`。

`ref`是对原始数据的拷贝，当修改`ref`数据时，模板中的视图会发生改变，但是原始数据不会。`toRef`是对原始数据的引用，修改`toRef`数据时，原始数据也会发生改变，但是视图不会更新。

**toRefs**

使用`reactive`创建对象，不能直接进行结构，使用`toRefs`进行结构，把整个`reactive`对象变成普通对象，然后把每个属性变成`ref`响应式对象。