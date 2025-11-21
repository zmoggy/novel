// Wardrobe system for changing outfits
class Wardrobe {
    constructor(player) {
        this.player = player;
        this.screen = document.getElementById('wardrobe-screen');
        this.canvas = document.getElementById('wardrobePreview');
        this.ctx = this.canvas.getContext('2d');
        this.isOpen = false;

        this.setupUI();
    }

    setupUI() {
        // Wardrobe button
        document.getElementById('wardrobeBtn').addEventListener('click', () => {
            this.toggle();
        });

        // Close button
        this.screen.querySelector('.close-btn').addEventListener('click', () => {
            this.close();
        });

        // Populate outfit grid
        this.updateOutfitGrid();
    }

    updateOutfitGrid() {
        const grid = document.getElementById('outfitGrid');
        grid.innerHTML = '';

        CONFIG.OUTFITS.forEach(outfit => {
            const card = document.createElement('div');
            card.className = 'item-card';
            if (!outfit.unlocked) card.classList.add('locked');
            if (this.player.customization.outfit.id === outfit.id) card.classList.add('selected');

            card.style.backgroundColor = outfit.color;
            card.textContent = outfit.unlocked ? '👕' : '🔒';

            if (outfit.unlocked) {
                card.addEventListener('click', () => {
                    this.player.changeOutfit(outfit);
                    this.updateOutfitGrid();
                    this.updatePreview();
                });
            }

            grid.appendChild(card);
        });
    }

    updatePreview() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw player character
        const renderer = new Renderer(this.canvas);
        renderer.camera = { x: 0, y: 0 };
        const centerX = this.canvas.width / 2 - CONFIG.TILE_SIZE / 2;
        const centerY = this.canvas.height / 2 - CONFIG.TILE_SIZE / 2;
        renderer.drawCharacter(centerX, centerY, this.player.customization);
    }

    open() {
        this.isOpen = true;
        this.screen.classList.add('active');
        this.updatePreview();
    }

    close() {
        this.isOpen = false;
        this.screen.classList.remove('active');
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}
