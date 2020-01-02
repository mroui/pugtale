class AssetsLoader {

    constructor() {
        this.assets = new Map();
        this.promises = [];
    }

    init = device => {
        this.loadImage("PUG", getUrl("assets/images/pug.png"));
        this.loadSound("MENU", getUrl("assets/sounds/menu.wav"), true, true);
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