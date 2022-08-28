class World {
    air = new Air;
    level = level1;
    character = new Character;
    healthBar = new StatusBar('health');
    bottleBar = new StatusBar('bottle');
    coinBar = new StatusBar('coin');
    throwableObjects = [];
    shootable = true;
    endbossSpawned = false;

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
        this.paralaxeBG();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsBottle();
            this.checkThrowableObjects();
            this.checkHarvestBottle();
            this.checkHarvestCoin();
            this.checkEndbossSpawn();
        }, 150);
    }

    checkEndbossSpawn(){
        if(this.character.x > 1800 && !this.endbossSpawned){
            this.endbossSpawned = true;
            let endboss = this.level.enemies.length - 1;
            endboss = this.level.enemies[endboss];
            endboss.alert = true;
            endboss.alerted();
        }
    }

    paralaxeBG(){
        setInterval(() => {
            if(this.keyboard.RIGHT && this.character.x < this.level.level_end_x){
                this.level.bglayer3.forEach(bg => {
                    bg.x += 2;
                });
                this.level.bglayer2.forEach(bg => {
                    bg.x += 1;
                });
            }else if(this.keyboard.LEFT && this.character.x > 0){
                this.level.bglayer3.forEach(bg => {
                    bg.x -= 2;
                });
                this.level.bglayer2.forEach(bg => {
                    bg.x -= 1;
                });
            }
        }, 1000 / 60);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit(5);
                this.healthBar.setPercentageHealth(this.character.health);
            }
        });
    }

    checkCollisionsBottle() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !bottle.splash) {
                    enemy.hit(100);
                    bottle.splash = true;
                }
            })
        });
    }

    checkHarvestBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 100) {
                this.character.bottles += 10;
                this.bottleBar.setPercentageBottle(this.character.bottles);
                bottle.x = -200;
                bottle.play();
            }
        });
    }

    checkHarvestCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.character.coins < 100) {
                this.character.coins += 10;
                this.coinBar.setPercentageCoin(this.character.coins);
                coin.x = -200;
                coin.play();
            }
        });
    }

    checkThrowableObjects() {
        if (this.keyboard.SPACE && this.character.bottles > 0) {
            setTimeout(() => {
                this.shootable = true;
            }, 700);
            if (this.shootable) {
                this.character.bottles -= 10;
                this.bottleBar.setPercentageBottle(this.character.bottles);
                let bottle = new ThrowableObject(this.character.x, this.character.y, this.character.speedX);
                this.throwableObjects.push(bottle);
                this.shootable = false;
            }
        }
    }

    setWorld() {
        this.character.world = this;
    }

    drawObjects(objects) {
        objects.forEach(objects => {
            try {
                this.ctx.drawImage(objects.img, objects.x, objects.y, objects.width, objects.height);
            } catch (e) {
                console.warn('Error', e);
                console.log(objects.img);

            }


            /* this.ctx.beginPath();
            this.ctx.lineWidth = '5';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(objects.x + objects.offsetX, objects.y + objects.offsetY, objects.width - objects.offsetX, objects.height - objects.offsetY);
            this.ctx.stroke(); */

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

        /* this.ctx.beginPath();
        this.ctx.lineWidth = '5';
        this.ctx.strokeStyle = 'blue';
        this.ctx.rect(object.x + object.offsetX, object.y + object.offsetY, object.width - object.offsetX, object.height - object.offsetY);
        this.ctx.stroke(); */


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
        this.drawObjects(this.level.coins);
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