sanityCheckFame();
var toNextFame = getNextFame(playerStats.fame);
checkFame();
function getNextFame(fame) {
    return 100 * Math.pow(fame, 2);
}
function sanityCheckFame() {
    playerStats.fame = Math.floor(Math.sqrt(playerStats.reputation / 100));
    updateUI();
}
function checkFame() {
    if (playerStats.reputation >= toNextFame) {
        playerStats.fame += 1;
        toNextFame = getNextFame(playerStats.fame);
        updateUI();
    }
}
function updateUI(){
    document.getElementById("famePointText").innerHTML = `${playerStats.fame} (Available: ${playerStats.fame - arraySum(Object.values(playerStats.fameUpgradeLevels))})`;
    document.getElementById("fameToNextText").innerHTML = toNextFame;
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
        updateUI();
    }
    decrement() {
        console.log('down');
        if (playerStats.fameUpgradeLevels.hasOwnProperty(this.data.id)) {
            if (playerStats.fameUpgradeLevels[this.data.id] > 0) {
                playerStats.fameUpgradeLevels[this.data.id] -= 1;
            }
            this.calculateEffect();
            updateUI();
        }
    }
    calculateEffect(){
        if(!playerStats.fameEffects.hasOwnProperty(this.data.effectTarget)){
            playerStats.fameEffects[this.data.effectTarget] = {};
        }
        {playerStats.fameEffects[this.data.effectTarget][this.data.id] = Math.log(1+playerStats.fameUpgradeLevels[this.data.id])/10;}
    }
}
function generateFameUpgradeUI(upgrade){
    let d = document.createElement("div");
    let iconButtonWrapper = document.createElement("div");
    iconButtonWrapper.style.width = '10vw';
    let icon = document.createElement("div");
    icon.className = "fameUpgradeIcon";
    let bUp = document.createElement("button");
    bUp.textContent = '+';
    bUp.className = "fameUpgradeButton";
    bUp.onclick = () => {upgrade.increment()};
    let bDown = document.createElement("button");
    bDown.textContent = '-';
    bDown.className = "fameUpgradeButton";
    bDown.onclick =  function() {upgrade.decrement()};
    iconButtonWrapper.append(icon,bUp,bDown)
    d.append(iconButtonWrapper);
    let text = document.createElement("div");
    text.innerHTML = 'TEST';
    fameUpgradeContainer.append(d,text);
    return d;
}
var fameUpgradeData =[
    {id:'exp1',effectTarget:'experienceGain'},
    {id:'money1',effectTarget:'moneyGain'},
    {id:'patrolSpeed1',effectTarget:'patrolSpeed'},
]
var fameUpgradeDict = {};
var fameUpgradeContainer = document.getElementById("fameUpgradeContainer");
for (let index = 0; index < fameUpgradeData.length; index++) {
    const upgrade = new FameUpgrade(fameUpgradeData[index]);
    let element = generateFameUpgradeUI(upgrade)
    fameUpgradeDict[upgrade.id] = {upgrade:upgrade,element:element};
}