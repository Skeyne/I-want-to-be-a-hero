const storyQuests = [
    {
        title: `The Beginning I`,
        text: `You've had enough. Every year crime is up and yet the city council does nothing about it.
        The corruption runs deep. It's time for change. <br><br> (Change menus by scrolling on this area or arrow keys after clicking inside it.)`,
        requirementType: `defeat`,
        requirementTarget: [`criminal`],
        requirementAmount: [1],
    },
    {
        title: `The Beginning II`,
        text: `OW. Ok. OW. Ok that wasn't so easy. Maybe you should train up a bit first.<br><br>(Arrow keys or scroll down to 'Training').`,
        requirementType: `training`,
        requirementTarget: [`strength`, `toughness`],
        requirementAmount: [1, 1]
    },
    {
        title: `The Beginning III`,
        text: `Time to fight crime`,
        requirementType: `defeat`,
        requirementTarget: [`criminal`],
        requirementAmount: [5],
    },
    {
        title: `The Beginning IV`,
        text: `I should work on my skills so I can take down criminals more effectively. (Skills menu below)`,
        requirementType: `level`,
        requirementTarget: [`level`],
        requirementAmount: [3],
    },
    {
        title: `The Beginning V`,
        text: `Time to clean the streets.`,
        requirementType: `defeat`,
        requirementTarget: [`criminal`],
        requirementAmount: [15],
    },
    {
        title: `Streetfights I`,
        text: `Moving up to a tougher crowd. (Streets in Areas menu)`,
        requirementType: `defeat`,
        requirementTarget: [`thug`],
        requirementAmount: [1],
    },
    {
        title: `Streetfights II`,
        text: `I need to learn some new moves to take out the more dangerous criminals. (See details of unlocked moves in the 'Abilities' menu and equip them in the 'Status' menu slots.)`,
        requirementType: `level`,
        requirementTarget: [`level`],
        requirementAmount: [5],
    },
    {
        title: `Streetfights III`,
        text: `That guy had a freakin' crowbar. Back to the training board.`,
        requirementType: `training`,
        requirementTarget: [`strength`, `toughness`, 'mind',`agility`],
        requirementAmount: [5,5,5,5],
    },
    
    {
        title: `Streetfights IV`,
        text: `Time to tkae out the whole gang.`,
        requirementType: `defeat`,
        requirementTarget: [`thug`],
        requirementAmount: [30],
    },
    {
        title: `Vigilante I`,
        text: `You heard news of a loud bang coming from the maximum security prison. You should probaby check it out. As you get to the bridge you see dozens of prisoners running from the direction of the prison. Stop them!`,
        requirementType: `defeat`,
        requirementTarget: [`prisoner`],
        requirementAmount: [20],
    },
    {
        title: `Vigilante II`,
        text: `After taking down some of the escaped prisoners you finally get near. Now you can see green fumes streaming from somewhere in the compoud. As you enter the courtyard a very large prisoner blocks your way.`,
        requirementType: `defeat`,
        requirementTarget: [`prisoner9`],
        requirementAmount: [1],
    },
    {
        title: `Vigilante III`,
        text: `Finally taking down the oversized brute, you follow the fumes to some exhaust chimneys and a hatch that leads underground.
             The prisoners must have rioted and broken in. Eager to be the hero, you jump in. You find yourself in some sort of underground transit. Odd, you can't think why the prison needs such a large underground complex. Soon you spot more escaped prisoners, but they look strange.`,
        requirementType: `defeat`,
        requirementTarget: [`infectedPrisoner`],
        requirementAmount: [30],
    },
    {
        title: `Vigilante IV`,
        text: `Finally you find a doorway that leads into a room. You seem to be in a lab. You see vats, some broken, with a similarly coloured green liquid splashed around them. Some, with- people? - still inside. In your shocked state you barely dodge out of the way as a massive blade swings from the side. From the shadows a massive disfigured prisoner appears. Did he cause all of this?`,
        requirementType: `defeat`,
        requirementTarget: [`experiment999`],
        requirementAmount: [1],
    },

];
const endOfStoryQuest = {
    title: `The End So Far`,
    text: `You did it. This is the end of the content so far.<br><br>Congratulations!<br><br> Feel free to keep on playing. As a reward, you can preview the Esper class below (WARNING: this is experimental content, you should make a backup, changing class resets your level and attributes)
    <br>
    There's also a final area 'The Void' with an exceptionally unfair enemy if you fancy your odds at beating him.
    <br>
    <button class="classButton" style="float:left; margin-left:15%" onclick="changeClass('human')">Human</button>
    <button class="classButton" style="float:right;margin-right:15%"" onclick="changeClass('esper')">Esper</button>`,
    requirementType: `none`,
    requirementTarget: [1],
    requirementAmount: [1],
};


updateStoryQuest();
updateDiaryEntries();

var areaSelect = document.getElementById("selectArea");
checkAreaUnlocks();
function checkAreaUnlocks(){
    areaSelect.innerHTML = "";
    for (let index = 0; index < areas.length; index++) {
        let area = areas[index];
        if(area.storyUnlock > playerStats.storyProgress){
            break;
        }
        let d = document.createElement('div');
        d.setAttribute("class", "radioWrap");
        areaSelect.append(d);
        let radioSelect = document.createElement('input');
        radioSelect.setAttribute('type', 'radio');
        radioSelect.setAttribute('name', 'selectArea');
        radioSelect.setAttribute("id", `${area.name}`);
        radioSelect.setAttribute("value", index);
        radioSelect.setAttribute("class", "radioArea");
        radioSelect.setAttribute("onChange", "changeArea(this.value)");
        if (index == playerStats.currentArea) radioSelect.setAttribute("checked", "checked");
        d.append(radioSelect);
        l = document.createElement('label');
        l.setAttribute("class", "radioAreaLabel");
        l.setAttribute("for", `${area.name}`);
        l.style.backgroundImage = `url(${area.background})`;
        l.innerHTML = area.name;
        dGradient = document.createElement('div');
        dGradient.setAttribute("class", "radioAreaGradient");
        d.append(dGradient);
        d.append(l);
        //console.log("Area unlock requirement: ",area.storyUnlock, "Story:",getStoryQuest(playerStats.storyProgress).title)
    }
}
function resetStoryline() {
    playerStats.storyProgress = 0;
    playerStats.currentStoryQuestProgress = [0];
    updateStoryQuest();
}

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
        checkAreaUnlocks();
        updateDiaryEntries();
    }
    let textBox = document.getElementById("storyText");
    let overviewText = document.getElementById("storyRequirementsOverviewText");
    textBox.innerHTML = storyQuestText(playerStats.storyProgress);
    overviewText.innerHTML = storyRequirementsText(playerStats.storyProgress);

}

function storyQuestText(progress, diary=false) {
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
    return `${quest.title}<br /><br />${quest.text}<br /><br />${(diary? "":requirementsString)}`;
}
function storyRequirementsText(progress) {
    let quest = getStoryQuest(progress);
    let requirementsString = "";
    switch (quest.requirementType) {
        case 'defeat':
            for (let index = 0; index < quest.requirementTarget.length; index++) {
                requirementsString += `Defeat ${enemyData[quest.requirementTarget[index]].name}: ${playerStats.currentStoryQuestProgress[index]}/${quest.requirementAmount[index]} `;
            }
            break;
        case 'training':
            for (let index = 0; index < quest.requirementTarget.length; index++) {
                requirementsString += `Get to ${format(playerStats.currentStoryQuestProgress[index])}/${quest.requirementAmount[index]} <span class="${quest.requirementTarget[index]}Text">${attributeDisplayNames[quest.requirementTarget[index]]}</span> `;
            }
            break;
        case 'level':
            requirementsString = `Get to level ${format(playerStats.level)}/${quest.requirementAmount[0]}`;
            break;
        case 'none':
            requirementsString = "Congratulations! You reached the end of current content.";
            break;
        default:
            requirementsString = "ERROR: unkown quest requirement";
            break;
    }
    return `${requirementsString}`;
}

function updateDiaryEntries(){
    let container = document.getElementById("diaryEntries");
    container.innerHTML = "";
    for (let index = 0; index < playerStats.storyProgress; index++) {
        let quest = getStoryQuest(index);
        let b = document.createElement("button");
        b.setAttribute("onclick",`updateDiaryText(${index})`);
        b.setAttribute("class","diaryButton");
        b.innerHTML = quest.title;
        container.append(b);
    }
}

function updateDiaryText(progress){
    let container = document.getElementById("diaryText");
    container.innerHTML = storyQuestText(progress,diary=true);
}