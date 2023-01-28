var renderTickTime = 1000 / 15;
var logicTickTime = 1000 / 40;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var cBuffer = document.createElement('canvas');
cBuffer.width = 800;
cBuffer.height = 600;
var ctxBuffer = cBuffer.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctxBuffer.imageSmoothingEnabled = false;
var leftWindow = document.getElementById("tabScrollWrapper");
const tabNames = ['story', 'status', 'activity', 'areas', 'class', 'fame', 'prestige', 'info', 'options'];
var sidebar = document.getElementById('sidebar');

const customPortraitInput = document.getElementById("customPortraitInput");
customPortraitInput.addEventListener("change", function () {
    const reader = new FileReader();
    if (this.files[0].size > 2097152) { alert("File is too big!"); return; }
    reader.addEventListener("load", () => {

        document.getElementById("heroPortraitImage").src = reader.result;
        localStorage.setItem("heroPortraitImageData", reader.result);
        console.log(reader.result);
    })
    reader.readAsDataURL(this.files[0]);
})
const resetPortraitButton = document.getElementById("resetPortraitButton");
resetPortraitButton.addEventListener("click", function () {
    document.getElementById("heroPortraitImage").src = "resources/misc/joePortrait.png";
    localStorage.removeItem("heroPortraitImageData");
})
function updatePowerText() {
    document.getElementById('heroPowerText').innerHTML = format(arraySum([
        (Math.sqrt(getEffectiveValue("strength") + 1) - 1), (Math.sqrt(getEffectiveValue("toughness") + 1) - 1),
        (Math.sqrt(getEffectiveValue("mind") + 1) - 1), (Math.sqrt(getEffectiveValue("agility") + 1) - 1)]), 2);
}
//INIT STUFF
updatePowerText();
setInterval(updatePowerText, 15000);
let activeTab = 0;
for (let index = 0; index < tabNames.length; index++) {
    const tabName = tabNames[index]
    let b = document.createElement('div');
    b.setAttribute("class", "sidebarButton pickle");
    b.setAttribute("id", `${tabName}TabButton`);
    b.setAttribute("onclick", `changeTab(${index})`);
    b.innerHTML = tabName;
    sidebar.append(b);
}
changeTab(0);
if (playerStats.storyProgress >= 14) { document.getElementById("prestigeBox").style.visibility = 'visible' } else { document.getElementById("prestigeBox").style.visibility = 'hidden' }
if (playerStats.storyProgress >= 14 ) { document.getElementById(`${tabNames[6]}TabButton`).setAttribute("class", "sidebarButton pickle"); } else { document.getElementById(`${tabNames[6]}TabButton`).setAttribute("class", "sidebarButtonLocked pickle"); }
if (playerStats.storyProgress >= 8) { document.getElementById("fameBox").style.visibility = 'visible' } else { document.getElementById("fameBox").style.visibility = 'hidden' }
if (playerStats.storyProgress >= 8) { document.getElementById(`${tabNames[5]}TabButton`).setAttribute("class", "sidebarButton pickle"); } else { document.getElementById(`${tabNames[5]}TabButton`).setAttribute("class", "sidebarButtonLocked pickle"); }

sanityCheckStory();
updateStoryQuest();
updateDiaryEntries();
checkAreaUnlocks();
checkTabUnlocks();
var windowInFocus = true;
function checkTabFocused() {
    if (document.visibilityState === 'visible') {
        windowInFocus = true;
    } else {
        windowInFocus = false;
    }
}
var masterTooltip = document.createElement("div");
document.body.append(masterTooltip);
masterTooltip.id = 'masterTooltip';
masterTooltip.className = 'oxanium';
function showMasterTooltip(e) {
    let rect = e.target.getBoundingClientRect();
    let horizontal;
    let vertical;
    //console.log("1) Tooltip height: ", masterTooltip.offsetHeight)
    if (rect.right + 20 + masterTooltip.offsetWidth < window.innerWidth) {
        horizontal = true;
    } else {
        horizontal = false;
    }
    if (rect.bottom + 20 + masterTooltip.offsetHeight > window.innerHeight) {
        vertical = true;
    } else {
        vertical = false;
    }
    if (horizontal) {
        masterTooltip.style.left = (rect.right + 20) + 'px';
        masterTooltip.style.top = rect.top + 'px';
    } else {
        masterTooltip.style.left = (window.innerWidth - masterTooltip.offsetWidth - 20) + 'px';
        masterTooltip.style.top = (rect.bottom + 20) + 'px';
    }
    if (vertical) {
        masterTooltip.style.top = '';
        masterTooltip.style.bottom = (window.innerHeight - rect.bottom) + 'px';
    } else {
        masterTooltip.style.bottom = '';
    }


    // if (rect.right + 20 + masterTooltip.offsetWidth < window.innerWidth) {
    //     masterTooltip.style.left = (rect.right + 20) + 'px';
    //     masterTooltip.style.top = rect.top + 'px';
    // } else {
    //     masterTooltip.style.left = (window.innerWidth - masterTooltip.offsetWidth - 20) + 'px';
    //     masterTooltip.style.top = (rect.bottom + 20) + 'px';
    // }
    //console.log("2) Rect bottom: ", rect.bottom + 20, "Tooltip height: ", masterTooltip.offsetHeight)
    //console.log("Screen height: ", window.innerHeight)
    // if (rect.bottom + 20 + masterTooltip.offsetHeight > window.innerHeight) {
    //     masterTooltip.style.top = '';
    //     masterTooltip.style.bottom = (window.innerHeight - rect.bottom) + 'px';
    // } else {
    //     masterTooltip.style.bottom = '';
    // }
    masterTooltip.style.opacity = 1;
}
function generateAttributeTooltip(attributeId) {
    let secondaryText = "";
    switch (attributeId) {
        case "strength":
            secondaryText = `It also gives you a base damage reduction of ${format(100 * (1 - formulas.damageReduction(getEffectiveValue("strength"))), 2)}%`
            break;
        case "toughness":
            secondaryText = `It also gives you a maximum health of ${format(PLAYER_BASE_HEALTH + formulas.maxHealth(getEffectiveValue("toughness")), 3)}`
            break;
        case "mind":
            secondaryText = `It also modifies your base cooldowns to ${format(100 * formulas.cooldownReduction(getEffectiveValue("mind")), 2)}%`
            break;
        case "agility":
            secondaryText = `It also gives you a base action speed of ${format(100 * formulas.actionSpeed(getEffectiveValue("agility")), 2)}%`
            break;

        default:
            break;
    }
    return `Your ${attributeDisplayNames[attributeId]} base power is ${format(Math.sqrt(getEffectiveValue(attributeId) + 1) - 1, 2)}<br>${secondaryText}`
}
document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('tooltip')) {
        // masterTooltip.innerHTML = e.target.getElementsByClassName("skilltooltiptext")[0].innerHTML;
        // showMasterTooltip(e);
    }
    if ('skillTooltip' in e.target.dataset) {
        masterTooltip.innerHTML = generatePassiveTooltip(e.target.dataset.skillTooltip);
        showMasterTooltip(e);
    }
    if ('attributeTooltip' in e.target.dataset) {
        masterTooltip.innerHTML = generateAttributeTooltip(e.target.dataset.attributeTooltip);
        showMasterTooltip(e);
    }
    if ('abilityTooltip' in e.target.dataset) {
        masterTooltip.innerHTML = generateAbilityRequirementTooltip(e.target.dataset.abilityTooltip);
        showMasterTooltip(e);
    }
    if ('abilityTooltipDynamic' in e.target.dataset) {
        masterTooltip.innerHTML = generateAbilityDynamicTooltip(e.target.dataset.abilityTooltipDynamic);
        showMasterTooltip(e);
    }
    if ('resourceTooltip' in e.target.dataset) {
        switch (e.target.dataset.resourceTooltip) {
            case "money":
                masterTooltip.innerHTML = "You earn money by defeating enemies.<br> It can be spent on higher level activities!";
                break;
            case "reputation":
                masterTooltip.innerHTML = "You earn reputation by defeating enemies.<br> If you get enough of it you might earn some Fame!";
                break;

            default:
                masterTooltip.innerHTML = "None";
                break;
        }
        showMasterTooltip(e);

    }
    if ('activityUpgradeTooltip' in e.target.dataset) {
        masterTooltip.innerHTML = generateActivityAutoUpgradeTooltip(e.target.dataset.activityUpgradeTooltip);
        showMasterTooltip(e);

    }
});
document.addEventListener('mouseup', function (e) {
    setTimeout(() => {
        if ('skillTooltip' in e.target.dataset) {
            masterTooltip.innerHTML = generatePassiveTooltip(e.target.dataset.skillTooltip);
            showMasterTooltip(e);
        }
        if ('abilityTooltip' in e.target.dataset) {
            masterTooltip.innerHTML = generateAbilityRequirementTooltip(e.target.dataset.abilityTooltip);
            showMasterTooltip(e);
        }
        if ('abilityTooltipDynamic' in e.target.dataset) {
            masterTooltip.innerHTML = generateAbilityDynamicTooltip(e.target.dataset.abilityTooltipDynamic);
            showMasterTooltip(e);
        }
    }, 100);
});
document.addEventListener('mouseout', function (e) {
    if (e.relatedTarget == null) {
        masterTooltip.style.opacity = 0;
        return
    }
    if (e.relatedTarget.classList == undefined) {
        masterTooltip.style.opacity = 0;
    } else
        if (!e.relatedTarget.classList.contains('tooltip')) {
            masterTooltip.style.opacity = 0;
        }
});

document.addEventListener('visibilitychange', checkTabFocused);
function changeTab(index) {
    if (index < 0 || index >= tabNames.length) return;
    leftWindow.scrollTo({ left: index * leftWindow.clientWidth, behaviour: 'smooth', });
    document.getElementById(`${tabNames[activeTab]}TabButton`).setAttribute("class", "sidebarButton pickle");
    document.getElementById(`${tabNames[index]}TabButton`).setAttribute("class", "sidebarButton sidebarButtonActive pickle");
    document.getElementById(`${tabNames[index]}TabButton`).classList.remove('flash');
    activeTab = index;

}
//SUBSCRIBE FLASH EVENTS
gameEvents.levelup.subscribe(()=>{flashTabButton(tabNames.indexOf('class'));});
gameEvents.fameup.subscribe(()=>{flashTabButton(tabNames.indexOf('fame'));});
function flashTabButton(index){
    document.getElementById(`${tabNames[index]}TabButton`).classList.add('flash');
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
document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => { document.getElementById("splashScreen").className += ' splashScreenFadeOut' }, 1000)
    setTimeout(() => { document.getElementById("splashScreen").style.display = 'none' }, 2000)
});
//unintended scrolling
var keys = {};
window.addEventListener("keydown",
    function (e) {
        keys[e.code] = true;
        switch (e.code) {
            case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
            case "Space": e.preventDefault(); break;
            default: break; // do not block other keys
        }
    },
    false);
window.addEventListener('keyup',
    function (e) {
        keys[e.code] = false;
    },
    false);

// let isMouseHover = false
// leftWindow.addEventListener("mouseleave", function (event) {
//     pageY = 0;
//     isMouseHover = false
//     enableScroll();
// }, false);
// leftWindow.addEventListener("mouseover", function (event) {
//     if (pageY == 0) pageY = window.pageYOffset;
//     isMouseHover = true
//     disableScroll();
// }, false);

// window.addEventListener("wheel", function (e) {
//     if (!isMouseHover) return;
//     if (e.deltaY > 0) changeTab(activeTab + 1);
//     else changeTab(activeTab - 1);;
// });



var environmentDistance = 0;
let restRate = 5;




//console.log(document.querySelector('input[name="selectArea"]:checked').value);
currentArea = areas[playerStats.currentArea];

var player = new Player(playerStats);
//var encounter = new Encounter(currentArea, 1);
var bgImage = new Image();
var gameState = "InPatrol";
var engagementRangeInput = document.getElementById("engagementDistanceInput");
engagementRangeInput.addEventListener("keydown", e => e.preventDefault());
engagementRangeInput.value = playerStats.engagementRange;
var restPercentageInput = document.getElementById("restPercentageInput");
restPercentageInput.addEventListener("keydown", e => e.preventDefault());
restPercentageInput.value = playerStats.restToPercentage * 100;
var expCount = 0;
var expCountBuffer = 0;
function updateExperienceEstimate() {
    if (expCount == 0) {
        expCount = expCountBuffer;
    }
    expCount += (expCountBuffer - expCount) / 10;
    expCountBuffer = 0;
    document.getElementById("expEstimateText").innerHTML = format(expCount * 4, 2);
}
var moneyCount = 0;
var moneyCountBuffer = 0;
function updateMoneyEstimate() {
    if (moneyCount == 0) {
        moneyCount = moneyCountBuffer;
    }
    moneyCount += (moneyCountBuffer - moneyCount) / 10;
    moneyCountBuffer = 0;
    document.getElementById("moneyEstimateText").innerHTML = format(moneyCount * 4, 2);
}
window.setInterval(updateExperienceEstimate, 15000);
window.setInterval(updateMoneyEstimate, 5000);
//window.setInterval(function () { mainLoop(); }, logicTickTime);
function changeEngagementRange() {
    playerStats.engagementRange = Math.ceil(Number(engagementRangeInput.value) / 5) * 5;
}
function changeRestPercentage() {
    playerStats.restToPercentage = Math.ceil(Number(restPercentageInput.value) / 5) * 5 * 0.01;
}

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
    if (!windowInFocus) return;
    ctxBuffer.clearRect(0, 0, cBuffer.width, cBuffer.height);
    switch (gameState) {
        case "InCombat":
            drawBackground();
            drawEnemies();
            drawAllies();
            drawPlayer();
            drawCharacterPortrait(ctxBuffer, player, 'l');
            if (player.target != null) {
                drawCharacterPortrait(ctxBuffer, player.target, "r");
            }
            break;
        case "InRest":
            drawBackground();
            drawPlayer();
            drawCharacterPortrait(ctxBuffer, player, 'l');
            ctxBuffer.fillStyle = "black";
            ctxBuffer.fillRect(0, cBuffer.height / 2 - 80, cBuffer.width, 140);
            ctxBuffer.font = `80px Pickle Pushing`;
            ctxBuffer.fillStyle = "white";
            ctxBuffer.textAlign = 'center';
            ctxBuffer.fillText("Resting...", cBuffer.width / 2, cBuffer.height / 2);
            ctxBuffer.font = `24px Pickle Pushing`;
            ctxBuffer.fillText("Just... give me a second...", cBuffer.width / 2, cBuffer.height / 2 + 50);
            ctxBuffer.textAlign = 'left';
            break;
        case "InDead":
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
    document.getElementById("playerExperienceText").innerHTML = format(playerStats.experience, 2) + "/" + format(playerStats.experienceToNext, 2);
    document.getElementById("playerExperienceBar").max = playerStats.experienceToNext;
    document.getElementById("playerExperienceBar").value = playerStats.experience;
    document.getElementById("playerHealthText").innerHTML = format(player.health, 3) + "/" + format(player.maxHealth, 3);
    document.getElementById("playerExperienceText").innerHTML = format(playerStats.experience, 2) + "/" + format(playerStats.experienceToNext, 2);
    document.getElementById("playerHealthBar").max = player.maxHealth;
    document.getElementById("playerHealthBar").value = player.health;
    document.getElementById("playerInitiativeText").innerHTML = format(player.initiative / 1000 / player.actionSpeed, 2) + "/" + format(player.nextMoveInitiative / 1000 / player.actionSpeed, 2) + "s";
    document.getElementById("playerInitiativeBar").max = player.nextMoveInitiative;
    document.getElementById("playerInitiativeBar").value = player.initiative;
    document.getElementById("trainingAreaName").innerHTML = "Current: " + currentTrainingArea.name;
    document.getElementById("trainingProgressBar").max = currentTrainingArea.timeToComplete;
    document.getElementById("trainingProgressBar").value = currentTrainingArea.progress;
    document.getElementById("trainingProgressBarOverview").max = currentTrainingArea.timeToComplete;
    document.getElementById("trainingProgressBarOverview").value = currentTrainingArea.progress;
    document.getElementById("classText").innerHTML = playerStats.class;
    document.getElementById("passivePointsText").innerHTML = getTotalPassivePoints() - getAvailablePassivePoints();
    document.getElementById("moneyText").innerHTML = format(playerStats.money, 2);
    document.getElementById("reputationText").innerHTML = format(playerStats.reputation, 2);
    Object.values(attribute).forEach(attributeName => {
        let baseAttributeValue = playerStats[attributeName];
        let effectiveValue = format(getEffectiveValue(attributeName), 3)
        let softCappedValue = format(formulas.softcappedAttribute(attributeIdToIndex[attributeName]), 3);
        let softCap = playerStats.attributeSoftcaps[attributeIdToIndex[attributeName]] + playerStats.permanentSoftcaps[attributeIdToIndex[attributeName]];
        let softCapText = (baseAttributeValue > softCap) ? ` ${softCappedValue}` : `${softCappedValue}`;
        if (baseAttributeValue > softCap) {
            //softCapText += `<br>(RAW: ${format(baseAttributeValue, 3)})`
            softCapText += `<br>[LIMIT: ${format(softCap, 3)}]`;
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
                    player.target = null;
                    player.nextMove = null;
                    currentArea.patrolCounter = 0;
                    if (player.health / player.maxHealth < playerStats.restToPercentage) {
                        gameState = "InRest";
                        logConsole("Resting...")
                    } else {
                        gameState = "InPatrol";
                        logConsole("Starting patrol.")
                    }
                    break;
                case 2:
                    logConsole("<span style='color: red'>Player defeated, resting.</span>")
                    gameState = "InDead";
                    player = new Player(playerStats);
                    player.health = 0;
                    break;
                default:
                    break;
            }
            break;
        case "InRest":
            player.rest();
            if (player.health >= player.maxHealth * playerStats.restToPercentage) {
                gameState = "InPatrol";
                logConsole("Starting patrol.")
            }
            break;
        case "InDead":
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
                    encounter = new Encounter(currentArea);
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
    tickTraining();
    decayAttributes();
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
    // if(side == 'l'){
    // context.fillStyle = "black";
    // context.fillRect(anchor.x, anchor.y, portraitDimensions + 2 * portraitBorder, portraitDimensions + 2 * portraitBorder);
    // context.drawImage(character.portraitImage, anchor.x + portraitBorder, anchor.y + portraitBorder, portraitDimensions, portraitDimensions);
    // }
    //Healthbar
    let hanchor = { x: 0, y: 0 };
    if (side == "r") { hanchor.x = context.canvas.width; }
    //Name
    if (side == 'l') { context.textAlign = 'center' } else { context.textAlign = 'center' }
    let nameHeight = 30;
    context.fillStyle = "rgba(0,0,0,.5)";
    context.fillRect(hanchor.x, anchor.y, mirror * 370, nameHeight + 12);
    context.font = `${nameHeight}px Pickle Pushing`;
    context.fillStyle = "white";
    context.fillText(character.name, hanchor.x + (mirror) * (360 / 2), hanchor.y + nameHeight);
    hanchor.y += nameHeight + 12;
    //MAIN BAR BACKGROUND SETUP
    let barHeight = 32;
    let barLength = 370;

    let barBorder = 4;
    context.fillStyle = "grey";
    context.beginPath();
    context.moveTo(hanchor.x, hanchor.y);
    context.lineTo(hanchor.x + mirror * barLength, hanchor.y);
    context.lineTo(hanchor.x + mirror * (barLength - barHeight), hanchor.y + barHeight);
    context.lineTo(hanchor.x, hanchor.y + barHeight);
    context.fill();
    context.fillStyle = "rgb(200, 35, 35)";
    context.beginPath();
    context.moveTo(hanchor.x + mirror * barBorder, hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength - 2 * barBorder), hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength - barHeight), hanchor.y + barHeight - barBorder);
    context.lineTo(hanchor.x + mirror * barBorder, hanchor.y + barHeight - barBorder);
    context.fill();
    let grdHealth = context.createLinearGradient(hanchor.x + mirror * 2, 0, hanchor.x + mirror * (196), 0);
    grdHealth.addColorStop(0, "rgb(21, 153, 41)");
    grdHealth.addColorStop(1, "rgb(0, 255, 38)");
    let grdShield = context.createLinearGradient(hanchor.x + mirror * 2, 0, hanchor.x + mirror * (196), 0);
    grdShield.addColorStop(0, "rgb(21, 41, 153)");
    grdShield.addColorStop(1, "rgb(0, 38, 255)");
    let grdShading = context.createLinearGradient(0, hanchor.y + 2, 0, hanchor.y + 14);
    grdShading.addColorStop(0, "rgba(255, 255, 255, .25)");
    grdShading.addColorStop(1, "rgba(0, 0, 0, .25)");
    let healthPct;
    let shieldPct;
    if (character.health + character.shield > character.maxHealth) {
        healthPct = character.health / (character.health + character.shield);
        shieldPct = character.shield / (character.health + character.shield);
    } else {
        healthPct = character.health / character.maxHealth;
        shieldPct = character.shield / character.maxHealth;
    }
    //SHIELD
    context.fillStyle = grdShield;
    context.beginPath();
    context.moveTo(hanchor.x + mirror * barBorder, hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * ((barLength - 2 * barBorder) * (healthPct + shieldPct)), hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength * (healthPct + shieldPct) - barHeight * (healthPct + shieldPct)), hanchor.y + barHeight - barBorder);
    context.lineTo(hanchor.x + mirror * barBorder, hanchor.y + barHeight - barBorder);
    context.fill();
    //HEALTH
    context.fillStyle = grdHealth;
    context.beginPath();
    context.moveTo(hanchor.x + mirror * barBorder, hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * ((barLength - 2 * barBorder) * healthPct), hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength * healthPct - barHeight * (healthPct)), hanchor.y + barHeight - barBorder);
    context.lineTo(hanchor.x + mirror * barBorder, hanchor.y + barHeight - barBorder);
    context.fill();
    //SHADING
    context.fillStyle = grdShading;
    context.beginPath();
    context.moveTo(hanchor.x + mirror * barBorder, hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * ((barLength - 2 * barBorder) * (healthPct + shieldPct)), hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength * (healthPct + shieldPct) - barHeight * (healthPct + shieldPct)), hanchor.y + barHeight - barBorder);
    context.lineTo(hanchor.x + mirror * barBorder, hanchor.y + barHeight - barBorder);
    context.fill();
    context.font = `italic bold 18px Oxanium`;
    context.fillStyle = "white";
    context.textAlign = (side == "l") ? "left" : "right";
    context.textBaseline = "middle";
    context.fillText(`${format(100 * (character.health + character.shield) / character.maxHealth, 1)}%`, hanchor.x + mirror * barBorder * 2, hanchor.y + barHeight / 2 + barBorder / 2);
    hanchor.y += barHeight - barBorder;
    //Action bar
    barLength -= 2 * barHeight;
    barBorder = 4;
    barHeight = 30;
    context.fillStyle = "grey";
    context.beginPath();
    context.moveTo(hanchor.x, hanchor.y);
    context.lineTo(hanchor.x + mirror * barLength, hanchor.y);
    context.lineTo(hanchor.x + mirror * (barLength - barHeight), hanchor.y + barHeight);
    context.lineTo(hanchor.x, hanchor.y + barHeight);
    context.fill();
    context.fillStyle = "rgb(220,220,220)";
    context.beginPath();
    context.moveTo(hanchor.x + mirror * barBorder, hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength - 2 * barBorder), hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength - barHeight), hanchor.y + barHeight - barBorder);
    context.lineTo(hanchor.x + mirror * barBorder, hanchor.y + barHeight - barBorder);
    context.fill();
    if (character.initiative == NaN) console.log("NaN error");
    let initiativePct = (character.initiative / character.nextMoveInitiative);
    let grdAction = context.createLinearGradient(hanchor.x, 0, hanchor.x + mirror * 196 * (character.initiative / (character.nextMove != null) ? character.nextMoveInitiative : character.initiative), 0);
    grdAction.addColorStop(0.5, "rgb(0,255,255)");
    grdAction.addColorStop(1, "rgb(0,110,220)");
    context.fillStyle = grdAction;
    context.beginPath();
    context.moveTo(hanchor.x + mirror * barBorder, hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * ((barLength - 2 * barBorder) * initiativePct), hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength * initiativePct - barHeight * (initiativePct)), hanchor.y + barHeight - barBorder);
    context.lineTo(hanchor.x + mirror * barBorder, hanchor.y + barHeight - barBorder);
    context.fill();
    let grdAction2 = context.createLinearGradient(0, hanchor.y + 2, 0, hanchor.y + 8);
    grdAction2.addColorStop(0, "rgba(255, 255, 255, .25)");
    grdAction2.addColorStop(1, "rgba(0, 0, 0, .25)");
    context.fillStyle = grdAction2;
    context.beginPath();
    context.moveTo(hanchor.x + mirror * barBorder, hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * ((barLength - 2 * barBorder) * initiativePct), hanchor.y + barBorder);
    context.lineTo(hanchor.x + mirror * (barLength * initiativePct - barHeight * (initiativePct)), hanchor.y + barHeight - barBorder);
    context.lineTo(hanchor.x + mirror * barBorder, hanchor.y + barHeight - barBorder);
    context.fill();
    context.font = `16px Pickle Pushing`;
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    if (character.nextMove != null) context.fillText(character.nextMove.name, hanchor.x + mirror * (barLength / 2 + barBorder - barHeight / 2), hanchor.y + barHeight / 2 + barBorder / 2);
    context.textBaseline = "alphabetic";
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
    if (gameState != "InDead") {
        gameState = "InRest";
    }
    player.target = null;
    player.nextMove = null;
}

function drawSkillIcon(context, skillname, x, y) {
    let heightAbove = 110;
    let img = new Image();
    img.src = "resources/abilityIcons/" + skillname + "Icon.png";
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
function drawAllies() {
    encounter.allyArray.forEach(ally => {
        if (ally == null) { return; }
        ally.draw(ctxBuffer);
    });
}
function mod(n, m) {
    return ((n % m) + m) % m;
}

function decayAttributes(){
    for (let index = 0; index < 4; index++) {
        const attribute = attributeIndexToId[index];
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const over = playerStats[attribute]/softcap - 1;
        if(over > 0){
            const decay = Math.min(playerStats[attribute]- softcap,
                (playerStats[attribute] - softcap) * (Math.exp(2.5*over)-1)/1000 * logicTickTime/1000);
            
            playerStats[attribute] -= decay;
            if(playerStats.areaCompletions["mafia1"] > 0) playerStats.decayedAttributes[index] += decay;
        }
    }
}
