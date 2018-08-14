import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const getImageUrl = tweet => {
  if (!tweet.extended_entities) return null;
  if (!tweet.extended_entities.media) return null;
  return tweet.extended_entities.media.map(obj => {
    return obj.media_url;
  });
};

const tweetsToImages = tweets => {
  console.log(tweets);
  return tweets.map(tweet => getImageUrl(tweet)).filter(tweet => tweet);
};

const styles = {
  galleryContainer: {
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryImage: {
    maxHeight: '300px',
  },
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.setState({ images: ['1'] });
    console.log('Inside componentDidMount() of Gallery.js');
    axios.get('/api/home').then(res => {
      console.log('HEWWO?!');
      return this.setState({
        images: tweetsToImages(res.data),
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { images } = this.state;
    return (
      <div>
        <ul className={classes.galleryContainer}>
          {images.map(url => (
            <li>
              <a href={url}>
                <img className={classes.galleryImage} src={url + ':small'} alt="" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
