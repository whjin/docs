window.addEventListener('DOMContentLoaded', (e) => {
  let query = decodeURIComponent(window.location.search.slice(1));
  let idx = query.indexOf('_');
  let dir = query.slice(0, idx);
  let title = query.slice(idx + 1);

  const contentEl = document.getElementById('markdown-content');
  const nacContainer = document.querySelector('.nav-container');

  if (title.includes('&format=')) {
    const splits = title.split('&format=');
    document.title = `${splits[0]} \u00AB 吴华锦`;

    document.querySelector('.sidebar-area').style.display = 'none';
    nacContainer.classList.add('hide-toc');

    renderPDF(contentEl, `posts/${dir}/${splits[0]}.${splits[1]}`).then(() => {
      hideLoading();
    });
  } else {
    document.title = `${title} \u00AB 吴华锦`;

    loadMarkdown('markdown-content', `posts/${dir}/${title}.md`).then(() => {
      generateTOC();
      const headings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headings.length === 0 || isMobile()) {
        nacContainer.classList.add('hide-toc');
      }
      hideLoading();
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

async function renderPDF(container, url) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '../js/pdf.worker.min.js';

  try {
    container.innerHTML = '';

    // 1. 加载PDF文件
    const pdf = await pdfjsLib.getDocument(url).promise;

    // 2. 获取容器宽度（用于动态计算缩放比例）
    const containerWidth = container.clientWidth;
    const dpr = window.devicePixelRatio || 1;

    // 3. 循环渲染每一页
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      // 获取PDF原页面尺寸（scale=1 时的原始大小）
      const originViewport = page.getViewport({ scale: 1 });

      // 计算缩放比例：保证宽度100%适配容器
      let scale = (containerWidth / originViewport.width) * dpr;
      if (isMobile()) {
        scale = Math.min(scale * 2, window.innerWidth / originViewport.width);
      }
      scale = Math.min(scale, containerWidth / originViewport.width);

      // 高清渲染（解决模糊）
      const renderViewport = page.getViewport({ scale: scale * dpr });

      // 获取缩放后的视口尺寸（决定Canvas原生大小，影响清晰度）
      const viewport = page.getViewport({ scale });

      // 创建Canvas并设置原生宽高（高清关键）
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = renderViewport.width;
      canvas.height = renderViewport.height;
      canvas.style.height = `${viewport.height}px`;

      container.appendChild(canvas);
      // 渲染PDF页面到Canvas
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
