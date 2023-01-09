function prestigeSoftCaps() {
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        if (softcapped >= softcap) {
            console.log(`${attributeIndexToId[index]} Softcap:${softcap} Softcapped:${softcapped}`)
            playerStats.permanentSoftcaps[index] += (PRESTIGE_SOFTCAP_RATE * softcap + Math.max(0, softcapped - softcap) * PRESTIGE_SOFTCAP_OVERCAP_RATE);
        } else {
            continue;
        }
    }
}
function prestigeAttributes() {
    playerStats.permanentAttributes[0] = (playerStats.attributeSoftcaps[0] + playerStats.permanentSoftcaps[0]) * PRESTIGE_ATTRIBUTE_RATE;
    playerStats.permanentAttributes[1] = (playerStats.attributeSoftcaps[1] + playerStats.permanentSoftcaps[1]) * PRESTIGE_ATTRIBUTE_RATE;
    playerStats.permanentAttributes[2] = (playerStats.attributeSoftcaps[2] + playerStats.permanentSoftcaps[2]) * PRESTIGE_ATTRIBUTE_RATE;
    playerStats.permanentAttributes[3] = (playerStats.attributeSoftcaps[3] + playerStats.permanentSoftcaps[3]) * PRESTIGE_ATTRIBUTE_RATE;
}
function attributePrestige() {
    if(!canAttributePrestige()) {logConsole("You have no capped attributes!"); return;}
    else {let c = confirm('Are you sure you want to prestige?'); if (!c){return}}
    prestigeSoftCaps();
    prestigeAttributes();
    playerStats.strength = playerStats.permanentAttributes[0];
    playerStats.toughness = playerStats.permanentAttributes[1];
    playerStats.mind = playerStats.permanentAttributes[2];
    playerStats.agility = playerStats.permanentAttributes[3];
    updateAttributePrestigeText();
}
function canAttributePrestige() {
    let can = false;
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        if (softcapped >= softcap) {
            can = true;
        } else {
        }
    }
    return can;
}

function updateAttributePrestigeText(){
    let container = document.getElementById("attributePrestigeText");
    let text = "";
    for (let index = 0; index < 4; index++) {
        const softcap = playerStats.attributeSoftcaps[index] + playerStats.permanentSoftcaps[index];
        const softcapped = formulas.softcappedAttribute(index);
        const change = softcapped>=softcap ? ((PRESTIGE_SOFTCAP_RATE * softcap + Math.max(0, softcapped - softcap) * PRESTIGE_SOFTCAP_OVERCAP_RATE)) : 0;
        text += `${attributeDisplayShort[attributeIndexToId[index]]}: <span class="${attributeIndexToId[index]}Text">${format(softcap)}</span> -> <span class="${attributeIndexToId[index]}Text">${format(softcap+change)}</span> (+${format(change)})<br>`
    }
    container.innerHTML = text;
}
updateAttributePrestigeText();