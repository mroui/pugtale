class Pug extends GameObject {

    constructor(asset, xal, yal, aw, ah, x, y, w, h, a, d) {
        super(asset, xal, yal, aw, ah, x, y, w, h, a, d);

        this.tileW = w;
        this.tileH = h;

        this.asset = asset;
        this.x = x;
        this.y = y;
        this.aw = this.tileW;
        this.ah = this.tileH;
        this.w = w;
        this.h = h;

        this.columnsCount = 5;
        this.rowsCount = 4;
        this.column = 0;
        this.row = 0;
        this.direction = null;
        this.passedDistance = 0;
        this.speed = 4;
        this.animationStarted = false;

        this.setDirection(STOP);
    }

    setDirection = direction => {
        this.direction = direction;
        this.row = this.direction;
        this.column = 0;
    }

    updateState = () => {
        requestAnimationFrame(this.updateState);

        if (this.direction != STOP && this.passedDistance < this.tileW) {

            if (!this.animationStarted) {
                this.startAnim();
                this.animationStarted = true;
            }

            switch (this.direction) {
            case UP:
                this.y -= this.speed;
                break;
            case LEFT:
                this.x -= this.speed;
                break;
            case DOWN:
                this.y += this.speed;
                break;
            case RIGHT:
                this.x += this.speed;
                break;
            }
            this.passedDistance += this.speed;

        } else if (this.passedDistance >= this.tileW) {
            this.passedDistance = 0;
            this.direction = STOP;
            this.column = 0;
            this.animationStarted = false;
            this.stopAnim();
        }
    }

    updateAnimation = () => {
        this.column++;
        if (this.column == this.columnsCount-1) {
            this.column = 0;
            this.stopAnim();
        }
        this.xa = this.column * this.tileW;
        this.ya = this.row * this.tileW;
    }

}