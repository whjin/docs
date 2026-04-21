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

  if (!contentEl || !tocNavEl || !sidebarArea) return;

  // 移动端：强制隐藏目录
  if (isMobile()) {
    sidebarArea.style.display = 'none';
    return;
  }

  const headings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
  // 桌面端无标题时也隐藏目录
  if (headings.length === 0) {
    sidebarArea.style.display = 'none';
    return;
  }

  // 桌面端有标题时生成目录
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
  sidebarArea.style.display = 'block'; // 显示目录

  // 锚点点击逻辑（不变）
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
