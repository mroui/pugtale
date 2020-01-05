class River extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("RIVER"), canvas, tileW, tileH, filledTiles, level);
    }

}