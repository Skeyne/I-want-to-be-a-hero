class CombatProperties {
    constructor(data) {
        this.maxHealth = 0;
        this.health = 0;
        this.strength = 0;
        this.toughness = 0;
        this.mind = 0;
        this.agility = 0;
        this.criticalChance = 0;
        this.cooldownReduction = 0;
        this.cooldownSpeed = 1;
        this.dodgeChance = 0;
        this.lifesteal = 0;
        this.damageDealt = 0;
        this.damageReduction = 0;
        this.damageTaken = 0;
        this.healthRegeneration = 0;
        this.repeat = 0;
        this.actionSpeed = 1;
    }
    init(data) {
        Object.keys(data).forEach((prop) => {
            if (this.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        })
    }
}
class CombatEntity {
    constructor() {
        this.maxHealth = 0;
        this.health = 0;
        this.distance = 0;
        this.initiative = 0;
        this.interrupt = 0;
        this.nextMove = null;
        this.nextMoveInitiative = 0;
        this.damageReduction = 0;
        this.damageTaken = 0;
        this.cooldownSpeed = 1;
        this.target = null;
        this.spriteSize = { x: 32, y: 32 }
        this.actionSpeed = 1;
        this.buffEffects = {};
        this.combatState = new CombatProperties(this);
    }
    addBuff(id, skill) {
        this.buffEffects[id] = { duration: skill.duration, effects: skill.effects };
        Object.keys(skill.effects).forEach((prop) => {
            this.updateCombatProperty(prop);
        })
    }
    removeBuff(id) {
        let effects = this.buffEffects[id].effects;
        this.buffEffects[id] = null;
        Object.keys(effects).forEach((prop) => {
            this.updateCombatProperty(prop);
        })
    }
    updateCombatProperty(propertyName) {
        //console.log(propertyName);
        //console.log(this.combatState?.[propertyName]);
        if (this.combatState[propertyName] != undefined) {
            let mults = [];
            let pcts = [];
            let flats = [];
            Object.values(this.buffEffects).forEach((buff) => {
                if (buff == null) return;
                Object.keys(buff.effects).forEach((effectTarget) => {
                    if (effectTarget == propertyName) {
                        //type of effect, percent or mult
                        switch (buff.effects[propertyName][0]) {
                            case "mult":
                                mults.push(buff.effects[propertyName][1]);
                                break;
                            case "percent":
                                pcts.push(buff.effects[propertyName][1]);
                                break;
                            case "flat":
                                flats.push(buff.effects[propertyName][1]);
                                break;
                            default:
                                console.error("Not a valid effect type for buff");
                                break;
                        }
                    } else {
                        return;
                    }
                })
            })
            this.combatState[propertyName] = ((this[propertyName] ? this[propertyName] : 0) + arraySum(flats)) * (1 + arraySum(pcts)) * arrayMult(mults);
        } else {
            console.error("Not a valid CombatProperty");
        }
    }
    setTarget(target) {
        this.target = target;
    }
    takeDamage(amount) {
        let d = Math.max(0, amount * this.damageReduction); //- this.flatReduction);
        if (this.shield > 0) {
            if (d >= this.shield) {
                d -= this.shield;
                this.shield = 0;
            } else {
                this.shield -= d;
                d = 0;
            }
        }
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
            this.health = Math.min(this.health + this.maxHealth * this.combatState.healthRegeneration * logicTickTime / 1000, this.maxHealth);
        }
        if (this.target == null || this.target?.health <= 0) {
            this.think();
        }
        if (this.nextMove != null) {
            let tickTime = logicTickTime;
            if (this.interrupt > 0) {
                this.interrupt -= tickTime;
                this.initiative += 0.25 * 1000 * tickTime / 1000 * this.combatState.actionSpeed;
            } else {
                this.initiative += 1000 * tickTime / 1000 * this.combatState.actionSpeed;
            }

        } else {
            this.think();
        }
        this.tickCooldowns();
        this.tickBuffs();
        if (this.initiative >= this.nextMoveInitiative) {
            this.initiative -= this.nextMoveInitiative;
            if (this.act(this.target)) { this.think() };
        }
        return true;
    }
    tickCooldowns() {
        console.error("Do not use CombatEntity directly.");
    }
    tickBuffs() {
        Object.keys(this.buffEffects).forEach((id) => {
            if (this.buffEffects[id] == null) return;
            this.buffEffects[id].duration -= logicTickTime;
            //console.log(this.buffEffects[id].duration);
            if (this.buffEffects[id].duration <= 0) {
                //console.warn("REMOVING BUFF");
                this.removeBuff(id);
            }
        })
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
class Ally extends CombatEntity {
    constructor(data, attributeRatios) {
        super();
        this.data = data;
        this.name = data.name;
        this.offset = 5 * (Math.random() - 0.5)
        //ATTRIBUTES
        this.strength = attributeRatios[0] * getEffectiveValue("strength");
        this.toughness = attributeRatios[1] * getEffectiveValue("toughness");
        this.mind = attributeRatios[2] * getEffectiveValue("mind");
        this.agility = attributeRatios[3] * getEffectiveValue("agility");
        this.maxHealth = PLAYER_BASE_HEALTH + formulas.maxHealth(getEffectiveValue("toughness"));
        this.health = this.maxHealth;
        this.shield = 0;
        this.image = new Image(32, 32);
        this.image.src = "resources/characterSprites/" + this.data.spriteFile;
        this.damageReduction = formulas.damageReduction(getEffectiveValue("strength"));
        this.damageTaken = getSecondaryAttribute("damageTaken");
        this.actionSpeed = formulas.actionSpeed(getEffectiveValue("agility"));
        this.actionSpeed *= getSecondaryAttribute("actionSpeed");
        this.powerMultiplier = getSecondaryAttribute("powerMultiplier");
        this.damageDealt = getSecondaryAttribute("damageDealt");
        this.healthRegeneration = getSecondaryAttribute("healthRegeneration");
        this.criticalChance = getSecondaryAttribute("criticalChance");
        this.overwhelm = getSecondaryAttribute("overwhelm");
        this.takedown = getSecondaryAttribute("takedown");
        this.dodgeChance = getSecondaryAttribute("dodgeChance");
        this.cooldownReduction = formulas.cooldownReduction(getEffectiveValue("mind"));
        this.cooldownReduction /= getSecondaryAttribute("cooldownReduction");
        Object.keys(data.modifiers).forEach((prop) => {
            if (this.hasOwnProperty(prop)) {
                this[prop] *= data.modifiers[prop];
            }
        })
        this.moveIntention = 1;
        this.nextMoveKey = null;
        this.abilityCooldowns = {};
        this.equippedAbilities = data.moves;
        this.equippedAbilities.forEach(ability => {
            if (ability != null) {
                if (!this.abilityCooldowns.hasOwnProperty(ability)) {
                    this.abilityCooldowns[ability] = 0;
                }
            }
        });
        this.combatState.init(this);
        this.startTime = Date.now();

    }
    tickCooldowns() {
        this.data.moves.forEach(ability => {
            this.abilityCooldowns[ability] -= logicTickTime * this.combatState.cooldownSpeed;
        });
    }
    act(target) {
        if (target == null) {
            this.think();
        }
        if (target.health < 0) {
            this.target = null;
            this.think();
            return;
        }
        let dist = Math.abs(target.distance - this.distance);
        let repeat = false;
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
                if (this.nextMove.hasOwnProperty("effects")) {
                    if (this.nextMove.effects.hasOwnProperty("rush")) {
                        if (this.moveIntention >= 0) {
                            let deltaPlus = Math.min(Math.abs(dist - 5), this.nextMove.range[0]);
                            this.distance += deltaPlus;
                        }
                    }
                }
                if (inRange) {

                    let moveTakedown = this.takedown;
                    let moveOverwhelm = this.overwhelm;
                    let moveCritChance = this.criticalChance;
                    let moveLifesteal = 0;
                    let moveStun = 0;
                    if (this.nextMove.hasOwnProperty("effects")) {
                        Object.keys(this.nextMove.effects).forEach(effect => {
                            switch (effect) {
                                case "stun":
                                    moveStun += this.nextMove.effects[effect];
                                    break;
                                case "lifesteal":
                                    moveLifesteal += this.nextMove.effects[effect];
                                    break;
                                case "criticalChance":
                                    moveCritChance += this.nextMove.effects[effect];
                                    break;
                                case "takedown":
                                    moveTakedown += this.nextMove.effects[effect];
                                    break;
                                case "overwhelm":
                                    moveOverwhelm += this.nextMove.effects[effect];
                                    break;
                                case "repeat":
                                    if (Math.random() < this.nextMove.effects[effect]) {
                                        repeat = true;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        });
                    }
                    let isCrit = (Math.random() < moveCritChance);
                    let d1 = formulas.attackPower(this.nextMove.damageRatios, this.combatState);
                    d1 = d1 * (this.nextMove.damageRange[0] + Math.random() * (this.nextMove.damageRange[1] - this.nextMove.damageRange[0]));
                    let d2 = (isCrit ? 1.5 : 1) * d1;
                    let d3 = d2 * this.combatState.damageDealt;
                    let df = d3 * (1 + target.health / target.maxHealth * moveOverwhelm) * (1 + (1 - target.health / target.maxHealth) * moveTakedown);

                    if (this.nextMove.hasOwnProperty("effects")) {
                        Object.keys(this.nextMove.effects).forEach(effect => {
                            switch (effect) {
                                case "stun":
                                    target.interrupt += moveStun * 1000;
                                case "repeat":
                                    break;
                                case "takedown":
                                    break;
                                case "knockback":
                                    target.distance += this.nextMove.effects[effect];
                                    break;
                                case "pull":
                                    target.distance = Math.max(5, target.distance - this.nextMove.effects[effect]);
                                    break;
                                case "aoe":
                                    encounter.enemyArray.forEach(enemy => {
                                        if (enemy == null) return;
                                        if (enemy == target) return;
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
                                        if (Math.abs(originDistance - enemy.distance) <= this.nextMove.effects[effect]) {
                                            if (this.nextMove.effects.hasOwnProperty("knockback")) {
                                                enemy.distance += this.nextMove.effects['knockback'];
                                            }
                                            if (moveStun > 0) {
                                                enemy.interrupt += moveStun * 1000;
                                            }
                                            let { died: killingBlow, d: dr } = enemy.takeDamage(df);
                                            logConsole(`${this.name} <span style="color:red">${isCrit ? "critically " : ""}</span>hit ${this.target.name} with <span style="color:white">${playerMoves[this.nextMoveKey].name}</span> for <span style="color:white">${format(dr, 2)}</span>(${format(df, 2)}) damage.`);
                                        }
                                    })
                                    break;

                                default:
                                    break;
                            }
                        });
                    }

                    let { died: killingBlow, d: dr } = target.takeDamage(df);
                    logConsole(`${this.name} <span style="color:red">${isCrit ? "critically " : ""}</span>hit ${this.target.name} with <span style="color:white">${playerMoves[this.nextMoveKey].name}</span> for <span style="color:white">${format(dr, 2)}</span>(${format(d3, 2)}) damage.`);
                    if (this.combatState.lifesteal + moveLifesteal > 0) { this.health = Math.min(this.health + dr * (this.combatState.lifesteal + moveLifesteal), this.maxHealth); logConsole(`${this.name} healed for ${format(dr * (this.combatState.lifesteal + moveLifesteal), 2)}`); }
                    if (killingBlow) this.target = null;
                }

                break;
            case 1:
                let deltaMinus = Math.min(Math.min(Math.abs(this.distance - dist), this.data.engagementRange), this.nextMove.range[1]);
                let deltaPlus = Math.min(Math.abs(dist - this.data.engagementRange), this.nextMove.range[0]);
                if (this.moveIntention > 0) {
                    this.distance += deltaPlus;
                } else {
                    this.distance -= deltaMinus;
                }
                break;
            case 2:
                if (this.nextMove.hasOwnProperty("effects")) {
                    Object.keys(this.nextMove.effects).forEach(effect => {
                        let amount;
                        switch (effect) {
                            case "heal":
                                amount = this.maxHealth * this.nextMove.effects.heal
                                    + formulas.healPower(this.nextMove.ratios, this.combatState);
                                if (this.nextMove.effects.hasOwnProperty("hope")) { amount *= (1 + (1 - this.health / this.maxHealth) * this.nextMove.effects.hope); }
                                this.health = Math.min(this.health + amount, this.maxHealth);
                                logConsole(`${this.name} healed for ${format(amount, 2)}`);
                                break;
                            case "shield":
                                amount = formulas.healPower(this.nextMove.ratios, this.combatState);
                                if (this.nextMove.effects.hasOwnProperty("closeCombat")) {
                                    if (dist <= 5) amount *= 1 + this.nextMove.effects.closeCombat;
                                }
                                if (amount > this.shield) {
                                    this.shield = amount;
                                    logConsole(`${this.name} shielded for ${format(amount, 2)} from ${this.nextMove.name}`);
                                }
                                break;
                            default:
                                break;
                        }
                    });
                }
                break;
            case 3:
                this.addBuff(this.nextMoveKey, this.nextMove);
                break;

            default:
                logConsole("ERROR: Not a valid move type");
                break;
        }
        if (Date.now() - this.startTime > this.data.duration) {
            this.maxHealth = -1;
        }
        if (repeat) {
            if (target.health <= 0 || target == null) {
                return true;
            } else {
                return false;
            }

        } else {
            this.abilityCooldowns[this.nextMoveKey] = this.nextMove.cooldownTime * this.cooldownReduction;
            return true;
        }
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
                        if (Math.abs(enemy.distance - this.distance) < distance) {
                            distance = Math.abs(enemy.distance - this.distance);
                            closest = index;
                        }

                    }
                    if (closest != -1) { this.target = encounter.enemyArray[closest]; }
                    else {
                        return;
                    }
                    break;
                default:
                    return;
                    break;
            }

        }
        let dist = Math.abs(this.target.distance - this.distance);
        let distSign = this.target.distance - this.distance;
        if (distSign > 0) { this.moveIntention = 1; }
        else if (distSign < 0) { this.moveIntention = -1; }
        else { this.moveIntention = 0; }
        if (dist <= this.engagementRange) { this.moveIntention = 0 }
        let weights = Array(this.equippedAbilities.length).fill(0);
        for (let index = 0; index < this.equippedAbilities.length; index++) {
            let k = this.equippedAbilities[index];
            let ability = playerMoves[k];
            if (k == null) { weights[index] = -1; continue; }
            if (this.abilityCooldowns[k] > 0) { weights[index] = -1; continue; }
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
                if (ability.hasOwnProperty("effects")) {
                    if (ability.effects.hasOwnProperty('pull')) {
                        if (this.target.distance > 5) { weights[index] *= 10; }
                    }
                }
            }
            if (ability.type == 1) {
                let delta = dist * this.moveIntention;
                weights[index] = delta * this.moveIntention * (this.moveIntention > 0 ? ability.range[0] / 100 : ability.range[1]);
            }
            if (ability.type == 2) {
                if (ability.hasOwnProperty("effects")) {
                    if (ability.effects.hasOwnProperty('heal')) {
                        let amount = this.maxHealth * ability.effects.heal
                            + formulas.healPower(ability.damageRatios, this.combatState);
                        if (this.maxHealth - this.health > amount) {
                            weights[index] = 100;
                        }
                    }
                    if (ability.effects.hasOwnProperty('shield')) {
                        let amount = ability.damage
                            + formulas.healPower(ability.damageRatios, this.combatState);
                        if (this.shield <= 0.2 * amount) {
                            weights[index] = 100;
                        }
                    }
                }
            }
            if (ability.type == 3) {
                if (this.moveIntention == 0) { weights[index] = 100; }
            }
        }
        const max = Math.max(...weights);
        let indexes = [];
        let moveKey;
        if (max > 0) {
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
            moveKey = this.equippedAbilities[indexes[pick]];
        }
        if (moveKey == undefined) moveKey = 'wait';
        this.nextMove = playerMoves[moveKey];
        this.nextMoveKey = moveKey;
        this.nextMoveInitiative = this.nextMove.time;

    }

    draw(context) {
        let canvasX = scaleDistance(this.distance + this.offset);
        let canvasY = cBuffer.height - 40;
        context.drawImage(this.image, canvasX - 128 / 2, canvasY - 128, 128, 128);
        drawInfoBars(context, this, canvasX, canvasY);
        if (this.nextMove != null) drawSkillIcon(context, this.nextMove.iconName, canvasX, canvasY);
    }
    rest() {
        let restRate = 0;
        switch (gameState) {
            case 'InRest':
                restRate = this.data.restRate / 2;
                break;
            case 'InDead':
                restRate = this.data.restRate;
                break;
            default:
                console.error('UNRECOGNIZED GAME STATE FOR rest()');
                break;
        }
        this.health = Math.min(this.health + this.maxHealth * restRate * logicTickTime / 1000, this.maxHealth);
    }
    takeDamage(amount) {
        let d = Math.max(0, amount * this.combatState.damageReduction * this.combatState.damageTaken - this.flatReduction);
        if (this.dodgeChance > Math.random()) {
            logConsole(`${this.name} dodged ${format(amount, 2)} damage!`)
            return 0;
        }
        if (this.shield > 0) {
            if (d >= this.shield) {
                d -= this.shield;
                this.shield = 0;
            } else {
                this.shield -= d;
                d = 0;
            }
        }
        this.health -= d;
        return d;
    }
}
class Player extends CombatEntity {
    constructor(data) {
        super();
        this.data = data;
        this.patrolSpeed = getFameEffect("patrolSpeed");
        this.name = "Hero";
        //ATTRIBUTES
        this.strength = getEffectiveValue("strength");
        this.toughness = getEffectiveValue("toughness");
        this.mind = getEffectiveValue("mind");
        this.agility = getEffectiveValue("agility");
        this.maxHealth = PLAYER_BASE_HEALTH + formulas.maxHealth(getEffectiveValue("toughness"));
        this.maxHealth *= getSecondaryAttribute("maxHP");
        this.health = this.maxHealth;
        this.shield = 0;
        this.flatReduction = formulas.flatReduction(this);
        this.image = new Image(32, 32);
        this.image.src = "resources/characterSprites/" + PLAYER_SPRITES[playerStats.class];
        this.portraitImage = new Image();
        this.portraitImage.src = "resources/misc/joePortrait.png";
        this.damageReduction = formulas.damageReduction(getEffectiveValue("strength"));
        this.damageTaken = getSecondaryAttribute("damageTaken");
        this.actionSpeed = formulas.actionSpeed(getEffectiveValue("agility"));
        this.actionSpeed *= getSecondaryAttribute("actionSpeed");
        this.powerMultiplier = getSecondaryAttribute("powerMultiplier");
        this.damageDealt = getSecondaryAttribute("damageDealt");
        this.healthRegeneration = getSecondaryAttribute("healthRegeneration");
        this.criticalChance = getSecondaryAttribute("criticalChance");
        this.lifesteal = getSecondaryAttribute("lifesteal");
        this.overwhelm = getSecondaryAttribute("overwhelm");
        this.takedown = getSecondaryAttribute("takedown");
        this.dodgeChance = getSecondaryAttribute("dodgeChance");
        this.cooldownReduction = formulas.cooldownReduction(getEffectiveValue("mind"));
        this.cooldownReduction /= getSecondaryAttribute("cooldownReduction");
        this.moveIntention = 1;
        this.nextMoveKey = null;
        this.equippedAbilities = [...playerStats.equippedAbilities];
        this.repeatDict = {};
        this.equippedAbilities.forEach(ability => {
            if (ability != null) {
                if (!playerStats.abilityCooldowns.hasOwnProperty(ability)) {
                    playerStats.abilityCooldowns[ability] = 0;
                }
                if (!this.repeatDict.hasOwnProperty(ability)) {
                    this.repeatDict[ability] = 0;
                }
            }
        });
        this.combatState.init(this);

    }
    tickCooldowns() {
        playerStats.equippedAbilities.forEach(ability => {
            playerStats.abilityCooldowns[ability] -= logicTickTime * this.combatState.cooldownSpeed;
        });
    }
    act(target) {
        if (this.target?.health < 0) {
            this.target = null;
            return;
        }
        if (target == null) {
            return;
        }
        let dist = target.distance;
        let repeat = false;
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
                if (this.nextMove.hasOwnProperty("effects")) {
                    if (this.nextMove.effects.hasOwnProperty("rush")) {
                        if (this.moveIntention >= 0) {
                            let deltaPlus = Math.min(Math.abs(dist - 5), this.nextMove.range[0]);
                            encounter.enemyArray.forEach((enemy) => { if (enemy != null) enemy.distance = Math.max(5, enemy.distance - deltaPlus); })
                            environmentDistance -= deltaPlus;
                        }
                    }
                }
                if (inRange) {

                    let moveTakedown = this.takedown;
                    let moveOverwhelm = this.overwhelm;
                    let moveCritChance = this.criticalChance;
                    let moveLifesteal = 0;
                    let moveStun = 0;
                    if (this.nextMove.hasOwnProperty("effects")) {
                        Object.keys(this.nextMove.effects).forEach(effect => {
                            switch (effect) {
                                case "stun":
                                    moveStun += this.nextMove.effects[effect];
                                    break;
                                case "lifesteal":
                                    moveLifesteal += this.nextMove.effects[effect];
                                    break;
                                case "criticalChance":
                                    moveCritChance += this.nextMove.effects[effect];
                                    break;
                                case "takedown":
                                    moveTakedown += this.nextMove.effects[effect];
                                    break;
                                case "overwhelm":
                                    moveOverwhelm += this.nextMove.effects[effect];
                                    break;
                                case "repeat":
                                    //console.log((this.nextMove.effects[effect]/Math.pow(2,this.repeatDict[this.nextMoveKey])));
                                    if (Math.random() < (this.nextMove.effects[effect] / Math.pow(2, this.repeatDict[this.nextMoveKey]))) {
                                        repeat = true;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        });
                    }
                    let isCrit = (Math.random() < moveCritChance);
                    let d1 = formulas.attackPower(this.nextMove.damageRatios, this.combatState);
                    d1 = d1 * (this.nextMove.damageRange[0] + Math.random() * (this.nextMove.damageRange[1] - this.nextMove.damageRange[0]));
                    let d2 = (isCrit ? 1.5 : 1) * d1;
                    let d3 = d2 * this.combatState.damageDealt;
                    let df = d3 * (1 + target.health / target.maxHealth * moveOverwhelm) * (1 + (1 - target.health / target.maxHealth) * moveTakedown);

                    if (this.nextMove.hasOwnProperty("effects")) {
                        Object.keys(this.nextMove.effects).forEach(effect => {
                            switch (effect) {
                                case "stun":
                                    target.interrupt += moveStun * 1000;
                                case "repeat":
                                    break;
                                case "takedown":
                                    break;
                                case "knockback":
                                    target.distance += this.nextMove.effects[effect];
                                    break;
                                case "pull":
                                    target.distance = Math.max(5, target.distance - this.nextMove.effects[effect]);
                                    break;
                                case "aoe":
                                    encounter.enemyArray.forEach(enemy => {
                                        if (enemy == null) return;
                                        if (enemy == target) return;
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
                                        if (Math.abs(originDistance - enemy.distance) <= this.nextMove.effects[effect]) {
                                            if (this.nextMove.effects.hasOwnProperty("knockback")) {
                                                enemy.distance += this.nextMove.effects['knockback'];
                                            }
                                            if (moveStun > 0) {
                                                enemy.interrupt += moveStun * 1000;
                                            }
                                            let { died: killingBlow, d: dr } = enemy.takeDamage(df);
                                            logConsole(`Hero <span style="color:red">${isCrit ? "critically " : ""}</span>hit ${this.target.name} with <span style="color:white">${playerMoves[this.nextMoveKey].name}</span> for <span style="color:white">${format(dr, 2)}</span>(${format(df, 2)}) damage.`);
                                        }
                                    })
                                    break;

                                default:
                                    break;
                            }
                        });
                    }

                    let { died: killingBlow, d: dr } = target.takeDamage(df);
                    logConsole(`Hero <span style="color:red">${isCrit ? "critically " : ""}</span>hit ${this.target.name} with <span style="color:white">${playerMoves[this.nextMoveKey].name}</span> for <span style="color:white">${format(dr, 2)}</span>(${format(d3, 2)}) damage.`);
                    if (this.combatState.lifesteal + moveLifesteal > 0) { this.health = Math.min(this.health + dr * (this.combatState.lifesteal + moveLifesteal), this.maxHealth); logConsole(`Hero healed for ${format(dr * (this.combatState.lifesteal + moveLifesteal), 2)}`); }
                    if (killingBlow) this.target = null;
                }

                break;
            case 1:
                let deltaMinus = Math.min(playerStats.engagementRange - dist, this.nextMove.range[1]);
                let deltaPlus = Math.min(Math.abs(dist - playerStats.engagementRange), this.nextMove.range[0]);
                if (this.moveIntention > 0) {
                    encounter.enemyArray.forEach((enemy) => { if (enemy != null) enemy.distance = Math.max(5, enemy.distance - deltaPlus); })
                    encounter.allyArray.forEach((ally) => { if (ally != null) ally.distance = Math.max(5, ally.distance - deltaPlus); })
                    environmentDistance -= deltaPlus;
                } else {
                    encounter.enemyArray.forEach((enemy) => { if (enemy != null) enemy.distance = Math.max(5, enemy.distance + deltaMinus) })
                    encounter.allyArray.forEach((ally) => { if (ally != null) ally.distance = Math.max(5, ally.distance + deltaMinus) })
                    environmentDistance += deltaMinus;
                }
                break;
            case 2:
                if (this.nextMove.hasOwnProperty("effects")) {
                    Object.keys(this.nextMove.effects).forEach(effect => {
                        let amount;
                        switch (effect) {
                            case "heal":
                                amount = this.maxHealth * this.nextMove.effects.heal
                                    + formulas.healPower(this.nextMove.damageRatios, this.combatState);
                                if (this.nextMove.effects.hasOwnProperty("hope")) { amount *= (1 + (1 - this.health / this.maxHealth) * this.nextMove.effects.hope); }
                                this.health = Math.min(this.health + amount, this.maxHealth);
                                logConsole(`Hero healed for ${format(amount, 2)}`);
                                break;
                            case "shield":
                                amount = formulas.healPower(this.nextMove.damageRatios, this.combatState);
                                if (this.nextMove.effects.hasOwnProperty("closeCombat")) {
                                    if (dist <= 5) amount *= 1 + this.nextMove.effects.closeCombat;
                                }
                                if (amount > this.shield) {
                                    this.shield = amount;
                                    logConsole(`Hero <span style="color:blue;">shielded </span> for <span style="color:white;">${format(amount, 2)}</span> from <span style="color:white;">${this.nextMove.name}</span>`);
                                }
                                break;
                            default:
                                break;
                        }
                    });
                }
                break;
            case 3:
                this.addBuff(this.nextMoveKey, this.nextMove);
                break;
            case 4:
                Object.entries(this.nextMove.effects.summon).forEach(([key, value]) => {
                    for (let index = 0; index < value; index++) {
                        encounter.addAlly(summons[key], this.nextMove.damageRatios, Math.min(this.nextMove.range[1], this.target.distance));
                    }
                });

                break;
            default:
                logConsole("ERROR: Not a valid move type");
                break;
        }
        if (repeat) {
            this.repeatDict[this.nextMoveKey] += 1;
            if (target.health <= 0 || target == null) {
                return true;
            } else {
                return false;
            }

        } else {
            this.repeatDict[this.nextMoveKey] = 0;
            playerStats.abilityCooldowns[this.nextMoveKey] = this.nextMove.cooldownTime * this.cooldownReduction;
            return true;
        }
    }
    think() {
        if (this.target == null || this.target?.health <= 0) {
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
                    if (closest != -1) { this.target = encounter.enemyArray[closest]; }
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
        if (dist > playerStats.engagementRange) { this.moveIntention = 1; }
        else if (dist < playerStats.engagementRange) { this.moveIntention = -1; }
        else { this.moveIntention = 0; }
        let weights = Array(this.equippedAbilities.length).fill(0);
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
                if (ability.hasOwnProperty("effects")) {
                    if (ability.effects.hasOwnProperty('pull')) {
                        if (this.target.distance > 5) { weights[index] *= 10; }
                    }
                }
            }
            if (ability.type == 1) {
                let delta = dist - playerStats.engagementRange;
                weights[index] = delta * this.moveIntention * (this.moveIntention > 0 ? ability.range[0] / 100 : ability.range[1]);
            }
            if (ability.type == 2) {
                if (ability.hasOwnProperty("effects")) {
                    if (ability.effects.hasOwnProperty('heal')) {
                        let amount = this.maxHealth * ability.effects.heal + formulas.healPower(ability.damageRatios, this.combatState);
                        if (this.maxHealth - this.health > amount) {
                            weights[index] = 100;
                        }
                    }
                    if (ability.effects.hasOwnProperty('shield')) {
                        let amount = ability.damage + formulas.healPower(ability.damageRatios, this.combatState);
                        if (this.shield <= 0.2 * amount) {
                            weights[index] = 100;
                        }
                    }
                }
            }
            if (ability.type == 3) {
                if (this.moveIntention == 0) { weights[index] = 100; }
                if (ability.effects.actionSpeed) { weights[index] = 100; }
                if (ability.effects.cooldownSpeed) { weights[index] = 100; }
            }
            if (ability.type == 4) {
                weights[index] = 100;
            }
        }

        const max = Math.max(...weights);
        //console.log("Weights:",weights," Max:",max)
        let indexes = [];
        let moveKey;
        if (max > 0) {
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
            moveKey = this.equippedAbilities[indexes[pick]];
        }

        if (moveKey == undefined) moveKey = 'wait';
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
        let restRate = 0;
        switch (gameState) {
            case 'InRest':
                restRate = this.data.restRate / 2;
                break;
            case 'InDead':
                restRate = this.data.restRate;
                break;
            default:
                console.error('UNRECOGNIZED GAME STATE FOR rest()');
                break;
        }
        this.health = Math.min(this.health + this.maxHealth * restRate * logicTickTime / 1000, this.maxHealth);
    }
    takeDamage(amount) {
        let d = Math.max(0, amount * this.combatState.damageReduction * this.combatState.damageTaken - this.flatReduction);
        if (this.dodgeChance > Math.random()) {
            logConsole(`${this.name} dodged ${format(amount, 2)} damage!`)
            return 0;
        }
        if (this.shield > 0) {
            if (d >= this.shield) {
                d -= this.shield;
                this.shield = 0;
            } else {
                this.shield -= d;
                d = 0;
            }
        }
        this.health -= d;
        return d;
    }
}
class Enemy extends CombatEntity {
    constructor(enemyData, distance, drawIndex = 0, area = 0, scaling = 1) {
        super();
        this.data = enemyData;
        this.attributes = Array.from(this.data.attributes);
        let attrSum = arraySum(this.attributes.map(x => Math.sqrt(x)));
        for (let index = 0; index < this.attributes.length; index++) {
            this.attributes[index] = Math.pow((area.power * scaling) * Math.sqrt(this.attributes[index]) / attrSum, 2);
        }
        this.expReward = area.expPerPower * (area.power * scaling);
        this.moneyReward = area.moneyPerPower * (area.power * scaling);
        this.abilityCooldowns = {};
        enemyData.moves.forEach(ability => {
            this.abilityCooldowns[ability] = 0;
        });
        this.name = enemyData.name;
        this.drawIndex = drawIndex;
        this.engagementRange = 5;
        this.moveIntention = 1;
        if (enemyData.hasOwnProperty("engagementRange")) this.engagementRange = enemyData.engagementRange;
        this.maxHealth = formulas.maxHealth(this.attributes[1]);
        if (enemyData.hasOwnProperty("rank")) {
            if (enemyData.rank == "boss") {
                this.maxHealth *= 2;
                this.expReward *= 3;
                this.moneyReward *= 1.5;
            }
        }
        this.health = this.maxHealth
        this.shield = 0;
        this.damageReduction = formulas.damageReduction(this.attributes[1]);
        this.actionSpeed = formulas.actionSpeed(this.attributes[3]);
        this.healthRegeneration = enemyData.healthRegen;
        this.cooldownReduction = 1;
        this.distance = distance;
        this.name = enemyData.name;
        this.image = new Image();
        this.image.src = "resources/characterSprites/" + enemyData.spriteFile;
        this.nextMoveKey = null;
        this.combatState.init(this);
        this.combatState.strength = this.attributes[0];
        this.combatState.toughness = this.attributes[1];
        this.combatState.mind = this.attributes[2];
        this.combatState.agility = this.attributes[3];
        this.repeatDict = {};
        this.data.moves.forEach(ability => {
            if (ability != null) {
                if (!this.repeatDict.hasOwnProperty(ability)) {
                    this.repeatDict[ability] = 0;
                }
            }
        });
    }
    tickCooldowns() {
        this.data.moves.forEach(ability => {
            this.abilityCooldowns[ability] -= logicTickTime * this.combatState.cooldownSpeed;
        });
    }
    act(target) {
        if (target == null) {
            return;
        }
        let repeat = false;
        switch (this.nextMove.type) {
            case 0:
                let inRange = false;
                let dist = this.distance;
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
                    let moveTakedown = 0;
                    let moveCritChance = 0;
                    let moveLifesteal = 0;
                    let moveStun = 0;
                    if (this.nextMove.hasOwnProperty("effects")) {
                        Object.keys(this.nextMove.effects).forEach(effect => {
                            switch (effect) {
                                case "stun":
                                    moveStun += this.nextMove.effects[effect];
                                    break;
                                case "lifesteal":
                                    moveLifesteal += this.nextMove.effects[effect];
                                    break;
                                case "criticalChance":
                                    moveCritChance += this.nextMove.effects[effect];
                                    break;
                                case "takedown":
                                    moveTakedown += this.nextMove.effects[effect];
                                    break;
                                case "repeat":
                                    if (Math.random() < (this.nextMove.effects[effect] / Math.pow(2, this.repeatDict[this.nextMoveKey])))  {
                                        repeat = true;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        });
                    }
                    let isCrit = (Math.random() < moveCritChance);
                    let d1 = this.nextMove.baseDamage +formulas.attackPower(this.nextMove.damageRatios, this.combatState);
                    d1 = d1 * (this.nextMove.damageRange[0] + Math.random() * (this.nextMove.damageRange[1] - this.nextMove.damageRange[0]));
                    let d2 = (isCrit ? 1.5 : 1) * d1;
                    let dr = target.takeDamage(d2);
                    if (this.nextMove.hasOwnProperty("effects")) {
                        Object.keys(this.nextMove.effects).forEach(effect => {
                            switch (effect) {
                                case "stun":
                                    target.interrupt = moveStun * 1000;
                                case "repeat":
                                    break;
                                case "takedown":
                                    break;
                                case "knockback":
                                    encounter.enemyArray.forEach(enemy => {
                                        if (enemy == null) return;
                                        enemy.distance += this.nextMove.effects[effect];
                                    });
                                    environmentDistance += this.nextMove.effects[effect];
                                    break;
                                case "pull":
                                    this.distance = Math.max(5, this.distance - this.nextMove.effects[effect]);
                                    break;
                                case "aoe":
                                    //console.log("NOT IMPLEMENTED");
                                    break;

                                default:
                                    break;
                            }
                        });
                    }
                    logConsole(`${this.name} <span style="color:red">${isCrit ? "critically " : ""}</span> hit ${this.target.name} with <span style="color:yellow">${this.nextMove.name}</span> for <span style="color:yellow">${format(dr, 2)}</span>(${format(d1, 2)}) damage.`);
                }
                break;
            case 1:
                let deltaMinus = Math.min(this.engagementRange - this.distance, this.nextMove.range[1]);
                let deltaPlus = Math.min(Math.abs(this.distance - this.engagementRange), this.nextMove.range[0]);
                if (this.moveIntention > 0) {
                    this.distance -= deltaPlus;
                } else {
                    this.distance += deltaMinus;
                }

                if (!['Move', 'Wait'].includes(this.nextMove.name)) logConsole(`${this.name} used ${this.nextMove.name}!`);
                break;
            case 2:
                if (this.nextMove.hasOwnProperty("effects")) {
                    Object.keys(this.nextMove.effects).forEach(effect => {
                        let amount;
                        switch (effect) {
                            case "heal":
                                amount = this.maxHealth * this.nextMove.effects.heal
                                    + formulas.healPower(this.nextMove.damageRatios, this.combatState);
                                if (this.nextMove.effects.hasOwnProperty("hope")) { amount *= (1 + (1 - this.health / this.maxHealth) * this.nextMove.effects.hope); }
                                this.health = Math.min(this.health + amount, this.maxHealth);
                                logConsole(`${this.name} healed for ${format(amount, 2)}`);
                                break;
                            case "shield":
                                amount = formulas.healPower(this.nextMove.damageRatios, this.combatState);
                                if (this.nextMove.effects.hasOwnProperty("closeCombat")) {
                                    if ((this.distance - this.target.distance) <= 5) amount *= 1 + this.nextMove.effects.closeCombat;
                                }
                                console.log(this.shield,amount)
                                if (amount > this.shield) {
                                    this.shield = amount;
                                    logConsole(`${this.name} <span style="color:blue;">shielded </span> for <span style="color:white;">${format(amount, 2)}</span> from <span style="color:white;">${this.nextMove.name}</span>`);
                                }
                                break;
                            case "allyshield":
                                amount =
                                    this.nextMove.damageRatios[0] * (Math.pow(this.data.attributes[0] + 1, HEALTH_GROWTH_EXPONENT) - 1)
                                    + this.nextMove.damageRatios[1] * (Math.pow(this.data.attributes[1] + 1, HEALTH_GROWTH_EXPONENT) - 1)
                                    + this.nextMove.damageRatios[2] * (Math.pow(this.data.attributes[2] + 1, HEALTH_GROWTH_EXPONENT) - 1)
                                    + this.nextMove.damageRatios[3] * (Math.pow(this.data.attributes[3] + 1, HEALTH_GROWTH_EXPONENT) - 1);
                                if ((player.target != null) && (player.target != this))
                                    if (amount > player.target.shield) player.target.shield = amount;
                                logConsole(`${this.name} used ${this.nextMove.name} on ${player.target.name}`);
                                break;
                            default:
                                break;
                        }
                    });
                }
                break;
            default:
                logConsole("ERROR: Not a valid move type");
                break;
        }
        if (repeat) {
            this.repeatDict[this.nextMoveKey] += 1;
            if (target.health <= 0 || target == null) {
                return true;
            } else {
                return false;
            }

        } else {
            this.repeatDict[this.nextMoveKey] = 0;
            this.abilityCooldowns[this.nextMoveKey] = this.nextMove.cooldownTime * this.cooldownReduction;
            return true;
        }
        // if (repeat) {
        //     if (target.health <= 0 || target == null) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        // } else {
        //     this.abilityCooldowns[this.nextMoveKey] = this.nextMove.cooldownTime * this.cooldownReduction;
        //     return true;
        // }
    }
    think() {
        if (this.target == null) {
            document.getElementById("enemyMoveText").innerHTML = "No target";
            return;
        }
        if (this.distance > this.engagementRange) { this.moveIntention = 1; }
        else if (this.distance < this.engagementRange) { this.moveIntention = -1; }
        else { this.moveIntention = 0; }
        let dist = this.distance;
        let weights = Array(this.data.moves.length).fill(0);
        for (let index = 0; index < this.data.moves.length; index++) {
            let k = this.data.moves[index];
            let ability = abilityLibrary[k];
            if (this.abilityCooldowns[k] > 0) { weights[index] = -1; continue; }
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
                let delta = this.distance - this.engagementRange;
                weights[index] = delta * this.moveIntention * (this.moveIntention > 0 ? ability.range[0] / 100 : ability.range[1]);
            }
            if (ability.type == 2) {
                if (ability.hasOwnProperty("effects")) {
                    let amount;
                    if (ability.hasOwnProperty("effects")) {
                        if (ability.effects.hasOwnProperty('heal')) {
                            let amount = this.maxHealth * ability.effects.heal + formulas.healPower(ability.damageRatios, this.combatState);
                            if (this.maxHealth - this.health > amount) {
                                weights[index] = 100;
                            }
                        }
                        if (ability.effects.hasOwnProperty('shield')) {
                            let amount = ability.baseDamage + formulas.healPower(ability.damageRatios, this.combatState);
                            if (this.shield <= 0.2 * amount) {
                                weights[index] = 100;
                            }
                        }
                    }
                    if (ability.effects.hasOwnProperty('allyshield')) {
                        amount =
                            ability.damageRatios[0] * (Math.pow(this.data.attributes[0] + 1, HEALTH_GROWTH_EXPONENT) - 1)
                            + ability.damageRatios[1] * (Math.pow(this.data.attributes[1] + 1, HEALTH_GROWTH_EXPONENT) - 1)
                            + ability.damageRatios[2] * (Math.pow(this.data.attributes[2] + 1, HEALTH_GROWTH_EXPONENT) - 1)
                            + ability.damageRatios[3] * (Math.pow(this.data.attributes[3] + 1, HEALTH_GROWTH_EXPONENT) - 1);
                        if ((player.target.shield <= 0.2 * amount) && (player.target != this)) {
                            weights[index] = 100;
                        }
                    }
                }
            }
        }
        //console.log(weights);
        const max = Math.max(...weights);
        const indexes = [];
        let moveKey;
        if (max > 0) {
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
            moveKey = this.data.moves[indexes[pick]];
        }

        if (moveKey == undefined) { moveKey = 'wait'; }
        this.nextMoveKey = moveKey;
        this.nextMove = abilityLibrary[this.nextMoveKey];
        this.nextMoveInitiative = this.nextMove.time;
    }
    draw(context) {
        let canvasX = scaleDistance(this.distance);
        let canvasY = cBuffer.height - 40 - (this.drawIndex) * 10;

        context.drawImage(this.image, canvasX - this.image.width * 2, canvasY - this.image.height * 4, this.image.width * 4, this.image.height * 4);
        drawInfoBars(context, this, canvasX, canvasY);
        if (this.nextMove != null) drawSkillIcon(context, this.nextMove.iconName, canvasX, canvasY);
        if (player.target == this) {
            let offset = 6 * Math.sin(Date.now() / 150);
            context.lineWidth = 7;
            context.strokeStyle = 'black';
            context.beginPath();
            context.moveTo(canvasX - 13, canvasY - 173 - offset);
            context.lineTo(canvasX, canvasY - 160 - offset);
            context.lineTo(canvasX + 13, canvasY - 173 - offset);
            context.stroke();
            context.lineWidth = 4;
            context.strokeStyle = 'yellow';
            context.stroke();
        }
    }
    onDeath() {
        let exp = addPlayerExp(this.expReward);
        let money = addPlayerMoney(this.moneyReward);
        // for (let index = 0; index < this.attributes.length; index++) {
        //     if (playerStats[attributeIndexToId[index]] < this.attributes[index]) {
        //         playerStats[attributeIndexToId[index]] += 0.01 * this.attributes[index];
        //     }

        // }
        addPlayerReputation(this.data.reputationReward);
        checkDefeatQuest(this.data.id);
        logConsole(`<span style="color: cyan;">${this.name} was defeated! +${format(money, 2)}$ +${format(exp, 2)}EXP +${format(this.data.reputationReward, 2)}REP</span>`)
    }
}
class Encounter {
    constructor(area) {
        this.enemyArray = [];
        this.allyArray = [];
        this.enemiesToSpawn = area.getEnemies();
        let lastHealth = player.health / player.maxHealth;
        this.area = area;
        player = new Player(playerStats);
        if (lastHealth > 0) { player.health = lastHealth * player.maxHealth; }
        for (let index = 0; index < this.enemiesToSpawn.length; index++) {
            //let picked = Math.floor(Math.random() * this.area.enemies.length);
            let picked = this.enemiesToSpawn[index];
            let drawIndex = mod(index, 2) == 0 ? Math.floor(index / 2) : -Math.floor(index + 1 / 2);
            let spawnDistance = 50;
            if (enemyData[picked].hasOwnProperty("spawnDistance")) {
                spawnDistance = enemyData[picked].spawnDistance;
            }
            let newEnemy = new Enemy(enemyData[picked], Math.round(2 * (Math.random() - 0.5)) * 5 + spawnDistance, drawIndex, area, 1 / Math.sqrt(this.enemiesToSpawn.length));
            this.enemyArray.push(newEnemy);
            this.enemyArray[index].setTarget(player);
        }
        let closest = -1;
        let distance = Infinity;
        for (let index = 0; index < this.enemyArray.length; index++) {
            const enemy = this.enemyArray[index];
            if (enemy == null || enemy.health <= 0) { continue }
            else {
                if (enemy.distance < distance) {
                    distance = enemy.distance;
                    closest = index;
                }
            }
        }
        // player.setTarget(this.enemyArray[closest]);
        // this.addAlly(summons['shadowClone'], [0.45, 0.45, 0.45, 0.45]);
    }
    addAlly(data, ratios, distance) {
        const ally = new Ally(data, ratios);
        ally.distance = distance;
        this.allyArray.push(ally);

    }
    tick() {
        //Player -> Allies -> Enemies
        player.tick();
        for (let index = 0; index < this.allyArray.length; index++) {
            let a = this.allyArray[index];
            if (a == null) { continue; }
            let active = a.tick();
            if (!active) {
                this.allyArray[index] = null;
            }
        }
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
        currentArea.addCompletion();
        return 1;
    }
}