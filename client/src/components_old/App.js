import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppHeader from "./AppHeader";
import AppDrawer from "./AppDrawer";
import Gallery from "./Gallery";
import axios from "axios";

const styles = {
  root: {
    display: "flex",
  },
};

class App extends Component {
  state = {
    mobileOpen: false,

    authenticated: false,
    username: "",
    displayName: "",
    profileImageUrl: "",
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getAuthentication = () => {
    axios.get("/api/current_user").then(user => {
      if (user.data) {
        return this.setState({
          authenticated: true,
          username: user.data.username,
          displayName: user.data.displayName,
          profileImageUrl: user.data.profileImageUrl,
        });
      } else {
        return this.setState({ authenticated: false });
      }
    });
  };

  componentDidMount() {
    this.getAuthentication();
  }

  render() {
    const { classes } = this.props;
    const {
      authenticated,
      username,
      displayName,
      profileImageUrl,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div className={classes.root}>
            <AppHeader
              handleDrawerToggle={this.handleDrawerToggle}
              authenticated={authenticated}
              displayName={displayName}
              profileImageUrl={profileImageUrl}
            />
            <AppDrawer
              mobileOpen={this.state.mobileOpen}
              handleDrawerToggle={this.handleDrawerToggle}
              authenticated={authenticated}
              username={username}
            />
            <Route
              exact
              path="/:user?/:likes?"
              render={props => <Gallery {...props} />}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
