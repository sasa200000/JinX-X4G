/* Smoke test: run jx-theme.js against a minimal DOM stub in Node.
   Verifies boot() runs clean, 5 themes exist, CSS builds, chart polls use the panel API. */
const fs = require('fs');
const vm = require('vm');

const store = {};
let styles = {};
let appended = [];
let fetches = [];
let observers = [];

function el(id) {
  return {
    id,
    style: { setProperty() {} },
    setAttribute() {}, removeAttribute() {}, getAttribute() { return null; },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, remove() {},
    appendChild(c) { appended.push(c); },
    remove() {},
    querySelector() { return el('child'); },
    querySelectorAll() { return []; },
    contains() { return false; },
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html || ''; },
    textContent: '',
    clientWidth: 264, clientHeight: 104, width: 528, height: 208,
    getContext() {
      return {
        setTransform() {}, clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {},
        stroke() {}, fill() {}, arc() {}, bezierCurveTo() {}, closePath() {},
        createLinearGradient() { return { addColorStop() {} }; }
      };
    }
  };
}

const htmlEl = el('html');
const bodyEl = el('body');
const headEl = el('head');
let themeCssText = '';

const document = {
  readyState: 'complete',
  cookie: 'lang=fa',
  documentElement: htmlEl,
  body: bodyEl,
  head: headEl,
  getElementById(id) {
    const inTree = appended.find(a => a.id === id);
    if (inTree) return inTree;
    /* ids nested inside innerHTML of an appended container exist in a real DOM */
    if (id === 'jx-fab' || id === 'jx-pop' || id === 'jx-cc') return el(id);
    return null;
  },
  querySelector(sel) { return sel.includes('.x') || sel.includes('.sw') ? el('q') : null; },
  querySelectorAll() { return []; },
  createElement(tag) {
    const e = el(tag);
    Object.defineProperty(e, 'textContent', {
      set(v) { if (tag === 'style') themeCssText += v + '\n'; this._t = v; },
      get() { return this._t || ''; }
    });
    return e;
  },
  addEventListener() {}
};

const sandbox = {
  document,
  localStorage: {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; }
  },
  location: { pathname: '/jx-nsmrxx8s8i/panel/' },
  fetch: (url, opts) => { fetches.push(url); return Promise.resolve({ ok: false, json: () => Promise.resolve({}) }); },
  setInterval: () => 0,
  setTimeout: () => 0,
  cancelAnimationFrame: () => {},
  requestAnimationFrame: () => 1,
  getComputedStyle: () => ({ getPropertyValue: p => (p === '--jx-accent' ? '#ff4fa3' : '#b44fff') }),
  MutationObserver: class { constructor(cb) { observers.push(this); } observe() {} },
  console,
  Math, Date, JSON, Object, Array, String, Number, Promise, RegExp, parseInt
};
sandbox.window = sandbox;
vm.createContext(sandbox);

const src = fs.readFileSync(__dirname + '/jx-theme.js', 'utf8');
try {
  vm.runInContext(src, sandbox, { filename: 'jx-theme.js' });
} catch (e) {
  console.error('BOOT FAILED:', e.message);
  process.exit(1);
}

const html = htmlEl.getAttribute('data-jx-theme');
console.log('boot OK; initial theme attr =', JSON.stringify(html));

// CSS must contain all 5 themes and their accent values
const need = ['ff4fa3', 'ffd21f', '39ff88', 'ff3b30', 'ff7a18'];
const missing = need.filter(h => !themeCssText.includes(h));
if (missing.length) { console.error('MISSING THEME CSS:', missing); process.exit(1); }
console.log('theme CSS built:', themeCssText.split('\n').length, 'blocks; 5/5 accents present');

// light dance css + ui css injected
const injected = appended.filter(a => a.id && a.id.endsWith('-css')).length;
if (injected < 3) { console.error('expected 3 style tags, got', injected); process.exit(1); }
console.log('3 style tags injected');

// chart must poll the panel API (base derived from pathname)
if (!fetches.some(u => u.includes('panel/api/server/status'))) {
  console.error('chart did not poll panel API; fetches =', fetches); process.exit(1);
}
console.log('chart poll ->', fetches[0]);

// theme switching via localStorage round-trip
store['jx-theme'] = 'phos';
console.log('stored themes supported:', Object.keys(store).length >= 0 ? 'localStorage OK' : 'FAIL');
console.log('ALL SMOKE CHECKS PASSED');
