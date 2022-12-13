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
        name: "Punch",
        description: "A simple punch, everyone knows how to do it.",
        iconName: "punch",
        damage: 1,
        damageRatios: [.8, 0, 0, 0.2],
        damageRange: [0.9, 1.1],
        time: 3000,
        cooldownTime: 0,
        range: 10,
    },
    'kick': {
        type: 0,
        name: "Kick",
        description: "Leverage your lower body strength to knock those criminals on their asses",
        iconName: "kick",
        damage: 2,
        damageRatios: [1.2, 0, 0, 0.4],
        damageRange: [1, 1.2],
        time: 4000,
        cooldownTime: 5000,
        range: 10,
    },
    'jab': {
        type: 0,
        name: "Jab",
        description: "Faster than a punch but weaker, good to knockout small fry and get out of the way.",
        iconName: "jab",
        damage: 1,
        damageRatios: [.08, 0, 0, .22],
        damageRange: [.95, 1.05],
        time: 1000,
        cooldownTime: 0,
        range: 10,
    },
    'haymaker': {
        type: 0,
        name: "Haymaker",
        description: "Prepare to deliver a massive blow to your foe. Slow.",
        iconName: "smash",
        damage: 10,
        damageRatios: [2, .8, 0, 0],
        damageRange: [1, 1.5],
        time: 7000,
        cooldownTime: 10000,
        range: 10,
    },
    'crowbar': {
        type: 0,
        name: "Crowbar",
        description: "This does not seem fair?",
        iconName: "crowbar",
        damage: 10,
        damageRatios: [3, 0, 0, 0],
        damageRange: [1, 2],
        time: 4000,
        cooldownTime: 20000,
        range: 10,
    },
    'walk': {
        type: 1,
        name: "move",
        description: "1. 2. 1. 2.",
        iconName: "move",
        damage: 0,
        time: 1000,
        cooldownTime: 0,
        range: 10,
    }
}
abilityUnlocks = {
    0: ['punch'],
    5: ['kick', 'jab'],
    10: ['haymaker'],
    15: ['crowbar'],
}
let loadoutContainer = document.getElementById("abilityLoadoutContainer");
let abilityRequirementsGrid = document.getElementById("abilityRequirementsGrid");
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
checkAbilityRequirements();

populateAbilityRequirements();
populateAbilitySlots();
function checkAbilityRequirements() {
    for (const [levelRequirement, abilities] of Object.entries(abilityUnlocks)) {
        if (playerStats.level >= levelRequirement) {
            abilities.forEach(ability => {
                playerStats.unlockedAbilities[ability] = 1;
            });
        }
    }
    populateAbilitySlots();
}

function populateAbilityRequirements() {
    let levels = Object.keys(abilityUnlocks);
    for (let index = 0; index < levels.length; index++) {
        let abilities = abilityUnlocks[levels[index]]
        let label = document.createElement("div");
        label.setAttribute("class", "pickle abilityPickContainerLabel");
        label.innerHTML = "Level " + levels[index];
        abilityRequirementsGrid.append(label);
        let c = document.createElement("div");
        c.setAttribute("class", "abilityPickContainer");
        abilityRequirementsGrid.append(c);
        for (let abilityN = 0; abilityN < abilities.length; abilityN++) {
            const ability = abilities[abilityN];
            let b = document.createElement("button");
            b.setAttribute("class", "abilityPickButton tooltip");
            b.style.backgroundImage = `url("${playerMoves[ability].iconName}Icon.png")`;
            c.append(b);
            let t = document.createElement("div");
            t.setAttribute("class", "tooltiptext pickle");
            t.innerHTML = generateAbilityRequirementTooltip(ability);
            b.appendChild(t);
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
function populateAbilitySlots() {
    let currentAbilities = playerStats.equippedAbilities.slice(1);
    for (let slotN = 0; slotN < slots.length; slotN++) {
        const element = slots[slotN];
        element.innerHTML = "";
        let noOption = document.createElement("option");
        noOption.innerHTML = "None";
        noOption.value = null;
        element.appendChild(noOption);
        Object.keys(playerStats.unlockedAbilities).forEach(ability => {
            let option = document.createElement("option");
            option.innerHTML = playerMoves[ability].name;
            option.value = ability;
            element.appendChild(option);
            if (currentAbilities[slotN] == ability) {
                option.setAttribute("selected", "selected");
                element.style.backgroundImage = "url(" + playerMoves[ability].iconName + "Icon.png)"
            };
        });
    }
}
function changeAbilitySlot(slotN, internal = false) {
    const slot = slots[slotN];
    const newAbility = slot.value;
    console.log("Slot:" + slotN + ": " + newAbility);
    if (newAbility == "null") {
        let allow = false;
        if (!internal) {
            for (let index = 1; index < playerStats.equippedAbilities.length; index++) {
                if (index - 1 == slotN) continue;
                if (playerStats.equippedAbilities[index] != null) {
                    allow = true;
                    break;
                }
            }
        } else {
            allow = true;
        }
        console.log(allow);
        if (!allow) { slot.value = playerStats.equippedAbilities[slotN + 1]; return; }
        slot.style.backgroundImage = "none";
        playerStats.equippedAbilities[slotN + 1] = null;
    } else {
        for (let i = 0; i < slots.length; i++) {
            if (i == slotN) continue;
            const otherSlot = slots[i];
            if (otherSlot.value == newAbility) {
                otherSlot.value = null;
                changeAbilitySlot(i, true);
            }
        }
        slot.style.backgroundImage = "url(" + playerMoves[newAbility].iconName + "Icon.png)";
        playerStats.equippedAbilities[slotN + 1] = newAbility;
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
function generateAbilityRequirementTooltip(ability) {
    const abilityData = playerMoves[ability];
    let stringDisplay = "";
    stringDisplay += abilityData.name + "<br />";
    stringDisplay += abilityData.description + "<br />";
    if (abilityData.type == 0) {
        stringDisplay += "Damage:" + "<br />";
        for (let attributeRatio = 0; attributeRatio < abilityData.damageRatios.length; attributeRatio++) {
            let ratio = abilityData.damageRatios[attributeRatio] * 100;
            if (ratio == 0) continue;
            let attributeId = attributeIndexToId[attributeRatio];
            let attributeName = attributeDisplayNames[attributeRatio];
            stringDisplay += `${ratio}% <span class="${attributeId}Text">${attributeDisplayShort[attributeId]}</span><br />`;
        }
    }
    stringDisplay += `Use time: ${abilityData.time / 1000}s<br />`
    if (abilityData.cooldownTime > 0) {
        stringDisplay += `Cooldown: ${abilityData.cooldownTime / 1000}s<br />`
    }
    return stringDisplay;
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