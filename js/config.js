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
            portraitImage: 'images/characters/phainon.png',
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
            dialogues: {
                // 0-40 hearts: Friendly hero, encouraging
                0: [
                    "Hey there, partner! Your farm's looking great. Keep up the good work!",
                    "I've been practicing my appraisal skills. Mind if I take a look at your harvest?",
                    "Nothing beats a good day of hard work, right? Let me know if you need any help!",
                    "You're doing an amazing job here. This place has real potential!"
                ],
                // 41-80 hearts: Warm companion, opens up
                41: [
                    "You know, I'm not exactly the hero type everyone thinks I am. But I'll do my best for you.",
                    "There's something peaceful about this place... Makes me want to stay a while longer.",
                    "The others always say I'm too hard on myself. Maybe you could help me see what they see?",
                    "I've been through a lot of battles, but being here with you feels... different. In a good way."
                ],
                // 81-120 hearts: Close friend, protective
                81: [
                    "I've faced plenty of challenges, but nothing prepared me for how much I'd enjoy your company.",
                    "If anyone gives you trouble, just let me know. I've got your back, partner.",
                    "Between fighting and treasure appraisal, I thought I had life figured out. Then I met you.",
                    "You've become really important to me. I hope you know that."
                ],
                // 121-160 hearts: Romantic interest, admits feelings
                121: [
                    "I may not be the most perfect companion, but I promise to protect what matters to you.",
                    "Every time I see you, I feel like I'm discovering something more valuable than any treasure.",
                    "I've appraised countless artifacts, but none of them compare to the treasure of your smile.",
                    "I know I'm supposed to be the hero, but when I'm with you... you're the one who saves me."
                ],
                // 161-200 hearts: In love, deeply committed
                161: [
                    "I don't care what destiny has planned for me. As long as I can be by your side, I'm ready for anything.",
                    "You're not just my partner anymore. You're... everything to me.",
                    "I've fought to protect so many people, but you're the only one I want to come home to.",
                    "The burden of being the Deliverer feels lighter when you're here. Thank you for being my light."
                ],
                // 201+ hearts: Life partner, eternal devotion
                201: [
                    "I used to think my purpose was to save the world. Now I know it's to spend my life with you.",
                    "Every treasure I find, every battle I win... it all means nothing if I can't share it with you.",
                    "You've given me something no prophecy or destiny ever could - a reason to believe in happiness.",
                    "I love you. More than fighting, more than treasure, more than anything in this world or the next."
                ]
            },
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
            portraitImage: 'images/characters/mydei.jpg',
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
            dialogues: {
                // 0-40 hearts: Blunt, standoffish
                0: [
                    "...Fine. What do you wish to say?",
                    "Hmph. The reason people spend time alone is to enjoy peace and quiet. You understand such simple logic, surely?",
                    "Mhm. State your business quickly.",
                    "What is it this time? I have no interest in idle chatter."
                ],
                // 41-80 hearts: Acknowledges strength, shows respect
                41: [
                    "There's no need to be so harsh. Let's have a chat.",
                    "Only when the true purpose of conflict is eradicated can peace descend. Your farm... it's a start.",
                    "When survival looms, you have two options: beg for mercy, or draw your sword. I chose the sword.",
                    "You work hard. That's... admirable. Few possess such determination."
                ],
                // 81-120 hearts: Opens up, protective
                81: [
                    "You don't look at me with fear. Most do. You're different.",
                    "Before the Lance of Fury fell into madness, they served as guardians. Power must have purpose.",
                    "I left Kremnos for various reasons. Being here with you... it's not one I regret.",
                    "The Sea of Souls took everything from me. But somehow, you've given me something to care about again."
                ],
                // 121-160 hearts: Shows softer side, rare tenderness
                121: [
                    "I made this for you. Don't question it. Just... eat. Proper nutrition is important.",
                    "You look tired. Rest. I'll watch over the farm for a while.",
                    "Hmph. Don't mistake my concern for weakness. I simply... prefer you at full strength.",
                    "Your presence is... not entirely unwelcome. In fact, it's become something I look forward to."
                ],
                // 161-200 hearts: Intense devotion, vulnerability
                161: [
                    "I've lived for centuries, endured unimaginable pain. But when I'm with you, I feel... almost human again.",
                    "If anyone dares threaten you, they'll face the full wrath of the Lance of Fury. This I swear.",
                    "I never thought I'd feel this way again. You've awakened something in me I thought was long dead.",
                    "Stay close to me. Not because you need protection, but because I need you near."
                ],
                // 201+ hearts: Complete devotion, expresses love
                201: [
                    "You are my anchor in this world. Without you, I'd be lost to madness once more.",
                    "I love you. These words don't come easily to me, but they're true. You are everything.",
                    "For you, I would face the Sea of Souls a thousand times over. You're worth any pain.",
                    "Mhm. Come here. Let me hold you. In your arms, even an immortal like me can find peace."
                ]
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
            portraitImage: 'images/characters/danheng.png',
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
            dialogues: {
                // 0-40 hearts: Polite but distant, duty-focused
                0: [
                    "You wish to greet me? Go ahead. Though I think our usual way is just fine.",
                    "Though you may have many questions, allow me to introduce myself first. I am your companion, Dan Heng.",
                    "The farm is fraught with dangers. We must consider every possible method to ensure safety.",
                    "All living beings have their own ways of communication. Your dedication to the crops speaks volumes."
                ],
                // 41-80 hearts: Protective guardian, shows care
                41: [
                    "I'll keep watch tonight. Get some rest. We'll need our strength for tomorrow.",
                    "The Permanence shields all life. Your farm carries the same tranquility.",
                    "Whatever records we gather here will help create a complete understanding of this place.",
                    "Do not worry. I will ensure your safety. This is my duty as a guardian."
                ],
                // 81-120 hearts: Opens up about past, finds belonging
                81: [
                    "At first, I had nowhere to call home. But before I knew it... every stop here became a new beginning for me.",
                    "I've spent much of my life running from the past. But with you, I feel... grounded.",
                    "When the heart changes, so does the world it sees. You've changed how I see this place.",
                    "You've shown me kindness without expecting anything in return. That's... rare."
                ],
                // 121-160 hearts: Romantic feelings, treasures what endures
                121: [
                    "I usually prefer solitude, but your company has become something I actively seek out.",
                    "The Permanence teaches us to treasure what endures. And what I feel for you... it endures.",
                    "My strength is not what it was... it's more. You've given me a reason to become stronger.",
                    "I'm not skilled with words of affection, but know that you've become precious to me."
                ],
                // 161-200 hearts: Deep commitment, protective devotion
                161: [
                    "I've always kept my distance from others. But with you, I find myself wanting to be closer.",
                    "You are my sanctuary. In this world of chaos, you bring me peace.",
                    "My purpose has always been to protect. But now, protecting you feels like protecting my very heart.",
                    "The dragon's heart beats only for you. This is my truth."
                ],
                // 201+ hearts: Eternal vow, home and permanence
                201: [
                    "I love you. These words don't come easily, but they are spoken with absolute certainty.",
                    "Every record I keep, every memory I preserve... they all lead back to you.",
                    "You are my home now. Wherever you are, that's where I belong.",
                    "The Permanence will witness my vow: I will stand by your side for eternity. I'll always protect you."
                ]
            },
            schedule: {
                morning: { x: 18, y: 25 },
                afternoon: { x: 12, y: 28 },
                evening: { x: 22, y: 30 }
            }
        }
    ],

    // Player Character
    PLAYER_CHARACTER: {
        name: 'You',
        portraitImage: 'images/player.png' // Your character portrait
    },

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
