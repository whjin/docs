## `OSI` 模型

- `Open Systems Interconnection` 开放式通信互联系统 `ISO`
- `OSI` 模型是国际组织 `ISO` 创建的，用于描述网络通信的协议，是 `TCP/IP` 模型的基础
  1. 应用层：提供应用层服务，如 `HTTP`、`FTP`、`SMTP`、`DNS` 等
  2. 表示层：提供数据格式转换，如 `ASCII`、`UTF-8` 等，数据压缩、数据加密、数据内容的描述
  3. 会话层: 提供会话管理，如 `Telnet`、`SSH` 等
  4. 传输层: 提供数据传输，如 `TCP`、`UDP` 等，不同主机进程间的通信
  5. 网络层：提供网络通信，如 `IP`、`UDP`、`TCP` 等
  6. 数据链路层：提供数据链路，如 `Ethernet`、`WiFi` 等，`Mac`地址、`IP` 数据包
  7. 物理层：提供物理通信，如 `Ethernet`、`WiFi` 等

## `TCP/IP`

- 在多个不同的网络之间进行数据传输的协议
- `TCP` 传输控制协议
- `IP` 报文包 `UDP`、`SMTP`、`FTP`

- `OSI` 面向连接 `7`层，做了明确声明
- `TCP/IP` 无连接 `5`层，没有对网络接口层

## `TCP/UDP`

**`UDP`**

- `User Datagram Protocol` 用户数据报协议
- 面向数据报的通信协议，针对应用层交互下的数据没有任何的处理
- `UDP` `4`个字段 每个字段 `16 bite`
- 源端口 目标端口 长度 校验和
- `UDP`首部 + 数据部分

**`TCP`**

- `TCP` `Transmission Control Protocol` 传输控制协议
- 流水形式 发送方 `TCP` 缓存区 网络是否适合发送 网络是否拥塞
- 丢包 重发 发送顺序乱-排序 按顺序发送
- 面向连接 控制流量、保序、可靠
- `IP` 重发控制 连接管理 窗口管理

**区别**

1. 可靠性：`TCP` 是可靠的，`UDP` 不可靠
2. 连接性：`TCP` 是连接的，`UDP` 是无连接的
3. 效率：`TCP` 慢，`UDP` 快
4. 流量控制：`TCP` 慢，`UDP` 快，`TCP`滑动窗口
5. 拥塞控制：`TCP` 慢，`UDP` 快，`TCP`拥塞控制

## `GET/POST`

- `HTTP`发送请求方法
- `GET`：获取指定资源的表示方式，只适合于获取数据
- `POST`：数据传输到指定的资源位，有副作用
- `GET` 在浏览器回退
- `GET` `cache` 在浏览器
- `url`编码 `POST`多种编码方式
- `GET`数据类型 只接受 `ASCII`
- `POST` 更适合传输安全数据

**区别**

- 参数位置
- 参数长度
- 安全性

## 三次握手

- `TCP` 在建立连接时，客户端和服务端都会进行三次握手
  1. 客户端向服务端发送一个 `SYN` 包，报文 `SYN = 1 seq = x`，当客户端发送后 `SYN_SENT`
  2. 服务端 `SYN = 1 ACK = 1 seq = y ack = x + 1`，发送后服务器 `SYN_RECV`
  3. 客户端 `SYN = 1 ACK = 1 seq = x + 1 ack = y + 1`，发送后客户端 `ESTABLISHED`

## 四次挥手

- 客户端 发送 `FIN = 1 seq = x`，客户端 `FIN_WAIT1`
- 服务端 接收到 `FIN ACK = 1 seq = y ack = x + 1`，服务端 `CLOSE_WAIT`
- 服务端 `FIN = 1 ACK = 1 seq = y + 1 ack = x + 1`
- 客户端 `FIN = 1 ACK = 1 seq = x + 1 ack = y + 2`

## `HTTP`请求头

- `HTTP`请求 `header fields`
- `Accept`：`content-type`
- `Accept-Charset`：`utf-8`
- `Accept-Encoding`：`gzip`
- `Accept-Language`：`zh-CN`

- `Cache-Control`
- `Connection`：`keep-alive` 保持长连接 `Upgrqade` 升级长连接
- `Cookoie`: `set-cookie`
- `Content-Length`
- `Content-Type`
- `Date`
- `Expect`
- `Host`：`Referer` `User-Agent`
- `If-Match`
- `If-Modified-Since`
- `If-None-Match`
- `User-Agent`

### 协商缓存

- `Last-Modified`
- `If-Modified-Since`
- `Etag`
- `If-Match`
- `If-None-Match`

### 强缓存

- `Cache-Control`
- `Expires`

### 会话状态

- `cookie`
- `set-cookie`

## `HTTP`状态码

- `1xx`：请求已经被接收，但是需要继续处理
  - `100`：客户端发送 `POST` 请求给服务端，询问服务端意见
- `2xx`：服务端接收 `200`
  - `206`：大文件上传
- `3xx`：适用于重定向
  - `301`：永久重定向
  - `302`：临时重定向
  - `304`：缓存，协商缓存
  - `305`：跳转
  - `307`：临时重定向
- `4xx`: 客户端有问题
  - `400`-`bad request`
  - `401`-`unauthorized`
  - `403`-`forbidden`
  - `404`-`not found`
  - `405`-`method not allowed`
  - `406`-`not acceptable`
  - `407`-`proxy authentication required`
  - `408`-`request timeout`
  - `409`-`conflict`
  - `410`-`gone`
  - `411`-`length required`
  - `412`-`precondition failed`
  - `413`-`payload too large`
- `5xx`: 服务端报错
  - `500`-`internal server error`
  - `501`-`not implemented`
  - `502`-`bad gateway`
  - `503`-`service unavailable`
  - `504`-`gateway timeout`
  - `505`-`http version not supported`
  - `506`-`variant also negotiates`
  - `507`-`insufficient storage`
  - `508`-`loop detected`

## `HTTPS`

**`HTTP`**

- `HTTP` `Hypertext Transfer Protocol`
- `C/S`: `Client/Server`
- 灵活 、可扩展，`HTTP`运行传输各种数据类型 `Content-Type`
- 简单快速，`GET /index.html HTTP/1.1`
- 无连接 无状态
- 明文传输

**`HTTPS`**

- `SSL/TLS` + `HTTP`
- 可以验证服务器身份，并且为浏览器和服务器间的通信提供加密方式
- `TCP/IP` 协议 其他应用层间的位置 `SSL`

**客户端**

1. 发送 `https`请求
2. 生成随机对称密钥加密
3. 发送加密后的内容

**服务端**

1. 返回证书（公钥）
2. 根据客户端发送的密文

**加密方式**

- 对称加密 `encode` `decode` 同一个秘钥

**非对称加密**

- 公钥 私钥

**混合加密**

- 明文：会话秘钥 非对称加密的公钥
- 密文：明文 非对称加密的私钥

## `HTTP 2.0`

1. 多路复用
2. 二进制分帧
3. 首部压缩
4. 服务端推送

## `CDN`

- `content delivery network` 内容分发网络
- 边缘节点：多个节点，用户访问时，会选择距离最近的节点
- 静态资源缓存，减少请求次数，提升性能
- 根据当前用户的`IP`获取真实地址，找到距离最近的边缘节点
- 找到运营商，找到相同网络的边缘节点
- 找到访问人数少，负载较轻的节点
- 缓存代理

## `DNS`

- `Domain Name System` 域名系统
- 负责将域名解析为`IP`地址
