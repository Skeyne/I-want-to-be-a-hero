var enemyData = {};

enemyData.criminal = {
    name: "Criminal",
    maxHealth: 5,
    attributes: [2,1,0,1],
    expReward: 1,
    spriteFile: "crim.png",
    moves: {
        'Punch': {
            type: 0,
            name: "Punch",
            baseDamage: 1,
            damageRatios: [2,0,0,0.2],
            time: 3000,
            range: 5,
    
        },
        'Walk': {
            type: 1,
            name: "Move",
            baseDamage: 0,
            time: 500,
            range: 10,
        }
    },
};
enemyData.thug = {
    name: "Thug",
    maxHealth: 15,
    attributes: [6,2,0,1],
    expReward: 1,
    spriteFile: "thug.png",
    moves: {
        'Punch': {
            type: 0,
            name: "Punch",
            baseDamage: 1,
            damageRatios: [1,0,0,0.2],
            time: 3000,
            range: 5,
    
        },
        'Walk': {
            type: 1,
            name: "Move",
            baseDamage: 0,
            time: 500,
            range: 10,
        }
    },
};