(function () {
  const html = `
      <span>&copy;${isMobile() ? '' : '2013-'}${new Date().getFullYear()}</span>
      <a
        href="https://wuhuajin.com"
        target="_blank"
        rel="noopener noreferrer"
        title="博客"
      >
        &nbsp;吴华锦
      </a>&nbsp;|
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
