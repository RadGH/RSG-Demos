import{w as ut,y as dt,z as mt,B as gt,D as K,E as ft,F as Y,H as bt,L as W,N as G,O as ht,G as _,o as j,i as vt,c as kt,R as Z,T as J,p as xt,j as yt,q as $t,s as Q,S as V,U as tt,V as et,C as _t,W as F,K as st,X as wt,r as at}from"./play-sHrkshvb.js";import{showConfirmModal as it}from"./ConfirmModal-0PIesmvQ.js";import"./savesClient-DUFjgBxb.js";let D=null;function nt(){D&&D.parentNode&&D.parentNode.removeChild(D),D=null}function St(p,e){const r=e.getBoundingClientRect(),t=p.getBoundingClientRect();let d=r.left+r.width/2-t.width/2,s=r.top-t.height-10;d<10&&(d=10),d+t.width>window.innerWidth-10&&(d=window.innerWidth-t.width-10),s<10&&(s=r.bottom+10),p.style.left=`${d}px`,p.style.top=`${s}px`}function ot(p,e,r={}){if(!p)return()=>{};const t=r.className||"rsg-tooltip",d=g=>{nt();const f=e();if(!f)return;const u=document.createElement("div");u.className=t,u.innerHTML=f,document.body.appendChild(u),D=u,St(u,g.currentTarget||p)},s=()=>nt();p.addEventListener("mouseenter",d),p.addEventListener("mouseleave",s);let a=null;const n=g=>{clearTimeout(a),a=setTimeout(()=>d(g),350)},i=()=>{clearTimeout(a),setTimeout(s,1500)},o=()=>{clearTimeout(a),s()};return p.addEventListener("touchstart",n,{passive:!0}),p.addEventListener("touchend",i),p.addEventListener("touchcancel",o),()=>{p.removeEventListener("mouseenter",d),p.removeEventListener("mouseleave",s),p.removeEventListener("touchstart",n),p.removeEventListener("touchend",i),p.removeEventListener("touchcancel",o),clearTimeout(a)}}function lt(){if(document.getElementById("rsg-tooltip-styles"))return;const p=document.createElement("style");p.id="rsg-tooltip-styles",p.textContent=`
    .rsg-tooltip {
      position: fixed;
      z-index: 3000;
      max-width: min(360px, calc(100vw - 16px));
      padding: 0.55rem 0.75rem;
      background: #140a18;
      border: 1px solid #e8a020;
      border-radius: 6px;
      color: #f0e8d8;
      font-family: 'Inter', sans-serif;
      font-size: 0.78rem;
      line-height: 1.4;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(232, 160, 32, 0.25);
      pointer-events: none;
      box-sizing: border-box;
    }
    .rsg-tooltip .tt-title { color: #ffd060; font-weight: bold; margin-bottom: 0.3rem; }
    .rsg-tooltip .tt-sub { color: rgba(200,160,100,0.75); font-size: 0.7rem; margin-bottom: 0.35rem; }
    .rsg-tooltip .tt-row { margin: 0.15rem 0; }
    .rsg-tooltip .tt-divider { border-top: 1px solid rgba(232,160,32,0.25); margin: 0.4rem 0; }
  `,document.head.appendChild(p)}function Pt(p){return p==="magic"?"Magic Damage":p==="light"?"Light Damage":"Heavy Damage"}function Ct(p,e={}){const{withSpendButtons:r=!1,pendingAttrPoints:t=0,includeHeader:d=!1,headerLabel:s=r?"Attributes":"Character Stats",baseToggleId:a="stats-base-chk"}=e;if(!p)return'<div class="stat-row"><span>No character selected</span></div>';const n=p.baseAttrs||p.attrs||{STR:8,DEX:8,INT:8,CON:8},i=p.attrs||n,o=ut(),g=p.equipment||{};let f=0;for(const c of Object.values(g))c!=null&&c.armor&&(f+=c.armor);const u=0,m=dt(p);f+=m.armor||0;const v=mt(g),x=o?n:{STR:(i.STR||8)+(m.str||0),DEX:(i.DEX||8)+(m.dex||0),INT:(i.INT||8)+(m.int||0),CON:(i.CON||8)+(m.con||0)},h=gt(g)+(m.dmg||0),l=K(x,o?0:h,v),b=K(n,0,v),$=Pt(v),E=o?0:m.magicResist||0,C=(c,k)=>({hp:k?G(p):50+c.CON*10,mp:k?W(p):30+c.INT*8,hit:Math.min(95,70+Math.round(c.DEX*1.2)+(k&&m.hit||0)),dodge:Math.min(40,5+Math.round(c.DEX*.8)+(k&&m.dodge||0)),spl:+(c.INT*.025+(k&&m.spellPower||0)).toFixed(2)}),y=C(o?n:x,!o),P=C(n,!1),O=o?u:f,z=o?0:ft(p).resistAll||0,I=Y(O,z),X=Y(u,0),w=(c,k,S)=>{const M=ht(k,S,c);return M?` style="color:${M}"`:""},U=["STR","DEX","INT","CON"].map(c=>{const k=c.toLowerCase(),S=x[c],M=w(k,S,n[c]);if(r){const R=t>0;return`
        <div class="stat-row stat-row-attr">
          <span class="sr-label stat-label" data-stat="${c}">${c}</span>
          <span class="sr-val"${M}>${Math.floor(S)}</span>
          <button type="button" class="sr-attr-btn${R?"":" disabled"}" data-attr="${c}" ${R?"":"disabled"} aria-label="Increase ${c}">+1</button>
        </div>`}return`<div class="stat-row"><span class="sr-label stat-label" data-stat="${c}">${c}</span><span class="sr-val"${M}>${Math.floor(S)}</span></div>`}).join(""),H=new Set(["str","dex","int","con","hp","mp","dmg","armor","hit","dodge","magicresist","magicResist","spellpower","spellPower"]),B={goldFind:"Gold Find",xpFind:"XP Find",manaRegen:"Mana Regen",lifeSteal:"Life Steal",manaSteal:"Mana Steal",initiative:"Initiative",critChance:"Crit Chance",critDamage:"Crit Damage",spellPower:"Spell Power",tradePrices:"Trade Prices"},A=[];if(!o){try{const c=bt(p);if((c==null?void 0:c.blockChance)>0){const k=`+${(c.blockChance*100).toFixed(1).replace(/\.0$/,"")}%`;A.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="Block Chance">Block Chance</span><span class="sr-val" style="color:#6db3ff">${k}</span></div>`)}(c==null?void 0:c.blockPower)>0&&A.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="Block Power">Block Power</span><span class="sr-val" style="color:#6db3ff">+${Math.round(c.blockPower)}</span></div>`)}catch{}for(const c of Object.keys(m)){if(H.has(c)||H.has(c.toLowerCase()))continue;const k=m[c];if(!k)continue;const S=B[c]||c.replace(/([A-Z])/g," $1").replace(/^./,pt=>pt.toUpperCase()),ct=(c==="goldFind"||c==="xpFind"||c==="critChance"||c==="critDamage"||c==="tradePrices")&&Math.abs(k)<=3?`+${(k*100).toFixed(1).replace(/\.0$/,"")}%`:c==="lifeSteal"||c==="manaSteal"?`+${Math.round(k*10)/10}%`:`+${Math.round(k*100)/100}`;A.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="${S}">${S}</span><span class="sr-val" style="color:#6db3ff">${ct}</span></div>`)}}const T=A.length?A.join(""):'<div class="stat-row"><span class="sr-label" style="color:#5a4a42;font-style:italic">None</span><span class="sr-val" style="color:#5a4a42">—</span></div>',L=d?`<div class="panel-label">${s}</div>`:"",N=`<button type="button" class="auto-toggle stats-base-toggle${o?" on":""}" id="${a}" aria-pressed="${o?"true":"false"}" title="Show base attributes (without item bonuses)">${o?'<span class="auto-check" aria-hidden="true">✓</span>':'<span class="auto-check auto-off" aria-hidden="true">○</span>'}Show Base Attributes</button>`,q=`
    <div class="stat-row"><span class="sr-label stat-label" data-stat="HP">HP</span><span class="sr-val"${w("hp",y.hp,P.hp)}>${Math.floor(y.hp)}</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Mana">Mana</span><span class="sr-val"${w("mp",y.mp,P.mp)}>${Math.floor(y.mp)}</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Armor">Armor</span><span class="sr-val"${w("armor",O,u)}>${Math.floor(O)}</span></div>
    <div class="stat-row" title="Armor ${(I.armorDr*100).toFixed(1)}% + Misc ${(I.miscDr*100).toFixed(1)}% (multiplicative)"><span class="sr-label stat-label" data-stat="Damage Reduction">Damage Reduction</span><span class="sr-val"${w("dmgReduction",I.totalDr,X.totalDr)}>${(I.totalDr*100).toFixed(1)}%</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Magic Resist">Magic Resist</span><span class="sr-val"${w("magicResist",E,0)}>${Math.floor(E)}</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Hit">Hit</span><span class="sr-val"${w("hit",y.hit,P.hit)}>${Math.floor(y.hit)}%</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Dodge">Dodge</span><span class="sr-val"${w("dodge",y.dodge,P.dodge)}>${Math.floor(y.dodge)}%</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="${$}">${$}</span><span class="sr-val"${w("dmg",l[1],b[1])}>${Math.floor(l[0])}-${Math.floor(l[1])}</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Spell Power">Spell Power</span><span class="sr-val"${w("spellPower",y.spl,P.spl)}>+${Math.round(y.spl*100)}%</span></div>
  `;return r?`
      ${L}
      ${N}
      <div class="cs-stats-grid">
        <div class="cs-section cs-section-attrs">
          <div class="panel-label">Attributes</div>
          ${U}
        </div>
        <div class="cs-section cs-section-derived">
          <div class="panel-label">Derived Stats</div>
          ${q}
          <div class="panel-label" style="margin-top:0.75rem">Other Effects</div>
          ${T}
        </div>
      </div>
    `:`
    ${L}
    ${N}
    <div class="cs-stats-grid">
      <div class="cs-section cs-section-derived">
        ${q}
      </div>
      <div class="cs-section cs-section-attrs">
        <div class="panel-label">Attributes</div>
        ${U}
        <div class="panel-label" style="margin-top:0.75rem">Other Effects</div>
        ${T}
      </div>
    </div>
  `}const rt={active:"auto_active",passive:"auto_passive",attrs:"auto_attrs"},Tt={active:"pendingSkillPoints",passive:"pendingPassivePoints",attrs:"pendingAttrPoints"},At={active:"Auto-spend talent points",passive:"Auto-spend passive points",attrs:"Auto-spend attribute points"},Mt={active:"Talent points will be auto-spent on each level-up using the class default order. You will not get a chance to pick talents yourself until you turn this off.",passive:"Passive points will be auto-spent on each level-up using the class default order. You will not get to choose which passives to learn until you turn this off.",attrs:"Attribute points will be auto-spent on each level-up using the class default priority. You will not get to choose which attributes to raise until you turn this off."};function Et(p){if(!p||typeof p!="object")return[];const e=[],r=s=>`${Math.round(s*100)}%`,t=s=>`${s} round${s===1?"":"s"}`,d={targets:s=>`Hits ${s} targets`,damageMult:s=>`Damage: ${s}x multiplier`,damage_mult:s=>`Damage: ${s}x multiplier`,dmgBuff:s=>`+${r(s)} party damage`,dmgReduct:s=>`-${r(s)} damage taken`,reflect:s=>`Reflects ${r(s)} damage back`,duration:s=>`Lasts ${t(s)}`,aoe:s=>`Area: ${s}`,tempHp:s=>`+${s} temporary HP per member`,healMult:s=>`Heals ${s}x multiplier`,attackSpeed:s=>`+${r(s)} attack speed`,mpCost:s=>s<0?`Mana cost -${Math.abs(s)}`:`Mana cost +${s}`,bleed:s=>`Applies Bleed (${t((s==null?void 0:s.duration)??s)})`,statusEffects:s=>Array.isArray(s)?s.map(a=>`${Math.round((a.chance||1)*100)}% chance: ${a.type} (${t(a.duration)})`).join(", "):String(s),status_apply:s=>`Applies ${s}`,immuneStun:s=>s?"Immune to Stun":"",immuneBleed:s=>s?"Immune to Bleed":"",unlocksCompanion:s=>`Unlocks companion: ${s}`};for(const[s,a]of Object.entries(p)){if(a==null||a===!1)continue;const n=d[s];if(n){const i=n(a);i&&e.push(i)}else{const i=s.replace(/_/g," ").replace(/([A-Z])/g," $1").trim(),o=typeof a=="object"?JSON.stringify(a):String(a);e.push(`${i}: ${o}`)}}return e}class Lt{constructor(e,r){this.manager=e,this.audio=r,this._el=null,this._selectedCharIdx=0,this._selectedSkill=null,this._mobileDetailView=!1,this._tab="active"}onEnter(){try{const e=_.get(),r=(e==null?void 0:e.party)||[];let t=-1;e!=null&&e.skillFocusId&&(t=r.findIndex(s=>s&&s.id===e.skillFocusId),e.skillFocusId=null),t<0&&(t=r.findIndex(s=>s&&(s.pendingSkillPoints||0)+(s.pendingPassivePoints||0)+(s.pendingAttrPoints||0)>0)),t>=0&&(this._selectedCharIdx=t);const d=r[this._selectedCharIdx];d&&!this._tabPinned&&((d.pendingSkillPoints||0)>0?this._tab="active":(d.pendingPassivePoints||0)>0?this._tab="passive":(d.pendingAttrPoints||0)>0&&(this._tab="attrs")),this._tabPinned=!1;for(const s of r){if(!s||!s.autoBuild||j())continue;const a=this._tab;for(const n of["active","passive","attrs"]){if(!s.autoBuild[`auto_${n}`])continue;this._tab=n;const i=this._selectedCharIdx;this._selectedCharIdx=r.indexOf(s);let o=0;for(;this._applyOneRecommended(s)&&o++<200;);this._selectedCharIdx=i}this._tab=a}}catch{}this._build()}_build(){vt("skill-styles",zt),this._el=kt("div","skill-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){var f,u,m,v,x,h;const r=_.get().party,t=r[this._selectedCharIdx],d=t?Z(t.class):[],s=t?J(t.class,t.level||1):[],a=(t==null?void 0:t.talentsPurchased)||{},n={};for(const l of[".skill-list-panel",".skill-detail-panel",".passive-panel",".attrs-panel"]){const b=this._el.querySelector(l);b&&(n[l]=b.scrollTop)}const i=window.scrollY||document.documentElement.scrollTop,o=document.activeElement;if(o&&o!==document.body&&typeof o.blur=="function")try{o.blur()}catch{}this._el.innerHTML=`
      <div class="skill-header">
        <div class="skill-char-tabs" id="skill-char-tabs">
          ${r.map((l,b)=>{const $=(l.pendingSkillPoints||0)+(l.pendingPassivePoints||0)+(l.pendingAttrPoints||0),E=$>0&&b!==this._selectedCharIdx;return`
            <button type="button" class="sct-tab${b===this._selectedCharIdx?" active":""}" data-idx="${b}">
              <span class="sct-portrait">${xt(l,24)}</span>
              ${l.name} ${yt(l,12,"sct-class-icon")}<br><small>${l.className||l.class} Lv${l.level||1}</small>
              ${E?`<span class="sct-badge">${$>9?"9+":$}</span>`:""}
            </button>`}).join("")}
        </div>
        <div class="skill-header-btns">
          ${this._mobileDetailView?'<button type="button" class="skill-back-mobile" id="skill-back-mobile">← Back</button>':""}
          <button type="button" class="skill-close" id="skill-close">✕</button>
        </div>
      </div>
      <div class="skill-mode-tabs">
        <button type="button" class="smt-tab${this._tab==="active"?" active":""}${(f=t==null?void 0:t.autoBuild)!=null&&f.auto_active?" auto-on":""}" data-mode="active">
          Spells${t&&(t.pendingSkillPoints||0)>0?` <span class="smt-badge" title="Unspent talent points — click an option to spend">+${t.pendingSkillPoints}</span>`:""}${(u=t==null?void 0:t.autoBuild)!=null&&u.auto_active?' <span class="smt-auto-check" aria-label="Auto on" title="Auto on">✓</span>':""}
        </button>
        <button type="button" class="smt-tab${this._tab==="passive"?" active":""}${(m=t==null?void 0:t.autoBuild)!=null&&m.auto_passive?" auto-on":""}" data-mode="passive">
          Passive${t&&(t.pendingPassivePoints||0)>0?` <span class="smt-badge" title="Unspent passive points — click an option to spend">+${t.pendingPassivePoints}</span>`:""}${(v=t==null?void 0:t.autoBuild)!=null&&v.auto_passive?' <span class="smt-auto-check" aria-label="Auto on" title="Auto on">✓</span>':""}
        </button>
        <button type="button" class="smt-tab${this._tab==="attrs"?" active":""}${(x=t==null?void 0:t.autoBuild)!=null&&x.auto_attrs?" auto-on":""}" data-mode="attrs">
          Attributes${t&&(t.pendingAttrPoints||0)>0?` <span class="smt-badge" title="Unspent attribute points — click an option to spend">+${t.pendingAttrPoints}</span>`:""}${(h=t==null?void 0:t.autoBuild)!=null&&h.auto_attrs?' <span class="smt-auto-check" aria-label="Auto on" title="Auto on">✓</span>':""}
        </button>
      </div>
      ${this._tab==="attrs"?this._renderAttrsPanel(t):this._tab==="passive"?this._renderPassivePanel(t):`
      <div class="skill-layout${this._mobileDetailView?" mobile-detail-open":""}">
        <!-- Skill list -->
        <div class="skill-list-panel">
          <div class="skill-panel-head">
            <div class="panel-label">Spells</div>
            ${t?this._renderAutoToggle(t,"active"):""}
          </div>
          ${t?`<div class="passive-points-banner pp-banner-compact" style="margin-bottom:0.65rem" title="Unspent talent points — click an option to spend"><span class="pp-num pp-num-fixed">+${t.pendingSkillPoints||0}</span><span class="pp-tip-pop">Unspent talent points — click an option to spend</span></div>`:""}
          ${d.map(l=>{const b=s.find($=>$.name===l.name);return`
              <div class="skill-row${b?"":" locked"}${this._selectedSkill===l.name?" selected":""}" data-skill="${l.name}">
                <div class="sk-level-badge">Lv${l.unlockLevel}</div>
                <div class="sk-info">
                  <div class="sk-name">${l.name}</div>
                  <div class="sk-type">${l.type} · ${l.aoe||l.target||"self"}</div>
                </div>
                <div class="sk-cost">${l.mpCost>0?`${l.mpCost} MP`:"Passive"}</div>
                ${b?"":'<div class="sk-lock-icon">🔒</div>'}
              </div>
            `}).join("")}
        </div>
        <!-- Skill detail / talents -->
        <div class="skill-detail-panel">
          ${this._selectedSkill?this._renderSkillDetail(t,a):`
            <div class="skill-select-prompt">Select a skill to view its description and upgrade talents.</div>
          `}
        </div>
      </div>
      `}
    `,this._wireEvents(),$t(this._el);const g=this._el.querySelector("#skill-stats-base");g&&g.addEventListener("click",()=>{const l=!g.classList.contains("on");Q(l),this._render()});for(const l of Object.keys(n)){const b=this._el.querySelector(l);b&&(b.scrollTop=n[l])}window.scrollTo(0,i)}_renderSkillDetail(e,r){var g,f,u,m,v,x,h;const t=Object.values(V).find(l=>l.name===this._selectedSkill);if(!t)return"";const d=t.talents||[],s=(e==null?void 0:e.pendingSkillPoints)||0;let a=null,n=null;if(e){const l=e.attrs||{},b=dt(e),$={STR:(l.STR||8)+(b.str||0),DEX:(l.DEX||8)+(b.dex||0),INT:(l.INT||8)+(b.int||0),CON:(l.CON||8)+(b.con||0)},E=$.INT*.025+(b.spellPower||0);var i=t;try{i=tt(t,e)}catch{}if(t.damageStat){const C=t.damageStat,y=R=>$[R.toUpperCase()]||0,P=/int|spell/i.test(C)||["fire","ice","lightning","holy","necro","magic"].includes(t.type),O=+i.damageMult||0;let z={};try{z=(typeof et=="function"?(g=et().combat)==null?void 0:g.skill:null)||{}}catch{}const I=z.heroDamageMult??1,X=(((u=(f=e==null?void 0:e.equipment)==null?void 0:f.weapon)==null?void 0:u.weaponCategory)||((v=(m=e==null?void 0:e.equipment)==null?void 0:m.weapon)==null?void 0:v.subtype)||"").toLowerCase(),w=i.damageCategory||(P?"magic":/2h|hammer|maul/.test(X)?"heavy":"light"),U=w==="magic"?z.magicMult??.78:w==="heavy"?z.heavyMult??1:z.lightMult??1,H=O*I*U;let B=null;try{B=_.get()}catch{}const A=!!(B!=null&&B.weaponScaling),T=(x=e==null?void 0:e.equipment)==null?void 0:x.weapon,L=(T==null?void 0:T.damage)||(T==null?void 0:T.dmg)||[],N=L.length===2?(L[0]+L[1])/2:0,q=A?N:C==="str_int"?(y("str")+y("int"))/2:y(C),c=Math.round(($.STR||8)*1.5),k=P?E:c*.05,S=P?0:Math.round(N*.1),M=q*H*(1+k)+S;a=Math.max(0,Math.round(M)),t.__estTip={sv:q,finalMult:H,powerBonus:k,weaponFlavor:S,weaponMid:N,isMagic:P,ws:A,cat:w}}if(t.healStat){const C=t.healStat,y=$[C.toUpperCase()]||0;n=Math.round((+i.healMult||0)*y*(1+E))}}let o=t;try{e&&(o=tt(t,e))}catch{}return`
      <div class="skill-detail-inner">
        <div class="sd-name">${t.name}</div>
        <div class="sd-type"><span class="sd-badge">${t.type}</span>${t.aoe?`<span class="sd-badge">${t.aoe}</span>`:""}</div>
        <div class="sd-desc">${t.description}</div>
        ${t.mpCost>0?`<div class="sd-cost">Mana Cost: <strong>${t.mpCost}</strong></div>`:""}
        ${t.damageStat?`<div class="sd-formula">Damage: ${o.damageMult}× ${t.damageStat.toUpperCase()}${o.damageMult!==t.damageMult?` <span style="color:#6a8aa0">(base ${t.damageMult}×, upgraded)</span>`:""}</div>`:""}
        ${a!==null?`<div class="sd-estimate">Est. Damage: <strong>~${a}</strong> <span style="color:#8a7a6a">per primary target, before armor/resist</span></div>`:""}
        ${t.__estTip?`<div class="sd-formula" style="font-size:0.7rem;color:#a89870;margin-top:0.15rem">
          ${t.__estTip.ws?`wpn ${t.__estTip.weaponMid.toFixed(0)}`:`${t.damageStat.toUpperCase()} ${t.__estTip.sv}`}
          × ${t.__estTip.finalMult.toFixed(2)}
          × (1 + ${t.__estTip.powerBonus.toFixed(2)} ${t.__estTip.isMagic?"SP":"AP"})
          ${t.__estTip.weaponFlavor>0?` + ${t.__estTip.weaponFlavor}`:""}
          <span style="color:#6a6070">· ${t.__estTip.cat}${t.__estTip.ws?" · weapon-scaling":""}</span>
        </div>`:""}
        ${t.healStat?`<div class="sd-formula">Heal: ${o.healMult}× ${t.healStat.toUpperCase()}${o.healMult!==t.healMult?` <span style="color:#6a8aa0">(base ${t.healMult}×)</span>`:""}</div>`:""}
        ${n!==null?`<div class="sd-estimate">Est. Heal: <strong>~${n}</strong></div>`:""}
        ${(h=t.statusEffects)!=null&&h.length?`
          <div class="sd-effects">
            ${t.statusEffects.map(l=>`<div class="sd-effect"><span class="eff-name">${l.type.toUpperCase()}</span> ${Math.round(l.chance*100)}% chance · ${l.duration} rounds</div>`).join("")}
          </div>
        `:""}
        ${d.length?`
          <div class="sd-talents-title">Upgrade Talents</div>
          <div class="sd-talents">
            ${d.map(l=>{const b=r[l.id],$=!b&&s>0;return`
                <div class="sd-talent${b?" purchased":""}">
                  <div class="sdt-info">
                    <div class="sdt-name">${l.name}</div>
                    <div class="sdt-desc">${l.desc}</div>
                  </div>
                  <button type="button" class="sdt-btn${b?" done":""}" data-talent="${l.id}" ${b||!$?"disabled":""}>
                    ${b?"✓ Learned":"Learn (1 pt)"}
                  </button>
                </div>
              `}).join("")}
          </div>
        `:'<div style="color:#8a7a6a;font-size:0.8rem;margin-top:1rem">No upgrade talents available for this skill.</div>'}
      </div>
    `}_renderRecommendBar(e){const r=this._tab,t=r==="active"?e.pendingSkillPoints||0:r==="passive"?e.pendingPassivePoints||0:e.pendingAttrPoints||0,d=`auto_${r}`,s=!!(e.autoBuild&&e.autoBuild[d]),a=j();return`
      <div class="recommend-bar">
        <button type="button" class="recommend-btn${t>0?"":" disabled"}" id="recommend-btn" ${t>0?"":"disabled"}>
          ✦ Recommend
        </button>
        ${a?"":`<label class="recommend-auto">
              <input type="checkbox" id="recommend-auto" ${s?"checked":""}>
              Auto
            </label>`}
        <span class="recommend-note">${t>0?`${t} point${t===1?"":"s"} pending`:"No points pending"}</span>
      </div>
    `}_recommendAttr(e){const r=_t.find(o=>o.id===e.class),t=(r==null?void 0:r.primaryAttr)||"STR",d=e.baseAttrs||{STR:8,DEX:8,INT:8,CON:8},s=e.attrs||{...d},a=(s[t]||0)-(d[t]||0),n=(s.CON||0)-(d.CON||0),i=a+n;return i>0&&n/i<.2?"CON":t}_recommendPassive(e){const r=F(e.class),t=e.passiveRanks||{},d=/lifesteal|life_steal|mana_regen|mana_steal|regen|lifebind|soulbind|exotic|leech|siphon/i,s=r.find(a=>d.test(a.id+" "+(a.name||"")+" "+(a.desc||""))&&(t[a.id]||0)<a.maxRank);return s?s.id:(r.find(a=>(t[a.id]||0)<a.maxRank)||{}).id||null}_recommendTalent(e){const r=Z(e.class),t=J(e.class,e.level||1),d=e.talentsPurchased||{},s=[...t].sort((a,n)=>(a.unlockLevel||0)-(n.unlockLevel||0));for(const a of s){const n=r.find(i=>i.name===a.name)||a;for(const i of n.talents||[])if(!d[i.id])return{skillName:a.name,talentId:i.id}}return null}_applyOneRecommended(e){const r=this._tab;if(r==="attrs"){if((e.pendingAttrPoints||0)<=0)return!1;const d=this._recommendAttr(e);e.attrs[d]=(e.attrs[d]||8)+1,e.pendingAttrPoints-=1;try{e.maxHp=G(e),e.maxMp=W(e)}catch{}return!0}if(r==="passive"){if((e.pendingPassivePoints||0)<=0)return!1;const d=this._recommendPassive(e);if(!d)return!1;const a=F(e.class).find(i=>i.id===d);if(!a)return!1;e.passiveRanks||(e.passiveRanks={});const n=e.passiveRanks[d]||0;return n>=a.maxRank?!1:(e.passiveRanks[d]=n+1,e.pendingPassivePoints-=1,st(e),!0)}if((e.pendingSkillPoints||0)<=0)return!1;const t=this._recommendTalent(e);return t?(e.talentsPurchased||(e.talentsPurchased={}),e.talentsPurchased[t.talentId]=!0,e.pendingSkillPoints=Math.max(0,(e.pendingSkillPoints||0)-1),this._selectedSkill=t.skillName,!0):!1}_renderPassivePanel(e){if(!e)return'<div class="passive-empty">No character selected.</div>';const r=F(e.class),t=e.passiveRanks||{},d=e.pendingPassivePoints||0;return`
      <div class="passive-panel">
        <div class="passive-header">
          <div class="panel-label">Passives</div>
          <div class="passive-points-banner pp-banner-compact" title="Unspent passive points — click an option to spend">
            <span class="pp-num pp-num-fixed">+${d}</span>
            <span class="pp-tip-pop">Unspent passive points — click an option to spend</span>
          </div>
          ${this._renderAutoToggle(e,"passive")}
        </div>
        <div class="passive-nodes">
          ${r.map((s,a)=>{const n=t[s.id]||0,i=d>0&&n<s.maxRank;return`
              <div class="passive-node${n>0?" owned":""}">
                <div class="pn-index">${a+1}</div>
                <div class="pn-info">
                  <div class="pn-name">${s.name}</div>
                  <div class="pn-desc">${s.desc}</div>
                  <div class="pn-rank">Rank <strong>${n}</strong> / ${s.maxRank}</div>
                </div>
                <button type="button" class="pn-btn${i?"":" disabled"}" data-passive="${s.id}" ${i?"":"disabled"}>
                  ${n>=s.maxRank?"✓ Maxed":"Learn (1 pt)"}
                </button>
              </div>
            `}).join("")}
        </div>
        <div class="passive-hint">Earn 1 Passive Point every 2 levels. Bonuses are permanent.</div>
      </div>
    `}_renderAttrsPanel(e){if(!e)return'<div class="passive-empty">No character selected.</div>';const r=e.pendingAttrPoints||0,t=Ct(e,{withSpendButtons:!0,pendingAttrPoints:r,includeHeader:!1,baseToggleId:"skill-stats-base"});return`
      <div class="passive-panel attrs-panel">
        <div class="passive-header">
          <div class="panel-label">Attributes</div>
          <div class="passive-points-banner pp-banner-compact" title="Unspent attribute points — click an option to spend">
            <span class="pp-num pp-num-fixed">+${r}</span>
            <span class="pp-tip-pop">Unspent attribute points — click an option to spend</span>
          </div>
          ${this._renderAutoToggle(e,"attrs")}
        </div>
        <div class="char-stats-panel attrs-stats-panel">
          ${t}
        </div>
        <div class="passive-hint">Spend deferred points from level-ups any time.</div>
      </div>
    `}_renderAutoToggle(e,r){var a;if((a=_.get())!=null&&a.manualCombat)return"";const t=rt[r],d=!!(e.autoBuild&&e.autoBuild[t]);return j()?"":`
      <button type="button" class="auto-toggle${d?" on":""}" data-auto-tab="${r}" aria-pressed="${d?"true":"false"}" title="${d?"Auto: On":"Auto: Off"}">
        ${d?'<span class="auto-check" aria-hidden="true">✓</span>':'<span class="auto-check auto-off" aria-hidden="true">○</span>'}Auto
      </button>
    `}_wireEvents(){var r,t,d,s;(r=this._el.querySelector("#skill-close"))==null||r.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(t=this._el.querySelector("#skill-back-mobile"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click"),this._mobileDetailView=!1,this._selectedSkill=null,this._render()}),this._el.querySelectorAll(".sct-tab").forEach(a=>{a.addEventListener("click",()=>{var o;this.audio.playSfx("click"),this._selectedCharIdx=parseInt(a.dataset.idx),this._selectedSkill=null,this._mobileDetailView=!1;const n=_.get(),i=(o=n==null?void 0:n.party)==null?void 0:o[this._selectedCharIdx];i&&((i.pendingSkillPoints||0)>0?this._tab="active":(i.pendingPassivePoints||0)>0?this._tab="passive":(i.pendingAttrPoints||0)>0&&(this._tab="attrs")),this._render()})}),this._el.querySelectorAll(".skill-row").forEach(a=>{a.addEventListener("click",()=>{a.classList.contains("locked")||(this.audio.playSfx("click"),this._selectedSkill=a.dataset.skill,this._mobileDetailView=!0,this._render())})}),this._el.querySelectorAll(".smt-tab").forEach(a=>{a.addEventListener("click",()=>{this.audio.playSfx("click"),this._tab=a.dataset.mode,this._selectedSkill=null,this._mobileDetailView=!1,this._render()})}),(d=this._el.querySelector("#recommend-btn"))==null||d.addEventListener("click",()=>{const n=_.get().party[this._selectedCharIdx];n&&this._applyOneRecommended(n)&&(this.audio.playSfx("spell"),this._render())}),(s=this._el.querySelector("#recommend-auto"))==null||s.addEventListener("change",a=>{if(j()){a.target.checked=!1;return}const n=_.get(),i=n.party[this._selectedCharIdx];if(!i){a.target.checked=!1;return}const o=this._tab,g=`auto_${o}`;if(a.target.checked){n.autoSkillConfirmed||(n.autoSkillConfirmed={active:!1,passive:!1,attrs:!1});const f=()=>{i.autoBuild||(i.autoBuild={}),i.autoBuild[g]=!0;let u=0;for(;this._applyOneRecommended(i)&&u++<200;);this.audio.playSfx("spell"),this._render()};if(n.autoSkillConfirmed[o]){f();return}a.target.checked=!1,it({title:"Enable Auto-Recommend?",message:"Auto-apply recommended points on level-up for this tab? You can uncheck this later.",confirmText:"Enable Auto",cancelText:"Cancel",onConfirm:()=>{a.target.checked=!0,n.autoSkillConfirmed[o]=!0,f()}})}else i.autoBuild&&(i.autoBuild[g]=!1)}),this._el.querySelectorAll(".passive-node").forEach(a=>{lt(),ot(a,()=>{const n=a.querySelector("[data-passive]"),i=n==null?void 0:n.dataset.passive,g=_.get().party[this._selectedCharIdx];if(!g||!i)return"";const u=F(g.class).find(v=>v.id===i);if(!u)return"";const m=(g.passiveRanks||{})[i]||0;return`<div class="tt-title">${u.name}</div><div class="tt-sub">Rank ${m} / ${u.maxRank}</div><div class="tt-row">${u.desc}</div>`})}),this._el.querySelectorAll("[data-passive]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const i=_.get().party[this._selectedCharIdx];if(!i||(i.pendingPassivePoints||0)<=0)return;const o=a.dataset.passive,f=F(i.class).find(m=>m.id===o);if(!f)return;i.passiveRanks||(i.passiveRanks={});const u=i.passiveRanks[o]||0;u>=f.maxRank||(i.passiveRanks[o]=u+1,i.pendingPassivePoints-=1,st(i),this.audio.playSfx("spell"),this._render())})}),this._el.querySelectorAll("[data-attr]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const i=_.get().party[this._selectedCharIdx];if(!i||(i.pendingAttrPoints||0)<=0)return;const o=a.dataset.attr;i.attrs||(i.attrs={STR:8,DEX:8,INT:8,CON:8}),i.attrs[o]=(i.attrs[o]||8)+1,i.pendingAttrPoints-=1;try{i.maxHp=G(i),i.maxMp=W(i)}catch{}this.audio.playSfx("spell"),this._render()})}),this._el.querySelectorAll("[data-auto-tab]").forEach(a=>{a.addEventListener("click",()=>{if(j()){this._showHardLockTip(a);return}const i=_.get().party[this._selectedCharIdx];if(!i)return;const o=a.dataset.autoTab,g=rt[o],f=Tt[o];if(!g)return;i.autoBuild||(i.autoBuild={});const u=!!i.autoBuild[g],m=i[f]||0,v=()=>{const l=this._tab;this._tab=o;let b=0;for(;this._applyOneRecommended(i)&&b++<200;);this._tab=l},x=l=>{i.autoBuild[g]=l,l&&v(),this.audio.playSfx("click"),this._render()};if(u&&m>0){v(),this.audio.playSfx("click"),this._render();return}if(u||m<=0){x(!u);return}const h=_.get();if(h.autoSkillConfirmed||(h.autoSkillConfirmed={active:!1,passive:!1,attrs:!1}),h.autoSkillConfirmed[o]){x(!0);return}it({title:At[o]+"?",message:Mt[o],confirmText:"Enable Auto",cancelText:"Cancel",onConfirm:()=>{h.autoSkillConfirmed[o]=!0,x(!0)}})})});const e=this._el.querySelector("#skill-stats-base");e&&!e._wired&&(e._wired=!0,e.addEventListener("click",()=>{const a=!e.classList.contains("on");Q(a),this._render()})),this._el.querySelectorAll("[data-talent]").forEach(a=>{a.addEventListener("click",()=>{var f;if(a.disabled)return;const i=_.get().party[this._selectedCharIdx];if(!i||(i.pendingSkillPoints||0)<=0||(i.talentsPurchased||(i.talentsPurchased={}),i.talentsPurchased[a.dataset.talent]))return;i.talentsPurchased[a.dataset.talent]=!0,i.pendingSkillPoints=Math.max(0,(i.pendingSkillPoints||0)-1);const o=a.dataset.talent,g=Object.values(V);for(const u of g){const m=(u.talents||[]).find(v=>v.id===o);if((f=m==null?void 0:m.effect)!=null&&f.unlocksCompanion){const v=m.effect.unlocksCompanion,x=wt[v];if(x){const h={...x,id:v+"_"+i.id,templateId:v,ownerId:i.id,ownerName:i.name,level:i.level||1,attrs:{...x.attrs}},l=Math.floor(((i.level||1)-1)*.5);h.attrs.STR+=l,h.attrs.DEX+=l,h.attrs.INT+=l,h.attrs.CON+=l,h.maxHp=50+h.attrs.CON*10,h.hp=h.maxHp,h.maxMp=10+h.attrs.INT*3,h.mp=h.maxMp,_.addToCompanions(h)||_.addToBench(h)}break}}this.audio.playSfx("spell"),this._render()})}),this._el.querySelectorAll(".sd-talent").forEach(a=>{const n=a.querySelector("[data-talent]");if(!n)return;const i=n.dataset.talent;let o=null,g=null;for(const f of Object.values(V)){const u=(f.talents||[]).find(m=>m.id===i);if(u){o=u.effect,g=u.desc;break}}lt(),ot(a,()=>{const f=o?Et(o):[];return!f.length&&!g?null:`${f.length?f.map(m=>`<div class="tt-row">${m}</div>`).join(""):""}`})})}_showHardLockTip(e){var a,n,i;if((a=this._el)==null?void 0:a.querySelector(".hard-lock-tip"))return;const t=document.createElement("div");t.className="hard-lock-tip",t.textContent="Auto disabled on Hard difficulty.";const d=e?e.getBoundingClientRect():null,s=(n=this._el)==null?void 0:n.getBoundingClientRect();d&&s&&(t.style.position="absolute",t.style.top=d.bottom-s.top+6+"px",t.style.left=d.left-s.left+"px"),(i=this._el)==null||i.appendChild(t),setTimeout(()=>t.remove(),2e3)}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){at(this._el),this._el=null}destroy(){at(this._el),this._el=null}}const zt=`
.skill-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: linear-gradient(180deg,#0a0608,#120a10); color: #f0e8d8;
  font-family: 'Inter', sans-serif;
}
.skill-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 1rem; border-bottom: 1px solid rgba(232,160,32,0.3);
  background: rgba(0,0,0,0.35); flex-shrink: 0;
}
.skill-char-tabs { display: flex; gap: 0.4rem; overflow-x: auto; }
.sct-tab {
  position: relative;
  padding: 0.4rem 0.85rem; background: rgba(20,12,28,0.7);
  border: 1px solid rgba(232,160,32,0.15); border-radius: 6px;
  color: #8a7a6a; font-size: 0.75rem; cursor: pointer; min-height: 44px; text-align: center;
  transition: all 0.2s;
}
.sct-badge { position: absolute; top: 2px; right: 2px; min-width: 16px; height: 16px; line-height: 16px; text-align: center; background: #e8a020; color: #1a1a2e; font-size: 10px; font-weight: 700; border-radius: 8px; padding: 0 3px; pointer-events: none; }
.sct-tab.active { border-color: rgba(232,160,32,0.6); color: #e8a020; background: rgba(232,160,32,0.1); }
.sct-tab small { font-size: 0.6rem; }
.sct-portrait { display: inline-block; vertical-align: middle; margin-right: 4px; }
.sct-portrait .char-portrait { border-radius: 3px; background: rgba(255,255,255,0.06); }
.skill-header-btns { display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0; }
.skill-close { background: none; border: none; color: #8a7a6a; cursor: pointer; font-size: 1rem; padding: 0.4rem; min-height: 44px; min-width: 44px; }
.skill-layout { flex: 1; display: grid; grid-template-columns: 260px 1fr; overflow: hidden; }
.skill-back-mobile { display: none; background: none; border: none; color: #e8a020; cursor: pointer; font-size: 0.85rem; padding: 0.4rem 0.6rem; min-height: 44px; }
@media (max-width: 600px) {
  .skill-layout { grid-template-columns: 1fr; }
  .skill-list-panel { border-right: none; border-bottom: 1px solid rgba(232,160,32,0.15); }
  .skill-layout.mobile-detail-open .skill-list-panel { display: none; }
  .skill-layout:not(.mobile-detail-open) .skill-detail-panel { display: none; }
  .skill-back-mobile { display: block; }
}
.panel-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7a6a; margin-bottom: 0.75rem; }
.skill-list-panel { padding: 1rem; border-right: 1px solid rgba(232,160,32,0.15); overflow-y: auto; display: flex; flex-direction: column; gap: 0.35rem; }
.skill-row {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.65rem 0.75rem; background: rgba(20,12,28,0.5);
  border: 1px solid rgba(232,160,32,0.1); border-radius: 7px;
  cursor: pointer; transition: all 0.2s; min-height: 52px;
}
.skill-row:hover:not(.locked) { border-color: rgba(232,160,32,0.4); background: rgba(20,12,28,0.8); }
.skill-row.locked { opacity: 0.4; cursor: default; }
.skill-row.selected { border-color: rgba(232,160,32,0.7); background: rgba(232,160,32,0.12); }
.sk-level-badge {
  font-size: 0.6rem; font-weight: 700; padding: 0.2rem 0.4rem;
  background: rgba(232,160,32,0.2); border: 1px solid rgba(232,160,32,0.3);
  border-radius: 4px; color: #e8a020; flex-shrink: 0; white-space: nowrap;
}
.sk-info { flex: 1; }
.sk-name { font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700; }
.sk-type { font-size: 0.62rem; color: #8a7a6a; text-transform: capitalize; }
.sk-cost { font-size: 0.65rem; color: #c0a040; flex-shrink: 0; }
.sk-lock-icon { font-size: 0.7rem; }
.skill-detail-panel { padding: 1.5rem; overflow-y: auto; }
.skill-select-prompt { color: #8a7a6a; font-size: 0.85rem; text-align: center; margin-top: 3rem; }
.skill-detail-inner { max-width: 480px; }
.sd-name { font-family: 'Cinzel', serif; font-size: 1.3rem; font-weight: 900; color: #e8a020; margin-bottom: 0.5rem; }
.sd-type { display: flex; gap: 0.4rem; margin-bottom: 0.75rem; }
.sd-badge { font-size: 0.65rem; font-weight: 600; padding: 0.2rem 0.5rem; background: rgba(232,160,32,0.15); border: 1px solid rgba(232,160,32,0.3); border-radius: 4px; color: #e8a020; text-transform: capitalize; }
.sd-desc { font-size: 0.88rem; line-height: 1.6; color: #c0b090; margin-bottom: 1rem; }
.sd-cost { font-size: 0.78rem; color: #c0a040; margin-bottom: 0.5rem; }
.sd-formula { font-size: 0.75rem; color: #c0c080; margin-bottom: 0.5rem; }
.sd-estimate { font-size: 0.8rem; color: #e8a020; margin-bottom: 0.5rem; }
.sd-effects { margin-bottom: 0.75rem; }
.sd-effect { font-size: 0.75rem; color: #c0a080; }
.eff-name { font-weight: 700; }
.sd-talents-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7a6a; margin: 1.25rem 0 0.75rem; }
.sd-talents { display: flex; flex-direction: column; gap: 0.6rem; }
.sd-talent {
  display: flex; align-items: center; gap: 1rem;
  padding: 0.85rem 1rem; background: rgba(20,12,28,0.5);
  border: 1px solid rgba(232,160,32,0.12); border-radius: 8px;
}
.sd-talent.purchased { border-color: rgba(232,160,32,0.4); background: rgba(232,160,32,0.08); }
.sdt-info { flex: 1; }
.sdt-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.2rem; }
.sdt-desc { font-size: 0.75rem; color: #8a7a6a; line-height: 1.4; }
.sdt-btn {
  padding: 0.5rem 0.85rem; background: rgba(232,160,32,0.15);
  border: 1px solid rgba(232,160,32,0.4); border-radius: 6px;
  color: #e8a020; font-size: 0.75rem; font-weight: 600; cursor: pointer;
  min-height: 44px; white-space: nowrap; transition: background 0.15s;
}
.sdt-btn:hover:not(:disabled) { background: rgba(232,160,32,0.28); }
.sdt-btn.done { background: rgba(232,160,32,0.06); border-color: rgba(232,160,32,0.2); color: #8a6020; cursor: default; }
.skill-mode-tabs { display: flex; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(0,0,0,0.25); border-bottom: 1px solid rgba(232,160,32,0.2); flex-shrink: 0; }
.smt-tab { padding: 0.45rem 1rem; background: rgba(20,12,28,0.6); border: 1px solid rgba(232,160,32,0.15); border-radius: 6px; color: #8a7a6a; font-size: 0.78rem; font-weight: 600; cursor: pointer; min-height: 44px; }
.smt-tab.active { border-color: rgba(232,160,32,0.6); color: #e8a020; background: rgba(232,160,32,0.12); }
.smt-badge { display: inline-block; margin-left: 0.25rem; padding: 0.1rem 0.35rem; background: #c04030; color: #fff; font-size: 0.62rem; border-radius: 8px; min-width: 2.2em; text-align: center; box-sizing: border-box; cursor: help; }
/* M398 — compact +N badge variant of passive-points-banner; fixed width avoids
   layout shift when N drops 2→1→0 mid-spend. */
/* M404: compact banner — width hugs the +N pill, padding tightened to
   match the passives/attributes banner. The hover tooltip uses
   position:absolute + max-width so it does NOT stretch the banner or
   trigger horizontal scrollbars in narrow parents (the spells left
   column is 260px and was scrolling because the long nowrap tooltip
   pushed past its width). */
.pp-banner-compact { position: relative; padding: 0.25rem 0.5rem; cursor: help; align-self: flex-start; width: auto; max-width: max-content; }
.pp-num-fixed { min-width: 2.5em; text-align: center; display: inline-block; font-size: 1.05rem; }
.pp-tip-pop { position: absolute; left: 0; top: calc(100% + 4px); z-index: 50; background: #14101c; border: 1px solid rgba(232,160,32,0.45); padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.7rem; color: #d8c89c; opacity: 0; pointer-events: none; transition: opacity 0.15s ease; max-width: 220px; width: max-content; line-height: 1.3; }
.pp-banner-compact:hover .pp-tip-pop, .pp-banner-compact:focus-within .pp-tip-pop { opacity: 1; }
/* Stop the left-column overflow that the tooltip used to trigger: when
   overflow-y:auto is set without an explicit overflow-x, browsers
   compute X as auto too if any descendant overflows horizontally. */
.skill-list-panel { overflow-x: hidden; }
/* M227: Recommend bar. */
.recommend-bar {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.45rem 1rem;
  background: rgba(0,0,0,0.18);
  border-bottom: 1px solid rgba(232,160,32,0.12);
  flex-shrink: 0; flex-wrap: wrap;
}
.recommend-btn {
  padding: 0.45rem 0.9rem;
  background: rgba(64,168,96,0.15); border: 1px solid rgba(109,220,150,0.5);
  border-radius: 6px; color: #a6f0bc;
  font-family: 'Cinzel', serif; font-size: 0.78rem; font-weight: 700;
  cursor: pointer; min-height: 44px;
}
.recommend-btn:hover:not(.disabled) { background: rgba(64,168,96,0.25); color: #d0f0dc; }
.recommend-btn.disabled { opacity: 0.45; cursor: not-allowed; }
.recommend-auto {
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.75rem; color: #c0b090; cursor: pointer;
}
.recommend-auto input { accent-color: #6ddc96; }
.recommend-note { font-size: 0.72rem; color: #8a7a6a; margin-left: auto; }
.passive-panel { flex: 1; padding: 1rem 1.25rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.75rem; }
.passive-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
.passive-points-banner { display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.75rem; background: rgba(232,160,32,0.1); border: 1px solid rgba(232,160,32,0.35); border-radius: 6px; }
.pp-num { font-family: 'Cinzel', serif; font-size: 1.3rem; font-weight: 700; color: #e8a020; line-height: 1; }
.pp-label { font-size: 0.7rem; color: #8a7a6a; }
.passive-nodes { display: flex; flex-direction: column; gap: 0.55rem; }
.passive-nodes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.55rem; }
.passive-node { display: flex; align-items: center; gap: 0.8rem; padding: 0.7rem 0.85rem; background: rgba(20,12,28,0.6); border: 1px solid rgba(232,160,32,0.15); border-radius: 8px; }
.passive-node.owned { border-color: rgba(232,160,32,0.45); background: rgba(232,160,32,0.1); }
.pn-index { font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: #e8a020; min-width: 22px; text-align: center; }
.pn-info { flex: 1; }
.pn-name { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #e8e0d0; }
.pn-desc { font-size: 0.72rem; color: #c0b090; margin-top: 0.15rem; line-height: 1.35; }
.pn-rank { font-size: 0.66rem; color: #8a7a6a; margin-top: 0.25rem; letter-spacing: 0.05em; }
.pn-btn { padding: 0.5rem 0.85rem; background: rgba(232,160,32,0.18); border: 1px solid rgba(232,160,32,0.4); border-radius: 6px; color: #e8a020; font-size: 0.72rem; font-weight: 600; cursor: pointer; min-height: 44px; white-space: nowrap; }
.pn-btn:hover:not(:disabled) { background: rgba(232,160,32,0.32); }
.pn-btn.disabled, .pn-btn:disabled { opacity: 0.35; cursor: default; }
.passive-hint { font-size: 0.68rem; color: #6a5a52; text-align: center; font-style: italic; margin-top: 0.5rem; }
.passive-empty { padding: 2rem; color: #8a7a6a; text-align: center; }
.attr-section-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #e8a020; margin: 0.75rem 0 0.25rem; border-bottom: 1px solid rgba(232,160,32,0.2); padding-bottom: 0.25rem; }
.pn-extra { font-size: 0.62rem; color: #8a7a6a; font-style: italic; margin-left: 0.25rem; }

/* M276 — per-tab Auto toggle on Skills/Passive/Attributes */
.skill-panel-head { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; }
.skill-panel-head .panel-label { margin-bottom: 0; }
.auto-toggle {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.3rem 0.65rem; min-height: 44px; border-radius: 6px;
  background: rgba(20,12,28,0.7); border: 1px solid rgba(232,160,32,0.2);
  color: #8a7a6a; font-size: 0.7rem; font-weight: 600; cursor: pointer;
  letter-spacing: 0.05em;
}
.auto-toggle:hover { border-color: rgba(232,160,32,0.45); color: #e8a020; }
.auto-toggle.on { border-color: rgba(72,176,96,0.6); color: #6dd180; background: rgba(72,176,96,0.1); }
.auto-toggle .auto-check {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px; border-radius: 50%;
  background: #48b060; color: #06200d; font-size: 10px; font-weight: 800;
  line-height: 1;
}
/* M384 — unchecked state: gold outline circle, no background. Matches the
   surrounding button outline so the indicator reads as "available, not yet
   chosen." Becomes the solid green pip when toggled on. */
.auto-toggle .auto-check.auto-off {
  background: transparent;
  border: 1px solid rgba(232,160,32,0.7);
  color: transparent;
  font-weight: 400;
}

/* Tiny checkmark badge on the active/passive/attrs tab when Auto is on */
.smt-auto-check {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px; border-radius: 50%;
  background: #48b060; color: #06200d; font-size: 10px; font-weight: 800;
  margin-left: 0.3rem; line-height: 1;
  vertical-align: middle;
}
.smt-tab.auto-on { box-shadow: inset 0 0 0 1px rgba(72,176,96,0.35); }

/* M385 — Hard-difficulty lock state for Auto toggles */
.auto-toggle.hard-locked {
  opacity: 0.45; cursor: not-allowed; border-color: rgba(160,80,80,0.4); color: #8a6a6a;
}
.auto-lock-icon { font-size: 0.75rem; }
.recommend-auto-locked { opacity: 0.45; font-size: 0.75rem; color: #8a6a6a; display: inline-flex; align-items: center; gap: 0.25rem; }
.hard-lock-tip {
  z-index: 9999; background: rgba(20,8,8,0.95); border: 1px solid rgba(180,60,60,0.6);
  color: #e0a0a0; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-radius: 6px;
  pointer-events: none; white-space: nowrap;
  animation: htip-fade 2s ease forwards;
}
@keyframes htip-fade { 0%,70%{opacity:1} 100%{opacity:0} }

/* Attributes tab — shared character-stats panel reuse */
.attrs-panel .char-stats-panel { padding: 0.5rem 0.75rem; background: rgba(20,12,28,0.5); border: 1px solid rgba(232,160,32,0.12); border-radius: 8px; }
.attrs-panel .stat-row { display: flex; justify-content: space-between; align-items: center; padding: 0.3rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.78rem; gap: 0.5rem; }
.attrs-panel .stat-row:last-child { border-bottom: none; }
.attrs-panel .sr-label { color: #c0b090; }
.attrs-panel .sr-val { font-family: 'Cinzel', serif; font-weight: 700; color: #e8a020; }
.attrs-panel .stat-row-attr .sr-val { min-width: 28px; text-align: right; }
.attrs-panel .panel-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7a6a; margin-top: 0.6rem; margin-bottom: 0.3rem; }
.attrs-panel .stats-base-toggle { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.7rem; color: #8a7a6a; cursor: pointer; padding: 0.25rem 0; }
.sr-attr-btn {
  padding: 0.3rem 0.65rem; min-height: 44px;
  background: rgba(232,160,32,0.18); border: 1px solid rgba(232,160,32,0.4);
  border-radius: 5px; color: #e8a020; font-size: 0.7rem; font-weight: 700;
  cursor: pointer; white-space: nowrap;
}
.sr-attr-btn:hover:not(:disabled) { background: rgba(232,160,32,0.32); }
.sr-attr-btn:disabled, .sr-attr-btn.disabled { opacity: 0.35; cursor: default; }
`;export{Lt as SkillTreeScreen};
