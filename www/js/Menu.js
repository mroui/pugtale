class Menu {

    constructor() {
        this.sound = null;
        document.getElementById("muteButton").addEventListener("click", this.onclickMuteButton);
    }

    playMenuMusic = () => {
        this.sound = new Sound("assets/sounds/menu.wav", true, true);
        this.setMuteIcon();
        this.sound.play();
    }

    onclickMuteButton = () => {
        this.sound.getIsMute() ? this.sound.mute(false) : this.sound.mute(true);
        this.setMuteIcon();
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