import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
  card: {
    marginBottom: 16,
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
    // axios.get('/api/user_favorites/crabennui').then(res => {
    //   console.log('HEWWO?!');
    //   return this.setState({
    //     images: tweetsToImages(res.data),
    //   });
    // });

    // Dummy images
    axios.get('/api/dummy_images').then(res => {
      this.setState({
        images: res.data,
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
              <Card className={classes.card}>
                <img src={'/dummy_images/' + url} className={classes.cardImage} alt="" />
              </Card>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
