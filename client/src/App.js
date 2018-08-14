import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import AppHeader from './components/AppHeader';
import Gallery from './components/Gallery';

import axios from 'axios';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppHeader />
        <Gallery />
      </React.Fragment>
    );
  }
}

export default App;
