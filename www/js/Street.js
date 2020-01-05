class Street extends Biome {

    constructor(assetsLoader, canvas, tileW, tileH, filledTiles, level) {
        super(assetsLoader.get("STREET"), canvas, tileW, tileH, filledTiles, level);

        this.assetsLoader = assetsLoader;
        this.level = level;

        this.cars = [];
        this.trucks = [];

        this.vehicleW = 2 * tileW;
        this.vehicleH = 0;

        this.activeTileX = filledTiles * this.tileW;

        this.initObjects();
    }

    initObjects = () => {
        //for every traffic lane - 3 tiles->2cars
        let lanesCount = Math.ceil(this.getTilesCountW()/2);

        for (let i = 0; i < lanesCount; i++) {
            let ifCar = rand(0, 1);
            if(ifCar) {
                this.initCars();
                this.addObjects(this.cars);
            } else {
                this.initTrucks();
                this.addObjects(this.trucks);
            }
            this.activeTileX += this.tileW;
        }
    }

    initTrucks = () => {
        let min = this.getTilesCountH() - 2;
        let max = this.getTilesCountH() + 2;
        let trucksCount = rand(min, max);

        for (let j = 0; j < trucksCount; j++) {
            let asset = this.randAsset("TRUCKS");
            let truck = new GameObject(asset, 0, 0, this.vehicleW, this.vehicleH, this.activeTileX, this.canvas.height, this.vehicleW, this.vehicleH);
            this.trucks.push(truck);
        }
    }

    initCars = () => {
        let min = 1 + this.level;
        let max = 2 + this.level;
        let carsCount = rand(min, max);

        for (let j = 0; j < carsCount; j++) {
            let asset = this.randAsset("CARS");
            let car = new GameObject(asset, 0, 0, this.vehicleW, this.vehicleH, this.activeTileX, -this.vehicleH, this.vehicleW, this.vehicleH);
            this.cars.push(car);
        }
    }

    randAsset = machine => {
        if (machine === "CARS") {
            let assetNumber = rand(1, 3);
            switch (assetNumber) {
                case 1:
                    this.vehicleH = 2 * this.tileH;
                    return this.assetsLoader.get("CAR1");
                case 2:
                    this.vehicleH = 2 * this.tileH;
                    return this.assetsLoader.get("CAR2");
                case 3:
                    this.vehicleH = 2 * this.tileH;
                    return this.assetsLoader.get("CAR3");
            }
        } else if (machine === "TRUCKS") {
            let assetNumber = rand(1, 2);
            switch (assetNumber) {
                case 1:
                    this.vehicleH = 4 * this.tileH;
                    return this.assetsLoader.get("TRUCK1");
                case 2:
                    this.vehicleH = 3 * this.tileH;
                    return this.assetsLoader.get("TRUCK2");
            }
        }
    }


}