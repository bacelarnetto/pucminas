import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
  Button
} from '@material-ui/core';

import MoradorForm from './components/MoradorForm';


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

const MoradorInsertEdit = props => {
  
  const  id = props.match.params.id;
  
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <div className={classes.content} >

        <div
          className={classes.contentActionTop}
          style={{ marginBottom: '10px'}}
        >
          <Link to="/morador">
            <Button
              className={classes.buttonVoltar}
            ><ArrowBackIcon/> Voltar</Button>            
          </Link>
        </div>    
       
        <MoradorForm keyItem={id}/>
       
      </div>
    </div>
  );
};



export default MoradorInsertEdit;
