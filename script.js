let character = {
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
    athletics:        { rank: 0, linked: "strength" },
    barter:           { rank: 0, linked: "charisma" },
    bigGuns:          { rank: 0, linked: "endurance" },
    energyWeapons:    { rank: 0, linked: "perception" },
    explosives:       { rank: 0, linked: "perception" },
    lockpick:         { rank: 0, linked: "perception" },
    medicine:         { rank: 0, linked: "intelligence" },
    meleeWeapons:     { rank: 0, linked: "strength" },
    pilot:            { rank: 0, linked: "perception" },
    repair:           { rank: 0, linked: "intelligence" },
    science:          { rank: 0, linked: "intelligence" },
    smallGuns:        { rank: 0, linked: "agility" },
    sneak:            { rank: 0, linked: "agility" },
    speech:           { rank: 0, linked: "charisma" },
    survival:         { rank: 0, linked: "endurance" },
    throwing:         { rank: 0, linked: "agility" },
    unarmed:          { rank: 0, linked: "strength" }
  },

  derived: {
     maxHP: 0,
     initiative: 0,
     defense: 0,
     carryWeight: 0
  },

  gear: [],
  notes: "",
};

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


function createSpecialFields() {
  const section = document.getElementById("special-section");
  section.innerHTML = "<h2>S.P.E.C.I.A.L</h2>";

  for (let stat in character.special) {
    const div = document.createElement("div");
    div.classList.add("special-field");

    div.innerHTML = `
      <label>${stat.toUpperCase()}</label>
      <input type="number" min="1" max="10" value="${character.special[stat]}"
        onchange="updateSpecial('${stat}', this.value)">
    `;

    section.appendChild(div);
  }
}

function updateSpecial(stat, value) {
  character.special[stat] = parseInt(value);
  calculateDerivedStats();
}


function createSkillFields() {
  const section = document.getElementById("skills-section");
  section.innerHTML = "<h2>Skills</h2>";

  for (let skill in character.skills) {
    const div = document.createElement("div");
    div.classList.add("skill-field");

    div.innerHTML = `
      <label>${skill}</label>
      <input type="number" min="0" max="5" value="${character.skills[skill].rank}"
        onchange="updateSkill('${skill}', this.value)">
    `;

    section.appendChild(div);
  }
}

function updateSkill(skill, value) {
  character.skills[skill].rank = parseInt(value);
  calculateDerivedStats();
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
  calculateDerivedStats();
}
