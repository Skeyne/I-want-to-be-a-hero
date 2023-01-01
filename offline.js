function calculateOfflineTime() {
    let lastTime = playerStats.lastSaveTime;
    let milliseconds = Date.now() - lastTime;
    let seconds = milliseconds / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    if (minutes >= 1) {
        document.getElementById("offlineProgressPopup").style.display = 'block';
        calculateOfflineProgress(minutes);
    }
}
if (justLoaded == true) {
    calculateOfflineTime();
}

function calculateOfflineProgress(minutes) {
    let hoursDisplay = Math.floor(minutes / 60);
    let minutesDisplay = Math.floor(minutes - hoursDisplay * 60);
    let secondsDisplay = Math.floor((minutes - hoursDisplay * 60 - minutesDisplay) * 60);
    const activity = activities[playerStats.currentActivity]
    const attributeReward = activity.RewardPerPlayerLevel;
    const completionsPerMinute = 60000 / activity.timeToComplete;
    let textElement = document.getElementById("offlineProgressText");
    let text = `<br>You were offline for ${Math.floor(hoursDisplay)}h${Math.floor(minutesDisplay)}m${Math.floor(secondsDisplay)}s<br>You got: <br>`
    minutes = Math.min(minutes, 60 * 4);
    minutes /= 2;
    if (activity.cost > 0) {
        if (activity.cost * completionsPerMinute * minutes > playerStats.money) {
            minutes = playerStats.money/(activity.cost * completionsPerMinute);
            hoursDisplay = Math.floor(minutes / 60);
            minutesDisplay = Math.floor(minutes - hoursDisplay * 60);
            secondsDisplay = Math.floor((minutes - hoursDisplay * 60 - minutesDisplay) * 60);
            text += `(Ran out of money after ${Math.floor(hoursDisplay)}h${Math.floor(minutesDisplay)}m${Math.floor(secondsDisplay)}s <br>`
        }
    }
    for (let index = 0; index < attributeReward.length; index++) {
        let amount = playerStats.level * completionsPerMinute * minutes * attributeReward[index];
        playerStats[attributeIndexToId[index]] = Math.max(playerStats.permanentAttributes[index],playerStats[attributeIndexToId[index]]+amount);
        text += `<span class="${attributeIndexToId[index]}Text">
        ${attributeDisplayShort[attributeIndexToId[index]]}:${format(amount)}
        </span><br>`;
    }
    playerStats.money = Math.max(0,playerStats.money - activity.cost * completionsPerMinute * minutes);
    textElement.innerHTML = text;
}