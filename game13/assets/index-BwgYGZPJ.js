(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class we{constructor(e,t,a,s){this.canvas=e,this.ctx=e.getContext("2d"),this.uiOverlay=t,this.input=a,this.audio=s,this._stack=[]}push(e){const t=this._stack[this._stack.length-1];t!=null&&t.onPause&&t.onPause(),e.manager=this,this._stack.push(e),e.onEnter&&e.onEnter()}pop(){if(!this._stack.length)return;const e=this._stack.pop();e.onExit&&e.onExit(),e.destroy&&e.destroy();const t=this._stack[this._stack.length-1];t!=null&&t.onResume&&t.onResume()}replace(e){this._stack.length&&this.pop(),this.push(e)}update(e){var t;(t=this._stack[this._stack.length-1])==null||t.update(e)}draw(){var a;const e=this.ctx;e.clearRect(0,0,this.canvas.width,this.canvas.height);const t=this._stack[this._stack.length-1];(a=t==null?void 0:t.draw)==null||a.call(t,e)}get width(){return this.canvas.width}get height(){return this.canvas.height}}class ke{constructor(e,t){this.canvas=e,this.overlay=t,this.mouse={x:0,y:0,down:!1},this.keys=new Set,this._clicks=[],this._listeners=[],this._bind("pointermove",e,a=>this._onMove(a)),this._bind("pointerdown",e,a=>this._onDown(a)),this._bind("pointerup",e,a=>this._onUp(a)),this._bind("keydown",window,a=>this.keys.add(a.code)),this._bind("keyup",window,a=>this.keys.delete(a.code))}_bind(e,t,a){t.addEventListener(e,a,{passive:!0}),this._listeners.push({event:e,target:t,handler:a})}_onMove(e){const t=this.canvas.getBoundingClientRect(),a=this.canvas.width/t.width,s=this.canvas.height/t.height;this.mouse.x=(e.clientX-t.left)*a,this.mouse.y=(e.clientY-t.top)*s}_onDown(e){this._onMove(e),this.mouse.down=!0}_onUp(e){this._onMove(e),this.mouse.down=!1,this._clicks.push({x:this.mouse.x,y:this.mouse.y})}consumeClicks(){const e=this._clicks;return this._clicks=[],e}isKey(e){return this.keys.has(e)}destroy(){for(const{event:e,target:t,handler:a}of this._listeners)t.removeEventListener(e,a)}}class Se{constructor(){this._ctx=null,this._masterGain=null,this._musicGain=null,this._sfxGain=null,this._currentTrack=null,this._nodes=[],this.masterVolume=.8,this.musicVolume=.6,this.sfxVolume=.8,this._started=!1}_ensureContext(){this._ctx||(this._ctx=new(window.AudioContext||window.webkitAudioContext),this._masterGain=this._ctx.createGain(),this._masterGain.gain.value=this.masterVolume,this._masterGain.connect(this._ctx.destination),this._musicGain=this._ctx.createGain(),this._musicGain.gain.value=this.musicVolume,this._musicGain.connect(this._masterGain),this._sfxGain=this._ctx.createGain(),this._sfxGain.gain.value=this.sfxVolume,this._sfxGain.connect(this._masterGain))}resume(){this._ensureContext(),this._ctx.state==="suspended"&&this._ctx.resume(),this._started=!0}playTitleMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:55,type:"sine",gain:.08,detune:0},{freq:82.5,type:"sine",gain:.05,detune:5},{freq:110,type:"sine",gain:.04,detune:-3}]),this._addPad([220,277.2,329.6,440],.03)}playCombatMusic(e){this.resume(),this._stopCurrentTrack(),e==="hell_breach"||e==="shattered_core"?(this._buildAmbientLayer([{freq:55,type:"sawtooth",gain:.06,detune:0},{freq:82.5,type:"square",gain:.03,detune:-12},{freq:110,type:"sawtooth",gain:.025,detune:5}]),this._addPulse(55,.15,.3)):e==="cosmic_rift"||e==="eternal_void"?(this._buildAmbientLayer([{freq:41.2,type:"sine",gain:.07,detune:0},{freq:55,type:"sawtooth",gain:.04,detune:7},{freq:82.5,type:"square",gain:.02,detune:-8}]),this._addPulse(41.2,.18,.25)):(this._buildAmbientLayer([{freq:110,type:"sawtooth",gain:.04,detune:0},{freq:165,type:"square",gain:.02,detune:8}]),this._addPulse(110,.12,.4))}playTownMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:220,type:"triangle",gain:.06,detune:0},{freq:330,type:"sine",gain:.04,detune:2},{freq:440,type:"sine",gain:.03,detune:-2}]),this._addPad([220,293.7,369.9],.04)}_buildAmbientLayer(e){if(!this._ctx)return[];const t=[];for(const a of e){const s=this._ctx.createOscillator(),i=this._ctx.createGain(),o=this._ctx.createBiquadFilter();s.type=a.type,s.frequency.value=a.freq,s.detune.value=a.detune,o.type="lowpass",o.frequency.value=800,i.gain.value=0,s.connect(o),o.connect(i),i.connect(this._musicGain),s.start(),i.gain.linearRampToValueAtTime(a.gain,this._ctx.currentTime+3),t.push(s,i,o)}return this._nodes.push(...t),t}_addPad(e,t){if(!this._ctx)return;const a=4;let s=this._ctx.currentTime+2;const i=()=>{if(this._ctx){for(const o of e){const r=this._ctx.createOscillator(),l=this._ctx.createGain();r.type="sine",r.frequency.value=o,l.gain.value=0,r.connect(l),l.connect(this._musicGain),r.start(s),l.gain.setValueAtTime(0,s),l.gain.linearRampToValueAtTime(t,s+.5),l.gain.setValueAtTime(t,s+a-1),l.gain.linearRampToValueAtTime(0,s+a),r.stop(s+a+.1)}s+=a}};for(let o=0;o<20;o++)i()}_addPulse(e,t,a){if(!this._ctx)return;let s=this._ctx.currentTime+.5;for(let i=0;i<60;i++){const o=this._ctx.createOscillator(),r=this._ctx.createGain();o.type="square",o.frequency.value=e,r.gain.value=0,o.connect(r),r.connect(this._musicGain),o.start(s),r.gain.setValueAtTime(0,s),r.gain.linearRampToValueAtTime(t,s+.02),r.gain.linearRampToValueAtTime(0,s+a*.8),o.stop(s+a),s+=a}}_stopCurrentTrack(){var e,t;for(const a of this._nodes){try{(e=a.stop)==null||e.call(a)}catch{}try{(t=a.disconnect)==null||t.call(a)}catch{}}this._nodes=[]}playSfx(e){if(this.resume(),!this._ctx)return;const t=this._ctx,a=t.currentTime,s=t.createOscillator(),i=t.createGain();switch(s.connect(i),i.connect(this._sfxGain),e){case"click":s.frequency.value=880,s.type="sine",i.gain.setValueAtTime(.15,a),i.gain.exponentialRampToValueAtTime(.001,a+.1),s.start(a),s.stop(a+.1);break;case"hit":s.frequency.value=200,s.type="sawtooth",i.gain.setValueAtTime(.3,a),i.gain.exponentialRampToValueAtTime(.001,a+.2),s.start(a),s.stop(a+.2);break;case"spell":s.frequency.setValueAtTime(440,a),s.frequency.linearRampToValueAtTime(880,a+.3),s.type="sine",i.gain.setValueAtTime(.2,a),i.gain.exponentialRampToValueAtTime(.001,a+.4),s.start(a),s.stop(a+.4);break;case"victory":s.frequency.setValueAtTime(440,a),s.frequency.setValueAtTime(554,a+.15),s.frequency.setValueAtTime(659,a+.3),s.frequency.setValueAtTime(880,a+.45),s.type="sine",i.gain.setValueAtTime(.25,a),i.gain.setValueAtTime(.25,a+.6),i.gain.exponentialRampToValueAtTime(.001,a+1),s.start(a),s.stop(a+1);break;case"defeat":s.frequency.setValueAtTime(440,a),s.frequency.linearRampToValueAtTime(220,a+.8),s.type="sawtooth",i.gain.setValueAtTime(.2,a),i.gain.linearRampToValueAtTime(.001,a+1.2),s.start(a),s.stop(a+1.2);break;case"levelup":case"level_up":{[261.6,329.6,392,523.3,659.3].forEach((r,l)=>{const c=t.createOscillator(),h=t.createGain();c.connect(h),h.connect(this._sfxGain),c.type="sine",c.frequency.value=r;const d=a+l*.08;h.gain.setValueAtTime(0,d),h.gain.linearRampToValueAtTime(.2,d+.03),h.gain.exponentialRampToValueAtTime(.001,d+.25),c.start(d),c.stop(d+.25)}),s.start(a),s.stop(a);break}case"purchase":s.frequency.setValueAtTime(660,a),s.frequency.setValueAtTime(880,a+.05),s.type="triangle",i.gain.setValueAtTime(.15,a),i.gain.exponentialRampToValueAtTime(.001,a+.2),s.start(a),s.stop(a+.2);break;case"shrine":s.frequency.setValueAtTime(523.3,a),s.frequency.linearRampToValueAtTime(1046.5,a+.5),s.type="sine",i.gain.setValueAtTime(.08,a),i.gain.linearRampToValueAtTime(.18,a+.25),i.gain.exponentialRampToValueAtTime(.001,a+.8),s.start(a),s.stop(a+.8);break;case"craft":s.frequency.setValueAtTime(300,a),s.frequency.setValueAtTime(400,a+.05),s.frequency.setValueAtTime(600,a+.1),s.type="sawtooth",i.gain.setValueAtTime(.2,a),i.gain.exponentialRampToValueAtTime(.001,a+.3),s.start(a),s.stop(a+.3);break;case"ng_plus":{[440,554.4,659.3,880,1108.7].forEach((r,l)=>{const c=t.createOscillator(),h=t.createGain();c.connect(h),h.connect(this._sfxGain),c.type="triangle",c.frequency.value=r;const d=a+l*.1;h.gain.setValueAtTime(0,d),h.gain.linearRampToValueAtTime(.25,d+.04),h.gain.exponentialRampToValueAtTime(.001,d+.5),c.start(d),c.stop(d+.5)}),s.start(a),s.stop(a);break}}}setMasterVolume(e){this.masterVolume=e,this._masterGain&&(this._masterGain.gain.value=e)}setMusicVolume(e){this.musicVolume=e,this._musicGain&&(this._musicGain.gain.value=e)}setSfxVolume(e){this.sfxVolume=e,this._sfxGain&&(this._sfxGain.gain.value=e)}}function w(n,e,t={}){const a=document.createElement(n);e&&(a.className=e);for(const[s,i]of Object.entries(t))a.setAttribute(s,i);return a}function v(n){var e;(e=n==null?void 0:n.parentNode)==null||e.removeChild(n)}function C(n,e){if(document.getElementById(n))return;const t=document.createElement("style");t.id=n,t.textContent=e,document.head.appendChild(t)}const te=[{id:"warrior",name:"Warrior",role:"Frontline Tank",hook:"Shield Bash stuns enemies. Whirlwind hits all adjacent foes. Unbreakable when outnumbered.",armorType:"Heavy Armor · Sword / Hammer / 2H",primaryAttr:"STR",armorTier:"heavy",weapons:["sword","hammer","2h_sword","2h_axe"],skills:["shield_bash","battle_cry","whirlwind","unbreakable"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4L8 14v8l10 10 10-10v-8L18 4z"/><path d="M18 4v28M8 14h20"/></svg>'},{id:"paladin",name:"Paladin",role:"Holy Warrior",hook:"Holy Strike crits vs demons. Lay on Hands keeps allies alive. Consecration sustains long fights.",armorType:"Medium Armor · Sword / Scepter + Shield",primaryAttr:"STR",armorTier:"medium",weapons:["sword","scepter"],skills:["holy_strike","lay_on_hands","divine_shield","consecration"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 3l-14 6v9c0 8 7 14 14 16 7-2 14-8 14-16V9L18 3z"/><path d="M12 18l4 4 8-8"/></svg>'},{id:"ranger",name:"Ranger",role:"Precision Ranged",hook:"Aimed Shot ignores armor. Rain of Arrows blankets the entire enemy field for 3 rounds.",armorType:"Light Armor · Bow / Crossbow / Javelin",primaryAttr:"DEX",armorTier:"light",weapons:["bow","crossbow","javelin"],skills:["aimed_shot","multi_shot","smoke_trap","rain_of_arrows"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l26 26M5 5l8 2-2-8"/><circle cx="24" cy="12" r="4"/></svg>'},{id:"rogue",name:"Rogue",role:"Burst Assassin",hook:"200% Backstab on stunned targets. Death Mark makes enemies take 50% more damage from all sources.",armorType:"Light Armor · Dagger (dual wield)",primaryAttr:"DEX",armorTier:"light",weapons:["dagger"],skills:["backstab","poison_blade","shadow_step","death_mark"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 26L26 10M18 10l8-2-2 8"/><path d="M10 26c-2 2-4 2-4 0s0-2 2-4"/></svg>'},{id:"cleric",name:"Cleric",role:"Primary Healer",hook:"Mass Resurrection can auto-trigger on wipe. Sanctuary makes an ally temporarily untargetable.",armorType:"Light Armor · Staff / Scepter / Wand",primaryAttr:"INT",armorTier:"light",weapons:["staff","scepter","wand"],skills:["heal","smite","sanctuary","mass_resurrection"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4v28M4 18h28"/></svg>'},{id:"bard",name:"Bard",role:"Support Maestro",hook:"Ballad of Valor gives one hero two turns per round. Song of Ruin strips all enemy buffs at once.",armorType:"Light Armor · Dagger / Wand",primaryAttr:"INT",armorTier:"light",weapons:["dagger","wand"],skills:["inspiring_tune","discordant_wail","ballad_of_valor","song_of_ruin"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 28c0-3 3-5 8-5s8 2 8 5"/><path d="M14 23V10l12-3v13"/><circle cx="10" cy="28" r="3"/><circle cx="24" cy="25" r="3"/></svg>'},{id:"mage",name:"Mage",role:"AoE Glass Cannon",hook:"Fireball torches entire enemy packs. Blizzard hits all enemies for 3 rounds. Arcane Surge: 400% INT.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["magic_missile","fireball","blizzard","arcane_surge"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>'},{id:"necromancer",name:"Necromancer",role:"Army Builder",hook:"Raise Dead turns corpses into skeleton allies. Death Coil applies Poison AND Bleed to all enemies.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["bone_spike","raise_dead","life_drain","death_coil"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="8"/><path d="M14 14v5M22 14v5M10 28c0-5 4-9 8-9s8 4 8 9"/></svg>'},{id:"warlock",name:"Warlock",role:"Chaos Dealer",hook:"Corruption spreads on enemy death. Soul Pact doubles all DoT at cost of own HP.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["corruption","hellfire","soul_pact","void_rift"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-4 6-8 8-8 14a8 8 0 0016 0c0-6-4-8-8-14z"/><path d="M14 22c0 2.2 1.8 4 4 4s4-1.8 4-4"/></svg>'},{id:"demon_hunter",name:"Demon Hunter",role:"Specialist Killer",hook:"+50% damage vs demons. Vengeance stacks from fallen allies then unleashes devastating burst.",armorType:"Light Armor · Crossbow / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["crossbow","dagger"],skills:["demon_bolt","glaive_toss","fel_sight","vengeance"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L18 6l12 24"/><path d="M11 22h14"/><path d="M18 6v5"/></svg>'},{id:"scavenger",name:"Scavenger",role:"Resource Specialist",hook:"Scrounge finds items mid-combat. Jackpot has 20% chance to loot Magic+ gear from each kill.",armorType:"Light/Medium · Any 1H weapon",primaryAttr:"DEX",armorTier:"light",weapons:["dagger","sword","hammer","javelin"],skills:["scrounge","thrown_junk","makeshift_bomb","jackpot"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="16" width="16" height="14" rx="2"/><path d="M6 16h24M14 16v-4a4 4 0 018 0v4"/></svg>'},{id:"swashbuckler",name:"Swashbuckler",role:"Flashy Duelist",hook:"Build Flair stacks with Flourish. Grandeur releases all stacks in one legendary strike.",armorType:"Light Armor · Sword / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["sword","dagger"],skills:["riposte","flourish","taunt","grandeur"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L30 6M22 6l8-2-2 8"/><path d="M6 30a4 4 0 004-4"/></svg>'},{id:"dragon_knight",name:"Dragon Knight",role:"Draconic Warrior",hook:"Choose fire/ice/lightning. Draconic Fury turns all attacks into group AoE for 2 rounds.",armorType:"Heavy/Medium · 2H Sword / 2H Axe",primaryAttr:"STR",armorTier:"heavy",weapons:["2h_sword","2h_axe"],skills:["dragon_claw","breath_weapon","dragon_scales","draconic_fury"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c6 4 12 10 12 16s-6 12-12 12S6 26 6 20c0-6 6-12 12-16z"/><path d="M18 4c-3 6 0 14 0 18"/><path d="M8 16c4-2 8-2 10 0"/></svg>'},{id:"pyromancer",name:"Pyromancer",role:"Fire Specialist",hook:"Stack Burn on multiple groups. Meteor ignites every enemy group simultaneously.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["flame_lance","ignite","pyroclasm","meteor"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-2 8 6 10 2 18a8 8 0 01-8-8c0-2 1-4 2-5-1 4 2 6 4 4 2-8-4-6-4-14"/><path d="M18 22a4 4 0 000 8"/></svg>'}],G={version:1,hero:null,party:[],companions:[],bench:[],gold:150,inventory:[],materials:{},storyFlags:{},quests:[],act:1,zoneId:"border_roads",nodeId:"start",visitedNodes:new Set,unlockedZones:["border_roads"],completedBosses:[],portal:null,fame:0,ngPlus:0,playTimeSeconds:0,settings:{disableTextures:!1}};let y={...G};const m={get(){return y},init(n){y={...G,hero:n,party:[n],gold:n.gold??150,visitedNodes:new Set(["start"])}},load(n){y={...G,...n,visitedNodes:new Set(n.visitedNodes||["start"]),unlockedZones:n.unlockedZones||["border_roads"],completedBosses:n.completedBosses||[],portal:n.portal||null,fame:n.fame||0,ngPlus:n.ngPlus||0,materials:n.materials||{},settings:{...G.settings,...n.settings||{}}}},toSaveData(){return{...y,visitedNodes:[...y.visitedNodes]}},setFlag(n,e=!0){y.storyFlags[n]=e},getFlag(n){return y.storyFlags[n]},addGold(n){y.gold=Math.max(0,(y.gold||0)+n)},getGold(){return y.gold||0},addToInventory(n){y.inventory.push(n)},removeFromInventory(n){y.inventory=y.inventory.filter(e=>e.id!==n)},getMaterials(){return y.materials||{}},addMaterials(n){y.materials||(y.materials={});for(const[e,t]of Object.entries(n))y.materials[e]=(y.materials[e]||0)+t},getParty(){return y.party},getCompanions(){return y.companions},getAllCombatants(){return[...y.party,...y.companions]},addToParty(n){return y.party.length<4?(y.party.push(n),!0):!1},addToCompanions(n){return y.companions.length<4?(y.companions.push(n),!0):!1},addToBench(n){y.bench.push(n)},visitNode(n){y.visitedNodes.add(n)},hasVisited(n){return y.visitedNodes.has(n)},addFame(n){y.fame=(y.fame||0)+n},getFame(){return y.fame||0},getNgPlus(){return y.ngPlus||0},startNgPlus(){const n=(y.ngPlus||0)+1;y.ngPlus=n,y.portal=null,y.unlockedZones=["border_roads"],y.completedBosses=[],y.visitedNodes=new Set(["start"]),y.zoneId="border_roads",y.nodeId="start",y.gold=Math.max(150,Math.floor((y.gold||0)*.5)),[...y.party,...y.companions].forEach(e=>{e.pendingAttrPoints=(e.pendingAttrPoints||0)+5,e.hp=e.maxHp||100,e.mp=e.maxMp||80})},openPortal(n,e){y.portal={nodeId:n,zoneId:e}},closePortal(){y.portal=null},getPortal(){return y.portal},getFameTitle(){const n=y.fame||0;return n>=500?"Legendary":n>=250?"Renowned":n>=100?"Respected":n>=50?"Known":n>=20?"Noticed":"Unknown"}},T={COMBAT:"combat",DIALOG:"dialog",TOWN:"town",TREASURE:"treasure",AMBUSH:"ambush",BOSS:"boss",LORE:"lore",SHRINE:"shrine",CHALLENGE:"challenge"},x={goblin_scout:{id:"goblin_scout",name:"Goblin Scout",hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:15,xpValue:15,gold:[2,6],loot:["dagger","light_chest"]},goblin_warrior:{id:"goblin_warrior",name:"Goblin Warrior",hp:38,maxHp:38,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12],loot:["sword","medium_chest","shield"]},goblin_shaman:{id:"goblin_shaman",name:"Goblin Shaman",hp:28,maxHp:28,dmg:[6,12],armor:1,hit:74,dodge:10,xpValue:30,gold:[8,18],loot:["wand","ring"],statusOnHit:[{type:"burn",chance:.35,duration:2,power:4}]},goblin_warlord:{id:"goblin_warlord",name:"Goblin Warlord",hp:65,maxHp:65,dmg:[10,18],armor:7,hit:70,dodge:6,xpValue:55,gold:[20,40],loot:["sword","heavy_chest"]},corrupted_wolf:{id:"corrupted_wolf",name:"Corrupted Wolf",hp:30,maxHp:30,dmg:[8,14],armor:1,hit:76,dodge:18,xpValue:22,gold:[1,4],loot:[],statusOnHit:[{type:"bleed",chance:.4,duration:2,power:3}]},corrupted_bear:{id:"corrupted_bear",name:"Corrupted Bear",hp:70,maxHp:70,dmg:[12,20],armor:4,hit:65,dodge:5,xpValue:50,gold:[5,15],loot:[],statusOnHit:[{type:"stun",chance:.25,duration:1,power:0}]},bandit:{id:"bandit",name:"Bandit",hp:28,maxHp:28,dmg:[6,11],armor:3,hit:70,dodge:10,xpValue:20,gold:[4,10],loot:["dagger","light_chest"]},bandit_captain:{id:"bandit_captain",name:"Bandit Captain",hp:55,maxHp:55,dmg:[10,16],armor:5,hit:72,dodge:12,xpValue:45,gold:[15,30],loot:["sword","medium_chest"]},imp:{id:"imp",name:"Imp",hp:28,maxHp:28,dmg:[7,12],armor:0,hit:82,dodge:22,xpValue:28,gold:[4,10],loot:[],statusOnHit:[{type:"burn",chance:.55,duration:2,power:6}]},hell_knight:{id:"hell_knight",name:"Hell Knight",hp:80,maxHp:80,dmg:[16,26],armor:12,hit:70,dodge:8,xpValue:72,gold:[20,45],loot:["heavy_chest","heavy_legs"],statusOnHit:[{type:"bleed",chance:.4,duration:2,power:7}]},void_shade:{id:"void_shade",name:"Void Shade",hp:50,maxHp:50,dmg:[14,20],armor:0,hit:85,dodge:28,xpValue:55,gold:[12,28],loot:["ring","wand"],statusOnHit:[{type:"poison",chance:.5,duration:3,power:7},{type:"stun",chance:.15,duration:1,power:0}]},demon_brute:{id:"demon_brute",name:"Demon Brute",hp:120,maxHp:120,dmg:[20,32],armor:8,hit:65,dodge:5,xpValue:90,gold:[30,60],loot:["heavy_chest"],statusOnHit:[{type:"stun",chance:.3,duration:1,power:0}]},archfiend_malgrath:{id:"archfiend_malgrath",name:"Archfiend Malgrath",hp:380,maxHp:380,dmg:[24,38],armor:16,hit:75,dodge:10,xpValue:450,gold:[120,200],loot:["heavy_chest","ring","necklace"],statusOnHit:[{type:"burn",chance:.6,duration:3,power:10},{type:"bleed",chance:.4,duration:2,power:8}]},emberveil_sovereign:{id:"emberveil_sovereign",name:"The Emberveil Sovereign",hp:600,maxHp:600,dmg:[30,50],armor:20,hit:78,dodge:12,xpValue:800,gold:[200,350],loot:["heavy_chest","ring","necklace","staff"],statusOnHit:[{type:"burn",chance:.7,duration:3,power:12},{type:"poison",chance:.5,duration:3,power:10},{type:"stun",chance:.25,duration:1,power:0}]},ash_wraith:{id:"ash_wraith",name:"Ash Wraith",hp:42,maxHp:42,dmg:[8,14],armor:0,hit:78,dodge:20,xpValue:32,gold:[6,14],loot:["wand","ring"],statusOnHit:[{type:"burn",chance:.4,duration:2,power:5}]},cinder_hound:{id:"cinder_hound",name:"Cinder Hound",hp:35,maxHp:35,dmg:[10,16],armor:2,hit:80,dodge:16,xpValue:28,gold:[3,9],loot:[],statusOnHit:[{type:"bleed",chance:.45,duration:2,power:4}]},molten_golem:{id:"molten_golem",name:"Molten Golem",hp:90,maxHp:90,dmg:[14,22],armor:10,hit:62,dodge:4,xpValue:65,gold:[15,30],loot:["heavy_chest"],statusOnHit:[{type:"burn",chance:.6,duration:3,power:6}]},veil_cultist:{id:"veil_cultist",name:"Veil Cultist",hp:45,maxHp:45,dmg:[9,15],armor:2,hit:72,dodge:12,xpValue:35,gold:[8,18],loot:["cloth_chest","wand"],statusOnHit:[{type:"poison",chance:.35,duration:3,power:5}]},veil_sorcerer:{id:"veil_sorcerer",name:"Veil Sorcerer",hp:55,maxHp:55,dmg:[14,22],armor:1,hit:76,dodge:14,xpValue:60,gold:[20,40],loot:["staff","cloth_chest","ring"],statusOnHit:[{type:"burn",chance:.5,duration:2,power:7},{type:"stun",chance:.2,duration:1,power:0}]},lava_titan:{id:"lava_titan",name:"The Lava Titan",hp:280,maxHp:280,dmg:[20,32],armor:14,hit:70,dodge:4,xpValue:350,gold:[80,140],loot:["heavy_chest","heavy_legs","ring"],statusOnHit:[{type:"burn",chance:.7,duration:3,power:8}]},grax_veil_touched:{id:"grax_veil_touched",name:"Grax the Veil-Touched",hp:200,maxHp:200,dmg:[14,24],armor:10,hit:78,dodge:8,xpValue:250,gold:[60,100],loot:["sword","heavy_chest","ring"],statusOnHit:[{type:"poison",chance:.3,duration:3,power:5}]},veil_warden:{id:"veil_warden",name:"Veil Warden",hp:90,maxHp:90,dmg:[10,16],armor:6,hit:70,dodge:12,xpValue:80,gold:[25,45],loot:["medium_chest","wand"],statusOnHit:[{type:"burn",chance:.45,duration:2,power:5}]}},q={goblin_patrol:{name:"Goblin Patrol",enemies:[{...x.goblin_scout,count:3}]},corrupted_outpost:{name:"Corrupted Outpost",enemies:[{...x.goblin_warrior,count:2},{...x.goblin_scout,count:2}]},border_boss:{name:"Warlord's Vanguard",enemies:[{...x.goblin_warlord,count:1},{...x.goblin_warrior,count:2}]},bandit_ambush:{name:"Bandit Ambush",enemies:[{...x.bandit,count:2},{...x.bandit_captain,count:1}]},spider_nest:{name:"Spider Hollow",enemies:[{id:"giant_spider",name:"Giant Spider",hp:18,maxHp:18,dmg:[5,10],armor:1,hit:75,dodge:14,xpValue:18,gold:[1,4],loot:[],statusOnHit:[{type:"poison",chance:.5,duration:2,power:3}],count:4}]},goblin_camp:{name:"Goblin Camp",enemies:[{...x.goblin_scout,count:2},{...x.goblin_shaman,count:1},{...x.goblin_warrior,count:2}]},thornwood_boss:{name:"The Veil Wardens",enemies:[{...x.veil_warden,count:2},{...x.goblin_shaman,count:2}]},grax_final:{name:"Grax the Veil-Touched",enemies:[{...x.grax_veil_touched,count:1},{...x.veil_warden,count:2}]},wolf_pack:{name:"Corrupted Wolf Pack",enemies:[{...x.corrupted_wolf,count:3}]},bear_ambush:{name:"Corrupted Predator",enemies:[{...x.corrupted_bear,count:1},{...x.corrupted_wolf,count:2}]},ash_patrol:{name:"Ash Patrol",enemies:[{...x.ash_wraith,count:2},{...x.cinder_hound,count:2}]},obsidian_garrison:{name:"Obsidian Garrison",enemies:[{...x.molten_golem,count:1},{...x.ash_wraith,count:3}]},ember_ambush:{name:"Ember Ambush",enemies:[{...x.cinder_hound,count:4}]},lava_titan:{name:"The Lava Titan",enemies:[{...x.lava_titan,count:1},{...x.molten_golem,count:2}]},veil_cult_camp:{name:"Veil Cult Encampment",enemies:[{...x.veil_cultist,count:3},{...x.veil_sorcerer,count:1}]},veil_high_priest:{name:"Veil High Priest",enemies:[{...x.veil_sorcerer,count:1,hp:180,maxHp:180,dmg:[18,28],armor:4,xpValue:220,name:"Veil High Priest"},{...x.veil_cultist,count:3}]},demon_patrol:{name:"Demon Patrol",enemies:[{...x.imp,count:3},{...x.hell_knight,count:1}]},hell_garrison:{name:"Hell Garrison",enemies:[{...x.hell_knight,count:2},{...x.imp,count:2}]},rift_assault:{name:"Rift Assault",enemies:[{...x.void_shade,count:3},{...x.demon_brute,count:1}]},void_nexus_ambush:{name:"Void Nexus",enemies:[{...x.void_shade,count:4}]},archfiend_malgrath:{name:"Archfiend Malgrath",enemies:[{...x.archfiend_malgrath,count:1},{...x.hell_knight,count:2}]},emberveil_sovereign:{name:"The Emberveil Sovereign",enemies:[{...x.emberveil_sovereign,count:1},{...x.void_shade,count:2},{...x.demon_brute,count:1}]},void_horde:{name:"Void Horde",enemies:[{id:"void_wraith",name:"Void Wraith",count:2,hp:90,maxHp:90,dmg:[22,38],armor:8,hit:82,dodge:22,xpValue:120,gold:[20,40]},{id:"star_horror",name:"Star Horror",count:1,hp:110,maxHp:110,dmg:[18,32],armor:5,hit:78,dodge:18,xpValue:130,gold:[18,35]}]},cosmic_assault:{name:"Cosmic Assault",enemies:[{id:"star_horror",name:"Star Horror",count:2,hp:110,maxHp:110,dmg:[18,32],armor:5,hit:78,dodge:18,xpValue:130,gold:[18,35]},{id:"cosmic_titan",name:"Cosmic Titan",count:1,hp:200,maxHp:200,dmg:[30,50],armor:18,hit:72,dodge:8,xpValue:200,gold:[30,60]}]},unraveler:{name:"The Unraveler",enemies:[{id:"the_unraveler",name:"The Unraveler",count:1,hp:600,maxHp:600,dmg:[45,80],armor:25,hit:88,dodge:12,xpValue:800,gold:[200,400]},{id:"void_wraith",name:"Void Wraith",count:2,hp:90,maxHp:90,dmg:[22,38],armor:8,hit:82,dodge:22,xpValue:120,gold:[20,40]}]}},he=[{id:"border_roads",name:"The Border Roads",act:1,zoneIndex:0,nodes:[{id:"start",type:"town",name:"Emberglen",x:.08,y:.5,exits:["road_ambush"]},{id:"road_ambush",type:"dialog",name:"Shady Wanderer",x:.28,y:.4,exits:["crossroads_a","crossroads_b"]},{id:"crossroads_a",type:"combat",name:"Goblin Scout Pack",x:.5,y:.22,exits:["ruined_watch"],encounter:"goblin_patrol"},{id:"crossroads_b",type:"shrine",name:"Roadside Shrine",x:.5,y:.7,exits:["ruined_watch"],shrineType:"heal"},{id:"ruined_watch",type:"combat",name:"Ruined Watchtower",x:.72,y:.5,exits:["border_boss"],encounter:"corrupted_outpost"},{id:"border_boss",type:"boss",name:"Warlord's Vanguard",x:.92,y:.5,exits:[],encounter:"border_boss"}]},{id:"thornwood",name:"Thornwood Forest",act:1,zoneIndex:1,nodes:[{id:"forest_enter",type:"dialog",name:"Forest Edge",x:.08,y:.5,exits:["spider_hollow","hidden_path"]},{id:"spider_hollow",type:"combat",name:"Spider Hollow",x:.3,y:.28,exits:["goblin_camp"],encounter:"spider_nest"},{id:"hidden_path",type:"lore",name:"Ancient Runestone",x:.3,y:.72,exits:["goblin_camp"]},{id:"goblin_camp",type:"combat",name:"Goblin Camp",x:.55,y:.5,exits:["seer_hut","treasure_grove"],encounter:"goblin_camp"},{id:"seer_hut",type:"dialog",name:"The Seer's Hut",x:.75,y:.28,exits:["thornwood_boss"]},{id:"treasure_grove",type:"treasure",name:"Hidden Grove",x:.75,y:.72,exits:["thornwood_boss"]},{id:"thornwood_boss",type:"boss",name:"The Veil Wardens",x:.92,y:.5,exits:[],encounter:"thornwood_boss"}]}],Te=[{id:"dust_roads",name:"The Dust Roads",act:2,zoneIndex:0,nodes:[{id:"ash_gate",type:"dialog",name:"Ashen Gate",x:.08,y:.5,exits:["dust_patrol","ash_lore"]},{id:"dust_patrol",type:"combat",name:"Ash Patrol",x:.28,y:.28,exits:["obsidian_fort"],encounter:"ash_patrol"},{id:"ash_lore",type:"lore",name:"Ruined Outpost",x:.28,y:.72,exits:["obsidian_fort"]},{id:"obsidian_fort",type:"combat",name:"Obsidian Garrison",x:.52,y:.5,exits:["ember_path","veil_camp"],encounter:"obsidian_garrison"},{id:"ember_path",type:"ambush",name:"Ember Path",x:.72,y:.28,exits:["dust_boss"],encounter:"ember_ambush"},{id:"veil_camp",type:"combat",name:"Veil Cult Camp",x:.72,y:.72,exits:["dust_boss"],encounter:"veil_cult_camp"},{id:"dust_boss",type:"boss",name:"The Lava Titan",x:.92,y:.5,exits:[],encounter:"lava_titan"}]},{id:"ember_plateau",name:"The Ember Plateau",act:2,zoneIndex:1,nodes:[{id:"plateau_enter",type:"dialog",name:"Plateau Ascent",x:.08,y:.5,exits:["lava_fields","ancient_shrine"]},{id:"lava_fields",type:"combat",name:"Lava Fields",x:.3,y:.3,exits:["veil_stronghold"],encounter:"ash_patrol"},{id:"ancient_shrine",type:"treasure",name:"Ancient Shrine",x:.3,y:.7,exits:["veil_stronghold"]},{id:"veil_stronghold",type:"combat",name:"Veil Stronghold",x:.55,y:.5,exits:["rift_access","lore_monolith"],encounter:"veil_cult_camp"},{id:"rift_access",type:"dialog",name:"The Rift Access",x:.75,y:.28,exits:["plateau_boss"]},{id:"lore_monolith",type:"lore",name:"Veil Monolith",x:.75,y:.72,exits:["plateau_boss"]},{id:"plateau_boss",type:"boss",name:"Veil High Priest",x:.92,y:.5,exits:[],encounter:"veil_high_priest"}]}],Ce=[{id:"hell_breach",name:"The Hell Breach",act:3,zoneIndex:0,nodes:[{id:"breach_gate",type:"dialog",name:"The Veil Breach",x:.08,y:.5,exits:["demon_patrol","fell_ruins"]},{id:"demon_patrol",type:"combat",name:"Demon Patrol",x:.3,y:.28,exits:["inferno_keep"],encounter:"demon_patrol"},{id:"fell_ruins",type:"lore",name:"Fell Ruins",x:.3,y:.72,exits:["inferno_keep"]},{id:"inferno_keep",type:"combat",name:"Inferno Keep",x:.55,y:.5,exits:["void_altar","soul_prison"],encounter:"hell_garrison"},{id:"void_altar",type:"dialog",name:"The Void Altar",x:.75,y:.28,exits:["breach_boss"]},{id:"soul_prison",type:"treasure",name:"Soul Prison",x:.75,y:.72,exits:["breach_boss"]},{id:"breach_boss",type:"boss",name:"Archfiend Malgrath",x:.92,y:.5,exits:[],encounter:"archfiend_malgrath"}]},{id:"shattered_core",name:"The Shattered Core",act:3,zoneIndex:1,nodes:[{id:"core_enter",type:"dialog",name:"Core Entrance",x:.08,y:.5,exits:["rift_demons","void_nexus"]},{id:"rift_demons",type:"combat",name:"Rift Demons",x:.3,y:.28,exits:["shard_fortress"],encounter:"rift_assault"},{id:"void_nexus",type:"ambush",name:"Void Nexus",x:.3,y:.72,exits:["shard_fortress"],encounter:"void_nexus_ambush"},{id:"shard_fortress",type:"combat",name:"Shard Fortress",x:.55,y:.5,exits:["the_wound","ancient_seal"],encounter:"hell_garrison"},{id:"the_wound",type:"lore",name:"The Wound",x:.75,y:.28,exits:["core_boss"]},{id:"ancient_seal",type:"dialog",name:"Ancient Seal",x:.75,y:.72,exits:["core_boss"]},{id:"core_boss",type:"boss",name:"The Emberveil Sovereign",x:.92,y:.5,exits:[],encounter:"emberveil_sovereign"}]}],Ee=[{id:"cosmic_rift",name:"The Cosmic Rift",act:4,zoneIndex:0,nodes:[{id:"rift_entry",type:"dialog",name:"Edge of Reality",x:.08,y:.5,exits:["star_fields","void_expanse"]},{id:"star_fields",type:"combat",name:"The Broken Stars",x:.3,y:.28,exits:["cosmic_bastion"],encounter:"void_horde"},{id:"void_expanse",type:"shrine",name:"Cosmic Shrine",x:.3,y:.72,exits:["cosmic_bastion"],shrineType:"empower"},{id:"cosmic_bastion",type:"combat",name:"Cosmic Bastion",x:.55,y:.5,exits:["prophet_sanctum","titan_pit"],encounter:"cosmic_assault"},{id:"prophet_sanctum",type:"dialog",name:"Void Prophet's Sanctum",x:.75,y:.28,exits:["rift_boss"]},{id:"titan_pit",type:"challenge",name:"Titan's Pit",x:.75,y:.72,exits:["rift_boss"],encounter:"cosmic_assault"},{id:"rift_boss",type:"boss",name:"The Void Herald",x:.92,y:.5,exits:[],encounter:"void_horde"}]},{id:"eternal_void",name:"The Eternal Void",act:4,zoneIndex:1,nodes:[{id:"void_gates",type:"dialog",name:"Gates of the Void",x:.08,y:.5,exits:["star_horror_swarm","void_library"]},{id:"star_horror_swarm",type:"combat",name:"Star Horror Swarm",x:.3,y:.28,exits:["unraveler_ante"],encounter:"cosmic_assault"},{id:"void_library",type:"lore",name:"The Void Library",x:.3,y:.72,exits:["unraveler_ante"]},{id:"unraveler_ante",type:"combat",name:"Antechamber of Unmaking",x:.55,y:.5,exits:["last_shrine","final_trial"],encounter:"void_horde"},{id:"last_shrine",type:"shrine",name:"The Last Shrine",x:.75,y:.28,exits:["void_boss"],shrineType:"fullrestore"},{id:"final_trial",type:"challenge",name:"Trial of the Void",x:.75,y:.72,exits:["void_boss"],encounter:"cosmic_assault"},{id:"void_boss",type:"boss",name:"The Unraveler",x:.92,y:.5,exits:[],encounter:"unraveler"}]}],Me={border_roads:["goblin_patrol","corrupted_outpost","bandit_ambush"],thornwood:["spider_nest","goblin_camp","wolf_pack","bear_ambush"],dust_roads:["ash_patrol","obsidian_garrison","ember_ambush"],ember_plateau:["ash_patrol","veil_cult_camp","obsidian_garrison"],hell_breach:["demon_patrol","hell_garrison","rift_assault"],shattered_core:["hell_garrison","rift_assault","void_nexus_ambush"],cosmic_rift:["void_horde","cosmic_assault"],eternal_void:["void_horde","cosmic_assault"]},$e={shady_wanderer:{id:"shady_wanderer",npcName:"Shady Wanderer",npcPortrait:null,lines:[{speaker:"npc",text:"Oi, hold it right there. Road toll's been raised to ten gold. Goblins broke the bridge further north, y'see..."},{speaker:"hero",text:"(He's clearly lying — the bridge is visible behind him, intact.)"}],choices:[{text:"Pay 10 gold.",effect:{gold:-10},outcome:"pay"},{text:"Refuse. Prepare to fight.",effect:{startCombat:"bandit_ambush"},outcome:"fight"},{text:"[DEX 14] Slip past unseen.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"sneak_past",fail:"fight"}}],outcomes:{pay:{text:"He takes your coin with a sneer and steps aside."},fight:{text:`He raises his blade. "Should've paid up!"`,startCombat:"bandit_ambush"},sneak_past:{text:"You melt into the shadows and pass by unseen. He never knew you were there."}}},forest_enter:{id:"forest_enter",npcName:"Forest Warden",npcPortrait:null,lines:[{speaker:"npc",text:"The Thornwood has changed. The wolves don't flee from torchlight anymore. Something corrupted them — the same wrongness that's taken the goblins."},{speaker:"npc",text:"If you enter, watch the tree lines. And whatever you hear at night... don't follow it."}],choices:[{text:"We'll press on. The source must be found.",outcome:"press_on"},{text:"[INT 12] Ask about the corruption's origin.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"learned_lore",fail:"press_on"}}],outcomes:{press_on:{text:"He nods grimly and steps aside."},learned_lore:{text:`He leans in. "There's a rift — deep in Thornwood. Something tore a hole between here and somewhere else. That's where it's pouring in."`,setFlag:"knows_rift_origin"}}},seer_hut:{id:"seer_hut",npcName:"Mira the Seer",npcPortrait:null,lines:[{speaker:"npc",text:"I have watched the Emberveil spread for thirty years. What you see is merely the symptom. The wound is somewhere else. Somewhere darker."},{speaker:"npc",text:"The goblins did not choose to be what they are now. Something reached into their minds and gave them purpose. A will from beyond."}],choices:[{text:"Where does the wound come from?",outcome:"ask_source"},{text:"Can you join our party?",outcome:"ask_join"},{text:"We will stop it.",outcome:"pledge"}],outcomes:{ask_source:{text:"Follow the corruption south. The Ashen Wastes — something ancient sleeps there, and it's waking."},ask_join:{text:"My bones are too old for roads. But carry this — it will help you recognize Veil artifacts when you find them.",reward:{item:"veil_lens"}},pledge:{text:"I hope you are right. More than you know.",setFlag:"seer_met"}}},ash_gate:{id:"ash_gate",npcName:"Ashen Sentinel",npcPortrait:null,lines:[{speaker:"npc",text:"Beyond this gate lie the Dust Roads. The air itself burns here — the Emberveil's corruption runs deep in this land."},{speaker:"npc",text:"Steel your nerves. The creatures here are not what they once were."}],choices:[{text:"We press forward.",outcome:"enter"},{text:"What happened here?",outcome:"ask"}],outcomes:{enter:{text:"The sentinel nods and steps aside, ash swirling in your wake."},ask:{text:"The veil tore open months ago. Fire and ash poured through. Everything it touched... changed."}}},plateau_enter:{id:"plateau_enter",npcName:"Scorched Hermit",npcPortrait:null,lines:[{speaker:"npc",text:"The Molten Plateau is no place for the living. Lava flows shift without warning, and the golems... they guard something ancient."}],choices:[{text:"We'll find a way through.",outcome:"enter"},{text:"What do they guard?",outcome:"ask"}],outcomes:{enter:{text:"He shakes his head slowly but does not stop you."},ask:{text:"A rift — older than the kingdom itself. It pulses with heat that no natural flame could produce."}}},rift_access:{id:"rift_access",npcName:"Dying Warden",npcPortrait:null,lines:[{speaker:"npc",text:"The rift... is just ahead. I tried to seal it, but the power was too great. You must succeed where I failed."}],choices:[{text:"We will end this.",outcome:"enter"}],outcomes:{enter:{text:'He slumps against the wall. "Go... quickly..."'}}},breach_gate:{id:"breach_gate",npcName:"Veil Watcher",npcPortrait:null,lines:[{speaker:"npc",text:"The Breach widens with every passing hour. Demons pour through — endless, relentless. This is the front line."}],choices:[{text:"We'll hold the line.",outcome:"enter"},{text:"How do we close it?",outcome:"ask"}],outcomes:{enter:{text:'She grips her blade tighter. "Then fight well."'},ask:{text:"Find the Void Altar deep within. Destroy it, and the breach should collapse."}}},void_altar:{id:"void_altar",npcName:"Echoing Voice",npcPortrait:null,lines:[{speaker:"npc",text:"You stand before the Void Altar. Reality warps around it — colors bleed, sound distorts. Power radiates from its core."}],choices:[{text:"Destroy the altar.",outcome:"destroy"},{text:"Study it first.",outcome:"study"}],outcomes:{destroy:{text:"You raise your weapon. The altar screams as the first blow lands."},study:{text:"Ancient runes cover its surface. This altar is a conduit — it channels power from somewhere far deeper."}}},core_enter:{id:"core_enter",npcName:"Spirit of the Veil",npcPortrait:null,lines:[{speaker:"npc",text:"You have reached the Core. Beyond this point, the veil between worlds is thinnest. The Sovereign waits within."}],choices:[{text:"We end this now.",outcome:"enter"}],outcomes:{enter:{text:"The spirit fades. The path ahead glows with terrible light."}}},ancient_seal:{id:"ancient_seal",npcName:"Ancient Seal",npcPortrait:null,lines:[{speaker:"npc",text:"The seal pulses weakly. Whatever power held this barrier is nearly spent. Beyond it, you sense an immense presence."}],choices:[{text:"Break the seal.",outcome:"break"}],outcomes:{break:{text:"The seal shatters with a sound like thunder. The way to the Sovereign is open."}}},rift_entry:{id:"rift_entry",npcName:"Void Echo",npcPortrait:null,lines:[{speaker:"npc",text:"Reality itself unravels here. The stars are wrong. The ground shifts beneath your feet. This is the edge of everything."}],choices:[{text:"We've come too far to turn back.",outcome:"enter"}],outcomes:{enter:{text:"The echo fades into silence. Only the void remains."}}},prophet_sanctum:{id:"prophet_sanctum",npcName:"Void Prophet",npcPortrait:null,lines:[{speaker:"npc",text:"You dare enter my sanctum? I have seen the end of all things. I have walked between stars. You are nothing."}],choices:[{text:"Your reign ends here.",outcome:"fight"},{text:"[INT 16] Challenge his prophecy.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"doubt",fail:"fight"}}],outcomes:{fight:{text:'He laughs — a sound like breaking glass. "Then come."',startCombat:!0},doubt:{text:'His eyes widen. "You... you see it too. The flaw in the pattern." His power wavers momentarily.'}}},void_gates:{id:"void_gates",npcName:"Gate Guardian",npcPortrait:null,lines:[{speaker:"npc",text:"The Gates of the Void stand open. Beyond them lies the true darkness — the source of everything that has plagued your world."}],choices:[{text:"We enter the void.",outcome:"enter"}],outcomes:{enter:{text:"The gates swing wide. Cold, absolute darkness swallows you whole."}}}};class Le{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._charIdx=0,this._pending={},this._pointsLeft=0}onEnter(){this._build()}_getMembersWithPoints(){return m.get().party.filter(t=>(t.pendingAttrPoints||0)>0)}_build(){C("levelup-styles",Ae),this._el=w("div","levelup-screen"),this.manager.uiOverlay.appendChild(this._el);const e=this._getMembersWithPoints();if(!e.length){this.manager.pop();return}this._loadMember(e[0]),this._render(e)}_loadMember(e){this._pending={STR:0,DEX:0,INT:0,CON:0},this._pointsLeft=e.pendingAttrPoints||0,this._currentMember=e}_render(e){var a;e||(e=this._getMembersWithPoints());const t=this._currentMember;this._el.innerHTML=`
      <div class="lu-backdrop"></div>
      <div class="lu-panel">
        <div class="lu-header">
          <div class="lu-badge">LEVEL UP</div>
          <div class="lu-name">${t.name}</div>
          <div class="lu-level">Reached Level ${t.level}</div>
        </div>

        <div class="lu-points-banner">
          <span class="lu-pts-num" id="lu-pts">${this._pointsLeft}</span>
          <span class="lu-pts-label">Attribute Points Remaining</span>
        </div>

        <div class="lu-attrs" id="lu-attrs">
          ${["STR","DEX","INT","CON"].map(s=>this._attrRow(s,t)).join("")}
        </div>

        <div class="lu-preview">
          <div class="lu-prev-title">Stat Preview</div>
          <div class="lu-prev-grid" id="lu-prev-grid">
            ${this._previewStats(t)}
          </div>
        </div>

        <button class="lu-confirm" id="lu-confirm" ${this._pointsLeft>0?"disabled":""}>
          ${this._pointsLeft>0?`Spend All Points (${this._pointsLeft} left)`:"Confirm"}
        </button>
      </div>
    `,["STR","DEX","INT","CON"].forEach(s=>{var i,o;(i=this._el.querySelector(`#lu-plus-${s}`))==null||i.addEventListener("click",()=>this._addPoint(s)),(o=this._el.querySelector(`#lu-minus-${s}`))==null||o.addEventListener("click",()=>this._removePoint(s))}),(a=this._el.querySelector("#lu-confirm"))==null||a.addEventListener("click",()=>{this._pointsLeft>0||(this.audio.playSfx("click"),this._applyPoints())})}_attrRow(e,t){var r;const a={STR:"Strength",DEX:"Dexterity",INT:"Intellect",CON:"Constitution"},s={STR:"⚔",DEX:"🏃",INT:"✦",CON:"🛡"},i=((r=t.attrs)==null?void 0:r[e])||8,o=this._pending[e]||0;return`
      <div class="lu-attr-row">
        <div class="lu-attr-icon">${s[e]}</div>
        <div class="lu-attr-info">
          <div class="lu-attr-name">${a[e]}</div>
          <div class="lu-attr-sub">${e}</div>
        </div>
        <div class="lu-attr-controls">
          <button class="lu-pm minus" id="lu-minus-${e}" ${o===0?"disabled":""}>−</button>
          <div class="lu-attr-val">
            <span class="lu-base">${i}</span>
            ${o>0?`<span class="lu-added">+${o}</span>`:""}
          </div>
          <button class="lu-pm plus" id="lu-plus-${e}" ${this._pointsLeft===0?"disabled":""}>+</button>
        </div>
      </div>
    `}_addPoint(e){this._pointsLeft<=0||(this._pending[e]++,this._pointsLeft--,this.audio.playSfx("click"),this._refreshAttrs())}_removePoint(e){this._pending[e]<=0||(this._pending[e]--,this._pointsLeft++,this.audio.playSfx("click"),this._refreshAttrs())}_refreshAttrs(){var o,r,l,c;const e=this._currentMember,t=(o=this._el)==null?void 0:o.querySelector("#lu-attrs");t&&(t.innerHTML=["STR","DEX","INT","CON"].map(h=>this._attrRow(h,e)).join("")),["STR","DEX","INT","CON"].forEach(h=>{var d,u;(d=this._el.querySelector(`#lu-plus-${h}`))==null||d.addEventListener("click",()=>this._addPoint(h)),(u=this._el.querySelector(`#lu-minus-${h}`))==null||u.addEventListener("click",()=>this._removePoint(h))});const a=(r=this._el)==null?void 0:r.querySelector("#lu-pts");a&&(a.textContent=this._pointsLeft);const s=(l=this._el)==null?void 0:l.querySelector("#lu-prev-grid");s&&(s.innerHTML=this._previewStats(e));const i=(c=this._el)==null?void 0:c.querySelector("#lu-confirm");i&&(i.disabled=this._pointsLeft>0,i.textContent=this._pointsLeft>0?`Spend All Points (${this._pointsLeft} left)`:"Confirm")}_previewStats(e){const t=e.attrs||{},a=this._pending,s=(t.STR||8)+(a.STR||0),i=(t.DEX||8)+(a.DEX||0),o=(t.INT||8)+(a.INT||0),l=50+((t.CON||8)+(a.CON||0))*10,c=30+o*8,h=Math.min(95,70+Math.round(i*1.2)),d=Math.min(40,5+Math.round(i*.8)),u=Math.round(s*1.5);return[{label:"Max HP",val:l},{label:"Max MP",val:c},{label:"Hit%",val:`${h}%`},{label:"Dodge%",val:`${d}%`},{label:"Melee Dmg",val:`+${u}`}].map(f=>`
      <div class="lu-prev-stat">
        <span class="lu-prev-label">${f.label}</span>
        <span class="lu-prev-val">${f.val}</span>
      </div>
    `).join("")}_applyPoints(){const e=this._currentMember;for(const[a,s]of Object.entries(this._pending))e.attrs[a]=(e.attrs[a]||8)+s;e.pendingAttrPoints=0,e.maxHp=50+e.attrs.CON*10,e.maxMp=30+e.attrs.INT*8,e.hp=e.maxHp,e.mp=e.maxMp;const t=this._getMembersWithPoints();t.length>0?(this._loadMember(t[0]),this._render()):this.manager.pop()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const Ae=`
.levelup-screen {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.lu-backdrop {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(232,160,32,0.06) 0%, rgba(5,2,8,0.97) 70%);
}
.lu-panel {
  position: relative; z-index: 2; width: 100%; max-width: 400px;
  padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;
}
.lu-header { text-align: center; }
.lu-badge {
  display: inline-block; padding: 0.2rem 0.8rem; border-radius: 4px;
  background: rgba(232,160,32,0.15); border: 1px solid rgba(232,160,32,0.4);
  font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em; color: #e8a020;
  margin-bottom: 0.5rem;
}
.lu-name { font-family: 'Cinzel', serif; font-size: 1.3rem; font-weight: 700; color: #f0e8d8; }
.lu-level { font-size: 0.78rem; color: #8a7a6a; margin-top: 0.2rem; }
.lu-points-banner {
  display: flex; align-items: center; gap: 0.75rem; justify-content: center;
  background: rgba(232,160,32,0.08); border: 1px solid rgba(232,160,32,0.25);
  border-radius: 8px; padding: 0.75rem;
}
.lu-pts-num { font-family: 'Cinzel', serif; font-size: 2rem; font-weight: 700; color: #e8a020; line-height: 1; }
.lu-pts-label { font-size: 0.75rem; color: #8a7a6a; }
.lu-attrs { display: flex; flex-direction: column; gap: 0.5rem; }
.lu-attr-row {
  display: flex; align-items: center; gap: 0.75rem;
  background: rgba(20,14,18,0.8); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px; padding: 0.65rem 0.75rem;
}
.lu-attr-icon { font-size: 1.1rem; min-width: 24px; text-align: center; }
.lu-attr-info { flex: 1; }
.lu-attr-name { font-size: 0.8rem; font-weight: 600; color: #e8e0d0; }
.lu-attr-sub { font-size: 0.62rem; color: #6a5a52; letter-spacing: 0.1em; }
.lu-attr-controls { display: flex; align-items: center; gap: 0.5rem; }
.lu-pm {
  width: 28px; height: 28px; border-radius: 6px; border: 1px solid rgba(232,160,32,0.3);
  background: rgba(232,160,32,0.08); color: #e8a020; font-size: 1rem; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.12s;
}
.lu-pm:hover:not(:disabled) { background: rgba(232,160,32,0.2); }
.lu-pm:disabled { opacity: 0.25; cursor: default; }
.lu-attr-val { min-width: 44px; text-align: center; font-size: 0.95rem; font-weight: 600; }
.lu-base { color: #f0e8d8; }
.lu-added { color: #e8a020; font-size: 0.8rem; }
.lu-preview {
  background: rgba(10,6,12,0.7); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px; padding: 0.85rem;
}
.lu-prev-title { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #6a5a52; margin-bottom: 0.6rem; }
.lu-prev-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem; }
.lu-prev-stat { display: flex; justify-content: space-between; align-items: center; }
.lu-prev-label { font-size: 0.72rem; color: #8a7a6a; }
.lu-prev-val { font-size: 0.78rem; font-weight: 600; color: #e8e0d0; }
.lu-confirm {
  padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(232,160,32,0.4);
  background: rgba(232,160,32,0.12); color: #e8a020; font-size: 0.85rem; font-weight: 600;
  cursor: pointer; font-family: 'Cinzel', serif; letter-spacing: 0.05em;
  transition: background 0.15s;
}
.lu-confirm:hover:not(:disabled) { background: rgba(232,160,32,0.22); }
.lu-confirm:disabled { opacity: 0.4; cursor: default; }
`,ae=[0,100,250,450,700,1e3,1400,1900,2500,3200,4e3,5e3,6200,7600,9200,11e3,13200,15800,18800,22300];function ze(n){for(let e=ae.length;e>=1;e--)if(n>=ae[e-1])return e;return 1}function Ie(n){const e=ze(n.xp||0);return e>(n.level||1)&&e<=20?(n.level=e,n.pendingAttrPoints=(n.pendingAttrPoints||0)+2,n.maxHp=50+n.attrs.CON*10,n.maxMp=30+n.attrs.INT*8,n.hp=n.maxHp,n.mp=n.maxMp,!0):!1}function qe(n,e){const t=[];for(const a of n)a.xp=(a.xp||0)+e,Ie(a)&&t.push({name:a.name,level:a.level});return t}const He={low:.7,medium:1,high:1.2,elite:1.4,exotic:1.6},Pe={normal:0,magic:[1,2],rare:[3,4],legendary:[4,6]},A={normal:"#c8c8c8",magic:"#6080ff",rare:"#e8d020",legendary:"#ff8020"},Re={dagger:{name:"Dagger",type:"weapon",subtype:"dagger",dmg:[3,7],speed:1.2,twoHanded:!1,statScaling:"dex",armorPen:.1},sword:{name:"Sword",type:"weapon",subtype:"sword",dmg:[6,14],speed:1,twoHanded:!1,statScaling:"str_dex"},wand:{name:"Wand",type:"weapon",subtype:"wand",dmg:[4,10],speed:1.1,twoHanded:!1,statScaling:"int",offHandOk:!0},scepter:{name:"Scepter",type:"weapon",subtype:"scepter",dmg:[5,12],speed:1,twoHanded:!1,statScaling:"int",offHandOk:!0},staff:{name:"Staff",type:"weapon",subtype:"staff",dmg:[8,20],speed:.9,twoHanded:!0,statScaling:"int",intMult:1.5},hammer:{name:"Hammer",type:"weapon",subtype:"hammer",dmg:[8,16],speed:.8,twoHanded:!1,statScaling:"str",stunChance:.1},sword2h:{name:"Greatsword",type:"weapon",subtype:"sword2h",dmg:[14,28],speed:.7,twoHanded:!0,statScaling:"str",strMult:1.5},axe2h:{name:"Greataxe",type:"weapon",subtype:"axe2h",dmg:[16,30],speed:.65,twoHanded:!0,statScaling:"str",bleedChance:.15},bow:{name:"Bow",type:"weapon",subtype:"bow",dmg:[8,16],speed:1,twoHanded:!0,statScaling:"dex",dexMult:1.3,ranged:!0},crossbow:{name:"Crossbow",type:"weapon",subtype:"crossbow",dmg:[12,22],speed:.7,twoHanded:!0,statScaling:"dex_str",ranged:!0},javelin:{name:"Javelin",type:"weapon",subtype:"javelin",dmg:[9,18],speed:.9,twoHanded:!1,statScaling:"str_dex",ranged:!0,throwable:!0}},Ne={cloth_helm:{name:"Hood",type:"armor",slot:"head",tier:"cloth",armor:1,dodgeBonus:0},light_helm:{name:"Leather Cap",type:"armor",slot:"head",tier:"light",armor:3,dodgeBonus:0},medium_helm:{name:"Chain Coif",type:"armor",slot:"head",tier:"medium",armor:5,dodgeBonus:-1},heavy_helm:{name:"War Helm",type:"armor",slot:"head",tier:"heavy",armor:8,dodgeBonus:-2},cloth_chest:{name:"Robes",type:"armor",slot:"chest",tier:"cloth",armor:2,dodgeBonus:0},light_chest:{name:"Leather Armor",type:"armor",slot:"chest",tier:"light",armor:6,dodgeBonus:0},medium_chest:{name:"Chain Shirt",type:"armor",slot:"chest",tier:"medium",armor:10,dodgeBonus:-2},heavy_chest:{name:"Plate Armor",type:"armor",slot:"chest",tier:"heavy",armor:16,dodgeBonus:-4},cloth_legs:{name:"Linen Leggings",type:"armor",slot:"legs",tier:"cloth",armor:1,dodgeBonus:0},light_legs:{name:"Leather Legs",type:"armor",slot:"legs",tier:"light",armor:4,dodgeBonus:0},medium_legs:{name:"Chain Legs",type:"armor",slot:"legs",tier:"medium",armor:7,dodgeBonus:-1},heavy_legs:{name:"Plate Legs",type:"armor",slot:"legs",tier:"heavy",armor:11,dodgeBonus:-3},shield:{name:"Shield",type:"armor",slot:"offhand",tier:"heavy",armor:5,dodgeBonus:5,blockChance:.2},ring:{name:"Ring",type:"accessory",slot:"ring",tier:"any",armor:0},necklace:{name:"Necklace",type:"accessory",slot:"necklace",tier:"any",armor:0}},Be={prefixes:[{id:"of_str",name:"Sturdy",stat:"str",min:1,max:4},{id:"of_dex",name:"Swift",stat:"dex",min:1,max:4},{id:"of_int",name:"Wise",stat:"int",min:1,max:4},{id:"of_con",name:"Hardy",stat:"con",min:1,max:4},{id:"sharp",name:"Sharp",stat:"dmg",min:1,max:3},{id:"sturdy",name:"Reinforced",stat:"armor",min:1,max:3},{id:"burning",name:"Burning",stat:"burnChance",min:.05,max:.15},{id:"bleeding",name:"Serrated",stat:"bleedChance",min:.05,max:.15}],suffixes:[{id:"of_hp",name:"of Vitality",stat:"hp",min:5,max:20},{id:"of_mp",name:"of Focus",stat:"mp",min:5,max:15},{id:"of_hit",name:"of Accuracy",stat:"hit",min:2,max:8},{id:"of_dodge",name:"of Evasion",stat:"dodge",min:2,max:6},{id:"of_speed",name:"of Haste",stat:"initiative",min:1,max:3},{id:"of_gold",name:"of Fortune",stat:"goldFind",min:.05,max:.2}]};function $(n,e="normal",t="medium",a=Be){const s=Re[n]||Ne[n];if(!s)return null;const i=He[t],o={id:crypto.randomUUID(),baseKey:n,name:s.name,type:s.type,subtype:s.subtype||s.slot,slot:s.slot||"weapon",twoHanded:!!s.twoHanded,offHandOk:!!s.offHandOk,rarity:e,quality:t,affixes:[]};s.dmg&&(o.dmg=[Math.round(s.dmg[0]*i),Math.round(s.dmg[1]*i)]),s.armor!==void 0&&(o.armor=Math.round(s.armor*i));const r=Pe[e];if(r){const[l,c]=Array.isArray(r)?r:[r,r],h=l+Math.floor(Math.random()*(c-l+1)),d=[...a.prefixes,...a.suffixes],u=[];for(let p=0;p<h&&d.length>u.length;p++){let b,k=0;do b=d[Math.floor(Math.random()*d.length)],k++;while(u.find(_=>_.id===b.id)&&k<20);if(!u.find(_=>_.id===b.id)){const _=+(b.min+Math.random()*(b.max-b.min)).toFixed(2);u.push({...b,value:_})}}o.affixes=u;const f=u.find(p=>a.prefixes.find(b=>b.id===p.id)),g=u.find(p=>a.suffixes.find(b=>b.id===p.id));f&&(o.name=`${f.name} ${o.name}`),g&&(o.name=`${o.name} ${g.name}`)}return o}function me(n){if(!n)return"";const e=s=>s.charAt(0).toUpperCase()+s.slice(1),t=s=>s.charAt(0).toUpperCase()+s.slice(1);let a=[`<strong>${n.name}</strong>`,`<span class="tt-rarity" style="color:${A[n.rarity]}">${t(n.rarity)} · ${e(n.quality)}</span>`];n.dmg&&a.push(`Damage: ${n.dmg[0]}–${n.dmg[1]}`),n.armor&&a.push(`Armor: +${n.armor}`);for(const s of n.affixes||[]){const i=typeof s.value=="number"&&s.value<1?`${Math.round(s.value*100)}%`:`+${s.value}`;a.push(`<span style="color:#90d8a8">${s.name}: ${i} ${s.stat.toUpperCase()}</span>`)}return a.join("<br>")}const Y={iron_scrap:{id:"iron_scrap",name:"Iron Scrap",icon:"🔩",desc:"Salvaged from normal weapons and armor."},magic_essence:{id:"magic_essence",name:"Magic Essence",icon:"💜",desc:"Distilled from magic items."},rare_dust:{id:"rare_dust",name:"Rare Dust",icon:"✨",desc:"Refined from rare items."},legend_core:{id:"legend_core",name:"Legendary Core",icon:"🌟",desc:"Extracted from legendary items."},void_shard:{id:"void_shard",name:"Void Shard",icon:"✦",desc:"Drops from void enemies. Used in endgame recipes."}},se={normal:{iron_scrap:[2,4]},magic:{iron_scrap:[1,2],magic_essence:[1,2]},rare:{magic_essence:[1,3],rare_dust:[1,2]},legendary:{rare_dust:[1,2],legend_core:[1,1]}},ie=[{id:"craft_magic_sword",name:"Magic Sword",materials:{iron_scrap:4,magic_essence:2},base:"sword",rarity:"magic",quality:"medium"},{id:"craft_rare_sword",name:"Rare Sword",materials:{magic_essence:4,rare_dust:2},base:"sword",rarity:"rare",quality:"high"},{id:"craft_magic_staff",name:"Magic Staff",materials:{iron_scrap:4,magic_essence:2},base:"staff",rarity:"magic",quality:"medium"},{id:"craft_rare_staff",name:"Rare Staff",materials:{magic_essence:4,rare_dust:2},base:"staff",rarity:"rare",quality:"high"},{id:"craft_magic_chest",name:"Magic Plate",materials:{iron_scrap:6,magic_essence:2},base:"heavy_chest",rarity:"magic",quality:"medium"},{id:"craft_rare_chest",name:"Rare Plate",materials:{magic_essence:4,rare_dust:3},base:"heavy_chest",rarity:"rare",quality:"high"},{id:"craft_legendary_ring",name:"Legendary Ring",materials:{rare_dust:4,legend_core:1},base:"ring",rarity:"legendary",quality:"elite"},{id:"craft_void_staff",name:"Void Staff",materials:{legend_core:2,void_shard:3},base:"staff",rarity:"legendary",quality:"exotic"},{id:"craft_void_armor",name:"Void Plate",materials:{legend_core:2,void_shard:4},base:"heavy_chest",rarity:"legendary",quality:"exotic"}];function Oe(n){const e=se[n.rarity]||se.normal,t={};for(const[a,s]of Object.entries(e)){const i=s[0]+Math.floor(Math.random()*(s[1]-s[0]+1));i>0&&(t[a]=i)}return t}function oe(n,e){for(const[t,a]of Object.entries(n.materials))if((e[t]||0)<a)return!1;return!0}function De(n,e){for(const[t,a]of Object.entries(n.materials))e[t]=(e[t]||0)-a}const P={healing_potion:{id:"healing_potion",name:"Healing Potion",icon:"🧪",type:"consumable",subtype:"potion",effect:{type:"heal",amount:40},target:"single",cost:30,desc:"Restores 40 HP to one ally."},greater_healing:{id:"greater_healing",name:"Greater Healing Potion",icon:"💊",type:"consumable",subtype:"potion",effect:{type:"heal",amount:80},target:"single",cost:65,desc:"Restores 80 HP to one ally."},mana_potion:{id:"mana_potion",name:"Mana Potion",icon:"🔵",type:"consumable",subtype:"potion",effect:{type:"mana",amount:40},target:"single",cost:35,desc:"Restores 40 MP to one ally."},revival_flask:{id:"revival_flask",name:"Revival Flask",icon:"⚗️",type:"consumable",subtype:"flask",effect:{type:"revive",amount:25},target:"single",cost:80,desc:"Revives a fallen ally with 25 HP."},group_tonic:{id:"group_tonic",name:"Group Tonic",icon:"🫙",type:"consumable",subtype:"flask",effect:{type:"heal",amount:25},target:"group",cost:90,desc:"Restores 25 HP to all living allies."},antidote:{id:"antidote",name:"Antidote",icon:"🟢",type:"consumable",subtype:"potion",effect:{type:"cleanse",statuses:["poison","bleed"]},target:"single",cost:25,desc:"Removes Poison and Bleed from one ally."},portal_scroll:{id:"portal_scroll",name:"Town Portal Scroll",icon:"✦",type:"consumable",subtype:"scroll",effect:{type:"portal"},target:"none",cost:30,desc:"Opens a portal between your current location and town."}},re=[{...P.healing_potion},{...P.greater_healing},{...P.mana_potion},{...P.revival_flask},{...P.group_tonic},{...P.antidote},{...P.portal_scroll}];function Ve(n,e){const t=n.effect,a=[];for(const s of e)if(t.type==="heal"){if(!s.alive&&t.type!=="revive")continue;const i=Math.min(s.maxHp-s.hp,t.amount);s.hp=Math.min(s.maxHp,s.hp+t.amount),a.push(`${s.name} +${i} HP`)}else if(t.type==="mana")s.mp=Math.min(s.maxMp||80,(s.mp||0)+t.amount),a.push(`${s.name} +${t.amount} MP`);else if(t.type==="revive"){if(s.alive)continue;s.alive=!0,s.hp=t.amount,s.stance="ready",a.push(`${s.name} revived!`)}else if(t.type==="cleanse"){const i=(s.statuses||[]).filter(o=>(t.statuses||[]).includes(o.type));s.statuses=(s.statuses||[]).filter(o=>!(t.statuses||[]).includes(o.type)),i.length&&a.push(`${s.name} cleansed!`)}return a.join(", ")||"No effect"}const pe={shield_bash:{name:"Shield Bash",class:"warrior",unlockLevel:1,type:"melee",aoe:"adjacent",damageStat:"str",damageMult:1.2,statusEffects:[{type:"stun",chance:.6,duration:1}],mpCost:0,description:"Strike with shield, dealing STR-based damage and applying Stun (1 round).",talents:[{id:"sb_wider",name:"Wide Arc",desc:"Hits 1-2 adjacent enemies instead of 1.",effect:{aoe:"adjacent2"}},{id:"sb_stun",name:"Extended Stun",desc:"Stun lasts 2 rounds.",effect:{stunDuration:2}}]},battle_cry:{name:"Battle Cry",class:"warrior",unlockLevel:5,type:"buff",target:"party",effect:{dmgBuff:.2,duration:3},mpCost:15,description:"Rally the party, granting +20% damage for 3 rounds.",talents:[{id:"bc_hp",name:"Inspiring Shout",desc:"Also grants 20 temporary HP to each party member.",effect:{tempHp:20}},{id:"bc_def",name:"Rallying Cry",desc:"Also reduces incoming damage by 10%.",effect:{dmgReduct:.1}}]},whirlwind:{name:"Whirlwind",class:"warrior",unlockLevel:10,type:"melee",aoe:"row",damageStat:"str",damageMult:.9,statusEffects:[],mpCost:20,description:"Spin attack hitting all adjacent enemies (up to 3).",talents:[{id:"ww_bleed",name:"Serrated Blade",desc:"Applies Bleed to all hit enemies.",effect:{bleed:{duration:3}}},{id:"ww_extra",name:"Wider Spin",desc:"Hits one additional enemy row.",effect:{aoe:"row2"}}]},unbreakable:{name:"Unbreakable",class:"warrior",unlockLevel:15,type:"buff",target:"self",effect:{dmgReduct:.5,reflect:.1,duration:2},mpCost:25,description:"Enter defensive stance for 2 rounds: take 50% less damage, reflect 10% back.",talents:[{id:"ub_reflect",name:"Thorns",desc:"Reflect increases to 25%.",effect:{reflect:.25}},{id:"ub_dur",name:"Iron Will",desc:"Duration extends to 3 rounds.",effect:{duration:3}}]},holy_strike:{name:"Holy Strike",class:"paladin",unlockLevel:1,type:"melee",aoe:"single",damageStat:"str_int",damageMult:1.1,bonusVsUndead:2,bonusVsDemon:2,mpCost:5,description:"Blessed melee blow dealing STR+INT damage. Double vs undead/demons.",talents:[{id:"hs_burn",name:"Holy Fire",desc:"Applies Burn to undead targets.",effect:{burnVsUndead:!0}},{id:"hs_splash",name:"Divine Splash",desc:"Small AoE splash to adjacent target.",effect:{aoe:"adjacent"}}]},lay_on_hands:{name:"Lay on Hands",class:"paladin",unlockLevel:5,type:"heal",target:"ally",healStat:"int",healMult:2,mpCost:20,description:"Instantly restore HP to one ally equal to 2× INT.",talents:[{id:"loh_cleanse",name:"Purify",desc:"Also removes one status effect.",effect:{cleanse:1}},{id:"loh_free",name:"Free Action",desc:"Can target self without consuming turn.",effect:{selfFree:!0}}]},divine_shield:{name:"Divine Shield",class:"paladin",unlockLevel:10,type:"buff",target:"ally",effect:{shield:{conMult:3,duration:2}},mpCost:25,description:"Surround one ally with a barrier absorbing 3× CON damage for 2 rounds.",talents:[{id:"ds_reflect",name:"Holy Aegis",desc:"Reflect absorbed damage.",effect:{reflect:.3}},{id:"ds_double",name:"Twin Shield",desc:"Extend to 2 targets.",effect:{targets:2}}]},consecration:{name:"Consecration",class:"paladin",unlockLevel:15,type:"zone",target:"all_enemies",damageStat:"int",damageMult:.6,healStat:"int",healMult:.4,duration:3,mpCost:35,description:"Sanctify the ground: damages all enemies and heals party for 3 rounds.",talents:[{id:"con_slow",name:"Sacred Ground",desc:"Also slows all enemies.",effect:{slow:{duration:2}}},{id:"con_heal",name:"Holy Renewal",desc:"Increases heal amount by 50%.",effect:{healMult:.6}}]},magic_missile:{name:"Magic Missile",class:"mage",unlockLevel:1,type:"magic",aoe:"random3",damageStat:"int",damageMult:.5,mpCost:8,description:"Launch 3 arcane bolts, each hitting a random enemy for INT damage.",talents:[{id:"mm_5bolts",name:"Missile Barrage",desc:"5 bolts instead of 3.",effect:{bolts:5}},{id:"mm_stun",name:"Concussive Bolts",desc:"Chance to Stun target.",effect:{stunChance:.2}}]},fireball:{name:"Fireball",class:"mage",unlockLevel:5,type:"magic",aoe:"group",damageStat:"int",damageMult:1.4,statusEffects:[{type:"burn",chance:.8,duration:3}],mpCost:18,description:"Explosive fireball hitting one enemy group with fire damage and Burn.",talents:[{id:"fb_wider",name:"Inferno",desc:"Blast radius includes adjacent group.",effect:{aoe:"group2"}},{id:"fb_burn",name:"Scorching",desc:"Burn damage increased by 50%.",effect:{burnMult:1.5}}]},blizzard:{name:"Blizzard",class:"mage",unlockLevel:10,type:"magic",aoe:"all",damageStat:"int",damageMult:.7,duration:3,statusEffects:[{type:"slow",chance:1,duration:2}],mpCost:30,description:"Ice storm blanketing all enemies for 3 rounds, dealing cold damage and Slow.",talents:[{id:"bz_freeze",name:"Deep Freeze",desc:"Chance to Freeze (Stun) targets.",effect:{freezeChance:.25}},{id:"bz_dmg",name:"Arctic Gale",desc:"Damage increases each round.",effect:{dmgScaling:.2}}]},arcane_surge:{name:"Arcane Surge",class:"mage",unlockLevel:15,type:"magic",aoe:"single_overflow",damageStat:"int",damageMult:4,mpCost:40,description:"400% INT damage to single target with overflow to adjacent enemies.",talents:[{id:"as_cd",name:"Wild Surge",desc:"Reduce mana cost by 15.",effect:{mpCost:-15}},{id:"as_pen",name:"Arcane Pierce",desc:"Ignore magic resistance.",effect:{ignoreMR:!0}}]},bone_spike:{name:"Bone Spike",class:"necromancer",unlockLevel:1,type:"magic",aoe:"pierce_row",damageStat:"int",damageMult:.9,statusEffects:[{type:"bleed",chance:.5,duration:3}],mpCost:8,description:"Bone projectile dealing INT damage and applying Bleed, pierces target row.",talents:[{id:"bs_pierce",name:"Ossified Lance",desc:"Pierces entire enemy row.",effect:{aoe:"row"}},{id:"bs_extra",name:"Double Spike",desc:"Extra spike on crit.",effect:{critExtra:!0}}]},raise_dead:{name:"Raise Dead",class:"necromancer",unlockLevel:5,type:"summon",target:"corpse",summonType:"skeleton",mpCost:25,description:"Reanimate one fallen enemy corpse as a skeleton ally (fills open companion slot).",talents:[{id:"rd_hp",name:"Fortified Bones",desc:"Raised skeleton has +50% HP.",effect:{hpMult:1.5}},{id:"rd_two",name:"Army of Dead",desc:"Can raise two corpses at once.",effect:{raiseTwoCorpses:!0}}]},life_drain:{name:"Life Drain",class:"necromancer",unlockLevel:10,type:"magic",aoe:"single",damageStat:"int",damageMult:1.2,lifesteal:.5,mpCost:20,description:"Drain life from target dealing INT damage, healing Necromancer for 50%.",talents:[{id:"ld_chain",name:"Chain Drain",desc:"Also chains to a second nearby target.",effect:{chainCount:2}},{id:"ld_buff",name:"Soul Siphon",desc:"Also drains one buff from target.",effect:{drainBuff:!0}}]},death_coil:{name:"Death Coil",class:"necromancer",unlockLevel:15,type:"magic",aoe:"all",damageStat:"int",damageMult:.8,statusEffects:[{type:"poison",chance:.9,duration:4},{type:"bleed",chance:.9,duration:3}],mpCost:35,description:"Necrotic wave hitting all enemies, applying both Poison and Bleed.",talents:[{id:"dc_con",name:"Withering",desc:"Lowers enemy CON saves for 2 rounds.",effect:{conDebuff:3,conDebuffDur:2}},{id:"dc_heal",name:"Feast on Death",desc:"Heals party on each kill while active.",effect:{healOnKill:.1}}]},flame_lance:{name:"Flame Lance",class:"pyromancer",unlockLevel:1,type:"magic",aoe:"single",damageStat:"int",damageMult:1,statusEffects:[{type:"burn",chance:.9,duration:3}],mpCost:8,description:"Fire bolt dealing INT damage and applying Burn (3-round DoT).",talents:[{id:"fl_dur",name:"Sustained Flame",desc:"Burn lasts 5 rounds.",effect:{burnDuration:5}},{id:"fl_spread",name:"Spreading Fire",desc:"Burn spreads to adjacent enemy.",effect:{burnSpread:!0}}]},ignite:{name:"Ignite",class:"pyromancer",unlockLevel:5,type:"zone",aoe:"group",damageStat:"int",damageMult:.6,duration:3,statusEffects:[{type:"burn",chance:1,duration:3,stacksEachRound:!0}],mpCost:18,description:"Set ground ablaze under one group, persisting 3 rounds with stacking Burn.",talents:[{id:"ig_spread",name:"Wildfire",desc:"Fire spreads to adjacent group.",effect:{spreadToAdjacentGroup:!0}},{id:"ig_stack",name:"Inferno Stack",desc:"Faster Burn stacking rate.",effect:{burnStackRate:1.5}}]},pyroclasm:{name:"Pyroclasm",class:"pyromancer",unlockLevel:10,type:"magic",aoe:"chain3",damageStat:"int",damageMult:.9,statusEffects:[{type:"burn",chance:.8,duration:3}],mpCost:25,description:"Chain fire explosion: each target triggers a secondary blast on nearest enemy, up to 3.",talents:[{id:"py_chain4",name:"Pyroclastic Wave",desc:"Chain length increases to 4.",effect:{chainCount:4}},{id:"py_scale",name:"Amplify",desc:"Each chain explosion is larger.",effect:{chainDmgScale:1.2}}]},meteor:{name:"Meteor",class:"pyromancer",unlockLevel:15,type:"magic",aoe:"all",damageStat:"int",damageMult:2.5,statusEffects:[{type:"burn",chance:1,duration:5,maxStacks:!0}],mpCost:45,description:"Devastating meteor hitting all enemies with maximum Burn stacks and Ignite zones.",talents:[{id:"me_split",name:"Twin Meteor",desc:"Meteor splits into two on impact.",effect:{split:2}},{id:"me_resist",name:"Smelting Fire",desc:"Enemy fire resistance reduced 50% for 3 rounds.",effect:{fireResistDebuff:.5,duration:3}}]},aimed_shot:{name:"Aimed Shot",class:"ranger",unlockLevel:1,type:"ranged",aoe:"single",damageStat:"dex",damageMult:1.5,armorPen:1,mpCost:5,description:"Focused ranged attack dealing 150% DEX damage. Can pierce armor via talent.",talents:[{id:"as_pen",name:"Armor Pierce",desc:"Ignores target armor.",effect:{armorPen:1}},{id:"as_bleed",name:"Barbed Arrow",desc:"Chance to Bleed.",effect:{bleedChance:.4}}]},multi_shot:{name:"Multi-Shot",class:"ranger",unlockLevel:5,type:"ranged",aoe:"multi3",damageStat:"dex",damageMult:.8,mpCost:15,description:"Fire at 3 separate targets simultaneously, each at 80% DEX damage.",talents:[{id:"ms_4",name:"Quiver Mastery",desc:"Fourth target added.",effect:{targets:4}},{id:"ms_b",name:"Bleeding Volley",desc:"Applies Bleed to all targets.",effect:{bleedChance:.5}}]},smoke_trap:{name:"Smoke Trap",class:"ranger",unlockLevel:10,type:"trap",aoe:"group",statusEffects:[{type:"blind",chance:1,duration:2}],mpCost:20,description:"Plant a trap that Blinds (−50% hit chance) one enemy group for 2 rounds.",talents:[{id:"st_slow",name:"Choking Smoke",desc:"Also applies Slow.",effect:{slow:{duration:2}}},{id:"st_2",name:"Double Trap",desc:"Place 2 traps simultaneously.",effect:{trapCount:2}}]},rain_of_arrows:{name:"Rain of Arrows",class:"ranger",unlockLevel:15,type:"ranged",aoe:"all",damageStat:"dex",damageMult:.5,duration:3,mpCost:30,description:"Volley descending on all enemies for 3 rounds, each dealing DEX damage.",talents:[{id:"roa_bleed",name:"Serrated Arrows",desc:"Applies stacking Bleed.",effect:{bleedStack:!0}},{id:"roa_dur",name:"Endless Rain",desc:"Duration extends to 4 rounds.",effect:{duration:4}}]},backstab:{name:"Backstab",class:"rogue",unlockLevel:1,type:"melee",aoe:"single",damageStat:"dex",damageMult:2,mpCost:5,description:"200% DEX damage. Bonus if target is Stunned or Bleeding.",talents:[]},poison_blade:{name:"Poison Blade",class:"rogue",unlockLevel:5,type:"buff",aoe:"single",damageStat:"dex",damageMult:.5,mpCost:10,description:"Next 3 attacks apply Poison DoT.",talents:[]},shadow_step:{name:"Shadow Step",class:"rogue",unlockLevel:10,type:"melee",aoe:"single",damageStat:"dex",damageMult:1.5,mpCost:20,description:"Teleport behind target and attack for 150% DEX.",talents:[]},death_mark:{name:"Death Mark",class:"rogue",unlockLevel:15,type:"debuff",aoe:"single",mpCost:25,description:"Marked target takes 50% more damage from all sources for 3 rounds.",talents:[]},heal:{name:"Heal",class:"cleric",unlockLevel:1,type:"heal",target:"ally",healStat:"int",healMult:2.5,mpCost:15,description:"Restore HP to one ally equal to 2.5× INT.",talents:[]},smite:{name:"Smite",class:"cleric",unlockLevel:5,type:"magic",aoe:"single",damageStat:"int",damageMult:1.3,mpCost:15,description:"Holy bolt, double damage vs undead/demons.",talents:[]},sanctuary:{name:"Sanctuary",class:"cleric",unlockLevel:10,type:"buff",target:"ally",mpCost:25,description:"Ally regenerates HP each round and cannot be targeted for 3 rounds.",talents:[]},mass_resurrection:{name:"Mass Resurrection",class:"cleric",unlockLevel:15,type:"passive",mpCost:0,description:"40% chance to auto-revive fallen allies at 30% HP when party wipes.",talents:[]},inspiring_tune:{name:"Inspiring Tune",class:"bard",unlockLevel:1,type:"buff",target:"party",mpCost:10,description:"+15% hit and +1 initiative for party for 3 rounds.",talents:[]},discordant_wail:{name:"Discordant Wail",class:"bard",unlockLevel:5,type:"debuff",aoe:"group",mpCost:15,description:"−30% damage and erratic targeting for one enemy group.",talents:[]},ballad_of_valor:{name:"Ballad of Valor",class:"bard",unlockLevel:10,type:"buff",target:"ally",mpCost:25,description:"One hero gets double actions for 1 round.",talents:[]},song_of_ruin:{name:"Song of Ruin",class:"bard",unlockLevel:15,type:"magic",aoe:"all",mpCost:35,description:"Sonic damage to all enemies, removes all their buffs.",talents:[]},corruption:{name:"Corruption",class:"warlock",unlockLevel:1,type:"magic",aoe:"single",damageStat:"int",damageMult:.6,mpCost:8,description:"Target takes INT damage per round for 4 rounds; spreads on death.",talents:[]},hellfire:{name:"Hellfire",class:"warlock",unlockLevel:5,type:"magic",aoe:"group",damageStat:"int",damageMult:1.3,mpCost:18,description:"Hellfire hits enemy group, applies Burn. Bypasses fire resistance.",talents:[]},soul_pact:{name:"Soul Pact",class:"warlock",unlockLevel:10,type:"buff",target:"self",mpCost:0,description:"Sacrifice 20% own HP to double all active DoT duration and damage.",talents:[]},void_rift:{name:"Void Rift",class:"warlock",unlockLevel:15,type:"zone",aoe:"all",damageStat:"int",damageMult:.7,duration:3,mpCost:35,description:"Void rift under enemies for 3 rounds: damage + 20% stun chance each round.",talents:[]},demon_bolt:{name:"Demon Bolt",class:"demon_hunter",unlockLevel:1,type:"ranged",aoe:"single",damageStat:"dex_int",damageMult:1,bonusVsDemon:1.5,mpCost:8,description:"+50% vs demons. DEX+INT damage.",talents:[]},glaive_toss:{name:"Glaive Toss",class:"demon_hunter",unlockLevel:5,type:"ranged",aoe:"row",damageStat:"dex",damageMult:.9,mpCost:15,description:"Spinning glaive hits all enemies in a row, applying Bleed.",talents:[]},fel_sight:{name:"Fel Sight",class:"demon_hunter",unlockLevel:10,type:"buff",target:"self",mpCost:20,description:"+25% hit/dodge, immune to Blind/Confuse for 3 rounds.",talents:[]},vengeance:{name:"Vengeance",class:"demon_hunter",unlockLevel:15,type:"melee",aoe:"single",damageStat:"dex",damageMult:1,stackBonusPerDeath:.15,mpCost:20,description:"Stacks 15% damage per fallen ally. Release all stacks in one strike.",talents:[]},scrounge:{name:"Scrounge",class:"scavenger",unlockLevel:1,type:"utility",mpCost:0,description:"60% chance to find a consumable item mid-combat.",talents:[]},thrown_junk:{name:"Thrown Junk",class:"scavenger",unlockLevel:5,type:"ranged",aoe:"group",damageStat:"dex",damageMult:.7,mpCost:5,description:"Hurl debris at an enemy group; 30% stun chance.",talents:[]},makeshift_bomb:{name:"Makeshift Bomb",class:"scavenger",unlockLevel:10,type:"ranged",aoe:"group",damageStat:"dex_con",damageMult:1,mpCost:15,description:"Improvised explosive: DEX+CON damage with Burn to a group.",talents:[]},jackpot:{name:"Jackpot",class:"scavenger",unlockLevel:15,type:"passive",mpCost:0,description:"20% chance to instantly loot a Magic+ item from each kill.",talents:[]},riposte:{name:"Riposte",class:"swashbuckler",unlockLevel:1,type:"counter",mpCost:0,description:"Enter parry stance: counter next melee hit for 200% DEX damage.",talents:[]},flourish:{name:"Flourish",class:"swashbuckler",unlockLevel:5,type:"melee",aoe:"single",damageStat:"dex",damageMult:1,buildsFlairStacks:3,mpCost:8,description:"3 rapid strikes, each building Flair stacks for Grandeur.",talents:[]},taunt:{name:"Taunt",class:"swashbuckler",unlockLevel:10,type:"buff",target:"enemy",mpCost:15,description:"Force one enemy to target only you for 2 rounds; +30% dodge vs them.",talents:[]},grandeur:{name:"Grandeur",class:"swashbuckler",unlockLevel:15,type:"melee",aoe:"single",damageStat:"dex",consumesFlairStacks:!0,mpCost:0,description:"Consume all Flair stacks for DEX × stacks damage + random debuffs per stack.",talents:[]},dragon_claw:{name:"Dragon Claw",class:"dragon_knight",unlockLevel:1,type:"melee",aoe:"adjacent",damageStat:"str_dex",damageMult:1.1,armorPen:.2,mpCost:0,description:"Savage strike ignoring 20% armor; hits adjacent enemies.",talents:[]},breath_weapon:{name:"Breath Weapon",class:"dragon_knight",unlockLevel:5,type:"magic",aoe:"group",damageStat:"str_int",damageMult:1.3,mpCost:20,description:"Cone of fire/ice/lightning hitting one group. Choose element at class creation.",talents:[]},dragon_scales:{name:"Dragon Scales",class:"dragon_knight",unlockLevel:10,type:"buff",target:"self",mpCost:20,description:"30% damage reduction + element immunity for 3 rounds.",talents:[]},draconic_fury:{name:"Draconic Fury",class:"dragon_knight",unlockLevel:15,type:"buff",target:"self",mpCost:35,description:"All attacks become group AoE, +50% damage for 2 rounds. Cannot be Stunned.",talents:[]}};function ue(n){return Object.values(pe).filter(e=>e.class===n).sort((e,t)=>e.unlockLevel-t.unlockLevel)}function ge(n,e){return ue(n).filter(t=>t.unlockLevel<=e)}const Ge=.5,je=.18,V={warrior:"warrior",mage:"mage",paladin:"paladin",ranger:"ranger",rogue:"rogue",cleric:"cleric",bard:"bard",necromancer:"necromancer",warlock:"warlock",demon_hunter:"demon_hunter",scavenger:"scavenger",swashbuckler:"swashbuckler",dragon_knight:"dragon_knight",pyromancer:"pyromancer",goblin_scout:"goblin_scout",goblin_warrior:"goblin_warrior",goblin_shaman:"goblin_shaman",goblin_warlord:"goblin_warlord",imp:"imp",hell_knight:"hell_knight",molten_golem:"molten_golem",corrupted_wolf:"corrupted_wolf",void_shade:"void_shade",ash_wraith:"ash_wraith",corrupted_bear:"corrupted_bear",demon_brute:"demon_brute",cinder_hound:"cinder_hound",veil_cultist:"veil_cultist",bandit:"bandit",grax_veil_touched:"grax_veil_touched",lava_titan:"lava_titan"},j={};function ne(n){if(j[n])return j[n];const e={};for(const t of["south","east","north","west"]){const a=new Image;a.src=`/images/sprites/${n}_${t}.png`,e[t]=a}return j[n]=e,e}class O{constructor(e,t,a,s){this.manager=e,this.audio=t,this.encounter=s,this._el=null,this._t=0,this._turnTimer=0,this._phase="START",this._startDelay=1.2,this._preloadSprites(s),this._particles=[],this._dmgNumbers=[],this._flashMap=new Map,this._round=1,this._log=[],this._lootItems=[];const i=m.get();this._heroes=i.party.map(o=>this._memberToCombatant(o)),this._companions=i.companions.map(o=>this._memberToCombatant(o)),this._allies=[...this._heroes,...this._companions],this._enemyGroups=s.enemies.map((o,r)=>this._buildGroup(o,r)),this._allEnemies=this._enemyGroups.flat(),this._buildTurnOrder()}_memberToCombatant(e){const t=e.attrs||{STR:8,DEX:8,INT:8,CON:10},a=e.equipment||{};let s=0,i=0;for(const o of Object.values(a))o!=null&&o.armor&&(s+=o.armor),o!=null&&o.dmg&&(i+=Math.floor((o.dmg[0]+o.dmg[1])/2*.3));return{id:e.id,name:e.name,class:e.class,className:e.className,isHero:!0,hp:e.hp??50+t.CON*10,maxHp:e.maxHp??50+t.CON*10,mp:e.mp??30+t.INT*8,maxMp:e.maxMp??30+t.INT*8,dmg:[Math.max(1,Math.round(t.STR*.8+i)),Math.max(3,Math.round(t.STR*2+i*1.5))],armor:s,hit:Math.min(95,70+Math.round(t.DEX*1.2)),dodge:Math.min(40,5+Math.round(t.DEX*.8)),initiative:t.DEX+(e.level||1),alive:(e.hp??1)>0,stance:"ready",statuses:[],skillCooldown:0,x:0,y:0,offsetX:0,offsetY:0}}_buildGroup(e,t){const a=m.getNgPlus(),s=a>0?1+a*.35:1,i=Math.round(e.hp*s),o=e.dmg.map(c=>Math.round(c*s)),r=Math.round(e.armor*(1+a*.15)),l=a>0?Math.round(e.xpValue*.5*a):0;return Array.from({length:e.count},(c,h)=>({id:`${e.id}_${t}_${h}`,name:a>0?`${e.name} ✦`:e.name,enemyId:e.id,groupIdx:t,isHero:!1,hp:i,maxHp:i,dmg:o,armor:r,hit:Math.min(95,e.hit+a*3),dodge:Math.min(45,e.dodge+a*2),initiative:4+Math.random()*6,xpValue:e.xpValue+l,gold:e.gold,alive:!0,stance:"ready",statuses:[],skillCooldown:0,x:0,y:0,offsetX:0,offsetY:0}))}_buildTurnOrder(){const e=[...this._allies,...this._allEnemies].filter(t=>t.alive);e.forEach(t=>{t._roll=t.initiative+Math.random()*10}),e.sort((t,a)=>a._roll-t._roll),this._turnOrder=e,this._turnIdx=0}onEnter(){this.audio.playCombatMusic(this.encounter._zoneId),this._build()}_build(){C("combat-styles",Fe),this._el=w("div","combat-screen"),this._el.innerHTML=`
      <div class="cbt-log-panel"><div class="cbt-log-title">Combat</div><div class="cbt-log-entries" id="cbt-log"></div></div>
      <div class="cbt-hud" id="cbt-hud"></div>
    `,this.manager.uiOverlay.appendChild(this._el),this._fastMode=!1,this._renderHud(),this._speedMult=1,this._el.addEventListener("click",e=>{if(e.target.closest("#hud-speed")&&!this._pauseEl){this._speedMult=this._speedMult===1?2:this._speedMult===2?4:1,this._fastMode=this._speedMult>1;const t=this._el.querySelector("#hud-speed");t&&(t.textContent=`⚡ ${this._speedMult}×`),this.audio.playSfx("click")}}),this._pauseEl=null}_renderHud(){var t;const e=this._el.querySelector("#cbt-hud");e.innerHTML=`
      <div class="hud-members">
        ${this._heroes.map(a=>`
          <div class="hm" id="hm-${a.id}">
            <div class="hm-name">${a.name}</div>
            <div class="hm-bars">
              <div class="hm-bar-t"><div class="hm-bar hp-bar" id="hp-${a.id}" style="width:100%"></div></div>
              <div class="hm-bar-t"><div class="hm-bar mp-bar" id="mp-${a.id}" style="width:100%"></div></div>
            </div>
            <div class="hm-vals" id="hv-${a.id}">${a.hp}/${a.maxHp} HP</div>
          </div>
        `).join("")}
      </div>
      <div class="hud-round">Round <span id="hud-round">${this._round}</span></div>
      <div class="hud-controls">
        <button class="hud-speed-btn" id="hud-speed" title="Cycle speed: 1× → 2× → 4×">⚡ ${this._speedMult||1}×</button>
        <button class="hud-pause-btn" id="hud-pause" title="Pause"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="4" height="12" rx="1"/><rect x="8" y="1" width="4" height="12" rx="1"/></svg></button>
      </div>
    `,(t=this._el.querySelector("#hud-pause"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click"),this._openPauseMenu()})}_fleeChance(){const e=this._allies.filter(i=>i.alive),t=e.reduce((i,o)=>i+(o.initiative||8),0)/Math.max(1,e.length),a=this._allEnemies.filter(i=>i.alive).length,s=Math.max(.1,Math.min(.75,t/(t+a*5)));return Math.round(s*100)}_openPauseMenu(){if(this._pauseEl)return;const e=this._speedMult;this._speedMult=0;const t=this._fleeChance(),a=!!this.encounter._bossNodeId,i=m.get().potions||[];this._pauseEl=w("div","cbt-pause-overlay"),this._pauseEl.innerHTML=`
      <div class="cpo-box">
        <div class="cpo-title">Paused</div>
        ${i.length>0?`
          <div class="cpo-potions-title">Use Potion</div>
          <div class="cpo-potions" id="cpo-potions">
            ${i.map(r=>`
              <button class="cpo-potion-btn" data-pot-uid="${r.uid}">
                ${r.icon||"🧪"} ${r.name}
              </button>
            `).join("")}
          </div>
          ${i.find(r=>r.target==="single")?`
            <div class="cpo-target-label">Target ally:</div>
            <div class="cpo-targets" id="cpo-targets">
              ${this._allies.filter(r=>r.alive||!0).map(r=>`
                <button class="cpo-target-btn${r.alive?"":" cpo-dead"}" data-ally-id="${r.id}">${r.name}${r.alive?"":" ✝"} (${Math.max(0,r.hp)}/${r.maxHp})</button>
              `).join("")}
            </div>
          `:""}
        `:'<div class="cpo-hint">No potions. Buy some at the Merchant.</div>'}
        <div class="cpo-actions">
          <button class="cpo-btn" id="cpo-resume">Resume</button>
          <button class="cpo-btn cpo-btn-flee" id="cpo-flee" ${a?'disabled title="Cannot flee from a boss!"':""}>
            Flee (${t}% chance)${a?" — Boss":""}
          </button>
          <button class="cpo-btn cpo-btn-danger" id="cpo-surrender">Surrender &amp; Return to Town</button>
        </div>
        <div class="cpo-hint">Fleeing costs the party one enemy attack if it fails.</div>
      </div>
    `;let o=null;this._pauseEl.querySelectorAll(".cpo-potion-btn").forEach(r=>{r.addEventListener("click",()=>{this._pauseEl.querySelectorAll(".cpo-potion-btn").forEach(c=>c.classList.remove("selected")),r.classList.add("selected"),o=r.dataset.potUid;const l=i.find(c=>c.uid===o);l&&l.target==="group"&&(this._usePotionOnTargets(l,this._allies.filter(c=>c.alive)),this._closePauseMenu(e))})}),this._pauseEl.querySelectorAll(".cpo-target-btn").forEach(r=>{r.addEventListener("click",()=>{var h;if(!o)return;const l=i.find(d=>d.uid===o);if(!l)return;const c=[...this._allies].find(d=>d.id===r.dataset.allyId);c&&(((h=l.effect)==null?void 0:h.type)!=="revive"&&!c.alive||(this._usePotionOnTargets(l,[c]),this._closePauseMenu(e)))})}),this._pauseEl.querySelector("#cpo-resume").addEventListener("click",()=>{this.audio.playSfx("click"),this._closePauseMenu(e)}),this._pauseEl.querySelector("#cpo-flee").addEventListener("click",()=>{a||(this.audio.playSfx("click"),this._closePauseMenu(1),this._attemptFlee(t))}),this._pauseEl.querySelector("#cpo-surrender").addEventListener("click",()=>{this.audio.playSfx("click"),this._closePauseMenu(1),this._defeat()}),this._el.appendChild(this._pauseEl)}_usePotionOnTargets(e,t){this.audio.playSfx("shrine");const a=m.get(),s=Ve(e,t),i=(a.potions||[]).findIndex(o=>o.uid===e.uid);i>=0&&a.potions.splice(i,1),this._log_(`Used ${e.name}: ${s}`,"hero"),this._updateHud(),this._checkCombatEnd(),this._heroes.forEach((o,r)=>{a.party[r]&&(a.party[r].hp=o.hp)})}_closePauseMenu(e){var a;v(this._pauseEl),this._pauseEl=null,this._speedMult=e||1,this._fastMode=this._speedMult>1;const t=(a=this._el)==null?void 0:a.querySelector("#hud-speed");t&&(t.textContent=`⚡ ${this._speedMult}×`)}_attemptFlee(e){if(Math.random()*100<e)this._log_("Your party escapes!","hero"),this._phase="FLEE",setTimeout(()=>this.manager.pop(),600);else{this._log_("Flee failed! The enemy strikes!","enemy");const a=this._allies.filter(i=>i.alive),s=this._allEnemies.find(i=>i.alive);if(a.length&&s){const i=a[Math.floor(Math.random()*a.length)],o=Math.max(1,s.dmg[0]+Math.floor(Math.random()*(s.dmg[1]-s.dmg[0]+1))-i.armor);this._applyDamage(s,i,o,"#c04030"),this._updateHud(),this._checkCombatEnd()}}}_updateHud(){var t,a,s,i;for(const o of this._heroes){const r=(t=this._el)==null?void 0:t.querySelector(`#hp-${o.id}`),l=(a=this._el)==null?void 0:a.querySelector(`#mp-${o.id}`),c=(s=this._el)==null?void 0:s.querySelector(`#hv-${o.id}`);r&&(r.style.width=`${Math.max(0,o.hp/o.maxHp*100)}%`),l&&(l.style.width=`${Math.max(0,o.mp/o.maxMp*100)}%`),c&&(c.textContent=`${Math.max(0,o.hp)}/${o.maxHp} HP`)}const e=(i=this._el)==null?void 0:i.querySelector("#hud-round");e&&(e.textContent=this._round)}_log_(e,t="normal"){var i;this._log.push({msg:e,type:t});const a=(i=this._el)==null?void 0:i.querySelector("#cbt-log");if(!a)return;const s=w("div",`cbt-entry cbt-${t}`);for(s.textContent=e,a.appendChild(s);a.children.length>10;)a.removeChild(a.firstChild);a.scrollTop=a.scrollHeight}update(e){this._t+=e,this._particles=this._particles.filter(t=>(t.life-=e,t.x+=t.vx,t.y+=t.vy,t.vy+=50*e,t.life>0)),this._dmgNumbers=this._dmgNumbers.filter(t=>(t.life-=e,t.y-=38*e,t.life>0));for(const[t,a]of this._flashMap){const s=a-e;s<=0?this._flashMap.delete(t):this._flashMap.set(t,s)}if(this._phase==="START"){this._t>=this._startDelay&&(this._phase="PLAYING",this._t=0,this._log_(`⚔ ${this.encounter.name}`,"round"));return}this._phase==="PLAYING"&&this._speedMult!==0&&(this._turnTimer+=e*(this._speedMult||1),!(this._turnTimer<Ge)&&(this._turnTimer=0,this._executeTurn()))}_executeTurn(){var a;if(this._turnIdx>=this._turnOrder.length){this._round++,this._processStatusEffects(),this._buildTurnOrder(),this._log_(`── Round ${this._round} ──`,"round");return}const e=this._turnOrder[this._turnIdx++];if(!e.alive)return;if((a=e.statuses)==null?void 0:a.find(s=>s.type==="stun")){this._log_(`${e.name} is stunned and cannot act!`,"miss");return}e.skillCooldown>0&&e.skillCooldown--,e.isHero?this._heroAI(e):this._enemyAI(e),this._checkCombatEnd()}_heroAI(e){const t=m.get(),a=[...t.party,...t.companions].find(u=>u.id===e.id),s=(a==null?void 0:a.class)||e.class,i=(a==null?void 0:a.level)||1,o=(a==null?void 0:a.personality)||"neutral",r=this._allEnemies.filter(u=>u.alive),l=this._allies.filter(u=>u.alive);if(!r.length)return;const h=ge(s,i).filter(u=>u.type!=="passive").filter(u=>e.skillCooldown===0&&(u.mpCost||0)<=e.mp);let d=!1;if(h.length&&Math.random()<.45){let u=null;const f=h.find(p=>p.type==="heal"),g=l.find(p=>p.hp/p.maxHp<.5);if(r.reduce((p,b)=>!p||b.hp<p.hp?b:p,null),o==="protective"){const p=l.find(b=>b.hp<b.maxHp);f&&p&&(u=f)}else o==="aggressive"?u=h.find(p=>p.aoe==="group"||p.aoe==="all")||h.find(p=>p.type==="melee"||p.type==="magic"):o==="opportunist"?u=h.find(p=>p.type==="melee")||h[0]:o==="patient"?(r.length>=l.length||g)&&(u=h.find(p=>p.aoe)||h[0]):(f&&g&&(u=f),!u&&r.length>=3&&(u=h.find(p=>p.aoe==="group"||p.aoe==="row"||p.aoe==="all")),u||(u=h.find(p=>p.type==="melee"||p.type==="magic")),u||(u=h[0]));u&&(d=!0,e.mp-=u.mpCost||0,e.skillCooldown=2,this._executeSkill(e,u,r,l,a))}d||this._basicAttack(e,r,!0),this._updateHud()}_enemyAI(e){const t=this._allies.filter(a=>a.alive);t.length&&this._basicAttack(e,t,!1)}_basicAttack(e,t,a){t.sort((l,c)=>l.hp-c.hp);const s=t[0],i=Math.max(5,Math.min(95,e.hit-s.dodge));if(Math.random()*100>=i){this._log_(`${e.name} misses ${s.name}.`,"miss"),e.stance="attack",setTimeout(()=>{e.stance="ready"},300);return}const o=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),r=Math.max(Math.ceil(o*.15),o-s.armor);this._applyDamage(e,s,r,a?"#ff8060":"#e8a020"),this._log_(`${e.name} → ${s.name}: ${r}`,a?"hero":"enemy"),e.stance="attack",setTimeout(()=>{e.stance="ready"},300),this._updateHud()}_executeSkill(e,t,a,s,i){var g,p,b,k;e.stance="spell",setTimeout(()=>{e.stance="ready"},400),this.audio.playSfx("spell");const o=(i==null?void 0:i.attrs)||{STR:8,DEX:8,INT:8,CON:8};if(t.type==="heal"){const _=[...s].sort((E,M)=>E.hp/E.maxHp-M.hp/M.maxHp)[0];if(!_)return;const S=Math.round((t.healMult||1.5)*(o.INT||8));_.hp=Math.min(_.maxHp,_.hp+S),this._spawnDmgNumber(_.x,_.y-50,`+${S}`,"#60e880"),this._log_(`${e.name} uses ${t.name}: heals ${_.name} for ${S}`,"hero");return}if(t.type==="buff"){this._log_(`${e.name} uses ${t.name}!`,"hero"),(g=t.effect)!=null&&g.dmgBuff&&t.target==="party"&&s.forEach(_=>{_.dmgBuff=(_.dmgBuff||0)+t.effect.dmgBuff,_.dmgBuffRounds=t.effect.duration||2}),(p=t.effect)!=null&&p.dmgReduct&&t.target==="self"&&(e.dmgReduct=t.effect.dmgReduct,e.dmgReductRounds=t.effect.duration||2);return}const r=this._getSkillStat(t.damageStat,o),l=t.damageMult||1;let c=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),h=Math.round(c*l+r*.2),d=[];if(!t.aoe||t.aoe==="single")d=[a[0]];else if(t.aoe==="adjacent"){const _=(b=a[0])==null?void 0:b.groupIdx;d=a.filter(S=>S.groupIdx===_).slice(0,2)}else if(t.aoe==="group"){const _=(k=a[0])==null?void 0:k.groupIdx;d=a.filter(S=>S.groupIdx===_)}else t.aoe==="row"||t.aoe==="all"?d=a:d=[a[0]];const u=t.type==="magic"?"#c060ff":"#ff8060",f=[];for(const _ of d){const S=Math.max(Math.ceil(h*.15),h-_.armor);this._applyDamage(e,_,S,u),f.push(_.name);for(const E of t.statusEffects||[])Math.random()<(E.chance||.5)&&this._applyStatus(_,E.type,E.duration||2,E.power||4)}this._log_(`${e.name} uses ${t.name}${d.length>1?` (×${d.length})`:""}: ${h} dmg`,"hero")}_getSkillStat(e,t){return!e||e==="str"?t.STR||8:e==="dex"?t.DEX||8:e==="int"?t.INT||8:e==="str_int"?Math.round(((t.STR||8)+(t.INT||8))/2):e==="str_dex"?Math.round(((t.STR||8)+(t.DEX||8))/2):t.STR||8}_applyDamage(e,t,a,s){let i=a;t.dmgReduct&&(i=Math.round(i*(1-t.dmgReduct))),t.hp-=i,this._flashMap.set(t.id,je),this._spawnParticles(t.x,t.y-30),this._spawnDmgNumber(t.x,t.y-50,i,s),this.audio.playSfx("hit"),t.hp<=0&&(t.hp=0,t.alive=!1,t.stance="death",this._log_(`${t.name} defeated!`,"death"))}_applyStatus(e,t,a,s){e.statuses||(e.statuses=[]);const i=e.statuses.find(r=>r.type===t);if(i){i.duration=Math.max(i.duration,a);return}e.statuses.push({type:t,duration:a,power:s});const o={burn:"🔥",poison:"☠",bleed:"🩸",stun:"⚡"};this._log_(`${e.name} is ${t}ed! ${o[t]||""}`,"death")}_processStatusEffects(){const e=[...this._allies,...this._allEnemies];for(const t of e)t.alive&&(t.statuses=(t.statuses||[]).filter(a=>{if(a.type==="burn"||a.type==="poison"||a.type==="bleed"){const s=Math.max(1,a.power||3);t.hp-=s,this._spawnDmgNumber(t.x,t.y-45,s,a.type==="burn"?"#ff6020":a.type==="poison"?"#60c020":"#c02020"),t.hp<=0&&(t.hp=0,t.alive=!1,t.stance="death",this._log_(`${t.name} perishes from ${a.type}!`,"death"))}return a.duration--,a.duration>0}),t.dmgBuffRounds>0&&(t.dmgBuffRounds--,t.dmgBuffRounds===0&&(t.dmgBuff=0)),t.dmgReductRounds>0&&(t.dmgReductRounds--,t.dmgReductRounds===0&&(t.dmgReduct=0)));this._updateHud()}_checkCombatEnd(){const e=this._allEnemies.every(a=>!a.alive),t=this._allies.every(a=>!a.alive);e&&this._phase==="PLAYING"?(this._phase="VICTORY",setTimeout(()=>this._victory(),800)):t&&this._phase==="PLAYING"&&(this._phase="DEFEAT",setTimeout(()=>this._defeat(),800))}_spawnDmgNumber(e,t,a,s){!e&&!t||this._dmgNumbers.push({x:e+(Math.random()-.5)*20,y:t,text:String(a),color:s,life:.9,maxLife:.9})}_spawnParticles(e,t){if(!e&&!t)return;const a=["#e8a020","#ff6040","#f0c060","#ff4040"];for(let s=0;s<7;s++)this._particles.push({x:e,y:t,vx:(Math.random()-.5)*100,vy:-(Math.random()*80+30),size:Math.random()*4+2,color:a[Math.floor(Math.random()*a.length)],life:Math.random()*.4+.15})}_victory(){var g;this.audio.playSfx("victory");let e=0,t=0;const a=[];for(const p of this._allEnemies){e+=p.xpValue,t+=p.gold[0]+Math.floor(Math.random()*(p.gold[1]-p.gold[0]+1));const k={border_roads:.15,thornwood:.17,dust_roads:.18,ember_plateau:.2,hell_breach:.22,shattered_core:.23,cosmic_rift:.24,eternal_void:.25}[this.encounter._zoneId]||.15;if(Math.random()<k){const _={border_roads:["sword","dagger","light_chest","ring"],thornwood:["sword","axe","medium_chest","gloves","ring"],dust_roads:["axe","mace","medium_chest","boots","amulet"],ember_plateau:["greatsword","heavy_chest","helmet","amulet"],hell_breach:["greatsword","heavy_chest","helmet","amulet","staff"],shattered_core:["staff","wand","heavy_chest","amulet","ring"],cosmic_rift:["staff","wand","heavy_chest","amulet","ring"],eternal_void:["staff","wand","heavy_chest","amulet","ring"]},S={border_roads:"normal",thornwood:"magic",dust_roads:"magic",ember_plateau:"rare",hell_breach:"rare",shattered_core:"rare",cosmic_rift:"legendary",eternal_void:"legendary"},E={border_roads:"low",thornwood:"medium",dust_roads:"medium",ember_plateau:"high",hell_breach:"high",shattered_core:"elite",cosmic_rift:"elite",eternal_void:"exotic"},M=_[this.encounter._zoneId]||["sword","dagger","light_chest","ring"],H=S[this.encounter._zoneId]||"magic",z=E[this.encounter._zoneId]||"medium",U=$(M[Math.floor(Math.random()*M.length)],H,z);U&&(a.push(U),m.addToInventory(U))}}m.addGold(t);const i={border_roads:1,thornwood:1.5,dust_roads:2,ember_plateau:2.5,hell_breach:3,shattered_core:4,cosmic_rift:5,eternal_void:6}[this.encounter._zoneId]||1,o=this.encounter._bossNodeId?Math.round(15*i):0,r=Math.round(this._allEnemies.length*i)+o;m.addFame(r);const l=m.get();this._heroes.forEach((p,b)=>{l.party[b]&&(l.party[b].hp=p.hp)});const c=qe(l.party,e),h={border_roads:"thornwood",thornwood:"dust_roads",dust_roads:"ember_plateau",ember_plateau:"hell_breach",hell_breach:"shattered_core",shattered_core:"cosmic_rift",cosmic_rift:"eternal_void",eternal_void:null};let d=null,u=!1;if(this.encounter._bossNodeId){l.completedBosses||(l.completedBosses=[]),l.completedBosses.push(this.encounter._bossNodeId);const p=h[this.encounter._zoneId];p&&!(l.unlockedZones||[]).includes(p)&&(l.unlockedZones||(l.unlockedZones=["border_roads"]),l.unlockedZones.push(p),d=`${{thornwood:"Thornwood Forest",dust_roads:"The Dust Roads (Act 2)",ember_plateau:"The Ember Plateau",hell_breach:"The Hell Breach (Act 3)",shattered_core:"The Shattered Core",cosmic_rift:"The Cosmic Rift (Act 4)",eternal_void:"The Eternal Void"}[p]||"New zone"} unlocked!`),(this.encounter._zoneId==="eternal_void"||this.encounter._bossNodeId==="void_boss"||this.encounter._bossNodeId==="core_boss")&&(u=!0,m.setFlag("game_complete",!0))}const f=w("div","cbt-end-modal");f.innerHTML=`
      <div class="cem-box">
        <div class="cem-title" style="color:#e8a020">Victory!</div>
        <div class="cem-rewards">
          <div class="cer"><span>XP</span><strong>+${e}</strong></div>
          <div class="cer"><span>Gold</span><strong>+${t}</strong></div>
          ${a.length?`<div class="cer" style="grid-column:1/-1"><span>Items Found</span><strong style="color:${A.magic}">${a.map(p=>p.name).join(", ")}</strong></div>`:""}
          ${c.length?`<div class="cer" style="grid-column:1/-1;color:#e8a020">⭐ ${c.map(p=>`${p.name} reached Level ${p.level}!`).join(" ")}</div>`:""}
          ${d?`<div class="cer" style="grid-column:1/-1;color:#60c0ff;font-weight:700">🗺 ${d}</div>`:""}
          ${u?`<div class="cer" style="grid-column:1/-1;color:#e8d020;font-size:0.9rem;font-family:'Cinzel',serif">✦ The Emberveil is sealed. You have saved all of reality. ✦</div>`:""}
        </div>
        ${u?`
          <div style="display:flex;gap:0.5rem;justify-content:center">
            <button class="cem-btn" id="cem-continue">Continue</button>
            <button class="cem-btn" id="cem-ngplus" style="border-color:rgba(232,208,32,0.5);color:#e8d020">New Game+ ✦</button>
          </div>
        `:'<button class="cem-btn" id="cem-continue">Continue</button>'}
      </div>
    `,f.querySelector("#cem-continue").addEventListener("click",()=>{this.audio.playSfx("click");const b=m.get().party.some(k=>(k.pendingAttrPoints||0)>0);this.manager.pop(),b&&this.manager.push(new Le(this.manager,this.audio))}),(g=f.querySelector("#cem-ngplus"))==null||g.addEventListener("click",()=>{this.audio.playSfx("ng_plus"),m.startNgPlus(),this.manager.pop()}),this._el.appendChild(f)}_defeat(){this.audio.playSfx("defeat"),m.setFlag("survived_defeat",!0);const e=m.get(),t=Math.floor(m.getGold()*.1);m.addGold(-t),e.party.forEach(s=>{s.hp=Math.max(1,Math.floor((s.maxHp||50)*.25))});const a=w("div","cbt-end-modal");a.innerHTML=`
      <div class="cem-box">
        <div class="cem-title" style="color:#c04030">Defeated</div>
        <div class="cem-body">Your party has fallen. You are returned to Emberglen to recover.</div>
        ${t>0?`<div style="color:#8a7a6a;font-size:0.78rem;margin-bottom:1rem">Gold lost: ${t}</div>`:""}
        <button class="cem-btn" style="border-color:rgba(192,64,48,0.5);color:#c04030">Return to Town</button>
      </div>
    `,a.querySelector(".cem-btn").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.appendChild(a)}_drawBackground(e,t,a){var c,h;if((h=(c=m.get())==null?void 0:c.settings)!=null&&h.disableTextures){e.fillStyle="#050208",e.fillRect(0,0,t,a),this._groundY=a*.63;return}const s=this.encounter.zoneId||"border_roads",i=a*.63,o={border_roads:{sky:["#0c0e14","#151c24","#1a2830"],ground:"#0a1018",grass:"rgba(60,90,120,0.3)",star:!0},thornwood:{sky:["#040a06","#081208","#0a1a0a"],ground:"#060e06",grass:"rgba(20,80,20,0.4)",star:!1,fog:"rgba(20,60,20,0.08)"},dust_roads:{sky:["#1a0e06","#280e04","#3a1c08"],ground:"#1c1008",grass:"rgba(160,80,20,0.3)",star:!0,embers:!0},ember_plateau:{sky:["#280404","#3c0c04","#5a1408"],ground:"#200808",grass:"rgba(200,40,10,0.3)",star:!1,embers:!0,glow:"#c04020"},hell_breach:{sky:["#1a0000","#300408","#480010"],ground:"#140004",grass:"rgba(160,0,20,0.4)",star:!1,embers:!0,glow:"#c00820",lava:!0},shattered_core:{sky:["#0a0014","#180028","#280040"],ground:"#08000e",grass:"rgba(120,0,200,0.3)",star:!0,embers:!0,glow:"#6020c0",lava:!1},cosmic_rift:{sky:["#000010","#000828","#001040"],ground:"#000008",grass:"rgba(0,80,200,0.25)",star:!0,embers:!0,glow:"#0040ff",lava:!1},eternal_void:{sky:["#000000","#040004","#080014"],ground:"#000000",grass:"rgba(80,0,180,0.2)",star:!0,embers:!0,glow:"#4000c0",lava:!1}},r=o[s]||o.border_roads,l=e.createLinearGradient(0,0,0,i);if(l.addColorStop(0,r.sky[0]),l.addColorStop(.5,r.sky[1]),l.addColorStop(1,r.sky[2]),e.fillStyle=l,e.fillRect(0,0,t,a),r.star){e.fillStyle="rgba(255,255,255,0.6)";for(let d=0;d<40;d++){const u=(d*137.5+s.charCodeAt(0)*7)%t,f=(d*97+s.charCodeAt(1)*13)%(i*.8);e.beginPath(),e.arc(u,f,d%3===0?1:.5,0,Math.PI*2),e.fill()}}if(s==="thornwood"){e.fillStyle="#020804";for(let d=0;d<7;d++){const u=d/6*t,f=60+d*37%40;e.beginPath(),e.moveTo(u,i),e.lineTo(u-18,i-f*.5),e.lineTo(u,i-f),e.lineTo(u+18,i-f*.5),e.closePath(),e.fill()}}else if(s==="ember_plateau"||s==="dust_roads"){e.fillStyle="#0e0604";for(let d=0;d<4;d++){const u=d/3.5*t-20,f=60+d*20,g=30+d*15;e.fillRect(u,i-g,f,g)}}else if(s==="hell_breach"||s==="shattered_core"){e.fillStyle=r.sky[0];for(let d=0;d<5;d++){const u=d/4.5*t,f=80+d*20;e.beginPath(),e.moveTo(u-12,i),e.lineTo(u,i-f),e.lineTo(u+12,i),e.closePath(),e.fill()}if(r.lava||s==="ember_plateau"){const d=e.createLinearGradient(0,i-30,0,i);d.addColorStop(0,"transparent"),d.addColorStop(1,r.glow?r.glow+"88":"rgba(200,40,0,0.4)"),e.fillStyle=d,e.fillRect(0,i-30,t,30)}}if(r.fog&&(e.fillStyle=r.fog,e.fillRect(0,i-20,t,20)),e.fillStyle=r.ground,e.fillRect(0,i,t,a-i),e.fillStyle=r.grass,e.fillRect(0,i,t,2),r.embers){e.fillStyle=r.glow?r.glow+"aa":"rgba(220,80,20,0.7)";for(let d=0;d<12;d++){const u=(this._t*(20+d*7)+d*t/12)%t,f=i-10-(this._t*(30+d*11)+d*40)%(i*.7);e.beginPath(),e.arc(u,f,1.2,0,Math.PI*2),e.fill()}}this._groundY=i,this._drawWeather(e,t,a,s)}_drawWeather(e,t,a,s){const i=this._t;if(s==="border_roads"){e.strokeStyle="rgba(120,160,200,0.18)",e.lineWidth=1;for(let o=0;o<25;o++){const r=(o*173+i*80)%t,l=(o*97+i*180)%a;e.beginPath(),e.moveTo(r,l),e.lineTo(r-2,l+10),e.stroke()}}else if(s==="thornwood"){e.fillStyle="rgba(30,80,30,0.06)";for(let o=0;o<4;o++){const r=(o*200+i*12)%(t+200)-100,l=a*.55+Math.sin(i*.3+o)*20;e.beginPath(),e.ellipse(r,l,120,18,0,0,Math.PI*2),e.fill()}}else if(s==="dust_roads"||s==="ember_plateau"){e.fillStyle="rgba(180,140,80,0.35)";for(let o=0;o<20;o++){const r=(o*137-i*30+t*2)%t,l=(o*79+i*10)%(a*.6);e.beginPath(),e.arc(r,l,1.5,0,Math.PI*2),e.fill()}}else if(s==="hell_breach"||s==="shattered_core"){const o=s==="shattered_core"?"rgba(160,60,240,0.5)":"rgba(240,40,20,0.4)";e.fillStyle=o;for(let r=0;r<18;r++){const l=(r*157+Math.sin(i*.5+r)*30)%t,c=(r*113-i*15+a)%a;e.beginPath(),e.arc(l,c,1.8,0,Math.PI*2),e.fill()}}}draw(e){const t=this.manager.width,a=this.manager.height;this._drawBackground(e,t,a),e.strokeStyle="rgba(232,160,32,0.06)",e.lineWidth=1,e.setLineDash([4,8]),e.beginPath();const s=this._groundY||a*.63;e.moveTo(t/2,40),e.lineTo(t/2,s),e.stroke(),e.setLineDash([]);const i=48,o=this._heroes.length+this._companions.length,r=this._enemyGroups.reduce((p,b)=>Math.max(p,b.length),0),l=Math.max(o,r);let c=Math.min(1,(s-60)/(l*i*.8));c=Math.max(.45,Math.min(1,c,a/900));const h=i*.75*c,d=t*.15;this._heroes.forEach((p,b)=>{p.x=d,p.y=s-8-b*h,p._drawScale=c,this._drawUnit(e,p)});const u=t*.25;this._companions.forEach((p,b)=>{p.x=u,p.y=s-8-b*h,p._drawScale=c,this._drawUnit(e,p)});const f=this._enemyGroups.length,g=f===1?[t*.65]:f===2?[t*.55,t*.75]:[t*.55,t*.7,t*.85];this._enemyGroups.forEach((p,b)=>{const k=g[b]||t*.55+b*t*.15;p.forEach((_,S)=>{_.x=k,_.y=s-8-S*h,_._drawScale=c,this._drawUnit(e,_)})}),e.save();for(const p of this._particles)e.globalAlpha=p.life,e.fillStyle=p.color,e.shadowBlur=8,e.shadowColor=p.color,e.beginPath(),e.arc(p.x,p.y,p.size,0,Math.PI*2),e.fill();e.shadowBlur=0,e.globalAlpha=1,e.restore(),e.save();for(const p of this._dmgNumbers){const b=Math.min(p.life/p.maxLife*2,1);e.globalAlpha=b,e.font=`700 ${Math.round(14+b*4)}px Inter, sans-serif`,e.textAlign="center",e.textBaseline="middle",e.fillStyle=p.color,e.shadowBlur=10,e.shadowColor=p.color,e.fillText(p.text,p.x,p.y)}if(e.shadowBlur=0,e.globalAlpha=1,e.restore(),this._phase==="START"){const p=Math.min(this._t/.4,1)*Math.max(0,1-(this._t-.6)/.4);e.save(),e.globalAlpha=p;const b=Math.round(t*.055);e.font=`900 ${b}px Cinzel, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=30,e.shadowColor="#c04030",e.fillStyle="#f0e8d8",e.fillText(this.encounter.name,t/2,a*.28),e.restore()}}_drawUnit(e,t){try{this._drawUnitInner(e,t)}catch{}}_drawUnitInner(e,t){const a=t.x,s=t.y;if(!t.alive&&t.stance!=="death")return;const i=this._flashMap.has(t.id),o=t.isHero,r=t._drawScale||1,l=(o?50:38)*r,c=t.alive?1:.35;e.save(),e.globalAlpha=c,e.fillStyle="rgba(0,0,0,0.25)",e.beginPath(),e.ellipse(a,s+3,16,5,0,0,Math.PI*2),e.fill(),i&&(e.shadowBlur=18,e.shadowColor="#ff4040");const h=o?V[t.class]:V[t.enemyId],d=o||t.stance==="ready"?"south":"east",u=h?j[h]:null,f=u?u[d]:null;if(f&&f.complete&&f.naturalWidth>0){const p=f.naturalWidth,b=f.naturalHeight,k=l/Math.max(p,b)*1.6,_=p*k,S=b*k;e.drawImage(f,a-_/2,s-S,_,S)}else{const p=i?"#ff8060":o?this._heroColor(t.class):"#6B3A0A",b=o?"#e8a020":"#c0392b";e.fillStyle=p,e.beginPath(),e.rect(a-l*.28,s-l,l*.56,l*.48),e.fill(),e.beginPath(),e.arc(a,s-l*.8,l*.2,0,Math.PI*2),e.fill(),e.fillStyle=b,e.fillRect(a-l*.18,s-l*.52,l*.14,l*.46),e.fillRect(a+l*.04,s-l*.52,l*.14,l*.46),t.stance==="attack"&&(o?(e.fillStyle="#c8c8d8",e.beginPath(),e.moveTo(a+l*.28,s-l*.72),e.lineTo(a+l*.5,s-l*.48),e.lineTo(a+l*.38,s-l*.38),e.closePath(),e.fill()):(e.fillStyle="#c0392b",e.beginPath(),e.moveTo(a-l*.35,s-l*.55),e.lineTo(a-l*.6,s-l*.38),e.lineTo(a-l*.5,s-l*.28),e.closePath(),e.fill()))}if(t.alive||(e.strokeStyle="#ff4040",e.lineWidth=1.5,e.beginPath(),e.moveTo(a-5,s-l*.87),e.lineTo(a-2,s-l*.77),e.moveTo(a-2,s-l*.87),e.lineTo(a-5,s-l*.77),e.moveTo(a+2,s-l*.87),e.lineTo(a+5,s-l*.77),e.moveTo(a+5,s-l*.87),e.lineTo(a+2,s-l*.77),e.stroke()),e.shadowBlur=0,e.globalAlpha=1,t.alive){const p=l*1.1,b=a-p/2,k=s-l-8;e.fillStyle="rgba(0,0,0,0.5)",e.fillRect(b,k,p,3);const _=Math.max(0,t.hp/t.maxHp);e.fillStyle=_>.5?"#40c870":_>.25?"#e8a020":"#c04030",e.fillRect(b,k,p*_,3);const S=t.statuses||[];if(S.length>0){const E={burn:"#ff6020",poison:"#60c040",bleed:"#c02020",stun:"#e0c020"};S.forEach((M,H)=>{e.fillStyle=E[M.type]||"#aaaaaa",e.beginPath(),e.arc(b+4+H*7,k-6,3,0,Math.PI*2),e.fill()})}o||(e.font="9px Inter, sans-serif",e.textAlign="center",e.fillStyle="rgba(240,232,216,0.65)",e.fillText(t.name,a,k-(S.length?10:2)))}e.restore()}_preloadSprites(e){const t=m.get();for(const a of[...t.party,...t.companions]){const s=V[a.class];s&&ne(s)}for(const a of e.enemies){const s=V[a.id];s&&ne(s)}}_heroColor(e){return{warrior:"#607080",paladin:"#d4af37",ranger:"#4a7a40",rogue:"#3a3050",cleric:"#e0d0a0",bard:"#8060a0",mage:"#4060c0",necromancer:"#503060",warlock:"#802040",demon_hunter:"#c04060",scavenger:"#806040",swashbuckler:"#c08020",dragon_knight:"#806020",pyromancer:"#c04020"}[e]||"#607080"}update_old(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const Fe=`
.combat-screen {
  position: absolute; inset: 0; pointer-events: none;
  font-family: 'Inter', sans-serif; color: #f0e8d8;
  /* background intentionally transparent — characters drawn on canvas behind this overlay */
}
.combat-screen > * { pointer-events: auto; }
.cbt-log-panel {
  position: absolute; top: 10px; right: 10px;
  width: min(250px, 42vw); max-height: 170px;
  background: rgba(8,4,6,0.88); border: 1px solid rgba(232,160,32,0.18);
  border-radius: 8px; overflow: hidden; pointer-events: none;
}
.cbt-log-title {
  font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
  color: #8a7a6a; padding: 0.35rem 0.7rem; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.cbt-log-entries { padding: 0.35rem 0.7rem; overflow-y: auto; max-height: 130px; display: flex; flex-direction: column; gap: 1px; }
.cbt-entry { font-size: 0.68rem; line-height: 1.4; color: #c0b090; }
.cbt-round { color: #e8a020; font-weight: 700; text-align: center; }
.cbt-hero { color: #90d8a8; }
.cbt-enemy { color: #d08080; }
.cbt-miss { color: #8a7a6a; font-style: italic; }
.cbt-death { color: #c04030; font-weight: 600; }
.cbt-hud {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 0.6rem 1rem; background: rgba(8,4,6,0.88);
  border-top: 1px solid rgba(232,160,32,0.15);
  display: flex; align-items: center; gap: 1rem; justify-content: space-between;
}
.hud-members { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.hm { min-width: 110px; }
.hm-name { font-size: 0.7rem; font-weight: 700; font-family: 'Cinzel', serif; margin-bottom: 0.25rem; }
.hm-bars { display: flex; flex-direction: column; gap: 2px; }
.hm-bar-t { background: rgba(255,255,255,0.07); border-radius: 2px; height: 4px; overflow: hidden; }
.hm-bar { height: 100%; border-radius: 2px; transition: width 0.3s; }
.hp-bar { background: #40c870; }
.mp-bar { background: #4080c0; }
.hm-vals { font-size: 0.6rem; color: #8a7a6a; margin-top: 0.2rem; }
.hud-round { font-family: 'Cinzel', serif; font-size: 0.72rem; color: #8a7a6a; flex-shrink: 0; }
.hud-controls { display: flex; gap: 0.4rem; flex-shrink: 0; }
.hud-speed-btn { background: rgba(232,160,32,0.15); border: 1px solid rgba(232,160,32,0.5); color: #e8a020; font-size: 0.82rem; font-weight: 700; padding: 0.4rem 0.85rem; border-radius: 6px; cursor: pointer; flex-shrink: 0; min-height: 48px; min-width: 60px; letter-spacing: 0.03em; }
.hud-pause-btn { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18); color: #c0b090; font-size: 1rem; padding: 0.4rem 0.7rem; border-radius: 6px; cursor: pointer; min-height: 48px; min-width: 44px; }
.hud-pause-btn:hover { background: rgba(255,255,255,0.12); }
.cbt-pause-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.78);
  display: flex; align-items: center; justify-content: center;
  z-index: 50; pointer-events: auto;
}
.cpo-box {
  background: #100c18; border: 1px solid rgba(112,64,192,0.4);
  border-radius: 14px; padding: 2rem; text-align: center;
  max-width: 320px; width: 90%; animation: cemIn 0.2s ease;
}
.cpo-title { font-family: 'Cinzel', serif; font-size: 1.2rem; font-weight: 900; color: #f0e8d8; margin-bottom: 1.5rem; letter-spacing: 0.08em; }
.cpo-actions { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
.cpo-btn {
  padding: 0.8rem 1.5rem; background: rgba(232,160,32,0.12);
  border: 1px solid rgba(232,160,32,0.4); border-radius: 8px;
  color: #e8a020; font-family: 'Cinzel', serif; font-weight: 700;
  cursor: pointer; min-height: 52px; font-size: 0.9rem;
  transition: background 0.15s;
}
.cpo-btn:hover:not(:disabled) { background: rgba(232,160,32,0.24); }
.cpo-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.cpo-btn-flee { border-color: rgba(80,200,120,0.4); color: #60d080; background: rgba(80,200,120,0.08); }
.cpo-btn-flee:hover:not(:disabled) { background: rgba(80,200,120,0.18); }
.cpo-btn-danger { border-color: rgba(192,64,48,0.35); color: #c06050; background: rgba(192,64,48,0.08); font-size: 0.78rem; }
.cpo-btn-danger:hover { background: rgba(192,64,48,0.16); }
.cpo-hint { font-size: 0.68rem; color: #8a7a6a; }
.cpo-potions-title { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7a6a; margin: 0.75rem 0 0.4rem; }
.cpo-potions { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.5rem; justify-content: center; }
.cpo-potion-btn { padding: 0.4rem 0.7rem; background: rgba(80,200,120,0.1); border: 1px solid rgba(80,200,120,0.3); border-radius: 6px; color: #90d8a8; font-size: 0.72rem; cursor: pointer; min-height: 36px; transition: background 0.15s; }
.cpo-potion-btn:hover { background: rgba(80,200,120,0.2); }
.cpo-potion-btn.selected { border-color: rgba(80,200,120,0.7); background: rgba(80,200,120,0.22); }
.cpo-target-label { font-size: 0.6rem; color: #8a7a6a; margin-bottom: 0.3rem; }
.cpo-targets { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem; justify-content: center; }
.cpo-target-btn { padding: 0.35rem 0.6rem; background: rgba(64,128,192,0.12); border: 1px solid rgba(64,128,192,0.3); border-radius: 5px; color: #80b8e0; font-size: 0.65rem; cursor: pointer; min-height: 32px; }
.cpo-target-btn:hover { background: rgba(64,128,192,0.24); }
.cpo-dead { color: #8a7a6a; border-color: rgba(255,255,255,0.1); }
.cbt-end-modal {
  position: absolute; inset: 0; display: flex;
  align-items: center; justify-content: center;
  background: rgba(0,0,0,0.72); pointer-events: auto;
}
.cem-box {
  background: #120a10; border: 1px solid rgba(232,160,32,0.3);
  border-radius: 12px; padding: 2rem; text-align: center;
  max-width: 340px; width: 90%; animation: cemIn 0.4s ease;
}
@keyframes cemIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
.cem-title { font-family: 'Cinzel', serif; font-size: 1.5rem; font-weight: 900; margin-bottom: 1rem; }
.cem-rewards { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1.5rem; }
.cer { background: rgba(255,255,255,0.04); border-radius: 6px; padding: 0.6rem; }
.cer span { display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: #8a7a6a; }
.cer strong { display: block; font-family: 'Cinzel', serif; font-size: 1.1rem; color: #e8a020; margin-top: 0.2rem; }
.cem-body { font-size: 0.85rem; color: #c0b090; line-height: 1.6; margin-bottom: 1.5rem; }
.cem-btn {
  padding: 0.75rem 2rem; background: rgba(232,160,32,0.15);
  border: 1px solid rgba(232,160,32,0.4); border-radius: 6px;
  color: #e8a020; font-family: 'Cinzel', serif; font-weight: 700;
  cursor: pointer; min-height: 44px;
}
.cem-btn:hover { background: rgba(232,160,32,0.28); }
`;class We{constructor(e,t,a,s){this.manager=e,this.audio=t,this.event=a,this.onComplete=s,this._el=null,this._lineIdx=0,this._phase="LINES",this._choiceResult=null,this._revealTimer=0,this._revealed=0,this._currentText=""}onEnter(){this._build()}_build(){C("dialog-styles",Ue),this._el=w("div","dialog-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML=`
      <div class="dlg-backdrop"></div>
      <div class="dlg-panel">
        <div class="dlg-npc-area">
          <div class="dlg-portrait" id="dlg-portrait">
            <div class="dlg-portrait-placeholder">
              ${this._npcInitials()}
            </div>
          </div>
          <div class="dlg-npc-name">${this.event.npcName}</div>
        </div>
        <div class="dlg-bubble" id="dlg-bubble">
          <div class="dlg-text" id="dlg-text"></div>
          <div class="dlg-cursor" id="dlg-cursor">▼</div>
        </div>
        <div class="dlg-choices" id="dlg-choices"></div>
        <div class="dlg-skip" id="dlg-skip">▶ Tap here or on the text to continue</div>
      </div>
    `,this._el.querySelector("#dlg-skip").addEventListener("click",()=>{this._phase==="LINES"&&this._advance()}),this._el.querySelector("#dlg-bubble").addEventListener("click",()=>{this._phase==="LINES"&&this._advance()}),this._showCurrentLine()}_npcInitials(){return this.event.npcName.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase()}_showCurrentLine(){const e=this.event.lines||[];if(this._lineIdx>=e.length){this._showChoices();return}const t=e[this._lineIdx];this._currentText=t.text,this._revealed=0,this._revealTimer=0;const a=this._el.querySelector("#dlg-bubble"),s=this._el.querySelector("#dlg-cursor");t.speaker==="hero"?a.classList.add("hero-bubble"):a.classList.remove("hero-bubble"),s.style.opacity="0",this._phase="LINES"}update(e){var i,o;if(this._phase!=="LINES")return;const t=this.event.lines||[];if(this._lineIdx>=t.length)return;const a=45;this._revealTimer+=e;const s=Math.floor(this._revealTimer*a);if(s>this._revealed){this._revealed=Math.min(s,this._currentText.length);const r=(i=this._el)==null?void 0:i.querySelector("#dlg-text");r&&(r.textContent=this._currentText.slice(0,this._revealed))}if(this._revealed>=this._currentText.length){const r=(o=this._el)==null?void 0:o.querySelector("#dlg-cursor");r&&(r.style.opacity="1")}}_advance(){var e,t;if(this._revealed<this._currentText.length){this._revealed=this._currentText.length;const a=(e=this._el)==null?void 0:e.querySelector("#dlg-text");a&&(a.textContent=this._currentText);const s=(t=this._el)==null?void 0:t.querySelector("#dlg-cursor");s&&(s.style.opacity="1");return}this._lineIdx++,this._showCurrentLine()}_showChoices(){this._phase="CHOICES";const e=this._el.querySelector("#dlg-skip");e&&(e.style.display="none");const t=this._el.querySelector("#dlg-bubble");t&&(t.style.display="none");const a=this._el.querySelector("#dlg-skip");a&&(a.style.display="none");const s=this.event.choices||[],i=this._el.querySelector("#dlg-choices");i.innerHTML=s.map((o,r)=>`
      <button class="dlg-choice${o.skillCheck?" skill-check":""}" data-idx="${r}">
        ${o.skillCheck?`<span class="sc-badge">${o.skillCheck.stat.toUpperCase()} ${o.skillCheck.dc}</span>`:""}
        ${o.text}
      </button>
    `).join(""),i.querySelectorAll(".dlg-choice").forEach(o=>{o.addEventListener("click",()=>{this.audio.playSfx("click");const r=parseInt(o.dataset.idx);this._selectChoice(r)})})}_selectChoice(e){var o;const t=this.event.choices[e],s=m.get().party[0];let i=t.outcome;if(t.skillCheck){const r=t.skillCheck.stat.toUpperCase(),l=t.skillCheck.dc;i=(((o=s==null?void 0:s.attrs)==null?void 0:o[r])||8)+Math.floor(Math.random()*10)+1>=l?t.outcomes.pass:t.outcomes.fail}t.effect&&t.effect.gold&&m.addGold(t.effect.gold),this._showOutcome(i,t)}_showOutcome(e,t){var r,l,c,h,d;this._phase="OUTCOME";const a=(r=this.event.outcomes)==null?void 0:r[e];if(!a){this._finish(e);return}if(a.setFlag&&m.setFlag(a.setFlag,!0),(l=a.reward)!=null&&l.item){const u=$("ring","magic","medium",void 0);u&&(u.name="Veil Lens",u.description="A cracked lens that reveals hidden Veil energies.",m.addToInventory(u))}const s=(c=this._el)==null?void 0:c.querySelector("#dlg-text");s&&(s.textContent=a.text);const i=(h=this._el)==null?void 0:h.querySelector("#dlg-cursor");i&&(i.style.opacity="0");const o=this._el.querySelector("#dlg-choices");o.innerHTML=`
      <button class="dlg-choice dlg-continue" id="dlg-done">Continue</button>
    `,(d=this._el.querySelector("#dlg-done"))==null||d.addEventListener("click",()=>{this.audio.playSfx("click"),this._finish(e,a)})}_finish(e,t){this.manager.pop(),this.onComplete&&this.onComplete(e,t)}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const Ue=`
.dialog-screen {
  position: absolute; inset: 0; display: flex; align-items: flex-end;
  font-family: 'Inter', sans-serif; color: #f0e8d8;
  background: rgba(5,2,8,0.92);
}
.dlg-backdrop {
  position: absolute; inset: 0; background: linear-gradient(to top, rgba(5,2,8,1) 0%, rgba(5,2,8,0.75) 60%, rgba(5,2,8,0.5) 100%);
  pointer-events: none;
}
.dlg-panel {
  position: relative; z-index: 2; width: 100%; padding: 0 0 2rem 0;
  display: flex; flex-direction: column; gap: 0;
  max-width: 600px; margin: 0 auto;
}
.dlg-npc-area {
  display: flex; align-items: center; gap: 0.75rem; padding: 0 1.25rem 0.5rem;
}
.dlg-portrait {
  width: 56px; height: 56px; border-radius: 50%; border: 2px solid rgba(232,160,32,0.4);
  background: rgba(26,18,24,0.9); overflow: hidden; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.dlg-portrait-placeholder {
  font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 700;
  color: #e8a020; letter-spacing: 0.05em;
}
.dlg-npc-name {
  font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700;
  color: #e8a020; letter-spacing: 0.08em;
}
.dlg-bubble {
  background: rgba(12,8,14,0.95); border: 1px solid rgba(232,160,32,0.2);
  border-radius: 12px 12px 4px 4px; padding: 1rem 1.25rem 0.75rem;
  margin: 0 0.75rem; min-height: 80px; position: relative;
  transition: border-color 0.2s; cursor: pointer;
}
.dlg-bubble.hero-bubble {
  background: rgba(8,12,22,0.95); border-color: rgba(64,120,200,0.3);
}
.dlg-text {
  font-size: 0.88rem; line-height: 1.65; color: #e8e0d0;
  min-height: 3.3em;
}
.dlg-cursor {
  position: absolute; bottom: 0.4rem; right: 0.75rem;
  font-size: 0.6rem; color: #e8a020; opacity: 0;
  animation: blink 1s step-end infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.dlg-choices {
  display: flex; flex-direction: column; gap: 0.4rem;
  padding: 0.5rem 0.75rem 0; margin-top: 0.4rem;
}
.dlg-choice {
  background: rgba(20,14,18,0.92); border: 1px solid rgba(232,160,32,0.18);
  border-radius: 8px; padding: 0.65rem 1rem; color: #e8e0d0;
  font-size: 0.82rem; font-family: 'Inter', sans-serif;
  text-align: left; cursor: pointer; min-height: 44px;
  transition: background 0.15s, border-color 0.15s;
  display: flex; align-items: center; gap: 0.6rem;
}
.dlg-choice:hover { background: rgba(232,160,32,0.1); border-color: rgba(232,160,32,0.35); }
.dlg-choice.skill-check { border-color: rgba(64,120,200,0.3); }
.dlg-choice.skill-check:hover { background: rgba(64,120,200,0.1); border-color: rgba(64,120,200,0.5); }
.sc-badge {
  background: rgba(64,120,200,0.25); border: 1px solid rgba(64,120,200,0.4);
  border-radius: 4px; padding: 0.1rem 0.4rem; font-size: 0.65rem; font-weight: 700;
  color: #80b0f0; flex-shrink: 0; letter-spacing: 0.08em; text-transform: uppercase;
  white-space: nowrap;
}
.dlg-continue { color: #e8a020; border-color: rgba(232,160,32,0.3); }
.dlg-continue:hover { background: rgba(232,160,32,0.12); border-color: rgba(232,160,32,0.5); }
.dlg-skip {
  text-align: center; font-size: 0.75rem; color: rgba(240,232,216,0.55);
  padding: 0.75rem 1rem; cursor: pointer; letter-spacing: 0.08em;
  min-height: 44px; display: flex; align-items: center; justify-content: center;
  background: rgba(232,160,32,0.06); border-radius: 8px; margin: 0.25rem 0.75rem 0;
  border: 1px solid rgba(232,160,32,0.12);
}
.dlg-skip:hover { color: rgba(240,232,216,0.9); background: rgba(232,160,32,0.12); }
`,X=[...he,...Te,...Ce,...Ee],Z={[T.COMBAT]:{color:"#c04030",label:"Combat"},[T.DIALOG]:{color:"#4080c0",label:"Encounter"},[T.TOWN]:{color:"#40a860",label:"Town"},[T.TREASURE]:{color:"#e8a020",label:"Treasure"},[T.AMBUSH]:{color:"#8a2020",label:"Ambush"},[T.BOSS]:{color:"#9040c0",label:"Boss"},[T.LORE]:{color:"#6a9040",label:"Discovery"},[T.SHRINE]:{color:"#60c0e0",label:"Shrine"},[T.CHALLENGE]:{color:"#e06020",label:"Challenge"}},Ye=q.goblin_patrol;class Q{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._hovered=null,this._t=0;const a=m.get();this._zone=X.find(s=>s.id===a.zoneId)||he[0]}onEnter(){this._build()}_getUnlockedZones(){const t=m.get().unlockedZones||["border_roads"];return X.filter(a=>t.includes(a.id))}_build(){var a,s;C("map-styles",Xe),this._el=w("div","map-screen");const e=this._getUnlockedZones();this._el.innerHTML=`
      <div class="map-header">
        <button class="map-back" id="map-back">← Back to Town</button>
        <div class="map-zone-tabs" id="map-zone-tabs">
          ${e.map(i=>{const o=m.get(),r=!o.visitedNodes||![...o.visitedNodes].some(l=>i.nodes.some(c=>c.id===l));return`<button class="mzt${i.id===this._zone.id?" active":""}${r&&i.id!==this._zone.id?" mzt-new":""}" data-zone="${i.id}">${i.name}${r&&i.id!==this._zone.id?' <span class="mzt-badge">NEW</span>':""}</button>`}).join("")}
        </div>
        <div class="map-act-tag">Act I · The Goblin Frontier</div>
      </div>
      <div class="map-canvas-wrap">
        <canvas id="map-canvas"></canvas>
        <div id="map-node-tooltip" class="map-node-tooltip" style="display:none"></div>
      </div>
      ${this._renderPortalBar()}
      <div class="map-legend">
        ${Object.entries(Z).map(([i,o])=>`<div class="legend-item"><div class="legend-dot" style="background:${o.color}"></div><span>${o.label}</span></div>`).join("")}
      </div>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#map-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(a=this._el.querySelector("#portal-use-btn"))==null||a.addEventListener("click",()=>{this.audio.playSfx("click");const i=m.get(),o=(i.potions||[]).findIndex(r=>r.id==="portal_scroll");o>=0&&i.potions.splice(o,1),m.openPortal(i.nodeId,i.zoneId),this.manager.pop()}),(s=this._el.querySelector("#portal-return-btn"))==null||s.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".mzt").forEach(i=>{i.addEventListener("click",()=>{const o=X.find(r=>r.id===i.dataset.zone);o&&(this.audio.playSfx("click"),this._zone=o,m.get().zoneId=o.id,v(this._el),this._el=null,this._build())})});const t=this._el.querySelector(".mzt.active");t&&t.scrollIntoView({inline:"center",block:"nearest"}),this._setupCanvas()}_renderPortalBar(){const e=m.get(),t=(e.potions||[]).some(o=>o.id==="portal_scroll"),a=m.getPortal(),s=a&&a.nodeId===e.nodeId&&a.zoneId===e.zoneId;let i="";return s?i='<button class="portal-bar-btn" id="portal-return-btn">✦ Return to Town through Portal</button>':t&&(i='<button class="portal-bar-btn" id="portal-use-btn">✦ Use Portal Scroll</button>'),i?`<div class="map-portal-bar">${i}</div>`:""}_setupCanvas(){const e=this._el.querySelector(".map-canvas-wrap"),t=this._el.querySelector("#map-canvas");t.width=e.clientWidth,t.height=e.clientHeight,t.addEventListener("click",a=>this._onClick(a,t)),t.addEventListener("mousemove",a=>this._onHover(a,t)),t.addEventListener("mouseleave",()=>{this._hovered=null,this._hideNodeTooltip()}),this._canvas=t,this._ctx=t.getContext("2d"),this._drawMap()}_nodePos(e,t,a){return{x:e.x*t,y:e.y*a}}_drawMap(){var d,u,f;const e=this._ctx,t=this._canvas.width,a=this._canvas.height,s=m.get(),i=e.createLinearGradient(0,0,t,a);i.addColorStop(0,"#080e08"),i.addColorStop(1,"#0d180e"),e.fillStyle=i,e.fillRect(0,0,t,a),e.strokeStyle="rgba(64,168,96,0.05)",e.lineWidth=1;for(let g=0;g<t;g+=40)e.beginPath(),e.moveTo(g,0),e.lineTo(g,a),e.stroke();for(let g=0;g<a;g+=40)e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke();const o=this._zone,r=s.nodeId,l=o.nodes.find(g=>g.id===r);new Set((l==null?void 0:l.exits)||[]);for(const g of o.nodes){const p=this._nodePos(g,t,a);for(const b of g.exits){const k=o.nodes.find(z=>z.id===b);if(!k)continue;const _=this._nodePos(k,t,a),S=(d=s.visitedNodes)==null?void 0:d.has(g.id),E=(u=s.visitedNodes)==null?void 0:u.has(b),M=g.id===r&&!E,H=S&&E;if(e.save(),M){e.shadowBlur=10,e.shadowColor="#e8c060",e.strokeStyle="rgba(232,192,96,0.85)",e.lineWidth=2.5;const z=this._t*30%16;e.lineDashOffset=-z,e.setLineDash([8,8])}else H?(e.strokeStyle="rgba(64,168,96,0.5)",e.lineWidth=2,e.setLineDash([])):(e.strokeStyle="rgba(100,80,60,0.25)",e.lineWidth=1,e.setLineDash([4,5]));e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(_.x,_.y),e.stroke(),e.restore(),e.setLineDash([])}}for(const g of o.nodes){const p=this._nodePos(g,t,a),b=Z[g.type]||{color:"#8a7a6a",label:g.type},k=(f=s.visitedNodes)==null?void 0:f.has(g.id),_=s.nodeId===g.id,S=this._hovered===g.id,E=this._isAccessible(g,o,s);if(_||S){const z=e.createRadialGradient(p.x,p.y,0,p.x,p.y,30);z.addColorStop(0,`${b.color}40`),z.addColorStop(1,"transparent"),e.fillStyle=z,e.beginPath(),e.arc(p.x,p.y,30,0,Math.PI*2),e.fill()}const M=g.type===T.BOSS?18:g.type===T.TOWN?16:13;e.save(),e.globalAlpha=E||k?1:.35,e.fillStyle=k||_?b.color:"rgba(20,15,10,0.9)",e.strokeStyle=b.color,e.lineWidth=_?3:S?2.5:1.5,e.shadowBlur=_?15:S?10:0,e.shadowColor=b.color,e.beginPath(),e.arc(p.x,p.y,M,0,Math.PI*2),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=k?"#0a0608":b.color,e.font=`bold ${M*.85}px Inter, sans-serif`,e.textAlign="center",e.textBaseline="middle";const H=g.type===T.BOSS?"B":g.type===T.TOWN?"T":g.type[0].toUpperCase();e.fillText(H,p.x,p.y),e.fillStyle=E?"#f0e8d8":"#8a7a6a",e.font=`${M<14?"10":"11"}px Inter, sans-serif`,e.fillText(g.name,p.x,p.y+M+13),e.restore()}const c=o.nodes.find(g=>g.id===s.nodeId);if(c){const g=this._nodePos(c,t,a);e.save(),e.fillStyle="#f0e8d8",e.shadowBlur=12,e.shadowColor="#e8a020",e.font="18px sans-serif",e.textAlign="center",e.fillText("★",g.x,g.y-26),e.restore()}const h=m.getPortal();if(h&&h.zoneId===o.id){const g=o.nodes.find(p=>p.id===h.nodeId);if(g){const p=this._nodePos(g,t,a),b=.6+.4*Math.sin(this._t*4);e.save();const k=e.createRadialGradient(p.x,p.y,4,p.x,p.y,22);k.addColorStop(0,`rgba(232,180,40,${.5*b})`),k.addColorStop(.6,`rgba(200,140,20,${.2*b})`),k.addColorStop(1,"transparent"),e.fillStyle=k,e.beginPath(),e.arc(p.x,p.y,22,0,Math.PI*2),e.fill(),e.fillStyle=`rgba(232,180,40,${b})`,e.shadowBlur=8,e.shadowColor="#e8b428",e.font="16px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("✦",p.x+16,p.y-16),e.restore()}}}_isAccessible(e,t,a){var s,i,o;if((s=a.visitedNodes)!=null&&s.has(e.id)||a.nodeId===e.id||((i=t.nodes[0])==null?void 0:i.id)===e.id)return!0;for(const r of t.nodes)if((o=a.visitedNodes)!=null&&o.has(r.id)&&r.exits.includes(e.id)||a.nodeId===r.id&&r.exits.includes(e.id))return!0;return!1}_onClick(e,t){const a=t.getBoundingClientRect(),s=(e.clientX-a.left)*(t.width/a.width),i=(e.clientY-a.top)*(t.height/a.height),o=m.get();for(const r of this._zone.nodes){const l=this._nodePos(r,t.width,t.height),c=Math.hypot(s-l.x,i-l.y),h=r.type===T.BOSS?18:14;if(c<=h+8){if(!this._isAccessible(r,this._zone,o))return;this.audio.playSfx("click"),this._navigateToNode(r);return}}}_onHover(e,t){const a=t.getBoundingClientRect(),s=(e.clientX-a.left)*(t.width/a.width),i=(e.clientY-a.top)*(t.height/a.height);let o=null;for(const r of this._zone.nodes){const l=this._nodePos(r,t.width,t.height);if(Math.hypot(s-l.x,i-l.y)<=20){o=r.id;break}}if(o!==this._hovered)if(this._hovered=o,this._drawMap(),o){const r=this._zone.nodes.find(c=>c.id===o),l=Z[r.type]||{};this._showNodeTooltip(e,r,l)}else this._hideNodeTooltip()}_showNodeTooltip(e,t,a){const s=this._el.querySelector("#map-node-tooltip");s&&(s.innerHTML=`<div class="mntt-name">${t.name}</div><div class="mntt-type" style="color:${a.color}">${a.label}</div>`,s.style.display="block",s.style.left=`${e.clientX-this._el.getBoundingClientRect().left+12}px`,s.style.top=`${e.clientY-this._el.getBoundingClientRect().top-40}px`)}_hideNodeTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#map-node-tooltip");e&&(e.style.display="none")}_navigateToNode(e){var a;const t=(a=m.get().visitedNodes)==null?void 0:a.has(e.id);switch(m.visitNode(e.id),m.get().nodeId=e.id,e.type){case T.TOWN:this.manager.pop();break;case T.COMBAT:case T.AMBUSH:{let s=e.encounter;if(t){const r=(Me[this._zone.id]||[]).filter(l=>q[l]);r.length&&(s=r[Math.floor(Math.random()*r.length)])}const i=s&&q[s]?{...q[s],name:t?q[s].name:e.name}:{...Ye,name:e.name};i.zoneId=this._zone.id,this.manager.push(new O(this.manager,this.audio,null,i));break}case T.DIALOG:{const s=$e[e.id]||{id:e.id,npcName:e.name,npcPortrait:null,lines:[{speaker:"npc",text:"The path ahead is quiet. There is nothing of note here."}],choices:[{text:"Continue.",outcome:"continue"}],outcomes:{continue:{text:"You press onward."}}};this.manager.push(new We(this.manager,this.audio,s,(i,o)=>{if(o!=null&&o.startCombat){const r={name:"Bandit Ambush",zoneId:this._zone.id,enemies:[{id:"bandit",name:"Bandit",count:2,hp:28,maxHp:28,dmg:[6,11],armor:3,hit:70,dodge:10,xpValue:20,gold:[4,10]}]};this.manager.push(new O(this.manager,this.audio,null,r))}}));break}case T.LORE:this._showLoreModal(e);break;case T.SHRINE:this._showShrineModal(e);break;case T.CHALLENGE:{const s=e.encounter,i=s?{...q[s],name:e.name}:null;i&&(i.zoneId=this._zone.id,this.manager.push(new O(this.manager,this.audio,null,i)));break}case T.TREASURE:this._showTreasureModal(e);break;case T.BOSS:{const s=e.encounter,i=s?{...q[s],name:e.name}:{...q.border_boss,name:e.name};i._bossNodeId=e.id,i._zoneId=this._zone.id,this.manager.push(new O(this.manager,this.audio,null,i));break}}this._drawMap()}_showLoreModal(e){const t=w("div","map-modal");t.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title">${e.name}</div>
        <div class="mm-body" style="color:#c0b090;font-size:0.88rem;line-height:1.6">
          ${this._getLoreText(e.id)}
        </div>
        <button class="mm-btn">Continue</button>
      </div>
    `,t.querySelector(".mm-overlay").addEventListener("click",()=>v(t)),t.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("click"),v(t)}),this._el.appendChild(t)}_showTreasureModal(e){const t=60+Math.floor(Math.random()*60),a=w("div","map-modal");a.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title" style="color:#e8a020">Treasure Found!</div>
        <div class="mm-body">You discover a hidden cache among the roots of an ancient oak. Inside: <strong style="color:#e8a020">${t} gold</strong> and a weathered map fragment.</div>
        <button class="mm-btn">Claim Reward</button>
      </div>
    `,a.querySelector(".mm-overlay").addEventListener("click",()=>v(a)),a.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("victory"),m.addGold(t),v(a)}),this._el.appendChild(a)}_showShrineModal(e){var l,c,h;const t=m.get(),a=e.shrineType||"heal",s=t.visitedNodes.has(e.id),i={heal:{title:"Ancient Shrine",body:"A shrine glows with soft golden light. The weary traveller finds rest here.",btn:"Rest at the Shrine",action:()=>{[...t.party,...t.companions].forEach(d=>{d.hp>0&&(d.hp=Math.min(d.maxHp||100,d.hp+Math.floor((d.maxHp||100)*.5)))})}},empower:{title:"Cosmic Shrine",body:"Reality bends around this altar. Power radiates from its surface — ancient, vast, unknowable.",btn:"Accept the Blessing",action:()=>{[...t.party,...t.companions].forEach(d=>{d.hp>0&&(d.hp=d.maxHp||100,d.mp=d.maxMp||80)}),m.addFame(5)}},fullrestore:{title:"The Last Shrine",body:"In the depths of the Void, this shrine stands as the final mercy before the end. It pulses with every color at once.",btn:"Be Restored",action:()=>{[...t.party,...t.companions].forEach(d=>{d.hp=d.maxHp||100,d.mp=d.maxMp||80,d.dead=!1})}}},o=i[a]||i.heal,r=w("div","map-modal");r.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title" style="color:#80d0ff">✦ ${o.title}</div>
        <div class="mm-body">${o.body}${s?'<br><em style="color:#8a7a6a;font-size:0.75rem">You have visited this shrine before.</em>':""}</div>
        ${s?"":`<button class="mm-btn">${o.btn}</button>`}
        <button class="mm-btn" style="background:transparent;border-color:rgba(240,232,216,0.2);margin-top:0.5rem" id="shrine-close">Continue</button>
      </div>
    `,(l=r.querySelector(".mm-overlay"))==null||l.addEventListener("click",()=>v(r)),(c=r.querySelector("#shrine-close"))==null||c.addEventListener("click",()=>v(r)),(h=r.querySelector(".mm-btn:not(#shrine-close)"))==null||h.addEventListener("click",()=>{s||(this.audio.playSfx("shrine"),o.action(),v(r))}),this._el.appendChild(r)}_getLoreText(e){return{crossroads_b:"The village is quiet. Too quiet. Scorched thatch still smolders on the rooftops, but the fires are old — three days at least. Whoever — whatever — drove these people out left no bodies. Only silence, and the faint smell of something wrong in the air. Like copper and rot.",hidden_path:'Half-buried in moss, the runestone pulses with a faint, sickly light. The runes are old — older than the kingdom itself. One phrase repeats, carved over and over in increasingly desperate strokes: "The veil does not hold." Mira the Seer would want to know about this.'}[e]||"There is nothing more to see here. The road calls you forward."}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="",this._drawMap())}update(e){this._t+=e,this._canvas&&this._drawMap()}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const Xe=`
.map-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: #08100a; font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.map-header {
  display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
  padding: 0.75rem 1.5rem; border-bottom: 1px solid rgba(232,160,32,0.15);
  background: rgba(0,0,0,0.3); flex-shrink: 0;
}
.map-zone-tabs { display: flex; gap: 0.5rem; flex: 1; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
.map-zone-tabs::-webkit-scrollbar { display: none; }
.mzt {
  padding: 0.35rem 0.85rem; border-radius: 6px; min-height: 36px;
  border: 1px solid rgba(64,168,96,0.25); background: rgba(64,168,96,0.06);
  color: #6ab87a; font-size: 0.72rem; cursor: pointer; font-family: 'Inter', sans-serif;
  transition: background 0.12s;
}
.mzt:hover { background: rgba(64,168,96,0.14); }
.mzt.active { background: rgba(64,168,96,0.18); border-color: rgba(64,168,96,0.5); color: #90d8a0; font-weight: 600; }
.mzt-new { border-color: rgba(232,160,32,0.5); color: #e8a020; animation: mzt-pulse 2s ease-in-out infinite; }
@keyframes mzt-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(232,160,32,0); } 50% { box-shadow: 0 0 8px 2px rgba(232,160,32,0.4); } }
.mzt-badge { font-size: 0.5rem; font-weight: 700; padding: 0.1rem 0.3rem; background: rgba(232,160,32,0.25); border-radius: 3px; color: #e8a020; vertical-align: middle; margin-left: 0.3em; }
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
.map-portal-bar {
  display: flex; justify-content: center; padding: 0.4rem 1rem;
  background: rgba(232,180,40,0.06); border-top: 1px solid rgba(232,180,40,0.15);
  flex-shrink: 0;
}
.portal-bar-btn {
  padding: 0.5rem 1.2rem; border-radius: 6px; min-height: 40px;
  background: rgba(232,180,40,0.12); border: 1px solid rgba(232,180,40,0.4);
  color: #e8b428; font-family: 'Cinzel', serif; font-weight: 700; font-size: 0.8rem;
  cursor: pointer; transition: background 0.12s;
}
.portal-bar-btn:hover { background: rgba(232,180,40,0.25); }
`,Ze=["weapon","offhand","head","chest","legs","hands","feet","ring1","ring2","necklace"],Qe={weapon:"Weapon",offhand:"Off-hand",head:"Head",chest:"Chest",legs:"Legs",hands:"Hands",feet:"Feet",ring1:"Ring",ring2:"Ring",necklace:"Necklace"};class Ke{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._tt=null}onEnter(){this._build()}_build(){C("inv-styles",Je),this._el=w("div","inv-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=m.get(),t=[...e.party,...e.companions],a=t[this._selectedCharIdx]||t[0];this._selectedCharIdx>=t.length&&(this._selectedCharIdx=0),this._el.innerHTML=`
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
            ${(()=>{var o,r;const s=(a==null?void 0:a.isCompanion)&&(a==null?void 0:a.class)==="companion",i=(r=(o=a==null?void 0:a.equipment)==null?void 0:o.weapon)==null?void 0:r.twoHanded;return Ze.map(l=>{var d;const c=(d=a==null?void 0:a.equipment)==null?void 0:d[l];return`
                  <div class="equip-slot${c?" has-item":""}${l==="offhand"&&i||s?" slot-disabled":""}${s?" slot-companion":""}" data-slot="${l}">
                    <div class="es-label">${Qe[l]}${s?'<span class="es-companion-tag">[Companion]</span>':""}</div>
                    ${c?`
                      <div class="es-item" data-itemid="${c.id}" data-slot="${l}">
                        <div class="esi-name" style="color:${A[c.rarity]}">${c.name}</div>
                        <div class="esi-stat">${c.dmg?`${c.dmg[0]}-${c.dmg[1]}`:c.armor?`+${c.armor} arm`:""}</div>
                      </div>
                    `:'<div class="es-empty">— empty —</div>'}
                  </div>
                `}).join("")})()}
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
                  <div class="iic-rarity-bar" style="background:${A[s.rarity]}"></div>
                  <div class="iic-name" style="color:${A[s.rarity]}">${s.name}</div>
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
    `,this._wireEvents()}_renderCharStats(e){if(!e)return'<div class="stat-row"><span>No character selected</span></div>';const t=e.attrs,a=e.equipment||{};let s=0;for(const c of Object.values(a))c!=null&&c.armor&&(s+=c.armor);const i=50+t.CON*10,o=30+t.INT*8,r=Math.min(95,70+Math.round(t.DEX*1.2)),l=Math.min(40,5+Math.round(t.DEX*.8));return`
      <div class="stat-row"><span class="sr-label">HP</span><span class="sr-val">${i}</span></div>
      <div class="stat-row"><span class="sr-label">Mana</span><span class="sr-val">${o}</span></div>
      <div class="stat-row"><span class="sr-label">Armor</span><span class="sr-val">${s}</span></div>
      <div class="stat-row"><span class="sr-label">Hit</span><span class="sr-val">${r}%</span></div>
      <div class="stat-row"><span class="sr-label">Dodge</span><span class="sr-val">${l}%</span></div>
      <div class="stat-row"><span class="sr-label">STR/DEX/INT/CON</span><span class="sr-val">${t.STR}/${t.DEX}/${t.INT}/${t.CON}</span></div>
    `}_doEquip(e,t,a,s){e.equipment||(e.equipment={}),t.twoHanded&&t.type==="weapon"&&e.equipment.offhand&&(m.addToInventory(e.equipment.offhand),delete e.equipment.offhand),e.equipment[a]&&m.addToInventory(e.equipment[a]),e.equipment[a]=t,m.removeFromInventory(t.id)}_showSlotPicker(e,t,a){var l,c;const s=w("div","slot-picker-overlay"),i=(l=e.equipment)==null?void 0:l.weapon,o=(c=e.equipment)==null?void 0:c.offhand,r=i==null?void 0:i.twoHanded;s.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Equip to which slot?</div>
        <div class="spo-item-name" style="color:${A[t.rarity]}">${t.name}</div>
        <div class="spo-actions">
          <button class="spo-btn" id="spo-weapon">
            Main Hand${i?`<br><small style="color:#8a7a6a">Replaces: ${i.name}</small>`:""}
          </button>
          <button class="spo-btn" id="spo-offhand" ${r?'disabled title="Unequip 2H weapon first"':""}>
            Off Hand${o?`<br><small style="color:#8a7a6a">Replaces: ${o.name}</small>`:""}${r?'<br><small style="color:#c04030">2H equipped</small>':""}
          </button>
        </div>
        <button class="spo-cancel" id="spo-cancel">Cancel</button>
      </div>
    `,s.querySelector("#spo-weapon").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"weapon",a),v(s),this._render()}),s.querySelector("#spo-offhand").addEventListener("click",()=>{r||(this.audio.playSfx("click"),this._doEquip(e,t,"offhand",a),v(s),this._render())}),s.querySelector("#spo-cancel").addEventListener("click",()=>v(s)),this._el.appendChild(s)}_showRingPicker(e,t,a){var r,l;const s=w("div","slot-picker-overlay"),i=(r=e.equipment)==null?void 0:r.ring1,o=(l=e.equipment)==null?void 0:l.ring2;s.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Equip to which ring slot?</div>
        <div class="spo-item-name" style="color:${A[t.rarity]}">${t.name}</div>
        <div class="spo-actions">
          <button class="spo-btn" id="spo-ring1">
            Ring Slot 1${i?`<br><small style="color:#8a7a6a">Replaces: ${i.name}</small>`:""}
          </button>
          <button class="spo-btn" id="spo-ring2">
            Ring Slot 2${o?`<br><small style="color:#8a7a6a">Replaces: ${o.name}</small>`:""}
          </button>
        </div>
        <button class="spo-cancel" id="spo-cancel">Cancel</button>
      </div>
    `,s.querySelector("#spo-ring1").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"ring1",a),v(s),this._render()}),s.querySelector("#spo-ring2").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"ring2",a),v(s),this._render()}),s.querySelector("#spo-cancel").addEventListener("click",()=>v(s)),this._el.appendChild(s)}_wireEvents(){var e;(e=this._el.querySelector("#inv-close"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".char-tab").forEach(t=>{t.addEventListener("click",()=>{this.audio.playSfx("click"),this._selectedCharIdx=parseInt(t.dataset.idx),this._render()})}),this._el.querySelectorAll("[data-equip]").forEach(t=>{t.addEventListener("click",()=>{this.audio.playSfx("click");const a=t.dataset.equip,s=m.get(),o=[...s.party,...s.companions][this._selectedCharIdx],r=s.inventory.find(u=>u.id===a);if(!o||!r)return;if(o.isCompanion&&o.class==="companion"){alert("Companions cannot equip items.");return}const l=r.type==="weapon",c=r.twoHanded,h=r.offHandOk||!c&&l;if(l&&!c&&h){this._showSlotPicker(o,r,s);return}if(r.subtype==="ring"){this._showRingPicker(o,r,s);return}let d=r.slot;d||(l?d="weapon":d=r.subtype),this._doEquip(o,r,d,s),this._render()})}),this._el.querySelectorAll("[data-slot]").forEach(t=>{t.dataset.itemid&&t.addEventListener("click",()=>{var r;const a=m.get(),i=[...a.party,...a.companions][this._selectedCharIdx],o=t.dataset.slot;(r=i==null?void 0:i.equipment)!=null&&r[o]&&(this.audio.playSfx("click"),m.addToInventory(i.equipment[o]),delete i.equipment[o],this._render())})}),this._el.querySelectorAll(".inv-item-card, .es-item").forEach(t=>{t.addEventListener("mouseenter",a=>{const s=t.dataset.id||t.dataset.itemid,i=m.get(),o=i.party[this._selectedCharIdx],r=i.inventory.find(h=>h.id===s)||Object.values((o==null?void 0:o.equipment)||{}).find(h=>(h==null?void 0:h.id)===s);if(!r)return;const l=this._el.querySelector("#inv-tt");l.innerHTML=me(r),l.style.display="block";const c=this._el.getBoundingClientRect();l.style.left=`${Math.min(a.clientX-c.left+12,c.width-220)}px`,l.style.top=`${Math.max(8,a.clientY-c.top-60)}px`}),t.addEventListener("mouseleave",()=>{var s;const a=(s=this._el)==null?void 0:s.querySelector("#inv-tt");a&&(a.style.display="none")})})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const Je=`
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
.slot-picker-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.72); z-index: 200;
  display: flex; align-items: center; justify-content: center;
}
.spo-box {
  background: #12090f; border: 1px solid rgba(232,160,32,0.3); border-radius: 12px;
  padding: 1.75rem; text-align: center; max-width: 300px; width: 90%;
}
.spo-title { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700; color: #f0e8d8; margin-bottom: 0.4rem; }
.spo-item-name { font-size: 0.85rem; font-weight: 600; margin-bottom: 1.25rem; }
.spo-actions { display: flex; gap: 0.7rem; margin-bottom: 0.8rem; }
.spo-btn {
  flex: 1; padding: 0.75rem 0.5rem; background: rgba(232,160,32,0.1);
  border: 1px solid rgba(232,160,32,0.35); border-radius: 8px;
  color: #e8a020; font-family: 'Cinzel', serif; font-size: 0.82rem; font-weight: 700;
  cursor: pointer; min-height: 64px; line-height: 1.4; transition: background 0.15s;
}
.spo-btn:hover:not(:disabled) { background: rgba(232,160,32,0.22); }
.spo-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.spo-cancel { background: none; border: none; color: #8a7a6a; cursor: pointer; font-size: 0.78rem; min-height: 36px; }
.spo-cancel:hover { color: #f0e8d8; }
.equip-slot.slot-disabled { opacity: 0.35; pointer-events: none; }
.equip-slot.slot-disabled .es-label::after { content: ' [2H]'; color: #c04030; font-size: 0.58rem; }
.equip-slot.slot-companion.slot-disabled .es-label::after { content: ''; }
.es-companion-tag { color: #6a5a52; font-size: 0.58rem; margin-left: 0.25rem; }
`;class et{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._selectedSkill=null,this._mobileDetailView=!1}onEnter(){this._build()}_build(){C("skill-styles",tt),this._el=w("div","skill-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const t=m.get().party,a=t[this._selectedCharIdx],s=a?ue(a.class):[],i=a?ge(a.class,a.level||1):[],o=(a==null?void 0:a.talentsPurchased)||{};this._el.innerHTML=`
      <div class="skill-header">
        <div class="skill-char-tabs" id="skill-char-tabs">
          ${t.map((r,l)=>`
            <button class="sct-tab${l===this._selectedCharIdx?" active":""}" data-idx="${l}">
              ${r.name}<br><small>${r.className||r.class} Lv${r.level||1}</small>
            </button>
          `).join("")}
        </div>
        <div class="skill-header-btns">
          ${this._mobileDetailView?'<button class="skill-back-mobile" id="skill-back-mobile">← Back</button>':""}
          <button class="skill-close" id="skill-close">✕</button>
        </div>
      </div>
      <div class="skill-layout${this._mobileDetailView?" mobile-detail-open":""}">
        <!-- Skill list -->
        <div class="skill-list-panel">
          <div class="panel-label">Skills — ${(a==null?void 0:a.className)||"No Class"}</div>
          ${s.map(r=>{const l=i.find(c=>c.name===r.name);return`
              <div class="skill-row${l?"":" locked"}${this._selectedSkill===r.name?" selected":""}" data-skill="${r.name}">
                <div class="sk-level-badge">Lv${r.unlockLevel}</div>
                <div class="sk-info">
                  <div class="sk-name">${r.name}</div>
                  <div class="sk-type">${r.type} · ${r.aoe||r.target||"self"}</div>
                </div>
                <div class="sk-cost">${r.mpCost>0?`${r.mpCost} MP`:"Passive"}</div>
                ${l?"":'<div class="sk-lock-icon">🔒</div>'}
              </div>
            `}).join("")}
        </div>
        <!-- Skill detail / talents -->
        <div class="skill-detail-panel">
          ${this._selectedSkill?this._renderSkillDetail(a,o):`
            <div class="skill-select-prompt">Select a skill to view its description and upgrade talents.</div>
          `}
        </div>
      </div>
    `,this._wireEvents()}_renderSkillDetail(e,t){var i;const a=Object.values(pe).find(o=>o.name===this._selectedSkill);if(!a)return"";const s=a.talents||[];return`
      <div class="skill-detail-inner">
        <div class="sd-name">${a.name}</div>
        <div class="sd-type"><span class="sd-badge">${a.type}</span>${a.aoe?`<span class="sd-badge">${a.aoe}</span>`:""}</div>
        <div class="sd-desc">${a.description}</div>
        ${a.mpCost>0?`<div class="sd-cost">Mana Cost: <strong>${a.mpCost}</strong></div>`:""}
        ${a.damageStat?`<div class="sd-formula">Damage: ${a.damageMult}× ${a.damageStat.toUpperCase()} <span style="color:#8a7a6a">(formula: base × stat × ${a.damageMult})</span></div>`:""}
        ${a.healStat?`<div class="sd-formula">Heal: ${a.healMult}× ${a.healStat.toUpperCase()}</div>`:""}
        ${(i=a.statusEffects)!=null&&i.length?`
          <div class="sd-effects">
            ${a.statusEffects.map(o=>`<div class="sd-effect"><span class="eff-name">${o.type.toUpperCase()}</span> ${Math.round(o.chance*100)}% chance · ${o.duration} rounds</div>`).join("")}
          </div>
        `:""}
        ${s.length?`
          <div class="sd-talents-title">Upgrade Talents</div>
          <div class="sd-talents">
            ${s.map(o=>{const r=t[o.id];return`
                <div class="sd-talent${r?" purchased":""}">
                  <div class="sdt-info">
                    <div class="sdt-name">${o.name}</div>
                    <div class="sdt-desc">${o.desc}</div>
                  </div>
                  <button class="sdt-btn${r?" done":""}" data-talent="${o.id}" ${r?"disabled":""}>
                    ${r?"✓ Learned":"Learn (1 pt)"}
                  </button>
                </div>
              `}).join("")}
          </div>
        `:'<div style="color:#8a7a6a;font-size:0.8rem;margin-top:1rem">No upgrade talents available for this skill.</div>'}
      </div>
    `}_wireEvents(){var e,t;(e=this._el.querySelector("#skill-close"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(t=this._el.querySelector("#skill-back-mobile"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click"),this._mobileDetailView=!1,this._selectedSkill=null,this._render()}),this._el.querySelectorAll(".sct-tab").forEach(a=>{a.addEventListener("click",()=>{this.audio.playSfx("click"),this._selectedCharIdx=parseInt(a.dataset.idx),this._selectedSkill=null,this._mobileDetailView=!1,this._render()})}),this._el.querySelectorAll(".skill-row").forEach(a=>{a.addEventListener("click",()=>{a.classList.contains("locked")||(this.audio.playSfx("click"),this._selectedSkill=a.dataset.skill,this._mobileDetailView=!0,this._render())})}),this._el.querySelectorAll("[data-talent]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const i=m.get().party[this._selectedCharIdx];i&&(i.talentsPurchased||(i.talentsPurchased={}),i.talentsPurchased[a.dataset.talent]=!0,this.audio.playSfx("spell"),this._render())})})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const tt=`
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
.skill-header-btns { display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0; }
.skill-close { background: none; border: none; color: #8a7a6a; cursor: pointer; font-size: 1rem; padding: 0.4rem; min-height: 36px; }
.skill-layout { flex: 1; display: grid; grid-template-columns: 260px 1fr; overflow: hidden; }
.skill-back-mobile { display: none; background: none; border: none; color: #a080e0; cursor: pointer; font-size: 0.85rem; padding: 0.4rem 0.6rem; min-height: 36px; }
@media (max-width: 600px) {
  .skill-layout { grid-template-columns: 1fr; }
  .skill-list-panel { border-right: none; border-bottom: 1px solid rgba(112,64,192,0.15); }
  .skill-layout.mobile-detail-open .skill-list-panel { display: none; }
  .skill-layout:not(.mobile-detail-open) .skill-detail-panel { display: none; }
  .skill-back-mobile { display: block; }
}
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
`,at=[{id:"q_border_roads",title:"Dangerous Roads",act:1,description:"The Border Roads are overrun with goblin patrols. Clear a path through to reach the Goblin Frontier.",objectives:[{text:"Reach the Border Roads",flagCheck:()=>!0},{text:"Defeat the Warlord's Vanguard",flagCheck:n=>(n.completedBosses||[]).includes("border_boss")}],reward:"Access to Thornwood Forest"},{id:"q_thornwood",title:"Into the Thornwood",act:1,description:"The forest has been corrupted by Veil energy. Seek out Mira the Seer and defeat the Veil Wardens.",objectives:[{text:"Reach Thornwood Forest",flagCheck:n=>(n.unlockedZones||[]).includes("thornwood")},{text:"Meet Mira the Seer",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}},{text:"Defeat the Veil Wardens",flagCheck:n=>(n.completedBosses||[]).includes("thornwood_boss")}],reward:"The Ashen Wastes opened (Act 2)"},{id:"q_seer_warning",title:"The Seer's Warning",act:1,description:"Mira the Seer spoke of an ancient rift in the Thornwood — a tear between realms pouring corruption into your world.",objectives:[{text:"Learn of the rift's origin",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.knows_rift_origin}},{text:"Speak with the Seer",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}}],reward:"Lore: Understanding the Emberveil",isLore:!0},{id:"q_ashen_wastes",title:"Through the Ashen Wastes",act:2,description:"The Ashen Wastes stretch south — volcanic flats controlled by Veil cultists and their summoned creatures. The cult is preparing a ritual.",objectives:[{text:"Reach the Ashen Wastes",flagCheck:n=>(n.unlockedZones||[]).includes("dust_roads")},{text:"Defeat the Lava Titan",flagCheck:n=>(n.completedBosses||[]).includes("dust_boss")},{text:"Reach the Ember Plateau",flagCheck:n=>(n.unlockedZones||[]).includes("ember_plateau")},{text:"Defeat the Veil High Priest",flagCheck:n=>(n.completedBosses||[]).includes("plateau_boss")}],reward:"Act 3: The Shattered Hell"},{id:"q_cult_of_the_veil",title:"The Veil Cultists' Purpose",act:2,description:'You have encountered Veil cultists throughout the Wastes. They speak of a "Convergence" — an event that will tear the boundary between realms forever.',objectives:[{text:"Encounter first Veil Cultist",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("dust"))},{text:"Find evidence of the ritual site",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.ritual_site_found}},{text:"Disrupt the Convergence ritual",flagCheck:n=>(n.completedBosses||[]).includes("plateau_boss")}],reward:"Lore: The Nature of the Emberveil",isLore:!0},{id:"q_descent_to_hell",title:"Descent into the Shattered Hell",act:3,description:"Beyond the Ember Plateau lies the Hell Breach — a torn rift into the demonic realm of the Shattered Hell. The corruption's source lies within.",objectives:[{text:"Find the Hell Breach",flagCheck:n=>(n.unlockedZones||[]).includes("hell_breach")},{text:"Survive the demon patrols",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("hell"))},{text:"Confront Archfiend Malgrath",flagCheck:n=>(n.completedBosses||[]).includes("malgrath")},{text:"Reach the Shattered Core",flagCheck:n=>(n.unlockedZones||[]).includes("shattered_core")}],reward:"The path to the Emberveil Sovereign"},{id:"q_end_of_worlds",title:"The Emberveil Sovereign",act:3,description:"At the heart of the Shattered Core sits the Emberveil Sovereign — the ancient entity tearing worlds apart. Only your party stands between it and total annihilation.",objectives:[{text:"Reach the Shattered Core",flagCheck:n=>(n.unlockedZones||[]).includes("shattered_core")},{text:"Defeat the Sovereign's Vanguard",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("shattered"))},{text:"Defeat the Emberveil Sovereign",flagCheck:n=>(n.completedBosses||[]).includes("sovereign")}],reward:"Victory — the Emberveil is sealed"}];class st{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){C("quest-styles",it),this._el=w("div","quest-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=m.get(),t=at.map(a=>{const s=a.objectives.filter(u=>u.flagCheck(e)).length,i=a.objectives.length,o=s===i,r=s>0&&!o;if(!a.objectives[0].flagCheck(e)&&!o)return"";const c=o?"complete":r?"active":"available",h=o?"Complete":r?"In Progress":"Available",d={1:"#e8a020",2:"#c06020",3:"#a02080"};return`
        <div class="ql-quest ${c}">
          <div class="ql-q-header">
            <div class="ql-q-title">${a.title}</div>
            <div class="ql-q-badges">
              <span class="ql-act-badge" style="color:${d[a.act]||"#8a7a6a"}">Act ${a.act}</span>
              <span class="ql-status-badge ${c}">${h}</span>
              ${a.isLore?'<span class="ql-lore-badge">Lore</span>':""}
            </div>
          </div>
          <div class="ql-q-desc">${a.description}</div>
          <div class="ql-objectives">
            ${a.objectives.map(u=>{const f=u.flagCheck(e);return`<div class="ql-obj ${f?"done":""}">
                <div class="ql-obj-check">${f?"✓":"○"}</div>
                <div class="ql-obj-text">${u.text}</div>
              </div>`}).join("")}
          </div>
          <div class="ql-reward">Reward: <span>${a.reward}</span></div>
          <div class="ql-progress-bar">
            <div class="ql-progress-fill" style="width:${s/i*100}%"></div>
          </div>
        </div>
      `}).join("");this._el.innerHTML=`
      <div class="ql-panel">
        <div class="ql-header">
          <div class="ql-title">Quest Log</div>
          <button class="ql-close" id="ql-close">✕</button>
        </div>
        <div class="ql-list">
          ${t||'<div class="ql-empty">No quests available yet. Explore to begin your journey.</div>'}
        </div>
      </div>
    `,this._el.querySelector("#ql-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const it=`
.quest-screen {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(5,2,8,0.96); font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.ql-panel {
  width: 100%; max-width: 540px; height: 100%; max-height: 700px;
  display: flex; flex-direction: column; padding: 0;
  border: 1px solid rgba(232,160,32,0.2); border-radius: 12px;
  background: rgba(14,10,18,0.98); overflow: hidden;
}
.ql-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.ql-title { font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 700; color: #e8a020; }
.ql-close {
  background: none; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px;
  color: #8a7a6a; font-size: 0.85rem; cursor: pointer; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
}
.ql-close:hover { color: #f0e8d8; border-color: rgba(255,255,255,0.25); }
.ql-list { overflow-y: auto; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
.ql-quest {
  background: rgba(20,14,22,0.8); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; gap: 0.55rem;
}
.ql-quest.complete { border-color: rgba(64,200,96,0.2); opacity: 0.7; }
.ql-quest.active { border-color: rgba(232,160,32,0.3); }
.ql-q-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; }
.ql-q-title { font-family: 'Cinzel', serif; font-size: 0.88rem; font-weight: 700; color: #f0e8d8; }
.ql-q-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: flex-end; }
.ql-act-badge { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; }
.ql-status-badge { font-size: 0.62rem; font-weight: 600; padding: 0.12rem 0.4rem; border-radius: 3px; }
.ql-status-badge.complete { background: rgba(64,200,96,0.15); color: #60e880; }
.ql-status-badge.active { background: rgba(232,160,32,0.15); color: #e8a020; }
.ql-status-badge.available { background: rgba(100,100,100,0.15); color: #8a7a6a; }
.ql-lore-badge { font-size: 0.62rem; font-weight: 600; padding: 0.12rem 0.4rem; border-radius: 3px; background: rgba(100,60,200,0.15); color: #c080ff; }
.ql-q-desc { font-size: 0.78rem; color: #a09080; line-height: 1.5; }
.ql-objectives { display: flex; flex-direction: column; gap: 0.3rem; }
.ql-obj { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.76rem; }
.ql-obj-check { color: #4a3a32; font-size: 0.72rem; min-width: 14px; margin-top: 1px; }
.ql-obj.done .ql-obj-check { color: #60e880; }
.ql-obj-text { color: #8a7a6a; }
.ql-obj.done .ql-obj-text { color: #c0b090; text-decoration: line-through; text-decoration-color: #4a3a32; }
.ql-reward { font-size: 0.72rem; color: #6a5a52; }
.ql-reward span { color: #e8a020; }
.ql-progress-bar { height: 2px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
.ql-progress-fill { height: 100%; background: #e8a020; border-radius: 2px; transition: width 0.4s; }
.ql-empty { text-align: center; padding: 3rem 2rem; color: #4a3a32; font-size: 0.85rem; }
`,K=[{id:"first_blood",name:"First Blood",icon:"⚔️",desc:"Win your first combat encounter.",check:n=>{var e,t;return((e=n.completedBosses)==null?void 0:e.length)>0||((t=n.storyFlags)==null?void 0:t.first_combat_won)}},{id:"boss_slayer",name:"Boss Slayer",icon:"💀",desc:"Defeat your first zone boss.",check:n=>{var e;return((e=n.completedBosses)==null?void 0:e.length)>=1}},{id:"act2_clear",name:"Into the Wastes",icon:"🔥",desc:"Reach the Ashen Wastes.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("dust_roads")}},{id:"act3_clear",name:"Hell Descends",icon:"👹",desc:"Enter the Shattered Hell.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("hell_breach")}},{id:"sovereign",name:"World Savior",icon:"🌟",desc:"Defeat the Emberveil Sovereign.",check:n=>{var e;return(e=n.completedBosses)==null?void 0:e.includes("core_boss")}},{id:"full_party",name:"Strength in Numbers",icon:"🛡️",desc:"Have a party of 4 heroes.",check:n=>{var e;return((e=n.party)==null?void 0:e.length)>=4}},{id:"companions",name:"Trusty Companions",icon:"🐾",desc:"Hire your first companion.",check:n=>{var e;return((e=n.companions)==null?void 0:e.length)>=1}},{id:"full_roster",name:"Full Retinue",icon:"👥",desc:"Have 4 heroes and 4 companions at once.",check:n=>{var e,t;return((e=n.party)==null?void 0:e.length)>=4&&((t=n.companions)==null?void 0:t.length)>=4}},{id:"rich",name:"Golden Touch",icon:"💰",desc:"Accumulate 1,000 gold.",check:n=>(n.gold||0)>=1e3},{id:"legendary_item",name:"Legendary Find",icon:"✨",desc:"Obtain a Legendary rarity item.",check:n=>{var e;return(e=n.inventory)==null?void 0:e.some(t=>t.rarity==="legendary")}},{id:"enchanted",name:"Enchanter's Patron",icon:"🔮",desc:"Use the Enchanter service.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.used_enchanter}},{id:"blacksmith",name:"Fine Craftsmanship",icon:"🔨",desc:"Upgrade an item at the Blacksmith.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.used_blacksmith}},{id:"noticed",name:"Making a Name",icon:"⭐",desc:"Reach 20 Fame.",check:n=>(n.fame||0)>=20},{id:"renowned",name:"Renowned Hero",icon:"🌠",desc:"Reach 250 Fame.",check:n=>(n.fame||0)>=250},{id:"legendary_fame",name:"Living Legend",icon:"👑",desc:"Reach 500 Fame.",check:n=>(n.fame||0)>=500},{id:"first_quest",name:"Quest Seeker",icon:"📜",desc:"Open the Quest Log.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.opened_quest_log}},{id:"seer_met",name:"Seeker of Truth",icon:"🔭",desc:"Meet Mira the Seer.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}},{id:"survived_defeat",name:"Brush with Death",icon:"💔",desc:"Be defeated in combat and live to tell the tale.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.survived_defeat}},{id:"level_10",name:"Seasoned Veteran",icon:"🎖️",desc:"Reach hero level 10.",check:n=>{var e;return(e=n.party)==null?void 0:e.some(t=>(t.level||1)>=10)}},{id:"act4_enter",name:"Cosmic Voyager",icon:"🌌",desc:"Enter the Cosmic Rift.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("cosmic_rift")}},{id:"void_boss",name:"The Unraveler Falls",icon:"✦",desc:"Defeat The Unraveler and seal the Eternal Void.",check:n=>{var e;return(e=n.completedBosses)==null?void 0:e.includes("void_boss")}},{id:"ng_plus",name:"New Game+",icon:"♾️",desc:"Begin a New Game+ run.",check:n=>(n.ngPlus||0)>=1},{id:"ng_plus_2",name:"Twice-Born Legend",icon:"⚡",desc:"Complete New Game+ twice.",check:n=>(n.ngPlus||0)>=2},{id:"codex_opened",name:"Lore Seeker",icon:"📖",desc:"Open the Codex.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.opened_codex}},{id:"forge_used",name:"The Forge Calls",icon:"⚒️",desc:"Salvage or craft an item at the Forge.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.used_forge}},{id:"challenge_done",name:"Daily Champion",icon:"⚡",desc:"Complete the Daily Challenge.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.challenge_complete}}],ot=`
.ach-screen {
  position: absolute; inset: 0; background: rgba(5,2,8,0.96);
  display: flex; flex-direction: column; overflow: hidden;
  font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.ach-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.2rem 0.8rem; border-bottom: 1px solid rgba(232,160,32,0.2);
  background: rgba(232,160,32,0.05);
}
.ach-title { font-family: 'Cinzel', serif; font-size: 1.3rem; color: #e8a020; }
.ach-subtitle { font-size: 0.72rem; color: #8a7a6a; margin-top: 0.15rem; }
.ach-close { background: transparent; border: 1px solid rgba(240,232,216,0.2); color: #f0e8d8; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.78rem; min-height: 44px; }
.ach-progress-bar { height: 4px; background: rgba(232,160,32,0.12); }
.ach-progress-fill { height: 100%; background: #e8a020; transition: width 0.4s; }
.ach-grid { flex: 1; overflow-y: auto; padding: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }
.ach-card {
  background: rgba(20,14,8,0.8); border: 1px solid rgba(232,160,32,0.15);
  border-radius: 10px; padding: 0.75rem; display: flex; gap: 0.6rem; align-items: flex-start;
  transition: border-color 0.2s;
}
.ach-card.unlocked { border-color: rgba(232,160,32,0.5); background: rgba(232,160,32,0.07); }
.ach-card.locked { opacity: 0.45; }
.ach-icon { font-size: 1.6rem; flex-shrink: 0; line-height: 1; }
.ach-card.locked .ach-icon { filter: grayscale(1); }
.ach-info { min-width: 0; }
.ach-name { font-size: 0.75rem; font-weight: 700; color: #f0e8d8; margin-bottom: 0.2rem; }
.ach-card.unlocked .ach-name { color: #e8a020; }
.ach-desc { font-size: 0.62rem; color: #8a7a6a; line-height: 1.35; }
.ach-badge { font-size: 0.58rem; color: #40c870; margin-top: 0.3rem; }
`;class rt{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}onExit(){v(this._el),this._el=null}_build(){C("ach-styles",ot),this._el=w("div","ach-screen"),this.manager.uiOverlay.appendChild(this._el);const e=m.get();e.storyFlags.opened_quest_log||(e.storyFlags.opened_quest_log=!0);const t=K.filter(i=>i.check(e)),a=K.length,s=Math.round(t.length/a*100);this._el.innerHTML=`
      <div class="ach-header">
        <div>
          <div class="ach-title">Achievements</div>
          <div class="ach-subtitle">${t.length} / ${a} unlocked (${s}%)</div>
        </div>
        <button class="ach-close" id="ach-close">✕ Close</button>
      </div>
      <div class="ach-progress-bar">
        <div class="ach-progress-fill" style="width:${s}%"></div>
      </div>
      <div class="ach-grid">
        ${K.map(i=>{const o=i.check(e);return`
            <div class="ach-card ${o?"unlocked":"locked"}">
              <div class="ach-icon">${i.icon}</div>
              <div class="ach-info">
                <div class="ach-name">${i.name}</div>
                <div class="ach-desc">${i.desc}</div>
                ${o?'<div class="ach-badge">✓ Unlocked</div>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,this._el.querySelector("#ach-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}}const nt=2,J=n=>`emberveil_save_${n}`,I={getSlot(n){try{const e=localStorage.getItem(J(n));if(!e)return null;const t=JSON.parse(e);return this.migrate(t)}catch{return null}},saveCurrentGame(n){var a,s,i,o,r,l,c,h;const e=m.toSaveData(),t={version:nt,timestamp:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),heroName:((s=(a=e.party)==null?void 0:a[0])==null?void 0:s.name)||"Unknown",class:((o=(i=e.party)==null?void 0:i[0])==null?void 0:o.className)||((l=(r=e.party)==null?void 0:r[0])==null?void 0:l.class)||"Hero",act:e.act||1,level:((h=(c=e.party)==null?void 0:c[0])==null?void 0:h.level)||1,...e};return localStorage.setItem(J(n),JSON.stringify(t)),t},loadSlot(n){const e=this.getSlot(n);return e?(m.load(e),!0):!1},deleteSlot(n){localStorage.removeItem(J(n))},getAllSlots(){return[0,1,2].map(n=>this.getSlot(n))},migrate(n){return(!n.version||n.version<2)&&(n.visitedNodes||(n.visitedNodes=["start"]),n.version=2),n}},lt=`
.party-screen {
  position: absolute; inset: 0; background: rgba(4,2,10,0.97);
  display: flex; flex-direction: column; overflow: hidden; color: #e8e0d0;
  font-family: 'Cinzel', Georgia, serif;
}
.ps-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1rem 0.5rem; border-bottom: 1px solid rgba(255,200,80,0.25);
  flex-shrink: 0;
}
.ps-title { font-size: 1.1rem; color: #e8c840; letter-spacing: 0.1em; }
.ps-close {
  background: none; border: 1px solid rgba(255,200,80,0.4); color: #e8c840;
  padding: 0.35rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;
  font-family: inherit;
}
.ps-body {
  flex: 1; overflow-y: auto; padding: 0.75rem;
  display: flex; flex-direction: column; gap: 0.75rem;
}
.ps-section-title {
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em;
  color: rgba(232,200,64,0.7); margin-bottom: 0.25rem;
}
.ps-slots {
  display: flex; flex-direction: column; gap: 0.4rem;
}
.ps-slot {
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px; padding: 0.5rem 0.75rem; cursor: pointer;
  transition: border-color 0.15s;
}
.ps-slot:hover { border-color: rgba(232,200,64,0.5); }
.ps-slot.ps-selected { border-color: #e8c840; background: rgba(232,200,64,0.1); }
.ps-slot.ps-empty {
  border-style: dashed; border-color: rgba(255,255,255,0.15);
  cursor: default; opacity: 0.5;
}
.ps-slot-icon {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; background: rgba(255,255,255,0.08);
}
.ps-slot-info { flex: 1; min-width: 0; }
.ps-slot-name { font-size: 0.9rem; font-weight: 700; color: #f0e8d8; }
.ps-slot-class { font-size: 0.72rem; color: rgba(200,180,140,0.7); text-transform: uppercase; letter-spacing: 0.08em; }
.ps-slot-stats { font-size: 0.72rem; color: rgba(200,180,140,0.6); margin-top: 0.15rem; }
.ps-slot-badge {
  font-size: 0.65rem; padding: 0.1rem 0.4rem; border-radius: 10px;
  background: rgba(96,192,96,0.2); color: #60c060; border: 1px solid rgba(96,192,96,0.4);
}
.ps-slot-badge.bench { background: rgba(160,120,60,0.2); color: #c08040; border-color: rgba(160,120,60,0.4); }
.ps-action-bar {
  flex-shrink: 0; padding: 0.75rem; display: flex; gap: 0.5rem; justify-content: center;
  border-top: 1px solid rgba(255,200,80,0.15);
}
.ps-btn {
  background: rgba(232,200,64,0.15); border: 1px solid rgba(232,200,64,0.5);
  color: #e8c840; padding: 0.5rem 1.2rem; border-radius: 5px; cursor: pointer;
  font-family: inherit; font-size: 0.85rem;
}
.ps-btn:hover { background: rgba(232,200,64,0.25); }
.ps-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ps-hint {
  font-size: 0.72rem; color: rgba(200,180,140,0.55); text-align: center;
  padding: 0.35rem 0; font-family: sans-serif; letter-spacing: 0;
}
.ps-divider { height: 1px; background: rgba(255,200,80,0.12); margin: 0.25rem 0; }
.ps-slot-actions { display: flex; gap: 0.3rem; flex-shrink: 0; }
.ps-slot-btn {
  font-family: inherit; font-size: 0.65rem; padding: 0.25rem 0.5rem; border-radius: 4px;
  cursor: pointer; border: 1px solid; background: none; white-space: nowrap;
}
.ps-slot-btn.dismiss { color: #c08040; border-color: rgba(192,128,64,0.5); }
.ps-slot-btn.dismiss:hover { background: rgba(192,128,64,0.15); }
.ps-slot-btn.recruit { color: #60c060; border-color: rgba(96,192,96,0.5); }
.ps-slot-btn.recruit:hover { background: rgba(96,192,96,0.15); }
.ps-slot-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ps-toast {
  position: absolute; bottom: 5rem; left: 50%; transform: translateX(-50%);
  background: rgba(20,12,28,0.95); border: 1px solid rgba(232,200,64,0.4);
  color: #e8c840; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.78rem;
  pointer-events: none; z-index: 10; animation: ps-fade 2s ease-out forwards;
}
@keyframes ps-fade { 0%{opacity:1} 70%{opacity:1} 100%{opacity:0} }
`;function dt(n){return{warrior:"⚔️",mage:"🔮",paladin:"🛡️",ranger:"🏹",rogue:"🗡️",cleric:"✝️",bard:"🎵",necromancer:"💀",companion:"🐾",druid:"🌿",monk:"👊",berserker:"💢",warlock:"👁️",shaman:"⚡"}[n.class]||"👤"}function ct(n){const e=Math.round((n.hp||0)/(n.maxHp||1)*100);return`HP: <span style="color:${e>60?"#60c060":e>30?"#e8c840":"#e06040"}">${n.hp??"?"}/${n.maxHp??"?"}</span>`}class ht{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedA=null}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){v(this._el),this._el=null}_build(){C("party-screen-styles",lt),this._el=w("div","party-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){var t;const e=m.get();this._el.innerHTML=`
      <div class="ps-header">
        <div class="ps-title">Party Management</div>
        <button class="ps-close" id="ps-close">✕ Close</button>
      </div>
      <div class="ps-body">
        <div class="ps-section-title">Active Party (${e.party.length}/4)</div>
        <div class="ps-slots" id="ps-party-slots">
          ${e.party.map((a,s)=>this._slotHTML(a,"party",s)).join("")}
          ${e.party.length<4?'<div class="ps-slot ps-empty"><div class="ps-slot-icon">＋</div><div class="ps-slot-info" style="color:rgba(200,180,140,0.4)">Empty slot</div></div>':""}
        </div>

        ${e.companions.length>0?`
        <div class="ps-divider"></div>
        <div class="ps-section-title">Companions (${e.companions.length}/4)</div>
        <div class="ps-slots" id="ps-companion-slots">
          ${e.companions.map((a,s)=>this._slotHTML(a,"companions",s)).join("")}
        </div>`:""}

        <div class="ps-divider"></div>
        <div class="ps-section-title">Reserves (${e.bench.length})</div>
        <div class="ps-slots" id="ps-bench-slots">
          ${e.bench.length>0?e.bench.map((a,s)=>this._slotHTML(a,"bench",s)).join(""):'<div class="ps-hint">No reserves. Use "Stand Down" to send party members here.</div>'}
        </div>

        ${e.party.length===0&&e.bench.length===0?`
        <div class="ps-hint">Your party is empty. Hire heroes at the Tavern.</div>`:""}
      </div>
      <div class="ps-action-bar">
        <button class="ps-btn" id="ps-swap" ${this._canSwap()?"":"disabled"}>⇄ Swap</button>
        <button class="ps-btn" id="ps-move-up" ${this._canMoveUp()?"":"disabled"}>↑ Up</button>
        <button class="ps-btn" id="ps-move-down" ${this._canMoveDown()?"":"disabled"}>↓ Down</button>
      </div>
      <div class="ps-hint">${this._selectedA?"✓ Selected: "+((t=this._getSelected())==null?void 0:t.name)+" — select another to swap, or use Up/Down to reorder.":"Tap a hero to select them."}</div>
    `,this._wire()}_slotHTML(e,t,a){const s=this._selectedA&&this._selectedA.source===t&&this._selectedA.index===a,i=t==="bench"?"bench":t==="companions"?"companion":"active",o=m.get(),r=t==="party"&&o.party.length>1||t==="companions",l=e.isCompanion||e.class==="companion",c=t==="bench"&&(l?o.companions.length<4:o.party.length<4);return`<div class="ps-slot${s?" ps-selected":""}" data-source="${t}" data-index="${a}">
      <div class="ps-slot-icon">${dt(e)}</div>
      <div class="ps-slot-info">
        <div class="ps-slot-name">${e.name}</div>
        <div class="ps-slot-class">${e.class||"companion"} · Lv.${e.level||1}</div>
        <div class="ps-slot-stats">${ct(e)} · MP: ${e.mp??"?"}/${e.maxMp??"?"}</div>
      </div>
      <div class="ps-slot-actions">
        ${r?`<button class="ps-slot-btn dismiss" data-dismiss="${t}:${a}">Stand Down</button>`:""}
        ${c?`<button class="ps-slot-btn recruit" data-recruit="${a}">Call to Arms</button>`:""}
      </div>
      <div class="ps-slot-badge${t==="bench"?" bench":""}">${i}</div>
    </div>`}_wire(){this._el.querySelector("#ps-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".ps-slot[data-source]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.source,o=parseInt(s.dataset.index);this._onSlotClick(i,o)})}),this._el.querySelectorAll("[data-dismiss]").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const[o,r]=s.dataset.dismiss.split(":"),l=parseInt(r),c=m.get(),h=o==="party"?c.party:c.companions;if(o==="party"&&c.party.length<=1)return;const[d]=h.splice(l,1);c.bench=c.bench||[],c.bench.push(d),this._selectedA=null,this.audio.playSfx("click"),I.saveCurrentGame(0),this._render()})}),this._el.querySelectorAll("[data-recruit]").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const o=parseInt(s.dataset.recruit),r=m.get(),[l]=r.bench.splice(o,1);if(l.isCompanion||l.class==="companion"){if(r.companions.length>=4)return;r.companions.push(l)}else{if(r.party.length>=4)return;r.party.push(l)}this._selectedA=null,this.audio.playSfx("click"),I.saveCurrentGame(0),this._render()})});const e=this._el.querySelector("#ps-swap");e&&!e.disabled&&e.addEventListener("click",()=>this._doSwap());const t=this._el.querySelector("#ps-move-up");t&&!t.disabled&&t.addEventListener("click",()=>this._doMove(-1));const a=this._el.querySelector("#ps-move-down");a&&!a.disabled&&a.addEventListener("click",()=>this._doMove(1))}_onSlotClick(e,t){if(!this._selectedA)this._selectedA={source:e,index:t};else if(this._selectedA.source===e&&this._selectedA.index===t)this._selectedA=null;else{this._doSwapWith({source:e,index:t});return}this._render()}_getSelected(){if(!this._selectedA)return null;const e=m.get();return(this._selectedA.source==="party"?e.party:this._selectedA.source==="companions"?e.companions:e.bench)[this._selectedA.index]}_canSwap(){return this._selectedA!==null}_canMoveUp(){return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index>0}_canMoveDown(){const e=m.get();return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index<e.party.length-1}_doSwap(){const e=m.get();if(!this._selectedA||e.bench.length===0)return;const t=this._selectedA.source==="party"?e.party:e.companions,a=t[this._selectedA.index],s=e.bench[0];t[this._selectedA.index]=s,e.bench[0]=a,e.bench.splice(0,1,a),this._selectedA=null,this._render()}_doSwapWith(e){const t=m.get(),a=r=>r==="party"?t.party:r==="companions"?t.companions:t.bench,s=a(this._selectedA.source),i=a(e.source),o=s[this._selectedA.index];s[this._selectedA.index]=i[e.index],i[e.index]=o,t.party=t.party.filter(Boolean),t.companions=t.companions.filter(Boolean),this._selectedA=null,this._render()}_doMove(e){const t=m.get();if(!this._selectedA||this._selectedA.source!=="party")return;const a=this._selectedA.index,s=a+e;s<0||s>=t.party.length||([t.party[a],t.party[s]]=[t.party[s],t.party[a]],this._selectedA.index=s,this._render())}}const D=[{id:"the_emberveil",category:"World",title:"The Emberveil",icon:"🌋",unlock:()=>!0,body:`The Emberveil is a vast, interconnected weave of ley lines — invisible channels of raw magical energy that flow through the earth, the sky, and the space between worlds. For millennia it kept the world in balance, feeding life into the soil and binding the planes together.

Something has begun tearing it apart. The corruption spreads outward from a wound at the center of the world, unraveling the Veil thread by thread. If it is not stopped, the planes will collapse into one another — and then into nothing.`},{id:"border_roads_lore",category:"World",title:"The Border Roads",icon:"🛤️",unlock:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("border_roads")},body:`The Border Roads mark the edge of the last stable frontier. Once prosperous trade routes connecting the eastern cities to the western mines, they have been overrun by goblin war bands emboldened by the growing darkness.

Local scouts call this region "the scar" — a place where the Emberveil's corruption first began to show.`},{id:"thornwood_lore",category:"World",title:"The Thornwood Forest",icon:"🌲",unlock:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("thornwood")},body:`The Thornwood is an ancient forest that predates human civilization. Its oldest trees have names, though no one living knows how to pronounce them. In recent seasons, the forest has grown hostile — animals corrupted, spirits turned aggressive.

The Veil Wardens claim the forest is "dreaming badly," caught in a nightmare it cannot wake from.`},{id:"ashen_wastes_lore",category:"World",title:"The Ashen Wastes",icon:"🌋",unlock:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("dust_roads")},body:`Once volcanic highlands rich with rare minerals, the Ashen Wastes are now a devastated stretch of ash dunes and sulfur springs. The Ember Plateau — its highest region — still burns with slow-moving lava flows that the locals call "the old blood."

The Veil Cultists have made this region their stronghold, drawn to the raw, unfiltered magical energy that pours from volcanic vents.`},{id:"shattered_hell_lore",category:"World",title:"The Shattered Hell",icon:"👹",unlock:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("hell_breach")},body:`A fracture in the boundary between worlds tore open beneath the Ashen Wastes, creating the Hell Breach — a wound that bleeds demonic energy into the material plane. The deeper one descends, the stranger reality becomes.

At the Shattered Core, the wound is widest. This is where the Emberveil Sovereign was born: a being that is neither demon nor human, but something the corruption made from both.`},{id:"cosmic_void_lore",category:"World",title:"The Cosmic Void",icon:"🌌",unlock:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("cosmic_rift")},body:`Beyond the edge of every plane lies the Cosmic Void — not a place, but an absence. The Cosmic Rift is a doorway into that void, torn open by The Unraveler as it works to dismantle the fabric of existence.

Time moves strangely here. Stars that burned out a billion years ago still shine. Stars that have not yet ignited cast warm light. In the Eternal Void, even the concept of an ending has been unmade.`},{id:"veil_wardens",category:"Factions",title:"The Veil Wardens",icon:"🔯",unlock:n=>{var e,t;return((e=n.storyFlags)==null?void 0:e.seer_met)||((t=n.unlockedZones)==null?void 0:t.includes("thornwood"))},body:`The Veil Wardens are an ancient order of mages and scholars dedicated to maintaining the Emberveil. They were the first to detect the corruption and the first to be dismissed when they raised the alarm.

Now scattered, the Wardens operate in small cells across the frontier, sharing fragments of research through a hidden network of trusted messengers. Mira the Seer is one of the last Wardens still working openly.`},{id:"veil_cultists",category:"Factions",title:"The Veil Cult",icon:"👁️",unlock:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("dust_roads")},body:`Where the Wardens fear the corruption, the Cult worships it. They believe the unraveling of the Emberveil is not a disaster but a transcendence — that destroying the barrier between planes will free all conscious beings from the prison of individual existence.

Their rituals involve exposure to raw ley line energy, which eventually "burns away the self." Survivors report visions of absolute unity. Most survivors do not remain survivors for long.`},{id:"goblins_lore",category:"Bestiary",title:"Goblin Clans",icon:"👺",unlock:()=>!0,body:`The goblins of the Border Roads are not mindless savages — they are a feudal culture with complex clan hierarchies, a rich oral tradition, and an exceptionally pragmatic view of survival. When the corruption began pushing predators out of the eastern forests, the goblins simply redirected into the roads.

Goblin Shamans can detect ley line fluctuations, which is why their war bands often follow the paths of corruption more accurately than trained scouts.`},{id:"demons_lore",category:"Bestiary",title:"Hell Demons",icon:"😈",unlock:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("hell_breach")},body:`Demons are not creatures from another world — they are the result of intelligent beings being fully consumed by raw chaotic energy. What emerges is a being with the shape of its former self and none of the self.

Imps are the youngest demons, still carrying residual personality as aggression. Hell Knights were once warriors. The Demon Brutes were something else entirely, something for which no records exist.`},{id:"void_entities_lore",category:"Bestiary",title:"Void Entities",icon:"✦",unlock:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("cosmic_rift")},body:`Unlike demons, Void entities were never anything else. They are not corrupted — they are what exists in the absence of existence. A Void Wraith is a consciousness that has never had a body. A Star Horror is a thought that formed in the space between dying stars.

The Unraveler is their sovereign: not a king, but a process. It does not lead the void entities — it is what they are working toward.`},{id:"the_hero_classes",category:"Lore",title:"The Fourteen Orders",icon:"⚔️",unlock:()=>!0,body:`In the age before the corruption, fourteen martial and magical orders maintained the peace across the known world. Warriors, Mages, Paladins, Rangers, Rogues, Clerics, Bards, Necromancers, Druids, Monks, Berserkers, Warlocks, Shamans, and Hell Knights each held a portion of the world's defense.

When the Emberveil began to fail, most orders fractured or scattered. Individual practitioners still walk the roads — many finding their way to the frontier where the need is greatest.`}],mt=`
.codex-screen {
  position: absolute; inset: 0; background: rgba(4,2,10,0.97);
  display: flex; flex-direction: column; overflow: hidden; color: #e8e0d0;
  font-family: 'Cinzel', Georgia, serif;
}
.codex-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1rem 0.5rem; border-bottom: 1px solid rgba(255,200,80,0.25);
  flex-shrink: 0;
}
.codex-title { font-size: 1.1rem; color: #e8c840; letter-spacing: 0.1em; }
.codex-close {
  background: none; border: 1px solid rgba(255,200,80,0.4); color: #e8c840;
  padding: 0.35rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;
  font-family: inherit;
}
.codex-tabs {
  display: flex; gap: 0; overflow-x: auto; flex-shrink: 0;
  border-bottom: 1px solid rgba(255,200,80,0.15);
}
.codex-tab {
  padding: 0.5rem 0.9rem; font-size: 0.72rem; text-transform: uppercase;
  letter-spacing: 0.1em; cursor: pointer; color: rgba(200,180,140,0.6);
  border-bottom: 2px solid transparent; white-space: nowrap; background: none; border: none;
  font-family: inherit; transition: color 0.15s;
}
.codex-tab.active { color: #e8c840; border-bottom: 2px solid #e8c840; }
.codex-body {
  flex: 1; overflow-y: auto; padding: 0;
  display: flex; flex-direction: row;
}
.codex-list {
  width: 38%; min-width: 120px; border-right: 1px solid rgba(255,200,80,0.12);
  overflow-y: auto;
}
.codex-entry-row {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 0.75rem; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: background 0.1s;
}
.codex-entry-row:hover { background: rgba(255,200,80,0.06); }
.codex-entry-row.active { background: rgba(232,200,64,0.12); }
.codex-entry-row.locked { opacity: 0.3; cursor: default; }
.codex-entry-icon { font-size: 1.1rem; flex-shrink: 0; }
.codex-entry-name { font-size: 0.78rem; color: #e0d8c8; }
.codex-detail {
  flex: 1; padding: 1rem; overflow-y: auto;
}
.codex-detail-title { font-size: 1rem; color: #e8c840; margin-bottom: 0.5rem; }
.codex-detail-category { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(200,180,140,0.5); margin-bottom: 0.75rem; }
.codex-detail-body {
  font-size: 0.78rem; line-height: 1.65; color: rgba(220,210,190,0.85);
  font-family: Georgia, serif; white-space: pre-wrap;
}
.codex-locked-msg {
  color: rgba(200,180,140,0.4); font-size: 0.8rem; text-align: center;
  padding: 2rem 1rem; font-style: italic; font-family: Georgia, serif;
}
.codex-progress {
  font-size: 0.7rem; color: rgba(200,180,140,0.5); text-align: center;
  padding: 0.4rem; border-top: 1px solid rgba(255,200,80,0.1); flex-shrink: 0;
  font-family: sans-serif;
}
`,pt=["All",...new Set(D.map(n=>n.category))];class ut{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._activeCategory="All",this._selectedId=null}onEnter(){this._build(),m.setFlag("opened_codex",!0)}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){v(this._el),this._el=null}_build(){C("codex-screen-styles",mt),this._el=w("div","codex-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=m.get(),t=D.filter(o=>this._activeCategory==="All"||o.category===this._activeCategory);t.filter(o=>o.unlock(e));const a=this._selectedId?D.find(o=>o.id===this._selectedId):null,s=a&&a.unlock(e),i=D.filter(o=>o.unlock(e)).length;this._el.innerHTML=`
      <div class="codex-header">
        <div class="codex-title">✦ Codex</div>
        <button class="codex-close" id="cod-close">✕ Close</button>
      </div>
      <div class="codex-tabs">
        ${pt.map(o=>`<button class="codex-tab${this._activeCategory===o?" active":""}" data-cat="${o}">${o}</button>`).join("")}
      </div>
      <div class="codex-body">
        <div class="codex-list">
          ${t.map(o=>{const r=!o.unlock(e);return`<div class="codex-entry-row${r?" locked":""}${this._selectedId===o.id?" active":""}" data-id="${o.id}">
              <div class="codex-entry-icon">${r?"🔒":o.icon}</div>
              <div class="codex-entry-name">${r?"???":o.title}</div>
            </div>`}).join("")}
        </div>
        <div class="codex-detail">
          ${a&&s?`
            <div class="codex-detail-category">${a.category}</div>
            <div class="codex-detail-title">${a.icon} ${a.title}</div>
            <div class="codex-detail-body">${a.body}</div>
          `:a&&!s?`
            <div class="codex-locked-msg">🔒 This entry has not yet been unlocked.<br>Continue your journey to discover more.</div>
          `:`
            <div class="codex-locked-msg">Select an entry from the list to read it.</div>
          `}
        </div>
      </div>
      <div class="codex-progress">${i} / ${D.length} entries unlocked</div>
    `,this._el.querySelector("#cod-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".codex-tab").forEach(o=>{o.addEventListener("click",()=>{this._activeCategory=o.dataset.cat,this._render()})}),this._el.querySelectorAll(".codex-entry-row:not(.locked)").forEach(o=>{o.addEventListener("click",()=>{this._selectedId=o.dataset.id,this._render()})})}}const gt=`
.forge-screen {
  position: absolute; inset: 0; background: rgba(6,2,2,0.97);
  display: flex; flex-direction: column; overflow: hidden; color: #e8e0d0;
  font-family: 'Cinzel', Georgia, serif;
}
.forge-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1rem 0.5rem; border-bottom: 1px solid rgba(255,120,40,0.3); flex-shrink: 0;
}
.forge-title { font-size: 1.1rem; color: #e88040; letter-spacing: 0.1em; }
.forge-close {
  background: none; border: 1px solid rgba(255,120,40,0.4); color: #e88040;
  padding: 0.35rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;
  font-family: inherit;
}
.forge-tabs {
  display: flex; border-bottom: 1px solid rgba(255,120,40,0.15); flex-shrink: 0;
}
.forge-tab {
  flex: 1; padding: 0.6rem; text-align: center; cursor: pointer;
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(200,160,100,0.6); background: none; border: none; font-family: inherit;
  border-bottom: 2px solid transparent;
}
.forge-tab.active { color: #e88040; border-bottom: 2px solid #e88040; }
.forge-body { flex: 1; overflow-y: auto; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.6rem; }
/* Materials panel */
.forge-mats {
  display: flex; flex-wrap: wrap; gap: 0.4rem;
  background: rgba(255,120,40,0.06); border: 1px solid rgba(255,120,40,0.2);
  border-radius: 6px; padding: 0.6rem;
}
.forge-mat-chip {
  display: flex; align-items: center; gap: 0.3rem;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.72rem;
}
.forge-mat-zero { opacity: 0.35; }
/* Inventory items for salvage */
.forge-inv-item {
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px; padding: 0.45rem 0.7rem; cursor: pointer;
  transition: border-color 0.15s;
}
.forge-inv-item:hover { border-color: rgba(255,120,40,0.4); }
.forge-inv-name { flex: 1; font-size: 0.8rem; }
.forge-inv-yield { font-size: 0.68rem; color: rgba(180,150,100,0.6); margin-top: 0.1rem; }
.forge-salvage-btn {
  background: rgba(255,120,40,0.15); border: 1px solid rgba(255,120,40,0.5);
  color: #e88040; padding: 0.25rem 0.7rem; border-radius: 4px; cursor: pointer;
  font-size: 0.75rem; font-family: inherit; white-space: nowrap;
}
/* Recipes */
.forge-recipe {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px; padding: 0.55rem 0.75rem;
}
.forge-recipe-name { font-size: 0.85rem; color: #f0e0c0; margin-bottom: 0.2rem; }
.forge-recipe-cost { font-size: 0.72rem; color: rgba(180,150,100,0.7); margin-bottom: 0.4rem; }
.forge-recipe-cost span.ok { color: #60c060; }
.forge-recipe-cost span.no { color: #e06040; }
.forge-craft-btn {
  background: rgba(96,192,64,0.15); border: 1px solid rgba(96,192,64,0.4);
  color: #80e060; padding: 0.3rem 0.9rem; border-radius: 4px; cursor: pointer;
  font-size: 0.78rem; font-family: inherit;
}
.forge-craft-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.forge-msg {
  font-size: 0.8rem; text-align: center; padding: 0.5rem;
  color: #80e060; font-family: Georgia, serif; font-style: italic;
}
.forge-empty { font-size: 0.8rem; color: rgba(180,150,100,0.5); text-align: center; padding: 2rem 1rem; font-family: Georgia, serif; font-style: italic; }
`;class ft{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._tab="salvage",this._msg=""}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){v(this._el),this._el=null}_build(){C("forge-screen-styles",gt),this._el=w("div","forge-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=m.get(),t=m.getMaterials(),a=Object.values(Y).map(i=>{const o=t[i.id]||0;return`<div class="forge-mat-chip${o===0?" forge-mat-zero":""}">${i.icon} ${i.name}: <strong>${o}</strong></div>`}).join("");let s="";if(this._tab==="salvage"){const i=(e.inventory||[]).filter(o=>!o.equipped);i.length===0?s='<div class="forge-empty">No unequipped items to salvage.<br>Equip your best gear first, then return here.</div>':s=i.map(o=>{const r=A[o.rarity]||"#ccc",l={normal:"2-4 Iron Scrap",magic:"1-2 Scrap + 1-2 Essence",rare:"1-3 Essence + 1-2 Rare Dust",legendary:"1-2 Rare Dust + 1 Legend Core"}[o.rarity]||"";return`<div class="forge-inv-item" data-id="${o.id}">
            <div class="forge-inv-name">
              <div style="color:${r}">${o.name}</div>
              <div class="forge-inv-yield">Yields: ${l}</div>
            </div>
            <button class="forge-salvage-btn" data-salvage="${o.id}">Salvage</button>
          </div>`}).join("")}else s=ie.map(i=>{const o=oe(i,t),r=Object.entries(i.materials).map(([l,c])=>{const h=t[l]||0,d=Y[l];return`<span class="${h>=c?"ok":"no"}">${(d==null?void 0:d.icon)||""} ${(d==null?void 0:d.name)||l}: ${h}/${c}</span>`});return`<div class="forge-recipe">
          <div class="forge-recipe-name">${i.name}</div>
          <div class="forge-recipe-cost">${r.join(" · ")}</div>
          <button class="forge-craft-btn" data-craft="${i.id}" ${o?"":"disabled"}>⚒ Craft</button>
        </div>`}).join("");this._el.innerHTML=`
      <div class="forge-header">
        <div class="forge-title">⚒ The Forge</div>
        <button class="forge-close" id="forge-close">✕ Close</button>
      </div>
      <div style="padding:0.6rem 0.75rem 0.4rem;border-bottom:1px solid rgba(255,120,40,0.1);flex-shrink:0">
        <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.12em;color:rgba(200,160,100,0.55);margin-bottom:0.35rem">Materials</div>
        <div class="forge-mats">${a}</div>
      </div>
      <div class="forge-tabs">
        <button class="forge-tab${this._tab==="salvage"?" active":""}" data-tab="salvage">Salvage</button>
        <button class="forge-tab${this._tab==="craft"?" active":""}" data-tab="craft">Forge</button>
      </div>
      <div class="forge-body">${s}</div>
      ${this._msg?`<div class="forge-msg">${this._msg}</div>`:""}
    `,this._el.querySelector("#forge-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".forge-tab").forEach(i=>{i.addEventListener("click",()=>{this._tab=i.dataset.tab,this._msg="",this._render()})}),this._el.querySelectorAll("[data-salvage]").forEach(i=>{i.addEventListener("click",()=>this._doSalvage(i.dataset.salvage))}),this._el.querySelectorAll("[data-craft]").forEach(i=>{i.addEventListener("click",()=>this._doCraft(i.dataset.craft))})}_doSalvage(e){const a=(m.get().inventory||[]).find(o=>o.id===e);if(!a)return;const s=Oe(a);m.removeFromInventory(e),m.addMaterials(s),m.setFlag("used_forge",!0);const i=Object.entries(s).map(([o,r])=>{var l;return`${r}× ${((l=Y[o])==null?void 0:l.name)||o}`}).join(", ");this._msg=`Salvaged ${a.name} → ${i}`,this._render()}_doCraft(e){const t=ie.find(i=>i.id===e);if(!t)return;const a=m.getMaterials();if(!oe(t,a))return;De(t,a);const s=$(t.base,t.rarity,t.quality);s&&(m.addToInventory(s),this._msg=`Forged: ${s.name}!`,this.audio.playSfx("craft")),m.setFlag("used_forge",!0),this._render()}}const bt=`
.challenge-screen {
  position: absolute; inset: 0; background: rgba(2,4,10,0.97);
  display: flex; flex-direction: column; overflow: hidden; color: #e8e0d0;
  font-family: 'Cinzel', Georgia, serif;
}
.chal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1rem 0.5rem; border-bottom: 1px solid rgba(80,120,255,0.3); flex-shrink: 0;
}
.chal-title { font-size: 1.1rem; color: #80a0ff; letter-spacing: 0.1em; }
.chal-close {
  background: none; border: 1px solid rgba(80,120,255,0.4); color: #80a0ff;
  padding: 0.35rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem;
  font-family: inherit;
}
.chal-body { flex: 1; overflow-y: auto; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.chal-card {
  background: rgba(80,120,255,0.06); border: 1px solid rgba(80,120,255,0.25);
  border-radius: 8px; padding: 0.9rem;
}
.chal-card-title { font-size: 0.9rem; color: #80a0ff; margin-bottom: 0.4rem; }
.chal-seed-label { font-size: 0.7rem; color: rgba(150,170,220,0.5); letter-spacing: 0.1em; }
.chal-waves {
  display: flex; flex-direction: column; gap: 0.3rem; margin: 0.6rem 0;
}
.chal-wave {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.78rem; color: rgba(200,190,220,0.8);
}
.chal-wave-num { color: #80a0ff; font-weight: 700; width: 1.5rem; }
.chal-wave.done { color: rgba(96,192,96,0.8); }
.chal-wave.done .chal-wave-num { color: #60c060; }
.chal-wave.current { color: #e8e040; }
.chal-wave.current .chal-wave-num { color: #e8e040; }
.chal-start-btn {
  width: 100%; padding: 0.65rem; border: 1px solid rgba(80,120,255,0.6);
  background: rgba(80,120,255,0.15); color: #80a0ff; font-family: inherit;
  font-size: 0.9rem; border-radius: 5px; cursor: pointer; letter-spacing: 0.05em;
}
.chal-start-btn:hover { background: rgba(80,120,255,0.25); }
.chal-start-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.chal-score-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.35rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.78rem;
}
.chal-score-rank { color: #e8c840; width: 2rem; }
.chal-score-name { flex: 1; color: #e0d8c8; }
.chal-score-pts { color: #80a0ff; }
.chal-you { color: #60c060 !important; font-weight: 700; }
.chal-complete-banner {
  background: rgba(96,192,64,0.1); border: 1px solid rgba(96,192,64,0.4);
  border-radius: 6px; padding: 0.75rem; text-align: center;
  color: #80e060; font-size: 0.9rem;
}
.chal-info { font-size: 0.72rem; color: rgba(150,170,220,0.55); font-family: Georgia, serif; line-height: 1.5; }
`;function vt(n){let e=n>>>0;return()=>{e+=1831565813;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function yt(){const n=new Date;return n.getFullYear()*1e4+(n.getMonth()+1)*100+n.getDate()}function fe(){const n=new Date;return`emberveil_challenge_${n.getFullYear()}_${n.getMonth()+1}_${n.getDate()}`}const _t=[[{id:"goblin_scout",name:"Goblin Scout",count:4,hp:20,maxHp:20,dmg:[4,8],armor:1,hit:70,dodge:12,xpValue:20,gold:[5,10]}],[{id:"goblin_warrior",name:"Goblin Warrior",count:3,hp:35,maxHp:35,dmg:[8,16],armor:3,hit:75,dodge:8,xpValue:35,gold:[8,15]},{id:"goblin_scout",name:"Goblin Scout",count:2,hp:20,maxHp:20,dmg:[4,8],armor:1,hit:70,dodge:12,xpValue:20,gold:[5,10]}],[{id:"veil_cultist",name:"Veil Cultist",count:3,hp:55,maxHp:55,dmg:[12,22],armor:4,hit:78,dodge:10,xpValue:55,gold:[12,22]}],[{id:"ash_wraith",name:"Ash Wraith",count:2,hp:70,maxHp:70,dmg:[18,30],armor:5,hit:80,dodge:15,xpValue:70,gold:[15,28]},{id:"cinder_hound",name:"Cinder Hound",count:2,hp:60,maxHp:60,dmg:[14,24],armor:3,hit:82,dodge:10,xpValue:60,gold:[12,20]}],[{id:"grax",name:"Grax the Warlord",count:1,hp:280,maxHp:280,dmg:[25,45],armor:12,hit:80,dodge:8,xpValue:300,gold:[60,120]},{id:"goblin_warrior",name:"Goblin Warrior",count:2,hp:35,maxHp:35,dmg:[8,16],armor:3,hit:75,dodge:8,xpValue:35,gold:[8,15]}]];function xt(n){const e=vt(n);return _t.map((t,a)=>{const s=t.map(i=>({...i,count:Math.max(1,i.count+(e()>.7?1:0)),hp:Math.round(i.hp*(.9+e()*.25)),maxHp:Math.round(i.hp*(.9+e()*.25))}));return{wave:a+1,enemies:s,name:["The Opening Wave","Rising Tide","The Cult Strikes","Shadows and Flame","The Warlord's Last Stand"][a]}})}function ee(){try{return JSON.parse(localStorage.getItem(fe())||"[]")}catch{return[]}}function wt(n,e,t){const a=ee();a.push({name:n,score:e,waves:t,ts:Date.now()}),a.sort((s,i)=>i.score-s.score),localStorage.setItem(fe(),JSON.stringify(a.slice(0,20)))}class kt{constructor(e,t){var r;this.manager=e,this.audio=t,this._el=null,this._seed=yt(),this._waves=xt(this._seed),this._currentWave=0,this._wavesCleared=0,this._score=0,this._running=!1,this._done=!1;const a=ee(),i=((r=m.get().hero)==null?void 0:r.name)||"Traveller",o=a.find(l=>l.name===i);o&&(this._done=!0,this._score=o.score,this._wavesCleared=o.waves)}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){var e;if(this._el&&(this._el.style.display="flex"),this._running){if(this._running=!1,this._wavesCleared++,this._score+=this._wavesCleared*100,this._wavesCleared>=this._waves.length){this._done=!0;const t=m.get();wt(((e=t.hero)==null?void 0:e.name)||"Traveller",this._score,this._wavesCleared),m.setFlag("challenge_complete",!0),m.addFame(50)}this._render()}}onExit(){v(this._el),this._el=null}_build(){C("challenge-screen-styles",bt),this._el=w("div","challenge-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){var o;const e=ee(),t=this._seed,a=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),s=this._waves.map((r,l)=>{const c=l<this._wavesCleared,h=!this._done&&l===this._wavesCleared;return`<div class="chal-wave${c?" done":h?" current":""}">
        <div class="chal-wave-num">${c?"✓":h?"▶":l+1}</div>
        <div>${r.name} — ${r.enemies.map(d=>`${d.count}× ${d.name}`).join(", ")}</div>
      </div>`}).join(""),i=e.length===0?'<div style="font-size:0.75rem;color:rgba(150,170,220,0.4);text-align:center;padding:1rem">No scores recorded today yet.</div>':e.slice(0,10).map((r,l)=>{var d;const c=m.get(),h=r.name===(((d=c.hero)==null?void 0:d.name)||"Traveller");return`<div class="chal-score-row">
            <div class="chal-score-rank">#${l+1}</div>
            <div class="chal-score-name${h?" chal-you":""}">${r.name}</div>
            <div class="chal-score-pts${h?" chal-you":""}">${r.score} pts · ${r.waves}/${this._waves.length} waves</div>
          </div>`}).join("");this._el.innerHTML=`
      <div class="chal-header">
        <div class="chal-title">⚡ Daily Challenge</div>
        <button class="chal-close" id="chal-close">✕ Close</button>
      </div>
      <div class="chal-body">
        <div class="chal-card">
          <div class="chal-card-title">Today's Gauntlet — ${a}</div>
          <div class="chal-seed-label">SEED: ${t}</div>
          <div class="chal-waves">${s}</div>
          ${this._done?`<div class="chal-complete-banner">✓ Challenge Complete! Score: ${this._score} pts (${this._wavesCleared}/${this._waves.length} waves)</div>`:`<button class="chal-start-btn" id="chal-start">${this._wavesCleared>0?`⚡ Continue — Wave ${this._wavesCleared+1}`:"⚡ Begin Challenge"}</button>`}
        </div>
        <div class="chal-card">
          <div class="chal-card-title">Today's Leaderboard</div>
          ${i}
          <div style="margin-top:0.4rem" class="chal-info">Scores are stored locally. +100 pts per wave cleared, ×wave multiplier.</div>
        </div>
        <div class="chal-info" style="text-align:center">Challenge resets daily at midnight. All local scores visible.</div>
      </div>
    `,this._el.querySelector("#chal-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(o=this._el.querySelector("#chal-start"))==null||o.addEventListener("click",()=>this._startNextWave())}_startNextWave(){const e=this._waves[this._wavesCleared];if(!e)return;this._running=!0;const t={enemies:e.enemies,_zoneId:"border_roads",_bossNodeId:this._wavesCleared===this._waves.length-1?"challenge_final":null,isChallengeMode:!0};this.manager.push(new O(this.manager,this.audio,t))}}const St=["STR","DEX","INT","CON"],Tt=10,R=8,Ct=100,Et=15;class Mt{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._name="",this._class=null,this._attrs={STR:R,DEX:R,INT:R,CON:R},this._pointsSpent=0,this._step="class"}get _pointsLeft(){return Tt-this._pointsSpent}_hireCost(){return Ct+this._pointsSpent*Et}onEnter(){C("hire-builder-styles",$t),this._el=w("div","hb-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML="",this._step==="class"?this._renderClassStep():this._renderStatsStep()}_renderClassStep(){var t;this._el.innerHTML=`
      <div class="hb-header">
        <div class="hb-title">Hire a Mercenary</div>
        <div class="hb-subtitle">Choose class — cost: ${this._hireCost()} gold (increases with attributes)</div>
      </div>
      <div class="hb-class-grid" id="hb-class-grid"></div>
      <div class="hb-footer">
        <button class="hb-btn hb-btn-ghost" id="hb-cancel">✕ Cancel</button>
        <button class="hb-btn hb-btn-primary" id="hb-next" disabled>Next →</button>
      </div>
    `;const e=this._el.querySelector("#hb-class-grid");for(const a of te){const s=w("div",`hb-class-card${((t=this._class)==null?void 0:t.id)===a.id?" selected":""}`);s.innerHTML=`<div class="hb-cls-name">${a.name}</div><div class="hb-cls-role">${a.role}</div>`,s.addEventListener("click",()=>{this._class=a,this._el.querySelectorAll(".hb-class-card").forEach(i=>i.classList.remove("selected")),s.classList.add("selected"),this._el.querySelector("#hb-next").disabled=!1}),e.appendChild(s)}this._el.querySelector("#hb-cancel").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelector("#hb-next").addEventListener("click",()=>{this._class&&(this.audio.playSfx("click"),this._step="stats",this._render())})}_renderStatsStep(){const e=this._class,t=this._hireCost(),s=m.getGold()>=t;this._el.innerHTML=`
      <div class="hb-header">
        <div class="hb-title">${e.name} Mercenary</div>
        <div class="hb-subtitle">${this._pointsLeft} attribute points remaining · <span class="hb-cost-tag${s?"":" hb-cost-warn"}">Hire Cost: ${t} gold</span></div>
      </div>
      <div class="hb-stats-wrap">
        <div class="hb-name-row">
          <label class="hb-label">Name</label>
          <input class="hb-name-input" id="hb-name" type="text" maxlength="16" placeholder="Mercenary name..." value="${this._name}">
        </div>
        <div class="hb-attrs" id="hb-attrs">
          ${St.map(i=>`
            <div class="hb-attr-row">
              <div class="hb-attr-label">${i}</div>
              <button class="hb-attr-btn hb-attr-dec" data-attr="${i}" ${this._attrs[i]<=R?"disabled":""}>−</button>
              <div class="hb-attr-val">${this._attrs[i]}</div>
              <button class="hb-attr-btn hb-attr-inc" data-attr="${i}" ${this._pointsLeft<=0?"disabled":""}>+</button>
            </div>
          `).join("")}
        </div>
        <div class="hb-class-preview">
          <div class="hb-cls-desc">${e.description||e.role}</div>
        </div>
      </div>
      <div class="hb-footer">
        <button class="hb-btn hb-btn-ghost" id="hb-back">← Back</button>
        <button class="hb-btn hb-btn-primary${s?"":" disabled"}" id="hb-hire" ${s?"":"disabled"}>Hire (${t} G)</button>
      </div>
    `,this._el.querySelector("#hb-name").addEventListener("input",i=>{this._name=i.target.value}),this._el.querySelector("#hb-back").addEventListener("click",()=>{this.audio.playSfx("click"),this._step="class",this._render()}),this._el.querySelectorAll(".hb-attr-inc").forEach(i=>{i.addEventListener("click",()=>{if(this._pointsLeft<=0)return;const o=i.dataset.attr;this._attrs[o]++,this._pointsSpent++,this.audio.playSfx("click"),this._render()})}),this._el.querySelectorAll(".hb-attr-dec").forEach(i=>{i.addEventListener("click",()=>{const o=i.dataset.attr;this._attrs[o]<=R||(this._attrs[o]--,this._pointsSpent--,this.audio.playSfx("click"),this._render())})}),this._el.querySelector("#hb-hire").addEventListener("click",()=>{const i=this._el.querySelector("#hb-name").value.trim()||`${e.name} Merc`,o=this._hireCost();if(m.getGold()<o)return;this.audio.playSfx("purchase"),m.addGold(-o);const l=m.get(),c={id:`merc_${Date.now()}`,name:i,class:e.id,className:e.name,level:1,hp:50+this._attrs.CON*10,maxHp:50+this._attrs.CON*10,mp:30+this._attrs.INT*8,maxMp:30+this._attrs.INT*8,attrs:{...this._attrs},equipment:{},xp:0,xpToNext:100,pendingAttrPoints:0};let h=!1;if(l.party.length<4?l.party.push(c):(l.bench=l.bench||[],l.bench.push(c),h=!0),this.manager.pop(),h){const d=this.manager.uiOverlay;if(d){if(!document.getElementById("town-toast-keyframes")){const f=document.createElement("style");f.id="town-toast-keyframes",f.textContent="@keyframes town-toast-fade{0%{opacity:1}70%{opacity:1}100%{opacity:0}}",document.head.appendChild(f)}const u=document.createElement("div");u.style.cssText="position:absolute;bottom:5rem;left:50%;transform:translateX(-50%);background:rgba(20,12,28,0.95);border:1px solid rgba(232,200,64,0.4);color:#e8c840;padding:0.5rem 1rem;border-radius:6px;font-size:0.78rem;pointer-events:none;z-index:100;max-width:90%;text-align:center;animation:town-toast-fade 3s ease-out forwards",u.textContent=`Party full — ${c.name} sent to reserves. Manage your party to swap them in.`,d.appendChild(u),setTimeout(()=>u.remove(),3200)}}})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const $t=`
.hb-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: linear-gradient(180deg,#06040a,#0e0818); color: #f0e8d8;
  font-family: 'Inter', sans-serif;
}
.hb-header {
  padding: 1.25rem 1.5rem 0.75rem; border-bottom: 1px solid rgba(232,160,32,0.15);
  background: rgba(0,0,0,0.3); flex-shrink: 0; text-align: center;
}
.hb-title { font-family: 'Cinzel', serif; font-size: 1.4rem; font-weight: 900; color: #e8a020; }
.hb-subtitle { font-size: 0.75rem; color: #8a7a6a; margin-top: 0.3rem; }
.hb-cost-tag { color: #60d080; font-weight: 600; }
.hb-cost-warn { color: #c04030; }
.hb-class-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.6rem; padding: 1rem; overflow-y: auto; flex: 1;
}
.hb-class-card {
  padding: 0.85rem; background: rgba(20,12,28,0.7);
  border: 1px solid rgba(112,64,192,0.15); border-radius: 8px;
  cursor: pointer; text-align: center; transition: all 0.2s; min-height: 64px;
}
.hb-class-card:hover { border-color: rgba(232,160,32,0.35); background: rgba(232,160,32,0.06); }
.hb-class-card.selected { border-color: rgba(232,160,32,0.7); background: rgba(232,160,32,0.12); }
.hb-cls-name { font-family: 'Cinzel', serif; font-size: 0.82rem; font-weight: 700; color: #e8a020; }
.hb-cls-role { font-size: 0.62rem; color: #8a7a6a; margin-top: 0.2rem; }
.hb-stats-wrap { flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem; }
.hb-name-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
.hb-label { font-size: 0.72rem; color: #8a7a6a; white-space: nowrap; min-width: 40px; }
.hb-name-input {
  flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px; color: #f0e8d8; font-size: 0.9rem; padding: 0.5rem 0.75rem;
  font-family: 'Inter', sans-serif; max-width: 260px;
}
.hb-attrs { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem; }
.hb-attr-row { display: flex; align-items: center; gap: 0.75rem; }
.hb-attr-label { font-family: 'Cinzel', serif; font-size: 0.82rem; font-weight: 700; color: #a080e0; min-width: 40px; }
.hb-attr-btn {
  width: 36px; height: 36px; border-radius: 50%; background: rgba(112,64,192,0.15);
  border: 1px solid rgba(112,64,192,0.4); color: #a080e0; font-size: 1.1rem;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.hb-attr-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.hb-attr-val { font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 700; min-width: 32px; text-align: center; color: #f0e8d8; }
.hb-cls-desc { font-size: 0.8rem; color: #c0b090; line-height: 1.6; margin-bottom: 0.75rem; }
.hb-footer {
  padding: 0.85rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.06);
  display: flex; justify-content: space-between; gap: 1rem; flex-shrink: 0;
  background: rgba(0,0,0,0.3);
}
.hb-btn {
  padding: 0.75rem 1.5rem; border-radius: 8px;
  font-family: 'Cinzel', serif; font-weight: 700; font-size: 0.88rem;
  cursor: pointer; min-height: 48px; transition: background 0.15s;
}
.hb-btn-ghost { background: none; border: 1px solid rgba(255,255,255,0.15); color: #8a7a6a; }
.hb-btn-ghost:hover { color: #f0e8d8; border-color: rgba(255,255,255,0.3); }
.hb-btn-primary { background: rgba(232,160,32,0.15); border: 1px solid rgba(232,160,32,0.5); color: #e8a020; }
.hb-btn-primary:hover:not(.disabled) { background: rgba(232,160,32,0.28); }
.hb-btn-primary.disabled { opacity: 0.35; cursor: not-allowed; }
`,le=[{id:"aela",name:"Aela",className:"Ranger",class:"ranger",level:1,cost:80,attrs:{STR:8,DEX:14,INT:8,CON:10},personality:"patient",description:"A quiet ranger from the eastern border. Waits for the perfect shot.",personalityNote:"Patient — prefers precise strikes over rushing in."},{id:"borin",name:"Borin",className:"Warrior",class:"warrior",level:1,cost:90,attrs:{STR:14,DEX:8,INT:6,CON:12},personality:"aggressive",description:"Retired soldier. Bored. Wants one last fight.",personalityNote:"Aggressive — always targets the strongest enemy first."},{id:"lysa",name:"Lysa",className:"Cleric",class:"cleric",level:2,cost:120,attrs:{STR:8,DEX:8,INT:14,CON:10},personality:"protective",description:"Young cleric of the Light. Eager to prove herself outside the temple.",personalityNote:"Protective — prioritizes healing injured allies."},{id:"rekk",name:"Rekk",className:"Rogue",class:"rogue",level:1,cost:70,attrs:{STR:8,DEX:14,INT:9,CON:9},personality:"opportunist",description:"Says he's not a thief. Has three knives.",personalityNote:"Opportunist — strikes weakened enemies to finish them."}],de=[{id:"war_dog",name:"War Dog",className:"Companion",class:"companion",level:1,cost:50,isCompanion:!0,attrs:{STR:10,DEX:12,INT:2,CON:10},description:"Loyal, fierce, and surprisingly effective against goblins. Bites hard."}];function Lt(){return[$("sword","normal","medium"),$("dagger","normal","medium"),$("staff","magic","medium"),$("bow","normal","medium"),$("light_chest","normal","medium"),$("cloth_chest","magic","medium"),$("heavy_helm","normal","low"),$("light_legs","normal","medium"),$("ring","magic","medium"),$("necklace","magic","medium")]}class be{constructor(e,t,a,s=!1){this.manager=e,this.audio=t,this.isNewGame=s,this._el=null,this._activeService=null,this._merchantStock=Lt(),this._tooltip=null,a!=null&&a.party||a&&m.init(a)}onEnter(){this.audio.playTownMusic(),this._build()}_build(){C("town-styles",At),this._el=w("div","town-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){m.get().party[0];const t=m.getGold();this._el.innerHTML=`
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
            <div class="gold-display" style="flex-direction:column;align-items:flex-end;gap:0.2rem">
              <div style="display:flex;align-items:center;gap:0.35rem">
                <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="9" fill="#e8a020"/><text x="10" y="14" text-anchor="middle" font-size="11" fill="#0a0608" font-weight="900">G</text></svg>
                <span id="gold-amount">${t.toLocaleString()}</span>
              </div>
              <div style="font-size:0.62rem;color:#8a7a6a">⭐ ${m.getFame()} Fame · ${m.getFameTitle()}${m.getNgPlus()>0?` · <span style="color:#e8d020">NG+${m.getNgPlus()}</span>`:""}</div>
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
          ${m.getPortal()?'<button class="action-btn action-portal" id="btn-portal">✦ Return to Portal</button>':""}
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
          <button class="action-btn" id="btn-journal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
            Quests
          </button>
          <button class="action-btn" id="btn-challenge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Daily
          </button>
          <button class="action-btn" id="btn-forge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3a1 1 0 000-1.4l-1.6-1.6a1 1 0 00-1.4 0z"/><path d="M5 20l6-6m-6 6h3v-3"/><path d="M11 14l-2-2"/></svg>
            Forge
          </button>
          <button class="action-btn" id="btn-codex">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            Codex
          </button>
          <button class="action-btn" id="btn-party">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6"/></svg>
            Party
          </button>
          <button class="action-btn" id="btn-achievements">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
            Trophies
          </button>
          <div class="action-separator"></div>
          <button class="action-btn action-leave" id="btn-leave">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Set Out
          </button>
        </aside>
      </div>
      <div id="tt-el" class="item-tooltip" style="display:none"></div>
    `,this._renderPartyPanel(),this._wireEvents()}_renderPartyPanel(){const e=m.get(),t=this._el.querySelector("#party-slots"),a=this._el.querySelector("#companion-slots");for(let s=0;s<4;s++){const i=e.party[s],o=w("div",`party-slot${i?"":" empty"}`);i?(50+i.attrs.CON*10,o.innerHTML=`
          <div class="ps-icon">${this._getClassSvg(i.class)}</div>
          <div class="ps-info">
            <div class="ps-name">${i.name}</div>
            <div class="ps-class">${i.className||i.class} Lv${i.level}</div>
            <div class="ps-hp-bar"><div class="ps-hp-fill" style="width:100%"></div></div>
          </div>
        `):o.innerHTML='<div class="ps-empty">Empty</div>',t.appendChild(o)}for(let s=0;s<4;s++){const i=e.companions[s],o=w("div",`party-slot${i?"":" empty"}`);i?o.innerHTML=`<div class="ps-icon">🐾</div><div class="ps-info"><div class="ps-name">${i.name}</div><div class="ps-class">${i.className}</div></div>`:o.innerHTML='<div class="ps-empty">Empty</div>',a.appendChild(o)}}_renderServiceContent(){switch(this._activeService){case"merchant":return this._merchantHTML();case"tavern":return this._tavernHTML();case"cleric":return this._clericHTML();case"blacksmith":return this._blacksmithHTML();case"enchanter":return this._enchanterHTML();default:return this._townOverviewHTML()}}_townOverviewHTML(){return`
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
                <div class="ic-name" style="color:${A[t.rarity]}">${t.name}</div>
                <div class="ic-type">${t.subtype||t.type}</div>
                <div class="ic-stats">${t.dmg?`${t.dmg[0]}-${t.dmg[1]} dmg`:t.armor?`+${t.armor} armor`:""}</div>
                <div class="ic-price">${this._itemPrice(t)} G</div>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="merchant-potions">
          <div class="svc-section-title">Potions &amp; Consumables</div>
          <div class="potion-grid" id="potion-items">
            ${re.map(t=>`
              <div class="potion-card">
                <div class="pc-icon">${t.icon}</div>
                <div class="pc-info">
                  <div class="pc-name">${t.name}</div>
                  <div class="pc-desc">${t.desc}</div>
                </div>
                <button class="hire-btn pc-buy${m.getGold()>=t.cost?"":" disabled"}" data-buy-potion="${t.id}" data-cost="${t.cost}" ${m.getGold()>=t.cost?"":"disabled"}>${t.cost} G</button>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="merchant-inventory">
          <div class="svc-section-title">Your Inventory (${e.inventory.length} items)</div>
          <div class="item-grid" id="inventory-items">
            ${e.inventory.length===0?'<div class="empty-state">No items to sell.</div>':e.inventory.map(t=>`
                <div class="item-card" data-id="${t.id}" data-section="sell">
                  <div class="ic-name" style="color:${A[t.rarity]}">${t.name}</div>
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
          ${le.map(a=>{const s=e.party.find(r=>r.id===a.id),i=e.bench.find(r=>r.id===a.id),o=t>=a.cost;return`
              <div class="hireable-card${s||i?" hired":""}">
                <div class="hc-portrait">${this._getClassSvg(a.class)}</div>
                <div class="hc-info">
                  <div class="hc-name">${a.name} <span class="hc-class">${a.className} Lv${a.level}</span></div>
                  <div class="hc-desc">${a.description}</div>
                  ${a.personalityNote?`<div class="hc-personality">🎭 ${a.personalityNote}</div>`:""}
                  <div class="hc-attrs">STR ${a.attrs.STR} · DEX ${a.attrs.DEX} · INT ${a.attrs.INT} · CON ${a.attrs.CON}</div>
                </div>
                <div class="hc-action">
                  ${s?'<span class="hired-badge">In Party</span>':i?'<span class="hired-badge">At Bench</span>':`<button class="hire-btn${o?"":" disabled"}" data-hire="${a.id}" data-cost="${a.cost}" ${o?"":"disabled"}>
                      Hire <br><small>${a.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
        <div class="svc-section-title" style="margin-top:1.5rem;display:flex;align-items:center;justify-content:space-between">
          <span>Custom Hire</span>
          <button class="hire-btn" id="btn-custom-hire" style="font-size:0.72rem;padding:0.35rem 0.75rem;min-height:36px">Build Mercenary…</button>
        </div>
        <div style="font-size:0.72rem;color:#8a7a6a;margin-bottom:1rem">Design your own hero. Cost: 100 + 15 G per attribute point spent.</div>
        <div class="svc-section-title" style="margin-top:0.5rem">Companions for Purchase</div>
        <div class="hireable-list">
          ${de.map(a=>{const s=e.companions.find(o=>o.id===a.id),i=t>=a.cost;return`
              <div class="hireable-card${s?" hired":""}">
                <div class="hc-portrait"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="6"/><path d="M8 32c0-6 4-10 10-10s10 4 10 10"/></svg></div>
                <div class="hc-info">
                  <div class="hc-name">${a.name} <span class="hc-class">${a.className}</span></div>
                  <div class="hc-desc">${a.description}</div>
                </div>
                <div class="hc-action">
                  ${s?'<span class="hired-badge">Purchased</span>':`<button class="hire-btn${i?"":" disabled"}" data-hire="${a.id}" data-cost="${a.cost}" data-companion="true" ${i?"":"disabled"}>
                      Buy <br><small>${a.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}_clericHTML(){const e=m.get(),t=[...e.party,...e.companions],a=t.filter(c=>c.hp<=0||c.dead),s=t.filter(c=>c.hp>0&&c.hp<(c.maxHp||100)),i=m.getGold(),o=50,r=Math.max(10,s.length*15),l=s.length===0&&a.length===0;return`
      <div class="cleric-layout">
        <div class="svc-section-title">Cleric of the Light — Services</div>
        <!-- Rest / Heal -->
        <div class="cleric-service-block">
          <div class="csb-title">Rest &amp; Recover</div>
          <div class="csb-desc">${l?"Your party is fully healed and rested.":`Restore all HP and MP for ${r} gold.`}</div>
          ${l?"":`<button class="hire-btn${i>=r?"":" disabled"}" id="btn-rest" ${i>=r?"":"disabled"}>
            Rest (${r} G)
          </button>`}
        </div>
        <!-- Revive -->
        <div class="svc-section-title" style="margin-top:1rem">Revive — ${o} G per hero</div>
        ${a.length===0?'<div class="empty-state" style="padding:1rem;text-align:center;color:#8a7a6a">All party members are alive.</div>':a.map(c=>`
            <div class="hireable-card">
              <div class="hc-portrait">${this._getClassSvg(c.class)}</div>
              <div class="hc-info">
                <div class="hc-name">${c.name}</div>
                <div class="hc-desc" style="color:#c04030">Has fallen in battle.</div>
              </div>
              <div class="hc-action">
                <button class="hire-btn${i>=o?"":" disabled"}" data-revive="${c.id}" ${i>=o?"":"disabled"}>
                  Revive<br><small>${o} G</small>
                </button>
              </div>
            </div>
          `).join("")}
        <div class="cleric-note" style="margin-top:0.5rem">Reviving restores a fallen hero to 25% HP.</div>
      </div>
    `}_showSaveModal(){const e=w("div","save-modal");if(e.innerHTML=`
      <div class="sm-overlay"></div>
      <div class="sm-box">
        <div class="sm-title">Save Game</div>
        <div class="sm-slots">
          ${[0,1,2].map(t=>{const a=I.getSlot(t);return`<button class="sm-slot-btn" data-slot="${t}">
              <span class="smsb-num">Slot ${t+1}</span>
              <span class="smsb-info">${a?`${a.heroName} · Lv${a.level}`:"Empty"}</span>
            </button>`}).join("")}
        </div>
        <button class="sm-cancel" id="sm-cancel">Cancel</button>
      </div>
    `,e.querySelector("#sm-cancel").addEventListener("click",()=>v(e)),e.querySelector(".sm-overlay").addEventListener("click",()=>v(e)),e.querySelectorAll(".sm-slot-btn").forEach(t=>{t.addEventListener("click",()=>{I.saveCurrentGame(parseInt(t.dataset.slot)),this.audio.playSfx("victory"),v(e),this._showNotif("Game saved!")})}),this.manager.uiOverlay.appendChild(e),!document.getElementById("save-modal-styles")){const t=document.createElement("style");t.id="save-modal-styles",t.textContent=".save-modal{position:absolute;inset:0;z-index:500;display:flex;align-items:center;justify-content:center}.sm-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.75)}.sm-box{position:relative;z-index:1;background:#1a1218;border:1px solid rgba(232,160,32,0.3);border-radius:12px;padding:2rem;min-width:280px;max-width:340px;width:90%}.sm-title{font-family:'Cinzel',serif;font-size:1.2rem;font-weight:700;color:#e8a020;margin-bottom:1.25rem;text-align:center}.sm-slots{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.25rem}.sm-slot-btn{display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:rgba(26,18,24,0.9);border:1px solid rgba(232,160,32,0.15);border-radius:6px;color:#f0e8d8;cursor:pointer;min-height:48px;transition:border-color 0.15s}.sm-slot-btn:hover{border-color:rgba(232,160,32,0.5)}.smsb-num{font-size:0.75rem;color:#8a7a6a}.smsb-info{font-size:0.82rem;font-family:'Cinzel',serif;font-weight:600}.sm-cancel{width:100%;padding:0.65rem;background:none;border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#8a7a6a;cursor:pointer;font-size:0.82rem}.sm-cancel:hover{color:#f0e8d8}",document.head.appendChild(t)}}_showNotif(e){const t=w("div","save-notif");t.textContent=e,t.style.cssText="position:absolute;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(232,160,32,0.9);color:#0a0608;padding:0.5rem 1.25rem;border-radius:20px;font-weight:700;font-size:0.85rem;z-index:600;pointer-events:none;animation:notifIn 0.3s ease";const a=document.createElement("style");a.textContent="@keyframes notifIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}",document.head.appendChild(a),this._el.appendChild(t),setTimeout(()=>v(t),2e3)}_blacksmithHTML(){const t=m.get().inventory.filter(r=>r.rarity!=="legendary"&&r.quality!=="exotic"),a=["normal","magic","rare","legendary"],s=["low","medium","high","elite","exotic"],i={normal:60,magic:150,rare:400},o={low:40,medium:100,high:250,elite:600};return t.length?`
      <div class="bs-panel">
        <div class="bs-title">Blacksmith — Forged in Ember</div>
        <div class="bs-subtitle">Upgrade the rarity or quality of your equipment.</div>
        <div class="bs-items" id="bs-items">
          ${t.map(r=>{const l=a[a.indexOf(r.rarity)+1],c=s[s.indexOf(r.quality)+1],h=l?i[r.rarity]:null,d=c?o[r.quality]:null;return`
              <div class="bs-item">
                <div class="bs-iname" style="color:${A[r.rarity]}">${r.name}</div>
                <div class="bs-isub">${r.rarity} · ${r.quality}</div>
                <div class="bs-actions">
                  ${h?`<button class="bs-btn" data-action="rarity" data-id="${r.id}" data-cost="${h}" data-next="${l}">
                    Upgrade to <strong>${l}</strong> — ${h}g
                  </button>`:'<span class="bs-maxed">Max Rarity</span>'}
                  ${d?`<button class="bs-btn" data-action="quality" data-id="${r.id}" data-cost="${d}" data-next="${c}">
                    Upgrade to <strong>${c}</strong> quality — ${d}g
                  </button>`:'<span class="bs-maxed">Max Quality</span>'}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:'<div class="coming-soon"><div class="cs-title">Blacksmith</div><div class="cs-text">No upgradeable items in your inventory.</div></div>'}_enchanterHTML(){const t=m.get().inventory.filter(i=>{var r;const o=i.rarity==="legendary"?6:i.rarity==="rare"?4:i.rarity==="magic"?2:0;return o>0&&(((r=i.affixes)==null?void 0:r.length)||0)<o}),a={magic:80,rare:200,legendary:500},s=[{id:"of_str",name:"Sturdy +STR",stat:"str",min:2,max:5},{id:"of_dex",name:"Swift +DEX",stat:"dex",min:2,max:5},{id:"of_int",name:"Wise +INT",stat:"int",min:2,max:5},{id:"of_con",name:"Hardy +CON",stat:"con",min:2,max:5},{id:"of_hp",name:"Vitality +HP",stat:"hp",min:10,max:25},{id:"of_armor",name:"Reinforced +Armor",stat:"armor",min:2,max:5}];return t.length?`
      <div class="bs-panel">
        <div class="bs-title">Enchanter — Threads of Power</div>
        <div class="bs-subtitle">Add a new enchantment to an item with open affix slots.</div>
        <div class="bs-items" id="enc-items">
          ${t.map(i=>{var h;const o=a[i.rarity]||100,l=(i.rarity==="legendary"?6:i.rarity==="rare"?4:2)-(((h=i.affixes)==null?void 0:h.length)||0),c=s.filter(d=>{var u;return!((u=i.affixes)!=null&&u.find(f=>f.id===d.id))});return`
              <div class="bs-item">
                <div class="bs-iname" style="color:${A[i.rarity]}">${i.name}</div>
                <div class="bs-isub">${i.rarity} · ${l} open slot${l!==1?"s":""}</div>
                <div class="enc-affixes">
                  ${c.map(d=>`
                    <button class="bs-btn enc-btn" data-action="enchant" data-iid="${i.id}" data-aid="${d.id}" data-cost="${o}">
                      ${d.name} — ${o}g
                    </button>
                  `).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:'<div class="coming-soon"><div class="cs-title">Enchanter</div><div class="cs-text">No enchantable items (need Magic, Rare, or Legendary rarity with open affix slots).</div></div>'}_getClassSvg(e){const t=te.find(a=>a.id===e);return(t==null?void 0:t.svgIcon)||'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="18" r="12"/></svg>'}_wireEvents(){var e,t,a,s,i,o,r,l,c,h,d,u;this._el.querySelectorAll(".svc-tab").forEach(f=>{f.addEventListener("click",()=>{this.audio.playSfx("click");const g=f.dataset.svc;this._activeService=this._activeService===g?null:g,this._refreshServicePanel()})}),this._el.querySelectorAll(".overview-card").forEach(f=>{f.addEventListener("click",()=>{this.audio.playSfx("click"),this._activeService=f.dataset.svc,this._refreshServicePanel()})}),(e=this._el.querySelector("#btn-map"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Q(this.manager,this.audio))}),(t=this._el.querySelector("#btn-portal"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click");const f=m.getPortal();if(f){const g=m.get();g.zoneId=f.zoneId,g.nodeId=f.nodeId,this.manager.push(new Q(this.manager,this.audio))}}),(a=this._el.querySelector("#btn-leave"))==null||a.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Q(this.manager,this.audio))}),(s=this._el.querySelector("#btn-inventory"))==null||s.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Ke(this.manager,this.audio))}),(i=this._el.querySelector("#btn-skills"))==null||i.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new et(this.manager,this.audio))}),(o=this._el.querySelector("#btn-save"))==null||o.addEventListener("click",()=>{this.audio.playSfx("click"),this._showSaveModal()}),(r=this._el.querySelector("#btn-journal"))==null||r.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new st(this.manager,this.audio))}),(l=this._el.querySelector("#btn-achievements"))==null||l.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new rt(this.manager,this.audio))}),(c=this._el.querySelector("#btn-party"))==null||c.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ht(this.manager,this.audio))}),(h=this._el.querySelector("#btn-codex"))==null||h.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ut(this.manager,this.audio))}),(d=this._el.querySelector("#btn-forge"))==null||d.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ft(this.manager,this.audio))}),(u=this._el.querySelector("#btn-challenge"))==null||u.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new kt(this.manager,this.audio))}),this._wireServiceEvents()}_wireServiceEvents(){var e,t;this._el.querySelectorAll('[data-section="buy"]').forEach(a=>{a.addEventListener("click",()=>{const s=this._merchantStock.find(o=>o.id===a.dataset.id);if(!s)return;const i=this._itemPrice(s);m.getGold()<i||(m.addGold(-i),m.addToInventory(s),this._merchantStock=this._merchantStock.filter(o=>o.id!==s.id),this.audio.playSfx("click"),this._refreshAll())}),a.addEventListener("mouseenter",s=>this._showTooltip(s,a.dataset.id,"stock")),a.addEventListener("mouseleave",()=>this._hideTooltip())}),this._el.querySelectorAll("[data-buy-potion]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const s=a.dataset.buyPotion,i=parseInt(a.dataset.cost);if(m.getGold()<i)return;const o=re.find(l=>l.id===s);if(!o)return;m.addGold(-i);const r=m.get();r.potions||(r.potions=[]),r.potions.push({...o,uid:crypto.randomUUID()}),this.audio.playSfx("purchase"),this._refreshAll()})}),this._el.querySelectorAll('[data-section="sell"]').forEach(a=>{a.addEventListener("click",()=>{const i=m.get().inventory.find(o=>o.id===a.dataset.id);i&&(m.addGold(Math.floor(this._itemPrice(i)*.4)),m.removeFromInventory(i.id),this.audio.playSfx("click"),this._refreshAll())})}),this._el.querySelectorAll("[data-hire]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const s=a.dataset.hire,i=parseInt(a.dataset.cost),o=a.dataset.companion==="true";this.audio.playSfx("click");const r=o?de.find(h=>h.id===s):le.find(h=>h.id===s);if(!r||m.getGold()<i)return;m.addGold(-i);const l={...r,id:r.id+"_"+Date.now(),hp:50+r.attrs.CON*10,maxHp:50+r.attrs.CON*10,mp:30+r.attrs.INT*8,maxMp:30+r.attrs.INT*8,xp:0,pendingAttrPoints:0,equipment:{},skills:[]};let c=!1;o?m.addToCompanions(l)||(m.addToBench(l),c=!0):m.addToParty(l)||(m.addToBench(l),c=!0),this._refreshAll(),c&&this._showToast(`Party full — ${l.name} sent to reserves. Manage your party to swap them in.`)})}),(e=this._el.querySelector("#btn-custom-hire"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Mt(this.manager,this.audio))}),this._el.querySelectorAll('.bs-btn[data-action="rarity"]').forEach(a=>{a.addEventListener("click",()=>{const i=m.get().inventory.find(r=>r.id===a.dataset.id),o=parseInt(a.dataset.cost);!i||m.getGold()<o||(m.addGold(-o),i.rarity=a.dataset.next,this.audio.playSfx("click"),this._refreshAll())})}),this._el.querySelectorAll('.bs-btn[data-action="quality"]').forEach(a=>{a.addEventListener("click",()=>{const i=m.get().inventory.find(d=>d.id===a.dataset.id),o=parseInt(a.dataset.cost);if(!i||m.getGold()<o)return;m.addGold(-o),i.quality=a.dataset.next;const r=["low","medium","high","elite","exotic"],l=r.indexOf(i.quality===a.dataset.next?r[r.indexOf(a.dataset.next)-1]:i.quality),c=r.indexOf(a.dataset.next),h=[.7,1,1.2,1.4,1.6][c]/[.7,1,1.2,1.4,1.6][l];i.armor&&(i.armor=Math.round(i.armor*h)),i.dmg&&(i.dmg=i.dmg.map(d=>Math.round(d*h))),this.audio.playSfx("click"),this._refreshAll()})}),this._el.querySelectorAll('.enc-btn[data-action="enchant"]').forEach(a=>{a.addEventListener("click",()=>{const i=m.get().inventory.find(h=>h.id===a.dataset.iid),o=parseInt(a.dataset.cost);if(!i||m.getGold()<o)return;const l={of_str:{id:"of_str",name:"Sturdy",stat:"str",min:2,max:5},of_dex:{id:"of_dex",name:"Swift",stat:"dex",min:2,max:5},of_int:{id:"of_int",name:"Wise",stat:"int",min:2,max:5},of_con:{id:"of_con",name:"Hardy",stat:"con",min:2,max:5},of_hp:{id:"of_hp",name:"Vitality",stat:"hp",min:10,max:25},of_armor:{id:"of_armor",name:"Reinforced",stat:"armor",min:2,max:5}}[a.dataset.aid];if(!l)return;const c=Math.round(l.min+Math.random()*(l.max-l.min));i.affixes||(i.affixes=[]),i.affixes.push({...l,value:c}),m.addGold(-o),this.audio.playSfx("spell"),this._refreshAll()})}),(t=this._el.querySelector("#btn-rest"))==null||t.addEventListener("click",()=>{const a=m.get(),s=[...a.party,...a.companions],i=s.filter(r=>r.hp>0&&r.hp<(r.maxHp||100)),o=Math.max(10,i.length*15);m.getGold()<o||(m.addGold(-o),s.forEach(r=>{var l,c;r.hp>0&&(r.hp=r.maxHp||50+(((l=r.attrs)==null?void 0:l.CON)||10)*10,r.mp=r.maxMp||30+(((c=r.attrs)==null?void 0:c.INT)||8)*8)}),this.audio.playSfx("levelup"),this._refreshAll())}),this._el.querySelectorAll("[data-revive]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const s=a.dataset.revive,i=m.get(),o=[...i.party,...i.companions].find(r=>r.id===s);o&&(m.addGold(-50),o.hp=Math.floor((50+o.attrs.CON*10)*.5),o.dead=!1,this.audio.playSfx("click"),this._refreshAll())})})}_showTooltip(e,t,a){const s=a==="stock"?this._merchantStock.find(o=>o.id===t):m.get().inventory.find(o=>o.id===t);if(!s)return;const i=this._el.querySelector("#tt-el");i&&(i.innerHTML=me(s),i.style.display="block",i.style.left=`${Math.min(e.clientX+12,window.innerWidth-220)}px`,i.style.top=`${Math.max(8,e.clientY-60)}px`)}_hideTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#tt-el");e&&(e.style.display="none")}_refreshServicePanel(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#service-panel");e&&(this._el.querySelectorAll(".svc-tab").forEach(a=>{a.classList.toggle("active",a.dataset.svc===this._activeService)}),e.innerHTML=this._renderServiceContent(),this._wireServiceEvents())}_refreshAll(){var s,i,o;const e=(s=this._el)==null?void 0:s.querySelector("#gold-amount");e&&(e.textContent=m.getGold().toLocaleString()),this._refreshServicePanel();const t=(i=this._el)==null?void 0:i.querySelector("#party-slots"),a=(o=this._el)==null?void 0:o.querySelector("#companion-slots");t&&(t.innerHTML=""),a&&(a.innerHTML=""),this._renderPartyPanel()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}_showToast(e){if(!this._el)return;const t=document.createElement("div");if(!document.getElementById("town-toast-keyframes")){const a=document.createElement("style");a.id="town-toast-keyframes",a.textContent="@keyframes town-toast-fade{0%{opacity:1}70%{opacity:1}100%{opacity:0}}",document.head.appendChild(a)}t.style.cssText="position:absolute;bottom:5rem;left:50%;transform:translateX(-50%);background:rgba(20,12,28,0.95);border:1px solid rgba(232,200,64,0.4);color:#e8c840;padding:0.5rem 1rem;border-radius:6px;font-size:0.78rem;pointer-events:none;z-index:100;white-space:nowrap;max-width:90%;text-align:center;animation:town-toast-fade 3s ease-out forwards",t.textContent=e,this._el.appendChild(t),setTimeout(()=>t.remove(),3200)}update(){}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const At=`
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
/* Mobile: flex column, center scrolls, actions bar pinned at bottom */
@media (max-width: 600px) {
  .town-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  .party-panel { display: none; }
  .town-main {
    flex: 1;
    min-height: 0;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
  }
  .service-panel {
    overflow-y: visible !important;
    padding: 0.9rem 1rem 80px !important; /* 80px clearance so last items don't hide under the action bar */
  }
  .town-actions-panel {
    flex-shrink: 0;
    flex-direction: row !important;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0.45rem 0.5rem !important;
    border-left: none !important;
    border-top: 1px solid rgba(232,160,32,0.2) !important;
    gap: 0.35rem !important;
    background: rgba(4,2,8,0.92) !important;
  }
  .action-btn {
    min-height: 54px !important;
    min-width: 54px !important;
    padding: 0.4rem 0.3rem !important;
    font-size: 0.6rem !important;
    flex-shrink: 0;
    gap: 0.15rem !important;
    border-radius: 6px !important;
  }
  .action-btn svg { width: 18px !important; height: 18px !important; }
  .action-separator { display: none !important; }
  .action-leave { margin-top: 0 !important; }
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

.town-main { display: flex; flex-direction: column; overflow-y: auto; min-height: 0; }
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
.service-panel { flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem; min-height: 0; }

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
.merchant-potions { margin-bottom: 1.5rem; grid-column: 1 / -1; }
.potion-grid { display: flex; flex-direction: column; gap: 0.5rem; }
.potion-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; background: rgba(20,12,28,0.5); border: 1px solid rgba(80,200,120,0.12); border-radius: 7px; }
.pc-icon { font-size: 1.3rem; flex-shrink: 0; width: 32px; text-align: center; }
.pc-info { flex: 1; }
.pc-name { font-size: 0.78rem; font-weight: 600; color: #90d8a8; }
.pc-desc { font-size: 0.65rem; color: #8a7a6a; margin-top: 0.1rem; }
.pc-buy { font-size: 0.72rem; padding: 0.3rem 0.65rem; min-height: 36px; }
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
.hc-personality { font-size: 0.65rem; color: #8060c0; margin-top: 0.2rem; font-style: italic; }
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
.bs-panel { padding: 0.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.bs-title { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #e8a020; }
.bs-subtitle { font-size: 0.72rem; color: #8a7a6a; }
.bs-items { display: flex; flex-direction: column; gap: 0.6rem; max-height: 340px; overflow-y: auto; }
.bs-item { background: rgba(20,14,18,0.8); border: 1px solid rgba(255,255,255,0.07); border-radius: 6px; padding: 0.7rem; }
.bs-iname { font-weight: 600; font-size: 0.82rem; }
.bs-isub { font-size: 0.68rem; color: #8a7a6a; margin-bottom: 0.4rem; }
.bs-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.bs-btn {
  padding: 0.3rem 0.65rem; border-radius: 5px; border: 1px solid rgba(232,160,32,0.25);
  background: rgba(232,160,32,0.08); color: #e8c070; font-size: 0.7rem; cursor: pointer;
  transition: background 0.12s; min-height: 32px;
}
.bs-btn:hover { background: rgba(232,160,32,0.18); }
.bs-maxed { font-size: 0.68rem; color: #5a4a42; padding: 0.3rem 0; }
.enc-affixes { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.enc-btn { border-color: rgba(100,60,200,0.3); background: rgba(100,60,200,0.08); color: #c080ff; }
.enc-btn:hover { background: rgba(100,60,200,0.18); }

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
.action-portal { border-color: rgba(232,180,40,0.4); color: #e8b428; background: rgba(232,180,40,0.1); font-family: 'Cinzel', serif; font-weight: 700; }
.action-portal:hover { background: rgba(232,180,40,0.2); }
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
`,N=[{delay:.5,text:"The world did not end all at once."},{delay:2.5,text:"It unraveled."},{delay:5,text:"Three years ago, something tore through the fabric between realms — a wound that festered and spread, corrupting everything it touched."},{delay:10,text:"They called it the Emberveil."},{delay:13.5,text:"The border settlements fell first. Goblins, wolves, even the ancient stones of the road — all changed, driven by a single will from beyond."},{delay:20,text:"You arrived in Emberglen with little more than your skills and a rumor: someone is controlling the corruption. Someone — or something — with a purpose."},{delay:28,text:"If the Emberveil spreads to the capital, there will be nothing left to save."},{delay:34,text:"Your journey begins here."}];class zt{constructor(e,t,a){this.manager=e,this.audio=t,this.onComplete=a,this._el=null,this._t=0,this._phase="FADE_IN",this._skipPressed=!1}onEnter(){this._build()}_build(){C("cinematic-styles",It),this._el=w("div","cinematic-screen"),this._el.innerHTML=`
      <canvas class="cin-canvas" id="cin-canvas"></canvas>
      <div class="cin-overlay" id="cin-overlay">
        <div class="cin-content" id="cin-content"></div>
        <div class="cin-skip" id="cin-skip">Tap to skip</div>
      </div>
    `,this.manager.uiOverlay.appendChild(this._el);const e=this._el.querySelector("#cin-canvas");e.width=this.manager.width,e.height=this.manager.height,this._canvas=e,this._ctx=e.getContext("2d"),this._el.querySelector("#cin-skip").addEventListener("click",()=>{this._skipPressed=!0,this._finish()}),this._totalDuration=N[N.length-1].delay+4}update(e){var i,o;if(this._t+=e,this._drawBackground(),this._skipPressed)return;const t=(i=this._el)==null?void 0:i.querySelector("#cin-overlay");if(!t)return;this._t<1?t.style.opacity=this._t:this._t>this._totalDuration-1.5?t.style.opacity=Math.max(0,1-(this._t-(this._totalDuration-1.5))/1.5):t.style.opacity=1;const a=(o=this._el)==null?void 0:o.querySelector("#cin-content");if(!a)return;let s="";for(const r of N)if(this._t>=r.delay){const l=this._t-r.delay,c=Math.min(1,l/.8),h=r.delay<N[N.length-1].delay?Math.max(0,1-(l-5)/1.5):1,d=Math.min(c,h);d>0&&(s+=`<p class="cin-line" style="opacity:${d.toFixed(3)}">${r.text}</p>`)}a.innerHTML=s,this._t>=this._totalDuration&&this._finish()}_drawBackground(){const e=this._ctx,t=this._canvas.width,a=this._canvas.height,s=e.createLinearGradient(0,0,0,a);s.addColorStop(0,"#030208"),s.addColorStop(1,"#090512"),e.fillStyle=s,e.fillRect(0,0,t,a),e.save();const i=80;e.fillStyle="rgba(255,255,255,0.6)";for(let d=0;d<i;d++){const u=d*137.508%1*t,f=d*97.3%1*a*.65,g=.4+.6*Math.abs(Math.sin(this._t*.8+d));e.globalAlpha=g*.6,e.beginPath(),e.arc(u,f,.8+d%3*.5,0,Math.PI*2),e.fill()}e.restore();const o=a*.68,r=e.createLinearGradient(0,o,0,a);r.addColorStop(0,"rgba(200,60,20,0.35)"),r.addColorStop(.5,"rgba(120,30,10,0.25)"),r.addColorStop(1,"rgba(40,10,5,0.8)"),e.fillStyle=r,e.fillRect(0,o,t,a-o),e.fillStyle="#0a060c",e.beginPath(),e.moveTo(0,a*.72);const l=[.05,.15,.28,.42,.57,.68,.78,.88,.95,1],c=[.68,.58,.65,.52,.6,.55,.63,.57,.7,.72];l.forEach((d,u)=>{e.lineTo(d*t,c[u]*a)}),e.lineTo(t,a),e.lineTo(0,a),e.closePath(),e.fill();const h=12;for(let d=0;d<h;d++){const u=(d*71.3+this._t*8)%1*t,g=a*.85-(this._t*25+d*40)%(a*.5);if(g<0)continue;const p=Math.max(0,1-g/(a*.5));e.globalAlpha=p*.7,e.fillStyle=`hsl(${20+d*13%30}, 90%, 60%)`,e.beginPath(),e.arc(u,g,1.2+d%3*.6,0,Math.PI*2),e.fill(),e.globalAlpha=1}}_finish(){this._finished||(this._finished=!0,m.setFlag("opening_seen",!0),this.onComplete?this.onComplete():this.manager.pop())}draw(){}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const It=`
.cinematic-screen {
  position: absolute; inset: 0;
  font-family: 'Inter', sans-serif;
}
.cin-canvas {
  position: absolute; inset: 0; width: 100%; height: 100%;
}
.cin-overlay {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding: 3rem 2rem;
  transition: opacity 0.3s;
}
.cin-content {
  max-width: 520px; text-align: center;
  display: flex; flex-direction: column; gap: 1.2rem;
}
.cin-line {
  font-size: clamp(0.9rem, 2.5vw, 1.15rem); line-height: 1.75;
  color: #e0d8c8; text-shadow: 0 0 20px rgba(200,80,20,0.4);
  transition: opacity 0.8s;
  font-style: italic;
}
.cin-line:first-child {
  font-family: 'Cinzel', serif; font-size: clamp(1rem, 3vw, 1.35rem);
  color: #f0e8d0; font-style: normal; font-weight: 700;
  text-shadow: 0 0 30px rgba(232,160,32,0.5);
}
.cin-skip {
  position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
  font-size: 0.7rem; color: rgba(240,232,216,0.3); letter-spacing: 0.12em;
  cursor: pointer; padding: 0.5rem 1rem;
}
.cin-skip:hover { color: rgba(240,232,216,0.6); }
`,qt=["STR","DEX","INT","CON"],Ht=10,B=8;class Pt{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._name="Hero",this._class=null,this._attrs={STR:B,DEX:B,INT:B,CON:B},this._pointsSpent=0,this._step="class",this._saveSlot=0}get _pointsLeft(){return Ht-this._pointsSpent}onEnter(){this._build()}_build(){C("cb-styles",Nt),this._el=w("div","cb-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML="",this._step==="class"?this._renderClassStep():this._renderStatsStep()}_renderClassStep(){var a;const e=this._el;e.innerHTML=`
      <div class="cb-header">
        <div class="cb-title">Create Your Hero</div>
        <div class="cb-subtitle">Choose your class</div>
      </div>
      <div class="cb-class-grid" id="class-grid"></div>
      <div class="cb-footer">
        <button class="cb-btn cb-btn-ghost" id="cb-back">← Back</button>
        <button class="cb-btn cb-btn-primary" id="cb-next" disabled>Next →</button>
      </div>
    `;const t=e.querySelector("#class-grid");for(const s of te){const i=w("div",`cb-class-card${((a=this._class)==null?void 0:a.id)===s.id?" selected":""}`);i.dataset.id=s.id,i.innerHTML=`
        <div class="cb-class-icon">${s.svgIcon}</div>
        <div class="cb-class-name">${s.name}</div>
        <div class="cb-class-role">${s.role}</div>
        <div class="cb-class-hook">${s.hook}</div>
        <div class="cb-class-armor">${s.armorType}</div>
      `,i.addEventListener("click",()=>{this.audio.playSfx("click"),this._class=s,e.querySelectorAll(".cb-class-card").forEach(o=>o.classList.remove("selected")),i.classList.add("selected"),e.querySelector("#cb-next").disabled=!1}),t.appendChild(i)}e.querySelector("#cb-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),e.querySelector("#cb-next").addEventListener("click",()=>{this._class&&(this.audio.playSfx("click"),this._step="stats",this._render())})}_renderStatsStep(){const e=this._el;e.innerHTML=`
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
    `,this._renderAttrs(),this._updatePreview(),e.querySelector("#hero-name").addEventListener("input",t=>{this._name=t.target.value||"Hero"}),e.querySelector("#cb-prev").addEventListener("click",()=>{this.audio.playSfx("click"),this._step="class",this._render()}),e.querySelector("#cb-confirm").addEventListener("click",()=>{this.audio.playSfx("victory"),this._confirm()})}_renderAttrs(){const e=this._el.querySelector("#attr-panel");if(e){e.innerHTML="";for(const t of qt){const a=w("div","cb-attr-row"),s=Rt[t];a.innerHTML=`
        <div class="cb-attr-info">
          <div class="cb-attr-name">${t}</div>
          <div class="cb-attr-desc">${s}</div>
        </div>
        <div class="cb-attr-controls">
          <button class="cb-attr-btn" data-attr="${t}" data-dir="-1">−</button>
          <span class="cb-attr-val" id="val-${t}">${this._attrs[t]}</span>
          <button class="cb-attr-btn" data-attr="${t}" data-dir="1">+</button>
        </div>
      `,e.appendChild(a)}e.querySelectorAll(".cb-attr-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.attr,s=parseInt(t.dataset.dir);this._adjustAttr(a,s)})})}}_adjustAttr(e,t){if(t>0&&this._pointsLeft<=0||t<0&&this._attrs[e]<=B)return;this._attrs[e]+=t,this._pointsSpent+=t;const a=this._el.querySelector(`#val-${e}`);a&&(a.textContent=this._attrs[e]);const s=this._el.querySelector("#pts-left");s&&(s.textContent=this._pointsLeft),this._updatePreview(),this.audio.playSfx("click")}_updatePreview(){var c;const e=(c=this._el)==null?void 0:c.querySelector("#preview-grid");if(!e)return;const t=this._attrs,a=50+t.CON*10,s=30+t.INT*8,i=Math.round(70+t.DEX*1.2),o=Math.round(5+t.DEX*.8),r=Math.round(t.STR*1.5),l=Math.round(1+t.INT*.08,2);e.innerHTML=`
      <div class="preview-stat"><span class="ps-label">HP</span><span class="ps-val">${a}</span></div>
      <div class="preview-stat"><span class="ps-label">Mana</span><span class="ps-val">${s}</span></div>
      <div class="preview-stat"><span class="ps-label">Hit</span><span class="ps-val">${i}%</span></div>
      <div class="preview-stat"><span class="ps-label">Dodge</span><span class="ps-val">${o}%</span></div>
      <div class="preview-stat"><span class="ps-label">Melee</span><span class="ps-val">+${r}</span></div>
      <div class="preview-stat"><span class="ps-label">Spell</span><span class="ps-val">×${l.toFixed(2)}</span></div>
    `}_confirm(){const e={id:crypto.randomUUID(),name:this._name||"Hero",class:this._class.id,className:this._class.name,level:1,xp:0,attrs:{...this._attrs},skills:[this._class.skills[0]],equipment:{},gold:150};m.init(e),I.saveCurrentGame(0);const t=new be(this.manager,this.audio,e,!0),a=new zt(this.manager,this.audio,()=>{this.manager.replace(t)});this.manager.replace(a)}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}update(){}draw(){}}const Rt={STR:"Melee damage · Physical armor · Carry weight",DEX:"Hit chance · Dodge · Ranged damage · Initiative",INT:"Spell power · Mana pool · Magic resistance",CON:"Max HP · Resist status effects · Endurance"},Nt=`
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
`;class Bt{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){C("load-styles",Ot),this._el=w("div","load-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=I.getAllSlots();this._el.innerHTML=`
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
    `,this._el.querySelector("#ls-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".lss-load").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.slot);I.loadSlot(a)&&(this.audio.playSfx("click"),this.manager.replace(new be(this.manager,this.audio,null,!1)))})}),this._el.querySelectorAll(".lss-delete").forEach(t=>{t.addEventListener("click",()=>{confirm(`Delete save slot ${parseInt(t.dataset.slot)+1}?`)&&(I.deleteSlot(parseInt(t.dataset.slot)),this.audio.playSfx("click"),this._render())})})}update(){}draw(){}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}}const Ot=`
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
`;class Dt{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){var s,i;C("settings-styles",`
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
    `),this._el=w("div","settings-screen"),this._el.innerHTML=`
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
        <div class="setting-row">
          <div class="setting-toggle">
            <div class="toggle-switch${(i=(s=m.get())==null?void 0:s.settings)!=null&&i.disableTextures?" on":""}" id="disable-textures-toggle"></div>
            <div style="display:flex;flex-direction:column;gap:0.15rem">
              <span class="setting-label" style="margin:0">Disable Textures</span>
              <span style="font-size:0.65rem;color:#6a5a52">Improves performance on slow devices</span>
            </div>
          </div>
        </div>
      </div>
      <button class="settings-back" id="settings-back">← Back</button>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#master-vol").addEventListener("input",o=>this.audio.setMasterVolume(+o.target.value)),this._el.querySelector("#music-vol").addEventListener("input",o=>this.audio.setMusicVolume(+o.target.value)),this._el.querySelector("#sfx-vol").addEventListener("input",o=>this.audio.setSfxVolume(+o.target.value));const e=this._el.querySelector("#reduce-motion-toggle");e.addEventListener("click",()=>{const o=e.classList.toggle("on");localStorage.setItem("reduceMotion",o?"1":"0")});const t=this._el.querySelector("#auto-advance-toggle");t.addEventListener("click",()=>{const o=t.classList.toggle("on");localStorage.setItem("autoAdvance",o?"1":"0")});const a=this._el.querySelector("#disable-textures-toggle");a.addEventListener("click",()=>{const o=a.classList.toggle("on"),r=m.get();r.settings||(r.settings={}),r.settings.disableTextures=o}),this._el.querySelector("#settings-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onExit(){v(this._el),this._el=null}destroy(){v(this._el),this._el=null}update(){}draw(){}}const L={CLOUDS:0,LOGO_DROP:1,MENU:2};class Vt{constructor(e,t){this.manager=e,this.audio=t,this.phase=L.CLOUDS,this.t=0,this._el=null,this._particles=[],this._clouds=this._makeClouds(),this._logoY=-200,this._logoAlpha=0,this._menuAlpha=0,this._menuVisible=!1}_makeClouds(){const e=[];for(let t=0;t<12;t++)e.push({x:Math.random()*2e3-200,y:Math.random()*400+50,w:Math.random()*300+150,h:Math.random()*80+40,speed:Math.random()*.3+.1,alpha:Math.random()*.4+.3});return e}_makeParticles(e,t){const a=[];for(let s=0;s<60;s++)a.push({x:Math.random()*e,y:Math.random()*t,vx:(Math.random()-.5)*.4,vy:-(Math.random()*.6+.1),size:Math.random()*2+.5,alpha:Math.random(),life:Math.random(),maxLife:Math.random()*.5+.3,color:["#e8a020","#c04030","#f0c060","#ff6040"][Math.floor(Math.random()*4)]});return a}onEnter(){this.audio.playTitleMusic(),this._buildMenu(),this._skipHandler=()=>this._skipToMenu(),this._keySkipHandler=()=>this._skipToMenu(),document.addEventListener("click",this._skipHandler),document.addEventListener("keydown",this._keySkipHandler)}_skipToMenu(){this.phase!==L.MENU&&(this.phase=L.MENU,this.t=10,this._logoY=this.manager.height*.35,this._logoAlpha=1,this._menuAlpha=1,this._el&&(this._el.style.opacity="1",this._el.style.pointerEvents="auto"),document.removeEventListener("click",this._skipHandler),document.removeEventListener("keydown",this._keySkipHandler))}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}_getNgPlusLabel(){try{const e=[1,2,3].map(a=>I.loadSlot(a)).filter(Boolean),t=Math.max(0,...e.map(a=>a.ngPlus||0));if(t>0)return` <span class="tm-ng-badge">✦ NG+${t}</span>`}catch{}return""}_buildMenu(){const e=this.manager.uiOverlay;this._el=w("div","title-menu"),this._el.innerHTML=`
      <div class="title-menu-inner" id="tm-inner">
        <div class="tm-subtitle">A High Fantasy Adventure${this._getNgPlusLabel()}</div>
        <nav class="tm-nav">
          <button class="tm-btn" id="btn-new-game">New Game</button>
          <button class="tm-btn" id="btn-load-game">Load Game</button>
          <button class="tm-btn tm-btn-secondary" id="btn-settings">Settings</button>
        </nav>
        <div class="tm-footer">Emberveil · 2026</div>
      </div>
    `,this._el.style.opacity="0",this._el.style.pointerEvents="none",e.appendChild(this._el),this._el.querySelector("#btn-new-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Pt(this.manager,this.audio))}),this._el.querySelector("#btn-load-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Bt(this.manager,this.audio))}),this._el.querySelector("#btn-settings").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Dt(this.manager,this.audio))}),this._injectStyles()}_injectStyles(){if(document.getElementById("title-screen-styles"))return;const e=document.createElement("style");e.id="title-screen-styles",e.textContent=`
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
      .tm-ng-badge {
        display: inline-block;
        margin-left: 0.6em;
        color: #ffd700;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        vertical-align: middle;
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
    `,document.head.appendChild(e)}update(e){this.t+=e;const t=this.manager.width,a=this.manager.height;for(const s of this._clouds)s.x+=s.speed,s.x>t+200&&(s.x=-300);this._particles.length||(this._particles=this._makeParticles(t,a));for(const s of this._particles)s.life-=e*.5,s.life<=0&&(s.x=Math.random()*t,s.y=a+10,s.life=s.maxLife),s.x+=s.vx,s.y+=s.vy;if(this.phase===L.CLOUDS)this.t>2.5&&(this.phase=L.LOGO_DROP,this.t=0);else if(this.phase===L.LOGO_DROP){const s=Math.min(this.t/1.5,1),i=1-Math.pow(1-s,3);this._logoY=(1-i)*(-a*.3)+i*(a*.35),this._logoAlpha=Math.min(this.t/.8,1),this.t>1.8&&(this.phase=L.MENU,this.t=0)}else this.phase===L.MENU&&(this._menuAlpha=Math.min(this.t/1.5,1),this._el&&(this._el.style.opacity=this._menuAlpha,this._el.style.pointerEvents=this._menuAlpha>.5?"auto":"none"))}draw(e){const t=this.manager.width,a=this.manager.height,s=e.createLinearGradient(0,0,0,a);s.addColorStop(0,"#050208"),s.addColorStop(.4,"#0d0810"),s.addColorStop(.7,"#1a1025"),s.addColorStop(1,"#2a1830"),e.fillStyle=s,e.fillRect(0,0,t,a),e.save();const i=this.phase===L.CLOUDS?Math.max(0,1-this.t/1.5):this.phase===L.LOGO_DROP?Math.max(0,1-this.t):.3;for(let h=0;h<80;h++){const d=Math.abs(Math.sin(h*127.1+3.7))*t,u=Math.abs(Math.sin(h*311.7+1.3))*a*.65,f=Math.abs(Math.sin(h*61.7))*.8+.2;e.globalAlpha=f*i,e.fillStyle="#ffffff",e.beginPath(),e.arc(d,u,.8,0,Math.PI*2),e.fill()}e.restore();const o=a*.68,r=e.createLinearGradient(0,o,0,a);r.addColorStop(0,"#0d1a10"),r.addColorStop(.3,"#0a1208"),r.addColorStop(1,"#050a04"),e.fillStyle=r,e.fillRect(0,o,t,a-o),e.save(),e.fillStyle="#0a1208",e.beginPath(),e.moveTo(0,a),e.lineTo(0,o+20);for(let h=0;h<=t;h+=40){const d=Math.sin(h*.008)*30+Math.sin(h*.02)*15;e.lineTo(h,o-d)}e.lineTo(t,a),e.closePath(),e.fill(),e.restore();const l=e.createRadialGradient(t/2,o,0,t/2,o,t*.5);l.addColorStop(0,"rgba(192,64,48,0.2)"),l.addColorStop(.4,"rgba(192,64,48,0.06)"),l.addColorStop(1,"rgba(192,64,48,0)"),e.fillStyle=l,e.fillRect(0,o-80,t,160),e.save();const c=this.phase===L.CLOUDS?this.t*60:0;for(const h of this._clouds){e.globalAlpha=h.alpha;const d=e.createRadialGradient(h.x+h.w/2,h.y,0,h.x+h.w/2,h.y,h.w/2);d.addColorStop(0,"rgba(200,180,255,0.8)"),d.addColorStop(1,"rgba(100,80,140,0)"),e.fillStyle=d,e.beginPath(),e.ellipse(h.x+h.w/2,h.y+c*.1,h.w/2,h.h/2,0,0,Math.PI*2),e.fill()}e.restore(),e.save();for(const h of this._particles){const d=h.life/h.maxLife*.7;e.globalAlpha=d,e.fillStyle=h.color,e.shadowBlur=6,e.shadowColor=h.color,e.beginPath(),e.arc(h.x,h.y,h.size,0,Math.PI*2),e.fill()}if(e.shadowBlur=0,e.restore(),this.phase!==L.CLOUDS){e.save(),e.globalAlpha=this._logoAlpha;const h=e.createRadialGradient(t/2,this._logoY,0,t/2,this._logoY,250);h.addColorStop(0,"rgba(232,160,32,0.15)"),h.addColorStop(1,"rgba(232,160,32,0)"),e.fillStyle=h,e.fillRect(t/2-300,this._logoY-100,600,200);const d=Math.min(t*.13,80);e.font=`900 ${d}px Cinzel, Georgia, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=40,e.shadowColor="#c04030",e.fillStyle="#c04030",e.fillText("EMBERVEIL",t/2+2,this._logoY+2),e.shadowBlur=20,e.shadowColor="#e8a020",e.fillStyle="#e8a020",e.fillText("EMBERVEIL",t/2,this._logoY),e.shadowBlur=0,e.fillStyle="#f8d880",e.globalAlpha=this._logoAlpha*.4,e.fillText("EMBERVEIL",t/2,this._logoY-1),e.restore()}}onExit(){document.removeEventListener("click",this._skipHandler),document.removeEventListener("keydown",this._keySkipHandler),v(this._el),this._el=null}destroy(){document.removeEventListener("click",this._skipHandler),document.removeEventListener("keydown",this._keySkipHandler),v(this._el),this._el=null}}const F=document.getElementById("game-canvas"),ve=document.getElementById("ui-overlay");function ye(){F.width=window.innerWidth,F.height=window.innerHeight}ye();window.addEventListener("resize",ye);const Gt=new ke(F,ve),_e=new Se,W=new we(F,ve,Gt,_e);W.push(new Vt(W,_e));let ce=0;function xe(n){const e=Math.min((n-ce)/1e3,.1);ce=n,W.update(e),W.draw(),requestAnimationFrame(xe)}requestAnimationFrame(xe);
