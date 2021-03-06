import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import HomeIcon from "@material-ui/icons/Home";
import {
  GithubCircle,
  AccountMultiple,
  AccountMultipleOutline,
  Login,
} from "mdi-material-ui";

export const mainItems = username => {
  return (
    <div>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem button component={Link} to={`/${username}/likes`}>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Likes" />
      </ListItem>

      <ListItem button component={Link} to="/following">
        <ListItemIcon>
          <AccountMultiple />
        </ListItemIcon>
        <ListItemText primary="Following" />
      </ListItem>

      <ListItem button component={Link} to="/followers">
        <ListItemIcon>
          <AccountMultipleOutline />
        </ListItemIcon>
        <ListItemText primary="Followers" />
      </ListItem>
    </div>
  );
};

export const subItems = (
  <div>
    <ListItem
      button
      component="a"
      href="https://github.com/oliverelias/twitter-gallery"
    >
      <ListItemIcon>
        <GithubCircle />
      </ListItemIcon>
      <ListItemText primary="Github" />
    </ListItem>
  </div>
);

export const loginItems = (
  <div>
    <ListItem button component="a" href="/auth/authenticate">
      <ListItemIcon>
        <Login />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
  </div>
);
