import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { ManutencaoTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Manutencao = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >        
        <ManutencaoTable  />      
      </div>
    </div>
  );
};

export default Manutencao ;
