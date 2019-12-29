class App {

    // Application Constructor
    initialize = () => {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }

    // deviceready Event Handler
    onDeviceReady = () => {
        this.receivedEvent('deviceready');
    }

    // Update DOM on a Received Event
    receivedEvent = (id) => {
        let parentElement = document.getElementById(id);
        let listeningElement = parentElement.querySelector('.listening');
        let receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        this.start();
    }

    //Start menu app
    start = () => {
        let menu = new Menu();
        document.getElementById("muteButton").onclick = menu.onclickMuteButton;
        menu.playMenuMusic();
    }

};