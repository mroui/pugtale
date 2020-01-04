class Game {

    constructor(assetsLoader) {
        this.canvas = document.getElementById("canvas");

        this.assetsLoader = assetsLoader;
        this.render = new Render(this.canvas);
        this.world = null;
        this.pug = null;
        this.objects = [];
    }

    play = () => {
        this.closeMenu();
        this.prepare();
        this.render.start(this.objects);
    }

    prepare = () => {
        this.initObjects();
        //init moving listeneners
        //init gestures
        //init everything to render start
    }

    initObjects = () => {
        this.world = new World(this.assetsLoader, this.canvas);
        this.world.biomes.forEach(biome => {
            this.objects = this.objects.concat(biome.getBiome());
        });
        this.pug = new Pug(this.assetsLoader.get("PUG"), 0, 0, 0, 0, 48, 48);
        this.objects.push(this.pug);
    }

    closeMenu = () => {
        document.getElementById("menu").style.opacity = "0";
        document.getElementById("canvas").style.opacity = "1";
        document.getElementById("canvas").style.visibility = "visible";
        document.getElementById("menu").style.visibility = "hidden";
    }
}