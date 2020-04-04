import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { InsumoTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Insumo = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >        
        <InsumoTable  />      
      </div>
    </div>
  );
};



export default Insumo ;
