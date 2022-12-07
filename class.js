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
                effectType: "additiveFlat", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1,  
            },
            maxLevel : 5,
        },
        'h_1' : {
            id: 'h_1',
            name: '"Borrowed Dumbells"',
            iconName: 'calisthenics',
            desc:'They weren\'t using them anyways.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent",
                effectMagnitude: 0.05,  
            },
            maxLevel : 5,
        },
        'h_2' : {
            id: 'h_2',
            name: '"Big Boy Pills"',
            iconName: 'calisthenics',
            desc:'It\'s just like hard candy.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent",
                effectMagnitude: 1.2,  
            },
            maxLevel : 1,
        },
        'h_3' : {
            id: 'h_3',
            name: 'Five Mile Run',
            iconName: 'milerun',
            desc:'Coach said this would toughen you up.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additive
                effectMagnitude: 2,  
            },
            maxLevel : 5,
        },
        'h_4' : {
            id: 'h_4',
            name: 'Construction Job',
            iconName: 'milerun',
            desc:'And a cold one after work.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additive
                effectMagnitude: 0.1,  
            },
            maxLevel : 2,
        },
        'h_5' : {
            id: 'h_5',
            name: '8200 Postcode Night Run',
            iconName: 'milerun',
            desc:'Hey this area doesn\'t look so b-',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additive
                effectMagnitude: 1.5,  
            },
            maxLevel : 1,
        },
        'h_6' : {
            id: 'h_6',
            name: 'Dodge the swing',
            iconName: 'calisthenics',
            desc:'We used to do this as kids.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additiveFlat", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1,  
            },
            maxLevel : 5,
        },
        'h_7' : {
            id: 'h_7',
            name: 'Shadow boxing',
            iconName: 'calisthenics',
            desc:'Shadows to keep you light.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 0.05,  
            },
            maxLevel : 5,
        },
        'h_8' : {
            id: 'h_8',
            name: 'Acquire J\'s',
            iconName: 'calisthenics',
            desc:'Jays on my feet.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1.5,  
            },
            maxLevel : 1,
        },
    },

}
function generatePassiveTooltip(skill){
    let numberDisplay ="";
    switch (skill.effect.effectType) {
        case "additiveFlat":
            numberDisplay = "+"+ skill.effect.effectMagnitude;
            break;
        case "additivePercent":
            numberDisplay = "+"+ skill.effect.effectMagnitude*100+"%";
            break;
        case "multPercent":
            numberDisplay = "x"+ skill.effect.effectMagnitude;
            break;
        default:
            console.log("Undefined effect type")
            break;
    }
    return skill.name +"<br />"+
        skill.desc +"<br />"+
        `<span id="${skill.effect.effectTarget}Text">${skill.effect.effectTarget}</span> ${numberDisplay}`+"<br />"+
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
    let skill = skillLibrary[playerStats.class][skillId];
    if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)){
        playerStats.effectMultipliers[skill.effect.effectTarget] = {additiveFlat:{},additivePercent:{},multPercent:{},};
    }
    playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
        skill.effect.effectMagnitude * playerStats.unlockedSkills[skillId];
}
function removeEffect(skillId){
    let skill = skillLibrary[playerStats.class][skillId];
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
        let skill = skillLibrary[playerStats.class][skillId];
        if(playerStats.unlockedSkills[skillId]>= skill.maxLevel){logConsole(`${skill.name} is already max level!`);return false;}
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