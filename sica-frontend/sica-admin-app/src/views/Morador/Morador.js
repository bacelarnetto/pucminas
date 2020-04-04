import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { MoradorTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Morador = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >        
        <MoradorTable  />      
      </div>
    </div>
  );
};



export default Morador ;
