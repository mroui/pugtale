class Powerup extends GameObject {

    constructor(asset, xal, yal, aw, ah, x, y, w, h, a, d, t) {
        super(asset, xal, yal, aw, ah, x, y, w, h, a, d, t);

        this.tileW = w;
        this.tileH = h;
        this.x = x;
        this.y = y;
        this.aw = this.tileW;
        this.ah = this.tileH;
        this.w = w;
        this.h = h;

        this.columnsCount = 8;
        this.rowsCount = 1;
        this.column = 0;
        this.row = 0;

        this.startAnim();
    }

    startAnim = () => {
        this.animInterval = setInterval(this.updateAnimation, 150);
    }

    updateAnimation = () => {
        this.column++;
        if (this.column == this.columnsCount-1) {
            this.column = 0;
        }
        this.xa = this.column * this.tileW;
        this.ya = this.row * this.tileW;
    }
}