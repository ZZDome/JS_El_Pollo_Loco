class Backgroundlayer1 extends MovableObject {
    x = 0;
    y = 0;
    height = 480;
    width = 720 * 2;

    constructor(x){
        super().loadImage('../img/5_background/layers/1_first_layer/full.png');
        this.x = x;
    }
}