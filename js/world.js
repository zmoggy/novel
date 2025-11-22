// World class - manages the game world (forest, river, farm, houses)
class World {
    constructor() {
        this.width = 50; // tiles
        this.height = 50; // tiles
        this.tiles = [];
        this.farm = null;
        this.farmArea = { x: 10, y: 15, width: 15, height: 15 };
        this.riverPath = [];
        this.houses = [];
        this.trees = [];

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
        const riverX = 35;
        for (let y = 0; y < this.height; y++) {
            for (let x = riverX; x < riverX + 3; x++) {
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

        // Create paths
        this.createPath(farmX + farmW, farmY + Math.floor(farmH / 2), riverX, farmY + Math.floor(farmH / 2));

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

        // Draw farm area border
        const farmPixelX = this.farmArea.x * CONFIG.TILE_SIZE;
        const farmPixelY = this.farmArea.y * CONFIG.TILE_SIZE;
        const farmPixelW = this.farmArea.width * CONFIG.TILE_SIZE;
        const farmPixelH = this.farmArea.height * CONFIG.TILE_SIZE;

        renderer.ctx.save();
        renderer.ctx.strokeStyle = '#FFD700';
        renderer.ctx.lineWidth = 3;
        renderer.ctx.setLineDash([10, 5]);
        renderer.ctx.strokeRect(
            farmPixelX - renderer.camera.x,
            farmPixelY - renderer.camera.y,
            farmPixelW,
            farmPixelH
        );
        renderer.ctx.restore();

        // Draw "FARM AREA" label
        renderer.drawText(
            'FARM AREA',
            farmPixelX + farmPixelW / 2,
            farmPixelY - 5,
            '#FFD700',
            16,
            'center'
        );

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
