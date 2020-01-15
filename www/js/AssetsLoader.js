class AssetsLoader {

    constructor() {
        this.assets = new Map();
        this.promises = [];
    }

    init = device => {
        this.loadSound("MENU", getUrl("assets/sounds/menu.wav"), false, true);
        this.loadSound("HIT", getUrl("assets/sounds/hit.wav"), false, false);
        this.loadSound("JUMP", getUrl("assets/sounds/jump.wav"), false, false);
        this.loadSound("GAMEOVER", getUrl("assets/sounds/gameover.wav"), false, false);
        this.loadSound("COLLECT", getUrl("assets/sounds/collect.wav"), false, false);
        this.loadImage("CAR1", getUrl("assets/images/CAR1.png"));
        this.loadImage("CAR2", getUrl("assets/images/CAR2.png"));
        this.loadImage("CAR3", getUrl("assets/images/CAR3.png"));
        this.loadImage("TRUCK1", getUrl("assets/images/TRUCK1.png"));
        this.loadImage("TRUCK2", getUrl("assets/images/TRUCK2.png"));
        this.loadImage("DONUT", getUrl("assets/images/DONUT.png"));
        this.loadImage("CLOUD1", getUrl("assets/images/CLOUD1.png"));
        this.loadImage("CLOUD2", getUrl("assets/images/CLOUD2.png"));
        this.loadImage("POWERUP1", getUrl("assets/images/POWERUP1.png"));
        this.loadImage("POWERUP2", getUrl("assets/images/POWERUP2.png"));
        this.loadImage("POWERUP3", getUrl("assets/images/POWERUP3.png"));
        this.loadImage("SAVE_AREA", getUrl("assets/images/SAVE_AREA.png"));
        this.loadImage("RIVER", getUrl("assets/images/RIVER.png"));
        this.loadImage("SKY", getUrl("assets/images/SKY.png"));
        this.loadImage("STREET", getUrl("assets/images/STREET.png"));
        this.loadImage("HEARTS0", getUrl("assets/images/HEARTS0.png"));
        this.loadImage("HEARTS1", getUrl("assets/images/HEARTS1.png"));
        this.loadImage("HEARTS2", getUrl("assets/images/HEARTS2.png"));
        this.loadImage("HEARTS3", getUrl("assets/images/HEARTS3.png"));
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