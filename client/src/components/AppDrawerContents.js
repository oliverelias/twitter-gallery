import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import HomeIcon from '@material-ui/icons/Home';
import { GithubCircle, AccountMultiple, AccountMultipleOutline } from 'mdi-material-ui';

export const mainItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Likes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountMultiple />
      </ListItemIcon>
      <ListItemText primary="Following" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountMultipleOutline />
      </ListItemIcon>
      <ListItemText primary="Followers" />
    </ListItem>
  </div>
);

export const subItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <GithubCircle />
      </ListItemIcon>
      <ListItemText primary="Github" />
    </ListItem>
  </div>
);
