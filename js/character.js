// Base Character class
class Character {
    constructor(x, y, customization = {}) {
        this.x = x;
        this.y = y;
        this.width = CONFIG.TILE_SIZE;
        this.height = CONFIG.TILE_SIZE;
        this.customization = {
            skinTone: customization.skinTone || CONFIG.SKIN_TONES[0],
            hairStyle: customization.hairStyle || CONFIG.HAIR_STYLES[0],
            hairColor: customization.hairColor || CONFIG.HAIR_COLORS[0],
            eyeColor: customization.eyeColor || CONFIG.EYE_COLORS[0],
            outfit: customization.outfit || CONFIG.OUTFITS[0]
        };
        this.direction = 'down';
        this.moving = false;
    }

    update(deltaTime) {
        // Override in subclasses
    }

    draw(renderer) {
        renderer.drawCharacter(this.x, this.y, this.customization);
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    collidesWith(other) {
        const bounds = this.getBounds();
        const otherBounds = other.getBounds ? other.getBounds() : other;
        return Utils.rectCollision(
            bounds.x, bounds.y, bounds.width, bounds.height,
            otherBounds.x, otherBounds.y, otherBounds.width, otherBounds.height
        );
    }
}
