const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-C9yvU6FC.js","./main-D2c3OVlN.css"])))=>i.map(i=>d[i]);
import{U as Y,D as u,W as l,S as k,E as T,C as E,d as U,_ as H}from"./main-C9yvU6FC.js";import{s as B,n as F}from"./Noise-Cgm4OGP4.js";import{c as K}from"./RNG-ziO0lLz6.js";import{H as G}from"./HUDPanel-DZUU1G_j.js";import{G as g}from"./Graphics-mkWfqWgm.js";import"./colorToUniform-DUza8Qlq.js";const D={might:"Might",agility:"Agility",wit:"Wit",presence:"Presence",endurance:"Endurance",attunement:"Attunement"},O={dialog:{label:"Encounter",color:"#c8a020"},combat:{label:"Ambush",color:"#c83020"},merchant:{label:"Traveler",color:"#4a9a4a"},shrine:{label:"Shrine",color:"#7a5aba"},discovery:{label:"Discovery",color:"#2a8aaa"},rest:{label:"Rest Site",color:"#4a7a4a"},trap:{label:"Danger",color:"#c83020"},default:{label:"Encounter",color:"#c8a020"}};class W extends Y{constructor(){super("panel-encounter-dialog",{trapFocus:!0,zLayer:"modal"}),this._encounter=null,this._partyChars=null,this._onComplete=null,this._inResultPhase=!1,this._chosenIndex=null,this._keyHandler=e=>this._onKeydown(e)}show(e,t,n){this._encounter=e,this._partyChars=t??[],this._onComplete=n??null,this._inResultPhase=!1,this._chosenIndex=null,this._renderEncounter(),this._addDarkOverlay(),window.addEventListener("keydown",this._keyHandler),super.show(),this._focusFirstOption(),u.event(`[encounter] Dialog shown; id=${e?.id??"unknown"} title="${e?.title??""}" options=${e?.options?.length??0}`)}hide(){window.removeEventListener("keydown",this._keyHandler),this._removeDarkOverlay(),super.hide(),this._encounter=null,this._partyChars=null,this._onComplete=null}_renderEncounter(){const e=this._encounter;if(!e)return;const t=O[e.type]??O.default,n=e.options??[],i=n.map((r,o)=>this._renderOption(r,o)).join("");this.el.innerHTML=`
      <div class="enc-dialog-inner">

        <!-- Header -->
        <div class="enc-header">
          <div class="enc-type-badge" style="color:${t.color};">${t.label}</div>
          <div class="enc-title">${this._escHtml(e.title??"Unknown Encounter")}</div>
        </div>

        <!-- Narrative text -->
        <div class="enc-body">
          <p class="enc-narrative">${this._escHtml(e.description??"")}</p>
        </div>

        <!-- Options list -->
        <div class="enc-options" id="enc-options-list" role="group" aria-label="Choose an action">
          ${i}
        </div>

        <!-- Keyboard hint -->
        <div class="enc-hint">
          Press <kbd>1</kbd>–<kbd>${Math.min(n.length,9)}</kbd> to choose &nbsp;&middot;&nbsp;
          <kbd>Esc</kbd> to pass
        </div>

      </div>
    `,this._applyDialogStyles(),this._attachOptionHandlers()}_renderOption(e,t){const{met:n,requirementHTML:i}=this._checkRequirements(e),r=n?"":"enc-option--locked",o=n?"":"opacity:0.5;",s=`[${t+1}]`;let a="";if(e.check){const c=e.check.dc??"?";a=`
        <span class="enc-option-roll-hint">${D[e.check.attribute]??e.check.attribute??"Skill"} check — DC ${c}</span>
      `}return`
      <button
        class="enc-option ${r}"
        data-option-index="${t}"
        style="${o}"
        ${n?"":'aria-disabled="true"'}
        tabindex="${n?"0":"-1"}"
        aria-label="Option ${t+1}: ${this._escHtml(e.text??"")}"
      >
        <span class="enc-option-num">${s}</span>
        <span class="enc-option-content">
          <span class="enc-option-text">${this._escHtml(e.text??"")}</span>
          ${i}
          ${a}
        </span>
      </button>
    `}_checkRequirements(e){if(!e.requires)return{met:!0,requirementHTML:""};const t=Array.isArray(e.requires)?e.requires:[e.requires],n=[];let i=!0;for(const o of t)if(o.gold!=null){const s=this._partyHasGold(o.gold);n.push({label:`${o.gold} gold`,met:s}),s||(i=!1)}else if(o.attribute){const s=o.attribute,a=o.value??10,c=this._partyHasStat(s,a),d=D[s]??s;n.push({label:`${d} ${a}+`,met:c}),c||(i=!1)}else if(o.item){const s=this._partyHasItem(o.item);n.push({label:o.item,met:s}),s||(i=!1)}else o.tag&&n.push({label:o.tag,met:!0});const r=n.map(o=>`
      <span class="enc-req-tag ${o.met?"enc-req-tag--met":"enc-req-tag--fail"}">
        ${this._escHtml(o.label)}
      </span>
    `).join("");return{met:i,requirementHTML:n.length>0?`<span class="enc-option-reqs">${r}</span>`:""}}_renderResult(e){this._inResultPhase=!0;const t=this._encounter,n=t?.options?.[this._chosenIndex],i=e?.roll!=null?`<div class="enc-roll-result">
           Roll: <span class="enc-roll-num">${e.roll}</span>
           ${e.success!=null?`&nbsp;— <span class="${e.success?"enc-roll-success":"enc-roll-fail"}">
                  ${e.success?"Success":"Failure"}
                </span>`:""}
         </div>`:"",r=e?.success===!1?"enc-outcome--fail":"enc-outcome--success";this.el.innerHTML=`
      <div class="enc-dialog-inner">

        <!-- Header (kept for context) -->
        <div class="enc-header">
          <div class="enc-type-badge" style="color:#888;">Result</div>
          <div class="enc-title">${this._escHtml(t?.title??"Encounter")}</div>
        </div>

        <!-- Chosen option recap -->
        ${n?`
          <div class="enc-chosen-recap">
            You chose: <em>${this._escHtml(n.text??"")}</em>
          </div>
        `:""}

        <!-- Roll result (if applicable) -->
        ${i}

        <!-- Outcome narrative -->
        <div class="enc-body ${r}">
          <p class="enc-narrative">${this._escHtml(e?.text??e?.description??"The encounter concludes.")}</p>
        </div>

        <!-- Continue button -->
        <div class="enc-continue-row">
          <button id="enc-btn-continue" class="spellroads-btn spellroads-btn--primary enc-continue-btn"
            tabindex="0" aria-label="Continue">
            Continue
          </button>
        </div>

        <!-- Keyboard hint -->
        <div class="enc-hint">
          Press <kbd>Enter</kbd> or <kbd>Esc</kbd> to continue
        </div>

      </div>
    `,this._applyDialogStyles();const o=document.getElementById("enc-btn-continue");o&&(o.addEventListener("click",()=>this._finish(e)),o.focus()),u.event(`[encounter] Result shown; option=${this._chosenIndex} roll=${e?.roll??"n/a"} success=${e?.success??"n/a"}`)}_selectOption(e){const t=this._encounter;if(!t||this._inResultPhase)return;const n=t.options??[];if(e<0||e>=n.length)return;const i=n[e],{met:r}=this._checkRequirements(i);if(!r){u.info(`[encounter] Option ${e} locked — requirements not met`),this._shakeOption(e);return}this._chosenIndex=e;const o=this.el.querySelectorAll(".enc-option");o[e]&&o[e].classList.add("enc-option--selected");const s=this._resolveOption(t,e);setTimeout(()=>this._renderResult(s),180)}_resolveOption(e,t){try{if(window.__encounterSystem?.resolveOption)return window.__encounterSystem.resolveOption(e,t,this._partyChars)}catch(r){u.warn(`[encounter] EncounterSystem.resolveOption failed: ${r.message}`)}const n=e?.options?.[t],i=n?.outcomes??n?.outcome;return Array.isArray(i)&&i.length>0?i[Math.floor(Math.random()*i.length)]:i&&typeof i=="object"?i:{text:n?.resultText??"The encounter resolves without incident.",success:!0}}_finish(e){const t=this._onComplete;this.hide(),t&&t(e)}_onKeydown(e){if(!this._visible)return;if(this._inResultPhase){(e.key==="Enter"||e.key==="Escape")&&(e.preventDefault(),this._finish(null));return}const t=e.key.match(/^([1-9])$/);if(t){e.preventDefault(),this._selectOption(parseInt(t[1],10)-1);return}e.key==="Escape"&&(e.preventDefault(),this._finish({text:"You pass by without engaging.",passed:!0}))}_attachOptionHandlers(){this.el.querySelectorAll(".enc-option").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.dataset.optionIndex,10);this._selectOption(n)})})}_focusFirstOption(){const e=this.el.querySelector(".enc-option:not(.enc-option--locked)");e&&e.focus()}_shakeOption(e){const n=this.el.querySelectorAll(".enc-option")[e];n&&(n.classList.add("enc-option--shake"),setTimeout(()=>n.classList.remove("enc-option--shake"),400))}_addDarkOverlay(){let e=document.getElementById("enc-dark-overlay");e||(e=document.createElement("div"),e.id="enc-dark-overlay",e.style.cssText=`
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        z-index: 299;
        pointer-events: all;
      `,document.body.appendChild(e)),e.style.display="block"}_removeDarkOverlay(){const e=document.getElementById("enc-dark-overlay");e&&(e.style.display="none")}_partyHasGold(e){try{const t=window.__worldState;if(t)return(t.partyGold??0)>=e}catch{}return!0}_partyHasStat(e,t){return!this._partyChars||this._partyChars.length===0?!1:this._partyChars.some(n=>(n?.attributes?.[e]??n?.stats?.[e]??0)>=t)}_partyHasItem(e){return!this._partyChars||this._partyChars.length===0?!1:this._partyChars.some(t=>(t?.inventory??[]).some(i=>i.id===e||i.itemId===e))}_escHtml(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}_applyDialogStyles(){if(Object.assign(this.el.style,{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"min(600px, 92vw)",maxHeight:"88vh",overflow:"hidden",display:"flex",flexDirection:"column",zIndex:"300",border:"1px solid #7a5a20",borderRadius:"6px",boxShadow:"0 0 60px rgba(0,0,0,0.9), 0 0 20px rgba(180,130,0,0.15)",background:"transparent",pointerEvents:"all"}),!document.getElementById("enc-dialog-styles")){const e=document.createElement("style");e.id="enc-dialog-styles",e.textContent=V,document.head.appendChild(e)}}}const V=`
/* ── Encounter Dialog ───────────────────────────────────────────────────── */

#panel-encounter-dialog {
  font-family: 'Georgia', 'Times New Roman', serif;
}

#panel-encounter-dialog.visible {
  display: flex !important;
}

.enc-dialog-inner {
  display: flex;
  flex-direction: column;
  background: #120e08;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  max-height: 88vh;
}

/* Header */
.enc-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: #0c0908;
  border-bottom: 1px solid #5a4a20;
  flex-shrink: 0;
}

.enc-type-badge {
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 3px 8px;
  border-radius: 3px;
  background: rgba(255,255,255,0.05);
  border: 1px solid currentColor;
  white-space: nowrap;
  flex-shrink: 0;
}

.enc-title {
  font-size: clamp(15px, 2vw, 18px);
  font-weight: bold;
  color: #e8d090;
  letter-spacing: 0.04em;
  line-height: 1.3;
}

/* Narrative body */
.enc-body {
  padding: 16px 18px;
  border-bottom: 1px solid #2a1e0a;
  flex-shrink: 0;
}

.enc-body.enc-outcome--fail {
  border-left: 3px solid #c83020;
}

.enc-body.enc-outcome--success {
  border-left: 3px solid #40a060;
}

.enc-narrative {
  font-size: clamp(13px, 1.5vw, 15px);
  color: #ccc0a0;
  line-height: 1.6;
  margin: 0;
}

/* Options */
.enc-options {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  padding: 8px 0;
}

.enc-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 18px;
  min-height: 44px;
  background: transparent;
  border: none;
  border-left: 3px solid transparent;
  color: #d0c090;
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: clamp(13px, 1.4vw, 15px);
  text-align: left;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
  width: 100%;
  line-height: 1.4;
}

.enc-option:hover,
.enc-option:focus-visible {
  background: rgba(200, 160, 32, 0.08);
  border-left-color: #c8a020;
  color: #f0d880;
  outline: none;
}

.enc-option:focus-visible {
  box-shadow: inset 0 0 0 1px #c8a02055;
}

.enc-option--locked {
  cursor: default;
  pointer-events: none;
}

.enc-option--selected {
  background: rgba(200, 160, 32, 0.18) !important;
  border-left-color: #e8c040 !important;
  color: #ffe87a !important;
}

@keyframes enc-shake {
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-5px); }
  40%  { transform: translateX(5px); }
  60%  { transform: translateX(-4px); }
  80%  { transform: translateX(4px); }
  100% { transform: translateX(0); }
}

.enc-option--shake {
  animation: enc-shake 0.35s ease-in-out;
}

.enc-option-num {
  color: #7a6a3a;
  font-size: 12px;
  flex-shrink: 0;
  margin-top: 1px;
  min-width: 24px;
  font-weight: bold;
}

.enc-option-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}

.enc-option-text {
  display: block;
}

.enc-option-reqs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 3px;
}

.enc-req-tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 2px;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.enc-req-tag--met {
  background: rgba(64, 160, 96, 0.15);
  border: 1px solid #40a06060;
  color: #70c880;
}

.enc-req-tag--fail {
  background: rgba(200, 48, 32, 0.12);
  border: 1px solid #c8302060;
  color: #e06050;
}

.enc-option-roll-hint {
  font-size: 10px;
  color: #7a8aa8;
  font-style: italic;
  margin-top: 2px;
}

/* Chosen recap in result phase */
.enc-chosen-recap {
  padding: 8px 18px;
  font-size: 12px;
  color: #7a6a4a;
  font-style: italic;
  border-bottom: 1px solid #1e1508;
  flex-shrink: 0;
}

/* Roll result */
.enc-roll-result {
  padding: 8px 18px;
  font-size: 13px;
  color: #aaa8a0;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid #1e1508;
  flex-shrink: 0;
  font-family: 'Courier New', monospace;
}

.enc-roll-num {
  font-size: 16px;
  font-weight: bold;
  color: #e8d080;
}

.enc-roll-success {
  color: #60c870;
  font-weight: bold;
}

.enc-roll-fail {
  color: #e05840;
  font-weight: bold;
}

/* Continue button */
.enc-continue-row {
  padding: 14px 18px 10px;
  border-top: 1px solid #2a1e0a;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

.enc-continue-btn {
  min-width: 120px;
}

/* Keyboard hint */
.enc-hint {
  padding: 6px 18px 12px;
  font-size: 10px;
  color: #504030;
  text-align: right;
  flex-shrink: 0;
}

.enc-hint kbd {
  font-size: 9px;
  padding: 1px 4px;
  background: #1a1410;
  border: 1px solid #4a3a1a;
  border-radius: 2px;
  font-family: 'Courier New', monospace;
  color: #7a6a4a;
}

/* Scrollbar inside options list */
.enc-options::-webkit-scrollbar {
  width: 4px;
}
.enc-options::-webkit-scrollbar-track {
  background: transparent;
}
.enc-options::-webkit-scrollbar-thumb {
  background: #3a2a10;
  border-radius: 2px;
}

/* ── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 767px) {
  .enc-header { padding: 10px 14px; gap: 8px; }
  .enc-body   { padding: 12px 14px; }
  .enc-option { padding: 10px 14px; font-size: 13px; }
  .enc-hint   { padding: 5px 14px 10px; }
  .enc-continue-row { padding: 10px 14px; }
  .enc-title  { font-size: 15px; }
}
`,A=new W,p=32,f=40,y=30,z=3,R=8,M=160,L=120,q=12,j={ocean:"water",frozen_sea:"water",tundra:"snow",taiga:"forest",forest:"forest",plains:"grass",desert:"sand",jungle:"forest",mountain:"mountain",volcanic:"mountain",archipelago:"sand"},X={grass:4880938,forest:2775578,mountain:8022618,water:1718876,sand:13150810,snow:15263984,road:9075290},Z={grass:660480,forest:528394,mountain:1051656,water:266272,sand:1576968,snow:526344,road:788488};class oe{async init({renderer:e,regionId:t}={}){if(this._renderer=e,this._regionId=t??l.currentRegionId??0,this._panel=null,this._tileContainer=null,this._fogTileContainer=null,this._partyContainer=null,this._minimapContainer=null,this._minimapGfx=null,this._camera={x:0,y:0},this._partyX=l.partyPosition.x,this._partyY=l.partyPosition.y,this._moveAccum={x:0,y:0},this._ticker=null,this._resizeUnsub=null,this._fogUpdateUnsub=null,this._fogDirty=!0,this._encounterActive=!1,this._distanceSinceCheck=0,this._encounterCooldown=0,this._prevTileX=null,this._prevTileY=null,window.__debug=window.__debug??{},window.__debug.currentScene="localMap",window.__debug.getLocalMap=()=>({regionId:this._regionId,gridW:f,gridH:y,partyX:Math.floor(this._partyX),partyY:Math.floor(this._partyY),tileCount:this._tiles?this._tiles.length:0}),!l.world){u.error("[world] LocalMapScene: no world data"),k.transition("worldMap");return}l.currentRegionId=this._regionId,l.currentLocalMapId=this._regionId,l.exploreRegion(this._regionId),this._tiles=this._getOrGenerateLocalMap(),this._buildPixiTiles(),this._buildPixiParty(),this._buildMinimap(),this._buildHTMLPanel(),window.__settings?.fogOfWar&&l.revealAround(Math.floor(this._partyX),Math.floor(this._partyY),R),this._fogDirty=!0,this._ticker=n=>this._update(n.deltaMS),this._renderer.app.ticker.add(this._ticker),this._resizeUnsub=T.on("renderer:resize",()=>this._onResize()),this._fogUpdateUnsub=T.on("fog:update",()=>{this._fogDirty=!0}),G.init(),this._showOnboardingHint(),this._buildMobileDpad(),this._updatePartyPosition(),this._updateCamera(),window.__worldState=l,u.info(`[world] LocalMapScene initialized; regionId=${this._regionId} tiles=${this._tiles.length}`)}_getOrGenerateLocalMap(){const e=l.getLocalMap(this._regionId);if(e)return e.tiles;const t=l.world.regions.find(c=>c.id===this._regionId),n=t?.biome??"plains",i=j[n]??"grass",r=(l.world.seed^this._regionId*1514109713)>>>0;B(r);const o=K(r),s=[],a=.12;for(let c=0;c<y;c++)for(let d=0;d<f;d++){const m=F(d*a,c*a,4,.5,2);let h=i;i==="grass"?m>.72?h="forest":m<.18&&(h="water"):i==="forest"?m>.78?h="mountain":m<.15&&(h="grass"):i==="mountain"?m<.25?h="grass":m<.4&&(h="forest"):i==="snow"?m>.7&&(h="mountain"):i==="sand"&&(m<.15?h="water":m>.8&&(h="grass"));const _=X[h]??4473924,x=Z[h]??526344,v=o.nextInt(0,3);let w=_;if(v===0){const C=x>>16&255,b=x>>8&255,I=x&255,$=_>>16&255,P=_>>8&255,S=_&255;w=Math.min(255,$+C)<<16|Math.min(255,P+b)<<8|Math.min(255,S+I)}else if(v===1){const C=x>>16&255,b=x>>8&255,I=x&255,$=_>>16&255,P=_>>8&255,S=_&255;w=Math.max(0,$-C)<<16|Math.max(0,P-b)<<8|Math.max(0,S-I)}s.push({x:d,y:c,type:h,color:w,passable:h!=="water"&&h!=="mountain"})}return this._addRoadTiles(s,t),l.setLocalMap(this._regionId,{tiles:s,gridW:f,gridH:y}),s}_addRoadTiles(e,t){if(!t||!l.world.spellroads)return;const n=l.world,i=t.centerX/n.gridW,r=t.centerY/n.gridH;for(const o of n.spellroads)if(o.find(a=>{const c=a.x-i,d=a.y-r;return Math.sqrt(c*c+d*d)<.15})){for(let a=0;a<f;a++){const c=Math.floor(y/2)+Math.round(Math.sin(a*.3)*1.5);if(c>=0&&c<y){const d=e[c*f+a];d&&d.type!=="water"&&(d.type="road",d.color=X.road,d.passable=!0)}}break}}_buildPixiTiles(){const e=this._renderer.layers.world;this._tileContainer=new E,this._tileContainer.label="localTiles",e.addChild(this._tileContainer);const t=new Map;for(const n of this._tiles)t.has(n.color)||t.set(n.color,[]),t.get(n.color).push(n);for(const[n,i]of t){const r=new g;for(const o of i)r.rect(o.x*p,o.y*p,p,p);r.fill({color:n}),this._tileContainer.addChild(r)}this._tileContainer.addChild(new g),this._fogTileContainer=new E,this._fogTileContainer.label="localFog",e.addChild(this._fogTileContainer)}_rebuildFogTiles(){if(!this._fogTileContainer)return;if(!window.__settings?.fogOfWar){this._fogTileContainer.removeChildren(),this._fogDirty=!1;return}this._fogTileContainer.removeChildren();const e=new g,t=new g;for(let n=0;n<y;n++)for(let i=0;i<f;i++){const r=l.getFogAt(this._regionId,i,n);if(r===2)continue;const o=i*p,s=n*p;r===0?e.rect(o,s,p,p):t.rect(o,s,p,p)}e.fill({color:0,alpha:.9}),t.fill({color:0,alpha:.4}),this._fogTileContainer.addChild(e),this._fogTileContainer.addChild(t),this._fogDirty=!1}_buildPixiParty(){this._partyContainer=new E,this._partyContainer.label="partyToken",this._renderer.layers.entities.addChild(this._partyContainer),this._partyGfx=new g,this._partyContainer.addChild(this._partyGfx),this._drawPartyGfx()}_drawPartyGfx(){if(!this._partyGfx)return;this._partyGfx.clear();const e=0,t=0,n=10;this._partyGfx.circle(e,t,n+4),this._partyGfx.fill({color:16768256,alpha:.2}),this._partyGfx.circle(e,t,n),this._partyGfx.fill({color:16768256}),this._partyGfx.circle(e,t,n),this._partyGfx.stroke({color:16777215,width:2}),this._partyGfx.moveTo(e-6,t),this._partyGfx.lineTo(e+6,t),this._partyGfx.moveTo(e,t-6),this._partyGfx.lineTo(e,t+6),this._partyGfx.stroke({color:16777215,width:1.5})}_updatePartyPosition(){if(!this._partyContainer)return;const e=Math.floor(this._partyX)*p+p/2,t=Math.floor(this._partyY)*p+p/2;this._partyContainer.x=e,this._partyContainer.y=t}_updateCamera(){const e=this._renderer.width,t=this._renderer.height,n=-(Math.floor(this._partyX)*p+p/2-e/2),i=-(Math.floor(this._partyY)*p+p/2-t/2);this._camera.x=n,this._camera.y=i,this._tileContainer&&(this._tileContainer.x=this._camera.x,this._tileContainer.y=this._camera.y),this._fogTileContainer&&(this._fogTileContainer.x=this._camera.x,this._fogTileContainer.y=this._camera.y)}_onResize(){this._updateCamera(),this._updateMinimap(),this._repositionMinimap()}_update(e){const t=e/1e3;if(this._encounterActive)return;const n=U.getState(0),i=n.moveAxis.x,r=n.moveAxis.y;let o=!1;if(i!==0||r!==0){const s=Math.sqrt(i*i+r*r),a=i/s,c=r/s,d=a*z*t,m=c*z*t,h=this._partyX+d,_=this._partyY+m,x=Math.max(0,Math.min(f-1,h)),v=Math.max(0,Math.min(y-1,_)),w=Math.floor(x),C=Math.floor(v),b=this._tiles[C*f+w];b&&b.passable&&(this._partyX=x,this._partyY=v,o=!0)}if(o){const s=Math.floor(this._partyX),a=Math.floor(this._partyY);if(l.partyPosition.x=s,l.partyPosition.y=a,window.__settings?.fogOfWar&&l.revealAround(s,a,R),this._fogDirty=!0,T.emit("local:partyMoved",{x:s,y:a}),s!==this._prevTileX||a!==this._prevTileY){this._prevTileX=s,this._prevTileY=a;const d=this._tiles[a*f+s];if(d?.type==="dungeon"){this._promptDungeonEntry(d);return}this._advanceTimeForTile(s,a),this._distanceSinceCheck+=1,this._encounterCooldown>0&&(this._encounterCooldown-=1),this._distanceSinceCheck>=3&&this._encounterCooldown<=0&&(this._distanceSinceCheck=0,this._checkForEncounter(s,a))}}this._updatePartyPosition(),this._updateCamera(),this._fogDirty&&(this._rebuildFogTiles(),this._updateMinimap())}_checkForEncounter(e,t){const n=window.__encounterSystem??null;if(!n?.checkMovementEncounter)return;const i=l.getRegion(this._regionId),r=this._tiles[t*f+e],o={x:e,y:t,regionId:this._regionId,biome:i?.biome??"plains",tileType:r?.type??"grass",partyGold:l.partyGold,isNight:this._checkIsNight()};let s=null;try{s=n.checkMovementEncounter(o)}catch(a){u.warn(`[encounter] checkMovementEncounter failed: ${a.message}`);return}if(s)if(u.event(`[encounter] Encounter triggered; type=${s.type} id=${s.id??"unknown"} tile=${e},${t}`),this._encounterCooldown=8,s.type==="combat"){const a=window.__partyChars??[],c=s.enemies??[];k.transition("combat",{partyChars:a,enemies:c,sourceEncounter:s})}else this._showEncounterDialog(s)}_showEncounterDialog(e){this._encounterActive=!0;const t=window.__partyChars??[];A.show(e,t,n=>{this._encounterActive=!1,n&&(u.event(`[encounter] Dialog resolved; passed=${n.passed??!1} success=${n.success??"n/a"}`),n.goldDelta!=null&&(l.partyGold=Math.max(0,(l.partyGold??0)+n.goldDelta),G.update()),T.emit("encounter:resolved",{encounter:e,result:n}))})}_promptDungeonEntry(e){if(document.getElementById("dungeon-entry-prompt"))return;this._encounterActive=!0;const n=e.dungeonType??"burial_mound",i=e.dungeonName??n.replace(/_/g," ").replace(/\b\w/g,a=>a.toUpperCase()),r=((l.world?.seed??12345)^e.x*31295+e.y*7033)>>>0,o=l.currentRegionLevel??1,s=document.createElement("div");s.id="dungeon-entry-prompt",s.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(8, 6, 4, 0.96);
      border: 1px solid #c8a020;
      border-radius: 5px;
      padding: 24px 32px;
      color: #ddccaa;
      font-family: Georgia, 'Times New Roman', serif;
      z-index: 350;
      text-align: center;
      min-width: 280px;
      max-width: min(420px, 90vw);
    `,s.innerHTML=`
      <div style="font-size: clamp(14px,1.5vw,18px); font-weight:bold; color:#c8a020; margin-bottom:10px;">
        ${i}
      </div>
      <div style="font-size: clamp(11px,1.1vw,13px); color:#9a8a6a; margin-bottom:16px;">
        A dungeon entrance lies before you.<br>Do you wish to enter?
      </div>
      <div style="display:flex; gap:10px; justify-content:center;">
        <button id="btn-dungeon-yes" style="
          background:#1a1208; border:1px solid #c8a020; color:#c8a020;
          padding:8px 24px; cursor:pointer; font-size:clamp(12px,1.2vw,14px);
          font-family:Georgia,serif; border-radius:3px;
        ">Enter</button>
        <button id="btn-dungeon-no" style="
          background:#1a1208; border:1px solid #5a4a2a; color:#aaa;
          padding:8px 24px; cursor:pointer; font-size:clamp(12px,1.2vw,14px);
          font-family:Georgia,serif; border-radius:3px;
        ">Leave</button>
      </div>
    `,document.body.appendChild(s),document.getElementById("btn-dungeon-yes")?.addEventListener("click",()=>{s.remove(),u.event(`[dungeon] Party entering dungeon; type=${n} seed=${r}`),k.transition("dungeon",{dungeonType:n,regionLevel:o,seed:r})}),document.getElementById("btn-dungeon-no")?.addEventListener("click",()=>{s.remove(),this._encounterActive=!1,u.info("[dungeon] Party declined dungeon entry")})}_advanceTimeForTile(e,t){const n=window.__timeSystem??null;if(!n?.advanceTime)return;const r=this._tiles[t*f+e]?.type??"grass";let o=1;try{n.getMoveCost&&(o=n.getMoveCost(r)),n.advanceTime(o)}catch(s){u.warn(`[encounter] TimeSystem.advanceTime failed: ${s.message}`)}}_checkIsNight(){try{if(window.__timeSystem?.isNight)return window.__timeSystem.isNight()}catch{}return!1}_buildMinimap(){const e=this._renderer.layers.hud;this._minimapContainer=new E,this._minimapContainer.label="minimapContainer",e.addChild(this._minimapContainer);const t=new g;t.rect(0,0,M,L),t.fill({color:0,alpha:.75}),t.rect(0,0,M,L),t.stroke({color:5917226,width:1}),this._minimapContainer.addChild(t),this._minimapGfx=new g,this._minimapContainer.addChild(this._minimapGfx),this._minimapPartyGfx=new g,this._minimapContainer.addChild(this._minimapPartyGfx),this._repositionMinimap(),this._updateMinimap()}_repositionMinimap(){if(!this._minimapContainer)return;const e=this._renderer.width,t=this._renderer.height;this._minimapContainer.x=e-M-q,this._minimapContainer.y=t-L-q}_updateMinimap(){if(!this._minimapGfx||!this._tiles)return;const e=M/f,t=L/y;this._minimapGfx.clear();for(const n of this._tiles){const i=l.getFogAt(this._regionId,n.x,n.y),r=n.x*e,o=n.y*t,s=Math.ceil(e),a=Math.ceil(t);if(i===0)this._minimapGfx.rect(r,o,s,a),this._minimapGfx.fill({color:0});else{this._minimapGfx.rect(r,o,s,a);const c=i===1?.5:1;this._minimapGfx.fill({color:n.color,alpha:c})}}if(this._minimapPartyGfx){this._minimapPartyGfx.clear();const n=Math.floor(this._partyX)*e+e/2,i=Math.floor(this._partyY)*t+t/2;this._minimapPartyGfx.circle(n,i,2.5),this._minimapPartyGfx.fill({color:16768256})}}_buildMobileDpad(){if(!("ontouchstart"in window)&&!navigator.maxTouchPoints)return;const e=document.getElementById("local-map-dpad");e&&e.remove();const t=document.createElement("div");t.id="local-map-dpad",t.style.cssText=`
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 120px;
      height: 120px;
      z-index: 200;
      pointer-events: auto;
      opacity: 0.75;
      user-select: none;
    `;const n=[{id:"up",label:"▲",top:"0",left:"40px",dx:0,dy:-1},{id:"down",label:"▼",top:"80px",left:"40px",dx:0,dy:1},{id:"left",label:"◀",top:"40px",left:"0",dx:-1,dy:0},{id:"right",label:"▶",top:"40px",left:"80px",dx:1,dy:0}];for(const i of n){const r=document.createElement("button");r.textContent=i.label,r.style.cssText=`
        position: absolute;
        top: ${i.top};
        left: ${i.left};
        width: 40px;
        height: 40px;
        background: rgba(20, 15, 8, 0.85);
        border: 1px solid #5a4a2a;
        color: #ddccaa;
        font-size: 16px;
        border-radius: 4px;
        cursor: pointer;
        touch-action: none;
        display: flex;
        align-items: center;
        justify-content: center;
      `,r.addEventListener("pointerdown",o=>{o.preventDefault(),H(()=>import("./main-C9yvU6FC.js").then(s=>s.aH),__vite__mapDeps([0,1]),import.meta.url).then(s=>{s.default._states[0].moveAxis.x=i.dx,s.default._states[0].moveAxis.y=i.dy})}),r.addEventListener("pointerup",()=>{H(()=>import("./main-C9yvU6FC.js").then(o=>o.aH),__vite__mapDeps([0,1]),import.meta.url).then(o=>{o.default._states[0].moveAxis.x=0,o.default._states[0].moveAxis.y=0})}),r.addEventListener("pointerleave",()=>{H(()=>import("./main-C9yvU6FC.js").then(o=>o.aH),__vite__mapDeps([0,1]),import.meta.url).then(o=>{o.default._states[0].moveAxis.x=0,o.default._states[0].moveAxis.y=0})}),t.appendChild(r)}document.body.appendChild(t),this._dpadEl=t}_buildHTMLPanel(){const e=document.getElementById("panel-local-map-hud");e&&e.remove();const t=document.createElement("div");t.id="panel-local-map-hud",t.style.cssText=`
      position: fixed;
      top: 12px;
      right: 12px;
      background: rgba(12, 8, 4, 0.80);
      border: 1px solid #5a4a2a;
      border-radius: 4px;
      padding: 8px 12px;
      color: #ddccaa;
      font-family: serif;
      font-size: 12px;
      z-index: 100;
      pointer-events: auto;
      min-width: 160px;
      text-align: right;
    `;const i=l.world?.regions.find(r=>r.id===this._regionId);t.innerHTML=`
      <div style="font-size:13px; font-weight:bold; color:#e8d8a0; margin-bottom:3px;">
        ${i?.name??"Unknown"}
      </div>
      <div style="font-size:11px; color:#9a8a6a; margin-bottom:6px;">
        Level ${i?.level??"?"} &nbsp;|&nbsp; ${(i?.biome??"unknown").replace("_"," ")}
      </div>
      <div id="local-hud-time" style="font-size:10px; color:#7a6a4a; margin-bottom:6px;">Time: Dawn</div>
      <button id="btn-local-world-map" style="
        background:#1a1208; border:1px solid #5a4a2a; color:#aaa;
        padding:4px 8px; cursor:pointer; font-size:11px; font-family:serif;
        border-radius:3px; width:100%;
      ">World Map</button>
    `,document.body.appendChild(t),this._panel=t,document.getElementById("btn-local-world-map")?.addEventListener("click",()=>{k.transition("worldMap")})}_removeHTMLPanel(){this._panel&&(this._panel.remove(),this._panel=null)}_showOnboardingHint(){const e=document.getElementById("local-map-onboarding-hint");e&&e.remove();const t=document.createElement("div");t.id="local-map-onboarding-hint",t.style.cssText=`
      position: fixed;
      bottom: clamp(24px, 5vh, 48px);
      left: 50%;
      transform: translateX(-50%);
      background: rgba(10, 8, 8, 0.88);
      border: 1px solid #c8a020;
      border-radius: 5px;
      padding: 14px 28px;
      text-align: center;
      font-family: Georgia, 'Times New Roman', serif;
      pointer-events: none;
      z-index: 200;
      opacity: 1;
      transition: opacity 0.5s ease;
      min-width: 280px;
      max-width: min(420px, 90vw);
    `,t.innerHTML=`
      <div style="
        font-size: clamp(15px, 1.6vw, 18px);
        font-weight: bold;
        color: #c8a020;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin-bottom: 10px;
      ">Adventure begins!</div>
      <div style="
        font-size: clamp(11px, 1.2vw, 13px);
        color: #e8d5b0;
        line-height: 1.8;
      ">
        WASD / Arrow Keys &mdash; Move party<br>
        Enter towns to rest and trade<br>
        <span style="color: #a09070; font-size: 0.92em;">Press any key to dismiss</span>
      </div>
    `,document.body.appendChild(t),this._hintEl=t,this._hintTimer=setTimeout(()=>this._dismissHint(),5e3),this._hintKeyListener=()=>this._dismissHint(),window.addEventListener("keydown",this._hintKeyListener)}_dismissHint(){if(!this._hintEl)return;this._hintTimer&&(clearTimeout(this._hintTimer),this._hintTimer=null),this._hintKeyListener&&(window.removeEventListener("keydown",this._hintKeyListener),this._hintKeyListener=null);const e=this._hintEl;this._hintEl=null,e.style.opacity="0",setTimeout(()=>{e.parentNode&&e.remove()},500)}async destroy(){this._ticker&&this._renderer?.app?.ticker&&(this._renderer.app.ticker.remove(this._ticker),this._ticker=null),this._tileContainer&&(this._renderer.layers.world.removeChild(this._tileContainer),this._tileContainer.destroy({children:!0}),this._tileContainer=null),this._fogTileContainer&&(this._renderer.layers.world.removeChild(this._fogTileContainer),this._fogTileContainer.destroy({children:!0}),this._fogTileContainer=null),this._partyContainer&&(this._renderer.layers.entities.removeChild(this._partyContainer),this._partyContainer.destroy({children:!0}),this._partyContainer=null),this._minimapContainer&&(this._renderer.layers.hud.removeChild(this._minimapContainer),this._minimapContainer.destroy({children:!0}),this._minimapContainer=null),this._removeHTMLPanel(),this._dpadEl&&(this._dpadEl.remove(),this._dpadEl=null),this._hintEl&&(this._hintEl.remove(),this._hintEl=null),this._hintTimer&&(clearTimeout(this._hintTimer),this._hintTimer=null),this._hintKeyListener&&(window.removeEventListener("keydown",this._hintKeyListener),this._hintKeyListener=null),G.destroy(),A.isVisible()&&A.hide();const e=document.getElementById("dungeon-entry-prompt");e&&e.remove(),this._resizeUnsub&&(this._resizeUnsub(),this._resizeUnsub=null),this._fogUpdateUnsub&&(this._fogUpdateUnsub(),this._fogUpdateUnsub=null),u.info("[world] LocalMapScene destroyed")}}export{oe as default};
//# sourceMappingURL=LocalMapScene-DdIkK2OB.js.map
