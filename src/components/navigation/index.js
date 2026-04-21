(function () {
  const navImgs = [
    {
      src: '../images/icons/toc.png',
      alt: '隐藏目录',
      class: 'nav-toc',
    },
    {
      src: '../images/icons/back.png',
      alt: '返回首页',
      class: 'nav-back',
    },
  ];

  const navContainer = document.querySelector('.nav-container');

  navImgs.forEach((img, index) => {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.title = img.alt;
    imgEl.className = img.class;
    if (index === 0) {
      imgEl.classList.add('hidden');
      console.log(imgEl);
    }
    navContainer.appendChild(imgEl);
  });

  const navBack = document.querySelector('.nav-back');
  if (navBack) {
    navBack.addEventListener('click', (e) => {
      // const origin = window.location.origin;
      // const targetUrl = productionMode() ? `${origin}/docs` : origin;
      // window.location.href = targetUrl;
    });
  }
})();
