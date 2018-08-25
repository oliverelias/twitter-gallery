import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
