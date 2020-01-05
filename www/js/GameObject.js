class GameObject {

    constructor(asset, xa, ya, aw, ah, x, y, w, h) {
        this.asset = asset;
        this.x = x;
        this.y = y
        this.xa = xa;
        this.ya = ya;
        this.aw = aw;
        this.ah = ah;
        this.w = w;
        this.h = h;
    }

    getAsset = () => {
        return this.asset;
    }

    getX = () => {
        return this.x;
    }

    getY = () => {
        return this.y;
    }

    getXA = () => {
        return this.xa;
    }

    getYA = () => {
        return this.ya;
    }

    getAW = () => {
        return this.aw;
    }

    getAH = () => {
        return this.ah;
    }

    getW = () => {
        return this.w;
    }

    getH = () => {
        return this.h;
    }
}