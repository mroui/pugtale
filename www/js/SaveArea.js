class SaveArea extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("SAVE_AREA"), canvas, tileW, tileH, filledTiles, level);
    }

}