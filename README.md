# Fallout Character Creator

A web-based character sheet creator and manager for the **Fallout: The Roleplaying Game** tabletop RPG system. This tool allows players to create, customize, and track their Wasteland survivors with an intuitive interface that handles all the complex calculations automatically.

## Features

### Character Management
- **Save/Load Characters**: Export characters as JSON files and load them later
- **Auto-save**: Characters are automatically saved to browser local storage every 2 seconds
- **Reset**: Clear character data with a confirmation warning

### S.P.E.C.I.A.L Attributes
- Allocate 5 points across 7 core attributes (Strength, Perception, Endurance, Charisma, Intelligence, Agility, Luck)
- Base values range from 4-10
- Visual representation with Vault-Tec cog icons
- **Edit Mode**: Override attribute values for equipment/buffs while preserving base values

### Skills System
- 17 skills linked to S.P.E.C.I.A.L attributes
- Tag skill designation (checkbox)
- Rank tracking (0-5)
- Skills include: Athletics, Barter, Big Guns, Energy Weapons, Explosives, Lockpick, Medicine, Melee Weapons, Pilot, Repair, Science, Small Guns, Sneak, Speech, Survival, Throwing, Unarmed

### Combat Stats & Body Parts
- **Combat Stats**: Initiative, Defense, Melee Damage, Maximum HP
- **Health Tracking**: Current HP with visual limb damage system
- **Body Part Damage Resistance**: Track Physical, Radiation, and Energy DR for each body part:
  - Head (hit location 1-2)
  - Torso (hit location 3-8)
  - Left/Right Arms (9-11, 12-14)
  - Left/Right Legs (15-17, 18-20)
- **Poison Resistance**: Separate poison DR tracking
- **Edit Mode**: Override combat stats while showing base calculated values

### Weapons System
- Track multiple weapons with detailed stats:
  - Name, Skill, Target Number (TN), Tag skill flag
  - Damage, Effects, Type, Fire Rate
  - Range (Close/Medium/Long), Qualities
  - Ammo count, Weight
- Weapon weight automatically adds to carry capacity
- Add/remove weapons dynamically

### Inventory Management
- Track items with:
  - Item Name
  - Quantity
  - Unit Weight
  - **Total Weight** (auto-calculated: quantity × unit weight)
  - Reference (notes/page numbers)
- Total inventory weight automatically adds to carry capacity
- **Overweight Warning**: Red badge appears when carrying more than max capacity

### Perks & Traits
- Complete database of 80+ perks from the core rulebook
- **Automatic Validation**: Checks level and S.P.E.C.I.A.L requirements
- **Rank Management**: Increment/decrement perk ranks with +/- buttons
- **Effect Preview**: Hover over perks to see requirements and effects
- **Auto-calculation**: Perks like Life Giver, Strong Back, Toughness automatically modify stats
- Visual indicators for valid/invalid perks

### Player Information
- Name, Level, Origin, Background
- Caps (currency) tracking
- **Carry Weight**: Current/Max with overweight warning
- **Luck Points**: Current/Max tracking

### Derived Stats (Auto-calculated)
- **Maximum HP** = Endurance + Luck + (Level - 1) + Perk bonuses
- **Initiative** = Perception + Agility
- **Defense** = Agility
- **Melee Damage Bonus** = Based on Strength (7-8: +1, 9-10: +2, 11+: +3)
- **Max Carry Weight** = 100 + (Strength × 10) + Strong Back perk
- **Max Luck Points** = Luck attribute

## Technology Stack

- **Pure HTML/CSS/JavaScript** - No frameworks or build tools required
- **Client-side only** - No server needed, runs entirely in the browser
- **LocalStorage API** - Auto-save functionality
- **JSON** - Character export/import format

## File Structure

```
fallout-character-creator/
├── index.html          # Main HTML structure
├── style.css           # All styling and layout
├── script.js           # Core character logic and calculations
├── perks.js            # Complete perk database
├── assets/
│   ├── Cog.png        # S.P.E.C.I.A.L attribute background
│   ├── Vault_Boy.png  # Body parts section background
│   └── favicon.png    # Browser tab icon
└── README.md          # This file
```

## How It Works

### Character Data Model
The character is stored as a JavaScript object with the following structure:

```javascript
{
  name: "",
  level: 1,
  origin: "",
  background: "",
  caps: 0,
  
  special: { strength: 5, perception: 5, ... },
  specialPointsRemaining: 5,
  specialLocked: false,
  
  overrides: { initiative: null, maxHP: null, ... },
  
  skills: { athletics: { rank: 0, linked: "strength", trained: false }, ... },
  
  bodyParts: { head: { physDR: 0, radDR: 0, enDR: 0, currentHP: 0 }, ... },
  poisonDR: 0,
  
  derived: { maxHP: 0, currentHP: 0, initiative: 0, defense: 0, ... },
  
  perks: [{ name: "Life Giver", rank: 2, effect: "..." }],
  weapons: [{ name: "10mm Pistol", damage: 3, ... }],
  inventory: [{ name: "Stimpak", quantity: 5, weight: 0.5, reference: "pg 142" }]
}
```

### Auto-calculation Flow
1. User modifies S.P.E.C.I.A.L, level, or perks
2. `calculateDerivedStats()` is triggered
3. Function reads effective S.P.E.C.I.A.L values (base or overrides)
4. Calculates: Initiative, Defense, Melee Damage, Max HP, Carry Weight, Luck Points
5. Applies perk bonuses (Life Giver, Strong Back, Toughness, etc.)
6. Updates UI sections automatically
7. Auto-saves to localStorage

### Edit Mode
- Click **"Edit Stats"** in header to enter override mode
- Allows temporary stat modifications (equipment, buffs, debuffs)
- Shows base calculated values alongside override inputs
- Preserves original base values
- Click **"Lock Stats"** to return to read-only mode

### Perk System
- Perks stored in `PERK_DATABASE` object in `perks.js`
- Each perk has: ranks, requirements, level increment, description
- `checkPerkRequirements()` validates before adding
- `applyPerkEffects()` triggers recalculation when ranks change
- `getPerkBonus()` returns numeric bonuses for specific stats

## Running Local Tests

### Basic Testing

1. **Open the Application**
   ```bash
   # Navigate to project directory
   cd fallout-character-creator
   
   # Open in default browser (Windows)
   start index.html
   
   # Open in default browser (Mac)
   open index.html
   
   # Open in default browser (Linux)
   xdg-open index.html
   ```

2. **Test S.P.E.C.I.A.L Allocation**
   - Verify you have 5 points to spend
   - Change attributes from 4-10
   - Confirm points remaining updates correctly
   - Check auto-lock when points reach 0

3. **Test Derived Stats**
   - Set Endurance to 6, Luck to 7, Level to 5
   - Verify Max HP = 6 + 7 + 4 = 17
   - Set Perception to 7, Agility to 8
   - Verify Initiative = 15
   - Verify Defense = 8

4. **Test Perks**
   - Select "Life Giver" from dropdown
   - Click "Add" (should work if Level ≥ 5)
   - Verify Max HP increases by Endurance value
   - Try "Strong Back" perk
   - Verify Max Carry Weight increases by 25

5. **Test Carry Weight**
   - Add weapon with weight 10
   - Add inventory item: quantity 5, unit weight 2
   - Verify Current Carry Weight = 10 + (5 × 2) = 20
   - Verify Total Weight column shows 10.0
   - Set Strength to 3 (max carry = 130)
   - Add items until over capacity
   - Verify red "CARRY WEIGHT EXCEEDED" badge appears

6. **Test Edit Mode**
   - Click **"Edit Stats"** button
   - Override Initiative to 20
   - Verify base value shown: "(Base: X)"
   - Click **"Lock Stats"**
   - Verify override persists

7. **Test Save/Load**
   - Create a character
   - Click **"Save Character"**
   - Verify JSON file downloads
   - Click **"Reset Character"**
   - Confirm warning dialog
   - Click **"Load Character"**
   - Select saved JSON file
   - Verify all data restored

8. **Test Auto-save**
   - Make changes to character
   - Wait 2 seconds
   - Refresh the page (F5)
   - Verify changes persisted

### Browser Compatibility Testing

Test in multiple browsers:
- **Chrome/Edge** (Chromium)
- **Firefox**
- **Safari** (if on Mac)

### LocalStorage Testing

```javascript
// Open browser console (F12) and run:

// View saved character
console.log(JSON.parse(localStorage.getItem("falloutCharacter")));

// Clear saved data
localStorage.removeItem("falloutCharacter");
location.reload();
```

### Validation Testing

1. **Boundary Values**
   - S.P.E.C.I.A.L: Try values below 4 and above 10
   - Skills: Try ranks above 5
   - Negative numbers in HP/Luck

2. **Perk Requirements**
   - Try adding perks without meeting requirements
   - Verify error message displays
   - Check level-gated perks (Life Giver requires level 5)

3. **Overweight Warning**
   - Set Strength to 5 (max carry = 150)
   - Add items totaling 151+ weight
   - Verify warning appears

### Performance Testing

1. **Large Inventory**
   - Add 50+ inventory items
   - Verify no lag in UI updates
   - Check auto-save performance

2. **Multiple Weapons**
   - Add 20+ weapons
   - Verify carry weight calculates correctly
   - Check table scrolling works

### Edge Cases

1. **Empty Character**
   - Load a completely empty JSON: `{}`
   - Verify `ensureCharacterShape()` fills in defaults

2. **Partial Data**
   - Load JSON missing some fields
   - Verify missing fields get default values

3. **Invalid Perk Ranks**
   - Manually edit JSON to set perk rank > max
   - Verify validation prevents further increases

## Known Limitations

- No dice rolling functionality (intentional - for physical play)
- No character portrait/image upload
- No multi-character management (one at a time)
- Perk effects are calculated but not all game mechanics are implemented
- No server backend (all data is client-side)

## Browser Requirements

- Modern browser with ES6 support (Chrome 51+, Firefox 54+, Safari 10+, Edge 15+)
- JavaScript enabled
- LocalStorage enabled
- Minimum screen width: 900px recommended for optimal layout

## Future Enhancements

- [ ] Export to PDF
- [ ] Print-friendly character sheet view
- [ ] Dice roller integration
- [ ] Character template presets (Vault Dweller, Raider, etc.)
- [ ] Dark/Light theme toggle
- [ ] Mobile-responsive layout
- [ ] Multiple character management
- [ ] Cloud save integration

## Credits

- **Fallout: The Roleplaying Game** by Modiphius Entertainment
- Character creator developed as a fan tool for personal use
- Vault-Tec imagery and Fallout IP owned by Bethesda Softworks

## License

This is a fan-made tool for personal use. All Fallout-related trademarks and copyrights belong to their respective owners.

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Compatibility**: Fallout 2d20 Core Rulebook (Feb 2023)