class GameObject {

    constructor(asset, xa, ya, aw, ah, x, y, w, h, renderSpeed = null, delay = 0) {
        this.asset = asset;
        this.x = x;
        this.y = y
        this.xa = xa;
        this.ya = ya;
        this.aw = aw;
        this.ah = ah;
        this.w = w;
        this.h = h;
        this.startY = y;

        this.canvas = document.getElementById('canvas');

        this.isDisplayed = false;
        this.interval = null;
        this.renderSpeed = renderSpeed;
        this.delay = delay;
        this.toRemove = false;
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

    setY = y => {
        this.y = y;
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

    getStartY = () => {
        return this.startY;
    }

    start = () => {
        let startUpdateStateInterval = () => {
            this.interval = setInterval(this.updateState, this.renderSpeed);
            this.isDisplayed = true;
        }
        if ((this.renderSpeed !== null) && (this.interval === null)) {
            setTimeout(startUpdateStateInterval, this.delay);
        } else if (this.renderSpeed === null) {
            this.isDisplayed = true;
        }
    }

    stop = () => {
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.isDisplayed = false;
        this.toRemove = true;
    }

    getIsDisplayed = () => {
        return this.isDisplayed;
    }

    getToRemove = () => {
        return this.toRemove;
    }

    updateState = () => {
    }

    setDelay = delay => {
        this.delay = delay;
    }

    getDelay = () => {
        return this.delay;
    }

}