import{U as b,b as h,I as s,W as c,D as p}from"./main-jTBrLZ97.js";const m="spellroads-vendor-style";function f(){if(document.getElementById(m))return;const v=document.createElement("style");v.id=m,v.textContent=`
    /* ══════════════════════════════════════════════════════════════
       VendorPanel — Spellroads
       ══════════════════════════════════════════════════════════════ */

    #panel-vendor {
      position: fixed;
      inset: 0;
      z-index: 215;
      display: none;
      background: rgba(8, 6, 4, 0.97);
      flex-direction: column;
      pointer-events: all;
      overflow: hidden;
      font-family: 'Georgia', 'Times New Roman', serif;
    }
    #panel-vendor.visible { display: flex; }

    /* ── Header ──────────────────────────────────────────────────── */
    .vnd-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: clamp(8px,1.5vh,14px) clamp(12px,2vw,24px);
      background: rgba(0,0,0,0.5);
      border-bottom: 1px solid rgba(200,160,32,0.25);
      flex-shrink: 0;
      gap: 12px;
    }
    .vnd-title { font-size: clamp(0.9rem,1.8vw,1.2rem); font-weight: 700; color: #c8a020; letter-spacing: 0.08em; text-transform: uppercase; }
    .vnd-vendor-name { font-size: clamp(0.7rem,1.2vw,0.85rem); color: #d4b870; }
    .vnd-close {
      background: none; border: 1px solid rgba(200,160,32,0.3); color: #a09070;
      cursor: pointer; width: 36px; height: 36px; min-width: 36px; min-height: 36px;
      border-radius: 4px; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;
      transition: color 0.15s, border-color 0.15s;
    }
    .vnd-close:hover { color: #c8a020; border-color: #c8a020; }

    /* ── Body ─────────────────────────────────────────────────────── */
    .vnd-body {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
      min-height: 0;
    }

    /* ── Panels ──────────────────────────────────────────────────── */
    .vnd-panel {
      padding: clamp(10px,1.5vw,16px);
      overflow-y: auto;
      border-right: 1px solid rgba(200,160,32,0.12);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .vnd-panel:last-child { border-right: none; }
    .vnd-panel-title {
      font-size: clamp(0.62rem,1vw,0.72rem);
      color: #c8a020;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(200,160,32,0.15);
      flex-shrink: 0;
    }

    /* ── Item rows ───────────────────────────────────────────────── */
    .vnd-item-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(200,160,32,0.1);
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.12s, border-color 0.12s;
      min-height: 44px;
      user-select: none;
    }
    .vnd-item-row:hover { background: rgba(200,160,32,0.07); border-color: rgba(200,160,32,0.3); }
    .vnd-item-row.selected { background: rgba(200,160,32,0.12); border-color: rgba(200,160,32,0.5); }
    .vnd-item-row.insufficient { opacity: 0.5; cursor: not-allowed; }
    .vnd-item-icon { font-size: 1.3rem; flex-shrink: 0; width: 28px; text-align: center; }
    .vnd-item-info { flex: 1; min-width: 0; }
    .vnd-item-name { font-size: clamp(0.65rem,1.1vw,0.78rem); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .vnd-item-sub  { font-size: 0.58rem; color: #706050; text-transform: uppercase; letter-spacing: 0.04em; }
    .vnd-item-price {
      font-size: clamp(0.65rem,1.1vw,0.78rem);
      color: #d4b870;
      font-weight: 600;
      flex-shrink: 0;
      min-width: 48px;
      text-align: right;
    }
    .vnd-item-price.sell-price { color: #70a060; }
    .vnd-item-price.warn-price { color: #c83020; }

    /* ── Footer ──────────────────────────────────────────────────── */
    .vnd-footer {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: clamp(8px,1.5vh,12px) clamp(12px,2vw,24px);
      background: rgba(0,0,0,0.4);
      border-top: 1px solid rgba(200,160,32,0.15);
      flex-shrink: 0;
      flex-wrap: wrap;
    }
    .vnd-gold {
      font-size: clamp(0.75rem,1.3vw,0.9rem);
      color: #d4b870;
      font-weight: 600;
      flex: 1;
    }
    .vnd-btn {
      padding: 8px 18px;
      background: rgba(42,32,24,0.9);
      border: 1px solid rgba(200,160,32,0.3);
      border-radius: 4px;
      color: #c8d0a0;
      font-family: inherit;
      font-size: clamp(0.65rem,1.1vw,0.78rem);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      min-height: 44px;
      min-width: 80px;
      transition: background 0.12s, border-color 0.12s, color 0.12s;
    }
    .vnd-btn:hover { background: rgba(200,160,32,0.12); border-color: rgba(200,160,32,0.6); color: #c8a020; }
    .vnd-btn:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
    .vnd-btn.primary { background: #4a3a10; border-color: #c8a020; color: #c8a020; }
    .vnd-btn.primary:hover { background: #6a5a20; }
    .vnd-btn.success { border-color: #40a060; color: #40a060; }
    .vnd-btn.success:hover { background: rgba(64,160,96,0.12); }

    /* ── Message bar ─────────────────────────────────────────────── */
    .vnd-message {
      font-size: clamp(0.6rem,1vw,0.72rem);
      padding: 6px clamp(12px,2vw,24px);
      background: rgba(0,0,0,0.3);
      border-top: 1px solid rgba(200,160,32,0.08);
      color: #a09070;
      min-height: 28px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }
    .vnd-message.success { color: #40a060; }
    .vnd-message.error   { color: #c83020; }
    .vnd-message.warn    { color: #e07820; }

    /* ── Haggle result ───────────────────────────────────────────── */
    .vnd-haggle-badge {
      font-size: 0.6rem;
      padding: 2px 6px;
      border-radius: 3px;
      background: rgba(64,160,96,0.2);
      border: 1px solid rgba(64,160,96,0.4);
      color: #40a060;
    }

    /* ── Mobile ───────────────────────────────────────────────────── */
    @media (max-width: 767px) and (orientation: portrait) {
      .vnd-body { grid-template-columns: 1fr; }
      .vnd-panel { border-right: none; border-bottom: 1px solid rgba(200,160,32,0.12); max-height: 45vh; }
    }
  `,document.head.appendChild(v)}const y=.3,g=.1,_=.25,x=8;class w extends b{constructor(){f(),super("panel-vendor",{trapFocus:!1,zLayer:"modal"}),this._vendor=null,this._vendorStock=[],this._selectedVendorItem=null,this._selectedPlayerItem=null,this._char=null,this._discountMultiplier=1,this._haggleUsedDay=null}_buildHTML(){return`
      <div class="vnd-header">
        <div>
          <div class="vnd-title">Merchant</div>
          <div class="vnd-vendor-name" id="vnd-vendor-name">Unknown Vendor</div>
        </div>
        <button class="vnd-close" id="vnd-close-btn" tabindex="0" aria-label="Close vendor">×</button>
      </div>
      <div class="vnd-body">
        <div class="vnd-panel" id="vnd-stock-panel">
          <div class="vnd-panel-title">For Sale</div>
          <div id="vnd-stock-list"></div>
        </div>
        <div class="vnd-panel" id="vnd-player-panel">
          <div class="vnd-panel-title">Your Inventory</div>
          <div id="vnd-player-list"></div>
        </div>
      </div>
      <div class="vnd-message" id="vnd-message"></div>
      <div class="vnd-footer">
        <span class="vnd-gold" id="vnd-gold-display">Gold: 0</span>
        <span id="vnd-haggle-badge" style="display:none" class="vnd-haggle-badge"></span>
        <button class="vnd-btn primary" id="vnd-buy-btn" disabled>Buy</button>
        <button class="vnd-btn success" id="vnd-sell-btn" disabled>Sell</button>
        <button class="vnd-btn" id="vnd-haggle-btn">Haggle</button>
        <button class="vnd-btn" id="vnd-close-btn2" tabindex="0">Close</button>
      </div>
    `}show(e={}){const{vendor:t=null,character:n=null}=e??{};this._vendor=t??this._createDefaultVendor(),this._char=n??this._getDefaultChar(),this._selectedVendorItem=null,this._selectedPlayerItem=null,this._discountMultiplier=1,this._haggleUsedDay=null,this._vendorStock=this._generateVendorStock(this._vendor),super.show(e),this._bindEvents(),this._renderAll()}hide(){super.hide()}updateContent(){this._renderAll()}_getDefaultChar(){const e=h.getAll();return e.find(t=>t.isHero)??e[0]??null}_createDefaultVendor(){return{id:"default_vendor",name:"Wandering Merchant",regionLevel:1,specialization:"general"}}_generateVendorStock(e){s.init();const t=e.regionLevel??1,n=[],r=["health_potion_small","health_potion_medium","mana_potion_small","antidote","scroll_of_identify","repair_kit","ration_poor","ration_good"];for(const l of r){const o=s.createInstance(l,{identified:!0});o&&(o.quantity=3+Math.floor(Math.random()*5),n.push(o))}const i=3+Math.floor(Math.random()*4),d=["common","common","magic","magic","rare"];for(let l=0;l<i;l++){const o=d[Math.floor(Math.random()*d.length)],a=s.generateItem(Math.max(1,t),null,o);a&&(a.identified=!0,a.affixes&&a.affixes.forEach(u=>{u.identified=!0}),n.push(a))}return n}_getBuyPrice(e){const t=s.getBaseItem(e.baseId);if(!t)return 1;const n={common:1,magic:2.5,rare:6,legendary:15,unique:30},r=Math.max(1,Math.floor((t.level??1)*8+(t.weight??0)*2));return Math.max(1,Math.floor(r*(n[e.rarity]??1)*this._discountMultiplier))}_getSellPrice(e){return Math.max(1,Math.floor(this._getBuyPrice(e)*y))}_bindEvents(){const e=this.el.querySelector("#vnd-close-btn");e&&!e._vndBound&&(e.addEventListener("click",()=>this.hide()),e._vndBound=!0);const t=this.el.querySelector("#vnd-close-btn2");t&&!t._vndBound&&(t.addEventListener("click",()=>this.hide()),t._vndBound=!0);const n=this.el.querySelector("#vnd-buy-btn");n&&!n._vndBound&&(n.addEventListener("click",()=>this._doBuy()),n._vndBound=!0);const r=this.el.querySelector("#vnd-sell-btn");r&&!r._vndBound&&(r.addEventListener("click",()=>this._doSell()),r._vndBound=!0);const i=this.el.querySelector("#vnd-haggle-btn");i&&!i._vndBound&&(i.addEventListener("click",()=>this._doHaggle()),i._vndBound=!0)}_renderAll(){this._renderVendorName(),this._renderGold(),this._renderVendorStock(),this._renderPlayerInventory(),this._updateButtons()}_renderVendorName(){const e=this.el.querySelector("#vnd-vendor-name");e&&(e.textContent=this._vendor?.name??"Unknown Vendor")}_renderGold(){const e=this.el.querySelector("#vnd-gold-display");e&&(e.textContent=`Gold: ${c.partyGold??0}`)}_renderVendorStock(){const e=this.el.querySelector("#vnd-stock-list");if(e){e.innerHTML="";for(const t of this._vendorStock){const n=s.getBaseItem(t.baseId);if(!n)continue;const r=this._getBuyPrice(t),i=(c.partyGold??0)>=r,d=s.getRarityColor(t.rarity),l=s.getItemName(t),o=document.createElement("div");o.className="vnd-item-row"+(t===this._selectedVendorItem?" selected":"")+(i?"":" insufficient"),o.innerHTML=`
        <div class="vnd-item-icon">${this._getItemIcon(t)}</div>
        <div class="vnd-item-info">
          <div class="vnd-item-name" style="color:${d}">${l}</div>
          <div class="vnd-item-sub">${n.type}${n.subtype?" · "+n.subtype:""}</div>
        </div>
        <div class="vnd-item-price${i?"":" warn-price"}">${r}g</div>
      `,o.addEventListener("click",()=>{this._selectedVendorItem=t,this._selectedPlayerItem=null,this._renderAll()}),o.addEventListener("dblclick",()=>{this._selectedVendorItem=t,this._doBuy()}),e.appendChild(o)}this._vendorStock.length===0&&(e.innerHTML='<div style="color:#706050;font-size:0.7rem;padding:8px">No items for sale.</div>')}}_renderPlayerInventory(){const e=this.el.querySelector("#vnd-player-list");if(!e||!this._char)return;e.innerHTML="";const t=this._char.inventory??[];for(const n of t){const r=s.getBaseItem(n.baseId);if(!r)continue;const i=this._getSellPrice(n),d=s.getRarityColor(n.rarity),l=s.getItemName(n),o=document.createElement("div");o.className="vnd-item-row"+(n===this._selectedPlayerItem?" selected":""),o.innerHTML=`
        <div class="vnd-item-icon">${this._getItemIcon(n)}</div>
        <div class="vnd-item-info">
          <div class="vnd-item-name" style="color:${d}">${l}</div>
          <div class="vnd-item-sub">${r.type}${r.subtype?" · "+r.subtype:""}</div>
        </div>
        <div class="vnd-item-price sell-price">${i}g</div>
      `,o.addEventListener("click",()=>{this._selectedPlayerItem=n,this._selectedVendorItem=null,this._renderAll()}),o.addEventListener("dblclick",()=>{this._selectedPlayerItem=n,this._doSell()}),e.appendChild(o)}t.length===0&&(e.innerHTML='<div style="color:#706050;font-size:0.7rem;padding:8px">Your inventory is empty.</div>')}_updateButtons(){const e=this.el.querySelector("#vnd-buy-btn"),t=this.el.querySelector("#vnd-sell-btn"),n=this.el.querySelector("#vnd-haggle-btn");if(e){const r=!!this._selectedVendorItem&&(c.partyGold??0)>=this._getBuyPrice(this._selectedVendorItem);e.disabled=!r}t&&(t.disabled=!this._selectedPlayerItem),n&&(n.disabled=this._discountMultiplier<1)}_doBuy(){if(!this._selectedVendorItem||!this._char)return;const e=this._selectedVendorItem,t=this._getBuyPrice(e),n=c.partyGold??0;if(n<t){this._setMessage("Not enough gold.","error");return}const r=s.getItemWeight(e),i=[this._char],d=c.getPartyEncumbrance(i);d.current+r>d.max?this._setMessage("Purchased (overencumbered — move speed reduced).","warn"):this._setMessage(`Purchased ${s.getItemName(e)} for ${t}g.`,"success"),c.partyGold=n-t;const l=s.getBaseItem(e.baseId),o=l?.stackable?s.createInstance(e.baseId,{rarity:e.rarity,identified:!0}):e;if(l?.stackable&&e.quantity>1)e.quantity-=1;else{const a=this._vendorStock.indexOf(e);a!==-1&&this._vendorStock.splice(a,1)}o&&(this._char.inventory=this._char.inventory??[],this._char.inventory.push(o)),this._selectedVendorItem=null,p.event(`[vendor] Buy; item=${e.baseId} price=${t} gold=${c.partyGold}`),this._renderAll()}_doSell(){if(!this._selectedPlayerItem||!this._char)return;const e=this._selectedPlayerItem,t=this._getSellPrice(e),n=s.getItemName(e),r=this._char.inventory??[],i=r.indexOf(e);i!==-1&&(e.quantity>1?e.quantity-=1:r.splice(i,1),this._char.inventory=r),c.partyGold=(c.partyGold??0)+t,this._selectedPlayerItem=null,this._setMessage(`Sold ${n} for ${t}g.`,"success"),p.event(`[vendor] Sell; item=${e.baseId} price=${t} gold=${c.partyGold}`),this._renderAll()}_doHaggle(){if(this._discountMultiplier<1){this._setMessage("You have already haggled with this vendor today.","warn");return}if(!this._char)return;const e=this._vendor?.regionLevel??1,t=x+e,n=h.getAttributeModifier(this._char.attributes?.presence??10),r=h.getProficiencyBonus(this._char.level??1),i=Math.floor(Math.random()*20)+1,d=i+n+r;if(p.event(`[vendor] Haggle; roll=${i} total=${d} dc=${t} presence=${n}`),d>=t){const o=g+Math.random()*(_-g);this._discountMultiplier=1-o;const a=Math.round(o*100);this._setMessage(`Haggle success! (rolled ${d} vs DC ${t}) — ${a}% discount for today.`,"success");const u=this.el.querySelector("#vnd-haggle-badge");u&&(u.style.display="",u.textContent=`-${a}%`)}else{this._discountMultiplier=1;const o=t-d;this._setMessage(`Haggle failed (rolled ${d} vs DC ${t}, missed by ${o}). Vendor is annoyed.`,"error")}const l=this.el.querySelector("#vnd-haggle-btn");l&&(l.disabled=!0),this._renderAll()}_setMessage(e,t=""){const n=this.el.querySelector("#vnd-message");n&&(n.textContent=e,n.className="vnd-message"+(t?" "+t:""))}_getItemIcon(e){const t=s.getBaseItem(e.baseId);if(!t)return"?";const r={weapon:"⚔",armor:"🧥",shield:"🛡",accessory:"💍",offhand:"🛡",consumable:{potion:"🧪",scroll:"📜",food:"🍽",default:"🧪"},tool:"🔧"}[t.type];return r?typeof r=="object"?r[t.subtype]??r.default??"🧪":r:"📦"}}export{w as default};
//# sourceMappingURL=VendorPanel-fBtpuPNf.js.map
