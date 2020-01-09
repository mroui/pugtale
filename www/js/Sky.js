class Sky extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("SKY"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;

        this.cloudW = tileW;
        this.cloudH = 0;
        this.direction = -3 * this.tileH;
        this.delay = 0;

        this.initObjects();
    }

    initObjects = () => {
        for (let i = 0; i < this.getTilesCountW(); i++) {

            let min = Math.floor(this.getTilesCountH() / 3);
            let max = Math.ceil(this.getTilesCountH() / 4) + 2;

            let objectsCount = rand(min, max);
            let direction = this.setDirection();

            for (let j = 0; j < objectsCount; j++) {
                let object = this.spawnObject(direction, this.activeTileX);
                this.objects.push(object);
            }

            this.delay = 0;
            this.isFirstObject = true;
            this.activeTileX += this.tileW;
        }
    }

    spawnObject = (direction, activeTileX) => {
        if (this.isFirstObject) this.isFirstObject = false;
        else this.randDelay();
        let asset = this.randAsset();
        let object = new GameObject(asset, 0, 0, this.cloudW, this.cloudH, activeTileX, direction, this.cloudW, this.cloudH, true, this.delay);
        return object;
    }

    setDirection = () => {
        this.direction = this.direction < 0 ? this.canvas.height : -3 * this.tileH;
        return this.direction;
    }

    randAsset = () => {
        let assetNumber = rand(1, 2);
        switch (assetNumber) {
        case 1:
            this.cloudH = 2 * this.tileH;
            return this.assetsLoader.get("CLOUD1");
        case 2:
            this.cloudH = 3 * this.tileH;
            return this.assetsLoader.get("CLOUD2");
        }
    }

    randDelay = () => {
        let min = 750;
        let max = 2000;
        this.delay += rand(min, max);
    }

}