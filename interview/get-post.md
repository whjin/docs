- `get`参数通过`url`传递，`post`放在`request body`中
- `get`请求在`url`中传递的参数有长度限制，`post`没有
- `get`参数直接暴露在`url`中，不安全
- `get`请求只能进行`url`编码，`post`支持多种编码方式
- `get`请求浏览器会主动`cache`缓存，`post`一般不缓存
- `get`请求参数会被完整保留在浏览历史记录中，`post`中的参数不会被保留
- `get`产生一个`TCP`数据包，`post`产生两个