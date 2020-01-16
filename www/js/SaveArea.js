class SaveArea extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("SAVE_AREA"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;

        this.powerupW = tileW;
        this.powerupH = tileH;
        this.delay = 0;

        this.powerupAsset = null;
        this.powerupType = null;

        this.initObjects();
    }

    initObjects = () => {
        let onTileX = rand(0, this.getTilesCountW()-1);
        let onTileY = rand(0, this.getTilesCountH()-1);

        let object = this.spawnObject(onTileY*this.tileH, onTileX*this.tileW + this.activeTileX);
        if (object) this.objects.push(object);

        this.activeTileX += this.tileW;
    }

    spawnObject = (onTileY, onTileX) => {
        let powerupProbability = rand(0, 5);
        if (powerupProbability === 5) {
            this.randAssetAndType();
            let object = new Powerup(this.powerupAsset, 0, 0, this.powerupW, this.powerupH, onTileX, onTileY, this.powerupW, this.powerupH, false, 0, this.powerupType);
            return object;
        } else return null;
    }

    randAssetAndType = () => {
        let assetNumber = rand(1,3);
        switch (assetNumber) {
            case 1:
                this.powerupType = "POWERUP-HEAL";
                this.powerupAsset = this.assetsLoader.get("POWERUP1");
                return;
            case 2:
                this.powerupType = "POWERUP-SCORE";
                this.powerupAsset = this.assetsLoader.get("POWERUP2");
                return;
            case 3:
                this.powerupType = "POWERUP-UNTOUCHED";
                this.powerupAsset = this.assetsLoader.get("POWERUP3");
                return;
        }
    }

}