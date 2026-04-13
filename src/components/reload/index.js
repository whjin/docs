(function () {
  // 连接到本地的 WebSocket 服务器
  const socket = new WebSocket(`ws://${location.host}`);

  socket.addEventListener('open', () => {});

  // 当收到服务器发来的reload消息时，刷新页面
  socket.addEventListener('message', (event) => {
    if (event.data === 'reload') {
      window.location.reload();
    }
  });

  socket.addEventListener('close', () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });

  socket.addEventListener('error', (err) => {
    console.error('[Live Server] WebSocket error:', err);
  });
})();
