var trainingAreaData = {
    0: { name: "Park", base: 0.05, timeToComplete: 10, costMultiplier: 1},
}
Object.values(trainingAreaData).forEach(element => {
    if(!playerStats.trainingAreaLevels.hasOwnProperty(element.name)){
        playerStats.trainingAreaLevels[element.name] = 0;
    }
});
class TrainingArea {
    constructor(data) {
        this.name = data.name;
        this.attribute = playerStats.currentTrainingAttribute;
        this.base = data.base;
        this.costMultiplier = data.costMultiplier;
        this.timeToComplete = 1000 * data.timeToComplete;
        this.progress = 0;
    }
    get Cost(){
        return this.base * this.costMultiplier * Math.pow(TRAINING_COST_GROWTH_BASE, playerStats.trainingAreaLevels[this.name]);
    }
    get Reward(){
        return this.base * Math.pow(TRAINING_REWARD_GROWTH_BASE,playerStats.trainingAreaLevels[this.name]);
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
var currentTrainingArea = new TrainingArea(trainingAreaData[0]);
changeTrainingAttribute(playerStats.currentTrainingAttribute);
updateTrainingText();
updateTrainingCanBuy();
function changeTrainingAttribute(attribute) {
    playerStats.currentTrainingAttribute = attribute;
    currentTrainingArea.attribute = attribute;
    currentTrainingArea.progress = 0;
    document.getElementById("currentTrainingAttribute").innerHTML = attribute;
    document.getElementById("trainingBarOverviewIcon").className = attribute+"Text";
}
function upgradeTrainingArea(){
    if(playerStats.money >= currentTrainingArea.Cost){
        playerStats.money -= currentTrainingArea.Cost;
        playerStats.trainingAreaLevels[currentTrainingArea.name] += 1;
        updateTrainingText();
        updateTrainingCanBuy();

    }
}

function updateTrainingText(){
    document.getElementById("trainingUpgradeCost").innerHTML = format(currentTrainingArea.Cost)+'$';
    document.getElementById("trainingReward").innerHTML = format(currentTrainingArea.Reward);
}

function updateTrainingNextText(){
    document.getElementById("trainingUpgradeCost").innerHTML = format(currentTrainingArea.Cost)+'$';
    document.getElementById("trainingReward").innerHTML = format(currentTrainingArea.Reward) +
             " -> " + format(currentTrainingArea.Reward*TRAINING_REWARD_GROWTH_BASE);
}
function updateTrainingCanBuy(){
    if(playerStats.money >= currentTrainingArea.Cost){
        document.getElementById("trainingCanUpgradeText").innerHTML = "Upgrade available!";
    } else {
        document.getElementById("trainingCanUpgradeText").innerHTML = "";
    }
}
