class MovableObject{
    x = 30;
    y = 150;
    width = 150;
    height = 300;
    img;
    imageCache = {};
    currentImage = 0;
    speed = Math.random();
    world;
    otherDirection = false;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }
}