const baseExperienceCost = 5;
const baseLinearExperienceCost = 1;
const baseExperienceCostExponent = 5;
const experienceLevelExponent = 1.25;
const DAMAGE_REDUCTION_BASE = 0.05;
const ACTION_SPEED_BASE = 0.06;
const COOLDOWN_BASE = 0.04;
const PLAYER_BASE_HEALTH = 5;
const HEALTH_GROWTH_EXPONENT = 0.65;
const TRAINING_REWARD_GROWTH_BASE = 1.22;
const TRAINING_COST_GROWTH_BASE = 1.55;
const PRESTIGE_SOFTCAP_RATE = 0.1;
const PRESTIGE_SOFTCAP_OVERCAP_RATE = 0.5;
const PRESTIGE_ATTRIBUTE_RATE = 0.01;
const PLAYER_CLASSES = ["human", "superhuman", "mutant", "ninja", "esper", "cyborg"];
const PLAYER_SPRITES = { 'human': 'joe.png', 'superhuman': 'superHumanSprite1.png', 'esper': 'esperSprite1.png', 'ninja': 'ninjaSprite1.png', 'cyborg': 'joe.png', 'mutant': 'mutantSprite1.png' }
const attributeIndexToId = {
    0: "strength",
    1: "toughness",
    2: "mind",
    3: "agility",
}
const attributeIdToIndex = {
    "strength": 0,
    "toughness": 1,
    "mind": 2,
    "agility": 3,
}
const attributeDisplayNames = {
    strength: "Strength",
    toughness: "Toughness",
    mind: "Mind",
    agility: "Agility",
}
const attributeDisplayShort = {
    strength: "STR",
    toughness: "TGH",
    mind: "MND",
    agility: "AGI",
}
const statColors = {
    strength: "rgb(255,0,0)",
    toughness: "rgb(255,0,0)",
    mind: "rgb(255,0,0)",
    agility: "rgb(255,0,0)",

}
const attribute = {
    strength: "strength",
    toughness: "toughness",
    mind: "mind",
    agility: "agility",
}
var formulas = {};
formulas.playerExp = function (value) {
    return (baseExperienceCost + baseLinearExperienceCost * playerStats.level) * Math.pow(baseExperienceCostExponent, Math.floor(Math.log10(Math.max(1, playerStats.level)))) * Math.pow(Math.max(1, playerStats.level), experienceLevelExponent);
}
formulas.cooldownReduction = function (value) {
    return Math.pow(1 - COOLDOWN_BASE, Math.max(0, Math.log10(1 + value)));
}
formulas.actionSpeed = function (value) {
    return Math.pow(1 + ACTION_SPEED_BASE, Math.max(0, Math.log10(1 + value)));
}
formulas.damageReduction = function (value) {
    return Math.pow(1 - DAMAGE_REDUCTION_BASE, Math.log10(1 + value));
}
formulas.flatReduction = function (entity) {
    let baseValue = playerStats.flatReduction;
    if (playerStats.effectMultipliers.hasOwnProperty("flatReductionHealth")) {
        baseValue += entity.maxHealth * (arraySum(Object.values(playerStats.effectMultipliers["flatReductionHealth"].additiveFlat))
            * (1 + arraySum(Object.values(playerStats.effectMultipliers["flatReductionHealth"].additivePercent)))
            * arrayMult(Object.values(playerStats.effectMultipliers["flatReductionHealth"].multPercent)));
    }
    return baseValue;
}
formulas.maxHealth = function (value) {
    if (value < 100) return 5 * Math.pow(value, HEALTH_GROWTH_EXPONENT);
    return 10 * Math.pow(value, HEALTH_GROWTH_EXPONENT);
}
formulas.softcappedAttribute = function (index) {
    let baseValue = playerStats[attributeIndexToId[index]];

    let softCap = playerStats.attributeSoftcaps[index]+playerStats.permanentSoftcaps[index];
    if (baseValue < 0 || softCap <= 0) return 0;
    if (baseValue <= softCap) return baseValue;
    let softCapFactor = Math.max(1, 1 + Math.log10(baseValue / softCap));
    return Math.min(baseValue, softCap) * softCapFactor;
}
const numberFormatter = new Intl.NumberFormat('en', {
    notation:'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
function format(number) {
    return numberFormatter.format(number);
    return Math.round((number + Number.EPSILON) * 100) / 100;
}
function arraySum(array) {
    return array.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);
}
function arrayMult(array) {
    return array.reduce((accumulator, value) => {
        return accumulator * value;
    }, 1);
}

function getMoveBasePower(move) {
    let d = move.damage
        + move.damageRatios[0] * (Math.sqrt(getEffectiveValue("strength") + 1) - 1)
        + move.damageRatios[1] * (Math.sqrt(getEffectiveValue("toughness") + 1) - 1)
        + move.damageRatios[2] * (Math.sqrt(getEffectiveValue("mind") + 1) - 1)
        + move.damageRatios[3] * (Math.sqrt(getEffectiveValue("agility") + 1) - 1);
    return d
}