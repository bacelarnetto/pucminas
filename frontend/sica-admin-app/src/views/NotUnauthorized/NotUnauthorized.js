import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 500
  },
  videoTag:{  
    borderColor:'#FFFFFF',
    borderWidth: 2,
    borderStyle: 'solid',
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560 /* optional depending on what you want to do in your app */

  }
}));

const NotUnauthorized = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h1">
              403: Acesso proibido!
            </Typography>
            <Typography variant="subtitle2">
             Você não tem permissão de acesso
            </Typography>
    
            <img
              alt="Under development"
              className={classes.image}
              src="/images/403.png"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotUnauthorized;
