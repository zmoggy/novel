// Dialogue system for NPC interactions
class DialogueSystem {
    constructor() {
        this.box = document.getElementById('dialogue-box');
        this.portraitDiv = this.box.querySelector('.dialogue-portrait');
        this.nameDiv = this.box.querySelector('.dialogue-name');
        this.textDiv = this.box.querySelector('.dialogue-text');
        this.optionsDiv = this.box.querySelector('.dialogue-options');
        this.isOpen = false;
        this.currentNPC = null;
    }

    show(npcName, text, options = []) {
        this.isOpen = true;
        this.box.classList.remove('hidden');

        this.nameDiv.textContent = npcName;
        this.textDiv.textContent = text;

        // Clear and set options
        this.optionsDiv.innerHTML = '';

        if (options.length > 0) {
            options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'dialogue-option';
                optionDiv.textContent = option.text;
                optionDiv.addEventListener('click', () => {
                    if (option.action) {
                        option.action();
                    }
                    this.close();
                });
                this.optionsDiv.appendChild(optionDiv);
            });
        } else {
            // Default "Continue" option
            const continueDiv = document.createElement('div');
            continueDiv.className = 'dialogue-option';
            continueDiv.textContent = 'Continue';
            continueDiv.addEventListener('click', () => this.close());
            this.optionsDiv.appendChild(continueDiv);
        }
    }

    close() {
        this.isOpen = false;
        this.box.classList.add('hidden');
        this.currentNPC = null;
    }

    update() {
        // Can be used for typing animations in the future
    }
}
