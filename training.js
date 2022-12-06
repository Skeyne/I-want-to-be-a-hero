const attribute = {
    strength : "strength",
    toughness : "toughness",
    mind : "mind",
    agility : "agility",
}

class TrainingArea{
    constructor(name,attribute,trainingAmount,timeToComplete){
        this.name = name;
        this.attribute = attribute;
        this.base = trainingAmount;
        this.timeToComplete = 1000*timeToComplete;
        this.progress = 0;
    }
    tick(){
        this.progress += logicTickTime;
        if (this.progress >= this.timeToComplete) {
            this.progress -= this.timeToComplete;
            this.reward();
        }
    }
    reward(){
        playerStats[this.attribute] += this.base;
        checkTrainingQuest();
    }   

}
currentTrainingAttribute = attribute.strength;
currentTrainingArea = new TrainingArea("Park",currentTrainingAttribute,0.01,5);
changeTrainingAttribute(currentTrainingAttribute);

function changeTrainingAttribute(attribute){
    currentTrainingAttribute = attribute;
    currentTrainingArea.attribute = attribute;
    currentTrainingArea.progress = 0;
    document.getElementById("currentTrainingAttribute").innerHTML = attribute;
}
