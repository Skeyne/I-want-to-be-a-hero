var trainingAreaData = {
    0: { name: "Park", base: 0.01, timeToComplete: 5, costMultiplier: 10},
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
        let reward = this.base * Math.pow(TRAINING_REWARD_GROWTH_BASE,playerStats.trainingAreaLevels[this.name]);
        playerStats[this.attribute] += reward;
        checkTrainingQuest();
    }

}
var currentTrainingArea = new TrainingArea(trainingAreaData[0]);
changeTrainingAttribute(playerStats.currentTrainingAttribute);
updateTrainingText();
function changeTrainingAttribute(attribute) {
    playerStats.currentTrainingAttribute = attribute;
    currentTrainingArea.attribute = attribute;
    currentTrainingArea.progress = 0;
    document.getElementById("currentTrainingAttribute").innerHTML = attribute;
}
function upgradeTrainingArea(){
    if(playerStats.money >= currentTrainingArea.Cost){
        playerStats.money -= currentTrainingArea.Cost;
        playerStats.trainingAreaLevels[currentTrainingArea.name] += 1;
        updateTrainingText()

    }
}

function updateTrainingText(){
    document.getElementById("trainingUpgradeCost").innerHTML = format(currentTrainingArea.Cost);
    document.getElementById("trainingReward").innerHTML = format(currentTrainingArea.Reward);
}

