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

import { getUserTweets } from "../actions";
import Image from "./Image";
import Loading from "./Loading";

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
  state = {
    loadingNewPage: false,
    loadingNewTweets: false,
  };

  componentDidMount() {
    const { user } = this.props.match.params;
    this.props.getUserTweets(user);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.match.params;
    if (user !== prevProps.match.params.user) {
      this.props.getUserTweets(user);
    }
  }

  handleScroll = () => {
    const SCROLL_LEEWAY = 10;
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.offsetHeight - SCROLL_LEEWAY &&
      !this.props.tweets.loading
    ) {
      const { user } = this.props.match.params;
      this.props.getUserTweets(user, this.props.tweets.lastId);
    }
  };

  renderImages = () => {
    const { data } = this.props.tweets;
    return data.map(tweet => {
      return tweet.images.map(image => (
        <Image tweet={tweet} image={image} key={image.url} />
      ));
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.galleryContainer}>
        <ul className={classes.gallery}>{this.renderImages()}</ul>
        <Loading active={this.props.tweets.loading} />
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
    { getUserTweets }
  ),
  withStyles(styles)
)(Gallery);
