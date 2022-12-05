skillLibrary = {
    "Human": {
        'h_0' : {
            id: 'h_0',
            name: 'Calisthenics',
            iconName: 'calisthenics',
            desc:'Increase your Strength through the power of home workouts',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additiveFlat", //additive
                effectMagnitude: 5,  
            },
            maxLevel : 5,
        },
        'h_1' : {
            id: 'h_1',
            name: 'Five Mile Run',
            iconName: 'milerun',
            desc:'Coach said this would toughen you up.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additive
                effectMagnitude: 5,  
            },
            maxLevel : 5,
        }
    },

}
function generatePassiveTooltip(skill){
    return skill.name +"<br />"+
        skill.desc +"<br />"+
        `<span id="${skill.effect.effectTarget}Text">${skill.effect.effectTarget}</span> +${skill.effect.effectMagnitude} (${skill.effect.effectType})`+"<br />"+
        "Max levels: " + skill.maxLevel;
}
let grid = document.getElementById("passiveTreeGrid")
let i = 0;
Object.values(skillLibrary[playerStats.class]).forEach(skill => {
    // let d = document.createElement("div");
    // d.setAttribute("class","tooltip");
    // grid.appendChild(d);
    let b = document.createElement("button");
    b.style.gridRow = i;
    b.style.gridColumn = i;
    b.style.background = "url("+skill.iconName+"PassiveIcon.png)"+" no-repeat";
    b.style.backgroundSize = "contain";
    b.setAttribute("class","passiveSkillButton tooltip");
    b.setAttribute("onclick",`checkSkillPurchase("${skill.id}")`)
    grid.appendChild(b);
    let t = document.createElement("div");
    t.setAttribute("class","tooltiptext pickle");
    t.innerHTML = generatePassiveTooltip(skill);
    b.appendChild(t);
    
});

function addSkill(skillId){
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)){
        playerStats.unlockedSkills[skillId] = 1;
    } else{
        playerStats.unlockedSkills[skillId] += 1;
    }
    addEffect(skillId);
}
function reduceSkill(skillId){
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)){
        console.log("Failed skill removal. Player did not have that skill (id: "+skillId+")");
    } else if(playerStats.unlockedSkills[skillId] < 2){
        removeEffect(skillId);
        delete playerStats.unlockedSkills[skillId];
    } else {
        playerStats.unlockedSkills[skillId] -= 1;
        addEffect(skillId);
    }
    //addEffect(skillId);
}
function removeSkill(skillId){
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)){
        console.log("Failed skill removal. Player did not have that skill (id: "+skillId+")");
        return false;
    } else {
        removeEffect(skillId);
        delete playerStats.unlockedSkills[skillId];
        return true;
    }
}
function setSkill(skillId,level){
    if(isNaN(level)) return false;
    if(level <= 0){
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)){
        console.log("Failed skill removal. Player did not have that skill (id: "+skillId+")");
    } else {
        removeEffect(skillId);
        delete playerStats.unlockedSkills[skillId];
    }}
    else {
        playerStats.unlockedSkills[skillId] = level;
        addEffect(skillId);
    }  
    return true;
}

function addEffect(skillId){
    let skill = skillLibrary[playerStats.class][skillId]
    if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)){
        playerStats.effectMultipliers[skill.effect.effectTarget] = {additiveFlat:{},additivePercent:{},multPercent:{},};
    }
    playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
        skill.effect.effectMagnitude * playerStats.unlockedSkills[skillId];
}
function removeEffect(skillId){
    let skill = skillLibrary[playerStats.class][skillId]
    if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)){
        playerStats.effectMultipliers[skill.effect.effectTarget] = {additiveFlat:{},additivePercent:{},multPercent:{},};
    }
    if (playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType].hasOwnProperty(skill.id)){
        delete playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id];
    } else {
        console.log("::ERROR:: Attempting to delete non-existing effect (id:"+skillId+")");
    }
}

function checkSkillPurchase(skillId){
    console.log("Test");
    let cost = 0;
    if(playerStats.unlockedSkills.hasOwnProperty(skillId)){
        cost = playerStats.unlockedSkills[skillId];
    } else {
        cost = 1;
    }
    if (cost <= (playerStats.level - playerStats.passivePointsSpent)) {
        playerStats.passivePointsSpent += cost;
        addSkill(skillId);
    }
}

function resetSkills(){
    let old = Object.keys(playerStats.unlockedSkills);
    old.forEach(skillId => {
        removeSkill(skillId);
    });
    playerStats.passivePointsSpent = 0;
}