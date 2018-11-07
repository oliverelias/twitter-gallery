import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
    display: 'flex',
    justifyContent: 'flex-end',
    background: 'white',
    visibility: 'hidden',
    width: '100%',
    '& > *': {},
  },
  content: {
    flexGrow: 1,
  },
});

const Image = props => {
  const { classes, tweet, image } = props;
  return (
    <div className={classes.cardContainer}>
      <Card
        className={`${classes.card} ${
          image.aspect === 'wide' ? classes.wide : ''
        }`}
        style={{
          backgroundImage: `url(${image.url_small})`,
        }}>
        <CardActionArea className={classes.content} />
        <CardActions className={classes.actions}>
          <Button size="small" color="primary">
            Retweet
          </Button>
          <Button size="small" color="primary">
            Like
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Image);
