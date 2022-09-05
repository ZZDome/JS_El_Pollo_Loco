let level1;

function deleteLevel(){
    level1 = false;
}

function setLevel1(){
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss()
        ],
        [
            new Cloud(0),
            new Cloud(720),
            new Cloud(720*2),
            new Cloud(720*3),
            new Cloud(720*4),
            new Cloud(720*5),
            new Cloud(720*6),
            new Cloud(720*7),
            new Cloud(720*8)
        ],
        [
            new CloudLayer2(0),
            new CloudLayer2(720),
            new CloudLayer2(720*2),
            new CloudLayer2(720*3),
            new CloudLayer2(720*4),
            new CloudLayer2(720*5),
            new CloudLayer2(720*6),
            new CloudLayer2(720*7),
            new CloudLayer2(720*8)
        ],
        [
            new Backgroundlayer3(-720*2),
            new Backgroundlayer3(0),
            new Backgroundlayer3(720*2),
            new Backgroundlayer3(720*4),
            new Backgroundlayer3(720*6) 
        ],
        [
            new Backgroundlayer2(-720*2),
            new Backgroundlayer2(0),
            new Backgroundlayer2(720*2),
            new Backgroundlayer2(720*4),
            new Backgroundlayer2(720*6) 
        ],
        [
            new Backgroundlayer1(-720*2),
            new Backgroundlayer1(0),
            new Backgroundlayer1(720*2),
            new Backgroundlayer1(720*4),
            new Backgroundlayer1(720*6) 
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    );
}