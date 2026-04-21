/**
 * CreatureRenderer - Modular rendering system for creatures
 * Handles rendering at any size with proper scaling
 */

export class CreatureRenderer {
  /**
   * Render a creature at any size
   * @param {Creature} creature - The creature to render
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} width - Render width
   * @param {number} height - Render height
   * @param {number} time - Animation time
   */
  static render(creature, ctx, width, height, time = 0) {
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) * 0.4;

    // Get animation modifiers from personality
    const animMods = this.getAnimationModifiers(creature.traits);

    // Calculate breathing animation
    const breath = Math.sin(time * animMods.breathSpeed + creature.breathOffset) * animMods.breathAmount;
    const bounce = Math.sin(time * animMods.bounceSpeed + creature.bouncePhase) * animMods.bounceAmount;

    const bodyW = creature.bodyWidth * scale * (1 + breath);
    const bodyH = creature.bodyHeight * scale * (1 + breath);
    const bodyY = centerY + bounce * scale;

    // Get colors
    const colors = this.getColors(creature);

    // Draw body
    this.drawBody(ctx, creature, centerX, bodyY, bodyW, bodyH, colors);

    // Draw accessories (behind body)
    if (creature.hasEars) {
      this.drawEars(ctx, centerX, bodyY, bodyW, bodyH, colors);
    }

    // Draw antenna
    if (creature.hasAntenna) {
      this.drawAntenna(ctx, centerX, bodyY, bodyH, colors);
    }

    // Draw eyes
    this.drawEyes(ctx, creature, centerX, bodyY, bodyW, bodyH, scale, time);

    // Draw mouth
    this.drawMouth(ctx, creature, centerX, bodyY, bodyH, scale, colors);

    // Draw tail
    if (creature.hasTail) {
      this.drawTail(ctx, centerX, bodyY, bodyH, colors, time, animMods);
    }
  }

  /**
   * Get color palette from creature genes
   */
  static getColors(creature) {
    const { hue, saturation, lightness } = creature;

    const hslToHex = (h, s, l) => {
      s /= 100;
      l /= 100;
      const a = s * Math.min(l, 1 - l);
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    const primary = hslToHex(hue, saturation, lightness);
    const secondary = hslToHex((hue + 45) % 360, saturation * 0.8, lightness + 10);
    const accent = hslToHex((hue + 180) % 360, saturation * 0.6, lightness + 20);

    return { primary, secondary, accent };
  }

  /**
   * Get animation modifiers from personality
   */
  static getAnimationModifiers(traits) {
    return {
      breathSpeed: 1 + traits.energy * 0.5,
      breathAmount: 0.02 + traits.energy * 0.01,
      bounceSpeed: 2 + traits.playfulness * 2,
      bounceAmount: 0.01 + traits.playfulness * 0.01,
      tailWagSpeed: 3 + traits.energy * 2,
      tailWagAmount: 10 + traits.energy * 10
    };
  }

  /**
   * Draw body
   */
  static drawBody(ctx, creature, x, y, w, h, colors) {
    ctx.fillStyle = colors.primary;
    ctx.beginPath();

    switch (creature.bodyType) {
      case 'circle':
        ctx.arc(x, y, w * 0.5, 0, Math.PI * 2);
        break;
      case 'ellipse':
        ctx.ellipse(x, y, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
        break;
      case 'rounded':
        const r = w * creature.roundness;
        ctx.roundRect(x - w / 2, y - h / 2, w, h, r);
        break;
      case 'pear':
        ctx.moveTo(x, y - h * 0.4);
        ctx.bezierCurveTo(
          x + w * 0.5, y - h * 0.3,
          x + w * 0.5, y + h * 0.5,
          x, y + h * 0.5
        );
        ctx.bezierCurveTo(
          x - w * 0.5, y + h * 0.5,
          x - w * 0.5, y - h * 0.3,
          x, y - h * 0.4
        );
        break;
    }

    ctx.fill();
  }

  /**
   * Draw ears
   */
  static drawEars(ctx, x, y, w, h, colors) {
    ctx.fillStyle = colors.secondary;
    const earSize = w * 0.15;
    const earOffset = w * 0.35;

    // Left ear
    ctx.beginPath();
    ctx.ellipse(x - earOffset, y - h * 0.3, earSize * 0.6, earSize, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Right ear
    ctx.beginPath();
    ctx.ellipse(x + earOffset, y - h * 0.3, earSize * 0.6, earSize, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draw antenna
   */
  static drawAntenna(ctx, x, y, h, colors) {
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - h * 0.45);
    ctx.lineTo(x, y - h * 0.6);
    ctx.stroke();

    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(x, y - h * 0.65, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draw eyes with proper positioning for 1-6 eyes
   */
  static drawEyes(ctx, creature, x, y, w, h, scale, time) {
    const eyeY = y - h * 0.1;
    const eyeW = creature.eyeSize * scale;
    const eyeH = eyeW * (creature.eyeShape === 'almond' ? 0.7 : 1);

    // Get eye positions based on count
    const eyePositions = this.getEyePositions(creature.eyeCount, x, eyeY, w * creature.eyeSpacing);

    // Draw each eye
    for (const [ex, ey] of eyePositions) {
      // Eye white
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();

      switch (creature.eyeShape) {
        case 'round':
          ctx.arc(ex, ey, eyeW, 0, Math.PI * 2);
          break;
        case 'almond':
          ctx.ellipse(ex, ey, eyeW, eyeH, 0, 0, Math.PI * 2);
          break;
        case 'oval':
          ctx.ellipse(ex, ey, eyeW * 0.8, eyeH * 1.2, 0, 0, Math.PI * 2);
          break;
      }

      ctx.fill();

      // Blink effect
      if (creature.blinkState > 0) {
        ctx.fillStyle = this.getColors(creature).primary;
        const blinkHeight = eyeH * (1 - creature.blinkState);
        ctx.fillRect(ex - eyeW, ey - blinkHeight / 2, eyeW * 2, blinkHeight);
      }

      // Pupil and shine (only if not blinking)
      if (creature.blinkState < 0.5) {
        const pupilSize = eyeW * 0.4;

        // Pupil
        ctx.fillStyle = '#0a0e17';
        ctx.beginPath();
        ctx.arc(ex, ey, pupilSize, 0, Math.PI * 2);
        ctx.fill();

        // Eye shine
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ex + pupilSize * 0.3, ey - pupilSize * 0.3, pupilSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /**
   * Get eye positions based on count
   * Arranges eyes in geometric patterns
   */
  static getEyePositions(count, centerX, centerY, spacing) {
    const positions = [];

    switch (count) {
      case 1:
        positions.push([centerX, centerY]);
        break;
      case 2:
        positions.push([centerX - spacing / 2, centerY]);
        positions.push([centerX + spacing / 2, centerY]);
        break;
      case 3:
        // Triangle
        const r3 = spacing / 2;
        for (let i = 0; i < 3; i++) {
          const angle = (i * 2 * Math.PI / 3) - Math.PI / 2;
          positions.push([
            centerX + r3 * Math.cos(angle),
            centerY + r3 * Math.sin(angle)
          ]);
        }
        break;
      case 4:
        // Diamond
        const r4 = spacing / 2;
        positions.push([centerX, centerY - r4]);
        positions.push([centerX + r4, centerY]);
        positions.push([centerX, centerY + r4]);
        positions.push([centerX - r4, centerY]);
        break;
      case 5:
        // Pentagon
        const r5 = spacing / 2;
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
          positions.push([
            centerX + r5 * Math.cos(angle),
            centerY + r5 * Math.sin(angle)
          ]);
        }
        break;
      case 6:
        // Hexagon
        const r6 = spacing / 2;
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI / 6) - Math.PI / 2;
          positions.push([
            centerX + r6 * Math.cos(angle),
            centerY + r6 * Math.sin(angle)
          ]);
        }
        break;
    }

    return positions;
  }

  /**
   * Draw mouth
   */
  static drawMouth(ctx, creature, x, y, h, scale, colors) {
    const mouthY = y + h * 0.15;
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    ctx.beginPath();

    switch (creature.mouthType) {
      case 'happy':
        ctx.arc(x, mouthY - 5, creature.mouthWidth * scale, 0.2, Math.PI - 0.2);
        break;
      case 'calm':
        ctx.moveTo(x - creature.mouthWidth * scale * 0.5, mouthY);
        ctx.lineTo(x + creature.mouthWidth * scale * 0.5, mouthY);
        break;
      case 'surprised':
        ctx.arc(x, mouthY, creature.mouthWidth * scale * 0.6, 0, Math.PI);
        break;
      case 'shy':
        ctx.arc(x, mouthY + 5, creature.mouthWidth * scale * 0.3, Math.PI, 0);
        break;
    }

    ctx.stroke();
  }

  /**
   * Draw tail
   */
  static drawTail(ctx, x, y, h, colors, time, animMods) {
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const tailStartX = x;
    const tailStartY = y + h * 0.4;
    const tailWag = Math.sin(time * animMods.tailWagSpeed) * animMods.tailWagAmount;

    ctx.beginPath();
    ctx.moveTo(tailStartX, tailStartY);
    ctx.quadraticCurveTo(
      tailStartX + tailWag,
      tailStartY + 20,
      tailStartX + tailWag * 1.5,
      tailStartY + 35
    );
    ctx.stroke();
  }

  /**
   * Render a preview (optimized for small sizes)
   */
  static renderPreview(creature, ctx, size, time = 0) {
    // Create a temporary canvas for rendering
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size * 2;
    tempCanvas.height = size * 2;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.scale(2, 2);

    // Render at the preview size
    this.render(creature, tempCtx, size, size, time);

    // Draw to the target context
    ctx.drawImage(tempCanvas, 0, 0, size, size);
  }
}
