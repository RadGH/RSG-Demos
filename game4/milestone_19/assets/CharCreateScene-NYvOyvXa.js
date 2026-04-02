import{D as _,S as L,U as N,b as h}from"./main-CnIArb1R.js";const k="spellroads-charcreate-style";function B(){if(document.getElementById(k))return;const f=document.createElement("style");f.id=k,f.textContent=`
    /* ── CharCreate Panel ─────────────────────────────────────────── */
    #panel-char-create {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: none;
      align-items: stretch;
      background: rgba(8, 6, 4, 0.96);
      pointer-events: none;
      flex-direction: column;
    }
    #panel-char-create.visible {
      display: flex;
    }

    .cc-root {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      pointer-events: auto;
      font-family: "Segoe UI", system-ui, sans-serif;
      color: #d4c090;
      overflow: hidden;
    }

    /* ── Step indicator ─────────────────────────────────────────────── */
    .cc-steps {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(6px, 1.5vw, 14px);
      padding: clamp(10px, 2vh, 18px) 16px;
      background: rgba(0,0,0,0.4);
      border-bottom: 1px solid rgba(200, 160, 32, 0.2);
      flex-shrink: 0;
    }
    .cc-step-dot {
      width: clamp(26px, 4vw, 36px);
      height: clamp(26px, 4vw, 36px);
      border-radius: 50%;
      border: 2px solid rgba(200, 160, 32, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(0.6rem, 1.2vw, 0.78rem);
      font-weight: 600;
      color: #6a5a3a;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .cc-step-dot.active {
      border-color: #c8a020;
      color: #c8a020;
      background: rgba(200, 160, 32, 0.12);
      box-shadow: 0 0 10px rgba(200, 160, 32, 0.3);
    }
    .cc-step-dot.done {
      border-color: rgba(200, 160, 32, 0.5);
      color: #8a7030;
      background: rgba(200, 160, 32, 0.06);
    }
    .cc-step-label {
      font-size: clamp(0.55rem, 1vw, 0.7rem);
      color: #6a5a3a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      white-space: nowrap;
    }
    .cc-step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .cc-step-item.active .cc-step-label { color: #c8a020; }

    /* ── Content area ──────────────────────────────────────────────── */
    .cc-content {
      flex: 1;
      display: flex;
      overflow: hidden;
      min-height: 0;
    }
    .cc-main {
      flex: 1;
      overflow-y: auto;
      padding: clamp(16px, 3vh, 28px) clamp(16px, 3vw, 32px);
      min-height: 0;
    }
    .cc-side {
      width: clamp(200px, 28vw, 320px);
      background: rgba(0,0,0,0.3);
      border-left: 1px solid rgba(200,160,32,0.15);
      padding: clamp(12px, 2vh, 20px);
      overflow-y: auto;
      flex-shrink: 0;
    }
    @media (max-width: 767px) {
      .cc-content { flex-direction: column; }
      .cc-side {
        width: 100%;
        border-left: none;
        border-top: 1px solid rgba(200,160,32,0.15);
        max-height: 35vh;
      }
    }

    /* ── Step title ────────────────────────────────────────────────── */
    .cc-step-title {
      font-size: clamp(1rem, 2.5vw, 1.5rem);
      font-weight: 700;
      color: #c8a020;
      margin: 0 0 clamp(8px, 1.5vh, 16px) 0;
      letter-spacing: 0.08em;
    }
    .cc-step-desc {
      font-size: clamp(0.75rem, 1.4vw, 0.9rem);
      color: #8a7a50;
      margin: 0 0 clamp(12px, 2.5vh, 24px) 0;
    }

    /* ── Race grid ─────────────────────────────────────────────────── */
    .cc-race-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(120px, 18vw, 160px), 1fr));
      gap: clamp(8px, 1.5vw, 14px);
    }
    .cc-race-card {
      border: 1px solid rgba(200,160,32,0.2);
      border-radius: 4px;
      padding: clamp(8px, 1.5vw, 14px);
      cursor: pointer;
      transition: all 0.15s;
      background: rgba(200,160,32,0.04);
      min-height: 44px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      outline: none;
    }
    .cc-race-card:focus,
    .cc-race-card:hover {
      border-color: rgba(200,160,32,0.6);
      background: rgba(200,160,32,0.1);
      box-shadow: 0 0 10px rgba(200,160,32,0.2);
    }
    .cc-race-card.selected {
      border-color: #c8a020;
      background: rgba(200,160,32,0.15);
      box-shadow: 0 0 14px rgba(200,160,32,0.35);
    }
    .cc-race-card.locked {
      opacity: 0.45;
      cursor: default;
    }
    .cc-race-name {
      font-size: clamp(0.78rem, 1.4vw, 0.92rem);
      font-weight: 600;
      color: #d4b870;
    }
    .cc-race-rarity {
      font-size: clamp(0.58rem, 1vw, 0.7rem);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .cc-race-rarity.common    { color: #7a8a5a; }
    .cc-race-rarity.uncommon  { color: #5a9a7a; }
    .cc-race-rarity.rare      { color: #6a5aaa; }
    .cc-race-rarity.legendary { color: #aa8a2a; }
    .cc-race-bonuses {
      font-size: clamp(0.6rem, 1vw, 0.72rem);
      color: #6a7a5a;
    }
    .cc-lock-icon { font-size: 0.8rem; color: #5a4a2a; }

    /* ── Side panel preview ────────────────────────────────────────── */
    .cc-preview-title {
      font-size: clamp(0.82rem, 1.5vw, 0.98rem);
      font-weight: 700;
      color: #c8a020;
      margin: 0 0 8px 0;
    }
    .cc-preview-section {
      font-size: clamp(0.68rem, 1.2vw, 0.8rem);
      color: #8a7a50;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .cc-preview-trait {
      margin-bottom: 8px;
    }
    .cc-preview-trait-name {
      font-size: clamp(0.7rem, 1.2vw, 0.82rem);
      color: #b0983a;
      font-weight: 600;
    }
    .cc-preview-trait-desc {
      font-size: clamp(0.62rem, 1.1vw, 0.74rem);
      color: #7a6a40;
    }
    .cc-attr-row {
      display: flex;
      justify-content: space-between;
      font-size: clamp(0.65rem, 1.1vw, 0.78rem);
      margin-bottom: 3px;
    }
    .cc-attr-label { color: #8a7a50; }
    .cc-attr-val   { color: #c8a020; font-weight: 600; }
    .cc-attr-val.bonus  { color: #6ab06a; }
    .cc-attr-val.malus  { color: #b06a6a; }

    /* ── Attribute step ────────────────────────────────────────────── */
    .cc-attrs-table {
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      gap: 8px clamp(10px, 2vw, 20px);
      align-items: center;
      margin-bottom: 20px;
    }
    .cc-attr-head { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; color: #6a5a3a; font-weight: 600; }
    .cc-attr-name { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #d4c090; }
    .cc-attr-base { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #8a7a50; text-align: center; }
    .cc-attr-bonus-cell { font-size: clamp(0.78rem, 1.3vw, 0.9rem); text-align: center; }
    .cc-attr-total-cell { font-size: clamp(0.82rem, 1.4vw, 0.95rem); font-weight: 700; color: #c8a020; text-align: center; }

    .cc-free-point-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(200,160,32,0.07);
      border: 1px solid rgba(200,160,32,0.25);
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .cc-free-point-label { font-size: clamp(0.75rem, 1.3vw, 0.88rem); color: #d4b870; }
    .cc-free-point-select {
      background: rgba(10,8,4,0.8);
      border: 1px solid rgba(200,160,32,0.4);
      color: #c8a020;
      padding: 6px 10px;
      border-radius: 3px;
      font-size: clamp(0.75rem, 1.3vw, 0.88rem);
      min-height: 44px;
    }

    /* ── Appearance step ───────────────────────────────────────────── */
    .cc-appearance-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
      margin-bottom: 20px;
    }
    .cc-body-card {
      border: 1px solid rgba(200,160,32,0.2);
      border-radius: 4px;
      padding: 12px 8px;
      cursor: pointer;
      text-align: center;
      min-height: 60px;
      font-size: clamp(0.7rem, 1.2vw, 0.82rem);
      color: #8a7a50;
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      outline: none;
    }
    .cc-body-card:focus,
    .cc-body-card:hover { border-color: rgba(200,160,32,0.5); color: #c8a020; }
    .cc-body-card.selected { border-color: #c8a020; background: rgba(200,160,32,0.12); color: #e8c040; }
    .cc-body-icon { font-size: 1.6rem; margin-bottom: 4px; display: block; }

    .cc-name-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .cc-name-label { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #8a7a50; white-space: nowrap; }
    .cc-name-input {
      flex: 1;
      background: rgba(10,8,4,0.8);
      border: 1px solid rgba(200,160,32,0.3);
      color: #d4c090;
      padding: 8px 12px;
      border-radius: 3px;
      font-size: clamp(0.82rem, 1.4vw, 0.95rem);
      min-height: 44px;
      outline: none;
    }
    .cc-name-input:focus { border-color: #c8a020; }

    .cc-color-row {
      display: flex;
      align-items: center;
      gap: clamp(8px, 1.5vw, 16px);
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .cc-color-label { font-size: clamp(0.72rem, 1.2vw, 0.84rem); color: #8a7a50; width: 100px; }
    .cc-swatch-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .cc-swatch {
      width: clamp(28px, 4vw, 36px);
      height: clamp(28px, 4vw, 36px);
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.15s;
      outline: none;
    }
    .cc-swatch:focus, .cc-swatch:hover { transform: scale(1.15); }
    .cc-swatch.selected { border-color: #c8a020; box-shadow: 0 0 6px rgba(200,160,32,0.5); }

    /* ── Background step ───────────────────────────────────────────── */
    .cc-bg-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(130px, 18vw, 175px), 1fr));
      gap: clamp(8px, 1.5vw, 12px);
      margin-bottom: 20px;
    }
    .cc-bg-card {
      border: 1px solid rgba(200,160,32,0.2);
      border-radius: 4px;
      padding: clamp(8px, 1.5vw, 12px);
      cursor: pointer;
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      min-height: 44px;
      outline: none;
    }
    .cc-bg-card:focus, .cc-bg-card:hover { border-color: rgba(200,160,32,0.55); background: rgba(200,160,32,0.08); }
    .cc-bg-card.selected { border-color: #c8a020; background: rgba(200,160,32,0.14); }
    .cc-bg-name { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #d4b870; font-weight: 600; margin-bottom: 3px; }
    .cc-bg-bonus { font-size: clamp(0.62rem, 1vw, 0.74rem); color: #6a7a5a; }

    /* ── Skill trees step ──────────────────────────────────────────── */
    .cc-class-preview {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: rgba(200,160,32,0.08);
      border: 1px solid rgba(200,160,32,0.3);
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .cc-class-label { font-size: clamp(0.72rem, 1.2vw, 0.84rem); color: #8a7a50; }
    .cc-class-name  { font-size: clamp(0.9rem, 1.8vw, 1.1rem); color: #e8c040; font-weight: 700; }
    .cc-tree-count  { font-size: clamp(0.68rem, 1.1vw, 0.8rem); color: #6a5a3a; margin-left: auto; }

    .cc-tree-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(130px, 17vw, 165px), 1fr));
      gap: clamp(6px, 1.2vw, 10px);
    }
    .cc-tree-card {
      border: 1px solid rgba(200,160,32,0.18);
      border-radius: 4px;
      padding: clamp(7px, 1.3vw, 11px);
      cursor: pointer;
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      min-height: 44px;
      outline: none;
    }
    .cc-tree-card:focus, .cc-tree-card:hover { border-color: rgba(200,160,32,0.5); background: rgba(200,160,32,0.08); }
    .cc-tree-card.selected { border-color: #c8a020; background: rgba(200,160,32,0.14); }
    .cc-tree-card.disabled { opacity: 0.35; cursor: default; }
    .cc-tree-name { font-size: clamp(0.75rem, 1.3vw, 0.88rem); color: #d4b870; font-weight: 600; margin-bottom: 2px; }
    .cc-tree-tier { font-size: clamp(0.58rem, 1vw, 0.7rem); text-transform: uppercase; letter-spacing: 0.05em; }
    .cc-tree-tier.standard  { color: #7a8a5a; }
    .cc-tree-tier.advanced  { color: #5a8a9a; }
    .cc-tree-tier.rare      { color: #6a5aaa; }
    .cc-tree-tier.legendary { color: #aa8a2a; }
    .cc-tree-desc { font-size: clamp(0.6rem, 0.98vw, 0.7rem); color: #5a5040; margin-top: 3px; }

    /* ── Feat step ─────────────────────────────────────────────────── */
    .cc-feat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(160px, 22vw, 220px), 1fr));
      gap: clamp(10px, 1.8vw, 16px);
    }
    .cc-feat-card {
      border: 1px solid rgba(200,160,32,0.18);
      border-radius: 4px;
      padding: clamp(10px, 1.8vw, 16px);
      cursor: pointer;
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      min-height: 44px;
      outline: none;
    }
    .cc-feat-card:focus, .cc-feat-card:hover { border-color: rgba(200,160,32,0.55); background: rgba(200,160,32,0.09); }
    .cc-feat-card.selected { border-color: #c8a020; background: rgba(200,160,32,0.15); }
    .cc-feat-name { font-size: clamp(0.8rem, 1.4vw, 0.94rem); color: #d4b870; font-weight: 700; margin-bottom: 4px; }
    .cc-feat-desc { font-size: clamp(0.65rem, 1.1vw, 0.76rem); color: #7a6a40; }

    /* ── Confirm step ──────────────────────────────────────────────── */
    .cc-confirm-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(160px, 22vw, 240px), 1fr));
      gap: clamp(10px, 2vw, 20px);
      margin-bottom: 24px;
    }
    .cc-confirm-section {
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(200,160,32,0.15);
      border-radius: 4px;
      padding: clamp(10px, 1.8vw, 16px);
    }
    .cc-confirm-section-title {
      font-size: clamp(0.65rem, 1.1vw, 0.78rem);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #6a5a3a;
      margin-bottom: 8px;
    }
    .cc-confirm-value {
      font-size: clamp(0.8rem, 1.4vw, 0.94rem);
      color: #d4c090;
    }
    .cc-confirm-class {
      font-size: clamp(0.94rem, 1.7vw, 1.1rem);
      color: #e8c040;
      font-weight: 700;
    }

    /* ── Navigation buttons ────────────────────────────────────────── */
    .cc-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: clamp(10px, 2vh, 16px) clamp(16px, 3vw, 32px);
      background: rgba(0,0,0,0.4);
      border-top: 1px solid rgba(200,160,32,0.15);
      flex-shrink: 0;
      gap: 12px;
    }
    .cc-btn {
      min-height: 44px;
      padding: 10px clamp(16px, 3vw, 28px);
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: clamp(0.8rem, 1.5vw, 0.94rem);
      font-weight: 600;
      letter-spacing: 0.05em;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.15s;
      outline: none;
      border: 1px solid rgba(200,160,32,0.3);
      background: rgba(200,160,32,0.06);
      color: #c8a020;
    }
    .cc-btn:hover, .cc-btn:focus {
      border-color: rgba(200,160,32,0.65);
      background: rgba(200,160,32,0.14);
      color: #e8c040;
      box-shadow: 0 0 10px rgba(200,160,32,0.2);
    }
    .cc-btn.primary {
      background: rgba(200,160,32,0.15);
      border-color: rgba(200,160,32,0.55);
      color: #e8c040;
    }
    .cc-btn.primary:hover, .cc-btn.primary:focus {
      background: rgba(200,160,32,0.25);
      box-shadow: 0 0 16px rgba(200,160,32,0.35);
    }
    .cc-btn:disabled { opacity: 0.35; cursor: default; }
    .cc-nav-center { font-size: clamp(0.68rem, 1.2vw, 0.82rem); color: #5a4a2a; }
  `,document.head.appendChild(f)}const w=[{id:"farmer",name:"Farmer",bonus:"+1 Endurance, Foraging proficiency"},{id:"merchants_child",name:"Merchant's Child",bonus:"+1 Presence, start with 50 extra gold"},{id:"noble_heir",name:"Noble Heir",bonus:"+1 Presence, +1 History, start with fine clothes"},{id:"street_urchin",name:"Street Urchin",bonus:"+1 Agility, +1 Stealth proficiency"},{id:"apprentice_mage",name:"Apprentice Mage",bonus:"+1 Intellect, start with spell scroll x2"},{id:"fishers_child",name:"Fisher's Child",bonus:"+1 Wisdom, boat travel 10% faster"},{id:"blacksmiths_child",name:"Blacksmith's Child",bonus:"+1 Might, start with repair kit x2"},{id:"forest_child",name:"Forest Child",bonus:"+1 Wisdom, +1 Survival proficiency"}],C=[{id:"soldier",name:"Soldier",bonus:"+1 Might or Agility, start with sword + shield"},{id:"mercenary",name:"Mercenary",bonus:"+1 Might, +50 gold, higher initial NPC attitude"},{id:"scholar",name:"Scholar",bonus:"+1 Intellect, start with tome (+1 to one skill)"},{id:"healer",name:"Healer",bonus:"+1 Wisdom, start with healing potions x3"},{id:"skald",name:"Skald",bonus:"+1 Presence, party fame starts at +25"},{id:"thief",name:"Thief",bonus:"+1 Agility, start with lockpick + dagger"},{id:"ranger",name:"Ranger",bonus:"+1 Wisdom or Agility, start with bow + quiver"},{id:"sea_captain",name:"Sea Captain",bonus:"Unlocks boat routes at start, +1 Presence"},{id:"runecarver",name:"Runecarver",bonus:"+1 Intellect, start with rune scroll x2"},{id:"caravan_guard",name:"Caravan Guard",bonus:"Start with wagon + horse"}],E=[{id:"shield_mastery",name:"Shield Mastery",description:"When wielding a shield, block chance is doubled and retaliation damage is doubled."},{id:"swift_movement",name:"Swift Movement",description:"In combat: move up to 3 tiles instead of 1."},{id:"iron_will",name:"Iron Will",description:"+20% resistance to Fear, Charm, and Confusion effects."},{id:"spell_surge",name:"Spell Surge",description:"10% chance on skill use to not consume mana."},{id:"forager",name:"Forager",description:"Nature/Survival checks for foraging produce 50% more ration points."}],S=["#f5d5b5","#e8b88a","#c8956a","#a07050","#7a4a30","#5a2e18","#ffe0c0","#f0c0a0"],T=["#1a1008","#3a2010","#6a3818","#8b4513","#b06820","#d4a840","#e8d080","#c8c8c8"],A=["#2e4a3a","#2e6a4a","#3a6aaa","#7a4a2a","#9a3a1a","#5a2e5a","#4a7a9a","#8a8a3a","#1a3a5a","#5a7a3a","#2a2a2a","#9a9a6a"],$=[{id:1,label:"Lean",icon:"|"},{id:2,label:"Average",icon:"|"},{id:3,label:"Athletic",icon:"|"},{id:4,label:"Stocky",icon:"|"},{id:5,label:"Imposing",icon:"|"}];class z extends N{constructor(e){super("panel-char-create",{trapFocus:!1,zLayer:"panel"}),this._onComplete=e,this._step=0,this._steps=["Race","Attributes","Appearance","Background","Trees","Feat","Confirm"],this._sel={raceId:"human",freeAttrTarget:null,attributes:null,bodyType:1,name:"",skinColor:S[0],hairColor:T[3],eyeColor:A[2],childhood:null,adult:null,trees:[],feat:null},this._keyHandler=this._onKey.bind(this)}build(){this.el.innerHTML="";const e=document.createElement("div");e.className="cc-root",e.setAttribute("role","dialog"),e.setAttribute("aria-label","Character Creation"),e.appendChild(this._buildStepBar());const c=document.createElement("div");return c.className="cc-content",this._mainEl=document.createElement("div"),this._mainEl.className="cc-main",this._sideEl=document.createElement("div"),this._sideEl.className="cc-side",c.appendChild(this._mainEl),c.appendChild(this._sideEl),e.appendChild(c),e.appendChild(this._buildNav()),this.el.appendChild(e),document.addEventListener("keydown",this._keyHandler),this._renderStep(),this}_buildStepBar(){const e=document.createElement("div");return e.className="cc-steps",e.id="cc-step-bar",this._steps.forEach((c,t)=>{const a=document.createElement("div");a.className="cc-step-item",a.dataset.stepIdx=String(t);const s=document.createElement("div");s.className="cc-step-dot",s.textContent=String(t+1);const i=document.createElement("div");i.className="cc-step-label",i.textContent=c,a.appendChild(s),a.appendChild(i),e.appendChild(a)}),e}_buildNav(){const e=document.createElement("div");return e.className="cc-nav",e.id="cc-nav",this._backBtn=document.createElement("button"),this._backBtn.className="cc-btn",this._backBtn.id="cc-btn-back",this._backBtn.textContent="Back",this._backBtn.addEventListener("click",()=>this._goBack()),this._centerLabel=document.createElement("span"),this._centerLabel.className="cc-nav-center",this._nextBtn=document.createElement("button"),this._nextBtn.className="cc-btn primary",this._nextBtn.id="cc-btn-next",this._nextBtn.textContent="Next",this._nextBtn.addEventListener("click",()=>this._goNext()),e.appendChild(this._backBtn),e.appendChild(this._centerLabel),e.appendChild(this._nextBtn),e}_renderStep(){this._updateStepBar(),this._updateNavButtons();const c=[()=>this._renderRaceStep(),()=>this._renderAttributesStep(),()=>this._renderAppearanceStep(),()=>this._renderBackgroundStep(),()=>this._renderTreesStep(),()=>this._renderFeatStep(),()=>this._renderConfirmStep()][this._step];c&&c()}_updateStepBar(){const e=document.getElementById("cc-step-bar");if(!e)return;e.querySelectorAll(".cc-step-item").forEach((t,a)=>{const s=t.querySelector(".cc-step-dot");t.classList.toggle("active",a===this._step),s.classList.toggle("active",a===this._step),s.classList.toggle("done",a<this._step)})}_updateNavButtons(){if(!this._backBtn||!this._nextBtn)return;this._backBtn.disabled=this._step===0;const e=this._step===this._steps.length-1;this._nextBtn.textContent=e?"Create Hero":"Next",this._nextBtn.id=e?"cc-btn-create":"cc-btn-next",this._centerLabel.textContent=`Step ${this._step+1} of ${this._steps.length}`}_goNext(){if(this._validateStep()){if(this._step===this._steps.length-1){this._createHero();return}this._step++,this._renderStep(),this._mainEl.scrollTop=0}}_goBack(){this._step>0&&(this._step--,this._renderStep(),this._mainEl.scrollTop=0)}_validateStep(){switch(this._step){case 0:return!!this._sel.raceId;case 1:return!0;case 2:return!!this._sel.name?.trim();case 3:return!!this._sel.childhood&&!!this._sel.adult;case 4:return this._sel.trees.length===3;case 5:return!!this._sel.feat;default:return!0}}_renderRaceStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Choose Your Race</h2>
      <p class="cc-step-desc">Select the race that defines your heritage and racial traits.</p>
    `;const e=document.createElement("div");e.className="cc-race-grid",e.id="cc-race-grid";const c=h.getPlayableRaces();c.forEach(a=>{const s=document.createElement("button");s.type="button",s.className="cc-race-card"+(a.unlockCondition?" locked":""),s.dataset.raceId=a.id,s.setAttribute("tabindex","0"),s.disabled=!!a.unlockCondition;const i=this._formatBonuses(a.attributeBonuses);s.innerHTML=`
        <div class="cc-race-name">${a.name}</div>
        <div class="cc-race-rarity ${a.rarity}">${a.rarity}</div>
        ${i?`<div class="cc-race-bonuses">${i}</div>`:""}
        ${a.unlockCondition?'<div class="cc-lock-icon">&#x1F512;</div>':""}
      `,a.unlockCondition||s.addEventListener("click",()=>{this._sel.raceId=a.id,this._sel.freeAttrTarget=null,this._sel.attributes=this._computeRaceAttributes(a),e.querySelectorAll(".cc-race-card").forEach(r=>r.classList.remove("selected")),s.classList.add("selected"),this._updateRacePreview(a)}),a.id===this._sel.raceId&&s.classList.add("selected"),e.appendChild(s)}),this._mainEl.appendChild(e);const t=c.find(a=>a.id===this._sel.raceId);t&&this._updateRacePreview(t)}_formatBonuses(e){return e?Object.entries(e).map(([c,t])=>`${t>0?"+":""}${t} ${c.charAt(0).toUpperCase()+c.slice(1)}`).join(", "):""}_computeRaceAttributes(e){const c={...e.baseAttributes},t=e.attributeBonuses??{},a={};for(const s of Object.keys(c))a[s]=c[s]+(t[s]??0);return a}_updateRacePreview(e){this._sideEl.innerHTML="";const c=document.createElement("div");c.className="cc-preview-title",c.textContent=e.name,this._sideEl.appendChild(c);const t=document.createElement("p");t.style.cssText="font-size: clamp(0.65rem,1.1vw,0.78rem); color:#7a6a40; margin:0 0 12px 0;",t.textContent=e.description,this._sideEl.appendChild(t);const a=document.createElement("div");a.className="cc-preview-section",a.textContent="Attributes",this._sideEl.appendChild(a);const s=["might","agility","intellect","wisdom","endurance","presence"],i=e.baseAttributes,r=e.attributeBonuses??{};if(s.forEach(n=>{const o=r[n]??0,l=(i[n]??10)+o,m=document.createElement("div");m.className="cc-attr-row";const p=o>0?"bonus":o<0?"malus":"";m.innerHTML=`
        <span class="cc-attr-label">${n.charAt(0).toUpperCase()+n.slice(1)}</span>
        <span class="cc-attr-val ${p}">${l}${o!==0?` (${o>0?"+":""}${o})`:""}</span>
      `,this._sideEl.appendChild(m)}),e.racialTraits?.length>0){const n=document.createElement("div");n.className="cc-preview-section",n.style.marginTop="12px",n.textContent="Racial Traits",this._sideEl.appendChild(n),e.racialTraits.forEach(o=>{const l=document.createElement("div");l.className="cc-preview-trait",l.innerHTML=`
          <div class="cc-preview-trait-name">${o.name}</div>
          <div class="cc-preview-trait-desc">${o.description}</div>
        `,this._sideEl.appendChild(l)})}if(e.unlockCondition){const n=document.createElement("p");n.style.cssText="font-size:0.68rem; color:#6a4a2a; margin-top:10px; border-top:1px solid rgba(200,160,32,0.15); padding-top:8px;",n.textContent="Locked: "+e.unlockCondition,this._sideEl.appendChild(n)}}_renderAttributesStep(){const e=h.getRace(this._sel.raceId);if(!e)return;this._sel.attributes||(this._sel.attributes=this._computeRaceAttributes(e));const c=e.racialTraits?.some(t=>t.id==="adaptable");if(this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Starting Attributes</h2>
      <p class="cc-step-desc">Your base attributes come from your race. Hover to see derived abilities.</p>
    `,c){const t=document.createElement("div");t.className="cc-free-point-row",t.innerHTML=`
        <span class="cc-free-point-label">Adaptable: Assign +1 free attribute point to:</span>
        <select class="cc-free-point-select" id="cc-free-attr-select">
          <option value="">-- Choose --</option>
          <option value="might">Might</option>
          <option value="agility">Agility</option>
          <option value="intellect">Intellect</option>
          <option value="wisdom">Wisdom</option>
          <option value="endurance">Endurance</option>
          <option value="presence">Presence</option>
        </select>
      `,this._mainEl.appendChild(t);const a=t.querySelector("#cc-free-attr-select");this._sel.freeAttrTarget&&(a.value=this._sel.freeAttrTarget),a.addEventListener("change",()=>{this._sel.freeAttrTarget=a.value||null,this._renderAttributeTable(e)})}this._renderAttributeTable(e),this._updateAttrSidePanel(e)}_renderAttributeTable(e){const c=this._mainEl.querySelector("#cc-attr-table");c&&c.remove(),this._sel.attributes??this._computeRaceAttributes(e);const t=this._sel.freeAttrTarget,a=document.createElement("div");a.className="cc-attrs-table",a.id="cc-attr-table",["Attribute","Base","Bonus","Total"].forEach(i=>{const r=document.createElement("div");r.className="cc-attr-head",r.textContent=i,a.appendChild(r)}),["might","agility","intellect","wisdom","endurance","presence"].forEach(i=>{const r=(e.attributeBonuses??{})[i]??0,n=t===i?1:0,o=(e.baseAttributes[i]??10)+r+n,l=document.createElement("div");l.className="cc-attr-name",l.textContent=i.charAt(0).toUpperCase()+i.slice(1);const m=document.createElement("div");m.className="cc-attr-base",m.textContent=e.baseAttributes[i]??10;const p=r+n,d=document.createElement("div");d.className="cc-attr-bonus-cell",d.style.color=p>0?"#6ab06a":p<0?"#b06a6a":"#5a5040",d.textContent=p===0?"—":(p>0?"+":"")+p;const u=document.createElement("div");u.className="cc-attr-total-cell",u.textContent=o,a.appendChild(l),a.appendChild(m),a.appendChild(d),a.appendChild(u)}),this._mainEl.appendChild(a)}_updateAttrSidePanel(e){this._sideEl.innerHTML="";const c=this._sel.freeAttrTarget,t=this._sel.attributes??this._computeRaceAttributes(e),a={};c&&(a[c]=1);const s={};for(const b of Object.keys(t))s[b]=t[b]+(a[b]??0);const i={attributes:s,level:1},r=h.getDerivedAbilities(i),n=h.getProficiencyBonus(1),o=document.createElement("div");o.className="cc-preview-title",o.textContent="Derived Abilities",this._sideEl.appendChild(o);const l=document.createElement("div");l.className="cc-attr-row",l.innerHTML=`<span class="cc-attr-label">Proficiency Bonus</span><span class="cc-attr-val">+${n}</span>`,this._sideEl.appendChild(l),["athletics","acrobatics","stealth","arcana","history","insight","nature","perception","survival","persuasion","deception","intimidate","command"].forEach(b=>{const x=r[b],g=document.createElement("div");g.className="cc-attr-row",g.innerHTML=`
        <span class="cc-attr-label">${b.charAt(0).toUpperCase()+b.slice(1)}</span>
        <span class="cc-attr-val">${x>=0?"+":""}${x}</span>
      `,this._sideEl.appendChild(g)});const p=s.endurance??10,d=s.intellect??10,u=10+Math.max(0,Math.floor((p-10)/2)),v=10+Math.max(0,Math.floor((d-10)/2)),y=document.createElement("div");y.style.cssText="border-top:1px solid rgba(200,160,32,0.15); margin:8px 0;",this._sideEl.appendChild(y),[["Max HP (L1)",u],["Max Mana (L1)",v]].forEach(([b,x])=>{const g=document.createElement("div");g.className="cc-attr-row",g.innerHTML=`<span class="cc-attr-label">${b}</span><span class="cc-attr-val">${x}</span>`,this._sideEl.appendChild(g)})}_renderAppearanceStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Appearance</h2>
      <p class="cc-step-desc">Customize your hero's look.</p>
    `;const e=document.createElement("div");e.className="cc-name-row",e.innerHTML='<label class="cc-name-label" for="cc-name-input">Hero Name</label>';const c=document.createElement("input");c.type="text",c.className="cc-name-input",c.id="cc-name-input",c.placeholder="Enter hero name...",c.maxLength=32,c.value=this._sel.name||"",c.addEventListener("input",()=>{this._sel.name=c.value}),e.appendChild(c),this._mainEl.appendChild(e);const t=document.createElement("div");t.className="cc-attr-head",t.style.margin="16px 0 8px 0",t.textContent="Body Type",this._mainEl.appendChild(t);const a=document.createElement("div");a.className="cc-appearance-grid",$.forEach(i=>{const r=document.createElement("button");r.type="button",r.className="cc-body-card"+(this._sel.bodyType===i.id?" selected":""),r.innerHTML=`<span class="cc-body-icon">&#x1F9CD;</span>${i.label}`,r.addEventListener("click",()=>{this._sel.bodyType=i.id,a.querySelectorAll(".cc-body-card").forEach(n=>n.classList.remove("selected")),r.classList.add("selected")}),a.appendChild(r)}),this._mainEl.appendChild(a),[{label:"Skin Color",key:"skinColor",colors:S},{label:"Hair Color",key:"hairColor",colors:T},{label:"Eye Color",key:"eyeColor",colors:A}].forEach(({label:i,key:r,colors:n})=>{const o=document.createElement("div");o.className="cc-color-row";const l=document.createElement("div");l.className="cc-color-label",l.textContent=i,o.appendChild(l);const m=document.createElement("div");m.className="cc-swatch-list",n.forEach(p=>{const d=document.createElement("button");d.type="button",d.className="cc-swatch"+(this._sel[r]===p?" selected":""),d.style.background=p,d.title=p,d.setAttribute("aria-label",`${i} ${p}`),d.addEventListener("click",()=>{this._sel[r]=p,m.querySelectorAll(".cc-swatch").forEach(u=>u.classList.remove("selected")),d.classList.add("selected"),this._updateAppearanceSide()}),m.appendChild(d)}),o.appendChild(m),this._mainEl.appendChild(o)}),this._updateAppearanceSide()}_updateAppearanceSide(){this._sideEl.innerHTML="";const e=document.createElement("div");e.className="cc-preview-title",e.textContent="Preview",this._sideEl.appendChild(e);const c=document.createElement("div");c.style.cssText=`
      width: 80px; height: 120px;
      margin: 16px auto;
      background: ${this._sel.skinColor};
      border-radius: 8px 8px 4px 4px;
      position: relative;
      border: 2px solid rgba(200,160,32,0.3);
    `;const t=document.createElement("div");t.style.cssText=`
      width: 48px; height: 48px;
      background: ${this._sel.skinColor};
      border-radius: 50%;
      position: absolute;
      top: -28px; left: 50%; transform: translateX(-50%);
      border: 2px solid rgba(200,160,32,0.3);
    `;const a=document.createElement("div");a.style.cssText=`width:8px; height:8px; background:${this._sel.eyeColor}; border-radius:50%; position:absolute; top:16px; left:8px;`;const s=document.createElement("div");s.style.cssText=`width:8px; height:8px; background:${this._sel.eyeColor}; border-radius:50%; position:absolute; top:16px; right:8px;`;const i=document.createElement("div");i.style.cssText=`width:52px; height:16px; background:${this._sel.hairColor}; border-radius:50% 50% 0 0; position:absolute; top:0; left:50%; transform:translateX(-50%);`,t.appendChild(i),t.appendChild(a),t.appendChild(s),c.appendChild(t),this._sideEl.appendChild(c);const r=this._sel.name?.trim()||"Unnamed",n=document.createElement("div");n.style.cssText="text-align:center; color:#c8a020; font-weight:600; font-size:0.85rem; margin-top:8px;",n.textContent=r,this._sideEl.appendChild(n)}_renderBackgroundStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Background</h2>
      <p class="cc-step-desc">Your history shapes your starting bonuses.</p>
    `,this._mainEl.appendChild(this._buildBgGrid("Childhood Background",w,"childhood"));const e=document.createElement("hr");e.style.cssText="border:none; border-top:1px solid rgba(200,160,32,0.15); margin:20px 0;",this._mainEl.appendChild(e),this._mainEl.appendChild(this._buildBgGrid("Adult Background",C,"adult")),this._updateBackgroundSide()}_buildBgGrid(e,c,t){const a=document.createElement("div"),s=document.createElement("div");s.className="cc-step-title",s.style.fontSize="clamp(0.82rem, 1.5vw, 1rem)",s.style.marginBottom="10px",s.textContent=e,a.appendChild(s);const i=document.createElement("div");return i.className="cc-bg-grid",c.forEach(r=>{const n=document.createElement("button");n.type="button",n.className="cc-bg-card"+(this._sel[t]===r.id?" selected":""),n.innerHTML=`
        <div class="cc-bg-name">${r.name}</div>
        <div class="cc-bg-bonus">${r.bonus}</div>
      `,n.addEventListener("click",()=>{this._sel[t]=r.id,i.querySelectorAll(".cc-bg-card").forEach(o=>o.classList.remove("selected")),n.classList.add("selected"),this._updateBackgroundSide()}),i.appendChild(n)}),a.appendChild(i),a}_updateBackgroundSide(){this._sideEl.innerHTML="";const e=document.createElement("div");if(e.className="cc-preview-title",e.textContent="Background",this._sideEl.appendChild(e),this._sel.childhood){const c=w.find(t=>t.id===this._sel.childhood);if(c){const t=document.createElement("div");t.className="cc-preview-trait",t.innerHTML=`<div class="cc-preview-trait-name">Childhood: ${c.name}</div><div class="cc-preview-trait-desc">${c.bonus}</div>`,this._sideEl.appendChild(t)}}if(this._sel.adult){const c=C.find(t=>t.id===this._sel.adult);if(c){const t=document.createElement("div");t.className="cc-preview-trait",t.innerHTML=`<div class="cc-preview-trait-name">Adult: ${c.name}</div><div class="cc-preview-trait-desc">${c.bonus}</div>`,this._sideEl.appendChild(t)}}if(!this._sel.childhood&&!this._sel.adult){const c=document.createElement("p");c.style.cssText="font-size:0.75rem; color:#5a4a2a;",c.textContent="Select both a childhood and adult background.",this._sideEl.appendChild(c)}}_renderTreesStep(){this._mainEl.innerHTML="";const e=document.createElement("div");e.className="cc-class-preview",e.id="cc-class-preview",e.innerHTML=`
      <span class="cc-class-label">Class:</span>
      <span class="cc-class-name" id="cc-class-name">${h.computeClass(this._sel.trees)}</span>
      <span class="cc-tree-count" id="cc-tree-count">${this._sel.trees.length}/3 trees selected</span>
    `,this._mainEl.appendChild(e);const c=document.createElement("h2");c.className="cc-step-title",c.textContent="Choose 3 Skill Trees",this._mainEl.appendChild(c);const t=document.createElement("p");t.className="cc-step-desc",t.textContent="Select exactly 3 skill trees. Your class is determined by this combination.",this._mainEl.appendChild(t);const a=document.createElement("div");a.className="cc-tree-grid",a.id="cc-tree-grid",h.getSkillTrees().forEach(s=>{const i=document.createElement("button");i.type="button";const r=this._sel.trees.includes(s.id),n=!r&&this._sel.trees.length>=3;i.className="cc-tree-card"+(r?" selected":"")+(n?" disabled":""),i.dataset.treeId=s.id,i.disabled=n,i.innerHTML=`
        <div class="cc-tree-name">${s.name}</div>
        <div class="cc-tree-tier ${s.tier}">${s.tier}</div>
        <div class="cc-tree-desc">${s.description.slice(0,60)}${s.description.length>60?"…":""}</div>
      `,i.addEventListener("click",()=>{this._sel.trees.includes(s.id)?this._sel.trees=this._sel.trees.filter(o=>o!==s.id):this._sel.trees.length<3&&(this._sel.trees=[...this._sel.trees,s.id]),this._rerenderTreeCards(a),this._updateClassPreview()}),a.appendChild(i)}),this._mainEl.appendChild(a),this._updateTreesSide()}_rerenderTreeCards(e){e.querySelectorAll(".cc-tree-card").forEach(t=>{const a=t.dataset.treeId,s=this._sel.trees.includes(a),i=!s&&this._sel.trees.length>=3;t.classList.toggle("selected",s),t.classList.toggle("disabled",i),t.disabled=i}),this._updateTreesSide()}_updateClassPreview(){const e=document.getElementById("cc-class-name"),c=document.getElementById("cc-tree-count");e&&(e.textContent=h.computeClass(this._sel.trees)),c&&(c.textContent=`${this._sel.trees.length}/3 trees selected`)}_updateTreesSide(){this._sideEl.innerHTML="";const e=document.createElement("div");if(e.className="cc-preview-title",e.textContent="Selected Trees",this._sideEl.appendChild(e),this._sel.trees.length===0){const t=document.createElement("p");t.style.cssText="font-size:0.75rem; color:#5a4a2a;",t.textContent="Select 3 skill trees to determine your class.",this._sideEl.appendChild(t);return}const c=h.getSkillTrees();if(this._sel.trees.forEach((t,a)=>{const s=c.find(r=>r.id===t);if(!s)return;const i=document.createElement("div");i.className="cc-preview-trait",i.innerHTML=`
        <div class="cc-preview-trait-name">${a+1}. ${s.name}</div>
        <div class="cc-preview-trait-desc">${s.description.slice(0,80)}…</div>
      `,this._sideEl.appendChild(i)}),this._sel.trees.length===3){const t=h.computeClass(this._sel.trees),a=document.createElement("div");a.style.cssText="margin-top:12px; padding:8px; background:rgba(200,160,32,0.1); border:1px solid rgba(200,160,32,0.3); border-radius:4px; text-align:center;",a.innerHTML=`<div style="font-size:0.7rem; color:#8a7a50; margin-bottom:2px;">CLASS</div><div style="font-size:1rem; color:#e8c040; font-weight:700;">${t}</div>`,this._sideEl.appendChild(a)}}_renderFeatStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Starting Feat</h2>
      <p class="cc-step-desc">Choose one feat to start with.</p>
    `;const e=document.createElement("div");e.className="cc-feat-grid",E.forEach(t=>{const a=document.createElement("button");a.type="button",a.className="cc-feat-card"+(this._sel.feat===t.id?" selected":""),a.innerHTML=`
        <div class="cc-feat-name">${t.name}</div>
        <div class="cc-feat-desc">${t.description}</div>
      `,a.addEventListener("click",()=>{this._sel.feat=t.id,e.querySelectorAll(".cc-feat-card").forEach(s=>s.classList.remove("selected")),a.classList.add("selected"),this._updateFeatSide(t)}),e.appendChild(a)}),this._mainEl.appendChild(e);const c=E.find(t=>t.id===this._sel.feat);c?this._updateFeatSide(c):this._sideEl.innerHTML='<div class="cc-preview-title">Feat Details</div><p style="font-size:0.75rem; color:#5a4a2a;">Select a feat to see details.</p>'}_updateFeatSide(e){this._sideEl.innerHTML="";const c=document.createElement("div");c.className="cc-preview-title",c.textContent=e.name,this._sideEl.appendChild(c);const t=document.createElement("p");t.style.cssText="font-size:0.78rem; color:#7a6a40;",t.textContent=e.description,this._sideEl.appendChild(t)}_renderConfirmStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Confirm Hero</h2>
      <p class="cc-step-desc">Review your choices before creating your hero.</p>
    `;const e=h.getRace(this._sel.raceId),c=h.computeClass(this._sel.trees),t=h.getSkillTrees(),a=document.createElement("div");a.className="cc-confirm-grid",[{title:"Identity",content:`
          <div class="cc-confirm-value"><strong>${this._sel.name||"Unnamed"}</strong></div>
          <div style="font-size:0.78rem; color:#8a7a50; margin-top:4px;">${e?.name??"—"} &bull; ${e?.rarity??""}</div>
          <div class="cc-confirm-class" style="margin-top:6px;">${c}</div>
        `},{title:"Skill Trees",content:this._sel.trees.map(r=>t.find(n=>n.id===r)).filter(Boolean).map(r=>`<div class="cc-confirm-value">${r.name}</div>`).join("")||'<div class="cc-confirm-value" style="color:#5a4a2a;">None selected</div>'},{title:"Background",content:`
          <div style="font-size:0.78rem; color:#8a7a50;">Childhood</div>
          <div class="cc-confirm-value">${w.find(r=>r.id===this._sel.childhood)?.name??"—"}</div>
          <div style="font-size:0.78rem; color:#8a7a50; margin-top:6px;">Adult</div>
          <div class="cc-confirm-value">${C.find(r=>r.id===this._sel.adult)?.name??"—"}</div>
        `},{title:"Starting Feat",content:`<div class="cc-confirm-value">${E.find(r=>r.id===this._sel.feat)?.name??"—"}</div>`}].forEach(r=>{const n=document.createElement("div");n.className="cc-confirm-section",n.innerHTML=`<div class="cc-confirm-section-title">${r.title}</div>${r.content}`,a.appendChild(n)}),this._mainEl.appendChild(a),this._sideEl.innerHTML="";const i=document.createElement("div");if(i.className="cc-preview-title",i.textContent="Attributes",this._sideEl.appendChild(i),e){const r={};this._sel.freeAttrTarget&&(r[this._sel.freeAttrTarget]=1),["might","agility","intellect","wisdom","endurance","presence"].forEach(o=>{const l=e.baseAttributes[o]??10,m=(e.attributeBonuses??{})[o]??0,p=r[o]??0,d=l+m+p,u=h.getAttributeModifier(d),v=document.createElement("div");v.className="cc-attr-row",v.innerHTML=`
          <span class="cc-attr-label">${o.charAt(0).toUpperCase()+o.slice(1)}</span>
          <span class="cc-attr-val">${d} (${u>=0?"+":""}${u})</span>
        `,this._sideEl.appendChild(v)})}}_createHero(){const e=h.getRace(this._sel.raceId),c={};this._sel.freeAttrTarget&&(c[this._sel.freeAttrTarget]=1);const t=this._sel.attributes??this._computeRaceAttributes(e),a={};for(const i of Object.keys(t))a[i]=t[i]+(c[i]??0);const s=h.createHero({name:this._sel.name?.trim()||"Hero",raceId:this._sel.raceId,attributeOverrides:a,appearance:{bodyType:this._sel.bodyType,skinColor:this._sel.skinColor,hairColor:this._sel.hairColor,eyeColor:this._sel.eyeColor},background:{childhood:this._sel.childhood??"farmer",adult:this._sel.adult??"soldier"},skillTrees:this._sel.trees,startingFeat:this._sel.feat,alignment:"neutral"});_.info(`[party] CharCreate complete; heroId=${s.id} name=${s.name} class=${s.class}`),this._onComplete&&this._onComplete(s)}_onKey(e){this._visible&&e.key==="Escape"&&e.preventDefault()}destroy(){document.removeEventListener("keydown",this._keyHandler),super.destroy()}}class M{constructor(){this._panel=null}async init(){_.info("[boot] CharCreateScene init"),B(),window.__debug||(window.__debug={}),window.__debug.currentScene="charCreate",this._panel=new z(e=>{L.transition("partyBuilder",{heroes:[e]})}),this._panel.build(),this._panel.show(),_.info("[boot] CharCreateScene ready")}update(e){}async destroy(){_.info("[boot] CharCreateScene destroy"),this._panel&&(this._panel.destroy(),this._panel=null),window.__debug&&window.__debug.currentScene==="charCreate"&&(window.__debug.currentScene=null)}}export{M as default};
//# sourceMappingURL=CharCreateScene-NYvOyvXa.js.map
