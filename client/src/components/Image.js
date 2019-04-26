import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  TwitterRetweet,
  Heart as HeartIcon,
  HeartOutline as HeartOutlineIcon,
  Link as LinkIcon,
} from "mdi-material-ui";
import { green, red } from "@material-ui/core/colors";

import { handleLike, handleRetweet } from "../actions";

const styles = theme => {
  return {
    actionBar: {
      position: "absolute",
      height: `${theme.spacing.unit * 6}px`,
      bottom: 0,
      left: 0,
      right: 0,
      padding: "12px",
      backgroundColor: "rgba(255,255,255,0.8)",
      // transform: "translateY(100%)",
      transitionDuration: "0.1s",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      cursor: "default",
      opacity: 0,
    },
    imageContainer: {
      overflow: "hidden",
      borderRadius: "4px",
      margin: "5px",
      height: "300px",
      flexGrow: 1,
      flexBasis: "200px",
      position: "relative",
      transitionDuration: "0.1s",
      boxShadow: theme.shadows[1],
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.01)",
        boxShadow: theme.shadows[8],
      },
      [theme.breakpoints.down("sm")]: {
        height: "150px",
      },
      "&:hover > *": {
        opacity: "1",
      },
      "& > img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "50% 50%",
      },
    },
    image: {},
    actionButton: {
      "& svg": {
        opacity: 0.8,
      },
    },
    portrait: {
      [theme.breakpoints.up("xs")]: {
        flexBasis: "100px",
      },
      [theme.breakpoints.up("md")]: {
        flexBasis: "200px",
      },
    },
    landscape: {
      [theme.breakpoints.up("xs")]: {
        flexBasis: "200px",
      },
      [theme.breakpoints.up("md")]: {
        flexBasis: "300px",
      },
      [theme.breakpoints.up("lg")]: {
        flexBasis: "350px",
      },
      [theme.breakpoints.up("xl")]: {
        flexBasis: "400px",
      },
    },
  };
};

const Image = props => {
  const { classes } = props;
  const { favorited, retweeted } = props.tweet;
  const retweetStyle = { color: green[700], opacity: 1 };
  const likeStyle = { color: red[500], opacity: 1 };
  return (
    <div
      className={`${classes.imageContainer} ${
        props.image.aspect === "wide" ? classes.landscape : classes.portrait
      }`}
    >
      <img className={classes.image} src={props.image.url} alt="" />
      <div className={classes.actionBar}>
        <Button
          size="small"
          color="primary"
          onClick={() => props.handleRetweet(props.tweet)}
          className={`${classes.actionButton} ${classes.retweetButton}`}
        >
          <TwitterRetweet style={retweeted ? retweetStyle : null} />
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => props.handleLike(props.tweet)}
          className={`${classes.actionButton} ${classes.likeButton}`}
        >
          {favorited ? (
            <HeartIcon style={{ ...likeStyle, width: "0.8em" }} />
          ) : (
            <HeartOutlineIcon style={{ width: "0.8em" }} />
          )}
        </Button>
        <Button
          href={`https://twitter.com/statuses/${props.tweet.id}`}
          target="_blank"
          rel="noopener"
          size="small"
          color="primary"
          className={classes.actionButton}
        >
          <LinkIcon style={{ opacity: 1 }} />
        </Button>
      </div>
    </div>
  );
};

export default compose(
  connect(
    null,
    { handleLike, handleRetweet }
  ),
  withStyles(styles)
)(Image);
