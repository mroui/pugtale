class GameObject {

    constructor(asset, xa, ya, x, y, w, h) {
        this.asset = asset;
        this.x = x;
        this.y = y
        this.xAsset = xa;
        this.yAsset = ya;
        this.width = w;
        this.height = h;
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
        return this.xAsset;
    }

    getYA = () => {
        return this.yAsset;
    }

    getW = () => {
        return this.width;
    }

    getH = () => {
        return this.height;
    }
}