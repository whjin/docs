(function () {
  const html = `
      <span>&copy;${isMobile() ? '' : '2013-'}${new Date().getFullYear()}</span>
      <a
        href="https://github.com/whjin"
        target="_blank"
        rel="noopener noreferrer"
        title="github"
      >
        &nbsp;wuhuajin
      </a>|
      <span id="busuanzi_container_site_pv" style="display: inline">&nbsp;访问
        <a
          href="http://service.ibruce.info/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span id="busuanzi_value_site_uv"></span>
        </a>人        
        <a
          href="http://service.ibruce.info/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span id="busuanzi_value_site_pv"></span>
        </a>次
      </span>
    `;
  const footerEl = document.querySelector('.footer');
  footerEl.innerHTML = html;
})();
