const storyQuests = [
    {
        title: `The Beginning I`,
        text: `You've had enough. Every year crime is up and yet the city council does nothing about it.
        The corruption runs deep. It's time for change.`,
        requirementType: `defeat`,
        requirementTarget: [`criminal`],
        requirementAmount: [1],
    },
    {
        title: `The Beginning II`,
        text: `OW. Ok. OW. Ok that wasn't so easy. Maybe you should train up a bit first.</br>(Arrow keys or scroll down over this area).`,
        requirementType: `training`,
        requirementTarget: [`strength`, `toughness`],
        requirementAmount: [1, 1]
    },
    {
        title: `The Beginning III`,
        text: `Go at 'em`,
        requirementType: `defeat`,
        requirementTarget: [`criminal`],
        requirementAmount: [10],
    },
    {
        title: `The Beginning IV`,
        text: `I should work on my skills so I can take down the real criminals. (Skills menu below)`,
        requirementType: `level`,
        requirementTarget: [`level`],
        requirementAmount: [5],
    },
    {
        title: `Streetfights I`,
        text: `Moving up to a tougher crowd. (Go to Streets in Areas menu)`,
        requirementType: `defeat`,
        requirementTarget: [`thug`],
        requirementAmount: [1],
    },
    {
        title: `Streetfights II`,
        text: `That guy had a freakin' crowbar. Back to the training board.`,
        requirementType: `training`,
        requirementTarget: [`strength`, `toughness`, `agility`],
        requirementAmount: [10, 10, 10],
    },
    {
        title: `Streetfights III`,
        text: `The whole gang.`,
        requirementType: `defeat`,
        requirementTarget: [`thug`],
        requirementAmount: [10],
    },
    {
        title: `Vigilante I`,
        text: `You heard news that a maximum security prisoner escaped and is wreaking havoc on the bridge. This is it, a real chance to be a hero. You better be ready for this.`,
        requirementType: `defeat`,
        requirementTarget: [`prisoner9`],
        requirementAmount: [1],
    },

];
const endOfStoryQuest = {
    title: `The End So Far`,
    text: `You did it. This is the end of the content so far.<br><br>Congratulations!<br><br> Feel free to keep on playing. Can you beat Prisoner 9 twice in a row?`,
    requirementType: `none`,
    requirementTarget: 1,
    requirementAmount: 1,
};

function resetStoryline() {
    playerStats.storyProgress = 0;
    playerStats.currentStoryQuestProgress = [0];
    updateStoryQuest();
}
updateStoryQuest();
function getStoryQuest(index) {
    if (index < storyQuests.length) { return storyQuests[index] }
    else { return endOfStoryQuest }
}
function checkTrainingQuest() {
    let quest = getStoryQuest(playerStats.storyProgress);
    if (quest.requirementType != 'training') return false;
    for (let index = 0; index < quest.requirementTarget.length; index++) {
        playerStats.currentStoryQuestProgress[index] = getEffectiveValue(quest.requirementTarget[index]);
    }
    updateStoryQuest();
}

function checkDefeatQuest(enemyId) {
    let quest = getStoryQuest(playerStats.storyProgress);
    if (quest.requirementType != 'defeat') return false;
    for (let index = 0; index < quest.requirementTarget.length; index++) {
        if (quest.requirementTarget[index] == enemyId) {
            if (playerStats.currentStoryQuestProgress[index] >= quest.requirementAmount[index]) {
                continue;
            } else {
                playerStats.currentStoryQuestProgress[index] += 1;
            }
        }
    }
    updateStoryQuest();
}
function checkLevelQuest() {
    let quest = getStoryQuest(playerStats.storyProgress);
    if (quest.requirementType != 'level') return false;
        playerStats.currentStoryQuestProgress[0] = playerStats.level;
    updateStoryQuest();
}
function updateStoryQuest() {
    let quest = getStoryQuest(playerStats.storyProgress);
    let completed = true;
    for (let index = 0; index < quest.requirementTarget.length; index++) {
        if (playerStats.currentStoryQuestProgress[index] >= quest.requirementAmount[index]) {
            continue;
        } else {
            completed = false;
        }
    }
    if (completed) {
        playerStats.storyProgress += 1;
        playerStats.currentStoryQuestProgress = Array(getStoryQuest(playerStats.storyProgress).requirementTarget.length).fill(0);
    }
    let textBox = document.getElementById("storyText");
    textBox.innerHTML = storyQuestText(playerStats.storyProgress);

}

function storyQuestText(progress) {
    let quest = getStoryQuest(progress);
    let requirementsString = "";
    let number = 0;
    switch (quest.requirementType) {
        case 'defeat':
            for (let index = 0; index < quest.requirementTarget.length; index++) {
                requirementsString += `Defeat ${enemyData[quest.requirementTarget[index]].name}: ${playerStats.currentStoryQuestProgress[index]}/${quest.requirementAmount[index]}<br />`;
            }
            break;
        case 'training':
            for (let index = 0; index < quest.requirementTarget.length; index++) {
                requirementsString += `Get to ${format(playerStats.currentStoryQuestProgress[index])}/${quest.requirementAmount[index]} <span class="${quest.requirementTarget[index]}Text">${attributeDisplayNames[quest.requirementTarget[index]]}</span><br />`;
            }
            break;
        case 'level':
            requirementsString = `Get to level ${format(playerStats.level)}/${quest.requirementAmount[0]}`;
            break;
        case 'none':
            requirementsString = "";
            break;
        default:
            requirementsString = "ERROR: unkown quest requirement";
            break;
    }
    return `${quest.title}<br /><br />${quest.text}<br /><br />${requirementsString}`;
}