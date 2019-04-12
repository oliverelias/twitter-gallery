import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "./Search";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import { newTweets } from "../actions";

const styles = theme => ({
  appHeaderRoot: {
    zIndex: theme.zIndex.drawer + 1,
  },
  largeTitle: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "initial",
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  profileImage: {
    marginLeft: "6px",
    height: "32px",
    width: "32px",
  },
});

class AppHeader extends Component {
  componentDidMount() {
    this.props.newTweets("Llamapox");
  }

  renderButton() {
    return <div />;
  }

  render() {
    const { classes, authenticated, displayName, profileImageUrl } = this.props;
    return (
      <AppBar className={classes.appHeaderRoot}>
        <Toolbar>
          <IconButton
            onClick={this.props.handleDrawerToggle}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.largeTitle}
          >
            Twitter Gallery
          </Typography>
          <Route component={Search} />
          <Button
            href={authenticated ? "/auth/logout" : "/auth/authenticate"}
            color="inherit"
          >
            {authenticated ? displayName : "Login with Twitter"}
          </Button>
          {authenticated ? (
            <Avatar
              alt={displayName}
              src={profileImageUrl}
              className={classes.profileImage}
            />
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return { tweets: state.tweets };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { newTweets }
  )
)(AppHeader);
