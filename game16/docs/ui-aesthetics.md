# UI Aesthetics

The site and the game should feel polished, alive, and pleasant. "Functional" is the floor, not the ceiling.

## Required for every web page

- **Hover effects.** Every clickable element should respond to hover with at least a color shift, glow, or slight transform. Use `transition: 0.15s` for snap-but-smooth feel.
- **Micro-animations.** Page enter, card tilt, button press, list item slide-in. Use CSS transforms and opacity (cheap, GPU-accelerated). Avoid layout thrash.
- **No hard layout shifts.** Reserve space for async content. If something pops in late, the page above it must not jump.
- **Charts and graphs where data exists.** If the page shows numbers, also show them visually — bar, sparkline, gauge, progress ring, anything beats a wall of digits.
- **Lightbox previews for media.** Click a thumbnail → modal with the full-size asset, prev/next navigation (← →, swipe on touch), Esc to close, fade-in/out.
- **Pleasing typography.** Display font for headers, UI font for body. Set tight `letter-spacing` on display, wide on UI labels. Use `clamp()` for fluid type.

## Thumbnails — required

Every image in the game's media library has a thumbnail used by the website:

- Same filename as the original, in a `_thumbs/` subfolder of the same directory.
- Generated automatically by the asset optimization pipeline (square-crop, ~256 px on the long edge).
- **Cataloged in the same `catalog.json` entry** as the original — `"thumb": "_thumbs/foo.png"`. The site reads `thumb` for grids, `file` for the lightbox.
- Thumbnails are also optimized (Ogg / WebP equivalent for images, `cwebp -q 80`).

## Lightbox spec

Minimum behavior:

- Trigger: click a thumbnail in any gallery
- Layout: dim background overlay, centered image, image scales to fit viewport
- Controls: prev / next buttons (visible on hover, always visible on touch), Esc / click-outside / X to close
- Caption: name + source + prompt summary from `catalog.json`
- Keyboard: ← / → to navigate, Esc to close
- Touch: swipe horizontally to navigate, tap outside image to close
- No layout shift on the page underneath

## Charts and graphs

When showing data (player stats, item rarity distribution, milestone progress, asset counts, etc.), prefer:

- **Bar / column** for comparing categories
- **Sparkline** for time series in a small footprint
- **Progress ring or radial gauge** for a single percentage
- **Histogram** for distributions
- Any lightweight library (≤25 KB gzipped — see new-tool rule), or hand-rolled SVG

Avoid pie charts unless 2–3 slices.

## Reference: game13 character galleries

The `news` re-redesign in game13 (character galleries with hover-zoom, animated entry, lightbox preview, and stat-block charts) is the bar. Match or exceed it.

## What "looks polished" means in practice

- Spacing is consistent (use a 4 px or 8 px grid)
- Colors come from `branding.json` — never hard-code hex
- Hover and focus states are distinguishable (focus needs a visible ring for keyboard users)
- Empty states have art / a friendly message, not a blank panel
- Error states explain what happened and what to do next
- Loading states use a skeleton or spinner; never a blank screen

## Anti-patterns

- Generating page chrome from scratch every time (use `_layout.js`)
- Inline styles that duplicate token values (always use `var(--site-*)`)
- Auto-playing audio
- Modal popups on page load
- Tooltips as the only label for icon buttons (always include `aria-label`)
