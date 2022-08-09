class Level {
    enemies;
    clouds;
    bglayer3;
    bglayer2;
    bglayer1;
    level_end_x = 2500;

    constructor(enemies, clouds, bglayer3, bglayer2, bglayer1){
        this.enemies = enemies;
        this.clouds = clouds;
        this.bglayer3 = bglayer3;
        this.bglayer2 = bglayer2;
        this.bglayer1 = bglayer1;
    }
}