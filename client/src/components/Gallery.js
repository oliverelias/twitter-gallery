import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import Loading from './Loading';
import NProgress from 'nprogress';
import axios from 'axios';

const getImageUrl = tweet => {
  if (!tweet.extended_entities) return null;
  if (!tweet.extended_entities.media) return null;
  return tweet.extended_entities.media.map(obj => {
    let w = obj.sizes.large.w;
    let h = obj.sizes.large.h;
    let aspect = w > h ? 'wide' : 'tall';
    return {
      url: obj.media_url,
      aspect: aspect,
    };
  });
};

const tweetsToImages = tweets => {
  return tweets
    .map(tweet => getImageUrl(tweet)) // extract media urls
    .filter(tweet => tweet !== null) // remove any tweets with null media
    .reduce((acc, cur) => acc.concat(cur)); // reduce to flat list (multi-image tweets)
};

const styles = theme => ({
  galleryContainer: {
    padding: '0 40px',
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '86px',
    [theme.breakpoints.up('md')]: {
      marginLeft: '240px',
    },
  },
  cardContainer: {
    flexGrow: 1,
    '&:last-child': {
      flexGrow: 0,
    },
  },
  card: {
    margin: '5px',
    height: '300px',
    minWidth: '200px',
    flexGrow: 1,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    '&:hover': {
      opacity: 0.85,
    },

    // transition: 'background-color 50ms linear',
    // '&:hover': {
    //   backgroundColor: blue[50],
    //   cursor: 'pointer',
    // },
  },
  cardImage: {},
  wide: {
    flexGrow: 2,
    minWidth: '350px',
  },
});

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      dummy: false,
    };
  }

  async componentDidMount() {
    // NProgress.start();
    // debugger;
    console.log('Gallery did mount');
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
    console.log(url);
    const res = await axios.get(url);
    this.setState({
      images: tweetsToImages(res.data),
    });

    // NProgress.done();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      NProgress.start();

      let url;
      let user = this.props.match.params.user || null;
      if (this.props.likes) {
        if (!user) {
          const currentUser = await axios.get('/api/current_user');
          if (currentUser.data) user = currentUser.data.username;
        }
        url = `api/user_favorites/${user}`;
      } else {
        url = user === undefined ? 'api/home' : `api/user_timeline/${user}`;
      }
      console.log(url);
      const res = await axios.get(url);
      this.setState({
        images: tweetsToImages(res.data),
      });

      NProgress.done();
    }
  }

  renderImages = () => {
    const { classes } = this.props;
    const { images } = this.state;

    return images.map(image => {
      let aspect = image.aspect;
      const url = image.url;
      return (
        <ButtonBase focusRipple key={url} className={classes.cardContainer}>
          <Card
            className={`${classes.card} ${aspect === 'wide' ? classes.wide : ''}`}
            style={{
              backgroundImage: `url(${url})`,
            }}
          />
        </ButtonBase>
      );
    });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    console.log('Rendering at: ' + this.props.location.pathname);
    console.log(`Likes?: ${this.props.likes ? 'Yes' : 'No'}`);
    return (
      <div>
        <div className={classes.galleryContainer}>
          {loading ? <Loading /> : this.renderImages()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
