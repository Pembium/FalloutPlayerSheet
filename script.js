const PERK_DATABASE = {
  "Action Boy/Action Girl": {
    ranks: 2,
    requirements: { special: { agility: 8 }, level: 1 },
    levelIncrement: 5,
    description: "Rank 1: Maximum AP increases by +1. Rank 2: Maximum AP increases by +2."
  },
  "Adamantium Skeleton": {
    ranks: 1,
    requirements: { level: 7 },
    description: "You cannot suffer limb injuries."
  },
  "Animal Friend": {
    ranks: 2,
    requirements: { special: { charisma: 6 }, level: 3 },
    levelIncrement: 4,
    description: "Rank 1: Wasteland creatures are less likely to attack. Rank 2: Wasteland creatures will not attack unless provoked."
  },
  "Aquaboy/Aquagirl": {
    ranks: 1,
    requirements: { special: { endurance: 5 } },
    description: "You do not take radiation damage from swimming and can breathe underwater."
  },
  "Armorer": {
    ranks: 3,
    requirements: { special: { strength: 6 }, level: 2 },
    levelIncrement: 4,
    description: "Ranks unlock armor crafting mods: rank 1 = rank 1 mods, rank 2 = rank 2 mods, rank 3 = rank 3 mods."
  },
  "Awareness": {
    ranks: 1,
    requirements: { special: { perception: 6 } },
    description: "You can see an enemy's physical and energy DR."
  },
  "Basher": {
    ranks: 2,
    requirements: { special: { strength: 6 }, level: 1 },
    levelIncrement: 5,
    description: "Rank 1: Gun bashing does +1CDC damage. Rank 2: Gun bashing has a chance to cripple your opponent."
  },
  "Better Criticals": {
    ranks: 2,
    requirements: { special: { luck: 9 }, level: 4 },
    levelIncrement: 5,
    description: "Rank 1: Injuries inflicted by your attacks are 1 step more severe. Rank 2: Injuries inflicted by your attacks are 2 steps more severe."
  },
  "Big Leagues": {
    ranks: 2,
    requirements: { special: { strength: 6 }, level: 2 },
    levelIncrement: 4,
    description: "Rank 1: Melee weapon attacks do +1CDC damage. Rank 2: Melee weapon attacks do +2CDC damage and gain Piercing 1."
  },
  "Blacksmith": {
    ranks: 3,
    requirements: { special: { strength: 6 }, level: 2 },
    levelIncrement: 4,
    description: "Ranks unlock melee weapon mods: rank 1 = rank 1 mods, rank 2 = rank 2 mods, rank 3 = rank 3 mods."
  },
  "Bloody Mess": {
    ranks: 3,
    requirements: { level: 3 },
    levelIncrement: 5,
    description: "Rank 1: All damage +1CDC. Rank 2: All damage +2CDC. Rank 3: All damage +3CDC."
  },
  "Chem Resistant": {
    ranks: 2,
    requirements: { special: { endurance: 6 }, level: 1 },
    levelIncrement: 5,
    description: "Rank 1: You're 50% less likely to get addicted. Rank 2: You cannot become addicted to chems."
  },
  "Chemist": {
    ranks: 1,
    requirements: { special: { intelligence: 7 } },
    description: "Chems you take last twice as long."
  },
  "Commando": {
    ranks: 2,
    requirements: { special: { agility: 7 }, level: 2 },
    levelIncrement: 4,
    description: "Rank 1: Automatic weapons +1CDC damage. Rank 2: Automatic weapons +2CDC damage and Piercing 1."
  },
  "Concentrated Fire": {
    ranks: 1,
    requirements: { special: { perception: 8 } },
    description: "Each additional attack against the same target in a turn reduces difficulty by 1."
  },
  "Critical Banker": {
    ranks: 1,
    requirements: { special: { luck: 7 } },
    description: "You can save unused Luck points between sessions."
  },
  "Demolition Expert": {
    ranks: 3,
    requirements: { special: { perception: 5 }, level: 3 },
    levelIncrement: 5,
    description: "Explosive damage +1CDC per rank. Rank 3: Explosives have double the normal Burst radius."
  },
  "Fortune Finder": {
    ranks: 3,
    requirements: { special: { luck: 6 }, level: 1 },
    levelIncrement: 5,
    description: "Rank 1: +3CDC caps found. Rank 2: +6CDC caps found. Rank 3: +10CDC caps found."
  },
  "Four Leaf Clover": {
    ranks: 3,
    requirements: { special: { luck: 8 }, level: 3 },
    levelIncrement: 5,
    description: "Rank 1: Regain 1 Luck on 19-20. Rank 2: Regain 1 Luck on 18-20. Rank 3: Regain 1 Luck on 17-20."
  },
  "Ghoulish": {
    ranks: 3,
    requirements: { special: { endurance: 8 }, level: 4 },
    levelIncrement: 5,
    description: "Radiation heals you instead of harming. Rank 1: 1 HP per 10 rads. Rank 2: 1 HP per 5 rads. Rank 3: 1 HP per rad."
  },
  "Grim Reaper's Sprint": {
    ranks: 1,
    requirements: { special: { luck: 8 } },
    description: "Killing an enemy restores all your AP."
  },
  "Gun Nut": {
    ranks: 3,
    requirements: { special: { intelligence: 6 }, level: 2 },
    levelIncrement: 4,
    description: "Ranks unlock gun mods: rank 1 = rank 1 mods, rank 2 = rank 2 mods, rank 3 = rank 3 mods."
  },
  "Gunslinger": {
    ranks: 2,
    requirements: { special: { agility: 6 }, level: 2 },
    levelIncrement: 4,
    description: "Rank 1: One-handed guns +1CDC damage. Rank 2: One-handed guns +2CDC damage and Piercing 1."
  },
  "Heavy Gunner": {
    ranks: 3,
    requirements: { special: { strength: 8 }, level: 2 },
    levelIncrement: 4,
    description: "Heavy guns +1CDC damage per rank."
  },
  "Idiot Savant": {
    ranks: 2,
    requirements: { special: { intelligence: 4, luck: 6 }, level: 2 },
    levelIncrement: 5,
    description: "Rank 1: Random bonus XP on skill tests. Rank 2: Increased chance of bonus XP."
  },
  "Inspirational": {
    ranks: 1,
    requirements: { special: { charisma: 8 } },
    description: "Maximum group AP +1."
  },
  "Intense Training": {
    ranks: 10,
    requirements: { level: 2 },
    levelIncrement: 2,
    description: "Increase one SPECIAL attribute by 1 (max 10).",
    modifiesSpecial: true
  },
  "Iron Fist": {
    ranks: 2,
    requirements: { special: { strength: 6 }, level: 1 },
    levelIncrement: 5,
    description: "Rank 1: Unarmed +1CDC damage. Rank 2: Unarmed attacks gain Vicious."
  },
  "Junktown Jerky Vendor": {
    ranks: 1,
    requirements: { special: { charisma: 8 } },
    description: "Barter tests to buy/sell: difficulty -1 (minimum 0)."
  },
  "Jury Rigging": {
    ranks: 1,
    requirements: {},
    description: "Repair items without components (temporary, breaks on complication, complication range 19-20)."
  },
  "Laser Commander": {
    ranks: 2,
    requirements: { special: { perception: 8 }, level: 2 },
    levelIncrement: 4,
    description: "Energy weapons +1CDC damage per rank."
  },
  "Lead Belly": {
    ranks: 2,
    requirements: { special: { endurance: 6 }, level: 1 },
    levelIncrement: 4,
    description: "Rank 1: Re-roll radiation DC from food/drink. Rank 2: Immune to radiation from food/drink."
  },
  "Life Giver": {
    ranks: 5,
    requirements: { level: 5 },
    levelIncrement: 5,
    description: "Maximum HP +END per rank.",
    modifiesHP: true
  },
  "Light Step": {
    ranks: 1,
    requirements: {},
    description: "Ignore 1 complication per AP spent on AGI tests. Re-roll 1d20 to avoid pressure plate traps."
  },
  "Master Thief": {
    ranks: 1,
    requirements: { special: { perception: 8, agility: 9 } },
    description: "Lockpick/pickpocket detection difficulty +1."
  },
  "Medic": {
    ranks: 1,
    requirements: { special: { intelligence: 8 } },
    description: "First Aid: re-roll 1d20."
  },
  "Meltdown": {
    ranks: 1,
    requirements: { special: { perception: 10 } },
    description: "Enemies killed with energy weapons explode, damaging nearby enemies."
  },
  "Mister Sandman": {
    ranks: 1,
    requirements: { special: { agility: 9 } },
    description: "Sneak attacks with silenced weapons +2CDC damage (not in Power Armor)."
  },
  "Moving Target": {
    ranks: 1,
    requirements: { special: { agility: 6 } },
    description: "Sprint action: Defense +1 until next turn."
  },
  "Mysterious Stranger": {
    ranks: 1,
    requirements: { special: { luck: 7 } },
    description: "Spend 1 Luck: Mysterious Stranger may appear and attack an enemy."
  },
  "Nerd Rage!": {
    ranks: 3,
    requirements: { special: { intelligence: 8 }, level: 2 },
    levelIncrement: 5,
    description: "At <¼ HP: +physical DR, +energy DR, +CDC damage per rank (1/2/3)."
  },
  "Night Person": {
    ranks: 1,
    requirements: { special: { perception: 7 } },
    description: "Darkness difficulty penalties -1."
  },
  "Ninja": {
    ranks: 1,
    requirements: { special: { agility: 8 } },
    description: "Melee/unarmed sneak attacks +2CDC damage (not in Power Armor)."
  },
  "Nuclear Physicist": {
    ranks: 1,
    requirements: { special: { intelligence: 9 } },
    description: "Radioactive weapons: +1 rad damage per Effect. Fusion cores +3 charges."
  },
  "Pain Train": {
    ranks: 2,
    requirements: { special: { strength: 9, endurance: 7 }, level: 1 },
    levelIncrement: 5,
    description: "Charge in Power Armor (major action). Rank 2: +1CDC damage and Stun effect."
  },
  "Paralyzing Palm": {
    ranks: 1,
    requirements: { special: { strength: 8 } },
    description: "Unarmed attacks to specific locations gain Stun effect."
  },
  "Party Boy/Party Girl": {
    ranks: 1,
    requirements: { special: { endurance: 6, charisma: 7 } },
    description: "Cannot become addicted to alcohol. Drinking alcohol heals +2 HP."
  },
  "Pathfinder": {
    ranks: 1,
    requirements: { special: { perception: 6, endurance: 6 } },
    description: "Successful PER + Survival: wilderness travel time halved."
  },
  "Pharma Farma": {
    ranks: 1,
    requirements: { special: { luck: 6 } },
    description: "Find +1 random medicine/chem when scavenging (no AP cost)."
  },
  "Pickpocket": {
    ranks: 3,
    requirements: { special: { perception: 8, agility: 8 }, level: 1 },
    levelIncrement: 3,
    description: "Rank 1: Ignore first complication. Rank 2: Re-roll 1d20. Rank 3: Difficulty -1."
  },
  "Piercing Strike": {
    ranks: 1,
    requirements: { special: { strength: 7 } },
    description: "Unarmed/bladed melee: Piercing 1 or +1 to existing Piercing X."
  },
  "Pyromaniac": {
    ranks: 3,
    requirements: { special: { endurance: 6 }, level: 2 },
    levelIncrement: 4,
    description: "Fire weapons +1CDC damage per rank."
  },
  "Quick Draw": {
    ranks: 1,
    requirements: { special: { agility: 6 } },
    description: "Draw 1 weapon/item per turn without minor action."
  },
  "Quick Hands": {
    ranks: 1,
    requirements: { special: { agility: 8 } },
    description: "Spend 2 AP: Fire Rate +2 for one attack."
  },
  "Rad Resistance": {
    ranks: 2,
    requirements: { special: { endurance: 8 }, level: 1 },
    levelIncrement: 4,
    description: "Radiation DR +1 per rank (all locations).",
    modifiesDR: { type: 'rad', amount: 1 }
  },
  "Refractor": {
    ranks: 2,
    requirements: { special: { perception: 6, luck: 7 }, level: 1 },
    levelIncrement: 4,
    description: "Energy DR +1 per rank (all locations).",
    modifiesDR: { type: 'energy', amount: 1 }
  },
  "Ricochet": {
    ranks: 1,
    requirements: { special: { luck: 10 }, level: 5 },
    description: "Enemy ranged attack complication: spend 1 Luck to make it hit them instead."
  },
  "Rifleman": {
    ranks: 2,
    requirements: { special: { agility: 7 }, level: 2 },
    levelIncrement: 4,
    description: "Two-handed guns (Fire Rate ≤2, non-heavy): +1CDC per rank. Rank 2: Piercing 1 or +1 to existing."
  },
  "Robotics Expert": {
    ranks: 3,
    requirements: { special: { intelligence: 8 }, level: 2 },
    levelIncrement: 4,
    description: "Ranks unlock robot mods. Rank 2: robot repair difficulty -1. Rank 3: reprogram robots."
  },
  "Science!": {
    ranks: 3,
    requirements: { special: { intelligence: 6 }, level: 2 },
    levelIncrement: 4,
    description: "Ranks unlock energy weapon/advanced armor mods (rank 1/2/3)."
  },
  "Scoundrel": {
    ranks: 1,
    requirements: { special: { charisma: 7 } },
    description: "CHA + Speech to lie: ignore first complication."
  },
  "Scrapper": {
    ranks: 2,
    requirements: { level: 3 },
    levelIncrement: 5,
    description: "Rank 1: Salvage uncommon materials. Rank 2: Salvage rare materials."
  },
  "Scrounger": {
    ranks: 3,
    requirements: { special: { luck: 6 }, level: 1 },
    levelIncrement: 5,
    description: "Find more ammo. Rank 1: +3CDC. Rank 2: +6CDC. Rank 3: +10CDC."
  },
  "Shotgun Surgeon": {
    ranks: 1,
    requirements: { special: { strength: 5, agility: 7 } },
    description: "Shotguns: Piercing 1 or +1 to existing Piercing X."
  },
  "Skilled": {
    ranks: 10,
    requirements: { level: 3 },
    levelIncrement: 3,
    description: "Add +1 rank to two skills or +2 to one skill (max 6 ranks).",
    modifiesSkills: true
  },
  "Size Matters": {
    ranks: 3,
    requirements: { special: { endurance: 7, agility: 6 } },
    levelIncrement: 4,
    description: "Heavy weapons +1CDC damage per rank."
  },
  "Slayer": {
    ranks: 1,
    requirements: { special: { strength: 8 } },
    description: "Unarmed/melee damage: spend 1 Luck for immediate critical hit/injury."
  },
  "Smooth Talker": {
    ranks: 1,
    requirements: { special: { charisma: 6 } },
    description: "Opposed Barter/Speech tests: re-roll 1d20."
  },
  "Snakeater": {
    ranks: 1,
    requirements: { special: { endurance: 7 } },
    description: "Poison DR +2.",
    modifiesPoisonDR: 2
  },
  "Sniper": {
    ranks: 1,
    requirements: { special: { perception: 8, agility: 6 } },
    description: "Aim + two-handed Accurate weapon: target location without difficulty increase."
  },
  "Solar Powered": {
    ranks: 1,
    requirements: { special: { endurance: 7 } },
    description: "Heal 1 rad damage per hour in direct sunlight."
  },
  "Steady Aim": {
    ranks: 1,
    requirements: { special: { strength: 8, agility: 7 } },
    description: "Aim action: re-roll 2d20 on first attack OR 1d20 on all attacks this turn."
  },
  "Strong Back": {
    ranks: 3,
    requirements: { special: { strength: 5 }, level: 1 },
    levelIncrement: 2,
    description: "Max carry weight +25 lbs per rank.",
    modifiesCarryWeight: 25
  },
  "TAG!": {
    ranks: 1,
    requirements: { level: 5 },
    description: "Select one additional Tag skill (+2 ranks, max 6).",
    modifiesSkills: true
  },
  "Terrifying Presence": {
    ranks: 2,
    requirements: { special: { strength: 6, charisma: 8 }, level: 3 },
    levelIncrement: 5,
    description: "Rank 1: Speech to threaten: re-roll 1d20. Rank 2: Major action to force enemy to flee."
  },
  "Toughness": {
    ranks: 2,
    requirements: { special: { endurance: 6, luck: 6 }, level: 1 },
    levelIncrement: 4,
    description: "Physical DR +1 per rank (all locations).",
    modifiesDR: { type: 'physical', amount: 1 }
  }
};

// Add character level to defaultCharacter
const defaultCharacter = () => ({
  name: "",
  origin: "",
  background: "",
  caps: 0,
  level: 1,

  special: {
     strength: 5,
     perception: 5,
     endurance: 5,
     charisma: 5,
     intelligence: 5,
     agility: 5,
     luck: 5
  },

  specialPointsRemaining: 10,
  specialLocked: false,

  bodyParts: {
    head: { physDR: 0, radDR: 0, enDR: 0, maxHP: 0, currentHP: 0 },
    torso: { physDR: 0, radDR: 0, enDR: 0, maxHP: 0, currentHP: 0 },
    leftArm: { physDR: 0, radDR: 0, enDR: 0, maxHP: 0, currentHP: 0 },
    rightArm: { physDR: 0, radDR: 0, enDR: 0, maxHP: 0, currentHP: 0 },
    leftLeg: { physDR: 0, radDR: 0, enDR: 0, maxHP: 0, currentHP: 0 },
    rightLeg: { physDR: 0, radDR: 0, enDR: 0, maxHP: 0, currentHP: 0 }
  },

  poisonDR: 0,

  skills: {
    athletics:        { rank: 0, linked: "strength", trained: false },
    barter:           { rank: 0, linked: "charisma", trained: false },
    bigGuns:          { rank: 0, linked: "endurance", trained: false },
    energyWeapons:    { rank: 0, linked: "perception", trained: false },
    explosives:       { rank: 0, linked: "perception", trained: false },
    lockpick:         { rank: 0, linked: "perception", trained: false },
    medicine:         { rank: 0, linked: "intelligence", trained: false },
    meleeWeapons:     { rank: 0, linked: "strength", trained: false },
    pilot:            { rank: 0, linked: "perception", trained: false },
    repair:           { rank: 0, linked: "intelligence", trained: false },
    science:          { rank: 0, linked: "intelligence", trained: false },
    smallGuns:        { rank: 0, linked: "agility", trained: false },
    sneak:            { rank: 0, linked: "agility", trained: false },
    speech:           { rank: 0, linked: "charisma", trained: false },
    survival:         { rank: 0, linked: "endurance", trained: false },
    throwing:         { rank: 0, linked: "agility", trained: false },
    unarmed:          { rank: 0, linked: "strength", trained: false }
  },

  derived: {
     maxHP: 0,
     currentHP: 0,
     initiative: 0,
     defense: 0,
     currentCarryWeight: 0,
     maxCarryWeight: 0,
     meleeDamage: 0,
     luckPoints: 5,
     maxLuckPoints: 5
  },

  perks: [],
  gear: [],
  inventory: [],
  notes: "",
  weapons: []
});

let character = defaultCharacter();

// add helper to ensure loaded character has the expected shape
function ensureCharacterShape(ch) {
  const def = defaultCharacter();
  if (!ch || typeof ch !== 'object') return def;

  const out = Object.assign({}, def, ch);

  // Ensure nested objects/arrays exist and merge shallowly
  for (const key of Object.keys(def)) {
    if (Array.isArray(def[key])) {
      out[key] = Array.isArray(ch[key]) ? ch[key] : def[key].slice();
    } else if (def[key] && typeof def[key] === 'object') {
      out[key] = Object.assign({}, def[key], (ch[key] || {}));
    } else {
      out[key] = (ch[key] !== undefined) ? ch[key] : def[key];
    }
  }

  return out;
}

function calculateDerivedStats() {
  const s = character.special;

  // Base HP calculation
  character.derived.maxHP = s.endurance + s.luck;
  
  // Add Life Giver bonus
  character.derived.maxHP += getPerkBonus("Life Giver", "maxHP");
  
  if (character.derived.currentHP > character.derived.maxHP) {
    character.derived.currentHP = character.derived.maxHP;
  }

  character.derived.initiative = s.perception + s.agility;
  character.derived.defense = s.agility;

  // Calculate current carry weight from weapons AND inventory
  character.derived.currentCarryWeight = 0;
  
  if (Array.isArray(character.weapons)) {
    character.weapons.forEach(w => {
      character.derived.currentCarryWeight += (w.weight || 0);
    });
  }

  if (Array.isArray(character.inventory)) {
    character.inventory.forEach(inv => {
      character.derived.currentCarryWeight += (inv.weight || 0);
    });
  }

  // Base carry weight + Strong Back bonus
  character.derived.maxCarryWeight = 100 + s.strength * 10;
  character.derived.maxCarryWeight += getPerkBonus("Strong Back", "carryWeight");

  // Melee Damage modifier based on Strength (Fallout TTRPG rulebook)
  if (s.strength >= 11) {
    character.derived.meleeDamage = 3;
  } else if (s.strength >= 9) {
    character.derived.meleeDamage = 2;
  } else if (s.strength >= 7) {
    character.derived.meleeDamage = 1;
  } else {
    character.derived.meleeDamage = 0;
  }

  // Luck points: max = luck stat
  character.derived.maxLuckPoints = s.luck;
  if (character.derived.luckPoints > character.derived.maxLuckPoints) {
    character.derived.luckPoints = character.derived.maxLuckPoints;
  }

  updateDerivedSection();
  createBodyPartsSection();
}

function updateDerivedSection() {
  const d = character.derived;

  const html = `
    <h2>Player Info</h2>
    <div class="player-info-grid">
      <div class="info-field">
        <label>Name</label>
        <input type="text" value="${escapeHtml(character.name)}" onchange="updatePlayerInfo('name', this.value)">
      </div>
      <div class="info-field">
        <label>Level</label>
        <input type="number" min="1" value="${character.level}" onchange="updatePlayerInfo('level', this.value)">
      </div>
      <div class="info-field">
        <label>Origin</label>
        <input type="text" value="${escapeHtml(character.origin)}" onchange="updatePlayerInfo('origin', this.value)">
      </div>
      <div class="info-field">
        <label>Background</label>
        <input type="text" value="${escapeHtml(character.background)}" onchange="updatePlayerInfo('background', this.value)">
      </div>
      <div class="info-field">
        <label>Caps</label>
        <input type="number" min="0" value="${character.caps}" onchange="updatePlayerInfo('caps', this.value)">
      </div>
    </div>
    <div class="derived-stats-grid">
      <div class="stat-field">
        <label>Weight</label> <span>${d.currentCarryWeight} / ${d.maxCarryWeight}</span>
      </div>
      <div class="stat-field">
        <label>Luck</label>
        <div class="luck-input-group">
          <input type="number" min="0" max="${d.maxLuckPoints}" value="${d.luckPoints}" onchange="updateDerivedValue('luckPoints', this.value)"> / ${d.maxLuckPoints}
        </div>
      </div>
    </div>
  `;

  document.getElementById("player-section").innerHTML = html;
}

function updatePlayerInfo(field, value) {
  if (field === "caps" || field === "level") {
    character[field] = parseInt(value) || (field === "level" ? 1 : 0);
  } else {
    character[field] = value;
  }
  autosave();
  updateDerivedSection();
  createPerksSection(); // Re-render perks to update requirements
}

function updateDerivedValue(field, value) {
  const numValue = parseInt(value) || 0;
  
  if (field === "currentHP") {
    character.derived.currentHP = Math.max(0, Math.min(numValue, character.derived.maxHP));
  } else if (field === "luckPoints") {
    character.derived.luckPoints = Math.max(0, Math.min(numValue, character.derived.maxLuckPoints));
  }

  autosave();
  updateDerivedSection();
  createBodyPartsSection();
}

function saveCharacter() {
  const data = JSON.stringify(character, null, 2);
  const blob = new Blob([data], {type: "application/json"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = (character.name || "fallout-character") + ".json";
  a.click();
}

function loadCharacter(file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const parsed = JSON.parse(e.target.result);
    character = ensureCharacterShape(parsed);
    rebuildUIFromCharacter();
  };

  reader.readAsText(file);
}

function autosave() {
  localStorage.setItem("falloutCharacter", JSON.stringify(character));
}

setInterval(autosave, 2000);

function resetCharacter() {
  character = defaultCharacter();
  localStorage.removeItem("falloutCharacter");
  rebuildUIFromCharacter();
  calculateDerivedStats();
}

function createSpecialFields() {
  const section = document.getElementById("special-section");
  
  const headerHtml = character.specialLocked 
    ? `<h2>S.P.E.C.I.A.L <button id="edit-special-btn" class="edit-special">Edit</button></h2>`
    : `<h2>S.P.E.C.I.A.L <span class="remaining-points">Remaining Points: ${character.specialPointsRemaining}</span></h2>`;
  
  section.innerHTML = headerHtml;

  const stats = Object.keys(character.special);

  const row = document.createElement("div");
  row.className = "special-row";

  stats.forEach(stat => {
    const cell = document.createElement("div");
    cell.className = "special-cell";
    
    if (character.specialLocked) {
      // Display as non-editable span when locked
      cell.innerHTML = `
        <label class="special-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
        <span class="special-value">${character.special[stat]}</span>
      `;
    } else {
      // Display as editable input when unlocked
      cell.innerHTML = `
        <label class="special-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
        <input class="special-input" type="number" min="4" max="10" value="${character.special[stat]}"
          onchange="updateSpecial('${stat}', this.value)">
      `;
    }
    
    row.appendChild(cell);
  });

  section.appendChild(row);

  // Attach edit button listener if locked
  if (character.specialLocked) {
    const editBtn = section.querySelector('#edit-special-btn');
    if (editBtn) {
      editBtn.addEventListener('click', unlockSpecial);
    }
  }
}

function updateSpecial(stat, value) {
  const newValue = parseInt(value);
  const oldValue = character.special[stat];
  
  // Enforce minimum of 4 and maximum of 10
  if (isNaN(newValue) || newValue < 4 || newValue > 10) {
    createSpecialFields();
    return;
  }

  const pointDiff = newValue - oldValue;
  
  // Check if we have enough points
  if (pointDiff > character.specialPointsRemaining) {
    // Not enough points, revert to old value
    createSpecialFields();
    return;
  }

  character.special[stat] = newValue;
  character.specialPointsRemaining -= pointDiff;

  // Auto-lock when points reach 0
  if (character.specialPointsRemaining <= 0) {
    character.specialPointsRemaining = 0;
    character.specialLocked = true;
  }

  autosave();
  calculateDerivedStats();
  createSpecialFields();
}

function unlockSpecial() {
  character.specialLocked = false;
  autosave();
  createSpecialFields();
}

function createSkillFields() {
  const section = document.getElementById("skills-section");
  section.innerHTML = `
    <h2>Skills</h2>
    <div class="skills-header">
      <div class="skill-header-left">Name</div>
      <div class="skill-header-right">
        <span>TAG</span>
        <span class="skill-sep">|</span>
        <span>RANK</span>
      </div>
    </div>
  `;

  const statAbbr = {
    strength: "STR",
    perception: "PER",
    endurance: "END",
    charisma: "CHA",
    intelligence: "INT",
    agility: "AGI",
    luck: "LCK"
  };

  for (let skill in character.skills) {
    const info = character.skills[skill];
    const div = document.createElement("div");
    div.classList.add("skill-field");

    div.innerHTML = `
      <div class="skill-left">
        <label class="skill-name">${formatSkillName(skill)}</label>
        <span class="skill-linked">[${statAbbr[info.linked] || info.linked.toUpperCase()}]</span>
      </div>
      <div class="skill-right">
        <input type="checkbox" class="skill-trained" ${info.trained ? "checked" : ""} onchange="updateSkillTrained('${skill}', this.checked)">
        <span class="skill-sep">|</span>
        <input class="skill-rank" type="number" min="0" max="5" value="${info.rank}"
          onchange="updateSkill('${skill}', this.value)">
      </div>
    `;

    section.appendChild(div);
  }
}

function updateSkill(skill, value) {
  character.skills[skill].rank = parseInt(value) || 0;
  autosave();
}

function updateSkillTrained(skill, checked) {
  character.skills[skill].trained = !!checked;
  autosave();
}

function formatSkillName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function createBodyPartsSection() {
  const section = document.getElementById("body-parts-section");
  if (!section) return;

  const d = character.derived;
  const bp = character.bodyParts;

  section.innerHTML = `
    <h2>Combat Stats & Body Parts</h2>
    
    <div class="combat-stats-row">
      <div class="stat-field">
        <label>Initiative</label>
        <span>${d.initiative}</span>
      </div>
      <div class="stat-field">
        <label>Defense</label>
        <span>${d.defense}</span>
      </div>
      <div class="stat-field">
        <label>Melee Damage</label>
        <span>+${d.meleeDamage}</span>
      </div>
    </div>

    <div class="body-parts-grid">
      
      <div class="body-part-card poison-card">
        <div class="card-header">POISON DR</div>
        <input type="number" min="0" class="poison-input" value="${character.poisonDR || 0}" onchange="updatePoisonDR(this.value)">
      </div>

      <div class="body-part-card health-card">
        <div class="card-header">HEALTH</div>
        <div class="health-stats">
          <div class="stat-row">
            <label>Maximum HP</label>
            <span>${d.maxHP}</span>
          </div>
          <div class="stat-row">
            <label>Current HP</label>
            <div class="hp-input-group">
              <input type="number" min="0" max="${d.maxHP}" value="${d.currentHP}" onchange="updateDerivedValue('currentHP', this.value)">
            </div>
          </div>
        </div>
      </div>

      <div class="body-part-card head-card">
        <div class="card-header">HEAD (1-2)</div>
        <div class="body-part-grid">
          <div class="dr-field"><label>Phys. DR</label><input type="number" min="0" value="${bp.head.physDR}" onchange="updateBodyPart('head', 'physDR', this.value)"></div>
          <div class="dr-field"><label>Rad. DR</label><input type="number" min="0" value="${bp.head.radDR}" onchange="updateBodyPart('head', 'radDR', this.value)"></div>
          <div class="dr-field"><label>En. DR</label><input type="number" min="0" value="${bp.head.enDR}" onchange="updateBodyPart('head', 'enDR', this.value)"></div>
          <div class="dr-field"><label>HP</label><input type="number" min="0" value="${bp.head.currentHP}" onchange="updateBodyPart('head', 'currentHP', this.value)"></div>
        </div>
      </div>

      <div class="body-part-card left-arm-card">
        <div class="card-header">LEFT ARM (9-11)</div>
        <div class="body-part-grid">
          <div class="dr-field"><label>Phys. DR</label><input type="number" min="0" value="${bp.leftArm.physDR}" onchange="updateBodyPart('leftArm', 'physDR', this.value)"></div>
          <div class="dr-field"><label>Rad. DR</label><input type="number" min="0" value="${bp.leftArm.radDR}" onchange="updateBodyPart('leftArm', 'radDR', this.value)"></div>
          <div class="dr-field"><label>En. DR</label><input type="number" min="0" value="${bp.leftArm.enDR}" onchange="updateBodyPart('leftArm', 'enDR', this.value)"></div>
          <div class="dr-field"><label>HP</label><input type="number" min="0" value="${bp.leftArm.currentHP}" onchange="updateBodyPart('leftArm', 'currentHP', this.value)"></div>
        </div>
      </div>

      <div class="body-part-card right-arm-card">
        <div class="card-header">RIGHT ARM (12-14)</div>
        <div class="body-part-grid">
          <div class="dr-field"><label>Phys. DR</label><input type="number" min="0" value="${bp.rightArm.physDR}" onchange="updateBodyPart('rightArm', 'physDR', this.value)"></div>
          <div class="dr-field"><label>Rad. DR</label><input type="number" min="0" value="${bp.rightArm.radDR}" onchange="updateBodyPart('rightArm', 'radDR', this.value)"></div>
          <div class="dr-field"><label>En. DR</label><input type="number" min="0" value="${bp.rightArm.enDR}" onchange="updateBodyPart('rightArm', 'enDR', this.value)"></div>
          <div class="dr-field"><label>HP</label><input type="number" min="0" value="${bp.rightArm.currentHP}" onchange="updateBodyPart('rightArm', 'currentHP', this.value)"></div>
        </div>
      </div>

      <div class="body-part-card torso-card">
        <div class="card-header">TORSO (3-8)</div>
        <div class="body-part-grid">
          <div class="dr-field"><label>Phys. DR</label><input type="number" min="0" value="${bp.torso.physDR}" onchange="updateBodyPart('torso', 'physDR', this.value)"></div>
          <div class="dr-field"><label>Rad. DR</label><input type="number" min="0" value="${bp.torso.radDR}" onchange="updateBodyPart('torso', 'radDR', this.value)"></div>
          <div class="dr-field"><label>En. DR</label><input type="number" min="0" value="${bp.torso.enDR}" onchange="updateBodyPart('torso', 'enDR', this.value)"></div>
          <div class="dr-field"><label>HP</label><input type="number" min="0" value="${bp.torso.currentHP}" onchange="updateBodyPart('torso', 'currentHP', this.value)"></div>
        </div>
      </div>

      <div class="body-part-card left-leg-card">
        <div class="card-header">LEFT LEG (15-17)</div>
        <div class="body-part-grid">
          <div class="dr-field"><label>Phys. DR</label><input type="number" min="0" value="${bp.leftLeg.physDR}" onchange="updateBodyPart('leftLeg', 'physDR', this.value)"></div>
          <div class="dr-field"><label>Rad. DR</label><input type="number" min="0" value="${bp.leftLeg.radDR}" onchange="updateBodyPart('leftLeg', 'radDR', this.value)"></div>
          <div class="dr-field"><label>En. DR</label><input type="number" min="0" value="${bp.leftLeg.enDR}" onchange="updateBodyPart('leftLeg', 'enDR', this.value)"></div>
          <div class="dr-field"><label>HP</label><input type="number" min="0" value="${bp.leftLeg.currentHP}" onchange="updateBodyPart('leftLeg', 'currentHP', this.value)"></div>
        </div>
      </div>

      <div class="body-part-card right-leg-card">
        <div class="card-header">RIGHT LEG (18-20)</div>
        <div class="body-part-grid">
          <div class="dr-field"><label>Phys. DR</label><input type="number" min="0" value="${bp.rightLeg.physDR}" onchange="updateBodyPart('rightLeg', 'physDR', this.value)"></div>
          <div class="dr-field"><label>Rad. DR</label><input type="number" min="0" value="${bp.rightLeg.radDR}" onchange="updateBodyPart('rightLeg', 'radDR', this.value)"></div>
          <div class="dr-field"><label>En. DR</label><input type="number" min="0" value="${bp.rightLeg.enDR}" onchange="updateBodyPart('rightLeg', 'enDR', this.value)"></div>
          <div class="dr-field"><label>HP</label><input type="number" min="0" value="${bp.rightLeg.currentHP}" onchange="updateBodyPart('rightLeg', 'currentHP', this.value)"></div>
        </div>
      </div>

    </div>
  `;
}

function updateBodyPart(part, field, value) {
  if (!character.bodyParts[part]) return;
  character.bodyParts[part][field] = parseInt(value) || 0;
  autosave();
  createBodyPartsSection();
}

function updatePoisonDR(value) {
  character.poisonDR = parseInt(value) || 0;
  autosave();
}

function defaultPerk() {
  return { name: "", rank: 0, effect: "" };
}

function isPerkEmpty(perk) {
  if (!perk) return true;
  return !perk.name && Number(perk.rank) === 0 && !perk.effect;
}

function checkPerkRequirements(perkName, currentRank = 0) {
  const perk = PERK_DATABASE[perkName];
  if (!perk) return { canTake: false, reasons: ["Perk not found"] };
  
  const reasons = [];
  
  // Check if already at max rank
  if (currentRank >= perk.ranks) {
    return { canTake: false, reasons: ["Already at maximum rank"] };
  }
  
  // Check level requirement
  const reqLevel = (perk.requirements.level || 1) + (currentRank * (perk.levelIncrement || 0));
  if (character.level < reqLevel) {
    reasons.push(`Requires level ${reqLevel}`);
  }
  
  // Check SPECIAL requirements
  if (perk.requirements.special) {
    for (const [stat, value] of Object.entries(perk.requirements.special)) {
      if (character.special[stat] < value) {
        reasons.push(`Requires ${stat.toUpperCase()} ${value}`);
      }
    }
  }
  
  return {
    canTake: reasons.length === 0,
    reasons: reasons
  };
}

function applyPerkEffects(perkName, rank) {
  const perk = PERK_DATABASE[perkName];
  if (!perk) return;
  
  // Apply Strong Back carry weight bonus
  if (perk.modifiesCarryWeight) {
    // Effect applied in calculateDerivedStats
  }
  
  // Apply DR bonuses
  if (perk.modifiesDR) {
    // Effect applied in calculateDerivedStats
  }
  
  // Apply poison DR bonus
  if (perk.modifiesPoisonDR) {
    // Effect applied in calculateDerivedStats
  }
  
  // Life Giver HP bonus
  if (perk.modifiesHP) {
    // Effect applied in calculateDerivedStats
  }
  
  // Re-calculate derived stats to apply perk effects
  calculateDerivedStats();
}

function getPerkBonus(perkName, field) {
  const perkEntry = character.perks.find(p => p.name === perkName);
  if (!perkEntry || !perkEntry.rank) return 0;
  
  const perk = PERK_DATABASE[perkName];
  if (!perk) return 0;
  
  switch(field) {
    case 'carryWeight':
      return perk.modifiesCarryWeight ? perk.modifiesCarryWeight * perkEntry.rank : 0;
    case 'physicalDR':
      return (perk.modifiesDR && perk.modifiesDR.type === 'physical') ? perk.modifiesDR.amount * perkEntry.rank : 0;
    case 'energyDR':
      return (perk.modifiesDR && perk.modifiesDR.type === 'energy') ? perk.modifiesDR.amount * perkEntry.rank : 0;
    case 'radDR':
      return (perk.modifiesDR && perk.modifiesDR.type === 'rad') ? perk.modifiesDR.amount * perkEntry.rank : 0;
    case 'poisonDR':
      return perk.modifiesPoisonDR ? perk.modifiesPoisonDR : 0;
    case 'maxHP':
      if (perk.modifiesHP) {
        return character.special.endurance * perkEntry.rank;
      }
      return 0;
    default:
      return 0;
  }
}

function createPerksSection() {
  const section = document.getElementById("perks-section");
  
  if (!section) return;
  
  section.innerHTML = `
    <h2>Perks & Traits</h2>
    <div class="perks-controls">
      <label for="perk-select">Add Perk:</label>
      <select id="perk-select">
        <option value="">-- Select a Perk --</option>
        ${Object.keys(PERK_DATABASE).sort().map(name => `<option value="${name}">${name}</option>`).join('')}
      </select>
      <button id="add-perk-btn" class="add-perk">Add</button>
      <div id="perk-info" class="perk-info"></div>
    </div>
    <table id="perks-table">
      <thead>
        <tr>
          <th style="width:25%;">Name</th>
          <th style="width:8%;">Rank</th>
          <th style="width:50%;">Description</th>
          <th style="width:17%;">Status</th>
        </tr>
      </thead>
      <tbody id="perks-tbody"></tbody>
    </table>
  `;

  const perkSelect = section.querySelector('#perk-select');
  const perkInfo = section.querySelector('#perk-info');
  const addBtn = section.querySelector('#add-perk-btn');
  
  if (perkSelect) {
    perkSelect.addEventListener('change', (e) => {
      const perkName = e.target.value;
      if (perkName && PERK_DATABASE[perkName]) {
        const perk = PERK_DATABASE[perkName];
        const existing = character.perks.find(p => p.name === perkName);
        const currentRank = existing ? existing.rank : 0;
        const check = checkPerkRequirements(perkName, currentRank);
        
        let reqText = "Requirements: ";
        const reqs = [];
        if (perk.requirements.level) reqs.push(`Level ${perk.requirements.level + (currentRank * (perk.levelIncrement || 0))}`);
        if (perk.requirements.special) {
          for (const [stat, val] of Object.entries(perk.requirements.special)) {
            reqs.push(`${stat.toUpperCase()} ${val}`);
          }
        }
        if (reqs.length === 0) reqs.push("None");
        reqText += reqs.join(", ");
        
        const statusHtml = check.canTake 
          ? '<span class="valid">✓ Can take</span>' 
          : `<span class="invalid">✗ ${escapeHtml(check.reasons.join(", "))}</span>`;
        
        perkInfo.innerHTML = `
          <strong>${escapeHtml(perkName)}</strong> (Max Rank: ${perk.ranks})<br>
          ${escapeHtml(reqText)}<br>
          ${escapeHtml(perk.description)}<br>
          ${statusHtml}
        `;
      } else {
        perkInfo.innerHTML = '';
      }
    });
  }
  
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const perkName = perkSelect.value;
      if (!perkName) return;
      
      const existing = character.perks.find(p => p.name === perkName);
      const currentRank = existing ? existing.rank : 0;
      const check = checkPerkRequirements(perkName, currentRank);
      
      if (!check.canTake) {
        alert(`Cannot take this perk:\n${check.reasons.join("\n")}`);
        return;
      }
      
      if (existing) {
        existing.rank += 1;
      } else {
        character.perks.push({
          name: perkName,
          rank: 1,
          effect: PERK_DATABASE[perkName].description
        });
      }
      
      applyPerkEffects(perkName, existing ? existing.rank : 1);
      autosave();
      createPerksSection();
      perkSelect.value = '';
      perkInfo.innerHTML = '';
    });
  }

  if (!Array.isArray(character.perks)) character.perks = [];

  const tbody = section.querySelector("#perks-tbody");
  tbody.innerHTML = "";

  character.perks.forEach((perk, idx) => {
    const perkData = PERK_DATABASE[perk.name];
    const check = checkPerkRequirements(perk.name, perk.rank);
    const canIncrease = perkData && check.canTake;
    const canDecrease = perk.rank > 0;
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${escapeHtml(perk.name || "")}</strong></td>
      <td class="perk-rank-cell">
        <button class="rank-btn" onclick="adjustPerkRank(${idx}, -1)" ${!canDecrease ? 'disabled' : ''}>-</button>
        <span class="rank-display">${perk.rank}/${perkData ? perkData.ranks : '?'}</span>
        <button class="rank-btn" onclick="adjustPerkRank(${idx}, 1)" ${!canIncrease ? 'disabled' : ''}>+</button>
      </td>
      <td class="perk-description">${escapeHtml(perk.effect || "")}</td>
      <td class="perk-status">
        ${check.canTake ? '<span class="valid">✓ Valid</span>' : `<span class="invalid">✗ ${check.reasons[0]}</span>`}
        <button class="remove-btn" onclick="removePerk(${idx})">Remove</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adjustPerkRank(index, delta) {
  if (!character.perks[index]) return;
  
  const perk = character.perks[index];
  const newRank = perk.rank + delta;
  
  if (newRank <= 0) {
    removePerk(index);
    return;
  }
  
  const check = checkPerkRequirements(perk.name, perk.rank);
  if (delta > 0 && !check.canTake) {
    alert(`Cannot increase rank:\n${check.reasons.join("\n")}`);
    return;
  }
  
  perk.rank = newRank;
  applyPerkEffects(perk.name, newRank);
  autosave();
  createPerksSection();
}

function removePerk(index) {
  if (!character.perks[index]) return;
  character.perks.splice(index, 1);
  autosave();
  calculateDerivedStats();
  createPerksSection();
}

function createWeaponsSection() {
  const section = document.getElementById("weapons-section");
  if (!section) return;

  section.innerHTML = `
    <h2>Weapons <button class="add-weapon" onclick="addWeapon()">+ Add Weapon</button></h2>
    <table id="weapons-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Damage</th>
          <th>Range</th>
          <th>Weight</th>
          <th>Qualities</th>
          <th>Ammo</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="weapons-tbody"></tbody>
    </table>
  `;

  if (!Array.isArray(character.weapons)) character.weapons = [];

  const tbody = section.querySelector("#weapons-tbody");
  tbody.innerHTML = "";

  character.weapons.forEach((weapon, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" value="${escapeHtml(weapon.name || "")}" onchange="updateWeapon(${idx}, 'name', this.value)"></td>
      <td><input type="text" class="weapon-small" value="${escapeHtml(weapon.damage || "")}" onchange="updateWeapon(${idx}, 'damage', this.value)"></td>
      <td><input type="text" class="weapon-small" value="${escapeHtml(weapon.range || "")}" onchange="updateWeapon(${idx}, 'range', this.value)"></td>
      <td><input type="number" class="weapon-small" min="0" value="${weapon.weight || 0}" onchange="updateWeapon(${idx}, 'weight', this.value)"></td>
      <td><textarea class="weapon-large" onchange="updateWeapon(${idx}, 'qualities', this.value)">${escapeHtml(weapon.qualities || "")}</textarea></td>
      <td><input type="text" class="weapon-small" value="${escapeHtml(weapon.ammo || "")}" onchange="updateWeapon(${idx}, 'ammo', this.value)"></td>
      <td><button onclick="removeWeapon(${idx})">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function addWeapon() {
  if (!Array.isArray(character.weapons)) character.weapons = [];
  character.weapons.push({
    name: "",
    damage: "",
    range: "",
    weight: 0,
    qualities: "",
    ammo: ""
  });
  autosave();
  createWeaponsSection();
  calculateDerivedStats();
}

function updateWeapon(index, field, value) {
  if (!character.weapons[index]) return;
  
  if (field === 'weight') {
    character.weapons[index][field] = parseFloat(value) || 0;
  } else {
    character.weapons[index][field] = value;
  }
  
  autosave();
  calculateDerivedStats();
}

function removeWeapon(index) {
  if (!character.weapons[index]) return;
  character.weapons.splice(index, 1);
  autosave();
  createWeaponsSection();
  calculateDerivedStats();
}

function createInventorySection() {
  const section = document.getElementById("other-section");
  if (!section) return;

  section.innerHTML = `
    <h2>Inventory <button class="add-inventory" onclick="addInventoryItem()">+ Add Item</button></h2>
    <table id="inventory-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Weight</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="inventory-tbody"></tbody>
    </table>
  `;

  if (!Array.isArray(character.inventory)) character.inventory = [];

  const tbody = section.querySelector("#inventory-tbody");
  tbody.innerHTML = "";

  character.inventory.forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" value="${escapeHtml(item.name || "")}" onchange="updateInventoryItem(${idx}, 'name', this.value)"></td>
      <td><input type="number" class="inventory-quantity" min="0" value="${item.quantity || 1}" onchange="updateInventoryItem(${idx}, 'quantity', this.value)"></td>
      <td><input type="number" class="inventory-weight" min="0" step="0.1" value="${item.weight || 0}" onchange="updateInventoryItem(${idx}, 'weight', this.value)"></td>
      <td><button onclick="removeInventoryItem(${idx})">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function addInventoryItem() {
  if (!Array.isArray(character.inventory)) character.inventory = [];
  character.inventory.push({
    name: "",
    quantity: 1,
    weight: 0
  });
  autosave();
  createInventorySection();
}

function updateInventoryItem(index, field, value) {
  if (!character.inventory[index]) return;
  
  if (field === 'quantity') {
    character.inventory[index][field] = parseInt(value) || 0;
  } else if (field === 'weight') {
    character.inventory[index][field] = parseFloat(value) || 0;
  } else {
    character.inventory[index][field] = value;
  }
  
  autosave();
  calculateDerivedStats();
}

function removeInventoryItem(index) {
  if (!character.inventory[index]) return;
  character.inventory.splice(index, 1);
  autosave();
  createInventorySection();
  calculateDerivedStats();
}

// ...existing code for rebuildUIFromCharacter...

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function createHeader() {
  const header = document.getElementById("header");
  header.innerHTML = `
    <h1>Fallout Character Creator</h1>
    <div class="header-buttons">
      <button id="save-btn">Save Character</button>
      <button id="load-btn">Load Character</button>
      <input type="file" id="load-file" accept=".json" style="display: none;">
      <button id="reset-btn">Reset Character</button>
    </div>
  `;
}

function rebuildUIFromCharacter() {
  createHeader();
  createSpecialFields();
  createSkillFields();
  createBodyPartsSection();
  createWeaponsSection();
  createInventorySection();
  createPerksSection();
  calculateDerivedStats();
}

window.onload = () => {
  const saved = localStorage.getItem("falloutCharacter");
  if (saved) {
    try {
      character = ensureCharacterShape(JSON.parse(saved));
    } catch (err) {
      console.error("Failed to parse saved character, using defaults.", err);
      character = defaultCharacter();
    }
  }

  rebuildUIFromCharacter();

  // Attach button listeners after UI is built
  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) saveBtn.addEventListener("click", saveCharacter);

  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) resetBtn.addEventListener("click", resetCharacter);

  const loadBtn = document.getElementById("load-btn");
  if (loadBtn) loadBtn.addEventListener("click", () => {
    const loadFileInput = document.getElementById("load-file");
    if (loadFileInput) loadFileInput.click();
  });

  const loadFileInput = document.getElementById("load-file");
  if (loadFileInput) {
    loadFileInput.addEventListener("change", (event) => {
      if (event.target.files[0]) loadCharacter(event.target.files[0]);
    });
  }
};
