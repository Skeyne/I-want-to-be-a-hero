const activityLevelToRank = ['G','F','E','D','C','B','A','S','SS','SSS',];
var trainingAreaData = {
    0: { name: "Park", base: 0.05, timeToComplete: 10, costMultiplier: 1 },
}
var activityData = {
    "runPark": { id:"runPark" ,name: "Run laps at the park", attributeRatios:[0,0.01,0,0],
    timeToComplete: 10, cost: 0, expBase: 100, expPower:10},
}
Object.values(trainingAreaData).forEach(element => {
    if (!playerStats.trainingAreaLevels.hasOwnProperty(element.name)) {
        playerStats.trainingAreaLevels[element.name] = 0;
    }
});
Object.keys(activityData).forEach(id => {
    if (!playerStats.activityLevels.hasOwnProperty(id)) {
        playerStats.activityLevels[id] = {level:0, exp:0};
    }
});
class Activity {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.attributeRatios = data.attributeRatios;
        this.timeToComplete = 1000 * data.timeToComplete;
        this.cost = data.cost;
        this.expBase = data.expBase;
        this.expPower = data.expPower;
        this.progress = 0;
        this.costPaid = false;
    }
    get ExpToNext() {
        return this.expBase * Math.pow(this.expPower, REPLACE_THIS);
    }
    get RewardPerPlayerLevel() {
        return this.attributeRatios.map(x => x * (playerStats.activityLevels[this.id].level + 1));
    }
    tick() {
        if(this.costPaid == false){if(!this.payCost) return;}
        this.progress += logicTickTime;
        if (this.progress >= this.timeToComplete) {
            this.progress -= this.timeToComplete;
            this.reward();
            this.payCost();
        }
    }
    reward() {
        let rewards = this.RewardPerPlayerLevel;
        for (let index = 0; index < this.attributeRatios.length; index++) {
            let attribute = attributeIndexToId[index];
            let reward = rewards[index] * (playerStats.level + 1) * getTrainingModifier(attribute);
            playerStats[attribute] += reward;
        }
        checkTrainingQuest();
    }
    payCost() {
        if (playerStats.money < this.cost){ this.costPaid = false; return false;}
        playerStats.money -= this.cost;  this.costPaid = true; return true;
    }

}
class TrainingArea {
    constructor(data) {
        this.name = data.name;
        this.attribute = playerStats.currentTrainingAttribute;
        this.base = data.base;
        this.costMultiplier = data.costMultiplier;
        this.timeToComplete = 1000 * data.timeToComplete;
        this.progress = 0;
    }
    get Cost() {
        return this.base * this.costMultiplier * Math.pow(TRAINING_COST_GROWTH_BASE, playerStats.trainingAreaLevels[this.name]);
    }
    get Reward() {
        return this.base * Math.pow(TRAINING_REWARD_GROWTH_BASE, playerStats.trainingAreaLevels[this.name]);
    }
    tick() {
        this.progress += logicTickTime;
        if (this.progress >= this.timeToComplete) {
            this.progress -= this.timeToComplete;
            this.reward();
        }
    }
    reward() {
        let reward = this.Reward * getTrainingModifier(this.attribute);
        playerStats[this.attribute] += reward;
        checkTrainingQuest();
        updateTrainingCanBuy();
    }

}
var activityGrid = document.getElementById("activityGrid");
Object.keys(activityData).forEach(id => {
    const activity = activityData[id];
    let d = document.createElement("div");
    d.setAttribute("class","oxanium dotted");
    let title = document.createElement("div");
    title.innerHTML = activity.name;
    let rankText = document.createElement("span");
    rankText.innerHTML = `Rank: ${activityLevelToRank[playerStats.activityLevels[id].level]}`;
    let rankProgress = document.createElement("progress");
    rankProgress.setAttribute("class","rankProgressBar");
    rankProgress.max = 100;
    rankProgress.value = 50;
    let attributeText = document.createElement("div");
    for (let index = 0; index < activity.attributeRatios.length; index++) {
        const ratio = activity.attributeRatios[index];
        if(ratio == 0) continue;
        let s = document.createElement("span");
        s.setAttribute("class",`${attributeIndexToId[index]}Text`);
        s.innerHTML = `${format(ratio)}x`
        attributeText.append(s);
    }
    let costText = document.createElement("span");
    costText.innerHTML = `Cost: ${activity.cost}`;
    let activityProgress = document.createElement("progress");
    activityProgress.setAttribute("class","rankProgressBar");
    activityProgress.max = 100;
    activityProgress.value = 50;
    d.append(title,rankText,rankProgress,attributeText,costText,activityProgress);
    activityGrid.append(d);
});
var currentTrainingArea = new Activity(activityData['runPark']);
//changeTrainingAttribute(playerStats.currentTrainingAttribute);
//updateTrainingText();
//updateTrainingCanBuy();
function changeTrainingAttribute(attribute) {
    playerStats.currentTrainingAttribute = attribute;
    currentTrainingArea.attribute = attribute;
    currentTrainingArea.progress = 0;
    document.getElementById("currentTrainingAttribute").innerHTML = attribute;
    document.getElementById("trainingBarOverviewIcon").className = attribute + "Text";
}
function upgradeTrainingArea() {
    if (playerStats.money >= currentTrainingArea.Cost) {
        playerStats.money -= currentTrainingArea.Cost;
        playerStats.trainingAreaLevels[currentTrainingArea.name] += 1;
        updateTrainingText();
        updateTrainingCanBuy();
    }
}
function updateTrainingText() {
    document.getElementById("trainingUpgradeCost").innerHTML = format(currentTrainingArea.Cost) + '$';
    document.getElementById("trainingReward").innerHTML = format(currentTrainingArea.Reward);
}

function updateTrainingNextText() {
    document.getElementById("trainingUpgradeCost").innerHTML = format(currentTrainingArea.Cost) + '$';
    document.getElementById("trainingReward").innerHTML = format(currentTrainingArea.Reward) +
        " -> " + format(currentTrainingArea.Reward * TRAINING_REWARD_GROWTH_BASE);
}
function updateTrainingCanBuy() {
    if (playerStats.money >= currentTrainingArea.Cost) {
        document.getElementById("trainingCanUpgradeText").innerHTML = "Upgrade available!";
    } else {
        document.getElementById("trainingCanUpgradeText").innerHTML = "";
    }
}
