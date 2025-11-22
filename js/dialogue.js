// Dialogue system for NPC interactions
class DialogueSystem {
    constructor() {
        this.box = document.getElementById('dialogue-box');
        this.portraitDiv = this.box.querySelector('.dialogue-portrait');
        this.nameDiv = this.box.querySelector('.dialogue-name');
        this.textDiv = this.box.querySelector('.dialogue-text');
        this.optionsDiv = this.box.querySelector('.dialogue-options');
        this.isOpen = false;
        this.currentNPC = null;
        this.portraitRenderer = null;
    }

    setRenderer(renderer) {
        this.portraitRenderer = renderer;
    }

    show(npcName, text, npc, options = []) {
        this.isOpen = true;
        this.box.classList.remove('hidden');
        this.currentNPC = npc;

        this.nameDiv.textContent = npcName;
        this.textDiv.textContent = text;

        // Draw NPC portrait
        this.drawPortrait(npc);

        // Clear and set options
        this.optionsDiv.innerHTML = '';

        if (options.length > 0) {
            options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'dialogue-option';
                optionDiv.textContent = option.text;
                optionDiv.addEventListener('click', () => {
                    if (option.action) {
                        option.action();
                    }
                    this.close();
                });
                this.optionsDiv.appendChild(optionDiv);
            });
        } else {
            // Default "Continue" option
            const continueDiv = document.createElement('div');
            continueDiv.className = 'dialogue-option';
            continueDiv.textContent = 'Continue';
            continueDiv.addEventListener('click', () => this.close());
            this.optionsDiv.appendChild(continueDiv);
        }
    }

    drawPortrait(npc) {
        // Clear previous portrait
        this.portraitDiv.innerHTML = '';

        // If NPC has a portrait image, use it
        if (npc.portraitImage) {
            const img = document.createElement('img');
            img.src = npc.portraitImage;
            img.alt = npc.name;
            img.className = 'character-portrait';
            img.onerror = () => {
                // Fallback to drawn sprite if image fails to load
                console.log(`Failed to load portrait for ${npc.name}, using sprite fallback`);
                this.drawSpritePortrait(npc);
            };
            this.portraitDiv.appendChild(img);
        } else {
            // Fallback to drawn sprite
            this.drawSpritePortrait(npc);
        }
    }

    drawSpritePortrait(npc) {
        // Clear previous portrait
        this.portraitDiv.innerHTML = '';

        // Create canvas for portrait
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');

        // Create a temporary renderer for the portrait
        const tempRenderer = {
            ctx: ctx,
            camera: { x: 0, y: 0 },
            canvas: canvas
        };

        // Use the character renderer methods
        if (this.portraitRenderer) {
            // Draw character centered in portrait
            const size = 128;
            ctx.save();
            ctx.translate(canvas.width / 2 - size / 2, 10);

            // Draw shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.beginPath();
            ctx.ellipse(size / 2, size * 0.95, size * 0.3, size * 0.1, 0, 0, Math.PI * 2);
            ctx.fill();

            // Render character sprite
            this.renderCharacterSprite(ctx, npc.customization, size);

            ctx.restore();
        }

        // Add canvas to portrait div
        this.portraitDiv.appendChild(canvas);
    }

    renderCharacterSprite(ctx, customization, size) {
        const hairColor = customization.hairColor;
        const hairStyle = customization.hairStyle;
        const eyeColor = customization.eyeColor;
        const skinTone = customization.skinTone || '#fce5cd';
        const colors = customization.outfitColors;

        // BACK HAIR LAYER
        ctx.fillStyle = hairColor;
        if (hairStyle === 'long') {
            ctx.beginPath();
            ctx.ellipse(size / 2, size * 0.55, size * 0.28, size * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // BODY
        ctx.fillStyle = colors.primary;
        ctx.fillRect(size * 0.3, size * 0.45, size * 0.4, size * 0.5);
        ctx.fillStyle = colors.secondary;
        ctx.fillRect(size * 0.28, size * 0.45, size * 0.44, size * 0.08);
        ctx.fillStyle = colors.accent;
        ctx.fillRect(size * 0.32, size * 0.52, size * 0.36, size * 0.03);

        // Shoulders
        ctx.fillStyle = colors.secondary;
        ctx.beginPath();
        ctx.arc(size * 0.27, size * 0.48, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(size * 0.73, size * 0.48, size * 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Neck
        ctx.fillStyle = skinTone;
        ctx.fillRect(size * 0.42, size * 0.38, size * 0.16, size * 0.1);

        // HEAD
        ctx.fillStyle = skinTone;
        ctx.beginPath();
        ctx.arc(size / 2, size * 0.25, size * 0.2, 0, Math.PI * 2);
        ctx.fill();

        // EYES
        ctx.fillStyle = 'white';
        ctx.fillRect(size * 0.38, size * 0.24, size * 0.08, size * 0.05);
        ctx.fillRect(size * 0.54, size * 0.24, size * 0.08, size * 0.05);

        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(size * 0.42, size * 0.265, size * 0.03, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(size * 0.58, size * 0.265, size * 0.03, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(size * 0.42, size * 0.265, size * 0.015, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(size * 0.58, size * 0.265, size * 0.015, 0, Math.PI * 2);
        ctx.fill();

        // Eyebrows
        ctx.strokeStyle = hairColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(size * 0.36, size * 0.21);
        ctx.lineTo(size * 0.46, size * 0.22);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(size * 0.54, size * 0.22);
        ctx.lineTo(size * 0.64, size * 0.21);
        ctx.stroke();

        // Mouth
        ctx.strokeStyle = '#d1828b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(size * 0.44, size * 0.35);
        ctx.lineTo(size * 0.56, size * 0.35);
        ctx.stroke();

        // FRONT HAIR
        ctx.fillStyle = hairColor;
        if (hairStyle === 'spiky') {
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(size * (0.3 + i * 0.1), size * 0.15);
                ctx.lineTo(size * (0.35 + i * 0.1), size * 0.08);
                ctx.lineTo(size * (0.4 + i * 0.1), size * 0.15);
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(size / 2, size * 0.15, size * 0.22, Math.PI, Math.PI * 2);
            ctx.fill();
        } else if (hairStyle === 'messy') {
            ctx.beginPath();
            ctx.arc(size * 0.45, size * 0.12, size * 0.14, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(size * 0.55, size * 0.14, size * 0.16, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(size * 0.32, size * 0.14, size * 0.36, size * 0.12);

            // HORNS
            if (customization.hasHorns) {
                ctx.fillStyle = '#FFD700';
                ctx.strokeStyle = '#B8860B';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(size * 0.35, size * 0.12);
                ctx.lineTo(size * 0.32, size * 0.02);
                ctx.lineTo(size * 0.38, size * 0.1);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(size * 0.65, size * 0.12);
                ctx.lineTo(size * 0.68, size * 0.02);
                ctx.lineTo(size * 0.62, size * 0.1);
                ctx.fill();
                ctx.stroke();
            }
        } else if (hairStyle === 'long') {
            ctx.beginPath();
            ctx.arc(size / 2, size * 0.14, size * 0.26, Math.PI, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(size * 0.24, size * 0.14, size * 0.1, size * 0.25);
            ctx.fillRect(size * 0.66, size * 0.14, size * 0.1, size * 0.25);
            ctx.fillRect(size * 0.34, size * 0.14, size * 0.32, size * 0.12);
        }

        // Hair shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(size * 0.45, size * 0.16, size * 0.08, size * 0.05, -0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    close() {
        this.isOpen = false;
        this.box.classList.add('hidden');
        this.currentNPC = null;
    }

    update() {
        // Can be used for typing animations in the future
    }
}
