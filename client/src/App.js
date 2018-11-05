import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from './components/AppHeader';
import AppDrawer from './components/AppDrawer';
import Gallery from './components/Gallery';

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
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div className={classes.root}>
            <AppHeader handleDrawerToggle={this.handleDrawerToggle} />
            <AppDrawer
              mobileOpen={this.state.mobileOpen}
              handleDrawerToggle={this.handleDrawerToggle}
            />
            <Route path="/:user?" component={Gallery} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
