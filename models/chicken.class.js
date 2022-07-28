class Chicken extends MovableObject {
    x = 300 + Math.random() * 500;
    y = 350;
    height = 100;
    width = 100;

    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    }
}