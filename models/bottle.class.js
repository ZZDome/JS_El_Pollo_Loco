class Bottle extends MovableObject {

    x = Math.random() * 2000;
    y = 380;
    width = 50;
    height = 50;

    AUDIO_BOTTLEPICK = new Audio('audio/bottle-pick.mp3');

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ]

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    }

    play(){
        if(!this.isMute()){
            this.AUDIO_BOTTLEPICK.play();
            setTimeout(() => {
                this.AUDIO_BOTTLEPICK.pause();
            }, 2000);
        } 
    }
}