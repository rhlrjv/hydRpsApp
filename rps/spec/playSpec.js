describe('RPS', function () {
    let observer, requests

    beforeEach(function () {
        requests = new Requests()
    })

    describe('when p1 wins', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p1Wins"])
        })

        it('rock v scissors', () => {
            requests.play('rock', 'scissors', observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it('paper vs rock', () => {
            requests.play('paper', 'rock', observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it('scissors vs paper', () => {
            requests.play('scissors', 'paper', observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })
    })

    describe('when p2 wins', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p2Wins"])
        })

        it('scissors vs rock', function () {
            requests.play('scissors', 'rock', observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it('rock vs paper', function () {
            requests.play('rock', 'paper', observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it('paper vs scissors', function () {
            requests.play('paper', 'scissors', observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })
    })

    describe('tie', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["tie"])
        })

        it('rock vs rock', function () {
            requests.play('rock', 'rock', observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it('paper vs paper', function () {
            requests.play('paper', 'paper', observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it('scissors vs scissors', function () {
            requests.play('scissors', 'scissors', observer)

            expect(observer.tie).toHaveBeenCalled()
        })
    })
})


// production code

class Requests {
    play(p1, p2, observer) {
        if (p1 === p2)
            observer.tie()
        else if (p1 === "rock" && p2 === "scissors" ||
            p1 === "paper" && p2 === "rock" ||
            p1 === "scissors" && p2 === "paper")
            observer.p1Wins()
        else
            observer.p2Wins()
    }
}
