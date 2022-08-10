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
    speedY = 0;
    accelertion = 1;

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.accelertion; 
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 175;
    }

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

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}