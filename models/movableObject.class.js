class MovableObject{
    x = 30;
    y = 150;
    width = 150;
    height = 300;
    img;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
}