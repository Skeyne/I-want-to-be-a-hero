var audio = document.getElementById("audioSource");
var slide = document.getElementById('volumeSlider');
slide.value = playerStats.musicVolume * 100;
audio.vol = slide.value;
const tryToPlay = setInterval(() => {
    audio.play()
        .then(() => {
            clearInterval(tryToPlay);
            console.info('Successful play().');
            audio.loop = true;
            audio.muted = false;
            audio.volume = 0;
            if (playerStats.muted) {
                audio.pause();
            } else {
                fadeInAudio(playerStats.musicVolume);
            }

        })
        .catch(error => {
            //console.info('User has not interacted with document yet.');
        });
}, 1000);
async function fadeInAudio() {
    audio.play();
    playerStats.muted = false;
    audio.muted = false;
    audio.volume = 0;
    while (audio.volume < playerStats.musicVolume) {
        audio.volume += 0.005
        audio.volume = Math.min(1, audio.volume);
        await new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 100);
        });
    }
    audio.volume = playerStats.musicVolume;
    playerStats.musicVolume = audio.volume;
}
async function fadeOutAudio(target) {
    let vol = audio.volume;
    while (vol > target) {
        vol -= 0.02;
        audio.volume = Math.max(0, vol);
        await new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 100);
        });
    }
    audio.pause();
    playerStats.muted = true;
    audio.muted = true;
}
function toggleMusic() {
    if (audio.paused) {
        fadeInAudio(playerStats.musicVolume);
    } else {
        fadeOutAudio(0);
    }
}
function setVolume(value) {
    playerStats.musicVolume = value / 100;
    audio.volume = playerStats.musicVolume;
}