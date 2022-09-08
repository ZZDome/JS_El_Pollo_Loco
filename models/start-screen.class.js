class StartScreen extends MovableObject{
    x = 0;
    y = 0;
    height = 480;
    width = 720;
    img;

    constructor(){
        super().loadImage('img/9_intro_outro_screens/start/startscreen_1.png')
    }

    /* loadImage(path){
        this.img = new Image();
        this.img.src = path;
    } */
}