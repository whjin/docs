window.addEventListener('DOMContentLoaded', (e) => {
  const filePath = 'src/template/index.md';
  loadMarkdown('markdown-content', filePath);
});

window.addEventListener('load', () => {
  const links = document.querySelectorAll('#markdown-content a');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});
