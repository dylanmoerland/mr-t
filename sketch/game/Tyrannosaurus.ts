class Tyrannosaurus {
    private sprite: Sprite;
    private gravity: number;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private vy: number;
    private isDucking: boolean;
    private isJumping: boolean;
    private dead: boolean;
    private runner: Runner;
    private score: number;

    constructor(runner: Runner) {
        this.sprite = new Sprite('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAv0AAABeAgMAAADNv0PuAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAxQTFRFAAAA////U1NT9/f3LGVtlQAAAAR0Uk5TAP///7MtQIgAAAJaSURBVHic7dpNUsQgEAXg3mTj6bLpTe7HhktqgPDfIbECcQofC8t6jt39aZExRKK4OCx6IR2wAADg2WLWx+IXUiKfAgDAxwC0FjqNSimmAMRG/Iuh5NeepCwBfArAeMCmJIBPAbga9XkKwF8DXtvEANxP8U4MAAAAAPCZgPL8o1cKAAAfC/C98tOPUWkNeDg+AAA8nt/VXTjZgeNSCvOmwzcP3vcKKwCvA5bwTGQVANkTk0kAzJv2jWhg6gFf2QZm92XOpg6fbsoQlmRqAIYDwrfpffgKkFyYeQqATqPj7WZUSm7omB6A/MUqB9iPIdEAvAEI07rPC0BWdAZAGnFoPyQlO3McPwLKpbYakwwOAABdAelXmIWS3VLKU3KLJYGHsCgAAIBhAJK2VbdUBrQEav/T+lwAAADPAUUn32hUmgt82BAocy9zKpgPEPqMSjNACP83IOsUG41KU0EMRYGyN/AryQJ3ew8AAB0ASSf52VzfNLmdSVcmCHcxyh3s5oLw0vAMBQAAngGoCoamXkD5WhKBCufr/tlGKojn66NH/Z8Ae55+BtivrJpnBJjv5ap9I+Wwv2LKNyu4060asPlz3E3VD1Zj16oaAH0ACx+Addl0JUi61uUmAJhf0L4zNN9PuXj8fAhuVXDD1wBzoGvuX04A5gSC658SAJ0Adm4HKGuHSlRcPacCMEmjyul3XcDWvlvBzV6/kZkL6EpnAH/zAsBwgLjE96+pAHazFZ0aaaPMdYVjE9f/7rfYTXyvNAAA9AXwcZdwN22Uua5wusQL6GXXi1EBAKDd9QdkEiKKVx42AAAAAABJRU5ErkJggg==', {
            frames: [88, 0],
            frameRate: 12,
            frameWidth: 88,
            frameHeight: 94,
        });
        this.dead = false;
        this.isDucking = false;
        this.gravity = 1.5;
        this.height = 94;
        this.x = 50;
        this.y =  height - this.height;
        this.vy = 0;
        this.runner = runner;
        this.score = 0;
    }

    public getScore() {
        return this.score;
    }

    public isAlive() {
        return !this.dead;
    }

    public jump() {
        if (this.y == height - this.height) {
            this.isJumping = true;
            this.isDucking = false;
            this.sprite.updateFrameData({
                frameWidth: 88,
                frameHeight: 94,
                frames: [176],
                frameRate: 60,
            });
            this.vy = -25;
        }
    }

    public duck() {
        if (!this.isJumping) {
            this.isDucking = true;
            this.sprite.updateFrameData({
                frameWidth: 120,
                frameHeight: 94,
                frames: [525, 643],
                frameRate: 8,
            });
        }
    }

    public run() {
        this.isDucking = false;
        this.sprite.updateFrameData({
            frameWidth: 88,
            frameHeight: 94,
            frames: [176, 264],
            frameRate: 6,
        });
    }

    public getDimensions() {
        if (this.isDucking) return {
            x: this.x,
            y: this.y  + 40,
            width: 120,
            height: 54,
        };

        return {
            x: this.x,
            y: this.y,
            width: 88,
            height: 94,
        }
    }

    public update() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.height);

        if (this.isJumping && this.y ===  height - this.height) {
            this.isJumping = false;
            this.run();
        }

        if (this.runner.isRunning()) {
            this.score++;
        }

        this.runner.getObstacles().forEach((box: Box) => {
            if (box.checkCollision(this)) {
                this.dead = true;
            }
        })
    }

    public show() {
        if (!this.dead) {
            this.sprite.update(this.x, this.y);
            this.sprite.show();
        }
    }
}
