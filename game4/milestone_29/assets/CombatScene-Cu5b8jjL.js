import{D as h,E as x,b as L,S as F}from"./main-DCZ4KuqN.js";import A from"./SkillSystem-CzLFJ7on.js";import T from"./EnemySystem-DO0putKA.js";import{r as P,a as I,c as j}from"./RNG-ziO0lLz6.js";import"./enemies-C0eHlDD_.js";const W={weapon:"might",spell:"intellect",both:"might"},U=new Set(["holy_heal","holy_mass_heal","holy_holy_nova","nature_herbal_remedy","nature_regrowth"]),G=new Set(["holy_divine_shield"]),q=new Set(["nature_summon_wolf","nature_summon_bear","death_raise_skeleton_warrior","death_raise_skeleton_mage","death_raise_skeleton_archer"]),X={nature_summon_wolf:"wolf",nature_summon_bear:"bear",death_raise_skeleton_warrior:"skeleton_warrior",death_raise_skeleton_mage:"skeleton_mage",death_raise_skeleton_archer:"skeleton_archer"},N={execute(t,e,s,a,i,n=1){const o=[];return t.isPassive?(h.warn(`[skill] Attempted to execute passive skill: ${t.id}`),o):(t.isAura&&o.push({type:"aura",source:e.id,skillId:t.id,message:`${e.name} activates ${t.name}.`}),q.has(t.id)?this._handleSummon(t,e,n,o):t.id==="holy_resurrection"?this._handleResurrection(t,e,s,o):t.id==="nature_herbal_remedy"?this._handleHerbalRemedy(t,e,s,a,i,n,o):U.has(t.id)?this._handleHeal(t,e,s,a,i,n,o):G.has(t.id)?this._handleShield(t,e,s,n,o):(t.damageMultiplier&&t.damageMultiplier.length>0&&this._handleDamage(t,e,s,i,n,o),t.applyStatus&&t.applyStatus.length>0&&this._applyStatusesToTargets(t,e,s,o),o))},_handleDamage(t,e,s,a,i,n){const o=this._getMultiplier(t.damageMultiplier,i),r=this._getStatMod(e,t.damageSource??"weapon"),d=this._computeBasePool(e,t.damageSource??"weapon",a),c=Math.round(d*o*(1+r/10)),u=this._resolveDamageType(t);for(const l of s){if(!l.isConscious)continue;const m=this._hasConsumableCrit(l),p=m?Math.round(c*1.5):c;n.push({type:"damage",source:e.id,target:l.id,amount:p,damageType:u,isCrit:m,message:m?`${e.name} uses ${t.name} — CRITICAL! ${p} ${u} damage to ${l.name}.`:`${e.name} uses ${t.name}: ${p} ${u} damage to ${l.name}.`}),m&&n.push({type:"consume_crit_status",target:l.id}),h.event(`[skill] damage; caster=${e.id} target=${l.id} skill=${t.id} mult=${o} statMod=${r} raw=${c} final=${p} type=${u} crit=${m}`)}},_handleHeal(t,e,s,a,i,n,o){if(t.id==="holy_holy_nova")return this._handleHolyNova(t,e,s,a,i,n,o);const r=this._getMultiplier(t.damageMultiplier,n)??1,d=this._getStatModByAttribute(e,"intellect"),c=this._getSpellPower(e),u=Math.round(c*r*(1+d/10));for(const l of s)l.isConscious&&(o.push({type:"heal",source:e.id,target:l.id,amount:u,message:`${e.name} heals ${l.name} for ${u} HP.`}),h.event(`[skill] heal; caster=${e.id} target=${l.id} skill=${t.id} amount=${u}`));return t.applyStatus&&t.applyStatus.length>0&&this._applyStatusesToTargets(t,e,s,o),o},_handleHolyNova(t,e,s,a,i,n,o){const r=this._getMultiplier(t.damageMultiplier,n)??1,d=this._getStatModByAttribute(e,"intellect"),c=this._getSpellPower(e),u=Math.round(c*r*(1+d/10));for(const l of s)l.isConscious&&(l.isPlayer===e.isPlayer?o.push({type:"heal",source:e.id,target:l.id,amount:u,message:`Holy Nova heals ${l.name} for ${u} HP.`}):o.push({type:"damage",source:e.id,target:l.id,amount:u,damageType:"holy",isCrit:!1,message:`Holy Nova deals ${u} holy damage to ${l.name}.`}));return o},_handleHerbalRemedy(t,e,s,a,i,n,o){const r=this._getStatModByAttribute(e,"intellect"),d=this._getSpellPower(e),c=Math.round(d*.3*(1+r/10));for(const u of s){if(!u.isConscious)continue;const l=u.statusEffects?.find(m=>!V.has(m.id));l&&o.push({type:"dispel",source:e.id,target:u.id,removedStatusId:l.id,message:`${e.name} cures ${l.id} from ${u.name}.`}),c>0&&o.push({type:"heal",source:e.id,target:u.id,amount:c,message:`${e.name} restores ${c} HP to ${u.name}.`})}return o},_handleShield(t,e,s,a,i){const n=this._getMultiplier(t.damageMultiplier,a)??1,o=this._getStatModByAttribute(e,"intellect"),r=this._getSpellPower(e),d=Math.round(r*n*(1+o/10));for(const c of s)c.isConscious&&(i.push({type:"shield",source:e.id,target:c.id,amount:d,message:`${e.name} shields ${c.name} for ${d} HP.`}),i.push({type:"status",source:e.id,target:c.id,statusId:"shielded"}),h.event(`[skill] shield; caster=${e.id} target=${c.id} amount=${d}`));return i},_handleSummon(t,e,s,a){const i=X[t.id]??"unknown";return a.push({type:"summon",source:e.id,companionType:i,skillLevel:s,message:`${e.name} summons a ${i.replace(/_/g," ")}.`}),h.event(`[skill] summon; caster=${e.id} type=${i} level=${s}`),a},_handleResurrection(t,e,s,a){for(const i of s)i.isConscious||(a.push({type:"resurrect",source:e.id,target:i.id,hpFraction:.5,message:`${e.name} resurrects ${i.name}!`}),h.event(`[skill] resurrect; caster=${e.id} target=${i.id}`));return a},_applyStatusesToTargets(t,e,s,a){for(const i of s)if(i.isConscious)for(const n of t.applyStatus)a.push({type:"status",source:e.id,target:i.id,statusId:n,message:`${i.name} is afflicted by ${n}.`})},_getMultiplier(t,e){return!t||t.length===0?1:t[Math.min(e-1,t.length-1)]},_attributeMod(t){return Math.floor(((t??10)-10)/2)},_getStatMod(t,e){const s=W[e]??"might";return this._attributeMod(t.attributes?.[s]??10)},_getStatModByAttribute(t,e){return this._attributeMod(t.attributes?.[e]??10)},_computeBasePool(t,e,s){if(e==="weapon"||e==="both"){if(t.weaponDamage)return s.nextInt(t.weaponDamage.min,t.weaponDamage.max);const a=t.equipment?.weapon;if(a?.damage)return s.nextInt(a.damage.min??5,a.damage.max??10);const i=this._attributeMod(t.attributes?.might??10);return Math.max(1,3+i)}return this._getSpellPower(t)},_getSpellPower(t){const e=this._attributeMod(t.attributes?.intellect??10);return Math.max(4,8+e*2)},_resolveDamageType(t){if(t.damageType)return t.damageType;const e=t.id??"";return e.startsWith("frost_")?"frost":e.startsWith("fire_")?"fire":e.startsWith("lightning_")||e.startsWith("storm_")?"lightning":e.startsWith("holy_")?"holy":e.startsWith("nature_")?"nature":e.startsWith("death_")||e.startsWith("death_knight_")?"death":e.startsWith("rune")?"arcane":e.startsWith("spirit_")?"spirit":t.damageSource==="spell"?"magic":"physical"},_hasConsumableCrit(t){return(t.statusEffects??[]).some(e=>e.id==="marked"||e.id==="coup_de_grace")}},V=new Set(["hasted","shielded","regenerating","fortified","blessed","enraged","inspired","invisible","defending","aura_active","concentration"]);typeof window<"u"&&(window.__skillExecutor=N);const $=[{id:"poisoned",name:"Poisoned",description:"Takes poison damage each turn.",icon:"status_poisoned",color:"#44bb44",category:"debuff",damageType:"poison",stackable:!0,maxStacks:10,duration:3,tickDamage:4,combos:[{withStatus:"bleeding",result:"sepsis",removesBoth:!1},{withStatus:"diseased",result:"plague",removesBoth:!1}],visualEffect:"poison_drip",onApply:"sfx_poisoned",onExpire:null},{id:"burning",name:"Burning",description:"On fire. Takes fire damage each turn.",icon:"status_burning",color:"#ff4400",category:"debuff",damageType:"fire",stackable:!0,maxStacks:5,duration:"until_extinguished",tickDamage:3,combos:[{withStatus:"oiled",result:"explosion",removesBoth:!0},{withDamageType:"frost",result:"extinguished",removesBoth:!0}],visualEffect:"flame_particles",onApply:"sfx_burning",onExpire:"sfx_extinguish"},{id:"bleeding",name:"Bleeding",description:"Takes physical damage each turn from blood loss.",icon:"status_bleeding",color:"#cc2222",category:"debuff",damageType:"physical",stackable:!0,maxStacks:5,duration:4,tickDamage:5,combos:[{withStatus:"poisoned",result:"sepsis",removesBoth:!1},{withStatus:"weakened",result:"hemorrhage",removesBoth:!1}],visualEffect:"blood_drip",onApply:"sfx_bleeding",onExpire:null},{id:"diseased",name:"Diseased",description:"All attributes reduced by 2. Max HP temporarily reduced.",icon:"status_diseased",color:"#886600",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"combat",tickDamage:0,statModifiers:{might:-2,agility:-2,intellect:-2,wisdom:-2,endurance:-2,presence:-2},combos:[{withStatus:"poisoned",result:"plague",removesBoth:!1}],visualEffect:"disease_aura",onApply:"sfx_diseased",onExpire:null},{id:"stunned",name:"Stunned",description:"Loses action next turn.",icon:"status_stunned",color:"#ffff00",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,modifiers:{loseAction:!0},combos:[{withStatus:"exposed",result:"coup_de_grace",removesBoth:!1}],visualEffect:"stun_stars",onApply:"sfx_stunned",onExpire:null},{id:"rooted",name:"Rooted",description:"Cannot move. Can still attack and cast.",icon:"status_rooted",color:"#557733",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotMove:!0},combos:[],visualEffect:"root_vines",onApply:"sfx_rooted",onExpire:null},{id:"slowed",name:"Slowed",description:"Movement costs 2, effectively preventing movement at base rate.",icon:"status_slowed",color:"#aabbcc",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{moveCostBonus:1},combos:[],visualEffect:"slow_waves",onApply:"sfx_slowed",onExpire:null},{id:"blinded",name:"Blinded",description:"Accuracy reduced by 40%.",icon:"status_blinded",color:"#dddddd",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{accuracyMult:.6},combos:[],visualEffect:"blind_dots",onApply:"sfx_blinded",onExpire:null},{id:"silenced",name:"Silenced",description:"Cannot use skills. Basic attacks still allowed.",icon:"status_silenced",color:"#bb88bb",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotUseSkills:!0},combos:[],visualEffect:"silence_rune",onApply:"sfx_silenced",onExpire:null},{id:"feared",name:"Feared",description:"Must move away from source. Cannot take offensive actions.",icon:"status_feared",color:"#cc8800",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{forceMoveAway:!0,cannotAttack:!0},combos:[{withStatus:"confused",result:"panic",removesBoth:!1}],visualEffect:"fear_aura",onApply:"sfx_feared",onExpire:null},{id:"charmed",name:"Charmed",description:"Attacks a random ally.",icon:"status_charmed",color:"#ff88cc",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{attackRandomAlly:!0},combos:[],visualEffect:"charm_hearts",onApply:"sfx_charmed",onExpire:null},{id:"confused",name:"Confused",description:"Takes a random action each turn.",icon:"status_confused",color:"#cc44ff",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{randomAction:!0},combos:[{withStatus:"feared",result:"panic",removesBoth:!1}],visualEffect:"confusion_spiral",onApply:"sfx_confused",onExpire:null},{id:"cursed",name:"Cursed",description:"All rolls reduced by 3.",icon:"status_cursed",color:"#441144",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"combat",tickDamage:0,modifiers:{allRollsBonus:-3},combos:[],visualEffect:"curse_runes",onApply:"sfx_cursed",onExpire:null},{id:"exposed",name:"Exposed",description:"Armor reduced by 10 per stack.",icon:"status_exposed",color:"#ffaa44",category:"debuff",damageType:null,stackable:!0,maxStacks:3,duration:2,tickDamage:0,modifiers:{armorBonus:-10},combos:[{withStatus:"stunned",result:"coup_de_grace",removesBoth:!1}],visualEffect:"expose_shatter",onApply:null,onExpire:null},{id:"weakened",name:"Weakened",description:"Damage dealt reduced by 25%.",icon:"status_weakened",color:"#aaaaaa",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{damageMult:.75},combos:[{withStatus:"bleeding",result:"hemorrhage",removesBoth:!1}],visualEffect:"weak_shimmer",onApply:null,onExpire:null},{id:"petrified",name:"Petrified",description:"Cannot move or act. Damage resistance +50%.",icon:"status_petrified",color:"#887766",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotMove:!0,cannotAct:!0,damageResistBonus:.5},combos:[{withDamageType:"fire",result:"statue_crack",removesBoth:!1}],visualEffect:"stone_cracks",onApply:"sfx_petrified",onExpire:null},{id:"terrified",name:"Terrified",description:"Accuracy reduced by 3. Must move away each turn.",icon:"status_terrified",color:"#cc8822",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{allRollsBonus:-3,forceMoveAway:!0},combos:[],visualEffect:"terror_aura",onApply:"sfx_terrified",onExpire:null},{id:"exhausted",name:"Exhausted",description:"No bonus actions. Move cost increased by 1.",icon:"status_exhausted",color:"#996644",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:3,tickDamage:0,modifiers:{noBonusActions:!0,moveCostBonus:1},combos:[],visualEffect:"exhaust_puff",onApply:null,onExpire:null},{id:"electrified",name:"Electrified",description:"Next lightning hit chains to 2 extra targets. Consumed on trigger.",icon:"status_electrified",color:"#ffff44",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{chainOnLightning:2},consumedOnTrigger:!0,combos:[{withDamageType:"lightning",result:"chain_overload",removesBoth:!0}],visualEffect:"electric_sparks",onApply:"sfx_electrified",onExpire:null},{id:"oiled",name:"Oiled",description:"Coated in flammable oil. Fire contact causes explosion.",icon:"status_oiled",color:"#886622",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"until_triggered",tickDamage:0,combos:[{withDamageType:"fire",result:"explosion",removesBoth:!0},{withStatus:"burning",result:"explosion",removesBoth:!0},{withStatus:"wet",result:"diluted",removesBoth:!0}],visualEffect:"oil_sheen",onApply:null,onExpire:null},{id:"wet",name:"Wet",description:"Soaked in water. Interacts with fire, frost, and lightning.",icon:"status_wet",color:"#4488cc",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:3,tickDamage:0,combos:[{withDamageType:"lightning",result:"electrocuted",removesBoth:!0},{withDamageType:"frost",result:"frozen",removesBoth:!0},{withDamageType:"fire",result:"steam",removesBoth:!0},{withStatus:"oiled",result:"diluted",removesBoth:!0}],visualEffect:"water_drip",onApply:null,onExpire:null},{id:"frozen",name:"Frozen",description:"Cannot move or act. Frost damage taken increased by 50%.",icon:"status_frozen",color:"#88ccff",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotMove:!0,cannotAct:!0,frostDamageTakenMult:1.5},combos:[],visualEffect:"ice_shards",onApply:"sfx_frozen",onExpire:"sfx_thaw"},{id:"chilled",name:"Chilled",description:"Agility reduced by 2. Move distance reduced by 1.",icon:"status_chilled",color:"#aaddff",category:"debuff",damageType:null,stackable:!0,maxStacks:2,duration:2,tickDamage:0,modifiers:{agilityBonus:-2,moveDistBonus:-1},combos:[{withStatus:"chilled",result:"frozen",removesBoth:!0}],visualEffect:"frost_breath",onApply:null,onExpire:null},{id:"marked",name:"Marked",description:"Next hit against this target is an automatic critical.",icon:"status_marked",color:"#ff0000",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"until_triggered",tickDamage:0,consumedOnTrigger:!0,combos:[],visualEffect:"mark_rune",onApply:"sfx_marked",onExpire:null},{id:"hasted",name:"Hasted",description:"Gains one extra action per turn.",icon:"status_hasted",color:"#ffee44",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{bonusActions:1},combos:[],visualEffect:"speed_lines",onApply:"sfx_haste",onExpire:null},{id:"shielded",name:"Shielded",description:"Absorbs damage before HP is reduced.",icon:"status_shielded",color:"#44aaff",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:"until_depleted",tickDamage:0,modifiers:{absorbHP:0},combos:[],visualEffect:"magic_shield",onApply:"sfx_shield_up",onExpire:"sfx_shield_break"},{id:"regenerating",name:"Regenerating",description:"Recovers 8 HP per turn.",icon:"status_regenerating",color:"#44ff88",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:4,tickDamage:0,tickHeal:8,combos:[],visualEffect:"regen_glow",onApply:"sfx_regen",onExpire:null},{id:"fortified",name:"Fortified",description:"Armor increased by 20.",icon:"status_fortified",color:"#aaaaaa",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{armorBonus:20},combos:[],visualEffect:"stone_skin",onApply:"sfx_fortify",onExpire:null},{id:"blessed",name:"Blessed",description:"All rolls +2. Holy damage dealt +15%.",icon:"status_blessed",color:"#ffff88",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{allRollsBonus:2,holyDamageMult:1.15},combos:[],visualEffect:"holy_glow",onApply:"sfx_blessed",onExpire:null},{id:"enraged",name:"Enraged",description:"Damage dealt +30%. Armor -15%.",icon:"status_enraged",color:"#ff2200",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:3,tickDamage:0,modifiers:{damageMult:1.3,armorMult:.85},combos:[],visualEffect:"rage_aura",onApply:"sfx_enrage",onExpire:null},{id:"inspired",name:"Inspired",description:"All rolls +2.",icon:"status_inspired",color:"#88ffcc",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:3,tickDamage:0,modifiers:{allRollsBonus:2},combos:[],visualEffect:"inspire_notes",onApply:"sfx_inspired",onExpire:null},{id:"invisible",name:"Invisible",description:"Cannot be targeted until attacking or taking damage.",icon:"status_invisible",color:"#cccccc",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:"until_broken",tickDamage:0,modifiers:{untargetable:!0},combos:[],visualEffect:"fade_shimmer",onApply:"sfx_invisible",onExpire:"sfx_reveal"},{id:"defending",name:"Defending",description:"Block chance +40%. Active until next turn.",icon:"status_defending",color:"#88aaff",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,modifiers:{blockChanceBonus:.4},combos:[],visualEffect:null,onApply:null,onExpire:null},{id:"sepsis",name:"Sepsis",description:"Bleeding and Poison tick at double speed.",icon:"status_sepsis",color:"#668844",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"combat",tickDamage:0,modifiers:{dotTickMult:2},combos:[],visualEffect:"sepsis_veins",onApply:"sfx_sepsis",onExpire:null},{id:"explosion",name:"Explosion",description:"Explosive fire burst. Deals fire damage to target and adjacent enemies.",icon:"status_explosion",color:"#ff6600",category:"neutral",damageType:"fire",stackable:!1,maxStacks:1,duration:0,tickDamage:0,instantEffect:{type:"aoe_damage",damageMult:2,adjacentMult:1,damageType:"fire"},combos:[],visualEffect:"explosion_burst",onApply:"sfx_explosion",onExpire:null},{id:"electrocuted",name:"Electrocuted",description:"Stunned 1 turn. Double lightning damage taken.",icon:"status_electrocuted",color:"#ffff00",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,modifiers:{loseAction:!0,lightningDamageTakenMult:2},combos:[],visualEffect:"electrocute_arc",onApply:"sfx_electrocuted",onExpire:null},{id:"steam",name:"Steam",description:"Steam cloud deals minor AoE damage. Prevents Frozen this turn.",icon:"status_steam",color:"#ddddff",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,instantEffect:{type:"aoe_damage",damageMult:.3,damageType:"fire",radius:1},modifiers:{immuneToFrozen:!0},combos:[],visualEffect:"steam_cloud",onApply:"sfx_steam",onExpire:null},{id:"extinguished",name:"Extinguished",description:"Fire put out by frost. No additional effect.",icon:"status_extinguished",color:"#888888",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:0,tickDamage:0,combos:[],visualEffect:"steam_puff",onApply:"sfx_extinguish",onExpire:null},{id:"diluted",name:"Diluted",description:"Oil washed away. Neither oil nor water applies full effect.",icon:"status_diluted",color:"#886644",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,combos:[],visualEffect:"muddy_splash",onApply:null,onExpire:null},{id:"hemorrhage",name:"Hemorrhage",description:"Bleeding damage increased by 50% while Weakened.",icon:"status_hemorrhage",color:"#991111",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"combat",tickDamage:0,modifiers:{bleedingDamageMult:1.5},combos:[],visualEffect:"hemorrhage_burst",onApply:"sfx_hemorrhage",onExpire:null},{id:"coup_de_grace",name:"Coup de Grace",description:"Next hit vs this target is an automatic critical. Consumed on hit.",icon:"status_coup_de_grace",color:"#ff0088",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"until_triggered",tickDamage:0,consumedOnTrigger:!0,combos:[],visualEffect:"coup_mark",onApply:null,onExpire:null},{id:"plague",name:"Plague",description:"Disease spreads to one adjacent enemy immediately.",icon:"status_plague",color:"#336622",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:0,tickDamage:0,instantEffect:{type:"spread_status",statusId:"diseased",targetType:"adjacent_enemy"},combos:[],visualEffect:"plague_cloud",onApply:"sfx_plague",onExpire:null},{id:"panic",name:"Panic",description:"Flees to random edge tile. No actions for 2 turns.",icon:"status_panic",color:"#ff8800",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotAct:!0,forceFlee:!0},instantEffect:{type:"flee_to_edge"},combos:[],visualEffect:"panic_dash",onApply:"sfx_panic",onExpire:null},{id:"statue_crack",name:"Statue Crack",description:"Petrification shattered by fire. Takes 1.5x physical damage.",icon:"status_statue_crack",color:"#cc8844",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{physicalDamageTakenMult:1.5},combos:[],visualEffect:"stone_crack",onApply:"sfx_crack",onExpire:null},{id:"chain_overload",name:"Chain Overload",description:"Lightning hit chains to 2 extra targets.",icon:"status_chain_overload",color:"#ffff00",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:0,tickDamage:0,instantEffect:{type:"chain_lightning",chainCount:2},combos:[],visualEffect:"chain_arc",onApply:"sfx_chain_lightning",onExpire:null}],y=["spring","summer","autumn","winter"],v={spring:["clear","cloudy","rainy","windy"],summer:["clear","clear","hot","stormy"],autumn:["clear","cloudy","rainy","foggy"],winter:["clear","snow","blizzard","frozen"]},D=90,Y={clear:1,cloudy:1,rainy:.9,windy:.9,hot:1,stormy:.75,foggy:1,snow:.9,blizzard:.75,frozen:.9},K={clear:0,cloudy:0,rainy:0,windy:0,hot:0,stormy:-1,foggy:0,snow:0,blizzard:-1,frozen:0},k={_season:"spring",_weather:"clear",_intensity:.5,_initialized:!1,init(t=1){const e=Math.floor((t-1)/D)%y.length;this._season=y[e];const s=v[this._season],a=t%s.length;this._weather=s[a],this._intensity=.5,this._initialized=!0,h.info(`[weather] WeatherSystem initialized; day=${t} season=${this._season} weather=${this._weather}`)},getCurrentWeather(){return{season:this._season,weather:this._weather,intensity:this._intensity}},advance(t,e){this._initialized||this.init(e??1);const s=this._season,a=this._weather;if(e!==void 0){const n=Math.floor((e-1)/D)%y.length;this._season=y[n]}const i=v[this._season];Math.random()<.6&&(this._weather=i[Math.floor(Math.random()*i.length)],this._intensity=Math.random()),this._season!==s&&(h.info(`[weather] Season changed: ${s} → ${this._season}`),x.emit("season:changed",{season:this._season,prevSeason:s}),this._weather=i[Math.floor(Math.random()*i.length)],this._intensity=Math.random()),this._weather!==a&&(h.event(`[weather] Weather changed: ${a} → ${this._weather}; season=${this._season} intensity=${this._intensity.toFixed(2)}`),x.emit("weather:changed",this.getCurrentWeather()))},setWeather(t,e=.5){const s=[...new Set(Object.values(v).flat())];if(!s.includes(t)){const a=`Unknown weather type "${t}". Valid: ${s.join(", ")}`;return h.warn(`[weather] ${a}`),a}return this._weather=t,this._intensity=Math.max(0,Math.min(1,e)),h.info(`[weather] setWeather → ${t} (intensity=${this._intensity.toFixed(2)})`),x.emit("weather:changed",this.getCurrentWeather()),`Weather set to ${t}`},setSeason(t){if(!y.includes(t)){const a=`Unknown season "${t}". Valid: ${y.join(", ")}`;return h.warn(`[weather] ${a}`),a}const e=this._season;this._season=t;const s=v[t];return this._weather=s[Math.floor(Math.random()*s.length)],this._intensity=Math.random(),h.info(`[weather] setSeason → ${t}`),t!==e&&x.emit("season:changed",{season:t,prevSeason:e}),x.emit("weather:changed",this.getCurrentWeather()),`Season set to ${t}`},getMoveSpeedModifier(){return Y[this._weather]??1},getVisibilityModifier(){return K[this._weather]??0},isHot(){return this._weather==="hot"},isFoggy(){return this._weather==="foggy"},isBlizzard(){return this._weather==="blizzard"},isStorm(){return this._weather==="stormy"},getLabel(){const t=e=>e.charAt(0).toUpperCase()+e.slice(1);return`${t(this._season)} — ${t(this._weather)}`}};typeof window<"u"&&(window.__debug=window.__debug??{},window.__debug.setweather=t=>{const e=k.setWeather(t);return console.info(`[debug] setweather → ${e}`),e},window.__debug.setSeason=t=>{const e=k.setSeason(t);return console.info(`[debug] setSeason → ${e}`),e},window.__debug.getWeather=()=>k.getCurrentWeather(),window.__weatherSystem=k);const J=8,C=4,Q=[0,1,2,3],Z=[4,5,6,7];function _(t,e,s,a){return Math.max(Math.abs(t-s),Math.abs(e-a))}function w(t){return Math.floor((t-10)/2)}const f={_state:null,_rng:null,_log:[],_subscribers:[],subscribe(t){return this._subscribers.push(t),()=>{this._subscribers=this._subscribers.filter(e=>e!==t)}},_emit(t,e={}){for(const s of this._subscribers)try{s(t,e)}catch{}},startCombat(t,e,s={}){const a=s.seed??Date.now();this._rng=j(a),this._log=[];const i=new Map,n=t.filter(m=>!m.isCompanion),o=t.filter(m=>m.isCompanion);n.forEach((m,p)=>{const g=this._wrapCharacter(m,p);g.col=Math.min(p,3),g.row=Math.floor(p/4),i.set(g.id,g)}),o.forEach((m,p)=>{const g=n.length+p,b=this._wrapCompanion(m,g);b.col=Math.min(g%4,3),b.row=Math.floor(g/4)%C,i.set(b.id,b)}),e.forEach((m,p)=>{const g=this._wrapEnemy(m);g.col=4+p%4,g.row=Math.floor(p/4)%C,i.set(g.id,g)});const r=this._rollInitiative([...i.values()]),d=(()=>{try{return k.getCurrentWeather()}catch{return null}})(),c=d?.weather==="blizzard",u=d?.weather==="stormy",l=d?.weather==="foggy";return d&&h.info(`[combat] Weather at combat start: ${d.weather} (season=${d.season}); blizzard=${c} storm=${u} foggy=${l}`),this._state={id:`combat_${Date.now()}`,active:!0,round:1,turnIndex:0,turnOrder:r,combatants:i,environment:s.environment??"forest",regionLevel:s.regionLevel??1,phase:"player_turn",actionTaken:!1,moveTaken:!1,seed:a,weatherBlizzard:c,weatherStorm:u,weatherFoggy:l},this._updatePhase(),this.log(`Combat started — ${t.length} heroes vs ${e.length} enemies`,"system"),h.info(`[combat] startCombat; party=${t.length} enemies=${e.length} seed=${a}`),this._emit("combat:start",{state:this._state}),this._state},getState(){return this._state},isActive(){return this._state?.active===!0},getCurrentCombatant(){if(!this._state)return null;const t=this._state.turnOrder[this._state.turnIndex];return this._state.combatants.get(t)??null},executeMove(t,e){if(!this._canAct())return{success:!1,message:"Cannot act now."};const s=this.getCurrentCombatant();if(!s)return{success:!1,message:"No active combatant."};if(this._state.moveTaken)return{success:!1,message:"Already moved this turn."};if(t<0||t>=J||e<0||e>=C)return{success:!1,message:"Out of bounds."};if(!(s.isPlayer?Q:Z).includes(t))return{success:!1,message:"Cannot move to that column."};if(this._getTileOccupant(t,e))return{success:!1,message:"Tile occupied."};const i=s.col,n=s.row;return s.col=t,s.row=e,this._state.moveTaken=!0,this._state.weatherBlizzard&&(this._state.actionTaken=!0,this.log(`${s.name} struggles through the blizzard — no action remaining.`,"weather")),this.log(`${s.name} moves (${i},${n}) -> (${t},${e})`,"move"),this._emit("combat:move",{combatantId:s.id,from:{col:i,row:n},to:{col:t,row:e}}),{success:!0,message:"Moved.",events:[{type:"move",id:s.id}]}},executeAttack(t){if(!this._canAct())return{success:!1,message:"Cannot act now."};if(this._state.actionTaken)return{success:!1,message:"Action already taken this turn."};const e=this.getCurrentCombatant();if(!e)return{success:!1,message:"No active combatant."};const s=this._state.combatants.get(t);if(!s)return{success:!1,message:"Target not found."};if(!s.isConscious)return{success:!1,message:"Target is already down."};if(e.isPlayer===s.isPlayer)return{success:!1,message:"Cannot attack ally."};const a=this._resolveAttack(e,s);this._state.actionTaken=!0,this._emit("combat:attack",{attackerId:e.id,targetId:t,result:a});const i={col:s.col,row:s.row};if(a.outcome==="miss"||a.outcome==="dodge")this._emit("combat:miss",{target:s,targetId:t,position:i});else{const n=a.outcome==="crit";this._emit("combat:hit",{target:s,targetId:t,damage:a.damage,isCrit:n,position:i})}return this._checkCombatEndInternal(),{...a,success:!0}},executeSkill(t,e,s=null){if(!this._canAct())return{success:!1,message:"Cannot act now."};if(this._state.actionTaken)return{success:!1,message:"Action already taken."};const a=this.getCurrentCombatant();if(!a)return{success:!1,message:"No active combatant."};const i=A.getSkillById(t,e);if(!i)return{success:!1,message:"Unknown skill."};const n=a.skills?.[t]?.[e]??1,o=i.manaCost??0;if(a.mana<o)return{success:!1,message:"Not enough mana."};if((a.skillCooldowns[e]??0)>0)return{success:!1,message:`Skill on cooldown (${a.skillCooldowns[e]} turns).`};if(i.isPassive)return{success:!1,message:"Passive skills cannot be activated."};a.mana=Math.max(0,a.mana-o),(i.cooldown??0)>0&&(a.skillCooldowns[e]=i.cooldown);const r=this._resolveSkillTargets(i,a,s),d=r.map(l=>this._state.combatants.get(l)).filter(l=>l!=null),c=N.execute(i,a,d,this.getState(),this._rng,n),u=[];for(const l of c)switch(l.type){case"damage":{const m=this._state.combatants.get(l.target);if(m&&m.isConscious){const p=this._applyResistance(l.amount,l.damageType??"physical",m);m.hp=Math.max(0,m.hp-p),m.hp===0&&this._makeUnconscious(m),this.log(l.message??`${a.name} deals ${p} dmg to ${m.name}.`,"skill"),u.push({type:"damage",targetId:l.target,amount:p,damageType:l.damageType,isCrit:l.isCrit})}break}case"heal":{const m=this._state.combatants.get(l.target);m&&m.isConscious&&(m.hp=Math.min(m.maxHP,m.hp+l.amount),this.log(l.message??`${m.name} recovers ${l.amount} HP.`,"skill"),u.push({type:"heal",targetId:l.target,amount:l.amount}),this._emit("combat:heal",{target:m,targetId:l.target,amount:l.amount,position:{col:m.col,row:m.row}}));break}case"shield":{const m=this._state.combatants.get(l.target);m&&m.isConscious&&(m.shieldHP=(m.shieldHP??0)+l.amount,this.log(l.message??`${m.name} gains a ${l.amount} HP shield.`,"skill"),u.push({type:"shield",targetId:l.target,amount:l.amount}));break}case"status":{const m=this._state.combatants.get(l.target);m&&(this.applyStatus(m,l.statusId,l.source),u.push({type:"status",targetId:l.target,statusId:l.statusId}),this._emit("combat:status",{target:m,targetId:l.target,statusId:l.statusId,statusName:l.statusId,position:{col:m.col,row:m.row}}));break}case"consume_crit_status":{const m=this._state.combatants.get(l.target);m&&(m.statusEffects=m.statusEffects.filter(p=>p.id!=="marked"&&p.id!=="coup_de_grace"));break}case"summon":{this.log(l.message??`${a.name} summons a ${l.companionType}.`,"skill"),u.push({type:"summon",casterId:a.id,companionType:l.companionType,skillLevel:l.skillLevel});break}case"resurrect":{const m=this._state.combatants.get(l.target);m&&!m.isConscious&&(m.isConscious=!0,m.hp=Math.max(1,Math.floor(m.maxHP*(l.hpFraction??.5))),this.log(l.message??`${m.name} is resurrected!`,"skill"),u.push({type:"resurrect",targetId:l.target}));break}case"dispel":{const m=this._state.combatants.get(l.target);m&&(m.statusEffects=m.statusEffects.filter(p=>p.id!==l.removedStatusId),this.log(l.message??`${m.name}: ${l.removedStatusId} dispelled.`,"skill"),u.push({type:"dispel",targetId:l.target,statusId:l.removedStatusId}));break}case"aura":{a.activeAura=l.skillId,this.log(l.message??`${a.name} activates aura: ${i.name}.`,"skill"),u.push({type:"aura",casterId:a.id,skillId:l.skillId});break}}return i.isAura&&!c.some(l=>l.type==="aura")&&(a.activeAura=e,this.log(`${a.name} activates aura: ${i.name}`,"skill")),this._state.actionTaken=!0,this._emit("combat:skill",{casterId:a.id,skillId:e,treeId:t,targetIds:r,events:u}),this._checkCombatEndInternal(),{success:!0,message:`Used ${i.name}.`,events:u}},executeDefend(){if(!this._canAct())return{success:!1,message:"Cannot act now."};if(this._state.actionTaken)return{success:!1,message:"Action already taken."};const t=this.getCurrentCombatant();return t?(t.isDefending=!0,this._state.actionTaken=!0,this.log(`${t.name} takes a defensive stance.`,"action"),this._emit("combat:defend",{combatantId:t.id}),{success:!0,message:"Defending."}):{success:!1,message:"No active combatant."}},executePass(){if(!this._canAct())return{success:!1,message:"Cannot act now."};const t=this.getCurrentCombatant();return t?(this._state.actionTaken=!0,this.log(`${t.name} passes.`,"action"),this._emit("combat:pass",{combatantId:t.id}),{success:!0,message:"Passed."}):{success:!1,message:"No active combatant."}},nextTurn(){if(!this._state?.active)return null;const t=this.getCurrentCombatant();if(t){for(const a of Object.keys(t.skillCooldowns))t.skillCooldowns[a]=Math.max(0,t.skillCooldowns[a]-1);t.isDefending=!1}this._state.turnIndex=(this._state.turnIndex+1)%this._state.turnOrder.length;let e=0;for(;e<32;){const a=this.getCurrentCombatant();if(a&&a.isConscious)break;this._state.turnIndex=(this._state.turnIndex+1)%this._state.turnOrder.length,e++}this._state.turnIndex===0&&(this._state.round++,this.log(`--- Round ${this._state.round} ---`,"system"),this._emit("combat:new_round",{round:this._state.round})),this._state.actionTaken=!1,this._state.moveTaken=!1;const s=this.getCurrentCombatant();return s&&this.processTurnStart(s),this._updatePhase(),this._emit("combat:turn_start",{combatantId:s?.id}),s},checkCombatEnd(){if(!this._state)return{over:!1,winner:null};const t=[...this._state.combatants.values()].filter(i=>i.isPlayer),e=[...this._state.combatants.values()].filter(i=>!i.isPlayer),s=t.some(i=>i.isConscious),a=e.some(i=>i.isConscious);return s?a?{over:!1,winner:null}:{over:!0,winner:"party"}:{over:!0,winner:"enemies"}},endCombat(){if(!this._state)return{xp:0,loot:[],levelUps:[]};const t=this._state;t.active=!1;const e=[...t.combatants.values()].filter(r=>!r.isPlayer&&!r.isConscious);let s=e.reduce((r,d)=>r+(d.xpReward??10),0);const a=[];for(const r of e){const d=T.rollLoot(r,this._rng);a.push(...d.items)}const i=[...t.combatants.values()].filter(r=>r.isPlayer&&r.isConscious),n=i.length>0?Math.floor(s/i.length):0,o=[];for(const r of i)if(r.sourceChar){const d=r.sourceChar.level;L.grantXP(r.sourceChar,n),r.sourceChar.level>(r.startLevel??d)&&o.push({charId:r.id,name:r.name,newLevel:r.sourceChar.level})}n>0&&this._emit("combat:xp",{amount:n,survivors:i.map(r=>({id:r.id,name:r.name,col:r.col,row:r.row}))});for(const r of o){const d=i.find(u=>u.id===r.charId),c=d?{col:d.col,row:d.row}:null;this._emit("character:levelup",{char:r,charId:r.charId,name:r.name,newLevel:r.newLevel,position:c})}return this.log(`Combat ended — ${i.length} survivors, ${n} XP each`,"system"),h.info(`[combat] endCombat; xp=${n} loot=${a.length} levelUps=${o.length}`),this._emit("combat:end",{winner:this.checkCombatEnd().winner,xp:n,loot:a,levelUps:o}),this._state=null,{xp:n,loot:a,levelUps:o}},applyStatus(t,e,s=null){const a=$.find(n=>n.id===e);if(!a)return;const i=t.statusEffects.find(n=>n.id===e);i?(a.stackable&&i.stacks<(a.maxStacks??10)&&i.stacks++,i.duration=a.duration??3):t.statusEffects.push({id:e,duration:a.duration??3,sourceId:s,stacks:1}),this._checkStatusCombos(t),this.log(`${t.name} is affected by ${a.name}`,"status")},processTurnStart(t){const e=[];for(const s of t.statusEffects){const a=$.find(i=>i.id===s.id);if(!a){e.push(s.id);continue}if(a.tickHeal&&t.isConscious){const i=a.tickHeal;t.hp=Math.min(t.maxHP,t.hp+i),this.log(`${t.name} regenerates ${i} HP from ${a.name}`,"status")}if(a.tickDamage&&t.isConscious){const i=a.tickDamage*(s.stacks??1);t.hp=Math.max(0,t.hp-i),t.hp===0&&this._makeUnconscious(t),this.log(`${t.name} takes ${i} ${a.damageType??""} dmg from ${a.name}`,"status")}typeof s.duration=="number"&&(s.duration--,s.duration<=0&&(e.push(s.id),this.log(`${t.name}: ${a.name} expired`,"status")))}t.statusEffects=t.statusEffects.filter(s=>!e.includes(s.id))},log(t,e="combat"){const s={message:t,category:e,timestamp:Date.now(),round:this._state?.round??0};this._log.push(s),this._log.length>200&&this._log.shift(),h.event(`[${e}] ${t}`),this._emit("combat:log",s)},getLog(t=20){return this._log.slice(-t)},executeEnemyTurn(t){const e=t.aiProfile??"aggressive";if(t.isCompanion){this._executeCompanionTurn(t);return}const s=[...this._state.combatants.values()].filter(o=>o.isPlayer&&o.isConscious);if(!s.length){this.executePass();return}let a=s.reduce((o,r)=>{const d=_(t.col,t.row,r.col,r.row),c=_(t.col,t.row,o.col,o.row);return d<c?r:o});e==="aggressive"&&(a=s.reduce((o,r)=>o.hp<r.hp?o:r));const i=_(t.col,t.row,a.col,a.row);if(!this._state.moveTaken&&i>1){const o=Math.sign(a.col-t.col),r=Math.sign(a.row-t.row),d=t.col+o,c=t.row+r;this._getTileOccupant(d,c)||this.executeMove(d,c)}_(t.col,t.row,a.col,a.row)<=2&&!this._state.actionTaken?this.executeAttack(a.id):this._state.actionTaken||this.executePass()},_executeCompanionTurn(t){const e=[...this._state.combatants.values()].filter(n=>!n.isPlayer&&n.isConscious);if(!e.length){this.executePass();return}const s=e.reduce((n,o)=>{const r=_(t.col,t.row,o.col,o.row),d=_(t.col,t.row,n.col,n.row);return r<d?o:n}),a=_(t.col,t.row,s.col,s.row);if(!this._state.moveTaken&&a>1){const n=Math.sign(s.col-t.col),o=Math.sign(s.row-t.row),r=t.col+n,d=t.row+o;this._getTileOccupant(r,d)||this.executeMove(r,d)}_(t.col,t.row,s.col,s.row)<=1&&!this._state.actionTaken?this.executeAttack(s.id):this._state.actionTaken||this.executePass()},_wrapCharacter(t,e){return{id:t.id,name:t.name,isPlayer:!0,playerId:e+1,col:0,row:0,hp:t.hp??t.maxHP,maxHP:t.maxHP,mana:t.mana??t.maxMana,maxMana:t.maxMana,statusEffects:[],isDefending:!1,isConscious:(t.hp??t.maxHP)>0,initiative:0,attributes:{...t.attributes},equipment:t.equipment??{},skills:t.skills??{},skillTrees:t.skillTrees??[],skillCooldowns:{},startLevel:t.level,xpReward:0,loot:[],sourceChar:t}},_wrapEnemy(t){return{id:t.id,name:t.name,isPlayer:!1,isEnemy:!0,playerId:null,col:0,row:0,hp:t.hp??t.maxHP,maxHP:t.maxHP??t.hp,mana:t.mana??0,maxMana:t.maxMana??0,statusEffects:[],isDefending:!1,isConscious:!0,initiative:0,attributes:{...t.attributes},equipment:{},skills:{},skillTrees:[],skillCooldowns:{},xpReward:t.xpReward??10,loot:t.loot??[],aiProfile:t.aiProfile??"aggressive",weaponDamage:t.weaponDamage??{min:5,max:9},armor:t.armor??0,sourceChar:null}},_wrapCompanion(t,e){return{id:t.id,name:t.name,isPlayer:!0,isCompanion:!0,playerId:null,col:0,row:0,hp:t.hp??t.maxHP,maxHP:t.maxHP??t.hp,mana:0,maxMana:0,statusEffects:[],isDefending:!1,isConscious:(t.hp??t.maxHP)>0,initiative:0,attributes:{...t.attributes??{might:12,agility:12,intellect:8,wisdom:8,endurance:12,presence:8}},equipment:{},skills:t.inheritedSkills??{},skillTrees:t.inheritedSkillTrees??[],skillCooldowns:{},xpReward:0,loot:[],aiProfile:t.aiProfile??"companion",weaponDamage:t.weaponDamage??{min:4,max:8},armor:t.armor??0,sourceChar:t.sourceChar??null,summonerId:t.summonerId??null}},_rollInitiative(t){const e=this._rng,s=this._state?.weatherFoggy??!1,a=t.map(n=>{const o=w(n.attributes?.agility??10);let r=I(e)+o;return s&&!n.isPlayer&&(r=Math.round(r*1.15)),n.initiative=r,{id:n.id,roll:r}});a.sort((n,o)=>o.roll-n.roll||n.id.localeCompare(o.id));const i=a.map(n=>`${this._state?.combatants?.get(n.id)?.name??n.id}(${n.roll})`).join(", ");return h.event(`[combat] Initiative: ${i}`),a.map(n=>n.id)},_resolveAttack(t,e){const s=this._rng,a=w(t.attributes?.agility??10),i=w(e.attributes?.agility??10),n=I(s)+a,o=10+i+(e.armor??0)+(e.isDefending?3:0),r=t.attackType==="ranged"||_(t.col,t.row,e.col,e.row)>2;if(this._state?.weatherStorm&&r&&Math.random()<.2)return this.log(`${t.name}'s ranged attack on ${e.name} is blown off course by the storm! (miss)`,"weather"),{outcome:"miss",roll:n,dc:o,damage:0,targetId:e.id};let c,u;n>=o+10?(c="crit",u=1.5):n>=o?(c="hit",u=1):n>=o-5?(c="glancing",u=.5):(c="miss",u=0);const l=e.armor??0,m=Math.max(1,this._getBaseDamage(t)-l),p=Math.max(u>0?1:0,Math.round(m*u)),g=this._applyResistance(p,"physical",e);g>0&&(e.hp=Math.max(0,e.hp-g),e.hp===0&&this._makeUnconscious(e));const b=c==="miss"?`${t.name} attacks ${e.name}: roll=${n} dc=${o} -> Miss`:`${t.name} attacks ${e.name}: roll=${n} dc=${o} -> ${c}! ${g} dmg`;return this.log(b,"attack"),{outcome:c,roll:n,dc:o,damage:g,targetId:e.id}},_getBaseDamage(t){const e=w(t.attributes?.might??10);if(t.weaponDamage)return P(this._rng,t.weaponDamage.min,t.weaponDamage.max)+e;const s=t.equipment?.weapon;return s?.damage?P(this._rng,s.damage.min??5,s.damage.max??10)+e:Math.max(1,3+e)},getDamageRange(t,e){const s=w(t.attributes?.might??10),a=e.armor??0;let i,n;if(t.weaponDamage)i=t.weaponDamage.min,n=t.weaponDamage.max;else{const o=t.equipment?.weapon;o?.damage?(i=o.damage.min??5,n=o.damage.max??10):(i=Math.max(1,3+s),n=Math.max(1,3+s))}return{min:Math.max(1,i+s-a),max:Math.max(1,n+s-a)}},_applyResistance(t,e,s){return Math.max(0,t)},_resolveSkillTargets(t,e,s){const a=this._state,i=A.getAoEShape(t);if(t.targetingType==="self")return[e.id];if(t.targetingType==="aoe_all_enemies")return[...a.combatants.values()].filter(r=>r.isPlayer!==e.isPlayer&&r.isConscious).map(r=>r.id);if(t.targetingType==="aoe_all_allies")return[...a.combatants.values()].filter(r=>r.isPlayer===e.isPlayer&&r.isConscious&&r.id!==e.id).map(r=>r.id);if(!s)return[];if(!i||i.length===0)return[s];const n=a.combatants.get(s);if(!n)return[s];const o=new Set([s]);for(const{dx:r,dy:d}of i){if(r===0&&d===0)continue;const c=n.col+r,u=n.row+d,l=this._getTileOccupant(c,u);l&&l.isConscious&&l.isPlayer!==e.isPlayer&&o.add(l.id)}return[...o]},_getTileOccupant(t,e){if(!this._state)return null;for(const s of this._state.combatants.values())if(s.col===t&&s.row===e&&s.isConscious)return s;return null},_makeUnconscious(t){t.isConscious=!1,t.hp=0,this.log(`${t.name} is defeated!`,"death"),this._emit("combat:defeated",{combatantId:t.id})},_checkStatusCombos(t){const e=new Set(t.statusEffects.map(s=>s.id));for(const s of[...t.statusEffects]){const a=$.find(i=>i.id===s.id);if(a?.combos){for(const i of a.combos)if(i.withStatus&&e.has(i.withStatus)){this.log(`${t.name}: ${i.result} combo triggered!`,"combo"),i.removesBoth&&(t.statusEffects=t.statusEffects.filter(n=>n.id!==s.id&&n.id!==i.withStatus)),this.applyStatus(t,i.result,null);break}}}},_updatePhase(){if(!this._state)return;const t=this.getCurrentCombatant();this._state.phase=t?.isPlayer?"player_turn":"enemy_turn"},_canAct(){return this._state?.active===!0&&!this._state.phase?.includes("resolution")},_checkCombatEndInternal(){const{over:t,winner:e}=this.checkCombatEnd();t&&(this._state.active=!1,this._state.phase=e==="party"?"victory":"defeat",this.log(e==="party"?"Victory!":"Defeat...","system"),this._emit("combat:over",{winner:e}))}};typeof window<"u"&&(window.__combatSystem=f);const z={_container:null,_ensureContainer(){if(this._container&&document.contains(this._container))return this._container;const t=document.getElementById("floating-text-layer");if(t)return this._container=t,this._container;const e=document.createElement("div");e.id="floating-text-layer",e.className="floating-text-container",e.style.cssText=["position:fixed","inset:0","pointer-events:none","z-index:500","overflow:hidden"].join(";");const s=document.getElementById("ui-overlay");return s?s.appendChild(e):document.body.appendChild(e),this._container=e,e},spawn(t,e,s,a="damage"){try{const i=this._ensureContainer(),n=document.createElement("div"),r={damage:"ft-damage",heal:"ft-heal",miss:"ft-miss",crit:"ft-crit",status:"ft-status",xp:"ft-xp"}[a]??"ft-damage";n.className=`floating-text ${r}`,n.textContent=s;const d=(Math.random()-.5)*20;n.style.cssText=["position:absolute",`left:${Math.round(t+d)}px`,`top:${Math.round(e)}px`,"transform:translateX(-50%)","pointer-events:none","white-space:nowrap","z-index:10"].join(";"),i.appendChild(n),n.addEventListener("animationend",()=>{n.remove()},{once:!0}),setTimeout(()=>{n.parentNode&&n.remove()},1600)}catch(i){h.warn(`[combat] FloatingText.spawn error: ${i.message}`)}}};typeof window<"u"&&(window.FloatingText=z);const S={_unsubscribe:null,_entriesEl:null,_entryCount:0,MAX_ENTRIES:100,init(){this._unsubscribe?.(),this._unsubscribe=null,this._entriesEl=document.getElementById("combat-log-entries"),this._entryCount=0,this._unsubscribe=f.subscribe((s,a)=>{this._onCombatEvent(s,a)});const t=document.getElementById("combat-log-title"),e=document.getElementById("combat-log");t&&e&&(t.style.cursor="pointer",t.title="Click to collapse/expand",t.addEventListener("click",()=>{e.classList.toggle("collapsed")})),h.info("[combat] CombatLog initialised")},destroy(){this._unsubscribe?.(),this._unsubscribe=null,this._entriesEl=null,this._entryCount=0},_onCombatEvent(t,e){let s=null,a="default";switch(t){case"combat:start":s="Combat begins!",a="system";break;case"combat:turn_start":{const i=f.getState?.();if(i?.combatants){const n=i.combatants instanceof Map?i.combatants.get(e.combatantId):i.combatants[e.combatantId];n&&(s=`${n.name}'s turn`,a=(n.isPlayer,"default"))}break}case"combat:new_round":s=`— Round ${e.round} —`,a="system";break;case"combat:log":s=e.message,a=e.category??"default";break;case"combat:attack":{const i=e.result??{},n=f.getState?.();let o=e.attackerId,r=e.targetId;if(n?.combatants){const d=n.combatants,c=u=>d instanceof Map?d.get(u):d[u];o=c(e.attackerId)?.name??e.attackerId,r=c(e.targetId)?.name??e.targetId}i.outcome==="miss"?(s=`${o} attacks ${r} — MISS`,a="miss"):i.outcome==="crit"?(s=`${o} attacks ${r} — CRITICAL! ${i.damage} dmg`,a="crit"):(s=`${o} attacks ${r} for ${i.damage} damage`,a="attack");break}case"combat:skill":{const i=f.getState?.();let n=e.casterId;if(i?.combatants){const c=i.combatants;n=(c instanceof Map?c.get(e.casterId):c[e.casterId])?.name??e.casterId}const o=(e.events??[]).filter(c=>c.type==="damage"),r=(e.events??[]).filter(c=>c.type==="heal"),d=(e.events??[]).filter(c=>c.type==="status");if(o.length>0){const c=o.reduce((l,m)=>l+(m.amount??0),0),u=o.some(l=>l.isCrit);s=u?`${n} uses ${e.skillId} — CRITICAL! ${c} dmg`:`${n} uses ${e.skillId} for ${c} damage`,a=u?"crit":"skill"}else if(r.length>0){const c=r.reduce((u,l)=>u+(l.amount??0),0);s=`${n} uses ${e.skillId}, restoring ${c} HP`,a="heal"}else d.length>0?(s=`${n} uses ${e.skillId} — ${d.map(c=>c.statusId).join(", ")}`,a="status"):(s=`${n} uses ${e.skillId}`,a="skill");break}case"combat:hit":{const i=f.getState?.();let n=e.target?.name??e.targetId??"target";if(!e.target?.name&&i?.combatants){const o=i.combatants;n=(o instanceof Map?o.get(e.targetId):o[e.targetId])?.name??n}e.isCrit?(s=`Critical hit on ${n} for ${e.damage} dmg!`,a="crit"):(s=`Hit ${n} for ${e.damage} dmg`,a="attack");break}case"combat:miss":{s=`Missed ${e.target?.name??e.targetId??"target"}`,a="miss";break}case"combat:heal":{s=`${e.target?.name??e.targetId??"target"} restored ${e.amount} HP`,a="heal";break}case"combat:status":{s=`${e.target?.name??e.targetId??"target"}: ${e.statusName??e.statusId??"status applied"}`,a="status";break}case"combat:xp":s=`+${e.amount} XP`,a="xp";break;case"combat:end":s=e.winner==="party"?"Victory!":"Defeated...",a="system";break;default:return}s&&this._append(s,a)},_append(t,e){if(this._entriesEl||(this._entriesEl=document.getElementById("combat-log-entries")),!this._entriesEl)return;const s=document.createElement("div"),a=this._categoryClass(e);if(s.className=`log-entry ${a}`,s.textContent=t,this._entriesEl.appendChild(s),this._entryCount++,this._entryCount>this.MAX_ENTRIES){const i=this._entriesEl.firstElementChild;i&&(i.remove(),this._entryCount--)}this._entriesEl.scrollTop=this._entriesEl.scrollHeight},_categoryClass(t){switch(t){case"attack":return"log-cat-attack";case"miss":return"log-cat-miss";case"crit":return"log-cat-crit";case"status":return"log-cat-status";case"death":return"log-cat-death";case"system":return"log-cat-system";case"combo":return"log-cat-combo";case"skill":return"log-cat-skill";case"heal":return"log-cat-heal";case"xp":return"log-cat-system";default:return"log-cat-default"}}},B="spellroads-combat-style";function ee(){if(document.getElementById(B))return;const t=document.createElement("style");t.id=B,t.textContent=`
    /* ══════════════════════════════════════════════════════════
       CombatScene — Spellroads
       ══════════════════════════════════════════════════════════ */

    #combat-scene {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: flex;
      flex-direction: column;
      background: rgba(8, 5, 3, 0.97);
      pointer-events: all;
      overflow: hidden;
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #e8d5b0;
      user-select: none;
    }

    /* ── Turn Order Bar ───────────────────────────────────────── */
    #combat-turn-bar {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba(0, 0, 0, 0.6);
      border-bottom: 1px solid rgba(200, 160, 32, 0.25);
      overflow-x: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(200,160,32,0.3) transparent;
      min-height: 58px;
    }
    #combat-turn-bar::-webkit-scrollbar { height: 4px; }
    #combat-turn-bar::-webkit-scrollbar-thumb { background: rgba(200,160,32,0.3); border-radius: 2px; }

    .turn-chip {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid rgba(90, 74, 53, 0.6);
      background: rgba(26, 21, 16, 0.8);
      min-width: 60px;
      cursor: default;
      transition: border-color 0.15s;
    }
    .turn-chip.is-current {
      border-color: #c8a020;
      box-shadow: 0 0 8px rgba(200, 160, 32, 0.4);
    }
    .turn-chip.is-dead {
      opacity: 0.4;
    }
    .turn-chip.is-dead .chip-name {
      text-decoration: line-through;
    }
    .chip-name {
      font-size: clamp(9px, 1.0vw, 11px);
      color: #c8b888;
      text-align: center;
      max-width: 72px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chip-name.enemy { color: #d07060; }
    .chip-hp-bar {
      width: 100%;
      height: 3px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }
    .chip-hp-fill {
      height: 100%;
      border-radius: 2px;
      background: #40a060;
      transition: width 0.3s;
    }
    .chip-hp-fill.low { background: #c88020; }
    .chip-hp-fill.critical { background: #c83020; }

    /* ── Co-op player badge on turn chips ────────────────────────── */
    .chip-player-badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 1px 4px;
      border-radius: 3px;
      background: rgba(200, 160, 32, 0.18);
      border: 1px solid rgba(200, 160, 32, 0.4);
      color: #c8a020;
      line-height: 1.4;
      align-self: center;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .chip-player-badge.p1 { background: rgba(64, 160, 96, 0.18);  border-color: rgba(64, 160, 96, 0.4);  color: #40c060; }
    .chip-player-badge.p2 { background: rgba(32, 128, 192, 0.18); border-color: rgba(32, 128, 192, 0.4); color: #4090d8; }
    .chip-player-badge.p3 { background: rgba(160, 80, 200, 0.18); border-color: rgba(160, 80, 200, 0.4); color: #b068e0; }
    .chip-player-badge.p4 { background: rgba(200, 80, 32, 0.18);  border-color: rgba(200, 80, 32, 0.4);  color: #e07050; }

    /* ── Main area: grid + log ────────────────────────────────── */
    #combat-main {
      flex: 1;
      display: flex;
      min-height: 0;
      overflow: hidden;
    }

    /* ── Formation Grid ───────────────────────────────────────── */
    #combat-grid-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(8px, 1.5vh, 20px);
      min-width: 0;
    }
    #combat-grid {
      display: grid;
      grid-template-columns: repeat(8, clamp(50px, 8vw, 76px));
      grid-template-rows: repeat(4, clamp(50px, 8vw, 76px));
      gap: 4px;
      position: relative;
    }

    /* Center divider between party / enemy halves */
    #combat-grid::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(4 * (clamp(50px, 8vw, 76px) + 4px) - 2px);
      width: 2px;
      background: rgba(200, 160, 32, 0.3);
      pointer-events: none;
    }

    .combat-tile {
      position: relative;
      border-radius: 4px;
      border: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.03);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: default;
      transition: border-color 0.15s, background 0.15s;
      overflow: hidden;
    }
    .combat-tile.party-side {
      background: rgba(10, 40, 10, 0.4);
    }
    .combat-tile.enemy-side {
      background: rgba(40, 10, 10, 0.4);
    }
    .combat-tile.move-target {
      border-color: rgba(64, 160, 96, 0.7);
      background: rgba(64, 160, 96, 0.12);
      cursor: pointer;
    }
    .combat-tile.move-target:hover {
      background: rgba(64, 160, 96, 0.22);
    }
    .combat-tile.attack-target {
      border-color: rgba(200, 48, 32, 0.7);
      cursor: pointer;
      animation: pulse-attack 1s ease-in-out infinite;
    }
    @keyframes pulse-attack {
      0%, 100% { box-shadow: inset 0 0 0 1px rgba(200,48,32,0.4); }
      50%       { box-shadow: inset 0 0 0 2px rgba(200,48,32,0.8); }
    }

    /* ── Combatant avatar inside a tile ──────────────────────── */
    .combatant-avatar {
      width: clamp(36px, 5vw, 56px);
      height: clamp(36px, 5vw, 56px);
      border-radius: 50%;
      background: #2a6a3a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(13px, 1.8vw, 20px);
      font-weight: 700;
      color: #c8e8b8;
      text-transform: uppercase;
      position: relative;
      transition: box-shadow 0.2s, opacity 0.2s;
    }
    .combatant-avatar.enemy {
      background: #6a2a2a;
      color: #e8c8c8;
    }
    .combatant-avatar.current-turn {
      box-shadow: 0 0 12px #c8a020, 0 0 4px #c8a020;
    }
    .combatant-avatar.defending::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: rgba(32, 128, 192, 0.35);
    }
    .combatant-avatar.unconscious {
      opacity: 0.5;
      filter: grayscale(1);
    }

    .tile-hp-bar {
      position: absolute;
      bottom: 3px;
      left: 4px;
      right: 4px;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }
    .tile-hp-fill {
      height: 100%;
      border-radius: 2px;
      background: #40a060;
      transition: width 0.3s;
    }
    .tile-hp-fill.low { background: #c88020; }
    .tile-hp-fill.critical { background: #c83020; }

    /* Status effect pips */
    .tile-status {
      position: absolute;
      top: 2px;
      right: 3px;
      display: flex;
      gap: 2px;
    }
    .status-pip {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      font-size: 7px;
    }

    /* ── Combat Log ───────────────────────────────────────────── */
    #combat-log {
      width: 25%;
      min-width: 180px;
      max-width: 320px;
      display: flex;
      flex-direction: column;
      background: rgba(0, 0, 0, 0.5);
      border-left: 1px solid rgba(90, 74, 53, 0.4);
      overflow: hidden;
    }
    #combat-log-title {
      flex-shrink: 0;
      padding: 6px 10px;
      font-size: clamp(9px, 1.0vw, 11px);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #706050;
      border-bottom: 1px solid rgba(90,74,53,0.3);
    }
    #combat-log-entries {
      flex: 1;
      overflow-y: auto;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 3px;
      scrollbar-width: thin;
      scrollbar-color: rgba(90,74,53,0.4) transparent;
    }
    #combat-log-entries::-webkit-scrollbar { width: 4px; }
    #combat-log-entries::-webkit-scrollbar-thumb { background: rgba(90,74,53,0.4); border-radius: 2px; }

    .log-entry {
      font-size: clamp(10px, 1.1vw, 12px);
      line-height: 1.45;
      padding: 2px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .log-round-sep {
      font-size: 10px;
      color: #5a4a35;
      text-align: center;
      padding: 4px 0 2px;
      letter-spacing: 0.1em;
    }
    /* Log category colors */
    .log-cat-attack  { color: #e8d5b0; }
    .log-cat-miss    { color: rgba(232,213,176,0.5); }
    .log-cat-crit    { color: #c8a020; font-weight: 600; }
    .log-cat-status  { color: #e08030; }
    .log-cat-death   { color: #c83020; font-weight: 600; }
    .log-cat-system  { color: rgba(232,213,176,0.3); font-style: italic; }
    .log-cat-combo   { color: #40d8e8; font-weight: 600; }
    .log-cat-skill   { color: #8060d8; }
    .log-cat-heal    { color: #40a060; }
    .log-cat-default { color: #a09070; }

    /* ── Action Panel ─────────────────────────────────────────── */
    #combat-actions {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: clamp(8px,1.5vh,14px) clamp(10px,2vw,20px);
      background: rgba(0, 0, 0, 0.65);
      border-top: 1px solid rgba(200, 160, 32, 0.2);
      min-height: 64px;
      flex-wrap: wrap;
    }

    .action-label {
      font-size: clamp(10px,1.1vw,12px);
      color: #706050;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-right: 4px;
    }

    .combat-btn {
      background: rgba(42, 32, 20, 0.9);
      border: 1px solid rgba(90, 74, 53, 0.7);
      color: #c8b888;
      font-family: inherit;
      font-size: clamp(11px, 1.3vw, 14px);
      padding: clamp(7px,1.2vh,11px) clamp(12px,1.8vw,20px);
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      min-height: 44px;
      min-width: 80px;
      white-space: nowrap;
    }
    .combat-btn:hover:not(:disabled) {
      background: rgba(60, 46, 28, 0.95);
      border-color: #c8a020;
      color: #e8d5b0;
    }
    .combat-btn:focus-visible {
      outline: 2px solid #e8c040;
      outline-offset: 2px;
    }
    .combat-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .combat-btn.primary {
      border-color: rgba(200,160,32,0.6);
      color: #e8c870;
    }
    .combat-btn.primary:hover:not(:disabled) {
      background: rgba(200,160,32,0.15);
      border-color: #c8a020;
    }
    .combat-btn.danger {
      border-color: rgba(200,48,32,0.5);
      color: #e87060;
    }
    .combat-btn.danger:hover:not(:disabled) {
      background: rgba(200,48,32,0.15);
      border-color: #c83020;
    }
    .combat-btn.end-turn {
      border-color: rgba(200,160,32,0.8);
      color: #c8a020;
      font-weight: 600;
    }

    .combat-enemy-thinking {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #706050;
      font-size: clamp(11px,1.3vw,14px);
      font-style: italic;
    }
    .thinking-dots span {
      display: inline-block;
      animation: thinking-dot 1.2s infinite;
      opacity: 0;
    }
    .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
    .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes thinking-dot {
      0%, 80%, 100% { opacity: 0; }
      40% { opacity: 1; }
    }

    /* ── Skills popup ─────────────────────────────────────────── */
    #combat-skills-popup {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(26, 21, 16, 0.98);
      border: 1px solid rgba(200,160,32,0.4);
      border-radius: 6px;
      padding: 8px 0;
      min-width: 200px;
      z-index: 110;
      box-shadow: 0 4px 20px rgba(0,0,0,0.7);
      display: none;
    }
    #combat-skills-popup.visible { display: block; }
    .skills-popup-title {
      font-size: 11px;
      color: #706050;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 14px 8px;
      border-bottom: 1px solid rgba(90,74,53,0.3);
      margin-bottom: 4px;
    }
    .skill-entry {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 14px;
      cursor: pointer;
      transition: background 0.1s;
    }
    .skill-entry:hover { background: rgba(200,160,32,0.08); }
    .skill-name {
      font-size: clamp(11px,1.2vw,13px);
      color: #c8b888;
    }
    .skill-cost {
      font-size: 10px;
      color: #5080c0;
      margin-left: auto;
    }
    .skill-empty {
      padding: 8px 14px;
      font-size: 12px;
      color: #706050;
      font-style: italic;
    }

    /* ── Victory / Defeat overlay ─────────────────────────────── */
    #combat-end-overlay {
      position: absolute;
      inset: 0;
      z-index: 120;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: clamp(16px, 3vh, 28px);
      background: rgba(0, 0, 0, 0.85);
      animation: fadeInEnd 0.5s ease;
    }
    #combat-end-overlay.visible { display: flex; }
    @keyframes fadeInEnd {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
    .end-headline {
      font-size: clamp(36px, 7vw, 80px);
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      text-shadow: 0 0 30px currentColor;
    }
    .end-headline.victory { color: #c8a020; }
    .end-headline.defeat  { color: #c83020; }

    .end-rewards {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      min-width: 260px;
      max-width: 480px;
    }
    .end-rewards-title {
      font-size: clamp(11px,1.3vw,14px);
      color: #706050;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }
    .end-xp-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: clamp(12px,1.4vw,15px);
      color: #c8b888;
      padding: 4px 0;
      border-bottom: 1px solid rgba(90,74,53,0.3);
    }
    .end-xp-value { color: #c8a020; font-weight: 600; }
    .end-loot-list {
      width: 100%;
      font-size: clamp(11px,1.2vw,13px);
      color: #a09070;
      padding: 6px 0;
    }
    .end-loot-item {
      padding: 2px 0;
    }
    .end-levelup {
      font-size: clamp(12px,1.4vw,15px);
      color: #c8a020;
      font-weight: 600;
      animation: pulse-levelup 1s ease-in-out infinite;
    }
    @keyframes pulse-levelup {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    .end-continue-btn {
      margin-top: 8px;
      background: rgba(200,160,32,0.15);
      border: 1px solid #c8a020;
      color: #e8c870;
      font-family: inherit;
      font-size: clamp(13px,1.6vw,18px);
      padding: clamp(10px,2vh,16px) clamp(32px,5vw,60px);
      border-radius: 6px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: background 0.15s;
      min-height: 48px;
    }
    .end-continue-btn:hover {
      background: rgba(200,160,32,0.28);
    }
    .end-continue-btn:focus-visible {
      outline: 2px solid #e8c040;
      outline-offset: 2px;
    }

    /* ── Floating damage numbers ──────────────────────────────── */
    .dmg-float {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: clamp(13px,1.8vw,18px);
      font-weight: 700;
      pointer-events: none;
      z-index: 10;
      animation: float-up 1.1s ease forwards;
      white-space: nowrap;
    }
    .dmg-float.dmg   { color: #ff6040; text-shadow: 0 1px 3px #000; }
    .dmg-float.heal  { color: #60d880; text-shadow: 0 1px 3px #000; }
    .dmg-float.miss  { color: rgba(232,213,176,0.55); font-size: clamp(11px,1.4vw,14px); }
    .dmg-float.crit  { color: #ffd020; font-size: clamp(16px,2.2vw,24px); text-shadow: 0 0 8px #c8a020; }
    @keyframes float-up {
      0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
      80%  { opacity: 1; }
      100% { opacity: 0; transform: translateX(-50%) translateY(-38px); }
    }

    /* ── Responsive: mobile ───────────────────────────────────── */
    @media (max-width: 767px) {
      #combat-log {
        display: none;
      }
      #combat-main {
        flex-direction: column;
      }
      #combat-grid {
        gap: 2px;
      }
    }
    @media (max-width: 767px) and (orientation: landscape) {
      #combat-log {
        display: flex;
        width: 30%;
        min-width: 140px;
      }
    }
  `,document.head.appendChild(t)}function te(t){const e=(t.category??"").toLowerCase(),s=(t.message??"").toLowerCase();return e==="crit"||s.includes("critical")?"log-cat-crit":e==="miss"||s.includes(" misses")||s.includes("miss")?"log-cat-miss":e==="death"||s.includes("defeated")||s.includes("unconscious")?"log-cat-death":e==="status"||s.includes("status")||s.includes("poisoned")||s.includes("stunned")?"log-cat-status":e==="combo"||s.includes("combo")?"log-cat-combo":e==="skill"||s.includes("casts")||s.includes("uses")?"log-cat-skill":e==="heal"||s.includes("heals")||s.includes("restored")?"log-cat-heal":e==="system"||e==="round"||e==="start"||e==="end"?"log-cat-system":e==="attack"||s.includes("attack")||s.includes("hits")?"log-cat-attack":"log-cat-default"}function H(t,e){const s=e>0?Math.max(0,Math.min(1,t/e)):0,a=s<=.25?"critical":s<=.5?"low":"";return{pct:s,cls:a}}class le{constructor(){this._el=null,this._gridEl=null,this._logEl=null,this._actionEl=null,this._turnBarEl=null,this._skillsPopup=null,this._endOverlay=null,this._mode="idle",this._unsubscribe=null,this._enemyTurnTimer=null,this._prevScene="worldMap",this._lastTurnOrder=[]}async init({renderer:e,partyChars:s,enemies:a,environment:i,regionLevel:n,fromScene:o}={}){if(h.info("[combat] CombatScene init"),this._prevScene=o??"worldMap",ee(),!s||!s.length)try{s=L.getAll().filter(c=>c.isHero).slice(0,4)}catch{h.warn("[combat] CharacterSystem.getAll failed, using empty party"),s=[]}if(!a||!a.length)try{a=T.generateEncounter(n??1,i??"forest")}catch(c){h.warn(`[combat] EnemySystem.generateEncounter failed: ${c.message}`);try{const u=T.createInstance("orc_grunt",1);a=u?[u]:[]}catch(u){h.warn(`[combat] EnemySystem.createInstance also failed: ${u.message}`),a=[]}}this._buildDOM();const r=document.getElementById("ui-overlay");r?r.appendChild(this._el):(document.body.appendChild(this._el),h.warn("[combat] #ui-overlay not found, appended to body")),this._unsubscribe=f.subscribe((c,u)=>{this._onCombatEvent(c,u)}),S.init(),window.__combatSystem=f,window.__combatLog=S,f.startCombat(s,a,{environment:i,regionLevel:n}),h.info(`[combat] startCombat: ${s.length} heroes vs ${a.length} enemies`),this._renderAll();const d=f.getCurrentCombatant();d&&!d.isPlayer&&this._scheduleEnemyTurn()}update(e){}async destroy(){clearTimeout(this._enemyTurnTimer),this._unsubscribe?.(),S.destroy(),this._el?.remove(),this._el=null,window.__combatSystem=void 0,window.__combatLog=void 0,h.info("[combat] CombatScene destroyed")}_buildDOM(){const e=document.createElement("div");e.id="combat-scene";const s=document.createElement("div");s.id="combat-turn-bar",this._turnBarEl=s;const a=document.createElement("div");a.id="combat-main";const i=document.createElement("div");i.id="combat-grid-wrap";const n=document.createElement("div");n.id="combat-grid",this._gridEl=n,i.appendChild(n);const o=document.createElement("div");o.id="combat-log",o.innerHTML='<div id="combat-log-title">Combat Log</div><div id="combat-log-entries"></div>',this._logEl=o.querySelector("#combat-log-entries"),a.appendChild(i),a.appendChild(o);const r=document.createElement("div");r.id="combat-actions",this._actionEl=r;const d=document.createElement("div");d.id="combat-skills-popup",this._skillsPopup=d;const c=document.createElement("div");c.id="combat-end-overlay",this._endOverlay=c,e.appendChild(s),e.appendChild(a),e.appendChild(r),e.appendChild(d),e.appendChild(c),e.style.position="fixed",this._el=e}_renderAll(){this._renderTurnBar(),this._renderGrid(),this._renderActions(),this._renderLog()}_getPlayerNumber(e){try{const s=window.__coopSystem;if(!s||typeof s.getAssignments!="function")return null;const a=s.getAssignments();if(!a)return null;const i=a instanceof Map?a.entries():Object.entries(a);for(const[n,o]of i)if(o===e)return parseInt(n,10)+1}catch{}return null}_renderTurnBar(){if(!this._turnBarEl)return;const e=this._safeGetState();if(!e)return;const{turnOrder:s=[],combatants:a}=e;this._lastTurnOrder=s;const n=(f.getCurrentCombatant?.()??null)?.id??null,o=s.map(d=>{const c=a?.get?a.get(d):a?.[d];if(!c)return"";const{pct:u,cls:l}=H(c.hp??0,c.maxHP??1),m=Math.round(u*100),p=d===n,g=!c.isConscious,b=c.isPlayer?"":"enemy",O=["turn-chip",p?"is-current":"",g?"is-dead":""].filter(Boolean).join(" "),R=(c.name??"Unknown").substring(0,10);let M="";if(c.isPlayer){const E=this._getPlayerNumber(c.id??d);E!=null&&(M=`<span class="chip-player-badge ${`p${E}`}">P${E}</span>`)}return`
        <div class="${O}" title="${c.name??""}">
          <span class="chip-name ${b}">${R}</span>
          ${M}
          <div class="chip-hp-bar">
            <div class="chip-hp-fill ${l}" style="width:${m}%"></div>
          </div>
        </div>
      `});this._turnBarEl.innerHTML=o.join(""),this._turnBarEl.querySelector(".turn-chip.is-current")?.scrollIntoView?.({behavior:"smooth",inline:"center",block:"nearest"})}_renderGrid(){if(!this._gridEl)return;const e=this._safeGetState(),s=f.getCurrentCombatant?.()??null,a=new Map;if(e?.combatants){const i=e.combatants instanceof Map?e.combatants.entries():Object.entries(e.combatants);for(const[,n]of i)n.col!=null&&n.row!=null&&a.set(`${n.col},${n.row}`,n)}this._gridEl.innerHTML="";for(let i=0;i<4;i++)for(let n=0;n<8;n++){const o=this._buildTile(n,i,a,s);this._gridEl.appendChild(o)}}_buildTile(e,s,a,i){const n=document.createElement("div"),r=e<4?"party-side":"enemy-side";if(n.className=`combat-tile ${r}`,n.dataset.col=e,n.dataset.row=s,this._mode==="select_move")a.get(`${e},${s}`)||n.classList.add("move-target");else if(this._mode==="select_attack_target"){const c=a.get(`${e},${s}`);c&&!c.isPlayer&&c.isConscious!==!1&&n.classList.add("attack-target")}const d=a.get(`${e},${s}`);if(d){n.appendChild(this._buildAvatar(d,i));const{pct:c,cls:u}=H(d.hp??0,d.maxHP??1),l=document.createElement("div");l.className="tile-hp-bar",l.innerHTML=`<div class="tile-hp-fill ${u}" style="width:${Math.round(c*100)}%"></div>`,n.appendChild(l);const m=d.statusEffects??[];if(m.length>0){const p=document.createElement("div");p.className="tile-status",m.slice(0,4).forEach(g=>{const b=document.createElement("span");b.className="status-pip",b.title=g.name??g.id??g,b.style.background=this._statusColor(g),p.appendChild(b)}),n.appendChild(p)}}return n.addEventListener("click",()=>this._onTileClick(e,s)),n}_buildAvatar(e,s){const a=document.createElement("div"),i=s&&e.id===s.id,n=e.isConscious===!1,o=(e.statusEffects??[]).some(c=>(c.id??c)==="defending"||(c.name??"")==="Defending"),r=["combatant-avatar",e.isPlayer?"":"enemy",i?"current-turn":"",o?"defending":"",n?"unconscious":""].filter(Boolean).join(" ");a.className=r;const d=(e.name??"?").charAt(0).toUpperCase();return a.textContent=d,a.title=`${e.name} — HP: ${e.hp??"?"}/${e.maxHP??"?"}`,a}_statusColor(e){const s=(e.id??e).toString().toLowerCase();return s.includes("poison")?"#40d040":s.includes("burn")||s.includes("fire")?"#e06020":s.includes("stun")||s.includes("daze")?"#e0e020":s.includes("freeze")||s.includes("cold")?"#60c0e8":s.includes("defend")?"#4080c0":s.includes("bleed")?"#c02020":s.includes("regen")||s.includes("heal")?"#40c060":"#a09070"}_renderLog(){if(!this._logEl)return;let e=[];try{e=f.getLog(20)??[]}catch{}const s=e.slice(-10);let a=null;const i=s.map(n=>{let o="";n.round!=null&&n.round!==a&&(a=n.round,o=`<div class="log-round-sep">— Round ${n.round} —</div>`);const r=te(n),d=this._escapeHtml(n.message??"");return`${o}<div class="log-entry ${r}">${d}</div>`}).join("");this._logEl.innerHTML=i,this._logEl.scrollTop=this._logEl.scrollHeight}_renderActions(){if(!this._actionEl)return;const e=this._safeGetState();if(this._actionEl.innerHTML="",!e?.active){this._actionEl.innerHTML='<span class="action-label">Combat ended</span>';return}const s=f.getCurrentCombatant?.()??null;if(!s)return;if(!s.isPlayer){this._actionEl.innerHTML=`
        <div class="combat-enemy-thinking">
          <span>${s.name??"Enemy"} is acting</span>
          <span class="thinking-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      `;return}const{actionTaken:a=!1,moveTaken:i=!1}=e,n=document.createElement("span");if(n.className="action-label",n.textContent=`${s.name}'s turn:`,this._actionEl.appendChild(n),a){const u=this._makeBtn("End Turn","end-turn",()=>{this._mode="idle",this._closeSkillsPopup(),this._scheduleNextTurn()});this._actionEl.appendChild(u);return}if(!i){const u=this._makeBtn("Move","",()=>{this._mode=this._mode==="select_move"?"idle":"select_move",this._closeSkillsPopup(),this._renderGrid()});this._mode==="select_move"&&(u.style.borderColor="#40a060"),this._actionEl.appendChild(u)}const o=this._makeBtn("Attack","",()=>{this._mode=this._mode==="select_attack_target"?"idle":"select_attack_target",this._closeSkillsPopup(),this._renderGrid()});this._mode==="select_attack_target"&&(o.style.borderColor="#c83020"),this._actionEl.appendChild(o);const r=this._makeBtn("Skills","",()=>{this._toggleSkillsPopup(s)});this._actionEl.appendChild(r);const d=this._makeBtn("Defend","",()=>{this._closeSkillsPopup(),this._mode="idle";try{f.executeDefend()}catch(u){h.warn(`[combat] executeDefend: ${u.message}`)}this._renderAll(),this._scheduleNextTurn()});this._actionEl.appendChild(d);const c=this._makeBtn("Pass","",()=>{this._closeSkillsPopup(),this._mode="idle";try{f.executePass()}catch(u){h.warn(`[combat] executePass: ${u.message}`)}this._renderAll(),this._scheduleNextTurn()});this._actionEl.appendChild(c)}_makeBtn(e,s,a){const i=document.createElement("button");return i.className=["combat-btn",s].filter(Boolean).join(" "),i.textContent=e,i.addEventListener("click",a),i}_toggleSkillsPopup(e){if(!this._skillsPopup)return;if(this._skillsPopup.classList.contains("visible")){this._closeSkillsPopup();return}this._buildSkillsPopup(e),this._skillsPopup.classList.add("visible")}_closeSkillsPopup(){this._skillsPopup?.classList.remove("visible")}_buildSkillsPopup(e){if(!this._skillsPopup)return;const s=e?.skills??e?.knownSkills??[];let a=`<div class="skills-popup-title">Skills — ${e?.name??""}</div>`;s.length?a+=s.slice(0,8).map(i=>{const n=i.name??i.skillId??i.id??"Unknown",o=i.manaCost?`${i.manaCost} MP`:"";return`
          <div class="skill-entry" data-tree="${i.treeId??""}" data-skill="${i.skillId??i.id??""}">
            <span class="skill-name">${this._escapeHtml(n)}</span>
            ${o?`<span class="skill-cost">${o}</span>`:""}
          </div>
        `}).join(""):a+='<div class="skill-empty">No skills known</div>',this._skillsPopup.innerHTML=a,this._skillsPopup.querySelectorAll(".skill-entry").forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.tree,o=i.dataset.skill;this._closeSkillsPopup(),this._mode="idle";const r=this._safeGetState();let d=null;r?.combatants&&(d=(r.combatants instanceof Map?[...r.combatants.values()]:Object.values(r.combatants)).find(l=>!l.isPlayer&&l.isConscious!==!1)?.id??null);try{const c=f.executeSkill(n,o,d);h.event(`[combat] Skill used; tree=${n} skill=${o} success=${c?.success}`)}catch(c){h.warn(`[combat] executeSkill error: ${c.message}`)}this._renderAll(),this._scheduleNextTurn()})})}_onTileClick(e,s){if(this._mode==="select_attack_target"){const a=this._getOccupant(e,s);if(!a||a.isPlayer||a.isConscious===!1)return;let i;try{i=f.executeAttack(a.id)}catch(n){h.warn(`[combat] executeAttack error: ${n.message}`);return}i?.success&&(this._showDamageFloat(e,s,i.outcome,i.damage),h.event(`[combat] attack; target=${a.id} damage=${i.damage} outcome=${i.outcome}`)),this._mode="idle",this._renderAll(),this._scheduleNextTurn()}else if(this._mode==="select_move"){if(this._getOccupant(e,s))return;let i;try{i=f.executeMove(e,s)}catch(n){h.warn(`[combat] executeMove error: ${n.message}`);return}i?.success&&h.event(`[combat] move; col=${e} row=${s}`),this._mode="idle",this._renderAll()}}_scheduleNextTurn(){try{const{over:e,winner:s}=f.checkCombatEnd();if(e){setTimeout(()=>this._showEndScreen({winner:s}),800);return}}catch{}setTimeout(()=>{let e=null;try{e=f.nextTurn()}catch{}this._renderAll(),e&&!e.isPlayer&&this._scheduleEnemyTurn()},300)}_scheduleEnemyTurn(){const e=420+Math.random()*380;this._enemyTurnTimer=setTimeout(()=>{const s=f.getCurrentCombatant?.()??null;if(!(!s||s.isPlayer)){h.event(`[combat] enemy turn; id=${s.id} name=${s.name}`);try{f.executeEnemyTurn(s)}catch(a){h.warn(`[combat] executeEnemyTurn failed, falling back: ${a.message}`),this._fallbackEnemyAction(s)}this._renderAll();try{const{over:a,winner:i}=f.checkCombatEnd();if(a){setTimeout(()=>this._showEndScreen({winner:i}),500);return}}catch{}this._scheduleNextTurn()}},e)}_fallbackEnemyAction(e){const s=this._safeGetState();if(!s?.combatants)return;const i=(s.combatants instanceof Map?[...s.combatants.values()]:Object.values(s.combatants)).find(n=>n.isPlayer&&n.isConscious!==!1);if(i)try{f.executeAttack(i.id)}catch{}}_onCombatEvent(e,s){switch(h.event(`[combat] event; type=${e}`),e){case"combat:over":this._renderAll(),setTimeout(()=>this._showEndScreen(s??{}),800);break;case"combat:hit":{const a=s.position;if(a!=null){const i=s.isCrit?`CRIT ${s.damage}!`:String(s.damage);this._spawnFloatingTextAtTile(a.col,a.row,i,s.isCrit?"crit":"damage"),this._pulseHpBar(a.col,a.row)}this._renderAll();break}case"combat:miss":{const a=s.position;a!=null&&this._spawnFloatingTextAtTile(a.col,a.row,"MISS","miss"),this._renderAll();break}case"combat:heal":{const a=s.position;a!=null&&this._spawnFloatingTextAtTile(a.col,a.row,`+${s.amount}`,"heal"),this._renderAll();break}case"combat:status":{const a=s.position;a!=null&&this._spawnFloatingTextAtTile(a.col,a.row,s.statusName??s.statusId??"status","status"),this._renderAll();break}case"combat:xp":{const a=(s.survivors??[])[0];a&&this._spawnFloatingTextAtTile(a.col,a.row,`+${s.amount} XP`,"xp");break}case"character:levelup":{const a=s.position;a!=null&&this._spawnFloatingTextAtTile(a.col,a.row,"Level Up!","xp"),this._showLevelUpToast(s.name??s.charId??"Hero",s.newLevel??"?");break}case"combat:attack":case"combat:skill":this._renderAll();break;default:this._renderAll();break}}_showEndScreen(e){let s=e;try{s=f.endCombat()??e}catch{}const a=s?.winner??e?.winner,i=s?.xp??{},n=s?.loot??[],o=s?.levelUps??[];if(h.info(`[combat] combat over; winner=${a}`),!this._endOverlay)return;const r=a==="party",d=r?"VICTORY":"DEFEAT",c=r?"victory":"defeat",u=Object.entries(i).map(([p,g])=>`
      <div class="end-xp-row">
        <span>${this._escapeHtml(p)}</span>
        <span class="end-xp-value">+${g} XP</span>
      </div>
    `).join(""),l=o.map(p=>`
      <div class="end-levelup">${this._escapeHtml(p.name??p.charId??"")} leveled up to ${p.newLevel??"?"}!</div>
    `).join(""),m=n.length?n.map(p=>`<div class="end-loot-item">${this._escapeHtml(p.name??p.itemId??p)}</div>`).join(""):'<div class="end-loot-item" style="color:#706050;font-style:italic;">No loot</div>';this._endOverlay.innerHTML=`
      <div class="end-headline ${c}">${d}</div>
      ${r?`
        <div class="end-rewards">
          ${u?`<div class="end-rewards-title">Experience Gained</div>${u}`:""}
          ${l}
          <div class="end-rewards-title" style="margin-top:10px;">Loot</div>
          <div class="end-loot-list">${m}</div>
        </div>
      `:`
        <div style="font-size:clamp(13px,1.5vw,16px); color:#a09070; text-align:center; max-width:360px;">
          Your party has fallen.<br>The saga continues...
        </div>
      `}
      <button class="end-continue-btn" id="combat-continue-btn">
        ${r?"Continue":"Return"}
      </button>
    `,this._endOverlay.classList.add("visible"),document.getElementById("combat-continue-btn")?.addEventListener("click",()=>{h.info(`[combat] continue; returning to ${this._prevScene}`),F.transition(this._prevScene)})}_spawnFloatingTextAtTile(e,s,a,i){if(!this._gridEl)return;const n=this._gridEl.querySelector(`[data-col="${e}"][data-row="${s}"]`);if(!n)return;const o=n.getBoundingClientRect(),r=o.left+o.width/2,d=o.top+o.height/3;z.spawn(r,d,a,i)}_pulseHpBar(e,s){if(!this._gridEl)return;const a=this._gridEl.querySelector(`[data-col="${e}"][data-row="${s}"]`);a&&(a.classList.add("hp-bar-hit"),setTimeout(()=>a.classList.remove("hp-bar-hit"),350))}_showLevelUpToast(e,s){const a=document.querySelector(".levelup-toast");a&&a.remove();const i=document.createElement("div");i.className="levelup-toast",i.textContent=`${e} reached Level ${s}!`,(this._el??document.body).appendChild(i),setTimeout(()=>{i.classList.add("hiding"),setTimeout(()=>i.remove(),550)},2200)}_showDamageFloat(e,s,a,i){if(!this._gridEl)return;const n=this._gridEl.querySelector(`[data-col="${e}"][data-row="${s}"]`);if(!n)return;const o=document.createElement("div");let r="",d="dmg";a==="miss"||a==="dodge"?(r="MISS",d="miss"):a==="crit"?(r=i!=null?`CRIT ${i}!`:"CRIT!",d="crit"):(r=i!=null?String(i):"HIT",d="dmg"),o.className=`dmg-float ${d}`,o.textContent=r,o.style.pointerEvents="none",n.appendChild(o),o.addEventListener("animationend",()=>o.remove(),{once:!0})}_safeGetState(){try{return f.getState()}catch{return null}}_getOccupant(e,s){const a=this._safeGetState();return a?.combatants?(a.combatants instanceof Map?[...a.combatants.values()]:Object.values(a.combatants)).find(n=>n.col===e&&n.row===s)??null:null}_escapeHtml(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}export{le as default};
//# sourceMappingURL=CombatScene-Cu5b8jjL.js.map
