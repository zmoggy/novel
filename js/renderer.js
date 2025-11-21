// Renderer - Handles all drawing operations
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.camera = { x: 0, y: 0 };
    }

    clear() {
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setCamera(x, y) {
        this.camera.x = x;
        this.camera.y = y;
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x - this.camera.x,
            y - this.camera.y,
            width,
            height
        );
    }

    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(
            x - this.camera.x,
            y - this.camera.y,
            radius,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    drawText(text, x, y, color = 'white', size = 16, align = 'left') {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px Arial`;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x - this.camera.x, y - this.camera.y);
    }

    drawStrokeRect(x, y, width, height, color, lineWidth = 2) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(
            x - this.camera.x,
            y - this.camera.y,
            width,
            height
        );
    }

    // Draw a simple character (used for player and NPCs)
    drawCharacter(x, y, customization) {
        const screenX = x - this.camera.x;
        const screenY = y - this.camera.y;
        const size = CONFIG.TILE_SIZE;

        // Body
        this.ctx.fillStyle = customization.outfit?.color || '#8B4513';
        this.ctx.fillRect(screenX, screenY + size * 0.4, size, size * 0.6);

        // Head
        this.ctx.fillStyle = customization.skinTone || '#fce5cd';
        this.ctx.beginPath();
        this.ctx.arc(screenX + size / 2, screenY + size * 0.3, size * 0.3, 0, Math.PI * 2);
        this.ctx.fill();

        // Hair
        this.ctx.fillStyle = customization.hairColor || '#2c1b18';
        this.ctx.beginPath();
        this.ctx.arc(screenX + size / 2, screenY + size * 0.25, size * 0.35, 0, Math.PI * 2);
        this.ctx.fill();

        // Eyes
        this.ctx.fillStyle = customization.eyeColor || '#4169e1';
        this.ctx.fillRect(screenX + size * 0.35, screenY + size * 0.28, size * 0.1, size * 0.1);
        this.ctx.fillRect(screenX + size * 0.55, screenY + size * 0.28, size * 0.1, size * 0.1);
    }

    // Draw the dog companion
    drawDog(x, y) {
        const screenX = x - this.camera.x;
        const screenY = y - this.camera.y;
        const size = CONFIG.TILE_SIZE * 0.8;

        // Body (black and white)
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(screenX, screenY + size * 0.3, size, size * 0.5);

        // White patches
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(screenX + size * 0.2, screenY + size * 0.4, size * 0.6, size * 0.3);

        // Head
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(screenX + size / 2, screenY + size * 0.25, size * 0.3, 0, Math.PI * 2);
        this.ctx.fill();

        // White snout
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.arc(screenX + size / 2, screenY + size * 0.3, size * 0.15, 0, Math.PI * 2);
        this.ctx.fill();

        // Eyes (heterochromia - brown and blue)
        // Brown eye
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(screenX + size * 0.35, screenY + size * 0.2, size * 0.08, size * 0.08);

        // Blue eye
        this.ctx.fillStyle = '#4169e1';
        this.ctx.fillRect(screenX + size * 0.57, screenY + size * 0.2, size * 0.08, size * 0.08);

        // Ears
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(screenX + size * 0.1, screenY + size * 0.1, size * 0.15, size * 0.3);
        this.ctx.fillRect(screenX + size * 0.75, screenY + size * 0.1, size * 0.15, size * 0.3);
    }

    // Draw a tile on the map
    drawTile(x, y, type) {
        const screenX = x - this.camera.x;
        const screenY = y - this.camera.y;
        const size = CONFIG.TILE_SIZE;

        let color;
        switch(type) {
            case 'grass':
                color = '#7cb342';
                break;
            case 'dirt':
                color = '#8b6f47';
                break;
            case 'tilled':
                color = '#6b5639';
                break;
            case 'water':
                color = '#2196f3';
                break;
            case 'forest':
                color = '#558b2f';
                break;
            case 'path':
                color = '#a1887f';
                break;
            case 'wood':
                color = '#795548';
                break;
            default:
                color = '#7cb342';
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(screenX, screenY, size, size);

        // Add texture
        if (type === 'grass' || type === 'forest') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            for (let i = 0; i < 3; i++) {
                const offsetX = Math.random() * size;
                const offsetY = Math.random() * size;
                this.ctx.fillRect(screenX + offsetX, screenY + offsetY, 2, 2);
            }
        }
    }

    // Draw crop
    drawCrop(x, y, crop) {
        const screenX = x - this.camera.x;
        const screenY = y - this.camera.y;
        const size = CONFIG.TILE_SIZE;

        if (!crop.planted) return;

        // Draw watered soil
        if (crop.watered) {
            this.ctx.fillStyle = '#4a3626';
            this.ctx.fillRect(screenX, screenY, size, size);
        }

        // Draw plant based on growth stage
        const growthPercent = crop.growthStage / crop.maxGrowthStage;

        if (growthPercent < 0.25) {
            // Seedling
            this.ctx.fillStyle = '#9ccc65';
            this.ctx.fillRect(screenX + size * 0.45, screenY + size * 0.6, size * 0.1, size * 0.2);
        } else if (growthPercent < 0.5) {
            // Small plant
            this.ctx.fillStyle = '#7cb342';
            this.ctx.fillRect(screenX + size * 0.4, screenY + size * 0.5, size * 0.2, size * 0.3);
        } else if (growthPercent < 0.75) {
            // Growing plant
            this.ctx.fillStyle = '#689f38';
            this.ctx.fillRect(screenX + size * 0.35, screenY + size * 0.4, size * 0.3, size * 0.4);
        } else if (growthPercent >= 1) {
            // Ready to harvest
            this.ctx.fillStyle = '#558b2f';
            this.ctx.fillRect(screenX + size * 0.3, screenY + size * 0.3, size * 0.4, size * 0.5);

            // Fruit/vegetable
            this.ctx.fillStyle = crop.type === 'tomato' ? '#f44336' :
                                 crop.type === 'corn' ? '#fdd835' : '#e91e63';
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.5, screenY + size * 0.4, size * 0.15, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    // Draw tree
    drawTree(x, y) {
        const screenX = x - this.camera.x;
        const screenY = y - this.camera.y;
        const size = CONFIG.TILE_SIZE;

        // Trunk
        this.ctx.fillStyle = '#5d4037';
        this.ctx.fillRect(screenX + size * 0.4, screenY + size * 0.4, size * 0.2, size * 0.6);

        // Leaves
        this.ctx.fillStyle = '#2e7d32';
        this.ctx.beginPath();
        this.ctx.arc(screenX + size * 0.5, screenY + size * 0.35, size * 0.4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    // Draw house
    drawHouse(x, y, width, height) {
        const screenX = x - this.camera.x;
        const screenY = y - this.camera.y;

        // Walls
        this.ctx.fillStyle = '#d7ccc8';
        this.ctx.fillRect(screenX, screenY + height * 0.3, width, height * 0.7);

        // Roof
        this.ctx.fillStyle = '#8d6e63';
        this.ctx.beginPath();
        this.ctx.moveTo(screenX - width * 0.1, screenY + height * 0.3);
        this.ctx.lineTo(screenX + width / 2, screenY);
        this.ctx.lineTo(screenX + width + width * 0.1, screenY + height * 0.3);
        this.ctx.closePath();
        this.ctx.fill();

        // Door
        this.ctx.fillStyle = '#5d4037';
        this.ctx.fillRect(screenX + width * 0.4, screenY + height * 0.6, width * 0.2, height * 0.4);

        // Window
        this.ctx.fillStyle = '#81d4fa';
        this.ctx.fillRect(screenX + width * 0.15, screenY + height * 0.5, width * 0.15, height * 0.15);
    }
}
