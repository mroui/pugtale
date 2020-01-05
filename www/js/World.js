class World {

    constructor(assetsLoader, canvas) {
        this.assetsLoader = assetsLoader;
        this.canvas = canvas;
        this.level = 1;  //how hard world is, firstly 1

        this.tileW = 48;
        this.tileH = 48;
        this.tilesCountW = this.canvas.width / this.tileW;
        this.filledTiles = 0;

        this.biomes = [];    //array of biomes: river, street...
        this.init();
    }

    init = () => {
        let prevId = null;

        this.addBiome(0);
        while (this.filledTiles < this.tilesCountW) {
            const id = this.rand(1, 3);
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
            biome = new SaveArea(this.assetsLoader.get("SAVE_AREA"), this.canvas, this.tileW, this.tileH, this.filledTiles, this.level);
            break;
        case 1:
            biome = new River(this.assetsLoader.get("RIVER"), this.canvas, this.tileW, this.tileH, this.filledTiles, this.level);
            break;
        case 2:
            biome = new Street(this.assetsLoader.get("STREET"), this.canvas, this.tileW, this.tileH, this.filledTiles, this.level);
            break;
        case 3:
            biome = new Sky(this.assetsLoader.get("SKY"), this.canvas, this.tileW, this.tileH, this.filledTiles, this.level);
            break;
        }
        this.filledTiles += biome.getTileCountW();
        this.biomes.push(biome);
    }

    levelUp = () => {
        this.level++;
    }

    rand = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}