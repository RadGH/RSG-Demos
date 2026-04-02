import{D as E,S as P,U as I,b as d,F as G}from"./main-DuN4PVib.js";const F=[{id:"farmer",name:"Farmer",description:"Hard life on a farm, learning to work with the land.",type:"childhood",bonuses:{endurance:1},proficiencies:["Foraging"],bonusText:"+1 Endurance, Foraging proficiency"},{id:"merchants_child",name:"Merchant's Child",description:"Traveled trade routes with your merchant parents.",type:"childhood",bonuses:{presence:1},proficiencies:[],bonusText:"+1 Presence, start with 50 extra gold"},{id:"noble_heir",name:"Noble Heir",description:"Raised in a noble household with access to fine tutors.",type:"childhood",bonuses:{presence:1},proficiencies:["History"],bonusText:"+1 Presence, +1 History, start with fine clothes"},{id:"street_urchin",name:"Street Urchin",description:"Grew up on the streets, surviving by wits.",type:"childhood",bonuses:{agility:1},proficiencies:["Stealth"],bonusText:"+1 Agility, +1 Stealth proficiency"},{id:"apprentice_mage",name:"Apprentice Mage",description:"Apprenticed to a wandering wizard from an early age.",type:"childhood",bonuses:{intellect:1},proficiencies:[],bonusText:"+1 Intellect, start with spell scroll x2"},{id:"fishers_child",name:"Fisher's Child",description:"Grew up on the water, learning to read weather and waves.",type:"childhood",bonuses:{wisdom:1},proficiencies:[],bonusText:"+1 Wisdom, boat travel 10% faster"},{id:"blacksmiths_child",name:"Blacksmith's Child",description:"Grew up in the forge, learning metalwork from a young age.",type:"childhood",bonuses:{might:1},proficiencies:[],bonusText:"+1 Might, start with repair kit x2"},{id:"forest_child",name:"Forest Child",description:"Raised among the trees, learning the wild's secrets.",type:"childhood",bonuses:{wisdom:1},proficiencies:["Survival"],bonusText:"+1 Wisdom, +1 Survival proficiency"},{id:"orphan_streets",name:"Orphan of the Streets",description:"Raised by no one, you learned to fend for yourself among the city's forgotten.",type:"childhood",bonuses:{agility:1,intellect:1},proficiencies:["Sleight of Hand"],bonusText:"+1 Agility, +1 Intellect, Sleight of Hand proficiency"},{id:"noble_ward",name:"Noble Ward",description:"Raised as a ward of a noble family, you received education far above your station.",type:"childhood",bonuses:{presence:1,intellect:1},proficiencies:["History"],bonusText:"+1 Presence, +1 Intellect, History proficiency"},{id:"monastery_child",name:"Monastery Child",description:"Raised in a monastery, you learned discipline, scripture, and quiet contemplation.",type:"childhood",bonuses:{wisdom:1,intellect:1},proficiencies:["Religion"],bonusText:"+1 Wisdom, +1 Intellect, Religion proficiency"},{id:"sea_child",name:"Sea Child",description:"You grew up on a fishing boat, hauling nets and reading the tides.",type:"childhood",bonuses:{might:1,endurance:1},proficiencies:["Athletics"],bonusText:"+1 Might, +1 Endurance, Athletics proficiency"},{id:"farmstead",name:"Farmstead",description:"A hard life on a remote farmstead taught you the rhythms of the land.",type:"childhood",bonuses:{endurance:1,might:1},proficiencies:["Nature"],bonusText:"+1 Endurance, +1 Might, Nature proficiency"},{id:"merchant_family",name:"Merchant Family",description:"Traveling with merchant parents across many roads taught you to negotiate and charm.",type:"childhood",bonuses:{presence:1,intellect:1},proficiencies:["Persuasion"],bonusText:"+1 Presence, +1 Intellect, Persuasion proficiency"},{id:"soldier_ward",name:"Soldier's Ward",description:"Raised in a military camp, you learned discipline and the ways of war from childhood.",type:"childhood",bonuses:{might:1,endurance:1},proficiencies:["Intimidation"],bonusText:"+1 Might, +1 Endurance, Intimidation proficiency"},{id:"hedge_witch_apprentice",name:"Hedge-Witch's Apprentice",description:"Raised by a village wise-woman, you learned herb lore, spirit-sight, and old magic.",type:"childhood",bonuses:{wisdom:1,intellect:1},proficiencies:["Arcana"],bonusText:"+1 Wisdom, +1 Intellect, Arcana proficiency"}],q=[{id:"soldier",name:"Soldier",description:"Served in a lord's army before taking up the adventuring life.",type:"adulthood",bonuses:{might:1},proficiencies:[],startingGold:0,bonusText:"+1 Might or Agility, start with sword + shield"},{id:"mercenary",name:"Mercenary",description:"Fought for coin with no allegiance but the highest bidder.",type:"adulthood",bonuses:{might:1},proficiencies:[],startingGold:50,bonusText:"+1 Might, +50 gold, higher initial NPC attitude"},{id:"scholar",name:"Scholar",description:"Spent years in libraries and academies before the road called.",type:"adulthood",bonuses:{intellect:1},proficiencies:[],startingGold:0,bonusText:"+1 Intellect, start with tome (+1 to one skill)"},{id:"healer",name:"Healer",description:"Practiced the healing arts in a village or monastery.",type:"adulthood",bonuses:{wisdom:1},proficiencies:[],startingGold:0,bonusText:"+1 Wisdom, start with healing potions x3"},{id:"skald",name:"Skald",description:"Traveled the roads as a bard and poet, spreading tales of glory.",type:"adulthood",bonuses:{presence:1},proficiencies:[],startingGold:0,bonusText:"+1 Presence, party fame starts at +25"},{id:"thief",name:"Thief",description:"Made a living in the shadows, picking pockets and breaking locks.",type:"adulthood",bonuses:{agility:1},proficiencies:[],startingGold:0,bonusText:"+1 Agility, start with lockpick + dagger"},{id:"ranger",name:"Ranger",description:"Patrolled the wilds, tracking beasts and bandits alike.",type:"adulthood",bonuses:{wisdom:1},proficiencies:[],startingGold:0,bonusText:"+1 Wisdom or Agility, start with bow + quiver"},{id:"sea_captain",name:"Sea Captain",description:"Commanded a vessel across the northern seas.",type:"adulthood",bonuses:{presence:1},proficiencies:[],startingGold:0,bonusText:"Unlocks boat routes at start, +1 Presence"},{id:"runecarver",name:"Runecarver",description:"Carved sacred runes for temples and warriors.",type:"adulthood",bonuses:{intellect:1},proficiencies:[],startingGold:0,bonusText:"+1 Intellect, start with rune scroll x2"},{id:"caravan_guard",name:"Caravan Guard",description:"Protected merchant caravans on dangerous roads.",type:"adulthood",bonuses:{},proficiencies:[],startingGold:0,bonusText:"Start with wagon + horse"},{id:"sellsword",name:"Sellsword",description:"A hardened mercenary who sold their blade to any lord with coin.",type:"adulthood",bonuses:{might:2},proficiencies:["Weapons"],startingGold:50,bonusText:"+2 Might or Agility, 50 bonus gold, Weapon proficiency"},{id:"hedge_mage",name:"Hedge Mage",description:"A self-taught spellcaster who learned magic from old tomes and trial-and-error.",type:"adulthood",bonuses:{intellect:2},proficiencies:["Arcana"],startingGold:0,bonusText:"+2 Intellect or Wisdom, Arcana proficiency, Ritual Caster feat"},{id:"sailor",name:"Sailor",description:"Seasoned by years on the open sea, you're at home on any vessel.",type:"adulthood",bonuses:{might:1,agility:1},proficiencies:["Navigation"],startingGold:20,bonusText:"+1 Might, +1 Agility, Navigation expertise, 20 bonus gold"},{id:"thief_guild",name:"Guild Thief",description:"A former member of a thieves' guild, trained in infiltration and subterfuge.",type:"adulthood",bonuses:{agility:2},proficiencies:["Thieves Tools","Stealth"],startingGold:0,bonusText:"+2 Agility, Thieves Tools, Stealth expertise"},{id:"herbalist",name:"Herbalist",description:"The village healer, tending to the sick and wounded with plants and poultices.",type:"adulthood",bonuses:{wisdom:1,intellect:1},proficiencies:["Medicine"],startingGold:0,bonusText:"+1 Wisdom, +1 Intellect, Medicine proficiency, start with Healing Kit"},{id:"runesmith",name:"Runesmith",description:"An apprentice runecarver who imbued weapons and armor with ancient power.",type:"adulthood",bonuses:{intellect:1,wisdom:1},proficiencies:["Rune Lore"],startingGold:30,bonusText:"+1 Intellect, +1 Wisdom, Rune Lore proficiency, 30 bonus gold"},{id:"wandering_skald",name:"Wandering Skald",description:"A traveling bard-poet who traded in stories, songs, and news across the realm.",type:"adulthood",bonuses:{presence:1,intellect:1},proficiencies:["Performance"],startingGold:25,bonusText:"+1 Presence, +1 Intellect, Performance proficiency, 25 bonus gold"},{id:"berserker_clan",name:"Berserker Clan",description:"A former warrior of a berserker clan, trained to enter battle rage and fear nothing.",type:"adulthood",bonuses:{might:2,endurance:1},proficiencies:[],startingGold:15,bonusText:"+2 Might, +1 Endurance, Rage ability hint, 15 bonus gold"}],H={childhood:F,adulthood:q},$="spellroads-charcreate-style";function O(){if(document.getElementById($))return;const x=document.createElement("style");x.id=$,x.textContent=`
    /* ── CharCreate Panel ─────────────────────────────────────────── */
    #panel-char-create {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: none;
      align-items: stretch;
      background: rgba(8, 6, 4, 0.96);
      pointer-events: none;
      flex-direction: column;
    }
    #panel-char-create.visible {
      display: flex;
    }

    .cc-root {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      pointer-events: auto;
      font-family: "Segoe UI", system-ui, sans-serif;
      color: #d4c090;
      overflow: hidden;
    }

    /* ── Step indicator ─────────────────────────────────────────────── */
    .cc-steps {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(6px, 1.5vw, 14px);
      padding: clamp(10px, 2vh, 18px) 16px;
      background: rgba(0,0,0,0.4);
      border-bottom: 1px solid rgba(200, 160, 32, 0.2);
      flex-shrink: 0;
    }
    .cc-step-dot {
      width: clamp(26px, 4vw, 36px);
      height: clamp(26px, 4vw, 36px);
      border-radius: 50%;
      border: 2px solid rgba(200, 160, 32, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(0.6rem, 1.2vw, 0.78rem);
      font-weight: 600;
      color: #6a5a3a;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .cc-step-dot.active {
      border-color: #c8a020;
      color: #c8a020;
      background: rgba(200, 160, 32, 0.12);
      box-shadow: 0 0 10px rgba(200, 160, 32, 0.3);
    }
    .cc-step-dot.done {
      border-color: rgba(200, 160, 32, 0.5);
      color: #8a7030;
      background: rgba(200, 160, 32, 0.06);
    }
    .cc-step-label {
      font-size: clamp(0.55rem, 1vw, 0.7rem);
      color: #6a5a3a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      white-space: nowrap;
    }
    .cc-step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .cc-step-item.active .cc-step-label { color: #c8a020; }

    /* ── Content area ──────────────────────────────────────────────── */
    .cc-content {
      flex: 1;
      display: flex;
      overflow: hidden;
      min-height: 0;
    }
    .cc-main {
      flex: 1;
      overflow-y: auto;
      padding: clamp(16px, 3vh, 28px) clamp(16px, 3vw, 32px);
      min-height: 0;
    }
    .cc-side {
      width: clamp(200px, 28vw, 320px);
      background: rgba(0,0,0,0.3);
      border-left: 1px solid rgba(200,160,32,0.15);
      padding: clamp(12px, 2vh, 20px);
      overflow-y: auto;
      flex-shrink: 0;
    }
    @media (max-width: 767px) {
      .cc-content { flex-direction: column; }
      .cc-side {
        width: 100%;
        border-left: none;
        border-top: 1px solid rgba(200,160,32,0.15);
        max-height: 35vh;
      }
    }

    /* ── Step title ────────────────────────────────────────────────── */
    .cc-step-title {
      font-size: clamp(1rem, 2.5vw, 1.5rem);
      font-weight: 700;
      color: #c8a020;
      margin: 0 0 clamp(8px, 1.5vh, 16px) 0;
      letter-spacing: 0.08em;
    }
    .cc-step-desc {
      font-size: clamp(0.75rem, 1.4vw, 0.9rem);
      color: #8a7a50;
      margin: 0 0 clamp(12px, 2.5vh, 24px) 0;
    }

    /* ── Race grid ─────────────────────────────────────────────────── */
    .cc-race-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(120px, 18vw, 160px), 1fr));
      gap: clamp(8px, 1.5vw, 14px);
    }
    .cc-race-card {
      border: 1px solid rgba(200,160,32,0.2);
      border-radius: 4px;
      padding: clamp(8px, 1.5vw, 14px);
      cursor: pointer;
      transition: all 0.15s;
      background: rgba(200,160,32,0.04);
      min-height: 44px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      outline: none;
    }
    .cc-race-card:focus,
    .cc-race-card:hover {
      border-color: rgba(200,160,32,0.6);
      background: rgba(200,160,32,0.1);
      box-shadow: 0 0 10px rgba(200,160,32,0.2);
    }
    .cc-race-card.selected {
      border-color: #c8a020;
      background: rgba(200,160,32,0.15);
      box-shadow: 0 0 14px rgba(200,160,32,0.35);
    }
    .cc-race-card.locked {
      opacity: 0.45;
      cursor: default;
    }
    .cc-race-name {
      font-size: clamp(0.78rem, 1.4vw, 0.92rem);
      font-weight: 600;
      color: #d4b870;
    }
    .cc-race-rarity {
      font-size: clamp(0.58rem, 1vw, 0.7rem);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .cc-race-rarity.common    { color: #7a8a5a; }
    .cc-race-rarity.uncommon  { color: #5a9a7a; }
    .cc-race-rarity.rare      { color: #6a5aaa; }
    .cc-race-rarity.legendary { color: #aa8a2a; }
    .cc-race-bonuses {
      font-size: clamp(0.6rem, 1vw, 0.72rem);
      color: #6a7a5a;
    }
    .cc-lock-icon { font-size: 0.8rem; color: #5a4a2a; }

    /* ── Side panel preview ────────────────────────────────────────── */
    .cc-preview-title {
      font-size: clamp(0.82rem, 1.5vw, 0.98rem);
      font-weight: 700;
      color: #c8a020;
      margin: 0 0 8px 0;
    }
    .cc-preview-section {
      font-size: clamp(0.68rem, 1.2vw, 0.8rem);
      color: #8a7a50;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .cc-preview-trait {
      margin-bottom: 8px;
    }
    .cc-preview-trait-name {
      font-size: clamp(0.7rem, 1.2vw, 0.82rem);
      color: #b0983a;
      font-weight: 600;
    }
    .cc-preview-trait-desc {
      font-size: clamp(0.62rem, 1.1vw, 0.74rem);
      color: #7a6a40;
    }
    .cc-attr-row {
      display: flex;
      justify-content: space-between;
      font-size: clamp(0.65rem, 1.1vw, 0.78rem);
      margin-bottom: 3px;
    }
    .cc-attr-label { color: #8a7a50; }
    .cc-attr-val   { color: #c8a020; font-weight: 600; }
    .cc-attr-val.bonus  { color: #6ab06a; }
    .cc-attr-val.malus  { color: #b06a6a; }

    /* ── Attribute step ────────────────────────────────────────────── */
    .cc-attrs-table {
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      gap: 8px clamp(10px, 2vw, 20px);
      align-items: center;
      margin-bottom: 20px;
    }
    .cc-attr-head { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; color: #6a5a3a; font-weight: 600; }
    .cc-attr-name { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #d4c090; }
    .cc-attr-base { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #8a7a50; text-align: center; }
    .cc-attr-bonus-cell { font-size: clamp(0.78rem, 1.3vw, 0.9rem); text-align: center; }
    .cc-attr-total-cell { font-size: clamp(0.82rem, 1.4vw, 0.95rem); font-weight: 700; color: #c8a020; text-align: center; }

    .cc-free-point-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(200,160,32,0.07);
      border: 1px solid rgba(200,160,32,0.25);
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .cc-free-point-label { font-size: clamp(0.75rem, 1.3vw, 0.88rem); color: #d4b870; }
    .cc-free-point-select {
      background: rgba(10,8,4,0.8);
      border: 1px solid rgba(200,160,32,0.4);
      color: #c8a020;
      padding: 6px 10px;
      border-radius: 3px;
      font-size: clamp(0.75rem, 1.3vw, 0.88rem);
      min-height: 44px;
    }

    /* ── Appearance step ───────────────────────────────────────────── */
    .cc-appearance-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
      margin-bottom: 20px;
    }
    .cc-body-card {
      border: 1px solid rgba(200,160,32,0.2);
      border-radius: 4px;
      padding: 12px 8px;
      cursor: pointer;
      text-align: center;
      min-height: 60px;
      font-size: clamp(0.7rem, 1.2vw, 0.82rem);
      color: #8a7a50;
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      outline: none;
    }
    .cc-body-card:focus,
    .cc-body-card:hover { border-color: rgba(200,160,32,0.5); color: #c8a020; }
    .cc-body-card.selected { border-color: #c8a020; background: rgba(200,160,32,0.12); color: #e8c040; }
    .cc-body-icon { font-size: 1.6rem; margin-bottom: 4px; display: block; }

    .cc-name-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .cc-name-label { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #8a7a50; white-space: nowrap; }
    .cc-name-input {
      flex: 1;
      background: rgba(10,8,4,0.8);
      border: 1px solid rgba(200,160,32,0.3);
      color: #d4c090;
      padding: 8px 12px;
      border-radius: 3px;
      font-size: 16px;
      min-height: 44px;
      outline: none;
    }
    .cc-name-input:focus { border-color: #c8a020; }
    .cc-name-input.error { border-color: #c05050; }
    .cc-dice-btn {
      background: rgba(200,160,32,0.08);
      border: 1px solid rgba(200,160,32,0.3);
      color: #c8a020;
      font-size: 1.2rem;
      border-radius: 3px;
      cursor: pointer;
      min-width: 44px;
      min-height: 44px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
      outline: none;
      flex-shrink: 0;
    }
    .cc-dice-btn:hover, .cc-dice-btn:focus {
      background: rgba(200,160,32,0.18);
      border-color: rgba(200,160,32,0.65);
    }
    .cc-validation-error {
      color: #e05050;
      font-size: clamp(0.72rem, 1.2vw, 0.84rem);
      margin: 6px 0 0 0;
      font-weight: 600;
    }

    .cc-color-row {
      display: flex;
      align-items: center;
      gap: clamp(8px, 1.5vw, 16px);
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .cc-color-label { font-size: clamp(0.72rem, 1.2vw, 0.84rem); color: #8a7a50; width: 100px; }
    .cc-swatch-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .cc-swatch {
      width: clamp(28px, 4vw, 36px);
      height: clamp(28px, 4vw, 36px);
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.15s;
      outline: none;
    }
    .cc-swatch:focus, .cc-swatch:hover { transform: scale(1.15); }
    .cc-swatch.selected { border-color: #c8a020; box-shadow: 0 0 6px rgba(200,160,32,0.5); }

    /* ── Background step ───────────────────────────────────────────── */
    .cc-bg-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(130px, 18vw, 175px), 1fr));
      gap: clamp(8px, 1.5vw, 12px);
      margin-bottom: 20px;
    }
    .cc-bg-card {
      border: 1px solid rgba(200,160,32,0.2);
      border-radius: 4px;
      padding: clamp(8px, 1.5vw, 12px);
      cursor: pointer;
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      min-height: 44px;
      outline: none;
    }
    .cc-bg-card:focus, .cc-bg-card:hover { border-color: rgba(200,160,32,0.55); background: rgba(200,160,32,0.08); }
    .cc-bg-card.selected { border-color: #c8a020; background: rgba(200,160,32,0.14); }
    .cc-bg-name { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #d4b870; font-weight: 600; margin-bottom: 3px; }
    .cc-bg-bonus { font-size: clamp(0.62rem, 1vw, 0.74rem); color: #6a7a5a; }

    /* ── Skill trees step ──────────────────────────────────────────── */
    .cc-class-preview {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: rgba(200,160,32,0.08);
      border: 1px solid rgba(200,160,32,0.3);
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .cc-class-label { font-size: clamp(0.72rem, 1.2vw, 0.84rem); color: #8a7a50; }
    .cc-class-name  { font-size: clamp(0.9rem, 1.8vw, 1.1rem); color: #e8c040; font-weight: 700; }
    .cc-tree-count  { font-size: clamp(0.68rem, 1.1vw, 0.8rem); color: #6a5a3a; margin-left: auto; }

    .cc-tree-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(130px, 17vw, 165px), 1fr));
      gap: clamp(6px, 1.2vw, 10px);
    }
    .cc-tree-card {
      border: 1px solid rgba(200,160,32,0.18);
      border-radius: 4px;
      padding: clamp(7px, 1.3vw, 11px);
      cursor: pointer;
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      min-height: 44px;
      outline: none;
    }
    .cc-tree-card:focus, .cc-tree-card:hover { border-color: rgba(200,160,32,0.5); background: rgba(200,160,32,0.08); }
    .cc-tree-card.selected { border-color: #c8a020; background: rgba(200,160,32,0.14); }
    .cc-tree-card.disabled { opacity: 0.35; cursor: default; }
    .cc-tree-name { font-size: clamp(0.75rem, 1.3vw, 0.88rem); color: #d4b870; font-weight: 600; margin-bottom: 2px; }
    .cc-tree-tier { font-size: clamp(0.58rem, 1vw, 0.7rem); text-transform: uppercase; letter-spacing: 0.05em; }
    .cc-tree-tier.standard  { color: #7a8a5a; }
    .cc-tree-tier.advanced  { color: #5a8a9a; }
    .cc-tree-tier.rare      { color: #6a5aaa; }
    .cc-tree-tier.legendary { color: #aa8a2a; }
    .cc-tree-desc { font-size: clamp(0.6rem, 0.98vw, 0.7rem); color: #5a5040; margin-top: 3px; }

    /* ── Feat step ─────────────────────────────────────────────────── */
    .cc-feat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(160px, 22vw, 220px), 1fr));
      gap: clamp(10px, 1.8vw, 16px);
    }
    .cc-feat-card {
      border: 1px solid rgba(200,160,32,0.18);
      border-radius: 4px;
      padding: clamp(10px, 1.8vw, 16px);
      cursor: pointer;
      background: rgba(200,160,32,0.03);
      transition: all 0.15s;
      min-height: 44px;
      outline: none;
    }
    .cc-feat-card:focus, .cc-feat-card:hover { border-color: rgba(200,160,32,0.55); background: rgba(200,160,32,0.09); }
    .cc-feat-card.selected { border-color: #c8a020; background: rgba(200,160,32,0.15); }
    .cc-feat-card.ineligible { opacity: 0.55; border-color: rgba(160,80,80,0.3); }
    .cc-feat-card.ineligible:hover, .cc-feat-card.ineligible:focus { border-color: rgba(200,100,100,0.5); background: rgba(200,80,80,0.07); }
    .cc-feat-name { font-size: clamp(0.8rem, 1.4vw, 0.94rem); color: #d4b870; font-weight: 700; margin-bottom: 4px; }
    .cc-feat-desc { font-size: clamp(0.65rem, 1.1vw, 0.76rem); color: #7a6a40; }
    .cc-feat-req { font-size: clamp(0.6rem, 1vw, 0.7rem); color: #b06060; margin-top: 4px; font-style: italic; }
    .cc-feat-req.met { color: #60a060; }
    .cc-feat-warn { font-size: clamp(0.62rem, 1.05vw, 0.72rem); color: #e07040; margin-top: 6px; font-weight: 600; }

    /* ── Attribute spend counter ─────────────────────────────────── */
    .cc-points-banner {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: clamp(10px, 1.5vh, 14px) clamp(12px, 2vw, 18px);
      background: rgba(200,160,32,0.08);
      border: 1px solid rgba(200,160,32,0.3);
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .cc-points-label { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #d4b870; font-weight: 600; flex: 1; }
    .cc-points-count { font-size: clamp(1rem, 2vw, 1.3rem); font-weight: 700; color: #c8a020; }
    .cc-points-count.over  { color: #e05050; }
    .cc-points-count.zero  { color: #60a060; }
    .cc-attr-spend-row {
      display: grid;
      grid-template-columns: 1fr auto auto auto auto auto;
      gap: 6px clamp(8px, 1.5vw, 16px);
      align-items: center;
      margin-bottom: 6px;
    }
    .cc-attr-spend-btn {
      min-width: 30px; min-height: 30px;
      background: rgba(200,160,32,0.08);
      border: 1px solid rgba(200,160,32,0.3);
      color: #c8a020;
      border-radius: 3px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.12s;
      outline: none;
    }
    .cc-attr-spend-btn:hover, .cc-attr-spend-btn:focus {
      background: rgba(200,160,32,0.2);
      border-color: rgba(200,160,32,0.6);
    }
    .cc-attr-spend-btn:disabled { opacity: 0.3; cursor: default; }
    .cc-attr-score { font-size: clamp(0.88rem, 1.5vw, 1rem); font-weight: 700; color: #c8a020; text-align: center; min-width: 28px; }
    .cc-attr-mod  { font-size: clamp(0.7rem, 1.2vw, 0.82rem); color: #8a7a50; text-align: center; min-width: 36px; }
    .cc-attr-spend-name { font-size: clamp(0.78rem, 1.3vw, 0.9rem); color: #d4c090; }

    /* ── Background tab layout ───────────────────────────────────── */
    .cc-bg-tab-nav {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .cc-bg-tab-btn {
      min-height: 44px;
      padding: 8px clamp(12px, 2vw, 20px);
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: clamp(0.78rem, 1.3vw, 0.9rem);
      font-weight: 600;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.15s;
      outline: none;
      border: 1px solid rgba(200,160,32,0.25);
      background: rgba(200,160,32,0.04);
      color: #8a7a50;
    }
    .cc-bg-tab-btn.active {
      border-color: #c8a020;
      background: rgba(200,160,32,0.14);
      color: #e8c040;
    }
    .cc-bg-tab-btn:hover, .cc-bg-tab-btn:focus {
      border-color: rgba(200,160,32,0.55);
      color: #c8a020;
    }

    /* ── Confirm step ──────────────────────────────────────────────── */
    .cc-confirm-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(160px, 22vw, 240px), 1fr));
      gap: clamp(10px, 2vw, 20px);
      margin-bottom: 24px;
    }
    .cc-confirm-section {
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(200,160,32,0.15);
      border-radius: 4px;
      padding: clamp(10px, 1.8vw, 16px);
    }
    .cc-confirm-section-title {
      font-size: clamp(0.65rem, 1.1vw, 0.78rem);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #6a5a3a;
      margin-bottom: 8px;
    }
    .cc-confirm-value {
      font-size: clamp(0.8rem, 1.4vw, 0.94rem);
      color: #d4c090;
    }
    .cc-confirm-class {
      font-size: clamp(0.94rem, 1.7vw, 1.1rem);
      color: #e8c040;
      font-weight: 700;
    }

    /* ── Navigation buttons ────────────────────────────────────────── */
    .cc-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: clamp(10px, 2vh, 16px) clamp(16px, 3vw, 32px);
      background: rgba(0,0,0,0.4);
      border-top: 1px solid rgba(200,160,32,0.15);
      flex-shrink: 0;
      gap: 12px;
    }
    .cc-btn {
      min-height: 44px;
      padding: 10px clamp(16px, 3vw, 28px);
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: clamp(0.8rem, 1.5vw, 0.94rem);
      font-weight: 600;
      letter-spacing: 0.05em;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.15s;
      outline: none;
      border: 1px solid rgba(200,160,32,0.3);
      background: rgba(200,160,32,0.06);
      color: #c8a020;
    }
    .cc-btn:hover, .cc-btn:focus {
      border-color: rgba(200,160,32,0.65);
      background: rgba(200,160,32,0.14);
      color: #e8c040;
      box-shadow: 0 0 10px rgba(200,160,32,0.2);
    }
    .cc-btn.primary {
      background: rgba(200,160,32,0.15);
      border-color: rgba(200,160,32,0.55);
      color: #e8c040;
    }
    .cc-btn.primary:hover, .cc-btn.primary:focus {
      background: rgba(200,160,32,0.25);
      box-shadow: 0 0 16px rgba(200,160,32,0.35);
    }
    .cc-btn:disabled { opacity: 0.35; cursor: default; }
    .cc-nav-center { font-size: clamp(0.68rem, 1.2vw, 0.82rem); color: #5a4a2a; }
  `,document.head.appendChild(x)}const C=H.childhood,T=H.adulthood,B=G.filter(x=>x.requirements?.level<=1),D=["Björn","Halvard","Gunnar","Ragnar","Ulf","Leif","Olaf","Ivar","Snorri","Erik","Thorvald","Brandr","Ketil","Grimr","Styrbjörn"],W=["Sigrid","Astrid","Freya","Thyra","Ragnhild","Sunniva","Hilde","Gudrid","Estrid","Alfhild","Solveig","Valdis","Ragnfríðr","Vigdis","Ingrid"],V=[...D,...W],S=14,R=["#f5d5b5","#e8b88a","#c8956a","#a07050","#7a4a30","#5a2e18","#ffe0c0","#f0c0a0"],M=["#1a1008","#3a2010","#6a3818","#8b4513","#b06820","#d4a840","#e8d080","#c8c8c8"],z=["#2e4a3a","#2e6a4a","#3a6aaa","#7a4a2a","#9a3a1a","#5a2e5a","#4a7a9a","#8a8a3a","#1a3a5a","#5a7a3a","#2a2a2a","#9a9a6a"],U=[{id:1,label:"Lean",icon:"|"},{id:2,label:"Average",icon:"|"},{id:3,label:"Athletic",icon:"|"},{id:4,label:"Stocky",icon:"|"},{id:5,label:"Imposing",icon:"|"}];class j extends I{constructor(e){super("panel-char-create",{trapFocus:!1,zLayer:"panel"}),this._onComplete=e,this._step=0,this._steps=["Race","Attributes","Appearance","Childhood","Adulthood","Trees","Feat","Confirm"],this._sel={raceId:"human",freeAttrTarget:null,attributes:null,spentPoints:{},bodyType:1,name:"",skinColor:R[0],hairColor:M[3],eyeColor:z[2],childhood:null,adult:null,bgPage:"childhood",trees:[],feat:null},this._keyHandler=this._onKey.bind(this)}build(){this.el.innerHTML="";const e=document.createElement("div");e.className="cc-root",e.setAttribute("role","dialog"),e.setAttribute("aria-label","Character Creation"),e.appendChild(this._buildStepBar());const a=document.createElement("div");return a.className="cc-content",this._mainEl=document.createElement("div"),this._mainEl.className="cc-main",this._sideEl=document.createElement("div"),this._sideEl.className="cc-side",a.appendChild(this._mainEl),a.appendChild(this._sideEl),e.appendChild(a),e.appendChild(this._buildNav()),this.el.appendChild(e),document.addEventListener("keydown",this._keyHandler),this._renderStep(),this}_buildStepBar(){const e=document.createElement("div");return e.className="cc-steps",e.id="cc-step-bar",this._steps.forEach((a,t)=>{const i=document.createElement("div");i.className="cc-step-item",i.dataset.stepIdx=String(t);const s=document.createElement("div");s.className="cc-step-dot",s.textContent=String(t+1);const n=document.createElement("div");n.className="cc-step-label",n.textContent=a,i.appendChild(s),i.appendChild(n),e.appendChild(i)}),e}_buildNav(){const e=document.createElement("div");return e.className="cc-nav",e.id="cc-nav",this._backBtn=document.createElement("button"),this._backBtn.className="cc-btn",this._backBtn.id="cc-btn-back",this._backBtn.textContent="Back",this._backBtn.addEventListener("click",()=>this._goBack()),this._centerLabel=document.createElement("span"),this._centerLabel.className="cc-nav-center",this._nextBtn=document.createElement("button"),this._nextBtn.className="cc-btn primary",this._nextBtn.id="cc-btn-next",this._nextBtn.textContent="Next",this._nextBtn.addEventListener("click",()=>this._goNext()),e.appendChild(this._backBtn),e.appendChild(this._centerLabel),e.appendChild(this._nextBtn),e}_renderStep(){this._updateStepBar(),this._updateNavButtons();const a=[()=>this._renderRaceStep(),()=>this._renderAttributesStep(),()=>this._renderAppearanceStep(),()=>this._renderBackgroundStep("childhood"),()=>this._renderBackgroundStep("adulthood"),()=>this._renderTreesStep(),()=>this._renderFeatStep(),()=>this._renderConfirmStep()][this._step];a&&a()}_updateStepBar(){const e=document.getElementById("cc-step-bar");if(!e)return;e.querySelectorAll(".cc-step-item").forEach((t,i)=>{const s=t.querySelector(".cc-step-dot");t.classList.toggle("active",i===this._step),s.classList.toggle("active",i===this._step),s.classList.toggle("done",i<this._step)})}_updateNavButtons(){if(!this._backBtn||!this._nextBtn)return;this._backBtn.disabled=this._step===0;const e=this._step===this._steps.length-1;this._nextBtn.textContent=e?"Create Hero":"Next",this._nextBtn.id=e?"cc-btn-create":"cc-btn-next",this._centerLabel.textContent=`Step ${this._step+1} of ${this._steps.length}`}_goNext(){if(this._validateStep()){if(this._step===this._steps.length-1){this._createHero();return}this._step++,this._renderStep(),this._mainEl.scrollTop=0}}_goBack(){this._step>0&&(this._step--,this._renderStep(),this._mainEl.scrollTop=0)}_validateStep(){switch(this._step){case 0:return!!this._sel.raceId;case 1:{const e=this._getRemainingPoints();return e!==0?(this._showStepError(`You must spend all ${S} attribute points. ${e>0?e+" remaining.":Math.abs(e)+" over budget."}`),!1):d.getRace(this._sel.raceId)?.racialTraits?.some(i=>i.id==="adaptable")&&!this._sel.freeAttrTarget?(this._showStepError("You must assign your racial attribute bonus (Adaptable) before continuing."),!1):!0}case 2:return this._sel.name?.trim()?!0:(this._showNameError("Character name cannot be blank."),!1);case 3:return!!this._sel.childhood;case 4:return!!this._sel.adult;case 5:return this._sel.trees.length===3;case 6:return!!this._sel.feat;default:return!0}}_showStepError(e){let a=this._mainEl.querySelector(".cc-step-error");a||(a=document.createElement("p"),a.className="cc-validation-error cc-step-error",this._mainEl.prepend(a)),a.textContent=e}_showNameError(e){const a=document.getElementById("cc-name-input");a&&a.classList.add("error");let t=document.getElementById("cc-name-error");t||(t=document.createElement("p"),t.className="cc-validation-error",t.id="cc-name-error",a?.parentElement?.appendChild(t)),t.textContent=e}_renderRaceStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Choose Your Race</h2>
      <p class="cc-step-desc">Select the race that defines your heritage and racial traits.</p>
    `;const e=document.createElement("div");e.className="cc-race-grid",e.id="cc-race-grid";const a=d.getPlayableRaces();a.forEach(i=>{const s=document.createElement("button");s.type="button",s.className="cc-race-card"+(i.unlockCondition?" locked":""),s.dataset.raceId=i.id,s.setAttribute("tabindex","0"),s.disabled=!!i.unlockCondition;const n=this._formatBonuses(i.attributeBonuses);s.innerHTML=`
        <div class="cc-race-name">${i.name}</div>
        <div class="cc-race-rarity ${i.rarity}">${i.rarity}</div>
        ${n?`<div class="cc-race-bonuses">${n}</div>`:""}
        ${i.unlockCondition?'<div class="cc-lock-icon">&#x1F512;</div>':""}
      `,i.unlockCondition||s.addEventListener("click",()=>{this._sel.raceId=i.id,this._sel.freeAttrTarget=null,this._sel.attributes=this._computeRaceAttributes(i),e.querySelectorAll(".cc-race-card").forEach(c=>c.classList.remove("selected")),s.classList.add("selected"),this._updateRacePreview(i)}),i.id===this._sel.raceId&&s.classList.add("selected"),e.appendChild(s)}),this._mainEl.appendChild(e);const t=a.find(i=>i.id===this._sel.raceId);t&&this._updateRacePreview(t)}_formatBonuses(e){return e?Object.entries(e).map(([a,t])=>`${t>0?"+":""}${t} ${a.charAt(0).toUpperCase()+a.slice(1)}`).join(", "):""}_computeRaceAttributes(e){const a={...e.baseAttributes},t=e.attributeBonuses??{},i={};for(const s of Object.keys(a))i[s]=a[s]+(t[s]??0);return i}_updateRacePreview(e){this._sideEl.innerHTML="";const a=document.createElement("div");a.className="cc-preview-title",a.textContent=e.name,this._sideEl.appendChild(a);const t=document.createElement("p");t.style.cssText="font-size: clamp(0.65rem,1.1vw,0.78rem); color:#7a6a40; margin:0 0 12px 0;",t.textContent=e.description,this._sideEl.appendChild(t);const i=document.createElement("div");i.className="cc-preview-section",i.textContent="Attributes",this._sideEl.appendChild(i);const s=["might","agility","intellect","wisdom","endurance","presence"],n=e.baseAttributes,c=e.attributeBonuses??{};if(s.forEach(r=>{const o=c[r]??0,l=(n[r]??10)+o,h=document.createElement("div");h.className="cc-attr-row";const p=o>0?"bonus":o<0?"malus":"";h.innerHTML=`
        <span class="cc-attr-label">${r.charAt(0).toUpperCase()+r.slice(1)}</span>
        <span class="cc-attr-val ${p}">${l}${o!==0?` (${o>0?"+":""}${o})`:""}</span>
      `,this._sideEl.appendChild(h)}),e.racialTraits?.length>0){const r=document.createElement("div");r.className="cc-preview-section",r.style.marginTop="12px",r.textContent="Racial Traits",this._sideEl.appendChild(r),e.racialTraits.forEach(o=>{const l=document.createElement("div");l.className="cc-preview-trait",l.innerHTML=`
          <div class="cc-preview-trait-name">${o.name}</div>
          <div class="cc-preview-trait-desc">${o.description}</div>
        `,this._sideEl.appendChild(l)})}if(e.unlockCondition){const r=document.createElement("p");r.style.cssText="font-size:0.68rem; color:#6a4a2a; margin-top:10px; border-top:1px solid rgba(200,160,32,0.15); padding-top:8px;",r.textContent="Locked: "+e.unlockCondition,this._sideEl.appendChild(r)}}_pointCostToRaise(e){return e>=16?2:1}_pointRefundForLower(e){return e>16?2:1}_getSpentPoints(){const e=this._sel.spentPoints??{};let a=0;for(const t of Object.keys(e)){const i=e[t]??0;if(i>0){const s=d.getRace(this._sel.raceId),n=(s?.baseAttributes?.[t]??10)+((s?.attributeBonuses??{})[t]??0);for(let c=n;c<n+i;c++)a+=this._pointCostToRaise(c)}else if(i<0){const s=d.getRace(this._sel.raceId),n=(s?.baseAttributes?.[t]??10)+((s?.attributeBonuses??{})[t]??0);for(let c=n;c>n+i;c--)a-=this._pointRefundForLower(c)}}return a}_getRemainingPoints(){return S-this._getSpentPoints()}_getAttrValue(e,a){return(e?.baseAttributes?.[a]??10)+((e?.attributeBonuses??{})[a]??0)+(this._sel.spentPoints?.[a]??0)}_getRaceTotal(e,a){return(e?.baseAttributes?.[a]??10)+((e?.attributeBonuses??{})[a]??0)}_renderAttributesStep(){const e=d.getRace(this._sel.raceId);if(!e)return;this._sel.attributes||(this._sel.attributes=this._computeRaceAttributes(e)),this._sel.spentPoints||(this._sel.spentPoints={});const a=e.racialTraits?.some(t=>t.id==="adaptable");if(this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Starting Attributes</h2>
      <p class="cc-step-desc">Distribute ${S} points across your attributes. Values above 16 cost 2 points per +1. You can lower attributes to the racial minimum to gain points back.</p>
    `,a){const t=document.createElement("div");t.className="cc-free-point-row",t.innerHTML=`
        <span class="cc-free-point-label">Adaptable: Assign +1 free racial bonus to:</span>
        <select class="cc-free-point-select" id="cc-free-attr-select">
          <option value="">-- Choose --</option>
          <option value="might">Might</option>
          <option value="agility">Agility</option>
          <option value="intellect">Intellect</option>
          <option value="wisdom">Wisdom</option>
          <option value="endurance">Endurance</option>
          <option value="presence">Presence</option>
        </select>
      `,this._mainEl.appendChild(t);const i=t.querySelector("#cc-free-attr-select");this._sel.freeAttrTarget&&(i.value=this._sel.freeAttrTarget),i.addEventListener("change",()=>{this._sel.freeAttrTarget=i.value||null,this._refreshAttrStep(e)})}this._attrPointsBanner=document.createElement("div"),this._attrPointsBanner.className="cc-points-banner",this._attrPointsBanner.id="cc-points-banner",this._mainEl.appendChild(this._attrPointsBanner),this._attrSpendContainer=document.createElement("div"),this._attrSpendContainer.id="cc-attr-spend-container",this._mainEl.appendChild(this._attrSpendContainer),this._refreshAttrStep(e),this._updateAttrSidePanel(e)}_refreshAttrStep(e){this._updatePointsBanner(),this._renderAttrSpendRows(e),this._updateAttrSidePanel(e)}_updatePointsBanner(){const e=document.getElementById("cc-points-banner");if(!e)return;const a=this._getRemainingPoints(),t=a<0?"over":a===0?"zero":"";e.innerHTML=`
      <span class="cc-points-label">Points to Distribute</span>
      <span class="cc-points-count ${t}" id="cc-points-remaining">${a}</span>
      <span style="font-size:clamp(0.7rem,1.1vw,0.8rem); color:#6a5a3a;">
        (Values &gt;16 cost 2pts/+1; lower below racial base to gain pts)
      </span>
    `}_renderAttrSpendRows(e){const a=document.getElementById("cc-attr-spend-container");if(!a)return;a.innerHTML="";const t=["might","agility","intellect","wisdom","endurance","presence"],i=this._getRemainingPoints(),s=this._sel.freeAttrTarget;t.forEach(n=>{const r=this._getRaceTotal(e,n)-8,o=20,l=this._getAttrValue(e,n),p=l+(s===n?1:0),b=Math.floor((p-10)/2),f=(b>=0?"+":"")+b,u=this._pointCostToRaise(p),g=i>=u&&p<o,w=l>r,m=document.createElement("div");m.className="cc-attr-spend-row";const k=document.createElement("div");k.className="cc-attr-spend-name",k.textContent=n.charAt(0).toUpperCase()+n.slice(1);const v=document.createElement("button");v.type="button",v.className="cc-attr-spend-btn",v.textContent="−",v.disabled=!w,v.setAttribute("aria-label",`Decrease ${n}`),v.addEventListener("click",()=>{const y=this._sel.spentPoints??{};y[n]=(y[n]??0)-1,this._sel.spentPoints=y,this._refreshAttrStep(e)});const A=document.createElement("div");A.className="cc-attr-score",A.textContent=p;const L=document.createElement("div");L.className="cc-attr-mod",L.textContent=`(${f})`;const _=document.createElement("button");_.type="button",_.className="cc-attr-spend-btn",_.textContent="+",_.disabled=!g,_.setAttribute("aria-label",`Increase ${n}`),_.addEventListener("click",()=>{const y=this._sel.spentPoints??{};y[n]=(y[n]??0)+1,this._sel.spentPoints=y,this._refreshAttrStep(e)});const N=document.createElement("div");N.style.cssText="font-size:clamp(0.6rem,1vw,0.7rem); color:#5a4a2a; text-align:right;",N.textContent=p>=16?"2pt/+1":"1pt/+1",m.appendChild(k),m.appendChild(v),m.appendChild(A),m.appendChild(L),m.appendChild(_),m.appendChild(N),a.appendChild(m)})}_updateAttrSidePanel(e){this._sideEl.innerHTML="";const a=this._sel.freeAttrTarget,t=["might","agility","intellect","wisdom","endurance","presence"],i={};for(const g of t)i[g]=this._getAttrValue(e,g)+(a===g?1:0);const s={attributes:i,level:1},n=d.getDerivedAbilities(s),c=d.getProficiencyBonus(1),r=document.createElement("div");r.className="cc-preview-title",r.textContent="Derived Abilities",this._sideEl.appendChild(r);const o=document.createElement("div");o.className="cc-attr-row",o.innerHTML=`<span class="cc-attr-label">Proficiency Bonus</span><span class="cc-attr-val">+${c}</span>`,this._sideEl.appendChild(o),["athletics","acrobatics","stealth","arcana","history","insight","nature","perception","survival","persuasion","deception","intimidate","command"].forEach(g=>{const w=n[g],m=document.createElement("div");m.className="cc-attr-row",m.innerHTML=`
        <span class="cc-attr-label">${g.charAt(0).toUpperCase()+g.slice(1)}</span>
        <span class="cc-attr-val">${w>=0?"+":""}${w}</span>
      `,this._sideEl.appendChild(m)});const h=i.endurance??10,p=i.intellect??10,b=10+Math.max(0,Math.floor((h-10)/2)),f=10+Math.max(0,Math.floor((p-10)/2)),u=document.createElement("div");u.style.cssText="border-top:1px solid rgba(200,160,32,0.15); margin:8px 0;",this._sideEl.appendChild(u),[["Max HP (L1)",b],["Max Mana (L1)",f]].forEach(([g,w])=>{const m=document.createElement("div");m.className="cc-attr-row",m.innerHTML=`<span class="cc-attr-label">${g}</span><span class="cc-attr-val">${w}</span>`,this._sideEl.appendChild(m)})}_renderAppearanceStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Appearance</h2>
      <p class="cc-step-desc">Customize your hero's look.</p>
    `;const e=document.createElement("div"),a=document.createElement("div");a.className="cc-name-row",a.innerHTML='<label class="cc-name-label" for="cc-name-input">Hero Name</label>';const t=document.createElement("input");t.type="text",t.className="cc-name-input",t.id="cc-name-input",t.placeholder="Enter hero name...",t.maxLength=32,t.value=this._sel.name||"",t.setAttribute("autocomplete","off"),t.addEventListener("input",()=>{this._sel.name=t.value,t.classList.remove("error");const r=document.getElementById("cc-name-error");r&&(r.textContent="")}),a.appendChild(t);const i=document.createElement("button");i.type="button",i.className="cc-dice-btn",i.title="Random Norse name",i.setAttribute("aria-label","Generate random name"),i.textContent="🎲",i.addEventListener("click",()=>{const r=V,o=r[Math.floor(Math.random()*r.length)];t.value=o,this._sel.name=o,t.classList.remove("error");const l=document.getElementById("cc-name-error");l&&(l.textContent=""),this._updateAppearanceSide()}),a.appendChild(i),e.appendChild(a),this._mainEl.appendChild(e);const s=document.createElement("div");s.className="cc-attr-head",s.style.margin="16px 0 8px 0",s.textContent="Body Type",this._mainEl.appendChild(s);const n=document.createElement("div");n.className="cc-appearance-grid",U.forEach(r=>{const o=document.createElement("button");o.type="button",o.className="cc-body-card"+(this._sel.bodyType===r.id?" selected":""),o.innerHTML=`<span class="cc-body-icon">&#x1F9CD;</span>${r.label}`,o.addEventListener("click",()=>{this._sel.bodyType=r.id,n.querySelectorAll(".cc-body-card").forEach(l=>l.classList.remove("selected")),o.classList.add("selected")}),n.appendChild(o)}),this._mainEl.appendChild(n),[{label:"Skin Color",key:"skinColor",colors:R},{label:"Hair Color",key:"hairColor",colors:M},{label:"Eye Color",key:"eyeColor",colors:z}].forEach(({label:r,key:o,colors:l})=>{const h=document.createElement("div");h.className="cc-color-row";const p=document.createElement("div");p.className="cc-color-label",p.textContent=r,h.appendChild(p);const b=document.createElement("div");b.className="cc-swatch-list",l.forEach(f=>{const u=document.createElement("button");u.type="button",u.className="cc-swatch"+(this._sel[o]===f?" selected":""),u.style.background=f,u.title=f,u.setAttribute("aria-label",`${r} ${f}`),u.addEventListener("click",()=>{this._sel[o]=f,b.querySelectorAll(".cc-swatch").forEach(g=>g.classList.remove("selected")),u.classList.add("selected"),this._updateAppearanceSide()}),b.appendChild(u)}),h.appendChild(b),this._mainEl.appendChild(h)}),this._updateAppearanceSide()}_updateAppearanceSide(){this._sideEl.innerHTML="";const e=document.createElement("div");e.className="cc-preview-title",e.textContent="Preview",this._sideEl.appendChild(e);const a=document.createElement("div");a.style.cssText=`
      width: 80px; height: 120px;
      margin: 16px auto;
      background: ${this._sel.skinColor};
      border-radius: 8px 8px 4px 4px;
      position: relative;
      border: 2px solid rgba(200,160,32,0.3);
    `;const t=document.createElement("div");t.style.cssText=`
      width: 48px; height: 48px;
      background: ${this._sel.skinColor};
      border-radius: 50%;
      position: absolute;
      top: -28px; left: 50%; transform: translateX(-50%);
      border: 2px solid rgba(200,160,32,0.3);
    `;const i=document.createElement("div");i.style.cssText=`width:8px; height:8px; background:${this._sel.eyeColor}; border-radius:50%; position:absolute; top:16px; left:8px;`;const s=document.createElement("div");s.style.cssText=`width:8px; height:8px; background:${this._sel.eyeColor}; border-radius:50%; position:absolute; top:16px; right:8px;`;const n=document.createElement("div");n.style.cssText=`width:52px; height:16px; background:${this._sel.hairColor}; border-radius:50% 50% 0 0; position:absolute; top:0; left:50%; transform:translateX(-50%);`,t.appendChild(n),t.appendChild(i),t.appendChild(s),a.appendChild(t),this._sideEl.appendChild(a);const c=this._sel.name?.trim()||"Unnamed",r=document.createElement("div");r.style.cssText="text-align:center; color:#c8a020; font-weight:600; font-size:0.85rem; margin-top:8px;",r.textContent=c,this._sideEl.appendChild(r)}_renderBackgroundStep(e){const a=e==="childhood",t=a?C:T,i=a?"childhood":"adult",s=a?"Childhood Background":"Adulthood Background",n=a?"Where you grew up and your formative years.":"What you did before taking to the road.";this._mainEl.innerHTML=`
      <h2 class="cc-step-title">${s}</h2>
      <p class="cc-step-desc">${n}</p>
    `;const c=document.createElement("div");c.className="cc-bg-grid",c.id="cc-bg-grid",t.forEach(r=>{const o=document.createElement("button");o.type="button",o.className="cc-bg-card"+(this._sel[i]===r.id?" selected":""),o.innerHTML=`
        <div class="cc-bg-name">${r.name}</div>
        <div class="cc-bg-bonus">${r.bonusText}</div>
      `,o.addEventListener("click",()=>{this._sel[i]=r.id,c.querySelectorAll(".cc-bg-card").forEach(l=>l.classList.remove("selected")),o.classList.add("selected"),this._updateBackgroundSide(e)}),c.appendChild(o)}),this._mainEl.appendChild(c),this._updateBackgroundSide(e)}_updateBackgroundSide(e){const a=e==="childhood";this._sideEl.innerHTML="";const t=document.createElement("div");t.className="cc-preview-title",t.textContent=a?"Childhood":"Adulthood",this._sideEl.appendChild(t);const i=a?"childhood":"adult",s=a?C:T;if(this._sel[i]){const n=s.find(c=>c.id===this._sel[i]);if(n){const c=document.createElement("div");c.className="cc-preview-trait-name",c.style.marginBottom="4px",c.textContent=n.name,this._sideEl.appendChild(c);const r=document.createElement("div");r.className="cc-preview-trait-desc",r.style.marginBottom="8px",r.textContent=n.description,this._sideEl.appendChild(r);const o=document.createElement("div");if(o.style.cssText="font-size:clamp(0.65rem,1.1vw,0.76rem); color:#6a7a5a;",o.textContent=n.bonusText,this._sideEl.appendChild(o),n.startingGold>0){const l=document.createElement("div");l.style.cssText="margin-top:8px; font-size:clamp(0.68rem,1.1vw,0.78rem); color:#c8a020; font-weight:600;",l.textContent=`+${n.startingGold} starting gold`,this._sideEl.appendChild(l)}}}else{const n=document.createElement("p");n.style.cssText="font-size:0.75rem; color:#5a4a2a;",n.textContent=a?"Select your childhood background.":"Select your adulthood background.",this._sideEl.appendChild(n)}}_renderTreesStep(){this._mainEl.innerHTML="";const e=document.createElement("div");e.className="cc-class-preview",e.id="cc-class-preview",e.innerHTML=`
      <span class="cc-class-label">Class:</span>
      <span class="cc-class-name" id="cc-class-name">${d.computeClass(this._sel.trees)}</span>
      <span class="cc-tree-count" id="cc-tree-count">${this._sel.trees.length}/3 trees selected</span>
    `,this._mainEl.appendChild(e);const a=document.createElement("h2");a.className="cc-step-title",a.textContent="Choose 3 Skill Trees",this._mainEl.appendChild(a);const t=document.createElement("p");t.className="cc-step-desc",t.textContent="Select exactly 3 skill trees. Your class is determined by this combination.",this._mainEl.appendChild(t);const i=document.createElement("div");i.className="cc-tree-grid",i.id="cc-tree-grid",d.getSkillTrees().forEach(s=>{const n=document.createElement("button");n.type="button";const c=this._sel.trees.includes(s.id),r=!c&&this._sel.trees.length>=3;n.className="cc-tree-card"+(c?" selected":"")+(r?" disabled":""),n.dataset.treeId=s.id,n.disabled=r,n.innerHTML=`
        <div class="cc-tree-name">${s.name}</div>
        <div class="cc-tree-tier ${s.tier}">${s.tier}</div>
        <div class="cc-tree-desc">${s.description.slice(0,60)}${s.description.length>60?"…":""}</div>
      `,n.addEventListener("click",()=>{this._sel.trees.includes(s.id)?this._sel.trees=this._sel.trees.filter(o=>o!==s.id):this._sel.trees.length<3&&(this._sel.trees=[...this._sel.trees,s.id]),this._rerenderTreeCards(i),this._updateClassPreview()}),i.appendChild(n)}),this._mainEl.appendChild(i),this._updateTreesSide()}_rerenderTreeCards(e){e.querySelectorAll(".cc-tree-card").forEach(t=>{const i=t.dataset.treeId,s=this._sel.trees.includes(i),n=!s&&this._sel.trees.length>=3;t.classList.toggle("selected",s),t.classList.toggle("disabled",n),t.disabled=n}),this._updateTreesSide()}_updateClassPreview(){const e=document.getElementById("cc-class-name"),a=document.getElementById("cc-tree-count");e&&(e.textContent=d.computeClass(this._sel.trees)),a&&(a.textContent=`${this._sel.trees.length}/3 trees selected`)}_updateTreesSide(){this._sideEl.innerHTML="";const e=document.createElement("div");if(e.className="cc-preview-title",e.textContent="Selected Trees",this._sideEl.appendChild(e),this._sel.trees.length===0){const t=document.createElement("p");t.style.cssText="font-size:0.75rem; color:#5a4a2a;",t.textContent="Select 3 skill trees to determine your class.",this._sideEl.appendChild(t);return}const a=d.getSkillTrees();if(this._sel.trees.forEach((t,i)=>{const s=a.find(c=>c.id===t);if(!s)return;const n=document.createElement("div");n.className="cc-preview-trait",n.innerHTML=`
        <div class="cc-preview-trait-name">${i+1}. ${s.name}</div>
        <div class="cc-preview-trait-desc">${s.description.slice(0,80)}…</div>
      `,this._sideEl.appendChild(n)}),this._sel.trees.length===3){const t=d.computeClass(this._sel.trees),i=document.createElement("div");i.style.cssText="margin-top:12px; padding:8px; background:rgba(200,160,32,0.1); border:1px solid rgba(200,160,32,0.3); border-radius:4px; text-align:center;",i.innerHTML=`<div style="font-size:0.7rem; color:#8a7a50; margin-bottom:2px;">CLASS</div><div style="font-size:1rem; color:#e8c040; font-weight:700;">${t}</div>`,this._sideEl.appendChild(i)}}_checkFeatEligible(e){const a=d.getRace(this._sel.raceId),t=e.requirements??{},i=t.attributes??{};for(const[s,n]of Object.entries(i))if(this._getAttrValue(a,s)+(this._sel.freeAttrTarget===s?1:0)<n)return!1;return!(t.race&&this._sel.raceId!==t.race||t.races&&Array.isArray(t.races)&&!t.races.includes(this._sel.raceId))}_getFeatReqText(e){const a=e.requirements??{},t=[],i=a.attributes??{},s={might:"Might",agility:"Agility",intellect:"Intellect",wisdom:"Wisdom",endurance:"Endurance",presence:"Presence"};for(const[n,c]of Object.entries(i))t.push(`${s[n]??n} ≥ ${c}`);return a.race&&t.push(`Race: ${a.race}`),a.races&&t.push(`Race: ${a.races.join(" or ")}`),t.join(" AND ")}_renderFeatStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Starting Feat</h2>
      <p class="cc-step-desc">Choose one feat. Greyed feats have unmet requirements — you can still select them but will see a warning.</p>
    `;const e=document.createElement("div");e.className="cc-feat-grid",B.forEach(t=>{const i=this._checkFeatEligible(t),s=this._getFeatReqText(t),n=document.createElement("button");n.type="button",n.className="cc-feat-card"+(this._sel.feat===t.id?" selected":"")+(i?"":" ineligible");let c="";s&&(c=`<div class="cc-feat-req ${i?"met":""}">Requires: ${s}</div>`),n.innerHTML=`
        <div class="cc-feat-name">${t.name}</div>
        <div class="cc-feat-desc">${t.description}</div>
        ${c}
      `,n.addEventListener("click",()=>{this._sel.feat=t.id,e.querySelectorAll(".cc-feat-card").forEach(r=>r.classList.remove("selected")),n.classList.add("selected"),this._updateFeatSide(t,i)}),e.appendChild(n)}),this._mainEl.appendChild(e);const a=B.find(t=>t.id===this._sel.feat);a?this._updateFeatSide(a,this._checkFeatEligible(a)):this._sideEl.innerHTML='<div class="cc-preview-title">Feat Details</div><p style="font-size:0.75rem; color:#5a4a2a;">Select a feat to see details.</p>'}_updateFeatSide(e,a){this._sideEl.innerHTML="";const t=document.createElement("div");t.className="cc-preview-title",t.textContent=e.name,this._sideEl.appendChild(t);const i=document.createElement("p");i.style.cssText="font-size:0.78rem; color:#7a6a40;",i.textContent=e.description,this._sideEl.appendChild(i);const s=this._getFeatReqText(e);if(s){const n=document.createElement("div");n.style.cssText=`font-size:0.72rem; margin-top:8px; font-style:italic; color:${a?"#60a060":"#c05050"};`,n.textContent=(a?"✓ Meets: ":"✗ Requires: ")+s,this._sideEl.appendChild(n)}if(!a){const n=document.createElement("div");n.className="cc-feat-warn",n.textContent="⚠ You do not meet the requirements for this feat. You may still select it, but it may not function correctly.",this._sideEl.appendChild(n)}}_renderConfirmStep(){this._mainEl.innerHTML=`
      <h2 class="cc-step-title">Confirm Hero</h2>
      <p class="cc-step-desc">Review your choices before creating your hero.</p>
    `;const e=d.getRace(this._sel.raceId),a=d.computeClass(this._sel.trees),t=d.getSkillTrees(),i=document.createElement("div");i.className="cc-confirm-grid",[{title:"Identity",content:`
          <div class="cc-confirm-value"><strong>${this._sel.name||"Unnamed"}</strong></div>
          <div style="font-size:0.78rem; color:#8a7a50; margin-top:4px;">${e?.name??"—"} &bull; ${e?.rarity??""}</div>
          <div class="cc-confirm-class" style="margin-top:6px;">${a}</div>
        `},{title:"Skill Trees",content:this._sel.trees.map(c=>t.find(r=>r.id===c)).filter(Boolean).map(c=>`<div class="cc-confirm-value">${c.name}</div>`).join("")||'<div class="cc-confirm-value" style="color:#5a4a2a;">None selected</div>'},{title:"Background",content:`
          <div style="font-size:0.78rem; color:#8a7a50;">Childhood</div>
          <div class="cc-confirm-value">${C.find(c=>c.id===this._sel.childhood)?.name??"—"}</div>
          <div style="font-size:0.78rem; color:#8a7a50; margin-top:6px;">Adulthood</div>
          <div class="cc-confirm-value">${T.find(c=>c.id===this._sel.adult)?.name??"—"}</div>
        `},{title:"Starting Feat",content:`<div class="cc-confirm-value">${B.find(c=>c.id===this._sel.feat)?.name??"—"}</div>`}].forEach(c=>{const r=document.createElement("div");r.className="cc-confirm-section",r.innerHTML=`<div class="cc-confirm-section-title">${c.title}</div>${c.content}`,i.appendChild(r)}),this._mainEl.appendChild(i),this._sideEl.innerHTML="";const n=document.createElement("div");if(n.className="cc-preview-title",n.textContent="Attributes",this._sideEl.appendChild(n),e){const c=this._sel.freeAttrTarget;["might","agility","intellect","wisdom","endurance","presence"].forEach(o=>{const l=this._getAttrValue(e,o)+(c===o?1:0),h=d.getAttributeModifier(l),p=document.createElement("div");p.className="cc-attr-row",p.innerHTML=`
          <span class="cc-attr-label">${o.charAt(0).toUpperCase()+o.slice(1)}</span>
          <span class="cc-attr-val">${l} (${h>=0?"+":""}${h})</span>
        `,this._sideEl.appendChild(p)})}}_createHero(){const e=d.getRace(this._sel.raceId),a=this._sel.freeAttrTarget,t=["might","agility","intellect","wisdom","endurance","presence"],i={};for(const o of t)i[o]=this._getAttrValue(e,o)+(a===o?1:0);const s=d.createHero({name:this._sel.name?.trim()||"Hero",raceId:this._sel.raceId,attributeOverrides:i,appearance:{bodyType:this._sel.bodyType,skinColor:this._sel.skinColor,hairColor:this._sel.hairColor,eyeColor:this._sel.eyeColor},background:{childhood:this._sel.childhood??"farmer",adult:this._sel.adult??"soldier"},skillTrees:this._sel.trees,startingFeat:this._sel.feat,alignment:"neutral"});let n=0;const c=C.find(o=>o.id===(this._sel.childhood??"farmer")),r=T.find(o=>o.id===(this._sel.adult??"soldier"));if(c?.startingGold&&(n+=c.startingGold),r?.startingGold&&(n+=r.startingGold),n>0){try{const o=d._worldState??null;window.__worldState&&(window.__worldState.partyGold=(window.__worldState.partyGold??200)+n)}catch{}s._pendingGoldBonus=n,E.info(`[party] Background gold bonus; amount=${n}`)}E.info(`[party] CharCreate complete; heroId=${s.id} name=${s.name} class=${s.class} attrPoints=${S}`),this._onComplete&&this._onComplete(s)}_onKey(e){this._visible&&e.key==="Escape"&&e.preventDefault()}destroy(){document.removeEventListener("keydown",this._keyHandler),super.destroy()}}class Y{constructor(){this._panel=null}async init(){E.info("[boot] CharCreateScene init"),O(),window.__debug||(window.__debug={}),window.__debug.currentScene="charCreate",this._panel=new j(e=>{P.transition("partyBuilder",{heroes:[e]})}),this._panel.build(),this._panel.show(),E.info("[boot] CharCreateScene ready")}update(e){}async destroy(){E.info("[boot] CharCreateScene destroy"),this._panel&&(this._panel.destroy(),this._panel=null),window.__debug&&window.__debug.currentScene==="charCreate"&&(window.__debug.currentScene=null)}}export{Y as default};
//# sourceMappingURL=CharCreateScene-CW5AKPmx.js.map
