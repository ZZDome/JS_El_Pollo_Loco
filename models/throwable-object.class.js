class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;
    offsetX = 30;
    offsetY = 100;
    speedX = 5;
    speedY = 10;


    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    constructor(charX, charY, charSpeedX){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.throw(charX, charY, charSpeedX);
    }

    throw(x, y, charSpeedX){
        this.x = x + this.offsetX;
        this.y = y + this.offsetY;
        this.applyGravity();
        this.moveX(charSpeedX);
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 1000 / 10);
    }

    moveX(charSpeedX){
        setInterval(() => {
            this.x += this.speedX + charSpeedX;
        }, 1000 / 60);
    }
}