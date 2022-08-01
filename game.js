let canvas;
let world;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    console.log(e);
    keyboard.keyPressed(e);
});

window.addEventListener('keyup', (e) => {
    console.log(e);
    keyboard.keyNotPressed(e);
});