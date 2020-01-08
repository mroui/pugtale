class Render {

    constructor(canvas, assetsLoader)  {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.assetsLoader = assetsLoader;

        this.world = null;
        this.biomes = [];
        this.pug = null;

        this.tileSize = 48;

        this.setListeners();
    }

    setListeners = () => {
        window.addEventListener('resize', this.resizeCanvas, false);
        this.resizeCanvas();
        //init moving listeneners
        //init gestures
        //init everything to render start
    }

    resizeCanvas = () => {
        this.canvas.width = Math.floor(window.innerWidth / this.tileSize) * this.tileSize;
        this.canvas.height = Math.floor(window.innerHeight / this.tileSize) * this.tileSize;
        this.render();
    }

    render = () => {
        if (this.biomes !== null && this.pug !== null) {

            let arrayFromRemove = false, indexBiome = 0, index = 0;

            this.biomes.forEach((biome, iB) => {

                biome.getTiles().forEach((tile, iT) => {
                    if (tile.getIsDisplayed()) this.draw(tile);
                    else if (tile.getToRemove()) {arrayFromRemove = true; indexBiome = iB; index = iT;}
                });
                if (arrayFromRemove) {
                    let removeObject = this.biomes[indexBiome].getTiles()[index];
                    this.biomes[indexBiome].getTiles().splice(index, 1);
                    this.biomes[indexBiome].getTiles().push(this.rerenderPassedObject(indexBiome, removeObject));
                    arrayFromRemove = false;
                }

                biome.getObjects().forEach((object, iO) => {
                    if (object.getIsDisplayed()) this.draw(object);
                    else if (object.getToRemove()) {arrayFromRemove = true; indexBiome = iB; index = iO;}
                });
                if (arrayFromRemove) {
                    let removeObject = this.biomes[indexBiome].getObjects()[index];
                    this.biomes[indexBiome].getObjects().splice(index, 1);
                    this.biomes[indexBiome].getObjects().push(this.rerenderPassedObject(indexBiome, removeObject));
                    arrayFromRemove = false;
                }

            });
            if (this.pug.getIsDisplayed()) this.draw(this.pug);
        }
    }

    rerenderPassedObject = (indexBiome, removeObject) => {
        let newObject = this.biomes[indexBiome].spawnObject(removeObject.getStartY(), removeObject.getX());
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
        //check if game end
    }

    init = (world) => {
        this.world = world;
        this.world.biomes.forEach(biome => {
            this.biomes = this.biomes.concat(biome);
        });
        this.pug = new Pug(this.assetsLoader.get("PUG"), 0, 0, 48, 48, 0, 0, 48, 48);
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
        //this.checkStatus();
        //rerender more world / objects
        requestAnimationFrame(this.start);
    }

}