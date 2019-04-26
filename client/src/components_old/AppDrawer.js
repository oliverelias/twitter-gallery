import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import { mainItems, subItems } from './AppDrawerContents';

const styles = theme => ({
  drawerItems: {
    marginTop: '64px',
  },
  drawerPaper: {
    width: '240px',
  },
});

const AppDrawer = props => {
  const { classes } = props;

  const drawer = (
    <div className={classes.drawerItems}>
      <div className={classes.toolbar} />
      <Divider />
      <List>{mainItems(props.username)}</List>
      <Divider />
      <List>{subItems}</List>
    </div>
  );

  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}>
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
};

export default withStyles(styles)(AppDrawer);