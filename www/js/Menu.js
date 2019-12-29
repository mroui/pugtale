class Menu {
    constructor() {
        this.sound = null;
        document.getElementsByClassName("muteButton").onclick = this.muteButton;
     }

    playMusic = () => {
        this.sound = new Sound("assets/sounds/menu.wav");
        this.sound.play();
    }

    muteButton = () => {
        this.sound.mute();
    }
}