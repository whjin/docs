function loadMarkdown(elementId, filePath) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) throw new Error(`文件加载失败: ${filePath}`);
      return response.text();
    })
    .then((markdownContent) => {
      const htmlContent = marked.parse(markdownContent);
      document.getElementById(elementId).innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error('渲染失败:', error);
      document.getElementById(elementId).innerHTML = `<div style="color: red;">加载失败：${error.message}</div>`;
    });
}
