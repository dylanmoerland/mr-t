class Box {
  protected sprite: Sprite;

  protected y: number;

  protected x: number;

  private gap: number;

  private speed: number;

  private runner: Runner;

  constructor(runner: Runner, sprite: Sprite, minimumGap: number, speed: number) {
    this.speed = speed;
    this.sprite = sprite;
    this.x = width;
    this.runner = runner;
    this.setGap(speed, minimumGap);
  }

  public getGap() {
    return this.gap;
  }

  public getSpeed() {
    return this.speed;
  }

  public isVisible() {
    return this.x + this.getWidth() > 0;
  }

  public getWidth() {
    return this.sprite.getFrameData().frameWidth;
  }

  public getDimensions() {
    return {
      x: this.x,
      y: this.y,
      width: this.sprite.getFrameData().frameWidth - 15,
      height: this.sprite.getFrameData().frameHeight - 10,
    };
  }

  public checkCollision(tyrannosaurus: Tyrannosaurus) {
    const rect1 = tyrannosaurus.getDimensions();
    const rect2 = this.getDimensions();

    if (rect1.x < rect2.x + rect2.width
          && rect1.x + rect1.width > rect2.x
          && rect1.y < rect2.y + rect2.height
          && rect1.y + rect1.height > rect2.y) {
      return true;
    }
    return false;
  }

  private setGap(speed: number, minimumGap: number) {
    const minGap = Math.round(((width * speed) / 24) + minimumGap);
    const maxGap = Math.round(minGap * 1.5);

    this.gap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
  }

  public getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  protected move() {
    this.x -= this.speed * this.runner.getSpeed();
  }

  public update() {
    this.move();
    this.sprite.update(this.x, this.y);
  }

  public show() {
    this.sprite.show();
  }
}
