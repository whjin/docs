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
      icon: 25,
    },
    {
      href: 'mailto:wuhuajin09@163.com',
      title: '邮箱',
      name: 'email1',
      icon: 26,
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
      src: 'src/images/pay/ali_pay.jpg',
      title: '支付宝',
      name: 'alipay-img',
    },
    {
      src: 'src/images/pay/wx_pay.jpg',
      alt: '微信',
      name: 'wxpay-img',
    },
  ];

  const titleEl = document.querySelector('.title');

  const socialEl = document.createElement('nav');
  socialEl.className = 'social';

  socialList.forEach((s) => {
    const aEl = document.createElement('a');
    const imgEl = document.createElement('img');

    if (s.href) aEl.href = s.href;
    aEl.rel = 'noopener noreferrer';
    aEl.target = '_blank';
    aEl.title = s.title;

    imgEl.src = `src/images/icons/${s.name}.png`;
    imgEl.alt = s.title;
    imgEl.width = imgEl.height = s.icon;

    aEl.appendChild(imgEl);
    socialEl.appendChild(aEl);
  });

  titleEl.after(socialEl);

  const headerEl = document.querySelector('.header');
  headerEl.style.justifyContent = isMobile() ? 'flex-start' : 'center';

  // const overlayEl = document.createElement('div');
  // overlayEl.className = 'modal-overlay';
  // overlayEl.setAttribute('id', 'wechat-modal');

  // socialEl.after(overlayEl);

  // const containerEl = document.createElement('div');
  // containerEl.className = 'modal-container';

  // overlayEl.appendChild(containerEl);

  // qrcodeList.forEach((q) => {
  //   const imgEl = document.createElement('img');
  //   imgEl.src = q.src;
  //   imgEl.alt = imgEl.title = q.title;
  //   imgEl.className = q.name;
  //   containerEl.appendChild(imgEl);
  // });
})();
