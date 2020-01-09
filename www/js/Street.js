class Street extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("STREET"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;

        this.vehicleW = 2 * tileW;
        this.vehicleH = 0;
        this.direction = -4 * tileH;
        this.delay = 0;
        this.asset = null;

        this.initObjects();
    }

    initObjects = () => {
        //for every traffic lane - 3 tiles->2cars
        let lanesCount = Math.ceil(this.getTilesCountW()/2);
        for (let i = 0; i < lanesCount; i++) {

            let ifCar = rand(0, 1);
            if(ifCar) {
                this.initCars();
            } else {
                this.initTrucks();
            }

            this.delay = 0;
            this.activeTileX += this.tileW;
        }
    }

    initTrucks = () => {
        let min = Math.floor(this.getTilesCountH() / 3);
        let max = Math.ceil(this.getTilesCountH() / 4) + 2;

        let objectsCount = rand(min, max);
        let direction = this.setDirection();

        for (let j = 0; j < objectsCount; j++) {
            this.randAsset("TRUCKS");
            this.randDelay(1500, 2500);
            let object = this.spawnObject(direction, this.activeTileX);
            this.objects.push(object);
        }
    }

    spawnObject = (direction, activeTileX) => {
        let object = new GameObject(this.asset, 0, 0, this.vehicleW, this.vehicleH, activeTileX, direction, this.vehicleW, this.vehicleH, true, this.delay);
        return object;
    }

    initCars = () => {
        let min = Math.floor(this.getTilesCountH() / 3);
        let max = Math.ceil(this.getTilesCountH() / 4) + 2;

        let objectsCount = rand(min, max);
        let direction = this.setDirection();

        for (let j = 0; j < objectsCount; j++) {
            this.randAsset("CARS");
            this.randDelay(1300, 1300);
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

    //TODO: MODIFY MIN/MAX FOR CARS/TRUCKS -> ANOTHER ON PHONE
    randDelay = (min, max) => {
        this.delay += rand(min, max);
    }

}