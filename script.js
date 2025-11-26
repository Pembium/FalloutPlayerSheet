const defaultCharacter = () => ({
  name: "",
  origin: "",
  background: "",

  special: {
     strength: 5,
     perception: 5,
     endurance: 5,
     charisma: 5,
     intelligence: 5,
     agility: 5,
     luck: 5
  },

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
     carryWeight: 0,
     meleeDamage: 0,
     luckPoints: 5,
     maxLuckPoints: 5
  },

  perks: [],
  gear: [],
  notes: "",
  weapons: []
});

let character = defaultCharacter();


function calculateDerivedStats() {
  const s = character.special;

  character.derived.maxHP = s.endurance + 5; // Level = 1 by default
  // Clamp currentHP to not exceed maxHP
  if (character.derived.currentHP > character.derived.maxHP) {
    character.derived.currentHP = character.derived.maxHP;
  }

  character.derived.initiative = s.perception + s.agility;
  character.derived.defense = s.agility;
  character.derived.carryWeight = s.strength * 10;

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
  // Clamp current luck points to not exceed max
  if (character.derived.luckPoints > character.derived.maxLuckPoints) {
    character.derived.luckPoints = character.derived.maxLuckPoints;
  }

  updateDerivedSection();
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

document.getElementById("reset-btn").addEventListener("click", resetCharacter);


document.getElementById("load-btn").addEventListener("click", () => {
  document.getElementById("load-file").click();
});

document.getElementById("load-file").addEventListener("change", (event) => {
  loadCharacter(event.target.files[0]);
});


function autosave() {
  localStorage.setItem("falloutCharacter", JSON.stringify(character));
}

setInterval(autosave, 2000);

// Load existing autosave if present
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
};

function resetCharacter() {
  // Replace character with fresh default
  character = defaultCharacter();

  // Clear autosave to prevent reload overwriting the reset
  localStorage.removeItem("falloutCharacter");

  // Rebuild everything in the UI
  rebuildUIFromCharacter();

  // Recalculate stats immediately
  calculateDerivedStats();
}

function createSpecialFields() {
  const section = document.getElementById("special-section");
  section.innerHTML = "<h2>S.P.E.C.I.A.L</h2>";

  const stats = Object.keys(character.special);

  const labelRow = document.createElement("div");
  labelRow.className = "special-row labels";

  const inputRow = document.createElement("div");
  inputRow.className = "special-row inputs";

  stats.forEach(stat => {
    const labelCell = document.createElement("div");
    labelCell.className = "special-cell";
    labelCell.innerHTML = `<label class="special-label">${stat.toUpperCase()}</label>`;
    labelRow.appendChild(labelCell);

    const inputCell = document.createElement("div");
    inputCell.className = "special-cell";
    inputCell.innerHTML = `
      <input class="special-input" type="number" min="1" max="10" value="${character.special[stat]}"
        onchange="updateSpecial('${stat}', this.value)">
    `;
    inputRow.appendChild(inputCell);
  });

  section.appendChild(labelRow);
  section.appendChild(inputRow);
}

function updateSpecial(stat, value) {
  character.special[stat] = parseInt(value);
  calculateDerivedStats();
}


function createSkillFields() {
  const section = document.getElementById("skills-section");
  section.innerHTML = "<h2>Skills</h2>";

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
  calculateDerivedStats();
}

function updateSkillTrained(skill, checked) {
  character.skills[skill].trained = !!checked;
  autosave();
}

// small helper to turn camelCase / mixed names into readable labels
function formatSkillName(key) {
  // Insert space before caps and capitalize each word
  return key
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}


function updateDerivedSection() {
  const d = character.derived;

  const html = `
    <h2>Derived Stats</h2>
    <div class="special-field">
      <label>Max HP</label> <span>${d.maxHP}</span>
    </div>
    <div class="special-field">
      <label>Current HP</label> 
      <div class="hp-input-group">
        <input type="number" min="0" max="${d.maxHP}" value="${d.currentHP}" onchange="updateDerivedValue('currentHP', this.value)"> / ${d.maxHP}
      </div>
    </div>
    <div class="special-field">
      <label>Initiative</label> <span>${d.initiative}</span>
    </div>
    <div class="special-field">
      <label>Defense</label> <span>${d.defense}</span>
    </div>
    <div class="special-field">
      <label>Carry Weight</label> <span>${d.carryWeight}</span>
    </div>
    <div class="special-field">
      <label>Melee Damage</label> <span>+${d.meleeDamage}</span>
    </div>
    <div class="special-field">
      <label>Luck Points</label>
      <div class="luck-input-group">
        <input type="number" min="0" max="${d.maxLuckPoints}" value="${d.luckPoints}" onchange="updateDerivedValue('luckPoints', this.value)"> / ${d.maxLuckPoints}
      </div>
    </div>
  `;

  document.getElementById("derived-section").innerHTML = html;
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
}


function rebuildUIFromCharacter() {
  createSpecialFields();
  createSkillFields();
  createWeaponsSection(); // added
  calculateDerivedStats();
}

// helper: default weapon shape
function defaultWeapon() {
  const firstSkill = Object.keys(character.skills)[0] || "";
  return {
    name: "",
    skill: firstSkill,
    TN: 0,
    tag: false,
    damage: "",
    effects: "",
    type: "",
    rate: "",
    range: "close",
    qualities: "",
    ammo: "",
    weight: 0
  };
}

function isWeaponEmpty(w) {
  if (!w) return true;
  return !w.name &&
         (!w.skill || w.skill === "") &&
         Number(w.TN) === 0 &&
         !w.tag &&
         !w.damage &&
         !w.effects &&
         !w.type &&
         !w.rate &&
         (!w.range || w.range === "close") &&
         !w.qualities &&
         !w.ammo &&
         Number(w.weight) === 0;
}

// Replace the weapons UI functions so rows are only created via the [+] button.
// Filling a row will NOT auto-create a new row. Clearing a row deletes it.

function createWeaponsSection() {
  const section = document.getElementById("weapons-section");
  section.innerHTML = `
    <h2>Weapons <button id="add-weapon-btn" class="add-weapon">+</button></h2>
    <table id="weapons-table">
      <thead>
        <tr>
          <th style="width:18%;">Name</th>
          <th style="width:10%;">Skill</th>
          <th style="width:4%;">TN</th>
          <th style="width:4%;">TAG</th>
          <th style="width:8%;">Damage</th>
          <th style="width:15%;">Effects</th>
          <th style="width:8%;">Type</th>
          <th style="width:5%;">Rate</th>
          <th style="width:6%;">Range</th>
          <th style="width:10%;">Qualities</th>
          <th style="width:4%;">AMMO</th>
          <th style="width:6%;">Weight</th>
        </tr>
      </thead>
      <tbody id="weapons-tbody"></tbody>
    </table>
  `;

  const addBtn = section.querySelector('#add-weapon-btn');
  if (addBtn) {
    addBtn.removeEventListener('click', addWeapon);
    addBtn.addEventListener('click', addWeapon);
  }

  if (!Array.isArray(character.weapons)) character.weapons = [];

  // Ensure at least one row exists by default
  if (character.weapons.length === 0) {
    character.weapons.push(defaultWeapon());
  }

  const tbody = section.querySelector("#weapons-tbody");
  tbody.innerHTML = "";
  const skillKeys = Object.keys(character.skills);
  const skillOptions = skillKeys.map(k => `<option value="${k}">${formatSkillName(k)}</option>`).join("");

  character.weapons.forEach((w, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><textarea class="weapon-name" onchange="updateWeapon(${idx}, 'name', this.value)">${escapeHtml(w.name || "")}</textarea></td>
      <td>
        <select class="weapon-skill" onchange="updateWeapon(${idx}, 'skill', this.value)">
          ${skillOptions}
        </select>
      </td>
      <td><input class="weapon-small" type="number" min="0" value="${w.TN || 0}" onchange="updateWeapon(${idx}, 'TN', this.value)"></td>
      <td><input type="checkbox" ${w.tag ? "checked" : ""} onchange="updateWeapon(${idx}, 'tag', this.checked)"></td>
      <td><input class="weapon-small" value="${escapeHtml(w.damage || "")}" onchange="updateWeapon(${idx}, 'damage', this.value)"></td>
      <td><textarea class="weapon-large" onchange="updateWeapon(${idx}, 'effects', this.value)">${escapeHtml(w.effects || "")}</textarea></td>
      <td><input value="${escapeHtml(w.type || "")}" onchange="updateWeapon(${idx}, 'type', this.value)"></td>
      <td><input class="weapon-small" value="${escapeHtml(w.rate || "")}" onchange="updateWeapon(${idx}, 'rate', this.value)"></td>
      <td>
        <select class="weapon-range" onchange="updateWeapon(${idx}, 'range', this.value)">
          <option value="close"${w.range === "close" ? " selected" : ""}>Close</option>
          <option value="medium"${w.range === "medium" ? " selected" : ""}>Medium</option>
          <option value="long"${w.range === "long" ? " selected" : ""}>Long</option>
          <option value="extreme"${w.range === "extreme" ? " selected" : ""}>Extreme</option>
        </select>
      </td>
      <td><textarea class="weapon-large" onchange="updateWeapon(${idx}, 'qualities', this.value)">${escapeHtml(w.qualities || "")}</textarea></td>
      <td><input class="weapon-small" value="${escapeHtml(w.ammo || "")}" onchange="updateWeapon(${idx}, 'ammo', this.value)"></td>
      <td><input class="weapon-small" type="number" step="0.1" min="0" value="${w.weight || 0}" onchange="updateWeapon(${idx}, 'weight', this.value)"></td>
    `;
    tbody.appendChild(tr);

    const skillSel = tr.querySelector(".weapon-skill");
    if (skillSel && w.skill) skillSel.value = w.skill;
    const rangeSel = tr.querySelector(".weapon-range");
    if (rangeSel && w.range) rangeSel.value = w.range;
  });
}

function addWeapon() {
  if (!Array.isArray(character.weapons)) character.weapons = [];
  character.weapons.push(defaultWeapon());
  autosave();
  createWeaponsSection();
}

function updateWeapon(index, field, value) {
  if (!Array.isArray(character.weapons)) character.weapons = [];
  if (!character.weapons[index]) return;

  if (field === "TN" || field === "weight") {
    character.weapons[index][field] = parseFloat(value) || 0;
  } else if (field === "tag") {
    character.weapons[index][field] = !!value;
  } else {
    character.weapons[index][field] = value;
  }

  // If the row is now empty, remove it (players clear row to delete)
  if (isWeaponEmpty(character.weapons[index])) {
    character.weapons.splice(index, 1);
  }

  autosave();
  createWeaponsSection();
}

// small helper to escape user values when injecting into inputs
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

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
