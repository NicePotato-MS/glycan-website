/**
 * GalleryManager - Manages creature collection with drag-and-drop
 */

export class GalleryManager {
  constructor(storageKey = 'glycreature-gallery') {
    this.storageKey = storageKey;
    this.creatures = this.loadFromStorage();
    this.draggedCreature = null;
    this.onDropCallback = null;
  }

  /**
   * Load creatures from localStorage
   */
  loadFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load gallery:', e);
      return [];
    }
  }

  /**
   * Save creatures to localStorage
   */
  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.creatures));
    } catch (e) {
      console.error('Failed to save gallery:', e);
    }
  }

  /**
   * Add a creature to the gallery
   */
  addCreature(creature) {
    this.creatures.push(creature.toJSON());
    this.saveToStorage();
  }

  /**
   * Remove a creature from the gallery
   */
  removeCreature(index) {
    if (index >= 0 && index < this.creatures.length) {
      this.creatures.splice(index, 1);
      this.saveToStorage();
    }
  }

  /**
   * Get a creature by index
   */
  getCreature(index) {
    return this.creatures[index];
  }

  /**
   * Get all creatures
   */
  getAllCreatures() {
    return [...this.creatures];
  }

  /**
   * Get creature count
   */
  getCount() {
    return this.creatures.length;
  }

  /**
   * Clear all creatures
   */
  clear() {
    this.creatures = [];
    this.saveToStorage();
  }

  /**
   * Render gallery to a container
   */
  render(container, CreatureClass, CreatureRenderer) {
    container.innerHTML = '';

    if (this.creatures.length === 0) {
      container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);font-size:13px;padding:20px;">no creatures yet. generate and save some!</p>';
      return;
    }

    this.creatures.forEach((creatureData, index) => {
      const item = this.createGalleryItem(creatureData, index, CreatureClass, CreatureRenderer);
      container.appendChild(item);
    });
  }

  /**
   * Create a gallery item element
   */
  createGalleryItem(creatureData, index, CreatureClass, CreatureRenderer) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.draggable = true;
    item.dataset.index = index;

    // Create canvas for preview
    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');

    // Render creature preview
    const creature = CreatureClass.fromJSON(creatureData);
    CreatureRenderer.renderPreview(creature, ctx, 80);

    item.appendChild(canvas);

    // Drag events
    item.addEventListener('dragstart', (e) => {
      this.draggedCreature = { index, data: creatureData };
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', index);
    });

    item.addEventListener('dragend', () => {
      this.draggedCreature = null;
      item.classList.remove('dragging');
    });

    // Click to load
    item.addEventListener('click', () => {
      if (this.onDropCallback) {
        this.onDropCallback('load', creatureData);
      }
    });

    return item;
  }

  /**
   * Set callback for drop events
   */
  onDrop(callback) {
    this.onDropCallback = callback;
  }

  /**
   * Get currently dragged creature
   */
  getDraggedCreature() {
    return this.draggedCreature;
  }
}
