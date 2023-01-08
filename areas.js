class Area {
    constructor(data) {
        this.name = data.name;
        this.storyUnlock = data.storyUnlock;
        this.background = data.background;
        this.backgroundImage = new Image();
        this.backgroundImage.src = this.background;
        this.enemies = data.enemies;
        this.enemyNum = data.enemyNum;
        this.encounters = data.encounters;
        //this.patrolDifficulty = data.patrolDifficulty;
        this.patrolTime = data.patrolTime;
        this.patrolCounter = 0;
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
        name: "Alley", background: "alleyBackground.png",
        enemies: ["criminal"], enemyNum: 10, storyUnlock: 0,
        patrolTime: 3000,
    }),
    new Area({
        name: "Streets", background: "cyberpunk-street.png",
        enemies: ["thug"], enemyNum: 2, storyUnlock: 5,
        patrolTime: 3000,
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        name: "Bridge", background: "bridgeAreaBackground-1.png",
        enemies: ["prisoner"], enemyNum: 2, storyUnlock: 9,
        patrolTime: 4000,
        encounters: [{ weight: 100, enemies: { "prisoner": { 1: 3, 2: 2, 3: 1 } } }]
    }),
    new Area({
        name: "Prison Courtyard", background: "prisonCourtyardBackground.png",
        enemies: ["prisoner9"], enemyNum: 2, storyUnlock: 10,
        patrolTime: 5000,

    }),
    new Area({
        name: "Prison Underground Entry", background: "bulkheadBackground.png",
        enemies: ["prisonguard"], enemyNum: 3, storyUnlock: 11,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "prisonguard": { 2: 1 } } }]
    }),
    new Area({
        name: "Prison Underground Tunnel", background: "bulkheadBackground.png",
        enemies: ["infectedPrisoner"], enemyNum: 2, storyUnlock: 12,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "infectedPrisoner": { 1: 3, 2: 1 } } }]
    }),
    new Area({
        name: "Underground Lab", background: "scifilabBackground.png",
        enemies: ["experiment999"], enemyNum: 2, storyUnlock: 13,
        patrolTime: 7000,
    }),
    new Area({
        name: "Neighbourhood Suburbs", background: "cyberpunk-street.png",
        enemies: ["thug"], enemyNum: 2, storyUnlock: 16,
        patrolTime: 6000,
        encounters: [{ weight: 100, enemies: { "thug2": { 1: 3, 2: 2, 3: 1 }, "thug3": { 2: 1, 2: 1 }, } }]
    }),
    new Area({
        name: "Mafia Territory", background: "cyberpunk-street.png",
        enemies: ["thug"], enemyNum: 2, storyUnlock: 17,
        patrolTime: 6000,
        encounters: [{ weight: 900, enemies: { "thug4": { 1: 2, 2: 1, 3: 1 }, "thug5": { 1: 1, 2: 1 }, } },
        { weight: 100, enemies: { "thug4": { 3: 1, }, "thug5": { 2: 1 }, "don": { 1: 1, }, } }]
    }),
    new Area({
        name: "Mafia Warehouse", background: "bulkheadBackground.png",
        enemies: ["thug"], enemyNum: 2, storyUnlock: 18,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "don2": { 1: 1 }, "donbodyguard": { 1: 1 } } }]
    }),
    new Area({
        name: "Abandoned Industrial Zone", background: "prisonCourtyardBackground.png",
        enemies: ["thug"], enemyNum: 2, storyUnlock: 19,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "infusedthug": { 1: 1 },"psychicthug": { 1: 1 } } },
        { weight: 100, enemies: { "infusedthug": { 2: 1 } } }]
    }),
    new Area({
        name: "Scrapyard", background: "prisonCourtyardBackground.png",
        enemies: ["thug"], enemyNum: 2, storyUnlock: 20,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "superthug": { 1: 1 } } }]
    }),
    new Area({
        name: "Old Steelworks", background: "bulkheadBackground.png",
        enemies: ["thug"], enemyNum: 2, storyUnlock: 21,
        patrolTime: 7000,
        encounters: [{ weight: 100, enemies: { "morphedthug": { 1: 1 },"infusedthug": { 1: 1 },"psychicthug": { 1: 1 }  } },
        { weight: 100, enemies: { "infusedthug": { 2: 1, 3:1 }, "gatlingthug": { 1: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "psychicthug": { 2: 1 }} },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "gatlingthug": { 1: 1 }} }
    ]
    }),
    new Area({
        name: "Riverside", background: "bridgeAreaBackground-1.png",
        enemies: ["crabman"], enemyNum: 1, storyUnlock: 22,
        patrolTime: 7000,
    }),
    new Area({
        name: "The Depths", background: "voidBackground.png",
        enemies: ["ultracrabman"], enemyNum: 1, storyUnlock: 23,
        patrolTime: 10000,
    }),];
