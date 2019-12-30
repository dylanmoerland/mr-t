type FrameData = {
    frameWidth: number;
    frameHeight: number;
    frames: number[],
    frameRate: number,
};

class Sprite {
  private x: number = 0;

    private y: number = 0;

    private image: p5.Image;

    private frameData: FrameData;

    private framesSinceLastUpdate = 0;

    private frame: number = 0;

    private isPaused: boolean = false;

    constructor(source: string, frameData: FrameData) {
      this.image = loadImage(source);
      this.frameData = frameData;
    }

    public pause() {
      this.isPaused = true;
    }

    public play() {
      this.isPaused = false;
    }

    public updateFrameData(frameData: FrameData) {
      this.frameData = frameData;
    }

    public getFrameData() {
      return this.frameData;
    }

    public update(x: number, y: number) {
      this.x = x;
      this.y = y;

      if (!this.isPaused && this.framesSinceLastUpdate > this.frameData.frameRate) {
        if (this.frame + 1 < this.frameData.frames.length) {
          this.frame++;
        } else {
          this.frame = 0;
        }
        this.framesSinceLastUpdate = 0;
      }
      this.framesSinceLastUpdate++;
    }

    public show() {
      image(
        this.image,
        this.x,
        this.y,
        this.frameData.frameWidth,
        this.frameData.frameHeight,
        this.frameData.frames[this.frame],
        0,
        this.frameData.frameWidth,
        this.frameData.frameHeight,
      );
    }
}
