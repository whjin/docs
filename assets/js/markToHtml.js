async function loadMarkdown(path) {
  try {
    const response = await fetch(path);
    const text = await response.text();
    const htmlContent = marked.parse(text);
    document.getElementById('markdown-content').innerHTML = htmlContent;
  } catch (error) {
    console.error('Error loading Markdown file:', error);
  }
}
