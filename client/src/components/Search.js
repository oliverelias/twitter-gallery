import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginLeft: 0,
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing.unit,
    width: 'auto',
    height: '100%',
    // },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Search extends Component {
  state = {
    search: '',
    submit: false,
  };

  onChange = e => {
    this.setState({
      search: e.target.value,
    });
  };

  onSubmit = e => {
    this.setState({
      submit: true,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.search}>
        {this.state.submit && <Redirect push to={`/${this.state.search}`} />}
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <form onSubmit={this.onSubmit}>
          <Input
            placeholder="Search…"
            disableUnderline
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={this.state.search}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
