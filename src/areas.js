class Area {
    constructor(data) {
        this.name = data.name;
        this.storyUnlock = data.storyUnlock;
        this.background = data.background;
        this.backgroundImage = new Image();
        this.backgroundImage.src = `resources/backgroundImages/${this.background}`;
        this.enemies = data.enemies;
        this.enemyNum = data.enemyNum;
        this.encounters = data.encounters;
        //this.patrolDifficulty = data.patrolDifficulty;
        this.patrolTime = data.patrolTime;
        this.patrolCounter = 0;
        this.power = data.power;
        this.expPerPower = data.expPerPower;
    }
    getEnemies() {
        let arr = [];
        if (this.encounters == undefined) { return this.enemies }
        let sumWeights = 0;
        let encounterPicked;
        this.encounters.forEach(encounter => {
            sumWeights += encounter.weight;
        });
        sumWeights = Math.random() * sumWeights;
        for (let index = 0; index < this.encounters.length; index++) {
            const encounter = this.encounters[index];
            sumWeights -= encounter.weight;
            if (sumWeights < 0) {
                encounterPicked = encounter;
                break;
            }
        }
        //console.log(encounterPicked);
        let enemies = encounterPicked.enemies;
        Object.keys(enemies).forEach(enemyKey => {
            let weights = enemies[enemyKey];
            sumWeights = arraySum(Object.values(weights));
            //console.log("Total weights: ",sumWeights);
            sumWeights = Math.random() * sumWeights;
            //console.log("Rolled weight:", sumWeights);
            //console.log(Object.keys(weights));
            let numberPicked = 0;
            for (const key of Object.keys(weights)) {
                sumWeights -= weights[key];
                //console.log(key);
                if (sumWeights < 0) { numberPicked = key; break; }
            }
            //console.log("Enemies to spawn: ",numberPicked);
            for (let index = 0; index < numberPicked; index++) {
                arr.push(enemyKey);
            }
        });
        return arr;
    }
    tick() {
        this.patrolCounter += logicTickTime * player.patrolSpeed;
        if (this.patrolCounter >= this.patrolTime) {
            this.patrolCounter = 0;
            return 1;
        } else {
            return 0;
        }
    }
}

const areas = [
    new Area({
        name: "Alley", background: "alleyBackground.png", power:2,expPerPower:0.5,
        enemies: ["criminal"], enemyNum: 1, storyUnlock: 0,
        patrolTime: 3000,
    }),
    new Area({
        name: "Streets", background: "cyberpunk-street.png", power:5, expPerPower:0.352,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Mean Streets", background: "cyberpunk-street.png", power:9,expPerPower:0.414,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Shady Streets", background: "cyberpunk-street.png", power:18,expPerPower:0.486,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Dangerous Streets", background: "cyberpunk-street.png", power:24, expPerPower:0.571,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Bridge", background: "bridgeAreaBackground-1.png", power:30,expPerPower:0.671,
        enemies: ["prisoner"], enemyNum: 2, storyUnlock: 9,
        patrolTime: 4000,
        encounters: [{ weight: 100, enemies: { "prisoner": { 1: 3, 2: 2, 3: 1 } } }]
    }),
    new Area({
        name: "Prison Courtyard", background: "prisonCourtyardBackground.png",power:39, expPerPower:0.788,
        enemies: ["prisoner9"], enemyNum: 2, storyUnlock: 10,
        patrolTime: 5000,

    }),
    new Area({
        name: "Prison Underground Entry", background: "bulkheadBackground.png",power:51,expPerPower:0.926,
        enemies: ["prisonguard"], enemyNum: 3, storyUnlock: 11, 
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "prisonguard": { 2: 1 } } }]
    }),
    new Area({
        name: "Prison Underground Tunnel", background: "bulkheadBackground.png",power:66, expPerPower:1.087,
        enemies: ["infectedPrisoner"], enemyNum: 2, storyUnlock: 12,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "infectedPrisoner": { 1: 3, 2: 1 } } }]
    }),
    new Area({
        name: "Underground Lab", background: "scifilabBackground.png",power:85,expPerPower:1.28,
        enemies: ["experiment999"], enemyNum: 2, storyUnlock: 13,
        patrolTime: 7000,
    }),
    new Area({
        name: "Neighbourhood Suburbs", background: "cyberpunk-street.png", power:150,expPerPower:1.50,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 16,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "thug2": { 1: 3, 2: 2, 3: 1 }, "thug3": { 2: 1, 2: 1 }, } }]
    }),
    new Area({
        name: "Neighbourhood Suburbs", background: "cyberpunk-street.png", power:194,expPerPower:1.76,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 16,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "thug2": { 1: 3, 2: 2, 3: 1 }, "thug3": { 2: 1, 2: 1 }, } }]
    }),
    new Area({
        name: "Neighbourhood Suburbs", background: "cyberpunk-street.png", power:250,expPerPower:2.07,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 16,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "thug2": { 1: 3, 2: 2, 3: 1 }, "thug3": { 2: 1, 2: 1 }, } }]
    }),
    new Area({
        name: "Mafia Territory", background: "cyberpunk-street.png",power:323,expPerPower:2.43,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 17,
        patrolTime: 6000,
        encounters: [{ weight: 900, enemies: { "thug4": { 1: 2, 2: 1, 3: 1 }, "thug5": { 1: 1, 2: 1 }, } },
        { weight: 100, enemies: { "thug4": { 3: 1, }, "thug5": { 2: 1 }, "don": { 1: 1, }, } }]
    }),
    new Area({
        name: "Mafia Warehouse", background: "bulkheadBackground.png",power:417,expPerPower:2.86,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 18,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "don2": { 1: 1 }, "donbodyguard": { 1: 1 } } }]
    }),
    new Area({
        name: "Abandoned Industrial Zone", background: "prisonCourtyardBackground.png",power:539,expPerPower:3.35,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 19,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "infusedthug": { 1: 1 },"psychicthug": { 1: 1 } } },
        { weight: 100, enemies: { "infusedthug": { 2: 1 } } }]
    }),
    new Area({
        name: "Scrapyard", background: "prisonCourtyardBackground.png",power:696,expPerPower:3.94,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 20,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "superthug": { 1: 1 } } }]
    }),
    new Area({
        name: "Old Steelworks", background: "bulkheadBackground.png",power:946,expPerPower:4.63,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 21,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "morphedthug": { 1: 1 },"infusedthug": { 1: 1 },"psychicthug": { 1: 1 }  } },
        { weight: 100, enemies: { "infusedthug": { 2: 1, 3:1 }, "gatlingthug": { 1: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "psychicthug": { 2: 1 }} },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "gatlingthug": { 1: 1 }} }
    ]
    }),
    new Area({
        name: "Old Steelworks", background: "bulkheadBackground.png",power:1191,expPerPower:5.44,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 21,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "morphedthug": { 1: 1 },"infusedthug": { 1: 1 },"psychicthug": { 1: 1 }  } },
        { weight: 100, enemies: { "infusedthug": { 2: 1, 3:1 }, "gatlingthug": { 1: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "psychicthug": { 2: 1 }} },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "gatlingthug": { 1: 1 }} }
    ]
    }),
    new Area({
        name: "Riverside", background: "bridgeAreaBackground-1.png",power:1500,expPerPower:6.39,
        enemies: ["crabman"], enemyNum: 1, storyUnlock: 22,
        patrolTime: 7000,
    }),
    new Area({
        name: "The Depths", background: "voidBackground.png",power:478900,expPerPower:32,
        enemies: ["ultracrabman"], enemyNum: 1, storyUnlock: 23,
        patrolTime: 10000,
    }),];
