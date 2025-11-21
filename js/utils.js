// Utility Functions

class Utils {
    static distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    static lerp(start, end, t) {
        return start + (end - start) * t;
    }

    static tileToPixel(tileX, tileY) {
        return {
            x: tileX * CONFIG.TILE_SIZE,
            y: tileY * CONFIG.TILE_SIZE
        };
    }

    static pixelToTile(pixelX, pixelY) {
        return {
            x: Math.floor(pixelX / CONFIG.TILE_SIZE),
            y: Math.floor(pixelY / CONFIG.TILE_SIZE)
        };
    }

    static isInBounds(x, y, width, height) {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    static rectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x1 < x2 + w2 &&
               x1 + w1 > x2 &&
               y1 < y2 + h2 &&
               y1 + h1 > y2;
    }

    static formatTime(hours, minutes) {
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHours}:${displayMinutes} ${period}`;
    }

    static formatDate(day, season, year) {
        const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
        return `${seasons[season]} ${day}, Year ${year}`;
    }
}

// Simple event emitter
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}
