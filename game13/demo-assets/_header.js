(function () {
  var MENU = [
    { href: '../../game13/', label: 'Play Game' },
    { href: '../demo-assets/', label: 'Demo Assets' },
    { href: '../game-info/', label: 'Game Info' },
    { href: '../demo-assets/index.html#reports-section', label: 'Reports' }
  ];

  function resolve(href) {
    var base = (document.currentScript && document.currentScript.dataset.base) || '';
    if (!base) {
      var path = window.location.pathname;
      if (path.indexOf('/demo-assets/') !== -1) base = 'demo-assets';
      else if (path.indexOf('/game-info/') !== -1) base = 'game-info';
      else base = '';
    }
    // rewrite ../ paths relative to current page base
    if (base === 'demo-assets') {
      return href.replace('../demo-assets/index.html', './index.html').replace('../demo-assets/', './');
    }
    if (base === 'game-info') {
      return href.replace('../game-info/', './');
    }
    return href;
  }

  function buildNav() {
    var nav = document.createElement('nav');
    nav.className = 'rsg-shared-nav';
    nav.innerHTML =
      '<div class="nav-inner">' +
        '<span class="nav-logo">&#x2726; EMBERVEIL</span>' +
        '<ul class="nav-links">' +
          MENU.map(function (m) {
            return '<li><a href="' + resolve(m.href) + '">' + m.label + '</a></li>';
          }).join('') +
        '</ul>' +
      '</div>';
    return nav;
  }

  function injectStyle() {
    if (document.getElementById('rsg-shared-nav-style')) return;
    var css =
      '@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap");' +
      'nav.rsg-shared-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(10,6,8,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(232,160,32,0.2);height:52px;display:flex;align-items:center;padding:0 2rem;font-family:"Inter","Segoe UI",sans-serif}' +
      'nav.rsg-shared-nav .nav-inner{display:flex;align-items:center;gap:1.5rem;width:100%;max-width:1400px;margin:0 auto;min-width:0}' +
      'nav.rsg-shared-nav .nav-logo{font-family:"Cinzel",Georgia,serif;font-size:1rem;font-weight:900;letter-spacing:0.15em;background:linear-gradient(180deg,#f8d880 0%,#e8a020 40%,#c04030 100%);-webkit-background-clip:text;background-clip:text;color:transparent;flex-shrink:0}' +
      'nav.rsg-shared-nav .nav-links{display:flex;gap:1.25rem;list-style:none;margin:0;padding:0;flex-wrap:nowrap;min-width:0}' +
      'nav.rsg-shared-nav .nav-links a{color:#8a7a6a;text-decoration:none;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;transition:color 0.2s;white-space:nowrap}' +
      'nav.rsg-shared-nav .nav-links a:hover{color:#e8a020}' +
      'body.rsg-nav-padded{padding-top:52px}' +
      '@media (max-width:720px){' +
        'nav.rsg-shared-nav{height:auto;padding:0.4rem 0.75rem;align-items:stretch}' +
        'nav.rsg-shared-nav .nav-inner{flex-direction:column;align-items:stretch;gap:0.35rem}' +
        'nav.rsg-shared-nav .nav-logo{text-align:center;font-size:0.95rem}' +
        'nav.rsg-shared-nav .nav-links{overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;gap:1rem;padding:0.15rem 0.25rem 0.35rem;scrollbar-width:none}' +
        'nav.rsg-shared-nav .nav-links::-webkit-scrollbar{display:none}' +
        'nav.rsg-shared-nav .nav-links li{flex:0 0 auto}' +
        'body.rsg-nav-padded{padding-top:78px}' +
      '}';
    var style = document.createElement('style');
    style.id = 'rsg-shared-nav-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function mount() {
    injectStyle();
    // Remove legacy nav elements
    var legacy = document.querySelectorAll('nav:not(.rsg-shared-nav)');
    legacy.forEach(function (n) {
      if (n.querySelector && (n.querySelector('.nav-logo') || n.querySelector('.nav-links'))) n.remove();
    });
    if (!document.querySelector('nav.rsg-shared-nav')) {
      var nav = buildNav();
      document.body.insertBefore(nav, document.body.firstChild);
    }
    document.body.classList.add('rsg-nav-padded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
