let canvas;
let world;
let keyboard;


function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.remove('hide');
}

function play() {
    document.getElementById('startScreen').classList.add('hide');
    document.getElementById('gameOverScreen').classList.add('hide');
    setLevel1();
    world.play(level1);
    world.startScreen = false;
}

function restart(){
    
    world.stopAudio();
    init();
    document.getElementById('gameOverScreen').classList.add('hide');
}

function nextLevel(){
    world.stopAudio();
    init();
    document.getElementById('victoryScreen').classList.add('hide');
}

function stop(element) {
    setTimeout(() => {
        document.getElementById(element).classList.remove('hide');
        if(element == 'gameOverScreen'){
            world.showGameOverScreen();
        }else{
            world.showVictoryScreen();
        }
        deleteLevel();
        world.character.isAlive = false;
    }, 2000);

}

function fullscreen(element) {
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('header').classList.add('hide');
    document.getElementById('fullscreenOn').classList.add('hide');
    document.getElementById('fullscreenOff').classList.remove('hide');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }

}

function offFullscreen(){
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('header').classList.remove('hide');
    document.getElementById('fullscreenOn').classList.remove('hide');
    document.getElementById('fullscreenOff').classList.add('hide');
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

window.addEventListener('keydown', (e) => {
    keyboard.keyPressed(e);
});

window.addEventListener('keyup', (e) => {
    keyboard.keyNotPressed(e);
});