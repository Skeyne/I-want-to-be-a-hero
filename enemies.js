var abilityLibrary = {
    'Punch': {
        type: 0,
        name: "Punch",
        iconName: "punch",
        baseDamage: 1,
        damageRatios: [.8,0,0,0.2],
        time: 3000,
        cooldownTime: 0,
        range: 5,

    },
    'Smash': {
        type: 0,
        name: "Smash",
        iconName: "smash",
        baseDamage: 5,
        damageRatios: [2.5,1,0,0],
        time: 7000,
        cooldownTime: 10000,
        range: 5,

    },
    'crowbar': {
        type: 0,
        name: "Crowbar",
        iconName: "crowbar",
        baseDamage: 1,
        damageRatios: [3, 0, 0, 0],
        damageRange: [1, 1.1],
        time: 4000,
        cooldownTime: 20000,
        range: 5,
    },
    'Walk': {
        type: 1,
        name: "Move",
        iconName: "move",
        baseDamage: 0,
        time: 1000,
        cooldownTime: 0,
        range: 5,
    }
};

var enemyData = {};

enemyData.criminal = {
    id:"criminal",
    name: "Purse thief",
    maxHealth: 2.5,
    attributes: [.5,.5,0,1],
    healthRegen: 0,
    expReward: 1,
    moneyReward: 0.01,
    reputationReward: 1,
    spriteFile: "crim.png",
    portraitFile: "crimPortrait.png",
    moves: ['Punch','Walk'],
};
enemyData.thug = {
    id:"thug",
    name: "Thug",
    maxHealth: 15,
    attributes: [5,2,1,1],
    healthRegen: 0.005,
    expReward: 5,
    moneyReward: 0.03,
    reputationReward: 1,
    spriteFile: "thug.png",
    portraitFile: "thugPortrait.png",
    moves: ['Punch','Walk','crowbar'],
};
enemyData.prisoner9 = {
    id:"prisoner9",
    name: "Prisoner 9",
    maxHealth: 100,
    attributes: [50,20,1,5],
    healthRegen: 0.005,
    expReward: 25,
    moneyReward: 0.2,
    reputationReward: 10,
    spriteFile: "prisoner9.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['Punch','Smash','Walk'],
};

