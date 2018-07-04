const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")


describe('PlayForm', function () {
    let domFixture

    beforeEach(function () {
        domFixture = document.createElement('div')
        document.body.appendChild(domFixture)
    })

    it('should display invalid when RPS says invalid', () => {
        const alwaysInvalidRequest = {
            play: (p1, p2, observer) => {
                observer.invalid()
            }
        }
        renderPlayForm(alwaysInvalidRequest)

        expect(pageContent()).not.toContain('Invalid Input!')
        play()
        expect(pageContent()).toContain('Invalid Input!')
    })

    it('should display tie when RPS says tie', () => {
        const alwaysTieRequest = {
            play: (p1, p2, observer) => {
                observer.tie()
            }
        }
        renderPlayForm(alwaysTieRequest)

        expect(pageContent()).not.toContain('Tie!')
        play()
        expect(pageContent()).toContain('Tie!')
    })

    it('should display player 1 Wins when RPS says p1 wins', () => {
        const alwaysPlayer1Wins = {
            play: (p1, p2, observer) => {
                observer.player1Wins()
            }
        }
        renderPlayForm(alwaysPlayer1Wins)

        expect(pageContent()).not.toContain('Player 1 Wins!')
        play()
        expect(pageContent()).toContain('Player 1 Wins!')
    })

    it('should display player 2 Wins when RPS says p2 wins', () => {
        const alwaysPlayer2Wins = {
            play: (p1, p2, observer) => {
                observer.player2Wins()
            }
        }
        renderPlayForm(alwaysPlayer2Wins)

        expect(pageContent()).not.toContain('Player 2 Wins!')
        play()
        expect(pageContent()).toContain('Player 2 Wins!')
    })

    it('should send user throws to RPS', function () {
        const requestsSpy = jasmine.createSpyObj('requests', ['play'])

        renderPlayForm(requestsSpy)
        fillIn('player1Throw', 'rock')
        fillIn('player2Throw', 'scissors')

        play()

        expect(requestsSpy.play).toHaveBeenCalledWith('rock', 'scissors', jasmine.any(Object))

    })

    afterEach(function () {
        domFixture.remove()
    })

    function fillIn(selector, value) {
        let userInput = domFixture.querySelector('[name=' + selector + ']')
        userInput.value = value
        ReactTestUtils.Simulate.change(userInput)

    }

    function pageContent() {
        return domFixture.textContent
    }

    function play() {
        domFixture.querySelector('button').click()
    }

    function renderPlayForm(requests) {
        ReactDOM.render(
            <PlayForm requests={requests}/>,
            domFixture
        )
    }
})

class PlayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {result: ''}
    }

    submitHandler() {
        this.props.requests.play('', '', this)
    }

    tie() {
        this.setState({result: "Tie!"})
    }

    invalid() {
        this.setState({result: "Invalid Input!"})
    }

    player1Wins() {
        this.setState({result: "Player 1 Wins!"})
    }

    player2Wins() {
        this.setState({result: "Player 2 Wins!"})
    }

    render() {
        return <div>
            {this.state.result}
            <input name="player1Throw"/>
            <input name="player2Throw"/>
            <button onClick={this.submitHandler.bind(this)}>
                Play!
            </button>
        </div>
    }
}