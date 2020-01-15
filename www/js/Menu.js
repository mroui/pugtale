class Menu {

    constructor(assetsLoader) {
        this.assetsLoader = assetsLoader;
        this.sound = null;
        this.soundsMute = false;
        this.highscore = [];
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
            this.soundsMute = true;

        }
        else {
            document.getElementById("muteButton").classList.remove("fa-volume-mute");
            document.getElementById("muteButton").classList.add("fa-volume-up");
            this.soundsMute = false;
        }
    }

    setListeners = () => {
        document.getElementById("muteButton").addEventListener("click", this.onclickMuteButton);
        document.getElementById("menu-play").addEventListener("click", this.openNickModal);
        document.getElementById("menu-credits").addEventListener("click", this.openCreditsModal);
        document.getElementById("menu-highscores").addEventListener("click", this.openHighscoresModal);
        document.getElementById("credits-modal__close").addEventListener("click", this.hideCreditsModal);
        document.getElementById("highscores-modal__close").addEventListener("click", this.hideHighscoresModal);
        document.getElementById("network-modal__close").addEventListener("click", this.hideNetworkModal);
        window.onclick = (e) => {
            if (e.target == document.getElementById("credits-modal")) this.hideCreditsModal();
            else if (e.target == document.getElementById("highscores-modal")) this.hideHighscoresModal();
            else if (e.target == document.getElementById("network-modal")) this.hideNetworkModal();
        }

        document.addEventListener("pause", this.muteOnBackground, false);
        document.addEventListener("resume", this.muteOnForeground, false);
    }

    hideNetworkModal = () => {
        document.getElementById("network-modal").style.display = "none";
    }

    openNetworkModal = () => {
        document.getElementById("network-modal").style.display = "flex";
    }

    hideHighscoresModal = () => {
        document.getElementById("highscores-modal").style.display = "none";
    }

    openHighscoresModal = () => {
        document.getElementById("highscores-modal").style.display = "flex";
        this.readFromDatabase();
    }

    readFromDatabase = () => {
        this.highscore = [];
        let row = 1;
        if (database !== null && navigator.connection.type !== 'none') {
            database.collection("highscores").orderBy("score", "desc").limit(5).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const currentRow = document.getElementById("highscores-table").rows[row].cells;
                    currentRow[0].innerHTML = doc.data()["nickname"];
                    currentRow[1].innerHTML = doc.data()["score"];
                    currentRow[2].innerHTML = doc.data()["date"];
                    row++;
                });
            });
        }
    }

    hideCreditsModal = () => {
        document.getElementById("credits-modal").style.display = "none";
    }

    openCreditsModal = () => {
        document.getElementById("credits-modal").style.display = "flex";
    }

    muteOnBackground = () => {
        this.sound.stop();
    }

    muteOnForeground = () => {
        this.sound.play();
    }

    openNickModal = () => {
        const nickname = "player" + Math.floor(new Date().getTime() + "" + Math.random()*(999));
        navigator.notification.prompt(
            'Please enter your nickname',
            this.onNicknameConfirm,
            'Registration',
            ['Done','Cancel'],
            nickname
        );
    }

    onNicknameConfirm = results => {
        if (results.buttonIndex == 1) this.playNewGame(results.input1);
        else return;
    }

    playNewGame = playerNickname => {
        this.sound.stop();
        let game = new Game(this.assetsLoader, this.soundsMute, playerNickname);
        game.play();
    }
}