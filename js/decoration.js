// Home decoration system
class Decoration {
    constructor(player, world) {
        this.player = player;
        this.world = world;
        this.screen = document.getElementById('decor-screen');
        this.canvas = document.getElementById('roomPreview');
        this.ctx = this.canvas.getContext('2d');
        this.isOpen = false;
        this.placedFurniture = [];

        this.setupUI();
    }

    setupUI() {
        // Decor button
        document.getElementById('decorBtn').addEventListener('click', () => {
            this.toggle();
        });

        // Close button
        this.screen.querySelector('.close-btn').addEventListener('click', () => {
            this.close();
        });

        // Populate furniture grid
        this.updateFurnitureGrid();
    }

    updateFurnitureGrid() {
        const grid = document.getElementById('furnitureGrid');
        grid.innerHTML = '';

        CONFIG.FURNITURE.forEach(furniture => {
            const card = document.createElement('div');
            card.className = 'item-card';
            if (!furniture.unlocked) card.classList.add('locked');

            // Show furniture icon
            const icons = {
                bed: '🛏️',
                table: '🪑',
                chair: '💺',
                plant: '🪴',
                painting: '🖼️',
                rug: '📜'
            };

            card.textContent = furniture.unlocked ? icons[furniture.id] || '📦' : '🔒';
            card.title = `${furniture.name} - $${furniture.cost}`;

            if (furniture.unlocked) {
                card.addEventListener('click', () => {
                    this.placeFurniture(furniture);
                });
            }

            grid.appendChild(card);
        });
    }

    placeFurniture(furniture) {
        // Simple placement - add to center of room
        const x = 200 + Math.random() * 100;
        const y = 150 + Math.random() * 100;

        this.placedFurniture.push({
            type: furniture.id,
            x: x,
            y: y,
            width: 50,
            height: 50
        });

        this.updatePreview();
    }

    updatePreview() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw room
        this.ctx.fillStyle = '#f5deb3';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw walls
        this.ctx.strokeStyle = '#8b7355';
        this.ctx.lineWidth = 10;
        this.ctx.strokeRect(5, 5, this.canvas.width - 10, this.canvas.height - 10);

        // Draw floor pattern
        this.ctx.strokeStyle = '#d2b48c';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Draw placed furniture
        this.placedFurniture.forEach(item => {
            const icons = {
                bed: '🛏️',
                table: '🪑',
                chair: '💺',
                plant: '🪴',
                painting: '🖼️',
                rug: '📜'
            };

            this.ctx.font = '40px Arial';
            this.ctx.fillText(icons[item.type] || '📦', item.x, item.y);
        });
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
