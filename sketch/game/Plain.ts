class Plain {
    private image: p5.Image;
    private pieces: number[] = [];

    constructor() {
        this.image = loadImage(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACUIAAAAaAQMAAABCCia0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAAU1NTqGkn/wAAAAJ0Uk5TAP9bkSK1AAABFklEQVR4nO2UTQ6DIBBGx7BwY+IN2it4ABNu1vRoHKVHYOnC1GqVioKB2IkMhLfAhN83XxCAOBk63P34e23TIiflCRM33A1l+fy1SZGT8oUDbk21KF6qTYuclC8SCtQnvQV4qDYtQiQ1RIkAuI+fDqsACVCq9uhElIMuJ0RSUcPH0l6BHeIgJ+XL9K+EdoiDcEnV4qBfGl3csdXJCiwnkbSi6ETHils8pq7WskL1Vcu3Maes9t/BfjO4K0QfFHITCUUrik5Urc5ROTs0bAXO8//2cEgQsKLodJGV0Jbrl1+/ucx8RJtpgesl3cCONVgUVhSdKFn16yVkvTHH8ji6sV3dcW8zhWVoN53NJsSsclL+SWUyyHwAjcS+04Z49b0AAAAASUVORK5CYII=',
            () => this.createInitialPieces(),
        );
    }

    private createInitialPieces() {
        this.pieces = new Array(width / Plain.PARTIAL_SIZE).fill(0).map((_, index) => index);
    }
    
    public update() {
        if (this.pieces.length) {
            this.pieces = this.pieces.map((piece) => {
                if (piece * Plain.PARTIAL_SIZE < this.image.width - (Plain.PARTIAL_SIZE * 2)) {
                    return piece + 1;
                } else {
                    return 0;
                }
            })
        }
    }

    public show() {
        this.pieces.forEach((peace, index) => {
            image(
                this.image,
                Plain.PARTIAL_SIZE * index,
                height - 20,
                Plain.PARTIAL_SIZE,
                20,
                Plain.PARTIAL_SIZE * peace,
                0,
                Plain.PARTIAL_SIZE,
                20
            )
        });
    }

    private static get PARTIAL_SIZE() {
        return 12;
    }
}