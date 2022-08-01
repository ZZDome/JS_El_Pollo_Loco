class Backgroundlayer3 extends MovableObject {
    x = 0;
    y = 0;
    height = 480;
    width = 720 * 2;

    constructor(x){
        super().loadImage('../img/5_background/layers/3_third_layer/full.png');
        this.x = x;
    }
}