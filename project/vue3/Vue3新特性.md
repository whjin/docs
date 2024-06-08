**`v-model`**

支持多个`v-model`：通过参数达到一个组件支持多个`v-model`

**`watch`**

`watch`：不同数据类型监听

支持监听多个源：可以传入一个数组同时侦听多个数据

**`watchEffect`**

`watchEffect`：传入一个函数参数，该函数会立即执行，同时会响应式最终函数内的依赖变量，并在依赖发生改变时重新运行该函数。

和`watch`的却别：

- 运行时机不同，`watchEffect`会立即执行，相当于设置了`immediate: true`的`watch`
- `watchEffect`无法获取改变前后的值
- 与`watch`显示的指定依赖源不同，`watchEffect`会自动收集依赖源

**`$attrs`**

在`Vue3`中，`$attrs`包含父组件中除`props`和自定义事件外的所有属性集合。

不同于`Vue2`，`$attrs`包含了父组件的事件，`$listenners`被移除。

使用`v-bind`即可实现组件属性及事件透传。

**使用`ref`访问子组件**

在`vue2`中，使用`ref`即可访问子组件里的任意数据及方法，但在`Vue3`中则必须使用`defineExpose`暴露子组件内的方法或属性才能被父组件所调用。