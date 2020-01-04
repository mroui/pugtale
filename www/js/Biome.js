class Biome {

    constructor(asset, h, level) {
        this.tiles = [];    //array of tiles game objects

        this.asset = asset;
        this.tileW = 48;
        this.tileH = 48;
        this.height = h / this.tileH;
        this.width = 0;

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

        this.width = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setTiles = () => {
        let tileX = 0, tileY = 0;
        let tileAssetX = 0, tileAssetY = 0;

        for (let h = 0; h < this.height; h++, tileY += this.tileH) {

            for (let w = 0; w < this.width; w++, tileX += this.tileW) {

                let tile = new GameObject(this.asset, tileAssetX, tileAssetY, tileX, tileY, this.tileW, this.tileH);
                this.tiles.push(tile);

                if (w == 0 || w == this.width - 2) tileAssetX += this.tileW;
                if (this.width == 2) tileAssetX += this.tileW;

            }
            tileAssetX = 0;
            tileX = 0;

            if (h == 0 || h == this.height - 2) tileAssetY += this.tileH;
            if (this.height == 2) tileAssetY += this.tileH;
        }
    }

    getBiome = () => {
        return this.tiles;
    }

}