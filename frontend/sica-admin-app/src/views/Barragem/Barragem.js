import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { BarragemTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Barragem = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >        
        <BarragemTable  />      
      </div>
    </div>
  );
};



export default Barragem ;
