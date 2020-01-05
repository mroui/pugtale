class Biome {

    constructor(asset, canvas, tileW, tileH, filledTiles, level) {
        this.tiles = [];    //array of biome background
        this.objects = [];  //array of biome objects

        this.canvas = canvas;

        this.asset = asset;
        this.tileW = tileW;
        this.tileH = tileH;
        this.tilesCountH = canvas.height / this.tileH;
        this.tilesCountW = 0;

        this.activeTileX = filledTiles * this.tileW;

        this.setSize(level);
        this.setTiles();
    }

    setSize = level => {
        let max, min;

        if (this instanceof SaveArea) {
            max = 4;
            min = 2;
        }
        else {
            max = level + 2;
            min = level + 1;
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

    getBiomeContent = () => {
        let content = this.tiles.concat(this.objects);
        return content;
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

}