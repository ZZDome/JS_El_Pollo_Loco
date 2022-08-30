class StatusBar extends DrawableObject {

    x = 0;
    width = 160;
    height = 30;

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];
    
    IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/blue.png'
    ];

    percentage = 100;

    constructor(statusBar) {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_ENDBOSS);
        if (statusBar == 'health'){
            this.initHealthBar();
        }else if (statusBar == 'bottle'){
            this.initBottleBar();
        }else if (statusBar == 'coin'){
            this.initCoinBar();
        }else if (statusBar == 'endboss'){
            this.initEndbossBar();
        }
    }

    initHealthBar(){
        this.y = 0;
        this.setPercentageHealth(100);
    }

    initBottleBar(){
        this.y = 30;
        this.setPercentageBottle(20);
    }

    initCoinBar(){
        this.y = 60;
        this.setPercentageCoin(0);
    }

    initEndbossBar(){
        this.y = 0;
        this.x = 560;
        this.setPercentageEndboss(100);
    }

    setPercentageHealth(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    setPercentageBottle(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    setPercentageCoin(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    setPercentageEndboss(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndexEndboss()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexEndboss() {
        if (this.percentage > 66) {
            return 2;
        } else if (this.percentage > 33) {
            return 1;
        }else{
            return 0;
        }
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 50) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        }else{
            return 0;
        }
    }
}

