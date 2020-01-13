class Render {

    constructor(canvas, assetsLoader, hammer)  {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');

        this.objectsCanvas = document.createElement('canvas');
        this.objectsCanvas.width = this.canvas.width;
        this.objectsCanvas.height = this.canvas.height;
        this.objectsContext = this.objectsCanvas.getContext('2d');

        this.assetsLoader = assetsLoader;
        this.hammer = hammer;

        this.world = null;
        this.biomes = [];
        this.pug = null;

        this.tileSize = 48;

        this.keysCurrentlyPressed = new Set();

        this.setListeners();
    }

    setListeners = () => {
        window.addEventListener('resize', this.resizeCanvas, false);

        document.addEventListener('keydown', e => {
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
        });
        document.addEventListener('keyup', e => this.keysCurrentlyPressed.delete(e.keyCode));

        document.addEventListener("backbutton", this.onBackButton, false);

        this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        this.hammer.on("swipeleft", e => { e.preventDefault(); this.pug.setDirection(LEFT); });
        this.hammer.on("swiperight", e => { e.preventDefault(); this.pug.setDirection(RIGHT); });
        this.hammer.on("swipeup", e => { e.preventDefault(); this.pug.setDirection(UP); });
        this.hammer.on("swipedown", e => { e.preventDefault(); this.pug.setDirection(DOWN); });

        this.resizeCanvas();
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
            this.onConfirmPrompt,
            'Exit',
            ['Ok','Cancel']
        );
    }

    onConfirmPrompt = buttonIndex => {
        if (buttonIndex == 1) {
            this.clearGame();
            document.getElementById("menu").style.opacity = "1";
            document.getElementById("canvas").style.opacity = "0";
            document.getElementById("canvas").style.visibility = "hidden";
            document.getElementById("menu").style.visibility = "visible";
        }
        else return;
    }

    clearGame = () => {
        this.objectsContext.clearRect(0, 0, this.objectsCanvas.width, this.objectsCanvas.height);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas = null;
        this.objectsCanvas = null;
        this.world = null;
        this.biomes = null;
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
            this.context.drawImage(this.objectsCanvas, 0, 0);
        }
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
                if (this.pug.getCollisionSensibility() && this.pug.isBoxCollision(object.getX(), object.getY(), object.getW(), object.getH(), this.objectsContext)) {
                    this.pug.setCollisionSensibility(false);
                    this.pug.startHitAnim();
                    this.pug.hitSound.play();
                    if(this.pug.getX() !== 0) {
                        this.pug.setX(this.pug.getX() - this.pug.getW());
                    }
                }
            });
        });
    }

    checkStatuses = () => {
        this.checkMoveWorld();
        this.checkRemoveRespawn();
        this.checkRespawnWorld();
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
        this.world.biomes.forEach(biome => {
            this.biomes = this.biomes.concat(biome);
        });
        this.pug = new Pug(this.assetsLoader, 0, 0, 48, 48, 0, 0, 48, 48, true, 0);
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

    start = () => {
        this.objectsContext.clearRect(0, 0, this.objectsCanvas.width, this.objectsCanvas.height);
        this.render();
        this.checkCollision();
        this.checkStatuses();
        requestAnimationFrame(this.start);
    }

}