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
     initiative: 0,
     defense: 0,
     carryWeight: 0
  },

  perks: [],
  gear: [],
  notes: "",
  weapons: []   // added weapons array to character
});

let character = defaultCharacter();


function calculateDerivedStats() {
  const s = character.special;

  character.derived.maxHP = s.endurance + 5; // Level = 1 by default
  character.derived.initiative = s.perception + s.agility;
  character.derived.defense = s.agility;
  character.derived.carryWeight = s.strength * 10;

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
    character = JSON.parse(e.target.result);
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
    character = JSON.parse(saved);
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
  const s = character.derived;

  const html = `
    <h2>Derived Stats</h2>
    <div class="special-field">
      <label>Max HP</label> <span>${s.maxHP}</span>
    </div>
    <div class="special-field">
      <label>Initiative</label> <span>${s.initiative}</span>
    </div>
    <div class="special-field">
      <label>Defense</label> <span>${s.defense}</span>
    </div>
    <div class="special-field">
      <label>Carry Weight</label> <span>${s.carryWeight}</span>
    </div>
  `;

  document.getElementById("derived-section").innerHTML = html;
}


function rebuildUIFromCharacter() {
  createSpecialFields();
  createSkillFields();
  createWeaponsSection(); // added
  calculateDerivedStats();
}

function createWeaponsSection() {
  const section = document.getElementById("weapons-section");
  section.innerHTML = `<h2>Weapons</h2>
    <div id="weapons-list"></div>
    <button id="add-weapon-btn">Add Weapon</button>`;

  const list = section.querySelector("#weapons-list");

  // helper to build skill options
  const skillKeys = Object.keys(character.skills);
  const skillOptions = skillKeys.map(k => `<option value="${k}">${formatSkillName(k)}</option>`).join("");

  character.weapons.forEach((w, idx) => {
    const row = document.createElement("div");
    row.className = "weapon-row";

    row.innerHTML = `
      <div class="weapon-grid">
        <input class="weapon-name" type="text" placeholder="Name" value="${w.name || ""}" onchange="updateWeapon(${idx}, 'name', this.value)">
        <select class="weapon-skill" onchange="updateWeapon(${idx}, 'skill', this.value)">${skillOptions}</select>
        <input class="weapon-tn" type="number" min="0" placeholder="TN" value="${w.TN || 0}" onchange="updateWeapon(${idx}, 'TN', this.value)">
        <label class="weapon-tag"><input type="checkbox" onchange="updateWeapon(${idx}, 'tag', this.checked)" ${w.tag ? "checked" : ""}> TAG</label>
        <input class="weapon-damage" type="text" placeholder="Damage" value="${w.damage || ""}" onchange="updateWeapon(${idx}, 'damage', this.value)">
        <input class="weapon-effects" type="text" placeholder="Effects" value="${w.effects || ""}" onchange="updateWeapon(${idx}, 'effects', this.value)">
        <input class="weapon-type" type="text" placeholder="Type" value="${w.type || ""}" onchange="updateWeapon(${idx}, 'type', this.value)">
        <input class="weapon-rate" type="text" placeholder="Rate" value="${w.rate || ""}" onchange="updateWeapon(${idx}, 'rate', this.value)">
        <select class="weapon-range" onchange="updateWeapon(${idx}, 'range', this.value)">
          <option value="close"${w.range === "close" ? " selected" : ""}>Close</option>
          <option value="medium"${w.range === "medium" ? " selected" : ""}>Medium</option>
          <option value="long"${w.range === "long" ? " selected" : ""}>Long</option>
          <option value="extreme"${w.range === "extreme" ? " selected" : ""}>Extreme</option>
        </select>
        <input class="weapon-qualities" type="text" placeholder="Qualities" value="${w.qualities || ""}" onchange="updateWeapon(${idx}, 'qualities', this.value)">
        <input class="weapon-ammo" type="text" placeholder="AMMO" value="${w.ammo || ""}" onchange="updateWeapon(${idx}, 'ammo', this.value)">
        <input class="weapon-weight" type="number" min="0" step="0.1" placeholder="Weight" value="${w.weight || 0}" onchange="updateWeapon(${idx}, 'weight', this.value)">
      </div>
      <div class="weapon-actions">
        <button onclick="removeWeapon(${idx})">Remove</button>
      </div>
    `;

    // ensure the select shows the current skill
    const sel = row.querySelector(".weapon-skill");
    if (w.skill) sel.value = w.skill;

    list.appendChild(row);
  });

  section.querySelector("#add-weapon-btn").addEventListener("click", addWeapon);
}

function addWeapon() {
  const firstSkill = Object.keys(character.skills)[0] || "";
  character.weapons.push({
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
  });
  autosave();
  createWeaponsSection();
}

function updateWeapon(index, field, value) {
  if (!character.weapons[index]) return;
  if (field === "TN" || field === "weight") {
    character.weapons[index][field] = parseFloat(value) || 0;
  } else if (field === "tag") {
    character.weapons[index][field] = !!value;
  } else {
    character.weapons[index][field] = value;
  }
  autosave();
}

function removeWeapon(index) {
  character.weapons.splice(index, 1);
  autosave();
  createWeaponsSection();
}
