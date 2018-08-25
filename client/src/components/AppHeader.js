import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';

const styles = theme => ({
  appHeaderRoot: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  profileImage: {
    marginLeft: '6px',
    height: '32px',
    width: '32px',
  },
});

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: '',
      displayName: '',
      profileImageUrl: '',
    };
  }

  getAuthentication = () => {
    let user = axios.get('/api/current_user').then(user => {
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

  renderButton() {
    return <div />;
  }

  render() {
    const { classes } = this.props;
    const { authenticated, username, displayName, profileImageUrl } = this.state;
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
          <Typography variant="title" color="inherit" className={classes.flex}>
            Twitter Gallery
          </Typography>
          <Button href={authenticated ? '/auth/logout' : '/auth/authenticate'} color="inherit">
            {authenticated ? displayName : 'Login with Twitter'}
          </Button>
          {authenticated ? (
            <Avatar alt={displayName} src={profileImageUrl} className={classes.profileImage} />
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(AppHeader);
