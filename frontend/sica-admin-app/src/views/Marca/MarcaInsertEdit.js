import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
  Button
} from '@material-ui/core';

import MarcaForm from './components/MarcaForm';

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

const MarcaInsertEdit = props => {
  
  const  id = props.match.params.id;
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >

        <div
          className={classes.contentActionTop}
          style={{ marginBottom: '10px'}}
        >
          <Link to="/marca">
            <Button
              className={classes.buttonVoltar}
            ><ArrowBackIcon/> Voltar</Button>            
          </Link>
        </div>    
       
        <MarcaForm keyItem={id}/>
       
      </div>
    </div>
  );
};



export default MarcaInsertEdit;
