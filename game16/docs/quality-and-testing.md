# Quality &amp; Testing

What ships per milestone, and how the build pipeline keeps quality up automatically.

## Per-milestone QA checklist

Run before declaring a milestone complete:

- [ ] Portrait lock works at 393×852 — no horizontal scroll
- [ ] Touch targets ≥ 44×44 CSS px on every interactive element
- [ ] Resize browser 360 → 1920 — no broken layouts, no janky reflow
- [ ] Text ≥ 14 px effective, readable at arm's length
- [ ] Core navigation works in Safari Mobile (DevTools), Chrome, Firefox
- [ ] Keyboard: every action reachable, focus ring visible
- [ ] Hover: every clickable has a hover state
- [ ] Lightbox: prev/next, Esc, swipe (if galleries changed)
- [ ] Charts/graphs render correctly with empty + populated data
- [ ] No console errors on load or after first interaction
- [ ] No 404s in the network panel for assets

## Mandatory tools per release

`release.sh game16` automatically:

1. Runs `optimize_audio.sh game16` — transcodes any new WAV/MP3/FLAC under `public/music/` and `public/sfx/` to Ogg Vorbis. Idempotent.
2. Runs the image optimization pipeline (see `optimize_images.js` at the workspace root) — generates webp/avif variants, regenerates `_thumbs/` for any new images.
3. Syncs shared infra:
   - `shared/site-layout.js` → `public/_layout.js`
   - `shared/nav-header.js` → `public/assets/_header.js`
   - `shared/tool-styles.css` → `public/assets/_tool-styles.css`
4. Builds the game with Vite.
5. Copies `dist/` to `<game>_releases/milestone_N/dist/` (next free N — never overwrites).

## Automation per game (recommended)

Add scripts under `scripts/` for repeated checks:

- `scripts/check-catalogs.cjs` — walks `public/images/`, `sfx/`, `music/`, `video/` and verifies every file has a catalog entry and every catalog entry exists on disk.
- `scripts/check-thumbs.cjs` — verifies every catalog entry that requires a thumb has one in `_thumbs/`.
- `scripts/check-broken-links.cjs` — fetches every page under `public/` and reports broken `href`/`src`.

Wire them into `release.sh` as `pre-build` checks once they exist.

## Tests

Vitest is the default. Per game, recommended:

- Unit tests for pure game logic (`src/game/`)
- Snapshot tests for catalog integrity
- No DOM tests required at v1; rely on manual QA + the checklist above

## Performance

- Bundle size budget: ≤ 2 MB initial JS, ≤ 1 MB initial CSS+HTML
- 60 fps target on iPhone 14 Pro (Safari)
- Lighthouse score ≥ 90 on Performance + Accessibility for the front-end pages (index/branding/docs/wishlist) — game page exempt if it's a heavy WebGL canvas

## Accessibility

- Semantic HTML (`<button>`, `<nav>`, `<main>`, etc. — never just `<div onclick>`)
- `aria-label` on icon-only buttons
- Color contrast ≥ 4.5:1 for body text (WCAG AA)
- No keyboard trap in modals
- Lightbox supports keyboard navigation

## Hooks

The Claude Code `UserPromptSubmit` hook auto-appends every prompt to `<project>/memory/prompt_history.md`. This gives Claude a record to recover from if a session is interrupted. Don't disable it.

## When tests fail

Fix the underlying issue. Don't `--no-verify`. Don't comment out a failing assertion. If the test is wrong, fix the test in the same commit and explain why in the message.
