# Git &amp; Milestones

How version control and milestone management work in this monorepo.

## Monorepo

All games live in a single git repo at `/home/radgh/claude/`, on `main`. There are NO per-game branches and NO submodules. A few subdirectories have stray `.git/` dirs from earlier experiments — ignore them; the only real repo is the workspace root.

The repo also mirrors to a private GitHub remote (`RadGH/claude-game-workspace`) as off-machine backup. Pushes use the token at `assets/references/github-access-token.txt`.

## Claude manages git

The user does NOT run git commands. Claude commits on the user's behalf:

- After every milestone `release.sh` succeeds, BEFORE `deploy_pages.sh`
- After any substantial subagent change
- When the user explicitly asks

**Commit author:** `Claude Code <claude-code@anthropic.com>`. Do not use the user's name. Do not add Co-Authored-By unless the user explicitly asks.

**Commit message format:** short imperative subject (≤ 72 chars), optional body. Prefix with the game key for clarity:

```
gameXX MNN: short description of what landed
```

## NEVER commit secrets

`assets/references/` holds API keys and is excluded by `.gitignore`. **Always run `git status` before `git add -A` or `git add .`** and verify nothing under `assets/references/` is staged.

If a key file is accidentally staged: unstage it (`git restore --staged <path>`), check the file is in `.gitignore`, then continue.

## Milestones — never overwrite

Each game keeps milestone builds under `<game>_releases/milestone_N/`. **Never overwrite an existing milestone.** Always create `milestone_N+1`. The hub server reads the latest milestone; older milestones remain on disk as historical snapshots.

`release.sh` enforces this by detecting the next free milestone number and refusing to clobber.

If you need to fix a bug in a shipped milestone, the fix lands in the **next** milestone — not by re-writing the old one.

## Per-milestone git flow

1. `release.sh game15` runs (build, optimize, copy to `<game>_releases/milestone_N/dist/`)
2. Update `<game>_releases/game_meta.json` (`changelog`, `milestones`, `releases.<N>.date`)
3. Update `wishlist.html` (flip todo → done with milestone tag)
4. Update `memory/future_milestones.md` (mark M_N COMPLETE)
5. **Commit** — `git add` only the relevant files (game source, releases meta, wishlist updates), never `assets/references/`
6. `deploy_pages.sh` (publishes to GitHub Pages)
7. `git push` to the GitHub remote backup

## Branches

- Default and only working branch: `main`
- No feature branches unless the user explicitly asks for one for a destructive experiment
- Tags: optional per milestone (`gameXX-mNN`) — not currently enforced

## When git gets confused

- Don't `reset --hard` without asking. Investigate the actual state first (`git status`, `git log -10`, `git diff`).
- Don't `push --force` to `main`. Ask first.
- Don't bypass hooks (`--no-verify`) unless the user requests it.
