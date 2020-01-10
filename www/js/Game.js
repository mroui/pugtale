
const RIGHT = 0;
const LEFT = 1;
const UP = 2;
const DOWN = 3;
const STOP = 4;

class Game {

    constructor(assetsLoader) {
        this.canvas = document.getElementById("canvas");
        this.assetsLoader = assetsLoader;
        this.hammer = new Hammer(this.canvas);
        this.render = new Render(this.canvas, this.assetsLoader, this.hammer);
        this.world = null;
    }

    play = () => {
        this.closeMenu();
        this.initWorld();
        this.render.init(this.world);
        this.render.startObjects();
        this.render.start();
    }

    initWorld = () => {
        this.world = new World(this.assetsLoader, this.canvas);
    }

    closeMenu = () => {
        document.getElementById("menu").style.opacity = "0";
        document.getElementById("canvas").style.opacity = "1";
        document.getElementById("canvas").style.visibility = "visible";
        document.getElementById("menu").style.visibility = "hidden";
    }
}