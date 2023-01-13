function prestigeSoftCaps() {
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        if (softcapped >= softcap) {
            console.log(`${attributeIndexToId[index]} Softcap:${softcap} Softcapped:${softcapped}`)
            playerStats.permanentSoftcaps[index] += (PRESTIGE_SOFTCAP_RATE * softcap + Math.max(0, softcapped - softcap) * PRESTIGE_SOFTCAP_OVERCAP_RATE);
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
    let container = document.getElementById("attributePrestigeText");
    let text = "";
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        const change = softcapped >= softcap ? ((PRESTIGE_SOFTCAP_RATE * softcap + Math.max(0, softcapped - softcap) * PRESTIGE_SOFTCAP_OVERCAP_RATE)) : 0;
        text += `${attributeDisplayShort[attributeIndexToId[index]]}: <span class="${attributeIndexToId[index]}Text">${format(softcap)}</span> -> <span class="${attributeIndexToId[index]}Text">${format(softcap + change)}</span> (+${format(change)})<br>`
    }
    container.innerHTML = text;
}
updateAttributePrestigeText();
const classPrestigeRequirements = [
    { level: 150, storyProgress: 21, cumulativeSoftcaps: 1e6 },
    { level: 1000, storyProgress: 991, cumulativeSoftcaps: 1e10 },
]
const classPrestigeBonus = [
    { attributeGain: 1, bonusPassives: 0, trainingSpeed: 1 },
    { attributeGain: 2, bonusPassives: 100, trainingSpeed: 1.25 },
    { attributeGain: 4, bonusPassives: 1000, trainingSpeed: 1.75 },
]
function getPrestigeBonus(index) {
    if (index >= classPrestigeBonus.length) { return classPrestigeBonus[classPrestigeBonus.length - 1]; }
    else { return classPrestigeBonus[index] }
}
function getPrestigeBonus(index) {
    if (index >= classPrestigeBonus.length) { return classPrestigeBonus[classPrestigeBonus.length - 1]; }
    else { return classPrestigeBonus[index] }
}
function classPrestige() {
    if (!canClassPrestige()) { logConsole("You do not meet the requirements to class prestige!", type = 'warning'); return; }
    if (subclassPick[0] == null) { logConsole("You must pick a subclass to advance!", type = 'warning'); return; }
    let confirmed = confirm(`Are you sure you want to class prestige? \n You will advance the ${subclassPick} subclass`)
    if (confirmed) {
        if (canAttributePrestige) { attributePrestige(); }
        playerStats.classPrestige += 1;
        playerStats.subclassPrestige[subclassPick[0]] += 1;
        playerSetLevel(0);
        resetSkills();
        updateClassPrestigeRequirements();
        updateClassPrestigeRewards();
        populateAbilityPreview(-1);
        populatePassiveTree();
    } else {
        return;
    }
}
function canClassPrestige() {
    if ((classPrestigeRequirements.length - 1) <= playerStats.classPrestige) { return false; }
    let classCheck = (playerStats.class in ["superhuman", "mutant", "esper", "ninja"]);
    let requirements = classPrestigeRequirements[playerStats.classPrestige]
    let cumulativeSC = 0;
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        cumulativeSC += softcap
    }
    if (cumulativeSC < requirements.cumulativeSoftcaps) { return false; }
    if (playerStats.level < requirements.level) { return false; }
    if (playerStats.storyProgress < requirements.storyProgress) { return false; }
    return true;
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
    panel.getElementsByClassName("cpReward2")[0].innerHTML = `${classPrestigeBonus[playerStats.classPrestige].bonusPassives} -> ${(playerStats.classPrestige + 1 >= classPrestigeBonus.length) ? 'MAX' : classPrestigeBonus[playerStats.classPrestige + 1].bonusPassives}`;
    panel.getElementsByClassName("cpReward3")[0].innerHTML = `${classPrestigeBonus[playerStats.classPrestige].trainingSpeed}x -> ${(playerStats.classPrestige + 1 >= classPrestigeBonus.length) ? 'MAX' : classPrestigeBonus[playerStats.classPrestige + 1].trainingSpeed + 'x'}`;
}
function populateAbilityPreview(subclassIndex) {
    let previewGrid = document.getElementById("subclassPreviewGrid");
    previewGrid.innerHTML = "";
    if (subclassIndex < 0) {subclassPick[0] == null; return;}
    subclassPick[0] = subclassIndex;
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
        previewGrid.append(b);
        b.setAttribute("class", "abilityPickButton tooltip");
        b.style.backgroundImage = `url(resources/abilityIcons/"${playerMoves[abilityKey].iconName}Icon.png")`;
        let t = document.createElement("div");
        t.setAttribute("class", "skilltooltiptext oxanium");
        t.innerHTML = generateAbilityRequirementTooltip(abilityKey);
        b.appendChild(t);
        abilityButtonDict[abilityKey] = b;

    })
}
function populateSubclassPickButtons() {
    let container = document.getElementById("classPrestigePick");
    let buttons = container.getElementsByTagName("div");
    for (let index = 0; index < buttons.length; index++) {
        const element = buttons[index];
        element.addEventListener("click",);

    }
}
if (playerStats.storyProgress < 22) {
    document.getElementById("prestigeTabHeader").getElementsByClassName("prestigePanelTab")[0].style.display = 'none';
    document.getElementById("prestigeTabHeader").getElementsByClassName("prestigePanelTab")[1].style.display = 'none';
}
var subclassPick = [null];
updateClassPrestigeRequirements();
updateClassPrestigeRewards();