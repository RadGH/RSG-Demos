# Wishlist Discipline

`/wishlist.html` is the living truth for everything the user has asked for. It's the resume-after-crash anchor for any session.

## Who maintains it

**Claude.** The user can read it; the user does not edit it. Every session, before declaring work complete, Claude updates the wishlist.

## When to update

- **Start of a session:** read it. Cross-reference against the user's prompt. Anything the user asks for that's not in the wishlist → add it as `todo` immediately.
- **When work begins on an item:** flip `todo` → `wip`.
- **When work lands:** flip `wip` → `done` with the milestone tag (e.g. `done — m12`). Add a one-line note describing what shipped + the file path.
- **When deciding NOT to do something:** flip to `dropped` (strikethrough) with the **reason** inline. NO SILENT SHELVING.
- **End of milestone:** audit the section for the milestone — every item checked one way or another.

## Item shape

Each item has:

- A **label** (one-line summary)
- A **status tag** (`status-todo`, `status-wip`, `status-done`, `status-drop`)
- An optional **desc** (where it lives in code, what's pending, the reason if dropped)

When done, include the milestone tag: `done — m14`.

When dropped, the desc must answer: *why* is this not happening, and what would unblock it?

## Sections

Use roughly these sections. Add or rename as the game grows:

- **Core Game (M1–MN)** — the milestone plan, broken into bullet items
- **Polish &amp; Aesthetics** — animations, lightbox, hover, charts (see `ui-aesthetics.md`)
- **Bugs** — known defects, fixed when they flip to done
- **Technical Debt Registry** — deliberately shelved items with the tradeoff named
- **Shelved / Revisit** — items deferred because the foundation isn't ready yet

## What goes in the Technical Debt Registry

Anything you accepted but flagged as a future cost:

- A library added > 25 KB gzipped (per the new-tool rule)
- A workaround that bypasses the proper architecture
- A duplicated code path you didn't refactor

Each entry names: what was added, the size/cost, the reason, the path back.

## Anti-patterns

- Marking an item done without a milestone tag — undated done items rot
- Marking an item done that wasn't actually shipped — re-read the diff
- Adding items in bulk after the fact — add them as the user asks
- Hiding a dropped item by deleting it — flip to dropped with reason instead

## Resume-after-crash

If a session ends abruptly, the next session can:

1. Read `/wishlist.html` for the in-flight `wip` items
2. Read `memory/prompt_history.md` for the user's last few asks
3. Read the latest commit on `main` for what was last shipped

The wishlist is the most reliable of the three because Claude maintains it intentionally.
