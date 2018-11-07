import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Image from './Image';
import Loading from './Loading';
import NProgress from 'nprogress';
import axios from 'axios';

const styles = theme => ({
  galleryContainer: {
    marginTop: '86px',
    [theme.breakpoints.up('md')]: {
      marginLeft: '240px',
    },
  },
  gallery: {
    padding: '0 40px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      lastId: null,
      loadingMoreImages: false,
    };
  }

  handleScroll = e => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    const scroll = document.documentElement.scrollTop;
    if (windowHeight + scroll >= documentHeight) {
      if (!this.state.loadingMoreImages)
        this.setState({ loadingMoreImages: true });
    }
  };

  createUrl = () => {
    const { params } = this.props.match;

    if (!params.user) return '/api/home';

    const path =
      params.likes && params.likes.toLowerCase() === 'likes'
        ? 'user_favorites'
        : 'user_timeline';
    return `/api/${path}/${params.user}`;
  };

  // TODO: Seperate url logic from lifecycle methods and
  // make updating consistent across pages.
  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

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
      !this.state.loadingMoreImages
    ) {
      return;
    }

    // Dont show progress bar if just loading new images
    if (!this.state.loadingMoreImages) NProgress.start();

    // If we're loading a new route remove previous images
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // await this so we dont fetch new tweets with old max_id
      await this.setState({
        tweets: [],
        lastId: null,
      });
    }

    let apiUrl = this.createUrl();
    if (this.state.lastId) apiUrl += `?max_id=${this.state.lastId}`;

    const res = await axios.get(apiUrl);
    const oldTweets = this.state.tweets;

    this.setState({
      // append new tweets to old ones
      tweets: this.state.tweets.concat(res.data.tweets.splice(1)),
      loadingMoreImages: false,
      lastId: res.data.last_id,
    });

    NProgress.done();
  }

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
        {loadingMoreImages && <Loading />}
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
