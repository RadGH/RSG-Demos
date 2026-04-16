# README_STRUCTURE.md

Canonical format for `README.md` in this repo. Use this document to rebuild the README from scratch.

## Sections (in order)

1. **Title + intro paragraph** — `# RSG-Demos` and a 1–2 sentence explanation that this is a test-bed for games built by Radley Sustaire with Claude Code (Anthropic).
2. **Live site link** — bold label + URL: `https://radgh.github.io/RSG-Demos/`.
3. **Repo role paragraph** — note that `index.html` is auto-generated and this repo is a pure GitHub Pages publishing target (source code lives elsewhere, copied in by `deploy_pages.sh`).
4. **Horizontal rule.**
5. **`## Games`** — one subsection per game, in numeric directory order (`game2`, `game3`, `game4`, `game6`, `game7`, `game8`, `game10`, `game11`, `game12`, `game13`, `game14`). Use the display name + `(gameN)` tag as the `###` heading.
6. For each game, in this order:
   - One-paragraph description (1–3 sentences, pulled from the data source below).
   - Blank line.
   - `- **Play:** <url>` — the game's GitHub Pages URL path.
   - `- **Game info / assets:** <url>` — the `/assets/` or `/game-info/` sub-path if present.
7. **Emberveil (game13) callout** — inside that game's block, under the bullet list, include a `> Note:` blockquote explaining that the Play link goes to the marketing front page and users must click "Play Now" to reach `play.html`. Explain this is intentional.
8. **Horizontal rule.**
9. **`## Rebuilding this README`** — one-line pointer back to this structure file.

## Data sources

For each game `gameN`:

| Field | Source |
|-------|--------|
| Display name | `/home/radgh/claude/gameN_releases/game_meta.json` → `name` |
| Description | `/home/radgh/claude/gameN_releases/game_meta.json` → `description` (tighten to 1–3 sentences) |
| Play URL | `https://radgh.github.io/RSG-Demos/gameN/` |
| Info URL | Inspect `~/rsg_demos_work/gameN/` — if `game-info/` exists use `/gameN/game-info/`, otherwise use `/gameN/assets/` (every game has an `assets/` directory at minimum) |

## Rules

- List games in numeric order by their directory number (not alphabetical by display name).
- Keep each description to 1–3 sentences. Trim marketing fluff but keep genre, hook, and one distinctive feature.
- The "Game info / assets" link should prefer `game-info/` over `assets/` when both exist (currently only game13).
- The Emberveil note is unique — do not add analogous notes to other games unless they also have a marketing front page separate from `index.html`.
- Do not list milestone numbers or dates — those change every deploy and would make the README stale.
- Do not add a screenshot gallery — the hub at the live URL already shows card art.

## Commit conventions

When regenerating the README, commit with a short imperative subject like `docs: refresh README` or `docs: add gameN to README`. Do not add Claude co-author lines unless the user asks.

## Adding a new game

1. Wait until the game has at least one successful `deploy_pages.sh` run so the `gameN/` directory exists in this repo.
2. Read `game_meta.json` for the name and description.
3. Determine the info path (`game-info/` vs `assets/`).
4. Insert the new `###` block in the correct numeric position within the Games section.
5. Commit README + push.
