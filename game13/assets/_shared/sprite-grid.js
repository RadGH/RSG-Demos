/**
 * sprite-grid.js — Shared sprite-grid utilities for images.html and image-review-v2.html
 *
 * Exports (all on window.SpriteGrid):
 *   mountBgFilter(containerEl)  — renders the bg-toggle toolbar into containerEl
 *   applySpriteBg(mode)         — applies a bg mode to body[data-sprite-bg]
 *   BG_LS_KEY                   — localStorage key (shared so both pages stay in sync)
 *   resolveAppearanceCategory   — map appearances-manifest kind → charCat filter value
 */
(function() {
  'use strict';

  /** localStorage key — same key means both pages share the user's preference. */
  const BG_LS_KEY = 'evImgReview_spriteBg';

  /**
   * Apply a sprite-background mode to the page.
   * Sets body[data-sprite-bg] which is read by the CSS rules in sprite-grid.css.
   * Updates active class on all .bg-filter-btn elements in every .bg-filter-bar.
   * Persists to localStorage.
   *
   * @param {string} mode  One of: 'checker' | 'none' | 'white' | 'black' | 'green'
   */
  function applySpriteBg(mode) {
    const valid = ['checker', 'none', 'white', 'black', 'green'];
    if (!valid.includes(mode)) mode = 'checker';
    // 'checker' = remove the override so the .checker-bg class handles it naturally.
    document.body.dataset.spriteBg = (mode === 'checker') ? '' : mode;
    // Sync active state on ALL bg-filter-bars (both pages may have multiple mount points)
    document.querySelectorAll('.bg-filter-bar .bg-filter-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.bg === mode);
    });
    try { localStorage.setItem(BG_LS_KEY, mode); } catch (_) {}
  }

  /**
   * Mount a background-filter toolbar inside `containerEl`.
   * Reads the current preference from localStorage and applies it immediately.
   * Safe to call multiple times (idempotent per container).
   *
   * @param {HTMLElement} containerEl  Where to inject the toolbar.
   */
  function mountBgFilter(containerEl) {
    if (!containerEl) return;

    var bar = document.createElement('div');
    bar.className = 'bg-filter-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Sprite background');

    var label = document.createElement('span');
    label.className = 'bg-filter-label';
    label.textContent = 'BG:';
    bar.appendChild(label);

    var options = [
      { bg: 'checker', icon: '☑', title: 'Transparency grid (checker)' },
      { bg: 'none',    icon: '∅', title: 'No background (transparent)' },
      { bg: 'white',   icon: 'W',      title: 'Solid white' },
      { bg: 'black',   icon: 'B',      title: 'Solid black' },
      { bg: 'green',   icon: 'G',      title: 'Chroma green #00FF00' },
    ];

    options.forEach(function(opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'bg-filter-btn';
      btn.dataset.bg = opt.bg;
      btn.title = opt.title;
      btn.setAttribute('aria-label', opt.title);
      btn.textContent = opt.icon;
      btn.addEventListener('click', function() { applySpriteBg(opt.bg); });
      bar.appendChild(btn);
    });

    containerEl.appendChild(bar);

    // Read preference and apply (also syncs the active state on the new buttons)
    var saved = 'checker';
    try { saved = localStorage.getItem(BG_LS_KEY) || 'checker'; } catch (_) {}
    applySpriteBg(saved);
  }

  /**
   * Map an appearances-manifest entry's kind/category to the filter category
   * used by image-review-v2.html's charCats filter set.
   *
   * appearances-manifest kinds:
   *   'class'      → 'hero'     (player-controlled classes)
   *   'companion'  → 'companion'
   *   'enemy'      → 'enemy'
   *   'boss'       → 'boss'
   *   'npc'        → null       (not shown in charCat-filtered views)
   *   'deprecated' → null
   *   'appearance' → 'hero'     (fallback for older entries)
   *
   * Also respects the direct category field (from image-review-v2.json entries
   * which already use 'hero'/'companion'/'boss'/'enemy').
   *
   * @param {Object} app  An entry from appearances-manifest.json
   * @returns {string|null}  The charCat value, or null to exclude from filtered views
   */
  function resolveAppearanceCategory(app) {
    // image-review-v2.json entries already carry the right category value
    if (app.category && ['hero','companion','boss','enemy'].includes(app.category)) {
      return app.category;
    }
    // appearances-manifest entries use 'kind'
    var kind = app.kind || app.category || '';
    switch (kind) {
      case 'class':
      case 'appearance': return 'hero';
      case 'companion':  return 'companion';
      case 'enemy':      return 'enemy';
      case 'boss':       return 'boss';
      default:           return null;  // 'npc', 'deprecated', unknown
    }
  }

  // Expose on window
  window.SpriteGrid = {
    BG_LS_KEY:                   BG_LS_KEY,
    applySpriteBg:               applySpriteBg,
    mountBgFilter:               mountBgFilter,
    resolveAppearanceCategory:   resolveAppearanceCategory,
  };
})();
