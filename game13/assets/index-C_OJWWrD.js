(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class H{constructor(e,t,i,s){this.canvas=e,this.ctx=e.getContext("2d"),this.uiOverlay=t,this.input=i,this.audio=s,this._stack=[]}push(e){const t=this._stack[this._stack.length-1];t!=null&&t.onPause&&t.onPause(),e.manager=this,this._stack.push(e),e.onEnter&&e.onEnter()}pop(){if(!this._stack.length)return;const e=this._stack.pop();e.onExit&&e.onExit(),e.destroy&&e.destroy();const t=this._stack[this._stack.length-1];t!=null&&t.onResume&&t.onResume()}replace(e){this._stack.length&&this.pop(),this.push(e)}update(e){var t;(t=this._stack[this._stack.length-1])==null||t.update(e)}draw(){var t;const e=this.ctx;e.clearRect(0,0,this.canvas.width,this.canvas.height);for(const i of this._stack)(t=i.draw)==null||t.call(i,e)}get width(){return this.canvas.width}get height(){return this.canvas.height}}class q{constructor(e,t){this.canvas=e,this.overlay=t,this.mouse={x:0,y:0,down:!1},this.keys=new Set,this._clicks=[],this._listeners=[],this._bind("pointermove",e,i=>this._onMove(i)),this._bind("pointerdown",e,i=>this._onDown(i)),this._bind("pointerup",e,i=>this._onUp(i)),this._bind("keydown",window,i=>this.keys.add(i.code)),this._bind("keyup",window,i=>this.keys.delete(i.code))}_bind(e,t,i){t.addEventListener(e,i,{passive:!0}),this._listeners.push({event:e,target:t,handler:i})}_onMove(e){const t=this.canvas.getBoundingClientRect(),i=this.canvas.width/t.width,s=this.canvas.height/t.height;this.mouse.x=(e.clientX-t.left)*i,this.mouse.y=(e.clientY-t.top)*s}_onDown(e){this._onMove(e),this.mouse.down=!0}_onUp(e){this._onMove(e),this.mouse.down=!1,this._clicks.push({x:this.mouse.x,y:this.mouse.y})}consumeClicks(){const e=this._clicks;return this._clicks=[],e}isKey(e){return this.keys.has(e)}destroy(){for(const{event:e,target:t,handler:i}of this._listeners)t.removeEventListener(e,i)}}class V{constructor(){this._ctx=null,this._masterGain=null,this._musicGain=null,this._sfxGain=null,this._currentTrack=null,this._nodes=[],this.masterVolume=.8,this.musicVolume=.6,this.sfxVolume=.8,this._started=!1}_ensureContext(){this._ctx||(this._ctx=new(window.AudioContext||window.webkitAudioContext),this._masterGain=this._ctx.createGain(),this._masterGain.gain.value=this.masterVolume,this._masterGain.connect(this._ctx.destination),this._musicGain=this._ctx.createGain(),this._musicGain.gain.value=this.musicVolume,this._musicGain.connect(this._masterGain),this._sfxGain=this._ctx.createGain(),this._sfxGain.gain.value=this.sfxVolume,this._sfxGain.connect(this._masterGain))}resume(){this._ensureContext(),this._ctx.state==="suspended"&&this._ctx.resume(),this._started=!0}playTitleMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:55,type:"sine",gain:.08,detune:0},{freq:82.5,type:"sine",gain:.05,detune:5},{freq:110,type:"sine",gain:.04,detune:-3}]),this._addPad([220,277.2,329.6,440],.03)}playCombatMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:110,type:"sawtooth",gain:.04,detune:0},{freq:165,type:"square",gain:.02,detune:8}]),this._addPulse(110,.12,.4)}playTownMusic(){this.resume(),this._stopCurrentTrack(),this._currentTrack=this._buildAmbientLayer([{freq:220,type:"triangle",gain:.06,detune:0},{freq:330,type:"sine",gain:.04,detune:2},{freq:440,type:"sine",gain:.03,detune:-2}]),this._addPad([220,293.7,369.9],.04)}_buildAmbientLayer(e){if(!this._ctx)return[];const t=[];for(const i of e){const s=this._ctx.createOscillator(),a=this._ctx.createGain(),n=this._ctx.createBiquadFilter();s.type=i.type,s.frequency.value=i.freq,s.detune.value=i.detune,n.type="lowpass",n.frequency.value=800,a.gain.value=0,s.connect(n),n.connect(a),a.connect(this._musicGain),s.start(),a.gain.linearRampToValueAtTime(i.gain,this._ctx.currentTime+3),t.push(s,a,n)}return this._nodes.push(...t),t}_addPad(e,t){if(!this._ctx)return;const i=4;let s=this._ctx.currentTime+2;const a=()=>{if(this._ctx){for(const n of e){const r=this._ctx.createOscillator(),c=this._ctx.createGain();r.type="sine",r.frequency.value=n,c.gain.value=0,r.connect(c),c.connect(this._musicGain),r.start(s),c.gain.setValueAtTime(0,s),c.gain.linearRampToValueAtTime(t,s+.5),c.gain.setValueAtTime(t,s+i-1),c.gain.linearRampToValueAtTime(0,s+i),r.stop(s+i+.1)}s+=i}};for(let n=0;n<20;n++)a()}_addPulse(e,t,i){if(!this._ctx)return;let s=this._ctx.currentTime+.5;for(let a=0;a<60;a++){const n=this._ctx.createOscillator(),r=this._ctx.createGain();n.type="square",n.frequency.value=e,r.gain.value=0,n.connect(r),r.connect(this._musicGain),n.start(s),r.gain.setValueAtTime(0,s),r.gain.linearRampToValueAtTime(t,s+.02),r.gain.linearRampToValueAtTime(0,s+i*.8),n.stop(s+i),s+=i}}_stopCurrentTrack(){var e,t;for(const i of this._nodes){try{(e=i.stop)==null||e.call(i)}catch{}try{(t=i.disconnect)==null||t.call(i)}catch{}}this._nodes=[]}playSfx(e){if(this.resume(),!this._ctx)return;const t=this._ctx,i=t.currentTime,s=t.createOscillator(),a=t.createGain();switch(s.connect(a),a.connect(this._sfxGain),e){case"click":s.frequency.value=880,s.type="sine",a.gain.setValueAtTime(.15,i),a.gain.exponentialRampToValueAtTime(.001,i+.1),s.start(i),s.stop(i+.1);break;case"hit":s.frequency.value=200,s.type="sawtooth",a.gain.setValueAtTime(.3,i),a.gain.exponentialRampToValueAtTime(.001,i+.2),s.start(i),s.stop(i+.2);break;case"spell":s.frequency.setValueAtTime(440,i),s.frequency.linearRampToValueAtTime(880,i+.3),s.type="sine",a.gain.setValueAtTime(.2,i),a.gain.exponentialRampToValueAtTime(.001,i+.4),s.start(i),s.stop(i+.4);break;case"victory":s.frequency.setValueAtTime(440,i),s.frequency.setValueAtTime(554,i+.15),s.frequency.setValueAtTime(659,i+.3),s.frequency.setValueAtTime(880,i+.45),s.type="sine",a.gain.setValueAtTime(.25,i),a.gain.setValueAtTime(.25,i+.6),a.gain.exponentialRampToValueAtTime(.001,i+1),s.start(i),s.stop(i+1);break}}setMasterVolume(e){this.masterVolume=e,this._masterGain&&(this._masterGain.gain.value=e)}setMusicVolume(e){this.musicVolume=e,this._musicGain&&(this._musicGain.gain.value=e)}setSfxVolume(e){this.sfxVolume=e,this._sfxGain&&(this._sfxGain.gain.value=e)}}function p(l,e,t={}){const i=document.createElement(l);e&&(i.className=e);for(const[s,a]of Object.entries(t))i.setAttribute(s,a);return i}function h(l){var e;(e=l==null?void 0:l.parentNode)==null||e.removeChild(l)}function _(l,e){if(document.getElementById(l))return;const t=document.createElement("style");t.id=l,t.textContent=e,document.head.appendChild(t)}const N=[{id:"warrior",name:"Warrior",role:"Frontline Tank",hook:"Shield Bash stuns enemies. Whirlwind hits all adjacent foes. Unbreakable when outnumbered.",armorType:"Heavy Armor · Sword / Hammer / 2H",primaryAttr:"STR",armorTier:"heavy",weapons:["sword","hammer","2h_sword","2h_axe"],skills:["shield_bash","battle_cry","whirlwind","unbreakable"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4L8 14v8l10 10 10-10v-8L18 4z"/><path d="M18 4v28M8 14h20"/></svg>'},{id:"paladin",name:"Paladin",role:"Holy Warrior",hook:"Holy Strike crits vs demons. Lay on Hands keeps allies alive. Consecration sustains long fights.",armorType:"Medium Armor · Sword / Scepter + Shield",primaryAttr:"STR",armorTier:"medium",weapons:["sword","scepter"],skills:["holy_strike","lay_on_hands","divine_shield","consecration"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 3l-14 6v9c0 8 7 14 14 16 7-2 14-8 14-16V9L18 3z"/><path d="M12 18l4 4 8-8"/></svg>'},{id:"ranger",name:"Ranger",role:"Precision Ranged",hook:"Aimed Shot ignores armor. Rain of Arrows blankets the entire enemy field for 3 rounds.",armorType:"Light Armor · Bow / Crossbow / Javelin",primaryAttr:"DEX",armorTier:"light",weapons:["bow","crossbow","javelin"],skills:["aimed_shot","multi_shot","smoke_trap","rain_of_arrows"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l26 26M5 5l8 2-2-8"/><circle cx="24" cy="12" r="4"/></svg>'},{id:"rogue",name:"Rogue",role:"Burst Assassin",hook:"200% Backstab on stunned targets. Death Mark makes enemies take 50% more damage from all sources.",armorType:"Light Armor · Dagger (dual wield)",primaryAttr:"DEX",armorTier:"light",weapons:["dagger"],skills:["backstab","poison_blade","shadow_step","death_mark"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 26L26 10M18 10l8-2-2 8"/><path d="M10 26c-2 2-4 2-4 0s0-2 2-4"/></svg>'},{id:"cleric",name:"Cleric",role:"Primary Healer",hook:"Mass Resurrection can auto-trigger on wipe. Sanctuary makes an ally temporarily untargetable.",armorType:"Light Armor · Staff / Scepter / Wand",primaryAttr:"INT",armorTier:"light",weapons:["staff","scepter","wand"],skills:["heal","smite","sanctuary","mass_resurrection"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4v28M4 18h28"/></svg>'},{id:"bard",name:"Bard",role:"Support Maestro",hook:"Ballad of Valor gives one hero two turns per round. Song of Ruin strips all enemy buffs at once.",armorType:"Light Armor · Dagger / Wand",primaryAttr:"INT",armorTier:"light",weapons:["dagger","wand"],skills:["inspiring_tune","discordant_wail","ballad_of_valor","song_of_ruin"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 28c0-3 3-5 8-5s8 2 8 5"/><path d="M14 23V10l12-3v13"/><circle cx="10" cy="28" r="3"/><circle cx="24" cy="25" r="3"/></svg>'},{id:"mage",name:"Mage",role:"AoE Glass Cannon",hook:"Fireball torches entire enemy packs. Blizzard hits all enemies for 3 rounds. Arcane Surge: 400% INT.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["magic_missile","fireball","blizzard","arcane_surge"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>'},{id:"necromancer",name:"Necromancer",role:"Army Builder",hook:"Raise Dead turns corpses into skeleton allies. Death Coil applies Poison AND Bleed to all enemies.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["bone_spike","raise_dead","life_drain","death_coil"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="14" r="8"/><path d="M14 14v5M22 14v5M10 28c0-5 4-9 8-9s8 4 8 9"/></svg>'},{id:"warlock",name:"Warlock",role:"Chaos Dealer",hook:"Corruption spreads on enemy death. Soul Pact doubles all DoT at cost of own HP.",armorType:"Cloth Armor · Staff / Wand",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand"],skills:["corruption","hellfire","soul_pact","void_rift"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-4 6-8 8-8 14a8 8 0 0016 0c0-6-4-8-8-14z"/><path d="M14 22c0 2.2 1.8 4 4 4s4-1.8 4-4"/></svg>'},{id:"demon_hunter",name:"Demon Hunter",role:"Specialist Killer",hook:"+50% damage vs demons. Vengeance stacks from fallen allies then unleashes devastating burst.",armorType:"Light Armor · Crossbow / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["crossbow","dagger"],skills:["demon_bolt","glaive_toss","fel_sight","vengeance"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L18 6l12 24"/><path d="M11 22h14"/><path d="M18 6v5"/></svg>'},{id:"scavenger",name:"Scavenger",role:"Resource Specialist",hook:"Scrounge finds items mid-combat. Jackpot has 20% chance to loot Magic+ gear from each kill.",armorType:"Light/Medium · Any 1H weapon",primaryAttr:"DEX",armorTier:"light",weapons:["dagger","sword","hammer","javelin"],skills:["scrounge","thrown_junk","makeshift_bomb","jackpot"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="16" width="16" height="14" rx="2"/><path d="M6 16h24M14 16v-4a4 4 0 018 0v4"/></svg>'},{id:"swashbuckler",name:"Swashbuckler",role:"Flashy Duelist",hook:"Build Flair stacks with Flourish. Grandeur releases all stacks in one legendary strike.",armorType:"Light Armor · Sword / Dagger",primaryAttr:"DEX",armorTier:"light",weapons:["sword","dagger"],skills:["riposte","flourish","taunt","grandeur"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30L30 6M22 6l8-2-2 8"/><path d="M6 30a4 4 0 004-4"/></svg>'},{id:"dragon_knight",name:"Dragon Knight",role:"Draconic Warrior",hook:"Choose fire/ice/lightning. Draconic Fury turns all attacks into group AoE for 2 rounds.",armorType:"Heavy/Medium · 2H Sword / 2H Axe",primaryAttr:"STR",armorTier:"heavy",weapons:["2h_sword","2h_axe"],skills:["dragon_claw","breath_weapon","dragon_scales","draconic_fury"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c6 4 12 10 12 16s-6 12-12 12S6 26 6 20c0-6 6-12 12-16z"/><path d="M18 4c-3 6 0 14 0 18"/><path d="M8 16c4-2 8-2 10 0"/></svg>'},{id:"pyromancer",name:"Pyromancer",role:"Fire Specialist",hook:"Stack Burn on multiple groups. Meteor ignites every enemy group simultaneously.",armorType:"Cloth Armor · Staff / Wand / Scepter",primaryAttr:"INT",armorTier:"cloth",weapons:["staff","wand","scepter"],skills:["flame_lance","ignite","pyroclasm","meteor"],svgIcon:'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4c-2 8 6 10 2 18a8 8 0 01-8-8c0-2 1-4 2-5-1 4 2 6 4 4 2-8-4-6-4-14"/><path d="M18 22a4 4 0 000 8"/></svg>'}],P=.5,D=.2;class Y{constructor(e,t,i,s){this.manager=e,this.audio=t,this.hero=i,this.encounter=s,this._el=null,this._heroes=[this._heroToCombatant(i)],this._enemyGroups=s.enemies.map((a,n)=>this._buildEnemyGroup(a,n)),this._allEnemies=this._enemyGroups.flat(),this._log=[],this._round=1,this._turnIdx=0,this._turnTimer=0,this._phase="START",this._particles=[],this._flashTargets=new Map,this._combatants=[],this._t=0,this._startDelay=1,this._animQueue=[],this._buildTurnOrder()}_heroToCombatant(e){const t=e.attrs;return{id:e.id,name:e.name,class:e.class,isHero:!0,hp:50+t.CON*10,maxHp:50+t.CON*10,mp:30+t.INT*8,maxMp:30+t.INT*8,dmg:[Math.max(1,Math.round(t.STR*1.2)),Math.max(4,Math.round(t.STR*2.2))],armor:0,hit:Math.min(95,70+Math.round(t.DEX*1.2)),dodge:Math.min(40,5+Math.round(t.DEX*.8)),initiative:t.DEX,alive:!0,stance:"ready",x:0,y:0,offsetX:0,offsetY:0}}_buildEnemyGroup(e,t){const i=[];for(let s=0;s<e.count;s++)i.push({id:`${e.id}_${t}_${s}`,name:e.name,groupIdx:t,isHero:!1,hp:e.hp,maxHp:e.maxHp,dmg:[...e.dmg],armor:e.armor,hit:e.hit,dodge:e.dodge,initiative:5+Math.random()*5,alive:!0,stance:"ready",xpValue:e.xpValue,gold:e.gold,x:0,y:0,offsetX:0,offsetY:0});return i}_buildTurnOrder(){const e=[...this._heroes,...this._allEnemies].filter(t=>t.alive);e.forEach(t=>{t._roll=t.initiative+Math.random()*10}),e.sort((t,i)=>i._roll-t._roll),this._turnOrder=e,this._turnIdx=0}onEnter(){this.audio.playCombatMusic(),this._build()}_build(){_("combat-styles",j),this._el=p("div","combat-screen"),this._el.innerHTML=`
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
    `}_updateHud(){var t,i,s,a;for(const n of this._heroes){const r=(t=this._el)==null?void 0:t.querySelector(`#hp-bar-${n.id}`),c=(i=this._el)==null?void 0:i.querySelector(`#mp-bar-${n.id}`),m=(s=this._el)==null?void 0:s.querySelector(`#hp-val-${n.id}`);r&&(r.style.width=`${Math.max(0,n.hp/n.maxHp*100)}%`),c&&(c.style.width=`${Math.max(0,n.mp/n.maxMp*100)}%`),m&&(m.textContent=Math.max(0,n.hp))}const e=(a=this._el)==null?void 0:a.querySelector("#round-num");e&&(e.textContent=this._round)}_addLog(e,t="normal"){var a;this._log.push({msg:e,type:t});const i=(a=this._el)==null?void 0:a.querySelector("#log-entries");if(!i)return;const s=p("div",`log-entry log-${t}`);for(s.textContent=e,i.appendChild(s);i.children.length>8;)i.removeChild(i.firstChild);i.scrollTop=i.scrollHeight}update(e){if(this._t+=e,this._phase==="START"){this._t>=this._startDelay&&(this._phase="PLAYING",this._t=0,this._addLog(`Round ${this._round} begins!`,"round"));return}if(this._phase==="PLAYING"){for(const t of this._animQueue)t.progress=Math.min(1,t.progress+e/t.duration);this._animQueue=this._animQueue.filter(t=>t.progress<1);for(const[t,i]of this._flashTargets){const s=i-e;s<=0?this._flashTargets.delete(t):this._flashTargets.set(t,s)}this._particles=this._particles.filter(t=>(t.life-=e,t.x+=t.vx,t.y+=t.vy,t.vy+=30*e,t.life>0)),this._turnTimer+=e,!(this._turnTimer<P)&&(this._turnTimer=0,this._executeTurn())}}_executeTurn(){if(this._turnIdx>=this._turnOrder.length){this._round++,this._buildTurnOrder(),this._addLog(`── Round ${this._round} ──`,"round");return}const e=this._turnOrder[this._turnIdx];if(this._turnIdx++,!e.alive)return;const t=e.isHero?this._allEnemies.filter(d=>d.alive):this._heroes.filter(d=>d.alive);if(!t.length)return;const i=t[Math.floor(Math.random()*t.length)],s=Math.random()*100,a=Math.max(5,Math.min(95,e.hit-i.dodge));if(!(s<a)){this._addLog(`${e.name} misses ${i.name}.`,"miss"),e.stance="attack",setTimeout(()=>{e.stance="ready"},400);return}const r=e.dmg[0]+Math.floor(Math.random()*(e.dmg[1]-e.dmg[0]+1)),c=Math.max(1,r-i.armor);i.hp-=c,e.stance="attack",this._flashTargets.set(i.id,D),this._spawnHitParticles(i),this.audio.playSfx("hit"),setTimeout(()=>{e.stance="ready"},400),this._addLog(`${e.name} hits ${i.name} for ${c} damage.`,e.isHero?"hero":"enemy"),this._updateHud(),i.hp<=0&&(i.hp=0,i.alive=!1,i.stance="death",this._addLog(`${i.name} is defeated!`,"death"));const m=this._allEnemies.every(d=>!d.alive),o=this._heroes.every(d=>!d.alive);m?(setTimeout(()=>this._victory(),800),this._phase="VICTORY"):o&&(setTimeout(()=>this._defeat(),800),this._phase="DEFEAT")}_spawnHitParticles(e){const t=["#e8a020","#ff6040","#f0c060"];for(let i=0;i<6;i++)this._particles.push({x:e.x+e.offsetX,y:e.y+e.offsetY,vx:(Math.random()-.5)*80,vy:-(Math.random()*60+20),size:Math.random()*4+2,color:t[Math.floor(Math.random()*t.length)],life:Math.random()*.4+.2})}_victory(){this.audio.playSfx("victory");let e=0,t=0;for(const i of this._allEnemies)e+=i.xpValue,t+=i.gold[0]+Math.floor(Math.random()*(i.gold[1]-i.gold[0]+1));this.hero.xp=(this.hero.xp||0)+e,this.hero.gold=(this.hero.gold||0)+t,this._showEndModal("Victory!",`
      <div class="end-rewards">
        <div class="end-reward"><span class="er-label">XP Gained</span><span class="er-val">+${e}</span></div>
        <div class="end-reward"><span class="er-label">Gold Found</span><span class="er-val">+${t} <svg viewBox="0 0 16 16" width="14" fill="#e8a020"><circle cx="8" cy="8" r="7"/></svg></span></div>
      </div>
    `,"victory",()=>this.manager.replace(new S(this.manager,this.audio,this.hero)))}_defeat(){const e=Math.floor((this.hero.gold||0)*.1);this.hero.gold=Math.max(0,(this.hero.gold||0)-e),this._showEndModal("Defeated",`
      <p style="color:#c04030">Your party has fallen. You are returned to Emberglen.</p>
      ${e>0?`<p style="color:#8a7a6a;font-size:0.8rem;margin-top:0.5rem">Gold lost: ${e}</p>`:""}
    `,"defeat",()=>this.manager.replace(new S(this.manager,this.audio,this.hero)))}_showEndModal(e,t,i,s){const a=p("div",`combat-end-modal end-${i}`);a.innerHTML=`
      <div class="cem-box">
        <div class="cem-title">${e}</div>
        <div class="cem-body">${t}</div>
        <button class="cem-btn">Continue</button>
      </div>
    `,a.querySelector(".cem-btn").addEventListener("click",()=>{this.audio.playSfx("click"),s()}),this._el.appendChild(a)}draw(e){const t=this.manager.width,i=this.manager.height,s=this.encounter.background||"#0d1a10";e.fillStyle=s,e.fillRect(0,0,t,i);const a=e.createLinearGradient(0,0,0,i*.6);a.addColorStop(0,"rgba(10,6,8,0.6)"),a.addColorStop(1,"rgba(10,6,8,0)"),e.fillStyle=a,e.fillRect(0,0,t,i*.6);const n=i*.62;e.fillStyle="#0a1408",e.fillRect(0,n,t,i-n),e.fillStyle="rgba(64,168,96,0.15)",e.fillRect(0,n,t,3);const r=t*.2,c=n-10;this._heroes.forEach((o,d)=>{o.x=r+d*60,o.y=c,this._drawCombatant(e,o,!0)});const m=t*.65;this._enemyGroups.forEach((o,d)=>{const f=m+d*90;o.forEach((g,b)=>{g.x=f,g.y=c-b*18,this._drawCombatant(e,g,!1)})}),e.save();for(const o of this._particles)e.globalAlpha=o.life,e.fillStyle=o.color,e.shadowBlur=8,e.shadowColor=o.color,e.beginPath(),e.arc(o.x,o.y,o.size,0,Math.PI*2),e.fill();if(e.shadowBlur=0,e.globalAlpha=1,e.restore(),this._phase==="START"){const o=Math.min(this._t/.5,1);e.save(),e.globalAlpha=o,e.font=`900 ${Math.round(t*.06)}px Cinzel, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=30,e.shadowColor="#c04030",e.fillStyle="#f0e8d8",e.fillText(this.encounter.name,t/2,i*.3),e.restore()}}_drawCombatant(e,t,i){if(!t.alive&&t.stance!=="death")return;const s=t.x+(t.offsetX||0),a=t.y+(t.offsetY||0),n=this._flashTargets.has(t.id);e.save(),e.fillStyle="rgba(0,0,0,0.3)",e.beginPath(),e.ellipse(s,a+2,18,6,0,0,Math.PI*2),e.fill();const r=i?52:40,c=t.alive?1:.4;e.globalAlpha=c,n&&(e.globalAlpha=c,e.shadowBlur=20,e.shadowColor="#ff4040");const m=i?this._heroColor(t.class):"#8B4513",o=i?"#e8a020":"#c0392b";if(e.fillStyle=n?"#ff8060":m,e.beginPath(),e.roundRect(s-r*.3,a-r,r*.6,r*.5,4),e.fill(),e.beginPath(),e.arc(s,a-r*.8,r*.22,0,Math.PI*2),e.fill(),e.fillStyle=n?"#ff6040":o,e.fillRect(s-r*.2,a-r*.5,r*.15,r*.45),e.fillRect(s+r*.05,a-r*.5,r*.15,r*.45),t.stance==="attack"&&i&&(e.fillStyle="#e8a020",e.beginPath(),e.moveTo(s+r*.3,a-r*.7),e.lineTo(s+r*.55,a-r*.45),e.lineTo(s+r*.35,a-r*.3),e.closePath(),e.fill()),t.alive||(e.strokeStyle="#ff4040",e.lineWidth=2,e.beginPath(),e.moveTo(s-5,a-r*.85),e.lineTo(s-2,a-r*.75),e.moveTo(s-2,a-r*.85),e.lineTo(s-5,a-r*.75),e.moveTo(s+2,a-r*.85),e.lineTo(s+5,a-r*.75),e.moveTo(s+5,a-r*.85),e.lineTo(s+2,a-r*.75),e.stroke()),e.shadowBlur=0,e.globalAlpha=1,t.alive){const d=r*1.2,f=4,g=s-d/2,b=a-r-10;e.fillStyle="rgba(0,0,0,0.5)",e.fillRect(g,b,d,f);const k=Math.max(0,t.hp/t.maxHp),O=k>.5?"#40c870":k>.25?"#e8a020":"#c04030";e.fillStyle=O,e.fillRect(g,b,d*k,f),i||(e.font="10px Inter, sans-serif",e.textAlign="center",e.fillStyle="rgba(240,232,216,0.7)",e.fillText(t.name,s,b-3))}e.restore()}_heroColor(e){return{warrior:"#607080",paladin:"#d4af37",ranger:"#4a7a40",rogue:"#3a3050",cleric:"#e0d0a0",bard:"#8060a0",mage:"#4060c0",necromancer:"#503060",warlock:"#802040",demon_hunter:"#c04060",scavenger:"#806040",swashbuckler:"#c08020",dragon_knight:"#806020",pyromancer:"#c04020"}[e]||"#607080"}onExit(){h(this._el),this._el=null}destroy(){h(this._el),this._el=null}}const j=`
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
`,X=[{id:"merchant",label:"Merchant",icon:T,desc:"Buy and sell equipment"},{id:"tavern",label:"Tavern",icon:M,desc:"Hire heroes & companions"},{id:"cleric",label:"Cleric",icon:C,desc:"Revive fallen party members"},{id:"blacksmith",label:"Blacksmith",icon:E,desc:"Upgrade equipment quality"},{id:"enchanter",label:"Enchanter",icon:A,desc:"Add magic enchantments"}];class S{constructor(e,t,i,s=!1){this.manager=e,this.audio=t,this.hero=i,this.isNewGame=s,this._el=null}onEnter(){this.audio.playTownMusic(),this._build()}_build(){_("town-styles",J),this._el=p("div","town-screen"),this._render(),this.manager.uiOverlay.appendChild(this._el)}_render(){const e=this.hero.gold??150;this._el.innerHTML=`
      <div class="town-bg"></div>
      <div class="town-content">
        <div class="town-header">
          <div class="town-location">
            <div class="town-region-label">Act I · The Goblin Frontier</div>
            <div class="town-name">Emberglen</div>
            <div class="town-subtitle">A frontier village holding firm against the darkness</div>
          </div>
          <div class="town-party-bar">
            <div class="party-member-pill">
              <div class="pm-class-icon">${F(this.hero.class)}</div>
              <div class="pm-info">
                <span class="pm-name">${this.hero.name}</span>
                <span class="pm-class">${this.hero.className} · Lv ${this.hero.level}</span>
              </div>
            </div>
          </div>
          <div class="town-gold">
            ${W}
            <span class="gold-amount">${e.toLocaleString()}</span>
          </div>
        </div>

        ${this.isNewGame?`
        <div class="town-welcome-banner">
          <div class="twb-inner">
            <div class="twb-title">Welcome to Emberglen</div>
            <div class="twb-text">The village elder tells you of goblin raids increasing at the border. Shadows move where they shouldn't. Before setting out, speak with those who gather here — you may find allies worth knowing.</div>
          </div>
        </div>`:""}

        <div class="town-services-grid" id="services-grid"></div>

        <div class="town-actions">
          <button class="town-btn town-btn-primary" id="btn-continue">
            ${K} Set Out on the Road
          </button>
        </div>
      </div>
    `;const t=this._el.querySelector("#services-grid");for(const i of X){const s=p("div","service-card");s.innerHTML=`
        <div class="service-icon">${i.icon}</div>
        <div class="service-name">${i.label}</div>
        <div class="service-desc">${i.desc}</div>
      `,s.addEventListener("click",()=>{this.audio.playSfx("click"),this._openService(i.id)}),t.appendChild(s)}this._el.querySelector("#btn-continue").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new Y(this.manager,this.audio,this.hero,U))})}_openService(e){const t=p("div","service-modal"),i={merchant:"Merchant",tavern:"Tavern",cleric:"Cleric",blacksmith:"Blacksmith",enchanter:"Enchanter"};t.innerHTML=`
      <div class="sm-overlay"></div>
      <div class="sm-box">
        <div class="sm-title">${i[e]}</div>
        <div class="sm-body">Full service available in the next milestone. Come back soon!</div>
        <button class="sm-close">Close</button>
      </div>
    `,t.querySelector(".sm-overlay").addEventListener("click",()=>h(t)),t.querySelector(".sm-close").addEventListener("click",()=>{this.audio.playSfx("click"),h(t)}),this.manager.uiOverlay.appendChild(t)}update(){}draw(){}onExit(){h(this._el),this._el=null}destroy(){h(this._el),this._el=null}}function F(l){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/></svg>'}const U={name:"Goblin Patrol",enemies:[{id:"goblin_scout",name:"Goblin Scout",count:3,hp:22,maxHp:22,dmg:[4,8],armor:2,hit:72,dodge:12,xpValue:15,gold:[2,6]},{id:"goblin_warrior",name:"Goblin Warrior",count:2,hp:35,maxHp:35,dmg:[7,14],armor:5,hit:68,dodge:8,xpValue:25,gold:[5,12]}],background:"#1a2d18",music:"combat"};function T(){return'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="14" width="20" height="16" rx="2"/><path d="M12 14v-2a6 6 0 0112 0v2"/><path d="M8 20h20"/></svg>'}function M(){return'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 30V16l8-10 8 10v14"/><path d="M14 30v-8h8v8"/></svg>'}function C(){return'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6v24M6 18h24"/><circle cx="18" cy="18" r="4"/></svg>'}function E(){return'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 26l16-16M22 8l6 6-4 4-6-6z"/><path d="M10 26l-4 4"/></svg>'}function A(){return'<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 4l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z"/></svg>'}T=T();M=M();C=C();E=E();A=A();const W='<svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><circle cx="10" cy="10" r="9" fill="#e8a020" stroke="none"/><text x="10" y="14" text-anchor="middle" font-size="11" fill="#0a0608" font-weight="900">G</text></svg>',K='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M1 5l6-2 6 4 6-2v12l-6 2-6-4-6 2V5z"/><path d="M7 3v12M13 7v12"/></svg>',J=`
.town-screen {
  position: absolute; inset: 0; overflow-y: auto;
  font-family: 'Inter', sans-serif; color: #f0e8d8;
}
.town-bg {
  position: fixed; inset: 0; z-index: 0;
  background: linear-gradient(180deg,#0a1208 0%,#0d1a10 40%,#121f14 100%);
}
.town-content { position: relative; z-index: 1; min-height: 100%; display: flex; flex-direction: column; }
.town-header {
  display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap;
  gap: 1rem; padding: 1.5rem; border-bottom: 1px solid rgba(232,160,32,0.15);
  background: rgba(0,0,0,0.3);
}
.town-region-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #40a860; }
.town-name { font-family: 'Cinzel', serif; font-size: 1.6rem; font-weight: 900; color: #e8a020; }
.town-subtitle { font-size: 0.75rem; color: #8a7a6a; margin-top: 0.2rem; }
.town-party-bar { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; flex: 1; justify-content: center; }
.party-member-pill {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.5rem 0.75rem; background: rgba(26,18,24,0.8);
  border: 1px solid rgba(232,160,32,0.2); border-radius: 6px;
}
.pm-class-icon { color: #e8a020; }
.pm-info { display: flex; flex-direction: column; }
.pm-name { font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700; }
.pm-class { font-size: 0.65rem; color: #8a7a6a; }
.town-gold { display: flex; align-items: center; gap: 0.4rem; font-family: 'Cinzel', serif; font-weight: 700; }
.gold-amount { font-size: 1.1rem; color: #e8a020; }
.town-welcome-banner {
  margin: 1.5rem; padding: 1.2rem 1.5rem;
  background: rgba(64,168,96,0.08); border: 1px solid rgba(64,168,96,0.25);
  border-radius: 10px;
}
.twb-title { font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: #6ddc96; margin-bottom: 0.4rem; }
.twb-text { font-size: 0.82rem; color: #a0c8a0; line-height: 1.6; }
.town-services-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem; padding: 1.5rem;
}
.service-card {
  background: rgba(26,18,24,0.8); border: 1px solid rgba(232,160,32,0.12);
  border-radius: 10px; padding: 1.25rem 1rem;
  cursor: pointer; text-align: center; transition: all 0.2s;
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  min-height: 110px;
}
.service-card:hover { border-color: rgba(232,160,32,0.5); background: rgba(36,26,32,0.9); transform: translateY(-2px); }
.service-icon { width: 36px; height: 36px; color: #e8a020; }
.service-name { font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700; color: #f0e8d8; }
.service-desc { font-size: 0.68rem; color: #8a7a6a; line-height: 1.4; }
.town-actions { padding: 1rem 1.5rem 2rem; display: flex; justify-content: center; }
.town-btn {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.9rem 2rem; border-radius: 8px; border: none;
  font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700;
  letter-spacing: 0.05em; cursor: pointer; min-height: 48px;
  transition: all 0.2s;
}
.town-btn-primary {
  background: linear-gradient(135deg, #1a4020, #2a6030);
  border: 1px solid rgba(64,168,96,0.5); color: #90e8b0;
}
.town-btn-primary:hover { filter: brightness(1.15); transform: translateY(-1px); }
.service-modal {
  position: absolute; inset: 0; z-index: 200;
  display: flex; align-items: center; justify-content: center;
}
.sm-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); }
.sm-box {
  position: relative; z-index: 1; background: #1a1218;
  border: 1px solid rgba(232,160,32,0.3); border-radius: 12px;
  padding: 2rem; max-width: 360px; width: 90%; text-align: center;
}
.sm-title { font-family: 'Cinzel', serif; font-size: 1.2rem; font-weight: 700; color: #e8a020; margin-bottom: 1rem; }
.sm-body { font-size: 0.88rem; color: #8a7a6a; line-height: 1.6; margin-bottom: 1.5rem; }
.sm-close {
  padding: 0.7rem 1.5rem; background: rgba(232,160,32,0.15);
  border: 1px solid rgba(232,160,32,0.4); border-radius: 6px;
  color: #e8a020; font-family: 'Cinzel', serif; font-weight: 700;
  cursor: pointer; min-height: 44px;
}
.sm-close:hover { background: rgba(232,160,32,0.25); }
`,z=1,x=l=>`emberveil_save_${l}`,L={getSlot(l){try{const e=localStorage.getItem(x(l));return e?JSON.parse(e):null}catch{return null}},saveSlot(l,e){const t={version:z,timestamp:new Date().toLocaleDateString(),...e};localStorage.setItem(x(l),JSON.stringify(t))},deleteSlot(l){localStorage.removeItem(x(l))},loadSlot(l){const e=this.getSlot(l);return e||null},migrate(l){return l.version===z,l}},Q=["STR","DEX","INT","CON"],Z=10,v=8;class ee{constructor(e,t){this.manager=e,this.audio=t,this._el=null,this._name="Hero",this._class=null,this._attrs={STR:v,DEX:v,INT:v,CON:v},this._pointsSpent=0,this._step="class",this._saveSlot=0}get _pointsLeft(){return Z-this._pointsSpent}onEnter(){this._build()}_build(){_("cb-styles",ie),this._el=p("div","cb-screen"),this.manager.uiOverlay.appendChild(this._el),this._render()}_render(){this._el.innerHTML="",this._step==="class"?this._renderClassStep():this._renderStatsStep()}_renderClassStep(){var i;const e=this._el;e.innerHTML=`
      <div class="cb-header">
        <div class="cb-title">Create Your Hero</div>
        <div class="cb-subtitle">Choose your class</div>
      </div>
      <div class="cb-class-grid" id="class-grid"></div>
      <div class="cb-footer">
        <button class="cb-btn cb-btn-ghost" id="cb-back">← Back</button>
        <button class="cb-btn cb-btn-primary" id="cb-next" disabled>Next →</button>
      </div>
    `;const t=e.querySelector("#class-grid");for(const s of N){const a=p("div",`cb-class-card${((i=this._class)==null?void 0:i.id)===s.id?" selected":""}`);a.dataset.id=s.id,a.innerHTML=`
        <div class="cb-class-icon">${s.svgIcon}</div>
        <div class="cb-class-name">${s.name}</div>
        <div class="cb-class-role">${s.role}</div>
        <div class="cb-class-hook">${s.hook}</div>
        <div class="cb-class-armor">${s.armorType}</div>
      `,a.addEventListener("click",()=>{this.audio.playSfx("click"),this._class=s,e.querySelectorAll(".cb-class-card").forEach(n=>n.classList.remove("selected")),a.classList.add("selected"),e.querySelector("#cb-next").disabled=!1}),t.appendChild(a)}e.querySelector("#cb-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()}),e.querySelector("#cb-next").addEventListener("click",()=>{this._class&&(this.audio.playSfx("click"),this._step="stats",this._render())})}_renderStatsStep(){const e=this._el;e.innerHTML=`
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
    `,this._renderAttrs(),this._updatePreview(),e.querySelector("#hero-name").addEventListener("input",t=>{this._name=t.target.value||"Hero"}),e.querySelector("#cb-prev").addEventListener("click",()=>{this.audio.playSfx("click"),this._step="class",this._render()}),e.querySelector("#cb-confirm").addEventListener("click",()=>{this.audio.playSfx("victory"),this._confirm()})}_renderAttrs(){const e=this._el.querySelector("#attr-panel");if(e){e.innerHTML="";for(const t of Q){const i=p("div","cb-attr-row"),s=te[t];i.innerHTML=`
        <div class="cb-attr-info">
          <div class="cb-attr-name">${t}</div>
          <div class="cb-attr-desc">${s}</div>
        </div>
        <div class="cb-attr-controls">
          <button class="cb-attr-btn" data-attr="${t}" data-dir="-1">−</button>
          <span class="cb-attr-val" id="val-${t}">${this._attrs[t]}</span>
          <button class="cb-attr-btn" data-attr="${t}" data-dir="1">+</button>
        </div>
      `,e.appendChild(i)}e.querySelectorAll(".cb-attr-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.attr,s=parseInt(t.dataset.dir);this._adjustAttr(i,s)})})}}_adjustAttr(e,t){if(t>0&&this._pointsLeft<=0||t<0&&this._attrs[e]<=v)return;this._attrs[e]+=t,this._pointsSpent-=t*-1,this._pointsSpent+=t;const i=this._el.querySelector(`#val-${e}`);i&&(i.textContent=this._attrs[e]);const s=this._el.querySelector("#pts-left");s&&(s.textContent=this._pointsLeft),this._updatePreview(),this.audio.playSfx("click")}_updatePreview(){var m;const e=(m=this._el)==null?void 0:m.querySelector("#preview-grid");if(!e)return;const t=this._attrs,i=50+t.CON*10,s=30+t.INT*8,a=Math.round(70+t.DEX*1.2),n=Math.round(5+t.DEX*.8),r=Math.round(t.STR*1.5),c=Math.round(1+t.INT*.08,2);e.innerHTML=`
      <div class="preview-stat"><span class="ps-label">HP</span><span class="ps-val">${i}</span></div>
      <div class="preview-stat"><span class="ps-label">Mana</span><span class="ps-val">${s}</span></div>
      <div class="preview-stat"><span class="ps-label">Hit</span><span class="ps-val">${a}%</span></div>
      <div class="preview-stat"><span class="ps-label">Dodge</span><span class="ps-val">${n}%</span></div>
      <div class="preview-stat"><span class="ps-label">Melee</span><span class="ps-val">+${r}</span></div>
      <div class="preview-stat"><span class="ps-label">Spell</span><span class="ps-val">×${c.toFixed(2)}</span></div>
    `}_confirm(){const e={id:crypto.randomUUID(),name:this._name||"Hero",class:this._class.id,className:this._class.name,level:1,xp:0,attrs:{...this._attrs},skills:[this._class.skills[0]],equipment:{},gold:150};L.saveSlot(0,{heroName:e.name,class:e.className,act:1,level:1,hero:e}),this.manager.replace(new S(this.manager,this.audio,e,!0))}onExit(){h(this._el),this._el=null}destroy(){h(this._el),this._el=null}update(){}draw(){}}const te={STR:"Melee damage · Physical armor · Carry weight",DEX:"Hit chance · Dodge · Ranged damage · Initiative",INT:"Spell power · Mana pool · Magic resistance",CON:"Max HP · Resist status effects · Endurance"},ie=`
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
`;class se{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){_("load-screen-styles",`
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
    `),this._el=p("div","load-screen"),this._el.innerHTML=`<div class="load-title">Load Game</div><div class="save-slots" id="slot-list"></div>
      <button class="load-back" id="load-back">← Back</button>`,this.manager.uiOverlay.appendChild(this._el);const e=this._el.querySelector("#slot-list");for(let t=0;t<3;t++){const i=L.getSlot(t),s=p("div",`save-slot${i?"":" empty"}`);i?(s.innerHTML=`<div class="slot-name">${i.heroName} · ${i.class}</div>
          <div class="slot-meta">Act ${i.act} · Level ${i.level} · ${i.timestamp}</div>`,s.addEventListener("click",()=>{this.audio.playSfx("click"),L.loadSlot(t),this.manager.pop()})):s.innerHTML=`<div class="slot-name">Empty Slot ${t+1}</div>`,e.appendChild(s)}this._el.querySelector("#load-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onExit(){h(this._el),this._el=null}destroy(){h(this._el),this._el=null}update(){}draw(){}}class ae{constructor(e,t){this.manager=e,this.audio=t,this._el=null}onEnter(){this._build()}_build(){_("settings-styles",`
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
    `),this._el=p("div","settings-screen"),this._el.innerHTML=`
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
    `,this.manager.uiOverlay.appendChild(this._el),this._el.querySelector("#master-vol").addEventListener("input",i=>this.audio.setMasterVolume(+i.target.value)),this._el.querySelector("#music-vol").addEventListener("input",i=>this.audio.setMusicVolume(+i.target.value)),this._el.querySelector("#sfx-vol").addEventListener("input",i=>this.audio.setSfxVolume(+i.target.value));const e=this._el.querySelector("#reduce-motion-toggle");e.addEventListener("click",()=>{const i=e.classList.toggle("on");localStorage.setItem("reduceMotion",i?"1":"0")});const t=this._el.querySelector("#auto-advance-toggle");t.addEventListener("click",()=>{const i=t.classList.toggle("on");localStorage.setItem("autoAdvance",i?"1":"0")}),this._el.querySelector("#settings-back").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.pop()})}onExit(){h(this._el),this._el=null}destroy(){h(this._el),this._el=null}update(){}draw(){}}const u={CLOUDS:0,LOGO_DROP:1,MENU:2};class re{constructor(e,t){this.manager=e,this.audio=t,this.phase=u.CLOUDS,this.t=0,this._el=null,this._particles=[],this._clouds=this._makeClouds(),this._logoY=-200,this._logoAlpha=0,this._menuAlpha=0,this._menuVisible=!1}_makeClouds(){const e=[];for(let t=0;t<12;t++)e.push({x:Math.random()*2e3-200,y:Math.random()*400+50,w:Math.random()*300+150,h:Math.random()*80+40,speed:Math.random()*.3+.1,alpha:Math.random()*.4+.3});return e}_makeParticles(e,t){const i=[];for(let s=0;s<60;s++)i.push({x:Math.random()*e,y:Math.random()*t,vx:(Math.random()-.5)*.4,vy:-(Math.random()*.6+.1),size:Math.random()*2+.5,alpha:Math.random(),life:Math.random(),maxLife:Math.random()*.5+.3,color:["#e8a020","#c04030","#f0c060","#ff6040"][Math.floor(Math.random()*4)]});return i}onEnter(){this.audio.playTitleMusic(),this._buildMenu()}_buildMenu(){const e=this.manager.uiOverlay;this._el=p("div","title-menu"),this._el.innerHTML=`
      <div class="title-menu-inner" id="tm-inner">
        <div class="tm-subtitle">A High Fantasy Adventure</div>
        <nav class="tm-nav">
          <button class="tm-btn" id="btn-new-game">New Game</button>
          <button class="tm-btn" id="btn-load-game">Load Game</button>
          <button class="tm-btn tm-btn-secondary" id="btn-settings">Settings</button>
        </nav>
        <div class="tm-footer">Emberveil · 2026</div>
      </div>
    `,this._el.style.opacity="0",this._el.style.pointerEvents="none",e.appendChild(this._el),this._el.querySelector("#btn-new-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ee(this.manager,this.audio))}),this._el.querySelector("#btn-load-game").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new se(this.manager,this.audio))}),this._el.querySelector("#btn-settings").addEventListener("click",()=>{this.audio.playSfx("click"),this.manager.push(new ae(this.manager,this.audio))}),this._injectStyles()}_injectStyles(){if(document.getElementById("title-screen-styles"))return;const e=document.createElement("style");e.id="title-screen-styles",e.textContent=`
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
    `,document.head.appendChild(e)}update(e){this.t+=e;const t=this.manager.width,i=this.manager.height;for(const s of this._clouds)s.x+=s.speed,s.x>t+200&&(s.x=-300);this._particles.length||(this._particles=this._makeParticles(t,i));for(const s of this._particles)s.life-=e*.5,s.life<=0&&(s.x=Math.random()*t,s.y=i+10,s.life=s.maxLife),s.x+=s.vx,s.y+=s.vy;if(this.phase===u.CLOUDS)this.t>2.5&&(this.phase=u.LOGO_DROP,this.t=0);else if(this.phase===u.LOGO_DROP){const s=Math.min(this.t/1.5,1),a=1-Math.pow(1-s,3);this._logoY=(1-a)*(-i*.3)+a*(i*.35),this._logoAlpha=Math.min(this.t/.8,1),this.t>1.8&&(this.phase=u.MENU,this.t=0)}else this.phase===u.MENU&&(this._menuAlpha=Math.min(this.t/1.5,1),this._el&&(this._el.style.opacity=this._menuAlpha,this._el.style.pointerEvents=this._menuAlpha>.5?"auto":"none"))}draw(e){const t=this.manager.width,i=this.manager.height,s=e.createLinearGradient(0,0,0,i);s.addColorStop(0,"#050208"),s.addColorStop(.4,"#0d0810"),s.addColorStop(.7,"#1a1025"),s.addColorStop(1,"#2a1830"),e.fillStyle=s,e.fillRect(0,0,t,i),e.save();const a=this.phase===u.CLOUDS?Math.max(0,1-this.t/1.5):this.phase===u.LOGO_DROP?Math.max(0,1-this.t):.3;for(let o=0;o<80;o++){const d=o*137.5%1*t,f=o*97.3%1*i*.6,g=o*61.7%1*.8+.2;e.globalAlpha=g*a,e.fillStyle="#ffffff",e.beginPath(),e.arc(d,f,.8,0,Math.PI*2),e.fill()}e.restore();const n=i*.68,r=e.createLinearGradient(0,n,0,i);r.addColorStop(0,"#0d1a10"),r.addColorStop(.3,"#0a1208"),r.addColorStop(1,"#050a04"),e.fillStyle=r,e.fillRect(0,n,t,i-n),e.save(),e.fillStyle="#0a1208",e.beginPath(),e.moveTo(0,i),e.lineTo(0,n+20);for(let o=0;o<=t;o+=40){const d=Math.sin(o*.008)*30+Math.sin(o*.02)*15;e.lineTo(o,n-d)}e.lineTo(t,i),e.closePath(),e.fill(),e.restore();const c=e.createRadialGradient(t/2,n,0,t/2,n,t*.5);c.addColorStop(0,"rgba(192,64,48,0.2)"),c.addColorStop(.4,"rgba(192,64,48,0.06)"),c.addColorStop(1,"rgba(192,64,48,0)"),e.fillStyle=c,e.fillRect(0,n-80,t,160),e.save();const m=this.phase===u.CLOUDS?this.t*60:0;for(const o of this._clouds){e.globalAlpha=o.alpha;const d=e.createRadialGradient(o.x+o.w/2,o.y,0,o.x+o.w/2,o.y,o.w/2);d.addColorStop(0,"rgba(200,180,255,0.8)"),d.addColorStop(1,"rgba(100,80,140,0)"),e.fillStyle=d,e.beginPath(),e.ellipse(o.x+o.w/2,o.y+m*.1,o.w/2,o.h/2,0,0,Math.PI*2),e.fill()}e.restore(),e.save();for(const o of this._particles){const d=o.life/o.maxLife*.7;e.globalAlpha=d,e.fillStyle=o.color,e.shadowBlur=6,e.shadowColor=o.color,e.beginPath(),e.arc(o.x,o.y,o.size,0,Math.PI*2),e.fill()}if(e.shadowBlur=0,e.restore(),this.phase!==u.CLOUDS){e.save(),e.globalAlpha=this._logoAlpha;const o=e.createRadialGradient(t/2,this._logoY,0,t/2,this._logoY,250);o.addColorStop(0,"rgba(232,160,32,0.15)"),o.addColorStop(1,"rgba(232,160,32,0)"),e.fillStyle=o,e.fillRect(t/2-300,this._logoY-100,600,200);const d=Math.min(t*.13,80);e.font=`900 ${d}px Cinzel, Georgia, serif`,e.textAlign="center",e.textBaseline="middle",e.shadowBlur=40,e.shadowColor="#c04030",e.fillStyle="#c04030",e.fillText("EMBERVEIL",t/2+2,this._logoY+2),e.shadowBlur=20,e.shadowColor="#e8a020",e.fillStyle="#e8a020",e.fillText("EMBERVEIL",t/2,this._logoY),e.shadowBlur=0,e.fillStyle="#f8d880",e.globalAlpha=this._logoAlpha*.4,e.fillText("EMBERVEIL",t/2,this._logoY-1),e.restore()}}onExit(){h(this._el),this._el=null}destroy(){h(this._el),this._el=null}}const y=document.getElementById("game-canvas"),$=document.getElementById("ui-overlay");function R(){y.width=window.innerWidth,y.height=window.innerHeight}R();window.addEventListener("resize",R);const oe=new q(y,$),G=new V,w=new H(y,$,oe,G);w.push(new re(w,G));let I=0;function B(l){const e=Math.min((l-I)/1e3,.1);I=l,w.update(e),w.draw(),requestAnimationFrame(B)}requestAnimationFrame(B);
