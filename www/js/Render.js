class Render {

    constructor(canvas)  {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');

        this.objects = [];
        this.tileSize = 48;

        window.addEventListener('resize', this.resizeCanvas, false);
        this.resizeCanvas();
    }

    resizeCanvas = () => {
        this.canvas.width = Math.floor(window.innerWidth / this.tileSize) * this.tileSize;
        this.canvas.height = Math.floor(window.innerHeight / this.tileSize) * this.tileSize;
        this.render();
    }

    render = () => {
        this.objects.forEach( object => {
            this.draw(object);
        });
    }

    draw = object => {
        this.context.drawImage(object.getAsset(), object.getXA(), object.getYA(),
                               object.getW(), object.getH(), object.getX(),
                               object.getY(), object.getW(), object.getH());
    }

    checkCollision = () => {
        //check if collision
    }

    checkStatus = () => {
        //check if game end
    }

    start = objects => {
        this.objects = objects;
        this.render();
        //this.checkCollision();
        //this.checkStatus();
        //requestAnimationFrame
    }

}