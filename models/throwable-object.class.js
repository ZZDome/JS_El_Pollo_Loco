class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;
    hitOffsetX = 30;
    hitOffsetY = 100;
    speedX = 5;
    speedY = 10;
    splash = false;

    AUDIO_SMASH = new Audio('audio/bottle-smash.mp3');
    

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',        
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(charX, charY, charSpeedX){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw(charX, charY, charSpeedX);
    }

    throw(x, y, charSpeedX){
        this.x = x + this.hitOffsetX;
        this.y = y + this.hitOffsetY;
        this.move(charSpeedX);
        setInterval(() => {
            if(this.splash || !this.isAboveGround()){
                this.playAnimation(this.IMAGES_SPLASH);
                this.playSmash();
            }else{
                this.playAnimation(this.IMAGES_THROW);
            }
        }, 1000 / 10);
    }

    playSmash(){
        this.AUDIO_SMASH.play();
        setTimeout(() => {
            this.AUDIO_SMASH.pause();
        }, 800);
    }

    move(charSpeedX){
        this.applyGravity();
        setInterval(() => {
            if(!this.splash && this.isAboveGround()){
                this.x += this.speedX + charSpeedX;
            }else{
                setTimeout(() => {
                    this.x = -200;
                }, 500);
            }
        }, 1000 / 60);
    }
}