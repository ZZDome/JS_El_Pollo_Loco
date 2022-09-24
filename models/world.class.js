class World {
    air;
    level;
    character;
    healthBar;
    bottleBar;
    coinBar;
    endbossBar;
    start;
    gameOver;
    victory;
    throwableObjects = [];
    shootable = true;
    endbossSpawned = false;
    currentLevel;
    isRunning;
    startScreen;
    gameOverScreen;
    victoryScreen;
    muteAudio = false;

    AUDIO_CHICKENBG = new Audio('audio/chicken-background.mp3');
    AUDIO_BACKGROUND = new Audio('audio/background.mp3');

    canvas;
    ctx;
    keyboard;
    camaraX = 0;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.showStartScreen();
        this.draw();
        this.paralaxeBG();
        this.playAudio();
    }

    showStartScreen() {
        this.startScreen = true;
        this.start = new StartScreen;

    }

    showGameOverScreen() {
        this.gameOverScreen = true;
        this.gameOver = new GameOverScreen;
    }

    showVictoryScreen() {
        this.victoryScreen = true;
        this.victory = new VictoryScreen;
    }

    play(level) {
        this.gameOverScreen = false;
        this.victoryScreen = false;
        this.isRunning = true;
        this.air = new Air;
        this.level = level;
        this.character = new Character;
        this.healthBar = new StatusBar('health');
        this.bottleBar = new StatusBar('bottle');
        this.coinBar = new StatusBar('coin');
        this.endbossBar = new StatusBar('endboss');
        this.setWorld();
        this.run();
    }

    playAudio() {
        this.muteAudio = false;
        this.AUDIO_CHICKENBG.volume = 0.01;
        this.AUDIO_CHICKENBG.loop = true;
        this.AUDIO_CHICKENBG.play();

        this.AUDIO_BACKGROUND.volume = 0.3;
        this.AUDIO_BACKGROUND.loop = true;
        this.AUDIO_BACKGROUND.play();
    }

    stopAudio() {
        this.muteAudio = true;
        this.AUDIO_CHICKENBG.pause();
        this.AUDIO_BACKGROUND.pause();
        this.AUDIO_CHICKENBG.currentTime = 0;
        this.AUDIO_BACKGROUND.currentTime = 0;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsBottle();
            this.checkThrowableObjects();
            this.checkHarvestBottle();
            this.checkHarvestCoin();
            this.checkEndbossSpawn();
            this.checkEnd();
        }, 150);
        setInterval(() => {
            this.checkStamp();
        }, 1000 / 60);
    }

    checkEnd() {
        let endboss = this.level.enemies.length - 1;
        endboss = this.level.enemies[endboss];
        if (!endboss.isAlive && this.isRunning) {
            stop('victoryScreen');
            this.isRunning = false;
        } else if (this.character.isDead() && this.isRunning) {
            stop('gameOverScreen');
            this.isRunning = false;
            endboss.characterAlive = false;
        }
    }

    checkEndbossSpawn() {
        if (this.character.x > 1800 && !this.endbossSpawned) {
            this.endbossSpawned = true;
            let endboss = this.level.enemies.length - 1;
            endboss = this.level.enemies[endboss];
            endboss.alert = true;
            endboss.alerted();
        }
    }

    paralaxeBG() {
        setInterval(() => {
            if (this.keyboard.RIGHT && !this.keyboard.LEFT && this.character.x < this.level.level_end_x) {
                this.level.bglayer3.forEach(bg => {
                    bg.x += 2;
                });
                this.level.bglayer2.forEach(bg => {
                    bg.x += 1;
                });
                this.level.cloudsLayer2.forEach(bg => {
                    bg.x += 2;
                });
                this.level.clouds.forEach(bg => {
                    bg.x += 1;
                });
            } else if (this.keyboard.LEFT && !this.keyboard.RIGHT && this.character.x > 0) {
                this.level.bglayer3.forEach(bg => {
                    bg.x -= 2;
                });
                this.level.bglayer2.forEach(bg => {
                    bg.x -= 1;
                });
                this.level.cloudsLayer2.forEach(bg => {
                    bg.x -= 2;
                });
                this.level.clouds.forEach(bg => {
                    bg.x -= 1;
                });
            }
        }, 1000 / 60);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {

                if (enemy instanceof Endboss) {
                    enemy.speedY = 15;
                    enemy.attacking = false;
                    this.character.hit(20);
                    this.healthBar.setPercentageHealth(this.character.health);
                } else {
                    this.character.hit(5);
                    this.healthBar.setPercentageHealth(this.character.health);
                }
            }
        });
    }

    checkCollisionsBottle() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !bottle.splash) {
                    enemy.hit(20);
                    bottle.splash = true;
                    if (enemy instanceof Endboss) {
                        this.endbossBar.setPercentageEndboss(enemy.health);
                    }
                }
            })
        });
    }

    checkStamp() {
        console.log(this.character.y)
        this.level.enemies.forEach((enemy) => {
            if (this.character.isStamp(enemy) && this.character.isAboveGround() && !enemy.isDead()) {
                this.character.speedY = 15;
                enemy.hit(20);
            }
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

        if (!this.startScreen && !this.gameOverScreen && !this.victoryScreen) {
            this.drawObject(this.air);

            this.ctx.translate(this.camaraX, 0);


            this.drawObjects(this.level.bglayer3);
            this.drawObjects(this.level.cloudsLayer2);
            this.drawObjects(this.level.bglayer2);
            this.drawObjects(this.level.clouds);
            this.drawObjects(this.level.bglayer1);

            this.drawObjects(this.level.enemies);
            this.drawObjects(this.level.coins);
            this.drawObject(this.character);
            this.drawObjects(this.throwableObjects);
            this.drawObjects(this.level.bottles);

            this.ctx.translate(-this.camaraX, 0);
            this.drawObject(this.healthBar);
            this.drawObject(this.bottleBar);
            this.drawObject(this.coinBar);
            if (this.level.enemies[this.level.enemies.length - 1].fighting) {
                this.drawObject(this.endbossBar);
            }
            this.ctx.translate(this.camaraX, 0);

            this.ctx.translate(-this.camaraX, 0);

        } else if (this.startScreen) {
            this.drawObject(this.start);
        } else if (this.gameOverScreen) {
            this.drawObject(this.gameOver);
        } else if (this.victoryScreen) {
            this.drawObject(this.victory);
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}