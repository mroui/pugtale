class Sky extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("SKY"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;
        this.level = level;

        this.clouds = [];

        this.cloudW = tileW;
        this.cloudH = 0;

        this.activeTileX = filledTiles * tileW;

        this.initObjects();
    }

    initObjects = () => {
        for (let i = 0; i < this.getTilesCountW(); i++) {
            let direction;
            if (rand(0, 1)) direction = -3 * this.tileH;
            else direction = this.canvas.height;

            this.initClouds(direction);
            this.addObjects(this.clouds);
            this.activeTileX += this.tileW;
        }
    }

    initClouds = direction => {
        let min = this.getTilesCountH() - 2;
        let max = this.getTilesCountH() + 2;
        let cloudsCount = rand(min, max);

        for (let j = 0; j < cloudsCount; j++) {
            let asset = this.randAsset();
            let cloud = new GameObject(asset, 0, 0, this.cloudW, this.cloudH, this.activeTileX, direction, this.cloudW, this.cloudH);
            this.clouds.push(cloud);
        }
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

}