class World {
    air = new Air;
    level = level1;
    character = new Character;
    healthBar = new StatusBar('health');
    bottleBar = new StatusBar('bottle');
    coinBar = new StatusBar('coin');
    throwableObjects = [];

    canvas;
    ctx;
    keyboard;
    camaraX = 0;

    constructor(canvas, keyboard) {

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.checkHarvestBottle();
        }, 150);
    }

    checkCollisions(){
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.healthBar.setPercentageHealth(this.character.health);
                }
            });
    }

    checkHarvestBottle(){
        this.level.bottles.forEach((bottle) => {
            if(this.character.isColliding(bottle) && this.character.bottles < 100){
                this.character.bottles += 10;
                this.bottleBar.setPercentageBottle(this.character.bottles);
                bottle.x = -200;
            }
        });
    }

    checkThrowableObjects(){
        if(this.keyboard.D && this.character.bottles > 0){
            this.character.bottles -= 10;
            this.bottleBar.setPercentageBottle(this.character.bottles);
            let bottle = new ThrowableObject(this.character.x, this.character.y, this.character.speedX);
            this.throwableObjects.push(bottle);
        }
    }

    setWorld() {
        this.character.world = this;
    }

    drawObjects(objects) {
        objects.forEach(objects => {
            this.ctx.drawImage(objects.img, objects.x, objects.y, objects.width, objects.height);
           
                this.ctx.beginPath();
                this.ctx.lineWidth = '5';
                this.ctx.strokeStyle = 'blue';
                this.ctx.rect(objects.x, objects.y, objects.width, objects.height);
                this.ctx.stroke();
           
        });
    }

    drawObject(object) {
        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1;
        };
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        
            this.ctx.beginPath();
            this.ctx.lineWidth = '5';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(object.x, object.y, object.width, object.height);
            this.ctx.stroke();
        

        if (object.otherDirection) {
            object.x = object.x * -1;
            this.ctx.restore();
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawObject(this.air);

        this.ctx.translate(this.camaraX, 0);


        this.drawObjects(this.level.bglayer3);
        this.drawObjects(this.level.bglayer2);
        this.drawObjects(this.level.bglayer1);
        this.drawObjects(this.level.clouds);
        this.drawObjects(this.level.enemies);
        this.drawObject(this.character);
        this.drawObjects(this.throwableObjects);
        this.drawObjects(this.level.bottles);

        this.ctx.translate(-this.camaraX, 0);
        this.drawObject(this.healthBar);
        this.drawObject(this.bottleBar);
        this.drawObject(this.coinBar);
        this.ctx.translate(this.camaraX, 0);

        this.ctx.translate(-this.camaraX, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}