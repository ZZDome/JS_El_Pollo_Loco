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
    health = 100;
    died = false;

    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit(){
        console.log('colliding', this.health)
        this.health -= 5;
        if (this.health < 0){
            this.health = 0;
        }
    }

    isDead(){
        return this.health == 0;
    }

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