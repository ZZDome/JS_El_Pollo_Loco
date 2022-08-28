class Chicken extends MovableObject {
    x = 300 + Math.random() * 2000;
    y = 350;
    offsetX = 0;
    offsetY = 0;
    height = 70;
    width = 70;

    AUDIO_CHICKENBG = new Audio('audio/chicken-background.mp3');
    AUDIO_HURT = new Audio('audio/chicken-scream.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD)
        this.animateWalk();
        this.animate();
        this.AUDIO_HURT.volume = 0.1;
        this.AUDIO_CHICKENBG.volume = 0.01;
        this.AUDIO_CHICKENBG.loop = true;
        this.AUDIO_CHICKENBG.play();
    }

    animate(){
        let indexHurt = 0;
        setInterval(() => {
            if(this.isDead()){
                this.isAlive = false;
                if(indexHurt == 0){
                    this.AUDIO_HURT.play();
                    indexHurt++
                }
            }else{
                this.x -= 0.40 * this.speed;
            }
        }, 1000 / 60);
    }

    animateWalk(){
        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            }else{
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }
}