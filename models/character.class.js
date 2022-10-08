class Character extends MovableObject {
    x = 30;
    y = 75;
    offsetY = 100;
    height = 250;
    width = 100;
    speed = 4;
    speedX = 0;
    coins = 0;
    bottles = 20;
    sleep = false;
    jumping = false;

    AUDIO_WALKING = new Audio('audio/walking.mp3');
    AUDIO_JUMP = new Audio('audio/jump.mp3');
    AUDIO_HURT = new Audio('audio/pepe-hurt.mp3');


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-43.png',
        'img/2_character_pepe/4_hurt/H-42.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animateWalk();
        this.AUDIO_JUMP.volume = 0.5;
    }

    animateWalk() {
        setInterval(() => {
            this.AUDIO_WALKING.pause();
            this.speedX = 0;
            this.checkMove();
            this.isJumping();
            this.world.camaraX = -this.x + 100;
        }, 1000 / 60);
        this.animateHurt();
        this.animateDead();
        this.animateJump();
        this.animateIdle();
    }

    checkMove(){
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
        };
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
        };
        if (this.world.keyboard.UP && !this.isAboveGround() && !this.jumping) {
            this.jump();
        }
    }

    moveRight(){
        this.x += this.speed;
        this.speedX = this.speed;
        this.otherDirection = false;
        if (!this.isAboveGround() && !this.isMute()) {
            this.AUDIO_WALKING.play();
        }
    }

    moveLeft(){
        this.x -= this.speed;
        this.speedX = this.speed;
        this.otherDirection = true;
        if (!this.isAboveGround() && !this.isMute()) {
            this.AUDIO_WALKING.play();
        }
    }

    jump(){
        this.jumping = true;
        this.speedY = 28;
        if(!this.isMute()){
            this.AUDIO_JUMP.play();
        }
    }

    isJumping(){
        if(!this.isAboveGround()){
            this.jumping = false;
        }else{
            this.jumping = true;
        }
    }

    animateHurt(){
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if(!this.isMute()){
                    this.AUDIO_HURT.play();
                }
            } else if (this.world.keyboard.RIGHT && !this.isAboveGround() || this.world.keyboard.LEFT && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);
    }

    animateDead(){
        setInterval(() => {
            if (this.isDead()) {
                this.isAlive = false;
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 100);
    }

    animateJump(){
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            }
        }, 200);
    }

    animateIdle(){
        setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.SPACE && !this.world.keyboard.DOWN && this.isAlive && !this.jumping) {
                if (!this.sleep) {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 1000 / 5);
    }

}