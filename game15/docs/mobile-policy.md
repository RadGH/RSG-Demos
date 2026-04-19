# Mobile Policy

Every game must run cleanly on iPhone 14 Pro **and** desktop PC. Mobile is a first-class target, not a port.

## Targets

- **Primary mobile:** iPhone 14 Pro — 393×852 CSS px, 3× DPR, portrait
- **Secondary mobile:** any 360–430 CSS px portrait device (Android, smaller iPhones)
- **Primary desktop:** mouse + keyboard, any window size from 800×600 up to 4K
- **Auto-resize:** every layout adapts to the browser window — no fixed pixel widths above 360px

## Hard rules

- **Viewport meta:** every HTML page must include `<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">`. The game page may add `user-scalable=no`.
- **Touch targets ≥ 44×44 CSS px** (Apple HIG minimum). Test by tapping with a thumb on a real device.
- **No horizontal scroll** at 360 px. Use `overflow-x: hidden` on `body` only as a last resort — fix the root cause first.
- **No hover-only interactions.** Hover is a polish layer; every action must be reachable by tap and by keyboard.
- **Text ≥ 14 px effective** (16 px preferred). Avoid `vw`-only sizing; use `clamp()` so text doesn't shrink below readable on small phones.
- **Portrait first.** Design every screen for 393×852, then expand outward. Landscape support is opt-in per game (default off — confirm in survey).

## Input parity

| Input | Required | Notes |
|-------|----------|-------|
| Mouse | yes | Hover effects optional, click required |
| Keyboard | yes | Every action reachable; document hotkeys in-game |
| Touch tap | yes | Primary mobile input |
| Long-press | optional | If used, also expose as keyboard alt |
| Multi-touch / pinch | optional | Game-by-game |

## Dynamic Island + notch + safe area

- Use `env(safe-area-inset-top/right/bottom/left)` for any UI that pins to screen edges
- Test in DevTools' iPhone 14 Pro preset AND with the device's status bar visible

## Performance budget

- 60 fps on iPhone 14 Pro (Safari)
- 30 fps minimum on iPhone 12-class hardware
- < 2 MB initial JS bundle; lazy-load heavy assets
- < 500 ms time-to-interactive on a warm cache

## Testing

Per milestone, run the QA checklist in `quality-and-testing.md`. Mandatory:

- DevTools "iPhone 14 Pro" preset + Safari Mobile rendering
- Real device tap test if any new input mechanic was added
- Resize the browser window from 360 px → 1920 px continuously, watch for jank/breaks
