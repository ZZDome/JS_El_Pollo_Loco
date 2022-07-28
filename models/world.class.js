class World{
    air = new Air;
    bglayer3 = new Backgroundlayer3;
    bglayer2 = new Backgroundlayer2;
    bglayer1 = new Backgroundlayer1;
    character = new Character;
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    cloud = new Cloud;
    canvas;
    ctx;

    constructor(canvas){
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.air.img, this.air.x, this.air.y, this.air.width, this.air.height);
        this.ctx.drawImage(this.bglayer3.img, this.bglayer3.x, this.bglayer3.y, this.bglayer3.width, this.bglayer3.height);
        this.ctx.drawImage(this.bglayer2.img, this.bglayer2.x, this.bglayer2.y, this.bglayer2.width, this.bglayer2.height);
        this.ctx.drawImage(this.bglayer1.img, this.bglayer1.x, this.bglayer1.y, this.bglayer1.width, this.bglayer1.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        this.ctx.drawImage(this.cloud.img, this.cloud.x, this.cloud.y, this.cloud.width, this.cloud.height);
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}