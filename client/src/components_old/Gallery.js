import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Image from "./Image";
import Loading from "./Loading";
import NProgress from "nprogress";
import axios from "axios";

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
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      padding: `0 ${theme.spacing.unit * 5}px`,
    },
  },
});

class Gallery extends Component {
  state = {
    tweets: [],
    lastId: null,
    loadingMoreImages: false,
    loadingNewPage: false,
  };

  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    // Get set of tweets based on current route
    const apiPath = this.createUrl();
    const res = await axios.get(apiPath);

    this.setState({
      tweets: res.data.tweets,
      lastId: res.data.last_id,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.location.pathname === this.props.location.pathname &&
      !this.state.loadingMoreImages &&
      !this.state.loadingNewPage
    ) {
      return;
    }

    // Dont show progress bar if just loading new images
    if (!this.state.loadingMoreImages) NProgress.start();

    // If we're loading a new route remove previous images
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState(state => ({
        tweets: [],
        lastId: null,
        loadingNewPage: true,
        loadingMoreImages: false,
      }));
      return;
    }

    let apiUrl = this.createUrl();
    if (this.state.lastId) apiUrl += `?max_id=${this.state.lastId}`;

    const res = await axios.get(apiUrl);

    this.setState(state => ({
      // append new tweets to old ones
      tweets: state.tweets.concat(res.data.tweets.splice(1)),
      loadingMoreImages: false,
      loadingNewPage: false,
      lastId: res.data.last_id,
    }));

    NProgress.done();
  }

  /**
   * Set state to load more images when scrolled to bottom of page
   */
  handleScroll = e => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    const scroll = document.documentElement.scrollTop;
    if (windowHeight + scroll >= documentHeight - windowHeight / 2) {
      if (!this.state.loadingMoreImages)
        this.setState({ loadingMoreImages: true });
    }
  };

  /**
   * Create an URL based on current route
   * if no route will default to the home timeline
   */
  createUrl = () => {
    const { params } = this.props.match;

    if (!params.user) return "/api/home";

    const path =
      params.likes && params.likes.toLowerCase() === "likes"
        ? "user_favorites"
        : "user_timeline";
    return `/api/${path}/${params.user}`;
  };

  renderImages = () => {
    const { tweets } = this.state;

    return tweets.map(tweet => {
      return tweet.images.map(image => (
        <Image key={image.url} tweet={tweet} image={image} />
      ));
    });
  };

  render() {
    const { classes } = this.props;
    const { loadingMoreImages } = this.state;
    return (
      <div className={classes.galleryContainer}>
        <div className={classes.gallery}>{this.renderImages()}</div>
        <Loading active={loadingMoreImages} />
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
