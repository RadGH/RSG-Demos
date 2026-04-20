# No Silent Shelving

The delivery contract for every multi-item user request.

## The rule

1. **Every item must be implemented in the same response cycle.** Scope is the user's call, not yours. Don't decide "this is too much" on the user's behalf.
2. **If you cannot implement an item, name it BEFORE starting work** and wait for confirmation. If the user doesn't confirm a deferral, implement it.
3. **Never silently shelve an item into a "deferred" note** in the changelog. If it's not done, say so explicitly in the response text — visibly, not buried.
4. **No milestone is "shipped" until every item is implemented or explicitly deferred with confirmation.** Do not run `release.sh` before this.
5. **At the end of a multi-item request, audit your own work** against the original list. For each item: ✅ done with `file:line`, or ⚠️ deferred with reason. Re-read the user's prior messages if the request spanned sessions.

## Why this exists

In game13's M46–M53 batch, multiple requested items (Attack/Spell damage in Character Stats, Hire Custom per-level pricing, black market vendor, full 8+8 character editor budget, passive skill trees, parallax backgrounds, branching dialog, travel animations, etc.) were silently shelved into "deferred" changelog notes instead of being implemented or flagged. This lost user trust and cost a cycle. The rule exists so it never happens again.

## Where it lives

- This doc (canonical rule + rationale)
- `CLAUDE.md` (top-of-file summary)
- `wishlist.html` (every dropped item must have a visible reason)
- `/home/radgh/claude/CLAUDE.md` (workspace-wide rule)

## Edge cases

- **User says "do whichever":** still implement everything; "whichever" usually means "ordering doesn't matter," not "skip some."
- **Hard external blocker (API down, missing asset):** flag immediately, don't silently fall back to a placeholder unless user OKs it.
- **Item depends on architectural change >2× the rest of the batch:** flag BEFORE starting; offer to break out into its own milestone.
