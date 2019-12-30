class Pterodactyl extends Box {
  constructor(runner: Runner) {
    super(runner, new Sprite(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAABPAgMAAAA7A9dGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAlQTFRFAAAA////U1NTfsgdQQAAAAN0Uk5TAP//RFDWIQAAAKhJREFUeJzdl8sNgCAQRGli+6GJbYJqvNAEVSoCymcx7onRvZC8eSGZGAwYs3LIflYn5zU+mB40/gqdWNyCmF0QfCR90j9iyUfSSayfcNS7EEmPWP4YEQ8hkp7wUeoc2+O8DBxBz7hM4RMMpqeKV1oqk4Qtlq5qvEHqdeDlTjWG1aWj/ISB9KbSHbQYT/fNGSgJd38sSF1xMULT0W+MP9Whng0q/d2DageBX64Eh9WfGgAAAABJRU5ErkJggg==', {
        frames: [-3, 89],
        frameRate: 6,
        frameHeight: 78,
        frameWidth: 90,
      },
    ), 150, 10);

    const random = Math.random();

    if (random < 0.33) {
      this.y = height - 78 - 25;
    } else if (random < 0.66) {
      this.y = height - 78 - 75;
    } else {
      this.y = height - 78 - 125;
    }
  }
}
