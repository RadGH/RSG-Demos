(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();class ze{constructor(e,t,a,o){this.canvas=e,this.ctx=e.getContext("2d"),this.uiOverlay=t,this.input=a,this.audio=o,this._stack=[]}push(e){const t=this._stack[this._stack.length-1];t!=null&&t.onPause&&t.onPause(),e.manager=this,this._stack.push(e),e.onEnter&&e.onEnter()}pop(){if(!this._stack.length)return;const e=this._stack.pop();e.onExit&&e.onExit(),e.destroy&&e.destroy();const t=this._stack[this._stack.length-1];t!=null&&t.onResume&&t.onResume()}replace(e){this._stack.length&&this.pop(),this.push(e)}update(e){var t;(t=this._stack[this._stack.length-1])==null||t.update(e)}draw(){var a;const e=this.ctx;e.clearRect(0,0,this.canvas.width,this.canvas.height);const t=this._stack[this._stack.length-1];(a=t==null?void 0:t.draw)==null||a.call(t,e)}get width(){return this.canvas.width}get height(){return this.canvas.height}}class $e{constructor(e,t){this.canvas=e,this.overlay=t,this.mouse={x:0,y:0,down:!1},this.keys=new Set,this._clicks=[],this._listeners=[],this._bind("pointermove",e,a=>this._onMove(a)),this._bind("pointerdown",e,a=>this._onDown(a)),this._bind("pointerup",e,a=>this._onUp(a)),this._bind("keydown",window,a=>this.keys.add(a.code)),this._bind("keyup",window,a=>this.keys.delete(a.code))}_bind(e,t,a){t.addEventListener(e,a,{passive:!0}),this._listeners.push({event:e,target:t,handler:a})}_onMove(e){const t=this.canvas.getBoundingClientRect(),a=this.canvas.width/t.width,o=this.canvas.height/t.height;this.mouse.x=(e.clientX-t.left)*a,this.mouse.y=(e.clientY-t.top)*o}_onDown(e){this._onMove(e),this.mouse.down=!0}_onUp(e){this._onMove(e),this.mouse.down=!1,this._clicks.push({x:this.mouse.x,y:this.mouse.y})}consumeClicks(){const e=this._clicks;return this._clicks=[],e}isKey(e){return this.keys.has(e)}destroy(){for(const{event:e,target:t,handler:a}of this._listeners)t.removeEventListener(e,a)}}class Pe{constructor(){this._ctx=null,this._masterGain=null,this._musicGain=null,this._sfxGain=null,this._currentTrack=null,this._nodes=[],this.masterVolume=.8,this.musicVolume=.6,this.sfxVolume=.8,this._started=!1}_ensureContext(){this._ctx||(this._ctx=new(window.AudioContext||window.webkitAudioContext),this._masterGain=this._ctx.createGain(),this._masterGain.gain.value=this.masterVolume,this._masterGain.connect(this._ctx.destination),this._musicGain=this._ctx.createGain(),this._musicGain.gain.value=this.musicVolume,this._musicGain.connect(this._masterGain),this._sfxGain=this._ctx.createGain(),this._sfxGain.gain.value=this.sfxVolume,this._sfxGain.connect(this._masterGain))}resume(){this._ensureContext(),this._ctx.state==="suspended"&&this._ctx.resume(),this._started=!0}playTitleMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:55,type:"sine",gain:.08,detune:0},{freq:82.5,type:"sine",gain:.05,detune:5},{freq:110,type:"sine",gain:.04,detune:-3}]),this._addPad([220,277.2,329.6,440],.03)}playCombatMusic(e){this.resume(),this._stopCurrentTrack(),e==="hell_breach"||e==="shattered_core"?(this._buildAmbientLayer([{freq:55,type:"sawtooth",gain:.06,detune:0},{freq:82.5,type:"square",gain:.03,detune:-12},{freq:110,type:"sawtooth",gain:.025,detune:5}]),this._addPulse(55,.15,.3)):e==="cosmic_rift"||e==="eternal_void"?(this._buildAmbientLayer([{freq:41.2,type:"sine",gain:.07,detune:0},{freq:55,type:"sawtooth",gain:.04,detune:7},{freq:82.5,type:"square",gain:.02,detune:-8}]),this._addPulse(41.2,.18,.25)):(this._buildAmbientLayer([{freq:110,type:"sawtooth",gain:.04,detune:0},{freq:165,type:"square",gain:.02,detune:8}]),this._addPulse(110,.12,.4))}playTownMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:220,type:"triangle",gain:.06,detune:0},{freq:330,type:"sine",gain:.04,detune:2},{freq:440,type:"sine",gain:.03,detune:-2}]),this._addPad([220,293.7,369.9],.04)}_buildAmbientLayer(e){if(!this._ctx)return[];const t=[];for(const a of e){const o=this._ctx.createOscillator(),s=this._ctx.createGain(),r=this._ctx.createBiquadFilter();o.type=a.type,o.frequency.value=a.freq,o.detune.value=a.detune,r.type="lowpass",r.frequency.value=800,s.gain.value=0,o.connect(r),r.connect(s),s.connect(this._musicGain),o.start(),s.gain.linearRampToValueAtTime(a.gain,this._ctx.currentTime+3),t.push(o,s,r)}return this._nodes.push(...t),t}_addPad(e,t){if(!this._ctx)return;const a=4;let o=this._ctx.currentTime+2;const s=()=>{if(this._ctx){for(const r of e){const i=this._ctx.createOscillator(),l=this._ctx.createGain();i.type="sine",i.frequency.value=r,l.gain.value=0,i.connect(l),l.connect(this._musicGain),i.start(o),l.gain.setValueAtTime(0,o),l.gain.linearRampToValueAtTime(t,o+.5),l.gain.setValueAtTime(t,o+a-1),l.gain.linearRampToValueAtTime(0,o+a),i.stop(o+a+.1)}o+=a}};for(let r=0;r<20;r++)s()}_addPulse(e,t,a){if(!this._ctx)return;let o=this._ctx.currentTime+.5;for(let s=0;s<60;s++){const r=this._ctx.createOscillator(),i=this._ctx.createGain();r.type="square",r.frequency.value=e,i.gain.value=0,r.connect(i),i.connect(this._musicGain),r.start(o),i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(t,o+.02),i.gain.linearRampToValueAtTime(0,o+a*.8),r.stop(o+a),o+=a}}_stopCurrentTrack(){var e,t;for(const a of this._nodes){try{(e=a.stop)==null||e.call(a)}catch{}try{(t=a.disconnect)==null||t.call(a)}catch{}}this._nodes=[]}playSfx(e){if(this.resume(),!this._ctx)return;const t=this._ctx,a=t.currentTime,o=t.createOscillator(),s=t.createGain();switch(o.connect(s),s.connect(this._sfxGain),e){case"click":o.frequency.value=880,o.type="sine",s.gain.setValueAtTime(.15,a),s.gain.exponentialRampToValueAtTime(.001,a+.1),o.start(a),o.stop(a+.1);break;case"hit":o.frequency.value=200,o.type="sawtooth",s.gain.setValueAtTime(.3,a),s.gain.exponentialRampToValueAtTime(.001,a+.2),o.start(a),o.stop(a+.2);break;case"spell":o.frequency.setValueAtTime(440,a),o.frequency.linearRampToValueAtTime(880,a+.3),o.type="sine",s.gain.setValueAtTime(.2,a),s.gain.exponentialRampToValueAtTime(.001,a+.4),o.start(a),o.stop(a+.4);break;case"victory":o.frequency.setValueAtTime(440,a),o.frequency.setValueAtTime(554,a+.15),o.frequency.setValueAtTime(659,a+.3),o.frequency.setValueAtTime(880,a+.45),o.type="sine",s.gain.setValueAtTime(.25,a),s.gain.setValueAtTime(.25,a+.6),s.gain.exponentialRampToValueAtTime(.001,a+1),o.start(a),o.stop(a+1);break;case"defeat":o.frequency.setValueAtTime(440,a),o.frequency.linearRampToValueAtTime(220,a+.8),o.type="sawtooth",s.gain.setValueAtTime(.2,a),s.gain.linearRampToValueAtTime(.001,a+1.2),o.start(a),o.stop(a+1.2);break;case"levelup":case"level_up":{[261.6,329.6,392,523.3,659.3].forEach((i,l)=>{const d=t.createOscillator(),h=t.createGain();d.connect(h),h.connect(this._sfxGain),d.type="sine",d.frequency.value=i;const c=a+l*.08;h.gain.setValueAtTime(0,c),h.gain.linearRampToValueAtTime(.2,c+.03),h.gain.exponentialRampToValueAtTime(.001,c+.25),d.start(c),d.stop(c+.25)}),o.start(a),o.stop(a);break}case"purchase":o.frequency.setValueAtTime(660,a),o.frequency.setValueAtTime(880,a+.05),o.type="triangle",s.gain.setValueAtTime(.15,a),s.gain.exponentialRampToValueAtTime(.001,a+.2),o.start(a),o.stop(a+.2);break;case"shrine":o.frequency.setValueAtTime(523.3,a),o.frequency.linearRampToValueAtTime(1046.5,a+.5),o.type="sine",s.gain.setValueAtTime(.08,a),s.gain.linearRampToValueAtTime(.18,a+.25),s.gain.exponentialRampToValueAtTime(.001,a+.8),o.start(a),o.stop(a+.8);break;case"craft":o.frequency.setValueAtTime(300,a),o.frequency.setValueAtTime(400,a+.05),o.frequency.setValueAtTime(600,a+.1),o.type="sawtooth",s.gain.setValueAtTime(.2,a),s.gain.exponentialRampToValueAtTime(.001,a+.3),o.start(a),o.stop(a+.3);break;case"ng_plus":{[440,554.4,659.3,880,1108.7].forEach((i,l)=>{const d=t.createOscillator(),h=t.createGain();d.connect(h),h.connect(this._sfxGain),d.type="triangle",d.frequency.value=i;const c=a+l*.1;h.gain.setValueAtTime(0,c),h.gain.linearRampToValueAtTime(.25,c+.04),h.gain.exponentialRampToValueAtTime(.001,c+.5),d.start(c),d.stop(c+.5)}),o.start(a),o.stop(a);break}}}setMasterVolume(e){this.masterVolume=e,this._masterGain&&(this._masterGain.gain.value=e)}setMusicVolume(e){this.musicVolume=e,this._musicGain&&(this._musicGain.gain.value=e)}setSfxVolume(e){this.sfxVolume=e,this._sfxGain&&(this._sfxGain.gain.value=e)}}function S(n,e,t={}){const a=document.createElement(n);e&&(a.className=e);for(const[o,s]of Object.entries(t))a.setAttribute(o,s);return a}function w(n){var e;(e=n==null?void 0:n.parentNode)==null||e.removeChild(n)}function I(n,e){if(document.getElementById(n))return;const t=document.createElement("style");t.id=n,t.textContent=e,document.head.appendChild(t)}const re=[{id:"warrior",name:"Warrior",role:"Frontline Tank",hook:"Shield Bash stuns enemies. Whirlwind hits all adjacent foes. Unbreakable when outnumbered.",armorType:"Heavy Armor · Sword / Hammer / 2H",primaryAttr:"STR",armorTier:"heavy",weapons:["sword","hammer","2h_sword","2h_axe"],skills:["shield_bash","battle_cry","whirlwind","unbreakable"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4L8 14v8l10 10 10-10v-8L18 4z"/><path d="M18 4v28M8 14h20"/></svg>'},{id:"paladin",name:"Paladin",role:"Holy Warrior",hook:"Holy Strike crits vs demons. Lay on Hands keeps allies alive. Consecration sustains long fights.",armorType:"Medium Armor · Sword / Scepter + Shield",primaryAttr:"STR",armorTier:"medium",weapons:["sword","scepter"],skills:["holy_strike","lay_on_hands","divine_shield","consecration"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 3l-14 6v9c0 8 7 14 14 16 7-2 14-8 14-16V9L18 3z"/><path d="M12 18l4 4 8-8"/></svg>'},{id:"ranger",name:"Ranger",role:"Precision Ranged",hook:"Aimed Shot ignores armor. Rain of Arrows blankets the entire enemy field for 3 rounds.",armorType:"Light Armor · Bow / Crossbow / Javelin",primaryAttr:"DEX",armorTier:"light",weapons:["bow","crossbow","javelin"],skills:["aimed_shot","multi_shot","smoke_trap","rain_of_arrows"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l26 26M5 5l8 2-2-8"/><circle cx="24" cy="12" r="4"/></svg>'},{id:"rogue",name:"Rogue",role:"Burst Assassin",hook:"200% Backstab on stunned targets. Death Mark makes enemies take 50% more damage from all sources.",armorType:"Light Armor · Dagger (dual wield)",primaryAttr:"DEX",armorTier:"light",weapons:["dagger"],skills:["backstab","poison_blade","shadow_step","death_mark"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 26L26 10M18 10l8-2-2 8"/><path d="M10 26c-2 2-4 2-4 0s0-2 2-4"/></svg>'},{id:"cleric",name:"Cleric",role:"Primary Healer",hook:"Mass Resurrection can auto-trigger on wipe. Sanctuary makes an ally temporarily untargetable.",armorType:"Light Armor · Staff / Scepter / Wand",primaryAttr:"INT",armorTier:"light",weapons:["staff","scepter","wand"],skills:["heal","smite","sanctuary","mass_resurrection"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4v28M4 18h28"/></svg>'},{id:"bard",name:"Bard",role:"Support Maestro",hook:"Ballad of Valor gives one hero two turns per round. Song of Ruin strips all enemy buffs at once.",armorType:"Light Armor · Dagger / Wand",primaryAttr:"INT",armorTier:"light",weapons:["dagger","wand"],skills:["inspiring_tune","discordant_wail","ballad_of_valor","song_of_ruin"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 28c0-3 3-5 8-5s8 2 8 5"/><path d="M14 23V10l12-3v13"/><circle cx="10" cy="28" r="3"/><circle cx="24" cy="25" r="3"/></svg>'},{id:"mage",name:"Mage",role:"AoE Glass Cannon",hook:"Fireball torches entire enemy packs. Blizzard hits all enemies for 3 rounds. Arcane Surge: 400% INT.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["magic_missile","fireball","blizzard","arcane_surge"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>'},{id:"necromancer",name:"Necromancer",role:"Army Builder",hook:"Raise Dead turns corpses into skeleton allies. Death Coil applies Poison AND Bleed to all enemies.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["bone_spike","raise_dead","life_drain","death_coil"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="8"/><path d="M14 14v5M22 14v5M10 28c0-5 4-9 8-9s8 4 8 9"/></svg>'},{id:"warlock",name:"Warlock",role:"Chaos Dealer",hook:"Corruption spreads on enemy death. Soul Pact doubles all DoT at cost of own HP.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["corruption","hellfire","soul_pact","void_rift"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-4 6-8 8-8 14a8 8 0 0016 0c0-6-4-8-8-14z"/><path d="M14 22c0 2.2 1.8 4 4 4s4-1.8 4-4"/></svg>'},{id:"demon_hunter",name:"Demon Hunter",role:"Specialist Killer",hook:"+50% damage vs demons. Vengeance stacks from fallen allies then unleashes devastating burst.",armorType:"Light Armor · Crossbow / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["crossbow","dagger"],skills:["demon_bolt","glaive_toss","fel_sight","vengeance"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L18 6l12 24"/><path d="M11 22h14"/><path d="M18 6v5"/></svg>'},{id:"scavenger",name:"Scavenger",role:"Resource Specialist",hook:"Scrounge finds items mid-combat. Jackpot has 20% chance to loot Magic+ gear from each kill.",armorType:"Light/Medium · Any 1H weapon",primaryAttr:"DEX",armorTier:"light",weapons:["dagger","sword","hammer","javelin"],skills:["scrounge","thrown_junk","makeshift_bomb","jackpot"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="16" width="16" height="14" rx="2"/><path d="M6 16h24M14 16v-4a4 4 0 018 0v4"/></svg>'},{id:"swashbuckler",name:"Swashbuckler",role:"Flashy Duelist",hook:"Build Flair stacks with Flourish. Grandeur releases all stacks in one legendary strike.",armorType:"Light Armor · Sword / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["sword","dagger"],skills:["riposte","flourish","taunt","grandeur"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L30 6M22 6l8-2-2 8"/><path d="M6 30a4 4 0 004-4"/></svg>'},{id:"dragon_knight",name:"Dragon Knight",role:"Draconic Warrior",hook:"Choose fire/ice/lightning. Draconic Fury turns all attacks into group AoE for 2 rounds.",armorType:"Heavy/Medium · 2H Sword / 2H Axe",primaryAttr:"STR",armorTier:"heavy",weapons:["2h_sword","2h_axe"],skills:["dragon_claw","breath_weapon","dragon_scales","draconic_fury"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c6 4 12 10 12 16s-6 12-12 12S6 26 6 20c0-6 6-12 12-16z"/><path d="M18 4c-3 6 0 14 0 18"/><path d="M8 16c4-2 8-2 10 0"/></svg>'},{id:"pyromancer",name:"Pyromancer",role:"Fire Specialist",hook:"Stack Burn on multiple groups. Meteor ignites every enemy group simultaneously.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["flame_lance","ignite","pyroclasm","meteor"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-2 8 6 10 2 18a8 8 0 01-8-8c0-2 1-4 2-5-1 4 2 6 4 4 2-8-4-6-4-14"/><path d="M18 22a4 4 0 000 8"/></svg>'}],W={version:1,hero:null,party:[],companions:[],bench:[],gold:150,inventory:[],materials:{},storyFlags:{},quests:[],act:1,zoneId:"border_roads",nodeId:"start",visitedNodes:new Set,unlockedZones:["border_roads"],completedBosses:[],portal:null,seenEvents:[],fame:0,ngPlus:0,playTimeSeconds:0,settings:{disableTextures:!1}};let x={...W};const u={get(){return x},init(n){x={...W,hero:n,party:[n],gold:n.gold??150,visitedNodes:new Set(["start"])}},load(n){x={...W,...n,visitedNodes:new Set(n.visitedNodes||["start"]),unlockedZones:n.unlockedZones||["border_roads"],completedBosses:n.completedBosses||[],portal:n.portal||null,fame:n.fame||0,ngPlus:n.ngPlus||0,materials:n.materials||{},settings:{...W.settings,...n.settings||{}}}},toSaveData(){return{...x,visitedNodes:[...x.visitedNodes]}},setFlag(n,e=!0){x.storyFlags[n]=e},getFlag(n){return x.storyFlags[n]},addGold(n){x.gold=Math.max(0,(x.gold||0)+n)},getGold(){return x.gold||0},addToInventory(n){x.inventory.push(n)},removeFromInventory(n){x.inventory=x.inventory.filter(e=>e.id!==n)},getMaterials(){return x.materials||{}},addMaterials(n){x.materials||(x.materials={});for(const[e,t]of Object.entries(n))x.materials[e]=(x.materials[e]||0)+t},getParty(){return x.party},getCompanions(){return x.companions},getAllCombatants(){return[...x.party,...x.companions]},addToParty(n){return x.party.length<4?(x.party.push(n),!0):!1},addToCompanions(n){return x.companions.length<4?(x.companions.push(n),!0):!1},addToBench(n){x.bench.push(n)},visitNode(n){x.visitedNodes.add(n)},hasVisited(n){return x.visitedNodes.has(n)},addFame(n){x.fame=(x.fame||0)+n},getFame(){return x.fame||0},getNgPlus(){return x.ngPlus||0},startNgPlus(){const n=(x.ngPlus||0)+1;x.ngPlus=n,x.portal=null,x.unlockedZones=["border_roads"],x.completedBosses=[],x.visitedNodes=new Set(["start"]),x.zoneId="border_roads",x.nodeId="start",x.gold=Math.max(150,Math.floor((x.gold||0)*.5)),[...x.party,...x.companions].forEach(e=>{e.pendingAttrPoints=(e.pendingAttrPoints||0)+5,e.hp=e.maxHp||100,e.mp=e.maxMp||80})},openPortal(n,e){x.portal={nodeId:n,zoneId:e}},closePortal(){x.portal=null},getPortal(){return x.portal},getFameTitle(){const n=x.fame||0;return n>=500?"Legendary":n>=250?"Renowned":n>=100?"Respected":n>=50?"Known":n>=20?"Noticed":"Unknown"}},C={COMBAT:"combat",DIALOG:"dialog",TOWN:"town",TREASURE:"treasure",AMBUSH:"ambush",BOSS:"boss",LORE:"lore",SHRINE:"shrine",CHALLENGE:"challenge"},k={goblin_scout:{id:"goblin_scout",name:"Goblin Scout",hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:15,xpValue:15,gold:[2,6],loot:["dagger","light_chest"]},goblin_warrior:{id:"goblin_warrior",name:"Goblin Warrior",hp:38,maxHp:38,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12],loot:["sword","medium_chest","shield"]},goblin_shaman:{id:"goblin_shaman",name:"Goblin Shaman",hp:28,maxHp:28,dmg:[6,12],armor:1,hit:74,dodge:10,xpValue:30,gold:[8,18],loot:["wand","ring"],statusOnHit:[{type:"burn",chance:.35,duration:2,power:4}]},goblin_warlord:{id:"goblin_warlord",name:"Goblin Warlord",hp:65,maxHp:65,dmg:[10,18],armor:7,hit:70,dodge:6,xpValue:55,gold:[20,40],loot:["sword","heavy_chest"]},corrupted_wolf:{id:"corrupted_wolf",name:"Corrupted Wolf",hp:30,maxHp:30,dmg:[8,14],armor:1,hit:76,dodge:18,xpValue:22,gold:[1,4],loot:[],statusOnHit:[{type:"bleed",chance:.4,duration:2,power:3}]},corrupted_bear:{id:"corrupted_bear",name:"Corrupted Bear",hp:70,maxHp:70,dmg:[12,20],armor:4,hit:65,dodge:5,xpValue:50,gold:[5,15],loot:[],statusOnHit:[{type:"stun",chance:.25,duration:1,power:0}]},bandit:{id:"bandit",name:"Bandit",hp:28,maxHp:28,dmg:[6,11],armor:3,hit:70,dodge:10,xpValue:20,gold:[4,10],loot:["dagger","light_chest"]},bandit_captain:{id:"bandit_captain",name:"Bandit Captain",hp:55,maxHp:55,dmg:[10,16],armor:5,hit:72,dodge:12,xpValue:45,gold:[15,30],loot:["sword","medium_chest"]},imp:{id:"imp",name:"Imp",hp:28,maxHp:28,dmg:[7,12],armor:0,hit:82,dodge:22,xpValue:28,gold:[4,10],loot:[],statusOnHit:[{type:"burn",chance:.55,duration:2,power:6}]},hell_knight:{id:"hell_knight",name:"Hell Knight",hp:80,maxHp:80,dmg:[16,26],armor:12,hit:70,dodge:8,xpValue:72,gold:[20,45],loot:["heavy_chest","heavy_legs"],statusOnHit:[{type:"bleed",chance:.4,duration:2,power:7}]},void_shade:{id:"void_shade",name:"Void Shade",hp:50,maxHp:50,dmg:[14,20],armor:0,hit:85,dodge:28,xpValue:55,gold:[12,28],loot:["ring","wand"],statusOnHit:[{type:"poison",chance:.5,duration:3,power:7},{type:"stun",chance:.15,duration:1,power:0}]},demon_brute:{id:"demon_brute",name:"Demon Brute",hp:120,maxHp:120,dmg:[20,32],armor:8,hit:65,dodge:5,xpValue:90,gold:[30,60],loot:["heavy_chest"],statusOnHit:[{type:"stun",chance:.3,duration:1,power:0}]},archfiend_malgrath:{id:"archfiend_malgrath",name:"Archfiend Malgrath",hp:380,maxHp:380,dmg:[24,38],armor:16,hit:75,dodge:10,xpValue:450,gold:[120,200],loot:["heavy_chest","ring","necklace"],statusOnHit:[{type:"burn",chance:.6,duration:3,power:10},{type:"bleed",chance:.4,duration:2,power:8}]},emberveil_sovereign:{id:"emberveil_sovereign",name:"The Emberveil Sovereign",hp:600,maxHp:600,dmg:[30,50],armor:20,hit:78,dodge:12,xpValue:800,gold:[200,350],loot:["heavy_chest","ring","necklace","staff"],statusOnHit:[{type:"burn",chance:.7,duration:3,power:12},{type:"poison",chance:.5,duration:3,power:10},{type:"stun",chance:.25,duration:1,power:0}]},ash_wraith:{id:"ash_wraith",name:"Ash Wraith",hp:42,maxHp:42,dmg:[8,14],armor:0,hit:78,dodge:20,xpValue:32,gold:[6,14],loot:["wand","ring"],statusOnHit:[{type:"burn",chance:.4,duration:2,power:5}]},cinder_hound:{id:"cinder_hound",name:"Cinder Hound",hp:35,maxHp:35,dmg:[10,16],armor:2,hit:80,dodge:16,xpValue:28,gold:[3,9],loot:[],statusOnHit:[{type:"bleed",chance:.45,duration:2,power:4}]},molten_golem:{id:"molten_golem",name:"Molten Golem",hp:90,maxHp:90,dmg:[14,22],armor:10,hit:62,dodge:4,xpValue:65,gold:[15,30],loot:["heavy_chest"],statusOnHit:[{type:"burn",chance:.6,duration:3,power:6}]},veil_cultist:{id:"veil_cultist",name:"Veil Cultist",hp:45,maxHp:45,dmg:[9,15],armor:2,hit:72,dodge:12,xpValue:35,gold:[8,18],loot:["cloth_chest","wand"],statusOnHit:[{type:"poison",chance:.35,duration:3,power:5}]},veil_sorcerer:{id:"veil_sorcerer",name:"Veil Sorcerer",hp:55,maxHp:55,dmg:[14,22],armor:1,hit:76,dodge:14,xpValue:60,gold:[20,40],loot:["staff","cloth_chest","ring"],statusOnHit:[{type:"burn",chance:.5,duration:2,power:7},{type:"stun",chance:.2,duration:1,power:0}]},lava_titan:{id:"lava_titan",name:"The Lava Titan",hp:280,maxHp:280,dmg:[20,32],armor:14,hit:70,dodge:4,xpValue:350,gold:[80,140],loot:["heavy_chest","heavy_legs","ring"],statusOnHit:[{type:"burn",chance:.7,duration:3,power:8}]},grax_veil_touched:{id:"grax_veil_touched",name:"Grax the Veil-Touched",hp:200,maxHp:200,dmg:[14,24],armor:10,hit:78,dodge:8,xpValue:250,gold:[60,100],loot:["sword","heavy_chest","ring"],statusOnHit:[{type:"poison",chance:.3,duration:3,power:5}]},veil_warden:{id:"veil_warden",name:"Veil Warden",hp:90,maxHp:90,dmg:[10,16],armor:6,hit:70,dodge:12,xpValue:80,gold:[25,45],loot:["medium_chest","wand"],statusOnHit:[{type:"burn",chance:.45,duration:2,power:5}]}},$={primordial_elemental:{id:"primordial_elemental",name:"Primordial Elemental",hp:130,maxHp:130,dmg:[28,48],armor:12,hit:80,dodge:15,xpValue:180,gold:[30,55],statusOnHit:{type:"burn",chance:.25,duration:2,power:15}},abyssal_knight:{id:"abyssal_knight",name:"Abyssal Knight",hp:160,maxHp:160,dmg:[32,55],armor:20,hit:78,dodge:10,xpValue:200,gold:[35,65]},reality_shard:{id:"reality_shard",name:"Reality Shard",hp:80,maxHp:80,dmg:[35,60],armor:3,hit:90,dodge:30,xpValue:150,gold:[20,40],statusOnHit:{type:"stun",chance:.2,duration:1}},genesis_worm:{id:"genesis_worm",name:"Genesis Worm",hp:250,maxHp:250,dmg:[25,45],armor:15,hit:75,dodge:5,xpValue:220,gold:[40,70]},the_architect:{id:"the_architect",name:"The Architect",hp:900,maxHp:900,dmg:[55,100],armor:30,hit:90,dodge:15,xpValue:1200,gold:[300,600]}},P={goblin_patrol:{name:"Goblin Patrol",enemies:[{...k.goblin_scout,count:3}]},corrupted_outpost:{name:"Corrupted Outpost",enemies:[{...k.goblin_warrior,count:2},{...k.goblin_scout,count:2}]},border_boss:{name:"Warlord's Vanguard",enemies:[{...k.goblin_warlord,count:1},{...k.goblin_warrior,count:2}]},bandit_ambush:{name:"Bandit Ambush",enemies:[{...k.bandit,count:2},{...k.bandit_captain,count:1}]},spider_nest:{name:"Spider Hollow",enemies:[{id:"giant_spider",name:"Giant Spider",hp:18,maxHp:18,dmg:[5,10],armor:1,hit:75,dodge:14,xpValue:18,gold:[1,4],loot:[],statusOnHit:[{type:"poison",chance:.5,duration:2,power:3}],count:4}]},goblin_camp:{name:"Goblin Camp",enemies:[{...k.goblin_scout,count:2},{...k.goblin_shaman,count:1},{...k.goblin_warrior,count:2}]},thornwood_boss:{name:"The Veil Wardens",enemies:[{...k.veil_warden,count:2},{...k.goblin_shaman,count:2}]},grax_final:{name:"Grax the Veil-Touched",enemies:[{...k.grax_veil_touched,count:1},{...k.veil_warden,count:2}]},wolf_pack:{name:"Corrupted Wolf Pack",enemies:[{...k.corrupted_wolf,count:3}]},bear_ambush:{name:"Corrupted Predator",enemies:[{...k.corrupted_bear,count:1},{...k.corrupted_wolf,count:2}]},ash_patrol:{name:"Ash Patrol",enemies:[{...k.ash_wraith,count:2},{...k.cinder_hound,count:2}]},obsidian_garrison:{name:"Obsidian Garrison",enemies:[{...k.molten_golem,count:1},{...k.ash_wraith,count:3}]},ember_ambush:{name:"Ember Ambush",enemies:[{...k.cinder_hound,count:4}]},lava_titan:{name:"The Lava Titan",enemies:[{...k.lava_titan,count:1},{...k.molten_golem,count:2}]},veil_cult_camp:{name:"Veil Cult Encampment",enemies:[{...k.veil_cultist,count:3},{...k.veil_sorcerer,count:1}]},veil_high_priest:{name:"Veil High Priest",enemies:[{...k.veil_sorcerer,count:1,hp:180,maxHp:180,dmg:[18,28],armor:4,xpValue:220,name:"Veil High Priest"},{...k.veil_cultist,count:3}]},demon_patrol:{name:"Demon Patrol",enemies:[{...k.imp,count:3},{...k.hell_knight,count:1}]},hell_garrison:{name:"Hell Garrison",enemies:[{...k.hell_knight,count:2},{...k.imp,count:2}]},rift_assault:{name:"Rift Assault",enemies:[{...k.void_shade,count:3},{...k.demon_brute,count:1}]},void_nexus_ambush:{name:"Void Nexus",enemies:[{...k.void_shade,count:4}]},archfiend_malgrath:{name:"Archfiend Malgrath",enemies:[{...k.archfiend_malgrath,count:1},{...k.hell_knight,count:2}]},emberveil_sovereign:{name:"The Emberveil Sovereign",enemies:[{...k.emberveil_sovereign,count:1},{...k.void_shade,count:2},{...k.demon_brute,count:1}]},primordial_patrol:{name:"Primordial Patrol",enemies:[{...$.primordial_elemental,count:2},{...$.reality_shard,count:2}]},abyssal_garrison:{name:"Abyssal Garrison",enemies:[{...$.abyssal_knight,count:2},{...$.primordial_elemental,count:1}]},genesis_nest:{name:"Genesis Nest",enemies:[{...$.genesis_worm,count:1},{...$.reality_shard,count:3}]},the_architect_final:{name:"The Architect",enemies:[{...$.the_architect,count:1},{...$.abyssal_knight,count:2}]},void_horde:{name:"Void Horde",enemies:[{id:"void_wraith",name:"Void Wraith",count:2,hp:90,maxHp:90,dmg:[22,38],armor:8,hit:82,dodge:22,xpValue:120,gold:[20,40]},{id:"star_horror",name:"Star Horror",count:1,hp:110,maxHp:110,dmg:[18,32],armor:5,hit:78,dodge:18,xpValue:130,gold:[18,35]}]},cosmic_assault:{name:"Cosmic Assault",enemies:[{id:"star_horror",name:"Star Horror",count:2,hp:110,maxHp:110,dmg:[18,32],armor:5,hit:78,dodge:18,xpValue:130,gold:[18,35]},{id:"cosmic_titan",name:"Cosmic Titan",count:1,hp:200,maxHp:200,dmg:[30,50],armor:18,hit:72,dodge:8,xpValue:200,gold:[30,60]}]},unraveler:{name:"The Unraveler",enemies:[{id:"the_unraveler",name:"The Unraveler",count:1,hp:600,maxHp:600,dmg:[45,80],armor:25,hit:88,dodge:12,xpValue:800,gold:[200,400]},{id:"void_wraith",name:"Void Wraith",count:2,hp:90,maxHp:90,dmg:[22,38],armor:8,hit:82,dodge:22,xpValue:120,gold:[20,40]}]}},ve=[{id:"border_roads",name:"The Border Roads",act:1,zoneIndex:0,nodes:[{id:"start",type:"town",name:"Emberglen",x:.08,y:.5,exits:["road_ambush"]},{id:"road_ambush",type:"dialog",name:"Shady Wanderer",x:.28,y:.4,exits:["crossroads_a","crossroads_b"]},{id:"crossroads_a",type:"combat",name:"Goblin Scout Pack",x:.5,y:.22,exits:["ruined_watch"],encounter:"goblin_patrol"},{id:"crossroads_b",type:"shrine",name:"Roadside Shrine",x:.5,y:.7,exits:["ruined_watch"],shrineType:"heal"},{id:"ruined_watch",type:"combat",name:"Ruined Watchtower",x:.72,y:.5,exits:["border_boss"],encounter:"corrupted_outpost"},{id:"border_boss",type:"boss",name:"Warlord's Vanguard",x:.92,y:.5,exits:[],encounter:"border_boss"}]},{id:"thornwood",name:"Thornwood Forest",act:1,zoneIndex:1,nodes:[{id:"forest_enter",type:"dialog",name:"Forest Edge",x:.08,y:.5,exits:["spider_hollow","hidden_path"]},{id:"spider_hollow",type:"combat",name:"Spider Hollow",x:.3,y:.28,exits:["goblin_camp"],encounter:"spider_nest"},{id:"hidden_path",type:"lore",name:"Ancient Runestone",x:.3,y:.72,exits:["goblin_camp"]},{id:"goblin_camp",type:"combat",name:"Goblin Camp",x:.55,y:.5,exits:["seer_hut","treasure_grove"],encounter:"goblin_camp"},{id:"seer_hut",type:"dialog",name:"The Seer's Hut",x:.75,y:.28,exits:["thornwood_boss"]},{id:"treasure_grove",type:"treasure",name:"Hidden Grove",x:.75,y:.72,exits:["thornwood_boss"]},{id:"thornwood_boss",type:"boss",name:"The Veil Wardens",x:.92,y:.5,exits:[],encounter:"thornwood_boss"}]}],He=[{id:"dust_roads",name:"The Dust Roads",act:2,zoneIndex:0,nodes:[{id:"ash_gate",type:"dialog",name:"Ashen Gate",x:.08,y:.5,exits:["dust_patrol","ash_lore"]},{id:"dust_patrol",type:"combat",name:"Ash Patrol",x:.28,y:.28,exits:["obsidian_fort"],encounter:"ash_patrol"},{id:"ash_lore",type:"lore",name:"Ruined Outpost",x:.28,y:.72,exits:["obsidian_fort"]},{id:"obsidian_fort",type:"combat",name:"Obsidian Garrison",x:.52,y:.5,exits:["ember_path","veil_camp"],encounter:"obsidian_garrison"},{id:"ember_path",type:"ambush",name:"Ember Path",x:.72,y:.28,exits:["dust_boss"],encounter:"ember_ambush"},{id:"veil_camp",type:"combat",name:"Veil Cult Camp",x:.72,y:.72,exits:["dust_boss"],encounter:"veil_cult_camp"},{id:"dust_boss",type:"boss",name:"The Lava Titan",x:.92,y:.5,exits:[],encounter:"lava_titan"}]},{id:"ember_plateau",name:"The Ember Plateau",act:2,zoneIndex:1,nodes:[{id:"plateau_enter",type:"dialog",name:"Plateau Ascent",x:.08,y:.5,exits:["lava_fields","ancient_shrine"]},{id:"lava_fields",type:"combat",name:"Lava Fields",x:.3,y:.3,exits:["veil_stronghold"],encounter:"ash_patrol"},{id:"ancient_shrine",type:"treasure",name:"Ancient Shrine",x:.3,y:.7,exits:["veil_stronghold"]},{id:"veil_stronghold",type:"combat",name:"Veil Stronghold",x:.55,y:.5,exits:["rift_access","lore_monolith"],encounter:"veil_cult_camp"},{id:"rift_access",type:"dialog",name:"The Rift Access",x:.75,y:.28,exits:["plateau_boss"]},{id:"lore_monolith",type:"lore",name:"Veil Monolith",x:.75,y:.72,exits:["plateau_boss"]},{id:"plateau_boss",type:"boss",name:"Veil High Priest",x:.92,y:.5,exits:[],encounter:"veil_high_priest"}]}],De=[{id:"hell_breach",name:"The Hell Breach",act:3,zoneIndex:0,nodes:[{id:"breach_gate",type:"dialog",name:"The Veil Breach",x:.08,y:.5,exits:["demon_patrol","fell_ruins"]},{id:"demon_patrol",type:"combat",name:"Demon Patrol",x:.3,y:.28,exits:["inferno_keep"],encounter:"demon_patrol"},{id:"fell_ruins",type:"lore",name:"Fell Ruins",x:.3,y:.72,exits:["inferno_keep"]},{id:"inferno_keep",type:"combat",name:"Inferno Keep",x:.55,y:.5,exits:["void_altar","soul_prison"],encounter:"hell_garrison"},{id:"void_altar",type:"dialog",name:"The Void Altar",x:.75,y:.28,exits:["breach_boss"]},{id:"soul_prison",type:"treasure",name:"Soul Prison",x:.75,y:.72,exits:["breach_boss"]},{id:"breach_boss",type:"boss",name:"Archfiend Malgrath",x:.92,y:.5,exits:[],encounter:"archfiend_malgrath"}]},{id:"shattered_core",name:"The Shattered Core",act:3,zoneIndex:1,nodes:[{id:"core_enter",type:"dialog",name:"Core Entrance",x:.08,y:.5,exits:["rift_demons","void_nexus"]},{id:"rift_demons",type:"combat",name:"Rift Demons",x:.3,y:.28,exits:["shard_fortress"],encounter:"rift_assault"},{id:"void_nexus",type:"ambush",name:"Void Nexus",x:.3,y:.72,exits:["shard_fortress"],encounter:"void_nexus_ambush"},{id:"shard_fortress",type:"combat",name:"Shard Fortress",x:.55,y:.5,exits:["the_wound","ancient_seal"],encounter:"hell_garrison"},{id:"the_wound",type:"lore",name:"The Wound",x:.75,y:.28,exits:["core_boss"]},{id:"ancient_seal",type:"dialog",name:"Ancient Seal",x:.75,y:.72,exits:["core_boss"]},{id:"core_boss",type:"boss",name:"The Emberveil Sovereign",x:.92,y:.5,exits:[],encounter:"emberveil_sovereign"}]}],Be=[{id:"cosmic_rift",name:"The Cosmic Rift",act:4,zoneIndex:0,nodes:[{id:"rift_entry",type:"dialog",name:"Edge of Reality",x:.08,y:.5,exits:["star_fields","void_expanse"]},{id:"star_fields",type:"combat",name:"The Broken Stars",x:.3,y:.28,exits:["cosmic_bastion"],encounter:"void_horde"},{id:"void_expanse",type:"shrine",name:"Cosmic Shrine",x:.3,y:.72,exits:["cosmic_bastion"],shrineType:"empower"},{id:"cosmic_bastion",type:"combat",name:"Cosmic Bastion",x:.55,y:.5,exits:["prophet_sanctum","titan_pit"],encounter:"cosmic_assault"},{id:"prophet_sanctum",type:"dialog",name:"Void Prophet's Sanctum",x:.75,y:.28,exits:["rift_boss"]},{id:"titan_pit",type:"challenge",name:"Titan's Pit",x:.75,y:.72,exits:["rift_boss"],encounter:"cosmic_assault"},{id:"rift_boss",type:"boss",name:"The Void Herald",x:.92,y:.5,exits:[],encounter:"void_horde"}]},{id:"eternal_void",name:"The Eternal Void",act:4,zoneIndex:1,nodes:[{id:"void_gates",type:"dialog",name:"Gates of the Void",x:.08,y:.5,exits:["star_horror_swarm","void_library"]},{id:"star_horror_swarm",type:"combat",name:"Star Horror Swarm",x:.3,y:.28,exits:["unraveler_ante"],encounter:"cosmic_assault"},{id:"void_library",type:"lore",name:"The Void Library",x:.3,y:.72,exits:["unraveler_ante"]},{id:"unraveler_ante",type:"combat",name:"Antechamber of Unmaking",x:.55,y:.5,exits:["last_shrine","final_trial"],encounter:"void_horde"},{id:"last_shrine",type:"shrine",name:"The Last Shrine",x:.75,y:.28,exits:["void_boss"],shrineType:"fullrestore"},{id:"final_trial",type:"challenge",name:"Trial of the Void",x:.75,y:.72,exits:["void_boss"],encounter:"cosmic_assault"},{id:"void_boss",type:"boss",name:"The Unraveler",x:.92,y:.5,exits:[],encounter:"unraveler"}]}],Re=[{id:"abyssal_depths",name:"The Abyssal Depths",act:5,zoneIndex:0,nodes:[{id:"abyss_gate",type:"dialog",name:"The Abyss Gate",x:.08,y:.5,exits:["drowned_halls","memory_pool"]},{id:"drowned_halls",type:"combat",name:"Drowned Halls",x:.3,y:.28,exits:["nexus_core"],encounter:"primordial_patrol"},{id:"memory_pool",type:"lore",name:"Pool of Memories",x:.3,y:.72,exits:["nexus_core"]},{id:"nexus_core",type:"combat",name:"Nexus Core",x:.55,y:.5,exits:["origin_shrine","worm_den"],encounter:"abyssal_garrison"},{id:"origin_shrine",type:"shrine",name:"Origin Shrine",x:.75,y:.28,exits:["abyss_boss"],shrineType:"empower"},{id:"worm_den",type:"combat",name:"Genesis Worm Den",x:.75,y:.72,exits:["abyss_boss"],encounter:"genesis_nest"},{id:"abyss_boss",type:"boss",name:"The Primordial King",x:.92,y:.5,exits:[],encounter:"abyssal_garrison"}]},{id:"primordial_nexus",name:"The Primordial Nexus",act:5,zoneIndex:1,nodes:[{id:"nexus_gates",type:"dialog",name:"Gates of Creation",x:.08,y:.5,exits:["shard_storm","echo_chamber"]},{id:"shard_storm",type:"combat",name:"Reality Shard Storm",x:.3,y:.28,exits:["architect_bridge"],encounter:"primordial_patrol"},{id:"echo_chamber",type:"lore",name:"Echo Chamber",x:.3,y:.72,exits:["architect_bridge"]},{id:"architect_bridge",type:"combat",name:"Bridge of Making",x:.55,y:.5,exits:["last_prayer","crucible"],encounter:"genesis_nest"},{id:"last_prayer",type:"shrine",name:"The Last Prayer",x:.75,y:.28,exits:["architect_boss"],shrineType:"fullrestore"},{id:"crucible",type:"challenge",name:"The Crucible",x:.75,y:.72,exits:["architect_boss"],encounter:"abyssal_garrison"},{id:"architect_boss",type:"boss",name:"The Architect",x:.92,y:.5,exits:[],encounter:"the_architect_final"}]}],qe={border_roads:["goblin_patrol","corrupted_outpost","bandit_ambush"],thornwood:["spider_nest","goblin_camp","wolf_pack","bear_ambush"],dust_roads:["ash_patrol","obsidian_garrison","ember_ambush"],ember_plateau:["ash_patrol","veil_cult_camp","obsidian_garrison"],hell_breach:["demon_patrol","hell_garrison","rift_assault"],shattered_core:["hell_garrison","rift_assault","void_nexus_ambush"],cosmic_rift:["void_horde","cosmic_assault"],eternal_void:["void_horde","cosmic_assault"],abyssal_depths:["primordial_patrol","abyssal_garrison","genesis_nest"],primordial_nexus:["primordial_patrol","abyssal_garrison","genesis_nest"]},ne={shady_wanderer:{id:"shady_wanderer",npcName:"Shady Wanderer",npcPortrait:null,lines:[{speaker:"npc",text:"Oi, hold it right there. Road toll's been raised to ten gold. Goblins broke the bridge further north, y'see..."},{speaker:"hero",text:"(He's clearly lying — the bridge is visible behind him, intact.)"}],choices:[{text:"Pay 10 gold.",effect:{gold:-10},outcome:"pay"},{text:"Refuse. Prepare to fight.",effect:{startCombat:"bandit_ambush"},outcome:"fight"},{text:"[DEX 14] Slip past unseen.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"sneak_past",fail:"fight"}}],outcomes:{pay:{text:"He takes your coin with a sneer and steps aside."},fight:{text:`He raises his blade. "Should've paid up!"`,startCombat:"bandit_ambush"},sneak_past:{text:"You melt into the shadows and pass by unseen. He never knew you were there."}}},forest_enter:{id:"forest_enter",npcName:"Forest Warden",npcPortrait:null,lines:[{speaker:"npc",text:"The Thornwood has changed. The wolves don't flee from torchlight anymore. Something corrupted them — the same wrongness that's taken the goblins."},{speaker:"npc",text:"If you enter, watch the tree lines. And whatever you hear at night... don't follow it."}],choices:[{text:"We'll press on. The source must be found.",outcome:"press_on"},{text:"[INT 12] Ask about the corruption's origin.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"learned_lore",fail:"press_on"}}],outcomes:{press_on:{text:"He nods grimly and steps aside."},learned_lore:{text:`He leans in. "There's a rift — deep in Thornwood. Something tore a hole between here and somewhere else. That's where it's pouring in."`,setFlag:"knows_rift_origin"}}},seer_hut:{id:"seer_hut",npcName:"Mira the Seer",npcPortrait:null,lines:[{speaker:"npc",text:"I have watched the Emberveil spread for thirty years. What you see is merely the symptom. The wound is somewhere else. Somewhere darker."},{speaker:"npc",text:"The goblins did not choose to be what they are now. Something reached into their minds and gave them purpose. A will from beyond."}],choices:[{text:"Where does the wound come from?",outcome:"ask_source"},{text:"Can you join our party?",outcome:"ask_join"},{text:"We will stop it.",outcome:"pledge"}],outcomes:{ask_source:{text:"Follow the corruption south. The Ashen Wastes — something ancient sleeps there, and it's waking."},ask_join:{text:"My bones are too old for roads. But carry this — it will help you recognize Veil artifacts when you find them.",reward:{item:"veil_lens"}},pledge:{text:"I hope you are right. More than you know.",setFlag:"seer_met"}}},ash_gate:{id:"ash_gate",npcName:"Ashen Sentinel",npcPortrait:null,lines:[{speaker:"npc",text:"Beyond this gate lie the Dust Roads. The air itself burns here — the Emberveil's corruption runs deep in this land."},{speaker:"npc",text:"Steel your nerves. The creatures here are not what they once were."}],choices:[{text:"We press forward.",outcome:"enter"},{text:"What happened here?",outcome:"ask"}],outcomes:{enter:{text:"The sentinel nods and steps aside, ash swirling in your wake."},ask:{text:"The veil tore open months ago. Fire and ash poured through. Everything it touched... changed."}}},plateau_enter:{id:"plateau_enter",npcName:"Scorched Hermit",npcPortrait:null,lines:[{speaker:"npc",text:"The Molten Plateau is no place for the living. Lava flows shift without warning, and the golems... they guard something ancient."}],choices:[{text:"We'll find a way through.",outcome:"enter"},{text:"What do they guard?",outcome:"ask"}],outcomes:{enter:{text:"He shakes his head slowly but does not stop you."},ask:{text:"A rift — older than the kingdom itself. It pulses with heat that no natural flame could produce."}}},rift_access:{id:"rift_access",npcName:"Dying Warden",npcPortrait:null,lines:[{speaker:"npc",text:"The rift... is just ahead. I tried to seal it, but the power was too great. You must succeed where I failed."}],choices:[{text:"We will end this.",outcome:"enter"}],outcomes:{enter:{text:'He slumps against the wall. "Go... quickly..."'}}},breach_gate:{id:"breach_gate",npcName:"Veil Watcher",npcPortrait:null,lines:[{speaker:"npc",text:"The Breach widens with every passing hour. Demons pour through — endless, relentless. This is the front line."}],choices:[{text:"We'll hold the line.",outcome:"enter"},{text:"How do we close it?",outcome:"ask"}],outcomes:{enter:{text:'She grips her blade tighter. "Then fight well."'},ask:{text:"Find the Void Altar deep within. Destroy it, and the breach should collapse."}}},void_altar:{id:"void_altar",npcName:"Echoing Voice",npcPortrait:null,lines:[{speaker:"npc",text:"You stand before the Void Altar. Reality warps around it — colors bleed, sound distorts. Power radiates from its core."}],choices:[{text:"Destroy the altar.",outcome:"destroy"},{text:"Study it first.",outcome:"study"}],outcomes:{destroy:{text:"You raise your weapon. The altar screams as the first blow lands."},study:{text:"Ancient runes cover its surface. This altar is a conduit — it channels power from somewhere far deeper."}}},core_enter:{id:"core_enter",npcName:"Spirit of the Veil",npcPortrait:null,lines:[{speaker:"npc",text:"You have reached the Core. Beyond this point, the veil between worlds is thinnest. The Sovereign waits within."}],choices:[{text:"We end this now.",outcome:"enter"}],outcomes:{enter:{text:"The spirit fades. The path ahead glows with terrible light."}}},ancient_seal:{id:"ancient_seal",npcName:"Ancient Seal",npcPortrait:null,lines:[{speaker:"npc",text:"The seal pulses weakly. Whatever power held this barrier is nearly spent. Beyond it, you sense an immense presence."}],choices:[{text:"Break the seal.",outcome:"break"}],outcomes:{break:{text:"The seal shatters with a sound like thunder. The way to the Sovereign is open."}}},rift_entry:{id:"rift_entry",npcName:"Void Echo",npcPortrait:null,lines:[{speaker:"npc",text:"Reality itself unravels here. The stars are wrong. The ground shifts beneath your feet. This is the edge of everything."}],choices:[{text:"We've come too far to turn back.",outcome:"enter"}],outcomes:{enter:{text:"The echo fades into silence. Only the void remains."}}},prophet_sanctum:{id:"prophet_sanctum",npcName:"Void Prophet",npcPortrait:null,lines:[{speaker:"npc",text:"You dare enter my sanctum? I have seen the end of all things. I have walked between stars. You are nothing."}],choices:[{text:"Your reign ends here.",outcome:"fight"},{text:"[INT 16] Challenge his prophecy.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"doubt",fail:"fight"}}],outcomes:{fight:{text:'He laughs — a sound like breaking glass. "Then come."',startCombat:!0},doubt:{text:'His eyes widen. "You... you see it too. The flaw in the pattern." His power wavers momentarily.'}}},void_gates:{id:"void_gates",npcName:"Gate Guardian",npcPortrait:null,lines:[{speaker:"npc",text:"The Gates of the Void stand open. Beyond them lies the true darkness — the source of everything that has plagued your world."}],choices:[{text:"We enter the void.",outcome:"enter"}],outcomes:{enter:{text:"The gates swing wide. Cold, absolute darkness swallows you whole."}}},abyss_gate:{id:"abyss_gate",npcName:"Guardian Shade",npcPortrait:null,lines:[{speaker:"npc",text:"Beyond lies the Abyss — where reality was born and where it ends. The Architect waits in the Primordial Nexus."}],choices:[{text:"We press on.",outcome:"enter"}],outcomes:{enter:{text:"The shade dissolves, granting passage to the depths below."}}},nexus_gates:{id:"nexus_gates",npcName:"Echo of Creation",npcPortrait:null,lines:[{speaker:"npc",text:"You stand at the threshold of all creation. The Architect shaped this reality — and now seeks to unmake it."}],choices:[{text:"End this.",outcome:"enter"}],outcomes:{enter:{text:"The echo fades, and the gates of creation swing open before you."}}}},K=[{id:"merchant_tinker",minLevel:1,zone:"any",npcName:"Halvir the Tinker",npcPortrait:null,lines:[{speaker:"npc",text:"Cogs and gears, friend! I fix what's broken and sell what ain't — yet."}],choices:[{text:"Browse wares (50 gold)",effect:{gold:-50},outcome:"buy"},{text:"No thanks.",outcome:"leave"}],outcomes:{buy:{text:"He hands you a bundle of salvaged parts. Crude, but usable.",reward:{gold:-50,item:"repair_kit"}},leave:{text:"He shrugs and rattles on down the road."}}},{id:"merchant_potion_seller",minLevel:1,zone:"any",npcName:"Old Bessa",npcPortrait:null,lines:[{speaker:"npc",text:"Healing draughts, traveler. Brewed fresh this morning from moonpetal and fen-root."}],choices:[{text:"Buy a potion (30 gold)",effect:{gold:-30},outcome:"buy"},{text:"[INT 10] Ask about her ingredients.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"discount",fail:"buy_normal"}},{text:"Pass.",outcome:"leave"}],outcomes:{buy:{text:"She hands over a warm vial. It smells of honey and earth.",reward:{heal:30}},discount:{text:'She grins. "You know your herbs! Half price for a fellow scholar." You get two vials for the price of one.',reward:{heal:60}},buy_normal:{text:`She squints at you. "Just buy or don't." You take one potion.`,reward:{heal:30}},leave:{text:"She returns to her mortar and pestle without a word."}}},{id:"merchant_arms_dealer",minLevel:3,zone:["border_roads","thornwood","dust_roads"],npcName:"Grenn Blackhand",npcPortrait:null,lines:[{speaker:"npc",text:"Steel. Good steel. Not that pig-iron the militia hands out."},{speaker:"npc",text:"Fifty gold gets you something that'll actually cut."}],choices:[{text:"Buy a weapon (50 gold)",effect:{gold:-50},outcome:"buy"},{text:"[STR 12] Arm-wrestle for a discount.",skillCheck:{stat:"STR",dc:12},outcomes:{pass:"discount",fail:"insult"}},{text:"Move on.",outcome:"leave"}],outcomes:{buy:{text:"He slaps a short blade into your hand. It's heavier than it looks. Good."},discount:{text:`He laughs as you pin his wrist. "Fair's fair. Take a blade, half price."`,reward:{gold:25}},insult:{text:'"Weak grip for a warrior." He charges full price. You pay begrudgingly.'},leave:{text:"He spits and resharpens a dagger."}}},{id:"merchant_mysterious_cloaked",minLevel:5,zone:"any",npcName:"The Hooded Merchant",npcPortrait:null,lines:[{speaker:"npc",text:"I trade in things people don't want others to know they need."}],choices:[{text:"Show me what you have.",outcome:"browse"},{text:"[INT 14] Something about you feels wrong.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"detect",fail:"browse"}},{text:"Not interested.",outcome:"leave"}],outcomes:{browse:{text:'He produces a vial of shimmering black liquid. "Voidtouch Elixir. Doubles your next strike — but it burns going down."',reward:{item:"voidtouch_elixir"}},detect:{text:'His eyes flicker — literally. Something inhuman peers through them. "Perceptive. Here — a gift, so you forget what you saw."',reward:{gold:40}},leave:{text:"He vanishes the moment you turn away. When you look back, only footprints remain."}}},{id:"merchant_goblin_trader",minLevel:2,zone:["border_roads","thornwood"],npcName:"Skrit",npcPortrait:null,lines:[{speaker:"npc",text:"No stab! Skrit is trader, not fighter! Skrit has shinies!"}],choices:[{text:"Trade with the goblin (25 gold)",effect:{gold:-25},outcome:"trade"},{text:"Threaten him for his goods.",outcome:"threaten"},{text:"Leave him be.",outcome:"leave"}],outcomes:{trade:{text:"Skrit hands you a handful of mismatched but surprisingly useful trinkets.",reward:{gold:-25,heal:15}},threaten:{text:"Skrit shrieks and bolts into the underbrush, dropping a few coins in his panic.",reward:{gold:10}},leave:{text:"Skrit waves a tiny hand and disappears into a hollow log."}}},{id:"merchant_relic_collector",minLevel:8,zone:["dust_roads","ember_plateau","hell_breach"],npcName:"Sereth the Collector",npcPortrait:null,lines:[{speaker:"npc",text:"I seek fragments of the old world. Before the Veil. Before the fire."},{speaker:"npc",text:"If you find anything... unusual... bring it to me. I pay well."}],choices:[{text:"Ask what he's collected.",outcome:"ask"},{text:"Sell him information about the Veil.",outcome:"sell_info"},{text:"Walk away.",outcome:"leave"}],outcomes:{ask:{text:'He shows you a shard of glass that shows a different sky when you look through it. "The world before," he whispers.'},sell_info:{text:`He listens intently, scribbling notes. "Invaluable. Here — you've earned this."`,reward:{gold:60}},leave:{text:"He returns to cataloging bone fragments with unsettling tenderness."}}},{id:"merchant_wandering_chef",minLevel:1,zone:"any",npcName:"Durma Stewpot",npcPortrait:null,lines:[{speaker:"npc",text:"Hot stew! Best you'll find between here and the grave. Five gold a bowl."}],choices:[{text:"Eat stew (5 gold)",effect:{gold:-5},outcome:"eat"},{text:"What's in it?",outcome:"ask"},{text:"No time.",outcome:"leave"}],outcomes:{eat:{text:"It's genuinely excellent. Warmth spreads through your bones.",reward:{heal:20}},ask:{text:`"Don't ask questions you don't want answered." She ladles you a free sample. It's delicious.`,reward:{heal:10}},leave:{text:'She shrugs. "More for me."'}}},{id:"merchant_fence",minLevel:4,zone:["border_roads","dust_roads"],npcName:"Silk-Finger Tav",npcPortrait:null,lines:[{speaker:"npc",text:"I move goods that don't like being moved. Discretion guaranteed."}],choices:[{text:"Buy something shady (40 gold)",effect:{gold:-40},outcome:"buy"},{text:"[DEX 12] Pickpocket him instead.",skillCheck:{stat:"DEX",dc:12},outcomes:{pass:"steal",fail:"caught"}},{text:"Leave.",outcome:"leave"}],outcomes:{buy:{text:`He slips a lockpick set into your hand. "You didn't get these from me."`,reward:{item:"lockpick_set"}},steal:{text:"Your fingers close around his coin pouch before he blinks. Easy.",reward:{gold:35}},caught:{text:'He catches your wrist. "Try that again and you lose the hand." He shoves you away.',reward:{damage:5}},leave:{text:"He melts back into the shadows."}}},{id:"merchant_lost_caravan",minLevel:3,zone:["border_roads","thornwood","dust_roads"],npcName:"Caravan Master Jorla",npcPortrait:null,lines:[{speaker:"npc",text:"We were bound for Emberglen when the road... shifted. Nothing looks right anymore."},{speaker:"npc",text:"Please — take what you need. We just want to get home alive."}],choices:[{text:"Help them find the road.",outcome:"help"},{text:"Take supplies and leave.",outcome:"take"},{text:"[INT 12] The Veil is distorting this area.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"explain",fail:"help"}}],outcomes:{help:{text:"You guide them back to a familiar landmark. They thank you with supplies.",reward:{gold:20,heal:15}},take:{text:"They watch with hollow eyes as you take what you need. The road claims many."},explain:{text:"Understanding the distortion, you lead them safely and earn their deep gratitude.",reward:{gold:40,heal:20}}}},{id:"merchant_ember_peddler",minLevel:6,zone:["dust_roads","ember_plateau"],npcName:"Cindra Ashborn",npcPortrait:null,lines:[{speaker:"npc",text:"Ember crystals. Harvested from the cooling flows. They hold fire like a memory."}],choices:[{text:"Buy an ember crystal (35 gold)",effect:{gold:-35},outcome:"buy"},{text:"Where do you harvest them?",outcome:"ask"},{text:"Too rich for my blood.",outcome:"leave"}],outcomes:{buy:{text:"The crystal pulses with warmth in your hand. You feel it strengthening you.",reward:{heal:25}},ask:{text:`"The lava fields. Most harvesters don't come back. That's why the price is fair."`},leave:{text:"She tucks the crystals back into their heat-proof case."}}},{id:"merchant_void_smuggler",minLevel:12,zone:["hell_breach","shattered_core","cosmic_rift"],npcName:"Null",npcPortrait:null,lines:[{speaker:"npc",text:"I carry things from the other side. Things that shouldn't exist here. But they do."}],choices:[{text:"What do you have?",outcome:"browse"},{text:"How are you still alive in here?",outcome:"ask"},{text:"Nothing from the Void is worth the risk.",outcome:"leave"}],outcomes:{browse:{text:"He opens a case that seems deeper than it should be. Inside: a shard of frozen starlight.",reward:{item:"starlight_shard"}},ask:{text:`"Alive is a generous word." His hand passes through the wall beside him. He's not entirely here.`},leave:{text:'He nods. "Wise, perhaps. Or merely fearful."'}}},{id:"merchant_herb_witch",minLevel:2,zone:["thornwood","border_roads"],npcName:"Yenna Rootwise",npcPortrait:null,lines:[{speaker:"npc",text:"The forest provides, if you know where to look. I know where to look."}],choices:[{text:"Buy herbs (15 gold)",effect:{gold:-15},outcome:"buy"},{text:"[INT 10] Identify her herbs yourself.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"identify",fail:"wrong"}},{text:"Continue on.",outcome:"leave"}],outcomes:{buy:{text:`She wraps a bundle of healing herbs in broad leaves. "Chew, don't swallow whole."`,reward:{heal:20}},identify:{text:`"Sharp eyes! That one's dreamcap — rare. Take it, you've earned it."`,reward:{heal:35}},wrong:{text:`"That's nightbane, dear. You'd be dead in an hour." She sells you the right ones for full price.`,reward:{heal:15}},leave:{text:"She hums a tune and disappears between the trees."}}},{id:"merchant_dwarf_smith",minLevel:5,zone:["dust_roads","ember_plateau"],npcName:"Brogar Anviltooth",npcPortrait:null,lines:[{speaker:"npc",text:"The heat here is perfect for forging. I've been working the lava vents for years."}],choices:[{text:"Commission a repair (30 gold)",effect:{gold:-30},outcome:"repair"},{text:"Buy his best work (80 gold)",effect:{gold:-80},outcome:"buy_best"},{text:"Just passing through.",outcome:"leave"}],outcomes:{repair:{text:"He hammers your gear back into shape with frightening precision.",reward:{heal:15}},buy_best:{text:`He hands you a blade that glows faintly orange. "Lava-tempered. It'll cut through anything mortal."`,reward:{item:"lava_blade"}},leave:{text:"He grunts and returns to his anvil."}}},{id:"merchant_scroll_seller",minLevel:4,zone:"any",npcName:"Quill",npcPortrait:null,lines:[{speaker:"npc",text:"Scrolls! Maps! Histories of places that no longer exist! Knowledge is power, friend."}],choices:[{text:"Buy a scroll (20 gold)",effect:{gold:-20},outcome:"buy"},{text:"[INT 14] Ask about forbidden texts.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"forbidden",fail:"normal"}},{text:"Not now.",outcome:"leave"}],outcomes:{buy:{text:"He hands you a map fragment. It shows a route you haven't seen before."},forbidden:{text:'His eyes widen. "You know of them? Then take this — it speaks of the first Veil breach."',reward:{setFlag:"knows_first_breach"}},normal:{text:'"Everything I sell is perfectly legal. Mostly." He gives you a standard map.'},leave:{text:"He rolls up his scrolls with practiced fingers."}}},{id:"merchant_war_profiteer",minLevel:7,zone:["dust_roads","ember_plateau","hell_breach"],npcName:"Kessler",npcPortrait:null,lines:[{speaker:"npc",text:"War is hell. But it's also extremely profitable."},{speaker:"npc",text:"I've got salvage from the front lines. Weapons, armor, things pried from dead hands."}],choices:[{text:"Buy salvage (45 gold)",effect:{gold:-45},outcome:"buy"},{text:"That's looting the dead.",outcome:"moralize"},{text:"Leave.",outcome:"leave"}],outcomes:{buy:{text:"The gear is dented but functional. Better than nothing.",reward:{heal:10}},moralize:{text:`"The dead don't need swords, friend. The living do." He shrugs and counts his coins.`},leave:{text:"He's already haggling with someone else before you turn away."}}},{id:"combat_bandit_toll",minLevel:1,zone:["border_roads","thornwood"],npcName:"Bandit Leader",npcPortrait:null,lines:[{speaker:"npc",text:"This road belongs to us now. Pay the toll or bleed."}],choices:[{text:"Pay 20 gold.",effect:{gold:-20},outcome:"pay"},{text:"Draw your weapon.",outcome:"fight"},{text:"[DEX 12] Dart past them.",skillCheck:{stat:"DEX",dc:12},outcomes:{pass:"escape",fail:"fight"}}],outcomes:{pay:{text:"They step aside with mocking bows. Cowards preying on travelers."},fight:{text:"Steel rings on steel. They chose the wrong target today.",startCombat:!0},escape:{text:"You slip through their ranks before they can react. Shouts fade behind you."}}},{id:"combat_wolf_pack",minLevel:2,zone:["border_roads","thornwood"],npcName:"Pack Alpha",npcPortrait:null,lines:[{speaker:"hero",text:"Wolves. At least six of them, circling. Their eyes glow with unnatural light."}],choices:[{text:"Stand your ground and fight.",outcome:"fight"},{text:"[STR 10] Intimidate them with a battle cry.",skillCheck:{stat:"STR",dc:10},outcomes:{pass:"scare",fail:"fight"}},{text:"Throw rations to distract them.",outcome:"distract"}],outcomes:{fight:{text:"The alpha lunges. No more waiting.",startCombat:!0},scare:{text:"Your roar echoes off the rocks. The pack hesitates, then slinks away into the mist."},distract:{text:"They tear into the food. You back away slowly while they feast.",reward:{gold:-5}}}},{id:"combat_goblin_ambush",minLevel:1,zone:["border_roads","thornwood"],npcName:"Goblin Warband",npcPortrait:null,lines:[{speaker:"hero",text:"An arrow thuds into the tree beside your head. Goblins in the branches, more on the ground."}],choices:[{text:"Charge into the ambush.",outcome:"fight"},{text:"[DEX 14] Roll behind cover and flank them.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"flank",fail:"fight"}},{text:"Retreat.",outcome:"retreat"}],outcomes:{fight:{text:"You crash through their line. They weren't expecting aggression.",startCombat:!0},flank:{text:"You circle behind their archers and scatter them. The rest flee in panic.",reward:{gold:15}},retreat:{text:"You pull back, but not before a crude arrow catches your shoulder.",reward:{damage:12}}}},{id:"combat_spider_nest",minLevel:3,zone:["thornwood"],npcName:"Giant Spider",npcPortrait:null,lines:[{speaker:"hero",text:"Webs everywhere. Thick, sticky strands between the trees. Something moves in the canopy above."}],choices:[{text:"Burn the webs and fight.",outcome:"burn"},{text:"Try to sneak through.",outcome:"sneak"},{text:"[INT 12] Study the web pattern to find a safe path.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"safe_path",fail:"trapped"}}],outcomes:{burn:{text:"Fire drives them out — screeching, furious, and very much alive.",startCombat:!0},sneak:{text:"A strand brushes your arm. The vibration brings them all at once.",startCombat:!0,reward:{damage:5}},safe_path:{text:"You map the dead zones in the web and pass through without touching a single strand."},trapped:{text:"You misjudge the pattern and walk straight into an anchor line. They descend instantly.",startCombat:!0,reward:{damage:8}}}},{id:"combat_deserter_squad",minLevel:4,zone:["dust_roads","ember_plateau"],npcName:"Deserter Captain",npcPortrait:null,lines:[{speaker:"npc",text:"We left the garrison. They can hang us for that. But we're not going back to die for nothing."},{speaker:"npc",text:"Give us your supplies and walk. Nobody gets hurt."}],choices:[{text:"Hand over 30 gold.",effect:{gold:-30},outcome:"pay"},{text:"Fight them.",outcome:"fight"},{text:"[INT 14] Convince them to join you instead.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"recruit",fail:"fight"}}],outcomes:{pay:{text:"They take it and disappear. Survival makes villains of us all."},fight:{text:"They draw weapons. Desperate men fight hardest.",startCombat:!0},recruit:{text:`"You're heading into the fire? ...Fine. At least it's a cause." They share what intelligence they have.`,reward:{gold:20}}}},{id:"combat_ash_wraith_attack",minLevel:6,zone:["dust_roads","ember_plateau"],npcName:"Ash Wraith",npcPortrait:null,lines:[{speaker:"hero",text:"The ash swirls into a shape — humanoid, but wrong. Hollow eyes burn with pale fire."}],choices:[{text:"Draw weapons.",outcome:"fight"},{text:"[INT 14] Attempt to banish it with willpower.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"banish",fail:"fight"}},{text:"Run.",outcome:"flee"}],outcomes:{fight:{text:"It shrieks — a sound like tearing metal — and attacks.",startCombat:!0},banish:{text:"You push your will against it. It screams, fragments, and dissolves back into ash. Something glints where it stood.",reward:{gold:30}},flee:{text:"You turn and run. Cold fingers rake your back before the distance saves you.",reward:{damage:15}}}},{id:"combat_demon_ambush",minLevel:10,zone:["hell_breach","shattered_core"],npcName:"Imp Swarm",npcPortrait:null,lines:[{speaker:"hero",text:"The ground splits. Imps pour from the cracks, giggling with needle-toothed glee."}],choices:[{text:"Stand and fight.",outcome:"fight"},{text:"[STR 16] Collapse the fissure with a boulder.",skillCheck:{stat:"STR",dc:16},outcomes:{pass:"collapse",fail:"fight"}},{text:"Fall back to defensible ground.",outcome:"retreat"}],outcomes:{fight:{text:"They swarm you in a chittering mass.",startCombat:!0},collapse:{text:"You heave a massive stone over the fissure. It seals with a satisfying crunch. Muffled shrieks below."},retreat:{text:"You find a narrow passage. They can only come at you one at a time — but they keep coming.",startCombat:!0}}},{id:"combat_veil_cultists",minLevel:7,zone:["ember_plateau","hell_breach"],npcName:"Veil Acolyte",npcPortrait:null,lines:[{speaker:"npc",text:"The Veil will claim all. You can kneel now or be consumed later."}],choices:[{text:"Never.",outcome:"fight"},{text:"[INT 16] Counter their doctrine with logic.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"demoralize",fail:"fight"}},{text:"Pretend to kneel, then strike.",outcome:"trick"}],outcomes:{fight:{text:'"So be it." Their hands crackle with dark energy.',startCombat:!0},demoralize:{text:"Doubt flickers in their eyes. Two acolytes lower their hands and flee. The rest are shaken.",reward:{gold:25}},trick:{text:"You drop to one knee — then drive your blade upward. The surprise gives you the advantage.",startCombat:!0,reward:{heal:10}}}},{id:"combat_highway_robbers",minLevel:2,zone:["border_roads"],npcName:"Masked Robber",npcPortrait:null,lines:[{speaker:"npc",text:"Your gold or your life. Simple transaction."}],choices:[{text:"Hand over gold (15 gold).",effect:{gold:-15},outcome:"pay"},{text:"Fight.",outcome:"fight"},{text:"[DEX 10] Quick-draw and strike first.",skillCheck:{stat:"DEX",dc:10},outcomes:{pass:"quick_draw",fail:"fight"}}],outcomes:{pay:{text:"He pockets the gold and vanishes into the brush. Efficient."},fight:{text:"He's faster than he looks. But not fast enough.",startCombat:!0},quick_draw:{text:"Your blade is at his throat before his hand reaches his hilt. He drops his weapon and runs.",reward:{gold:20}}}},{id:"combat_corrupted_treant",minLevel:5,zone:["thornwood"],npcName:"Corrupted Treant",npcPortrait:null,lines:[{speaker:"hero",text:"The oak splits open. What steps out was a tree once — now it's a nightmare of bark and black sap."}],choices:[{text:"Attack before it fully forms.",outcome:"fight"},{text:"Set it ablaze.",outcome:"burn"},{text:"[INT 12] Look for the corruption source.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"purify",fail:"fight"}}],outcomes:{fight:{text:"Roots erupt from the ground as it swings a limb like a battering ram.",startCombat:!0},burn:{text:"Fire catches the black sap. It screams — a sound no tree should make — but burns fast.",reward:{gold:15}},purify:{text:"You spot a pulsing black node in its trunk. One precise strike shatters it. The tree collapses, purified.",reward:{gold:25,heal:10}}}},{id:"combat_void_stalker",minLevel:14,zone:["cosmic_rift","eternal_void"],npcName:"Void Stalker",npcPortrait:null,lines:[{speaker:"hero",text:"Something is following you. You can't see it, but you feel it — a presence pressing against reality like a finger testing cloth."}],choices:[{text:"Force it to reveal itself.",outcome:"fight"},{text:"[INT 18] Trace its resonance pattern.",skillCheck:{stat:"INT",dc:18},outcomes:{pass:"trace",fail:"fight"}},{text:"Keep walking. Don't acknowledge it.",outcome:"ignore"}],outcomes:{fight:{text:"It tears through the membrane of space. All teeth. All hunger.",startCombat:!0},trace:{text:"You find its anchor point and sever it. The stalker is flung back into the void, howling.",reward:{gold:50}},ignore:{text:"It follows for hours before losing interest. You don't sleep well that night.",reward:{damage:8}}}},{id:"combat_undead_patrol",minLevel:8,zone:["hell_breach","shattered_core"],npcName:"Skeletal Warden",npcPortrait:null,lines:[{speaker:"hero",text:"The dead march in formation. Someone — something — gave them orders they still follow."}],choices:[{text:"Engage them.",outcome:"fight"},{text:"Let them pass.",outcome:"wait"},{text:"[INT 14] Command them to halt.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"command",fail:"fight"}}],outcomes:{fight:{text:"They turn in unison. Empty sockets lock onto you. They charge.",startCombat:!0},wait:{text:"They march past without seeing you. One drops a coin purse.",reward:{gold:12}},command:{text:'"HALT." Your voice carries authority. They stop. Then crumble, whatever magic held them spent.',reward:{gold:30}}}},{id:"combat_cinder_hounds",minLevel:6,zone:["dust_roads","ember_plateau"],npcName:"Cinder Hound Pack",npcPortrait:null,lines:[{speaker:"hero",text:"Three shapes made of living coal. Their growls sound like crackling embers."}],choices:[{text:"Fight them.",outcome:"fight"},{text:"Douse them with water.",outcome:"water"},{text:"[STR 14] Kick burning debris at them.",skillCheck:{stat:"STR",dc:14},outcomes:{pass:"scatter",fail:"fight"}}],outcomes:{fight:{text:"They leap, trailing sparks and ash.",startCombat:!0},water:{text:"Steam erupts as you empty your waterskin. One goes down, but the others circle.",startCombat:!0,reward:{heal:10}},scatter:{text:"You launch a burning log into their midst. They yelp and bolt, confused by the competing fire.",reward:{gold:15}}}},{id:"combat_cosmic_horror",minLevel:16,zone:["cosmic_rift","eternal_void"],npcName:"Star Spawn",npcPortrait:null,lines:[{speaker:"hero",text:"It has too many limbs. Too many eyes. Looking at it makes your thoughts slide sideways."}],choices:[{text:"Attack while you can still think.",outcome:"fight"},{text:"[INT 20] Focus through the madness.",skillCheck:{stat:"INT",dc:20},outcomes:{pass:"focus",fail:"madness"}},{text:"Avert your eyes and flee.",outcome:"flee"}],outcomes:{fight:{text:"Reality warps around you as it screams in a frequency your bones feel.",startCombat:!0},focus:{text:"You pierce through its psychic haze and strike at its core essence. It shrieks and folds back into the void.",reward:{gold:80}},madness:{text:"Your mind buckles. When you come to, it's gone — but so is some of your blood.",reward:{damage:25}},flee:{text:"You run until your lungs burn. The whispers follow you for miles.",reward:{damage:10}}}},{id:"combat_possessed_knight",minLevel:9,zone:["hell_breach","shattered_core"],npcName:"Hollow Knight",npcPortrait:null,lines:[{speaker:"npc",text:"Run... while I... can still... hold it..."},{speaker:"hero",text:"His eyes flash red. Whatever was holding the demon back just lost."}],choices:[{text:"Put him down. It's a mercy.",outcome:"fight"},{text:"[INT 16] Try to exorcise the demon.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"exorcise",fail:"fight"}},{text:"Do as he says — run.",outcome:"flee"}],outcomes:{fight:{text:"The demon takes full control. The knight's body moves with inhuman speed.",startCombat:!0},exorcise:{text:'You speak words of binding. The demon screams and tears free, dissolving. The knight collapses, alive. "Thank you..."',reward:{gold:40,setFlag:"saved_hollow_knight"}},flee:{text:"Behind you, the knight screams — then silence. You don't look back.",reward:{damage:5}}}},{id:"skill_locked_chest",minLevel:1,zone:"any",npcName:"Locked Chest",npcPortrait:null,lines:[{speaker:"hero",text:"A heavy iron chest, half-buried in rubble. The lock is rusted but intact."}],choices:[{text:"[DEX 10] Pick the lock.",skillCheck:{stat:"DEX",dc:10},outcomes:{pass:"open",fail:"broken"}},{text:"[STR 14] Force it open.",skillCheck:{stat:"STR",dc:14},outcomes:{pass:"smash",fail:"hurt"}},{text:"Leave it.",outcome:"leave"}],outcomes:{open:{text:"The lock clicks. Inside: gold and a tarnished ring.",reward:{gold:35}},smash:{text:"The hinges shatter. Gold spills across the ground.",reward:{gold:40}},broken:{text:"Your pick snaps. The lock holds."},hurt:{text:"You wrench your shoulder. The chest doesn't budge.",reward:{damage:8}},leave:{text:"Some secrets are better left locked."}}},{id:"skill_collapsing_bridge",minLevel:2,zone:["border_roads","thornwood","dust_roads"],npcName:"Crumbling Bridge",npcPortrait:null,lines:[{speaker:"hero",text:"The rope bridge sways over a chasm. Half the planks are missing. The other half are rotten."}],choices:[{text:"[DEX 14] Sprint across before it collapses.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"sprint",fail:"fall"}},{text:"[STR 12] Climb across the support ropes.",skillCheck:{stat:"STR",dc:12},outcomes:{pass:"climb",fail:"fall"}},{text:"Find another route.",outcome:"detour"}],outcomes:{sprint:{text:"Your feet barely touch each plank. The bridge collapses behind you. Made it."},climb:{text:"Hand over hand, you crawl across the ropes. Your arms burn, but you make it."},fall:{text:"The wood gives way. You catch yourself on a rope, but the impact hurts.",reward:{damage:15}},detour:{text:"The long way around costs time but saves bones."}}},{id:"skill_ancient_puzzle",minLevel:4,zone:["thornwood","dust_roads","ember_plateau"],npcName:"Stone Puzzle Door",npcPortrait:null,lines:[{speaker:"hero",text:"A door sealed with rotating stone rings. Runes glow faintly in sequence — a combination lock from another age."}],choices:[{text:"[INT 14] Decipher the rune sequence.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"solve",fail:"wrong"}},{text:"[STR 18] Break the mechanism.",skillCheck:{stat:"STR",dc:18},outcomes:{pass:"break",fail:"sealed"}},{text:"Leave it sealed.",outcome:"leave"}],outcomes:{solve:{text:"The rings align. The door grinds open, revealing a cache of ancient gold.",reward:{gold:55}},wrong:{text:"A rune flashes red. Pain lances through your hand.",reward:{damage:10}},break:{text:"Stone shatters. Brute force has its merits. Gold gleams inside.",reward:{gold:45}},sealed:{text:"The stone is harder than it looks. The door remains shut."},leave:{text:"The runes fade as you walk away. Another mystery for another day."}}},{id:"skill_cliff_descent",minLevel:3,zone:["border_roads","dust_roads","ember_plateau"],npcName:"Cliff Edge",npcPortrait:null,lines:[{speaker:"hero",text:"A narrow trail descends a sheer cliff face. Something glints on a ledge halfway down."}],choices:[{text:"[DEX 12] Climb down to the ledge.",skillCheck:{stat:"DEX",dc:12},outcomes:{pass:"ledge",fail:"slip"}},{text:"[STR 10] Throw a rope and rappel.",skillCheck:{stat:"STR",dc:10},outcomes:{pass:"rappel",fail:"slip"}},{text:"Not worth the risk.",outcome:"leave"}],outcomes:{ledge:{text:"Your fingers find holds in the rock. On the ledge: a pouch of gems.",reward:{gold:30}},rappel:{text:"You descend smoothly and grab the cache. Climbing back up is easy.",reward:{gold:30}},slip:{text:"Your grip fails. You tumble, catching yourself painfully on a root.",reward:{damage:12}},leave:{text:"Whatever's down there can stay down there."}}},{id:"skill_trapped_corridor",minLevel:5,zone:["dust_roads","ember_plateau","hell_breach"],npcName:"Trapped Hall",npcPortrait:null,lines:[{speaker:"hero",text:"The corridor ahead has subtle grooves in the floor. Pressure plates. Classic."}],choices:[{text:"[DEX 16] Disarm the traps.",skillCheck:{stat:"DEX",dc:16},outcomes:{pass:"disarm",fail:"triggered"}},{text:"[INT 12] Map the safe path.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"map",fail:"triggered"}},{text:"Turn back.",outcome:"leave"}],outcomes:{disarm:{text:"Click. Click. Click. Three traps neutralized. You find salvage from previous victims.",reward:{gold:40}},map:{text:"You trace the pattern and step carefully. On the other side: untouched treasure.",reward:{gold:35}},triggered:{text:"A blade swings from the wall. You dodge most of it.",reward:{damage:18}},leave:{text:"Discretion over valor."}}},{id:"skill_negotiate_passage",minLevel:3,zone:["border_roads","thornwood"],npcName:"Guard Captain Voss",npcPortrait:null,lines:[{speaker:"npc",text:"Road's closed. Goblin activity ahead. Turn around."}],choices:[{text:"[INT 12] Convince him you can handle it.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"convince",fail:"denied"}},{text:"Pay the bribe (25 gold).",effect:{gold:-25},outcome:"bribe"},{text:"Obey and leave.",outcome:"leave"}],outcomes:{convince:{text:'"...Fine. But I warned you." He steps aside and slips you a map of goblin positions.',reward:{gold:15}},denied:{text:'"I said no. Do I need to repeat myself?"'},bribe:{text:`He pockets the coins without expression. "I didn't see you pass."`},leave:{text:"You turn back. There must be another way."}}},{id:"skill_river_crossing",minLevel:2,zone:["border_roads","thornwood"],npcName:"Rushing River",npcPortrait:null,lines:[{speaker:"hero",text:"The river runs fast and cold. No bridge. Stepping stones break the surface, slick with spray."}],choices:[{text:"[DEX 12] Hop across the stones.",skillCheck:{stat:"DEX",dc:12},outcomes:{pass:"hop",fail:"splash"}},{text:"[STR 14] Wade through the current.",skillCheck:{stat:"STR",dc:14},outcomes:{pass:"wade",fail:"swept"}},{text:"Find a ford upstream.",outcome:"ford"}],outcomes:{hop:{text:"Stone to stone, light as a cat. Something gleams in the riverbed — a gold coin caught in the rocks.",reward:{gold:10}},wade:{text:"The current hammers your legs but you power through. Cold, wet, but across."},splash:{text:"You slip on the third stone and go under. The cold hits like a fist.",reward:{damage:8}},swept:{text:"The river drags you downstream before you catch a root. Bruised but alive.",reward:{damage:12}},ford:{text:"A safer crossing, but it costs time."}}},{id:"skill_falling_rocks",minLevel:4,zone:["dust_roads","ember_plateau"],npcName:"Unstable Path",npcPortrait:null,lines:[{speaker:"hero",text:"The cliff above groans. Pebbles skitter down. The whole face could go at any moment."}],choices:[{text:"[DEX 14] Sprint through before it falls.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"sprint",fail:"hit"}},{text:"[STR 16] Hold a boulder aside for the group.",skillCheck:{stat:"STR",dc:16},outcomes:{pass:"hold",fail:"crushed"}},{text:"Wait for it to settle.",outcome:"wait"}],outcomes:{sprint:{text:"You clear the danger zone as tons of rock crash behind you. That was close."},hold:{text:"You brace against the boulder. Muscles scream. The party gets through.",reward:{heal:10}},hit:{text:"A rock clips your shoulder. You stumble through, bleeding.",reward:{damage:15}},crushed:{text:"The weight is too much. You dive clear, but not cleanly.",reward:{damage:20}},wait:{text:"Hours pass before it settles. You lose time, but nothing else."}}},{id:"skill_magic_ward",minLevel:6,zone:["ember_plateau","hell_breach","shattered_core"],npcName:"Arcane Ward",npcPortrait:null,lines:[{speaker:"hero",text:"A shimmering barrier blocks the passage. Ancient magic — but fraying at the edges."}],choices:[{text:"[INT 16] Unravel the ward's enchantment.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"unravel",fail:"backlash"}},{text:"[STR 18] Force through with raw power.",skillCheck:{stat:"STR",dc:18},outcomes:{pass:"force",fail:"shocked"}},{text:"Go around.",outcome:"leave"}],outcomes:{unravel:{text:"The ward dissolves thread by thread. Behind it: a sealed vault with ancient gold.",reward:{gold:60}},backlash:{text:"The ward retaliates. Lightning arcs through your body.",reward:{damage:20}},force:{text:"You charge through. The barrier shatters around you like glass. Treasure beyond.",reward:{gold:50}},shocked:{text:"The ward holds and punishes your attempt.",reward:{damage:25}},leave:{text:"Some doors are sealed for a reason."}}},{id:"skill_poison_mist",minLevel:5,zone:["thornwood","dust_roads"],npcName:"Poison Mist",npcPortrait:null,lines:[{speaker:"hero",text:"Thick green mist rolls through the valley ahead. It smells of copper and decay."}],choices:[{text:"[INT 12] Identify the toxin and find a countermeasure.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"counter",fail:"breathe"}},{text:"[DEX 14] Hold your breath and sprint through.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"sprint",fail:"breathe"}},{text:"Wait for the wind to shift.",outcome:"wait"}],outcomes:{counter:{text:"You crush fenroot under your nose — a natural filter. The mist parts harmlessly around you."},sprint:{text:"Lungs burning, you burst through the other side into clean air. Made it."},breathe:{text:"The mist sears your throat. You stagger through, coughing blood.",reward:{damage:15}},wait:{text:"The wind shifts after an hour. The mist thins enough to pass safely."}}},{id:"skill_crumbling_ruins",minLevel:7,zone:["ember_plateau","hell_breach"],npcName:"Unstable Ruins",npcPortrait:null,lines:[{speaker:"hero",text:"These ruins are a deathtrap. Every step could bring the ceiling down. But you can see gold glinting in the dust."}],choices:[{text:"[DEX 16] Navigate the debris carefully.",skillCheck:{stat:"DEX",dc:16},outcomes:{pass:"navigate",fail:"collapse"}},{text:"[INT 14] Calculate the load-bearing walls.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"calculate",fail:"collapse"}},{text:"Not worth dying for gold.",outcome:"leave"}],outcomes:{navigate:{text:"You tread like a ghost. The ruins hold. The gold is yours.",reward:{gold:50}},calculate:{text:"You map the safe zones and extract the treasure without disturbing a single stone.",reward:{gold:55}},collapse:{text:"A pillar buckles. You dive clear but catch a face full of stone dust.",reward:{damage:18}},leave:{text:"You back away as a wall collapses behind you. Good instincts."}}},{id:"skill_sealed_sarcophagus",minLevel:8,zone:["hell_breach","shattered_core"],npcName:"Ancient Sarcophagus",npcPortrait:null,lines:[{speaker:"hero",text:"A stone coffin covered in warning glyphs. Whatever's inside, someone went to great lengths to keep it sealed."}],choices:[{text:"[INT 16] Read the glyphs before opening.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"read",fail:"curse"}},{text:"[STR 14] Slide the lid open.",skillCheck:{stat:"STR",dc:14},outcomes:{pass:"open",fail:"stuck"}},{text:"Leave it sealed.",outcome:"leave"}],outcomes:{read:{text:'"Here lies Verath, who stole from gods." Inside: his ill-gotten treasures, still gleaming.',reward:{gold:70,setFlag:"verath_tomb_opened"}},curse:{text:'The glyphs flash. A cold voice whispers: "Thief." Pain wracks your body.',reward:{damage:20}},open:{text:"The lid grinds aside. Gold, jewels, and a warning you can't read.",reward:{gold:50}},stuck:{text:"The lid won't move. The glyphs seem to pulse with amusement."},leave:{text:"Some graves should stay closed."}}},{id:"skill_lava_crossing",minLevel:9,zone:["ember_plateau","hell_breach"],npcName:"Lava Flow",npcPortrait:null,lines:[{speaker:"hero",text:"Molten rock crawls across the path. Cooled islands of obsidian dot the flow — a treacherous crossing."}],choices:[{text:"[DEX 18] Leap from island to island.",skillCheck:{stat:"DEX",dc:18},outcomes:{pass:"leap",fail:"burn"}},{text:"[INT 14] Find a thermal updraft to predict safe paths.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"predict",fail:"burn"}},{text:"Go back. Find another way.",outcome:"leave"}],outcomes:{leap:{text:"Your boots sizzle on the obsidian but you make it across. On the far side: a vein of raw ore.",reward:{gold:45}},predict:{text:"You trace the cooling patterns and find the thickest islands. A safe, if slow, crossing.",reward:{gold:35}},burn:{text:"The obsidian cracks. Liquid fire licks your legs before you scramble clear.",reward:{damage:25}},leave:{text:"The heat alone is reason enough to turn back."}}},{id:"skill_void_riddle",minLevel:14,zone:["cosmic_rift","eternal_void"],npcName:"Void Sphinx",npcPortrait:null,lines:[{speaker:"npc",text:"I am what remains when everything is taken. I am what exists before anything is made. What am I?"}],choices:[{text:'[INT 18] "The Void itself."',skillCheck:{stat:"INT",dc:18},outcomes:{pass:"correct",fail:"wrong"}},{text:'"Nothing."',outcome:"close"},{text:"Attack it.",outcome:"fight"}],outcomes:{correct:{text:'"Yes. And now you understand what you walk through." It fades, leaving a crystallized thought behind.',reward:{gold:80,setFlag:"void_riddle_solved"}},wrong:{text:'It sighs — a sound like collapsing stars. "Close enough. But understanding eludes you." Pain.',reward:{damage:15}},close:{text:'"Almost. But nothing is still something to name." It vanishes, taking your certainty with it.'},fight:{text:"Your blade passes through it. It laughs — a sound that erases color — and disappears.",reward:{damage:20}}}},{id:"lore_old_soldier",minLevel:1,zone:["border_roads"],npcName:"Retired Sergeant Hask",npcPortrait:null,lines:[{speaker:"npc",text:"I fought in the Ember War, thirty years back. We thought it was over. We were fools."},{speaker:"npc",text:"The Veil was thin then too. But it healed. This time... I don't think it will."}],choices:[{text:"What was the Ember War?",outcome:"ember_war"},{text:"How do we stop it?",outcome:"how_stop"},{text:"Thank him and leave.",outcome:"leave"}],outcomes:{ember_war:{text:'"The first time the Veil cracked. Fire rained for weeks. We sealed it with blood and prayer." His hands shake as he speaks.',reward:{setFlag:"knows_ember_war"}},how_stop:{text:`"Find the source. Close it. Or kill whatever's keeping it open. Easier said than done."`},leave:{text:'"Stay sharp out there, soldier." He turns back to his empty mug.'}}},{id:"lore_ancient_tablet",minLevel:3,zone:["thornwood","dust_roads"],npcName:"Crumbling Tablet",npcPortrait:null,lines:[{speaker:"hero",text:"A stone tablet, half-buried. The inscription is in a language that predates the kingdom."}],choices:[{text:"[INT 12] Attempt to translate.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"translate",fail:"partial"}},{text:"Copy the symbols for later.",outcome:"copy"},{text:"Move on.",outcome:"leave"}],outcomes:{translate:{text:'"When the veil between worlds thins to nothing, the Sovereign shall wake." Chilling.',reward:{setFlag:"translated_ancient_tablet"}},partial:{text:'You catch fragments: "veil," "sovereign," "wake." Not enough to be sure of the meaning.'},copy:{text:"The symbols are intricate. Someone scholarly might make sense of them."},leave:{text:"The tablet will wait. It has for centuries."}}},{id:"lore_ghost_soldier",minLevel:5,zone:["dust_roads","ember_plateau"],npcName:"Spectral Legionnaire",npcPortrait:null,lines:[{speaker:"npc",text:"I died here. A long time ago. The veil won't let me pass through."},{speaker:"npc",text:"I remember... a fortress. A seal. Something that held the fire back. It's broken now, isn't it?"}],choices:[{text:"Tell him the truth.",outcome:"truth"},{text:"Ask about the fortress.",outcome:"fortress"},{text:"[INT 14] Help him cross over.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"release",fail:"trapped"}}],outcomes:{truth:{text:`"Then it's all happening again. I wish I could help. I wish I could do anything at all." He fades slightly.`},fortress:{text:'"South. Through the ash fields. It was called the Obsidian Bastion. If anything remains, the seal might be restored."',reward:{setFlag:"knows_obsidian_bastion"}},release:{text:"You speak words of passage. He smiles — truly smiles — and dissolves into light.",reward:{heal:20}},trapped:{text:'"Thank you for trying. No one else has." He fades but remains, caught between worlds.'}}},{id:"lore_veil_mural",minLevel:7,zone:["ember_plateau","hell_breach"],npcName:"Ancient Mural",npcPortrait:null,lines:[{speaker:"hero",text:"A vast mural painted on the cave wall. It shows the Veil as a living thing — a membrane between two realities, pulsing like a heart."}],choices:[{text:"Study the mural closely.",outcome:"study"},{text:"[INT 14] Look for hidden symbols.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"hidden",fail:"study"}},{text:"Continue past it.",outcome:"leave"}],outcomes:{study:{text:"The mural shows a figure sealing the Veil — and another figure tearing it open. Two sides of the same conflict, repeated across ages."},hidden:{text:"Behind the paint: a second layer. A map. It shows the location of an ancient seal — still intact.",reward:{setFlag:"found_veil_map"}},leave:{text:"Art can wait. Survival cannot."}}},{id:"lore_refugees",minLevel:2,zone:["border_roads","thornwood"],npcName:"Refugee Elder",npcPortrait:null,lines:[{speaker:"npc",text:"Our village is gone. The fire came in the night — but it wasn't natural fire. It moved with purpose."},{speaker:"npc",text:"Whatever you're hunting out there... please. End it before more villages burn."}],choices:[{text:"We will. I promise.",outcome:"promise"},{text:"What did the fire look like?",outcome:"describe"},{text:"Give them gold (20 gold).",effect:{gold:-20},outcome:"donate"}],outcomes:{promise:{text:'She clutches your hand. "Then there is still hope." The weight of her faith settles on your shoulders.'},describe:{text:'"It had eyes. The flames had eyes." She shudders. "And they watched us run."',reward:{setFlag:"knows_living_fire"}},donate:{text:'Tears fill her eyes. "Bless you. This will feed the children for a week."',reward:{heal:10}}}},{id:"lore_library_ruins",minLevel:6,zone:["dust_roads","ember_plateau"],npcName:"Ruined Library",npcPortrait:null,lines:[{speaker:"hero",text:"Shelves of charred books. Most are ash, but a few tomes survived in a sealed alcove."}],choices:[{text:"[INT 12] Search for useful knowledge.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"find",fail:"dust"}},{text:"Take what you can carry.",outcome:"take"},{text:"Leave the dead their books.",outcome:"leave"}],outcomes:{find:{text:"A treatise on Veil magic. The theory is complex, but the practical applications are clear.",reward:{setFlag:"veil_treatise_read"}},dust:{text:"The books crumble at your touch. Centuries of knowledge, gone in a puff of ash."},take:{text:"You grab three intact volumes. Their titles are in a dead language, but the diagrams speak clearly."},leave:{text:"The library creaks ominously. Best not linger."}}},{id:"lore_dying_messenger",minLevel:4,zone:["border_roads","thornwood","dust_roads"],npcName:"Wounded Messenger",npcPortrait:null,lines:[{speaker:"npc",text:"The... the garrison... fell. The commander is dead. The seal is... broken..."},{speaker:"hero",text:"He's barely alive. Whatever message he carried, it cost him everything to deliver it."}],choices:[{text:"Tend his wounds.",outcome:"heal_him"},{text:"Ask about the seal.",outcome:"ask_seal"},{text:"Take his dispatches.",outcome:"take"}],outcomes:{heal_him:{text:`You bind his wounds. He'll live, but he can't go further. "Thank you... warn the capital..."`,reward:{heal:-10}},ask_seal:{text:'"The Obsidian Seal. It held the Veil shut. Something broke it from the inside." He passes out.',reward:{setFlag:"knows_seal_broken"}},take:{text:"His dispatches detail troop movements and a terrible loss. The information is valuable."}}},{id:"lore_campfire_stories",minLevel:1,zone:"any",npcName:"Traveling Bard",npcPortrait:null,lines:[{speaker:"npc",text:"Sit! Rest! I've stories from the four corners of this burning world."}],choices:[{text:"Listen to a story.",outcome:"listen"},{text:"Ask about the Emberveil.",outcome:"emberveil"},{text:"No time for stories.",outcome:"leave"}],outcomes:{listen:{text:'He tells of a hero from the last age who sealed the Veil with her own life. "They say her sword still burns, somewhere deep."',reward:{heal:10}},emberveil:{text:`"The Emberveil is a wound that refuses to scar. Each generation thinks they've healed it. Each generation is wrong."`},leave:{text:'"May your road be lit and your blade be sharp." He strums a melancholy chord as you go.'}}},{id:"lore_prophecy_stone",minLevel:8,zone:["hell_breach","shattered_core"],npcName:"Prophecy Stone",npcPortrait:null,lines:[{speaker:"hero",text:"A monolith covered in text that writes itself. New words appear as you watch, steaming on the stone."}],choices:[{text:"Read the prophecy.",outcome:"read"},{text:"[INT 16] Interpret the deeper meaning.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"interpret",fail:"confused"}},{text:"Walk away.",outcome:"leave"}],outcomes:{read:{text:'"The one who walks between will face the Sovereign in the place where time began." Cryptic but urgent.'},interpret:{text:"The prophecy speaks of you — or someone like you. The Sovereign awaits at the Shattered Core. This is your path.",reward:{setFlag:"prophecy_read"}},confused:{text:"The words shift faster than you can read. A headache blooms behind your eyes.",reward:{damage:5}},leave:{text:"Prophecy or not, you make your own fate."}}},{id:"lore_void_whispers",minLevel:12,zone:["shattered_core","cosmic_rift","eternal_void"],npcName:"The Whispers",npcPortrait:null,lines:[{speaker:"hero",text:"Voices. Coming from everywhere and nowhere. They speak your name."}],choices:[{text:"Listen.",outcome:"listen"},{text:"[INT 16] Block them out.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"block",fail:"overwhelm"}},{text:"Talk back.",outcome:"respond"}],outcomes:{listen:{text:"They tell you things — true things — about the world before the Veil. Knowledge pours in like water. It hurts.",reward:{setFlag:"void_whispers_heard",damage:10}},block:{text:"Silence. Blessed, deafening silence. The whispers withdraw, offended."},overwhelm:{text:"Too many voices. Your nose bleeds. When they finally stop, you're on your knees.",reward:{damage:20}},respond:{text:`"We know you." "We've been waiting." "Come closer." You decide not to.`,reward:{damage:5}}}},{id:"lore_fallen_hero",minLevel:5,zone:["dust_roads","ember_plateau"],npcName:"Hero's Grave",npcPortrait:null,lines:[{speaker:"hero",text:'A grave marker, recently placed. "Here fell Kael Ironforge, who stood when others ran." Flowers wilt in the heat.'}],choices:[{text:"Pay your respects.",outcome:"respect"},{text:"Search the grave.",outcome:"search"},{text:"Move on.",outcome:"leave"}],outcomes:{respect:{text:"You stand in silence. The wind carries the faint sound of a soldier's hymn.",reward:{heal:15}},search:{text:"Beneath the marker: a letter and a few coins. The letter begs someone named Alira to flee north.",reward:{gold:10}},leave:{text:"Another name for the dead. Too many to count."}}},{id:"lore_star_map",minLevel:14,zone:["cosmic_rift","eternal_void"],npcName:"Celestial Map",npcPortrait:null,lines:[{speaker:"hero",text:"Stars float around you — not above, but everywhere. A three-dimensional map of realities, each star a universe."}],choices:[{text:"Find your own reality.",outcome:"find_home"},{text:"[INT 18] Study the pattern of the Void.",skillCheck:{stat:"INT",dc:18},outcomes:{pass:"study",fail:"lost"}},{text:"Don't touch anything.",outcome:"leave"}],outcomes:{find_home:{text:"There — a faint, flickering star. Yours. It's dimming. The Veil is consuming it."},study:{text:"The Void isn't chaos. It's a pattern. A hunger with geometry. Understanding dawns — and with it, terror.",reward:{setFlag:"understands_void_pattern",gold:60}},lost:{text:"The stars spin. You lose all sense of direction. When it stops, you're exactly where you started.",reward:{damage:10}},leave:{text:"You step back from the stars. Some maps show destinations you should never visit."}}},{id:"lore_singing_stones",minLevel:3,zone:["thornwood"],npcName:"Singing Stones",npcPortrait:null,lines:[{speaker:"hero",text:"A circle of standing stones. They hum — a low, resonant tone that vibrates in your chest."}],choices:[{text:"Touch one.",outcome:"touch"},{text:"[INT 10] Listen for a pattern.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"pattern",fail:"noise"}},{text:"Leave them alone.",outcome:"leave"}],outcomes:{touch:{text:"A vision: the forest before the corruption. Green, alive, full of light. It fades, leaving warmth in its place.",reward:{heal:15}},pattern:{text:'The stones sing in the old tongue. You catch a phrase: "The seed of the world sleeps beneath the deepest root."',reward:{setFlag:"heard_world_seed"}},noise:{text:"Just noise. Beautiful, but meaningless to you."},leave:{text:"The humming follows you for miles."}}},{id:"lore_demon_confession",minLevel:10,zone:["hell_breach","shattered_core"],npcName:"Chained Demon",npcPortrait:null,lines:[{speaker:"npc",text:"They chained me here for speaking truth. The Sovereign fears truth more than swords."},{speaker:"npc",text:"I will tell you what I told them, if you free me. Or leave me here to rot. Your choice."}],choices:[{text:"Free the demon and listen.",outcome:"free"},{text:"Listen but don't free it.",outcome:"listen_only"},{text:"Demons lie. Leave.",outcome:"leave"}],outcomes:{free:{text:'"The Sovereign was human once. Before the Veil consumed them. Remember that when you face them." It vanishes in smoke.',reward:{setFlag:"sovereign_was_human"}},listen_only:{text:'"Clever. The Sovereign has a weakness — it remembers being afraid. Use that." It strains against the chains but cannot follow.'},leave:{text:`It howls as you walk away. "FOOLS! YOU'LL FACE THE SOVEREIGN BLIND!"`}}},{id:"moral_wounded_enemy",minLevel:2,zone:"any",npcName:"Wounded Goblin",npcPortrait:null,lines:[{speaker:"hero",text:"A goblin lies in the road, clutching a wound. It looks up at you with genuine fear."},{speaker:"npc",text:"Please... no more hurt. Skrag just want go home."}],choices:[{text:"Help it.",outcome:"help"},{text:"Kill it. Goblins are the enemy.",outcome:"kill"},{text:"Leave it.",outcome:"leave"}],outcomes:{help:{text:'You bind its wound. It stares at you, confused. "Why help Skrag?" Then it limps away, glancing back.',reward:{setFlag:"helped_goblin",heal:-5}},kill:{text:"It doesn't resist. The light leaves its eyes quickly. You feel nothing. That might be the problem."},leave:{text:"You step around it. Its whimpers follow you down the road."}}},{id:"moral_poison_well",minLevel:4,zone:["border_roads","thornwood","dust_roads"],npcName:"Village Well",npcPortrait:null,lines:[{speaker:"hero",text:"A goblin raiding party camps nearby. Their water comes from this well. You have poison — enough to taint it."}],choices:[{text:"Poison the well. End the raids.",outcome:"poison"},{text:"Destroy the well instead. Let them move on.",outcome:"destroy"},{text:"Leave the well. Fight them face to face.",outcome:"leave"}],outcomes:{poison:{text:"You pour the vial. By morning, the raids will stop. So will the goblins. All of them — warriors, children, elders.",reward:{setFlag:"poisoned_well",gold:30}},destroy:{text:"You collapse the well with a boulder. Without water, they'll have to move on. Less lethal, but they'll raid elsewhere."},leave:{text:"You'll face them with steel, not subterfuge. It's harder, but you can live with it."}}},{id:"moral_sacrifice_companion",minLevel:8,zone:["hell_breach","shattered_core"],npcName:"The Voice",npcPortrait:null,lines:[{speaker:"npc",text:"One soul to seal the breach. One life to save thousands. The mathematics is simple. The choice is not."}],choices:[{text:"Refuse. We'll find another way.",outcome:"refuse"},{text:"Offer yourself.",outcome:"self_sacrifice"},{text:"[INT 16] Challenge the premise.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"challenge",fail:"refuse"}}],outcomes:{refuse:{text:'"Then the breach widens. You have chosen. Live with it." The voice falls silent.'},self_sacrifice:{text:'The breach flares — then something pulls you back. "Not you. Not yet. You have more to do." The breach seals on its own.',reward:{damage:30,setFlag:"offered_self"}},challenge:{text:`"No seal requires a soul. That's a lie of the Veil, meant to feed itself." The voice hisses and vanishes. The breach weakens.`,reward:{setFlag:"challenged_voice"}}}},{id:"moral_traitor_ally",minLevel:6,zone:["dust_roads","ember_plateau"],npcName:"Captured Spy",npcPortrait:null,lines:[{speaker:"hero",text:"A soldier from your side, caught selling information to the Veil cult. He kneels, bound, awaiting judgment."},{speaker:"npc",text:"They have my family. I had no choice."}],choices:[{text:"Execute him. Treason is treason.",outcome:"execute"},{text:"Free him. Use him as a double agent.",outcome:"double_agent"},{text:"Let him go. But banish him.",outcome:"banish"}],outcomes:{execute:{text:"He closes his eyes. You make it quick. The others watch in silence. Morale hardens.",reward:{setFlag:"executed_spy"}},double_agent:{text:`"Feed them false information. Earn your family's freedom. Betray me again and there won't be a third chance."`,reward:{setFlag:"turned_spy"}},banish:{text:"He stumbles away. Whether he returns to the cult or flees north, you may never know."}}},{id:"moral_cursed_village",minLevel:5,zone:["thornwood","dust_roads"],npcName:"Village Headman",npcPortrait:null,lines:[{speaker:"npc",text:"A sickness spreads through our village. The healer says it's the Veil's doing — a slow corruption."},{speaker:"npc",text:"She can cure it, but needs a component found only in the goblin shaman's lair. Will you retrieve it?"}],choices:[{text:"Agree to help. We'll find the component.",outcome:"help"},{text:"The village may already be lost.",outcome:"refuse"},{text:"[INT 14] Is the healer trustworthy?",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"investigate",fail:"help"}}],outcomes:{help:{text:'"Thank the gods. The lair is east, past the spider hollow." He presses gold into your hand.',reward:{gold:25,setFlag:"accepted_cure_quest"}},refuse:{text:'His face crumbles. "Then we are already dead." He turns away.'},investigate:{text:"The healer's ingredients match Veil cult reagents. She may be making things worse. You confront her — she flees into the night.",reward:{setFlag:"exposed_false_healer",gold:30}}}},{id:"moral_burning_bridge",minLevel:3,zone:["border_roads","thornwood"],npcName:"Desperate Farmer",npcPortrait:null,lines:[{speaker:"npc",text:"The goblins are coming across the bridge. If we burn it, the village is safe — but twenty people on the other side are trapped."}],choices:[{text:"Burn the bridge. Save the village.",outcome:"burn"},{text:"Hold the bridge. Buy time for everyone.",outcome:"hold"},{text:"[STR 14] Collapse the bridge partially — passable for people, not goblins.",skillCheck:{stat:"STR",dc:14},outcomes:{pass:"partial",fail:"burn"}}],outcomes:{burn:{text:"The bridge roars with flame. The village cheers. Across the river, screams.",reward:{setFlag:"burned_bridge"}},hold:{text:"You stand on the bridge, blade in hand. The goblins hesitate. The refugees cross. Then you fight.",startCombat:!0,reward:{heal:10}},partial:{text:"You hack through the support beams at precise angles. The bridge sags — too narrow for a charge, but civilians squeeze across one by one.",reward:{gold:20}}}},{id:"moral_mercy_or_gold",minLevel:2,zone:"any",npcName:"Begging Orphan",npcPortrait:null,lines:[{speaker:"npc",text:"Please... I haven't eaten in three days. Even a coin. Just one."}],choices:[{text:"Give gold (10 gold).",effect:{gold:-10},outcome:"give"},{text:"Give food.",outcome:"food"},{text:"Walk past.",outcome:"leave"}],outcomes:{give:{text:'Tears stream down filthy cheeks. "Thank you, thank you." The coin vanishes into rags.',reward:{heal:5}},food:{text:"You share your rations. The child eats like it might be their last meal. It might be."},leave:{text:"You can't save everyone. You repeat that until it almost sounds true."}}},{id:"moral_dark_bargain",minLevel:10,zone:["hell_breach","shattered_core"],npcName:"The Bargainer",npcPortrait:null,lines:[{speaker:"npc",text:"I offer power. Genuine, immediate, devastating power. The cost? A memory. One you hold dear."}],choices:[{text:"Accept the bargain.",outcome:"accept"},{text:"Refuse.",outcome:"refuse"},{text:"[INT 18] Negotiate different terms.",skillCheck:{stat:"INT",dc:18},outcomes:{pass:"negotiate",fail:"refuse"}}],outcomes:{accept:{text:"Power floods through you. Something precious fades — you can't remember what. That's the point.",reward:{heal:50,setFlag:"dark_bargain_made"}},refuse:{text:`"Your loss. The Sovereign won't offer such gentle terms." It dissolves into shadow.`},negotiate:{text:'"Clever mortal. Fine — power for pain. No memories taken." Fire courses through you.',reward:{damage:20,heal:40}}}},{id:"moral_abandon_wounded",minLevel:6,zone:["dust_roads","ember_plateau","hell_breach"],npcName:"Fallen Companion",npcPortrait:null,lines:[{speaker:"npc",text:"My leg's broken. I can't walk. The ash wraiths are close — I can hear them."},{speaker:"npc",text:"Leave me a sword. I'll buy you time."}],choices:[{text:"Carry them. We leave no one behind.",outcome:"carry"},{text:"Leave them the sword.",outcome:"leave_sword"},{text:"[STR 14] Splint the leg. They walk or we both die.",skillCheck:{stat:"STR",dc:14},outcomes:{pass:"splint",fail:"carry"}}],outcomes:{carry:{text:"The extra weight slows you. The wraiths catch up. You fight carrying them on your back.",startCombat:!0},leave_sword:{text:`They take the blade with shaking hands. "Go. I'll hold as long as I can." You don't hear the fight end.`,reward:{setFlag:"left_wounded"}},splint:{text:"You fashion a splint from debris. They lean on you, limping, but alive. Together, you outpace the wraiths.",reward:{heal:10}}}},{id:"moral_stolen_relic",minLevel:7,zone:["ember_plateau","hell_breach"],npcName:"Temple Guardian",npcPortrait:null,lines:[{speaker:"npc",text:"That relic you carry — it belongs to this temple. It was stolen generations ago."},{speaker:"npc",text:"Return it, and the temple's blessing is yours. Keep it, and carry the weight of theft."}],choices:[{text:"Return the relic.",outcome:"return"},{text:"Keep it. We need it more.",outcome:"keep"},{text:"[INT 14] Propose sharing it.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"share",fail:"return"}}],outcomes:{return:{text:'She takes it reverently. Light blooms from the altar. "Be blessed, honorable one."',reward:{heal:40,setFlag:"temple_blessed"}},keep:{text:'"Then you are no better than the thief who took it." Her disappointment is heavier than any curse.'},share:{text:'"An arrangement. Unconventional." She considers. "Very well. The temple will empower it for your use — if you return it after your quest."',reward:{heal:25,gold:20}}}},{id:"companion_campfire_debate",minLevel:2,zone:"any",npcName:"Your Companions",npcPortrait:null,lines:[{speaker:"hero",text:"The fire crackles. Someone brings up the question everyone's been avoiding: what happens after?"}],choices:[{text:'"We win. Then we rest."',outcome:"rest"},{text:`"There is no after. There's only the next fight."`,outcome:"grim"},{text:'"We build something better."',outcome:"hope"}],outcomes:{rest:{text:"Nods around the fire. For now, that's enough.",reward:{heal:10}},grim:{text:"Silence. Someone stirs the embers. The mood darkens."},hope:{text:`A faint smile from the group. "Something better. Yeah. I'd fight for that."`,reward:{heal:15}}}},{id:"companion_shared_meal",minLevel:1,zone:"any",npcName:"Camp",npcPortrait:null,lines:[{speaker:"hero",text:"The party pools their rations. It's not much, but sharing makes it taste better."}],choices:[{text:"Share equally.",outcome:"share"},{text:"Give your portion to the wounded.",outcome:"give"},{text:"Eat in silence.",outcome:"silent"}],outcomes:{share:{text:"Laughter, for the first time in days. It doesn't last, but it matters.",reward:{heal:10}},give:{text:"They protest, but eat. Your stomach growls, but their gratitude warms you.",reward:{heal:20}},silent:{text:"Everyone eats. Nobody speaks. Sometimes that's enough."}}},{id:"companion_trust_test",minLevel:5,zone:"any",npcName:"Suspicious Ally",npcPortrait:null,lines:[{speaker:"npc",text:"I found this in your pack when I was looking for bandages. Care to explain?"},{speaker:"hero",text:"They hold up a Veil cult symbol. You've never seen it before. Someone planted it."}],choices:[{text:`"It's not mine. Someone planted it."`,outcome:"deny"},{text:'"I took it from a dead cultist. For study."',outcome:"explain"},{text:"[INT 12] Turn the accusation around.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"counter",fail:"deny"}}],outcomes:{deny:{text:'They stare at you. "I want to believe that." The tension lingers.'},explain:{text:`"...That makes sense. Sorry. These days, you can't trust anyone." The air clears.`},counter:{text:`"Why were you searching my pack?" They flush. "Point taken. Let's drop it."`,reward:{heal:5}}}},{id:"companion_nightmare",minLevel:4,zone:"any",npcName:"Restless Night",npcPortrait:null,lines:[{speaker:"hero",text:"You wake to screaming. One of your companions thrashes in their bedroll, caught in a nightmare."}],choices:[{text:"Wake them gently.",outcome:"wake"},{text:"Let them sleep through it.",outcome:"sleep"},{text:"[INT 12] The dream might be a Veil intrusion.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"veil_dream",fail:"wake"}}],outcomes:{wake:{text:'They gasp, eyes wild. "The fire... I was in the fire..." You sit with them until dawn.',reward:{heal:5}},sleep:{text:"The screaming stops eventually. In the morning, they don't remember."},veil_dream:{text:"You recognize the signs. You touch their forehead and push the Veil influence out. They sleep peacefully after.",reward:{heal:15,setFlag:"blocked_veil_dream"}}}},{id:"companion_desertion",minLevel:7,zone:["hell_breach","shattered_core"],npcName:"Wavering Ally",npcPortrait:null,lines:[{speaker:"npc",text:"I can't do this. I'm not brave. I'm not a hero. I'm just... I'm just scared."}],choices:[{text:`"So am I. That's what courage is."`,outcome:"courage"},{text:`"Then go. I won't force anyone to die."`,outcome:"let_go"},{text:'"We need you. I need you."',outcome:"need"}],outcomes:{courage:{text:"They swallow hard. Nod. Grip their weapon tighter. They stay.",reward:{heal:10}},let_go:{text:"They leave before dawn. Their bedroll is still warm when you wake."},need:{text:`"You... need me?" Something shifts in their eyes. Resolve. "Okay. Okay, I'll stay."`,reward:{heal:15}}}},{id:"companion_past_revealed",minLevel:6,zone:"any",npcName:"Quiet Conversation",npcPortrait:null,lines:[{speaker:"npc",text:"I wasn't always a fighter. I was a baker. In a village that doesn't exist anymore."},{speaker:"npc",text:"The Veil took everything. My family. My home. My flour stores."}],choices:[{text:`"We'll make them pay for what they took."`,outcome:"vengeance"},{text:'"Tell me about your village."',outcome:"remember"},{text:'"When this is over, you can bake again."',outcome:"hope"}],outcomes:{vengeance:{text:'Their jaw sets. "Every Veil cultist I cut down, I think of bread dough. Same motion." Dark humor, but genuine.'},remember:{text:"They talk for an hour. The village had a festival every autumn. The children loved their honey rolls. They cry, quietly.",reward:{heal:10}},hope:{text:`"Bake again..." They laugh, surprised. "I'd like that. I'd really like that."`,reward:{heal:15}}}},{id:"companion_rivalry",minLevel:3,zone:"any",npcName:"Heated Argument",npcPortrait:null,lines:[{speaker:"hero",text:"Two of your companions are at each other's throats. Something about who should take point in the next fight."}],choices:[{text:"Mediate. Find a compromise.",outcome:"mediate"},{text:"Let them fight it out.",outcome:"fight"},{text:"Pull rank. Your call, period.",outcome:"rank"}],outcomes:{mediate:{text:"They grudgingly agree to alternate. Not perfect, but the peace holds.",reward:{heal:5}},fight:{text:"Three punches later, they're both winded and somehow friends again. Violence: the universal language."},rank:{text:'"I decide. End of discussion." They fall in line. Respect or resentment — hard to tell.'}}},{id:"companion_secret_skill",minLevel:5,zone:"any",npcName:"Hidden Talent",npcPortrait:null,lines:[{speaker:"hero",text:"One of your companions begins humming — and the campfire flares. They have magic they haven't told you about."}],choices:[{text:'"How long have you been able to do that?"',outcome:"ask"},{text:'"Show me everything you can do."',outcome:"demonstrate"},{text:'"Why did you hide this?"',outcome:"confront"}],outcomes:{ask:{text:`"Since the Veil cracked. Something... woke up inside me. I was afraid you'd think I was corrupted."`},demonstrate:{text:`They extend a hand. A flame dances on each fingertip. "It's not much. But it's mine."`,reward:{heal:10}},confront:{text:'"Because the last person who saw me do this called me a monster and ran." Fair point.'}}},{id:"companion_last_letter",minLevel:8,zone:["hell_breach","shattered_core","cosmic_rift"],npcName:"Before the Battle",npcPortrait:null,lines:[{speaker:"npc",text:"I've written a letter. For my daughter. In case I don't..."},{speaker:"npc",text:"Will you carry it? If the worst happens?"}],choices:[{text:`"I'll carry it. But you'll deliver it yourself."`,outcome:"promise"},{text:`"Of course. I'll see it delivered."`,outcome:"accept"},{text:'"Write her two. One for if you make it."',outcome:"two_letters"}],outcomes:{promise:{text:`They smile. "That's what I needed to hear." They fold the letter away.`,reward:{heal:10}},accept:{text:"The letter is heavier than paper should be. You tuck it into your armor, close to your heart."},two_letters:{text:'They laugh, surprised. "Two letters. Yeah. Yeah, I like that." They write both. The second one is longer.',reward:{heal:15}}}},{id:"companion_training",minLevel:3,zone:"any",npcName:"Sparring Session",npcPortrait:null,lines:[{speaker:"hero",text:`A companion challenges you to a sparring match. "Come on, we're getting soft sitting around camp."`}],choices:[{text:"Accept the challenge.",outcome:"spar"},{text:"Teach them a technique instead.",outcome:"teach"},{text:"Too tired. Rest is more valuable.",outcome:"rest"}],outcomes:{spar:{text:"Blunted blades ring across camp. You both land good hits. By the end, you feel sharper.",reward:{heal:5}},teach:{text:'You demonstrate a parry technique from your training. They pick it up fast. "Where did you learn that?"'},rest:{text:'"Fair enough. Tomorrow, then." They practice alone in the firelight.'}}},{id:"resource_gold_cache",minLevel:1,zone:"any",npcName:"Hidden Cache",npcPortrait:null,lines:[{speaker:"hero",text:"A loose stone in the wall. Behind it: a leather pouch, heavy with coin."}],choices:[{text:"Take it.",outcome:"take"},{text:"Leave it. Could be bait.",outcome:"leave"}],outcomes:{take:{text:"Gold. Real gold. Whoever hid this isn't coming back for it.",reward:{gold:35}},leave:{text:"You walk on. Better safe than trapped."}}},{id:"resource_healing_spring",minLevel:1,zone:["border_roads","thornwood"],npcName:"Forest Spring",npcPortrait:null,lines:[{speaker:"hero",text:"Clear water bubbles from a mossy rock. It glows faintly — natural magic, old and gentle."}],choices:[{text:"Drink deeply.",outcome:"drink"},{text:"Fill your waterskins.",outcome:"fill"},{text:"[INT 10] Test the water first.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"test",fail:"drink_normal"}}],outcomes:{drink:{text:"Warmth spreads through your body. Wounds close. Fatigue lifts.",reward:{heal:30}},fill:{text:"The water stays clear in your skins. It'll keep.",reward:{heal:15}},test:{text:"Pure — and potent. You drink your fill, knowing it's safe. The effect is even stronger when you relax into it.",reward:{heal:40}},drink_normal:{text:"Refreshing, but you tense up. Still healing, just not as much.",reward:{heal:20}}}},{id:"resource_abandoned_camp",minLevel:2,zone:"any",npcName:"Abandoned Campsite",npcPortrait:null,lines:[{speaker:"hero",text:"A campsite, recently abandoned. Bedrolls, cooking gear, and a locked strongbox left behind in haste."}],choices:[{text:"Search everything.",outcome:"search"},{text:"[DEX 10] Pick the strongbox lock.",skillCheck:{stat:"DEX",dc:10},outcomes:{pass:"unlock",fail:"jammed"}},{text:"Take only food.",outcome:"food"}],outcomes:{search:{text:"Scattered coins, a half-eaten meal, and a map with locations circled in red.",reward:{gold:15}},unlock:{text:"Click. The box opens. Medicine, gold, and a letter addressed to no one.",reward:{gold:25,heal:10}},jammed:{text:"The lock resists. You settle for loose items around the camp.",reward:{gold:10}},food:{text:"Dried meat and hard bread. Enough for another day on the road.",reward:{heal:10}}}},{id:"resource_dead_merchant",minLevel:3,zone:["border_roads","dust_roads"],npcName:"Merchant's Corpse",npcPortrait:null,lines:[{speaker:"hero",text:"A merchant and his mule, both dead. Arrows in their backs. The cart is overturned but not fully looted."}],choices:[{text:"Salvage what you can.",outcome:"salvage"},{text:"Bury the dead first, then salvage.",outcome:"bury"},{text:"Move on. This road is dangerous.",outcome:"leave"}],outcomes:{salvage:{text:"Bolts of cloth, some tools, and a pouch of gold hidden under the seat.",reward:{gold:30}},bury:{text:"You take time to bury them. Under the cart: their emergency fund. They'd want someone to use it.",reward:{gold:25,heal:5}},leave:{text:"The arrows are goblin-made. This isn't a place to linger."}}},{id:"resource_mushroom_grove",minLevel:2,zone:["thornwood"],npcName:"Glowing Mushrooms",npcPortrait:null,lines:[{speaker:"hero",text:"A grove of bioluminescent mushrooms. Some are edible — some are very much not."}],choices:[{text:"Eat the safest-looking ones.",outcome:"eat"},{text:"[INT 12] Identify the medicinal varieties.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"identify",fail:"wrong_ones"}},{text:"Don't risk it.",outcome:"leave"}],outcomes:{eat:{text:"They taste like earth and honey. Your stomach holds. Barely.",reward:{heal:10}},identify:{text:"The blue-capped ones are powerful restoratives. You harvest carefully.",reward:{heal:35}},wrong_ones:{text:"You pick the red ones. Your vision swims for an hour.",reward:{damage:8}},leave:{text:"Pretty, but you're not hungry enough to gamble."}}},{id:"resource_mine_shaft",minLevel:5,zone:["dust_roads","ember_plateau"],npcName:"Abandoned Mine",npcPortrait:null,lines:[{speaker:"hero",text:"A mine entrance, timbers rotting. Ore veins glint in the first few feet of darkness."}],choices:[{text:"Mine the visible ore.",outcome:"mine"},{text:"[STR 14] Go deeper for the good stuff.",skillCheck:{stat:"STR",dc:14},outcomes:{pass:"deep",fail:"collapse"}},{text:"Too risky.",outcome:"leave"}],outcomes:{mine:{text:"Surface ore. Low quality, but it'll sell.",reward:{gold:20}},deep:{text:"You haul out a vein of crystallized fire-ore. Rare and valuable.",reward:{gold:50}},collapse:{text:"The timbers groan and buckle. You barely escape the cave-in.",reward:{damage:15}},leave:{text:"That mine has been waiting to collapse for years. Not today."}}},{id:"resource_wrecked_wagon",minLevel:1,zone:["border_roads"],npcName:"Overturned Wagon",npcPortrait:null,lines:[{speaker:"hero",text:"A supply wagon lies on its side. Crates are scattered across the road."}],choices:[{text:"Open the crates.",outcome:"open"},{text:"Check for survivors.",outcome:"survivors"},{text:"It could be a trap.",outcome:"careful"}],outcomes:{open:{text:"Rations, medicine, and a small amount of gold. Standard military supplies.",reward:{gold:15,heal:10}},survivors:{text:'A driver, unconscious but alive. You wake him. "Thank you — take whatever you need from the cargo."',reward:{gold:20,heal:15}},careful:{text:"You approach cautiously. No ambush — just an accident. You take what's useful.",reward:{gold:15}}}},{id:"resource_gem_deposit",minLevel:7,zone:["ember_plateau","hell_breach"],npcName:"Crystal Formation",npcPortrait:null,lines:[{speaker:"hero",text:"Heat-formed crystals jut from the rock face. They pulse with inner fire — ember gems."}],choices:[{text:"Harvest a few.",outcome:"harvest"},{text:"[DEX 14] Extract a large cluster carefully.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"careful",fail:"shatter"}},{text:"Leave them.",outcome:"leave"}],outcomes:{harvest:{text:"Three small gems, warm to the touch. They'll fetch a good price.",reward:{gold:30}},careful:{text:"You extract a perfect cluster. It radiates warmth and light.",reward:{gold:55}},shatter:{text:"The crystal shatters. Shards cut your hands. You salvage a few fragments.",reward:{gold:15,damage:8}},leave:{text:"Beautiful but not worth bleeding for."}}},{id:"resource_lava_pool_gold",minLevel:9,zone:["ember_plateau","hell_breach"],npcName:"Lava Pool",npcPortrait:null,lines:[{speaker:"hero",text:"Gold coins scattered at the edge of a lava pool. The heat is intense, but the gold is real."}],choices:[{text:"[DEX 16] Snatch and retreat.",skillCheck:{stat:"DEX",dc:16},outcomes:{pass:"grab",fail:"burn"}},{text:"Use a stick to rake them in.",outcome:"rake"},{text:"Not worth the risk.",outcome:"leave"}],outcomes:{grab:{text:"Quick hands, singed hair. You come away with a fistful of gold coins.",reward:{gold:45}},burn:{text:"The heat is worse than you thought. You snatch a few coins but pay in blisters.",reward:{gold:20,damage:12}},rake:{text:"Slow but effective. You pull a dozen coins to safety.",reward:{gold:25}},leave:{text:"Gold isn't worth much to a corpse."}}},{id:"resource_void_crystal",minLevel:14,zone:["cosmic_rift","eternal_void"],npcName:"Void Crystal",npcPortrait:null,lines:[{speaker:"hero",text:"A crystal floating in empty space. It's perfectly black — not reflecting light, but absorbing it."}],choices:[{text:"Touch it.",outcome:"touch"},{text:"[INT 16] Analyze its resonance first.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"analyze",fail:"touch_bad"}},{text:"Leave it floating.",outcome:"leave"}],outcomes:{touch:{text:"Cold. Absolute cold. When you release it, your hand is numb — but the crystal follows you now.",reward:{gold:60,damage:10}},analyze:{text:"It's crystallized void energy. Incredibly dangerous, incredibly valuable. You contain it safely.",reward:{gold:80}},touch_bad:{text:"It bites. Reality shudders. You drop it and nurse a hand that briefly didn't exist.",reward:{damage:20}},leave:{text:"It watches you leave. Crystals shouldn't be able to watch. This one does."}}},{id:"mystery_void_rift",minLevel:8,zone:["ember_plateau","hell_breach","shattered_core"],npcName:"Void Rift",npcPortrait:null,lines:[{speaker:"hero",text:"A tear in the air. Through it: a landscape of impossible geometry. Something on the other side sees you."}],choices:[{text:"Reach through.",outcome:"reach"},{text:"[INT 16] Attempt to seal it.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"seal",fail:"backlash"}},{text:"Back away slowly.",outcome:"leave"}],outcomes:{reach:{text:"Something grabs your hand — then releases it. When you pull back, you're holding a coin that weighs nothing.",reward:{gold:40,damage:10}},seal:{text:"You weave the ambient energy and stitch the rift closed. The air sighs with relief.",reward:{setFlag:"sealed_rift",gold:30}},backlash:{text:"The rift fights back. Energy lashes your mind.",reward:{damage:20}},leave:{text:"You back away. The rift watches you go, then slowly closes on its own. For now."}}},{id:"mystery_prophetic_dream",minLevel:5,zone:"any",npcName:"Waking Dream",npcPortrait:null,lines:[{speaker:"hero",text:"You blink and you're somewhere else. A throne room. A figure on the throne, wreathed in fire. It speaks your name."}],choices:[{text:"Approach the throne.",outcome:"approach"},{text:"Demand answers.",outcome:"demand"},{text:"Try to wake up.",outcome:"wake"}],outcomes:{approach:{text:'The figure reaches out. "You will come to me. Eventually." You wake with a burn mark on your palm.',reward:{damage:5,setFlag:"sovereign_vision"}},demand:{text:'"Who are you?" "What you will become. Or what will destroy you." The dream shatters.',reward:{setFlag:"sovereign_warning"}},wake:{text:"You tear yourself free. The throne room crumbles. You wake gasping. It felt too real."}}},{id:"mystery_cursed_weapon",minLevel:6,zone:"any",npcName:"Black Blade",npcPortrait:null,lines:[{speaker:"hero",text:"A sword, driven into a stone altar. It hums with dark energy. The blade seems to drink the light around it."}],choices:[{text:"Pull it free.",outcome:"pull"},{text:"[INT 14] Examine the enchantment first.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"examine",fail:"pull_bad"}},{text:"Leave cursed things cursed.",outcome:"leave"}],outcomes:{pull:{text:"The blade slides free. Power surges up your arm — intoxicating and wrong. You keep it.",reward:{item:"cursed_blade",damage:10}},examine:{text:"A hunger enchantment — it feeds on the wielder. You disable the curse first, then take the blade safely.",reward:{item:"purified_blade"}},pull_bad:{text:"The blade bites your hand as you draw it. It feeds. You drop it, weaker.",reward:{damage:20}},leave:{text:"Some swords are better left in their stones."}}},{id:"mystery_time_loop",minLevel:10,zone:["shattered_core","cosmic_rift"],npcName:"Temporal Echo",npcPortrait:null,lines:[{speaker:"hero",text:"You turn a corner and see... yourself. From five minutes ago. Walking the path you just walked."}],choices:[{text:"Follow your past self.",outcome:"follow"},{text:"[INT 16] Break the loop.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"break_loop",fail:"trapped"}},{text:"Close your eyes and keep walking.",outcome:"ignore"}],outcomes:{follow:{text:"Your echo leads you to something you missed — a hidden alcove with treasure you walked right past.",reward:{gold:40}},break_loop:{text:"You step out of the loop. Time snaps back to normal. The echo waves goodbye and fades.",reward:{gold:30}},trapped:{text:"You walk the same path three times before realizing. Lost time, lost energy.",reward:{damage:10}},ignore:{text:"When you open your eyes, the echo is gone. Time flows normally. Probably."}}},{id:"mystery_fey_trickster",minLevel:3,zone:["thornwood"],npcName:"Laughing Sprite",npcPortrait:null,lines:[{speaker:"npc",text:"Ha! Mortals! Stomping through my forest with your iron boots and serious faces!"},{speaker:"npc",text:"Play a game with me. Win and I give you a prize. Lose and I take your left sock."}],choices:[{text:"Play the game.",outcome:"play"},{text:"[INT 12] Cheat at the game.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"cheat",fail:"caught"}},{text:"No games.",outcome:"leave"}],outcomes:{play:{text:`It's a riddle. You get it wrong, but the sprite is delighted by your answer anyway. "Close enough! Have a shiny!"`,reward:{gold:20}},cheat:{text:`You outwit a fey creature. It's impressed. "Clever! Have TWO shinies!"`,reward:{gold:35}},caught:{text:'"CHEATER! CHEATER!" It steals your sock and vanishes cackling. Your foot is cold now.',reward:{damage:3}},leave:{text:'"Boring! BORING!" It throws an acorn at your head and disappears.'}}},{id:"mystery_mirror_pool",minLevel:7,zone:["thornwood","ember_plateau"],npcName:"Mirror Pool",npcPortrait:null,lines:[{speaker:"hero",text:"A still pool of water, perfectly reflective. Your reflection looks back — but it's not mimicking you. It moves on its own."}],choices:[{text:"Touch the surface.",outcome:"touch"},{text:"Speak to your reflection.",outcome:"speak"},{text:"[INT 14] Understand what this is.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"understand",fail:"touch_bad"}}],outcomes:{touch:{text:"Your reflection grabs your hand and pulls. You resist. It lets go, smiling. Something gold remains in your palm.",reward:{gold:25}},speak:{text:`"You're running out of time," it says. "The Sovereign knows you're coming." It dissolves into ripples.`,reward:{setFlag:"mirror_warning"}},understand:{text:"A Veil reflection — a window to the other side. Your mirror self is an echo. It hands you a gift through the water.",reward:{gold:40,heal:10}},touch_bad:{text:"The water burns. Your reflection laughs and you yank your hand free.",reward:{damage:10}}}},{id:"mystery_wandering_spirit",minLevel:4,zone:["border_roads","thornwood","dust_roads"],npcName:"Lost Spirit",npcPortrait:null,lines:[{speaker:"npc",text:"I am looking for my grave. I have been looking for a very long time."}],choices:[{text:"Help them search.",outcome:"help"},{text:"[INT 12] Guide them by reading the ley lines.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"guide",fail:"lost"}},{text:"You cannot help the dead.",outcome:"leave"}],outcomes:{help:{text:'You search for an hour. You find a collapsed cairn. "Thank you." The spirit sinks peacefully into the earth.',reward:{heal:20}},guide:{text:"The ley lines pulse under your feet. You lead the spirit straight to its resting place. It gifts you its last possession.",reward:{gold:30,heal:15}},lost:{text:'The ley lines are tangled here. You walk in circles. The spirit sighs. "Another day, then."'},leave:{text:'It watches you go with hollow eyes. "Perhaps another traveler..."'}}},{id:"mystery_living_statue",minLevel:9,zone:["hell_breach","shattered_core"],npcName:"Awakened Statue",npcPortrait:null,lines:[{speaker:"npc",text:"I have stood here since before your kingdom had a name. I have a question for you, mortal."},{speaker:"npc",text:"Is the world worth saving? Answer honestly. I will know if you lie."}],choices:[{text:'"Yes. Always."',outcome:"yes"},{text:`"I don't know. But I'm trying anyway."`,outcome:"honest"},{text:'"No. But the people in it are."',outcome:"people"}],outcomes:{yes:{text:'"Certain. Good. Certainty is a weapon." The statue crumbles, and from its heart falls a jewel.',reward:{gold:40}},honest:{text:'"Honesty. Rarer than gold. Here." A crack appears in its chest. Inside: a gem of pure light.',reward:{gold:50,heal:15}},people:{text:'"The wisest answer. The world is stone and fire. But the people — the people burn brighter." It gifts you its core.',reward:{gold:60,heal:20}}}},{id:"mystery_aurora_vision",minLevel:12,zone:["cosmic_rift","eternal_void"],npcName:"Cosmic Aurora",npcPortrait:null,lines:[{speaker:"hero",text:"Colors that don't exist in nature paint the void. They form shapes — faces, places, moments that haven't happened yet."}],choices:[{text:"Watch your future.",outcome:"watch"},{text:"[INT 18] Alter what you see.",skillCheck:{stat:"INT",dc:18},outcomes:{pass:"alter",fail:"watch_bad"}},{text:"Look away.",outcome:"leave"}],outcomes:{watch:{text:"You see yourself at the end. Standing before the Sovereign. Blade raised. The vision fades before you see who wins.",reward:{setFlag:"saw_final_battle"}},alter:{text:"You reach into the vision and shift a detail — a door opens that was closed. The future trembles and reforms.",reward:{gold:60,setFlag:"altered_future"}},watch_bad:{text:"The vision twists. You see yourself losing. The Sovereign's laugh echoes. Is it real, or is the Void lying?",reward:{damage:15}},leave:{text:"The future will come regardless. You'd rather face it fresh."}}},{id:"mystery_echo_of_creation",minLevel:16,zone:["eternal_void"],npcName:"The First Sound",npcPortrait:null,lines:[{speaker:"hero",text:"A sound. Not heard — felt. The frequency of creation itself, the note that began everything. It fills you completely."}],choices:[{text:"Let it flow through you.",outcome:"flow"},{text:"[INT 20] Harmonize with it.",skillCheck:{stat:"INT",dc:20},outcomes:{pass:"harmonize",fail:"discord"}},{text:"Shield your mind.",outcome:"shield"}],outcomes:{flow:{text:"For one eternal moment, you understand everything. Then it fades, leaving only warmth and peace.",reward:{heal:50,setFlag:"heard_first_sound"}},harmonize:{text:"You sing back. The universe listens. In that shared note: power beyond reckoning. You carry a fragment of it now.",reward:{heal:80,gold:100,setFlag:"harmonized_creation"}},discord:{text:"Your note clashes. The sound recoils. Everything hurts.",reward:{damage:30}},shield:{text:"You block it out. Safe, but diminished. You sense you missed something important."}}},{id:"traveler_scarred_pilgrim",minLevel:2,zone:"any",npcName:"Scarred Pilgrim",npcPortrait:null,lines:[{speaker:"npc",text:"Every road leads somewhere. Mine leads to penance."},{speaker:"npc",text:"I killed a man who deserved to live. I walk until I find someone worth saving."}],choices:[{text:"Walk with him a while.",outcome:"walk"},{text:"Ask what he did.",outcome:"ask"},{text:"Wish him well and move on.",outcome:"leave"}],outcomes:{walk:{text:'He says little, but when the road forks he points you down the safer path. "Goblins that way. Took me a week to learn that."',reward:{heal:10}},ask:{text:`"A healer. Thought he was a spy. The fever killed three others before I understood." He won't meet your eyes. You understand silence.`},leave:{text:'"Safe roads," he says, and means it.'}}},{id:"traveler_blind_cartographer",minLevel:3,zone:["border_roads","thornwood","dust_roads"],npcName:"Maren the Cartographer",npcPortrait:null,lines:[{speaker:"npc",text:"I've been mapping these roads for forty years."},{speaker:"npc",text:"Lost my eyes in the Veil breach at Korrath. Gained something better. I feel the land now."}],choices:[{text:"Ask her about the roads ahead.",outcome:"ask_roads"},{text:"Buy a map from her (15 gold).",effect:{gold:-15},outcome:"buy_map"},{text:"[INT 12] Ask about the Veil breach at Korrath.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"korrath",fail:"ask_roads"}}],outcomes:{ask_roads:{text:'"The dust road narrows three miles ahead. Ash wraith territory. Stick to the eastern ditch — they hate the shade."',reward:{heal:5}},buy_map:{text:'She hands you a map sketched in impossibly precise detail. "Feel the paper. The raised lines are cliffs."',reward:{gold:25}},korrath:{text:`"Korrath. Four hundred souls. The Veil didn't just crack there — it spoke." She taps her empty eye sockets. "It told me what was coming. I wish I'd been wrong."`,reward:{setFlag:"knows_korrath"}}}},{id:"traveler_masked_duelist",minLevel:5,zone:"any",npcName:"The Porcelain Mask",npcPortrait:null,lines:[{speaker:"npc",text:"I challenge one person per road. For sport. The loser buys the wine."},{speaker:"npc",text:"Don't look so worried. I haven't killed anyone in... months."}],choices:[{text:"Accept the duel.",outcome:"accept"},{text:"[DEX 14] Disarm them before they draw.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"disarm",fail:"cut"}},{text:"Decline. Not today.",outcome:"decline"}],outcomes:{accept:{text:'The blade is fast — faster than expected. You hold your own. At first blood, they bow. "Acceptable. Better than most." They press gold into your hand.',reward:{gold:30,damage:8}},disarm:{text:'Their sword skitters across the road. The mask tilts. A laugh from behind it. "Oh, I like you." They pay double.',reward:{gold:50}},cut:{text:'They were already moving. A shallow line across your forearm. "Too slow. Ten gold for the lesson."',reward:{damage:10}},decline:{text:'"Wise or cowardly. Hard to tell from behind that face." They saunter off, spinning their blade.'}}},{id:"traveler_exiled_noble",minLevel:4,zone:["border_roads","dust_roads"],npcName:"Lord Edric Vane",npcPortrait:null,lines:[{speaker:"npc",text:"I am — was — a lord. Now I carry my own bags. It's surprisingly educational."},{speaker:"npc",text:"My cousin took the title. With poison. I have nowhere to go and too much pride to beg."}],choices:[{text:"Share your rations with him.",outcome:"share"},{text:"Ask what he knows of the nobility.",outcome:"ask"},{text:"[INT 10] He could still be useful.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"recruit",fail:"share"}}],outcomes:{share:{text:`He eats with undisguised relief. "I haven't had a hot meal in three days. I... thank you. Genuinely."`,reward:{heal:5}},ask:{text:'"The garrison at Thornwall has a new commander. Bought the post. Incompetent. The south gate has no night watch." Useful.',reward:{setFlag:"knows_thornwall_gap"}},recruit:{text:`"A purpose. I hadn't considered that." He straightens. "I know supply routes, tax records, and where every lord in three provinces buries their secrets." He joins your cause.`,reward:{gold:20,setFlag:"recruited_vane"}}}},{id:"traveler_plague_doctor",minLevel:6,zone:["thornwood","dust_roads","ember_plateau"],npcName:"Doctor Moth",npcPortrait:null,lines:[{speaker:"npc",text:"The Veil sickness spreads faster than I can document it."},{speaker:"npc",text:"The beak mask isn't affectation. The herbs inside filter the corruption. Mostly."}],choices:[{text:"Ask about the Veil sickness.",outcome:"ask"},{text:"Buy an herbal filter (20 gold).",effect:{gold:-20},outcome:"buy"},{text:"[INT 14] Offer your own field observations.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"collaborate",fail:"ask"}}],outcomes:{ask:{text:`"Three stages. First the dreams. Then the markings. Then they stop being entirely here." She taps her ledger. "I'm on page four hundred and seven."`},buy:{text:'She hands you a packet of dried herbs. "Breathe through this in corrupted zones. May add a day or two."',reward:{heal:15}},collaborate:{text:'You compare notes. She finds a pattern neither of you had spotted alone. "This changes everything." She presses her entire herb supply into your hands.',reward:{heal:40,setFlag:"veil_sickness_pattern"}}}},{id:"ruins_sunken_temple",minLevel:4,zone:["thornwood","border_roads"],npcName:"Sunken Temple",npcPortrait:null,lines:[{speaker:"hero",text:"The ground gives way to mossy steps descending into a flooded temple. Old — far older than anything in the history books."}],choices:[{text:"[DEX 12] Wade in carefully.",skillCheck:{stat:"DEX",dc:12},outcomes:{pass:"wade",fail:"slip"}},{text:"[INT 14] Read the outer carvings first.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"read_carvings",fail:"wade"}},{text:"Seal it back up. Whatever sleeps here should stay sleeping.",outcome:"leave"}],outcomes:{wade:{text:"Thigh-deep in cold black water, your torch reflects off a submerged altar. Something glints beneath the surface. You pull out a sealed reliquary.",reward:{gold:45}},read_carvings:{text:'The carvings are pre-Veil. A warning: "The god here died willingly so the Veil could not consume it." Inside, safe by virtue of its sacrifice: offerings left untouched for centuries.',reward:{gold:60,setFlag:"knows_willing_god"}},slip:{text:"The steps are slick. You go under. The cold is stunning. You scramble out empty-handed and soaked.",reward:{damage:8}},leave:{text:"The moss closes back over the steps as you watch. Agreeable ruins."}}},{id:"ruins_war_memorial",minLevel:3,zone:["border_roads","dust_roads"],npcName:"Crumbled Memorial",npcPortrait:null,lines:[{speaker:"hero",text:"Ten thousand names, carved into a wall that's slowly sinking into the earth. A battle you don't recognize. A war no one remembers."}],choices:[{text:"Read the names.",outcome:"read"},{text:"[INT 12] Identify the battle from context clues.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"identify",fail:"read"}},{text:"Take a rubbing of a section.",outcome:"rubbing"}],outcomes:{read:{text:"Thousands of names. Some still legible. One catches your eye — the same family name as someone you know. A cold coincidence."},identify:{text:'"The Hollowing." A battle fought inside the Veil itself, four hundred years ago. The survivors reportedly went mad. None of the histories mention it. Why not?',reward:{setFlag:"knows_the_hollowing"}},rubbing:{text:"You press paper to stone and charcoal across it. The names transfer. You fold it carefully. Someone should remember them.",reward:{heal:5}}}},{id:"ruins_automaton_guardhouse",minLevel:7,zone:["ember_plateau","dust_roads"],npcName:"Iron Warden",npcPortrait:null,lines:[{speaker:"npc",text:"HALT. THIS FACILITY IS SEALED BY ORDER OF THE THIRD CONCORDAT. STATE YOUR AUTHORIZATION."},{speaker:"hero",text:"The brass automaton has been standing here for at least two centuries. Its eyes still glow orange."}],choices:[{text:'"Authorization: I need to get through."',outcome:"bluff"},{text:"[INT 16] Speak the old concordat codes.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"codes",fail:"denied"}},{text:"[STR 16] Tear its head off.",skillCheck:{stat:"STR",dc:16},outcomes:{pass:"destroy",fail:"shocked"}}],outcomes:{bluff:{text:`"AUTHORIZATION UNRECOGNIZED. REROUTING TO MANUAL REVIEW." It stands perfectly still, waiting. You walk around it. It tracks you but doesn't stop you.`},codes:{text:`"CONCORDAT SEAL ACKNOWLEDGED. PROCEED, ARCHIVIST." The door behind it swings open. Inside: a vault that hasn't been touched in two hundred years.`,reward:{gold:70,setFlag:"concordat_vault_opened"}},destroy:{text:"The head clangs off the wall. The body collapses. Inside the chest cavity: a power crystal. Still warm.",reward:{gold:40}},denied:{text:'"UNAUTHORIZED PERSONNEL. INITIATING DETERRENT." Lightning crackles from its fingertips.',reward:{damage:18}}}},{id:"ruins_observatory",minLevel:5,zone:"any",npcName:"Collapsed Observatory",npcPortrait:null,lines:[{speaker:"hero",text:"A tower, half-collapsed. At the top, visible through the ruin: a telescope the size of a war horse, pointed at the sky."}],choices:[{text:"Climb to the telescope.",outcome:"climb"},{text:"[DEX 14] Search the collapsed lower floors.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"search",fail:"fall"}},{text:"Too unstable.",outcome:"leave"}],outcomes:{climb:{text:"You reach the top. Through the telescope, the sky looks wrong — too many stars, in the wrong positions. One of them blinks.",reward:{setFlag:"saw_wrong_sky"}},search:{text:'The ground floor yields a logbook. The last entry: "It sees us looking. We must stop looking." Three days before the collapse.',reward:{gold:20,setFlag:"observatory_log"}},fall:{text:"A rotten beam gives way. You catch yourself two floors down. Bruised, wiser.",reward:{damage:12}},leave:{text:"The tower groans as if disappointed."}}},{id:"ruins_drowned_library",minLevel:9,zone:["hell_breach","shattered_core"],npcName:"Petrified Library",npcPortrait:null,lines:[{speaker:"hero",text:"Every surface is covered in writing. Not carved — grown. Living script, slowly spreading across the stone."}],choices:[{text:"[INT 18] Read the living script.",skillCheck:{stat:"INT",dc:18},outcomes:{pass:"read",fail:"overwhelm"}},{text:"Touch a word.",outcome:"touch"},{text:"Burn it. Knowledge that grows on its own is dangerous.",outcome:"burn"}],outcomes:{read:{text:"The script rearranges itself for you. A complete history of the Veil's formation — who opened it, and why. The truth is worse than you imagined.",reward:{setFlag:"veil_true_origin",gold:50}},touch:{text:'The word you touch — "sovereign" — burns into your fingertip. The script seethes. You yank your hand back.',reward:{damage:12}},overwhelm:{text:"The script floods your mind faster than you can process. You stagger out, head ringing, carrying fragments of terrible knowledge.",reward:{damage:15,setFlag:"partial_veil_lore"}},burn:{text:"The fire doesn't catch. The script simply writes over the scorched stone in minutes. Whatever this is, it doesn't die easily."}}},{id:"creature_cave_bear_mourning",minLevel:3,zone:["thornwood","border_roads"],npcName:"Grieving Bear",npcPortrait:null,lines:[{speaker:"hero",text:"A massive cave bear sits motionless over a smaller shape. A cub. Cold. The bear doesn't growl — it just breathes, slow and heavy."}],choices:[{text:"Leave them in peace.",outcome:"leave"},{text:"[INT 10] Check if the cub is truly dead.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"check",fail:"leave"}},{text:"[STR 10] Leave food nearby.",skillCheck:{stat:"STR",dc:10},outcomes:{pass:"food",fail:"leave"}}],outcomes:{leave:{text:"Some losses are not yours to fix. You walk quietly past."},check:{text:"The cub stirs. Alive — barely. You apply what little medicine you have. The bear watches without moving. When the cub whimpers, the bear exhales, long and deep.",reward:{heal:15}},food:{text:"You set your rations down twenty feet away and back off. The bear doesn't move, but by morning the food is gone."}}},{id:"creature_void_fox",minLevel:8,zone:["ember_plateau","hell_breach","shattered_core"],npcName:"Fox of Two Shadows",npcPortrait:null,lines:[{speaker:"hero",text:"A fox trots across your path. It casts two shadows in different directions. Neither matches its movement."}],choices:[{text:"Follow it.",outcome:"follow"},{text:"[INT 14] Understand what it is.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"understand",fail:"follow"}},{text:"Let it pass.",outcome:"leave"}],outcomes:{follow:{text:"It leads you through a path that shouldn't exist — a shortcut through the Veil-twisted terrain. At the end, it sits and waits. Then vanishes.",reward:{heal:10}},understand:{text:"A Veil echo — a creature that exists in two states simultaneously. One shadow is from our world, one from the other side. Following it is safe. It's a guide, of sorts.",reward:{heal:20,gold:20}},leave:{text:"It pauses, looks back over its shoulder, then continues into the dark. Something about those eyes stays with you."}}},{id:"creature_ancient_tortoise",minLevel:1,zone:"any",npcName:"Old Shell",npcPortrait:null,lines:[{speaker:"hero",text:"A tortoise the size of a table. Its shell is carved with runes — not by any human hand. It watches you with tremendous patience."}],choices:[{text:"Sit with it a moment.",outcome:"sit"},{text:"[INT 12] Read the runes on its shell.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"read",fail:"sit"}},{text:"Offer it food.",outcome:"feed"}],outcomes:{sit:{text:"You sit. It regards you. The world is quieter here. When you leave, you feel oddly rested.",reward:{heal:15}},read:{text:"Names. Hundreds of names etched in spiraling script. Travelers, probably. Everyone who ever sat with it. You find yourself wanting to add yours.",reward:{heal:20,setFlag:"shell_names_read"}},feed:{text:"It eats from your hand with meditative slowness. In return it allows you to rest against its shell, which radiates gentle warmth.",reward:{heal:25}}}},{id:"creature_void_moth_swarm",minLevel:10,zone:["hell_breach","shattered_core","cosmic_rift"],npcName:"Void Moth Swarm",npcPortrait:null,lines:[{speaker:"hero",text:"Moths the color of starless sky descend and cover you from shoulder to knee. They don't bite. They just... rest."}],choices:[{text:"Stay still and let them settle.",outcome:"still"},{text:"Brush them off.",outcome:"brush"},{text:"[INT 16] Listen to what they carry.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"listen",fail:"still"}}],outcomes:{still:{text:"They pulse gently. Where they touch you, the ache from old wounds fades. When they lift, you're lighter than before.",reward:{heal:30}},brush:{text:"They scatter without malice. On the ground where they were: a fine silver dust. It dissolves when you try to collect it."},listen:{text:"The hum of their wings carries a message — not words, but sensation. A location. A name. The Sovereign's true name, spoken in the void.",reward:{setFlag:"sovereign_true_name",heal:20}}}},{id:"creature_storm_hawk",minLevel:5,zone:["dust_roads","ember_plateau"],npcName:"Storm Hawk",npcPortrait:null,lines:[{speaker:"hero",text:"A hawk circles, trailing electricity. It lands on a rock nearby and tilts its head at you. It seems to be waiting."}],choices:[{text:"Extend your arm to it.",outcome:"arm"},{text:"[DEX 12] Catch it to examine the lightning around it.",skillCheck:{stat:"DEX",dc:12},outcomes:{pass:"catch",fail:"shocked"}},{text:"Watch from a distance.",outcome:"watch"}],outcomes:{arm:{text:"It steps onto your arm. A tingle of electricity runs up to your shoulder — sharp but not painful. It stares at the horizon, then launches. A message, delivered in feeling: storm coming from the east.",reward:{heal:5,setFlag:"storm_hawk_warning"}},catch:{text:"Your hands close around it gently. Its feathers crackle. You examine the lightning — it's Veil energy, converted harmlessly by the hawk's body. Remarkable.",reward:{setFlag:"storm_hawk_lore",gold:10}},shocked:{text:"The hawk objects to being grabbed. Thirty volts of objection. You both retreat with dignity.",reward:{damage:6}},watch:{text:"It watches back. Eventually loses interest and flies east. You watch it go with a feeling you can't name."}}},{id:"cursed_lantern",minLevel:4,zone:"any",npcName:"Black Lantern",npcPortrait:null,lines:[{speaker:"hero",text:"A lantern hanging from a branch, unlit. When you approach, it lights on its own — black flame, cold, casting shadows that point the wrong way."}],choices:[{text:"Take the lantern.",outcome:"take"},{text:"[INT 14] Inspect it before touching.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"inspect",fail:"take_bad"}},{text:"Smash it.",outcome:"smash"}],outcomes:{take:{text:"The lantern comes with you. That night, it shows you paths invisible to normal light. It also shows you things following you. That information has a cost.",reward:{item:"cursed_lantern",setFlag:"cursed_lantern_held"}},inspect:{text:"A soul-binder. Someone's spirit powers the flame — probably the previous carrier's. You dismantle the binding carefully. The flame dies. A faint thank-you drifts past.",reward:{heal:20,setFlag:"freed_lantern_soul"}},take_bad:{text:"The moment you grip it, cold floods your arm. You drop it, shaking. Your hand is grey for an hour.",reward:{damage:12}},smash:{text:`It shatters. Black flame sputters and dies. A whisper: "...finally." Whether gratitude or threat, you can't tell.`}}},{id:"cursed_coin",minLevel:2,zone:"any",npcName:"Blood Coin",npcPortrait:null,lines:[{speaker:"hero",text:"A gold coin in the road. You almost pass it. But it's warm — too warm for something that's been lying in the dirt."}],choices:[{text:"Pick it up.",outcome:"pick_up"},{text:"[INT 10] Examine it without touching.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"examine",fail:"pick_up"}},{text:"Leave it.",outcome:"leave"}],outcomes:{pick_up:{text:"It feels like it wants to be held. Three times that day you find gold where there shouldn't be any. Three times your dreams are red. Worth it? Maybe.",reward:{gold:30,setFlag:"blood_coin_held"}},examine:{text:"It's been cursed to attract its carrier to danger. Every piece of gold it brings you is bait. You kick it into the ditch.",reward:{heal:5}},leave:{text:"You walk on. Later, you hear footsteps behind you — someone else picked it up."}}},{id:"cursed_mirror_shard",minLevel:6,zone:["thornwood","dust_roads","ember_plateau"],npcName:"Mirror Shard",npcPortrait:null,lines:[{speaker:"hero",text:"A shard of mirror, half-buried. Your reflection in it doesn't move when you do. It's just standing there, watching."}],choices:[{text:"Speak to your reflection.",outcome:"speak"},{text:"[INT 16] Bind the reflection inside permanently.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"bind",fail:"escape"}},{text:"Bury it deeper.",outcome:"bury"}],outcomes:{speak:{text:`"You're going to fail," it says, in your voice. "Not today. But eventually." It offers no comfort when you ask when. It just smiles with your face.`,reward:{setFlag:"mirror_self_met"}},bind:{text:"You seal the shard with a word of binding. The reflection hammers against the glass once, then stills. The shard is now an incredibly powerful scrying lens.",reward:{item:"bound_mirror_shard",gold:30}},escape:{text:'You try to contain it. The reflection steps halfway out before you shove it back in. The shard cracks. "Next time," it says with your voice.',reward:{damage:15}},bury:{text:"You cover it with earth. Three feet down. As you walk away, you hear muffled knocking from below."}}},{id:"cursed_armor_piece",minLevel:7,zone:["dust_roads","ember_plateau","hell_breach"],npcName:"Singing Gauntlet",npcPortrait:null,lines:[{speaker:"hero",text:"A gauntlet on a battlefield relic. Perfectly preserved. When the wind blows, it hums — a warrior's death song."}],choices:[{text:"Put it on.",outcome:"wear"},{text:"[STR 14] Crush it before it bonds to someone.",skillCheck:{stat:"STR",dc:14},outcomes:{pass:"crush",fail:"snaps_on"}},{text:"[INT 12] Identify the warrior whose spirit remains.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"identify",fail:"wear"}}],outcomes:{wear:{text:"It fits perfectly. In battle, your strikes become faster, more certain. But between fights, your hand moves on its own sometimes. Reaching for a weapon. Reaching for a throat.",reward:{heal:10,setFlag:"cursed_gauntlet_worn"}},crush:{text:"The steel buckles. The humming becomes a shriek, then silence. Whatever was inside it is free now. Hopefully at peace.",reward:{heal:10}},snaps_on:{text:"As you grip it to test it, it locks onto your wrist. Tight. Humming.",reward:{damage:8,setFlag:"cursed_gauntlet_worn"}},identify:{text:'"General Voss of the third cohort. Died alone on this field." You speak her name aloud. The humming stops. The gauntlet is simply excellent steel now.',reward:{gold:25,heal:10}}}},{id:"cursed_manuscript",minLevel:5,zone:"any",npcName:"Self-Writing Book",npcPortrait:null,lines:[{speaker:"hero",text:"A book, open on a rock. Writing is filling the pages right now, with no hand guiding the pen. It's describing you. Your journey. It's almost caught up to the present."}],choices:[{text:"Read what it says about your future.",outcome:"read_future"},{text:"Tear out the last pages.",outcome:"tear"},{text:"[INT 14] Understand what kind of curse this is.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"understand",fail:"read_future"}}],outcomes:{read_future:{text:`The pages ahead describe battles you haven't fought, choices you haven't made. You read to the last written page. It ends mid-sentence: "And then she—"`,reward:{setFlag:"read_own_fate"}},tear:{text:"The pages tear. The book screams — a paper sound, wrong and high. The writing on the remaining pages begins frantically rewriting itself."},understand:{text:`A fate-binding tome. Someone commissioned it to trap you in a predetermined story. You write a single word in the margin: "No." The book slams shut and won't reopen.`,reward:{setFlag:"broke_fate_binding",heal:20}}}},{id:"weather_black_rain",minLevel:5,zone:["dust_roads","ember_plateau","thornwood"],npcName:"Black Rain",npcPortrait:null,lines:[{speaker:"hero",text:"The sky turns the color of bruised flesh. Rain begins — black as ink, smelling of copper and char."}],choices:[{text:"Find shelter immediately.",outcome:"shelter"},{text:"[INT 12] Collect some for study.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"collect",fail:"soak"}},{text:"Press through it — you're close to your destination.",outcome:"press"}],outcomes:{shelter:{text:"Under an overhang, you watch the black rain strip bark from trees. Nothing grows where it falls. You wait it out intact.",reward:{heal:5}},collect:{text:"You bottle a sample without skin contact. Concentrated Veil essence — volatile, but with careful handling, a potent reagent.",reward:{item:"veil_rain_sample",gold:15}},soak:{text:"The rain finds the gaps in your armor. It burns like salt in a wound. You emerge stained and weakened.",reward:{damage:18}},press:{text:"You make it. But the black rain leaves marks on your skin that take a day to fade. And the dreams that night are not yours."}}},{id:"weather_still_fog",minLevel:2,zone:["border_roads","thornwood"],npcName:"The Stillness",npcPortrait:null,lines:[{speaker:"hero",text:"Fog so thick you cannot see your hand. And silence — complete silence. No wind. No insects. Even your footsteps seem muffled."}],choices:[{text:"Navigate by memory alone.",outcome:"memory"},{text:"[INT 10] Read the ley lines through the fog.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"ley",fail:"lost"}},{text:"[DEX 12] Stay low and feel for the road.",skillCheck:{stat:"DEX",dc:12},outcomes:{pass:"feel",fail:"lost"}}],outcomes:{memory:{text:"Your memory holds. Every turn correct. When the fog lifts, you're where you meant to be — but an hour has passed that you cannot account for."},ley:{text:"The ley lines pulse faintly underfoot, steady as a compass needle. You emerge into clear air with your bearings intact.",reward:{heal:5}},feel:{text:"Your fingers find the road's stone edge. You follow it, slow but sure. In the fog, something brushes past you. You don't stop."},lost:{text:"The fog disorients you. You walk for an hour before the sun burns through. You've come full circle, back to your starting point.",reward:{damage:5}}}},{id:"weather_firestorm_edge",minLevel:8,zone:["ember_plateau","hell_breach"],npcName:"Firestorm",npcPortrait:null,lines:[{speaker:"hero",text:"A wall of fire on the horizon, moving. Too fast for the wind. It's being pushed."}],choices:[{text:"[DEX 16] Outrun it.",skillCheck:{stat:"DEX",dc:16},outcomes:{pass:"outrun",fail:"caught"}},{text:"[INT 14] Find the firebreak.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"firebreak",fail:"caught"}},{text:"Find a cave and seal the entrance.",outcome:"cave"}],outcomes:{outrun:{text:"Your lungs burn but your legs burn harder and you beat it. Behind you, the land turns to glass.",reward:{heal:5}},firebreak:{text:"You spot the old burn scar — a wide strip of bare earth from last year's fire. You cross it and watch the new firestorm devour itself at the border.",reward:{gold:20}},caught:{text:"The edge catches you. You roll, smother the flames, and stagger forward into clean air. Singed, but alive.",reward:{damage:22}},cave:{text:"You seal the mouth with loose rocks. The roar passes overhead. When you emerge, the world outside is burnt flat but you are whole."}}},{id:"weather_inverted_storm",minLevel:10,zone:["shattered_core","cosmic_rift"],npcName:"Inverted Storm",npcPortrait:null,lines:[{speaker:"hero",text:"Lightning rises from the ground. Rain falls upward. The clouds below your feet flicker with inverted thunder."}],choices:[{text:"Stand in it and feel what it does.",outcome:"stand"},{text:"Shield yourself and move quickly.",outcome:"shield"},{text:"[INT 16] Draw the energy into something useful.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"draw",fail:"discharge"}}],outcomes:{stand:{text:"The inverted rain washes over you. It doesn't wet. It clarifies. For a moment, you see every Veil rift within a mile, mapped in your mind.",reward:{setFlag:"rift_sight",heal:10}},shield:{text:"You cross the storm quickly. Your armor absorbs a few rising strikes. You emerge dented but intact.",reward:{damage:8}},draw:{text:"You funnel the inverted lightning into a focus point — the energy stabilizes, concentrated. Held in your palm like a second heartbeat.",reward:{heal:40,gold:30}},discharge:{text:"The energy grounds through you instead. Every hair on your body stands up. You taste copper for a day.",reward:{damage:20}}}},{id:"weather_memory_snow",minLevel:6,zone:["thornwood","border_roads"],npcName:"Memory Snow",npcPortrait:null,lines:[{speaker:"hero",text:"Snow falls that shouldn't — it's not cold enough. Each flake dissolves on touch and leaves an image: a face, a place, a moment. Someone's memories, scattered to the wind."}],choices:[{text:"Catch the flakes and watch the memories.",outcome:"watch"},{text:"[INT 12] Trace whose memories these are.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"trace",fail:"watch"}},{text:"Walk through without looking.",outcome:"ignore"}],outcomes:{watch:{text:"A life plays out in fragments. A child's birthday. A first love. A burning house. Someone's entire existence, dispersed into weather.",reward:{setFlag:"witnessed_lost_memories"}},trace:{text:"The memories belong to Elara of Thornwatch — reported missing two months ago. The last memory: the Veil taking her. You know where to look now.",reward:{setFlag:"found_elara_trail",gold:15}},ignore:{text:"You keep your eyes down. Some griefs aren't yours to carry."}}},{id:"ghost_soldier_loop",minLevel:3,zone:["border_roads","dust_roads"],npcName:"Spectral Soldier",npcPortrait:null,lines:[{speaker:"npc",text:"Hold! Who approaches the garrison of Thornwall in the name of the Third King?"},{speaker:"hero",text:"The Third King ruled three centuries ago. The soldier doesn't notice the ruins around him."}],choices:[{text:'Play along. "A friend of the kingdom."',outcome:"play_along"},{text:"Tell him the truth — the kingdom is gone.",outcome:"truth"},{text:"[INT 12] Speak the dismissal rite.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"dismiss",fail:"play_along"}}],outcomes:{play_along:{text:'"Pass, friend. Watch for the goblin scouts to the east." He stands aside, rigid and proud. You walk through him without resistance.',reward:{heal:5}},truth:{text:'His expression fractures. "The kingdom is... gone?" He looks at his hands — through them. "How long?" He weeps, and then fades.'},dismiss:{text:'"Be at peace, soldier. Your watch is over. The kingdom endures in better forms." He straightens. Salutes. Dissolves.',reward:{gold:20,setFlag:"soldier_dismissed"}}}},{id:"ghost_murder_victim",minLevel:5,zone:"any",npcName:"Accusing Ghost",npcPortrait:null,lines:[{speaker:"npc",text:"You can see me."},{speaker:"npc",text:"He's still out there. The man who did this. He walks free in Thornwall, selling grain and waving to neighbors."}],choices:[{text:'"Tell me his name."',outcome:"name"},{text:"Offer to pass her message to the magistrate.",outcome:"message"},{text:"You cannot fight every wrong.",outcome:"leave"}],outcomes:{name:{text:'"Hessler. Hessler the miller." She burns with cold fury. "Remember it." You will.',reward:{setFlag:"knows_hessler",heal:5}},message:{text:`"They won't listen. They never do. But... thank you for trying." She hands you her ring — evidence. "Maybe you'll have better luck."`,reward:{item:"ghost_ring",setFlag:"ghost_message_taken"}},leave:{text:"She watches you walk away. The cold follows you for three miles."}}},{id:"ghost_child_guardian",minLevel:2,zone:["thornwood","border_roads"],npcName:"Small Haunting",npcPortrait:null,lines:[{speaker:"npc",text:"Don't go that way. The bad thing lives that way."},{speaker:"hero",text:"A child — transparent, cold, no older than eight. She points down the left fork."}],choices:[{text:"Trust her. Take the right fork.",outcome:"trust"},{text:"Ask what the bad thing is.",outcome:"ask"},{text:"Go left anyway.",outcome:"left"}],outcomes:{trust:{text:"The right fork is longer but safe. In the distance, you hear sounds from the left path — something large and angry. She was right.",reward:{heal:10}},ask:{text:`"Teeth that don't stop. And eyes. Too many eyes." She won't say more. She fades when you press her.`},left:{text:"You find what she meant. It finds you first. You survive, barely, and take the right fork going back.",reward:{damage:20}}}},{id:"ghost_architect",minLevel:7,zone:["ember_plateau","hell_breach"],npcName:"Master Architect",npcPortrait:null,lines:[{speaker:"npc",text:"I built this fortress. Every stone. Forty years of work."},{speaker:"npc",text:"And then they told me what it was really for."}],choices:[{text:'"What was it really for?"',outcome:"ask"},{text:"Ask him about secret passages.",outcome:"passages"},{text:'"What did you do when you found out?"',outcome:"did"}],outcomes:{ask:{text:`"A Veil anchor. The whole structure channels Veil energy upward. It's why I can't leave. It's why I won't leave — if I go, the anchor stabilizes fully."`,reward:{setFlag:"fortress_veil_anchor"}},passages:{text:'He brightens. "Twelve. Here, here, and here—" He traces the walls with a ghostly finger. You memorize every route.',reward:{setFlag:"knows_fortress_passages",gold:20}},did:{text:`"I kept building. I didn't know how to stop. There's a kind of courage in stopping." He looks down at his transparent hands. "I never learned it in time."`}}},{id:"ghost_choir",minLevel:9,zone:["hell_breach","shattered_core"],npcName:"The Choir of the Fallen",npcPortrait:null,lines:[{speaker:"hero",text:"Hundreds of spirits, moving in unison, singing a single sustained note. The harmony is perfect. The sound makes your ribs ache."}],choices:[{text:"Stop and listen.",outcome:"listen"},{text:"[INT 14] Understand the song's meaning.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"understand",fail:"listen"}},{text:"Pass through quickly.",outcome:"pass"}],outcomes:{listen:{text:"The song is grief and defiance together. Every spirit here died fighting the Veil. They're still fighting — with this song. Something in you aligns with it.",reward:{heal:25}},understand:{text:"A resonance ward — they keep the Veil from spreading further by anchoring the border with collective will. They cannot leave. But while they sing, nothing from the Veil can cross here.",reward:{setFlag:"choir_ward_understood",heal:30}},pass:{text:"The choir parts around you like water. Each face you see looks at peace and terrible in equal measure. You emerge on the other side, inexplicably steadied."}}},{id:"bandit_deserter_plea",minLevel:2,zone:["border_roads","thornwood"],npcName:"Deserter",npcPortrait:null,lines:[{speaker:"npc",text:'I left the militia three days ago. I know that makes me a criminal. But they were marching us into the Veil-touched zone and calling it a "cleansing operation."'},{speaker:"npc",text:"I didn't sign up to be fed to it."}],choices:[{text:"Let him pass. His fear is valid.",outcome:"let_pass"},{text:"Report him to the next garrison.",outcome:"report"},{text:"[INT 10] Ask what he knows about the militia's plans.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"intel",fail:"let_pass"}}],outcomes:{let_pass:{text:'He nods, grateful and haunted. "Thank you." He melts into the undergrowth.'},report:{text:"You give the garrison his description. They pay a small reward. Whether they catch him, you don't know.",reward:{gold:10}},intel:{text:"He tells you everything — patrol routes, commander weaknesses, supply depots. A deserter with a grudge is a considerable intelligence asset.",reward:{gold:20,setFlag:"militia_intel"}}}},{id:"bandit_reformed_leader",minLevel:5,zone:["dust_roads","border_roads"],npcName:"Dessa Ironhand",npcPortrait:null,lines:[{speaker:"npc",text:"I ran the Ironhand crew for six years. A hundred people worked for me. I was very good at a very bad thing."},{speaker:"npc",text:"Then the Veil took my crew. Every last one. I'm the only survivor. Tell me what to do with that."}],choices:[{text:'"Use those skills for something worth using them for."',outcome:"redirect"},{text:`"There's nothing to do with that. Carry it and move."`,outcome:"carry"},{text:'[STR 12] "Start by putting down anyone who comes after you."',skillCheck:{stat:"STR",dc:12},outcomes:{pass:"fight",fail:"carry"}}],outcomes:{redirect:{text:'"Skills worth something." She looks at her hands. "Yeah. Maybe. I know every supply route in the region." She joins your cause.',reward:{gold:30,setFlag:"recruited_dessa"}},carry:{text:'She nods slowly. "Honest." She hands you half her provisions. "I travel lighter than I used to."',reward:{heal:20}},fight:{text:`"That I know how to do." A dark smile. "Someone's always coming after you in my trade. Nice to have company in it."`,reward:{gold:15,heal:10}}}},{id:"bandit_protection_racket",minLevel:3,zone:["border_roads","dust_roads"],npcName:"Collector Grint",npcPortrait:null,lines:[{speaker:"npc",text:"Ten gold. Per person. For the safety this road has thanks to us."},{speaker:"npc",text:"Don't think of it as robbery. Think of it as... infrastructure."}],choices:[{text:"Pay the toll (10 gold).",effect:{gold:-10},outcome:"pay"},{text:"[INT 12] Expose the extortion to the local militia.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"expose",fail:"fight_back"}},{text:`"I'd like to see you try collecting."`,outcome:"threaten"}],outcomes:{pay:{text:'He pockets it with a practiced smile. "Smart traveler. Safe roads ahead." They step aside.'},expose:{text:"You memorize their faces and post descriptions at the next garrison. Three days later, you hear the militia cleaned this road out.",reward:{gold:20,setFlag:"cleared_protection_racket"}},fight_back:{text:`"Oh, a difficult one." He signals. Four others step from the trees. You negotiate with violence. They don't take the toll. They don't have teeth to count it with.`,reward:{damage:15,gold:25}},threaten:{text:`"Feisty! But we've got four bows on you." He smiles. "Let's try again. Ten gold."`}}},{id:"bandit_heist_offer",minLevel:6,zone:["dust_roads"],npcName:"Whipser Korve",npcPortrait:null,lines:[{speaker:"npc",text:"A militia payroll wagon. Two guards, one driver, forty thousand gold pieces."},{speaker:"npc",text:"I've got the route. I need the muscle. Half and half — nobody gets hurt if they're smart about it."}],choices:[{text:"Agree. Split the take.",outcome:"agree"},{text:"Decline. This isn't your kind of work.",outcome:"decline"},{text:"[INT 14] Counter-propose: inform the militia for a reward.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"inform",fail:"decline"}}],outcomes:{agree:{text:"The job goes smooth. Nobody gets hurt. You walk away with gold and a reputation you didn't ask for.",reward:{gold:60,setFlag:"heist_completed"}},decline:{text:'"Your loss." She fades into an alley. The wagon passes unmolested. Probably.'},inform:{text:"You sell the route to the militia commander. They set an ambush. The payout is generous. Korve doesn't know it was you. Yet.",reward:{gold:45,setFlag:"informed_on_korve"}}}},{id:"bandit_last_job",minLevel:4,zone:"any",npcName:"Retiring Thief",npcPortrait:null,lines:[{speaker:"npc",text:"I'm done. Thirty years of this, and I'm done. Last job is just this one thing — then I'm gone west where the Veil hasn't touched."},{speaker:"npc",text:"I need your help. Nothing violent. Just a distraction."}],choices:[{text:"Help him. One last job.",outcome:"help"},{text:"Wish him luck but stay clear.",outcome:"decline"},{text:"[DEX 12] Offer to do the actual theft — you're quicker.",skillCheck:{stat:"DEX",dc:12},outcomes:{pass:"take_over",fail:"help"}}],outcomes:{help:{text:"Your distraction works perfectly. He gets what he came for. He presses half the take into your hands without a word and disappears west.",reward:{gold:25}},decline:{text:`"Fair enough. Can't blame you." He tips his hat and walks toward his fate alone.`},take_over:{text:`You move faster and cleaner than he could. He watches with professional respect. "Kid like you shouldn't be wasting time on the straight road." He splits the take three ways — including your skill bonus.`,reward:{gold:35}}}},{id:"shrine_fire_god",minLevel:1,zone:["border_roads","ember_plateau"],npcName:"Shrine of the Ember God",npcPortrait:null,lines:[{speaker:"hero",text:"A rough stone shrine with a flame that doesn't go out despite the wind. An offering bowl holds old coins."}],choices:[{text:"Make an offering (10 gold).",effect:{gold:-10},outcome:"offer"},{text:"Take the old coins from the bowl.",outcome:"steal"},{text:"Pray without offering.",outcome:"pray"}],outcomes:{offer:{text:"The flame grows briefly brighter and warm in a way that has nothing to do with heat. Something approves. You carry a warmth in your chest that lasts a day.",reward:{heal:20}},steal:{text:"Eight copper coins. And a burn on your palm that won't heal for three days. Some offerings are watched.",reward:{gold:1,damage:10}},pray:{text:"The flame doesn't judge. It gives what you put into it — which is nothing and nothing back. But you feel heard.",reward:{heal:5}}}},{id:"shrine_forgotten_god",minLevel:3,zone:["thornwood","border_roads"],npcName:"Overgrown Shrine",npcPortrait:null,lines:[{speaker:"hero",text:"A shrine so covered in growth that only the silhouette of a figure is visible. The name on the base has been worn completely smooth."}],choices:[{text:"Clear the vines and restore it.",outcome:"restore"},{text:"[INT 14] Identify the god from iconography.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"identify",fail:"restore"}},{text:"Leave it forgotten.",outcome:"leave"}],outcomes:{restore:{text:"You clear the growth and the figure emerges — a god of travelers. As you step back, you feel the road a little lighter under your feet.",reward:{heal:15}},identify:{text:`Vaerith, god of crossroads — declared heretical and unmade by the Third King's priests. Still here, quietly. "Still here," you say to the stone. The wind replies.`,reward:{heal:20,setFlag:"knows_vaerith",gold:10}},leave:{text:"Some things are forgotten for a reason. Or perhaps no reason at all. It's hard to know from the outside."}}},{id:"shrine_bloody_sacrifice",minLevel:6,zone:["dust_roads","hell_breach"],npcName:"Fresh Altar",npcPortrait:null,lines:[{speaker:"hero",text:"The altar is recent. The offering is recent. Whatever was given here, it was not coin."}],choices:[{text:"Destroy the altar.",outcome:"destroy"},{text:"[INT 14] Identify the entity being worshipped.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"identify",fail:"destroy"}},{text:"Leave it. This is not your affair.",outcome:"leave"}],outcomes:{destroy:{text:"The altar cracks under your heel. A shriek from somewhere below you. The air tastes of ash and relief.",reward:{heal:10,setFlag:"destroyed_cult_altar"}},identify:{text:"The sigils belong to the Veil Sovereign's intermediaries — a mid-tier cult cell. They're active here. You note the location.",reward:{gold:15,setFlag:"found_cult_cell"}},leave:{text:"You walk on. That night you wonder if that was the right call. The wondering doesn't stop."}}},{id:"shrine_prayer_contest",minLevel:4,zone:"any",npcName:"Priest of the Open Road",npcPortrait:null,lines:[{speaker:"npc",text:"I've been praying at this shrine for six hours. The god still hasn't answered."},{speaker:"npc",text:"Perhaps it needs a different voice."}],choices:[{text:"Pray with him.",outcome:"join"},{text:"[INT 12] Suggest a different ritual approach.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"advise",fail:"join"}},{text:"Gods answer in their own time. Or not at all.",outcome:"leave"}],outcomes:{join:{text:"Two voices. The shrine's flame steadies. It doesn't speak, but something about the road ahead feels known. The priest wipes tears he didn't expect to shed.",reward:{heal:10}},advise:{text:`"An offering of action, not words?" He considers. He does something — you don't watch — and the shrine answers. He shares the blessing with you.`,reward:{heal:25,gold:10}},leave:{text:`"You may be right," he says quietly. "But I'd rather keep trying."`}}},{id:"shrine_veil_heretic",minLevel:8,zone:["hell_breach","shattered_core"],npcName:"Veil Monk",npcPortrait:null,lines:[{speaker:"npc",text:"The Veil is not evil. It is honest. It shows you what you are when everything else is stripped away."},{speaker:"npc",text:"I worship what is true. Most people find that disturbing."}],choices:[{text:'"Truth and evil are not mutually exclusive."',outcome:"argue"},{text:'"What did the Veil show you?"',outcome:"ask"},{text:"[INT 16] Debate the theological point.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"debate",fail:"argue"}}],outcomes:{argue:{text:`"Ah. A pragmatist." He smiles. "Yes. But at least the Veil doesn't lie about it." You find you have no answer to that.`},ask:{text:'He is quiet for a long time. "It showed me that I am very small, and that small things can still matter enormously." He hands you a veil-touched amulet.',reward:{item:"veil_amulet",heal:15}},debate:{text:'The argument is long, sharp, and largely honest. Neither of you wins. Both of you learn something. He donates his rations to you, "for arguing in good faith."',reward:{heal:25,setFlag:"veil_theology_debated"}}}},{id:"lost_shepherd_child",minLevel:1,zone:["border_roads","thornwood"],npcName:"Tam",npcPortrait:null,lines:[{speaker:"npc",text:"I can't find my flock. I was watching them and then the fog came and—"},{speaker:"npc",text:"My mum's going to be so angry. She's always angry when the flock scatters."}],choices:[{text:"Help find the sheep.",outcome:"help"},{text:"Walk him home first, then search.",outcome:"home_first"},{text:"[INT 10] Use the sheep's tracks to find the flock quickly.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"track",fail:"help"}}],outcomes:{help:{text:"An hour of searching. Twelve sheep behind a hedge, calm as furniture. Tam hugs the lead sheep. His mum isn't angry — she was worried about him.",reward:{heal:10}},home_first:{text:"His mother bursts out crying the moment she sees him. She finds the flock herself by noon. She presses warm bread into your hands.",reward:{heal:15,gold:5}},track:{text:"You follow the prints to a hollow where all twelve sheep are dozing. Tam is so relieved he gives you his lunch.",reward:{heal:10}}}},{id:"lost_old_herbalist",minLevel:2,zone:["thornwood"],npcName:"Elder Moss",npcPortrait:null,lines:[{speaker:"npc",text:"I've been gathering in this forest for fifty years. And somehow today I am completely lost."},{speaker:"npc",text:"My basket is full and my knees hurt and I would very much like to go home."}],choices:[{text:"Escort her out of the forest.",outcome:"escort"},{text:"[INT 10] Navigate by the moss and sun.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"navigate",fail:"escort"}},{text:"Give her directions and continue.",outcome:"directions"}],outcomes:{escort:{text:"An hour of slow walking and her stories about every plant you pass. At the forest edge, she identifies three of your herbs as actually mislabeled — then fixes them. Better than any herbalist.",reward:{heal:25}},navigate:{text:'You orient by shadow and moss growth. She follows, impressed. "Sharp eyes. Here — this corrects inflammation. I have plenty."',reward:{heal:30}},directions:{text:"She listens carefully, nods, and heads off. You hear her humming. She'll probably be fine."}}},{id:"lost_soldier_patrol",minLevel:4,zone:["dust_roads","ember_plateau"],npcName:"Separated Scout",npcPortrait:null,lines:[{speaker:"npc",text:"My unit was ambushed. I ran. I'm not proud of that — I ran."},{speaker:"npc",text:"I don't know if anyone else made it. I don't know where I am."}],choices:[{text:"Help him find his unit.",outcome:"help"},{text:"Give him your map and send him north.",outcome:"map"},{text:"[INT 12] Use his patrol route to find survivors.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"survivors",fail:"help"}}],outcomes:{help:{text:"You find two others from his unit, alive and hidden. The reunion is wordless — the kind that doesn't need words.",reward:{gold:20,heal:10}},map:{text:`He takes it with shaking hands. "Thank you. I'll—" He catches himself. "Thank you." He goes north.`},survivors:{text:"His patrol route maps to two known survival points. You find three soldiers, not two. All alive.",reward:{gold:30,heal:15,setFlag:"saved_patrol"}}}},{id:"lost_scholar_apprentice",minLevel:3,zone:"any",npcName:"Apprentice Verin",npcPortrait:null,lines:[{speaker:"npc",text:"I was following my master and got distracted by a very interesting fungal formation and now I can't find him at all."},{speaker:"npc",text:"He's going to revoke my apprenticeship. He's threatened it eleven times already."}],choices:[{text:"Help him find his master.",outcome:"find"},{text:"[INT 10] The fungal formation sounds important — ask about it.",skillCheck:{stat:"INT",dc:10},outcomes:{pass:"fungus",fail:"find"}},{text:"Point him toward the nearest town.",outcome:"town"}],outcomes:{find:{text:"His master is three roads over, already writing furiously in a notebook and barely noticed his apprentice was gone. Verin is both relieved and vaguely insulted.",reward:{heal:5}},fungus:{text:"He shows you sketches — a Veil-touched mycorrhizal network mapping the corruption's spread underground. His master has been looking for this for years. You walk him there together.",reward:{gold:20,setFlag:"veil_fungal_map"}},town:{text:'"The town! Of course! He always stops at the first inn." He runs. He probably makes it.'}}},{id:"lost_refugees",minLevel:5,zone:["border_roads","dust_roads"],npcName:"Refugee Family",npcPortrait:null,lines:[{speaker:"npc",text:"We've been walking for nine days. We were told there was a safe camp two days east."},{speaker:"npc",text:"We've been east for four days. There is no camp."}],choices:[{text:"Share your rations and escort them.",outcome:"escort"},{text:"[INT 12] Recall the actual location of the safe camp.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"recall",fail:"escort"}},{text:"Give them gold and directions. You can't take on everyone.",outcome:"gold"}],outcomes:{escort:{text:"A day's travel together. The children fall asleep against your pack. The parents don't speak much, but their eyes do. You reach shelter by nightfall.",reward:{heal:10,setFlag:"escorted_refugees"}},recall:{text:`"It moved. Ash wraith pressure from the north. It's three days southeast now." They straighten with purpose. Direction is everything when you're lost.`,reward:{gold:15,setFlag:"helped_refugees"}},gold:{text:`You press what you can spare into their hands. They look at it for a moment. "Thank you. We'll make it." You hope they're right.`,reward:{gold:-20,heal:10}}}},{id:"void_speaking_silence",minLevel:11,zone:["shattered_core","cosmic_rift","eternal_void"],npcName:"The Silence",npcPortrait:null,lines:[{speaker:"hero",text:"An absolute absence of sound. Not quiet — void. And in that void, something is trying to communicate using the shape of silence."}],choices:[{text:"Be still and receive the message.",outcome:"receive"},{text:"[INT 16] Decode the silent language.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"decode",fail:"overwhelm"}},{text:"Make noise to break the contact.",outcome:"break"}],outcomes:{receive:{text:"The message fills you without words. A warning: something is closing. A door — not physical. Metaphysical. Closing soon. The silence releases you.",reward:{setFlag:"void_warning_received",heal:10}},decode:{text:"Eleven layers of meaning nested in absence. The outermost: warning. The innermost: coordinates. A location in the void that matters enormously.",reward:{gold:40,setFlag:"void_coordinates"}},overwhelm:{text:"Too much, too fast. You scream without sound. The void releases you, concerned, and you collapse into noise.",reward:{damage:20}},break:{text:"You shout. The silence shatters. Whatever was communicating recoils. You hear it retreat — something vast, moving away."}}},{id:"void_probability_storm",minLevel:12,zone:["cosmic_rift","eternal_void"],npcName:"Probability Storm",npcPortrait:null,lines:[{speaker:"hero",text:"Every decision you make here splinters into visible echoes. You can see yourself taking every path at once."}],choices:[{text:"Let it run. Let the paths split.",outcome:"split"},{text:"[INT 18] Collapse the wave. Pick one path and commit.",skillCheck:{stat:"INT",dc:18},outcomes:{pass:"collapse",fail:"lost"}},{text:"Close your eyes and walk forward.",outcome:"walk"}],outcomes:{split:{text:"For a moment you are everywhere at once. One of your selves finds gold. One of your selves finds a trap. The storm collapses and you are you again, holding both outcomes.",reward:{gold:40,damage:10}},collapse:{text:"You select. The other selves dissolve. The chosen path opens perfectly. Whatever it leads to, it is exactly right.",reward:{gold:60,heal:30}},lost:{text:"The storm splits you across probability space. Reassembling yourself takes everything you have.",reward:{damage:25}},walk:{text:"The storm can't disorient you if you don't look at it. Brute pragmatism wins. You emerge on the other side intact and unimpressed."}}},{id:"void_memory_well",minLevel:10,zone:["hell_breach","shattered_core","cosmic_rift"],npcName:"Memory Well",npcPortrait:null,lines:[{speaker:"hero",text:"A hole in the ground that shouldn't exist — it leads somewhere that isn't down. Voices echo from inside. Familiar voices. Your own voice, at different ages."}],choices:[{text:"Lower your hand in and listen.",outcome:"listen"},{text:"[INT 14] Call into it — ask it a question.",skillCheck:{stat:"INT",dc:14},outcomes:{pass:"ask",fail:"echo_back"}},{text:"Seal it. Memory wells are Veil feeding traps.",outcome:"seal"}],outcomes:{listen:{text:'You hear yourself from years ago — making a decision you regret. And then you hear yourself tomorrow, calm, certain. "It works out," your future voice says.',reward:{heal:20,setFlag:"heard_future_self"}},ask:{text:'"What do I need to know?" The well considers. Then: a single name. A place. A time. Clear as daylight.',reward:{gold:30,setFlag:"well_answer"}},echo_back:{text:"Your voice echoes back garbled — all the worst things you've ever said, in a loop. The well laughs in your voice. You cover your ears and walk.",reward:{damage:12}},seal:{text:"You pack earth and stone into it until it's full. The voices fade. The Veil note it as a lost asset. You note it as a victory."}}},{id:"void_gravity_inversion",minLevel:13,zone:["cosmic_rift","eternal_void"],npcName:"Inverted Zone",npcPortrait:null,lines:[{speaker:"hero",text:"The ground is the ceiling. The sky is below you. You are standing on thin air above an infinite falling sky, held up by nothing, and the nothing is extremely confident."}],choices:[{text:"Walk forward. Trust the nothing.",outcome:"trust"},{text:"[DEX 18] Navigate by treating it as a standard physical challenge.",skillCheck:{stat:"DEX",dc:18},outcomes:{pass:"navigate",fail:"panic"}},{text:"[INT 16] Understand the inversion and exploit it.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"exploit",fail:"panic"}}],outcomes:{trust:{text:"The nothing holds. Of course it does. At the far end, the zone ends and you step back onto solid ground with everything you started with plus an unshakeable calm.",reward:{heal:20}},navigate:{text:"You treat it like a tightrope in unusual orientation. Your body finds balance where logic says there's none. You cross, exhilarated and intact.",reward:{heal:30,gold:40}},exploit:{text:"You realize objects fall upward here. You drop your pack, watch it fall to the sky, and retrieve it on the other side with treasures that fell up with it.",reward:{gold:60}},panic:{text:"Your body doesn't agree with the situation. You crawl through on instinct, barely. Your grip on reality is temporarily looser than usual.",reward:{damage:20}}}},{id:"void_final_question",minLevel:14,zone:["cosmic_rift","eternal_void"],npcName:"The Question",npcPortrait:null,lines:[{speaker:"hero",text:'A presence — not a figure, not a voice, but a question posed at you by the void itself. You feel it rather than hear it: "Why do you continue?"'}],choices:[{text:`"Because there's no alternative worth considering."`,outcome:"no_alternative"},{text:'"Because the people counting on me deserve better than me stopping."',outcome:"others"},{text:"[INT 16] Answer with a question of your own.",skillCheck:{stat:"INT",dc:16},outcomes:{pass:"counter",fail:"no_alternative"}}],outcomes:{no_alternative:{text:"The void is satisfied by clarity. Not inspired, but satisfied. It gives you something — not wisdom exactly, but a settled certainty that doesn't waver.",reward:{heal:30,setFlag:"void_answered"}},others:{text:"The void considers this for a long time. It is not a concept it fully understands. That you have it anyway seems to matter. Something is given freely.",reward:{heal:40,gold:50,setFlag:"void_answered"}},counter:{text:`"Why do you ask?" The void is surprised. Then — something like respect. A rare thing from something without feelings. It tells you something it wasn't going to tell you.`,reward:{heal:50,gold:60,setFlag:"void_secret_learned"}},no_alternative_fail:{text:"The void accepts your answer without ceremony. You continue."}}}];function Ye(n,e,t=[]){const a=K.filter(i=>n<i.minLevel?!1:i.zone==="any"?!0:Array.isArray(i.zone)?i.zone.includes(e):i.zone===e);if(a.length===0){const i=K.filter(l=>n>=l.minLevel);return i.length===0?K[0]:le(i[Math.floor(Math.random()*i.length)])}const o=a.filter(i=>!t.includes(i.id)),s=o.length>0?o:a,r=s[Math.floor(Math.random()*s.length)];return le(r)}function le(n){return{id:n.id,npcName:n.npcName,npcPortrait:n.npcPortrait,lines:n.lines,choices:n.choices,outcomes:n.outcomes}}class Oe{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._charIdx=0,this._pending={},this._pointsLeft=0}onEnter(){this._build()}_getMembersWithPoints(){return u.get().party.filter(t=>(t.pendingAttrPoints||0)>0)}_build(){I("levelup-styles",Ve),this._el=S("div","levelup-screen"),this.manager.uiOverlay.appendChild(this._el);const e=this._getMembersWithPoints();if(!e.length){this.manager.pop();return}this._loadMember(e[0]),this._render(e)}_loadMember(e){this._pending={STR:0,DEX:0,INT:0,CON:0},this._pointsLeft=e.pendingAttrPoints||0,this._currentMember=e}_render(e){var a;e||(e=this._getMembersWithPoints());const t=this._currentMember;this._el.innerHTML=`
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
          ${["STR","DEX","INT","CON"].map(o=>this._attrRow(o,t)).join("")}
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
    `,["STR","DEX","INT","CON"].forEach(o=>{var s,r;(s=this._el.querySelector(`#lu-plus-${o}`))==null||s.addEventListener("click",()=>this._addPoint(o)),(r=this._el.querySelector(`#lu-minus-${o}`))==null||r.addEventListener("click",()=>this._removePoint(o))}),(a=this._el.querySelector("#lu-confirm"))==null||a.addEventListener("click",()=>{this._pointsLeft>0||(this.audio.playSfx("click"),this._applyPoints())})}_attrRow(e,t){var i;const a={STR:"Strength",DEX:"Dexterity",INT:"Intellect",CON:"Constitution"},o={STR:"⚔",DEX:"🏃",INT:"✦",CON:"🛡"},s=((i=t.attrs)==null?void 0:i[e])||8,r=this._pending[e]||0;return`
      <div class="lu-attr-row">
        <div class="lu-attr-icon">${o[e]}</div>
        <div class="lu-attr-info">
          <div class="lu-attr-name">${a[e]}</div>
          <div class="lu-attr-sub">${e}</div>
        </div>
        <div class="lu-attr-controls">
          <button class="lu-pm minus" id="lu-minus-${e}" ${r===0?"disabled":""}>−</button>
          <div class="lu-attr-val">
            <span class="lu-base">${s}</span>
            ${r>0?`<span class="lu-added">+${r}</span>`:""}
          </div>
          <button class="lu-pm plus" id="lu-plus-${e}" ${this._pointsLeft===0?"disabled":""}>+</button>
        </div>
      </div>
    `}_addPoint(e){this._pointsLeft<=0||(this._pending[e]++,this._pointsLeft--,this.audio.playSfx("click"),this._refreshAttrs())}_removePoint(e){this._pending[e]<=0||(this._pending[e]--,this._pointsLeft++,this.audio.playSfx("click"),this._refreshAttrs())}_refreshAttrs(){var r,i,l,d;const e=this._currentMember,t=(r=this._el)==null?void 0:r.querySelector("#lu-attrs");t&&(t.innerHTML=["STR","DEX","INT","CON"].map(h=>this._attrRow(h,e)).join("")),["STR","DEX","INT","CON"].forEach(h=>{var c,m;(c=this._el.querySelector(`#lu-plus-${h}`))==null||c.addEventListener("click",()=>this._addPoint(h)),(m=this._el.querySelector(`#lu-minus-${h}`))==null||m.addEventListener("click",()=>this._removePoint(h))});const a=(i=this._el)==null?void 0:i.querySelector("#lu-pts");a&&(a.textContent=this._pointsLeft);const o=(l=this._el)==null?void 0:l.querySelector("#lu-prev-grid");o&&(o.innerHTML=this._previewStats(e));const s=(d=this._el)==null?void 0:d.querySelector("#lu-confirm");s&&(s.disabled=this._pointsLeft>0,s.textContent=this._pointsLeft>0?`Spend All Points (${this._pointsLeft} left)`:"Confirm")}_previewStats(e){const t=e.attrs||{},a=this._pending,o=(t.STR||8)+(a.STR||0),s=(t.DEX||8)+(a.DEX||0),r=(t.INT||8)+(a.INT||0),l=50+((t.CON||8)+(a.CON||0))*10,d=30+r*8,h=Math.min(95,70+Math.round(s*1.2)),c=Math.min(40,5+Math.round(s*.8)),m=Math.round(o*1.5);return[{label:"Max HP",val:l},{label:"Max MP",val:d},{label:"Hit%",val:`${h}%`},{label:"Dodge%",val:`${c}%`},{label:"Melee Dmg",val:`+${m}`}].map(v=>`
      <div class="lu-prev-stat">
        <span class="lu-prev-label">${v.label}</span>
        <span class="lu-prev-val">${v.val}</span>
      </div>
    `).join("")}_applyPoints(){const e=this._currentMember;for(const[a,o]of Object.entries(this._pending))e.attrs[a]=(e.attrs[a]||8)+o;e.pendingAttrPoints=0,e.maxHp=50+e.attrs.CON*10,e.maxMp=30+e.attrs.INT*8,e.hp=e.maxHp,e.mp=e.maxMp;const t=this._getMembersWithPoints();t.length>0?(this._loadMember(t[0]),this._render()):this.manager.pop()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const Ve=`
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
`,de=[0,100,250,450,700,1e3,1400,1900,2500,3200,4e3,5e3,6200,7600,9200,11e3,13200,15800,18800,22300];function Fe(n){for(let e=de.length;e>=1;e--)if(n>=de[e-1])return e;return 1}function Ge(n){const e=Fe(n.xp||0);if(e>(n.level||1)&&e<=20){const t=n.level||1;n.level=e;let a=0;for(let s=t+1;s<=e;s++)(s%3===0||s===2)&&(a+=2);a>0&&(n.pendingAttrPoints=(n.pendingAttrPoints||0)+a);const o=e-t;return n.pendingSkillPoints=(n.pendingSkillPoints||0)+o,n.maxHp=50+n.attrs.CON*10,n.maxMp=30+n.attrs.INT*8,n.hp=n.maxHp,n.mp=n.maxMp,!0}return!1}function We(n,e){const t=[];for(const a of n)a.xp=(a.xp||0)+e,Ge(a)&&t.push({name:a.name,level:a.level});return t}const je={low:.7,medium:1,high:1.2,elite:1.4,exotic:1.6},Xe={normal:0,magic:[1,2],rare:[3,4],legendary:[4,6]},N={normal:"#c8c8c8",magic:"#6080ff",rare:"#e8d020",legendary:"#ff8020"},Ue={dagger:{name:"Dagger",type:"weapon",subtype:"dagger",dmg:[3,7],speed:1.2,twoHanded:!1,statScaling:"dex",armorPen:.1},sword:{name:"Sword",type:"weapon",subtype:"sword",dmg:[6,14],speed:1,twoHanded:!1,statScaling:"str_dex"},wand:{name:"Wand",type:"weapon",subtype:"wand",dmg:[4,10],speed:1.1,twoHanded:!1,statScaling:"int",offHandOk:!0},scepter:{name:"Scepter",type:"weapon",subtype:"scepter",dmg:[5,12],speed:1,twoHanded:!1,statScaling:"int",offHandOk:!0},staff:{name:"Staff",type:"weapon",subtype:"staff",dmg:[8,20],speed:.9,twoHanded:!0,statScaling:"int",intMult:1.5},hammer:{name:"Hammer",type:"weapon",subtype:"hammer",dmg:[8,16],speed:.8,twoHanded:!1,statScaling:"str",stunChance:.1},sword2h:{name:"Greatsword",type:"weapon",subtype:"sword2h",dmg:[14,28],speed:.7,twoHanded:!0,statScaling:"str",strMult:1.5},axe2h:{name:"Greataxe",type:"weapon",subtype:"axe2h",dmg:[16,30],speed:.65,twoHanded:!0,statScaling:"str",bleedChance:.15},bow:{name:"Bow",type:"weapon",subtype:"bow",dmg:[8,16],speed:1,twoHanded:!0,statScaling:"dex",dexMult:1.3,ranged:!0},crossbow:{name:"Crossbow",type:"weapon",subtype:"crossbow",dmg:[12,22],speed:.7,twoHanded:!0,statScaling:"dex_str",ranged:!0},javelin:{name:"Javelin",type:"weapon",subtype:"javelin",dmg:[9,18],speed:.9,twoHanded:!1,statScaling:"str_dex",ranged:!0,throwable:!0}},Ze={cloth_helm:{name:"Hood",type:"armor",slot:"head",tier:"cloth",armor:1,dodgeBonus:0},light_helm:{name:"Leather Cap",type:"armor",slot:"head",tier:"light",armor:3,dodgeBonus:0},medium_helm:{name:"Chain Coif",type:"armor",slot:"head",tier:"medium",armor:5,dodgeBonus:-1},heavy_helm:{name:"War Helm",type:"armor",slot:"head",tier:"heavy",armor:8,dodgeBonus:-2},cloth_chest:{name:"Robes",type:"armor",slot:"chest",tier:"cloth",armor:2,dodgeBonus:0},light_chest:{name:"Leather Armor",type:"armor",slot:"chest",tier:"light",armor:6,dodgeBonus:0},medium_chest:{name:"Chain Shirt",type:"armor",slot:"chest",tier:"medium",armor:10,dodgeBonus:-2},heavy_chest:{name:"Plate Armor",type:"armor",slot:"chest",tier:"heavy",armor:16,dodgeBonus:-4},cloth_legs:{name:"Linen Leggings",type:"armor",slot:"legs",tier:"cloth",armor:1,dodgeBonus:0},light_legs:{name:"Leather Legs",type:"armor",slot:"legs",tier:"light",armor:4,dodgeBonus:0},medium_legs:{name:"Chain Legs",type:"armor",slot:"legs",tier:"medium",armor:7,dodgeBonus:-1},heavy_legs:{name:"Plate Legs",type:"armor",slot:"legs",tier:"heavy",armor:11,dodgeBonus:-3},shield:{name:"Shield",type:"armor",slot:"offhand",tier:"heavy",armor:5,dodgeBonus:5,blockChance:.2},ring:{name:"Ring",type:"accessory",slot:"ring",tier:"any",armor:0},necklace:{name:"Necklace",type:"accessory",slot:"necklace",tier:"any",armor:0}},Ke={prefixes:[{id:"of_str",name:"Sturdy",stat:"str",min:1,max:4},{id:"of_dex",name:"Swift",stat:"dex",min:1,max:4},{id:"of_int",name:"Wise",stat:"int",min:1,max:4},{id:"of_con",name:"Hardy",stat:"con",min:1,max:4},{id:"sharp",name:"Sharp",stat:"dmg",min:1,max:3},{id:"sturdy",name:"Reinforced",stat:"armor",min:1,max:3},{id:"burning",name:"Burning",stat:"burnChance",min:.05,max:.15},{id:"bleeding",name:"Serrated",stat:"bleedChance",min:.05,max:.15}],suffixes:[{id:"of_hp",name:"of Vitality",stat:"hp",min:5,max:20},{id:"of_mp",name:"of Focus",stat:"mp",min:5,max:15},{id:"of_hit",name:"of Accuracy",stat:"hit",min:2,max:8},{id:"of_dodge",name:"of Evasion",stat:"dodge",min:2,max:6},{id:"of_speed",name:"of Haste",stat:"initiative",min:1,max:3},{id:"of_gold",name:"of Fortune",stat:"goldFind",min:.05,max:.2}]};function A(n,e="normal",t="medium",a=Ke){const o=Ue[n]||Ze[n];if(!o)return null;const s=je[t],r={id:crypto.randomUUID(),baseKey:n,name:o.name,type:o.type,subtype:o.subtype||o.slot,slot:o.slot||"weapon",twoHanded:!!o.twoHanded,offHandOk:!!o.offHandOk,rarity:e,quality:t,affixes:[]};o.dmg&&(r.dmg=[Math.round(o.dmg[0]*s),Math.round(o.dmg[1]*s)]),o.armor!==void 0&&(r.armor=Math.round(o.armor*s));const i=Xe[e];if(i){const[l,d]=Array.isArray(i)?i:[i,i],h=l+Math.floor(Math.random()*(d-l+1)),c=[...a.prefixes,...a.suffixes],m=[];for(let y=0;y<h&&c.length>m.length;y++){let g,_=0;do g=c[Math.floor(Math.random()*c.length)],_++;while(m.find(b=>b.id===g.id)&&_<20);if(!m.find(b=>b.id===g.id)){const b=+(g.min+Math.random()*(g.max-g.min)).toFixed(2);m.push({...g,value:b})}}r.affixes=m;const v=m.find(y=>a.prefixes.find(g=>g.id===y.id)),p=m.find(y=>a.suffixes.find(g=>g.id===y.id));v&&(r.name=`${v.name} ${r.name}`),p&&(r.name=`${r.name} ${p.name}`)}return r}function _e(n){if(!n)return"";const e=o=>o.charAt(0).toUpperCase()+o.slice(1),t=o=>o.charAt(0).toUpperCase()+o.slice(1);let a=[`<strong>${n.name}</strong>`,`<span class="tt-rarity" style="color:${N[n.rarity]}">${t(n.rarity)} · ${e(n.quality)}</span>`];n.dmg&&a.push(`Damage: ${n.dmg[0]}–${n.dmg[1]}`),n.armor&&a.push(`Armor: +${n.armor}`);for(const o of n.affixes||[]){const s=typeof o.value=="number"&&o.value<1?`${Math.round(o.value*100)}%`:`+${o.value}`;a.push(`<span style="color:#90d8a8">${o.name}: ${s} ${o.stat.toUpperCase()}</span>`)}return a.join("<br>")}const Q={iron_scrap:{id:"iron_scrap",name:"Iron Scrap",icon:"🔩",desc:"Salvaged from normal weapons and armor."},magic_essence:{id:"magic_essence",name:"Magic Essence",icon:"💜",desc:"Distilled from magic items."},rare_dust:{id:"rare_dust",name:"Rare Dust",icon:"✨",desc:"Refined from rare items."},legend_core:{id:"legend_core",name:"Legendary Core",icon:"🌟",desc:"Extracted from legendary items."},void_shard:{id:"void_shard",name:"Void Shard",icon:"✦",desc:"Drops from void enemies. Used in endgame recipes."}},ce={normal:{iron_scrap:[2,4]},magic:{iron_scrap:[1,2],magic_essence:[1,2]},rare:{magic_essence:[1,3],rare_dust:[1,2]},legendary:{rare_dust:[1,2],legend_core:[1,1]}},he=[{id:"craft_magic_sword",name:"Magic Sword",materials:{iron_scrap:4,magic_essence:2},base:"sword",rarity:"magic",quality:"medium"},{id:"craft_rare_sword",name:"Rare Sword",materials:{magic_essence:4,rare_dust:2},base:"sword",rarity:"rare",quality:"high"},{id:"craft_magic_staff",name:"Magic Staff",materials:{iron_scrap:4,magic_essence:2},base:"staff",rarity:"magic",quality:"medium"},{id:"craft_rare_staff",name:"Rare Staff",materials:{magic_essence:4,rare_dust:2},base:"staff",rarity:"rare",quality:"high"},{id:"craft_magic_chest",name:"Magic Plate",materials:{iron_scrap:6,magic_essence:2},base:"heavy_chest",rarity:"magic",quality:"medium"},{id:"craft_rare_chest",name:"Rare Plate",materials:{magic_essence:4,rare_dust:3},base:"heavy_chest",rarity:"rare",quality:"high"},{id:"craft_legendary_ring",name:"Legendary Ring",materials:{rare_dust:4,legend_core:1},base:"ring",rarity:"legendary",quality:"elite"},{id:"craft_void_staff",name:"Void Staff",materials:{legend_core:2,void_shard:3},base:"staff",rarity:"legendary",quality:"exotic"},{id:"craft_void_armor",name:"Void Plate",materials:{legend_core:2,void_shard:4},base:"heavy_chest",rarity:"legendary",quality:"exotic"}];function Qe(n){const e=ce[n.rarity]||ce.normal,t={};for(const[a,o]of Object.entries(e)){const s=o[0]+Math.floor(Math.random()*(o[1]-o[0]+1));s>0&&(t[a]=s)}return t}function ue(n,e){for(const[t,a]of Object.entries(n.materials))if((e[t]||0)<a)return!1;return!0}function Je(n,e){for(const[t,a]of Object.entries(n.materials))e[t]=(e[t]||0)-a}const D={healing_potion:{id:"healing_potion",name:"Healing Potion",icon:"🧪",type:"consumable",subtype:"potion",effect:{type:"heal",amount:40},target:"single",cost:30,desc:"Restores 40 HP to one ally."},greater_healing:{id:"greater_healing",name:"Greater Healing Potion",icon:"💊",type:"consumable",subtype:"potion",effect:{type:"heal",amount:80},target:"single",cost:65,desc:"Restores 80 HP to one ally."},mana_potion:{id:"mana_potion",name:"Mana Potion",icon:"🔵",type:"consumable",subtype:"potion",effect:{type:"mana",amount:40},target:"single",cost:35,desc:"Restores 40 MP to one ally."},revival_flask:{id:"revival_flask",name:"Revival Flask",icon:"⚗️",type:"consumable",subtype:"flask",effect:{type:"revive",amount:25},target:"single",cost:80,desc:"Revives a fallen ally with 25 HP."},group_tonic:{id:"group_tonic",name:"Group Tonic",icon:"🫙",type:"consumable",subtype:"flask",effect:{type:"heal",amount:25},target:"group",cost:90,desc:"Restores 25 HP to all living allies."},antidote:{id:"antidote",name:"Antidote",icon:"🟢",type:"consumable",subtype:"potion",effect:{type:"cleanse",statuses:["poison","bleed"]},target:"single",cost:25,desc:"Removes Poison and Bleed from one ally."},portal_scroll:{id:"portal_scroll",name:"Town Portal Scroll",icon:"✦",type:"consumable",subtype:"scroll",effect:{type:"portal"},target:"none",cost:30,desc:"Opens a portal between your current location and town."}},me=[{...D.healing_potion},{...D.greater_healing},{...D.mana_potion},{...D.revival_flask},{...D.group_tonic},{...D.antidote},{...D.portal_scroll}];function et(n,e){const t=n.effect,a=[];for(const o of e)if(t.type==="heal"){if(!o.alive&&t.type!=="revive")continue;const s=Math.min(o.maxHp-o.hp,t.amount);o.hp=Math.min(o.maxHp,o.hp+t.amount),a.push(`${o.name} +${s} HP`)}else if(t.type==="mana")o.mp=Math.min(o.maxMp||80,(o.mp||0)+t.amount),a.push(`${o.name} +${t.amount} MP`);else if(t.type==="revive"){if(o.alive)continue;o.alive=!0,o.hp=t.amount,o.stance="ready",a.push(`${o.name} revived!`)}else if(t.type==="cleanse"){const s=(o.statuses||[]).filter(r=>(t.statuses||[]).includes(r.type));o.statuses=(o.statuses||[]).filter(r=>!(t.statuses||[]).includes(r.type)),s.length&&a.push(`${o.name} cleansed!`)}return a.join(", ")||"No effect"}const we={shield_bash:{name:"Shield Bash",class:"warrior",unlockLevel:1,type:"melee",aoe:"adjacent",damageStat:"str",damageMult:1.2,statusEffects:[{type:"stun",chance:.6,duration:1}],mpCost:0,description:"Strike with shield, dealing STR-based damage and applying Stun (1 round).",talents:[{id:"sb_wider",name:"Wide Arc",desc:"Hits 1-2 adjacent enemies instead of 1.",effect:{aoe:"adjacent2"}},{id:"sb_stun",name:"Extended Stun",desc:"Stun lasts 2 rounds.",effect:{stunDuration:2}}],upgrades:[{level:5,name:"Resounding Bash",description:"Damage increases to 160% STR. Stun chance rises to 80%.",bonus:{damageMult:1.6,statusEffects:[{type:"stun",chance:.8,duration:1}]}},{level:10,name:"Shattering Slam",description:"Damage increases to 200% STR, hits all adjacent enemies, and reduces target armor by 20% for 2 rounds.",bonus:{damageMult:2,aoe:"adjacent2",armorDebuff:.2,armorDebuffDur:2}}]},battle_cry:{name:"Battle Cry",class:"warrior",unlockLevel:5,type:"buff",target:"party",effect:{dmgBuff:.2,duration:3},mpCost:15,description:"Rally the party, granting +20% damage for 3 rounds.",talents:[{id:"bc_hp",name:"Inspiring Shout",desc:"Also grants 20 temporary HP to each party member.",effect:{tempHp:20}},{id:"bc_def",name:"Rallying Cry",desc:"Also reduces incoming damage by 10%.",effect:{dmgReduct:.1}}],upgrades:[{level:10,name:"War Anthem",description:"Party damage bonus increases to +35% and lasts 4 rounds.",bonus:{dmgBuff:.35,duration:4}},{level:15,name:"Berserker's Roar",description:"Party damage bonus increases to +50%, lasts 5 rounds, and also grants +15% attack speed.",bonus:{dmgBuff:.5,duration:5,attackSpeed:.15}}]},whirlwind:{name:"Whirlwind",class:"warrior",unlockLevel:10,type:"melee",aoe:"row",damageStat:"str",damageMult:.9,statusEffects:[],mpCost:20,description:"Spin attack hitting all adjacent enemies (up to 3).",talents:[{id:"ww_bleed",name:"Serrated Blade",desc:"Applies Bleed to all hit enemies.",effect:{bleed:{duration:3}}},{id:"ww_extra",name:"Wider Spin",desc:"Hits one additional enemy row.",effect:{aoe:"row2"}}],upgrades:[{level:14,name:"Cyclone Strike",description:"Damage increases to 120% STR and applies Bleed to all struck enemies for 3 rounds.",bonus:{damageMult:1.2,statusEffects:[{type:"bleed",chance:1,duration:3}]}},{level:18,name:"Endless Vortex",description:"Damage increases to 150% STR, hits all enemies, and MP cost reduced to 12.",bonus:{damageMult:1.5,aoe:"all",mpCost:-8}}]},unbreakable:{name:"Unbreakable",class:"warrior",unlockLevel:15,type:"buff",target:"self",effect:{dmgReduct:.5,reflect:.1,duration:2},mpCost:25,description:"Enter defensive stance for 2 rounds: take 50% less damage, reflect 10% back.",talents:[{id:"ub_reflect",name:"Thorns",desc:"Reflect increases to 25%.",effect:{reflect:.25}},{id:"ub_dur",name:"Iron Will",desc:"Duration extends to 3 rounds.",effect:{duration:3}}],upgrades:[{level:17,name:"Fortified Stance",description:"Damage reduction increases to 65%, reflect to 20%, and duration to 3 rounds.",bonus:{dmgReduct:.65,reflect:.2,duration:3}},{level:20,name:"Invincible Titan",description:"Damage reduction increases to 80%, reflect 35% back, lasts 4 rounds, and grants immunity to Stun and Bleed.",bonus:{dmgReduct:.8,reflect:.35,duration:4,immuneStun:!0,immuneBleed:!0}}]},holy_strike:{name:"Holy Strike",class:"paladin",unlockLevel:1,type:"melee",aoe:"single",damageStat:"str_int",damageMult:1.1,bonusVsUndead:2,bonusVsDemon:2,mpCost:5,description:"Blessed melee blow dealing STR+INT damage. Double vs undead/demons.",talents:[{id:"hs_burn",name:"Holy Fire",desc:"Applies Burn to undead targets.",effect:{burnVsUndead:!0}},{id:"hs_splash",name:"Divine Splash",desc:"Small AoE splash to adjacent target.",effect:{aoe:"adjacent"}}],upgrades:[{level:5,name:"Radiant Strike",description:"Damage increases to 150% STR+INT. Applies Holy Burn to all enemy types for 2 rounds.",bonus:{damageMult:1.5,statusEffects:[{type:"holy_burn",chance:.7,duration:2}]}},{level:10,name:"Divine Judgment",description:"Damage increases to 200% STR+INT. Bonus vs undead/demons increases to 3×. Hits adjacent target.",bonus:{damageMult:2,bonusVsUndead:3,bonusVsDemon:3,aoe:"adjacent"}}]},lay_on_hands:{name:"Lay on Hands",class:"paladin",unlockLevel:5,type:"heal",target:"ally",healStat:"int",healMult:2,mpCost:20,description:"Instantly restore HP to one ally equal to 2× INT.",talents:[{id:"loh_cleanse",name:"Purify",desc:"Also removes one status effect.",effect:{cleanse:1}},{id:"loh_free",name:"Free Action",desc:"Can target self without consuming turn.",effect:{selfFree:!0}}],upgrades:[{level:10,name:"Greater Restoration",description:"Healing increases to 3× INT and removes all negative status effects from target.",bonus:{healMult:3,cleanse:"all"}},{level:15,name:"Holy Mending",description:"Healing increases to 4× INT, removes all negative effects, and grants the target a 1× INT shield for 2 rounds.",bonus:{healMult:4,cleanse:"all",shieldMult:1,shieldDur:2}}]},divine_shield:{name:"Divine Shield",class:"paladin",unlockLevel:10,type:"buff",target:"ally",effect:{shield:{conMult:3,duration:2}},mpCost:25,description:"Surround one ally with a barrier absorbing 3× CON damage for 2 rounds.",talents:[{id:"ds_reflect",name:"Holy Aegis",desc:"Reflect absorbed damage.",effect:{reflect:.3}},{id:"ds_double",name:"Twin Shield",desc:"Extend to 2 targets.",effect:{targets:2}}],upgrades:[{level:14,name:"Blessed Aegis",description:"Shield absorbs 5× CON damage, lasts 3 rounds, and reflects 20% of absorbed damage.",bonus:{shield:{conMult:5,duration:3},reflect:.2}},{level:18,name:"Fortress of Faith",description:"Shield absorbs 7× CON damage, lasts 4 rounds, reflects 40%, and extends to the entire party.",bonus:{shield:{conMult:7,duration:4},reflect:.4,target:"party"}}]},consecration:{name:"Consecration",class:"paladin",unlockLevel:15,type:"zone",target:"all_enemies",damageStat:"int",damageMult:.6,healStat:"int",healMult:.4,duration:3,mpCost:35,description:"Sanctify the ground: damages all enemies and heals party for 3 rounds.",talents:[{id:"con_slow",name:"Sacred Ground",desc:"Also slows all enemies.",effect:{slow:{duration:2}}},{id:"con_heal",name:"Holy Renewal",desc:"Increases heal amount by 50%.",effect:{healMult:.6}}],upgrades:[{level:17,name:"Holy Sanctum",description:"Damage increases to 90% INT per round, healing to 60% INT per round, duration to 4 rounds.",bonus:{damageMult:.9,healMult:.6,duration:4}},{level:20,name:"Divine Dominion",description:"Damage increases to 120% INT, healing to 80% INT, lasts 5 rounds, and applies Slow to all enemies.",bonus:{damageMult:1.2,healMult:.8,duration:5,slow:{duration:3}}}]},magic_missile:{name:"Magic Missile",class:"mage",unlockLevel:1,type:"magic",aoe:"random3",damageStat:"int",damageMult:.5,mpCost:8,description:"Launch 3 arcane bolts, each hitting a random enemy for INT damage.",talents:[{id:"mm_5bolts",name:"Missile Barrage",desc:"5 bolts instead of 3.",effect:{bolts:5}},{id:"mm_stun",name:"Concussive Bolts",desc:"Chance to Stun target.",effect:{stunChance:.2}}],upgrades:[{level:5,name:"Force Missiles",description:"Each bolt's damage increases to 75% INT and fires 4 bolts.",bonus:{damageMult:.75,bolts:4}},{level:10,name:"Arcane Fusillade",description:"Each bolt deals 100% INT damage, fires 6 bolts, and has a 25% chance to Stun each target hit.",bonus:{damageMult:1,bolts:6,statusEffects:[{type:"stun",chance:.25,duration:1}]}}]},fireball:{name:"Fireball",class:"mage",unlockLevel:5,type:"magic",aoe:"group",damageStat:"int",damageMult:1.4,statusEffects:[{type:"burn",chance:.8,duration:3}],mpCost:18,description:"Explosive fireball hitting one enemy group with fire damage and Burn.",talents:[{id:"fb_wider",name:"Inferno",desc:"Blast radius includes adjacent group.",effect:{aoe:"group2"}},{id:"fb_burn",name:"Scorching",desc:"Burn damage increased by 50%.",effect:{burnMult:1.5}}],upgrades:[{level:10,name:"Greater Fireball",description:"Damage increases to 190% INT. Burn chance rises to 100% and lasts 4 rounds.",bonus:{damageMult:1.9,statusEffects:[{type:"burn",chance:1,duration:4}]}},{level:15,name:"Conflagration",description:"Damage increases to 250% INT, hits all enemy groups, Burn lasts 5 rounds, and reduces fire resistance by 30%.",bonus:{damageMult:2.5,aoe:"all",statusEffects:[{type:"burn",chance:1,duration:5}],fireResistDebuff:.3}}]},blizzard:{name:"Blizzard",class:"mage",unlockLevel:10,type:"magic",aoe:"all",damageStat:"int",damageMult:.7,duration:3,statusEffects:[{type:"slow",chance:1,duration:2}],mpCost:30,description:"Ice storm blanketing all enemies for 3 rounds, dealing cold damage and Slow.",talents:[{id:"bz_freeze",name:"Deep Freeze",desc:"Chance to Freeze (Stun) targets.",effect:{freezeChance:.25}},{id:"bz_dmg",name:"Arctic Gale",desc:"Damage increases each round.",effect:{dmgScaling:.2}}],upgrades:[{level:14,name:"Arctic Tempest",description:"Damage increases to 100% INT per round, lasts 4 rounds, and Slow applies for 3 rounds.",bonus:{damageMult:1,duration:4,statusEffects:[{type:"slow",chance:1,duration:3}]}},{level:18,name:"Eternal Winter",description:"Damage increases to 130% INT, lasts 5 rounds, Slow upgraded to Freeze (Stun) with 40% chance each round.",bonus:{damageMult:1.3,duration:5,statusEffects:[{type:"slow",chance:1,duration:3},{type:"stun",chance:.4,duration:1}]}}]},arcane_surge:{name:"Arcane Surge",class:"mage",unlockLevel:15,type:"magic",aoe:"single_overflow",damageStat:"int",damageMult:4,mpCost:40,description:"400% INT damage to single target with overflow to adjacent enemies.",talents:[{id:"as_cd",name:"Wild Surge",desc:"Reduce mana cost by 15.",effect:{mpCost:-15}},{id:"as_pen",name:"Arcane Pierce",desc:"Ignore magic resistance.",effect:{ignoreMR:!0}}],upgrades:[{level:17,name:"Void Surge",description:"Damage increases to 550% INT. MP cost reduced by 10.",bonus:{damageMult:5.5,mpCost:-10}},{level:20,name:"Reality Shatter",description:"Damage increases to 700% INT, hits all enemies, ignores magic resistance, and reduces target INT by 30% for 2 rounds.",bonus:{damageMult:7,aoe:"all",ignoreMR:!0,intDebuff:.3,intDebuffDur:2}}]},bone_spike:{name:"Bone Spike",class:"necromancer",unlockLevel:1,type:"magic",aoe:"pierce_row",damageStat:"int",damageMult:.9,statusEffects:[{type:"bleed",chance:.5,duration:3}],mpCost:8,description:"Bone projectile dealing INT damage and applying Bleed, pierces target row.",talents:[{id:"bs_pierce",name:"Ossified Lance",desc:"Pierces entire enemy row.",effect:{aoe:"row"}},{id:"bs_extra",name:"Double Spike",desc:"Extra spike on crit.",effect:{critExtra:!0}}],upgrades:[{level:5,name:"Sharpened Spike",description:"Damage increases to 130% INT. Bleed chance rises to 80% and lasts 4 rounds.",bonus:{damageMult:1.3,statusEffects:[{type:"bleed",chance:.8,duration:4}]}},{level:10,name:"Bone Volley",description:"Fires 3 spikes at different targets, each at 110% INT with guaranteed Bleed for 4 rounds.",bonus:{damageMult:1.1,bolts:3,statusEffects:[{type:"bleed",chance:1,duration:4}]}}]},raise_dead:{name:"Raise Dead",class:"necromancer",unlockLevel:5,type:"summon",target:"corpse",summonType:"skeleton",mpCost:25,description:"Reanimate one fallen enemy corpse as a skeleton ally (fills open companion slot).",talents:[{id:"rd_hp",name:"Fortified Bones",desc:"Raised skeleton has +50% HP.",effect:{hpMult:1.5}},{id:"rd_two",name:"Army of Dead",desc:"Can raise two corpses at once.",effect:{raiseTwoCorpses:!0}}],upgrades:[{level:10,name:"Empowered Undead",description:"Raised skeleton has +75% HP and +50% damage.",bonus:{hpMult:1.75,dmgMult:1.5}},{level:15,name:"Death Knight",description:"Raises a powerful Death Knight with double HP, double damage, and a chance to apply Bleed on attack.",bonus:{hpMult:2,dmgMult:2,summonType:"death_knight",bleedChanceOnAttack:.4}}]},life_drain:{name:"Life Drain",class:"necromancer",unlockLevel:10,type:"magic",aoe:"single",damageStat:"int",damageMult:1.2,lifesteal:.5,mpCost:20,description:"Drain life from target dealing INT damage, healing Necromancer for 50%.",talents:[{id:"ld_chain",name:"Chain Drain",desc:"Also chains to a second nearby target.",effect:{chainCount:2}},{id:"ld_buff",name:"Soul Siphon",desc:"Also drains one buff from target.",effect:{drainBuff:!0}}],upgrades:[{level:14,name:"Void Drain",description:"Damage increases to 160% INT. Lifesteal increases to 70%.",bonus:{damageMult:1.6,lifesteal:.7}},{level:18,name:"Soul Harvest",description:"Damage increases to 220% INT, lifesteal 100%, chains to 2 additional targets at 60% power, and drains one buff per target.",bonus:{damageMult:2.2,lifesteal:1,chainCount:3,chainMult:.6,drainBuff:!0}}]},death_coil:{name:"Death Coil",class:"necromancer",unlockLevel:15,type:"magic",aoe:"all",damageStat:"int",damageMult:.8,statusEffects:[{type:"poison",chance:.9,duration:4},{type:"bleed",chance:.9,duration:3}],mpCost:35,description:"Necrotic wave hitting all enemies, applying both Poison and Bleed.",talents:[{id:"dc_con",name:"Withering",desc:"Lowers enemy CON saves for 2 rounds.",effect:{conDebuff:3,conDebuffDur:2}},{id:"dc_heal",name:"Feast on Death",desc:"Heals party on each kill while active.",effect:{healOnKill:.1}}],upgrades:[{level:17,name:"Plague Wave",description:"Damage increases to 120% INT. Poison lasts 6 rounds and Bleed 5 rounds. Both apply with 100% chance.",bonus:{damageMult:1.2,statusEffects:[{type:"poison",chance:1,duration:6},{type:"bleed",chance:1,duration:5}]}},{level:20,name:"Death's Embrace",description:"Damage increases to 160% INT. All DoTs double in damage. Killed enemies auto-raise as skeletons.",bonus:{damageMult:1.6,dotDmgMult:2,raiseOnKill:!0,summonType:"skeleton"}}]},flame_lance:{name:"Flame Lance",class:"pyromancer",unlockLevel:1,type:"magic",aoe:"single",damageStat:"int",damageMult:1,statusEffects:[{type:"burn",chance:.9,duration:3}],mpCost:8,description:"Fire bolt dealing INT damage and applying Burn (3-round DoT).",talents:[{id:"fl_dur",name:"Sustained Flame",desc:"Burn lasts 5 rounds.",effect:{burnDuration:5}},{id:"fl_spread",name:"Spreading Fire",desc:"Burn spreads to adjacent enemy.",effect:{burnSpread:!0}}],upgrades:[{level:5,name:"Searing Lance",description:"Damage increases to 150% INT. Burn chance becomes 100% and lasts 4 rounds.",bonus:{damageMult:1.5,statusEffects:[{type:"burn",chance:1,duration:4}]}},{level:10,name:"Infernal Beam",description:"Damage increases to 220% INT, pierces the entire enemy row, Burn guaranteed for 5 rounds.",bonus:{damageMult:2.2,aoe:"pierce_row",statusEffects:[{type:"burn",chance:1,duration:5}]}}]},ignite:{name:"Ignite",class:"pyromancer",unlockLevel:5,type:"zone",aoe:"group",damageStat:"int",damageMult:.6,duration:3,statusEffects:[{type:"burn",chance:1,duration:3,stacksEachRound:!0}],mpCost:18,description:"Set ground ablaze under one group, persisting 3 rounds with stacking Burn.",talents:[{id:"ig_spread",name:"Wildfire",desc:"Fire spreads to adjacent group.",effect:{spreadToAdjacentGroup:!0}},{id:"ig_stack",name:"Inferno Stack",desc:"Faster Burn stacking rate.",effect:{burnStackRate:1.5}}],upgrades:[{level:10,name:"Blazing Ground",description:"Damage per round increases to 90% INT, zone lasts 4 rounds, and spreads to adjacent group.",bonus:{damageMult:.9,duration:4,spreadToAdjacentGroup:!0}},{level:15,name:"Scorched Earth",description:"Damage per round increases to 130% INT, covers all enemies, lasts 5 rounds, and reduces enemy fire resistance by 40%.",bonus:{damageMult:1.3,aoe:"all",duration:5,fireResistDebuff:.4}}]},pyroclasm:{name:"Pyroclasm",class:"pyromancer",unlockLevel:10,type:"magic",aoe:"chain3",damageStat:"int",damageMult:.9,statusEffects:[{type:"burn",chance:.8,duration:3}],mpCost:25,description:"Chain fire explosion: each target triggers a secondary blast on nearest enemy, up to 3.",talents:[{id:"py_chain4",name:"Pyroclastic Wave",desc:"Chain length increases to 4.",effect:{chainCount:4}},{id:"py_scale",name:"Amplify",desc:"Each chain explosion is larger.",effect:{chainDmgScale:1.2}}],upgrades:[{level:14,name:"Volcanic Chain",description:"Damage increases to 130% INT per explosion. Chain length increases to 5. Burn guaranteed.",bonus:{damageMult:1.3,chainCount:5,statusEffects:[{type:"burn",chance:1,duration:3}]}},{level:18,name:"Cataclysm",description:"Damage increases to 180% INT, chains to all enemies, Burn lasts 5 rounds, and each explosion deals 20% more damage than the last.",bonus:{damageMult:1.8,chainCount:99,statusEffects:[{type:"burn",chance:1,duration:5}],chainDmgScale:1.2}}]},meteor:{name:"Meteor",class:"pyromancer",unlockLevel:15,type:"magic",aoe:"all",damageStat:"int",damageMult:2.5,statusEffects:[{type:"burn",chance:1,duration:5,maxStacks:!0}],mpCost:45,description:"Devastating meteor hitting all enemies with maximum Burn stacks and Ignite zones.",talents:[{id:"me_split",name:"Twin Meteor",desc:"Meteor splits into two on impact.",effect:{split:2}},{id:"me_resist",name:"Smelting Fire",desc:"Enemy fire resistance reduced 50% for 3 rounds.",effect:{fireResistDebuff:.5,duration:3}}],upgrades:[{level:17,name:"Extinction Event",description:"Damage increases to 350% INT. Burn lasts 7 rounds. Also Stuns all enemies for 1 round on impact.",bonus:{damageMult:3.5,statusEffects:[{type:"burn",chance:1,duration:7,maxStacks:!0},{type:"stun",chance:1,duration:1}]}},{level:20,name:"World Ender",description:"Damage increases to 500% INT, fires twice, Burn lasts 10 rounds with max stacks, and leaves a 3-round Ignite zone on all enemies.",bonus:{damageMult:5,split:2,statusEffects:[{type:"burn",chance:1,duration:10,maxStacks:!0}],igniteZone:{duration:3}}}]},aimed_shot:{name:"Aimed Shot",class:"ranger",unlockLevel:1,type:"ranged",aoe:"single",damageStat:"dex",damageMult:1.5,armorPen:1,mpCost:5,description:"Focused ranged attack dealing 150% DEX damage. Can pierce armor via talent.",talents:[{id:"as_pen",name:"Armor Pierce",desc:"Ignores target armor.",effect:{armorPen:1}},{id:"as_bleed",name:"Barbed Arrow",desc:"Chance to Bleed.",effect:{bleedChance:.4}}],upgrades:[{level:5,name:"Headshot",description:"Damage increases to 220% DEX. Ignores 50% of armor and applies Bleed (3 rounds) on hit.",bonus:{damageMult:2.2,armorPen:.5,statusEffects:[{type:"bleed",chance:.7,duration:3}]}},{level:10,name:"Kill Shot",description:"Damage increases to 300% DEX. Fully ignores armor. Guaranteed Bleed for 4 rounds. 30% instant kill chance vs bleeding targets.",bonus:{damageMult:3,armorPen:1,statusEffects:[{type:"bleed",chance:1,duration:4}],executeChance:.3}}]},multi_shot:{name:"Multi-Shot",class:"ranger",unlockLevel:5,type:"ranged",aoe:"multi3",damageStat:"dex",damageMult:.8,mpCost:15,description:"Fire at 3 separate targets simultaneously, each at 80% DEX damage.",talents:[{id:"ms_4",name:"Quiver Mastery",desc:"Fourth target added.",effect:{targets:4}},{id:"ms_b",name:"Bleeding Volley",desc:"Applies Bleed to all targets.",effect:{bleedChance:.5}}],upgrades:[{level:10,name:"Rapid Volley",description:"Hits 5 targets at 110% DEX each. All arrows apply Bleed (3 rounds) with 60% chance.",bonus:{targets:5,damageMult:1.1,statusEffects:[{type:"bleed",chance:.6,duration:3}]}},{level:15,name:"Arrow Storm",description:"Hits all enemies at 130% DEX each. Guaranteed Bleed for 4 rounds and reduces enemy dodge by 20% for 2 rounds.",bonus:{aoe:"all",damageMult:1.3,statusEffects:[{type:"bleed",chance:1,duration:4}],dodgeDebuff:.2,dodgeDebuffDur:2}}]},smoke_trap:{name:"Smoke Trap",class:"ranger",unlockLevel:10,type:"trap",aoe:"group",statusEffects:[{type:"blind",chance:1,duration:2}],mpCost:20,description:"Plant a trap that Blinds (−50% hit chance) one enemy group for 2 rounds.",talents:[{id:"st_slow",name:"Choking Smoke",desc:"Also applies Slow.",effect:{slow:{duration:2}}},{id:"st_2",name:"Double Trap",desc:"Place 2 traps simultaneously.",effect:{trapCount:2}}],upgrades:[{level:14,name:"Noxious Cloud",description:"Blind extends to 3 rounds, also applies Poison for 3 rounds, and covers all enemies.",bonus:{aoe:"all",statusEffects:[{type:"blind",chance:1,duration:3},{type:"poison",chance:.8,duration:3}]}},{level:18,name:"Choking Miasma",description:"Blind lasts 4 rounds on all enemies, Poison guaranteed for 5 rounds, and enemies cannot use special abilities while blinded.",bonus:{aoe:"all",statusEffects:[{type:"blind",chance:1,duration:4},{type:"poison",chance:1,duration:5}],suppressAbilities:!0}}]},rain_of_arrows:{name:"Rain of Arrows",class:"ranger",unlockLevel:15,type:"ranged",aoe:"all",damageStat:"dex",damageMult:.5,duration:3,mpCost:30,description:"Volley descending on all enemies for 3 rounds, each dealing DEX damage.",talents:[{id:"roa_bleed",name:"Serrated Arrows",desc:"Applies stacking Bleed.",effect:{bleedStack:!0}},{id:"roa_dur",name:"Endless Rain",desc:"Duration extends to 4 rounds.",effect:{duration:4}}],upgrades:[{level:17,name:"Tempest of Arrows",description:"Damage per round increases to 80% DEX, lasts 4 rounds, and applies stacking Bleed.",bonus:{damageMult:.8,duration:4,bleedStack:!0}},{level:20,name:"Eternal Barrage",description:"Damage per round increases to 120% DEX, lasts 5 rounds, guaranteed Bleed stacking, and reduces enemy armor by 30% for the duration.",bonus:{damageMult:1.2,duration:5,bleedStack:!0,armorDebuff:.3}}]},backstab:{name:"Backstab",class:"rogue",unlockLevel:1,type:"melee",aoe:"single",damageStat:"dex",damageMult:2,mpCost:5,description:"200% DEX damage. Bonus if target is Stunned or Bleeding.",talents:[],upgrades:[{level:5,name:"Vital Strike",description:"Damage increases to 280% DEX. Bonus vs Stunned/Bleeding targets increases to +80% extra damage.",bonus:{damageMult:2.8,conditionBonus:.8}},{level:10,name:"Assassinate",description:"Damage increases to 380% DEX. Bonus vs Stunned/Bleeding targets +150%. Applies Bleed on hit.",bonus:{damageMult:3.8,conditionBonus:1.5,statusEffects:[{type:"bleed",chance:.9,duration:3}]}}]},poison_blade:{name:"Poison Blade",class:"rogue",unlockLevel:5,type:"buff",aoe:"single",damageStat:"dex",damageMult:.5,mpCost:10,description:"Next 3 attacks apply Poison DoT.",talents:[],upgrades:[{level:10,name:"Venom Coating",description:"Next 5 attacks apply Poison DoT. Poison damage increased by 50%.",bonus:{attackCount:5,poisonDmgMult:1.5}},{level:15,name:"Virulent Toxin",description:"Next 7 attacks apply lethal Poison at double damage. Poison stacks up to 5 times.",bonus:{attackCount:7,poisonDmgMult:2,poisonMaxStacks:5}}]},shadow_step:{name:"Shadow Step",class:"rogue",unlockLevel:10,type:"melee",aoe:"single",damageStat:"dex",damageMult:1.5,mpCost:20,description:"Teleport behind target and attack for 150% DEX.",talents:[],upgrades:[{level:14,name:"Shadowstrike",description:"Damage increases to 220% DEX. Teleport applies Stun for 1 round. Reduces MP cost by 5.",bonus:{damageMult:2.2,statusEffects:[{type:"stun",chance:.8,duration:1}],mpCost:-5}},{level:18,name:"Phase Walk",description:"Damage increases to 300% DEX. Stun guaranteed. Can chain to a second target at 150% DEX.",bonus:{damageMult:3,statusEffects:[{type:"stun",chance:1,duration:1}],chainTarget:!0,chainMult:1.5}}]},death_mark:{name:"Death Mark",class:"rogue",unlockLevel:15,type:"debuff",aoe:"single",mpCost:25,description:"Marked target takes 50% more damage from all sources for 3 rounds.",talents:[],upgrades:[{level:17,name:"Execution Mark",description:"Marked target takes 80% more damage for 4 rounds. Mark spreads to adjacent target on death.",bonus:{dmgAmp:.8,duration:4,spreadOnDeath:!0}},{level:20,name:"Marked for Death",description:"Marked target takes 120% more damage for 5 rounds. Mark applies to 2 targets simultaneously. 25% instant kill chance on marked targets at low HP.",bonus:{dmgAmp:1.2,duration:5,targets:2,executeChance:.25}}]},heal:{name:"Heal",class:"cleric",unlockLevel:1,type:"heal",target:"ally",healStat:"int",healMult:2.5,mpCost:15,description:"Restore HP to one ally equal to 2.5× INT.",talents:[],upgrades:[{level:5,name:"Greater Heal",description:"Healing increases to 4× INT and also removes one negative status effect.",bonus:{healMult:4,cleanse:1}},{level:10,name:"Divine Renewal",description:"Healing increases to 6× INT, removes all negative effects, and grants regeneration of 1× INT per round for 3 rounds.",bonus:{healMult:6,cleanse:"all",regenMult:1,regenDur:3}}]},smite:{name:"Smite",class:"cleric",unlockLevel:5,type:"magic",aoe:"single",damageStat:"int",damageMult:1.3,mpCost:15,description:"Holy bolt, double damage vs undead/demons.",talents:[],upgrades:[{level:10,name:"Holy Bolt",description:"Damage increases to 200% INT. Triple damage vs undead/demons. Applies Holy Burn for 2 rounds.",bonus:{damageMult:2,bonusVsUndead:3,bonusVsDemon:3,statusEffects:[{type:"holy_burn",chance:.8,duration:2}]}},{level:15,name:"Wrath of the Divine",description:"Damage increases to 300% INT. 4× vs undead/demons. Hits adjacent target. Applies Holy Burn guaranteed.",bonus:{damageMult:3,bonusVsUndead:4,bonusVsDemon:4,aoe:"adjacent",statusEffects:[{type:"holy_burn",chance:1,duration:3}]}}]},sanctuary:{name:"Sanctuary",class:"cleric",unlockLevel:10,type:"buff",target:"ally",mpCost:25,description:"Ally regenerates HP each round and cannot be targeted for 3 rounds.",talents:[],upgrades:[{level:14,name:"Holy Sanctuary",description:"Regeneration increases by 50%. Duration extends to 4 rounds. Also removes all debuffs on activation.",bonus:{regenBonus:.5,duration:4,cleanseOnActivate:"all"}},{level:18,name:"Divine Refuge",description:"Regeneration doubles. Duration extends to 5 rounds. Ally reflects 30% of damage taken while active.",bonus:{regenBonus:1,duration:5,reflect:.3}}]},mass_resurrection:{name:"Mass Resurrection",class:"cleric",unlockLevel:15,type:"passive",mpCost:0,description:"40% chance to auto-revive fallen allies at 30% HP when party wipes.",talents:[],upgrades:[{level:17,name:"Greater Resurrection",description:"Auto-revive chance increases to 65%. Revived allies return with 50% HP.",bonus:{reviveChance:.65,reviveHp:.5}},{level:20,name:"Miracle",description:"Auto-revive chance increases to 90%. Revived allies return with 75% HP and are granted a 2-round shield.",bonus:{reviveChance:.9,reviveHp:.75,reviveShieldDur:2}}]},inspiring_tune:{name:"Inspiring Tune",class:"bard",unlockLevel:1,type:"buff",target:"party",mpCost:10,description:"+15% hit and +1 initiative for party for 3 rounds.",talents:[],upgrades:[{level:5,name:"Battle Anthem",description:"+25% hit and +2 initiative for party for 4 rounds. Also grants +15% damage.",bonus:{hitBonus:.25,initiative:2,dmgBuff:.15,duration:4}},{level:10,name:"War Hymn",description:"+40% hit, +3 initiative, +25% damage for party for 5 rounds. Also grants +20% dodge.",bonus:{hitBonus:.4,initiative:3,dmgBuff:.25,dodgeBonus:.2,duration:5}}]},discordant_wail:{name:"Discordant Wail",class:"bard",unlockLevel:5,type:"debuff",aoe:"group",mpCost:15,description:"−30% damage and erratic targeting for one enemy group.",talents:[],upgrades:[{level:10,name:"Cacophony",description:"−50% damage and erratic targeting for one enemy group, lasting 4 rounds. Enemies have 25% chance to skip their turn.",bonus:{dmgDebuff:.5,duration:4,skipTurnChance:.25}},{level:15,name:"Maddening Discord",description:"−70% damage on all enemies, 40% chance to skip turn each round, and enemies may attack each other for 4 rounds.",bonus:{aoe:"all",dmgDebuff:.7,skipTurnChance:.4,confuse:{chance:.3,duration:2},duration:4}}]},ballad_of_valor:{name:"Ballad of Valor",class:"bard",unlockLevel:10,type:"buff",target:"ally",mpCost:25,description:"One hero gets double actions for 1 round.",talents:[],upgrades:[{level:14,name:"Epic Ballad",description:"One hero gets double actions for 2 rounds and +30% damage during that time.",bonus:{duration:2,dmgBuff:.3}},{level:18,name:"Legendary Verse",description:"Two heroes get double actions for 2 rounds with +50% damage and +25% dodge.",bonus:{targets:2,duration:2,dmgBuff:.5,dodgeBonus:.25}}]},song_of_ruin:{name:"Song of Ruin",class:"bard",unlockLevel:15,type:"magic",aoe:"all",mpCost:35,description:"Sonic damage to all enemies, removes all their buffs.",talents:[],upgrades:[{level:17,name:"Requiem",description:"Damage increases by 50%. Removes all buffs and applies Slow to all enemies for 2 rounds.",bonus:{damageMult:1.5,slow:{chance:1,duration:2}}},{level:20,name:"Dirge of Annihilation",description:"Damage doubles. Removes all buffs, stuns all enemies for 1 round, and applies Bleed for 3 rounds.",bonus:{damageMult:2,statusEffects:[{type:"stun",chance:1,duration:1},{type:"bleed",chance:1,duration:3}]}}]},corruption:{name:"Corruption",class:"warlock",unlockLevel:1,type:"magic",aoe:"single",damageStat:"int",damageMult:.6,mpCost:8,description:"Target takes INT damage per round for 4 rounds; spreads on death.",talents:[],upgrades:[{level:5,name:"Festering Corruption",description:"DoT damage increases to 90% INT per round. Duration extends to 6 rounds. Spreads to 2 targets on death.",bonus:{damageMult:.9,duration:6,spreadCount:2}},{level:10,name:"Void Corruption",description:"DoT damage increases to 130% INT per round, lasts 8 rounds, spreads to all nearby on death, and reduces target healing by 50%.",bonus:{damageMult:1.3,duration:8,spreadCount:99,healingReduction:.5}}]},hellfire:{name:"Hellfire",class:"warlock",unlockLevel:5,type:"magic",aoe:"group",damageStat:"int",damageMult:1.3,mpCost:18,description:"Hellfire hits enemy group, applies Burn. Bypasses fire resistance.",talents:[],upgrades:[{level:10,name:"Infernal Hellfire",description:"Damage increases to 190% INT. Hits all enemies. Burn deals 50% more damage.",bonus:{damageMult:1.9,aoe:"all",burnDmgMult:1.5}},{level:15,name:"Demonfire",description:"Damage increases to 260% INT. All enemies. Burn deals double damage. Also applies a Curse reducing enemy damage by 30% for 3 rounds.",bonus:{damageMult:2.6,aoe:"all",burnDmgMult:2,dmgCurse:.3,curseDur:3}}]},soul_pact:{name:"Soul Pact",class:"warlock",unlockLevel:10,type:"buff",target:"self",mpCost:0,description:"Sacrifice 20% own HP to double all active DoT duration and damage.",talents:[],upgrades:[{level:14,name:"Blood Covenant",description:"HP sacrifice reduced to 10%. DoT duration and damage triple instead of double.",bonus:{hpSacrifice:.1,dotDurationMult:3,dotDmgMult:3}},{level:18,name:"Abyssal Pact",description:"No HP cost. All DoTs quadruple in damage and duration. Also adds a new stack of Corruption to each afflicted enemy.",bonus:{hpSacrifice:0,dotDurationMult:4,dotDmgMult:4,addCorruptionStack:!0}}]},void_rift:{name:"Void Rift",class:"warlock",unlockLevel:15,type:"zone",aoe:"all",damageStat:"int",damageMult:.7,duration:3,mpCost:35,description:"Void rift under enemies for 3 rounds: damage + 20% stun chance each round.",talents:[],upgrades:[{level:17,name:"Dimensional Rift",description:"Damage increases to 110% INT per round. Lasts 4 rounds. Stun chance increases to 35%.",bonus:{damageMult:1.1,duration:4,stunChance:.35}},{level:20,name:"Tear in Reality",description:"Damage increases to 160% INT per round, lasts 5 rounds, 50% stun chance, and pulls all enemies into a single group.",bonus:{damageMult:1.6,duration:5,stunChance:.5,pullToGroup:!0}}]},demon_bolt:{name:"Demon Bolt",class:"demon_hunter",unlockLevel:1,type:"ranged",aoe:"single",damageStat:"dex_int",damageMult:1,bonusVsDemon:1.5,mpCost:8,description:"+50% vs demons. DEX+INT damage.",talents:[],upgrades:[{level:5,name:"Fel Bolt",description:"Damage increases to 150% DEX+INT. Bonus vs demons increases to +100%. Applies Burn for 2 rounds.",bonus:{damageMult:1.5,bonusVsDemon:2,statusEffects:[{type:"burn",chance:.8,duration:2}]}},{level:10,name:"Void Bolt",description:"Damage increases to 220% DEX+INT. +150% vs demons. Guaranteed Burn 3 rounds. Reduces target magic resistance by 25% for 2 rounds.",bonus:{damageMult:2.2,bonusVsDemon:2.5,statusEffects:[{type:"burn",chance:1,duration:3}],mrDebuff:.25,mrDebuffDur:2}}]},glaive_toss:{name:"Glaive Toss",class:"demon_hunter",unlockLevel:5,type:"ranged",aoe:"row",damageStat:"dex",damageMult:.9,mpCost:15,description:"Spinning glaive hits all enemies in a row, applying Bleed.",talents:[],upgrades:[{level:10,name:"Serrated Glaive",description:"Damage increases to 130% DEX. Glaive bounces back hitting the row twice. Bleed duration increases to 4 rounds.",bonus:{damageMult:1.3,hits:2,statusEffects:[{type:"bleed",chance:1,duration:4}]}},{level:15,name:"Twin Glaives",description:"Fires two glaives simultaneously at 160% DEX each, covering two rows. Bleed guaranteed for 5 rounds.",bonus:{damageMult:1.6,glaiveCount:2,aoe:"row2",statusEffects:[{type:"bleed",chance:1,duration:5}]}}]},fel_sight:{name:"Fel Sight",class:"demon_hunter",unlockLevel:10,type:"buff",target:"self",mpCost:20,description:"+25% hit/dodge, immune to Blind/Confuse for 3 rounds.",talents:[],upgrades:[{level:14,name:"True Sight",description:"+40% hit/dodge, immune to all negative vision effects, lasts 4 rounds. Also grants +20% damage.",bonus:{hitBonus:.4,dodgeBonus:.4,dmgBuff:.2,duration:4,immuneBlind:!0,immuneConfuse:!0}},{level:18,name:"Demonic Vision",description:"+60% hit/dodge, +35% damage, immune to Blind/Confuse/Stun, lasts 5 rounds. Attacks reveal hidden weaknesses reducing enemy armor by 20%.",bonus:{hitBonus:.6,dodgeBonus:.6,dmgBuff:.35,duration:5,immuneBlind:!0,immuneConfuse:!0,immuneStun:!0,armorDebuffOnHit:.2}}]},vengeance:{name:"Vengeance",class:"demon_hunter",unlockLevel:15,type:"melee",aoe:"single",damageStat:"dex",damageMult:1,stackBonusPerDeath:.15,mpCost:20,description:"Stacks 15% damage per fallen ally. Release all stacks in one strike.",talents:[],upgrades:[{level:17,name:"Burning Vengeance",description:"Stack bonus increases to 25% per fallen ally. Strike also applies Burn for 3 rounds and stuns for 1 round.",bonus:{stackBonusPerDeath:.25,statusEffects:[{type:"burn",chance:1,duration:3},{type:"stun",chance:.7,duration:1}]}},{level:20,name:"Absolute Vengeance",description:"Stack bonus increases to 40% per fallen ally. Strike hits all enemies. Applies Burn, Bleed, and Stun. Stacks are never lost between battles.",bonus:{stackBonusPerDeath:.4,aoe:"all",statusEffects:[{type:"burn",chance:1,duration:4},{type:"bleed",chance:1,duration:4},{type:"stun",chance:.8,duration:1}],persistStacks:!0}}]},scrounge:{name:"Scrounge",class:"scavenger",unlockLevel:1,type:"utility",mpCost:0,description:"60% chance to find a consumable item mid-combat.",talents:[],upgrades:[{level:5,name:"Expert Scrounge",description:"Find chance increases to 85%. Can find two items simultaneously with 40% chance.",bonus:{findChance:.85,doubleFind:.4}},{level:10,name:"Treasure Hunter",description:"Guaranteed to find an item. 50% chance the item is Uncommon or better. 20% chance to find equipment.",bonus:{findChance:1,rarityBonus:.5,equipmentChance:.2}}]},thrown_junk:{name:"Thrown Junk",class:"scavenger",unlockLevel:5,type:"ranged",aoe:"group",damageStat:"dex",damageMult:.7,mpCost:5,description:"Hurl debris at an enemy group; 30% stun chance.",talents:[],upgrades:[{level:10,name:"Barrage of Debris",description:"Damage increases to 110% DEX hitting all enemies. Stun chance rises to 50%.",bonus:{damageMult:1.1,aoe:"all",statusEffects:[{type:"stun",chance:.5,duration:1}]}},{level:15,name:"Junk Avalanche",description:"Damage increases to 160% DEX on all enemies. 70% stun chance. Also applies Bleed for 2 rounds.",bonus:{damageMult:1.6,aoe:"all",statusEffects:[{type:"stun",chance:.7,duration:1},{type:"bleed",chance:.6,duration:2}]}}]},makeshift_bomb:{name:"Makeshift Bomb",class:"scavenger",unlockLevel:10,type:"ranged",aoe:"group",damageStat:"dex_con",damageMult:1,mpCost:15,description:"Improvised explosive: DEX+CON damage with Burn to a group.",talents:[],upgrades:[{level:14,name:"Improved Explosive",description:"Damage increases to 150% DEX+CON, hits all enemies, Burn duration increases to 4 rounds.",bonus:{damageMult:1.5,aoe:"all",statusEffects:[{type:"burn",chance:1,duration:4}]}},{level:18,name:"Doomsday Device",description:"Damage increases to 220% DEX+CON on all enemies. Burn guaranteed for 5 rounds. Also applies Poison for 3 rounds.",bonus:{damageMult:2.2,aoe:"all",statusEffects:[{type:"burn",chance:1,duration:5},{type:"poison",chance:.8,duration:3}]}}]},jackpot:{name:"Jackpot",class:"scavenger",unlockLevel:15,type:"passive",mpCost:0,description:"20% chance to instantly loot a Magic+ item from each kill.",talents:[],upgrades:[{level:17,name:"Lucky Strike",description:"Loot chance increases to 35%. 15% chance the item is Rare or better.",bonus:{lootChance:.35,rareChance:.15}},{level:20,name:"Windfall",description:"Loot chance increases to 50%. 30% chance for Rare+. 10% chance to loot a unique piece of equipment.",bonus:{lootChance:.5,rareChance:.3,uniqueChance:.1}}]},riposte:{name:"Riposte",class:"swashbuckler",unlockLevel:1,type:"counter",mpCost:0,description:"Enter parry stance: counter next melee hit for 200% DEX damage.",talents:[],upgrades:[{level:5,name:"Perfect Riposte",description:"Counter damage increases to 300% DEX. Parry stance blocks 2 hits.",bonus:{damageMult:3,parryCount:2}},{level:10,name:"Grand Riposte",description:"Counter damage increases to 450% DEX. Blocks 3 hits. Each counter stuns attacker for 1 round.",bonus:{damageMult:4.5,parryCount:3,statusEffects:[{type:"stun",chance:.9,duration:1}]}}]},flourish:{name:"Flourish",class:"swashbuckler",unlockLevel:5,type:"melee",aoe:"single",damageStat:"dex",damageMult:1,buildsFlairStacks:3,mpCost:8,description:"3 rapid strikes, each building Flair stacks for Grandeur.",talents:[],upgrades:[{level:10,name:"Dazzling Flourish",description:"Strikes increase to 5 and each deals 120% DEX. Builds 5 Flair stacks. Applies Bleed on each hit.",bonus:{strikeCount:5,damageMult:1.2,buildsFlairStacks:5,statusEffects:[{type:"bleed",chance:.5,duration:2}]}},{level:15,name:"Blinding Flourish",description:"Strikes increase to 7 at 150% DEX each. Builds 7 Flair stacks. Applies Bleed and Stun chance on each hit.",bonus:{strikeCount:7,damageMult:1.5,buildsFlairStacks:7,statusEffects:[{type:"bleed",chance:.7,duration:3},{type:"stun",chance:.25,duration:1}]}}]},taunt:{name:"Taunt",class:"swashbuckler",unlockLevel:10,type:"buff",target:"enemy",mpCost:15,description:"Force one enemy to target only you for 2 rounds; +30% dodge vs them.",talents:[],upgrades:[{level:14,name:"Mocking Taunt",description:"Taunts 2 enemies for 3 rounds. Dodge bonus increases to 50% vs taunted enemies. Also reduces their attack by 20%.",bonus:{targets:2,duration:3,dodgeBonus:.5,atkDebuff:.2}},{level:18,name:"Grand Mockery",description:"Taunts all enemies for 3 rounds. Dodge bonus 70% vs all taunted. Taunted enemies deal 30% less damage.",bonus:{aoe:"all",duration:3,dodgeBonus:.7,dmgDebuff:.3}}]},grandeur:{name:"Grandeur",class:"swashbuckler",unlockLevel:15,type:"melee",aoe:"single",damageStat:"dex",consumesFlairStacks:!0,mpCost:0,description:"Consume all Flair stacks for DEX × stacks damage + random debuffs per stack.",talents:[],upgrades:[{level:17,name:"Spectacular Grandeur",description:"Damage per stack increases by 50%. Hits adjacent target at 75% power. Each stack applies a guaranteed debuff.",bonus:{stackDmgMult:1.5,aoe:"adjacent",guaranteedDebuffPerStack:!0}},{level:20,name:"Legendary Grandeur",description:"Damage per stack doubles. Hits all enemies at 80% power. Minimum 3 guaranteed debuffs regardless of stacks. Cannot miss.",bonus:{stackDmgMult:2,aoe:"all",aoeReduction:.8,minDebuffs:3,neverMiss:!0}}]},dragon_claw:{name:"Dragon Claw",class:"dragon_knight",unlockLevel:1,type:"melee",aoe:"adjacent",damageStat:"str_dex",damageMult:1.1,armorPen:.2,mpCost:0,description:"Savage strike ignoring 20% armor; hits adjacent enemies.",talents:[],upgrades:[{level:5,name:"Rending Claw",description:"Damage increases to 160% STR+DEX. Armor penetration increases to 40%. Applies Bleed for 3 rounds.",bonus:{damageMult:1.6,armorPen:.4,statusEffects:[{type:"bleed",chance:.8,duration:3}]}},{level:10,name:"Dragon's Fury",description:"Damage increases to 220% STR+DEX. Ignores 60% armor. Hits all enemies in row. Guaranteed Bleed for 4 rounds.",bonus:{damageMult:2.2,armorPen:.6,aoe:"row",statusEffects:[{type:"bleed",chance:1,duration:4}]}}]},breath_weapon:{name:"Breath Weapon",class:"dragon_knight",unlockLevel:5,type:"magic",aoe:"group",damageStat:"str_int",damageMult:1.3,mpCost:20,description:"Cone of fire/ice/lightning hitting one group. Choose element at class creation.",talents:[],upgrades:[{level:10,name:"Devastating Breath",description:"Damage increases to 190% STR+INT. Covers two enemy groups. Element-specific status effect chance doubles.",bonus:{damageMult:1.9,aoe:"group2",elementStatusMult:2}},{level:15,name:"Cataclysmic Breath",description:"Damage increases to 270% STR+INT. Hits all enemies. Element-specific effect guaranteed. MP cost reduced by 8.",bonus:{damageMult:2.7,aoe:"all",elementStatusGuaranteed:!0,mpCost:-8}}]},dragon_scales:{name:"Dragon Scales",class:"dragon_knight",unlockLevel:10,type:"buff",target:"self",mpCost:20,description:"30% damage reduction + element immunity for 3 rounds.",talents:[],upgrades:[{level:14,name:"Hardened Scales",description:"Damage reduction increases to 50%. Duration extends to 4 rounds. Also reflects 20% of physical damage.",bonus:{dmgReduct:.5,duration:4,reflect:.2}},{level:18,name:"Draconic Aegis",description:"Damage reduction increases to 70%. Duration extends to 5 rounds. Reflects 35% of all damage. Extends element immunity to the entire party.",bonus:{dmgReduct:.7,duration:5,reflect:.35,elementImmunityParty:!0}}]},draconic_fury:{name:"Draconic Fury",class:"dragon_knight",unlockLevel:15,type:"buff",target:"self",mpCost:35,description:"All attacks become group AoE, +50% damage for 2 rounds. Cannot be Stunned.",talents:[],upgrades:[{level:17,name:"Primal Fury",description:"+80% damage and all attacks become group AoE for 3 rounds. Immune to Stun and Slow.",bonus:{dmgBuff:.8,duration:3,immuneStun:!0,immuneSlow:!0}},{level:20,name:"Ascended Dragon",description:"+120% damage and all attacks hit all enemies for 4 rounds. Immune to all crowd control. Breath Weapon MP cost reduced to 0.",bonus:{dmgBuff:1.2,aoe:"all",duration:4,immuneCC:!0,breathWeaponFree:!0}}]}};function xe(n){return Object.values(we).filter(e=>e.class===n).sort((e,t)=>e.unlockLevel-t.unlockLevel)}function ke(n,e){return xe(n).filter(t=>t.unlockLevel<=e)}const tt=.5,at=.18,F={warrior:"warrior",mage:"mage",paladin:"paladin",ranger:"ranger",rogue:"rogue",cleric:"cleric",bard:"bard",necromancer:"necromancer",warlock:"warlock",demon_hunter:"demon_hunter",scavenger:"scavenger",swashbuckler:"swashbuckler",dragon_knight:"dragon_knight",pyromancer:"pyromancer",goblin_scout:"goblin_scout",goblin_warrior:"goblin_warrior",goblin_shaman:"goblin_shaman",goblin_warlord:"goblin_warlord",imp:"imp",hell_knight:"hell_knight",molten_golem:"molten_golem",corrupted_wolf:"corrupted_wolf",void_shade:"void_shade",ash_wraith:"ash_wraith",corrupted_bear:"corrupted_bear",demon_brute:"demon_brute",cinder_hound:"cinder_hound",veil_cultist:"veil_cultist",bandit:"bandit",grax_veil_touched:"grax_veil_touched",lava_titan:"lava_titan"},j={};function pe(n){if(j[n])return j[n];const e={};for(const t of["south","east","north","west"]){const a=new Image;a.src=`/RSG-Demos/game13/images/sprites/${n}_${t}.png`,e[t]=a}return j[n]=e,e}class O{constructor(e,t,a,o){this.manager=e,this.audio=t,this.encounter=o,this._el=null,this._t=0,this._turnTimer=0,this._phase="START",this._startDelay=1.2,this._preloadSprites(o),this._particles=[],this._dmgNumbers=[],this._flashMap=new Map,this._round=1,this._log=[],this._lootItems=[];const s=u.get();this._heroes=s.party.map(r=>this._memberToCombatant(r)),this._companions=s.companions.map(r=>this._memberToCombatant(r)),this._allies=[...this._heroes,...this._companions],this._enemyGroups=o.enemies.map((r,i)=>this._buildGroup(r,i)),this._allEnemies=this._enemyGroups.flat(),this._buildTurnOrder()}_memberToCombatant(e){const t=e.attrs||{STR:8,DEX:8,INT:8,CON:10},a=e.equipment||{};let o=0,s=0;for(const r of Object.values(a))r!=null&&r.armor&&(o+=r.armor),r!=null&&r.dmg&&(s+=Math.floor((r.dmg[0]+r.dmg[1])/2*.3));return{id:e.id,name:e.name,class:e.class,className:e.className,isHero:!0,hp:e.hp??50+t.CON*10,maxHp:e.maxHp??50+t.CON*10,mp:e.mp??30+t.INT*8,maxMp:e.maxMp??30+t.INT*8,dmg:[Math.max(1,Math.round(t.STR*.8+s)),Math.max(3,Math.round(t.STR*2+s*1.5))],armor:o,hit:Math.min(95,70+Math.round(t.DEX*1.2)),dodge:Math.min(40,5+Math.round(t.DEX*.8)),initiative:t.DEX+(e.level||1),alive:(e.hp??1)>0,stance:"ready",statuses:[],skillCooldown:0,x:0,y:0,offsetX:0,offsetY:0}}_buildGroup(e,t){const a=u.getNgPlus(),o=a>0?1+a*.35:1,s=Math.round(e.hp*o),r=e.dmg.map(d=>Math.round(d*o)),i=Math.round(e.armor*(1+a*.15)),l=a>0?Math.round(e.xpValue*.5*a):0;return Array.from({length:e.count},(d,h)=>({id:`${e.id}_${t}_${h}`,name:a>0?`${e.name} ✦`:e.name,enemyId:e.id,groupIdx:t,isHero:!1,hp:s,maxHp:s,dmg:r,armor:i,hit:Math.min(95,e.hit+a*3),dodge:Math.min(45,e.dodge+a*2),initiative:4+Math.random()*6,xpValue:e.xpValue+l,gold:e.gold,alive:!0,stance:"ready",statuses:[],skillCooldown:0,x:0,y:0,offsetX:0,offsetY:0}))}_buildTurnOrder(){const e=[...this._allies,...this._allEnemies].filter(t=>t.alive);e.forEach(t=>{t._roll=t.initiative+Math.random()*10}),e.sort((t,a)=>a._roll-t._roll),this._turnOrder=e,this._turnIdx=0}onEnter(){this.audio.playCombatMusic(this.encounter._zoneId),this._build()}_build(){I("combat-styles",ot),this._el=S("div","combat-screen"),this._el.innerHTML=`
      <div class="cbt-log-panel"><div class="cbt-log-title">Combat</div><div class="cbt-log-entries" id="cbt-log"></div></div>
      <div class="cbt-hud" id="cbt-hud"></div>
    `,this.manager.uiOverlay.appendChild(this._el),this._fastMode=!1,this._renderHud(),this._speedMult=1,this._el.addEventListener("click",e=>{if(e.target.closest("#hud-speed")&&!this._pauseEl){this._speedMult=this._speedMult===1?2:this._speedMult===2?4:1,this._fastMode=this._speedMult>1;const t=this._el.querySelector("#hud-speed");t&&(t.textContent=`⚡ ${this._speedMult}×`),this.audio.playSfx("click")}}),this._pauseEl=null}_renderHud(){var a;const e=this._el.querySelector("#cbt-hud"),t=[...this._heroes,...this._companions];e.innerHTML=`
      <div class="hud-members">
        ${t.map(o=>`
          <div class="hm" id="hm-${o.id}">
            <div class="hm-top"><span class="hm-name">${o.name}</span><span class="hm-vals" id="hv-${o.id}">${o.hp}/${o.maxHp}</span></div>
            <div class="hm-bars">
              <div class="hm-bar-t"><div class="hm-bar hp-bar" id="hp-${o.id}" style="width:100%"></div></div>
              <div class="hm-bar-t mp-t"><div class="hm-bar mp-bar" id="mp-${o.id}" style="width:100%"></div></div>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="hud-right">
        <div class="hud-round">R<span id="hud-round">${this._round}</span></div>
        <div class="hud-controls">
          <button class="hud-speed-btn" id="hud-speed" title="Cycle speed: 1× → 2× → 4×">⚡${this._speedMult||1}×</button>
          <button class="hud-pause-btn" id="hud-pause" title="Pause"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="4" height="12" rx="1"/><rect x="8" y="1" width="4" height="12" rx="1"/></svg></button>
        </div>
      </div>
    `,(a=this._el.querySelector("#hud-pause"))==null||a.addEventListener("click",()=>{this.audio.playSfx("click"),this._openPauseMenu()})}_fleeChance(){const e=this._allies.filter(s=>s.alive),t=e.reduce((s,r)=>s+(r.initiative||8),0)/Math.max(1,e.length),a=this._allEnemies.filter(s=>s.alive).length,o=Math.max(.1,Math.min(.75,t/(t+a*5)));return Math.round(o*100)}_openPauseMenu(){if(this._pauseEl)return;const e=this._speedMult;this._speedMult=0;const t=this._fleeChance(),a=!!this.encounter._bossNodeId,s=u.get().potions||[];this._pauseEl=S("div","cbt-pause-overlay"),this._pauseEl.innerHTML=`
      <div class="cpo-box">
        <div class="cpo-title">Paused</div>
        ${s.length>0?`
          <div class="cpo-potions-title">Use Potion</div>
          <div class="cpo-potions" id="cpo-potions">
            ${s.map(i=>`
              <button class="cpo-potion-btn" data-pot-uid="${i.uid}">
                ${i.icon||"🧪"} ${i.name}
              </button>
            `).join("")}
          </div>
          ${s.find(i=>i.target==="single")?`
            <div class="cpo-target-label">Target ally:</div>
            <div class="cpo-targets" id="cpo-targets">
              ${this._allies.filter(i=>i.alive||!0).map(i=>`
                <button class="cpo-target-btn${i.alive?"":" cpo-dead"}" data-ally-id="${i.id}">${i.name}${i.alive?"":" ✝"} (${Math.max(0,i.hp)}/${i.maxHp})</button>
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
    `;let r=null;this._pauseEl.querySelectorAll(".cpo-potion-btn").forEach(i=>{i.addEventListener("click",()=>{this._pauseEl.querySelectorAll(".cpo-potion-btn").forEach(d=>d.classList.remove("selected")),i.classList.add("selected"),r=i.dataset.potUid;const l=s.find(d=>d.uid===r);l&&l.target==="group"&&(this._usePotionOnTargets(l,this._allies.filter(d=>d.alive)),this._closePauseMenu(e))})}),this._pauseEl.querySelectorAll(".cpo-target-btn").forEach(i=>{i.addEventListener("click",()=>{var h;if(!r)return;const l=s.find(c=>c.uid===r);if(!l)return;const d=[...this._allies].find(c=>c.id===i.dataset.allyId);d&&(((h=l.effect)==null?void 0:h.type)!=="revive"&&!d.alive||(this._usePotionOnTargets(l,[d]),this._closePauseMenu(e)))})}),this._pauseEl.querySelector("#cpo-resume").addEventListener("click",()=>{this.audio.playSfx("click"),this._closePauseMenu(e)}),this._pauseEl.querySelector("#cpo-flee").addEventListener("click",()=>{a||(this.audio.playSfx("click"),this._closePauseMenu(1),this._attemptFlee(t))}),this._pauseEl.querySelector("#cpo-surrender").addEventListener("click",()=>{this.audio.playSfx("click"),this._closePauseMenu(1),this._defeat()}),this._el.appendChild(this._pauseEl)}_usePotionOnTargets(e,t){this.audio.playSfx("shrine");const a=u.get(),o=et(e,t),s=(a.potions||[]).findIndex(r=>r.uid===e.uid);s>=0&&a.potions.splice(s,1),this._log_(`Used ${e.name}: ${o}`,"hero"),this._updateHud(),this._checkCombatEnd(),this._heroes.forEach((r,i)=>{a.party[i]&&(a.party[i].hp=r.hp)})}_closePauseMenu(e){var a;w(this._pauseEl),this._pauseEl=null,this._speedMult=e||1,this._fastMode=this._speedMult>1;const t=(a=this._el)==null?void 0:a.querySelector("#hud-speed");t&&(t.textContent=`⚡ ${this._speedMult}×`)}_attemptFlee(e){if(Math.random()*100<e)this._log_("Your party escapes!","hero"),this._phase="FLEE",setTimeout(()=>this.manager.pop(),600);else{this._log_("Flee failed! The enemy strikes!","enemy");const a=this._allies.filter(s=>s.alive),o=this._allEnemies.find(s=>s.alive);if(a.length&&o){const s=a[Math.floor(Math.random()*a.length)],r=Math.max(1,o.dmg[0]+Math.floor(Math.random()*(o.dmg[1]-o.dmg[0]+1))-s.armor);this._applyDamage(o,s,r,"#c04030"),this._updateHud(),this._checkCombatEnd()}}}_updateHud(){var a,o,s,r;const e=[...this._heroes,...this._companions];for(const i of e){const l=(a=this._el)==null?void 0:a.querySelector(`#hp-${i.id}`),d=(o=this._el)==null?void 0:o.querySelector(`#mp-${i.id}`),h=(s=this._el)==null?void 0:s.querySelector(`#hv-${i.id}`);l&&(l.style.width=`${Math.max(0,i.hp/i.maxHp*100)}%`),d&&(d.style.width=`${Math.max(0,i.mp/i.maxMp*100)}%`),h&&(h.textContent=`${Math.max(0,i.hp)}/${i.maxHp}`)}const t=(r=this._el)==null?void 0:r.querySelector("#hud-round");t&&(t.textContent=this._round)}_log_(e,t="normal"){var s;this._log.push({msg:e,type:t});const a=(s=this._el)==null?void 0:s.querySelector("#cbt-log");if(!a)return;const o=S("div",`cbt-entry cbt-${t}`);for(o.textContent=e,a.appendChild(o);a.children.length>10;)a.removeChild(a.firstChild);a.scrollTop=a.scrollHeight}update(e){this._t+=e,this._particles=this._particles.filter(t=>(t.life-=e,t.x+=t.vx,t.y+=t.vy,t.vy+=50*e,t.life>0)),this._dmgNumbers=this._dmgNumbers.filter(t=>(t.life-=e,t.y-=38*e,t.life>0));for(const[t,a]of this._flashMap){const o=a-e;o<=0?this._flashMap.delete(t):this._flashMap.set(t,o)}if(this._phase==="START"){this._t>=this._startDelay&&(this._phase="PLAYING",this._t=0,this._log_(`⚔ ${this.encounter.name}`,"round"));return}this._phase==="PLAYING"&&this._speedMult!==0&&(this._turnTimer+=e*(this._speedMult||1),!(this._turnTimer<tt)&&(this._turnTimer=0,this._executeTurn()))}_executeTurn(){var a;if(this._turnIdx>=this._turnOrder.length){this._round++,this._processStatusEffects(),this._buildTurnOrder(),this._log_(`── Round ${this._round} ──`,"round");return}const e=this._turnOrder[this._turnIdx++];if(!e.alive)return;if((a=e.statuses)==null?void 0:a.find(o=>o.type==="stun")){this._log_(`${e.name} is stunned and cannot act!`,"miss");return}e.skillCooldown>0&&e.skillCooldown--,e.isHero?this._heroAI(e):this._enemyAI(e),this._checkCombatEnd()}_heroAI(e){const t=u.get(),a=[...t.party,...t.companions].find(m=>m.id===e.id),o=(a==null?void 0:a.class)||e.class,s=(a==null?void 0:a.level)||1,r=(a==null?void 0:a.personality)||"neutral",i=this._allEnemies.filter(m=>m.alive),l=this._allies.filter(m=>m.alive);if(!i.length)return;const h=ke(o,s).filter(m=>m.type!=="passive").filter(m=>e.skillCooldown===0&&(m.mpCost||0)<=e.mp);let c=!1;if(h.length){let m=null;const p=h.filter(f=>f.type==="heal").sort((f,T)=>(T.mpCost||0)-(f.mpCost||0))[0],y=l.find(f=>f.hp/f.maxHp<.5),g=l.find(f=>f.hp/f.maxHp<.25),_=l.find(f=>f.hp/f.maxHp<.8);(r==="protective"||o==="cleric"||o==="druid"||o==="priest")&&p&&_||p&&g||r==="protective"&&p&&_?m=p:r==="aggressive"?(i.length>=3&&(m=h.find(f=>f.aoe==="all"||f.aoe==="group")),m||(m=h.filter(f=>f.type==="melee"||f.type==="magic").sort((f,T)=>(T.mpCost||0)-(f.mpCost||0))[0])):r==="opportunist"?m=h.filter(f=>f.type==="melee"||f.type==="magic").sort((f,T)=>(T.mpCost||0)-(f.mpCost||0))[0]:(p&&y&&(m=p),!m&&i.length>=3&&(m=h.find(f=>f.aoe==="all"||f.aoe==="group"||f.aoe==="row")),m||(m=h.filter(f=>f.type==="melee"||f.type==="magic").sort((f,T)=>(T.mpCost||0)-(f.mpCost||0))[0]),m||(m=h[0])),m&&(c=!0,e.mp-=m.mpCost||0,e.skillCooldown=2,this._executeSkill(e,m,i,l,a))}c||this._basicAttack(e,i,!0),this._updateHud()}_enemyAI(e){const t=this._allies.filter(a=>a.alive);t.length&&this._basicAttack(e,t,!1)}_basicAttack(e,t,a){t.sort((l,d)=>l.hp-d.hp);const o=t[0],s=Math.max(5,Math.min(95,e.hit-o.dodge));if(Math.random()*100>=s){this._log_(`${e.name} misses ${o.name}.`,"miss"),e.stance="attack",setTimeout(()=>{e.stance="ready"},300);return}const r=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),i=Math.max(Math.ceil(r*.15),r-o.armor);this._applyDamage(e,o,i,a?"#ff8060":"#e8a020"),this._log_(`${e.name} → ${o.name}: ${i}`,a?"hero":"enemy"),e.stance="attack",setTimeout(()=>{e.stance="ready"},300),this._updateHud()}_executeSkill(e,t,a,o,s){var p,y,g,_;e.stance="spell",setTimeout(()=>{e.stance="ready"},400),this.audio.playSfx("spell");const r=(s==null?void 0:s.attrs)||{STR:8,DEX:8,INT:8,CON:8};if(t.type==="heal"){const b=[...o].sort((T,E)=>T.hp/T.maxHp-E.hp/E.maxHp)[0];if(!b)return;const f=Math.round((t.healMult||1.5)*(r.INT||8));b.hp=Math.min(b.maxHp,b.hp+f),this._spawnDmgNumber(b.x,b.y-50,`+${f}`,"#60e880"),this._log_(`${e.name} uses ${t.name}: heals ${b.name} for ${f}`,"hero");return}if(t.type==="buff"){this._log_(`${e.name} uses ${t.name}!`,"hero"),(p=t.effect)!=null&&p.dmgBuff&&t.target==="party"&&o.forEach(b=>{b.dmgBuff=(b.dmgBuff||0)+t.effect.dmgBuff,b.dmgBuffRounds=t.effect.duration||2}),(y=t.effect)!=null&&y.dmgReduct&&t.target==="self"&&(e.dmgReduct=t.effect.dmgReduct,e.dmgReductRounds=t.effect.duration||2);return}const i=this._getSkillStat(t.damageStat,r),l=t.damageMult||1;let d=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),h=Math.round(d*l+i*.2),c=[];if(!t.aoe||t.aoe==="single")c=[a[0]];else if(t.aoe==="adjacent"){const b=(g=a[0])==null?void 0:g.groupIdx;c=a.filter(f=>f.groupIdx===b).slice(0,2)}else if(t.aoe==="group"){const b=(_=a[0])==null?void 0:_.groupIdx;c=a.filter(f=>f.groupIdx===b)}else t.aoe==="row"||t.aoe==="all"?c=a:c=[a[0]];const m=t.type==="magic"?"#c060ff":"#ff8060",v=[];for(const b of c){const f=Math.max(Math.ceil(h*.15),h-b.armor);this._applyDamage(e,b,f,m),v.push(b.name);for(const T of t.statusEffects||[])Math.random()<(T.chance||.5)&&this._applyStatus(b,T.type,T.duration||2,T.power||4)}this._log_(`${e.name} uses ${t.name}${c.length>1?` (×${c.length})`:""}: ${h} dmg`,"hero")}_getSkillStat(e,t){return!e||e==="str"?t.STR||8:e==="dex"?t.DEX||8:e==="int"?t.INT||8:e==="str_int"?Math.round(((t.STR||8)+(t.INT||8))/2):e==="str_dex"?Math.round(((t.STR||8)+(t.DEX||8))/2):t.STR||8}_applyDamage(e,t,a,o){let s=a;t.dmgReduct&&(s=Math.round(s*(1-t.dmgReduct))),t.hp-=s,this._flashMap.set(t.id,at),this._spawnParticles(t.x,t.y-30),this._spawnDmgNumber(t.x,t.y-50,s,o),this.audio.playSfx("hit"),t.hp<=0&&(t.hp=0,t.alive=!1,t.stance="death",this._log_(`${t.name} defeated!`,"death"))}_applyStatus(e,t,a,o){e.statuses||(e.statuses=[]);const s=e.statuses.find(i=>i.type===t);if(s){s.duration=Math.max(s.duration,a);return}e.statuses.push({type:t,duration:a,power:o});const r={burn:"🔥",poison:"☠",bleed:"🩸",stun:"⚡"};this._log_(`${e.name} is ${t}ed! ${r[t]||""}`,"death")}_processStatusEffects(){const e=[...this._allies,...this._allEnemies];for(const t of e)t.alive&&(t.statuses=(t.statuses||[]).filter(a=>{if(a.type==="burn"||a.type==="poison"||a.type==="bleed"){const o=Math.max(1,a.power||3);t.hp-=o,this._spawnDmgNumber(t.x,t.y-45,o,a.type==="burn"?"#ff6020":a.type==="poison"?"#60c020":"#c02020"),t.hp<=0&&(t.hp=0,t.alive=!1,t.stance="death",this._log_(`${t.name} perishes from ${a.type}!`,"death"))}return a.duration--,a.duration>0}),t.dmgBuffRounds>0&&(t.dmgBuffRounds--,t.dmgBuffRounds===0&&(t.dmgBuff=0)),t.dmgReductRounds>0&&(t.dmgReductRounds--,t.dmgReductRounds===0&&(t.dmgReduct=0)));this._updateHud()}_checkCombatEnd(){const e=this._allEnemies.every(a=>!a.alive),t=this._allies.every(a=>!a.alive);e&&this._phase==="PLAYING"?(this._phase="VICTORY",setTimeout(()=>this._victory(),800)):t&&this._phase==="PLAYING"&&(this._phase="DEFEAT",setTimeout(()=>this._defeat(),800))}_spawnDmgNumber(e,t,a,o){!e&&!t||this._dmgNumbers.push({x:e+(Math.random()-.5)*20,y:t,text:String(a),color:o,life:.9,maxLife:.9})}_spawnParticles(e,t){if(!e&&!t)return;const a=["#e8a020","#ff6040","#f0c060","#ff4040"];for(let o=0;o<7;o++)this._particles.push({x:e,y:t,vx:(Math.random()-.5)*100,vy:-(Math.random()*80+30),size:Math.random()*4+2,color:a[Math.floor(Math.random()*a.length)],life:Math.random()*.4+.15})}_victory(){var _;this.audio.playSfx("victory");let e=0,t=0;const a=[];for(const b of this._allEnemies){e+=b.xpValue,t+=b.gold[0]+Math.floor(Math.random()*(b.gold[1]-b.gold[0]+1));const T={border_roads:.15,thornwood:.17,dust_roads:.18,ember_plateau:.2,hell_breach:.22,shattered_core:.23,cosmic_rift:.24,eternal_void:.25}[this.encounter._zoneId]||.15;if(Math.random()<T){const E={border_roads:["sword","dagger","light_chest","ring"],thornwood:["sword","axe","medium_chest","gloves","ring"],dust_roads:["axe","mace","medium_chest","boots","amulet"],ember_plateau:["greatsword","heavy_chest","helmet","amulet"],hell_breach:["greatsword","heavy_chest","helmet","amulet","staff"],shattered_core:["staff","wand","heavy_chest","amulet","ring"],cosmic_rift:["staff","wand","heavy_chest","amulet","ring"],eternal_void:["staff","wand","heavy_chest","amulet","ring"]},H={border_roads:"normal",thornwood:"magic",dust_roads:"magic",ember_plateau:"rare",hell_breach:"rare",shattered_core:"rare",cosmic_rift:"legendary",eternal_void:"legendary"},L={border_roads:"low",thornwood:"medium",dust_roads:"medium",ember_plateau:"high",hell_breach:"high",shattered_core:"elite",cosmic_rift:"elite",eternal_void:"exotic"},ie=E[this.encounter._zoneId]||["sword","dagger","light_chest","ring"],Ne=H[this.encounter._zoneId]||"magic",Le=L[this.encounter._zoneId]||"medium",Z=A(ie[Math.floor(Math.random()*ie.length)],Ne,Le);Z&&(a.push(Z),u.addToInventory(Z))}}u.addGold(t);const s={border_roads:1,thornwood:1.5,dust_roads:2,ember_plateau:2.5,hell_breach:3,shattered_core:4,cosmic_rift:5,eternal_void:6}[this.encounter._zoneId]||1,r=this.encounter._bossNodeId?Math.round(15*s):0,i=Math.round(this._allEnemies.length*s)+r;u.addFame(i);const l=u.get();this._heroes.forEach((b,f)=>{l.party[f]&&(l.party[f].hp=b.hp)});const d=We(l.party,e),h={border_roads:"thornwood",thornwood:"dust_roads",dust_roads:"ember_plateau",ember_plateau:"hell_breach",hell_breach:"shattered_core",shattered_core:"cosmic_rift",cosmic_rift:"eternal_void",eternal_void:"abyssal_depths",abyssal_depths:"primordial_nexus",primordial_nexus:null},c={thornwood:"Thornwood Forest",dust_roads:"The Dust Roads",ember_plateau:"The Ember Plateau",hell_breach:"The Hell Breach",shattered_core:"The Shattered Core",cosmic_rift:"The Cosmic Rift",eternal_void:"The Eternal Void",abyssal_depths:"The Abyssal Depths",primordial_nexus:"The Primordial Nexus"},m={thornwood:2,ember_plateau:3,shattered_core:4,eternal_void:5,primordial_nexus:null};let v=null,p=null,y=!1;if(this.encounter._bossNodeId){l.completedBosses||(l.completedBosses=[]),l.completedBosses.push(this.encounter._bossNodeId);const b=h[this.encounter._zoneId];b&&!(l.unlockedZones||[]).includes(b)&&(l.unlockedZones||(l.unlockedZones=["border_roads"]),l.unlockedZones.push(b),v=`${c[b]||"New zone"} unlocked!`);const f=m[this.encounter._zoneId];f&&(l.act=f,p=f),(this.encounter._zoneId==="primordial_nexus"||this.encounter._bossNodeId==="architect_boss")&&(y=!0,u.setFlag("game_complete",!0))}const g=S("div","cbt-end-modal");g.innerHTML=`
      <div class="cem-box">
        <div class="cem-title" style="color:#e8a020">Victory!</div>
        <div class="cem-rewards">
          <div class="cer"><span>XP</span><strong>+${e}</strong></div>
          <div class="cer"><span>Gold</span><strong>+${t}</strong></div>
          ${a.length?`<div class="cer" style="grid-column:1/-1"><span>Items Found</span><strong style="color:${N.magic}">${a.map(b=>b.name).join(", ")}</strong></div>`:""}
          ${d.length?`<div class="cer" style="grid-column:1/-1;color:#e8a020">⭐ ${d.map(b=>`${b.name} reached Level ${b.level}!`).join(" ")}</div>`:""}
          ${a.length,""}
          ${v?`<div class="cer" style="grid-column:1/-1;color:#60c0ff;font-weight:700">✦ ${v}</div>`:""}
          ${p?`<div class="cer" style="grid-column:1/-1;color:#e8d020;font-size:0.85rem;font-family:'Cinzel',serif;font-weight:700">Act ${p} Unlocked!</div>`:""}
          ${y?`<div class="cer" style="grid-column:1/-1;color:#e8d020;font-size:0.9rem;font-family:'Cinzel',serif">✦ The Architect is defeated. Reality is restored. ✦</div>`:""}
        </div>
        ${y?`
          <div style="display:flex;gap:0.5rem;justify-content:center">
            <button class="cem-btn" id="cem-continue">Continue</button>
            <button class="cem-btn" id="cem-ngplus" style="border-color:rgba(232,208,32,0.5);color:#e8d020">New Game+ ✦</button>
          </div>
        `:'<button class="cem-btn" id="cem-continue">Continue</button>'}
      </div>
    `,g.querySelector("#cem-continue").addEventListener("click",()=>{this.audio.playSfx("click");const b=u.get(),f=b.party.some(T=>(T.pendingAttrPoints||0)>0);if(v&&this.encounter._zoneId){const T=h[this.encounter._zoneId];T&&(b.zoneId=T,b.nodeId=null)}this.manager.pop(),f&&this.manager.push(new Oe(this.manager,this.audio))}),(_=g.querySelector("#cem-ngplus"))==null||_.addEventListener("click",()=>{this.audio.playSfx("ng_plus"),u.startNgPlus(),this.manager.pop()}),this._el.appendChild(g)}_defeat(){this.audio.playSfx("defeat"),u.setFlag("survived_defeat",!0);const e=u.get(),t=Math.floor(u.getGold()*.1);u.addGold(-t),e.party.forEach(o=>{o.hp=Math.max(1,Math.floor((o.maxHp||50)*.25))});const a=S("div","cbt-end-modal");a.innerHTML=`
      <div class="cem-box">
        <div class="cem-title" style="color:#c04030">Defeated</div>
        <div class="cem-body">Your party has fallen. You are returned to Emberglen to recover.</div>
        ${t>0?`<div style="color:#8a7a6a;font-size:0.78rem;margin-bottom:1rem">Gold lost: ${t}</div>`:""}
        <button class="cem-btn" style="border-color:rgba(192,64,48,0.5);color:#c04030">Return to Town</button>
      </div>
    `,a.querySelector(".cem-btn").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.appendChild(a)}_drawBackground(e,t,a){var d,h;if((h=(d=u.get())==null?void 0:d.settings)!=null&&h.disableTextures){e.fillStyle="#050208",e.fillRect(0,0,t,a),this._groundY=a*.63;return}const o=this.encounter.zoneId||"border_roads",s=a*.63,r={border_roads:{sky:["#0c0e14","#151c24","#1a2830"],ground:"#0a1018",grass:"rgba(60,90,120,0.3)",star:!0},thornwood:{sky:["#040a06","#081208","#0a1a0a"],ground:"#060e06",grass:"rgba(20,80,20,0.4)",star:!1,fog:"rgba(20,60,20,0.08)"},dust_roads:{sky:["#1a0e06","#280e04","#3a1c08"],ground:"#1c1008",grass:"rgba(160,80,20,0.3)",star:!0,embers:!0},ember_plateau:{sky:["#280404","#3c0c04","#5a1408"],ground:"#200808",grass:"rgba(200,40,10,0.3)",star:!1,embers:!0,glow:"#c04020"},hell_breach:{sky:["#1a0000","#300408","#480010"],ground:"#140004",grass:"rgba(160,0,20,0.4)",star:!1,embers:!0,glow:"#c00820",lava:!0},shattered_core:{sky:["#0a0014","#180028","#280040"],ground:"#08000e",grass:"rgba(120,0,200,0.3)",star:!0,embers:!0,glow:"#6020c0",lava:!1},cosmic_rift:{sky:["#000010","#000828","#001040"],ground:"#000008",grass:"rgba(0,80,200,0.25)",star:!0,embers:!0,glow:"#0040ff",lava:!1},eternal_void:{sky:["#000000","#040004","#080014"],ground:"#000000",grass:"rgba(80,0,180,0.2)",star:!0,embers:!0,glow:"#4000c0",lava:!1},abyssal_depths:{sky:["#000408","#001020","#002040"],ground:"#000810",grass:"rgba(0,80,160,0.3)",star:!1,embers:!0,glow:"#0060c0",lava:!1},primordial_nexus:{sky:["#100008","#200018","#380028"],ground:"#0a0008",grass:"rgba(200,0,120,0.3)",star:!0,embers:!0,glow:"#c00080",lava:!1}},i=r[o]||r.border_roads,l=e.createLinearGradient(0,0,0,s);if(l.addColorStop(0,i.sky[0]),l.addColorStop(.5,i.sky[1]),l.addColorStop(1,i.sky[2]),e.fillStyle=l,e.fillRect(0,0,t,a),i.star){e.fillStyle="rgba(255,255,255,0.6)";for(let c=0;c<40;c++){const m=(c*137.5+o.charCodeAt(0)*7)%t,v=(c*97+o.charCodeAt(1)*13)%(s*.8);e.beginPath(),e.arc(m,v,c%3===0?1:.5,0,Math.PI*2),e.fill()}}if(o==="thornwood"){e.fillStyle="#020804";for(let c=0;c<7;c++){const m=c/6*t,v=60+c*37%40;e.beginPath(),e.moveTo(m,s),e.lineTo(m-18,s-v*.5),e.lineTo(m,s-v),e.lineTo(m+18,s-v*.5),e.closePath(),e.fill()}}else if(o==="ember_plateau"||o==="dust_roads"){e.fillStyle="#0e0604";for(let c=0;c<4;c++){const m=c/3.5*t-20,v=60+c*20,p=30+c*15;e.fillRect(m,s-p,v,p)}}else if(o==="hell_breach"||o==="shattered_core"){e.fillStyle=i.sky[0];for(let c=0;c<5;c++){const m=c/4.5*t,v=80+c*20;e.beginPath(),e.moveTo(m-12,s),e.lineTo(m,s-v),e.lineTo(m+12,s),e.closePath(),e.fill()}if(i.lava||o==="ember_plateau"){const c=e.createLinearGradient(0,s-30,0,s);c.addColorStop(0,"transparent"),c.addColorStop(1,i.glow?i.glow+"88":"rgba(200,40,0,0.4)"),e.fillStyle=c,e.fillRect(0,s-30,t,30)}}if(i.fog&&(e.fillStyle=i.fog,e.fillRect(0,s-20,t,20)),e.fillStyle=i.ground,e.fillRect(0,s,t,a-s),e.fillStyle=i.grass,e.fillRect(0,s,t,2),i.embers){e.fillStyle=i.glow?i.glow+"aa":"rgba(220,80,20,0.7)";for(let c=0;c<12;c++){const m=(this._t*(20+c*7)+c*t/12)%t,v=s-10-(this._t*(30+c*11)+c*40)%(s*.7);e.beginPath(),e.arc(m,v,1.2,0,Math.PI*2),e.fill()}}this._groundY=s,this._drawWeather(e,t,a,o)}_drawWeather(e,t,a,o){const s=this._t;if(o==="border_roads"){e.strokeStyle="rgba(120,160,200,0.18)",e.lineWidth=1;for(let r=0;r<25;r++){const i=(r*173+s*80)%t,l=(r*97+s*180)%a;e.beginPath(),e.moveTo(i,l),e.lineTo(i-2,l+10),e.stroke()}}else if(o==="thornwood"){e.fillStyle="rgba(30,80,30,0.06)";for(let r=0;r<4;r++){const i=(r*200+s*12)%(t+200)-100,l=a*.55+Math.sin(s*.3+r)*20;e.beginPath(),e.ellipse(i,l,120,18,0,0,Math.PI*2),e.fill()}}else if(o==="dust_roads"||o==="ember_plateau"){e.fillStyle="rgba(180,140,80,0.35)";for(let r=0;r<20;r++){const i=(r*137-s*30+t*2)%t,l=(r*79+s*10)%(a*.6);e.beginPath(),e.arc(i,l,1.5,0,Math.PI*2),e.fill()}}else if(o==="hell_breach"||o==="shattered_core"){const r=o==="shattered_core"?"rgba(160,60,240,0.5)":"rgba(240,40,20,0.4)";e.fillStyle=r;for(let i=0;i<18;i++){const l=(i*157+Math.sin(s*.5+i)*30)%t,d=(i*113-s*15+a)%a;e.beginPath(),e.arc(l,d,1.8,0,Math.PI*2),e.fill()}}}draw(e){const t=this.manager.width,a=this.manager.height;this._drawBackground(e,t,a),e.strokeStyle="rgba(232,160,32,0.06)",e.lineWidth=1,e.setLineDash([4,8]),e.beginPath();const o=this._groundY||a*.63;e.moveTo(t/2,40),e.lineTo(t/2,o),e.stroke(),e.setLineDash([]);const s=48,r=this._heroes.length+this._companions.length,i=this._enemyGroups.reduce((g,_)=>Math.max(g,_.length),0),l=Math.max(r,i);let d=Math.min(1,(o-60)/(l*s*.8));d=Math.max(.45,Math.min(1,d,a/900));const h=s*.75*d,c=t*.15;this._heroes.forEach((g,_)=>{g.x=c+(_%2===0?0:s*d*.35),g.y=o-8-_*h,g._drawScale=d});const m=t*.25;this._companions.forEach((g,_)=>{g.x=m+(_%2===0?s*d*.2:-s*d*.15),g.y=o-8-_*h,g._drawScale=d});const v=this._enemyGroups.length,p=v===1?[t*.65]:v===2?[t*.55,t*.75]:[t*.55,t*.7,t*.85];this._enemyGroups.forEach((g,_)=>{const b=p[_]||t*.55+_*t*.15;g.forEach((f,T)=>{f.x=b+(T%2===0?0:s*d*.3),f.y=o-8-T*h,f._drawScale=d})});const y=[...this._heroes,...this._companions,...this._allEnemies];y.sort((g,_)=>g.y-_.y);for(const g of y)this._drawUnit(e,g);e.save();for(const g of this._particles)e.globalAlpha=g.life,e.fillStyle=g.color,e.shadowBlur=8,e.shadowColor=g.color,e.beginPath(),e.arc(g.x,g.y,g.size,0,Math.PI*2),e.fill();e.shadowBlur=0,e.globalAlpha=1,e.restore(),e.save();for(const g of this._dmgNumbers){const _=Math.min(g.life/g.maxLife*2,1);e.globalAlpha=_,e.font=`700 ${Math.round(14+_*4)}px Inter, sans-serif`,e.textAlign="center",e.textBaseline="middle",e.fillStyle=g.color,e.shadowBlur=10,e.shadowColor=g.color,e.fillText(g.text,g.x,g.y)}if(e.shadowBlur=0,e.globalAlpha=1,e.restore(),this._phase==="START"){const g=Math.min(this._t/.4,1)*Math.max(0,1-(this._t-.6)/.4);e.save(),e.globalAlpha=g;const _=Math.round(t*.055);e.font=`900 ${_}px Cinzel, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=30,e.shadowColor="#c04030",e.fillStyle="#f0e8d8",e.fillText(this.encounter.name,t/2,a*.28),e.restore()}}_drawUnit(e,t){try{this._drawUnitInner(e,t)}catch{}}_drawUnitInner(e,t){const a=t.x,o=t.y;if(!t.alive&&t.stance!=="death")return;const s=this._flashMap.has(t.id),r=t.isHero,i=t._drawScale||1,l=(r?50:38)*i,d=t.alive?1:.35;e.save(),e.globalAlpha=d,e.fillStyle="rgba(0,0,0,0.25)",e.beginPath(),e.ellipse(a,o+3,16,5,0,0,Math.PI*2),e.fill(),s&&(e.shadowBlur=18,e.shadowColor="#ff4040");const h=r?F[t.class]:F[t.enemyId],c=r||t.stance==="ready"?"south":"east",m=h?j[h]:null,v=m?m[c]:null;if(v&&v.complete&&v.naturalWidth>0){const y=v.naturalWidth,g=v.naturalHeight,_=l/Math.max(y,g)*1.6,b=y*_,f=g*_;e.drawImage(v,a-b/2,o-f,b,f)}else{const y=s?"#ff8060":r?this._heroColor(t.class):"#6B3A0A",g=r?"#e8a020":"#c0392b";e.fillStyle=y,e.beginPath(),e.rect(a-l*.28,o-l,l*.56,l*.48),e.fill(),e.beginPath(),e.arc(a,o-l*.8,l*.2,0,Math.PI*2),e.fill(),e.fillStyle=g,e.fillRect(a-l*.18,o-l*.52,l*.14,l*.46),e.fillRect(a+l*.04,o-l*.52,l*.14,l*.46),t.stance==="attack"&&(r?(e.fillStyle="#c8c8d8",e.beginPath(),e.moveTo(a+l*.28,o-l*.72),e.lineTo(a+l*.5,o-l*.48),e.lineTo(a+l*.38,o-l*.38),e.closePath(),e.fill()):(e.fillStyle="#c0392b",e.beginPath(),e.moveTo(a-l*.35,o-l*.55),e.lineTo(a-l*.6,o-l*.38),e.lineTo(a-l*.5,o-l*.28),e.closePath(),e.fill()))}if(t.alive||(e.strokeStyle="#ff4040",e.lineWidth=1.5,e.beginPath(),e.moveTo(a-5,o-l*.87),e.lineTo(a-2,o-l*.77),e.moveTo(a-2,o-l*.87),e.lineTo(a-5,o-l*.77),e.moveTo(a+2,o-l*.87),e.lineTo(a+5,o-l*.77),e.moveTo(a+5,o-l*.87),e.lineTo(a+2,o-l*.77),e.stroke()),e.shadowBlur=0,e.globalAlpha=1,t.alive){const y=l*1.1,g=a-y/2,_=o-l-8;e.fillStyle="rgba(0,0,0,0.5)",e.fillRect(g,_,y,3);const b=Math.max(0,t.hp/t.maxHp);e.fillStyle=b>.5?"#40c870":b>.25?"#e8a020":"#c04030",e.fillRect(g,_,y*b,3);const f=t.statuses||[];if(f.length>0){const T={burn:"#ff6020",poison:"#60c040",bleed:"#c02020",stun:"#e0c020"};f.forEach((E,H)=>{e.fillStyle=T[E.type]||"#aaaaaa",e.beginPath(),e.arc(g+4+H*7,_-6,3,0,Math.PI*2),e.fill()})}r||(e.font="9px Inter, sans-serif",e.textAlign="center",e.fillStyle="rgba(240,232,216,0.65)",e.fillText(t.name,a,_-(f.length?10:2)))}e.restore()}_preloadSprites(e){const t=u.get();for(const a of[...t.party,...t.companions]){const o=F[a.class];o&&pe(o)}for(const a of e.enemies){const o=F[a.id];o&&pe(o)}}_heroColor(e){return{warrior:"#607080",paladin:"#d4af37",ranger:"#4a7a40",rogue:"#3a3050",cleric:"#e0d0a0",bard:"#8060a0",mage:"#4060c0",necromancer:"#503060",warlock:"#802040",demon_hunter:"#c04060",scavenger:"#806040",swashbuckler:"#c08020",dragon_knight:"#806020",pyromancer:"#c04020"}[e]||"#607080"}update_old(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const ot=`
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
.hud-members { display: flex; gap: 0.35rem; flex: 1; min-width: 0; flex-wrap: wrap; }
.hm { flex: 1; min-width: 60px; max-width: 100px; }
.hm-top { display: flex; justify-content: space-between; align-items: baseline; gap: 0.2rem; }
.hm-name { font-size: 0.58rem; font-weight: 700; font-family: 'Cinzel', serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hm-bars { display: flex; flex-direction: column; gap: 1px; margin-top: 2px; }
.hm-bar-t { background: rgba(255,255,255,0.07); border-radius: 2px; height: 3px; overflow: hidden; }
.mp-t { height: 2px; }
.hm-bar { height: 100%; border-radius: 2px; transition: width 0.3s; }
.hp-bar { background: #40c870; }
.mp-bar { background: #4080c0; }
.hm-vals { font-size: 0.5rem; color: #8a7a6a; }
.hud-right { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; flex-shrink: 0; }
.hud-round { font-family: 'Cinzel', serif; font-size: 0.6rem; color: #8a7a6a; }
.hud-controls { display: flex; gap: 0.3rem; }
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
`;class st{constructor(e,t,a,o){this.manager=e,this.audio=t,this.event=a,this.onComplete=o,this._el=null,this._lineIdx=0,this._phase="LINES",this._choiceResult=null,this._revealTimer=0,this._revealed=0,this._currentText=""}onEnter(){this._build()}_build(){I("dialog-styles",rt),this._el=S("div","dialog-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML=`
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
    `,this._el.querySelector("#dlg-skip").addEventListener("click",()=>{this._phase==="LINES"&&this._advance()}),this._el.querySelector("#dlg-bubble").addEventListener("click",()=>{this._phase==="LINES"&&this._advance()}),this._showCurrentLine()}_npcInitials(){return this.event.npcName.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase()}_showCurrentLine(){const e=this.event.lines||[];if(this._lineIdx>=e.length){this._showChoices();return}const t=e[this._lineIdx];this._currentText=t.text,this._revealed=0,this._revealTimer=0;const a=this._el.querySelector("#dlg-bubble"),o=this._el.querySelector("#dlg-cursor");t.speaker==="hero"?a.classList.add("hero-bubble"):a.classList.remove("hero-bubble"),o.style.opacity="0",this._phase="LINES"}update(e){var s,r;if(this._phase!=="LINES")return;const t=this.event.lines||[];if(this._lineIdx>=t.length)return;const a=45;this._revealTimer+=e;const o=Math.floor(this._revealTimer*a);if(o>this._revealed){this._revealed=Math.min(o,this._currentText.length);const i=(s=this._el)==null?void 0:s.querySelector("#dlg-text");i&&(i.textContent=this._currentText.slice(0,this._revealed))}if(this._revealed>=this._currentText.length){const i=(r=this._el)==null?void 0:r.querySelector("#dlg-cursor");i&&(i.style.opacity="1")}}_advance(){var e,t;if(this._revealed<this._currentText.length){this._revealed=this._currentText.length;const a=(e=this._el)==null?void 0:e.querySelector("#dlg-text");a&&(a.textContent=this._currentText);const o=(t=this._el)==null?void 0:t.querySelector("#dlg-cursor");o&&(o.style.opacity="1");return}this._lineIdx++,this._showCurrentLine()}_showChoices(){this._phase="CHOICES";const e=this._el.querySelector("#dlg-skip");e&&(e.style.display="none");const t=this._el.querySelector("#dlg-bubble");t&&(t.style.display="none");const a=this._el.querySelector("#dlg-skip");a&&(a.style.display="none");const o=this.event.choices||[],s=this._el.querySelector("#dlg-choices");s.innerHTML=o.map((r,i)=>`
      <button class="dlg-choice${r.skillCheck?" skill-check":""}" data-idx="${i}">
        ${r.skillCheck?`<span class="sc-badge">${r.skillCheck.stat.toUpperCase()} ${r.skillCheck.dc}</span>`:""}
        ${r.text}
      </button>
    `).join(""),s.querySelectorAll(".dlg-choice").forEach(r=>{r.addEventListener("click",()=>{this.audio.playSfx("click");const i=parseInt(r.dataset.idx);this._selectChoice(i)})})}_selectChoice(e){var r;const t=this.event.choices[e],o=u.get().party[0];let s=t.outcome;if(t.skillCheck){const i=t.skillCheck.stat.toUpperCase(),l=t.skillCheck.dc;s=(((r=o==null?void 0:o.attrs)==null?void 0:r[i])||8)+Math.floor(Math.random()*10)+1>=l?t.outcomes.pass:t.outcomes.fail}t.effect&&t.effect.gold&&u.addGold(t.effect.gold),this._showOutcome(s,t)}_showOutcome(e,t){var d,h,c,m,v,p,y,g;this._phase="OUTCOME";const a=(d=this.event.outcomes)==null?void 0:d[e];if(!a){this._finish(e);return}const o=[];if(a.setFlag&&u.setFlag(a.setFlag,!0),(h=a.reward)!=null&&h.gold&&(u.addGold(a.reward.gold),o.push(`${a.reward.gold>0?"+":""}${a.reward.gold} Gold`)),(c=a.reward)!=null&&c.xp&&(u.get().party.forEach(b=>{b.xp=(b.xp||0)+a.reward.xp}),o.push(`+${a.reward.xp} XP`)),(m=a.reward)!=null&&m.item){const _=A("ring","magic","medium",void 0);_&&(_.name=a.reward.itemName||_.name,a.reward.itemDesc&&(_.description=a.reward.itemDesc),u.addToInventory(_),o.push(`Acquired: ${_.name}`))}const s=(v=this._el)==null?void 0:v.querySelector("#dlg-bubble");s&&(s.style.display="");const r=(p=this._el)==null?void 0:p.querySelector("#dlg-text");r&&(r.textContent=a.text);const i=(y=this._el)==null?void 0:y.querySelector("#dlg-cursor");i&&(i.style.opacity="0");const l=this._el.querySelector("#dlg-choices");l.innerHTML=`
      ${o.length?`<div class="dlg-rewards">${o.map(_=>`<div class="dlg-reward-line">${_}</div>`).join("")}</div>`:""}
      <button class="dlg-choice dlg-continue" id="dlg-done">Continue</button>
    `,(g=this._el.querySelector("#dlg-done"))==null||g.addEventListener("click",()=>{this.audio.playSfx("click"),this._finish(e,a)})}_finish(e,t){this.manager.pop(),this.onComplete&&this.onComplete(e,t)}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const rt=`
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
.dlg-rewards {
  background: rgba(232,160,32,0.08); border: 1px solid rgba(232,160,32,0.25);
  border-radius: 8px; padding: 0.5rem 0.75rem; margin-bottom: 0.3rem;
}
.dlg-reward-line {
  font-size: 0.78rem; color: #e8c840; font-weight: 600;
  padding: 0.15rem 0; font-family: 'Cinzel', serif;
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
`,G=[...ve,...He,...De,...Be,...Re],it={1:"Act I · The Goblin Frontier",2:"Act II · The Ashen Wastes",3:"Act III · The Hell Breach",4:"Act IV · The Cosmic Void",5:"Act V · The Primordial Abyss"},J={[C.COMBAT]:{color:"#c04030",label:"Combat"},[C.DIALOG]:{color:"#4080c0",label:"Encounter"},[C.TOWN]:{color:"#40a860",label:"Town"},[C.TREASURE]:{color:"#e8a020",label:"Treasure"},[C.AMBUSH]:{color:"#8a2020",label:"Ambush"},[C.BOSS]:{color:"#9040c0",label:"Boss"},[C.LORE]:{color:"#6a9040",label:"Discovery"},[C.SHRINE]:{color:"#60c0e0",label:"Shrine"},[C.CHALLENGE]:{color:"#e06020",label:"Challenge"}},nt=P.goblin_patrol;class ee{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._hovered=null,this._t=0;const a=u.get();this._zone=G.find(o=>o.id===a.zoneId)||ve[0]}onEnter(){this._build()}_getUnlockedZones(){const t=u.get().unlockedZones||["border_roads"];return G.filter(a=>t.includes(a.id))}_build(){var a,o;I("map-styles",lt),this._el=S("div","map-screen");const e=this._getUnlockedZones();this._el.innerHTML=`
      <div class="map-header">
        <div class="map-header-row">
          <button class="map-back" id="map-back">← Back to Town${(()=>{const s=u.get(),r=[...s.party,...s.companions,...s.bench].reduce((i,l)=>i+(l.pendingAttrPoints||0)+(l.pendingSkillPoints||0),0);return r>0?` <span style="background:#c04030;color:#fff;font-size:0.55rem;padding:0.1rem 0.3rem;border-radius:8px;margin-left:0.3rem">${r}</span>`:""})()}</button>
          <div class="map-act-tag" style="flex:1;text-align:right;">${it[this._zone.act]||"Act I"}</div>
        </div>
        <div class="map-zone-tabs" id="map-zone-tabs">
          ${e.map(s=>{const r=u.get(),i=!r.visitedNodes||![...r.visitedNodes].some(l=>s.nodes.some(d=>d.id===l));return`<button class="mzt${s.id===this._zone.id?" active":""}${i&&s.id!==this._zone.id?" mzt-new":""}" data-zone="${s.id}">${s.name}${i&&s.id!==this._zone.id?' <span class="mzt-badge">NEW</span>':""}</button>`}).join("")}
        </div>
      </div>
      <div class="map-canvas-wrap">
        <canvas id="map-canvas"></canvas>
        <div id="map-node-tooltip" class="map-node-tooltip" style="display:none"></div>
      </div>
      ${this._renderPortalBar()}
      <div class="map-legend">
        ${Object.entries(J).map(([s,r])=>`<div class="legend-item"><div class="legend-dot" style="background:${r.color}"></div><span>${r.label}</span></div>`).join("")}
      </div>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#map-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(a=this._el.querySelector("#portal-use-btn"))==null||a.addEventListener("click",()=>{this.audio.playSfx("click");const s=u.get(),r=(s.potions||[]).findIndex(i=>i.id==="portal_scroll");r>=0&&s.potions.splice(r,1),u.openPortal(s.nodeId,s.zoneId),this.manager.pop()}),(o=this._el.querySelector("#portal-return-btn"))==null||o.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".mzt").forEach(s=>{s.addEventListener("click",()=>{const r=G.find(i=>i.id===s.dataset.zone);r&&(this.audio.playSfx("click"),this._zone=r,u.get().zoneId=r.id,w(this._el),this._el=null,this._build())})});const t=this._el.querySelector(".mzt.active");t&&t.scrollIntoView({inline:"center",block:"nearest"}),this._setupCanvas()}_renderPortalBar(){const e=u.get(),t=(e.potions||[]).some(r=>r.id==="portal_scroll"),a=u.getPortal(),o=a&&a.nodeId===e.nodeId&&a.zoneId===e.zoneId;let s="";return o?s='<button class="portal-bar-btn" id="portal-return-btn">✦ Return to Town through Portal</button>':t&&(s='<button class="portal-bar-btn" id="portal-use-btn">✦ Use Portal Scroll</button>'),s?`<div class="map-portal-bar">${s}</div>`:""}_setupCanvas(){const e=this._el.querySelector(".map-canvas-wrap"),t=this._el.querySelector("#map-canvas");t.width=e.clientWidth,t.height=e.clientHeight,t.addEventListener("click",a=>this._onClick(a,t)),t.addEventListener("mousemove",a=>this._onHover(a,t)),t.addEventListener("mouseleave",()=>{this._hovered=null,this._hideNodeTooltip()}),this._canvas=t,this._ctx=t.getContext("2d"),this._drawMap()}_nodePos(e,t,a){return{x:e.x*t,y:e.y*a}}_drawMap(){var c,m,v;const e=this._ctx,t=this._canvas.width,a=this._canvas.height,o=u.get(),s=e.createLinearGradient(0,0,t,a);s.addColorStop(0,"#080e08"),s.addColorStop(1,"#0d180e"),e.fillStyle=s,e.fillRect(0,0,t,a),e.strokeStyle="rgba(64,168,96,0.05)",e.lineWidth=1;for(let p=0;p<t;p+=40)e.beginPath(),e.moveTo(p,0),e.lineTo(p,a),e.stroke();for(let p=0;p<a;p+=40)e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke();const r=this._zone,i=o.nodeId,l=r.nodes.find(p=>p.id===i);new Set((l==null?void 0:l.exits)||[]);for(const p of r.nodes){const y=this._nodePos(p,t,a);for(const g of p.exits){const _=r.nodes.find(L=>L.id===g);if(!_)continue;const b=this._nodePos(_,t,a),f=(c=o.visitedNodes)==null?void 0:c.has(p.id),T=(m=o.visitedNodes)==null?void 0:m.has(g),E=p.id===i&&!T,H=f&&T;if(e.save(),E){e.shadowBlur=10,e.shadowColor="#e8c060",e.strokeStyle="rgba(232,192,96,0.85)",e.lineWidth=2.5;const L=this._t*30%16;e.lineDashOffset=-L,e.setLineDash([8,8])}else H?(e.strokeStyle="rgba(64,168,96,0.5)",e.lineWidth=2,e.setLineDash([])):(e.strokeStyle="rgba(100,80,60,0.25)",e.lineWidth=1,e.setLineDash([4,5]));e.beginPath(),e.moveTo(y.x,y.y),e.lineTo(b.x,b.y),e.stroke(),e.restore(),e.setLineDash([])}}for(const p of r.nodes){const y=this._nodePos(p,t,a),g=J[p.type]||{color:"#8a7a6a",label:p.type},_=(v=o.visitedNodes)==null?void 0:v.has(p.id),b=o.nodeId===p.id,f=this._hovered===p.id,T=this._isAccessible(p,r,o);if(b||f){const L=e.createRadialGradient(y.x,y.y,0,y.x,y.y,30);L.addColorStop(0,`${g.color}40`),L.addColorStop(1,"transparent"),e.fillStyle=L,e.beginPath(),e.arc(y.x,y.y,30,0,Math.PI*2),e.fill()}const E=p.type===C.BOSS?18:p.type===C.TOWN?16:13;e.save(),e.globalAlpha=T||_?1:.35,e.fillStyle=_||b?g.color:"rgba(20,15,10,0.9)",e.strokeStyle=g.color,e.lineWidth=b?3:f?2.5:1.5,e.shadowBlur=b?15:f?10:0,e.shadowColor=g.color,e.beginPath(),e.arc(y.x,y.y,E,0,Math.PI*2),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=_?"#0a0608":g.color,e.font=`bold ${E*.85}px Inter, sans-serif`,e.textAlign="center",e.textBaseline="middle";const H=p.type===C.BOSS?"B":p.type===C.TOWN?"T":p.type[0].toUpperCase();e.fillText(H,y.x,y.y),e.fillStyle=T?"#f0e8d8":"#8a7a6a",e.font=`${E<14?"10":"11"}px Inter, sans-serif`,e.fillText(p.name,y.x,y.y+E+13),e.restore()}const d=r.nodes.find(p=>p.id===o.nodeId);if(d){const p=this._nodePos(d,t,a);e.save(),e.fillStyle="#f0e8d8",e.shadowBlur=12,e.shadowColor="#e8a020",e.font="18px sans-serif",e.textAlign="center",e.fillText("★",p.x,p.y-26),e.restore()}const h=u.getPortal();if(h&&h.zoneId===r.id){const p=r.nodes.find(y=>y.id===h.nodeId);if(p){const y=this._nodePos(p,t,a),g=.6+.4*Math.sin(this._t*4);e.save();const _=e.createRadialGradient(y.x,y.y,4,y.x,y.y,22);_.addColorStop(0,`rgba(232,180,40,${.5*g})`),_.addColorStop(.6,`rgba(200,140,20,${.2*g})`),_.addColorStop(1,"transparent"),e.fillStyle=_,e.beginPath(),e.arc(y.x,y.y,22,0,Math.PI*2),e.fill(),e.fillStyle=`rgba(232,180,40,${g})`,e.shadowBlur=8,e.shadowColor="#e8b428",e.font="16px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("✦",y.x+16,y.y-16),e.restore()}}}_isAccessible(e,t,a){var o,s,r;if((o=a.visitedNodes)!=null&&o.has(e.id)||a.nodeId===e.id||((s=t.nodes[0])==null?void 0:s.id)===e.id)return!0;for(const i of t.nodes)if((r=a.visitedNodes)!=null&&r.has(i.id)&&i.exits.includes(e.id)||a.nodeId===i.id&&i.exits.includes(e.id))return!0;return!1}_onClick(e,t){const a=t.getBoundingClientRect(),o=(e.clientX-a.left)*(t.width/a.width),s=(e.clientY-a.top)*(t.height/a.height),r=u.get();for(const i of this._zone.nodes){const l=this._nodePos(i,t.width,t.height),d=Math.hypot(o-l.x,s-l.y),h=i.type===C.BOSS?18:14;if(d<=h+8){if(!this._isAccessible(i,this._zone,r))return;this.audio.playSfx("click"),this._navigateToNode(i);return}}}_onHover(e,t){const a=t.getBoundingClientRect(),o=(e.clientX-a.left)*(t.width/a.width),s=(e.clientY-a.top)*(t.height/a.height);let r=null;for(const i of this._zone.nodes){const l=this._nodePos(i,t.width,t.height);if(Math.hypot(o-l.x,s-l.y)<=20){r=i.id;break}}if(r!==this._hovered)if(this._hovered=r,this._drawMap(),r){const i=this._zone.nodes.find(d=>d.id===r),l=J[i.type]||{};this._showNodeTooltip(e,i,l)}else this._hideNodeTooltip()}_showNodeTooltip(e,t,a){const o=this._el.querySelector("#map-node-tooltip");o&&(o.innerHTML=`<div class="mntt-name">${t.name}</div><div class="mntt-type" style="color:${a.color}">${a.label}</div>`,o.style.display="block",o.style.left=`${e.clientX-this._el.getBoundingClientRect().left+12}px`,o.style.top=`${e.clientY-this._el.getBoundingClientRect().top-40}px`)}_hideNodeTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#map-node-tooltip");e&&(e.style.display="none")}_navigateToNode(e){var a,o,s;const t=(a=u.get().visitedNodes)==null?void 0:a.has(e.id);switch(u.visitNode(e.id),u.get().nodeId=e.id,e.type){case C.TOWN:this.manager.pop();break;case C.COMBAT:case C.AMBUSH:{let r=e.encounter;if(t){const d=(qe[this._zone.id]||[]).filter(h=>P[h]);d.length&&(r=d[Math.floor(Math.random()*d.length)])}const i=r&&P[r]?{...P[r],name:t?P[r].name:e.name}:{...nt,name:e.name};i.zoneId=this._zone.id,this.manager.push(new O(this.manager,this.audio,null,i));break}case C.DIALOG:{const r=u.get();r.seenEvents||(r.seenEvents=[]);let i;if(ne[e.id])i=ne[e.id];else{const l=((s=(o=r.party)==null?void 0:o[0])==null?void 0:s.level)||1;i=Ye(l,this._zone.id,r.seenEvents),i&&!r.seenEvents.includes(i.id)&&r.seenEvents.push(i.id)}this.manager.push(new st(this.manager,this.audio,i,(l,d)=>{if(d!=null&&d.startCombat){const h={name:"Bandit Ambush",zoneId:this._zone.id,enemies:[{id:"bandit",name:"Bandit",count:2,hp:28,maxHp:28,dmg:[6,11],armor:3,hit:70,dodge:10,xpValue:20,gold:[4,10]}]};this.manager.push(new O(this.manager,this.audio,null,h))}}));break}case C.LORE:this._showLoreModal(e);break;case C.SHRINE:this._showShrineModal(e);break;case C.CHALLENGE:{const r=e.encounter,i=r?{...P[r],name:e.name}:null;i&&(i.zoneId=this._zone.id,this.manager.push(new O(this.manager,this.audio,null,i)));break}case C.TREASURE:this._showTreasureModal(e);break;case C.BOSS:{const r=e.encounter,i=r?{...P[r],name:e.name}:{...P.border_boss,name:e.name};i._bossNodeId=e.id,i._zoneId=this._zone.id,this.manager.push(new O(this.manager,this.audio,null,i));break}}this._drawMap()}_showLoreModal(e){const t=S("div","map-modal");t.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title">${e.name}</div>
        <div class="mm-body" style="color:#c0b090;font-size:0.88rem;line-height:1.6">
          ${this._getLoreText(e.id)}
        </div>
        <button class="mm-btn">Continue</button>
      </div>
    `,t.querySelector(".mm-overlay").addEventListener("click",()=>w(t)),t.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("click"),w(t)}),this._el.appendChild(t)}_showTreasureModal(e){const t=60+Math.floor(Math.random()*60),a=S("div","map-modal");a.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title" style="color:#e8a020">Treasure Found!</div>
        <div class="mm-body">You discover a hidden cache among the roots of an ancient oak. Inside: <strong style="color:#e8a020">${t} gold</strong> and a weathered map fragment.</div>
        <button class="mm-btn">Claim Reward</button>
      </div>
    `,a.querySelector(".mm-overlay").addEventListener("click",()=>w(a)),a.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("victory"),u.addGold(t),w(a)}),this._el.appendChild(a)}_showShrineModal(e){var l,d,h;const t=u.get(),a=e.shrineType||"heal",o=t.visitedNodes.has(e.id),s={heal:{title:"Ancient Shrine",body:"A shrine glows with soft golden light. The weary traveller finds rest here.",btn:"Rest at the Shrine",action:()=>{[...t.party,...t.companions].forEach(c=>{c.hp>0&&(c.hp=Math.min(c.maxHp||100,c.hp+Math.floor((c.maxHp||100)*.5)))})}},empower:{title:"Cosmic Shrine",body:"Reality bends around this altar. Power radiates from its surface — ancient, vast, unknowable.",btn:"Accept the Blessing",action:()=>{[...t.party,...t.companions].forEach(c=>{c.hp>0&&(c.hp=c.maxHp||100,c.mp=c.maxMp||80)}),u.addFame(5)}},fullrestore:{title:"The Last Shrine",body:"In the depths of the Void, this shrine stands as the final mercy before the end. It pulses with every color at once.",btn:"Be Restored",action:()=>{[...t.party,...t.companions].forEach(c=>{c.hp=c.maxHp||100,c.mp=c.maxMp||80,c.dead=!1})}}},r=s[a]||s.heal,i=S("div","map-modal");i.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title" style="color:#80d0ff">✦ ${r.title}</div>
        <div class="mm-body">${r.body}${o?'<br><em style="color:#8a7a6a;font-size:0.75rem">You have visited this shrine before.</em>':""}</div>
        ${o?"":`<button class="mm-btn">${r.btn}</button>`}
        <button class="mm-btn" style="background:transparent;border-color:rgba(240,232,216,0.2);margin-top:0.5rem" id="shrine-close">Continue</button>
      </div>
    `,(l=i.querySelector(".mm-overlay"))==null||l.addEventListener("click",()=>w(i)),(d=i.querySelector("#shrine-close"))==null||d.addEventListener("click",()=>w(i)),(h=i.querySelector(".mm-btn:not(#shrine-close)"))==null||h.addEventListener("click",()=>{o||(this.audio.playSfx("shrine"),r.action(),w(i))}),this._el.appendChild(i)}_getLoreText(e){return{crossroads_b:"The village is quiet. Too quiet. Scorched thatch still smolders on the rooftops, but the fires are old — three days at least. Whoever — whatever — drove these people out left no bodies. Only silence, and the faint smell of something wrong in the air. Like copper and rot.",hidden_path:'Half-buried in moss, the runestone pulses with a faint, sickly light. The runes are old — older than the kingdom itself. One phrase repeats, carved over and over in increasingly desperate strokes: "The veil does not hold." Mira the Seer would want to know about this.'}[e]||"There is nothing more to see here. The road calls you forward."}onPause(){this._el&&(this._el.style.display="none")}onResume(){if(!this._el)return;const e=u.get(),t=G.find(a=>a.id===e.zoneId);if(t&&t.id!==this._zone.id){this._zone=t,w(this._el),this._el=null,this._build();return}this._el.style.display="",this._drawMap()}update(e){this._t+=e,this._canvas&&this._drawMap()}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const lt=`
.map-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: #08100a; font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.map-header {
  display: flex; flex-direction: column; gap: 0;
  border-bottom: 1px solid rgba(232,160,32,0.15);
  background: rgba(0,0,0,0.3); flex-shrink: 0;
}
.map-header-row {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.5rem 1rem;
}
.map-zone-tabs {
  display: flex; gap: 0.35rem; overflow-x: auto; white-space: nowrap;
  -webkit-overflow-scrolling: touch; scrollbar-width: none;
  padding: 0.25rem 0.75rem 0.5rem; width: 100%; box-sizing: border-box;
}
.map-zone-tabs::-webkit-scrollbar { display: none; }
.mzt {
  padding: 0.4rem 0.75rem; border-radius: 6px; min-height: 44px; min-width: 44px;
  border: 1px solid rgba(64,168,96,0.25); background: rgba(64,168,96,0.06);
  color: #6ab87a; font-size: 0.72rem; cursor: pointer; font-family: 'Inter', sans-serif;
  transition: background 0.12s; flex-shrink: 0;
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
`,dt=["weapon","offhand","head","chest","legs","hands","feet","ring1","ring2","necklace"],ct={weapon:"Weapon",offhand:"Off-hand",head:"Head",chest:"Chest",legs:"Legs",hands:"Hands",feet:"Feet",ring1:"Ring",ring2:"Ring",necklace:"Necklace"};class ht{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._tt=null}onEnter(){this._build()}_build(){I("inv-styles",ut),this._el=S("div","inv-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=u.get(),t=[...e.party,...e.companions],a=t[this._selectedCharIdx]||t[0];this._selectedCharIdx>=t.length&&(this._selectedCharIdx=0),this._el.innerHTML=`
      <div class="inv-header">
        <div class="inv-char-tabs" id="char-tabs">
          ${t.map((o,s)=>`
            <button class="char-tab${s===this._selectedCharIdx?" active":""}" data-idx="${s}">
              ${o.name}<br><small>${o.className||o.class}</small>
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
            ${(()=>{var r,i;const o=(a==null?void 0:a.isCompanion)&&(a==null?void 0:a.class)==="companion",s=(i=(r=a==null?void 0:a.equipment)==null?void 0:r.weapon)==null?void 0:i.twoHanded;return dt.map(l=>{var c;const d=(c=a==null?void 0:a.equipment)==null?void 0:c[l];return`
                  <div class="equip-slot${d?" has-item":""}${l==="offhand"&&s||o?" slot-disabled":""}${o?" slot-companion":""}" data-slot="${l}">
                    <div class="es-label">${ct[l]}${o?'<span class="es-companion-tag">[Companion]</span>':""}</div>
                    ${d?`
                      <div class="es-item" data-itemid="${d.id}" data-slot="${l}">
                        <div class="esi-name" style="color:${N[d.rarity]}">${d.name}</div>
                        <div class="esi-stat">${d.dmg?`${d.dmg[0]}-${d.dmg[1]}`:d.armor?`+${d.armor} arm`:""}</div>
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
            ${e.inventory.length===0?'<div class="inv-empty">Your pack is empty. Visit the merchant or defeat enemies to find equipment.</div>':e.inventory.map(o=>`
                <div class="inv-item-card" data-id="${o.id}">
                  <div class="iic-rarity-bar" style="background:${N[o.rarity]}"></div>
                  <div class="iic-name" style="color:${N[o.rarity]}">${o.name}</div>
                  <div class="iic-type">${o.subtype||o.type}</div>
                  <div class="iic-stat">${o.dmg?`⚔ ${o.dmg[0]}-${o.dmg[1]}`:o.armor?`🛡 +${o.armor}`:""}</div>
                  <div class="iic-quality">${o.quality}</div>
                  <button class="iic-equip-btn" data-equip="${o.id}">Equip</button>
                </div>
              `).join("")}
          </div>
        </div>
      </div>
      <div id="inv-tt" class="inv-tooltip" style="display:none"></div>
    `,this._wireEvents()}_renderCharStats(e){if(!e)return'<div class="stat-row"><span>No character selected</span></div>';const t=e.attrs,a=e.equipment||{};let o=0;for(const d of Object.values(a))d!=null&&d.armor&&(o+=d.armor);const s=50+t.CON*10,r=30+t.INT*8,i=Math.min(95,70+Math.round(t.DEX*1.2)),l=Math.min(40,5+Math.round(t.DEX*.8));return`
      <div class="stat-row"><span class="sr-label">HP</span><span class="sr-val">${s}</span></div>
      <div class="stat-row"><span class="sr-label">Mana</span><span class="sr-val">${r}</span></div>
      <div class="stat-row"><span class="sr-label">Armor</span><span class="sr-val">${o}</span></div>
      <div class="stat-row"><span class="sr-label">Hit</span><span class="sr-val">${i}%</span></div>
      <div class="stat-row"><span class="sr-label">Dodge</span><span class="sr-val">${l}%</span></div>
      <div class="stat-row"><span class="sr-label">STR/DEX/INT/CON</span><span class="sr-val">${t.STR}/${t.DEX}/${t.INT}/${t.CON}</span></div>
    `}_doEquip(e,t,a,o){e.equipment||(e.equipment={}),t.twoHanded&&t.type==="weapon"&&e.equipment.offhand&&(u.addToInventory(e.equipment.offhand),delete e.equipment.offhand),e.equipment[a]&&u.addToInventory(e.equipment[a]),e.equipment[a]=t,u.removeFromInventory(t.id)}_showSlotPicker(e,t,a){var l,d;const o=S("div","slot-picker-overlay"),s=(l=e.equipment)==null?void 0:l.weapon,r=(d=e.equipment)==null?void 0:d.offhand,i=s==null?void 0:s.twoHanded;o.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Equip to which slot?</div>
        <div class="spo-item-name" style="color:${N[t.rarity]}">${t.name}</div>
        <div class="spo-actions">
          <button class="spo-btn" id="spo-weapon">
            Main Hand${s?`<br><small style="color:#8a7a6a">Replaces: ${s.name}</small>`:""}
          </button>
          <button class="spo-btn" id="spo-offhand" ${i?'disabled title="Unequip 2H weapon first"':""}>
            Off Hand${r?`<br><small style="color:#8a7a6a">Replaces: ${r.name}</small>`:""}${i?'<br><small style="color:#c04030">2H equipped</small>':""}
          </button>
        </div>
        <button class="spo-cancel" id="spo-cancel">Cancel</button>
      </div>
    `,o.querySelector("#spo-weapon").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"weapon",a),w(o),this._render()}),o.querySelector("#spo-offhand").addEventListener("click",()=>{i||(this.audio.playSfx("click"),this._doEquip(e,t,"offhand",a),w(o),this._render())}),o.querySelector("#spo-cancel").addEventListener("click",()=>w(o)),this._el.appendChild(o)}_showRingPicker(e,t,a){var i,l;const o=S("div","slot-picker-overlay"),s=(i=e.equipment)==null?void 0:i.ring1,r=(l=e.equipment)==null?void 0:l.ring2;o.innerHTML=`
      <div class="spo-box">
        <div class="spo-title">Equip to which ring slot?</div>
        <div class="spo-item-name" style="color:${N[t.rarity]}">${t.name}</div>
        <div class="spo-actions">
          <button class="spo-btn" id="spo-ring1">
            Ring Slot 1${s?`<br><small style="color:#8a7a6a">Replaces: ${s.name}</small>`:""}
          </button>
          <button class="spo-btn" id="spo-ring2">
            Ring Slot 2${r?`<br><small style="color:#8a7a6a">Replaces: ${r.name}</small>`:""}
          </button>
        </div>
        <button class="spo-cancel" id="spo-cancel">Cancel</button>
      </div>
    `,o.querySelector("#spo-ring1").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"ring1",a),w(o),this._render()}),o.querySelector("#spo-ring2").addEventListener("click",()=>{this.audio.playSfx("click"),this._doEquip(e,t,"ring2",a),w(o),this._render()}),o.querySelector("#spo-cancel").addEventListener("click",()=>w(o)),this._el.appendChild(o)}_wireEvents(){var e;(e=this._el.querySelector("#inv-close"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".char-tab").forEach(t=>{t.addEventListener("click",()=>{this.audio.playSfx("click"),this._selectedCharIdx=parseInt(t.dataset.idx),this._render()})}),this._el.querySelectorAll("[data-equip]").forEach(t=>{t.addEventListener("click",()=>{this.audio.playSfx("click");const a=t.dataset.equip,o=u.get(),r=[...o.party,...o.companions][this._selectedCharIdx],i=o.inventory.find(m=>m.id===a);if(!r||!i)return;if(r.isCompanion&&r.class==="companion"){alert("Companions cannot equip items.");return}const l=i.type==="weapon",d=i.twoHanded,h=i.offHandOk||!d&&l;if(l&&!d&&h){this._showSlotPicker(r,i,o);return}if(i.subtype==="ring"){this._showRingPicker(r,i,o);return}let c=i.slot;c||(l?c="weapon":c=i.subtype),this._doEquip(r,i,c,o),this._render()})}),this._el.querySelectorAll("[data-slot]").forEach(t=>{t.dataset.itemid&&t.addEventListener("click",()=>{var i;const a=u.get(),s=[...a.party,...a.companions][this._selectedCharIdx],r=t.dataset.slot;(i=s==null?void 0:s.equipment)!=null&&i[r]&&(this.audio.playSfx("click"),u.addToInventory(s.equipment[r]),delete s.equipment[r],this._render())})}),this._el.querySelectorAll(".inv-item-card, .es-item").forEach(t=>{t.addEventListener("mouseenter",a=>{const o=t.dataset.id||t.dataset.itemid,s=u.get(),r=s.party[this._selectedCharIdx],i=s.inventory.find(h=>h.id===o)||Object.values((r==null?void 0:r.equipment)||{}).find(h=>(h==null?void 0:h.id)===o);if(!i)return;const l=this._el.querySelector("#inv-tt");l.innerHTML=_e(i),l.style.display="block";const d=this._el.getBoundingClientRect();l.style.left=`${Math.min(a.clientX-d.left+12,d.width-220)}px`,l.style.top=`${Math.max(8,a.clientY-d.top-60)}px`}),t.addEventListener("mouseleave",()=>{var o;const a=(o=this._el)==null?void 0:o.querySelector("#inv-tt");a&&(a.style.display="none")})})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const ut=`
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
`;class mt{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._selectedSkill=null,this._mobileDetailView=!1}onEnter(){this._build()}_build(){I("skill-styles",pt),this._el=S("div","skill-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const t=u.get().party,a=t[this._selectedCharIdx],o=a?xe(a.class):[],s=a?ke(a.class,a.level||1):[],r=(a==null?void 0:a.talentsPurchased)||{};this._el.innerHTML=`
      <div class="skill-header">
        <div class="skill-char-tabs" id="skill-char-tabs">
          ${t.map((i,l)=>`
            <button class="sct-tab${l===this._selectedCharIdx?" active":""}" data-idx="${l}">
              ${i.name}<br><small>${i.className||i.class} Lv${i.level||1}</small>
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
          ${o.map(i=>{const l=s.find(d=>d.name===i.name);return`
              <div class="skill-row${l?"":" locked"}${this._selectedSkill===i.name?" selected":""}" data-skill="${i.name}">
                <div class="sk-level-badge">Lv${i.unlockLevel}</div>
                <div class="sk-info">
                  <div class="sk-name">${i.name}</div>
                  <div class="sk-type">${i.type} · ${i.aoe||i.target||"self"}</div>
                </div>
                <div class="sk-cost">${i.mpCost>0?`${i.mpCost} MP`:"Passive"}</div>
                ${l?"":'<div class="sk-lock-icon">🔒</div>'}
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
    `,this._wireEvents()}_renderSkillDetail(e,t){var s;const a=Object.values(we).find(r=>r.name===this._selectedSkill);if(!a)return"";const o=a.talents||[];return`
      <div class="skill-detail-inner">
        <div class="sd-name">${a.name}</div>
        <div class="sd-type"><span class="sd-badge">${a.type}</span>${a.aoe?`<span class="sd-badge">${a.aoe}</span>`:""}</div>
        <div class="sd-desc">${a.description}</div>
        ${a.mpCost>0?`<div class="sd-cost">Mana Cost: <strong>${a.mpCost}</strong></div>`:""}
        ${a.damageStat?`<div class="sd-formula">Damage: ${a.damageMult}× ${a.damageStat.toUpperCase()} <span style="color:#8a7a6a">(formula: base × stat × ${a.damageMult})</span></div>`:""}
        ${a.healStat?`<div class="sd-formula">Heal: ${a.healMult}× ${a.healStat.toUpperCase()}</div>`:""}
        ${(s=a.statusEffects)!=null&&s.length?`
          <div class="sd-effects">
            ${a.statusEffects.map(r=>`<div class="sd-effect"><span class="eff-name">${r.type.toUpperCase()}</span> ${Math.round(r.chance*100)}% chance · ${r.duration} rounds</div>`).join("")}
          </div>
        `:""}
        ${o.length?`
          <div class="sd-talents-title">Upgrade Talents</div>
          <div class="sd-talents">
            ${o.map(r=>{const i=t[r.id];return`
                <div class="sd-talent${i?" purchased":""}">
                  <div class="sdt-info">
                    <div class="sdt-name">${r.name}</div>
                    <div class="sdt-desc">${r.desc}</div>
                  </div>
                  <button class="sdt-btn${i?" done":""}" data-talent="${r.id}" ${i?"disabled":""}>
                    ${i?"✓ Learned":"Learn (1 pt)"}
                  </button>
                </div>
              `}).join("")}
          </div>
        `:'<div style="color:#8a7a6a;font-size:0.8rem;margin-top:1rem">No upgrade talents available for this skill.</div>'}
      </div>
    `}_wireEvents(){var e,t;(e=this._el.querySelector("#skill-close"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(t=this._el.querySelector("#skill-back-mobile"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click"),this._mobileDetailView=!1,this._selectedSkill=null,this._render()}),this._el.querySelectorAll(".sct-tab").forEach(a=>{a.addEventListener("click",()=>{this.audio.playSfx("click"),this._selectedCharIdx=parseInt(a.dataset.idx),this._selectedSkill=null,this._mobileDetailView=!1,this._render()})}),this._el.querySelectorAll(".skill-row").forEach(a=>{a.addEventListener("click",()=>{a.classList.contains("locked")||(this.audio.playSfx("click"),this._selectedSkill=a.dataset.skill,this._mobileDetailView=!0,this._render())})}),this._el.querySelectorAll("[data-talent]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const s=u.get().party[this._selectedCharIdx];s&&(s.talentsPurchased||(s.talentsPurchased={}),s.talentsPurchased[a.dataset.talent]=!0,this.audio.playSfx("spell"),this._render())})})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const pt=`
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
`,gt=[{id:"q_border_roads",title:"Dangerous Roads",act:1,description:"The Border Roads are overrun with goblin patrols. Clear a path through to reach the Goblin Frontier.",objectives:[{text:"Reach the Border Roads",flagCheck:()=>!0},{text:"Defeat the Warlord's Vanguard",flagCheck:n=>(n.completedBosses||[]).includes("border_boss")}],reward:"Access to Thornwood Forest"},{id:"q_thornwood",title:"Into the Thornwood",act:1,description:"The forest has been corrupted by Veil energy. Seek out Mira the Seer and defeat the Veil Wardens.",objectives:[{text:"Reach Thornwood Forest",flagCheck:n=>(n.unlockedZones||[]).includes("thornwood")},{text:"Meet Mira the Seer",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}},{text:"Defeat the Veil Wardens",flagCheck:n=>(n.completedBosses||[]).includes("thornwood_boss")}],reward:"The Ashen Wastes opened (Act 2)"},{id:"q_seer_warning",title:"The Seer's Warning",act:1,description:"Mira the Seer spoke of an ancient rift in the Thornwood — a tear between realms pouring corruption into your world.",objectives:[{text:"Learn of the rift's origin",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.knows_rift_origin}},{text:"Speak with the Seer",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}}],reward:"Lore: Understanding the Emberveil",isLore:!0},{id:"q_ashen_wastes",title:"Through the Ashen Wastes",act:2,description:"The Ashen Wastes stretch south — volcanic flats controlled by Veil cultists and their summoned creatures. The cult is preparing a ritual.",objectives:[{text:"Reach the Ashen Wastes",flagCheck:n=>(n.unlockedZones||[]).includes("dust_roads")},{text:"Defeat the Lava Titan",flagCheck:n=>(n.completedBosses||[]).includes("dust_boss")},{text:"Reach the Ember Plateau",flagCheck:n=>(n.unlockedZones||[]).includes("ember_plateau")},{text:"Defeat the Veil High Priest",flagCheck:n=>(n.completedBosses||[]).includes("plateau_boss")}],reward:"Act 3: The Shattered Hell"},{id:"q_cult_of_the_veil",title:"The Veil Cultists' Purpose",act:2,description:'You have encountered Veil cultists throughout the Wastes. They speak of a "Convergence" — an event that will tear the boundary between realms forever.',objectives:[{text:"Encounter first Veil Cultist",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("dust"))},{text:"Find evidence of the ritual site",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.ritual_site_found}},{text:"Disrupt the Convergence ritual",flagCheck:n=>(n.completedBosses||[]).includes("plateau_boss")}],reward:"Lore: The Nature of the Emberveil",isLore:!0},{id:"q_descent_to_hell",title:"Descent into the Shattered Hell",act:3,description:"Beyond the Ember Plateau lies the Hell Breach — a torn rift into the demonic realm of the Shattered Hell. The corruption's source lies within.",objectives:[{text:"Find the Hell Breach",flagCheck:n=>(n.unlockedZones||[]).includes("hell_breach")},{text:"Survive the demon patrols",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("hell"))},{text:"Confront Archfiend Malgrath",flagCheck:n=>(n.completedBosses||[]).includes("malgrath")},{text:"Reach the Shattered Core",flagCheck:n=>(n.unlockedZones||[]).includes("shattered_core")}],reward:"The path to the Emberveil Sovereign"},{id:"q_end_of_worlds",title:"The Emberveil Sovereign",act:3,description:"At the heart of the Shattered Core sits the Emberveil Sovereign — the ancient entity tearing worlds apart. Only your party stands between it and total annihilation.",objectives:[{text:"Reach the Shattered Core",flagCheck:n=>(n.unlockedZones||[]).includes("shattered_core")},{text:"Defeat the Sovereign's Vanguard",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("shattered"))},{text:"Defeat the Emberveil Sovereign",flagCheck:n=>(n.completedBosses||[]).includes("sovereign")}],reward:"Victory — the Emberveil is sealed"}];class ft{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){I("quest-styles",bt),this._el=S("div","quest-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=u.get(),t=gt.map(a=>{const o=a.objectives.filter(m=>m.flagCheck(e)).length,s=a.objectives.length,r=o===s,i=o>0&&!r;if(!a.objectives[0].flagCheck(e)&&!r)return"";const d=r?"complete":i?"active":"available",h=r?"Complete":i?"In Progress":"Available",c={1:"#e8a020",2:"#c06020",3:"#a02080"};return`
        <div class="ql-quest ${d}">
          <div class="ql-q-header">
            <div class="ql-q-title">${a.title}</div>
            <div class="ql-q-badges">
              <span class="ql-act-badge" style="color:${c[a.act]||"#8a7a6a"}">Act ${a.act}</span>
              <span class="ql-status-badge ${d}">${h}</span>
              ${a.isLore?'<span class="ql-lore-badge">Lore</span>':""}
            </div>
          </div>
          <div class="ql-q-desc">${a.description}</div>
          <div class="ql-objectives">
            ${a.objectives.map(m=>{const v=m.flagCheck(e);return`<div class="ql-obj ${v?"done":""}">
                <div class="ql-obj-check">${v?"✓":"○"}</div>
                <div class="ql-obj-text">${m.text}</div>
              </div>`}).join("")}
          </div>
          <div class="ql-reward">Reward: <span>${a.reward}</span></div>
          <div class="ql-progress-bar">
            <div class="ql-progress-fill" style="width:${o/s*100}%"></div>
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
    `,this._el.querySelector("#ql-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const bt=`
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
`,te=[{id:"first_blood",name:"First Blood",icon:"⚔️",desc:"Win your first combat encounter.",check:n=>{var e,t;return((e=n.completedBosses)==null?void 0:e.length)>0||((t=n.storyFlags)==null?void 0:t.first_combat_won)}},{id:"boss_slayer",name:"Boss Slayer",icon:"💀",desc:"Defeat your first zone boss.",check:n=>{var e;return((e=n.completedBosses)==null?void 0:e.length)>=1}},{id:"act2_clear",name:"Into the Wastes",icon:"🔥",desc:"Reach the Ashen Wastes.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("dust_roads")}},{id:"act3_clear",name:"Hell Descends",icon:"👹",desc:"Enter the Shattered Hell.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("hell_breach")}},{id:"sovereign",name:"World Savior",icon:"🌟",desc:"Defeat the Emberveil Sovereign.",check:n=>{var e;return(e=n.completedBosses)==null?void 0:e.includes("core_boss")}},{id:"full_party",name:"Strength in Numbers",icon:"🛡️",desc:"Have a party of 4 heroes.",check:n=>{var e;return((e=n.party)==null?void 0:e.length)>=4}},{id:"companions",name:"Trusty Companions",icon:"🐾",desc:"Hire your first companion.",check:n=>{var e;return((e=n.companions)==null?void 0:e.length)>=1}},{id:"full_roster",name:"Full Retinue",icon:"👥",desc:"Have 4 heroes and 4 companions at once.",check:n=>{var e,t;return((e=n.party)==null?void 0:e.length)>=4&&((t=n.companions)==null?void 0:t.length)>=4}},{id:"rich",name:"Golden Touch",icon:"💰",desc:"Accumulate 1,000 gold.",check:n=>(n.gold||0)>=1e3},{id:"legendary_item",name:"Legendary Find",icon:"✨",desc:"Obtain a Legendary rarity item.",check:n=>{var e;return(e=n.inventory)==null?void 0:e.some(t=>t.rarity==="legendary")}},{id:"enchanted",name:"Enchanter's Patron",icon:"🔮",desc:"Use the Enchanter service.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.used_enchanter}},{id:"blacksmith",name:"Fine Craftsmanship",icon:"🔨",desc:"Upgrade an item at the Blacksmith.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.used_blacksmith}},{id:"noticed",name:"Making a Name",icon:"⭐",desc:"Reach 20 Fame.",check:n=>(n.fame||0)>=20},{id:"renowned",name:"Renowned Hero",icon:"🌠",desc:"Reach 250 Fame.",check:n=>(n.fame||0)>=250},{id:"legendary_fame",name:"Living Legend",icon:"👑",desc:"Reach 500 Fame.",check:n=>(n.fame||0)>=500},{id:"first_quest",name:"Quest Seeker",icon:"📜",desc:"Open the Quest Log.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.opened_quest_log}},{id:"seer_met",name:"Seeker of Truth",icon:"🔭",desc:"Meet Mira the Seer.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}},{id:"survived_defeat",name:"Brush with Death",icon:"💔",desc:"Be defeated in combat and live to tell the tale.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.survived_defeat}},{id:"level_10",name:"Seasoned Veteran",icon:"🎖️",desc:"Reach hero level 10.",check:n=>{var e;return(e=n.party)==null?void 0:e.some(t=>(t.level||1)>=10)}},{id:"act4_enter",name:"Cosmic Voyager",icon:"🌌",desc:"Enter the Cosmic Rift.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("cosmic_rift")}},{id:"void_boss",name:"The Unraveler Falls",icon:"✦",desc:"Defeat The Unraveler and seal the Eternal Void.",check:n=>{var e;return(e=n.completedBosses)==null?void 0:e.includes("void_boss")}},{id:"ng_plus",name:"New Game+",icon:"♾️",desc:"Begin a New Game+ run.",check:n=>(n.ngPlus||0)>=1},{id:"ng_plus_2",name:"Twice-Born Legend",icon:"⚡",desc:"Complete New Game+ twice.",check:n=>(n.ngPlus||0)>=2},{id:"codex_opened",name:"Lore Seeker",icon:"📖",desc:"Open the Codex.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.opened_codex}},{id:"forge_used",name:"The Forge Calls",icon:"⚒️",desc:"Salvage or craft an item at the Forge.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.used_forge}},{id:"challenge_done",name:"Daily Champion",icon:"⚡",desc:"Complete the Daily Challenge.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.challenge_complete}}],yt=`
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
`;class vt{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}onExit(){w(this._el),this._el=null}_build(){I("ach-styles",yt),this._el=S("div","ach-screen"),this.manager.uiOverlay.appendChild(this._el);const e=u.get();e.storyFlags.opened_quest_log||(e.storyFlags.opened_quest_log=!0);const t=te.filter(s=>s.check(e)),a=te.length,o=Math.round(t.length/a*100);this._el.innerHTML=`
      <div class="ach-header">
        <div>
          <div class="ach-title">Achievements</div>
          <div class="ach-subtitle">${t.length} / ${a} unlocked (${o}%)</div>
        </div>
        <button class="ach-close" id="ach-close">✕ Close</button>
      </div>
      <div class="ach-progress-bar">
        <div class="ach-progress-fill" style="width:${o}%"></div>
      </div>
      <div class="ach-grid">
        ${te.map(s=>{const r=s.check(e);return`
            <div class="ach-card ${r?"unlocked":"locked"}">
              <div class="ach-icon">${s.icon}</div>
              <div class="ach-info">
                <div class="ach-name">${s.name}</div>
                <div class="ach-desc">${s.desc}</div>
                ${r?'<div class="ach-badge">✓ Unlocked</div>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `,this._el.querySelector("#ach-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}}const _t=2,ae=n=>`emberveil_save_${n}`,z={getSlot(n){try{const e=localStorage.getItem(ae(n));if(!e)return null;const t=JSON.parse(e);return this.migrate(t)}catch{return null}},saveCurrentGame(n){var a,o,s,r,i,l,d,h;const e=u.toSaveData(),t={version:_t,timestamp:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),heroName:((o=(a=e.party)==null?void 0:a[0])==null?void 0:o.name)||"Unknown",class:((r=(s=e.party)==null?void 0:s[0])==null?void 0:r.className)||((l=(i=e.party)==null?void 0:i[0])==null?void 0:l.class)||"Hero",act:e.act||1,level:((h=(d=e.party)==null?void 0:d[0])==null?void 0:h.level)||1,...e};return localStorage.setItem(ae(n),JSON.stringify(t)),t},loadSlot(n){const e=this.getSlot(n);return e?(u.load(e),!0):!1},deleteSlot(n){localStorage.removeItem(ae(n))},getAllSlots(){return[0,1,2].map(n=>this.getSlot(n))},migrate(n){return(!n.version||n.version<2)&&(n.visitedNodes||(n.visitedNodes=["start"]),n.version=2),n}},wt=`
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
`;function xt(n){return{warrior:"⚔️",mage:"🔮",paladin:"🛡️",ranger:"🏹",rogue:"🗡️",cleric:"✝️",bard:"🎵",necromancer:"💀",companion:"🐾",druid:"🌿",monk:"👊",berserker:"💢",warlock:"👁️",shaman:"⚡"}[n.class]||"👤"}function kt(n){const e=Math.round((n.hp||0)/(n.maxHp||1)*100);return`HP: <span style="color:${e>60?"#60c060":e>30?"#e8c840":"#e06040"}">${n.hp??"?"}/${n.maxHp??"?"}</span>`}class Tt{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedA=null}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){w(this._el),this._el=null}_build(){I("party-screen-styles",wt),this._el=S("div","party-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){var t;const e=u.get();this._el.innerHTML=`
      <div class="ps-header">
        <div class="ps-title">Party Management</div>
        <button class="ps-close" id="ps-close">✕ Close</button>
      </div>
      <div class="ps-body">
        <div class="ps-section-title">Active Party (${e.party.length}/4)</div>
        <div class="ps-slots" id="ps-party-slots">
          ${e.party.map((a,o)=>this._slotHTML(a,"party",o)).join("")}
          ${e.party.length<4?'<div class="ps-slot ps-empty"><div class="ps-slot-icon">＋</div><div class="ps-slot-info" style="color:rgba(200,180,140,0.4)">Empty slot</div></div>':""}
        </div>

        ${e.companions.length>0?`
        <div class="ps-divider"></div>
        <div class="ps-section-title">Companions (${e.companions.length}/4)</div>
        <div class="ps-slots" id="ps-companion-slots">
          ${e.companions.map((a,o)=>this._slotHTML(a,"companions",o)).join("")}
        </div>`:""}

        <div class="ps-divider"></div>
        <div class="ps-section-title">Reserves (${e.bench.length})</div>
        <div class="ps-slots" id="ps-bench-slots">
          ${e.bench.length>0?e.bench.map((a,o)=>this._slotHTML(a,"bench",o)).join(""):'<div class="ps-hint">No reserves. Use "Stand Down" to send party members here.</div>'}
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
    `,this._wire()}_slotHTML(e,t,a){const o=this._selectedA&&this._selectedA.source===t&&this._selectedA.index===a,s=t==="bench"?"bench":t==="companions"?"companion":"active",r=u.get(),i=t==="party"&&r.party.length>1||t==="companions",l=e.isCompanion||e.class==="companion",d=t==="bench"&&(l?r.companions.length<4:r.party.length<4);return`<div class="ps-slot${o?" ps-selected":""}" data-source="${t}" data-index="${a}">
      <div class="ps-slot-icon">${xt(e)}</div>
      <div class="ps-slot-info">
        <div class="ps-slot-name">${e.name}</div>
        <div class="ps-slot-class">${e.class||"companion"} · Lv.${e.level||1}</div>
        <div class="ps-slot-stats">${kt(e)} · MP: ${e.mp??"?"}/${e.maxMp??"?"}</div>
      </div>
      <div class="ps-slot-actions">
        ${i?`<button class="ps-slot-btn dismiss" data-dismiss="${t}:${a}">Stand Down</button>`:""}
        ${d?`<button class="ps-slot-btn recruit" data-recruit="${a}">Call to Arms</button>`:""}
      </div>
      <div class="ps-slot-badge${t==="bench"?" bench":""}">${s}</div>
    </div>`}_wire(){this._el.querySelector("#ps-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".ps-slot[data-source]").forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.source,r=parseInt(o.dataset.index);this._onSlotClick(s,r)})}),this._el.querySelectorAll("[data-dismiss]").forEach(o=>{o.addEventListener("click",s=>{s.stopPropagation();const[r,i]=o.dataset.dismiss.split(":"),l=parseInt(i),d=u.get(),h=r==="party"?d.party:d.companions;if(r==="party"&&d.party.length<=1)return;const[c]=h.splice(l,1);d.bench=d.bench||[],d.bench.push(c),this._selectedA=null,this.audio.playSfx("click"),z.saveCurrentGame(0),this._render()})}),this._el.querySelectorAll("[data-recruit]").forEach(o=>{o.addEventListener("click",s=>{s.stopPropagation();const r=parseInt(o.dataset.recruit),i=u.get(),[l]=i.bench.splice(r,1);if(l.isCompanion||l.class==="companion"){if(i.companions.length>=4)return;i.companions.push(l)}else{if(i.party.length>=4)return;i.party.push(l)}this._selectedA=null,this.audio.playSfx("click"),z.saveCurrentGame(0),this._render()})});const e=this._el.querySelector("#ps-swap");e&&!e.disabled&&e.addEventListener("click",()=>this._doSwap());const t=this._el.querySelector("#ps-move-up");t&&!t.disabled&&t.addEventListener("click",()=>this._doMove(-1));const a=this._el.querySelector("#ps-move-down");a&&!a.disabled&&a.addEventListener("click",()=>this._doMove(1))}_onSlotClick(e,t){if(!this._selectedA)this._selectedA={source:e,index:t};else if(this._selectedA.source===e&&this._selectedA.index===t)this._selectedA=null;else{this._doSwapWith({source:e,index:t});return}this._render()}_getSelected(){if(!this._selectedA)return null;const e=u.get();return(this._selectedA.source==="party"?e.party:this._selectedA.source==="companions"?e.companions:e.bench)[this._selectedA.index]}_canSwap(){return this._selectedA!==null}_canMoveUp(){return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index>0}_canMoveDown(){const e=u.get();return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index<e.party.length-1}_doSwap(){const e=u.get();if(!this._selectedA||e.bench.length===0)return;const t=this._selectedA.source==="party"?e.party:e.companions,a=t[this._selectedA.index],o=e.bench[0];t[this._selectedA.index]=o,e.bench[0]=a,e.bench.splice(0,1,a),this._selectedA=null,this._render()}_doSwapWith(e){const t=u.get(),a=i=>i==="party"?t.party:i==="companions"?t.companions:t.bench,o=a(this._selectedA.source),s=a(e.source),r=o[this._selectedA.index];o[this._selectedA.index]=s[e.index],s[e.index]=r,t.party=t.party.filter(Boolean),t.companions=t.companions.filter(Boolean),this._selectedA=null,this._render()}_doMove(e){const t=u.get();if(!this._selectedA||this._selectedA.source!=="party")return;const a=this._selectedA.index,o=a+e;o<0||o>=t.party.length||([t.party[a],t.party[o]]=[t.party[o],t.party[a]],this._selectedA.index=o,this._render())}}const V=[{id:"the_emberveil",category:"World",title:"The Emberveil",icon:"🌋",unlock:()=>!0,body:`The Emberveil is a vast, interconnected weave of ley lines — invisible channels of raw magical energy that flow through the earth, the sky, and the space between worlds. For millennia it kept the world in balance, feeding life into the soil and binding the planes together.

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

When the Emberveil began to fail, most orders fractured or scattered. Individual practitioners still walk the roads — many finding their way to the frontier where the need is greatest.`}],St=`
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
`,Ct=["All",...new Set(V.map(n=>n.category))];class It{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._activeCategory="All",this._selectedId=null}onEnter(){this._build(),u.setFlag("opened_codex",!0)}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){w(this._el),this._el=null}_build(){I("codex-screen-styles",St),this._el=S("div","codex-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=u.get(),t=V.filter(r=>this._activeCategory==="All"||r.category===this._activeCategory);t.filter(r=>r.unlock(e));const a=this._selectedId?V.find(r=>r.id===this._selectedId):null,o=a&&a.unlock(e),s=V.filter(r=>r.unlock(e)).length;this._el.innerHTML=`
      <div class="codex-header">
        <div class="codex-title">✦ Codex</div>
        <button class="codex-close" id="cod-close">✕ Close</button>
      </div>
      <div class="codex-tabs">
        ${Ct.map(r=>`<button class="codex-tab${this._activeCategory===r?" active":""}" data-cat="${r}">${r}</button>`).join("")}
      </div>
      <div class="codex-body">
        <div class="codex-list">
          ${t.map(r=>{const i=!r.unlock(e);return`<div class="codex-entry-row${i?" locked":""}${this._selectedId===r.id?" active":""}" data-id="${r.id}">
              <div class="codex-entry-icon">${i?"🔒":r.icon}</div>
              <div class="codex-entry-name">${i?"???":r.title}</div>
            </div>`}).join("")}
        </div>
        <div class="codex-detail">
          ${a&&o?`
            <div class="codex-detail-category">${a.category}</div>
            <div class="codex-detail-title">${a.icon} ${a.title}</div>
            <div class="codex-detail-body">${a.body}</div>
          `:a&&!o?`
            <div class="codex-locked-msg">🔒 This entry has not yet been unlocked.<br>Continue your journey to discover more.</div>
          `:`
            <div class="codex-locked-msg">Select an entry from the list to read it.</div>
          `}
        </div>
      </div>
      <div class="codex-progress">${s} / ${V.length} entries unlocked</div>
    `,this._el.querySelector("#cod-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".codex-tab").forEach(r=>{r.addEventListener("click",()=>{this._activeCategory=r.dataset.cat,this._render()})}),this._el.querySelectorAll(".codex-entry-row:not(.locked)").forEach(r=>{r.addEventListener("click",()=>{this._selectedId=r.dataset.id,this._render()})})}}const Et=`
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
`;class At{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._tab="salvage",this._msg=""}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){w(this._el),this._el=null}_build(){I("forge-screen-styles",Et),this._el=S("div","forge-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=u.get(),t=u.getMaterials(),a=Object.values(Q).map(s=>{const r=t[s.id]||0;return`<div class="forge-mat-chip${r===0?" forge-mat-zero":""}">${s.icon} ${s.name}: <strong>${r}</strong></div>`}).join("");let o="";if(this._tab==="salvage"){const s=(e.inventory||[]).filter(r=>!r.equipped);s.length===0?o='<div class="forge-empty">No unequipped items to salvage.<br>Equip your best gear first, then return here.</div>':o=s.map(r=>{const i=N[r.rarity]||"#ccc",l={normal:"2-4 Iron Scrap",magic:"1-2 Scrap + 1-2 Essence",rare:"1-3 Essence + 1-2 Rare Dust",legendary:"1-2 Rare Dust + 1 Legend Core"}[r.rarity]||"";return`<div class="forge-inv-item" data-id="${r.id}">
            <div class="forge-inv-name">
              <div style="color:${i}">${r.name}</div>
              <div class="forge-inv-yield">Yields: ${l}</div>
            </div>
            <button class="forge-salvage-btn" data-salvage="${r.id}">Salvage</button>
          </div>`}).join("")}else o=he.map(s=>{const r=ue(s,t),i=Object.entries(s.materials).map(([l,d])=>{const h=t[l]||0,c=Q[l];return`<span class="${h>=d?"ok":"no"}">${(c==null?void 0:c.icon)||""} ${(c==null?void 0:c.name)||l}: ${h}/${d}</span>`});return`<div class="forge-recipe">
          <div class="forge-recipe-name">${s.name}</div>
          <div class="forge-recipe-cost">${i.join(" · ")}</div>
          <button class="forge-craft-btn" data-craft="${s.id}" ${r?"":"disabled"}>⚒ Craft</button>
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
      <div class="forge-body">${o}</div>
      ${this._msg?`<div class="forge-msg">${this._msg}</div>`:""}
    `,this._el.querySelector("#forge-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".forge-tab").forEach(s=>{s.addEventListener("click",()=>{this._tab=s.dataset.tab,this._msg="",this._render()})}),this._el.querySelectorAll("[data-salvage]").forEach(s=>{s.addEventListener("click",()=>this._doSalvage(s.dataset.salvage))}),this._el.querySelectorAll("[data-craft]").forEach(s=>{s.addEventListener("click",()=>this._doCraft(s.dataset.craft))})}_doSalvage(e){const a=(u.get().inventory||[]).find(r=>r.id===e);if(!a)return;const o=Qe(a);u.removeFromInventory(e),u.addMaterials(o),u.setFlag("used_forge",!0);const s=Object.entries(o).map(([r,i])=>{var l;return`${i}× ${((l=Q[r])==null?void 0:l.name)||r}`}).join(", ");this._msg=`Salvaged ${a.name} → ${s}`,this._render()}_doCraft(e){const t=he.find(s=>s.id===e);if(!t)return;const a=u.getMaterials();if(!ue(t,a))return;Je(t,a);const o=A(t.base,t.rarity,t.quality);o&&(u.addToInventory(o),this._msg=`Forged: ${o.name}!`,this.audio.playSfx("craft")),u.setFlag("used_forge",!0),this._render()}}const Mt=`
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
`;function Nt(n){let e=n>>>0;return()=>{e+=1831565813;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Lt(){const n=new Date;return n.getFullYear()*1e4+(n.getMonth()+1)*100+n.getDate()}function Te(){const n=new Date;return`emberveil_challenge_${n.getFullYear()}_${n.getMonth()+1}_${n.getDate()}`}const zt=[[{id:"goblin_scout",name:"Goblin Scout",count:4,hp:20,maxHp:20,dmg:[4,8],armor:1,hit:70,dodge:12,xpValue:20,gold:[5,10]}],[{id:"goblin_warrior",name:"Goblin Warrior",count:3,hp:35,maxHp:35,dmg:[8,16],armor:3,hit:75,dodge:8,xpValue:35,gold:[8,15]},{id:"goblin_scout",name:"Goblin Scout",count:2,hp:20,maxHp:20,dmg:[4,8],armor:1,hit:70,dodge:12,xpValue:20,gold:[5,10]}],[{id:"veil_cultist",name:"Veil Cultist",count:3,hp:55,maxHp:55,dmg:[12,22],armor:4,hit:78,dodge:10,xpValue:55,gold:[12,22]}],[{id:"ash_wraith",name:"Ash Wraith",count:2,hp:70,maxHp:70,dmg:[18,30],armor:5,hit:80,dodge:15,xpValue:70,gold:[15,28]},{id:"cinder_hound",name:"Cinder Hound",count:2,hp:60,maxHp:60,dmg:[14,24],armor:3,hit:82,dodge:10,xpValue:60,gold:[12,20]}],[{id:"grax",name:"Grax the Warlord",count:1,hp:280,maxHp:280,dmg:[25,45],armor:12,hit:80,dodge:8,xpValue:300,gold:[60,120]},{id:"goblin_warrior",name:"Goblin Warrior",count:2,hp:35,maxHp:35,dmg:[8,16],armor:3,hit:75,dodge:8,xpValue:35,gold:[8,15]}]];function $t(n){const e=Nt(n);return zt.map((t,a)=>{const o=t.map(s=>({...s,count:Math.max(1,s.count+(e()>.7?1:0)),hp:Math.round(s.hp*(.9+e()*.25)),maxHp:Math.round(s.hp*(.9+e()*.25))}));return{wave:a+1,enemies:o,name:["The Opening Wave","Rising Tide","The Cult Strikes","Shadows and Flame","The Warlord's Last Stand"][a]}})}function se(){try{return JSON.parse(localStorage.getItem(Te())||"[]")}catch{return[]}}function Pt(n,e,t){const a=se();a.push({name:n,score:e,waves:t,ts:Date.now()}),a.sort((o,s)=>s.score-o.score),localStorage.setItem(Te(),JSON.stringify(a.slice(0,20)))}class Ht{constructor(e,t){var i;this.manager=e,this.audio=t,this._el=null,this._seed=Lt(),this._waves=$t(this._seed),this._currentWave=0,this._wavesCleared=0,this._score=0,this._running=!1,this._done=!1;const a=se(),s=((i=u.get().hero)==null?void 0:i.name)||"Traveller",r=a.find(l=>l.name===s);r&&(this._done=!0,this._score=r.score,this._wavesCleared=r.waves)}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){var e;if(this._el&&(this._el.style.display="flex"),this._running){if(this._running=!1,this._wavesCleared++,this._score+=this._wavesCleared*100,this._wavesCleared>=this._waves.length){this._done=!0;const t=u.get();Pt(((e=t.hero)==null?void 0:e.name)||"Traveller",this._score,this._wavesCleared),u.setFlag("challenge_complete",!0),u.addFame(50)}this._render()}}onExit(){w(this._el),this._el=null}_build(){I("challenge-screen-styles",Mt),this._el=S("div","challenge-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){var r;const e=se(),t=this._seed,a=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),o=this._waves.map((i,l)=>{const d=l<this._wavesCleared,h=!this._done&&l===this._wavesCleared;return`<div class="chal-wave${d?" done":h?" current":""}">
        <div class="chal-wave-num">${d?"✓":h?"▶":l+1}</div>
        <div>${i.name} — ${i.enemies.map(c=>`${c.count}× ${c.name}`).join(", ")}</div>
      </div>`}).join(""),s=e.length===0?'<div style="font-size:0.75rem;color:rgba(150,170,220,0.4);text-align:center;padding:1rem">No scores recorded today yet.</div>':e.slice(0,10).map((i,l)=>{var c;const d=u.get(),h=i.name===(((c=d.hero)==null?void 0:c.name)||"Traveller");return`<div class="chal-score-row">
            <div class="chal-score-rank">#${l+1}</div>
            <div class="chal-score-name${h?" chal-you":""}">${i.name}</div>
            <div class="chal-score-pts${h?" chal-you":""}">${i.score} pts · ${i.waves}/${this._waves.length} waves</div>
          </div>`}).join("");this._el.innerHTML=`
      <div class="chal-header">
        <div class="chal-title">⚡ Daily Challenge</div>
        <button class="chal-close" id="chal-close">✕ Close</button>
      </div>
      <div class="chal-body">
        <div class="chal-card">
          <div class="chal-card-title">Today's Gauntlet — ${a}</div>
          <div class="chal-seed-label">SEED: ${t}</div>
          <div class="chal-waves">${o}</div>
          ${this._done?`<div class="chal-complete-banner">✓ Challenge Complete! Score: ${this._score} pts (${this._wavesCleared}/${this._waves.length} waves)</div>`:`<button class="chal-start-btn" id="chal-start">${this._wavesCleared>0?`⚡ Continue — Wave ${this._wavesCleared+1}`:"⚡ Begin Challenge"}</button>`}
        </div>
        <div class="chal-card">
          <div class="chal-card-title">Today's Leaderboard</div>
          ${s}
          <div style="margin-top:0.4rem" class="chal-info">Scores are stored locally. +100 pts per wave cleared, ×wave multiplier.</div>
        </div>
        <div class="chal-info" style="text-align:center">Challenge resets daily at midnight. All local scores visible.</div>
      </div>
    `,this._el.querySelector("#chal-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),(r=this._el.querySelector("#chal-start"))==null||r.addEventListener("click",()=>this._startNextWave())}_startNextWave(){const e=this._waves[this._wavesCleared];if(!e)return;this._running=!0;const t={enemies:e.enemies,_zoneId:"border_roads",_bossNodeId:this._wavesCleared===this._waves.length-1?"challenge_final":null,isChallengeMode:!0};this.manager.push(new O(this.manager,this.audio,t))}}const Dt=["STR","DEX","INT","CON"],Bt=10,B=8,Rt=100,qt=15;class Yt{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._name="",this._class=null,this._attrs={STR:B,DEX:B,INT:B,CON:B},this._pointsSpent=0,this._step="class"}get _pointsLeft(){return Bt-this._pointsSpent}_hireCost(){return Rt+this._pointsSpent*qt}onEnter(){I("hire-builder-styles",Ot),this._el=S("div","hb-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML="",this._step==="class"?this._renderClassStep():this._renderStatsStep()}_renderClassStep(){var t;this._el.innerHTML=`
      <div class="hb-header">
        <div class="hb-title">Hire a Mercenary</div>
        <div class="hb-subtitle">Choose class — cost: ${this._hireCost()} gold (increases with attributes)</div>
      </div>
      <div class="hb-class-grid" id="hb-class-grid"></div>
      <div class="hb-footer">
        <button class="hb-btn hb-btn-ghost" id="hb-cancel">✕ Cancel</button>
        <button class="hb-btn hb-btn-primary" id="hb-next" disabled>Next →</button>
      </div>
    `;const e=this._el.querySelector("#hb-class-grid");for(const a of re){const o=S("div",`hb-class-card${((t=this._class)==null?void 0:t.id)===a.id?" selected":""}`);o.innerHTML=`<div class="hb-cls-name">${a.name}</div><div class="hb-cls-role">${a.role}</div>`,o.addEventListener("click",()=>{this._class=a,this._el.querySelectorAll(".hb-class-card").forEach(s=>s.classList.remove("selected")),o.classList.add("selected"),this._el.querySelector("#hb-next").disabled=!1}),e.appendChild(o)}this._el.querySelector("#hb-cancel").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelector("#hb-next").addEventListener("click",()=>{this._class&&(this.audio.playSfx("click"),this._step="stats",this._render())})}_renderStatsStep(){const e=this._class,t=this._hireCost(),o=u.getGold()>=t;this._el.innerHTML=`
      <div class="hb-header">
        <div class="hb-title">${e.name} Mercenary</div>
        <div class="hb-subtitle">${this._pointsLeft} attribute points remaining · <span class="hb-cost-tag${o?"":" hb-cost-warn"}">Hire Cost: ${t} gold</span></div>
      </div>
      <div class="hb-stats-wrap">
        <div class="hb-name-row">
          <label class="hb-label">Name</label>
          <input class="hb-name-input" id="hb-name" type="text" maxlength="16" placeholder="Mercenary name..." value="${this._name}">
        </div>
        <div class="hb-attrs" id="hb-attrs">
          ${Dt.map(s=>`
            <div class="hb-attr-row">
              <div class="hb-attr-label">${s}</div>
              <button class="hb-attr-btn hb-attr-dec" data-attr="${s}" ${this._attrs[s]<=B?"disabled":""}>−</button>
              <div class="hb-attr-val">${this._attrs[s]}</div>
              <button class="hb-attr-btn hb-attr-inc" data-attr="${s}" ${this._pointsLeft<=0?"disabled":""}>+</button>
            </div>
          `).join("")}
        </div>
        <div class="hb-class-preview">
          <div class="hb-cls-desc">${e.description||e.role}</div>
        </div>
      </div>
      <div class="hb-footer">
        <button class="hb-btn hb-btn-ghost" id="hb-back">← Back</button>
        <button class="hb-btn hb-btn-primary${o?"":" disabled"}" id="hb-hire" ${o?"":"disabled"}>Hire (${t} G)</button>
      </div>
    `,this._el.querySelector("#hb-name").addEventListener("input",s=>{this._name=s.target.value}),this._el.querySelector("#hb-back").addEventListener("click",()=>{this.audio.playSfx("click"),this._step="class",this._render()}),this._el.querySelectorAll(".hb-attr-inc").forEach(s=>{s.addEventListener("click",()=>{if(this._pointsLeft<=0)return;const r=s.dataset.attr;this._attrs[r]++,this._pointsSpent++,this.audio.playSfx("click"),this._render()})}),this._el.querySelectorAll(".hb-attr-dec").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.attr;this._attrs[r]<=B||(this._attrs[r]--,this._pointsSpent--,this.audio.playSfx("click"),this._render())})}),this._el.querySelector("#hb-hire").addEventListener("click",()=>{const s=this._el.querySelector("#hb-name").value.trim()||`${e.name} Merc`,r=this._hireCost();if(u.getGold()<r)return;this.audio.playSfx("purchase"),u.addGold(-r);const l=u.get(),d={id:`merc_${Date.now()}`,name:s,class:e.id,className:e.name,level:1,hp:50+this._attrs.CON*10,maxHp:50+this._attrs.CON*10,mp:30+this._attrs.INT*8,maxMp:30+this._attrs.INT*8,attrs:{...this._attrs},equipment:{},xp:0,xpToNext:100,pendingAttrPoints:0};let h=!1;if(l.party.length<4?l.party.push(d):(l.bench=l.bench||[],l.bench.push(d),h=!0),this.manager.pop(),h){const c=this.manager.uiOverlay;if(c){if(!document.getElementById("town-toast-keyframes")){const v=document.createElement("style");v.id="town-toast-keyframes",v.textContent="@keyframes town-toast-fade{0%{opacity:1}70%{opacity:1}100%{opacity:0}}",document.head.appendChild(v)}const m=document.createElement("div");m.style.cssText="position:absolute;bottom:5rem;left:50%;transform:translateX(-50%);background:rgba(20,12,28,0.95);border:1px solid rgba(232,200,64,0.4);color:#e8c840;padding:0.5rem 1rem;border-radius:6px;font-size:0.78rem;pointer-events:none;z-index:100;max-width:90%;text-align:center;animation:town-toast-fade 3s ease-out forwards",m.textContent=`Party full — ${d.name} sent to reserves. Manage your party to swap them in.`,c.appendChild(m),setTimeout(()=>m.remove(),3200)}}})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const Ot=`
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
`,ge={1:{name:"Emberglen",actLabel:"Act I · The Goblin Frontier",services:["merchant","tavern","cleric"]},2:{name:"Ashfort",actLabel:"Act II · The Ashen Wastes",services:["merchant","tavern","cleric","blacksmith"]},3:{name:"Ironhold Bastion",actLabel:"Act III · The Hell Breach",services:["merchant","tavern","cleric","blacksmith","enchanter"]},4:{name:"Starfall Haven",actLabel:"Act IV · The Cosmic Void",services:["merchant","tavern","cleric","blacksmith","enchanter"]},5:{name:"The Last Bastion",actLabel:"Act V · The Primordial Abyss",services:["merchant","tavern","cleric","blacksmith","enchanter"]}};function oe(){const n=u.get().act||1;return ge[n]||ge[1]}function Se(){const n=u.get(),e=[];for(const t of[...n.party,...n.companions,...n.bench])(t.pendingAttrPoints||0)>0&&e.push({name:t.name,type:"attr",count:t.pendingAttrPoints}),(t.pendingSkillPoints||0)>0&&e.push({name:t.name,type:"skill",count:t.pendingSkillPoints});return e}function R(){return Se().reduce((n,e)=>n+e.count,0)}const fe=[{id:"aela",name:"Aela",className:"Ranger",class:"ranger",level:1,cost:80,attrs:{STR:8,DEX:14,INT:8,CON:10},personality:"patient",description:"A quiet ranger from the eastern border. Waits for the perfect shot.",personalityNote:"Patient — prefers precise strikes over rushing in."},{id:"borin",name:"Borin",className:"Warrior",class:"warrior",level:1,cost:90,attrs:{STR:14,DEX:8,INT:6,CON:12},personality:"aggressive",description:"Retired soldier. Bored. Wants one last fight.",personalityNote:"Aggressive — always targets the strongest enemy first."},{id:"lysa",name:"Lysa",className:"Cleric",class:"cleric",level:2,cost:120,attrs:{STR:8,DEX:8,INT:14,CON:10},personality:"protective",description:"Young cleric of the Light. Eager to prove herself outside the temple.",personalityNote:"Protective — prioritizes healing injured allies."},{id:"rekk",name:"Rekk",className:"Rogue",class:"rogue",level:1,cost:70,attrs:{STR:8,DEX:14,INT:9,CON:9},personality:"opportunist",description:"Says he's not a thief. Has three knives.",personalityNote:"Opportunist — strikes weakened enemies to finish them."}],be=[{id:"war_dog",name:"War Dog",className:"Companion",class:"companion",level:1,cost:50,isCompanion:!0,attrs:{STR:10,DEX:12,INT:2,CON:10},description:"Loyal, fierce, and surprisingly effective against goblins. Bites hard."}];function Vt(){return[A("sword","normal","medium"),A("dagger","normal","medium"),A("staff","magic","medium"),A("bow","normal","medium"),A("light_chest","normal","medium"),A("cloth_chest","magic","medium"),A("heavy_helm","normal","low"),A("light_legs","normal","medium"),A("ring","magic","medium"),A("necklace","magic","medium")]}class Ce{constructor(e,t,a,o=!1){this.manager=e,this.audio=t,this.isNewGame=o,this._el=null,this._activeService=null,this._merchantStock=Vt(),this._tooltip=null,a!=null&&a.party||a&&u.init(a)}onEnter(){this.audio.playTownMusic(),this._build()}_build(){I("town-styles",Ft),this._el=S("div","town-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){u.get().party[0];const t=u.getGold();this._el.innerHTML=`
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
              <div class="town-region-tag">${oe().actLabel}</div>
              <div class="town-name">${oe().name}</div>
            </div>
            <div class="gold-display" style="flex-direction:column;align-items:flex-end;gap:0.2rem">
              <div style="display:flex;align-items:center;gap:0.35rem">
                <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="9" fill="#e8a020"/><text x="10" y="14" text-anchor="middle" font-size="11" fill="#0a0608" font-weight="900">G</text></svg>
                <span id="gold-amount">${t.toLocaleString()}</span>
              </div>
              <div style="font-size:0.62rem;color:#8a7a6a">${u.getFame()} Fame · ${u.getFameTitle()}${u.getNgPlus()>0?` · <span style="color:#e8d020">NG+${u.getNgPlus()}</span>`:""}</div>
            </div>
          </div>

          ${this.isNewGame?`<div class="welcome-banner">
            <div class="wb-title">Welcome to Emberglen</div>
            <div class="wb-text">The village elder speaks of goblin raids growing bolder at the border. Before setting out, seek allies — the road ahead is not safe alone.</div>
          </div>`:""}

          <div class="service-tabs">
            ${oe().services.map(a=>`<button class="svc-tab${this._activeService===a?" active":""}" data-svc="${a}">${a[0].toUpperCase()+a.slice(1)}</button>`).join("")}
          </div>
          <div class="service-panel" id="service-panel">
            ${this._renderServiceContent()}
          </div>
        </main>

        <!-- RIGHT: Actions -->
        <aside class="town-actions-panel">
          <button class="action-btn action-primary" id="btn-map">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M1 6l7-3 8 4 7-3v14l-7 3-8-4-7 3V6z"/><path d="M8 3v14M16 7v14"/></svg>
            View Map${R()>0?` <span class="notif-badge">${R()}</span>`:""}
          </button>
          ${u.getPortal()?'<button class="action-btn action-portal" id="btn-portal">✦ Return to Portal</button>':""}
          <button class="action-btn" id="btn-inventory">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 00-4 0v2"/></svg>
            Inventory
          </button>
          <button class="action-btn" id="btn-skills">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M12 2l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>
            Skills
            ${R()>0?`<span class="notif-badge">${R()}</span>`:""}
          </button>
          ${R()>0?`<button class="action-btn action-notif" id="btn-notifs">
            <span class="notif-badge-inline">${R()}</span>
            Pending Upgrades
          </button>`:""}
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
    `,this._renderPartyPanel(),this._wireEvents()}_renderPartyPanel(){const e=u.get(),t=this._el.querySelector("#party-slots"),a=this._el.querySelector("#companion-slots");for(let o=0;o<4;o++){const s=e.party[o],r=S("div",`party-slot${s?"":" empty"}`);s?(50+s.attrs.CON*10,r.innerHTML=`
          <div class="ps-icon">${this._getClassSvg(s.class)}</div>
          <div class="ps-info">
            <div class="ps-name">${s.name}</div>
            <div class="ps-class">${s.className||s.class} Lv${s.level}</div>
            <div class="ps-hp-bar"><div class="ps-hp-fill" style="width:100%"></div></div>
          </div>
        `):r.innerHTML='<div class="ps-empty">Empty</div>',t.appendChild(r)}for(let o=0;o<4;o++){const s=e.companions[o],r=S("div",`party-slot${s?"":" empty"}`);s?r.innerHTML=`<div class="ps-icon">🐾</div><div class="ps-info"><div class="ps-name">${s.name}</div><div class="ps-class">${s.className}</div></div>`:r.innerHTML='<div class="ps-empty">Empty</div>',a.appendChild(r)}}_renderServiceContent(){switch(this._activeService){case"merchant":return this._merchantHTML();case"tavern":return this._tavernHTML();case"cleric":return this._clericHTML();case"blacksmith":return this._blacksmithHTML();case"enchanter":return this._enchanterHTML();default:return this._townOverviewHTML()}}_townOverviewHTML(){return`
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
    `}_merchantHTML(){const e=u.get();return`
      <div class="merchant-layout">
        <div class="merchant-stock">
          <div class="svc-section-title">For Sale</div>
          <div class="item-grid" id="merchant-items">
            ${this._merchantStock.map(t=>`
              <div class="item-card" data-id="${t.id}" data-section="buy">
                <div class="ic-name" style="color:${N[t.rarity]}">${t.name}</div>
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
            ${me.map(t=>`
              <div class="potion-card">
                <div class="pc-icon">${t.icon}</div>
                <div class="pc-info">
                  <div class="pc-name">${t.name}</div>
                  <div class="pc-desc">${t.desc}</div>
                </div>
                <button class="hire-btn pc-buy${u.getGold()>=t.cost?"":" disabled"}" data-buy-potion="${t.id}" data-cost="${t.cost}" ${u.getGold()>=t.cost?"":"disabled"}>${t.cost} G</button>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="merchant-inventory">
          <div class="svc-section-title">Your Inventory (${e.inventory.length} items)</div>
          <div class="item-grid" id="inventory-items">
            ${e.inventory.length===0?'<div class="empty-state">No items to sell.</div>':e.inventory.map(t=>`
                <div class="item-card" data-id="${t.id}" data-section="sell">
                  <div class="ic-name" style="color:${N[t.rarity]}">${t.name}</div>
                  <div class="ic-type">${t.subtype||t.type}</div>
                  <div class="ic-price">Sell: ${Math.floor(this._itemPrice(t)*.4)} G</div>
                </div>
              `).join("")}
          </div>
        </div>
      </div>
    `}_itemPrice(e){const t={low:.5,medium:1,high:1.5,elite:2.5,exotic:4},a={normal:1,magic:2,rare:4,legendary:10};return Math.round(15*(t[e.quality]||1)*(a[e.rarity]||1))}_tavernHTML(){const e=u.get(),t=u.getGold();return`
      <div class="tavern-layout">
        <div class="svc-section-title">Heroes for Hire</div>
        <div class="hireable-list">
          ${fe.map(a=>{const o=e.party.find(i=>i.id===a.id),s=e.bench.find(i=>i.id===a.id),r=t>=a.cost;return`
              <div class="hireable-card${o||s?" hired":""}">
                <div class="hc-portrait">${this._getClassSvg(a.class)}</div>
                <div class="hc-info">
                  <div class="hc-name">${a.name} <span class="hc-class">${a.className} Lv${a.level}</span></div>
                  <div class="hc-desc">${a.description}</div>
                  ${a.personalityNote?`<div class="hc-personality">🎭 ${a.personalityNote}</div>`:""}
                  <div class="hc-attrs">STR ${a.attrs.STR} · DEX ${a.attrs.DEX} · INT ${a.attrs.INT} · CON ${a.attrs.CON}</div>
                </div>
                <div class="hc-action">
                  ${o?'<span class="hired-badge">In Party</span>':s?'<span class="hired-badge">At Bench</span>':`<button class="hire-btn${r?"":" disabled"}" data-hire="${a.id}" data-cost="${a.cost}" ${r?"":"disabled"}>
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
          ${be.map(a=>{const o=e.companions.find(r=>r.id===a.id),s=t>=a.cost;return`
              <div class="hireable-card${o?" hired":""}">
                <div class="hc-portrait"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="6"/><path d="M8 32c0-6 4-10 10-10s10 4 10 10"/></svg></div>
                <div class="hc-info">
                  <div class="hc-name">${a.name} <span class="hc-class">${a.className}</span></div>
                  <div class="hc-desc">${a.description}</div>
                </div>
                <div class="hc-action">
                  ${o?'<span class="hired-badge">Purchased</span>':`<button class="hire-btn${s?"":" disabled"}" data-hire="${a.id}" data-cost="${a.cost}" data-companion="true" ${s?"":"disabled"}>
                      Buy <br><small>${a.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}_clericHTML(){const e=u.get(),t=[...e.party,...e.companions],a=t.filter(d=>d.hp<=0||d.dead),o=t.filter(d=>d.hp>0&&d.hp<(d.maxHp||100)),s=u.getGold(),r=50,i=Math.max(10,o.length*15),l=o.length===0&&a.length===0;return`
      <div class="cleric-layout">
        <div class="svc-section-title">Cleric of the Light — Services</div>
        <!-- Rest / Heal -->
        <div class="cleric-service-block">
          <div class="csb-title">Rest &amp; Recover</div>
          <div class="csb-desc">${l?"Your party is fully healed and rested.":`Restore all HP and MP for ${i} gold.`}</div>
          ${l?"":`<button class="hire-btn${s>=i?"":" disabled"}" id="btn-rest" ${s>=i?"":"disabled"}>
            Rest (${i} G)
          </button>`}
        </div>
        <!-- Revive -->
        <div class="svc-section-title" style="margin-top:1rem">Revive — ${r} G per hero</div>
        ${a.length===0?'<div class="empty-state" style="padding:1rem;text-align:center;color:#8a7a6a">All party members are alive.</div>':a.map(d=>`
            <div class="hireable-card">
              <div class="hc-portrait">${this._getClassSvg(d.class)}</div>
              <div class="hc-info">
                <div class="hc-name">${d.name}</div>
                <div class="hc-desc" style="color:#c04030">Has fallen in battle.</div>
              </div>
              <div class="hc-action">
                <button class="hire-btn${s>=r?"":" disabled"}" data-revive="${d.id}" ${s>=r?"":"disabled"}>
                  Revive<br><small>${r} G</small>
                </button>
              </div>
            </div>
          `).join("")}
        <div class="cleric-note" style="margin-top:0.5rem">Reviving restores a fallen hero to 25% HP.</div>
      </div>
    `}_showSaveModal(){const e=S("div","save-modal");if(e.innerHTML=`
      <div class="sm-overlay"></div>
      <div class="sm-box">
        <div class="sm-title">Save Game</div>
        <div class="sm-slots">
          ${[0,1,2].map(t=>{const a=z.getSlot(t);return`<button class="sm-slot-btn" data-slot="${t}">
              <span class="smsb-num">Slot ${t+1}</span>
              <span class="smsb-info">${a?`${a.heroName} · Lv${a.level}`:"Empty"}</span>
            </button>`}).join("")}
        </div>
        <button class="sm-cancel" id="sm-cancel">Cancel</button>
      </div>
    `,e.querySelector("#sm-cancel").addEventListener("click",()=>w(e)),e.querySelector(".sm-overlay").addEventListener("click",()=>w(e)),e.querySelectorAll(".sm-slot-btn").forEach(t=>{t.addEventListener("click",()=>{z.saveCurrentGame(parseInt(t.dataset.slot)),this.audio.playSfx("victory"),w(e),this._showNotif("Game saved!")})}),this.manager.uiOverlay.appendChild(e),!document.getElementById("save-modal-styles")){const t=document.createElement("style");t.id="save-modal-styles",t.textContent=".save-modal{position:absolute;inset:0;z-index:500;display:flex;align-items:center;justify-content:center}.sm-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.75)}.sm-box{position:relative;z-index:1;background:#1a1218;border:1px solid rgba(232,160,32,0.3);border-radius:12px;padding:2rem;min-width:280px;max-width:340px;width:90%}.sm-title{font-family:'Cinzel',serif;font-size:1.2rem;font-weight:700;color:#e8a020;margin-bottom:1.25rem;text-align:center}.sm-slots{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.25rem}.sm-slot-btn{display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:rgba(26,18,24,0.9);border:1px solid rgba(232,160,32,0.15);border-radius:6px;color:#f0e8d8;cursor:pointer;min-height:48px;transition:border-color 0.15s}.sm-slot-btn:hover{border-color:rgba(232,160,32,0.5)}.smsb-num{font-size:0.75rem;color:#8a7a6a}.smsb-info{font-size:0.82rem;font-family:'Cinzel',serif;font-weight:600}.sm-cancel{width:100%;padding:0.65rem;background:none;border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#8a7a6a;cursor:pointer;font-size:0.82rem}.sm-cancel:hover{color:#f0e8d8}",document.head.appendChild(t)}}_showNotif(e){const t=S("div","save-notif");t.textContent=e,t.style.cssText="position:absolute;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(232,160,32,0.9);color:#0a0608;padding:0.5rem 1.25rem;border-radius:20px;font-weight:700;font-size:0.85rem;z-index:600;pointer-events:none;animation:notifIn 0.3s ease";const a=document.createElement("style");a.textContent="@keyframes notifIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}",document.head.appendChild(a),this._el.appendChild(t),setTimeout(()=>w(t),2e3)}_blacksmithHTML(){const t=u.get().inventory.filter(i=>i.rarity!=="legendary"&&i.quality!=="exotic"),a=["normal","magic","rare","legendary"],o=["low","medium","high","elite","exotic"],s={normal:60,magic:150,rare:400},r={low:40,medium:100,high:250,elite:600};return t.length?`
      <div class="bs-panel">
        <div class="bs-title">Blacksmith — Forged in Ember</div>
        <div class="bs-subtitle">Upgrade the rarity or quality of your equipment.</div>
        <div class="bs-items" id="bs-items">
          ${t.map(i=>{const l=a[a.indexOf(i.rarity)+1],d=o[o.indexOf(i.quality)+1],h=l?s[i.rarity]:null,c=d?r[i.quality]:null;return`
              <div class="bs-item">
                <div class="bs-iname" style="color:${N[i.rarity]}">${i.name}</div>
                <div class="bs-isub">${i.rarity} · ${i.quality}</div>
                <div class="bs-actions">
                  ${h?`<button class="bs-btn" data-action="rarity" data-id="${i.id}" data-cost="${h}" data-next="${l}">
                    Upgrade to <strong>${l}</strong> — ${h}g
                  </button>`:'<span class="bs-maxed">Max Rarity</span>'}
                  ${c?`<button class="bs-btn" data-action="quality" data-id="${i.id}" data-cost="${c}" data-next="${d}">
                    Upgrade to <strong>${d}</strong> quality — ${c}g
                  </button>`:'<span class="bs-maxed">Max Quality</span>'}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:'<div class="coming-soon"><div class="cs-title">Blacksmith</div><div class="cs-text">No upgradeable items in your inventory.</div></div>'}_enchanterHTML(){const t=u.get().inventory.filter(s=>{var i;const r=s.rarity==="legendary"?6:s.rarity==="rare"?4:s.rarity==="magic"?2:0;return r>0&&(((i=s.affixes)==null?void 0:i.length)||0)<r}),a={magic:80,rare:200,legendary:500},o=[{id:"of_str",name:"Sturdy +STR",stat:"str",min:2,max:5},{id:"of_dex",name:"Swift +DEX",stat:"dex",min:2,max:5},{id:"of_int",name:"Wise +INT",stat:"int",min:2,max:5},{id:"of_con",name:"Hardy +CON",stat:"con",min:2,max:5},{id:"of_hp",name:"Vitality +HP",stat:"hp",min:10,max:25},{id:"of_armor",name:"Reinforced +Armor",stat:"armor",min:2,max:5}];return t.length?`
      <div class="bs-panel">
        <div class="bs-title">Enchanter — Threads of Power</div>
        <div class="bs-subtitle">Add a new enchantment to an item with open affix slots.</div>
        <div class="bs-items" id="enc-items">
          ${t.map(s=>{var h;const r=a[s.rarity]||100,l=(s.rarity==="legendary"?6:s.rarity==="rare"?4:2)-(((h=s.affixes)==null?void 0:h.length)||0),d=o.filter(c=>{var m;return!((m=s.affixes)!=null&&m.find(v=>v.id===c.id))});return`
              <div class="bs-item">
                <div class="bs-iname" style="color:${N[s.rarity]}">${s.name}</div>
                <div class="bs-isub">${s.rarity} · ${l} open slot${l!==1?"s":""}</div>
                <div class="enc-affixes">
                  ${d.map(c=>`
                    <button class="bs-btn enc-btn" data-action="enchant" data-iid="${s.id}" data-aid="${c.id}" data-cost="${r}">
                      ${c.name} — ${r}g
                    </button>
                  `).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:'<div class="coming-soon"><div class="cs-title">Enchanter</div><div class="cs-text">No enchantable items (need Magic, Rare, or Legendary rarity with open affix slots).</div></div>'}_getClassSvg(e){const t=re.find(a=>a.id===e);return(t==null?void 0:t.svgIcon)||'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="18" r="12"/></svg>'}_wireEvents(){var e,t,a,o,s,r,i,l,d,h,c,m,v;this._el.querySelectorAll(".svc-tab").forEach(p=>{p.addEventListener("click",()=>{this.audio.playSfx("click");const y=p.dataset.svc;this._activeService=this._activeService===y?null:y,this._refreshServicePanel()})}),this._el.querySelectorAll(".overview-card").forEach(p=>{p.addEventListener("click",()=>{this.audio.playSfx("click"),this._activeService=p.dataset.svc,this._refreshServicePanel()})}),(e=this._el.querySelector("#btn-map"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ee(this.manager,this.audio))}),(t=this._el.querySelector("#btn-portal"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click");const p=u.getPortal();if(p){const y=u.get();y.zoneId=p.zoneId,y.nodeId=p.nodeId,this.manager.push(new ee(this.manager,this.audio))}}),(a=this._el.querySelector("#btn-leave"))==null||a.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ee(this.manager,this.audio))}),(o=this._el.querySelector("#btn-inventory"))==null||o.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ht(this.manager,this.audio))}),(s=this._el.querySelector("#btn-skills"))==null||s.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new mt(this.manager,this.audio))}),(r=this._el.querySelector("#btn-save"))==null||r.addEventListener("click",()=>{this.audio.playSfx("click"),this._showSaveModal()}),(i=this._el.querySelector("#btn-journal"))==null||i.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ft(this.manager,this.audio))}),(l=this._el.querySelector("#btn-achievements"))==null||l.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new vt(this.manager,this.audio))}),(d=this._el.querySelector("#btn-party"))==null||d.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Tt(this.manager,this.audio))}),(h=this._el.querySelector("#btn-codex"))==null||h.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new It(this.manager,this.audio))}),(c=this._el.querySelector("#btn-forge"))==null||c.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new At(this.manager,this.audio))}),(m=this._el.querySelector("#btn-challenge"))==null||m.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Ht(this.manager,this.audio))}),(v=this._el.querySelector("#btn-notifs"))==null||v.addEventListener("click",()=>{this.audio.playSfx("click"),this._showNotificationSummary()}),this._wireServiceEvents()}_wireServiceEvents(){var e,t;this._el.querySelectorAll('[data-section="buy"]').forEach(a=>{a.addEventListener("click",()=>{const o=this._merchantStock.find(r=>r.id===a.dataset.id);if(!o)return;const s=this._itemPrice(o);u.getGold()<s||(u.addGold(-s),u.addToInventory(o),this._merchantStock=this._merchantStock.filter(r=>r.id!==o.id),this.audio.playSfx("click"),this._refreshAll())}),a.addEventListener("mouseenter",o=>this._showTooltip(o,a.dataset.id,"stock")),a.addEventListener("mouseleave",()=>this._hideTooltip())}),this._el.querySelectorAll("[data-buy-potion]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const o=a.dataset.buyPotion,s=parseInt(a.dataset.cost);if(u.getGold()<s)return;const r=me.find(l=>l.id===o);if(!r)return;u.addGold(-s);const i=u.get();i.potions||(i.potions=[]),i.potions.push({...r,uid:crypto.randomUUID()}),this.audio.playSfx("purchase"),this._refreshAll()})}),this._el.querySelectorAll('[data-section="sell"]').forEach(a=>{a.addEventListener("click",()=>{const s=u.get().inventory.find(r=>r.id===a.dataset.id);s&&(u.addGold(Math.floor(this._itemPrice(s)*.4)),u.removeFromInventory(s.id),this.audio.playSfx("click"),this._refreshAll())})}),this._el.querySelectorAll("[data-hire]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const o=a.dataset.hire,s=parseInt(a.dataset.cost),r=a.dataset.companion==="true";this.audio.playSfx("click");const i=r?be.find(h=>h.id===o):fe.find(h=>h.id===o);if(!i||u.getGold()<s)return;u.addGold(-s);const l={...i,id:i.id+"_"+Date.now(),hp:50+i.attrs.CON*10,maxHp:50+i.attrs.CON*10,mp:30+i.attrs.INT*8,maxMp:30+i.attrs.INT*8,xp:0,pendingAttrPoints:0,equipment:{},skills:[]};let d=!1;r?u.addToCompanions(l)||(u.addToBench(l),d=!0):u.addToParty(l)||(u.addToBench(l),d=!0),this._refreshAll(),d&&this._showToast(`Party full — ${l.name} sent to reserves. Manage your party to swap them in.`)})}),(e=this._el.querySelector("#btn-custom-hire"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Yt(this.manager,this.audio))}),this._el.querySelectorAll('.bs-btn[data-action="rarity"]').forEach(a=>{a.addEventListener("click",()=>{const s=u.get().inventory.find(i=>i.id===a.dataset.id),r=parseInt(a.dataset.cost);!s||u.getGold()<r||(u.addGold(-r),s.rarity=a.dataset.next,this.audio.playSfx("click"),this._refreshAll())})}),this._el.querySelectorAll('.bs-btn[data-action="quality"]').forEach(a=>{a.addEventListener("click",()=>{const s=u.get().inventory.find(c=>c.id===a.dataset.id),r=parseInt(a.dataset.cost);if(!s||u.getGold()<r)return;u.addGold(-r),s.quality=a.dataset.next;const i=["low","medium","high","elite","exotic"],l=i.indexOf(s.quality===a.dataset.next?i[i.indexOf(a.dataset.next)-1]:s.quality),d=i.indexOf(a.dataset.next),h=[.7,1,1.2,1.4,1.6][d]/[.7,1,1.2,1.4,1.6][l];s.armor&&(s.armor=Math.round(s.armor*h)),s.dmg&&(s.dmg=s.dmg.map(c=>Math.round(c*h))),this.audio.playSfx("click"),this._refreshAll()})}),this._el.querySelectorAll('.enc-btn[data-action="enchant"]').forEach(a=>{a.addEventListener("click",()=>{const s=u.get().inventory.find(h=>h.id===a.dataset.iid),r=parseInt(a.dataset.cost);if(!s||u.getGold()<r)return;const l={of_str:{id:"of_str",name:"Sturdy",stat:"str",min:2,max:5},of_dex:{id:"of_dex",name:"Swift",stat:"dex",min:2,max:5},of_int:{id:"of_int",name:"Wise",stat:"int",min:2,max:5},of_con:{id:"of_con",name:"Hardy",stat:"con",min:2,max:5},of_hp:{id:"of_hp",name:"Vitality",stat:"hp",min:10,max:25},of_armor:{id:"of_armor",name:"Reinforced",stat:"armor",min:2,max:5}}[a.dataset.aid];if(!l)return;const d=Math.round(l.min+Math.random()*(l.max-l.min));s.affixes||(s.affixes=[]),s.affixes.push({...l,value:d}),u.addGold(-r),this.audio.playSfx("spell"),this._refreshAll()})}),(t=this._el.querySelector("#btn-rest"))==null||t.addEventListener("click",()=>{const a=u.get(),o=[...a.party,...a.companions],s=o.filter(i=>i.hp>0&&i.hp<(i.maxHp||100)),r=Math.max(10,s.length*15);u.getGold()<r||(u.addGold(-r),o.forEach(i=>{var l,d;i.hp>0&&(i.hp=i.maxHp||50+(((l=i.attrs)==null?void 0:l.CON)||10)*10,i.mp=i.maxMp||30+(((d=i.attrs)==null?void 0:d.INT)||8)*8)}),this.audio.playSfx("levelup"),this._refreshAll())}),this._el.querySelectorAll("[data-revive]").forEach(a=>{a.addEventListener("click",()=>{if(a.disabled)return;const o=a.dataset.revive,s=u.get(),r=[...s.party,...s.companions].find(i=>i.id===o);r&&(u.addGold(-50),r.hp=Math.floor((50+r.attrs.CON*10)*.5),r.dead=!1,this.audio.playSfx("click"),this._refreshAll())})})}_showTooltip(e,t,a){const o=a==="stock"?this._merchantStock.find(r=>r.id===t):u.get().inventory.find(r=>r.id===t);if(!o)return;const s=this._el.querySelector("#tt-el");s&&(s.innerHTML=_e(o),s.style.display="block",s.style.left=`${Math.min(e.clientX+12,window.innerWidth-220)}px`,s.style.top=`${Math.max(8,e.clientY-60)}px`)}_hideTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#tt-el");e&&(e.style.display="none")}_refreshServicePanel(){var a;const e=(a=this._el)==null?void 0:a.querySelector("#service-panel");if(!e)return;const t=e.scrollTop;this._el.querySelectorAll(".svc-tab").forEach(o=>{o.classList.toggle("active",o.dataset.svc===this._activeService)}),e.innerHTML=this._renderServiceContent(),this._wireServiceEvents(),e.scrollTop=t}_refreshAll(){var o,s,r;const e=(o=this._el)==null?void 0:o.querySelector("#gold-amount");e&&(e.textContent=u.getGold().toLocaleString()),this._refreshServicePanel();const t=(s=this._el)==null?void 0:s.querySelector("#party-slots"),a=(r=this._el)==null?void 0:r.querySelector("#companion-slots");t&&(t.innerHTML=""),a&&(a.innerHTML=""),this._renderPartyPanel()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}_showToast(e){if(!this._el)return;const t=document.createElement("div");if(!document.getElementById("town-toast-keyframes")){const a=document.createElement("style");a.id="town-toast-keyframes",a.textContent="@keyframes town-toast-fade{0%{opacity:1}70%{opacity:1}100%{opacity:0}}",document.head.appendChild(a)}t.style.cssText="position:absolute;bottom:5rem;left:50%;transform:translateX(-50%);background:rgba(20,12,28,0.95);border:1px solid rgba(232,200,64,0.4);color:#e8c840;padding:0.5rem 1rem;border-radius:6px;font-size:0.78rem;pointer-events:none;z-index:100;white-space:nowrap;max-width:90%;text-align:center;animation:town-toast-fade 3s ease-out forwards",t.textContent=e,this._el.appendChild(t),setTimeout(()=>t.remove(),3200)}_showNotificationSummary(){const e=Se();if(!e.length)return;const t=e.map(o=>o.type==="attr"?`${o.name}: ${o.count} attribute point${o.count>1?"s":""}`:`${o.name}: ${o.count} skill point${o.count>1?"s":""}`),a=S("div","notif-overlay");a.innerHTML=`
      <div class="notif-box">
        <div class="notif-title">Pending Upgrades</div>
        <div class="notif-list">${t.map(o=>`<div class="notif-line">${o}</div>`).join("")}</div>
        <button class="notif-btn" id="notif-close">Close</button>
      </div>
    `,a.querySelector("#notif-close").addEventListener("click",()=>a.remove()),a.addEventListener("click",o=>{o.target===a&&a.remove()}),this._el.appendChild(a)}update(){}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const Ft=`
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
.notif-badge { display: inline-block; background: #c04030; color: #fff; font-size: 0.6rem; font-weight: 700; padding: 0.1rem 0.35rem; border-radius: 10px; margin-left: 0.3rem; vertical-align: middle; min-width: 18px; text-align: center; }
.notif-badge-inline { display: inline-block; background: #c04030; color: #fff; font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 10px; margin-right: 0.4rem; min-width: 20px; text-align: center; }
.action-notif { border-color: rgba(192,64,48,0.4) !important; color: #e06050 !important; background: rgba(192,64,48,0.08) !important; }
.action-notif:hover { background: rgba(192,64,48,0.16) !important; }
.notif-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; }
.notif-box { background: #1a1218; border: 1px solid rgba(232,160,32,0.3); border-radius: 12px; padding: 1.5rem; max-width: 320px; width: 90%; }
.notif-title { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700; color: #e8a020; margin-bottom: 1rem; text-align: center; }
.notif-list { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
.notif-line { font-size: 0.8rem; color: #e8e0d0; padding: 0.4rem 0.6rem; background: rgba(232,160,32,0.06); border-radius: 6px; border: 1px solid rgba(232,160,32,0.1); }
.notif-btn { width: 100%; padding: 0.6rem; background: rgba(232,160,32,0.12); border: 1px solid rgba(232,160,32,0.4); border-radius: 8px; color: #e8a020; font-family: 'Cinzel', serif; font-weight: 700; cursor: pointer; min-height: 44px; }
`,q=[{delay:.5,text:"The world did not end all at once."},{delay:2.5,text:"It unraveled."},{delay:5,text:"Three years ago, something tore through the fabric between realms — a wound that festered and spread, corrupting everything it touched."},{delay:10,text:"They called it the Emberveil."},{delay:13.5,text:"The border settlements fell first. Goblins, wolves, even the ancient stones of the road — all changed, driven by a single will from beyond."},{delay:20,text:"You arrived in Emberglen with little more than your skills and a rumor: someone is controlling the corruption. Someone — or something — with a purpose."},{delay:28,text:"If the Emberveil spreads to the capital, there will be nothing left to save."},{delay:34,text:"Your journey begins here."}];class Gt{constructor(e,t,a){this.manager=e,this.audio=t,this.onComplete=a,this._el=null,this._t=0,this._phase="FADE_IN",this._skipPressed=!1}onEnter(){this._build()}_build(){I("cinematic-styles",Wt),this._el=S("div","cinematic-screen"),this._el.innerHTML=`
      <canvas class="cin-canvas" id="cin-canvas"></canvas>
      <div class="cin-overlay" id="cin-overlay">
        <div class="cin-content" id="cin-content"></div>
        <div class="cin-skip" id="cin-skip">Tap to skip</div>
      </div>
    `,this.manager.uiOverlay.appendChild(this._el);const e=this._el.querySelector("#cin-canvas");e.width=this.manager.width,e.height=this.manager.height,this._canvas=e,this._ctx=e.getContext("2d"),this._el.querySelector("#cin-skip").addEventListener("click",()=>{this._skipPressed=!0,this._finish()}),this._totalDuration=q[q.length-1].delay+4}update(e){var s,r;if(this._t+=e,this._drawBackground(),this._skipPressed)return;const t=(s=this._el)==null?void 0:s.querySelector("#cin-overlay");if(!t)return;this._t<1?t.style.opacity=this._t:this._t>this._totalDuration-1.5?t.style.opacity=Math.max(0,1-(this._t-(this._totalDuration-1.5))/1.5):t.style.opacity=1;const a=(r=this._el)==null?void 0:r.querySelector("#cin-content");if(!a)return;let o="";for(const i of q)if(this._t>=i.delay){const l=this._t-i.delay,d=Math.min(1,l/.8),h=i.delay<q[q.length-1].delay?Math.max(0,1-(l-5)/1.5):1,c=Math.min(d,h);c>0&&(o+=`<p class="cin-line" style="opacity:${c.toFixed(3)}">${i.text}</p>`)}a.innerHTML=o,this._t>=this._totalDuration&&this._finish()}_drawBackground(){const e=this._ctx,t=this._canvas.width,a=this._canvas.height,o=e.createLinearGradient(0,0,0,a);o.addColorStop(0,"#030208"),o.addColorStop(1,"#090512"),e.fillStyle=o,e.fillRect(0,0,t,a),e.save();const s=80;e.fillStyle="rgba(255,255,255,0.6)";for(let c=0;c<s;c++){const m=c*137.508%1*t,v=c*97.3%1*a*.65,p=.4+.6*Math.abs(Math.sin(this._t*.8+c));e.globalAlpha=p*.6,e.beginPath(),e.arc(m,v,.8+c%3*.5,0,Math.PI*2),e.fill()}e.restore();const r=a*.68,i=e.createLinearGradient(0,r,0,a);i.addColorStop(0,"rgba(200,60,20,0.35)"),i.addColorStop(.5,"rgba(120,30,10,0.25)"),i.addColorStop(1,"rgba(40,10,5,0.8)"),e.fillStyle=i,e.fillRect(0,r,t,a-r),e.fillStyle="#0a060c",e.beginPath(),e.moveTo(0,a*.72);const l=[.05,.15,.28,.42,.57,.68,.78,.88,.95,1],d=[.68,.58,.65,.52,.6,.55,.63,.57,.7,.72];l.forEach((c,m)=>{e.lineTo(c*t,d[m]*a)}),e.lineTo(t,a),e.lineTo(0,a),e.closePath(),e.fill();const h=12;for(let c=0;c<h;c++){const m=(c*71.3+this._t*8)%1*t,p=a*.85-(this._t*25+c*40)%(a*.5);if(p<0)continue;const y=Math.max(0,1-p/(a*.5));e.globalAlpha=y*.7,e.fillStyle=`hsl(${20+c*13%30}, 90%, 60%)`,e.beginPath(),e.arc(m,p,1.2+c%3*.6,0,Math.PI*2),e.fill(),e.globalAlpha=1}}_finish(){this._finished||(this._finished=!0,u.setFlag("opening_seen",!0),this.onComplete?this.onComplete():this.manager.pop())}draw(){}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const Wt=`
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
`,jt=["STR","DEX","INT","CON"],Xt=10,Y=8;class Ut{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._name="Hero",this._class=null,this._attrs={STR:Y,DEX:Y,INT:Y,CON:Y},this._pointsSpent=0,this._step="class",this._saveSlot=0}get _pointsLeft(){return Xt-this._pointsSpent}onEnter(){this._build()}_build(){I("cb-styles",Kt),this._el=S("div","cb-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML="",this._step==="class"?this._renderClassStep():this._renderStatsStep()}_renderClassStep(){var a;const e=this._el;e.innerHTML=`
      <div class="cb-header">
        <div class="cb-title">Create Your Hero</div>
        <div class="cb-subtitle">Choose your class</div>
      </div>
      <div class="cb-class-grid" id="class-grid"></div>
      <div class="cb-footer">
        <button class="cb-btn cb-btn-ghost" id="cb-back">← Back</button>
        <button class="cb-btn cb-btn-primary" id="cb-next" disabled>Next →</button>
      </div>
    `;const t=e.querySelector("#class-grid");for(const o of re){const s=S("div",`cb-class-card${((a=this._class)==null?void 0:a.id)===o.id?" selected":""}`);s.dataset.id=o.id,s.innerHTML=`
        <div class="cb-class-icon">${o.svgIcon}</div>
        <div class="cb-class-name">${o.name}</div>
        <div class="cb-class-role">${o.role}</div>
        <div class="cb-class-hook">${o.hook}</div>
        <div class="cb-class-armor">${o.armorType}</div>
      `,s.addEventListener("click",()=>{this.audio.playSfx("click"),this._class=o,e.querySelectorAll(".cb-class-card").forEach(r=>r.classList.remove("selected")),s.classList.add("selected"),e.querySelector("#cb-next").disabled=!1}),t.appendChild(s)}e.querySelector("#cb-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),e.querySelector("#cb-next").addEventListener("click",()=>{this._class&&(this.audio.playSfx("click"),this._step="stats",this._render())})}_renderStatsStep(){const e=this._el;e.innerHTML=`
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
    `,this._renderAttrs(),this._updatePreview(),e.querySelector("#hero-name").addEventListener("input",t=>{this._name=t.target.value||"Hero"}),e.querySelector("#cb-prev").addEventListener("click",()=>{this.audio.playSfx("click"),this._step="class",this._render()}),e.querySelector("#cb-confirm").addEventListener("click",()=>{this.audio.playSfx("victory"),this._confirm()})}_renderAttrs(){const e=this._el.querySelector("#attr-panel");if(e){e.innerHTML="";for(const t of jt){const a=S("div","cb-attr-row"),o=Zt[t];a.innerHTML=`
        <div class="cb-attr-info">
          <div class="cb-attr-name">${t}</div>
          <div class="cb-attr-desc">${o}</div>
        </div>
        <div class="cb-attr-controls">
          <button class="cb-attr-btn" data-attr="${t}" data-dir="-1">−</button>
          <span class="cb-attr-val" id="val-${t}">${this._attrs[t]}</span>
          <button class="cb-attr-btn" data-attr="${t}" data-dir="1">+</button>
        </div>
      `,e.appendChild(a)}e.querySelectorAll(".cb-attr-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.attr,o=parseInt(t.dataset.dir);this._adjustAttr(a,o)})})}}_adjustAttr(e,t){if(t>0&&this._pointsLeft<=0||t<0&&this._attrs[e]<=Y)return;this._attrs[e]+=t,this._pointsSpent+=t;const a=this._el.querySelector(`#val-${e}`);a&&(a.textContent=this._attrs[e]);const o=this._el.querySelector("#pts-left");o&&(o.textContent=this._pointsLeft),this._updatePreview(),this.audio.playSfx("click")}_updatePreview(){var d;const e=(d=this._el)==null?void 0:d.querySelector("#preview-grid");if(!e)return;const t=this._attrs,a=50+t.CON*10,o=30+t.INT*8,s=Math.round(70+t.DEX*1.2),r=Math.round(5+t.DEX*.8),i=Math.round(t.STR*1.5),l=Math.round(1+t.INT*.08,2);e.innerHTML=`
      <div class="preview-stat"><span class="ps-label">HP</span><span class="ps-val">${a}</span></div>
      <div class="preview-stat"><span class="ps-label">Mana</span><span class="ps-val">${o}</span></div>
      <div class="preview-stat"><span class="ps-label">Hit</span><span class="ps-val">${s}%</span></div>
      <div class="preview-stat"><span class="ps-label">Dodge</span><span class="ps-val">${r}%</span></div>
      <div class="preview-stat"><span class="ps-label">Melee</span><span class="ps-val">+${i}</span></div>
      <div class="preview-stat"><span class="ps-label">Spell</span><span class="ps-val">×${l.toFixed(2)}</span></div>
    `}_confirm(){const e={id:crypto.randomUUID(),name:this._name||"Hero",class:this._class.id,className:this._class.name,level:1,xp:0,attrs:{...this._attrs},skills:[this._class.skills[0]],equipment:{},gold:150};u.init(e),z.saveCurrentGame(0);const t=new Ce(this.manager,this.audio,e,!0),a=new Gt(this.manager,this.audio,()=>{this.manager.replace(t)});this.manager.replace(a)}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}update(){}draw(){}}const Zt={STR:"Melee damage · Physical armor · Carry weight",DEX:"Hit chance · Dodge · Ranged damage · Initiative",INT:"Spell power · Mana pool · Magic resistance",CON:"Max HP · Resist status effects · Endurance"},Kt=`
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
`;class Qt{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){I("load-styles",Jt),this._el=S("div","load-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=z.getAllSlots();this._el.innerHTML=`
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
    `,this._el.querySelector("#ls-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".lss-load").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.slot);z.loadSlot(a)&&(this.audio.playSfx("click"),this.manager.replace(new Ce(this.manager,this.audio,null,!1)))})}),this._el.querySelectorAll(".lss-delete").forEach(t=>{t.addEventListener("click",()=>{confirm(`Delete save slot ${parseInt(t.dataset.slot)+1}?`)&&(z.deleteSlot(parseInt(t.dataset.slot)),this.audio.playSfx("click"),this._render())})})}update(){}draw(){}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}}const Jt=`
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
`;class ea{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){var o,s;I("settings-styles",`
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
    `),this._el=S("div","settings-screen"),this._el.innerHTML=`
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
            <div class="toggle-switch${(s=(o=u.get())==null?void 0:o.settings)!=null&&s.disableTextures?" on":""}" id="disable-textures-toggle"></div>
            <div style="display:flex;flex-direction:column;gap:0.15rem">
              <span class="setting-label" style="margin:0">Disable Textures</span>
              <span style="font-size:0.65rem;color:#6a5a52">Improves performance on slow devices</span>
            </div>
          </div>
        </div>
      </div>
      <button class="settings-back" id="settings-back">← Back</button>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#master-vol").addEventListener("input",r=>this.audio.setMasterVolume(+r.target.value)),this._el.querySelector("#music-vol").addEventListener("input",r=>this.audio.setMusicVolume(+r.target.value)),this._el.querySelector("#sfx-vol").addEventListener("input",r=>this.audio.setSfxVolume(+r.target.value));const e=this._el.querySelector("#reduce-motion-toggle");e.addEventListener("click",()=>{const r=e.classList.toggle("on");localStorage.setItem("reduceMotion",r?"1":"0")});const t=this._el.querySelector("#auto-advance-toggle");t.addEventListener("click",()=>{const r=t.classList.toggle("on");localStorage.setItem("autoAdvance",r?"1":"0")});const a=this._el.querySelector("#disable-textures-toggle");a.addEventListener("click",()=>{const r=a.classList.toggle("on"),i=u.get();i.settings||(i.settings={}),i.settings.disableTextures=r}),this._el.querySelector("#settings-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onExit(){w(this._el),this._el=null}destroy(){w(this._el),this._el=null}update(){}draw(){}}const M={CLOUDS:0,LOGO_DROP:1,MENU:2};class ta{constructor(e,t){this.manager=e,this.audio=t,this.phase=M.CLOUDS,this.t=0,this._el=null,this._particles=[],this._clouds=this._makeClouds(),this._logoY=-200,this._logoAlpha=0,this._menuAlpha=0,this._menuVisible=!1}_makeClouds(){const e=[];for(let t=0;t<12;t++)e.push({x:Math.random()*2e3-200,y:Math.random()*400+50,w:Math.random()*300+150,h:Math.random()*80+40,speed:Math.random()*.3+.1,alpha:Math.random()*.4+.3});return e}_makeParticles(e,t){const a=[];for(let o=0;o<60;o++)a.push({x:Math.random()*e,y:Math.random()*t,vx:(Math.random()-.5)*.4,vy:-(Math.random()*.6+.1),size:Math.random()*2+.5,alpha:Math.random(),life:Math.random(),maxLife:Math.random()*.5+.3,color:["#e8a020","#c04030","#f0c060","#ff6040"][Math.floor(Math.random()*4)]});return a}onEnter(){this.audio.playTitleMusic(),this._buildMenu(),this._skipHandler=()=>this._skipToMenu(),this._keySkipHandler=()=>this._skipToMenu(),document.addEventListener("click",this._skipHandler),document.addEventListener("keydown",this._keySkipHandler)}_skipToMenu(){this.phase!==M.MENU&&(this.phase=M.MENU,this.t=10,this._logoY=this.manager.height*.35,this._logoAlpha=1,this._menuAlpha=1,this._el&&(this._el.style.opacity="1",this._el.style.pointerEvents="auto"),document.removeEventListener("click",this._skipHandler),document.removeEventListener("keydown",this._keySkipHandler))}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}_getNgPlusLabel(){try{const e=[1,2,3].map(a=>z.loadSlot(a)).filter(Boolean),t=Math.max(0,...e.map(a=>a.ngPlus||0));if(t>0)return` <span class="tm-ng-badge">✦ NG+${t}</span>`}catch{}return""}_buildMenu(){const e=this.manager.uiOverlay;this._el=S("div","title-menu"),this._el.innerHTML=`
      <div class="title-menu-inner" id="tm-inner">
        <div class="tm-subtitle">A High Fantasy Adventure${this._getNgPlusLabel()}</div>
        <nav class="tm-nav">
          <button class="tm-btn" id="btn-new-game">New Game</button>
          <button class="tm-btn" id="btn-load-game">Load Game</button>
          <button class="tm-btn tm-btn-secondary" id="btn-settings">Settings</button>
        </nav>
        <div class="tm-footer">Emberveil · 2026</div>
      </div>
    `,this._el.style.opacity="0",this._el.style.pointerEvents="none",e.appendChild(this._el),this._el.querySelector("#btn-new-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Ut(this.manager,this.audio))}),this._el.querySelector("#btn-load-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Qt(this.manager,this.audio))}),this._el.querySelector("#btn-settings").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ea(this.manager,this.audio))}),this._injectStyles()}_injectStyles(){if(document.getElementById("title-screen-styles"))return;const e=document.createElement("style");e.id="title-screen-styles",e.textContent=`
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
    `,document.head.appendChild(e)}update(e){this.t+=e;const t=this.manager.width,a=this.manager.height;for(const o of this._clouds)o.x+=o.speed,o.x>t+200&&(o.x=-300);this._particles.length||(this._particles=this._makeParticles(t,a));for(const o of this._particles)o.life-=e*.5,o.life<=0&&(o.x=Math.random()*t,o.y=a+10,o.life=o.maxLife),o.x+=o.vx,o.y+=o.vy;if(this.phase===M.CLOUDS)this.t>2.5&&(this.phase=M.LOGO_DROP,this.t=0);else if(this.phase===M.LOGO_DROP){const o=Math.min(this.t/1.5,1),s=1-Math.pow(1-o,3);this._logoY=(1-s)*(-a*.3)+s*(a*.35),this._logoAlpha=Math.min(this.t/.8,1),this.t>1.8&&(this.phase=M.MENU,this.t=0)}else this.phase===M.MENU&&(this._menuAlpha=Math.min(this.t/1.5,1),this._el&&(this._el.style.opacity=this._menuAlpha,this._el.style.pointerEvents=this._menuAlpha>.5?"auto":"none"))}draw(e){const t=this.manager.width,a=this.manager.height,o=e.createLinearGradient(0,0,0,a);o.addColorStop(0,"#050208"),o.addColorStop(.4,"#0d0810"),o.addColorStop(.7,"#1a1025"),o.addColorStop(1,"#2a1830"),e.fillStyle=o,e.fillRect(0,0,t,a),e.save();const s=this.phase===M.CLOUDS?Math.max(0,1-this.t/1.5):this.phase===M.LOGO_DROP?Math.max(0,1-this.t):.3;for(let h=0;h<80;h++){const c=Math.abs(Math.sin(h*127.1+3.7))*t,m=Math.abs(Math.sin(h*311.7+1.3))*a*.65,v=Math.abs(Math.sin(h*61.7))*.8+.2;e.globalAlpha=v*s,e.fillStyle="#ffffff",e.beginPath(),e.arc(c,m,.8,0,Math.PI*2),e.fill()}e.restore();const r=a*.68,i=e.createLinearGradient(0,r,0,a);i.addColorStop(0,"#0d1a10"),i.addColorStop(.3,"#0a1208"),i.addColorStop(1,"#050a04"),e.fillStyle=i,e.fillRect(0,r,t,a-r),e.save(),e.fillStyle="#0a1208",e.beginPath(),e.moveTo(0,a),e.lineTo(0,r+20);for(let h=0;h<=t;h+=40){const c=Math.sin(h*.008)*30+Math.sin(h*.02)*15;e.lineTo(h,r-c)}e.lineTo(t,a),e.closePath(),e.fill(),e.restore();const l=e.createRadialGradient(t/2,r,0,t/2,r,t*.5);l.addColorStop(0,"rgba(192,64,48,0.2)"),l.addColorStop(.4,"rgba(192,64,48,0.06)"),l.addColorStop(1,"rgba(192,64,48,0)"),e.fillStyle=l,e.fillRect(0,r-80,t,160),e.save(),e.imageSmoothingEnabled=!1;const d=this.phase===M.CLOUDS?this.t*60:0;for(const h of this._clouds){e.globalAlpha=h.alpha;const c=h.x+h.w/2,m=h.y+d*.1,v=Math.max(4,Math.floor(h.w/20)),p=[[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[0,1,1,1,1,1,0]],y=p[0].length,g=p.length,_=c-y*v/2,b=m-g*v/2;for(let f=0;f<g;f++)for(let T=0;T<y;T++){if(!p[f][T])continue;const E=f<=1?"rgba(220,200,255,0.9)":f<=2?"rgba(180,160,220,0.8)":"rgba(140,120,180,0.6)";e.fillStyle=E,e.fillRect(Math.floor(_+T*v),Math.floor(b+f*v),v,v)}}e.imageSmoothingEnabled=!0,e.restore(),e.save();for(const h of this._particles){const c=h.life/h.maxLife*.7;e.globalAlpha=c,e.fillStyle=h.color,e.shadowBlur=6,e.shadowColor=h.color,e.beginPath(),e.arc(h.x,h.y,h.size,0,Math.PI*2),e.fill()}if(e.shadowBlur=0,e.restore(),this.phase!==M.CLOUDS){e.save(),e.globalAlpha=this._logoAlpha;const h=e.createRadialGradient(t/2,this._logoY,0,t/2,this._logoY,250);h.addColorStop(0,"rgba(232,160,32,0.15)"),h.addColorStop(1,"rgba(232,160,32,0)"),e.fillStyle=h,e.fillRect(t/2-300,this._logoY-100,600,200);const c=Math.min(t*.13,80);e.font=`900 ${c}px Cinzel, Georgia, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=40,e.shadowColor="#c04030",e.fillStyle="#c04030",e.fillText("EMBERVEIL",t/2+2,this._logoY+2),e.shadowBlur=20,e.shadowColor="#e8a020",e.fillStyle="#e8a020",e.fillText("EMBERVEIL",t/2,this._logoY),e.shadowBlur=0,e.fillStyle="#f8d880",e.globalAlpha=this._logoAlpha*.4,e.fillText("EMBERVEIL",t/2,this._logoY-1),e.restore()}}onExit(){document.removeEventListener("click",this._skipHandler),document.removeEventListener("keydown",this._keySkipHandler),w(this._el),this._el=null}destroy(){document.removeEventListener("click",this._skipHandler),document.removeEventListener("keydown",this._keySkipHandler),w(this._el),this._el=null}}const X=document.getElementById("game-canvas"),Ie=document.getElementById("ui-overlay");function Ee(){X.width=window.innerWidth,X.height=window.innerHeight}Ee();window.addEventListener("resize",Ee);const aa=new $e(X,Ie),Ae=new Pe,U=new ze(X,Ie,aa,Ae);U.push(new ta(U,Ae));let ye=0;function Me(n){const e=Math.min((n-ye)/1e3,.1);ye=n,U.update(e),U.draw(),requestAnimationFrame(Me)}requestAnimationFrame(Me);
