# Releasing

How a milestone goes from working code to a public URL on GitHub Pages.

## The two scripts

```bash
bash /home/radgh/claude/release.sh game16     # build + bundle into milestone_N/
bash /home/radgh/claude/deploy_pages.sh         # publish to GitHub Pages
```

Both live at the workspace root. They work from any directory. **Never run a per-game release script — there isn't one.**

## release.sh — what it does

1. Sanity check: `package.json` exists, no in-progress build, etc.
2. `optimize_audio.sh game16` — Ogg-transcode any new audio (idempotent)
3. Image optimization pass — webp/avif + thumbnails
4. Sync shared infra:
   - `shared/site-layout.js` → `public/_layout.js`
   - `shared/nav-header.js` → `public/assets/_header.js` (legacy tool-page header)
   - `shared/tool-styles.css` → `public/assets/_tool-styles.css`
5. Vite build → `dist/`
6. Detect next free milestone number, copy `dist/` to `<game>_releases/milestone_N/dist/` — **never overwrites**
7. Update `<game>_releases/game_meta.json` (`releases.<N>.date`, token count, etc.)
8. Print reminder to manually update `changelog`, `milestones`, `promptHistory`

## After release.sh — manual steps

Before you commit and deploy:

1. **`game_meta.json`** — update `changelog` (newest first) and `milestones` (mark M_N complete with date). Add a `promptHistory` entry if this milestone reflects a user direction change.
2. **`memory/future_milestones.md`** — mark M_N COMPLETE.
3. **`public/wishlist.html`** — flip every just-shipped wishlist item from todo/wip to done with the M_N tag. If anything is dropped, write the reason inline (NO SILENT SHELVING).
4. **Featured screenshot** — if `release_server/screenshots/game16.jpg` is missing or stale, run `take_screenshots.sh game16` or copy a hero image from the game's assets.
5. **Commit.** See `git-and-milestones.md`.

## deploy_pages.sh — what it does

1. Clones / updates the `RadGH/RSG-Demos` GitHub Pages repo into `~/rsg_demos_work/`
2. Copies the latest milestone from each game's `_releases/` dir
3. Runs `generate_pages_index.js` to rebuild the hub's `index.html`
4. Commits and pushes — GitHub Pages serves it within a minute or two

**Live site:** https://radgh.github.io/RSG-Demos/

## Local preview

The shared release server runs at `http://localhost:5247/`:

```bash
node /home/radgh/claude/release_server/serve.js
```

It serves the latest milestone of every registered game at `/<game-key>/`. The hub front page lists all games with their screenshots from `release_server/screenshots/`.

There is **no per-game dev server** beyond Vite (`npm run dev` in the game directory) for active development.

## Troubleshooting

- **Build fails:** check the Vite output. Don't release.
- **Audio optimization fails:** check `ffmpeg` is on PATH (`which ffmpeg`).
- **`milestone_N` already exists:** something earlier left state — check `<game>_releases/` and bump N manually if needed (with the user's confirmation).
- **GitHub Pages not updating:** check `gh-pages` branch action runs in the RSG-Demos repo.
