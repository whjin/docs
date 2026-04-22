(function () {
  const socialList = [
    {
      href: '',
      title: '微信',
      name: 'wechat',
      icon: 24,
    },
    {
      href: 'https://weibo.com/u/1710899102',
      title: '微博',
      name: 'weibo',
      icon: 24,
    },
    {
      href: 'https://wuhuajin.com',
      title: '博客',
      name: 'blog',
      icon: 24,
    },
    {
      href: 'mailto:wuhuajin09@163.com',
      title: '邮箱',
      name: 'email',
      icon: 24,
    },
    {
      href: 'https://github.com/whjin',
      title: 'Github',
      name: 'github',
      icon: 24,
    },
  ];

  const qrcodeList = [
    {
      src: 'src/images/social/wechat.jpg',
      title: '微信',
    },
    {
      src: 'src/images/social/wechat_oa.jpg',
      title: '微信公众号',
    },
    {
      src: 'src/images/social/wechat_video.jpg',
      title: '微信视频号',
    },
    {
      src: 'src/images/social/wx_pay.jpg',
      title: '微信支付',
    },
    {
      src: 'src/images/social/ali_pay.jpg',
      title: '支付宝',
    },
  ];

  const titleEl = document.querySelector('.title');
  const socialEl = document.createElement('nav');
  socialEl.className = 'social';

  let qrcodeLink = null;

  socialList.forEach((s) => {
    const aEl = document.createElement('a');
    const imgEl = document.createElement('img');

    if (s.href) aEl.href = s.href;
    aEl.rel = 'noopener noreferrer';
    aEl.target = '_blank';
    aEl.title = s.title;
    aEl.className = `icon-${s.name}`;

    imgEl.src = `src/images/icons/${s.name}.png`;
    imgEl.alt = s.title;
    imgEl.width = imgEl.height = s.icon;

    aEl.appendChild(imgEl);
    socialEl.appendChild(aEl);

    if (s.name === 'wechat') {
      qrcodeLink = aEl;
      aEl.removeAttribute('href');
      aEl.style.cursor = 'pointer';
    }
  });
  titleEl.after(socialEl);

  const headerEl = document.querySelector('.header');
  headerEl.style.justifyContent = isMobile() ? 'flex-start' : 'center';

  const overlayEl = document.createElement('div');
  overlayEl.className = 'modal-overlay';
  overlayEl.setAttribute('id', 'wechat-modal');
  socialEl.after(overlayEl);

  const containerEl = document.createElement('div');
  containerEl.className = 'modal-container';
  overlayEl.appendChild(containerEl);

  qrcodeList.forEach((q) => {
    const imgEl = document.createElement('img');
    imgEl.src = q.src;
    imgEl.alt = imgEl.title = q.title;
    containerEl.appendChild(imgEl);
  });

  function calcTrianglePosition() {
    if (!qrcodeLink) return;
    const modalEl = document.querySelector('.modal-container');
    const wechatEl = document.querySelector('.icon-wechat');

    const wechatRect = wechatEl.getBoundingClientRect();
    const offsetRight = window.innerWidth - wechatRect.right;

    modalEl.style.setProperty('--offset-right', `${offsetRight}px`);
  }

  if (qrcodeLink) {
    qrcodeLink.addEventListener('click', (e) => {
      e.stopPropagation();
      overlayEl.classList.add('show');
      calcTrianglePosition();
    });
  }

  document.addEventListener('click', () => {
    overlayEl.classList.remove('show');
  });
  overlayEl.addEventListener('click', (e) => {
    e.stopPropagation();
  });
})();
