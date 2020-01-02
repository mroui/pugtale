class Game {

    constructor(assetsLoader) {
        this.assetsLoader = assetsLoader;

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d')

        this.objects = [];
    }

    start = () => {
        this.closeMenu();
    }

    closeMenu = () => {
        document.getElementById("menu").style.opacity = "0";
        document.getElementById("canvas").style.opacity = "1";
        document.getElementById("canvas").style.visibility = "visible";
        document.getElementById("menu").style.visibility = "hidden";
    }
}