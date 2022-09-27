# `DOCTYPE`的作用

告知浏览器的解析器用什么文档标准解析这个文档。`DOCTYPE`不存在或格式不正确会导致文档以兼容模式呈现。

# 标准模式和兼容模式的区别

在标准模式下，浏览器的解析规则都是按照最新的标准进行解析。在兼容模式下，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

# 行内元素和块级元素的区别

- 块级元素独占一行，行内元素水平排列
- 块级元素可以包含块级元素和行内元素，行内元素只能其他行内元素，不能包含块级元素
- 和模型属性：行内元素设置宽高无效，设置上下`margin/padding`无效

# `async`和`defer`区别

- `async`属性表示异步执行引入的脚本，与`defer`的区别是，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。
- `defer`属性表示延迟执行引入的脚本，即脚本加载时`HTML`并未停止解析，这两个过程是并行的。当整个`document`解析完毕后再执行脚本，在`DOMContentLoaded`事件触发之前完成。多个脚本按顺序执行。

# `重绘`和`回流/重排`

- 重绘：当渲染树中一些元素需要更新属性，而这些属性只是影响元素的外观、风格，不会影响布局的操作称为重绘。
- 回流/重排：当渲染树中的一部分（或全部）因为元素的尺寸、布局、显隐等改变而需要重新构建的操作称为回流。

常见引起回流属性和方法：

任何会改变元素几何信息（元素的位置和尺寸大小）的操作，都会触发回流。

回流必定发生重绘，重绘不一定会引发回流。改变父节点里的子节点很可能会导致父节点的一系列回流。

- 添加或删除可见的`DOM`元素
- 元素尺寸改变——`width`、`height`、`margin`、`padding`、`border`
- 内容变化，比如在`input`框中输入文字
- 浏览器窗口尺寸改变——`resize`事件
- 计算`offsetWidth`和`offsetHeight`属性
- 设置`style`属性的值
- 修改网页的默认字体

# 如何减少回流

- 使用`transform`替代`top`
- 不要把节点的属性值放在一个循环里作为循环变量
- 不要使用`table`布局，可能一个很小的改动会造成整个`table`的重新布局
- 把`DOM`离线后修改。比如使用`documentFragment`对象在内存里操作`DOM`
- 不要一条一条地修改`DOM`样式，预先定义好`class`，然后修改`DOM`的`className`

# `DOMContentLoaded`事件和`load`事件的区别

当初始的`HTML`文档被完全加载和解析完成后，`DOMXContentLoaded`事件被触发，而无需等待其他样式、图片资源加载完成。

`load`事件是当所有资源加载完成后触发。

# `HTML5`新特性

`HTML5`新增媒体、图像、位置、存储、多任务等功能。

- 绘画：`canvas`
- 音视频媒体：`video`、`audio`
- 本地离线存储：`localStorage`、`sessionStorage`
`localStorage`长期存储数据，浏览器关闭后数据不丢失
`sessionStorage`浏览器关闭后数据自动删除
- 语义化标签：`header`、`main`、`footer`、`nav`、`aside`、`session`、`article`、`address`、`hgroup`、`figure`、`time`
- 表单控件：`calendar`、`date`、`time`、`email`、`url`、`search`
- 新的技术：`WebSocket`、`Web Worker`
- 新的文档属性：`document.visibilityState`

# `cookies`、`sessionStorage`和`localStorage`的区别

`cookie`：服务器端用于记录用户状态的一种方式，有服务器设置，在客户端存储，然后每次发起同源请求时，发送给服务器端，它的生存时间由`expires`属性指定。

- 存储大小：
`cookie`：最多存储`4k`数据
`localStorage`、`sessionStorage`至少存储`5M`数据

- 有效时间：
`cookie`：设置的`cookie`过期时间之前一直有效，即使窗口或浏览器关闭。
`localStorage`：存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
`sessionStorage`：数据在页面会话结束时被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。

- 作用域
`cookie`：在所有同源窗口中都是共享的。
`localStorage`：在所有同源窗口中都是共享的。
`sessionStorage`：只在同源的窗口（或标签页）中共享数据，也就是只在当前会话中共享。

当需要存储大量数据时，可以使用浏览器的`indexDB`，这是浏览器提供的一种本地的数据库存储机制，它内部采用对象仓库的形式存储数据，更接近`noSQL`数据库。

# `iframe`缺点

`iframe`元素会创建包含另外一个文档的内联框架（即行内框架）。

- `iframe`会阻塞主页面的`onload`事件。`window`的`onload`事件需要在所有`iframe`加载完毕后（包含里面的元素）才会触发。在`Safari`和`Chrome`里，通过`JavaScript`动态设置`iframe`的`src`可以避免这种阻塞情况。
- 搜索引擎的检索程序无法解读这种页面，不利于网页的`SEO`。
- `iframe`和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
- 浏览器的后退按钮失效。
- 小型的移动设备无法完全显示框架。

# 浏览器多个标签页通信

- `WebSocket`
- `ShareWorker`，两个页面共享同一个线程，通过向线程发送数据和接收数据实现标签页之间的双向通信。
- `localStorage`、`cookies`等本地存储方式，`localStorage`另一个浏览上下文里被添加、修改或删除时，它都会触发一个`storage`事件，通过监听`storage`事件控制它的值来进行页面信息通信。
- `postMessage`