class Pug extends GameObject {

    constructor(asset, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        super(asset, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        this.width = dWidth;
        this.height = dHeight;
    }

}