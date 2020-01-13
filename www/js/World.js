class World {

    constructor(assetsLoader, canvas, player) {
        this.assetsLoader = assetsLoader;
        this.canvas = canvas;
        this.player = player;

        this.level = 1;

        this.tileW = 48;
        this.tileH = 48;
        this.tilesCountW = this.canvas.width / this.tileW;
        this.filledTiles = 0;

        this.biomes = [];

        this.prevBiome = null;

        this.init();
    }

    init = () => {
        this.biomes.push(this.addBiome(0));
        while (this.filledTiles < this.tilesCountW) {
            const id = rand(1, 3);
            if (id !== this.prevBiome) {
                this.prevBiome = id;
                this.biomes.push(this.addBiome(id));
                if (this.biomes.length % this.level == 0) {
                    this.biomes.push(this.addBiome(0));
                    this.prevBiome = 0;
                }
            }
        }
    }

    getPlayer = () => {
        return this.player;
    }

    spawnBiome = biomes => {
        let newBiome = null;

        if (this.prevBiome!=0 && biomes.length % this.level == 0) {
            newBiome = this.addBiome(0);
            this.prevBiome = 0;
        }
        else {
            let id = this.prevBiome;
            while (id === this.prevBiome) id = rand(1, 3);
            this.prevBiome = id;
            newBiome = this.addBiome(id);
        }
        newBiome.getObjects().forEach(object => { object.start(); });
        newBiome.getTiles().forEach(tile => { tile.start(); });
        return newBiome;
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
        return biome;
    }

    levelUp = () => {
        this.level++;
    }

}