class Runner {
    private running: boolean = false;
    private obstacles: Box[] = [];
    private plain: Plain;
    private sky: Sky;
    private score: number;

    constructor() {
        this.plain = new Plain();
        this.sky = new Sky();
        this.score = 0;
    }

    public getObstacles() {
        return this.obstacles;
    }

    public isRunning() {
        return this.running;
    }

    private addObstacle() {
        if (Math.random() < 0.33) {
            this.obstacles.push(new Pterodactyl());
        } else {
            this.obstacles.push(new Cactus());
        }
    }

    public start() {
        this.running = true;
    }

    public stop() {
        this.running = false;
    }

    public update() {
        if (this.isRunning()) {
            if (this.obstacles.length) {
                const lastObstacle = this.obstacles[this.obstacles.length - 1];
                if (lastObstacle.isVisible() && lastObstacle.getPosition().x + lastObstacle.getWidth() + lastObstacle.getGap() < width) {
                    this.addObstacle();
                }            
            } else {
                this.addObstacle();
            }
            
            this.obstacles = this.obstacles.filter((obstacle: Box) => obstacle.getPosition().x + obstacle.getWidth() > 0);
            this.obstacles.forEach((obstacle: Box) => {
                if (obstacle.getPosition().x < 50) {
                    obstacle.clear();
                }
                obstacle.update();
            });

            this.plain.update();
            this.sky.update();
            this.score++;
        }
    }

    public show() {
        textSize(32);
        fill(55);
        text(Math.floor(this.score / 10), width - 100, 32);
        this.sky.show();
        this.plain.show();
        this.obstacles.forEach((obstacle: Box) => {
            obstacle.show();
        });
    }
}
