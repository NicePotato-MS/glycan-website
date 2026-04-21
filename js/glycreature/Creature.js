/**
 * Creature - Pure data model for creature genetics
 * No rendering logic, just data storage and manipulation
 */

export class Creature {
  constructor() {
    this.seed = Math.random();
    this.generatedAt = Date.now();

    // Body genes
    this.bodyType = 'circle';
    this.bodyWidth = 0.8;
    this.bodyHeight = 0.9;
    this.roundness = 0.5;

    // Color genes
    this.hue = 180;
    this.saturation = 60;
    this.lightness = 55;

    // Eye genes
    this.eyeCount = 2;
    this.eyeSize = 0.12;
    this.eyeShape = 'round';
    this.eyeSpacing = 0.3;

    // Mouth genes
    this.mouthType = 'happy';
    this.mouthWidth = 0.15;

    // Feature genes
    this.hasEars = false;
    this.hasTail = false;
    this.hasAntenna = false;

    // Personality genes (0.0 - 1.0)
    this.traits = {
      energy: 0.6,
      friendliness: 0.7,
      curiosity: 0.7,
      playfulness: 0.5
    };

    // Animation state (not saved to JSON)
    this.blinkTimer = 2;
    this.blinkState = 0;
    this.breathOffset = 0;
    this.bouncePhase = 0;

    // Generated name
    this.name = this.generateName();
  }

  /**
   * Generate a random creature name
   */
  generateName() {
    const prefixes = ['gl', 'fl', 'br', 'cr', 'pl', 'sn', 'wh', 'ch', 'th', 'bl'];
    const middles = ['y', 'a', 'o', 'u', 'i', 'e', 'oo', 'ee', 'ar', 'or'];
    const suffixes = ['by', 'ly', 'ny', 'py', 'dy', 'ky', 'm', 'p', 't', 'd', 's'];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const middle = middles[Math.floor(Math.random() * middles.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return prefix + middle + suffix;
  }

  /**
   * Get trait description based on personality
   */
  getTraitDescription() {
    const traits = [];

    if (this.traits.energy > 0.7) traits.push('energetic');
    else if (this.traits.energy < 0.4) traits.push('calm');

    if (this.traits.friendliness > 0.7) traits.push('friendly');
    else if (this.traits.friendliness < 0.4) traits.push('reserved');

    if (this.traits.curiosity > 0.7) traits.push('curious');
    else if (this.traits.curiosity < 0.4) traits.push('content');

    if (this.traits.playfulness > 0.7) traits.push('playful');
    else if (this.traits.playfulness < 0.4) traits.push('serious');

    if (traits.length === 0) {
      return 'balanced';
    }

    return traits.join(', ');
  }

  /**
   * Get eye shape based on personality
   */
  getEyeShape() {
    const { energy, friendliness, curiosity, playfulness } = this.traits;

    // Angry: low friendliness + high energy
    if (friendliness < 0.4 && energy > 0.6) {
      return 'angry';
    }
    // Sad: low friendliness + low energy
    if (friendliness < 0.4 && energy < 0.5) {
      return 'sad';
    }
    // Happy: high friendliness + high energy
    if (friendliness > 0.6 && energy > 0.5) {
      return 'happy';
    }
    // Surprised: high curiosity + high energy
    if (curiosity > 0.7 && energy > 0.6) {
      return 'surprised';
    }
    // Shy: low friendliness + high curiosity
    if (friendliness < 0.5 && curiosity > 0.5) {
      return 'shy';
    }
    // Calm: high friendliness + low energy
    if (friendliness > 0.6 && energy < 0.5) {
      return 'calm';
    }
    // Playful: high playfulness
    if (playfulness > 0.7) {
      return 'playful';
    }

    // Default based on energy
    return energy > 0.5 ? 'round' : 'almond';
  }

  /**
   * Get mouth type based on personality
   */
  getMouthType() {
    const { energy, friendliness, curiosity, playfulness } = this.traits;

    // Angry: low friendliness + high energy
    if (friendliness < 0.4 && energy > 0.6) {
      return 'angry';
    }
    // Sad: low friendliness + low energy
    if (friendliness < 0.4 && energy < 0.5) {
      return 'sad';
    }
    // Happy: high friendliness + high energy
    if (friendliness > 0.6 && energy > 0.5) {
      return 'happy';
    }
    // Surprised: high curiosity + high energy
    if (curiosity > 0.7 && energy > 0.6) {
      return 'surprised';
    }
    // Shy: low friendliness + high curiosity
    if (friendliness < 0.5 && curiosity > 0.5) {
      return 'shy';
    }
    // Calm: high friendliness + low energy
    if (friendliness > 0.6 && energy < 0.5) {
      return 'calm';
    }
    // Playful: high playfulness
    if (playfulness > 0.7) {
      return 'playful';
    }

    // Default
    return 'calm';
  }

  /**
   * Randomize all genes
   */
  randomize() {
    // Body
    this.bodyType = ['circle', 'ellipse', 'rounded', 'pear'][Math.floor(Math.random() * 4)];
    this.bodyWidth = 0.6 + Math.random() * 0.4;
    this.bodyHeight = 0.7 + Math.random() * 0.5;
    this.roundness = 0.3 + Math.random() * 0.5;

    // Colors
    this.hue = Math.floor(Math.random() * 360);
    this.saturation = 40 + Math.floor(Math.random() * 40);
    this.lightness = 40 + Math.floor(Math.random() * 30);

    // Eyes
    this.eyeCount = 1 + Math.floor(Math.random() * 6); // 1-6 eyes
    this.eyeSize = 0.08 + Math.random() * 0.07;
    this.eyeShape = ['round', 'almond', 'oval'][Math.floor(Math.random() * 3)];
    this.eyeSpacing = 0.2 + Math.random() * 0.3;

    // Mouth
    this.mouthType = ['happy', 'calm', 'surprised', 'shy'][Math.floor(Math.random() * 4)];
    this.mouthWidth = 0.1 + Math.random() * 0.1;

    // Features
    this.hasEars = Math.random() < 0.5;
    this.hasTail = Math.random() < 0.4;
    this.hasAntenna = Math.random() < 0.2;

    // Personality
    this.traits = {
      energy: 0.3 + Math.random() * 0.6,
      friendliness: 0.4 + Math.random() * 0.5,
      curiosity: 0.5 + Math.random() * 0.4,
      playfulness: 0.3 + Math.random() * 0.5
    };

    // Reset animation state
    this.blinkTimer = 2 + Math.random() * 3;
    this.blinkState = 0;
    this.breathOffset = Math.random() * Math.PI * 2;
    this.bouncePhase = Math.random() * Math.PI * 2;

    // Regenerate name
    this.name = this.generateName();
  }

  /**
   * Update animation state
   */
  updateAnimation(dt) {
    // Update blink timer
    this.blinkTimer -= dt;
    if (this.blinkTimer <= 0) {
      this.blinkState = 1;
      this.blinkTimer = 2 + Math.random() * 3;
    } else if (this.blinkState > 0) {
      this.blinkState -= dt * 5;
      if (this.blinkState < 0) this.blinkState = 0;
    }
  }

  /**
   * Serialize to JSON
   */
  toJSON() {
    return {
      bodyType: this.bodyType,
      bodyWidth: this.bodyWidth,
      bodyHeight: this.bodyHeight,
      roundness: this.roundness,
      hue: this.hue,
      saturation: this.saturation,
      lightness: this.lightness,
      eyeCount: this.eyeCount,
      eyeSize: this.eyeSize,
      eyeShape: this.eyeShape,
      eyeSpacing: this.eyeSpacing,
      mouthType: this.mouthType,
      mouthWidth: this.mouthWidth,
      hasEars: this.hasEars,
      hasTail: this.hasTail,
      hasAntenna: this.hasAntenna,
      traits: { ...this.traits },
      name: this.name,
      generatedAt: this.generatedAt
    };
  }

  /**
   * Deserialize from JSON
   */
  static fromJSON(data) {
    const creature = new Creature();
    Object.assign(creature, data);

    // Reset animation state
    creature.blinkTimer = 2 + Math.random() * 3;
    creature.blinkState = 0;
    creature.breathOffset = Math.random() * Math.PI * 2;
    creature.bouncePhase = Math.random() * Math.PI * 2;

    return creature;
  }
}
