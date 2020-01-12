class Player {

    constructor(nickname) {
        this.nickname = nickname;
        this.score = 0;
    }

    addScore = points => {
        this.score+=points;
    }

}