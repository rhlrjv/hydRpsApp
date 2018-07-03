describe('RPS', () => {
    it('rock vs scissors', () => {
        const observer = jasmine.createSpyObj('observer', ['p1Wins'])

        new Requests().play('rock', 'scissors', observer)

        expect(observer.p1Wins).toHaveBeenCalled()
    })
})

function Requests() {
    this.play = (p1, p2, observer) => {
        observer.p1Wins()
    }
}