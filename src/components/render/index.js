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
      document.getElementById(targetId).innerHTML =
        `<div style="color: red;">加载失败：${error.message}</div>`;
      callback && callback();
    });
}

function loadMarkdown(targetId, filePath) {
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
  });
}

function loadAPDF() {
  
}
