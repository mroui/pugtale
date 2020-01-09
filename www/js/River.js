class River extends Biome{

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("RIVER"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;

        this.donutW = tileW;
        this.donutH = tileH;
        this.direction = -this.donutH;
        this.delay = 0;

        this.initObjects();
    }

    initObjects = () => {
        for (let i = 0; i < this.getTilesCountW(); i++) {

            let min = Math.floor(this.getTilesCountH() / 3);
            let max = Math.ceil(this.getTilesCountH() / 4) + 2;
            if (min <= 0) min = 1;
            if (max <= 0) max = 1;

            let objectsCount = rand(min, max);
            let direction = this.setDirection();

            for(let i = 0; i < objectsCount; i++) {
                let object = this.spawnObject(direction, this.activeTileX);
                this.objects.push(object);
            }

            this.delay = 0;
            this.isFirstObject = true;
            this.activeTileX += this.tileW;
        }
    }

    setDirection = () => {
        this.direction = this.direction < 0 ? this.canvas.height : -this.donutH;
        return this.direction;
    }

    spawnObject = (direction, activeTileX) => {
        if (this.isFirstObject) this.isFirstObject = false;
        else this.randDelay();
        let object = new GameObject(this.assetsLoader.get("DONUT"), 0, 0, this.donutW, this.donutH, activeTileX, direction, this.donutW, this.donutH, true, this.delay);
        return object;
    }

    randDelay = () => {
        let min = 750;
        let max = 2000;
        this.delay += rand(min, max);
    }

}