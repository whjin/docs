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
  let isMobileDevice = isMobile();

  navImgs.forEach((img, index) => {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = imgEl.title = img.alt;
    imgEl.className = img.class;

    if (index === 0) {
      if (isMobileDevice) {
        imgEl.classList.add('hide');
      } else {
        imgEl.classList.add('hidden');
      }
    }
    navContainer.appendChild(imgEl);
  });

  const navToc = document.querySelector('.nav-toc');
  const navBack = document.querySelector('.nav-back');
  const sidebarArea = document.querySelector('.sidebar-area');

  if (!isMobileDevice && navToc) {
    navContainer.addEventListener('mouseenter', () => {
      navToc.classList.remove('hidden');
    });
    navContainer.addEventListener('mouseleave', () => {
      navToc.classList.add('hidden');
    });

    navToc.addEventListener('click', () => {
      if (sidebarArea) {
        const isHidden = sidebarArea.style.display === 'none';
        sidebarArea.style.display = isHidden ? 'block' : 'none';
        navToc.alt = navToc.title = isHidden ? '隐藏目录' : '显示目录';
      }
    });
  }

  if (navBack) {
    navBack.addEventListener('click', (e) => {
      e.stopPropagation();
      const origin = window.location.origin;
      const targetUrl = productionMode() ? `${origin}/docs` : origin;
      // window.location.href = targetUrl;
    });
  }

  window.addEventListener('resize', () => {
    const newIsMobile = isMobile();
    if (newIsMobile !== isMobileDevice) {
      isMobileDevice = newIsMobile;
      window.location.reload();
    }
  });
})();
