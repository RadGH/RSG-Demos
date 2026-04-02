const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-GcCELsWO.js","./main-D2c3OVlN.css"])))=>i.map(i=>d[i]);
import{D as c,O as d,_ as u,E as x,S as y,U as _}from"./main-GcCELsWO.js";const f="spellroads-online-lobby-style";function v(){if(document.getElementById(f))return;const p=document.createElement("style");p.id=f,p.textContent=`
    /* ── Online Lobby Backdrop ─────────────────────────────────────────────── */
    #online-lobby-backdrop {
      position: fixed;
      inset: 0;
      z-index: 350;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.80);
      pointer-events: all;
    }

    #online-lobby-backdrop.visible {
      display: flex;
    }

    /* ── Panel box ────────────────────────────────────────────────────────── */
    .online-lobby-box {
      position: relative;
      width: min(480px, 92vw);
      background: #0e0b09;
      border: 1px solid rgba(200,160,32,0.35);
      border-radius: 4px;
      padding: clamp(20px,4vw,36px);
      color: #e8d5b0;
      font-family: "Segoe UI", system-ui, sans-serif;
      box-shadow: 0 8px 48px rgba(0,0,0,0.9);
    }

    .online-lobby-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      color: #a09070;
      font-size: 1.4rem;
      cursor: pointer;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      line-height: 1;
    }

    .online-lobby-close:hover { color: #e8c040; }

    /* ── Title ────────────────────────────────────────────────────────────── */
    .online-lobby-title {
      margin: 0 0 16px;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: #c8a020;
    }

    /* ── Tabs ─────────────────────────────────────────────────────────────── */
    .online-lobby-tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 20px;
    }

    .online-lobby-tab {
      flex: 1;
      padding: 8px 0;
      background: rgba(200,160,32,0.05);
      border: 1px solid rgba(200,160,32,0.22);
      border-radius: 3px;
      color: #a09070;
      font-family: inherit;
      font-size: .85rem;
      font-weight: 600;
      letter-spacing: .06em;
      cursor: pointer;
      transition: background .14s, color .14s, border-color .14s;
      min-height: 44px;
    }

    .online-lobby-tab:hover {
      background: rgba(200,160,32,0.10);
      color: #c8a020;
      border-color: rgba(200,160,32,0.45);
    }

    .online-lobby-tab.active {
      background: rgba(200,160,32,0.14);
      border-color: rgba(200,160,32,0.60);
      color: #e8c040;
    }

    /* ── Tab content ─────────────────────────────────────────────────────── */
    .online-lobby-content {
      min-height: 160px;
    }

    /* ── Status message ──────────────────────────────────────────────────── */
    .online-lobby-status {
      font-size: .84rem;
      color: #a09070;
      margin: 10px 0 0;
      min-height: 20px;
      letter-spacing: .04em;
    }

    .online-lobby-status.ok  { color: #6db36d; }
    .online-lobby-status.err { color: #d06060; }
    .online-lobby-status.warn { color: #c8a020; }

    /* ── Room code display ───────────────────────────────────────────────── */
    .online-lobby-code-display {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 16px 0;
    }

    .online-lobby-code-label {
      font-size: .8rem;
      color: #8a7858;
      letter-spacing: .06em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .online-lobby-code-value {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: .22em;
      color: #c8a020;
      text-shadow: 0 0 14px rgba(200,160,32,0.5);
      font-family: "Courier New", monospace;
      padding: 6px 12px;
      background: rgba(200,160,32,0.06);
      border: 1px solid rgba(200,160,32,0.25);
      border-radius: 3px;
    }

    /* ── Buttons ─────────────────────────────────────────────────────────── */
    .online-lobby-btn {
      min-height: 44px;
      min-width: 120px;
      padding: 10px 18px;
      background: rgba(200,160,32,0.08);
      border: 1px solid rgba(200,160,32,0.30);
      border-radius: 3px;
      color: #c8a020;
      font-family: inherit;
      font-size: .88rem;
      font-weight: 600;
      letter-spacing: .06em;
      cursor: pointer;
      transition: background .14s, border-color .14s, color .14s;
      margin-top: 12px;
    }

    .online-lobby-btn:hover:not(:disabled) {
      background: rgba(200,160,32,0.16);
      border-color: rgba(200,160,32,0.60);
      color: #e8c040;
    }

    .online-lobby-btn:disabled {
      opacity: 0.38;
      cursor: not-allowed;
    }

    .online-lobby-btn.primary {
      background: rgba(200,160,32,0.14);
      border-color: rgba(200,160,32,0.50);
    }

    /* ── Code input ──────────────────────────────────────────────────────── */
    .online-lobby-input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 14px;
      background: rgba(200,160,32,0.05);
      border: 1px solid rgba(200,160,32,0.28);
      border-radius: 3px;
      color: #e8d5b0;
      font-family: "Courier New", monospace;
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: .18em;
      text-transform: uppercase;
      text-align: center;
      outline: none;
      min-height: 52px;
      margin-top: 4px;
    }

    .online-lobby-input:focus {
      border-color: rgba(200,160,32,0.60);
    }

    .online-lobby-unavailable {
      font-size: .84rem;
      color: #806040;
      font-style: italic;
    }
  `,document.head.appendChild(p)}class C{constructor(){this._backdrop=null,this._activeTab="host",this._visible=!1,this._available=!0,this._hostContent=null,this._joinContent=null,this._startBtn=null,this._joinBtn=null,this._codeInput=null,this._keyHandler=this._onKey.bind(this)}async show(){this._visible||(v(),this._build(),this._backdrop.classList.add("visible"),this._visible=!0,document.addEventListener("keydown",this._keyHandler),c.info("[online] OnlineLobbyPanel opened"),await d.connect("ws://localhost:3001"),d.isConnected?this._bindCoopCallbacks():this._markUnavailable())}hide(){this._visible&&(this._visible=!1,document.removeEventListener("keydown",this._keyHandler),this._backdrop&&(this._backdrop.remove(),this._backdrop=null),d.isConnected&&!d.roomCode&&d.disconnect(),c.info("[online] OnlineLobbyPanel closed"))}isVisible(){return this._visible}_build(){document.getElementById("online-lobby-backdrop")?.remove();const e=document.createElement("div");e.id="online-lobby-backdrop",this._backdrop=e,e.addEventListener("click",b=>{b.target===e&&this.hide()});const n=document.createElement("div");n.className="online-lobby-box",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Online Co-op Lobby");const t=document.createElement("button");t.type="button",t.className="online-lobby-close",t.textContent="×",t.setAttribute("aria-label","Close"),t.addEventListener("click",()=>this.hide()),n.appendChild(t);const a=document.createElement("h2");a.className="online-lobby-title",a.textContent="Online Co-op",n.appendChild(a);const i=document.createElement("div");i.className="online-lobby-tabs";const o=this._makeTabBtn("Host Game","host"),s=this._makeTabBtn("Join Game","join");i.appendChild(o),i.appendChild(s),n.appendChild(i);const l=document.createElement("div");l.className="online-lobby-content",n.appendChild(l),this._contentArea=l,e.appendChild(n),(document.getElementById("ui-overlay")??document.body).appendChild(e),this._renderTab("host")}_makeTabBtn(e,n){const t=document.createElement("button");return t.type="button",t.className="online-lobby-tab"+(this._activeTab===n?" active":""),t.textContent=e,t.dataset.tab=n,t.addEventListener("click",()=>this._renderTab(n)),t}_renderTab(e){this._activeTab=e,this._backdrop&&this._backdrop.querySelectorAll(".online-lobby-tab").forEach(n=>{n.classList.toggle("active",n.dataset.tab===e)}),this._contentArea.innerHTML="",this._startBtn=null,this._joinBtn=null,this._codeInput=null,e==="host"?this._buildHostTab():this._buildJoinTab()}_buildHostTab(){const e=this._contentArea;if(!this._available){const l=document.createElement("p");l.className="online-lobby-unavailable",l.textContent="Online play unavailable — could not connect to server.",e.appendChild(l);return}const n=document.createElement("button");n.type="button",n.className="online-lobby-btn primary",n.id="online-create-room-btn",n.textContent="Create Room",n.addEventListener("click",()=>{n.disabled=!0,this._setHostStatus("Creating room...","warn"),d.createRoom()}),e.appendChild(n);const t=document.createElement("div");t.className="online-lobby-code-display",t.id="online-code-display",t.style.display="none";const a=document.createElement("span");a.className="online-lobby-code-label",a.textContent="Room Code:",t.appendChild(a);const i=document.createElement("span");i.className="online-lobby-code-value",i.id="online-code-value",i.textContent="----",t.appendChild(i),e.appendChild(t);const o=document.createElement("p");o.className="online-lobby-status",o.id="online-host-status",o.textContent='Ready to host. Click "Create Room" to get a code.',e.appendChild(o);const s=document.createElement("button");s.type="button",s.className="online-lobby-btn primary",s.id="online-start-btn",s.textContent="Start Game",s.style.display="none",s.disabled=!0,s.addEventListener("click",()=>{d.startGame(),this._setHostStatus("Starting game...","ok"),s.disabled=!0}),e.appendChild(s),this._startBtn=s}_buildJoinTab(){const e=this._contentArea;if(!this._available){const o=document.createElement("p");o.className="online-lobby-unavailable",o.textContent="Online play unavailable — could not connect to server.",e.appendChild(o);return}const n=document.createElement("label");n.textContent="Enter Room Code:",n.style.cssText="display:block;font-size:.8rem;color:#8a7858;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;",n.setAttribute("for","online-code-input"),e.appendChild(n);const t=document.createElement("input");t.type="text",t.id="online-code-input",t.className="online-lobby-input",t.placeholder="XXXX",t.maxLength=4,t.autocomplete="off",t.spellcheck=!1,t.setAttribute("aria-label","Room code"),t.addEventListener("input",()=>{const o=t.selectionStart;t.value=t.value.toUpperCase().replace(/[^A-Z0-9]/g,""),t.setSelectionRange(o,o),this._joinBtn&&(this._joinBtn.disabled=t.value.length!==4)}),t.addEventListener("keydown",o=>{o.key==="Enter"&&t.value.length===4&&this._joinBtn?.click()}),e.appendChild(t),this._codeInput=t;const a=document.createElement("p");a.className="online-lobby-status",a.id="online-join-status",a.textContent="Enter the 4-character room code shared by the host.",e.appendChild(a);const i=document.createElement("button");i.type="button",i.className="online-lobby-btn primary",i.id="online-join-btn",i.textContent="Join Room",i.disabled=!0,i.addEventListener("click",()=>{const o=t.value.trim().toUpperCase();if(!d.isValidRoomCode(o)){this._setJoinStatus("Invalid room code — must be 4 alphanumeric characters.","err");return}i.disabled=!0,t.disabled=!0,this._setJoinStatus("Joining room...","warn"),d.joinRoom(o)}),e.appendChild(i),this._joinBtn=i,setTimeout(()=>t.focus(),50)}_setHostStatus(e,n=""){const t=document.getElementById("online-host-status");t&&(t.textContent=e,t.className="online-lobby-status"+(n?` ${n}`:""))}_setJoinStatus(e,n=""){const t=document.getElementById("online-join-status");t&&(t.textContent=e,t.className="online-lobby-status"+(n?` ${n}`:""))}_markUnavailable(){this._available=!1,c.warn("[online] WebSocket unavailable — disabling online features"),this._renderTab(this._activeTab)}_bindCoopCallbacks(){d.onRoomCreated=e=>{const n=document.getElementById("online-code-display"),t=document.getElementById("online-code-value"),a=document.getElementById("online-create-room-btn");n&&(n.style.display="flex"),t&&(t.textContent=e),a&&(a.style.display="none"),this._setHostStatus("Waiting for Player 2 to join...","warn"),c.info(`[online] Room created; code=${e}`)},d.onGuestJoined=()=>{this._setHostStatus("Player 2 connected! Ready to start.","ok"),this._startBtn&&(this._startBtn.style.display="",this._startBtn.disabled=!1),c.info("[online] Guest joined — Start button enabled")},d.onRoomJoined=e=>{this._setJoinStatus(`Joined room ${e}. Waiting for host to start...`,"ok"),this._codeInput&&(this._codeInput.disabled=!0),c.info(`[online] Joined room ${e}`)},d.onGameStarted=()=>{c.info("[online] Game started — transitioning to CharCreate"),this.hide(),u(()=>import("./main-GcCELsWO.js").then(e=>e.aM),__vite__mapDeps([0,1]),import.meta.url).then(e=>{e.default.transition("charCreate",{coopMode:"online"})})},d.onError=e=>{if(this._activeTab==="host"){this._setHostStatus(`Error: ${e}`,"err");const n=document.getElementById("online-create-room-btn");n&&(n.disabled=!1)}else this._setJoinStatus(`Error: ${e}`,"err"),this._codeInput&&(this._codeInput.disabled=!1),this._joinBtn&&(this._joinBtn.disabled=!1)},d.onDisconnected=()=>{this._visible?(this._setHostStatus("Connection lost.","err"),this._setJoinStatus("Connection lost.","err"),this._markUnavailable()):u(()=>import("./main-GcCELsWO.js").then(e=>e.aN),__vite__mapDeps([0,1]),import.meta.url).then(e=>{e.default.show("Player 2 disconnected — reverting to single-player.",{type:"warn",duration:4e3})})}}_onKey(e){e.key==="Escape"&&(e.stopPropagation(),this.hide())}}class E extends _{constructor(){super("panel-main-menu",{classes:["spellroads-panel","main-menu-panel"]}),this._buttons=[],this._focusIndex=0,this._keyHandler=this._onKey.bind(this)}build(e){this.el.innerHTML="";const n=document.createElement("div");n.className="main-menu-inner";const t=document.createElement("h1");t.className="main-menu-title",t.textContent="SPELLROADS",n.appendChild(t);const a=document.createElement("p");a.className="main-menu-byline",a.textContent="by Waystone Interactive",n.appendChild(a);const i=document.createElement("nav");i.className="main-menu-buttons",i.setAttribute("role","navigation"),i.setAttribute("aria-label","Main menu"),this._buttons=[],e.forEach((s,l)=>{const r=document.createElement("button");r.className="spellroads-btn main-menu-btn",r.textContent=s.label,r.dataset.index=String(l),r.setAttribute("type","button"),r.addEventListener("click",()=>{this._focusIndex=l,this._updateFocus(),s.action()}),r.addEventListener("focus",()=>{this._focusIndex=l,this._updateFocus()}),i.appendChild(r),this._buttons.push(r)}),n.appendChild(i);const o=document.createElement("p");return o.className="main-menu-version",o.textContent="Version 0.1.0",n.appendChild(o),this.el.appendChild(n),document.addEventListener("keydown",this._keyHandler),this}focusFirst(){this._focusIndex=0,this._updateFocus(),this._buttons[0]&&this._buttons[0].focus()}_updateFocus(){this._buttons.forEach((e,n)=>{e.classList.toggle("focused",n===this._focusIndex),e.setAttribute("tabindex",n===this._focusIndex?"0":"-1")})}_onKey(e){if(this._visible)switch(e.key){case"ArrowDown":case"s":case"S":{e.preventDefault(),this._focusIndex=(this._focusIndex+1)%this._buttons.length,this._updateFocus(),this._buttons[this._focusIndex].focus();break}case"ArrowUp":case"w":case"W":{e.preventDefault(),this._focusIndex=(this._focusIndex-1+this._buttons.length)%this._buttons.length,this._updateFocus(),this._buttons[this._focusIndex].focus();break}case"Enter":case"e":case"E":{e.preventDefault(),this._buttons[this._focusIndex]&&this._buttons[this._focusIndex].click();break}}}destroy(){document.removeEventListener("keydown",this._keyHandler),this._buttons=[],this.hide(),this.el&&this.el.parentNode&&this.el.remove()}}class k{constructor(){this._panel=null,this._bgEl=null,this._activeModal=null,this._onlineLobbyPanel=null}async init(){c.info("[boot] MainMenuScene starting"),this._buildCssBg(),this._injectStyles(),this._buildPanel(),window.__debug||(window.__debug={}),window.__debug.currentScene="mainMenu",c.info("[boot] MainMenuScene ready")}_buildCssBg(){const e=document.createElement("div");e.id="mm-bg";const n=80;for(let a=0;a<n;a++){const i=document.createElement("span"),o=(Math.random()*100).toFixed(2),s=(Math.random()*100).toFixed(2),l=(Math.random()*.6+.2).toFixed(2),r=(Math.random()*2+2).toFixed(1),b=(Math.random()*4).toFixed(2);i.style.cssText=`left:${o}%;top:${s}%;--op:${l};width:${r}px;height:${r}px;animation-delay:${b}s`,e.appendChild(i)}(document.getElementById("ui-overlay")??document.body).appendChild(e),this._bgEl=e}_buildPanel(){this._panel=new E;const e=[{label:"New Game",action:()=>{c.info("[boot] New Game clicked"),y.transition("charCreate")}},{label:"Load Game",action:async()=>{c.info("[boot] Load Game clicked");const n=window.__saveSystem;if(!n)return;const t=n.getSlotInfo().filter(o=>!o.empty);if(t.length===0){u(()=>import("./main-GcCELsWO.js").then(o=>o.aN),__vite__mapDeps([0,1]),import.meta.url).then(o=>o.default.show("No saved games found.",{type:"warn",duration:2500}));return}const a=t.find(o=>o.slot!=="auto")??t[0],i=await n.load(a.slot);i.ok?(u(()=>import("./main-GcCELsWO.js").then(o=>o.aN),__vite__mapDeps([0,1]),import.meta.url).then(o=>o.default.show("Game loaded!",{type:"success"})),u(()=>import("./main-GcCELsWO.js").then(o=>o.aM),__vite__mapDeps([0,1]),import.meta.url).then(o=>o.default.transition("worldMap"))):u(()=>import("./main-GcCELsWO.js").then(o=>o.aN),__vite__mapDeps([0,1]),import.meta.url).then(o=>o.default.show(i.message,{type:"error"}))}},{label:"Online Co-op",action:()=>{c.info("[boot] Online Co-op clicked"),this._showOnlineLobby()}},{label:"Settings",action:()=>{c.info("[boot] Settings clicked"),this._showSettingsModal()}},{label:"Credits",action:()=>{c.info("[boot] Credits clicked"),this._showCreditsModal()}},{label:"Achievements",action:()=>{c.info("[boot] Achievements clicked"),window.__achievementPanel?.show()}}];this._panel.build(e),this._panel.show(),this._panel.focusFirst()}_createModal(e){const n=document.getElementById(e);n&&n.remove();const t=document.createElement("div");t.id=e,t.style.cssText=["position:fixed","inset:0","z-index:350","display:flex","align-items:center","justify-content:center","background:rgba(0,0,0,0.72)","pointer-events:all"].join(";");const a=document.createElement("div");a.style.cssText=["position:relative","width:min(480px,90vw)","max-height:80vh","overflow-y:auto","background:#0e0b09","border:1px solid rgba(200,160,32,0.35)","border-radius:4px","padding:clamp(20px,4vw,36px)","color:#e8d5b0",'font-family:"Segoe UI",system-ui,sans-serif',"box-shadow:0 8px 48px rgba(0,0,0,0.9)"].join(";");const i=document.createElement("button");i.type="button",i.textContent="×",i.setAttribute("aria-label","Close"),i.style.cssText=["position:absolute","top:12px","right:12px","background:none","border:none","color:#a09070","font-size:1.4rem","cursor:pointer","min-width:44px","min-height:44px","display:flex","align-items:center","justify-content:center","border-radius:3px","line-height:1"].join(";");const o=()=>{t.remove(),this._activeModal=null};return i.addEventListener("click",o),t.addEventListener("click",l=>{l.target===t&&o()}),document.addEventListener("keydown",function l(r){r.key==="Escape"&&(o(),document.removeEventListener("keydown",l))}),a.appendChild(i),t.appendChild(a),(document.getElementById("ui-overlay")??document.body).appendChild(t),this._activeModal=t,a}_showOnlineLobby(){this._onlineLobbyPanel||(this._onlineLobbyPanel=new C),this._onlineLobbyPanel.show()}_showSettingsModal(){const e=this._createModal("mm-settings-modal"),n=document.createElement("h2");n.textContent="Settings",n.style.cssText="margin:0 0 20px;font-size:1.2rem;letter-spacing:.12em;text-transform:uppercase;color:#c8a020;",e.appendChild(n);const t=(s,l,r)=>{const b=document.createElement("div");b.style.cssText="display:flex;align-items:center;gap:12px;margin-bottom:14px;";const g=document.createElement("label");g.textContent=s,g.style.cssText="flex:0 0 140px;font-size:.85rem;color:#c8a020;letter-spacing:.06em;";const m=document.createElement("input");m.type="range",m.min="0",m.max="100",m.step="1",m.value=String(Number(localStorage.getItem(l)??r)),m.style.cssText="flex:1;accent-color:#c8a020;min-height:44px;cursor:pointer;";const h=document.createElement("span");return h.textContent=m.value,h.style.cssText="flex:0 0 36px;text-align:right;font-size:.85rem;color:#a09070;",m.addEventListener("input",()=>{h.textContent=m.value,localStorage.setItem(l,m.value),x.emit("settings:volume",{key:l,value:Number(m.value)/100})}),b.appendChild(g),b.appendChild(m),b.appendChild(h),b};e.appendChild(t("Master Volume","vol_master",80)),e.appendChild(t("Music Volume","vol_music",70)),e.appendChild(t("SFX Volume","vol_sfx",80));const a=document.createElement("div");a.style.cssText="display:flex;align-items:center;gap:12px;margin-bottom:14px;";const i=document.createElement("label");i.textContent="Fog of War",i.style.cssText="flex:0 0 140px;font-size:.85rem;color:#c8a020;letter-spacing:.06em;cursor:pointer;";const o=document.createElement("input");o.type="checkbox",o.checked=localStorage.getItem("fog_of_war")!=="false",o.style.cssText="width:20px;height:20px;accent-color:#c8a020;cursor:pointer;min-height:unset;",o.addEventListener("change",()=>{localStorage.setItem("fog_of_war",String(o.checked)),x.emit("settings:fog",{enabled:o.checked})}),i.htmlFor="setting-fog-check",o.id="setting-fog-check",a.appendChild(i),a.appendChild(o),e.appendChild(a),c.info("[boot] Settings modal opened")}_showCreditsModal(){const e=this._createModal("mm-credits-modal"),n=document.createElement("h2");n.textContent="Credits",n.style.cssText="margin:0 0 20px;font-size:1.2rem;letter-spacing:.12em;text-transform:uppercase;color:#c8a020;",e.appendChild(n),[{role:"Game Design & Development",name:"Waystone Interactive"},{role:"Engine",name:"PixiJS v8"},{role:"Audio",name:"Howler.js"},{role:"Build",name:"Vite"},{role:"Testing",name:"Playwright"}].forEach(({role:i,name:o})=>{const s=document.createElement("div");s.style.cssText="display:flex;justify-content:space-between;margin-bottom:10px;font-size:.85rem;border-bottom:1px solid rgba(90,74,53,0.4);padding-bottom:10px;";const l=document.createElement("span");l.textContent=i,l.style.color="#a09070";const r=document.createElement("span");r.textContent=o,r.style.color="#c8a020",s.appendChild(l),s.appendChild(r),e.appendChild(s)});const a=document.createElement("p");a.textContent="Spellroads v0.1.0 — All rights reserved.",a.style.cssText="margin-top:16px;font-size:.72rem;color:#706050;text-align:center;letter-spacing:.06em;",e.appendChild(a),c.info("[boot] Credits modal opened")}_injectStyles(){const e="spellroads-main-menu-style";if(document.getElementById(e))return;const n=document.createElement("style");n.id=e,n.textContent=`
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
    `,document.head.appendChild(n)}destroy(){c.info("[boot] MainMenuScene destroy"),this._activeModal&&(this._activeModal.remove(),this._activeModal=null),this._onlineLobbyPanel&&(this._onlineLobbyPanel.hide(),this._onlineLobbyPanel=null),this._panel&&(this._panel.destroy(),this._panel=null),this._bgEl&&(this._bgEl.remove(),this._bgEl=null),window.__debug&&window.__debug.currentScene==="mainMenu"&&(window.__debug.currentScene=null)}}export{k as default};
//# sourceMappingURL=MainMenuScene-BXBeZEu5.js.map
