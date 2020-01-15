class Render {

    constructor(canvas, assetsLoader, soundsMute, hammer)  {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');

        this.objectsCanvas = document.createElement('canvas');
        this.objectsCanvas.width = this.canvas.width;
        this.objectsCanvas.height = this.canvas.height;
        this.objectsContext = this.objectsCanvas.getContext('2d');

        this.assetsLoader = assetsLoader;
        this.soundsMute = soundsMute;
        this.hammer = hammer;

        this.gameoverSound = new Sound(this.assetsLoader.get("GAMEOVER"));

        this.world = null;
        this.biomes = [];
        this.pug = null;

        this.tileSize = 48;

        this.keysCurrentlyPressed = new Set();

        this.setListeners();
    }

    setListeners = () => {
        window.addEventListener('resize', this.resizeCanvas, false);

        document.addEventListener('keydown', this.keyListener);
        document.addEventListener('keyup', this.keyDeleteListener);

        document.addEventListener("backbutton", this.onBackButton, false);

        this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        this.hammer.on("swipeleft", e => { e.preventDefault(); this.pug.setDirection(LEFT); });
        this.hammer.on("swiperight", e => { e.preventDefault(); this.pug.setDirection(RIGHT); });
        this.hammer.on("swipeup", e => { e.preventDefault(); this.pug.setDirection(UP); });
        this.hammer.on("swipedown", e => { e.preventDefault(); this.pug.setDirection(DOWN); });

        document.getElementById("network-modal__close").addEventListener("click", this.hideNetworkModal);
        window.onclick = (e) => {
            if (e.target == document.getElementById("network-modal")) this.hideNetworkModal();
        }

        document.getElementById("restart-modal__yes-button").addEventListener("click", e => {
            this.hideRestartModal();
            this.clearGame();
            let game = new Game(this.assetsLoader, this.soundsMute, this.playerNickname);
            game.play();
        });
        document.getElementById("restart-modal__no-button").addEventListener("click", e => {
            this.hideRestartModal();
            this.clearGame();
            this.returnToMenu();
        });

        this.resizeCanvas();
    }

    keyListener = e => {
        const key = e.keyCode || e.charCode;
        if (this.keysCurrentlyPressed.has(key)) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            this.keysCurrentlyPressed.add(key);
            if (key === 37)      this.pug.setDirection(LEFT);
            else if (key === 38) this.pug.setDirection(UP);
            else if (key === 39) this.pug.setDirection(RIGHT);
            else if (key === 40) this.pug.setDirection(DOWN);
            else if (key === 27) this.onBackButton();
        }
    }

    keyDeleteListener = e => {
        this.keysCurrentlyPressed.delete(e.keyCode);
    }

    removeListeners = () => {
        document.removeEventListener('keydown', this.keyListener);
        document.removeEventListener('keyup', this.keyDeleteListener);

        document.removeEventListener("backbutton", this.onBackButton, false);

        let old_element = document.getElementById("network-modal__close");
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        old_element = document.getElementById("restart-modal__yes-button");
        new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        old_element = document.getElementById("restart-modal__no-button");
        new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }

    hideRestartModal = () => {
        document.getElementById("restart-modal").style.display = "none";
    }

    openRestartModal = () => {
        document.getElementById("restart-modal").style.display = "flex";
        document.getElementById("restart-model-score").innerHTML =  "Your score: " + this.world.getPlayer().getScore();
    }

    hideNetworkModal = () => {
        document.getElementById("network-modal").style.display = "none";
    }

    openNetworkModal = () => {
        document.getElementById("network-modal").style.display = "flex";
    }

    resizeCanvas = () => {
        this.canvas.width = Math.floor(window.innerWidth / this.tileSize) * this.tileSize;
        this.canvas.height = Math.floor(window.innerHeight / this.tileSize) * this.tileSize;
        this.objectsCanvas.width = this.canvas.width;
        this.objectsCanvas.height = this.canvas.height;

        this.render();
    }

    onBackButton = () => {
        navigator.notification.confirm(
            'Do you want to exit?',
            this.onConfirmExit,
            'Exit',
            ['Ok','Cancel']
        );
    }

    returnToMenu = () => {
        document.getElementById("menu").style.opacity = "1";
        document.getElementById("canvas").style.opacity = "0";
        document.getElementById("canvas").style.visibility = "hidden";
        document.getElementById("menu").style.visibility = "visible";
    }

    onConfirmExit = buttonIndex => {
        if (buttonIndex == 1)
            this.returnToMenu();
        else return;
    }

    clearGame = () => {
        this.stopObjects();
        this.removeListeners();

        this.objectsContext.clearRect(0, 0, this.objectsCanvas.width, this.objectsCanvas.height);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.hammer = null;
        this.world = null;
        this.biomes = [];
        this.pug = null;
    }

    render = () => {
        if (this.biomes !== null && this.pug !== null) {
            this.biomes.forEach(biome => {
                biome.getTiles().forEach(tile => {
                    if (tile.getIsDisplayed())
                        this.draw(tile, this.context);
                });
                biome.getObjects().forEach(object => {
                    if (object.getIsDisplayed())
                        this.draw(object, this.objectsContext);
                });
            });
            if (this.pug.getIsDisplayed())
                this.draw(this.pug, this.objectsContext);
            this.draw(this.pug.getHeartObject(), this.objectsContext);
            this.drawScore();
            this.context.drawImage(this.objectsCanvas, 0, 0);
        }
    }

    drawScore = () => {
        this.objectsContext.fillStyle = "black";
        this.objectsContext.font = "32px Times Roman";
        this.objectsContext.textAlign="right";
        this.objectsContext.fillText(this.world.getPlayer().getScore(), this.canvas.width-8, 64);

        this.objectsContext.fillStyle = "white";
        this.objectsContext.font = "32px Times Roman";
        this.objectsContext.textAlign="right";
        this.objectsContext.fillText(this.world.getPlayer().getScore(), this.canvas.width-10, 62);
    }

    rerenderPassedObject = (indexBiome, removeObject) => {
        let newObject = this.biomes[indexBiome].spawnObject(removeObject.getStartY(), removeObject.getX());
        newObject.setAsset(removeObject.getAsset());
        newObject.setAW(removeObject.getAW());
        newObject.setAH(removeObject.getAH());
        newObject.setXA(removeObject.getXA());
        newObject.setYA(removeObject.getYA());
        newObject.setW(removeObject.getW());
        newObject.setH(removeObject.getH());
        newObject.setDelay(0);
        newObject.start();
        return newObject;
    }

    draw = (object, context) => {
        context.drawImage(object.getAsset(), object.getXA(), object.getYA(),
            object.getAW(), object.getAH(), object.getX(),
            object.getY(), object.getW(), object.getH());
    }

    checkCollision = () => {
        this.biomes.forEach(biome => {
            biome.getObjects().forEach(object => {
                if (this.pug.getCollisionSensibility() && this.pug.isBoxCollision(object.getX(), object.getY(), object.getW(), object.getH(), object.getType(), this.objectsContext)) {
                    switch(object.getType()) {
                        case "RIVER":
                            this.pug.setAttachment(object);
                            return;
                        case "SKY":
                            this.pug.setAttachment(object);
                            return;
                        case "STREET":
                            this.pug.setAttachment(null);
                            this.pug.initCollision();
                            return;
                    }
                }
            });
        });
    }

    checkStatuses = () => {
        this.checkScore();
        this.checkLevelStatus();
        this.checkMoveWorld();
        this.checkRemoveRespawn();
        this.checkRespawnWorld();
        this.checkCurrentBiome();
        this.checkGameStatus();
    }

    checkLevelStatus = () => {
        let score = this.world.getPlayer().getScore();
        if (score % 20 === 0 && score >= 20 && this.pug.isPossibleToLevelUp()) {
            this.pug.setPossibilityToLevelUp(false);
            this.world.levelUp();
        }
    }

    checkGameStatus = () => {
        if (this.pug.getHearts() === 0) {

            if (!this.soundsMute)
                this.gameoverSound.play();

            if (!this.world.getPlayer().tryAddToDatabase())
                this.openNetworkModal();

            this.openRestartModal();

            this.world = null;

        }
    }

    checkCurrentBiome = () => {
        let currentBiome = this.biomes.filter((biome) => {
            if (biome.getTiles()[0] !== undefined)
                return biome.getTiles()[0].getX() === this.pug.getX()
                || biome.getTiles()[biome.getTiles().length-1].getX() === this.pug.getX();
        });
        if (currentBiome.length !== 0) {
            if (currentBiome[0] instanceof SaveArea)
                this.pug.setCurrentBiome("SAVE_AREA");
            else if (currentBiome[0] instanceof River)
                this.pug.setCurrentBiome("RIVER");
            else if (currentBiome[0] instanceof Sky)
                this.pug.setCurrentBiome("SKY");
            else if (currentBiome[0] instanceof Street)
                this.pug.setCurrentBiome("STREET");
        }
    }

    checkScore = () => {
        this.world.getPlayer().setScore(this.pug.getPassedWorld());
    }

    checkRespawnWorld = () => {
        let lastTileX = this.biomes[this.biomes.length-1].getTiles()[this.biomes[this.biomes.length-1].getTiles().length-1].getX();
        if (lastTileX >= this.canvas.width-this.tileSize && lastTileX <= this.canvas.width+(2*this.tileSize)) {
            this.biomes.push(this.world.spawnBiome(this.biomes));
        }
    }

    checkMoveWorld = () => {
        if (this.pug.getX() == this.canvas.width/2) {
            this.biomes.forEach(biome => {
                biome.getTiles().forEach(tile => {
                    tile.setX(tile.getX()-this.tileSize);
                    if (tile.getX() < 0) {
                        tile.setIsDisplayed(false);
                        tile.setToRespawn(false);
                    }
                });
                biome.getObjects().forEach(object => {
                    object.setX(object.getX()-this.tileSize);
                    if (object.getX() < 0) {
                        object.setIsDisplayed(false);
                        object.setToRespawn(false);
                    }
                });
            });
            this.world.filledTiles -= 1;
            this.pug.setX(this.pug.getX()-this.tileSize);
        }
    }

    checkRemoveRespawn = () => {
        this.biomes.forEach((biome, indexBiome) => {
            biome.getTiles().forEach((tile, index) => {
                if(!tile.getIsDisplayed())
                    this.biomes[indexBiome].getTiles().splice(index, 1);
            });
            biome.getObjects().forEach((object, index) => {
                let removeObject = this.biomes[indexBiome].getObjects()[index];
                if (!object.getIsDisplayed()) {
                    this.biomes[indexBiome].getObjects().splice(index, 1);
                    if (object.getToRespawn())
                        this.biomes[indexBiome].getObjects().push(this.rerenderPassedObject(indexBiome, removeObject));
                }
            });
        });
    }

    init = (world) => {
        this.world = world;
        this.playerNickname = this.world.getPlayer().getNickname();
        this.world.biomes.forEach(biome => {
            this.biomes = this.biomes.concat(biome);
        });
        this.pug = new Pug(this.assetsLoader, this.soundsMute, 0, 0, 48, 48, 0, 0, 48, 48, true, 0);
    }

    startObjects = () => {
        this.pug.start();
        this.biomes.forEach(biome => {
            biome.getTiles().forEach(tile => {
                tile.start();
            });
            biome.getObjects().forEach(object => {
                object.start();
            })
        });
    }

    stopObjects = () => {
        this.pug.stop();
        this.biomes.forEach(biome => {
            biome.getTiles().forEach(tile => {
                tile.stop();
            });
            biome.getObjects().forEach(object => {
                object.stop();
            })
        });
    }

    start = () => {
        if (this.world !== null) {
            requestAnimationFrame(this.start);
            this.objectsContext.clearRect(0, 0, this.objectsCanvas.width, this.objectsCanvas.height);
            this.render();
            this.checkCollision();
            this.checkStatuses();
        }
    }

}