/* nav.js — primary nav mobile drawer toggle (added 2026-06-03).
   Progressive enhancement: nav links work without JS; this only
   drives the hamburger drawer at <=1024px. */
(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;
  var toggle = nav.querySelector('.nav-toggle');
  var menu = nav.querySelector('.nav-links');
  if (!toggle || !menu) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!nav.classList.contains('is-open'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') &&
        !e.target.closest('.nav-links') &&
        !e.target.closest('.nav-toggle')) {
      setOpen(false);
    }
  });
})();
