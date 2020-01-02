class Render {

    constructor()  {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext('2d');

        this.objects = [];

        window.addEventListener('resize', this.resizeCanvas, false);
        this.resizeCanvas();
    }

    resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.render();
    }

    render = () => {
        this.objects.forEach( object => {
            this.draw(object);
        });
    }

    draw = object => {
        this.context.drawImage(object.getAsset(), object.getSX(), object.getSY(),
                               object.getSWidth(), object.getSHeight(), object.getDX(),
                               object.getDY(), object.getDWidth(), object.getDHeight());
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