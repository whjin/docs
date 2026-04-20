window.addEventListener('DOMContentLoaded', (e) => {
  let query = decodeURIComponent(window.location.search.slice(1));
  let idx = query.indexOf('_');
  let dir = query.slice(0, idx);
  let title = query.slice(idx + 1);

  if (title.includes('&format=')) {
    const splits = title.split('&format=');
    document.title = `${splits[0]} \u00AB 吴华锦`;
    renderPDF(`posts/${dir}/${splits[0]}.${splits[1]}`).then(() => {
      // PDF 无目录，显示提示
      const tocNavEl = document.getElementById('toc-nav');
      if (tocNavEl) tocNavEl.innerHTML = '<p style="color:#666;">PDF文件暂无目录</p>';
    });
  } else {
    document.title = `${title} \u00AB 吴华锦`;
    // Markdown 加载完成后生成目录
    loadMarkdown('markdown-content', `posts/${dir}/${title}.md`).then(() => {
      generateTOC();
    });
  }
});

window.addEventListener('load', () => {
  const links = document.querySelectorAll('#markdown-content a');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});

function generateTOC() {
  const contentEl = document.getElementById('markdown-content');
  const tocNavEl = document.getElementById('toc-nav');
  if (!contentEl || !tocNavEl) {
    console.error('容器元素不存在');
    return;
  }

  // 增加短延迟，确保 DOM 完全渲染
  setTimeout(() => {
    // 提取所有标题元素
    const headings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
    console.log('提取到的标题数量：', headings.length); // 调试用：看是否能抓到标题

    if (headings.length === 0) {
      tocNavEl.innerHTML = '<p style="color:#666;">暂无目录</p>';
      return;
    }

    // 构建目录 HTML（原有逻辑不变）
    let tocHTML = '<ul>';
    headings.forEach((heading, index) => {
      const headingId = `toc-${index}-${heading.tagName.toLowerCase()}`;
      heading.id = headingId;
      const level = heading.tagName.toLowerCase();
      const text = heading.textContent.trim();
      tocHTML += `
        <li class="toc-${level}">
          <a href="#${headingId}" title="${text}">${text}</a>
        </li>
      `;
    });
    tocHTML += '</ul>';
    tocNavEl.innerHTML = tocHTML;

    // 平滑滚动逻辑（原有不变）
    tocNavEl.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          window.scrollTo({
            top: targetEl.offsetTop - 60,
            behavior: 'smooth',
          });
        }
      });
    });
  }, 100); // 100ms 延迟，确保 DOM 渲染完成
}

// 原有 renderPDF 函数不变
async function renderPDF(url) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '../js/pdf.worker.min.js';
  const container = document.getElementById('markdown-content');
  try {
    container.innerHTML = '';
    const pdf = await pdfjsLib.getDocument(url).promise;
    const containerWidth = container.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const originViewport = page.getViewport({ scale: 1 });
      let scale = (containerWidth / originViewport.width) * dpr;
      if (isMobile()) {
        scale = Math.min(scale * 2, window.innerWidth / originViewport.width);
      }
      scale = Math.min(scale, containerWidth / originViewport.width);
      const renderViewport = page.getViewport({ scale: scale * dpr });
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = renderViewport.width;
      canvas.height = renderViewport.height;
      canvas.style.height = `${viewport.height}px`;
      container.appendChild(canvas);
      await page.render({
        canvasContext: context,
        viewport: renderViewport,
      }).promise;
    }
  } catch (error) {
    console.error('PDF文件加载失败:', error);
    container.innerHTML = `<p style="text-align:center; padding:20px; color:red;">PDF 加载失败，请检查文件路径</p>`;
  }
}
