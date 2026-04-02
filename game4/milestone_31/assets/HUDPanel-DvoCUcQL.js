import{E as d,D as f,W as r}from"./main-C08doFuo.js";const C={grass:"#4a7a2a",forest:"#2a5a1a",mountain:"#7a6a5a",water:"#1a3a5c",sand:"#c8aa5a",snow:"#e8e8f0",road:"#8a7a5a"},H={poisoned:{dot:"🟢",label:"Poisoned"},burning:{dot:"🔴",label:"Burning"},frozen:{dot:"🔵",label:"Frozen"},stunned:{dot:"🟡",label:"Stunned"}},P={clear:"☀️",cloudy:"☁️",rainy:"🌧️",stormy:"⛈️",snow:"🌨️",foggy:"🌫️",hot:"🔥",blizzard:"❄️",windy:"💨",frozen:"❄️"};class E{constructor(){this._el=null,this._intervalId=null,this._active=!1,this._formatTime=null,this._isNight=null,this._heading=0,this._weatherUnsub=null,this._movedUnsub=null,this._builtUnsub=null,this._hpUnsub=null,this._combatStateUnsub=null,this._goldUnsub=null,this._minimapVisible=!0,this._minimapKeyFn=null}init(t={}){this.destroy(),this._formatTime=t.formatTime??this._getTimeFn("formatTime"),this._isNight=t.isNight??this._getTimeFn("isNight"),this._buildDOM(),this.update(),this._intervalId=setInterval(()=>this.update(),1e3),this._active=!0,this._weatherUnsub=d.on("weather:changed",i=>{this._updateWeatherDisplay(i)}),this._movedUnsub=d.on("local:partyMoved",()=>{this._drawHUDMinimap()}),this._builtUnsub=d.on("localmap:built",()=>{this._drawHUDMinimap()}),this._hpUnsub=d.on("party:hpChanged",()=>{this._updatePartyCards()}),this._combatStateUnsub=d.on("combat:stateChanged",()=>{this._updatePartyCards()}),this._goldUnsub=d.on("party:goldChanged",()=>{this._animateGold()});const e=localStorage.getItem("hud_minimap_visible");this._minimapVisible=e===null?!0:e==="true",this._minimapKeyFn=i=>{(i.key==="m"||i.key==="M")&&this._toggleMinimap()},window.addEventListener("keydown",this._minimapKeyFn),this._syncWeatherDisplay(),this._drawHUDMinimap(),this._updatePartyCards(),this._applyMinimapVisibility(),f.info("[debug] HUDPanel initialized")}update(){if(!this._el)return;const t=this._el.querySelector("#hud-time"),e=this._el.querySelector("#hud-gold"),i=this._el.querySelector("#hud-rations"),a=this._el.querySelector("#hud-night-indicator"),s=this._getFormattedTime(),o=this._checkIsNight(),l=r.partyGold??0,n=r.rationPoints??0;t&&(t.textContent=s),e&&(e.textContent=`${l}g`),i&&(i.textContent=`${n} rations`,i.classList.toggle("hud-rations-low",n<=5)),a&&(a.style.display=o?"inline-block":"none"),document.body.classList.toggle("hud-night-mode",o)}destroy(){this._intervalId!=null&&(clearInterval(this._intervalId),this._intervalId=null),this._weatherUnsub&&(this._weatherUnsub(),this._weatherUnsub=null),this._movedUnsub&&(this._movedUnsub(),this._movedUnsub=null),this._builtUnsub&&(this._builtUnsub(),this._builtUnsub=null),this._hpUnsub&&(this._hpUnsub(),this._hpUnsub=null),this._combatStateUnsub&&(this._combatStateUnsub(),this._combatStateUnsub=null),this._goldUnsub&&(this._goldUnsub(),this._goldUnsub=null),this._minimapKeyFn&&(window.removeEventListener("keydown",this._minimapKeyFn),this._minimapKeyFn=null),this._el&&(this._el.remove(),this._el=null),document.body.classList.remove("hud-night-mode"),this._active=!1,f.info("[debug] HUDPanel destroyed")}setHeading(t){this._heading=t%360;const e=this._el?.querySelector(".hud-compass-needle");e&&(e.style.transform=`rotate(${this._heading}deg)`)}_syncWeatherDisplay(){try{const t=window.__weatherSystem;t&&this._updateWeatherDisplay(t.getCurrentWeather())}catch{}}_updateWeatherDisplay(t){const e=this._el?.querySelector("#hud-weather");if(!e||!t)return;const i=P[t.weather]??"☀️",a=s=>s?s.charAt(0).toUpperCase()+s.slice(1):"";e.textContent=`${i} ${a(t.season)}`}_buildDOM(){document.getElementById("hud-panel-root")?.remove();const t=document.createElement("div");if(t.id="hud-panel-root",t.setAttribute("aria-hidden","true"),t.innerHTML=`
      <div id="hud-top-bar">

        <!-- Top-left: in-game time -->
        <div id="hud-top-left" class="hud-block hud-time-block">
          <span class="hud-label">Time</span>
          <span id="hud-time" class="hud-value">--:--</span>
          <span id="hud-night-indicator" class="hud-night-star" style="display:none;" title="Night">&#9733;</span>
        </div>

        <!-- Top-center: compass rose -->
        <div id="hud-top-center" class="hud-block hud-compass-block">
          <div class="hud-compass" title="Compass">
            <svg class="hud-compass-svg" viewBox="0 0 40 40" width="36" height="36"
                 aria-hidden="true" focusable="false">
              <!-- Compass ring -->
              <circle cx="20" cy="20" r="18" fill="none" stroke="#5a4a20" stroke-width="1"/>
              <!-- Cardinal tick marks -->
              <line x1="20" y1="3"  x2="20" y2="8"  stroke="#7a6a40" stroke-width="1.5"/>
              <line x1="20" y1="32" x2="20" y2="37" stroke="#5a4a30" stroke-width="1"/>
              <line x1="3"  y1="20" x2="8"  y2="20" stroke="#5a4a30" stroke-width="1"/>
              <line x1="32" y1="20" x2="37" y2="20" stroke="#5a4a30" stroke-width="1"/>
              <!-- N label -->
              <text x="20" y="14" text-anchor="middle" dominant-baseline="middle"
                    font-family="Georgia,serif" font-size="7" fill="#c8a020" font-weight="bold">N</text>
              <!-- Needle (rotated by heading via style) -->
              <g class="hud-compass-needle" style="transform-origin:20px 20px; transform:rotate(0deg)">
                <!-- North pointer (gold) -->
                <polygon points="20,6 17,20 20,18 23,20" fill="#c8a020" opacity="0.9"/>
                <!-- South pointer (dark) -->
                <polygon points="20,34 17,20 20,22 23,20" fill="#3a2a10" opacity="0.7"/>
              </g>
            </svg>
          </div>
        </div>

        <!-- Top-right: gold + rations -->
        <div id="hud-top-right" class="hud-block hud-resources-block">
          <div class="hud-resource-row">
            <span class="hud-resource-icon hud-icon-gold">&#9670;</span>
            <span id="hud-gold" class="hud-value hud-value--gold">0g</span>
          </div>
          <div class="hud-resource-row">
            <span class="hud-resource-icon hud-icon-rations">&#9670;</span>
            <span id="hud-rations" class="hud-value hud-value--rations">0 rations</span>
          </div>
          <div class="hud-resource-row">
            <div id="hud-weather" class="hud-weather">&#9728; Spring</div>
          </div>
        </div>

      </div>

      <!-- Bottom-left: party HP cards -->
      <div id="hud-party-bar"></div>

      <!-- Bottom-right: minimap canvas -->
      <div id="hud-minimap-wrap">
        <canvas id="hud-minimap" aria-label="Minimap"></canvas>
      </div>
    `,Object.assign(t.style,{position:"fixed",inset:"0",zIndex:"var(--z-hud, 100)",pointerEvents:"none",fontFamily:"'Georgia', 'Times New Roman', serif"}),document.body.appendChild(t),this._el=t,!document.getElementById("hud-panel-styles")){const e=document.createElement("style");e.id="hud-panel-styles",e.textContent=N,document.head.appendChild(e)}}_toggleMinimap(){this._minimapVisible=!this._minimapVisible,localStorage.setItem("hud_minimap_visible",String(this._minimapVisible)),this._applyMinimapVisibility()}_applyMinimapVisibility(){const t=this._el?.querySelector("#hud-minimap-wrap");t&&(t.style.display=this._minimapVisible?"block":"none")}_drawHUDMinimap(){const t=this._el?.querySelector("#hud-minimap");if(!t)return;const i=window.innerWidth<768?60:80,a=window.devicePixelRatio??1;t.style.width!==`${i}px`&&(t.style.width=`${i}px`,t.style.height=`${i}px`,t.width=Math.round(i*a),t.height=Math.round(i*a));const s=t.getContext("2d");if(!s)return;const o=t.width,l=t.height;s.clearRect(0,0,o,l),s.fillStyle="#000000",s.fillRect(0,0,o,l);const n=r.currentRegionId;if(n===null)return;const u=r.getLocalMap(n);if(!u||!u.tiles)return;const{tiles:m,gridW:b,gridH:g}=u,h=o/b,c=l/g;for(const p of m){const y=r.getFogAt(n,p.x,p.y),S=p.x*h,U=p.y*c,M=Math.ceil(h),T=Math.ceil(c);y===0?s.fillStyle="#222222":y===1?s.fillStyle="#555555":s.fillStyle=C[p.type]??"#444444",s.fillRect(S,U,M,T)}const _=r.partyPosition.x,x=r.partyPosition.y,w=_*h+h/2,v=x*c+c/2,k=Math.max(1.5,Math.min(h,c)*.7);s.beginPath(),s.arc(w,v,k,0,Math.PI*2),s.fillStyle="#ffffff",s.fill()}_updatePartyCards(){const t=this._el?.querySelector("#hud-party-bar");if(!t)return;const e=this._getPartyChars();if(!e||e.length===0){t.innerHTML="";return}const i=e.filter(a=>(a.hp??0)>0);if(i.length===0){t.innerHTML="";return}t.innerHTML=i.map(a=>{const s=a.hp??0,o=a.maxHP??1,l=Math.max(0,Math.min(100,s/o*100));let n;l>60?n="#4caf50":l>30?n="#ffb300":n="#e53935";const m=(a.statusEffects??[]).map(g=>H[g]?.dot??"").filter(Boolean).join("");return`
        <div class="hud-party-card">
          <div class="hud-party-name">${(a.name??"Hero").split(" ")[0]}${m?` <span class="hud-status-badges">${m}</span>`:""}</div>
          <div class="hud-hp-bar-track">
            <div class="hud-hp-bar-fill" style="width:${l.toFixed(1)}%; background:${n};"></div>
          </div>
          <div class="hud-hp-text">${s}/${o}</div>
        </div>
      `}).join("")}_getPartyChars(){try{const t=window.__characterSystem;if(t?.getAll){const e=t.getAll();if(e&&e.length>0)return e.filter(i=>i.isHero).slice(0,4)}}catch{}try{const t=window.__partyState;if(t?.characters&&t.characters.length>0)return t.characters}catch{}return[]}_animateGold(){const t=this._el?.querySelector("#hud-gold");if(!t)return;const e=r.partyGold??0;t.textContent=`${e}g`,t.classList.remove("hud-gold-pulse"),t.offsetWidth,t.classList.add("hud-gold-pulse")}_getFormattedTime(){if(this._formatTime)try{return this._formatTime()}catch(t){f.warn(`[debug] HUDPanel.formatTime error: ${t.message}`)}try{if(window.__timeSystem?.formatTime)return window.__timeSystem.formatTime()}catch{}return"06:00"}_checkIsNight(){if(this._isNight)try{return this._isNight()}catch{}try{if(window.__timeSystem?.isNight)return window.__timeSystem.isNight()}catch{}return!1}_getTimeFn(t){try{if(window.__timeSystem?.[t])return window.__timeSystem[t].bind(window.__timeSystem)}catch{}return null}}const N=`
/* ── HUD Panel ──────────────────────────────────────────────────────────── */

#hud-panel-root {
  pointer-events: none;
  user-select: none;
}

#hud-top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 12px;
  pointer-events: none;
}

.hud-block {
  background: rgba(10, 7, 3, 0.68);
  border: 1px solid rgba(90, 74, 32, 0.55);
  border-radius: 4px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(2px);
}

/* Time block — explicit flex-shrink: 0 so it never loses its left anchor */
.hud-time-block {
  flex-direction: row;
  gap: 6px;
  flex-shrink: 0;
}

.hud-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #5a4a28;
  flex-shrink: 0;
}

.hud-value {
  font-size: clamp(11px, 1.2vw, 13px);
  color: #d0b870;
  font-weight: bold;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.hud-night-star {
  color: #6880c0;
  font-size: 10px;
  animation: hud-night-pulse 2.5s ease-in-out infinite;
}

@keyframes hud-night-pulse {
  0%,100% { opacity: 0.6; }
  50%      { opacity: 1.0; }
}

/* Compass */
.hud-compass-block {
  background: rgba(10, 7, 3, 0.65);
  padding: 4px 6px;
}

.hud-compass {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hud-compass-svg {
  display: block;
}

.hud-compass-needle {
  transform-origin: 20px 20px;
  transition: transform 0.3s ease-out;
}

/* Resources block — right-side offset so it never overlaps nav/info buttons
   that world map places in the top-right corner. The margin-right pushes the
   block away from the viewport edge, clearing any 180-220px wide overlay. */
.hud-resources-block {
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  padding: 5px 10px;
  margin-right: clamp(0px, 14vw, 200px);
}

.hud-resource-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.hud-resource-icon {
  font-size: 8px;
  opacity: 0.5;
}

.hud-icon-gold {
  color: #c8a020;
}

.hud-icon-rations {
  color: #7a9a4a;
}

.hud-value--gold {
  color: #d4aa40;
}

.hud-value--rations {
  color: #90b060;
  font-size: clamp(10px, 1.1vw, 12px);
}

/* Weather indicator — small text beneath rations */
.hud-weather {
  font-size: clamp(10px, 1.5vw, 13px);
  color: #b0c8e0;
  letter-spacing: 0.03em;
  white-space: nowrap;
  opacity: 0.9;
}

/* Night mode — map darkness overlay */
body.hud-night-mode #game-canvas {
  filter: brightness(0.70) saturate(0.75);
  transition: filter 2s ease;
}

body:not(.hud-night-mode) #game-canvas {
  filter: brightness(1.0) saturate(1.0);
  transition: filter 2s ease;
}

/* ── Minimap ──────────────────────────────────────────────────────────────── */

#hud-minimap-wrap {
  position: absolute;
  bottom: 12px;
  left: 12px;
  border: 1px solid rgba(90, 74, 32, 0.7);
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.5);
  line-height: 0;
  transition: opacity 0.2s;
}

#hud-minimap {
  display: block;
  width: 80px;
  height: 80px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* ── Party HP cards ──────────────────────────────────────────────────────── */

#hud-party-bar {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}

.hud-party-card {
  background: rgba(10, 7, 3, 0.72);
  border: 1px solid rgba(90, 74, 32, 0.5);
  border-radius: 3px;
  padding: 3px 6px;
  min-width: 90px;
  max-width: 110px;
}

.hud-party-name {
  font-size: clamp(9px, 1vw, 11px);
  color: #d0b870;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.hud-status-badges {
  font-size: 9px;
  letter-spacing: 1px;
}

.hud-hp-bar-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 2px;
}

.hud-hp-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease, background 0.3s ease;
}

.hud-hp-text {
  font-size: 9px;
  color: #a09070;
  text-align: right;
}

/* ── Gold pulse animation ────────────────────────────────────────────────── */

@keyframes hud-gold-pulse {
  0%   { transform: scale(1.0); }
  40%  { transform: scale(1.2); }
  100% { transform: scale(1.0); }
}

.hud-gold-pulse {
  animation: hud-gold-pulse 0.35s ease-out;
}

/* ── Rations low warning ─────────────────────────────────────────────────── */

@keyframes pulse {
  0%, 100% { opacity: 1.0; }
  50%       { opacity: 0.5; }
}

.hud-rations-low {
  color: #ff6b35 !important;
  animation: pulse 1s infinite;
}

/* ── Responsive: hide less-essential elements on small screens ─────────── */

@media (max-width: 767px) {
  #hud-top-bar { padding: 5px 8px; }

  .hud-block { padding: 4px 7px; }

  /* Hide rations text on very small screens, keep gold */
  .hud-value--rations { display: none; }

  /* Shrink compass on mobile */
  .hud-compass-svg { width: 28px; height: 28px; }

  /* Smaller minimap on mobile */
  #hud-minimap,
  #hud-minimap-wrap #hud-minimap { width: 60px; height: 60px; }

  .hud-party-card { min-width: 72px; }
}

@media (max-width: 480px) {
  /* Hide compass on smallest screens */
  .hud-compass-block { display: none; }
}
`,z=new E;export{z as H};
//# sourceMappingURL=HUDPanel-DvoCUcQL.js.map
