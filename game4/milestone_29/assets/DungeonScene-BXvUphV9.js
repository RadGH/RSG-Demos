import{D as g,W as p,S as B,E as X,C as J}from"./main-DCZ4KuqN.js";import{c as K}from"./RNG-ziO0lLz6.js";import{G as q}from"./Graphics-C7hiUZrt.js";import"./colorToUniform-DUza8Qlq.js";const Q=[{id:"burial_mound",name:"Burial Mound",biome:"plains",room_count:[6,10],enemy_pool:["skeleton_warrior","undead_archer","lich"],boss:"lich",loot_tier:"uncommon",description:"Ancient Norse burial chamber filled with restless dead."},{id:"goblin_warren",name:"Goblin Warren",biome:"forest",room_count:[8,12],enemy_pool:["goblin_scout","goblin_shaman","orc_grunt"],boss:"orc_grunt",loot_tier:"common",description:"Tunnels carved by goblins, cramped and treacherous."},{id:"frost_cave",name:"Frost Cave",biome:"tundra",room_count:[6,9],enemy_pool:["frost_troll","ice_witch","wolf"],boss:"frost_troll",loot_tier:"uncommon",description:"Frozen cavern carved by glacial forces, home to cold predators."},{id:"volcanic_lair",name:"Volcanic Lair",biome:"volcanic",room_count:[5,8],enemy_pool:["fire_elemental","stone_golem","dark_mage"],boss:"stone_golem",loot_tier:"rare",description:"Magma-carved tunnels deep beneath a volcano."},{id:"shadow_sanctum",name:"Shadow Sanctum",biome:"any",room_count:[8,14],enemy_pool:["shadow_stalker","dark_mage","swamp_wraith"],boss:"shadow_stalker",loot_tier:"rare",description:"A void-touched dungeon of darkness and illusion."}],A=5,G=5,W={common:["iron_sword","leather_armor","health_potion","torch","rope"],uncommon:["steel_sword","chain_armor","mana_potion","identify_scroll","rare_herb"],rare:["enchanted_blade","plate_armor","elixir_of_power","legendary_gem","ancient_tome"]},d={_dungeon:null,getDef(n){return Q.find(t=>t.id===n)??null},generate(n,t,e){const a=K(n>>>0),i=this.getDef(t);if(!i)return g.error(`[dungeon] Unknown dungeon type: ${t}`),null;const[o,r]=i.room_count,s=a.nextInt(o,r),u=2,h=G-1,b=Array.from({length:G},()=>Array(A).fill(null)),m=[],y=[];let w=0;const $=(_,v,f)=>{const I=`room_${w++}`,O=this._makeEncounter(f,i,e,a),M=this._makeLoot(f,i,a),L={id:I,x:_,y:v,type:f,cleared:!1,encounter:O,loot:M,visited:!1};return b[v][_]=L,m.push(L),L},E=$(u,h,"entrance"),c=[{x:u,y:h}],l=new Set([`${u},${h}`]),x=[{dx:0,dy:-1},{dx:1,dy:0},{dx:0,dy:1},{dx:-1,dy:0}];let k=0;for(;m.length<s&&c.length>0&&k<200;){k++;const _=a.nextInt(0,c.length-1),{x:v,y:f}=c[_],I=a.shuffle([...x]);let O=!1;for(const{dx:M,dy:L}of I){const D=v+M,T=f+L,H=`${D},${T}`;if(D<0||D>=A||T<0||T>=G||l.has(H))continue;l.add(H);let z="chamber";const U=a.nextFloat();U<.15?z="corridor":U<.25&&(z="treasure");const j=$(D,T,z),F=b[f][v];if(F&&y.push({from:F.id,to:j.id}),c.push({x:D,y:T}),O=!0,m.length>=s)break}O||c.splice(_,1)}let R=[...m.filter(_=>_.type==="entrance"?!1:y.filter(f=>f.from===_.id||f.to===_.id).length===1)].sort((_,v)=>{const f=Math.abs(_.x-u)+Math.abs(_.y-h);return Math.abs(v.x-u)+Math.abs(v.y-h)-f})[0]??m.find(_=>_.type!=="entrance");R&&(R.type="boss",R.encounter={present:!0,enemies:[i.boss],difficulty:e+2,isBoss:!0},R.loot=this._makeLoot("boss",i,a),R.cleared=!1);const Y={seed:n,dungeonType:t,regionLevel:e,rooms:m,connections:y,startRoom:E.id,bossRoom:R?.id??E.id,currentRoomId:E.id};return g.info(`[dungeon] Generated ${t}; seed=${n} rooms=${m.length} boss=${R?.id}`),Y},restoreState(n){this._dungeon=n,g.info(`[dungeon] State restored; currentRoom=${n?.currentRoomId}`)},getState(){return this._dungeon?{...this._dungeon}:null},enterRoom(n){if(!this._dungeon)return{room:null,encounter:null};const t=this._dungeon.rooms.find(a=>a.id===n);if(!t)return g.warn(`[dungeon] enterRoom: unknown roomId=${n}`),{room:null,encounter:null};this._dungeon.currentRoomId=n,t.visited=!0;const e=!t.cleared&&t.encounter?.present?t.encounter:null;return g.event(`[dungeon] Entered room; id=${n} type=${t.type} cleared=${t.cleared} encounter=${!!e}`),{room:t,encounter:e}},clearRoom(n){if(!this._dungeon)return null;const t=this._dungeon.rooms.find(e=>e.id===n);return t?(t.cleared=!0,g.event(`[dungeon] Room cleared; id=${n} type=${t.type} loot=${JSON.stringify(t.loot)}`),t.loot??null):null},canExitDungeon(){return this._dungeon?this._dungeon.currentRoomId===this._dungeon.startRoom:!0},getCurrentRoom(){return this._dungeon?this._dungeon.rooms.find(n=>n.id===this._dungeon.currentRoomId)??null:null},getConnectedRooms(n){if(!this._dungeon)return[];const t=this._dungeon.connections.filter(e=>e.from===n||e.to===n).map(e=>e.from===n?e.to:e.from);return this._dungeon.rooms.filter(e=>t.includes(e.id))},isFullyCleared(){return this._dungeon?this._dungeon.rooms.filter(n=>n.type!=="entrance").every(n=>n.cleared):!1},_makeEncounter(n,t,e,a){if(n==="entrance"||n==="treasure")return{present:!1};if(n==="boss")return{present:!0,enemies:[t.boss],difficulty:e+2,isBoss:!0};const i=n==="corridor"?.3:.65;if(!a.nextBool(i))return{present:!1};const o=t.enemy_pool.filter(u=>u!==t.boss),r=a.nextInt(1,2);return{present:!0,enemies:Array.from({length:r},()=>a.pick(o)),difficulty:e,isBoss:!1}},_makeLoot(n,t,e){const a=t.loot_tier??"common",i=W[a]??W.common;if(n==="boss"){const o=e.nextInt(2,3);return{items:Array.from({length:o},()=>e.pick(i)),gold:e.nextInt(20,60)*(t.loot_tier==="rare"?3:1)}}return n==="treasure"?{items:[e.pick(i),e.pick(i)],gold:e.nextInt(10,40)}:n==="chamber"&&e.nextBool(.5)?{items:[e.pick(i)],gold:e.nextInt(0,15)}:n==="corridor"&&e.nextBool(.25)?{items:[e.pick(i)],gold:0}:null}},S=80,C=60,Z=20,ee=16,te=40,oe=40,ne=4,re={entrance:3828266,corridor:3813424,chamber:2762816,treasure:5917200,boss:5900810},ie={entrance:2242584,corridor:2104348,chamber:1578532,treasure:3154952,boss:3147270},se=16766720,ae=5917226,de=2236962;function V(n){return{px:te+n.x*(S+Z),py:oe+n.y*(C+ee)}}function N(n){const{px:t,py:e}=V(n);return{cx:t+S/2,cy:e+C/2}}class _e{async init({renderer:t,dungeonType:e="burial_mound",regionLevel:a=1,seed:i=null}={}){this._renderer=t,this._dungeonType=e,this._regionLevel=a,this._seed=i??(p.world?.seed??Date.now())^13633024,this._dungeonContainer=null,this._partyGfx=null,this._ticker=null,this._resizeUnsub=null,this._inputCooldown=0,this._confirmPrompt=null;const o=p.dungeonState??null;if(o&&o.seed===this._seed&&o.dungeonType===this._dungeonType)d.restoreState(o),g.info(`[dungeon] Restored existing dungeon state; seed=${this._seed}`);else{const s=d.generate(this._seed,this._dungeonType,this._regionLevel);if(!s){g.error("[dungeon] DungeonScene: generate() returned null; aborting"),B.transition("localMap",{regionId:p.currentRegionId??0});return}d.restoreState(s),p.dungeonState=d.getState()}const r=d.getState().currentRoomId;d.enterRoom(r),p.dungeonState=d.getState(),this._buildPixiDungeon(),this._buildHTMLPanel(),this._ticker=s=>this._update(s.deltaMS),this._renderer.app.ticker.add(this._ticker),this._resizeUnsub=X.on("renderer:resize",()=>this._onResize()),window.__debug=window.__debug??{},window.__debug.currentScene="dungeon",window.__debug.getDungeonState=()=>d.getState(),window.__debug.dungeonGoToRoom=s=>this._navigateToRoom(s),g.info(`[dungeon] DungeonScene initialized; type=${this._dungeonType} seed=${this._seed}`)}_buildPixiDungeon(){const t=this._renderer.layers.world;this._dungeonContainer=new J,this._dungeonContainer.label="dungeonContainer",t.addChild(this._dungeonContainer),this._redrawDungeon()}_redrawDungeon(){if(!this._dungeonContainer)return;this._dungeonContainer.removeChildren();const t=d.getState();if(!t)return;const e=new q;this._dungeonContainer.addChild(e);const a=t.currentRoomId;for(const o of t.connections){const r=t.rooms.find(w=>w.id===o.from),s=t.rooms.find(w=>w.id===o.to);if(!r||!s||!(r.visited||s.visited))continue;const{cx:h,cy:b}=N(r),{cx:m,cy:y}=N(s);e.moveTo(h,b),e.lineTo(m,y),e.stroke({color:4864554,width:ne})}for(const o of t.rooms){const{px:r,py:s}=V(o),u=o.id===a;if(!o.visited&&!u){e.rect(r,s,S,C),e.fill({color:1118481}),e.rect(r,s,S,C),e.stroke({color:de,width:1});continue}const b=u?re[o.type]??2763322:ie[o.type]??1579040,m=u?se:ae,y=u?2:1;e.rect(r,s,S,C),e.fill({color:b}),e.rect(r,s,S,C),e.stroke({color:m,width:y}),o.cleared&&(e.circle(r+S-8,s+8,5),e.fill({color:2140736})),!o.cleared&&o.loot?.items?.length>0&&(e.circle(r+8,s+C-8,4),e.fill({color:14526976}))}const i=t.rooms.find(o=>o.id===a);if(i){const{cx:o,cy:r}=N(i),s=8;e.poly([o,r-s,o+s,r,o,r+s,o-s,r]),e.fill({color:16766720}),e.poly([o,r-s,o+s,r,o,r+s,o-s,r]),e.stroke({color:16777215,width:1.5})}}_buildHTMLPanel(){const t=document.getElementById("panel-dungeon");t&&t.remove();const e=document.createElement("div");e.id="panel-dungeon",e.className="dungeon-panel",e.style.cssText=`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: clamp(220px, 22vw, 320px);
      background: rgba(8, 6, 4, 0.92);
      border-left: 1px solid #5a4a2a;
      padding: 16px;
      color: #ddccaa;
      font-family: Georgia, 'Times New Roman', serif;
      z-index: 150;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-sizing: border-box;
    `;const a=d.getDef(this._dungeonType);e.innerHTML=`
      <div id="dungeon-title" style="
        font-size: clamp(14px, 1.5vw, 18px);
        font-weight: bold;
        color: #c8a020;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border-bottom: 1px solid #3a2a0a;
        padding-bottom: 8px;
      ">${a?.name??"Dungeon"}</div>

      <div id="dungeon-room-info" style="
        background: rgba(20, 15, 8, 0.8);
        border: 1px solid #3a2a0a;
        border-radius: 3px;
        padding: 10px;
        font-size: clamp(11px, 1.1vw, 13px);
        line-height: 1.6;
      ">Loading...</div>

      <div id="dungeon-enemies" style="
        font-size: clamp(11px, 1.1vw, 12px);
        color: #cc6655;
        min-height: 20px;
      "></div>

      <div id="dungeon-loot" style="
        font-size: clamp(11px, 1.1vw, 12px);
        color: #ddaa00;
        min-height: 20px;
      "></div>

      <div style="display: flex; flex-direction: column; gap: 6px;" id="dungeon-actions">
        <button id="btn-dungeon-explore" class="dungeon-btn" style="${this._btnStyle()}">Explore</button>
        <button id="btn-dungeon-fight"   class="dungeon-btn" style="${this._btnStyle("danger")}">Fight</button>
        <button id="btn-dungeon-loot"    class="dungeon-btn" style="${this._btnStyle("gold")}">Collect Loot</button>
        <button id="btn-dungeon-leave"   class="dungeon-btn" style="${this._btnStyle()}">Leave Dungeon</button>
      </div>

      <div id="dungeon-nav-rooms" style="
        font-size: clamp(10px, 1vw, 12px);
        color: #9a8a6a;
        border-top: 1px solid #2a1a0a;
        padding-top: 8px;
      "><strong style="color:#c8a020;">Connected rooms:</strong><div id="dungeon-nav-list" style="margin-top:4px;"></div></div>

      <div id="dungeon-status" style="
        font-size: clamp(9px, 0.9vw, 11px);
        color: #6a5a4a;
        text-align: center;
      "></div>
    `,document.body.appendChild(e),this._panel=e,document.getElementById("btn-dungeon-explore")?.addEventListener("click",()=>this._onExplore()),document.getElementById("btn-dungeon-fight")?.addEventListener("click",()=>this._onFight()),document.getElementById("btn-dungeon-loot")?.addEventListener("click",()=>this._onLoot()),document.getElementById("btn-dungeon-leave")?.addEventListener("click",()=>this._onLeave()),this._updatePanel()}_btnStyle(t="default"){const e=`
      background: #1a1208;
      border: 1px solid #5a4a2a;
      color: #ddccaa;
      padding: 8px 10px;
      cursor: pointer;
      font-size: clamp(11px, 1.1vw, 13px);
      font-family: Georgia, serif;
      border-radius: 3px;
      text-align: left;
      width: 100%;
      transition: background 0.15s;
    `;return t==="danger"?e+"color: #ff8877; border-color: #7a2a2a;":t==="gold"?e+"color: #ddaa00; border-color: #7a5a00;":e}_updatePanel(){const t=d.getState();if(!t||!this._panel)return;const e=d.getCurrentRoom();if(!e)return;const a=d.getDef(this._dungeonType),i=document.getElementById("dungeon-room-info");if(i){const c=e.type.charAt(0).toUpperCase()+e.type.slice(1),l=e.cleared?'<span style="color:#20aa40">Cleared</span>':"";i.innerHTML=`
        <div style="font-weight:bold; color:#e8d8a0; margin-bottom:4px;">${c} ${l}</div>
        <div style="color:#9a8a6a; font-size:0.9em;">${a?.description??""}</div>
      `}const o=document.getElementById("dungeon-enemies");if(o)if(!e.cleared&&e.encounter?.present){const c=e.encounter.enemies.map(x=>x.replace(/_/g," ").replace(/\b\w/g,k=>k.toUpperCase())).join(", "),l=e.encounter.isBoss?' <span style="color:#ff5533">[BOSS]</span>':"";o.innerHTML=`Enemies: ${c}${l}`}else o.innerHTML="";const r=document.getElementById("dungeon-loot");if(r)if(e.cleared&&e.loot?.items?.length>0){const c=e.loot.items.map(l=>l.replace(/_/g," ").replace(/\b\w/g,x=>x.toUpperCase())).join(", ");r.innerHTML=`Loot available: ${c}`+(e.loot.gold>0?` + ${e.loot.gold} gold`:"")}else!e.cleared&&e.loot?.items?.length>0?r.innerHTML="Loot here (clear room first)":r.innerHTML="";const s=document.getElementById("btn-dungeon-explore"),u=document.getElementById("btn-dungeon-fight"),h=document.getElementById("btn-dungeon-loot"),b=document.getElementById("btn-dungeon-leave"),m=!e.cleared&&e.encounter?.present,y=e.cleared&&e.loot?.items?.length>0,w=e.type==="entrance";s&&(s.style.display=!m&&!e.cleared?"block":"none"),u&&(u.style.display=m?"block":"none"),h&&(h.style.display=y?"block":"none"),b&&(b.style.display=w?"block":"none");const $=document.getElementById("dungeon-nav-list");if($){const c=d.getConnectedRooms(e.id);if(c.length===0)$.innerHTML='<span style="color:#4a3a2a">No exits</span>';else{$.innerHTML=c.map(l=>{const x=l.type.charAt(0).toUpperCase()+l.type.slice(1),k=l.visited?"":' <span style="color:#4a4a6a">[unknown]</span>',P=l.cleared?' <span style="color:#20aa40">✓</span>':"";return`<div style="margin:2px 0;">
            <button onclick="window.__dungeonNav_${l.id}()" style="
              background: none; border: none; color: #aaa89a; cursor: pointer;
              font-family: Georgia, serif; font-size: 0.95em; text-align: left;
              padding: 2px 0; text-decoration: underline;
            ">${x}${k}${P}</button>
          </div>`}).join("");for(const l of c)window[`__dungeonNav_${l.id}`]=()=>this._navigateToRoom(l.id)}}const E=document.getElementById("dungeon-status");if(E){const c=t.rooms.length,l=t.rooms.filter(x=>x.cleared).length;E.textContent=`${l}/${c} rooms cleared`}}_onExplore(){const t=d.getCurrentRoom();if(t){if(t.cleared){this._showStatus("Room already explored.");return}d.clearRoom(t.id),p.dungeonState=d.getState(),g.event(`[dungeon] Explored room; id=${t.id} type=${t.type}`),this._showStatus("You explore the room carefully."),this._redrawDungeon(),this._updatePanel()}}_onFight(){const t=d.getCurrentRoom();if(!t||!t.encounter?.present){this._showStatus("Nothing to fight here.");return}g.event(`[dungeon] Fight triggered; room=${t.id} enemies=${t.encounter.enemies}`);const e=t.encounter.enemies.map((i,o)=>({id:`dungeon_enemy_${o}`,type:i,name:i.replace(/_/g," ").replace(/\b\w/g,r=>r.toUpperCase()),level:this._regionLevel+(t.encounter.isBoss?2:0)})),a=window.__partyChars??[];B.transition("combat",{partyChars:a,enemies:e,sourceEncounter:{type:"combat",dungeonRoomId:t.id,isDungeon:!0},onCombatEnd:i=>this._onCombatResult(t.id,i)})}_onCombatResult(t,e){e?.victory&&(d.clearRoom(t),p.dungeonState=d.getState(),g.event(`[dungeon] Combat won; room=${t} cleared`))}_onLoot(){const t=d.getCurrentRoom();if(!t||!t.cleared||!t.loot?.items?.length){this._showStatus("Nothing to loot here.");return}const e=t.loot;g.event(`[dungeon] Looted room; id=${t.id} items=${JSON.stringify(e.items)} gold=${e.gold}`),e.gold>0&&(p.partyGold=(p.partyGold??0)+e.gold),t.loot=null,p.dungeonState=d.getState();const a=e.items.map(i=>i.replace(/_/g," ").replace(/\b\w/g,o=>o.toUpperCase())).join(", ");this._showStatus(`Looted: ${a}`+(e.gold>0?` + ${e.gold} gold`:"")),this._redrawDungeon(),this._updatePanel()}_onLeave(){if(!d.canExitDungeon()){this._showStatus("Return to the entrance to leave the dungeon.");return}g.event("[dungeon] Party leaving dungeon"),p.dungeonState=null,p.world?B.transition("localMap",{regionId:p.currentRegionId??0}):B.transition("worldMap")}_navigateToRoom(t){const e=d.getState();if(!e)return;if(!d.getConnectedRooms(e.currentRoomId).find(r=>r.id===t)){this._showStatus("You cannot reach that room from here.");return}const{room:o}=d.enterRoom(t);p.dungeonState=d.getState(),g.event(`[dungeon] Navigated to room; id=${t} type=${o?.type}`),this._redrawDungeon(),this._updatePanel()}_showStatus(t){const e=document.getElementById("dungeon-status");e&&(e.textContent=t,e.style.color="#c8a020",clearTimeout(this._statusTimer),this._statusTimer=setTimeout(()=>{if(e){const a=d.getState(),i=a?.rooms.length??0,o=a?.rooms.filter(r=>r.cleared).length??0;e.textContent=`${o}/${i} rooms cleared`,e.style.color="#6a5a4a"}},3e3))}_update(t){this._inputCooldown>0&&(this._inputCooldown-=t)}_onResize(){this._redrawDungeon()}_removeHTMLPanel(){this._panel&&(this._panel.remove(),this._panel=null);const t=d.getState();if(t)for(const e of t.rooms)delete window[`__dungeonNav_${e.id}`]}async destroy(){this._ticker&&this._renderer?.app?.ticker&&(this._renderer.app.ticker.remove(this._ticker),this._ticker=null),this._dungeonContainer&&(this._renderer.layers.world.removeChild(this._dungeonContainer),this._dungeonContainer.destroy({children:!0}),this._dungeonContainer=null),this._removeHTMLPanel(),this._resizeUnsub&&(this._resizeUnsub(),this._resizeUnsub=null),this._statusTimer&&(clearTimeout(this._statusTimer),this._statusTimer=null),window.__debug&&(delete window.__debug.getDungeonState,delete window.__debug.dungeonGoToRoom),g.info("[dungeon] DungeonScene destroyed")}}export{_e as default};
//# sourceMappingURL=DungeonScene-BXvUphV9.js.map
