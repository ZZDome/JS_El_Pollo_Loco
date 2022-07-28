class Air{
    x = 0;
    y = 0;
    height = 480;
    width = 730;
    img;

    constructor(){
        this.loadImage('../img/5_background/layers/air.png')
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
}