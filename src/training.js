const activityLevelToRank = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];
var activityScaling = {
    "standard1": [1, 2, 3, 5, 7, 9, 12, 15, 18, 22],
    "detriment1": [1, 0.9, 0.8, 0.6, 0.3, 0.1, 0, 0, 0, 0],
    "invert1": [1, 0.9, 0.8, 0.6, 0.3, -0.3, -0.6, -0.8, -0.9, -1],
}
var activityData = {
    "activity_0_0": {
        id: "activity_0_0", name: "Do some pushups", attributeRatios: [0.005, 0, 0, 0],
        tier: 0, attributeScaling: ["standard1", 0, 0, 0],
        timeToComplete: 1, cost: 0, expBase: 5, expPower: 3.3
    },
    "activity_0_1": {
        id: "activity_0_1", name: "Run laps at the park", attributeRatios: [0, 0.005, 0, 0],
        tier: 0, attributeScaling: [0, "standard1", 0, 0],
        timeToComplete: 1, cost: 0, expBase: 5, expPower: 3.3
    },
    "activity_0_2": {
        id: "activity_0_2", name: "Do parkour", attributeRatios: [0, 0, 0, 0.005],
        tier: 0, attributeScaling: [0, 0, 0, "standard1"],
        timeToComplete: 1, cost: 0, expBase: 5, expPower: 3.3
    },
    "activity_0_3": {
        id: "activity_0_3", name: "Learn chess", attributeRatios: [0, 0, 0.005, 0],
        tier: 0, attributeScaling: [0, 0, "standard1", 0],
        timeToComplete: 1, cost: 0, expBase: 5, expPower: 3.3
    },
    "activity_1_0": {
        id: "activity_1_0", name: "Hit the gym", attributeRatios: [0.015, 0, 0, 0],
        tier: 1, attributeScaling: ["standard1", 0, 0, 0],
        timeToComplete: 1, cost: 1, expBase: 25, expPower: 3.3,
    },
    "activity_1_1": {
        id: "activity_1_1", name: "Participate in quarter-marathon", attributeRatios: [0, 0.015, 0, 0],
        tier: 1, attributeScaling: [0, "standard1", 0, 0],
        timeToComplete: 1, cost: 1, expBase: 25, expPower: 3.3,
    },
    "activity_1_2": {
        id: "activity_1_2", name: "Do street juggling", attributeRatios: [0, 0, 0, 0.015],
        tier: 1, attributeScaling: [0, 0, 0, "standard1"],
        timeToComplete: 1, cost: 1, expBase: 25, expPower: 3.3,
    },
    "activity_1_3": {
        id: "activity_1_3", name: "Play competitive chess", attributeRatios: [0, 0, 0.015, 0],
        tier: 1, attributeScaling: [0, 0, "standard1", 0],
        timeToComplete: 1, cost: 1, expBase: 25, expPower: 3.3,
    },
    "activity_2_0": {
        id: "activity_2_0", name: "Train with wrist+ankle weights", attributeRatios: [0.045, -0.015, -0, 0],
        tier: 2, attributeScaling: ["standard1", "invert1", 0, 0],
        timeToComplete: 1, cost: 10, expBase: 125, expPower: 3.3,
    },
    "activity_2_1": {
        id: "activity_2_1", name: "Load cargo at the port", attributeRatios: [-0.015, 0.045, 0, 0],
        tier: 2, attributeScaling: ["invert1", "standard1", 0, 0],
        timeToComplete: 1, cost: 10, expBase: 125, expPower: 3.3,
    },
    "activity_2_2": {
        id: "activity_2_2", name: "Dodge street traffic", attributeRatios: [0, 0, -0.015, 0.045],
        tier: 2, attributeScaling: [0, 0, "invert1", "standard1"],
        timeToComplete: 1, cost: 10, expBase: 125, expPower: 3.3,
    },
    "activity_2_3": {
        id: "activity_2_3", name: "Solve Maxwell Equations", attributeRatios: [0, 0, 0.045, -0.015],
        tier: 2, attributeScaling: [0, 0, "standard1", "invert1"],
        timeToComplete: 1, cost: 10, expBase: 125, expPower: 3.3,
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
        if (activityData[this.id].hasOwnProperty("attributeScaling")) {
            let scalingKeys = activityData[this.id].attributeScaling;
            const final = Array(this.attributeRatios.length).fill(0);
            for (let index = 0; index < this.attributeRatios.length; index++) {
                if (isNaN(scalingKeys[index])) {
                    final[index] = this.attributeRatios[index] * activityScaling[scalingKeys[index]][Math.min(playerStats.activityLevels[this.id].level, 9)];
                }
            }
            return final;
        } else {
            return this.attributeRatios.map(x => x * (Math.min(playerStats.activityLevels[this.id].level, 9) + 1));
        }
    }
    tick() {
        let speed = 0;
        if (currentTrainingArea == this) speed += 1;
        if (playerStats.activityAutomationLevels[this.id]) speed += 0.2 * playerStats.activityAutomationLevels[this.id];
        if (speed <= 0) return;
        if (this.costPaid == false) { if (!this.payCost()) return; }
        this.progress += speed * logicTickTime * getFameEffect("trainingSpeed");
        this.reward();
        if (this.progress >= this.timeToComplete) {
            this.progress -= this.timeToComplete;
            checkTrainingQuest();
            updateAttributePrestigeText();
            // this.reward();
            // this.payCost();
            this.updateRankProgress();
        }
        this.updateBars();

    }
    reward() {
        if (!this.payCost()) return;
        let speed = 0;
        if (currentTrainingArea == this) speed += 1 * getPrestigeBonus(playerStats.classPrestige).manualPower;
        if (playerStats.activityAutomationLevels[this.id]) speed += 0.2 * playerStats.activityAutomationLevels[this.id];
        let rewards = this.RewardPerPlayerLevel;
        let expReward = 0;
        for (let index = 0; index < this.attributeRatios.length; index++) {
            if (rewards[index] != 0) {
                let attribute = attributeIndexToId[index];
                let reward = speed * getPrestigeBonus(playerStats.classPrestige).attributeGain * getDecayBonus(index) * getFameEffect("trainingSpeed") * logicTickTime / 1000 * rewards[index] * (playerStats.level + 1) * (rewards[index] < 0 ? 1 : getTrainingModifier(attribute));
                if ((rewards[index] > 0)) {
                    expReward += speed * getFameEffect("trainingSpeed") * (logicTickTime / 1000) * (1 / 10) * getPrestigeBonus(playerStats.classPrestige).activityExp * Math.pow(1 + (Math.log10(playerStats[attribute] + 1) / 5), 1 + (Math.log10(playerStats[attribute] + 1) / 10));
                }
                playerStats[attribute] = Math.max(playerStats.permanentAttributes[index], playerStats[attribute] + reward);
            }
        }
        playerStats.activityLevels[this.id].exp += expReward;
        if (playerStats.activityLevels[this.id].exp >= this.expToNext && (playerStats.activityLevels[this.id].level < 9)) {
            playerStats.activityLevels[this.id].exp -= this.expToNext;
            if (playerStats.activityLevels[this.id].level < 9) playerStats.activityLevels[this.id].level += 1;
            this.expToNext = this.ExpToNext;
            this.updateRank();
        }
        //this.updateRankProgress();
        // checkTrainingQuest();
        // updateAttributePrestigeText();
    }
    payCost() {
        let speed = 0;
        if (currentTrainingArea == this) speed += 1 * getPrestigeBonus(playerStats.classPrestige).manualPower;
        if (playerStats.activityAutomationLevels[this.id]) speed += 0.2 * playerStats.activityAutomationLevels[this.id];
        if (speed <= 0) return;
        if (playerStats.money < (logicTickTime / 1000) * speed * this.cost) { this.costPaid = false; changeActivity(playerStats.lastFreeActivity); return false; }
        playerStats.money -= (logicTickTime / 1000) * speed * this.cost; this.costPaid = true; moneyCountBuffer -= this.cost * speed * (logicTickTime / 1000); return true;
    }
    updateBars() {
        let bars = this.element.getElementsByTagName("progress");
        bars[0].value = playerStats.activityLevels[this.id].exp;
        bars[1].value = this.progress;
    }
    updateRankProgress() {
        let rankText = this.element.getElementsByTagName("span")[0];
        rankText.innerHTML = `Rank: ${activityLevelToRank[Math.min(playerStats.activityLevels[this.id].level, 9)]}
        (${format(100 * playerStats.activityLevels[this.id].exp / this.expToNext, 2)}%)`;
        let attributeText = this.element.getElementsByTagName("div")[1];
        attributeText.innerHTML = "";
        let speed = 0;
        if (currentTrainingArea == this) speed += 1 * getPrestigeBonus(playerStats.classPrestige).manualPower;
        if (playerStats.activityAutomationLevels[this.id]) speed += 0.2 * playerStats.activityAutomationLevels[this.id];
        for (let index = 0; index < this.attributeRatios.length; index++) {
            const ratio = this.RewardPerPlayerLevel[index];
            if (ratio == 0) continue;
            let s = document.createElement("span");
            s.setAttribute("class", `${attributeIndexToId[index]}Text`);
            let baseAmount = this.RewardPerPlayerLevel[index] * (playerStats.level + 1)
                * getPrestigeBonus(playerStats.classPrestige).attributeGain
                * getTrainingModifier(attributeIndexToId[index])
                * getFameEffect("trainingSpeed")
                * getDecayBonus(index);
            let effectiveAmount = baseAmount * speed;
            s.innerHTML = `${format(effectiveAmount, 3)} (${format(baseAmount, 3)}) `;
            attributeText.append(s);
        }
        attributeText.innerHTML += ' /s';
        let costText = this.element.getElementsByClassName("activityCostText")[0];
        costText.innerHTML = `Cost: (${format(this.cost * speed *getFameEffect("trainingSpeed"), 3)})
        ${format(this.cost * getFameEffect("trainingSpeed"), 3)}/s (<span style="color:rgb(44, 190, 0)">$</span>)`;
    }
    updateRank() {
        let rankText = this.element.getElementsByTagName("span")[0];
        rankText.innerHTML = `Rank: ${activityLevelToRank[Math.min(playerStats.activityLevels[this.id].level, 9)]}`;
        let bars = this.element.getElementsByClassName("rankProgressBar");
        bars[0].max = this.expToNext;
        let attributeText = this.element.getElementsByTagName("div")[1];
        attributeText.innerHTML = "";
        for (let index = 0; index < this.attributeRatios.length; index++) {
            const ratio = this.RewardPerPlayerLevel[index];
            if (ratio == 0) continue;
            let s = document.createElement("span");
            s.setAttribute("class", `${attributeIndexToId[index]}Text`);
            s.innerHTML = `${format(this.RewardPerPlayerLevel[index] * (playerStats.level + 1)
                * getFameEffect("trainingSpeed") * getDecayBonus(index), 3)}`
            attributeText.append(s);
        }
        attributeText.innerHTML += ' /s';
        let costText = this.element.getElementsByClassName("activityCostText")[0];
        costText.innerHTML = `Cost: ${format(this.cost * getFameEffect("trainingSpeed"), 3)}/s (<span style="color:rgb(44, 190, 0)">$</span>)`;
    }
    onSelect() {
        this.element.style.borderColor = 'goldenrod';
        let iconWrapper = document.getElementById("trainingBarOverviewIcon");
        iconWrapper.innerHTML = "";
        for (let index = 0; index < this.attributeRatios.length; index++) {
            const ratio = this.attributeRatios[index];
            if (ratio != 0) {
                let icon = document.createElement("span");
                icon.innerHTML = (ratio > 0 ? ' +' : ' -');
                icon.className = attributeIndexToId[index] + "Text";
                icon.style.color = (ratio > 0 ? 'green' : 'red');
                iconWrapper.append(icon);
            }
        }
    }
    onDeselect() {
        this.element.style.borderColor = "";
    }
}
var activities = {}
// Object.values(trainingAreaData).forEach(element => {
//     if (!playerStats.trainingAreaLevels.hasOwnProperty(element.name)) {
//         playerStats.trainingAreaLevels[element.name] = 0;
//     }
// });
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
    d.setAttribute("onclick", `changeActivity("${id}")`)
    let title = document.createElement("div");
    title.style.whiteSpace = 'nowrap';
    title.innerHTML = activity.name;
    let rankText = document.createElement("span");
    rankText.innerHTML = `Rank: ${activityLevelToRank[playerStats.activityLevels[id].level]}
    (${format(100 * playerStats.activityLevels[id].exp / activity.expToNext, 2)}%)`;
    let rankProgress = document.createElement("progress");
    rankProgress.setAttribute("class", "rankProgressBar");
    rankProgress.max = activity.expToNext;
    rankProgress.value = playerStats.activityLevels[id].exp;
    let attributeText = document.createElement("div");
    for (let index = 0; index < activity.attributeRatios.length; index++) {
        const ratio = activity.RewardPerPlayerLevel[index];
        if (ratio == 0) continue;
        let s = document.createElement("span");
        s.setAttribute("class", `${attributeIndexToId[index]}Text`);
        s.innerHTML = `${format(activity.RewardPerPlayerLevel[index] * (playerStats.level + 1) * getFameEffect("trainingSpeed"), 3)}x`
        attributeText.append(s);
    }
    attributeText.innerHTML += ' /s';
    let costText = document.createElement("span");
    costText.classList.add('activityCostText');
    costText.innerHTML = `Cost: ${format(activity.cost * getFameEffect("trainingSpeed"), 3)}/s (<span style="color:rgb(44, 190, 0)">$</span>)`;
    //UPGRADE BUTTON
    let upgradeButton = document.createElement("button");
    upgradeButton.setAttribute("class", "bannerButton");
    upgradeButton.style.float = 'right';
    upgradeButton.style.marginRight = '1vh';
    upgradeButton.innerHTML = 'Upgrade';
    upgradeButton.addEventListener('click', () => { buyActivityAutomation(activity.id) });
    upgradeButton.dataset['activityUpgradeTooltip'] = activity.id;
    //
    let activityProgress = document.createElement("progress");
    activityProgress.setAttribute("class", "activityProgressBar");
    activityProgress.max = activity.timeToComplete;
    activityProgress.value = 0;
    d.append(title, rankText, rankProgress, attributeText, costText, upgradeButton, activityProgress);
    activityGrid.append(d);
    activities[id].element = d;
    activities[id].updateRankProgress();
});
var currentTrainingArea;
if (activities.hasOwnProperty(playerStats.currentActivity)) {
    currentTrainingArea = activities[playerStats.currentActivity];
} else {
    currentTrainingArea = activities['activity_0_0'];
    playerStats.currentActivity = currentTrainingArea
}
currentTrainingArea.onSelect();
//changeTrainingAttribute(playerStats.currentTrainingAttribute);
//updateTrainingText();
//updateTrainingCanBuy();
const activityAutomationUpgradesLookup = [
    { base: 50, mult: Math.pow(10, 0.125) },
    { base: 5000, mult: Math.pow(10, 0.125) },
    { base: 500000, mult: Math.pow(10, 0.125) },
]
function activityAutoCost(tier) {
    let totalLevels = 0;
    Object.keys(playerStats.activityAutomationLevels)
        .forEach((key) => {
            if (activityData[key].tier != tier) return;
            totalLevels += playerStats.activityAutomationLevels[key];
        })
    const lookup = activityAutomationUpgradesLookup[tier]
    const cost = lookup.base * Math.pow(lookup.mult, totalLevels);
    return cost;
}
function buyActivityAutomation(id) {
    let activity = activityData[id];
    let totalLevels = 0;
    Object.keys(playerStats.activityAutomationLevels)
        .forEach((key) => {
            if (activityData[key].tier != activity.tier) return;
            totalLevels += playerStats.activityAutomationLevels[key];
        })
    const lookup = activityAutomationUpgradesLookup[activity.tier]
    let cost = lookup.base * Math.pow(lookup.mult, totalLevels);
    if (playerStats.money >= cost) {
        playerStats.money -= cost;
        if (playerStats.activityAutomationLevels[activity.id]) {
            playerStats.activityAutomationLevels[activity.id] += 1;
        } else {
            playerStats.activityAutomationLevels[activity.id] = 1;
        }
    }
}
function generateActivityAutoUpgradeTooltip(id) {
    let activity = activityData[id];
    let autoLevel = playerStats.activityAutomationLevels[activity.id] ? playerStats.activityAutomationLevels[activity.id] : 0;
    const cost = activityAutoCost(activity.tier);
    let displayText = "";
    displayText += `Auto Level: ${autoLevel}<br>`
    displayText += `This activity is automatically done at <span style='color: white;'>${20 * autoLevel}% efficiency</span> (+20% per level)<br>`
    displayText += `Upgrade cost: <span style='color: white;'>${format(cost, 2)}$</span><br>`
    displayText += `<i style = "font-size: 1.5vh"> Upgrading increases the auto cost of every activity in the same tier!</i>`
    return displayText;
}
function changeTrainingAttribute(attribute) {
    playerStats.currentTrainingAttribute = attribute;
    currentTrainingArea.attribute = attribute;
    currentTrainingArea.progress = 0;
    document.getElementById("currentTrainingAttribute").innerHTML = attribute;
    document.getElementById("trainingBarOverviewIcon").className = attribute + "Text";
}
function changeActivity(id) {
    if (["activity_0_0", "activity_0_1", "activity_0_2", "activity_0_3"].includes(id)) {
        playerStats.lastFreeActivity = id;
    }
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
function updateTrainingCanBuy() {
    if (playerStats.money >= currentTrainingArea.Cost) {
        document.getElementById("trainingCanUpgradeText").innerHTML = "Upgrade available!";
    } else {
        document.getElementById("trainingCanUpgradeText").innerHTML = "";
    }
}
function tickTraining() {
    Object.values(activities).forEach((activity) => {
        activity.tick();
    })
}
function resetAutoUpgrades() {
    Object.keys(playerStats.activityAutomationLevels).forEach((activity) => {
        playerStats.activityAutomationLevels[activity] = 0;
    })
}

