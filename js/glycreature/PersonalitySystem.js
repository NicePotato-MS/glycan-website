/**
 * PersonalitySystem - Maps personality traits to emotional expressions
 * Determines how personality affects eye and mouth appearance
 */

export class PersonalitySystem {
  /**
   * Get emotion expression based on personality
   * @param {Object} traits - Personality traits (energy, friendliness, curiosity, playfulness)
   * @returns {Object} - Expression data for eyes and mouth
   */
  static getExpression(traits) {
    const { energy, friendliness, curiosity, playfulness } = traits;

    // Calculate dominant emotion
    const emotions = {
      happy: friendliness * 0.4 + playfulness * 0.3 + energy * 0.2 + curiosity * 0.1,
      excited: energy * 0.5 + playfulness * 0.3 + friendliness * 0.2,
      curious: curiosity * 0.5 + energy * 0.3 + playfulness * 0.2,
      calm: (1 - energy) * 0.4 + (1 - playfulness) * 0.3 + friendliness * 0.3,
      shy: (1 - friendliness) * 0.4 + (1 - energy) * 0.3 + curiosity * 0.3,
      playful: playfulness * 0.5 + energy * 0.3 + friendliness * 0.2
    };

    // Find dominant emotion
    let dominantEmotion = 'happy';
    let maxScore = emotions.happy;

    for (const [emotion, score] of Object.entries(emotions)) {
      if (score > maxScore) {
        maxScore = score;
        dominantEmotion = emotion;
      }
    }

    return this.getEmotionExpression(dominantEmotion, traits);
  }

  /**
   * Get specific expression for an emotion
   * @param {string} emotion - The emotion type
   * @param {Object} traits - Personality traits
   * @returns {Object} - Expression data
   */
  static getEmotionExpression(emotion, traits) {
    const expressions = {
      happy: {
        mouth: 'happy',
        eyeShape: 'round',
        eyeOpenness: 1.0,
        mouthCurve: 0.3
      },
      excited: {
        mouth: 'surprised',
        eyeShape: 'round',
        eyeOpenness: 1.2,
        mouthCurve: 0.5
      },
      curious: {
        mouth: 'calm',
        eyeShape: 'round',
        eyeOpenness: 1.3,
        mouthCurve: 0.0
      },
      calm: {
        mouth: 'calm',
        eyeShape: 'almond',
        eyeOpenness: 0.8,
        mouthCurve: 0.0
      },
      shy: {
        mouth: 'shy',
        eyeShape: 'almond',
        eyeOpenness: 0.7,
        mouthCurve: -0.1
      },
      playful: {
        mouth: 'happy',
        eyeShape: 'round',
        eyeOpenness: 1.1,
        mouthCurve: 0.4
      }
    };

    return expressions[emotion] || expressions.happy;
  }

  /**
   * Get trait description based on personality
   * @param {Object} traits - Personality traits
   * @returns {string} - Human-readable description
   */
  static getTraitDescription(traits) {
    const { energy, friendliness, curiosity, playfulness } = traits;
    const descriptions = [];

    // Energy
    if (energy > 0.7) descriptions.push('energetic');
    else if (energy < 0.4) descriptions.push('calm');

    // Friendliness
    if (friendliness > 0.7) descriptions.push('friendly');
    else if (friendliness < 0.4) descriptions.push('reserved');

    // Curiosity
    if (curiosity > 0.7) descriptions.push('curious');
    else if (curiosity < 0.4) descriptions.push('content');

    // Playfulness
    if (playfulness > 0.7) descriptions.push('playful');
    else if (playfulness < 0.4) descriptions.push('serious');

    if (descriptions.length === 0) {
      return 'balanced';
    }

    return descriptions.join(', ');
  }

  /**
   * Get animation modifiers based on personality
   * @param {Object} traits - Personality traits
   * @returns {Object} - Animation modifiers
   */
  static getAnimationModifiers(traits) {
    return {
      breathSpeed: 1 + traits.energy * 0.5,
      breathAmount: 0.02 + traits.energy * 0.01,
      bounceSpeed: 2 + traits.playfulness * 2,
      bounceAmount: 0.01 + traits.playfulness * 0.01,
      blinkFrequency: 3 - traits.curiosity * 1, // More curious = blink less
      tailWagSpeed: 3 + traits.energy * 2,
      tailWagAmount: 10 + traits.energy * 10
    };
  }
}
