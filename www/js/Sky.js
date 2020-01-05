class Sky extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("SKY"), canvas, tileW, tileH, filledTiles, level);
    }

}