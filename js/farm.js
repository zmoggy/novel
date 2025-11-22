// Farm management system
class Farm {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.crops = new Map();
        this.tiles = this.initializeTiles();
    }

    initializeTiles() {
        const tiles = [];
        for (let y = 0; y < this.height; y++) {
            tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                tiles[y][x] = {
                    type: 'grass',
                    tilled: false,
                    watered: false
                };
            }
        }
        return tiles;
    }

    getTile(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.tiles[y][x];
        }
        return null;
    }

    tillSoil(x, y) {
        const tile = this.getTile(x, y);
        console.log(`Farm tillSoil at (${x}, ${y}): tile =`, tile);
        if (tile && tile.type === 'grass' && !tile.tilled) {
            console.log(`Tilling successful! Changing tile to tilled.`);
            tile.tilled = true;
            tile.type = 'tilled';
            return true;
        }
        console.log(`Tilling failed. Tile type: ${tile?.type}, Already tilled: ${tile?.tilled}`);
        return false;
    }

    plantCrop(x, y, cropType) {
        const tile = this.getTile(x, y);
        const key = `${x},${y}`;

        if (tile && tile.tilled && !this.crops.has(key)) {
            const cropData = CONFIG.CROPS.find(c => c.id === cropType);
            if (cropData) {
                this.crops.set(key, {
                    type: cropType,
                    growthStage: 0,
                    maxGrowthStage: cropData.growthStages,
                    watered: false,
                    planted: true,
                    lastWateredTime: 0,
                    lastGrowthTime: Date.now(),
                    regrows: cropData.regrows
                });
                return true;
            }
        }
        return false;
    }

    waterCrop(x, y) {
        const key = `${x},${y}`;
        const crop = this.crops.get(key);

        if (crop && crop.planted) {
            crop.watered = true;
            crop.lastWateredTime = Date.now();
            return true;
        }
        return false;
    }

    harvestCrop(x, y) {
        const key = `${x},${y}`;
        const crop = this.crops.get(key);

        if (crop && crop.growthStage >= crop.maxGrowthStage) {
            const cropType = crop.type;

            if (crop.regrows) {
                // Regrowable crops go back to a growth stage
                crop.growthStage = crop.maxGrowthStage - 2;
                crop.lastGrowthTime = Date.now();
            } else {
                // Remove crop
                this.crops.delete(key);
                const tile = this.getTile(x, y);
                if (tile) {
                    tile.tilled = false;
                    tile.type = 'grass';
                }
            }

            return cropType;
        }
        return null;
    }

    update(deltaTime) {
        const currentTime = Date.now();

        // Update all crops
        this.crops.forEach((crop, key) => {
            if (!crop.planted) return;

            // Check if crop should grow
            const timeSinceGrowth = currentTime - crop.lastGrowthTime;
            const growthInterval = crop.watered ? CONFIG.CROP_GROWTH_TIME : CONFIG.CROP_GROWTH_TIME * 2;

            if (timeSinceGrowth > growthInterval && crop.growthStage < crop.maxGrowthStage) {
                crop.growthStage++;
                crop.lastGrowthTime = currentTime;
            }

            // Check if watered state should expire
            const timeSinceWatered = currentTime - crop.lastWateredTime;
            if (timeSinceWatered > CONFIG.WATER_DURATION) {
                crop.watered = false;
            }
        });
    }

    draw(renderer) {
        // Draw tiles
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tile = this.tiles[y][x];
                const pixelX = x * CONFIG.TILE_SIZE;
                const pixelY = y * CONFIG.TILE_SIZE;

                renderer.drawTile(pixelX, pixelY, tile.type);

                // Draw crop if exists
                const key = `${x},${y}`;
                const crop = this.crops.get(key);
                if (crop) {
                    renderer.drawCrop(pixelX, pixelY, crop);
                }
            }
        }
    }

    getCropAt(x, y) {
        const key = `${x},${y}`;
        return this.crops.get(key);
    }
}
