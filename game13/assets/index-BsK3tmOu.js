(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class Q{constructor(e,t,a,s){this.canvas=e,this.ctx=e.getContext("2d"),this.uiOverlay=t,this.input=a,this.audio=s,this._stack=[]}push(e){const t=this._stack[this._stack.length-1];t!=null&&t.onPause&&t.onPause(),e.manager=this,this._stack.push(e),e.onEnter&&e.onEnter()}pop(){if(!this._stack.length)return;const e=this._stack.pop();e.onExit&&e.onExit(),e.destroy&&e.destroy();const t=this._stack[this._stack.length-1];t!=null&&t.onResume&&t.onResume()}replace(e){this._stack.length&&this.pop(),this.push(e)}update(e){var t;(t=this._stack[this._stack.length-1])==null||t.update(e)}draw(){var t;const e=this.ctx;e.clearRect(0,0,this.canvas.width,this.canvas.height);for(const a of this._stack)(t=a.draw)==null||t.call(a,e)}get width(){return this.canvas.width}get height(){return this.canvas.height}}class K{constructor(e,t){this.canvas=e,this.overlay=t,this.mouse={x:0,y:0,down:!1},this.keys=new Set,this._clicks=[],this._listeners=[],this._bind("pointermove",e,a=>this._onMove(a)),this._bind("pointerdown",e,a=>this._onDown(a)),this._bind("pointerup",e,a=>this._onUp(a)),this._bind("keydown",window,a=>this.keys.add(a.code)),this._bind("keyup",window,a=>this.keys.delete(a.code))}_bind(e,t,a){t.addEventListener(e,a,{passive:!0}),this._listeners.push({event:e,target:t,handler:a})}_onMove(e){const t=this.canvas.getBoundingClientRect(),a=this.canvas.width/t.width,s=this.canvas.height/t.height;this.mouse.x=(e.clientX-t.left)*a,this.mouse.y=(e.clientY-t.top)*s}_onDown(e){this._onMove(e),this.mouse.down=!0}_onUp(e){this._onMove(e),this.mouse.down=!1,this._clicks.push({x:this.mouse.x,y:this.mouse.y})}consumeClicks(){const e=this._clicks;return this._clicks=[],e}isKey(e){return this.keys.has(e)}destroy(){for(const{event:e,target:t,handler:a}of this._listeners)t.removeEventListener(e,a)}}class Z{constructor(){this._ctx=null,this._masterGain=null,this._musicGain=null,this._sfxGain=null,this._currentTrack=null,this._nodes=[],this.masterVolume=.8,this.musicVolume=.6,this.sfxVolume=.8,this._started=!1}_ensureContext(){this._ctx||(this._ctx=new(window.AudioContext||window.webkitAudioContext),this._masterGain=this._ctx.createGain(),this._masterGain.gain.value=this.masterVolume,this._masterGain.connect(this._ctx.destination),this._musicGain=this._ctx.createGain(),this._musicGain.gain.value=this.musicVolume,this._musicGain.connect(this._masterGain),this._sfxGain=this._ctx.createGain(),this._sfxGain.gain.value=this.sfxVolume,this._sfxGain.connect(this._masterGain))}resume(){this._ensureContext(),this._ctx.state==="suspended"&&this._ctx.resume(),this._started=!0}playTitleMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:55,type:"sine",gain:.08,detune:0},{freq:82.5,type:"sine",gain:.05,detune:5},{freq:110,type:"sine",gain:.04,detune:-3}]),this._addPad([220,277.2,329.6,440],.03)}playCombatMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:110,type:"sawtooth",gain:.04,detune:0},{freq:165,type:"square",gain:.02,detune:8}]),this._addPulse(110,.12,.4)}playTownMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:220,type:"triangle",gain:.06,detune:0},{freq:330,type:"sine",gain:.04,detune:2},{freq:440,type:"sine",gain:.03,detune:-2}]),this._addPad([220,293.7,369.9],.04)}_buildAmbientLayer(e){if(!this._ctx)return[];const t=[];for(const a of e){const s=this._ctx.createOscillator(),i=this._ctx.createGain(),r=this._ctx.createBiquadFilter();s.type=a.type,s.frequency.value=a.freq,s.detune.value=a.detune,r.type="lowpass",r.frequency.value=800,i.gain.value=0,s.connect(r),r.connect(i),i.connect(this._musicGain),s.start(),i.gain.linearRampToValueAtTime(a.gain,this._ctx.currentTime+3),t.push(s,i,r)}return this._nodes.push(...t),t}_addPad(e,t){if(!this._ctx)return;const a=4;let s=this._ctx.currentTime+2;const i=()=>{if(this._ctx){for(const r of e){const o=this._ctx.createOscillator(),d=this._ctx.createGain();o.type="sine",o.frequency.value=r,d.gain.value=0,o.connect(d),d.connect(this._musicGain),o.start(s),d.gain.setValueAtTime(0,s),d.gain.linearRampToValueAtTime(t,s+.5),d.gain.setValueAtTime(t,s+a-1),d.gain.linearRampToValueAtTime(0,s+a),o.stop(s+a+.1)}s+=a}};for(let r=0;r<20;r++)i()}_addPulse(e,t,a){if(!this._ctx)return;let s=this._ctx.currentTime+.5;for(let i=0;i<60;i++){const r=this._ctx.createOscillator(),o=this._ctx.createGain();r.type="square",r.frequency.value=e,o.gain.value=0,r.connect(o),o.connect(this._musicGain),r.start(s),o.gain.setValueAtTime(0,s),o.gain.linearRampToValueAtTime(t,s+.02),o.gain.linearRampToValueAtTime(0,s+a*.8),r.stop(s+a),s+=a}}_stopCurrentTrack(){var e,t;for(const a of this._nodes){try{(e=a.stop)==null||e.call(a)}catch{}try{(t=a.disconnect)==null||t.call(a)}catch{}}this._nodes=[]}playSfx(e){if(this.resume(),!this._ctx)return;const t=this._ctx,a=t.currentTime,s=t.createOscillator(),i=t.createGain();switch(s.connect(i),i.connect(this._sfxGain),e){case"click":s.frequency.value=880,s.type="sine",i.gain.setValueAtTime(.15,a),i.gain.exponentialRampToValueAtTime(.001,a+.1),s.start(a),s.stop(a+.1);break;case"hit":s.frequency.value=200,s.type="sawtooth",i.gain.setValueAtTime(.3,a),i.gain.exponentialRampToValueAtTime(.001,a+.2),s.start(a),s.stop(a+.2);break;case"spell":s.frequency.setValueAtTime(440,a),s.frequency.linearRampToValueAtTime(880,a+.3),s.type="sine",i.gain.setValueAtTime(.2,a),i.gain.exponentialRampToValueAtTime(.001,a+.4),s.start(a),s.stop(a+.4);break;case"victory":s.frequency.setValueAtTime(440,a),s.frequency.setValueAtTime(554,a+.15),s.frequency.setValueAtTime(659,a+.3),s.frequency.setValueAtTime(880,a+.45),s.type="sine",i.gain.setValueAtTime(.25,a),i.gain.setValueAtTime(.25,a+.6),i.gain.exponentialRampToValueAtTime(.001,a+1),s.start(a),s.stop(a+1);break}}setMasterVolume(e){this.masterVolume=e,this._masterGain&&(this._masterGain.gain.value=e)}setMusicVolume(e){this.musicVolume=e,this._musicGain&&(this._musicGain.gain.value=e)}setSfxVolume(e){this.sfxVolume=e,this._sfxGain&&(this._sfxGain.gain.value=e)}}function y(n,e,t={}){const a=document.createElement(n);e&&(a.className=e);for(const[s,i]of Object.entries(t))a.setAttribute(s,i);return a}function u(n){var e;(e=n==null?void 0:n.parentNode)==null||e.removeChild(n)}function C(n,e){if(document.getElementById(n))return;const t=document.createElement("style");t.id=n,t.textContent=e,document.head.appendChild(t)}const O=[{id:"warrior",name:"Warrior",role:"Frontline Tank",hook:"Shield Bash stuns enemies. Whirlwind hits all adjacent foes. Unbreakable when outnumbered.",armorType:"Heavy Armor · Sword / Hammer / 2H",primaryAttr:"STR",armorTier:"heavy",weapons:["sword","hammer","2h_sword","2h_axe"],skills:["shield_bash","battle_cry","whirlwind","unbreakable"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4L8 14v8l10 10 10-10v-8L18 4z"/><path d="M18 4v28M8 14h20"/></svg>'},{id:"paladin",name:"Paladin",role:"Holy Warrior",hook:"Holy Strike crits vs demons. Lay on Hands keeps allies alive. Consecration sustains long fights.",armorType:"Medium Armor · Sword / Scepter + Shield",primaryAttr:"STR",armorTier:"medium",weapons:["sword","scepter"],skills:["holy_strike","lay_on_hands","divine_shield","consecration"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 3l-14 6v9c0 8 7 14 14 16 7-2 14-8 14-16V9L18 3z"/><path d="M12 18l4 4 8-8"/></svg>'},{id:"ranger",name:"Ranger",role:"Precision Ranged",hook:"Aimed Shot ignores armor. Rain of Arrows blankets the entire enemy field for 3 rounds.",armorType:"Light Armor · Bow / Crossbow / Javelin",primaryAttr:"DEX",armorTier:"light",weapons:["bow","crossbow","javelin"],skills:["aimed_shot","multi_shot","smoke_trap","rain_of_arrows"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l26 26M5 5l8 2-2-8"/><circle cx="24" cy="12" r="4"/></svg>'},{id:"rogue",name:"Rogue",role:"Burst Assassin",hook:"200% Backstab on stunned targets. Death Mark makes enemies take 50% more damage from all sources.",armorType:"Light Armor · Dagger (dual wield)",primaryAttr:"DEX",armorTier:"light",weapons:["dagger"],skills:["backstab","poison_blade","shadow_step","death_mark"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 26L26 10M18 10l8-2-2 8"/><path d="M10 26c-2 2-4 2-4 0s0-2 2-4"/></svg>'},{id:"cleric",name:"Cleric",role:"Primary Healer",hook:"Mass Resurrection can auto-trigger on wipe. Sanctuary makes an ally temporarily untargetable.",armorType:"Light Armor · Staff / Scepter / Wand",primaryAttr:"INT",armorTier:"light",weapons:["staff","scepter","wand"],skills:["heal","smite","sanctuary","mass_resurrection"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4v28M4 18h28"/></svg>'},{id:"bard",name:"Bard",role:"Support Maestro",hook:"Ballad of Valor gives one hero two turns per round. Song of Ruin strips all enemy buffs at once.",armorType:"Light Armor · Dagger / Wand",primaryAttr:"INT",armorTier:"light",weapons:["dagger","wand"],skills:["inspiring_tune","discordant_wail","ballad_of_valor","song_of_ruin"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 28c0-3 3-5 8-5s8 2 8 5"/><path d="M14 23V10l12-3v13"/><circle cx="10" cy="28" r="3"/><circle cx="24" cy="25" r="3"/></svg>'},{id:"mage",name:"Mage",role:"AoE Glass Cannon",hook:"Fireball torches entire enemy packs. Blizzard hits all enemies for 3 rounds. Arcane Surge: 400% INT.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["magic_missile","fireball","blizzard","arcane_surge"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>'},{id:"necromancer",name:"Necromancer",role:"Army Builder",hook:"Raise Dead turns corpses into skeleton allies. Death Coil applies Poison AND Bleed to all enemies.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["bone_spike","raise_dead","life_drain","death_coil"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="8"/><path d="M14 14v5M22 14v5M10 28c0-5 4-9 8-9s8 4 8 9"/></svg>'},{id:"warlock",name:"Warlock",role:"Chaos Dealer",hook:"Corruption spreads on enemy death. Soul Pact doubles all DoT at cost of own HP.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["corruption","hellfire","soul_pact","void_rift"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-4 6-8 8-8 14a8 8 0 0016 0c0-6-4-8-8-14z"/><path d="M14 22c0 2.2 1.8 4 4 4s4-1.8 4-4"/></svg>'},{id:"demon_hunter",name:"Demon Hunter",role:"Specialist Killer",hook:"+50% damage vs demons. Vengeance stacks from fallen allies then unleashes devastating burst.",armorType:"Light Armor · Crossbow / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["crossbow","dagger"],skills:["demon_bolt","glaive_toss","fel_sight","vengeance"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L18 6l12 24"/><path d="M11 22h14"/><path d="M18 6v5"/></svg>'},{id:"scavenger",name:"Scavenger",role:"Resource Specialist",hook:"Scrounge finds items mid-combat. Jackpot has 20% chance to loot Magic+ gear from each kill.",armorType:"Light/Medium · Any 1H weapon",primaryAttr:"DEX",armorTier:"light",weapons:["dagger","sword","hammer","javelin"],skills:["scrounge","thrown_junk","makeshift_bomb","jackpot"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="16" width="16" height="14" rx="2"/><path d="M6 16h24M14 16v-4a4 4 0 018 0v4"/></svg>'},{id:"swashbuckler",name:"Swashbuckler",role:"Flashy Duelist",hook:"Build Flair stacks with Flourish. Grandeur releases all stacks in one legendary strike.",armorType:"Light Armor · Sword / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["sword","dagger"],skills:["riposte","flourish","taunt","grandeur"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L30 6M22 6l8-2-2 8"/><path d="M6 30a4 4 0 004-4"/></svg>'},{id:"dragon_knight",name:"Dragon Knight",role:"Draconic Warrior",hook:"Choose fire/ice/lightning. Draconic Fury turns all attacks into group AoE for 2 rounds.",armorType:"Heavy/Medium · 2H Sword / 2H Axe",primaryAttr:"STR",armorTier:"heavy",weapons:["2h_sword","2h_axe"],skills:["dragon_claw","breath_weapon","dragon_scales","draconic_fury"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c6 4 12 10 12 16s-6 12-12 12S6 26 6 20c0-6 6-12 12-16z"/><path d="M18 4c-3 6 0 14 0 18"/><path d="M8 16c4-2 8-2 10 0"/></svg>'},{id:"pyromancer",name:"Pyromancer",role:"Fire Specialist",hook:"Stack Burn on multiple groups. Meteor ignites every enemy group simultaneously.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["flame_lance","ignite","pyroclasm","meteor"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-2 8 6 10 2 18a8 8 0 01-8-8c0-2 1-4 2-5-1 4 2 6 4 4 2-8-4-6-4-14"/><path d="M18 22a4 4 0 000 8"/></svg>'}],G={version:1,hero:null,party:[],companions:[],bench:[],gold:150,inventory:[],storyFlags:{},quests:[],act:1,zoneId:"border_roads",nodeId:"start",visitedNodes:new Set,playTimeSeconds:0};let g={...G};const m={get(){return g},init(n){g={...G,hero:n,party:[n],gold:n.gold??150,visitedNodes:new Set(["start"])}},load(n){g={...n,visitedNodes:new Set(n.visitedNodes||["start"])}},toSaveData(){return{...g,visitedNodes:[...g.visitedNodes]}},setFlag(n,e=!0){g.storyFlags[n]=e},getFlag(n){return g.storyFlags[n]},addGold(n){g.gold=Math.max(0,(g.gold||0)+n)},getGold(){return g.gold||0},addToInventory(n){g.inventory.push(n)},removeFromInventory(n){g.inventory=g.inventory.filter(e=>e.id!==n)},getParty(){return g.party},getCompanions(){return g.companions},getAllCombatants(){return[...g.party,...g.companions]},addToParty(n){return g.party.length<4?(g.party.push(n),!0):!1},addToCompanions(n){return g.companions.length<4?(g.companions.push(n),!0):!1},addToBench(n){g.bench.push(n)},visitNode(n){g.visitedNodes.add(n)},hasVisited(n){return g.visitedNodes.has(n)}},b={COMBAT:"combat",DIALOG:"dialog",TOWN:"town",TREASURE:"treasure",AMBUSH:"ambush",BOSS:"boss",LORE:"lore"},ee=[{id:"border_roads",name:"The Border Roads",act:1,zoneIndex:0,nodes:[{id:"start",type:"town",name:"Emberglen",x:.1,y:.5,exits:["road_ambush"]},{id:"road_ambush",type:"dialog",name:"Shady Wanderer",x:.3,y:.4,exits:["crossroads_a","crossroads_b"]},{id:"crossroads_a",type:"combat",name:"Goblin Scout Pack",x:.5,y:.25,exits:["ruined_watch"]},{id:"crossroads_b",type:"lore",name:"Scorched Village",x:.5,y:.65,exits:["ruined_watch"]},{id:"ruined_watch",type:"combat",name:"Ruined Watchtower",x:.7,y:.5,exits:["border_boss"]},{id:"border_boss",type:"boss",name:"Warlord's Vanguard",x:.9,y:.5,exits:[]}],enemies:{goblin_scout_pack:{name:"Goblin Scout Pack",groups:[{id:"goblin_scout",name:"Goblin Scout",count:3,hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:12,xpValue:15,gold:[2,6]}]},ruined_watchtower:{name:"Corrupted Outpost",groups:[{id:"goblin_warrior",name:"Goblin Warrior",count:2,hp:35,maxHp:35,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12]},{id:"goblin_scout",name:"Goblin Scout",count:2,hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:12,xpValue:15,gold:[2,6]}]}}},{id:"thornwood",name:"Thornwood Forest",act:1,zoneIndex:1,nodes:[{id:"forest_enter",type:"dialog",name:"Forest Edge",x:.1,y:.5,exits:["spider_hollow","hidden_path"]},{id:"spider_hollow",type:"combat",name:"Spider Hollow",x:.3,y:.3,exits:["goblin_camp"]},{id:"hidden_path",type:"lore",name:"Ancient Runestone",x:.3,y:.7,exits:["goblin_camp"]},{id:"goblin_camp",type:"combat",name:"Goblin Camp",x:.55,y:.5,exits:["seer_hut","treasure_grove"]},{id:"seer_hut",type:"dialog",name:"The Seer's Hut",x:.75,y:.3,exits:["thornwood_boss"]},{id:"treasure_grove",type:"treasure",name:"Hidden Grove",x:.75,y:.7,exits:["thornwood_boss"]},{id:"thornwood_boss",type:"boss",name:"The Veil Wardens",x:.92,y:.5,exits:[]}],enemies:{}}],te=.5,ae=.2;class q{constructor(e,t,a,s){this.manager=e,this.audio=t,this.hero=a,this.encounter=s,this._el=null,this._heroes=[this._heroToCombatant(a)],this._enemyGroups=s.enemies.map((i,r)=>this._buildEnemyGroup(i,r)),this._allEnemies=this._enemyGroups.flat(),this._log=[],this._round=1,this._turnIdx=0,this._turnTimer=0,this._phase="START",this._particles=[],this._flashTargets=new Map,this._combatants=[],this._t=0,this._startDelay=1,this._animQueue=[],this._buildTurnOrder()}_heroToCombatant(e){const t=e.attrs;return{id:e.id,name:e.name,class:e.class,isHero:!0,hp:50+t.CON*10,maxHp:50+t.CON*10,mp:30+t.INT*8,maxMp:30+t.INT*8,dmg:[Math.max(1,Math.round(t.STR*1.2)),Math.max(4,Math.round(t.STR*2.2))],armor:0,hit:Math.min(95,70+Math.round(t.DEX*1.2)),dodge:Math.min(40,5+Math.round(t.DEX*.8)),initiative:t.DEX,alive:!0,stance:"ready",x:0,y:0,offsetX:0,offsetY:0}}_buildEnemyGroup(e,t){const a=[];for(let s=0;s<e.count;s++)a.push({id:`${e.id}_${t}_${s}`,name:e.name,groupIdx:t,isHero:!1,hp:e.hp,maxHp:e.maxHp,dmg:[...e.dmg],armor:e.armor,hit:e.hit,dodge:e.dodge,initiative:5+Math.random()*5,alive:!0,stance:"ready",xpValue:e.xpValue,gold:e.gold,x:0,y:0,offsetX:0,offsetY:0});return a}_buildTurnOrder(){const e=[...this._heroes,...this._allEnemies].filter(t=>t.alive);e.forEach(t=>{t._roll=t.initiative+Math.random()*10}),e.sort((t,a)=>a._roll-t._roll),this._turnOrder=e,this._turnIdx=0}onEnter(){this.audio.playCombatMusic(),this._build()}_build(){C("combat-styles",se),this._el=y("div","combat-screen"),this._el.innerHTML=`
      <div class="combat-log-panel" id="combat-log">
        <div class="log-title">Combat Log</div>
        <div class="log-entries" id="log-entries"></div>
      </div>
      <div class="combat-hud-bottom" id="hud-bottom"></div>
    `,this.manager.uiOverlay.appendChild(this._el),this._renderHud()}_renderHud(){const e=this._el.querySelector("#hud-bottom");e.innerHTML=`
      <div class="hud-party">
        ${this._heroes.map(t=>`
          <div class="hud-member" id="hud-${t.id}">
            <div class="hm-name">${t.name}</div>
            <div class="hm-bars">
              <div class="hm-bar-wrap"><div class="hm-bar hm-hp" id="hp-bar-${t.id}" style="width:100%"></div></div>
              <div class="hm-bar-wrap"><div class="hm-bar hm-mp" id="mp-bar-${t.id}" style="width:100%"></div></div>
            </div>
            <div class="hm-vals"><span id="hp-val-${t.id}">${t.hp}</span> HP</div>
          </div>
        `).join("")}
      </div>
      <div class="hud-round">Round <span id="round-num">1</span></div>
    `}_updateHud(){var t,a,s,i;for(const r of this._heroes){const o=(t=this._el)==null?void 0:t.querySelector(`#hp-bar-${r.id}`),d=(a=this._el)==null?void 0:a.querySelector(`#mp-bar-${r.id}`),h=(s=this._el)==null?void 0:s.querySelector(`#hp-val-${r.id}`);o&&(o.style.width=`${Math.max(0,r.hp/r.maxHp*100)}%`),d&&(d.style.width=`${Math.max(0,r.mp/r.maxMp*100)}%`),h&&(h.textContent=Math.max(0,r.hp))}const e=(i=this._el)==null?void 0:i.querySelector("#round-num");e&&(e.textContent=this._round)}_addLog(e,t="normal"){var i;this._log.push({msg:e,type:t});const a=(i=this._el)==null?void 0:i.querySelector("#log-entries");if(!a)return;const s=y("div",`log-entry log-${t}`);for(s.textContent=e,a.appendChild(s);a.children.length>8;)a.removeChild(a.firstChild);a.scrollTop=a.scrollHeight}update(e){if(this._t+=e,this._phase==="START"){this._t>=this._startDelay&&(this._phase="PLAYING",this._t=0,this._addLog(`Round ${this._round} begins!`,"round"));return}if(this._phase==="PLAYING"){for(const t of this._animQueue)t.progress=Math.min(1,t.progress+e/t.duration);this._animQueue=this._animQueue.filter(t=>t.progress<1);for(const[t,a]of this._flashTargets){const s=a-e;s<=0?this._flashTargets.delete(t):this._flashTargets.set(t,s)}this._particles=this._particles.filter(t=>(t.life-=e,t.x+=t.vx,t.y+=t.vy,t.vy+=30*e,t.life>0)),this._turnTimer+=e,!(this._turnTimer<te)&&(this._turnTimer=0,this._executeTurn())}}_executeTurn(){if(this._turnIdx>=this._turnOrder.length){this._round++,this._buildTurnOrder(),this._addLog(`── Round ${this._round} ──`,"round");return}const e=this._turnOrder[this._turnIdx];if(this._turnIdx++,!e.alive)return;const t=e.isHero?this._allEnemies.filter(c=>c.alive):this._heroes.filter(c=>c.alive);if(!t.length)return;const a=t[Math.floor(Math.random()*t.length)],s=Math.random()*100,i=Math.max(5,Math.min(95,e.hit-a.dodge));if(!(s<i)){this._addLog(`${e.name} misses ${a.name}.`,"miss"),e.stance="attack",setTimeout(()=>{e.stance="ready"},400);return}const o=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),d=Math.max(1,o-a.armor);a.hp-=d,e.stance="attack",this._flashTargets.set(a.id,ae),this._spawnHitParticles(a),this.audio.playSfx("hit"),setTimeout(()=>{e.stance="ready"},400),this._addLog(`${e.name} hits ${a.name} for ${d} damage.`,e.isHero?"hero":"enemy"),this._updateHud(),a.hp<=0&&(a.hp=0,a.alive=!1,a.stance="death",this._addLog(`${a.name} is defeated!`,"death"));const h=this._allEnemies.every(c=>!c.alive),l=this._heroes.every(c=>!c.alive);h?(setTimeout(()=>this._victory(),800),this._phase="VICTORY"):l&&(setTimeout(()=>this._defeat(),800),this._phase="DEFEAT")}_spawnHitParticles(e){const t=["#e8a020","#ff6040","#f0c060"];for(let a=0;a<6;a++)this._particles.push({x:e.x+e.offsetX,y:e.y+e.offsetY,vx:(Math.random()-.5)*80,vy:-(Math.random()*60+20),size:Math.random()*4+2,color:t[Math.floor(Math.random()*t.length)],life:Math.random()*.4+.2})}_victory(){this.audio.playSfx("victory");let e=0,t=0;for(const a of this._allEnemies)e+=a.xpValue,t+=a.gold[0]+Math.floor(Math.random()*(a.gold[1]-a.gold[0]+1));this.hero.xp=(this.hero.xp||0)+e,this.hero.gold=(this.hero.gold||0)+t,this._showEndModal("Victory!",`
      <div class="end-rewards">
        <div class="end-reward"><span class="er-label">XP Gained</span><span class="er-val">+${e}</span></div>
        <div class="end-reward"><span class="er-label">Gold Found</span><span class="er-val">+${t} <svg viewBox="0 0 16 16" width="14" fill="#e8a020"><circle cx="8" cy="8" r="7"/></svg></span></div>
      </div>
    `,"victory",()=>this.manager.replace(new $(this.manager,this.audio,this.hero)))}_defeat(){const e=Math.floor((this.hero.gold||0)*.1);this.hero.gold=Math.max(0,(this.hero.gold||0)-e),this._showEndModal("Defeated",`
      <p style="color:#c04030">Your party has fallen. You are returned to Emberglen.</p>
      ${e>0?`<p style="color:#8a7a6a;font-size:0.8rem;margin-top:0.5rem">Gold lost: ${e}</p>`:""}
    `,"defeat",()=>this.manager.replace(new $(this.manager,this.audio,this.hero)))}_showEndModal(e,t,a,s){const i=y("div",`combat-end-modal end-${a}`);i.innerHTML=`
      <div class="cem-box">
        <div class="cem-title">${e}</div>
        <div class="cem-body">${t}</div>
        <button class="cem-btn">Continue</button>
      </div>
    `,i.querySelector(".cem-btn").addEventListener("click",()=>{this.audio.playSfx("click"),s()}),this._el.appendChild(i)}draw(e){const t=this.manager.width,a=this.manager.height,s=this.encounter.background||"#0d1a10";e.fillStyle=s,e.fillRect(0,0,t,a);const i=e.createLinearGradient(0,0,0,a*.6);i.addColorStop(0,"rgba(10,6,8,0.6)"),i.addColorStop(1,"rgba(10,6,8,0)"),e.fillStyle=i,e.fillRect(0,0,t,a*.6);const r=a*.62;e.fillStyle="#0a1408",e.fillRect(0,r,t,a-r),e.fillStyle="rgba(64,168,96,0.15)",e.fillRect(0,r,t,3);const o=t*.2,d=r-10;this._heroes.forEach((l,c)=>{l.x=o+c*60,l.y=d,this._drawCombatant(e,l,!0)});const h=t*.65;this._enemyGroups.forEach((l,c)=>{const p=h+c*90;l.forEach((f,w)=>{f.x=p,f.y=d-w*18,this._drawCombatant(e,f,!1)})}),e.save();for(const l of this._particles)e.globalAlpha=l.life,e.fillStyle=l.color,e.shadowBlur=8,e.shadowColor=l.color,e.beginPath(),e.arc(l.x,l.y,l.size,0,Math.PI*2),e.fill();if(e.shadowBlur=0,e.globalAlpha=1,e.restore(),this._phase==="START"){const l=Math.min(this._t/.5,1);e.save(),e.globalAlpha=l,e.font=`900 ${Math.round(t*.06)}px Cinzel, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=30,e.shadowColor="#c04030",e.fillStyle="#f0e8d8",e.fillText(this.encounter.name,t/2,a*.3),e.restore()}}_drawCombatant(e,t,a){if(!t.alive&&t.stance!=="death")return;const s=t.x+(t.offsetX||0),i=t.y+(t.offsetY||0),r=this._flashTargets.has(t.id);e.save(),e.fillStyle="rgba(0,0,0,0.3)",e.beginPath(),e.ellipse(s,i+2,18,6,0,0,Math.PI*2),e.fill();const o=a?52:40,d=t.alive?1:.4;e.globalAlpha=d,r&&(e.globalAlpha=d,e.shadowBlur=20,e.shadowColor="#ff4040");const h=a?this._heroColor(t.class):"#8B4513",l=a?"#e8a020":"#c0392b";if(e.fillStyle=r?"#ff8060":h,e.beginPath(),e.roundRect(s-o*.3,i-o,o*.6,o*.5,4),e.fill(),e.beginPath(),e.arc(s,i-o*.8,o*.22,0,Math.PI*2),e.fill(),e.fillStyle=r?"#ff6040":l,e.fillRect(s-o*.2,i-o*.5,o*.15,o*.45),e.fillRect(s+o*.05,i-o*.5,o*.15,o*.45),t.stance==="attack"&&a&&(e.fillStyle="#e8a020",e.beginPath(),e.moveTo(s+o*.3,i-o*.7),e.lineTo(s+o*.55,i-o*.45),e.lineTo(s+o*.35,i-o*.3),e.closePath(),e.fill()),t.alive||(e.strokeStyle="#ff4040",e.lineWidth=2,e.beginPath(),e.moveTo(s-5,i-o*.85),e.lineTo(s-2,i-o*.75),e.moveTo(s-2,i-o*.85),e.lineTo(s-5,i-o*.75),e.moveTo(s+2,i-o*.85),e.lineTo(s+5,i-o*.75),e.moveTo(s+5,i-o*.85),e.lineTo(s+2,i-o*.75),e.stroke()),e.shadowBlur=0,e.globalAlpha=1,t.alive){const c=o*1.2,p=4,f=s-c/2,w=i-o-10;e.fillStyle="rgba(0,0,0,0.5)",e.fillRect(f,w,c,p);const _=Math.max(0,t.hp/t.maxHp),v=_>.5?"#40c870":_>.25?"#e8a020":"#c04030";e.fillStyle=v,e.fillRect(f,w,c*_,p),a||(e.font="10px Inter, sans-serif",e.textAlign="center",e.fillStyle="rgba(240,232,216,0.7)",e.fillText(t.name,s,w-3))}e.restore()}_heroColor(e){return{warrior:"#607080",paladin:"#d4af37",ranger:"#4a7a40",rogue:"#3a3050",cleric:"#e0d0a0",bard:"#8060a0",mage:"#4060c0",necromancer:"#503060",warlock:"#802040",demon_hunter:"#c04060",scavenger:"#806040",swashbuckler:"#c08020",dragon_knight:"#806020",pyromancer:"#c04020"}[e]||"#607080"}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}}const se=`
.combat-screen {
  position: absolute; inset: 0; pointer-events: none;
  font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.combat-screen > * { pointer-events: auto; }
.combat-log-panel {
  position: absolute; top: 12px; right: 12px;
  width: min(260px, 45vw); max-height: 180px;
  background: rgba(10,6,8,0.85); border: 1px solid rgba(232,160,32,0.2);
  border-radius: 8px; overflow: hidden; pointer-events: none;
}
.log-title {
  font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: #8a7a6a;
  padding: 0.4rem 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.log-entries { padding: 0.4rem 0.75rem; overflow-y: auto; max-height: 140px; display: flex; flex-direction: column; gap: 2px; }
.log-entry { font-size: 0.72rem; line-height: 1.4; color: #c0b090; }
.log-round { color: #e8a020; font-weight: 700; text-align: center; }
.log-hero { color: #90d8a8; }
.log-enemy { color: #d08080; }
.log-miss { color: #8a7a6a; font-style: italic; }
.log-death { color: #c04030; font-weight: 600; }
.combat-hud-bottom {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 0.75rem; background: rgba(10,6,8,0.85);
  border-top: 1px solid rgba(232,160,32,0.2);
  display: flex; align-items: center; justify-content: space-between;
}
.hud-party { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.hud-member { min-width: 120px; }
.hm-name { font-size: 0.75rem; font-weight: 700; font-family: 'Cinzel', serif; margin-bottom: 0.3rem; }
.hm-bars { display: flex; flex-direction: column; gap: 3px; }
.hm-bar-wrap { background: rgba(255,255,255,0.08); border-radius: 2px; height: 5px; overflow: hidden; }
.hm-bar { height: 100%; border-radius: 2px; transition: width 0.3s ease; }
.hm-hp { background: #40c870; }
.hm-mp { background: #4080c0; }
.hm-vals { font-size: 0.65rem; color: #8a7a6a; margin-top: 0.25rem; }
.hud-round { font-family: 'Cinzel', serif; font-size: 0.75rem; color: #8a7a6a; }
.combat-end-modal {
  position: absolute; inset: 0; display: flex;
  align-items: center; justify-content: center;
  background: rgba(0,0,0,0.7); pointer-events: auto;
}
.cem-box {
  background: #1a1218; border: 1px solid rgba(232,160,32,0.4);
  border-radius: 12px; padding: 2rem; text-align: center;
  max-width: 320px; width: 90%; animation: cemodalIn 0.4s ease;
}
@keyframes cemodalIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
.cem-title {
  font-family: 'Cinzel', serif; font-size: 1.5rem; font-weight: 900;
  color: #e8a020; margin-bottom: 1rem;
}
.end-defeat .cem-title { color: #c04030; }
.cem-body { font-size: 0.88rem; color: #c0b090; line-height: 1.6; margin-bottom: 1.5rem; }
.cem-btn {
  padding: 0.75rem 2rem; background: rgba(232,160,32,0.2);
  border: 1px solid rgba(232,160,32,0.5); border-radius: 6px;
  color: #e8a020; font-family: 'Cinzel', serif; font-weight: 700;
  cursor: pointer; min-height: 44px;
}
.cem-btn:hover { background: rgba(232,160,32,0.35); }
.end-rewards { display: flex; justify-content: center; gap: 2rem; margin: 1rem 0; }
.end-reward { text-align: center; }
.er-label { display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: #8a7a6a; }
.er-val { display: block; font-family: 'Cinzel', serif; font-size: 1.2rem; font-weight: 900; color: #e8a020; margin-top: 0.25rem; }
`,B={[b.COMBAT]:{color:"#c04030",label:"Combat"},[b.DIALOG]:{color:"#4080c0",label:"Encounter"},[b.TOWN]:{color:"#40a860",label:"Town"},[b.TREASURE]:{color:"#e8a020",label:"Treasure"},[b.AMBUSH]:{color:"#8a2020",label:"Ambush"},[b.BOSS]:{color:"#9040c0",label:"Boss"},[b.LORE]:{color:"#6a9040",label:"Discovery"}},ie={name:"Goblin Patrol",enemies:[{id:"goblin_scout",name:"Goblin Scout",count:3,hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:12,xpValue:15,gold:[2,6]},{id:"goblin_warrior",name:"Goblin Warrior",count:2,hp:35,maxHp:35,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12]}]};class N{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._zone=ee[0],this._hovered=null,this._t=0}onEnter(){this._build()}_build(){C("map-styles",re),this._el=y("div","map-screen"),this._el.innerHTML=`
      <div class="map-header">
        <button class="map-back" id="map-back">← Back to Town</button>
        <div class="map-zone-name">${this._zone.name}</div>
        <div class="map-act-tag">Act I · The Goblin Frontier</div>
      </div>
      <div class="map-canvas-wrap">
        <canvas id="map-canvas"></canvas>
        <div id="map-node-tooltip" class="map-node-tooltip" style="display:none"></div>
      </div>
      <div class="map-legend">
        ${Object.entries(B).map(([e,t])=>`<div class="legend-item"><div class="legend-dot" style="background:${t.color}"></div><span>${t.label}</span></div>`).join("")}
      </div>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#map-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._setupCanvas()}_setupCanvas(){const e=this._el.querySelector(".map-canvas-wrap"),t=this._el.querySelector("#map-canvas");t.width=e.clientWidth,t.height=e.clientHeight,t.addEventListener("click",a=>this._onClick(a,t)),t.addEventListener("mousemove",a=>this._onHover(a,t)),t.addEventListener("mouseleave",()=>{this._hovered=null,this._hideNodeTooltip()}),this._canvas=t,this._ctx=t.getContext("2d"),this._drawMap()}_nodePos(e,t,a){return{x:e.x*t,y:e.y*a}}_drawMap(){var d,h,l;const e=this._ctx,t=this._canvas.width,a=this._canvas.height,s=m.get(),i=e.createLinearGradient(0,0,t,a);i.addColorStop(0,"#080e08"),i.addColorStop(1,"#0d180e"),e.fillStyle=i,e.fillRect(0,0,t,a),e.strokeStyle="rgba(64,168,96,0.05)",e.lineWidth=1;for(let c=0;c<t;c+=40)e.beginPath(),e.moveTo(c,0),e.lineTo(c,a),e.stroke();for(let c=0;c<a;c+=40)e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke();const r=this._zone;for(const c of r.nodes){const p=this._nodePos(c,t,a);for(const f of c.exits){const w=r.nodes.find(T=>T.id===f);if(!w)continue;const _=this._nodePos(w,t,a),v=((d=s.visitedNodes)==null?void 0:d.has(c.id))&&((h=s.visitedNodes)==null?void 0:h.has(f));e.strokeStyle=v?"rgba(64,168,96,0.5)":"rgba(100,80,60,0.3)",e.lineWidth=v?2:1,e.setLineDash(v?[]:[5,4]),e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(_.x,_.y),e.stroke(),e.setLineDash([])}}for(const c of r.nodes){const p=this._nodePos(c,t,a),f=B[c.type]||{color:"#8a7a6a",label:c.type},w=(l=s.visitedNodes)==null?void 0:l.has(c.id),_=s.nodeId===c.id,v=this._hovered===c.id,T=this._isAccessible(c,r,s);if(_||v){const I=e.createRadialGradient(p.x,p.y,0,p.x,p.y,30);I.addColorStop(0,`${f.color}40`),I.addColorStop(1,"transparent"),e.fillStyle=I,e.beginPath(),e.arc(p.x,p.y,30,0,Math.PI*2),e.fill()}const x=c.type===b.BOSS?18:c.type===b.TOWN?16:13;e.save(),e.globalAlpha=T||w?1:.35,e.fillStyle=w||_?f.color:"rgba(20,15,10,0.9)",e.strokeStyle=f.color,e.lineWidth=_?3:v?2.5:1.5,e.shadowBlur=_?15:v?10:0,e.shadowColor=f.color,e.beginPath(),e.arc(p.x,p.y,x,0,Math.PI*2),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=w?"#0a0608":f.color,e.font=`bold ${x*.85}px Inter, sans-serif`,e.textAlign="center",e.textBaseline="middle";const J=c.type===b.BOSS?"B":c.type===b.TOWN?"T":c.type[0].toUpperCase();e.fillText(J,p.x,p.y),e.fillStyle=T?"#f0e8d8":"#8a7a6a",e.font=`${x<14?"10":"11"}px Inter, sans-serif`,e.fillText(c.name,p.x,p.y+x+13),e.restore()}const o=r.nodes.find(c=>c.id===s.nodeId);if(o){const c=this._nodePos(o,t,a);e.save(),e.fillStyle="#f0e8d8",e.shadowBlur=12,e.shadowColor="#e8a020",e.font="18px sans-serif",e.textAlign="center",e.fillText("★",c.x,c.y-26),e.restore()}}_isAccessible(e,t,a){var s,i;if((s=a.visitedNodes)!=null&&s.has(e.id)||a.nodeId===e.id)return!0;for(const r of t.nodes)if((i=a.visitedNodes)!=null&&i.has(r.id)&&r.exits.includes(e.id)||a.nodeId===r.id&&r.exits.includes(e.id))return!0;return!1}_onClick(e,t){const a=t.getBoundingClientRect(),s=(e.clientX-a.left)*(t.width/a.width),i=(e.clientY-a.top)*(t.height/a.height),r=m.get();for(const o of this._zone.nodes){const d=this._nodePos(o,t.width,t.height),h=Math.hypot(s-d.x,i-d.y),l=o.type===b.BOSS?18:14;if(h<=l+8){if(!this._isAccessible(o,this._zone,r))return;this.audio.playSfx("click"),this._navigateToNode(o);return}}}_onHover(e,t){const a=t.getBoundingClientRect(),s=(e.clientX-a.left)*(t.width/a.width),i=(e.clientY-a.top)*(t.height/a.height);let r=null;for(const o of this._zone.nodes){const d=this._nodePos(o,t.width,t.height);if(Math.hypot(s-d.x,i-d.y)<=20){r=o.id;break}}if(r!==this._hovered)if(this._hovered=r,this._drawMap(),r){const o=this._zone.nodes.find(h=>h.id===r),d=B[o.type]||{};this._showNodeTooltip(e,o,d)}else this._hideNodeTooltip()}_showNodeTooltip(e,t,a){const s=this._el.querySelector("#map-node-tooltip");s&&(s.innerHTML=`<div class="mntt-name">${t.name}</div><div class="mntt-type" style="color:${a.color}">${a.label}</div>`,s.style.display="block",s.style.left=`${e.clientX-this._el.getBoundingClientRect().left+12}px`,s.style.top=`${e.clientY-this._el.getBoundingClientRect().top-40}px`)}_hideNodeTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#map-node-tooltip");e&&(e.style.display="none")}_navigateToNode(e){switch(m.visitNode(e.id),m.get().nodeId=e.id,e.type){case b.TOWN:this.manager.pop();break;case b.COMBAT:case b.AMBUSH:{const t={...ie,name:e.name},s=m.get().party[0];this.manager.push(new q(this.manager,this.audio,s,t));break}case b.LORE:case b.DIALOG:this._showLoreModal(e);break;case b.TREASURE:this._showTreasureModal(e);break;case b.BOSS:{const t={name:e.name,enemies:[{id:"boss_goblin",name:"Grax the Veil-Touched",count:1,hp:180,maxHp:180,dmg:[12,22],armor:8,hit:80,dodge:10,xpValue:200,gold:[40,80]},{id:"goblin_warrior",name:"Goblin Warrior",count:3,hp:35,maxHp:35,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12]}]},a=m.get().party[0];this.manager.push(new q(this.manager,this.audio,a,t));break}}this._drawMap()}_showLoreModal(e){const t=y("div","map-modal");t.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title">${e.name}</div>
        <div class="mm-body" style="color:#c0b090;font-size:0.88rem;line-height:1.6">
          ${this._getLoreText(e.id)}
        </div>
        <button class="mm-btn">Continue</button>
      </div>
    `,t.querySelector(".mm-overlay").addEventListener("click",()=>u(t)),t.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("click"),u(t)}),this._el.appendChild(t)}_showTreasureModal(e){const t=y("div","map-modal");t.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title" style="color:#e8a020">Treasure Found!</div>
        <div class="mm-body">You discover a hidden cache among the roots of an ancient oak. Inside: <strong style="color:#e8a020">85 gold</strong> and a weathered map fragment.</div>
        <button class="mm-btn">Claim Reward</button>
      </div>
    `,t.querySelector(".mm-overlay").addEventListener("click",()=>u(t)),t.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("victory"),m.addGold(85),u(t)}),this._el.appendChild(t)}_getLoreText(e){return{crossroads_b:"The village is quiet. Too quiet. Scorched thatch still smolders on the rooftops, but the fires are old — three days at least. Whoever — whatever — drove these people out left no bodies. Only silence, and the faint smell of something wrong in the air. Like copper and rot.",hidden_path:'Half-buried in moss, the runestone pulses with a faint, sickly light. The runes are old — older than the kingdom itself. One phrase repeats, carved over and over in increasingly desperate strokes: "The veil does not hold." Mira the Seer would want to know about this.'}[e]||"There is nothing more to see here. The road calls you forward."}update(e){this._t+=e}draw(){}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}}const re=`
.map-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: #08100a; font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.map-header {
  display: flex; align-items: center; gap: 1rem;
  padding: 0.75rem 1.5rem; border-bottom: 1px solid rgba(232,160,32,0.15);
  background: rgba(0,0,0,0.3); flex-shrink: 0;
}
.map-back {
  background: none; border: none; color: #8a7a6a; font-size: 0.8rem;
  cursor: pointer; padding: 0.4rem 0.6rem; border-radius: 4px; min-height: 36px;
}
.map-back:hover { color: #f0e8d8; }
.map-zone-name { font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 700; color: #e8a020; flex: 1; }
.map-act-tag { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #40a860; }
.map-canvas-wrap { flex: 1; position: relative; overflow: hidden; }
#map-canvas { width: 100%; height: 100%; display: block; cursor: pointer; }
.map-node-tooltip {
  position: absolute; pointer-events: none; z-index: 10;
  background: rgba(10,6,8,0.92); border: 1px solid rgba(232,160,32,0.3);
  border-radius: 6px; padding: 0.4rem 0.75rem;
}
.mntt-name { font-size: 0.82rem; font-weight: 600; font-family: 'Cinzel', serif; }
.mntt-type { font-size: 0.68rem; margin-top: 0.1rem; }
.map-legend {
  display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem;
  padding: 0.5rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.2); flex-shrink: 0;
}
.legend-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.68rem; color: #8a7a6a; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.map-modal {
  position: absolute; inset: 0; z-index: 100;
  display: flex; align-items: center; justify-content: center;
}
.mm-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.75); }
.mm-box {
  position: relative; z-index: 1;
  background: #1a1218; border: 1px solid rgba(232,160,32,0.3);
  border-radius: 12px; padding: 2rem; max-width: 420px; width: 90%;
}
.mm-title { font-family: 'Cinzel', serif; font-size: 1.2rem; font-weight: 700; color: #f0e8d8; margin-bottom: 1rem; }
.mm-body { margin-bottom: 1.5rem; }
.mm-btn {
  padding: 0.7rem 1.5rem; background: rgba(232,160,32,0.15);
  border: 1px solid rgba(232,160,32,0.4); border-radius: 6px;
  color: #e8a020; font-family: 'Cinzel', serif; font-weight: 700;
  cursor: pointer; min-height: 44px;
}
.mm-btn:hover { background: rgba(232,160,32,0.28); }
`,oe={low:.7,medium:1,high:1.2,elite:1.4,exotic:1.6},ne={normal:0,magic:[1,2],rare:[3,4],legendary:[4,6]},M={normal:"#c8c8c8",magic:"#6080ff",rare:"#e8d020",legendary:"#ff8020"},le={dagger:{name:"Dagger",type:"weapon",subtype:"dagger",dmg:[3,7],speed:1.2,twoHanded:!1,statScaling:"dex",armorPen:.1},sword:{name:"Sword",type:"weapon",subtype:"sword",dmg:[6,14],speed:1,twoHanded:!1,statScaling:"str_dex"},wand:{name:"Wand",type:"weapon",subtype:"wand",dmg:[4,10],speed:1.1,twoHanded:!1,statScaling:"int",offHandOk:!0},scepter:{name:"Scepter",type:"weapon",subtype:"scepter",dmg:[5,12],speed:1,twoHanded:!1,statScaling:"int",offHandOk:!0},staff:{name:"Staff",type:"weapon",subtype:"staff",dmg:[8,20],speed:.9,twoHanded:!0,statScaling:"int",intMult:1.5},hammer:{name:"Hammer",type:"weapon",subtype:"hammer",dmg:[8,16],speed:.8,twoHanded:!1,statScaling:"str",stunChance:.1},sword2h:{name:"Greatsword",type:"weapon",subtype:"sword2h",dmg:[14,28],speed:.7,twoHanded:!0,statScaling:"str",strMult:1.5},axe2h:{name:"Greataxe",type:"weapon",subtype:"axe2h",dmg:[16,30],speed:.65,twoHanded:!0,statScaling:"str",bleedChance:.15},bow:{name:"Bow",type:"weapon",subtype:"bow",dmg:[8,16],speed:1,twoHanded:!0,statScaling:"dex",dexMult:1.3,ranged:!0},crossbow:{name:"Crossbow",type:"weapon",subtype:"crossbow",dmg:[12,22],speed:.7,twoHanded:!0,statScaling:"dex_str",ranged:!0},javelin:{name:"Javelin",type:"weapon",subtype:"javelin",dmg:[9,18],speed:.9,twoHanded:!1,statScaling:"str_dex",ranged:!0,throwable:!0}},de={cloth_helm:{name:"Hood",type:"armor",slot:"head",tier:"cloth",armor:1,dodgeBonus:0},light_helm:{name:"Leather Cap",type:"armor",slot:"head",tier:"light",armor:3,dodgeBonus:0},medium_helm:{name:"Chain Coif",type:"armor",slot:"head",tier:"medium",armor:5,dodgeBonus:-1},heavy_helm:{name:"War Helm",type:"armor",slot:"head",tier:"heavy",armor:8,dodgeBonus:-2},cloth_chest:{name:"Robes",type:"armor",slot:"chest",tier:"cloth",armor:2,dodgeBonus:0},light_chest:{name:"Leather Armor",type:"armor",slot:"chest",tier:"light",armor:6,dodgeBonus:0},medium_chest:{name:"Chain Shirt",type:"armor",slot:"chest",tier:"medium",armor:10,dodgeBonus:-2},heavy_chest:{name:"Plate Armor",type:"armor",slot:"chest",tier:"heavy",armor:16,dodgeBonus:-4},cloth_legs:{name:"Linen Leggings",type:"armor",slot:"legs",tier:"cloth",armor:1,dodgeBonus:0},light_legs:{name:"Leather Legs",type:"armor",slot:"legs",tier:"light",armor:4,dodgeBonus:0},medium_legs:{name:"Chain Legs",type:"armor",slot:"legs",tier:"medium",armor:7,dodgeBonus:-1},heavy_legs:{name:"Plate Legs",type:"armor",slot:"legs",tier:"heavy",armor:11,dodgeBonus:-3},shield:{name:"Shield",type:"armor",slot:"offhand",tier:"heavy",armor:5,dodgeBonus:5,blockChance:.2},ring:{name:"Ring",type:"accessory",slot:"ring",tier:"any",armor:0},necklace:{name:"Necklace",type:"accessory",slot:"necklace",tier:"any",armor:0}},ce={prefixes:[{id:"of_str",name:"Sturdy",stat:"str",min:1,max:4},{id:"of_dex",name:"Swift",stat:"dex",min:1,max:4},{id:"of_int",name:"Wise",stat:"int",min:1,max:4},{id:"of_con",name:"Hardy",stat:"con",min:1,max:4},{id:"sharp",name:"Sharp",stat:"dmg",min:1,max:3},{id:"sturdy",name:"Reinforced",stat:"armor",min:1,max:3},{id:"burning",name:"Burning",stat:"burnChance",min:.05,max:.15},{id:"bleeding",name:"Serrated",stat:"bleedChance",min:.05,max:.15}],suffixes:[{id:"of_hp",name:"of Vitality",stat:"hp",min:5,max:20},{id:"of_mp",name:"of Focus",stat:"mp",min:5,max:15},{id:"of_hit",name:"of Accuracy",stat:"hit",min:2,max:8},{id:"of_dodge",name:"of Evasion",stat:"dodge",min:2,max:6},{id:"of_speed",name:"of Haste",stat:"initiative",min:1,max:3},{id:"of_gold",name:"of Fortune",stat:"goldFind",min:.05,max:.2}]};function k(n,e="normal",t="medium",a=ce){const s=le[n]||de[n];if(!s)return null;const i=oe[t],r={id:crypto.randomUUID(),baseKey:n,name:s.name,type:s.type,subtype:s.subtype||s.slot,slot:s.slot||(s.twoHanded,"weapon"),rarity:e,quality:t,affixes:[]};s.dmg&&(r.dmg=[Math.round(s.dmg[0]*i),Math.round(s.dmg[1]*i)]),s.armor!==void 0&&(r.armor=Math.round(s.armor*i));const o=ne[e];if(o){const[d,h]=Array.isArray(o)?o:[o,o],l=d+Math.floor(Math.random()*(h-d+1)),c=[...a.prefixes,...a.suffixes],p=[];for(let _=0;_<l&&c.length>p.length;_++){let v,T=0;do v=c[Math.floor(Math.random()*c.length)],T++;while(p.find(x=>x.id===v.id)&&T<20);if(!p.find(x=>x.id===v.id)){const x=+(v.min+Math.random()*(v.max-v.min)).toFixed(2);p.push({...v,value:x})}}r.affixes=p;const f=p.find(_=>a.prefixes.find(v=>v.id===_.id)),w=p.find(_=>a.suffixes.find(v=>v.id===_.id));f&&(r.name=`${f.name} ${r.name}`),w&&(r.name=`${r.name} ${w.name}`)}return r}function V(n){if(!n)return"";const e=s=>s.charAt(0).toUpperCase()+s.slice(1),t=s=>s.charAt(0).toUpperCase()+s.slice(1);let a=[`<strong>${n.name}</strong>`,`<span class="tt-rarity" style="color:${M[n.rarity]}">${t(n.rarity)} · ${e(n.quality)}</span>`];n.dmg&&a.push(`Damage: ${n.dmg[0]}–${n.dmg[1]}`),n.armor&&a.push(`Armor: +${n.armor}`);for(const s of n.affixes||[]){const i=typeof s.value=="number"&&s.value<1?`${Math.round(s.value*100)}%`:`+${s.value}`;a.push(`<span style="color:#90d8a8">${s.name}: ${i} ${s.stat.toUpperCase()}</span>`)}return a.join("<br>")}const me=["weapon","offhand","head","chest","legs","hands","feet","ring1","ring2","necklace"],he={weapon:"Weapon",offhand:"Off-hand",head:"Head",chest:"Chest",legs:"Legs",hands:"Hands",feet:"Feet",ring1:"Ring",ring2:"Ring",necklace:"Necklace"};class pe{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._tt=null}onEnter(){this._build()}_build(){C("inv-styles",ue),this._el=y("div","inv-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=m.get(),t=e.party,a=t[this._selectedCharIdx];this._el.innerHTML=`
      <div class="inv-header">
        <div class="inv-char-tabs" id="char-tabs">
          ${t.map((s,i)=>`
            <button class="char-tab${i===this._selectedCharIdx?" active":""}" data-idx="${i}">
              ${s.name}<br><small>${s.className||s.class}</small>
            </button>
          `).join("")}
        </div>
        <button class="inv-close" id="inv-close">✕ Close</button>
      </div>
      <div class="inv-layout">
        <!-- Equipment slots (left) -->
        <div class="equip-panel">
          <div class="panel-label">Equipped — ${(a==null?void 0:a.name)||"No Character"}</div>
          <div class="equip-slots" id="equip-slots">
            ${me.map(s=>{var r;const i=(r=a==null?void 0:a.equipment)==null?void 0:r[s];return`
                <div class="equip-slot${i?" has-item":""}" data-slot="${s}">
                  <div class="es-label">${he[s]}</div>
                  ${i?`
                    <div class="es-item" data-itemid="${i.id}" data-slot="${s}">
                      <div class="esi-name" style="color:${M[i.rarity]}">${i.name}</div>
                      <div class="esi-stat">${i.dmg?`${i.dmg[0]}-${i.dmg[1]}`:i.armor?`+${i.armor} arm`:""}</div>
                    </div>
                  `:'<div class="es-empty">— empty —</div>'}
                </div>
              `}).join("")}
          </div>
          <div class="char-stats-panel">
            <div class="panel-label">Character Stats</div>
            ${this._renderCharStats(a)}
          </div>
        </div>
        <!-- Inventory grid (right) -->
        <div class="inv-items-panel">
          <div class="panel-label">Inventory (${e.inventory.length} items)</div>
          <div class="inv-grid" id="inv-grid">
            ${e.inventory.length===0?'<div class="inv-empty">Your pack is empty. Visit the merchant or defeat enemies to find equipment.</div>':e.inventory.map(s=>`
                <div class="inv-item-card" data-id="${s.id}">
                  <div class="iic-rarity-bar" style="background:${M[s.rarity]}"></div>
                  <div class="iic-name" style="color:${M[s.rarity]}">${s.name}</div>
                  <div class="iic-type">${s.subtype||s.type}</div>
                  <div class="iic-stat">${s.dmg?`⚔ ${s.dmg[0]}-${s.dmg[1]}`:s.armor?`🛡 +${s.armor}`:""}</div>
                  <div class="iic-quality">${s.quality}</div>
                  <button class="iic-equip-btn" data-equip="${s.id}">Equip</button>
                </div>
              `).join("")}
          </div>
        </div>
      </div>
      <div id="inv-tt" class="inv-tooltip" style="display:none"></div>
    `,this._wireEvents()}_renderCharStats(e){if(!e)return'<div class="stat-row"><span>No character selected</span></div>';const t=e.attrs,a=e.equipment||{};let s=0;for(const h of Object.values(a))h!=null&&h.armor&&(s+=h.armor);const i=50+t.CON*10,r=30+t.INT*8,o=Math.min(95,70+Math.round(t.DEX*1.2)),d=Math.min(40,5+Math.round(t.DEX*.8));return`
      <div class="stat-row"><span class="sr-label">HP</span><span class="sr-val">${i}</span></div>
      <div class="stat-row"><span class="sr-label">Mana</span><span class="sr-val">${r}</span></div>
      <div class="stat-row"><span class="sr-label">Armor</span><span class="sr-val">${s}</span></div>
      <div class="stat-row"><span class="sr-label">Hit</span><span class="sr-val">${o}%</span></div>
      <div class="stat-row"><span class="sr-label">Dodge</span><span class="sr-val">${d}%</span></div>
      <div class="stat-row"><span class="sr-label">STR/DEX/INT/CON</span><span class="sr-val">${t.STR}/${t.DEX}/${t.INT}/${t.CON}</span></div>
    `}_wireEvents(){var e;(e=this._el.querySelector("#inv-close"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".char-tab").forEach(t=>{t.addEventListener("click",()=>{this.audio.playSfx("click"),this._selectedCharIdx=parseInt(t.dataset.idx),this._render()})}),this._el.querySelectorAll("[data-equip]").forEach(t=>{t.addEventListener("click",()=>{var d;this.audio.playSfx("click");const a=t.dataset.equip,s=m.get(),i=s.party[this._selectedCharIdx],r=s.inventory.find(h=>h.id===a);if(!i||!r)return;let o=r.slot||r.subtype;o==="ring"&&(o=(d=i.equipment)!=null&&d.ring1?"ring2":"ring1"),i.equipment[o]&&m.addToInventory(i.equipment[o]),i.equipment||(i.equipment={}),i.equipment[o]=r,m.removeFromInventory(a),this._render()})}),this._el.querySelectorAll("[data-slot]").forEach(t=>{t.dataset.itemid&&t.addEventListener("click",()=>{var r;const s=m.get().party[this._selectedCharIdx],i=t.dataset.slot;(r=s==null?void 0:s.equipment)!=null&&r[i]&&(this.audio.playSfx("click"),m.addToInventory(s.equipment[i]),delete s.equipment[i],this._render())})}),this._el.querySelectorAll(".inv-item-card, .es-item").forEach(t=>{t.addEventListener("mouseenter",a=>{const s=t.dataset.id||t.dataset.itemid,i=m.get(),r=i.party[this._selectedCharIdx],o=i.inventory.find(l=>l.id===s)||Object.values((r==null?void 0:r.equipment)||{}).find(l=>(l==null?void 0:l.id)===s);if(!o)return;const d=this._el.querySelector("#inv-tt");d.innerHTML=V(o),d.style.display="block";const h=this._el.getBoundingClientRect();d.style.left=`${Math.min(a.clientX-h.left+12,h.width-220)}px`,d.style.top=`${Math.max(8,a.clientY-h.top-60)}px`}),t.addEventListener("mouseleave",()=>{var s;const a=(s=this._el)==null?void 0:s.querySelector("#inv-tt");a&&(a.style.display="none")})})}update(){}draw(){}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}}const ue=`
.inv-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: linear-gradient(180deg,#0a0608,#120a10); color: #f0e8d8;
  font-family: 'Inter', sans-serif;
}
.inv-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 1rem; border-bottom: 1px solid rgba(232,160,32,0.15);
  background: rgba(0,0,0,0.3); flex-shrink: 0; gap: 0.5rem;
}
.inv-char-tabs { display: flex; gap: 0.4rem; overflow-x: auto; }
.char-tab {
  padding: 0.4rem 0.85rem; background: rgba(26,18,24,0.6);
  border: 1px solid rgba(232,160,32,0.1); border-radius: 6px;
  color: #8a7a6a; font-size: 0.75rem; cursor: pointer; min-height: 44px; text-align: center;
  transition: all 0.2s;
}
.char-tab.active { border-color: rgba(232,160,32,0.5); color: #e8a020; background: rgba(232,160,32,0.08); }
.char-tab small { font-size: 0.6rem; }
.inv-close { background: none; border: none; color: #8a7a6a; cursor: pointer; font-size: 0.85rem; padding: 0.4rem 0.6rem; min-height: 36px; }
.inv-close:hover { color: #f0e8d8; }
.inv-layout { flex: 1; display: grid; grid-template-columns: 260px 1fr; overflow: hidden; }
@media (max-width: 600px) { .inv-layout { grid-template-columns: 1fr; } .equip-panel { display: none; } }
.panel-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7a6a; margin-bottom: 0.6rem; }
.equip-panel {
  padding: 1rem; border-right: 1px solid rgba(232,160,32,0.1);
  overflow-y: auto; display: flex; flex-direction: column; gap: 1rem;
}
.equip-slots { display: flex; flex-direction: column; gap: 0.35rem; }
.equip-slot {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.45rem 0.65rem; background: rgba(26,18,24,0.5);
  border: 1px solid rgba(255,255,255,0.05); border-radius: 5px; min-height: 40px;
}
.equip-slot.has-item { border-color: rgba(232,160,32,0.15); cursor: pointer; }
.equip-slot.has-item:hover { border-color: rgba(232,160,32,0.4); }
.es-label { font-size: 0.65rem; color: #8a7a6a; min-width: 55px; }
.es-item { flex: 1; text-align: right; }
.esi-name { font-size: 0.72rem; font-weight: 600; }
.esi-stat { font-size: 0.62rem; color: #8a7a6a; }
.es-empty { font-size: 0.65rem; color: #3a2a22; }
.char-stats-panel { margin-top: 0.5rem; }
.stat-row { display: flex; justify-content: space-between; padding: 0.3rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.75rem; }
.sr-label { color: #8a7a6a; }
.sr-val { font-family: 'Cinzel', serif; font-weight: 700; color: #e8a020; }
.inv-items-panel { padding: 1rem; overflow-y: auto; }
.inv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.6rem; }
.inv-item-card {
  position: relative; padding: 0.75rem; background: rgba(26,18,24,0.7);
  border: 1px solid rgba(232,160,32,0.08); border-radius: 8px;
  transition: border-color 0.15s; overflow: hidden;
}
.inv-item-card:hover { border-color: rgba(232,160,32,0.3); }
.iic-rarity-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; }
.iic-name { font-size: 0.78rem; font-weight: 600; margin-bottom: 0.15rem; }
.iic-type { font-size: 0.62rem; color: #8a7a6a; text-transform: capitalize; }
.iic-stat { font-size: 0.68rem; color: #c0b090; margin-top: 0.2rem; }
.iic-quality { font-size: 0.6rem; color: #6a5a52; text-transform: capitalize; }
.iic-equip-btn {
  margin-top: 0.5rem; width: 100%; padding: 0.3rem; background: rgba(232,160,32,0.1);
  border: 1px solid rgba(232,160,32,0.25); border-radius: 4px;
  color: #e8a020; font-size: 0.7rem; font-weight: 600; cursor: pointer; min-height: 28px;
}
.iic-equip-btn:hover { background: rgba(232,160,32,0.22); }
.inv-empty { grid-column: 1/-1; text-align: center; padding: 3rem 2rem; font-size: 0.85rem; color: #4a3a32; }
.inv-tooltip {
  position: absolute; z-index: 1000; pointer-events: none;
  background: rgba(10,6,8,0.95); border: 1px solid rgba(232,160,32,0.4);
  border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.8rem;
  line-height: 1.7; max-width: 210px; color: #f0e8d8;
}
`,j={shield_bash:{name:"Shield Bash",class:"warrior",unlockLevel:1,type:"melee",aoe:"adjacent",damageStat:"str",damageMult:1.2,statusEffects:[{type:"stun",chance:.6,duration:1}],mpCost:0,description:"Strike with shield, dealing STR-based damage and applying Stun (1 round).",talents:[{id:"sb_wider",name:"Wide Arc",desc:"Hits 1-2 adjacent enemies instead of 1.",effect:{aoe:"adjacent2"}},{id:"sb_stun",name:"Extended Stun",desc:"Stun lasts 2 rounds.",effect:{stunDuration:2}}]},battle_cry:{name:"Battle Cry",class:"warrior",unlockLevel:5,type:"buff",target:"party",effect:{dmgBuff:.2,duration:3},mpCost:15,description:"Rally the party, granting +20% damage for 3 rounds.",talents:[{id:"bc_hp",name:"Inspiring Shout",desc:"Also grants 20 temporary HP to each party member.",effect:{tempHp:20}},{id:"bc_def",name:"Rallying Cry",desc:"Also reduces incoming damage by 10%.",effect:{dmgReduct:.1}}]},whirlwind:{name:"Whirlwind",class:"warrior",unlockLevel:10,type:"melee",aoe:"row",damageStat:"str",damageMult:.9,statusEffects:[],mpCost:20,description:"Spin attack hitting all adjacent enemies (up to 3).",talents:[{id:"ww_bleed",name:"Serrated Blade",desc:"Applies Bleed to all hit enemies.",effect:{bleed:{duration:3}}},{id:"ww_extra",name:"Wider Spin",desc:"Hits one additional enemy row.",effect:{aoe:"row2"}}]},unbreakable:{name:"Unbreakable",class:"warrior",unlockLevel:15,type:"buff",target:"self",effect:{dmgReduct:.5,reflect:.1,duration:2},mpCost:25,description:"Enter defensive stance for 2 rounds: take 50% less damage, reflect 10% back.",talents:[{id:"ub_reflect",name:"Thorns",desc:"Reflect increases to 25%.",effect:{reflect:.25}},{id:"ub_dur",name:"Iron Will",desc:"Duration extends to 3 rounds.",effect:{duration:3}}]},holy_strike:{name:"Holy Strike",class:"paladin",unlockLevel:1,type:"melee",aoe:"single",damageStat:"str_int",damageMult:1.1,bonusVsUndead:2,bonusVsDemon:2,mpCost:5,description:"Blessed melee blow dealing STR+INT damage. Double vs undead/demons.",talents:[{id:"hs_burn",name:"Holy Fire",desc:"Applies Burn to undead targets.",effect:{burnVsUndead:!0}},{id:"hs_splash",name:"Divine Splash",desc:"Small AoE splash to adjacent target.",effect:{aoe:"adjacent"}}]},lay_on_hands:{name:"Lay on Hands",class:"paladin",unlockLevel:5,type:"heal",target:"ally",healStat:"int",healMult:2,mpCost:20,description:"Instantly restore HP to one ally equal to 2× INT.",talents:[{id:"loh_cleanse",name:"Purify",desc:"Also removes one status effect.",effect:{cleanse:1}},{id:"loh_free",name:"Free Action",desc:"Can target self without consuming turn.",effect:{selfFree:!0}}]},divine_shield:{name:"Divine Shield",class:"paladin",unlockLevel:10,type:"buff",target:"ally",effect:{shield:{conMult:3,duration:2}},mpCost:25,description:"Surround one ally with a barrier absorbing 3× CON damage for 2 rounds.",talents:[{id:"ds_reflect",name:"Holy Aegis",desc:"Reflect absorbed damage.",effect:{reflect:.3}},{id:"ds_double",name:"Twin Shield",desc:"Extend to 2 targets.",effect:{targets:2}}]},consecration:{name:"Consecration",class:"paladin",unlockLevel:15,type:"zone",target:"all_enemies",damageStat:"int",damageMult:.6,healStat:"int",healMult:.4,duration:3,mpCost:35,description:"Sanctify the ground: damages all enemies and heals party for 3 rounds.",talents:[{id:"con_slow",name:"Sacred Ground",desc:"Also slows all enemies.",effect:{slow:{duration:2}}},{id:"con_heal",name:"Holy Renewal",desc:"Increases heal amount by 50%.",effect:{healMult:.6}}]},magic_missile:{name:"Magic Missile",class:"mage",unlockLevel:1,type:"magic",aoe:"random3",damageStat:"int",damageMult:.5,mpCost:8,description:"Launch 3 arcane bolts, each hitting a random enemy for INT damage.",talents:[{id:"mm_5bolts",name:"Missile Barrage",desc:"5 bolts instead of 3.",effect:{bolts:5}},{id:"mm_stun",name:"Concussive Bolts",desc:"Chance to Stun target.",effect:{stunChance:.2}}]},fireball:{name:"Fireball",class:"mage",unlockLevel:5,type:"magic",aoe:"group",damageStat:"int",damageMult:1.4,statusEffects:[{type:"burn",chance:.8,duration:3}],mpCost:18,description:"Explosive fireball hitting one enemy group with fire damage and Burn.",talents:[{id:"fb_wider",name:"Inferno",desc:"Blast radius includes adjacent group.",effect:{aoe:"group2"}},{id:"fb_burn",name:"Scorching",desc:"Burn damage increased by 50%.",effect:{burnMult:1.5}}]},blizzard:{name:"Blizzard",class:"mage",unlockLevel:10,type:"magic",aoe:"all",damageStat:"int",damageMult:.7,duration:3,statusEffects:[{type:"slow",chance:1,duration:2}],mpCost:30,description:"Ice storm blanketing all enemies for 3 rounds, dealing cold damage and Slow.",talents:[{id:"bz_freeze",name:"Deep Freeze",desc:"Chance to Freeze (Stun) targets.",effect:{freezeChance:.25}},{id:"bz_dmg",name:"Arctic Gale",desc:"Damage increases each round.",effect:{dmgScaling:.2}}]},arcane_surge:{name:"Arcane Surge",class:"mage",unlockLevel:15,type:"magic",aoe:"single_overflow",damageStat:"int",damageMult:4,mpCost:40,description:"400% INT damage to single target with overflow to adjacent enemies.",talents:[{id:"as_cd",name:"Wild Surge",desc:"Reduce mana cost by 15.",effect:{mpCost:-15}},{id:"as_pen",name:"Arcane Pierce",desc:"Ignore magic resistance.",effect:{ignoreMR:!0}}]},bone_spike:{name:"Bone Spike",class:"necromancer",unlockLevel:1,type:"magic",aoe:"pierce_row",damageStat:"int",damageMult:.9,statusEffects:[{type:"bleed",chance:.5,duration:3}],mpCost:8,description:"Bone projectile dealing INT damage and applying Bleed, pierces target row.",talents:[{id:"bs_pierce",name:"Ossified Lance",desc:"Pierces entire enemy row.",effect:{aoe:"row"}},{id:"bs_extra",name:"Double Spike",desc:"Extra spike on crit.",effect:{critExtra:!0}}]},raise_dead:{name:"Raise Dead",class:"necromancer",unlockLevel:5,type:"summon",target:"corpse",summonType:"skeleton",mpCost:25,description:"Reanimate one fallen enemy corpse as a skeleton ally (fills open companion slot).",talents:[{id:"rd_hp",name:"Fortified Bones",desc:"Raised skeleton has +50% HP.",effect:{hpMult:1.5}},{id:"rd_two",name:"Army of Dead",desc:"Can raise two corpses at once.",effect:{raiseTwoCorpses:!0}}]},life_drain:{name:"Life Drain",class:"necromancer",unlockLevel:10,type:"magic",aoe:"single",damageStat:"int",damageMult:1.2,lifesteal:.5,mpCost:20,description:"Drain life from target dealing INT damage, healing Necromancer for 50%.",talents:[{id:"ld_chain",name:"Chain Drain",desc:"Also chains to a second nearby target.",effect:{chainCount:2}},{id:"ld_buff",name:"Soul Siphon",desc:"Also drains one buff from target.",effect:{drainBuff:!0}}]},death_coil:{name:"Death Coil",class:"necromancer",unlockLevel:15,type:"magic",aoe:"all",damageStat:"int",damageMult:.8,statusEffects:[{type:"poison",chance:.9,duration:4},{type:"bleed",chance:.9,duration:3}],mpCost:35,description:"Necrotic wave hitting all enemies, applying both Poison and Bleed.",talents:[{id:"dc_con",name:"Withering",desc:"Lowers enemy CON saves for 2 rounds.",effect:{conDebuff:3,conDebuffDur:2}},{id:"dc_heal",name:"Feast on Death",desc:"Heals party on each kill while active.",effect:{healOnKill:.1}}]},flame_lance:{name:"Flame Lance",class:"pyromancer",unlockLevel:1,type:"magic",aoe:"single",damageStat:"int",damageMult:1,statusEffects:[{type:"burn",chance:.9,duration:3}],mpCost:8,description:"Fire bolt dealing INT damage and applying Burn (3-round DoT).",talents:[{id:"fl_dur",name:"Sustained Flame",desc:"Burn lasts 5 rounds.",effect:{burnDuration:5}},{id:"fl_spread",name:"Spreading Fire",desc:"Burn spreads to adjacent enemy.",effect:{burnSpread:!0}}]},ignite:{name:"Ignite",class:"pyromancer",unlockLevel:5,type:"zone",aoe:"group",damageStat:"int",damageMult:.6,duration:3,statusEffects:[{type:"burn",chance:1,duration:3,stacksEachRound:!0}],mpCost:18,description:"Set ground ablaze under one group, persisting 3 rounds with stacking Burn.",talents:[{id:"ig_spread",name:"Wildfire",desc:"Fire spreads to adjacent group.",effect:{spreadToAdjacentGroup:!0}},{id:"ig_stack",name:"Inferno Stack",desc:"Faster Burn stacking rate.",effect:{burnStackRate:1.5}}]},pyroclasm:{name:"Pyroclasm",class:"pyromancer",unlockLevel:10,type:"magic",aoe:"chain3",damageStat:"int",damageMult:.9,statusEffects:[{type:"burn",chance:.8,duration:3}],mpCost:25,description:"Chain fire explosion: each target triggers a secondary blast on nearest enemy, up to 3.",talents:[{id:"py_chain4",name:"Pyroclastic Wave",desc:"Chain length increases to 4.",effect:{chainCount:4}},{id:"py_scale",name:"Amplify",desc:"Each chain explosion is larger.",effect:{chainDmgScale:1.2}}]},meteor:{name:"Meteor",class:"pyromancer",unlockLevel:15,type:"magic",aoe:"all",damageStat:"int",damageMult:2.5,statusEffects:[{type:"burn",chance:1,duration:5,maxStacks:!0}],mpCost:45,description:"Devastating meteor hitting all enemies with maximum Burn stacks and Ignite zones.",talents:[{id:"me_split",name:"Twin Meteor",desc:"Meteor splits into two on impact.",effect:{split:2}},{id:"me_resist",name:"Smelting Fire",desc:"Enemy fire resistance reduced 50% for 3 rounds.",effect:{fireResistDebuff:.5,duration:3}}]},aimed_shot:{name:"Aimed Shot",class:"ranger",unlockLevel:1,type:"ranged",aoe:"single",damageStat:"dex",damageMult:1.5,armorPen:1,mpCost:5,description:"Focused ranged attack dealing 150% DEX damage. Can pierce armor via talent.",talents:[{id:"as_pen",name:"Armor Pierce",desc:"Ignores target armor.",effect:{armorPen:1}},{id:"as_bleed",name:"Barbed Arrow",desc:"Chance to Bleed.",effect:{bleedChance:.4}}]},multi_shot:{name:"Multi-Shot",class:"ranger",unlockLevel:5,type:"ranged",aoe:"multi3",damageStat:"dex",damageMult:.8,mpCost:15,description:"Fire at 3 separate targets simultaneously, each at 80% DEX damage.",talents:[{id:"ms_4",name:"Quiver Mastery",desc:"Fourth target added.",effect:{targets:4}},{id:"ms_b",name:"Bleeding Volley",desc:"Applies Bleed to all targets.",effect:{bleedChance:.5}}]},smoke_trap:{name:"Smoke Trap",class:"ranger",unlockLevel:10,type:"trap",aoe:"group",statusEffects:[{type:"blind",chance:1,duration:2}],mpCost:20,description:"Plant a trap that Blinds (−50% hit chance) one enemy group for 2 rounds.",talents:[{id:"st_slow",name:"Choking Smoke",desc:"Also applies Slow.",effect:{slow:{duration:2}}},{id:"st_2",name:"Double Trap",desc:"Place 2 traps simultaneously.",effect:{trapCount:2}}]},rain_of_arrows:{name:"Rain of Arrows",class:"ranger",unlockLevel:15,type:"ranged",aoe:"all",damageStat:"dex",damageMult:.5,duration:3,mpCost:30,description:"Volley descending on all enemies for 3 rounds, each dealing DEX damage.",talents:[{id:"roa_bleed",name:"Serrated Arrows",desc:"Applies stacking Bleed.",effect:{bleedStack:!0}},{id:"roa_dur",name:"Endless Rain",desc:"Duration extends to 4 rounds.",effect:{duration:4}}]},backstab:{name:"Backstab",class:"rogue",unlockLevel:1,type:"melee",aoe:"single",damageStat:"dex",damageMult:2,mpCost:5,description:"200% DEX damage. Bonus if target is Stunned or Bleeding.",talents:[]},poison_blade:{name:"Poison Blade",class:"rogue",unlockLevel:5,type:"buff",aoe:"single",damageStat:"dex",damageMult:.5,mpCost:10,description:"Next 3 attacks apply Poison DoT.",talents:[]},shadow_step:{name:"Shadow Step",class:"rogue",unlockLevel:10,type:"melee",aoe:"single",damageStat:"dex",damageMult:1.5,mpCost:20,description:"Teleport behind target and attack for 150% DEX.",talents:[]},death_mark:{name:"Death Mark",class:"rogue",unlockLevel:15,type:"debuff",aoe:"single",mpCost:25,description:"Marked target takes 50% more damage from all sources for 3 rounds.",talents:[]},heal:{name:"Heal",class:"cleric",unlockLevel:1,type:"heal",target:"ally",healStat:"int",healMult:2.5,mpCost:15,description:"Restore HP to one ally equal to 2.5× INT.",talents:[]},smite:{name:"Smite",class:"cleric",unlockLevel:5,type:"magic",aoe:"single",damageStat:"int",damageMult:1.3,mpCost:15,description:"Holy bolt, double damage vs undead/demons.",talents:[]},sanctuary:{name:"Sanctuary",class:"cleric",unlockLevel:10,type:"buff",target:"ally",mpCost:25,description:"Ally regenerates HP each round and cannot be targeted for 3 rounds.",talents:[]},mass_resurrection:{name:"Mass Resurrection",class:"cleric",unlockLevel:15,type:"passive",mpCost:0,description:"40% chance to auto-revive fallen allies at 30% HP when party wipes.",talents:[]},inspiring_tune:{name:"Inspiring Tune",class:"bard",unlockLevel:1,type:"buff",target:"party",mpCost:10,description:"+15% hit and +1 initiative for party for 3 rounds.",talents:[]},discordant_wail:{name:"Discordant Wail",class:"bard",unlockLevel:5,type:"debuff",aoe:"group",mpCost:15,description:"−30% damage and erratic targeting for one enemy group.",talents:[]},ballad_of_valor:{name:"Ballad of Valor",class:"bard",unlockLevel:10,type:"buff",target:"ally",mpCost:25,description:"One hero gets double actions for 1 round.",talents:[]},song_of_ruin:{name:"Song of Ruin",class:"bard",unlockLevel:15,type:"magic",aoe:"all",mpCost:35,description:"Sonic damage to all enemies, removes all their buffs.",talents:[]},corruption:{name:"Corruption",class:"warlock",unlockLevel:1,type:"magic",aoe:"single",damageStat:"int",damageMult:.6,mpCost:8,description:"Target takes INT damage per round for 4 rounds; spreads on death.",talents:[]},hellfire:{name:"Hellfire",class:"warlock",unlockLevel:5,type:"magic",aoe:"group",damageStat:"int",damageMult:1.3,mpCost:18,description:"Hellfire hits enemy group, applies Burn. Bypasses fire resistance.",talents:[]},soul_pact:{name:"Soul Pact",class:"warlock",unlockLevel:10,type:"buff",target:"self",mpCost:0,description:"Sacrifice 20% own HP to double all active DoT duration and damage.",talents:[]},void_rift:{name:"Void Rift",class:"warlock",unlockLevel:15,type:"zone",aoe:"all",damageStat:"int",damageMult:.7,duration:3,mpCost:35,description:"Void rift under enemies for 3 rounds: damage + 20% stun chance each round.",talents:[]},demon_bolt:{name:"Demon Bolt",class:"demon_hunter",unlockLevel:1,type:"ranged",aoe:"single",damageStat:"dex_int",damageMult:1,bonusVsDemon:1.5,mpCost:8,description:"+50% vs demons. DEX+INT damage.",talents:[]},glaive_toss:{name:"Glaive Toss",class:"demon_hunter",unlockLevel:5,type:"ranged",aoe:"row",damageStat:"dex",damageMult:.9,mpCost:15,description:"Spinning glaive hits all enemies in a row, applying Bleed.",talents:[]},fel_sight:{name:"Fel Sight",class:"demon_hunter",unlockLevel:10,type:"buff",target:"self",mpCost:20,description:"+25% hit/dodge, immune to Blind/Confuse for 3 rounds.",talents:[]},vengeance:{name:"Vengeance",class:"demon_hunter",unlockLevel:15,type:"melee",aoe:"single",damageStat:"dex",damageMult:1,stackBonusPerDeath:.15,mpCost:20,description:"Stacks 15% damage per fallen ally. Release all stacks in one strike.",talents:[]},scrounge:{name:"Scrounge",class:"scavenger",unlockLevel:1,type:"utility",mpCost:0,description:"60% chance to find a consumable item mid-combat.",talents:[]},thrown_junk:{name:"Thrown Junk",class:"scavenger",unlockLevel:5,type:"ranged",aoe:"group",damageStat:"dex",damageMult:.7,mpCost:5,description:"Hurl debris at an enemy group; 30% stun chance.",talents:[]},makeshift_bomb:{name:"Makeshift Bomb",class:"scavenger",unlockLevel:10,type:"ranged",aoe:"group",damageStat:"dex_con",damageMult:1,mpCost:15,description:"Improvised explosive: DEX+CON damage with Burn to a group.",talents:[]},jackpot:{name:"Jackpot",class:"scavenger",unlockLevel:15,type:"passive",mpCost:0,description:"20% chance to instantly loot a Magic+ item from each kill.",talents:[]},riposte:{name:"Riposte",class:"swashbuckler",unlockLevel:1,type:"counter",mpCost:0,description:"Enter parry stance: counter next melee hit for 200% DEX damage.",talents:[]},flourish:{name:"Flourish",class:"swashbuckler",unlockLevel:5,type:"melee",aoe:"single",damageStat:"dex",damageMult:1,buildsFlairStacks:3,mpCost:8,description:"3 rapid strikes, each building Flair stacks for Grandeur.",talents:[]},taunt:{name:"Taunt",class:"swashbuckler",unlockLevel:10,type:"buff",target:"enemy",mpCost:15,description:"Force one enemy to target only you for 2 rounds; +30% dodge vs them.",talents:[]},grandeur:{name:"Grandeur",class:"swashbuckler",unlockLevel:15,type:"melee",aoe:"single",damageStat:"dex",consumesFlairStacks:!0,mpCost:0,description:"Consume all Flair stacks for DEX × stacks damage + random debuffs per stack.",talents:[]},dragon_claw:{name:"Dragon Claw",class:"dragon_knight",unlockLevel:1,type:"melee",aoe:"adjacent",damageStat:"str_dex",damageMult:1.1,armorPen:.2,mpCost:0,description:"Savage strike ignoring 20% armor; hits adjacent enemies.",talents:[]},breath_weapon:{name:"Breath Weapon",class:"dragon_knight",unlockLevel:5,type:"magic",aoe:"group",damageStat:"str_int",damageMult:1.3,mpCost:20,description:"Cone of fire/ice/lightning hitting one group. Choose element at class creation.",talents:[]},dragon_scales:{name:"Dragon Scales",class:"dragon_knight",unlockLevel:10,type:"buff",target:"self",mpCost:20,description:"30% damage reduction + element immunity for 3 rounds.",talents:[]},draconic_fury:{name:"Draconic Fury",class:"dragon_knight",unlockLevel:15,type:"buff",target:"self",mpCost:35,description:"All attacks become group AoE, +50% damage for 2 rounds. Cannot be Stunned.",talents:[]}};function F(n){return Object.values(j).filter(e=>e.class===n).sort((e,t)=>e.unlockLevel-t.unlockLevel)}function ge(n,e){return F(n).filter(t=>t.unlockLevel<=e)}class fe{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._selectedSkill=null}onEnter(){this._build()}_build(){C("skill-styles",ve),this._el=y("div","skill-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const t=m.get().party,a=t[this._selectedCharIdx],s=a?F(a.class):[],i=a?ge(a.class,a.level||1):[],r=(a==null?void 0:a.talentsPurchased)||{};this._el.innerHTML=`
      <div class="skill-header">
        <div class="skill-char-tabs" id="skill-char-tabs">
          ${t.map((o,d)=>`
            <button class="sct-tab${d===this._selectedCharIdx?" active":""}" data-idx="${d}">
              ${o.name}<br><small>${o.className||o.class} Lv${o.level||1}</small>
            </button>
          `).join("")}
        </div>
        <button class="skill-close" id="skill-close">✕</button>
      </div>
      <div class="skill-layout">
        <!-- Skill list -->
        <div class="skill-list-panel">
          <div class="panel-label">Skills — ${(a==null?void 0:a.className)||"No Class"}</div>
          ${s.map(o=>{const d=i.find(h=>h.name===o.name);return`
              <div class="skill-row${d?"":" locked"}${this._selectedSkill===o.name?" selected":""}" data-skill="${o.name}">
                <div class="sk-level-badge">Lv${o.unlockLevel}</div>
                <div class="sk-info">
                  <div class="sk-name">${o.name}</div>
                  <div class="sk-type">${o.type} · ${o.aoe||o.target||"self"}</div>
                </div>
                <div class="sk-cost">${o.mpCost>0?`${o.mpCost} MP`:"Passive"}</div>
                ${d?"":'<div class="sk-lock-icon">🔒</div>'}
              </div>
            `}).join("")}
        </div>
        <!-- Skill detail / talents -->
        <div class="skill-detail-panel">
          ${this._selectedSkill?this._renderSkillDetail(a,r):`
            <div class="skill-select-prompt">Select a skill to view its description and upgrade talents.</div>
          `}
        </div>
      </div>
    `,this._wireEvents()}_renderSkillDetail(e,t){var i;const a=Object.values(j).find(r=>r.name===this._selectedSkill);if(!a)return"";const s=a.talents||[];return`
      <div class="skill-detail-inner">
        <div class="sd-name">${a.name}</div>
        <div class="sd-type"><span class="sd-badge">${a.type}</span>${a.aoe?`<span class="sd-badge">${a.aoe}</span>`:""}</div>
        <div class="sd-desc">${a.description}</div>
        ${a.mpCost>0?`<div class="sd-cost">Mana Cost: <strong>${a.mpCost}</strong></div>`:""}
        ${a.damageStat?`<div class="sd-formula">Damage: ${a.damageMult}× ${a.damageStat.toUpperCase()} <span style="color:#8a7a6a">(formula: base × stat × ${a.damageMult})</span></div>`:""}
        ${a.healStat?`<div class="sd-formula">Heal: ${a.healMult}× ${a.healStat.toUpperCase()}</div>`:""}
        ${(i=a.statusEffects)!=null&&i.length?`
          <div class="sd-effects">
            ${a.statusEffects.map(r=>`<div class="sd-effect"><span class="eff-name">${r.type.toUpperCase()}</span> ${Math.round(r.chance*100)}% chance · ${r.duration} rounds</div>`).join("")}
          </div>
        `:""}
        ${s.length?`
          <div class="sd-talents-title">Upgrade Talents</div>
          <div class="sd-talents">
            ${s.map(r=>{const o=t[r.id];return`
                <div class="sd-talent${o?" purchased":""}">
                  <div class="sdt-info">
                    <div class="sdt-name">${r.name}</div>
                    <div class="sdt-desc">${r.desc}</div>
                  </div>
                  <button class="sdt-btn${o?" done":""}" data-talent="${r.id}" ${o?"disabled":""}>
                    ${o?"✓ Learned":"Learn (1 pt)"}
                  </button>
                </div>
              `}).join("")}
          </div>
        `:'<div style="color:#8a7a6a;font-size:0.8rem;margin-top:1rem">No upgrade talents available for this skill.</div>'}
      </div>
    `}_wireEvents(){var e;(e=this._el.querySelector("#skill-close"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".sct-tab").forEach(t=>{t.addEventListener("click",()=>{this.audio.playSfx("click"),this._selectedCharIdx=parseInt(t.dataset.idx),this._selectedSkill=null,this._render()})}),this._el.querySelectorAll(".skill-row").forEach(t=>{t.addEventListener("click",()=>{t.classList.contains("locked")||(this.audio.playSfx("click"),this._selectedSkill=t.dataset.skill,this._render())})}),this._el.querySelectorAll("[data-talent]").forEach(t=>{t.addEventListener("click",()=>{if(t.disabled)return;const s=m.get().party[this._selectedCharIdx];s&&(s.talentsPurchased||(s.talentsPurchased={}),s.talentsPurchased[t.dataset.talent]=!0,this.audio.playSfx("spell"),this._render())})})}update(){}draw(){}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}}const ve=`
.skill-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: linear-gradient(180deg,#08060e,#100820); color: #f0e8d8;
  font-family: 'Inter', sans-serif;
}
.skill-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 1rem; border-bottom: 1px solid rgba(112,64,192,0.3);
  background: rgba(0,0,0,0.35); flex-shrink: 0;
}
.skill-char-tabs { display: flex; gap: 0.4rem; overflow-x: auto; }
.sct-tab {
  padding: 0.4rem 0.85rem; background: rgba(20,12,28,0.7);
  border: 1px solid rgba(112,64,192,0.15); border-radius: 6px;
  color: #8a7a6a; font-size: 0.75rem; cursor: pointer; min-height: 44px; text-align: center;
  transition: all 0.2s;
}
.sct-tab.active { border-color: rgba(112,64,192,0.6); color: #a080e0; background: rgba(112,64,192,0.1); }
.sct-tab small { font-size: 0.6rem; }
.skill-close { background: none; border: none; color: #8a7a6a; cursor: pointer; font-size: 1rem; padding: 0.4rem; min-height: 36px; }
.skill-layout { flex: 1; display: grid; grid-template-columns: 260px 1fr; overflow: hidden; }
.panel-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7a6a; margin-bottom: 0.75rem; }
.skill-list-panel { padding: 1rem; border-right: 1px solid rgba(112,64,192,0.15); overflow-y: auto; display: flex; flex-direction: column; gap: 0.35rem; }
.skill-row {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.65rem 0.75rem; background: rgba(20,12,28,0.5);
  border: 1px solid rgba(112,64,192,0.1); border-radius: 7px;
  cursor: pointer; transition: all 0.2s; min-height: 52px;
}
.skill-row:hover:not(.locked) { border-color: rgba(112,64,192,0.4); background: rgba(20,12,28,0.8); }
.skill-row.locked { opacity: 0.4; cursor: default; }
.skill-row.selected { border-color: rgba(112,64,192,0.7); background: rgba(112,64,192,0.12); }
.sk-level-badge {
  font-size: 0.6rem; font-weight: 700; padding: 0.2rem 0.4rem;
  background: rgba(112,64,192,0.2); border: 1px solid rgba(112,64,192,0.3);
  border-radius: 4px; color: #a080e0; flex-shrink: 0; white-space: nowrap;
}
.sk-info { flex: 1; }
.sk-name { font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700; }
.sk-type { font-size: 0.62rem; color: #8a7a6a; text-transform: capitalize; }
.sk-cost { font-size: 0.65rem; color: #4080c0; flex-shrink: 0; }
.sk-lock-icon { font-size: 0.7rem; }
.skill-detail-panel { padding: 1.5rem; overflow-y: auto; }
.skill-select-prompt { color: #8a7a6a; font-size: 0.85rem; text-align: center; margin-top: 3rem; }
.skill-detail-inner { max-width: 480px; }
.sd-name { font-family: 'Cinzel', serif; font-size: 1.3rem; font-weight: 900; color: #a080e0; margin-bottom: 0.5rem; }
.sd-type { display: flex; gap: 0.4rem; margin-bottom: 0.75rem; }
.sd-badge { font-size: 0.65rem; font-weight: 600; padding: 0.2rem 0.5rem; background: rgba(112,64,192,0.15); border: 1px solid rgba(112,64,192,0.3); border-radius: 4px; color: #a080e0; text-transform: capitalize; }
.sd-desc { font-size: 0.88rem; line-height: 1.6; color: #c0b090; margin-bottom: 1rem; }
.sd-cost { font-size: 0.78rem; color: #4080c0; margin-bottom: 0.5rem; }
.sd-formula { font-size: 0.75rem; color: #c0c080; margin-bottom: 0.5rem; }
.sd-effects { margin-bottom: 0.75rem; }
.sd-effect { font-size: 0.75rem; color: #c0a080; }
.eff-name { font-weight: 700; }
.sd-talents-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7a6a; margin: 1.25rem 0 0.75rem; }
.sd-talents { display: flex; flex-direction: column; gap: 0.6rem; }
.sd-talent {
  display: flex; align-items: center; gap: 1rem;
  padding: 0.85rem 1rem; background: rgba(20,12,28,0.5);
  border: 1px solid rgba(112,64,192,0.12); border-radius: 8px;
}
.sd-talent.purchased { border-color: rgba(112,64,192,0.4); background: rgba(112,64,192,0.08); }
.sdt-info { flex: 1; }
.sdt-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.2rem; }
.sdt-desc { font-size: 0.75rem; color: #8a7a6a; line-height: 1.4; }
.sdt-btn {
  padding: 0.5rem 0.85rem; background: rgba(112,64,192,0.15);
  border: 1px solid rgba(112,64,192,0.4); border-radius: 6px;
  color: #a080e0; font-size: 0.75rem; font-weight: 600; cursor: pointer;
  min-height: 36px; white-space: nowrap; transition: background 0.15s;
}
.sdt-btn:hover:not(:disabled) { background: rgba(112,64,192,0.28); }
.sdt-btn.done { background: rgba(112,64,192,0.06); border-color: rgba(112,64,192,0.2); color: #6a50a0; cursor: default; }
`,be=2,H=n=>`emberveil_save_${n}`,L={getSlot(n){try{const e=localStorage.getItem(H(n));if(!e)return null;const t=JSON.parse(e);return this.migrate(t)}catch{return null}},saveCurrentGame(n){var a,s,i,r,o,d,h,l;const e=m.toSaveData(),t={version:be,timestamp:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),heroName:((s=(a=e.party)==null?void 0:a[0])==null?void 0:s.name)||"Unknown",class:((r=(i=e.party)==null?void 0:i[0])==null?void 0:r.className)||((d=(o=e.party)==null?void 0:o[0])==null?void 0:d.class)||"Hero",act:e.act||1,level:((l=(h=e.party)==null?void 0:h[0])==null?void 0:l.level)||1,...e};return localStorage.setItem(H(n),JSON.stringify(t)),t},loadSlot(n){const e=this.getSlot(n);return e?(m.load(e),!0):!1},deleteSlot(n){localStorage.removeItem(H(n))},getAllSlots(){return[0,1,2].map(n=>this.getSlot(n))},migrate(n){return(!n.version||n.version<2)&&(n.visitedNodes||(n.visitedNodes=["start"]),n.version=2),n}},R=[{id:"aela",name:"Aela",className:"Ranger",class:"ranger",level:1,cost:80,attrs:{STR:8,DEX:14,INT:8,CON:10},description:"A quiet ranger from the eastern border. She's lost family to the raids."},{id:"borin",name:"Borin",className:"Warrior",class:"warrior",level:1,cost:90,attrs:{STR:14,DEX:8,INT:6,CON:12},description:"Retired soldier. Bored. Wants one last fight."},{id:"lysa",name:"Lysa",className:"Cleric",class:"cleric",level:2,cost:120,attrs:{STR:8,DEX:8,INT:14,CON:10},description:"Young cleric of the Light. Eager to prove herself outside the temple."},{id:"rekk",name:"Rekk",className:"Rogue",class:"rogue",level:1,cost:70,attrs:{STR:8,DEX:14,INT:9,CON:9},description:"Says he's not a thief. Has three knives."}],D=[{id:"war_dog",name:"War Dog",className:"Companion",class:"companion",level:1,cost:50,isCompanion:!0,attrs:{STR:10,DEX:12,INT:2,CON:10},description:"Loyal, fierce, and surprisingly effective against goblins. Bites hard."}];function ye(){return[k("sword","normal","medium"),k("dagger","normal","medium"),k("staff","magic","medium"),k("bow","normal","medium"),k("light_chest","normal","medium"),k("cloth_chest","magic","medium"),k("heavy_helm","normal","low"),k("light_legs","normal","medium"),k("ring","magic","medium"),k("necklace","magic","medium")]}class ${constructor(e,t,a,s=!1){this.manager=e,this.audio=t,this.isNewGame=s,this._el=null,this._activeService=null,this._merchantStock=ye(),this._tooltip=null,a!=null&&a.party||a&&m.init(a)}onEnter(){this.audio.playTownMusic(),this._build()}_build(){C("town-styles",_e),this._el=y("div","town-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){m.get().party[0];const t=m.getGold();this._el.innerHTML=`
      <div class="town-bg"></div>
      <div class="town-layout">
        <!-- LEFT: Party panel -->
        <aside class="party-panel">
          <div class="panel-title">Party</div>
          <div class="party-slots" id="party-slots"></div>
          <div class="panel-title" style="margin-top:1rem">Companions</div>
          <div class="party-slots" id="companion-slots"></div>
        </aside>

        <!-- CENTER: Town -->
        <main class="town-main">
          <div class="town-header-row">
            <div>
              <div class="town-region-tag">Act I · The Goblin Frontier</div>
              <div class="town-name">Emberglen</div>
            </div>
            <div class="gold-display">
              <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="9" fill="#e8a020"/><text x="10" y="14" text-anchor="middle" font-size="11" fill="#0a0608" font-weight="900">G</text></svg>
              <span id="gold-amount">${t.toLocaleString()}</span>
            </div>
          </div>

          ${this.isNewGame?`<div class="welcome-banner">
            <div class="wb-title">Welcome to Emberglen</div>
            <div class="wb-text">The village elder speaks of goblin raids growing bolder at the border. Before setting out, seek allies — the road ahead is not safe alone.</div>
          </div>`:""}

          <div class="service-tabs">
            <button class="svc-tab${this._activeService==="merchant"?" active":""}" data-svc="merchant">Merchant</button>
            <button class="svc-tab${this._activeService==="tavern"?" active":""}" data-svc="tavern">Tavern</button>
            <button class="svc-tab${this._activeService==="cleric"?" active":""}" data-svc="cleric">Cleric</button>
            <button class="svc-tab${this._activeService==="blacksmith"?" active":""}" data-svc="blacksmith">Blacksmith</button>
            <button class="svc-tab${this._activeService==="enchanter"?" active":""}" data-svc="enchanter">Enchanter</button>
          </div>
          <div class="service-panel" id="service-panel">
            ${this._renderServiceContent()}
          </div>
        </main>

        <!-- RIGHT: Actions -->
        <aside class="town-actions-panel">
          <button class="action-btn action-primary" id="btn-map">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M1 6l7-3 8 4 7-3v14l-7 3-8-4-7 3V6z"/><path d="M8 3v14M16 7v14"/></svg>
            View Map
          </button>
          <button class="action-btn" id="btn-inventory">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 00-4 0v2"/></svg>
            Inventory
          </button>
          <button class="action-btn" id="btn-skills">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M12 2l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>
            Skills
          </button>
          <button class="action-btn" id="btn-save">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save
          </button>
          <div class="action-separator"></div>
          <button class="action-btn action-leave" id="btn-leave">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Set Out
          </button>
        </aside>
      </div>
      <div id="tt-el" class="item-tooltip" style="display:none"></div>
    `,this._renderPartyPanel(),this._wireEvents()}_renderPartyPanel(){const e=m.get(),t=this._el.querySelector("#party-slots"),a=this._el.querySelector("#companion-slots");for(let s=0;s<4;s++){const i=e.party[s],r=y("div",`party-slot${i?"":" empty"}`);i?(50+i.attrs.CON*10,r.innerHTML=`
          <div class="ps-icon">${this._getClassSvg(i.class)}</div>
          <div class="ps-info">
            <div class="ps-name">${i.name}</div>
            <div class="ps-class">${i.className||i.class} Lv${i.level}</div>
            <div class="ps-hp-bar"><div class="ps-hp-fill" style="width:100%"></div></div>
          </div>
        `):r.innerHTML='<div class="ps-empty">Empty</div>',t.appendChild(r)}for(let s=0;s<4;s++){const i=e.companions[s],r=y("div",`party-slot${i?"":" empty"}`);i?r.innerHTML=`<div class="ps-icon">🐾</div><div class="ps-info"><div class="ps-name">${i.name}</div><div class="ps-class">${i.className}</div></div>`:r.innerHTML='<div class="ps-empty">Empty</div>',a.appendChild(r)}}_renderServiceContent(){switch(this._activeService){case"merchant":return this._merchantHTML();case"tavern":return this._tavernHTML();case"cleric":return this._clericHTML();case"blacksmith":return this._blacksmithHTML();case"enchanter":return this._enchanterHTML();default:return this._townOverviewHTML()}}_townOverviewHTML(){return`
      <div class="overview-grid">
        <div class="overview-card" data-svc="merchant">
          <div class="ov-icon"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="14" width="20" height="16" rx="2"/><path d="M12 14v-2a6 6 0 0112 0v2"/><path d="M8 20h20"/></svg></div>
          <div class="ov-name">Merchant</div><div class="ov-desc">Buy and sell equipment</div>
        </div>
        <div class="overview-card" data-svc="tavern">
          <div class="ov-icon"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 30V16l8-10 8 10v14"/><path d="M14 30v-8h8v8"/></svg></div>
          <div class="ov-name">Tavern</div><div class="ov-desc">Hire heroes & companions</div>
        </div>
        <div class="overview-card" data-svc="cleric">
          <div class="ov-icon"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6v24M6 18h24"/><circle cx="18" cy="18" r="4"/></svg></div>
          <div class="ov-name">Cleric</div><div class="ov-desc">Revive fallen members</div>
        </div>
        <div class="overview-card" data-svc="blacksmith">
          <div class="ov-icon"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 26l16-16M22 8l6 6-4 4-6-6z"/><path d="M10 26l-4 4"/></svg></div>
          <div class="ov-name">Blacksmith</div><div class="ov-desc">Upgrade equipment quality</div>
        </div>
        <div class="overview-card" data-svc="enchanter">
          <div class="ov-icon"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg></div>
          <div class="ov-name">Enchanter</div><div class="ov-desc">Add magic enchantments</div>
        </div>
      </div>
    `}_merchantHTML(){const e=m.get();return`
      <div class="merchant-layout">
        <div class="merchant-stock">
          <div class="svc-section-title">For Sale</div>
          <div class="item-grid" id="merchant-items">
            ${this._merchantStock.map(t=>`
              <div class="item-card" data-id="${t.id}" data-section="buy">
                <div class="ic-name" style="color:${M[t.rarity]}">${t.name}</div>
                <div class="ic-type">${t.subtype||t.type}</div>
                <div class="ic-stats">${t.dmg?`${t.dmg[0]}-${t.dmg[1]} dmg`:t.armor?`+${t.armor} armor`:""}</div>
                <div class="ic-price">${this._itemPrice(t)} G</div>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="merchant-inventory">
          <div class="svc-section-title">Your Inventory (${e.inventory.length} items)</div>
          <div class="item-grid" id="inventory-items">
            ${e.inventory.length===0?'<div class="empty-state">No items to sell.</div>':e.inventory.map(t=>`
                <div class="item-card" data-id="${t.id}" data-section="sell">
                  <div class="ic-name" style="color:${M[t.rarity]}">${t.name}</div>
                  <div class="ic-type">${t.subtype||t.type}</div>
                  <div class="ic-price">Sell: ${Math.floor(this._itemPrice(t)*.4)} G</div>
                </div>
              `).join("")}
          </div>
        </div>
      </div>
    `}_itemPrice(e){const t={low:.5,medium:1,high:1.5,elite:2.5,exotic:4},a={normal:1,magic:2,rare:4,legendary:10};return Math.round(15*(t[e.quality]||1)*(a[e.rarity]||1))}_tavernHTML(){const e=m.get(),t=m.getGold();return`
      <div class="tavern-layout">
        <div class="svc-section-title">Heroes for Hire</div>
        <div class="hireable-list">
          ${R.map(a=>{const s=e.party.find(d=>d.id===a.id),i=e.bench.find(d=>d.id===a.id),r=t>=a.cost,o=e.party.length>=4;return`
              <div class="hireable-card${s||i?" hired":""}">
                <div class="hc-portrait">${this._getClassSvg(a.class)}</div>
                <div class="hc-info">
                  <div class="hc-name">${a.name} <span class="hc-class">${a.className} Lv${a.level}</span></div>
                  <div class="hc-desc">${a.description}</div>
                  <div class="hc-attrs">STR ${a.attrs.STR} · DEX ${a.attrs.DEX} · INT ${a.attrs.INT} · CON ${a.attrs.CON}</div>
                </div>
                <div class="hc-action">
                  ${s?'<span class="hired-badge">In Party</span>':i?'<span class="hired-badge">At Bench</span>':`<button class="hire-btn${r&&!o?"":" disabled"}" data-hire="${a.id}" data-cost="${a.cost}" ${r&&!o?"":"disabled"}>
                      Hire <br><small>${a.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
        <div class="svc-section-title" style="margin-top:1.5rem">Companions for Purchase</div>
        <div class="hireable-list">
          ${D.map(a=>{const s=e.companions.find(o=>o.id===a.id),i=t>=a.cost,r=e.companions.length>=4;return`
              <div class="hireable-card${s?" hired":""}">
                <div class="hc-portrait"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="6"/><path d="M8 32c0-6 4-10 10-10s10 4 10 10"/></svg></div>
                <div class="hc-info">
                  <div class="hc-name">${a.name} <span class="hc-class">${a.className}</span></div>
                  <div class="hc-desc">${a.description}</div>
                </div>
                <div class="hc-action">
                  ${s?'<span class="hired-badge">Purchased</span>':`<button class="hire-btn${i&&!r?"":" disabled"}" data-hire="${a.id}" data-cost="${a.cost}" data-companion="true" ${i&&!r?"":"disabled"}>
                      Buy <br><small>${a.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}_clericHTML(){const e=m.get(),t=[...e.party,...e.companions].filter(i=>i.hp<=0||i.dead),a=m.getGold(),s=50;return`
      <div class="cleric-layout">
        <div class="svc-section-title">Revive Services — ${s} Gold per member</div>
        ${t.length===0?'<div class="empty-state" style="padding:2rem;text-align:center;color:#8a7a6a">All party members are alive. May the Light protect you on your journey.</div>':t.map(i=>`
            <div class="hireable-card">
              <div class="hc-portrait">${this._getClassSvg(i.class)}</div>
              <div class="hc-info">
                <div class="hc-name">${i.name}</div>
                <div class="hc-desc" style="color:#c04030">Has fallen in battle.</div>
              </div>
              <div class="hc-action">
                <button class="hire-btn${a>=s?"":" disabled"}" data-revive="${i.id}" ${a>=s?"":"disabled"}>
                  Revive<br><small>${s} G</small>
                </button>
              </div>
            </div>
          `).join("")}
        <div class="cleric-note">Reviving a fallen hero costs ${s} gold. If you cannot afford the service, the Cleric will revive one hero for free — but you leave with nothing.</div>
      </div>
    `}_showSaveModal(){const e=y("div","save-modal");if(e.innerHTML=`
      <div class="sm-overlay"></div>
      <div class="sm-box">
        <div class="sm-title">Save Game</div>
        <div class="sm-slots">
          ${[0,1,2].map(t=>{const a=L.getSlot(t);return`<button class="sm-slot-btn" data-slot="${t}">
              <span class="smsb-num">Slot ${t+1}</span>
              <span class="smsb-info">${a?`${a.heroName} · Lv${a.level}`:"Empty"}</span>
            </button>`}).join("")}
        </div>
        <button class="sm-cancel" id="sm-cancel">Cancel</button>
      </div>
    `,e.querySelector("#sm-cancel").addEventListener("click",()=>u(e)),e.querySelector(".sm-overlay").addEventListener("click",()=>u(e)),e.querySelectorAll(".sm-slot-btn").forEach(t=>{t.addEventListener("click",()=>{L.saveCurrentGame(parseInt(t.dataset.slot)),this.audio.playSfx("victory"),u(e),this._showNotif("Game saved!")})}),this.manager.uiOverlay.appendChild(e),!document.getElementById("save-modal-styles")){const t=document.createElement("style");t.id="save-modal-styles",t.textContent=".save-modal{position:absolute;inset:0;z-index:500;display:flex;align-items:center;justify-content:center}.sm-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.75)}.sm-box{position:relative;z-index:1;background:#1a1218;border:1px solid rgba(232,160,32,0.3);border-radius:12px;padding:2rem;min-width:280px;max-width:340px;width:90%}.sm-title{font-family:'Cinzel',serif;font-size:1.2rem;font-weight:700;color:#e8a020;margin-bottom:1.25rem;text-align:center}.sm-slots{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.25rem}.sm-slot-btn{display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:rgba(26,18,24,0.9);border:1px solid rgba(232,160,32,0.15);border-radius:6px;color:#f0e8d8;cursor:pointer;min-height:48px;transition:border-color 0.15s}.sm-slot-btn:hover{border-color:rgba(232,160,32,0.5)}.smsb-num{font-size:0.75rem;color:#8a7a6a}.smsb-info{font-size:0.82rem;font-family:'Cinzel',serif;font-weight:600}.sm-cancel{width:100%;padding:0.65rem;background:none;border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#8a7a6a;cursor:pointer;font-size:0.82rem}.sm-cancel:hover{color:#f0e8d8}",document.head.appendChild(t)}}_showNotif(e){const t=y("div","save-notif");t.textContent=e,t.style.cssText="position:absolute;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(232,160,32,0.9);color:#0a0608;padding:0.5rem 1.25rem;border-radius:20px;font-weight:700;font-size:0.85rem;z-index:600;pointer-events:none;animation:notifIn 0.3s ease";const a=document.createElement("style");a.textContent="@keyframes notifIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}",document.head.appendChild(a),this._el.appendChild(t),setTimeout(()=>u(t),2e3)}_blacksmithHTML(){return`<div class="coming-soon"><div class="cs-title">Blacksmith</div><div class="cs-text">The blacksmith's forge burns hot. Upgrade services available in the next milestone.</div></div>`}_enchanterHTML(){return'<div class="coming-soon"><div class="cs-title">Enchanter</div><div class="cs-text">The enchanter is preparing their reagents. Enchanting services available in the next milestone.</div></div>'}_getClassSvg(e){const t=O.find(a=>a.id===e);return(t==null?void 0:t.svgIcon)||'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="18" r="12"/></svg>'}_wireEvents(){var e,t,a,s,i,r;this._el.querySelectorAll(".svc-tab").forEach(o=>{o.addEventListener("click",()=>{this.audio.playSfx("click");const d=o.dataset.svc;this._activeService=this._activeService===d?null:d,this._refreshServicePanel()})}),this._el.querySelectorAll(".overview-card").forEach(o=>{o.addEventListener("click",()=>{this.audio.playSfx("click"),this._activeService=o.dataset.svc,this._refreshServicePanel()})}),(e=this._el.querySelector("#btn-map"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new N(this.manager,this.audio))}),(t=this._el.querySelector("#btn-leave"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new N(this.manager,this.audio))}),(a=this._el.querySelector("#btn-inventory"))==null||a.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new pe(this.manager,this.audio))}),(s=this._el.querySelector("#btn-skills"))==null||s.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new fe(this.manager,this.audio))}),(i=this._el.querySelector("#btn-save"))==null||i.addEventListener("click",()=>{this.audio.playSfx("click"),this._showSaveModal()}),(r=this._el.querySelector("#btn-journal"))==null||r.addEventListener("click",()=>{this.audio.playSfx("click")}),this._wireServiceEvents()}_wireServiceEvents(){this._el.querySelectorAll('[data-section="buy"]').forEach(e=>{e.addEventListener("click",()=>{const t=this._merchantStock.find(s=>s.id===e.dataset.id);if(!t)return;const a=this._itemPrice(t);m.getGold()<a||(m.addGold(-a),m.addToInventory(t),this._merchantStock=this._merchantStock.filter(s=>s.id!==t.id),this.audio.playSfx("click"),this._refreshAll())}),e.addEventListener("mouseenter",t=>this._showTooltip(t,e.dataset.id,"stock")),e.addEventListener("mouseleave",()=>this._hideTooltip())}),this._el.querySelectorAll('[data-section="sell"]').forEach(e=>{e.addEventListener("click",()=>{const a=m.get().inventory.find(s=>s.id===e.dataset.id);a&&(m.addGold(Math.floor(this._itemPrice(a)*.4)),m.removeFromInventory(a.id),this.audio.playSfx("click"),this._refreshAll())})}),this._el.querySelectorAll("[data-hire]").forEach(e=>{e.addEventListener("click",()=>{if(e.disabled)return;const t=e.dataset.hire,a=parseInt(e.dataset.cost),s=e.dataset.companion==="true";this.audio.playSfx("click");const i=s?D.find(o=>o.id===t):R.find(o=>o.id===t);if(!i||m.getGold()<a)return;m.addGold(-a);const r={...i,hp:50+i.attrs.CON*10,maxHp:50+i.attrs.CON*10,xp:0,equipment:{},skills:[]};s?m.addToCompanions(r)||m.addToBench(r):m.addToParty(r)||m.addToBench(r),this._refreshAll()})}),this._el.querySelectorAll("[data-revive]").forEach(e=>{e.addEventListener("click",()=>{if(e.disabled)return;const t=e.dataset.revive,a=m.get(),s=[...a.party,...a.companions].find(i=>i.id===t);s&&(m.addGold(-50),s.hp=Math.floor((50+s.attrs.CON*10)*.5),s.dead=!1,this.audio.playSfx("click"),this._refreshAll())})})}_showTooltip(e,t,a){const s=a==="stock"?this._merchantStock.find(r=>r.id===t):m.get().inventory.find(r=>r.id===t);if(!s)return;const i=this._el.querySelector("#tt-el");i&&(i.innerHTML=V(s),i.style.display="block",i.style.left=`${Math.min(e.clientX+12,window.innerWidth-220)}px`,i.style.top=`${Math.max(8,e.clientY-60)}px`)}_hideTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#tt-el");e&&(e.style.display="none")}_refreshServicePanel(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#service-panel");e&&(this._el.querySelectorAll(".svc-tab").forEach(a=>{a.classList.toggle("active",a.dataset.svc===this._activeService)}),e.innerHTML=this._renderServiceContent(),this._wireServiceEvents())}_refreshAll(){var s,i,r;const e=(s=this._el)==null?void 0:s.querySelector("#gold-amount");e&&(e.textContent=m.getGold().toLocaleString()),this._refreshServicePanel();const t=(i=this._el)==null?void 0:i.querySelector("#party-slots"),a=(r=this._el)==null?void 0:r.querySelector("#companion-slots");t&&(t.innerHTML=""),a&&(a.innerHTML=""),this._renderPartyPanel()}update(){}draw(){}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}}const _e=`
.town-screen {
  position: absolute; inset: 0; overflow: hidden;
  font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.town-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,#08100a 0%,#0d180e 100%);
}
.town-layout {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 200px 1fr 140px;
  height: 100%; overflow: hidden;
}
@media (max-width: 600px) {
  .town-layout { grid-template-columns: 1fr; }
  .party-panel, .town-actions-panel { display: none; }
}
.party-panel {
  padding: 1rem 0.75rem; border-right: 1px solid rgba(232,160,32,0.1);
  overflow-y: auto; background: rgba(0,0,0,0.2);
}
.panel-title {
  font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em;
  text-transform: uppercase; color: #8a7a6a; margin-bottom: 0.5rem;
}
.party-slots { display: flex; flex-direction: column; gap: 0.5rem; }
.party-slot {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem; background: rgba(26,18,24,0.6);
  border: 1px solid rgba(232,160,32,0.1); border-radius: 6px; min-height: 52px;
}
.party-slot.empty { opacity: 0.35; justify-content: center; }
.ps-empty { font-size: 0.7rem; color: #4a3a32; }
.ps-icon { width: 28px; height: 28px; color: #e8a020; flex-shrink: 0; }
.ps-name { font-size: 0.8rem; font-weight: 700; font-family: 'Cinzel', serif; }
.ps-class { font-size: 0.65rem; color: #8a7a6a; }
.ps-hp-bar { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-top: 3px; overflow: hidden; }
.ps-hp-fill { height: 100%; background: #40c870; border-radius: 2px; }

.town-main { display: flex; flex-direction: column; overflow: hidden; }
.town-header-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.5rem; border-bottom: 1px solid rgba(232,160,32,0.12);
  background: rgba(0,0,0,0.25); flex-shrink: 0;
}
.town-region-tag { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #40a860; }
.town-name { font-family: 'Cinzel', serif; font-size: 1.4rem; font-weight: 900; color: #e8a020; }
.gold-display { display: flex; align-items: center; gap: 0.4rem; font-family: 'Cinzel', serif; font-weight: 700; font-size: 1.1rem; color: #e8a020; }

.welcome-banner {
  margin: 1rem 1.5rem 0; padding: 1rem 1.25rem;
  background: rgba(64,168,96,0.08); border: 1px solid rgba(64,168,96,0.2); border-radius: 8px;
  flex-shrink: 0;
}
.wb-title { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #6ddc96; margin-bottom: 0.3rem; }
.wb-text { font-size: 0.78rem; color: #90b890; line-height: 1.5; }

.service-tabs {
  display: flex; gap: 0; border-bottom: 1px solid rgba(232,160,32,0.12);
  flex-shrink: 0; overflow-x: auto;
}
.svc-tab {
  padding: 0.65rem 1rem; background: none; border: none; border-bottom: 2px solid transparent;
  color: #8a7a6a; font-size: 0.78rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; white-space: nowrap; min-height: 44px;
}
.svc-tab:hover { color: #f0e8d8; }
.svc-tab.active { color: #e8a020; border-bottom-color: #e8a020; }
.service-panel { flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem; }

/* Overview */
.overview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px,1fr)); gap: 0.75rem; }
.overview-card {
  display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
  padding: 1.2rem 0.75rem; background: rgba(26,18,24,0.8);
  border: 1px solid rgba(232,160,32,0.12); border-radius: 10px;
  cursor: pointer; text-align: center; transition: all 0.2s;
}
.overview-card:hover { border-color: rgba(232,160,32,0.4); transform: translateY(-2px); }
.ov-icon { width: 36px; height: 36px; color: #e8a020; }
.ov-name { font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700; }
.ov-desc { font-size: 0.65rem; color: #8a7a6a; }

/* Merchant */
.merchant-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 700px) { .merchant-layout { grid-template-columns: 1fr; } }
.svc-section-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7a6a; margin-bottom: 0.75rem; }
.item-grid { display: flex; flex-direction: column; gap: 0.4rem; }
.item-card {
  display: grid; grid-template-columns: 1fr auto; gap: 0.25rem;
  padding: 0.65rem 0.75rem; background: rgba(26,18,24,0.6);
  border: 1px solid rgba(232,160,32,0.08); border-radius: 6px;
  cursor: pointer; transition: border-color 0.15s;
}
.item-card:hover { border-color: rgba(232,160,32,0.35); }
.ic-name { font-size: 0.82rem; font-weight: 600; grid-column: 1; }
.ic-type { font-size: 0.65rem; color: #8a7a6a; grid-column: 1; }
.ic-stats { font-size: 0.68rem; color: #c0b090; grid-column: 1; }
.ic-price { font-family: 'Cinzel', serif; font-size: 0.8rem; color: #e8a020; font-weight: 700; grid-column: 2; grid-row: 1/3; align-self: center; text-align: right; }
.empty-state { font-size: 0.8rem; color: #4a3a32; padding: 1rem 0; }

/* Tavern / Cleric */
.hireable-list { display: flex; flex-direction: column; gap: 0.75rem; }
.hireable-card {
  display: flex; gap: 1rem; align-items: center;
  padding: 0.85rem 1rem; background: rgba(26,18,24,0.6);
  border: 1px solid rgba(232,160,32,0.1); border-radius: 8px;
}
.hireable-card.hired { opacity: 0.6; }
.hc-portrait { width: 40px; height: 40px; color: #e8a020; flex-shrink: 0; }
.hc-info { flex: 1; }
.hc-name { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; }
.hc-class { font-size: 0.7rem; color: #8a7a6a; font-family: 'Inter', sans-serif; font-weight: 400; }
.hc-desc { font-size: 0.75rem; color: #b0a090; margin-top: 0.2rem; line-height: 1.4; }
.hc-attrs { font-size: 0.65rem; color: #8a7a6a; margin-top: 0.3rem; }
.hire-btn {
  padding: 0.5rem 0.75rem; background: rgba(64,168,96,0.15);
  border: 1px solid rgba(64,168,96,0.4); border-radius: 6px;
  color: #6ddc96; font-family: 'Cinzel', serif; font-size: 0.75rem; font-weight: 700;
  cursor: pointer; text-align: center; min-width: 60px; min-height: 44px;
  transition: background 0.2s;
}
.hire-btn:hover:not(.disabled) { background: rgba(64,168,96,0.28); }
.hire-btn.disabled { opacity: 0.4; cursor: not-allowed; }
.hired-badge { font-size: 0.7rem; color: #e8a020; font-weight: 600; padding: 0.3rem 0.5rem; background: rgba(232,160,32,0.1); border-radius: 4px; }
.cleric-note { margin-top: 1.5rem; font-size: 0.75rem; color: #8a7a6a; line-height: 1.5; font-style: italic; }
.coming-soon { text-align: center; padding: 3rem 2rem; }
.cs-title { font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 700; color: #e8a020; margin-bottom: 0.75rem; }
.cs-text { font-size: 0.85rem; color: #8a7a6a; }

/* Actions panel */
.town-actions-panel {
  padding: 1rem 0.75rem; border-left: 1px solid rgba(232,160,32,0.1);
  display: flex; flex-direction: column; gap: 0.5rem;
  background: rgba(0,0,0,0.2);
}
.action-btn {
  display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
  padding: 0.75rem 0.5rem; background: rgba(26,18,24,0.6);
  border: 1px solid rgba(232,160,32,0.1); border-radius: 8px;
  color: #8a7a6a; font-size: 0.72rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; min-height: 60px; text-align: center;
}
.action-btn:hover { border-color: rgba(232,160,32,0.3); color: #f0e8d8; }
.action-primary { border-color: rgba(232,160,32,0.3); color: #e8a020; }
.action-separator { flex: 1; }
.action-leave {
  background: rgba(192,64,48,0.08); border-color: rgba(192,64,48,0.3);
  color: #c04030; margin-top: auto;
}
.action-leave:hover { background: rgba(192,64,48,0.18); }

/* Tooltip */
.item-tooltip {
  position: fixed; z-index: 1000; pointer-events: none;
  background: rgba(10,6,8,0.95); border: 1px solid rgba(232,160,32,0.4);
  border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.8rem;
  line-height: 1.6; max-width: 200px; color: #f0e8d8;
}
.tavern-layout { display: flex; flex-direction: column; }
.cleric-layout { display: flex; flex-direction: column; gap: 0.75rem; }
`,we=["STR","DEX","INT","CON"],xe=10,E=8;class ke{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._name="Hero",this._class=null,this._attrs={STR:E,DEX:E,INT:E,CON:E},this._pointsSpent=0,this._step="class",this._saveSlot=0}get _pointsLeft(){return xe-this._pointsSpent}onEnter(){this._build()}_build(){C("cb-styles",Ce),this._el=y("div","cb-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML="",this._step==="class"?this._renderClassStep():this._renderStatsStep()}_renderClassStep(){var a;const e=this._el;e.innerHTML=`
      <div class="cb-header">
        <div class="cb-title">Create Your Hero</div>
        <div class="cb-subtitle">Choose your class</div>
      </div>
      <div class="cb-class-grid" id="class-grid"></div>
      <div class="cb-footer">
        <button class="cb-btn cb-btn-ghost" id="cb-back">← Back</button>
        <button class="cb-btn cb-btn-primary" id="cb-next" disabled>Next →</button>
      </div>
    `;const t=e.querySelector("#class-grid");for(const s of O){const i=y("div",`cb-class-card${((a=this._class)==null?void 0:a.id)===s.id?" selected":""}`);i.dataset.id=s.id,i.innerHTML=`
        <div class="cb-class-icon">${s.svgIcon}</div>
        <div class="cb-class-name">${s.name}</div>
        <div class="cb-class-role">${s.role}</div>
        <div class="cb-class-hook">${s.hook}</div>
        <div class="cb-class-armor">${s.armorType}</div>
      `,i.addEventListener("click",()=>{this.audio.playSfx("click"),this._class=s,e.querySelectorAll(".cb-class-card").forEach(r=>r.classList.remove("selected")),i.classList.add("selected"),e.querySelector("#cb-next").disabled=!1}),t.appendChild(i)}e.querySelector("#cb-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),e.querySelector("#cb-next").addEventListener("click",()=>{this._class&&(this.audio.playSfx("click"),this._step="stats",this._render())})}_renderStatsStep(){const e=this._el;e.innerHTML=`
      <div class="cb-header">
        <div class="cb-title">${this._class.name}</div>
        <div class="cb-subtitle">Assign attributes</div>
      </div>
      <div class="cb-stats-area">
        <div class="cb-name-row">
          <label class="cb-label">Hero Name</label>
          <input class="cb-name-input" id="hero-name" type="text" maxlength="24" placeholder="Enter a name..." value="${this._name}">
        </div>
        <div class="cb-points-banner">
          <span id="pts-left">${this._pointsLeft}</span> points remaining
        </div>
        <div class="cb-attrs" id="attr-panel"></div>
        <div class="cb-preview-panel">
          <div class="cb-preview-title">Estimated Stats at Level 1</div>
          <div class="cb-preview-grid" id="preview-grid"></div>
        </div>
      </div>
      <div class="cb-footer">
        <button class="cb-btn cb-btn-ghost" id="cb-prev">← Back</button>
        <button class="cb-btn cb-btn-gold" id="cb-confirm">Begin Adventure →</button>
      </div>
    `,this._renderAttrs(),this._updatePreview(),e.querySelector("#hero-name").addEventListener("input",t=>{this._name=t.target.value||"Hero"}),e.querySelector("#cb-prev").addEventListener("click",()=>{this.audio.playSfx("click"),this._step="class",this._render()}),e.querySelector("#cb-confirm").addEventListener("click",()=>{this.audio.playSfx("victory"),this._confirm()})}_renderAttrs(){const e=this._el.querySelector("#attr-panel");if(e){e.innerHTML="";for(const t of we){const a=y("div","cb-attr-row"),s=Se[t];a.innerHTML=`
        <div class="cb-attr-info">
          <div class="cb-attr-name">${t}</div>
          <div class="cb-attr-desc">${s}</div>
        </div>
        <div class="cb-attr-controls">
          <button class="cb-attr-btn" data-attr="${t}" data-dir="-1">−</button>
          <span class="cb-attr-val" id="val-${t}">${this._attrs[t]}</span>
          <button class="cb-attr-btn" data-attr="${t}" data-dir="1">+</button>
        </div>
      `,e.appendChild(a)}e.querySelectorAll(".cb-attr-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.attr,s=parseInt(t.dataset.dir);this._adjustAttr(a,s)})})}}_adjustAttr(e,t){if(t>0&&this._pointsLeft<=0||t<0&&this._attrs[e]<=E)return;this._attrs[e]+=t,this._pointsSpent-=t*-1,this._pointsSpent+=t;const a=this._el.querySelector(`#val-${e}`);a&&(a.textContent=this._attrs[e]);const s=this._el.querySelector("#pts-left");s&&(s.textContent=this._pointsLeft),this._updatePreview(),this.audio.playSfx("click")}_updatePreview(){var h;const e=(h=this._el)==null?void 0:h.querySelector("#preview-grid");if(!e)return;const t=this._attrs,a=50+t.CON*10,s=30+t.INT*8,i=Math.round(70+t.DEX*1.2),r=Math.round(5+t.DEX*.8),o=Math.round(t.STR*1.5),d=Math.round(1+t.INT*.08,2);e.innerHTML=`
      <div class="preview-stat"><span class="ps-label">HP</span><span class="ps-val">${a}</span></div>
      <div class="preview-stat"><span class="ps-label">Mana</span><span class="ps-val">${s}</span></div>
      <div class="preview-stat"><span class="ps-label">Hit</span><span class="ps-val">${i}%</span></div>
      <div class="preview-stat"><span class="ps-label">Dodge</span><span class="ps-val">${r}%</span></div>
      <div class="preview-stat"><span class="ps-label">Melee</span><span class="ps-val">+${o}</span></div>
      <div class="preview-stat"><span class="ps-label">Spell</span><span class="ps-val">×${d.toFixed(2)}</span></div>
    `}_confirm(){const e={id:crypto.randomUUID(),name:this._name||"Hero",class:this._class.id,className:this._class.name,level:1,xp:0,attrs:{...this._attrs},skills:[this._class.skills[0]],equipment:{},gold:150};L.saveSlot(0,{heroName:e.name,class:e.className,act:1,level:1,hero:e}),this.manager.replace(new $(this.manager,this.audio,e,!0))}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}update(){}draw(){}}const Se={STR:"Melee damage · Physical armor · Carry weight",DEX:"Hit chance · Dodge · Ranged damage · Initiative",INT:"Spell power · Mana pool · Magic resistance",CON:"Max HP · Resist status effects · Endurance"},Ce=`
.cb-screen {
  position: absolute; inset: 0; overflow-y: auto;
  display: flex; flex-direction: column;
  background: linear-gradient(180deg, #08050a 0%, #0d0a14 100%);
  color: #f0e8d8; font-family: 'Inter', sans-serif;
}
.cb-header {
  text-align: center; padding: 2rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(232,160,32,0.15);
  flex-shrink: 0;
}
.cb-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 900;
  color: #e8a020; letter-spacing: 0.1em;
}
.cb-subtitle { font-size: 0.8rem; color: #8a7a6a; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 0.4rem; }
.cb-class-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem; padding: 1.5rem; flex: 1;
}
.cb-class-card {
  background: rgba(26,18,24,0.8);
  border: 1px solid rgba(232,160,32,0.12);
  border-radius: 10px; padding: 1rem 0.75rem;
  cursor: pointer; transition: all 0.2s;
  display: flex; flex-direction: column; gap: 0.3rem;
  min-height: 140px;
}
.cb-class-card:hover { border-color: rgba(232,160,32,0.5); background: rgba(36,26,32,0.9); transform: translateY(-2px); }
.cb-class-card.selected { border-color: #e8a020; background: rgba(232,160,32,0.12); }
.cb-class-icon { width: 36px; height: 36px; color: #e8a020; margin-bottom: 0.25rem; }
.cb-class-name { font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: #f0e8d8; }
.cb-class-role { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #8a7a6a; }
.cb-class-hook { font-size: 0.72rem; color: #c0b090; line-height: 1.4; margin-top: 0.25rem; flex: 1; }
.cb-class-armor { font-size: 0.65rem; color: #e8a020; opacity: 0.7; }
.cb-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.5rem; border-top: 1px solid rgba(232,160,32,0.15);
  flex-shrink: 0; gap: 1rem;
}
.cb-btn {
  padding: 0.75rem 1.5rem; border-radius: 6px; border: none;
  font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700;
  letter-spacing: 0.05em; cursor: pointer; min-height: 44px; min-width: 120px;
  transition: all 0.2s;
}
.cb-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.cb-btn-ghost { background: none; border: 1px solid rgba(255,255,255,0.2); color: #8a7a6a; }
.cb-btn-ghost:hover:not(:disabled) { color: #f0e8d8; border-color: rgba(255,255,255,0.4); }
.cb-btn-primary { background: rgba(232,160,32,0.15); border: 1px solid rgba(232,160,32,0.6); color: #e8a020; }
.cb-btn-primary:hover:not(:disabled) { background: rgba(232,160,32,0.25); }
.cb-btn-gold { background: linear-gradient(135deg, #c04030, #e8a020); color: #0a0608; font-weight: 900; border: none; }
.cb-btn-gold:hover { filter: brightness(1.1); }
.cb-stats-area { flex: 1; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; max-width: 480px; margin: 0 auto; width: 100%; }
.cb-name-row { display: flex; flex-direction: column; gap: 0.5rem; }
.cb-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7a6a; }
.cb-name-input {
  background: rgba(26,18,24,0.8); border: 1px solid rgba(232,160,32,0.3);
  border-radius: 6px; padding: 0.75rem 1rem; color: #f0e8d8;
  font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700;
  width: 100%; min-height: 44px; outline: none;
}
.cb-name-input:focus { border-color: rgba(232,160,32,0.7); }
.cb-points-banner {
  text-align: center; padding: 0.75rem;
  background: rgba(232,160,32,0.08); border-radius: 6px;
  font-size: 0.9rem; color: #e8a020; font-weight: 600;
}
.cb-points-banner span { font-size: 1.4rem; font-weight: 900; }
.cb-attrs { display: flex; flex-direction: column; gap: 0.75rem; }
.cb-attr-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.85rem 1rem; background: rgba(26,18,24,0.6);
  border: 1px solid rgba(255,255,255,0.06); border-radius: 8px;
}
.cb-attr-name { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #e8a020; }
.cb-attr-desc { font-size: 0.68rem; color: #8a7a6a; margin-top: 0.15rem; }
.cb-attr-controls { display: flex; align-items: center; gap: 0.75rem; }
.cb-attr-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(232,160,32,0.1); border: 1px solid rgba(232,160,32,0.3);
  color: #e8a020; font-size: 1.1rem; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.cb-attr-btn:hover { background: rgba(232,160,32,0.25); }
.cb-attr-val { font-family: 'Cinzel', serif; font-size: 1.2rem; font-weight: 900; color: #f0e8d8; min-width: 2rem; text-align: center; }
.cb-preview-panel {
  background: rgba(26,18,24,0.6); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px; padding: 1rem;
}
.cb-preview-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7a6a; margin-bottom: 0.75rem; }
.cb-preview-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.5rem; }
.preview-stat { text-align: center; }
.ps-label { display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: #8a7a6a; }
.ps-val { display: block; font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700; color: #e8a020; margin-top: 0.1rem; }
`;class Te{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){C("load-styles",Me),this._el=y("div","load-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=L.getAllSlots();this._el.innerHTML=`
      <div class="ls-panel">
        <div class="ls-title">Load Game</div>
        <div class="ls-slots" id="slot-list">
          ${e.map((t,a)=>`
            <div class="ls-slot${t?" has-save":" empty"}" data-slot="${a}">
              <div class="lss-num">Slot ${a+1}</div>
              ${t?`
                <div class="lss-info">
                  <div class="lss-name">${t.heroName}</div>
                  <div class="lss-class">${t.class} · Level ${t.level}</div>
                  <div class="lss-progress">Act ${t.act} · ${t.timestamp}</div>
                </div>
                <div class="lss-actions">
                  <button class="lss-load" data-slot="${a}">Load</button>
                  <button class="lss-delete" data-slot="${a}">Delete</button>
                </div>
              `:`
                <div class="lss-empty">Empty</div>
              `}
            </div>
          `).join("")}
        </div>
        <button class="ls-back" id="ls-back">← Back</button>
      </div>
    `,this._el.querySelector("#ls-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".lss-load").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.slot);L.loadSlot(a)&&(this.audio.playSfx("click"),this.manager.replace(new $(this.manager,this.audio,null,!1)))})}),this._el.querySelectorAll(".lss-delete").forEach(t=>{t.addEventListener("click",()=>{confirm(`Delete save slot ${parseInt(t.dataset.slot)+1}?`)&&(L.deleteSlot(parseInt(t.dataset.slot)),this.audio.playSfx("click"),this._render())})})}update(){}draw(){}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}}const Me=`
.load-screen {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(5,2,8,0.96); font-family: 'Inter', sans-serif;
}
.ls-panel { width: 100%; max-width: 460px; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
.ls-title { font-family: 'Cinzel', serif; font-size: 1.4rem; font-weight: 700; color: #e8a020; text-align: center; letter-spacing: 0.1em; }
.ls-slots { display: flex; flex-direction: column; gap: 0.75rem; }
.ls-slot {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 1.25rem; border-radius: 8px;
  border: 1px solid rgba(232,160,32,0.15); background: rgba(26,18,24,0.9);
  min-height: 72px;
}
.ls-slot.empty { opacity: 0.45; }
.lss-num { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7a6a; min-width: 40px; }
.lss-info { flex: 1; }
.lss-name { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700; color: #f0e8d8; }
.lss-class { font-size: 0.72rem; color: #8a7a6a; margin-top: 0.15rem; }
.lss-progress { font-size: 0.68rem; color: #e8a020; margin-top: 0.15rem; }
.lss-empty { flex: 1; color: #4a3a32; font-size: 0.8rem; }
.lss-actions { display: flex; flex-direction: column; gap: 0.35rem; }
.lss-load, .lss-delete {
  padding: 0.35rem 0.85rem; border-radius: 5px; border: 1px solid;
  font-size: 0.72rem; font-weight: 600; cursor: pointer; min-height: 32px;
  transition: background 0.15s;
}
.lss-load { background: rgba(232,160,32,0.12); border-color: rgba(232,160,32,0.4); color: #e8a020; }
.lss-load:hover { background: rgba(232,160,32,0.24); }
.lss-delete { background: rgba(192,64,48,0.08); border-color: rgba(192,64,48,0.3); color: #c04030; }
.lss-delete:hover { background: rgba(192,64,48,0.18); }
.ls-back { background: none; border: none; color: #8a7a6a; font-size: 0.85rem; cursor: pointer; text-align: center; text-decoration: underline; padding: 0.4rem; }
.ls-back:hover { color: #f0e8d8; }
`;class Le{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){C("settings-styles",`
      .settings-screen {
        position: absolute; inset: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        background: rgba(5,2,8,0.92); padding: 2rem;
      }
      .settings-title {
        font-family: 'Cinzel', Georgia, serif;
        font-size: 1.4rem; font-weight: 700;
        color: #e8a020; letter-spacing: 0.1em; margin-bottom: 2.5rem;
      }
      .settings-group { width: 100%; max-width: 360px; display: flex; flex-direction: column; gap: 1.5rem; }
      .setting-row { display: flex; flex-direction: column; gap: 0.5rem; }
      .setting-label { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7a6a; }
      .setting-slider { width: 100%; accent-color: #e8a020; height: 4px; cursor: pointer; }
      .setting-toggle { display: flex; align-items: center; gap: 1rem; }
      .toggle-switch {
        width: 44px; height: 24px; background: rgba(255,255,255,0.1);
        border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);
        cursor: pointer; position: relative; transition: background 0.2s;
      }
      .toggle-switch.on { background: rgba(232,160,32,0.4); border-color: rgba(232,160,32,0.6); }
      .toggle-switch::after {
        content: ''; position: absolute;
        top: 2px; left: 2px; width: 18px; height: 18px;
        background: #8a7a6a; border-radius: 50%; transition: transform 0.2s, background 0.2s;
      }
      .toggle-switch.on::after { transform: translateX(20px); background: #e8a020; }
      .settings-back {
        margin-top: 2.5rem; background: none; border: none; color: #8a7a6a;
        font-size: 0.85rem; cursor: pointer; text-decoration: underline;
      }
      .settings-back:hover { color: #f0e8d8; }
    `),this._el=y("div","settings-screen"),this._el.innerHTML=`
      <div class="settings-title">Settings</div>
      <div class="settings-group">
        <div class="setting-row">
          <label class="setting-label">Master Volume</label>
          <input type="range" class="setting-slider" id="master-vol" min="0" max="1" step="0.05" value="${this.audio.masterVolume}">
        </div>
        <div class="setting-row">
          <label class="setting-label">Music Volume</label>
          <input type="range" class="setting-slider" id="music-vol" min="0" max="1" step="0.05" value="${this.audio.musicVolume}">
        </div>
        <div class="setting-row">
          <label class="setting-label">SFX Volume</label>
          <input type="range" class="setting-slider" id="sfx-vol" min="0" max="1" step="0.05" value="${this.audio.sfxVolume}">
        </div>
        <div class="setting-row">
          <div class="setting-toggle">
            <div class="toggle-switch${localStorage.getItem("reduceMotion")==="1"?" on":""}" id="reduce-motion-toggle"></div>
            <span class="setting-label" style="margin:0">Reduce Motion</span>
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-toggle">
            <div class="toggle-switch${localStorage.getItem("autoAdvance")!=="0"?" on":""}" id="auto-advance-toggle"></div>
            <span class="setting-label" style="margin:0">Auto-Advance Dialog</span>
          </div>
        </div>
      </div>
      <button class="settings-back" id="settings-back">← Back</button>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#master-vol").addEventListener("input",a=>this.audio.setMasterVolume(+a.target.value)),this._el.querySelector("#music-vol").addEventListener("input",a=>this.audio.setMusicVolume(+a.target.value)),this._el.querySelector("#sfx-vol").addEventListener("input",a=>this.audio.setSfxVolume(+a.target.value));const e=this._el.querySelector("#reduce-motion-toggle");e.addEventListener("click",()=>{const a=e.classList.toggle("on");localStorage.setItem("reduceMotion",a?"1":"0")});const t=this._el.querySelector("#auto-advance-toggle");t.addEventListener("click",()=>{const a=t.classList.toggle("on");localStorage.setItem("autoAdvance",a?"1":"0")}),this._el.querySelector("#settings-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}update(){}draw(){}}const S={CLOUDS:0,LOGO_DROP:1,MENU:2};class Ee{constructor(e,t){this.manager=e,this.audio=t,this.phase=S.CLOUDS,this.t=0,this._el=null,this._particles=[],this._clouds=this._makeClouds(),this._logoY=-200,this._logoAlpha=0,this._menuAlpha=0,this._menuVisible=!1}_makeClouds(){const e=[];for(let t=0;t<12;t++)e.push({x:Math.random()*2e3-200,y:Math.random()*400+50,w:Math.random()*300+150,h:Math.random()*80+40,speed:Math.random()*.3+.1,alpha:Math.random()*.4+.3});return e}_makeParticles(e,t){const a=[];for(let s=0;s<60;s++)a.push({x:Math.random()*e,y:Math.random()*t,vx:(Math.random()-.5)*.4,vy:-(Math.random()*.6+.1),size:Math.random()*2+.5,alpha:Math.random(),life:Math.random(),maxLife:Math.random()*.5+.3,color:["#e8a020","#c04030","#f0c060","#ff6040"][Math.floor(Math.random()*4)]});return a}onEnter(){this.audio.playTitleMusic(),this._buildMenu()}_buildMenu(){const e=this.manager.uiOverlay;this._el=y("div","title-menu"),this._el.innerHTML=`
      <div class="title-menu-inner" id="tm-inner">
        <div class="tm-subtitle">A High Fantasy Adventure</div>
        <nav class="tm-nav">
          <button class="tm-btn" id="btn-new-game">New Game</button>
          <button class="tm-btn" id="btn-load-game">Load Game</button>
          <button class="tm-btn tm-btn-secondary" id="btn-settings">Settings</button>
        </nav>
        <div class="tm-footer">Emberveil · 2026</div>
      </div>
    `,this._el.style.opacity="0",this._el.style.pointerEvents="none",e.appendChild(this._el),this._el.querySelector("#btn-new-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ke(this.manager,this.audio))}),this._el.querySelector("#btn-load-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Te(this.manager,this.audio))}),this._el.querySelector("#btn-settings").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Le(this.manager,this.audio))}),this._injectStyles()}_injectStyles(){if(document.getElementById("title-screen-styles"))return;const e=document.createElement("style");e.id="title-screen-styles",e.textContent=`
      .title-menu {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 12%;
        transition: opacity 1s ease;
      }
      .title-menu-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
      }
      .tm-subtitle {
        font-size: 0.85rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: rgba(240,232,216,0.5);
        margin-bottom: 2.5rem;
        font-family: 'Cinzel', Georgia, serif;
      }
      .tm-nav {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        align-items: center;
        width: 220px;
      }
      .tm-btn {
        width: 100%;
        padding: 0.85rem 2rem;
        background: rgba(232,160,32,0.12);
        border: 1px solid rgba(232,160,32,0.5);
        border-radius: 6px;
        color: #f0e8d8;
        font-family: 'Cinzel', Georgia, serif;
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        cursor: pointer;
        transition: background 0.2s, border-color 0.2s, transform 0.15s;
        min-height: 48px;
      }
      .tm-btn:hover {
        background: rgba(232,160,32,0.22);
        border-color: rgba(232,160,32,0.9);
        transform: translateY(-1px);
      }
      .tm-btn:active { transform: translateY(0); }
      .tm-btn-secondary {
        background: rgba(255,255,255,0.04);
        border-color: rgba(255,255,255,0.2);
        color: rgba(240,232,216,0.6);
        font-size: 0.8rem;
      }
      .tm-btn-secondary:hover {
        background: rgba(255,255,255,0.08);
        border-color: rgba(255,255,255,0.4);
        color: #f0e8d8;
      }
      .tm-footer {
        margin-top: 2.5rem;
        font-size: 0.65rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(240,232,216,0.2);
      }
    `,document.head.appendChild(e)}update(e){this.t+=e;const t=this.manager.width,a=this.manager.height;for(const s of this._clouds)s.x+=s.speed,s.x>t+200&&(s.x=-300);this._particles.length||(this._particles=this._makeParticles(t,a));for(const s of this._particles)s.life-=e*.5,s.life<=0&&(s.x=Math.random()*t,s.y=a+10,s.life=s.maxLife),s.x+=s.vx,s.y+=s.vy;if(this.phase===S.CLOUDS)this.t>2.5&&(this.phase=S.LOGO_DROP,this.t=0);else if(this.phase===S.LOGO_DROP){const s=Math.min(this.t/1.5,1),i=1-Math.pow(1-s,3);this._logoY=(1-i)*(-a*.3)+i*(a*.35),this._logoAlpha=Math.min(this.t/.8,1),this.t>1.8&&(this.phase=S.MENU,this.t=0)}else this.phase===S.MENU&&(this._menuAlpha=Math.min(this.t/1.5,1),this._el&&(this._el.style.opacity=this._menuAlpha,this._el.style.pointerEvents=this._menuAlpha>.5?"auto":"none"))}draw(e){const t=this.manager.width,a=this.manager.height,s=e.createLinearGradient(0,0,0,a);s.addColorStop(0,"#050208"),s.addColorStop(.4,"#0d0810"),s.addColorStop(.7,"#1a1025"),s.addColorStop(1,"#2a1830"),e.fillStyle=s,e.fillRect(0,0,t,a),e.save();const i=this.phase===S.CLOUDS?Math.max(0,1-this.t/1.5):this.phase===S.LOGO_DROP?Math.max(0,1-this.t):.3;for(let l=0;l<80;l++){const c=l*137.5%1*t,p=l*97.3%1*a*.6,f=l*61.7%1*.8+.2;e.globalAlpha=f*i,e.fillStyle="#ffffff",e.beginPath(),e.arc(c,p,.8,0,Math.PI*2),e.fill()}e.restore();const r=a*.68,o=e.createLinearGradient(0,r,0,a);o.addColorStop(0,"#0d1a10"),o.addColorStop(.3,"#0a1208"),o.addColorStop(1,"#050a04"),e.fillStyle=o,e.fillRect(0,r,t,a-r),e.save(),e.fillStyle="#0a1208",e.beginPath(),e.moveTo(0,a),e.lineTo(0,r+20);for(let l=0;l<=t;l+=40){const c=Math.sin(l*.008)*30+Math.sin(l*.02)*15;e.lineTo(l,r-c)}e.lineTo(t,a),e.closePath(),e.fill(),e.restore();const d=e.createRadialGradient(t/2,r,0,t/2,r,t*.5);d.addColorStop(0,"rgba(192,64,48,0.2)"),d.addColorStop(.4,"rgba(192,64,48,0.06)"),d.addColorStop(1,"rgba(192,64,48,0)"),e.fillStyle=d,e.fillRect(0,r-80,t,160),e.save();const h=this.phase===S.CLOUDS?this.t*60:0;for(const l of this._clouds){e.globalAlpha=l.alpha;const c=e.createRadialGradient(l.x+l.w/2,l.y,0,l.x+l.w/2,l.y,l.w/2);c.addColorStop(0,"rgba(200,180,255,0.8)"),c.addColorStop(1,"rgba(100,80,140,0)"),e.fillStyle=c,e.beginPath(),e.ellipse(l.x+l.w/2,l.y+h*.1,l.w/2,l.h/2,0,0,Math.PI*2),e.fill()}e.restore(),e.save();for(const l of this._particles){const c=l.life/l.maxLife*.7;e.globalAlpha=c,e.fillStyle=l.color,e.shadowBlur=6,e.shadowColor=l.color,e.beginPath(),e.arc(l.x,l.y,l.size,0,Math.PI*2),e.fill()}if(e.shadowBlur=0,e.restore(),this.phase!==S.CLOUDS){e.save(),e.globalAlpha=this._logoAlpha;const l=e.createRadialGradient(t/2,this._logoY,0,t/2,this._logoY,250);l.addColorStop(0,"rgba(232,160,32,0.15)"),l.addColorStop(1,"rgba(232,160,32,0)"),e.fillStyle=l,e.fillRect(t/2-300,this._logoY-100,600,200);const c=Math.min(t*.13,80);e.font=`900 ${c}px Cinzel, Georgia, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=40,e.shadowColor="#c04030",e.fillStyle="#c04030",e.fillText("EMBERVEIL",t/2+2,this._logoY+2),e.shadowBlur=20,e.shadowColor="#e8a020",e.fillStyle="#e8a020",e.fillText("EMBERVEIL",t/2,this._logoY),e.shadowBlur=0,e.fillStyle="#f8d880",e.globalAlpha=this._logoAlpha*.4,e.fillText("EMBERVEIL",t/2,this._logoY-1),e.restore()}}onExit(){u(this._el),this._el=null}destroy(){u(this._el),this._el=null}}const A=document.getElementById("game-canvas"),X=document.getElementById("ui-overlay");function W(){A.width=window.innerWidth,A.height=window.innerHeight}W();window.addEventListener("resize",W);const $e=new K(A,X),Y=new Z,z=new Q(A,X,$e,Y);z.push(new Ee(z,Y));let P=0;function U(n){const e=Math.min((n-P)/1e3,.1);P=n,z.update(e),z.draw(),requestAnimationFrame(U)}requestAnimationFrame(U);
