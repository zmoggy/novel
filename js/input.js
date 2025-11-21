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
            if (e.key >= '1' && e.key <= '5') {
                const toolIndex = parseInt(e.key) - 1;
                const tools = ['hoe', 'seeds', 'wateringCan', 'scythe', 'hand'];
                if (tools[toolIndex]) {
                    this.game.player.selectTool(tools[toolIndex]);
                    this.game.ui.updateInventoryBar();
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
            this.mouse.clicked = true;
            this.handleClick(e);
        });
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
