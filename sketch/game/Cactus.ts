class Cactus extends Box {
  constructor(runner: Runner) {
    super(runner, new Sprite('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfsAAABkAgMAAAD8onFjAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAxQTFRFAAAA//////f3U1NTwLTgpAAAAAR0Uk5TAP///7MtQIgAAAOWSURBVHic7ZrhkasgEICRGpKxBUeaMK+Gy6SamzBWc2N6iE2YHpy8GnI8YBdcjRrP+xF4CT8yuEv4dhZYF5Cx55dkX0Bl+7FUwBivKul7yKsv9lDRK1TxbH6qGqAcb8VCAWNCqdYja/XtmZMKWnqKJ/OTo4JeUwWYxwLbQdeDRnrmpCKnI0EVwfM3KEiKX/B5TUciOP4GcUnBtru+IPncAT9tsMUaPp2W4fF3nwXg0iY5XvqCVF0sXy++gxVMY3gl4+QfzLzSuIth3IYCyr9ACBrHCNUu4OuVGCF/85hvomo5x89g6L5lQPwN8m10ofxOABNy92s+P0ushcOH6HKAhdbjd4KLFVx+zRf2ISx+Ouzd8Ylgks8h1YLectnxe4r/ly9c2DGTq76Wnk8V2rAJvklJYuS714zhSRdNBTyXdwpet+N8m5IEyNdlnu9eM8DDaDrkU4Uc5duQHCH/D8Wcut76fKqIia/D8cvxFfG8eet2OKzir1rLz2Xg/NsOcQ1L9kfKb/wIHVbzy9pUr6dw+Q1kl7DPpANixuOCCZmVqxX8k31UKlT+bV9gdm3OlxIyIFrg+WwLA8JX83ViIoPjg9fBue78QTlvN4zwbWP9+p3jV3P8lomWwUwMhQ/OLqDv7vxlX3gBtPAbsg82x7dlgn81aQu8lFUwfPSp87rjU0FK+Q2b5ruuJ/htt/cMiG/DrUmpzerqnb85AcadBXxeL+Bjo1D4y85f/Ryd5TMxz88MPxNR8hu2gA++neLzs07KyzMu06j4N3sD0/FtmK0AY6Op/jFpZk4VQ75Q11pX2rw6RccnAreAnBN93TShq8sbNuDDxhwtjprfRVOFp04uBElqmBjjO4uj47Ou65YYA+dJ+Nyy3CuMLaN8sDg+vmfixtKUK966YgSSxMoWq3d8PAGNju/cZ++QvcOZ5/cUxjCoDtcfWhwhn1c2zML/MZpSPiiIk8UIf/H9Z3j8ZfePvDPMDkCgfLbdw1cVyR4/s3gs+PH9a34ff4Lhryk/5cP9Uy82vR4flyF7Wb7NXOXr8nVSArpX5fM3/81/89/8/4OfEQyXs4oRPpdsdXkyPzO76+/Sfk/ES5tmi3aoQIxwO5AhX6wfgSfz+blW3s3ir/Le7CnQMK3I+vxOESlfu7mq3HfmvDT1r3sFGmasgls3OH8mimj50D/pgeOMowowzCgyu2WXupH9CrtTRM3vzZ9siYLW4eEfqRohRz5o9gUAAAAASUVORK5CYII=', {
      frames: [-3],
      frameRate: 6,
      frameHeight: 78,
      frameWidth: 74,
    }), 120, 8);

    this.y = height - this.sprite.getFrameData().frameHeight;
  }
}
