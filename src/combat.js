class CombatProperties {
    constructor(data) {
        this.maxHealth = 0;
        this.health = 0;
        this.strength = 0;
        this.toughness = 0;
        this.mind = 0;
        this.agility = 0;
        this.criticalChance = 0;
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
    constructor(data) {
        super();
        this.data = data;
        this.name = data.name;
        //ATTRIBUTES
        this.strength = getEffectiveValue("strength");
        this.toughness = getEffectiveValue("toughness");
        this.mind = getEffectiveValue("mind");
        this.agility = getEffectiveValue("agility");
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
        if (target.health < 0) {
            this.target = null;
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
                    logConsole(`Hero <span style="color:red">${isCrit ? "critically " : ""}</span>hit ${this.target.name} with <span style="color:white">${playerMoves[this.nextMoveKey].name}</span> for <span style="color:white">${format(dr, 2)}</span>(${format(d3, 2)}) damage.`);
                    if (this.combatState.lifesteal + moveLifesteal > 0) { this.health = Math.min(this.health + dr * (this.combatState.lifesteal + moveLifesteal), this.maxHealth); logConsole(`Hero healed for ${format(dr * (this.combatState.lifesteal + moveLifesteal), 2)}`); }
                    if (killingBlow) this.target = null;
                }

                break;
            case 1:
                let deltaMinus = Math.min(this.data.engagementRange - dist, this.nextMove.range[1]);
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
        if(dist <= this.engagementRange){ this.moveIntention = 0}
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
                let delta = Math.abs(dist - this.data.enemyArray);
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