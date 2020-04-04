import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#eeeeee',
    borderBottomWidth:'thin',
    borderBottomStyle:'solid',
    borderBottomColor:'#cfd8dc',
    color:'#888888'
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <Grid
            alignItems="center"
            container
            direction="row"
            justify="center"
          >
            <img
              alt="Logo"
              src="/images/logos/filter_hdrlandscapeterrain.svg"
            />
            <h4
              className="MuiTypography-root MuiTypography-h4  MuiTypography-alignCenter"
              style={{color: '#235244'}}
            >SCA</h4></Grid>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
