class River extends Biome{

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("RIVER"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;

        this.donutW = tileW;
        this.donutH = tileH;

        this.delay = 0;
        this.renderSpeed = 20;

        this.direction = -this.donutH;

        this.initObjects();
    }

    initObjects = () => {
        for (let i = 0; i < this.getTilesCountW(); i++) {

            let min = 6 - this.level;
            let max = 8 - this.level;
            if (min == 0) {
                min = 2;
                max = 5;
            }

            let objectsCount = rand(min, max);
            let direction = this.setDirection();

            for(let i = 0; i < objectsCount; i++) {
                let object = this.spawnObject(direction, this.activeTileX);
                this.objects.push(object);
            }

            this.delay = 0;
            this.activeTileX += this.tileW;
        }
    }

    setDirection = () => {
        this.direction = this.direction < 0 ? this.canvas.height : -this.donutH;
        return this.direction;
    }

    spawnObject = (direction, activeTileX) => {
        this.randDelay();
        let donut = new Donut(this.assetsLoader.get("DONUT"), 0, 0, this.donutW, this.donutH, activeTileX, direction,       this.donutW, this.donutH, this.renderSpeed, this.delay);
        return donut;
    }

    randDelay = () => {
        let min = 1500;
        let max = 3000;
        this.delay += rand(min, max);
    }

}