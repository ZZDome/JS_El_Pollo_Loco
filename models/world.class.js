class World{
    air = new Air;
    bglayer3 = [new Backgroundlayer3()];
    bglayer2 = [new Backgroundlayer2()];
    bglayer1 = [new Backgroundlayer1()];
    character = new Character;
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    cloud = [
        new Cloud(),
        new Cloud(),
    ];
    canvas;
    ctx;

    constructor(canvas){
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas
        this.draw();
    }

    drawObjects(objects){
        objects.forEach(objects => {
            this.ctx.drawImage(objects.img, objects.x, objects.y, objects.width, objects.height);

        });
    }

    drawObject(object){
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawObject(this.air)
        this.drawObjects(this.bglayer3)
        this.drawObjects(this.bglayer2)
        this.drawObjects(this.bglayer1)
        this.drawObjects(this.cloud)
        this.drawObjects(this.enemies)
        this.drawObject(this.character)        
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}