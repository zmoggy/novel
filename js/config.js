// Game Configuration
const CONFIG = {
    // Canvas settings
    CANVAS_WIDTH: 1280,
    CANVAS_HEIGHT: 720,
    TILE_SIZE: 32,

    // Game settings
    FPS: 60,
    GAME_SPEED: 1,

    // Player settings
    PLAYER_SPEED: 3,
    MAX_ENERGY: 100,
    STARTING_MONEY: 500,

    // Farming settings
    CROP_GROWTH_TIME: 3000, // milliseconds per growth stage
    WATER_DURATION: 5000, // how long watered state lasts

    // Character customization options
    SKIN_TONES: [
        '#fce5cd', '#f4ccb0', '#e8b692', '#d9a066',
        '#c48b5c', '#a67b5b', '#8b6348', '#6b4c2e'
    ],

    HAIR_STYLES: [
        'short', 'long', 'curly', 'pixie', 'bob', 'ponytail'
    ],

    HAIR_COLORS: [
        '#2c1b18', '#6c4830', '#b89778', '#ddb38b',
        '#ffd700', '#ff6347', '#9370db', '#4169e1'
    ],

    EYE_COLORS: [
        '#8B4513', '#4169e1', '#228B22', '#808080',
        '#9370db', '#00CED1', '#2F4F4F'
    ],

    // Outfits with distinct visual designs
    OUTFITS: [
        {
            id: 'farmer',
            name: 'Farmer Overalls',
            type: 'overalls',
            topColor: '#8B4513',
            bottomColor: '#6B3410',
            accentColor: '#FFD700',
            unlocked: true
        },
        {
            id: 'casual',
            name: 'Casual Dress',
            type: 'short_dress',
            topColor: '#87CEEB',
            bottomColor: '#4169e1',
            accentColor: '#FFFFFF',
            unlocked: true
        },
        {
            id: 'summer',
            name: 'Summer Sundress',
            type: 'sundress',
            topColor: '#FFFACD',
            bottomColor: '#FFD700',
            accentColor: '#FF69B4',
            unlocked: true
        },
        {
            id: 'spring',
            name: 'Spring Floral',
            type: 'long_dress',
            topColor: '#FFB6C1',
            bottomColor: '#FF69B4',
            accentColor: '#98FB98',
            unlocked: true
        },
        {
            id: 'fancy',
            name: 'Elegant Gown',
            type: 'ball_gown',
            topColor: '#E6E6FA',
            bottomColor: '#9370DB',
            accentColor: '#FFD700',
            unlocked: true
        },
        {
            id: 'winter',
            name: 'Cozy Sweater',
            type: 'sweater_pants',
            topColor: '#DC143C',
            bottomColor: '#8B4513',
            accentColor: '#FFFFFF',
            unlocked: true
        },
        {
            id: 'autumn',
            name: 'Autumn Outfit',
            type: 'tunic',
            topColor: '#D2691E',
            bottomColor: '#8B4513',
            accentColor: '#FF8C00',
            unlocked: true
        },
        {
            id: 'party',
            name: 'Party Dress',
            type: 'cocktail_dress',
            topColor: '#FF1493',
            bottomColor: '#C71585',
            accentColor: '#FFD700',
            unlocked: true
        },
        {
            id: 'sporty',
            name: 'Sporty Wear',
            type: 'athletic',
            topColor: '#00CED1',
            bottomColor: '#1E90FF',
            accentColor: '#FFFFFF',
            unlocked: true
        },
        {
            id: 'traditional',
            name: 'Traditional Kimono',
            type: 'kimono',
            topColor: '#DC143C',
            bottomColor: '#8B0000',
            accentColor: '#FFD700',
            unlocked: true
        }
    ],

    // Romance NPCs
    NPCS: [
        {
            id: 'alex',
            name: 'Alex',
            personality: 'friendly and energetic',
            favoriteGifts: ['flowers', 'tomatoes'],
            dialogue: {
                greeting: "Hey there! Beautiful day for farming, isn't it?",
                help: "Let me help you with that!",
                gift: "For me? You're so thoughtful!",
                romance: "I really enjoy spending time with you..."
            },
            schedule: {
                morning: { x: 15, y: 10 },
                afternoon: { x: 20, y: 15 },
                evening: { x: 25, y: 12 }
            }
        },
        {
            id: 'sam',
            name: 'Sam',
            personality: 'artistic and thoughtful',
            favoriteGifts: ['flowers', 'fruits'],
            dialogue: {
                greeting: "Oh! I was just thinking about you.",
                help: "I'd be happy to lend a hand!",
                gift: "This is wonderful, thank you!",
                romance: "Your farm is coming along beautifully... just like you."
            },
            schedule: {
                morning: { x: 35, y: 8 },
                afternoon: { x: 30, y: 20 },
                evening: { x: 38, y: 10 }
            }
        },
        {
            id: 'riley',
            name: 'Riley',
            personality: 'adventurous and playful',
            favoriteGifts: ['fish', 'minerals'],
            dialogue: {
                greeting: "Ready for another adventure?",
                help: "Two hands are better than one!",
                gift: "Awesome! I love it!",
                romance: "You know, this farm feels like home... because you're here."
            },
            schedule: {
                morning: { x: 18, y: 25 },
                afternoon: { x: 12, y: 28 },
                evening: { x: 22, y: 30 }
            }
        }
    ],

    // Crops
    CROPS: [
        {
            id: 'tomato',
            name: 'Tomato',
            seedCost: 20,
            sellPrice: 60,
            growthStages: 4,
            regrows: false
        },
        {
            id: 'corn',
            name: 'Corn',
            seedCost: 30,
            sellPrice: 100,
            growthStages: 5,
            regrows: false
        },
        {
            id: 'strawberry',
            name: 'Strawberry',
            seedCost: 50,
            sellPrice: 120,
            growthStages: 4,
            regrows: true
        }
    ],

    // Furniture for home decoration
    FURNITURE: [
        { id: 'bed', name: 'Bed', cost: 200, unlocked: true },
        { id: 'table', name: 'Table', cost: 100, unlocked: true },
        { id: 'chair', name: 'Chair', cost: 50, unlocked: true },
        { id: 'plant', name: 'Potted Plant', cost: 30, unlocked: true },
        { id: 'painting', name: 'Painting', cost: 150, unlocked: false },
        { id: 'rug', name: 'Rug', cost: 80, unlocked: false }
    ]
};
