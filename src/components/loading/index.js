(function () {
  const isOpen = true;
  let loadingEl = null;
  let timer = null;
  let startTime = 0;
  const MIN_SHOW_TIME = 300;
  const MAX_SHOW_TIME = 6000;

  function loadCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'src/components/loading/style.css';
    document.head.appendChild(link);
  }

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

  if (isOpen) {
    loadCSS();
    document.addEventListener('DOMContentLoaded', show);
    window.addEventListener('load', hide);
  }

  return { show, hide };
})();
