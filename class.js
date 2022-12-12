skillLibrary = {
    "Human": {
        'h_0': {
            id: 'h_0',
            name: 'Calisthenics',
            iconName: 'calisthenics',
            desc: 'Increase your Strength through the power of home workouts',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additiveFlat", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 0.5,
            },
            maxLevel: 5,
            cost: [1, 1, 1, 1, 1],
        },
        'h_1': {
            id: 'h_1',
            name: '"Borrowed Dumbells"',
            iconName: 'calisthenics',
            desc: 'They weren\'t using them anyways.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "additivePercent",
                effectMagnitude: 0.05,
            },
            maxLevel: 3,
            cost: [2, 2, 2],
        },
        'h_2': {
            id: 'h_2',
            name: '"Big Boy Pills"',
            iconName: 'calisthenics',
            desc: 'It\'s just like hard candy.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "strength",
                effectType: "multPercent",
                effectMagnitude: 1.2,
            },
            maxLevel: 1,
            cost: [5],
        },
        'h_3': {
            id: 'h_3',
            name: 'Five Mile Run',
            iconName: 'milerun',
            desc: 'Coach said this would toughen you up.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additiveFlat", //additive
                effectMagnitude: 1,
            },
            maxLevel: 5,
            cost: [1, 1, 1, 1, 1],
        },
        'h_4': {
            id: 'h_4',
            name: 'Construction Job',
            iconName: 'milerun',
            desc: 'And a cold one after work.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "additivePercent", //additive
                effectMagnitude: 0.1,
            },
            maxLevel: 2,
            cost: [2, 2, 2],
        },
        'h_5': {
            id: 'h_5',
            name: '8200 Postcode Night Run',
            iconName: 'milerun',
            desc: 'Hey this area doesn\'t look so b-',
            effect: {
                type: 0, // attribute boost
                effectTarget: "toughness",
                effectType: "multPercent", //additive
                effectMagnitude: 1.2,
            },
            maxLevel: 1,
            cost: [5],
        },
        'h_6': {
            id: 'h_6',
            name: 'Dodge the swing',
            iconName: 'shadowB',
            desc: 'We used to do this as kids.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additiveFlat", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 0.5,
            },
            maxLevel: 5,
            cost: [1, 1, 1, 1, 1],
        },
        'h_7': {
            id: 'h_7',
            name: 'Shadow boxing',
            iconName: 'shadowB',
            desc: 'Shadows to keep you light.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "additivePercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 0.1,
            },
            maxLevel: 3,
            cost: [2, 2, 2],
        },
        'h_8': {
            id: 'h_8',
            name: 'Acquire J\'s',
            iconName: 'shadowB',
            desc: 'Jays on my feet.',
            effect: {
                type: 0, // attribute boost
                effectTarget: "agility",
                effectType: "multPercent", //additiveDlat, additivePercent, multPercent
                effectMagnitude: 1.3,
            },
            maxLevel: 1,
            cost: [5],
        },
    },

}
playerMoves = {
    'punch': {
        type: 0,
        name: "punch",
        iconName: "punch",
        damage: 1,
        damageRatios: [1, 0, 0, 0.2],
        damageRange: [0.9, 1.1],
        time: 3000,
        cooldownTime: 0,
        range: 10,
    },
    'kick': {
        type: 0,
        name: "kick",
        iconName: "kick",
        damage: 2,
        damageRatios: [1.6, 0, 0, 0.8],
        damageRange: [1, 1.2],
        time: 4000,
        cooldownTime: 5000,
        range: 10,
    },
    'jab': {
        type: 0,
        name: "jab",
        iconName: "punch",
        damage: 1,
        damageRatios: [.1, 0, 0, .4],
        damageRange: [.95, 1.05],
        time: 1000,
        cooldownTime: 0,
        range: 10,
    },
    'haymaker': {
        type: 0,
        name: "haymaker",
        iconName: "smash",
        damage: 10,
        damageRatios: [3, 2, 0, 0],
        damageRange: [1, 1.5],
        time: 7000,
        cooldownTime: 10000,
        range: 10,
    },
    'walk': {
        type: 1,
        name: "move",
        iconName: "move",
        damage: 0,
        time: 1000,
        cooldownTime: 0,
        range: 10,
    }
}
abilityUnlocks = {
    0:['punch','walk'],
    5:['kick'],
    10:['haymaker'],
}

let abilityRequirementsGrid = document.getElementById("abilityRequirementsGrid");
populateAbilityRequirements();
function populateAbilityRequirements(){
    let levels = Object.keys(abilityUnlocks);
    for (let index = 0; index < levels.length; index++) {
        let abilities = abilityUnlocks[levels[index]]
        let label = document.createElement("div");
        label.setAttribute("class","pickle abilityPickContainerLabel");
        label.innerHTML = "Level " + levels[index];
        abilityRequirementsGrid.append(label);
        let c = document.createElement("div");
        c.setAttribute("class","abilityPickContainer");
        abilityRequirementsGrid.append(c);
        for (let abilityN = 0; abilityN < abilities.length; abilityN++) {
            const ability = abilities[abilityN];
            let b = document.createElement("button");
            b.setAttribute("class","abilityPickButton");
            b.style.backgroundImage = `url("${playerMoves[ability].iconName}Icon.png")`;
            c.append(b);
        }
    }
}



let grid = document.getElementById("passiveTreeGrid");
let passiveButtonDict = {};
let i = 0;
Object.values(skillLibrary[playerStats.class]).forEach(skill => {
    // let d = document.createElement("div");
    // d.setAttribute("class","tooltip");
    // grid.appendChild(d);
    let b = document.createElement("button");
    passiveButtonDict[skill.id] = b;
    b.style.gridRow = i;
    b.style.gridColumn = i;
    b.style.background = "url(" + skill.iconName + "PassiveIcon.png)" + " no-repeat";
    b.style.backgroundSize = "contain";
    b.setAttribute("class", "passiveSkillButton tooltip");
    b.setAttribute("onclick", `checkSkillPurchase("${skill.id}")`)
    grid.appendChild(b);
    let t = document.createElement("div");
    t.setAttribute("class", "tooltiptext pickle");
    t.innerHTML = generatePassiveTooltip(skill);
    b.appendChild(t);
    let l = document.createElement("div");
    l.setAttribute("class", "passiveSkillLevel");
    if (!playerStats.unlockedSkills.hasOwnProperty(skill.id)) {
        l.innerHTML = 0;
    } else {
        l.innerHTML = playerStats.unlockedSkills[skill.id];
    }
    b.appendChild(l);

});
let loadoutContainer = document.getElementById("abilityLoadoutContainer");
let slots = [];
for (let index = 0; index < playerStats.abilitySlots; index++) {
    let slot = document.createElement("select");
    slot.setAttribute("class", "abilitySlot");
    slot.style.height = "4rem";
    slot.style.width = "4rem";
    slots.push(slot);
    slot.setAttribute("onchange", `changeAbilitySlot(${index})`);
    loadoutContainer.appendChild(slot);
}
populateAbilitySlots();
function populateAbilitySlots() {
    let currentAbilities = playerStats.equippedAbilities.slice(1);
    console.log(currentAbilities);
    for (let slotN = 0; slotN < slots.length; slotN++) {
        const element = slots[slotN];
        let noOption = document.createElement("option");
        noOption.innerHTML = "None";
        noOption.value = null;
        element.appendChild(noOption);
        Object.keys(playerStats.unlockedAbilities).forEach(ability => {
            let option = document.createElement("option");
            option.innerHTML = ability;
            option.value = ability;
            element.appendChild(option);
            if (currentAbilities[slotN] == ability) {
                option.setAttribute("selected", "selected");
                element.style.backgroundImage = "url(" + playerMoves[ability].iconName + "Icon.png)"
            };
        });
    }
}
function changeAbilitySlot(slotN) {
    const slot = slots[slotN];
    const newAbility = slot.value;
    console.log("Slot:"+slotN+": "+newAbility);
    if (newAbility == "null") {
        slot.style.backgroundImage = "none";
        playerStats.equippedAbilities[slotN+1] = null;
    } else {
        for (let i = 0; i < slots.length; i++) {
            const otherSlot = slots[i];
            if (i == slotN) continue;
            if (otherSlot.value == newAbility) {
                otherSlot.value = null;
                changeAbilitySlot(i);
            }
        }
        slot.style.backgroundImage = "url(" + playerMoves[newAbility].iconName + "Icon.png)";
        playerStats.equippedAbilities[slotN+1] = newAbility;
    }
}
function generatePassiveTooltip(skill) {
    let numberDisplay = "";
    switch (skill.effect.effectType) {
        case "additiveFlat":
            numberDisplay = "+" + skill.effect.effectMagnitude;
            break;
        case "additivePercent":
            numberDisplay = "+" + skill.effect.effectMagnitude * 100 + "%";
            break;
        case "multPercent":
            numberDisplay = "x" + skill.effect.effectMagnitude;
            break;
        default:
            console.log("Undefined effect type")
            break;
    }
    let cost = skill.cost[getPlayerPassiveLevel(skill.id)];
    let costString = "";
    if (isNaN(cost)) { costString = "MAXED!" } else { costString = skill.cost[getPlayerPassiveLevel(skill.id)] + " Points" };
    return `${skill.name} ${getPlayerPassiveLevel(skill.id)}/${skill.maxLevel}` + "<br />" +
        skill.desc + "<br />" +
        `<span class="${skill.effect.effectTarget}Text">${attributeDisplayNames[skill.effect.effectTarget]}</span> ${numberDisplay}` + "<br />" +
        "Cost: " + costString;
}

function getPlayerPassiveLevel(skillId) {
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        return 0;
    } else {
        return playerStats.unlockedSkills[skillId];
    }
}



function addSkill(skillId) {
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        playerStats.unlockedSkills[skillId] = 1;
    } else {
        playerStats.unlockedSkills[skillId] += 1;
    }
    addEffect(skillId);
}
function reduceSkill(skillId) {
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        console.log("Failed skill removal. Player did not have that skill (id: " + skillId + ")");
    } else if (playerStats.unlockedSkills[skillId] < 2) {
        removeEffect(skillId);
        delete playerStats.unlockedSkills[skillId];
    } else {
        playerStats.unlockedSkills[skillId] -= 1;
        addEffect(skillId);
    }
    //addEffect(skillId);
}
function removeSkill(skillId) {
    if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        console.log("Failed skill removal. Player did not have that skill (id: " + skillId + ")");
        return false;
    } else {
        removeEffect(skillId);
        delete playerStats.unlockedSkills[skillId];
        return true;
    }
}
function setSkill(skillId, level) {
    if (isNaN(level)) return false;
    if (level <= 0) {
        if (!playerStats.unlockedSkills.hasOwnProperty(skillId)) {
            console.log("Failed skill removal. Player did not have that skill (id: " + skillId + ")");
        } else {
            removeEffect(skillId);
            delete playerStats.unlockedSkills[skillId];
        }
    }
    else {
        playerStats.unlockedSkills[skillId] = level;
        addEffect(skillId);
    }
    return true;
}

function addEffect(skillId) {
    let skill = skillLibrary[playerStats.class][skillId];
    if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)) {
        playerStats.effectMultipliers[skill.effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
    }
    playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id] =
        skill.effect.effectMagnitude * playerStats.unlockedSkills[skillId];
}
function removeEffect(skillId) {
    let skill = skillLibrary[playerStats.class][skillId];
    if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect.effectTarget)) {
        playerStats.effectMultipliers[skill.effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
    }
    if (playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType].hasOwnProperty(skill.id)) {
        delete playerStats.effectMultipliers[skill.effect.effectTarget][skill.effect.effectType][skill.id];
    } else {
        console.log("::ERROR:: Attempting to delete non-existing effect (id:" + skillId + ")");
    }
}

function checkSkillPurchase(skillId) {
    console.log("Test");
    let cost = 0;

    if (playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        let skill = skillLibrary[playerStats.class][skillId];
        if (playerStats.unlockedSkills[skillId] >= skill.maxLevel) { logConsole(`${skill.name} is already max level!`); return false; }
        cost = skillLibrary[playerStats.class][skillId].cost[playerStats.unlockedSkills[skillId]];
    } else {
        cost = skillLibrary[playerStats.class][skillId].cost[0];
    }
    if (cost <= (playerStats.level - playerStats.passivePointsSpent)) {
        playerStats.passivePointsSpent += cost;
        addSkill(skillId);
    }
    updateButton(skillId);
}

function updateButton(skillId) {
    let l = passiveButtonDict[skillId].querySelector('.passiveSkillLevel');
    if (playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        l.innerHTML = playerStats.unlockedSkills[skillId];
    } else {
        l.innerHTML = 0;
    }
    let t = passiveButtonDict[skillId].querySelector('.tooltiptext');
    t.innerHTML = generatePassiveTooltip(skillLibrary[playerStats.class][skillId]);
}

function resetSkills() {
    let old = Object.keys(playerStats.unlockedSkills);
    old.forEach(skillId => {
        removeSkill(skillId);
    });
    playerStats.passivePointsSpent = 0;
    for (const [key, value] of Object.entries(passiveButtonDict)) {
        updateButton(key);
    }
}