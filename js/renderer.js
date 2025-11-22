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

    // Draw different outfit types with distinct visual designs
    drawOutfit(size, customization, skinTone) {
        const outfit = customization.outfit || CONFIG.OUTFITS[0];
        const type = outfit.type || 'short_dress';
        const topColor = outfit.topColor || '#8B4513';
        const bottomColor = outfit.bottomColor || '#6B3410';
        const accentColor = outfit.accentColor || '#FFD700';

        switch(type) {
            case 'overalls':
                // Overalls - straps and pants
                // Pants bottom
                this.ctx.fillStyle = bottomColor;
                this.ctx.fillRect(size * 0.3, size * 0.5, size * 0.15, size * 0.45);
                this.ctx.fillRect(size * 0.55, size * 0.5, size * 0.15, size * 0.45);
                // Chest piece
                this.ctx.fillRect(size * 0.32, size * 0.45, size * 0.36, size * 0.15);
                // Straps
                this.ctx.fillStyle = topColor;
                this.ctx.fillRect(size * 0.37, size * 0.42, size * 0.08, size * 0.25);
                this.ctx.fillRect(size * 0.55, size * 0.42, size * 0.08, size * 0.25);
                // Buttons
                this.ctx.fillStyle = accentColor;
                this.ctx.beginPath();
                this.ctx.arc(size * 0.41, size * 0.45, size * 0.02, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.arc(size * 0.59, size * 0.45, size * 0.02, 0, Math.PI * 2);
                this.ctx.fill();
                break;

            case 'short_dress':
                // Short A-line dress
                this.ctx.fillStyle = topColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.3, size * 0.45);
                this.ctx.lineTo(size * 0.7, size * 0.45);
                this.ctx.lineTo(size * 0.75, size * 0.7);
                this.ctx.lineTo(size * 0.25, size * 0.7);
                this.ctx.closePath();
                this.ctx.fill();
                // Skirt portion
                this.ctx.fillStyle = bottomColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.25, size * 0.62);
                this.ctx.lineTo(size * 0.75, size * 0.62);
                this.ctx.lineTo(size * 0.8, size * 0.75);
                this.ctx.lineTo(size * 0.2, size * 0.75);
                this.ctx.closePath();
                this.ctx.fill();
                // Belt
                this.ctx.fillStyle = accentColor;
                this.ctx.fillRect(size * 0.3, size * 0.6, size * 0.4, size * 0.04);
                break;

            case 'sundress':
                // Sundress - flowing design
                this.ctx.fillStyle = topColor;
                this.ctx.fillRect(size * 0.32, size * 0.45, size * 0.36, size * 0.12);
                this.ctx.fillStyle = bottomColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.28, size * 0.57);
                this.ctx.lineTo(size * 0.72, size * 0.57);
                this.ctx.lineTo(size * 0.78, size * 0.9);
                this.ctx.lineTo(size * 0.22, size * 0.9);
                this.ctx.closePath();
                this.ctx.fill();
                // Floral accents
                this.ctx.fillStyle = accentColor;
                for (let i = 0; i < 3; i++) {
                    this.ctx.beginPath();
                    this.ctx.arc(size * (0.35 + i * 0.15), size * 0.75, size * 0.025, 0, Math.PI * 2);
                    this.ctx.fill();
                }
                break;

            case 'long_dress':
                // Long flowing dress
                this.ctx.fillStyle = topColor;
                this.ctx.fillRect(size * 0.32, size * 0.45, size * 0.36, size * 0.18);
                this.ctx.fillStyle = bottomColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.3, size * 0.63);
                this.ctx.lineTo(size * 0.7, size * 0.63);
                this.ctx.lineTo(size * 0.78, size * 0.95);
                this.ctx.lineTo(size * 0.22, size * 0.95);
                this.ctx.closePath();
                this.ctx.fill();
                // Accent trim
                this.ctx.fillStyle = accentColor;
                this.ctx.fillRect(size * 0.3, size * 0.61, size * 0.4, size * 0.03);
                break;

            case 'ball_gown':
                // Ball gown - wide skirt
                this.ctx.fillStyle = topColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.35, size * 0.45);
                this.ctx.lineTo(size * 0.65, size * 0.45);
                this.ctx.lineTo(size * 0.68, size * 0.62);
                this.ctx.lineTo(size * 0.32, size * 0.62);
                this.ctx.closePath();
                this.ctx.fill();
                // Wide ball gown skirt
                this.ctx.fillStyle = bottomColor;
                this.ctx.beginPath();
                this.ctx.arc(size * 0.5, size * 0.63, size * 0.32, 0, Math.PI);
                this.ctx.fill();
                // Gold trim
                this.ctx.fillStyle = accentColor;
                this.ctx.fillRect(size * 0.32, size * 0.6, size * 0.36, size * 0.03);
                break;

            case 'sweater_pants':
                // Sweater and pants combo
                // Sweater top
                this.ctx.fillStyle = topColor;
                this.ctx.fillRect(size * 0.28, size * 0.45, size * 0.44, size * 0.25);
                // Pants
                this.ctx.fillStyle = bottomColor;
                this.ctx.fillRect(size * 0.32, size * 0.7, size * 0.15, size * 0.25);
                this.ctx.fillRect(size * 0.53, size * 0.7, size * 0.15, size * 0.25);
                // Scarf accent
                this.ctx.fillStyle = accentColor;
                this.ctx.fillRect(size * 0.35, size * 0.44, size * 0.3, size * 0.05);
                break;

            case 'tunic':
                // Tunic style
                this.ctx.fillStyle = topColor;
                this.ctx.fillRect(size * 0.3, size * 0.45, size * 0.4, size * 0.3);
                // Belt
                this.ctx.fillStyle = accentColor;
                this.ctx.fillRect(size * 0.32, size * 0.6, size * 0.36, size * 0.05);
                // Leggings/pants
                this.ctx.fillStyle = bottomColor;
                this.ctx.fillRect(size * 0.34, size * 0.75, size * 0.13, size * 0.2);
                this.ctx.fillRect(size * 0.53, size * 0.75, size * 0.13, size * 0.2);
                break;

            case 'cocktail_dress':
                // Cocktail dress - fitted top, flared skirt
                this.ctx.fillStyle = topColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.32, size * 0.45);
                this.ctx.lineTo(size * 0.68, size * 0.45);
                this.ctx.lineTo(size * 0.65, size * 0.65);
                this.ctx.lineTo(size * 0.35, size * 0.65);
                this.ctx.closePath();
                this.ctx.fill();
                // Flared skirt
                this.ctx.fillStyle = bottomColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.35, size * 0.65);
                this.ctx.lineTo(size * 0.65, size * 0.65);
                this.ctx.lineTo(size * 0.75, size * 0.82);
                this.ctx.lineTo(size * 0.25, size * 0.82);
                this.ctx.closePath();
                this.ctx.fill();
                // Sparkly accent
                this.ctx.fillStyle = accentColor;
                this.ctx.fillRect(size * 0.35, size * 0.63, size * 0.3, size * 0.02);
                break;

            case 'athletic':
                // Athletic wear - sports top and shorts
                this.ctx.fillStyle = topColor;
                this.ctx.fillRect(size * 0.3, size * 0.45, size * 0.4, size * 0.22);
                // Shorts
                this.ctx.fillStyle = bottomColor;
                this.ctx.fillRect(size * 0.32, size * 0.67, size * 0.15, size * 0.18);
                this.ctx.fillRect(size * 0.53, size * 0.67, size * 0.15, size * 0.18);
                // Stripe accent
                this.ctx.fillStyle = accentColor;
                this.ctx.fillRect(size * 0.32, size * 0.55, size * 0.36, size * 0.03);
                break;

            case 'kimono':
                // Traditional kimono
                this.ctx.fillStyle = topColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.25, size * 0.45);
                this.ctx.lineTo(size * 0.75, size * 0.45);
                this.ctx.lineTo(size * 0.72, size * 0.92);
                this.ctx.lineTo(size * 0.28, size * 0.92);
                this.ctx.closePath();
                this.ctx.fill();
                // Obi (belt)
                this.ctx.fillStyle = accentColor;
                this.ctx.fillRect(size * 0.3, size * 0.58, size * 0.4, size * 0.12);
                // Inner layer
                this.ctx.fillStyle = bottomColor;
                this.ctx.fillRect(size * 0.42, size * 0.48, size * 0.16, size * 0.15);
                break;

            default:
                // Default simple dress
                this.ctx.fillStyle = topColor;
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.3, size * 0.45);
                this.ctx.lineTo(size * 0.7, size * 0.45);
                this.ctx.lineTo(size * 0.8, size * 0.95);
                this.ctx.lineTo(size * 0.2, size * 0.95);
                this.ctx.closePath();
                this.ctx.fill();
        }

        // Arms (drawn over outfit)
        this.ctx.fillStyle = topColor;
        // Left arm
        this.ctx.fillRect(size * 0.15, size * 0.45, size * 0.12, size * 0.35);
        // Right arm
        this.ctx.fillRect(size * 0.73, size * 0.45, size * 0.12, size * 0.35);

        // Hands
        this.ctx.fillStyle = skinTone;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.21, size * 0.82, size * 0.08, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(size * 0.79, size * 0.82, size * 0.08, 0, Math.PI * 2);
        this.ctx.fill();

        // Neck
        this.ctx.fillStyle = skinTone;
        this.ctx.fillRect(size * 0.42, size * 0.38, size * 0.16, size * 0.1);
    }

    // Draw a detailed FFT-style character (used for player and NPCs)
    drawCharacter(x, y, customization, action = null) {
        // Route to male character renderer if specified
        if (customization.isMale) {
            return this.drawMaleCharacter(x, y, customization, action);
        }

        const screenX = x - this.camera.x;
        const screenY = y - this.camera.y;
        const size = CONFIG.TILE_SIZE;

        // Apply action offset for animations
        let offsetY = 0;
        let toolOffset = { x: 0, y: 0 };
        if (action) {
            offsetY = Math.sin(Date.now() / 100) * 2;
            if (action === 'hoeing' || action === 'watering') {
                toolOffset = { x: size * 0.7, y: size * 0.3 };
            }
        }

        this.ctx.save();
        this.ctx.translate(screenX, screenY + offsetY);

        // Enable anti-aliasing for smoother rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.beginPath();
        this.ctx.ellipse(size / 2, size * 0.95, size * 0.3, size * 0.1, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // BACK HAIR LAYER (drawn first) - only for long styles
        this.ctx.fillStyle = customization.hairColor || '#2c1b18';
        const hairStyle = customization.hairStyle || 'long';

        // Draw back hair based on style - positioned BEHIND head
        if (hairStyle === 'long') {
            // Long hair flowing down the back
            this.ctx.beginPath();
            this.ctx.ellipse(size / 2, size * 0.55, size * 0.25, size * 0.35, 0, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (hairStyle === 'ponytail') {
            // Ponytail at back of head
            this.ctx.beginPath();
            this.ctx.ellipse(size * 0.5, size * 0.5, size * 0.12, size * 0.35, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // BODY - Draw outfit based on type
        const skinTone = customization.skinTone || '#fce5cd';
        this.drawOutfit(size, customization, skinTone);

        // HEAD with gradient shading
        const headGradient = this.ctx.createRadialGradient(
            size * 0.48, size * 0.22, size * 0.05,
            size * 0.5, size * 0.25, size * 0.22
        );
        headGradient.addColorStop(0, this.lightenColor(skinTone, 20));
        headGradient.addColorStop(1, skinTone);
        this.ctx.fillStyle = headGradient;
        this.ctx.beginPath();
        this.ctx.arc(size / 2, size * 0.25, size * 0.22, 0, Math.PI * 2);
        this.ctx.fill();

        // Head shading for dimension
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        this.ctx.beginPath();
        this.ctx.arc(size * 0.58, size * 0.28, size * 0.12, 0, Math.PI * 2);
        this.ctx.fill();

        // Face highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        this.ctx.beginPath();
        this.ctx.ellipse(size * 0.46, size * 0.23, size * 0.08, size * 0.06, -0.3, 0, Math.PI * 2);
        this.ctx.fill();

        // FACIAL FEATURES
        // Eyes - larger and more detailed
        const eyeColor = customization.eyeColor || '#4169e1';

        // Eye whites with slight shadow
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(size * 0.37, size * 0.22, size * 0.1, size * 0.07);
        this.ctx.fillRect(size * 0.53, size * 0.22, size * 0.1, size * 0.07);

        // Irises with gradient
        const leftEyeGradient = this.ctx.createRadialGradient(
            size * 0.42, size * 0.25, size * 0.01,
            size * 0.42, size * 0.255, size * 0.035
        );
        leftEyeGradient.addColorStop(0, this.lightenColor(eyeColor, 30));
        leftEyeGradient.addColorStop(1, eyeColor);
        this.ctx.fillStyle = leftEyeGradient;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.42, size * 0.255, size * 0.035, 0, Math.PI * 2);
        this.ctx.fill();

        const rightEyeGradient = this.ctx.createRadialGradient(
            size * 0.58, size * 0.25, size * 0.01,
            size * 0.58, size * 0.255, size * 0.035
        );
        rightEyeGradient.addColorStop(0, this.lightenColor(eyeColor, 30));
        rightEyeGradient.addColorStop(1, eyeColor);
        this.ctx.fillStyle = rightEyeGradient;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.58, size * 0.255, size * 0.035, 0, Math.PI * 2);
        this.ctx.fill();

        // Pupils
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(size * 0.42, size * 0.255, size * 0.018, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(size * 0.58, size * 0.255, size * 0.018, 0, Math.PI * 2);
        this.ctx.fill();

        // Eye highlights - larger and more prominent
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.beginPath();
        this.ctx.arc(size * 0.425, size * 0.248, size * 0.012, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(size * 0.585, size * 0.248, size * 0.012, 0, Math.PI * 2);
        this.ctx.fill();

        // Secondary eye highlights
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.beginPath();
        this.ctx.arc(size * 0.415, size * 0.26, size * 0.006, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(size * 0.575, size * 0.26, size * 0.006, 0, Math.PI * 2);
        this.ctx.fill();

        // Eyelashes
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.38, size * 0.23);
        this.ctx.lineTo(size * 0.46, size * 0.23);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.54, size * 0.23);
        this.ctx.lineTo(size * 0.62, size * 0.23);
        this.ctx.stroke();

        // Nose
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.5, size * 0.28);
        this.ctx.lineTo(size * 0.52, size * 0.32);
        this.ctx.stroke();

        // Mouth - gentle smile
        this.ctx.strokeStyle = '#d1828b';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.5, size * 0.34, size * 0.06, 0.2, Math.PI - 0.2);
        this.ctx.stroke();

        // Blush
        this.ctx.fillStyle = 'rgba(255, 150, 150, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(size * 0.35, size * 0.3, size * 0.05, size * 0.04, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.ellipse(size * 0.65, size * 0.3, size * 0.05, size * 0.04, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // FRONT HAIR LAYER - Clearly on top of head facing forward
        this.ctx.fillStyle = customization.hairColor || '#2c1b18';

        // Draw front hair based on style
        if (hairStyle === 'long') {
            // Hair cap on top of head
            this.ctx.beginPath();
            this.ctx.arc(size / 2, size * 0.15, size * 0.25, Math.PI, Math.PI * 2);
            this.ctx.fill();
            // Side hair
            this.ctx.fillRect(size * 0.25, size * 0.15, size * 0.1, size * 0.2);
            this.ctx.fillRect(size * 0.65, size * 0.15, size * 0.1, size * 0.2);
            // Front bangs
            this.ctx.fillRect(size * 0.3, size * 0.15, size * 0.4, size * 0.08);
        } else if (hairStyle === 'short') {
            // Short hair top
            this.ctx.beginPath();
            this.ctx.arc(size / 2, size * 0.15, size * 0.24, Math.PI, Math.PI * 2);
            this.ctx.fill();
            // Side coverage
            this.ctx.fillRect(size * 0.28, size * 0.15, size * 0.08, size * 0.12);
            this.ctx.fillRect(size * 0.64, size * 0.15, size * 0.08, size * 0.12);
        } else if (hairStyle === 'curly') {
            // Voluminous curly top
            this.ctx.beginPath();
            this.ctx.arc(size * 0.5, size * 0.12, size * 0.22, 0, Math.PI * 2);
            this.ctx.fill();
            // Side curls
            this.ctx.beginPath();
            this.ctx.arc(size * 0.32, size * 0.18, size * 0.14, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(size * 0.68, size * 0.18, size * 0.14, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (hairStyle === 'pixie') {
            // Pixie cut - short on top
            this.ctx.beginPath();
            this.ctx.arc(size / 2, size * 0.14, size * 0.22, Math.PI, Math.PI * 2);
            this.ctx.fill();
            // Slight side coverage
            this.ctx.fillRect(size * 0.3, size * 0.14, size * 0.06, size * 0.12);
            this.ctx.fillRect(size * 0.64, size * 0.14, size * 0.06, size * 0.12);
        } else if (hairStyle === 'bob') {
            // Bob hair - covers top and sides
            this.ctx.beginPath();
            this.ctx.arc(size / 2, size * 0.13, size * 0.26, Math.PI, Math.PI * 2);
            this.ctx.fill();
            // Side bob
            this.ctx.fillRect(size * 0.24, size * 0.13, size * 0.1, size * 0.22);
            this.ctx.fillRect(size * 0.66, size * 0.13, size * 0.1, size * 0.22);
            // Front bangs
            this.ctx.fillRect(size * 0.28, size * 0.13, size * 0.44, size * 0.08);
        } else if (hairStyle === 'ponytail') {
            // Front hair with pulled back look
            this.ctx.beginPath();
            this.ctx.arc(size / 2, size * 0.14, size * 0.25, Math.PI, Math.PI * 2);
            this.ctx.fill();
            // Sides pulled back
            this.ctx.fillRect(size * 0.26, size * 0.14, size * 0.06, size * 0.15);
            this.ctx.fillRect(size * 0.68, size * 0.14, size * 0.06, size * 0.15);
        }

        // Hair highlights
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.beginPath();
        this.ctx.ellipse(size * 0.45, size * 0.16, size * 0.08, size * 0.06, -0.3, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw tool if using one
        if (action) {
            this.ctx.fillStyle = '#8B4513';
            if (action === 'hoeing') {
                // Hoe
                this.ctx.fillRect(toolOffset.x, toolOffset.y, size * 0.15, size * 0.05);
                this.ctx.fillRect(toolOffset.x + size * 0.07, toolOffset.y - size * 0.2, size * 0.03, size * 0.25);
            } else if (action === 'watering') {
                // Watering can
                this.ctx.fillStyle = '#4FC3F7';
                this.ctx.fillRect(toolOffset.x, toolOffset.y, size * 0.15, size * 0.12);
                this.ctx.fillRect(toolOffset.x + size * 0.15, toolOffset.y + size * 0.03, size * 0.08, size * 0.03);
            } else if (action === 'harvesting') {
                // Scythe
                this.ctx.strokeStyle = '#C0C0C0';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(toolOffset.x, toolOffset.y, size * 0.12, 0.5, 2);
                this.ctx.stroke();
            }
        }

        this.ctx.restore();
    }

    // Draw male NPCs (Honkai Star Rail style)
    drawMaleCharacter(x, y, customization, action = null) {
        const screenX = x - this.camera.x;
        const screenY = y - this.camera.y;
        const size = CONFIG.TILE_SIZE;

        this.ctx.save();
        this.ctx.translate(screenX, screenY);

        // Enable anti-aliasing for smoother rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.beginPath();
        this.ctx.ellipse(size / 2, size * 0.95, size * 0.3, size * 0.1, 0, 0, Math.PI * 2);
        this.ctx.fill();

        const hairColor = customization.hairColor;
        const hairStyle = customization.hairStyle;
        const eyeColor = customization.eyeColor;
        const skinTone = customization.skinTone || '#fce5cd';
        const colors = customization.outfitColors;

        // BACK HAIR LAYER
        this.ctx.fillStyle = hairColor;
        if (hairStyle === 'long') {
            // Dan Heng - long flowing hair
            this.ctx.beginPath();
            this.ctx.ellipse(size / 2, size * 0.55, size * 0.28, size * 0.4, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // BODY - Male outfit (armor/coat style) with gradient shading
        // Main body/coat with gradient
        const bodyGradient = this.ctx.createLinearGradient(size * 0.3, size * 0.45, size * 0.7, size * 0.95);
        bodyGradient.addColorStop(0, colors.primary);
        bodyGradient.addColorStop(1, this.darkenColor(colors.primary, 15));
        this.ctx.fillStyle = bodyGradient;
        this.ctx.fillRect(size * 0.3, size * 0.45, size * 0.4, size * 0.5);

        // Accent pieces with subtle gradient
        const accentGradient = this.ctx.createLinearGradient(size * 0.28, size * 0.45, size * 0.72, size * 0.53);
        accentGradient.addColorStop(0, colors.secondary);
        accentGradient.addColorStop(1, this.darkenColor(colors.secondary, 10));
        this.ctx.fillStyle = accentGradient;
        this.ctx.fillRect(size * 0.28, size * 0.45, size * 0.44, size * 0.08);

        // Gold/accent trim with shine
        const trimGradient = this.ctx.createLinearGradient(size * 0.32, size * 0.52, size * 0.68, size * 0.52);
        trimGradient.addColorStop(0, this.darkenColor(colors.accent, 10));
        trimGradient.addColorStop(0.5, colors.accent);
        trimGradient.addColorStop(1, this.darkenColor(colors.accent, 10));
        this.ctx.fillStyle = trimGradient;
        this.ctx.fillRect(size * 0.32, size * 0.52, size * 0.36, size * 0.03);
        this.ctx.fillRect(size * 0.32, size * 0.7, size * 0.36, size * 0.03);

        // Shoulders/armor with metallic shading
        const leftShoulderGradient = this.ctx.createRadialGradient(
            size * 0.25, size * 0.46, size * 0.02,
            size * 0.27, size * 0.48, size * 0.1
        );
        leftShoulderGradient.addColorStop(0, this.lightenColor(colors.secondary, 20));
        leftShoulderGradient.addColorStop(1, colors.secondary);
        this.ctx.fillStyle = leftShoulderGradient;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.27, size * 0.48, size * 0.1, 0, Math.PI * 2);
        this.ctx.fill();

        const rightShoulderGradient = this.ctx.createRadialGradient(
            size * 0.75, size * 0.46, size * 0.02,
            size * 0.73, size * 0.48, size * 0.1
        );
        rightShoulderGradient.addColorStop(0, this.lightenColor(colors.secondary, 20));
        rightShoulderGradient.addColorStop(1, colors.secondary);
        this.ctx.fillStyle = rightShoulderGradient;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.73, size * 0.48, size * 0.1, 0, Math.PI * 2);
        this.ctx.fill();

        // Arms
        this.ctx.fillStyle = colors.primary;
        this.ctx.fillRect(size * 0.15, size * 0.5, size * 0.1, size * 0.35);
        this.ctx.fillRect(size * 0.75, size * 0.5, size * 0.1, size * 0.35);

        // Hands
        this.ctx.fillStyle = skinTone;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.2, size * 0.87, size * 0.07, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(size * 0.8, size * 0.87, size * 0.07, 0, Math.PI * 2);
        this.ctx.fill();

        // Neck
        this.ctx.fillStyle = skinTone;
        this.ctx.fillRect(size * 0.42, size * 0.38, size * 0.16, size * 0.1);

        // HEAD with gradient shading
        const maleHeadGradient = this.ctx.createRadialGradient(
            size * 0.48, size * 0.22, size * 0.05,
            size * 0.5, size * 0.25, size * 0.2
        );
        maleHeadGradient.addColorStop(0, this.lightenColor(skinTone, 15));
        maleHeadGradient.addColorStop(1, skinTone);
        this.ctx.fillStyle = maleHeadGradient;
        this.ctx.beginPath();
        this.ctx.arc(size / 2, size * 0.25, size * 0.2, 0, Math.PI * 2);
        this.ctx.fill();

        // Jaw/chin definition
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.beginPath();
        this.ctx.arc(size * 0.5, size * 0.32, size * 0.12, 0, Math.PI);
        this.ctx.fill();

        // Face highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        this.ctx.beginPath();
        this.ctx.ellipse(size * 0.46, size * 0.22, size * 0.07, size * 0.05, -0.3, 0, Math.PI * 2);
        this.ctx.fill();

        // FACIAL FEATURES
        // Eyes - more angular and detailed for males
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(size * 0.37, size * 0.23, size * 0.09, size * 0.06);
        this.ctx.fillRect(size * 0.54, size * 0.23, size * 0.09, size * 0.06);

        // Irises with gradient
        const maleLeftEyeGradient = this.ctx.createRadialGradient(
            size * 0.415, size * 0.255, size * 0.01,
            size * 0.415, size * 0.26, size * 0.032
        );
        maleLeftEyeGradient.addColorStop(0, this.lightenColor(eyeColor, 25));
        maleLeftEyeGradient.addColorStop(1, eyeColor);
        this.ctx.fillStyle = maleLeftEyeGradient;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.415, size * 0.26, size * 0.032, 0, Math.PI * 2);
        this.ctx.fill();

        const maleRightEyeGradient = this.ctx.createRadialGradient(
            size * 0.585, size * 0.255, size * 0.01,
            size * 0.585, size * 0.26, size * 0.032
        );
        maleRightEyeGradient.addColorStop(0, this.lightenColor(eyeColor, 25));
        maleRightEyeGradient.addColorStop(1, eyeColor);
        this.ctx.fillStyle = maleRightEyeGradient;
        this.ctx.beginPath();
        this.ctx.arc(size * 0.585, size * 0.26, size * 0.032, 0, Math.PI * 2);
        this.ctx.fill();

        // Pupils
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(size * 0.415, size * 0.26, size * 0.016, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(size * 0.585, size * 0.26, size * 0.016, 0, Math.PI * 2);
        this.ctx.fill();

        // Eye highlights - sharp and prominent
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        this.ctx.beginPath();
        this.ctx.arc(size * 0.42, size * 0.253, size * 0.011, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(size * 0.59, size * 0.253, size * 0.011, 0, Math.PI * 2);
        this.ctx.fill();

        // Secondary highlights
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        this.ctx.beginPath();
        this.ctx.arc(size * 0.41, size * 0.265, size * 0.006, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(size * 0.58, size * 0.265, size * 0.006, 0, Math.PI * 2);
        this.ctx.fill();

        // Eyebrows - thicker for males
        this.ctx.strokeStyle = hairColor;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.36, size * 0.21);
        this.ctx.lineTo(size * 0.46, size * 0.22);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.54, size * 0.22);
        this.ctx.lineTo(size * 0.64, size * 0.21);
        this.ctx.stroke();

        // Nose
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.5, size * 0.28);
        this.ctx.lineTo(size * 0.52, size * 0.32);
        this.ctx.stroke();

        // Mouth - neutral expression
        this.ctx.strokeStyle = '#d1828b';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.44, size * 0.35);
        this.ctx.lineTo(size * 0.56, size * 0.35);
        this.ctx.stroke();

        // FRONT HAIR LAYER
        this.ctx.fillStyle = hairColor;

        if (hairStyle === 'spiky') {
            // Phainon - spiky blonde hair
            // Top spikes
            for (let i = 0; i < 5; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(size * (0.3 + i * 0.1), size * 0.15);
                this.ctx.lineTo(size * (0.35 + i * 0.1), size * 0.08);
                this.ctx.lineTo(size * (0.4 + i * 0.1), size * 0.15);
                this.ctx.fill();
            }
            // Hair cap
            this.ctx.beginPath();
            this.ctx.arc(size / 2, size * 0.15, size * 0.22, Math.PI, Math.PI * 2);
            this.ctx.fill();
            // Side hair
            this.ctx.fillRect(size * 0.28, size * 0.15, size * 0.08, size * 0.15);
            this.ctx.fillRect(size * 0.64, size * 0.15, size * 0.08, size * 0.15);
        } else if (hairStyle === 'messy') {
            // Mydei - messy dark hair with horns
            // Messy top
            this.ctx.beginPath();
            this.ctx.arc(size * 0.45, size * 0.12, size * 0.14, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(size * 0.55, size * 0.14, size * 0.16, 0, Math.PI * 2);
            this.ctx.fill();
            // Messy front
            this.ctx.fillRect(size * 0.32, size * 0.14, size * 0.36, size * 0.12);
            // Sideburns
            this.ctx.fillRect(size * 0.26, size * 0.2, size * 0.08, size * 0.12);
            this.ctx.fillRect(size * 0.66, size * 0.2, size * 0.08, size * 0.12);

            // HORNS (for Mydei)
            if (customization.hasHorns) {
                this.ctx.fillStyle = '#FFD700';
                this.ctx.strokeStyle = '#B8860B';
                this.ctx.lineWidth = 1;
                // Left horn
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.35, size * 0.12);
                this.ctx.lineTo(size * 0.32, size * 0.02);
                this.ctx.lineTo(size * 0.38, size * 0.1);
                this.ctx.fill();
                this.ctx.stroke();
                // Right horn
                this.ctx.beginPath();
                this.ctx.moveTo(size * 0.65, size * 0.12);
                this.ctx.lineTo(size * 0.68, size * 0.02);
                this.ctx.lineTo(size * 0.62, size * 0.1);
                this.ctx.fill();
                this.ctx.stroke();
            }
        } else if (hairStyle === 'long') {
            // Dan Heng - long silver hair
            // Top cap
            this.ctx.beginPath();
            this.ctx.arc(size / 2, size * 0.14, size * 0.26, Math.PI, Math.PI * 2);
            this.ctx.fill();
            // Side strands
            this.ctx.fillRect(size * 0.24, size * 0.14, size * 0.1, size * 0.25);
            this.ctx.fillRect(size * 0.66, size * 0.14, size * 0.1, size * 0.25);
            // Center parting
            this.ctx.fillRect(size * 0.34, size * 0.14, size * 0.32, size * 0.12);
        }

        // Hair shine/highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(size * 0.45, size * 0.16, size * 0.08, size * 0.05, -0.3, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
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
                // Dark brown tilled soil - very noticeable
                color = '#5D4E37';
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

        // Add texture and details
        if (type === 'tilled') {
            // Draw furrow lines for tilled soil
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.lineWidth = 2;
            for (let i = 0; i < 4; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(screenX + 2, screenY + i * (size / 4) + 4);
                this.ctx.lineTo(screenX + size - 2, screenY + i * (size / 4) + 4);
                this.ctx.stroke();
            }
        } else if (type === 'grass' || type === 'forest') {
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

        // Draw watered soil - darker and more obvious
        if (crop.watered) {
            this.ctx.fillStyle = '#3a2a1a';
            this.ctx.fillRect(screenX, screenY, size, size);
            // Add wetness shine
            this.ctx.fillStyle = 'rgba(100, 150, 255, 0.2)';
            this.ctx.fillRect(screenX, screenY, size, size * 0.5);
        }

        // Draw plant based on growth stage
        const growthPercent = crop.growthStage / crop.maxGrowthStage;

        if (growthPercent < 0.25) {
            // Tiny seedling - just sprouted
            this.ctx.fillStyle = '#9ccc65';
            this.ctx.fillRect(screenX + size * 0.45, screenY + size * 0.7, size * 0.1, size * 0.15);
            // Two tiny leaves
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.48, screenY + size * 0.7, size * 0.05, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.52, screenY + size * 0.7, size * 0.05, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (growthPercent < 0.5) {
            // Small plant - growing
            this.ctx.fillStyle = '#7cb342';
            // Stem
            this.ctx.fillRect(screenX + size * 0.46, screenY + size * 0.5, size * 0.08, size * 0.35);
            // Leaves
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.4, screenY + size * 0.55, size * 0.1, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.6, screenY + size * 0.55, size * 0.1, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (growthPercent < 0.75) {
            // Mature plant - almost ready
            this.ctx.fillStyle = '#689f38';
            // Thick stem
            this.ctx.fillRect(screenX + size * 0.44, screenY + size * 0.4, size * 0.12, size * 0.45);
            // Large leaves
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.35, screenY + size * 0.5, size * 0.12, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.65, screenY + size * 0.5, size * 0.12, 0, Math.PI * 2);
            this.ctx.fill();
            // Small fruit forming
            const fruitColor = crop.type === 'tomato' ? '#ff8a80' :
                              crop.type === 'corn' ? '#fff176' : '#f48fb1';
            this.ctx.fillStyle = fruitColor;
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.5, screenY + size * 0.45, size * 0.08, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (growthPercent >= 1) {
            // READY TO HARVEST - sparkle effect!
            this.ctx.fillStyle = '#558b2f';
            // Thick stem
            this.ctx.fillRect(screenX + size * 0.44, screenY + size * 0.35, size * 0.12, size * 0.5);
            // Large leaves
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.32, screenY + size * 0.5, size * 0.14, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.68, screenY + size * 0.5, size * 0.14, 0, Math.PI * 2);
            this.ctx.fill();

            // Large ripe fruit
            const ripeColor = crop.type === 'tomato' ? '#f44336' :
                             crop.type === 'corn' ? '#fdd835' : '#e91e63';
            this.ctx.fillStyle = ripeColor;
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.5, screenY + size * 0.4, size * 0.18, 0, Math.PI * 2);
            this.ctx.fill();

            // Highlight on fruit
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.beginPath();
            this.ctx.arc(screenX + size * 0.52, screenY + size * 0.38, size * 0.06, 0, Math.PI * 2);
            this.ctx.fill();

            // Sparkle effect
            const sparkleTime = Date.now() / 200;
            if (Math.sin(sparkleTime) > 0) {
                this.ctx.fillStyle = '#FFD700';
                this.ctx.fillRect(screenX + size * 0.3, screenY + size * 0.25, size * 0.08, size * 0.02);
                this.ctx.fillRect(screenX + size * 0.32, screenY + size * 0.23, size * 0.02, size * 0.08);
            }
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

    // Helper: Lighten a hex color by a percentage
    lightenColor(color, percent) {
        const num = parseInt(color.replace("#",""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    // Helper: Darken a hex color by a percentage
    darkenColor(color, percent) {
        const num = parseInt(color.replace("#",""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R > 0 ? R : 0) * 0x10000 +
            (G > 0 ? G : 0) * 0x100 +
            (B > 0 ? B : 0))
            .toString(16).slice(1);
    }
}
