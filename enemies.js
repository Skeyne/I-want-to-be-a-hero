var abilityLibrary = {
    'Punch': {
        type: 0,
        name: "Punch",
        iconName: "punch",
        baseDamage: 1,
        damageRatios: [1,0,0,0.2],
        time: 3000,
        range: 5,

    },
    'Smash': {
        type: 0,
        name: "Smash",
        iconName: "smash",
        baseDamage: 1,
        damageRatios: [5,1,0,0],
        time: 7000,
        range: 10,

    },
    'Walk': {
        type: 1,
        name: "Move",
        iconName: "move",
        baseDamage: 0,
        time: 500,
        range: 10,
    }
};

var enemyData = {};

enemyData.criminal = {
    name: "Criminal",
    maxHealth: 5,
    attributes: [2,1,1,1],
    healthRegen: 0.005,
    expReward: 1,
    spriteFile: "crim.png",
    moves: ['Punch','Walk'],
};
enemyData.thug = {
    name: "Thug",
    maxHealth: 15,
    attributes: [5,2,1,1],
    healthRegen: 0.005,
    expReward: 1,
    spriteFile: "thug.png",
    moves: ['Punch','Walk'],
};
enemyData.prisoner9 = {
    name: "Prisoner 9",
    maxHealth: 50,
    attributes: [25,20,1,5],
    healthRegen: 0.005,
    expReward: 10,
    spriteFile: "prisoner9.png",
    moves: ['Punch','Smash','Walk'],
};

playerMoves = {
    'Punch': {
        type: 0,
        name: "punch",
        iconName: "punch",
        damage: 1,
        damageRatios: [1,0,0,0.2],
        damageRange: [0.9, 1.1],
        time: 3000,
        range: 5,
    },
    'Walk': {
        type: 1,
        name: "move",
        iconName: "move",
        damage: 0,
        time: 500,
        range: 10,
    }
}