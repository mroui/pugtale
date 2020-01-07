class World {

    constructor(assetsLoader, canvas) {
        this.assetsLoader = assetsLoader;
        this.canvas = canvas;

        this.level = 1;

        this.tileW = 48;
        this.tileH = 48;
        this.tilesCountW = this.canvas.width / this.tileW;
        this.filledTiles = 0;

        this.biomes = [];

        this.init();
    }

    init = () => {
        let prevId = null;

        this.addBiome(0);
        while (this.filledTiles < this.tilesCountW) {
            const id = rand(1, 3);
            if (id !== prevId) {
                prevId = id;
                this.addBiome(id);
                if (this.biomes.length % this.level == 0) this.addBiome(0);
            }
        }
    }

    addBiome = id => {
        let biome = null;

        switch (id) {
        case 0:
            biome = new SaveArea(this.assetsLoader, this.canvas, this.tileW, this.tileH, this.filledTiles, this.level);
            break;
        case 1:
            biome = new River(this.assetsLoader, this.canvas, this.tileW, this.tileH, this.filledTiles, this.level);
            break;
        case 2:
            biome = new Street(this.assetsLoader, this.canvas, this.tileW, this.tileH, this.filledTiles, this.level);
            break;
        case 3:
            biome = new Sky(this.assetsLoader, this.canvas, this.tileW, this.tileH, this.filledTiles, this.level);
            break;
        }
        this.filledTiles += biome.getTilesCountW();
        this.biomes.push(biome);
    }

    levelUp = () => {
        this.level++;
    }

}