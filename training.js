const activityLevelToRank = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS',];
var trainingAreaData = {
    0: { name: "Park", base: 0.05, timeToComplete: 10, costMultiplier: 1 },
}
var activityData = {
    "activity_0_0": {
        id: "activity_0_0", name: "Do some pushups",
        attributeRatios: [0.01, 0, 0, 0],
        //[[0.01, 0, 0, 0], [0.01, 0, 0, 0],[0.01, 0, 0, 0],[0.01, 0, 0, 0],[0.01, 0, 0, 0],
        //[0.01, 0, 0, 0], [0.01, 0, 0, 0],[0.01, 0, 0, 0],[0.01, 0, 0, 0],[0.01, 0, 0, 0]],
        timeToComplete: 10, cost: 0, expBase: 10, expPower: 5
    },
    "activity_0_1": {
        id: "activity_0_1", name: "Run laps at the park", attributeRatios: [0, 0.01, 0, 0],
        timeToComplete: 10, cost: 0, expBase: 10, expPower: 5
    },
    "activity_0_2": {
        id: "activity_0_2", name: "Play dodgeball", attributeRatios: [0, 0, 0, 0.01],
        timeToComplete: 10, cost: 0, expBase: 10, expPower: 5
    },
    "activity_0_3": {
        id: "activity_0_3", name: "Learn Chess", attributeRatios: [0, 0, 0.01, 0],
        timeToComplete: 10, cost: 0, expBase: 10, expPower: 5
    },
    "activity_1_0": {
        id: "activity_1_0", name: "Hit the gym", attributeRatios: [0.05, 0, 0, 0],
        timeToComplete: 15, cost: 5, expBase: 100, expPower: 3.9,
    },
    "activity_1_1": {
        id: "activity_1_1", name: "Participate in quarter-marathon", attributeRatios: [0, 0.05, 0, 0],
        timeToComplete: 15, cost: 5, expBase: 100, expPower: 3.9,
    },
    "activity_1_2": {
        id: "activity_1_2", name: "Do street juggling", attributeRatios: [0, 0, 0, 0.05],
        timeToComplete: 15, cost: 5, expBase: 100, expPower: 3.9,
    },
    "activity_1_3": {
        id: "activity_1_3", name: "Play competitive chess", attributeRatios: [0, 0, 0.05, 0],
        timeToComplete: 15, cost: 5, expBase: 100, expPower: 3.9,
    },
    "activity_2_0": {
        id: "activity_2_0", name: "Train with wrist+ankle weights", attributeRatios: [0.25, 0, 0, -0.1],
        timeToComplete: 20, cost: 25, expBase: 500, expPower: 3,
    },
    "activity_2_1": {
        id: "activity_2_1", name: "Load cargo at the port", attributeRatios: [0.05, 0.15, -0.05,0],
        timeToComplete: 20, cost: 25, expBase: 500, expPower: 3,
    },
    "activity_2_2": {
        id: "activity_2_2", name: "Dodge street traffic", attributeRatios: [0, 0, -0.2, 0.35],
        timeToComplete: 20, cost: 25, expBase: 500, expPower: 3,
    },
    "activity_2_3": {
        id: "activity_2_3", name: "Solve Maxwell Equations", attributeRatios: [-0.05, -0.05, 0.4, -0.05],
        timeToComplete: 20, cost: 25, expBase: 500, expPower: 3,
    },
}

class Activity {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.attributeRatios = data.attributeRatios;
        this.timeToComplete = 1000 * data.timeToComplete;
        this.cost = data.cost;
        this.expBase = data.expBase;
        this.expPower = data.expPower;
        this.expToNext = this.ExpToNext;
        this.progress = 0;
        this.costPaid = false;
        this.element = null;
    }
    get ExpToNext() {
        return this.expBase * Math.pow(this.expPower, (playerStats.activityLevels[this.id].level));
    }
    get RewardPerPlayerLevel() {
        return this.attributeRatios.map(x => x *(playerStats.activityLevels[this.id].level + 1));
    }
    tick() {
        if (this.costPaid == false) { if (!this.payCost()) return; }
        this.progress += logicTickTime;
        if (this.progress >= this.timeToComplete) {
            this.progress -= this.timeToComplete;
            this.reward();
            this.payCost();
        }
        this.updateBars();
    }
    reward() {

        let rewards = this.RewardPerPlayerLevel;
        let expReward = 0;
        for (let index = 0; index < this.attributeRatios.length; index++) {
            if(rewards[index] != 0){
                let attribute = attributeIndexToId[index];
                let reward = rewards[index] * (playerStats.level + 1) * (rewards[index] < 0 ? 1: getTrainingModifier(attribute));
                if((rewards[index] > 0)){
                    expReward += Math.log10(playerStats[attribute]+1) * this.timeToComplete/10000;
                }
                playerStats[attribute] = Math.max(playerStats.permanentAttributes[index],playerStats[attribute]+reward);
            }
        }
        playerStats.activityLevels[this.id].exp += expReward;
        if (playerStats.activityLevels[this.id].exp >= this.expToNext) {
            playerStats.activityLevels[this.id].exp -= this.expToNext;
            playerStats.activityLevels[this.id].level += 1
            this.expToNext = this.ExpToNext;
            this.updateRank();
        }
        this.updateRankProgress();
        checkTrainingQuest();
    }
    payCost() {
        if (playerStats.money < this.cost) { this.costPaid = false; return false; }
        playerStats.money -= this.cost; this.costPaid = true; return true;
    }
    updateBars() {
        let bars = this.element.getElementsByTagName("progress");
        bars[0].value = playerStats.activityLevels[this.id].exp;
        bars[1].value = this.progress;
    }
    updateRankProgress(){
        let rankText = this.element.getElementsByTagName("span")[0];
        rankText.innerHTML = `Rank: ${activityLevelToRank[playerStats.activityLevels[this.id].level]}
        (${format(100*playerStats.activityLevels[this.id].exp/this.expToNext)}%)`;
    }
    updateRank(){
        let rankText = this.element.getElementsByTagName("span")[0];
        rankText.innerHTML = `Rank: ${activityLevelToRank[playerStats.activityLevels[this.id].level]}`;
        let bars = this.element.getElementsByClassName("rankProgressBar");
        bars[0].max = this.expToNext;
        let attributeText = this.element.getElementsByTagName("div")[1];
        attributeText.innerHTML = "";
        for (let index = 0; index < this.attributeRatios.length; index++) {
            const ratio = this.attributeRatios[index];
            if (ratio == 0) continue;
            let s = document.createElement("span");
            s.setAttribute("class", `${attributeIndexToId[index]}Text`);
            s.innerHTML = `${format(this.RewardPerPlayerLevel[index])}x`
            attributeText.append(s);
        }
    }
    onSelect(){
        this.element.style.borderColor = 'goldenrod';
        let iconWrapper = document.getElementById("trainingBarOverviewIcon");
        iconWrapper.innerHTML = "";
        for (let index = 0; index < this.attributeRatios.length; index++) {
            const ratio = this.attributeRatios[index];
            if (ratio != 0){
                let icon = document.createElement("span");
                icon.innerHTML = (ratio > 0 ? ' +': ' -');
                icon.className = attributeIndexToId[index] + "Text";
                icon.style.color = (ratio > 0 ? 'green': 'red');
                iconWrapper.append(icon);
            }
            
        }
       
    }
    onDeselect(){
        this.element.style.borderColor = "";
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
        updateAttributePrestigeText(); 
    }


}
var activities = {}
Object.values(trainingAreaData).forEach(element => {
    if (!playerStats.trainingAreaLevels.hasOwnProperty(element.name)) {
        playerStats.trainingAreaLevels[element.name] = 0;
    }
});
Object.keys(activityData).forEach(id => {
    if (!playerStats.activityLevels.hasOwnProperty(id)) {
        playerStats.activityLevels[id] = { level: 0, exp: 0 };
    }
    activities[id] = new Activity(activityData[id]);
});

var activityGrid = document.getElementById("activityGrid");
Object.keys(activityData).forEach(id => {
    const activity = activities[id];
    let d = document.createElement("div");
    d.setAttribute("class", "activityBlock oxanium dotted");
    d.setAttribute("onclick",`changeActivity("${id}")`)
    let title = document.createElement("div");
    title.style.whiteSpace ='nowrap';
    title.innerHTML = activity.name;
    let rankText = document.createElement("span");
    rankText.innerHTML =  `Rank: ${activityLevelToRank[playerStats.activityLevels[id].level]}
    (${format(100*playerStats.activityLevels[id].exp/activity.expToNext)}%)`;
    let rankProgress = document.createElement("progress");
    rankProgress.setAttribute("class", "rankProgressBar");
    rankProgress.max = activity.expToNext;
    rankProgress.value = playerStats.activityLevels[id].exp;
    let attributeText = document.createElement("div");
    for (let index = 0; index < activity.attributeRatios.length; index++) {
        const ratio = activity.attributeRatios[index];
        if (ratio == 0) continue;
        let s = document.createElement("span");
        s.setAttribute("class", `${attributeIndexToId[index]}Text`);
        s.innerHTML = `${format(activity.RewardPerPlayerLevel[index])}x`
        attributeText.append(s);
    }
    let costText = document.createElement("span");
    costText.innerHTML = `Cost: ${format(activity.cost)}$`;
    let activityProgress = document.createElement("progress");
    activityProgress.setAttribute("class", "activityProgressBar");
    activityProgress.max = activity.timeToComplete;
    activityProgress.value = 0;
    d.append(title, rankText, rankProgress, attributeText, costText, activityProgress);
    activityGrid.append(d);
    activities[id].element = d;
});
var currentTrainingArea;
if (activities.hasOwnProperty(playerStats.currentActivity)){
    currentTrainingArea = activities[playerStats.currentActivity];
}else{
    currentTrainingArea= activities['activity_0_0'];
    playerStats.currentActivity = currentTrainingArea
}
currentTrainingArea.onSelect();
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
function changeActivity(id) {
    currentTrainingArea.onDeselect();
    playerStats.currentActivity = id;
    currentTrainingArea = activities[id];
    currentTrainingArea.onSelect();
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
