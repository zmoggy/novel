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

    // Romance NPCs - Honkai Star Rail inspired
    NPCS: [
        {
            id: 'phainon',
            name: 'Phainon',
            personality: 'heroic and warmhearted',
            appearance: {
                hairColor: '#FFD89A', // Golden blonde
                hairStyle: 'spiky',
                eyeColor: '#8B4513', // Brown
                outfitColors: {
                    primary: '#DC143C', // Crimson red
                    secondary: '#FFD700', // Gold
                    accent: '#8B0000' // Dark red
                }
            },
            favoriteGifts: ['flowers', 'minerals', 'fruits'],
            dialogues: [
                "The fields look vibrant today. Your dedication really shows.",
                "I've been training nearby. Care to take a break and walk with me?",
                "A strong harvest requires a strong spirit. Yours is remarkable.",
                "The sunset suits you. Have you noticed how it brings out the warmth in your eyes?",
                "I'll protect this farm—and you—no matter what comes.",
                "Your resolve inspires me. Perhaps we could share a meal sometime?",
                "These peaceful moments with you... I find myself wanting more of them.",
                "I used to think battle was my only purpose. You've shown me there's more to life."
            ],
            schedule: {
                morning: { x: 15, y: 10 },
                afternoon: { x: 20, y: 15 },
                evening: { x: 25, y: 12 }
            }
        },
        {
            id: 'mydei',
            name: 'Mydei',
            personality: 'intense and passionate',
            appearance: {
                hairColor: '#2F1F1F', // Dark brown/black
                hairStyle: 'messy',
                eyeColor: '#FF6B6B', // Red
                outfitColors: {
                    primary: '#4A4A4A', // Dark gray
                    secondary: '#00CED1', // Cyan/turquoise
                    accent: '#FFD700' // Gold
                },
                hasHorns: true
            },
            favoriteGifts: ['minerals', 'fish', 'rare items'],
            dialogues: [
                "...You're here. Good.",
                "Don't push yourself too hard. Not everyone has to struggle alone.",
                "I'm not good with words, but... your presence is tolerable. More than tolerable.",
                "These crops you tend—they thrive under your care. It's... admirable.",
                "Stay close if trouble comes. I won't let anything harm you.",
                "You don't fear me? Most people do. You're... different.",
                "I've lived with these horns my whole life. You look at me like you see past them.",
                "Your farm, your life here... it's peaceful. Being near you makes the chaos fade."
            },
            schedule: {
                morning: { x: 35, y: 8 },
                afternoon: { x: 30, y: 20 },
                evening: { x: 38, y: 10 }
            }
        },
        {
            id: 'danheng',
            name: 'Dan Heng',
            personality: 'calm and composed',
            appearance: {
                hairColor: '#E6F2FF', // Silver/white
                hairStyle: 'long',
                eyeColor: '#00CED1', // Cyan
                outfitColors: {
                    primary: '#B0C4DE', // Light blue/steel
                    secondary: '#4682B4', // Steel blue
                    accent: '#FFD700' // Gold
                }
            },
            favoriteGifts: ['books', 'flowers', 'tea'],
            dialogues: [
                "The morning mist suits this place. And you, as well.",
                "I've been observing your farming techniques. Quite methodical and efficient.",
                "In all my travels, I rarely found such tranquility. Perhaps I could stay... a while longer.",
                "You handle the land with such care. It reminds me that not all strength is shown through force.",
                "I'm not accustomed to opening up. But with you, words come easier.",
                "The way you tend each plant... it's as if you understand what they need without words. Remarkable.",
                "I carry many burdens from my past. Your company makes them feel lighter.",
                "Would you... allow me to walk beside you more often? I find your presence calming."
            ],
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
