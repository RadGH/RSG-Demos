import{U as N,D as f,W as l,S as k,E as T,C as M,d as Y}from"./main-CnIArb1R.js";import{s as U,n as B}from"./Noise-Cgm4OGP4.js";import{c as F}from"./RNG-ziO0lLz6.js";import{H}from"./HUDPanel-CKPyNWkR.js";import{G as b}from"./Graphics-CAo7vXil.js";const z={might:"Might",agility:"Agility",wit:"Wit",presence:"Presence",endurance:"Endurance",attunement:"Attunement"},O={dialog:{label:"Encounter",color:"#c8a020"},combat:{label:"Ambush",color:"#c83020"},merchant:{label:"Traveler",color:"#4a9a4a"},shrine:{label:"Shrine",color:"#7a5aba"},discovery:{label:"Discovery",color:"#2a8aaa"},rest:{label:"Rest Site",color:"#4a7a4a"},trap:{label:"Danger",color:"#c83020"},default:{label:"Encounter",color:"#c8a020"}};class K extends N{constructor(){super("panel-encounter-dialog",{trapFocus:!0,zLayer:"modal"}),this._encounter=null,this._partyChars=null,this._onComplete=null,this._inResultPhase=!1,this._chosenIndex=null,this._keyHandler=e=>this._onKeydown(e)}show(e,t,n){this._encounter=e,this._partyChars=t??[],this._onComplete=n??null,this._inResultPhase=!1,this._chosenIndex=null,this._renderEncounter(),this._addDarkOverlay(),window.addEventListener("keydown",this._keyHandler),super.show(),this._focusFirstOption(),f.event(`[encounter] Dialog shown; id=${e?.id??"unknown"} title="${e?.title??""}" options=${e?.options?.length??0}`)}hide(){window.removeEventListener("keydown",this._keyHandler),this._removeDarkOverlay(),super.hide(),this._encounter=null,this._partyChars=null,this._onComplete=null}_renderEncounter(){const e=this._encounter;if(!e)return;const t=O[e.type]??O.default,n=e.options??[],i=n.map((r,s)=>this._renderOption(r,s)).join("");this.el.innerHTML=`
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
    `,this._applyDialogStyles(),this._attachOptionHandlers()}_renderOption(e,t){const{met:n,requirementHTML:i}=this._checkRequirements(e),r=n?"":"enc-option--locked",s=n?"":"opacity:0.5;",o=`[${t+1}]`;let a="";if(e.check){const c=e.check.dc??"?";a=`
        <span class="enc-option-roll-hint">${z[e.check.attribute]??e.check.attribute??"Skill"} check — DC ${c}</span>
      `}return`
      <button
        class="enc-option ${r}"
        data-option-index="${t}"
        style="${s}"
        ${n?"":'aria-disabled="true"'}
        tabindex="${n?"0":"-1"}"
        aria-label="Option ${t+1}: ${this._escHtml(e.text??"")}"
      >
        <span class="enc-option-num">${o}</span>
        <span class="enc-option-content">
          <span class="enc-option-text">${this._escHtml(e.text??"")}</span>
          ${i}
          ${a}
        </span>
      </button>
    `}_checkRequirements(e){if(!e.requires)return{met:!0,requirementHTML:""};const t=Array.isArray(e.requires)?e.requires:[e.requires],n=[];let i=!0;for(const s of t)if(s.gold!=null){const o=this._partyHasGold(s.gold);n.push({label:`${s.gold} gold`,met:o}),o||(i=!1)}else if(s.attribute){const o=s.attribute,a=s.value??10,c=this._partyHasStat(o,a),d=z[o]??o;n.push({label:`${d} ${a}+`,met:c}),c||(i=!1)}else if(s.item){const o=this._partyHasItem(s.item);n.push({label:s.item,met:o}),o||(i=!1)}else s.tag&&n.push({label:s.tag,met:!0});const r=n.map(s=>`
      <span class="enc-req-tag ${s.met?"enc-req-tag--met":"enc-req-tag--fail"}">
        ${this._escHtml(s.label)}
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
    `,this._applyDialogStyles();const s=document.getElementById("enc-btn-continue");s&&(s.addEventListener("click",()=>this._finish(e)),s.focus()),f.event(`[encounter] Result shown; option=${this._chosenIndex} roll=${e?.roll??"n/a"} success=${e?.success??"n/a"}`)}_selectOption(e){const t=this._encounter;if(!t||this._inResultPhase)return;const n=t.options??[];if(e<0||e>=n.length)return;const i=n[e],{met:r}=this._checkRequirements(i);if(!r){f.info(`[encounter] Option ${e} locked — requirements not met`),this._shakeOption(e);return}this._chosenIndex=e;const s=this.el.querySelectorAll(".enc-option");s[e]&&s[e].classList.add("enc-option--selected");const o=this._resolveOption(t,e);setTimeout(()=>this._renderResult(o),180)}_resolveOption(e,t){try{if(window.__encounterSystem?.resolveOption)return window.__encounterSystem.resolveOption(e,t,this._partyChars)}catch(r){f.warn(`[encounter] EncounterSystem.resolveOption failed: ${r.message}`)}const n=e?.options?.[t],i=n?.outcomes??n?.outcome;return Array.isArray(i)&&i.length>0?i[Math.floor(Math.random()*i.length)]:i&&typeof i=="object"?i:{text:n?.resultText??"The encounter resolves without incident.",success:!0}}_finish(e){const t=this._onComplete;this.hide(),t&&t(e)}_onKeydown(e){if(!this._visible)return;if(this._inResultPhase){(e.key==="Enter"||e.key==="Escape")&&(e.preventDefault(),this._finish(null));return}const t=e.key.match(/^([1-9])$/);if(t){e.preventDefault(),this._selectOption(parseInt(t[1],10)-1);return}e.key==="Escape"&&(e.preventDefault(),this._finish({text:"You pass by without engaging.",passed:!0}))}_attachOptionHandlers(){this.el.querySelectorAll(".enc-option").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.dataset.optionIndex,10);this._selectOption(n)})})}_focusFirstOption(){const e=this.el.querySelector(".enc-option:not(.enc-option--locked)");e&&e.focus()}_shakeOption(e){const n=this.el.querySelectorAll(".enc-option")[e];n&&(n.classList.add("enc-option--shake"),setTimeout(()=>n.classList.remove("enc-option--shake"),400))}_addDarkOverlay(){let e=document.getElementById("enc-dark-overlay");e||(e=document.createElement("div"),e.id="enc-dark-overlay",e.style.cssText=`
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        z-index: 299;
        pointer-events: all;
      `,document.body.appendChild(e)),e.style.display="block"}_removeDarkOverlay(){const e=document.getElementById("enc-dark-overlay");e&&(e.style.display="none")}_partyHasGold(e){try{const t=window.__worldState;if(t)return(t.partyGold??0)>=e}catch{}return!0}_partyHasStat(e,t){return!this._partyChars||this._partyChars.length===0?!1:this._partyChars.some(n=>(n?.attributes?.[e]??n?.stats?.[e]??0)>=t)}_partyHasItem(e){return!this._partyChars||this._partyChars.length===0?!1:this._partyChars.some(t=>(t?.inventory??[]).some(i=>i.id===e||i.itemId===e))}_escHtml(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}_applyDialogStyles(){if(Object.assign(this.el.style,{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"min(600px, 92vw)",maxHeight:"88vh",overflow:"hidden",display:"flex",flexDirection:"column",zIndex:"300",border:"1px solid #7a5a20",borderRadius:"6px",boxShadow:"0 0 60px rgba(0,0,0,0.9), 0 0 20px rgba(180,130,0,0.15)",background:"transparent",pointerEvents:"all"}),!document.getElementById("enc-dialog-styles")){const e=document.createElement("style");e.id="enc-dialog-styles",e.textContent=W,document.head.appendChild(e)}}}const W=`
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
`,P=new K,h=32,u=40,y=30,A=3,D=8,E=160,L=120,R=12,j={ocean:"water",frozen_sea:"water",tundra:"snow",taiga:"forest",forest:"forest",plains:"grass",desert:"sand",jungle:"forest",mountain:"mountain",volcanic:"mountain",archipelago:"sand"},q={grass:4880938,forest:2775578,mountain:8022618,water:1718876,sand:13150810,snow:15263984,road:9075290},V={grass:660480,forest:528394,mountain:1051656,water:266272,sand:1576968,snow:526344,road:788488};class ne{async init({renderer:e,regionId:t}={}){if(this._renderer=e,this._regionId=t??l.currentRegionId??0,this._panel=null,this._tileContainer=null,this._fogTileContainer=null,this._partyContainer=null,this._minimapContainer=null,this._minimapGfx=null,this._camera={x:0,y:0},this._partyX=l.partyPosition.x,this._partyY=l.partyPosition.y,this._moveAccum={x:0,y:0},this._ticker=null,this._resizeUnsub=null,this._fogUpdateUnsub=null,this._fogDirty=!0,this._encounterActive=!1,this._distanceSinceCheck=0,this._encounterCooldown=0,this._prevTileX=null,this._prevTileY=null,window.__debug=window.__debug??{},window.__debug.currentScene="localMap",window.__debug.getLocalMap=()=>({regionId:this._regionId,gridW:u,gridH:y,partyX:Math.floor(this._partyX),partyY:Math.floor(this._partyY),tileCount:this._tiles?this._tiles.length:0}),!l.world){f.error("[world] LocalMapScene: no world data"),k.transition("worldMap");return}l.currentRegionId=this._regionId,l.currentLocalMapId=this._regionId,l.exploreRegion(this._regionId),this._tiles=this._getOrGenerateLocalMap(),this._buildPixiTiles(),this._buildPixiParty(),this._buildMinimap(),this._buildHTMLPanel(),window.__settings?.fogOfWar&&l.revealAround(Math.floor(this._partyX),Math.floor(this._partyY),D),this._fogDirty=!0,this._ticker=n=>this._update(n.deltaMS),this._renderer.app.ticker.add(this._ticker),this._resizeUnsub=T.on("renderer:resize",()=>this._onResize()),this._fogUpdateUnsub=T.on("fog:update",()=>{this._fogDirty=!0}),H.init(),this._showOnboardingHint(),window.__worldState=l,f.info(`[world] LocalMapScene initialized; regionId=${this._regionId} tiles=${this._tiles.length}`)}_getOrGenerateLocalMap(){const e=l.getLocalMap(this._regionId);if(e)return e.tiles;const t=l.world.regions.find(c=>c.id===this._regionId),n=t?.biome??"plains",i=j[n]??"grass",r=(l.world.seed^this._regionId*1514109713)>>>0;U(r);const s=F(r),o=[],a=.12;for(let c=0;c<y;c++)for(let d=0;d<u;d++){const m=B(d*a,c*a,4,.5,2);let p=i;i==="grass"?m>.72?p="forest":m<.18&&(p="water"):i==="forest"?m>.78?p="mountain":m<.15&&(p="grass"):i==="mountain"?m<.25?p="grass":m<.4&&(p="forest"):i==="snow"?m>.7&&(p="mountain"):i==="sand"&&(m<.15?p="water":m>.8&&(p="grass"));const _=q[p]??4473924,g=V[p]??526344,v=s.nextInt(0,3);let w=_;if(v===0){const C=g>>16&255,x=g>>8&255,I=g&255,$=_>>16&255,S=_>>8&255,G=_&255;w=Math.min(255,$+C)<<16|Math.min(255,S+x)<<8|Math.min(255,G+I)}else if(v===1){const C=g>>16&255,x=g>>8&255,I=g&255,$=_>>16&255,S=_>>8&255,G=_&255;w=Math.max(0,$-C)<<16|Math.max(0,S-x)<<8|Math.max(0,G-I)}o.push({x:d,y:c,type:p,color:w,passable:p!=="water"&&p!=="mountain"})}return this._addRoadTiles(o,t),l.setLocalMap(this._regionId,{tiles:o,gridW:u,gridH:y}),o}_addRoadTiles(e,t){if(!t||!l.world.spellroads)return;const n=l.world,i=t.centerX/n.gridW,r=t.centerY/n.gridH;for(const s of n.spellroads)if(s.find(a=>{const c=a.x-i,d=a.y-r;return Math.sqrt(c*c+d*d)<.15})){for(let a=0;a<u;a++){const c=Math.floor(y/2)+Math.round(Math.sin(a*.3)*1.5);if(c>=0&&c<y){const d=e[c*u+a];d&&d.type!=="water"&&(d.type="road",d.color=q.road,d.passable=!0)}}break}}_buildPixiTiles(){const e=this._renderer.layers.world;this._tileContainer=new M,this._tileContainer.label="localTiles",e.addChild(this._tileContainer);const t=new b;for(const n of this._tiles){const i=n.x*h,r=n.y*h;t.rect(i,r,h,h),t.fill({color:n.color})}this._tileContainer.addChild(t),this._fogTileContainer=new M,this._fogTileContainer.label="localFog",e.addChild(this._fogTileContainer)}_rebuildFogTiles(){if(!this._fogTileContainer)return;if(!window.__settings?.fogOfWar){this._fogTileContainer.removeChildren(),this._fogDirty=!1;return}this._fogTileContainer.removeChildren();const e=new b;for(let t=0;t<y;t++)for(let n=0;n<u;n++){const i=l.getFogAt(this._regionId,n,t);if(i===2)continue;const r=n*h,s=t*h,o=i===0?.9:.4;e.rect(r,s,h,h),e.fill({color:0,alpha:o})}this._fogTileContainer.addChild(e),this._fogDirty=!1}_buildPixiParty(){this._partyContainer=new M,this._partyContainer.label="partyToken",this._renderer.layers.entities.addChild(this._partyContainer),this._partyGfx=new b,this._partyContainer.addChild(this._partyGfx),this._drawPartyGfx()}_drawPartyGfx(){if(!this._partyGfx)return;this._partyGfx.clear();const e=0,t=0,n=10;this._partyGfx.circle(e,t,n+4),this._partyGfx.fill({color:16768256,alpha:.2}),this._partyGfx.circle(e,t,n),this._partyGfx.fill({color:16768256}),this._partyGfx.circle(e,t,n),this._partyGfx.stroke({color:16777215,width:2}),this._partyGfx.moveTo(e-6,t),this._partyGfx.lineTo(e+6,t),this._partyGfx.moveTo(e,t-6),this._partyGfx.lineTo(e,t+6),this._partyGfx.stroke({color:16777215,width:1.5})}_updatePartyPosition(){if(!this._partyContainer)return;const e=Math.floor(this._partyX)*h+h/2,t=Math.floor(this._partyY)*h+h/2;this._partyContainer.x=e,this._partyContainer.y=t}_updateCamera(){const e=this._renderer.width,t=this._renderer.height,n=-(Math.floor(this._partyX)*h+h/2-e/2),i=-(Math.floor(this._partyY)*h+h/2-t/2);this._camera.x=n,this._camera.y=i,this._tileContainer&&(this._tileContainer.x=this._camera.x,this._tileContainer.y=this._camera.y),this._fogTileContainer&&(this._fogTileContainer.x=this._camera.x,this._fogTileContainer.y=this._camera.y)}_onResize(){this._updateCamera(),this._updateMinimap(),this._repositionMinimap()}_update(e){const t=e/1e3;if(this._encounterActive)return;const n=Y.getState(0),i=n.moveAxis.x,r=n.moveAxis.y;let s=!1;if(i!==0||r!==0){const o=Math.sqrt(i*i+r*r),a=i/o,c=r/o,d=a*A*t,m=c*A*t,p=this._partyX+d,_=this._partyY+m,g=Math.max(0,Math.min(u-1,p)),v=Math.max(0,Math.min(y-1,_)),w=Math.floor(g),C=Math.floor(v),x=this._tiles[C*u+w];x&&x.passable&&(this._partyX=g,this._partyY=v,s=!0)}if(s){const o=Math.floor(this._partyX),a=Math.floor(this._partyY);if(l.partyPosition.x=o,l.partyPosition.y=a,window.__settings?.fogOfWar&&l.revealAround(o,a,D),this._fogDirty=!0,T.emit("local:partyMoved",{x:o,y:a}),o!==this._prevTileX||a!==this._prevTileY){this._prevTileX=o,this._prevTileY=a;const d=this._tiles[a*u+o];if(d?.type==="dungeon"){this._promptDungeonEntry(d);return}this._advanceTimeForTile(o,a),this._distanceSinceCheck+=1,this._encounterCooldown>0&&(this._encounterCooldown-=1),this._distanceSinceCheck>=3&&this._encounterCooldown<=0&&(this._distanceSinceCheck=0,this._checkForEncounter(o,a))}}this._updatePartyPosition(),this._updateCamera(),this._fogDirty&&(this._rebuildFogTiles(),this._updateMinimap())}_checkForEncounter(e,t){const n=window.__encounterSystem??null;if(!n?.checkMovementEncounter)return;const i=l.getRegion(this._regionId),r=this._tiles[t*u+e],s={x:e,y:t,regionId:this._regionId,biome:i?.biome??"plains",tileType:r?.type??"grass",partyGold:l.partyGold,isNight:this._checkIsNight()};let o=null;try{o=n.checkMovementEncounter(s)}catch(a){f.warn(`[encounter] checkMovementEncounter failed: ${a.message}`);return}if(o)if(f.event(`[encounter] Encounter triggered; type=${o.type} id=${o.id??"unknown"} tile=${e},${t}`),this._encounterCooldown=8,o.type==="combat"){const a=window.__partyChars??[],c=o.enemies??[];k.transition("combat",{partyChars:a,enemies:c,sourceEncounter:o})}else this._showEncounterDialog(o)}_showEncounterDialog(e){this._encounterActive=!0;const t=window.__partyChars??[];P.show(e,t,n=>{this._encounterActive=!1,n&&(f.event(`[encounter] Dialog resolved; passed=${n.passed??!1} success=${n.success??"n/a"}`),n.goldDelta!=null&&(l.partyGold=Math.max(0,(l.partyGold??0)+n.goldDelta),H.update()),T.emit("encounter:resolved",{encounter:e,result:n}))})}_promptDungeonEntry(e){if(document.getElementById("dungeon-entry-prompt"))return;this._encounterActive=!0;const n=e.dungeonType??"burial_mound",i=e.dungeonName??n.replace(/_/g," ").replace(/\b\w/g,a=>a.toUpperCase()),r=((l.world?.seed??12345)^e.x*31295+e.y*7033)>>>0,s=l.currentRegionLevel??1,o=document.createElement("div");o.id="dungeon-entry-prompt",o.style.cssText=`
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
    `,o.innerHTML=`
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
    `,document.body.appendChild(o),document.getElementById("btn-dungeon-yes")?.addEventListener("click",()=>{o.remove(),f.event(`[dungeon] Party entering dungeon; type=${n} seed=${r}`),k.transition("dungeon",{dungeonType:n,regionLevel:s,seed:r})}),document.getElementById("btn-dungeon-no")?.addEventListener("click",()=>{o.remove(),this._encounterActive=!1,f.info("[dungeon] Party declined dungeon entry")})}_advanceTimeForTile(e,t){const n=window.__timeSystem??null;if(!n?.advanceTime)return;const r=this._tiles[t*u+e]?.type??"grass";let s=1;try{n.getMoveCost&&(s=n.getMoveCost(r)),n.advanceTime(s)}catch(o){f.warn(`[encounter] TimeSystem.advanceTime failed: ${o.message}`)}}_checkIsNight(){try{if(window.__timeSystem?.isNight)return window.__timeSystem.isNight()}catch{}return!1}_buildMinimap(){const e=this._renderer.layers.hud;this._minimapContainer=new M,this._minimapContainer.label="minimapContainer",e.addChild(this._minimapContainer);const t=new b;t.rect(0,0,E,L),t.fill({color:0,alpha:.75}),t.rect(0,0,E,L),t.stroke({color:5917226,width:1}),this._minimapContainer.addChild(t),this._minimapGfx=new b,this._minimapContainer.addChild(this._minimapGfx),this._minimapPartyGfx=new b,this._minimapContainer.addChild(this._minimapPartyGfx),this._repositionMinimap(),this._updateMinimap()}_repositionMinimap(){if(!this._minimapContainer)return;const e=this._renderer.width,t=this._renderer.height;this._minimapContainer.x=e-E-R,this._minimapContainer.y=t-L-R}_updateMinimap(){if(!this._minimapGfx||!this._tiles)return;const e=E/u,t=L/y;this._minimapGfx.clear();for(const n of this._tiles){const i=l.getFogAt(this._regionId,n.x,n.y),r=n.x*e,s=n.y*t,o=Math.ceil(e),a=Math.ceil(t);if(i===0)this._minimapGfx.rect(r,s,o,a),this._minimapGfx.fill({color:0});else{this._minimapGfx.rect(r,s,o,a);const c=i===1?.5:1;this._minimapGfx.fill({color:n.color,alpha:c})}}if(this._minimapPartyGfx){this._minimapPartyGfx.clear();const n=Math.floor(this._partyX)*e+e/2,i=Math.floor(this._partyY)*t+t/2;this._minimapPartyGfx.circle(n,i,2.5),this._minimapPartyGfx.fill({color:16768256})}}_buildHTMLPanel(){const e=document.getElementById("panel-local-map-hud");e&&e.remove();const t=document.createElement("div");t.id="panel-local-map-hud",t.style.cssText=`
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
      <button id="btn-local-region-map" style="
        background:#1a1208; border:1px solid #5a4a2a; color:#aaa;
        padding:4px 8px; cursor:pointer; font-size:11px; font-family:serif;
        border-radius:3px; width:100%;
      ">Region Map</button>
    `,document.body.appendChild(t),this._panel=t,document.getElementById("btn-local-region-map")?.addEventListener("click",()=>{k.transition("regionMap",{regionId:this._regionId})})}_removeHTMLPanel(){this._panel&&(this._panel.remove(),this._panel=null)}_showOnboardingHint(){const e=document.getElementById("local-map-onboarding-hint");e&&e.remove();const t=document.createElement("div");t.id="local-map-onboarding-hint",t.style.cssText=`
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
    `,document.body.appendChild(t),this._hintEl=t,this._hintTimer=setTimeout(()=>this._dismissHint(),5e3),this._hintKeyListener=()=>this._dismissHint(),window.addEventListener("keydown",this._hintKeyListener)}_dismissHint(){if(!this._hintEl)return;this._hintTimer&&(clearTimeout(this._hintTimer),this._hintTimer=null),this._hintKeyListener&&(window.removeEventListener("keydown",this._hintKeyListener),this._hintKeyListener=null);const e=this._hintEl;this._hintEl=null,e.style.opacity="0",setTimeout(()=>{e.parentNode&&e.remove()},500)}async destroy(){this._ticker&&this._renderer?.app?.ticker&&(this._renderer.app.ticker.remove(this._ticker),this._ticker=null),this._tileContainer&&(this._renderer.layers.world.removeChild(this._tileContainer),this._tileContainer.destroy({children:!0}),this._tileContainer=null),this._fogTileContainer&&(this._renderer.layers.world.removeChild(this._fogTileContainer),this._fogTileContainer.destroy({children:!0}),this._fogTileContainer=null),this._partyContainer&&(this._renderer.layers.entities.removeChild(this._partyContainer),this._partyContainer.destroy({children:!0}),this._partyContainer=null),this._minimapContainer&&(this._renderer.layers.hud.removeChild(this._minimapContainer),this._minimapContainer.destroy({children:!0}),this._minimapContainer=null),this._removeHTMLPanel(),this._hintEl&&(this._hintEl.remove(),this._hintEl=null),this._hintTimer&&(clearTimeout(this._hintTimer),this._hintTimer=null),this._hintKeyListener&&(window.removeEventListener("keydown",this._hintKeyListener),this._hintKeyListener=null),H.destroy(),P.isVisible()&&P.hide();const e=document.getElementById("dungeon-entry-prompt");e&&e.remove(),this._resizeUnsub&&(this._resizeUnsub(),this._resizeUnsub=null),this._fogUpdateUnsub&&(this._fogUpdateUnsub(),this._fogUpdateUnsub=null),f.info("[world] LocalMapScene destroyed")}}export{ne as default};
//# sourceMappingURL=LocalMapScene-Du79OBwP.js.map
