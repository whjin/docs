# 开发文档

- [开发文档](https://wuhuajin.com/docs/)
- [讨论站点](https://github.com/whjin/docs/issues)

# 功能项

1. 基于 `Node.js`构建服务实现 `Live Server` 功能，实时监听内容变更，`WebSocket` 推送触发浏览器自动刷新
   1. `http` 创建静态文件服务器
   2. `url` 模块解析请求 `url`
   3. `decodeURIComponent` 对 `url` 进行解码，处理中文字符
   4. 处理文件扩展名，设置 `Content-Type`
   5. `fs.readFile` 读取文件，返回状态码和配置跨域
   6. 注入 `WebSocket` 客户端监听 `html` 消息
   7. 使用 `chokidar` 监视项目根目录下文件变化 `add` `change` `unlink` `error`，向所有已连接的 `WebSocket` 客户端发送刷新指令
   8. 向 `html` 状态 `socket` 事件监听函数，接收服务器发来的 `reload` 消息，刷新页面
   9. 增加防抖刷新处理
2. 使用 `marked.js` 处理 `markdown` 转换 `html`
3. 集成 `marked.js` 、`highlight.js` 处理代码高亮
4. 使用 `sessionStorage`，监听`scroll`事件，`window.scrollTo`实现滚动定位
5. 通过 `window.location` 检测当前环境，只在生产环境启用 `loading` 组件
6. 增加 `deploy.sh` 代码部署脚本，一键部署
7. `shell` 脚本增加提取 `commit.md` 提交信息和有效期机制
8. 添加 `viewer.html` 预览页面，兼容处理 `md` 和 `pdf` 文件
9. 移动端 `pdf` 文档高清渲染，处理手势缩放
