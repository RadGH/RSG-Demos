import{w as me,y as de,z as ue,B as ge,D as K,E as be,F as Y,H as fe,L as W,N as G,O as he,G as w,q,i as ve,c as ke,Q as Z,R as J,p as xe,k as _e,s as ye,t as Q,S as V,T as ee,U as te,C as $e,V as j,K as se,r as ae}from"./play-BzJNMOaj.js";import{showConfirmModal as ne}from"./ConfirmModal-DTHqZlVH.js";import"./savesClient-DUFjgBxb.js";const we={pet_skeletal_warrior:{id:"pet_skeletal_warrior",name:"Skeletal Warrior",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"necromancer",level:1,attrs:{STR:12,DEX:8,INT:4,CON:14},description:"Undead soldier bound by dark magic. Fights with hollow determination."},pet_bone_golem:{id:"pet_bone_golem",name:"Bone Golem",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"necromancer",level:1,attrs:{STR:16,DEX:4,INT:2,CON:18},description:"Massive construct of fused bones. Slow but devastating."},pet_wolf:{id:"pet_wolf",name:"Forest Wolf",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"druid",level:1,attrs:{STR:10,DEX:14,INT:4,CON:10},description:"A wild wolf bonded through nature magic. Swift and loyal."},pet_bear:{id:"pet_bear",name:"Cave Bear",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"druid",level:1,attrs:{STR:14,DEX:6,INT:4,CON:16},description:"A massive bear called from the deep woods. Absorbs punishment."},pet_imp:{id:"pet_imp",name:"Bound Imp",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"warlock",level:1,attrs:{STR:6,DEX:12,INT:12,CON:6},description:"A mischievous lesser demon. Small but cunning."},pet_demon:{id:"pet_demon",name:"Infernal Hound",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"warlock",level:1,attrs:{STR:14,DEX:10,INT:8,CON:12},description:"A summoned demon beast from the lower planes."},pet_war_hound:{id:"pet_war_hound",name:"Trained War Hound",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"ranger",level:1,attrs:{STR:10,DEX:14,INT:6,CON:10},description:"An armored hunting dog trained for battle."},pet_fire_elemental:{id:"pet_fire_elemental",name:"Fire Elemental",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"pyromancer",level:1,attrs:{STR:8,DEX:8,INT:16,CON:8},description:"A living flame summoned from the ember planes."},pet_lightning_elemental:{id:"pet_lightning_elemental",name:"Lightning Elemental",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"stormcaller",level:1,attrs:{STR:6,DEX:14,INT:14,CON:6},description:"A crackling bolt given form and purpose."},pet_familiar:{id:"pet_familiar",name:"Arcane Familiar",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"mage",level:1,attrs:{STR:4,DEX:10,INT:16,CON:8},description:"A mystical black cat wreathed in arcane runes, bound to its mage by ancient pact."},pet_clockwork_turret:{id:"pet_clockwork_turret",name:"Clockwork Turret",className:"Companion",class:"companion",isCompanion:!0,isPet:!0,ownerClass:"tinker",level:1,attrs:{STR:12,DEX:8,INT:10,CON:14},sprite:"clockwork_turret",description:"A brass tripod turret with a single arcane-blue eye. Springs wound tight, barrel loaded with rune-etched bolts."}};let L=null;function ie(){L&&L.parentNode&&L.parentNode.removeChild(L),L=null}function Se(p,t){const o=t.getBoundingClientRect(),e=p.getBoundingClientRect();let d=o.left+o.width/2-e.width/2,s=o.top-e.height-10;d<10&&(d=10),d+e.width>window.innerWidth-10&&(d=window.innerWidth-e.width-10),s<10&&(s=o.bottom+10),p.style.left=`${d}px`,p.style.top=`${s}px`}function oe(p,t,o={}){if(!p)return()=>{};const e=o.className||"rsg-tooltip",d=g=>{ie();const b=t();if(!b)return;const m=document.createElement("div");m.className=e,m.innerHTML=b,document.body.appendChild(m),L=m,Se(m,g.currentTarget||p)},s=()=>ie();p.addEventListener("mouseenter",d),p.addEventListener("mouseleave",s);let n=null;const i=g=>{clearTimeout(n),n=setTimeout(()=>d(g),350)},a=()=>{clearTimeout(n),setTimeout(s,1500)},l=()=>{clearTimeout(n),s()};return p.addEventListener("touchstart",i,{passive:!0}),p.addEventListener("touchend",a),p.addEventListener("touchcancel",l),()=>{p.removeEventListener("mouseenter",d),p.removeEventListener("mouseleave",s),p.removeEventListener("touchstart",i),p.removeEventListener("touchend",a),p.removeEventListener("touchcancel",l),clearTimeout(n)}}function le(){if(document.getElementById("rsg-tooltip-styles"))return;const p=document.createElement("style");p.id="rsg-tooltip-styles",p.textContent=`
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
  `,document.head.appendChild(p)}function Ce(p){return p==="magic"?"Magic Damage":p==="light"?"Light Damage":"Heavy Damage"}function Pe(p,t={}){const{withSpendButtons:o=!1,pendingAttrPoints:e=0,includeHeader:d=!1,headerLabel:s=o?"Attributes":"Character Stats",baseToggleId:n="stats-base-chk"}=t;if(!p)return'<div class="stat-row"><span>No character selected</span></div>';const i=p.baseAttrs||p.attrs||{STR:8,DEX:8,INT:8,CON:8},a=p.attrs||i,l=me(),g=p.equipment||{};let b=0;for(const c of Object.values(g))c!=null&&c.armor&&(b+=c.armor);const m=0,u=de(p);b+=u.armor||0;const v=ue(g),x=l?i:{STR:(a.STR||8)+(u.str||0),DEX:(a.DEX||8)+(u.dex||0),INT:(a.INT||8)+(u.int||0),CON:(a.CON||8)+(u.con||0)},h=ge(g)+(u.dmg||0),r=K(x,l?0:h,v),f=K(i,0,v),y=Ce(v),M=l?0:u.magicResist||0,P=(c,k)=>({hp:k?G(p):50+c.CON*10,mp:k?W(p):30+c.INT*8,hit:Math.min(95,70+Math.round(c.DEX*1.2)+(k&&u.hit||0)),dodge:Math.min(40,5+Math.round(c.DEX*.8)+(k&&u.dodge||0)),spl:+(c.INT*.025+(k&&u.spellPower||0)).toFixed(2)}),_=P(l?i:x,!l),C=P(i,!1),O=l?m:b,N=l?0:be(p).resistAll||0,R=Y(O,N),U=Y(m,0),$=(c,k,S)=>{const E=he(k,S,c);return E?` style="color:${E}"`:""},X=["STR","DEX","INT","CON"].map(c=>{const k=c.toLowerCase(),S=x[c],E=$(k,S,i[c]);if(o){const I=e>0;return`
        <div class="stat-row stat-row-attr">
          <span class="sr-label stat-label" data-stat="${c}">${c}</span>
          <span class="sr-val"${E}>${Math.floor(S)}</span>
          <button type="button" class="sr-attr-btn${I?"":" disabled"}" data-attr="${c}" ${I?"":"disabled"} aria-label="Increase ${c}">+1</button>
        </div>`}return`<div class="stat-row"><span class="sr-label stat-label" data-stat="${c}">${c}</span><span class="sr-val"${E}>${Math.floor(S)}</span></div>`}).join(""),H=new Set(["str","dex","int","con","hp","mp","dmg","armor","hit","dodge","magicresist","magicResist","spellpower","spellPower"]),B={goldFind:"Gold Find",xpFind:"XP Find",manaRegen:"Mana Regen",lifeSteal:"Life Steal",manaSteal:"Mana Steal",initiative:"Initiative",critChance:"Crit Chance",critDamage:"Crit Damage",spellPower:"Spell Power",tradePrices:"Trade Prices"},A=[];if(!l){try{const c=fe(p);if((c==null?void 0:c.blockChance)>0){const k=`+${(c.blockChance*100).toFixed(1).replace(/\.0$/,"")}%`;A.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="Block Chance">Block Chance</span><span class="sr-val" style="color:#6db3ff">${k}</span></div>`)}(c==null?void 0:c.blockPower)>0&&A.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="Block Power">Block Power</span><span class="sr-val" style="color:#6db3ff">+${Math.round(c.blockPower)}</span></div>`)}catch{}for(const c of Object.keys(u)){if(H.has(c)||H.has(c.toLowerCase()))continue;const k=u[c];if(!k)continue;const S=B[c]||c.replace(/([A-Z])/g," $1").replace(/^./,pe=>pe.toUpperCase()),ce=(c==="goldFind"||c==="xpFind"||c==="critChance"||c==="critDamage"||c==="tradePrices")&&Math.abs(k)<=3?`+${(k*100).toFixed(1).replace(/\.0$/,"")}%`:c==="lifeSteal"||c==="manaSteal"?`+${Math.round(k*10)/10}%`:`+${Math.round(k*100)/100}`;A.push(`<div class="stat-row"><span class="sr-label stat-label" data-stat="${S}">${S}</span><span class="sr-val" style="color:#6db3ff">${ce}</span></div>`)}}const T=A.length?A.join(""):'<div class="stat-row"><span class="sr-label" style="color:#5a4a42;font-style:italic">None</span><span class="sr-val" style="color:#5a4a42">—</span></div>',z=d?`<div class="panel-label">${s}</div>`:"",D=`<label class="stats-base-toggle ember-check"><input type="checkbox" id="${n}"${l?" checked":""}> Show Base Attributes</label>`,F=`
    <div class="stat-row"><span class="sr-label stat-label" data-stat="HP">HP</span><span class="sr-val"${$("hp",_.hp,C.hp)}>${Math.floor(_.hp)}</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Mana">Mana</span><span class="sr-val"${$("mp",_.mp,C.mp)}>${Math.floor(_.mp)}</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Armor">Armor</span><span class="sr-val"${$("armor",O,m)}>${Math.floor(O)}</span></div>
    <div class="stat-row" title="Armor ${(R.armorDr*100).toFixed(1)}% + Misc ${(R.miscDr*100).toFixed(1)}% (multiplicative)"><span class="sr-label stat-label" data-stat="Damage Reduction">Damage Reduction</span><span class="sr-val"${$("dmgReduction",R.totalDr,U.totalDr)}>${(R.totalDr*100).toFixed(1)}%</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Magic Resist">Magic Resist</span><span class="sr-val"${$("magicResist",M,0)}>${Math.floor(M)}</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Hit">Hit</span><span class="sr-val"${$("hit",_.hit,C.hit)}>${Math.floor(_.hit)}%</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Dodge">Dodge</span><span class="sr-val"${$("dodge",_.dodge,C.dodge)}>${Math.floor(_.dodge)}%</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="${y}">${y}</span><span class="sr-val"${$("dmg",r[1],f[1])}>${Math.floor(r[0])}-${Math.floor(r[1])}</span></div>
    <div class="stat-row"><span class="sr-label stat-label" data-stat="Spell Power">Spell Power</span><span class="sr-val"${$("spellPower",_.spl,C.spl)}>+${Math.round(_.spl*100)}%</span></div>
  `;return o?`
      ${z}
      ${D}
      <div class="cs-stats-grid">
        <div class="cs-section cs-section-attrs">
          <div class="panel-label">Attributes</div>
          ${X}
        </div>
        <div class="cs-section cs-section-derived">
          <div class="panel-label">Derived Stats</div>
          ${F}
          <div class="panel-label" style="margin-top:0.75rem">Other Effects</div>
          ${T}
        </div>
      </div>
    `:`
    ${z}
    ${D}
    <div class="cs-stats-grid">
      <div class="cs-section cs-section-derived">
        ${F}
      </div>
      <div class="cs-section cs-section-attrs">
        <div class="panel-label">Attributes</div>
        ${X}
        <div class="panel-label" style="margin-top:0.75rem">Other Effects</div>
        ${T}
      </div>
    </div>
  `}const re={active:"auto_active",passive:"auto_passive",attrs:"auto_attrs"},Te={active:"pendingSkillPoints",passive:"pendingPassivePoints",attrs:"pendingAttrPoints"},Ae={active:"Auto-spend talent points",passive:"Auto-spend passive points",attrs:"Auto-spend attribute points"},Ee={active:"Talent points will be auto-spent on each level-up using the class default order. You will not get a chance to pick talents yourself until you turn this off.",passive:"Passive points will be auto-spent on each level-up using the class default order. You will not get to choose which passives to learn until you turn this off.",attrs:"Attribute points will be auto-spent on each level-up using the class default priority. You will not get to choose which attributes to raise until you turn this off."};function Me(p){if(!p||typeof p!="object")return[];const t=[],o=s=>`${Math.round(s*100)}%`,e=s=>`${s} round${s===1?"":"s"}`,d={targets:s=>`Hits ${s} targets`,damageMult:s=>`Damage: ${s}x multiplier`,damage_mult:s=>`Damage: ${s}x multiplier`,dmgBuff:s=>`+${o(s)} party damage`,dmgReduct:s=>`-${o(s)} damage taken`,reflect:s=>`Reflects ${o(s)} damage back`,duration:s=>`Lasts ${e(s)}`,aoe:s=>`Area: ${s}`,tempHp:s=>`+${s} temporary HP per member`,healMult:s=>`Heals ${s}x multiplier`,attackSpeed:s=>`+${o(s)} attack speed`,mpCost:s=>s<0?`Mana cost -${Math.abs(s)}`:`Mana cost +${s}`,bleed:s=>`Applies Bleed (${e((s==null?void 0:s.duration)??s)})`,statusEffects:s=>Array.isArray(s)?s.map(n=>`${Math.round((n.chance||1)*100)}% chance: ${n.type} (${e(n.duration)})`).join(", "):String(s),status_apply:s=>`Applies ${s}`,immuneStun:s=>s?"Immune to Stun":"",immuneBleed:s=>s?"Immune to Bleed":"",unlocksCompanion:s=>`Unlocks companion: ${s}`};for(const[s,n]of Object.entries(p)){if(n==null||n===!1)continue;const i=d[s];if(i){const a=i(n);a&&t.push(a)}else{const a=s.replace(/_/g," ").replace(/([A-Z])/g," $1").trim(),l=typeof n=="object"?JSON.stringify(n):String(n);t.push(`${a}: ${l}`)}}return t}class ze{constructor(t,o){this.manager=t,this.audio=o,this._el=null,this._selectedCharIdx=0,this._selectedSkill=null,this._mobileDetailView=!1,this._tab="active"}onEnter(){try{const t=w.get(),o=(t==null?void 0:t.party)||[];let e=-1;t!=null&&t.skillFocusId&&(e=o.findIndex(s=>s&&s.id===t.skillFocusId),t.skillFocusId=null),e<0&&(e=o.findIndex(s=>s&&(s.pendingSkillPoints||0)+(s.pendingPassivePoints||0)+(s.pendingAttrPoints||0)>0)),e>=0&&(this._selectedCharIdx=e);const d=o[this._selectedCharIdx];d&&!this._tabPinned&&((d.pendingSkillPoints||0)>0?this._tab="active":(d.pendingPassivePoints||0)>0?this._tab="passive":(d.pendingAttrPoints||0)>0&&(this._tab="attrs")),this._tabPinned=!1;for(const s of o){if(!s||!s.autoBuild||q())continue;const n=this._tab;for(const i of["active","passive","attrs"]){if(!s.autoBuild[`auto_${i}`])continue;this._tab=i;const a=this._selectedCharIdx;this._selectedCharIdx=o.indexOf(s);let l=0;for(;this._applyOneRecommended(s)&&l++<200;);this._selectedCharIdx=a}this._tab=n}}catch{}this._build()}_build(){ve("skill-styles",Ne),this._el=ke("div","skill-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){var b,m,u,v,x,h;const o=w.get().party,e=o[this._selectedCharIdx],d=e?Z(e.class):[],s=e?J(e.class,e.level||1):[],n=(e==null?void 0:e.talentsPurchased)||{},i={};for(const r of[".skill-list-panel",".skill-detail-panel",".passive-panel",".attrs-panel"]){const f=this._el.querySelector(r);f&&(i[r]=f.scrollTop)}const a=window.scrollY||document.documentElement.scrollTop,l=document.activeElement;if(l&&l!==document.body&&typeof l.blur=="function")try{l.blur()}catch{}this._el.innerHTML=`
      <div class="skill-header">
        <div class="skill-char-tabs" id="skill-char-tabs">
          ${o.map((r,f)=>{const y=(r.pendingSkillPoints||0)+(r.pendingPassivePoints||0)+(r.pendingAttrPoints||0),M=y>0&&f!==this._selectedCharIdx;return`
            <button type="button" class="sct-tab${f===this._selectedCharIdx?" active":""}" data-idx="${f}">
              <span class="sct-portrait">${xe(r,24)}</span>
              ${r.name} ${_e(r,12,"sct-class-icon")}<br><small>${r.className||r.class} Lv${r.level||1}</small>
              ${M?`<span class="sct-badge">${y>9?"9+":y}</span>`:""}
            </button>`}).join("")}
        </div>
        <div class="skill-header-btns">
          ${this._mobileDetailView?'<button type="button" class="skill-back-mobile" id="skill-back-mobile">← Back</button>':""}
          <button type="button" class="skill-close" id="skill-close">✕</button>
        </div>
      </div>
      <div class="skill-mode-tabs">
        <button type="button" class="smt-tab${this._tab==="active"?" active":""}${(b=e==null?void 0:e.autoBuild)!=null&&b.auto_active?" auto-on":""}" data-mode="active">
          Spells${e&&(e.pendingSkillPoints||0)>0?` <span class="smt-badge">${e.pendingSkillPoints}</span>`:""}${(m=e==null?void 0:e.autoBuild)!=null&&m.auto_active?' <span class="smt-auto-check" aria-label="Auto on" title="Auto on">✓</span>':""}
        </button>
        <button type="button" class="smt-tab${this._tab==="passive"?" active":""}${(u=e==null?void 0:e.autoBuild)!=null&&u.auto_passive?" auto-on":""}" data-mode="passive">
          Passive${e&&(e.pendingPassivePoints||0)>0?` <span class="smt-badge">${e.pendingPassivePoints}</span>`:""}${(v=e==null?void 0:e.autoBuild)!=null&&v.auto_passive?' <span class="smt-auto-check" aria-label="Auto on" title="Auto on">✓</span>':""}
        </button>
        <button type="button" class="smt-tab${this._tab==="attrs"?" active":""}${(x=e==null?void 0:e.autoBuild)!=null&&x.auto_attrs?" auto-on":""}" data-mode="attrs">
          Attributes${e&&(e.pendingAttrPoints||0)>0?` <span class="smt-badge">${e.pendingAttrPoints}</span>`:""}${(h=e==null?void 0:e.autoBuild)!=null&&h.auto_attrs?' <span class="smt-auto-check" aria-label="Auto on" title="Auto on">✓</span>':""}
        </button>
      </div>
      ${this._tab==="attrs"?this._renderAttrsPanel(e):this._tab==="passive"?this._renderPassivePanel(e):`
      <div class="skill-layout${this._mobileDetailView?" mobile-detail-open":""}">
        <!-- Skill list -->
        <div class="skill-list-panel">
          <div class="skill-panel-head">
            <div class="panel-label">Spells</div>
            ${e?this._renderAutoToggle(e,"active"):""}
          </div>
          ${e?`<div class="passive-points-banner" style="margin-bottom:0.65rem"><span class="pp-num">${e.pendingSkillPoints||0}</span><span class="pp-label">Talent Point${(e.pendingSkillPoints||0)===1?"":"s"} Available</span></div>`:""}
          ${d.map(r=>{const f=s.find(y=>y.name===r.name);return`
              <div class="skill-row${f?"":" locked"}${this._selectedSkill===r.name?" selected":""}" data-skill="${r.name}">
                <div class="sk-level-badge">Lv${r.unlockLevel}</div>
                <div class="sk-info">
                  <div class="sk-name">${r.name}</div>
                  <div class="sk-type">${r.type} · ${r.aoe||r.target||"self"}</div>
                </div>
                <div class="sk-cost">${r.mpCost>0?`${r.mpCost} MP`:"Passive"}</div>
                ${f?"":'<div class="sk-lock-icon">🔒</div>'}
              </div>
            `}).join("")}
        </div>
        <!-- Skill detail / talents -->
        <div class="skill-detail-panel">
          ${this._selectedSkill?this._renderSkillDetail(e,n):`
            <div class="skill-select-prompt">Select a skill to view its description and upgrade talents.</div>
          `}
        </div>
      </div>
      `}
    `,this._wireEvents(),ye(this._el);const g=this._el.querySelector("#skill-stats-base");g&&g.addEventListener("change",()=>{Q(g.checked),this._render()});for(const r of Object.keys(i)){const f=this._el.querySelector(r);f&&(f.scrollTop=i[r])}window.scrollTo(0,a)}_renderSkillDetail(t,o){var g,b,m,u,v,x,h;const e=Object.values(V).find(r=>r.name===this._selectedSkill);if(!e)return"";const d=e.talents||[],s=(t==null?void 0:t.pendingSkillPoints)||0;let n=null,i=null;if(t){const r=t.attrs||{},f=de(t),y={STR:(r.STR||8)+(f.str||0),DEX:(r.DEX||8)+(f.dex||0),INT:(r.INT||8)+(f.int||0),CON:(r.CON||8)+(f.con||0)},M=y.INT*.025+(f.spellPower||0);var a=e;try{a=ee(e,t)}catch{}if(e.damageStat){const P=e.damageStat,_=I=>y[I.toUpperCase()]||0,C=/int|spell/i.test(P)||["fire","ice","lightning","holy","necro","magic"].includes(e.type),O=+a.damageMult||0;let N={};try{N=(typeof te=="function"?(g=te().combat)==null?void 0:g.skill:null)||{}}catch{}const R=N.heroDamageMult??1,U=(((m=(b=t==null?void 0:t.equipment)==null?void 0:b.weapon)==null?void 0:m.weaponCategory)||((v=(u=t==null?void 0:t.equipment)==null?void 0:u.weapon)==null?void 0:v.subtype)||"").toLowerCase(),$=a.damageCategory||(C?"magic":/2h|hammer|maul/.test(U)?"heavy":"light"),X=$==="magic"?N.magicMult??.78:$==="heavy"?N.heavyMult??1:N.lightMult??1,H=O*R*X;let B=null;try{B=w.get()}catch{}const A=!!(B!=null&&B.weaponScaling),T=(x=t==null?void 0:t.equipment)==null?void 0:x.weapon,z=(T==null?void 0:T.damage)||(T==null?void 0:T.dmg)||[],D=z.length===2?(z[0]+z[1])/2:0,F=A?D:P==="str_int"?(_("str")+_("int"))/2:_(P),c=Math.round((y.STR||8)*1.5),k=C?M:c*.05,S=C?0:Math.round(D*.1),E=F*H*(1+k)+S;n=Math.max(0,Math.round(E)),e.__estTip={sv:F,finalMult:H,powerBonus:k,weaponFlavor:S,weaponMid:D,isMagic:C,ws:A,cat:$}}if(e.healStat){const P=e.healStat,_=y[P.toUpperCase()]||0;i=Math.round((+a.healMult||0)*_*(1+M))}}let l=e;try{t&&(l=ee(e,t))}catch{}return`
      <div class="skill-detail-inner">
        <div class="sd-name">${e.name}</div>
        <div class="sd-type"><span class="sd-badge">${e.type}</span>${e.aoe?`<span class="sd-badge">${e.aoe}</span>`:""}</div>
        <div class="sd-desc">${e.description}</div>
        ${e.mpCost>0?`<div class="sd-cost">Mana Cost: <strong>${e.mpCost}</strong></div>`:""}
        ${e.damageStat?`<div class="sd-formula">Damage: ${l.damageMult}× ${e.damageStat.toUpperCase()}${l.damageMult!==e.damageMult?` <span style="color:#6a8aa0">(base ${e.damageMult}×, upgraded)</span>`:""}</div>`:""}
        ${n!==null?`<div class="sd-estimate">Est. Damage: <strong>~${n}</strong> <span style="color:#8a7a6a">per primary target, before armor/resist</span></div>`:""}
        ${e.__estTip?`<div class="sd-formula" style="font-size:0.7rem;color:#a89870;margin-top:0.15rem">
          ${e.__estTip.ws?`wpn ${e.__estTip.weaponMid.toFixed(0)}`:`${e.damageStat.toUpperCase()} ${e.__estTip.sv}`}
          × ${e.__estTip.finalMult.toFixed(2)}
          × (1 + ${e.__estTip.powerBonus.toFixed(2)} ${e.__estTip.isMagic?"SP":"AP"})
          ${e.__estTip.weaponFlavor>0?` + ${e.__estTip.weaponFlavor}`:""}
          <span style="color:#6a6070">· ${e.__estTip.cat}${e.__estTip.ws?" · weapon-scaling":""}</span>
        </div>`:""}
        ${e.healStat?`<div class="sd-formula">Heal: ${l.healMult}× ${e.healStat.toUpperCase()}${l.healMult!==e.healMult?` <span style="color:#6a8aa0">(base ${e.healMult}×)</span>`:""}</div>`:""}
        ${i!==null?`<div class="sd-estimate">Est. Heal: <strong>~${i}</strong></div>`:""}
        ${(h=e.statusEffects)!=null&&h.length?`
          <div class="sd-effects">
            ${e.statusEffects.map(r=>`<div class="sd-effect"><span class="eff-name">${r.type.toUpperCase()}</span> ${Math.round(r.chance*100)}% chance · ${r.duration} rounds</div>`).join("")}
          </div>
        `:""}
        ${d.length?`
          <div class="sd-talents-title">Upgrade Talents</div>
          <div class="sd-talents">
            ${d.map(r=>{const f=o[r.id],y=!f&&s>0;return`
                <div class="sd-talent${f?" purchased":""}">
                  <div class="sdt-info">
                    <div class="sdt-name">${r.name}</div>
                    <div class="sdt-desc">${r.desc}</div>
                  </div>
                  <button type="button" class="sdt-btn${f?" done":""}" data-talent="${r.id}" ${f||!y?"disabled":""}>
                    ${f?"✓ Learned":"Learn (1 pt)"}
                  </button>
                </div>
              `}).join("")}
          </div>
        `:'<div style="color:#8a7a6a;font-size:0.8rem;margin-top:1rem">No upgrade talents available for this skill.</div>'}
      </div>
    `}_renderRecommendBar(t){const o=this._tab,e=o==="active"?t.pendingSkillPoints||0:o==="passive"?t.pendingPassivePoints||0:t.pendingAttrPoints||0,d=`auto_${o}`,s=!!(t.autoBuild&&t.autoBuild[d]),n=q();return`
      <div class="recommend-bar">
        <button type="button" class="recommend-btn${e>0?"":" disabled"}" id="recommend-btn" ${e>0?"":"disabled"}>
          ✦ Recommend
        </button>
        ${n?'<span class="recommend-auto recommend-auto-locked" title="Auto disabled on Hard difficulty">&#x1F512; Auto</span>':`<label class="recommend-auto">
              <input type="checkbox" id="recommend-auto" ${s?"checked":""}>
              Auto
            </label>`}
        <span class="recommend-note">${e>0?`${e} point${e===1?"":"s"} pending`:"No points pending"}</span>
      </div>
    `}_recommendAttr(t){const o=$e.find(l=>l.id===t.class),e=(o==null?void 0:o.primaryAttr)||"STR",d=t.baseAttrs||{STR:8,DEX:8,INT:8,CON:8},s=t.attrs||{...d},n=(s[e]||0)-(d[e]||0),i=(s.CON||0)-(d.CON||0),a=n+i;return a>0&&i/a<.2?"CON":e}_recommendPassive(t){const o=j(t.class),e=t.passiveRanks||{},d=/lifesteal|life_steal|mana_regen|mana_steal|regen|lifebind|soulbind|exotic|leech|siphon/i,s=o.find(n=>d.test(n.id+" "+(n.name||"")+" "+(n.desc||""))&&(e[n.id]||0)<n.maxRank);return s?s.id:(o.find(n=>(e[n.id]||0)<n.maxRank)||{}).id||null}_recommendTalent(t){const o=Z(t.class),e=J(t.class,t.level||1),d=t.talentsPurchased||{},s=[...e].sort((n,i)=>(n.unlockLevel||0)-(i.unlockLevel||0));for(const n of s){const i=o.find(a=>a.name===n.name)||n;for(const a of i.talents||[])if(!d[a.id])return{skillName:n.name,talentId:a.id}}return null}_applyOneRecommended(t){const o=this._tab;if(o==="attrs"){if((t.pendingAttrPoints||0)<=0)return!1;const d=this._recommendAttr(t);t.attrs[d]=(t.attrs[d]||8)+1,t.pendingAttrPoints-=1;try{t.maxHp=G(t),t.maxMp=W(t)}catch{}return!0}if(o==="passive"){if((t.pendingPassivePoints||0)<=0)return!1;const d=this._recommendPassive(t);if(!d)return!1;const n=j(t.class).find(a=>a.id===d);if(!n)return!1;t.passiveRanks||(t.passiveRanks={});const i=t.passiveRanks[d]||0;return i>=n.maxRank?!1:(t.passiveRanks[d]=i+1,t.pendingPassivePoints-=1,se(t),!0)}if((t.pendingSkillPoints||0)<=0)return!1;const e=this._recommendTalent(t);return e?(t.talentsPurchased||(t.talentsPurchased={}),t.talentsPurchased[e.talentId]=!0,t.pendingSkillPoints=Math.max(0,(t.pendingSkillPoints||0)-1),this._selectedSkill=e.skillName,!0):!1}_renderPassivePanel(t){if(!t)return'<div class="passive-empty">No character selected.</div>';const o=j(t.class),e=t.passiveRanks||{},d=t.pendingPassivePoints||0;return`
      <div class="passive-panel">
        <div class="passive-header">
          <div class="panel-label">Passives</div>
          <div class="passive-points-banner">
            <span class="pp-num">${d}</span>
            <span class="pp-label">Passive Point${d===1?"":"s"} Available</span>
          </div>
          ${this._renderAutoToggle(t,"passive")}
        </div>
        <div class="passive-nodes">
          ${o.map((s,n)=>{const i=e[s.id]||0,a=d>0&&i<s.maxRank;return`
              <div class="passive-node${i>0?" owned":""}">
                <div class="pn-index">${n+1}</div>
                <div class="pn-info">
                  <div class="pn-name">${s.name}</div>
                  <div class="pn-desc">${s.desc}</div>
                  <div class="pn-rank">Rank <strong>${i}</strong> / ${s.maxRank}</div>
                </div>
                <button type="button" class="pn-btn${a?"":" disabled"}" data-passive="${s.id}" ${a?"":"disabled"}>
                  ${i>=s.maxRank?"✓ Maxed":"Learn (1 pt)"}
                </button>
              </div>
            `}).join("")}
        </div>
        <div class="passive-hint">Earn 1 Passive Point every 2 levels. Bonuses are permanent.</div>
      </div>
    `}_renderAttrsPanel(t){if(!t)return'<div class="passive-empty">No character selected.</div>';const o=t.pendingAttrPoints||0,e=Pe(t,{withSpendButtons:!0,pendingAttrPoints:o,includeHeader:!1,baseToggleId:"skill-stats-base"});return`
      <div class="passive-panel attrs-panel">
        <div class="passive-header">
          <div class="panel-label">Attributes</div>
          <div class="passive-points-banner">
            <span class="pp-num">${o}</span>
            <span class="pp-label">Attribute Point${o===1?"":"s"} Available</span>
          </div>
          ${this._renderAutoToggle(t,"attrs")}
        </div>
        <div class="char-stats-panel attrs-stats-panel">
          ${e}
        </div>
        <div class="passive-hint">Spend deferred points from level-ups any time.</div>
      </div>
    `}_renderAutoToggle(t,o){const e=re[o],d=!!(t.autoBuild&&t.autoBuild[e]);return q()?`
        <button type="button" class="auto-toggle hard-locked" data-auto-tab="${o}" aria-disabled="true" title="Auto disabled on Hard difficulty" disabled>
          <span class="auto-lock-icon" aria-hidden="true">&#x1F512;</span>Auto
        </button>
      `:`
      <button type="button" class="auto-toggle${d?" on":""}" data-auto-tab="${o}" aria-pressed="${d?"true":"false"}" title="${d?"Auto: On":"Auto: Off"}">
        ${d?'<span class="auto-check" aria-hidden="true">✓</span>':'<span class="auto-check auto-off" aria-hidden="true">○</span>'}Auto
      </button>
    `}_wireEvents(){var o,e,d,s;(o=this._el.querySelector("#skill-close"))==null||o.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(e=this._el.querySelector("#skill-back-mobile"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this._mobileDetailView=!1,this._selectedSkill=null,this._render()}),this._el.querySelectorAll(".sct-tab").forEach(n=>{n.addEventListener("click",()=>{var l;this.audio.playSfx("click"),this._selectedCharIdx=parseInt(n.dataset.idx),this._selectedSkill=null,this._mobileDetailView=!1;const i=w.get(),a=(l=i==null?void 0:i.party)==null?void 0:l[this._selectedCharIdx];a&&((a.pendingSkillPoints||0)>0?this._tab="active":(a.pendingPassivePoints||0)>0?this._tab="passive":(a.pendingAttrPoints||0)>0&&(this._tab="attrs")),this._render()})}),this._el.querySelectorAll(".skill-row").forEach(n=>{n.addEventListener("click",()=>{n.classList.contains("locked")||(this.audio.playSfx("click"),this._selectedSkill=n.dataset.skill,this._mobileDetailView=!0,this._render())})}),this._el.querySelectorAll(".smt-tab").forEach(n=>{n.addEventListener("click",()=>{this.audio.playSfx("click"),this._tab=n.dataset.mode,this._selectedSkill=null,this._mobileDetailView=!1,this._render()})}),(d=this._el.querySelector("#recommend-btn"))==null||d.addEventListener("click",()=>{const i=w.get().party[this._selectedCharIdx];i&&this._applyOneRecommended(i)&&(this.audio.playSfx("spell"),this._render())}),(s=this._el.querySelector("#recommend-auto"))==null||s.addEventListener("change",n=>{if(q()){n.target.checked=!1;return}const i=w.get(),a=i.party[this._selectedCharIdx];if(!a){n.target.checked=!1;return}const l=this._tab,g=`auto_${l}`;if(n.target.checked){i.autoSkillConfirmed||(i.autoSkillConfirmed={active:!1,passive:!1,attrs:!1});const b=()=>{a.autoBuild||(a.autoBuild={}),a.autoBuild[g]=!0;let m=0;for(;this._applyOneRecommended(a)&&m++<200;);this.audio.playSfx("spell"),this._render()};if(i.autoSkillConfirmed[l]){b();return}n.target.checked=!1,ne({title:"Enable Auto-Recommend?",message:"Auto-apply recommended points on level-up for this tab? You can uncheck this later.",confirmText:"Enable Auto",cancelText:"Cancel",onConfirm:()=>{n.target.checked=!0,i.autoSkillConfirmed[l]=!0,b()}})}else a.autoBuild&&(a.autoBuild[g]=!1)}),this._el.querySelectorAll(".passive-node").forEach(n=>{le(),oe(n,()=>{const i=n.querySelector("[data-passive]"),a=i==null?void 0:i.dataset.passive,g=w.get().party[this._selectedCharIdx];if(!g||!a)return"";const m=j(g.class).find(v=>v.id===a);if(!m)return"";const u=(g.passiveRanks||{})[a]||0;return`<div class="tt-title">${m.name}</div><div class="tt-sub">Rank ${u} / ${m.maxRank}</div><div class="tt-row">${m.desc}</div>`})}),this._el.querySelectorAll("[data-passive]").forEach(n=>{n.addEventListener("click",()=>{if(n.disabled)return;const a=w.get().party[this._selectedCharIdx];if(!a||(a.pendingPassivePoints||0)<=0)return;const l=n.dataset.passive,b=j(a.class).find(u=>u.id===l);if(!b)return;a.passiveRanks||(a.passiveRanks={});const m=a.passiveRanks[l]||0;m>=b.maxRank||(a.passiveRanks[l]=m+1,a.pendingPassivePoints-=1,se(a),this.audio.playSfx("spell"),this._render())})}),this._el.querySelectorAll("[data-attr]").forEach(n=>{n.addEventListener("click",()=>{if(n.disabled)return;const a=w.get().party[this._selectedCharIdx];if(!a||(a.pendingAttrPoints||0)<=0)return;const l=n.dataset.attr;a.attrs||(a.attrs={STR:8,DEX:8,INT:8,CON:8}),a.attrs[l]=(a.attrs[l]||8)+1,a.pendingAttrPoints-=1;try{a.maxHp=G(a),a.maxMp=W(a)}catch{}this.audio.playSfx("spell"),this._render()})}),this._el.querySelectorAll("[data-auto-tab]").forEach(n=>{n.addEventListener("click",()=>{if(q()){this._showHardLockTip(n);return}const a=w.get().party[this._selectedCharIdx];if(!a)return;const l=n.dataset.autoTab,g=re[l],b=Te[l];if(!g)return;a.autoBuild||(a.autoBuild={});const m=!!a.autoBuild[g],u=a[b]||0,v=()=>{const r=this._tab;this._tab=l;let f=0;for(;this._applyOneRecommended(a)&&f++<200;);this._tab=r},x=r=>{a.autoBuild[g]=r,r&&v(),this.audio.playSfx("click"),this._render()};if(m&&u>0){v(),this.audio.playSfx("click"),this._render();return}if(m||u<=0){x(!m);return}const h=w.get();if(h.autoSkillConfirmed||(h.autoSkillConfirmed={active:!1,passive:!1,attrs:!1}),h.autoSkillConfirmed[l]){x(!0);return}ne({title:Ae[l]+"?",message:Ee[l],confirmText:"Enable Auto",cancelText:"Cancel",onConfirm:()=>{h.autoSkillConfirmed[l]=!0,x(!0)}})})});const t=this._el.querySelector("#skill-stats-base");t&&!t._wired&&(t._wired=!0,t.addEventListener("change",()=>{Q(t.checked),this._render()})),this._el.querySelectorAll("[data-talent]").forEach(n=>{n.addEventListener("click",()=>{var b;if(n.disabled)return;const a=w.get().party[this._selectedCharIdx];if(!a||(a.pendingSkillPoints||0)<=0||(a.talentsPurchased||(a.talentsPurchased={}),a.talentsPurchased[n.dataset.talent]))return;a.talentsPurchased[n.dataset.talent]=!0,a.pendingSkillPoints=Math.max(0,(a.pendingSkillPoints||0)-1);const l=n.dataset.talent,g=Object.values(V);for(const m of g){const u=(m.talents||[]).find(v=>v.id===l);if((b=u==null?void 0:u.effect)!=null&&b.unlocksCompanion){const v=u.effect.unlocksCompanion,x=we[v];if(x){const h={...x,id:v+"_"+a.id,templateId:v,ownerId:a.id,ownerName:a.name,level:a.level||1,attrs:{...x.attrs}},r=Math.floor(((a.level||1)-1)*.5);h.attrs.STR+=r,h.attrs.DEX+=r,h.attrs.INT+=r,h.attrs.CON+=r,h.maxHp=50+h.attrs.CON*10,h.hp=h.maxHp,h.maxMp=10+h.attrs.INT*3,h.mp=h.maxMp,w.addToCompanions(h)||w.addToBench(h)}break}}this.audio.playSfx("spell"),this._render()})}),this._el.querySelectorAll(".sd-talent").forEach(n=>{const i=n.querySelector("[data-talent]");if(!i)return;const a=i.dataset.talent;let l=null,g=null;for(const b of Object.values(V)){const m=(b.talents||[]).find(u=>u.id===a);if(m){l=m.effect,g=m.desc;break}}le(),oe(n,()=>{const b=l?Me(l):[];return!b.length&&!g?null:`${b.length?b.map(u=>`<div class="tt-row">${u}</div>`).join(""):""}`})})}_showHardLockTip(t){var n,i,a;if((n=this._el)==null?void 0:n.querySelector(".hard-lock-tip"))return;const e=document.createElement("div");e.className="hard-lock-tip",e.textContent="Auto disabled on Hard difficulty.";const d=t?t.getBoundingClientRect():null,s=(i=this._el)==null?void 0:i.getBoundingClientRect();d&&s&&(e.style.position="absolute",e.style.top=d.bottom-s.top+6+"px",e.style.left=d.left-s.left+"px"),(a=this._el)==null||a.appendChild(e),setTimeout(()=>e.remove(),2e3)}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){ae(this._el),this._el=null}destroy(){ae(this._el),this._el=null}}const Ne=`
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
.smt-badge { display: inline-block; margin-left: 0.25rem; padding: 0.1rem 0.35rem; background: #c04030; color: #fff; font-size: 0.62rem; border-radius: 8px; }
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
`;export{ze as SkillTreeScreen};
