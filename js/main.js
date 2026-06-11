/* Position Xero — main.js */

// Hero cloth-warp grid effect
(function () {
  const canvas = document.getElementById('heroGrid');
  if (!canvas) return;

  // Respect reduced-motion preferences — skip the animation entirely.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero   = canvas.closest('.hero');
  const ctx    = canvas.getContext('2d');
  if (!hero) return;

  // Grid geometry
  const CELL   = 68;   // px between grid lines
  const STEPS  = 16;   // polyline segments per line (more = smoother curve)

  // Warp settings
  const SIGMA    = 200; // px — radius of cloth depression
  const STRENGTH = 90;  // px — max inward pull at dead-centre

  // Spring settings (gives the "weight sinking into fabric" lag)
  const SPRING = 0.055;

  let W = 0, H = 0;
  let rawX = -9999, rawY = -9999; // actual mouse position
  let smX  = -9999, smY  = -9999; // spring-eased position
  let velX = 0, velY = 0;          // spring velocity

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  // Track mouse relative to hero
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    rawX = e.clientX - r.left;
    rawY = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', () => { rawX = -9999; rawY = -9999; });

  // Displacement at a single grid point
  function warp(px, py) {
    const dx = px - smX;
    const dy = py - smY;
    const d2 = dx * dx + dy * dy;
    // Gaussian pull toward cursor — strongest at centre, zero at infinity
    const pull = STRENGTH * Math.exp(-d2 / (2 * SIGMA * SIGMA));
    const dist = Math.sqrt(d2) || 1;
    return {
      x: px - (dx / dist) * pull,
      y: py - (dy / dist) * pull
    };
  }

  // Draw one warped line by sampling STEPS points along it
  function drawWarpedLine(x0, y0, x1, y1) {
    ctx.beginPath();
    for (let i = 0; i <= STEPS; i++) {
      const t  = i / STEPS;
      const px = x0 + (x1 - x0) * t;
      const py = y0 + (y1 - y0) * t;
      const w  = warp(px, py);
      i === 0 ? ctx.moveTo(w.x, w.y) : ctx.lineTo(w.x, w.y);
    }
    ctx.stroke();
  }

  function draw() {
    // Critically-damped spring toward raw mouse
    const dx = rawX - smX;
    const dy = rawY - smY;
    velX += dx * SPRING;
    velY += dy * SPRING;
    velX *= 0.78; // damping
    velY *= 0.78;
    smX  += velX;
    smY  += velY;

    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(0,0,0,0.055)';
    ctx.lineWidth   = 1;

    const cols = Math.ceil(W / CELL) + 1;
    const rows = Math.ceil(H / CELL) + 1;

    // Horizontal lines
    for (let r = 0; r <= rows; r++) {
      drawWarpedLine(0, r * CELL, W, r * CELL);
    }
    // Vertical lines
    for (let c = 0; c <= cols; c++) {
      drawWarpedLine(c * CELL, 0, c * CELL, H);
    }

    if (running) rafId = requestAnimationFrame(draw);
  }

  let rafId = null, running = false;
  function start() { if (!running) { running = true; rafId = requestAnimationFrame(draw); } }
  function stop()  { running = false; if (rafId) cancelAnimationFrame(rafId); rafId = null; }

  resize();
  window.addEventListener('resize', resize);

  // Only animate while the hero is on-screen (saves CPU/battery off-screen).
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => (e.isIntersecting ? start() : stop()));
    }, { threshold: 0 }).observe(hero);
  } else {
    start();
  }
})();

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  const setMenu = (open) => {
    hamburger.classList.toggle('active', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  hamburger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  // Escape closes the menu and returns focus to the toggle.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) { setMenu(false); hamburger.focus(); }
  });
}

// Sticky nav
const nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

// Fade-in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// FAQ accordion (with aria-expanded sync for screen readers)
const faqButtons = document.querySelectorAll('.faq-question');
function syncFaqAria() {
  faqButtons.forEach(b => {
    const it = b.closest('.faq-item');
    b.setAttribute('aria-expanded', it && it.classList.contains('open') ? 'true' : 'false');
  });
}
faqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
    syncFaqAria();
  });
});
syncFaqAria();

// Animated counters
function animateCounter(el) {
  const raw    = el.dataset.target;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const target = parseFloat(raw);
  const isFloat = raw.includes('.');
  const dur = 2200, start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + (isFloat ? (target * eased).toFixed(1) : Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// Testimonials horizontal scroll
// Uses offsetTop (static) not getBoundingClientRect (shifts as you scroll).
// Section height is set to 100vh + maxTranslate so the sticky inner content
// "pauses" the page while the cards travel left.
const testimonialsSection = document.getElementById('testimonialsSection');
if (testimonialsSection) {
  const track       = document.getElementById('testimonialsTrack');
  const progressBar = document.getElementById('testimonialsProgress');
  const wrapper     = track.parentElement;
  let maxTranslate  = 0;

  function initTestimonials() {
    maxTranslate = Math.max(0, track.scrollWidth - wrapper.offsetWidth);
    testimonialsSection.style.height = (window.innerHeight + maxTranslate) + 'px';
  }

  function updateTestimonialsScroll() {
    if (maxTranslate <= 0) return;
    const progress = Math.max(0, Math.min(1,
      (window.scrollY - testimonialsSection.offsetTop) / maxTranslate
    ));
    track.style.transform = `translateX(${-(progress * maxTranslate)}px)`;
    if (progressBar) progressBar.style.width = (progress * 100) + '%';
  }

  // Run immediately (DOM ready via defer), then again after fonts/images load
  initTestimonials();
  window.addEventListener('load', () => { initTestimonials(); updateTestimonialsScroll(); });
  window.addEventListener('resize', () => { initTestimonials(); updateTestimonialsScroll(); });
  window.addEventListener('scroll', updateTestimonialsScroll, { passive: true });
}
