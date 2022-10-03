class Endboss extends MovableObject {
    x = 2200;
    y = 50;
    height = 400;
    width = 250;
    fighting = false;
    attacking = false;
    characterAlive = true;
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

    AUDIO_ALERT = new Audio('audio/boss-alert.mp3');
    AUDIO_HURT = new Audio('audio/boss-hurt.mp3');
    AUDIO_ATTACK = new Audio('audio/boss-attack.mp3');
    AUDIO_DEAD = new Audio('audio/boss-dead.mp3');

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
        this.AUDIO_ALERT.volume = 0.5;
        this.AUDIO_HURT.volume = 0.5;
        this.AUDIO_ATTACK.volume = 0.5;
        this.AUDIO_DEAD.volume = 0.5;
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
            if (!this.isDead()) {
                this.attacking = true;
                this.speedY = 25;
            }
        }, 1000 * Math.random() + 3000);
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
                this.speedY = 30;
                this.fall = true;
            } else if (this.attacking && this.fighting && this.isAlive && this.isAboveGround()) {
                this.x -= 5;
            } else if (this.isAlive && this.fighting && !this.attacking && this.isAboveGround()) {
                this.x += 5;
            }
        }, 1000 / 60);
    }

    animateWalk() {
        let imageDeadIndex = 0;
        this.walking();
        this.animateAttack();
        this.animateAlert();
        this.animateDead();
        this.animateHurt();
    }

    walking() {
        setInterval(() => {
            if (!this.alert && this.isAlive && !this.isHurt() && this.fighting && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    animateAttack() {
        setInterval(() => {
            if (this.attacking && !this.isHurt() && this.isAlive && this.fighting && this.isAboveGround() && this.characterAlive) {
                this.playAnimation(this.IMAGES_ATTACK);
                if (!this.isMute()) {
                    this.AUDIO_ATTACK.play();
                }
            }
        }, 120);
    }

    animateAlert() {
        setInterval(() => {
            if (this.alert) {
                this.playAnimation(this.IMAGES_ALERT);
                if (!this.isMute()) {
                    this.AUDIO_ALERT.play();
                }
            }
        }, 150);
    }

    animateHurt() {
        setInterval(() => {
            if (this.isHurt() && this.fighting) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.isMute()) {
                    this.AUDIO_HURT.play();
                }
            }
        }, 150);
    }

    animateDead() {
        setInterval(() => {
            if (this.isDead() && this.fighting) {
                this.isAlive = false;
                if (imageDeadIndex < 3) {
                    this.playAnimation(this.IMAGES_DEAD);
                    if (!this.isMute()) {
                        this.AUDIO_DEAD.play();
                    }
                } else {
                    this.loadImage(this.IMAGES_DEAD[2]);
                }
                imageDeadIndex++
            }
        }, 150);
    }

}