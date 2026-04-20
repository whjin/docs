window.addEventListener('DOMContentLoaded', (e) => {
  const filePath = 'src/template/index.md';
  loadMarkdown('markdown-content', filePath)
    .then(() => {
      generateTOC();
    })
    .catch((error) => {
      console.error('加载 Markdown 失败：', error);
    });
});

window.addEventListener('load', () => {
  const links = document.querySelectorAll('#markdown-content a');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});


