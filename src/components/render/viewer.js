window.addEventListener('DOMContentLoaded', (e) => {
  let query = decodeURIComponent(window.location.search.slice(1));
  let idx = query.indexOf('_');
  let dir = query.slice(0, idx);
  let title = query.slice(idx + 1);

  if (title.includes('&format=')) {
    const splits = title.split('&format=');
    document.title = `${splits[0].toUpperCase()} \u00AB 吴华锦`;

    const pdfUrl = `posts/${dir}/${splits[0]}.${splits[1]}`;
    renderPDF(pdfUrl);
  } else {
    document.title = `${title.toUpperCase()} \u00AB 吴华锦`;
    loadMarkdown('markdown-content', `posts/${dir}/${title}.md`);
  }
});

window.addEventListener('load', () => {
  const links = document.querySelectorAll('#markdown-content a');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});

async function renderPDF(url) {
  const container = document.getElementById('markdown-content');
  try {
    container.innerHTML = '';
    // 加载PDF文件
    const pdf = await pdfjsLib.getDocument(url).promise;
    // 获取容器宽度（用于动态计算缩放比例）
    const containerWidth = container.clientWidth;
    // 缓存每页的渲染数据（用于手势缩放）
    const pageRenderDatas = [];

    // 循环渲染每一页
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const originViewport = page.getViewport({ scale: 1 });

      // ========== 核心优化：适配移动端的缩放逻辑 ==========
      // 1. 基础缩放：宽度适配容器 + 移动端最小缩放保障
      const baseScale = containerWidth / originViewport.width;
      // 2. 设备像素比：提升高清显示（适配Retina屏）
      const pixelRatio = window.devicePixelRatio || 1;
      // 3. 移动端缩放系数：保证字体大小（可根据需求调整，比如1.5/2）
      const mobileScaleFactor = isMobile() ? 2.5 : 2;
      // 最终缩放比例
      const scale = baseScale * mobileScaleFactor * pixelRatio;
      // 兜底：最小缩放比例（避免过小）
      const finalScale = Math.max(scale, 1.5);

      const viewport = page.getViewport({ scale: finalScale });
      // 创建Canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      // 设置Canvas原生宽高（高清关键）
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      // ========== 新增：Canvas样式适配 ==========
      canvas.style.cssText = `
        max-width: 100%;
        height: auto;
        display: block;
        margin: 10px auto;
      `;
      container.appendChild(canvas);

      // 渲染PDF页面
      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      // 缓存页面数据（用于手势缩放）
      pageRenderDatas.push({
        page,
        canvas,
        originViewport,
        containerWidth,
        pixelRatio,
      });
    }

    // ========== 新增：移动端手势缩放支持（捏合放大/缩小） ==========
    initPinchZoom(container, pageRenderDatas);
  } catch (error) {
    console.error('PDF文件加载失败:', error);
    container.innerHTML = `<p style="text-align:center; padding:20px; color:red;">PDF 加载失败，请检查文件路径</p>`;
  }
}

// 辅助函数：判断是否为移动端
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 辅助函数：初始化手势缩放
function initPinchZoom(container, pageRenderDatas) {
  let currentScale = 1; // 当前缩放倍数
  let startDistance = 0; // 手势起始距离

  // 触摸开始：计算初始距离
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // 计算两个触摸点的距离
      startDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
    }
  });

  // 触摸移动：计算缩放比例并重新渲染
  container.addEventListener('touchmove', (e) => {
    e.preventDefault(); // 阻止页面滚动
    if (e.touches.length === 2 && startDistance > 0) {
      // 计算当前距离
      const currentDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      // 计算缩放比例（相对于初始距离）
      currentScale = currentDistance / startDistance;
      // 限制缩放范围（1~3倍，避免过大/过小）
      currentScale = Math.min(Math.max(currentScale, 1), 3);
      // 重新渲染所有页面
      renderPagesWithScale(pageRenderDatas, currentScale);
    }
  });

  // 触摸结束：重置初始距离
  container.addEventListener('touchend', () => {
    startDistance = 0;
  });
}

// 辅助函数：根据缩放比例重新渲染PDF页面
function renderPagesWithScale(pageRenderDatas, scaleFactor) {
  pageRenderDatas.forEach(async (data) => {
    const { page, canvas, originViewport, containerWidth, pixelRatio } = data;
    // 基础缩放逻辑（和初始化一致）
    const baseScale = containerWidth / originViewport.width;
    const mobileScaleFactor = isMobile() ? 2.5 : 2;
    const baseFinalScale = baseScale * mobileScaleFactor * pixelRatio;
    // 叠加手势缩放比例
    const finalScale = baseFinalScale * scaleFactor;

    const viewport = page.getViewport({ scale: finalScale });
    // 更新Canvas尺寸
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    // 重新渲染页面
    const context = canvas.getContext('2d');
    await page.render({
      canvasContext: context,
      viewport,
    }).promise;
  });
}
