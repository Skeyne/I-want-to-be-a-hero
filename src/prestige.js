function prestigeSoftCaps() {
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        if (softcapped >= softcap) {
            console.log(`${attributeIndexToId[index]} Softcap:${softcap} Softcapped:${softcapped}`)
            // playerStats.permanentSoftcaps[index] += (PRESTIGE_SOFTCAP_RATE * softcap + Math.max(0, softcapped - softcap) * PRESTIGE_SOFTCAP_OVERCAP_RATE);
            playerStats.permanentSoftcaps[index] = softcapped - playerStats.attributeSoftcaps[index];
        } else {
            continue;
        }
    }
}
function prestigeAttributes() {
    playerStats.permanentAttributes[0] = (playerStats.attributeSoftcaps[0] + playerStats.permanentSoftcaps[0]) * PRESTIGE_ATTRIBUTE_RATE;
    playerStats.permanentAttributes[1] = (playerStats.attributeSoftcaps[1] + playerStats.permanentSoftcaps[1]) * PRESTIGE_ATTRIBUTE_RATE;
    playerStats.permanentAttributes[2] = (playerStats.attributeSoftcaps[2] + playerStats.permanentSoftcaps[2]) * PRESTIGE_ATTRIBUTE_RATE;
    playerStats.permanentAttributes[3] = (playerStats.attributeSoftcaps[3] + playerStats.permanentSoftcaps[3]) * PRESTIGE_ATTRIBUTE_RATE;
}
function attributePrestige() {
    if (!canAttributePrestige()) { logConsole("You have no capped attributes!"); return; }
    else { let c = confirm('Are you sure you want to prestige?'); if (!c) { return } }
    prestigeSoftCaps();
    prestigeAttributes();
    playerStats.strength = playerStats.permanentAttributes[0];
    playerStats.toughness = playerStats.permanentAttributes[1];
    playerStats.mind = playerStats.permanentAttributes[2];
    playerStats.agility = playerStats.permanentAttributes[3];
    updateAttributePrestigeText();
}
function canAttributePrestige() {
    let can = false;
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        if (softcapped >= softcap) {
            can = true;
        } else {
        }
    }
    return can;
}

function updateAttributePrestigeText() {
    let container = document.getElementById("attributeDecayText");
    let text = "";
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        const change = softcapped >= softcap ? softcapped - softcap : 0; //((PRESTIGE_SOFTCAP_RATE * softcap + Math.max(0, softcapped - softcap) * PRESTIGE_SOFTCAP_OVERCAP_RATE)) : 0;
        text += `Lost <span class="${attributeIndexToId[index]}Text">${format(playerStats.decayedAttributes[index], 3)} ${attributeDisplayShort[attributeIndexToId[index]]}</span>
        giving <span>${format(100 * (getDecayBonus(index) - 1), 3)}</span> % increased gain.<br>`
    }
    container.innerHTML = text;
    //
    container = document.getElementById("attributePrestigeText");
    text = "";
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        const change = softcapped >= softcap ? softcapped - softcap : 0; //((PRESTIGE_SOFTCAP_RATE * softcap + Math.max(0, softcapped - softcap) * PRESTIGE_SOFTCAP_OVERCAP_RATE)) : 0;
        text += `${attributeDisplayShort[attributeIndexToId[index]]}: <span class="${attributeIndexToId[index]}Text">${format(softcap, 3)}</span> -> <span class="${attributeIndexToId[index]}Text">${format(softcap + change, 3)}</span> (+${format(change, 3)})<br>`
    }
    container.innerHTML = text;
}
updateAttributePrestigeText();
const classPrestigeRequirements = [
    { level: 50, storyProgress: 16, cumulativeSoftcaps: 5e5 },
    { level: 1000, storyProgress: 999, cumulativeSoftcaps: 1e10 },
]
const classPrestigeBonus = [
    { attributeGain: 1, bonusPassives: 0, activityExp: 1, manualPower: 1, expGain: 1, },
    { attributeGain: 1, bonusPassives: 0, activityExp: 1, manualPower: 1, expGain: 1, },
    { attributeGain: 1, bonusPassives: 0, activityExp: 1, manualPower: 1, expGain: 1, },
]
function getPrestigeBonus(index) {
    if (index >= classPrestigeBonus.length) { return classPrestigeBonus[classPrestigeBonus.length - 1]; }
    else { return classPrestigeBonus[index] }
}
function classPrestige() {
    logConsole("Only available in the full version!", type = 'warning'); return;
    if (!canClassPrestige()) { logConsole("You do not meet the requirements to class prestige!", type = 'warning'); return; }
    //if (subclassPick[0] == null) { logConsole("You must pick a subclass to advance!", type = 'warning'); return; }
    let confirmed = confirm(`Are you sure you want to class prestige? \n Most of your progress will be reset and you will gain permanent bonuses and unlock more class skills`)
    if (confirmed) {
        if (canAttributePrestige) { attributePrestige(); }
        playerStats.classPrestige += 1;
        playerSetLevel(0);
        setMoney(0);
        resetSkills();
        updateClassPrestigeRequirements();
        updateClassPrestigeRewards();
        populateAbilityPreview(-1);
        populatePassiveTree();
        if (playerStats.class -= 'human') { playerStats.abilitySlots = 3 }
        else { playerStats.abilitySlots = 4 + playerStats.classPrestige; };
        RebuildSlots();
        //Go back to Alley
        document.getElementById(`areaButton_${currentArea.id}`).classList.toggle('active');
        changeArea(0);
        document.getElementById(`areaButton_${currentArea.id}`).classList.toggle('active');
    } else {
        return;
    }
}
const canClassPrestige = function() {
    return false;
    // if ((classPrestigeRequirements.length - 1) <= playerStats.classPrestige) { return false; }
    // let classCheck = (["superhuman", "mutant", "esper", "ninja"].includes(playerStats.class));
    // let requirements = classPrestigeRequirements[playerStats.classPrestige]
    // let cumulativeSC = 0;
    // for (let index = 0; index < 4; index++) {
    //     const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
    //     cumulativeSC += softcap
    // }
    // if (!classCheck) { logConsole("You cannot prestige this class!", type = 'warning'); return false; }
    // if (cumulativeSC < requirements.cumulativeSoftcaps) { logConsole("Your cumulative softcap does not meet the requirement!", type = 'warning'); return false; }
    // if (playerStats.level < requirements.level) { logConsole("Your level does not meet the requirement!", type = 'warning'); return false; }
    // if (playerStats.storyProgress < requirements.storyProgress) { logConsole("Your story progress does not meet the requirement!", type = 'warning'); return false; }
    // return true;
}
function changePrestigeTab(index) {
    const tabNames = ["attribute", "class"];
    for (let i = 0; i < tabNames.length; i++) {
        document.getElementById(`${tabNames[i]}PrestigePanel`).style.display = (i == index) ? '' : 'none';
    }
}
function updateClassPrestigeRequirements() {
    let panel = document.getElementById("classPrestigePanel");
    panel.getElementsByClassName("cpLevelRequirement")[0].innerHTML = `${playerStats.level}/${format(classPrestigeRequirements[playerStats.classPrestige].level)}`;
    panel.getElementsByClassName("cpStoryRequirement")[0].innerHTML = `${playerStats.storyProgress}/${format(classPrestigeRequirements[playerStats.classPrestige].storyProgress)}`;
    panel.getElementsByClassName("cpSoftcapRequirement")[0].innerHTML = `${format(arraySum(playerStats.attributeSoftcaps) + arraySum(playerStats.permanentSoftcaps))}/${format(classPrestigeRequirements[playerStats.classPrestige].cumulativeSoftcaps)}`;
}
function updateClassPrestigeRewards() {
    let panel = document.getElementById("classPrestigePanel");
    panel.getElementsByClassName("cpReward1")[0].innerHTML = `${classPrestigeBonus[playerStats.classPrestige].attributeGain}x -> ${(playerStats.classPrestige + 1 >= classPrestigeBonus.length) ? 'MAX' : classPrestigeBonus[playerStats.classPrestige + 1].attributeGain + 'x'}`;
    panel.getElementsByClassName("cpReward2")[0].innerHTML = `${classPrestigeBonus[playerStats.classPrestige].manualPower}x -> ${(playerStats.classPrestige + 1 >= classPrestigeBonus.length) ? 'MAX' : classPrestigeBonus[playerStats.classPrestige + 1].manualPower + 'x'}`;
    panel.getElementsByClassName("cpReward3")[0].innerHTML = `${classPrestigeBonus[playerStats.classPrestige].bonusPassives} -> ${(playerStats.classPrestige + 1 >= classPrestigeBonus.length) ? 'MAX' : classPrestigeBonus[playerStats.classPrestige + 1].bonusPassives}`;
    panel.getElementsByClassName("cpReward4")[0].innerHTML = `${classPrestigeBonus[playerStats.classPrestige].activityExp}x -> ${(playerStats.classPrestige + 1 >= classPrestigeBonus.length) ? 'MAX' : classPrestigeBonus[playerStats.classPrestige + 1].activityExp + 'x'}`;
    panel.getElementsByClassName("cpReward4")[0].innerHTML = `${classPrestigeBonus[playerStats.classPrestige].expGain}x -> ${(playerStats.classPrestige + 1 >= classPrestigeBonus.length) ? 'MAX' : classPrestigeBonus[playerStats.classPrestige + 1].expGain + 'x'}`;
}
function populateAbilityPreview(subclassIndex) {
    let previewGrid = document.getElementById("subclassPreviewGrid");
    previewGrid.innerHTML = "";
    if (subclassIndex < 0) { return false; }
    let buttons = document.getElementById("classPrestigePick").getElementsByTagName("div");
    for (let index = 0; index < buttons.length; index++) {
        const element = buttons[index];
        if (index == subclassIndex) { element.classList.add("selected") } else { element.classList.remove("selected") };

    }
    Object.keys(playerMoves).forEach(abilityKey => {
        const ability = playerMoves[abilityKey];
        if (!ability.hasOwnProperty("prestige")) return;
        if (ability.prestige != playerStats.classPrestige + 1) return;
        if (ability.class != playerStats.class) return;
        if (!ability.hasOwnProperty("sub")) return;
        if (ability.sub != subclassIndex) return;
        let b = document.createElement("button");
        b.setAttribute("class", "abilityPickButton");
        b.setAttribute("data-ability-tooltip", abilityKey);
        b.style.backgroundImage = `url("resources/abilityIcons/${playerMoves[abilityKey].iconName}Icon.png")`;
        abilityButtonDict[abilityKey] = b;
        previewGrid.append(b);

    })
}
function populateSubclassPickButtons() {
    let container = document.getElementById("classPrestigePick");
    let buttons = container.getElementsByTagName("div");
    for (let index = 0; index < buttons.length; index++) {
        const element = buttons[index];
        element.innerHTML = classTreeNames[playerStats.class][index];
        element.addEventListener("click", () => { populateAbilityPreview(index) });

    }
}
if (debug) {
    document.getElementById("prestigeTabHeader").getElementsByClassName("prestigePanelTab")[0].style.display = 'none';
    document.getElementById("prestigeTabHeader").getElementsByClassName("prestigePanelTab")[1].style.display = 'none';
}
var subclassPick = [null];
updateClassPrestigeRequirements();
updateClassPrestigeRewards();
populateSubclassPickButtons();