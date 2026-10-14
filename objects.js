/* objects.js — objek "3D" (SVG ber-shading + bayangan) yang melayang pelan,
   bisa dipencet (efek squeeze + label nama/harga), stan buah 3D di cover,
   objek dekorasi di sisi layar lebar, dan penyesuaian otomatis agar slide yang
   sudah penuh tidak ditambah visual. Tidak butuh library apa pun. */
(() => {
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const TC = a => `style="stop-color:color-mix(in srgb,var(--ac) ${a})"`; // stop warna ikut tema

/* ---------- gradien bersama (sekali saja di dokumen) ---------- */
const st = (o, c) => `<stop offset="${o}" stop-color="${c}"/>`;
const rad = (id, a, b, c, cx = .36, cy = .32, r = .78) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st(0, a)}${st(.45, b)}${st(1, c)}</radialGradient>`;
const lin = (id, a, b, c, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${st(0, a)}${st(.55, b)}${st(1, c)}</linearGradient>`;
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
${rad('gA', '#ff9d92', '#e5383b', '#7f0d12')}${rad('gO', '#ffe1a6', '#fb8c00', '#9a4600')}${rad('gP', '#f7ffb8', '#b8d43a', '#5c7c14')}
${rad('gG', '#ecd9ff', '#8b3fd9', '#3b0764', .35, .3, .8)}${rad('gS', '#ff9aad', '#e11d48', '#7a0f22')}${rad('gC', '#fff8c7', '#fbbf24', '#b45309', .38, .34, .75)}
${lin('gL', '#a8e682', '#4c9a3a', '#24652a', 1, 1)}${lin('gB', '#fffac2', '#fcd34d', '#cf9400')}${lin('gK', '#ffbb6b', '#f57c00', '#c2410c', 1, 0)}
${lin('gM', '#dcfce7', '#4ade80', '#15803d')}${lin('gW', '#8fd18f', '#2f8a3a', '#1b5e20')}${lin('gD', '#7dd3fc', '#e0f2fe', '#0284c7', 1, 0)}
<radialGradient id="gF" cx=".5" cy="0" r="1">${st(0, '#ffa8a8')}${st(.6, '#ef4444')}${st(1, '#b91c1c')}</radialGradient>
<linearGradient id="gT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" ${TC('55%,#fff')}/><stop offset=".6" style="stop-color:var(--ac)"/><stop offset="1" ${TC('70%,#000')}/></linearGradient>
<radialGradient id="gH" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs></svg>`);

/* ---------- bentuk objek (viewBox 0 0 100 100, alas di y≈92) ---------- */
const hi = (x, y, rx, ry, r) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#gH)" transform="rotate(${r} ${x} ${y})"/>`;
const leaf = (x, y) => `<path d="M${x} ${y}c6-10 20-10 23-6-5 9-16 11-23 6z" fill="url(#gL)"/>`;
const stem = d => `<path d="${d}" stroke="#6b3e1d" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
const txt = (x, y, s, c, t = 'Rp') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${s}" font-weight="800" fill="${c}" font-family="Quicksand,system-ui,sans-serif">${t}</text>`;
const grapes = (() => {
  const rows = [[23, 41, 59, 77], [32, 50, 68], [41, 59], [50]]; let s = '';
  rows.forEach((r, k) => r.forEach(x => { const y = 38 + k * 16; s += `<circle cx="${x}" cy="${y}" r="10" fill="url(#gG)"/><circle cx="${x - 3.5}" cy="${y - 3.5}" r="2.6" fill="#fff" opacity=".6"/>`; }));
  return stem('M50 30c0-9 4-15 8-20') + `<path d="M50 28c-10-12-28-8-30-2 10 8 22 8 30 2z" fill="url(#gL)"/>` + s;
})();
const seeds = [[36, 46], [50, 44], [64, 46], [30, 58], [44, 58], [58, 58], [70, 58], [38, 70], [52, 72], [64, 68], [46, 82], [56, 82]]
  .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="2.4" fill="#fde68a"/>`).join('');
const SVG = {
  apple: `<path d="M50 31C40 22 14 22 14 52c0 22 16 40 28 40 4 0 5-2 8-2s4 2 8 2c12 0 28-18 28-40 0-30-26-30-36-21z" fill="url(#gA)"/>`
    + stem('M50 33c0-9 2-16 6-22') + `<path d="M55 19c7-12 22-12 26-8-6 10-18 13-26 8z" fill="url(#gL)"/>` + hi(33, 46, 7, 12, -22),
  orange: `<circle cx="50" cy="56" r="36" fill="url(#gO)"/><g fill="#9a4600" opacity=".22"><circle cx="40" cy="72" r="1.7"/><circle cx="62" cy="66" r="1.7"/><circle cx="54" cy="80" r="1.7"/><circle cx="72" cy="50" r="1.7"/><circle cx="30" cy="60" r="1.7"/><circle cx="68" cy="78" r="1.7"/></g>`
    + `<circle cx="50" cy="21" r="3.2" fill="#6b3e1d"/>` + leaf(51, 20) + hi(36, 44, 9, 13, -30),
  pear: `<path d="M50 16c-9 0-12 12-12 22 0 8-20 16-20 34 0 14 14 22 32 22s32-8 32-22c0-18-20-26-20-34 0-10-3-22-12-22z" fill="url(#gP)"/>`
    + stem('M50 18c0-5 1-9 4-12') + leaf(53, 12) + hi(36, 66, 6, 11, -15),
  banana: `<g transform="translate(0 10)"><path d="M14 30c6 34 46 52 78 26 3-2 1-7-3-6-30 16-56 2-66-24-2-4-10-1-9 4z" fill="#e0a800"/>`
    + `<path d="M12 38c4 34 44 56 80 30 3-2 1-7-3-6-30 18-58 4-68-26-1-4-9-3-9 2z" fill="url(#gB)"/>`
    + `<path d="M22 46c10 18 30 26 50 20" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/>`
    + `<path d="M13 34l-5-9 7-3 5 9z" fill="#6b4f1d"/><circle cx="90" cy="63" r="2.6" fill="#4b3a14"/></g>`,
  grapes,
  strawberry: `<path d="M50 30C30 26 14 40 22 60c7 18 20 32 28 32s21-14 28-32c8-20-8-34-28-30z" fill="url(#gS)"/>` + seeds
    + `<path d="M50 18v12" stroke="#2e7d32" stroke-width="4" stroke-linecap="round"/><path d="M50 36L36 25l8 6-11 3 13 2-4 7 8-5 8 5-4-7 13-2-11-3 8-6z" fill="url(#gL)"/>` + hi(34, 52, 5, 10, -20),
  melon: `<g transform="translate(0 6)"><path d="M6 44a44 44 0 0 0 88 0z" fill="url(#gW)"/><path d="M11 44a39 39 0 0 0 78 0z" fill="#ecfccb"/><path d="M15 44a35 35 0 0 0 70 0z" fill="url(#gF)"/>`
    + `<g fill="#1f2937"><ellipse cx="34" cy="55" rx="2" ry="3.4"/><ellipse cx="50" cy="60" rx="2" ry="3.4"/><ellipse cx="66" cy="55" rx="2" ry="3.4"/><ellipse cx="42" cy="70" rx="2" ry="3.4"/><ellipse cx="58" cy="70" rx="2" ry="3.4"/></g>`
    + `<path d="M15 44h70" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"/></g>`,
  carrot: `<g transform="rotate(-28 50 55)"><path d="M50 32C44 20 40 14 36 8M50 32c0-10 2-18 4-26M50 32c6-10 12-14 18-18" stroke="#3f8f35" stroke-width="5" fill="none" stroke-linecap="round"/>`
    + `<path d="M37 34q13-8 26 0L53 92q-3 5-6 0z" fill="url(#gK)"/><path d="M42 46h7M52 58h7M44 70h6M51 80h4" stroke="#9a3412" stroke-opacity=".45" stroke-width="2.4" stroke-linecap="round"/></g>`,
  coin: `<circle cx="50" cy="59" r="36" fill="#a8590a"/><circle cx="50" cy="52" r="36" fill="url(#gC)"/><circle cx="50" cy="52" r="27" fill="none" stroke="#b45309" stroke-opacity=".5" stroke-width="3"/>`
    + txt(50, 61, 25, '#92400e') + hi(36, 38, 7, 12, -35),
  cash: `<rect x="12" y="44" width="76" height="40" rx="6" fill="#86efac" transform="rotate(12 50 64)"/><g transform="rotate(-10 50 62)"><rect x="10" y="52" width="80" height="40" rx="6" fill="#15803d"/>`
    + `<rect x="10" y="46" width="80" height="40" rx="6" fill="url(#gM)" stroke="#166534" stroke-width="2"/><rect x="16" y="52" width="68" height="28" rx="4" fill="none" stroke="#14532d" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 3"/>`
    + `<circle cx="50" cy="66" r="10" fill="#dcfce7" stroke="#166534" stroke-width="2"/>${txt(50, 70.5, 11, '#14532d')}</g>`,
  bag: `<path d="M34 42V30a16 16 0 0 1 32 0v12" fill="none" stroke-width="5" stroke-linecap="round" style="stroke:color-mix(in srgb,var(--ac) 70%,#000)"/>`
    + `<path d="M36 42c-5-14 1-22 8-25 2 10 0 18-8 25z" fill="url(#gL)"/><circle cx="60" cy="36" r="9" fill="url(#gA)"/>`
    + `<path d="M80 38l10 6 2 46-10 2z" style="fill:color-mix(in srgb,var(--ac) 62%,#000)"/><path d="M18 38h62l2 54H14z" fill="url(#gT)"/>`
    + `<rect x="34" y="56" width="30" height="20" rx="5" fill="#fff" opacity=".9"/>${txt(49, 70.5, 12, 'var(--ac)')}<rect x="22" y="44" width="5" height="40" rx="2.5" fill="#fff" opacity=".3"/>`,
  bottle: `<rect x="42" y="7" width="16" height="11" rx="3" fill="#ef4444"/><path d="M44 18h12v8c0 4 12 8 12 18v42a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V44c0-10 12-14 12-18z" fill="url(#gD)"/>`
    + `<path d="M33 54h34v32a5 5 0 0 1-5 5H38a5 5 0 0 1-5-5z" fill="#fb923c" opacity=".9"/><rect x="32" y="58" width="36" height="16" style="fill:var(--ac)"/>`
    + `${txt(50, 70, 10, '#fff', 'JUS')}<rect x="37" y="32" width="4" height="54" rx="2" fill="#fff" opacity=".6"/>`,
  gift: `<path d="M18 46h64v44a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z" fill="url(#gT)"/><rect x="12" y="36" width="76" height="14" rx="3" ${TC('80%,#fff').replace('stop-color', 'fill')}/>`
    + `<rect x="44" y="36" width="12" height="58" fill="#fde047"/><path d="M50 36c-10-16-28-12-22 0zM50 36c10-16 28-12 22 0z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>`
    + `<rect x="22" y="52" width="5" height="36" rx="2.5" fill="#fff" opacity=".3"/>`,
  tag: `<path d="M50 8v14" stroke="#9ca3af" stroke-width="2.5"/><g transform="rotate(-12 50 56)"><path d="M24 34L50 18l26 16v52a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6z" fill="#fff7ed" stroke-width="3" style="stroke:var(--ac)"/>`
    + `<circle cx="50" cy="32" r="5" fill="#fff" stroke="#9ca3af" stroke-width="2.5"/>${txt(50, 66, 18, 'var(--ac)')}<path d="M34 76h32" stroke="#d1d5db" stroke-width="3" stroke-linecap="round"/></g>`
};

/* nama [ID, EN, harga] untuk label ketika dipencet */
const NAME = {
  apple: ['🍎 Apel', '🍎 Apple', 7500], orange: ['🍊 Jeruk', '🍊 Orange', 5000], pear: ['🍐 Pir', '🍐 Pear', 8000],
  banana: ['🍌 Pisang', '🍌 Banana', 12000], grapes: ['🍇 Anggur', '🍇 Grapes', 25000], strawberry: ['🍓 Stroberi', '🍓 Strawberry', 20000],
  melon: ['🍉 Semangka', '🍉 Watermelon', 15000], carrot: ['🥕 Wortel', '🥕 Carrot', 3000], coin: ['🪙 Uang Koin', '🪙 Coin', 1000],
  cash: ['💵 Uang Kertas', '💵 Banknote', 50000], bag: ['🛍️ Tas Belanja', '🛍️ Shopping Bag'], bottle: ['🧃 Minuman', '🧃 Drink', 15000],
  gift: ['🎁 Kado', '🎁 Gift Box', 50000], tag: ['🏷️ Label Harga', '🏷️ Price Tag']
};
const rp = n => 'Rp ' + n.toLocaleString('id-ID');

function build(el) {
  const k = el.dataset.o; if (!SVG[k]) return;
  el.innerHTML = `<span class="b"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${SVG[k]}</svg></span><span class="shd"></span>`;
  if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', (-Math.random() * 7).toFixed(2) + 's');
  if (!el.style.getPropertyValue('--t')) el.style.setProperty('--t', (5.5 + Math.random() * 3).toFixed(2) + 's');
}
document.querySelectorAll('.obj[data-o]').forEach(build);

/* ---------- dipencet: squeeze + percikan + label ---------- */
function squeeze(el) {
  const svg = el.querySelector('svg'); if (!svg) return;
  svg.classList.remove('sq'); void svg.getBoundingClientRect(); svg.classList.add('sq');
  svg.addEventListener('animationend', () => svg.classList.remove('sq'), { once: true });
  try { navigator.vibrate && navigator.vibrate(15); } catch (e) {}
  const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height * .45;
  const n = NAME[el.dataset.o], en = typeof currentLang !== 'undefined' && currentLang === 'en';
  if (n) {
    el._lab?.remove();
    const lab = el._lab = document.createElement('div'); lab.className = 'plabel';
    lab.textContent = (en ? n[1] : n[0]) + (n[2] ? ' · ' + rp(n[2]) : '');
    Object.assign(lab.style, { left: x + 'px', top: r.top + 'px' }); document.body.appendChild(lab);
    lab.animate([
      { opacity: 0, transform: 'translate(-50%,-40%) scale(.6)' },
      { opacity: 1, transform: 'translate(-50%,-120%) scale(1)', offset: .2 },
      { opacity: 1, transform: 'translate(-50%,-135%) scale(1)', offset: .8 },
      { opacity: 0, transform: 'translate(-50%,-165%) scale(.9)' }
    ], { duration: RM ? 1200 : 1700, easing: 'ease-out' }).onfinish = () => lab.remove();
  }
  if (RM) return;
  const cs = getComputedStyle(document.body), cols = [cs.getPropertyValue('--ac'), '#fbbf24', cs.getPropertyValue('--b2'), '#ffffff'];
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('i'), a = i / 10 * Math.PI * 2 + Math.random() * .4, d = 34 + Math.random() * 30;
    s.className = 'spark'; Object.assign(s.style, { left: x + 'px', top: y + 'px', background: cols[i % 4], boxShadow: '0 1px 3px #0003' });
    document.body.appendChild(s);
    s.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(0)`, opacity: .2 }],
      { duration: 650 + Math.random() * 200, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => s.remove();
  }
}
document.addEventListener('click', e => { const o = e.target.closest('.obj'); if (o) squeeze(o); });

/* ---------- stan 3D di cover: bergoyang pelan + mengikuti pointer ---------- */
const scene = document.querySelector('.stall .scene');
if (scene) {
  let tx = 0, ty = 0, cx = 0, cy = 0;
  addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; } });
  const tick = ms => {
    if (typeof currentSlide === 'undefined' || currentSlide === 0) {
      cx += (tx - cx) * .05; cy += (ty - cy) * .05;
      const idle = RM ? 0 : Math.sin(ms / 2600) * 7;
      scene.style.transform = `rotateX(${(6 - cy * 10).toFixed(2)}deg) rotateY(${(idle + cx * 26).toFixed(2)}deg)`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- objek besar di sisi kiri/kanan (layar lebar), berganti per slide ---------- */
const SETS = [
  ['coin', 'strawberry', 'grapes', 'cash'], ['apple', 'coin', 'orange', 'bag'], ['pear', 'cash', 'apple', 'tag'],
  ['banana', 'bag', 'carrot', 'coin'], ['orange', 'coin', 'bottle', 'apple'], ['grapes', 'cash', 'melon', 'coin'],
  ['gift', 'apple', 'bottle', 'strawberry'], ['coin', 'orange', 'apple', 'coin'], ['bag', 'cash', 'apple', 'coin'],
  ['gift', 'strawberry', 'bag', 'coin']
];
const gut = document.getElementById('gutters');
function setGutters(i) {
  if (!gut) return; const set = SETS[i] || SETS[0];
  gut.querySelectorAll('.obj').forEach((o, k) => {
    if (o.dataset.o === set[k]) return;
    if (RM) { o.dataset.o = set[k]; return build(o); }
    const a = o.animate([{ opacity: 1, scale: 1 }, { opacity: 0, scale: .3 }], { duration: 260, delay: k * 60, fill: 'forwards' });
    a.onfinish = () => {
      o.dataset.o = set[k]; build(o);
      o.animate([{ opacity: 0, scale: .3 }, { opacity: 1, scale: 1 }], { duration: 520, easing: 'cubic-bezier(.3,1.6,.5,1)' }); a.cancel();
    };
  });
}

/* ---------- slide yang sudah penuh: visual tambahan diperkecil / disembunyikan ---------- */
function fit() {
  if (typeof slides === 'undefined') return;
  const s = slides[currentSlide], ds = [...s.querySelectorAll('[data-opt]')]; if (!ds.length) return;
  ds.forEach(d => { d.classList.remove('compact'); d.hidden = false; });
  const over = () => {   // pakai offsetTop/Height agar tidak terpengaruh animasi transform
    const cs = getComputedStyle(s), kids = [...s.children].filter(k => !k.hidden && getComputedStyle(k).position !== 'absolute');
    if (!kids.length) return false;
    const top = Math.min(...kids.map(k => k.offsetTop)), bot = Math.max(...kids.map(k => k.offsetTop + k.offsetHeight));
    return bot - top + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) > s.clientHeight + 2;
  };
  if (over()) ds.forEach(d => d.classList.add('compact'));
  if (over()) ds.forEach(d => { d.hidden = true; });
}

/* ---------- sambungkan ke fungsi di main.js ---------- */
const wrap = (name, after) => { const f = window[name]; if (typeof f === 'function') window[name] = (...a) => { const r = f(...a); after(); return r; }; };
wrap('go', () => { setGutters(currentSlide); fit(); });
wrap('cycleText', fit);
wrap('applyLanguage', fit);
let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fit, 120); });
const boot = () => { setGutters(typeof currentSlide === 'undefined' ? 0 : currentSlide); fit(); };
document.readyState === 'complete' ? boot() : addEventListener('load', boot);
})();
