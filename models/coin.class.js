class Coin extends MovableObject {
    x = Math.random() * 2000;
    y = 180 + Math.random() * 100;
    width = 80;
    height = 80;


    IMAGES = [
        'img/8_coin/coin_1.png',        
        'img/8_coin/coin_2.png'
    ]

    constructor(){
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 1000 / 5);
    }
}