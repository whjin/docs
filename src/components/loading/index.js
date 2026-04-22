function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileRegex = /iphone|android|ipad|ipod|mobile|webos|blackberry|iemobile|opera mini/i;
  return mobileRegex.test(userAgent) || window.innerWidth <= 768;
}

function productionMode() {
  const locations = ['localhost', '127.0.0.1', '8000'];
  return !locations.some((location) => window.location.origin.includes(location));
}

const isProduction = productionMode();

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

function showLoading() {
  if (loadingEl?.classList.contains('hidden')) return;
  createLoading();
  document.body.classList.add('loading');
  startTime = Date.now();
  timer = setTimeout(hideLoading, MAX_SHOW_TIME);
}

function hideLoading() {
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

window.addEventListener('DOMContentLoaded', () => {
  isProduction && showLoading();
});

if (!isProduction) {
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
