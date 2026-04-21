function isMobile() {
  const ua = navigator.userAgent;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  return isMobileUA;
}

(function () {
  let loadingEl = null;
  let timer = null;
  let startTime = 0;
  const MIN_SHOW_TIME = 300;
  const MAX_SHOW_TIME = 6000;

  function createLoading() {
    if (loadingEl) return;
    loadingEl = document.createElement('div');
    loadingEl.id = 'loading';
    document.body.appendChild(loadingEl);
  }

  function show() {
    if (loadingEl?.classList.contains('hidden')) return;
    createLoading();
    document.body.classList.add('loading');
    startTime = Date.now();
    timer = setTimeout(hide, MAX_SHOW_TIME);
  }

  function hide() {
    if (!loadingEl || loadingEl.classList.contains('hidden')) return;
    clearTimeout(timer);
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, MIN_SHOW_TIME - elapsed);

    setTimeout(() => {
      loadingEl.classList.add('hidden');
      document.body.classList.remove('loading');
      setTimeout(() => {
        loadingEl?.remove();
        loadingEl = null;
      }, 300);
    }, delay);
  }

  function productionMode() {
    const locations = ['localhost', '127.0.0.1', '8000'];
    return !locations.some((location) => window.location.origin.includes(location));
  }

  if (productionMode()) {
    window.addEventListener('DOMContentLoaded', () => {
      show();
    });
    window.addEventListener('load', () => {
      hide();
    });
  } else {
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
  }
})();
