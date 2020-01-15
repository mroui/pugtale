class Player {

    constructor(nickname) {
        this.nickname = nickname;
        this.score = 0;
        this.prevScore = 0;
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

    getDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return (dd + '.' + mm + '.' + yyyy);
    }

    tryAddToDatabase = () => {
        if (database !== null && navigator.connection.type !== 'none') {

            this.readFromDatabasePrevScore();

            if (this.prevScore < this.score) {
                database.collection("highscores").doc(this.nickname).set({
                    nickname: this.nickname,
                    score: this.score,
                    date: this.getDate()
                })
                .catch(error => {
                    console.error("Error adding document: ", error);
                });
            }
            return true;
        } else return false;
    }

    readFromDatabasePrevScore = () => {
        database.collection("highscores").doc(this.nickname).get().then(doc => {
            if (doc.exists) {
                this.prevScore = doc.data()['score'];
            }
        }).catch(error => {
            console.log("Error getting document:", error);
        });
    }

}