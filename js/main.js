// Main entry point
window.addEventListener('DOMContentLoaded', () => {
    console.log('🌾 Forest Farm - Loading...');

    // Create and start game
    const game = new Game();
    game.run();

    console.log('🌾 Forest Farm - Ready!');
    console.log('Controls:');
    console.log('  WASD or Arrow Keys - Move');
    console.log('  Space or E - Action (Use Tool / Talk to NPCs)');
    console.log('  1-5 - Select Tool');
    console.log('  Click Wardrobe/Decorate buttons to customize');
});
