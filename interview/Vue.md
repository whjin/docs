# `Vue`响应式系统

当数据模型`data`变化时，页面视图会得到响应更新，其原理对`data`的`getter/setter`方法进行拦截（`Object.defineProperty`或`Proxy`），利用发布订阅的设计模式，在`getter`方法中进行订阅，在`setter`方法中发布通知，让所有订阅者完成响应。

在响应式系统中，`Vue`会为数据模型`data`的每一个属性新建一个订阅中心作为发布者，而监听者`watch`、计算属性`computed`、视图渲染`template/render`三个角色同时作为订阅者。
- 对于监听器`watch`，会直接订阅观察者监听的属性
- 对于计算属性`computed`和视图渲染`template/render`，如果内部执行获取了`data`的某个属性，就会执行该属性的`getter`方法，然后自动完成对该属性的订阅，当属性被修改时，就会执行该属性的`setter`方法，从而完成该属性的发布通知，通知所有订阅者进行更新。