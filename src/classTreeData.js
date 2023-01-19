skillLibrary = {
    "human": {
        //#region 0
        //#endregion
        'h_0': {
            id: 'h_0',
            sub: 0,
            position: { row: 1, column: 2 },
            name: 'Calisthenics',
            iconName: 'calisthenics',
            desc: 'Increase your Strength through the power of home workouts',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'h_1': {
            id: 'h_1',
            sub: 0,
            position: { row: 1, column: 3 },
            name: '"Borrowed Dumbells"',
            iconName: 'calisthenics',
            desc: 'They weren\'t using them anyways.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent",
                effectMagnitude: 0.05,
            }],
            maxLevel: 3,
            cost: [2, 2, 2],
            requires: { 'h_0': 3, }
        },
        'h_2': {
            id: 'h_2',
            sub: 0,
            position: { row: 1, column: 4 },
            name: '"Big Boy Pills"',
            iconName: 'calisthenics',
            desc: 'It\'s just like hard candy.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent",
                effectMagnitude: 1.2,
            }],
            maxLevel: 1,
            cost: [5],
            requires: { 'h_1': 3, }
        },
        'h_1_4': {
            id: 'h_1_4',
            sub: 0,
            position: { row: 1, column: 5 },
            name: 'Heavy Hitter',
            iconName: 'calisthenics',
            desc: 'All that training has made you swole. That first hit really packs a punch',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "overwhelm",
                effectType: "additiveFlat",
                effectMagnitude: 0.2,
            }],
            maxLevel: 1,
            cost: [5],
            requires: { 'h_2': 1, },
        },
        'h_3': {
            id: 'h_3',
            sub: 0,
            position: { row: 2, column: 2 },
            name: 'Five Mile Run',
            iconName: 'milerun',
            desc: 'Coach said this would toughen you up.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additive
                effectMagnitude: 1,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'h_4': {
            id: 'h_4',
            sub: 0,
            position: { row: 2, column: 3 },
            name: 'Construction Job',
            iconName: 'milerun',
            desc: 'And a cold one after work.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additive
                effectMagnitude: 0.1,
            }],
            maxLevel: 2,
            cost: [2, 2],
            requires: { 'h_3': 3, },
        },
        'h_5': {
            id: 'h_5',
            sub: 0,
            position: { row: 2, column: 4 },
            name: '8200 Postcode Night Run',
            iconName: 'milerun',
            desc: 'Hey this area doesn\'t look so b-',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additive
                effectMagnitude: 1.2,
            }],
            maxLevel: 1,
            cost: [5],
            requires: { 'h_4': 2, },
        },
        'h_2_4': {
            id: 'h_2_4',
            sub: 0,
            position: { row: 2, column: 5 },
            name: 'Built To Last',
            iconName: 'milerun',
            desc: 'With all the beatings you\'ve taken and lived through, it takes a lot to bring you down.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "healthRegeneration",
                effectType: "additiveFlat",
                effectMagnitude: 0.01,
            }],
            maxLevel: 1,
            cost: [5],
            requires: { 'h_5': 1, },
        },
        'h_6': {
            id: 'h_6',
            sub: 0,
            position: { row: 3, column: 2 },
            name: 'Dodge the swing',
            iconName: 'shadowB',
            desc: 'We used to do this as kids.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additiveFlat", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),

        },
        'h_7': {
            id: 'h_7',
            sub: 0,
            position: { row: 3, column: 3 },
            name: 'Shadow boxing',
            iconName: 'shadowB',
            desc: 'Shadows to keep you light.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 5,
            cost: [1, 1, 1, 1, 1],
            requires: { 'h_6': 3, },
        },
        'h_8': {
            id: 'h_8',
            sub: 0,
            position: { row: 3, column: 4 },
            name: 'Acquire J\'s',
            iconName: 'shadowB',
            desc: 'Jays on my feet.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1.3,
            }],
            maxLevel: 1,
            cost: [5],
            requires: { 'h_7': 3, },
        },
        'h_3_4': {
            id: 'h_3_4',
            sub: 0,
            position: { row: 3, column: 5 },
            name: 'Opportunity Seeker',
            iconName: 'shadowB',
            desc: 'Being faster than your foe gives you the opportunity to hit them in a vital spot.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "criticalChance",
                effectType: "additiveFlat",
                effectMagnitude: 0.2,
            }],
            maxLevel: 1,
            cost: [5],
            requires: { 'h_8': 1, },
        },
        'h_9': {
            id: 'h_9',
            sub: 0,
            position: { row: 4, column: 2 },
            name: 'Read algebra book',
            iconName: 'studying',
            desc: 'Actually learn it. Don\'t memorize it.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additiveFlat", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'h_10': {
            id: 'h_10',
            sub: 0,
            position: { row: 4, column: 3 },
            name: 'Attend debate club',
            iconName: 'studying',
            desc: 'Let\'s say, hypothetically....',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 0.2,
            }],
            maxLevel: 1,
            cost: [3],
            requires: { 'h_9': 3, },
        },
        'h_11': {
            id: 'h_11',
            sub: 0,
            position: { row: 4, column: 4 },
            name: 'Win at street chess',
            iconName: 'studying',
            desc: 'Check it, mate, I won.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "multPercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1.15,
            }],
            maxLevel: 2,
            cost: [3, 3],
            requires: { 'h_10': 1, },
        },
        'h_4_4': {
            id: 'h_4_4',
            sub: 0,
            position: { row: 4, column: 5 },
            name: 'Skilled Combatant',
            iconName: 'studying',
            desc: 'Your strategic mind allows you to setup your foe\'s swift defeat.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "takedown",
                effectType: "additiveFlat",
                effectMagnitude: 0.20,
            }],
            maxLevel: 1,
            cost: [5],
            requires: { 'h_11': 2, },
        },
        //#endregion
    },
    "superhuman": {
        //#region 0

        // 'sh_0_0m': {
        //     id: 'sh_0_0m',
        //     sub: 0,
        //     position: { row: 1, column: 2 },
        //     name: 'Strength+',
        //     iconName: 'calisthenics',
        //     desc: '',
        //     effect: [{
        //         type: 0, // attribute boost
        //         effectTarget: "strength",
        //         effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
        //         effectMagnitude: 2,
        //     }],
        //     maxLevel: 3,
        //     cost: Array(3).fill(1),
        //     requires: { 'sh_0_0': 5 }
        // },
        // 'sh_0_1m': {
        //     id: 'sh_0_1m',
        //     sub: 0,
        //     position: { row: 2, column: 3 },
        //     name: 'Strength+',
        //     iconName: 'calisthenics',
        //     desc: '',
        //     effect: [{
        //         type: 0, // attribute boost
        //         effectTarget: "strength",
        //         effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
        //         effectMagnitude: 5,
        //     }],
        //     maxLevel: 3,
        //     cost: Array(3).fill(2),
        //     requires: { 'sh_0_0': 5 }
        // },
        // 'sh_0_3m': {
        //     id: 'sh_0_3m', sub: 0, position: { row: 1, column: 4 },
        //     name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_0': 5 }
        // },
        // 'sh_0_4m': {
        //     id: 'sh_0_4m', sub: 0, position: { row: 4, column: 3 },
        //     name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_2': 10 }
        // },
        // 'sh_0_5m': {
        //     id: 'sh_0_5m', sub: 0, position: { row: 4, column: 5 },
        //     name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_4m': 5 }
        // },
        // 'sh_0_6m': {
        //     id: 'sh_0_6m', sub: 0, position: { row: 3, column: 5 },
        //     name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_5m': 5 }
        // },
        // 'sh_0_7m': {
        //     id: 'sh_0_7m', sub: 0, position: { row: 3, column: 2 },
        //     name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "agility", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_1m': 5 }
        // },
        // 'sh_0_8m': {
        //     id: 'sh_0_8m', sub: 0, position: { row: 2, column: 1 },
        //     name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "agility", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_7m': 3 }
        // },
        // 'sh_0_9m': {
        //     id: 'sh_0_9m', sub: 0, position: { row: 5, column: 2 },
        //     name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_4': 5 }
        // },
        // 'sh_0_10m': {
        //     id: 'sh_0_10m', sub: 0, position: { row: 6, column: 4 },
        //     name: 'Toughness+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "toughness", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_4': 5 }
        // },
        // 'sh_0_11m': {
        //     id: 'sh_0_11m', sub: 0, position: { row: 5, column: 5 },
        //     name: 'Toughness+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "toughness", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_0_10m': 5 }
        // },
        'sh_0_0': {
            id: 'sh_0_0', sub: 0, position: { row: 1, column: 3 },
            rank: 1,
            name: 'Raw Muscle', iconName: 'calisthenics',
            desc: 'Does this invalidate your natty card?',
            effect: [{
                type: 0, effectTarget: "strength",
                effectType: "additiveFlat", effectMagnitude: 5
            },
            {
                type: 2, effectTarget: "strengthTraining",
                effectType: "additivePercent", effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'sh_0_1': {
            id: 'sh_0_1', sub: 0, rank: 1, position: { row: 2, column: 3 },
            name: 'Inhuman strength', iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve ever been before',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: 0.005 }],
            maxLevel: 25, cost: Array(25).fill(2), requires: { 'sh_0_0': 3 }
        },
        'sh_0_2': {
            id: 'sh_0_2', sub: 0, rank: 2, position: { row: 3, column: 3 }, name: 'Matter Over Mind', iconName: 'calisthenics',
            desc: 'Physical strength that breaks through even spirit',
            effect: [{ type: 0, effectTarget: "strength", effectType: "multPercent", effectMagnitude: 1.01 }],
            maxLevel: 10, cost: Array(10).fill(10), requires: { 'sh_0_1': 10 }
        },
        'sh_0_3': {
            id: 'sh_0_3', sub: 0, rank: 2, position: { row: 5, column: 2 }, name: 'Overwhelming strength', iconName: 'calisthenics',
            desc: 'Lesser foes cower at your insurmountable strength',
            effect: [{ type: 1, effectTarget: "overwhelm", effectType: "additiveFlat", effectMagnitude: 0.1, }],
            maxLevel: 1, cost: [100], requires: { 'sh_0_2': 3 }
        },
        'sh_0_4': {
            id: 'sh_0_4', sub: 0, rank: 1, position: { row: 5, column: 3 }, name: 'Utmost Might', iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 1, effectTarget: "damageDealt", effectType: "multPercent", effectMagnitude: 1.02, }],
            maxLevel: 3, cost: [50, 50, 50], requires: { 'sh_0_2': 3 }
        },
        'sh_0_5': {
            id: 'sh_0_5', sub: 0, rank: 2, position: { row: 2, column: 4 },
            name: 'Huge Muscles', iconName: 'calisthenics', desc: 'Even without trying you\'re stronger than you\'ve ever been before',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 100 }],
            maxLevel: 1, cost: Array(1).fill(10), requires: { 'sh_0_0': 3 }
        },
        'sh_0_6': {
            id: 'sh_0_6', sub: 0, rank: 2, position: { row: 5, column: 4 }, name: 'Mighty Tough', iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.10 }],
            maxLevel: 1, cost: [150],
        },
        'sh_0_7': {
            id: 'sh_0_7', sub: 0, rank: 2, position: { row: 6, column: 3 }, name: 'Ultimate Workout', iconName: 'calisthenics',
            desc: '100 Pushups, 1000 Situps, 10km, every day',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: 0.005 }],
            maxLevel: 999, cost: Array(999).fill(10),
            requires: { 'sh_0_4': 3 }
        },
        'sh_0_8': {
            id: 'sh_0_8', sub: 0, rank: 2, position: { row: 4, column: 4 }, name: 'Boxer Reflex', iconName: 'calisthenics',
            desc: '100 Pushups, 1000 Situps, 10km, every day',
            effect: [{ type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.01 }],
            maxLevel: 30, cost: Array(10).fill(5).concat(Array(10).fill(10), Array(10).fill(15)),
            requires: { 'sh_0_2': 10 }
        },
        'sh_0_20': {
            id: 'sh_0_20', sub: 0, position: { row: 6, column: 3 }, prestige: 1,
            name: 'Raw Muscle', iconName: 'calisthenics',
            desc: 'Does this invalidate your natty card?',
            effect: [{
                type: 0, effectTarget: "strength",
                effectType: "additiveFlat", effectMagnitude: 1
            },
            {
                type: 2, effectTarget: "strengthTraining",
                effectType: "additivePercent", effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'sh_0_21': {
            id: 'sh_0_21',
            sub: 0, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Inhuman strength',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve ever been before',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'sh_0_20': 10 }
        },
        'sh_0_22': {
            id: 'sh_0_22',
            sub: 0, prestige: 1,
            position: { row: 8, column: 3 },
            name: 'Matter Over Mind',
            iconName: 'calisthenics',
            desc: 'Physical strength that breaks through even spirit',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.1,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'sh_0_21': 10 }
        },
        'sh_0_23': {
            id: 'sh_0_23',
            sub: 0, prestige: 1,
            position: { row: 8, column: 2 },
            name: 'Overwhelming strength',
            iconName: 'calisthenics',
            desc: 'Lesser foes cower at your insurmountable strength',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "overwhelm",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'sh_0_22': 1 }
        },
        'sh_0_24': {
            id: 'sh_0_24',
            sub: 0, prestige: 1,
            position: { row: 9, column: 3 },
            name: 'Utmost Might',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "damageDealt",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.02,
            }],
            maxLevel: 3,
            cost: [50, 50, 50],
            requires: { 'sh_0_22': 1 }
        },
        //#endregion
        //#region 1
        'sh_1_0': {
            id: 'sh_1_0', sub: 1, rank: 1, position: { row: 1, column: 3 }, name: 'STR+TGH',
            iconName: 'calisthenics', desc: '',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 },
            { type: 2, effectTarget: "toughnessTraining", effectType: "additivePercent", effectMagnitude: 0.01 }],
            maxLevel: 10, cost: Array(10).fill(1),
        },
        'sh_1_1': {
            id: 'sh_1_1', sub: 1, rank: 1, position: { row: 2, column: 3 }, name: 'Giant Training', iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: 0.0025 },
            { type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.0025 }],
            maxLevel: 25, cost: Array(25).fill(2), requires: { 'sh_1_0': 3 },
        },
        'sh_1_2': {
            id: 'sh_1_2', sub: 1, rank: 1, rank: 2, position: { row: 3, column: 3 }, name: 'Colossal Constitution', iconName: 'calisthenics',
            desc: 'PLACEHOLDER',
            effect: [{ type: 0, effectTarget: "strength", effectType: "multPercent", effectMagnitude: 1.005 },
            { type: 0, effectTarget: "toughness", effectType: "multPercent", effectMagnitude: 1.005 }],
            maxLevel: 10, requires: { 'sh_1_1': 3 }, cost: Array(10).fill(10),
        },
        'sh_1_3': {
            id: 'sh_1_3', sub: 1, rank: 2, position: { row: 3, column: 2 }, name: 'Titanic Blows', iconName: 'calisthenics',
            desc: 'Rather than throw meek punches you put measured time into each strike',
            effect: [{ type: 1, effectTarget: "actionSpeed", effectType: "multPercent", effectMagnitude: 0.95 },
            { type: 1, effectTarget: "damageDealt", effectType: "multPercent", effectMagnitude: 1.1, }],
            maxLevel: 1, requires: { 'sh_1_2': 3 }, cost: [100],
        },
        'sh_1_4': {
            id: 'sh_1_4', sub: 1, rank: 1, position: { row: 4, column: 3 }, name: 'Body Of Steel', iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 1, effectTarget: "damageTaken", effectType: "multPercent", effectMagnitude: 0.95, },],
            maxLevel: 1, requires: { 'sh_1_2': 1 }, cost: [100],
        },
        'sh_1_5': {
            id: 'sh_1_5', sub: 1, rank: 2, position: { row: 5, column: 1 }, name: 'Titanic Strength', iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: 0.15, },],
            maxLevel: 1, requires: {}, requiresSkill: { 'titanicSwing': 1 }, cost: [150],
        },
        'sh_1_6': {
            id: 'sh_1_6', sub: 1, rank: 2, position: { row: 5, column: 2 }, name: 'Great Vitality', iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additiveFlat", effectMagnitude: 1000, },
            { type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.05, },],
            maxLevel: 1, requires: { 'sh_1_4': 1 }, cost: [150],
        },
        'sh_1_7': {
            id: 'sh_1_7', sub: 1, rank: 1, position: { row: 6, column: 3 }, name: 'Titanic Growth', iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: 0.004 },
            { type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.001 }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'sh_1_4': 1 },
        },
        // 'sh_1_1m': {
        //     id: 'sh_1_1m', sub: 1, position: { row: 1, column: 2 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_0': 5 }
        // },
        // 'sh_1_2m': {
        //     id: 'sh_1_2m', sub: 1, position: { row: 1, column: 4 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_1': 5 }
        // },
        // 'sh_1_3m': {
        //     id: 'sh_1_3m', sub: 1, position: { row: 2, column: 2 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_4m': 3 }
        // },
        // 'sh_1_4m': {
        //     id: 'sh_1_4m', sub: 1, position: { row: 2, column: 3 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_0': 10 }
        // },
        // 'sh_1_5m': {
        //     id: 'sh_1_5m', sub: 1, position: { row: 3, column: 4 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_4m': 5 }
        // },
        // 'sh_1_6m': {
        //     id: 'sh_1_6m', sub: 1, position: { row: 3, column: 5 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_5m': 5 }
        // },
        // 'sh_1_7m': {
        //     id: 'sh_1_7m', sub: 1, position: { row: 3, column: 2 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "agility", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_4m': 3 }
        // },
        // 'sh_1_8m': {
        //     id: 'sh_1_8m', sub: 1, position: { row: 4, column: 4 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "agility", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_10m': 3 }
        // },
        // 'sh_1_9m': {
        //     id: 'sh_1_9m', sub: 1, position: { row: 4, column: 5 }, name: 'Strength+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_8m': 3 }
        // },
        // 'sh_1_10m': {
        //     id: 'sh_1_10m', sub: 1, position: { row: 4, column: 3 }, name: 'Toughness+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "toughness", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_2': 10 }
        // },
        // 'sh_1_11m': {
        //     id: 'sh_1_11m', sub: 1, position: { row: 5, column: 3 }, name: 'Toughness+', iconName: 'calisthenics', desc: '',
        //     effect: [{ type: 0, effectTarget: "toughness", effectType: "additiveFlat", effectMagnitude: 5 }],
        //     maxLevel: 3, cost: Array(3).fill(2), requires: { 'sh_1_10m': 5 }
        // },
        'sh_1_20': {
            id: 'sh_1_20',
            sub: 1, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'STR+TGH',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 0, // training boost
                effectTarget: "strength",
                effectType: "additiveFlat",
                effectMagnitude: 1,
            },
            {
                type: 2, // training boost
                effectTarget: "toughnessTraining",
                effectType: "additivePercent",
                effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'sh_1_21': {
            id: 'sh_1_21',
            sub: 1, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Giant Training',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 0, // training boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            },
            {
                type: 0, // training boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'sh_1_20': 10 },
        },
        'sh_1_22': {
            id: 'sh_1_22',
            sub: 1, prestige: 1,
            position: { row: 8, column: 3 },
            name: 'Colossal Constitution',
            iconName: 'calisthenics',
            desc: 'PLACEHOLDER',
            effect: [{
                type: 0,
                effectTarget: "strength",
                effectType: "multPercent",
                effectMagnitude: 1.05,
            },
            {
                type: 0,
                effectTarget: "toughness",
                effectType: "multPercent",
                effectMagnitude: 1.05,
            }],
            maxLevel: 1,
            requires: { 'sh_1_21': 10 },
            cost: [100],
        },
        'sh_1_23': {
            id: 'sh_1_23',
            sub: 1, prestige: 1,
            position: { row: 8, column: 2 },
            name: 'Titanic Blows',
            iconName: 'calisthenics',
            desc: 'Rather than throw meek punches you put measured time into each strike',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.95,
            }, {
                type: 1, // attribute boost
                effectTarget: "damageDealt",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.1,
            }],
            maxLevel: 1,
            requires: { 'sh_1_22': 1 },
            cost: [100],
        },
        'sh_1_24': {
            id: 'sh_1_24',
            sub: 1, prestige: 1,
            position: { row: 9, column: 3 },
            name: 'Body Of Steel',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "damageTaken",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.95,
            },],
            maxLevel: 1,
            requires: { 'sh_1_22': 1 },
            cost: [100],
        },
        //#endregion
        //#region 2
        'sh_2_0': {
            id: 'sh_2_0',
            sub: 2,
            rank: 1,
            position: { row: 1, column: 3 },
            name: 'STR+MND',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 2,
                effectTarget: "strengthTraining",
                effectType: "additivePercent",
                effectMagnitude: 0.005,
            },
            {
                type: 2,
                effectTarget: "mindTraining",
                effectType: "additivePercent",
                effectMagnitude: 0.005,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'sh_2_1': {
            id: 'sh_2_1',
            sub: 2,
            rank: 1,
            position: { row: 2, column: 3 },
            name: 'Circular Breathing',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 0, // training boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // training boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'sh_2_0': 10 }
        },
        'sh_2_2': {
            id: 'sh_2_2',
            sub: 2,
            rank: 2,
            position: { row: 3, column: 3 },
            name: 'Body & Soul',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 0, // training boost
                effectTarget: "strength",
                effectType: "multPercent", //additiveFlat, multPercent, multPercent
                effectMagnitude: 1.005,
            },
            {
                type: 0, // training boost
                effectTarget: "mind",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.005,
            }],
            maxLevel: 10,
            cost: Array(10).fill(10),
            requires: { 'sh_2_1': 1 }
        },
        'sh_2_3': {
            id: 'sh_2_3',
            sub: 2,
            rank: 1,
            position: { row: 3, column: 4 },
            name: 'Focused Breathing',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 1, // training boost
                effectTarget: "cooldownReduction",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            }],
            maxLevel: 3,
            cost: [30, 30, 30],
            requires: { 'sh_2_1': 1 }
        },
        'sh_2_4': {
            id: 'sh_2_4',
            sub: 2,
            rank: 1,
            position: { row: 2, column: 2 },
            name: 'Full-body Circulation',
            iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.0025 },
            { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.0025 }],
            maxLevel: 10, cost: Array(10).fill(4), requires: { 'sh_2_1': 1 }
        },
        'sh_2_5': {
            id: 'sh_2_5',
            sub: 2,
            rank: 1,
            position: { row: 4, column: 2 },
            name: 'Focused Breathing',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 1, effectTarget: "cooldownReduction", effectType: "additiveFlat", effectMagnitude: 0.02,
            }],
            maxLevel: 3, cost: [30, 30, 30], requires: { 'sh_2_2': 1 }
        },
        'sh_2_5': {
            id: 'sh_2_5',
            sub: 2,
            rank: 2,
            position: { row: 4, column: 3 },
            name: 'Focused Breathing',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 1, effectTarget: "cooldownReduction", effectType: "multPercent", effectMagnitude: 1.05,
            }],
            maxLevel: 1, cost: [100], requires: { 'sh_2_2': 1 }
        },
        'sh_2_6': {
            id: 'sh_2_6',
            sub: 2,
            rank: 2,
            position: { row: 6, column: 3 },
            name: 'Ki Recirculation',
            iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: 0.003 },
            { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.002 }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'sh_2_2': 1 }
        },
        'sh_2_7': {
            id: 'sh_2_7',
            sub: 2,
            rank: 2,
            position: { row: 5, column: 2 },
            name: 'Combat Focus',
            iconName: 'calisthenics',
            desc: '',
            effect: [{ type: 0, effectTarget: "mind", effectType: "additiveFlat", effectMagnitude: 5000 },
            { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.05 }],
            maxLevel: 1, cost: [150], requires: { 'sh_2_2': 1 }
        },
        'sh_2_20': {
            id: 'sh_2_20',
            sub: 2, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'STR+MND',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 2,
                effectTarget: "strengthTraining",
                effectType: "additivePercent",
                effectMagnitude: 0.0025,
            },
            {
                type: 2,
                effectTarget: "mindTraining",
                effectType: "additivePercent",
                effectMagnitude: 0.0025,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'sh_2_21': {
            id: 'sh_2_21',
            sub: 2, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Circular Breathing',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 0, // training boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // training boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'sh_2_20': 10 }
        },
        'sh_2_22': {
            id: 'sh_2_22', sub: 2, prestige: 1, position: { row: 8, column: 3 }, name: 'Body & Soul', iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 0, // training boost
                effectTarget: "strength", effectType: "multPercent", //additiveFlat, multPercent, multPercent
                effectMagnitude: 1.05,
            },
            {
                type: 0, // training boost
                effectTarget: "mind", effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            }],
            maxLevel: 1, cost: [100], requires: { 'sh_2_21': 1 }
        },
        'sh_2_23': {
            id: 'sh_2_23',
            sub: 2, prestige: 1,
            position: { row: 8, column: 4 },
            name: 'Focused Breathing',
            iconName: 'calisthenics',
            desc: '',
            effect: [{
                type: 1, // training boost
                effectTarget: "cooldownReduction",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            }],
            maxLevel: 3,
            cost: [10, 20, 30],
            requires: { 'sh_2_21': 1 }
        },
        //#endregion
    },
    "esper": {
        //#region 0
        'es_0_0': {
            id: 'es_0_0',
            sub: 0,
            position: { row: 1, column: 3 },
            name: 'Reflective Mind',
            iconName: 'studying',
            desc: 'More than ever you\'re drawn inwards, to your own thoughts.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 2,
            },
            {
                type: 2, // attribute boost
                effectTarget: "mindTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'es_0_1': {
            id: 'es_0_1',
            sub: 0,
            position: { row: 2, column: 3 },
            name: 'Psionic Talent',
            iconName: 'studying',
            desc: 'You start being able to hear whispers of thoughts and feel minds and the fields they generate',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'es_0_0': 5 }
        },
        'es_0_2': {
            id: 'es_0_2',
            sub: 0,
            position: { row: 3, column: 3 },
            name: 'Master of the Mind',
            iconName: 'studying',
            desc: 'Nothing in this world is infinite except for your intellect.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.1,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'es_0_1': 10 }
        },
        'es_0_3': {
            id: 'es_0_3',
            sub: 0,
            position: { row: 5, column: 2 },
            name: 'Divergence',
            iconName: 'studying',
            desc: 'As your foes get weaker you get stronger',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "takedown",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 3,
            cost: [20, 20, 20],
            requires: { 'es_0_4': 10 }
        },
        'es_0_4': {
            id: 'es_0_4',
            sub: 0,
            position: { row: 4, column: 3 },
            name: 'Psionic Talent II',
            iconName: 'studying',
            desc: 'Placeholder',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(4),
            requires: { 'es_0_2': 1 }
        },
        'es_0_5': {
            id: 'es_0_5',
            sub: 0,
            position: { row: 3, column: 4 },
            name: 'Fragile Thoughts',
            iconName: 'studying',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.8,
            },
            {
                type: 1, // attribute boost
                effectTarget: "cooldownReduction",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [25],
            requires: { 'es_0_1': 1 }
        },
        'es_0_6': {
            id: 'es_0_6',
            sub: 0,
            position: { row: 5, column: 3 },
            name: 'Agile Scion',
            iconName: 'studying',
            desc: '',
            effect: [
                {
                    type: 1, // attribute boost
                    effectTarget: "cooldownReduction",
                    effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.03,
                }],
            maxLevel: 3,
            cost: [50, 50, 50],
            requires: { 'es_0_4': 1 }
        },
        'es_0_7': {
            id: 'es_0_7', sub: 0, position: { row: 6, column: 3 }, name: 'Solipsism', iconName: 'studying',
            desc: '',
            effect: [{ type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.005, }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'es_0_4': 1 }
        },
        'es_0_20': {
            id: 'es_0_20', sub: 0, prestige: 1, position: { row: 6, column: 3 }, name: 'Reflective Mind', iconName: 'studying',
            desc: 'More than ever you\'re drawn inwards, to your own thoughts.',
            effect: [{
                type: 0, effectTarget: "mind", effectType: "additiveFlat", effectMagnitude: 2,
            },
            {
                type: 2, effectTarget: "mindTraining", effectType: "additivePercent", effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'es_0_21': {
            id: 'es_0_21',
            sub: 0, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Psionic Talent',
            iconName: 'studying',
            desc: 'You start being able to hear whispers of thoughts and feel minds and the fields they generate',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'es_0_20': 5 }
        },
        'es_0_22': {
            id: 'es_0_22',
            sub: 0, prestige: 1,
            position: { row: 8, column: 3 },
            name: 'Master of the Mind',
            iconName: 'studying',
            desc: 'Nothing in this world is infinite except for your intellect.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.1,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'es_0_21': 10 }
        },
        'es_0_23': {
            id: 'es_0_23',
            sub: 0, prestige: 1,
            position: { row: 9, column: 2 },
            name: 'Divergence',
            iconName: 'studying',
            desc: 'As your foes get weaker you get stronger',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "takedown",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 3,
            cost: [20, 20, 20],
            requires: { 'es_0_24': 10 }
        },
        'es_0_24': {
            id: 'es_0_24',
            sub: 0, prestige: 1,
            position: { row: 9, column: 3 },
            name: 'Psionic Talent II',
            iconName: 'studying',
            desc: 'Placeholder',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(4),
            requires: { 'es_0_21': 1 }
        },
        'es_0_25': {
            id: 'es_0_25',
            sub: 0, prestige: 1,
            position: { row: 7, column: 4 },
            name: 'Fragile Thoughts',
            iconName: 'studying',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.8,
            },
            {
                type: 1, // attribute boost
                effectTarget: "cooldownReduction",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [20],
            requires: { 'es_0_21': 1 }
        },
        'es_0_26': {
            id: 'es_0_26',
            sub: 0, prestige: 1,
            position: { row: 11, column: 3 },
            name: 'Agile Scion',
            iconName: 'studying',
            desc: '',
            effect: [
                {
                    type: 1, // attribute boost
                    effectTarget: "cooldownReduction",
                    effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.10,
                }],
            maxLevel: 1,
            cost: [200],
            requires: { 'es_0_24': 1 }
        },

        //#endregion
        //#region 1
        'es_1_0': {
            id: 'es_1_0',
            sub: 1,
            position: { row: 1, column: 3 },
            name: 'Practice controlling energy',
            iconName: 'studying',
            desc: 'You discover that you can alter the flow of energies in the world, but a swift mind is needed to counteract any imbalances.',
            effect: [{ type: 0, effectTarget: "agility", effectType: "additiveFlat", effectMagnitude: 1, },
            { type: 0, effectTarget: "mind", effectType: "additiveFlat", effectMagnitude: 1, },
            { type: 2, effectTarget: "agilityTraining", effectType: "additivePercent", effectMagnitude: 0.005, },
            { type: 2, effectTarget: "mindTraining", effectType: "additivePercent", effectMagnitude: 0.005, }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'es_1_2': {
            id: 'es_1_2',
            sub: 1,
            position: { row: 3, column: 2 },
            name: 'Energy Alteration: Celerity',
            iconName: 'studying',
            desc: 'Alter the energy around you to speed up your movements',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            }],
            maxLevel: 3,
            cost: [5, 20, 80],
            requires: { 'es_1_5': 1 },
        },
        'es_1_3': {
            id: 'es_1_3',
            sub: 1,
            position: { row: 3, column: 4 },
            name: 'Energy Alteration: Alacrity',
            iconName: 'studying',
            desc: 'Alter the energy around you to speed up the passing of time',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "cooldownReduction",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.015,
            }],
            maxLevel: 3,
            cost: [5, 20, 80],
            requires: { 'es_1_5': 1 },
        },
        'es_1_4': {
            id: 'es_1_4',
            sub: 1,
            position: { row: 2, column: 3 },
            name: 'Energy Annihilation I',
            iconName: 'studying',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'es_1_0': 10 },
        },
        'es_1_5': {
            id: 'es_1_5',
            sub: 1,
            position: { row: 3, column: 3 },
            name: 'Sustained Augmentation',
            iconName: 'studying',
            desc: 'You can set a part of you mind aside to constantly enhance your physical body',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            },
            {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            }
                ,
            {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'es_1_4': 10 },
        },
        'es_1_6': {
            id: 'es_1_6',
            sub: 1,
            position: { row: 4, column: 2 },
            name: 'Uncontrolled Creation',
            iconName: 'studying',
            desc: 'Sometimes the energy you create is more volatile than you expect',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "criticalChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'es_1_7': 10 },
        },
        'es_1_7': {
            id: 'es_1_7', sub: 1, position: { row: 4, column: 3 }, name: 'Energy Creation I', iconName: 'studying',
            desc: '',
            effect: [{ type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.0025 },
            { type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.0025 }],
            maxLevel: 25, cost: Array(25).fill(4), requires: { 'es_1_5': 1 },
        },
        'es_1_8': {
            id: 'es_1_8', sub: 1, position: { row: 6, column: 3 }, name: 'Transmutation', iconName: 'studying',
            desc: '',
            effect: [{ type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.0025 },
            { type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.0025 }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'es_1_7': 1 },
        },
        'es_1_20': {
            id: 'es_1_20',
            sub: 1, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'Practice controlling energy',
            iconName: 'studying',
            desc: 'You discover that you can alter the flow of energies in the world, but a swift mind is needed to counteract any imbalances.',
            effect: [{ type: 0, effectTarget: "agility", effectType: "additiveFlat", effectMagnitude: 1, },
            { type: 0, effectTarget: "mind", effectType: "additiveFlat", effectMagnitude: 1, },
            { type: 2, effectTarget: "agilityTraining", effectType: "additivePercent", effectMagnitude: 0.005, },
            { type: 2, effectTarget: "mindTraining", effectType: "additivePercent", effectMagnitude: 0.005, }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'es_1_22': {
            id: 'es_1_22',
            sub: 1, prestige: 1,
            position: { row: 7, column: 2 },
            name: 'Energy Alteration: Celerity',
            iconName: 'studying',
            desc: 'Alter the energy around you to speed up your movements',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            }],
            maxLevel: 3,
            cost: [5, 20, 80],
            requires: { 'es_1_25': 1 },
        },
        'es_1_23': {
            id: 'es_1_23',
            sub: 1, prestige: 1,
            position: { row: 7, column: 4 },
            name: 'Energy Alteration: Alacrity',
            iconName: 'studying',
            desc: 'Alter the energy around you to speed up the passing of time',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "cooldownReduction",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.015,
            }],
            maxLevel: 3,
            cost: [5, 20, 80],
            requires: { 'es_1_25': 1 },
        },
        'es_1_24': {
            id: 'es_1_24',
            sub: 1, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Energy Annihilation I',
            iconName: 'studying',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'es_1_20': 10 },
        },
        'es_1_25': {
            id: 'es_1_25',
            sub: 1, prestige: 1,
            position: { row: 8, column: 3 },
            name: 'Sustained Augmentation',
            iconName: 'studying',
            desc: 'You can set a part of you mind aside to constantly enhance your physical body',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            },
            {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            }
                ,
            {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'es_1_24': 10 },
        },
        'es_1_26': {
            id: 'es_1_26',
            sub: 1, prestige: 1,
            position: { row: 11, column: 4 },
            name: 'Uncontrolled Creation',
            iconName: 'studying',
            desc: 'Sometimes the energy you create is more volatile than you expect',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "criticalChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [50],
            requires: { 'es_1_27': 10 },
        },
        'es_1_27': {
            id: 'es_1_27',
            sub: 1, prestige: 1,
            position: { row: 9, column: 3 },
            name: 'Energy Creation I',
            iconName: 'studying',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(4),
            requires: { 'es_1_25': 1 },
        },
        //#endregion
        //#region 2
        'es_2_0': {
            id: 'es_2_0', sub: 2, position: { row: 1, column: 3 }, name: 'Spirit Sight', iconName: 'studying',
            desc: 'You start to see spirits, and they sometimes help you.',
            effect: [{ type: 2, effectTarget: "toughnessTraining", effectType: "additivePercent", effectMagnitude: 0.005 },
            { type: 2, effectTarget: "mindTraining", effectType: "additivePercent", effectMagnitude: 0.005 }],
            maxLevel: 10, cost: Array(10).fill(1),

        },
        'es_2_1': {
            id: 'es_2_1', sub: 2, position: { row: 2, column: 3 }, name: 'Friendly Possession', iconName: 'studying',
            desc: 'You learn that by gathering spirits in your body they can help protect it.',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.0025 },
            { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.0025 }],
            maxLevel: 25, cost: Array(25).fill(2), requires: { 'es_2_0': 5 },
        },
        'es_2_2': {
            id: 'es_2_2', sub: 2, position: { row: 3, column: 3 }, name: 'Spirit Form', iconName: 'studying',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "multPercent", effectMagnitude: 1.005 },
            { type: 0, effectTarget: "mind", effectType: "multPercent", effectMagnitude: 1.005 }],
            maxLevel: 10, cost: Array(10).fill(10), requires: { 'es_2_1': 10 },
        },
        'es_2_3': {
            id: 'es_2_3', sub: 2, position: { row: 3, column: 4 }, name: 'Spirit Form', iconName: 'studying',
            desc: '',
            effect: [{ type: 1, effectTarget: "dodgeChance", effectType: "additiveFlat", effectMagnitude: 0.05 }],
            maxLevel: 1, cost: [100], requires: { 'es_2_1': 10 },
        },
        'es_2_4': {
            id: 'es_2_4', sub: 2, position: { row: 4, column: 3 }, name: 'Metaphysical Body', iconName: 'studying',
            desc: '',
            effect: [{ type: 1, effectTarget: "maxHP", effectType: "multPercent", effectMagnitude: 1.05 }],
            maxLevel: 1, cost: [100], requires: { 'es_2_2': 10 },
        },
        'es_2_5': {
            id: 'es_2_5', sub: 2, position: { row: 5, column: 2 }, name: 'Ethereal Vitality', iconName: 'studying',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.1 },
            { type: 0, effectTarget: "toughness", effectType: "additiveFlat", effectMagnitude: 5000 }],
            maxLevel: 1, cost: [150], requires: { 'es_2_2': 10 },
        },
        'es_2_9': {
            id: 'es_2_9', sub: 2, position: { row: 6, column: 3 }, name: 'Spirit Summoning', iconName: 'studying',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.001 },
            { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.004 }],
            maxLevel: 1, cost: Array(999).fill(10), requires: { 'es_2_4': 1 },
        },
        'es_2_20': {
            id: 'es_2_20',
            sub: 2, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'Spirit Sight',
            iconName: 'studying',
            desc: 'You start to see spirits, and they sometimes help you.',
            effect: [{
                type: 2, // training boost
                effectTarget: "mindTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            }],
            maxLevel: 5,
            cost: [2, 2, 2, 2, 2],

        },
        'es_2_21': {
            id: 'es_2_21',
            sub: 2, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Friendly Possession',
            iconName: 'studying',
            desc: 'You learn that by gathering spirits in your body they can help protect it.',
            effect: [{
                type: 0, // training boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'es_2_20': 5 },
        },
        'es_2_22': {
            id: 'es_2_22',
            sub: 2, prestige: 1,
            position: { row: 8, column: 3 },
            name: 'Spirit Form I',
            iconName: 'studying',
            desc: '',
            effect: [{
                type: 0, // training boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            },
            {
                type: 1, // training boost
                effectTarget: "dodgeChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'es_2_21': 10 },
        },
        //#endregion
    },
    "mutant": {
        //#region 0
        'mu_0_0': {
            id: 'mu_0_0',
            sub: 0,
            position: { row: 1, column: 3 },
            name: 'Rapid Evolution',
            iconName: 'milerun',
            desc: 'Your constitution rapidly adapts to any new challenge',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 10,
            },
            {
                type: 2, // attribute boost
                effectTarget: "toughnessTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'mu_0_1': {
            id: 'mu_0_1',
            sub: 0,
            position: { row: 2, column: 3 },
            name: 'Alien Constitution',
            iconName: 'milerun',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'mu_0_0': 10 }
        },
        'mu_0_2': {
            id: 'mu_0_2', sub: 0, position: { row: 3, column: 3 }, name: 'Synthetic Body', iconName: 'milerun',
            desc: 'Your body doesnt break or tear, it just deforms and reforms.',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "multPercent", effectMagnitude: 1.1 }],
            maxLevel: 1, cost: [100], requires: { 'mu_0_1': 10 }
        },
        'mu_0_3': {
            id: 'mu_0_3', sub: 0, position: { row: 4, column: 3 }, name: 'Mutant Healing Factor', iconName: 'milerun',
            desc: 'Your cells are brimming with activity, wounds that take days to heal close in minutes',
            effect: [{ type: 1, effectTarget: "healthRegeneration", effectType: "additiveFlat", effectMagnitude: 0.0025, }],
            maxLevel: 1, cost: [100], requires: { 'mu_0_2': 1 }
        },
        'mu_0_4': {
            id: 'mu_0_4', sub: 0, position: { row: 4, column: 2 }, name: 'Cellular Predation', iconName: 'milerun',
            desc: '',
            effect: [{ type: 1, effectTarget: "takedown", effectType: "additiveFlat", effectMagnitude: 0.1, }],
            maxLevel: 1, cost: [100], requires: { 'mu_0_2': 1 }
        },
        'mu_0_8': {
            id: 'mu_0_8', sub: 0, position: { row: 4, column: 4 }, name: 'Internal Chemistry', iconName: 'milerun',
            desc: '',
            effect: [{ type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.01, },
            { type: 0, effectTarget: "mind", effectType: "additiveFlat", effectMagnitude: 5000, }],
            maxLevel: 1, cost: [150], requires: { 'mu_0_2': 1 }
        },
        'mu_0_9': {
            id: 'mu_0_9', sub: 0, position: { row: 6, column: 3 }, name: 'Efficient Replication', iconName: 'milerun',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.004, }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'mu_0_3': 1 }
        },
        'mu_0_20': {
            id: 'mu_0_20',
            sub: 0, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'Rapid Evolution',
            iconName: 'milerun',
            desc: 'Your constitution rapidly adapts to any new challenge',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1,
            },
            {
                type: 2, // attribute boost
                effectTarget: "toughnessTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'mu_0_21': {
            id: 'mu_0_21',
            sub: 0, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Alien Constitution',
            iconName: 'milerun',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'mu_0_20': 10 }
        },
        'mu_0_22': {
            id: 'mu_0_22',
            sub: 0, prestige: 1,
            position: { row: 8, column: 3 },
            name: 'Synthetic Body',
            iconName: 'milerun',
            desc: 'Your body doesnt break or tear, it just deforms and reforms.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.1,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_0_21': 10 }
        },
        'mu_0_23': {
            id: 'mu_0_23',
            sub: 0, prestige: 1,
            position: { row: 9, column: 3 },
            name: 'Mutant Healing Factor',
            iconName: 'milerun',
            desc: 'Your cells are brimming with activity, wounds that take days to heal close in minutes',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "healthRegeneration",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.002,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_0_22': 1 }
        },
        //#endregion
        //#region 1
        'mu_1_0': {
            id: 'mu_1_0',
            sub: 1,
            position: { row: 1, column: 3 },
            name: 'Cursed cells',
            iconName: 'milerun',
            desc: '',
            effect: [
                {
                    type: 0, // attribute boost
                    effectTarget: "toughness",
                    effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 10,
                },
                {
                    type: 2, // attribute boost
                    effectTarget: "mindTraining",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.01,
                }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'mu_1_1': {
            id: 'mu_1_1',
            sub: 1,
            position: { row: 2, column: 3 },
            name: 'Malignant Multiplication',
            iconName: 'milerun',
            desc: 'Your body grows and distorts even without your control, but it is useful in moments of combat.',
            effect: [
                {
                    type: 0, // attribute boost
                    effectTarget: "toughness",
                    effectType: "additivePercent",
                    effectMagnitude: 0.005,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "mind",
                    effectType: "additivePercent",
                    effectMagnitude: 0.005,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "agility",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: -0.005,
                }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'mu_1_0': 10 }
        },
        'mu_1_2': {
            id: 'mu_1_2',
            sub: 1,
            position: { row: 3, column: 3 },
            name: 'Terrifying Form',
            iconName: 'milerun',
            desc: '',
            effect: [
                {
                    type: 0, // attribute boost
                    effectTarget: "toughness",
                    effectType: "multPercent",
                    effectMagnitude: 1.05,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "mind",
                    effectType: "multPercent",
                    effectMagnitude: 1.05,
                }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_1_1': 10 }
        },
        'mu_1_3': {
            id: 'mu_1_3', sub: 1, position: { row: 3, column: 2 }, name: 'Efficient Limbic Pathways', iconName: 'milerun',
            desc: '',
            effect: [
                { type: 1, effectTarget: "actionSpeed", effectType: "additivePercent", effectMagnitude: 0.01 },
                { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.01 }],
            maxLevel: 5, cost: [20, 20, 20, 20, 20], requires: { 'mu_1_2': 1 }
        },
        'mu_1_4': {
            id: 'mu_1_4', sub: 1, position: { row: 4, column: 3 }, name: 'Meaty Flesh', iconName: 'milerun',
            desc: '',
            effect: [{ type: 1, effectTarget: "damageTaken", effectType: "multPercent", effectMagnitude: 0.95 }],
            maxLevel: 1, cost: [100], requires: { 'mu_1_2': 1 }
        },
        'mu_1_5': {
            id: 'mu_1_5', sub: 1, position: { row: 5, column: 4 }, name: 'Eldritch Thoughts', iconName: 'milerun',
            desc: '',
            effect: [{ type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.1 },
            { type: 0, effectTarget: "mind", effectType: "additiveFlat", effectMagnitude: 5000 }],
            maxLevel: 1, cost: [100], requires: { 'mu_1_4': 1 }
        },
        'mu_1_9': {
            id: 'mu_1_9', sub: 1, position: { row: 6, column: 3 }, name: 'Eternal Growth', iconName: 'milerun',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.003 },
            { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.002 }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'mu_1_4': 1 }
        },
        'mu_1_20': {
            id: 'mu_1_20',
            sub: 1, prestige: 1,
            position: { row: 1, column: 3 },
            name: 'Cursed cells',
            iconName: 'milerun',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additiveFlat", effectMagnitude: 10 },
            { type: 2, effectTarget: "mindTraining", effectType: "additivePercent", effectMagnitude: 0.01 }],
            maxLevel: 10,
            cost: Array(10).fill(1),
            requires: { 'mu_1_4': 1 }
        },
        'mu_1_21': {
            id: 'mu_1_21',
            sub: 1, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Malignant Multiplication',
            iconName: 'milerun',
            desc: 'Your body grows and distorts even without your control, but it is useful in moments of combat.',
            effect: [
                {
                    type: 0, // attribute boost
                    effectTarget: "toughness",
                    effectType: "additivePercent",
                    effectMagnitude: 0.005,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "mind",
                    effectType: "additivePercent",
                    effectMagnitude: 0.0025,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "agility",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: -0.005,
                }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'mu_1_20': 10 }
        },
        'mu_1_22': {
            id: 'mu_1_22',
            sub: 1, prestige: 1,
            position: { row: 8, column: 3 },
            name: 'Terrifying Form',
            iconName: 'milerun',
            desc: '',
            effect: [
                {
                    type: 0, // attribute boost
                    effectTarget: "toughness",
                    effectType: "multPercent",
                    effectMagnitude: 1.05,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "mind",
                    effectType: "multPercent",
                    effectMagnitude: 1.05,
                }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_1_21': 10 }
        },
        'mu_1_23': {
            id: 'mu_1_23',
            sub: 1, prestige: 1,
            position: { row: 8, column: 2 },
            name: 'Efficient Limbic Pathways',
            iconName: 'milerun',
            desc: '',
            effect: [
                {
                    type: 1, // attribute boost
                    effectTarget: "actionSpeed",
                    effectType: "additivePercent",
                    effectMagnitude: 0.01,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "mind",
                    effectType: "additivePercent",
                    effectMagnitude: 0.02,
                }],
            maxLevel: 5,
            cost: [20, 20, 20, 20, 20],
            requires: { 'mu_1_22': 1 }
        },
        'mu_1_24': {
            id: 'mu_1_24',
            sub: 1, prestige: 1,
            position: { row: 9, column: 3 },
            name: 'Damage Reduction',
            iconName: 'milerun',
            desc: '',
            effect: [
                {
                    type: 1, // attribute boost
                    effectTarget: "damageTaken",
                    effectType: "multPercent",
                    effectMagnitude: 0.95,
                }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_1_22': 1 }
        },
        //#endregion
        //#region 2
        'mu_2_0': {
            id: 'mu_2_0',
            sub: 2,
            position: { row: 1, column: 3 },
            name: 'Wild Constitution',
            iconName: 'milerun',
            desc: '',
            effect: [{ type: 0, effectTarget: "toughness", effectType: "additiveFlat", effectMagnitude: 10 },
            { type: 2, effectTarget: "strengthTraining", effectType: "additivePercent", effectMagnitude: 0.01 }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'mu_2_1': {
            id: 'mu_2_1',
            sub: 2,
            position: { row: 2, column: 3 },
            name: 'Jungle Gym',
            iconName: 'milerun',
            desc: '',
            effect: [
                {
                    type: 0, // attribute boost
                    effectTarget: "strength",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.0025,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "toughness",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.0025,
                }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'mu_2_0': 10 }
        },
        'mu_2_2': {
            id: 'mu_2_2',
            sub: 2,
            position: { row: 3, column: 3 },
            name: 'Proficient Morphing',
            iconName: 'milerun',
            desc: 'You become better at quickly changing your DNA on the fly.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            },
            {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            },
            {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_2_1': 10 }
        },
        'mu_2_3': {
            id: 'mu_2_3',
            sub: 2,
            position: { row: 5, column: 3 },
            name: 'Mutation: Scales',
            iconName: 'milerun',
            desc: 'Your turn the outside of your skin into a scaled mesh, reducing the damage of every impact',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "flatReductionHealth",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.002,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_2_2': 1 }
        },
        'mu_2_4': {
            id: 'mu_2_4',
            sub: 2,
            position: { row: 4, column: 2 },
            name: 'Bestial Speed',
            iconName: 'milerun',
            desc: 'Mixing animal DNA into yours enhances your speed.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_2_2': 1 }
        },
        'mu_2_5': {
            id: 'mu_2_5', sub: 2, position: { row: 4, column: 4 }, name: 'Bestial Fury', iconName: 'milerun',
            desc: 'Mixing animal DNA into yours to enhance your power.',
            effect: [{ type: 1, effectTarget: "damageDealt", effectType: "additiveFlat", effectMagnitude: 0.05 }],
            maxLevel: 1, cost: [100], requires: { 'mu_2_2': 1 }
        },
        'mu_2_9': {
            id: 'mu_2_9', sub: 2, position: { row: 6, column: 3 }, name: 'Darwinism', iconName: 'milerun',
            desc: '',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: 0.002 },
            { type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.002 },
            { type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.002 }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'mu_2_3': 1 }
        },
        'mu_2_20': {
            id: 'mu_2_20',
            sub: 2, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'Wild Constitution',
            iconName: 'milerun',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1,
            },
            {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'mu_2_21': {
            id: 'mu_2_21',
            sub: 2, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Jungle Gym',
            iconName: 'milerun',
            desc: '',
            effect: [
                {
                    type: 0, // attribute boost
                    effectTarget: "strength",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.0025,
                },
                {
                    type: 0, // attribute boost
                    effectTarget: "toughness",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.0025,
                },

                {
                    type: 2, // attribute boost
                    effectTarget: "strengthTraining",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.005,
                }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'mu_2_20': 10 }
        },
        'mu_2_22': {
            id: 'mu_2_22',
            sub: 2, prestige: 1,
            position: { row: 8, column: 3 },
            name: 'Proficient Morphing',
            iconName: 'milerun',
            desc: 'You become better at quickly changing your DNA on the fly.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            },
            {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            },
            {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_2_21': 10 }
        },
        'mu_2_23': {
            id: 'mu_2_23',
            sub: 2, prestige: 1,
            position: { row: 8, column: 2 },
            name: 'Mutation: Scales',
            iconName: 'milerun',
            desc: 'Your turn the outside of your skin into a scaled mesh, reducing the damage of every impact',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "flatReductionHealth",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.002,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_2_22': 1 }
        },
        'mu_2_24': {
            id: 'mu_2_24',
            sub: 2, prestige: 1,
            position: { row: 7, column: 4 },
            name: 'Bestial Speed',
            iconName: 'milerun',
            desc: 'Mixing animal DNA into yours enhances your speed.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_2_22': 1 }
        },
        'mu_2_25': {
            id: 'mu_2_25',
            sub: 2, prestige: 1,
            position: { row: 9, column: 4 },
            name: 'Bestial Fury',
            iconName: 'milerun',
            desc: 'Mixing animal DNA into yours to enhance your power.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "damageDealt",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'mu_2_22': 1 }
        },
        //#endregion
    },
    "ninja": {
        //#region 0
        'ni_0_0': {
            id: 'ni_0_0',
            sub: 0,
            position: { row: 1, column: 3 },
            name: 'Footwork',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 2,
            },
            {
                type: 2, // attribute boost
                effectTarget: "agilityTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'ni_0_1': {
            id: 'ni_0_1',
            sub: 0,
            position: { row: 2, column: 3 },
            name: 'Feline Agility',
            iconName: 'shadowB',
            desc: 'The whole world seems one muscle twitch away.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'ni_0_0': 10 }
        },
        'ni_0_2': {
            id: 'ni_0_2',
            sub: 0,
            name: 'Unnatural Speed',
            position: { row: 4, column: 3 },
            iconName: 'shadowB',
            desc: 'The faster you go the faster you get.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.05,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'ni_0_5': 10 }
        },
        'ni_0_3': {
            id: 'ni_0_3',
            sub: 0,
            position: { row: 3, column: 4 },
            name: 'Prenatural Reflexes',
            iconName: 'shadowB',
            desc: 'Your body moves out of danger before you even know it',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "dodgeChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.025,
            }],
            maxLevel: 2,
            cost: [25, 25],
            requires: {},
            requiresSkill: { 'deflect': 1 }
        },
        'ni_0_4': {
            id: 'ni_0_4',
            sub: 0,
            position: { row: 4, column: 2 },
            name: 'Martial Training',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }, {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'ni_0_2': 1 }
        },
        'ni_0_5': {
            id: 'ni_0_5',
            sub: 0,
            position: { row: 3, column: 3 },
            name: 'One with the Wind',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(10),
            requires: { 'ni_0_1': 1 }
        },
        'ni_0_6': {
            id: 'ni_0_6',
            sub: 0,
            position: { row: 5, column: 5 },
            name: 'Gale Force',
            iconName: 'shadowB',
            desc: '',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: .1 },
            { type: 0, effectTarget: "strength", effectType: "additiveFlat", effectMagnitude: 5000 }],
            maxLevel: 1, cost: [150], requires: { 'ni_0_2': 1 }
        },
        'ni_0_7': {
            id: 'ni_0_7',
            sub: 0,
            position: { row: 6, column: 3 },
            name: 'Lessons from One Thousand Fights',
            iconName: 'shadowB',
            desc: '',
            effect: [{ type: 0, effectTarget: "strength", effectType: "additivePercent", effectMagnitude: 0.0025 },
            { type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.0025 }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'ni_0_5': 1 }
        },
        //Prestige 1
        'ni_0_20': {
            id: 'ni_0_20',
            sub: 0, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'Footwork',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 2,
            },
            {
                type: 2, // attribute boost
                effectTarget: "agilityTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
            requires: { 'ni_0_3': 1 }
        },
        'ni_0_21': {
            id: 'ni_0_21',
            sub: 0, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Feline Agility',
            iconName: 'shadowB',
            desc: 'The whole world seems one muscle twitch away.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'ni_0_20': 10 }
        },
        'ni_0_22': {
            id: 'ni_0_22',
            sub: 0, prestige: 1,
            name: 'Unnatural Speed',
            position: { row: 8, column: 3 },
            iconName: 'shadowB',
            desc: 'The faster you go the faster you get.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.07,
            }],
            maxLevel: 1,
            cost: [100],
            requires: { 'ni_0_21': 10 }
        },
        'ni_0_23': {
            id: 'ni_0_23',
            sub: 0, prestige: 1,
            position: { row: 7, column: 4 },
            name: 'Prenatural Reflexes',
            iconName: 'shadowB',
            desc: 'Your body moves out of danger before you even know it',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "takedown",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 2,
            cost: [100, 250],
            requires: { 'ni_0_21': 20 }
        },
        'ni_0_24': {
            id: 'ni_0_24',
            sub: 0, prestige: 1,
            position: { row: 8, column: 2 },
            name: 'Martial Training',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }, {
                type: 2, // attribute boost
                effectTarget: "strengthTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'ni_0_22': 1 }
        },
        //#endregion
        //#region 1
        'ni_1_0': {
            id: 'ni_1_0',
            sub: 1,
            position: { row: 1, column: 3 },
            name: 'Strict Techniques',
            iconName: 'shadowB',
            desc: 'You must learn to execute moves exactly every time.',
            effect: [{
                type: 2, // attribute boost
                effectTarget: "agilityTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            },
            {
                type: 2, // attribute boost
                effectTarget: "mindTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'ni_1_1': {
            id: 'ni_1_1',
            sub: 1,
            position: { row: 2, column: 3 },
            name: 'Traditional Technique Scrolls',
            iconName: 'shadowB',
            desc: 'PLACEHOLDER',
            effect: [{
                type: 0, // secondary attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // secondary attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'ni_1_0': 10 }
        },
        'ni_1_2': {
            id: 'ni_1_2',
            sub: 1,
            position: { row: 3, column: 3 },
            name: 'Strategic Thinker',
            iconName: 'shadowB',
            desc: '',
            effect: [
                {
                    type: 0, // secondary attribute boost
                    effectTarget: "mind",
                    effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 1.1,
                }],
            maxLevel: 1,
            cost: [100],
            requires: { 'ni_1_1': 10 }
        },
        'ni_1_3': {
            id: 'ni_1_3',
            sub: 1,
            position: { row: 3, column: 4 },
            name: 'Quick Handsigns',
            iconName: 'shadowB',
            desc: '',
            effect: [
                {
                    type: 1, // secondary attribute boost
                    effectTarget: "cooldownReduction",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.02,
                }],
            maxLevel: 3,
            cost: [10, 20, 30],
            requires: { 'ni_1_2': 1 }
        },
        'ni_1_4': {
            id: 'ni_1_4',
            sub: 1,
            position: { row: 3, column: 2 },
            name: 'Chakra Circulation',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // secondary attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // secondary attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(4),
            requires: { 'ni_1_2': 1 }
        },
        'ni_1_5': {
            id: 'ni_1_5',
            sub: 1,
            position: { row: 4, column: 3 },
            name: 'Careful Preparations',
            iconName: 'shadowB',
            desc: '',
            effect: [
                {
                    type: 1, // secondary attribute boost
                    effectTarget: "cooldownReduction",
                    effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 1.05,
                }],
            maxLevel: 1,
            cost: [100],
            requires: { 'ni_1_2': 1 }
        },
        'ni_1_6': {
            id: 'ni_1_6', sub: 1, position: { row: 6, column: 3 }, name: 'Summoning Practice', iconName: 'shadowB',
            desc: '',
            effect: [
                { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.003 },
                { type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.002 }],
            maxLevel: 999, cost: Array(999).fill(10), requires: { 'ni_1_5': 1 }
        },
        'ni_1_7': {
            id: 'ni_1_7', sub: 1, position: { row: 5, column: 4 }, name: 'Wall Running', iconName: 'shadowB',
            desc: '',
            effect: [
                { type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.10 },
                { type: 0, effectTarget: "agility", effectType: "additiveFlat", effectMagnitude: 5000 }],
            maxLevel: 1, cost: [150], requires: { 'ni_1_5': 1 }
        },
        'ni_1_20': {
            id: 'ni_1_20',
            sub: 1, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'Strict Techniques',
            iconName: 'shadowB',
            desc: 'You must learn to execute moves exactly every time.',
            effect: [{
                type: 2, // attribute boost
                effectTarget: "agilityTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            },
            {
                type: 2, // attribute boost
                effectTarget: "mindTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'ni_1_21': {
            id: 'ni_1_21',
            sub: 1, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Traditional Technique Scrolls',
            iconName: 'shadowB',
            desc: 'PLACEHOLDER',
            effect: [{
                type: 0, // secondary attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // secondary attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'ni_1_20': 10 }
        },
        'ni_1_22': {
            id: 'ni_1_22', sub: 1, prestige: 1, position: { row: 8, column: 3 }, name: 'Strategic Thinker', iconName: 'shadowB',
            desc: '',
            effect: [{ type: 0, effectTarget: "mind", effectType: "multPercent", effectMagnitude: 1.01, }],
            maxLevel: 10, cost: Array(10).fill(10), requires: { 'ni_1_21': 10 }
        },
        'ni_1_23': {
            id: 'ni_1_23',
            sub: 1, prestige: 1,
            position: { row: 8, column: 4 },
            name: 'Careful Preparation',
            iconName: 'shadowB',
            desc: '',
            effect: [
                {
                    type: 1, // secondary attribute boost
                    effectTarget: "cooldownReduction",
                    effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                    effectMagnitude: 0.005,
                }],
            maxLevel: 1,
            cost: [20],
            requires: { 'ni_1_22': 1 }
        },
        'ni_1_24': {
            id: 'ni_1_24',
            sub: 1, prestige: 1,
            position: { row: 9, column: 2 },
            name: 'Chakra Circulation',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // secondary attribute boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            },
            {
                type: 0, // secondary attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0025,
            }],
            maxLevel: 25,
            cost: Array(25).fill(4),
            requires: { 'ni_1_22': 1 }
        },
        //#endregion
        //#region 2
        'ni_2_0': {
            id: 'ni_2_0',
            sub: 2,
            position: { row: 1, column: 3 },
            name: 'Occult Knowledge',
            iconName: 'shadowB',
            desc: 'Ancestors from ages past have started whispering forbidden secrets in your trainings',
            effect: [{
                type: 2, // attribute boost
                effectTarget: "toughnessTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            },
            {
                type: 2, // attribute boost
                effectTarget: "agilityTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'ni_2_1': {
            id: 'ni_2_1',
            sub: 2,
            position: { row: 5, column: 2 },
            name: 'Occult Endurance',
            iconName: 'shadowB',
            desc: 'Knowing the ways of life and death you can prepare contigencies against the latter.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            },
            {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 5000,
            }],
            maxLevel: 1,
            cost: [150],
            requires: { 'ni_2_2': 10 },
        },
        'ni_2_2': {
            id: 'ni_2_2',
            sub: 2,
            position: { row: 3, column: 3 },
            name: 'Shadowglide',
            iconName: 'shadowB',
            desc: 'Shadows envelop the air around you, smoothing and speeding your movements',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.01,
            },],
            maxLevel: 10,
            cost: Array(10).fill(10),
            requires: { 'ni_2_5': 10 },
        },
        'ni_2_3': {
            id: 'ni_2_3',
            sub: 2,
            position: { row: 4, column: 2 },
            name: 'Shadowglide: Fleeting Shadows',
            iconName: 'shadowB',
            desc: 'The shadows thin but fasten, making your movements lighter and quicker',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.01,
            },],
            maxLevel: 5,
            cost: Array(5).fill(10),
            requires: { 'ni_2_2': 10 },
        },
        'ni_2_4': {
            id: 'ni_2_4',
            sub: 2,
            position: { row: 4, column: 4 },
            name: 'Shadowglide: Thick Shade',
            iconName: 'shadowB',
            desc: 'The shadows thicker and coalesce around you, increasing the strength of your blows, but making your movements heavier',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "damageDealt",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.04,
            },
            {
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.98,
            }],
            maxLevel: 3,
            cost: [20, 20, 20],
            requires: { 'ni_2_2': 10 },
        },
        'ni_2_5': {
            id: 'ni_2_5',
            sub: 2,
            position: { row: 2, column: 3 },
            name: 'Forbidden Glyphs',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            },
            {
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(4),
            requires: { 'ni_2_0': 10 },
        },
        'ni_2_6': {
            id: 'ni_2_6', sub: 2, position: { row: 6, column: 3 }, name: 'Sacrifice', iconName: 'shadowB',
            desc: '',
            effect: [{ type: 0, effectTarget: "agility", effectType: "additivePercent", effectMagnitude: 0.004 },
            { type: 0, effectTarget: "mind", effectType: "additivePercent", effectMagnitude: 0.005 },
            { type: 0, effectTarget: "toughness", effectType: "additivePercent", effectMagnitude: 0.005 }],
            maxLevel: 25, cost: Array(25).fill(4), requires: { 'ni_2_0': 10 },
        },
        'ni_2_20': {
            id: 'ni_2_20',
            sub: 2, prestige: 1,
            position: { row: 6, column: 3 },
            name: 'Occult Knowledge',
            iconName: 'shadowB',
            desc: 'Ancestors from ages past have started whispering forbidden secrets in your trainings',
            effect: [{
                type: 2, // attribute boost
                effectTarget: "toughnessTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            },
            {
                type: 2, // attribute boost
                effectTarget: "agilityTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'ni_2_21': {
            id: 'ni_2_21',
            sub: 2, prestige: 1,
            position: { row: 6, column: 5 },
            name: 'Occult Endurance',
            iconName: 'shadowB',
            desc: 'Knowing the ways of life and death you can prepare contigencies against the latter.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            },
            {
                type: 2, // attribute boost
                effectTarget: "mindTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(2),
            requires: { 'ni_2_20': 10 },
        },
        'ni_2_22': {
            id: 'ni_2_22',
            sub: 2, prestige: 1,
            position: { row: 8, column: 2 },
            name: 'Shadowglide',
            iconName: 'shadowB',
            desc: 'Shadows envelop the air around you, smoothing and speeding your movements',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.01,
            },],
            maxLevel: 20,
            cost: Array(10).fill(2).concat(Array(10).fill(5)),
            requires: { 'ni_2_25': 10 },
        },
        'ni_2_23': {
            id: 'ni_2_23',
            sub: 2, prestige: 1,
            position: { row: 9, column: 2 },
            name: 'Shadowglide: Fleeting Shadows',
            iconName: 'shadowB',
            desc: 'The shadows thin but fasten, making your movements lighter and quicker',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.01,
            },],
            maxLevel: 15,
            cost: Array(5).fill(5).concat(Array(5).fill(10), Array(5).fill(20)),
            requires: { 'ni_2_22': 12 },
        },
        'ni_2_24': {
            id: 'ni_2_24',
            sub: 2, prestige: 1,
            position: { row: 7, column: 2 },
            name: 'Shadowglide: Thick Shade',
            iconName: 'shadowB',
            desc: 'The shadows thicker and coalesce around you, increasing the strength of your blows, but making your movements heavier',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "damageDealt",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.04,
            },
            {
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.98,
            }],
            maxLevel: 5,
            cost: [10, 20, 40, 80, 160],
            requires: { 'ni_2_22': 12 },
        },
        'ni_2_25': {
            id: 'ni_2_25',
            sub: 2, prestige: 1,
            position: { row: 7, column: 3 },
            name: 'Forbidden Glyphs',
            iconName: 'shadowB',
            desc: '',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            },
            {
                type: 0, // attribute boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.005,
            }],
            maxLevel: 25,
            cost: Array(25).fill(4),
            requires: { 'ni_2_20': 10 },
        },
        //#endregion
    },
}