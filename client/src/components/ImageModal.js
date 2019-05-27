import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";

const styles = {
  modalContainer: {
    height: "100%",
    maxWidth: "1024px",
    backgroundColor: "#14171a",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "24px",
  },
  imageContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  textContainer: {
    height: "150px",
    display: "flex",
    color: "#ccc",
  },
};

const ImageModal = props => {
  const { classes } = props;
  return (
    <div className={classes.modalContainer}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={props.tweet.images[0].url} alt="" />
      </div>
      <div className={classes.textContainer}>
        <p className={classes.text}>{props.tweet.text}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { tweet: state.interface.modalContent };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(ImageModal);
