# File Structure

Where things live in a game project. Follow this layout — do not improvise.

## Root

```
game16/
├── CLAUDE.md            # Top-level rules + doc index (do not duplicate doc content)
├── game.md              # Design document
├── package.json
├── vite.config.js
├── memory/
│   ├── MEMORY.md        # Index of memory files
│   ├── new_game_survey.md   # First-session checklist (delete after archive)
│   └── future_milestones.md
├── public/              # Static web root (see below)
└── src/                 # Game source code
```

## public/ — every web-facing file

```
public/
├── _layout.js           # AUTO-SYNCED from shared/site-layout.js — never edit directly
├── index.html           # Front page (Play button → game.html)
├── game.html            # The game itself (full-screen, no header)
├── branding.html        # Logo / palette / fonts / atmosphere
├── branding.json        # Tokens read by _layout.js + branding.html
├── docs.html            # Markdown viewer for docs/*.md
├── wishlist.html        # Living wishlist
├── docs/                # *.md source — see docs index in CLAUDE.md
├── assets/              # Asset gallery + tools
│   ├── index.html       # Picker → Images / Audio / Videos / Tools
│   ├── images.html
│   ├── audio.html
│   ├── videos.html
│   └── _header.js       # AUTO-SYNCED — old tool-page header (legacy)
├── images/
│   ├── <category>/      # Refine per game: portraits/, backgrounds/, ui/, sprites/
│   │   ├── catalog.json # Per-folder media catalog (required)
│   │   └── _thumbs/     # Thumbnails matching original filenames
├── sfx/
│   ├── catalog.json
│   └── *.ogg
├── music/
│   ├── catalog.json
│   └── *.ogg
└── video/
    ├── catalog.json
    ├── _thumbs/
    └── *.mp4
```

## src/

Layout depends on framework chosen during the survey. Recommended at minimum:

```
src/
├── main.js              # Entry, mounts to game.html
├── game/                # Pure game logic (no DOM)
├── ui/                  # DOM/canvas rendering, screens
├── data/                # Static data (items, levels, etc.)
└── assets-manifest.js   # If runtime needs to enumerate assets
```

## Naming conventions

- **Files:** `snake_case.png`, `snake_case.js`, `kebab-case.html` for HTML pages.
- **Images:** prefix by category for sortability — `bg_forest_01.png`, `portrait_hero_01.png`, `ui_button_play.png`.
- **Thumbnails:** same filename as the original, placed in `_thumbs/` subfolder of the same directory. Generated/optimized by the build, never hand-cropped at full size.
- **Audio:** Ogg Vorbis only after `optimize_audio.sh`. Drop in WAV/MP3/FLAC, the script transcodes.

## What does NOT live in the game directory

- API keys → `/home/radgh/claude/assets/references/` (gitignored, see `api-keys.md`)
- Built milestones → `/home/radgh/claude/<game>_releases/milestone_N/` (managed by `release.sh`)
- Screenshots for the hub → `/home/radgh/claude/release_server/screenshots/<key>.jpg`
- Server / per-game dev server — **does not exist.** Only the shared release server at `:5247` runs.

## Keeping this doc current

If you change the layout (add a new top-level folder, rename a directory, add a new asset category), update this file in the same response. Docs-out-of-sync is a bug.
