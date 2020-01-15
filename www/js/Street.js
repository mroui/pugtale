class Street extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("STREET"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;

        this.vehicleW = 2 * tileW;
        this.vehicleH = 0;
        this.assetX = 0;
        this.assetY = 0;
        this.direction = -4 * tileH;
        this.delay = 0;
        this.asset = null;

        this.initObjects();
    }

    initObjects = () => {
        //for every traffic lane - 3 tiles->2cars
        let lanesCount = this.getTilesCountW()-1;
        for (let i = 0; i < lanesCount; i++) {

            let ifCar = rand(0, 1);
            if(ifCar) {
                this.initCars();
            } else {
                this.initTrucks();
            }

            this.delay = 0;
            this.assetX = 0;
            this.isFirstObject = true;
            this.activeTileX += this.tileW;
        }
    }

    spawnObject = (direction, activeTileX) => {
        let object = new GameObject(this.asset, this.assetX, this.assetY, this.vehicleW, this.vehicleH, activeTileX, direction, this.vehicleW, this.vehicleH, true, this.delay, "STREET");
        return object;
    }

    initCars = () => {
        let min = Math.ceil(this.getTilesCountH() / 5) - 1;
        let max = Math.floor(this.getTilesCountH() / 6) + 1;
        if (min <= 0) min = 1;
        if (max <= 0) max = 1;

        let objectsCount = rand(min, max);
        let direction = this.setDirection();
        if (direction > 0) this.rotateAsset();

        for (let j = 0; j < objectsCount; j++) {
            this.randAsset("CARS");
            if (this.isFirstObject) this.isFirstObject = false;
            else this.randDelay(1600, 5000);
            let object = this.spawnObject(direction, this.activeTileX);
            this.objects.push(object);
        }
    }

    initTrucks = () => {
        let min = Math.floor(this.getTilesCountH() / 6) - 1;
        let max = Math.floor(this.getTilesCountH() / 6);
        if (min <= 0) min = 1;
        if (max <= 0) max = 1;

        let objectsCount = rand(min, max);
        let direction = this.setDirection();
        if (direction > 0) this.rotateAsset();
        this.randAsset("TRUCKS");

        for (let j = 0; j < objectsCount; j++) {
            if (this.isFirstObject) this.isFirstObject = false;
            else this.randDelay(3250, 6000);
            let object = this.spawnObject(direction, this.activeTileX);
            this.objects.push(object);
        }
    }

    setDirection = () => {
        this.direction = this.direction < 0 ? this.canvas.height : -4 * this.tileH;
        return this.direction;
    }

    randAsset = vehicle => {
        if (vehicle === "CARS") {
            let assetNumber = rand(1, 3);
            switch (assetNumber) {
            case 1:
                this.vehicleH = 2 * this.tileH;
                this.asset = this.assetsLoader.get("CAR1");
                break;
            case 2:
                this.vehicleH = 2 * this.tileH;
                this.asset = this.assetsLoader.get("CAR2");
                break;
            case 3:
                this.vehicleH = 2 * this.tileH;
                this.asset = this.assetsLoader.get("CAR3");
                break;
            }
        } else if (vehicle === "TRUCKS") {
            let assetNumber = rand(1, 2);
            switch (assetNumber) {
            case 1:
                this.vehicleH = 4 * this.tileH;
                this.asset = this.assetsLoader.get("TRUCK1");
                break;
            case 2:
                this.vehicleH = 3 * this.tileH;
                this.asset = this.assetsLoader.get("TRUCK2");
                break;
            }
        }
    }

    rotateAsset = () => {
        this.assetX += this.vehicleW;
    }

    randDelay = (min, max) => {
        this.delay += rand(min, max);
    }

}