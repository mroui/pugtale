class Biome {

    constructor(asset, canvas, tileW, tileH, filledTiles, level) {
        this.asset = asset;
        this.canvas = canvas;
        this.tileW = tileW;
        this.tileH = tileH;
        this.filledTiles = filledTiles;
        this.level = level;

        this.tiles = [];
        this.objects = [];
        this.isFirstObject = true;

        this.tilesCountH = canvas.height / this.tileH;
        this.tilesCountW = 0;

        this.activeTileX = this.filledTiles * this.tileW;

        this.setSize(this.level);
        this.setTiles();
    }

    setSize = level => {
        let max, min;

        if (this instanceof SaveArea) {
            min = 2;
            max = 4;
        }
        else {
            min = level + 1;
            max = level + 2;
        }

        this.tilesCountW = rand(min, max);
    }

    setTiles = () => {
        let tileX = this.activeTileX, tileY = 0;
        let tileAssetX = 0, tileAssetY = 0;

        for (let h = 0; h < this.tilesCountH; h++, tileY += this.tileH) {

            for (let w = 0; w < this.tilesCountW; w++, tileX += this.tileW) {

                let tile = new GameObject(this.asset, tileAssetX, tileAssetY, this.tileW, this.tileH, tileX, tileY, this.tileW, this.tileH);
                this.tiles.push(tile);

                if (w == 0 || w == this.tilesCountW - 2) tileAssetX += this.tileW;
                if (this.tilesCountW == 2) tileAssetX += this.tileW;

            }
            tileAssetX = 0;
            tileX = this.activeTileX;

            if (h == 0 || h == this.tilesCountH - 2) tileAssetY += this.tileH;
            if (this.tilesCountH == 2) tileAssetY += this.tileH;
        }
    }

    getTiles = () => {
        return this.tiles;
    }

    getTilesCountW = () => {
        return this.tilesCountW;
    }

    getTilesCountH = () => {
        return this.tilesCountH;
    }

    addObjects = objects => {
        this.objects = this.objects.concat(objects);
    }

    getObjects = () => {
        return this.objects;
    }

    setDirection = () => {}

    spawnObjects = () => {}

    initObjects = () => {}

    randDelay = () => {}

}