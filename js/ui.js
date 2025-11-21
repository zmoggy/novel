// UI management system
class UI {
    constructor(game) {
        this.game = game;
        this.screen = document.getElementById('game-ui');
        this.setupInventoryBar();
        this.setupHUD();
    }

    setupInventoryBar() {
        const slots = document.querySelectorAll('.inventory-slot');
        slots.forEach(slot => {
            slot.addEventListener('click', () => {
                const tool = slot.dataset.tool;
                this.game.player.selectTool(tool);
                this.updateInventoryBar();
            });
        });
    }

    setupHUD() {
        // HUD updates will be called from game loop
    }

    updateInventoryBar() {
        const slots = document.querySelectorAll('.inventory-slot');
        slots.forEach(slot => {
            if (slot.dataset.tool === this.game.player.currentTool) {
                slot.classList.add('active');
            } else {
                slot.classList.remove('active');
            }
        });
    }

    updateHUD() {
        const player = this.game.player;
        const time = this.game.time;

        // Update player info
        document.getElementById('playerNameDisplay').textContent = player.name;
        document.getElementById('moneyDisplay').textContent = player.money;
        document.getElementById('energyDisplay').textContent = Math.floor(player.energy);

        // Update date/time
        document.getElementById('dateDisplay').textContent = Utils.formatDate(time.day, time.season, time.year);
        document.getElementById('timeDisplay').textContent = Utils.formatTime(time.hours, time.minutes);
    }

    show() {
        this.screen.classList.add('active');
    }

    hide() {
        this.screen.classList.remove('active');
    }

    showMessage(message, duration = 2000) {
        // Simple message system - could be enhanced
        console.log(message);
    }
}
