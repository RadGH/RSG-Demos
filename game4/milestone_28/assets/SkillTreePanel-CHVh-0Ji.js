const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SkillSystem-CzLFJ7on.js","./main-DCZ4KuqN.js","./main-D2c3OVlN.css"])))=>i.map(i=>d[i]);
import{U as L,b as m,D as k,_ as P}from"./main-DCZ4KuqN.js";let u=null;async function q(){if(u)return u;try{return u=(await P(()=>import("./SkillSystem-CzLFJ7on.js"),__vite__mapDeps([0,1,2]),import.meta.url)).default,u}catch(d){return k.warn(`[skill] SkillSystem not available: ${d.message}`),null}}const v="spellroads-skilltree-style";function C(){if(document.getElementById(v))return;const d=document.createElement("style");d.id=v,d.textContent=`
    /* ══════════════════════════════════════════════════════════════
       SkillTreePanel — Spellroads
       ══════════════════════════════════════════════════════════════ */

    #panel-skilltree {
      position: fixed;
      inset: 0;
      z-index: 210;
      display: none;
      background: rgba(8, 6, 4, 0.97);
      flex-direction: column;
      pointer-events: all;
      overflow: hidden;
      font-family: 'Georgia', 'Times New Roman', serif;
    }
    #panel-skilltree.visible { display: flex; }

    /* ── Header ──────────────────────────────────────────────────── */
    .sk-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: clamp(8px,1.5vh,14px) clamp(12px,2vw,24px);
      background: rgba(0,0,0,0.5);
      border-bottom: 1px solid rgba(200,160,32,0.25);
      flex-shrink: 0;
      gap: 12px;
    }
    .sk-title {
      font-size: clamp(0.9rem,1.8vw,1.2rem);
      font-weight: 700;
      color: #c8a020;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .sk-char-name {
      font-size: clamp(0.75rem,1.3vw,0.9rem);
      color: #e8d5b0;
      font-style: italic;
    }
    .sk-points-badge {
      background: rgba(200,160,32,0.12);
      border: 1px solid rgba(200,160,32,0.4);
      border-radius: 4px;
      padding: 4px 12px;
      font-size: clamp(0.7rem,1.2vw,0.85rem);
      color: #c8a020;
      font-weight: 700;
      white-space: nowrap;
    }
    .sk-points-badge.no-points { color: #706050; border-color: rgba(112,96,80,0.3); background: rgba(112,96,80,0.05); }
    .sk-close {
      background: none;
      border: 1px solid rgba(200,160,32,0.3);
      color: #a09070;
      cursor: pointer;
      width: 36px; height: 36px;
      min-width: 36px; min-height: 36px;
      border-radius: 4px;
      font-size: 1.1rem;
      display: flex; align-items: center; justify-content: center;
      transition: color 0.15s, border-color 0.15s;
    }
    .sk-close:hover { color: #c8a020; border-color: #c8a020; }

    /* ── Party Tabs ──────────────────────────────────────────────── */
    .sk-party-tabs {
      display: flex;
      gap: 4px;
      padding: 8px clamp(12px,2vw,24px) 0;
      background: rgba(0,0,0,0.3);
      flex-shrink: 0;
      overflow-x: auto;
    }
    .sk-party-tab {
      padding: 6px 14px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(200,160,32,0.15);
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      color: #a09070;
      font-size: clamp(0.65rem,1.1vw,0.78rem);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      min-height: 44px;
      min-width: 60px;
      display: flex; align-items: center; justify-content: center;
      gap: 6px;
      white-space: nowrap;
      transition: background 0.12s, color 0.12s;
    }
    .sk-party-tab:hover { background: rgba(200,160,32,0.1); color: #c8d0a0; }
    .sk-party-tab.active {
      background: rgba(8,6,4,0.9);
      border-color: rgba(200,160,32,0.35);
      color: #c8a020;
    }

    /* ── Body ─────────────────────────────────────────────────────── */
    .sk-body {
      flex: 1;
      display: grid;
      grid-template-columns: 20% 55% 25%;
      gap: 0;
      overflow: hidden;
      min-height: 0;
    }

    /* ── Shared section ──────────────────────────────────────────── */
    .sk-section {
      overflow-y: auto;
      border-right: 1px solid rgba(200,160,32,0.12);
    }
    .sk-section:last-child { border-right: none; }

    /* ── Left: Tree selector ─────────────────────────────────────── */
    .sk-tree-selector {
      padding: clamp(8px,1.2vw,14px);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .sk-tree-selector-heading {
      font-size: clamp(0.58rem,0.9vw,0.68rem);
      color: #c8a020;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(200,160,32,0.15);
    }
    .sk-tree-btn {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(200,160,32,0.12);
      border-radius: 4px;
      padding: 8px 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 3px;
      transition: background 0.12s, border-color 0.12s;
      text-align: left;
      min-height: 44px;
      color: #a09070;
    }
    .sk-tree-btn:hover { background: rgba(200,160,32,0.08); border-color: rgba(200,160,32,0.3); color: #c8d0a0; }
    .sk-tree-btn.active {
      background: rgba(200,160,32,0.1);
      border-color: rgba(200,160,32,0.45);
      color: #c8a020;
    }
    .sk-tree-btn-name {
      font-size: clamp(0.62rem,1vw,0.75rem);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .sk-tree-btn-meta {
      font-size: clamp(0.55rem,0.85vw,0.62rem);
      color: #706050;
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .sk-tree-btn.active .sk-tree-btn-meta { color: #a09070; }
    .sk-tree-btn-pts {
      background: rgba(200,160,32,0.12);
      border-radius: 2px;
      padding: 1px 5px;
      font-size: 0.58rem;
      color: #c8a020;
    }

    /* Feats tab */
    .sk-feats-section {
      padding: clamp(8px,1.2vw,14px);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .sk-feats-heading {
      font-size: clamp(0.58rem,0.9vw,0.68rem);
      color: #c8a020;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(200,160,32,0.15);
    }
    .sk-feat-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(200,160,32,0.15);
      border-radius: 4px;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .sk-feat-name {
      font-size: clamp(0.62rem,1vw,0.72rem);
      font-weight: 600;
      color: #c8d0a0;
    }
    .sk-feat-desc {
      font-size: clamp(0.55rem,0.85vw,0.62rem);
      color: #706050;
    }
    .sk-feat-next-slot {
      font-size: clamp(0.55rem,0.85vw,0.6rem);
      color: #a09070;
      font-style: italic;
      margin-top: 4px;
      padding-top: 4px;
      border-top: 1px solid rgba(200,160,32,0.1);
    }

    /* Left-panel mode toggle (Trees / Feats) */
    .sk-left-tabs {
      display: flex;
      gap: 0;
      border-bottom: 1px solid rgba(200,160,32,0.15);
      flex-shrink: 0;
    }
    .sk-left-tab {
      flex: 1;
      padding: 7px 4px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: clamp(0.58rem,0.9vw,0.68rem);
      color: #a09070;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      cursor: pointer;
      transition: color 0.12s, border-color 0.12s;
      min-height: 36px;
    }
    .sk-left-tab:hover { color: #c8d0a0; }
    .sk-left-tab.active { color: #c8a020; border-bottom-color: #c8a020; }

    /* ── Center: Tree view ───────────────────────────────────────── */
    .sk-tree-view {
      padding: clamp(10px,1.5vw,16px);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .sk-tree-header {
      flex-shrink: 0;
    }
    .sk-tree-name {
      font-size: clamp(0.85rem,1.5vw,1.1rem);
      font-weight: 700;
      color: #c8a020;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .sk-tree-desc {
      font-size: clamp(0.6rem,1vw,0.72rem);
      color: #a09070;
      font-style: italic;
      line-height: 1.4;
    }
    .sk-empty-msg {
      color: #706050;
      font-style: italic;
      font-size: clamp(0.7rem,1.1vw,0.85rem);
      text-align: center;
      padding: 40px 20px;
    }

    /* ── Tier block ──────────────────────────────────────────────── */
    .sk-tier-block {
      flex-shrink: 0;
    }
    .sk-tier-sep {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .sk-tier-label {
      font-size: clamp(0.58rem,0.9vw,0.67rem);
      color: #706050;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .sk-tier-req {
      font-size: clamp(0.52rem,0.8vw,0.6rem);
      color: #504030;
      font-style: italic;
      white-space: nowrap;
    }
    .sk-tier-line {
      flex: 1;
      height: 1px;
      background: rgba(200,160,32,0.1);
    }
    .sk-tier-skills {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    /* ── Skill card ──────────────────────────────────────────────── */
    .sk-skill-card {
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 5px;
      padding: 9px 10px;
      cursor: pointer;
      transition: border-color 0.14s, background 0.14s, box-shadow 0.14s;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-height: 90px;
      position: relative;
      user-select: none;
    }

    /* States */
    .sk-skill-card.state-locked {
      background: rgba(255,255,255,0.015);
      border-color: rgba(255,255,255,0.06);
      cursor: default;
      opacity: 0.6;
    }
    .sk-skill-card.state-available {
      background: rgba(200,160,32,0.05);
      border-color: rgba(200,160,32,0.4);
      box-shadow: 0 0 8px rgba(200,160,32,0.12);
      cursor: pointer;
    }
    .sk-skill-card.state-available:hover {
      background: rgba(200,160,32,0.1);
      border-color: rgba(200,160,32,0.7);
      box-shadow: 0 0 14px rgba(200,160,32,0.22);
    }
    .sk-skill-card.state-learned {
      background: rgba(42,56,32,0.5);
      border-color: rgba(64,160,96,0.35);
    }
    .sk-skill-card.state-learned:hover { border-color: rgba(64,160,96,0.6); background: rgba(42,56,32,0.7); }
    .sk-skill-card.state-maxed {
      background: rgba(58,40,0,0.5);
      border-color: rgba(160,120,32,0.4);
    }
    .sk-skill-card.state-maxed:hover { border-color: rgba(160,120,32,0.65); }

    /* Skill type border accents */
    .sk-skill-card.type-aura   { border-left: 3px solid rgba(40,120,200,0.6); }
    .sk-skill-card.type-party  { border-left: 3px solid rgba(140,60,200,0.6); }
    .sk-skill-card.type-shout  { border-left: 3px solid rgba(200,120,40,0.6); }
    .sk-skill-card.type-passive { /* only italic label */ }

    /* Selected (for detail pane) */
    .sk-skill-card.selected { outline: 2px solid rgba(200,160,32,0.6); outline-offset: 1px; }

    .sk-skill-card-top {
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex-wrap: wrap;
    }
    .sk-skill-name {
      font-size: clamp(0.65rem,1.05vw,0.78rem);
      font-weight: 700;
      color: #e8d5b0;
      flex: 1;
      line-height: 1.2;
    }
    .sk-skill-card.state-locked .sk-skill-name { color: #706050; }
    .sk-skill-card.type-passive .sk-skill-name { font-style: italic; }

    .sk-skill-badges {
      display: flex;
      gap: 3px;
      flex-wrap: wrap;
      align-items: center;
    }
    .sk-badge {
      font-size: 0.52rem;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      white-space: nowrap;
    }
    .sk-badge-tier   { background: rgba(200,160,32,0.15); color: #c8a020; border: 1px solid rgba(200,160,32,0.3); }
    .sk-badge-passive { background: rgba(255,255,255,0.05); color: #a09070; border: 1px solid rgba(255,255,255,0.1); }
    .sk-badge-aura   { background: rgba(40,120,200,0.15); color: #6ab4f0; border: 1px solid rgba(40,120,200,0.3); }
    .sk-badge-party  { background: rgba(140,60,200,0.15); color: #c08ae0; border: 1px solid rgba(140,60,200,0.3); }
    .sk-badge-shout  { background: rgba(200,120,40,0.15); color: #e0a060; border: 1px solid rgba(200,120,40,0.3); }
    .sk-badge-active { background: rgba(64,160,96,0.12); color: #70c090; border: 1px solid rgba(64,160,96,0.25); }

    .sk-skill-level {
      font-size: clamp(0.55rem,0.85vw,0.62rem);
      color: #706050;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .sk-skill-card.state-learned .sk-skill-level,
    .sk-skill-card.state-available .sk-skill-level { color: #a09070; }
    .sk-skill-card.state-maxed .sk-skill-level { color: #b09040; }

    .sk-skill-meta {
      display: flex;
      gap: 8px;
      font-size: clamp(0.52rem,0.8vw,0.58rem);
      color: #706050;
      flex-wrap: wrap;
    }
    .sk-skill-meta span { display: flex; align-items: center; gap: 2px; }

    .sk-skill-desc {
      font-size: clamp(0.55rem,0.85vw,0.62rem);
      color: #a09070;
      line-height: 1.4;
      margin-top: auto;
    }
    .sk-skill-card.state-locked .sk-skill-desc { color: #504030; }

    .sk-unlock-req {
      font-size: clamp(0.5rem,0.78vw,0.58rem);
      color: #c83020;
      font-style: italic;
      margin-top: 2px;
    }

    /* Confirm-spend overlay on card */
    .sk-confirm-overlay {
      position: absolute;
      inset: 0;
      background: rgba(200,160,32,0.14);
      border: 2px solid #c8a020;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: clamp(0.6rem,0.95vw,0.7rem);
      color: #c8a020;
      font-weight: 700;
      z-index: 2;
      cursor: pointer;
    }
    .sk-confirm-overlay .sk-confirm-sub {
      font-size: clamp(0.52rem,0.8vw,0.58rem);
      color: #a09070;
      font-weight: 400;
    }

    /* ── Right: Skill detail ─────────────────────────────────────── */
    .sk-detail-panel {
      padding: clamp(10px,1.5vw,16px);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .sk-detail-empty {
      color: #504030;
      font-style: italic;
      font-size: clamp(0.6rem,1vw,0.72rem);
      text-align: center;
      padding: 20px 0;
    }
    .sk-detail-name {
      font-size: clamp(0.8rem,1.4vw,1rem);
      font-weight: 700;
      color: #e8d5b0;
      line-height: 1.2;
      margin-bottom: 2px;
    }
    .sk-detail-type-row {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-bottom: 4px;
    }
    .sk-detail-desc {
      font-size: clamp(0.62rem,1vw,0.72rem);
      color: #a09070;
      line-height: 1.5;
      font-style: italic;
    }
    .sk-detail-divider {
      height: 1px;
      background: rgba(200,160,32,0.12);
      flex-shrink: 0;
    }
    .sk-detail-section-title {
      font-size: clamp(0.55rem,0.85vw,0.62rem);
      color: #c8a020;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
    }

    /* Level progression table */
    .sk-level-table {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .sk-level-row {
      display: flex;
      gap: 6px;
      align-items: baseline;
      font-size: clamp(0.55rem,0.85vw,0.62rem);
      padding: 3px 6px;
      border-radius: 3px;
    }
    .sk-level-row.current-level { background: rgba(200,160,32,0.08); }
    .sk-level-num {
      color: #c8a020;
      font-weight: 700;
      min-width: 20px;
      flex-shrink: 0;
    }
    .sk-level-stat { color: #c8d0a0; flex: 1; }

    /* AoE shape preview */
    .sk-aoe-grid {
      display: grid;
      grid-template-columns: repeat(5, 20px);
      grid-template-rows: repeat(5, 20px);
      gap: 2px;
      width: fit-content;
    }
    .sk-aoe-cell {
      width: 20px; height: 20px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 2px;
    }
    .sk-aoe-cell.center {
      background: rgba(200,160,32,0.3);
      border-color: rgba(200,160,32,0.5);
    }
    .sk-aoe-cell.hit {
      background: rgba(200,160,32,0.7);
      border-color: #c8a020;
    }

    /* Action buttons */
    .sk-detail-actions {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 4px;
    }
    .sk-action-btn {
      padding: 8px 10px;
      border-radius: 4px;
      font-size: clamp(0.62rem,1vw,0.72rem);
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      min-height: 44px;
      transition: background 0.13s, border-color 0.13s, color 0.13s;
      display: flex; align-items: center; justify-content: center;
      gap: 6px;
      letter-spacing: 0.04em;
    }
    .sk-action-btn.equip-party {
      background: rgba(140,60,200,0.12);
      border: 1px solid rgba(140,60,200,0.35);
      color: #c08ae0;
    }
    .sk-action-btn.equip-party:hover { background: rgba(140,60,200,0.22); border-color: rgba(140,60,200,0.6); }
    .sk-action-btn.equip-party.equipped {
      background: rgba(140,60,200,0.25);
      border-color: #c08ae0;
      color: #e0beff;
    }
    .sk-action-btn.set-aura {
      background: rgba(40,120,200,0.12);
      border: 1px solid rgba(40,120,200,0.35);
      color: #6ab4f0;
    }
    .sk-action-btn.set-aura:hover { background: rgba(40,120,200,0.22); border-color: rgba(40,120,200,0.6); }
    .sk-action-btn.set-aura.active-aura {
      background: rgba(40,120,200,0.25);
      border-color: #6ab4f0;
      color: #c0e4ff;
    }
    .sk-action-btn:disabled {
      opacity: 0.35;
      cursor: default;
      pointer-events: none;
    }

    /* ── Mobile layout ───────────────────────────────────────────── */

    /* Portrait mobile: tree selector becomes horizontal tabs at top,
       detail panel becomes a bottom drawer */
    @media (max-width: 767px) and (orientation: portrait) {
      .sk-body {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        position: relative;
      }
      /* Hide left sidebar — replaced by horizontal tree tabs below header */
      .sk-section.sk-left-col { display: none; }
      .sk-section.sk-center-col { border-right: none; }
      .sk-section.sk-right-col {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        height: 45vh;
        background: rgba(8,6,4,0.98);
        border-top: 1px solid rgba(200,160,32,0.3);
        border-right: none;
        transform: translateY(100%);
        transition: transform 0.22s ease;
        z-index: 5;
        overflow-y: auto;
      }
      .sk-section.sk-right-col.drawer-open {
        transform: translateY(0);
      }
      /* Horizontal tree strip */
      .sk-mobile-tree-strip {
        display: flex;
        overflow-x: auto;
        gap: 4px;
        padding: 6px clamp(10px,2vw,16px);
        background: rgba(0,0,0,0.4);
        border-bottom: 1px solid rgba(200,160,32,0.15);
        flex-shrink: 0;
      }
      .sk-mobile-tree-chip {
        padding: 5px 10px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(200,160,32,0.15);
        border-radius: 20px;
        color: #a09070;
        font-size: clamp(0.6rem,1.2vw,0.7rem);
        font-weight: 600;
        white-space: nowrap;
        cursor: pointer;
        min-height: 44px;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.12s, color 0.12s;
      }
      .sk-mobile-tree-chip:hover { background: rgba(200,160,32,0.1); color: #c8d0a0; }
      .sk-mobile-tree-chip.active { background: rgba(200,160,32,0.15); border-color: rgba(200,160,32,0.45); color: #c8a020; }
    }

    /* Landscape mobile: narrow left column */
    @media (max-width: 1023px) and (orientation: landscape) {
      .sk-body { grid-template-columns: 160px 1fr 200px; }
    }

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1199px) {
      .sk-body { grid-template-columns: 180px 1fr 220px; }
      .sk-mobile-tree-strip { display: none; }
    }

    /* Desktop */
    @media (min-width: 1200px) {
      .sk-mobile-tree-strip { display: none; }
    }
  `,document.head.appendChild(d)}function A(d){if(!d)return"";const e=(d.type||"").toLowerCase();return e==="passive"?"type-passive":e==="aura"?"type-aura":e.includes("party")?"type-party":e==="shout"?"type-shout":""}function x(d){if(!d)return"";const e=[],t=(d.type||"").toLowerCase();return t==="passive"?e.push('<span class="sk-badge sk-badge-passive">&#x1F6E1; Passive</span>'):t==="aura"?e.push('<span class="sk-badge sk-badge-aura">&#x25CE; Aura</span>'):t.includes("party")?e.push('<span class="sk-badge sk-badge-party">&#x2605; Party</span>'):t==="shout"?e.push('<span class="sk-badge sk-badge-shout">&#x1F4E3; Shout</span>'):e.push('<span class="sk-badge sk-badge-active">&#x2694; Active</span>'),e.join("")}function n(d){return String(d??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class z extends L{constructor(){C(),super("panel-skilltree",{trapFocus:!1,zLayer:"panel"}),this._char=null,this._partyChars=[],this._activeTreeId=null,this._selectedSkill=null,this._selectedTreeId=null,this._leftMode="trees",this._pendingSpend=new Map,this._drawerOpen=!1,this._skillSystem=null}_buildHTML(){return`
      <div class="sk-header">
        <span class="sk-title">Skill Trees</span>
        <span class="sk-char-name" id="sk-char-name"></span>
        <span class="sk-points-badge" id="sk-points-badge">0 Points</span>
        <div style="flex:1"></div>
        <button class="sk-close" id="sk-close-btn" tabindex="0" aria-label="Close skill trees">&times;</button>
      </div>
      <div class="sk-party-tabs" id="sk-party-tabs" role="tablist"></div>
      <div class="sk-mobile-tree-strip" id="sk-mobile-strip"></div>
      <div class="sk-body" id="sk-body">
        <div class="sk-section sk-left-col" id="sk-left-col">
          <div class="sk-left-tabs">
            <button class="sk-left-tab active" id="sk-tab-trees" data-mode="trees">Trees</button>
            <button class="sk-left-tab" id="sk-tab-feats" data-mode="feats">Feats</button>
          </div>
          <div id="sk-left-content"></div>
        </div>
        <div class="sk-section sk-center-col" id="sk-center-col">
          <div class="sk-tree-view" id="sk-tree-view">
            <div class="sk-empty-msg">Select a skill tree to begin.</div>
          </div>
        </div>
        <div class="sk-section sk-right-col" id="sk-right-col">
          <div class="sk-detail-panel" id="sk-detail-panel">
            <div class="sk-detail-empty">Select a skill to see details.</div>
          </div>
        </div>
      </div>
    `}async show(e=null){this._skillSystem||(this._skillSystem=await q()),this._partyChars=this._getPartyChars(),this._char=e?m.getById(e)??this._partyChars[0]??null:this._partyChars[0]??null,!this._char&&this._partyChars.length===0&&(k.warn("[skill] SkillTreePanel: no characters found, using stub"),this._char=this._createStubCharacter()),super.show(e),this._bindPanelEvents(),this._renderAll()}hide(){this._pendingSpend.clear(),this._drawerOpen=!1;const e=this.el.querySelector("#sk-right-col");e&&e.classList.remove("drawer-open"),super.hide()}updateContent(e){this._char&&this._renderAll()}_getPartyChars(){const e=window.__partyState;if(e?.characters?.length>0)return e.characters.map(s=>typeof s=="string"?m.getById(s):s).filter(Boolean);const t=m.getAll().filter(s=>s.isHero);return t.length>0?t:m.getAll().slice(0,4)}_createStubCharacter(){const e={id:"stub-hero",name:"Ulfric",level:5,skillPoints:3,selectedTrees:[],skills:{},feats:[],equippedPartySkill:null,activeAura:null,isHero:!0};return this._partyChars=[e],e}_bindPanelEvents(){const e=this.el.querySelector("#sk-close-btn");e&&!e._skBound&&(e.addEventListener("click",()=>this.hide()),e._skBound=!0);const t=this.el.querySelectorAll(".sk-left-tab");t.forEach(r=>{r._skBound||(r.addEventListener("click",()=>{this._leftMode=r.dataset.mode,t.forEach(i=>i.classList.toggle("active",i.dataset.mode===this._leftMode)),this._renderLeftPanel()}),r._skBound=!0)});const s=this.el.querySelector("#sk-right-col");s&&!s._skBound&&(s.addEventListener("click",r=>{r.target===s&&this._closeDrawer()}),s._skBound=!0)}_renderAll(){this._renderHeader(),this._renderPartyTabs(),this._renderMobileStrip(),this._renderLeftPanel(),this._renderTreeView(),this._renderDetailPanel()}_renderHeader(){const e=this.el.querySelector("#sk-char-name"),t=this.el.querySelector("#sk-points-badge");if(!this._char)return;e&&(e.textContent=this._char.name??"");const s=this._char.skillPoints??0;t&&(t.textContent=`${s} Skill Point${s!==1?"s":""}`,t.classList.toggle("no-points",s===0))}_renderPartyTabs(){const e=this.el.querySelector("#sk-party-tabs");e&&(e.innerHTML=this._partyChars.map(t=>`
      <button
        class="sk-party-tab${t.id===this._char?.id?" active":""}"
        data-charid="${n(t.id)}"
        tabindex="0"
        role="tab"
        aria-selected="${t.id===this._char?.id}"
      >${n(t.name??t.id)}</button>
    `).join(""),e.querySelectorAll(".sk-party-tab").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.charid,r=this._partyChars.find(i=>i.id===s);r&&r.id!==this._char?.id&&(this._char=r,this._activeTreeId=null,this._selectedSkill=null,this._pendingSpend.clear(),this._renderAll())})}))}_renderMobileStrip(){const e=this.el.querySelector("#sk-mobile-strip");if(!e)return;const t=this._getCharacterTrees();e.innerHTML=t.map(s=>`
      <button
        class="sk-mobile-tree-chip${s.id===this._activeTreeId?" active":""}"
        data-treeid="${n(s.id)}"
      >${n(s.name)}</button>
    `).join(""),e.querySelectorAll(".sk-mobile-tree-chip").forEach(s=>{s.addEventListener("click",()=>{this._activeTreeId=s.dataset.treeid,this._selectedSkill=null,this._pendingSpend.clear(),this._renderMobileStrip(),this._renderLeftPanel(),this._renderTreeView(),this._renderDetailPanel()})})}_renderLeftPanel(){const e=this.el.querySelector("#sk-left-content");e&&(this._leftMode==="trees"?this._renderTreeSelector(e):this._renderFeats(e))}_renderTreeSelector(e){const t=this._getCharacterTrees();if(t.length===0){e.innerHTML='<div style="padding:12px;font-size:0.65rem;color:#504030;font-style:italic;">No skill trees selected. Complete character creation to choose trees.</div>';return}e.innerHTML=`<div class="sk-tree-selector">
      <div class="sk-tree-selector-heading">Your Trees</div>
      ${t.map(s=>{const r=this._getTreePointsSpent(s.id);return`
          <button
            class="sk-tree-btn${s.id===this._activeTreeId?" active":""}"
            data-treeid="${n(s.id)}"
            tabindex="0"
          >
            <span class="sk-tree-btn-name">${n(s.name)}</span>
            <span class="sk-tree-btn-meta">
              <span class="sk-tree-btn-pts">${r} pts</span>
              <span>${n(s.category??"")}</span>
            </span>
          </button>
        `}).join("")}
    </div>`,e.querySelectorAll(".sk-tree-btn").forEach(s=>{s.addEventListener("click",()=>{this._activeTreeId=s.dataset.treeid,this._selectedSkill=null,this._pendingSpend.clear(),this._renderLeftPanel(),this._renderMobileStrip(),this._renderTreeView(),this._renderDetailPanel()})})}_renderFeats(e){const t=this._char?.feats??[],s=this._getNextFeatSlotLevel();if(t.length===0){e.innerHTML=`<div class="sk-feats-section">
        <div class="sk-feats-heading">Feats</div>
        <div style="font-size:0.62rem;color:#504030;font-style:italic;padding:8px 0;">No feats earned yet.</div>
        <div class="sk-feat-next-slot">Next feat slot at level ${s}.</div>
      </div>`;return}e.innerHTML=`<div class="sk-feats-section">
      <div class="sk-feats-heading">Feats</div>
      ${t.map(r=>`
        <div class="sk-feat-card">
          <div class="sk-feat-name">${n(r.name??r.id)}</div>
          <div class="sk-feat-desc">${n(r.description??"")}</div>
        </div>
      `).join("")}
      <div class="sk-feat-next-slot">Next feat slot at level ${s}.</div>
    </div>`}_renderTreeView(){const e=this.el.querySelector("#sk-tree-view");if(!e)return;if(!this._activeTreeId){e.innerHTML='<div class="sk-empty-msg">Select a skill tree to begin.</div>';return}const t=this._getTreeData(this._activeTreeId);if(!t){e.innerHTML=`<div class="sk-empty-msg">Tree data unavailable for "${n(this._activeTreeId)}".</div>`;return}const s={},r=t.skills??[];for(const a of r){const o=a.tier??1;s[o]||(s[o]=[]),s[o].push(a)}const i={1:0,2:5,3:10,4:15,5:20};let l=`
      <div class="sk-tree-header">
        <div class="sk-tree-name">${n(t.name)}</div>
        <div class="sk-tree-desc">${n(t.description??"")}</div>
      </div>
    `;for(let a=1;a<=5;a++){const o=s[a]??[];if(o.length===0)continue;const c=i[a]??0;l+=`
        <div class="sk-tier-block" data-tier="${a}">
          <div class="sk-tier-sep">
            <span class="sk-tier-label">Tier ${a}</span>
            ${c>0?`<span class="sk-tier-req">Requires ${c} pts in prior tiers</span>`:""}
            <div class="sk-tier-line"></div>
          </div>
          <div class="sk-tier-skills">
            ${o.map(p=>this._buildSkillCard(t,p)).join("")}
          </div>
        </div>
      `}if(e.innerHTML=l,e.querySelectorAll(".sk-skill-card").forEach(a=>{const o=a.dataset.skillid,c=a.dataset.treeid,p=a.dataset.state;a.addEventListener("click",h=>{if(h.target.closest(".sk-confirm-overlay")){this._executeSpend(c,o,a);return}this._selectSkill(c,o),p==="available"&&this._armConfirm(o,a),this._openDrawer()})}),this._selectedSkill){const a=e.querySelector(`[data-skillid="${CSS.escape(this._selectedSkill.id)}"]`);a&&a.classList.add("selected")}}_buildSkillCard(e,t){const s=this._char,r=s?.skills?.[e.id]?.[t.id]??0,i=t.maxLevel??t.max_level??5,l=this._pendingSpend.has(t.id);let a="locked",o="";const c=this._skillSystem;if(c)try{const{canLearn:f,reason:T}=c.canLearnSkill(s,e.id,t.id);r>=i?a="maxed":r>0?a=f?"available":"learned":f?a="available":(a="locked",o=T??"")}catch{r>=i?a="maxed":r>0?a="learned":a="locked"}else r>=i?a="maxed":r>0&&(a="learned");const p=A(t),h=`<span class="sk-badge sk-badge-tier">T${t.tier??1}</span>`,b=x(t),y=t.manaCost?`<span>&#x1F52E; ${t.manaCost}</span>`:"",_=t.cooldown?`<span>&#x23F1; ${t.cooldown}s</span>`:"";let g=t.shortDescription??t.description??"";g.length>80&&(g=g.slice(0,77)+"...");const w=`${r}/${i}`,S=l?`
      <div class="sk-confirm-overlay" data-skillid="${n(t.id)}">
        <span>Confirm?</span>
        <span class="sk-confirm-sub">Click again to spend 1 point</span>
      </div>
    `:"",$=a==="locked"&&o?`<div class="sk-unlock-req">&#x1F512; ${n(o)}</div>`:"";return`
      <div
        class="sk-skill-card state-${a} ${p}"
        data-skillid="${n(t.id)}"
        data-treeid="${n(e.id)}"
        data-state="${a}"
        tabindex="${a==="locked"?"-1":"0"}"
        role="button"
        aria-label="${n(t.name)} — ${a}"
      >
        ${S}
        <div class="sk-skill-card-top">
          <span class="sk-skill-name">${n(t.name)}</span>
          <span class="sk-skill-level">${w}</span>
        </div>
        <div class="sk-skill-badges">
          ${h}${b}
        </div>
        <div class="sk-skill-meta">${y}${_}</div>
        <div class="sk-skill-desc">${n(g)}</div>
        ${$}
      </div>
    `}_armConfirm(e,t){if(this._pendingSpend.forEach((r,i)=>{if(i!==e){this._pendingSpend.delete(i);const l=this.el.querySelector(`[data-skillid="${CSS.escape(i)}"] .sk-confirm-overlay`);l&&l.remove()}}),this._pendingSpend.has(e))return;if(this._pendingSpend.set(e,!0),!t.querySelector(".sk-confirm-overlay")){const r=document.createElement("div");r.className="sk-confirm-overlay",r.dataset.skillid=e,r.innerHTML='<span>Confirm?</span><span class="sk-confirm-sub">Click again to spend 1 point</span>',t.appendChild(r),setTimeout(()=>{this._pendingSpend.has(e)&&(this._pendingSpend.delete(e),r.remove())},5e3)}}async _executeSpend(e,t,s){this._pendingSpend.delete(t);const r=s.querySelector(".sk-confirm-overlay");r&&r.remove();const i=this._skillSystem;if(!i){k.warn("[skill] SkillSystem not available — cannot spend point");return}let l;try{l=i.spendPoint(this._char,e,t)}catch(a){k.error(`[skill] spendPoint threw: ${a.message}`);return}l?.success?(k.event(`[skill] Point spent; char=${this._char.name} tree=${e} skill=${t}`),this._renderAll()):k.warn(`[skill] spendPoint failed: ${l?.message??"unknown"}`)}_selectSkill(e,t){const s=this._getTreeData(e);if(!s)return;const r=(s.skills??[]).find(i=>i.id===t);r&&(this._selectedTreeId=e,this._selectedSkill=r,this.el.querySelectorAll(".sk-skill-card").forEach(i=>{i.classList.toggle("selected",i.dataset.skillid===t)}),this._renderDetailPanel())}_renderDetailPanel(){const e=this.el.querySelector("#sk-detail-panel");if(!e)return;const t=this._selectedSkill;if(!t){e.innerHTML='<div class="sk-detail-empty">Select a skill to see details.</div>';return}const s=this._selectedTreeId,i=this._char?.skills?.[s]?.[t.id]??0,l=t.maxLevel??t.max_level??5,a=x(t),o=this._buildLevelTable(t,i,l),c=this._buildAoEPreview(t),p=this._buildDetailActions(t,s,i);e.innerHTML=`
      <div>
        <div class="sk-detail-name">${n(t.name)}</div>
        <div class="sk-detail-type-row">${a}<span class="sk-badge sk-badge-tier">T${t.tier??1}</span></div>
        <div class="sk-detail-desc">${n(t.description??t.shortDescription??"")}</div>
      </div>
      <div class="sk-detail-divider"></div>
      <div>
        <div class="sk-detail-section-title">Level Progression</div>
        ${o}
      </div>
      ${c?`
        <div class="sk-detail-divider"></div>
        <div>
          <div class="sk-detail-section-title">Area of Effect</div>
          ${c}
        </div>
      `:""}
      ${p?`
        <div class="sk-detail-divider"></div>
        <div class="sk-detail-actions">${p}</div>
      `:""}
    `;const h=e.querySelector(".sk-action-btn.equip-party");h&&h.addEventListener("click",()=>this._handleEquipParty(t,s));const b=e.querySelector(".sk-action-btn.set-aura");b&&b.addEventListener("click",()=>this._handleSetAura(t,s))}_buildLevelTable(e,t,s){const r=this._skillSystem,i=[];for(let l=1;l<=s;l++){let a="";if(r)try{a=r.getSkillDamageDescription(e,l)??""}catch{a=e.levels?.[l-1]?.description??`Level ${l}`}else a=e.levels?.[l-1]?.description??`Level ${l}`;const o=l===t;i.push(`
        <div class="sk-level-row${o?" current-level":""}">
          <span class="sk-level-num">${l}</span>
          <span class="sk-level-stat">${n(a)}</span>
        </div>
      `)}return`<div class="sk-level-table">${i.join("")}</div>`}_buildAoEPreview(e){const t=this._skillSystem;let s=[];if(t)try{s=t.getAoEShape(e)??[]}catch{s=e.aoeShape??[]}else s=e.aoeShape??[];if(s.length===0&&!e.aoeShape?.length&&(e.type??"").toLowerCase()!=="aoe")return"";const r=new Set(s.map(l=>`${l.dx},${l.dy}`));let i="";for(let l=-2;l<=2;l++)for(let a=-2;a<=2;a++){const o=l===0&&a===0,c=r.has(`${a},${l}`);let p="sk-aoe-cell";o?p+=" center":c&&(p+=" hit"),i+=`<div class="${p}" title="${o?"Target":c?"Affected":""}"></div>`}return`<div class="sk-aoe-grid">${i}</div>`}_buildDetailActions(e,t,s){if(s===0)return"";const r=this._char,i=(e.type??"").toLowerCase(),l=[];if(i.includes("party")){const a=this._skillSystem;let o=!1;if(a)try{const c=a.getEquippedPartySkill(r);o=c?.skillId===e.id&&c?.treeId===t}catch{o=r?.equippedPartySkill?.skillId===e.id}else o=r?.equippedPartySkill?.skillId===e.id;l.push(`
        <button class="sk-action-btn equip-party${o?" equipped":""}" tabindex="0">
          ${o?"&#x2605; Equipped as Party Skill":"&#x2605; Equip as Party Skill"}
        </button>
      `)}if(i==="aura"){const a=r?.activeAura?.skillId===e.id&&r?.activeAura?.treeId===t;l.push(`
        <button class="sk-action-btn set-aura${a?" active-aura":""}" tabindex="0">
          ${a?"&#x25CE; Aura Active":"&#x25CE; Set as Active Aura"}
        </button>
      `)}return l.join("")}async _handleEquipParty(e,t){const s=this._skillSystem;if(s){try{s.equipPartySkill(this._char,t,e.id),k.event(`[skill] Party skill equipped; char=${this._char.name} skill=${e.id}`)}catch(r){k.warn(`[skill] equipPartySkill error: ${r.message}`)}this._renderDetailPanel()}}_handleSetAura(e,t){if(!this._char)return;this._char.activeAura?.skillId===e.id&&this._char.activeAura?.treeId===t?(this._char.activeAura=null,k.event(`[skill] Aura deactivated; char=${this._char.name} skill=${e.id}`)):(this._char.activeAura={treeId:t,skillId:e.id},k.event(`[skill] Aura set; char=${this._char.name} skill=${e.id}`)),this._renderDetailPanel()}_openDrawer(){const e=this.el.querySelector("#sk-right-col");e&&window.innerWidth<=767&&(e.classList.add("drawer-open"),this._drawerOpen=!0)}_closeDrawer(){const e=this.el.querySelector("#sk-right-col");e&&e.classList.remove("drawer-open"),this._drawerOpen=!1}_getCharacterTrees(){const e=this._char;if(!e)return[];const t=[...e.skillTrees??[]],s=e.unlockedTrees??[];for(const r of s)t.includes(r)||t.push(r);return t.length>0&&!this._activeTreeId&&(this._activeTreeId=t[0]),t.map(r=>this._getTreeData(r)).filter(Boolean)}_getTreeData(e){const t=this._skillSystem;if(t)try{return t.getTreeById(e)}catch{}return window.__skillTrees?window.__skillTrees.find(s=>s.id===e)??null:null}_getTreePointsSpent(e){const t=this._char;if(!t)return 0;const s=this._skillSystem;if(s)try{let i=0;for(let l=1;l<=5;l++)i+=s.getTierPointsSpent(t,e,l)??0;return i}catch{}const r=t.skills?.[e];return r?Object.values(r).reduce((i,l)=>i+(l??0),0):0}_getNextFeatSlotLevel(){const e=[5,10,15,20,25,30];this._char?.level;const t=this._char?.feats?.length??0;return e[t]??`${(t+1)*5}`}}export{z as default};
//# sourceMappingURL=SkillTreePanel-CHVh-0Ji.js.map
