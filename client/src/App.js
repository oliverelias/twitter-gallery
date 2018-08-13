import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    authenticated: false,
  };

  getAuthentication = () => {
    let status = axios.get('/auth/status').then(user => user.data !== undefined);
    console.log(status);
    return status;
  };

  componentDidMount() {
    this.getAuthentication().then(authenticated => this.setState({ authenticated }));
  }

  render() {
    const auth = this.state.authenticated;
    return (
      <div className="App">
        <p>Authenticated?: {auth ? 'Yep!' : 'Nope!'}</p>
      </div>
    );
  }
}

export default App;
