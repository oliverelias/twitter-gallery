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
      minWidth: "200px",
      height: "300px",
      flexGrow: 1,
      flexBasis: "100px",
      position: "relative",
      transitionDuration: "0.1s",
      boxShadow:
        "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.01)",
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
      },
      "&:hover  *": {
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
