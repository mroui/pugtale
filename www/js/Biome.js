class Biome {

    constructor(asset, canvas, tileW, tileH, filledTiles, level) {
        this.tiles = [];    //array of tiles game objects

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
            max = 8 - level;
            min = 6 - level;
        }
        else {
            max = level + 2;
            min = level + 1;
        }

        this.tilesCountW = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setTiles = () => {
        let tileX = this.activeTileX, tileY = 0;
        let tileAssetX = 0, tileAssetY = 0;

        for (let h = 0; h < this.tilesCountH; h++, tileY += this.tileH) {

            for (let w = 0; w < this.tilesCountW; w++, tileX += this.tileW) {

                let tile = new GameObject(this.asset, tileAssetX, tileAssetY, tileX, tileY, this.tileW, this.tileH);
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

    getBiome = () => {
        return this.tiles;
    }

    getTileCountW = () => {
        return this.tilesCountW;
    }

}