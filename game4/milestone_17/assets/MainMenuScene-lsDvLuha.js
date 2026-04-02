const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-jTBrLZ97.js","./main-ehkdOXy7.css"])))=>i.map(i=>d[i]);
import{D as d,E as g,S as b,_ as u,U as f}from"./main-jTBrLZ97.js";class _ extends f{constructor(){super("panel-main-menu",{classes:["spellroads-panel","main-menu-panel"]}),this._buttons=[],this._focusIndex=0,this._keyHandler=this._onKey.bind(this)}build(t){this.el.innerHTML="";const n=document.createElement("div");n.className="main-menu-inner";const i=document.createElement("h1");i.className="main-menu-title",i.textContent="SPELLROADS",n.appendChild(i);const s=document.createElement("p");s.className="main-menu-byline",s.textContent="by Waystone Interactive",n.appendChild(s);const o=document.createElement("nav");o.className="main-menu-buttons",o.setAttribute("role","navigation"),o.setAttribute("aria-label","Main menu"),this._buttons=[],t.forEach((r,l)=>{const a=document.createElement("button");a.className="spellroads-btn main-menu-btn",a.textContent=r.label,a.dataset.index=String(l),a.setAttribute("type","button"),a.addEventListener("click",()=>{this._focusIndex=l,this._updateFocus(),r.action()}),a.addEventListener("focus",()=>{this._focusIndex=l,this._updateFocus()}),o.appendChild(a),this._buttons.push(a)}),n.appendChild(o);const e=document.createElement("p");return e.className="main-menu-version",e.textContent="Version 0.1.0",n.appendChild(e),this.el.appendChild(n),document.addEventListener("keydown",this._keyHandler),this}focusFirst(){this._focusIndex=0,this._updateFocus(),this._buttons[0]&&this._buttons[0].focus()}_updateFocus(){this._buttons.forEach((t,n)=>{t.classList.toggle("focused",n===this._focusIndex),t.setAttribute("tabindex",n===this._focusIndex?"0":"-1")})}_onKey(t){if(this._visible)switch(t.key){case"ArrowDown":case"s":case"S":{t.preventDefault(),this._focusIndex=(this._focusIndex+1)%this._buttons.length,this._updateFocus(),this._buttons[this._focusIndex].focus();break}case"ArrowUp":case"w":case"W":{t.preventDefault(),this._focusIndex=(this._focusIndex-1+this._buttons.length)%this._buttons.length,this._updateFocus(),this._buttons[this._focusIndex].focus();break}case"Enter":case"e":case"E":{t.preventDefault(),this._buttons[this._focusIndex]&&this._buttons[this._focusIndex].click();break}}}destroy(){document.removeEventListener("keydown",this._keyHandler),this._buttons=[],this.hide(),this.el&&this.el.parentNode&&this.el.remove()}}class v{constructor(){this._panel=null,this._bgEl=null,this._activeModal=null}async init(){d.info("[boot] MainMenuScene starting"),this._buildCssBg(),this._injectStyles(),this._buildPanel(),window.__debug||(window.__debug={}),window.__debug.currentScene="mainMenu",d.info("[boot] MainMenuScene ready")}_buildCssBg(){const t=document.createElement("div");t.id="mm-bg";const n=80;for(let s=0;s<n;s++){const o=document.createElement("span"),e=(Math.random()*100).toFixed(2),r=(Math.random()*100).toFixed(2),l=(Math.random()*.6+.2).toFixed(2),a=(Math.random()*2+2).toFixed(1),m=(Math.random()*4).toFixed(2);o.style.cssText=`left:${e}%;top:${r}%;--op:${l};width:${a}px;height:${a}px;animation-delay:${m}s`,t.appendChild(o)}(document.getElementById("ui-overlay")??document.body).appendChild(t),this._bgEl=t}_buildPanel(){this._panel=new _;const t=[{label:"New Game",action:()=>{d.info("[boot] New Game clicked"),b.transition("charCreate")}},{label:"Load Game",action:async()=>{d.info("[boot] Load Game clicked");const n=window.__saveSystem;if(!n)return;const i=n.getSlotInfo().filter(e=>!e.empty);if(i.length===0){u(()=>import("./Toast-DdldXe6T.js"),[],import.meta.url).then(e=>e.default.show("No saved games found.",{type:"warn",duration:2500}));return}const s=i.find(e=>e.slot!=="auto")??i[0],o=await n.load(s.slot);o.ok?(u(()=>import("./Toast-DdldXe6T.js"),[],import.meta.url).then(e=>e.default.show("Game loaded!",{type:"success"})),u(()=>import("./main-jTBrLZ97.js").then(e=>e.ap),__vite__mapDeps([0,1]),import.meta.url).then(e=>e.default.transition("worldMap"))):u(()=>import("./Toast-DdldXe6T.js"),[],import.meta.url).then(e=>e.default.show(o.message,{type:"error"}))}},{label:"Settings",action:()=>{d.info("[boot] Settings clicked"),this._showSettingsModal()}},{label:"Credits",action:()=>{d.info("[boot] Credits clicked"),this._showCreditsModal()}}];this._panel.build(t),this._panel.show(),this._panel.focusFirst()}_createModal(t){const n=document.getElementById(t);n&&n.remove();const i=document.createElement("div");i.id=t,i.style.cssText=["position:fixed","inset:0","z-index:350","display:flex","align-items:center","justify-content:center","background:rgba(0,0,0,0.72)","pointer-events:all"].join(";");const s=document.createElement("div");s.style.cssText=["position:relative","width:min(480px,90vw)","max-height:80vh","overflow-y:auto","background:#0e0b09","border:1px solid rgba(200,160,32,0.35)","border-radius:4px","padding:clamp(20px,4vw,36px)","color:#e8d5b0",'font-family:"Segoe UI",system-ui,sans-serif',"box-shadow:0 8px 48px rgba(0,0,0,0.9)"].join(";");const o=document.createElement("button");o.type="button",o.textContent="×",o.setAttribute("aria-label","Close"),o.style.cssText=["position:absolute","top:12px","right:12px","background:none","border:none","color:#a09070","font-size:1.4rem","cursor:pointer","min-width:44px","min-height:44px","display:flex","align-items:center","justify-content:center","border-radius:3px","line-height:1"].join(";");const e=()=>{i.remove(),this._activeModal=null};return o.addEventListener("click",e),i.addEventListener("click",l=>{l.target===i&&e()}),document.addEventListener("keydown",function l(a){a.key==="Escape"&&(e(),document.removeEventListener("keydown",l))}),s.appendChild(o),i.appendChild(s),(document.getElementById("ui-overlay")??document.body).appendChild(i),this._activeModal=i,s}_showSettingsModal(){const t=this._createModal("mm-settings-modal"),n=document.createElement("h2");n.textContent="Settings",n.style.cssText="margin:0 0 20px;font-size:1.2rem;letter-spacing:.12em;text-transform:uppercase;color:#c8a020;",t.appendChild(n);const i=(r,l,a)=>{const m=document.createElement("div");m.style.cssText="display:flex;align-items:center;gap:12px;margin-bottom:14px;";const h=document.createElement("label");h.textContent=r,h.style.cssText="flex:0 0 140px;font-size:.85rem;color:#c8a020;letter-spacing:.06em;";const c=document.createElement("input");c.type="range",c.min="0",c.max="100",c.step="1",c.value=String(Number(localStorage.getItem(l)??a)),c.style.cssText="flex:1;accent-color:#c8a020;min-height:44px;cursor:pointer;";const p=document.createElement("span");return p.textContent=c.value,p.style.cssText="flex:0 0 36px;text-align:right;font-size:.85rem;color:#a09070;",c.addEventListener("input",()=>{p.textContent=c.value,localStorage.setItem(l,c.value),g.emit("settings:volume",{key:l,value:Number(c.value)/100})}),m.appendChild(h),m.appendChild(c),m.appendChild(p),m};t.appendChild(i("Master Volume","vol_master",80)),t.appendChild(i("Music Volume","vol_music",70)),t.appendChild(i("SFX Volume","vol_sfx",80));const s=document.createElement("div");s.style.cssText="display:flex;align-items:center;gap:12px;margin-bottom:14px;";const o=document.createElement("label");o.textContent="Fog of War",o.style.cssText="flex:0 0 140px;font-size:.85rem;color:#c8a020;letter-spacing:.06em;cursor:pointer;";const e=document.createElement("input");e.type="checkbox",e.checked=localStorage.getItem("fog_of_war")!=="false",e.style.cssText="width:20px;height:20px;accent-color:#c8a020;cursor:pointer;min-height:unset;",e.addEventListener("change",()=>{localStorage.setItem("fog_of_war",String(e.checked)),g.emit("settings:fog",{enabled:e.checked})}),o.htmlFor="setting-fog-check",e.id="setting-fog-check",s.appendChild(o),s.appendChild(e),t.appendChild(s),d.info("[boot] Settings modal opened")}_showCreditsModal(){const t=this._createModal("mm-credits-modal"),n=document.createElement("h2");n.textContent="Credits",n.style.cssText="margin:0 0 20px;font-size:1.2rem;letter-spacing:.12em;text-transform:uppercase;color:#c8a020;",t.appendChild(n),[{role:"Game Design & Development",name:"Waystone Interactive"},{role:"Engine",name:"PixiJS v8"},{role:"Audio",name:"Howler.js"},{role:"Build",name:"Vite"},{role:"Testing",name:"Playwright"}].forEach(({role:o,name:e})=>{const r=document.createElement("div");r.style.cssText="display:flex;justify-content:space-between;margin-bottom:10px;font-size:.85rem;border-bottom:1px solid rgba(90,74,53,0.4);padding-bottom:10px;";const l=document.createElement("span");l.textContent=o,l.style.color="#a09070";const a=document.createElement("span");a.textContent=e,a.style.color="#c8a020",r.appendChild(l),r.appendChild(a),t.appendChild(r)});const s=document.createElement("p");s.textContent="Spellroads v0.1.0 — All rights reserved.",s.style.cssText="margin-top:16px;font-size:.72rem;color:#706050;text-align:center;letter-spacing:.06em;",t.appendChild(s),d.info("[boot] Credits modal opened")}_injectStyles(){const t="spellroads-main-menu-style";if(document.getElementById(t))return;const n=document.createElement("style");n.id=t,n.textContent=`
      /* ── CSS starfield background ────────────────────────────────────── */
      #mm-bg {
        position: fixed;
        inset: 0;
        z-index: 0;
        background: radial-gradient(ellipse at center, #1e1208 0%, #0a0808 70%);
        pointer-events: none;
      }

      #mm-bg span {
        position: absolute;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: #c8a020;
        animation: mm-twinkle 3s ease-in-out infinite;
      }

      @keyframes mm-twinkle {
        0%, 100% { opacity: var(--op); transform: scale(1); }
        50%       { opacity: calc(var(--op) * 0.3); transform: scale(0.6); }
      }

      /* ── Main Menu Panel ─────────────────────────────────────────────── */
      #panel-main-menu {
        position: fixed;
        inset: 0;
        z-index: 200;
        display: none;
        align-items: center;
        justify-content: center;
        background: transparent;
        pointer-events: none;
      }

      #panel-main-menu.visible {
        display: flex;
      }

      .main-menu-inner {
        width: min(400px, 90vw);
        padding: clamp(24px, 5vw, 48px) clamp(20px, 4vw, 40px);
        background: rgba(10, 8, 8, 0.82);
        border: 1px solid rgba(200, 160, 32, 0.3);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
        pointer-events: auto;
        box-shadow:
          0 0 40px rgba(0, 0, 0, 0.8),
          inset 0 0 60px rgba(200, 160, 32, 0.04);
      }

      /* Portrait mobile: slightly looser layout */
      @media (max-width: 767px) and (orientation: portrait) {
        .main-menu-inner {
          width: 90vw;
          padding: 28px 20px;
        }
      }

      /* Landscape mobile: reduce vertical padding */
      @media (max-width: 1023px) and (orientation: landscape) {
        .main-menu-inner {
          padding: 16px 32px;
          gap: 0;
        }
      }

      /* ── Title ──────────────────────────────────────────────────────── */
      .main-menu-title {
        margin: 0 0 4px 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        font-size: clamp(1.8rem, 5vw, 2.8rem);
        font-weight: 800;
        letter-spacing: 0.2em;
        color: #c8a020;
        text-shadow:
          0 0 20px rgba(200, 160, 32, 0.7),
          0 2px 4px rgba(0, 0, 0, 0.8);
        text-align: center;
        line-height: 1.1;
      }

      /* ── Byline ─────────────────────────────────────────────────────── */
      .main-menu-byline {
        margin: 0 0 clamp(24px, 4vh, 36px) 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        font-size: clamp(0.65rem, 1.5vw, 0.8rem);
        letter-spacing: 0.12em;
        color: #6a5a3a;
        text-align: center;
        text-transform: uppercase;
      }

      /* ── Button list ────────────────────────────────────────────────── */
      .main-menu-buttons {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        gap: 10px;
        margin-bottom: clamp(20px, 3vh, 28px);
      }

      /* ── Individual buttons ─────────────────────────────────────────── */
      .main-menu-btn {
        min-height: 44px;
        padding: 10px 20px;
        font-family: "Segoe UI", system-ui, sans-serif;
        font-size: clamp(0.85rem, 2vw, 1rem);
        font-weight: 600;
        letter-spacing: 0.06em;
        color: #c8a020;
        background: rgba(200, 160, 32, 0.06);
        border: 1px solid rgba(200, 160, 32, 0.25);
        border-radius: 3px;
        cursor: pointer;
        transition:
          background 0.15s ease,
          border-color 0.15s ease,
          color 0.15s ease,
          box-shadow 0.15s ease;
        text-align: center;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      .main-menu-btn:hover,
      .main-menu-btn:focus,
      .main-menu-btn.focused {
        background: rgba(200, 160, 32, 0.14);
        border-color: rgba(200, 160, 32, 0.65);
        color: #e8c040;
        box-shadow: 0 0 12px rgba(200, 160, 32, 0.25);
      }

      .main-menu-btn:active {
        background: rgba(200, 160, 32, 0.22);
        transform: translateY(1px);
      }

      /* ── Version label ──────────────────────────────────────────────── */
      .main-menu-version {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        font-size: clamp(0.6rem, 1.2vw, 0.72rem);
        color: #3a3020;
        letter-spacing: 0.08em;
        text-align: center;
      }
    `,document.head.appendChild(n)}destroy(){d.info("[boot] MainMenuScene destroy"),this._activeModal&&(this._activeModal.remove(),this._activeModal=null),this._panel&&(this._panel.destroy(),this._panel=null),this._bgEl&&(this._bgEl.remove(),this._bgEl=null),window.__debug&&window.__debug.currentScene==="mainMenu"&&(window.__debug.currentScene=null)}}export{v as default};
//# sourceMappingURL=MainMenuScene-lsDvLuha.js.map
