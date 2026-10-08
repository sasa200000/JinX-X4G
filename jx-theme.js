/* JinX X4G — Themes pack: 5 neon themes + multi-shape light dance + live animated chart.
   Injected by nginx before </body> (like lock.js). Touches NO panel settings:
   everything lives in localStorage and in injected CSS/DOM only. */
(function () {
  'use strict';
  var T = {
    fa: { pick: 'پوسته', dance: 'رقص نور', chart: 'نمودار زنده', def: 'پیش‌فرض', cpu: 'پردازنده', mem: 'حافظه', close: 'بستن' },
    en: { pick: 'Theme', dance: 'Light dance', chart: 'Live chart', def: 'Default', cpu: 'CPU', mem: 'Memory', close: 'Close' },
    ru: { pick: 'Тема', dance: 'Танец света', chart: 'Живой график', def: 'Обычная', cpu: 'CPU', mem: 'Память', close: 'Закрыть' },
    zh: { pick: '主题', dance: '光舞', chart: '实时图表', def: '默认', cpu: 'CPU', mem: '内存', close: '关闭' },
    tr: { pick: 'Tema', dance: 'Işık dansı', chart: 'Canlı grafik', def: 'Varsayılan', cpu: 'İşlemci', mem: 'Bellek', close: 'Kapat' }
  };
  function lang() { var m = document.cookie.match(/(?:^|;\s*)lang=([a-z]{2})/i); var l = m ? m[1].toLowerCase() : 'fa'; return T[l] ? l : 'en'; }
  function t(k) { return T[lang()][k]; }
  function get(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var THEMES = {
    pink:   { label: '🩷 صورتی',     a: '#ff4fa3', a2: '#b44fff', dim: '#7c2049', glow: '255,79,163',   bg: '#160a11', s1: '#24111e', s2: '#331a2b', s3: '#452339' },
    yellow: { label: '💛 زرد',        a: '#ffd21f', a2: '#ff7a18', dim: '#7a6200', glow: '255,210,31',   bg: '#17130a', s1: '#262016', s2: '#362f21', s3: '#463d2c' },
    phos:   { label: '💚 سبز فسفری',  a: '#39ff88', a2: '#00e5ff', dim: '#0b5c33', glow: '57,255,136',   bg: '#07140d', s1: '#10251a', s2: '#173226', s3: '#1f4032' },
    black:  { label: '🖤 سیاه',       a: '#ff3b30', a2: '#f5f5f5', dim: '#7a1a15', glow: '255,59,48',    bg: '#000000', s1: '#101010', s2: '#191919', s3: '#232323' },
    orange: { label: '🧡 نارنجی',     a: '#ff7a18', a2: '#ffd21f', dim: '#7a3a00', glow: '255,122,24',   bg: '#170e04', s1: '#26190c', s2: '#352414', s3: '#452f1c' }
  };
  var css = ['html[data-jx-theme]{--jx-accent:#00907a;--jx-accent2:#6f7dff;--jx-accent-dim:#065a4a}'];
  Object.keys(THEMES).forEach(function (k) {
    var c = THEMES[k];
    css.push(
      'html[data-jx-theme="' + k + '"]{' +
      '--jx-accent:' + c.a + ';--jx-accent2:' + c.a2 + ';--jx-accent-dim:' + c.dim + ';' +
      '--color-primary-100:' + c.a + ';' +
      '--dark-color-background:' + c.bg + ';' +
      '--dark-color-surface-100:' + c.s1 + ';' +
      '--dark-color-surface-200:' + c.s2 + ';' +
      '--dark-color-surface-300:' + c.s3 + ';' +
      '--dark-color-surface-500:' + c.s3 + ';' +
      '--dark-color-surface-600:' + c.s3 + ';' +
      '--dark-color-surface-700:' + c.bg + ';' +
      '--dark-color-stroke:' + c.s3 + ';' +
      '--dark-color-scrollbar:' + c.s3 + ';' +
      '--dark-color-table-ring:' + c.s3 + ';' +
      '--dark-color-spin-container:' + c.s1 + '}' +
      'html[data-jx-theme="' + k + '"] .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{' +
      'background-color:' + c.dim + '!important;background-image:linear-gradient(270deg,transparent 30%,' + c.a + ',transparent 100%)!important}' +
      'html[data-jx-theme="' + k + '"] .ant-menu-item:hover,html[data-jx-theme="' + k + '"] .ant-menu-item:active,' +
      'html[data-jx-theme="' + k + '"] .ant-menu-submenu-title:hover{color:' + c.a + '!important}' +
      'html[data-jx-theme="' + k + '"] .ant-btn-primary:not([disabled]):not(.ant-btn-danger),' +
      'html[data-jx-theme="' + k + '"] #app.login-app .ant-btn-primary-login:hover,' +
      'html[data-jx-theme="' + k + '"] #app.login-app .ant-btn-primary-login:active,' +
      'html[data-jx-theme="' + k + '"] #app.login-app .ant-btn-primary-login:focus,' +
      'html[data-jx-theme="' + k + '"] #app.login-app.dark .wave-btn-bg{background-color:' + c.a + '!important;border-color:' + c.a + '!important}' +
      'html[data-jx-theme="' + k + '"] #app.login-app.dark .wave-btn-bg-cl{background-image:linear-gradient(#fff0,#fff0),radial-gradient(circle at left top,' + c.dim + ',' + c.a + ',' + c.dim + ')!important}' +
      'html[data-jx-theme="' + k + '"] .dark .ant-pagination-item-active a,html[data-jx-theme="' + k + '"] .ant-tabs-tab-active,' +
      'html[data-jx-theme="' + k + '"] .dark .ant-table-thead .ant-table-column-sorter-up.on,' +
      'html[data-jx-theme="' + k + '"] .dark .ant-table-thead .ant-table-column-sorter-down.on{color:' + c.a + '}' +
      'html[data-jx-theme="' + k + '"] .dark ::selection{background-color:' + c.a + '}'
    );
  });
  var cssDance = [
    '#jx-lights{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:9996;mix-blend-mode:screen;opacity:.5;contain:strict}',
    '#jx-lights .sh{position:absolute;will-change:transform;transform:translate3d(0,0,0)}',
    '#jx-lights .fill{position:absolute;inset:0;filter:blur(55px)}',
    '#jx-lights .orb{border-radius:50%}',
    '#jx-lights .ring{border-radius:50%;border:2px solid rgba(var(--jx-glow),.85);box-shadow:0 0 40px rgba(var(--jx-glow),.5),inset 0 0 30px rgba(var(--jx-glow),.35)}',
    '#jx-lights .dia{border:2px solid rgba(var(--jx-glow2),.8);box-shadow:0 0 45px rgba(var(--jx-glow2),.45);border-radius:14%}',
    '#jx-lights .beam{background:linear-gradient(90deg,transparent,rgba(var(--jx-glow),.65),transparent);height:2px;width:60vw;filter:blur(3px)}',
    '@keyframes jx-f1{0%{transform:translate3d(-12vw,10vh,0) scale(1)}50%{transform:translate3d(70vw,-8vh,0) scale(1.25)}100%{transform:translate3d(-12vw,10vh,0) scale(1)}}',
    '@keyframes jx-f2{0%{transform:translate3d(85vw,80vh,0) scale(.9)}50%{transform:translate3d(10vw,15vh,0) scale(1.3)}100%{transform:translate3d(85vw,80vh,0) scale(.9)}}',
    '@keyframes jx-f3{0%{transform:translate3d(25vw,60vh,0) rotate(0) scale(.7)}50%{transform:translate3d(65vw,20vh,0) rotate(360deg) scale(1.15)}100%{transform:translate3d(25vw,60vh,0) rotate(720deg) scale(.7)}}',
    '@keyframes jx-f4{0%{transform:translate3d(70vw,55vh,0) rotate(45deg) scale(.8)}50%{transform:translate3d(20vw,25vh,0) rotate(225deg) scale(1.2)}100%{transform:translate3d(70vw,55vh,0) rotate(405deg) scale(.8)}}',
    '@keyframes jx-f5{0%{transform:translate3d(-70vw,30vh,0) rotate(-14deg);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translate3d(130vw,65vh,0) rotate(-14deg);opacity:0}}',
    '@keyframes jx-f6{0%{transform:translate3d(60vw,90vh,0) scale(1)}50%{transform:translate3d(15vw,45vh,0) scale(1.4)}100%{transform:translate3d(60vw,90vh,0) scale(1)}}',
    '#jx-lights .sh1{width:38vmax;height:38vmax;left:0;top:0;animation:jx-f1 21s ease-in-out infinite}',
    '#jx-lights .sh2{width:32vmax;height:32vmax;left:0;top:0;animation:jx-f6 26s ease-in-out infinite}',
    '#jx-lights .sh3{width:26vmax;height:26vmax;left:0;top:0;animation:jx-f3 33s linear infinite}',
    '#jx-lights .sh4{width:20vmax;height:20vmax;left:0;top:0;animation:jx-f4 29s ease-in-out infinite}',
    '#jx-lights .sh5{left:0;top:0;animation:jx-f5 15s linear infinite;animation-delay:-4s}',
    '#jx-lights .sh5b{left:0;top:0;animation:jx-f5 19s linear infinite;animation-delay:-11s;width:45vw;height:1px}'
  ];
  var cssUi = [
    '#jx-ui{position:fixed;right:16px;bottom:16px;z-index:9998;font-size:14px}',
    '#jx-fab{width:46px;height:46px;border-radius:50%;border:1px solid rgba(var(--jx-glow),.55);background:rgba(12,12,14,.72);backdrop-filter:blur(10px);color:var(--jx-accent);font-size:20px;cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.45),0 0 18px rgba(var(--jx-glow),.35);display:flex;align-items:center;justify-content:center;transition:.2s}',
    '#jx-fab:hover{transform:scale(1.08);box-shadow:0 4px 18px rgba(0,0,0,.45),0 0 26px rgba(var(--jx-glow),.75)}',
    '#jx-pop{display:none;position:absolute;right:0;bottom:58px;width:224px;padding:12px;border-radius:16px;background:rgba(14,14,17,.92);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.12);box-shadow:0 10px 34px rgba(0,0,0,.55)}',
    '#jx-pop.on{display:block;animation:jx-pop .18s ease}',
    '@keyframes jx-pop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '#jx-pop .ttl{font-size:12px;opacity:.65;margin:0 0 8px}',
    '#jx-pop .row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}',
    '#jx-pop .sw{flex:0 0 auto;padding:6px 9px;border-radius:10px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#eee;cursor:pointer;font-size:12px;line-height:1;transition:.15s}',
    '#jx-pop .sw:hover{border-color:rgba(255,255,255,.5);transform:translateY(-1px)}',
    '#jx-pop .sw.on{border-color:var(--jx-accent);box-shadow:0 0 12px rgba(var(--jx-glow),.55)}',
    '#jx-pop .tgl{display:flex;align-items:center;justify-content:space-between;padding:7px 4px;font-size:12.5px;color:#ddd;border-top:1px solid rgba(255,255,255,.08)}',
    '#jx-pop .tgl .k{width:34px;height:19px;border-radius:10px;background:rgba(255,255,255,.18);position:relative;cursor:pointer;transition:.2s;flex:0 0 auto}',
    '#jx-pop .tgl .k:after{content:"";position:absolute;top:2px;left:2px;width:15px;height:15px;border-radius:50%;background:#fff;transition:.2s}',
    '#jx-pop .tgl .k.on{background:var(--jx-accent);box-shadow:0 0 10px rgba(var(--jx-glow),.6)}',
    '#jx-pop .tgl .k.on:after{left:17px}',
    '#jx-chart{position:fixed;left:16px;bottom:16px;z-index:9997;width:264px;border-radius:16px;background:rgba(12,13,16,.82);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.13);box-shadow:0 10px 30px rgba(0,0,0,.5),0 0 22px rgba(var(--jx-glow),.18);overflow:hidden;font-size:12px;color:#e9edf3}',
    '#jx-chart.hide{display:none}',
    '#jx-chart .hd{display:flex;align-items:center;justify-content:space-between;padding:8px 11px;background:linear-gradient(90deg,rgba(var(--jx-glow),.2),transparent);border-bottom:1px solid rgba(255,255,255,.08)}',
    '#jx-chart .hd b{font-weight:600;letter-spacing:.2px}',
    '#jx-chart .hd .x{cursor:pointer;opacity:.6;padding:0 3px;border:0;background:none;color:#fff;font-size:14px}',
    '#jx-chart .hd .x:hover{opacity:1}',
    '#jx-chart canvas{display:block;width:264px;height:104px}',
    '#jx-chart .lg{display:flex;gap:10px;padding:6px 11px 9px;flex-wrap:wrap}',
    '#jx-chart .lg i{font-style:normal;opacity:.85;display:inline-flex;align-items:center;gap:4px}',
    '#jx-chart .lg i s{width:8px;height:8px;border-radius:50%;display:inline-block;text-decoration:none}',
    '@media (max-width:768px){#jx-chart{width:212px}#jx-chart canvas{width:212px;height:86px}#jx-chart .lg{font-size:11px}}'
  ];
  function injectCss(id, arr) {
    if (document.getElementById(id)) return;
    var st = document.createElement('style');
    st.id = id;
    st.textContent = arr.join('\n');
    document.head.appendChild(st);
  }
  var themeKey = get('jx-theme', '');
  var lightsOn = get('jx-lights', '1') === '1';
  var chartOn = get('jx-chart', '1') === '1';
  function hex2rgb(h) { var m = /^#?([\da-f]{6})$/i.exec(h || ''); if (!m) return '111,125,255'; var n = parseInt(m[1], 16); return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255); }
  function applyTheme() {
    var r = document.documentElement;
    if (themeKey && THEMES[themeKey]) {
      r.setAttribute('data-jx-theme', themeKey);
      var c = THEMES[themeKey];
      r.style.setProperty('--jx-glow', c.glow);
      r.style.setProperty('--jx-glow2', hex2rgb(c.a2));
    } else {
      r.removeAttribute('data-jx-theme');
      r.style.setProperty('--jx-glow', '0,135,113');
      r.style.setProperty('--jx-glow2', '111,125,255');
    }
    var s = document.querySelector('#jx-pop .sw.on');
    if (s) s.classList.remove('on');
    var cur = document.querySelector('#jx-pop .sw[data-k="' + (themeKey || '') + '"]');
    if (cur) cur.classList.add('on');
  }
  function buildLights() {
    if (document.getElementById('jx-lights')) return;
    var box = document.createElement('div');
    box.id = 'jx-lights';
    box.innerHTML =
      '<div class="sh sh1"><div class="fill orb" style="background:radial-gradient(circle,rgba(var(--jx-glow),.85),transparent 65%)"></div></div>' +
      '<div class="sh sh2"><div class="fill orb" style="background:radial-gradient(circle,rgba(var(--jx-glow2),.7),transparent 65%)"></div></div>' +
      '<div class="sh sh3"><div class="fill ring"></div></div>' +
      '<div class="sh sh4"><div class="fill dia"></div></div>' +
      '<div class="sh sh5"><div class="beam"></div></div>' +
      '<div class="sh sh5b"><div class="beam"></div></div>';
    document.body.appendChild(box);
  }
  function setLights(on) {
    var el = document.getElementById('jx-lights');
    if (on) buildLights();
    else if (el) el.remove();
    lightsOn = !!on;
    set('jx-lights', on ? '1' : '0');
    var k = document.querySelector('#jx-pop .k[data-k="lights"]');
    if (k) k.classList.toggle('on', !!on);
  }
  var CH = { cpu: [], mem: [], tx: [], rx: [], raf: 0, fails: 0 };
  var BASE = location.pathname.split('/panel')[0] + '/';
  function buildChart() {
    if (document.getElementById('jx-chart')) return;
    var d = document.createElement('div');
    d.id = 'jx-chart';
    d.innerHTML =
      '<div class="hd"><b>📊 ' + t('chart') + '</b><button class="x" title="' + t('close') + '">✕</button></div>' +
      '<canvas id="jx-cc" width="528" height="208"></canvas>' +
      '<div class="lg"><i><s style="background:var(--jx-accent)"></s><span id="jx-l1">CPU</span></i>' +
      '<i><s style="background:var(--jx-accent2)"></s><span id="jx-l2">MEM</span></i>' +
      '<i style="opacity:.7" id="jx-l3"></i></div>';
    document.body.appendChild(d);
    d.querySelector('.x').addEventListener('click', function () { setChart(false); });
  }
  function push(a, v) { a.push(v); if (a.length > 46) a.shift(); }
  function fmt(n) { n = Math.round(n); if (n > 1048576) return (n / 1048576).toFixed(1) + 'M'; if (n > 1024) return (n / 1024).toFixed(1) + 'K'; return n; }
  function poll() {
    if (!chartOn || !document.getElementById('jx-chart')) return;
    fetch(BASE + 'panel/api/server/status', { credentials: 'same-origin', cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) {
        if (!j || !j.success || !j.obj) throw 0;
        CH.fails = 0;
        var o = j.obj;
        var cpu = Math.max(0, Math.min(100, o.cpu || 0));
        var mem = o.mem && o.mem.total ? (o.mem.current / o.mem.total) * 100 : 0;
        var up = o.netIO && o.netIO.up ? o.netIO.up : 0;
        var dn = o.netIO && o.netIO.down ? o.netIO.down : 0;
        push(CH.cpu, cpu); push(CH.mem, mem);
        var l3 = document.getElementById('jx-l3');
        if (l3) l3.textContent = '⇅ ' + fmt(up) + ' ↓ ' + fmt(dn);
        drawChart();
      })
      .catch(function () {
        CH.fails++;
        if (CH.fails >= 3) setChart(false);
      });
  }
  function xAt(i, w) { return (i / 45) * (w - 6) + 3; }
  function yAt(v, h, max) { return h - 5 - (Math.max(0, Math.min(max, v)) / max) * (h - 12); }
  function line(g, arr, w, h, color, max, fill) {
    if (arr.length < 2) return;
    var i, x, y;
    g.beginPath();
    for (i = 0; i < arr.length; i++) {
      x = xAt(i, w); y = yAt(arr[i], h, max);
      if (i === 0) g.moveTo(x, y);
      else { var px = xAt(i - 1, w), py = yAt(arr[i - 1], h, max); g.bezierCurveTo(px + (x - px) / 2, py, px + (x - px) / 2, y, x, y); }
    }
    g.strokeStyle = color; g.lineWidth = 2; g.shadowColor = color; g.shadowBlur = 7; g.stroke(); g.shadowBlur = 0;
    if (fill) {
      g.lineTo(xAt(arr.length - 1, w), h); g.lineTo(xAt(0, w), h); g.closePath();
      var gr = g.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, color + '55'); gr.addColorStop(1, color + '00');
      g.fillStyle = gr; g.fill();
    }
  }
  function drawChart() {
    var cv = document.getElementById('jx-cc');
    if (!cv || !cv.getContext) return;
    var dpr = window.devicePixelRatio || 1;
    var w = cv.clientWidth || 264, h = cv.clientHeight || 104;
    if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    var g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1;
    for (var i = 1; i < 4; i++) { var y = (h / 4) * i; g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    var cs = getComputedStyle(document.documentElement);
    var a = (cs.getPropertyValue('--jx-accent') || '#00907a').trim();
    var b = (cs.getPropertyValue('--jx-accent2') || '#6f7dff').trim();
    line(g, CH.cpu, w, h, a, 100, true);
    line(g, CH.mem, w, h, b, 100, false);
    if (CH.cpu.length) {
      var x = xAt(CH.cpu.length - 1, w), y = yAt(CH.cpu[CH.cpu.length - 1], h, 100);
      var p = 0.5 + 0.5 * Math.sin(Date.now() / 280);
      g.beginPath(); g.arc(x, y, 2.6 + p * 2.2, 0, Math.PI * 2);
      g.fillStyle = a; g.globalAlpha = 0.35 + p * 0.5; g.fill(); g.globalAlpha = 1;
    }
  }
  function setChart(on) {
    chartOn = !!on;
    set('jx-chart', on ? '1' : '0');
    if (on) { buildChart(); CH.fails = 0; poll(); }
    else { var el = document.getElementById('jx-chart'); if (el) el.remove(); }
    var k = document.querySelector('#jx-pop .k[data-k="chart"]');
    if (k) k.classList.toggle('on', !!on);
  }
  function buildUi() {
    if (document.getElementById('jx-ui')) return;
    var wrap = document.createElement('div');
    wrap.id = 'jx-ui';
    var sw = '<button class="sw" data-k="">' + t('def') + '</button>';
    Object.keys(THEMES).forEach(function (k) { sw += '<button class="sw" data-k="' + k + '">' + THEMES[k].label + '</button>'; });
    wrap.innerHTML =
      '<div id="jx-pop">' +
      '<p class="ttl">' + t('pick') + '</p><div class="row">' + sw + '</div>' +
      '<div class="tgl"><span>✨ ' + t('dance') + '</span><span class="k" data-k="lights"></span></div>' +
      '<div class="tgl"><span>📊 ' + t('chart') + '</span><span class="k" data-k="chart"></span></div>' +
      '</div>' +
      '<button id="jx-fab" title="' + t('pick') + '">🎨</button>';
    document.body.appendChild(wrap);
    document.getElementById('jx-fab').addEventListener('click', function (e) {
      e.stopPropagation();
      document.getElementById('jx-pop').classList.toggle('on');
    });
    document.addEventListener('click', function (e) {
      var p = document.getElementById('jx-pop');
      if (p && p.classList.contains('on') && !wrap.contains(e.target)) p.classList.remove('on');
    });
    Array.prototype.forEach.call(wrap.querySelectorAll('.sw'), function (btn) {
      btn.addEventListener('click', function () { themeKey = btn.getAttribute('data-k') || ''; set('jx-theme', themeKey); applyTheme(); });
    });
    Array.prototype.forEach.call(wrap.querySelectorAll('.k'), function (k) {
      k.addEventListener('click', function () {
        if (k.getAttribute('data-k') === 'lights') setLights(!lightsOn);
        else setChart(!chartOn);
      });
    });
    applyTheme();
    var kl = document.querySelector('#jx-pop .k[data-k="lights"]'); if (kl) kl.classList.toggle('on', lightsOn);
    var kc = document.querySelector('#jx-pop .k[data-k="chart"]'); if (kc) kc.classList.toggle('on', chartOn);
    var l1 = document.getElementById('jx-l1'), l2 = document.getElementById('jx-l2');
    if (l1) l1.textContent = t('cpu'); if (l2) l2.textContent = t('mem');
  }
  function boot() {
    injectCss('jx-theme-css', css);
    injectCss('jx-dance-css', cssDance);
    injectCss('jx-ui-css', cssUi);
    applyTheme();
    if (lightsOn) buildLights();
    buildUi();
    if (chartOn) { buildChart(); poll(); setInterval(function () { if (chartOn) poll(); }, 4000); }
    setInterval(drawChart, 120);
    try {
      new MutationObserver(function () {
        if ((themeKey || '') !== (document.documentElement.getAttribute('data-jx-theme') || '')) applyTheme();
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
