const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
    [
        new Cloud(),
        new Cloud(),
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
    ]
);