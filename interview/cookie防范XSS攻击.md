`XSS`跨站脚本攻击，攻击者在返回的`HTML`中嵌入`JavaScript`脚本，为了减轻这些攻击，需要在`HTML`头部加上`set-cookie`：

- `HttpOnly`属性可以防止`XSS`，它会禁止`JavaScript`脚本来访问`cookie`。
- `secure`属性告诉浏览器仅在请求为`https`的时候发送`cookie`。