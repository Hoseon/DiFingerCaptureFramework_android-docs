/* In-page table of contents for the integration guide (index page). */
(function () {
  // Stable anchors so that shared links keep working when sections are added or reordered.
  var SLUGS = {
    '개요': 'overview',
    '시작하기': 'getting-started',
    '핵심 제약사항': 'constraints',
    '오류 처리': 'error-handling',
    '버전 이력': 'version-history',
    '문의': 'contact',
    'Packages': 'packages'
  };

  function addStyle() {
    var css =
      '.difinger-toc{margin:16px 0 28px;padding:14px 18px;border:1px solid rgba(127,127,127,.35);border-radius:8px;max-width:420px}' +
      '.difinger-toc-title{font-weight:600;margin-bottom:6px}' +
      '.difinger-toc ul{margin:0;padding-left:18px}' +
      '.difinger-toc li{margin:3px 0}' +
      '.difinger-toc a{cursor:pointer}' +
      'h2[id]{scroll-margin-top:16px}';
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function jump(target, smooth) {
    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  }

  function build() {
    var root = document.querySelector('.main-content') || document.getElementById('content') || document.body;
    var heads = Array.prototype.slice.call(root.querySelectorAll('h2'));
    if (heads.length < 3) return;

    addStyle();
    var nav = document.createElement('nav');
    nav.className = 'difinger-toc';
    nav.setAttribute('aria-label', '목차');

    var title = document.createElement('div');
    title.className = 'difinger-toc-title';
    title.textContent = '목차';
    nav.appendChild(title);

    var list = document.createElement('ul');
    heads.forEach(function (h, i) {
      var text = h.textContent.trim();
      if (!h.id) h.id = SLUGS[text] || ('section-' + (i + 1));
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + h.id;
      link.textContent = text;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        jump(h, true);
        if (window.history && history.replaceState) history.replaceState(null, '', '#' + h.id);
      });
      item.appendChild(link);
      list.appendChild(item);
    });
    nav.appendChild(list);
    heads[0].parentNode.insertBefore(nav, heads[0]);

    // Honour a shared link such as index.html#version-history
    if (location.hash) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) setTimeout(function () { jump(target, false); }, 50);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
