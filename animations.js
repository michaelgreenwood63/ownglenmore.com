(function () {
  'use strict';

  // Auto-targets the repeated card/section classes already used site-wide — no
  // per-page data-reveal markup needed. Reveal class is added by this script at
  // runtime only, so if the script fails to load content stays fully visible.
  var REVEAL_SELECTOR = [
    '.building-card', '.subarea-card', '.why-card', '.school-card', '.blog-card',
    '.upcoming-card', '.listing-card', '.faq-item', '.highlights', '.unit-card',
    '.compare-card', '.sold-card', '.lead-box', '.section-title', '.section-sub'
  ].join(',');

  var GRID_SELECTOR = [
    '.buildings-grid', '.subarea-grid', '.why-grid', '.schools-grid', '.blog-grid',
    '.solds-grid', '.listings-grid-live', '.unit-grid', '.compare-grid'
  ].join(',');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function prep() {
    var targets = document.querySelectorAll(REVEAL_SELECTOR);
    if (!targets.length) return [];

    // Stagger siblings within the same grid container for a cascade effect.
    var gridIndex = new WeakMap();
    document.querySelectorAll(GRID_SELECTOR).forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (child, i) { gridIndex.set(child, i); });
    });

    targets.forEach(function (el) {
      el.classList.add('ro-reveal');
      var i = gridIndex.has(el) ? gridIndex.get(el) : 0;
      var delay = Math.min(i * 60, 420);
      if (delay) el.style.transitionDelay = delay + 'ms';
    });
    return targets;
  }

  function observeReveal(targets) {
    if (reduceMotion) {
      targets.forEach(function (el) { el.classList.add('ro-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('ro-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  // Count-up for .stat-num — parses an optional "$" prefix, a comma-formatted
  // number, and a trailing suffix ("+", "K", "%", etc). Elements with no
  // digits (e.g. a label-only stat) or still showing a loading placeholder
  // ("—") are left untouched and simply render as-is.
  function countUp(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    var prefix = m[1], target = parseFloat(m[2].replace(/,/g, '')), suffix = m[3];
    if (!isFinite(target)) return;
    var hasComma = m[2].indexOf(',') !== -1;
    var isInt = target === Math.round(target);

    if (reduceMotion) return; // leave final value as-is

    var duration = 1100;
    var start = null;
    el.textContent = prefix + '0' + suffix;

    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var val = target * eased;
      var display = isInt ? Math.round(val) : val.toFixed(1);
      el.textContent = prefix + (hasComma ? Number(display).toLocaleString('en-CA') : display) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = raw; // snap to the exact original string
    }
    requestAnimationFrame(tick);
  }

  function observeCounts() {
    var nums = document.querySelectorAll('.stat-num');
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  function init() {
    var targets = prep();
    if (targets.length && 'IntersectionObserver' in window) observeReveal(targets);
    else targets.forEach(function (el) { el.classList.add('ro-in'); });

    if ('IntersectionObserver' in window) observeCounts();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
