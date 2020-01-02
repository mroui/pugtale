class Sound {

    constructor(sound) {
        this.sound = sound

        if (device.model == "Chrome") this.isMute = true;
        else this.isMute = false;
    }

    mute = isMute => {
        this.sound.mute(isMute);
        this.isMute = isMute;
    }

    play = () => {
        this.sound.play();
    }

    getIsMute = () => {
        return this.isMute;
    }

}