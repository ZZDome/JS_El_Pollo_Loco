class MovableObject{
    x = 30;
    y = 30;
    width = 150;
    height = 300;
    img;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
}