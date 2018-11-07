import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
      height: '150px',
      minWidth: '100px',
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
      minWidth: '150px',
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
    content: {
      flexGrow: 1,
    },

    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    paper: {
      position: 'absolute',
      margin: 'auto',
      maxWidth: window.innerWidth - width + 'px',
      maxHeight: window.innerHeight - height + 'px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 2,
      '& img': {
        maxWidth: window.innerWidth - width - 32 + 'px',
        maxHeight: window.innerHeight - height - 32 + 'px',
        objectFit: 'cover',
        overflow: 'hidden',
      },
      button: {
        textDecoration: 'none',
      },
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
    this.setState({ open: false });
  };

  render() {
    const { classes, tweet, image } = this.props;
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
            <Button size="small" color="primary">
              Like
            </Button>
            <Button
              href={`https://twitter.com/statuses/${tweet.id}`}
              size="small"
              color="primary"
              className={classes.button}>
              Original
            </Button>
          </CardActions>
        </Card>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.modal}>
          <div className={classes.paper}>
            <img src={image.url} alt="" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Image);