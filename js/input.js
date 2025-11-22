// Input handler
class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.mouse = { x: 0, y: 0, clicked: false };

        this.setupKeyboard();
        this.setupMouse();
    }

    setupKeyboard() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;

            // Handle action key (space or E)
            if (e.key === ' ' || e.key === 'e' || e.key === 'E') {
                e.preventDefault();
                this.handleAction();
            }

            // Handle number keys for tool selection
            if (e.key >= '1' && e.key <= '4') {
                const toolIndex = parseInt(e.key) - 1;
                const tools = ['hoe', 'seeds', 'wateringCan', 'hand'];
                if (tools[toolIndex]) {
                    this.game.player.selectTool(tools[toolIndex]);
                    this.game.ui.updateInventoryBar();
                    console.log(`Selected tool: ${tools[toolIndex]}`);
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    setupMouse() {
        const canvas = this.game.renderer.canvas;

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Convert screen coordinates to world coordinates
            const worldX = mouseX + this.game.renderer.camera.x;
            const worldY = mouseY + this.game.renderer.camera.y;

            // Convert to tile coordinates
            const tileX = Math.floor(worldX / CONFIG.TILE_SIZE);
            const tileY = Math.floor(worldY / CONFIG.TILE_SIZE);

            console.log(`Clicked at screen (${mouseX}, ${mouseY}), world (${worldX}, ${worldY}), tile (${tileX}, ${tileY})`);
            console.log(`Current tool: ${this.game.player.currentTool}`);

            // Use the current tool on the clicked tile
            this.handleFarmingClick(tileX, tileY);
        });
    }

    handleFarmingClick(tileX, tileY) {
        const player = this.game.player;

        // Check if player has energy
        if (player.energy <= 0) {
            console.log('Not enough energy!');
            return;
        }

        console.log(`Attempting to use ${player.currentTool} at tile (${tileX}, ${tileY})`);

        // Perform action based on current tool
        let result;
        switch(player.currentTool) {
            case 'hoe':
                result = player.tillSoil(this.game.world, tileX, tileY);
                break;
            case 'seeds':
                result = player.plantSeed(this.game.world, tileX, tileY);
                break;
            case 'wateringCan':
                result = player.waterCrop(this.game.world, tileX, tileY);
                break;
            case 'hand':
                result = player.harvestCrop(this.game.world, tileX, tileY);
                break;
            default:
                console.log('No valid tool selected');
                return;
        }

        if (result && result.message) {
            console.log(result.message);
        }
    }

    handleAction() {
        if (this.game.dialogueSystem.isOpen) {
            return;
        }

        // Check for NPC interaction
        const nearbyNPC = this.game.getNearbyNPC();
        if (nearbyNPC) {
            nearbyNPC.interact(this.game.player, this.game.dialogueSystem);
            return;
        }

        // Use current tool
        const result = this.game.player.useTool(this.game.world);
        if (result.message) {
            this.game.ui.showMessage(result.message);
        }
    }

    handleClick(e) {
        // Handle click interactions
        this.mouse.clicked = false;
    }

    reset() {
        this.keys = {};
        this.mouse.clicked = false;
    }
}
