class Donut extends GameObject {

    constructor(asset, xal, yal, aw, ah, x, y, w, h, s, d) {
        super(asset, xal, yal, aw, ah, x, y, w, h, s, d);
    }

    updateState = () => {
        if (this.startY < 0) {
            this.y += 1;
            if (this.y == this.canvas.height)
                this.stop();
        } else {
            this.y -= 1;
            if (this.y == -this.h)
                this.stop();
        }
    }

}