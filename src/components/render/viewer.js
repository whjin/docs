      document.addEventListener('DOMContentLoaded', (e) => {
        let query = window.location.search.slice(1);
        let idx = query.indexOf('_');
        let dir = query.slice(0, idx);
        let title = decodeURIComponent(query.slice(idx + 1));
        document.title = `${title.toUpperCase()} \u00AB 吴华锦`;

        const filePath = `posts/${dir}/${title}.md`;
        loadMarkdown('markdown-content', filePath);
      });