import React from 'react';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
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
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    '&:hover': {
      opacity: 0.85,
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
});

const Image = props => {
  const { classes, tweet, image } = props;
  return (
    <ButtonBase focusRipple className={classes.cardContainer}>
      <Card
        className={`${classes.card} ${image.aspect === 'wide' ? classes.wide : ''}`}
        style={{
          backgroundImage: `url(${image.url_small})`,
        }}
      />
    </ButtonBase>
  );
};

export default withStyles(styles)(Image);
