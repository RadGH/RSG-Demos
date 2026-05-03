import{i as D,c as z,j as X,G as $,q as F,p as G,k as V,s as Y,t as J,h as O,v as P,w as Q,y as Z,z as ee,B as te,D as B,E as oe,F as j,H as ie,I as A,J as N,K as U,r as E,L as ae,N as se,O as ne,P as re}from"./play-COz1sDSK.js";import"./savesClient-DUFjgBxb.js";const le=["weapon","offhand","head","chest","legs","hands","feet","ring1","ring2","necklace"],ce={weapon:"Weapon",offhand:"Off-hand",head:"Head",chest:"Chest",legs:"Legs",hands:"Hands",feet:"Feet",ring1:"Ring",ring2:"Ring",necklace:"Necklace"};function de(H,t,e){var u;const m=[...t.inventory||[]];let s=0;for(const r of m){if((u=t.isManuallyUnequipped)!=null&&u.call(t,r.id))continue;const b=H.autoEquip;H.autoEquip=!0;try{const a=t.tryAutoEquip(r);a&&a.member&&a.member.id===H.id&&s++}catch{}H.autoEquip=b}s>0&&e&&e.playSfx("purchase")}class be{constructor(t,e){this.manager=t,this.audio=e,this._el=null,this._selectedCharIdx=0,this._charScrollPos=new Map,this._tt=null,this._compareMode=!1,this._compareSecondary=!1,this._currentTooltipItem=null,this._isTouch=typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0)}onEnter(){this._build()}_build(){D("inv-styles",pe),this._el=z("div","inv-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){X(this._el,()=>this._renderImpl())}_renderImpl(){const t=$.get(),m=(t.inventoryContext||"default")==="party-inactive",s=t.bench||[],u=m?[...t.party,...t.companions,...s]:[...t.party,...t.companions];if(t.inventoryFocusId){const a=u.findIndex(h=>h.id===t.inventoryFocusId);a>=0&&(this._selectedCharIdx=a),t.inventoryFocusId=null}const r=u[this._selectedCharIdx]||u[0];this._selectedCharIdx>=u.length&&(this._selectedCharIdx=0),this._el.innerHTML=`
      <div class="inv-header">
        <div class="inv-char-tabs" id="char-tabs">
          ${u.map((a,h)=>{const g=s.includes(a);return`
            <button type="button" class="char-tab${h===this._selectedCharIdx?" active":""}" data-idx="${h}" style="${g?"opacity:0.55;border-style:dashed":""}">
              ${a.name}${g?" <small>(inactive)</small>":""}<br><small>${a.className||a.class}</small>
            </button>`}).join("")}
        </div>
        <button type="button" class="inv-close" id="inv-close">✕ Close</button>
      </div>
      <div class="inv-layout">
        <!-- Equipment slots (left) -->
        <div class="equip-panel">
          <div class="panel-label panel-label-row">
            <span>Inventory</span>
            ${r&&!(r.isCompanion&&r.class==="companion")?F()?`<button type="button" class="auto-toggle hard-locked" id="inv-autoequip" aria-disabled="true" title="Auto-equip disabled on Hard difficulty" disabled>
                  <span class="auto-lock-icon" aria-hidden="true">&#x1F512;</span>Auto
                </button>`:`<button type="button" class="auto-toggle${r.autoEquip?" on":""}" id="inv-autoequip" aria-pressed="${r.autoEquip?"true":"false"}" title="When new items appear in your bag and they're an upgrade for this character, auto-equip them. Items you manually unequip are remembered and never auto-equipped.">
                ${r.autoEquip?'<span class="auto-check" aria-hidden="true">✓</span>':'<span class="auto-check auto-off" aria-hidden="true">○</span>'}Auto
              </button>`:""}
          </div>
          <div class="inv-char-header">
            ${r?`<div class="inv-portrait-wrap">${G(r,70,"inv-portrait")}</div>`:""}
            <div class="inv-char-identity">
              <div class="inv-char-name">${(r==null?void 0:r.name)||"No Character"} ${r?V(r,14,"inv-class-icon"):""}</div>
            </div>
          </div>
          <div class="panel-label" style="margin-top:0.5rem">Equipped</div>
          <div class="equip-slots" id="equip-slots">
            ${(()=>{var g,x;const a=(r==null?void 0:r.isCompanion)&&(r==null?void 0:r.class)==="companion",h=(x=(g=r==null?void 0:r.equipment)==null?void 0:g.weapon)==null?void 0:x.twoHanded;return le.map(o=>{var n;const i=(n=r==null?void 0:r.equipment)==null?void 0:n[o];return`
                  <div class="equip-slot${i?" has-item":""}${o==="offhand"&&h||a?" slot-disabled":""}${a?" slot-companion":""}" data-slot="${o}">
                    <div class="es-label">${ce[o]}${a?'<span class="es-companion-tag">[Companion]</span>':""}</div>
                    ${i?(()=>{const l=i.isUnique?"#ff8020":i.setId?"#b060ff":`var(--rarity-${i.rarity})`;return`
                      <div class="es-item" data-itemid="${i.id}" data-slot="${o}">
                        <div class="esi-name" style="color:${l}">${i.name}</div>
                        <div class="esi-stat">${i.dmg?`${i.dmg[0]}-${i.dmg[1]}`:i.armor?`+${i.armor} arm`:""}</div>
                      </div>`})():'<div class="es-empty">— empty —</div>'}
                  </div>
                `}).join("")})()}
          </div>
          <div class="char-stats-panel">
            <div class="panel-label">Character Stats</div>
            ${this._renderCharStats(r)}
          </div>
        </div>
        <!-- Inventory grid (right) -->
        <div class="inv-items-panel">
          <div class="panel-label">Inventory (${t.inventory.length} items)</div>
          <div class="inv-grid" id="inv-grid">
            ${t.inventory.length===0?'<div class="inv-empty">Your pack is empty. Visit the merchant or defeat enemies to find equipment.</div>':t.inventory.map(a=>{const h=this._upgradeTier(r,a),g=this._slotsForItem(r,a).join(" "),x=h?` data-upgrade-tier="${h}"`:"",o=h?` upgrade-${h}`:"",i=a.isUnique?"#ff8020":a.setId?"#b060ff":`var(--rarity-${a.rarity})`,c=a.setId?'<div class="iic-set-tag">Set</div>':"",n=a.isUnique?'<div class="iic-unique-tag">Unique</div>':"";return`
                <div class="inv-item-card${o}${a.isUnique?" iic-unique":""}${a.setId?" iic-set":""}" data-id="${a.id}" data-slots="${g}"${x}>
                  <div class="iic-rarity-bar" style="background:${i}"></div>
                  <div class="iic-name" style="color:${i}">${a.name}</div>
                  ${c}${n}
                  <div class="iic-type">${a.subtype||a.type}</div>
                  <div class="iic-stat">${a.dmg?`Dmg ${a.dmg[0]}-${a.dmg[1]}`:a.armor?`Arm +${a.armor}`:""}</div>
                  <div class="iic-quality">${a.quality}</div>
                  <button type="button" class="iic-equip-btn" data-equip="${a.id}">Equip</button>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      <div id="inv-tt" class="inv-tooltip" style="display:none"><button class="inv-tt-close" aria-label="Close" type="button">×</button><div class="inv-tt-body"></div></div>
    `,this._wireEvents(),Y(this._el);const b=this._el.querySelector("#stats-base-chk");b&&b.addEventListener("click",()=>{var o,i;const a=(o=this._el)==null?void 0:o.querySelector(".equip-panel"),h=a?a.scrollTop:0,g=!b.classList.contains("on");J(g),this.audio.playSfx("click"),this._render();const x=(i=this._el)==null?void 0:i.querySelector(".equip-panel");x&&(x.scrollTop=h)})}_slotsForItem(t,e){if(!e||!t)return[];const m=[];return e.type==="weapon"?(m.push("weapon"),(e.offHandOk||!e.twoHanded)&&!e.twoHanded&&m.push("offhand"),m):e.subtype==="ring"||e.slot==="ring"?["ring1","ring2"]:e.slot?[e.slot]:e.subtype?[e.subtype]:[]}_upgradeTier(t,e){var b;if(!t||!e||t.isCompanion&&t.class==="companion")return null;const m=this._slotsForItem(t,e);if(!m.length)return null;const s=t.equipment||{};for(const a of m)if(!s[a]){if(a==="offhand"&&((b=s.weapon)!=null&&b.twoHanded))continue;return"empty"}const u=O(e,t).total;let r=-1/0;for(const a of m){const h=s[a];if(!h)continue;const g=O(h,t).total;if(g<=0)continue;const x=(u-g)/g;x>r&&(r=x)}return r<=0||r===-1/0?null:r<=.05?"minor":r<=.2?"medium":r<=.5?"major":"huge"}_vsItemForCompare(t,e){if(!t||!e)return null;const m=t.equipment||{},s=this._slotsForItem(t,e);if(!s.length)return null;let u=s[0],r=s[1];s.includes("ring1")&&s.includes("ring2")&&(u="ring1",r="ring2");const b=this._compareSecondary&&r?r:u;return{vs:m[b]||null,slot:b,hasSecondary:!!r&&r!==u}}_openCompareModal(t,e,m={}){if(!t)return;const{hero:s=null,slotLabel:u=null,hasSecondary:r=!1,inInv:b=!1,onEquip:a}=m;D("inv-cmp-modal-styles",`
      .inv-cmp-modal-backdrop {
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.78);
        display: flex; align-items: center; justify-content: center;
        padding: 0;
      }
      .inv-cmp-modal {
        position: relative;
        width: 85vw; max-width: 420px;
        max-height: 88vh;
        background: #110a08;
        border: 2px solid rgba(232,160,32,0.55);
        border-radius: 10px;
        box-shadow: 0 8px 48px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(232,160,32,0.08);
        display: flex; flex-direction: column;
        overflow: hidden;
      }
      .inv-cmp-modal-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.65rem 0.9rem 0.55rem;
        border-bottom: 1px solid rgba(232,160,32,0.18);
        flex-shrink: 0;
      }
      .inv-cmp-modal-title {
        font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em;
        color: #e8a020; text-transform: uppercase;
      }
      .inv-cmp-modal-close {
        width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
        background: none; border: none; cursor: pointer; color: #c0a080; font-size: 1.3rem;
        border-radius: 6px; margin: -0.4rem -0.5rem -0.4rem 0;
      }
      .inv-cmp-modal-close:hover { background: rgba(232,160,32,0.12); color: #e8c060; }
      .inv-cmp-modal-body {
        overflow-y: auto; flex: 1; padding: 0.7rem 0.9rem;
        -webkit-overflow-scrolling: touch;
      }
      .inv-cmp-section-label {
        font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
        text-transform: uppercase; color: #8a7a6a; margin-bottom: 0.35rem;
        padding: 0.2rem 0.45rem; background: rgba(232,160,32,0.07);
        border-radius: 4px; border-left: 3px solid rgba(232,160,32,0.4);
      }
      .inv-cmp-section-label.candidate { border-left-color: #60d080; color: #90c8a0; }
      .inv-cmp-section-label.equipped  { border-left-color: #6898d8; color: #90b0d8; }
      .inv-cmp-divider {
        margin: 0.7rem 0; border: none; border-top: 1px solid rgba(232,160,32,0.15);
      }
      .inv-cmp-modal-footer {
        display: flex; gap: 0.5rem; padding: 0.55rem 0.9rem 0.7rem;
        border-top: 1px solid rgba(232,160,32,0.18); flex-shrink: 0;
      }
      .inv-cmp-footer-btn {
        flex: 1; min-height: 48px; padding: 0.5rem 0.7rem;
        background: rgba(232,160,32,0.1); border: 1px solid rgba(232,160,32,0.35);
        border-radius: 7px; color: #e8a020; font-size: 0.88rem; font-weight: 700;
        cursor: pointer; letter-spacing: 0.03em;
      }
      .inv-cmp-footer-btn:hover { background: rgba(232,160,32,0.22); }
      .inv-cmp-footer-btn.equip {
        background: rgba(96,208,128,0.12); border-color: rgba(96,208,128,0.45); color: #b0e8c0;
      }
      .inv-cmp-footer-btn.equip:hover { background: rgba(96,208,128,0.24); }
      .inv-cmp-footer-btn.secondary {
        background: rgba(104,152,216,0.1); border-color: rgba(104,152,216,0.4); color: #90b0d8;
      }
    `);const h=P(t,s);let g;e?g=P(e,s):g=`<span style="color:#60d080;font-style:italic">Slot ${u||""} is empty — direct upgrade.</span>`;let x='<button class="inv-cmp-footer-btn" data-modal-action="close">Close</button>';r&&(x+='<button class="inv-cmp-footer-btn secondary" data-modal-action="secondary">Compare 2nd</button>'),b&&(x+='<button class="inv-cmp-footer-btn equip" data-modal-action="equip">Equip</button>');const o=z("div","inv-cmp-modal-backdrop");o.innerHTML=`
      <div class="inv-cmp-modal" role="dialog" aria-modal="true" aria-label="Item Compare">
        <div class="inv-cmp-modal-header">
          <span class="inv-cmp-modal-title">Compare Items</span>
          <button class="inv-cmp-modal-close" data-modal-action="close" aria-label="Close">&#x2715;</button>
        </div>
        <div class="inv-cmp-modal-body">
          <div class="inv-cmp-section-label candidate">Considered</div>
          <div class="inv-cmp-candidate-body">${h}</div>
          <hr class="inv-cmp-divider">
          <div class="inv-cmp-section-label equipped">Equipped (${u||"slot"})</div>
          <div class="inv-cmp-equipped-body">${g}</div>
        </div>
        <div class="inv-cmp-modal-footer">${x}</div>
      </div>
    `;const i=()=>{o.remove(),this._activeCmpModal=null};o.addEventListener("click",l=>{l.target===o&&i()});const c=l=>{l.key==="Escape"&&(i(),window.removeEventListener("keydown",c))};window.addEventListener("keydown",c),o.querySelectorAll("[data-modal-action]").forEach(l=>{l.addEventListener("click",d=>{d.stopPropagation();const v=l.dataset.modalAction;if(v==="close")i(),window.removeEventListener("keydown",c);else if(v==="equip")i(),window.removeEventListener("keydown",c),a&&a(t);else if(v==="secondary"){this._compareSecondary=!this._compareSecondary;const k=$.get().party||[],_=k[this._selectedCharIdx]||k[0],y=this._vsItemForCompare(_,t),w=o.querySelector(".inv-cmp-equipped-body"),C=o.querySelector(".inv-cmp-section-label.equipped");y!=null&&y.vs&&w?w.innerHTML=P(y.vs,s):w&&(w.innerHTML=`<span style="color:#60d080;font-style:italic">Slot ${(y==null?void 0:y.slot)||""} is empty.</span>`),C&&(C.textContent=`Equipped (${(y==null?void 0:y.slot)||"slot"})`)}})}),document.body.appendChild(o),this._activeCmpModal=o;const n=o.querySelector(".inv-cmp-modal-close");n&&n.focus()}_renderCharStats(t){if(!t)return'<div class="stat-row"><span>No character selected</span></div>';const e=t.baseAttrs||t.attrs,m=t.attrs,s=Q(),u=t.equipment||{};let r=0;for(const p of Object.values(u))p!=null&&p.armor&&(r+=p.armor);const b=0,a=Z(t);r+=a.armor||0;const h=ee(u),g=s?e:{STR:m.STR+(a.str||0),DEX:m.DEX+(a.dex||0),INT:m.INT+(a.int||0),CON:m.CON+(a.con||0)},x=te(u)+(a.dmg||0),o=B(g,s?0:x,h),i=B(e,0,h),c=h==="magic"?"Magic Damage":h==="light"?"Light Damage":"Heavy Damage",n=s?0:a.magicResist||0,l=(p,q)=>({hp:q?se(t):50+p.CON*10,mp:q?ae(t):30+p.INT*8,hit:Math.min(95,70+Math.round(p.DEX*1.2)+(q&&a.hit||0)),dodge:Math.min(40,5+Math.round(p.DEX*.8)+(q&&a.dodge||0)),spl:p.INT*.025+(q&&a.spellPower||0)}),d=l(s?e:g,!s),v=l(e,!1),f=s?b:r,k=s?0:oe(t).resistAll||0,_=j(f,k),y=j(b,0),w=(p,q,T)=>{const R=ne(q,T,p);return R?` style="color:${R}"`:""},C=["STR","DEX","INT","CON"].map(p=>{const q=p.toLowerCase(),T=g[p];return`<div class="stat-row"><span class="sr-label stat-label" data-stat="${p}">${p}</span><span class="sr-val"${w(q,T,e[p])}>${Math.floor(T)}</span></div>`}).join(""),I=new Set(["str","dex","int","con","hp","mp","dmg","armor","hit","dodge","magicresist","magicResist","spellpower","spellPower"]),L={goldFind:"Gold Find",xpFind:"XP Find",manaRegen:"Mana Regen",lifeSteal:"Life Steal",manaSteal:"Mana Steal",initiative:"Initiative",critChance:"Crit Chance",critDamage:"Crit Damage",spellPower:"Spell Power",tradePrices:"Trade Prices"},S=[];if(!s){try{const p=ie(t);if((p==null?void 0:p.blockChance)>0){const q=`+${A(p.blockChance)}`;S.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="Block Chance">Block Chance</span><span class="sr-val" style="color:#6db3ff">${q}</span></div>`)}(p==null?void 0:p.blockPower)>0&&S.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="Block Power">Block Power</span><span class="sr-val" style="color:#6db3ff">+${Math.round(p.blockPower)}</span></div>`)}catch{}for(const p of Object.keys(a)){if(I.has(p)||I.has(p.toLowerCase()))continue;const q=a[p];if(!q)continue;const T=L[p]||p.replace(/([A-Z])/g," $1").replace(/^./,W=>W.toUpperCase()),K=(p==="goldFind"||p==="xpFind"||p==="critChance"||p==="critDamage"||p==="tradePrices")&&Math.abs(q)<=3?`+${A(q)}`:p==="lifeSteal"||p==="manaSteal"?`+${N(q,"pct")}`:`+${N(q,"auto")}`;S.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="${T}">${T}</span><span class="sr-val" style="color:#6db3ff">${K}</span></div>`)}}const M=S.length?S.join(""):'<div class="stat-row"><span class="sr-label" style="color:#5a4a42;font-style:italic">None</span><span class="sr-val" style="color:#5a4a42">—</span></div>';return`
      <button type="button" class="auto-toggle stats-base-toggle${s?" on":""}" id="stats-base-chk" aria-pressed="${s?"true":"false"}" title="Show base attributes (without item bonuses)">${s?'<span class="auto-check" aria-hidden="true">✓</span>':""}Show Base Attributes</button>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="HP">HP</span><span class="sr-val"${w("hp",d.hp,v.hp)}>${Math.floor(d.hp)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Mana">Mana</span><span class="sr-val"${w("mp",d.mp,v.mp)}>${Math.floor(d.mp)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Armor">Armor</span><span class="sr-val"${w("armor",f,b)}>${Math.floor(f)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Damage Reduction">Damage Reduction</span><span class="sr-val"${w("dmgReduction",_.totalDr,y.totalDr)}>${A(_.totalDr)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Magic Resist">Magic Resist</span><span class="sr-val"${w("magicResist",n,0)}>${Math.floor(n)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Hit">Hit</span><span class="sr-val"${w("hit",d.hit,v.hit)}>${Math.floor(d.hit)}%</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Dodge">Dodge</span><span class="sr-val"${w("dodge",d.dodge,v.dodge)}>${Math.floor(d.dodge)}%</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="${c}">${c}</span><span class="sr-val"${w("dmg",o[1],i[1])}>${Math.floor(o[0])}-${Math.floor(o[1])}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Spell Power">Spell Power</span><span class="sr-val"${w("spellPower",d.spl,v.spl)}>+${Math.round(d.spl*100)}%</span></div>
      <div class="panel-label" style="margin-top:0.75rem">Attributes</div>
      ${C}
      <div class="panel-label" style="margin-top:0.75rem">Other Effects</div>
      ${M}
    `}_doEquip(t,e,m,s){t.equipment||(t.equipment={}),e.twoHanded&&e.type==="weapon"&&t.equipment.offhand&&($.addToInventoryRaw(t.equipment.offhand),delete t.equipment.offhand),t.equipment[m]&&$.addToInventoryRaw(t.equipment[m]),t.equipment[m]=e,$.removeFromInventory(e.id),$.unmarkManuallyUnequipped(e.id),U(t)}_showSlotPicker(t,e,m){var a,h;const s=z("div","slot-picker-overlay"),u=(a=t.equipment)==null?void 0:a.weapon,r=(h=t.equipment)==null?void 0:h.offhand,b=u==null?void 0:u.twoHanded;s.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Equip to which slot?</div>
        <div class="spo-item-name" style="color:${`var(--rarity-${e.rarity})`}">${e.name}</div>
        <div class="spo-actions">
          <button type="button" class="spo-btn" id="spo-weapon">
            Main Hand${u?`<br><small style="color:#8a7a6a">Replaces: ${u.name}</small>`:""}
          </button>
          <button type="button" class="spo-btn" id="spo-offhand" ${b?'disabled title="Unequip 2H weapon first"':""}>
            Off Hand${r?`<br><small style="color:#8a7a6a">Replaces: ${r.name}</small>`:""}${b?'<br><small style="color:#c04030">2H equipped</small>':""}
          </button>
        </div>
        <button type="button" class="spo-cancel" id="spo-cancel">Cancel</button>
      </div>
    `,s.querySelector("#spo-weapon").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(t,e,"weapon",m),E(s),this._render()}),s.querySelector("#spo-offhand").addEventListener("click",()=>{b||(this.audio.playSfx("click"),this._doEquip(t,e,"offhand",m),E(s),this._render())}),s.querySelector("#spo-cancel").addEventListener("click",()=>E(s)),this._el.appendChild(s)}_showRingPicker(t,e,m){var b,a;const s=z("div","slot-picker-overlay"),u=(b=t.equipment)==null?void 0:b.ring1,r=(a=t.equipment)==null?void 0:a.ring2;s.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Equip to which ring slot?</div>
        <div class="spo-item-name" style="color:${`var(--rarity-${e.rarity})`}">${e.name}</div>
        <div class="spo-actions">
          <button type="button" class="spo-btn" id="spo-ring1">
            Ring Slot 1${u?`<br><small style="color:#8a7a6a">Replaces: ${u.name}</small>`:""}
          </button>
          <button type="button" class="spo-btn" id="spo-ring2">
            Ring Slot 2${r?`<br><small style="color:#8a7a6a">Replaces: ${r.name}</small>`:""}
          </button>
        </div>
        <button type="button" class="spo-cancel" id="spo-cancel">Cancel</button>
      </div>
    `,s.querySelector("#spo-ring1").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(t,e,"ring1",m),E(s),this._render()}),s.querySelector("#spo-ring2").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(t,e,"ring2",m),E(s),this._render()}),s.querySelector("#spo-cancel").addEventListener("click",()=>E(s)),this._el.appendChild(s)}_showInfoModal(t){const e=z("div","slot-picker-overlay");e.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Notice</div>
        <div class="spo-item-name" style="color:#c0b090;font-style:normal">${t}</div>
        <button type="button" class="spo-cancel" id="info-ok">OK</button>
      </div>
    `,e.querySelector("#info-ok").addEventListener("click",()=>E(e)),e.addEventListener("click",m=>{m.target===e&&E(e)}),this._el.appendChild(e)}_equipItemFlow(t){var h,g,x,o,i,c;const e=$.get(),s=[...e.party,...e.companions][this._selectedCharIdx];if(!s||!t)return;if(s.isCompanion&&s.class==="companion"){this._showInfoModal("Companions cannot equip items.");return}const u=t.type==="weapon",r=t.twoHanded,b=t.offHandOk||!r&&u;if(u&&!r&&b){const n=!!((h=s.equipment)!=null&&h.weapon),l=!!((g=s.equipment)!=null&&g.offhand),d=(o=(x=s.equipment)==null?void 0:x.weapon)==null?void 0:o.twoHanded;if(!n){this._doEquip(s,t,"weapon",e),this._render();return}if(!l&&!d){this._doEquip(s,t,"offhand",e),this._render();return}this._showSlotPicker(s,t,e);return}if(t.subtype==="ring"){const n=!!((i=s.equipment)!=null&&i.ring1),l=!!((c=s.equipment)!=null&&c.ring2);if(!n){this._doEquip(s,t,"ring1",e),this._render();return}if(!l){this._doEquip(s,t,"ring2",e),this._render();return}this._showRingPicker(s,t,e);return}let a=t.slot;a||(u?a="weapon":a=t.subtype),this._doEquip(s,t,a,e),this._render()}_wireEvents(){var x;(x=this._el.querySelector("#inv-close"))==null||x.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()});const t=this._el.querySelector("#inv-autoequip");t&&t.addEventListener("click",()=>{if(F())return;this.audio.playSfx("click");const o=$.get(),c=[...o.party,...o.companions,...o.bench||[]][this._selectedCharIdx];if(!c)return;const n=!c.autoEquip;c.autoEquip=n,n&&de(c,o,this.audio),this._render()}),this._el.querySelectorAll(".char-tab").forEach(o=>{o.addEventListener("click",()=>{this.audio.playSfx("click");const i=this._el.querySelector(".inv-items-panel")||this._el.querySelector(".equip-panel");i&&this._charScrollPos.set(this._selectedCharIdx,i.scrollTop),this._selectedCharIdx=parseInt(o.dataset.idx),this._render(),requestAnimationFrame(()=>{var n,l;const c=((n=this._el)==null?void 0:n.querySelector(".inv-items-panel"))||((l=this._el)==null?void 0:l.querySelector(".equip-panel"));c&&(c.scrollTop=this._charScrollPos.get(this._selectedCharIdx)||0)})})}),this._el.querySelectorAll("[data-equip]").forEach(o=>{o.addEventListener("click",()=>{var y,w,C,I,L,S;this.audio.playSfx("click");const i=o.dataset.equip,c=$.get(),l=[...c.party,...c.companions][this._selectedCharIdx],d=c.inventory.find(M=>M.id===i);if(!l||!d)return;if(l.isCompanion&&l.class==="companion"){this._showInfoModal("Companions cannot equip items.");return}const v=d.type==="weapon",f=d.twoHanded,k=d.offHandOk||!f&&v;if(v&&!f&&k){const M=!!((y=l.equipment)!=null&&y.weapon),p=!!((w=l.equipment)!=null&&w.offhand),q=(I=(C=l.equipment)==null?void 0:C.weapon)==null?void 0:I.twoHanded;if(!M){this._doEquip(l,d,"weapon",c),this._render();return}if(!p&&!q){this._doEquip(l,d,"offhand",c),this._render();return}this._showSlotPicker(l,d,c);return}if(d.subtype==="ring"){const M=!!((L=l.equipment)!=null&&L.ring1),p=!!((S=l.equipment)!=null&&S.ring2);if(!M){this._doEquip(l,d,"ring1",c),this._render();return}if(!p){this._doEquip(l,d,"ring2",c),this._render();return}this._showRingPicker(l,d,c);return}let _=d.slot;_||(v?_="weapon":_=d.subtype),this._doEquip(l,d,_,c),this._render()})}),this._el.querySelectorAll("[data-slot]").forEach(o=>{o.dataset.itemid&&o.addEventListener("click",()=>{var v;const i=$.get(),n=[...i.party,...i.companions][this._selectedCharIdx],l=o.dataset.slot;if(!((v=n==null?void 0:n.equipment)!=null&&v[l]))return;this.audio.playSfx("click");const d=n.equipment[l];$.markManuallyUnequipped(d.id),$.addToInventoryRaw(d),delete n.equipment[l],U(n),this._render()})});const e=this._el.querySelector("#inv-tt"),m=e==null?void 0:e.querySelector(".inv-tt-body"),s=e==null?void 0:e.querySelector(".inv-tt-close"),u=()=>{const o=$.get(),i=[...o.party,...o.companions,...o.bench||[]];return{gs:o,char:i[this._selectedCharIdx]}},r=o=>{const{gs:i,char:c}=u();return i.inventory.find(n=>n.id===o)||Object.values((c==null?void 0:c.equipment)||{}).find(n=>(n==null?void 0:n.id)===o)},b=o=>{var c;if(!m||!o)return;const{char:i}=u();if(this._compareMode){const n=this._vsItemForCompare(i,o),l=(n==null?void 0:n.vs)||null,d=(n==null?void 0:n.slot)||null;let v=null;n!=null&&n.hasSecondary&&(v=this._isTouch?'Tap "Compare 2nd" below to compare against the other slot.':"Hold Alt+Shift to compare against the other slot.");let f="";if(this._isTouch&&(f+=`<div class="tt-breadcrumb">Inventory <span class="bc-sep">›</span> ${o.name} <span class="bc-sep">›</span> <strong>Compare</strong></div>`),f+=re(o,l,{hero:i,slotLabel:d,secondaryHint:v}),this._isTouch){const k=!!((c=gs==null?void 0:gs.inventory)!=null&&c.find(_=>_.id===o.id));f+=`<div class="tt-cmp-actions">
            <button type="button" class="tt-cmp-btn" data-cmp-action="exit">Back</button>
            ${n!=null&&n.hasSecondary?'<button type="button" class="tt-cmp-btn" data-cmp-action="secondary">Compare 2nd</button>':""}
            ${k?'<button type="button" class="tt-cmp-btn primary" data-cmp-action="equip">Equip</button>':""}
          </div>`}m.innerHTML=f}else{let n="";if(this._isTouch&&(n+=`<div class="tt-breadcrumb">Inventory <span class="bc-sep">›</span> <strong>${o.name}</strong></div>`),n+=P(o,i),this._isTouch){const l=this._slotsForItem(i,o),v=!!$.get().inventory.find(f=>f.id===o.id);l.length&&(n+=`<div class="tt-cmp-actions">
              ${l.length?'<button type="button" class="tt-cmp-btn" data-cmp-action="enter">Compare</button>':""}
              ${v?'<button type="button" class="tt-cmp-btn primary" data-cmp-action="equip">Equip</button>':""}
            </div>`)}m.innerHTML=n}m.querySelectorAll("[data-cmp-action]").forEach(n=>{n.addEventListener("click",l=>{var v;l.stopPropagation();const d=n.dataset.cmpAction;if(d==="enter"){if(window.matchMedia("(max-width: 700px)").matches){const f=this._currentTooltipItem,{gs:k,char:_}=u(),y=this._vsItemForCompare(_,f),w=(y==null?void 0:y.vs)||null,C=(y==null?void 0:y.slot)||null,I=!!(y!=null&&y.hasSecondary),L=!!((v=k==null?void 0:k.inventory)!=null&&v.find(S=>S.id===(f==null?void 0:f.id)));h(),this._openCompareModal(f,w,{hero:_,slotLabel:C,hasSecondary:I,inInv:L,onEquip:S=>{this._equipItemFlow(S)}});return}this._compareMode=!0,this._compareSecondary=!1}else if(d==="exit")this._compareMode=!1,this._compareSecondary=!1;else if(d==="secondary")this._compareSecondary=!this._compareSecondary;else if(d==="equip"){this.audio.playSfx("click");const f=this._currentTooltipItem;h(),this._equipItemFlow(f);return}this._currentTooltipItem&&b(this._currentTooltipItem)})})},a=(o,i,c,n)=>{if(!e||!o)return;this._currentTooltipItem=o,b(o),e.style.display="block",e.classList.toggle("touch-open",!!n);const l=8,d=window.innerWidth,v=window.innerHeight;e.style.left=Math.max(l,i+12)+"px",e.style.top=Math.max(l,c+12)+"px";const f=e.getBoundingClientRect();let k=f.left,_=f.top;f.right>d-l&&(k=Math.max(l,d-f.width-l)),f.bottom>v-l&&(_=Math.max(l,v-f.height-l)),e.style.left=k+"px",e.style.top=_+"px"},h=()=>{e&&(e.style.display="none",e.classList.remove("touch-open"),this._currentTooltipItem=null,this._isTouch||(this._compareMode=!1,this._compareSecondary=!1))};s==null||s.addEventListener("click",o=>{o.stopPropagation(),h()});const g=(o,i)=>{for(const c of o){const n=this._el.querySelector(`.equip-slot[data-slot="${c}"]`);n&&n.classList.toggle("slot-hover",i)}};if(this._el.querySelectorAll(".inv-item-card, .es-item").forEach(o=>{o.addEventListener("pointerenter",i=>{if(i.pointerType==="touch"||i.pointerType==="pen")return;const c=o.dataset.id||o.dataset.itemid,n=r(c);if(n){if(o.classList.contains("inv-item-card")){const{char:l}=u(),d=this._slotsForItem(l,n);g(d,!0),o._hoverSlots=d}this._isTouch||(this._compareMode=!!i.altKey,this._compareSecondary=!!(i.altKey&&i.shiftKey)),a(n,i.clientX,i.clientY,!1)}}),o.addEventListener("pointerleave",i=>{i.pointerType==="touch"||i.pointerType==="pen"||(o._hoverSlots&&(g(o._hoverSlots,!1),o._hoverSlots=null),h())}),o.addEventListener("click",i=>{if(!(i.pointerType==="touch"||i.pointerType==="pen"||this._isTouch)||i.target.closest&&i.target.closest(".iic-equip-btn"))return;const n=o.dataset.id||o.dataset.itemid,l=r(n);if(!l)return;const d=o.getBoundingClientRect();a(l,d.left,d.bottom,!0)})}),!this._isTouch&&e&&!e._altBound){e._altBound=!0;const o=i=>{if(e.style.display==="none"||!this._currentTooltipItem||i.key!=="Alt"&&i.key!=="Shift")return;const c=!!i.altKey||i.type==="keydown"&&i.key==="Alt",n=c&&(!!i.shiftKey||i.type==="keydown"&&i.key==="Shift"),l=i.type==="keyup"?i.key==="Alt"?!1:!!i.altKey:c,d=i.type==="keyup"?i.key==="Shift"?!1:!!i.altKey&&!!i.shiftKey:n;this._compareMode===l&&this._compareSecondary===d||(this._compareMode=l,this._compareSecondary=d,b(this._currentTooltipItem))};window.addEventListener("keydown",o),window.addEventListener("keyup",o),e._altKeyHandler=o}e&&!e._outsideBound&&(e._outsideBound=!0,document.addEventListener("click",o=>{var i,c;e.style.display!=="none"&&e.classList.contains("touch-open")&&(e.contains(o.target)||(c=(i=o.target).closest)!=null&&c.call(i,".inv-item-card, .es-item")||h())},!0))}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){const t=$.get();t.inventoryContext=null,E(this._el),this._el=null}destroy(){E(this._el),this._el=null}}const pe=`
/* M322: button-style auto-toggle, mirrors the SkillTreeScreen .auto-toggle.
   Defined here so the inventory screen renders consistently even before the
   SkillTreeScreen is mounted in a session. */
.auto-toggle {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.3rem 0.65rem; min-height: 36px; border-radius: 6px;
  background: rgba(20,12,28,0.7); border: 1px solid rgba(232,160,32,0.2);
  color: #8a7a6a; font-size: 0.7rem; font-weight: 600; cursor: pointer;
  letter-spacing: 0.05em; font-family: inherit;
}
.auto-toggle:hover { border-color: rgba(232,160,32,0.45); color: #e8a020; }
.auto-toggle.on { border-color: rgba(72,176,96,0.6); color: #6dd180; background: rgba(72,176,96,0.1); }
.auto-toggle .auto-check {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px; border-radius: 50%;
  background: #48b060; color: #06200d; font-size: 10px; font-weight: 800;
  line-height: 1;
}
/* M384 — unchecked state: gold outline circle, no background. */
.auto-toggle .auto-check.auto-off {
  background: transparent;
  border: 1px solid rgba(232,160,32,0.7);
  color: transparent;
  font-weight: 400;
}
/* M385 — header row: panel label on the left, Auto toggle on the right. */
.panel-label-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 0.5rem; flex-wrap: wrap;
}
.panel-label-row .auto-toggle { margin: 0; }
.inv-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: linear-gradient(180deg,#0a0608,#120a10); color: #f0e8d8;
  font-family: 'Inter', sans-serif;
}
.inv-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 1rem; border-bottom: 1px solid rgba(232,160,32,0.15);
  background: rgba(0,0,0,0.3); flex-shrink: 0; gap: 0.5rem;
}
.inv-char-tabs { display: flex; gap: 0.4rem; overflow-x: auto; }
.char-tab {
  padding: 0.4rem 0.85rem; background: rgba(26,18,24,0.6);
  border: 1px solid rgba(232,160,32,0.1); border-radius: 6px;
  color: #8a7a6a; font-size: 0.75rem; cursor: pointer; min-height: 44px; text-align: center;
  transition: all 0.2s;
}
.char-tab.active { border-color: rgba(232,160,32,0.5); color: #e8a020; background: rgba(232,160,32,0.08); }
.char-tab small { font-size: 0.6rem; }
.inv-close { background: none; border: none; color: #8a7a6a; cursor: pointer; font-size: 0.85rem; padding: 0.4rem 0.6rem; min-height: 36px; }
.inv-close:hover { color: #f0e8d8; }
.inv-layout { flex: 1; display: grid; grid-template-columns: 260px 1fr; overflow: hidden; }
@media (max-width: 600px) { .inv-layout { grid-template-columns: 1fr; } .equip-panel { display: none; } }
.panel-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7a6a; margin-bottom: 0.6rem; }
.inv-char-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
.inv-portrait-wrap { width: 80px; height: 80px; padding: 5px; box-sizing: border-box; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.inv-portrait { border-radius: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(232,160,32,0.25); width: 100% !important; height: 100% !important; }
.inv-class-icon { margin-left: 4px; vertical-align: middle; display: inline-flex; }
.inv-char-identity { flex: 1; }
/* M312 #37: 0.6rem bottom margin to match .panel-label spacing */
.inv-char-class { font-size: 0.72rem; color: #8a7a6a; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.6rem; }
.inv-char-name { font-family: 'Cinzel', Georgia, serif; font-size: 0.95rem; color: #f0e8d8; letter-spacing: 0.04em; display: flex; align-items: center; gap: 0.4rem; }
.equip-panel {
  padding: 1rem; border-right: 1px solid rgba(232,160,32,0.1);
  overflow-y: auto; display: flex; flex-direction: column; gap: 1rem;
}
.equip-slots { display: flex; flex-direction: column; gap: 0.35rem; }
.equip-slot {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.45rem 0.65rem; background: rgba(26,18,24,0.5);
  border: 1px solid rgba(255,255,255,0.05); border-radius: 5px; min-height: 40px;
}
.equip-slot.has-item { border-color: rgba(232,160,32,0.15); cursor: pointer; }
.equip-slot.has-item:hover { border-color: rgba(232,160,32,0.4); }
.es-label { font-size: 0.65rem; color: #8a7a6a; min-width: 55px; }
.es-item { flex: 1; text-align: right; }
.esi-name { font-size: 0.72rem; font-weight: 600; }
.esi-stat { font-size: 0.62rem; color: #8a7a6a; }
.es-empty { font-size: 0.65rem; color: #3a2a22; }
.char-stats-panel { margin-top: 0.5rem; }
.stat-row { display: flex; justify-content: space-between; padding: 0.3rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.75rem; }
.sr-label { color: #8a7a6a; }
.sr-val { font-family: 'Cinzel', serif; font-weight: 700; color: #e8a020; }
.inv-items-panel { padding: 1rem; overflow-y: auto; }
.inv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.6rem; }
.inv-item-card {
  position: relative; padding: 0.75rem; background: rgba(26,18,24,0.7);
  border: 1px solid rgba(232,160,32,0.08); border-radius: 8px;
  transition: border-color 0.15s; overflow: hidden;
}
.inv-item-card:hover { border-color: rgba(232,160,32,0.3); }
.iic-rarity-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
.iic-name { font-size: 0.78rem; font-weight: 600; margin-bottom: 0.15rem; }
.iic-type { font-size: 0.62rem; color: #8a7a6a; text-transform: capitalize; }
.iic-stat { font-size: 0.68rem; color: #c0b090; margin-top: 0.2rem; }
.iic-quality { font-size: 0.6rem; color: #6a5a52; text-transform: capitalize; }
/* M305: set and unique item card markers */
.iic-set-tag { font-size: 0.58rem; font-weight: 700; color: #b060ff; letter-spacing: 0.06em; text-transform: uppercase; }
.iic-unique-tag { font-size: 0.58rem; font-weight: 700; color: #ff8020; letter-spacing: 0.06em; text-transform: uppercase; }
.inv-item-card.iic-set { border-color: rgba(176,96,255,0.25); }
.inv-item-card.iic-set:hover { border-color: rgba(176,96,255,0.5); }
.inv-item-card.iic-unique { border-color: rgba(255,128,32,0.25); }
.inv-item-card.iic-unique:hover { border-color: rgba(255,128,32,0.5); }
.iic-equip-btn {
  margin-top: 0.5rem; width: 100%; padding: 0.3rem; background: rgba(232,160,32,0.1);
  border: 1px solid rgba(232,160,32,0.25); border-radius: 4px;
  color: #e8a020; font-size: 0.7rem; font-weight: 600; cursor: pointer; min-height: 28px;
}
.iic-equip-btn:hover { background: rgba(232,160,32,0.22); }
.inv-empty { grid-column: 1/-1; text-align: center; padding: 3rem 2rem; font-size: 0.85rem; color: #4a3a32; }
.inv-tooltip {
  position: fixed; z-index: 1000; pointer-events: none;
  background: rgba(10,6,8,0.95); border: 1px solid rgba(232,160,32,0.4);
  border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.8rem;
  line-height: 1.7;
  max-width: min(420px, calc(100vw - 16px));
  /* M374: bound tooltip height + scroll. On iPhone, an item with many
     affixes + the Equip/Compare buttons could extend below the viewport
     and the buttons became unreachable. Now the tooltip itself scrolls. */
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  color: #f0e8d8;
  box-sizing: border-box;
}
.inv-tooltip.touch-open { pointer-events: auto; padding-right: 2rem; }
/* M348 — close button enlarged to 36px (was 24px which was below the
   44-target threshold AND visually disappeared on iPhone because it
   sat under the safe-area inset). Padding shifted so it stays visible
   even when the tooltip scrolls. */
.inv-tooltip .inv-tt-close {
  position: sticky; top: 0; float: right;
  width: 40px; height: 40px;
  border: 1px solid rgba(232,160,32,0.45);
  background: rgba(232,160,32,0.22); color: #f8d880;
  border-radius: 6px; font-size: 1.2rem; line-height: 1; cursor: pointer;
  display: none; align-items: center; justify-content: center; padding: 0;
  margin: -0.4rem -0.5rem 0.3rem 0.4rem;
  z-index: 2;
}
.inv-tooltip.touch-open .inv-tt-close { display: inline-flex; }
.inv-tooltip .inv-tt-close:hover { background: rgba(232,160,32,0.35); color: #fff; }
.inv-tooltip .tt-affix { white-space: nowrap; }
.slot-picker-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.72); z-index: 200;
  display: flex; align-items: center; justify-content: center;
}
.spo-box {
  background: #12090f; border: 1px solid rgba(232,160,32,0.3); border-radius: 12px;
  padding: 1.75rem; text-align: center; max-width: 300px; width: 90%;
}
.spo-title { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700; color: #f0e8d8; margin-bottom: 0.4rem; }
.spo-item-name { font-size: 0.85rem; font-weight: 600; margin-bottom: 1.25rem; }
.spo-actions { display: flex; gap: 0.7rem; margin-bottom: 0.8rem; }
.spo-btn {
  flex: 1; padding: 0.75rem 0.5rem; background: rgba(232,160,32,0.1);
  border: 1px solid rgba(232,160,32,0.35); border-radius: 8px;
  color: #e8a020; font-family: 'Cinzel', serif; font-size: 0.82rem; font-weight: 700;
  cursor: pointer; min-height: 64px; line-height: 1.4; transition: background 0.15s;
}
.spo-btn:hover:not(:disabled) { background: rgba(232,160,32,0.22); }
.spo-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.spo-cancel { background: none; border: none; color: #8a7a6a; cursor: pointer; font-size: 0.78rem; min-height: 36px; }
.spo-cancel:hover { color: #f0e8d8; }
.equip-slot.slot-disabled { opacity: 0.35; pointer-events: none; }
.equip-slot.slot-disabled .es-label::after { content: ' [2H]'; color: #c04030; font-size: 0.58rem; }
.equip-slot.slot-companion.slot-disabled .es-label::after { content: ''; }
.es-companion-tag { color: #6a5a52; font-size: 0.58rem; margin-left: 0.25rem; }

/* U8 — slot-hover highlight when user is hovering a fitting inventory item */
.equip-slot.slot-hover {
  border-color: rgba(96,208,128,0.7) !important;
  background: rgba(96,208,128,0.08);
  box-shadow: 0 0 8px rgba(96,208,128,0.35);
}

/* U8 — upgrade glow tiers on inventory cards */
.inv-item-card.upgrade-empty {
  border: 2px solid #60d080;
  box-shadow: 0 0 12px rgba(96,208,128,0.45);
}
.inv-item-card.upgrade-minor {
  border: 1px solid rgba(96,208,128,0.25);
}
.inv-item-card.upgrade-medium {
  border: 1px solid rgba(96,208,128,0.55);
  box-shadow: 0 0 8px rgba(96,208,128,0.30);
}
.inv-item-card.upgrade-major {
  border: 2px solid rgba(96,208,128,0.85);
  box-shadow: 0 0 14px rgba(96,208,128,0.55);
}
.inv-item-card.upgrade-huge {
  border: 2px solid #fff;
  animation: invShimmer 1s linear infinite;
}
@keyframes invShimmer {
  0%   { border-color: #60d080; box-shadow: 0 0 14px rgba(96,208,128,0.7); }
  33%  { border-color: #60a8e8; box-shadow: 0 0 14px rgba(96,168,232,0.7); }
  66%  { border-color: #e8c860; box-shadow: 0 0 14px rgba(232,200,96,0.7); }
  100% { border-color: #60d080; box-shadow: 0 0 14px rgba(96,208,128,0.7); }
}

/* U8 — compare-mode tooltip groups + touch action buttons */
.inv-tooltip .tt-cmp-vs { font-style: italic; }
.inv-tooltip .tt-cmp-hdr { display: inline-block; margin-top: 0.35rem; font-weight: 600; letter-spacing: 0.04em; }
.inv-tooltip .tt-cmp-actions {
  display: flex; gap: 0.4rem; margin-top: 0.6rem;
  /* M374: stick action buttons to the bottom of the scrollable tooltip so
     Equip / Compare are always reachable without scrolling. */
  position: sticky; bottom: -0.5rem;
  background: rgba(10,6,8,0.95);
  padding: 0.4rem 0;
  margin-bottom: -0.5rem;
}
/* M348 — Equip / Compare buttons bumped to 44px tap target. Below the
   threshold iOS sometimes suppresses the synthesized click that follows
   touchend, which the user reported as "buttons do nothing on iPhone." */
.inv-tooltip .tt-cmp-btn {
  flex: 1; padding: 0.6rem 0.7rem; background: rgba(232,160,32,0.12);
  border: 1px solid rgba(232,160,32,0.35); border-radius: 6px;
  color: #e8a020; font-size: 0.85rem; font-weight: 600; cursor: pointer;
  min-height: 44px;
}
.inv-tooltip .tt-cmp-btn:hover { background: rgba(232,160,32,0.24); }
.inv-tooltip .tt-cmp-btn.primary { background: rgba(96,208,128,0.14); border-color: rgba(96,208,128,0.5); color: #b0e8c0; }
.inv-tooltip .tt-cmp-btn.primary:hover { background: rgba(96,208,128,0.26); }
.inv-tooltip .tt-breadcrumb {
  font-size: 0.7rem; color: #8a7a6a; letter-spacing: 0.02em; margin-bottom: 0.5rem;
  padding-bottom: 0.4rem; border-bottom: 1px solid rgba(232,160,32,0.12);
}
.inv-tooltip .tt-breadcrumb strong { color: #e8a020; font-weight: 600; }
.inv-tooltip .tt-breadcrumb .bc-sep { color: #4a3a32; margin: 0 0.3rem; }
@media (max-width: 720px) {
  .iic-equip-btn { display: none !important; }
  .inv-item-card { cursor: pointer; }
}
`;export{be as InventoryScreen};
