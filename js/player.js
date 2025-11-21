// Player class
class Player extends Character {
    constructor(x, y, customization) {
        super(x, y, customization);
        this.name = customization.name || 'Farmer';
        this.money = CONFIG.STARTING_MONEY;
        this.energy = CONFIG.MAX_ENERGY;
        this.inventory = {
            seeds: {
                tomato: 10,
                corn: 5,
                strawberry: 3
            },
            crops: {},
            items: {}
        };
        this.currentTool = 'hoe';
        this.speed = CONFIG.PLAYER_SPEED;
        this.moveDirection = { x: 0, y: 0 };
        this.wardrobe = {
            outfits: [...CONFIG.OUTFITS.filter(o => o.unlocked)],
            accessories: []
        };
        this.homeDecor = {
            furniture: [],
            decorations: []
        };
    }

    update(deltaTime, input, world) {
        // Handle movement
        this.moveDirection = { x: 0, y: 0 };

        if (input.keys['ArrowUp'] || input.keys['w']) {
            this.moveDirection.y = -1;
            this.direction = 'up';
        }
        if (input.keys['ArrowDown'] || input.keys['s']) {
            this.moveDirection.y = 1;
            this.direction = 'down';
        }
        if (input.keys['ArrowLeft'] || input.keys['a']) {
            this.moveDirection.x = -1;
            this.direction = 'left';
        }
        if (input.keys['ArrowRight'] || input.keys['d']) {
            this.moveDirection.x = 1;
            this.direction = 'right';
        }

        // Normalize diagonal movement
        if (this.moveDirection.x !== 0 && this.moveDirection.y !== 0) {
            this.moveDirection.x *= 0.707;
            this.moveDirection.y *= 0.707;
        }

        // Move player
        const newX = this.x + this.moveDirection.x * this.speed;
        const newY = this.y + this.moveDirection.y * this.speed;

        // Check collision with world bounds
        if (world.isWalkable(newX, this.y)) {
            this.x = newX;
        }
        if (world.isWalkable(this.x, newY)) {
            this.y = newY;
        }

        this.moving = this.moveDirection.x !== 0 || this.moveDirection.y !== 0;
    }

    selectTool(tool) {
        this.currentTool = tool;
    }

    useTool(world) {
        if (this.energy <= 0) {
            return { success: false, message: 'Not enough energy!' };
        }

        const tile = Utils.pixelToTile(this.x + this.width / 2, this.y + this.height / 2);

        switch(this.currentTool) {
            case 'hoe':
                return this.tillSoil(world, tile.x, tile.y);
            case 'seeds':
                return this.plantSeed(world, tile.x, tile.y);
            case 'wateringCan':
                return this.waterCrop(world, tile.x, tile.y);
            case 'scythe':
                return this.harvestCrop(world, tile.x, tile.y);
            default:
                return { success: false };
        }
    }

    tillSoil(world, tileX, tileY) {
        const result = world.tillSoil(tileX, tileY);
        if (result) {
            this.energy -= 2;
            return { success: true, message: 'Soil tilled!' };
        }
        return { success: false, message: 'Cannot till here!' };
    }

    plantSeed(world, tileX, tileY) {
        // For now, plant tomato seeds
        const seedType = 'tomato';
        if (!this.inventory.seeds[seedType] || this.inventory.seeds[seedType] <= 0) {
            return { success: false, message: 'No seeds!' };
        }

        const result = world.plantCrop(tileX, tileY, seedType);
        if (result) {
            this.inventory.seeds[seedType]--;
            this.energy -= 2;
            return { success: true, message: 'Seed planted!' };
        }
        return { success: false, message: 'Cannot plant here!' };
    }

    waterCrop(world, tileX, tileY) {
        const result = world.waterCrop(tileX, tileY);
        if (result) {
            this.energy -= 1;
            return { success: true, message: 'Crop watered!' };
        }
        return { success: false, message: 'Nothing to water!' };
    }

    harvestCrop(world, tileX, tileY) {
        const crop = world.harvestCrop(tileX, tileY);
        if (crop) {
            this.energy -= 2;
            this.addCropToInventory(crop);

            // Sell automatically for now
            const cropData = CONFIG.CROPS.find(c => c.id === crop);
            if (cropData) {
                this.money += cropData.sellPrice;
                return { success: true, message: `Harvested! +$${cropData.sellPrice}` };
            }
            return { success: true, message: 'Harvested!' };
        }
        return { success: false, message: 'Nothing to harvest!' };
    }

    addCropToInventory(cropType) {
        if (!this.inventory.crops[cropType]) {
            this.inventory.crops[cropType] = 0;
        }
        this.inventory.crops[cropType]++;
    }

    changeOutfit(outfit) {
        this.customization.outfit = outfit;
    }

    restoreEnergy(amount) {
        this.energy = Math.min(CONFIG.MAX_ENERGY, this.energy + amount);
    }

    draw(renderer) {
        renderer.drawCharacter(this.x, this.y, this.customization);
    }
}
