const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/StatsScreen-BSKKLQKG.js","assets/play-BOH4PgaX.js","assets/savesClient-DUFjgBxb.js","assets/play-DKrf1LXQ.css"])))=>i.map(i=>d[i]);
import{r as k,i as $,c as A,h as S,G as h,j as _,k as y,p as M,_ as L,P as E,n as C,x as P,l as N,C as z}from"./play-BOH4PgaX.js";import"./savesClient-DUFjgBxb.js";function g(a){return a?!!a.isCompanion||a.class==="companion":!1}const H=`
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
/* M337 — XP progress strip beneath HP/MP. Hover reveals current/next-level
   target via the title attribute set in _xpBar(). */
.ps-xp-bar { height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; margin-top: 0.3rem; overflow: hidden; }
.ps-xp-fill { height: 100%; background: linear-gradient(90deg, #6da0e0, #b080ff); border-radius: 2px; transition: width 0.25s ease; }
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
.ps-detail-title { color: #e8c840; font-size: 0.85rem; margin-bottom: 0.35rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; }
.ps-rename-display { cursor: text; padding: 1px 4px; border-radius: 3px; border: 1px dashed transparent; }
.ps-rename-display:hover, .ps-rename-display:focus { border-color: rgba(232,200,64,0.5); outline: none; }
.ps-rename-input {
  font-family: inherit; font-size: 0.85rem; color: #f0e8d8;
  background: rgba(0,0,0,0.5); border: 1px solid rgba(232,200,64,0.55);
  border-radius: 3px; padding: 2px 6px; min-height: 28px; min-width: 9rem;
}
.ps-default-name { font-size: 0.65rem; color: rgba(232,200,64,0.55); font-style: italic; letter-spacing: 0.04em; }
.ps-detail-btns { display: flex; gap: 0.4rem; flex-wrap: wrap; }
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
`,I={tank:{label:"Tank",color:"#4080c0",svg:'<rect x="3" y="7" width="8" height="7" rx="1"/><path d="M7 3L3 7h8z"/>'},healer:{label:"Healer",color:"#40c080",svg:'<path d="M7 3v8M3 7h8"/>'},support:{label:"Support",color:"#c8a020",svg:'<path d="M7 2l1.5 4H13l-3.5 2.5 1.3 4L7 10 3.2 12.5l1.3-4L1 6h4.5z"/>'},dps:{label:"DPS",color:"#c04040",svg:'<path d="M3 11L11 3M9 3h2v2"/><path d="M3 11l3-1 1-3"/>'}};function T(a){if(!a.class||a.class==="companion"||a.isCompanion)return null;const e=z.find(s=>s.id===a.class),t=(e==null?void 0:e.role)||"";return/tank|front|wall|fortress/i.test(t)?"tank":/heal|cleric|medic|restor/i.test(t)?"healer":/support|buff|maestro|bard|shaman/i.test(t)?"support":"dps"}function q(a){const e=T(a);if(!e)return"";const t=I[e];return`<span class="ps-role-badge" title="${t.label}" aria-label="Role: ${t.label}" style="--rb-color:${t.color}"><svg viewBox="0 0 14 14" width="14" height="14" fill="${t.color}" stroke="${t.color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t.svg}</svg></span>${C("role_badges")}`}function R(a){const e=Math.round((a.hp||0)/(a.maxHp||1)*100),t=e>60?"#60c060":e>30?"#e8c840":"#e06040",s=typeof a.hp=="number"?Math.floor(a.hp):a.hp??"?",n=typeof a.maxHp=="number"?Math.floor(a.maxHp):a.maxHp??"?";return`HP: <span style="color:${t}">${s}/${n}</span>`}function B(a){if(!a||a.isCompanion||a.class==="companion")return"";const e=a.level||1,t=a.xp||0,s=P(e),n=N(e);if(n==null)return`<div class="ps-xp-bar" title="MAX (Level ${e})"><div class="ps-xp-fill" style="width:100%"></div></div>`;const l=Math.max(1,n-s),c=Math.max(0,t-s),r=Math.max(0,Math.min(100,Math.round(c/l*100)));return`<div class="ps-xp-bar" title="${`XP: ${t} / ${n} (Level ${e} → ${e+1})`}"><div class="ps-xp-fill" style="width:${r}%"></div></div>`}class G{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedA=null}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){k(this._el),this._el=null}_build(){$("party-screen-styles",H),this._el=A("div","party-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){return S(this._el,()=>this._renderImpl())}_renderImpl(){var r;const e=h.get(),t=e.bench||[],s=t.filter(i=>!g(i)),n=t.filter(i=>g(i)),l=`
      <div class="ps-col">
        <div class="ps-section-title">Active Heroes (${e.party.length}/4)</div>
        <div class="ps-slots">
          ${e.party.map((i,o)=>this._slotHTML(i,"party",o)).join("")}
          ${e.party.length<4?'<div class="ps-slot ps-empty"><div class="ps-slot-icon">＋</div><div class="ps-slot-info" style="color:rgba(200,180,140,0.4)">Empty slot</div></div>':""}
        </div>
        <div class="ps-section-title">Inactive Heroes (${s.length})</div>
        <div class="ps-slots">
          ${s.length>0?s.map(i=>this._slotHTML(i,"bench",t.indexOf(i))).join(""):'<div class="ps-hint">No inactive heroes.</div>'}
        </div>
      </div>`,c=`
      <div class="ps-col">
        <div class="ps-section-title">Companions (${e.companions.length}/4)</div>
        <div class="ps-slots">
          ${e.companions.length>0?e.companions.map((i,o)=>this._slotHTML(i,"companions",o)).join(""):'<div class="ps-hint">No companions.</div>'}
        </div>
        <div class="ps-section-title">Inactive Companions (${n.length})</div>
        <div class="ps-slots">
          ${n.length>0?n.map(i=>this._slotHTML(i,"bench",t.indexOf(i))).join(""):'<div class="ps-hint">No inactive companions.</div>'}
        </div>
      </div>`;this._el.innerHTML=`
      <div class="ps-header">
        <div class="ps-title">Party Management</div>
        <button type="button" class="ps-close" id="ps-close">✕ Close</button>
      </div>
      <div class="ps-body">
        <div class="ps-columns">${l}${c}</div>
        ${this._selectedA?this._detailHTML():""}
      </div>
      <div class="ps-action-bar">
        <button type="button" class="ps-btn" id="ps-swap" ${this._canSwap()?"":"disabled"}>⇄ Swap</button>
        <button type="button" class="ps-btn" id="ps-move-up" ${this._canMoveUp()?"":"disabled"}>↑ Up</button>
        <button type="button" class="ps-btn" id="ps-move-down" ${this._canMoveDown()?"":"disabled"}>↓ Down</button>
        <button type="button" class="ps-btn" id="ps-stats"><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="1" y="7" width="2" height="4"/><rect x="5" y="4" width="2" height="7"/><rect x="9" y="1" width="2" height="10"/></svg> Stats</button>
      </div>
      <div class="ps-hint">${this._selectedA?"✓ Selected: "+((r=this._getSelected())==null?void 0:r.name)+" — select another to swap, or use Up/Down to reorder.":"Tap a hero to select them."}</div>
    `,this._wire()}_detailHTML(){const e=this._getSelected();if(!e)return"";const t=e.defaultName||e.name,s=e.customName&&e.customName!==t?`<span class="ps-default-name" title="Default name (cleared if rename is left blank)">orig: ${t}</span>`:"";return`
      <div class="ps-detail">
        <div class="ps-detail-title">
          <span id="ps-rename-display" class="ps-rename-display" tabindex="0" role="button" aria-label="Rename ${e.name}" title="Tap name to rename">${e.name}</span>
          <input type="text" id="ps-rename-input" class="ps-rename-input" value="${(e.customName||"").replace(/"/g,"&quot;")}" placeholder="${t}" maxlength="24" hidden>
          ${_(e,14,"ps-slot-class-icon")} — ${e.className||e.class} Lv.${e.level||1}
          ${s}
        </div>
        <div class="ps-detail-btns">
          <button type="button" class="ps-detail-btn" id="ps-detail-rename">Rename</button>
          <button type="button" class="ps-detail-btn" id="ps-detail-skills">Skills</button>
          <button type="button" class="ps-detail-btn" id="ps-detail-inv">Inventory</button>
        </div>
      </div>`}_commitRename(e){var n,l;const t=this._getSelected();if(!t||!e)return;const s=(e.value||"").trim();t.defaultName||(t.defaultName=t.name),s?s===t.defaultName?(t.customName="",t.name=t.defaultName):(t.customName=s,t.name=s):(t.customName="",t.name=t.defaultName);try{(l=(n=y).saveCurrentGame)==null||l.call(n)}catch{}this._render()}_wireRename(){const e=this._el;if(!e)return;const t=e.querySelector("#ps-rename-display"),s=e.querySelector("#ps-rename-input"),n=e.querySelector("#ps-detail-rename");if(!t||!s)return;const l=()=>{t.hidden=!0,s.hidden=!1,s.focus(),s.select()},c=()=>{s.hidden=!0,t.hidden=!1};t.addEventListener("click",l),t.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),l())}),n==null||n.addEventListener("click",()=>{var r,i;(i=(r=this.audio)==null?void 0:r.playSfx)==null||i.call(r,"click"),l()}),s.addEventListener("keydown",r=>{r.key==="Enter"?(r.preventDefault(),this._commitRename(s)):r.key==="Escape"&&(r.preventDefault(),c())}),s.addEventListener("blur",()=>{this._commitRename(s)})}_slotHTML(e,t,s){const n=this._selectedA&&this._selectedA.source===t&&this._selectedA.index===s,l=t==="bench"?"reserve":t==="companions"?"companion":"party",c=h.get(),r=t==="party"&&c.party.length>1||t==="companions",i=e.isCompanion||e.class==="companion",o=t==="bench"&&(i?c.companions.length<4:c.party.length<4);return`<div class="ps-slot${n?" ps-selected":""}" data-source="${t}" data-index="${s}">
      <div class="ps-slot-icon">${M(e,32)}</div>
      <div class="ps-slot-info">
        <div class="ps-slot-name">${e.name}${e.isPet&&e.ownerName?` (${e.ownerName}'s pet)`:""} ${_(e,14,"ps-slot-class-icon")}${q(e)}</div>
        <div class="ps-slot-class">${e.class||"companion"} · Lv.${e.level||1}</div>
        <div class="ps-slot-stats">${R(e)} · MP: ${e.mp??"?"}/${e.maxMp??"?"}</div>
        ${B(e)}
      </div>
      <div class="ps-slot-actions">
        ${r?`<button type="button" class="ps-slot-btn dismiss" data-dismiss="${t}:${s}">Stand Down</button>`:""}
        ${o?`<button type="button" class="ps-slot-btn recruit" data-recruit="${s}">Add to Party</button>`:""}
      </div>
      <div class="ps-slot-badge${t==="bench"?" bench":""}">${l}</div>
    </div>`}_wire(){var l,c,r;this._el.querySelector("#ps-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(l=this._el.querySelector("#ps-stats"))==null||l.addEventListener("click",async()=>{this.audio.playSfx("click");const{StatsScreen:i}=await L(async()=>{const{StatsScreen:o}=await import("./StatsScreen-BSKKLQKG.js");return{StatsScreen:o}},__vite__mapDeps([0,1,2,3]));this.manager.push(new i(this.manager,this.audio,{tab:"party"}))}),this._wireRename(),this._el.querySelectorAll(".ps-slot[data-source]").forEach(i=>{i.addEventListener("click",()=>{const o=i.dataset.source,d=parseInt(i.dataset.index);this._onSlotClick(o,d)})}),this._el.querySelectorAll("[data-dismiss]").forEach(i=>{i.addEventListener("click",o=>{o.stopPropagation();const[d,u]=i.dataset.dismiss.split(":"),m=parseInt(u),p=h.get(),f=d==="party"?p.party:p.companions;if(d==="party"&&p.party.length<=1)return;const[v]=f.splice(m,1);if(p.bench=p.bench||[],p.bench.push(v),!v.isCompanion&&v.id){const x=b=>b.isPet&&b.ownerId===v.id,w=p.companions.filter(x);p.companions=p.companions.filter(b=>!x(b));for(const b of w)p.bench.push(b)}this._selectedA=null,this.audio.playSfx("click"),y.saveCurrentGame(),this._render()})}),this._el.querySelectorAll("[data-recruit]").forEach(i=>{i.addEventListener("click",o=>{o.stopPropagation();const d=parseInt(i.dataset.recruit),u=h.get(),[m]=u.bench.splice(d,1);if(m.isCompanion||m.class==="companion"){if(u.companions.length>=4)return;u.companions.push(m)}else{if(u.party.length>=4)return;u.party.push(m)}this._selectedA=null,this.audio.playSfx("click"),y.saveCurrentGame(),this._render()})});const e=i=>{const o=this._getSelected();if(!o)return;this.audio.playSfx("click");const d=h.get(),u=d.party.includes(o)||d.companions.includes(o);d.inventoryContext=u?"default":"party-inactive",d.inventoryFocusId=o.id;const m=[...d.party||[],...d.companions||[]],p=Math.max(0,m.findIndex(f=>f&&f.id===o.id));this.manager.push(new E(this.manager,this.audio,{tab:i,charIdx:p}))};(c=this._el.querySelector("#ps-detail-skills"))==null||c.addEventListener("click",()=>e("spells")),(r=this._el.querySelector("#ps-detail-inv"))==null||r.addEventListener("click",()=>e("inventory"));const t=this._el.querySelector("#ps-swap");t&&!t.disabled&&t.addEventListener("click",()=>this._doSwap());const s=this._el.querySelector("#ps-move-up");s&&!s.disabled&&s.addEventListener("click",()=>this._doMove(-1));const n=this._el.querySelector("#ps-move-down");n&&!n.disabled&&n.addEventListener("click",()=>this._doMove(1))}_onSlotClick(e,t){if(!this._selectedA)this._selectedA={source:e,index:t};else if(this._selectedA.source===e&&this._selectedA.index===t)this._selectedA=null;else{this._doSwapWith({source:e,index:t});return}this._render()}_getSelected(){if(!this._selectedA)return null;const e=h.get();return(this._selectedA.source==="party"?e.party:this._selectedA.source==="companions"?e.companions:e.bench)[this._selectedA.index]}_canSwap(){return this._selectedA!==null}_canMoveUp(){return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index>0}_canMoveDown(){const e=h.get();return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index<e.party.length-1}_doSwap(){const e=h.get();if(!this._selectedA||e.bench.length===0)return;const t=this._selectedA.source==="party"?e.party:e.companions,s=t[this._selectedA.index],n=e.bench[0];t[this._selectedA.index]=n,e.bench[0]=s,e.bench.splice(0,1,s),this._selectedA=null,this._autosave(),this._render()}_doSwapWith(e){const t=h.get(),s=o=>o==="party"?t.party:o==="companions"?t.companions:t.bench,n=s(this._selectedA.source),l=s(e.source),c=n[this._selectedA.index],r=l[e.index];if(this._selectedA.source==="companions"&&r&&!g(r)){this._selectedA=null,this._render();return}if(e.source==="companions"&&c&&!g(c)){this._selectedA=null,this._render();return}if(this._selectedA.source==="party"&&r&&g(r)){this._selectedA=null,this._render();return}if(e.source==="party"&&c&&g(c)){this._selectedA=null,this._render();return}const i=n[this._selectedA.index];n[this._selectedA.index]=l[e.index],l[e.index]=i,t.party=t.party.filter(Boolean),t.companions=t.companions.filter(Boolean),this._selectedA=null,this._autosave(),this._render()}_autosave(){try{y.saveCurrentGame()}catch{}}_doMove(e){const t=h.get();if(!this._selectedA||this._selectedA.source!=="party")return;const s=this._selectedA.index,n=s+e;n<0||n>=t.party.length||([t.party[s],t.party[n]]=[t.party[n],t.party[s]],this._selectedA.index=n,this._render())}}export{G as PartyScreen,g as isCompanionEntity};
