import{i as U,c as z,j as K,G as x,p as W,k as X,q as G,s as V,h as O,t as Y,v as J,w as Q,y as Z,z as D,B as tt,D as A,E as et,F as R,H as B,I as F,r as k,J as ot,K as st,L as it,N as at,O as nt}from"./play-ClQzhGtJ.js";import"./savesClient-DUFjgBxb.js";const rt=["weapon","offhand","head","chest","legs","hands","feet","ring1","ring2","necklace"],lt={weapon:"Weapon",offhand:"Off-hand",head:"Head",chest:"Chest",legs:"Legs",hands:"Hands",feet:"Feet",ring1:"Ring",ring2:"Ring",necklace:"Necklace"};function ct(C,e,t){var h;const u=[...e.inventory||[]];let a=0;for(const r of u){if((h=e.isManuallyUnequipped)!=null&&h.call(e,r.id))continue;const g=C.autoEquip;C.autoEquip=!0;try{const i=e.tryAutoEquip(r);i&&i.member&&i.member.id===C.id&&a++}catch{}C.autoEquip=g}a>0&&t&&t.playSfx("purchase")}class mt{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._charScrollPos=new Map,this._tt=null,this._compareMode=!1,this._compareSecondary=!1,this._currentTooltipItem=null,this._isTouch=typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0)}onEnter(){this._build()}_build(){U("inv-styles",dt),this._el=z("div","inv-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){K(this._el,()=>this._renderImpl())}_renderImpl(){const e=x.get(),u=(e.inventoryContext||"default")==="party-inactive",a=e.bench||[],h=u?[...e.party,...e.companions,...a]:[...e.party,...e.companions];if(e.inventoryFocusId){const i=h.findIndex(m=>m.id===e.inventoryFocusId);i>=0&&(this._selectedCharIdx=i),e.inventoryFocusId=null}const r=h[this._selectedCharIdx]||h[0];this._selectedCharIdx>=h.length&&(this._selectedCharIdx=0),this._el.innerHTML=`
      <div class="inv-header">
        <div class="inv-char-tabs" id="char-tabs">
          ${h.map((i,m)=>{const f=a.includes(i);return`
            <button type="button" class="char-tab${m===this._selectedCharIdx?" active":""}" data-idx="${m}" style="${f?"opacity:0.55;border-style:dashed":""}">
              ${i.name}${f?" <small>(inactive)</small>":""}<br><small>${i.className||i.class}</small>
            </button>`}).join("")}
        </div>
        <button type="button" class="inv-close" id="inv-close">✕ Close</button>
      </div>
      <div class="inv-layout">
        <!-- Equipment slots (left) -->
        <div class="equip-panel">
          <div class="panel-label panel-label-row">
            <span>Inventory</span>
            ${r&&!(r.isCompanion&&r.class==="companion")?`
              <button type="button" class="auto-toggle${r.autoEquip?" on":""}" id="inv-autoequip" aria-pressed="${r.autoEquip?"true":"false"}" title="When new items appear in your bag and they're an upgrade for this character, auto-equip them. Items you manually unequip are remembered and never auto-equipped.">
                ${r.autoEquip?'<span class="auto-check" aria-hidden="true">✓</span>':'<span class="auto-check auto-off" aria-hidden="true">○</span>'}Auto
              </button>
            `:""}
          </div>
          <div class="inv-char-header">
            ${r?`<div class="inv-portrait-wrap">${W(r,70,"inv-portrait")}</div>`:""}
            <div class="inv-char-identity">
              <div class="inv-char-name">${(r==null?void 0:r.name)||"No Character"} ${r?X(r,14,"inv-class-icon"):""}</div>
            </div>
          </div>
          <div class="panel-label" style="margin-top:0.5rem">Equipped</div>
          <div class="equip-slots" id="equip-slots">
            ${(()=>{var f,w;const i=(r==null?void 0:r.isCompanion)&&(r==null?void 0:r.class)==="companion",m=(w=(f=r==null?void 0:r.equipment)==null?void 0:f.weapon)==null?void 0:w.twoHanded;return rt.map(s=>{var n;const o=(n=r==null?void 0:r.equipment)==null?void 0:n[s];return`
                  <div class="equip-slot${o?" has-item":""}${s==="offhand"&&m||i?" slot-disabled":""}${i?" slot-companion":""}" data-slot="${s}">
                    <div class="es-label">${lt[s]}${i?'<span class="es-companion-tag">[Companion]</span>':""}</div>
                    ${o?(()=>{const l=o.isUnique?"#ff8020":o.setId?"#b060ff":`var(--rarity-${o.rarity})`;return`
                      <div class="es-item" data-itemid="${o.id}" data-slot="${s}">
                        <div class="esi-name" style="color:${l}">${o.name}</div>
                        <div class="esi-stat">${o.dmg?`${o.dmg[0]}-${o.dmg[1]}`:o.armor?`+${o.armor} arm`:""}</div>
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
          <div class="panel-label">Inventory (${e.inventory.length} items)</div>
          <div class="inv-grid" id="inv-grid">
            ${e.inventory.length===0?'<div class="inv-empty">Your pack is empty. Visit the merchant or defeat enemies to find equipment.</div>':e.inventory.map(i=>{const m=this._upgradeTier(r,i),f=this._slotsForItem(r,i).join(" "),w=m?` data-upgrade-tier="${m}"`:"",s=m?` upgrade-${m}`:"",o=i.isUnique?"#ff8020":i.setId?"#b060ff":`var(--rarity-${i.rarity})`,d=i.setId?'<div class="iic-set-tag">Set</div>':"",n=i.isUnique?'<div class="iic-unique-tag">Unique</div>':"";return`
                <div class="inv-item-card${s}${i.isUnique?" iic-unique":""}${i.setId?" iic-set":""}" data-id="${i.id}" data-slots="${f}"${w}>
                  <div class="iic-rarity-bar" style="background:${o}"></div>
                  <div class="iic-name" style="color:${o}">${i.name}</div>
                  ${d}${n}
                  <div class="iic-type">${i.subtype||i.type}</div>
                  <div class="iic-stat">${i.dmg?`Dmg ${i.dmg[0]}-${i.dmg[1]}`:i.armor?`Arm +${i.armor}`:""}</div>
                  <div class="iic-quality">${i.quality}</div>
                  <button type="button" class="iic-equip-btn" data-equip="${i.id}">Equip</button>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
      <div id="inv-tt" class="inv-tooltip" style="display:none"><button class="inv-tt-close" aria-label="Close" type="button">×</button><div class="inv-tt-body"></div></div>
    `,this._wireEvents(),G(this._el);const g=this._el.querySelector("#stats-base-chk");g&&g.addEventListener("click",()=>{var s,o;const i=(s=this._el)==null?void 0:s.querySelector(".equip-panel"),m=i?i.scrollTop:0,f=!g.classList.contains("on");V(f),this.audio.playSfx("click"),this._render();const w=(o=this._el)==null?void 0:o.querySelector(".equip-panel");w&&(w.scrollTop=m)})}_slotsForItem(e,t){if(!t||!e)return[];const u=[];return t.type==="weapon"?(u.push("weapon"),(t.offHandOk||!t.twoHanded)&&!t.twoHanded&&u.push("offhand"),u):t.subtype==="ring"||t.slot==="ring"?["ring1","ring2"]:t.slot?[t.slot]:t.subtype?[t.subtype]:[]}_upgradeTier(e,t){var g;if(!e||!t||e.isCompanion&&e.class==="companion")return null;const u=this._slotsForItem(e,t);if(!u.length)return null;const a=e.equipment||{};for(const i of u)if(!a[i]){if(i==="offhand"&&((g=a.weapon)!=null&&g.twoHanded))continue;return"empty"}const h=O(t,e).total;let r=-1/0;for(const i of u){const m=a[i];if(!m)continue;const f=O(m,e).total;if(f<=0)continue;const w=(h-f)/f;w>r&&(r=w)}return r<=0||r===-1/0?null:r<=.05?"minor":r<=.2?"medium":r<=.5?"major":"huge"}_vsItemForCompare(e,t){if(!e||!t)return null;const u=e.equipment||{},a=this._slotsForItem(e,t);if(!a.length)return null;let h=a[0],r=a[1];a.includes("ring1")&&a.includes("ring2")&&(h="ring1",r="ring2");const g=this._compareSecondary&&r?r:h;return{vs:u[g]||null,slot:g,hasSecondary:!!r&&r!==h}}_renderCharStats(e){if(!e)return'<div class="stat-row"><span>No character selected</span></div>';const t=e.baseAttrs||e.attrs,u=e.attrs,a=Y(),h=e.equipment||{};let r=0;for(const p of Object.values(h))p!=null&&p.armor&&(r+=p.armor);const g=0,i=J(e);r+=i.armor||0;const m=Q(h),f=a?t:{STR:u.STR+(i.str||0),DEX:u.DEX+(i.dex||0),INT:u.INT+(i.int||0),CON:u.CON+(i.con||0)},w=Z(h)+(i.dmg||0),s=D(f,a?0:w,m),o=D(t,0,m),d=m==="magic"?"Magic Damage":m==="light"?"Light Damage":"Heavy Damage",n=a?0:i.magicResist||0,l=(p,y)=>({hp:y?st(e):50+p.CON*10,mp:y?ot(e):30+p.INT*8,hit:Math.min(95,70+Math.round(p.DEX*1.2)+(y&&i.hit||0)),dodge:Math.min(40,5+Math.round(p.DEX*.8)+(y&&i.dodge||0)),spl:p.INT*.025+(y&&i.spellPower||0)}),c=l(a?t:f,!a),b=l(t,!1),v=a?g:r,$=a?0:tt(e).resistAll||0,q=A(v,$),T=A(g,0),_=(p,y,E)=>{const P=it(y,E,p);return P?` style="color:${P}"`:""},H=["STR","DEX","INT","CON"].map(p=>{const y=p.toLowerCase(),E=f[p];return`<div class="stat-row"><span class="sr-label stat-label" data-stat="${p}">${p}</span><span class="sr-val"${_(y,E,t[p])}>${Math.floor(E)}</span></div>`}).join(""),M=new Set(["str","dex","int","con","hp","mp","dmg","armor","hit","dodge","magicresist","magicResist","spellpower","spellPower"]),L={goldFind:"Gold Find",xpFind:"XP Find",manaRegen:"Mana Regen",lifeSteal:"Life Steal",manaSteal:"Mana Steal",initiative:"Initiative",critChance:"Crit Chance",critDamage:"Crit Damage",spellPower:"Spell Power",tradePrices:"Trade Prices"},S=[];if(!a){try{const p=et(e);if((p==null?void 0:p.blockChance)>0){const y=`+${R(p.blockChance)}`;S.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="Block Chance">Block Chance</span><span class="sr-val" style="color:#6db3ff">${y}</span></div>`)}(p==null?void 0:p.blockPower)>0&&S.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="Block Power">Block Power</span><span class="sr-val" style="color:#6db3ff">+${Math.round(p.blockPower)}</span></div>`)}catch{}for(const p of Object.keys(i)){if(M.has(p)||M.has(p.toLowerCase()))continue;const y=i[p];if(!y)continue;const E=L[p]||p.replace(/([A-Z])/g," $1").replace(/^./,j=>j.toUpperCase()),N=(p==="goldFind"||p==="xpFind"||p==="critChance"||p==="critDamage"||p==="tradePrices")&&Math.abs(y)<=3?`+${R(y)}`:p==="lifeSteal"||p==="manaSteal"?`+${B(y,"pct")}`:`+${B(y,"auto")}`;S.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="${E}">${E}</span><span class="sr-val" style="color:#6db3ff">${N}</span></div>`)}}const I=S.length?S.join(""):'<div class="stat-row"><span class="sr-label" style="color:#5a4a42;font-style:italic">None</span><span class="sr-val" style="color:#5a4a42">—</span></div>';return`
      <button type="button" class="auto-toggle stats-base-toggle${a?" on":""}" id="stats-base-chk" aria-pressed="${a?"true":"false"}" title="Show base attributes (without item bonuses)">${a?'<span class="auto-check" aria-hidden="true">✓</span>':""}Show Base Attributes</button>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="HP">HP</span><span class="sr-val"${_("hp",c.hp,b.hp)}>${Math.floor(c.hp)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Mana">Mana</span><span class="sr-val"${_("mp",c.mp,b.mp)}>${Math.floor(c.mp)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Armor">Armor</span><span class="sr-val"${_("armor",v,g)}>${Math.floor(v)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Damage Reduction">Damage Reduction</span><span class="sr-val"${_("dmgReduction",q.totalDr,T.totalDr)}>${R(q.totalDr)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Magic Resist">Magic Resist</span><span class="sr-val"${_("magicResist",n,0)}>${Math.floor(n)}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Hit">Hit</span><span class="sr-val"${_("hit",c.hit,b.hit)}>${Math.floor(c.hit)}%</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Dodge">Dodge</span><span class="sr-val"${_("dodge",c.dodge,b.dodge)}>${Math.floor(c.dodge)}%</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="${d}">${d}</span><span class="sr-val"${_("dmg",s[1],o[1])}>${Math.floor(s[0])}-${Math.floor(s[1])}</span></div>
      <div class="stat-row"><span class="sr-label stat-label" data-stat="Spell Power">Spell Power</span><span class="sr-val"${_("spellPower",c.spl,b.spl)}>+${Math.round(c.spl*100)}%</span></div>
      <div class="panel-label" style="margin-top:0.75rem">Attributes</div>
      ${H}
      <div class="panel-label" style="margin-top:0.75rem">Other Effects</div>
      ${I}
    `}_doEquip(e,t,u,a){e.equipment||(e.equipment={}),t.twoHanded&&t.type==="weapon"&&e.equipment.offhand&&(x.addToInventoryRaw(e.equipment.offhand),delete e.equipment.offhand),e.equipment[u]&&x.addToInventoryRaw(e.equipment[u]),e.equipment[u]=t,x.removeFromInventory(t.id),x.unmarkManuallyUnequipped(t.id),F(e)}_showSlotPicker(e,t,u){var i,m;const a=z("div","slot-picker-overlay"),h=(i=e.equipment)==null?void 0:i.weapon,r=(m=e.equipment)==null?void 0:m.offhand,g=h==null?void 0:h.twoHanded;a.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Equip to which slot?</div>
        <div class="spo-item-name" style="color:${`var(--rarity-${t.rarity})`}">${t.name}</div>
        <div class="spo-actions">
          <button type="button" class="spo-btn" id="spo-weapon">
            Main Hand${h?`<br><small style="color:#8a7a6a">Replaces: ${h.name}</small>`:""}
          </button>
          <button type="button" class="spo-btn" id="spo-offhand" ${g?'disabled title="Unequip 2H weapon first"':""}>
            Off Hand${r?`<br><small style="color:#8a7a6a">Replaces: ${r.name}</small>`:""}${g?'<br><small style="color:#c04030">2H equipped</small>':""}
          </button>
        </div>
        <button type="button" class="spo-cancel" id="spo-cancel">Cancel</button>
      </div>
    `,a.querySelector("#spo-weapon").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"weapon",u),k(a),this._render()}),a.querySelector("#spo-offhand").addEventListener("click",()=>{g||(this.audio.playSfx("click"),this._doEquip(e,t,"offhand",u),k(a),this._render())}),a.querySelector("#spo-cancel").addEventListener("click",()=>k(a)),this._el.appendChild(a)}_showRingPicker(e,t,u){var g,i;const a=z("div","slot-picker-overlay"),h=(g=e.equipment)==null?void 0:g.ring1,r=(i=e.equipment)==null?void 0:i.ring2;a.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Equip to which ring slot?</div>
        <div class="spo-item-name" style="color:${`var(--rarity-${t.rarity})`}">${t.name}</div>
        <div class="spo-actions">
          <button type="button" class="spo-btn" id="spo-ring1">
            Ring Slot 1${h?`<br><small style="color:#8a7a6a">Replaces: ${h.name}</small>`:""}
          </button>
          <button type="button" class="spo-btn" id="spo-ring2">
            Ring Slot 2${r?`<br><small style="color:#8a7a6a">Replaces: ${r.name}</small>`:""}
          </button>
        </div>
        <button type="button" class="spo-cancel" id="spo-cancel">Cancel</button>
      </div>
    `,a.querySelector("#spo-ring1").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"ring1",u),k(a),this._render()}),a.querySelector("#spo-ring2").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"ring2",u),k(a),this._render()}),a.querySelector("#spo-cancel").addEventListener("click",()=>k(a)),this._el.appendChild(a)}_showInfoModal(e){const t=z("div","slot-picker-overlay");t.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Notice</div>
        <div class="spo-item-name" style="color:#c0b090;font-style:normal">${e}</div>
        <button type="button" class="spo-cancel" id="info-ok">OK</button>
      </div>
    `,t.querySelector("#info-ok").addEventListener("click",()=>k(t)),t.addEventListener("click",u=>{u.target===t&&k(t)}),this._el.appendChild(t)}_equipItemFlow(e){var m,f,w,s,o,d;const t=x.get(),a=[...t.party,...t.companions][this._selectedCharIdx];if(!a||!e)return;if(a.isCompanion&&a.class==="companion"){this._showInfoModal("Companions cannot equip items.");return}const h=e.type==="weapon",r=e.twoHanded,g=e.offHandOk||!r&&h;if(h&&!r&&g){const n=!!((m=a.equipment)!=null&&m.weapon),l=!!((f=a.equipment)!=null&&f.offhand),c=(s=(w=a.equipment)==null?void 0:w.weapon)==null?void 0:s.twoHanded;if(!n){this._doEquip(a,e,"weapon",t),this._render();return}if(!l&&!c){this._doEquip(a,e,"offhand",t),this._render();return}this._showSlotPicker(a,e,t);return}if(e.subtype==="ring"){const n=!!((o=a.equipment)!=null&&o.ring1),l=!!((d=a.equipment)!=null&&d.ring2);if(!n){this._doEquip(a,e,"ring1",t),this._render();return}if(!l){this._doEquip(a,e,"ring2",t),this._render();return}this._showRingPicker(a,e,t);return}let i=e.slot;i||(h?i="weapon":i=e.subtype),this._doEquip(a,e,i,t),this._render()}_wireEvents(){var w;(w=this._el.querySelector("#inv-close"))==null||w.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()});const e=this._el.querySelector("#inv-autoequip");e&&e.addEventListener("click",()=>{this.audio.playSfx("click");const s=x.get(),d=[...s.party,...s.companions,...s.bench||[]][this._selectedCharIdx];if(!d)return;const n=!d.autoEquip;d.autoEquip=n,n&&ct(d,s,this.audio),this._render()}),this._el.querySelectorAll(".char-tab").forEach(s=>{s.addEventListener("click",()=>{this.audio.playSfx("click");const o=this._el.querySelector(".inv-items-panel")||this._el.querySelector(".equip-panel");o&&this._charScrollPos.set(this._selectedCharIdx,o.scrollTop),this._selectedCharIdx=parseInt(s.dataset.idx),this._render(),requestAnimationFrame(()=>{var n,l;const d=((n=this._el)==null?void 0:n.querySelector(".inv-items-panel"))||((l=this._el)==null?void 0:l.querySelector(".equip-panel"));d&&(d.scrollTop=this._charScrollPos.get(this._selectedCharIdx)||0)})})}),this._el.querySelectorAll("[data-equip]").forEach(s=>{s.addEventListener("click",()=>{var T,_,H,M,L,S;this.audio.playSfx("click");const o=s.dataset.equip,d=x.get(),l=[...d.party,...d.companions][this._selectedCharIdx],c=d.inventory.find(I=>I.id===o);if(!l||!c)return;if(l.isCompanion&&l.class==="companion"){this._showInfoModal("Companions cannot equip items.");return}const b=c.type==="weapon",v=c.twoHanded,$=c.offHandOk||!v&&b;if(b&&!v&&$){const I=!!((T=l.equipment)!=null&&T.weapon),p=!!((_=l.equipment)!=null&&_.offhand),y=(M=(H=l.equipment)==null?void 0:H.weapon)==null?void 0:M.twoHanded;if(!I){this._doEquip(l,c,"weapon",d),this._render();return}if(!p&&!y){this._doEquip(l,c,"offhand",d),this._render();return}this._showSlotPicker(l,c,d);return}if(c.subtype==="ring"){const I=!!((L=l.equipment)!=null&&L.ring1),p=!!((S=l.equipment)!=null&&S.ring2);if(!I){this._doEquip(l,c,"ring1",d),this._render();return}if(!p){this._doEquip(l,c,"ring2",d),this._render();return}this._showRingPicker(l,c,d);return}let q=c.slot;q||(b?q="weapon":q=c.subtype),this._doEquip(l,c,q,d),this._render()})}),this._el.querySelectorAll("[data-slot]").forEach(s=>{s.dataset.itemid&&s.addEventListener("click",()=>{var b;const o=x.get(),n=[...o.party,...o.companions][this._selectedCharIdx],l=s.dataset.slot;if(!((b=n==null?void 0:n.equipment)!=null&&b[l]))return;this.audio.playSfx("click");const c=n.equipment[l];x.markManuallyUnequipped(c.id),x.addToInventoryRaw(c),delete n.equipment[l],F(n),this._render()})});const t=this._el.querySelector("#inv-tt"),u=t==null?void 0:t.querySelector(".inv-tt-body"),a=t==null?void 0:t.querySelector(".inv-tt-close"),h=()=>{const s=x.get(),o=[...s.party,...s.companions,...s.bench||[]];return{gs:s,char:o[this._selectedCharIdx]}},r=s=>{const{gs:o,char:d}=h();return o.inventory.find(n=>n.id===s)||Object.values((d==null?void 0:d.equipment)||{}).find(n=>(n==null?void 0:n.id)===s)},g=s=>{var d;if(!u||!s)return;const{char:o}=h();if(this._compareMode){const n=this._vsItemForCompare(o,s),l=(n==null?void 0:n.vs)||null,c=(n==null?void 0:n.slot)||null;let b=null;n!=null&&n.hasSecondary&&(b=this._isTouch?'Tap "Compare 2nd" below to compare against the other slot.':"Hold Alt+Shift to compare against the other slot.");let v="";if(this._isTouch&&(v+=`<div class="tt-breadcrumb">Inventory <span class="bc-sep">›</span> ${s.name} <span class="bc-sep">›</span> <strong>Compare</strong></div>`),v+=at(s,l,{hero:o,slotLabel:c,secondaryHint:b}),this._isTouch){const $=!!((d=gs==null?void 0:gs.inventory)!=null&&d.find(q=>q.id===s.id));v+=`<div class="tt-cmp-actions">
            <button type="button" class="tt-cmp-btn" data-cmp-action="exit">Back</button>
            ${n!=null&&n.hasSecondary?'<button type="button" class="tt-cmp-btn" data-cmp-action="secondary">Compare 2nd</button>':""}
            ${$?'<button type="button" class="tt-cmp-btn primary" data-cmp-action="equip">Equip</button>':""}
          </div>`}u.innerHTML=v}else{let n="";if(this._isTouch&&(n+=`<div class="tt-breadcrumb">Inventory <span class="bc-sep">›</span> <strong>${s.name}</strong></div>`),n+=nt(s,o),this._isTouch){const l=this._slotsForItem(o,s),b=!!x.get().inventory.find(v=>v.id===s.id);l.length&&(n+=`<div class="tt-cmp-actions">
              ${l.length?'<button type="button" class="tt-cmp-btn" data-cmp-action="enter">Compare</button>':""}
              ${b?'<button type="button" class="tt-cmp-btn primary" data-cmp-action="equip">Equip</button>':""}
            </div>`)}u.innerHTML=n}u.querySelectorAll("[data-cmp-action]").forEach(n=>{n.addEventListener("click",l=>{l.stopPropagation();const c=n.dataset.cmpAction;if(c==="enter")this._compareMode=!0,this._compareSecondary=!1;else if(c==="exit")this._compareMode=!1,this._compareSecondary=!1;else if(c==="secondary")this._compareSecondary=!this._compareSecondary;else if(c==="equip"){this.audio.playSfx("click");const b=this._currentTooltipItem;m(),this._equipItemFlow(b);return}this._currentTooltipItem&&g(this._currentTooltipItem)})})},i=(s,o,d,n)=>{if(!t||!s)return;this._currentTooltipItem=s,g(s),t.style.display="block",t.classList.toggle("touch-open",!!n);const l=8,c=window.innerWidth,b=window.innerHeight;t.style.left=Math.max(l,o+12)+"px",t.style.top=Math.max(l,d+12)+"px";const v=t.getBoundingClientRect();let $=v.left,q=v.top;v.right>c-l&&($=Math.max(l,c-v.width-l)),v.bottom>b-l&&(q=Math.max(l,b-v.height-l)),t.style.left=$+"px",t.style.top=q+"px"},m=()=>{t&&(t.style.display="none",t.classList.remove("touch-open"),this._currentTooltipItem=null,this._isTouch||(this._compareMode=!1,this._compareSecondary=!1))};a==null||a.addEventListener("click",s=>{s.stopPropagation(),m()});const f=(s,o)=>{for(const d of s){const n=this._el.querySelector(`.equip-slot[data-slot="${d}"]`);n&&n.classList.toggle("slot-hover",o)}};if(this._el.querySelectorAll(".inv-item-card, .es-item").forEach(s=>{s.addEventListener("pointerenter",o=>{if(o.pointerType==="touch"||o.pointerType==="pen")return;const d=s.dataset.id||s.dataset.itemid,n=r(d);if(n){if(s.classList.contains("inv-item-card")){const{char:l}=h(),c=this._slotsForItem(l,n);f(c,!0),s._hoverSlots=c}this._isTouch||(this._compareMode=!!o.altKey,this._compareSecondary=!!(o.altKey&&o.shiftKey)),i(n,o.clientX,o.clientY,!1)}}),s.addEventListener("pointerleave",o=>{o.pointerType==="touch"||o.pointerType==="pen"||(s._hoverSlots&&(f(s._hoverSlots,!1),s._hoverSlots=null),m())}),s.addEventListener("click",o=>{if(!(o.pointerType==="touch"||o.pointerType==="pen"||this._isTouch)||o.target.closest&&o.target.closest(".iic-equip-btn"))return;const n=s.dataset.id||s.dataset.itemid,l=r(n);if(!l)return;const c=s.getBoundingClientRect();i(l,c.left,c.bottom,!0)})}),!this._isTouch&&t&&!t._altBound){t._altBound=!0;const s=o=>{if(t.style.display==="none"||!this._currentTooltipItem||o.key!=="Alt"&&o.key!=="Shift")return;const d=!!o.altKey||o.type==="keydown"&&o.key==="Alt",n=d&&(!!o.shiftKey||o.type==="keydown"&&o.key==="Shift"),l=o.type==="keyup"?o.key==="Alt"?!1:!!o.altKey:d,c=o.type==="keyup"?o.key==="Shift"?!1:!!o.altKey&&!!o.shiftKey:n;this._compareMode===l&&this._compareSecondary===c||(this._compareMode=l,this._compareSecondary=c,g(this._currentTooltipItem))};window.addEventListener("keydown",s),window.addEventListener("keyup",s),t._altKeyHandler=s}t&&!t._outsideBound&&(t._outsideBound=!0,document.addEventListener("click",s=>{var o,d;t.style.display!=="none"&&t.classList.contains("touch-open")&&(t.contains(s.target)||(d=(o=s.target).closest)!=null&&d.call(o,".inv-item-card, .es-item")||m())},!0))}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){const e=x.get();e.inventoryContext=null,k(this._el),this._el=null}destroy(){k(this._el),this._el=null}}const dt=`
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
`;export{mt as InventoryScreen};
