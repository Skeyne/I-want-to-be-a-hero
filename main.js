var renderTickTime = 1000 / 15;
var logicTickTime = 1000 / 50;
var c = document.getElementById("myCanvas");
console.log(c.width + " " + c.height);
var ctx = c.getContext("2d");
var cBuffer = document.createElement('canvas');
cBuffer.width = 800;
cBuffer.height = 600;
var ctxBuffer = cBuffer.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctxBuffer.imageSmoothingEnabled = false;
var log = document.getElementById("logBox");
var audio = document.getElementById("audioSource");
var slide = document.getElementById('slide');
const tryToPlay = setInterval(() => {
    audio.play()
        .then(() => {
            clearInterval(tryToPlay);
            console.info('Successful play().');
            audio.loop = true;
            audio.muted = false;
            audio.volume = 0;
            if(playerStats.muted){
                audio.pause();
            } else{
                fadeInAudio(0.2);
            }

        })
        .catch(error => {
            console.info('User has not interacted with document yet.');
        });
}, 1000);
async function fadeInAudio(target){
    audio.play();
    playerStats.muted = false;
    let vol = audio.volume;
    while (vol < target) {
        vol += 0.005;
        audio.volume = Math.min(1,vol);
        await new Promise(resolve => {
            setTimeout(() => {
              resolve('resolved');
            }, 100);
          });  
    }
}
async function fadeOutAudio(target){
    let vol = audio.volume;
    while (vol > target) {
        vol -= 0.02;
        audio.volume = Math.max(0,vol);
        await new Promise(resolve => {
            setTimeout(() => {
              resolve('resolved');
            }, 100);
          });  
    }
    audio.pause();
    playerStats.muted = true;
}
function toggleMusic(){
    if (audio.paused) {
        fadeInAudio(0.2);
    } else {
        fadeOutAudio(0);
    }
}
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
        return d;
    }
    onDeath(){
        return;
    }
    tick() {
        if (this.health <= 0) {
            this.onDeath();
            return false;
        } else {
            this.health = Math.min(this.health + this.maxHealth * this.data.healthRegen * logicTickTime/1000, this.maxHealth);
        }
        if (this.nextMove != null) {
            this.initiative += 1000 * logicTickTime / 1000;
        } else {
            this.think();
        }
        if (this.initiative >= this.nextMoveInitiative) {
            this.initiative -= this.nextMoveInitiative;
            this.act(this.target);
            this.think();
        }
        return true;
    }
    act(target) {
        if (target == null) {
            return;
        }
        switch (this.nextMove.type) {
            case 0:
                if (target.distance <= this.nextMove.range) {
                    let d = this.nextMove.damage
                        + this.nextMove.damageRatios[0] * playerStats.strength
                        + this.nextMove.damageRatios[1] * playerStats.toughness
                        + this.nextMove.damageRatios[2] * playerStats.mind
                        + this.nextMove.damageRatios[3] * playerStats.agility;
                    console.log(d);
                    target.takeDamage(d);
                    logConsole(`${this.name} hit with ${document.getElementById("playerMoveText").innerHTML} for ${d} damage.`);
                } else {
                    return;
                }
                break;
            case 1:
                this.target.distance -= Math.min(100 - target.distance, this.nextMove.range);
                logConsole(`${this.name} used Move.`)
                break;

            default:
                logConsole("ERROR: Not a valid move type");
                break;
        }
    }
    think() {
        if (this.target == null) {
            document.getElementById("playerMoveText").innerHTML = "No target";
            return;
        }
        let dist = this.target.distance;
        let weights = [];
        let i = 0;
        for (let k in playerMoves) {
            if (playerMoves[k].type == 0) {
                weights[i] = (playerMoves[k].range > dist ? 100 : 0);
            }
            if (playerMoves[k].type == 1) {
                weights[i] = (dist < 50 ? 100 : 0);
            }
        }
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
        let moveKey = Object.keys(playerMoves)[indexes[pick]];
        this.nextMove = playerMoves[moveKey];
        this.nextMoveInitiative = this.nextMove.time;
        document.getElementById("playerMoveText").innerHTML = moveKey;
    }
    draw(context) {
        return;
    }
}
var portraitImage = new Image();
var crimImage = new Image();
portraitImage.src = "onePortrait.PNG";
crimImage.src = "crimPortrait.PNG";
var environmentDistance = 0;
class Player extends CombatEntity {
    constructor(data) {
        super();
        this.data = data;
        this.name = "Saitama?";
        this.maxHealth = 10 + data.toughness;
        this.health = this.maxHealth;
        this.image = new Image(32, 32);
        this.image.src = "one.png";
        this.damageReduction = formulas.damageReduction(data.toughness);
        this.actionSpeed = formulas.actionSpeed(data.agility);
        this.moveIntention = 1;
    }

    act(target) {
        if (target == null) {
            return;
        }
        switch (this.nextMove.type) {
            case 0:
                if (target.distance <= this.nextMove.range) {
                    let d = this.nextMove.damage
                        + Math.sqrt(this.nextMove.damageRatios[0] * this.data.strength+1) -1
                        + Math.sqrt(this.nextMove.damageRatios[1] * this.data.toughness+1) -1
                        + Math.sqrt(this.nextMove.damageRatios[2] * this.data.mind + 1) -1
                        + Math.sqrt(this.nextMove.damageRatios[3] * this.data.agility + 1) -1;
                    d = d * (this.nextMove.damageRange[0] + Math.random()*(this.nextMove.damageRange[1] - this.nextMove.damageRange[0]));
                    let dr = target.takeDamage(d);
                    logConsole(`Player hit with ${document.getElementById("playerMoveText").innerHTML} for ${format(dr)}(${format(d)}) damage.`);
                } else {
                    return;
                }
                break;
            case 1:
                let deltaMinus = Math.min(100 - target.distance, this.nextMove.range);
                let deltaPlus = Math.min(target.distance - 5, this.nextMove.range);
                if (this.moveIntention > 0) {
                    this.target.distance -= deltaPlus;
                    environmentDistance -= deltaPlus;
                } else {
                    this.target.distance += deltaMinus;
                    environmentDistance += deltaMinus;
                }

                logConsole("Player used Move.")
                break;

            default:
                logConsole("ERROR: Not a valid move type");
                break;
        }
    }
    think() {
        if (this.target == null) {
            document.getElementById("playerMoveText").innerHTML = "No target";
            return;
        }
        let dist = this.target.distance;
        if (dist > 10) this.moveIntention = 1; else this.moveIntention = -1;
        let weights = [];
        let i = 0;
        for (let k in playerMoves) {
            if (playerMoves[k].type == 0) {
                weights[i] = (playerMoves[k].range >= dist ? 100 : 0);
            }
            if (playerMoves[k].type == 1) {
                weights[i] = (dist < 10 ? 50 : 100);
            }
            i++;
        }
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
        let moveKey = Object.keys(playerMoves)[indexes[pick]];
        this.nextMove = playerMoves[moveKey];
        this.nextMoveInitiative = this.nextMove.time;
        document.getElementById("playerMoveText").innerHTML = moveKey;

    }

    draw(context) {
        let canvasX = scaleDistance(this.distance);
        let canvasY = cBuffer.height - 30;
        context.drawImage(this.image, canvasX - 128 / 2, canvasY - 128, 128, 128);
        drawSkillIcon(context, this.nextMove.name, canvasX, canvasY);
    }
}
class Enemy extends CombatEntity {
    constructor(enemyData, distance) {
        super();
        this.data = enemyData
        this.maxHealth = enemyData.maxHealth;
        this.health = this.maxHealth
        this.damageReduction = formulas.damageReduction(enemyData.attributes[1]);
        this.actionSpeed = formulas.actionSpeed(enemyData.attributes[3]);
        this.distance = distance;
        this.name = enemyData.name;
        this.image = new Image(32, 32);
        this.image.src = enemyData.spriteFile;
    }
    act(target) {
        if (target == null) {
            return;
        }
        switch (this.nextMove.type) {
            case 0:
                if (this.distance <= this.nextMove.range) {
                    let d = this.nextMove.baseDamage
                    + Math.sqrt(this.nextMove.damageRatios[0] * this.data.attributes[0] + 1) -1
                    + Math.sqrt(this.nextMove.damageRatios[1] * this.data.attributes[1] + 1) -1
                    + Math.sqrt(this.nextMove.damageRatios[2] * this.data.attributes[2] + 1) -1
                    + Math.sqrt(this.nextMove.damageRatios[3] * this.data.attributes[3] + 1) -1;
                    let dr = target.takeDamage(d);
                    logConsole(`${this.name} hit with ${this.nextMove.name} for ${format(dr)}(${format(d)}) damage.`);
                } else {
                    return;
                }
                break;
            case 1:
                this.distance -= Math.min(this.distance - 5, this.nextMove.range);
                logConsole(`${this.name} used ${this.nextMove.name}`)
                break;
            default:
                logConsole("ERROR: Not a valid move type");
                break;
        }
    }
    think() {
        if (this.target == null) {
            document.getElementById("enemyMoveText").innerHTML = "No target";
            return;
        }
        let dist = this.distance;
        let weights = [];
        let i = 0;
        for (let k in this.data.moves) {
            if (this.data.moves[k].type == 0) {
                weights[i] = (this.data.moves[k].range >= dist ? 100 : 0);
            }
            if (this.data.moves[k].type == 1) {
                weights[i] = (dist > 5 ? 100 : 0);
            }
            i++;
        }
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
        this.nextMove = this.data.moves[moveKey];
        this.nextMoveInitiative = this.nextMove.time;
    }
    draw(context) {
        let canvasX = scaleDistance(this.distance);
        let canvasY = cBuffer.height - 30;

        context.drawImage(this.image, canvasX - 128 / 2, canvasY - 128, 128, 128);
        drawInfoBars(context, this, canvasX, canvasY);
        drawSkillIcon(context, this.nextMove.name, canvasX, canvasY);
    }
    onDeath(){
        addPlayerExp(this.data.expReward);
    }
}
class Encounter {
    constructor(p,enemyNum) {
        this.enemyArray = [];
        this.enemiesToSpawn = enemyNum;
        let lastHealth = player.health
        player = new Player(playerStats);
        if(lastHealth > 0){ player.health = lastHealth;}
        let enemies = Object.keys(enemyData);
        for (let index = 0; index < this.enemiesToSpawn; index++) {
            let picked = Math.floor(Math.random() * enemies.length);
            this.enemyArray.push(new Enemy(enemyData[enemies[picked]], Math.random() * 30 + 70));
            this.enemyArray[index].setTarget(p);
        }
        player.setTarget(this.enemyArray[0]);
    }

    isActive() {
        if (player.health <= 0) { return false; }
        for (let index = 0; index < this.enemyArray.length; index++) {
            if (this.enemyArray[index] != null) { return true; }
        }
        return false;
    }
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
function mod(n, m) {
    return ((n % m) + m) % m;
}
var player = new Player(playerStats);
var encounter = new Encounter(player,1);
var buildingHeights = [0.4, 0.5, 0.3, 0.5, 0.9, 0.3, 0.8, 0.2];
var bgImage = new Image();
ticker = window.setInterval(function () { renderLoop(); }, renderTickTime);
window.setInterval(function () { logicLoop(); }, logicTickTime);    
bgImage.src = "cyberpunk-street.png";
function renderLoop() {
    //Clear frame
    ctxBuffer.clearRect(0, 0, cBuffer.width, cBuffer.height);
    //Background
    let scrollFactor = cBuffer.height / cBuffer.width * bgImage.width / bgImage.height;
    let environmentScrollBase = (mod(environmentDistance, (100 * scrollFactor))) / 100;
    //console.log(environmentScrollBase+" "+scrollFactor);
    ctxBuffer.drawImage(bgImage, environmentScrollBase * cBuffer.width, 0, cBuffer.height / bgImage.height * bgImage.width, cBuffer.height);
    ctxBuffer.drawImage(bgImage, (environmentScrollBase - 1 * scrollFactor) * cBuffer.width, 0, cBuffer.height / bgImage.height * bgImage.width, cBuffer.height);
    //Draw combatants
    player.draw(ctxBuffer);
    encounter.enemyArray.forEach(enemy => {
        if (enemy == null) { return; }
        enemy.draw(ctxBuffer);
    });

    drawCharacterPortrait(ctxBuffer,portraitImage,player,'l');
    if (player.target != null) {

        drawCharacterPortrait(ctxBuffer,crimImage,player.target,"r");
    }
    //Draw to render canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    c.height = c.clientHeight;
    c.width = c.clientWidth;
    //console.log("Buffer dimension:"+ cBuffer.width + " " + cBuffer.height + "\n"+ "Canvas dimensions" + c.width + " " + c.height);
    ctx.scale(c.height/cBuffer.height,c.height/cBuffer.height);
    ctx.drawImage(cBuffer,0,0);
    //Update html values
    document.getElementById("playerLevelText").innerHTML = "LEVEL " +playerStats.level;
    document.getElementById("playerExperienceText").innerHTML = format(playerStats.experience) + "/" + playerStats.experienceToNext;
    document.getElementById("playerExperienceBar").max = playerStats.experienceToNext;
    document.getElementById("playerExperienceBar").value = playerStats.experience;
    document.getElementById("playerHealthText").innerHTML = format(player.health) + "/" + format(player.maxHealth);
    document.getElementById("playerExperienceText").innerHTML = format(playerStats.experience) + "/" + format(playerStats.experienceToNext);
    document.getElementById("playerMaxHealthDisplay").innerHTML = format(player.maxHealth);
    document.getElementById("playerHealthBar").max = player.maxHealth;
    document.getElementById("playerHealthBar").value = player.health;
    document.getElementById("playerInitiativeText").innerHTML = format(player.initiative/1000/player.actionSpeed) + "/" + format(player.nextMoveInitiative/1000/player.actionSpeed) +"s";
    document.getElementById("playerInitiativeBar").max = player.nextMoveInitiative;
    document.getElementById("playerInitiativeBar").value = player.initiative;
    document.getElementById("trainingAreaName").innerHTML = "Training at: " + currentTrainingArea.name;
    document.getElementById("trainingProgressBar").max = currentTrainingArea.timeToComplete;
    document.getElementById("trainingProgressBar").value = currentTrainingArea.progress;
    Object.values(attribute).forEach(attributeName => {
        document.getElementById(attributeName+"Text").innerHTML = format(playerStats[attributeName]);
    });
}
function logicLoop() {
    if (!encounter.isActive()) {
        logConsole("Encounter finished, resetting.")
        encounter = new Encounter(player,1);
    }
    player.tick();
    for (let index = 0; index < encounter.enemyArray.length; index++) {
        let e = encounter.enemyArray[index];
        if (e == null) { continue; }
        let active = e.tick();
        if (!active) {
            encounter.enemyArray[index] = null;
        }

    }
    //console.log(encounter.enemyArray);
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
function drawCharacterPortrait(context,image,character,side){

    let anchor = {x:0,y:0};
    let portraitDimensions = 120;
    let portraitBorder = 4;
    let mirror = 1;
    if(side == "r"){anchor.x = context.canvas.width-portraitDimensions-2*portraitBorder; anchor.y = 0; mirror = -1;}
    //Portrait Image
    context.fillStyle = "black";
    context.fillRect(anchor.x, anchor.y, portraitDimensions + 2*portraitBorder, portraitDimensions + 2*portraitBorder);
    context.drawImage(image, anchor.x+portraitBorder, anchor.y+portraitBorder, portraitDimensions, portraitDimensions);
    //Healthbar
    let hanchor = {x:portraitDimensions+2*portraitBorder,y:0};
    if(side == "r"){hanchor.x = context.canvas.width-portraitDimensions-2*portraitBorder;}
    //Name
    let nameHeight = 30;    
    context.fillRect(hanchor.x, anchor.y, mirror*200, nameHeight+12);
    context.font = `${nameHeight}px Pickle Pushing`;
    context.fillStyle = "white";
    context.fillText(character.name, hanchor.x + (mirror-1) * 98,hanchor.y + nameHeight);
    hanchor.y += nameHeight+12;
    context.fillStyle = "grey";
    context.fillRect(hanchor.x, hanchor.y, mirror*200, 16);
    context.fillStyle = "red";
    context.fillRect(hanchor.x+4*mirror, hanchor.y+2, mirror*192, 12);
    let grdHealth = context.createLinearGradient(hanchor.x+mirror*4, 0, hanchor.x+mirror*(4+192), 0);
    grdHealth.addColorStop(0, "rgb(0,255,0)");
    grdHealth.addColorStop(0.25, "rgb(0,180,0)");
    grdHealth.addColorStop(0.75, "rgb(0,180,0)");
    grdHealth.addColorStop(1, "rgb(0,255,0)");
    context.fillStyle = grdHealth;
    context.fillRect(hanchor.x+4*mirror, hanchor.y+2, mirror * 192 * (character.health / character.maxHealth), 12);
    hanchor.y += 20;
    //Action bar
    context.fillStyle = "grey";
    context.fillRect(hanchor.x, hanchor.y, mirror*200, 8);
    context.fillStyle = "white";
    context.fillRect(hanchor.x+mirror*4, hanchor.y+2, mirror*192, 6);
    let grdAction = context.createLinearGradient(hanchor.x, 0, hanchor.x + mirror * 192 * (character.initiative / character.nextMoveInitiative), 0);
    grdAction.addColorStop(0.5, "rgb(0,255,255)");
    grdAction.addColorStop(1, "rgb(0,110,220)");
    context.fillStyle = grdAction;
    context.fillRect(hanchor.x+mirror*4, hanchor.y+2,mirror* 192 * (character.initiative / character.nextMoveInitiative), 6);
    hanchor.y += 8;
    //EXP bar   
    if (side == "l") {
            context.fillStyle = "grey";
    context.fillRect(hanchor.x, hanchor.y, 200, 6);
    context.fillStyle = "white";
    context.fillRect(hanchor.x+4, hanchor.y+2, 192, 2);
    let grdExp = context.createLinearGradient(132, 0, 132 + 192 * (playerStats.experience / playerStats.experienceToNext), 0);
    grdExp.addColorStop(0.5, "rgb(255,0,255)");
    grdExp.addColorStop(1, "rgb(200,0,200)");
    context.fillStyle = grdExp;
    context.fillRect(hanchor.x+4,hanchor.y+2, 192 * (playerStats.experience / playerStats.experienceToNext) , 2);
    }

}
function format(number){
    return Math.round((number+Number.EPSILON)*100)/100;
}