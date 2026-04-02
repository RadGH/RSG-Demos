import{D as i,W as a}from"./main-DuN4PVib.js";class h{constructor(){this._el=null,this._intervalId=null,this._active=!1,this._formatTime=null,this._isNight=null,this._heading=0}init(e={}){this.destroy(),this._formatTime=e.formatTime??this._getTimeFn("formatTime"),this._isNight=e.isNight??this._getTimeFn("isNight"),this._buildDOM(),this.update(),this._intervalId=setInterval(()=>this.update(),1e3),this._active=!0,i.info("[debug] HUDPanel initialized")}update(){if(!this._el)return;const e=this._el.querySelector("#hud-time"),t=this._el.querySelector("#hud-gold"),s=this._el.querySelector("#hud-rations"),o=this._el.querySelector("#hud-night-indicator"),l=this._getFormattedTime(),n=this._checkIsNight(),r=a.partyGold??0,d=a.rationPoints??0;e&&(e.textContent=l),t&&(t.textContent=`${r}g`),s&&(s.textContent=`${d} rations`),o&&(o.style.display=n?"inline-block":"none"),document.body.classList.toggle("hud-night-mode",n)}destroy(){this._intervalId!=null&&(clearInterval(this._intervalId),this._intervalId=null),this._el&&(this._el.remove(),this._el=null),document.body.classList.remove("hud-night-mode"),this._active=!1,i.info("[debug] HUDPanel destroyed")}setHeading(e){this._heading=e%360;const t=this._el?.querySelector(".hud-compass-needle");t&&(t.style.transform=`rotate(${this._heading}deg)`)}_buildDOM(){document.getElementById("hud-panel-root")?.remove();const e=document.createElement("div");if(e.id="hud-panel-root",e.setAttribute("aria-hidden","true"),e.innerHTML=`
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
        </div>

      </div>
    `,Object.assign(e.style,{position:"fixed",inset:"0",zIndex:"var(--z-hud, 100)",pointerEvents:"none",fontFamily:"'Georgia', 'Times New Roman', serif"}),document.body.appendChild(e),this._el=e,!document.getElementById("hud-panel-styles")){const t=document.createElement("style");t.id="hud-panel-styles",t.textContent=c,document.head.appendChild(t)}}_getFormattedTime(){if(this._formatTime)try{return this._formatTime()}catch(e){i.warn(`[debug] HUDPanel.formatTime error: ${e.message}`)}try{if(window.__timeSystem?.formatTime)return window.__timeSystem.formatTime()}catch{}return"06:00"}_checkIsNight(){if(this._isNight)try{return this._isNight()}catch{}try{if(window.__timeSystem?.isNight)return window.__timeSystem.isNight()}catch{}return!1}_getTimeFn(e){try{if(window.__timeSystem?.[e])return window.__timeSystem[e].bind(window.__timeSystem)}catch{}return null}}const c=`
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

/* Night mode — map darkness overlay */
body.hud-night-mode #game-canvas {
  filter: brightness(0.70) saturate(0.75);
  transition: filter 2s ease;
}

body:not(.hud-night-mode) #game-canvas {
  filter: brightness(1.0) saturate(1.0);
  transition: filter 2s ease;
}

/* ── Responsive: hide less-essential elements on small screens ─────────── */

@media (max-width: 767px) {
  #hud-top-bar { padding: 5px 8px; }

  .hud-block { padding: 4px 7px; }

  /* Hide rations text on very small screens, keep gold */
  .hud-value--rations { display: none; }

  /* Shrink compass on mobile */
  .hud-compass-svg { width: 28px; height: 28px; }
}

@media (max-width: 480px) {
  /* Hide compass on smallest screens */
  .hud-compass-block { display: none; }
}
`,m=new h;export{m as H};
//# sourceMappingURL=HUDPanel-CyDHxmRx.js.map
