/**
 * GeneEditor - Manages gene editor UI and updates creature genes
 */

export class GeneEditor {
  constructor(creature) {
    this.creature = creature;
    this.listeners = {};
  }

  /**
   * Set the creature being edited
   */
  setCreature(creature) {
    this.creature = creature;
    this.syncUI();
  }

  /**
   * Get the current creature
   */
  getCreature() {
    return this.creature;
  }

  /**
   * Sync UI with creature state
   */
  syncUI() {
    if (!this.creature) return;

    // Body genes
    this.setValue('gene-body-type', this.creature.bodyType);
    this.setValue('gene-body-width', this.creature.bodyWidth);
    this.setValue('gene-body-width-value', this.creature.bodyWidth.toFixed(2));
    this.setValue('gene-body-height', this.creature.bodyHeight);
    this.setValue('gene-body-height-value', this.creature.bodyHeight.toFixed(2));
    this.setValue('gene-roundness', this.creature.roundness);
    this.setValue('gene-roundness-value', this.creature.roundness.toFixed(2));

    // Color genes
    this.setValue('gene-hue', this.creature.hue);
    this.setValue('gene-hue-value', this.creature.hue + '°');
    this.setValue('gene-saturation', this.creature.saturation);
    this.setValue('gene-saturation-value', this.creature.saturation + '%');
    this.setValue('gene-lightness', this.creature.lightness);
    this.setValue('gene-lightness-value', this.creature.lightness + '%');

    // Update color swatches
    this.updateColorSwatches();

    // Eye genes (eye count, size, spacing - shape is now determined by personality)
    this.setValue('gene-eye-count', this.creature.eyeCount);
    this.setValue('gene-eye-count-value', this.creature.eyeCount);
    this.setValue('gene-eye-size', this.creature.eyeSize);
    this.setValue('gene-eye-size-value', this.creature.eyeSize.toFixed(2));
    this.setValue('gene-eye-spacing', this.creature.eyeSpacing);
    this.setValue('gene-eye-spacing-value', this.creature.eyeSpacing.toFixed(2));

    // Mouth genes (width only - type is now determined by personality)
    this.setValue('gene-mouth-width', this.creature.mouthWidth);
    this.setValue('gene-mouth-width-value', this.creature.mouthWidth.toFixed(2));

    // Feature genes
    this.updateToggle('hasEars', this.creature.hasEars);
    this.updateToggle('hasTail', this.creature.hasTail);
    this.updateToggle('hasAntenna', this.creature.hasAntenna);

    // Personality genes
    this.setValue('gene-energy', this.creature.traits.energy);
    this.setValue('gene-energy-value', this.creature.traits.energy.toFixed(2));
    this.setValue('gene-friendliness', this.creature.traits.friendliness);
    this.setValue('gene-friendliness-value', this.creature.traits.friendliness.toFixed(2));
    this.setValue('gene-curiosity', this.creature.traits.curiosity);
    this.setValue('gene-curiosity-value', this.creature.traits.curiosity.toFixed(2));
    this.setValue('gene-playfulness', this.creature.traits.playfulness);
    this.setValue('gene-playfulness-value', this.creature.traits.playfulness.toFixed(2));
  }

  /**
   * Set value of an element
   */
  setValue(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.value = value;
      el.textContent = value;
    }
  }

  /**
   * Update toggle button state
   */
  updateToggle(id, checked) {
    const el = document.getElementById('gene-' + id);
    if (el) {
      if (checked) {
        el.classList.add('checked');
      } else {
        el.classList.remove('checked');
      }
    }
  }

  /**
   * Update color swatches
   */
  updateColorSwatches() {
    const colors = this.getColors();
    const swatches = ['primary', 'secondary', 'accent'];

    swatches.forEach(name => {
      const el = document.getElementById('swatch-' + name);
      if (el) {
        el.style.backgroundColor = colors[name];
      }
    });
  }

  /**
   * Get colors from creature
   */
  getColors() {
    const { hue, saturation, lightness } = this.creature;

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

    return {
      primary: hslToHex(hue, saturation, lightness),
      secondary: hslToHex((hue + 45) % 360, saturation * 0.8, lightness + 10),
      accent: hslToHex((hue + 180) % 360, saturation * 0.6, lightness + 20)
    };
  }

  /**
   * Update a gene
   */
  updateGene(gene, value) {
    if (!this.creature) {
      console.warn('No creature to update');
      return;
    }

    switch (gene) {
      case 'bodyType':
        this.creature.bodyType = value;
        break;
      case 'bodyWidth':
        this.creature.bodyWidth = parseFloat(value);
        this.setValue('gene-body-width-value', parseFloat(value).toFixed(2));
        break;
      case 'bodyHeight':
        this.creature.bodyHeight = parseFloat(value);
        this.setValue('gene-body-height-value', parseFloat(value).toFixed(2));
        break;
      case 'roundness':
        this.creature.roundness = parseFloat(value);
        this.setValue('gene-roundness-value', parseFloat(value).toFixed(2));
        break;
      case 'hue':
        this.creature.hue = parseInt(value);
        this.setValue('gene-hue-value', value + '°');
        this.updateColorSwatches();
        break;
      case 'saturation':
        this.creature.saturation = parseInt(value);
        this.setValue('gene-saturation-value', value + '%');
        this.updateColorSwatches();
        break;
      case 'lightness':
        this.creature.lightness = parseInt(value);
        this.setValue('gene-lightness-value', value + '%');
        this.updateColorSwatches();
        break;
      case 'eyeCount':
        this.creature.eyeCount = parseInt(value);
        this.setValue('gene-eye-count-value', value);
        break;
      case 'eyeSize':
        this.creature.eyeSize = parseFloat(value);
        this.setValue('gene-eye-size-value', parseFloat(value).toFixed(2));
        break;
      case 'eyeShape':
        this.creature.eyeShape = value;
        break;
      case 'eyeSpacing':
        this.creature.eyeSpacing = parseFloat(value);
        this.setValue('gene-eye-spacing-value', parseFloat(value).toFixed(2));
        break;
      case 'mouthType':
        this.creature.mouthType = value;
        break;
      case 'mouthWidth':
        this.creature.mouthWidth = parseFloat(value);
        this.setValue('gene-mouth-width-value', parseFloat(value).toFixed(2));
        break;
      case 'energy':
        this.creature.traits.energy = parseFloat(value);
        this.setValue('gene-energy-value', parseFloat(value).toFixed(2));
        this.notify('traitChanged');
        break;
      case 'friendliness':
        this.creature.traits.friendliness = parseFloat(value);
        this.setValue('gene-friendliness-value', parseFloat(value).toFixed(2));
        this.notify('traitChanged');
        break;
      case 'curiosity':
        this.creature.traits.curiosity = parseFloat(value);
        this.setValue('gene-curiosity-value', parseFloat(value).toFixed(2));
        this.notify('traitChanged');
        break;
      case 'playfulness':
        this.creature.traits.playfulness = parseFloat(value);
        this.setValue('gene-playfulness-value', parseFloat(value).toFixed(2));
        this.notify('traitChanged');
        break;
    }

    this.notify('geneChanged');
  }

  /**
   * Toggle a gene
   */
  toggleGene(gene) {
    if (!this.creature) {
      console.warn('No creature to update');
      return;
    }

    this.creature[gene] = !this.creature[gene];
    this.updateToggle(gene, this.creature[gene]);
    this.notify('geneChanged');
  }

  /**
   * Add event listener
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Notify listeners
   */
  notify(event) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(this.creature));
    }
  }

  /**
   * Initialize all gene controls
   */
  initializeControls() {
    // Body type dropdown
    const bodyTypeSelect = document.getElementById('gene-body-type');
    if (bodyTypeSelect) {
      bodyTypeSelect.addEventListener('change', (e) => {
        this.updateGene('bodyType', e.target.value);
      });
    }

    // Body sliders
    this.attachSlider('gene-body-width', 'bodyWidth');
    this.attachSlider('gene-body-height', 'bodyHeight');
    this.attachSlider('gene-roundness', 'roundness');

    // Color sliders
    this.attachSlider('gene-hue', 'hue');
    this.attachSlider('gene-saturation', 'saturation');
    this.attachSlider('gene-lightness', 'lightness');

    // Eye controls (count, size, spacing - shape is determined by personality)
    this.attachSlider('gene-eye-count', 'eyeCount');
    this.attachSlider('gene-eye-size', 'eyeSize');
    this.attachSlider('gene-eye-spacing', 'eyeSpacing');

    // Mouth controls (width only - type is determined by personality)
    this.attachSlider('gene-mouth-width', 'mouthWidth');

    // Feature toggles
    this.attachToggle('hasEars');
    this.attachToggle('hasTail');
    this.attachToggle('hasAntenna');

    // Personality sliders
    this.attachSlider('gene-energy', 'energy');
    this.attachSlider('gene-friendliness', 'friendliness');
    this.attachSlider('gene-curiosity', 'curiosity');
    this.attachSlider('gene-playfulness', 'playfulness');
  }

  /**
   * Attach slider event
   */
  attachSlider(elementId, gene) {
    const el = document.getElementById(elementId);
    if (el) {
      el.addEventListener('input', (e) => {
        this.updateGene(gene, e.target.value);
      });
    }
  }

  /**
   * Attach toggle event
   */
  attachToggle(gene) {
    const el = document.getElementById('gene-' + gene);
    if (el) {
      el.addEventListener('click', () => {
        this.toggleGene(gene);
      });
    }
  }
}
