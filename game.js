let canvas;
let world;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');/* 
    world = new World(canvas, keyboard); */
    document.getElementById('startScreen').classList.remove('hide');
}

function play(){
    document.getElementById('startScreen').classList.add('hide');
    setLevel1();
    world = new World(canvas, keyboard);
    
}

function stop(){
    setTimeout(() => {
        document.getElementById('startScreen').classList.remove('hide');
        deleteLevel();
    }, 2000);
    
}

window.addEventListener('keydown', (e) => {
    keyboard.keyPressed(e);
});

window.addEventListener('keyup', (e) => {
    keyboard.keyNotPressed(e);
});