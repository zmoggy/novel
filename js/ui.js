// UI management system
class UI {
    constructor(game) {
        this.game = game;
        this.screen = document.getElementById('game-ui');
        this.setupInventoryBar();
        this.setupHUD();
        this.setupRelationshipPanel();
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

    setupRelationshipPanel() {
        this.relationshipList = document.getElementById('relationship-list');
        console.log('Relationship list element:', this.relationshipList);
        if (!this.relationshipList) {
            console.error('ERROR: relationship-list element not found in DOM!');
        }
        this.updateRelationshipPanel();
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

        // Update relationship panel
        this.updateRelationshipPanel();
    }

    updateRelationshipPanel() {
        console.log('updateRelationshipPanel called');
        console.log('game.world:', this.game.world);
        console.log('game.world.npcs:', this.game.world?.npcs);

        if (!this.game.world || !this.game.world.npcs) {
            console.log('No world or NPCs found, returning early');
            return;
        }

        console.log('NPCs found:', this.game.world.npcs.length);
        this.relationshipList.innerHTML = '';

        this.game.world.npcs.forEach(npc => {
            console.log('Creating relationship item for:', npc.npcName, 'relationship:', npc.relationship);
            const item = document.createElement('div');
            item.className = 'relationship-item';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'relationship-name';
            nameSpan.textContent = npc.npcName;

            const heartsDiv = document.createElement('div');
            heartsDiv.className = 'relationship-hearts';

            // Calculate heart level (each heart = 40 relationship points)
            const maxHearts = 10;
            const filledHearts = Math.min(Math.floor(npc.relationship / 40), maxHearts);
            const emptyHearts = maxHearts - filledHearts;

            // Add filled hearts
            for (let i = 0; i < filledHearts; i++) {
                const heart = document.createElement('span');
                heart.className = 'heart filled';
                heart.textContent = '❤️';
                heartsDiv.appendChild(heart);
            }

            // Add empty hearts
            for (let i = 0; i < emptyHearts; i++) {
                const heart = document.createElement('span');
                heart.className = 'heart empty';
                heart.textContent = '♡';
                heartsDiv.appendChild(heart);
            }

            item.appendChild(nameSpan);
            item.appendChild(heartsDiv);
            this.relationshipList.appendChild(item);
        });
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
