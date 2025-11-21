// Main game class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.renderer = new Renderer(this.canvas);
        this.state = 'character-creation'; // 'character-creation', 'playing', 'paused'

        // Game systems
        this.world = null;
        this.player = null;
        this.dog = null;
        this.npcs = [];
        this.characterCreation = new CharacterCreation();
        this.dialogueSystem = new DialogueSystem();
        this.ui = null;
        this.input = null;
        this.wardrobe = null;
        this.decoration = null;

        // Game time
        this.time = {
            day: 1,
            season: 0, // 0: Spring, 1: Summer, 2: Fall, 3: Winter
            year: 1,
            hours: 6,
            minutes: 0,
            totalMinutes: 0
        };
        this.timeSpeed = 0.1; // Game minutes per frame

        // Initialize
        this.init();
    }

    init() {
        // Setup character creation
        this.characterCreation.onComplete = (customization) => {
            this.startGame(customization);
        };

        // Show character creation screen
        this.characterCreation.show();
    }

    startGame(customization) {
        // Hide character creation
        this.characterCreation.hide();

        // Create world
        this.world = new World();

        // Create player at farm starting position
        const startX = (this.world.farmArea.x + 2) * CONFIG.TILE_SIZE;
        const startY = (this.world.farmArea.y + 2) * CONFIG.TILE_SIZE;
        this.player = new Player(startX, startY, customization);

        // Create dog companion
        this.dog = new Dog(this.player);

        // Create NPCs
        CONFIG.NPCS.forEach(npcConfig => {
            const npc = new NPC(npcConfig);
            this.npcs.push(npc);
        });

        // Initialize UI
        this.ui = new UI(this);
        this.ui.show();
        this.ui.updateInventoryBar();

        // Initialize input
        this.input = new InputHandler(this);

        // Initialize wardrobe
        this.wardrobe = new Wardrobe(this.player);

        // Initialize decoration
        this.decoration = new Decoration(this.player, this.world);

        // Change state to playing
        this.state = 'playing';
    }

    update(deltaTime) {
        if (this.state !== 'playing') return;

        // Update game time
        this.updateTime(deltaTime);

        // Update world
        this.world.update(deltaTime);

        // Update player
        this.player.update(deltaTime, this.input, this.world);

        // Update dog
        this.dog.update(deltaTime);

        // Update NPCs
        this.npcs.forEach(npc => {
            npc.update(deltaTime, this.time, this.player);
        });

        // Update dialogue
        this.dialogueSystem.update();

        // Update UI
        this.ui.updateHUD();

        // Update camera to follow player
        this.updateCamera();
    }

    updateTime(deltaTime) {
        this.time.totalMinutes += this.timeSpeed;

        // Convert total minutes to hours and minutes
        const totalMins = Math.floor(this.time.totalMinutes);
        this.time.minutes = totalMins % 60;
        this.time.hours = Math.floor(totalMins / 60) % 24;

        // Advance day
        if (totalMins >= 1440) { // 24 hours
            this.time.totalMinutes = 0;
            this.time.day++;

            // Advance season
            if (this.time.day > 28) {
                this.time.day = 1;
                this.time.season = (this.time.season + 1) % 4;

                // Advance year
                if (this.time.season === 0) {
                    this.time.year++;
                }
            }

            // New day - restore energy
            this.player.restoreEnergy(CONFIG.MAX_ENERGY);
        }
    }

    updateCamera() {
        // Center camera on player
        const cameraX = this.player.x - this.canvas.width / 2 + this.player.width / 2;
        const cameraY = this.player.y - this.canvas.height / 2 + this.player.height / 2;

        // Clamp camera to world bounds
        const maxCameraX = this.world.width * CONFIG.TILE_SIZE - this.canvas.width;
        const maxCameraY = this.world.height * CONFIG.TILE_SIZE - this.canvas.height;

        this.renderer.setCamera(
            Utils.clamp(cameraX, 0, Math.max(0, maxCameraX)),
            Utils.clamp(cameraY, 0, Math.max(0, maxCameraY))
        );
    }

    draw() {
        this.renderer.clear();

        if (this.state !== 'playing') return;

        // Draw world
        this.world.draw(this.renderer);

        // Draw NPCs
        this.npcs.forEach(npc => {
            npc.draw(this.renderer);

            // Draw heart if helping
            if (npc.isHelping) {
                this.renderer.drawText('❤️', npc.x + npc.width / 2, npc.y - 10, 'red', 16, 'center');
            }
        });

        // Draw player
        this.player.draw(this.renderer);

        // Draw dog
        this.dog.draw(this.renderer);

        // Debug: draw player tile
        const playerTile = Utils.pixelToTile(this.player.x, this.player.y);
        this.renderer.drawText(
            `Tile: ${playerTile.x}, ${playerTile.y}`,
            10,
            this.canvas.height - 30,
            'white',
            14,
            'left'
        );
    }

    getNearbyNPC() {
        const interactionDistance = 80;
        for (const npc of this.npcs) {
            const distance = Utils.distance(
                this.player.x, this.player.y,
                npc.x, npc.y
            );
            if (distance < interactionDistance) {
                return npc;
            }
        }
        return null;
    }

    run() {
        let lastTime = 0;

        const gameLoop = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            this.update(deltaTime);
            this.draw();

            requestAnimationFrame(gameLoop);
        };

        requestAnimationFrame(gameLoop);
    }
}
