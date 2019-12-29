class Sound {
    constructor(url) {
        let path = window.location.pathname;
        let phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);

        if(device.platform === "Android") url = "file://" + phoneGapPath + url;
        else url = "../" + url;

        this.sound = new Howl({
          src: url,
          autoplay: true,
          loop: true
        });

        this.id = null;
        this.isMute = false;
      }

      play = () => {
        this.id = this.sound.play();
      }

      mute = () => {
        console.log(this.isMute);
        if(this.isMute) {
          this.sound.mute(false, this.id);
          this.isMute = false;
        }
        else {
          this.sound.mute(true, this.id);
          this.isMute = true;
        }
      }
}