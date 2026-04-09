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
    return !locations.some((location) =>
      window.location.origin.includes(location),
    );
  }

  if (productionMode()) {
    document.addEventListener('DOMContentLoaded', show);
    window.addEventListener('load', hide);
  }

  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      console.log(window.location);
      const origin = window.location.origin;
      console.log(productionMode());
      const targetUrl = productionMode() ? `${origin}/docs` : origin;
      console.log(targetUrl);
      window.location.href = targetUrl;
    });
  }

  return { show, hide };
})();
