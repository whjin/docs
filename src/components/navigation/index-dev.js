(function () {
  // 初始化图标（调整提示文字为“切换目录”）
  const navImgs = [
    {
      src: '../images/icons/toc.png',
      alt: '隐藏目录', // 动态切换
      title: '隐藏目录',
      class: 'nav-toc',
    },
    {
      src: '../images/icons/back.png',
      alt: '返回首页',
      title: '返回首页',
      class: 'nav-back',
    },
  ];

  const navContainer = document.querySelector('.nav-container');
  const sidebarArea = document.querySelector('.sidebar-area');
  let isTocExist = false; // 标记：目录是否存在（有标题且非移动端）

  // 初始化图标
  navImgs.forEach((img) => {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.title = img.title;
    imgEl.className = img.class;
    navContainer.appendChild(imgEl);
  });

  const navToc = document.querySelector('.nav-toc');
  const navBack = document.querySelector('.nav-back');

  // 检测目录是否“存在”（有标题且非移动端）
  function checkTocExist() {
    const contentEl = document.getElementById('markdown-content');
    if (!contentEl) return false;
    const headings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
    isTocExist = headings.length > 0 && !isMobile(); // 复用isMobile函数
    return isTocExist;
  }

  // 检测目录是否“显示”
  function isTocVisible() {
    return window.getComputedStyle(sidebarArea).display !== 'none';
  }

  // 更新导航容器类名（仅根据“目录是否存在”）
  function updateNavClass() {
    if (checkTocExist()) {
      navContainer.classList.add('has-toc');
      navContainer.classList.remove('no-toc');
    } else {
      navContainer.classList.add('no-toc');
      navContainer.classList.remove('has-toc');
    }
  }

  // 更新目录图标提示文字
  function updateTocIconTip() {
    if (isTocVisible()) {
      navToc.alt = '隐藏目录';
      navToc.title = '隐藏目录';
    } else {
      navToc.alt = '显示目录';
      navToc.title = '显示目录';
    }
  }

  // 切换目录显隐
  function toggleToc() {
    if (!isTocExist) return; // 无目录则不操作
    sidebarArea.style.display = isTocVisible() ? 'none' : 'block';
    updateTocIconTip(); // 切换后更新提示文字
  }

  // 复用render/index.js中的isMobile函数（如果未全局定义，补充）
  function isMobile() {
    return window.innerWidth < 768;
  }

  // 初始化
  function init() {
    updateNavClass(); // 先判断目录是否存在
    updateTocIconTip(); // 初始化图标提示

    // 监听窗口大小变化（移动端/桌面端切换）
    window.addEventListener('resize', () => {
      updateNavClass();
      // 移动端强制隐藏目录
      if (isMobile()) {
        sidebarArea.style.display = 'none';
        updateTocIconTip();
      }
    });

    // 目录图标点击事件（核心：切换显隐，而非仅隐藏）
    navToc.addEventListener('click', (e) => {
      e.stopPropagation(); // 防止触发容器hover
      toggleToc();
    });

    // 返回首页逻辑
    navBack.addEventListener('click', (e) => {
      e.stopPropagation();
      // const origin = window.location.origin;
      // const targetUrl = productionMode() ? `${origin}/docs` : origin;
      // window.location.href = targetUrl;
    });
  }

  // 等待页面加载完成后初始化
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
