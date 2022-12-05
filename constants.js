const DAMAGE_REDUCTION_BASE = 0.05;
const ACTION_SPEED_BASE = 0.06;
const statColors = {
    strength: "rgb(255,0,0)",
    toughness: "rgb(255,0,0)",
    mind: "rgb(255,0,0)",
    agility: "rgb(255,0,0)",

}
var formulas = {}

formulas.actionSpeed = function(value){
    return Math.pow(1 + ACTION_SPEED_BASE, Math.max(0,Math.log10(value)));
}
formulas.damageReduction = function(value){
    return Math.pow(1-DAMAGE_REDUCTION_BASE,Math.log10(1 + value));
}
