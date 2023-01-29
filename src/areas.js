const areaPowerLookup = {
    'chapter1': (areaLevel) => { return Math.round(15 * Math.pow(Math.pow(10, 0.1), areaLevel)) },
    'chapter2': (areaLevel) => { return Math.round(15 * Math.pow(Math.pow(10, 0.1), areaLevel)) },
    'chapter3': (areaLevel) => { return Math.round(15 * Math.pow(Math.pow(10, 0.1), areaLevel)) },
}
const areaExpLookup = {
    'chapter1': (areaLevel) => { return 0.4 * Math.pow(Math.pow(5, 0.1), areaLevel) },
    'chapter2': (areaLevel) => { return 0.2 * Math.pow(Math.pow(5, 0.1), areaLevel) },
    'chapter3': (areaLevel) => { return 0.2 * Math.pow(Math.pow(5, 0.1), areaLevel) },
}
const areaMoneyLookup = {
    'chapter1': (areaLevel) => { return 0.05 * Math.pow(Math.pow(1.1, 0.1), areaLevel) },
    'chapter2': (areaLevel) => { return 0.04 * Math.pow(Math.pow(1.1, 0.1), areaLevel) },
    'chapter3': (areaLevel) => { return 0.04 * Math.pow(Math.pow(1.1, 0.1), areaLevel) },
}

class Area {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.storyUnlock = data.storyUnlock;
        this.background = data.background;
        this.backgroundImage = new Image();
        this.backgroundImage.src = `resources/backgroundImages/${this.background}`;
        this.enemies = data.enemies;
        this.enemyNum = data.enemyNum;
        this.encounters = data.encounters;
        this.completionsReq = data.completionsReq;
        //this.patrolDifficulty = data.patrolDifficulty;
        this.patrolTime = data.patrolTime;
        this.patrolCounter = 0;
        if (data.hasOwnProperty("power")) {
            this.power = data.power;
        } else { this.power = areaPowerLookup[data.scaling](data.areaLevel); }
        if (data.hasOwnProperty("expPerPower")) {
            this.expPerPower = data.expPerPower;
        } else { this.expPerPower = areaExpLookup[data.scaling](data.areaLevel); }
        if (data.hasOwnProperty("moneyPerPower")) {
            this.moneyPerPower = data.moneyPerPower;
        } else { this.moneyPerPower = areaMoneyLookup[data.scaling](data.areaLevel); }
    }
    get displayText() {
        let name = this.name
        let power = this.power
        let completionText;
        if (playerStats.areaCompletions[this.id]) {
            completionText = playerStats.areaCompletions[this.id] >= this.completionsReq ? '' : `(${playerStats.areaCompletions[this.id]}/${this.completionsReq})`;
        } else {
            completionText = `(0/${this.completionsReq})`;
        }
        return `${name} ${completionText}<br><span style="font-size:1rem">(Power: ${power})</span>`;
    }
    addCompletion() {
        if (playerStats.areaCompletions.hasOwnProperty(this.id)) {
            playerStats.areaCompletions[this.id] += 1;
        } else {
            playerStats.areaCompletions[this.id] = 1;
        }
        if (playerStats.areaCompletions[this.id] == this.completionsReq) {
            checkAreaQuest();
            checkAreaUnlocks();
            checkTabUnlocks();
            flashTabButton(tabNames.indexOf('areas'));
        }
        areaButtonDict[this.id].innerHTML = this.displayText;
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
        id: 'alley1', name: "Alley", background: "alleyBackground.png", areaLevel: 1, power: 1, expPerPower: 0.5, moneyPerPower: 0.4,
        storyUnlock: 0, patrolTime: 3000, completionsReq: 10, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "criminal": { 1: 1 } } }]
    }),
    new Area({
        id: 'streets1', name: "Streets", background: "cyberpunk-street.png", areaLevel: 2, power: 6, expPerPower: 0.352, moneyPerPower: 0.101,
        storyUnlock: 5, patrolTime: 3000, completionsReq: 10, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        id: 'streets2', name: "Mean Streets", background: "cyberpunk-street.png", areaLevel: 3, power: 10, expPerPower: 0.414, moneyPerPower: 0.1019,
        storyUnlock: 5, patrolTime: 3000, completionsReq: 10, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        id: 'streets3', name: "Shady Streets", background: "cyberpunk-street.png", areaLevel: 4, power: 18, expPerPower: 0.486, moneyPerPower: 0.1029,
        storyUnlock: 5, patrolTime: 3000, completionsReq: 10, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        id: 'streets4', name: "Dangerous Streets", background: "cyberpunk-street.png", areaLevel: 5, power: 26, expPerPower: 0.571, moneyPerPower: 0.0939,
        storyUnlock: 5, patrolTime: 3000, completionsReq: 10, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "thug": { 1: 2, 2: 1, 3: 1 } } }]
    }),
    new Area({
        id: 'bridge1', name: "Bridge", background: "bridgeAreaBackground-1.png", areaLevel: 6, power: 32, expPerPower: 0.671, moneyPerPower: 0.0949,
        storyUnlock: 9, patrolTime: 4000, completionsReq: 10, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "prisoner": { 1: 3, 2: 2, 3: 1 } } }]
    }),
    new Area({
        id: 'prison1', name: "Prison Courtyard", background: "prisonCourtyardBackground.png", areaLevel: 7, power: 42, expPerPower: 0.788, moneyPerPower: 0.00859,
        storyUnlock: 10, patrolTime: 5000, completionsReq: 1, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "prisoner9": { 1: 1 } } }]
    }),
    new Area({
        id: 'prison2', name: "Prison Underground Entry", background: "bulkheadBackground.png", areaLevel: 8, power: 53, expPerPower: 0.926, moneyPerPower: 0.0869,
        storyUnlock: 11, patrolTime: 6000, completionsReq: 10, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "prisonguard": { 2: 1 } } }]
    }),
    new Area({
        id: 'prison3', name: "Prison Underground Tunnel", background: "bulkheadBackground.png", areaLevel: 9, power: 78, expPerPower: 1.087, moneyPerPower: 0.0879,
        storyUnlock: 12, patrolTime: 6000, completionsReq: 10, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "infectedPrisoner": { 1: 3, 2: 1 } } }]
    }),
    new Area({
        id: 'prison4', name: "Underground Lab", background: "scifilabBackground.png", areaLevel: 10, power: 100, expPerPower: 1.28, moneyPerPower: 0.1090 / 2,
        storyUnlock: 13, patrolTime: 7000, completionsReq: 1, scaling: 'chapter1',
        encounters: [{ weight: 100, enemies: { "experiment999": { 1: 1 } } }]
    }),
    new Area({
        id: 'mafia1', name: "Neighbourhood Suburbs", background: "cyberpunk-street.png", areaLevel: 11, power: 140, expPerPower: 1.50, moneyPerPower: 0.11 / 2,
        storyUnlock: 16, patrolTime: 6000, completionsReq: 10, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "thug2": { 1: 3, 2: 1 }, "thug3": { 1: 1, 2: 1 }, } }]
    }),
    new Area({
        id: 'mafia2', name: "Shady Suburbs", background: "cyberpunk-street.png", areaLevel: 12, power: 210, expPerPower: 1.76, moneyPerPower: 0.1111 / 2,
        storyUnlock: 16, patrolTime: 6000, completionsReq: 10, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "thug2": { 1: 3, 2: 2, 3: 1 }, "thug3": { 1: 1, 2: 1 }, } }]
    }),
    new Area({
        id: 'mafia3', name: "Mafia Territory", background: "cyberpunk-street.png", areaLevel: 13,
        storyUnlock: 17, patrolTime: 6000, completionsReq: 10, scaling: 'chapter2',
        encounters: [{ weight: 900, enemies: { "thug4": { 1: 1, 2: 2, 3: 3 }, "thug5": { 1: 1, 2: 2 }, } },
        { weight: 100, enemies: { "thug4": { 3: 1, }, "thug5": { 2: 1 }, "don": { 1: 1, }, } }]
    }),
    new Area({
        id: 'mafia4', name: "Mafia Warehouse", background: "bulkheadBackground.png", areaLevel: 14,
        storyUnlock: 18, patrolTime: 7000, completionsReq: 1, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "don2": { 1: 1 }, "donbodyguard": { 1: 1 } } }]
    }),
    new Area({
        id: 'industrial1', name: "Abandoned Industrial Zone", background: "prisonCourtyardBackground.png", areaLevel: 15,
        storyUnlock: 19, patrolTime: 7000, completionsReq: 10, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "infusedthug": { 1: 1 }, "psychicthug": { 1: 1 } } },
        { weight: 100, enemies: { "infusedthug": { 2: 1 } } }]
    }),
    new Area({
        id: 'industrial2', name: "Overgrown Carpark", background: "prisonCourtyardBackground.png", areaLevel: 16,
        storyUnlock: 19, patrolTime: 7000, completionsReq: 10, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "infusedthug": { 1: 1 }, "psychicthug": { 1: 1 } } },
        { weight: 100, enemies: { "infusedthug": { 2: 1 } } }]
    }),
    new Area({
        id: 'industrial3', name: "Scrapyard", background: "prisonCourtyardBackground.png", areaLevel: 17,
        storyUnlock: 20, patrolTime: 7000, completionsReq: 1, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "superthug": { 1: 1 } } }]
    }),
    new Area({
        id: 'industrial4', name: "Old Steelworks", background: "bulkheadBackground.png", areaLevel: 18,
        storyUnlock: 21, patrolTime: 7000, completionsReq: 10, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "morphedthug": { 1: 1 }, "infusedthug": { 1: 1 }, "psychicthug": { 1: 1 } } },
        { weight: 100, enemies: { "infusedthug": { 2: 1, 3: 1 }, "gatlingthug": { 1: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "psychicthug": { 2: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "gatlingthug": { 1: 1 } } }
        ]
    }),
    new Area({
        id: 'industrial5', name: "Old Steelworks II", background: "bulkheadBackground.png", areaLevel: 19,
        storyUnlock: 21, patrolTime: 7000, completionsReq: 10, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "morphedthug": { 1: 1 }, "infusedthug": { 1: 1 }, "psychicthug": { 1: 1 } } },
        { weight: 100, enemies: { "infusedthug": { 2: 1, 3: 1 }, "gatlingthug": { 1: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "psychicthug": { 2: 1 } } },
        { weight: 100, enemies: { "morphedthug": { 1: 1 }, "gatlingthug": { 1: 1 } } }
        ]
    }),
    new Area({
        id: 'industrial6', name: "Riverside", background: "bridgeAreaBackground-1.png", areaLevel: 20,
        patrolTime: 7000, completionsReq: 1, scaling: 'chapter2',
        encounters: [{ weight: 100, enemies: { "crabman": { 1: 1 } } }]
    }),
    new Area({
        id: 'misc1', name: "The Depths", background: "voidBackground.png", areaLevel: 30,
        storyUnlock: 23, patrolTime: 10000, completionsReq: 1, scaling: 'chapter3',
        encounters: [{ weight: 100, enemies: { "ultracrabman": { 1: 1 } } }]
    }),];


