class World {

    constructor(assetsLoader, canvas) {
        this.assetsLoader = assetsLoader;
        this.canvas = canvas;
        this.level = 1;  //how hard world is, firstly 1

        this.biomes = [];    //array of biomes: river, street...
        this.init();
    }

    init = () => {
        //loop with adding biome to fill canvas width & height...
        this.addBiome(1);
    }

    addBiome = id => {
        // switch (id) {
        // case 1:
            this.biomes.push(new SaveArea(this.assetsLoader.get("SAVE_AREA"), this.canvas.height, this.level));
        //cases with biomes...
        //}
    }

    levelUp = () => {
        this.level++;
    }

}