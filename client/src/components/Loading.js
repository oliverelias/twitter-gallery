import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      paddingRight: '240px',
    },
  },
});

const Loading = props => {
  const { classes } = props;
  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
};

export default withStyles(styles)(Loading);
