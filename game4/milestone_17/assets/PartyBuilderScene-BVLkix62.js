import{D as s,U as v,b,S as u,W as y,E as x}from"./main-jTBrLZ97.js";import h from"./CoopSystem-B6XhrpSC.js";import{W as w}from"./WorldGenerator-DzI4mSJX.js";import"./RNG-ziO0lLz6.js";import"./Noise-Cgm4OGP4.js";const f="spellroads-partybuilder-style";function C(){if(document.getElementById(f))return;const c=document.createElement("style");c.id=f,c.textContent=`
    /* ── PartyBuilder Panel ───────────────────────────────────────── */
    #panel-party-builder {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: none;
      align-items: stretch;
      background: rgba(8, 6, 4, 0.97);
      pointer-events: none;
      flex-direction: column;
    }
    #panel-party-builder.visible {
      display: flex;
    }

    .pb-root {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      pointer-events: auto;
      font-family: "Segoe UI", system-ui, sans-serif;
      color: #d4c090;
      overflow: hidden;
    }

    /* ── Header ─────────────────────────────────────────────────────── */
    .pb-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: clamp(10px, 2vh, 16px) clamp(16px, 3vw, 32px);
      background: rgba(0,0,0,0.4);
      border-bottom: 1px solid rgba(200,160,32,0.2);
      flex-shrink: 0;
    }
    .pb-header-title {
      font-size: clamp(1rem, 2.5vw, 1.4rem);
      font-weight: 700;
      color: #c8a020;
      letter-spacing: 0.08em;
    }
    .pb-header-sub {
      font-size: clamp(0.65rem, 1.1vw, 0.78rem);
      color: #6a5a3a;
    }
    .pb-gold {
      font-size: clamp(0.78rem, 1.4vw, 0.92rem);
      color: #d4b870;
      font-weight: 600;
    }

    /* ── Content layout ─────────────────────────────────────────────── */
    .pb-content {
      flex: 1;
      display: grid;
      grid-template-columns: clamp(200px, 28vw, 300px) 1fr clamp(180px, 25vw, 280px);
      overflow: hidden;
      min-height: 0;
    }
    @media (max-width: 767px) {
      .pb-content {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        overflow-y: auto;
      }
    }

    .pb-col {
      overflow-y: auto;
      padding: clamp(12px, 2vh, 20px) clamp(12px, 2vw, 20px);
      border-right: 1px solid rgba(200,160,32,0.1);
    }
    .pb-col:last-child { border-right: none; }

    /* ── Section titles ─────────────────────────────────────────────── */
    .pb-col-title {
      font-size: clamp(0.7rem, 1.2vw, 0.85rem);
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #6a5a3a;
      margin-bottom: clamp(8px, 1.5vh, 14px);
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(200,160,32,0.15);
    }

    /* ── Character cards ─────────────────────────────────────────────── */
    .pb-char-card {
      border: 1px solid rgba(200,160,32,0.2);
      border-radius: 4px;
      padding: clamp(8px, 1.5vw, 12px);
      margin-bottom: clamp(6px, 1.2vh, 10px);
      background: rgba(200,160,32,0.04);
      transition: all 0.15s;
    }
    .pb-char-card.hero-card {
      border-color: rgba(200,160,32,0.4);
      background: rgba(200,160,32,0.08);
    }
    .pb-char-card.empty-slot {
      border-style: dashed;
      border-color: rgba(200,160,32,0.15);
      opacity: 0.5;
      text-align: center;
      font-size: 0.75rem;
      color: #5a4a2a;
      padding: 16px;
    }
    .pb-char-name {
      font-size: clamp(0.8rem, 1.4vw, 0.94rem);
      font-weight: 700;
      color: #d4b870;
      margin-bottom: 2px;
    }
    .pb-char-sub {
      font-size: clamp(0.62rem, 1vw, 0.74rem);
      color: #8a7a50;
    }
    .pb-char-class {
      font-size: clamp(0.68rem, 1.1vw, 0.8rem);
      color: #c8a020;
      font-weight: 600;
      margin-top: 3px;
    }
    .pb-char-attrs {
      display: flex;
      gap: clamp(5px, 1vw, 9px);
      margin-top: 6px;
      flex-wrap: wrap;
    }
    .pb-attr-pill {
      font-size: clamp(0.58rem, 0.95vw, 0.7rem);
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(200,160,32,0.15);
      border-radius: 3px;
      padding: 2px 5px;
      color: #8a7a50;
    }
    .pb-attr-pill strong { color: #c8a020; }
    .pb-char-controls {
      display: flex;
      gap: 6px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
    .pb-player-badge {
      font-size: clamp(0.58rem, 0.95vw, 0.7rem);
      padding: 3px 7px;
      border-radius: 2px;
      font-weight: 700;
      min-height: 28px;
      display: inline-flex;
      align-items: center;
    }
    .pb-player-badge.p1 { background: rgba(80,140,200,0.25); border:1px solid rgba(80,140,200,0.5); color: #80b4e0; }
    .pb-player-badge.p2 { background: rgba(200,80,80,0.25);  border:1px solid rgba(200,80,80,0.5);  color: #e08080; }

    /* ── Hire buttons ────────────────────────────────────────────────── */
    .pb-hire-btn, .pb-dismiss-btn {
      min-height: 36px;
      padding: 6px 12px;
      border-radius: 3px;
      cursor: pointer;
      font-size: clamp(0.64rem, 1.1vw, 0.76rem);
      font-weight: 600;
      transition: all 0.15s;
      outline: none;
      border: 1px solid rgba(200,160,32,0.3);
    }
    .pb-hire-btn {
      background: rgba(200,160,32,0.08);
      color: #c8a020;
    }
    .pb-hire-btn:hover, .pb-hire-btn:focus {
      background: rgba(200,160,32,0.15);
      border-color: rgba(200,160,32,0.6);
      color: #e8c040;
    }
    .pb-hire-btn:disabled { opacity: 0.35; cursor: default; }
    .pb-dismiss-btn {
      background: rgba(180,60,60,0.08);
      color: #b06060;
      border-color: rgba(180,60,60,0.3);
    }
    .pb-dismiss-btn:hover, .pb-dismiss-btn:focus {
      background: rgba(180,60,60,0.15);
      border-color: rgba(180,60,60,0.6);
    }

    .pb-wage-label {
      font-size: clamp(0.6rem, 1vw, 0.72rem);
      color: #6a7a5a;
      margin-top: 4px;
    }

    /* ── Scenario cards ──────────────────────────────────────────────── */
    .pb-scenario-card {
      border: 1px solid rgba(200,160,32,0.18);
      border-radius: 4px;
      padding: clamp(8px, 1.5vw, 12px);
      cursor: pointer;
      margin-bottom: clamp(6px, 1.2vh, 10px);
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      outline: none;
      width: 100%;
      text-align: left;
    }
    .pb-scenario-card:hover, .pb-scenario-card:focus {
      border-color: rgba(200,160,32,0.5);
      background: rgba(200,160,32,0.08);
    }
    .pb-scenario-card.selected {
      border-color: #c8a020;
      background: rgba(200,160,32,0.14);
    }
    .pb-scenario-name {
      font-size: clamp(0.78rem, 1.3vw, 0.9rem);
      color: #d4b870;
      font-weight: 600;
      margin-bottom: 3px;
    }
    .pb-scenario-desc {
      font-size: clamp(0.62rem, 1vw, 0.74rem);
      color: #6a5a3a;
    }

    /* ── Starting gear ───────────────────────────────────────────────── */
    .pb-gear-list {
      font-size: clamp(0.65rem, 1.1vw, 0.76rem);
      color: #7a6a40;
    }
    .pb-gear-item { padding: 2px 0; }

    /* ── Footer nav ──────────────────────────────────────────────────── */
    .pb-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: clamp(10px, 2vh, 16px) clamp(16px, 3vw, 32px);
      background: rgba(0,0,0,0.4);
      border-top: 1px solid rgba(200,160,32,0.15);
      flex-shrink: 0;
      gap: 12px;
    }
    .pb-btn {
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
    .pb-btn:hover, .pb-btn:focus {
      border-color: rgba(200,160,32,0.65);
      background: rgba(200,160,32,0.14);
      color: #e8c040;
      box-shadow: 0 0 10px rgba(200,160,32,0.2);
    }
    .pb-btn.primary {
      background: rgba(200,160,32,0.15);
      border-color: rgba(200,160,32,0.55);
      color: #e8c040;
    }
    .pb-btn.primary:hover, .pb-btn.primary:focus {
      background: rgba(200,160,32,0.25);
      box-shadow: 0 0 16px rgba(200,160,32,0.35);
    }
    .pb-status-msg {
      font-size: clamp(0.65rem, 1.1vw, 0.78rem);
      color: #6a5a3a;
    }
  `,document.head.appendChild(c)}const g=[{id:"standard",name:"Standard Start",description:"Begin at a small settlement in the midlands. Medium world, temperate climate.",params:{worldSize:"medium",climate:"temperate",magicDensity:"medium",monsterDensity:"medium"}},{id:"harsh_north",name:"Harsh North",description:"Start in the frozen north. Difficult terrain, stronger enemies, rare loot.",params:{worldSize:"medium",climate:"harsh",magicDensity:"low",monsterDensity:"high"}},{id:"magic_rich",name:"Magic-Rich Lands",description:"A world teeming with magical anomalies, rare trees, and legendary encounters.",params:{worldSize:"large",climate:"temperate",magicDensity:"high",monsterDensity:"medium"}},{id:"small_world",name:"Small World",description:"Compact map — faster completion, tighter encounters. Good for learning.",params:{worldSize:"small",climate:"temperate",magicDensity:"medium",monsterDensity:"medium"}},{id:"epic_saga",name:"Epic Saga",description:"A vast world with many factions, towns, and storylines. For experienced players.",params:{worldSize:"epic",climate:"temperate",magicDensity:"high",monsterDensity:"high"}}],S={soldier:["Iron Sword","Wooden Shield","Leather Armor"],mercenary:["Handaxe","Light Armor","50 Gold"],scholar:["Tome of Knowledge","Staff","Apprentice Robes"],healer:["Healing Potion x3","Wooden Staff","Healer's Satchel"],skald:["Skald's Lute","Dagger","Traveler's Cloak"],thief:["Dagger","Lockpick x3","Dark Cloak"],ranger:["Shortbow","Quiver (20 Arrows)","Hunting Knife"],sea_captain:["Captain's Cutlass","Navigation Charts","Sea Cloak"],runecarver:["Rune Scroll x2","Chisel","Scholar's Robes"],caravan_guard:["Spear","Horse Saddle","Wagon Deed"]};class P extends v{constructor(e,t){super("panel-party-builder",{trapFocus:!1,zLayer:"panel"}),this._heroes=e??[],this._onStart=t,this._partySlots=[...this._heroes,null,null,null,null].slice(0,4),this._hiredNPCs=[],this._gold=200,this._selectedScenario="standard",this._npcPool=[];for(let r=0;r<3;r++)this._npcPool.push(b.createNPC({level:1}))}build(){this.el.innerHTML="";const e=document.createElement("div");e.className="pb-root",e.setAttribute("role","dialog"),e.setAttribute("aria-label","Party Builder"),e.appendChild(this._buildHeader());const t=document.createElement("div");return t.className="pb-content",t.id="pb-content",this._colParty=this._buildPartyColumn(),this._colHire=this._buildHireColumn(),this._colScenario=this._buildScenarioColumn(),t.appendChild(this._colParty),t.appendChild(this._colHire),t.appendChild(this._colScenario),e.appendChild(t),e.appendChild(this._buildFooter()),this.el.appendChild(e),this}_buildHeader(){const e=document.createElement("div");return e.className="pb-header",e.innerHTML=`
      <div>
        <div class="pb-header-title">Assemble Your Party</div>
        <div class="pb-header-sub">Hire companions, choose a scenario, and set out.</div>
      </div>
      <div class="pb-gold" id="pb-gold-display">Gold: ${this._gold}</div>
    `,e}_updateGoldDisplay(){const e=document.getElementById("pb-gold-display");e&&(e.textContent=`Gold: ${this._gold}`)}_buildPartyColumn(){const e=document.createElement("div");return e.className="pb-col",e.id="pb-col-party",this._refreshPartyColumn(e),e}_refreshPartyColumn(e){if(e=e??document.getElementById("pb-col-party"),!e)return;e.innerHTML=`<div class="pb-col-title">Party (${this._partySlots.filter(Boolean).length}/4)</div>`,this._partySlots.forEach((r,a)=>{if(!r){const n=document.createElement("div");n.className="pb-char-card empty-slot",n.textContent=`Slot ${a+1} — Empty`,e.appendChild(n);return}const i=this._buildCharCard(r,a);e.appendChild(i)});const t=document.createElement("button");t.type="button",t.className="pb-hire-btn",t.style.marginTop="12px",t.style.width="100%",t.id="pb-manage-players-btn",t.textContent="Manage Player Assignments",t.addEventListener("click",()=>this._managePlayerAssignments()),e.appendChild(t)}_buildCharCard(e,t){const r=document.createElement("div");r.className="pb-char-card"+(e.isHero?" hero-card":"");const i=b.getRace(e.race)?.name??e.race;let n="";t===0&&(n='<span class="pb-player-badge p1">P1</span>'),t===1&&(n='<span class="pb-player-badge p2">P2</span>');const l=e.attributes,p=["might","agility","intellect","wisdom","endurance","presence"].map(d=>{const o=l[d]??10;return`<span class="pb-attr-pill">${d.slice(0,3).toUpperCase()} <strong>${o}</strong></span>`}).join("");if(r.innerHTML=`
      <div class="pb-char-name">${e.name} ${n}</div>
      <div class="pb-char-sub">${i} &bull; Level ${e.level}</div>
      <div class="pb-char-class">${e.class}</div>
      <div class="pb-char-attrs">${p}</div>
      ${e.isHero?"":`<div class="pb-wage-label">Wage: ${e.wage} gold/day</div>`}
    `,!e.isHero){const d=document.createElement("div");d.className="pb-char-controls";const o=document.createElement("button");o.type="button",o.className="pb-dismiss-btn",o.textContent="Dismiss",o.addEventListener("click",()=>{this._dismissNPC(e.id,t)}),d.appendChild(o),r.appendChild(d)}return r}_buildHireColumn(){const e=document.createElement("div");return e.className="pb-col",e.id="pb-col-hire",this._refreshHireColumn(e),e}_refreshHireColumn(e){if(e=e??document.getElementById("pb-col-hire"),!!e){if(e.innerHTML='<div class="pb-col-title">Tavern — Hire Companions</div>',this._npcPool.length===0){const t=document.createElement("p");t.style.cssText="font-size:0.75rem; color:#5a4a2a;",t.textContent="No more companions available in this town.",e.appendChild(t);return}if(this._npcPool.forEach(t=>{if(this._hiredNPCs.some(m=>m.id===t.id))return;const a=document.createElement("div");a.className="pb-char-card",a.style.marginBottom="10px";const n=b.getRace(t.race)?.name??t.race,l=t.wage*3,p=t.attributes,d=["might","agility","intellect","wisdom","endurance","presence"].map(m=>{const _=p[m]??10;return`<span class="pb-attr-pill">${m.slice(0,3).toUpperCase()} <strong>${_}</strong></span>`}).join("");a.innerHTML=`
        <div class="pb-char-name">${t.name}</div>
        <div class="pb-char-sub">${n} &bull; Level ${t.level}</div>
        <div class="pb-char-class">${t.class}</div>
        <div class="pb-char-attrs">${d}</div>
        <div class="pb-wage-label">Hire cost: ${l} gold &bull; Wage: ${t.wage} gold/day</div>
      `;const o=document.createElement("button");o.type="button",o.className="pb-hire-btn",o.style.marginTop="8px",o.textContent=`Hire (${l} gold)`,o.disabled=this._gold<l||this._partySlots.filter(Boolean).length>=4,o.id=`pb-hire-btn-${t.id}`,o.addEventListener("click",()=>{this._hireNPC(t,l)}),a.appendChild(o),e.appendChild(a)}),this._npcPool.every(t=>this._hiredNPCs.some(r=>r.id===t.id))){const t=document.createElement("p");t.style.cssText="font-size:0.75rem; color:#5a4a2a;",t.textContent="All available companions hired.",e.appendChild(t)}}}_hireNPC(e,t){const r=this._partySlots.findIndex(a=>a===null);if(r===-1){s.warn("[party] Cannot hire NPC: party full");return}if(this._gold<t){s.warn("[party] Cannot hire NPC: insufficient gold");return}this._gold-=t,this._hiredNPCs.push(e),this._partySlots[r]=e,s.info(`[party] Hired NPC; name=${e.name} cost=${t} gold=${this._gold}`),this._updateGoldDisplay(),this._refreshPartyColumn(),this._refreshHireColumn(),this._updateStartButton()}_dismissNPC(e,t){const r=this._hiredNPCs.find(i=>i.id===e);if(!r)return;this._hiredNPCs=this._hiredNPCs.filter(i=>i.id!==e),this._partySlots[t]=null;const a=this._partySlots.filter(Boolean);this._partySlots=[...a,null,null,null,null].slice(0,4),s.info(`[party] Dismissed NPC; name=${r.name}`),this._refreshPartyColumn(),this._refreshHireColumn(),this._updateStartButton()}_buildScenarioColumn(){const e=document.createElement("div");e.className="pb-col",e.id="pb-col-scenario",e.innerHTML='<div class="pb-col-title">Starting Scenario</div>',g.forEach(a=>{const i=document.createElement("button");i.type="button",i.className="pb-scenario-card"+(this._selectedScenario===a.id?" selected":""),i.dataset.scenarioId=a.id,i.innerHTML=`
        <div class="pb-scenario-name">${a.name}</div>
        <div class="pb-scenario-desc">${a.description}</div>
      `,i.addEventListener("click",()=>{this._selectedScenario=a.id,e.querySelectorAll(".pb-scenario-card").forEach(n=>n.classList.remove("selected")),i.classList.add("selected"),this._refreshGearList(e)}),e.appendChild(i)});const t=document.createElement("div");t.className="pb-col-title",t.style.marginTop="16px",t.textContent="Starting Gear",t.id="pb-gear-title",e.appendChild(t);const r=document.createElement("div");return r.className="pb-gear-list",r.id="pb-gear-list",e.appendChild(r),this._refreshGearList(e),e}_refreshGearList(e){e=e??document.getElementById("pb-col-scenario");const t=e?.querySelector("#pb-gear-list")??document.getElementById("pb-gear-list");if(!t)return;t.innerHTML="";const r=this._partySlots.filter(a=>a&&a.isHero);if(r.length===0){t.innerHTML='<div class="pb-gear-item" style="color:#5a4a2a;">No heroes in party.</div>';return}r.forEach(a=>{const i=a.background?.adult??"soldier",n=S[i]??["Basic Sword","Travel Rations"],l=document.createElement("div");l.style.marginBottom="8px",l.innerHTML=`
        <div style="font-size:0.7rem; color:#8a7a50; margin-bottom:3px;">${a.name}</div>
        ${n.map(p=>`<div class="pb-gear-item">• ${p}</div>`).join("")}
      `,t.appendChild(l)})}_managePlayerAssignments(){if(this._partySlots.filter(Boolean).length<2){s.info("[party] Only one party member — P1 assignment unchanged");return}const t=this._partySlots[0];this._partySlots[0]=this._partySlots[1],this._partySlots[1]=t,this._refreshPartyColumn(),s.info("[party] Player assignments swapped")}_buildFooter(){const e=document.createElement("div");e.className="pb-footer";const t=document.createElement("button");return t.type="button",t.className="pb-btn",t.textContent="Back to Character Creation",t.addEventListener("click",()=>{s.info("[party] Back to charCreate"),u.transition("charCreate")}),this._statusMsg=document.createElement("span"),this._statusMsg.className="pb-status-msg",this._statusMsg.textContent="Choose a scenario and start your adventure.",this._startBtn=document.createElement("button"),this._startBtn.type="button",this._startBtn.className="pb-btn primary",this._startBtn.id="pb-btn-start",this._startBtn.textContent="Start Adventure",this._startBtn.addEventListener("click",()=>this._startAdventure()),this._updateStartButton(),e.appendChild(t),e.appendChild(this._statusMsg),e.appendChild(this._startBtn),e}_updateStartButton(){if(!this._startBtn)return;const e=this._partySlots.some(t=>t&&t.isHero);this._startBtn.disabled=!e}_startAdventure(){const e=this._partySlots.filter(Boolean);if(e.length===0){s.warn("[party] Cannot start — no party members");return}const t=g.find(n=>n.id===this._selectedScenario)??g[0],r=Date.now(),a={...t.params,seed:r,startingRegionLevel:1};s.info(`[party] Starting adventure; scenario=${t.id} seed=${r} party=${e.length}`);let i;try{i=w.generate(a)}catch(n){s.error(`[party] WorldGenerator failed: ${n.message}`);return}y.init(i),h.autoAssign(),y.playerCount=h.getPlayerCount(),window.__characterSystem=b,window.__coopSystem=h,x.emit("party:set",{party:e,gold:this._gold}),this._onStart&&this._onStart({party:e,worldData:i,gold:this._gold}),u.transition("localMap",{regionId:i.startRegionId})}destroy(){super.destroy()}}class L{constructor(){this._panel=null}async init({heroes:e=[]}={}){s.info("[boot] PartyBuilderScene init"),C(),window.__debug||(window.__debug={}),window.__debug.currentScene="partyBuilder",this._panel=new P(e,({party:t,worldData:r,gold:a})=>{s.info(`[party] Adventure started; partySize=${t.length} gold=${a}`)}),this._panel.build(),this._panel.show(),s.info("[boot] PartyBuilderScene ready")}update(e){}async destroy(){s.info("[boot] PartyBuilderScene destroy"),this._panel&&(this._panel.destroy(),this._panel=null),window.__debug&&window.__debug.currentScene==="partyBuilder"&&(window.__debug.currentScene=null)}}export{L as default};
//# sourceMappingURL=PartyBuilderScene-BVLkix62.js.map
