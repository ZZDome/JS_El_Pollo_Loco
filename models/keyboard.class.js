class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    keyPressed(key){
        if(key.keyCode == 38){
            this.UP = true;
        }

        if(key.keyCode == 40){
            this.Down = true;
        }

        if(key.keyCode == 37){
            this.LEFT = true;
        }

        if(key.keyCode == 39){
            this.RIGHT = true;
        }

        if(key.keyCode == 32){
            this.SPACE = true;
        }

        if(key.keyCode == 68){
            this.D = true;
        }
    }

    keyNotPressed(key){
        if(key.keyCode == 38){
            this.UP = false;
        }

        if(key.keyCode == 40){
            this.Down = false;
        }

        if(key.keyCode == 37){
            this.LEFT = false;
        }

        if(key.keyCode == 39){
            this.RIGHT = false;
        }

        if(key.keyCode == 32){
            this.SPACE = false;
        }

        if(key.keyCode == 68){
            this.D = false;
        }
    }
}
