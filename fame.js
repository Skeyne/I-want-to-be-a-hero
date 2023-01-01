sanityCheckFame();
var toNextFame = getNextFame(playerStats.fame);
checkFame();
function getNextFame(fame){
    return 100*Math.pow(fame,2);
}
function sanityCheckFame(){
    playerStats.fame = Math.floor(Math.sqrt(playerStats.reputation/100));
    document.getElementById("famePointText").innerHTML = playerStats.fame;
    document.getElementById("fameToNextText").innerHTML = toNextFame;
}
function checkFame(){
    if(playerStats.reputation >= toNextFame){
        playerStats.fame += 1;
        toNextFame = getNextFame(playerStats.fame);
        document.getElementById("famePointText").innerHTML = playerStats.fame;
        document.getElementById("fameToNextText").innerHTML = toNextFame;
    }
}

class FameUpgrade {
    constructor(data){
        this.data = data;
    }
    increment(){
        
    }
}