import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
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
  },
  card: {
    margin: '5px',
    height: '300px',
    minWidth: '200px',
    flexGrow: 1,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
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
    minWidth: '400px',
  },
});

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      dummy: true,
    };
  }

  componentDidMount() {
    let url;
    if (this.state.dummy) {
      url = 'api/dummy_images';
    } else {
      console.log(this.props);
      const source = this.props.match.params.user;
      url = source === undefined ? 'api/home' : `api/user_timeline/${source}`;
    }
    axios.get(url).then(res => {
      return this.setState({
        images: tweetsToImages(res.data),
      });
    });
  }

  renderImages = () => {
    const { classes } = this.props;
    const { images } = this.state;

    console.log('inside renderImages');
    console.log(images);

    let col = 1;

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
    return (
      <div>
        <ul className={classes.galleryContainer}>{this.renderImages()}</ul>
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
