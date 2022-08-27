class MovableObject extends DrawableObject {
    speed = Math.random();
    world;
    otherDirection = false;
    speedY = 0;
    accelertion = 1;
    health = 100;
    died = false;
    lastHit = 0;
    isAlive = true;
    alert = false;
    fall = false;

    isColliding(mo){
        return (this.x + this.offsetX) + (this.width - this.offsetX) > (mo.x + mo.offsetX) &&
            (this.y + this.offsetY) + (this.height - this.offsetY) > (mo.y + mo.offsetY) &&
            (this.x + this.offsetX) < (mo.x + mo.offsetX) + (mo.width - mo.offsetX) &&
            (this.y + this.offsetY) < (mo.y + mo.offsetY) + (mo.height - mo.offsetY);
    }

    hit(lifePoints){
        this.health -= lifePoints;
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
            if(this.isAboveGround() || this.speedY > 0 || !this.isAlive){
                this.y -= this.speedY;
                this.speedY -= this.accelertion; 
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        if(this instanceof Endboss && !this.fall){
            return this.y < 0;
        }else if(this instanceof ThrowableObject){
            return this.y < 380;
        }else if(this.fall){
            return this.y < 2000;
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