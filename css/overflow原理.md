块级格式化上下文`BFC`是`CSS`可视化渲染的一部分，它是一块区域，规定了内部块盒子的渲染方式，以及浮动相互关系的影响关系。

当元素设置了`overflow`值为`auto/scroll`时，该元素就构建了一个`BFC`，`BFC`在计算高度时，内部浮动元素的高度也要计算在内，也就是说即使`BFC`区域内只有一个浮动元素，`BFC`的高度也不会发生坍塌，所以达到了清除浮动的目的。