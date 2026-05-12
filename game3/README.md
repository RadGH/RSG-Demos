# Game2

A browser-based 2.5D isometric roguelike with local co-op for 1–4 players.

**Current milestone:** 20 complete. See `game.md` for the full design specification and `memory/future_milestones.md` for the milestone log.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Phaser 3](https://phaser.io/) | 3.88.2 | Game framework (rendering, input, physics, scenes) |
| [Vite](https://vitejs.dev/) | 5.4 | Dev server + production bundler |
| [Playwright](https://playwright.dev/) | 1.49 | Browser automation for headless testing |
| [concurrently](https://github.com/open-cli-tools/concurrently) | 9.x | Run Vite + debug server in parallel |
| Node.js | 20+ | Scripts, debug server, test runner |

---

## Build

```bash
npm install               # install dependencies
npm run build             # build to dist/
```

Output lands in `dist/`. The build is a single JS bundle (`dist/assets/index-*.js`) with the entry HTML at `dist/index.html`.

### Releases

After completing a milestone:

```bash
npm run build
cp -r dist /home/radgh/claude/game2_releases/milestone_N/
# add changelog entry in game2_releases/serve.js
fuser -k 5200/tcp 2>/dev/null
nohup node /home/radgh/claude/game2_releases/serve.js > /tmp/game2_server.log 2>&1 &
```

Releases are served on **port 5200** via `serve.js` and stay accessible between sessions.

---

## Development

```bash
npm run dev               # Vite dev server → http://localhost:5173
```

Vite proxies `/api/*` to the debug server (port 5199) when it is running. Hot module replacement is active.

To run with the full debug stack:

```bash
npm run dev:debug         # starts Vite (5173) + debug log server (5199) together
```

---

## Debug Mode

Append `?debug=1` to the game URL to activate debug mode:

```
http://localhost:5173/?debug=1
```

### What debug mode enables

| Feature | How to use |
|---|---|
| **Debug Quick Start panel** | Replaces normal lobby — pick class, level (1–20), and starting world (Town / Dungeon 1–3), then click **QUICK START** |
| **In-game overlay** | Press **backtick (`)** while in a dungeon to toggle a live stats overlay (FPS, HP/MP, room info, last 5 log entries) |
| **Auto log submit** | `DebugLog.submit()` fires every 30 seconds automatically, POSTing game logs to the debug server |
| **Debug helpers** | `window.__debugHelpers` is exposed in GameScene for test automation |
| **F key** | Inside the debug quick start screen, press **F** to fall back to the normal lobby |

### Debug helpers (console / test scripts)

Available on `window.__debugHelpers` while in `GameScene`:

```js
window.__debugHelpers.clearRoom()           // mark current room as cleared
window.__debugHelpers.advanceRoom()         // clear + advance to next room
window.__debugHelpers.addPlayer(2, 'wizard') // add Player 2 entity
window.__debugHelpers.killPlayer(1)         // set P1 HP to 0
window.__debugHelpers.getRoomInfo()         // { index, total, cleared, enemiesAlive }
window.__debugHelpers.getPlayerInfo(1)      // { level, hp, maxHp, classId, isDead }
window.__debugHelpers.panelOpen()           // { skills, char, inventory }
window.__debugHelpers.getPanelAnchor()      // { x, y, scrollFactor } of first panel object
```

Also available globally:

```js
window.DebugLog.info('msg')      // manual log entry
window.DebugLog.submit()         // POST logs to debug server now
window.DebugLog.getSummary()     // { total, errors, lastError }
window.DebugLog.getLog()         // full array of log entries
window.__currentScene            // name of the active scene
window.__playerSnapshot          // { level, hp, maxHp, mp, gold, classId }
window.__phaserGame              // the Phaser.Game instance
```

### Debug log server

The debug server receives `POST /api/logs` from the game and lets Claude (or you) read them:

```bash
# Start:
node scripts/debug-server.js      # or via npm run dev:debug

# Read logs:
curl http://localhost:5199/api/logs

# Clear logs:
curl -X DELETE http://localhost:5199/api/logs

# Status:
curl http://localhost:5199/api/status
```

---

## Testing

All tests require the dev stack running first:

```bash
npm run dev:debug      # keep this running in a separate terminal
```

### Test commands

| Command | Scenario |
|---|---|
| `npm run test:boot` | Boot to CharSelectScene → quick-start to Town → verify no JS errors |
| `npm run test:game` | Boot as wizard → Dungeon1 → move + abilities + debug overlay |
| `npm run test:classes` | Boot each of the 9 classes → verify load, abilities, no errors |
| `npm run test:combat` | Dungeon combat → clear room → verify loot drops |
| `npm run test:town` | Enter Town → move to NPC → F interaction → inventory/skills |
| `npm run test:death` | Kill player → verify game over → restart with R |
| `npm run test:menus` | Skills + Character panels → allocate points → verify panels stay fixed on screen |
| `npm run test:gamepad` | Inject Xbox gamepad → move with left stick → abilities → pause |
| `npm run test:multi2` | 2-player: P1 keyboard + P2 gamepad → step through 3 rooms |
| `npm run test:multi4` | 4 gamepads connected → P1+P2 independent movement → disconnect |
| `npm run test:mobile` | iPhone 14 Pro landscape (852×393, 3× scale, touch) → touch controls |
| `npm run test:save` | Enter Town → verify character level/class preserved |
| `npm run test:all` | Run all scenarios above sequentially and report pass/fail |

### How Claude uses these tests

1. Make a code change
2. `npm run test:game` (or a targeted scenario matching the change)
3. Check exit code — non-zero means a test failed
4. Read `screenshots/` for visual confirmation (PNG files are timestamped)
5. `curl http://localhost:5199/api/logs | python3 -m json.tool` to inspect game logs
6. If a failure, read the error message → locate the file + line → fix → re-run

### Gamepad mock

Tests inject a fake gamepad by overriding `navigator.getGamepads()`. Phaser polls this every frame, so axis/button changes propagate on the next game tick. Standard button mapping (Xbox):

| Index | Button |
|---|---|
| 0 | A (ability 1) |
| 1 | B (ability 2) |
| 2 | X (ability 3) |
| 3 | Y (ability 4) |
| 4 | LB (inventory) |
| 7 | RT (basic attack hold) |
| 9 | Start (pause) |
| 12–15 | D-pad (up/down/left/right) |

Axes: 0 = left stick X, 1 = left stick Y, 2 = right stick X, 3 = right stick Y.

### Mobile test

The mobile scenario launches Chromium with `hasTouch: true` and iPhone 14 Pro landscape dimensions:
- Logical viewport: 852 × 393 px
- Device pixel ratio: 3× (physical: 2556 × 1179)
- Phaser detects touch → `TouchControls.js` activates virtual joystick and buttons

### Screenshots

All screenshots are saved to `screenshots/<name>-<timestamp>.png`. They are committed to `.gitignore` (not version controlled). Viewing them during a Claude session:

```bash
ls -lt screenshots/ | head -20   # most recent first
```

Claude reads screenshots directly using the Read tool to visually verify game state.

---

## Project Structure

```
/src
  /core          — (reserved for future core loop refactor)
  /entities      — Player, Enemy, Mercenary, GroundItem
  /systems       — Combat, Loot, Inventory, Crafting, Quests, Achievements, ...
  /data          — Classes, abilities, enemies, items, passives, quests
  /ui            — HUD, InventoryUI, TouchControls
  /world         — MapGenerator, Room
  /save          — SaveSystem (localStorage)
  /utils         — DebugLog
  /scenes        — BootScene, CharSelectScene, TownScene, GameScene, HUDScene, ...
/scripts
  debug-server.js          — Log collection server (port 5199)
  test-game.js             — Playwright helper library
  run-all-tests.js         — Sequential test runner
  /scenarios               — Individual test scripts
/screenshots               — Test output images (gitignored)
dist/                      — Production build output
game2_releases/            — Served milestone releases (port 5200)
```

---

## Input

| Control | Keys / Buttons |
|---|---|
| Move | WASD or Arrow keys or Left stick |
| Basic attack | Left click or RT/R2 |
| Abilities 1–4 | 1/2/3/4 or Numpad or A/B/X/Y |
| Interact | F |
| Inventory | I or LB/L1 |
| Skills | K |
| Character | C |
| Pause | P or ESC or Start |
| Dodge | Space (with move direction) |
| Potion | Q (HP) / E (MP) |
| Loot filter | Tab |
| Debug overlay | ` (backtick, debug mode only) |

Local co-op supports up to 4 players. Player 1 uses keyboard by default; gamepads can be assigned per player via the lobby screen.

---

## Save System

Characters are saved to `localStorage` under keys `rogue_save_0` through `rogue_save_N` as JSON blobs. Auto-save fires every time a player enters the Town hub. Save data includes: class, level, XP, stats, inventory, skills, prestige, achievements, and run history.

Debug quick-start uses slot 99 which is never written to localStorage.

---

## Credits

- **Engine:** [Phaser 3](https://phaser.io/) — Richard Davey / Photon Storm Ltd (MIT)
- **Build tool:** [Vite](https://vitejs.dev/) — Evan You et al. (MIT)
- **Test automation:** [Playwright](https://playwright.dev/) — Microsoft (Apache 2.0)
- **Fonts:** Cinzel + Exo 2 via [Google Fonts](https://fonts.google.com/) (OFL / Apache 2.0)
- **Development:** Claude Code (Anthropic) + human direction
