let database = null;


class App {

    constructor() {
        this.assetsLoader = null;
    }

    // Add device ready listener
    initialize = () => {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }

    // assets loading & deviceready Event Handler
    onDeviceReady = () => {
        this.assetsLoader = new AssetsLoader();
        this.assetsLoader.init(this);

        this.receivedEvent('deviceready');
    }

    // Update DOM on a Received Event
    receivedEvent = (id) => {
        let parentElement = document.getElementById(id);
        let listeningElement = parentElement.querySelector('.listening');
        let receivedElement = parentElement.querySelector('.received');

        if (navigator.connection.type !== 'none') {
            firebase.initializeApp(firebaseConfig);
            database = firebase.firestore();
        }

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }

    //Get callback assets loaded to start an app
    assetsLoaded = () => {
        this.start();
    }

    //Start menu app
    start = () => {
        let menu = new Menu(this.assetsLoader);
        menu.playMenuMusic();
        //TODO: UNMUTE IT LATER
        menu.sound.mute(true);
    }

};