const version = '0.03d';
var isOutdated = false;
var lastVersion;
document.getElementById('versionText').innerHTML ='v'+version;
const cleanPlayerStats = {
    experience: 0,
    experienceToNext: baseExperienceCost,
    money: 0,
    reputation: 0,
    class: "human",
    level: 0,
    passivePointsSpent: Array(3).fill(0),
    strength: 0,
    toughness: 0,
    mind: 0,
    agility: 0,
    attributeSoftcaps: [100, 100, 100, 100],
    attributeTrainingModifier: [1, 1, 1, 1],
    permanentSoftcaps: [0,0,0,0],
    permanentAttributes: [0,0,0,0],
    flatReduction: 0,
    healthRegeneration: 0,
    cooldownReduction:0,
    actionSpeed:1,
    powerMultiplier:1,
    criticalChance: 0,  
    overwhelm: 0,
    takedown: 0,
    dodgeChance: 0,
    meleeDamage: 0,
    rangedDamage:0,
    restRate: 0.1,
    lastSave: 0,
    muted: false,
    musicVolume: 0.05,
    unlockedSkills: {},
    unlockedAbilities: { "punch": 1 },
    abilitySlots: 3,
    equippedAbilities: ["walk", "punch", null, null],
    effectMultipliers: {},
    storyProgress: 0,
    currentStoryQuestProgress: [0],
    currentTrainingAttribute: "strength",
    trainingAreaLevels: {},
    activityLevels: {},
    abilityCooldowns: {},
    currentArea: 0,
    engagementRange: 5,
    restToPercentage: 1,
}
var playerStats = {};
reset();
function save() {
    console.log("Saving data...")
    playerStats.lastSave = Date.now();
    localStorage.setItem("heroSave", JSON.stringify(playerStats));
    localStorage.setItem("heroLastSaved", playerStats.lastSave);
    localStorage.setItem("version", version);
}
function load(file = null) {
    reset();
    let loadgame;
    if (file != null) { loadgame = file; } else { loadgame = JSON.parse(localStorage.getItem("heroSave")); }
    if (loadgame != null) {
        Object.keys(loadgame).forEach(property => {
            playerStats[property] = loadgame[property];
        });
        if (playerStats.class == 'Human') { playerStats.class = 'human' };
        if (localStorage.getItem("version") != version){lastVersion = localStorage.getItem("version"); isOutdated = true;}
        playerStats.experienceToNext = formulas.playerExp(playerStats.level);
        if(isOutdated){playerStats.passivePointsSpent = Array(3).fill(0)}
    } else {
        console.log("No savefile found");
    }
}
load();
setInterval(save, 30000);
function getTotalPassivePoints() {
    let decades = Math.floor(playerStats.level / 10);
    return ((decades + 1) / 2 * decades * 10) + (playerStats.level - decades * 10) * (decades + 1);
}
function getAvailablePassivePoints() {
    return arraySum(playerStats.passivePointsSpent);
}
function getEffectiveValue(property) {
    if (!playerStats.hasOwnProperty(property)) {
        console.log("Accessing invalid property");
        return 0;
    }
    let baseValue = formulas.softcappedAttribute(attributeIdToIndex[property]);
    if (!playerStats.effectMultipliers.hasOwnProperty(property)) { return baseValue; }
    else {
        return (baseValue
            + arraySum(Object.values(playerStats.effectMultipliers[property].additiveFlat)))
            * (1 + arraySum(Object.values(playerStats.effectMultipliers[property].additivePercent)))
            * arrayMult(Object.values(playerStats.effectMultipliers[property].multPercent))
    }
}
function getSecondaryAttribute(property) {
    if (!playerStats.hasOwnProperty(property)) {
        console.log("Accessing invalid property");
        return 0;
    }
    let baseValue = playerStats[property];
    if (!playerStats.effectMultipliers.hasOwnProperty(property)) { return baseValue; }
    return (baseValue
        + arraySum(Object.values(playerStats.effectMultipliers[property].additiveFlat)))
        * (1 + arraySum(Object.values(playerStats.effectMultipliers[property].additivePercent)))
        * arrayMult(Object.values(playerStats.effectMultipliers[property].multPercent));
}
function getTrainingModifier(attributeName) {
    let baseValue = playerStats.attributeTrainingModifier[attributeIdToIndex[attributeName]];
    let property = attributeName + "Training";
    if (!playerStats.effectMultipliers.hasOwnProperty(property)) { return baseValue; }
    return (baseValue
        + arraySum(Object.values(playerStats.effectMultipliers[property].additiveFlat)))
        * (1 + arraySum(Object.values(playerStats.effectMultipliers[property].additivePercent)))
        * arrayMult(Object.values(playerStats.effectMultipliers[property].multPercent))
}
function recalculateMultipliers() {
    playerStats.effectMultipliers = {};

}
function playerSetLevel(value) {
    playerStats.level = value - 1;
    playerStats.experience = playerStats.experienceToNext + 1;
    addPlayerExp(0);
}
function addPlayerExp(amount) {
    playerStats.experience += amount;
    expCountBuffer += amount;
    if (playerStats.experience >= playerStats.experienceToNext) {
        playerStats.experience -= playerStats.experienceToNext;
        playerStats.level += 1;
        playerStats.experienceToNext = (baseExperienceCost + baseLinearExperienceCost * playerStats.level) * Math.pow(baseExperienceCostExponent, playerStats.level);
        playerStats.experienceToNext = formulas.playerExp(playerStats.level);
        //checkAbilityRequirements();
    }
    checkLevelQuest();
}
function addPlayerMoney(amount) {
    playerStats.money += amount;
}
function addPlayerReputation(amount) {
    playerStats.reputation += amount;
}
function loadGame(loadgame) {
    let shouldCheckVersion = false; //check if we need to implement a fix for version differences
    let oldVersion = loadgame.lastMajorChangeVersion; //save old version since we'll be overwriting as part of the load process, but we don't want to execute the fix until after loading
    if (oldVersion === undefined || oldVersion < game.lastMajorChangeVersion) {
        shouldCheckVersion = true;
    }
    loadgame.lastMajorChangeVersion = game.lastMajorChangeVersion; //set loadgame version to current version so save has proper version going forward


    //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
    let loadKeys = Object.keys(loadgame);
    for (i = 0; i < loadKeys.length; i++) {
        if (loadgame[loadKeys[i]] != "undefined") {
            let thisKey = loadKeys[i];
            if (typeof loadgame[thisKey] == "string" && thisKey != "dragonName") { game[thisKey] = new Decimal(loadgame[thisKey]) }
            else if (Array.isArray(loadgame[thisKey])) {
                game[loadKeys[i]] = loadgame[thisKey].map((x) => {
                    if (typeof x == "string") { return new Decimal(x) } else { return x }
                })
            }
            //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
            else { game[loadKeys[i]] = loadgame[loadKeys[i]] }
        }
    }
}
function exportGame() {
    save()
    navigator.clipboard.writeText(btoa(JSON.stringify(playerStats))).then(function () {
        alert("Copied to clipboard!")
    }, function () {
        alert("Error copying to clipboard, try again...")
    });
}
function importGame() {
    let text = prompt("Input your save here:");
    if(text == null) return;
    let loadgame = JSON.parse(atob(text))
    if (loadgame && loadgame != null && loadgame != "") {
        load(loadgame);
        save();
        location.reload();
    }
    else {
        alert("Invalid input.")
    }
}
function reset() {
    playerStats = JSON.parse(JSON.stringify(cleanPlayerStats));
}
function resetSave() {
    reset();
    save();
    location.reload();
}
function hardReset() {
    let confirmation1 = confirm('WARNGING!\nThis will completely reset your save file!');
    if (confirmation1) {
        let confirmation2 = confirm('Are you really sure?');
        if (confirmation2) { resetSave(); } else { return; }
    } else {
        return;
    }

}