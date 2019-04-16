import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Fade from "@material-ui/core/Fade";
import NProgress from "nprogress";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { newTweets } from "../actions";
import Image from "./Image";

const styles = theme => ({
  galleryContainer: {
    marginTop: "86px",
    [theme.breakpoints.up("md")]: {
      marginLeft: "240px",
    },
  },
  gallery: {
    padding: `0 ${theme.spacing.unit}px`,
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      padding: `0 ${theme.spacing.unit * 5}px`,
    },
  },
});

class Gallery extends Component {
  componentDidMount() {
    this.props.newTweets(this.props.match.params.user);
  }
  renderImages = () => {
    const { classes } = this.props;
    const { tweets } = this.props;
    console.log(tweets);
    return tweets.map(tweet => {
      return tweet.images.map(image => <Image tweet={tweet} image={image} />);
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.galleryContainer}>
        <ul className={classes.gallery}>{this.renderImages()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { tweets: state.tweets };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { newTweets }
  ),
  withStyles(styles)
)(Gallery);
