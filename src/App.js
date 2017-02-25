import React, { Component } from 'react';

import connect from './trkli/connect'
import userState from './state/user'
import { userDetails } from './selectors/user'
import { getUser } from './mutations/user'
import logo from './logo.svg';
import './App.css';

function AComponent (props) {
	return (
		<div>
			I'm {props.selector.loading ? 'loading' : 'connected'} and my props are {JSON.stringify(props)}
		</div>
	)
}

const ConnectedComponent = connect((props) => ({
	originalProps: `${userState.name()} ${props.test}`,
	userName: userState.name(),
	familyName: userState.surname(),
	fullName: `${userState.name()} ${userState.surname()}`,
	selector: userDetails()
}))(AComponent)

class App extends Component {
	constructor () {
		super()
		this.state = {
			prop: 1
		}
	}

	componentWillMount () {
		setInterval(() => this.setState({ prop: ++this.state.prop }), 1000)
		getUser()
	}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		  <ConnectedComponent test={this.state.prop} />
      </div>
    );
  }
}

window.user = userState

export default App;
