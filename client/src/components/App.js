import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { compose } from "redux";
import { closeModal } from "../actions";

import AppHeader from "./AppHeader";
import AppDrawer from "./AppDrawer";
import Gallery from "./Gallery";
import ImageModal from "./ImageModal";

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
          <Modal open={props.modalOpen} onClose={props.closeModal}>
            <ImageModal />
          </Modal>
        </div>
      </Router>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { user: state.auth, modalOpen: state.interface.modalOpen };
};

export default compose(
  connect(
    mapStateToProps,
    { closeModal }
  ),
  withStyles(styles)
)(App);
