(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();class pe{constructor(e,t,s,a){this.canvas=e,this.ctx=e.getContext("2d"),this.uiOverlay=t,this.input=s,this.audio=a,this._stack=[]}push(e){const t=this._stack[this._stack.length-1];t!=null&&t.onPause&&t.onPause(),e.manager=this,this._stack.push(e),e.onEnter&&e.onEnter()}pop(){if(!this._stack.length)return;const e=this._stack.pop();e.onExit&&e.onExit(),e.destroy&&e.destroy();const t=this._stack[this._stack.length-1];t!=null&&t.onResume&&t.onResume()}replace(e){this._stack.length&&this.pop(),this.push(e)}update(e){var t;(t=this._stack[this._stack.length-1])==null||t.update(e)}draw(){var t;const e=this.ctx;e.clearRect(0,0,this.canvas.width,this.canvas.height);for(const s of this._stack)(t=s.draw)==null||t.call(s,e)}get width(){return this.canvas.width}get height(){return this.canvas.height}}class ue{constructor(e,t){this.canvas=e,this.overlay=t,this.mouse={x:0,y:0,down:!1},this.keys=new Set,this._clicks=[],this._listeners=[],this._bind("pointermove",e,s=>this._onMove(s)),this._bind("pointerdown",e,s=>this._onDown(s)),this._bind("pointerup",e,s=>this._onUp(s)),this._bind("keydown",window,s=>this.keys.add(s.code)),this._bind("keyup",window,s=>this.keys.delete(s.code))}_bind(e,t,s){t.addEventListener(e,s,{passive:!0}),this._listeners.push({event:e,target:t,handler:s})}_onMove(e){const t=this.canvas.getBoundingClientRect(),s=this.canvas.width/t.width,a=this.canvas.height/t.height;this.mouse.x=(e.clientX-t.left)*s,this.mouse.y=(e.clientY-t.top)*a}_onDown(e){this._onMove(e),this.mouse.down=!0}_onUp(e){this._onMove(e),this.mouse.down=!1,this._clicks.push({x:this.mouse.x,y:this.mouse.y})}consumeClicks(){const e=this._clicks;return this._clicks=[],e}isKey(e){return this.keys.has(e)}destroy(){for(const{event:e,target:t,handler:s}of this._listeners)t.removeEventListener(e,s)}}class ge{constructor(){this._ctx=null,this._masterGain=null,this._musicGain=null,this._sfxGain=null,this._currentTrack=null,this._nodes=[],this.masterVolume=.8,this.musicVolume=.6,this.sfxVolume=.8,this._started=!1}_ensureContext(){this._ctx||(this._ctx=new(window.AudioContext||window.webkitAudioContext),this._masterGain=this._ctx.createGain(),this._masterGain.gain.value=this.masterVolume,this._masterGain.connect(this._ctx.destination),this._musicGain=this._ctx.createGain(),this._musicGain.gain.value=this.musicVolume,this._musicGain.connect(this._masterGain),this._sfxGain=this._ctx.createGain(),this._sfxGain.gain.value=this.sfxVolume,this._sfxGain.connect(this._masterGain))}resume(){this._ensureContext(),this._ctx.state==="suspended"&&this._ctx.resume(),this._started=!0}playTitleMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:55,type:"sine",gain:.08,detune:0},{freq:82.5,type:"sine",gain:.05,detune:5},{freq:110,type:"sine",gain:.04,detune:-3}]),this._addPad([220,277.2,329.6,440],.03)}playCombatMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:110,type:"sawtooth",gain:.04,detune:0},{freq:165,type:"square",gain:.02,detune:8}]),this._addPulse(110,.12,.4)}playTownMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:220,type:"triangle",gain:.06,detune:0},{freq:330,type:"sine",gain:.04,detune:2},{freq:440,type:"sine",gain:.03,detune:-2}]),this._addPad([220,293.7,369.9],.04)}_buildAmbientLayer(e){if(!this._ctx)return[];const t=[];for(const s of e){const a=this._ctx.createOscillator(),i=this._ctx.createGain(),o=this._ctx.createBiquadFilter();a.type=s.type,a.frequency.value=s.freq,a.detune.value=s.detune,o.type="lowpass",o.frequency.value=800,i.gain.value=0,a.connect(o),o.connect(i),i.connect(this._musicGain),a.start(),i.gain.linearRampToValueAtTime(s.gain,this._ctx.currentTime+3),t.push(a,i,o)}return this._nodes.push(...t),t}_addPad(e,t){if(!this._ctx)return;const s=4;let a=this._ctx.currentTime+2;const i=()=>{if(this._ctx){for(const o of e){const r=this._ctx.createOscillator(),l=this._ctx.createGain();r.type="sine",r.frequency.value=o,l.gain.value=0,r.connect(l),l.connect(this._musicGain),r.start(a),l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(t,a+.5),l.gain.setValueAtTime(t,a+s-1),l.gain.linearRampToValueAtTime(0,a+s),r.stop(a+s+.1)}a+=s}};for(let o=0;o<20;o++)i()}_addPulse(e,t,s){if(!this._ctx)return;let a=this._ctx.currentTime+.5;for(let i=0;i<60;i++){const o=this._ctx.createOscillator(),r=this._ctx.createGain();o.type="square",o.frequency.value=e,r.gain.value=0,o.connect(r),r.connect(this._musicGain),o.start(a),r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(t,a+.02),r.gain.linearRampToValueAtTime(0,a+s*.8),o.stop(a+s),a+=s}}_stopCurrentTrack(){var e,t;for(const s of this._nodes){try{(e=s.stop)==null||e.call(s)}catch{}try{(t=s.disconnect)==null||t.call(s)}catch{}}this._nodes=[]}playSfx(e){if(this.resume(),!this._ctx)return;const t=this._ctx,s=t.currentTime,a=t.createOscillator(),i=t.createGain();switch(a.connect(i),i.connect(this._sfxGain),e){case"click":a.frequency.value=880,a.type="sine",i.gain.setValueAtTime(.15,s),i.gain.exponentialRampToValueAtTime(.001,s+.1),a.start(s),a.stop(s+.1);break;case"hit":a.frequency.value=200,a.type="sawtooth",i.gain.setValueAtTime(.3,s),i.gain.exponentialRampToValueAtTime(.001,s+.2),a.start(s),a.stop(s+.2);break;case"spell":a.frequency.setValueAtTime(440,s),a.frequency.linearRampToValueAtTime(880,s+.3),a.type="sine",i.gain.setValueAtTime(.2,s),i.gain.exponentialRampToValueAtTime(.001,s+.4),a.start(s),a.stop(s+.4);break;case"victory":a.frequency.setValueAtTime(440,s),a.frequency.setValueAtTime(554,s+.15),a.frequency.setValueAtTime(659,s+.3),a.frequency.setValueAtTime(880,s+.45),a.type="sine",i.gain.setValueAtTime(.25,s),i.gain.setValueAtTime(.25,s+.6),i.gain.exponentialRampToValueAtTime(.001,s+1),a.start(s),a.stop(s+1);break}}setMasterVolume(e){this.masterVolume=e,this._masterGain&&(this._masterGain.gain.value=e)}setMusicVolume(e){this.musicVolume=e,this._musicGain&&(this._musicGain.gain.value=e)}setSfxVolume(e){this.sfxVolume=e,this._sfxGain&&(this._sfxGain.gain.value=e)}}function w(n,e,t={}){const s=document.createElement(n);e&&(s.className=e);for(const[a,i]of Object.entries(t))s.setAttribute(a,i);return s}function _(n){var e;(e=n==null?void 0:n.parentNode)==null||e.removeChild(n)}function M(n,e){if(document.getElementById(n))return;const t=document.createElement("style");t.id=n,t.textContent=e,document.head.appendChild(t)}const ee=[{id:"warrior",name:"Warrior",role:"Frontline Tank",hook:"Shield Bash stuns enemies. Whirlwind hits all adjacent foes. Unbreakable when outnumbered.",armorType:"Heavy Armor · Sword / Hammer / 2H",primaryAttr:"STR",armorTier:"heavy",weapons:["sword","hammer","2h_sword","2h_axe"],skills:["shield_bash","battle_cry","whirlwind","unbreakable"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4L8 14v8l10 10 10-10v-8L18 4z"/><path d="M18 4v28M8 14h20"/></svg>'},{id:"paladin",name:"Paladin",role:"Holy Warrior",hook:"Holy Strike crits vs demons. Lay on Hands keeps allies alive. Consecration sustains long fights.",armorType:"Medium Armor · Sword / Scepter + Shield",primaryAttr:"STR",armorTier:"medium",weapons:["sword","scepter"],skills:["holy_strike","lay_on_hands","divine_shield","consecration"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 3l-14 6v9c0 8 7 14 14 16 7-2 14-8 14-16V9L18 3z"/><path d="M12 18l4 4 8-8"/></svg>'},{id:"ranger",name:"Ranger",role:"Precision Ranged",hook:"Aimed Shot ignores armor. Rain of Arrows blankets the entire enemy field for 3 rounds.",armorType:"Light Armor · Bow / Crossbow / Javelin",primaryAttr:"DEX",armorTier:"light",weapons:["bow","crossbow","javelin"],skills:["aimed_shot","multi_shot","smoke_trap","rain_of_arrows"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l26 26M5 5l8 2-2-8"/><circle cx="24" cy="12" r="4"/></svg>'},{id:"rogue",name:"Rogue",role:"Burst Assassin",hook:"200% Backstab on stunned targets. Death Mark makes enemies take 50% more damage from all sources.",armorType:"Light Armor · Dagger (dual wield)",primaryAttr:"DEX",armorTier:"light",weapons:["dagger"],skills:["backstab","poison_blade","shadow_step","death_mark"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 26L26 10M18 10l8-2-2 8"/><path d="M10 26c-2 2-4 2-4 0s0-2 2-4"/></svg>'},{id:"cleric",name:"Cleric",role:"Primary Healer",hook:"Mass Resurrection can auto-trigger on wipe. Sanctuary makes an ally temporarily untargetable.",armorType:"Light Armor · Staff / Scepter / Wand",primaryAttr:"INT",armorTier:"light",weapons:["staff","scepter","wand"],skills:["heal","smite","sanctuary","mass_resurrection"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4v28M4 18h28"/></svg>'},{id:"bard",name:"Bard",role:"Support Maestro",hook:"Ballad of Valor gives one hero two turns per round. Song of Ruin strips all enemy buffs at once.",armorType:"Light Armor · Dagger / Wand",primaryAttr:"INT",armorTier:"light",weapons:["dagger","wand"],skills:["inspiring_tune","discordant_wail","ballad_of_valor","song_of_ruin"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 28c0-3 3-5 8-5s8 2 8 5"/><path d="M14 23V10l12-3v13"/><circle cx="10" cy="28" r="3"/><circle cx="24" cy="25" r="3"/></svg>'},{id:"mage",name:"Mage",role:"AoE Glass Cannon",hook:"Fireball torches entire enemy packs. Blizzard hits all enemies for 3 rounds. Arcane Surge: 400% INT.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["magic_missile","fireball","blizzard","arcane_surge"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>'},{id:"necromancer",name:"Necromancer",role:"Army Builder",hook:"Raise Dead turns corpses into skeleton allies. Death Coil applies Poison AND Bleed to all enemies.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["bone_spike","raise_dead","life_drain","death_coil"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="8"/><path d="M14 14v5M22 14v5M10 28c0-5 4-9 8-9s8 4 8 9"/></svg>'},{id:"warlock",name:"Warlock",role:"Chaos Dealer",hook:"Corruption spreads on enemy death. Soul Pact doubles all DoT at cost of own HP.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["corruption","hellfire","soul_pact","void_rift"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-4 6-8 8-8 14a8 8 0 0016 0c0-6-4-8-8-14z"/><path d="M14 22c0 2.2 1.8 4 4 4s4-1.8 4-4"/></svg>'},{id:"demon_hunter",name:"Demon Hunter",role:"Specialist Killer",hook:"+50% damage vs demons. Vengeance stacks from fallen allies then unleashes devastating burst.",armorType:"Light Armor · Crossbow / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["crossbow","dagger"],skills:["demon_bolt","glaive_toss","fel_sight","vengeance"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L18 6l12 24"/><path d="M11 22h14"/><path d="M18 6v5"/></svg>'},{id:"scavenger",name:"Scavenger",role:"Resource Specialist",hook:"Scrounge finds items mid-combat. Jackpot has 20% chance to loot Magic+ gear from each kill.",armorType:"Light/Medium · Any 1H weapon",primaryAttr:"DEX",armorTier:"light",weapons:["dagger","sword","hammer","javelin"],skills:["scrounge","thrown_junk","makeshift_bomb","jackpot"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="16" width="16" height="14" rx="2"/><path d="M6 16h24M14 16v-4a4 4 0 018 0v4"/></svg>'},{id:"swashbuckler",name:"Swashbuckler",role:"Flashy Duelist",hook:"Build Flair stacks with Flourish. Grandeur releases all stacks in one legendary strike.",armorType:"Light Armor · Sword / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["sword","dagger"],skills:["riposte","flourish","taunt","grandeur"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L30 6M22 6l8-2-2 8"/><path d="M6 30a4 4 0 004-4"/></svg>'},{id:"dragon_knight",name:"Dragon Knight",role:"Draconic Warrior",hook:"Choose fire/ice/lightning. Draconic Fury turns all attacks into group AoE for 2 rounds.",armorType:"Heavy/Medium · 2H Sword / 2H Axe",primaryAttr:"STR",armorTier:"heavy",weapons:["2h_sword","2h_axe"],skills:["dragon_claw","breath_weapon","dragon_scales","draconic_fury"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c6 4 12 10 12 16s-6 12-12 12S6 26 6 20c0-6 6-12 12-16z"/><path d="M18 4c-3 6 0 14 0 18"/><path d="M8 16c4-2 8-2 10 0"/></svg>'},{id:"pyromancer",name:"Pyromancer",role:"Fire Specialist",hook:"Stack Burn on multiple groups. Meteor ignites every enemy group simultaneously.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["flame_lance","ignite","pyroclasm","meteor"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-2 8 6 10 2 18a8 8 0 01-8-8c0-2 1-4 2-5-1 4 2 6 4 4 2-8-4-6-4-14"/><path d="M18 22a4 4 0 000 8"/></svg>'}],U={version:1,hero:null,party:[],companions:[],bench:[],gold:150,inventory:[],storyFlags:{},quests:[],act:1,zoneId:"border_roads",nodeId:"start",visitedNodes:new Set,unlockedZones:["border_roads"],completedBosses:[],fame:0,ngPlus:0,playTimeSeconds:0};let b={...U};const m={get(){return b},init(n){b={...U,hero:n,party:[n],gold:n.gold??150,visitedNodes:new Set(["start"])}},load(n){b={...U,...n,visitedNodes:new Set(n.visitedNodes||["start"]),unlockedZones:n.unlockedZones||["border_roads"],completedBosses:n.completedBosses||[],fame:n.fame||0,ngPlus:n.ngPlus||0}},toSaveData(){return{...b,visitedNodes:[...b.visitedNodes]}},setFlag(n,e=!0){b.storyFlags[n]=e},getFlag(n){return b.storyFlags[n]},addGold(n){b.gold=Math.max(0,(b.gold||0)+n)},getGold(){return b.gold||0},addToInventory(n){b.inventory.push(n)},removeFromInventory(n){b.inventory=b.inventory.filter(e=>e.id!==n)},getParty(){return b.party},getCompanions(){return b.companions},getAllCombatants(){return[...b.party,...b.companions]},addToParty(n){return b.party.length<4?(b.party.push(n),!0):!1},addToCompanions(n){return b.companions.length<4?(b.companions.push(n),!0):!1},addToBench(n){b.bench.push(n)},visitNode(n){b.visitedNodes.add(n)},hasVisited(n){return b.visitedNodes.has(n)},addFame(n){b.fame=(b.fame||0)+n},getFame(){return b.fame||0},getNgPlus(){return b.ngPlus||0},startNgPlus(){const n=(b.ngPlus||0)+1;b.ngPlus=n,b.unlockedZones=["border_roads"],b.completedBosses=[],b.visitedNodes=new Set(["start"]),b.zoneId="border_roads",b.nodeId="start",b.gold=Math.max(150,Math.floor((b.gold||0)*.5)),[...b.party,...b.companions].forEach(e=>{e.pendingAttrPoints=(e.pendingAttrPoints||0)+5,e.hp=e.maxHp||100,e.mp=e.maxMp||80})},getFameTitle(){const n=b.fame||0;return n>=500?"Legendary":n>=250?"Renowned":n>=100?"Respected":n>=50?"Known":n>=20?"Noticed":"Unknown"}},k={COMBAT:"combat",DIALOG:"dialog",TOWN:"town",TREASURE:"treasure",AMBUSH:"ambush",BOSS:"boss",LORE:"lore",SHRINE:"shrine",CHALLENGE:"challenge"},v={goblin_scout:{id:"goblin_scout",name:"Goblin Scout",hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:15,xpValue:15,gold:[2,6],loot:["dagger","light_chest"]},goblin_warrior:{id:"goblin_warrior",name:"Goblin Warrior",hp:38,maxHp:38,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12],loot:["sword","medium_chest","shield"]},goblin_shaman:{id:"goblin_shaman",name:"Goblin Shaman",hp:28,maxHp:28,dmg:[6,12],armor:1,hit:74,dodge:10,xpValue:30,gold:[8,18],loot:["wand","ring"],statusOnHit:[{type:"burn",chance:.35,duration:2,power:4}]},goblin_warlord:{id:"goblin_warlord",name:"Goblin Warlord",hp:65,maxHp:65,dmg:[10,18],armor:7,hit:70,dodge:6,xpValue:55,gold:[20,40],loot:["sword","heavy_chest"]},corrupted_wolf:{id:"corrupted_wolf",name:"Corrupted Wolf",hp:30,maxHp:30,dmg:[8,14],armor:1,hit:76,dodge:18,xpValue:22,gold:[1,4],loot:[],statusOnHit:[{type:"bleed",chance:.4,duration:2,power:3}]},corrupted_bear:{id:"corrupted_bear",name:"Corrupted Bear",hp:70,maxHp:70,dmg:[12,20],armor:4,hit:65,dodge:5,xpValue:50,gold:[5,15],loot:[],statusOnHit:[{type:"stun",chance:.25,duration:1,power:0}]},bandit:{id:"bandit",name:"Bandit",hp:28,maxHp:28,dmg:[6,11],armor:3,hit:70,dodge:10,xpValue:20,gold:[4,10],loot:["dagger","light_chest"]},bandit_captain:{id:"bandit_captain",name:"Bandit Captain",hp:55,maxHp:55,dmg:[10,16],armor:5,hit:72,dodge:12,xpValue:45,gold:[15,30],loot:["sword","medium_chest"]},imp:{id:"imp",name:"Imp",hp:28,maxHp:28,dmg:[7,12],armor:0,hit:82,dodge:22,xpValue:28,gold:[4,10],loot:[],statusOnHit:[{type:"burn",chance:.55,duration:2,power:6}]},hell_knight:{id:"hell_knight",name:"Hell Knight",hp:80,maxHp:80,dmg:[16,26],armor:12,hit:70,dodge:8,xpValue:72,gold:[20,45],loot:["heavy_chest","heavy_legs"],statusOnHit:[{type:"bleed",chance:.4,duration:2,power:7}]},void_shade:{id:"void_shade",name:"Void Shade",hp:50,maxHp:50,dmg:[14,20],armor:0,hit:85,dodge:28,xpValue:55,gold:[12,28],loot:["ring","wand"],statusOnHit:[{type:"poison",chance:.5,duration:3,power:7},{type:"stun",chance:.15,duration:1,power:0}]},demon_brute:{id:"demon_brute",name:"Demon Brute",hp:120,maxHp:120,dmg:[20,32],armor:8,hit:65,dodge:5,xpValue:90,gold:[30,60],loot:["heavy_chest"],statusOnHit:[{type:"stun",chance:.3,duration:1,power:0}]},archfiend_malgrath:{id:"archfiend_malgrath",name:"Archfiend Malgrath",hp:380,maxHp:380,dmg:[24,38],armor:16,hit:75,dodge:10,xpValue:450,gold:[120,200],loot:["heavy_chest","ring","necklace"],statusOnHit:[{type:"burn",chance:.6,duration:3,power:10},{type:"bleed",chance:.4,duration:2,power:8}]},emberveil_sovereign:{id:"emberveil_sovereign",name:"The Emberveil Sovereign",hp:600,maxHp:600,dmg:[30,50],armor:20,hit:78,dodge:12,xpValue:800,gold:[200,350],loot:["heavy_chest","ring","necklace","staff"],statusOnHit:[{type:"burn",chance:.7,duration:3,power:12},{type:"poison",chance:.5,duration:3,power:10},{type:"stun",chance:.25,duration:1,power:0}]},ash_wraith:{id:"ash_wraith",name:"Ash Wraith",hp:42,maxHp:42,dmg:[8,14],armor:0,hit:78,dodge:20,xpValue:32,gold:[6,14],loot:["wand","ring"],statusOnHit:[{type:"burn",chance:.4,duration:2,power:5}]},cinder_hound:{id:"cinder_hound",name:"Cinder Hound",hp:35,maxHp:35,dmg:[10,16],armor:2,hit:80,dodge:16,xpValue:28,gold:[3,9],loot:[],statusOnHit:[{type:"bleed",chance:.45,duration:2,power:4}]},molten_golem:{id:"molten_golem",name:"Molten Golem",hp:90,maxHp:90,dmg:[14,22],armor:10,hit:62,dodge:4,xpValue:65,gold:[15,30],loot:["heavy_chest"],statusOnHit:[{type:"burn",chance:.6,duration:3,power:6}]},veil_cultist:{id:"veil_cultist",name:"Veil Cultist",hp:45,maxHp:45,dmg:[9,15],armor:2,hit:72,dodge:12,xpValue:35,gold:[8,18],loot:["cloth_chest","wand"],statusOnHit:[{type:"poison",chance:.35,duration:3,power:5}]},veil_sorcerer:{id:"veil_sorcerer",name:"Veil Sorcerer",hp:55,maxHp:55,dmg:[14,22],armor:1,hit:76,dodge:14,xpValue:60,gold:[20,40],loot:["staff","cloth_chest","ring"],statusOnHit:[{type:"burn",chance:.5,duration:2,power:7},{type:"stun",chance:.2,duration:1,power:0}]},lava_titan:{id:"lava_titan",name:"The Lava Titan",hp:280,maxHp:280,dmg:[20,32],armor:14,hit:70,dodge:4,xpValue:350,gold:[80,140],loot:["heavy_chest","heavy_legs","ring"],statusOnHit:[{type:"burn",chance:.7,duration:3,power:8}]},grax_veil_touched:{id:"grax_veil_touched",name:"Grax the Veil-Touched",hp:200,maxHp:200,dmg:[14,24],armor:10,hit:78,dodge:8,xpValue:250,gold:[60,100],loot:["sword","heavy_chest","ring"],statusOnHit:[{type:"poison",chance:.3,duration:3,power:5}]},veil_warden:{id:"veil_warden",name:"Veil Warden",hp:90,maxHp:90,dmg:[10,16],armor:6,hit:70,dodge:12,xpValue:80,gold:[25,45],loot:["medium_chest","wand"],statusOnHit:[{type:"burn",chance:.45,duration:2,power:5}]}},q={goblin_patrol:{name:"Goblin Patrol",enemies:[{...v.goblin_scout,count:3}]},corrupted_outpost:{name:"Corrupted Outpost",enemies:[{...v.goblin_warrior,count:2},{...v.goblin_scout,count:2}]},border_boss:{name:"Warlord's Vanguard",enemies:[{...v.goblin_warlord,count:1},{...v.goblin_warrior,count:2}]},bandit_ambush:{name:"Bandit Ambush",enemies:[{...v.bandit,count:2},{...v.bandit_captain,count:1}]},spider_nest:{name:"Spider Hollow",enemies:[{id:"giant_spider",name:"Giant Spider",hp:18,maxHp:18,dmg:[5,10],armor:1,hit:75,dodge:14,xpValue:18,gold:[1,4],loot:[],statusOnHit:[{type:"poison",chance:.5,duration:2,power:3}],count:4}]},goblin_camp:{name:"Goblin Camp",enemies:[{...v.goblin_scout,count:2},{...v.goblin_shaman,count:1},{...v.goblin_warrior,count:2}]},thornwood_boss:{name:"The Veil Wardens",enemies:[{...v.veil_warden,count:2},{...v.goblin_shaman,count:2}]},grax_final:{name:"Grax the Veil-Touched",enemies:[{...v.grax_veil_touched,count:1},{...v.veil_warden,count:2}]},wolf_pack:{name:"Corrupted Wolf Pack",enemies:[{...v.corrupted_wolf,count:3}]},bear_ambush:{name:"Corrupted Predator",enemies:[{...v.corrupted_bear,count:1},{...v.corrupted_wolf,count:2}]},ash_patrol:{name:"Ash Patrol",enemies:[{...v.ash_wraith,count:2},{...v.cinder_hound,count:2}]},obsidian_garrison:{name:"Obsidian Garrison",enemies:[{...v.molten_golem,count:1},{...v.ash_wraith,count:3}]},ember_ambush:{name:"Ember Ambush",enemies:[{...v.cinder_hound,count:4}]},lava_titan:{name:"The Lava Titan",enemies:[{...v.lava_titan,count:1},{...v.molten_golem,count:2}]},veil_cult_camp:{name:"Veil Cult Encampment",enemies:[{...v.veil_cultist,count:3},{...v.veil_sorcerer,count:1}]},veil_high_priest:{name:"Veil High Priest",enemies:[{...v.veil_sorcerer,count:1,hp:180,maxHp:180,dmg:[18,28],armor:4,xpValue:220,name:"Veil High Priest"},{...v.veil_cultist,count:3}]},demon_patrol:{name:"Demon Patrol",enemies:[{...v.imp,count:3},{...v.hell_knight,count:1}]},hell_garrison:{name:"Hell Garrison",enemies:[{...v.hell_knight,count:2},{...v.imp,count:2}]},rift_assault:{name:"Rift Assault",enemies:[{...v.void_shade,count:3},{...v.demon_brute,count:1}]},void_nexus_ambush:{name:"Void Nexus",enemies:[{...v.void_shade,count:4}]},archfiend_malgrath:{name:"Archfiend Malgrath",enemies:[{...v.archfiend_malgrath,count:1},{...v.hell_knight,count:2}]},emberveil_sovereign:{name:"The Emberveil Sovereign",enemies:[{...v.emberveil_sovereign,count:1},{...v.void_shade,count:2},{...v.demon_brute,count:1}]},void_horde:{name:"Void Horde",enemies:[{id:"void_wraith",name:"Void Wraith",count:2,hp:90,maxHp:90,dmg:[22,38],armor:8,hit:82,dodge:22,xpValue:120,gold:[20,40]},{id:"star_horror",name:"Star Horror",count:1,hp:110,maxHp:110,dmg:[18,32],armor:5,hit:78,dodge:18,xpValue:130,gold:[18,35]}]},cosmic_assault:{name:"Cosmic Assault",enemies:[{id:"star_horror",name:"Star Horror",count:2,hp:110,maxHp:110,dmg:[18,32],armor:5,hit:78,dodge:18,xpValue:130,gold:[18,35]},{id:"cosmic_titan",name:"Cosmic Titan",count:1,hp:200,maxHp:200,dmg:[30,50],armor:18,hit:72,dodge:8,xpValue:200,gold:[30,60]}]},unraveler:{name:"The Unraveler",enemies:[{id:"the_unraveler",name:"The Unraveler",count:1,hp:600,maxHp:600,dmg:[45,80],armor:25,hit:88,dodge:12,xpValue:800,gold:[200,400]},{id:"void_wraith",name:"Void Wraith",count:2,hp:90,maxHp:90,dmg:[22,38],armor:8,hit:82,dodge:22,xpValue:120,gold:[20,40]}]}},te=[{id:"border_roads",name:"The Border Roads",act:1,zoneIndex:0,nodes:[{id:"start",type:"town",name:"Emberglen",x:.08,y:.5,exits:["road_ambush"]},{id:"road_ambush",type:"dialog",name:"Shady Wanderer",x:.28,y:.4,exits:["crossroads_a","crossroads_b"]},{id:"crossroads_a",type:"combat",name:"Goblin Scout Pack",x:.5,y:.22,exits:["ruined_watch"],encounter:"goblin_patrol"},{id:"crossroads_b",type:"shrine",name:"Roadside Shrine",x:.5,y:.7,exits:["ruined_watch"],shrineType:"heal"},{id:"ruined_watch",type:"combat",name:"Ruined Watchtower",x:.72,y:.5,exits:["border_boss"],encounter:"corrupted_outpost"},{id:"border_boss",type:"boss",name:"Warlord's Vanguard",x:.92,y:.5,exits:[],encounter:"border_boss"}]},{id:"thornwood",name:"Thornwood Forest",act:1,zoneIndex:1,nodes:[{id:"forest_enter",type:"dialog",name:"Forest Edge",x:.08,y:.5,exits:["spider_hollow","hidden_path"]},{id:"spider_hollow",type:"combat",name:"Spider Hollow",x:.3,y:.28,exits:["goblin_camp"],encounter:"spider_nest"},{id:"hidden_path",type:"lore",name:"Ancient Runestone",x:.3,y:.72,exits:["goblin_camp"]},{id:"goblin_camp",type:"combat",name:"Goblin Camp",x:.55,y:.5,exits:["seer_hut","treasure_grove"],encounter:"goblin_camp"},{id:"seer_hut",type:"dialog",name:"The Seer's Hut",x:.75,y:.28,exits:["thornwood_boss"]},{id:"treasure_grove",type:"treasure",name:"Hidden Grove",x:.75,y:.72,exits:["thornwood_boss"]},{id:"thornwood_boss",type:"boss",name:"The Veil Wardens",x:.92,y:.5,exits:[],encounter:"thornwood_boss"}]}],fe=[{id:"dust_roads",name:"The Dust Roads",act:2,zoneIndex:0,nodes:[{id:"ash_gate",type:"dialog",name:"Ashen Gate",x:.08,y:.5,exits:["dust_patrol","ash_lore"]},{id:"dust_patrol",type:"combat",name:"Ash Patrol",x:.28,y:.28,exits:["obsidian_fort"],encounter:"ash_patrol"},{id:"ash_lore",type:"lore",name:"Ruined Outpost",x:.28,y:.72,exits:["obsidian_fort"]},{id:"obsidian_fort",type:"combat",name:"Obsidian Garrison",x:.52,y:.5,exits:["ember_path","veil_camp"],encounter:"obsidian_garrison"},{id:"ember_path",type:"ambush",name:"Ember Path",x:.72,y:.28,exits:["dust_boss"],encounter:"ember_ambush"},{id:"veil_camp",type:"combat",name:"Veil Cult Camp",x:.72,y:.72,exits:["dust_boss"],encounter:"veil_cult_camp"},{id:"dust_boss",type:"boss",name:"The Lava Titan",x:.92,y:.5,exits:[],encounter:"lava_titan"}]},{id:"ember_plateau",name:"The Ember Plateau",act:2,zoneIndex:1,nodes:[{id:"plateau_enter",type:"dialog",name:"Plateau Ascent",x:.08,y:.5,exits:["lava_fields","ancient_shrine"]},{id:"lava_fields",type:"combat",name:"Lava Fields",x:.3,y:.3,exits:["veil_stronghold"],encounter:"ash_patrol"},{id:"ancient_shrine",type:"treasure",name:"Ancient Shrine",x:.3,y:.7,exits:["veil_stronghold"]},{id:"veil_stronghold",type:"combat",name:"Veil Stronghold",x:.55,y:.5,exits:["rift_access","lore_monolith"],encounter:"veil_cult_camp"},{id:"rift_access",type:"dialog",name:"The Rift Access",x:.75,y:.28,exits:["plateau_boss"]},{id:"lore_monolith",type:"lore",name:"Veil Monolith",x:.75,y:.72,exits:["plateau_boss"]},{id:"plateau_boss",type:"boss",name:"Veil High Priest",x:.92,y:.5,exits:[],encounter:"veil_high_priest"}]}],be=[{id:"hell_breach",name:"The Hell Breach",act:3,zoneIndex:0,nodes:[{id:"breach_gate",type:"dialog",name:"The Veil Breach",x:.08,y:.5,exits:["demon_patrol","fell_ruins"]},{id:"demon_patrol",type:"combat",name:"Demon Patrol",x:.3,y:.28,exits:["inferno_keep"],encounter:"demon_patrol"},{id:"fell_ruins",type:"lore",name:"Fell Ruins",x:.3,y:.72,exits:["inferno_keep"]},{id:"inferno_keep",type:"combat",name:"Inferno Keep",x:.55,y:.5,exits:["void_altar","soul_prison"],encounter:"hell_garrison"},{id:"void_altar",type:"dialog",name:"The Void Altar",x:.75,y:.28,exits:["breach_boss"]},{id:"soul_prison",type:"treasure",name:"Soul Prison",x:.75,y:.72,exits:["breach_boss"]},{id:"breach_boss",type:"boss",name:"Archfiend Malgrath",x:.92,y:.5,exits:[],encounter:"archfiend_malgrath"}]},{id:"shattered_core",name:"The Shattered Core",act:3,zoneIndex:1,nodes:[{id:"core_enter",type:"dialog",name:"Core Entrance",x:.08,y:.5,exits:["rift_demons","void_nexus"]},{id:"rift_demons",type:"combat",name:"Rift Demons",x:.3,y:.28,exits:["shard_fortress"],encounter:"rift_assault"},{id:"void_nexus",type:"ambush",name:"Void Nexus",x:.3,y:.72,exits:["shard_fortress"],encounter:"void_nexus_ambush"},{id:"shard_fortress",type:"combat",name:"Shard Fortress",x:.55,y:.5,exits:["the_wound","ancient_seal"],encounter:"hell_garrison"},{id:"the_wound",type:"lore",name:"The Wound",x:.75,y:.28,exits:["core_boss"]},{id:"ancient_seal",type:"dialog",name:"Ancient Seal",x:.75,y:.72,exits:["core_boss"]},{id:"core_boss",type:"boss",name:"The Emberveil Sovereign",x:.92,y:.5,exits:[],encounter:"emberveil_sovereign"}]}],ve=[{id:"cosmic_rift",name:"The Cosmic Rift",act:4,zoneIndex:0,nodes:[{id:"rift_entry",type:"dialog",name:"Edge of Reality",x:.08,y:.5,exits:["star_fields","void_expanse"]},{id:"star_fields",type:"combat",name:"The Broken Stars",x:.3,y:.28,exits:["cosmic_bastion"],encounter:"void_horde"},{id:"void_expanse",type:"shrine",name:"Cosmic Shrine",x:.3,y:.72,exits:["cosmic_bastion"],shrineType:"empower"},{id:"cosmic_bastion",type:"combat",name:"Cosmic Bastion",x:.55,y:.5,exits:["prophet_sanctum","titan_pit"],encounter:"cosmic_assault"},{id:"prophet_sanctum",type:"dialog",name:"Void Prophet's Sanctum",x:.75,y:.28,exits:["rift_boss"]},{id:"titan_pit",type:"challenge",name:"Titan's Pit",x:.75,y:.72,exits:["rift_boss"],encounter:"cosmic_assault"},{id:"rift_boss",type:"boss",name:"The Void Herald",x:.92,y:.5,exits:[],encounter:"void_horde"}]},{id:"eternal_void",name:"The Eternal Void",act:4,zoneIndex:1,nodes:[{id:"void_gates",type:"dialog",name:"Gates of the Void",x:.08,y:.5,exits:["star_horror_swarm","void_library"]},{id:"star_horror_swarm",type:"combat",name:"Star Horror Swarm",x:.3,y:.28,exits:["unraveler_ante"],encounter:"cosmic_assault"},{id:"void_library",type:"lore",name:"The Void Library",x:.3,y:.72,exits:["unraveler_ante"]},{id:"unraveler_ante",type:"combat",name:"Antechamber of Unmaking",x:.55,y:.5,exits:["last_shrine","final_trial"],encounter:"void_horde"},{id:"last_shrine",type:"shrine",name:"The Last Shrine",x:.75,y:.28,exits:["void_boss"],shrineType:"fullrestore"},{id:"final_trial",type:"challenge",name:"Trial of the Void",x:.75,y:.72,exits:["void_boss"],encounter:"cosmic_assault"},{id:"void_boss",type:"boss",name:"The Unraveler",x:.92,y:.5,exits:[],encounter:"unraveler"}]}],W={shady_wanderer:{id:"shady_wanderer",npcName:"Shady Wanderer",npcPortrait:null,lines:[{speaker:"npc",text:"Oi, hold it right there. Road toll's been raised to ten gold. Goblins broke the bridge further north, y'see..."},{speaker:"hero",text:"(He's clearly lying — the bridge is visible behind him, intact.)"}],choices:[{text:"Pay 10 gold.",effect:{gold:-10},outcome:"pay"},{text:"Refuse. Prepare to fight.",effect:{startCombat:"bandit_ambush"},outcome:"fight"},{text:"[DEX 14] Slip past unseen.",skillCheck:{stat:"DEX",dc:14},outcomes:{pass:"sneak_past",fail:"fight"}}],outcomes:{pay:{text:"He takes your coin with a sneer and steps aside."},fight:{text:`He raises his blade. "Should've paid up!"`,startCombat:"bandit_ambush"},sneak_past:{text:"You melt into the shadows and pass by unseen. He never knew you were there."}}},forest_enter:{id:"forest_enter",npcName:"Forest Warden",npcPortrait:null,lines:[{speaker:"npc",text:"The Thornwood has changed. The wolves don't flee from torchlight anymore. Something corrupted them — the same wrongness that's taken the goblins."},{speaker:"npc",text:"If you enter, watch the tree lines. And whatever you hear at night... don't follow it."}],choices:[{text:"We'll press on. The source must be found.",outcome:"press_on"},{text:"[INT 12] Ask about the corruption's origin.",skillCheck:{stat:"INT",dc:12},outcomes:{pass:"learned_lore",fail:"press_on"}}],outcomes:{press_on:{text:"He nods grimly and steps aside."},learned_lore:{text:`He leans in. "There's a rift — deep in Thornwood. Something tore a hole between here and somewhere else. That's where it's pouring in."`,setFlag:"knows_rift_origin"}}},seer_hut:{id:"seer_hut",npcName:"Mira the Seer",npcPortrait:null,lines:[{speaker:"npc",text:"I have watched the Emberveil spread for thirty years. What you see is merely the symptom. The wound is somewhere else. Somewhere darker."},{speaker:"npc",text:"The goblins did not choose to be what they are now. Something reached into their minds and gave them purpose. A will from beyond."}],choices:[{text:"Where does the wound come from?",outcome:"ask_source"},{text:"Can you join our party?",outcome:"ask_join"},{text:"We will stop it.",outcome:"pledge"}],outcomes:{ask_source:{text:"Follow the corruption south. The Ashen Wastes — something ancient sleeps there, and it's waking."},ask_join:{text:"My bones are too old for roads. But carry this — it will help you recognize Veil artifacts when you find them.",reward:{item:"veil_lens"}},pledge:{text:"I hope you are right. More than you know.",setFlag:"seer_met"}}}};class _e{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._charIdx=0,this._pending={},this._pointsLeft=0}onEnter(){this._build()}_getMembersWithPoints(){return m.get().party.filter(t=>(t.pendingAttrPoints||0)>0)}_build(){M("levelup-styles",ye),this._el=w("div","levelup-screen"),this.manager.uiOverlay.appendChild(this._el);const e=this._getMembersWithPoints();if(!e.length){this.manager.pop();return}this._loadMember(e[0]),this._render(e)}_loadMember(e){this._pending={STR:0,DEX:0,INT:0,CON:0},this._pointsLeft=e.pendingAttrPoints||0,this._currentMember=e}_render(e){var s;e||(e=this._getMembersWithPoints());const t=this._currentMember;this._el.innerHTML=`
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
          ${["STR","DEX","INT","CON"].map(a=>this._attrRow(a,t)).join("")}
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
    `,["STR","DEX","INT","CON"].forEach(a=>{var i,o;(i=this._el.querySelector(`#lu-plus-${a}`))==null||i.addEventListener("click",()=>this._addPoint(a)),(o=this._el.querySelector(`#lu-minus-${a}`))==null||o.addEventListener("click",()=>this._removePoint(a))}),(s=this._el.querySelector("#lu-confirm"))==null||s.addEventListener("click",()=>{this._pointsLeft>0||(this.audio.playSfx("click"),this._applyPoints())})}_attrRow(e,t){var r;const s={STR:"Strength",DEX:"Dexterity",INT:"Intellect",CON:"Constitution"},a={STR:"⚔",DEX:"🏃",INT:"✦",CON:"🛡"},i=((r=t.attrs)==null?void 0:r[e])||8,o=this._pending[e]||0;return`
      <div class="lu-attr-row">
        <div class="lu-attr-icon">${a[e]}</div>
        <div class="lu-attr-info">
          <div class="lu-attr-name">${s[e]}</div>
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
    `}_addPoint(e){this._pointsLeft<=0||(this._pending[e]++,this._pointsLeft--,this.audio.playSfx("click"),this._refreshAttrs())}_removePoint(e){this._pending[e]<=0||(this._pending[e]--,this._pointsLeft++,this.audio.playSfx("click"),this._refreshAttrs())}_refreshAttrs(){var o,r,l,d;const e=this._currentMember,t=(o=this._el)==null?void 0:o.querySelector("#lu-attrs");t&&(t.innerHTML=["STR","DEX","INT","CON"].map(h=>this._attrRow(h,e)).join("")),["STR","DEX","INT","CON"].forEach(h=>{var c,p;(c=this._el.querySelector(`#lu-plus-${h}`))==null||c.addEventListener("click",()=>this._addPoint(h)),(p=this._el.querySelector(`#lu-minus-${h}`))==null||p.addEventListener("click",()=>this._removePoint(h))});const s=(r=this._el)==null?void 0:r.querySelector("#lu-pts");s&&(s.textContent=this._pointsLeft);const a=(l=this._el)==null?void 0:l.querySelector("#lu-prev-grid");a&&(a.innerHTML=this._previewStats(e));const i=(d=this._el)==null?void 0:d.querySelector("#lu-confirm");i&&(i.disabled=this._pointsLeft>0,i.textContent=this._pointsLeft>0?`Spend All Points (${this._pointsLeft} left)`:"Confirm")}_previewStats(e){const t=e.attrs||{},s=this._pending,a=(t.STR||8)+(s.STR||0),i=(t.DEX||8)+(s.DEX||0),o=(t.INT||8)+(s.INT||0),l=50+((t.CON||8)+(s.CON||0))*10,d=30+o*8,h=Math.min(95,70+Math.round(i*1.2)),c=Math.min(40,5+Math.round(i*.8)),p=Math.round(a*1.5);return[{label:"Max HP",val:l},{label:"Max MP",val:d},{label:"Hit%",val:`${h}%`},{label:"Dodge%",val:`${c}%`},{label:"Melee Dmg",val:`+${p}`}].map(y=>`
      <div class="lu-prev-stat">
        <span class="lu-prev-label">${y.label}</span>
        <span class="lu-prev-val">${y.val}</span>
      </div>
    `).join("")}_applyPoints(){const e=this._currentMember;for(const[s,a]of Object.entries(this._pending))e.attrs[s]=(e.attrs[s]||8)+a;e.pendingAttrPoints=0,e.maxHp=50+e.attrs.CON*10,e.maxMp=30+e.attrs.INT*8,e.hp=e.maxHp,e.mp=e.maxMp;const t=this._getMembersWithPoints();t.length>0?(this._loadMember(t[0]),this._render()):this.manager.pop()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const ye=`
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
`,X=[0,100,250,450,700,1e3,1400,1900,2500,3200,4e3,5e3,6200,7600,9200,11e3,13200,15800,18800,22300];function xe(n){for(let e=X.length;e>=1;e--)if(n>=X[e-1])return e;return 1}function we(n){const e=xe(n.xp||0);return e>(n.level||1)&&e<=20?(n.level=e,n.pendingAttrPoints=(n.pendingAttrPoints||0)+2,n.maxHp=50+n.attrs.CON*10,n.maxMp=30+n.attrs.INT*8,n.hp=n.maxHp,n.mp=n.maxMp,!0):!1}function ke(n,e){const t=[];for(const s of n)s.xp=(s.xp||0)+e,we(s)&&t.push({name:s.name,level:s.level});return t}const Se={low:.7,medium:1,high:1.2,elite:1.4,exotic:1.6},Ce={normal:0,magic:[1,2],rare:[3,4],legendary:[4,6]},L={normal:"#c8c8c8",magic:"#6080ff",rare:"#e8d020",legendary:"#ff8020"},Te={dagger:{name:"Dagger",type:"weapon",subtype:"dagger",dmg:[3,7],speed:1.2,twoHanded:!1,statScaling:"dex",armorPen:.1},sword:{name:"Sword",type:"weapon",subtype:"sword",dmg:[6,14],speed:1,twoHanded:!1,statScaling:"str_dex"},wand:{name:"Wand",type:"weapon",subtype:"wand",dmg:[4,10],speed:1.1,twoHanded:!1,statScaling:"int",offHandOk:!0},scepter:{name:"Scepter",type:"weapon",subtype:"scepter",dmg:[5,12],speed:1,twoHanded:!1,statScaling:"int",offHandOk:!0},staff:{name:"Staff",type:"weapon",subtype:"staff",dmg:[8,20],speed:.9,twoHanded:!0,statScaling:"int",intMult:1.5},hammer:{name:"Hammer",type:"weapon",subtype:"hammer",dmg:[8,16],speed:.8,twoHanded:!1,statScaling:"str",stunChance:.1},sword2h:{name:"Greatsword",type:"weapon",subtype:"sword2h",dmg:[14,28],speed:.7,twoHanded:!0,statScaling:"str",strMult:1.5},axe2h:{name:"Greataxe",type:"weapon",subtype:"axe2h",dmg:[16,30],speed:.65,twoHanded:!0,statScaling:"str",bleedChance:.15},bow:{name:"Bow",type:"weapon",subtype:"bow",dmg:[8,16],speed:1,twoHanded:!0,statScaling:"dex",dexMult:1.3,ranged:!0},crossbow:{name:"Crossbow",type:"weapon",subtype:"crossbow",dmg:[12,22],speed:.7,twoHanded:!0,statScaling:"dex_str",ranged:!0},javelin:{name:"Javelin",type:"weapon",subtype:"javelin",dmg:[9,18],speed:.9,twoHanded:!1,statScaling:"str_dex",ranged:!0,throwable:!0}},Me={cloth_helm:{name:"Hood",type:"armor",slot:"head",tier:"cloth",armor:1,dodgeBonus:0},light_helm:{name:"Leather Cap",type:"armor",slot:"head",tier:"light",armor:3,dodgeBonus:0},medium_helm:{name:"Chain Coif",type:"armor",slot:"head",tier:"medium",armor:5,dodgeBonus:-1},heavy_helm:{name:"War Helm",type:"armor",slot:"head",tier:"heavy",armor:8,dodgeBonus:-2},cloth_chest:{name:"Robes",type:"armor",slot:"chest",tier:"cloth",armor:2,dodgeBonus:0},light_chest:{name:"Leather Armor",type:"armor",slot:"chest",tier:"light",armor:6,dodgeBonus:0},medium_chest:{name:"Chain Shirt",type:"armor",slot:"chest",tier:"medium",armor:10,dodgeBonus:-2},heavy_chest:{name:"Plate Armor",type:"armor",slot:"chest",tier:"heavy",armor:16,dodgeBonus:-4},cloth_legs:{name:"Linen Leggings",type:"armor",slot:"legs",tier:"cloth",armor:1,dodgeBonus:0},light_legs:{name:"Leather Legs",type:"armor",slot:"legs",tier:"light",armor:4,dodgeBonus:0},medium_legs:{name:"Chain Legs",type:"armor",slot:"legs",tier:"medium",armor:7,dodgeBonus:-1},heavy_legs:{name:"Plate Legs",type:"armor",slot:"legs",tier:"heavy",armor:11,dodgeBonus:-3},shield:{name:"Shield",type:"armor",slot:"offhand",tier:"heavy",armor:5,dodgeBonus:5,blockChance:.2},ring:{name:"Ring",type:"accessory",slot:"ring",tier:"any",armor:0},necklace:{name:"Necklace",type:"accessory",slot:"necklace",tier:"any",armor:0}},Ee={prefixes:[{id:"of_str",name:"Sturdy",stat:"str",min:1,max:4},{id:"of_dex",name:"Swift",stat:"dex",min:1,max:4},{id:"of_int",name:"Wise",stat:"int",min:1,max:4},{id:"of_con",name:"Hardy",stat:"con",min:1,max:4},{id:"sharp",name:"Sharp",stat:"dmg",min:1,max:3},{id:"sturdy",name:"Reinforced",stat:"armor",min:1,max:3},{id:"burning",name:"Burning",stat:"burnChance",min:.05,max:.15},{id:"bleeding",name:"Serrated",stat:"bleedChance",min:.05,max:.15}],suffixes:[{id:"of_hp",name:"of Vitality",stat:"hp",min:5,max:20},{id:"of_mp",name:"of Focus",stat:"mp",min:5,max:15},{id:"of_hit",name:"of Accuracy",stat:"hit",min:2,max:8},{id:"of_dodge",name:"of Evasion",stat:"dodge",min:2,max:6},{id:"of_speed",name:"of Haste",stat:"initiative",min:1,max:3},{id:"of_gold",name:"of Fortune",stat:"goldFind",min:.05,max:.2}]};function E(n,e="normal",t="medium",s=Ee){const a=Te[n]||Me[n];if(!a)return null;const i=Se[t],o={id:crypto.randomUUID(),baseKey:n,name:a.name,type:a.type,subtype:a.subtype||a.slot,slot:a.slot||(a.twoHanded,"weapon"),rarity:e,quality:t,affixes:[]};a.dmg&&(o.dmg=[Math.round(a.dmg[0]*i),Math.round(a.dmg[1]*i)]),a.armor!==void 0&&(o.armor=Math.round(a.armor*i));const r=Ce[e];if(r){const[l,d]=Array.isArray(r)?r:[r,r],h=l+Math.floor(Math.random()*(d-l+1)),c=[...s.prefixes,...s.suffixes],p=[];for(let u=0;u<h&&c.length>p.length;u++){let g,S=0;do g=c[Math.floor(Math.random()*c.length)],S++;while(p.find(f=>f.id===g.id)&&S<20);if(!p.find(f=>f.id===g.id)){const f=+(g.min+Math.random()*(g.max-g.min)).toFixed(2);p.push({...g,value:f})}}o.affixes=p;const y=p.find(u=>s.prefixes.find(g=>g.id===u.id)),x=p.find(u=>s.suffixes.find(g=>g.id===u.id));y&&(o.name=`${y.name} ${o.name}`),x&&(o.name=`${o.name} ${x.name}`)}return o}function se(n){if(!n)return"";const e=a=>a.charAt(0).toUpperCase()+a.slice(1),t=a=>a.charAt(0).toUpperCase()+a.slice(1);let s=[`<strong>${n.name}</strong>`,`<span class="tt-rarity" style="color:${L[n.rarity]}">${t(n.rarity)} · ${e(n.quality)}</span>`];n.dmg&&s.push(`Damage: ${n.dmg[0]}–${n.dmg[1]}`),n.armor&&s.push(`Armor: +${n.armor}`);for(const a of n.affixes||[]){const i=typeof a.value=="number"&&a.value<1?`${Math.round(a.value*100)}%`:`+${a.value}`;s.push(`<span style="color:#90d8a8">${a.name}: ${i} ${a.stat.toUpperCase()}</span>`)}return s.join("<br>")}const ae={shield_bash:{name:"Shield Bash",class:"warrior",unlockLevel:1,type:"melee",aoe:"adjacent",damageStat:"str",damageMult:1.2,statusEffects:[{type:"stun",chance:.6,duration:1}],mpCost:0,description:"Strike with shield, dealing STR-based damage and applying Stun (1 round).",talents:[{id:"sb_wider",name:"Wide Arc",desc:"Hits 1-2 adjacent enemies instead of 1.",effect:{aoe:"adjacent2"}},{id:"sb_stun",name:"Extended Stun",desc:"Stun lasts 2 rounds.",effect:{stunDuration:2}}]},battle_cry:{name:"Battle Cry",class:"warrior",unlockLevel:5,type:"buff",target:"party",effect:{dmgBuff:.2,duration:3},mpCost:15,description:"Rally the party, granting +20% damage for 3 rounds.",talents:[{id:"bc_hp",name:"Inspiring Shout",desc:"Also grants 20 temporary HP to each party member.",effect:{tempHp:20}},{id:"bc_def",name:"Rallying Cry",desc:"Also reduces incoming damage by 10%.",effect:{dmgReduct:.1}}]},whirlwind:{name:"Whirlwind",class:"warrior",unlockLevel:10,type:"melee",aoe:"row",damageStat:"str",damageMult:.9,statusEffects:[],mpCost:20,description:"Spin attack hitting all adjacent enemies (up to 3).",talents:[{id:"ww_bleed",name:"Serrated Blade",desc:"Applies Bleed to all hit enemies.",effect:{bleed:{duration:3}}},{id:"ww_extra",name:"Wider Spin",desc:"Hits one additional enemy row.",effect:{aoe:"row2"}}]},unbreakable:{name:"Unbreakable",class:"warrior",unlockLevel:15,type:"buff",target:"self",effect:{dmgReduct:.5,reflect:.1,duration:2},mpCost:25,description:"Enter defensive stance for 2 rounds: take 50% less damage, reflect 10% back.",talents:[{id:"ub_reflect",name:"Thorns",desc:"Reflect increases to 25%.",effect:{reflect:.25}},{id:"ub_dur",name:"Iron Will",desc:"Duration extends to 3 rounds.",effect:{duration:3}}]},holy_strike:{name:"Holy Strike",class:"paladin",unlockLevel:1,type:"melee",aoe:"single",damageStat:"str_int",damageMult:1.1,bonusVsUndead:2,bonusVsDemon:2,mpCost:5,description:"Blessed melee blow dealing STR+INT damage. Double vs undead/demons.",talents:[{id:"hs_burn",name:"Holy Fire",desc:"Applies Burn to undead targets.",effect:{burnVsUndead:!0}},{id:"hs_splash",name:"Divine Splash",desc:"Small AoE splash to adjacent target.",effect:{aoe:"adjacent"}}]},lay_on_hands:{name:"Lay on Hands",class:"paladin",unlockLevel:5,type:"heal",target:"ally",healStat:"int",healMult:2,mpCost:20,description:"Instantly restore HP to one ally equal to 2× INT.",talents:[{id:"loh_cleanse",name:"Purify",desc:"Also removes one status effect.",effect:{cleanse:1}},{id:"loh_free",name:"Free Action",desc:"Can target self without consuming turn.",effect:{selfFree:!0}}]},divine_shield:{name:"Divine Shield",class:"paladin",unlockLevel:10,type:"buff",target:"ally",effect:{shield:{conMult:3,duration:2}},mpCost:25,description:"Surround one ally with a barrier absorbing 3× CON damage for 2 rounds.",talents:[{id:"ds_reflect",name:"Holy Aegis",desc:"Reflect absorbed damage.",effect:{reflect:.3}},{id:"ds_double",name:"Twin Shield",desc:"Extend to 2 targets.",effect:{targets:2}}]},consecration:{name:"Consecration",class:"paladin",unlockLevel:15,type:"zone",target:"all_enemies",damageStat:"int",damageMult:.6,healStat:"int",healMult:.4,duration:3,mpCost:35,description:"Sanctify the ground: damages all enemies and heals party for 3 rounds.",talents:[{id:"con_slow",name:"Sacred Ground",desc:"Also slows all enemies.",effect:{slow:{duration:2}}},{id:"con_heal",name:"Holy Renewal",desc:"Increases heal amount by 50%.",effect:{healMult:.6}}]},magic_missile:{name:"Magic Missile",class:"mage",unlockLevel:1,type:"magic",aoe:"random3",damageStat:"int",damageMult:.5,mpCost:8,description:"Launch 3 arcane bolts, each hitting a random enemy for INT damage.",talents:[{id:"mm_5bolts",name:"Missile Barrage",desc:"5 bolts instead of 3.",effect:{bolts:5}},{id:"mm_stun",name:"Concussive Bolts",desc:"Chance to Stun target.",effect:{stunChance:.2}}]},fireball:{name:"Fireball",class:"mage",unlockLevel:5,type:"magic",aoe:"group",damageStat:"int",damageMult:1.4,statusEffects:[{type:"burn",chance:.8,duration:3}],mpCost:18,description:"Explosive fireball hitting one enemy group with fire damage and Burn.",talents:[{id:"fb_wider",name:"Inferno",desc:"Blast radius includes adjacent group.",effect:{aoe:"group2"}},{id:"fb_burn",name:"Scorching",desc:"Burn damage increased by 50%.",effect:{burnMult:1.5}}]},blizzard:{name:"Blizzard",class:"mage",unlockLevel:10,type:"magic",aoe:"all",damageStat:"int",damageMult:.7,duration:3,statusEffects:[{type:"slow",chance:1,duration:2}],mpCost:30,description:"Ice storm blanketing all enemies for 3 rounds, dealing cold damage and Slow.",talents:[{id:"bz_freeze",name:"Deep Freeze",desc:"Chance to Freeze (Stun) targets.",effect:{freezeChance:.25}},{id:"bz_dmg",name:"Arctic Gale",desc:"Damage increases each round.",effect:{dmgScaling:.2}}]},arcane_surge:{name:"Arcane Surge",class:"mage",unlockLevel:15,type:"magic",aoe:"single_overflow",damageStat:"int",damageMult:4,mpCost:40,description:"400% INT damage to single target with overflow to adjacent enemies.",talents:[{id:"as_cd",name:"Wild Surge",desc:"Reduce mana cost by 15.",effect:{mpCost:-15}},{id:"as_pen",name:"Arcane Pierce",desc:"Ignore magic resistance.",effect:{ignoreMR:!0}}]},bone_spike:{name:"Bone Spike",class:"necromancer",unlockLevel:1,type:"magic",aoe:"pierce_row",damageStat:"int",damageMult:.9,statusEffects:[{type:"bleed",chance:.5,duration:3}],mpCost:8,description:"Bone projectile dealing INT damage and applying Bleed, pierces target row.",talents:[{id:"bs_pierce",name:"Ossified Lance",desc:"Pierces entire enemy row.",effect:{aoe:"row"}},{id:"bs_extra",name:"Double Spike",desc:"Extra spike on crit.",effect:{critExtra:!0}}]},raise_dead:{name:"Raise Dead",class:"necromancer",unlockLevel:5,type:"summon",target:"corpse",summonType:"skeleton",mpCost:25,description:"Reanimate one fallen enemy corpse as a skeleton ally (fills open companion slot).",talents:[{id:"rd_hp",name:"Fortified Bones",desc:"Raised skeleton has +50% HP.",effect:{hpMult:1.5}},{id:"rd_two",name:"Army of Dead",desc:"Can raise two corpses at once.",effect:{raiseTwoCorpses:!0}}]},life_drain:{name:"Life Drain",class:"necromancer",unlockLevel:10,type:"magic",aoe:"single",damageStat:"int",damageMult:1.2,lifesteal:.5,mpCost:20,description:"Drain life from target dealing INT damage, healing Necromancer for 50%.",talents:[{id:"ld_chain",name:"Chain Drain",desc:"Also chains to a second nearby target.",effect:{chainCount:2}},{id:"ld_buff",name:"Soul Siphon",desc:"Also drains one buff from target.",effect:{drainBuff:!0}}]},death_coil:{name:"Death Coil",class:"necromancer",unlockLevel:15,type:"magic",aoe:"all",damageStat:"int",damageMult:.8,statusEffects:[{type:"poison",chance:.9,duration:4},{type:"bleed",chance:.9,duration:3}],mpCost:35,description:"Necrotic wave hitting all enemies, applying both Poison and Bleed.",talents:[{id:"dc_con",name:"Withering",desc:"Lowers enemy CON saves for 2 rounds.",effect:{conDebuff:3,conDebuffDur:2}},{id:"dc_heal",name:"Feast on Death",desc:"Heals party on each kill while active.",effect:{healOnKill:.1}}]},flame_lance:{name:"Flame Lance",class:"pyromancer",unlockLevel:1,type:"magic",aoe:"single",damageStat:"int",damageMult:1,statusEffects:[{type:"burn",chance:.9,duration:3}],mpCost:8,description:"Fire bolt dealing INT damage and applying Burn (3-round DoT).",talents:[{id:"fl_dur",name:"Sustained Flame",desc:"Burn lasts 5 rounds.",effect:{burnDuration:5}},{id:"fl_spread",name:"Spreading Fire",desc:"Burn spreads to adjacent enemy.",effect:{burnSpread:!0}}]},ignite:{name:"Ignite",class:"pyromancer",unlockLevel:5,type:"zone",aoe:"group",damageStat:"int",damageMult:.6,duration:3,statusEffects:[{type:"burn",chance:1,duration:3,stacksEachRound:!0}],mpCost:18,description:"Set ground ablaze under one group, persisting 3 rounds with stacking Burn.",talents:[{id:"ig_spread",name:"Wildfire",desc:"Fire spreads to adjacent group.",effect:{spreadToAdjacentGroup:!0}},{id:"ig_stack",name:"Inferno Stack",desc:"Faster Burn stacking rate.",effect:{burnStackRate:1.5}}]},pyroclasm:{name:"Pyroclasm",class:"pyromancer",unlockLevel:10,type:"magic",aoe:"chain3",damageStat:"int",damageMult:.9,statusEffects:[{type:"burn",chance:.8,duration:3}],mpCost:25,description:"Chain fire explosion: each target triggers a secondary blast on nearest enemy, up to 3.",talents:[{id:"py_chain4",name:"Pyroclastic Wave",desc:"Chain length increases to 4.",effect:{chainCount:4}},{id:"py_scale",name:"Amplify",desc:"Each chain explosion is larger.",effect:{chainDmgScale:1.2}}]},meteor:{name:"Meteor",class:"pyromancer",unlockLevel:15,type:"magic",aoe:"all",damageStat:"int",damageMult:2.5,statusEffects:[{type:"burn",chance:1,duration:5,maxStacks:!0}],mpCost:45,description:"Devastating meteor hitting all enemies with maximum Burn stacks and Ignite zones.",talents:[{id:"me_split",name:"Twin Meteor",desc:"Meteor splits into two on impact.",effect:{split:2}},{id:"me_resist",name:"Smelting Fire",desc:"Enemy fire resistance reduced 50% for 3 rounds.",effect:{fireResistDebuff:.5,duration:3}}]},aimed_shot:{name:"Aimed Shot",class:"ranger",unlockLevel:1,type:"ranged",aoe:"single",damageStat:"dex",damageMult:1.5,armorPen:1,mpCost:5,description:"Focused ranged attack dealing 150% DEX damage. Can pierce armor via talent.",talents:[{id:"as_pen",name:"Armor Pierce",desc:"Ignores target armor.",effect:{armorPen:1}},{id:"as_bleed",name:"Barbed Arrow",desc:"Chance to Bleed.",effect:{bleedChance:.4}}]},multi_shot:{name:"Multi-Shot",class:"ranger",unlockLevel:5,type:"ranged",aoe:"multi3",damageStat:"dex",damageMult:.8,mpCost:15,description:"Fire at 3 separate targets simultaneously, each at 80% DEX damage.",talents:[{id:"ms_4",name:"Quiver Mastery",desc:"Fourth target added.",effect:{targets:4}},{id:"ms_b",name:"Bleeding Volley",desc:"Applies Bleed to all targets.",effect:{bleedChance:.5}}]},smoke_trap:{name:"Smoke Trap",class:"ranger",unlockLevel:10,type:"trap",aoe:"group",statusEffects:[{type:"blind",chance:1,duration:2}],mpCost:20,description:"Plant a trap that Blinds (−50% hit chance) one enemy group for 2 rounds.",talents:[{id:"st_slow",name:"Choking Smoke",desc:"Also applies Slow.",effect:{slow:{duration:2}}},{id:"st_2",name:"Double Trap",desc:"Place 2 traps simultaneously.",effect:{trapCount:2}}]},rain_of_arrows:{name:"Rain of Arrows",class:"ranger",unlockLevel:15,type:"ranged",aoe:"all",damageStat:"dex",damageMult:.5,duration:3,mpCost:30,description:"Volley descending on all enemies for 3 rounds, each dealing DEX damage.",talents:[{id:"roa_bleed",name:"Serrated Arrows",desc:"Applies stacking Bleed.",effect:{bleedStack:!0}},{id:"roa_dur",name:"Endless Rain",desc:"Duration extends to 4 rounds.",effect:{duration:4}}]},backstab:{name:"Backstab",class:"rogue",unlockLevel:1,type:"melee",aoe:"single",damageStat:"dex",damageMult:2,mpCost:5,description:"200% DEX damage. Bonus if target is Stunned or Bleeding.",talents:[]},poison_blade:{name:"Poison Blade",class:"rogue",unlockLevel:5,type:"buff",aoe:"single",damageStat:"dex",damageMult:.5,mpCost:10,description:"Next 3 attacks apply Poison DoT.",talents:[]},shadow_step:{name:"Shadow Step",class:"rogue",unlockLevel:10,type:"melee",aoe:"single",damageStat:"dex",damageMult:1.5,mpCost:20,description:"Teleport behind target and attack for 150% DEX.",talents:[]},death_mark:{name:"Death Mark",class:"rogue",unlockLevel:15,type:"debuff",aoe:"single",mpCost:25,description:"Marked target takes 50% more damage from all sources for 3 rounds.",talents:[]},heal:{name:"Heal",class:"cleric",unlockLevel:1,type:"heal",target:"ally",healStat:"int",healMult:2.5,mpCost:15,description:"Restore HP to one ally equal to 2.5× INT.",talents:[]},smite:{name:"Smite",class:"cleric",unlockLevel:5,type:"magic",aoe:"single",damageStat:"int",damageMult:1.3,mpCost:15,description:"Holy bolt, double damage vs undead/demons.",talents:[]},sanctuary:{name:"Sanctuary",class:"cleric",unlockLevel:10,type:"buff",target:"ally",mpCost:25,description:"Ally regenerates HP each round and cannot be targeted for 3 rounds.",talents:[]},mass_resurrection:{name:"Mass Resurrection",class:"cleric",unlockLevel:15,type:"passive",mpCost:0,description:"40% chance to auto-revive fallen allies at 30% HP when party wipes.",talents:[]},inspiring_tune:{name:"Inspiring Tune",class:"bard",unlockLevel:1,type:"buff",target:"party",mpCost:10,description:"+15% hit and +1 initiative for party for 3 rounds.",talents:[]},discordant_wail:{name:"Discordant Wail",class:"bard",unlockLevel:5,type:"debuff",aoe:"group",mpCost:15,description:"−30% damage and erratic targeting for one enemy group.",talents:[]},ballad_of_valor:{name:"Ballad of Valor",class:"bard",unlockLevel:10,type:"buff",target:"ally",mpCost:25,description:"One hero gets double actions for 1 round.",talents:[]},song_of_ruin:{name:"Song of Ruin",class:"bard",unlockLevel:15,type:"magic",aoe:"all",mpCost:35,description:"Sonic damage to all enemies, removes all their buffs.",talents:[]},corruption:{name:"Corruption",class:"warlock",unlockLevel:1,type:"magic",aoe:"single",damageStat:"int",damageMult:.6,mpCost:8,description:"Target takes INT damage per round for 4 rounds; spreads on death.",talents:[]},hellfire:{name:"Hellfire",class:"warlock",unlockLevel:5,type:"magic",aoe:"group",damageStat:"int",damageMult:1.3,mpCost:18,description:"Hellfire hits enemy group, applies Burn. Bypasses fire resistance.",talents:[]},soul_pact:{name:"Soul Pact",class:"warlock",unlockLevel:10,type:"buff",target:"self",mpCost:0,description:"Sacrifice 20% own HP to double all active DoT duration and damage.",talents:[]},void_rift:{name:"Void Rift",class:"warlock",unlockLevel:15,type:"zone",aoe:"all",damageStat:"int",damageMult:.7,duration:3,mpCost:35,description:"Void rift under enemies for 3 rounds: damage + 20% stun chance each round.",talents:[]},demon_bolt:{name:"Demon Bolt",class:"demon_hunter",unlockLevel:1,type:"ranged",aoe:"single",damageStat:"dex_int",damageMult:1,bonusVsDemon:1.5,mpCost:8,description:"+50% vs demons. DEX+INT damage.",talents:[]},glaive_toss:{name:"Glaive Toss",class:"demon_hunter",unlockLevel:5,type:"ranged",aoe:"row",damageStat:"dex",damageMult:.9,mpCost:15,description:"Spinning glaive hits all enemies in a row, applying Bleed.",talents:[]},fel_sight:{name:"Fel Sight",class:"demon_hunter",unlockLevel:10,type:"buff",target:"self",mpCost:20,description:"+25% hit/dodge, immune to Blind/Confuse for 3 rounds.",talents:[]},vengeance:{name:"Vengeance",class:"demon_hunter",unlockLevel:15,type:"melee",aoe:"single",damageStat:"dex",damageMult:1,stackBonusPerDeath:.15,mpCost:20,description:"Stacks 15% damage per fallen ally. Release all stacks in one strike.",talents:[]},scrounge:{name:"Scrounge",class:"scavenger",unlockLevel:1,type:"utility",mpCost:0,description:"60% chance to find a consumable item mid-combat.",talents:[]},thrown_junk:{name:"Thrown Junk",class:"scavenger",unlockLevel:5,type:"ranged",aoe:"group",damageStat:"dex",damageMult:.7,mpCost:5,description:"Hurl debris at an enemy group; 30% stun chance.",talents:[]},makeshift_bomb:{name:"Makeshift Bomb",class:"scavenger",unlockLevel:10,type:"ranged",aoe:"group",damageStat:"dex_con",damageMult:1,mpCost:15,description:"Improvised explosive: DEX+CON damage with Burn to a group.",talents:[]},jackpot:{name:"Jackpot",class:"scavenger",unlockLevel:15,type:"passive",mpCost:0,description:"20% chance to instantly loot a Magic+ item from each kill.",talents:[]},riposte:{name:"Riposte",class:"swashbuckler",unlockLevel:1,type:"counter",mpCost:0,description:"Enter parry stance: counter next melee hit for 200% DEX damage.",talents:[]},flourish:{name:"Flourish",class:"swashbuckler",unlockLevel:5,type:"melee",aoe:"single",damageStat:"dex",damageMult:1,buildsFlairStacks:3,mpCost:8,description:"3 rapid strikes, each building Flair stacks for Grandeur.",talents:[]},taunt:{name:"Taunt",class:"swashbuckler",unlockLevel:10,type:"buff",target:"enemy",mpCost:15,description:"Force one enemy to target only you for 2 rounds; +30% dodge vs them.",talents:[]},grandeur:{name:"Grandeur",class:"swashbuckler",unlockLevel:15,type:"melee",aoe:"single",damageStat:"dex",consumesFlairStacks:!0,mpCost:0,description:"Consume all Flair stacks for DEX × stacks damage + random debuffs per stack.",talents:[]},dragon_claw:{name:"Dragon Claw",class:"dragon_knight",unlockLevel:1,type:"melee",aoe:"adjacent",damageStat:"str_dex",damageMult:1.1,armorPen:.2,mpCost:0,description:"Savage strike ignoring 20% armor; hits adjacent enemies.",talents:[]},breath_weapon:{name:"Breath Weapon",class:"dragon_knight",unlockLevel:5,type:"magic",aoe:"group",damageStat:"str_int",damageMult:1.3,mpCost:20,description:"Cone of fire/ice/lightning hitting one group. Choose element at class creation.",talents:[]},dragon_scales:{name:"Dragon Scales",class:"dragon_knight",unlockLevel:10,type:"buff",target:"self",mpCost:20,description:"30% damage reduction + element immunity for 3 rounds.",talents:[]},draconic_fury:{name:"Draconic Fury",class:"dragon_knight",unlockLevel:15,type:"buff",target:"self",mpCost:35,description:"All attacks become group AoE, +50% damage for 2 rounds. Cannot be Stunned.",talents:[]}};function ie(n){return Object.values(ae).filter(e=>e.class===n).sort((e,t)=>e.unlockLevel-t.unlockLevel)}function oe(n,e){return ie(n).filter(t=>t.unlockLevel<=e)}const $e=.5,Le=.18,N={warrior:"warrior",mage:"mage",paladin:"paladin",ranger:"ranger",rogue:"rogue",cleric:"cleric",bard:"bard",necromancer:"necromancer",goblin_scout:"goblin_scout",goblin_warrior:"goblin_warrior",goblin_shaman:"goblin_shaman",imp:"imp",hell_knight:"hell_knight",molten_golem:"molten_golem",corrupted_wolf:"corrupted_wolf",void_shade:"void_shade"},P={};function Y(n){if(P[n])return P[n];const e={};for(const t of["south","east","north","west"]){const s=new Image;s.src=`/images/sprites/${n}_${t}.png`,e[t]=s}return P[n]=e,e}class R{constructor(e,t,s,a){this.manager=e,this.audio=t,this.encounter=a,this._el=null,this._t=0,this._turnTimer=0,this._phase="START",this._startDelay=1.2,this._preloadSprites(a),this._particles=[],this._dmgNumbers=[],this._flashMap=new Map,this._round=1,this._log=[],this._lootItems=[];const i=m.get();this._heroes=i.party.map(o=>this._memberToCombatant(o)),this._companions=i.companions.map(o=>this._memberToCombatant(o)),this._allies=[...this._heroes,...this._companions],this._enemyGroups=a.enemies.map((o,r)=>this._buildGroup(o,r)),this._allEnemies=this._enemyGroups.flat(),this._buildTurnOrder()}_memberToCombatant(e){const t=e.attrs||{STR:8,DEX:8,INT:8,CON:10},s=e.equipment||{};let a=0,i=0;for(const o of Object.values(s))o!=null&&o.armor&&(a+=o.armor),o!=null&&o.dmg&&(i+=Math.floor((o.dmg[0]+o.dmg[1])/2*.3));return{id:e.id,name:e.name,class:e.class,className:e.className,isHero:!0,hp:e.hp??50+t.CON*10,maxHp:e.maxHp??50+t.CON*10,mp:e.mp??30+t.INT*8,maxMp:e.maxMp??30+t.INT*8,dmg:[Math.max(1,Math.round(t.STR*.8+i)),Math.max(3,Math.round(t.STR*2+i*1.5))],armor:a,hit:Math.min(95,70+Math.round(t.DEX*1.2)),dodge:Math.min(40,5+Math.round(t.DEX*.8)),initiative:t.DEX+(e.level||1),alive:(e.hp??1)>0,stance:"ready",statuses:[],skillCooldown:0,x:0,y:0,offsetX:0,offsetY:0}}_buildGroup(e,t){const s=m.getNgPlus(),a=s>0?1+s*.35:1,i=Math.round(e.hp*a),o=e.dmg.map(d=>Math.round(d*a)),r=Math.round(e.armor*(1+s*.15)),l=s>0?Math.round(e.xpValue*.5*s):0;return Array.from({length:e.count},(d,h)=>({id:`${e.id}_${t}_${h}`,name:s>0?`${e.name} ✦`:e.name,enemyId:e.id,groupIdx:t,isHero:!1,hp:i,maxHp:i,dmg:o,armor:r,hit:Math.min(95,e.hit+s*3),dodge:Math.min(45,e.dodge+s*2),initiative:4+Math.random()*6,xpValue:e.xpValue+l,gold:e.gold,alive:!0,stance:"ready",statuses:[],skillCooldown:0,x:0,y:0,offsetX:0,offsetY:0}))}_buildTurnOrder(){const e=[...this._allies,...this._allEnemies].filter(t=>t.alive);e.forEach(t=>{t._roll=t.initiative+Math.random()*10}),e.sort((t,s)=>s._roll-t._roll),this._turnOrder=e,this._turnIdx=0}onEnter(){this.audio.playCombatMusic(),this._build()}_build(){M("combat-styles",Ae),this._el=w("div","combat-screen"),this._el.innerHTML=`
      <div class="cbt-log-panel"><div class="cbt-log-title">Combat</div><div class="cbt-log-entries" id="cbt-log"></div></div>
      <div class="cbt-hud" id="cbt-hud"></div>
    `,this.manager.uiOverlay.appendChild(this._el),this._fastMode=!1,this._renderHud(),this._el.addEventListener("click",e=>{if(e.target.closest("#hud-speed")){this._fastMode=!this._fastMode;const t=this._el.querySelector("#hud-speed");t&&(t.textContent=`⚡ ${this._fastMode?"2×":"1×"}`),this.audio.playSfx("click")}})}_renderHud(){const e=this._el.querySelector("#cbt-hud");e.innerHTML=`
      <div class="hud-members">
        ${this._heroes.map(t=>`
          <div class="hm" id="hm-${t.id}">
            <div class="hm-name">${t.name}</div>
            <div class="hm-bars">
              <div class="hm-bar-t"><div class="hm-bar hp-bar" id="hp-${t.id}" style="width:100%"></div></div>
              <div class="hm-bar-t"><div class="hm-bar mp-bar" id="mp-${t.id}" style="width:100%"></div></div>
            </div>
            <div class="hm-vals" id="hv-${t.id}">${t.hp}/${t.maxHp} HP</div>
          </div>
        `).join("")}
      </div>
      <div class="hud-round">Round <span id="hud-round">${this._round}</span></div>
      <button class="hud-speed-btn" id="hud-speed" title="Toggle speed">⚡ ${this._fastMode?"2×":"1×"}</button>
    `}_updateHud(){var t,s,a,i;for(const o of this._heroes){const r=(t=this._el)==null?void 0:t.querySelector(`#hp-${o.id}`),l=(s=this._el)==null?void 0:s.querySelector(`#mp-${o.id}`),d=(a=this._el)==null?void 0:a.querySelector(`#hv-${o.id}`);r&&(r.style.width=`${Math.max(0,o.hp/o.maxHp*100)}%`),l&&(l.style.width=`${Math.max(0,o.mp/o.maxMp*100)}%`),d&&(d.textContent=`${Math.max(0,o.hp)}/${o.maxHp} HP`)}const e=(i=this._el)==null?void 0:i.querySelector("#hud-round");e&&(e.textContent=this._round)}_log_(e,t="normal"){var i;this._log.push({msg:e,type:t});const s=(i=this._el)==null?void 0:i.querySelector("#cbt-log");if(!s)return;const a=w("div",`cbt-entry cbt-${t}`);for(a.textContent=e,s.appendChild(a);s.children.length>10;)s.removeChild(s.firstChild);s.scrollTop=s.scrollHeight}update(e){this._t+=e,this._particles=this._particles.filter(t=>(t.life-=e,t.x+=t.vx,t.y+=t.vy,t.vy+=50*e,t.life>0)),this._dmgNumbers=this._dmgNumbers.filter(t=>(t.life-=e,t.y-=38*e,t.life>0));for(const[t,s]of this._flashMap){const a=s-e;a<=0?this._flashMap.delete(t):this._flashMap.set(t,a)}if(this._phase==="START"){this._t>=this._startDelay&&(this._phase="PLAYING",this._t=0,this._log_(`⚔ ${this.encounter.name}`,"round"));return}this._phase==="PLAYING"&&(this._turnTimer+=e*(this._fastMode?2:1),!(this._turnTimer<$e)&&(this._turnTimer=0,this._executeTurn()))}_executeTurn(){var s;if(this._turnIdx>=this._turnOrder.length){this._round++,this._processStatusEffects(),this._buildTurnOrder(),this._log_(`── Round ${this._round} ──`,"round");return}const e=this._turnOrder[this._turnIdx++];if(!e.alive)return;if((s=e.statuses)==null?void 0:s.find(a=>a.type==="stun")){this._log_(`${e.name} is stunned and cannot act!`,"miss");return}e.skillCooldown>0&&e.skillCooldown--,e.isHero?this._heroAI(e):this._enemyAI(e),this._checkCombatEnd()}_heroAI(e){const t=m.get(),s=[...t.party,...t.companions].find(p=>p.id===e.id),a=(s==null?void 0:s.class)||e.class,i=(s==null?void 0:s.level)||1,o=(s==null?void 0:s.personality)||"neutral",r=this._allEnemies.filter(p=>p.alive),l=this._allies.filter(p=>p.alive);if(!r.length)return;const h=oe(a,i).filter(p=>p.type!=="passive").filter(p=>e.skillCooldown===0&&(p.mpCost||0)<=e.mp);let c=!1;if(h.length&&Math.random()<.45){let p=null;const y=h.find(u=>u.type==="heal"),x=l.find(u=>u.hp/u.maxHp<.5);if(r.reduce((u,g)=>!u||g.hp<u.hp?g:u,null),o==="protective"){const u=l.find(g=>g.hp<g.maxHp);y&&u&&(p=y)}else o==="aggressive"?p=h.find(u=>u.aoe==="group"||u.aoe==="all")||h.find(u=>u.type==="melee"||u.type==="magic"):o==="opportunist"?p=h.find(u=>u.type==="melee")||h[0]:o==="patient"?(r.length>=l.length||x)&&(p=h.find(u=>u.aoe)||h[0]):(y&&x&&(p=y),!p&&r.length>=3&&(p=h.find(u=>u.aoe==="group"||u.aoe==="row"||u.aoe==="all")),p||(p=h.find(u=>u.type==="melee"||u.type==="magic")),p||(p=h[0]));p&&(c=!0,e.mp-=p.mpCost||0,e.skillCooldown=2,this._executeSkill(e,p,r,l,s))}c||this._basicAttack(e,r,!0),this._updateHud()}_enemyAI(e){const t=this._allies.filter(s=>s.alive);t.length&&this._basicAttack(e,t,!1)}_basicAttack(e,t,s){t.sort((l,d)=>l.hp-d.hp);const a=t[0],i=Math.max(5,Math.min(95,e.hit-a.dodge));if(Math.random()*100>=i){this._log_(`${e.name} misses ${a.name}.`,"miss"),e.stance="attack",setTimeout(()=>{e.stance="ready"},300);return}const o=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),r=Math.max(Math.ceil(o*.15),o-a.armor);this._applyDamage(e,a,r,s?"#ff8060":"#e8a020"),this._log_(`${e.name} → ${a.name}: ${r}`,s?"hero":"enemy"),e.stance="attack",setTimeout(()=>{e.stance="ready"},300),this._updateHud()}_executeSkill(e,t,s,a,i){var x,u,g,S;e.stance="spell",setTimeout(()=>{e.stance="ready"},400),this.audio.playSfx("spell");const o=(i==null?void 0:i.attrs)||{STR:8,DEX:8,INT:8,CON:8};if(t.type==="heal"){const f=[...a].sort((T,A)=>T.hp/T.maxHp-A.hp/A.maxHp)[0];if(!f)return;const C=Math.round((t.healMult||1.5)*(o.INT||8));f.hp=Math.min(f.maxHp,f.hp+C),this._spawnDmgNumber(f.x,f.y-50,`+${C}`,"#60e880"),this._log_(`${e.name} uses ${t.name}: heals ${f.name} for ${C}`,"hero");return}if(t.type==="buff"){this._log_(`${e.name} uses ${t.name}!`,"hero"),(x=t.effect)!=null&&x.dmgBuff&&t.target==="party"&&a.forEach(f=>{f.dmgBuff=(f.dmgBuff||0)+t.effect.dmgBuff,f.dmgBuffRounds=t.effect.duration||2}),(u=t.effect)!=null&&u.dmgReduct&&t.target==="self"&&(e.dmgReduct=t.effect.dmgReduct,e.dmgReductRounds=t.effect.duration||2);return}const r=this._getSkillStat(t.damageStat,o),l=t.damageMult||1;let d=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),h=Math.round(d*l+r*.2),c=[];if(!t.aoe||t.aoe==="single")c=[s[0]];else if(t.aoe==="adjacent"){const f=(g=s[0])==null?void 0:g.groupIdx;c=s.filter(C=>C.groupIdx===f).slice(0,2)}else if(t.aoe==="group"){const f=(S=s[0])==null?void 0:S.groupIdx;c=s.filter(C=>C.groupIdx===f)}else t.aoe==="row"||t.aoe==="all"?c=s:c=[s[0]];const p=t.type==="magic"?"#c060ff":"#ff8060",y=[];for(const f of c){const C=Math.max(Math.ceil(h*.15),h-f.armor);this._applyDamage(e,f,C,p),y.push(f.name);for(const T of t.statusEffects||[])Math.random()<(T.chance||.5)&&this._applyStatus(f,T.type,T.duration||2,T.power||4)}this._log_(`${e.name} uses ${t.name}${c.length>1?` (×${c.length})`:""}: ${h} dmg`,"hero")}_getSkillStat(e,t){return!e||e==="str"?t.STR||8:e==="dex"?t.DEX||8:e==="int"?t.INT||8:e==="str_int"?Math.round(((t.STR||8)+(t.INT||8))/2):e==="str_dex"?Math.round(((t.STR||8)+(t.DEX||8))/2):t.STR||8}_applyDamage(e,t,s,a){let i=s;t.dmgReduct&&(i=Math.round(i*(1-t.dmgReduct))),t.hp-=i,this._flashMap.set(t.id,Le),this._spawnParticles(t.x,t.y-30),this._spawnDmgNumber(t.x,t.y-50,i,a),this.audio.playSfx("hit"),t.hp<=0&&(t.hp=0,t.alive=!1,t.stance="death",this._log_(`${t.name} defeated!`,"death"))}_applyStatus(e,t,s,a){e.statuses||(e.statuses=[]);const i=e.statuses.find(r=>r.type===t);if(i){i.duration=Math.max(i.duration,s);return}e.statuses.push({type:t,duration:s,power:a});const o={burn:"🔥",poison:"☠",bleed:"🩸",stun:"⚡"};this._log_(`${e.name} is ${t}ed! ${o[t]||""}`,"death")}_processStatusEffects(){const e=[...this._allies,...this._allEnemies];for(const t of e)t.alive&&(t.statuses=(t.statuses||[]).filter(s=>{if(s.type==="burn"||s.type==="poison"||s.type==="bleed"){const a=Math.max(1,s.power||3);t.hp-=a,this._spawnDmgNumber(t.x,t.y-45,a,s.type==="burn"?"#ff6020":s.type==="poison"?"#60c020":"#c02020"),t.hp<=0&&(t.hp=0,t.alive=!1,t.stance="death",this._log_(`${t.name} perishes from ${s.type}!`,"death"))}return s.duration--,s.duration>0}),t.dmgBuffRounds>0&&(t.dmgBuffRounds--,t.dmgBuffRounds===0&&(t.dmgBuff=0)),t.dmgReductRounds>0&&(t.dmgReductRounds--,t.dmgReductRounds===0&&(t.dmgReduct=0)));this._updateHud()}_checkCombatEnd(){const e=this._allEnemies.every(s=>!s.alive),t=this._allies.every(s=>!s.alive);e&&this._phase==="PLAYING"?(this._phase="VICTORY",setTimeout(()=>this._victory(),800)):t&&this._phase==="PLAYING"&&(this._phase="DEFEAT",setTimeout(()=>this._defeat(),800))}_spawnDmgNumber(e,t,s,a){!e&&!t||this._dmgNumbers.push({x:e+(Math.random()-.5)*20,y:t,text:String(s),color:a,life:.9,maxLife:.9})}_spawnParticles(e,t){if(!e&&!t)return;const s=["#e8a020","#ff6040","#f0c060","#ff4040"];for(let a=0;a<7;a++)this._particles.push({x:e,y:t,vx:(Math.random()-.5)*100,vy:-(Math.random()*80+30),size:Math.random()*4+2,color:s[Math.floor(Math.random()*s.length)],life:Math.random()*.4+.15})}_victory(){var x;this.audio.playSfx("victory");let e=0,t=0;const s=[];for(const u of this._allEnemies){e+=u.xpValue,t+=u.gold[0]+Math.floor(Math.random()*(u.gold[1]-u.gold[0]+1));const S={border_roads:.15,thornwood:.17,dust_roads:.18,ember_plateau:.2,hell_breach:.22,shattered_core:.23,cosmic_rift:.24,eternal_void:.25}[this.encounter._zoneId]||.15;if(Math.random()<S){const f={border_roads:["sword","dagger","light_chest","ring"],thornwood:["sword","axe","medium_chest","gloves","ring"],dust_roads:["axe","mace","medium_chest","boots","amulet"],ember_plateau:["greatsword","heavy_chest","helmet","amulet"],hell_breach:["greatsword","heavy_chest","helmet","amulet","staff"],shattered_core:["staff","wand","heavy_chest","amulet","ring"],cosmic_rift:["staff","wand","heavy_chest","amulet","ring"],eternal_void:["staff","wand","heavy_chest","amulet","ring"]},C={border_roads:"normal",thornwood:"magic",dust_roads:"magic",ember_plateau:"rare",hell_breach:"rare",shattered_core:"rare",cosmic_rift:"legendary",eternal_void:"legendary"},T={border_roads:"low",thornwood:"medium",dust_roads:"medium",ember_plateau:"high",hell_breach:"high",shattered_core:"elite",cosmic_rift:"elite",eternal_void:"exotic"},A=f[this.encounter._zoneId]||["sword","dagger","light_chest","ring"],he=C[this.encounter._zoneId]||"magic",me=T[this.encounter._zoneId]||"medium",D=E(A[Math.floor(Math.random()*A.length)],he,me);D&&(s.push(D),m.addToInventory(D))}}m.addGold(t);const i={border_roads:1,thornwood:1.5,dust_roads:2,ember_plateau:2.5,hell_breach:3,shattered_core:4,cosmic_rift:5,eternal_void:6}[this.encounter._zoneId]||1,o=this.encounter._bossNodeId?Math.round(15*i):0,r=Math.round(this._allEnemies.length*i)+o;m.addFame(r);const l=m.get();this._heroes.forEach((u,g)=>{l.party[g]&&(l.party[g].hp=u.hp)});const d=ke(l.party,e),h={border_roads:"thornwood",thornwood:"dust_roads",dust_roads:"ember_plateau",ember_plateau:"hell_breach",hell_breach:"shattered_core",shattered_core:"cosmic_rift",cosmic_rift:"eternal_void",eternal_void:null};let c=null,p=!1;if(this.encounter._bossNodeId){l.completedBosses||(l.completedBosses=[]),l.completedBosses.push(this.encounter._bossNodeId);const u=h[this.encounter._zoneId];u&&!(l.unlockedZones||[]).includes(u)&&(l.unlockedZones||(l.unlockedZones=["border_roads"]),l.unlockedZones.push(u),c=`${{thornwood:"Thornwood Forest",dust_roads:"The Dust Roads (Act 2)",ember_plateau:"The Ember Plateau",hell_breach:"The Hell Breach (Act 3)",shattered_core:"The Shattered Core",cosmic_rift:"The Cosmic Rift (Act 4)",eternal_void:"The Eternal Void"}[u]||"New zone"} unlocked!`),(this.encounter._zoneId==="eternal_void"||this.encounter._bossNodeId==="void_boss"||this.encounter._bossNodeId==="core_boss")&&(p=!0,m.setFlag("game_complete",!0))}const y=w("div","cbt-end-modal");y.innerHTML=`
      <div class="cem-box">
        <div class="cem-title" style="color:#e8a020">Victory!</div>
        <div class="cem-rewards">
          <div class="cer"><span>XP</span><strong>+${e}</strong></div>
          <div class="cer"><span>Gold</span><strong>+${t}</strong></div>
          ${s.length?`<div class="cer" style="grid-column:1/-1"><span>Items Found</span><strong style="color:${L.magic}">${s.map(u=>u.name).join(", ")}</strong></div>`:""}
          ${d.length?`<div class="cer" style="grid-column:1/-1;color:#e8a020">⭐ ${d.map(u=>`${u.name} reached Level ${u.level}!`).join(" ")}</div>`:""}
          ${c?`<div class="cer" style="grid-column:1/-1;color:#60c0ff;font-weight:700">🗺 ${c}</div>`:""}
          ${p?`<div class="cer" style="grid-column:1/-1;color:#e8d020;font-size:0.9rem;font-family:'Cinzel',serif">✦ The Emberveil is sealed. You have saved all of reality. ✦</div>`:""}
        </div>
        ${p?`
          <div style="display:flex;gap:0.5rem;justify-content:center">
            <button class="cem-btn" id="cem-continue">Continue</button>
            <button class="cem-btn" id="cem-ngplus" style="border-color:rgba(232,208,32,0.5);color:#e8d020">New Game+ ✦</button>
          </div>
        `:'<button class="cem-btn" id="cem-continue">Continue</button>'}
      </div>
    `,y.querySelector("#cem-continue").addEventListener("click",()=>{this.audio.playSfx("click");const g=m.get().party.some(S=>(S.pendingAttrPoints||0)>0);this.manager.pop(),g&&this.manager.push(new _e(this.manager,this.audio))}),(x=y.querySelector("#cem-ngplus"))==null||x.addEventListener("click",()=>{this.audio.playSfx("victory"),m.startNgPlus(),this.manager.pop()}),this._el.appendChild(y)}_defeat(){const e=m.get(),t=Math.floor(m.getGold()*.1);m.addGold(-t),e.party.forEach(a=>{a.hp=Math.max(1,Math.floor((a.maxHp||50)*.25))});const s=w("div","cbt-end-modal");s.innerHTML=`
      <div class="cem-box">
        <div class="cem-title" style="color:#c04030">Defeated</div>
        <div class="cem-body">Your party has fallen. You are returned to Emberglen to recover.</div>
        ${t>0?`<div style="color:#8a7a6a;font-size:0.78rem;margin-bottom:1rem">Gold lost: ${t}</div>`:""}
        <button class="cem-btn" style="border-color:rgba(192,64,48,0.5);color:#c04030">Return to Town</button>
      </div>
    `,s.querySelector(".cem-btn").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.appendChild(s)}_drawBackground(e,t,s){const a=this.encounter.zoneId||"border_roads",i=s*.63,o={border_roads:{sky:["#0c0e14","#151c24","#1a2830"],ground:"#0a1018",grass:"rgba(60,90,120,0.3)",star:!0},thornwood:{sky:["#040a06","#081208","#0a1a0a"],ground:"#060e06",grass:"rgba(20,80,20,0.4)",star:!1,fog:"rgba(20,60,20,0.08)"},dust_roads:{sky:["#1a0e06","#280e04","#3a1c08"],ground:"#1c1008",grass:"rgba(160,80,20,0.3)",star:!0,embers:!0},ember_plateau:{sky:["#280404","#3c0c04","#5a1408"],ground:"#200808",grass:"rgba(200,40,10,0.3)",star:!1,embers:!0,glow:"#c04020"},hell_breach:{sky:["#1a0000","#300408","#480010"],ground:"#140004",grass:"rgba(160,0,20,0.4)",star:!1,embers:!0,glow:"#c00820",lava:!0},shattered_core:{sky:["#0a0014","#180028","#280040"],ground:"#08000e",grass:"rgba(120,0,200,0.3)",star:!0,embers:!0,glow:"#6020c0",lava:!1},cosmic_rift:{sky:["#000010","#000828","#001040"],ground:"#000008",grass:"rgba(0,80,200,0.25)",star:!0,embers:!0,glow:"#0040ff",lava:!1},eternal_void:{sky:["#000000","#040004","#080014"],ground:"#000000",grass:"rgba(80,0,180,0.2)",star:!0,embers:!0,glow:"#4000c0",lava:!1}},r=o[a]||o.border_roads,l=e.createLinearGradient(0,0,0,i);if(l.addColorStop(0,r.sky[0]),l.addColorStop(.5,r.sky[1]),l.addColorStop(1,r.sky[2]),e.fillStyle=l,e.fillRect(0,0,t,s),r.star){e.fillStyle="rgba(255,255,255,0.6)";for(let d=0;d<40;d++){const h=(d*137.5+a.charCodeAt(0)*7)%t,c=(d*97+a.charCodeAt(1)*13)%(i*.8);e.beginPath(),e.arc(h,c,d%3===0?1:.5,0,Math.PI*2),e.fill()}}if(a==="thornwood"){e.fillStyle="#020804";for(let d=0;d<7;d++){const h=d/6*t,c=60+d*37%40;e.beginPath(),e.moveTo(h,i),e.lineTo(h-18,i-c*.5),e.lineTo(h,i-c),e.lineTo(h+18,i-c*.5),e.closePath(),e.fill()}}else if(a==="ember_plateau"||a==="dust_roads"){e.fillStyle="#0e0604";for(let d=0;d<4;d++){const h=d/3.5*t-20,c=60+d*20,p=30+d*15;e.fillRect(h,i-p,c,p)}}else if(a==="hell_breach"||a==="shattered_core"){e.fillStyle=r.sky[0];for(let d=0;d<5;d++){const h=d/4.5*t,c=80+d*20;e.beginPath(),e.moveTo(h-12,i),e.lineTo(h,i-c),e.lineTo(h+12,i),e.closePath(),e.fill()}if(r.lava||a==="ember_plateau"){const d=e.createLinearGradient(0,i-30,0,i);d.addColorStop(0,"transparent"),d.addColorStop(1,r.glow?r.glow+"88":"rgba(200,40,0,0.4)"),e.fillStyle=d,e.fillRect(0,i-30,t,30)}}if(r.fog&&(e.fillStyle=r.fog,e.fillRect(0,i-20,t,20)),e.fillStyle=r.ground,e.fillRect(0,i,t,s-i),e.fillStyle=r.grass,e.fillRect(0,i,t,2),r.embers){e.fillStyle=r.glow?r.glow+"aa":"rgba(220,80,20,0.7)";for(let d=0;d<12;d++){const h=(this._t*(20+d*7)+d*t/12)%t,c=i-10-(this._t*(30+d*11)+d*40)%(i*.7);e.beginPath(),e.arc(h,c,1.2,0,Math.PI*2),e.fill()}}this._groundY=i,this._drawWeather(e,t,s,a)}_drawWeather(e,t,s,a){const i=this._t;if(a==="border_roads"){e.strokeStyle="rgba(120,160,200,0.18)",e.lineWidth=1;for(let o=0;o<25;o++){const r=(o*173+i*80)%t,l=(o*97+i*180)%s;e.beginPath(),e.moveTo(r,l),e.lineTo(r-2,l+10),e.stroke()}}else if(a==="thornwood"){e.fillStyle="rgba(30,80,30,0.06)";for(let o=0;o<4;o++){const r=(o*200+i*12)%(t+200)-100,l=s*.55+Math.sin(i*.3+o)*20;e.beginPath(),e.ellipse(r,l,120,18,0,0,Math.PI*2),e.fill()}}else if(a==="dust_roads"||a==="ember_plateau"){e.fillStyle="rgba(180,140,80,0.35)";for(let o=0;o<20;o++){const r=(o*137-i*30+t*2)%t,l=(o*79+i*10)%(s*.6);e.beginPath(),e.arc(r,l,1.5,0,Math.PI*2),e.fill()}}else if(a==="hell_breach"||a==="shattered_core"){const o=a==="shattered_core"?"rgba(160,60,240,0.5)":"rgba(240,40,20,0.4)";e.fillStyle=o;for(let r=0;r<18;r++){const l=(r*157+Math.sin(i*.5+r)*30)%t,d=(r*113-i*15+s)%s;e.beginPath(),e.arc(l,d,1.8,0,Math.PI*2),e.fill()}}}draw(e){const t=this.manager.width,s=this.manager.height;this._drawBackground(e,t,s),e.strokeStyle="rgba(232,160,32,0.06)",e.lineWidth=1,e.setLineDash([4,8]),e.beginPath();const a=this._groundY||s*.63;e.moveTo(t/2,40),e.lineTo(t/2,a),e.stroke(),e.setLineDash([]);const i=t*.22,o=a-8;this._heroes.forEach((l,d)=>{l.x=i-d*55,l.y=o,this._drawUnit(e,l)}),this._companions.forEach((l,d)=>{l.x=i-(this._heroes.length+d)*45,l.y=o-10,this._drawUnit(e,l)});const r=t*.68;this._enemyGroups.forEach((l,d)=>{const h=r+d*70;l.forEach((c,p)=>{c.x=h,c.y=o-p*16,this._drawUnit(e,c)})}),e.save();for(const l of this._particles)e.globalAlpha=l.life,e.fillStyle=l.color,e.shadowBlur=8,e.shadowColor=l.color,e.beginPath(),e.arc(l.x,l.y,l.size,0,Math.PI*2),e.fill();e.shadowBlur=0,e.globalAlpha=1,e.restore(),e.save();for(const l of this._dmgNumbers){const d=Math.min(l.life/l.maxLife*2,1);e.globalAlpha=d,e.font=`700 ${Math.round(14+d*4)}px Inter, sans-serif`,e.textAlign="center",e.textBaseline="middle",e.fillStyle=l.color,e.shadowBlur=10,e.shadowColor=l.color,e.fillText(l.text,l.x,l.y)}if(e.shadowBlur=0,e.globalAlpha=1,e.restore(),this._phase==="START"){const l=Math.min(this._t/.4,1)*Math.max(0,1-(this._t-.6)/.4);e.save(),e.globalAlpha=l;const d=Math.round(t*.055);e.font=`900 ${d}px Cinzel, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=30,e.shadowColor="#c04030",e.fillStyle="#f0e8d8",e.fillText(this.encounter.name,t/2,s*.28),e.restore()}}_drawUnit(e,t){const s=t.x,a=t.y;if(!t.alive&&t.stance!=="death")return;const i=this._flashMap.has(t.id),o=t.isHero,r=o?50:38,l=t.alive?1:.35;e.save(),e.globalAlpha=l,e.fillStyle="rgba(0,0,0,0.25)",e.beginPath(),e.ellipse(s,a+3,16,5,0,0,Math.PI*2),e.fill(),i&&(e.shadowBlur=18,e.shadowColor="#ff4040");const d=o?N[t.class]:N[t.enemyId],h=o||t.stance==="ready"?"south":"east",c=d?P[d]:null,p=c?c[h]:null;if(p&&p.complete&&p.naturalWidth>0){const x=p.naturalWidth,u=p.naturalHeight,g=r/Math.max(x,u)*1.6,S=x*g,f=u*g;e.drawImage(p,s-S/2,a-f,S,f)}else{const x=i?"#ff8060":o?this._heroColor(t.class):"#6B3A0A",u=o?"#e8a020":"#c0392b";e.fillStyle=x,e.beginPath(),e.roundRect(s-r*.28,a-r,r*.56,r*.48,4),e.fill(),e.beginPath(),e.arc(s,a-r*.8,r*.2,0,Math.PI*2),e.fill(),e.fillStyle=u,e.fillRect(s-r*.18,a-r*.52,r*.14,r*.46),e.fillRect(s+r*.04,a-r*.52,r*.14,r*.46),t.stance==="attack"&&(o?(e.fillStyle="#c8c8d8",e.beginPath(),e.moveTo(s+r*.28,a-r*.72),e.lineTo(s+r*.5,a-r*.48),e.lineTo(s+r*.38,a-r*.38),e.closePath(),e.fill()):(e.fillStyle="#c0392b",e.beginPath(),e.moveTo(s-r*.35,a-r*.55),e.lineTo(s-r*.6,a-r*.38),e.lineTo(s-r*.5,a-r*.28),e.closePath(),e.fill()))}if(t.alive||(e.strokeStyle="#ff4040",e.lineWidth=1.5,e.beginPath(),e.moveTo(s-5,a-r*.87),e.lineTo(s-2,a-r*.77),e.moveTo(s-2,a-r*.87),e.lineTo(s-5,a-r*.77),e.moveTo(s+2,a-r*.87),e.lineTo(s+5,a-r*.77),e.moveTo(s+5,a-r*.87),e.lineTo(s+2,a-r*.77),e.stroke()),e.shadowBlur=0,e.globalAlpha=1,t.alive){const x=r*1.1,u=s-x/2,g=a-r-8;e.fillStyle="rgba(0,0,0,0.5)",e.fillRect(u,g,x,3);const S=Math.max(0,t.hp/t.maxHp);e.fillStyle=S>.5?"#40c870":S>.25?"#e8a020":"#c04030",e.fillRect(u,g,x*S,3);const f=t.statuses||[];if(f.length>0){const C={burn:"#ff6020",poison:"#60c040",bleed:"#c02020",stun:"#e0c020"};f.forEach((T,A)=>{e.fillStyle=C[T.type]||"#aaaaaa",e.beginPath(),e.arc(u+4+A*7,g-6,3,0,Math.PI*2),e.fill()})}o||(e.font="9px Inter, sans-serif",e.textAlign="center",e.fillStyle="rgba(240,232,216,0.65)",e.fillText(t.name,s,g-(f.length?10:2)))}e.restore()}_preloadSprites(e){const t=m.get();for(const s of[...t.party,...t.companions]){const a=N[s.class];a&&Y(a)}for(const s of e.enemies){const a=N[s.id];a&&Y(a)}}_heroColor(e){return{warrior:"#607080",paladin:"#d4af37",ranger:"#4a7a40",rogue:"#3a3050",cleric:"#e0d0a0",bard:"#8060a0",mage:"#4060c0",necromancer:"#503060",warlock:"#802040",demon_hunter:"#c04060",scavenger:"#806040",swashbuckler:"#c08020",dragon_knight:"#806020",pyromancer:"#c04020"}[e]||"#607080"}update_old(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const Ae=`
.combat-screen {
  position: absolute; inset: 0; pointer-events: none;
  font-family: 'Inter', sans-serif; color: #f0e8d8;
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
.hud-speed-btn { background: rgba(232,160,32,0.12); border: 1px solid rgba(232,160,32,0.35); color: #e8a020; font-size: 0.7rem; padding: 0.3rem 0.6rem; border-radius: 6px; cursor: pointer; flex-shrink: 0; min-height: 44px; min-width: 44px; }
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
`;class ze{constructor(e,t,s,a){this.manager=e,this.audio=t,this.event=s,this.onComplete=a,this._el=null,this._lineIdx=0,this._phase="LINES",this._choiceResult=null,this._revealTimer=0,this._revealed=0,this._currentText=""}onEnter(){this._build()}_build(){M("dialog-styles",Ie),this._el=w("div","dialog-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML=`
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
    `,this._el.querySelector("#dlg-skip").addEventListener("click",()=>{this._phase==="LINES"&&this._advance()}),this._el.querySelector("#dlg-bubble").addEventListener("click",()=>{this._phase==="LINES"&&this._advance()}),this._showCurrentLine()}_npcInitials(){return this.event.npcName.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase()}_showCurrentLine(){const e=this.event.lines||[];if(this._lineIdx>=e.length){this._showChoices();return}const t=e[this._lineIdx];this._currentText=t.text,this._revealed=0,this._revealTimer=0;const s=this._el.querySelector("#dlg-bubble"),a=this._el.querySelector("#dlg-cursor");t.speaker==="hero"?s.classList.add("hero-bubble"):s.classList.remove("hero-bubble"),a.style.opacity="0",this._phase="LINES"}update(e){var i,o;if(this._phase!=="LINES")return;const t=this.event.lines||[];if(this._lineIdx>=t.length)return;const s=45;this._revealTimer+=e;const a=Math.floor(this._revealTimer*s);if(a>this._revealed){this._revealed=Math.min(a,this._currentText.length);const r=(i=this._el)==null?void 0:i.querySelector("#dlg-text");r&&(r.textContent=this._currentText.slice(0,this._revealed))}if(this._revealed>=this._currentText.length){const r=(o=this._el)==null?void 0:o.querySelector("#dlg-cursor");r&&(r.style.opacity="1")}}_advance(){var e,t;if(this._revealed<this._currentText.length){this._revealed=this._currentText.length;const s=(e=this._el)==null?void 0:e.querySelector("#dlg-text");s&&(s.textContent=this._currentText);const a=(t=this._el)==null?void 0:t.querySelector("#dlg-cursor");a&&(a.style.opacity="1");return}this._lineIdx++,this._showCurrentLine()}_showChoices(){var o;this._phase="CHOICES";const e=this._el.querySelector("#dlg-skip");e&&(e.style.display="none");const t=this._el.querySelector("#dlg-text");t&&(t.textContent="");const s=(o=this._el)==null?void 0:o.querySelector("#dlg-cursor");s&&(s.style.opacity="0");const a=this.event.choices||[],i=this._el.querySelector("#dlg-choices");i.innerHTML=a.map((r,l)=>`
      <button class="dlg-choice${r.skillCheck?" skill-check":""}" data-idx="${l}">
        ${r.skillCheck?`<span class="sc-badge">${r.skillCheck.stat.toUpperCase()} ${r.skillCheck.dc}</span>`:""}
        ${r.text}
      </button>
    `).join(""),i.querySelectorAll(".dlg-choice").forEach(r=>{r.addEventListener("click",()=>{this.audio.playSfx("click");const l=parseInt(r.dataset.idx);this._selectChoice(l)})})}_selectChoice(e){var o;const t=this.event.choices[e],a=m.get().party[0];let i=t.outcome;if(t.skillCheck){const r=t.skillCheck.stat.toUpperCase(),l=t.skillCheck.dc;i=(((o=a==null?void 0:a.attrs)==null?void 0:o[r])||8)+Math.floor(Math.random()*10)+1>=l?t.outcomes.pass:t.outcomes.fail}t.effect&&t.effect.gold&&m.addGold(t.effect.gold),this._showOutcome(i,t)}_showOutcome(e,t){var r,l,d,h,c;this._phase="OUTCOME";const s=(r=this.event.outcomes)==null?void 0:r[e];if(!s){this._finish(e);return}if(s.setFlag&&m.setFlag(s.setFlag,!0),(l=s.reward)!=null&&l.item){const p=E("ring","magic","medium",void 0);p&&(p.name="Veil Lens",p.description="A cracked lens that reveals hidden Veil energies.",m.addToInventory(p))}const a=(d=this._el)==null?void 0:d.querySelector("#dlg-text");a&&(a.textContent=s.text);const i=(h=this._el)==null?void 0:h.querySelector("#dlg-cursor");i&&(i.style.opacity="0");const o=this._el.querySelector("#dlg-choices");o.innerHTML=`
      <button class="dlg-choice dlg-continue" id="dlg-done">Continue</button>
    `,(c=this._el.querySelector("#dlg-done"))==null||c.addEventListener("click",()=>{this.audio.playSfx("click"),this._finish(e,s)})}_finish(e,t){this.manager.pop(),this.onComplete&&this.onComplete(e,t)}draw(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const Ie=`
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
`,V=[...te,...fe,...be,...ve],G={[k.COMBAT]:{color:"#c04030",label:"Combat"},[k.DIALOG]:{color:"#4080c0",label:"Encounter"},[k.TOWN]:{color:"#40a860",label:"Town"},[k.TREASURE]:{color:"#e8a020",label:"Treasure"},[k.AMBUSH]:{color:"#8a2020",label:"Ambush"},[k.BOSS]:{color:"#9040c0",label:"Boss"},[k.LORE]:{color:"#6a9040",label:"Discovery"},[k.SHRINE]:{color:"#60c0e0",label:"Shrine"},[k.CHALLENGE]:{color:"#e06020",label:"Challenge"}},He=q.goblin_patrol;class Z{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._hovered=null,this._t=0;const s=m.get();this._zone=V.find(a=>a.id===s.zoneId)||te[0]}onEnter(){this._build()}_getUnlockedZones(){const t=m.get().unlockedZones||["border_roads"];return V.filter(s=>t.includes(s.id))}_build(){M("map-styles",qe),this._el=w("div","map-screen");const e=this._getUnlockedZones();this._el.innerHTML=`
      <div class="map-header">
        <button class="map-back" id="map-back">← Back to Town</button>
        <div class="map-zone-tabs" id="map-zone-tabs">
          ${e.map(t=>`
            <button class="mzt${t.id===this._zone.id?" active":""}" data-zone="${t.id}">${t.name}</button>
          `).join("")}
        </div>
        <div class="map-act-tag">Act I · The Goblin Frontier</div>
      </div>
      <div class="map-canvas-wrap">
        <canvas id="map-canvas"></canvas>
        <div id="map-node-tooltip" class="map-node-tooltip" style="display:none"></div>
      </div>
      <div class="map-legend">
        ${Object.entries(G).map(([t,s])=>`<div class="legend-item"><div class="legend-dot" style="background:${s.color}"></div><span>${s.label}</span></div>`).join("")}
      </div>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#map-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".mzt").forEach(t=>{t.addEventListener("click",()=>{const s=V.find(a=>a.id===t.dataset.zone);s&&(this.audio.playSfx("click"),this._zone=s,m.get().zoneId=s.id,_(this._el),this._el=null,this._build())})}),this._setupCanvas()}_setupCanvas(){const e=this._el.querySelector(".map-canvas-wrap"),t=this._el.querySelector("#map-canvas");t.width=e.clientWidth,t.height=e.clientHeight,t.addEventListener("click",s=>this._onClick(s,t)),t.addEventListener("mousemove",s=>this._onHover(s,t)),t.addEventListener("mouseleave",()=>{this._hovered=null,this._hideNodeTooltip()}),this._canvas=t,this._ctx=t.getContext("2d"),this._drawMap()}_nodePos(e,t,s){return{x:e.x*t,y:e.y*s}}_drawMap(){var l,d,h;const e=this._ctx,t=this._canvas.width,s=this._canvas.height,a=m.get(),i=e.createLinearGradient(0,0,t,s);i.addColorStop(0,"#080e08"),i.addColorStop(1,"#0d180e"),e.fillStyle=i,e.fillRect(0,0,t,s),e.strokeStyle="rgba(64,168,96,0.05)",e.lineWidth=1;for(let c=0;c<t;c+=40)e.beginPath(),e.moveTo(c,0),e.lineTo(c,s),e.stroke();for(let c=0;c<s;c+=40)e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke();const o=this._zone;for(const c of o.nodes){const p=this._nodePos(c,t,s);for(const y of c.exits){const x=o.nodes.find(S=>S.id===y);if(!x)continue;const u=this._nodePos(x,t,s),g=((l=a.visitedNodes)==null?void 0:l.has(c.id))&&((d=a.visitedNodes)==null?void 0:d.has(y));e.strokeStyle=g?"rgba(64,168,96,0.5)":"rgba(100,80,60,0.3)",e.lineWidth=g?2:1,e.setLineDash(g?[]:[5,4]),e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(u.x,u.y),e.stroke(),e.setLineDash([])}}for(const c of o.nodes){const p=this._nodePos(c,t,s),y=G[c.type]||{color:"#8a7a6a",label:c.type},x=(h=a.visitedNodes)==null?void 0:h.has(c.id),u=a.nodeId===c.id,g=this._hovered===c.id,S=this._isAccessible(c,o,a);if(u||g){const T=e.createRadialGradient(p.x,p.y,0,p.x,p.y,30);T.addColorStop(0,`${y.color}40`),T.addColorStop(1,"transparent"),e.fillStyle=T,e.beginPath(),e.arc(p.x,p.y,30,0,Math.PI*2),e.fill()}const f=c.type===k.BOSS?18:c.type===k.TOWN?16:13;e.save(),e.globalAlpha=S||x?1:.35,e.fillStyle=x||u?y.color:"rgba(20,15,10,0.9)",e.strokeStyle=y.color,e.lineWidth=u?3:g?2.5:1.5,e.shadowBlur=u?15:g?10:0,e.shadowColor=y.color,e.beginPath(),e.arc(p.x,p.y,f,0,Math.PI*2),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=x?"#0a0608":y.color,e.font=`bold ${f*.85}px Inter, sans-serif`,e.textAlign="center",e.textBaseline="middle";const C=c.type===k.BOSS?"B":c.type===k.TOWN?"T":c.type[0].toUpperCase();e.fillText(C,p.x,p.y),e.fillStyle=S?"#f0e8d8":"#8a7a6a",e.font=`${f<14?"10":"11"}px Inter, sans-serif`,e.fillText(c.name,p.x,p.y+f+13),e.restore()}const r=o.nodes.find(c=>c.id===a.nodeId);if(r){const c=this._nodePos(r,t,s);e.save(),e.fillStyle="#f0e8d8",e.shadowBlur=12,e.shadowColor="#e8a020",e.font="18px sans-serif",e.textAlign="center",e.fillText("★",c.x,c.y-26),e.restore()}}_isAccessible(e,t,s){var a,i;if((a=s.visitedNodes)!=null&&a.has(e.id)||s.nodeId===e.id)return!0;for(const o of t.nodes)if((i=s.visitedNodes)!=null&&i.has(o.id)&&o.exits.includes(e.id)||s.nodeId===o.id&&o.exits.includes(e.id))return!0;return!1}_onClick(e,t){const s=t.getBoundingClientRect(),a=(e.clientX-s.left)*(t.width/s.width),i=(e.clientY-s.top)*(t.height/s.height),o=m.get();for(const r of this._zone.nodes){const l=this._nodePos(r,t.width,t.height),d=Math.hypot(a-l.x,i-l.y),h=r.type===k.BOSS?18:14;if(d<=h+8){if(!this._isAccessible(r,this._zone,o))return;this.audio.playSfx("click"),this._navigateToNode(r);return}}}_onHover(e,t){const s=t.getBoundingClientRect(),a=(e.clientX-s.left)*(t.width/s.width),i=(e.clientY-s.top)*(t.height/s.height);let o=null;for(const r of this._zone.nodes){const l=this._nodePos(r,t.width,t.height);if(Math.hypot(a-l.x,i-l.y)<=20){o=r.id;break}}if(o!==this._hovered)if(this._hovered=o,this._drawMap(),o){const r=this._zone.nodes.find(d=>d.id===o),l=G[r.type]||{};this._showNodeTooltip(e,r,l)}else this._hideNodeTooltip()}_showNodeTooltip(e,t,s){const a=this._el.querySelector("#map-node-tooltip");a&&(a.innerHTML=`<div class="mntt-name">${t.name}</div><div class="mntt-type" style="color:${s.color}">${s.label}</div>`,a.style.display="block",a.style.left=`${e.clientX-this._el.getBoundingClientRect().left+12}px`,a.style.top=`${e.clientY-this._el.getBoundingClientRect().top-40}px`)}_hideNodeTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#map-node-tooltip");e&&(e.style.display="none")}_navigateToNode(e){switch(m.visitNode(e.id),m.get().nodeId=e.id,e.type){case k.TOWN:this.manager.pop();break;case k.COMBAT:case k.AMBUSH:{const t=e.encounter,s=t?{...q[t],name:e.name}:{...He,name:e.name};s.zoneId=this._zone.id,this.manager.push(new R(this.manager,this.audio,null,s));break}case k.DIALOG:{const t=W[e.id]||W.shady_wanderer;this.manager.push(new ze(this.manager,this.audio,t,(s,a)=>{if(a!=null&&a.startCombat){const i={name:"Bandit Ambush",zoneId:this._zone.id,enemies:[{id:"bandit",name:"Bandit",count:2,hp:28,maxHp:28,dmg:[6,11],armor:3,hit:70,dodge:10,xpValue:20,gold:[4,10]}]};this.manager.push(new R(this.manager,this.audio,null,i))}}));break}case k.LORE:this._showLoreModal(e);break;case k.SHRINE:this._showShrineModal(e);break;case k.CHALLENGE:{const t=e.encounter,s=t?{...q[t],name:e.name}:null;s&&(s.zoneId=this._zone.id,this.manager.push(new R(this.manager,this.audio,null,s)));break}case k.TREASURE:this._showTreasureModal(e);break;case k.BOSS:{const t=e.encounter,s=t?{...q[t],name:e.name}:{...q.border_boss,name:e.name};s._bossNodeId=e.id,s._zoneId=this._zone.id,this.manager.push(new R(this.manager,this.audio,null,s));break}}this._drawMap()}_showLoreModal(e){const t=w("div","map-modal");t.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title">${e.name}</div>
        <div class="mm-body" style="color:#c0b090;font-size:0.88rem;line-height:1.6">
          ${this._getLoreText(e.id)}
        </div>
        <button class="mm-btn">Continue</button>
      </div>
    `,t.querySelector(".mm-overlay").addEventListener("click",()=>_(t)),t.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("click"),_(t)}),this._el.appendChild(t)}_showTreasureModal(e){const t=60+Math.floor(Math.random()*60),s=w("div","map-modal");s.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title" style="color:#e8a020">Treasure Found!</div>
        <div class="mm-body">You discover a hidden cache among the roots of an ancient oak. Inside: <strong style="color:#e8a020">${t} gold</strong> and a weathered map fragment.</div>
        <button class="mm-btn">Claim Reward</button>
      </div>
    `,s.querySelector(".mm-overlay").addEventListener("click",()=>_(s)),s.querySelector(".mm-btn").addEventListener("click",()=>{this.audio.playSfx("victory"),m.addGold(t),_(s)}),this._el.appendChild(s)}_showShrineModal(e){var l,d,h;const t=m.get(),s=e.shrineType||"heal",a=t.visitedNodes.has(e.id),i={heal:{title:"Ancient Shrine",body:"A shrine glows with soft golden light. The weary traveller finds rest here.",btn:"Rest at the Shrine",action:()=>{[...t.party,...t.companions].forEach(c=>{c.hp>0&&(c.hp=Math.min(c.maxHp||100,c.hp+Math.floor((c.maxHp||100)*.5)))})}},empower:{title:"Cosmic Shrine",body:"Reality bends around this altar. Power radiates from its surface — ancient, vast, unknowable.",btn:"Accept the Blessing",action:()=>{[...t.party,...t.companions].forEach(c=>{c.hp>0&&(c.hp=c.maxHp||100,c.mp=c.maxMp||80)}),m.addFame(5)}},fullrestore:{title:"The Last Shrine",body:"In the depths of the Void, this shrine stands as the final mercy before the end. It pulses with every color at once.",btn:"Be Restored",action:()=>{[...t.party,...t.companions].forEach(c=>{c.hp=c.maxHp||100,c.mp=c.maxMp||80,c.dead=!1})}}},o=i[s]||i.heal,r=w("div","map-modal");r.innerHTML=`
      <div class="mm-overlay"></div>
      <div class="mm-box">
        <div class="mm-title" style="color:#80d0ff">✦ ${o.title}</div>
        <div class="mm-body">${o.body}${a?'<br><em style="color:#8a7a6a;font-size:0.75rem">You have visited this shrine before.</em>':""}</div>
        ${a?"":`<button class="mm-btn">${o.btn}</button>`}
        <button class="mm-btn" style="background:transparent;border-color:rgba(240,232,216,0.2);margin-top:0.5rem" id="shrine-close">Continue</button>
      </div>
    `,(l=r.querySelector(".mm-overlay"))==null||l.addEventListener("click",()=>_(r)),(d=r.querySelector("#shrine-close"))==null||d.addEventListener("click",()=>_(r)),(h=r.querySelector(".mm-btn:not(#shrine-close)"))==null||h.addEventListener("click",()=>{a||(this.audio.playSfx("levelup"),o.action(),_(r))}),this._el.appendChild(r)}_getLoreText(e){return{crossroads_b:"The village is quiet. Too quiet. Scorched thatch still smolders on the rooftops, but the fires are old — three days at least. Whoever — whatever — drove these people out left no bodies. Only silence, and the faint smell of something wrong in the air. Like copper and rot.",hidden_path:'Half-buried in moss, the runestone pulses with a faint, sickly light. The runes are old — older than the kingdom itself. One phrase repeats, carved over and over in increasingly desperate strokes: "The veil does not hold." Mira the Seer would want to know about this.'}[e]||"There is nothing more to see here. The road calls you forward."}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="",this._drawMap())}update(e){this._t+=e}draw(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const qe=`
.map-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  background: #08100a; font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.map-header {
  display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
  padding: 0.75rem 1.5rem; border-bottom: 1px solid rgba(232,160,32,0.15);
  background: rgba(0,0,0,0.3); flex-shrink: 0;
}
.map-zone-tabs { display: flex; gap: 0.5rem; flex: 1; }
.mzt {
  padding: 0.35rem 0.85rem; border-radius: 6px; min-height: 36px;
  border: 1px solid rgba(64,168,96,0.25); background: rgba(64,168,96,0.06);
  color: #6ab87a; font-size: 0.72rem; cursor: pointer; font-family: 'Inter', sans-serif;
  transition: background 0.12s;
}
.mzt:hover { background: rgba(64,168,96,0.14); }
.mzt.active { background: rgba(64,168,96,0.18); border-color: rgba(64,168,96,0.5); color: #90d8a0; font-weight: 600; }
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
`,Ne=["weapon","offhand","head","chest","legs","hands","feet","ring1","ring2","necklace"],Re={weapon:"Weapon",offhand:"Off-hand",head:"Head",chest:"Chest",legs:"Legs",hands:"Hands",feet:"Feet",ring1:"Ring",ring2:"Ring",necklace:"Necklace"};class Pe{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._tt=null}onEnter(){this._build()}_build(){M("inv-styles",Be),this._el=w("div","inv-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=m.get(),t=[...e.party,...e.companions],s=t[this._selectedCharIdx]||t[0];this._selectedCharIdx>=t.length&&(this._selectedCharIdx=0),this._el.innerHTML=`
      <div class="inv-header">
        <div class="inv-char-tabs" id="char-tabs">
          ${t.map((a,i)=>`
            <button class="char-tab${i===this._selectedCharIdx?" active":""}" data-idx="${i}">
              ${a.name}<br><small>${a.className||a.class}</small>
            </button>
          `).join("")}
        </div>
        <button class="inv-close" id="inv-close">✕ Close</button>
      </div>
      <div class="inv-layout">
        <!-- Equipment slots (left) -->
        <div class="equip-panel">
          <div class="panel-label">Equipped — ${(s==null?void 0:s.name)||"No Character"}</div>
          <div class="equip-slots" id="equip-slots">
            ${Ne.map(a=>{var o;const i=(o=s==null?void 0:s.equipment)==null?void 0:o[a];return`
                <div class="equip-slot${i?" has-item":""}" data-slot="${a}">
                  <div class="es-label">${Re[a]}</div>
                  ${i?`
                    <div class="es-item" data-itemid="${i.id}" data-slot="${a}">
                      <div class="esi-name" style="color:${L[i.rarity]}">${i.name}</div>
                      <div class="esi-stat">${i.dmg?`${i.dmg[0]}-${i.dmg[1]}`:i.armor?`+${i.armor} arm`:""}</div>
                    </div>
                  `:'<div class="es-empty">— empty —</div>'}
                </div>
              `}).join("")}
          </div>
          <div class="char-stats-panel">
            <div class="panel-label">Character Stats</div>
            ${this._renderCharStats(s)}
          </div>
        </div>
        <!-- Inventory grid (right) -->
        <div class="inv-items-panel">
          <div class="panel-label">Inventory (${e.inventory.length} items)</div>
          <div class="inv-grid" id="inv-grid">
            ${e.inventory.length===0?'<div class="inv-empty">Your pack is empty. Visit the merchant or defeat enemies to find equipment.</div>':e.inventory.map(a=>`
                <div class="inv-item-card" data-id="${a.id}">
                  <div class="iic-rarity-bar" style="background:${L[a.rarity]}"></div>
                  <div class="iic-name" style="color:${L[a.rarity]}">${a.name}</div>
                  <div class="iic-type">${a.subtype||a.type}</div>
                  <div class="iic-stat">${a.dmg?`⚔ ${a.dmg[0]}-${a.dmg[1]}`:a.armor?`🛡 +${a.armor}`:""}</div>
                  <div class="iic-quality">${a.quality}</div>
                  <button class="iic-equip-btn" data-equip="${a.id}">Equip</button>
                </div>
              `).join("")}
          </div>
        </div>
      </div>
      <div id="inv-tt" class="inv-tooltip" style="display:none"></div>
    `,this._wireEvents()}_renderCharStats(e){if(!e)return'<div class="stat-row"><span>No character selected</span></div>';const t=e.attrs,s=e.equipment||{};let a=0;for(const d of Object.values(s))d!=null&&d.armor&&(a+=d.armor);const i=50+t.CON*10,o=30+t.INT*8,r=Math.min(95,70+Math.round(t.DEX*1.2)),l=Math.min(40,5+Math.round(t.DEX*.8));return`
      <div class="stat-row"><span class="sr-label">HP</span><span class="sr-val">${i}</span></div>
      <div class="stat-row"><span class="sr-label">Mana</span><span class="sr-val">${o}</span></div>
      <div class="stat-row"><span class="sr-label">Armor</span><span class="sr-val">${a}</span></div>
      <div class="stat-row"><span class="sr-label">Hit</span><span class="sr-val">${r}%</span></div>
      <div class="stat-row"><span class="sr-label">Dodge</span><span class="sr-val">${l}%</span></div>
      <div class="stat-row"><span class="sr-label">STR/DEX/INT/CON</span><span class="sr-val">${t.STR}/${t.DEX}/${t.INT}/${t.CON}</span></div>
    `}_wireEvents(){var e;(e=this._el.querySelector("#inv-close"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".char-tab").forEach(t=>{t.addEventListener("click",()=>{this.audio.playSfx("click"),this._selectedCharIdx=parseInt(t.dataset.idx),this._render()})}),this._el.querySelectorAll("[data-equip]").forEach(t=>{t.addEventListener("click",()=>{var l;this.audio.playSfx("click");const s=t.dataset.equip,a=m.get(),i=a.party[this._selectedCharIdx],o=a.inventory.find(d=>d.id===s);if(!i||!o)return;let r=o.slot||o.subtype;r==="ring"&&(r=(l=i.equipment)!=null&&l.ring1?"ring2":"ring1"),i.equipment[r]&&m.addToInventory(i.equipment[r]),i.equipment||(i.equipment={}),i.equipment[r]=o,m.removeFromInventory(s),this._render()})}),this._el.querySelectorAll("[data-slot]").forEach(t=>{t.dataset.itemid&&t.addEventListener("click",()=>{var o;const a=m.get().party[this._selectedCharIdx],i=t.dataset.slot;(o=a==null?void 0:a.equipment)!=null&&o[i]&&(this.audio.playSfx("click"),m.addToInventory(a.equipment[i]),delete a.equipment[i],this._render())})}),this._el.querySelectorAll(".inv-item-card, .es-item").forEach(t=>{t.addEventListener("mouseenter",s=>{const a=t.dataset.id||t.dataset.itemid,i=m.get(),o=i.party[this._selectedCharIdx],r=i.inventory.find(h=>h.id===a)||Object.values((o==null?void 0:o.equipment)||{}).find(h=>(h==null?void 0:h.id)===a);if(!r)return;const l=this._el.querySelector("#inv-tt");l.innerHTML=se(r),l.style.display="block";const d=this._el.getBoundingClientRect();l.style.left=`${Math.min(s.clientX-d.left+12,d.width-220)}px`,l.style.top=`${Math.max(8,s.clientY-d.top-60)}px`}),t.addEventListener("mouseleave",()=>{var a;const s=(a=this._el)==null?void 0:a.querySelector("#inv-tt");s&&(s.style.display="none")})})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const Be=`
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
`;class Oe{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedCharIdx=0,this._selectedSkill=null}onEnter(){this._build()}_build(){M("skill-styles",De),this._el=w("div","skill-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const t=m.get().party,s=t[this._selectedCharIdx],a=s?ie(s.class):[],i=s?oe(s.class,s.level||1):[],o=(s==null?void 0:s.talentsPurchased)||{};this._el.innerHTML=`
      <div class="skill-header">
        <div class="skill-char-tabs" id="skill-char-tabs">
          ${t.map((r,l)=>`
            <button class="sct-tab${l===this._selectedCharIdx?" active":""}" data-idx="${l}">
              ${r.name}<br><small>${r.className||r.class} Lv${r.level||1}</small>
            </button>
          `).join("")}
        </div>
        <button class="skill-close" id="skill-close">✕</button>
      </div>
      <div class="skill-layout">
        <!-- Skill list -->
        <div class="skill-list-panel">
          <div class="panel-label">Skills — ${(s==null?void 0:s.className)||"No Class"}</div>
          ${a.map(r=>{const l=i.find(d=>d.name===r.name);return`
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
          ${this._selectedSkill?this._renderSkillDetail(s,o):`
            <div class="skill-select-prompt">Select a skill to view its description and upgrade talents.</div>
          `}
        </div>
      </div>
    `,this._wireEvents()}_renderSkillDetail(e,t){var i;const s=Object.values(ae).find(o=>o.name===this._selectedSkill);if(!s)return"";const a=s.talents||[];return`
      <div class="skill-detail-inner">
        <div class="sd-name">${s.name}</div>
        <div class="sd-type"><span class="sd-badge">${s.type}</span>${s.aoe?`<span class="sd-badge">${s.aoe}</span>`:""}</div>
        <div class="sd-desc">${s.description}</div>
        ${s.mpCost>0?`<div class="sd-cost">Mana Cost: <strong>${s.mpCost}</strong></div>`:""}
        ${s.damageStat?`<div class="sd-formula">Damage: ${s.damageMult}× ${s.damageStat.toUpperCase()} <span style="color:#8a7a6a">(formula: base × stat × ${s.damageMult})</span></div>`:""}
        ${s.healStat?`<div class="sd-formula">Heal: ${s.healMult}× ${s.healStat.toUpperCase()}</div>`:""}
        ${(i=s.statusEffects)!=null&&i.length?`
          <div class="sd-effects">
            ${s.statusEffects.map(o=>`<div class="sd-effect"><span class="eff-name">${o.type.toUpperCase()}</span> ${Math.round(o.chance*100)}% chance · ${o.duration} rounds</div>`).join("")}
          </div>
        `:""}
        ${a.length?`
          <div class="sd-talents-title">Upgrade Talents</div>
          <div class="sd-talents">
            ${a.map(o=>{const r=t[o.id];return`
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
    `}_wireEvents(){var e;(e=this._el.querySelector("#skill-close"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".sct-tab").forEach(t=>{t.addEventListener("click",()=>{this.audio.playSfx("click"),this._selectedCharIdx=parseInt(t.dataset.idx),this._selectedSkill=null,this._render()})}),this._el.querySelectorAll(".skill-row").forEach(t=>{t.addEventListener("click",()=>{t.classList.contains("locked")||(this.audio.playSfx("click"),this._selectedSkill=t.dataset.skill,this._render())})}),this._el.querySelectorAll("[data-talent]").forEach(t=>{t.addEventListener("click",()=>{if(t.disabled)return;const a=m.get().party[this._selectedCharIdx];a&&(a.talentsPurchased||(a.talentsPurchased={}),a.talentsPurchased[t.dataset.talent]=!0,this.audio.playSfx("spell"),this._render())})})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const De=`
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
`,Ve=[{id:"q_border_roads",title:"Dangerous Roads",act:1,description:"The Border Roads are overrun with goblin patrols. Clear a path through to reach the Goblin Frontier.",objectives:[{text:"Reach the Border Roads",flagCheck:()=>!0},{text:"Defeat the Warlord's Vanguard",flagCheck:n=>(n.completedBosses||[]).includes("border_boss")}],reward:"Access to Thornwood Forest"},{id:"q_thornwood",title:"Into the Thornwood",act:1,description:"The forest has been corrupted by Veil energy. Seek out Mira the Seer and defeat the Veil Wardens.",objectives:[{text:"Reach Thornwood Forest",flagCheck:n=>(n.unlockedZones||[]).includes("thornwood")},{text:"Meet Mira the Seer",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}},{text:"Defeat the Veil Wardens",flagCheck:n=>(n.completedBosses||[]).includes("thornwood_boss")}],reward:"The Ashen Wastes opened (Act 2)"},{id:"q_seer_warning",title:"The Seer's Warning",act:1,description:"Mira the Seer spoke of an ancient rift in the Thornwood — a tear between realms pouring corruption into your world.",objectives:[{text:"Learn of the rift's origin",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.knows_rift_origin}},{text:"Speak with the Seer",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}}],reward:"Lore: Understanding the Emberveil",isLore:!0},{id:"q_ashen_wastes",title:"Through the Ashen Wastes",act:2,description:"The Ashen Wastes stretch south — volcanic flats controlled by Veil cultists and their summoned creatures. The cult is preparing a ritual.",objectives:[{text:"Reach the Ashen Wastes",flagCheck:n=>(n.unlockedZones||[]).includes("dust_roads")},{text:"Defeat the Lava Titan",flagCheck:n=>(n.completedBosses||[]).includes("dust_boss")},{text:"Reach the Ember Plateau",flagCheck:n=>(n.unlockedZones||[]).includes("ember_plateau")},{text:"Defeat the Veil High Priest",flagCheck:n=>(n.completedBosses||[]).includes("plateau_boss")}],reward:"Act 3: The Shattered Hell"},{id:"q_cult_of_the_veil",title:"The Veil Cultists' Purpose",act:2,description:'You have encountered Veil cultists throughout the Wastes. They speak of a "Convergence" — an event that will tear the boundary between realms forever.',objectives:[{text:"Encounter first Veil Cultist",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("dust"))},{text:"Find evidence of the ritual site",flagCheck:n=>{var e;return(e=n.storyFlags)==null?void 0:e.ritual_site_found}},{text:"Disrupt the Convergence ritual",flagCheck:n=>(n.completedBosses||[]).includes("plateau_boss")}],reward:"Lore: The Nature of the Emberveil",isLore:!0},{id:"q_descent_to_hell",title:"Descent into the Shattered Hell",act:3,description:"Beyond the Ember Plateau lies the Hell Breach — a torn rift into the demonic realm of the Shattered Hell. The corruption's source lies within.",objectives:[{text:"Find the Hell Breach",flagCheck:n=>(n.unlockedZones||[]).includes("hell_breach")},{text:"Survive the demon patrols",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("hell"))},{text:"Confront Archfiend Malgrath",flagCheck:n=>(n.completedBosses||[]).includes("malgrath")},{text:"Reach the Shattered Core",flagCheck:n=>(n.unlockedZones||[]).includes("shattered_core")}],reward:"The path to the Emberveil Sovereign"},{id:"q_end_of_worlds",title:"The Emberveil Sovereign",act:3,description:"At the heart of the Shattered Core sits the Emberveil Sovereign — the ancient entity tearing worlds apart. Only your party stands between it and total annihilation.",objectives:[{text:"Reach the Shattered Core",flagCheck:n=>(n.unlockedZones||[]).includes("shattered_core")},{text:"Defeat the Sovereign's Vanguard",flagCheck:n=>(n.completedBosses||[]).some(e=>e.includes("shattered"))},{text:"Defeat the Emberveil Sovereign",flagCheck:n=>(n.completedBosses||[]).includes("sovereign")}],reward:"Victory — the Emberveil is sealed"}];class Ge{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){M("quest-styles",je),this._el=w("div","quest-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=m.get(),t=Ve.map(s=>{const a=s.objectives.filter(p=>p.flagCheck(e)).length,i=s.objectives.length,o=a===i,r=a>0&&!o;if(!s.objectives[0].flagCheck(e)&&!o)return"";const d=o?"complete":r?"active":"available",h=o?"Complete":r?"In Progress":"Available",c={1:"#e8a020",2:"#c06020",3:"#a02080"};return`
        <div class="ql-quest ${d}">
          <div class="ql-q-header">
            <div class="ql-q-title">${s.title}</div>
            <div class="ql-q-badges">
              <span class="ql-act-badge" style="color:${c[s.act]||"#8a7a6a"}">Act ${s.act}</span>
              <span class="ql-status-badge ${d}">${h}</span>
              ${s.isLore?'<span class="ql-lore-badge">Lore</span>':""}
            </div>
          </div>
          <div class="ql-q-desc">${s.description}</div>
          <div class="ql-objectives">
            ${s.objectives.map(p=>{const y=p.flagCheck(e);return`<div class="ql-obj ${y?"done":""}">
                <div class="ql-obj-check">${y?"✓":"○"}</div>
                <div class="ql-obj-text">${p.text}</div>
              </div>`}).join("")}
          </div>
          <div class="ql-reward">Reward: <span>${s.reward}</span></div>
          <div class="ql-progress-bar">
            <div class="ql-progress-fill" style="width:${a/i*100}%"></div>
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
    `,this._el.querySelector("#ql-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const je=`
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
`,j=[{id:"first_blood",name:"First Blood",icon:"⚔️",desc:"Win your first combat encounter.",check:n=>{var e,t;return((e=n.completedBosses)==null?void 0:e.length)>0||((t=n.storyFlags)==null?void 0:t.first_combat_won)}},{id:"boss_slayer",name:"Boss Slayer",icon:"💀",desc:"Defeat your first zone boss.",check:n=>{var e;return((e=n.completedBosses)==null?void 0:e.length)>=1}},{id:"act2_clear",name:"Into the Wastes",icon:"🔥",desc:"Reach the Ashen Wastes.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("dust_roads")}},{id:"act3_clear",name:"Hell Descends",icon:"👹",desc:"Enter the Shattered Hell.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("hell_breach")}},{id:"sovereign",name:"World Savior",icon:"🌟",desc:"Defeat the Emberveil Sovereign.",check:n=>{var e;return(e=n.completedBosses)==null?void 0:e.includes("core_boss")}},{id:"full_party",name:"Strength in Numbers",icon:"🛡️",desc:"Have a party of 4 heroes.",check:n=>{var e;return((e=n.party)==null?void 0:e.length)>=4}},{id:"companions",name:"Trusty Companions",icon:"🐾",desc:"Hire your first companion.",check:n=>{var e;return((e=n.companions)==null?void 0:e.length)>=1}},{id:"full_roster",name:"Full Retinue",icon:"👥",desc:"Have 4 heroes and 4 companions at once.",check:n=>{var e,t;return((e=n.party)==null?void 0:e.length)>=4&&((t=n.companions)==null?void 0:t.length)>=4}},{id:"rich",name:"Golden Touch",icon:"💰",desc:"Accumulate 1,000 gold.",check:n=>(n.gold||0)>=1e3},{id:"legendary_item",name:"Legendary Find",icon:"✨",desc:"Obtain a Legendary rarity item.",check:n=>{var e;return(e=n.inventory)==null?void 0:e.some(t=>t.rarity==="legendary")}},{id:"enchanted",name:"Enchanter's Patron",icon:"🔮",desc:"Use the Enchanter service.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.used_enchanter}},{id:"blacksmith",name:"Fine Craftsmanship",icon:"🔨",desc:"Upgrade an item at the Blacksmith.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.used_blacksmith}},{id:"noticed",name:"Making a Name",icon:"⭐",desc:"Reach 20 Fame.",check:n=>(n.fame||0)>=20},{id:"renowned",name:"Renowned Hero",icon:"🌠",desc:"Reach 250 Fame.",check:n=>(n.fame||0)>=250},{id:"legendary_fame",name:"Living Legend",icon:"👑",desc:"Reach 500 Fame.",check:n=>(n.fame||0)>=500},{id:"first_quest",name:"Quest Seeker",icon:"📜",desc:"Open the Quest Log.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.opened_quest_log}},{id:"seer_met",name:"Seeker of Truth",icon:"🔭",desc:"Meet Mira the Seer.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.seer_met}},{id:"survived_defeat",name:"Brush with Death",icon:"💔",desc:"Be defeated in combat and live to tell the tale.",check:n=>{var e;return(e=n.storyFlags)==null?void 0:e.survived_defeat}},{id:"level_10",name:"Seasoned Veteran",icon:"🎖️",desc:"Reach hero level 10.",check:n=>{var e;return(e=n.party)==null?void 0:e.some(t=>(t.level||1)>=10)}},{id:"act4_enter",name:"Cosmic Voyager",icon:"🌌",desc:"Enter the Cosmic Rift.",check:n=>{var e;return(e=n.unlockedZones)==null?void 0:e.includes("cosmic_rift")}},{id:"void_boss",name:"The Unraveler Falls",icon:"✦",desc:"Defeat The Unraveler and seal the Eternal Void.",check:n=>{var e;return(e=n.completedBosses)==null?void 0:e.includes("void_boss")}},{id:"ng_plus",name:"New Game+",icon:"♾️",desc:"Begin a New Game+ run.",check:n=>(n.ngPlus||0)>=1},{id:"ng_plus_2",name:"Twice-Born Legend",icon:"⚡",desc:"Complete New Game+ twice.",check:n=>(n.ngPlus||0)>=2}],Fe=`
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
`;class Ue{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}onExit(){_(this._el),this._el=null}_build(){M("ach-styles",Fe),this._el=w("div","ach-screen"),this.manager.uiOverlay.appendChild(this._el);const e=m.get();e.storyFlags.opened_quest_log||(e.storyFlags.opened_quest_log=!0);const t=j.filter(i=>i.check(e)),s=j.length,a=Math.round(t.length/s*100);this._el.innerHTML=`
      <div class="ach-header">
        <div>
          <div class="ach-title">Achievements</div>
          <div class="ach-subtitle">${t.length} / ${s} unlocked (${a}%)</div>
        </div>
        <button class="ach-close" id="ach-close">✕ Close</button>
      </div>
      <div class="ach-progress-bar">
        <div class="ach-progress-fill" style="width:${a}%"></div>
      </div>
      <div class="ach-grid">
        ${j.map(i=>{const o=i.check(e);return`
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
    `,this._el.querySelector("#ach-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}}const We=`
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
`;function Xe(n){return{warrior:"⚔️",mage:"🔮",paladin:"🛡️",ranger:"🏹",rogue:"🗡️",cleric:"✝️",bard:"🎵",necromancer:"💀",companion:"🐾",druid:"🌿",monk:"👊",berserker:"💢",warlock:"👁️",shaman:"⚡"}[n.class]||"👤"}function Ye(n){const e=Math.round((n.hp||0)/(n.maxHp||1)*100);return`HP: <span style="color:${e>60?"#60c060":e>30?"#e8c840":"#e06040"}">${n.hp??"?"}/${n.maxHp??"?"}</span>`}class Ze{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._selectedA=null}onEnter(){this._build()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="flex")}onExit(){_(this._el),this._el=null}_build(){M("party-screen-styles",We),this._el=w("div","party-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){var t;const e=m.get();this._el.innerHTML=`
      <div class="ps-header">
        <div class="ps-title">Party Management</div>
        <button class="ps-close" id="ps-close">✕ Close</button>
      </div>
      <div class="ps-body">
        <div class="ps-section-title">Active Party (${e.party.length}/4)</div>
        <div class="ps-slots" id="ps-party-slots">
          ${e.party.map((s,a)=>this._slotHTML(s,"party",a)).join("")}
          ${e.party.length<4?'<div class="ps-slot ps-empty"><div class="ps-slot-icon">＋</div><div class="ps-slot-info" style="color:rgba(200,180,140,0.4)">Empty slot</div></div>':""}
        </div>

        ${e.companions.length>0?`
        <div class="ps-divider"></div>
        <div class="ps-section-title">Companions (${e.companions.length}/4)</div>
        <div class="ps-slots" id="ps-companion-slots">
          ${e.companions.map((s,a)=>this._slotHTML(s,"companions",a)).join("")}
        </div>`:""}

        ${e.bench.length>0?`
        <div class="ps-divider"></div>
        <div class="ps-section-title">Bench (${e.bench.length})</div>
        <div class="ps-slots" id="ps-bench-slots">
          ${e.bench.map((s,a)=>this._slotHTML(s,"bench",a)).join("")}
        </div>`:""}

        ${e.party.length===0&&e.bench.length===0?`
        <div class="ps-hint">Your party is empty. Hire heroes at the Tavern.</div>`:""}
      </div>
      <div class="ps-action-bar">
        <button class="ps-btn" id="ps-swap" ${this._canSwap()?"":"disabled"}>⇄ Swap</button>
        <button class="ps-btn" id="ps-move-up" ${this._canMoveUp()?"":"disabled"}>↑ Up</button>
        <button class="ps-btn" id="ps-move-down" ${this._canMoveDown()?"":"disabled"}>↓ Down</button>
      </div>
      <div class="ps-hint">${this._selectedA?"✓ Selected: "+((t=this._getSelected())==null?void 0:t.name)+" — select another to swap, or use Up/Down to reorder.":"Tap a hero to select them."}</div>
    `,this._wire()}_slotHTML(e,t,s){const a=this._selectedA&&this._selectedA.source===t&&this._selectedA.index===s,i=t==="bench"?"bench":t==="companions"?"companion":"active";return`<div class="ps-slot${a?" ps-selected":""}" data-source="${t}" data-index="${s}">
      <div class="ps-slot-icon">${Xe(e)}</div>
      <div class="ps-slot-info">
        <div class="ps-slot-name">${e.name}</div>
        <div class="ps-slot-class">${e.class||"companion"} · Lv.${e.level||1}</div>
        <div class="ps-slot-stats">${Ye(e)} · MP: ${e.mp??"?"}/${e.maxMp??"?"}</div>
      </div>
      <div class="ps-slot-badge${t==="bench"?" bench":""}">${i}</div>
    </div>`}_wire(){this._el.querySelector("#ps-close").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".ps-slot[data-source]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.source,o=parseInt(a.dataset.index);this._onSlotClick(i,o)})});const e=this._el.querySelector("#ps-swap");e&&!e.disabled&&e.addEventListener("click",()=>this._doSwap());const t=this._el.querySelector("#ps-move-up");t&&!t.disabled&&t.addEventListener("click",()=>this._doMove(-1));const s=this._el.querySelector("#ps-move-down");s&&!s.disabled&&s.addEventListener("click",()=>this._doMove(1))}_onSlotClick(e,t){if(!this._selectedA)this._selectedA={source:e,index:t};else if(this._selectedA.source===e&&this._selectedA.index===t)this._selectedA=null;else{this._doSwapWith({source:e,index:t});return}this._render()}_getSelected(){if(!this._selectedA)return null;const e=m.get();return(this._selectedA.source==="party"?e.party:this._selectedA.source==="companions"?e.companions:e.bench)[this._selectedA.index]}_canSwap(){return this._selectedA!==null}_canMoveUp(){return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index>0}_canMoveDown(){const e=m.get();return this._selectedA&&this._selectedA.source==="party"&&this._selectedA.index<e.party.length-1}_doSwap(){const e=m.get();if(!this._selectedA||e.bench.length===0)return;const t=this._selectedA.source==="party"?e.party:e.companions,s=t[this._selectedA.index],a=e.bench[0];t[this._selectedA.index]=a,e.bench[0]=s,e.bench.splice(0,1,s),this._selectedA=null,this._render()}_doSwapWith(e){const t=m.get(),s=r=>r==="party"?t.party:r==="companions"?t.companions:t.bench,a=s(this._selectedA.source),i=s(e.source),o=a[this._selectedA.index];a[this._selectedA.index]=i[e.index],i[e.index]=o,t.party=t.party.filter(Boolean),t.companions=t.companions.filter(Boolean),this._selectedA=null,this._render()}_doMove(e){const t=m.get();if(!this._selectedA||this._selectedA.source!=="party")return;const s=this._selectedA.index,a=s+e;a<0||a>=t.party.length||([t.party[s],t.party[a]]=[t.party[a],t.party[s]],this._selectedA.index=a,this._render())}}const Qe=2,F=n=>`emberveil_save_${n}`,z={getSlot(n){try{const e=localStorage.getItem(F(n));if(!e)return null;const t=JSON.parse(e);return this.migrate(t)}catch{return null}},saveCurrentGame(n){var s,a,i,o,r,l,d,h;const e=m.toSaveData(),t={version:Qe,timestamp:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),heroName:((a=(s=e.party)==null?void 0:s[0])==null?void 0:a.name)||"Unknown",class:((o=(i=e.party)==null?void 0:i[0])==null?void 0:o.className)||((l=(r=e.party)==null?void 0:r[0])==null?void 0:l.class)||"Hero",act:e.act||1,level:((h=(d=e.party)==null?void 0:d[0])==null?void 0:h.level)||1,...e};return localStorage.setItem(F(n),JSON.stringify(t)),t},loadSlot(n){const e=this.getSlot(n);return e?(m.load(e),!0):!1},deleteSlot(n){localStorage.removeItem(F(n))},getAllSlots(){return[0,1,2].map(n=>this.getSlot(n))},migrate(n){return(!n.version||n.version<2)&&(n.visitedNodes||(n.visitedNodes=["start"]),n.version=2),n}},Q=[{id:"aela",name:"Aela",className:"Ranger",class:"ranger",level:1,cost:80,attrs:{STR:8,DEX:14,INT:8,CON:10},personality:"patient",description:"A quiet ranger from the eastern border. Waits for the perfect shot.",personalityNote:"Patient — prefers precise strikes over rushing in."},{id:"borin",name:"Borin",className:"Warrior",class:"warrior",level:1,cost:90,attrs:{STR:14,DEX:8,INT:6,CON:12},personality:"aggressive",description:"Retired soldier. Bored. Wants one last fight.",personalityNote:"Aggressive — always targets the strongest enemy first."},{id:"lysa",name:"Lysa",className:"Cleric",class:"cleric",level:2,cost:120,attrs:{STR:8,DEX:8,INT:14,CON:10},personality:"protective",description:"Young cleric of the Light. Eager to prove herself outside the temple.",personalityNote:"Protective — prioritizes healing injured allies."},{id:"rekk",name:"Rekk",className:"Rogue",class:"rogue",level:1,cost:70,attrs:{STR:8,DEX:14,INT:9,CON:9},personality:"opportunist",description:"Says he's not a thief. Has three knives.",personalityNote:"Opportunist — strikes weakened enemies to finish them."}],K=[{id:"war_dog",name:"War Dog",className:"Companion",class:"companion",level:1,cost:50,isCompanion:!0,attrs:{STR:10,DEX:12,INT:2,CON:10},description:"Loyal, fierce, and surprisingly effective against goblins. Bites hard."}];function Ke(){return[E("sword","normal","medium"),E("dagger","normal","medium"),E("staff","magic","medium"),E("bow","normal","medium"),E("light_chest","normal","medium"),E("cloth_chest","magic","medium"),E("heavy_helm","normal","low"),E("light_legs","normal","medium"),E("ring","magic","medium"),E("necklace","magic","medium")]}class re{constructor(e,t,s,a=!1){this.manager=e,this.audio=t,this.isNewGame=a,this._el=null,this._activeService=null,this._merchantStock=Ke(),this._tooltip=null,s!=null&&s.party||s&&m.init(s)}onEnter(){this.audio.playTownMusic(),this._build()}_build(){M("town-styles",Je),this._el=w("div","town-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){m.get().party[0];const t=m.getGold();this._el.innerHTML=`
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
    `,this._renderPartyPanel(),this._wireEvents()}_renderPartyPanel(){const e=m.get(),t=this._el.querySelector("#party-slots"),s=this._el.querySelector("#companion-slots");for(let a=0;a<4;a++){const i=e.party[a],o=w("div",`party-slot${i?"":" empty"}`);i?(50+i.attrs.CON*10,o.innerHTML=`
          <div class="ps-icon">${this._getClassSvg(i.class)}</div>
          <div class="ps-info">
            <div class="ps-name">${i.name}</div>
            <div class="ps-class">${i.className||i.class} Lv${i.level}</div>
            <div class="ps-hp-bar"><div class="ps-hp-fill" style="width:100%"></div></div>
          </div>
        `):o.innerHTML='<div class="ps-empty">Empty</div>',t.appendChild(o)}for(let a=0;a<4;a++){const i=e.companions[a],o=w("div",`party-slot${i?"":" empty"}`);i?o.innerHTML=`<div class="ps-icon">🐾</div><div class="ps-info"><div class="ps-name">${i.name}</div><div class="ps-class">${i.className}</div></div>`:o.innerHTML='<div class="ps-empty">Empty</div>',s.appendChild(o)}}_renderServiceContent(){switch(this._activeService){case"merchant":return this._merchantHTML();case"tavern":return this._tavernHTML();case"cleric":return this._clericHTML();case"blacksmith":return this._blacksmithHTML();case"enchanter":return this._enchanterHTML();default:return this._townOverviewHTML()}}_townOverviewHTML(){return`
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
                <div class="ic-name" style="color:${L[t.rarity]}">${t.name}</div>
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
                  <div class="ic-name" style="color:${L[t.rarity]}">${t.name}</div>
                  <div class="ic-type">${t.subtype||t.type}</div>
                  <div class="ic-price">Sell: ${Math.floor(this._itemPrice(t)*.4)} G</div>
                </div>
              `).join("")}
          </div>
        </div>
      </div>
    `}_itemPrice(e){const t={low:.5,medium:1,high:1.5,elite:2.5,exotic:4},s={normal:1,magic:2,rare:4,legendary:10};return Math.round(15*(t[e.quality]||1)*(s[e.rarity]||1))}_tavernHTML(){const e=m.get(),t=m.getGold();return`
      <div class="tavern-layout">
        <div class="svc-section-title">Heroes for Hire</div>
        <div class="hireable-list">
          ${Q.map(s=>{const a=e.party.find(l=>l.id===s.id),i=e.bench.find(l=>l.id===s.id),o=t>=s.cost,r=e.party.length>=4;return`
              <div class="hireable-card${a||i?" hired":""}">
                <div class="hc-portrait">${this._getClassSvg(s.class)}</div>
                <div class="hc-info">
                  <div class="hc-name">${s.name} <span class="hc-class">${s.className} Lv${s.level}</span></div>
                  <div class="hc-desc">${s.description}</div>
                  ${s.personalityNote?`<div class="hc-personality">🎭 ${s.personalityNote}</div>`:""}
                  <div class="hc-attrs">STR ${s.attrs.STR} · DEX ${s.attrs.DEX} · INT ${s.attrs.INT} · CON ${s.attrs.CON}</div>
                </div>
                <div class="hc-action">
                  ${a?'<span class="hired-badge">In Party</span>':i?'<span class="hired-badge">At Bench</span>':`<button class="hire-btn${o&&!r?"":" disabled"}" data-hire="${s.id}" data-cost="${s.cost}" ${o&&!r?"":"disabled"}>
                      Hire <br><small>${s.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
        <div class="svc-section-title" style="margin-top:1.5rem">Companions for Purchase</div>
        <div class="hireable-list">
          ${K.map(s=>{const a=e.companions.find(r=>r.id===s.id),i=t>=s.cost,o=e.companions.length>=4;return`
              <div class="hireable-card${a?" hired":""}">
                <div class="hc-portrait"><svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="6"/><path d="M8 32c0-6 4-10 10-10s10 4 10 10"/></svg></div>
                <div class="hc-info">
                  <div class="hc-name">${s.name} <span class="hc-class">${s.className}</span></div>
                  <div class="hc-desc">${s.description}</div>
                </div>
                <div class="hc-action">
                  ${a?'<span class="hired-badge">Purchased</span>':`<button class="hire-btn${i&&!o?"":" disabled"}" data-hire="${s.id}" data-cost="${s.cost}" data-companion="true" ${i&&!o?"":"disabled"}>
                      Buy <br><small>${s.cost} G</small>
                    </button>`}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}_clericHTML(){const e=m.get(),t=[...e.party,...e.companions],s=t.filter(d=>d.hp<=0||d.dead),a=t.filter(d=>d.hp>0&&d.hp<(d.maxHp||100)),i=m.getGold(),o=50,r=Math.max(10,a.length*15),l=a.length===0&&s.length===0;return`
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
        ${s.length===0?'<div class="empty-state" style="padding:1rem;text-align:center;color:#8a7a6a">All party members are alive.</div>':s.map(d=>`
            <div class="hireable-card">
              <div class="hc-portrait">${this._getClassSvg(d.class)}</div>
              <div class="hc-info">
                <div class="hc-name">${d.name}</div>
                <div class="hc-desc" style="color:#c04030">Has fallen in battle.</div>
              </div>
              <div class="hc-action">
                <button class="hire-btn${i>=o?"":" disabled"}" data-revive="${d.id}" ${i>=o?"":"disabled"}>
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
          ${[0,1,2].map(t=>{const s=z.getSlot(t);return`<button class="sm-slot-btn" data-slot="${t}">
              <span class="smsb-num">Slot ${t+1}</span>
              <span class="smsb-info">${s?`${s.heroName} · Lv${s.level}`:"Empty"}</span>
            </button>`}).join("")}
        </div>
        <button class="sm-cancel" id="sm-cancel">Cancel</button>
      </div>
    `,e.querySelector("#sm-cancel").addEventListener("click",()=>_(e)),e.querySelector(".sm-overlay").addEventListener("click",()=>_(e)),e.querySelectorAll(".sm-slot-btn").forEach(t=>{t.addEventListener("click",()=>{z.saveCurrentGame(parseInt(t.dataset.slot)),this.audio.playSfx("victory"),_(e),this._showNotif("Game saved!")})}),this.manager.uiOverlay.appendChild(e),!document.getElementById("save-modal-styles")){const t=document.createElement("style");t.id="save-modal-styles",t.textContent=".save-modal{position:absolute;inset:0;z-index:500;display:flex;align-items:center;justify-content:center}.sm-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.75)}.sm-box{position:relative;z-index:1;background:#1a1218;border:1px solid rgba(232,160,32,0.3);border-radius:12px;padding:2rem;min-width:280px;max-width:340px;width:90%}.sm-title{font-family:'Cinzel',serif;font-size:1.2rem;font-weight:700;color:#e8a020;margin-bottom:1.25rem;text-align:center}.sm-slots{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.25rem}.sm-slot-btn{display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:rgba(26,18,24,0.9);border:1px solid rgba(232,160,32,0.15);border-radius:6px;color:#f0e8d8;cursor:pointer;min-height:48px;transition:border-color 0.15s}.sm-slot-btn:hover{border-color:rgba(232,160,32,0.5)}.smsb-num{font-size:0.75rem;color:#8a7a6a}.smsb-info{font-size:0.82rem;font-family:'Cinzel',serif;font-weight:600}.sm-cancel{width:100%;padding:0.65rem;background:none;border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#8a7a6a;cursor:pointer;font-size:0.82rem}.sm-cancel:hover{color:#f0e8d8}",document.head.appendChild(t)}}_showNotif(e){const t=w("div","save-notif");t.textContent=e,t.style.cssText="position:absolute;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(232,160,32,0.9);color:#0a0608;padding:0.5rem 1.25rem;border-radius:20px;font-weight:700;font-size:0.85rem;z-index:600;pointer-events:none;animation:notifIn 0.3s ease";const s=document.createElement("style");s.textContent="@keyframes notifIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}",document.head.appendChild(s),this._el.appendChild(t),setTimeout(()=>_(t),2e3)}_blacksmithHTML(){const t=m.get().inventory.filter(r=>r.rarity!=="legendary"&&r.quality!=="exotic"),s=["normal","magic","rare","legendary"],a=["low","medium","high","elite","exotic"],i={normal:60,magic:150,rare:400},o={low:40,medium:100,high:250,elite:600};return t.length?`
      <div class="bs-panel">
        <div class="bs-title">Blacksmith — Forged in Ember</div>
        <div class="bs-subtitle">Upgrade the rarity or quality of your equipment.</div>
        <div class="bs-items" id="bs-items">
          ${t.map(r=>{const l=s[s.indexOf(r.rarity)+1],d=a[a.indexOf(r.quality)+1],h=l?i[r.rarity]:null,c=d?o[r.quality]:null;return`
              <div class="bs-item">
                <div class="bs-iname" style="color:${L[r.rarity]}">${r.name}</div>
                <div class="bs-isub">${r.rarity} · ${r.quality}</div>
                <div class="bs-actions">
                  ${h?`<button class="bs-btn" data-action="rarity" data-id="${r.id}" data-cost="${h}" data-next="${l}">
                    Upgrade to <strong>${l}</strong> — ${h}g
                  </button>`:'<span class="bs-maxed">Max Rarity</span>'}
                  ${c?`<button class="bs-btn" data-action="quality" data-id="${r.id}" data-cost="${c}" data-next="${d}">
                    Upgrade to <strong>${d}</strong> quality — ${c}g
                  </button>`:'<span class="bs-maxed">Max Quality</span>'}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:'<div class="coming-soon"><div class="cs-title">Blacksmith</div><div class="cs-text">No upgradeable items in your inventory.</div></div>'}_enchanterHTML(){const t=m.get().inventory.filter(i=>{var r;const o=i.rarity==="legendary"?6:i.rarity==="rare"?4:i.rarity==="magic"?2:0;return o>0&&(((r=i.affixes)==null?void 0:r.length)||0)<o}),s={magic:80,rare:200,legendary:500},a=[{id:"of_str",name:"Sturdy +STR",stat:"str",min:2,max:5},{id:"of_dex",name:"Swift +DEX",stat:"dex",min:2,max:5},{id:"of_int",name:"Wise +INT",stat:"int",min:2,max:5},{id:"of_con",name:"Hardy +CON",stat:"con",min:2,max:5},{id:"of_hp",name:"Vitality +HP",stat:"hp",min:10,max:25},{id:"of_armor",name:"Reinforced +Armor",stat:"armor",min:2,max:5}];return t.length?`
      <div class="bs-panel">
        <div class="bs-title">Enchanter — Threads of Power</div>
        <div class="bs-subtitle">Add a new enchantment to an item with open affix slots.</div>
        <div class="bs-items" id="enc-items">
          ${t.map(i=>{var h;const o=s[i.rarity]||100,l=(i.rarity==="legendary"?6:i.rarity==="rare"?4:2)-(((h=i.affixes)==null?void 0:h.length)||0),d=a.filter(c=>{var p;return!((p=i.affixes)!=null&&p.find(y=>y.id===c.id))});return`
              <div class="bs-item">
                <div class="bs-iname" style="color:${L[i.rarity]}">${i.name}</div>
                <div class="bs-isub">${i.rarity} · ${l} open slot${l!==1?"s":""}</div>
                <div class="enc-affixes">
                  ${d.map(c=>`
                    <button class="bs-btn enc-btn" data-action="enchant" data-iid="${i.id}" data-aid="${c.id}" data-cost="${o}">
                      ${c.name} — ${o}g
                    </button>
                  `).join("")}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:'<div class="coming-soon"><div class="cs-title">Enchanter</div><div class="cs-text">No enchantable items (need Magic, Rare, or Legendary rarity with open affix slots).</div></div>'}_getClassSvg(e){const t=ee.find(s=>s.id===e);return(t==null?void 0:t.svgIcon)||'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="18" r="12"/></svg>'}_wireEvents(){var e,t,s,a,i,o,r,l;this._el.querySelectorAll(".svc-tab").forEach(d=>{d.addEventListener("click",()=>{this.audio.playSfx("click");const h=d.dataset.svc;this._activeService=this._activeService===h?null:h,this._refreshServicePanel()})}),this._el.querySelectorAll(".overview-card").forEach(d=>{d.addEventListener("click",()=>{this.audio.playSfx("click"),this._activeService=d.dataset.svc,this._refreshServicePanel()})}),(e=this._el.querySelector("#btn-map"))==null||e.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Z(this.manager,this.audio))}),(t=this._el.querySelector("#btn-leave"))==null||t.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Z(this.manager,this.audio))}),(s=this._el.querySelector("#btn-inventory"))==null||s.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Pe(this.manager,this.audio))}),(a=this._el.querySelector("#btn-skills"))==null||a.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Oe(this.manager,this.audio))}),(i=this._el.querySelector("#btn-save"))==null||i.addEventListener("click",()=>{this.audio.playSfx("click"),this._showSaveModal()}),(o=this._el.querySelector("#btn-journal"))==null||o.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Ge(this.manager,this.audio))}),(r=this._el.querySelector("#btn-achievements"))==null||r.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Ue(this.manager,this.audio))}),(l=this._el.querySelector("#btn-party"))==null||l.addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Ze(this.manager,this.audio))}),this._wireServiceEvents()}_wireServiceEvents(){var e;this._el.querySelectorAll('[data-section="buy"]').forEach(t=>{t.addEventListener("click",()=>{const s=this._merchantStock.find(i=>i.id===t.dataset.id);if(!s)return;const a=this._itemPrice(s);m.getGold()<a||(m.addGold(-a),m.addToInventory(s),this._merchantStock=this._merchantStock.filter(i=>i.id!==s.id),this.audio.playSfx("click"),this._refreshAll())}),t.addEventListener("mouseenter",s=>this._showTooltip(s,t.dataset.id,"stock")),t.addEventListener("mouseleave",()=>this._hideTooltip())}),this._el.querySelectorAll('[data-section="sell"]').forEach(t=>{t.addEventListener("click",()=>{const a=m.get().inventory.find(i=>i.id===t.dataset.id);a&&(m.addGold(Math.floor(this._itemPrice(a)*.4)),m.removeFromInventory(a.id),this.audio.playSfx("click"),this._refreshAll())})}),this._el.querySelectorAll("[data-hire]").forEach(t=>{t.addEventListener("click",()=>{if(t.disabled)return;const s=t.dataset.hire,a=parseInt(t.dataset.cost),i=t.dataset.companion==="true";this.audio.playSfx("click");const o=i?K.find(l=>l.id===s):Q.find(l=>l.id===s);if(!o||m.getGold()<a)return;m.addGold(-a);const r={...o,id:o.id+"_"+Date.now(),hp:50+o.attrs.CON*10,maxHp:50+o.attrs.CON*10,mp:30+o.attrs.INT*8,maxMp:30+o.attrs.INT*8,xp:0,pendingAttrPoints:0,equipment:{},skills:[]};i?m.addToCompanions(r)||m.addToBench(r):m.addToParty(r)||m.addToBench(r),this._refreshAll()})}),this._el.querySelectorAll('.bs-btn[data-action="rarity"]').forEach(t=>{t.addEventListener("click",()=>{const a=m.get().inventory.find(o=>o.id===t.dataset.id),i=parseInt(t.dataset.cost);!a||m.getGold()<i||(m.addGold(-i),a.rarity=t.dataset.next,this.audio.playSfx("click"),this._refreshAll())})}),this._el.querySelectorAll('.bs-btn[data-action="quality"]').forEach(t=>{t.addEventListener("click",()=>{const a=m.get().inventory.find(h=>h.id===t.dataset.id),i=parseInt(t.dataset.cost);if(!a||m.getGold()<i)return;m.addGold(-i),a.quality=t.dataset.next;const o=["low","medium","high","elite","exotic"],r=o.indexOf(a.quality===t.dataset.next?o[o.indexOf(t.dataset.next)-1]:a.quality),l=o.indexOf(t.dataset.next),d=[.7,1,1.2,1.4,1.6][l]/[.7,1,1.2,1.4,1.6][r];a.armor&&(a.armor=Math.round(a.armor*d)),a.dmg&&(a.dmg=a.dmg.map(h=>Math.round(h*d))),this.audio.playSfx("click"),this._refreshAll()})}),this._el.querySelectorAll('.enc-btn[data-action="enchant"]').forEach(t=>{t.addEventListener("click",()=>{const a=m.get().inventory.find(d=>d.id===t.dataset.iid),i=parseInt(t.dataset.cost);if(!a||m.getGold()<i)return;const r={of_str:{id:"of_str",name:"Sturdy",stat:"str",min:2,max:5},of_dex:{id:"of_dex",name:"Swift",stat:"dex",min:2,max:5},of_int:{id:"of_int",name:"Wise",stat:"int",min:2,max:5},of_con:{id:"of_con",name:"Hardy",stat:"con",min:2,max:5},of_hp:{id:"of_hp",name:"Vitality",stat:"hp",min:10,max:25},of_armor:{id:"of_armor",name:"Reinforced",stat:"armor",min:2,max:5}}[t.dataset.aid];if(!r)return;const l=Math.round(r.min+Math.random()*(r.max-r.min));a.affixes||(a.affixes=[]),a.affixes.push({...r,value:l}),m.addGold(-i),this.audio.playSfx("spell"),this._refreshAll()})}),(e=this._el.querySelector("#btn-rest"))==null||e.addEventListener("click",()=>{const t=m.get(),s=[...t.party,...t.companions],a=s.filter(o=>o.hp>0&&o.hp<(o.maxHp||100)),i=Math.max(10,a.length*15);m.getGold()<i||(m.addGold(-i),s.forEach(o=>{var r,l;o.hp>0&&(o.hp=o.maxHp||50+(((r=o.attrs)==null?void 0:r.CON)||10)*10,o.mp=o.maxMp||30+(((l=o.attrs)==null?void 0:l.INT)||8)*8)}),this.audio.playSfx("levelup"),this._refreshAll())}),this._el.querySelectorAll("[data-revive]").forEach(t=>{t.addEventListener("click",()=>{if(t.disabled)return;const s=t.dataset.revive,a=m.get(),i=[...a.party,...a.companions].find(o=>o.id===s);i&&(m.addGold(-50),i.hp=Math.floor((50+i.attrs.CON*10)*.5),i.dead=!1,this.audio.playSfx("click"),this._refreshAll())})})}_showTooltip(e,t,s){const a=s==="stock"?this._merchantStock.find(o=>o.id===t):m.get().inventory.find(o=>o.id===t);if(!a)return;const i=this._el.querySelector("#tt-el");i&&(i.innerHTML=se(a),i.style.display="block",i.style.left=`${Math.min(e.clientX+12,window.innerWidth-220)}px`,i.style.top=`${Math.max(8,e.clientY-60)}px`)}_hideTooltip(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#tt-el");e&&(e.style.display="none")}_refreshServicePanel(){var t;const e=(t=this._el)==null?void 0:t.querySelector("#service-panel");e&&(this._el.querySelectorAll(".svc-tab").forEach(s=>{s.classList.toggle("active",s.dataset.svc===this._activeService)}),e.innerHTML=this._renderServiceContent(),this._wireServiceEvents())}_refreshAll(){var a,i,o;const e=(a=this._el)==null?void 0:a.querySelector("#gold-amount");e&&(e.textContent=m.getGold().toLocaleString()),this._refreshServicePanel();const t=(i=this._el)==null?void 0:i.querySelector("#party-slots"),s=(o=this._el)==null?void 0:o.querySelector("#companion-slots");t&&(t.innerHTML=""),s&&(s.innerHTML=""),this._renderPartyPanel()}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}update(){}draw(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const Je=`
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
`,I=[{delay:.5,text:"The world did not end all at once."},{delay:2.5,text:"It unraveled."},{delay:5,text:"Three years ago, something tore through the fabric between realms — a wound that festered and spread, corrupting everything it touched."},{delay:10,text:"They called it the Emberveil."},{delay:13.5,text:"The border settlements fell first. Goblins, wolves, even the ancient stones of the road — all changed, driven by a single will from beyond."},{delay:20,text:"You arrived in Emberglen with little more than your skills and a rumor: someone is controlling the corruption. Someone — or something — with a purpose."},{delay:28,text:"If the Emberveil spreads to the capital, there will be nothing left to save."},{delay:34,text:"Your journey begins here."}];class et{constructor(e,t,s){this.manager=e,this.audio=t,this.onComplete=s,this._el=null,this._t=0,this._phase="FADE_IN",this._skipPressed=!1}onEnter(){this._build()}_build(){M("cinematic-styles",tt),this._el=w("div","cinematic-screen"),this._el.innerHTML=`
      <canvas class="cin-canvas" id="cin-canvas"></canvas>
      <div class="cin-overlay" id="cin-overlay">
        <div class="cin-content" id="cin-content"></div>
        <div class="cin-skip" id="cin-skip">Tap to skip</div>
      </div>
    `,this.manager.uiOverlay.appendChild(this._el);const e=this._el.querySelector("#cin-canvas");e.width=this.manager.width,e.height=this.manager.height,this._canvas=e,this._ctx=e.getContext("2d"),this._el.querySelector("#cin-skip").addEventListener("click",()=>{this._skipPressed=!0,this._finish()}),this._totalDuration=I[I.length-1].delay+4}update(e){var i,o;if(this._t+=e,this._drawBackground(),this._skipPressed)return;const t=(i=this._el)==null?void 0:i.querySelector("#cin-overlay");if(!t)return;this._t<1?t.style.opacity=this._t:this._t>this._totalDuration-1.5?t.style.opacity=Math.max(0,1-(this._t-(this._totalDuration-1.5))/1.5):t.style.opacity=1;const s=(o=this._el)==null?void 0:o.querySelector("#cin-content");if(!s)return;let a="";for(const r of I)if(this._t>=r.delay){const l=this._t-r.delay,d=Math.min(1,l/.8),h=r.delay<I[I.length-1].delay?Math.max(0,1-(l-5)/1.5):1,c=Math.min(d,h);c>0&&(a+=`<p class="cin-line" style="opacity:${c.toFixed(3)}">${r.text}</p>`)}s.innerHTML=a,this._t>=this._totalDuration&&this._finish()}_drawBackground(){const e=this._ctx,t=this._canvas.width,s=this._canvas.height,a=e.createLinearGradient(0,0,0,s);a.addColorStop(0,"#030208"),a.addColorStop(1,"#090512"),e.fillStyle=a,e.fillRect(0,0,t,s),e.save();const i=80;e.fillStyle="rgba(255,255,255,0.6)";for(let c=0;c<i;c++){const p=c*137.508%1*t,y=c*97.3%1*s*.65,x=.4+.6*Math.abs(Math.sin(this._t*.8+c));e.globalAlpha=x*.6,e.beginPath(),e.arc(p,y,.8+c%3*.5,0,Math.PI*2),e.fill()}e.restore();const o=s*.68,r=e.createLinearGradient(0,o,0,s);r.addColorStop(0,"rgba(200,60,20,0.35)"),r.addColorStop(.5,"rgba(120,30,10,0.25)"),r.addColorStop(1,"rgba(40,10,5,0.8)"),e.fillStyle=r,e.fillRect(0,o,t,s-o),e.fillStyle="#0a060c",e.beginPath(),e.moveTo(0,s*.72);const l=[.05,.15,.28,.42,.57,.68,.78,.88,.95,1],d=[.68,.58,.65,.52,.6,.55,.63,.57,.7,.72];l.forEach((c,p)=>{e.lineTo(c*t,d[p]*s)}),e.lineTo(t,s),e.lineTo(0,s),e.closePath(),e.fill();const h=12;for(let c=0;c<h;c++){const p=(c*71.3+this._t*8)%1*t,x=s*.85-(this._t*25+c*40)%(s*.5);if(x<0)continue;const u=Math.max(0,1-x/(s*.5));e.globalAlpha=u*.7,e.fillStyle=`hsl(${20+c*13%30}, 90%, 60%)`,e.beginPath(),e.arc(p,x,1.2+c%3*.6,0,Math.PI*2),e.fill(),e.globalAlpha=1}}_finish(){this._finished||(this._finished=!0,m.setFlag("opening_seen",!0),this.onComplete?this.onComplete():this.manager.pop())}draw(){}onPause(){this._el&&(this._el.style.display="none")}onResume(){this._el&&(this._el.style.display="")}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const tt=`
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
`,st=["STR","DEX","INT","CON"],at=10,H=8;class it{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._name="Hero",this._class=null,this._attrs={STR:H,DEX:H,INT:H,CON:H},this._pointsSpent=0,this._step="class",this._saveSlot=0}get _pointsLeft(){return at-this._pointsSpent}onEnter(){this._build()}_build(){M("cb-styles",rt),this._el=w("div","cb-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML="",this._step==="class"?this._renderClassStep():this._renderStatsStep()}_renderClassStep(){var s;const e=this._el;e.innerHTML=`
      <div class="cb-header">
        <div class="cb-title">Create Your Hero</div>
        <div class="cb-subtitle">Choose your class</div>
      </div>
      <div class="cb-class-grid" id="class-grid"></div>
      <div class="cb-footer">
        <button class="cb-btn cb-btn-ghost" id="cb-back">← Back</button>
        <button class="cb-btn cb-btn-primary" id="cb-next" disabled>Next →</button>
      </div>
    `;const t=e.querySelector("#class-grid");for(const a of ee){const i=w("div",`cb-class-card${((s=this._class)==null?void 0:s.id)===a.id?" selected":""}`);i.dataset.id=a.id,i.innerHTML=`
        <div class="cb-class-icon">${a.svgIcon}</div>
        <div class="cb-class-name">${a.name}</div>
        <div class="cb-class-role">${a.role}</div>
        <div class="cb-class-hook">${a.hook}</div>
        <div class="cb-class-armor">${a.armorType}</div>
      `,i.addEventListener("click",()=>{this.audio.playSfx("click"),this._class=a,e.querySelectorAll(".cb-class-card").forEach(o=>o.classList.remove("selected")),i.classList.add("selected"),e.querySelector("#cb-next").disabled=!1}),t.appendChild(i)}e.querySelector("#cb-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),e.querySelector("#cb-next").addEventListener("click",()=>{this._class&&(this.audio.playSfx("click"),this._step="stats",this._render())})}_renderStatsStep(){const e=this._el;e.innerHTML=`
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
    `,this._renderAttrs(),this._updatePreview(),e.querySelector("#hero-name").addEventListener("input",t=>{this._name=t.target.value||"Hero"}),e.querySelector("#cb-prev").addEventListener("click",()=>{this.audio.playSfx("click"),this._step="class",this._render()}),e.querySelector("#cb-confirm").addEventListener("click",()=>{this.audio.playSfx("victory"),this._confirm()})}_renderAttrs(){const e=this._el.querySelector("#attr-panel");if(e){e.innerHTML="";for(const t of st){const s=w("div","cb-attr-row"),a=ot[t];s.innerHTML=`
        <div class="cb-attr-info">
          <div class="cb-attr-name">${t}</div>
          <div class="cb-attr-desc">${a}</div>
        </div>
        <div class="cb-attr-controls">
          <button class="cb-attr-btn" data-attr="${t}" data-dir="-1">−</button>
          <span class="cb-attr-val" id="val-${t}">${this._attrs[t]}</span>
          <button class="cb-attr-btn" data-attr="${t}" data-dir="1">+</button>
        </div>
      `,e.appendChild(s)}e.querySelectorAll(".cb-attr-btn").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.attr,a=parseInt(t.dataset.dir);this._adjustAttr(s,a)})})}}_adjustAttr(e,t){if(t>0&&this._pointsLeft<=0||t<0&&this._attrs[e]<=H)return;this._attrs[e]+=t,this._pointsSpent-=t*-1,this._pointsSpent+=t;const s=this._el.querySelector(`#val-${e}`);s&&(s.textContent=this._attrs[e]);const a=this._el.querySelector("#pts-left");a&&(a.textContent=this._pointsLeft),this._updatePreview(),this.audio.playSfx("click")}_updatePreview(){var d;const e=(d=this._el)==null?void 0:d.querySelector("#preview-grid");if(!e)return;const t=this._attrs,s=50+t.CON*10,a=30+t.INT*8,i=Math.round(70+t.DEX*1.2),o=Math.round(5+t.DEX*.8),r=Math.round(t.STR*1.5),l=Math.round(1+t.INT*.08,2);e.innerHTML=`
      <div class="preview-stat"><span class="ps-label">HP</span><span class="ps-val">${s}</span></div>
      <div class="preview-stat"><span class="ps-label">Mana</span><span class="ps-val">${a}</span></div>
      <div class="preview-stat"><span class="ps-label">Hit</span><span class="ps-val">${i}%</span></div>
      <div class="preview-stat"><span class="ps-label">Dodge</span><span class="ps-val">${o}%</span></div>
      <div class="preview-stat"><span class="ps-label">Melee</span><span class="ps-val">+${r}</span></div>
      <div class="preview-stat"><span class="ps-label">Spell</span><span class="ps-val">×${l.toFixed(2)}</span></div>
    `}_confirm(){const e={id:crypto.randomUUID(),name:this._name||"Hero",class:this._class.id,className:this._class.name,level:1,xp:0,attrs:{...this._attrs},skills:[this._class.skills[0]],equipment:{},gold:150};m.init(e),z.saveCurrentGame(0);const t=new re(this.manager,this.audio,e,!0),s=new et(this.manager,this.audio,()=>{this.manager.replace(t)});this.manager.replace(s)}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}update(){}draw(){}}const ot={STR:"Melee damage · Physical armor · Carry weight",DEX:"Hit chance · Dodge · Ranged damage · Initiative",INT:"Spell power · Mana pool · Magic resistance",CON:"Max HP · Resist status effects · Endurance"},rt=`
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
`;class nt{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){M("load-styles",lt),this._el=w("div","load-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){const e=z.getAllSlots();this._el.innerHTML=`
      <div class="ls-panel">
        <div class="ls-title">Load Game</div>
        <div class="ls-slots" id="slot-list">
          ${e.map((t,s)=>`
            <div class="ls-slot${t?" has-save":" empty"}" data-slot="${s}">
              <div class="lss-num">Slot ${s+1}</div>
              ${t?`
                <div class="lss-info">
                  <div class="lss-name">${t.heroName}</div>
                  <div class="lss-class">${t.class} · Level ${t.level}</div>
                  <div class="lss-progress">Act ${t.act} · ${t.timestamp}</div>
                </div>
                <div class="lss-actions">
                  <button class="lss-load" data-slot="${s}">Load</button>
                  <button class="lss-delete" data-slot="${s}">Delete</button>
                </div>
              `:`
                <div class="lss-empty">Empty</div>
              `}
            </div>
          `).join("")}
        </div>
        <button class="ls-back" id="ls-back">← Back</button>
      </div>
    `,this._el.querySelector("#ls-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),this._el.querySelectorAll(".lss-load").forEach(t=>{t.addEventListener("click",()=>{const s=parseInt(t.dataset.slot);z.loadSlot(s)&&(this.audio.playSfx("click"),this.manager.replace(new re(this.manager,this.audio,null,!1)))})}),this._el.querySelectorAll(".lss-delete").forEach(t=>{t.addEventListener("click",()=>{confirm(`Delete save slot ${parseInt(t.dataset.slot)+1}?`)&&(z.deleteSlot(parseInt(t.dataset.slot)),this.audio.playSfx("click"),this._render())})})}update(){}draw(){}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const lt=`
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
`;class dt{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){M("settings-styles",`
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
      </div>
      <button class="settings-back" id="settings-back">← Back</button>
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#master-vol").addEventListener("input",s=>this.audio.setMasterVolume(+s.target.value)),this._el.querySelector("#music-vol").addEventListener("input",s=>this.audio.setMusicVolume(+s.target.value)),this._el.querySelector("#sfx-vol").addEventListener("input",s=>this.audio.setSfxVolume(+s.target.value));const e=this._el.querySelector("#reduce-motion-toggle");e.addEventListener("click",()=>{const s=e.classList.toggle("on");localStorage.setItem("reduceMotion",s?"1":"0")});const t=this._el.querySelector("#auto-advance-toggle");t.addEventListener("click",()=>{const s=t.classList.toggle("on");localStorage.setItem("autoAdvance",s?"1":"0")}),this._el.querySelector("#settings-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}update(){}draw(){}}const $={CLOUDS:0,LOGO_DROP:1,MENU:2};class ct{constructor(e,t){this.manager=e,this.audio=t,this.phase=$.CLOUDS,this.t=0,this._el=null,this._particles=[],this._clouds=this._makeClouds(),this._logoY=-200,this._logoAlpha=0,this._menuAlpha=0,this._menuVisible=!1}_makeClouds(){const e=[];for(let t=0;t<12;t++)e.push({x:Math.random()*2e3-200,y:Math.random()*400+50,w:Math.random()*300+150,h:Math.random()*80+40,speed:Math.random()*.3+.1,alpha:Math.random()*.4+.3});return e}_makeParticles(e,t){const s=[];for(let a=0;a<60;a++)s.push({x:Math.random()*e,y:Math.random()*t,vx:(Math.random()-.5)*.4,vy:-(Math.random()*.6+.1),size:Math.random()*2+.5,alpha:Math.random(),life:Math.random(),maxLife:Math.random()*.5+.3,color:["#e8a020","#c04030","#f0c060","#ff6040"][Math.floor(Math.random()*4)]});return s}onEnter(){this.audio.playTitleMusic(),this._buildMenu()}_getNgPlusLabel(){try{const e=[1,2,3].map(s=>z.loadSlot(s)).filter(Boolean),t=Math.max(0,...e.map(s=>s.ngPlus||0));if(t>0)return` <span class="tm-ng-badge">✦ NG+${t}</span>`}catch{}return""}_buildMenu(){const e=this.manager.uiOverlay;this._el=w("div","title-menu"),this._el.innerHTML=`
      <div class="title-menu-inner" id="tm-inner">
        <div class="tm-subtitle">A High Fantasy Adventure${this._getNgPlusLabel()}</div>
        <nav class="tm-nav">
          <button class="tm-btn" id="btn-new-game">New Game</button>
          <button class="tm-btn" id="btn-load-game">Load Game</button>
          <button class="tm-btn tm-btn-secondary" id="btn-settings">Settings</button>
        </nav>
        <div class="tm-footer">Emberveil · 2026</div>
      </div>
    `,this._el.style.opacity="0",this._el.style.pointerEvents="none",e.appendChild(this._el),this._el.querySelector("#btn-new-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new it(this.manager,this.audio))}),this._el.querySelector("#btn-load-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new nt(this.manager,this.audio))}),this._el.querySelector("#btn-settings").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new dt(this.manager,this.audio))}),this._injectStyles()}_injectStyles(){if(document.getElementById("title-screen-styles"))return;const e=document.createElement("style");e.id="title-screen-styles",e.textContent=`
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
    `,document.head.appendChild(e)}update(e){this.t+=e;const t=this.manager.width,s=this.manager.height;for(const a of this._clouds)a.x+=a.speed,a.x>t+200&&(a.x=-300);this._particles.length||(this._particles=this._makeParticles(t,s));for(const a of this._particles)a.life-=e*.5,a.life<=0&&(a.x=Math.random()*t,a.y=s+10,a.life=a.maxLife),a.x+=a.vx,a.y+=a.vy;if(this.phase===$.CLOUDS)this.t>2.5&&(this.phase=$.LOGO_DROP,this.t=0);else if(this.phase===$.LOGO_DROP){const a=Math.min(this.t/1.5,1),i=1-Math.pow(1-a,3);this._logoY=(1-i)*(-s*.3)+i*(s*.35),this._logoAlpha=Math.min(this.t/.8,1),this.t>1.8&&(this.phase=$.MENU,this.t=0)}else this.phase===$.MENU&&(this._menuAlpha=Math.min(this.t/1.5,1),this._el&&(this._el.style.opacity=this._menuAlpha,this._el.style.pointerEvents=this._menuAlpha>.5?"auto":"none"))}draw(e){const t=this.manager.width,s=this.manager.height,a=e.createLinearGradient(0,0,0,s);a.addColorStop(0,"#050208"),a.addColorStop(.4,"#0d0810"),a.addColorStop(.7,"#1a1025"),a.addColorStop(1,"#2a1830"),e.fillStyle=a,e.fillRect(0,0,t,s),e.save();const i=this.phase===$.CLOUDS?Math.max(0,1-this.t/1.5):this.phase===$.LOGO_DROP?Math.max(0,1-this.t):.3;for(let h=0;h<80;h++){const c=h*137.5%1*t,p=h*97.3%1*s*.6,y=h*61.7%1*.8+.2;e.globalAlpha=y*i,e.fillStyle="#ffffff",e.beginPath(),e.arc(c,p,.8,0,Math.PI*2),e.fill()}e.restore();const o=s*.68,r=e.createLinearGradient(0,o,0,s);r.addColorStop(0,"#0d1a10"),r.addColorStop(.3,"#0a1208"),r.addColorStop(1,"#050a04"),e.fillStyle=r,e.fillRect(0,o,t,s-o),e.save(),e.fillStyle="#0a1208",e.beginPath(),e.moveTo(0,s),e.lineTo(0,o+20);for(let h=0;h<=t;h+=40){const c=Math.sin(h*.008)*30+Math.sin(h*.02)*15;e.lineTo(h,o-c)}e.lineTo(t,s),e.closePath(),e.fill(),e.restore();const l=e.createRadialGradient(t/2,o,0,t/2,o,t*.5);l.addColorStop(0,"rgba(192,64,48,0.2)"),l.addColorStop(.4,"rgba(192,64,48,0.06)"),l.addColorStop(1,"rgba(192,64,48,0)"),e.fillStyle=l,e.fillRect(0,o-80,t,160),e.save();const d=this.phase===$.CLOUDS?this.t*60:0;for(const h of this._clouds){e.globalAlpha=h.alpha;const c=e.createRadialGradient(h.x+h.w/2,h.y,0,h.x+h.w/2,h.y,h.w/2);c.addColorStop(0,"rgba(200,180,255,0.8)"),c.addColorStop(1,"rgba(100,80,140,0)"),e.fillStyle=c,e.beginPath(),e.ellipse(h.x+h.w/2,h.y+d*.1,h.w/2,h.h/2,0,0,Math.PI*2),e.fill()}e.restore(),e.save();for(const h of this._particles){const c=h.life/h.maxLife*.7;e.globalAlpha=c,e.fillStyle=h.color,e.shadowBlur=6,e.shadowColor=h.color,e.beginPath(),e.arc(h.x,h.y,h.size,0,Math.PI*2),e.fill()}if(e.shadowBlur=0,e.restore(),this.phase!==$.CLOUDS){e.save(),e.globalAlpha=this._logoAlpha;const h=e.createRadialGradient(t/2,this._logoY,0,t/2,this._logoY,250);h.addColorStop(0,"rgba(232,160,32,0.15)"),h.addColorStop(1,"rgba(232,160,32,0)"),e.fillStyle=h,e.fillRect(t/2-300,this._logoY-100,600,200);const c=Math.min(t*.13,80);e.font=`900 ${c}px Cinzel, Georgia, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=40,e.shadowColor="#c04030",e.fillStyle="#c04030",e.fillText("EMBERVEIL",t/2+2,this._logoY+2),e.shadowBlur=20,e.shadowColor="#e8a020",e.fillStyle="#e8a020",e.fillText("EMBERVEIL",t/2,this._logoY),e.shadowBlur=0,e.fillStyle="#f8d880",e.globalAlpha=this._logoAlpha*.4,e.fillText("EMBERVEIL",t/2,this._logoY-1),e.restore()}}onExit(){_(this._el),this._el=null}destroy(){_(this._el),this._el=null}}const B=document.getElementById("game-canvas"),ne=document.getElementById("ui-overlay");function le(){B.width=window.innerWidth,B.height=window.innerHeight}le();window.addEventListener("resize",le);const ht=new ue(B,ne),de=new ge,O=new pe(B,ne,ht,de);O.push(new ct(O,de));let J=0;function ce(n){const e=Math.min((n-J)/1e3,.1);J=n,O.update(e),O.draw(),requestAnimationFrame(ce)}requestAnimationFrame(ce);
