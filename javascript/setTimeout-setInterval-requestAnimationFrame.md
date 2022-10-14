与`setTimeout`、`setInterval`不同，`requestAnimationFrame`不需要设置时间间隔，`RAF`采用的是系统时间间隔。

`requestAnimationFrame`特点：

1. `requestAnimationFrame`会把每一帧中的所有`DOM`操作集中起来，在一次重绘或重排（回流）中完成，并且重绘或重排（回流）的时间间隔紧紧跟随浏览器的刷新频率。
2. 在隐藏或不可见元素中，`requestAnimationFrame`将不会进行重绘或重排（回流），意味着更少的`CPU`、`GPU`和内存使用量。
3. `requestAnimationFrame`是由浏览器专门为动画提供的`API`，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下，动画会自动暂停，有效节省了`CPU`开销。


`requestAnimationFrame`告诉浏览器执行动画并请求浏览器在下一次重回之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。