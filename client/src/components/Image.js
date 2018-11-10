import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {
  TwitterRetweet,
  Heart as HeartIcon,
  HeartOutline as HeartOutlineIcon,
  Link as LinkIcon,
} from 'mdi-material-ui';
import { green, red } from '@material-ui/core/colors';
import { Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ImageModal from './ImageModal';

const styles = theme => {
  const width = theme.spacing.unit * 20;
  const height = theme.spacing.unit * 20;
  return {
    cardContainer: {
      flexGrow: 1,
      '&:last-child': {
        flexGrow: 0,
      },
    },
    card: {
      margin: '5px',
      height: '120px',
      minWidth: '80px',
      maxWidth: '500px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      '&:hover > *': {
        visibility: 'visible',
      },
      [theme.breakpoints.up('md')]: {
        height: '300px',
        minWidth: '200px',
      },
    },
    wide: {
      minWidth: '120px',
      [theme.breakpoints.up('md')]: {
        minWidth: '350px',
      },
    },
    actions: {
      display: 'none',
      justifyContent: 'flex-end',
      background: 'white',
      visibility: 'hidden',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    actionButton: {
      minWidth: '48px',
      '& svg': {
        opacity: 0.4,
      },
    },
    content: {
      flexGrow: 1,
    },
  };
};

class Image extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    console.log('close modal');
    this.setState({ open: false });
  };

  render() {
    const { classes, tweet, image } = this.props;
    const retweetStyle = { color: green[700], opacity: 1 };
    const likeStyle = { color: red[500], opacity: 1 };
    return (
      <div className={classes.cardContainer}>
        <Card
          className={`${classes.card} ${
            image.aspect === 'wide' ? classes.wide : ''
          }`}
          style={{
            backgroundImage: `url(${image.url_small})`,
          }}>
          <CardActionArea
            className={classes.content}
            onClick={this.handleOpen}
          />
          <CardActions className={classes.actions}>
            <Button
              size="small"
              color="primary"
              className={classes.actionButton}>
              <TwitterRetweet style={tweet.retweeted ? retweetStyle : null} />
            </Button>
            <Button
              size="small"
              color="primary"
              className={classes.actionButton}>
              {tweet.favorited ? (
                <HeartIcon style={{ ...likeStyle, width: '0.8em' }} />
              ) : (
                <HeartOutlineIcon style={{ width: '0.8em' }} />
              )}
            </Button>
            <Button
              href={`https://twitter.com/statuses/${tweet.id}`}
              target="_blank"
              rel="noopener"
              size="small"
              color="primary"
              className={classes.actionButton}>
              <LinkIcon style={{ opacity: 1 }} />
            </Button>
          </CardActions>
        </Card>
        {this.state.open && (
          <ImageModal handleClose={this.handleClose} image={image} />
        )}
        {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.modal}>
          <div className={classes.paper}>
            <img src={image.url} alt="" />
          </div>
        </Modal> */}
      </div>
    );
  }
}

export default withStyles(styles)(Image);
