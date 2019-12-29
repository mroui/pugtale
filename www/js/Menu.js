class Menu {

    constructor() {
        this.sound = null;
    }

    playMenuMusic = () => {
        this.sound = new Sound("assets/sounds/menu.wav", true, true);
        this.setMuteIcon();
        this.sound.play();
    }

    onclickMuteButton = () => {
        if(this.sound.getIsMute()) {
            this.sound.mute(false);
            this.setMuteIcon(false);
        }
        else {
            this.sound.mute(true);
            this.setMuteIcon(true);
        }
    }

    setMuteIcon = () => {
        if (this.sound.getIsMute()) {
            document.getElementById("muteButton").classList.remove("fa-volume-up");
            document.getElementById("muteButton").classList.add("fa-volume-mute");
        }
        else {
            document.getElementById("muteButton").classList.remove("fa-volume-mute");
            document.getElementById("muteButton").classList.add("fa-volume-up");
        }
    }
}