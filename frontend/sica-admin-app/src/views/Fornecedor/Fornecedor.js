import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { FornecedorTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Fornecedor = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >        
        <FornecedorTable  />      
      </div>
    </div>
  );
};



export default Fornecedor ;
