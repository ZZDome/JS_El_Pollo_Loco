class World{
    air = new Air;
    bglayer3 = [
        new Backgroundlayer3(0),
        new Backgroundlayer3(720*2),
        new Backgroundlayer3(720*4),
        new Backgroundlayer3(720*6) 
    ];
    bglayer2 = [
        new Backgroundlayer2(0),
        new Backgroundlayer2(720*2),
        new Backgroundlayer2(720*4),
        new Backgroundlayer2(720*6) 
    ];
    bglayer1 = [
        new Backgroundlayer1(0),
        new Backgroundlayer1(720*2),
        new Backgroundlayer1(720*4),
        new Backgroundlayer1(720*6) 
    ];
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
    keyboard;
    camaraX = 0;

    constructor(canvas, keyboard){
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    drawObjects(objects){
        objects.forEach(objects => {
            this.ctx.drawImage(objects.img, objects.x, objects.y, objects.width, objects.height);
        });
    }

    drawObject(object){
        if(object.otherDirection){
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1;
        };
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if(object.otherDirection){
            object.x = object.x * -1;
            this.ctx.restore();
        };
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawObject(this.air);

        this.ctx.translate(this.camaraX, 0);

        
        this.drawObjects(this.bglayer3);
        this.drawObjects(this.bglayer2);
        this.drawObjects(this.bglayer1);
        this.drawObjects(this.cloud);
        this.drawObjects(this.enemies);
        this.drawObject(this.character);    
        
        this.ctx.translate(-this.camaraX, 0);
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}