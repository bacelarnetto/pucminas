import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
  Button
} from '@material-ui/core';

import PedidoForm from './components/PedidoForm';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  contentActionTop:{
    textAlign: 'right',
    color:'#235244',
  },
  buttonVoltar:{
    color:'#235244',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#e2ece9'
    }
  }
}));

const PedidoInsertEdit = props => {
  
  const id_pedido = props.match.params.id_pedido;
  const id_fornecedor = props.match.params.id_fornecedor;
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >

        <div
          className={classes.contentActionTop}
          style={{ marginBottom: '10px'}}
        >
          <Link to={`/pedidos/fornecedor/${id_fornecedor}`}>
            <Button
              className={classes.buttonVoltar}
            ><ArrowBackIcon/> Voltar</Button>            
          </Link>
        </div>    
       
        <PedidoForm
          keyFornecedor={id_fornecedor}
          keyPedido={id_pedido}
        />
       
      </div>
    </div>
  );
};



export default PedidoInsertEdit;
