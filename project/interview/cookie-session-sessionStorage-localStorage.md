- `cookie`存储在客户端
- `cookie`可以在服务器端响应时设置，也可以在客户端请求时设置（`http`首部`set-cookie`）
- `cookie`有大小限制，一般为`4K`，很多浏览器都限制一个站点最多保存`20`个`cookie`
- `cookie`可以设置路径（`path`），限制只属于某个路径下
- `cookie`数据始终在同源的`http`请求中携带（即使不需要），即`cookie`在客户端（浏览器）和服务器端之间来回传递


- `session`存储在服务器端
- `session`存储敏感信息，安全性比`cookie`高
- `session`会在一定时间内保存在服务器上，当访问增多会占用服务器性能

**生命周期：**

- `cookie`，在设置过期时间内有效，过期后自动失效，没有设置过期时间默认关闭浏览器（不是浏览器标签页，而是整个浏览器）后失效
- `sessionStorage`：在关闭浏览器或标签后失效
- `localStorage`：持久保存数据，手动删除失效

**保存数据大小：**

- `cookie`：一般为`4K`
- `sessionStorage/localStorage`：一般为`5M`或更大

**作用域：**

- `cookie`：在所有同源窗口/标签共享
- `sessionStorage`：只在当前窗口/标签有效，不能共享
- `localStorage`：在所有同源的窗口/标签共享