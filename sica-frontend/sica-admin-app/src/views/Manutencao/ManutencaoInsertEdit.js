import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
  Button
} from '@material-ui/core';

import ManutencaoForm from './components/ManutencaoForm';
import {  isEdit }  from './../../common/util';


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

const ManutencaoInsertEdit = props => {
  
  const  id_manutencao = props.match.params.id_manutencao;
  const  id_insumo = props.match.params.id_insumo;
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >

        <div
          className={classes.contentActionTop}
          style={{ marginBottom: '10px'}}
        >
     
          <Link to={isEdit(id_manutencao) ? '/manutencao' : '/insumo'}>
            <Button
              className={classes.buttonVoltar}
            ><ArrowBackIcon/> Voltar</Button>            
          </Link>
         
        </div>    
       
        <ManutencaoForm
          keyInsumo={id_insumo}
          keyManutencao={id_manutencao}
        />
       
      </div>
    </div>
  );
};



export default ManutencaoInsertEdit;
