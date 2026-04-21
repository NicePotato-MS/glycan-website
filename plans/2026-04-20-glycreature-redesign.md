# GlyCreature Redesign Plan
**Date:** April 20, 2026
**Status:** Planning Phase

## Overview
Complete redesign of GlyCreature to fix critical issues and improve UX. Focus on modular architecture, proper rendering system, and intuitive drag-and-drop interface.

## Critical Issues to Fix

### 1. Rendering System
**Problem:** Previews are broken, accessories don't render, blinking doesn't match eyes
**Solution:** Create modular rendering system with proper size scaling

- Create `CreatureRenderer` class that handles rendering at any size
- Separate rendering logic from creature data
- Fix eye positioning based on eye count
- Fix accessory rendering (ears, tail, antenna)
- Fix blinking animation to properly cover eyes

### 2. Collection System
**Problem:** Previews are messed up, no drag-and-drop
**Solution:** Complete redesign with drag-and-drop

- Create `GalleryManager` class
- Implement drag-and-drop for creatures
- Add trash can with confirmation
- Fix preview rendering using new renderer
- Support drag to breeding slots

### 3. Breeding System
**Problem:** Unintuitive interface, no drag-and-drop
**Solution:** Redesign with drag-and-drop from gallery

- Create `BreedingManager` class
- Drag creatures from gallery to parent slots
- Visual feedback for drag operations
- Clear parent/offspring relationship display

### 4. Gene Editor
**Problem:** Sliders broken, accessories don't work, redundant buttons
**Solution:** Fix all controls, consolidate buttons

- Fix all slider event handlers
- Fix toggle buttons for accessories
- Replace "Generate" + "Randomize Genes" with single "🧬 Scramble Genes" button
- Ensure all controls properly update creature

### 5. Personality & Emotion System
**Problem:** Personality doesn't affect appearance, mouth names don't make sense
**Solution:** Redesign personality to drive emotion expressions

- Map personality traits to emotions:
  - High friendliness → happy expressions
  - High energy → excited expressions
  - High curiosity → wide-eyed expressions
  - High playfulness → playful expressions
- Rename mouth types to emotion-based names:
  - smile → happy
  - neutral → calm
  - open → surprised
  - small → shy
- Eye expressions should match personality
- Update trait description to reflect actual personality

### 6. Eye System
**Problem:** Limited eye count, blinking doesn't match
**Solution:** Support more eyes, fix blinking

- Allow 1-6 eyes
- Properly position eyes based on count (circular or linear arrangement)
- Fix blinking to cover all eyes correctly
- Eye size should scale with count

## Architecture

### File Structure
```
/workspace/glycan/website/
├── templates/
│   └── glycreature.html          # Main template
├── js/
│   ├── glycreature/
│   │   ├── Creature.js           # Creature data model
│   │   ├── CreatureRenderer.js   # Modular rendering system
│   │   ├── GalleryManager.js     # Collection management
│   │   ├── BreedingManager.js   # Breeding logic
│   │   ├── GeneEditor.js        # Gene editor UI
│   │   └── PersonalitySystem.js # Personality → emotion mapping
│   └── main.js                   # Entry point
└── plans/
    └── 2026-04-20-glycreature-redesign.md  # This file
```

### Module Responsibilities

#### Creature.js
- Pure data model
- No rendering logic
- Gene storage and manipulation
- Serialization/deserialization

#### CreatureRenderer.js
- Renders creature at any size
- Handles all drawing operations
- Manages animations (blinking, breathing, etc.)
- Size-agnostic rendering

#### GalleryManager.js
- Manages localStorage gallery
- Handles drag-and-drop
- Renders gallery previews
- Manages trash operations

#### BreedingManager.js
- Manages parent selection
- Handles breeding logic
- Creates offspring
- Manages breeding UI state

#### GeneEditor.js
- Manages gene editor UI
- Handles slider/toggle events
- Updates creature genes
- Syncs UI with creature state

#### PersonalitySystem.js
- Maps personality to emotions
- Determines eye/mouth expressions
- Generates trait descriptions
- Calculates personality-based modifiers

## Implementation Steps

### Phase 1: Core Systems (Priority: High)
1. Create modular file structure
2. Implement Creature.js (data model only)
3. Implement CreatureRenderer.js (size-agnostic rendering)
4. Implement PersonalitySystem.js (emotion mapping)
5. Test rendering at various sizes

### Phase 2: UI Systems (Priority: High)
1. Implement GeneEditor.js with fixed controls
2. Fix all sliders and toggles
3. Consolidate buttons to single "🧬 Scramble Genes"
4. Test gene editing

### Phase 3: Collection System (Priority: Medium)
1. Implement GalleryManager.js
2. Create drag-and-drop system
3. Add trash can with confirmation
4. Fix preview rendering
5. Test collection operations

### Phase 4: Breeding System (Priority: Medium)
1. Implement BreedingManager.js
2. Integrate with gallery drag-and-drop
3. Create breeding UI
4. Test breeding operations

### Phase 5: Integration & Polish (Priority: Low)
1. Integrate all modules
2. Fix eye positioning for 1-6 eyes
3. Fix blinking animation
4. Update trait descriptions
5. Test complete system

## Technical Details

### Rendering System
```javascript
class CreatureRenderer {
  render(creature, ctx, width, height) {
    // Size-agnostic rendering
    // All positions calculated relative to width/height
    // Supports any canvas size
  }

  renderPreview(creature, ctx, size) {
    // Optimized for small previews
    // Simplified rendering for gallery
  }
}
```

### Eye Positioning
```javascript
// For 1-6 eyes, arrange in:
// 1 eye: center
// 2 eyes: horizontal line
// 3 eyes: triangle
// 4 eyes: diamond
// 5 eyes: pentagon
// 6 eyes: hexagon
```

### Personality → Emotion Mapping
```javascript
const personalityToEmotion = {
  friendliness: {
    high: { mouth: 'happy', eyes: 'warm' },
    low: { mouth: 'neutral', eyes: 'cool' }
  },
  energy: {
    high: { mouth: 'excited', eyes: 'wide' },
    low: { mouth: 'calm', eyes: 'sleepy' }
  },
  // ... etc
}
```

### Drag and Drop
```javascript
// Use HTML5 Drag and Drop API
// Gallery items are draggable
// Parent slots are drop targets
// Trash can is drop target with confirmation
```

## Edge Cases to Handle

1. **Empty gallery** - Show helpful message
2. **Single creature in gallery** - Disable breeding
3. **Same creature as both parents** - Allow but warn
4. **Invalid gene values** - Clamp to valid ranges
5. **Corrupted localStorage** - Handle gracefully
6. **No creature loaded** - Show placeholder
7. **Drag to invalid target** - Visual feedback
8. **Trash confirmation** - Don't accidentally delete
9. **Eye count changes** - Recalculate positions
10. **Preview rendering** - Optimize for performance

## Success Criteria

- [ ] All sliders work correctly
- [ ] Accessories render properly
- [ ] Blinking matches all eyes
- [ ] Gallery previews render correctly
- [ ] Drag and drop works smoothly
- [ ] Breeding is intuitive
- [ ] Trash can has confirmation
- [ ] Personality affects expressions
- [ ] Trait descriptions are accurate
- [ ] Code is modular and maintainable
- [ ] No console errors
- [ ] Works on all browsers

## Notes

- Keep rendering separate from data
- Use classes for better organization
- Test each module independently
- Document public APIs
- Handle errors gracefully
- Optimize for performance
- Keep UI responsive

---

**Next Steps:** Implement Phase 1 (Core Systems)
