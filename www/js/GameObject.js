class GameObject {

    constructor(asset, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.asset = asset;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dx = dx;
        this.dy = dy;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
    }

    getAsset = () => {
        return this.asset;
    }

    getDX = () => {
        return this.dx;
    }

    getDY = () => {
        return this.dy;
    }

    getSX = () => {
        return this.sx;
    }

    getSY = () => {
        return this.sy;
    }

    getDWidth = () => {
        return this.dWidth;
    }

    getDHeight = () => {
        return this.dHeight;
    }


    getSWidth = () => {
        return this.sWidth;
    }

    getSHeight = () => {
        return this.sHeight;
    }


}