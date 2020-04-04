import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { PedidoTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Pedido = props => {

  const  id = props.match.params.id_fornecedor;
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >        
        <PedidoTable  keyFornecedor={id} />      
      </div>
    </div>
  );
};



export default Pedido ;
