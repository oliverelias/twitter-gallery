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

const styles = theme => {
  return {
    actionBar: {
      position: "absolute",
      height: `${theme.spacing.unit * 6}px`,
      bottom: 0,
      left: 0,
      right: 0,
      padding: "12px",
      backgroundColor: "rgba(255,255,255,0.7)",
      transform: "translateY(100%)",
      transitionDuration: "0.1s",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      cursor: "default",
    },
    imageContainer: {
      overflow: "hidden",
      borderRadius: "4px",
      margin: "5px",
      minWidth: "200px",
      height: "300px",
      flexGrow: 1,
      flexBasis: "100px",
      position: "relative",
      "&:hover": {
        cursor: "pointer",
      },
      "&:hover > *": {
        transform: "translateY(0)",
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
      // color: "white",
    },
  };
};

const Image = props => {
  const { classes } = props;
  return (
    <div
      className={classes.imageContainer}
      style={{ minWidth: props.image.aspect === "wide" ? "350px" : "200px" }}
    >
      <img className={classes.image} src={props.image.url} alt="" />
      <div className={classes.actionBar}>
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
  connect(null),
  withStyles(styles)
)(Image);
