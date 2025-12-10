// PERK_DATABASE moved to separate file perks.js for maintainability.

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

  specialPointsRemaining: 5, // Changed from 10 to 5
  specialLocked: false,

  // Add overrides object
  overrides: {
    initiative: null,
    defense: null,
    meleeDamage: null,
    maxHP: null,
    strength: null,
    perception: null,
    endurance: null,
    charisma: null,
    intelligence: null,
    agility: null,
    luck: null,
    bonusSkillPoints: null,
    bonusSpecialPoints: null
  },

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

  skillPointsSpent: 0,

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

function getEffectiveSpecial(stat) {
  const o = character.overrides || {};
  const override = o[stat];
  return override !== null && override !== undefined ? override : character.special[stat];
}

function calculateDerivedStats() {
  const s = {
    strength: getEffectiveSpecial('strength'),
    perception: getEffectiveSpecial('perception'),
    endurance: getEffectiveSpecial('endurance'),
    charisma: getEffectiveSpecial('charisma'),
    intelligence: getEffectiveSpecial('intelligence'),
    agility: getEffectiveSpecial('agility'),
    luck: getEffectiveSpecial('luck')
  };
  const o = character.overrides || {};

  // Base HP calculation: Endurance + Luck + (Level - 1) + Perk bonuses
  const levelBonus = Math.max(0, character.level - 1);
  const calcMaxHP = s.endurance + s.luck + levelBonus + getPerkBonus("Life Giver", "maxHP");
  character.derived.maxHP = o.maxHP !== null && o.maxHP !== undefined ? o.maxHP : calcMaxHP;
  
  if (character.derived.currentHP > character.derived.maxHP) {
    character.derived.currentHP = character.derived.maxHP;
  }

  const calcInitiative = s.perception + s.agility;
  character.derived.initiative = o.initiative !== null && o.initiative !== undefined ? o.initiative : calcInitiative;
  
  const calcDefense = s.agility;
  character.derived.defense = o.defense !== null && o.defense !== undefined ? o.defense : calcDefense;

  // Calculate current carry weight from weapons AND inventory
  character.derived.currentCarryWeight = 0;
  
  if (Array.isArray(character.weapons)) {
    character.weapons.forEach(w => {
      character.derived.currentCarryWeight += (w.weight || 0);
    });
  }

  if (Array.isArray(character.inventory)) {
    character.inventory.forEach(inv => {
      const quantity = inv.quantity || 0;
      const unitWeight = inv.weight || 0;
      const totalWeight = quantity * unitWeight;
      character.derived.currentCarryWeight += totalWeight;
    });
  }

  // Base carry weight + Strong Back bonus
  character.derived.maxCarryWeight = 100 + s.strength * 10;
  character.derived.maxCarryWeight += getPerkBonus("Strong Back", "carryWeight");

  // Melee Damage modifier based on Strength
  let calcMeleeDamage;
  if (s.strength >= 11) {
    calcMeleeDamage = 3;
  } else if (s.strength >= 9) {
    calcMeleeDamage = 2;
  } else if (s.strength >= 7) {
    calcMeleeDamage = 1;
  } else {
    calcMeleeDamage = 0;
  }
  character.derived.meleeDamage = o.meleeDamage !== null && o.meleeDamage !== undefined ? o.meleeDamage : calcMeleeDamage;

  // Luck points: max = luck stat
  character.derived.maxLuckPoints = s.luck;
  if (character.derived.luckPoints > character.derived.maxLuckPoints) {
    character.derived.luckPoints = character.derived.maxLuckPoints;
  }

  updateDerivedSection();
  createBodyPartsSection();
  createSkillFields(); // Update skills display when stats change
}

function updateDerivedSection() {
  const d = character.derived;
  const isOverweight = d.currentCarryWeight > d.maxCarryWeight;

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
        <label>Weight</label> 
        <span class="${isOverweight ? 'overweight-warning' : ''}">
          ${d.currentCarryWeight} / ${d.maxCarryWeight}
          ${isOverweight ? ' <span class="warning-badge">Carry Weight Exceeded</span>' : ''}
        </span>
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
  calculateDerivedStats(); // Add this line to recalculate HP when level changes
  updateDerivedSection();
  createSkillFields(); // Update skill points when level changes
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
  // Show confirmation dialog with proper warning symbol
  const confirmed = confirm(
    "WARNING: This will permanently delete your current character!\n\n" +
    "This action cannot be undone. All character data will be lost.\n\n" +
    "Are you sure you want to reset?"
  );
  
  if (!confirmed) {
    return; // User cancelled, do nothing
  }
  
  character = defaultCharacter();
  localStorage.removeItem("falloutCharacter");
  localStorage.removeItem("combatEditMode"); // Also reset edit mode
  rebuildUIFromCharacter();
  calculateDerivedStats();
}

function toggleCombatEditMode() {
  const currentMode = localStorage.getItem("combatEditMode") === "true";
  localStorage.setItem("combatEditMode", !currentMode);
  
  if (!currentMode) {
    // Entering edit mode - ensure overrides object exists
    if (!character.overrides) {
      character.overrides = {
        initiative: null,
        defense: null,
        meleeDamage: null,
        maxHP: null,
        strength: null,
        perception: null,
        endurance: null,
        charisma: null,
        intelligence: null,
        agility: null,
        luck: null,
        bonusSkillPoints: null,
        bonusSpecialPoints: null
      };
    }
  }
  
  createHeader(); // Re-render header to update button text
  createSpecialFields();
  createBodyPartsSection();
  createSkillFields(); // Update skills to show bonus points input
}

function updateCombatOverride(field, value) {
  if (!character.overrides) {
    character.overrides = {};
  }
  
  const numValue = parseInt(value);
  character.overrides[field] = isNaN(numValue) ? null : numValue;
  
  autosave();
  calculateDerivedStats();
}

function updateSpecialOverride(stat, value) {
  if (!character.overrides) {
    character.overrides = {};
  }
  
  const numValue = parseInt(value);
  character.overrides[stat] = isNaN(numValue) ? null : numValue;
  
  autosave();
  calculateDerivedStats();
  createSpecialFields();
  createSkillFields(); // Update skill points when override changes
}

function updateBonusSkillPoints(value) {
  if (!character.overrides) {
    character.overrides = {};
  }
  
  const numValue = parseInt(value);
  character.overrides.bonusSkillPoints = isNaN(numValue) ? null : numValue;
  
  autosave();
  createSkillFields(); // Re-render to update skill points total
}

function updateBonusSpecialPoints(value) {
  if (!character.overrides) {
    character.overrides = {};
  }
  
  const numValue = parseInt(value);
  character.overrides.bonusSpecialPoints = isNaN(numValue) ? null : numValue;
  
  autosave();
  createSpecialFields(); // Re-render to update special points total
}

function createSpecialFields() {
  const section = document.getElementById("special-section");
  const editMode = localStorage.getItem("combatEditMode") === "true";
  const o = character.overrides || {};
  
  const bonusSpecialPoints = editMode && (o.bonusSpecialPoints !== null && o.bonusSpecialPoints !== undefined) 
    ? parseInt(o.bonusSpecialPoints) || 0 
    : 0;
  const effectiveSpecialRemaining = character.specialPointsRemaining + bonusSpecialPoints;
  
  const bonusPointsInput = editMode
    ? `<div style="margin-top: 8px;"><label style="font-size: 0.9em; color: #ffd700;">Bonus SPECIAL Points: </label><input type="number" class="combat-override" style="width: 70px;" value="${o.bonusSpecialPoints || 0}" onchange="updateBonusSpecialPoints(this.value)"></div>`
    : '';
  
  const headerHtml = editMode
    ? `<h2>S.P.E.C.I.A.L <span class="edit-mode-indicator">(Edit Mode Active)</span></h2>${bonusPointsInput}`
    : character.specialLocked 
      ? `<h2>S.P.E.C.I.A.L</h2>`
      : `<h2>S.P.E.C.I.A.L <span class="remaining-points">Remaining Points: ${effectiveSpecialRemaining}</span></h2>`;
  
  section.innerHTML = headerHtml;

  const stats = Object.keys(character.special);

  const row = document.createElement("div");
  row.className = "special-row";

  stats.forEach(stat => {
    const cell = document.createElement("div");
    cell.className = "special-cell";
    
    const baseValue = character.special[stat];
    const overrideValue = o[stat] !== null && o[stat] !== undefined ? o[stat] : baseValue;
    
    if (editMode) {
      // Edit mode: show override input with base value
      cell.innerHTML = `
        <label class="special-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
        <input class="special-override" type="number" min="1" max="20" value="${overrideValue}" 
          onchange="updateSpecialOverride('${stat}', this.value)">
        <span class="special-base-value">(Base: ${baseValue})</span>
      `;
    } else if (character.specialLocked) {
      const displayValue = overrideValue;
      cell.innerHTML = `
        <label class="special-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
        <span class="special-value">${displayValue}</span>
        ${overrideValue !== baseValue ? `<span class="special-override-indicator">*</span>` : ''}
      `;
    } else {
      cell.innerHTML = `
        <label class="special-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
        <input class="special-input" type="number" min="4" max="10" value="${baseValue}"
          onchange="updateSpecial('${stat}', this.value)">
      `;
    }
    
    row.appendChild(cell);
  });

  section.appendChild(row);
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
  
  // Calculate effective remaining points (includes bonus from edit mode)
  const o = character.overrides || {};
  const bonusSpecialPoints = (o.bonusSpecialPoints !== null && o.bonusSpecialPoints !== undefined) 
    ? parseInt(o.bonusSpecialPoints) || 0 
    : 0;
  const effectiveSpecialRemaining = character.specialPointsRemaining + bonusSpecialPoints;
  
  // Check if we have enough points
  if (pointDiff > effectiveSpecialRemaining) {
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
  createSkillFields(); // Update skill points when SPECIAL changes
}

function unlockSpecial() {
  character.specialLocked = false;
  autosave();
  createSpecialFields();
}

function calculateSkillPoints() {
  const s = {
    intelligence: getEffectiveSpecial('intelligence')
  };
  
  // Total skill points = (Level - 1) + (9 + Intelligence)
  let totalPoints = (character.level - 1) + (9 + s.intelligence);
  
  // Check if player has "Skilled" perk - each rank adds 2 skill points (max 10 ranks)
  const skilledPerk = character.perks.find(p => p.name === "Skilled");
  if (skilledPerk && skilledPerk.rank > 0) {
    const effectiveRank = Math.min(skilledPerk.rank, 10);
    totalPoints += effectiveRank * 2;
  }
  
  // Add bonus skill points from edit mode
  const o = character.overrides || {};
  if (o.bonusSkillPoints !== null && o.bonusSkillPoints !== undefined) {
    totalPoints += parseInt(o.bonusSkillPoints) || 0;
  }
  
  // Calculate spent points
  let spentPoints = 0;
  for (let skill in character.skills) {
    spentPoints += character.skills[skill].rank;
  }
  
  return {
    total: totalPoints,
    spent: spentPoints,
    remaining: totalPoints - spentPoints
  };
}

function createSkillFields() {
  const section = document.getElementById("skills-section");
  const skillPoints = calculateSkillPoints();
  const editMode = localStorage.getItem("combatEditMode") === "true";
  const o = character.overrides || {};
  
  const skillPointsDisplay = skillPoints.remaining > 0 
    ? `<span class="remaining-points">Skill Points: ${skillPoints.spent} / ${skillPoints.total}</span>`
    : '';
  
  const bonusPointsInput = editMode
    ? `<div style="margin-top: 8px;"><label style="font-size: 0.9em; color: #ffd700;">Bonus Skill Points: </label><input type="number" class="combat-override" style="width: 70px;" value="${o.bonusSkillPoints || 0}" onchange="updateBonusSkillPoints(this.value)"></div>`
    : '';
  
  section.innerHTML = `
    <h2>Skills ${skillPointsDisplay}</h2>
    ${bonusPointsInput}
    <table id="skills-table">
      <thead>
        <tr>
          <th style="width:45%;">Name</th>
          <th style="width:15%;">Linked</th>
          <th style="width:20%;">Trained</th>
          <th style="width:20%;">Rank</th>
        </tr>
      </thead>
      <tbody id="skills-tbody"></tbody>
    </table>
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

  const tbody = section.querySelector("#skills-tbody");
  tbody.innerHTML = "";

  for (let skill in character.skills) {
    const info = character.skills[skill];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="skill-name-cell">${formatSkillName(skill)}</td>
      <td class="skill-linked-cell">${statAbbr[info.linked] || info.linked.toUpperCase()}</td>
      <td class="skill-trained-cell"><input type="checkbox" class="skill-trained" ${info.trained ? "checked" : ""} onchange="updateSkillTrained('${skill}', this.checked)"></td>
      <td class="skill-rank-cell"><input class="skill-rank" type="number" min="0" max="6" value="${info.rank}" onchange="updateSkill('${skill}', this.value)"></td>
    `;
    tbody.appendChild(tr);
  }
}

function updateSkill(skill, value) {
  const newValue = parseInt(value) || 0;
  const oldValue = character.skills[skill].rank;
  const skillPoints = calculateSkillPoints();
  
  // Calculate what the new spent total would be
  const pointDiff = newValue - oldValue;
  const newSpent = skillPoints.spent + pointDiff;
  
  // Prevent exceeding max skill points
  if (newSpent > skillPoints.total) {
    alert(`Not enough skill points! You have ${skillPoints.remaining} points remaining.`);
    createSkillFields(); // Re-render to reset the input value
    return;
  }
  
  // Enforce max rank of 6
  if (newValue > 6) {
    alert('Maximum skill rank is 6.');
    createSkillFields();
    return;
  }
  
  character.skills[skill].rank = newValue;
  autosave();
  createSkillFields(); // Re-render to update skill points counter
}

function updateSkillTrained(skill, checked) {
  character.skills[skill].trained = !!checked;
  autosave();
  createSkillFields(); // Re-render to update display
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
  const o = character.overrides || {};

  const s = {
    strength: getEffectiveSpecial('strength'),
    perception: getEffectiveSpecial('perception'),
    endurance: getEffectiveSpecial('endurance'),
    charisma: getEffectiveSpecial('charisma'),
    intelligence: getEffectiveSpecial('intelligence'),
    agility: getEffectiveSpecial('agility'),
    luck: getEffectiveSpecial('luck')
  };

  const editMode = localStorage.getItem("combatEditMode") === "true";

  // Calculate base values
  const baseInitiative = s.perception + s.agility;
  const baseDefense = s.agility;
  let baseMeleeDamage;
  if (s.strength >= 11) baseMeleeDamage = 3;
  else if (s.strength >= 9) baseMeleeDamage = 2;
  else if (s.strength >= 7) baseMeleeDamage = 1;
  else baseMeleeDamage = 0;
  const levelBonus = Math.max(0, character.level - 1);
  const baseMaxHP = s.endurance + s.luck + levelBonus + getPerkBonus("Life Giver", "maxHP");

  const initiativeValue = o.initiative !== null && o.initiative !== undefined ? o.initiative : baseInitiative;
  const defenseValue = o.defense !== null && o.defense !== undefined ? o.defense : baseDefense;
  const meleeDamageValue = o.meleeDamage !== null && o.meleeDamage !== undefined ? o.meleeDamage : baseMeleeDamage;
  const maxHPValue = o.maxHP !== null && o.maxHP !== undefined ? o.maxHP : baseMaxHP;

  section.innerHTML = `
    <h2>Combat Stats & Body Parts</h2>
    
    <div class="combat-stats-row">
      <div class="stat-field">
        ${editMode ? `
          <label>Initiative</label>
          <input type="number" class="combat-override" value="${initiativeValue}" onchange="updateCombatOverride('initiative', this.value)">
          <span class="base-value">(Base: ${baseInitiative})</span>
        ` : `<span>Initiative ${initiativeValue}</span>`}
      </div>
      <div class="stat-field">
        ${editMode ? `
          <label>Defense</label>
          <input type="number" class="combat-override" value="${defenseValue}" onchange="updateCombatOverride('defense', this.value)">
          <span class="base-value">(Base: ${baseDefense})</span>
        ` : `<span>Defense ${defenseValue}</span>`}
      </div>
      <div class="stat-field">
        ${editMode ? `
          <label>Melee Damage</label>
          <input type="number" class="combat-override" value="${meleeDamageValue}" onchange="updateCombatOverride('meleeDamage', this.value)">
          <span class="base-value">(Base: +${baseMeleeDamage})</span>
        ` : `<span>Melee Damage +${meleeDamageValue}</span>`}
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
            ${editMode ? `
              <div class="hp-override-group">
                <input type="number" class="hp-override" value="${maxHPValue}" onchange="updateCombatOverride('maxHP', this.value)">
                <span class="base-value">(Base: ${baseMaxHP})</span>
              </div>
            ` : `<span>${maxHPValue}</span>`}
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
          ? '<span class="valid">&#10003; Can take</span>' 
          : `<span class="invalid">&#10007; ${escapeHtml(check.reasons.join(", "))}</span>`;
        
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
        ${check.canTake ? '<span class="valid">&#10003; Valid</span>' : `<span class="invalid">&#10007; ${check.reasons[0]}</span>`}
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
  createSkillFields(); // Update skill points when perks change
}

function removePerk(index) {
  if (!character.perks[index]) return;
  character.perks.splice(index, 1);
  autosave();
  calculateDerivedStats();
  createPerksSection();
  createSkillFields(); // Update skill points when perks are removed
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
          <th>Skill</th>
          <th>TN</th>
          <th>Tag</th>
          <th>Damage</th>
          <th>Effects</th>
          <th>Type</th>
          <th>Rate</th>
          <th>Range</th>
          <th>Qualities</th>
          <th>Ammo</th>
          <th>Weight</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="weapons-tbody"></tbody>
    </table>
  `;

  if (!Array.isArray(character.weapons)) character.weapons = [];

  const tbody = section.querySelector("#weapons-tbody");
  tbody.innerHTML = "";

  // Migration: ensure existing weapon objects have new fields
  character.weapons.forEach(w => {
    if (w.tn === undefined) w.tn = 0;
    if (w.tag === undefined) w.tag = false;
    if (w.effects === undefined) w.effects = "";
    if (w.type === undefined) w.type = "";
    if (w.rate === undefined) w.rate = 0;
    if (w.range === undefined) w.range = "C";
    if (w.qualities === undefined && w.notes !== undefined) w.qualities = w.notes; // legacy notes
    if (w.qualities === undefined) w.qualities = "";
    if (w.ammo === undefined) w.ammo = 0;
    if (w.weight === undefined) w.weight = 0;
    if (w.skill === undefined) w.skill = "";
  });

  const skillOptions = Object.keys(character.skills).map(k => `<option value="${k}">${formatSkillName(k)}</option>`).join("");

  character.weapons.forEach((weapon, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" class="weapon-name" value="${escapeHtml(weapon.name)}" onchange="updateWeapon(${idx}, 'name', this.value)"></td>
      <td>
        <select class="weapon-select" onchange="updateWeapon(${idx}, 'skill', this.value)">
          <option value="">--</option>
          ${skillOptions.replace(new RegExp(`value=\"${weapon.skill}\"`), `value=\"${weapon.skill}\" selected`)}
        </select>
      </td>
      <td><input type="number" class="weapon-num" min="0" max="99" value="${weapon.tn}" onchange="updateWeapon(${idx}, 'tn', this.value)"></td>
      <td><input type="checkbox" class="weapon-checkbox" ${weapon.tag ? 'checked' : ''} onchange="updateWeapon(${idx}, 'tag', this.checked)"></td>
      <td><input type="number" class="weapon-num" min="0" max="99" value="${weapon.damage}" onchange="updateWeapon(${idx}, 'damage', this.value)"></td>
      <td><input type="text" class="weapon-text" value="${escapeHtml(weapon.effects)}" onchange="updateWeapon(${idx}, 'effects', this.value)"></td>
      <td><input type="text" class="weapon-text" value="${escapeHtml(weapon.type)}" onchange="updateWeapon(${idx}, 'type', this.value)"></td>
      <td><input type="number" class="weapon-num" min="0" max="9" value="${weapon.rate}" onchange="updateWeapon(${idx}, 'rate', this.value)"></td>
      <td>
        <select class="weapon-select" onchange="updateWeapon(${idx}, 'range', this.value)">
          <option value="C" ${weapon.range === 'C' ? 'selected' : ''}>C</option>
          <option value="M" ${weapon.range === 'M' ? 'selected' : ''}>M</option>
          <option value="L" ${weapon.range === 'L' ? 'selected' : ''}>L</option>
        </select>
      </td>
      <td><input type="text" class="weapon-text" value="${escapeHtml(weapon.qualities)}" onchange="updateWeapon(${idx}, 'qualities', this.value)"></td>
      <td><input type="number" class="weapon-num" min="0" max="99" value="${weapon.ammo}" onchange="updateWeapon(${idx}, 'ammo', this.value)"></td>
      <td><input type="number" class="weapon-num" min="0" max="99" step="1" value="${weapon.weight}" onchange="updateWeapon(${idx}, 'weight', this.value)"></td>
      <td><button onclick="removeWeapon(${idx})">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function addWeapon() {
  if (!Array.isArray(character.weapons)) character.weapons = [];
  character.weapons.push({
    name: "",
    skill: "",
    tn: 0,
    tag: false,
    damage: 0,
    effects: "",
    type: "",
    rate: 0,
    range: "C",
    qualities: "",
    ammo: 0,
    weight: 0
  });
  autosave();
  createWeaponsSection();
  calculateDerivedStats();
}

function updateWeapon(index, field, value) {
  if (!character.weapons[index]) return;
  
  const numericFields = ['tn','damage','rate','ammo','weight'];
  if (field === 'tag') {
    character.weapons[index][field] = !!value;
  } else if (numericFields.includes(field)) {
    character.weapons[index][field] = parseInt(value) || 0;
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
          <th>Unit Weight</th>
          <th>Total Weight</th>
          <th>Reference</th>
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
    const quantity = item.quantity || 0;
    const unitWeight = item.weight || 0;
    const totalWeight = quantity * unitWeight;
    const reference = item.reference || "";
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" value="${escapeHtml(item.name || "")}" onchange="updateInventoryItem(${idx}, 'name', this.value)"></td>
      <td><input type="number" class="inventory-quantity" min="0" value="${quantity}" onchange="updateInventoryItem(${idx}, 'quantity', this.value)"></td>
      <td><input type="number" class="inventory-weight" min="0" step="0.1" value="${unitWeight}" onchange="updateInventoryItem(${idx}, 'weight', this.value)"></td>
      <td><span class="total-weight">${totalWeight.toFixed(1)}</span></td>
      <td><input type="text" class="inventory-reference" value="${escapeHtml(reference)}" onchange="updateInventoryItem(${idx}, 'reference', this.value)"></td>
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
    weight: 0,
    reference: ""
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
  createInventorySection(); // Re-render inventory to update total weight
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
  const editMode = localStorage.getItem("combatEditMode") === "true";
  
  header.innerHTML = `
    <h1>Fallout Character Creator</h1>
    <div class="header-buttons">
      <button id="save-btn">Save Character</button>
      <button id="load-btn">Load Character</button>
      <input type="file" id="load-file" accept=".json" style="display: none;">
      <button id="edit-stats-btn">${editMode ? 'Lock Stats' : 'Edit Stats'}</button>
      <button id="reset-btn">Reset Character</button>
    </div>
  `;

  // Attach event listeners immediately after creating elements
  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) saveBtn.addEventListener("click", saveCharacter);

  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) resetBtn.addEventListener("click", resetCharacter);
  
  const editStatsBtn = document.getElementById("edit-stats-btn");
  if (editStatsBtn) editStatsBtn.addEventListener("click", toggleCombatEditMode);

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
  
  // Event listeners are now attached in createHeader()
};
