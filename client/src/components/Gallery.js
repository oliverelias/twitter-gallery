import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Progress from "./NProgress/Progress";

import { getMoreTweets, getNewTweets } from "../actions";
import Image from "./Image";
import Loading from "./Loading";

const styles = theme => ({
  galleryContainer: {
    marginTop: theme.spacing.unit * 6,
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing.unit * 8,
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "240px",
      marginTop: theme.spacing.unit * 10,
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
  progressBar: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
  },
});

class Gallery extends Component {
  state = {
    loadingNewPage: false,
    loadingNewTweets: false,
  };

  componentDidMount() {
    const apiUrl = this.constructUrl();
    this.props.getNewTweets(apiUrl);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { user, action } = this.props.match.params || null;
    if (
      user !== prevProps.match.params.user ||
      action !== prevProps.match.params.action
    ) {
      this.setState({ loadingNewPage: true });
      this.props.getNewTweets(this.constructUrl());
    }
  }

  constructUrl = () => {
    const { user, action } = this.props.match.params;
    const base = "/api";

    if (!user) return `${base}/home`;
    if (action === "likes") return `${base}/user_favorites/${user}`;
    return `${base}/user_timeline/${user}`;
  };

  handleScroll = () => {
    const SCROLL_LEEWAY = 10;
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.offsetHeight - SCROLL_LEEWAY &&
      !this.props.tweets.loadingMoreTweets
    ) {
      const apiUrl = this.constructUrl();
      this.props.getMoreTweets(apiUrl);
    }
  };

  renderImages = () => {
    const { data } = this.props.tweets;
    return data.map(tweet => {
      return tweet.images.map((image, index) => (
        <Image tweet={tweet} offset={index} key={image.url} />
      ));
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.galleryContainer}>
        <Progress
          animationDuration={1000}
          isAnimating={this.props.tweets.loadingNewPage}
        />
        <ul className={classes.gallery}>{this.renderImages()}</ul>
        <Loading
          active={
            this.props.tweets.loadingMoreTweets &&
            !this.props.tweets.loadingNewPage
          }
        />
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
    { getMoreTweets, getNewTweets }
  ),
  withStyles(styles)
)(Gallery);
