/* fx.js — efek transisi, animasi pegas (Framer Motion), koin melompat (Anime.js),
   dan seret uang pada layar sentuh. (Three.js telah dihapus sesuai permintaan). */
(() => {
if (!(window.gsap && window.anime && window.Motion)) return;
const { animate, stagger } = Motion;
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, D = x => RM ? 0 : x;
document.documentElement.classList.add('fx');

/* ===== motion (Framer Motion): transisi slide + pegas tombol ===== */
function enter(i) {
  if (typeof slides === 'undefined' || !slides[i]) return;
  const s = slides[i], kids = [...s.querySelectorAll(':scope > *:not(.coins)')];
  if (RM) return;
  animate(s, { opacity: [0, 1], y: [32, 0], scale: [.97, 1] }, { type: 'spring', stiffness: 180, damping: 22 });
  animate(kids, { opacity: [0, 1], y: [20, 0] }, { type: 'spring', stiffness: 240, damping: 22, delay: stagger(.06, { startDelay: .1 }) });
  if (i === 4) setTimeout(flow, 800);
}

const PR = '.btn,.opt,.item,.tile,.bill,.dots button,.sw', SP = { type: 'spring', stiffness: 420, damping: 18 };
document.addEventListener('pointerdown', e => { const el = e.target.closest(PR); if (el && !el.disabled && !RM) animate(el, { scale: .93 }, SP); });
document.addEventListener('pointerup', e => { const el = e.target.closest(PR); if (el && !RM) animate(el, { scale: 1 }, SP); });
document.addEventListener('pointerover', e => { const el = e.target.closest(PR); if (e.pointerType === 'mouse' && el && !el.disabled && !RM && !el.contains(e.relatedTarget)) animate(el, { scale: 1.05 }, SP); });
document.addEventListener('pointerout', e => { const el = e.target.closest(PR); if (el && !RM && !el.contains(e.relatedTarget)) animate(el, el.matches('.tile') ? { scale: 1, rotateX: 0, rotateY: 0 } : { scale: 1 }, SP); });
document.addEventListener('pointermove', e => {
  const t = e.pointerType === 'mouse' && e.target.closest?.('.tile'); if (!t || RM) return; const r = t.getBoundingClientRect();
  animate(t, { rotateX: -((e.clientY - r.top) / r.height - .5) * 16, rotateY: ((e.clientX - r.left) / r.width - .5) * 16 }, { duration: .2 });
});

/* ===== anime.js: koin melompat di alur, hitung harga, kuis ===== */
function lit(li) { li.classList.add('lit'); if (!RM) animate(li, { scale: [1, 1.1, 1] }, { duration: .4 }); }
function flow() {
  const ol = document.querySelector('.steps'); if (!ol) return; let h = ol.querySelector('.hop');
  if (!h) { h = document.createElement('span'); h.className = 'hop'; h.textContent = '🪙'; h.setAttribute('aria-hidden', 'true'); ol.appendChild(h); }
  const lis = [...ol.querySelectorAll('li')], at = li => ({ left: li.offsetLeft + li.offsetWidth / 2 - 16, top: li.offsetTop - 18 });
  lis.forEach(l => l.classList.remove('lit')); anime.remove(h);
  const tl = anime.timeline({ easing: 'easeInOutCubic' });
  lis.forEach((li, k) => tl.add({ targets: h, ...at(li), duration: k ? 600 : 1, complete: () => lit(li) }));
  ol.onclick = e => { const li = e.target.closest('li'); if (!li) return; anime.remove(h); anime({ targets: h, ...at(li), duration: 450, easing: 'easeOutBack', complete: () => lit(li) }); buzz(25); };
}

/* ===== sambungkan ke fungsi di main.js ===== */
const _go = window.go; window.go = i => { _go(i); enter(currentSlide); };
const _lq = window.loadQuiz; window.loadQuiz = () => { _lq(); if (!RM && document.querySelector('#quiz-options .opt')) anime({ targets: '#quiz-options .opt', opacity: [0, 1], translateY: [24, 0], delay: anime.stagger(80), easing: 'easeOutBack', duration: 500 }); };
const _pp = window.proceedToPay; window.proceedToPay = () => {
  _pp(); if (selectedItemIndex === null) return;
  const o = { v: 0 }, el = $('target-price'); anime({ targets: o, v: items[selectedItemIndex].price, round: 1, duration: D(800), easing: 'easeOutExpo', update: () => { el.textContent = money(o.v); } });
};

/* ===== uang: seret dengan pointer (layar sentuh + mouse), ketuk tetap bisa ===== */
let moved = false;
const hit = (r, e, p = 24) => e.clientX > r.left - p && e.clientX < r.right + p && e.clientY > r.top - p && e.clientY < r.bottom + p;
function startDrag(e, b) {
  if (b.disabled) return; moved = false; const x0 = e.clientX, y0 = e.clientY, z = $('drop-zone'); let g;
  const mv = ev => {
    const dx = ev.clientX - x0, dy = ev.clientY - y0;
    if (!g && Math.hypot(dx, dy) > 8) {
      moved = true; g = b.cloneNode(true); g.classList.add('ghost'); g.removeAttribute('id'); const r = b.getBoundingClientRect();
      Object.assign(g.style, { position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', zIndex: 90, pointerEvents: 'none' });
      document.body.appendChild(g); b.style.opacity = .3;
    }
    if (g) { gsap.set(g, { x: dx, y: dy, rotation: dx * .05, scale: 1.1 }); z.classList.toggle('over', hit(z.getBoundingClientRect(), ev)); }
  };
  const up = ev => {
    removeEventListener('pointermove', mv); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
    if (!g) return; z.classList.remove('over'); b.style.opacity = '';
    if (ev.type === 'pointerup' && hit(z.getBoundingClientRect(), ev)) { g.remove(); pay(+b.dataset.value); }
    else gsap.to(g, { x: 0, y: 0, rotation: 0, scale: 1, duration: .4, ease: 'back.out(1.8)', onComplete: () => g.remove() });
    setTimeout(() => { moved = false; }, 0);
  };
  addEventListener('pointermove', mv); addEventListener('pointerup', up); addEventListener('pointercancel', up);
}
const _rw = window.renderWallet; window.renderWallet = () => {
  _rw(); document.querySelectorAll('.bill').forEach(b => {
    b.draggable = false; b.onclick = null; b.ondragstart = null;
    b.addEventListener('pointerdown', e => startDrag(e, b)); b.addEventListener('click', () => { if (!moved) pay(+b.dataset.value); });
  });
};

/* ===== mulai ===== */
function boot() {
  enter(typeof currentSlide === 'undefined' ? 0 : currentSlide);
}
document.readyState === 'complete' ? boot() : addEventListener('load', boot);
})();
