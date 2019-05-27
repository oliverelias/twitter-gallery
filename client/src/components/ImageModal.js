import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import CancelIcon from "@material-ui/icons/Cancel";
import { Cancel } from "mdi-material-ui";
import { closeModal } from "../actions";

const styles = {
  modalContainer: {
    position: "relative",
    height: "100%",
    maxWidth: "1024px",
    backgroundColor: "#14171a",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    "&:focus": {
      outline: "none",
    },
  },
  imageContainer: {
    padding: "48px 24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85%",
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  textContainer: {
    padding: "24px",
    display: "flex",
    height: "15%",
    color: "#ccc",
  },
  cancel: {
    fill: "white",
    fontSize: "38px",
    position: "absolute",
    right: "8px",
    top: "8px",
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
      <CancelIcon className={classes.cancel} onClick={props.closeModal} />
    </div>
  );
};

const mapStateToProps = state => {
  return { tweet: state.interface.modalContent };
};

export default compose(
  connect(
    mapStateToProps,
    { closeModal }
  ),
  withStyles(styles)
)(ImageModal);
