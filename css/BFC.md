`BFC`：块级格式化上下文，浏览器中创建了一个独立的渲染区域，并且拥有一套渲染规则，与外部的元素互不影响。

# 产生`BFC`

- `overflow: hidden|auto|scroll`
- `float: left/right`
- `position: absolute/fixed`
- `display: inline-block/flex/inline-flex/table-cell/table-caption`

# 应用场景

- 垂直`margin`合并（外边距塌陷）
- 自适应两栏布局
- 清除浮动（浮动元素遮挡）