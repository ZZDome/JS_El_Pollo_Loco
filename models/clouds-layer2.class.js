class CloudLayer2 extends MovableObject {
    x = 0 + Math.random() * 500;
    y = 140;
    height = 150;
    width = 250;

    constructor(x){
        super().loadImage('../img/5_background/layers/4_clouds/1.png')
        this.x = x;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= 0.10 * this.speed;
        }, 1000 / 60);
    }
}