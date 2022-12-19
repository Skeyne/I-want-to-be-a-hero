var renderTickTime = 1000 / 15;
var logicTickTime = 1000 / 50;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var cBuffer = document.createElement('canvas');
cBuffer.width = 800;
cBuffer.height = 600;
var ctxBuffer = cBuffer.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctxBuffer.imageSmoothingEnabled = false;
var leftWindow = document.getElementById("tabScrollWrapper");
var tabNames = ['story', 'status', 'training', 'areas', 'abilities', 'skills', 'info'];
var sidebar = document.getElementById('sidebar');
let activeTab = 0;
for (let index = 0; index < tabNames.length; index++) {
    const tabName = tabNames[index]
    let b = document.createElement('button');
    b.setAttribute("class", "sidebarButton pickle");
    b.setAttribute("id", `${tabName}TabButton`);
    b.setAttribute("onclick", `changeTab(${index})`);
    b.innerHTML = tabName;
    sidebar.append(b);
}
changeTab(0);
function changeTab(index) {
    if (index < 0 || index >= tabNames.length) return;
    leftWindow.scrollTo({ left: index * leftWindow.clientWidth, behaviour: 'smooth', });
    document.getElementById(`${tabNames[activeTab]}TabButton`).setAttribute("class", "sidebarButton pickle");
    document.getElementById(`${tabNames[index]}TabButton`).setAttribute("class", "sidebarButton sidebarButtonActive pickle");
    activeTab = index;

}
var log = document.getElementById("logBox");
var pageY = 0;
function disableScroll() {
    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
        window.scrollTo(0, pageY);
    };
}

function enableScroll() {
    window.onscroll = function () { };
}

let isMouseHover = false
leftWindow.addEventListener("mouseleave", function (event) {
    pageY = 0;
    isMouseHover = false
    enableScroll();
}, false);
leftWindow.addEventListener("mouseover", function (event) {
    if (pageY == 0) pageY = window.pageYOffset;
    isMouseHover = true
    disableScroll();
}, false);

window.addEventListener("wheel", function (e) {
    if (!isMouseHover) return;
    if (e.deltaY > 0) changeTab(activeTab + 1);
    else changeTab(activeTab - 1);;
});
function logConsole(text) {
    log.innerHTML += "[" + new Date().toLocaleTimeString() + "] " + text + "<br \r>";
    log.scrollTop = log.scrollHeight;
}
class CombatEntity {
    constructor() {
        this.maxHealth = 0;
        this.health = 0;
        this.distance = 0;
        this.initiative = 0;
        this.nextMove = null;
        this.nextMoveInitiative = 0;
        this.damageReduction = 0;
        this.target = null;
        this.spriteSize = { x: 32, y: 32 }
        this.actionSpeed = 1;
    }
    setTarget(target) {
        this.target = target;
    }
    takeDamage(amount) {
        let d = amount * this.damageReduction;
        this.health -= d;
        let died = (this.health <= 0);
        if (died) {
            this.onDeath();
        }
        return { died, d };
    }
    onDeath() {
        return;
    }
    tick() {
        if (this.health <= 0) {
            return false;
        } else {
            this.health = Math.min(this.health + this.maxHealth * this.healthRegeneration * logicTickTime / 1000, this.maxHealth);
        }
        if (this.nextMove != null) {
            this.initiative += 1000 * logicTickTime / 1000 * this.actionSpeed;

        } else {
            this.think();
        }
        this.tickCooldowns();
        if (this.initiative >= this.nextMoveInitiative) {
            this.initiative -= this.nextMoveInitiative;
            this.act(this.target);
            this.think();
        }
        return true;
    }
    tickCooldowns() {
        console.error("Do not use CombatEntity directly.");
    }
    act(target) {
        console.error("Do not use CombatEntity directly.");
    }
    think() {
        console.error("Do not use CombatEntity directly.");
    }
    draw(context) {
        return;
    }
}
var environmentDistance = 0;

let restRate = 5;
class Player extends CombatEntity {
    constructor(data) {
        super();
        this.data = data;
        this.name = "Hero";
        this.maxHealth = PLAYER_BASE_HEALTH + formulas.maxHealth(getEffectiveValue("toughness"));
        this.health = this.maxHealth;
        this.image = new Image(32, 32);
        this.image.src = "joe.png";
        this.portraitImage = new Image();
        this.portraitImage.src = "joePortrait.png";
        this.damageReduction = formulas.damageReduction(getEffectiveValue("toughness"));
        this.actionSpeed = formulas.actionSpeed(getEffectiveValue("agility"));
        this.healthRegeneration = getSecondaryAttribute("healthRegeneration");
        this.criticalChance = getSecondaryAttribute("criticalChance");
        this.overwhelm = getSecondaryAttribute("overwhelm");
        this.takedown = getSecondaryAttribute("takedown");
        this.dodgeChance = getSecondaryAttribute("dodgeChance");
        this.cooldownReduction = formulas.cooldownReduction(getEffectiveValue("mind"));
        this.moveIntention = 1;
        this.nextMoveKey = null;
        this.equippedAbilities = [...playerStats.equippedAbilities];
        this.equippedAbilities.forEach(ability => {
            if (ability != null) {
                if (!playerStats.abilityCooldowns.hasOwnProperty(ability)) {
                    playerStats.abilityCooldowns[ability] = 0;
                }
            }
        });

    }
    tickCooldowns() {
        playerStats.equippedAbilities.forEach(ability => {
            playerStats.abilityCooldowns[ability] -= logicTickTime;
        });
    }

    act(target) {
        if (target == null) {
            return;
        }
        let dist = target.distance;
        switch (this.nextMove.type) {
            case 0:
                let inRange = false;
                switch (this.nextMove.category) {
                    case 'melee':
                        inRange = (this.nextMove.range[0] >= dist);
                        break;
                    case 'ranged':
                        inRange = (this.nextMove.range[1] >= dist && this.nextMove.range[0] <= dist);
                        break;
                    default:
                        console.log("UNKOWN ABILITY CATEGORY")
                        break;
                }
                if (inRange) {
                    let isCrit = (Math.random() < this.criticalChance);
                    let d1 = this.nextMove.damage
                        + this.nextMove.damageRatios[0] * (Math.sqrt(getEffectiveValue("strength") + 1) - 1)
                        + this.nextMove.damageRatios[1] * (Math.sqrt(getEffectiveValue("toughness") + 1) - 1)
                        + this.nextMove.damageRatios[2] * (Math.sqrt(getEffectiveValue("mind") + 1) - 1)
                        + this.nextMove.damageRatios[3] * (Math.sqrt(getEffectiveValue("agility") + 1) - 1);
                    d1 = d1 * (this.nextMove.damageRange[0] + Math.random() * (this.nextMove.damageRange[1] - this.nextMove.damageRange[0]));
                    let d2 = (isCrit ? 1.5 : 1) * d1;
                    let d3 = d2 * (1 + target.health / target.maxHealth * this.overwhelm) * (1 + (1 - target.health / target.maxHealth) * this.takedown);
                    if (this.nextMove.hasOwnProperty("effects")) {
                        Object.keys(this.nextMove.effects).forEach(effect => {
                            switch (effect) {
                                case "knockback":
                                    target.distance += this.nextMove.effects[effect];
                                    break;
                                case "aoe":
                                    encounter.enemyArray.forEach(enemy=>{
                                        if(enemy == null) return;
                                        if(enemy == target) return;
                                        let originDistance;
                                        switch (this.nextMove.category) {
                                            case "melee":
                                                originDistance = this.distance;
                                                break;
                                            case "ranged":
                                                originDistance = target.distance;
                                                break;
                                            default:
                                                console.error("SKILL CATEGORY NOT COMPATIBLE WITH AOE");
                                                break;
                                        }
                                        if(Math.abs(originDistance-enemy.distance)<=this.nextMove.effects[effect])
                                        {let { died: killingBlow, d: dr } = enemy.takeDamage(d3);
                                        logConsole(`Hero ${isCrit ? "critically " : ""}hit ${enemy.name} with ${playerMoves[this.nextMoveKey].name} for ${format(dr)}(${format(d3)}) damage.`);
                                        }
                                    })
                                    break;
                                default:
                                    console.error("ERROR UNKOWN SKILL EFFECT");
                                    break;
                            }
                        });
                    }
                    let { died: killingBlow, d: dr } = target.takeDamage(d3);
                    logConsole(`Hero ${isCrit ? "critically " : ""}hit ${this.target.name} with ${playerMoves[this.nextMoveKey].name} for ${format(dr)}(${format(d3)}) damage.`);
                    if (killingBlow) this.target = null;
                }
                break;
            case 1:
                let deltaMinus = Math.min(100 - dist, this.nextMove.range);
                let deltaPlus = Math.min(dist - 5, this.nextMove.range);
                if (this.moveIntention > 0) {
                    this.target.distance -= deltaPlus;
                    environmentDistance -= deltaPlus;
                } else {
                    this.target.distance += deltaMinus;
                    environmentDistance += deltaMinus;
                }
                break;

            default:
                logConsole("ERROR: Not a valid move type");
                break;
        }
        playerStats.abilityCooldowns[this.nextMoveKey] = this.nextMove.cooldownTime * this.cooldownReduction;
    }
    think() {
        if (this.target == null) {
            switch (gameState) {
                case "InCombat":
                    let closest = -1;
                    let distance = Infinity;
                    for (let index = 0; index < encounter.enemyArray.length; index++) {
                        const enemy = encounter.enemyArray[index];
                        if (enemy == null || enemy.health <= 0) { continue }
                        else {
                            if (enemy.distance < distance) {
                                distance = enemy.distance;
                                closest = index;
                            }
                        }
                    }
                    if (closest != -1) { this.target = encounter.enemyArray[closest];}
                    else {
                        document.getElementById("playerMoveText").innerHTML = "No target (IN COMBAT)";
                        return;
                    }
                    break;
                default:
                    document.getElementById("playerMoveText").innerHTML = "No target";
                    return;
                    break;
            }

        }
        let dist = this.target.distance;
        if (dist > 5) this.moveIntention = 1; else this.moveIntention = -1;
        let weights = [this.equippedAbilities.length];
        let i = 0;
        for (let index = 0; index < this.equippedAbilities.length; index++) {
            let k = this.equippedAbilities[index];
            let ability = playerMoves[k];
            if (k == null) { weights[index] = -1; continue; }
            if (playerStats.abilityCooldowns[k] > 0) { weights[index] = -1; continue; }
            if (ability.type == 0) {
                switch (ability.category) {
                    case 'melee':
                        weights[index] = (ability.range[0] >= dist ? arraySum(ability.damageRatios) / ability.time * 100000 : 0);
                        break;
                    case 'ranged':
                        weights[index] = ((ability.range[1] >= dist && ability.range[0] <= dist) ? arraySum(ability.damageRatios) / ability.time * 100000 : 0);
                        break;
                    default:
                        console.log("UNKOWN ABILITY CATEGORY")
                        break;
                }
            }
            if (ability.type == 1) {
                weights[index] = (dist <= 5 ? 0 : 10);
            }
        }
        const max = Math.max(...weights);
        //console.log("Weights:",weights," Max:",max)
        let indexes = [];

        for (let index = 0; index < weights.length; index++) {
            if (weights[index] === max) {
                indexes.push(index);
            }
        }
        let pick;
        if (indexes.length == 1) {
            pick = 0;
        } else {
            pick = Math.floor(Math.random() * indexes.length);
        }
        let moveKey = this.equippedAbilities[indexes[pick]];
        this.nextMove = playerMoves[moveKey];
        this.nextMoveKey = moveKey;
        this.nextMoveInitiative = this.nextMove.time;
        document.getElementById("playerMoveText").innerHTML = moveKey;

    }

    draw(context) {
        let canvasX = scaleDistance(this.distance);
        let canvasY = cBuffer.height - 40;
        context.drawImage(this.image, canvasX - 128 / 2, canvasY - 128, 128, 128);
        if (this.nextMove != null) drawSkillIcon(context, this.nextMove.iconName, canvasX, canvasY);
    }
    rest() {
        this.health = Math.min(this.health + this.maxHealth * this.data.restRate * logicTickTime / 1000, this.maxHealth);
    }
    takeDamage(amount) {
        let d = amount * this.damageReduction;
        if (this.dodgeChance > Math.random()) {
            logConsole(`${this.name} dodged ${format(amount)} damage!`)
            return 0;
        }
        this.health -= d;
        return d;
    }
}
class Enemy extends CombatEntity {
    constructor(enemyData, distance, drawIndex = 0) {
        super();
        this.data = enemyData;
        this.abilityCooldowns = {};
        enemyData.moves.forEach(ability => {
            this.abilityCooldowns[ability] = 0;
        });
        this.name = enemyData.name;
        this.drawIndex = drawIndex;
        this.maxHealth = enemyData.maxHealth;
        this.health = this.maxHealth
        this.damageReduction = formulas.damageReduction(enemyData.attributes[1]);
        this.actionSpeed = formulas.actionSpeed(enemyData.attributes[3]);
        this.healthRegeneration = enemyData.healthRegen;
        this.distance = distance;
        this.name = enemyData.name;
        this.image = new Image(32, 32);
        this.image.src = enemyData.spriteFile;
        this.portraitImage = new Image(32, 32);
        this.portraitImage.src = enemyData.portraitFile;
        this.nextMoveKey = null;
    }
    tickCooldowns() {
        this.data.moves.forEach(ability => {
            this.abilityCooldowns[ability] -= logicTickTime;
        });
    }
    act(target) {
        if (target == null) {
            return;
        }
        switch (this.nextMove.type) {
            case 0:
                if (this.distance <= this.nextMove.range) {
                    let d = this.nextMove.baseDamage
                        + this.nextMove.damageRatios[0] * (Math.sqrt(this.data.attributes[0] + 1) - 1)
                        + this.nextMove.damageRatios[1] * (Math.sqrt(this.data.attributes[1] + 1) - 1)
                        + this.nextMove.damageRatios[2] * (Math.sqrt(this.data.attributes[2] + 1) - 1)
                        + this.nextMove.damageRatios[3] * (Math.sqrt(this.data.attributes[3] + 1) - 1);
                    let dr = target.takeDamage(d);
                    logConsole(`${this.name} hit ${this.target.name} with ${this.nextMove.name} for ${format(dr)}(${format(d)}) damage.`);
                } else {

                }
                break;
            case 1:
                this.distance -= Math.min(this.distance - 5, this.nextMove.range);
                //logConsole(`${this.name} used ${this.nextMove.name}`)
                break;
            default:
                logConsole("ERROR: Not a valid move type");
                break;
        }
        this.abilityCooldowns[this.nextMoveKey] = this.nextMove.cooldownTime;
    }
    think() {
        if (this.target == null) {
            document.getElementById("enemyMoveText").innerHTML = "No target";
            return;
        }
        let dist = this.distance;
        let weights = [];
        for (let index = 0; index < this.data.moves.length; index++) {
            let k = this.data.moves[index];
            let ability = abilityLibrary[k];
            if (this.abilityCooldowns[k] > 0) { weights[index] = -1; continue; }
            if (ability.type == 0) {
                weights[index] = (ability.range >= dist ? 100 : 0);
            }
            if (ability.type == 1) {
                weights[index] = (dist > 5 ? 100 : 0);
            }
        }
        //console.log(weights);
        const max = Math.max(...weights);
        const indexes = [];
        for (let index = 0; index < weights.length; index++) {
            if (weights[index] === max) {
                indexes.push(index);
            }
        }
        let pick;
        if (indexes.length == 1) {
            pick = 0;
        } else {
            pick = Math.floor(Math.random() * indexes.length);
        }
        let moveKey = Object.keys(this.data.moves)[indexes[pick]];
        this.nextMoveKey = this.data.moves[moveKey];
        this.nextMove = abilityLibrary[this.data.moves[moveKey]];
        this.nextMoveInitiative = this.nextMove.time;
    }
    draw(context) {
        let canvasX = scaleDistance(this.distance);
        let canvasY = cBuffer.height - 40 - (this.drawIndex) * 10;

        context.drawImage(this.image, canvasX - 128 / 2, canvasY - 128, 128, 128);
        drawInfoBars(context, this, canvasX, canvasY);
        if (this.nextMove != null) drawSkillIcon(context, this.nextMove.iconName, canvasX, canvasY);
    }
    onDeath() {
        addPlayerExp(this.data.expReward);
        addPlayerMoney(this.data.moneyReward);
        addPlayerReputation(this.data.reputationReward);
        checkDefeatQuest(this.data.id);
        logConsole(`${this.name} was defeated! +${this.data.moneyReward}$ +${this.data.expReward}EXP +${this.data.reputationReward}REP`)
    }
}
class Encounter {
    constructor(area) {
        this.enemyArray = [];
        this.enemiesToSpawn = area.getEnemies();
        let lastHealth = player.health
        this.area = area;
        player = new Player(playerStats);
        if (lastHealth > 0) { player.health = lastHealth; }
        for (let index = 0; index < this.enemiesToSpawn.length; index++) {
            //let picked = Math.floor(Math.random() * this.area.enemies.length);
            let picked = this.enemiesToSpawn[index];
            let drawIndex = mod(index, 2) == 0 ? Math.floor(index / 2) : -Math.floor(index + 1 / 2);
            //let newEnemy = new Enemy(enemyData[this.area.enemies[picked]], Math.round(5 * Math.random()) * 10 + 50, drawIndex = drawIndex);
            let newEnemy = new Enemy(enemyData[picked], Math.round(5 * Math.random()) * 10 + 50, drawIndex = drawIndex);
            this.enemyArray.push(newEnemy);
            this.enemyArray[index].setTarget(player);
        }
        player.setTarget(this.enemyArray[0]);
    }
    tick() {
        player.tick();
        for (let index = 0; index < encounter.enemyArray.length; index++) {
            let e = encounter.enemyArray[index];
            if (e == null) { continue; }
            let active = e.tick();
            if (!active) {
                encounter.enemyArray[index] = null;
            }
        }
    }

    isActive() {
        if (player.health <= 0) { return 2; }
        for (let index = 0; index < this.enemyArray.length; index++) {
            if (this.enemyArray[index] != null) { return 0; }
        }
        return 1;
    }
}



//console.log(document.querySelector('input[name="selectArea"]:checked').value);
currentArea = areas[playerStats.currentArea];
areaSelect.value = playerStats.currentArea;

var player = new Player(playerStats);
//var encounter = new Encounter(currentArea, 1);
var bgImage = new Image();
var gameState = "InPatrol";
//window.setInterval(function () { mainLoop(); }, logicTickTime);

//const worker = new Worker('./worker.js');
const worker = new Worker(URL.createObjectURL(new Blob(["(" + worker_function.toString() + ")()"], { type: 'text/javascript' })));
worker.onmessage = (event) =>
    mainLoop();

worker.postMessage({
    interval: logicTickTime,
})

function mainLoop() {
    logicLoop();
    renderLoop();

}
function renderLoop() {
    ctxBuffer.clearRect(0, 0, cBuffer.width, cBuffer.height);
    switch (gameState) {
        case "InCombat":
            drawBackground();
            drawEnemies();
            drawPlayer();
            drawCharacterPortrait(ctxBuffer, player, 'l');
            if (player.target != null) {
                drawCharacterPortrait(ctxBuffer, player.target, "r");
            }
            break;
        case "InRest":
            ctxBuffer.fillStyle = "black";
            ctxBuffer.fillRect(0, 0, cBuffer.width, cBuffer.height);
            ctxBuffer.font = `80px Pickle Pushing`;
            ctxBuffer.fillStyle = "white";
            ctxBuffer.textAlign = 'center';
            ctxBuffer.fillText("DEFEAT!", cBuffer.width / 2, cBuffer.height / 2);
            ctxBuffer.font = `24px Pickle Pushing`;
            ctxBuffer.fillText("Getting up and trying again...", cBuffer.width / 2, cBuffer.height / 2 + 50);
            ctxBuffer.textAlign = 'left';
            break;
        case "InPatrol":
            environmentDistance -= logicTickTime / 1000 * 10;
            drawBackground();
            drawPlayer();
            drawCharacterPortrait(ctxBuffer, player, 'l');
            ctxBuffer.fillStyle = "black";
            ctxBuffer.fillRect(0, cBuffer.height / 2 - 40, cBuffer.width, 100);
            ctxBuffer.font = `50px Pickle Pushing`;
            ctxBuffer.fillStyle = "white";
            ctxBuffer.textAlign = 'center';

            ctxBuffer.fillText((currentArea.patrolTime - currentArea.patrolCounter > 500) ? "Patrolling..." : "FIGHT!", cBuffer.width / 2, cBuffer.height / 2 + 30);
            ctxBuffer.textAlign = 'left';
            break;
        default:
            console.error("UNKOWN GAME STATE TO DRAW");
            break;
    }
    //Draw to render canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    c.height = c.clientHeight;
    c.width = c.clientWidth;
    //console.log("Buffer dimension:"+ cBuffer.width + " " + cBuffer.height + "\n"+ "Canvas dimensions" + c.width + " " + c.height);
    ctx.scale(c.height / cBuffer.height, c.height / cBuffer.height);
    ctx.drawImage(cBuffer, 0, 0);
    //Update html values
    document.getElementById("playerLevelText").innerHTML = "LEVEL " + playerStats.level;
    document.getElementById("playerExperienceText").innerHTML = format(playerStats.experience) + "/" + playerStats.experienceToNext;
    document.getElementById("playerExperienceBar").max = playerStats.experienceToNext;
    document.getElementById("playerExperienceBar").value = playerStats.experience;
    document.getElementById("playerHealthText").innerHTML = format(player.health) + "/" + format(player.maxHealth);
    document.getElementById("playerExperienceText").innerHTML = format(playerStats.experience) + "/" + format(playerStats.experienceToNext);
    document.getElementById("playerMaxHealthDisplay").innerHTML = format(player.maxHealth);
    document.getElementById("playerHealthBar").max = player.maxHealth;
    document.getElementById("playerHealthBar").value = player.health;
    document.getElementById("playerInitiativeText").innerHTML = format(player.initiative / 1000 / player.actionSpeed) + "/" + format(player.nextMoveInitiative / 1000 / player.actionSpeed) + "s";
    document.getElementById("playerInitiativeBar").max = player.nextMoveInitiative;
    document.getElementById("playerInitiativeBar").value = player.initiative;
    document.getElementById("trainingAreaName").innerHTML = "Training at: " + currentTrainingArea.name;
    document.getElementById("trainingProgressBar").max = currentTrainingArea.timeToComplete;
    document.getElementById("trainingProgressBar").value = currentTrainingArea.progress;
    document.getElementById("trainingProgressBarOverview").max = currentTrainingArea.timeToComplete;
    document.getElementById("trainingProgressBarOverview").value = currentTrainingArea.progress;
    document.getElementById("classText").innerHTML = playerStats.class;
    document.getElementById("passivePointsText").innerHTML = getTotalPassivePoints() - playerStats.passivePointsSpent;
    document.getElementById("moneyText").innerHTML = format(playerStats.money);
    document.getElementById("reputationText").innerHTML = format(playerStats.reputation);
    Object.values(attribute).forEach(attributeName => {
        let baseAttributeValue = playerStats[attributeName];
        let effectiveValue = format(getEffectiveValue(attributeName))
        let softCappedValue = format(formulas.softcappedAttribute(attributeIdToIndex[attributeName]));
        let softCap = playerStats.attributeSoftcaps[attributeIdToIndex[attributeName]];
        let softCapText = (baseAttributeValue > softCap) ? `EFFECTIVE BASE: ${softCappedValue}` : `${softCappedValue}`;
        if (baseAttributeValue > softCap) {
            softCapText += `<br>(RAW: ${format(baseAttributeValue)})`
            softCapText += `<br>[SOFTCAP: ${softCap}]`;
            effectiveValue = effectiveValue + "(!)";
        }
        document.getElementById(attributeName + "Text").innerHTML = effectiveValue;
        document.getElementById(attributeName + "SoftcapText").innerHTML = softCapText;
    });
}
function logicLoop() {
    switch (gameState) {
        case "InCombat":
            switch (encounter.isActive()) {
                case 0:
                    encounter.tick();
                    break;
                case 1:
                    logConsole("Encounter finished.")
                    gameState = "InPatrol";
                    player.target = null;
                    player.nextMove = null;
                    currentArea.patrolCounter = 0;
                    logConsole("Starting patrol.")
                    break;
                case 2:
                    logConsole("Player defeated, resting.")
                    gameState = "InRest";
                    player = new Player(playerStats);
                    player.health = 0;
                    break;
                default:
                    break;
            }
            break;
        case "InRest":
            player.rest();
            if (player.health == player.maxHealth) {
                gameState = "InPatrol";
                logConsole("Starting patrol.")
            }
            break;
        case "InPatrol":
            switch (currentArea.tick()) {
                case 0:
                    player.tick();
                    break;
                case 1:
                    encounter = new Encounter(currentArea, currentArea.enemyNum);
                    gameState = "InCombat";
                    logConsole("Entering combat.")
                    break;
                default:
                    console.error("UNKNOWN PATROL RETURN STATE");
                    break;
            }
        default:
            break;
    }
    currentTrainingArea.tick();
}
function changeInterval(interval) {
    window.clearInterval(ticker);
    renderTickTime = 1000 / interval
    ticker = window.setInterval(function () { renderLoop(); }, renderTickTime);
    console.log(`Changing refresh rate to ${interval}`);
}
function scaleDistance(distance) {
    let dist = Math.min(100, Math.max(0, distance)) / 100;
    let padding = 50;
    let lower = padding;
    let upper = cBuffer.width - padding;
    return lower + dist * (upper - lower);
}
function drawCharacterPortrait(context, character, side) {
    let anchor = { x: 0, y: 0 };
    let portraitDimensions = 120;
    let portraitBorder = 4;
    let mirror = 1;
    if (side == "r") { anchor.x = context.canvas.width - portraitDimensions - 2 * portraitBorder; anchor.y = 0; mirror = -1; }
    //Portrait Image
    context.fillStyle = "black";
    context.fillRect(anchor.x, anchor.y, portraitDimensions + 2 * portraitBorder, portraitDimensions + 2 * portraitBorder);
    context.drawImage(character.portraitImage, anchor.x + portraitBorder, anchor.y + portraitBorder, portraitDimensions, portraitDimensions);
    //Healthbar
    let hanchor = { x: portraitDimensions + 2 * portraitBorder, y: 0 };
    if (side == "r") { hanchor.x = context.canvas.width - portraitDimensions - 2 * portraitBorder; }
    //Name
    let nameHeight = 30;
    context.fillStyle = "rgba(0,0,0,.5)";
    context.fillRect(hanchor.x, anchor.y, mirror * 200, nameHeight + 12);
    context.font = `${nameHeight}px Pickle Pushing`;
    context.fillStyle = "white";
    context.fillText(character.name, hanchor.x + (mirror - 1) * 98, hanchor.y + nameHeight);
    hanchor.y += nameHeight + 12;
    //Health bar
    context.fillStyle = "grey";
    context.fillRect(hanchor.x, hanchor.y, mirror * 200, 16);
    context.fillStyle = "rgb(200, 35, 35)";
    context.fillRect(hanchor.x + 2 * mirror, hanchor.y + 2, mirror * 196, 12);
    let grdHealth = context.createLinearGradient(hanchor.x + mirror * 2, 0, hanchor.x + mirror * (196), 0);
    grdHealth.addColorStop(0, "rgb(21, 153, 41)");
    grdHealth.addColorStop(1, "rgb(0, 255, 38)");
    let grdHealth2 = context.createLinearGradient(0, hanchor.y + 2, 0, hanchor.y + 14);
    grdHealth2.addColorStop(0, "rgba(255, 255, 255, .25)");
    grdHealth2.addColorStop(1, "rgba(0, 0, 0, .25)");
    context.fillStyle = grdHealth;
    context.fillRect(hanchor.x + 2 * mirror, hanchor.y + 2, mirror * 196 * Math.max(0, (character.health / character.maxHealth)), 12);
    context.fillStyle = grdHealth2;
    context.fillRect(hanchor.x + 2 * mirror, hanchor.y + 2, mirror * 196 * Math.max(0, (character.health / character.maxHealth)), 12);
    hanchor.y += 12;
    //Action bar
    context.fillStyle = "grey";
    context.fillRect(hanchor.x, hanchor.y, mirror * 200, 10);
    context.fillStyle = "white";
    context.fillRect(hanchor.x + mirror * 2, hanchor.y + 2, mirror * 196, 6);
    if (character.initiative == NaN) console.log("NaN error");
    let grdAction = context.createLinearGradient(hanchor.x, 0, hanchor.x + mirror * 196 * (character.initiative / (character.nextMove != null) ? character.nextMoveInitiative : character.initiative), 0);
    grdAction.addColorStop(0.5, "rgb(0,255,255)");
    grdAction.addColorStop(1, "rgb(0,110,220)");
    context.fillStyle = grdAction;
    context.fillRect(hanchor.x + mirror * 2, hanchor.y + 2, mirror * 196 * (character.initiative / character.nextMoveInitiative), 6);
    let grdAction2 = context.createLinearGradient(0, hanchor.y + 2, 0, hanchor.y + 8);
    grdAction2.addColorStop(0, "rgba(255, 255, 255, .25)");
    grdAction2.addColorStop(1, "rgba(0, 0, 0, .25)");
    context.fillStyle = grdAction2;
    context.fillRect(hanchor.x + mirror * 4, hanchor.y + 2, mirror * 192 * (character.initiative / character.nextMoveInitiative), 6);
    //hanchor.y += 8;
    //EXP bar   
    // if (side == "l") {
    //     context.fillStyle = "grey";
    //     context.fillRect(hanchor.x, hanchor.y, 200, 6);
    //     context.fillStyle = "white";
    //     context.fillRect(hanchor.x + 4, hanchor.y + 2, 192, 2);
    //     let grdExp = context.createLinearGradient(132, 0, 132 + 192 * (playerStats.experience / playerStats.experienceToNext), 0);
    //     grdExp.addColorStop(0.5, "rgb(255,0,255)");
    //     grdExp.addColorStop(1, "rgb(200,0,200)");
    //     context.fillStyle = grdExp;
    //     context.fillRect(hanchor.x + 4, hanchor.y + 2, 192 * (playerStats.experience / playerStats.experienceToNext), 2);
    // }

}
function changeArea(index) {
    playerStats.currentArea = index;
    currentArea = areas[playerStats.currentArea];
    currentArea.patrolCounter = 0;
    if (gameState != "InRest") {
        gameState = "InPatrol";
    }
    player.target = null;
    player.nextMove = null;
}

function drawSkillIcon(context, skillname, x, y) {
    let heightAbove = 110;
    let img = new Image();
    img.src = skillname + "Icon.png";
    context.drawImage(img, x - img.width / 2, y - img.height - heightAbove);
}
function drawInfoBars(context, entity, rootx, rooty) {
    let heightAbove = 100;
    context.fillStyle = "black";
    context.fillRect(rootx - 20, rooty - heightAbove, 42, 8);
    context.fillStyle = "red";
    context.fillRect(rootx - 20, rooty - heightAbove, 40, 5);
    context.fillStyle = "green";
    context.fillRect(rootx - 20, rooty - heightAbove, 40 * (entity.health / entity.maxHealth), 5);
    context.fillStyle = "cyan";
    context.fillRect(rootx - 20, rooty - heightAbove + 6, 40 * (entity.initiative / entity.nextMoveInitiative), 1);
}
function drawBackground() {
    let bgImage = currentArea.backgroundImage;
    let scrollFactor = cBuffer.height / cBuffer.width * bgImage.width / bgImage.height;
    let environmentScrollBase = (mod(environmentDistance, (100 * scrollFactor))) / 100;
    //console.log(environmentScrollBase+" "+scrollFactor);
    ctxBuffer.drawImage(bgImage, environmentScrollBase * cBuffer.width, 0, cBuffer.height / bgImage.height * bgImage.width, cBuffer.height);
    ctxBuffer.drawImage(bgImage, (environmentScrollBase - 1 * scrollFactor) * cBuffer.width, 0, cBuffer.height / bgImage.height * bgImage.width, cBuffer.height);
}
function drawPlayer() {
    player.draw(ctxBuffer);
}
function drawEnemies() {
    encounter.enemyArray.forEach(enemy => {
        if (enemy == null) { return; }
        enemy.draw(ctxBuffer);
    });
}
function mod(n, m) {
    return ((n % m) + m) % m;
}
