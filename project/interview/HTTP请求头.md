|请求头|说明|
|-----|-----|
|`Accept`|响应内容的类型`Content-Type`|
|`Accept-Charset`|字符集|
|`Accept-Encoding`|响应内容的编码方式|
|`Accept-Language`|响应内容的预研列表|
|`Accept-Datetime`|按照时间来表示的响应内容版本|
|`Authorization`|需要认证资源的认证信息|
|`Cache-Control`|是否使用缓存机制|
|`Connection`|客户端优先使用的连接类型|
|`Cookie`|服务器通过`Set-Cookie`设置一个`HTTP`协议`Cookie`|
|`Content-Length`|以`8`进制表示的请求体的长度|
|`Content-MD5`|请求体内容的二进制`MD5`散列值（数字签名），以`Base64`编码的结果|
|`Content-Type`|请求体的`MIME`类型（用于`POST`和`PUT`请求中）|
|`Date`|发送该消息的日期和时间|
|`Host`|服务器的域名以及服务器监听的端口号，`80`、`443`端口可省略|
|`If-Match`|客户端实体与服务器上对应的实体相匹配时，才进行对应的操作。仅当上次更新资源未被修改，才更新该资源。|
|`If-Modified-Since`|返回`304`，资源未修改（在对应资源未被修改的情况下）|
|`If-None-Match`|返回`304`，内容未修改（在对应内容未被修改的情况下）|
|`Origin`|发起一个针对跨域资源共享的请求（该请求要求服务器在响应中加入一个`Access-Control-Allow-Origin`的消息头，表示访问控制所允许的来源）|
|`User-Agent`|浏览器的身份标识字符串|
|`Upgrade`|要求服务器升级到一个高版本协议|


- 通用首部（`General`）
	请求报文和响应报文都会使用的首部字段
- 请求首部（`Request Header`）
	客户端向服务器端发送请求时使用的首部信息
- 响应首部
	服务器端向客户端发送响应内容时使用的首部信息
- 实体首部
	针对请求报文和响应报文的实体部分使用的首部。

**通用首部字段**

1、`Cache-Control`：控制缓存的行为

|缓存请求指令|说明|
|-----|-----|
|`no-cache`|强制向源服务器再次验证|
|`no-store`|不缓存请求或响应的任何内容|
|`max-age`|响应的最大`Age`值|
|`max-stale`|接收已过期的响应|
|`min-fresh`|期望在指定时间内的响应仍有效|
|`no-transform`|代理不可更改媒体类型|
|`only-if-cached`|从缓存获取资源|
|`cache-extension`|新指令标记|

|缓存响应指令|说明|
|-----|-----|
|`public`|可向任意方提供响应的缓存|
|`private`|仅向特定用户返回响应|
|`no-cache`|缓存前必须先确认其有效性|
|`no-store`|不缓存请求或响应的任何内容|
|`no-transform`|代理不可更改媒体类型|
|`max-age`|响应的最大`Age`值|
|`s-maxage`|公共缓存服务器响应的最大`Age`值|
|`must-revalidate`|可缓存但必须再向源服务器进行确认|
|`proxy-revalidate`|要求中间服务器对缓存的响应有效性再进行确认|
|`cache-extension`|新指令标记|

2、`connection`：逐跳首部、连接的管理

`Connection`：不再转发给代理的首部字段

`Connection`：`close/Keep-Alive`，管理持久连接

3、`Date`：创建报文的日期和时间

4、`Pragma`:`no-cache`，只用在客户端发送请求中，表示客户端要求所有的代理服务器都不返回缓存的资源

5、`Trailer`：`Expires`，表示在报文主体之后出现了首部字段`Expires`

6、`Transfer-Encoding`：规定了传输报文主体时采用的编码格式

7、`Upgrade`：`TLS/1.0,HTTP/1.1`;`Connection`:`Upgrade`，用于检测是否可以用更高版本的`HTTP`协议进行通信，或者用其他不同的通信协议

8、`Via`：转发经过各个代理服务器时，会在`Via`首部追加自身服务器的信息；还可以避免请求回环的发生

