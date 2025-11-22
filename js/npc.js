// NPC (Romance characters) class
class NPC extends Character {
    constructor(config) {
        const startPos = config.schedule.morning;
        super(startPos.x * CONFIG.TILE_SIZE, startPos.y * CONFIG.TILE_SIZE);

        this.id = config.id;
        this.npcName = config.name;
        this.personality = config.personality;
        this.favoriteGifts = config.favoriteGifts;
        this.dialogue = config.dialogue;
        this.schedule = config.schedule;
        this.relationship = 0;
        this.currentDialogue = config.dialogue.greeting;
        this.helpCooldown = 0;
        this.targetX = this.x;
        this.targetY = this.y;
        this.walkSpeed = 1.5;
        this.isHelping = false;

        // Random appearance for each NPC
        this.customization = this.generateAppearance();
    }

    generateAppearance() {
        // Assign specific appearances based on NPC ID for distinct looks
        const appearances = {
            'alex': {
                skinTone: '#f4ccb0',
                hairStyle: 'long',
                hairColor: '#6c4830',
                eyeColor: '#8B4513',
                outfit: CONFIG.OUTFITS.find(o => o.id === 'tunic_cape')
            },
            'sam': {
                skinTone: '#fce5cd',
                hairStyle: 'long',
                hairColor: '#ddb38b',
                eyeColor: '#4169e1',
                outfit: CONFIG.OUTFITS.find(o => o.id === 'crop_skirt')
            },
            'riley': {
                skinTone: '#e8b692',
                hairStyle: 'ponytail',
                hairColor: '#b89778',
                eyeColor: '#228B22',
                outfit: CONFIG.OUTFITS.find(o => o.id === 'casual')
            }
        };

        return appearances[this.id] || {
            skinTone: Utils.randomChoice(CONFIG.SKIN_TONES),
            hairStyle: Utils.randomChoice(CONFIG.HAIR_STYLES),
            hairColor: Utils.randomChoice(CONFIG.HAIR_COLORS),
            eyeColor: Utils.randomChoice(CONFIG.EYE_COLORS),
            outfit: Utils.randomChoice(CONFIG.OUTFITS.filter(o => o.unlocked))
        };
    }

    update(deltaTime, gameTime, player) {
        // Update schedule position based on time
        const timeOfDay = this.getTimeOfDay(gameTime.hours);
        const schedulePos = this.schedule[timeOfDay];

        if (schedulePos) {
            this.targetX = schedulePos.x * CONFIG.TILE_SIZE;
            this.targetY = schedulePos.y * CONFIG.TILE_SIZE;
        }

        // Move towards target
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            this.x += (dx / distance) * this.walkSpeed;
            this.y += (dy / distance) * this.walkSpeed;
            this.moving = true;
        } else {
            this.moving = false;
        }

        // Check if near player
        const playerDistance = Utils.distance(this.x, this.y, player.x, player.y);

        // Randomly offer help if near player and not on cooldown
        if (playerDistance < 150 && this.helpCooldown <= 0 && Math.random() < 0.001) {
            this.offerHelp(player);
            this.helpCooldown = 300; // Cooldown frames
        }

        if (this.helpCooldown > 0) {
            this.helpCooldown--;
        }

        // Slowly move towards player when helping
        if (this.isHelping && playerDistance > 80) {
            const playerDx = player.x - this.x;
            const playerDy = player.y - this.y;
            const playerDist = Math.sqrt(playerDx * playerDx + playerDy * playerDy);
            this.x += (playerDx / playerDist) * this.walkSpeed * 0.5;
            this.y += (playerDy / playerDist) * this.walkSpeed * 0.5;
        }
    }

    getTimeOfDay(hours) {
        if (hours >= 6 && hours < 12) return 'morning';
        if (hours >= 12 && hours < 18) return 'afternoon';
        return 'evening';
    }

    interact(player, dialogueSystem) {
        // Increase relationship
        this.relationship += 5;

        // Choose dialogue based on relationship
        let message;
        if (this.relationship > 100) {
            message = this.dialogue.romance;
        } else if (this.relationship > 50) {
            message = this.dialogue.gift;
        } else {
            message = this.dialogue.greeting;
        }

        dialogueSystem.show(this.npcName, message, [
            { text: 'Thanks!', action: () => {} },
            { text: 'Want to help on the farm?', action: () => this.startHelping() }
        ]);
    }

    offerHelp(player) {
        this.isHelping = true;
        // NPCs can occasionally water crops or restore player energy
        if (Math.random() < 0.5) {
            player.restoreEnergy(10);
        }
    }

    startHelping() {
        this.isHelping = true;
        setTimeout(() => {
            this.isHelping = false;
        }, 10000); // Help for 10 seconds
    }

    giveGift(gift, player) {
        if (this.favoriteGifts.includes(gift)) {
            this.relationship += 20;
            return this.dialogue.gift;
        } else {
            this.relationship += 5;
            return "Oh, thank you!";
        }
    }
}
