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

        this.isDisplayed = true;
        this.animation = animation;
        this.delay = delay;
        this.toRespawn = false;
        this.animInterval = null;
    }

    getAsset = () => {
        return this.asset;
    }

    setAsset = asset => {
        this.asset = asset;
    }

    getX = () => {
        return this.x;
    }

    setX = x => {
        this.x = x;
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

    setXA = xa => {
        this.xa = xa;
    }

    getYA = () => {
        return this.ya;
    }

    setYA = ya => {
        this.ya = ya;
    }

    getAW = () => {
        return this.aw;
    }

    setAW = aw => {
        this.aw = aw;
    }

    getAH = () => {
        return this.ah;
    }

    setAH = ah => {
        this.ah = ah;
    }

    getW = () => {
        return this.w;
    }

    setW = w => {
        this.w = w;
    }

    getH = () => {
        return this.h;
    }

    setH = h => {
        this.h = h;
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
        this.toRespawn = true;
    }

    getIsDisplayed = () => {
        return this.isDisplayed;
    }

    setIsDisplayed = isDisplayed => {
        this.isDisplayed = isDisplayed;
    }

    getToRespawn = () => {
        return this.toRespawn;
    }

    setToRespawn = toRespawn => {
        this.toRespawn = toRespawn;
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

    updateAnimation = () => {}

    startAnim = () => {
        this.animInterval = setInterval(this.updateAnimation, 30);
    }

    stopAnim = () => {
        clearInterval(this.animInterval);
        this.animInterval = null;
    }

}