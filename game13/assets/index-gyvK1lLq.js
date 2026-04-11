(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();class X{constructor(e,t,i,a){this.canvas=e,this.ctx=e.getContext("2d"),this.uiOverlay=t,this.input=i,this.audio=a,this._stack=[]}push(e){const t=this._stack[this._stack.length-1];t!=null&&t.onPause&&t.onPause(),e.manager=this,this._stack.push(e),e.onEnter&&e.onEnter()}pop(){if(!this._stack.length)return;const e=this._stack.pop();e.onExit&&e.onExit(),e.destroy&&e.destroy();const t=this._stack[this._stack.length-1];t!=null&&t.onResume&&t.onResume()}replace(e){this._stack.length&&this.pop(),this.push(e)}update(e){var t;(t=this._stack[this._stack.length-1])==null||t.update(e)}draw(){var t;const e=this.ctx;e.clearRect(0,0,this.canvas.width,this.canvas.height);for(const i of this._stack)(t=i.draw)==null||t.call(i,e)}get width(){return this.canvas.width}get height(){return this.canvas.height}}class J{constructor(e,t){this.canvas=e,this.overlay=t,this.mouse={x:0,y:0,down:!1},this.keys=new Set,this._clicks=[],this._listeners=[],this._bind("pointermove",e,i=>this._onMove(i)),this._bind("pointerdown",e,i=>this._onDown(i)),this._bind("pointerup",e,i=>this._onUp(i)),this._bind("keydown",window,i=>this.keys.add(i.code)),this._bind("keyup",window,i=>this.keys.delete(i.code))}_bind(e,t,i){t.addEventListener(e,i,{passive:!0}),this._listeners.push({event:e,target:t,handler:i})}_onMove(e){const t=this.canvas.getBoundingClientRect(),i=this.canvas.width/t.width,a=this.canvas.height/t.height;this.mouse.x=(e.clientX-t.left)*i,this.mouse.y=(e.clientY-t.top)*a}_onDown(e){this._onMove(e),this.mouse.down=!0}_onUp(e){this._onMove(e),this.mouse.down=!1,this._clicks.push({x:this.mouse.x,y:this.mouse.y})}consumeClicks(){const e=this._clicks;return this._clicks=[],e}isKey(e){return this.keys.has(e)}destroy(){for(const{event:e,target:t,handler:i}of this._listeners)t.removeEventListener(e,i)}}class Q{constructor(){this._ctx=null,this._masterGain=null,this._musicGain=null,this._sfxGain=null,this._currentTrack=null,this._nodes=[],this.masterVolume=.8,this.musicVolume=.6,this.sfxVolume=.8,this._started=!1}_ensureContext(){this._ctx||(this._ctx=new(window.AudioContext||window.webkitAudioContext),this._masterGain=this._ctx.createGain(),this._masterGain.gain.value=this.masterVolume,this._masterGain.connect(this._ctx.destination),this._musicGain=this._ctx.createGain(),this._musicGain.gain.value=this.musicVolume,this._musicGain.connect(this._masterGain),this._sfxGain=this._ctx.createGain(),this._sfxGain.gain.value=this.sfxVolume,this._sfxGain.connect(this._masterGain))}resume(){this._ensureContext(),this._ctx.state==="suspended"&&this._ctx.resume(),this._started=!0}playTitleMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:55,type:"sine",gain:.08,detune:0},{freq:82.5,type:"sine",gain:.05,detune:5},{freq:110,type:"sine",gain:.04,detune:-3}]),this._addPad([220,277.2,329.6,440],.03)}playCombatMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:110,type:"sawtooth",gain:.04,detune:0},{freq:165,type:"square",gain:.02,detune:8}]),this._addPulse(110,.12,.4)}playTownMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:220,type:"triangle",gain:.06,detune:0},{freq:330,type:"sine",gain:.04,detune:2},{freq:440,type:"sine",gain:.03,detune:-2}]),this._addPad([220,293.7,369.9],.04)}_buildAmbientLayer(e){if(!this._ctx)return[];const t=[];for(const i of e){const a=this._ctx.createOscillator(),s=this._ctx.createGain(),o=this._ctx.createBiquadFilter();a.type=i.type,a.frequency.value=i.freq,a.detune.value=i.detune,o.type="lowpass",o.frequency.value=800,s.gain.value=0,a.connect(o),o.connect(s),s.connect(this._musicGain),a.start(),s.gain.linearRampToValueAtTime(i.gain,this._ctx.currentTime+3),t.push(a,s,o)}return this._nodes.push(...t),t}_addPad(e,t){if(!this._ctx)return;const i=4;let a=this._ctx.currentTime+2;const s=()=>{if(this._ctx){for(const o of e){const r=this._ctx.createOscillator(),c=this._ctx.createGain();r.type="sine",r.frequency.value=o,c.gain.value=0,r.connect(c),c.connect(this._musicGain),r.start(a),c.gain.setValueAtTime(0,a),c.gain.linearRampToValueAtTime(t,a+.5),c.gain.setValueAtTime(t,a+i-1),c.gain.linearRampToValueAtTime(0,a+i),r.stop(a+i+.1)}a+=i}};for(let o=0;o<20;o++)s()}_addPulse(e,t,i){if(!this._ctx)return;let a=this._ctx.currentTime+.5;for(let s=0;s<60;s++){const o=this._ctx.createOscillator(),r=this._ctx.createGain();o.type="square",o.frequency.value=e,r.gain.value=0,o.connect(r),r.connect(this._musicGain),o.start(a),r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(t,a+.02),r.gain.linearRampToValueAtTime(0,a+i*.8),o.stop(a+i),a+=i}}_stopCurrentTrack(){var e,t;for(const i of this._nodes){try{(e=i.stop)==null||e.call(i)}catch{}try{(t=i.disconnect)==null||t.call(i)}catch{}}this._nodes=[]}playSfx(e){if(this.resume(),!this._ctx)return;const t=this._ctx,i=t.currentTime,a=t.createOscillator(),s=t.createGain();switch(a.connect(s),s.connect(this._sfxGain),e){case"click":a.frequency.value=880,a.type="sine",s.gain.setValueAtTime(.15,i),s.gain.exponentialRampToValueAtTime(.001,i+.1),a.start(i),a.stop(i+.1);break;case"hit":a.frequency.value=200,a.type="sawtooth",s.gain.setValueAtTime(.3,i),s.gain.exponentialRampToValueAtTime(.001,i+.2),a.start(i),a.stop(i+.2);break;case"spell":a.frequency.setValueAtTime(440,i),a.frequency.linearRampToValueAtTime(880,i+.3),a.type="sine",s.gain.setValueAtTime(.2,i),s.gain.exponentialRampToValueAtTime(.001,i+.4),a.start(i),a.stop(i+.4);break;case"victory":a.frequency.setValueAtTime(440,i),a.frequency.setValueAtTime(554,i+.15),a.frequency.setValueAtTime(659,i+.3),a.frequency.setValueAtTime(880,i+.45),a.type="sine",s.gain.setValueAtTime(.25,i),s.gain.setValueAtTime(.25,i+.6),s.gain.exponentialRampToValueAtTime(.001,i+1),a.start(i),a.stop(i+1);break}}setMasterVolume(e){this.masterVolume=e,this._masterGain&&(this._masterGain.gain.value=e)}setMusicVolume(e){this.musicVolume=e,this._musicGain&&(this._musicGain.gain.value=e)}setSfxVolume(e){this.sfxVolume=e,this._sfxGain&&(this._sfxGain.gain.value=e)}}function _(n,e,t={}){const i=document.createElement(n);e&&(i.className=e);for(const[a,s]of Object.entries(t))i.setAttribute(a,s);return i}function y(n){var e;(e=n==null?void 0:n.parentNode)==null||e.removeChild(n)}function M(n,e){if(document.getElementById(n))return;const t=document.createElement("style");t.id=n,t.textContent=e,document.head.appendChild(t)}const D=[{id:"warrior",name:"Warrior",role:"Frontline Tank",hook:"Shield Bash stuns enemies. Whirlwind hits all adjacent foes. Unbreakable when outnumbered.",armorType:"Heavy Armor · Sword / Hammer / 2H",primaryAttr:"STR",armorTier:"heavy",weapons:["sword","hammer","2h_sword","2h_axe"],skills:["shield_bash","battle_cry","whirlwind","unbreakable"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4L8 14v8l10 10 10-10v-8L18 4z"/><path d="M18 4v28M8 14h20"/></svg>'},{id:"paladin",name:"Paladin",role:"Holy Warrior",hook:"Holy Strike crits vs demons. Lay on Hands keeps allies alive. Consecration sustains long fights.",armorType:"Medium Armor · Sword / Scepter + Shield",primaryAttr:"STR",armorTier:"medium",weapons:["sword","scepter"],skills:["holy_strike","lay_on_hands","divine_shield","consecration"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 3l-14 6v9c0 8 7 14 14 16 7-2 14-8 14-16V9L18 3z"/><path d="M12 18l4 4 8-8"/></svg>'},{id:"ranger",name:"Ranger",role:"Precision Ranged",hook:"Aimed Shot ignores armor. Rain of Arrows blankets the entire enemy field for 3 rounds.",armorType:"Light Armor · Bow / Crossbow / Javelin",primaryAttr:"DEX",armorTier:"light",weapons:["bow","crossbow","javelin"],skills:["aimed_shot","multi_shot","smoke_trap","rain_of_arrows"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l26 26M5 5l8 2-2-8"/><circle cx="24" cy="12" r="4"/></svg>'},{id:"rogue",name:"Rogue",role:"Burst Assassin",hook:"200% Backstab on stunned targets. Death Mark makes enemies take 50% more damage from all sources.",armorType:"Light Armor · Dagger (dual wield)",primaryAttr:"DEX",armorTier:"light",weapons:["dagger"],skills:["backstab","poison_blade","shadow_step","death_mark"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 26L26 10M18 10l8-2-2 8"/><path d="M10 26c-2 2-4 2-4 0s0-2 2-4"/></svg>'},{id:"cleric",name:"Cleric",role:"Primary Healer",hook:"Mass Resurrection can auto-trigger on wipe. Sanctuary makes an ally temporarily untargetable.",armorType:"Light Armor · Staff / Scepter / Wand",primaryAttr:"INT",armorTier:"light",weapons:["staff","scepter","wand"],skills:["heal","smite","sanctuary","mass_resurrection"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4v28M4 18h28"/></svg>'},{id:"bard",name:"Bard",role:"Support Maestro",hook:"Ballad of Valor gives one hero two turns per round. Song of Ruin strips all enemy buffs at once.",armorType:"Light Armor · Dagger / Wand",primaryAttr:"INT",armorTier:"light",weapons:["dagger","wand"],skills:["inspiring_tune","discordant_wail","ballad_of_valor","song_of_ruin"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 28c0-3 3-5 8-5s8 2 8 5"/><path d="M14 23V10l12-3v13"/><circle cx="10" cy="28" r="3"/><circle cx="24" cy="25" r="3"/></svg>'},{id:"mage",name:"Mage",role:"AoE Glass Cannon",hook:"Fireball torches entire enemy packs. Blizzard hits all enemies for 3 rounds. Arcane Surge: 400% INT.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["magic_missile","fireball","blizzard","arcane_surge"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>'},{id:"necromancer",name:"Necromancer",role:"Army Builder",hook:"Raise Dead turns corpses into skeleton allies. Death Coil applies Poison AND Bleed to all enemies.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["bone_spike","raise_dead","life_drain","death_coil"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="8"/><path d="M14 14v5M22 14v5M10 28c0-5 4-9 8-9s8 4 8 9"/></svg>'},{id:"warlock",name:"Warlock",role:"Chaos Dealer",hook:"Corruption spreads on enemy death. Soul Pact doubles all DoT at cost of own HP.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["corruption","hellfire","soul_pact","void_rift"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-4 6-8 8-8 14a8 8 0 0016 0c0-6-4-8-8-14z"/><path d="M14 22c0 2.2 1.8 4 4 4s4-1.8 4-4"/></svg>'},{id:"demon_hunter",name:"Demon Hunter",role:"Specialist Killer",hook:"+50% damage vs demons. Vengeance stacks from fallen allies then unleashes devastating burst.",armorType:"Light Armor · Crossbow / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["crossbow","dagger"],skills:["demon_bolt","glaive_toss","fel_sight","vengeance"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L18 6l12 24"/><path d="M11 22h14"/><path d="M18 6v5"/></svg>'},{id:"scavenger",name:"Scavenger",role:"Resource Specialist",hook:"Scrounge finds items mid-combat. Jackpot has 20% chance to loot Magic+ gear from each kill.",armorType:"Light/Medium · Any 1H weapon",primaryAttr:"DEX",armorTier:"light",weapons:["dagger","sword","hammer","javelin"],skills:["scrounge","thrown_junk","makeshift_bomb","jackpot"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="16" width="16" height="14" rx="2"/><path d="M6 16h24M14 16v-4a4 4 0 018 0v4"/></svg>'},{id:"swashbuckler",name:"Swashbuckler",role:"Flashy Duelist",hook:"Build Flair stacks with Flourish. Grandeur releases all stacks in one legendary strike.",armorType:"Light Armor · Sword / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["sword","dagger"],skills:["riposte","flourish","taunt","grandeur"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L30 6M22 6l8-2-2 8"/><path d="M6 30a4 4 0 004-4"/></svg>'},{id:"dragon_knight",name:"Dragon Knight",role:"Draconic Warrior",hook:"Choose fire/ice/lightning. Draconic Fury turns all attacks into group AoE for 2 rounds.",armorType:"Heavy/Medium · 2H Sword / 2H Axe",primaryAttr:"STR",armorTier:"heavy",weapons:["2h_sword","2h_axe"],skills:["dragon_claw","breath_weapon","dragon_scales","draconic_fury"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c6 4 12 10 12 16s-6 12-12 12S6 26 6 20c0-6 6-12 12-16z"/><path d="M18 4c-3 6 0 14 0 18"/><path d="M8 16c4-2 8-2 10 0"/></svg>'},{id:"pyromancer",name:"Pyromancer",role:"Fire Specialist",hook:"Stack Burn on multiple groups. Meteor ignites every enemy group simultaneously.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["flame_lance","ignite","pyroclasm","meteor"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-2 8 6 10 2 18a8 8 0 01-8-8c0-2 1-4 2-5-1 4 2 6 4 4 2-8-4-6-4-14"/><path d="M18 22a4 4 0 000 8"/></svg>'}],V={version:1,hero:null,party:[],companions:[],bench:[],gold:150,inventory:[],storyFlags:{},quests:[],act:1,zoneId:"border_roads",nodeId:"start",visitedNodes:new Set,playTimeSeconds:0};let p={...V};const h={get(){return p},init(n){p={...V,hero:n,party:[n],gold:n.gold??150,visitedNodes:new Set(["start"])}},load(n){p={...n,visitedNodes:new Set(n.visitedNodes||["start"])}},toSaveData(){return{...p,visitedNodes:[...p.visitedNodes]}},setFlag(n,e=!0){p.storyFlags[n]=e},getFlag(n){return p.storyFlags[n]},addGold(n){p.gold=Math.max(0,(p.gold||0)+n)},getGold(){return p.gold||0},addToInventory(n){p.inventory.push(n)},removeFromInventory(n){p.inventory=p.inventory.filter(e=>e.id!==n)},getParty(){return p.party},getCompanions(){return p.companions},getAllCombatants(){return[...p.party,...p.companions]},addToParty(n){return p.party.length<4?(p.party.push(n),!0):!1},addToCompanions(n){return p.companions.length<4?(p.companions.push(n),!0):!1},addToBench(n){p.bench.push(n)},visitNode(n){p.visitedNodes.add(n)},hasVisited(n){return p.visitedNodes.has(n)}},v={COMBAT:"combat",DIALOG:"dialog",TOWN:"town",TREASURE:"treasure",AMBUSH:"ambush",BOSS:"boss",LORE:"lore"},K=[{id:"border_roads",name:"The Border Roads",act:1,zoneIndex:0,nodes:[{id:"start",type:"town",name:"Emberglen",x:.1,y:.5,exits:["road_ambush"]},{id:"road_ambush",type:"dialog",name:"Shady Wanderer",x:.3,y:.4,exits:["crossroads_a","crossroads_b"]},{id:"crossroads_a",type:"combat",name:"Goblin Scout Pack",x:.5,y:.25,exits:["ruined_watch"]},{id:"crossroads_b",type:"lore",name:"Scorched Village",x:.5,y:.65,exits:["ruined_watch"]},{id:"ruined_watch",type:"combat",name:"Ruined Watchtower",x:.7,y:.5,exits:["border_boss"]},{id:"border_boss",type:"boss",name:"Warlord's Vanguard",x:.9,y:.5,exits:[]}],enemies:{goblin_scout_pack:{name:"Goblin Scout Pack",groups:[{id:"goblin_scout",name:"Goblin Scout",count:3,hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:12,xpValue:15,gold:[2,6]}]},ruined_watchtower:{name:"Corrupted Outpost",groups:[{id:"goblin_warrior",name:"Goblin Warrior",count:2,hp:35,maxHp:35,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12]},{id:"goblin_scout",name:"Goblin Scout",count:2,hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:12,xpValue:15,gold:[2,6]}]}}},{id:"thornwood",name:"Thornwood Forest",act:1,zoneIndex:1,nodes:[{id:"forest_enter",type:"dialog",name:"Forest Edge",x:.1,y:.5,exits:["spider_hollow","hidden_path"]},{id:"spider_hollow",type:"combat",name:"Spider Hollow",x:.3,y:.3,exits:["goblin_camp"]},{id:"hidden_path",type:"lore",name:"Ancient Runestone",x:.3,y:.7,exits:["goblin_camp"]},{id:"goblin_camp",type:"combat",name:"Goblin Camp",x:.55,y:.5,exits:["seer_hut","treasure_grove"]},{id:"seer_hut",type:"dialog",name:"The Seer's Hut",x:.75,y:.3,exits:["thornwood_boss"]},{id:"treasure_grove",type:"treasure",name:"Hidden Grove",x:.75,y:.7,exits:["thornwood_boss"]},{id:"thornwood_boss",type:"boss",name:"The Veil Wardens",x:.92,y:.5,exits:[]}],enemies:{}}],Z=.5,ee=.2;class R{constructor(e,t,i,a){this.manager=e,this.audio=t,this.hero=i,this.encounter=a,this._el=null,this._heroes=[this._heroToCombatant(i)],this._enemyGroups=a.enemies.map((s,o)=>this._buildEnemyGroup(s,o)),this._allEnemies=this._enemyGroups.flat(),this._log=[],this._round=1,this._turnIdx=0,this._turnTimer=0,this._phase="START",this._particles=[],this._flashTargets=new Map,this._combatants=[],this._t=0,this._startDelay=1,this._animQueue=[],this._buildTurnOrder()}_heroToCombatant(e){const t=e.attrs;return{id:e.id,name:e.name,class:e.class,isHero:!0,hp:50+t.CON*10,maxHp:50+t.CON*10,mp:30+t.INT*8,maxMp:30+t.INT*8,dmg:[Math.max(1,Math.round(t.STR*1.2)),Math.max(4,Math.round(t.STR*2.2))],armor:0,hit:Math.min(95,70+Math.round(t.DEX*1.2)),dodge:Math.min(40,5+Math.round(t.DEX*.8)),initiative:t.DEX,alive:!0,stance:"ready",x:0,y:0,offsetX:0,offsetY:0}}_buildEnemyGroup(e,t){const i=[];for(let a=0;a<e.count;a++)i.push({id:`${e.id}_${t}_${a}`,name:e.name,groupIdx:t,isHero:!1,hp:e.hp,maxHp:e.maxHp,dmg:[...e.dmg],armor:e.armor,hit:e.hit,dodge:e.dodge,initiative:5+Math.random()*5,alive:!0,stance:"ready",xpValue:e.xpValue,gold:e.gold,x:0,y:0,offsetX:0,offsetY:0});return i}_buildTurnOrder(){const e=[...this._heroes,...this._allEnemies].filter(t=>t.alive);e.forEach(t=>{t._roll=t.initiative+Math.random()*10}),e.sort((t,i)=>i._roll-t._roll),this._turnOrder=e,this._turnIdx=0}onEnter(){this.audio.playCombatMusic(),this._build()}_build(){M("combat-styles",te),this._el=_("div","combat-screen"),this._el.innerHTML=`
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
    `}_updateHud(){var t,i,a,s;for(const o of this._heroes){const r=(t=this._el)==null?void 0:t.querySelector(`#hp-bar-${o.id}`),c=(i=this._el)==null?void 0:i.querySelector(`#mp-bar-${o.id}`),g=(a=this._el)==null?void 0:a.querySelector(`#hp-val-${o.id}`);r&&(r.style.width=`${Math.max(0,o.hp/o.maxHp*100)}%`),c&&(c.style.width=`${Math.max(0,o.mp/o.maxMp*100)}%`),g&&(g.textContent=Math.max(0,o.hp))}const e=(s=this._el)==null?void 0:s.querySelector("#round-num");e&&(e.textContent=this._round)}_addLog(e,t="normal"){var s;this._log.push({msg:e,type:t});const i=(s=this._el)==null?void 0:s.querySelector("#log-entries");if(!i)return;const a=_("div",`log-entry log-${t}`);for(a.textContent=e,i.appendChild(a);i.children.length>8;)i.removeChild(i.firstChild);i.scrollTop=i.scrollHeight}update(e){if(this._t+=e,this._phase==="START"){this._t>=this._startDelay&&(this._phase="PLAYING",this._t=0,this._addLog(`Round ${this._round} begins!`,"round"));return}if(this._phase==="PLAYING"){for(const t of this._animQueue)t.progress=Math.min(1,t.progress+e/t.duration);this._animQueue=this._animQueue.filter(t=>t.progress<1);for(const[t,i]of this._flashTargets){const a=i-e;a<=0?this._flashTargets.delete(t):this._flashTargets.set(t,a)}this._particles=this._particles.filter(t=>(t.life-=e,t.x+=t.vx,t.y+=t.vy,t.vy+=30*e,t.life>0)),this._turnTimer+=e,!(this._turnTimer<Z)&&(this._turnTimer=0,this._executeTurn())}}_executeTurn(){if(this._turnIdx>=this._turnOrder.length){this._round++,this._buildTurnOrder(),this._addLog(`── Round ${this._round} ──`,"round");return}const e=this._turnOrder[this._turnIdx];if(this._turnIdx++,!e.alive)return;const t=e.isHero?this._allEnemies.filter(l=>l.alive):this._heroes.filter(l=>l.alive);if(!t.length)return;const i=t[Math.floor(Math.random()*t.length)],a=Math.random()*100,s=Math.max(5,Math.min(95,e.hit-i.dodge));if(!(a<s)){this._addLog(`${e.name} misses ${i.name}.`,"miss"),e.stance="attack",setTimeout(()=>{e.stance="ready"},400);return}const r=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),c=Math.max(1,r-i.armor);i.hp-=c,e.stance="attack",this._flashTargets.set(i.id,ee),this._spawnHitParticles(i),this.audio.playSfx("hit"),setTimeout(()=>{e.stance="ready"},400),this._addLog(`${e.name} hits ${i.name} for ${c} damage.`,e.isHero?"hero":"enemy"),this._updateHud(),i.hp<=0&&(i.hp=0,i.alive=!1,i.stance="death",this._addLog(`${i.name} is defeated!`,"death"));const g=this._allEnemies.every(l=>!l.alive),d=this._heroes.every(l=>!l.alive);g?(setTimeout(()=>this._victory(),800),this._phase="VICTORY"):d&&(setTimeout(()=>this._defeat(),800),this._phase="DEFEAT")}_spawnHitParticles(e){const t=["#e8a020","#ff6040","#f0c060"];for(let i=0;i<6;i++)this._particles.push({x:e.x+e.offsetX,y:e.y+e.offsetY,vx:(Math.random()-.5)*80,vy:-(Math.random()*60+20),size:Math.random()*4+2,color:t[Math.floor(Math.random()*t.length)],life:Math.random()*.4+.2})}_victory(){this.audio.playSfx("victory");let e=0,t=0;for(const i of this._allEnemies)e+=i.xpValue,t+=i.gold[0]+Math.floor(Math.random()*(i.gold[1]-i.gold[0]+1));this.hero.xp=(this.hero.xp||0)+e,this.hero.gold=(this.hero.gold||0)+t,this._showEndModal("Victory!",`
      <div class="end-rewards">
        <div class="end-reward"><span class="er-label">XP Gained</span><span class="er-val">+${e}</span></div>
        <div class="end-reward"><span class="er-label">Gold Found</span><span class="er-val">+${t} <svg viewBox="0 0 16 16" width="14" fill="#e8a020"><circle cx="8" cy="8" r="7"/></svg></span></div>
      </div>
    `,"victory",()=>this.manager.replace(new H(this.manager,this.audio,this.hero)))}_defeat(){const e=Math.floor((this.hero.gold||0)*.1);this.hero.gold=Math.max(0,(this.hero.gold||0)-e),this._showEndModal("Defeated",`
      <p style="color:#c04030">Your party has fallen. You are returned to Emberglen.</p>
      ${e>0?`<p style="color:#8a7a6a;font-size:0.8rem;margin-top:0.5rem">Gold lost: ${e}</p>`:""}
    `,"defeat",()=>this.manager.replace(new H(this.manager,this.audio,this.hero)))}_showEndModal(e,t,i,a){const s=_("div",`combat-end-modal end-${i}`);s.innerHTML=`
      <div class="cem-box">
        <div class="cem-title">${e}</div>
        <div class="cem-body">${t}</div>
        <button class="cem-btn">Continue</button>
      </div>
    `,s.querySelector(".cem-btn").addEventListener("click",()=>{this.audio.playSfx("click"),a()}),this._el.appendChild(s)}draw(e){const t=this.manager.width,i=this.manager.height,a=this.encounter.background||"#0d1a10";e.fillStyle=a,e.fillRect(0,0,t,i);const s=e.createLinearGradient(0,0,0,i*.6);s.addColorStop(0,"rgba(10,6,8,0.6)"),s.addColorStop(1,"rgba(10,6,8,0)"),e.fillStyle=s,e.fillRect(0,0,t,i*.6);const o=i*.62;e.fillStyle="#0a1408",e.fillRect(0,o,t,i-o),e.fillStyle="rgba(64,168,96,0.15)",e.fillRect(0,o,t,3);const r=t*.2,c=o-10;this._heroes.forEach((d,l)=>{d.x=r+l*60,d.y=c,this._drawCombatant(e,d,!0)});const g=t*.65;this._enemyGroups.forEach((d,l)=>{const m=g+l*90;d.forEach((u,w)=>{u.x=m,u.y=c-w*18,this._drawCombatant(e,u,!1)})}),e.save();for(const d of this._particles)e.globalAlpha=d.life,e.fillStyle=d.color,e.shadowBlur=8,e.shadowColor=d.color,e.beginPath(),e.arc(d.x,d.y,d.size,0,Math.PI*2),e.fill();if(e.shadowBlur=0,e.globalAlpha=1,e.restore(),this._phase==="START"){const d=Math.min(this._t/.5,1);e.save(),e.globalAlpha=d,e.font=`900 ${Math.round(t*.06)}px Cinzel, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=30,e.shadowColor="#c04030",e.fillStyle="#f0e8d8",e.fillText(this.encounter.name,t/2,i*.3),e.restore()}}_drawCombatant(e,t,i){if(!t.alive&&t.stance!=="death")return;const a=t.x+(t.offsetX||0),s=t.y+(t.offsetY||0),o=this._flashTargets.has(t.id);e.save(),e.fillStyle="rgba(0,0,0,0.3)",e.beginPath(),e.ellipse(a,s+2,18,6,0,0,Math.PI*2),e.fill();const r=i?52:40,c=t.alive?1:.4;e.globalAlpha=c,o&&(e.globalAlpha=c,e.shadowBlur=20,e.shadowColor="#ff4040");const g=i?this._heroColor(t.class):"#8B4513",d=i?"#e8a020":"#c0392b";if(e.fillStyle=o?"#ff8060":g,e.beginPath(),e.roundRect(a-r*.3,s-r,r*.6,r*.5,4),e.fill(),e.beginPath(),e.arc(a,s-r*.8,r*.22,0,Math.PI*2),e.fill(),e.fillStyle=o?"#ff6040":d,e.fillRect(a-r*.2,s-r*.5,r*.15,r*.45),e.fillRect(a+r*.05,s-r*.5,r*.15,r*.45),t.stance==="attack"&&i&&(e.fillStyle="#e8a020",e.beginPath(),e.moveTo(a+r*.3,s-r*.7),e.lineTo(a+r*.55,s-r*.45),e.lineTo(a+r*.35,s-r*.3),e.closePath(),e.fill()),t.alive||(e.strokeStyle="#ff4040",e.lineWidth=2,e.beginPath(),e.moveTo(a-5,s-r*.85),e.lineTo(a-2,s-r*.75),e.moveTo(a-2,s-r*.85),e.lineTo(a-5,s-r*.75),e.moveTo(a+2,s-r*.85),e.lineTo(a+5,s-r*.75),e.moveTo(a+5,s-r*.85),e.lineTo(a+2,s-r*.75),e.stroke()),e.shadowBlur=0,e.globalAlpha=1,t.alive){const l=r*1.2,m=4,u=a-l/2,w=s-r-10;e.fillStyle="rgba(0,0,0,0.5)",e.fillRect(u,w,l,m);const b=Math.max(0,t.hp/t.maxHp),f=b>.5?"#40c870":b>.25?"#e8a020":"#c04030";e.fillStyle=f,e.fillRect(u,w,l*b,m),i||(e.font="10px Inter, sans-serif",e.textAlign="center",e.fillStyle="rgba(240,232,216,0.7)",e.fillText(t.name,a,w-3))}e.restore()}_heroColor(e){return{warrior:"#607080",paladin:"#d4af37",ranger:"#4a7a40",rogue:"#3a3050",cleric:"#e0d0a0",bard:"#8060a0",mage:"#4060c0",necromancer:"#503060",warlock:"#802040",demon_hunter:"#c04060",scavenger:"#806040",swashbuckler:"#c08020",dragon_knight:"#806020",pyromancer:"#c04020"}[e]||"#607080"}onExit(){y(this._el),this._el=null}destroy(){y(this._el),this._el=null}}const te=`
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
`,$={[v.COMBAT]:{color:"#c04030",label:"Combat"},[v.DIALOG]:{color:"#4080c0",label:"Encounter"},[v.TOWN]:{color:"#40a860",label:"Town"},[v.TREASURE]:{color:"#e8a020",label:"Treasure"},[v.AMBUSH]:{color:"#8a2020",label:"Ambush"},[v.BOSS]:{color:"#9040c0",label:"Boss"},[v.LORE]:{color:"#6a9040",label:"Discovery"}},ie={name:"Goblin Patrol",enemies:[{id:"goblin_scout",name:"Goblin Scout",count:3,hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:12,xpValue:15,gold:[2,6]},{id:"goblin_warrior",name:"Goblin Warrior",count:2,hp:35,maxHp:35,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12]}]};class N{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._zone=K[0],this._hovered=null,this._t=0}onEnter(){this._build()}_build(){M("map-styles",ae),this._el=_("div","map-screen"),this._el.innerHTML=`
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
        ${Object.entries($).map(([e,t])=>`<div class="legend-item"><div class="legend-dot" style="background:${t.color}"></div><span>${t.label}</span></div>`).join("")}
      </div>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#map-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._setupCanvas()}_setupCanvas(){const e=this._el.querySelector(".map-canvas-wrap"),t=this._el.querySelector("#map-canvas");t.width=e.clientWidth,t.height=e.clientHeight,t.addEventListener("click",i=>this._onClick(i,t)),t.addEventListener("mousemove",i=>this._onHover(i,t)),t.addEventListener("mouseleave",()=>{this._hovered=null,this._hideNodeTooltip()}),this._canvas=t,this._ctx=t.getContext("2d"),this._drawMap()}_nodePos(e,t,i){return{x:e.x*t,y:e.y*i}}_drawMap(){var c,g,d;const e=this._ctx,t=this._canvas.width,i=this._canvas.height,a=h.get(),s=e.createLinearGradient(0,0,t,i);s.addColorStop(0,"#080e08"),s.addColorStop(1,"#0d180e"),e.fillStyle=s,e.fillRect(0,0,t,i),e.strokeStyle="rgba(64,168,96,0.05)",e.lineWidth=1;for(let l=0;l<t;l+=40)e.beginPath(),e.moveTo(l,0),e.lineTo(l,i),e.stroke();for(let l=0;l<i;l+=40)e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke();const o=this._zone;for(const l of o.nodes){const m=this._nodePos(l,t,i);for(const u of l.exits){const w=o.nodes.find(T=>T.id===u);if(!w)continue;const b=this._nodePos(w,t,i),f=((c=a.visitedNodes)==null?void 0:c.has(l.id))&&((g=a.visitedNodes)==null?void 0:g.has(u));e.strokeStyle=f?"rgba(64,168,96,0.5)":"rgba(100,80,60,0.3)",e.lineWidth=f?2:1,e.setLineDash(f?[]:[5,4]),e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(b.x,b.y),e.stroke(),e.setLineDash([])}}for(const l of o.nodes){const m=this._nodePos(l,t,i),u=$[l.type]||{color:"#8a7a6a",label:l.type},w=(d=a.visitedNodes)==null?void 0:d.has(l.id),b=a.nodeId===l.id,f=this._hovered===l.id,T=this._isAccessible(l,o,a);if(b||f){const L=e.createRadialGradient(m.x,m.y,0,m.x,m.y,30);L.addColorStop(0,`${u.color}40`),L.addColorStop(1,"transparent"),e.fillStyle=L,e.beginPath(),e.arc(m.x,m.y,30,0,Math.PI*2),e.fill()}const x=l.type===v.BOSS?18:l.type===v.TOWN?16:13;e.save(),e.globalAlpha=T||w?1:.35,e.fillStyle=w||b?u.color:"rgba(20,15,10,0.9)",e.strokeStyle=u.color,e.lineWidth=b?3:f?2.5:1.5,e.shadowBlur=b?15:f?10:0,e.shadowColor=u.color,e.beginPath(),e.arc(m.x,m.y,x,0,Math.PI*2),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=w?"#0a0608":u.color,e.font=`bold ${x*.85}px Inter, sans-serif`,e.textAlign="center",e.textBaseline="middle";const U=l.type===v.BOSS?"B":l.type===v.TOWN?"T":l.type[0].toUpperCase();e.fillText(U,m.x,m.y),e.fillStyle=T?"#f0e8d8":"#8a7a6a",e.font=`${x<14?"10":"11"}px Inter, sans-serif`,e.fillText(l.name,m.x,m.y+x+13),e.restore()}const r=o.nodes.find(l=>l.id===a.nodeId);if(r){const l=this._nodePos(r,t,i);e.save(),e.fillStyle="#f0e8d8",e.shadowBlur=12,e.shadowColor="#e8a020",e.font="18px sans-serif",e.textAlign="center",e.fillText("★",l.x,l.y-26),e.restore()}}_isAccessible(e,t,i){var a,s;if((a=i.visitedNodes)!=null&&a.has(e.id)||i.nodeId===e.id)return!0;for(const o of t.nodes)if((s=i.visitedNodes)!=null&&s.has(o.id)&&o.exits.includes(e.id)||i.nodeId===o.id&&o.exits.includes(e.id))return!0;return!1}_onClick(e,t){const i=t.getBoundingClientRect(),a=(e.clientX-i.left)*(t.width/i.width),s=(e.clientY-i.top)*(t.height/i.height),o=h.get();for(const r of this._zone.nodes){const c=this._nodePos(r,t.width,t.height),g=Math.hypot(a-c.x,s-c.y),d=r.type===v.BOSS?18:14;if(g<=d+8){if(!this._isAccessible(r,this._zone,o))return;this.audio.playSfx("click"),this._navigateToNode(r);return}}}_onHover(e,t){const i=t.getBoundingClientRect(),a=(e.clientX-i.left)*(t.width/i.width),s=(e.clientY-i.top)*(t.height/i.height);let o=null;for(const r of this._zone.nodes){const c=this._nodePos(r,t.width,t.height);if(Math.hypot(a-c.x,s-c.y)<=20){o=r.id;break}}if(o!==this._hovered)if(this._hovered=o,this._drawMap(),o){const r=this._zone.nodes.find(g=>g.id===o),c=$[r.type]||{};this._showNodeTooltip(e,r,c)}else this._hideNodeTooltip()}_showNodeTooltip(e,t,i){const a=this._el.querySelector("#map-node-tooltip");a&&(a.innerHTML=`<div class="mntt-name">${t.name}</div><div class="mntt-type" style="color:${i.color}">${i.label}</div>`,a.style.display="block",a.style.left=`${e.clientX-this._el.getBoundingClientRect().left+12}px`,a.style.top=`${e.clientY-this._el.getBoundingClientRect().top-40}px`)}_hideNodeTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#map-node-tooltip");e&&(e.style.display="none")}_navigateToNode(e){switch(h.visitNode(e.id),h.get().nodeId=e.id,e.type){case v.TOWN:this.manager.pop();break;case v.COMBAT:case v.AMBUSH:{const t={...ie,name:e.name},a=h.get().party[0];this.manager.push(new R(this.manager,this.audio,a,t));break}case v.LORE:case v.DIALOG:this._showLoreModal(e);break;case v.TREASURE:this._showTreasureModal(e);break;case v.BOSS:{const t={name:e.name,enemies:[{id:"boss_goblin",name:"Grax the Veil-Touched",count:1,hp:180,maxHp:180,dmg:[12,22],armor:8,hit:80,dodge:10,xpValue:200,gold:[40,80]},{id:"goblin_warrior",name:"Goblin Warrior",count:3,hp:35,maxHp:35,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12]}]},i=h.get().party[0];this.manager.push(new R(this.manager,this.audio,i,t));break}}this._drawMap()}_showLoreModal(e){const t=_("div","map-modal");t.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title">${e.name}</div>
        <div class="mm-body" style="color:#c0b090;font-size:0.88rem;line-height:1.6">
          ${this._getLoreText(e.id)}
        </div>
        <button class="mm-btn">Continue</button>
      </div>
    `,t.querySelector(".mm-overlay").addEventListener("click",()=>y(t)),t.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("click"),y(t)}),this._el.appendChild(t)}_showTreasureModal(e){const t=_("div","map-modal");t.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title" style="color:#e8a020">Treasure Found!</div>
        <div class="mm-body">You discover a hidden cache among the roots of an ancient oak. Inside: <strong style="color:#e8a020">85 gold</strong> and a weathered map fragment.</div>
        <button class="mm-btn">Claim Reward</button>
      </div>
    `,t.querySelector(".mm-overlay").addEventListener("click",()=>y(t)),t.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("victory"),h.addGold(85),y(t)}),this._el.appendChild(t)}_getLoreText(e){return{crossroads_b:"The village is quiet. Too quiet. Scorched thatch still smolders on the rooftops, but the fires are old — three days at least. Whoever — whatever — drove these people out left no bodies. Only silence, and the faint smell of something wrong in the air. Like copper and rot.",hidden_path:'Half-buried in moss, the runestone pulses with a faint, sickly light. The runes are old — older than the kingdom itself. One phrase repeats, carved over and over in increasingly desperate strokes: "The veil does not hold." Mira the Seer would want to know about this.'}[e]||"There is nothing more to see here. The road calls you forward."}update(e){this._t+=e}draw(){}onExit(){y(this._el),this._el=null}destroy(){y(this._el),this._el=null}}const ae=`
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
`,se={low:.7,medium:1,high:1.2,elite:1.4,exotic:1.6},oe={normal:0,magic:[1,2],rare:[3,4],legendary:[4,6]},B={normal:"#c8c8c8",magic:"#6080ff",rare:"#e8d020",legendary:"#ff8020"},re={dagger:{name:"Dagger",type:"weapon",subtype:"dagger",dmg:[3,7],speed:1.2,twoHanded:!1,statScaling:"dex",armorPen:.1},sword:{name:"Sword",type:"weapon",subtype:"sword",dmg:[6,14],speed:1,twoHanded:!1,statScaling:"str_dex"},wand:{name:"Wand",type:"weapon",subtype:"wand",dmg:[4,10],speed:1.1,twoHanded:!1,statScaling:"int",offHandOk:!0},scepter:{name:"Scepter",type:"weapon",subtype:"scepter",dmg:[5,12],speed:1,twoHanded:!1,statScaling:"int",offHandOk:!0},staff:{name:"Staff",type:"weapon",subtype:"staff",dmg:[8,20],speed:.9,twoHanded:!0,statScaling:"int",intMult:1.5},hammer:{name:"Hammer",type:"weapon",subtype:"hammer",dmg:[8,16],speed:.8,twoHanded:!1,statScaling:"str",stunChance:.1},sword2h:{name:"Greatsword",type:"weapon",subtype:"sword2h",dmg:[14,28],speed:.7,twoHanded:!0,statScaling:"str",strMult:1.5},axe2h:{name:"Greataxe",type:"weapon",subtype:"axe2h",dmg:[16,30],speed:.65,twoHanded:!0,statScaling:"str",bleedChance:.15},bow:{name:"Bow",type:"weapon",subtype:"bow",dmg:[8,16],speed:1,twoHanded:!0,statScaling:"dex",dexMult:1.3,ranged:!0},crossbow:{name:"Crossbow",type:"weapon",subtype:"crossbow",dmg:[12,22],speed:.7,twoHanded:!0,statScaling:"dex_str",ranged:!0},javelin:{name:"Javelin",type:"weapon",subtype:"javelin",dmg:[9,18],speed:.9,twoHanded:!1,statScaling:"str_dex",ranged:!0,throwable:!0}},ne={cloth_helm:{name:"Hood",type:"armor",slot:"head",tier:"cloth",armor:1,dodgeBonus:0},light_helm:{name:"Leather Cap",type:"armor",slot:"head",tier:"light",armor:3,dodgeBonus:0},medium_helm:{name:"Chain Coif",type:"armor",slot:"head",tier:"medium",armor:5,dodgeBonus:-1},heavy_helm:{name:"War Helm",type:"armor",slot:"head",tier:"heavy",armor:8,dodgeBonus:-2},cloth_chest:{name:"Robes",type:"armor",slot:"chest",tier:"cloth",armor:2,dodgeBonus:0},light_chest:{name:"Leather Armor",type:"armor",slot:"chest",tier:"light",armor:6,dodgeBonus:0},medium_chest:{name:"Chain Shirt",type:"armor",slot:"chest",tier:"medium",armor:10,dodgeBonus:-2},heavy_chest:{name:"Plate Armor",type:"armor",slot:"chest",tier:"heavy",armor:16,dodgeBonus:-4},cloth_legs:{name:"Linen Leggings",type:"armor",slot:"legs",tier:"cloth",armor:1,dodgeBonus:0},light_legs:{name:"Leather Legs",type:"armor",slot:"legs",tier:"light",armor:4,dodgeBonus:0},medium_legs:{name:"Chain Legs",type:"armor",slot:"legs",tier:"medium",armor:7,dodgeBonus:-1},heavy_legs:{name:"Plate Legs",type:"armor",slot:"legs",tier:"heavy",armor:11,dodgeBonus:-3},shield:{name:"Shield",type:"armor",slot:"offhand",tier:"heavy",armor:5,dodgeBonus:5,blockChance:.2},ring:{name:"Ring",type:"accessory",slot:"ring",tier:"any",armor:0},necklace:{name:"Necklace",type:"accessory",slot:"necklace",tier:"any",armor:0}},le={prefixes:[{id:"of_str",name:"Sturdy",stat:"str",min:1,max:4},{id:"of_dex",name:"Swift",stat:"dex",min:1,max:4},{id:"of_int",name:"Wise",stat:"int",min:1,max:4},{id:"of_con",name:"Hardy",stat:"con",min:1,max:4},{id:"sharp",name:"Sharp",stat:"dmg",min:1,max:3},{id:"sturdy",name:"Reinforced",stat:"armor",min:1,max:3},{id:"burning",name:"Burning",stat:"burnChance",min:.05,max:.15},{id:"bleeding",name:"Serrated",stat:"bleedChance",min:.05,max:.15}],suffixes:[{id:"of_hp",name:"of Vitality",stat:"hp",min:5,max:20},{id:"of_mp",name:"of Focus",stat:"mp",min:5,max:15},{id:"of_hit",name:"of Accuracy",stat:"hit",min:2,max:8},{id:"of_dodge",name:"of Evasion",stat:"dodge",min:2,max:6},{id:"of_speed",name:"of Haste",stat:"initiative",min:1,max:3},{id:"of_gold",name:"of Fortune",stat:"goldFind",min:.05,max:.2}]};function k(n,e="normal",t="medium",i=le){const a=re[n]||ne[n];if(!a)return null;const s=se[t],o={id:crypto.randomUUID(),baseKey:n,name:a.name,type:a.type,subtype:a.subtype||a.slot,slot:a.slot||(a.twoHanded,"weapon"),rarity:e,quality:t,affixes:[]};a.dmg&&(o.dmg=[Math.round(a.dmg[0]*s),Math.round(a.dmg[1]*s)]),a.armor!==void 0&&(o.armor=Math.round(a.armor*s));const r=oe[e];if(r){const[c,g]=Array.isArray(r)?r:[r,r],d=c+Math.floor(Math.random()*(g-c+1)),l=[...i.prefixes,...i.suffixes],m=[];for(let b=0;b<d&&l.length>m.length;b++){let f,T=0;do f=l[Math.floor(Math.random()*l.length)],T++;while(m.find(x=>x.id===f.id)&&T<20);if(!m.find(x=>x.id===f.id)){const x=+(f.min+Math.random()*(f.max-f.min)).toFixed(2);m.push({...f,value:x})}}o.affixes=m;const u=m.find(b=>i.prefixes.find(f=>f.id===b.id)),w=m.find(b=>i.suffixes.find(f=>f.id===b.id));u&&(o.name=`${u.name} ${o.name}`),w&&(o.name=`${o.name} ${w.name}`)}return o}function de(n){if(!n)return"";const e=a=>a.charAt(0).toUpperCase()+a.slice(1),t=a=>a.charAt(0).toUpperCase()+a.slice(1);let i=[`<strong>${n.name}</strong>`,`<span class="tt-rarity" style="color:${B[n.rarity]}">${t(n.rarity)} · ${e(n.quality)}</span>`];n.dmg&&i.push(`Damage: ${n.dmg[0]}–${n.dmg[1]}`),n.armor&&i.push(`Armor: +${n.armor}`);for(const a of n.affixes||[]){const s=typeof a.value=="number"&&a.value<1?`${Math.round(a.value*100)}%`:`+${a.value}`;i.push(`<span style="color:#90d8a8">${a.name}: ${s} ${a.stat.toUpperCase()}</span>`)}return i.join("<br>")}const G=[{id:"aela",name:"Aela",className:"Ranger",class:"ranger",level:1,cost:80,attrs:{STR:8,DEX:14,INT:8,CON:10},description:"A quiet ranger from the eastern border. She's lost family to the raids."},{id:"borin",name:"Borin",className:"Warrior",class:"warrior",level:1,cost:90,attrs:{STR:14,DEX:8,INT:6,CON:12},description:"Retired soldier. Bored. Wants one last fight."},{id:"lysa",name:"Lysa",className:"Cleric",class:"cleric",level:2,cost:120,attrs:{STR:8,DEX:8,INT:14,CON:10},description:"Young cleric of the Light. Eager to prove herself outside the temple."},{id:"rekk",name:"Rekk",className:"Rogue",class:"rogue",level:1,cost:70,attrs:{STR:8,DEX:14,INT:9,CON:9},description:"Says he's not a thief. Has three knives."}],O=[{id:"war_dog",name:"War Dog",className:"Companion",class:"companion",level:1,cost:50,isCompanion:!0,attrs:{STR:10,DEX:12,INT:2,CON:10},description:"Loyal, fierce, and surprisingly effective against goblins. Bites hard."}];function ce(){return[k("sword","normal","medium"),k("dagger","normal","medium"),k("staff","magic","medium"),k("bow","normal","medium"),k("light_chest","normal","medium"),k("cloth_chest","magic","medium"),k("heavy_helm","normal","low"),k("light_legs","normal","medium"),k("ring","magic","medium"),k("necklace","magic","medium")]}class H{constructor(e,t,i,a=!1){this.manager=e,this.audio=t,this.isNewGame=a,this._el=null,this._activeService=null,this._merchantStock=ce(),this._tooltip=null,i!=null&&i.party||i&&h.init(i)}onEnter(){this.audio.playTownMusic(),this._build()}_build(){M("town-styles",he),this._el=_("div","town-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){h.get().party[0];const t=h.getGold();this._el.innerHTML=`
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
          <button class="action-btn" id="btn-journal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
            Journal
          </button>
          <div class="action-separator"></div>
          <button class="action-btn action-leave" id="btn-leave">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Set Out
          </button>
        </aside>
      </div>
      <div id="tt-el" class="item-tooltip" style="display:none"></div>
    `,this._renderPartyPanel(),this._wireEvents()}_renderPartyPanel(){const e=h.get(),t=this._el.querySelector("#party-slots"),i=this._el.querySelector("#companion-slots");for(let a=0;a<4;a++){const s=e.party[a],o=_("div",`party-slot${s?"":" empty"}`);s?(50+s.attrs.CON*10,o.innerHTML=`
          <div class="ps-icon">${this._getClassSvg(s.class)}</div>
          <div class="ps-info">
            <div class="ps-name">${s.name}</div>
            <div class="ps-class">${s.className||s.class} Lv${s.level}</div>
            <div class="ps-hp-bar"><div class="ps-hp-fill" style="width:100%"></div></div>
          </div>
        `):o.innerHTML='<div class="ps-empty">Empty</div>',t.appendChild(o)}for(let a=0;a<4;a++){const s=e.companions[a],o=_("div",`party-slot${s?"":" empty"}`);s?o.innerHTML=`<div class="ps-icon">🐾</div><div class="ps-info"><div class="ps-name">${s.name}</div><div class="ps-class">${s.className}</div></div>`:o.innerHTML='<div class="ps-empty">Empty</div>',i.appendChild(o)}}_renderServiceContent(){switch(this._activeService){case"merchant":return this._merchantHTML();case"tavern":return this._tavernHTML();case"cleric":return this._clericHTML();case"blacksmith":return this._blacksmithHTML();case"enchanter":return this._enchanterHTML();default:return this._townOverviewHTML()}}_townOverviewHTML(){return`
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
    `}_merchantHTML(){const e=h.get();return`
      <div class="merchant-layout">
        <div class="merchant-stock">
          <div class="svc-section-title">For Sale</div>
          <div class="item-grid" id="merchant-items">
            ${this._merchantStock.map(t=>`
              <div class="item-card" data-id="${t.id}" data-section="buy">
                <div class="ic-name" style="color:${B[t.rarity]}">${t.name}</div>
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
                  <div class="ic-name" style="color:${B[t.rarity]}">${t.name}</div>
                  <div class="ic-type">${t.subtype||t.type}</div>
                  <div class="ic-price">Sell: ${Math.floor(this._itemPrice(t)*.4)} G</div>
                </div>
              `).join("")}
          </div>
        </div>
      </div>
    `}_itemPrice(e){const t={low:.5,medium:1,high:1.5,elite:2.5,exotic:4},i={normal:1,magic:2,rare:4,legendary:10};return Math.round(15*(t[e.quality]||1)*(i[e.rarity]||1))}_tavernHTML(){const e=h.get(),t=h.getGold();return`
      <div class="tavern-layout">
        <div class="svc-section-title">Heroes for Hire</div>
        <div class="hireable-list">
          ${G.map(i=>{const a=e.party.find(c=>c.id===i.id),s=e.bench.find(c=>c.id===i.id),o=t>=i.cost,r=e.party.length>=4;return`
              <div class="hireable-card${a||s?" hired":""}">
                <div class="hc-portrait">${this._getClassSvg(i.class)}</div>
                <div class="hc-info">
                  <div class="hc-name">${i.name} <span class="hc-class">${i.className} Lv${i.level}</span></div>
                  <div class="hc-desc">${i.description}</div>
                  <div class="hc-attrs">STR ${i.attrs.STR} · DEX ${i.attrs.DEX} · INT ${i.attrs.INT} · CON ${i.attrs.CON}</div>
                </div>
                <div class="hc-action">
                  ${a?'<span class="hired-badge">In Party</span>':s?'<span class="hired-badge">At Bench</span>':`<button class="hire-btn${o&&!r?"":" disabled"}" data-hire="${i.id}" data-cost="${i.cost}" ${o&&!r?"":"disabled"}>
                      Hire <br><small>${i.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
        <div class="svc-section-title" style="margin-top:1.5rem">Companions for Purchase</div>
        <div class="hireable-list">
          ${O.map(i=>{const a=e.companions.find(r=>r.id===i.id),s=t>=i.cost,o=e.companions.length>=4;return`
              <div class="hireable-card${a?" hired":""}">
                <div class="hc-portrait"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="6"/><path d="M8 32c0-6 4-10 10-10s10 4 10 10"/></svg></div>
                <div class="hc-info">
                  <div class="hc-name">${i.name} <span class="hc-class">${i.className}</span></div>
                  <div class="hc-desc">${i.description}</div>
                </div>
                <div class="hc-action">
                  ${a?'<span class="hired-badge">Purchased</span>':`<button class="hire-btn${s&&!o?"":" disabled"}" data-hire="${i.id}" data-cost="${i.cost}" data-companion="true" ${s&&!o?"":"disabled"}>
                      Buy <br><small>${i.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}_clericHTML(){const e=h.get(),t=[...e.party,...e.companions].filter(s=>s.hp<=0||s.dead),i=h.getGold(),a=50;return`
      <div class="cleric-layout">
        <div class="svc-section-title">Revive Services — ${a} Gold per member</div>
        ${t.length===0?'<div class="empty-state" style="padding:2rem;text-align:center;color:#8a7a6a">All party members are alive. May the Light protect you on your journey.</div>':t.map(s=>`
            <div class="hireable-card">
              <div class="hc-portrait">${this._getClassSvg(s.class)}</div>
              <div class="hc-info">
                <div class="hc-name">${s.name}</div>
                <div class="hc-desc" style="color:#c04030">Has fallen in battle.</div>
              </div>
              <div class="hc-action">
                <button class="hire-btn${i>=a?"":" disabled"}" data-revive="${s.id}" ${i>=a?"":"disabled"}>
                  Revive<br><small>${a} G</small>
                </button>
              </div>
            </div>
          `).join("")}
        <div class="cleric-note">Reviving a fallen hero costs ${a} gold. If you cannot afford the service, the Cleric will revive one hero for free — but you leave with nothing.</div>
      </div>
    `}_blacksmithHTML(){return`<div class="coming-soon"><div class="cs-title">Blacksmith</div><div class="cs-text">The blacksmith's forge burns hot. Upgrade services available in the next milestone.</div></div>`}_enchanterHTML(){return'<div class="coming-soon"><div class="cs-title">Enchanter</div><div class="cs-text">The enchanter is preparing their reagents. Enchanting services available in the next milestone.</div></div>'}_getClassSvg(e){const t=D.find(i=>i.id===e);return(t==null?void 0:t.svgIcon)||'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="18" r="12"/></svg>'}_wireEvents(){var e,t,i,a;this._el.querySelectorAll(".svc-tab").forEach(s=>{s.addEventListener("click",()=>{this.audio.playSfx("click");const o=s.dataset.svc;this._activeService=this._activeService===o?null:o,this._refreshServicePanel()})}),this._el.querySelectorAll(".overview-card").forEach(s=>{s.addEventListener("click",()=>{this.audio.playSfx("click"),this._activeService=s.dataset.svc,this._refreshServicePanel()})}),(e=this._el.querySelector("#btn-map"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new N(this.manager,this.audio))}),(t=this._el.querySelector("#btn-leave"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new N(this.manager,this.audio))}),(i=this._el.querySelector("#btn-inventory"))==null||i.addEventListener("click",()=>{this.audio.playSfx("click"),this._activeService="merchant",this._refreshServicePanel()}),(a=this._el.querySelector("#btn-journal"))==null||a.addEventListener("click",()=>{this.audio.playSfx("click")}),this._wireServiceEvents()}_wireServiceEvents(){this._el.querySelectorAll('[data-section="buy"]').forEach(e=>{e.addEventListener("click",()=>{const t=this._merchantStock.find(a=>a.id===e.dataset.id);if(!t)return;const i=this._itemPrice(t);h.getGold()<i||(h.addGold(-i),h.addToInventory(t),this._merchantStock=this._merchantStock.filter(a=>a.id!==t.id),this.audio.playSfx("click"),this._refreshAll())}),e.addEventListener("mouseenter",t=>this._showTooltip(t,e.dataset.id,"stock")),e.addEventListener("mouseleave",()=>this._hideTooltip())}),this._el.querySelectorAll('[data-section="sell"]').forEach(e=>{e.addEventListener("click",()=>{const i=h.get().inventory.find(a=>a.id===e.dataset.id);i&&(h.addGold(Math.floor(this._itemPrice(i)*.4)),h.removeFromInventory(i.id),this.audio.playSfx("click"),this._refreshAll())})}),this._el.querySelectorAll("[data-hire]").forEach(e=>{e.addEventListener("click",()=>{if(e.disabled)return;const t=e.dataset.hire,i=parseInt(e.dataset.cost),a=e.dataset.companion==="true";this.audio.playSfx("click");const s=a?O.find(r=>r.id===t):G.find(r=>r.id===t);if(!s||h.getGold()<i)return;h.addGold(-i);const o={...s,hp:50+s.attrs.CON*10,maxHp:50+s.attrs.CON*10,xp:0,equipment:{},skills:[]};a?h.addToCompanions(o)||h.addToBench(o):h.addToParty(o)||h.addToBench(o),this._refreshAll()})}),this._el.querySelectorAll("[data-revive]").forEach(e=>{e.addEventListener("click",()=>{if(e.disabled)return;const t=e.dataset.revive,i=h.get(),a=[...i.party,...i.companions].find(s=>s.id===t);a&&(h.addGold(-50),a.hp=Math.floor((50+a.attrs.CON*10)*.5),a.dead=!1,this.audio.playSfx("click"),this._refreshAll())})})}_showTooltip(e,t,i){const a=i==="stock"?this._merchantStock.find(o=>o.id===t):h.get().inventory.find(o=>o.id===t);if(!a)return;const s=this._el.querySelector("#tt-el");s&&(s.innerHTML=de(a),s.style.display="block",s.style.left=`${Math.min(e.clientX+12,window.innerWidth-220)}px`,s.style.top=`${Math.max(8,e.clientY-60)}px`)}_hideTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#tt-el");e&&(e.style.display="none")}_refreshServicePanel(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#service-panel");e&&(this._el.querySelectorAll(".svc-tab").forEach(i=>{i.classList.toggle("active",i.dataset.svc===this._activeService)}),e.innerHTML=this._renderServiceContent(),this._wireServiceEvents())}_refreshAll(){var a,s,o;const e=(a=this._el)==null?void 0:a.querySelector("#gold-amount");e&&(e.textContent=h.getGold().toLocaleString()),this._refreshServicePanel();const t=(s=this._el)==null?void 0:s.querySelector("#party-slots"),i=(o=this._el)==null?void 0:o.querySelector("#companion-slots");t&&(t.innerHTML=""),i&&(i.innerHTML=""),this._renderPartyPanel()}update(){}draw(){}onExit(){y(this._el),this._el=null}destroy(){y(this._el),this._el=null}}const he=`
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
`,P=1,z=n=>`emberveil_save_${n}`,I={getSlot(n){try{const e=localStorage.getItem(z(n));return e?JSON.parse(e):null}catch{return null}},saveSlot(n,e){const t={version:P,timestamp:new Date().toLocaleDateString(),...e};localStorage.setItem(z(n),JSON.stringify(t))},deleteSlot(n){localStorage.removeItem(z(n))},loadSlot(n){const e=this.getSlot(n);return e||null},migrate(n){return n.version===P,n}},me=["STR","DEX","INT","CON"],pe=10,C=8;class ge{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._name="Hero",this._class=null,this._attrs={STR:C,DEX:C,INT:C,CON:C},this._pointsSpent=0,this._step="class",this._saveSlot=0}get _pointsLeft(){return pe-this._pointsSpent}onEnter(){this._build()}_build(){M("cb-styles",fe),this._el=_("div","cb-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML="",this._step==="class"?this._renderClassStep():this._renderStatsStep()}_renderClassStep(){var i;const e=this._el;e.innerHTML=`
      <div class="cb-header">
        <div class="cb-title">Create Your Hero</div>
        <div class="cb-subtitle">Choose your class</div>
      </div>
      <div class="cb-class-grid" id="class-grid"></div>
      <div class="cb-footer">
        <button class="cb-btn cb-btn-ghost" id="cb-back">← Back</button>
        <button class="cb-btn cb-btn-primary" id="cb-next" disabled>Next →</button>
      </div>
    `;const t=e.querySelector("#class-grid");for(const a of D){const s=_("div",`cb-class-card${((i=this._class)==null?void 0:i.id)===a.id?" selected":""}`);s.dataset.id=a.id,s.innerHTML=`
        <div class="cb-class-icon">${a.svgIcon}</div>
        <div class="cb-class-name">${a.name}</div>
        <div class="cb-class-role">${a.role}</div>
        <div class="cb-class-hook">${a.hook}</div>
        <div class="cb-class-armor">${a.armorType}</div>
      `,s.addEventListener("click",()=>{this.audio.playSfx("click"),this._class=a,e.querySelectorAll(".cb-class-card").forEach(o=>o.classList.remove("selected")),s.classList.add("selected"),e.querySelector("#cb-next").disabled=!1}),t.appendChild(s)}e.querySelector("#cb-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),e.querySelector("#cb-next").addEventListener("click",()=>{this._class&&(this.audio.playSfx("click"),this._step="stats",this._render())})}_renderStatsStep(){const e=this._el;e.innerHTML=`
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
    `,this._renderAttrs(),this._updatePreview(),e.querySelector("#hero-name").addEventListener("input",t=>{this._name=t.target.value||"Hero"}),e.querySelector("#cb-prev").addEventListener("click",()=>{this.audio.playSfx("click"),this._step="class",this._render()}),e.querySelector("#cb-confirm").addEventListener("click",()=>{this.audio.playSfx("victory"),this._confirm()})}_renderAttrs(){const e=this._el.querySelector("#attr-panel");if(e){e.innerHTML="";for(const t of me){const i=_("div","cb-attr-row"),a=ue[t];i.innerHTML=`
        <div class="cb-attr-info">
          <div class="cb-attr-name">${t}</div>
          <div class="cb-attr-desc">${a}</div>
        </div>
        <div class="cb-attr-controls">
          <button class="cb-attr-btn" data-attr="${t}" data-dir="-1">−</button>
          <span class="cb-attr-val" id="val-${t}">${this._attrs[t]}</span>
          <button class="cb-attr-btn" data-attr="${t}" data-dir="1">+</button>
        </div>
      `,e.appendChild(i)}e.querySelectorAll(".cb-attr-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.attr,a=parseInt(t.dataset.dir);this._adjustAttr(i,a)})})}}_adjustAttr(e,t){if(t>0&&this._pointsLeft<=0||t<0&&this._attrs[e]<=C)return;this._attrs[e]+=t,this._pointsSpent-=t*-1,this._pointsSpent+=t;const i=this._el.querySelector(`#val-${e}`);i&&(i.textContent=this._attrs[e]);const a=this._el.querySelector("#pts-left");a&&(a.textContent=this._pointsLeft),this._updatePreview(),this.audio.playSfx("click")}_updatePreview(){var g;const e=(g=this._el)==null?void 0:g.querySelector("#preview-grid");if(!e)return;const t=this._attrs,i=50+t.CON*10,a=30+t.INT*8,s=Math.round(70+t.DEX*1.2),o=Math.round(5+t.DEX*.8),r=Math.round(t.STR*1.5),c=Math.round(1+t.INT*.08,2);e.innerHTML=`
      <div class="preview-stat"><span class="ps-label">HP</span><span class="ps-val">${i}</span></div>
      <div class="preview-stat"><span class="ps-label">Mana</span><span class="ps-val">${a}</span></div>
      <div class="preview-stat"><span class="ps-label">Hit</span><span class="ps-val">${s}%</span></div>
      <div class="preview-stat"><span class="ps-label">Dodge</span><span class="ps-val">${o}%</span></div>
      <div class="preview-stat"><span class="ps-label">Melee</span><span class="ps-val">+${r}</span></div>
      <div class="preview-stat"><span class="ps-label">Spell</span><span class="ps-val">×${c.toFixed(2)}</span></div>
    `}_confirm(){const e={id:crypto.randomUUID(),name:this._name||"Hero",class:this._class.id,className:this._class.name,level:1,xp:0,attrs:{...this._attrs},skills:[this._class.skills[0]],equipment:{},gold:150};I.saveSlot(0,{heroName:e.name,class:e.className,act:1,level:1,hero:e}),this.manager.replace(new H(this.manager,this.audio,e,!0))}onExit(){y(this._el),this._el=null}destroy(){y(this._el),this._el=null}update(){}draw(){}}const ue={STR:"Melee damage · Physical armor · Carry weight",DEX:"Hit chance · Dodge · Ranged damage · Initiative",INT:"Spell power · Mana pool · Magic resistance",CON:"Max HP · Resist status effects · Endurance"},fe=`
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
`;class ve{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){M("load-screen-styles",`
      .load-screen {
        position: absolute; inset: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        background: rgba(5,2,8,0.92);
        padding: 2rem;
      }
      .load-title {
        font-family: 'Cinzel', Georgia, serif;
        font-size: 1.4rem; font-weight: 700;
        color: #e8a020; letter-spacing: 0.1em;
        margin-bottom: 2rem;
      }
      .save-slots { display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 360px; }
      .save-slot {
        padding: 1.2rem 1.5rem;
        background: rgba(26,18,24,0.9);
        border: 1px solid rgba(232,160,32,0.2);
        border-radius: 8px; cursor: pointer;
        transition: border-color 0.2s, background 0.2s;
        min-height: 72px;
      }
      .save-slot:hover { border-color: rgba(232,160,32,0.6); background: rgba(36,26,32,0.9); }
      .save-slot.empty { opacity: 0.4; cursor: default; }
      .save-slot.empty:hover { border-color: rgba(232,160,32,0.2); background: rgba(26,18,24,0.9); }
      .slot-name { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700; color: #f0e8d8; }
      .slot-meta { font-size: 0.75rem; color: #8a7a6a; margin-top: 0.3rem; }
      .load-back {
        margin-top: 2rem; background: none; border: none; color: #8a7a6a;
        font-size: 0.85rem; cursor: pointer; letter-spacing: 0.05em;
        text-decoration: underline;
      }
      .load-back:hover { color: #f0e8d8; }
    `),this._el=_("div","load-screen"),this._el.innerHTML=`<div class="load-title">Load Game</div><div class="save-slots" id="slot-list"></div>
      <button class="load-back" id="load-back">← Back</button>`,this.manager.uiOverlay.appendChild(this._el);const e=this._el.querySelector("#slot-list");for(let t=0;t<3;t++){const i=I.getSlot(t),a=_("div",`save-slot${i?"":" empty"}`);i?(a.innerHTML=`<div class="slot-name">${i.heroName} · ${i.class}</div>
          <div class="slot-meta">Act ${i.act} · Level ${i.level} · ${i.timestamp}</div>`,a.addEventListener("click",()=>{this.audio.playSfx("click"),I.loadSlot(t),this.manager.pop()})):a.innerHTML=`<div class="slot-name">Empty Slot ${t+1}</div>`,e.appendChild(a)}this._el.querySelector("#load-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onExit(){y(this._el),this._el=null}destroy(){y(this._el),this._el=null}update(){}draw(){}}class be{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){M("settings-styles",`
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
    `),this._el=_("div","settings-screen"),this._el.innerHTML=`
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
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#master-vol").addEventListener("input",i=>this.audio.setMasterVolume(+i.target.value)),this._el.querySelector("#music-vol").addEventListener("input",i=>this.audio.setMusicVolume(+i.target.value)),this._el.querySelector("#sfx-vol").addEventListener("input",i=>this.audio.setSfxVolume(+i.target.value));const e=this._el.querySelector("#reduce-motion-toggle");e.addEventListener("click",()=>{const i=e.classList.toggle("on");localStorage.setItem("reduceMotion",i?"1":"0")});const t=this._el.querySelector("#auto-advance-toggle");t.addEventListener("click",()=>{const i=t.classList.toggle("on");localStorage.setItem("autoAdvance",i?"1":"0")}),this._el.querySelector("#settings-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onExit(){y(this._el),this._el=null}destroy(){y(this._el),this._el=null}update(){}draw(){}}const S={CLOUDS:0,LOGO_DROP:1,MENU:2};class ye{constructor(e,t){this.manager=e,this.audio=t,this.phase=S.CLOUDS,this.t=0,this._el=null,this._particles=[],this._clouds=this._makeClouds(),this._logoY=-200,this._logoAlpha=0,this._menuAlpha=0,this._menuVisible=!1}_makeClouds(){const e=[];for(let t=0;t<12;t++)e.push({x:Math.random()*2e3-200,y:Math.random()*400+50,w:Math.random()*300+150,h:Math.random()*80+40,speed:Math.random()*.3+.1,alpha:Math.random()*.4+.3});return e}_makeParticles(e,t){const i=[];for(let a=0;a<60;a++)i.push({x:Math.random()*e,y:Math.random()*t,vx:(Math.random()-.5)*.4,vy:-(Math.random()*.6+.1),size:Math.random()*2+.5,alpha:Math.random(),life:Math.random(),maxLife:Math.random()*.5+.3,color:["#e8a020","#c04030","#f0c060","#ff6040"][Math.floor(Math.random()*4)]});return i}onEnter(){this.audio.playTitleMusic(),this._buildMenu()}_buildMenu(){const e=this.manager.uiOverlay;this._el=_("div","title-menu"),this._el.innerHTML=`
      <div class="title-menu-inner" id="tm-inner">
        <div class="tm-subtitle">A High Fantasy Adventure</div>
        <nav class="tm-nav">
          <button class="tm-btn" id="btn-new-game">New Game</button>
          <button class="tm-btn" id="btn-load-game">Load Game</button>
          <button class="tm-btn tm-btn-secondary" id="btn-settings">Settings</button>
        </nav>
        <div class="tm-footer">Emberveil · 2026</div>
      </div>
    `,this._el.style.opacity="0",this._el.style.pointerEvents="none",e.appendChild(this._el),this._el.querySelector("#btn-new-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ge(this.manager,this.audio))}),this._el.querySelector("#btn-load-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ve(this.manager,this.audio))}),this._el.querySelector("#btn-settings").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new be(this.manager,this.audio))}),this._injectStyles()}_injectStyles(){if(document.getElementById("title-screen-styles"))return;const e=document.createElement("style");e.id="title-screen-styles",e.textContent=`
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
    `,document.head.appendChild(e)}update(e){this.t+=e;const t=this.manager.width,i=this.manager.height;for(const a of this._clouds)a.x+=a.speed,a.x>t+200&&(a.x=-300);this._particles.length||(this._particles=this._makeParticles(t,i));for(const a of this._particles)a.life-=e*.5,a.life<=0&&(a.x=Math.random()*t,a.y=i+10,a.life=a.maxLife),a.x+=a.vx,a.y+=a.vy;if(this.phase===S.CLOUDS)this.t>2.5&&(this.phase=S.LOGO_DROP,this.t=0);else if(this.phase===S.LOGO_DROP){const a=Math.min(this.t/1.5,1),s=1-Math.pow(1-a,3);this._logoY=(1-s)*(-i*.3)+s*(i*.35),this._logoAlpha=Math.min(this.t/.8,1),this.t>1.8&&(this.phase=S.MENU,this.t=0)}else this.phase===S.MENU&&(this._menuAlpha=Math.min(this.t/1.5,1),this._el&&(this._el.style.opacity=this._menuAlpha,this._el.style.pointerEvents=this._menuAlpha>.5?"auto":"none"))}draw(e){const t=this.manager.width,i=this.manager.height,a=e.createLinearGradient(0,0,0,i);a.addColorStop(0,"#050208"),a.addColorStop(.4,"#0d0810"),a.addColorStop(.7,"#1a1025"),a.addColorStop(1,"#2a1830"),e.fillStyle=a,e.fillRect(0,0,t,i),e.save();const s=this.phase===S.CLOUDS?Math.max(0,1-this.t/1.5):this.phase===S.LOGO_DROP?Math.max(0,1-this.t):.3;for(let d=0;d<80;d++){const l=d*137.5%1*t,m=d*97.3%1*i*.6,u=d*61.7%1*.8+.2;e.globalAlpha=u*s,e.fillStyle="#ffffff",e.beginPath(),e.arc(l,m,.8,0,Math.PI*2),e.fill()}e.restore();const o=i*.68,r=e.createLinearGradient(0,o,0,i);r.addColorStop(0,"#0d1a10"),r.addColorStop(.3,"#0a1208"),r.addColorStop(1,"#050a04"),e.fillStyle=r,e.fillRect(0,o,t,i-o),e.save(),e.fillStyle="#0a1208",e.beginPath(),e.moveTo(0,i),e.lineTo(0,o+20);for(let d=0;d<=t;d+=40){const l=Math.sin(d*.008)*30+Math.sin(d*.02)*15;e.lineTo(d,o-l)}e.lineTo(t,i),e.closePath(),e.fill(),e.restore();const c=e.createRadialGradient(t/2,o,0,t/2,o,t*.5);c.addColorStop(0,"rgba(192,64,48,0.2)"),c.addColorStop(.4,"rgba(192,64,48,0.06)"),c.addColorStop(1,"rgba(192,64,48,0)"),e.fillStyle=c,e.fillRect(0,o-80,t,160),e.save();const g=this.phase===S.CLOUDS?this.t*60:0;for(const d of this._clouds){e.globalAlpha=d.alpha;const l=e.createRadialGradient(d.x+d.w/2,d.y,0,d.x+d.w/2,d.y,d.w/2);l.addColorStop(0,"rgba(200,180,255,0.8)"),l.addColorStop(1,"rgba(100,80,140,0)"),e.fillStyle=l,e.beginPath(),e.ellipse(d.x+d.w/2,d.y+g*.1,d.w/2,d.h/2,0,0,Math.PI*2),e.fill()}e.restore(),e.save();for(const d of this._particles){const l=d.life/d.maxLife*.7;e.globalAlpha=l,e.fillStyle=d.color,e.shadowBlur=6,e.shadowColor=d.color,e.beginPath(),e.arc(d.x,d.y,d.size,0,Math.PI*2),e.fill()}if(e.shadowBlur=0,e.restore(),this.phase!==S.CLOUDS){e.save(),e.globalAlpha=this._logoAlpha;const d=e.createRadialGradient(t/2,this._logoY,0,t/2,this._logoY,250);d.addColorStop(0,"rgba(232,160,32,0.15)"),d.addColorStop(1,"rgba(232,160,32,0)"),e.fillStyle=d,e.fillRect(t/2-300,this._logoY-100,600,200);const l=Math.min(t*.13,80);e.font=`900 ${l}px Cinzel, Georgia, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=40,e.shadowColor="#c04030",e.fillStyle="#c04030",e.fillText("EMBERVEIL",t/2+2,this._logoY+2),e.shadowBlur=20,e.shadowColor="#e8a020",e.fillStyle="#e8a020",e.fillText("EMBERVEIL",t/2,this._logoY),e.shadowBlur=0,e.fillStyle="#f8d880",e.globalAlpha=this._logoAlpha*.4,e.fillText("EMBERVEIL",t/2,this._logoY-1),e.restore()}}onExit(){y(this._el),this._el=null}destroy(){y(this._el),this._el=null}}const E=document.getElementById("game-canvas"),F=document.getElementById("ui-overlay");function Y(){E.width=window.innerWidth,E.height=window.innerHeight}Y();window.addEventListener("resize",Y);const _e=new J(E,F),W=new Q,A=new X(E,F,_e,W);A.push(new ye(A,W));let q=0;function j(n){const e=Math.min((n-q)/1e3,.1);q=n,A.update(e),A.draw(),requestAnimationFrame(j)}requestAnimationFrame(j);
