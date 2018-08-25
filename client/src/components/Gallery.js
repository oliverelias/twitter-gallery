import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grow from '@material-ui/core/Grow';
import axios from 'axios';

const getImageUrl = tweet => {
  if (!tweet.extended_entities) return null;
  if (!tweet.extended_entities.media) return null;
  return tweet.extended_entities.media.map(obj => {
    let w = obj.sizes.large.w;
    let h = obj.sizes.large.h;
    let aspect = w > h ? 'wide' : 'tall';
    return {
      url: obj.media_url + ':small',
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
    justifyContent: 'space-evenly',
    marginTop: '86px',
    [theme.breakpoints.up('md')]: {
      marginLeft: '240px',
    },
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    height: '300px',
    width: '200px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
});

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    axios.get('/api/home').then(res => {
      console.log('axios get: ' + res);
      return this.setState({
        images: tweetsToImages(res.data),
      });
    });

    // Dummy images
    const start = performance.now();
    // axios.get('/api/dummy_images').then(res => {
    //   this.setState({
    //     images: res.data,
    //   });
    // });
    // const end = performance.now() - start;
  }

  renderImages = () => {
    const { classes } = this.props;
    const { images } = this.state;

    return images.map(url => {
      return (
        <li key={url.url} className={classes.cardContainer}>
          <ButtonBase focusRipple>
            <Card
              className={classes.card}
              style={{
                backgroundImage: 'url(' + url.url + ')',
                width: url.aspect === 'wide' ? '400px' : '200px',
              }}
            />
          </ButtonBase>
        </li>
      );
    });
  };

  render() {
    const { classes } = this.props;
    const { images } = this.state;
    return (
      <div>
        <ul className={classes.galleryContainer}>{this.renderImages()}</ul>
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
