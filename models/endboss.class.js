class Endboss extends MovableObject {
    x = 2200;
    y = 50;
    height = 400;
    width = 250;
    health = 500;
    fighting = false;
    attacking = false;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.applyGravity();
        this.animateWalk();
        this.animate();
    }

    alerted() {
        setTimeout(() => {
            this.alert = false;
            this.fight();
        }, 2000);
    }

    fight() {
        this.fighting = true;
        setInterval(() => {
            this.attacking = true;
            this.speedY = 15;
        }, 3000 * Math.random() + 3000);
    }

    pushBack(value) {
        setInterval(() => {
            this.x += value;
        }, 1000 / 60);
    }

    animate() {
        setInterval(() => {
            if (!this.alert && this.isAlive && this.fighting && !this.isAboveGround()) {
                this.x -= 0.40 * this.speed;
            } else if (!this.isAlive && !this.isAboveGround() && this.fighting) {
                this.pushBack(2);
                this.speedY = 20;
                this.fall = true;
            }else if(this.attacking && this.fighting && this.isAlive && this.isAboveGround()){
                this.x -= 5;
            }else if (this.isAlive && this.fighting && !this.attacking && this.isAboveGround()) {
                this.x += 5;
            }
        }, 1000 / 60);
    }

    animateWalk() {
        let imageDeadIndex = 0;
        setInterval(() => {
            if (!this.alert && this.isAlive && !this.isHurt() && this.fighting) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);

        setInterval(() => {
            if (this.alert) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 150);

        setInterval(() => {
            if (this.isDead() && this.fighting) {
                this.isAlive = false;
                if (imageDeadIndex < 3) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else {
                    this.loadImage(this.IMAGES_DEAD[2]);
                }
                imageDeadIndex++
            }
        }, 150);

        setInterval(() => {
            if (this.isHurt() && this.fighting) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 150);
    }

}