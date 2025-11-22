# 🌾 Forest Farm - A Farming Romance Game

Welcome to Forest Farm! A charming browser-based farming game where you can grow crops, romance NPCs, customize your character, and enjoy life on your farm in the forest by the river.

## ✨ Latest Updates (v2.0)
- **🖱️ CLICK TO FARM**: Now works like Stardew Valley! Select a tool (1-4), then CLICK on tiles to farm!
- **Player Spawns on Farm**: You start right on your farm field, ready to begin
- **Fixed Character Rendering**: Hair now faces forward properly - no more beard look!
- **Enhanced Farming Visuals**: Tilled soil has furrows, crops show 4 growth stages with sparkles when ready
- **Farm Area Border**: Golden dashed border shows exactly where you can farm
- **Debug Logging**: Console logs show exactly what's happening
- **Removed Scythe**: Simplified to 4 tools - use Hand to harvest
- **Better Crop Graphics**: See seedlings, growing plants, and ripe fruit with highlights

## 🎮 Game Features

### 🌱 Farming System - CLICK TO FARM! 🖱️
- **Plow** soil to prepare for planting (Press 1, then CLICK on ground)
- **Plant** seeds - tomatoes, corn, strawberries (Press 2, then CLICK on tilled soil)
- **Water** crops to help them grow faster (Press 3, then CLICK on planted crops)
- **Harvest** mature crops for profit (Press 4, then CLICK on ripe crops with sparkles)
- **See your character work**: Animated farming actions with tool visuals
- **Track growth**: Crops grow through 4 stages, faster when watered!
- **Works like Stardew Valley**: Select tool, click where you want to farm!

### 👤 Character Creation - Enhanced!
- **FFT-Style Sprites**: Detailed Final Fantasy Tactics-inspired character design
- Customize your farmer with multiple options:
  - Choose from 8 skin tones
  - Select from 6 hair styles (long, short, curly, pixie, bob, ponytail)
  - Pick from 8 hair colors
  - Choose from 7 eye colors
  - **10 outfit options** - all unlocked from the start!
- **Female Character**: Beautiful detailed female sprites with:
  - Expressive eyes with highlights
  - Eyelashes and blush
  - Dress-style outfits
  - Proper proportions and shading

### 💕 Romance Options - Easy to Find!
Meet and romance 3 unique NPCs:
- **Alex** - Friendly and energetic
- **Sam** - Artistic and thoughtful
- **Riley** - Adventurous and playful

**New Features:**
- NPCs have **name tags** floating above them
- **"Press E" prompt** appears when you're near an NPC
- **Golden highlight** shows who you can talk to
- NPCs have daily schedules and move around the map
- They have their own houses (labeled)
- Hearts appear when they're helping you!

### 🐕 Border Collie Companion
You have a loyal border collie with heterochromia (one brown eye, one blue eye) who follows you around the farm and occasionally plays when you're standing still.

### 👗 Wardrobe System
Change your outfits anytime with **10 different outfits**:
- Farmer Overalls
- Casual Dress
- Summer Sundress
- Spring Floral
- Elegant Gown
- Cozy Sweater
- Autumn Outfit
- Party Dress
- Sporty Wear
- Traditional

### 🏠 Home Decoration - Drag and Drop!
Decorate your house with furniture:
- **Click and drag** furniture to move it around
- Place beds, tables, chairs
- Add potted plants, paintings, and rugs
- Arrange your home exactly how you want it!

### 🌲 Beautiful World
- Farm in a forest clearing
- River nearby for gathering water
- NPC houses scattered around
- Trees and natural scenery

## 🎯 Controls

### Keyboard
- **WASD** or **Arrow Keys** - Move your character
- **1** - Select Hoe (till soil)
- **2** - Select Seeds (plant crops)
- **3** - Select Watering Can (water crops)
- **4** - Select Hand (harvest)
- **E** or **Space** - Talk to NPCs (when nearby)

### Mouse
- **LEFT CLICK** on ground tiles - Use your selected tool to farm!
- Works just like Stardew Valley - select tool, click where you want to use it

### UI Buttons
- **Wardrobe** - Change your outfit
- **Decorate** - Decorate your home

## 🚀 How to Play

1. **Create Your Character** - Customize your appearance and choose your name
2. **You Start on Your Farm!**
   - You'll spawn right on your farm field (inside the golden "FARM AREA" border)
   - See the green grass? That's where you can farm!
3. **Start Farming** (Just like Stardew Valley!):
   - Press **1** to select the hoe
   - **CLICK** on green grass to till it (you'll see dark brown furrows appear!)
   - Press **2** to select seeds
   - **CLICK** on tilled soil to plant (tiny seedling appears instantly!)
   - Press **3** to select the watering can
   - **CLICK** on planted crops to water them (soil gets darker with blue shine!)
   - **Wait** for crops to grow through 4 stages (faster when watered!):
     * Seedling → Small plant → Mature plant → **Ripe with sparkles!**
   - Press **4** to select hand
   - **CLICK** on ripe crops (the ones with sparkles!) to harvest and sell automatically!
4. **Meet the NPCs** - Walk up to NPCs (you'll see their names) and press **E** or **Space** to talk
5. **Manage Your Resources**:
   - Keep an eye on your **energy** (top right) - each action costs energy
   - Watch your **money** grow as you sell crops (auto-sells when harvested)
   - Time passes as you play - each new day your energy restores
6. **Customize** - Use the Wardrobe and Decorate buttons to personalize your experience

## 🐛 Troubleshooting

**If farming doesn't work:**
1. Make sure you're **CLICKING** on tiles (not pressing Space!)
2. Select a tool first (press 1, 2, 3, or 4) - you'll see it highlighted in the bottom inventory bar
3. Make sure you're clicking inside the golden "FARM AREA" border
4. Open browser console (F12) to see debug logs showing exactly what's happening
5. Check that you have energy (top right corner)

## 💡 Tips

- Water your crops daily to make them grow twice as fast!
- Talk to NPCs regularly to build relationships
- NPCs will sometimes offer to help you on the farm
- Each NPC has favorite gifts and unique dialogue
- Your dog will follow you around - it's just there for companionship!
- Energy restores each new day, so don't worry if you run out

## 🛠️ Technical Details

Built with:
- **HTML5 Canvas** for rendering
- **Vanilla JavaScript** for game logic
- **CSS3** for UI styling
- No external dependencies or frameworks!

## 📦 Game Structure

```
novel/
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Game styling
└── js/
    ├── config.js      # Game configuration
    ├── utils.js       # Utility functions
    ├── renderer.js    # Canvas rendering
    ├── character.js   # Base character class
    ├── characterCreation.js  # Character creation screen
    ├── player.js      # Player logic
    ├── npc.js         # NPC system
    ├── dog.js         # Dog companion
    ├── farm.js        # Farming mechanics
    ├── world.js       # World/map system
    ├── wardrobe.js    # Outfit system
    ├── decoration.js  # Home decoration
    ├── dialogue.js    # Dialogue system
    ├── ui.js          # UI management
    ├── input.js       # Input handling
    ├── game.js        # Main game loop
    └── main.js        # Entry point
```

## 🌐 Hosting on GitHub Pages

This game is designed to work perfectly with GitHub Pages!

1. Push to your repository
2. Go to Settings → Pages
3. Select your branch (e.g., `main` or `claude/farming-game-setup-...`)
4. Save and wait a few minutes
5. Your game will be live at `https://yourusername.github.io/novel/`

## 🎨 Future Enhancement Ideas

- More crops and seasonal crops
- More NPCs with deeper storylines
- Marriage system
- Festivals and events
- Fishing system
- Mining and crafting
- More furniture and customization options
- Save/load system (using localStorage)
- Sound effects and music
- Mobile touch controls

## 📝 License

This is a personal project. Feel free to modify and enhance it!

---

**Enjoy your farming adventure!** 🌾❤️🐕
