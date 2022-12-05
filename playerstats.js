playerStats = {
  experience: 0,
  experienceToNext: 10,
  class: "Human",
  level: 0,
  passivePointsSpent: 0,
  strength: 0,
  toughness: 0,
  mind: 0,
  agility: 0,
  healthRegen: 0.005,
  restRate: 0.1,
  lastSave: 0,
  muted: true,
  unlockedSkills: {},
  effectMultipliers: {},
}

function getEffectiveValue(property) {
  if (!playerStats.hasOwnProperty(property)) {
    console.log("Accessing invalid property");
    return 0;
  }
  if (!playerStats.effectMultipliers.hasOwnProperty(property)) { return playerStats[property]; }
  else {
    return (playerStats[property]
      + arraySum(Object.values(playerStats.effectMultipliers[property].additiveFlat)))
      * (1 + arraySum(Object.values(playerStats.effectMultipliers[property].additivePercent)))
      * arrayMult(Object.values(playerStats.effectMultipliers[property].multPercent))
  }

}

function recalculateMultipliers() {
  playerStats.effectMultipliers = {};

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

const baseExperienceCost = 10;
const baseLinearExperieneCost = 5;
const baseExperienceCostExponent = 1.07;
function addPlayerExp(amount) {
  playerStats.experience += amount;
  if (playerStats.experience > playerStats.experienceToNext) {
    playerStats.experience -= playerStats.experienceToNext;
    playerStats.level += 1;
    playerStats.experienceToNext = (baseExperienceCost + baseLinearExperieneCost * playerStats.level) * Math.pow(baseExperienceCostExponent, playerStats.level)
  }
}
load();
function save() {
  console.log("Saving data...")
  playerStats.lastSave = Date.now();
  localStorage.setItem("heroSave", JSON.stringify(playerStats));
  localStorage.setItem("heroLastSaved", playerStats.lastSave);
}
setInterval(save, 30000);
function load() {
  //reset()
  let loadgame = JSON.parse(localStorage.getItem("heroSave"))
  if (loadgame != null) {
    Object.keys(loadgame).forEach(property => {
      playerStats[property] = loadgame[property];
    });
  } else {
    console.log("No savefile found");
  }
}

function loadGame(loadgame) {
  let shouldCheckVersion = false; //check if we need to implement a fix for version differences
  let oldVersion = loadgame.lastMajorChangeVersion; //save old version since we'll be overwriting as part of the load process, but we don't want to execute the fix until after loading
  if (oldVersion === undefined || oldVersion < game.lastMajorChangeVersion) {
    shouldCheckVersion = true;
  }
  loadgame.lastMajorChangeVersion = game.lastMajorChangeVersion; //set loadgame version to current version so save has proper version going forward


  //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
  let loadKeys = Object.keys(loadgame);
  for (i = 0; i < loadKeys.length; i++) {
    if (loadgame[loadKeys[i]] != "undefined") {
      let thisKey = loadKeys[i];
      if (typeof loadgame[thisKey] == "string" && thisKey != "dragonName") { game[thisKey] = new Decimal(loadgame[thisKey]) }
      else if (Array.isArray(loadgame[thisKey])) {
        game[loadKeys[i]] = loadgame[thisKey].map((x) => {
          if (typeof x == "string") { return new Decimal(x) } else { return x }
        })
      }
      //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
      else { game[loadKeys[i]] = loadgame[loadKeys[i]] }
    }
  }
}