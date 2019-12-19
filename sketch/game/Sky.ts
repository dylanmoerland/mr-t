type Coords = {
    x: number;
    y: number;
};

class Sky {
    private clouds: Coords[] = [];
    private image: p5.Image;

    constructor() {
        this.image = loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAbAQMAAADLfHrPAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAA2traOKgfdgAAAAJ0Uk5TAP9bkSK1AAAAW0lEQVR4nHXOSwrAMAgE0IFsA14lBxB6dY/kAQK2pPlp01n5FjoCLZdgZYdpPSMJ8g5a6/BIEyWi/oLsnUkD8jjBCOgnyPSL9iuPAgeS1ngAAlinioc+RT3qcAPJATKbraHO9AAAAABJRU5ErkJggg==');
    }
    
    public update() {
        if (Math.random() < 0.0025) {
            this.clouds.push({
                x: width,
                y:  Math.floor(Math.random() * (250 - 1)),
            });
        }

        this.clouds = this.clouds
            .map((cloud) => ({
                ...cloud,
                x: cloud.x - Sky.SPEED,
            }))
            .filter((cloud) => cloud.x + this.image.width > 0);
    }

    public show() {
        this.clouds.forEach((cloud) => {
            image(
                this.image,
                cloud.x,
                cloud.y,
            );
        })
    }

    private static get SPEED() {
        return 3;
    }
}