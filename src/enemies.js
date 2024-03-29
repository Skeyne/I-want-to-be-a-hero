var abilityLibrary = {
    'wait': {
        type: 1,
        category: 'movement',
        name: "Wait",
        description: "Got nothing to do.",
        iconName: "wait",
        baseDamage: 0,
        time: 1000,
        cooldownTime: 0,
        range: [0, 0],
    },
    'punch': {
        type: 0,
        category: 'melee',
        name: "Punch",
        iconName: "punch",
        baseDamage: 1,
        damageRatios: [.8, 0, 0, 0.2],
        damageRange: [0.9, 1.1],
        time: 3000,
        cooldownTime: 0,
        range: [5, 5],

    },
    'smash': {
        type: 0,
        category: 'melee',
        name: "Smash",
        iconName: "smash",
        baseDamage: 5,
        damageRatios: [2.5, 1, 0, 0],
        damageRange: [0.9, 1.1],
        time: 7000,
        cooldownTime: 10000,
        range: [5, 5],

    },
    'crowbar': {
        type: 0,
        category: 'melee',
        name: "Crowbar",
        iconName: "crowbar",
        baseDamage: 1,
        damageRatios: [3, 0, 0, 0],
        damageRange: [1, 1.1],
        time: 4000,
        cooldownTime: 20000,
        range: [5, 5],
    },
    'prisonBaton': {
        type: 0,
        category: 'melee',
        name: "Baton",
        iconName: "crowbar",
        baseDamage: 0,
        damageRatios: [1.2, 0, 0, 0],
        damageRange: [1, 1.1],
        time: 3500,
        cooldownTime: 0,
        range: [5, 5],
    },
    'taser': {
        type: 0,
        category: 'melee',
        name: "Taser",
        iconName: "jab",
        baseDamage: 1,
        damageRatios: [0, 0, 0.5, 0.5],
        damageRange: [1, 1.1],
        effects: {
            'stun': 1,
        },
        time: 3000,
        cooldownTime: 20000,
        range: [5, 5],
    },
    'shank': {
        type: 0,
        category: 'melee',
        name: "Shank",
        iconName: "throwingKnife",
        baseDamage: 1,
        damageRatios: [2, 0, 0, 1],
        damageRange: [1, 1.1],
        time: 4000,
        cooldownTime: 5000,
        range: [5, 5],
    },
    'vomit': {
        type: 0,
        category: 'ranged',
        name: "Vomit",
        iconName: "vomit",
        baseDamage: 1,
        damageRatios: [0, 2.5, 0, 0],
        damageRange: [0.9, 1.1],
        time: 3000,
        cooldownTime: 7000,
        range: [0, 10],
    },
    'crabWaterJet': {
        type: 0,
        category: 'ranged',
        name: "Water Jet",
        iconName: "vomit",
        baseDamage: 0,
        damageRatios: [0, 5, 0, 0],
        damageRange: [0.9, 1.1],
        time: 5000,
        cooldownTime: 7000,
        range: [0, 50],
    },
    'mutantSlash': {
        type: 0,
        category: 'melee',
        name: "Slash",
        iconName: "mutantSlash",
        baseDamage: 1,
        damageRatios: [1.5, 1, 0, 0],
        damageRange: [1, 1.5],
        time: 4000,
        cooldownTime: 12000,
        range: [10, 10],
    },
    'regenerationExperiment': {
        type: 2,
        category: 'melee',
        name: "Regeneration",
        iconName: "secondWind",
        baseDamage: 10,
        damageRatios: [0, 0, 0, 0],
        damageRange: [1, 1],
        effects: {
            'heal': 1,
        },
        time: 2000,
        cooldownTime: 20000,
        range: [10, 10],
    },
    'handgun': {
        type: 0,
        category: 'ranged',
        name: "Handgun",
        iconName: "handgun",
        baseDamage: 1,
        damageRatios: [0, 0, 1, 1],
        damageRange: [1, 1.2],
        time: 5000,
        cooldownTime: 0,
        range: [10, 50],
    },
    'rifle': {
        type: 0,
        category: 'ranged',
        name: "Rifle",
        iconName: "handgun",
        baseDamage: 1,
        damageRatios: [0, 0, .6, .6],
        damageRange: [1, 1.2],
        time: 2500,
        cooldownTime: 0,
        range: [10, 50],
    },
    'tommy': {
        type: 0,
        category: 'ranged',
        name: "Tommy Gun",
        iconName: "handgun",
        baseDamage: 1,
        damageRatios: [.3, 0, 0, .1],
        damageRange: [0.9, 1.1],
        time: 1000,
        cooldownTime: 0,
        range: [10, 50],
    },
    'knuckleDuster': {
        type: 0,
        category: 'melee',
        name: "Knuckle Duster",
        iconName: "knuckleDuster",
        baseDamage: 1,
        damageRatios: [1.2, 0.5, 0, 0],
        damageRange: [0.9, 1.1],
        time: 4000,
        cooldownTime: 0,
        range: [5, 5],

    },
    'chokeHold': {
        type: 0,
        category: 'melee',
        name: "Chokehold",
        iconName: "placeholder",
        baseDamage: 0,
        damageRatios: [2, 0, 0, 0],
        damageRange: [0.9, 1.1],
        effects: {
            'stun': 3,
        },
        time: 5000,
        cooldownTime: 20000,
        range: [5, 5],

    },
    'gutPunch': {
        type: 0,
        category: 'melee',
        name: "Gut Punch",
        iconName: "placeholder",
        baseDamage: 1,
        damageRatios: [1.2, 0.5, 0, 0],
        damageRange: [0.9, 1.1],
        effects: {
            'stun': 3,
        },
        time: 4000,
        cooldownTime: 20000,
        range: [5, 5],

    },
    'suckerPunch': {
        type: 0,
        category: 'melee',
        name: "Sucker Punch",
        iconName: "jab",
        baseDamage: 0,
        damageRatios: [0.6, 0, 0, 0.5],
        damageRange: [0.9, 1.1],
        time: 1000,
        effects: {
            'stun': 1,
        },
        cooldownTime: 10000,
        range: [5, 5],

    },
    'telekineticProjectile': {
        type: 0,
        category: 'ranged',
        name: "Telekinetic Projectile",
        iconName: "telekineticProjectile",
        baseDamage: 0,
        damageRatios: [0, 0, 0, 2],
        damageRange: [0.9, 1.1],
        time: 3000,
        cooldownTime: 5000,
        range: [0, 60],

    },
    'confuse': {
        type: 0,
        category: 'ranged',
        name: "Confuse",
        iconName: "placeholder",
        baseDamage: 0,
        damageRatios: [0, 0, 2, 0],
        damageRange: [0.9, 1.1],
        effects: {
            'stun': 1,
        },
        time: 2000,
        cooldownTime: 12000,
        range: [0, 60],

    },
    'psychicShove': {
        type: 0,
        category: 'melee',
        name: "Psychic Shove",
        iconName: "placeholder",
        baseDamage: 0,
        damageRatios: [0, 0, 3, 0],
        damageRange: [0.9, 1.1],
        effects: {
            'knockback': 15,
        },
        time: 4000,
        cooldownTime: 14000,
        range: [10, 10],

    },
    'psionicBarrierAlly': {
        type: 2,
        category: 'ranged',
        name: "Psionic Barrier",
        iconName: "psionicBarrier",
        baseDamage: 0,
        damageRatios: [0, 0, 2, 0],
        damageRange: [0.9, 1.1],
        effects: {
            'allyshield': 1,
        },
        time: 1000,
        cooldownTime: 20000,
        range: [0, 60],

    },
    'airCannon': {
        type: 0,
        category: 'ranged',
        name: "Shockwave Punch",
        iconName: "airCannon",
        baseDamage: 0,
        damageRatios: [1, 0, 0, 0],
        damageRange: [1, 1],
        effects: {
            'knockback': 5
        },
        time: 3000,
        cooldownTime: 5000,
        range: [5, 50],
    },
    'regenerationSuperthug': {
        type: 2,
        category: 'melee',
        name: "Superhuman Recovery",
        iconName: "secondWind",
        baseDamage: 4,
        damageRatios: [0, 0, 0, 0],
        damageRange: [1, 1],
        effects: {
            'heal': 1,
        },
        time: 2000,
        cooldownTime: 10000,
        range: [10, 10],
    },
    'multipleSimplePunches': {
        type: 0,
        category: 'melee',
        name: "Multiple Simple Punches",
        iconName: "multipleSimplePunches",
        baseDamage: 0,
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
    'groundStomp': {
        type: 0,
        category: 'melee',
        name: "Ground Stomp",
        iconName: "placeholder",
        baseDamage: 0,
        damageRatios: [1, 1, 0, 0],
        damageRange: [1, 1],
        effects: {
            'stun': 2,
            'aoe': 10,
        },
        time: 3000,
        cooldownTime: 12000,
        range: [5, 5],
    },
    'dash': {
        type: 1,
        category: 'movement',
        name: "Dash",
        iconName: "move",
        baseDamage: 0,
        time: 500,
        cooldownTime: 5000,
        range: [5, 5],
    },
    'crabWalk': {
        type: 1,
        category: 'movement',
        name: "Crab Walk",
        iconName: "move",
        baseDamage: 0,
        time: 1000,
        cooldownTime: 5000,
        range: [10, 10],
    },
    'walk': {
        type: 1,
        category: 'movement',
        name: "Move",
        iconName: "move",
        baseDamage: 0,
        time: 1000,
        cooldownTime: 0,
        range: [5, 0],
    },

    'shove': {
        type: 0, category: 'ranged', name: "Shove", iconName: "jab",
        baseDamage: 1, damageRatios: [.2, 0, 0, 0], damageRange: [1, 1],
        time: 3000, cooldownTime: 5000, range: [5, 5],
        effects: { 'stun': 0.5, 'knockback': 10 }
    },
    'gatling': {
        type: 0, category: 'ranged', name: "Gatling", iconName: "handgun",
        baseDamage: 0, damageRatios: [.2, .1, .1, 0], damageRange: [1, 1],
        time: 1000, cooldownTime: 0, range: [10, 50],
    },
    'gatlingsalvo': {
        type: 0, category: 'ranged', name: "Gatling Salvo", iconName: "handgun",
        baseDamage: 0, damageRatios: [.3, .1, .1, 0], damageRange: [0.9, 1.1],
        time: 500, cooldownTime: 5000, range: [10, 50],
        effects: { "repeat": 0.8 }
    },
    'bladeArm': {
        type: 0, category: 'melee', name: "Blade Arm", iconName: "placeholder",
        baseDamage: 0, damageRatios: [.4, 0, 0, .4], damageRange: [0.9, 1.1],
        time: 2500, cooldownTime: 0, range: [5, 5],
        effects: { "criticalChance": 0.2 }
    },
    'bladeWhirlwind': {
        type: 0, category: 'melee', name: "Blade Whirlwind", iconName: "placeholder",
        baseDamage: 0, damageRatios: [.3, 0, 0, .1], damageRange: [0.9, 1.1],
        time: 200, cooldownTime: 5000, range: [10, 10],
        effects: { "repeat": 0.8 }
    }
}

var enemyData = {};

enemyData.criminal = {
    id: "criminal",
    name: "Purse thief",
    maxHealth: 2.5,
    attributes: [1, .5, 2, 1],
    healthRegen: 0,
    expReward: 1,
    moneyReward: 0.03,
    reputationReward: 1,
    spriteFile: "crim.png",
    portraitFile: "crimPortrait.png",
    moves: ['punch', 'walk'],
};
enemyData.thug = {
    id: "thug",
    name: "Thug",
    maxHealth: 15,
    attributes: [4, 3, 1, 2],
    healthRegen: 0,
    expReward: 5,
    moneyReward: 0.05,
    reputationReward: 1,
    spriteFile: "thug.png",
    portraitFile: "thugPortrait.png",
    moves: ['punch', 'walk', 'crowbar'],
};

enemyData.prisoner = {
    id: "prisoner",
    name: "Prisoner",
    maxHealth: 40,
    attributes: [1, 1, .5, 1],
    healthRegen: 0,
    expReward: 20,
    moneyReward: 0.1,
    reputationReward: 1,
    spriteFile: "prisoner.png",
    portraitFile: "thugPortrait.png",
    moves: ['punch', 'walk', 'shank'],
};
enemyData.prisoner9 = {
    id: "prisoner9",
    rank: "boss",
    name: "Prisoner 9",
    maxHealth: 120,
    attributes: [3, 3, 1, 1],
    healthRegen: 0.005,
    expReward: 40,
    moneyReward: 0.5,
    reputationReward: 1,
    spriteFile: "prisoner9.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['punch', 'smash', 'walk'],
};
enemyData.prisonguard = {
    id: "prisonguard",
    name: "Prison Guard",
    maxHealth: 100,
    attributes: [30, 50, 30, 50],
    healthRegen: 0,
    expReward: 50,
    moneyReward: 1,
    reputationReward: 1,
    spriteFile: "prisonguard.png",
    portraitFile: "thugPortrait.png",
    moves: ['taser', 'walk', 'prisonBaton'],
};
enemyData.infectedPrisoner = {
    id: "infectedPrisoner",
    name: "Strange Prisoner",
    maxHealth: 100,
    attributes: [2, 2, 1, 2],
    healthRegen: 0.005,
    expReward: 100,
    moneyReward: 1.5,
    reputationReward: 1,
    spriteFile: "infectedPrisoner.png",
    portraitFile: "thugPortrait.png",
    moves: ['punch', 'walk', 'vomit'],
};
enemyData.experiment999 = {
    id: "experiment999",
    rank: "boss",
    name: "Experiment #999",
    maxHealth: 350,
    attributes: [2, 1, 1, 2],
    healthRegen: 0.005,
    expReward: 250,
    moneyReward: 3,
    reputationReward: 2,
    spriteFile: "experiment999.png",
    portraitFile: "thugPortrait.png",
    moves: ['walk', 'punch', 'mutantSlash', 'vomit', 'regenerationExperiment'],
};
enemyData.thug2 = {
    id: "thug2",
    name: "Hardened Thug",
    maxHealth: 300,
    attributes: [200, 200, 50, 150],
    healthRegen: 0,
    expReward: 100,
    moneyReward: 4,
    reputationReward: 1,
    spriteFile: "thug.png",
    portraitFile: "thugPortrait.png",
    moves: ['punch', 'walk', 'crowbar'],
};
enemyData.thug3 = {
    id: "thug3",
    name: "Armed Thug",
    maxHealth: 150,
    attributes: [100, 100, 150, 200],
    healthRegen: 0,
    expReward: 100,
    moneyReward: 4,
    reputationReward: 1,
    spriteFile: "armedThug.png",
    portraitFile: "thugPortrait.png",
    moves: ['punch', 'handgun', 'walk'],
    engagementRange: 50,
    spawnDistance: 80,
};
enemyData.thug4 = {
    id: "thug4",
    name: "Hardened Thug",
    maxHealth: 600,
    attributes: [400, 400, 100, 300],
    healthRegen: 0,
    expReward: 150,
    moneyReward: 5,
    reputationReward: 1,
    spriteFile: "thug.png",
    portraitFile: "thugPortrait.png",
    moves: ['punch', 'crowbar', 'walk'],
};
enemyData.thug5 = {
    id: "thug5",
    name: "Rifle Thug",
    maxHealth: 300,
    attributes: [1, 1, 2, 2],
    healthRegen: 0,
    expReward: 150,
    moneyReward: 5,
    reputationReward: 1,
    spriteFile: "rifleThug.png",
    portraitFile: "thugPortrait.png",
    moves: ['punch', 'rifle', 'walk'],
    engagementRange: 50,
    spawnDistance: 80,
};
enemyData.don = {
    id: "don",
    rank: "boss",
    name: "The Don",
    maxHealth: 1000,
    attributes: [1000, 1500, 1000, 1000],
    healthRegen: 0,
    expReward: 500,
    moneyReward: 10,
    reputationReward: 3,
    spriteFile: "don.png",
    portraitFile: "thugPortrait.png",
    moves: ['tommy', 'knuckleDuster', 'walk'],
    engagementRange: 50,
    spawnDistance: 80,
};
enemyData.donbodyguard = {
    id: "donbodyguard",
    rank: "boss",
    name: "Don's Right Hand",
    maxHealth: 4000,
    attributes: [3000, 5000, 500, 2500],
    healthRegen: 0.005,
    expReward: 1250,
    moneyReward: 15,
    reputationReward: 3,
    spriteFile: "donbodyguard.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['knuckleDuster', 'smash', 'gutPunch', 'walk'],
};
enemyData.don2 = {
    id: "don2",
    rank: "boss",
    name: "The Don",
    maxHealth: 2000,
    attributes: [2400, 3000, 2000, 3000],
    healthRegen: 0,
    expReward: 1250,
    moneyReward: 15,
    reputationReward: 3,
    spriteFile: "don.png",
    portraitFile: "thugPortrait.png",
    moves: ['tommy', 'knuckleDuster', 'walk'],
    engagementRange: 50,
    spawnDistance: 80,
};
enemyData.infusedthug = {
    id: "infusedthug",
    name: "Infused Thug",
    maxHealth: 4000,
    attributes: [6000, 5000, 2000, 4000],
    healthRegen: 0,
    expReward: 1500,
    moneyReward: 50,
    reputationReward: 2,
    spriteFile: "donbodyguard.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['knuckleDuster', 'smash', 'suckerPunch', 'walk', 'dash'],
};
enemyData.psychicthug = {
    id: "psychicthug",
    name: "Psychic Thug",
    maxHealth: 2000,
    attributes: [1000, 3000, 8000, 3000],
    healthRegen: 0,
    expReward: 1500,
    moneyReward: 50,
    reputationReward: 2,
    spriteFile: "psychicthug.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['punch', 'psionicBarrierAlly', 'telekineticProjectile', 'psychicShove', 'confuse', 'walk'],
    engagementRange: 60,
    spawnDistance: 80,
};
enemyData.superthug = {
    id: "superthug",
    rank: "boss",
    name: "Superthug",
    maxHealth: 11000,
    attributes: [25000, 20000, 4000, 20000],
    healthRegen: 0,
    expReward: 3000,
    moneyReward: 75,
    reputationReward: 6,
    spriteFile: "superthug.png",
    portraitFile: "thug.png",
    moves: ['walk', 'dash', 'punch', 'groundStomp', 'multipleSimplePunches', 'airCannon', 'regenerationSuperthug'],
};
enemyData.gatlingthug = {
    id: "gatlingthug",
    name: "Gatling Thug",
    maxHealth: 10000,
    attributes: [60000, 60000, 40000, 10000],
    healthRegen: 0,
    expReward: 7000,
    moneyReward: 100,
    reputationReward: 2,
    spriteFile: "gatlingthug.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['gatling', 'gatlingsalvo', 'shove', 'walk'],
    engagementRange: 50,
    spawnDistance: 80,
};
enemyData.morphedthug = {
    id: "morphedthug",
    name: "Morphed Thug",
    maxHealth: 12000,
    attributes: [90000, 60000, 10000, 40000],
    healthRegen: 0,
    expReward: 7000,
    moneyReward: 100,
    reputationReward: 2,
    spriteFile: "morphedthug.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['bladeArm', 'bladeWhirlwind', 'shove', 'walk'],
    spawnDistance: 50,
};
enemyData.crabman = {
    id: "crabman",
    rank: "boss",
    name: "The Crabman",
    maxHealth: 70000,
    attributes: [2.5, 3, 0.5, 1],
    healthRegen: 0.01,
    expReward: 32000,
    moneyReward: 200,
    reputationReward: 10,
    spriteFile: "crabman.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['walk', 'crabWalk', 'punch', 'smash', 'groundStomp', 'mutantSlash', 'crabWaterJet'],
};
enemyData.ultracrabman = {
    id: "ultracrabman",
    rank: "boss",
    name: "The Ultra Crabman",
    maxHealth: 250000,
    attributes: [2.5, 3, 0.5, 1],
    healthRegen: 0.01,
    expReward: 250000,
    moneyReward: 300,
    reputationReward: 40,
    spriteFile: "crabman.png",
    portraitFile: "prisoner9Portrait.png",
    moves: ['walk', 'crabWalk', 'punch', 'smash', 'groundStomp', 'mutantSlash', 'crabWaterJet'],
};
