function handler(targetId, filePath, callback) {
  marked.use(
    markedHighlight.markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (error) {
            console.error(`高亮${lang}代码失败`, error);
          }
        }
        return hljs.highlightAuto(code).value;
      },
    }),
  );

  fetch(filePath)
    .then((response) => {
      if (!response.ok) throw new Error(`文件加载失败: ${filePath}`);
      return response.text();
    })
    .then((markdownContent) => {
      const htmlContent = marked.parse(markdownContent);
      document.getElementById(targetId).innerHTML = htmlContent;
      callback && callback();
    })
    .catch((error) => {
      console.error('渲染失败:', error);
      document.getElementById(targetId).innerHTML = `<div style="color: red;">加载失败：${error.message}</div>`;
      callback && callback();
    });
}

async function loadMarkdown(targetId, filePath) {
  return new Promise((resolve, reject) => {
    const scrollKey = `scrollPosition_${encodeURIComponent(filePath)}`;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      sessionStorage.setItem(scrollKey, scrollTop);
    });
    handler(targetId, filePath, () => {
      const savedScrollTop = sessionStorage.getItem(scrollKey);
      if (savedScrollTop) {
        window.scrollTo({
          top: parseInt(savedScrollTop, 10),
          behavior: 'auto',
        });
      }
      resolve();
    });
  });
}

function generateTOC() {
  const contentEl = document.getElementById('markdown-content');
  const tocNavEl = document.getElementById('toc-nav');
  const sidebarArea = document.querySelector('.sidebar-area');

  if (!contentEl || !tocNavEl) return;

  const headings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
  // 目录存在性判断（非移动端+有标题）
  const tocExist = headings.length > 0 && !isMobile();

  if (!tocExist) {
    sidebarArea.style.display = 'none';
  } else {
    sidebarArea.style.display = 'block'; // 默认显示目录
    // 原有目录生成逻辑（不变）
    let tocHTML = '<ul>';
    const set = new Set();
    headings.forEach((heading, index) => {
      const headingId = `toc-${index}-${heading.tagName.toLowerCase()}`;
      heading.id = headingId;
      const level = heading.tagName.toLowerCase();
      const text = heading.textContent.trim();

      let idx = [...set.add(level)].findIndex((l) => l === level);

      tocHTML += `
        <li style="
          font-weight: ${['h1', 'h2'].includes(level) ? '600' : '500'};
          padding-left: ${idx * 0.8}em;
        ">
          <a href="#${headingId}" title="${text}">${text}</a>
        </li>
      `;
    });
    tocHTML += '</ul>';
    tocNavEl.innerHTML = tocHTML;

    // 原有锚点点击逻辑（不变）
    tocNavEl.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({
            top: targetEl.offsetTop - 60,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // 生成目录后，触发导航状态更新（关键）
  if (window.updateNavClass) {
    window.updateNavClass();
  } else {
    // 兼容导航脚本的初始化逻辑
    const navContainer = document.querySelector('.nav-container');
    if (tocExist) {
      navContainer.classList.add('has-toc');
      navContainer.classList.remove('no-toc');
    } else {
      navContainer.classList.add('no-toc');
      navContainer.classList.remove('has-toc');
    }
  }
}
