// NPC (Romance characters) class
class NPC extends Character {
    constructor(config) {
        const startPos = config.schedule.morning;
        super(startPos.x * CONFIG.TILE_SIZE, startPos.y * CONFIG.TILE_SIZE);

        this.id = config.id;
        this.npcName = config.name;
        this.personality = config.personality;
        this.portraitImage = config.portraitImage; // Character portrait image
        this.favoriteGifts = config.favoriteGifts;
        this.dialogues = config.dialogues; // Array of dialogue lines
        this.schedule = config.schedule;
        this.relationship = 0;
        this.dialogueIndex = 0; // Track which dialogue to show
        this.helpCooldown = 0;
        this.targetX = this.x;
        this.targetY = this.y;
        this.walkSpeed = 1.5;
        this.isHelping = false;
        this.appearance = config.appearance; // Specific appearance from config

        // Create customization from appearance config
        this.customization = this.generateAppearance();
    }

    generateAppearance() {
        return {
            skinTone: '#fce5cd', // Light skin tone for anime characters
            hairStyle: this.appearance.hairStyle,
            hairColor: this.appearance.hairColor,
            eyeColor: this.appearance.eyeColor,
            outfitColors: this.appearance.outfitColors,
            hasHorns: this.appearance.hasHorns || false,
            isMale: true // Flag for male character rendering
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

        // Choose dialogue based on relationship level (cycle through dialogues as relationship grows)
        const dialogueLevel = Math.min(Math.floor(this.relationship / 20), this.dialogues.length - 1);
        const message = this.dialogues[dialogueLevel];

        // Cycle to next dialogue for variety
        this.dialogueIndex = (this.dialogueIndex + 1) % this.dialogues.length;

        dialogueSystem.show(this.npcName, message, this, [
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
