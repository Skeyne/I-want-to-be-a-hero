const classTreeNames = {
    'human': ['Aspiring Hero'],
    'superhuman': ['Might', 'Titan', 'Spirit'],
    'mutant': ['Biologic', 'Abomination', 'Bestial'],
    'esper': ['Psionic', 'Matter', 'Spiritual'],
    'ninja': ['Bladelore', 'Ninjutsu', 'Shadowcraft'],
}
classTrees = {
    'human': 1,
    'superhuman': 3,
    'mutant': 3,
    'esper': 3,
    'ninja': 3,
}
skillLibrary = {
    "human": {
        //#region 0
        //#endregion
        'h_0': {
            id: 'h_0',
            sub: 0,
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
            cost: [2, 2, 2],
            requires: { 'h_3': 3, },
        },
        'h_5': {
            id: 'h_5',
            sub: 0,
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
        'sh_0_0': {
            id: 'sh_0_0',
            sub: 0,
            position: { row: 1, column: 3 },
            name: 'Inhuman strength',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve ever been before',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            }],
            maxLevel: 50,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3), Array(10).fill(4), Array(10).fill(5)),
        },
        'sh_0_1': {
            id: 'sh_0_1',
            sub: 0,
            position: { row: 2, column: 3 },
            name: 'Matter Over Mind',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve every been before',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.25,
            }],
            maxLevel: 3,
            cost: [10, 100, 1000],
            requires: { 'sh_0_0': 10 }
        },
        'sh_0_2': {
            id: 'sh_0_2',
            sub: 0,
            position: { row: 3, column: 3 },
            name: 'Overwhelming strength',
            iconName: 'calisthenics',
            desc: 'Even without trying you\'re stronger than you\'ve every been before',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "overwhelm",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.5,
            }],
            maxLevel: 1,
            cost: [10],
            requires: { 'sh_0_1': 1 }
        },
        //#endregion
        //#region 1
        'sh_1_0': {
            id: 'sh_1_0',
            sub: 1,
            position: { row: 1, column: 3 },
            name: 'Giant Training',
            iconName: 'calisthenics',
            desc: 'PLACEHOLDER',
            effect: [{
                type: 2, // training boost
                effectTarget: "strengthTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            },
            {
                type: 2, // training boost
                effectTarget: "toughnessTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            }],
            maxLevel: 5,
            cost: [5, 10, 20, 40, 80],
        },
        'sh_1_1': {
            id: 'sh_1_1',
            sub: 1,
            position: { row: 2, column: 3 },
            name: 'Colossal Constitution',
            iconName: 'calisthenics',
            desc: 'PLACEHOLDER',
            effect: [{
                type: 0,
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            },
            {
                type: 0,
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            }],
            maxLevel: 5,
            requires: { 'sh_1_0': 1 },
            cost: [5, 10, 20, 40, 80],
        },
        'sh_1_2': {
            id: 'sh_1_2',
            sub: 1,
            position: { row: 3, column: 3 },
            name: 'Titanic Blows',
            iconName: 'calisthenics',
            desc: 'Rather than throw meek punches you put measured time into each strike',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.98,
            },{
                type: 1, // attribute boost
                effectTarget: "powerMultiplier",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.04,
            }],
            maxLevel: 3,
            requires: { 'sh_1_1': 1 },
            cost: [4,8,16],
        },
        //#endregion
        //#region 2
        'sh_2_0': {
            id: 'sh_2_0',
            sub: 2,
            position: { row: 1, column: 3 },
            name: 'Circular Breathing',
            iconName: 'calisthenics',
            desc: 'PLACEHOLDER',
            effect: [{
                type: 2, // training boost
                effectTarget: "strengthTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            },
            {
                type: 2, // training boost
                effectTarget: "mindTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            }],
            maxLevel: 5,
            cost: [5, 10, 20, 40, 80],
        },'sh_2_1': {
            id: 'sh_2_1',
            sub: 2,
            position: { row: 2, column: 3 },
            name: 'Body & Soul',
            iconName: 'calisthenics',
            desc: 'PLACEHOLDER',
            effect: [{
                type: 0, // training boost
                effectTarget: "strength",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            },
            {
                type: 0, // training boost
                effectTarget: "mind",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 5,
            cost: [5, 10, 20, 40, 80],
            requires: { 'sh_2_0': 1}
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
                effectMagnitude: 1,
            }],
            maxLevel: 5,
            cost: Array(5).fill(1),
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
            maxLevel: 50,
            cost: Array(25).fill(1).concat(Array(25).fill(2)),
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
            maxLevel: 5,
            cost: [10, 100, 1000, 10000, 100000],
            requires: { 'es_0_1': 10 }
        },
        'es_0_3': {
            id: 'es_0_3',
            sub: 0,
            position: { row: 3, column: 4 },
            name: 'Divergence',
            iconName: 'studying',
            desc: 'As your foes get weaker you get stronger',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "takedown",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            }],
            maxLevel: 3,
            cost: [5, 20, 80],
            requires: { 'es_0_1': 1 }
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
            { type: 0, effectTarget: "mind", effectType: "additiveFlat", effectMagnitude: 1, }],
            maxLevel: 10,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3))
        },
        'es_1_2': {
            id: 'es_1_2',
            sub: 1,
            position: { row: 2, column: 2 },
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
            requires: { 'es_1_0': 1 },
        },
        'es_1_3': {
            id: 'es_1_3',
            sub: 1,
            position: { row: 2, column: 4 },
            name: 'Energy Alteration: Alacrity',
            iconName: 'studying',
            desc: 'Alter the energy around you to alter the passing of time',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "cooldownReduction",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.015,
            }],
            maxLevel: 3,
            cost: [5, 20, 80],
            requires: { 'es_1_0': 1 },
        },
        'es_1_4': {
            id: 'es_1_4',
            sub: 1,
            position: { row: 3, column: 3 },
            name: 'Uncontrolled Creation',
            iconName: 'studying',
            desc: 'Sometimes the energy you create is more volatile than you expect',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "criticalChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 3,
            cost: [5, 20, 80],
            requires: { 'es_1_0': 1 },
        },
        //#endregion
        //#region 2
        'es_2_0': {
            id: 'es_2_0',
            sub: 2,
            position: { row: 1, column: 3 },
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
        'es_2_1': {
            id: 'es_2_1',
            sub: 2,
            position: { row: 2, column: 4 },
            name: 'Friendly Possession',
            iconName: 'studying',
            desc: 'You learn that by gathering spirits in your body they can help protect it.',
            effect: [{
                type: 0, // training boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.01,
            }],
            maxLevel: 5,
            cost: [2, 2, 2, 2, 2],
            requires: { 'es_2_0': 1 },
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
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            }],
            maxLevel: 50,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3), Array(10).fill(4), Array(10).fill(5)),
        },
        'mu_0_1': {
            id: 'mu_0_1',
            sub: 0,
            position: { row: 2, column: 3 },
            name: 'Synthetic Body',
            iconName: 'milerun',
            desc: 'Your body doesnt break or tear, it just deforms and reforms.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.25,
            }],
            maxLevel: 3,
            cost: [10, 100, 1000],
            requires: { 'mu_0_0': 10 }
        },
        'mu_0_2': {
            id: 'mu_0_2',
            sub: 0,
            position: { row: 3, column: 3 },
            name: 'Mutant Healing Factor',
            iconName: 'milerun',
            desc: 'Your cells are brimming with activity, wounds that take days to heal close in minutes',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "healthRegeneration",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.0015,
            }],
            maxLevel: 3,
            cost: [10, 100, 1000],
            requires: { 'mu_0_1': 1 }
        },
        //#endregion
        //#region 1
        'mu_1_0': {
            id: 'mu_1_0',
            sub: 1,
            position: { row: 1, column: 3 },
            name: 'Unimplemented',
            iconName: 'milerun',
            desc: 'This is just for testing. Have some free toughness',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 10,
            }],
            maxLevel: 1,
            cost: [1],
        },
        //#endregion
        //#region 2
        'mu_2_0': {
            id: 'mu_2_0',
            sub: 2,
            position: { row: 1, column: 3 },
            name: 'Unimplemented',
            iconName: 'milerun',
            desc: 'This is just for testing. Have some free toughness',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 10,
            }],
            maxLevel: 10,
            cost: Array(10).fill(1),
        },
        'mu_2_1': {
            id: 'mu_2_1',
            sub: 2,
            position: { row: 2, column: 3 },
            name: 'Mutation: Scales',
            iconName: 'milerun',
            desc: 'Your turn the outside of your skin into a scaled mesh, reducing the damage of every impact',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "flatReductionHealth",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.002,
            }],
            maxLevel: 3,
            cost: [10, 100, 1000],
            requires: { 'mu_2_0': 1 }
        },
        'mu_2_2': {
            id: 'mu_2_2',
            sub: 2,
            position: { row: 2, column: 4 },
            name: 'Bestial Speed',
            iconName: 'milerun',
            desc: 'Mixing animal DNA into yours you enhance your speed.',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "actionSpeed",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 1,
            cost: [10],
            requires: { 'mu_2_0': 10 }
        },
        //#endregion


    },
    "ninja": {
        //#region 0
        'ni_0_0': {
            id: 'ni_0_0',
            sub: 0,
            position: { row: 1, column: 3 },
            name: 'Feline Agility',
            iconName: 'shadowB',
            desc: 'The whole world seems one muscle twitch away.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.02,
            }],
            maxLevel: 50,
            cost: Array(10).fill(1).concat(Array(10).fill(2), Array(10).fill(3), Array(10).fill(4), Array(10).fill(5)),
        },
        'ni_0_1': {
            id: 'ni_0_1',
            sub: 0,
            name: 'Unnatural Speed',
            position: { row: 2, column: 3 },
            iconName: 'shadowB',
            desc: 'The faster you go the faster you get.',
            effect: [{
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 1.25,
            }],
            maxLevel: 3,
            cost: [10, 100, 1000],
            requires: { 'ni_0_0': 10 }
        },
        'ni_0_2': {
            id: 'ni_0_2',
            sub: 0,
            position: { row: 3, column: 3 },
            name: 'Prenatural Reflexes',
            iconName: 'shadowB',
            desc: 'Your body moves out of danger before you even know it',
            effect: [{
                type: 1, // attribute boost
                effectTarget: "dodgeChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.05,
            }],
            maxLevel: 4,
            cost: [5, 20, 40, 80],
            requires: { 'ni_0_1': 1 }
        },
        //#endregion
        //#region 1
        'ni_1_0': {
            id: 'ni_1_0',
            sub: 1,
            position: { row: 1, column: 3 },
            name: 'Deadly',
            iconName: 'shadowB',
            desc: 'Increases your critical chance (crits deal 50% more damage by default).',
            effect: [{
                type: 1, // secondary attribute boost
                effectTarget: "criticalChance",
                effectType: "additiveFlat", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.01,
            }],
            maxLevel: 10,
            cost: Array(10).fill(5).concat(Array(10).fill(10)),
        },
        'ni_2_0': {
            id: 'ni_2_0',
            sub: 1,
            position: { row: 2, column: 3 },
            name: 'Agility Training Boost',
            iconName: 'shadowB',
            desc: 'PLACEHOLDER',
            effect: [{
                type: 2, // training boost
                effectTarget: "agilityTraining",
                effectType: "additivePercent", //additiveFlat, additivePercent, multPercent
                effectMagnitude: 0.2,
            }],
            maxLevel: 5,
            cost: [5, 10, 20, 40, 80],
        },
        //#endregion
        //#region 2

        //#endregion
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
        class: 'human',
        sub: 0,
        position: { row: 1, column: 1 },
        type: 0,
        sub: 0,
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
        cost: 2,
    },
    'jab': {
        class: 'human',
        type: 0,
        sub: 0,
        position: { row: 2, column: 1 },
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
        cost: 0,
    },
    'haymaker': {
        class: 'human',
        type: 0,
        sub: 0,
        position: { row: 3, column: 1 },
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
        cost: 2,
    },
    'crowbar': {
        class: 'human',
        type: 0,
        sub: 0,
        position: { row: 4, column: 1 },
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
        cost: 2,
    },
    'throwingKnife': {
        class: 'human',
        sub: 0,
        position: { row: 5, column: 1 },
        class: 'human',
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
        cost: 2,
    },
    'firecrackers': {
        class: 'human',
        type: 0,
        sub: 0,
        position: { row: 6, column: 1 },
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
        cost: 2,
    },
    //Esper
    'spiritFist': {
        class: 'esper',
        type: 0,
        sub: 2,
        position: { row: 1, column: 1 },
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
        cost: 1,
    },
    'telekineticProjectile': {
        class: 'esper',
        type: 0,
        sub: 0,
        position: { row: 1, column: 1 },
        category: 'ranged',
        name: "Telekinetic Projectile",
        description: "Use your psionic powers to thrust nearby matter towards your enemy.",
        iconName: "telekineticProjectile",
        damage: 1,
        damageRatios: [0, 0, 1.8, 0],
        damageRange: [0.8, 1.1],
        time: 3000,
        cooldownTime: 5000,
        range: [10, 60],
        cost: 5,
    },
    'psionicPulse': {
        class: 'esper',
        type: 0,
        sub: 0,
        position: { row: 3, column: 1 },
        category: 'melee',
        name: "Psionic Pulse",
        description: "Emit a short-range pulse that damages and knocks back nearby enemies.",
        iconName: "psionicPulse",
        damage: 1,
        damageRatios: [0, .5, 1.5, 0],
        damageRange: [1, 1.2],
        effects: {
            'knockback': 10,
            'aoe': 20,
        },
        time: 3000,
        cooldownTime: 10000,
        range: [20, 20],
        cost: 5,
    },
    'psionicBarrier': {
        class: 'esper',
        type: 2,
        sub: 0,
        position: { row: 2, column: 5 },
        category: 'ranged',
        name: "Psionic Barrier",
        description: "Form a temporary barrier to block attacks.",
        iconName: "psionicBarrier",
        damage: 0,
        damageRatios: [0, 0, 0.5, 0],
        damageRange: [1, 1],
        effects: {
            'shield': 0,
        },
        time: 1000,
        cooldownTime: 20000,
        range: [0, 0],
        cost: 5,
    },
    'repulsionWave': {
        class: 'esper',
        type: 0,
        sub: 1,
        position: { row: 3, column: 1 },
        category: 'melee',
        name: "Repulsion Wave",
        description: "Emit reality-altering waves to give you some space",
        iconName: "repulsionWave",
        damage: 0,
        damageRatios: [0, .1, .2, 0],
        damageRange: [1, 1],
        effects: {
            'knockback': 15,
            'aoe': 30,
            'repeat': 0.75,
        },
        time: 500,
        cooldownTime: 30000,
        range: [30, 30],
        cost: 5,
    },
    //Mutant
    'bulkFist': {
        class: 'mutant',
        type: 0,
        sub: 0,
        position: { row: 1, column: 1 },
        category: 'melee',
        name: "Bulk Fist",
        description: "Enlarge your fist to deliver a solid blow.",
        iconName: "bulkFist",
        damage: 1,
        damageRatios: [.5, 1, 0, 0],
        damageRange: [1, 1.1],
        time: 4000,
        cooldownTime: 0,
        range: [5, 5],
        cost: 1,
    },
    'tentaclePull': {
        class: 'mutant',
        type: 0,
        sub: 1,
        position: { row: 1, column: 1 },
        category: 'melee',
        name: "Tentacle Pull",
        description: "Morph your arm out into a tentacle and pull your foe closer",
        iconName: "tentaclePull",
        damage: 1,
        damageRatios: [.1, .3, 0, 0],
        damageRange: [1, 1],
        effects: {
            'pull': 30
        },
        time: 1500,
        cooldownTime: 5000,
        range: [60, 60],
        cost: 5,
    },
    'corrosiveBurst': {
        class: 'mutant',
        type: 0,
        sub: 0,
        position: { row: 4, column: 1 },
        category: 'melee',
        name: "Corrosive Burst",
        description: "Your skin explodes, covering nearby foes in acid.",
        iconName: "corrosiveBurst",
        damage: 1,
        damageRatios: [0, 1.6, 0.6, 0],
        damageRange: [0.8, 1.2],
        effects: {
            'aoe': 10
        },
        time: 4000,
        cooldownTime: 10000,
        range: [10, 10],
        cost: 5,
    },
    'engulf': {
        class: 'mutant',
        type: 0,
        sub: 0,
        position: { row: 3, column: 5 },
        category: 'melee',
        name: "Engulf",
        description: "Try to completely subdue your target by englufing them. Deals extra damage to damaged enemies.",
        iconName: "engulf",
        damage: 1,
        damageRatios: [3, 7, 0, 0],
        damageRange: [0.9, 1],
        effects: {
            'takedown': 1,
        },
        time: 6000,
        cooldownTime: 30000,
        range: [5, 5],
        cost: 5,
    },
    'clawStrike': {
        class: 'mutant',
        type: 0,
        sub: 2,
        position: { row: 1, column: 1 },
        category: 'melee',
        name: "Clawstrike",
        description: "Rapidly grow claws out of your fist for a feral strike.",
        iconName: "clawStrike",
        damage: 0,
        damageRatios: [0, .2, 0, 0.2],
        damageRange: [.8, 1.2],
        time: 1500,
        cooldownTime: 0,
        range: [5, 5],
        cost: 1,
    },
    'monkeySmash': {
        class: 'mutant',
        type: 0,
        sub: 2,
        position: { row: 3, column: 5 },
        category: 'melee',
        name: "Monkey Smash",
        description: "With the power of monke strength, smash your target into the ground, briefly stunning him. Deals extra damage to damaged enemies.",
        iconName: "monkeySmash",
        damage: 0,
        damageRatios: [3, 1, 0, 0],
        damageRange: [0.8, 1],
        effects: {
            'stun': 3,
        },
        time: 6000,
        cooldownTime: 12000,
        range: [5, 5],
        cost: 5,
    },
    //Superhuman
    'simplePunch': {
        class: 'superhuman',
        type: 0,
        sub: 0,
        position: { row: 1, column: 1 },
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
        cost: 1,
    },
    'multipleSimplePunches': {
        class: 'superhuman',
        type: 0,
        sub: 0,
        position: { row: 3, column: 1 },
        category: 'melee',
        name: "Multiple Simple Punches",
        description: "I fear not the man who has practiced 10,000 punches once, but I fear the man who has practiced one 10,000 punches, 10,000 times.",
        iconName: "multipleSimplePunches",
        damage: 1,
        damageRatios: [.3, 0, 0, .3],
        damageRange: [0.8, 1.2],
        effects: {
            'repeat': 0.5,
        },
        time: 500,
        cooldownTime: 2000,
        range: [5, 5],
        cost: 5,
    },
    'titanicSwing': {
        class: 'superhuman',
        type: 0,
        sub: 1,
        position: { row: 1, column: 1 },
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
        cost: 5,
    },
    'airCannon': {
        class: 'superhuman',
        type: 0,
        sub: 1,
        position: { row: 3, column: 1 },
        category: 'ranged',
        name: "Air Cannon",
        description: "You punch the air so hard that a shockwave is launched towards the enemy",
        iconName: "airCannon",
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
        cost: 5,
    },
    'secondWind': {
        class: 'superhuman',
        type: 2,
        sub: 2,
        position: { row: 1, column: 1 },
        category: 'ranged',
        name: "Second Wind",
        description: "Take a few breaths and let your supernatural constitution catch up.",
        iconName: "secondWind",
        damage: 0,
        damageRatios: [0.06, .6, 0, 0],
        damageRange: [1, 1],
        effects: {
            'heal': 0,
            'hope': 1,
        },
        time: 1000,
        cooldownTime: 14000,
        range: [0, 0],
        cost: 5,
    },
    'kiBlast': {
        class: 'superhuman',
        type: 0,
        sub: 2,
        position: { row: 2, column: 5 },
        category: 'ranged',
        name: "Ki Blast",
        description: "Form and discharge a blast of ki from your hand",
        iconName: "kiBlast",
        damage: 0,
        damageRatios: [1, 0, 1, 0],
        damageRange: [1, 1.1],
        effects: {},
        time: 3000,
        cooldownTime: 5000,
        range: [0, 20],
        cost: 5,
    },
    //NINJA
    'katana': {
        class: 'ninja',
        type: 0,
        sub: 0,
        position: { row: 1, column: 1 },
        category: 'melee',
        name: "Katana",
        description: "A ninja's weapon (?).",
        iconName: "katana",
        damage: 0,
        damageRatios: [.4, 0, 0, .6],
        damageRange: [0.8, 1.1],
        time: 2500,
        cooldownTime: 0,
        range: [5, 5],
        cost: 1,
    },
    'deflect': {
        class: 'ninja',
        type: 2,
        sub: 0,
        position: { row: 2, column: 5 },
        category: 'melee',
        name: "Deflect",
        description: "Be ready to lessen the blow of the next attack.",
        iconName: "deflect",
        damage: 0,
        damageRatios: [0.05, 0, 0, 0.05],
        damageRange: [1, 1],
        effects: {
            'shield': 0,
        },
        cost: 5,
        time: 500,
        cooldownTime: 5000,
        range: [0, 0],
        cost: 5,
    },
    'shadowStrike': {
        class: 'ninja',
        type: 0,
        sub: 2,
        position: { row: 2, column: 1 },
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
        cost: 5,
    },
    'shuriken': {
        class: 'ninja',
        type: 0,
        sub: 1,
        position: { row: 1, column: 1 },
        category: 'ranged',
        name: "Shuriken",
        description: "Launch a number of shuriken at your foes.",
        iconName: "shuriken",
        damage: 1,
        damageRatios: [0, 0, 0.05, .15],
        damageRange: [1, 1.1],
        effects: {
            'aoe': 5,
            'repeat': 0.75,
        },
        time: 500,
        cooldownTime: 2000,
        range: [10, 60],
        cost: 5,
    },
    'flashStep': {
        class: 'ninja',
        type: 1,
        sub: 1,
        position: { row: 3, column: 1 },
        category: 'movement',
        name: "Flash Step",
        description: "Use the secret techniques to rapidly travel a greater distance.",
        iconName: "move",
        damage: 0,
        time: 500,
        cooldownTime: 5000,
        range: [20, 0],
        cost: 5,
    },
    'diversion': {
        class: 'ninja',
        type: 1,
        sub: 1,
        position: { row: 4, column: 1 },
        category: 'movement',
        name: "Diversion",
        description: "Drop a smoke cloud and use the opportunity to reappear a distance away",
        iconName: "placeholder",
        damage: 0,
        time: 1000,
        cooldownTime: 15000,
        range: [0, 30],
        cost: 5,
    },
    'bladeStorm': {
        class: 'ninja',
        type: 0,
        sub: 0,
        position: { row: 3, column: 1 },
        category: 'melee',
        name: "Blade Storm",
        description: "Unleash a flurry of slashes in a surge of energy.",
        iconName: "bladeStorm",
        damage: 0,
        damageRatios: [0.1, 0, 0, 0.15],
        damageRange: [0.5, 1.5],
        effects: {
            'repeat': 0.9,
        },
        time: 100,
        cooldownTime: 10000,
        range: [5, 5],
        cost: 5,
    },
    'windSlash': {
        class: 'ninja',
        type: 0,
        sub: 0,
        position: { row: 4, column: 1 },
        category: 'ranged',
        name: "Wind Slash",
        description: "You prepare, and swing your katana so quickly that a blade of wind forms",
        iconName: "windSlash",
        damage: 0,
        damageRatios: [1.5, 0, 0, 2.5],
        damageRange: [0.9, 1.4],
        effects: {
            criticalChance: 0.1,
        },
        time: 4000,
        cooldownTime: 20000,
        range: [0, 50],
        cost: 5,
    },
    'drainingPalm': {
        class: 'ninja',
        type: 0,
        sub: 2,
        position: { row: 1, column: 1 },
        category: 'melee',
        name: "Draining Palm",
        description: "Learning occult techniques, you use shadow powers to drain your enemies' lifeforce",
        iconName: "drainingPalm",
        damage: 0,
        damageRatios: [0, 1, 1, 0],
        damageRange: [1, 1.2],
        effects: {
            lifesteal: 0.5,
        },
        time: 4000,
        cooldownTime: 7000,
        range: [5, 5],
        cost: 5,
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
        range: [5, 0],
    },
    'wait': {
        type: 1,
        category: 'movement',
        name: "Wait",
        description: "Got nothing to do.",
        iconName: "wait",
        damage: 0,
        time: 1000,
        cooldownTime: 0,
        range: [0, 0],
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
        25: ['airCannon', 'secondWind'],
    },
    'mutant': {
        0: ['bulkFist'],
        10: ['corrosiveBurst', 'tentaclePull'],
        25: ['engulf']
    },
    'esper': {
        0: ['spiritFist'],
        10: ['telekineticProjectile', 'psionicPulse'],
        25: ['psionicBarrier', 'repulsionWave']
    },
    'ninja': {
        0: ['katana'],
        10: ['shadowStrike', 'shuriken'],
        25: ['flashStep', 'bladeStorm', 'diversion'],
    },
    'cyborg': {
        0: ['punch'],
    },
}
// let previewRowHeader = document.createElement("div");
// previewRowHeader.setAttribute("id", "previewRowHeader");
// let previewRowBody = document.createElement("div");
// previewRowBody.setAttribute("id", "previewRowBody");
// let abilityRequirementsGrid = document.getElementById("abilityRequirementsGrid");
// abilityRequirementsGrid.append(previewRowHeader);
// abilityRequirementsGrid.append(previewRowBody);
let loadoutContainer = document.getElementById("abilityLoadoutContainer");
//version fixing stuff
if (playerStats.class != 'human') { playerStats.abilitySlots = 4 } else { playerStats.abilitySlots = 3 };
let slots = [];
RebuildSlots();
function generateSubclassTabs() {
    let container = document.getElementById("subClassTabContainer");
    container.innerHTML = "";
    let treeContainer = document.getElementById("passiveTreeContainer");
    treeContainer.innerHTML = "";
    for (let index = 0; index < classTrees[playerStats.class]; index++) {
        let b = document.createElement("button");
        b.className = "pickle subclassTabButton";
        b.innerHTML = classTreeNames[playerStats.class][index];
        b.style.width = 100 / classTrees[playerStats.class] + '%';
        b.onclick = () => { changeSubclassTab(index) };
        container.append(b);
        let d = document.createElement("div");
        d.className = "gridSkills";
        d.style.display = 'none';
        treeContainer.append(d);
    }
}
function changeSubclassTab(tab) {
    let buttonContainer = document.getElementById("subClassTabContainer");
    let treeContainer = document.getElementById("passiveTreeContainer");
    let tabs = treeContainer.children;
    for (let index = 0; index < classTrees[playerStats.class]; index++) {
        if (index == tab) {
            tabs[index].style.display = '';
            buttonContainer.children[index].className = "pickle subclassTabButtonActive";
        } else {
            tabs[index].style.display = 'none';
            buttonContainer.children[index].className = "pickle subclassTabButton";
        }
    }
}
generateSubclassTabs();
changeSubclassTab(0);
function RebuildSlots() {
    loadoutContainer.innerHTML = "";
    slots = [];
    for (let index = 0; index < playerStats.abilitySlots; index++) {

        let slot = document.createElement("select");
        slot.setAttribute("class", "abilitySlot pickle");
        slots.push(slot);
        slot.setAttribute("onchange", `changeAbilitySlot(${index})`);
        loadoutContainer.appendChild(slot);
    }
}

//checkAbilityRequirements();

//populateAbilityRequirements();
//UpdateAbilityPreview();
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
            t.setAttribute("class", "tooltiptext oxanium");
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
let abilityButtonDict = {};
populatePassiveTree();
if (isOutdated) { resetSkills(); }
function populatePassiveTree() {
    let treeContainer = document.getElementById("passiveTreeContainer");
    let tabs = treeContainer.children;
    for (let index = 0; index < tabs.length; index++) {
        tabs[index].innerHTML = "";
    }
    passiveButtonDict = {};
    if (!skillLibrary.hasOwnProperty(playerStats.class)) { console.error("ERROR: CLASS PASSIVE TREE DOES NOT EXIST"); return; }
    Object.values(skillLibrary[playerStats.class]).forEach(skill => {
        let subclass = skill.sub;
        let b = document.createElement("button");
        passiveButtonDict[skill.id] = b;

        b.style.background = "url(" + skill.iconName + "PassiveIcon.png)" + " no-repeat";
        b.style.backgroundSize = "contain";
        b.setAttribute("class", "passiveSkillButton tooltip");
        b.setAttribute("onclick", `checkSkillPurchase("${skill.id}")`)
        tabs[subclass].appendChild(b);
        if (skill.hasOwnProperty('position')) {
            b.style.gridRow = skill.position.row;
            b.style.gridColumn = skill.position.column;

            if (skill.hasOwnProperty('requires')) {
                Object.keys(skill.requires).forEach((id) => {
                    let reqSkill = skillLibrary[playerStats.class][id];
                    if (!reqSkill.hasOwnProperty('position')) { return; }
                    let link = document.createElement("div");
                    link.setAttribute("class", "passiveSkillLink");
                    tabs[subclass].appendChild(link);
                    let area = [0, 0, 0, 0];
                    area[0] = Math.min(skill.position.row, reqSkill.position.row);
                    area[2] = Math.max(skill.position.row, reqSkill.position.row);
                    area[1] = Math.min(skill.position.column, reqSkill.position.column);
                    area[3] = Math.max(skill.position.column, reqSkill.position.column);
                    let length = Math.sqrt(Math.pow((area[3] - area[1]), 2) + Math.pow((area[2] - area[0]), 2));
                    let width = area[3] - area[1];
                    let height = area[2] - area[0];
                    //link.innerHTML = `Width:${area[3]-area[1]}Height:${area[2]-area[0]} Length:${length}`;
                    length = (length) / (length + 1) * (Math.max((width + 1) / (height + 1), 1));
                    let angle = Math.atan2(skill.position.column - reqSkill.position.column, reqSkill.position.row - skill.position.row);
                    //console.log(angle);
                    area[2] += 1;
                    area[3] += 1;
                    link.style.gridArea = area.join("/");
                    link.style.rotate = `${angle}rad`
                    link.style.height = `${100 * length}%`;
                })
            }
        }
        let t = document.createElement("div");
        t.setAttribute("class", "skilltooltiptext oxanium");
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
    abilityButtonDict = {};
    Object.keys(playerMoves).forEach(abilityKey => {
        const ability = playerMoves[abilityKey];
        if (ability.class != playerStats.class) return;
        if (!ability.hasOwnProperty("position")) return;
        if (!ability.hasOwnProperty("sub")) return;
        let b = document.createElement("button");
        tabs[ability.sub].append(b);
        b.setAttribute("class", "abilityPickButton tooltip");
        b.setAttribute("onclick", `checkAbilityPurchase("${abilityKey}")`)
        b.style.backgroundImage = `url("${playerMoves[abilityKey].iconName}Icon.png")`;
        b.style.gridRow = ability.position.row;
        b.style.gridColumn = ability.position.column;
        let t = document.createElement("div");
        t.setAttribute("class", "skilltooltiptext oxanium");
        t.innerHTML = generateAbilityRequirementTooltip(abilityKey);
        b.appendChild(t);
        abilityButtonDict[abilityKey] = b;

    })
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
            requirementsText += `${skillLibrary[playerStats.class][key].name} (${value})<br>`;
        }
    }
    for (let index = 0; index < skill.effect.length; index++) {
        let effect = skill.effect[index];
        numberDisplay = "";
        switch (effect.type) {
            case 0:
                effectText += `<span class="${effect.effectTarget}Text">${attributeDisplayNames[effect.effectTarget]}</span>`;
                switch (effect.effectType) {
                    case "additiveFlat":
                        numberDisplay = "+" + effect.effectMagnitude;
                        break;
                    case "additivePercent":
                        numberDisplay = "+" + effect.effectMagnitude * 100 + "%";
                        break;
                    case "multPercent":
                        numberDisplay = "x" + effect.effectMagnitude;
                        break;
                    default:
                        console.log("Undefined effect type");
                        break;
                }
                break;
            case 1:
                effectText += `<span>${effect.effectTarget}</span>`;
                switch (effect.effectType) {
                    case "additiveFlat":
                        numberDisplay = "+" + format(effect.effectMagnitude * 100) + "%";
                        break;
                    case "additivePercent":
                        numberDisplay = "+" + effect.effectMagnitude * 100 + "%";
                        break;
                    case "multPercent":
                        numberDisplay = "x" + effect.effectMagnitude;
                        break;
                    default:
                        console.log("Undefined effect type");
                        break;
                }
                break;
            case 2:
                let attribute = effect.effectTarget.substr(0, effect.effectTarget.length - 8);
                effectText += `<span class="${attribute}Text">${attributeDisplayNames[attribute]}</span> Training Effect`;
                switch (effect.effectType) {
                    case "additiveFlat":
                        numberDisplay = "+" + effect.effectMagnitude;
                        break;
                    case "additivePercent":
                        numberDisplay = "+" + effect.effectMagnitude * 100 + "%";
                        break;
                    case "multPercent":
                        numberDisplay = "x" + effect.effectMagnitude;
                        break;
                    default:
                        console.log("Undefined effect type");
                        break;
                }
                break;
            default:
                break;
        }
        effectText += `${numberDisplay}` + "<br><br>";

    }


    let cost = skill.cost[getPlayerPassiveLevel(skill.id)];
    let costString = "";
    if (isNaN(cost)) { costString = "MAXED!" } else { costString = skill.cost[getPlayerPassiveLevel(skill.id)] + " Points" };
    return `${skill.name} ${getPlayerPassiveLevel(skill.id)}/${skill.maxLevel}` + "<br><br>" +
        skill.desc + "<br /><br>" +
        `${effectText}` +
        "Cost: " + costString + "<br><br>"
        + requirementsText;
}
function generateAbilityRequirementTooltip(ability) {
    const abilityData = playerMoves[ability];
    let stringDisplay = "";
    stringDisplay += abilityData.name + " ";
    switch (abilityData.type) {
        case 0:
            stringDisplay += "(Attack)"
            break;
        case 1:
            stringDisplay += "(Movement)"
            break;
        case 2:
            stringDisplay += "(Support)"
            break;

        default:
            break;
    }
    stringDisplay += "<br>";
    stringDisplay += abilityData.description + "<br>";
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
            if (abilityData.hasOwnProperty("effects")) {
                stringDisplay += "Effects:<br>"
                Object.keys(abilityData.effects).forEach(effect => {
                    stringDisplay += `${effect}: ${abilityData.effects[effect]}<br>`;
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
            if (abilityData.hasOwnProperty("effects")) {
                stringDisplay += "Effects:<br>"
                Object.keys(abilityData.effects).forEach(effect => {
                    stringDisplay += `${effect}<br>`;
                })
            }
            break;
        default:
            break;
    }
    stringDisplay += `Use time: ${format(abilityData.time / 1000)}s<br>`
    switch (abilityData.type) {
        case 1:
            stringDisplay += `Range:<br>`;
            if (abilityData.range[0] > 0) stringDisplay += `Advance:${abilityData.range[0]}<br>`;
            if (abilityData.range[1] > 0) stringDisplay += `Retreat:${abilityData.range[1]}<br>`;
            break;

        default:
            if (abilityData.range[1] != abilityData.range[0]) {
                stringDisplay += `Range: ${abilityData.range[0]}-${abilityData.range[1]}<br>`
            } else {
                stringDisplay += `Range: ${abilityData.range[0]}<br>`
            }
            break;
    }
    if (abilityData.cooldownTime > 0) {
        stringDisplay += `Cooldown: ${abilityData.cooldownTime / 1000}s<br />`
    }
    if (playerStats.unlockedAbilities[ability] == 1) {
        stringDisplay += `Cost: MAX!<br>`
    } else {
        if (abilityData.hasOwnProperty("cost")) {
            stringDisplay += `Cost: ${abilityData.cost}<br>`
        } else {
            stringDisplay += `Cost: ${0}<br>`
        }
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

    for (let index = 0; index < skill.effect.length; index++) {
        let effect = skill.effect[index];
        switch (effect.type) {
            //Passive attribute modifiers
            case 0:
                if (!playerStats.effectMultipliers.hasOwnProperty(effect.effectTarget)) {
                    playerStats.effectMultipliers[effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
                }
                if (effect.effectType == 'multPercent') {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        Math.pow(effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
                } else {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        effect.effectMagnitude * playerStats.unlockedSkills[skillId];
                }
                break;
            //Secondary attribute modifiers -> regeneration, critical etc.
            case 1:
                if (!playerStats.effectMultipliers.hasOwnProperty(effect.effectTarget)) {
                    playerStats.effectMultipliers[effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
                }
                if (effect.effectType == 'multPercent') {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        Math.pow(effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
                } else {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        effect.effectMagnitude * playerStats.unlockedSkills[skillId];
                }
                break;
            case 2:
                if (!playerStats.effectMultipliers.hasOwnProperty(effect.effectTarget)) {
                    playerStats.effectMultipliers[effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
                }
                if (effect.effectType == 'multPercent') {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        Math.pow(effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
                } else {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        effect.effectMagnitude * playerStats.unlockedSkills[skillId];
                }
                break;
            default:
                console.error("UNKOWN SKILL EFFECT TYPE");
                break;
        }
    }


}
function removeEffect(skillId) {
    let skill = skillLibrary[playerStats.class][skillId];
    console.log("ID: ",skillId,"Skill:",skill);
    for (let index = 0; index < skill.effect.length; index++) {
        if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect[index].effectTarget)) {
            playerStats.effectMultipliers[skill.effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
            continue;
        }
        if (playerStats.effectMultipliers[skill.effect[index].effectTarget][skill.effect[index].effectType].hasOwnProperty(skill.id)) {
            delete playerStats.effectMultipliers[skill.effect[index].effectTarget][skill.effect[index].effectType][skill.id];
        } else {
            console.log("::ERROR:: Attempting to delete non-existing effect (id:" + skillId + ")");
        }
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
    if (cost <= (getTotalPassivePoints() - getAvailablePassivePoints())) {
        playerStats.passivePointsSpent[skill.sub] += cost;
        addSkill(skillId);
    }
    updateButton(skillId);
}
function checkAbilityPurchase(abilityId) {
    let cost = 0;
    let ability = playerMoves[abilityId];
    // if (skill.hasOwnProperty('requires')) {
    //     for (const [key, value] of Object.entries(skill.requires)) {
    //         if (playerStats.unlockedSkills[key] < value || playerStats.unlockedSkills[key] == undefined) {
    //             logConsole(`Requirements are not met!`);
    //             return false;
    //         }
    //     }
    // }

    if (playerStats.unlockedAbilities.hasOwnProperty(abilityId)) {
        if (playerStats.unlockedAbilities[abilityId] > 0) { logConsole(`${ability.name} is already max level!`); return false; }
    } else {
        if (ability.hasOwnProperty("cost")) {
            cost = ability.cost;
        } else {
            cost = 0;
        }
    }
    if (cost <= (getTotalPassivePoints() - getAvailablePassivePoints())) {
        playerStats.passivePointsSpent[ability.sub] += cost;
        unlockAbility(abilityId);
        populateAbilitySlots();
        updateAbilityButton(abilityId);
    }
}
function unlockAbility(id) {
    playerStats.unlockedAbilities[id] = 1;
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
function updateAbilityButton(abilityId) {
    let t = abilityButtonDict[abilityId].querySelector('.skilltooltiptext');
    t.innerHTML = generateAbilityRequirementTooltip(abilityId);
}

function resetSkills() {
    playerStats.unlockedAbilities = { 'punch': 1 }
    Object.keys(abilityButtonDict).forEach((abilityKey) => {
        updateAbilityButton(abilityKey);
    })
    for (let index = 0; index < slots.length; index++) {
        if (index == 0) {
            playerStats.equippedAbilities[index + 1] = 'punch';
        } else {
            playerStats.equippedAbilities[index + 1] = null;
        }
    }
    populateAbilitySlots();
    let old = Object.keys(playerStats.unlockedSkills);
    old.forEach(skillId => {
        removeSkill(skillId);
    });
    playerStats.passivePointsSpent = Array(3).fill(0);
    for (const [key, value] of Object.entries(passiveButtonDict)) {
        updateButton(key);
    }
}

function changeClass(className, keep = false) {
    //if (className == playerStats.class) return;
    if (className != 'human') { playerStats.abilitySlots = 4; player.health = -1; } else { playerStats.abilitySlots = 3 };
    resetSkills();
    playerStats.class = className;
    generateSubclassTabs();
    populatePassiveTree();
    changeSubclassTab(0);
    if (!keep) {
        playerStats.level = 0;
        playerStats.experience = 0;
        addPlayerExp(0);
        playerStats.experienceToNext = (baseExperienceCost + baseLinearExperienceCost * playerStats.level) * Math.pow(baseExperienceCostExponent, playerStats.level);
    }
    playerStats.unlockedAbilities = { 'punch': 1 };
    //populateAbilityRequirements();
    //checkAbilityRequirements();
    for (let index = 0; index < slots.length; index++) {
        if (index == 0) {
            playerStats.equippedAbilities[index + 1] = 'punch';
        } else {
            playerStats.equippedAbilities[index + 1] = null;
        }
    }
    RebuildSlots();
    populateAbilitySlots();
    if (!keep) {
        playerStats.attributeSoftcaps = [10000, 10000, 10000, 10000];
        playerStats.strength = 0.01 * formulas.softcappedAttribute(0);
        playerStats.toughness = 0.01 * formulas.softcappedAttribute(1);
        playerStats.mind = 0.01 * formulas.softcappedAttribute(2);
        playerStats.agility = 0.01 * formulas.softcappedAttribute(3);

    }
    if (className != 'human') {
        playerStats.attributeSoftcaps = [10000, 10000, 10000, 10000];
    } else {
        playerStats.attributeSoftcaps = [100, 100, 100, 100];
        playerStats.strength = 1;
        playerStats.toughness = 1;
        playerStats.mind = 1;
        playerStats.agility = 1;
    }
    checkClassQuest()
}