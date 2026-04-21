/**
 * BreedingManager - Manages creature breeding
 */

export class BreedingManager {
  constructor() {
    this.parent1 = null;
    this.parent2 = null;
    this.offspring = null;
  }

  /**
   * Set parent 1
   */
  setParent1(creatureData) {
    this.parent1 = creatureData;
  }

  /**
   * Set parent 2
   */
  setParent2(creatureData) {
    this.parent2 = creatureData;
  }

  /**
   * Get parent 1
   */
  getParent1() {
    return this.parent1;
  }

  /**
   * Get parent 2
   */
  getParent2() {
    return this.parent2;
  }

  /**
   * Check if ready to breed
   */
  isReady() {
    return this.parent1 !== null && this.parent2 !== null;
  }

  /**
   * Breed two creatures
   */
  breed(CreatureClass) {
    if (!this.isReady()) {
      throw new Error('Both parents must be set');
    }

    const parent1 = CreatureClass.fromJSON(this.parent1);
    const parent2 = CreatureClass.fromJSON(this.parent2);

    this.offspring = this.createOffspring(parent1, parent2, CreatureClass);

    return this.offspring;
  }

  /**
   * Create offspring from two parents
   */
  createOffspring(parent1, parent2, CreatureClass) {
    const offspring = new CreatureClass();

    // Inherit body type (50/50 chance)
    offspring.bodyType = Math.random() < 0.5 ? parent1.bodyType : parent2.bodyType;

    // Mix body proportions with mutation
    offspring.bodyWidth = this.mixWithMutation(parent1.bodyWidth, parent2.bodyWidth, 0.05);
    offspring.bodyHeight = this.mixWithMutation(parent1.bodyHeight, parent2.bodyHeight, 0.05);
    offspring.roundness = this.mixWithMutation(parent1.roundness, parent2.roundness, 0.05);

    // Mix colors (inherit from one parent with possible mutation)
    if (Math.random() < 0.5) {
      offspring.hue = parent1.hue;
      offspring.saturation = parent1.saturation;
      offspring.lightness = parent1.lightness;
    } else {
      offspring.hue = parent2.hue;
      offspring.saturation = parent2.saturation;
      offspring.lightness = parent2.lightness;
    }

    // Color mutation
    if (Math.random() < 0.3) {
      offspring.hue = (offspring.hue + this.randomInt(-30, 30) + 360) % 360;
    }

    // Mix eye traits
    offspring.eyeCount = this.clamp(Math.round(this.mixWithMutation(parent1.eyeCount, parent2.eyeCount, 0.5)), 1, 6);
    offspring.eyeSize = this.mixWithMutation(parent1.eyeSize, parent2.eyeSize, 0.01);
    offspring.eyeShape = Math.random() < 0.5 ? parent1.eyeShape : parent2.eyeShape;
    offspring.eyeSpacing = this.mixWithMutation(parent1.eyeSpacing, parent2.eyeSpacing, 0.02);

    // Mix mouth traits
    offspring.mouthType = Math.random() < 0.5 ? parent1.mouthType : parent2.mouthType;
    offspring.mouthWidth = this.mixWithMutation(parent1.mouthWidth, parent2.mouthWidth, 0.01);

    // Inherit features with probability
    offspring.hasEars = this.inheritFeature(parent1.hasEars, parent2.hasEars, 0.7);
    offspring.hasTail = this.inheritFeature(parent1.hasTail, parent2.hasTail, 0.7);
    offspring.hasAntenna = this.inheritFeature(parent1.hasAntenna, parent2.hasAntenna, 0.5);

    // Mix personality traits
    offspring.traits = {
      energy: this.clamp(this.mixWithMutation(parent1.traits.energy, parent2.traits.energy, 0.1), 0.1, 1),
      friendliness: this.clamp(this.mixWithMutation(parent1.traits.friendliness, parent2.traits.friendliness, 0.1), 0.1, 1),
      curiosity: this.clamp(this.mixWithMutation(parent1.traits.curiosity, parent2.traits.curiosity, 0.1), 0.1, 1),
      playfulness: this.clamp(this.mixWithMutation(parent1.traits.playfulness, parent2.traits.playfulness, 0.1), 0.1, 1)
    };

    // Generate new name
    offspring.name = offspring.generateName();

    return offspring;
  }

  /**
   * Mix two values with optional mutation
   */
  mixWithMutation(a, b, mutationAmount) {
    const avg = (a + b) / 2;
    const mutation = (Math.random() - 0.5) * 2 * mutationAmount;
    return avg + mutation;
  }

  /**
   * Inherit a feature based on parents
   */
  inheritFeature(parent1Has, parent2Has, singleParentChance) {
    if (parent1Has && parent2Has) return true;
    if (parent1Has || parent2Has) return Math.random() < singleParentChance;
    return false;
  }

  /**
   * Clamp value between min and max
   */
  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Random integer between min and max (inclusive)
   */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Clear parents
   */
  clearParents() {
    this.parent1 = null;
    this.parent2 = null;
    this.offspring = null;
  }

  /**
   * Get offspring
   */
  getOffspring() {
    return this.offspring;
  }
}
