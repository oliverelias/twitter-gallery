import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import { mainItems, subItems, loginItems } from "./AppDrawerContents";
import { compose } from "redux";
import { connect } from "react-redux";
import { handleDrawerToggle } from "../actions";

const styles = theme => ({
  drawerItems: {
    marginTop: "64px",
  },
  drawerPaper: {
    width: "240px",
  },
});

const AppDrawer = props => {
  const { classes, user } = props;

  const drawer = (
    <div className={classes.drawerItems}>
      <Divider />
      <List>{mainItems(user.username)}</List>
      <Divider />
      <List>{subItems}</List>
    </div>
  );

  const loginDrawer = (
    <div className={classes.drawerItems}>
      <List>{loginItems}</List>
      <Divider />
      <List>{subItems}</List>
    </div>
  );

  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={props.mobileDrawerOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {user.authenticated ? drawer : loginDrawer}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {user.authenticated ? drawer : loginDrawer}
        </Drawer>
      </Hidden>
    </div>
  );
};

const mapStateToProps = state => {
  return { mobileDrawerOpen: state.interface.mobileDrawerOpen };
};

export default compose(
  connect(
    mapStateToProps,
    { handleDrawerToggle }
  ),
  withStyles(styles)
)(AppDrawer);
