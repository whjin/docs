## 非阻塞 `IO`

- 开源的 `JS` 运行环境
- `Chrome V8`引擎 非阻塞 异步 `IO` 服务端
- 事件驱动：事件队列 异步事件 任务队列

## 优缺点

- 高并发
- `IO` 密集型
- 单线程 不适合 `CPU` 密集型应用 单核 `CPU`
- 代码发生问题，系统会崩溃

## 应用场景

- `IO` 更适合
- `IO` 内部不需要做非常复杂的逻辑
- `WebSocket`
- 后台管理 实时交互系统 高并发
- `canvas` 多人协作
- 单页面浏览器应用创建服务

## `fs` 模块

- `fs`: `filesystem` 操作文档文件夹
- 权限位：`mode`
- `r`： `read` `readFileSync` 读取文件 不存在，抛出异常
- `r+`：读取并写入文件 文件不存在，抛出异常
- `w`：`write` 写入文件 存在则清空后写入
- `w+`：写入文件 文件不存在，创建文件 存在清空后写入
- `appendFile`：`appendFileSync` 追加写入文件 文件不存在，创建文件
- `copyFile` `copyFileSync` 文件拷贝
- `mkdir` `mkdirSync` 创建文件夹

## `buffer`文件

- 二进制 `Buffer` 内存
- `Buffer.from('10')`
- `Buffer.alloc(10, 1)` 创建指定长度的 `Buffer`，填充值为`1`
- 编码类型：`utf8`、`ascii`、`base64`、 `hex`

## `JWT`鉴权机制

- `JWT`：`JSON Web Token`，`JSON`对象，`Base64`编码，`HMAC`签名
- `token`：头部 `header`、载荷 `payload`、签名 `signature`

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- 生成 `token`，验证 `token`
- 校验 `token`：`koa-jwt`
- 加密密钥 `payload`

```js
app.use(koajwt({
    secret: 'access_token',
  }).unless({
    path: [/api/login],
  }));

  router.get('/api/user', async (ctx,next) => {
    const authorization = ctx.header.authorization; // 获取 jwt
    const token = authorization.replace('Bearer ', '');
    const result = jwt.verify(token, 'access_token');
    ctx.body = result;
  })
```

## `Stream`

- `stream`：数据传输手段，端到端信息交互方式
- 可写流：`fs.createWriteStream`
- 可读流：`fs.createReadStream`
- 双工流：`net.socket`
- 转换流：在数据写入/读取时修改数据的流
- `http` `request`-可读流 `response`-可写流
- `pipe`：数据传输管道，可读流 -> 可写流

```js
const server = http.createServer((req, res) => {
  const method = req.method;
  if (method === 'GET') {
    const filename = path.resolve(__dirname, 'data.json');
    let stream = fs.createReadStream(filename);
    stream.pipe(res);
  }
});
```

## `process`

- `process`：开启服务进程，进程管理