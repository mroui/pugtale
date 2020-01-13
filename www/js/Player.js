class Player {

    constructor(nickname) {
        this.nickname = nickname;
        this.score = 0;
    }

    getScore = () => {
        return this.score;
    }

    setScore = score => {
        this.score=score;
    }

    addToScore = points => {
        this.score+=points;
    }

}