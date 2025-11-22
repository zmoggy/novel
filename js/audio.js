// Audio management system
class AudioManager {
    constructor() {
        this.bgMusic = null;
        this.currentTrack = null;
        this.sounds = {};
        this.musicVolume = 0.3; // Default 30%
        this.sfxVolume = 0.5; // Default 50%
        this.isMusicMuted = false;
        this.isSfxMuted = false;

        // Load settings from localStorage
        this.loadSettings();

        // Background music tracks
        this.musicTracks = {
            main: 'audio/music/main_theme.mp3',
            farming: 'audio/music/farming.mp3',
            dialogue: 'audio/music/dialogue.mp3',
            evening: 'audio/music/evening.mp3'
        };

        // Sound effects
        this.soundEffects = {
            water: 'audio/sfx/water.mp3',
            plant: 'audio/sfx/plant.mp3',
            harvest: 'audio/sfx/harvest.mp3',
            talk: 'audio/sfx/talk.mp3',
            gift: 'audio/sfx/gift.mp3',
            heart: 'audio/sfx/heart.mp3'
        };

        this.initAudio();
    }

    initAudio() {
        // Create background music audio element
        this.bgMusic = new Audio();
        this.bgMusic.loop = true;
        this.bgMusic.volume = this.isMusicMuted ? 0 : this.musicVolume;

        // Preload sound effects
        for (let [name, path] of Object.entries(this.soundEffects)) {
            const audio = new Audio();
            audio.src = path;
            audio.volume = this.isSfxMuted ? 0 : this.sfxVolume;
            audio.preload = 'auto';
            this.sounds[name] = audio;
        }
    }

    // Play background music
    playMusic(trackName = 'main') {
        if (this.currentTrack === trackName && !this.bgMusic.paused) {
            return; // Already playing this track
        }

        const trackPath = this.musicTracks[trackName];
        if (!trackPath) {
            console.warn(`Music track "${trackName}" not found`);
            return;
        }

        // Fade out current music if playing
        if (!this.bgMusic.paused) {
            this.fadeOut(this.bgMusic, () => {
                this.bgMusic.src = trackPath;
                this.bgMusic.volume = this.isMusicMuted ? 0 : this.musicVolume;
                this.bgMusic.play().catch(e => console.log('Audio play prevented:', e));
                this.currentTrack = trackName;
            });
        } else {
            this.bgMusic.src = trackPath;
            this.bgMusic.volume = this.isMusicMuted ? 0 : this.musicVolume;
            this.bgMusic.play().catch(e => console.log('Audio play prevented:', e));
            this.currentTrack = trackName;
        }
    }

    // Play sound effect
    playSound(soundName) {
        const sound = this.sounds[soundName];
        if (!sound) {
            console.warn(`Sound effect "${soundName}" not found`);
            return;
        }

        // Clone the audio to allow overlapping sounds
        const soundClone = sound.cloneNode();
        soundClone.volume = this.isSfxMuted ? 0 : this.sfxVolume;
        soundClone.play().catch(e => console.log('Sound play prevented:', e));
    }

    // Stop background music
    stopMusic() {
        this.fadeOut(this.bgMusic, () => {
            this.bgMusic.pause();
            this.currentTrack = null;
        });
    }

    // Set music volume (0-1)
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        this.bgMusic.volume = this.isMusicMuted ? 0 : this.musicVolume;
        this.saveSettings();
    }

    // Set sound effects volume (0-1)
    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        for (let sound of Object.values(this.sounds)) {
            sound.volume = this.isSfxMuted ? 0 : this.sfxVolume;
        }
        this.saveSettings();
    }

    // Toggle music mute
    toggleMusicMute() {
        this.isMusicMuted = !this.isMusicMuted;
        this.bgMusic.volume = this.isMusicMuted ? 0 : this.musicVolume;
        this.saveSettings();
        return this.isMusicMuted;
    }

    // Toggle sound effects mute
    toggleSfxMute() {
        this.isSfxMuted = !this.isSfxMuted;
        for (let sound of Object.values(this.sounds)) {
            sound.volume = this.isSfxMuted ? 0 : this.sfxVolume;
        }
        this.saveSettings();
        return this.isSfxMuted;
    }

    // Fade out audio
    fadeOut(audio, callback, duration = 500) {
        const startVolume = audio.volume;
        const fadeStep = startVolume / (duration / 50);

        const fadeInterval = setInterval(() => {
            if (audio.volume > fadeStep) {
                audio.volume -= fadeStep;
            } else {
                audio.volume = 0;
                clearInterval(fadeInterval);
                if (callback) callback();
            }
        }, 50);
    }

    // Save settings to localStorage
    saveSettings() {
        localStorage.setItem('audio_settings', JSON.stringify({
            musicVolume: this.musicVolume,
            sfxVolume: this.sfxVolume,
            isMusicMuted: this.isMusicMuted,
            isSfxMuted: this.isSfxMuted
        }));
    }

    // Load settings from localStorage
    loadSettings() {
        const saved = localStorage.getItem('audio_settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                this.musicVolume = settings.musicVolume ?? 0.3;
                this.sfxVolume = settings.sfxVolume ?? 0.5;
                this.isMusicMuted = settings.isMusicMuted ?? false;
                this.isSfxMuted = settings.isSfxMuted ?? false;
            } catch (e) {
                console.warn('Could not load audio settings');
            }
        }
    }

    // Enable audio (needed for browser autoplay policies)
    enableAudio() {
        // Play main theme when user first interacts
        if (this.bgMusic.paused && this.currentTrack === null) {
            this.playMusic('main');
        }
    }
}
