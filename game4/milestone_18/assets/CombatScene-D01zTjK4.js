import{D as f,b as A,S as I}from"./main-CnIArb1R.js";import C from"./SkillSystem-DLtVPJSn.js";import w from"./EnemySystem-DkpBG-zn.js";import{r as S,a as $,c as H}from"./RNG-ziO0lLz6.js";import"./enemies-MNQmfbGS.js";const L={weapon:"might",spell:"intellect",both:"might"},O=new Set(["holy_heal","holy_mass_heal","holy_holy_nova","nature_herbal_remedy","nature_regrowth"]),N=new Set(["holy_divine_shield"]),z=new Set(["nature_summon_wolf","nature_summon_bear","death_raise_skeleton_warrior","death_raise_skeleton_mage","death_raise_skeleton_archer"]),R={nature_summon_wolf:"wolf",nature_summon_bear:"bear",death_raise_skeleton_warrior:"skeleton_warrior",death_raise_skeleton_mage:"skeleton_mage",death_raise_skeleton_archer:"skeleton_archer"},P={execute(e,t,a,s,i,n=1){const o=[];return e.isPassive?(f.warn(`[skill] Attempted to execute passive skill: ${e.id}`),o):(e.isAura&&o.push({type:"aura",source:t.id,skillId:e.id,message:`${t.name} activates ${e.name}.`}),z.has(e.id)?this._handleSummon(e,t,n,o):e.id==="holy_resurrection"?this._handleResurrection(e,t,a,o):e.id==="nature_herbal_remedy"?this._handleHerbalRemedy(e,t,a,s,i,n,o):O.has(e.id)?this._handleHeal(e,t,a,s,i,n,o):N.has(e.id)?this._handleShield(e,t,a,n,o):(e.damageMultiplier&&e.damageMultiplier.length>0&&this._handleDamage(e,t,a,i,n,o),e.applyStatus&&e.applyStatus.length>0&&this._applyStatusesToTargets(e,t,a,o),o))},_handleDamage(e,t,a,s,i,n){const o=this._getMultiplier(e.damageMultiplier,i),r=this._getStatMod(t,e.damageSource??"weapon"),c=this._computeBasePool(t,e.damageSource??"weapon",s),d=Math.round(c*o*(1+r/10)),u=this._resolveDamageType(e);for(const l of a){if(!l.isConscious)continue;const m=this._hasConsumableCrit(l),p=m?Math.round(d*1.5):d;n.push({type:"damage",source:t.id,target:l.id,amount:p,damageType:u,isCrit:m,message:m?`${t.name} uses ${e.name} — CRITICAL! ${p} ${u} damage to ${l.name}.`:`${t.name} uses ${e.name}: ${p} ${u} damage to ${l.name}.`}),m&&n.push({type:"consume_crit_status",target:l.id}),f.event(`[skill] damage; caster=${t.id} target=${l.id} skill=${e.id} mult=${o} statMod=${r} raw=${d} final=${p} type=${u} crit=${m}`)}},_handleHeal(e,t,a,s,i,n,o){if(e.id==="holy_holy_nova")return this._handleHolyNova(e,t,a,s,i,n,o);const r=this._getMultiplier(e.damageMultiplier,n)??1,c=this._getStatModByAttribute(t,"intellect"),d=this._getSpellPower(t),u=Math.round(d*r*(1+c/10));for(const l of a)l.isConscious&&(o.push({type:"heal",source:t.id,target:l.id,amount:u,message:`${t.name} heals ${l.name} for ${u} HP.`}),f.event(`[skill] heal; caster=${t.id} target=${l.id} skill=${e.id} amount=${u}`));return e.applyStatus&&e.applyStatus.length>0&&this._applyStatusesToTargets(e,t,a,o),o},_handleHolyNova(e,t,a,s,i,n,o){const r=this._getMultiplier(e.damageMultiplier,n)??1,c=this._getStatModByAttribute(t,"intellect"),d=this._getSpellPower(t),u=Math.round(d*r*(1+c/10));for(const l of a)l.isConscious&&(l.isPlayer===t.isPlayer?o.push({type:"heal",source:t.id,target:l.id,amount:u,message:`Holy Nova heals ${l.name} for ${u} HP.`}):o.push({type:"damage",source:t.id,target:l.id,amount:u,damageType:"holy",isCrit:!1,message:`Holy Nova deals ${u} holy damage to ${l.name}.`}));return o},_handleHerbalRemedy(e,t,a,s,i,n,o){const r=this._getStatModByAttribute(t,"intellect"),c=this._getSpellPower(t),d=Math.round(c*.3*(1+r/10));for(const u of a){if(!u.isConscious)continue;const l=u.statusEffects?.find(m=>!j.has(m.id));l&&o.push({type:"dispel",source:t.id,target:u.id,removedStatusId:l.id,message:`${t.name} cures ${l.id} from ${u.name}.`}),d>0&&o.push({type:"heal",source:t.id,target:u.id,amount:d,message:`${t.name} restores ${d} HP to ${u.name}.`})}return o},_handleShield(e,t,a,s,i){const n=this._getMultiplier(e.damageMultiplier,s)??1,o=this._getStatModByAttribute(t,"intellect"),r=this._getSpellPower(t),c=Math.round(r*n*(1+o/10));for(const d of a)d.isConscious&&(i.push({type:"shield",source:t.id,target:d.id,amount:c,message:`${t.name} shields ${d.name} for ${c} HP.`}),i.push({type:"status",source:t.id,target:d.id,statusId:"shielded"}),f.event(`[skill] shield; caster=${t.id} target=${d.id} amount=${c}`));return i},_handleSummon(e,t,a,s){const i=R[e.id]??"unknown";return s.push({type:"summon",source:t.id,companionType:i,skillLevel:a,message:`${t.name} summons a ${i.replace(/_/g," ")}.`}),f.event(`[skill] summon; caster=${t.id} type=${i} level=${a}`),s},_handleResurrection(e,t,a,s){for(const i of a)i.isConscious||(s.push({type:"resurrect",source:t.id,target:i.id,hpFraction:.5,message:`${t.name} resurrects ${i.name}!`}),f.event(`[skill] resurrect; caster=${t.id} target=${i.id}`));return s},_applyStatusesToTargets(e,t,a,s){for(const i of a)if(i.isConscious)for(const n of e.applyStatus)s.push({type:"status",source:t.id,target:i.id,statusId:n,message:`${i.name} is afflicted by ${n}.`})},_getMultiplier(e,t){return!e||e.length===0?1:e[Math.min(t-1,e.length-1)]},_attributeMod(e){return Math.floor(((e??10)-10)/2)},_getStatMod(e,t){const a=L[t]??"might";return this._attributeMod(e.attributes?.[a]??10)},_getStatModByAttribute(e,t){return this._attributeMod(e.attributes?.[t]??10)},_computeBasePool(e,t,a){if(t==="weapon"||t==="both"){if(e.weaponDamage)return a.nextInt(e.weaponDamage.min,e.weaponDamage.max);const s=e.equipment?.weapon;if(s?.damage)return a.nextInt(s.damage.min??5,s.damage.max??10);const i=this._attributeMod(e.attributes?.might??10);return Math.max(1,3+i)}return this._getSpellPower(e)},_getSpellPower(e){const t=this._attributeMod(e.attributes?.intellect??10);return Math.max(4,8+t*2)},_resolveDamageType(e){if(e.damageType)return e.damageType;const t=e.id??"";return t.startsWith("frost_")?"frost":t.startsWith("fire_")?"fire":t.startsWith("lightning_")||t.startsWith("storm_")?"lightning":t.startsWith("holy_")?"holy":t.startsWith("nature_")?"nature":t.startsWith("death_")||t.startsWith("death_knight_")?"death":t.startsWith("rune")?"arcane":t.startsWith("spirit_")?"spirit":e.damageSource==="spell"?"magic":"physical"},_hasConsumableCrit(e){return(e.statusEffects??[]).some(t=>t.id==="marked"||t.id==="coup_de_grace")}},j=new Set(["hasted","shielded","regenerating","fortified","blessed","enraged","inspired","invisible","defending","aura_active","concentration"]);typeof window<"u"&&(window.__skillExecutor=P);const k=[{id:"poisoned",name:"Poisoned",description:"Takes poison damage each turn.",icon:"status_poisoned",color:"#44bb44",category:"debuff",damageType:"poison",stackable:!0,maxStacks:10,duration:3,tickDamage:4,combos:[{withStatus:"bleeding",result:"sepsis",removesBoth:!1},{withStatus:"diseased",result:"plague",removesBoth:!1}],visualEffect:"poison_drip",onApply:"sfx_poisoned",onExpire:null},{id:"burning",name:"Burning",description:"On fire. Takes fire damage each turn.",icon:"status_burning",color:"#ff4400",category:"debuff",damageType:"fire",stackable:!0,maxStacks:5,duration:"until_extinguished",tickDamage:3,combos:[{withStatus:"oiled",result:"explosion",removesBoth:!0},{withDamageType:"frost",result:"extinguished",removesBoth:!0}],visualEffect:"flame_particles",onApply:"sfx_burning",onExpire:"sfx_extinguish"},{id:"bleeding",name:"Bleeding",description:"Takes physical damage each turn from blood loss.",icon:"status_bleeding",color:"#cc2222",category:"debuff",damageType:"physical",stackable:!0,maxStacks:5,duration:4,tickDamage:5,combos:[{withStatus:"poisoned",result:"sepsis",removesBoth:!1},{withStatus:"weakened",result:"hemorrhage",removesBoth:!1}],visualEffect:"blood_drip",onApply:"sfx_bleeding",onExpire:null},{id:"diseased",name:"Diseased",description:"All attributes reduced by 2. Max HP temporarily reduced.",icon:"status_diseased",color:"#886600",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"combat",tickDamage:0,statModifiers:{might:-2,agility:-2,intellect:-2,wisdom:-2,endurance:-2,presence:-2},combos:[{withStatus:"poisoned",result:"plague",removesBoth:!1}],visualEffect:"disease_aura",onApply:"sfx_diseased",onExpire:null},{id:"stunned",name:"Stunned",description:"Loses action next turn.",icon:"status_stunned",color:"#ffff00",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,modifiers:{loseAction:!0},combos:[{withStatus:"exposed",result:"coup_de_grace",removesBoth:!1}],visualEffect:"stun_stars",onApply:"sfx_stunned",onExpire:null},{id:"rooted",name:"Rooted",description:"Cannot move. Can still attack and cast.",icon:"status_rooted",color:"#557733",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotMove:!0},combos:[],visualEffect:"root_vines",onApply:"sfx_rooted",onExpire:null},{id:"slowed",name:"Slowed",description:"Movement costs 2, effectively preventing movement at base rate.",icon:"status_slowed",color:"#aabbcc",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{moveCostBonus:1},combos:[],visualEffect:"slow_waves",onApply:"sfx_slowed",onExpire:null},{id:"blinded",name:"Blinded",description:"Accuracy reduced by 40%.",icon:"status_blinded",color:"#dddddd",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{accuracyMult:.6},combos:[],visualEffect:"blind_dots",onApply:"sfx_blinded",onExpire:null},{id:"silenced",name:"Silenced",description:"Cannot use skills. Basic attacks still allowed.",icon:"status_silenced",color:"#bb88bb",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotUseSkills:!0},combos:[],visualEffect:"silence_rune",onApply:"sfx_silenced",onExpire:null},{id:"feared",name:"Feared",description:"Must move away from source. Cannot take offensive actions.",icon:"status_feared",color:"#cc8800",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{forceMoveAway:!0,cannotAttack:!0},combos:[{withStatus:"confused",result:"panic",removesBoth:!1}],visualEffect:"fear_aura",onApply:"sfx_feared",onExpire:null},{id:"charmed",name:"Charmed",description:"Attacks a random ally.",icon:"status_charmed",color:"#ff88cc",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{attackRandomAlly:!0},combos:[],visualEffect:"charm_hearts",onApply:"sfx_charmed",onExpire:null},{id:"confused",name:"Confused",description:"Takes a random action each turn.",icon:"status_confused",color:"#cc44ff",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{randomAction:!0},combos:[{withStatus:"feared",result:"panic",removesBoth:!1}],visualEffect:"confusion_spiral",onApply:"sfx_confused",onExpire:null},{id:"cursed",name:"Cursed",description:"All rolls reduced by 3.",icon:"status_cursed",color:"#441144",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"combat",tickDamage:0,modifiers:{allRollsBonus:-3},combos:[],visualEffect:"curse_runes",onApply:"sfx_cursed",onExpire:null},{id:"exposed",name:"Exposed",description:"Armor reduced by 10 per stack.",icon:"status_exposed",color:"#ffaa44",category:"debuff",damageType:null,stackable:!0,maxStacks:3,duration:2,tickDamage:0,modifiers:{armorBonus:-10},combos:[{withStatus:"stunned",result:"coup_de_grace",removesBoth:!1}],visualEffect:"expose_shatter",onApply:null,onExpire:null},{id:"weakened",name:"Weakened",description:"Damage dealt reduced by 25%.",icon:"status_weakened",color:"#aaaaaa",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{damageMult:.75},combos:[{withStatus:"bleeding",result:"hemorrhage",removesBoth:!1}],visualEffect:"weak_shimmer",onApply:null,onExpire:null},{id:"petrified",name:"Petrified",description:"Cannot move or act. Damage resistance +50%.",icon:"status_petrified",color:"#887766",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotMove:!0,cannotAct:!0,damageResistBonus:.5},combos:[{withDamageType:"fire",result:"statue_crack",removesBoth:!1}],visualEffect:"stone_cracks",onApply:"sfx_petrified",onExpire:null},{id:"terrified",name:"Terrified",description:"Accuracy reduced by 3. Must move away each turn.",icon:"status_terrified",color:"#cc8822",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{allRollsBonus:-3,forceMoveAway:!0},combos:[],visualEffect:"terror_aura",onApply:"sfx_terrified",onExpire:null},{id:"exhausted",name:"Exhausted",description:"No bonus actions. Move cost increased by 1.",icon:"status_exhausted",color:"#996644",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:3,tickDamage:0,modifiers:{noBonusActions:!0,moveCostBonus:1},combos:[],visualEffect:"exhaust_puff",onApply:null,onExpire:null},{id:"electrified",name:"Electrified",description:"Next lightning hit chains to 2 extra targets. Consumed on trigger.",icon:"status_electrified",color:"#ffff44",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{chainOnLightning:2},consumedOnTrigger:!0,combos:[{withDamageType:"lightning",result:"chain_overload",removesBoth:!0}],visualEffect:"electric_sparks",onApply:"sfx_electrified",onExpire:null},{id:"oiled",name:"Oiled",description:"Coated in flammable oil. Fire contact causes explosion.",icon:"status_oiled",color:"#886622",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"until_triggered",tickDamage:0,combos:[{withDamageType:"fire",result:"explosion",removesBoth:!0},{withStatus:"burning",result:"explosion",removesBoth:!0},{withStatus:"wet",result:"diluted",removesBoth:!0}],visualEffect:"oil_sheen",onApply:null,onExpire:null},{id:"wet",name:"Wet",description:"Soaked in water. Interacts with fire, frost, and lightning.",icon:"status_wet",color:"#4488cc",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:3,tickDamage:0,combos:[{withDamageType:"lightning",result:"electrocuted",removesBoth:!0},{withDamageType:"frost",result:"frozen",removesBoth:!0},{withDamageType:"fire",result:"steam",removesBoth:!0},{withStatus:"oiled",result:"diluted",removesBoth:!0}],visualEffect:"water_drip",onApply:null,onExpire:null},{id:"frozen",name:"Frozen",description:"Cannot move or act. Frost damage taken increased by 50%.",icon:"status_frozen",color:"#88ccff",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotMove:!0,cannotAct:!0,frostDamageTakenMult:1.5},combos:[],visualEffect:"ice_shards",onApply:"sfx_frozen",onExpire:"sfx_thaw"},{id:"chilled",name:"Chilled",description:"Agility reduced by 2. Move distance reduced by 1.",icon:"status_chilled",color:"#aaddff",category:"debuff",damageType:null,stackable:!0,maxStacks:2,duration:2,tickDamage:0,modifiers:{agilityBonus:-2,moveDistBonus:-1},combos:[{withStatus:"chilled",result:"frozen",removesBoth:!0}],visualEffect:"frost_breath",onApply:null,onExpire:null},{id:"marked",name:"Marked",description:"Next hit against this target is an automatic critical.",icon:"status_marked",color:"#ff0000",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"until_triggered",tickDamage:0,consumedOnTrigger:!0,combos:[],visualEffect:"mark_rune",onApply:"sfx_marked",onExpire:null},{id:"hasted",name:"Hasted",description:"Gains one extra action per turn.",icon:"status_hasted",color:"#ffee44",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{bonusActions:1},combos:[],visualEffect:"speed_lines",onApply:"sfx_haste",onExpire:null},{id:"shielded",name:"Shielded",description:"Absorbs damage before HP is reduced.",icon:"status_shielded",color:"#44aaff",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:"until_depleted",tickDamage:0,modifiers:{absorbHP:0},combos:[],visualEffect:"magic_shield",onApply:"sfx_shield_up",onExpire:"sfx_shield_break"},{id:"regenerating",name:"Regenerating",description:"Recovers 8 HP per turn.",icon:"status_regenerating",color:"#44ff88",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:4,tickDamage:0,tickHeal:8,combos:[],visualEffect:"regen_glow",onApply:"sfx_regen",onExpire:null},{id:"fortified",name:"Fortified",description:"Armor increased by 20.",icon:"status_fortified",color:"#aaaaaa",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{armorBonus:20},combos:[],visualEffect:"stone_skin",onApply:"sfx_fortify",onExpire:null},{id:"blessed",name:"Blessed",description:"All rolls +2. Holy damage dealt +15%.",icon:"status_blessed",color:"#ffff88",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{allRollsBonus:2,holyDamageMult:1.15},combos:[],visualEffect:"holy_glow",onApply:"sfx_blessed",onExpire:null},{id:"enraged",name:"Enraged",description:"Damage dealt +30%. Armor -15%.",icon:"status_enraged",color:"#ff2200",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:3,tickDamage:0,modifiers:{damageMult:1.3,armorMult:.85},combos:[],visualEffect:"rage_aura",onApply:"sfx_enrage",onExpire:null},{id:"inspired",name:"Inspired",description:"All rolls +2.",icon:"status_inspired",color:"#88ffcc",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:3,tickDamage:0,modifiers:{allRollsBonus:2},combos:[],visualEffect:"inspire_notes",onApply:"sfx_inspired",onExpire:null},{id:"invisible",name:"Invisible",description:"Cannot be targeted until attacking or taking damage.",icon:"status_invisible",color:"#cccccc",category:"buff",damageType:null,stackable:!1,maxStacks:1,duration:"until_broken",tickDamage:0,modifiers:{untargetable:!0},combos:[],visualEffect:"fade_shimmer",onApply:"sfx_invisible",onExpire:"sfx_reveal"},{id:"defending",name:"Defending",description:"Block chance +40%. Active until next turn.",icon:"status_defending",color:"#88aaff",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,modifiers:{blockChanceBonus:.4},combos:[],visualEffect:null,onApply:null,onExpire:null},{id:"sepsis",name:"Sepsis",description:"Bleeding and Poison tick at double speed.",icon:"status_sepsis",color:"#668844",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"combat",tickDamage:0,modifiers:{dotTickMult:2},combos:[],visualEffect:"sepsis_veins",onApply:"sfx_sepsis",onExpire:null},{id:"explosion",name:"Explosion",description:"Explosive fire burst. Deals fire damage to target and adjacent enemies.",icon:"status_explosion",color:"#ff6600",category:"neutral",damageType:"fire",stackable:!1,maxStacks:1,duration:0,tickDamage:0,instantEffect:{type:"aoe_damage",damageMult:2,adjacentMult:1,damageType:"fire"},combos:[],visualEffect:"explosion_burst",onApply:"sfx_explosion",onExpire:null},{id:"electrocuted",name:"Electrocuted",description:"Stunned 1 turn. Double lightning damage taken.",icon:"status_electrocuted",color:"#ffff00",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,modifiers:{loseAction:!0,lightningDamageTakenMult:2},combos:[],visualEffect:"electrocute_arc",onApply:"sfx_electrocuted",onExpire:null},{id:"steam",name:"Steam",description:"Steam cloud deals minor AoE damage. Prevents Frozen this turn.",icon:"status_steam",color:"#ddddff",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,instantEffect:{type:"aoe_damage",damageMult:.3,damageType:"fire",radius:1},modifiers:{immuneToFrozen:!0},combos:[],visualEffect:"steam_cloud",onApply:"sfx_steam",onExpire:null},{id:"extinguished",name:"Extinguished",description:"Fire put out by frost. No additional effect.",icon:"status_extinguished",color:"#888888",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:0,tickDamage:0,combos:[],visualEffect:"steam_puff",onApply:"sfx_extinguish",onExpire:null},{id:"diluted",name:"Diluted",description:"Oil washed away. Neither oil nor water applies full effect.",icon:"status_diluted",color:"#886644",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:1,tickDamage:0,combos:[],visualEffect:"muddy_splash",onApply:null,onExpire:null},{id:"hemorrhage",name:"Hemorrhage",description:"Bleeding damage increased by 50% while Weakened.",icon:"status_hemorrhage",color:"#991111",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"combat",tickDamage:0,modifiers:{bleedingDamageMult:1.5},combos:[],visualEffect:"hemorrhage_burst",onApply:"sfx_hemorrhage",onExpire:null},{id:"coup_de_grace",name:"Coup de Grace",description:"Next hit vs this target is an automatic critical. Consumed on hit.",icon:"status_coup_de_grace",color:"#ff0088",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:"until_triggered",tickDamage:0,consumedOnTrigger:!0,combos:[],visualEffect:"coup_mark",onApply:null,onExpire:null},{id:"plague",name:"Plague",description:"Disease spreads to one adjacent enemy immediately.",icon:"status_plague",color:"#336622",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:0,tickDamage:0,instantEffect:{type:"spread_status",statusId:"diseased",targetType:"adjacent_enemy"},combos:[],visualEffect:"plague_cloud",onApply:"sfx_plague",onExpire:null},{id:"panic",name:"Panic",description:"Flees to random edge tile. No actions for 2 turns.",icon:"status_panic",color:"#ff8800",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{cannotAct:!0,forceFlee:!0},instantEffect:{type:"flee_to_edge"},combos:[],visualEffect:"panic_dash",onApply:"sfx_panic",onExpire:null},{id:"statue_crack",name:"Statue Crack",description:"Petrification shattered by fire. Takes 1.5x physical damage.",icon:"status_statue_crack",color:"#cc8844",category:"debuff",damageType:null,stackable:!1,maxStacks:1,duration:2,tickDamage:0,modifiers:{physicalDamageTakenMult:1.5},combos:[],visualEffect:"stone_crack",onApply:"sfx_crack",onExpire:null},{id:"chain_overload",name:"Chain Overload",description:"Lightning hit chains to 2 extra targets.",icon:"status_chain_overload",color:"#ffff00",category:"neutral",damageType:null,stackable:!1,maxStacks:1,duration:0,tickDamage:0,instantEffect:{type:"chain_lightning",chainCount:2},combos:[],visualEffect:"chain_arc",onApply:"sfx_chain_lightning",onExpire:null}],F=8,v=4,U=[0,1,2,3],G=[4,5,6,7];function b(e,t,a,s){return Math.max(Math.abs(e-a),Math.abs(t-s))}function x(e){return Math.floor((e-10)/2)}const h={_state:null,_rng:null,_log:[],_subscribers:[],subscribe(e){return this._subscribers.push(e),()=>{this._subscribers=this._subscribers.filter(t=>t!==e)}},_emit(e,t={}){for(const a of this._subscribers)try{a(e,t)}catch{}},startCombat(e,t,a={}){const s=a.seed??Date.now();this._rng=H(s),this._log=[];const i=new Map,n=e.filter(c=>!c.isCompanion),o=e.filter(c=>c.isCompanion);n.forEach((c,d)=>{const u=this._wrapCharacter(c,d);u.col=Math.min(d,3),u.row=Math.floor(d/4),i.set(u.id,u)}),o.forEach((c,d)=>{const u=n.length+d,l=this._wrapCompanion(c,u);l.col=Math.min(u%4,3),l.row=Math.floor(u/4)%v,i.set(l.id,l)}),t.forEach((c,d)=>{const u=this._wrapEnemy(c);u.col=4+d%4,u.row=Math.floor(d/4)%v,i.set(u.id,u)});const r=this._rollInitiative([...i.values()]);return this._state={id:`combat_${Date.now()}`,active:!0,round:1,turnIndex:0,turnOrder:r,combatants:i,environment:a.environment??"forest",regionLevel:a.regionLevel??1,phase:"player_turn",actionTaken:!1,moveTaken:!1,seed:s},this._updatePhase(),this.log(`Combat started — ${e.length} heroes vs ${t.length} enemies`,"system"),f.info(`[combat] startCombat; party=${e.length} enemies=${t.length} seed=${s}`),this._emit("combat:start",{state:this._state}),this._state},getState(){return this._state},isActive(){return this._state?.active===!0},getCurrentCombatant(){if(!this._state)return null;const e=this._state.turnOrder[this._state.turnIndex];return this._state.combatants.get(e)??null},executeMove(e,t){if(!this._canAct())return{success:!1,message:"Cannot act now."};const a=this.getCurrentCombatant();if(!a)return{success:!1,message:"No active combatant."};if(this._state.moveTaken)return{success:!1,message:"Already moved this turn."};if(e<0||e>=F||t<0||t>=v)return{success:!1,message:"Out of bounds."};if(!(a.isPlayer?U:G).includes(e))return{success:!1,message:"Cannot move to that column."};if(this._getTileOccupant(e,t))return{success:!1,message:"Tile occupied."};const i=a.col,n=a.row;return a.col=e,a.row=t,this._state.moveTaken=!0,this.log(`${a.name} moves (${i},${n}) -> (${e},${t})`,"move"),this._emit("combat:move",{combatantId:a.id,from:{col:i,row:n},to:{col:e,row:t}}),{success:!0,message:"Moved.",events:[{type:"move",id:a.id}]}},executeAttack(e){if(!this._canAct())return{success:!1,message:"Cannot act now."};if(this._state.actionTaken)return{success:!1,message:"Action already taken this turn."};const t=this.getCurrentCombatant();if(!t)return{success:!1,message:"No active combatant."};const a=this._state.combatants.get(e);if(!a)return{success:!1,message:"Target not found."};if(!a.isConscious)return{success:!1,message:"Target is already down."};if(t.isPlayer===a.isPlayer)return{success:!1,message:"Cannot attack ally."};const s=this._resolveAttack(t,a);return this._state.actionTaken=!0,this._emit("combat:attack",{attackerId:t.id,targetId:e,result:s}),this._checkCombatEndInternal(),{...s,success:!0}},executeSkill(e,t,a=null){if(!this._canAct())return{success:!1,message:"Cannot act now."};if(this._state.actionTaken)return{success:!1,message:"Action already taken."};const s=this.getCurrentCombatant();if(!s)return{success:!1,message:"No active combatant."};const i=C.getSkillById(e,t);if(!i)return{success:!1,message:"Unknown skill."};const n=s.skills?.[e]?.[t]??1,o=i.manaCost??0;if(s.mana<o)return{success:!1,message:"Not enough mana."};if((s.skillCooldowns[t]??0)>0)return{success:!1,message:`Skill on cooldown (${s.skillCooldowns[t]} turns).`};if(i.isPassive)return{success:!1,message:"Passive skills cannot be activated."};s.mana=Math.max(0,s.mana-o),(i.cooldown??0)>0&&(s.skillCooldowns[t]=i.cooldown);const r=this._resolveSkillTargets(i,s,a),c=r.map(l=>this._state.combatants.get(l)).filter(l=>l!=null),d=P.execute(i,s,c,this.getState(),this._rng,n),u=[];for(const l of d)switch(l.type){case"damage":{const m=this._state.combatants.get(l.target);if(m&&m.isConscious){const p=this._applyResistance(l.amount,l.damageType??"physical",m);m.hp=Math.max(0,m.hp-p),m.hp===0&&this._makeUnconscious(m),this.log(l.message??`${s.name} deals ${p} dmg to ${m.name}.`,"skill"),u.push({type:"damage",targetId:l.target,amount:p,damageType:l.damageType,isCrit:l.isCrit})}break}case"heal":{const m=this._state.combatants.get(l.target);m&&m.isConscious&&(m.hp=Math.min(m.maxHP,m.hp+l.amount),this.log(l.message??`${m.name} recovers ${l.amount} HP.`,"skill"),u.push({type:"heal",targetId:l.target,amount:l.amount}));break}case"shield":{const m=this._state.combatants.get(l.target);m&&m.isConscious&&(m.shieldHP=(m.shieldHP??0)+l.amount,this.log(l.message??`${m.name} gains a ${l.amount} HP shield.`,"skill"),u.push({type:"shield",targetId:l.target,amount:l.amount}));break}case"status":{const m=this._state.combatants.get(l.target);m&&(this.applyStatus(m,l.statusId,l.source),u.push({type:"status",targetId:l.target,statusId:l.statusId}));break}case"consume_crit_status":{const m=this._state.combatants.get(l.target);m&&(m.statusEffects=m.statusEffects.filter(p=>p.id!=="marked"&&p.id!=="coup_de_grace"));break}case"summon":{this.log(l.message??`${s.name} summons a ${l.companionType}.`,"skill"),u.push({type:"summon",casterId:s.id,companionType:l.companionType,skillLevel:l.skillLevel});break}case"resurrect":{const m=this._state.combatants.get(l.target);m&&!m.isConscious&&(m.isConscious=!0,m.hp=Math.max(1,Math.floor(m.maxHP*(l.hpFraction??.5))),this.log(l.message??`${m.name} is resurrected!`,"skill"),u.push({type:"resurrect",targetId:l.target}));break}case"dispel":{const m=this._state.combatants.get(l.target);m&&(m.statusEffects=m.statusEffects.filter(p=>p.id!==l.removedStatusId),this.log(l.message??`${m.name}: ${l.removedStatusId} dispelled.`,"skill"),u.push({type:"dispel",targetId:l.target,statusId:l.removedStatusId}));break}case"aura":{s.activeAura=l.skillId,this.log(l.message??`${s.name} activates aura: ${i.name}.`,"skill"),u.push({type:"aura",casterId:s.id,skillId:l.skillId});break}}return i.isAura&&!d.some(l=>l.type==="aura")&&(s.activeAura=t,this.log(`${s.name} activates aura: ${i.name}`,"skill")),this._state.actionTaken=!0,this._emit("combat:skill",{casterId:s.id,skillId:t,treeId:e,targetIds:r,events:u}),this._checkCombatEndInternal(),{success:!0,message:`Used ${i.name}.`,events:u}},executeDefend(){if(!this._canAct())return{success:!1,message:"Cannot act now."};if(this._state.actionTaken)return{success:!1,message:"Action already taken."};const e=this.getCurrentCombatant();return e?(e.isDefending=!0,this._state.actionTaken=!0,this.log(`${e.name} takes a defensive stance.`,"action"),this._emit("combat:defend",{combatantId:e.id}),{success:!0,message:"Defending."}):{success:!1,message:"No active combatant."}},executePass(){if(!this._canAct())return{success:!1,message:"Cannot act now."};const e=this.getCurrentCombatant();return e?(this._state.actionTaken=!0,this.log(`${e.name} passes.`,"action"),this._emit("combat:pass",{combatantId:e.id}),{success:!0,message:"Passed."}):{success:!1,message:"No active combatant."}},nextTurn(){if(!this._state?.active)return null;const e=this.getCurrentCombatant();if(e){for(const s of Object.keys(e.skillCooldowns))e.skillCooldowns[s]=Math.max(0,e.skillCooldowns[s]-1);e.isDefending=!1}this._state.turnIndex=(this._state.turnIndex+1)%this._state.turnOrder.length;let t=0;for(;t<32;){const s=this.getCurrentCombatant();if(s&&s.isConscious)break;this._state.turnIndex=(this._state.turnIndex+1)%this._state.turnOrder.length,t++}this._state.turnIndex===0&&(this._state.round++,this.log(`--- Round ${this._state.round} ---`,"system"),this._emit("combat:new_round",{round:this._state.round})),this._state.actionTaken=!1,this._state.moveTaken=!1;const a=this.getCurrentCombatant();return a&&this.processTurnStart(a),this._updatePhase(),this._emit("combat:turn_start",{combatantId:a?.id}),a},checkCombatEnd(){if(!this._state)return{over:!1,winner:null};const e=[...this._state.combatants.values()].filter(i=>i.isPlayer),t=[...this._state.combatants.values()].filter(i=>!i.isPlayer),a=e.some(i=>i.isConscious),s=t.some(i=>i.isConscious);return a?s?{over:!1,winner:null}:{over:!0,winner:"party"}:{over:!0,winner:"enemies"}},endCombat(){if(!this._state)return{xp:0,loot:[],levelUps:[]};const e=this._state;e.active=!1;const t=[...e.combatants.values()].filter(r=>!r.isPlayer&&!r.isConscious);let a=t.reduce((r,c)=>r+(c.xpReward??10),0);const s=[];for(const r of t){const c=w.rollLoot(r,this._rng);s.push(...c.items)}const i=[...e.combatants.values()].filter(r=>r.isPlayer&&r.isConscious),n=i.length>0?Math.floor(a/i.length):0,o=[];for(const r of i)r.sourceChar&&(A.grantXP(r.sourceChar,n),r.sourceChar.level>(r.startLevel??r.sourceChar.level-1)&&o.push({charId:r.id,newLevel:r.sourceChar.level}));return this.log(`Combat ended — ${i.length} survivors, ${n} XP each`,"system"),f.info(`[combat] endCombat; xp=${n} loot=${s.length} levelUps=${o.length}`),this._emit("combat:end",{winner:this.checkCombatEnd().winner,xp:n,loot:s,levelUps:o}),this._state=null,{xp:n,loot:s,levelUps:o}},applyStatus(e,t,a=null){const s=k.find(n=>n.id===t);if(!s)return;const i=e.statusEffects.find(n=>n.id===t);i?(s.stackable&&i.stacks<(s.maxStacks??10)&&i.stacks++,i.duration=s.duration??3):e.statusEffects.push({id:t,duration:s.duration??3,sourceId:a,stacks:1}),this._checkStatusCombos(e),this.log(`${e.name} is affected by ${s.name}`,"status")},processTurnStart(e){const t=[];for(const a of e.statusEffects){const s=k.find(i=>i.id===a.id);if(!s){t.push(a.id);continue}if(s.tickHeal&&e.isConscious){const i=s.tickHeal;e.hp=Math.min(e.maxHP,e.hp+i),this.log(`${e.name} regenerates ${i} HP from ${s.name}`,"status")}if(s.tickDamage&&e.isConscious){const i=s.tickDamage*(a.stacks??1);e.hp=Math.max(0,e.hp-i),e.hp===0&&this._makeUnconscious(e),this.log(`${e.name} takes ${i} ${s.damageType??""} dmg from ${s.name}`,"status")}typeof a.duration=="number"&&(a.duration--,a.duration<=0&&(t.push(a.id),this.log(`${e.name}: ${s.name} expired`,"status")))}e.statusEffects=e.statusEffects.filter(a=>!t.includes(a.id))},log(e,t="combat"){const a={message:e,category:t,timestamp:Date.now(),round:this._state?.round??0};this._log.push(a),this._log.length>200&&this._log.shift(),f.event(`[${t}] ${e}`),this._emit("combat:log",a)},getLog(e=20){return this._log.slice(-e)},executeEnemyTurn(e){const t=e.aiProfile??"aggressive";if(e.isCompanion){this._executeCompanionTurn(e);return}const a=[...this._state.combatants.values()].filter(o=>o.isPlayer&&o.isConscious);if(!a.length){this.executePass();return}let s=a.reduce((o,r)=>{const c=b(e.col,e.row,r.col,r.row),d=b(e.col,e.row,o.col,o.row);return c<d?r:o});t==="aggressive"&&(s=a.reduce((o,r)=>o.hp<r.hp?o:r));const i=b(e.col,e.row,s.col,s.row);if(!this._state.moveTaken&&i>1){const o=Math.sign(s.col-e.col),r=Math.sign(s.row-e.row),c=e.col+o,d=e.row+r;this._getTileOccupant(c,d)||this.executeMove(c,d)}b(e.col,e.row,s.col,s.row)<=2&&!this._state.actionTaken?this.executeAttack(s.id):this._state.actionTaken||this.executePass()},_executeCompanionTurn(e){const t=[...this._state.combatants.values()].filter(n=>!n.isPlayer&&n.isConscious);if(!t.length){this.executePass();return}const a=t.reduce((n,o)=>{const r=b(e.col,e.row,o.col,o.row),c=b(e.col,e.row,n.col,n.row);return r<c?o:n}),s=b(e.col,e.row,a.col,a.row);if(!this._state.moveTaken&&s>1){const n=Math.sign(a.col-e.col),o=Math.sign(a.row-e.row),r=e.col+n,c=e.row+o;this._getTileOccupant(r,c)||this.executeMove(r,c)}b(e.col,e.row,a.col,a.row)<=1&&!this._state.actionTaken?this.executeAttack(a.id):this._state.actionTaken||this.executePass()},_wrapCharacter(e,t){return{id:e.id,name:e.name,isPlayer:!0,playerId:t+1,col:0,row:0,hp:e.hp??e.maxHP,maxHP:e.maxHP,mana:e.mana??e.maxMana,maxMana:e.maxMana,statusEffects:[],isDefending:!1,isConscious:(e.hp??e.maxHP)>0,initiative:0,attributes:{...e.attributes},equipment:e.equipment??{},skills:e.skills??{},skillTrees:e.skillTrees??[],skillCooldowns:{},startLevel:e.level,xpReward:0,loot:[],sourceChar:e}},_wrapEnemy(e){return{id:e.id,name:e.name,isPlayer:!1,isEnemy:!0,playerId:null,col:0,row:0,hp:e.hp??e.maxHP,maxHP:e.maxHP??e.hp,mana:e.mana??0,maxMana:e.maxMana??0,statusEffects:[],isDefending:!1,isConscious:!0,initiative:0,attributes:{...e.attributes},equipment:{},skills:{},skillTrees:[],skillCooldowns:{},xpReward:e.xpReward??10,loot:e.loot??[],aiProfile:e.aiProfile??"aggressive",weaponDamage:e.weaponDamage??{min:5,max:9},armor:e.armor??0,sourceChar:null}},_wrapCompanion(e,t){return{id:e.id,name:e.name,isPlayer:!0,isCompanion:!0,playerId:null,col:0,row:0,hp:e.hp??e.maxHP,maxHP:e.maxHP??e.hp,mana:0,maxMana:0,statusEffects:[],isDefending:!1,isConscious:(e.hp??e.maxHP)>0,initiative:0,attributes:{...e.attributes??{might:12,agility:12,intellect:8,wisdom:8,endurance:12,presence:8}},equipment:{},skills:e.inheritedSkills??{},skillTrees:e.inheritedSkillTrees??[],skillCooldowns:{},xpReward:0,loot:[],aiProfile:e.aiProfile??"companion",weaponDamage:e.weaponDamage??{min:4,max:8},armor:e.armor??0,sourceChar:e.sourceChar??null,summonerId:e.summonerId??null}},_rollInitiative(e){const t=this._rng,a=e.map(i=>{const n=x(i.attributes?.agility??10),o=$(t)+n;return i.initiative=o,{id:i.id,roll:o}});a.sort((i,n)=>n.roll-i.roll||i.id.localeCompare(n.id));const s=a.map(i=>`${this._state?.combatants?.get(i.id)?.name??i.id}(${i.roll})`).join(", ");return f.event(`[combat] Initiative: ${s}`),a.map(i=>i.id)},_resolveAttack(e,t){const a=this._rng,s=x(e.attributes?.agility??10),i=x(t.attributes?.agility??10),n=$(a)+s,o=10+i+(t.armor??0)+(t.isDefending?3:0);let r,c;n>=o+10?(r="crit",c=1.5):n>=o?(r="hit",c=1):n>=o-5?(r="glancing",c=.5):(r="miss",c=0);const d=this._getBaseDamage(e),u=Math.round(d*c),l=this._applyResistance(u,"physical",t);l>0&&(t.hp=Math.max(0,t.hp-l),t.hp===0&&this._makeUnconscious(t));const m=r==="miss"?`${e.name} attacks ${t.name}: roll=${n} dc=${o} -> Miss`:`${e.name} attacks ${t.name}: roll=${n} dc=${o} -> ${r}! ${l} dmg`;return this.log(m,"attack"),{outcome:r,roll:n,dc:o,damage:l,targetId:t.id}},_getBaseDamage(e){if(e.weaponDamage)return S(this._rng,e.weaponDamage.min,e.weaponDamage.max);const t=e.equipment?.weapon;if(t?.damage)return S(this._rng,t.damage.min??5,t.damage.max??10);const a=x(e.attributes?.might??10);return Math.max(1,3+a)},_applyResistance(e,t,a){return Math.max(0,e)},_resolveSkillTargets(e,t,a){const s=this._state,i=C.getAoEShape(e);if(e.targetingType==="self")return[t.id];if(e.targetingType==="aoe_all_enemies")return[...s.combatants.values()].filter(r=>r.isPlayer!==t.isPlayer&&r.isConscious).map(r=>r.id);if(e.targetingType==="aoe_all_allies")return[...s.combatants.values()].filter(r=>r.isPlayer===t.isPlayer&&r.isConscious&&r.id!==t.id).map(r=>r.id);if(!a)return[];if(!i||i.length===0)return[a];const n=s.combatants.get(a);if(!n)return[a];const o=new Set([a]);for(const{dx:r,dy:c}of i){if(r===0&&c===0)continue;const d=n.col+r,u=n.row+c,l=this._getTileOccupant(d,u);l&&l.isConscious&&l.isPlayer!==t.isPlayer&&o.add(l.id)}return[...o]},_getTileOccupant(e,t){if(!this._state)return null;for(const a of this._state.combatants.values())if(a.col===e&&a.row===t&&a.isConscious)return a;return null},_makeUnconscious(e){e.isConscious=!1,e.hp=0,this.log(`${e.name} is defeated!`,"death"),this._emit("combat:defeated",{combatantId:e.id})},_checkStatusCombos(e){const t=new Set(e.statusEffects.map(a=>a.id));for(const a of[...e.statusEffects]){const s=k.find(i=>i.id===a.id);if(s?.combos){for(const i of s.combos)if(i.withStatus&&t.has(i.withStatus)){this.log(`${e.name}: ${i.result} combo triggered!`,"combo"),i.removesBoth&&(e.statusEffects=e.statusEffects.filter(n=>n.id!==a.id&&n.id!==i.withStatus)),this.applyStatus(e,i.result,null);break}}}},_updatePhase(){if(!this._state)return;const e=this.getCurrentCombatant();this._state.phase=e?.isPlayer?"player_turn":"enemy_turn"},_canAct(){return this._state?.active===!0&&!this._state.phase?.includes("resolution")},_checkCombatEndInternal(){const{over:e,winner:t}=this.checkCombatEnd();e&&(this._state.active=!1,this._state.phase=t==="party"?"victory":"defeat",this.log(t==="party"?"Victory!":"Defeat...","system"),this._emit("combat:over",{winner:t}))}};typeof window<"u"&&(window.__combatSystem=h);const T="spellroads-combat-style";function W(){if(document.getElementById(T))return;const e=document.createElement("style");e.id=T,e.textContent=`
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
  `,document.head.appendChild(e)}function q(e){const t=(e.category??"").toLowerCase(),a=(e.message??"").toLowerCase();return t==="crit"||a.includes("critical")?"log-cat-crit":t==="miss"||a.includes(" misses")||a.includes("miss")?"log-cat-miss":t==="death"||a.includes("defeated")||a.includes("unconscious")?"log-cat-death":t==="status"||a.includes("status")||a.includes("poisoned")||a.includes("stunned")?"log-cat-status":t==="combo"||a.includes("combo")?"log-cat-combo":t==="skill"||a.includes("casts")||a.includes("uses")?"log-cat-skill":t==="heal"||a.includes("heals")||a.includes("restored")?"log-cat-heal":t==="system"||t==="round"||t==="start"||t==="end"?"log-cat-system":t==="attack"||a.includes("attack")||a.includes("hits")?"log-cat-attack":"log-cat-default"}function M(e,t){const a=t>0?Math.max(0,Math.min(1,e/t)):0,s=a<=.25?"critical":a<=.5?"low":"";return{pct:a,cls:s}}class Z{constructor(){this._el=null,this._gridEl=null,this._logEl=null,this._actionEl=null,this._turnBarEl=null,this._skillsPopup=null,this._endOverlay=null,this._mode="idle",this._unsubscribe=null,this._enemyTurnTimer=null,this._prevScene="worldMap",this._lastTurnOrder=[]}async init({renderer:t,partyChars:a,enemies:s,environment:i,regionLevel:n,fromScene:o}={}){if(f.info("[combat] CombatScene init"),this._prevScene=o??"worldMap",W(),!a||!a.length)try{a=A.getAll().filter(d=>d.isHero).slice(0,4)}catch{f.warn("[combat] CharacterSystem.getAll failed, using empty party"),a=[]}if(!s||!s.length)try{s=w.generateEncounter(n??1,i??"forest")}catch(d){f.warn(`[combat] EnemySystem.generateEncounter failed: ${d.message}`);try{const u=w.createInstance("orc_grunt",1);s=u?[u]:[]}catch(u){f.warn(`[combat] EnemySystem.createInstance also failed: ${u.message}`),s=[]}}this._buildDOM();const r=document.getElementById("ui-overlay");r?r.appendChild(this._el):(document.body.appendChild(this._el),f.warn("[combat] #ui-overlay not found, appended to body")),this._unsubscribe=h.subscribe((d,u)=>{this._onCombatEvent(d,u)}),window.__combatSystem=h,h.startCombat(a,s,{environment:i,regionLevel:n}),f.info(`[combat] startCombat: ${a.length} heroes vs ${s.length} enemies`),this._renderAll();const c=h.getCurrentCombatant();c&&!c.isPlayer&&this._scheduleEnemyTurn()}update(t){}async destroy(){clearTimeout(this._enemyTurnTimer),this._unsubscribe?.(),this._el?.remove(),this._el=null,window.__combatSystem=void 0,f.info("[combat] CombatScene destroyed")}_buildDOM(){const t=document.createElement("div");t.id="combat-scene";const a=document.createElement("div");a.id="combat-turn-bar",this._turnBarEl=a;const s=document.createElement("div");s.id="combat-main";const i=document.createElement("div");i.id="combat-grid-wrap";const n=document.createElement("div");n.id="combat-grid",this._gridEl=n,i.appendChild(n);const o=document.createElement("div");o.id="combat-log",o.innerHTML='<div id="combat-log-title">Combat Log</div><div id="combat-log-entries"></div>',this._logEl=o.querySelector("#combat-log-entries"),s.appendChild(i),s.appendChild(o);const r=document.createElement("div");r.id="combat-actions",this._actionEl=r;const c=document.createElement("div");c.id="combat-skills-popup",this._skillsPopup=c;const d=document.createElement("div");d.id="combat-end-overlay",this._endOverlay=d,t.appendChild(a),t.appendChild(s),t.appendChild(r),t.appendChild(c),t.appendChild(d),t.style.position="fixed",this._el=t}_renderAll(){this._renderTurnBar(),this._renderGrid(),this._renderActions(),this._renderLog()}_getPlayerNumber(t){try{const a=window.__coopSystem;if(!a||typeof a.getAssignments!="function")return null;const s=a.getAssignments();if(!s)return null;const i=s instanceof Map?s.entries():Object.entries(s);for(const[n,o]of i)if(o===t)return parseInt(n,10)+1}catch{}return null}_renderTurnBar(){if(!this._turnBarEl)return;const t=this._safeGetState();if(!t)return;const{turnOrder:a=[],combatants:s}=t;this._lastTurnOrder=a;const n=(h.getCurrentCombatant?.()??null)?.id??null,o=a.map(c=>{const d=s?.get?s.get(c):s?.[c];if(!d)return"";const{pct:u,cls:l}=M(d.hp??0,d.maxHP??1),m=Math.round(u*100),p=c===n,g=!d.isConscious,_=d.isPlayer?"":"enemy",D=["turn-chip",p?"is-current":"",g?"is-dead":""].filter(Boolean).join(" "),B=(d.name??"Unknown").substring(0,10);let E="";if(d.isPlayer){const y=this._getPlayerNumber(d.id??c);y!=null&&(E=`<span class="chip-player-badge ${`p${y}`}">P${y}</span>`)}return`
        <div class="${D}" title="${d.name??""}">
          <span class="chip-name ${_}">${B}</span>
          ${E}
          <div class="chip-hp-bar">
            <div class="chip-hp-fill ${l}" style="width:${m}%"></div>
          </div>
        </div>
      `});this._turnBarEl.innerHTML=o.join(""),this._turnBarEl.querySelector(".turn-chip.is-current")?.scrollIntoView?.({behavior:"smooth",inline:"center",block:"nearest"})}_renderGrid(){if(!this._gridEl)return;const t=this._safeGetState(),a=h.getCurrentCombatant?.()??null,s=new Map;if(t?.combatants){const i=t.combatants instanceof Map?t.combatants.entries():Object.entries(t.combatants);for(const[,n]of i)n.col!=null&&n.row!=null&&s.set(`${n.col},${n.row}`,n)}this._gridEl.innerHTML="";for(let i=0;i<4;i++)for(let n=0;n<8;n++){const o=this._buildTile(n,i,s,a);this._gridEl.appendChild(o)}}_buildTile(t,a,s,i){const n=document.createElement("div"),r=t<4?"party-side":"enemy-side";if(n.className=`combat-tile ${r}`,n.dataset.col=t,n.dataset.row=a,this._mode==="select_move")s.get(`${t},${a}`)||n.classList.add("move-target");else if(this._mode==="select_attack_target"){const d=s.get(`${t},${a}`);d&&!d.isPlayer&&d.isConscious!==!1&&n.classList.add("attack-target")}const c=s.get(`${t},${a}`);if(c){n.appendChild(this._buildAvatar(c,i));const{pct:d,cls:u}=M(c.hp??0,c.maxHP??1),l=document.createElement("div");l.className="tile-hp-bar",l.innerHTML=`<div class="tile-hp-fill ${u}" style="width:${Math.round(d*100)}%"></div>`,n.appendChild(l);const m=c.statusEffects??[];if(m.length>0){const p=document.createElement("div");p.className="tile-status",m.slice(0,4).forEach(g=>{const _=document.createElement("span");_.className="status-pip",_.title=g.name??g.id??g,_.style.background=this._statusColor(g),p.appendChild(_)}),n.appendChild(p)}}return n.addEventListener("click",()=>this._onTileClick(t,a)),n}_buildAvatar(t,a){const s=document.createElement("div"),i=a&&t.id===a.id,n=t.isConscious===!1,o=(t.statusEffects??[]).some(d=>(d.id??d)==="defending"||(d.name??"")==="Defending"),r=["combatant-avatar",t.isPlayer?"":"enemy",i?"current-turn":"",o?"defending":"",n?"unconscious":""].filter(Boolean).join(" ");s.className=r;const c=(t.name??"?").charAt(0).toUpperCase();return s.textContent=c,s.title=`${t.name} — HP: ${t.hp??"?"}/${t.maxHP??"?"}`,s}_statusColor(t){const a=(t.id??t).toString().toLowerCase();return a.includes("poison")?"#40d040":a.includes("burn")||a.includes("fire")?"#e06020":a.includes("stun")||a.includes("daze")?"#e0e020":a.includes("freeze")||a.includes("cold")?"#60c0e8":a.includes("defend")?"#4080c0":a.includes("bleed")?"#c02020":a.includes("regen")||a.includes("heal")?"#40c060":"#a09070"}_renderLog(){if(!this._logEl)return;let t=[];try{t=h.getLog(20)??[]}catch{}const a=t.slice(-10);let s=null;const i=a.map(n=>{let o="";n.round!=null&&n.round!==s&&(s=n.round,o=`<div class="log-round-sep">— Round ${n.round} —</div>`);const r=q(n),c=this._escapeHtml(n.message??"");return`${o}<div class="log-entry ${r}">${c}</div>`}).join("");this._logEl.innerHTML=i,this._logEl.scrollTop=this._logEl.scrollHeight}_renderActions(){if(!this._actionEl)return;const t=this._safeGetState();if(this._actionEl.innerHTML="",!t?.active){this._actionEl.innerHTML='<span class="action-label">Combat ended</span>';return}const a=h.getCurrentCombatant?.()??null;if(!a)return;if(!a.isPlayer){this._actionEl.innerHTML=`
        <div class="combat-enemy-thinking">
          <span>${a.name??"Enemy"} is acting</span>
          <span class="thinking-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      `;return}const{actionTaken:s=!1,moveTaken:i=!1}=t,n=document.createElement("span");if(n.className="action-label",n.textContent=`${a.name}'s turn:`,this._actionEl.appendChild(n),s){const u=this._makeBtn("End Turn","end-turn",()=>{this._mode="idle",this._closeSkillsPopup(),this._scheduleNextTurn()});this._actionEl.appendChild(u);return}if(!i){const u=this._makeBtn("Move","",()=>{this._mode=this._mode==="select_move"?"idle":"select_move",this._closeSkillsPopup(),this._renderGrid()});this._mode==="select_move"&&(u.style.borderColor="#40a060"),this._actionEl.appendChild(u)}const o=this._makeBtn("Attack","",()=>{this._mode=this._mode==="select_attack_target"?"idle":"select_attack_target",this._closeSkillsPopup(),this._renderGrid()});this._mode==="select_attack_target"&&(o.style.borderColor="#c83020"),this._actionEl.appendChild(o);const r=this._makeBtn("Skills","",()=>{this._toggleSkillsPopup(a)});this._actionEl.appendChild(r);const c=this._makeBtn("Defend","",()=>{this._closeSkillsPopup(),this._mode="idle";try{h.executeDefend()}catch(u){f.warn(`[combat] executeDefend: ${u.message}`)}this._renderAll(),this._scheduleNextTurn()});this._actionEl.appendChild(c);const d=this._makeBtn("Pass","",()=>{this._closeSkillsPopup(),this._mode="idle";try{h.executePass()}catch(u){f.warn(`[combat] executePass: ${u.message}`)}this._renderAll(),this._scheduleNextTurn()});this._actionEl.appendChild(d)}_makeBtn(t,a,s){const i=document.createElement("button");return i.className=["combat-btn",a].filter(Boolean).join(" "),i.textContent=t,i.addEventListener("click",s),i}_toggleSkillsPopup(t){if(!this._skillsPopup)return;if(this._skillsPopup.classList.contains("visible")){this._closeSkillsPopup();return}this._buildSkillsPopup(t),this._skillsPopup.classList.add("visible")}_closeSkillsPopup(){this._skillsPopup?.classList.remove("visible")}_buildSkillsPopup(t){if(!this._skillsPopup)return;const a=t?.skills??t?.knownSkills??[];let s=`<div class="skills-popup-title">Skills — ${t?.name??""}</div>`;a.length?s+=a.slice(0,8).map(i=>{const n=i.name??i.skillId??i.id??"Unknown",o=i.manaCost?`${i.manaCost} MP`:"";return`
          <div class="skill-entry" data-tree="${i.treeId??""}" data-skill="${i.skillId??i.id??""}">
            <span class="skill-name">${this._escapeHtml(n)}</span>
            ${o?`<span class="skill-cost">${o}</span>`:""}
          </div>
        `}).join(""):s+='<div class="skill-empty">No skills known</div>',this._skillsPopup.innerHTML=s,this._skillsPopup.querySelectorAll(".skill-entry").forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.tree,o=i.dataset.skill;this._closeSkillsPopup(),this._mode="idle";const r=this._safeGetState();let c=null;r?.combatants&&(c=(r.combatants instanceof Map?[...r.combatants.values()]:Object.values(r.combatants)).find(l=>!l.isPlayer&&l.isConscious!==!1)?.id??null);try{const d=h.executeSkill(n,o,c);f.event(`[combat] Skill used; tree=${n} skill=${o} success=${d?.success}`)}catch(d){f.warn(`[combat] executeSkill error: ${d.message}`)}this._renderAll(),this._scheduleNextTurn()})})}_onTileClick(t,a){if(this._mode==="select_attack_target"){const s=this._getOccupant(t,a);if(!s||s.isPlayer||s.isConscious===!1)return;let i;try{i=h.executeAttack(s.id)}catch(n){f.warn(`[combat] executeAttack error: ${n.message}`);return}i?.success&&(this._showDamageFloat(t,a,i.outcome,i.damage),f.event(`[combat] attack; target=${s.id} damage=${i.damage} outcome=${i.outcome}`)),this._mode="idle",this._renderAll(),this._scheduleNextTurn()}else if(this._mode==="select_move"){if(this._getOccupant(t,a))return;let i;try{i=h.executeMove(t,a)}catch(n){f.warn(`[combat] executeMove error: ${n.message}`);return}i?.success&&f.event(`[combat] move; col=${t} row=${a}`),this._mode="idle",this._renderAll()}}_scheduleNextTurn(){try{const{over:t,winner:a}=h.checkCombatEnd();if(t){setTimeout(()=>this._showEndScreen({winner:a}),800);return}}catch{}setTimeout(()=>{let t=null;try{t=h.nextTurn()}catch{}this._renderAll(),t&&!t.isPlayer&&this._scheduleEnemyTurn()},300)}_scheduleEnemyTurn(){const t=420+Math.random()*380;this._enemyTurnTimer=setTimeout(()=>{const a=h.getCurrentCombatant?.()??null;if(!(!a||a.isPlayer)){f.event(`[combat] enemy turn; id=${a.id} name=${a.name}`);try{h.executeEnemyTurn(a)}catch(s){f.warn(`[combat] executeEnemyTurn failed, falling back: ${s.message}`),this._fallbackEnemyAction(a)}this._renderAll();try{const{over:s,winner:i}=h.checkCombatEnd();if(s){setTimeout(()=>this._showEndScreen({winner:i}),500);return}}catch{}this._scheduleNextTurn()}},t)}_fallbackEnemyAction(t){const a=this._safeGetState();if(!a?.combatants)return;const i=(a.combatants instanceof Map?[...a.combatants.values()]:Object.values(a.combatants)).find(n=>n.isPlayer&&n.isConscious!==!1);if(i)try{h.executeAttack(i.id)}catch{}}_onCombatEvent(t,a){f.event(`[combat] event; type=${t}`),t==="combat:over"?(this._renderAll(),setTimeout(()=>this._showEndScreen(a??{}),800)):t==="combat:attack"||t==="combat:skill"?this._renderAll():this._renderAll()}_showEndScreen(t){let a=t;try{a=h.endCombat()??t}catch{}const s=a?.winner??t?.winner,i=a?.xp??{},n=a?.loot??[],o=a?.levelUps??[];if(f.info(`[combat] combat over; winner=${s}`),!this._endOverlay)return;const r=s==="party",c=r?"VICTORY":"DEFEAT",d=r?"victory":"defeat",u=Object.entries(i).map(([p,g])=>`
      <div class="end-xp-row">
        <span>${this._escapeHtml(p)}</span>
        <span class="end-xp-value">+${g} XP</span>
      </div>
    `).join(""),l=o.map(p=>`
      <div class="end-levelup">${this._escapeHtml(p.name??p.charId??"")} leveled up to ${p.newLevel??"?"}!</div>
    `).join(""),m=n.length?n.map(p=>`<div class="end-loot-item">${this._escapeHtml(p.name??p.itemId??p)}</div>`).join(""):'<div class="end-loot-item" style="color:#706050;font-style:italic;">No loot</div>';this._endOverlay.innerHTML=`
      <div class="end-headline ${d}">${c}</div>
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
    `,this._endOverlay.classList.add("visible"),document.getElementById("combat-continue-btn")?.addEventListener("click",()=>{f.info(`[combat] continue; returning to ${this._prevScene}`),I.transition(this._prevScene)})}_showDamageFloat(t,a,s,i){if(!this._gridEl)return;const n=this._gridEl.querySelector(`[data-col="${t}"][data-row="${a}"]`);if(!n)return;const o=document.createElement("div");let r="",c="dmg";s==="miss"||s==="dodge"?(r="MISS",c="miss"):s==="crit"?(r=i!=null?`CRIT ${i}!`:"CRIT!",c="crit"):(r=i!=null?String(i):"HIT",c="dmg"),o.className=`dmg-float ${c}`,o.textContent=r,o.style.pointerEvents="none",n.appendChild(o),o.addEventListener("animationend",()=>o.remove(),{once:!0})}_safeGetState(){try{return h.getState()}catch{return null}}_getOccupant(t,a){const s=this._safeGetState();return s?.combatants?(s.combatants instanceof Map?[...s.combatants.values()]:Object.values(s.combatants)).find(n=>n.col===t&&n.row===a)??null:null}_escapeHtml(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}export{Z as default};
//# sourceMappingURL=CombatScene-D01zTjK4.js.map
