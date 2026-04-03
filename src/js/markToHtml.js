document.addEventListener('DOMContentLoaded', (e) => {
  loadMarkdown('markdown-content', 'src/template/index.md');
});

window.onload = function () {
  const links = document.querySelectorAll('#markdown-content a');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
};
