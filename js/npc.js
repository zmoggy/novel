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

        // Determine relationship tier and get appropriate dialogue array
        let dialogueTier = 0;
        if (this.relationship >= 201) {
            dialogueTier = 201;
        } else if (this.relationship >= 161) {
            dialogueTier = 161;
        } else if (this.relationship >= 121) {
            dialogueTier = 121;
        } else if (this.relationship >= 81) {
            dialogueTier = 81;
        } else if (this.relationship >= 41) {
            dialogueTier = 41;
        } else {
            dialogueTier = 0;
        }

        // Get dialogue array for this tier
        const dialogueArray = this.dialogues[dialogueTier];

        // Pick a random dialogue from the tier
        const randomIndex = Math.floor(Math.random() * dialogueArray.length);
        const message = dialogueArray[randomIndex];

        // Create interaction options based on relationship level
        let options = [];

        if (this.relationship < 80) {
            options = [
                { text: 'Nice talking to you.', action: () => {} },
                { text: 'Want to help on the farm?', action: () => this.startHelping() }
            ];
        } else if (this.relationship < 160) {
            options = [
                { text: 'I enjoy our time together.', action: () => {} },
                { text: 'Want to help on the farm?', action: () => this.startHelping() },
                { text: 'You look great today!', action: () => this.relationship += 2 }
            ];
        } else {
            options = [
                { text: 'I love spending time with you.', action: () => {} },
                { text: 'Want to help on the farm?', action: () => this.startHelping() },
                { text: 'You mean everything to me.', action: () => this.relationship += 5 }
            ];
        }

        dialogueSystem.show(this.npcName, message, this, options);
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
