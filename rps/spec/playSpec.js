const Requests = require('../src/RPS')

describe('RPS', function () {
    let observer, requests

    beforeEach(function () {
        requests = new Requests()
    })

    describe('when player1 wins', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["player1Wins"])
        })

        it('rock v scissors', () => {
            requests.playRound('rock', 'scissors', observer)

            expect(observer.player1Wins).toHaveBeenCalled()
        })

        it('paper vs rock', () => {
            requests.playRound('paper', 'rock', observer)

            expect(observer.player1Wins).toHaveBeenCalled()
        })

        it('scissors vs paper', () => {
            requests.playRound('scissors', 'paper', observer)

            expect(observer.player1Wins).toHaveBeenCalled()
        })
    })

    describe('when player2 wins', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["player2Wins"])
        })

        it('scissors vs rock', function () {
            requests.playRound('scissors', 'rock', observer)

            expect(observer.player2Wins).toHaveBeenCalled()
        })

        it('rock vs paper', function () {
            requests.playRound('rock', 'paper', observer)

            expect(observer.player2Wins).toHaveBeenCalled()
        })

        it('paper vs scissors', function () {
            requests.playRound('paper', 'scissors', observer)

            expect(observer.player2Wins).toHaveBeenCalled()
        })
    })

    describe('tie', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["tie"])
        })

        it('rock vs rock', function () {
            requests.playRound('rock', 'rock', observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it('paper vs paper', function () {
            requests.playRound('paper', 'paper', observer)

            expect(observer.tie).toHaveBeenCalled()
        })

        it('scissors vs scissors', function () {
            requests.playRound('scissors', 'scissors', observer)

            expect(observer.tie).toHaveBeenCalled()
        })
    })
    describe('when invalid', () => {
        let invalidThrow

        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["invalid"])
            invalidThrow = Math.random()
        })

        it('rock vs invalid', function () {
            requests.playRound('rock', invalidThrow, observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it('invalid vs rock', function () {
            requests.playRound(invalidThrow, 'rock', observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it('invalid vs invalid', function () {
            requests.playRound(invalidThrow, invalidThrow, observer)

            expect(observer.invalid).toHaveBeenCalled()
        })
    })
})