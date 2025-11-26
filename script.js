const defaultCharacter = () => ({
  name: "",
  origin: "",
  background: "",
  caps: 0,

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


function calculateDerivedStats() {
  const s = character.special;

  character.derived.maxHP = s.endurance + 5;
  if (character.derived.currentHP > character.derived.maxHP) {
    character.derived.currentHP = character.derived.maxHP;
  }

  character.derived.initiative = s.perception + s.agility;
  character.derived.defense = s.agility;

  // Calculate current carry weight from weapons
  character.derived.currentCarryWeight = 0;
  if (Array.isArray(character.weapons)) {
    character.weapons.forEach(w => {
      character.derived.currentCarryWeight += (w.weight || 0);
    });
  }

  character.derived.maxCarryWeight = s.strength * 10;

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
    <h2>Player Info</h2>
    <div class="player-info-grid">
      <div class="info-field">
        <label>Name</label>
        <input type="text" value="${escapeHtml(character.name)}" onchange="updatePlayerInfo('name', this.value)">
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
        <label>HP</label>
        <div class="hp-input-group">
          <input type="number" min="0" max="${d.maxHP}" value="${d.currentHP}" onchange="updateDerivedValue('currentHP', this.value)"> / ${d.maxHP}
        </div>
      </div>
      <div class="stat-field">
        <label>Initiative</label> <span>${d.initiative}</span>
      </div>
      <div class="stat-field">
        <label>Defense</label> <span>${d.defense}</span>
      </div>
      <div class="stat-field">
        <label>Weight</label> <span>${d.currentCarryWeight} / ${d.maxCarryWeight}</span>
      </div>
      <div class="stat-field">
        <label>Melee Damage</label> <span>+${d.meleeDamage}</span>
      </div>
      <div class="stat-field">
        <label>Luck</label>
        <div class="luck-input-group">
          <input type="number" min="0" max="${d.maxLuckPoints}" value="${d.luckPoints}" onchange="updateDerivedValue('luckPoints', this.value)"> / ${d.maxLuckPoints}
        </div>
      </div>
    </div>
  `;

  document.getElementById("derived-section").innerHTML = html;
}

function updatePlayerInfo(field, value) {
  if (field === "caps") {
    character.caps = parseInt(value) || 0;
  } else {
    character[field] = value;
  }
  autosave();
  updateDerivedSection();
}


function rebuildUIFromCharacter() {
  createSpecialFields();
  createSkillFields();
  createWeaponsSection();
  createInventorySection();
  calculateDerivedStats();
}

// Inventory helpers
function defaultInventoryItem() {
  return { item: "", quantity: 0, weight: 0 };
}

function isInventoryItemEmpty(inv) {
  if (!inv) return true;
  return !inv.item && Number(inv.quantity) === 0 && Number(inv.weight) === 0;
}

function createInventorySection() {
  const section = document.getElementById("other-section");
  
  if (!section) return; // safety check
  
  section.innerHTML = `
    <h2>Inventory <button id="add-inventory-btn" class="add-inventory">+</button></h2>
    <table id="inventory-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody id="inventory-tbody"></tbody>
    </table>
  `;

  const addBtn = section.querySelector('#add-inventory-btn');
  if (addBtn) {
    addBtn.removeEventListener('click', addInventoryItem);
    addBtn.addEventListener('click', addInventoryItem);
  }

  if (!Array.isArray(character.inventory)) character.inventory = [];

  const tbody = section.querySelector("#inventory-tbody");
  tbody.innerHTML = "";

  character.inventory.forEach((inv, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input class="inventory-item" type="text" value="${escapeHtml(inv.item || "")}" onchange="updateInventory(${idx}, 'item', this.value)"></td>
      <td><input class="inventory-quantity" type="number" min="0" value="${inv.quantity || 0}" onchange="updateInventory(${idx}, 'quantity', this.value)"></td>
      <td><input class="inventory-weight" type="number" step="0.1" min="0" value="${inv.weight || 0}" onchange="updateInventory(${idx}, 'weight', this.value)"></td>
    `;
    tbody.appendChild(tr);
  });
}

function addInventoryItem() {
  if (!Array.isArray(character.inventory)) character.inventory = [];
  character.inventory.push(defaultInventoryItem());
  autosave();
  createInventorySection();
}

function updateInventory(index, field, value) {
  if (!Array.isArray(character.inventory)) character.inventory = [];
  if (!character.inventory[index]) return;

  if (field === "quantity" || field === "weight") {
    character.inventory[index][field] = parseFloat(value) || 0;
  } else {
    character.inventory[index][field] = value;
  }

  // If row is now empty, remove it
  if (isInventoryItemEmpty(character.inventory[index])) {
    character.inventory.splice(index, 1);
  }

  autosave();
  createInventorySection();
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
