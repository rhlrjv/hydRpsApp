const ReactDOM = require("react-dom")
const React = require("react")


describe('PlayForm', function () {
    let domFixture

    beforeEach(function () {
        domFixture = document.createElement('div');
        document.body.appendChild(domFixture);
    })

    it('should display invalid when RPS says invalid', () => {
        const alwaysInvalidRequest = {
           play: (p1, p2, observer) => {observer.invalid()}
        }
        renderPlayForm(alwaysInvalidRequest)

        domFixture.querySelector('button').click()

        expect(domFixture.textContent).toContain('Invalid Input!')
    })

    afterEach(function () {
        domFixture.remove()
    })

    function renderPlayForm(alwaysInvalidRequest) {
        ReactDOM.render(
            <PlayForm requests={alwaysInvalidRequest}/>,
            domFixture
        )
    }
})

class PlayForm extends React.Component {
    render() {
        return <button>Hello world!</button>
    }
}




//given = setup
//when = action
//then = assertion
// cleanup




