
const RIGHT = 0;
const LEFT = 1;
const UP = 2;
const DOWN = 3;
const STOP = 4;

class Game {

    constructor(assetsLoader, soundsMute, playerNickname) {
        this.canvas = document.getElementById("canvas");
        this.assetsLoader = assetsLoader;
        this.soundsMute = soundsMute;
        this.player = new Player(playerNickname);

        this.hammer = new Hammer(this.canvas);
        this.render = null;
        this.world = null;
    }

    play = () => {
        this.closeMenu();
        this.render = new Render(this.canvas, this.assetsLoader, this.soundsMute, this.hammer);
        this.initWorld();
        this.render.init(this.world);
        this.render.startObjects();
        this.render.start();
    }

    initWorld = () => {
        this.world = new World(this.assetsLoader, this.canvas, this.player);
    }

    closeMenu = () => {
        document.getElementById("menu").style.opacity = "0";
        document.getElementById("canvas").style.opacity = "1";
        document.getElementById("canvas").style.visibility = "visible";
        document.getElementById("menu").style.visibility = "hidden";
    }
}