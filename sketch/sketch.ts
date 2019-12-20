let runner: Runner;
let target: Population | Tyrannosaurus | MrT;
let placeholder: Sprite;
let speed: number;

function setup() {
    createCanvas(1200, 350);
    runner = new Runner();
    placeholder = new Sprite('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAv0AAABeAgMAAADNv0PuAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAxQTFRFAAAA////U1NT9/f3LGVtlQAAAAR0Uk5TAP///7MtQIgAAAJaSURBVHic7dpNUsQgEAXg3mTj6bLpTe7HhktqgPDfIbECcQofC8t6jt39aZExRKK4OCx6IR2wAADg2WLWx+IXUiKfAgDAxwC0FjqNSimmAMRG/Iuh5NeepCwBfArAeMCmJIBPAbga9XkKwF8DXtvEANxP8U4MAAAAAPCZgPL8o1cKAAAfC/C98tOPUWkNeDg+AAA8nt/VXTjZgeNSCvOmwzcP3vcKKwCvA5bwTGQVANkTk0kAzJv2jWhg6gFf2QZm92XOpg6fbsoQlmRqAIYDwrfpffgKkFyYeQqATqPj7WZUSm7omB6A/MUqB9iPIdEAvAEI07rPC0BWdAZAGnFoPyQlO3McPwLKpbYakwwOAABdAelXmIWS3VLKU3KLJYGHsCgAAIBhAJK2VbdUBrQEav/T+lwAAADPAUUn32hUmgt82BAocy9zKpgPEPqMSjNACP83IOsUG41KU0EMRYGyN/AryQJ3ew8AAB0ASSf52VzfNLmdSVcmCHcxyh3s5oLw0vAMBQAAngGoCoamXkD5WhKBCufr/tlGKojn66NH/Z8Ae55+BtivrJpnBJjv5ap9I+Wwv2LKNyu4060asPlz3E3VD1Zj16oaAH0ACx+Addl0JUi61uUmAJhf0L4zNN9PuXj8fAhuVXDD1wBzoGvuX04A5gSC658SAJ0Adm4HKGuHSlRcPacCMEmjyul3XcDWvlvBzV6/kZkL6EpnAH/zAsBwgLjE96+pAHazFZ0aaaPMdYVjE9f/7rfYTXyvNAAA9AXwcZdwN22Uua5wusQL6GXXi1EBAKDd9QdkEiKKVx42AAAAAABJRU5ErkJggg==', {
        frames: [88, 0],
        frameRate: 12,
        frameWidth: 88,
        frameHeight: 94,
    });
    target = null;
    speed = 1.5;
}

async function draw() {
    noStroke();
    background(255);

    runner.show();

    if (target) {
        runner.update();
        target.update();
        target.show();

        if ((target instanceof Tyrannosaurus || target instanceof MrT) && !target.isAlive()) {
            runner.stop();
        } 
    } else {
        placeholder.update(50, height - 94);
        placeholder.show();
    }
}


function keyPressed() {
    if (!target) {
        if (keyCode === 38) {
            target = new Tyrannosaurus(runner);
            target.run();
            runner.start();
        } else if (keyCode === 67) {
            target = new Population(8);
            runner.start();
        } else if (keyCode === 76) {
            target = new MrT();
            runner.start();
        }
    } else if (target instanceof Tyrannosaurus) {
        switch (keyCode) {
            case 38:
                target.jump();
                break;
            case 40:
                target.duck();
                break;    
        } 
    }
    if (keyCode === 82) {
        setup();
    }
}

function keyReleased() {
    if (target instanceof Tyrannosaurus) {
        switch (keyCode) {
            case 40:
                target.run();
                break;    
        }
    }
}
