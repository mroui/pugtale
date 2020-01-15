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

        this.passedWorld = 0;
        this.passedWorldTemporary = 0;

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
        this.isAttachedTo = null;
        this.currentBiome = null;

        this.hitSound = new Sound(this.assetsLoader.get("HIT"));
        this.jumpSound = new Sound(this.assetsLoader.get("JUMP"));

        this.hearts = 3;
        this.possibilityToLevelUp = true;

        this.setDirection(STOP);
    }

    looseHeart = () => {
        this.hearts--;
    }

    isPossibleToLevelUp = () => {
        return this.possibilityToLevelUp;
    }

    setPossibilityToLevelUp = possible => {
        this.possibilityToLevelUp = possible;
    }

    getCurrentBiome = () => {
        return this.currentBiome;
    }

    setCurrentBiome = newBiome => {
        this.currentBiome = newBiome;
    }

    passWorld = () => {
        if (this.direction == RIGHT) {
            this.passedWorldTemporary++;
        } else if (this.direction == LEFT) this.passedWorldTemporary--;

        if (this.passedWorldTemporary > this.passedWorld){
            this.passedWorld = this.passedWorldTemporary;
            this.possibilityToLevelUp = true;
        }
    }

    getPassedWorld = () => {
        return this.passedWorld;
    }

    getHeartsAsset = () => {
        return this.assetsLoader.get("HEARTS" + this.hearts);
    }

    getHeartObject = () => {
        return new GameObject(this.getHeartsAsset(), 0, 0, 96, 48, this.canvas.width-48*2, 0, 96, 48);
    }

    getHearts = () => {
        return this.hearts;
    }

    setDirection = direction => {
        this.direction = direction;
        this.row = this.direction;
        this.column = 0;
    }

    updateState = () => {
        requestAnimationFrame(this.updateState);

        if (this.direction === STOP && this.isAttachedTo !== null) {
            if (this.isAttachedTo.getStartY() < 0) {
                if (this.y+1 < this.canvas.height-this.tileH)
                    this.y++;
                else this.checkAttachment();
            } else if (this.y-1 >= 0) {
                this.y--;
            } else this.checkAttachment();
        }

        if (this.direction != STOP && this.passedDistance < this.tileW) {
            switch (this.direction) {
            case UP:
                if (this.y-this.speed >= 0) this.y -= this.speed;
                else this.animationToStart = false;
                break;
            case LEFT:
                if (this.x-this.speed >= 0) this.x -= this.speed;
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
            this.passWorld();
            this.passedDistance = 0;
            this.direction = STOP;
            this.column = 0;
            this.animationToStart = true;
            this.stopAnim();
            this.checkAttachment();
        }
    }

    checkAttachment = () => {
        if (this.isAttachedTo !== null) {
            let x = this.isAttachedTo.getX();
            let y = this.isAttachedTo.getY();
            let w = this.isAttachedTo.getW();
            let h = this.isAttachedTo.getH();
            if (!this.isOnCenterCollision(x, y, w, h)){
                this.isAttachedTo.setIsDisplayed(false);
                this.setAttachment(null);
                if (this.getCollisionSensibility() && (this.getCurrentBiome() === "RIVER" || this.getCurrentBiome() === "SKY"))
                    this.initCollision();
            }
        } else if (this.getCollisionSensibility() && (this.getCurrentBiome() === "RIVER" || this.getCurrentBiome() === "SKY"))
            this.initCollision();
    }

    setAttachment = attachment => {
        this.isAttachedTo = attachment;
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
        setTimeout(this.stopHitAnim, 3000);
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

    initCollision = () => {
        this.setCollisionSensibility(false);
        this.startHitAnim();

        if (!this.soundsMute) this.hitSound.play();

        navigator.vibrate([100]);

        this.hearts--;

        if (this.direction === LEFT) {
            this.x  += this.w;
        } else if(this.x !== 0) {
            this.x  -= this.w;
        }
    }

}