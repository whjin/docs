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
