const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const chokidar = require('chokidar');
const WebSocket = require('ws');

const PORT = 8080;
const DEBOUNCE_DELAY = 100;

// 静态文件服务器的根目录
const rootDir = process.cwd();

// 1. 创建 HTTP 静态文件服务器
const server = http.createServer((req, res) => {
  // 使用 url 模块解析请求的 URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  // 对 URL 进行解码，处理中文字符
  pathname = decodeURIComponent(pathname);

  // 构建请求的文件路径
  let filePath = path.join(rootDir, pathname === '/' ? 'index.html' : pathname);

  // 获取文件扩展名，用于设置正确的 Content-Type
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.md':
      contentType = 'text/markdown;charset=utf-8';
      break;

    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.ico':
      contentType = 'image/x-icon';
      break;
    case '.json':
      contentType = 'application/json;charset=utf-8';
      break;
  }

  // 读取并返回文件
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        // 文件不存在
        if (pathname === '/favicon.png') {
          // 对于 favicon.ico，返回一个空的响应
          res.writeHead(204);
          res.end();
          return;
        }

        // 尝试查找文件的其他可能位置
        const possiblePaths = [
          filePath,
          // 尝试在 src/template 目录下查找
          path.join(rootDir, 'src', 'template', pathname),
          // 尝试去掉开头的 /src/template
          pathname.startsWith('/src/template/') ? path.join(rootDir, pathname.slice('/src/template'.length)) : null,
        ].filter((p) => p && p !== filePath);

        // 检查可能的路径
        let fileFound = false;

        for (const possiblePath of possiblePaths) {
          if (possiblePath && fs.existsSync(possiblePath)) {
            filePath = possiblePath;
            fileFound = true;

            // 重新读取文件
            fs.readFile(filePath, (err, data) => {
              if (err) {
                res.writeHead(404, {
                  'Content-Type': 'text/html; charset=utf-8',
                });
                res.end(`<h1>404 - 文件未找到</h1><p>尝试读取文件时出错: ${err.message}</p>`);
              } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
              }
            });

            return;
          }
        }

        if (!fileFound) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`
            <html>
              <head><title>404 - 文件未找到</title></head>
              <body>
                <h1>404 - 文件未找到</h1>
                <p>尝试的文件路径: ${filePath}</p>
                <p>解码后路径: ${pathname}</p>
                <p>请确保文件存在于以下位置之一:</p>
                <ul>
                  <li>${rootDir}${pathname}</li>
                  <li>${path.join(rootDir, 'src', 'template', pathname)}</li>
                  <li>${path.join(rootDir, 'src/template/posts', pathname.includes('/posts/') ? pathname.split('/posts/')[1] : '')}</li>
                </ul>
              </body>
            </html>
          `);
        }
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      // 成功读取文件
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });

      // 如果是 HTML 文件，注入 WebSocket 客户端代码以实现实时刷新
      if (extname === '.html') {
        const htmlContent = content.toString();
        const wsScript = `
          <script>
            (function() {
              const socket = new WebSocket('ws://' + window.location.host);
              
              socket.addEventListener('open', () => {});
              
              socket.addEventListener('message', (event) => {
                if (event.data === 'reload') {
                  window.location.reload();
                }
              });
              
              socket.addEventListener('error', (err) => {
                console.warn('[Live Server] WebSocket 连接失败，自动刷新功能不可用');
              });
              
              socket.addEventListener('close', () => {});
            })();
          </script>
        `;

        // 将 WebSocket 脚本注入到 HTML 的 head 结束之前
        const injectedContent = htmlContent.replace('</head>', wsScript + '\n</head>');
        res.end(injectedContent);
      } else {
        res.end(content);
      }
    }
  });
});

// 2. 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });

// 3. 使用 chokidar 监视项目根目录下的文件变化
const watcher = chokidar.watch(rootDir, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true,
});

// 防抖刷新函数
let reloadTimer = null;
const triggerReload = (filePath) => {
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    if (path.extname(filePath).match(/\.(html|md|js|css)$/)) {
      // 向所有已连接的 WebSocket 客户端发送刷新指令
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('reload');
        }
      });
    }
  }, DEBOUNCE_DELAY);
};

watcher
  .on('add', triggerReload)
  .on('change', triggerReload)
  .on('unlink', triggerReload)
  .on('error', (error) => console.error('[Live Server] 监听错误:', error));

server.listen(PORT, () => {
  console.log('🚀 Live Server 正在运行: http://localhost:' + PORT);
});

process.on('SIGINT', () => {
  watcher.close();
  wss.close();
  server.close();
  process.exit(0);
});
