class Sound {

    constructor(url, autoplay, loop) {
        let path = window.location.pathname;
        let phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);

        if(device.platform === "Android") url = "file://" + phoneGapPath + url;
        else url = "../" + url;

        this.sound = new Howl({
            src: url,
            autoplay,
            loop
        });

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