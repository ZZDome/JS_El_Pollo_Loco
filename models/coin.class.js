class Coin extends MovableObject {
    x = Math.random() * 2000;
    y = 80 + Math.random() * 200;
    width = 80;
    height = 80;
    offsetX = 50;
    offsetY = 50;

    AUDIO_COIN = new Audio('audio/coin.mp3');
    

    IMAGES = [
        'img/8_coin/coin_1.png',        
        'img/8_coin/coin_2.png'
    ]

    constructor(){
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES);
        this.animate();
        this.AUDIO_COIN.volume = 0.3;
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 1000 / 5);
    }

    play(){
        this.AUDIO_COIN.play();
        setTimeout(() => {
            this.AUDIO_COIN.pause();
        }, 2000);
    }
}