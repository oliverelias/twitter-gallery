import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "./Search";
import { connect } from "react-redux";
import { compose } from "redux";
import { getAuthentication, handleDrawerToggle } from "../actions";

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
  nameButton: {
    marginLeft: theme.spacing.unit * 2,
  },
});

class AppHeader extends Component {
  componentDidMount() {
    this.props.getAuthentication();
  }
  render() {
    const { classes, auth } = this.props;
    return (
      <AppBar className={classes.appHeaderRoot}>
        <Toolbar>
          <IconButton
            onClick={() =>
              this.props.handleDrawerToggle(this.props.mobileDrawerOpen)
            }
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
          <Search />
          <Button
            href={auth.authenticated ? "/auth/logout" : "/auth/authenticate"}
            color="inherit"
            className={classes.nameButton}
          >
            {auth.authenticated ? auth.displayName : "Log In To Twitter"}
          </Button>
          {auth.authenticated ? (
            <Avatar
              alt={auth.displayName}
              src={auth.profileImageUrl}
              className={classes.profileImage}
            />
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    mobileDrawerOpen: state.interface.mobileDrawerOpen,
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getAuthentication, handleDrawerToggle }
  )
)(AppHeader);
