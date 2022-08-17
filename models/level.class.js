class Level {
    enemies;
    clouds;
    bglayer3;
    bglayer2;
    bglayer1;
    bottles;
    coins;
    level_end_x = 2500;

    constructor(enemies, clouds, bglayer3, bglayer2, bglayer1, bottles, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.bglayer3 = bglayer3;
        this.bglayer2 = bglayer2;
        this.bglayer1 = bglayer1;
        this.bottles = bottles;
        this.coins = coins;
    }
}