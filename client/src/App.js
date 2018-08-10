import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    userId: '',
  };

  getUserId = () => {
    let id = axios.get('/getAuth').then(user => user.data);
    return id;
  };

  componentDidMount() {
    this.getUserId().then(userId => this.setState({ userId }));
  }

  render() {
    return (
      <div className="App">
        <p>User ID: {this.state.userId}</p>
      </div>
    );
  }
}

export default App;
