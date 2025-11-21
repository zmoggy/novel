// Border Collie companion with heterochromia
class Dog {
    constructor(player) {
        this.player = player;
        this.x = player.x - CONFIG.TILE_SIZE;
        this.y = player.y;
        this.width = CONFIG.TILE_SIZE * 0.8;
        this.height = CONFIG.TILE_SIZE * 0.8;
        this.targetX = this.x;
        this.targetY = this.y;
        this.speed = CONFIG.PLAYER_SPEED * 1.2;
        this.followDistance = 50;
        this.isFollowing = true;
        this.idleTime = 0;
        this.playfulTime = 0;
    }

    update(deltaTime) {
        // Follow player
        const dx = this.player.x - this.x;
        const dy = this.player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only follow if player is far enough
        if (distance > this.followDistance) {
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
            this.isFollowing = true;
            this.idleTime = 0;
        } else {
            this.isFollowing = false;
            this.idleTime++;

            // Randomly play around when idle
            if (this.idleTime > 120 && Math.random() < 0.02) {
                this.playfulTime = 60;
                this.targetX = this.x + (Math.random() - 0.5) * 100;
                this.targetY = this.y + (Math.random() - 0.5) * 100;
            }
        }

        // Playful movement
        if (this.playfulTime > 0) {
            const pdx = this.targetX - this.x;
            const pdy = this.targetY - this.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

            if (pdist > 5) {
                this.x += (pdx / pdist) * this.speed * 0.5;
                this.y += (pdy / pdist) * this.speed * 0.5;
            }

            this.playfulTime--;
        }
    }

    draw(renderer) {
        renderer.drawDog(this.x, this.y);

        // Draw name tag occasionally
        if (this.idleTime % 120 < 60 && !this.isFollowing) {
            renderer.drawText('❤️', this.x + this.width / 2, this.y - 10, 'red', 16, 'center');
        }
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
