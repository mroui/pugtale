class GameObject {

    constructor(asset, xa, ya, aw, ah, x, y, w, h, animation = false, delay = 0) {
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
        this.animation = animation;
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
        let startUpdateState = () => {
            this.updateState();
            this.isDisplayed = true;
        }
        if (this.animation) {
            setTimeout(startUpdateState, this.delay);
        } else if (!this.animation) {
            this.isDisplayed = true;
        }
    }

    stop = () => {
        this.isDisplayed = false;
        this.toRemove = true;
    }

    getIsDisplayed = () => {
        return this.isDisplayed;
    }

    getToRemove = () => {
        return this.toRemove;
    }

    setDelay = delay => {
        this.delay = delay;
    }

    getDelay = () => {
        return this.delay;
    }

    updateState = () => {
        requestAnimationFrame(this.updateState);
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