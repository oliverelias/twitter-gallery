import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { compose } from "redux";
import { newTweets } from "../actions";

import AppHeader from "./AppHeader";
import AppDrawer from "./AppDrawer";
import Gallery from "./Gallery";

const styles = {
  root: {
    display: "flex",
  },
};

const App = props => {
  const { classes, user } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <div className={classes.root}>
          <AppHeader />
          <AppDrawer user={user} />
          <Route path="/:user?/:action?">
            <Gallery />
          </Route>
        </div>
      </Router>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { user: state.auth };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(App);
