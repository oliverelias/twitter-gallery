import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import CancelIcon from "@material-ui/icons/Cancel";
import { closeModal } from "../actions";

const styles = theme => {
  return {
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

      "& > *": {
        padding: "24px",
        [theme.breakpoints.up("xs")]: {
          padding: 0,
        },
        [theme.breakpoints.up("sm")]: {
          padding: "4px",
        },
        [theme.breakpoints.up("md")]: {
          padding: "12px",
        },
      },
    },
    imageContainer: {
      marginTop: "48px",
      display: "flex",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      maxHeight: "85%",
    },
    image: {
      maxHeight: "100%",
      maxWidth: "100%",
    },
    textContainer: {
      display: "flex",
      justifySelf: "flex-end",
      height: "15%",
      color: "#ccc",
    },
    cancelButton: {
      position: "absolute",
      right: "8px",
      top: "8px",
      background: "none",
      border: "none",
      cursor: "pointer",

      "&:focus": {
        outline: "none",
      },

      "&:hover > *": {
        fill: "#fff",
      },
    },
    cancelIcon: {
      fill: "#ccc",
      fontSize: "38px",
    },
  };
};

const ImageModal = props => {
  const { classes, content } = props;
  return (
    <div className={classes.modalContainer}>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src={content.tweet.images[content.offset].url}
          alt=""
        />
      </div>
      <div className={classes.textContainer}>
        <p className={classes.text}>{content.tweet.text}</p>
      </div>
      <button className={classes.cancelButton} onClick={props.closeModal}>
        <CancelIcon className={classes.cancelIcon} />
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return { content: state.interface.modalContent };
};

export default compose(
  connect(
    mapStateToProps,
    { closeModal }
  ),
  withStyles(styles)
)(ImageModal);
