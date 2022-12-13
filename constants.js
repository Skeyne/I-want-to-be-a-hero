const baseExperienceCost = 10;
const baseLinearExperieneCost = 5;
const baseExperienceCostExponent = 1.07;
const DAMAGE_REDUCTION_BASE = 0.05;
const ACTION_SPEED_BASE = 0.06;
const PLAYER_BASE_HEALTH = 5;
const HEALTH_GROWTH_EXPONENT = 1.12;
const TRAINING_REWARD_GROWTH_BASE = 1.22;
const TRAINING_COST_GROWTH_BASE = 1.55;
const attributeIndexToId = { 
    0: "strength",
    1: "toughness",
    2: "mind",
    3: "agility",
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
    strength : "strength",
    toughness : "toughness",
    mind : "mind",
    agility : "agility",
}
var formulas = {}

formulas.actionSpeed = function(value){
    return Math.pow(1 + ACTION_SPEED_BASE, Math.max(0,Math.log10(1 + value)));
}
formulas.damageReduction = function(value){
    return Math.pow(1-DAMAGE_REDUCTION_BASE,Math.log10(1 + value));
}
formulas.maxHealth = function(value){
    return Math.pow(value,HEALTH_GROWTH_EXPONENT);
}

function format(number) {
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