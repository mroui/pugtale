class Pug extends GameObject {

    constructor(assetsLoader, soundsMute, xal, yal, aw, ah, x, y, w, h, a, d) {
        super(assetsLoader.get("PUG"), xal, yal, aw, ah, x, y, w, h, a, d);

        this.tileW = w;
        this.tileH = h;

        this.assetsLoader = assetsLoader;
        this.soundsMute = soundsMute;
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
        this.animationToStart = true;

        this.hitAnimInterval = null;

        this.collisionSensibility = true;
        this.hitSound = new Sound(this.assetsLoader.get("HIT"));
        this.jumpSound = new Sound(this.assetsLoader.get("JUMP"));

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
            switch (this.direction) {
            case UP:
                if (this.y-this.speed > 0) this.y -= this.speed;
                else this.animationToStart = false;
                break;
            case LEFT:
                if (this.x-this.speed > 0) this.x -= this.speed;
                else this.animationToStart = false;
                break;
            case DOWN:
                if (this.y+this.speed < this.canvas.height-this.tileH) this.y += this.speed;
                else this.animationToStart = false;
                break;
            case RIGHT:
                if (this.x+this.speed < this.canvas.width-this.tileW) this.x += this.speed;
                else this.animationToStart = false;
                break;
            }

            this.passedDistance += this.speed;

            if (this.animationToStart) {
                this.startAnim();
                if (!this.soundsMute) this.jumpSound.play();
                this.animationToStart = false;
            }
        } else if (this.passedDistance >= this.tileW) {
            this.passedDistance = 0;
            this.direction = STOP;
            this.column = 0;
            this.animationToStart = true;
            this.stopAnim();
        }
    }

    getDirection = () => {
        return this.direction;
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

    startHitAnim = () => {
        this.hitAnimInterval = setInterval(this.updateHitAnimation, 250);
        setTimeout(this.stopHitAnim, 5000);
    }

    stopHitAnim = () => {
        this.isDisplayed = true;
        this.collisionSensibility = true;
        clearInterval(this.hitAnimInterval);
        this.hitAnimInterval = null;
    }

    updateHitAnimation = () => {
        if (this.isDisplayed) this.isDisplayed = false;
        else this.isDisplayed = true;
    }

    getCollisionSensibility = () => {
        return this.collisionSensibility;
    }

    setCollisionSensibility = collisionSensibility => {
        this.collisionSensibility = collisionSensibility;
    }

}