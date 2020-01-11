class Render {

    constructor(canvas, assetsLoader, hammer)  {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
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
              }
        });
        document.addEventListener('keyup', e => this.keysCurrentlyPressed.delete(e.keyCode));

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
        this.render();
    }

    render = () => {
        if (this.biomes !== null && this.pug !== null) {
            this.biomes.forEach(biome => {
                biome.getTiles().forEach(tile => {
                    if (tile.getIsDisplayed())
                        this.draw(tile);
                });
                biome.getObjects().forEach(object => {
                    if (object.getIsDisplayed())
                        this.draw(object);
                });
            });
            if (this.pug.getIsDisplayed())
                this.draw(this.pug);
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

    draw = object => {
        this.context.drawImage(object.getAsset(), object.getXA(), object.getYA(),
            object.getAW(), object.getAH(), object.getX(),
            object.getY(), object.getW(), object.getH());
    }

    checkCollision = () => {
        //check if collision
    }

    checkStatus = () => {
        this.checkMoveWorld();
        this.checkRemoveRespawn();
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
        this.pug = new Pug(this.assetsLoader.get("PUG"), 0, 0, 48, 48, 0, 0, 48, 48, true, 0);
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
        this.render();
        //this.checkCollision();
        this.checkStatus();
        //rerender more world / objects
        requestAnimationFrame(this.start);
    }

}