// World class - manages the game world (forest, river, farm, houses)
class World {
    constructor() {
        this.width = 20; // tiles - smaller, cozier world focused on characters
        this.height = 20; // tiles
        this.tiles = [];
        this.farm = null;
        this.farmArea = { x: 4, y: 6, width: 8, height: 8 }; // Cozy 8x8 farm
        this.riverPath = [];
        this.houses = [];
        this.trees = [];
        this.flowers = [];
        this.rocks = [];
        this.npcs = []; // NPCs reference for UI

        this.generateWorld();
    }

    generateWorld() {
        // Initialize all tiles as forest
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = { type: 'forest', walkable: true };
            }
        }

        // Create river (vertical river on the right side)
        const riverX = 15;
        for (let y = 0; y < this.height; y++) {
            for (let x = riverX; x < riverX + 2; x++) {
                if (x < this.width) {
                    this.tiles[y][x] = { type: 'water', walkable: false };
                    this.riverPath.push({ x, y });
                }
            }
        }

        // Create farm area
        const farmX = this.farmArea.x;
        const farmY = this.farmArea.y;
        const farmW = this.farmArea.width;
        const farmH = this.farmArea.height;

        // Clear farm area
        for (let y = farmY; y < farmY + farmH; y++) {
            for (let x = farmX; x < farmX + farmW; x++) {
                this.tiles[y][x] = { type: 'grass', walkable: true };
            }
        }

        // Initialize farm system for the farm area
        this.farm = new Farm(farmW, farmH);

        // Create paths and bridge
        const bridgeY = farmY + Math.floor(farmH / 2); // Middle of farm

        // Path from farm to river (2 tiles wide)
        this.createPath(farmX + farmW, bridgeY, riverX - 1, bridgeY);
        this.createPath(farmX + farmW, bridgeY + 1, riverX - 1, bridgeY + 1);

        // Bridge across river (2x2 tiles)
        this.tiles[bridgeY][riverX] = { type: 'bridge', walkable: true };
        this.tiles[bridgeY][riverX + 1] = { type: 'bridge', walkable: true };
        this.tiles[bridgeY + 1][riverX] = { type: 'bridge', walkable: true };
        this.tiles[bridgeY + 1][riverX + 1] = { type: 'bridge', walkable: true };

        // Path from bridge to far side (2 tiles wide)
        this.createPath(riverX + 2, bridgeY, this.width - 1, bridgeY);
        this.createPath(riverX + 2, bridgeY + 1, this.width - 1, bridgeY + 1);

        // Add player's house
        this.houses.push({
            x: farmX - 4,
            y: farmY + 2,
            width: 4 * CONFIG.TILE_SIZE,
            height: 4 * CONFIG.TILE_SIZE,
            owner: 'player',
            interior: {
                furniture: [],
                decorations: []
            }
        });

        // Add NPC houses
        CONFIG.NPCS.forEach((npc, index) => {
            const houseX = 25 + (index * 8);
            const houseY = 8;
            this.houses.push({
                x: houseX,
                y: houseY,
                width: 3 * CONFIG.TILE_SIZE,
                height: 3 * CONFIG.TILE_SIZE,
                owner: npc.id,
                npcName: npc.name
            });

            // Clear area around house
            for (let y = houseY - 1; y < houseY + 4; y++) {
                for (let x = houseX - 1; x < houseX + 4; x++) {
                    if (this.isValidTile(x, y)) {
                        this.tiles[y][x] = { type: 'grass', walkable: true };
                    }
                }
            }
        });

        // Add trees in forest areas
        for (let i = 0; i < 100; i++) {
            const x = Utils.randomInt(0, this.width - 1);
            const y = Utils.randomInt(0, this.height - 1);

            if (this.tiles[y][x].type === 'forest') {
                this.trees.push({ x, y });
                this.tiles[y][x].walkable = false;
            }
        }

        // Add flowers scattered in forest and grass areas
        for (let i = 0; i < 80; i++) {
            const x = Utils.randomInt(0, this.width - 1);
            const y = Utils.randomInt(0, this.height - 1);
            const tile = this.tiles[y][x];

            if ((tile.type === 'forest' || tile.type === 'grass') && tile.walkable) {
                const types = ['red', 'yellow', 'purple', 'white', 'pink'];
                this.flowers.push({
                    x,
                    y,
                    type: types[Utils.randomInt(0, types.length - 1)]
                });
            }
        }

        // Add decorative rocks
        for (let i = 0; i < 30; i++) {
            const x = Utils.randomInt(0, this.width - 1);
            const y = Utils.randomInt(0, this.height - 1);
            const tile = this.tiles[y][x];

            if (tile.type === 'forest' && tile.walkable) {
                this.rocks.push({ x, y });
            }
        }
    }

    createPath(startX, startY, endX, endY) {
        // Simple horizontal path
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startX, endX);

        for (let x = minX; x <= maxX; x++) {
            if (this.isValidTile(x, startY)) {
                this.tiles[startY][x] = { type: 'path', walkable: true };
            }
        }
    }

    isValidTile(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    getTile(x, y) {
        if (this.isValidTile(x, y)) {
            return this.tiles[y][x];
        }
        return null;
    }

    isWalkable(pixelX, pixelY) {
        const tile = Utils.pixelToTile(pixelX, pixelY);
        const worldTile = this.getTile(tile.x, tile.y);

        if (!worldTile || !worldTile.walkable) {
            return false;
        }

        // Check house collisions
        for (const house of this.houses) {
            const houseTileX = house.x;
            const houseTileY = house.y;
            const houseTileW = house.width / CONFIG.TILE_SIZE;
            const houseTileH = house.height / CONFIG.TILE_SIZE;

            if (tile.x >= houseTileX && tile.x < houseTileX + houseTileW &&
                tile.y >= houseTileY && tile.y < houseTileY + houseTileH) {
                return false;
            }
        }

        return true;
    }

    tillSoil(tileX, tileY) {
        // Convert to farm-local coordinates
        const farmTileX = tileX - this.farmArea.x;
        const farmTileY = tileY - this.farmArea.y;

        console.log(`World tillSoil: tile (${tileX}, ${tileY}), farmArea: (${this.farmArea.x}, ${this.farmArea.y}, ${this.farmArea.width}, ${this.farmArea.height})`);
        console.log(`Is in farm area: ${this.isInFarmArea(tileX, tileY)}`);

        if (this.isInFarmArea(tileX, tileY)) {
            console.log(`Calling farm.tillSoil with local coords (${farmTileX}, ${farmTileY})`);
            const result = this.farm.tillSoil(farmTileX, farmTileY);
            console.log(`Farm tillSoil result: ${result}`);
            return result;
        }
        return false;
    }

    plantCrop(tileX, tileY, cropType) {
        const farmTileX = tileX - this.farmArea.x;
        const farmTileY = tileY - this.farmArea.y;

        if (this.isInFarmArea(tileX, tileY)) {
            return this.farm.plantCrop(farmTileX, farmTileY, cropType);
        }
        return false;
    }

    waterCrop(tileX, tileY) {
        const farmTileX = tileX - this.farmArea.x;
        const farmTileY = tileY - this.farmArea.y;

        if (this.isInFarmArea(tileX, tileY)) {
            return this.farm.waterCrop(farmTileX, farmTileY);
        }
        return false;
    }

    harvestCrop(tileX, tileY) {
        const farmTileX = tileX - this.farmArea.x;
        const farmTileY = tileY - this.farmArea.y;

        if (this.isInFarmArea(tileX, tileY)) {
            return this.farm.harvestCrop(farmTileX, farmTileY);
        }
        return null;
    }

    isInFarmArea(tileX, tileY) {
        return tileX >= this.farmArea.x &&
               tileX < this.farmArea.x + this.farmArea.width &&
               tileY >= this.farmArea.y &&
               tileY < this.farmArea.y + this.farmArea.height;
    }

    update(deltaTime) {
        if (this.farm) {
            this.farm.update(deltaTime);
        }
    }

    draw(renderer) {
        // Draw world tiles (skip farm area - we'll draw that separately)
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // Skip tiles that are in the farm area
                if (this.isInFarmArea(x, y)) {
                    continue;
                }

                const tile = this.tiles[y][x];
                const pixelX = x * CONFIG.TILE_SIZE;
                const pixelY = y * CONFIG.TILE_SIZE;

                renderer.drawTile(pixelX, pixelY, tile.type);
            }
        }

        // Draw farm tiles directly at their world positions
        const farmOffsetX = this.farmArea.x;
        const farmOffsetY = this.farmArea.y;

        for (let y = 0; y < this.farm.height; y++) {
            for (let x = 0; x < this.farm.width; x++) {
                const tile = this.farm.getTile(x, y);
                if (!tile) continue;

                const worldPixelX = (farmOffsetX + x) * CONFIG.TILE_SIZE;
                const worldPixelY = (farmOffsetY + y) * CONFIG.TILE_SIZE;

                // Draw the farm tile (grass, tilled, etc.)
                renderer.drawTile(worldPixelX, worldPixelY, tile.type);

                // Draw crop if exists
                const key = `${x},${y}`;
                const crop = this.farm.crops.get(key);
                if (crop) {
                    renderer.drawCrop(worldPixelX, worldPixelY, crop);
                }
            }
        }

        // Draw flowers (underneath everything)
        this.flowers.forEach(flower => {
            renderer.drawFlower(flower.x * CONFIG.TILE_SIZE, flower.y * CONFIG.TILE_SIZE, flower.type);
        });

        // Draw rocks
        this.rocks.forEach(rock => {
            renderer.drawRock(rock.x * CONFIG.TILE_SIZE, rock.y * CONFIG.TILE_SIZE);
        });

        // Draw trees
        this.trees.forEach(tree => {
            renderer.drawTree(tree.x * CONFIG.TILE_SIZE, tree.y * CONFIG.TILE_SIZE);
        });

        // Draw houses
        this.houses.forEach(house => {
            const housePixelX = house.x * CONFIG.TILE_SIZE;
            const housePixelY = house.y * CONFIG.TILE_SIZE;
            renderer.drawHouse(housePixelX, housePixelY, house.width, house.height);

            // Draw house label
            if (house.owner === 'player') {
                renderer.drawText('Your House', housePixelX + house.width / 2, housePixelY - 10, 'white', 14, 'center');
            } else if (house.npcName) {
                renderer.drawText(`${house.npcName}'s House`, housePixelX + house.width / 2, housePixelY - 10, 'white', 12, 'center');
            }
        });
    }
}
