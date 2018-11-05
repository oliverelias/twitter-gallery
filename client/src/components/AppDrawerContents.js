import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import HomeIcon from '@material-ui/icons/Home';
import { GithubCircle, AccountMultiple, AccountMultipleOutline } from 'mdi-material-ui';

export const mainItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>

    <ListItem button component={Link} to="/i/likes">
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Likes" />
    </ListItem>

    <ListItem button component={Link} to="/i/follwing">
      <ListItemIcon>
        <AccountMultiple />
      </ListItemIcon>
      <ListItemText primary="Following" />
    </ListItem>

    <ListItem button component={Link} to="/i/followers">
      <ListItemIcon>
        <AccountMultipleOutline />
      </ListItemIcon>
      <ListItemText primary="Followers" />
    </ListItem>
  </div>
);

export const subItems = (
  <div>
    <ListItem button component="a" href="https://github.com/oliverelias/twitter-gallery" to="/">
      <ListItemIcon>
        <GithubCircle />
      </ListItemIcon>
      <ListItemText primary="Github" />
    </ListItem>
    {/* </a> */}
  </div>
);
