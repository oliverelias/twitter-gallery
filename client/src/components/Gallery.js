import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import fs from 'fs';

const getImageUrl = tweet => {
  if (!tweet.extended_entities) return null;
  if (!tweet.extended_entities.media) return null;
  return tweet.extended_entities.media.map(obj => {
    return obj.media_url;
  });
};

const tweetsToImages = tweets => {
  return tweets
    .map(tweet => getImageUrl(tweet))
    .filter(tweet => tweet)
    .reduce((acc, cur) => acc.concat(cur));
};

const styles = {
  galleryContainer: {
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '86px',
  },
  galleryImage: {
    maxHeight: '300px',
  },
  card: {
    marginBottom: 16,
    transition: 'background-color 50ms linear',
    '&:hover': {
      backgroundColor: blue[50],
      cursor: 'pointer',
    },
  },
  cardImage: {
    padding: 8,
    height: '300px',
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
    axios.get('/api/home').then(res => {
      return this.setState({
        images: tweetsToImages(res.data),
      });
    });

    // Dummy images
    // const start = performance.now();
    // axios.get('/api/dummy_images').then(res => {
    //   this.setState({
    //     images: res.data,
    //   });
    // });
    // const end = performance.now() - start;
  }

  render() {
    const { classes } = this.props;
    const { images } = this.state;
    return (
      <div>
        <ul className={classes.galleryContainer}>
          {images.map(url => (
            <li>
              <Card className={classes.card}>
                <img src={url} className={classes.cardImage} alt="" />
              </Card>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
