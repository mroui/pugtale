class AssetsLoader {

    constructor() {
        this.assets = new Map();
        this.promises = [];
    }

    init = device => {
        this.loadSound("MENU", getUrl("assets/sounds/menu.wav"), true, true);
        this.loadImage("CAR1", getUrl("assets/images/CAR1.png"));
        this.loadImage("CAR2", getUrl("assets/images/CAR2.png"));
        this.loadImage("CAR3", getUrl("assets/images/CAR3.png"));
        this.loadImage("TRUCK1", getUrl("assets/images/TRUCK1.png"));
        this.loadImage("TRUCK2", getUrl("assets/images/TRUCK2.png"));
        this.loadImage("DONUT", getUrl("assets/images/DONUT.png"));
        this.loadImage("SAVE_AREA", getUrl("assets/images/SAVE_AREA.png"));
        this.loadImage("RIVER", getUrl("assets/images/RIVER.png"));
        this.loadImage("SKY", getUrl("assets/images/SKY.png"));
        this.loadImage("STREET", getUrl("assets/images/STREET.png"));
        this.loadImage("PUG", getUrl("assets/images/PUG.png"));
        this.promise(device);
    }

    loadSound = (name, src, autoplay, loop) => {
        let promise = new Promise((resolve, reject) => {
            let sound = new Howl({
                src: src,
                autoplay,
                loop
            });
            this.assets[name] = sound;
            resolve(sound);
        });
        this.promises.push(promise);
    }

    loadImage = (name, src) => {
        let promise = new Promise((resolve, reject) => {
            let image = new Image();
            image.src = src;
            image.onload = () => {
              this.assets[name] = image;
              resolve(image);
            };
            image.onerror = e => {
              reject(e);
            };
        });
        this.promises.push(promise);
    }

    promise = device => {
        Promise.all(this.promises).then(() => {
            device.assetsLoaded();
        });
    }

    get = name => {
        return this.assets[name];
    }

}