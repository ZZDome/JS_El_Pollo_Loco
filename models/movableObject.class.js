class MovableObject extends DrawableObject {
    speed = Math.random();
    world;
    otherDirection = false;
    speedY = 0;
    accelertion = 1;
    health = 100;
    died = false;
    lastHit = 0;

    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit(){
        this.health -= 5;
        if (this.health < 0){
            this.health = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    isDead(){
        return this.health == 0;
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
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
        if(this instanceof ThrowableObject){
            return true;
        }else{
            return this.y < 175;
        }
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}