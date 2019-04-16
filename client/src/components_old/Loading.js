import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  loading: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '48px',
  },
});

const Loading = props => {
  const { classes, active } = props;
  return (
    <div className={classes.loading}>{active && <CircularProgress />}</div>
  );
};

export default withStyles(styles)(Loading);
