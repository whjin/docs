(function () {
  const socials = [
    {
      href: "",
      title: "展开",
      name: "expand",
      icon: 26,
    },
    {
      href: "https://weibo.com/u/1710899102",
      title: "微博",
      name: "weibo",
      icon: 24,
    },
    {
      href: "https://wuhuajin.com",
      title: "博客",
      name: "blog",
      icon: 26,
    },
    {
      href: "https://github.com/whjin",
      title: "Github",
      name: "github",
      icon: 24,
    },
    {
      href: "mailto:wuhuajin09@163.com",
      title: "邮箱",
      name: "email",
      icon: 28,
    },
  ];

  function isMobile() {
    const ua = navigator.userAgent;
    const isMobileUA =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    return isMobileUA;
  }

  const titleEl = document.querySelector(".title");

  const expandEl = document.createElement("img");

  const navEl = document.createElement("nav");
  navEl.className = "nav";

  socials.forEach((s) => {
    const aEl = document.createElement("a");
    const imgEl = document.createElement("img");

    aEl.href = s.href;
    aEl.rel = "noopener noreferrer";
    aEl.target = "_blank";
    aEl.title = s.title;
    aEl.className = `icon-${s.name}`;

    imgEl.src = `src/images/icons/${s.name}.png`;
    imgEl.alt = s.title;
    imgEl.width = imgEl.height = s.icon;

    aEl.appendChild(imgEl);
    navEl.appendChild(aEl);
  });

  titleEl.after(navEl);
})();
