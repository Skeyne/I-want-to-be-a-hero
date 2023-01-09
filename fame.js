var toNextFame = Infinity;

function getNextFame(fame) {
    return 75 + Math.pow((fame+1)/2, 2)*100;
}
function getFameEffect(effectName){
    if (playerStats.fameEffects.hasOwnProperty(effectName)){
        return 1+arraySum(Object.values(playerStats.fameEffects[effectName]))
    } else {
        return 1;
    }
}
function sanityCheckFame() {
    playerStats.fame = Math.floor((2*Math.sqrt(playerStats.reputation / 100)));
    toNextFame = getNextFame(playerStats.fame);
    updateUI();
}
function checkFame() {
    if (playerStats.reputation >= toNextFame) {
        playerStats.fame += 1;
        toNextFame = getNextFame(playerStats.fame);
        updateUI();
    }
}
function resetFameUpgrades() {
    Object.keys(playerStats.fameUpgradeLevels).forEach(
        (id) => {
            playerStats.fameUpgradeLevels[id] = 0;
            fameUpgradeDict[id].upgrade.calculateEffect();
            updateFameUpgradeDescription(fameUpgradeDict[id].upgrade);
        }
    )
    playerStats.reputation = getNextFame(Math.floor(0.9*playerStats.fame));
    sanityCheckFame();
}
function updateUI(upgrade = null) {
    document.getElementById("famePointText").innerHTML = `${playerStats.fame} (Available: ${playerStats.fame - arraySum(Object.values(playerStats.fameUpgradeLevels))})`;
    document.getElementById("fameToNextText").innerHTML = toNextFame;
    if (upgrade != null) updateFameUpgradeDescription(upgrade);
}
class FameUpgrade {
    constructor(data) {
        this.data = data;
    }
    increment() {
        console.log('up');
        if (playerStats.fame > arraySum(Object.values(playerStats.fameUpgradeLevels))) {
            if (playerStats.fameUpgradeLevels.hasOwnProperty(this.data.id)) { playerStats.fameUpgradeLevels[this.data.id] += 1; }
            else { playerStats.fameUpgradeLevels[this.data.id] = 1; }
        }
        this.calculateEffect();
        updateUI(this);
    }
    decrement() {
        console.log('down');
        if (playerStats.fameUpgradeLevels.hasOwnProperty(this.data.id)) {
            if (playerStats.fameUpgradeLevels[this.data.id] > 0) {
                playerStats.fameUpgradeLevels[this.data.id] -= 1;
            }
            this.calculateEffect();
            updateUI(this);
        }
    }
    calculateEffect() {
        if (!playerStats.fameEffects.hasOwnProperty(this.data.effectTarget)) {
            playerStats.fameEffects[this.data.effectTarget] = {};
        }
        { playerStats.fameEffects[this.data.effectTarget][this.data.id] = this.effectValue; }
    }
    get description() {
        let level =0;
        if (playerStats.fameUpgradeLevels[this.data.id] != undefined){level = playerStats.fameUpgradeLevels[this.data.id]}
        return `<div class="subHeader">${this.data.name} (${level})</div><br><div class="oxanium">Effect: +${format(100 * this.effectValue)}% ${this.data.effectTarget}</div>`
    }
    get effectValue() {
        if (playerStats.fameUpgradeLevels[this.data.id] != undefined) {
            let level = playerStats.fameUpgradeLevels[this.data.id];
            return (level > 0 ? 0.05 : 0) + ((level * 2) * Math.exp(-0.06*Math.sqrt(level)))/100;
        }
        else { return 0; }
    }
}
function updateFameUpgradeDescription(upgrade) {
    fameUpgradeDict[upgrade.data.id].element.children[1].innerHTML = upgrade.description;
}
function generateFameUpgradeUI(upgrade) {
    let d = document.createElement("div");
    d.className = "fameItemGrid";
    let iconButtonWrapper = document.createElement("div");
    iconButtonWrapper.style.width = '10vw';
    let icon = document.createElement("div");
    icon.className = "fameUpgradeIcon";
    let bUp = document.createElement("button");
    bUp.textContent = 'Increase';
    bUp.className = "fameUpgradeButton";
    bUp.onclick = () => { upgrade.increment() };
    let bDown = document.createElement("button");
    // bDown.textContent = '-';
    // bDown.className = "fameUpgradeButton";
    // bDown.onclick = function () { upgrade.decrement() };
    iconButtonWrapper.append(icon, bUp);
    let text = document.createElement("div");
    text.innerHTML = upgrade.description;
    d.append(iconButtonWrapper, text);
    fameUpgradeContainer.append(d);
    return d;
}
var fameUpgradeData = [
    { name: 'Motivated Learning', id: 'exp1', effectTarget: 'experienceGain' },
    { name: 'Good-willed Donations', id: 'money1', effectTarget: 'moneyGain' },
    { name: 'Neighbourhood Watch', id: 'patrolSpeed1', effectTarget: 'patrolSpeed' },
    { name: 'Excited Audience', id: 'trainingSpeed1', effectTarget: 'trainingSpeed' },
]
var fameUpgradeDict = {};
var fameUpgradeContainer = document.getElementById("fameUpgradeContainer");
for (let index = 0; index < fameUpgradeData.length; index++) {
    const upgrade = new FameUpgrade(fameUpgradeData[index]);
    let element = generateFameUpgradeUI(upgrade)
    fameUpgradeDict[upgrade.data.id] = { upgrade: upgrade, element: element };
}

if(isOutdated){
    Object.keys(playerStats.fameUpgradeLevels).forEach(
    (id) => {
        playerStats.fameUpgradeLevels[id] = 0;
        fameUpgradeDict[id].upgrade.calculateEffect();
        updateFameUpgradeDescription(fameUpgradeDict[id].upgrade);
    }
)
}

sanityCheckFame();
checkFame();    