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
    display: 'grid',
    gridTemplateColumns: '200px 200px 200px 200px 200px 200px 200px',
    gap: '16px',
    marginTop: '86px',
    [theme.breakpoints.up('md')]: {
      marginLeft: '240px',
    },
  },
  cardContainer: {},
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
      dummy: false,
    };
  }

  componentDidMount() {
    const url = this.state.dummy ? 'api/dummy_images' : '/api/home';
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

      // if in last column, make aspect tall
      if (col === 7) aspect = 'tall';
      // set up next column position
      aspect === 'wide' ? (col += 2) : (col += 1);
      // if next column not in grid, reset to first
      if (col > 7) col = 1;

      return (
        <li
          key={url}
          className={classes.cardContainer}
          style={{ gridColumnEnd: aspect === 'wide' ? 'span 2' : 'span 1' }}>
          <ButtonBase focusRipple>
            <Card
              className={classes.card}
              style={{
                backgroundImage: 'url(' + url + ')',
                width: aspect === 'wide' ? '416px' : '200px',
              }}
            />
          </ButtonBase>
        </li>
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
