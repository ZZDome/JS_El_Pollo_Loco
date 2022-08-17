class Bottle extends DrawableObject {

    x = Math.random() * 2000;
    y = 380;
    width = 50;
    height = 50;


    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ]

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    }
}