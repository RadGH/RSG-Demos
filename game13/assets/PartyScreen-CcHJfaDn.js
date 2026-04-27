const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/StatsScreen-B5ppJSCs.js","assets/play-Oril8T6T.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/savesClient-Dh5r3e2b.js","assets/version-C4IQLAhU.js","assets/play-DqUlc1fr.css"])))=>i.map(i=>d[i]);
import{r as k,i as A,c as S,h as $,G as d,j as y,p as M,_ as C,k as f,l as _,n as L,C as E}from"./play-Oril8T6T.js";import{InventoryScreen as z}from"./InventoryScreen-wW6N4Lkn.js";import"./modulepreload-polyfill-B5Qt9EMX.js";import"./savesClient-Dh5r3e2b.js";import"./version-C4IQLAhU.js";function b(r){return r?!!r.isCompanion||r.class==="companion":!1}const H=`
.party-screen {
  position: absolute; inset: 0; background: rgba(4,2,10,0.97);
  display: flex; flex-direction: column; overflow: hidden; color: #e8e0d0;
  font-family: 'Cinzel', Georgia, serif;
}
.ps-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1rem 0.5rem; border-bottom: 1px solid rgba(255,200,80,0.25);
  flex-shrink: 0;
}
.ps-title { font-size: 1.1rem; color: #e8c840; letter-spacing: 0.1em; }
.ps-close {
  background: none; border: 1px solid rgba(255,200,80,0.4); color: #e8c840;
  padding: 0.35rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;
  font-family: inherit;
}
.ps-body {
  flex: 1; overflow-y: auto; padding: 0.75rem;
  display: flex; flex-direction: column; gap: 0.75rem;
}
.ps-section-title {
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em;
  color: rgba(232,200,64,0.7); margin-bottom: 0.25rem;
}
.ps-slots {
  display: grid; grid-template-columns: 1fr; gap: 0.4rem;
}
@media (min-width: 560px) {
  .ps-slots { grid-template-columns: 1fr 1fr; }
}
.ps-slot {
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer;
  transition: border-color 0.15s;
}
.ps-slot:hover { border-color: rgba(232,200,64,0.5); }
.ps-slot.ps-selected { border-color: #e8c840; background: rgba(232,200,64,0.1); }
.ps-slot.ps-empty {
  border-style: dashed; border-color: rgba(255,255,255,0.15);
  cursor: default; opacity: 0.5;
}
.ps-slot-icon {
  width: 80px; height: 80px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; background: rgba(255,255,255,0.08); overflow: hidden;
  padding: 5px; box-sizing: border-box;
}
.ps-slot-icon .char-portrait {
  border-radius: 6px; background: rgba(255,255,255,0.06);
  width: 100% !important; height: 100% !important;
}
.ps-slot-class-icon { margin-left: 4px; display: inline-flex; vertical-align: middle; }
.ps-slot-info { flex: 1; min-width: 0; }
.ps-slot-name { font-size: 0.9rem; font-weight: 700; color: #f0e8d8; }
.ps-slot-class { font-size: 0.72rem; color: rgba(200,180,140,0.7); text-transform: uppercase; letter-spacing: 0.08em; }
.ps-slot-stats { font-size: 0.72rem; color: rgba(200,180,140,0.6); margin-top: 0.15rem; }
.ps-slot-badge { display: none; }
.ps-columns { display: flex; flex-direction: column; gap: 0.75rem; }
@media (min-width: 760px) {
  .ps-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: start; }
  .ps-col { display: flex; flex-direction: column; gap: 0.75rem; }
}
.ps-detail {
  margin-top: 0.5rem; padding: 0.6rem 0.75rem; background: rgba(232,200,64,0.06);
  border: 1px solid rgba(232,200,64,0.3); border-radius: 6px;
}
.ps-detail-title { color: #e8c840; font-size: 0.85rem; margin-bottom: 0.35rem; }
.ps-detail-btns { display: flex; gap: 0.4rem; }
.ps-detail-btn {
  background: rgba(232,200,64,0.15); border: 1px solid rgba(232,200,64,0.5);
  color: #e8c840; padding: 0.35rem 0.75rem; border-radius: 4px; cursor: pointer;
  font-family: inherit; font-size: 0.72rem;
}
.ps-action-bar {
  flex-shrink: 0; padding: 0.75rem; display: flex; gap: 0.5rem; justify-content: center;
  border-top: 1px solid rgba(255,200,80,0.15);
}
.ps-btn {
  background: rgba(232,200,64,0.15); border: 1px solid rgba(232,200,64,0.5);
  color: #e8c840; padding: 0.5rem 1.2rem; border-radius: 5px; cursor: pointer;
  font-family: inherit; font-size: 0.85rem;
}
.ps-btn:hover { background: rgba(232,200,64,0.25); }
.ps-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ps-hint {
  font-size: 0.72rem; color: rgba(200,180,140,0.55); text-align: center;
  padding: 0.35rem 0; font-family: sans-serif; letter-spacing: 0;
}
.ps-divider { height: 1px; background: rgba(255,200,80,0.12); margin: 0.25rem 0; }
.ps-slot-actions { display: flex; gap: 0.3rem; flex-shrink: 0; }
.ps-slot-btn {
  font-family: inherit; font-size: 0.65rem; padding: 0.25rem 0.5rem; border-radius: 4px;
  cursor: pointer; border: 1px solid; background: none; white-space: nowrap;
}
.ps-slot-btn.dismiss { color: #c08040; border-color: rgba(192,128,64,0.5); }
.ps-slot-btn.dismiss:hover { background: rgba(192,128,64,0.15); }
.ps-slot-btn.recruit { color: #60c060; border-color: rgba(96,192,96,0.5); }
.ps-slot-btn.recruit:hover { background: rgba(96,192,96,0.15); }
.ps-slot-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ps-toast {
  position: absolute; bottom: 5rem; left: 50%; transform: translateX(-50%);
  background: rgba(20,12,28,0.95); border: 1px solid rgba(232,200,64,0.4);
  color: #e8c840; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.78rem;
  pointer-events: none; z-index: 10; animation: ps-fade 2s ease-out forwards;
}
@keyframes ps-fade { 0%{opacity:1} 70%{opacity:1} 100%{opacity:0} }
.ps-role-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; border-radius: 3px;
  background: rgba(120,120,120,0.18);
  border: 1px solid rgba(120,120,120,0.35);
  vertical-align: middle; margin-left: 3px; cursor: default;
  flex-shrink: 0; opacity: 0.92;
}
`,I={tank:{label:"Tank",color:"#4080c0",svg:'<rect x="3" y="7" width="8" height="7" rx="1"/><path d="M7 3L3 7h8z"/>'},healer:{label:"Healer",color:"#40c080",svg:'<path d="M7 3v8M3 7h8"/>'},support:{label:"Support",color:"#c8a020",svg:'<path d="M7 2l1.5 4H13l-3.5 2.5 1.3 4L7 10 3.2 12.5l1.3-4L1 6h4.5z"/>'},dps:{label:"DPS",color:"#c04040",svg:'<path d="M3 11L11 3M9 3h2v2"/><path d="M3 11l3-1 1-3"/>'}};function T(r){if(!r.class||r.class==="companion"||r.isCompanion)return null;const e=E.find(o=>o.id===r.class),t=(e==null?void 0:e.role)||"";return/tank|front|wall|fortress/i.test(t)?"tank":/heal|cleric|medic|restor/i.test(t)?"healer":/support|buff|maestro|bard|shaman/i.test(t)?"support":"dps"}function P(r){const e=T(r);if(!e)return"";const t=I[e];return`<span class="ps-role-badge" title="${t.label}" aria-label="Role: ${t.label}" style="--rb-color:${t.color}"><svg viewBox="0 0 14 14" width="14" height="14" fill="${t.color}" stroke="${t.color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t.svg}</svg></span>${L("role_badges")}`}function j(r){const e=Math.round((r.hp||0)/(r.maxHp||1)*100),t=e>60?"#60c060":e>30?"#e8c840":"#e06040",o=typeof r.hp=="number"?Math.floor(r.hp):r.hp??"?",n=typeof r.maxHp=="number"?Math.floor(r.maxHp):r.maxHp??"?";return`HP: <span style="color:${t}">${o}/${n}</span>`}class G{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedA=null}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){k(this._el),this._el=null}_build(){A("party-screen-styles",H),this._el=S("div","party-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){return $(this._el,()=>this._renderImpl())}_renderImpl(){var i;const e=d.get(),t=e.bench||[],o=t.filter(s=>!b(s)),n=t.filter(s=>b(s)),p=`
      <div class="ps-col">
        <div class="ps-section-title">Active Heroes (${e.party.length}/4)</div>
        <div class="ps-slots">
          ${e.party.map((s,a)=>this._slotHTML(s,"party",a)).join("")}
          ${e.party.length<4?'<div class="ps-slot ps-empty"><div class="ps-slot-icon">＋</div><div class="ps-slot-info" style="color:rgba(200,180,140,0.4)">Empty slot</div></div>':""}
        </div>
        <div class="ps-section-title">Inactive Heroes (${o.length})</div>
        <div class="ps-slots">
          ${o.length>0?o.map(s=>this._slotHTML(s,"bench",t.indexOf(s))).join(""):'<div class="ps-hint">No inactive heroes.</div>'}
        </div>
      </div>`,l=`
      <div class="ps-col">
        <div class="ps-section-title">Companions (${e.companions.length}/4)</div>
        <div class="ps-slots">
          ${e.companions.length>0?e.companions.map((s,a)=>this._slotHTML(s,"companions",a)).join(""):'<div class="ps-hint">No companions.</div>'}
        </div>
        <div class="ps-section-title">Inactive Companions (${n.length})</div>
        <div class="ps-slots">
          ${n.length>0?n.map(s=>this._slotHTML(s,"bench",t.indexOf(s))).join(""):'<div class="ps-hint">No inactive companions.</div>'}
        </div>
      </div>`;this._el.innerHTML=`
      <div class="ps-header">
        <div class="ps-title">Party Management</div>
        <button type="button" class="ps-close" id="ps-close">✕ Close</button>
      </div>
      <div class="ps-body">
        <div class="ps-columns">${p}${l}</div>
        ${this._selectedA?this._detailHTML():""}
      </div>
      <div class="ps-action-bar">
        <button type="button" class="ps-btn" id="ps-swap" ${this._canSwap()?"":"disabled"}>⇄ Swap</button>
        <button type="button" class="ps-btn" id="ps-move-up" ${this._canMoveUp()?"":"disabled"}>↑ Up</button>
        <button type="button" class="ps-btn" id="ps-move-down" ${this._canMoveDown()?"":"disabled"}>↓ Down</button>
        <button type="button" class="ps-btn" id="ps-stats"><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="1" y="7" width="2" height="4"/><rect x="5" y="4" width="2" height="7"/><rect x="9" y="1" width="2" height="10"/></svg> Stats</button>
      </div>
      <div class="ps-hint">${this._selectedA?"✓ Selected: "+((i=this._getSelected())==null?void 0:i.name)+" — select another to swap, or use Up/Down to reorder.":"Tap a hero to select them."}</div>
    `,this._wire()}_detailHTML(){const e=this._getSelected();return e?`
      <div class="ps-detail">
        <div class="ps-detail-title">${e.name} ${y(e,14,"ps-slot-class-icon")} — ${e.className||e.class} Lv.${e.level||1}</div>
        <div class="ps-detail-btns">
          <button type="button" class="ps-detail-btn" id="ps-detail-skills">Skills</button>
          <button type="button" class="ps-detail-btn" id="ps-detail-inv">Inventory</button>
        </div>
      </div>`:""}_slotHTML(e,t,o){const n=this._selectedA&&this._selectedA.source===t&&this._selectedA.index===o,p=t==="bench"?"reserve":t==="companions"?"companion":"party",l=d.get(),i=t==="party"&&l.party.length>1||t==="companions",s=e.isCompanion||e.class==="companion",a=t==="bench"&&(s?l.companions.length<4:l.party.length<4);return`<div class="ps-slot${n?" ps-selected":""}" data-source="${t}" data-index="${o}">
      <div class="ps-slot-icon">${M(e,32)}</div>
      <div class="ps-slot-info">
        <div class="ps-slot-name">${e.name}${e.isPet&&e.ownerName?` (${e.ownerName}'s pet)`:""} ${y(e,14,"ps-slot-class-icon")}${P(e)}</div>
        <div class="ps-slot-class">${e.class||"companion"} · Lv.${e.level||1}</div>
        <div class="ps-slot-stats">${j(e)} · MP: ${e.mp??"?"}/${e.maxMp??"?"}</div>
      </div>
      <div class="ps-slot-actions">
        ${i?`<button type="button" class="ps-slot-btn dismiss" data-dismiss="${t}:${o}">Stand Down</button>`:""}
        ${a?`<button type="button" class="ps-slot-btn recruit" data-recruit="${o}">Add to Party</button>`:""}
      </div>
      <div class="ps-slot-badge${t==="bench"?" bench":""}">${p}</div>
    </div>`}_wire(){var n,p,l;this._el.querySelector("#ps-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(n=this._el.querySelector("#ps-stats"))==null||n.addEventListener("click",async()=>{this.audio.playSfx("click");const{StatsScreen:i}=await C(async()=>{const{StatsScreen:s}=await import("./StatsScreen-B5ppJSCs.js");return{StatsScreen:s}},__vite__mapDeps([0,1,2,3,4,5]));this.manager.push(new i(this.manager,this.audio,{tab:"party"}))}),this._el.querySelectorAll(".ps-slot[data-source]").forEach(i=>{i.addEventListener("click",()=>{const s=i.dataset.source,a=parseInt(i.dataset.index);this._onSlotClick(s,a)})}),this._el.querySelectorAll("[data-dismiss]").forEach(i=>{i.addEventListener("click",s=>{s.stopPropagation();const[a,h]=i.dataset.dismiss.split(":"),u=parseInt(h),c=d.get(),x=a==="party"?c.party:c.companions;if(a==="party"&&c.party.length<=1)return;const[g]=x.splice(u,1);if(c.bench=c.bench||[],c.bench.push(g),!g.isCompanion&&g.id){const v=m=>m.isPet&&m.ownerId===g.id,w=c.companions.filter(v);c.companions=c.companions.filter(m=>!v(m));for(const m of w)c.bench.push(m)}this._selectedA=null,this.audio.playSfx("click"),f.saveCurrentGame(),this._render()})}),this._el.querySelectorAll("[data-recruit]").forEach(i=>{i.addEventListener("click",s=>{s.stopPropagation();const a=parseInt(i.dataset.recruit),h=d.get(),[u]=h.bench.splice(a,1);if(u.isCompanion||u.class==="companion"){if(h.companions.length>=4)return;h.companions.push(u)}else{if(h.party.length>=4)return;h.party.push(u)}this._selectedA=null,this.audio.playSfx("click"),f.saveCurrentGame(),this._render()})}),(p=this._el.querySelector("#ps-detail-skills"))==null||p.addEventListener("click",()=>{const i=this._getSelected();if(!i)return;this.audio.playSfx("click");const s=d.get(),a=s.party.indexOf(i);s.companions.indexOf(i),a>=0?this.manager.push(new _(this.manager,this.audio)):(s.inventoryContext="party-inactive",this.manager.push(new _(this.manager,this.audio)))}),(l=this._el.querySelector("#ps-detail-inv"))==null||l.addEventListener("click",()=>{const i=this._getSelected();if(!i)return;this.audio.playSfx("click");const s=d.get(),a=s.party.includes(i)||s.companions.includes(i);s.inventoryContext=a?"default":"party-inactive",s.inventoryFocusId=i.id,this.manager.push(new z(this.manager,this.audio))});const e=this._el.querySelector("#ps-swap");e&&!e.disabled&&e.addEventListener("click",()=>this._doSwap());const t=this._el.querySelector("#ps-move-up");t&&!t.disabled&&t.addEventListener("click",()=>this._doMove(-1));const o=this._el.querySelector("#ps-move-down");o&&!o.disabled&&o.addEventListener("click",()=>this._doMove(1))}_onSlotClick(e,t){if(!this._selectedA)this._selectedA={source:e,index:t};else if(this._selectedA.source===e&&this._selectedA.index===t)this._selectedA=null;else{this._doSwapWith({source:e,index:t});return}this._render()}_getSelected(){if(!this._selectedA)return null;const e=d.get();return(this._selectedA.source==="party"?e.party:this._selectedA.source==="companions"?e.companions:e.bench)[this._selectedA.index]}_canSwap(){return this._selectedA!==null}_canMoveUp(){return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index>0}_canMoveDown(){const e=d.get();return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index<e.party.length-1}_doSwap(){const e=d.get();if(!this._selectedA||e.bench.length===0)return;const t=this._selectedA.source==="party"?e.party:e.companions,o=t[this._selectedA.index],n=e.bench[0];t[this._selectedA.index]=n,e.bench[0]=o,e.bench.splice(0,1,o),this._selectedA=null,this._autosave(),this._render()}_doSwapWith(e){const t=d.get(),o=a=>a==="party"?t.party:a==="companions"?t.companions:t.bench,n=o(this._selectedA.source),p=o(e.source),l=n[this._selectedA.index],i=p[e.index];if(this._selectedA.source==="companions"&&i&&!b(i)){this._selectedA=null,this._render();return}if(e.source==="companions"&&l&&!b(l)){this._selectedA=null,this._render();return}if(this._selectedA.source==="party"&&i&&b(i)){this._selectedA=null,this._render();return}if(e.source==="party"&&l&&b(l)){this._selectedA=null,this._render();return}const s=n[this._selectedA.index];n[this._selectedA.index]=p[e.index],p[e.index]=s,t.party=t.party.filter(Boolean),t.companions=t.companions.filter(Boolean),this._selectedA=null,this._autosave(),this._render()}_autosave(){try{f.saveCurrentGame()}catch{}}_doMove(e){const t=d.get();if(!this._selectedA||this._selectedA.source!=="party")return;const o=this._selectedA.index,n=o+e;n<0||n>=t.party.length||([t.party[o],t.party[n]]=[t.party[n],t.party[o]],this._selectedA.index=n,this._render())}}export{G as PartyScreen,b as isCompanionEntity};
