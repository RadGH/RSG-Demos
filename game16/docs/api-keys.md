# API Keys

All third-party API keys live in **one** location, gitignored.

## Location

```
/home/radgh/claude/assets/references/
```

This directory is excluded by the workspace `.gitignore`. **Never read or commit anything from a different keys path.** If you find an API key elsewhere in the repo, that's a bug — move it into `assets/references/` and delete the original.

## File naming

Each key in its own file, with a clear name:

- `openai-api-key.txt`
- `pixellab-api-key.txt`
- `elevenlabs-api-key.txt`
- `gemini-api-key.txt`
- `github-access-token.txt`

The `.gitignore` glob already covers `**/*-token.txt`, `**/*credentials*.txt`, `**/*api-key*`, etc. as a defense-in-depth layer.

## Reading keys in code

In Node scripts:

```js
const fs = require('fs');
const KEY = fs.readFileSync('/home/radgh/claude/assets/references/openai-api-key.txt', 'utf8').trim();
```

Never:
- Bake a key into the source bundle (`.env` shipped with the build)
- Log a key (even partially) to console or files
- Echo a key in a release build's HTML, JS, or JSON

## In the browser

The browser never sees raw API keys. If a feature needs a third-party API at runtime:

- Proxy through a backend (the shared release server at `:5247` can host endpoints)
- Or restrict to dev-only use (e.g. asset generation tools), with the key read server-side from `assets/references/`

## Verifying before commit

Always run `git status` before `git add -A` or `git add .` and verify nothing under `assets/references/` is staged. The `.gitignore` should prevent it, but defense in depth.

If a key was committed by mistake:
1. Stop. Don't push.
2. Rotate the key with the provider immediately (treat it as compromised).
3. Remove from history with `git filter-repo` or BFG (or ask the user how to proceed).

## Keys outside Claude's reach

If the user keeps a key elsewhere (e.g. shell env, password manager), don't try to read it. Ask the user to either drop it into `assets/references/` or pass it directly when needed.
