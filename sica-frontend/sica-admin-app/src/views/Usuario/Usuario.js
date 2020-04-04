import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { UsuarioTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Usuario = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >        
        <UsuarioTable  />      
      </div>
    </div>
  );
};



export default Usuario ;
