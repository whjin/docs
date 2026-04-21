const backBtn = document.querySelector('.back-btn');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    const origin = window.location.origin;
    const targetUrl = productionMode() ? `${origin}/docs` : origin;
    window.location.href = targetUrl;
  });
}
