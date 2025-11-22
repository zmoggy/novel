// Character Creation Screen
class CharacterCreation {
    constructor() {
        this.screen = document.getElementById('character-creation');
        this.canvas = document.getElementById('characterPreview');
        this.ctx = this.canvas.getContext('2d');

        this.customization = {
            name: '',
            skinTone: CONFIG.SKIN_TONES[0],
            hairStyle: CONFIG.HAIR_STYLES[0],
            hairColor: CONFIG.HAIR_COLORS[0],
            eyeColor: CONFIG.EYE_COLORS[0],
            outfit: CONFIG.OUTFITS[0]
        };

        this.renderer = new Renderer(this.canvas);
        this.setupUI();
    }

    setupUI() {
        console.log('Setting up character creation UI...');

        // Name input
        const nameInput = document.getElementById('playerName');
        nameInput.addEventListener('input', (e) => {
            this.customization.name = e.target.value;
        });

        // Skin tone options
        console.log('Creating skin tone options:', CONFIG.SKIN_TONES);
        this.createColorOptions('skinToneOptions', CONFIG.SKIN_TONES, (color) => {
            this.customization.skinTone = color;
            this.updatePreview();
        });

        // Hair style options
        this.createStyleOptions('hairStyleOptions', CONFIG.HAIR_STYLES, (style) => {
            this.customization.hairStyle = style;
            this.updatePreview();
        });

        // Hair color options
        this.createColorOptions('hairColorOptions', CONFIG.HAIR_COLORS, (color) => {
            this.customization.hairColor = color;
            this.updatePreview();
        });

        // Eye color options
        this.createColorOptions('eyeColorOptions', CONFIG.EYE_COLORS, (color) => {
            this.customization.eyeColor = color;
            this.updatePreview();
        });

        // Outfit options
        this.createOutfitOptions();

        // Start button
        document.getElementById('startGame').addEventListener('click', () => {
            if (this.customization.name.trim() === '') {
                alert('Please enter your name!');
                return;
            }
            this.onComplete(this.customization);
        });

        // Initial preview
        this.updatePreview();
    }

    createColorOptions(containerId, colors, onChange) {
        const container = document.getElementById(containerId);
        console.log(`Creating color options for ${containerId}:`, container, colors);

        if (!container) {
            console.error(`Container ${containerId} not found!`);
            return;
        }

        colors.forEach((color, index) => {
            const option = document.createElement('div');
            option.className = 'color-option';
            option.style.backgroundColor = color;
            if (index === 0) option.classList.add('selected');

            option.addEventListener('click', () => {
                container.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                onChange(color);
            });

            container.appendChild(option);
        });

        console.log(`Created ${colors.length} color options in ${containerId}`);
    }

    createStyleOptions(containerId, styles, onChange) {
        const container = document.getElementById(containerId);
        console.log(`Creating style options for ${containerId}:`, container, styles);

        if (!container) {
            console.error(`Container ${containerId} not found!`);
            return;
        }

        styles.forEach((style, index) => {
            const option = document.createElement('div');
            option.className = 'style-option';
            option.textContent = style;
            if (index === 0) option.classList.add('selected');

            option.addEventListener('click', () => {
                container.querySelectorAll('.style-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                onChange(style);
            });

            container.appendChild(option);
        });

        console.log(`Created ${styles.length} style options in ${containerId}`);
    }

    createOutfitOptions() {
        const container = document.getElementById('outfitOptions');
        const outfits = CONFIG.OUTFITS.filter(o => o.unlocked);
        console.log('Creating outfit options:', container, outfits);

        if (!container) {
            console.error('Container outfitOptions not found!');
            return;
        }

        outfits.forEach((outfit, index) => {
            const option = document.createElement('div');
            option.className = 'style-option';
            option.textContent = outfit.name;
            if (index === 0) option.classList.add('selected');

            option.addEventListener('click', () => {
                container.querySelectorAll('.style-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                this.customization.outfit = outfit;
                this.updatePreview();
            });

            container.appendChild(option);
        });

        console.log(`Created ${outfits.length} outfit options`);
    }

    updatePreview() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw character in center
        const centerX = this.canvas.width / 2 - CONFIG.TILE_SIZE / 2;
        const centerY = this.canvas.height / 2 - CONFIG.TILE_SIZE / 2;

        // Temporarily disable camera for preview
        const tempRenderer = new Renderer(this.canvas);
        tempRenderer.camera = { x: 0, y: 0 };
        tempRenderer.drawCharacter(centerX, centerY, this.customization);
    }

    show() {
        this.screen.classList.add('active');
    }

    hide() {
        this.screen.classList.remove('active');
    }

    onComplete(customization) {
        // Will be set by game
    }
}
