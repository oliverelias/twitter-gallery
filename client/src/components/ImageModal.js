import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  modal: {},

  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: '#14171a',
    boxShadow: theme.shadows[5],
    padding: `0 ${theme.spacing.unit}px`,
    maxWidth: '1024px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      maxWidth: '100%',
      maxHeight: '75vh',
    },
  },
});

const ImageModal = props => {
  const { classes, image } = props;
  return (
    <Modal
      aria-labelledby=""
      aria-describedby=""
      open
      onClose={props.handleClose}
      onEscapeKeyDown={() => {
        console.log('escape key down');
      }}
      className={classes.modal}>
      <div className={classes.paper}>
        <img
          src={image.url}
          alt=""
          onLoad={() => console.log('Image loaded')}
        />
      </div>
    </Modal>
  );
};

export default withStyles(styles)(ImageModal);
