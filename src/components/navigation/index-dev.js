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
  let isMobileDevice = window.isMobile(); // 初始化检测移动端

  // 初始化图标
  navImgs.forEach((img, index) => {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.title = img.alt;
    imgEl.className = img.class;

    // 逻辑调整：
    // 1. 移动端：强制隐藏目录图标（display: none）
    // 2. 桌面端：默认隐藏目录图标（display: none，hover显示）
    if (index === 0) {
      // 仅针对目录图标
      if (isMobileDevice) {
        imgEl.classList.add('hide'); // 移动端彻底隐藏
      } else {
        imgEl.classList.add('hidden'); // 桌面端默认display: none
      }
    }
    navContainer.appendChild(imgEl);
  });

  const navToc = document.querySelector('.nav-toc');
  const navBack = document.querySelector('.nav-back');
  const sidebarArea = document.querySelector('.sidebar-area');

  // 桌面端：hover显示/隐藏目录图标（display 切换）
  if (!isMobileDevice && navToc) {
    // hover进入：显示目录图标（移除hidden类）
    navContainer.addEventListener('mouseenter', () => {
      navToc.classList.remove('hidden');
    });
    // hover离开：隐藏目录图标（添加hidden类）
    navContainer.addEventListener('mouseleave', () => {
      navToc.classList.add('hidden');
    });

    // 桌面端：点击目录图标切换侧边栏显隐
    navToc.addEventListener('click', () => {
      if (sidebarArea) {
        const isHidden = sidebarArea.style.display === 'none';
        sidebarArea.style.display = isHidden ? 'block' : 'none';
        navToc.alt = isHidden ? '隐藏目录' : '显示目录';
        navToc.title = navToc.alt;
      }
    });
  }

  // 返回首页逻辑（全端通用）
  if (navBack) {
    navBack.addEventListener('click', (e) => {
      e.stopPropagation();
      // 此处保留原有返回逻辑
      // const origin = window.location.origin;
      // const targetUrl = productionMode() ? `${origin}/docs` : origin;
      // window.location.href = targetUrl;
    });
  }

  // 监听窗口大小变化，动态适配
  window.addEventListener('resize', () => {
    const newIsMobile = window.isMobile();
    if (newIsMobile !== isMobileDevice) {
      isMobileDevice = newIsMobile;
      window.location.reload(); // 简单适配：刷新页面
    }
  });
})();
