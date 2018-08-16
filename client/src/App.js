import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import AppHeader from './components/AppHeader';
import AppDrawer from './components/AppDrawer';
import Gallery from './components/Gallery';

import axios from 'axios';

const styles = {
  root: {
    display: 'flex',
  },
};

class App extends Component {
  state = {
    mobileOpen: false,
  };
  handleDrawerToggle = () => {
    console.log('Debug: Toggle Drawer');
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppHeader handleDrawerToggle={this.handleDrawerToggle} />
          <AppDrawer
            mobileOpen={this.state.mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <Gallery />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
