class Menu {

    constructor(assetsLoader) {
        this.assetsLoader = assetsLoader;
        this.sound = null;
        this.setListeners();
    }

    playMenuMusic = () => {
        this.sound = new Sound(this.assetsLoader.get("MENU"));
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

    setListeners = () => {
        document.getElementById("muteButton").addEventListener("click", this.onclickMuteButton);
        document.getElementById("menu-play").addEventListener("click", this.openNickDialog);
        document.addEventListener("pause", this.muteOnBackground, false);
        document.addEventListener("resume", this.muteOnForeground, false);
    }

    muteOnBackground = () => {
        this.sound.stop();
    }

    muteOnForeground = () => {
        this.sound.play();
    }

    openNickDialog = () => {
        const nickname = "player" + Math.floor(new Date().getTime() + "" + Math.random()*(999));
        navigator.notification.prompt(
            'Please enter your nickname',
            this.onPrompt,
            'Registration',
            ['Done','Cancel'],
            nickname
        );
    }

    onPrompt = results => {
        if (results.buttonIndex == 1) this.playNewGame(results.input1);
        else return;
    }

    playNewGame = playerNickname => {
        let game = new Game(this.assetsLoader, playerNickname);
        game.play();
    }
}