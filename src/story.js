const storyQuests = [
    {
        title: `The Beginning I`,
        text: `You've had enough. Every year crime is up and yet the city council does nothing about it.
        The corruption runs deep. It's time for change. <br><br> (Tabs found on the left.)`,
        requirementType: 'area',
        requirementTarget: [`alley1`],
        requirementAmount: [1],
    },
    {
        title: `The Beginning II`,
        text: `OW. Ok. OW. Ok that wasn't so easy. Maybe you should train up a bit first.`,
        requirementType: 'area',
        requirementTarget: [`streets1`],
        requirementAmount: [1, 1]
    },
    {
        title: `The Beginning III`,
        text: `Time to fight crime`,
        requirementType: 'area',
        requirementTarget: [`streets2`],
        requirementAmount: [1],
    },
    {
        title: `The Beginning IV`,
        text: `I should work on my skills so I can take down criminals more effectively.`,
        requirementType: 'area',
        requirementTarget: [`streets3`],
        requirementAmount: [1],
    },
    {
        title: `Streetfights V`,
        text: `Time to take out the whole gang.`,
        requirementType: 'area',
        requirementTarget: [`streets4`],
        requirementAmount: [1],
    },
    {
        title: `Vigilante I`,
        text: `You heard a loud bang coming from the maximum security prison. You should probaby check it out. As you get to the bridge you see dozens of prisoners running from the direction of the prison. Stop them!`,
        requirementType: 'area',
        requirementTarget: [`bridge1`],
        requirementAmount: [1],
    },
    {
        title: `Vigilante II`,
        text: `After taking down some of the escaped prisoners you finally get near. Now you can see green fumes streaming from somewhere in the compoud. As you enter the courtyard a very large prisoner blocks your way.`,
        requirementType: 'area',
        requirementTarget: [`prison1`],
        requirementAmount: [1],
    },
    {
        title: `Vigilante III`,
        text: `After taking down the oversized brute, you follow the fumes to some exhaust chimneys and a hatch that leads underground.
             The prisoners must have rioted and broken in. Eager to be the hero, you jump in. You find yourself at the start of some sort of underground transit. Odd, you can't think why the prison needs such a large underground complex.
             A few paces in you spot some prison guards stood with some knocked out prisoners at their feet . Thinking they must have got it under control you start to turn back but they spot you. 'HEY! That one got through'.
             'Got through?' you think, but you came from outside. Before you can question it any longer they start to advance on you.`,
        requirementType: 'area',
        requirementTarget: [`prison2`],
        requirementAmount: [1],
    },
    {
        title: `Vigilante IV`,
        text: `After knocking out the guards, you notice that the prisoners they had knocked have a green-ish tint to their skin.
        'It must be the lighting' you think, but as you get closer to re-assure yourself, other similar prisoners emerge stumbling from a side corridor,and they look rather strange.`,
        requirementType: 'area',
        requirementTarget: [`prison3`],
        requirementAmount: [1],
    },
    {
        title: `Vigilante V`,
        text: `Needing to know what is happening, you fight your way through the underground tunnel, and find a heavy door that leads into a room. You seem to be in a lab. You see vats, some broken, with a similarly coloured green liquid splashed around them. Some, with- people? - still inside. In the shock at seeing this, you barely dodge out of the way as a massive blade swings from the side. From the shadows a massive disfigured prisoner appears. Did he cause all of this?`,
        requirementType: 'area',
        requirementTarget: [`prison4`],
        requirementAmount: [1],
    },
    {
        title: `Vigilante VI`,
        text: `You wake up on the floor of the lab. You remember fighting the monstrosity, and as you ducked under another blade swing it smashed
         a vat next to you, and the liquid inside poured over you. You remember screaming in pain and not much else. Looking around,
          the monstrosity seems to be gone. You feel weak, like all the training you've done the past months has been sapped from you.
          But you also feel something else, new potential, like you fell off a tower, and when you look up, the tower is even higher.`,
        requirementType: 'class',
        requirementTarget: [`Pick your class:
        <button class="classButton" style="margin:2%" onclick="changeClass('superhuman')">Superhuman</button>
        <button class="classButton" style="margin:2%" onclick="changeClass('mutant')">Mutant</button>
        <button class="classButton" style="margin:2%" onclick="changeClass('esper')">Esper</button>
        <button class="classButton" style="margin:2%" onclick="changeClass('ninja')">Ninja</button>`],
        requirementAmount: [1],
    },
    {
        title: `A New Beginning I`,
        text: `Escaping the prison before the police shows up, you return to your routine. You are weak but as you get into fight after fight you notice that your body is changing, faster, stronger than it should be.
        And soon you start to notice even greater changes. What the hell were they doing in that lab, and where did that monster go? You need to start recovering your strength for next time he shows up.`,
        requirementType: 'area',
        requirementTarget: [`mafia1`],
        requirementAmount: [1],
    },
    {
        title: `A New Beginning II`,
        text: `Ever since the prison incident, crime in the city has continued to grow. There are reports of bizarre accidents and unusual individuals. In the meanwhile, the mafia has continued to expand in your neighbourhood. You think that with these new powers you can put up a fight.`,
        requirementType: 'area',
        requirementTarget: [`mafia2`],
        requirementAmount: [1],
    },
    {
        title: `A New Beginning III`,
        text: `You keep beating up these thugs but there is a mastermind organizing them, if he doesn't go down this won't stop. If I keep taking down his henchmen closer to his territory he'll show up`,
        requirementType: 'area',
        requirementTarget: [`mafia3`],
        requirementAmount: [1],
    },
    {
        title: `A New Beginning IV`,
        text: `After beating up the Don you question him about his henchman and the crates in the warehouse. He tells you, 'You don't even know what's coming... if you find them they'll take care of you.. he.. he.. hugh' before exhaling the last breath. Inspecting some of the crates you recognize out that they're from one of the companies in the old abandoned industrial zone. You take some of the vials for yourself, destroying the rest, and decide to investigate the crate's origin in the industrial zone next.`,
        requirementType: 'area',
        requirementTarget: [`mafia4`],
        requirementAmount: [1],
    },
    {
        title: `A New Beginning V`,
        text: `It's now pretty clear that those vials are the same liquid as that from the lab, and that the Don had been smuggling it and using it within his mafia. But how did he get his hands on it? As you're making your way through a scrapyard pondering this, you hear a whistle in the air, and suddenly a shockwave impact from something falling launches a cloud of dust in into the air. As the dust dissipates you see what seems to be one of the Don's street thugs. He says 'We were supposed to wait for you at the Steelworks but I got a bit ahead of myself", eyes you up and grins`,
        requirementType: 'area',
        requirementTarget: [`industrial3`],
        requirementAmount: [1],
    },
    {
        title: `A New Beginning VI`,
        text: `After taking care of that smug thug you head over to the Steelworks, anticipating another fight. As you knock the warehouse door down you find inside a distillery, which seems to be making the same 'Y' you found in crates in the Don's warehouse. And a lot, a LOT of mafia henchmen inside.`,
        requirementType: 'area',
        requirementTarget: [`industrial5`],
        requirementAmount: [1],
    },
    {
        title: `A New Beginning VII`,
        text: `After the warehouse raid, you destroyed of the rest of the Y found there, putting a stop to the mafia's nefarious goals, but also coming to the end of the trail.
        But the fact still lies that it is being produced somewhere and being shipped into the city . Meanwhile you continue your daily vigilante activities.
        One day while walking the streets you hear a woman running from the direction of the riverside, yelling, "A MONSTER! A MONSTER CAME OUT OF THE RIVER! HE'S KILLING EVERYONE!". This must be him. This time I won't lose.`,
        requirementType: 'area',
        requirementTarget: [`industrial6`],
        requirementAmount: [1],
    },
    {
        title: `Prologue.. For now`,
        text: `This is the end of the demo. Hope you enjoyed it. If you have feedback drop it in the Discord, and if you want more, get the fullversion! Thanks for playing`,
        requirementType: 'area',
        requirementTarget: [`city5`],
        requirementAmount: [1],
    },

];
const endOfStoryQuest = {
    title: `The End So Far`,
    text: `You did it. This is the end of the content so far.<br><br>Congratulations!<br><br> Feel free to keep on playing. <br>
    There's also a final area 'The Depths' with an exceptionally unfair encounter if you fancy grinding more.
    <br>
    `,
    requirementType: `none`,
    requirementTarget: [1],
    requirementAmount: [1],
};

if (isOutdated) {
    if (lastVersion.substr(0, 4) == '0.02') {

        if (playerStats.storyProgress >= 13) playerStats.storyProgress = 13; updateStoryQuest();
    }
}
var areaSelect = document.getElementById("selectArea");
var areaButtonDict = {};


function checkTabUnlocks() {
    if (playerStats.areaCompletions["streets3"] >= 10) {
        document.getElementById("fameBox").style.visibility = 'visible';
        document.getElementById(`${tabNames[5]}TabButton`).setAttribute("class", "sidebarButton pickle");
    } else {
        document.getElementById("fameBox").style.visibility = 'hidden';
    }
    if (playerStats.areaCompletions["mafia4"] >= 1) {
        document.getElementById("prestigeBox").style.visibility = 'visible';
        document.getElementById(`${tabNames[6]}TabButton`).setAttribute("class", "sidebarButton pickle");
    } else {
        document.getElementById("prestigeBox").style.visibility = 'hidden';
    }
    if (playerStats.areaCompletions["industrial6"] >= 1) {
        document.getElementById("prestigeTabHeader").getElementsByClassName("prestigePanelTab")[0].style.display = '';
        document.getElementById("prestigeTabHeader").getElementsByClassName("prestigePanelTab")[1].style.display = '';
    } else {
        document.getElementById("prestigeTabHeader").getElementsByClassName("prestigePanelTab")[0].style.display = 'none';
        document.getElementById("prestigeTabHeader").getElementsByClassName("prestigePanelTab")[1].style.display = 'none';
    }
    if (playerStats.storyProgress > 18 && playerStats.classPrestige < 1) {
        console.log('test');
        flashTabButton(tabNames.indexOf('prestige'));
    }
}
function checkAreaUnlocks() {
    areaSelect.innerHTML = "";
    areaButtonDict = {};
    for (let index = 0; index < areas.length; index++) {
        let area = areas[index];
        let d = document.createElement('div');
        d.addEventListener('click', () => {
            document.getElementById(`areaButton_${currentArea.id}`).classList.toggle('active');
            changeArea(index)
            document.getElementById(`areaButton_${currentArea.id}`).classList.toggle('active');
        })
        d.id = `areaButton_${area.id}`;
        d.classList.add('areaButton');
        d.style.backgroundImage = `linear-gradient(180deg,transparent ,rgba(0,0,0,.7) 25% 75%,transparent),url(resources/backgroundImages/${area.background})`;
        d.innerHTML = area.displayText;
        if (index == playerStats.currentArea) { d.classList.toggle('active') }
        areaButtonDict[area.id] = d;
        areaSelect.append(d);
        if (!(playerStats.areaCompletions[area.id] >= area.completionsReq)) {
            break;
        }
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
function sanityCheckStory() {
    let done = false;
    while (!done) {
        let quest = getStoryQuest(playerStats.storyProgress);
        //console.log(quest);
        //console.log(quest);
        if (quest.requirementType != 'area') { done = true; playerStats.currentStoryQuestProgress = Array(getStoryQuest(playerStats.storyProgress).requirementTarget.length).fill(0);return; }
        for (let index = 0; index < quest.requirementTarget.length; index++) {
            if (playerStats.areaCompletions[quest.requirementTarget[index]] >= quest.requirementAmount[index]) {
                playerStats.currentStoryQuestProgress[index] += 1;
                playerStats.storyProgress += 1;
            } else {
                playerStats.currentStoryQuestProgress = Array(getStoryQuest(playerStats.storyProgress).requirementTarget.length).fill(0);
                done = true;
            }
        }
    };
}
function checkAreaQuest() {
    let quest = getStoryQuest(playerStats.storyProgress);
    if (quest.requirementType != 'area') return false;
    for (let index = 0; index < quest.requirementTarget.length; index++) {
        if (playerStats.areaCompletions[quest.requirementTarget[index]] >= quest.requirementAmount[index]) {
            playerStats.currentStoryQuestProgress[index] += 1;
        } else {
            return false;
        }
    }
    updateStoryQuest();
    return true;
}
function checkClassQuest() {
    let quest = getStoryQuest(playerStats.storyProgress);
    if (quest.requirementType != 'class') return false;
    if (playerStats.class == 'human') return false;
    for (let index = 0; index < quest.requirementTarget.length; index++) {
        playerStats.currentStoryQuestProgress[index] += 1;
    }
    updateStoryQuest();
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
    if (playerStats.currentStoryQuestProgress.length != quest.requirementTarget.length) { playerStats.currentStoryQuestProgress = Array(getStoryQuest(playerStats.storyProgress).requirementTarget.length).fill(0); }
    for (let index = 0; index < quest.requirementTarget.length; index++) {
        console.log(playerStats.currentStoryQuestProgress[index], quest.requirementAmount[index])
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
        checkTabUnlocks();
        updateDiaryEntries();
        flashTabButton(tabNames.indexOf('story'));
    }
    let textBox = document.getElementById("storyText");
    let overviewText = document.getElementById("storyRequirementsOverviewText");
    textBox.innerHTML = storyQuestText(playerStats.storyProgress);
    overviewText.innerHTML = storyRequirementsText(playerStats.storyProgress);

}
function storyQuestText(progress, diary = false) {
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
        case 'class':
            requirementsString = quest.requirementTarget[0];
            break;
        case 'area':
            requirementsString = "";
            break;
        case 'none':
            requirementsString = "";
            break;
        default:
            requirementsString = "ERROR: unkown quest requirement";
            break;
    }
    return `${quest.title}<br /><br />${quest.text}<br /><br />${(diary ? "" : requirementsString)}`;
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
        case 'class':
            requirementsString = quest.requirementTarget[0];
            break;
        case 'area':
            requirementsString = "";
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
function updateDiaryEntries() {
    let container = document.getElementById("diaryEntries");
    container.innerHTML = "";
    for (let index = 0; index < playerStats.storyProgress; index++) {
        let quest = getStoryQuest(index);
        let b = document.createElement("button");
        b.setAttribute("onclick", `updateDiaryText(${index})`);
        b.setAttribute("class", "diaryButton");
        b.innerHTML = quest.title;
        container.append(b);
    }
}
function updateDiaryText(progress) {
    let container = document.getElementById("diaryText");
    container.innerHTML = storyQuestText(progress, diary = true);
}