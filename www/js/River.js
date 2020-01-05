class River extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("RIVER"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;
        this.level = level;

        this.donuts = [];

        this.donutW = tileW;
        this.donutH = tileH;

        this.activeTileX = filledTiles * this.tileW;

        this.initObjects();
    }

    initObjects = () => {
        for (let i = 0; i < this.getTilesCountW(); i++) {
            let direction;
            if (rand(0, 1)) direction = -this.donutH;
            else direction = this.canvas.height;

            this.initDonuts(direction);
            this.addObjects(this.donuts);
            this.activeTileX += this.tileW;
        }
    }

    initDonuts = direction => {
        let min = this.getTilesCountH() - 2;
        let max = this.getTilesCountH() + 2;
        let donutsCount = rand(min, max);

        for (let j = 0; j < donutsCount; j++) {
            let donut = new GameObject(this.assetsLoader.get("DONUT"), 0, 0, this.donutW, this.donutH, this.activeTileX, direction, this.donutW, this.donutH);
            this.donuts.push(donut);
        }
    }

}