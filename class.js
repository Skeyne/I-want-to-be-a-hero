const classTreeNames = {
    'human': ['Aspiring Hero'],
    'superhuman': ['Might', 'Titan', 'Spirit'],
    'mutant': ['Biologic', 'Abomination', 'Bestial'],
    'esper': ['Psionic', 'Matter', 'Spiritual'],
    'ninja': ['Bladelore', 'Ninjutsu', 'Shadowcraft'],
}
classTrees = {
    'human': 1,
    'superhuman': 3,
    'mutant': 3,
    'esper': 3,
    'ninja': 3,
}
abilityUnlocks = {
    'human': {
        0: ['punch'],
        5: ['kick', 'jab'],
        10: ['haymaker', 'firecrackers'],
        15: ['crowbar', 'throwingKnife'],
    },
    'superhuman': {
        0: ['simplePunch'],
        10: ['titanicSwing', 'multipleSimplePunches'],
        25: ['airCannon', 'secondWind'],
    },
    'mutant': {
        0: ['bulkFist'],
        10: ['corrosiveBurst', 'tentaclePull'],
        25: ['engulf']
    },
    'esper': {
        0: ['spiritFist'],
        10: ['telekineticProjectile', 'psionicPulse'],
        25: ['psionicBarrier', 'repulsionWave']
    },
    'ninja': {
        0: ['katana'],
        10: ['shadowStrike', 'shuriken'],
        25: ['flashStep', 'bladeStorm', 'diversion'],
    },
    'cyborg': {
        0: ['punch'],
    },
}
// previewRowHeader.setAttribute("id", "previewRowHeader");
// let previewRowBody = document.createElement("div");
// previewRowBody.setAttribute("id", "previewRowBody");
// let abilityRequirementsGrid = document.getElementById("abilityRequirementsGrid");
// abilityRequirementsGrid.append(previewRowHeader);
// abilityRequirementsGrid.append(previewRowBody);
let loadoutContainer = document.getElementById("abilityLoadoutContainer");
//version fixing stuff
if (playerStats.class != 'human') { playerStats.abilitySlots = 4 } else { playerStats.abilitySlots = 3 };
let slots = [];
RebuildSlots();
function generateSubclassTabs() {
    let container = document.getElementById("subClassTabContainer");
    container.innerHTML = "";
    let treeContainer = document.getElementById("passiveTreeContainer");
    treeContainer.innerHTML = "";
    for (let index = 0; index < classTrees[playerStats.class]; index++) {
        let b = document.createElement("button");
        b.className = "pickle subclassTabButton";
        b.innerHTML = classTreeNames[playerStats.class][index];
        b.style.width = 100 / classTrees[playerStats.class] + '%';
        b.onclick = () => { changeSubclassTab(index) };
        container.append(b);
        let d = document.createElement("div");
        d.className = "gridSkills";
        d.style.display = 'none';
        treeContainer.append(d);
    }
}
function changeSubclassTab(tab) {
    let buttonContainer = document.getElementById("subClassTabContainer");
    let treeContainer = document.getElementById("passiveTreeContainer");
    let tabs = treeContainer.children;
    for (let index = 0; index < classTrees[playerStats.class]; index++) {
        if (index == tab) {
            tabs[index].style.display = '';
            buttonContainer.children[index].className = "pickle subclassTabButtonActive";
        } else {
            tabs[index].style.display = 'none';
            buttonContainer.children[index].className = "pickle subclassTabButton";
        }
    }
}
generateSubclassTabs();
changeSubclassTab(0);
function RebuildSlots() {
    loadoutContainer.innerHTML = "";
    slots = [];
    for (let index = 0; index < playerStats.abilitySlots; index++) {

        let slot = document.createElement("select");
        slot.setAttribute("class", "abilitySlot pickle");
        slot.setAttribute("data-ability-tooltip", "1");
        slots.push(slot);
        slot.setAttribute("onchange", `changeAbilitySlot(${index})`);
        loadoutContainer.appendChild(slot);
    }
}


//populateAbilityRequirements();
//UpdateAbilityPreview();
populateAbilitySlots();

function checkAbilityRequirements() {
    if (!abilityUnlocks.hasOwnProperty(playerStats.class)) { console.error("ERROR: ABILITY UNLOCKS NOT DEFINED FOR CLASS " + playerStats.class); return }
    for (const [levelRequirement, abilities] of Object.entries(abilityUnlocks[playerStats.class])) {
        if (playerStats.level >= levelRequirement) {
            abilities.forEach(ability => {
                playerStats.unlockedAbilities[ability] = 1;
            });
        } else {

            abilities.forEach(ability => {
                delete playerStats.unlockedAbilities[ability];
                //console.log("Deleting ",ability)
            });
        }
    }
    populateAbilitySlots();
    UpdateAbilityPreview();
}

function populateAbilityRequirements() {
    if (!abilityUnlocks.hasOwnProperty(playerStats.class)) { console.error("ERROR: ABILITY UNLOCKS NOT DEFINED FOR CLASS " + playerStats.class); return }
    if (abilityRequirementsGrid.childElementCount > 2) {
        while (abilityRequirementsGrid.childElementCount > 2) {
            abilityRequirementsGrid.removeChild(abilityRequirementsGrid.lastChild);
            //console.log("Removing ",abilityRequirementsGrid.lastChild);
        }
    }
    let levels = Object.keys(abilityUnlocks[playerStats.class]);
    for (let index = 0; index < levels.length; index++) {
        let abilities = abilityUnlocks[playerStats.class][levels[index]]
        let label = document.createElement("div");
        label.setAttribute("class", "pickle abilityPickContainerLabel");
        label.style.gridRow = index + 1;
        label.innerHTML = "Level " + levels[index];
        abilityRequirementsGrid.append(label);
        let c = document.createElement("div");
        c.setAttribute("class", "abilityPickContainer");
        c.style.gridRow = index + 1;
        abilityRequirementsGrid.append(c);
        for (let abilityN = 0; abilityN < abilities.length; abilityN++) {
            const ability = abilities[abilityN];
            let b = document.createElement("button");
            b.setAttribute("class", "abilityPickButton tooltip");
            b.style.backgroundImage = `url("${playerMoves[ability].iconName}Icon.png")`;
            c.append(b);
            let t = document.createElement("div");
            t.setAttribute("class", "tooltiptext oxanium");
            t.innerHTML = generateAbilityRequirementTooltip(ability);
            b.appendChild(t);
        }
    }
}

function UpdateAbilityPreview() {
    if (!abilityUnlocks.hasOwnProperty(playerStats.class)) { console.error("ERROR: ABILITY UNLOCKS NOT DEFINED FOR CLASS " + playerStats.class); return }
    let levels = Object.keys(abilityUnlocks[playerStats.class]);
    if (playerStats.level >= levels[levels.length - 1]) {
        previewRowHeader.style.display = 'none';
        previewRowBody.style.display = 'none';
    } else {
        previewRowHeader.style.display = 'flex';
        previewRowBody.style.display = 'block';
    }
    let previewIndex = 0;
    for (let index = 0; index < levels.length; index++) {
        if (playerStats.level >= levels[index]) {
            previewIndex = index;
        } else {
            break;
        }
    }
    previewRowHeader.style.gridRow = `${previewIndex + 2}/${previewIndex + 3}`;
    previewRowHeader.style.gridColumn = "1/-1";
    previewRowBody.style.gridRow = `${previewIndex + 3}/${Math.max(previewIndex + 3, levels.length + 1)}`;
    previewRowBody.style.gridColumn = `1/-1`;
}

let passiveTreeGrid = document.getElementById("passiveTreeGrid");
let passiveButtonDict = {};
let abilityButtonDict = {};
populatePassiveTree();
if (isOutdated) { resetSkills(); }
function populatePassiveTree() {
    let treeContainer = document.getElementById("passiveTreeContainer");
    let tabs = treeContainer.children;
    for (let index = 0; index < tabs.length; index++) {
        tabs[index].innerHTML = "";
    }
    passiveButtonDict = {};
    if (!skillLibrary.hasOwnProperty(playerStats.class)) { console.error("ERROR: CLASS PASSIVE TREE DOES NOT EXIST"); return; }
    Object.values(skillLibrary[playerStats.class]).forEach(skill => {
        let subclass = skill.sub;
        let b = document.createElement("button");
        passiveButtonDict[skill.id] = b;

        b.style.background = "url(" + skill.iconName + "PassiveIcon.png)" + " no-repeat";
        b.style.backgroundSize = "contain";
        b.setAttribute("class", "passiveSkillButton tooltip");
        b.setAttribute("onclick", `checkSkillPurchase("${skill.id}")`)
        tabs[subclass].appendChild(b);
        if (skill.hasOwnProperty('position')) {
            b.style.gridRow = skill.position.row;
            b.style.gridColumn = skill.position.column;

            if (skill.hasOwnProperty('requires')) {
                Object.keys(skill.requires).forEach((id) => {
                    let reqSkill = skillLibrary[playerStats.class][id];
                    if (!reqSkill.hasOwnProperty('position')) { return; }
                    let link = document.createElement("div");
                    link.setAttribute("class", "passiveSkillLink");
                    tabs[subclass].appendChild(link);
                    let area = [0, 0, 0, 0];
                    area[0] = Math.min(skill.position.row, reqSkill.position.row);
                    area[2] = Math.max(skill.position.row, reqSkill.position.row);
                    area[1] = Math.min(skill.position.column, reqSkill.position.column);
                    area[3] = Math.max(skill.position.column, reqSkill.position.column);
                    let length = Math.sqrt(Math.pow((area[3] - area[1]), 2) + Math.pow((area[2] - area[0]), 2));
                    let width = area[3] - area[1];
                    let height = area[2] - area[0];
                    //link.innerHTML = `Width:${area[3]-area[1]}Height:${area[2]-area[0]} Length:${length}`;
                    length = (length) / (length + 1) * (Math.max((width + 1) / (height + 1), 1));
                    let angle = Math.atan2(skill.position.column - reqSkill.position.column, reqSkill.position.row - skill.position.row);
                    //console.log(angle);
                    area[2] += 1;
                    area[3] += 1;
                    link.style.gridArea = area.join("/");
                    link.style.rotate = `${angle}rad`
                    link.style.height = `${100 * length}%`;
                })
            }
        }
        let t = document.createElement("div");
        t.setAttribute("class", "skilltooltiptext oxanium");
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
    abilityButtonDict = {};
    Object.keys(playerMoves).forEach(abilityKey => {
        const ability = playerMoves[abilityKey];
        if (ability.class != playerStats.class) return;
        if (!ability.hasOwnProperty("position")) return;
        if (!ability.hasOwnProperty("sub")) return;
        let b = document.createElement("button");
        tabs[ability.sub].append(b);
        b.setAttribute("class", "abilityPickButton tooltip");
        b.setAttribute("onclick", `checkAbilityPurchase("${abilityKey}")`)
        b.style.backgroundImage = `url("${playerMoves[abilityKey].iconName}Icon.png")`;
        b.style.gridRow = ability.position.row;
        b.style.gridColumn = ability.position.column;
        let t = document.createElement("div");
        t.setAttribute("class", "skilltooltiptext oxanium");
        t.innerHTML = generateAbilityRequirementTooltip(abilityKey);
        b.appendChild(t);
        abilityButtonDict[abilityKey] = b;

    })
}
function populateAbilitySlots() {
    let currentAbilities = playerStats.equippedAbilities.slice(1);
    for (let slotN = 0; slotN < slots.length; slotN++) {
        const element = slots[slotN];
        element.innerHTML = "";
        element.style.backgroundImage = "none";
        let noOption = document.createElement("option");
        noOption.innerHTML = "None";
        noOption.value = null;
        element.appendChild(noOption);
        //console.log(playerStats.unlockedAbilities);
        Object.keys(playerStats.unlockedAbilities).forEach(ability => {
            let option = document.createElement("option");
            option.innerHTML = playerMoves[ability].name;
            option.value = ability;
            element.appendChild(option);
            if (currentAbilities[slotN] == ability) {
                option.setAttribute("selected", "selected");
                element.style.backgroundImage = "url(" + playerMoves[ability].iconName + "Icon.png)";
                element.dataset.abilityTooltip = ability;
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
        slot.dataset.abilityTooltip = "";
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
        slot.dataset.abilityTooltip = newAbility;
        playerStats.equippedAbilities[slotN + 1] = newAbility;
    }
}
function generatePassiveTooltip(skill) {
    let numberDisplay = "";
    let effectText = "";
    let requirementsText = "";
    if (skill.hasOwnProperty("requires")) {
        requirementsText = "Requires skill(s):<br>"
        for (const [key, value] of Object.entries(skill.requires)) {
            requirementsText += `${skillLibrary[playerStats.class][key].name} (${value})<br>`;
        }
    }
    for (let index = 0; index < skill.effect.length; index++) {
        let effect = skill.effect[index];
        numberDisplay = "";
        switch (effect.type) {
            case 0:
                effectText += `<span class="${effect.effectTarget}Text">${attributeDisplayNames[effect.effectTarget]}</span>`;
                switch (effect.effectType) {
                    case "additiveFlat":
                        numberDisplay = (effect.effectMagnitude > 0 ? "+" : "") + effect.effectMagnitude;
                        break;
                    case "additivePercent":
                        numberDisplay = (effect.effectMagnitude > 0 ? "+" : "") + effect.effectMagnitude * 100 + "%";
                        break;
                    case "multPercent":
                        numberDisplay = "x" + effect.effectMagnitude;
                        break;
                    default:
                        console.log("Undefined effect type");
                        break;
                }
                break;
            case 1:
                effectText += `<span>${effect.effectTarget}</span>`;
                switch (effect.effectType) {
                    case "additiveFlat":
                        numberDisplay = (effect.effectMagnitude > 0 ? "+" : "") + format(effect.effectMagnitude * 100) + "%";
                        break;
                    case "additivePercent":
                        numberDisplay = (effect.effectMagnitude > 0 ? "+" : "") + effect.effectMagnitude * 100 + "%";
                        break;
                    case "multPercent":
                        numberDisplay = "x" + effect.effectMagnitude;
                        break;
                    default:
                        console.log("Undefined effect type");
                        break;
                }
                break;
            case 2:
                let attribute = effect.effectTarget.substr(0, effect.effectTarget.length - 8);
                effectText += `<span class="${attribute}Text">${attributeDisplayNames[attribute]}</span> Training Effect`;
                switch (effect.effectType) {
                    case "additiveFlat":
                        numberDisplay = (effect.effectMagnitude > 0 ? "+" : "") + effect.effectMagnitude;
                        break;
                    case "additivePercent":
                        numberDisplay = (effect.effectMagnitude > 0 ? "+" : "") + effect.effectMagnitude * 100 + "%";
                        break;
                    case "multPercent":
                        numberDisplay = "x" + effect.effectMagnitude;
                        break;
                    default:
                        console.log("Undefined effect type");
                        break;
                }
                break;
            default:
                break;
        }
        effectText += `${numberDisplay}` + "<br><br>";

    }


    let cost = skill.cost[getPlayerPassiveLevel(skill.id)];
    let costString = "";
    if (isNaN(cost)) { costString = "MAXED!" } else { costString = skill.cost[getPlayerPassiveLevel(skill.id)] + " Points" };
    return `${skill.name} ${getPlayerPassiveLevel(skill.id)}/${skill.maxLevel}` + "<br><br>" +
        (skill.desc == "" ? "" : skill.desc + "<br /><br>") +
        `${effectText}` +
        "Cost: " + costString + "<br><br>"
        + requirementsText;
}
function generateAbilityRequirementTooltip(ability) {
    if (!playerMoves.hasOwnProperty(ability)) return "None";
    const abilityData = playerMoves[ability];
    let stringDisplay = "";
    stringDisplay += abilityData.name + " ";
    switch (abilityData.type) {
        case 0:
            stringDisplay += "(Attack)"
            break;
        case 1:
            stringDisplay += "(Movement)"
            break;
        case 2:
            stringDisplay += "(Support)"
            break;

        default:
            break;
    }
    stringDisplay += "<br>";
    stringDisplay += abilityData.description + "<br>";
    switch (abilityData.type) {
        case 0:
            stringDisplay += "Ratios:" + "<br />";
            for (let attributeRatio = 0; attributeRatio < abilityData.damageRatios.length; attributeRatio++) {
                let ratio = abilityData.damageRatios[attributeRatio] * 100;
                if (ratio == 0) continue;
                let attributeId = attributeIndexToId[attributeRatio];
                stringDisplay += `${ratio}% <span class="${attributeId}Text">${attributeDisplayShort[attributeId]}</span><br />`;
            }
            stringDisplay += `Damage range: x${abilityData.damageRange[0]} - ${abilityData.damageRange[1]}<br />`
            if (abilityData.hasOwnProperty("effects")) {
                stringDisplay += "Effects:<br>"
                Object.keys(abilityData.effects).forEach(effect => {
                    stringDisplay += `${effect}: ${abilityData.effects[effect]}<br>`;
                })
            }
            break;
        case 2:
            if (arraySum(abilityData.damageRatios) != 0) stringDisplay += "Ratios:" + "<br />";
            for (let attributeRatio = 0; attributeRatio < abilityData.damageRatios.length; attributeRatio++) {
                let ratio = abilityData.damageRatios[attributeRatio] * 100;
                if (ratio == 0) continue;
                let attributeId = attributeIndexToId[attributeRatio];
                stringDisplay += `${ratio}% <span class="${attributeId}Text">${attributeDisplayShort[attributeId]}</span><br />`;
            }
            if (abilityData.hasOwnProperty("effects")) {
                stringDisplay += "Effects:<br>"
                Object.keys(abilityData.effects).forEach(effect => {
                    stringDisplay += `${effect} `;
                    if (abilityData.effects[effect] > 0) stringDisplay += `${100 * abilityData.effects[effect]}% MaxHP `;
                    stringDisplay += '<br>'
                })
            }
            break;
        default:
            break;
    }
    stringDisplay += `Use time: ${format(abilityData.time / 1000)}s<br>`
    switch (abilityData.type) {
        case 1:
            stringDisplay += `Range:<br>`;
            if (abilityData.range[0] > 0) stringDisplay += `Advance:${abilityData.range[0]}<br>`;
            if (abilityData.range[1] > 0) stringDisplay += `Retreat:${abilityData.range[1]}<br>`;
            break;

        default:
            if (abilityData.range[1] != abilityData.range[0]) {
                stringDisplay += `Range: ${abilityData.range[0]}-${abilityData.range[1]}<br>`
            } else {
                stringDisplay += `Range: ${abilityData.range[0]}<br>`
            }
            break;
    }
    if (abilityData.cooldownTime > 0) {
        stringDisplay += `Cooldown: ${abilityData.cooldownTime / 1000}s<br />`
    }
    if (playerStats.unlockedAbilities[ability] == 1) {
        stringDisplay += `Cost: MAX!<br>`
    } else {
        if (abilityData.hasOwnProperty("cost")) {
            stringDisplay += `Cost: ${abilityData.cost}<br>`
        } else {
            stringDisplay += `Cost: ${0}<br>`
        }
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
//Passives
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

    for (let index = 0; index < skill.effect.length; index++) {
        let effect = skill.effect[index];
        switch (effect.type) {
            //Passive attribute modifiers
            case 0:
                if (!playerStats.effectMultipliers.hasOwnProperty(effect.effectTarget)) {
                    playerStats.effectMultipliers[effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
                }
                if (effect.effectType == 'multPercent') {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        Math.pow(effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
                } else {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        effect.effectMagnitude * playerStats.unlockedSkills[skillId];
                }
                break;
            //Secondary attribute modifiers -> regeneration, critical etc.
            case 1:
                if (!playerStats.effectMultipliers.hasOwnProperty(effect.effectTarget)) {
                    playerStats.effectMultipliers[effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
                }
                if (effect.effectType == 'multPercent') {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        Math.pow(effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
                } else {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        effect.effectMagnitude * playerStats.unlockedSkills[skillId];
                }
                break;
            case 2:
                if (!playerStats.effectMultipliers.hasOwnProperty(effect.effectTarget)) {
                    playerStats.effectMultipliers[effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
                }
                if (effect.effectType == 'multPercent') {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        Math.pow(effect.effectMagnitude, playerStats.unlockedSkills[skillId]);
                } else {
                    playerStats.effectMultipliers[effect.effectTarget][effect.effectType][skill.id] =
                        effect.effectMagnitude * playerStats.unlockedSkills[skillId];
                }
                break;
            default:
                console.error("UNKOWN SKILL EFFECT TYPE");
                break;
        }
    }


}
function removeEffect(skillId) {
    let skill = skillLibrary[playerStats.class][skillId];
    //console.log("ID: ", skillId, "Skill:", skill);
    for (let index = 0; index < skill.effect.length; index++) {
        if (!playerStats.effectMultipliers.hasOwnProperty(skill.effect[index].effectTarget)) {
            playerStats.effectMultipliers[skill.effect.effectTarget] = { additiveFlat: {}, additivePercent: {}, multPercent: {}, };
            continue;
        }
        if (playerStats.effectMultipliers[skill.effect[index].effectTarget][skill.effect[index].effectType].hasOwnProperty(skill.id)) {
            delete playerStats.effectMultipliers[skill.effect[index].effectTarget][skill.effect[index].effectType][skill.id];
        } else {
            console.log("::ERROR:: Attempting to delete non-existing effect (id:" + skillId + ")");
        }
    }
}
function checkSkillPurchase(skillId) {
    let cost = 0;
    let skill = skillLibrary[playerStats.class][skillId];
    if (skill.hasOwnProperty('requires')) {
        for (const [key, value] of Object.entries(skill.requires)) {
            if (playerStats.unlockedSkills[key] < value || playerStats.unlockedSkills[key] == undefined) {
                logConsole(`Requirements are not met!`,type='warning');
                return false;
            }
        }
    }

    if (playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        let skill = skillLibrary[playerStats.class][skillId];
        if (playerStats.unlockedSkills[skillId] >= skill.maxLevel) { logConsole(`${skill.name} is already max level!`); return false; }
        cost = skillLibrary[playerStats.class][skillId].cost[playerStats.unlockedSkills[skillId]];
    } else {
        cost = skillLibrary[playerStats.class][skillId].cost[0];
    }
    if (cost <= (getTotalPassivePoints() - getAvailablePassivePoints())) {
        playerStats.passivePointsSpent[skill.sub] += cost;
        addSkill(skillId);
    }
    updateButton(skillId);
}
function checkAbilityPurchase(abilityId) {
    let cost = 0;
    let ability = playerMoves[abilityId];
    // if (skill.hasOwnProperty('requires')) {
    //     for (const [key, value] of Object.entries(skill.requires)) {
    //         if (playerStats.unlockedSkills[key] < value || playerStats.unlockedSkills[key] == undefined) {
    //             logConsole(`Requirements are not met!`);
    //             return false;
    //         }
    //     }
    // }

    if (playerStats.unlockedAbilities.hasOwnProperty(abilityId)) {
        if (playerStats.unlockedAbilities[abilityId] > 0) { logConsole(`${ability.name} is already max level!`); return false; }
    } else {
        if (ability.hasOwnProperty("cost")) {
            cost = ability.cost;
        } else {
            cost = 0;
        }
    }
    if (cost <= (getTotalPassivePoints() - getAvailablePassivePoints())) {
        playerStats.passivePointsSpent[ability.sub] += cost;
        unlockAbility(abilityId);
        populateAbilitySlots();
        updateAbilityButton(abilityId);
    }
}
function unlockAbility(id) {
    playerStats.unlockedAbilities[id] = 1;
}
function updateButton(skillId) {
    let l = passiveButtonDict[skillId].querySelector('.passiveSkillLevel');
    if (playerStats.unlockedSkills.hasOwnProperty(skillId)) {
        l.innerHTML = playerStats.unlockedSkills[skillId];
    } else {
        l.innerHTML = 0;
    }
    let t = passiveButtonDict[skillId].querySelector('.skilltooltiptext');
    t.innerHTML = generatePassiveTooltip(skillLibrary[playerStats.class][skillId]);
}
function updateAbilityButton(abilityId) {
    let t = abilityButtonDict[abilityId].querySelector('.skilltooltiptext');
    t.innerHTML = generateAbilityRequirementTooltip(abilityId);
}
function resetSkills() {
    playerStats.unlockedAbilities = { 'punch': 1 }
    Object.keys(abilityButtonDict).forEach((abilityKey) => {
        updateAbilityButton(abilityKey);
    })
    for (let index = 0; index < slots.length; index++) {
        if (index == 0) {
            playerStats.equippedAbilities[index + 1] = 'punch';
        } else {
            playerStats.equippedAbilities[index + 1] = null;
        }
    }
    populateAbilitySlots();
    let old = Object.keys(playerStats.unlockedSkills);
    old.forEach(skillId => {
        removeSkill(skillId);
    });
    playerStats.passivePointsSpent = Array(3).fill(0);
    for (const [key, value] of Object.entries(passiveButtonDict)) {
        updateButton(key);
    }
    
}
function changeClass(className, keep = false) {
    //if (className == playerStats.class) return;
    if (className != 'human') { playerStats.abilitySlots = 4; player.health = -1; } else { playerStats.abilitySlots = 3 };
    resetSkills();
    playerStats.class = className;
    generateSubclassTabs();
    populatePassiveTree();
    changeSubclassTab(0);
    if (!keep) {
        playerStats.level = 0;
        playerStats.experience = 0;
        addPlayerExp(0);
        playerStats.experienceToNext = (baseExperienceCost + baseLinearExperienceCost * playerStats.level) * Math.pow(baseExperienceCostExponent, playerStats.level);
    }
    playerStats.unlockedAbilities = { 'punch': 1 };
    //populateAbilityRequirements();
    //checkAbilityRequirements();
    for (let index = 0; index < slots.length; index++) {
        if (index == 0) {
            playerStats.equippedAbilities[index + 1] = 'punch';
        } else {
            playerStats.equippedAbilities[index + 1] = null;
        }
    }
    RebuildSlots();
    populateAbilitySlots();
    if (!keep) {
        playerStats.attributeSoftcaps = [10000, 10000, 10000, 10000];
        playerStats.strength = 0.1 * formulas.softcappedAttribute(0);
        playerStats.toughness = 0.1 * formulas.softcappedAttribute(1);
        playerStats.mind = 0.1 * formulas.softcappedAttribute(2);
        playerStats.agility = 0.1 * formulas.softcappedAttribute(3);

    }
    if (className != 'human') {
        playerStats.attributeSoftcaps = [10000, 10000, 10000, 10000];
    } else {
        playerStats.attributeSoftcaps = [100, 100, 100, 100];
        playerStats.strength = 1;
        playerStats.toughness = 1;
        playerStats.mind = 1;
        playerStats.agility = 1;
    }
    checkClassQuest()
}