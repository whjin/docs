- `get`参数通过`url`传递
- `get`请求在`url`中传递的参数有长度限制
- `get`参数直接暴露在`url`中，不安全
- `get`请求只能进行`url`编码
- `get`请求浏览器会主动`cache`缓存
- `get`请求参数会被完整保留在浏览历史记录中
- `get`产生一个`TCP`数据包
- `get`请求，浏览器把`http header`和`data`一起发送给服务器


- `post`放在`request body`中
- `post`没有传参长度限制
- `post`支持多种编码方式
- `post`一般不缓存
- `post`中的参数不会被保留
- `post`产生两个数据包
- `post`请求，浏览器先发送`header`，服务器返回响应`100 continue`，浏览器再发送`data`