import{U as k,b as y,D as m,I as c,W as x}from"./main-DCZ4KuqN.js";const E="spellroads-inventory-style";function B(){if(document.getElementById(E))return;const _=document.createElement("style");_.id=E,_.textContent=`
    /* ══════════════════════════════════════════════════════════════
       InventoryPanel — Spellroads
       ══════════════════════════════════════════════════════════════ */

    #panel-inventory {
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
    #panel-inventory.visible { display: flex; }

    /* ── Header ──────────────────────────────────────────────────── */
    .inv-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: clamp(8px,1.5vh,14px) clamp(12px,2vw,24px);
      background: rgba(0,0,0,0.5);
      border-bottom: 1px solid rgba(200,160,32,0.25);
      flex-shrink: 0;
      gap: 12px;
    }
    .inv-title {
      font-size: clamp(0.9rem,1.8vw,1.2rem);
      font-weight: 700;
      color: #c8a020;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .inv-gold {
      font-size: clamp(0.75rem,1.3vw,0.9rem);
      color: #d4b870;
      font-weight: 600;
    }
    .inv-close {
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
    .inv-close:hover { color: #c8a020; border-color: #c8a020; }

    /* ── Party Tabs ──────────────────────────────────────────────── */
    .inv-tabs {
      display: flex;
      gap: 4px;
      padding: 8px clamp(12px,2vw,24px) 0;
      background: rgba(0,0,0,0.3);
      flex-shrink: 0;
      overflow-x: auto;
    }
    .inv-tab {
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
    .inv-tab:hover { background: rgba(200,160,32,0.1); color: #c8d0a0; }
    .inv-tab.active {
      background: rgba(8,6,4,0.9);
      border-color: rgba(200,160,32,0.35);
      color: #c8a020;
    }

    /* ── Body ─────────────────────────────────────────────────────── */
    .inv-body {
      flex: 1;
      display: grid;
      grid-template-columns: 220px 1fr 220px;
      gap: 0;
      overflow: hidden;
      min-height: 0;
    }

    /* ── Section shared ──────────────────────────────────────────── */
    .inv-section {
      padding: clamp(10px,1.5vw,16px);
      overflow-y: auto;
      border-right: 1px solid rgba(200,160,32,0.12);
    }
    .inv-section:last-child { border-right: none; }
    .inv-section-title {
      font-size: clamp(0.62rem,1vw,0.72rem);
      color: #c8a020;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(200,160,32,0.15);
    }

    /* ── Equipment doll ──────────────────────────────────────────── */
    .inv-equip-doll {
      display: grid;
      grid-template-areas:
        ". helmet ."
        "ring1 chest ring2"
        ". gloves ."
        "belt legs amulet"
        "weapon boots offhand"
        ". quiver .";
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
    }
    .inv-slot {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(200,160,32,0.18);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 2px;
      transition: border-color 0.12s, background 0.12s;
      overflow: hidden;
      min-height: 44px;
    }
    .inv-slot:hover { border-color: rgba(200,160,32,0.5); background: rgba(200,160,32,0.05); }
    .inv-slot.has-item { border-color: rgba(200,160,32,0.35); }
    .inv-slot.req-warn { border-color: rgba(200,50,30,0.6); }
    .inv-slot-label {
      font-size: 0.52rem;
      color: rgba(160,144,112,0.6);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      line-height: 1;
    }
    .inv-slot-icon { font-size: 1.1rem; line-height: 1; }
    .inv-slot-name {
      font-size: 0.5rem;
      color: #c8d0a0;
      text-align: center;
      padding: 0 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .inv-slot .req-badge {
      position: absolute;
      top: 2px; right: 2px;
      width: 10px; height: 10px;
      background: #c83020;
      border-radius: 50%;
    }
    /* slot grid areas */
    .inv-slot[data-slot="helmet"]  { grid-area: helmet; }
    .inv-slot[data-slot="armor"]   { grid-area: chest; }
    .inv-slot[data-slot="legs"]    { grid-area: legs; }
    .inv-slot[data-slot="boots"]   { grid-area: boots; }
    .inv-slot[data-slot="gloves"]  { grid-area: gloves; }
    .inv-slot[data-slot="ring1"]   { grid-area: ring1; }
    .inv-slot[data-slot="ring2"]   { grid-area: ring2; }
    .inv-slot[data-slot="amulet"]  { grid-area: amulet; }
    .inv-slot[data-slot="belt"]    { grid-area: belt; }
    .inv-slot[data-slot="weapon"]  { grid-area: weapon; }
    .inv-slot[data-slot="offhand"] { grid-area: offhand; }
    .inv-slot[data-slot="quiver"]  { grid-area: quiver; }

    /* ── Inventory grid ──────────────────────────────────────────── */
    .inv-center {
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
    }
    .inv-grid-wrap {
      flex: 1;
      overflow-y: auto;
      padding: clamp(10px,1.5vw,16px);
    }
    .inv-grid {
      display: grid;
      grid-template-columns: repeat(6, 48px);
      gap: 4px;
    }
    .inv-cell {
      width: 48px; height: 48px;
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(200,160,32,0.12);
      border-radius: 3px;
      position: relative;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      transition: border-color 0.12s;
      user-select: none;
    }
    .inv-cell:empty { cursor: default; }
    .inv-cell.has-item { border-color: rgba(200,160,32,0.3); }
    .inv-cell.has-item:hover { border-color: rgba(200,160,32,0.6); background: rgba(200,160,32,0.06); }
    .inv-cell.selected { border-color: #c8a020; background: rgba(200,160,32,0.12); }
    .inv-cell.drag-over { border-color: #c8c030; background: rgba(200,192,48,0.1); }
    .inv-cell-icon { font-size: 1.4rem; }
    .inv-cell-qty {
      position: absolute;
      bottom: 1px; right: 3px;
      font-size: 0.55rem;
      color: #c8d0a0;
      font-weight: bold;
      line-height: 1;
    }
    .inv-cell-rarity-bar {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 2px;
    }

    /* ── Weight bar ──────────────────────────────────────────────── */
    .inv-weight {
      padding: 8px clamp(10px,1.5vw,16px);
      background: rgba(0,0,0,0.3);
      border-top: 1px solid rgba(200,160,32,0.12);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: clamp(0.6rem,1vw,0.72rem);
      color: #a09070;
    }
    .inv-weight-label { flex-shrink: 0; }
    .inv-weight-bar {
      flex: 1;
      height: 6px;
      background: rgba(255,255,255,0.06);
      border-radius: 3px;
      overflow: hidden;
    }
    .inv-weight-fill {
      height: 100%;
      background: #4a7a2a;
      border-radius: 3px;
      transition: width 0.2s, background 0.2s;
    }
    .inv-weight-fill.overweight { background: #c83020; }
    .inv-weight-value { flex-shrink: 0; min-width: 70px; text-align: right; }

    /* ── Stats panel ─────────────────────────────────────────────── */
    .inv-stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 8px;
      font-size: clamp(0.6rem,1vw,0.7rem);
    }
    .inv-stat-row {
      display: flex;
      justify-content: space-between;
      gap: 4px;
      padding: 2px 0;
      border-bottom: 1px solid rgba(200,160,32,0.07);
    }
    .inv-stat-label { color: #a09070; }
    .inv-stat-value { color: #e8d5b0; font-weight: 600; }
    .inv-stat-value.good  { color: #40a060; }
    .inv-stat-value.warn  { color: #e07820; }
    .inv-stat-value.bad   { color: #c83020; }

    /* ── Tooltip ─────────────────────────────────────────────────── */
    #inv-tooltip {
      position: fixed;
      z-index: 9990;
      background: rgba(8,6,4,0.97);
      border: 1px solid rgba(200,160,32,0.3);
      border-radius: 5px;
      padding: 10px 12px;
      min-width: 200px;
      max-width: 280px;
      pointer-events: none;
      display: none;
      box-shadow: 0 4px 18px rgba(0,0,0,0.7);
    }
    #inv-tooltip.visible { display: block; }
    .tt-name {
      font-size: clamp(0.75rem,1.2vw,0.9rem);
      font-weight: 700;
      margin-bottom: 4px;
    }
    .tt-type {
      font-size: 0.6rem;
      color: #706050;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
    }
    .tt-stat { font-size: 0.68rem; color: #c8d0a0; margin-bottom: 2px; }
    .tt-affix {
      font-size: 0.65rem;
      color: #7090c0;
      margin-bottom: 2px;
      font-style: italic;
    }
    .tt-req {
      font-size: 0.62rem;
      color: #c83020;
      margin-top: 4px;
    }
    .tt-desc {
      font-size: 0.62rem;
      color: #706050;
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid rgba(200,160,32,0.1);
    }
    .tt-delta { font-size: 0.65rem; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(200,160,32,0.1); }
    .tt-delta-row { display: flex; justify-content: space-between; gap: 8px; }
    .tt-delta-plus  { color: #40a060; }
    .tt-delta-minus { color: #c83020; }
    .tt-unid { color: #a09070; font-style: italic; }
    .tt-action {
      font-size: 0.58rem;
      color: #706050;
      margin-top: 6px;
      text-align: center;
    }

    /* ── Sell area ───────────────────────────────────────────────── */
    .inv-sell-area {
      padding: 6px 10px;
      text-align: center;
      font-size: clamp(0.6rem,1vw,0.7rem);
      color: #706050;
      border-top: 1px solid rgba(200,160,32,0.1);
      cursor: pointer;
      transition: color 0.12s;
    }
    .inv-sell-area:hover { color: #c8a020; }
    .inv-sell-area.drag-over { background: rgba(200,160,32,0.08); color: #c8a020; }

    /* ── Mobile layout (portrait) ────────────────────────────────── */
    @media (max-width: 767px) and (orientation: portrait) {
      .inv-body {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
      }
      .inv-section { border-right: none; border-bottom: 1px solid rgba(200,160,32,0.12); }
      .inv-section:last-child { border-bottom: none; }
      .inv-equip-doll { grid-template-columns: repeat(6,1fr); grid-template-areas: unset; }
      .inv-slot[data-slot] { grid-area: unset; }
      .inv-grid { grid-template-columns: repeat(4,48px); }
    }

    /* ── Mobile landscape ─────────────────────────────────────────── */
    @media (max-width: 1023px) and (orientation: landscape) {
      .inv-body { grid-template-columns: 160px 1fr 160px; }
    }
  `,document.head.appendChild(_)}const C=[{id:"helmet",label:"Helm",icon:"⛏"},{id:"armor",label:"Chest",icon:"🧥"},{id:"gloves",label:"Gloves",icon:"🧤"},{id:"legs",label:"Legs",icon:"👖"},{id:"boots",label:"Boots",icon:"👢"},{id:"belt",label:"Belt",icon:"⚪"},{id:"ring1",label:"Ring",icon:"💍"},{id:"ring2",label:"Ring",icon:"💍"},{id:"amulet",label:"Amulet",icon:"❣"},{id:"weapon",label:"Weapon",icon:"⚔"},{id:"offhand",label:"Offhand",icon:"🛡"},{id:"quiver",label:"Quiver",icon:"🏹"}],T=Object.fromEntries(C.map(_=>[_.id,_.icon]));class A extends k{constructor(){B(),super("panel-inventory",{trapFocus:!1,zLayer:"panel"}),this._char=null,this._partyChars=[],this._dragItem=null,this._dragSource=null,this._identifyTarget=null,this._pendingIdentify=!1,this._tooltip=null,this._buildTooltip(),this._setupDebugHooks()}_buildHTML(){return`
      <div class="inv-header">
        <span class="inv-title">Inventory</span>
        <span class="inv-gold" id="inv-gold-display">Gold: 0</span>
        <button class="inv-close" id="inv-close-btn" tabindex="0" aria-label="Close inventory">×</button>
      </div>
      <div class="inv-tabs" id="inv-tabs" role="tablist"></div>
      <div class="inv-body">
        <div class="inv-section" id="inv-equip-section">
          <div class="inv-section-title">Equipment</div>
          <div class="inv-equip-doll" id="inv-equip-doll"></div>
        </div>
        <div class="inv-center inv-section" id="inv-center-section">
          <div style="padding:clamp(10px,1.5vw,16px) clamp(10px,1.5vw,16px) 0">
            <div class="inv-section-title">Inventory</div>
          </div>
          <div class="inv-grid-wrap">
            <div class="inv-grid" id="inv-grid"></div>
          </div>
          <div class="inv-sell-area" id="inv-sell-area">Drop here to sell</div>
          <div class="inv-weight" id="inv-weight">
            <span class="inv-weight-label">Weight:</span>
            <div class="inv-weight-bar"><div class="inv-weight-fill" id="inv-weight-fill" style="width:0%"></div></div>
            <span class="inv-weight-value" id="inv-weight-value">0 / 0</span>
          </div>
        </div>
        <div class="inv-section" id="inv-stats-section">
          <div class="inv-section-title">Character Stats</div>
          <div id="inv-stats-content"></div>
        </div>
      </div>
    `}_buildTooltip(){if(document.getElementById("inv-tooltip")){this._tooltip=document.getElementById("inv-tooltip");return}const e=document.createElement("div");e.id="inv-tooltip",document.body.appendChild(e),this._tooltip=e}show(e=null){this._partyChars=this._getPartyChars(),this._char=e?y.getById(e)??this._partyChars[0]??null:this._partyChars[0]??null,!this._char&&this._partyChars.length===0&&(m.warn("[ui] InventoryPanel: no characters found, creating test character"),this._char=this._createTestCharacter()),super.show(e),this._bindPanelEvents(),this._renderAll()}hide(){this._hideTooltip(),super.hide()}updateContent(e){this._char&&this._renderAll()}_getPartyChars(){const e=window.__partyState;if(e?.characters&&e.characters.length>0)return e.characters.map(t=>typeof t=="string"?y.getById(t):t).filter(Boolean);const i=y.getAll().filter(t=>t.isHero);return i.length>0?i:y.getAll().slice(0,4)}_createTestCharacter(){const e=y.createHero({name:"Test Hero",raceId:"human",background:{childhood:"farmer",adult:"soldier"},skillTrees:["combat"]});c.init();const i=c.createStartingGear({adult:"soldier"});return e.inventory=i,this._partyChars=[e],e}_bindPanelEvents(){const e=this.el.querySelector("#inv-close-btn");e&&!e._invBound&&(e.addEventListener("click",()=>this.hide()),e._invBound=!0)}_renderAll(){this._char&&(this._renderGold(),this._renderTabs(),this._renderEquipDoll(),this._renderInventoryGrid(),this._renderStats(),this._renderWeight())}_renderGold(){const e=this.el.querySelector("#inv-gold-display");e&&(e.textContent=`Gold: ${x.partyGold??0}`)}_renderTabs(){const e=this.el.querySelector("#inv-tabs");if(e){e.innerHTML="";for(const i of this._partyChars){const t=document.createElement("button");t.className="inv-tab"+(i===this._char?" active":""),t.tabIndex=0,t.setAttribute("role","tab"),t.setAttribute("aria-selected",i===this._char?"true":"false"),t.textContent=i.name,t.addEventListener("click",()=>{this._char=i,this._renderAll()}),e.appendChild(t)}}}_renderEquipDoll(){const e=this.el.querySelector("#inv-equip-doll");if(e){e.innerHTML="";for(const i of C){const t=document.createElement("div");t.className="inv-slot",t.dataset.slot=i.id,t.tabIndex=0,t.setAttribute("aria-label",i.label);const n=this._char.equipment?.[i.id]??null;if(n){t.classList.add("has-item");const{canEquip:o,warnings:s}=c.canEquip(this._char,n);if(s.length>0){t.classList.add("req-warn");const a=document.createElement("div");a.className="req-badge",a.title=s.join(`
`),t.appendChild(a)}const r=c.getRarityColor(n.rarity),l=document.createElement("div");l.className="inv-slot-icon",l.textContent=T[i.id]??"?",l.style.filter=`drop-shadow(0 0 3px ${r}80)`;const d=document.createElement("div");d.className="inv-slot-name",d.style.color=r,d.textContent=n.identified?this._shortName(c.getItemName(n)):"???",t.appendChild(l),t.appendChild(d),t.addEventListener("mouseenter",a=>this._showTooltip(n,a,i.id)),t.addEventListener("mouseleave",()=>this._hideTooltip()),t.addEventListener("mousemove",a=>this._moveTooltip(a)),t.addEventListener("contextmenu",a=>{a.preventDefault(),this._unequipItem(i.id)}),t.addEventListener("click",a=>{a.shiftKey&&this._unequipItem(i.id)}),t.draggable=!0,t.addEventListener("dragstart",a=>this._onDragStart(a,n,i.id)),t.addEventListener("dragend",()=>this._onDragEnd())}else{const o=document.createElement("div");o.className="inv-slot-label",o.textContent=i.label,t.appendChild(o)}t.addEventListener("dragover",o=>{o.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",o=>{o.preventDefault(),t.classList.remove("drag-over"),this._onDropToSlot(i.id)}),e.appendChild(t)}}}_renderInventoryGrid(){const e=this.el.querySelector("#inv-grid");if(!e)return;e.innerHTML="";const i=this._char.inventory??[],n=Math.max(24,Math.ceil((i.length+4)/6)*6);for(let s=0;s<n;s++){const r=document.createElement("div");r.className="inv-cell",r.dataset.index=s;const l=i[s];if(l){r.classList.add("has-item");const d=c.getRarityColor(l.rarity),a=document.createElement("div");a.className="inv-cell-icon",a.textContent=this._getItemIcon(l);const b=document.createElement("div");if(b.className="inv-cell-rarity-bar",b.style.background=d,r.appendChild(a),r.appendChild(b),l.quantity>1){const u=document.createElement("div");u.className="inv-cell-qty",u.textContent=l.quantity,r.appendChild(u)}r.addEventListener("mouseenter",u=>this._showTooltip(l,u,null)),r.addEventListener("mouseleave",()=>this._hideTooltip()),r.addEventListener("mousemove",u=>this._moveTooltip(u)),r.addEventListener("click",u=>{if(this._pendingIdentify){this._resolveIdentify(l);return}this._onCellClick(l,s,u)}),r.addEventListener("contextmenu",u=>{u.preventDefault(),this._onCellRightClick(l,s)}),r.draggable=!0,r.addEventListener("dragstart",u=>this._onDragStart(u,l,"inventory")),r.addEventListener("dragend",()=>this._onDragEnd())}r.addEventListener("dragover",d=>{d.preventDefault(),r.classList.add("drag-over")}),r.addEventListener("dragleave",()=>r.classList.remove("drag-over")),r.addEventListener("drop",d=>{d.preventDefault(),r.classList.remove("drag-over"),this._onDropToInventory(s)}),e.appendChild(r)}const o=this.el.querySelector("#inv-sell-area");o&&(o.addEventListener("dragover",s=>{s.preventDefault(),o.classList.add("drag-over")}),o.addEventListener("dragleave",()=>o.classList.remove("drag-over")),o.addEventListener("drop",s=>{s.preventDefault(),o.classList.remove("drag-over"),this._onDropToSell()}))}_renderStats(){const e=this.el.querySelector("#inv-stats-content");if(!e||!this._char)return;const i=this._char,t=i.attributes??{},n=y.getDerivedAbilities(i),o=i.equipment??{};let s=0,r=0,l=0,d=0,a=0;for(const g of Object.values(o)){if(!g)continue;const p=c.getEffectiveStats(g);if(s+=p.defense??0,r+=p.blockChance??0,l+=p.manaBonus??0,d+=p.mightBonus??0,a+=p.maxHPBonus??0,p.attributeBonuses)for(const[h,D]of Object.entries(p.attributeBonuses))h in t&&(t[h]=(t[h]??0)+D)}const b=(i.maxHP??0)+a,u=(i.maxMana??0)+l,v=[{label:"Class",value:i.class??"Adventurer"},{label:"Level",value:i.level??1},{label:"HP",value:`${i.hp??0} / ${b}`,cls:i.hp/b<.3?"bad":""},{label:"Mana",value:`${i.mana??0} / ${u}`},{label:"",value:""},{label:"Might",value:t.might??10},{label:"Agility",value:t.agility??10},{label:"Intellect",value:t.intellect??10},{label:"Wisdom",value:t.wisdom??10},{label:"Endurance",value:t.endurance??10},{label:"Presence",value:t.presence??10},{label:"",value:""},{label:"Defense",value:s},{label:"Block",value:r>0?`${Math.round(r*100)}%`:"0%"},{label:"Athletics",value:n.athletics??0,cls:n.athletics>=5?"good":""},{label:"Perception",value:n.perception??0},{label:"Stealth",value:n.stealth??0},{label:"Persuasion",value:n.persuasion??0}];e.innerHTML='<div class="inv-stats-grid">'+v.map(g=>g.label?`<div class="inv-stat-row" style="grid-column:1/-1">
          <span class="inv-stat-label">${g.label}</span>
          <span class="inv-stat-value ${g.cls??""}">${g.value}</span>
        </div>`:"<div></div><div></div>").join("")+"</div>"}_renderWeight(){const e=this._char;if(!e)return;let t=10+(e.attributes?.might??10)*3;const n=e.equipment?.belt;if(n){const a=c.getEffectiveStats(n);t+=a.carryBonus??0}let o=0;for(const a of e.inventory??[])o+=(a.weight??0)*(a.quantity??1);const s=Math.min(100,o/t*100),r=o>t,l=this.el.querySelector("#inv-weight-fill"),d=this.el.querySelector("#inv-weight-value");l&&(l.style.width=`${s}%`,l.classList.toggle("overweight",r)),d&&(d.textContent=`${Math.round(o*10)/10} / ${Math.round(t*10)/10}`,d.style.color=r?"#c83020":"")}_showTooltip(e,i,t){if(!this._tooltip)return;const n=c.getBaseItem(e.baseId);if(!n)return;const o=c.getRarityColor(e.rarity),s=c.getItemName(e),r=e.identified?c.getEffectiveStats(e):null,{canEquip:l,warnings:d}=c.canEquip(this._char,e);let a="";if(e.identified?a+=`<div class="tt-name" style="color:${o}">${s}</div>`:a+=`<div class="tt-name tt-unid">Unidentified ${n.name}</div>`,a+=`<div class="tt-type">${n.type}${n.subtype?" — "+n.subtype:""}  |  Lvl ${e.level??1}</div>`,e.identified&&r){r.damage&&(a+=`<div class="tt-stat">Damage: ${r.damage.min}–${r.damage.max}</div>`),r.defense>0&&(a+=`<div class="tt-stat">Defense: ${r.defense}</div>`),r.blockChance>0&&(a+=`<div class="tt-stat">Block: ${Math.round(r.blockChance*100)}%</div>`);const v={manaBonus:"Mana Bonus",mightBonus:"Might Bonus",critBonus:"Crit Chance",stunChance:"Stun Chance",reach:"Reach",moveSpeedBonus:"Move Speed",carryBonus:"Carry Bonus",spellPowerBonus:"Spell Power",lightRadius:"Light Radius",armorPen:"Armor Pen"};for(const[g,p]of Object.entries(v)){const h=r[g];if(h!=null&&h!==0){const D=typeof h=="number"&&h<1&&h>0;a+=`<div class="tt-stat">${p}: ${D?Math.round(h*100)+"%":h}</div>`}}if(e.affixes?.length>0)for(const g of e.affixes){if(!g.identified)continue;const p=c.getAffixDescription(g.id);p&&(a+=`<div class="tt-affix">${p}</div>`)}if(!t&&n.slot&&this._char.equipment?.[n.slot]){const g=this._char.equipment[n.slot];if(g){const p=c.getEffectiveStats(g),h=r;a+='<div class="tt-delta">';const D=["defense","damage","manaBonus","critBonus","blockChance"];for(const f of D){const q=typeof h[f]=="object"?((h[f]?.min??0)+(h[f]?.max??0))/2:h[f]??0,I=typeof p[f]=="object"?((p[f]?.min??0)+(p[f]?.max??0))/2:p[f]??0,w=q-I;if(Math.abs(w)>.001){const S=w>0?"+":"",L=w>0?"tt-delta-plus":"tt-delta-minus",$=f.charAt(0).toUpperCase()+f.slice(1);a+=`<div class="tt-delta-row"><span>${$}</span><span class="${L}">${S}${Math.round(w*100)/100}</span></div>`}}a+="</div>"}}}else e.identified||(a+='<div class="tt-stat" style="color:#706050">Unidentified — use a Scroll of Identify</div>');if(n.type==="consumable"&&n.effect){const v=n.effect;v.restoreHP&&(a+=`<div class="tt-stat" style="color:#40a060">Restores ${v.restoreHP} HP</div>`),v.restoreMana&&(a+=`<div class="tt-stat" style="color:#4090c0">Restores ${v.restoreMana} Mana</div>`),v.rationPoints&&(a+=`<div class="tt-stat">+${v.rationPoints} ration points</div>`),v.removeStatus&&(a+=`<div class="tt-stat">Removes: ${v.removeStatus.join(", ")}</div>`),v.identify&&(a+='<div class="tt-stat" style="color:#7090c0">Identifies one item</div>')}d.length>0&&(a+=d.map(v=>`<div class="tt-req">${v}</div>`).join("")),n.description&&(a+=`<div class="tt-desc">${n.description}</div>`);const b=n.type==="consumable",u=!!n.slot;t?a+='<div class="tt-action">Right-click or Shift+Click to unequip</div>':b?a+='<div class="tt-action">Right-click to use</div>':u&&(a+='<div class="tt-action">Click to equip</div>'),this._tooltip.innerHTML=a,this._tooltip.classList.add("visible"),this._moveTooltip(i)}_moveTooltip(e){if(!this._tooltip?.classList.contains("visible"))return;const i=12,t=this._tooltip.offsetWidth,n=this._tooltip.offsetHeight;let o=e.clientX+i,s=e.clientY+i;o+t>window.innerWidth-i&&(o=e.clientX-t-i),s+n>window.innerHeight-i&&(s=e.clientY-n-i),this._tooltip.style.left=`${Math.max(i,o)}px`,this._tooltip.style.top=`${Math.max(i,s)}px`}_hideTooltip(){this._tooltip&&this._tooltip.classList.remove("visible")}_onCellClick(e,i,t){const n=c.getBaseItem(e.baseId);n&&n.slot&&this._equipItem(e,i)}_onCellRightClick(e,i){const t=c.getBaseItem(e.baseId);if(t){if(t.type==="consumable")this._useConsumable(e,i);else if(t.slot){for(const[n,o]of Object.entries(this._char.equipment??{}))if(o===e){this._unequipItem(n);return}}}}_equipItem(e,i){const t=c.getBaseItem(e.baseId);if(!t?.slot)return;const{canEquip:n,warnings:o}=c.canEquip(this._char,e);if(!n){m.warn(`[ui] Cannot equip ${e.name}: ${o.join(", ")}`);return}let s=t.slot;if(t.slot==="ring1"){const a=this._char.equipment??{};a.ring1?a.ring2?s="ring1":s="ring2":s="ring1"}const r=this._char.inventory??[],l=this._char.equipment??{},d=l[s];d&&r.push(d),r.splice(i,1),l[s]=e,this._char.equipment=l,this._char.inventory=r,m.event(`[item] Equipped; name=${e.name} slot=${s} char=${this._char.name}`),this._renderAll()}_unequipItem(e){const i=this._char.equipment??{},t=i[e];if(!t)return;const n=this._char.inventory??[];n.push(t),i[e]=null,this._char.equipment=i,this._char.inventory=n,m.event(`[item] Unequipped; slot=${e} char=${this._char.name}`),this._renderAll()}_useConsumable(e,i){const t=c.getBaseItem(e.baseId);if(!t)return;if(t.effect?.identify){this._pendingIdentify=!0,this._identifyScrollInstance=e,this._identifyScrollIndex=i,m.info("[ui] Awaiting identify target selection");return}const{applied:n,message:o}=c.useConsumable(e,this._char,{worldState:x});m.event(`[item] useConsumable result; applied=${n} msg=${o}`),this._renderAll()}_resolveIdentify(e){if(!this._pendingIdentify)return;if(this._pendingIdentify=!1,e.identified){m.info("[ui] Identify: target already identified");return}const i=this._identifyScrollInstance,{applied:t,message:n}=c.useConsumable(i,this._char,{worldState:x,targetItem:e});m.event(`[item] identify result; applied=${t} msg=${n}`),this._renderAll()}_onDragStart(e,i,t){this._dragItem=i,this._dragSource=t,e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",i.instanceId)}_onDragEnd(){this._dragItem=null,this._dragSource=null}_onDropToSlot(e){if(!this._dragItem)return;const i=c.getBaseItem(this._dragItem.baseId);if(!i)return;const t=i.slot;let n=e;if(t==="ring1"&&(e==="ring1"||e==="ring2"))n=e;else if(t!==n){m.warn(`[ui] Drag drop: slot mismatch ${t} vs ${n}`);return}const{canEquip:o,warnings:s}=c.canEquip(this._char,this._dragItem);if(!o)return;const r=this._char.equipment??{},l=this._char.inventory??[];if(this._dragSource==="inventory"){const a=l.indexOf(this._dragItem);a!==-1&&l.splice(a,1)}else r[this._dragSource]===this._dragItem&&(r[this._dragSource]=null);const d=r[n];d&&d!==this._dragItem&&(this._dragSource==="inventory"?l.push(d):r[this._dragSource]=d),r[n]=this._dragItem,this._char.equipment=r,this._char.inventory=l,m.event(`[item] Drag-equipped; name=${this._dragItem.name} slot=${n}`),this._renderAll()}_onDropToInventory(e){if(!this._dragItem)return;const i=this._char.equipment??{},t=this._char.inventory??[];this._dragSource!=="inventory"&&i[this._dragSource]===this._dragItem&&(i[this._dragSource]=null);const n=t[e];if(this._dragSource==="inventory"){const o=t.indexOf(this._dragItem);o!==-1&&o!==e&&(t[o]=n??t[o],t[e]=this._dragItem,n||t.splice(o,1))}else n?t.push(this._dragItem):t.splice(e,0,this._dragItem);this._char.equipment=i,this._char.inventory=t,m.event(`[item] Drag-to-inventory; name=${this._dragItem.name}`),this._renderAll()}_onDropToSell(){if(!this._dragItem)return;const e=c.getBaseItem(this._dragItem.baseId);if(!e)return;const i=Math.max(1,Math.floor((e.level??1)*3*.3));x.partyGold=(x.partyGold??0)+i;const t=this._char.equipment??{},n=this._char.inventory??[];if(this._dragSource==="inventory"){const o=n.indexOf(this._dragItem);o!==-1&&n.splice(o,1)}else t[this._dragSource]===this._dragItem&&(t[this._dragSource]=null);this._char.equipment=t,this._char.inventory=n,m.event(`[item] Sold; name=${this._dragItem.name} gold=${i} totalGold=${x.partyGold}`),this._renderAll()}_shortName(e){return e.length>14?e.slice(0,12)+"…":e}_getItemIcon(e){const i=c.getBaseItem(e.baseId);if(!i)return"?";const n={weapon:{sword:"⚔",axe:"⸲",dagger:"🗡",spear:"🚩",hammer:"🔨",bow:"🏹",staff:"🚹",wand:"✨",default:"⚔"},armor:{leather:"🧥",robe:"👗",chainmail:"⛓",plate:"🛡",default:"🧥"},shield:"🛡",accessory:{ring:"💍",amulet:"❣",boots:"👢",gloves:"🧤",belt:"⚪",default:"📿"},offhand:{quiver:"🏹",orb:"🔮",torch:"🕯",default:"🛡"},consumable:{potion:"🧪",scroll:"📜",food:"🍽",tool:"🔨",default:"🧪"},tool:"🔧"}[i.type];return n?typeof n=="string"?n:n[i.subtype]??n.default??"📦":"📦"}_setupDebugHooks(){typeof window>"u"||(window.__debugGetInventory=e=>{let i=this._char;return e&&(i=y.getById(e)??y.getAll().find(t=>t.name.toLowerCase()===String(e).toLowerCase())??this._char),i?{character:i.name,inventory:i.inventory??[],equipment:i.equipment??{},gold:x.partyGold}:null})}}export{A as default};
//# sourceMappingURL=InventoryPanel-CHr0jST1.js.map
