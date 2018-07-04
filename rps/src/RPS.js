function Requests() {
    this.playRound = (player1Throw, player2Throw, observer) => {
        new PlayRoundRequest(player1Throw, player2Throw, observer).perform()
    }

    function PlayRoundRequest(player1Throw, player2Throw, observer) {
        this.perform = () => {
            if (invalid())
                observer.invalid()
            else if (tie())
                observer.tie()
            else if (player1Wins())
                observer.player1Wins()
            else
                observer.player2Wins()
        }

        player1Wins = () => {
            return player1Throw === THROWS.rock && player2Throw === THROWS.scissors ||
                player1Throw === THROWS.paper && player2Throw === THROWS.rock ||
                player1Throw === THROWS.scissors && player2Throw === THROWS.paper
        }

        tie = () => {
            return player1Throw === player2Throw
        }

        invalid = () => {
            return !VALID_THROWS.includes(player1Throw) ||
                !VALID_THROWS.includes(player2Throw)
        }

        const THROWS = {
            rock: "rock",
            paper: "paper",
            scissors: "scissors"
        }
        const VALID_THROWS = [THROWS.rock, THROWS.paper, THROWS.scissors]
    }
}

module.exports = Requests
