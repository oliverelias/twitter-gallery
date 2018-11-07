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
      if (!this.state.loadingMoreImages) this.setState({ loadingMoreImages: true });
    }
  };

  // TODO: Seperate url logic from lifecycle methods and
  // make updating consistent across pages.
  async componentDidMount() {
    // NProgress.start();
    //
    window.addEventListener('scroll', this.handleScroll);

    let url;
    let user = this.props.match.params.user || null;
    if (this.props.likes) {
      if (!user) {
        const currentUser = await axios.get('/api/current_user');
        if (currentUser.data) user = currentUser.data.username;
      }
      url = `/api/user_favorites/${user}`;
    } else {
      url = !user ? '/api/home' : `/api/user_timeline/${user}`;
    }
    const res = await axios.get(url);

    this.setState({
      tweets: res.data.tweets,
      lastId: res.data.last_id,
    });

    // NProgress.done();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.location.pathname === this.props.location.pathname &&
      !this.state.loadingMoreImages
    )
      return;

    if (!this.state.loadingMoreImages) NProgress.start();

    let url;
    let user = this.props.match.params.user || null;
    if (this.props.likes) {
      if (!user) {
        const currentUser = await axios.get('/api/current_user');
        if (currentUser.data) user = currentUser.data.username;
      }
      url = `/api/user_favorites/${user}`;
    } else {
      url = !user ? '/api/home' : `/api/user_timeline/${user}`;
    }
    if (this.state.lastId) url += `?max_id=${this.state.lastId}`;
    const res = await axios.get(url);
    const oldTweets = this.state.tweets;
    this.setState({
      tweets: oldTweets.concat(res.data.tweets.splice(1)),
      loadingMoreImages: false,
      lastId: res.data.last_id,
    });

    NProgress.done();
  }

  renderImages = () => {
    const { tweets } = this.state;

    return tweets.map(tweet => {
      return tweet.images.map(image => <Image key={image.url} tweet={tweet} image={image} />);
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
