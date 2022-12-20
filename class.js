skillLibrary = {
    "human": {
        'h_0': {
            id: 'h_0',
            name: 'Calisthenics',
            iconName: 'calisthenics',
            desc: 'Increase your Strength through the power of home workouts',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1,
            },
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'h_1': {
            id: 'h_1',
            name: '"Borrowed Dumbells"',
            iconName: 'calisthenics',
            desc: 'They weren\'t using them anyways.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent",
                effectMagnitude: 0.05,
            },
            maxLevel: 3,
            cost: [2, 2, 2],
            requires: { 'h_0': 3, }
        },
        'h_2': {
            id: 'h_2',
            name: '"Big Boy Pills"',
            iconName: 'calisthenics',
            desc: 'It\'s just like hard candy.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent",
                effectMagnitude: 1.2,
            },
            maxLevel: 1,
            cost: [5],
            requires: { 'h_1': 3, }
        },
        'h_1_4': {
            id: 'h_1_4',
            name: 'Heavy Hitter',
            iconName: 'calisthenics',
            desc: 'All that training has made you swole. That first hit really packs a punch',
            effect: {
                type: 1, // attribute boost
                effectTarget: "overwhelm",
                effectType: "additiveFlat",
                effectMagnitude: 0.2,
            },
            maxLevel: 1,
            cost: [5],
            requires: { 'h_2': 1, },
        },
        'h_3': {
            id: 'h_3',
            name: 'Five Mile Run',
            iconName: 'milerun',
            desc: 'Coach said this would toughen you up.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additive
                effectMagnitude: 1,
            },
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'h_4': {
            id: 'h_4',
            name: 'Construction Job',
            iconName: 'milerun',
            desc: 'And a cold one after work.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additive
                effectMagnitude: 0.1,
            },
            maxLevel: 2,
            cost: [2, 2, 2],
            requires: { 'h_3': 3, },
        },
        'h_5': {
            id: 'h_5',
            name: '8200 Postcode Night Run',
            iconName: 'milerun',
            desc: 'Hey this area doesn\'t look so b-',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additive
                effectMagnitude: 1.2,
            },
            maxLevel: 1,
            cost: [5],
            requires: { 'h_4': 2, },
        },
        'h_2_4': {
            id: 'h_2_4',
            name: 'Built To Last',
            iconName: 'milerun',
            desc: 'With all the beatings you\'ve taken and lived through, it takes a lot to bring you down.',
            effect: {
                type: 1, // attribute boost
                effectTarget: "healthRegeneration",
                effectType: "additiveFlat",
                effectMagnitude: 0.01,
            },
            maxLevel: 1,
            cost: [5],
            requires: { 'h_5': 1, },
        },
        'h_6': {
            id: 'h_6',
            name: 'Dodge the swing',
            iconName: 'shadowB',
            desc: 'We used to do this as kids.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additiveFlat", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1,
            },
            maxLevel: 10,
            cost: Array(10).fill(1),

        },
        'h_7': {
            id: 'h_7',
            name: 'Shadow boxing',
            iconName: 'shadowB',
            desc: 'Shadows to keep you light.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            },
            maxLevel: 5,
            cost: [1, 1, 1, 1, 1],
            requires: { 'h_6': 3, },
        },
        'h_8': {
            id: 'h_8',
            name: 'Acquire J\'s',
            iconName: 'shadowB',
            desc: 'Jays on my feet.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1.3,
            },
            maxLevel: 1,
            cost: [5],
            requires: { 'h_7': 3, },
        },
        'h_3_4': {
            id: 'h_3_4',
            name: 'Opportunity Seeker',
            iconName: 'shadowB',
            desc: 'Being faster than your foe gives you the opportunity to hit them in a vital spot.',
            effect: {
                type: 1, // attribute boost
                effectTarget: "criticalChance",
                effectType: "additiveFlat",
                effectMagnitude: 0.2,
            },
            maxLevel: 1,
            cost: [5],
            requires: { 'h_8': 1, },
        },
        'h_9': {
            id: 'h_9',
            name: 'Read algebra book',
            iconName: 'studying',
            desc: 'Actually learn it. Don\'t memorize it.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additiveFlat", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1,
            },
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'h_10': {
            id: 'h_10',
            name: 'Attend debate club',
            iconName: 'studying',
            desc: 'Let\'s say, hypothetically....',
            effect: {
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 0.2,
            },
            maxLevel: 1,
            cost: [3],
            requires: { 'h_9': 3, },
        },
        'h_11': {
            id: 'h_11',
            name: 'Win at street chess',
            iconName: 'studying',
            desc: 'Check it, mate, I won.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "multPercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1.15,
            },
            maxLevel: 2,
            cost: [3, 3],
            requires: { 'h_10': 1, },
        },
        'h_4_4': {
            id: 'h_4_4',
            name: 'Skilled Combatant',
            iconName: 'studying',
            desc: 'Your strategic mind allows you to setup your foe\'s swift defeat.',
            effect: {
                type: 1, // attribute boost
                effectTarget: "takedown",
                effectType: "additiveFlat",
                effectMagnitude: 0.20,
            },
            maxLevel: 1,
            cost: [5],
            requires: { 'h_11': 2, },
        },
    },
    "superhuman": {
        'sh_0_0': {
            id: 'sh_0_0',
            name: 'Inhuman strength',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve ever been before',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            },
            maxLevel: 50,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3), Array(10).fill(4),Array(10).fill(5)),
        },
        'sh_0_1': {
            id: 'sh_0_1',
            name: 'Matter Over Mind',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve every been before',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.5,
            },
            maxLevel: 3,
            cost: [1, 10, 100],
            requires: { 'sh_0_0': 10 }
        },
        'sh_0_2': {
            id: 'sh_0_2',
            name: 'Overwhelming strength',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve every been before',
            effect: {
                type: 1, // attribute boost
                effectTarget: "overwhelm",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.5,
            },
            maxLevel: 1,
            cost: [10],
            requires: { 'sh_0_1': 2 }
        },
        'sh_2_0': {
            id: 'sh_2_0',
            name: 'Strength Training Boost',
            iconName: 'calisthenics',
            desc: 'PLACEHOLDER',
            effect: {
                type: 2, // training boost
                effectTarget: "strengthTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.2,
            },
            maxLevel: 5,
            cost: [5, 10, 20, 40, 80],
        },
    },
    "esper": {
        'es_0_0': {
            id: 'es_0_0',
            name: 'Superior Intellect',
            iconName: 'studying',
            desc: 'Everything seems so simple',
            effect: {
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            },
            maxLevel: 50,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3), Array(10).fill(4),Array(10).fill(5)),
        },
        'es_0_1': {
            id: 'es_0_1',
            name: 'Master of the Mind',
            iconName: 'studying',
            desc: 'Nothing in this world is infinite except for your intellect.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.5,
            },
            maxLevel: 3,
            cost: [1, 10, 100],
            requires: { 'es_0_0': 10 }
        },
        'es_0_2': {
            id: 'es_0_2',
            name: 'Divergence',
            iconName: 'studying',
            desc: 'As your foes get weaker you get stronger',
            effect: {
                type: 1, // attribute boost
                effectTarget: "takedown",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.5,
            },
            maxLevel: 1,
            cost: [10],
            requires: { 'es_0_1': 2 }
        },
        'es_1_0': {
            id: 'es_1_0',
            name: 'Psionic acceleration',
            iconName: 'shadowB',
            desc: 'A quick mind needs a quick body',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            },
            maxLevel: 100,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3), Array(10).fill(4), Array(10).fill(5), Array(10).fill(6)
                , Array(10).fill(7), Array(10).fill(8), Array(10).fill(9), Array(10).fill(10))
        },
        'es_2_0': {
            id: 'es_2_0',
            name: 'Mind Training Boost',
            iconName: 'studying',
            desc: 'PLACEHOLDER',
            effect: {
                type: 2, // training boost
                effectTarget: "mindTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.2,
            },
            maxLevel: 5,
            cost: [5, 10, 20, 40, 80],
        },
    },
    "mutant": {
        'mu_0': {
            id: 'mu_0',
            name: 'Mutant Healing Factor',
            iconName: 'calisthenics',
            desc: 'Your cells are brimming with activity, wounds that take days to heal close in minutes',
            effect: {
                type: 1, // attribute boost
                effectTarget: "healthRegeneration",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.01,
            },
            maxLevel: 5,
            cost: [5, 10, 20, 40, 80],
        },
        'mu_1': {
            id: 'mu_1',
            name: 'Crit chance',
            iconName: 'calisthenics',
            desc: 'Increases critical strike chance',
            effect: {
                type: 1, // attribute boost
                effectTarget: "criticalChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            },
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'mu_2': {
            id: 'mu_2',
            name: 'Overwhelm',
            iconName: 'calisthenics',
            desc: 'Increases overwhelm',
            effect: {
                type: 1, // attribute boost
                effectTarget: "overwhelm",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            },
            maxLevel: 5,
            cost: Array(5).fill(1),
        }
    },
    "cyborg": {
        'cy_0': {
            id: 'cy_0',
            name: 'Inhuman strength',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve every been before',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 10,
            },
            maxLevel: 5,
            cost: [1, 2, 2, 2, 3],
        },
        'cy_1': {
            id: 'cy_1',
            name: 'Inhuman strength',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve every been before',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 10,
            },
            maxLevel: 5,
            cost: [1, 2, 2, 2, 3],
        },
        'cy_2': {
            id: 'cy_2',
            name: 'Inhuman strength',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve every been before',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 10,
            },
            maxLevel: 5,
            cost: [1, 2, 2, 2, 3],
        },
    },
    "ninja": {
        'ni_0_0': {
            id: 'ni_0_0',
            name: 'Unnatural Speed',
            iconName: 'shadowB',
            desc: 'The whole world seems one muscle twitch away.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            },
            maxLevel: 50,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3), Array(10).fill(4),Array(10).fill(5)),
        },
        'ni_0_1': {
            id: 'ni_0_1',
            name: 'Feline Agility',
            iconName: 'studying',
            desc: 'The faster you go the faster you get.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.5,
            },
            maxLevel: 3,
            cost: [1, 10, 100],
            requires: { 'ni_0_0': 10 }
        },
        'ni_0_2': {
            id: 'ni_0_2',
            name: 'Prenatural Reflexes',
            iconName: 'shadowB',
            desc: 'Your body moves out of danger before you even know it',
            effect: {
                type: 1, // attribute boost
                effectTarget: "dodgeChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.2,
            },
            maxLevel: 1,
            cost: [10],
            requires: { 'ni_0_1': 2 }
        },
        'ni_1_0': {
            id: 'ni_1_0',
            name: 'Deadly',
            iconName: 'shadowB',
            desc: 'PLACEHOLDER',
            effect: {
                type: 1, // attribute boost
                effectTarget: "criticalChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            },
            maxLevel: 100,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3), Array(10).fill(4), Array(10).fill(5), Array(10).fill(6)
                , Array(10).fill(7), Array(10).fill(8), Array(10).fill(9), Array(10).fill(10))
        },
        'ni_2_0': {
            id: 'ni_2_0',
            name: 'Agility Training Boost',
            iconName: 'shadowB',
            desc: 'PLACEHOLDER',
            effect: {
                type: 2, // training boost
                effectTarget: "agilityTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.2,
            },
            maxLevel: 5,
            cost: [5, 10, 20, 40, 80],
        },
    },
}
playerMoves = {
    'punch': {
        type: 0,
        category: 'melee',
        name: "Punch",
        description: "A simple punch, everyone knows how to do it.",
        iconName: "punch",
        damage: 1,
        damageRatios: [.8, 0, 0, 0.2],
        damageRange: [0.9, 1.1],
        time: 3000,
        cooldownTime: 0,
        range: [5, 5],
    },

    'kick': {
        type: 0,
        category: 'melee',
        name: "Roundhouse Kick",
        description: "Leverage your lower body strength to knock those criminals on their asses",
        iconName: "kick",
        damage: 2,
        damageRatios: [1.2, 0, 0, 0.4],
        damageRange: [1, 1.2],
        effects: {
            'aoe': 5,
        },
        time: 4000,
        cooldownTime: 5000,
        range: [5, 5],
    },
    'jab': {
        type: 0,
        category: 'melee',
        name: "Jab",
        description: "Faster than a punch but weaker, good to knockout small fry and get out of the way.",
        iconName: "jab",
        damage: 1,
        damageRatios: [.08, 0, 0, .22],
        damageRange: [.95, 1.05],
        time: 1000,
        cooldownTime: 0,
        range: [5, 5],
    },
    'haymaker': {
        type: 0,
        category: 'melee',
        name: "Haymaker",
        description: "Prepare to deliver a massive blow to your foe. Slow.",
        iconName: "smash",
        damage: 1,
        damageRatios: [2, .8, 0, 0],
        damageRange: [1, 1.5],
        time: 7000,
        cooldownTime: 10000,
        range: [5, 5],
    },
    'crowbar': {
        type: 0,
        category: 'melee',
        name: "Crowbar",
        description: "This does not seem fair?",
        iconName: "crowbar",
        damage: 1,
        damageRatios: [2, 0, 0, 0],
        damageRange: [1, 2],
        time: 4000,
        cooldownTime: 15000,
        range: [6, 6],
    },
    'throwingKnife': {
        type: 0,
        category: 'ranged',
        name: "Throwing Knife",
        description: "It's funnier in the circus",
        iconName: "throwingKnife",
        damage: 1,
        damageRatios: [0, 0, .4, .6],
        damageRange: [0.8, 1],
        time: 2000,
        cooldownTime: 4000,
        range: [0, 60],
    },
    'firecrackers': {
        type: 0,
        category: 'ranged',
        name: "Firecackers",
        description: "You're more likely to blow off your own fingers than theirs.",
        iconName: "firecrackers",
        damage: 1,
        damageRatios: [0, 0, 1.2, .2],
        damageRange: [0.5, 3],
        time: 3000,
        cooldownTime: 9000,
        range: [0, 30],
    },
    //Esper
    'spiritFist': {
        type: 0,
        category: 'melee',
        name: "Spirit Fist",
        description: "Empower your fist with psionic energy for an enhanced strike.",
        iconName: "spiritFist",
        damage: 1,
        damageRatios: [.2, 0, 1, .2],
        damageRange: [0.9, 1.1],
        time: 3000,
        cooldownTime: 0,
        range: [6, 6],
    },
    'telekineticProjectile': {
        type: 0,
        category: 'ranged',
        name: "Telekinetic Projectile",
        description: "Use your psionic powers to thrust nearby matter towards your enemy.",
        iconName: "telekineticProjectile",
        damage: 1,
        damageRatios: [0, 0, 1.8, 0],
        damageRange: [0.8, 1.1],
        time: 3000,
        cooldownTime: 5000,
        range: [0, 60],
    },
    'psionicPulse': {
        type: 0,
        category: 'melee',
        name: "Psionic Pulse",
        description: "Emit a short-range pulse that damages and knocks back nearby enemies.",
        iconName: "psionicPulse",
        damage: 1,
        damageRatios: [0, .5, 1.5, 0],
        damageRange: [1, 1.2],
        effects: {
            'knockback': 20,
            'aoe': 20,
        },
        time: 3000,
        cooldownTime: 10000,
        range: [20, 20],
    },
    'psionicBarrier': {
        type: 2,
        category: 'ranged',
        name: "Psionic Barrier",
        description: "Form a temporary barrier to block attacks.",
        iconName: "placeholder",
        damage: 0,
        damageRatios: [0, 0, 0.2, 0],
        damageRange: [1, 1],
        effects: {
            'shield': 0,
        },
        time: 1000,
        cooldownTime: 15000,
        range: [0,0],
    },
    //Superhuman
    'simplePunch': {
        type: 0,
        category: 'melee',
        name: "Simple Punch",
        description: "I fear not the man who has practiced 10,000 punches once, but I fear the man who has practiced one punch 10,000 times.",
        iconName: "punch",
        damage: 1,
        damageRatios: [1.5, 0, 0, 0],
        damageRange: [0.8, 1.2],
        time: 3000,
        cooldownTime: 0,
        range: [5, 5],
    },
    'multipleSimplePunches': {
        type: 0,
        category: 'melee',
        name: "Multiple Simple Punches",
        description: "I fear not the man who has practiced 10,000 punches once, but I fear the man who has practiced one 10,000 punches, 10,000 times.",
        iconName: "punch",
        damage: 1,
        damageRatios: [.6, 0, 0, .5],
        damageRange: [0.8, 1.2],
        time: 1000,
        cooldownTime: 1000,
        range: [5, 5],
    },
    'titanicSwing': {
        type: 0,
        category: 'melee',
        name: "Titanic Swing",
        description: "Wind up to deliver the greatest blow your body allows",
        iconName: "smash",
        damage: 1,
        damageRatios: [5, 1, 0, 0],
        damageRange: [1, 1.5],
        effects: {
            'knockback': 20,
        },
        time: 5000,
        cooldownTime: 20000,
        range: [10, 10],
    },
    'airCannon': {
        type: 0,
        category: 'ranged',
        name: "Air Cannon",
        description: "You punch the air so hard that a shockwave is launched towards the enemy",
        iconName: "jab",
        damage: 1,
        damageRatios: [1, 0, 0, 0],
        damageRange: [1, 1],
        effects: {
            'aoe': 5,
            'knockback': 5
        },
        time: 3000,
        cooldownTime: 5000,
        range: [5, 50],
    },
    'secondWind': {
        type: 2,
        category: 'ranged',
        name: "Second Wind",
        description: "Take a few breaths and let your supernatural constitution catch up.",
        iconName: "placeholder",
        damage: 0,
        damageRatios: [0.1, 1, 0, 0],
        damageRange: [1, 1],
        effects: {
            'heal': 0,
        },
        time: 3000,
        cooldownTime: 12000,
        range: [0,0],
    },
    //NINJA
    'katana': {
        type: 0,
        category: 'melee',
        name: "Katana",
        description: "A ninja's weapon (?).",
        iconName: "throwingKnife",
        damage: 1,
        damageRatios: [.2, 0, 0, 1],
        damageRange: [0.8, 1.2],
        time: 2000,
        cooldownTime: 0,
        range: [5, 5],
    },
    'shadowStrike': {
        type: 0,
        category: 'melee',
        name: "Shadow Strike",
        description: "Instantly appear near you enemy and strike them before reappearing at your position.",
        iconName: "jab",
        damage: 1,
        damageRatios: [0, 0, 0.3, 3],
        damageRange: [1, 1.2],
        time: 2000,
        cooldownTime: 10000,
        range: [50, 50],
    },
    'shuriken': {
        type: 0,
        category: 'ranged',
        name: "Shuriken",
        description: "Launch a number of shuriken at your foes.",
        iconName: "throwingKnife",
        damage: 1,
        damageRatios: [0, 0, 0.1, .3],
        damageRange: [1, 1.1],
        effects: {
            'aoe': 5,
        },
        time: 500,
        cooldownTime: 500,
        range: [10, 50],
    },
    'flashStep': {
        type: 1,
        category: 'movement',
        name: "Flash Step",
        description: "PLACHOLDER",
        iconName: "move",
        damage: 0,
        time: 500,
        cooldownTime: 5000,
        range: [20,20],
    },
    'walk': {
        type: 1,
        category: 'movement',
        name: "Move",
        description: "1. 2. 1. 2.",
        iconName: "move",
        damage: 0,
        time: 1000,
        cooldownTime: 0,
        range: [5,5],
    },
    'wait': {
        type: 1,
        category: 'movement',
        name: "Wait",
        description: "Got nothing to do.",
        iconName: "placeholder",
        damage: 0,
        time: 1000,
        cooldownTime: 0,
        range: [0,0],
    }
}
abilityUnlocks = {
    'human': {
        0: ['punch'],
        5: ['kick', 'jab'],
        10: ['haymaker', 'firecrackers'],
        15: ['crowbar', 'throwingKnife'],
    },
    'superhuman': {
        0: ['simplePunch'],
        10: ['titanicSwing', 'multipleSimplePunches'],
        25: ['airCannon','secondWind'],
    },
    'mutant': {
        0: ['punch'],
    },
    'esper': {
        0: ['spiritFist'],
        10: ['telekineticProjectile', 'psionicPulse'],
        25: ['psionicBarrier']
    },
    'ninja': {
        0: ['katana'],
        10: ['shadowStrike','shuriken'],
        25:['flashStep']
    },
    'cyborg': {
        0: ['punch'],
    },
}
let previewRowHeader = document.createElement("div");
previewRowHeader.setAttribute("id", "previewRowHeader");
let previewRowBody = document.createElement("div");
previewRowBody.setAttribute("id", "previewRowBody");
let loadoutContainer = document.getElementById("abilityLoadoutContainer");
let abilityRequirementsGrid = document.getElementById("abilityRequirementsGrid");
abilityRequirementsGrid.append(previewRowHeader);
abilityRequirementsGrid.append(previewRowBody);
let slots = [];
for (let index = 0; index < playerStats.abilitySlots; index++) {
    let slot = document.createElement("select");
    slot.setAttribute("class", "abilitySlot pickle");
    slots.push(slot);
    slot.setAttribute("onchange", `changeAbilitySlot(${index})`);
    loadoutContainer.appendChild(slot);
}

checkAbilityRequirements();

populateAbilityRequirements();
UpdateAbilityPreview();
populateAbilitySlots();

function checkAbilityRequirements() {
    if (!abilityUnlocks.hasOwnProperty(playerStats.class)) { console.error("ERROR: ABILITY UNLOCKS NOT DEFINED FOR CLASS " + playerStats.class); return }
    for (const [levelRequirement, abilities] of Object.entries(abilityUnlocks[playerStats.class])) {
        if (playerStats.level >= levelRequirement) {
            abilities.forEach(ability => {
                playerStats.unlockedAbilities[ability] = 1;
            });
        } else {

            abilities.forEach(ability => {
                delete playerStats.unlockedAbilities[ability];
                //console.log("Deleting ",ability)
            });
        }
    }
    populateAbilitySlots();
    UpdateAbilityPreview();
}

function populateAbilityRequirements() {
    if (!abilityUnlocks.hasOwnProperty(playerStats.class)) { console.error("ERROR: ABILITY UNLOCKS NOT DEFINED FOR CLASS " + playerStats.class); return }
    if (abilityRequirementsGrid.childElementCount > 2) {
        while (abilityRequirementsGrid.childElementCount > 2) {
            abilityRequirementsGrid.removeChild(abilityRequirementsGrid.lastChild);
            //console.log("Removing ",abilityRequirementsGrid.lastChild);
        }
    }
    let levels = Object.keys(abilityUnlocks[playerStats.class]);
    for (let index = 0; index < levels.length; index++) {
        let abilities = abilityUnlocks[playerStats.class][levels[index]]
        let label = document.createElement("div");
        label.setAttribute("class", "pickle abilityPickContainerLabel");
        label.style.gridRow = index + 1;
        label.innerHTML = "Level " + levels[index];
        abilityRequirementsGrid.append(label);
        let c = document.createElement("div");
        c.setAttribute("class", "abilityPickContainer");
        c.style.gridRow = index + 1;
        abilityRequirementsGrid.append(c);
        for (let abilityN = 0; abilityN < abilities.length; abilityN++) {
            const ability = abilities[abilityN];
            let b = document.createElement("button");
            b.setAttribute("class", "abilityPickButton tooltip");
            b.style.backgroundImage = `url("${playerMoves[ability].iconName}Icon.png")`;
            c.append(b);
            let t = document.createElement("div");
            t.setAttribute("class", "tooltiptext pickle");
            t.innerHTML = generateAbilityRequirementTooltip(ability);
            b.appendChild(t);
        }
    }
}

function UpdateAbilityPreview() {
    if (!abilityUnlocks.hasOwnProperty(playerStats.class)) { console.error("ERROR: ABILITY UNLOCKS NOT DEFINED FOR CLASS " + playerStats.class); return }
    let levels = Object.keys(abilityUnlocks[playerStats.class]);
    if (playerStats.level >= levels[levels.length - 1]) {
        previewRowHeader.style.display = 'none';
        previewRowBody.style.display = 'none';
    } else {
        previewRowHeader.style.display = 'flex';
        previewRowBody.style.display = 'block';
    }
    let previewIndex = 0;
    for (let index = 0; index < levels.length; index++) {
        if (playerStats.level >= levels[index]) {
            previewIndex = index;
        } else {
            break;
        }
    }
    previewRowHeader.style.gridRow = `${previewIndex + 2}/${previewIndex + 3}`;
    previewRowHeader.style.gridColumn = "1/-1";
    previewRowBody.style.gridRow = `${previewIndex + 3}/${Math.max(previewIndex + 3, levels.length + 1)}`;
    previewRowBody.style.gridColumn = `1/-1`;
}

let passiveTreeGrid = document.getElementById("passiveTreeGrid");
let passiveButtonDict = {};
populatePassiveTree();
if (isOutdated) { resetSkills(); }
function populatePassiveTree() {
    let i = 0;
    passiveTreeGrid.innerHTML = "";
    passiveButtonDict = {};
    if (!skillLibrary.hasOwnProperty(playerStats.class)) { console.error("ERROR: CLASS PASSIVE TREE DOES NOT EXIST"); return; }
    Object.values(skillLibrary[playerStats.class]).forEach(skill => {
        let b = document.createElement("button");
        passiveButtonDict[skill.id] = b;
        b.style.gridRow = i;
        b.style.gridColumn = i;
        b.style.background = "url(" + skill.iconName + "PassiveIcon.png)" + " no-repeat";
        b.style.backgroundSize = "contain";
        b.setAttribute("class", "passiveSkillButton tooltip");
        b.setAttribute("onclick", `checkSkillPurchase("${skill.id}")`)
        passiveTreeGrid.appendChild(b);
        let t = document.createElement("div");
        t.setAttribute("class", "skilltooltiptext pickle");
        t.innerHTML = generatePassiveTooltip(skill);
        b.appendChild(t);
        let l = document.createElement("div");
        l.setAttribute("class", "passiveSkillLevel");
        if (!playerStats.unlockedSkills.hasOwnProperty(skill.id)) {
            l.innerHTML = 0;
        } else {
            l.innerHTML = playerStats.unlockedSkills[skill.id];
        }
        b.appendChild(l);
    });
}

function populateAbilitySlots() {
    let currentAbilities = playerStats.equippedAbilities.slice(1);
    for (let slotN = 0; slotN < slots.length; slotN++) {
        const element = slots[slotN];
        element.innerHTML = "";
        element.style.backgroundImage = "none";
        let noOption = document.createElement("option");
        noOption.innerHTML = "None";
        noOption.value = null;
        element.appendChild(noOption);
        //console.log(playerStats.unlockedAbilities);
        Object.keys(playerStats.unlockedAbilities).forEach(ability => {
            let option = document.createElement("option");
            option.innerHTML = playerMoves[ability].name;
            option.value = ability;
            element.appendChild(option);
            if (currentAbilities[slotN] == ability) {
                option.setAttribute("selected", "selected");
                element.style.backgroundImage = "url(" + playerMoves[ability].iconName + "Icon.png)"
            };
        });
    }
}
function changeAbilitySlot(slotN, internal = false) {
    const slot = slots[slotN];
    const newAbility = slot.value;
    console.log("Slot:" + slotN + ": " + newAbility);
    if (newAbility == "null") {
        let allow = false;
        if (!internal) {
            for (let index = 1; index < playerStats.equippedAbilities.length; index++) {
                if (index - 1 == slotN) continue;
                if (playerStats.equippedAbilities[index] != null) {
                    allow = true;
                    break;
                }
            }
        } else {
            allow = true;
        }
        console.log(allow);
        if (!allow) { slot.value = playerStats.equippedAbilities[slotN + 1]; return; }
        slot.style.backgroundImage = "none";
        playerStats.equippedAbilities[slotN + 1] = null;
    } else {
        for (let i = 0; i < slots.length; i++) {
            if (i == slotN) continue;
            const otherSlot = slots[i];
            if (otherSlot.value == newAbility) {
                otherSlot.value = null;
                changeAbilitySlot(i, true);
            }
        }
        slot.style.backgroundImage = "url(" + playerMoves[newAbility].iconName + "Icon.png)";
        playerStats.equippedAbilities[slotN + 1] = newAbility;
    }
}
function generatePassiveTooltip(skill) {
    let numberDisplay = "";
    let effectText = "";
    let requirementsText = "";
    if (skill.hasOwnProperty("requires")) {
        requirementsText = "Requires:<br>"
        for (const [key, value] of Object.entries(skill.requires)) {
            console.log(key)
            requirementsText += `${skillLibrary[playerStats.class][key].name} (${value})<br>`
        }
    }
    switch (skill.effect.type) {
        case 0:
            effectText = `<span class="${skill.effect.effectTarget}Text">${attributeDisplayNames[skill.effect.effectTarget]}</span>`;
            switch (skill.effect.effectType) {
                case "additiveFlat":
                    numberDisplay = "+" + skill.effect.effectMagnitude;
                    break;
                case "additivePercent":
                    numberDisplay = "+" + skill.effect.effectMagnitude * 100 + "%";
                    break;
                case "multPercent":
                    numberDisplay = "x" + skill.effect.effectMagnitude;
                    break;
                default:
                    console.log("Undefined effect type");
                    break;
            }
            break;
        case 1:
            effectText = `<span>${skill.effect.effectTarget}</span>`;
            switch (skill.effect.effectType) {
                case "additiveFlat":
                    numberDisplay = "+" + skill.effect.effectMagnitude;
                    break;
                case "additivePercent":
                    numberDisplay = "+" + skill.effect.effectMagnitude * 100 + "%";
                    break;
                case "multPercent":
                    numberDisplay = "x" + skill.effect.effectMagnitude;
                    break;
                default:
                    console.log("Undefined effect type");
                    break;
            }
            break;
        case 2:
            let attribute = skill.effect.effectTarget.substr(0, skill.effect.effectTarget.length - 8);
            effectText = `<span class="${attribute}Text">${attributeDisplayNames[attribute]}</span> Training Effect`;
            switch (skill.effect.effectType) {
                case "additiveFlat":
                    numberDisplay = "+" + skill.effect.effectMagnitude;
                    break;
                case "additivePercent":
                    numberDisplay = "+" + skill.effect.effectMagnitude * 100 + "%";
                    break;
                case "multPercent":
                    numberDisplay = "x" + skill.effect.effectMagnitude;
                    break;
                default:
                    console.log("Undefined effect type");
                    break;
            }
            break;
        default:
            break;
    }

    let cost = skill.cost[getPlayerPassiveLevel(skill.id)];
    let costString = "";
    if (isNaN(cost)) { costString = "MAXED!" } else { costString = skill.cost[getPlayerPassiveLevel(skill.id)] + " Points" };
    return `${skill.name} ${getPlayerPassiveLevel(skill.id)}/${skill.maxLevel}` + "<br><br>" +
        skill.desc + "<br /><br>" +
        `${effectText} ${numberDisplay}` + "<br><br>" +
        "Cost: " + costString + "<br><br>"
        + requirementsText;
}
function generateAbilityRequirementTooltip(ability) {
    const abilityData = playerMoves[ability];
    let stringDisplay = "";
    stringDisplay += abilityData.name + "<br />";
    stringDisplay += abilityData.description + "<br />";
    switch (abilityData.type) {
        case 0:
            stringDisplay += "Ratios:" + "<br />";
            for (let attributeRatio = 0; attributeRatio < abilityData.damageRatios.length; attributeRatio++) {
                let ratio = abilityData.damageRatios[attributeRatio] * 100;
                if (ratio == 0) continue;
                let attributeId = attributeIndexToId[attributeRatio];
                stringDisplay += `${ratio}% <span class="${attributeId}Text">${attributeDisplayShort[attributeId]}</span><br />`;
            }
            stringDisplay += `Damage range: x${abilityData.damageRange[0]} - ${abilityData.damageRange[1]}<br />`
            if(abilityData.hasOwnProperty("effects")){
                stringDisplay += "Effects:<br>"
                Object.keys(abilityData.effects).forEach(effect => {
                    stringDisplay +=  `${effect}: ${abilityData.effects[effect]}<br>`;
                })
            }
            break;
    case 2:
        stringDisplay += "Ratios:" + "<br />";
        for (let attributeRatio = 0; attributeRatio < abilityData.damageRatios.length; attributeRatio++) {
            let ratio = abilityData.damageRatios[attributeRatio] * 100;
            if (ratio == 0) continue;
            let attributeId = attributeIndexToId[attributeRatio];
            stringDisplay += `${ratio}% <span class="${attributeId}Text">${attributeDisplayShort[attributeId]}</span><br />`;
        }
        if(abilityData.hasOwnProperty("effects")){
            stringDisplay += "Effects:<br>"
            Object.keys(abilityData.effects).forEach(effect => {
                stringDisplay +=  `${effect}<br>`;
            })
        }
        break;
        default:
            break;
    }
    stringDisplay += `Use time: ${format(abilityData.time / 1000)}s<br />`
    if (abilityData.range[1] != abilityData.range[0]) {
        stringDisplay += `Range: ${abilityData.range[0]}-${abilityData.range[1]}<br />`
    } else {
        stringDisplay += `Range: ${abilityData.range[0]}<br />`
    }
    if (abilityData.cooldownTime > 0) {
        stringDisplay += `Cooldown: ${abilityData.cooldownTime / 1000}s<br />`
    }
    return stringDisplay;
}

function getPlayerPassiveLevel(skillId) {
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        return 0;
    } else {
        return playerStats.unlockedSkills[skillId];
    }
}


//Passive skills
function addSkill(skillId) {
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        playerStats.unlockedSkills[skillId] = 1;
    } else {
        playerStats.unlockedSkills[skillId] += 1;
    }
    addEffect(skillId);
}
function reduceSkill(skillId) {
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        console.log("Failed skill removal. Player did not have that skill (id: " + skillId + ")");
    } else if (playerStats.unlockedSkills[skillId] < 2) {
        removeEffect(skillId);
        delete playerStats.unlockedSkills[skillId];
    } else {
        playerStats.unlockedSkills[skillId] -= 1;
        addEffect(skillId);
    }
    //addEffect(skillId);
}
function removeSkill(skillId) {
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        console.log("Failed skill removal. Player did not have that skill (id: " + skillId + ")");
        return false;
    } else {
        removeEffect(skillId);
        delete playerStats.unlockedSkills[skillId];
        return true;
    }
}
function setSkill(skillId, level) {
    if (isNaN(level)) return false;
    if (level <= 0) {
        if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
            console.log("Failed skill removal. Player did not have that skill (id: " + skillId + ")");
        } else {
            removeEffect(skillId);
            delete playerStats.unlockedSkills[skillId];
        }
    }
    else {
        playerStats.unlockedSkills[skillId] = level;
        addEffect(skillId);
    }
    return true;
}

function addEffect(skillId) {
    let skill = skillLibrary[playerStats.class][skillId];
    switch (skill.effect.type) {
        //Passive attribute modifiers
        case 0:
            if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)) {
                playerStats.effectMultipliers[skill.effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
            }
            if (skill.effect.effectType == 'multPercent') {
                playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
                    Math.pow(skill.effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
            } else {
                playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
                    skill.effect.effectMagnitude * playerStats.unlockedSkills[skillId];
            }
            break;
        //Secondary attribute modifiers -> regeneration, critical etc.
        case 1:
            if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)) {
                playerStats.effectMultipliers[skill.effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
            }
            if (skill.effect.effectType == 'multPercent') {
                playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
                    Math.pow(skill.effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
            } else {
                playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
                    skill.effect.effectMagnitude * playerStats.unlockedSkills[skillId];
            }
            break;
        case 2:
            if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)) {
                playerStats.effectMultipliers[skill.effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
            }
            if (skill.effect.effectType == 'multPercent') {
                playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
                    Math.pow(skill.effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
            } else {
                playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
                    skill.effect.effectMagnitude * playerStats.unlockedSkills[skillId];
            }
            break;
        default:
            console.error("UNKOWN SKILL EFFECT TYPE");
            break;
    }

}
function removeEffect(skillId) {
    let skill = skillLibrary[playerStats.class][skillId];
    if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)) {
        playerStats.effectMultipliers[skill.effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
    }
    if (playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType].hasOwnProperty(skill.id)) {
        delete playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id];
    } else {
        console.log("::ERROR:: Attempting to delete non-existing effect (id:" + skillId + ")");
    }
}

function checkSkillPurchase(skillId) {
    let cost = 0;
    let skill = skillLibrary[playerStats.class][skillId];
    if (skill.hasOwnProperty('requires')) {
        for (const [key, value] of Object.entries(skill.requires)) {
            if (playerStats.unlockedSkills[key] < value || playerStats.unlockedSkills[key] == undefined) {
                logConsole(`Requirements are not met!`);
                return false;
            }
        }
    }

    if (playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        let skill = skillLibrary[playerStats.class][skillId];
        if (playerStats.unlockedSkills[skillId] >= skill.maxLevel) { logConsole(`${skill.name} is already max level!`); return false; }
        cost = skillLibrary[playerStats.class][skillId].cost[playerStats.unlockedSkills[skillId]];
    } else {
        cost = skillLibrary[playerStats.class][skillId].cost[0];
    }
    if (cost <= (getTotalPassivePoints() - playerStats.passivePointsSpent)) {
        playerStats.passivePointsSpent += cost;
        addSkill(skillId);
    }
    updateButton(skillId);
}

function updateButton(skillId) {
    let l = passiveButtonDict[skillId].querySelector('.passiveSkillLevel');
    if (playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        l.innerHTML = playerStats.unlockedSkills[skillId];
    } else {
        l.innerHTML = 0;
    }
    let t = passiveButtonDict[skillId].querySelector('.skilltooltiptext');
    t.innerHTML = generatePassiveTooltip(skillLibrary[playerStats.class][skillId]);
}

function resetSkills() {
    let old = Object.keys(playerStats.unlockedSkills);
    old.forEach(skillId => {
        removeSkill(skillId);
    });
    playerStats.passivePointsSpent = 0;
    for (const [key, value] of Object.entries(passiveButtonDict)) {
        updateButton(key);
    }
}

function changeClass(className, keepLevel = false) {
    if (className == playerStats.class) return;
    resetSkills();
    playerStats.class = className;
    populatePassiveTree();
    if (!keepLevel) {
        playerStats.level = 0;
        playerStats.experience = 0;
        addPlayerExp(0);
        playerStats.experienceToNext = (baseExperienceCost + baseLinearExperienceCost * playerStats.level) * Math.pow(baseExperienceCostExponent, playerStats.level);
    }
    playerStats.unlockedAbilities = {};
    populateAbilityRequirements();
    checkAbilityRequirements();
    for (let index = 0; index < slots.length; index++) {
        if (index == 0) {
            playerStats.equippedAbilities[index + 1] = abilityUnlocks[playerStats.class][0][0];
        } else {
            playerStats.equippedAbilities[index + 1] = null;
        }
    }
    populateAbilitySlots();
    if (className != 'human') {
        playerStats.attributeSoftcaps = [10000, 10000, 10000, 10000];
        playerStats.strength = 10;
        playerStats.toughness = 10;
        playerStats.mind = 10;
        playerStats.agility = 10;
    } else {
        playerStats.attributeSoftcaps = [100, 100, 100, 100];
        playerStats.strength = 1;
        playerStats.toughness = 1;
        playerStats.mind = 1;
        playerStats.agility = 1;
    }
}