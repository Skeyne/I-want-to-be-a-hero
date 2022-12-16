class Area {
    constructor(data) {
        this.name = data.name;
        this.storyUnlock = data.storyUnlock;
        this.background = data.background;
        this.backgroundImage = new Image();
        this.backgroundImage.src = this.background;
        this.enemies = data.enemies;
        //this.patrolDifficulty = data.patrolDifficulty;
        this.patrolTime = data.patrolTime;
        this.patrolCounter = 0;
    }
    tick() {
        this.patrolCounter += logicTickTime * player.actionSpeed;
        if (this.patrolCounter >= this.patrolTime) {
            this.patrolCounter = 0;
            return 1;
        } else {
            return 0;
        }
    }
}

const areas = [new Area({ name: "Alley", background: "alleyBackground.png", enemies: ["criminal"], patrolTime: 5000, storyUnlock:0}),
new Area({ name: "Streets", background: "cyberpunk-street.png", enemies: ["thug"], patrolTime: 7000, storyUnlock:6 }),
new Area({ name: "Bridge", background: "bridgeAreaBackground-1.png", enemies: ["prisoner"], patrolTime: 10000, storyUnlock:9 }),
new Area({ name: "Prison Courtyard", background: "prisonCourtyardBackground.png", enemies: ["prisoner9"], patrolTime: 10000, storyUnlock:10 }),
new Area({ name: "Prison Underground", background: "bulkheadBackground.png", enemies: ["infectedPrisoner"], patrolTime: 10000, storyUnlock:11}),
new Area({ name: "Underground Lab", background: "scifilabBackground.png", enemies: ["experiment999"], patrolTime: 10000 , storyUnlock:12}),
new Area({ name: "The Void", background: "voidBackground.png", enemies: ["experiment9999"], patrolTime: 10000 , storyUnlock:13})];
