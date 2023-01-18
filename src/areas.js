class Area {
    constructor(data) {
        this.name = `${data.name}<br><span style="font-size:1rem">(Power:${data.power})</span>`;
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
        this.moneyPerPower = data.moneyPerPower;
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
        name: "Alley", background: "alleyBackground.png", power:2,expPerPower:0.5,moneyPerPower:0.1,
        enemies: ["criminal"], enemyNum: 1, storyUnlock: 0,
        patrolTime: 3000,
    }),
    new Area({
        name: "Streets", background: "cyberpunk-street.png", power:5, expPerPower:0.352,moneyPerPower:0.101,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Mean Streets", background: "cyberpunk-street.png", power:9,expPerPower:0.414,moneyPerPower:0.1019,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Shady Streets", background: "cyberpunk-street.png", power:18,expPerPower:0.486,moneyPerPower:0.1029,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Dangerous Streets", background: "cyberpunk-street.png", power:24, expPerPower:0.571,moneyPerPower:0.1039,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Bridge", background: "bridgeAreaBackground-1.png", power:32,expPerPower:0.671,moneyPerPower:0.1049,
        enemies: ["prisoner"], enemyNum: 2, storyUnlock: 9,
        patrolTime: 4000,
        encounters: [{ weight: 100, enemies: { "prisoner": { 1: 3, 2: 2, 3: 1 } } }]
    }),
    new Area({
        name: "Prison Courtyard", background: "prisonCourtyardBackground.png",power:42, expPerPower:0.788,moneyPerPower:0.1059,
        enemies: ["prisoner9"], enemyNum: 2, storyUnlock: 10,
        patrolTime: 5000,

    }),
    new Area({
        name: "Prison Underground Entry", background: "bulkheadBackground.png",power:53,expPerPower:0.926,moneyPerPower:0.1069,
        enemies: ["prisonguard"], enemyNum: 3, storyUnlock: 11, 
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "prisonguard": { 2: 1 } } }]
    }),
    new Area({
        name: "Prison Underground Tunnel", background: "bulkheadBackground.png",power:78, expPerPower:1.087,moneyPerPower:0.1079,
        enemies: ["infectedPrisoner"], enemyNum: 2, storyUnlock: 12,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "infectedPrisoner": { 1: 3, 2: 1 } } }]
    }),
    new Area({
        name: "Underground Lab", background: "scifilabBackground.png",power:100,expPerPower:1.28,moneyPerPower:0.1090,
        enemies: ["experiment999"], enemyNum: 2, storyUnlock: 13,
        patrolTime: 7000,
    }),
    new Area({
        name: "Neighbourhood Suburbs", background: "cyberpunk-street.png", power:160,expPerPower:1.50, moneyPerPower:0.11,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 16,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "thug2": { 1: 3, 2: 2, 3: 1 }, "thug3": { 1: 1, 2: 1 }, } }]
    }),
    new Area({
        name: "Shady Suburbs", background: "cyberpunk-street.png", power:210,expPerPower:1.76,moneyPerPower:0.1111,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 16,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "thug2": { 1: 3, 2: 2, 3: 1 }, "thug3": { 1: 1, 2: 1 }, } }]
    }),
    new Area({
        name: "Mafia Territory", background: "cyberpunk-street.png",power:299,expPerPower:2.07,moneyPerPower:0.1121,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 17,
        patrolTime: 6000,
        encounters: [{ weight: 900, enemies: { "thug4": { 1: 2, 2: 1, 3: 1 }, "thug5": { 1: 1, 2: 1 }, } },
        { weight: 100, enemies: { "thug4": { 3: 1, }, "thug5": { 2: 1 }, "don": { 1: 1, }, } }]
    }),
    new Area({
        name: "Mafia Warehouse", background: "bulkheadBackground.png",power:377,expPerPower:2.43,moneyPerPower:0.1132,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 18,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "don2": { 1: 1 }, "donbodyguard": { 1: 1 } } }]
    }),
    new Area({
        name: "Abandoned Industrial Zone", background: "prisonCourtyardBackground.png",power:474,expPerPower:2.86,moneyPerPower:0.1143,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 19,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "infusedthug": { 1: 1 },"psychicthug": { 1: 1 } } },
        { weight: 100, enemies: { "infusedthug": { 2: 1 } } }]
    }),
    new Area({
        name: "Overgrown Carpark", background: "prisonCourtyardBackground.png",power:597,expPerPower:3.35,moneyPerPower:0.1154,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 19,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "infusedthug": { 1: 1 },"psychicthug": { 1: 1 } } },
        { weight: 100, enemies: { "infusedthug": { 2: 1 } } }]
    }),
    new Area({
        name: "Scrapyard", background: "prisonCourtyardBackground.png",power:752,expPerPower:3.94,moneyPerPower:0.1165,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 20,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "superthug": { 1: 1 } } }]
    }),
    new Area({
        name: "Old Steelworks", background: "bulkheadBackground.png",power:946,expPerPower:4.63,moneyPerPower:0.1176,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 21,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "morphedthug": { 1: 1 },"infusedthug": { 1: 1 },"psychicthug": { 1: 1 }  } },
        { weight: 100, enemies: { "infusedthug": { 2: 1, 3:1 }, "gatlingthug": { 1: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "psychicthug": { 2: 1 }} },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "gatlingthug": { 1: 1 }} }
    ]
    }),
    new Area({
        name: "Old Steelworks II", background: "bulkheadBackground.png",power:1191,expPerPower:5.44,moneyPerPower:0.1187,
        enemies: ["thug"], enemyNum: 2, storyUnlock: 21,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "morphedthug": { 1: 1 },"infusedthug": { 1: 1 },"psychicthug": { 1: 1 }  } },
        { weight: 100, enemies: { "infusedthug": { 2: 1, 3:1 }, "gatlingthug": { 1: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "psychicthug": { 2: 1 }} },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "gatlingthug": { 1: 1 }} }
    ]
    }),
    new Area({
        name: "Riverside", background: "bridgeAreaBackground-1.png",power:1500,expPerPower:6.39,moneyPerPower:0.1199,
        enemies: ["crabman"], enemyNum: 1, storyUnlock: 22,
        patrolTime: 7000,
    }),
    new Area({
        name: "The Depths", background: "voidBackground.png",power:15000,expPerPower:31.93,moneyPerPower:0.1318,
        enemies: ["ultracrabman"], enemyNum: 1, storyUnlock: 23,
        patrolTime: 10000,
    }),];
