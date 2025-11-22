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
                hairColor: '#E6F2FF', // Silver/white
                hairStyle: 'spiky',
                eyeColor: '#4169e1', // Blue
                outfitColors: {
                    primary: '#B0C4DE', // Light blue/steel
                    secondary: '#4682B4', // Steel blue
                    accent: '#FFD700' // Gold
                }
            },
            favoriteGifts: ['flowers', 'minerals', 'fruits'],
            dialogues: [
                "Hey there, partner! Your farm's looking great. Keep up the good work!",
                "I've been practicing my appraisal skills. Mind if I take a look at your harvest?",
                "You know, I'm not exactly the hero type everyone thinks I am. But I'll do my best for you.",
                "There's something peaceful about this place... Makes me want to stay a while longer.",
                "I've faced plenty of battles, but nothing prepared me for how much I'd enjoy your company.",
                "The others always say I'm too hard on myself. Maybe you could help me see what they see?",
                "Between fighting and treasure appraisal, I thought I had life figured out. Then I met you.",
                "I may not be the most perfect companion, but I promise to protect what matters to you."
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
                hairColor: '#FFD89A', // Golden blonde
                hairStyle: 'messy',
                eyeColor: '#D2691E', // Amber
                outfitColors: {
                    primary: '#DC143C', // Crimson red
                    secondary: '#FFD700', // Gold
                    accent: '#8B0000' // Dark red
                }
            },
            favoriteGifts: ['minerals', 'fish', 'rare items'],
            dialogues: [
                "...Fine. What do you wish to say?",
                "The reason people spend time alone is to enjoy peace and quiet. You understand such simple logic, surely?",
                "There's no need to be so harsh. Let's have a chat.",
                "Only when the true purpose of conflict is eradicated can peace descend. Your farm... it's a start.",
                "When survival looms, you have two options: beg for mercy, or draw your sword. I chose the sword.",
                "You don't look at me with fear. Most do. You're different.",
                "Before the Lance of Fury fell into madness, they served as guardians. Power must have purpose.",
                "I left Kremnos for various reasons. Being here with you... it's not one I regret."
            ],
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
                hairColor: '#2F1F1F', // Dark brown/black
                hairStyle: 'long',
                eyeColor: '#00CED1', // Cyan
                hasHorns: true,
                outfitColors: {
                    primary: '#4A4A4A', // Dark gray
                    secondary: '#00CED1', // Cyan/turquoise
                    accent: '#FFD700' // Gold
                }
            },
            favoriteGifts: ['books', 'flowers', 'tea'],
            dialogues: [
                "You wish to greet me? Go ahead. Though I think our usual way is just fine.",
                "I'll keep watch tonight. Get some rest. We'll need our strength for tomorrow.",
                "The farm is fraught with dangers. We must consider every possible method to ensure safety.",
                "Though you may have many questions, allow me to introduce myself first. I am your companion, Dan Heng.",
                "All living beings have their own ways of communication. Your dedication to the crops speaks volumes.",
                "The Permanence shields all life. Your farm carries the same tranquility.",
                "Whatever records we gather here will help create a complete understanding of this place.",
                "At first, I had nowhere to call home. But before I knew it... every stop here became a new beginning for me."
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
