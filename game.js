let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');/* 
    world = new World(canvas, keyboard); */
    document.getElementById('startScreen').classList.remove('hide');
}

function play() {
    document.getElementById('startScreen').classList.add('hide');
    document.getElementById('canvas').classList.remove('hide');
    setLevel1();
    world = new World(canvas, keyboard);

}

function stop() {
    setTimeout(() => {
        document.getElementById('startScreen').classList.remove('hide');
        deleteLevel();
    }, 2000);

}

function fullscreen(element) {
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('header').classList.add('hide');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }

}

window.addEventListener('keydown', (e) => {
    keyboard.keyPressed(e);
});

window.addEventListener('keyup', (e) => {
    keyboard.keyNotPressed(e);
});