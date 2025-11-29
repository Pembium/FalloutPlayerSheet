// Global perk database separated for maintainability and reduced script.js size.
// Loaded before script.js in index.html.
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
