class Cloud extends MovableObject {
    x = 0 + Math.random() * 500;
    y = 0;
    height = 300;
    width = 500;
    speed = Math.random();
    despawnX = 0 - this.width;

    constructor(){
        super().loadImage('../img/5_background/layers/4_clouds/1.png')
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= 0.20 * this.speed;
        }, 1000 / 60);
    }
}