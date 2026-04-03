async function loadMarkdown(node, path) {
  try {
    const response = await fetch(path);
    const text = await response.text();
    const htmlContent = marked.parse(text);
    const markdownContent = document.getElementById(node);
    markdownContent.innerHTML = htmlContent;
  } catch (error) {
    console.error('Error loading Markdown file:', error);
  }
}
