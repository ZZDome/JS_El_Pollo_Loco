let canvas;
let world;
let keyboard;
let currentLevel = 1;


function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.remove('hide');
    btnTouch();
}

function play() {
    document.getElementById('startScreen').classList.add('hide');
    document.getElementById('gameOverScreen').classList.add('hide');
    setLevel();
    world.play(playLevel());
    world.startScreen = false;
}

function restart(){
    currentLevel = 1;
    mute(0);
    world.stopAudio();
    init();
    document.getElementById('gameOverScreen').classList.add('hide');
}

function nextLevel(){
    currentLevel = currentLevel + 1;
    mute(0);
    world.stopAudio();
    init();
    document.getElementById('victoryScreen').classList.add('hide');
}

function setLevel(){
    if(currentLevel == 1){
        setLevel1();
        document.getElementById('currLVL'). innerHTML = `Level 1`;
    }else if(currentLevel == 2){
        setLevel2();
        document.getElementById('currLVL'). innerHTML = `Level 2`;
    }else{
        setLevel1();
        document.getElementById('currLVL'). innerHTML = `Level 1`;
    }
}

function playLevel(){
    if(currentLevel == 1){
        return level1;
    }else if(currentLevel == 2){
        return level2;
    }else{
        return level1;
    }
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
    document.getElementById('controls').classList.add('hide');
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
    document.getElementById('controls').classList.remove('hide');
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

function mute(value){
    if(value == 1){
        world.stopAudio();
        document.getElementById('muteOff').classList.remove('hide');
    document.getElementById('muteOn').classList.add('hide');
    }else if(value == 0){
        world.playAudio();
        document.getElementById('muteOn').classList.remove('hide');
    document.getElementById('muteOff').classList.add('hide');
    }
}

window.addEventListener('keydown', (e) => {
    keyboard.keyPressed(e);
});

window.addEventListener('keyup', (e) => {
    keyboard.keyNotPressed(e);
});

function btnTouch(){
    document.getElementById('moveLeft').addEventListener('touchstart', (e) => {
        keyboard.touch('left', true);
    });
    
    document.getElementById('moveLeft').addEventListener('touchend', (e) => {
        keyboard.touch('left', false);
    });

    document.getElementById('moveRight').addEventListener('touchstart', (e) => {
        keyboard.touch('right', true);
    });
    
    document.getElementById('moveRight').addEventListener('touchend', (e) => {
        keyboard.touch('right', false);
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        keyboard.touch('jump', true);
    });
    
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        keyboard.touch('jump', false);
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        keyboard.touch('throw', true);
    });
    
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        keyboard.touch('throw', false);
    });
}
