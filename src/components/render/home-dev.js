window.addEventListener('DOMContentLoaded', (e) => {
  const filePath = 'src/template/index.md';
  // 等待 loadMarkdown 完成后执行 generateTOC
  loadMarkdown('markdown-content', filePath)
    .then(() => {
      generateTOC();
    })
    .catch((err) => {
      console.error('加载 Markdown 失败：', err);
    });
});

window.addEventListener('load', () => {
  const links = document.querySelectorAll('#markdown-content a');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});

// 生成文章目录（核心函数）
function generateTOC() {
  const contentEl = document.getElementById('markdown-content');
  const tocNavEl = document.getElementById('toc-nav');
  if (!contentEl || !tocNavEl) return;

  // 提取所有标题元素
  const headings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length === 0) {
    tocNavEl.innerHTML = '<p style="color:#666;">暂无目录</p>';
    return;
  }

  // 构建目录 HTML
  let tocHTML = '<ul>';
  headings.forEach((heading, index) => {
    // 给标题添加唯一锚点 ID
    const headingId = `toc-${index}-${heading.tagName.toLowerCase()}`;
    heading.id = headingId;

    // 标题层级和文本
    const level = heading.tagName.toLowerCase();
    const text = heading.textContent.trim();

    // 拼接目录项
    tocHTML += `
      <li class="toc-${level}">
        <a href="#${headingId}" title="${text}">${text}</a>
      </li>
    `;
  });
  tocHTML += '</ul>';

  // 插入目录
  tocNavEl.innerHTML = tocHTML;

  // 目录锚点平滑滚动
  tocNavEl.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        window.scrollTo({
          top: targetEl.offsetTop - 60, // 偏移 header 高度，避免遮挡
          behavior: 'smooth',
        });
      }
    });
  });
}
