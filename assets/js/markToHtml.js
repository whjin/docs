async function loadMarkdown() {
  try {
    const response = await fetch('assets/template/docs.md');
    const text = await response.text();
    const htmlContent = marked.parse(text);
    document.getElementById('markdown-content').innerHTML = htmlContent;
  } catch (error) {
    console.error('Error loading Markdown file:', error);
  }
}
loadMarkdown();
