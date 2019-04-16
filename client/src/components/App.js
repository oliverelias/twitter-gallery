import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import AppHeader from "./AppHeader";
import AppDrawer from "./AppDrawer";
import Gallery from "./Gallery";

const styles = {
  root: {
    display: "flex",
  },
};

const App = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <div className={classes.root}>
          <AppHeader />
          <AppDrawer />
          <Route path="/:user" render={Gallery}>
            <Gallery />
          </Route>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default withStyles(styles)(App);
