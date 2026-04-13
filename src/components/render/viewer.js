document.addEventListener('DOMContentLoaded', (e) => {
  let query = decodeURIComponent(window.location.search.slice(1));
  let idx = query.indexOf('_');
  let dir = query.slice(0, idx);
  let title = query.slice(idx + 1);

  if (title.includes('&format=')) {
    const splits = title.split('&format=');
    document.title = `${splits[0].toUpperCase()} \u00AB 吴华锦`;

    (async function (url) {
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '../js/pdf.worker.min.js';

        const pdf = await pdfjsLib.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const scale = 4;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        document.getElementById('markdown-content').appendChild(canvas);

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;
      } catch (error) {
        console.error('PDF文件加载失败:', error);
      }
    })(`posts/${dir}/${splits[0]}.${splits[1]}`);
  } else {
    document.title = `${title.toUpperCase()} \u00AB 吴华锦`;
    loadMarkdown('markdown-content', `posts/${dir}/${title}.md`);
  }
});
