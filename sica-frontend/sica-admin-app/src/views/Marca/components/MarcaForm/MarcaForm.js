import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link  as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  CircularProgress,
  TextField
} from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';

import { Creators as actions } from './../../../../store/actions/marca';
import {  isEdit }  from './../../../../common/util';

const useStyles = makeStyles(theme => ({
  root: {},
  button:{
    color:'#FFFFFF',
    backgroundColor:'#235244',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#14352c'
    }
  },  
  loadingContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  loadingBlock:{
    zIndex: theme.zIndex.drawer + 2,
  }
}));

const MarcaForm = props => {
  const { className, keyItem, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    id:  '',
    nome: ''
  });

  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaMarca(keyItem), isEdit(keyItem));
  const marca = useSelector( state  => state.marca.marca );
  const loading = useSelector( state  => state.marca.loading );
  
  useEffect(() => {
    if(isEdit(keyItem)){
      setValues({
        id:  marca.id || '',
        nome: marca.nome ||''
      });
    }
  }, [marca, keyItem])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (!values.nome) {
      setShowErrors(true);
    } else {
      if(isEdit(keyItem)) {
        dispatch(actions.editMarca(values),[])
      }else{
        dispatch(actions.insertMarca(values),[])
        setValues({ id: '',  nome:'' });        
      }
      setShowErrors(false);
    }
  }

  return (
    <div>

   
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >                 
          <CardHeader
            subheader={isEdit(keyItem) ? 'ALTERAÇÃO' : 'CADASTRO'}
            title="Marca" 
          />
          <Divider />
          <CardContent>
            { loading && (    
              <div className={classes.loadingContent}>                
                <CircularProgress />              
              </div>
            )}
            <Grid
              container
              spacing={3}
            >
              { isEdit(keyItem) &&
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                disabled
                fullWidth
                label="Cod."
                margin="dense"
                name="id"
                onChange={handleChange}
                required
                value={values.id}
                variant="outlined"
              />
            </Grid>}
              <Grid
                item
                md={8}
                xs={12}
              >
                <TextField
                  error={!values.nome && showErrors}
                  fullWidth
                  helperText={!values.nome && showErrors && 'Por favor, preencha o nome.'}
                  label="Nome"
                  margin="dense"
                  name="nome"
                  onChange={handleChange}
                  required
                  value={values.nome}
                  variant="outlined"
                />
              </Grid>
            
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              className={classes.button}
              color="primary"
              disabled={loading}
              type="submit"
              variant="contained"
            >
              {isEdit(keyItem) ? 'Editar' : 'Salvar'}
            </Button>
            <RouterLink to="/marca">
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
              >
            Cancelar
              </Button>
            </RouterLink >
          </CardActions>
        </form>
      </Card>

      <Backdrop
        className={classes.backdrop}
        open={loading}
      >
        <Card className={classes.loadingBlock}>
          <CardContent>
            <CircularProgress color="inherit" />
          </CardContent>        
        </Card>
      </Backdrop>
    </div>
  );
};

const useFetching = (dispatch, action, isEdit) => {
  const array = [];
  useEffect(() => {
    if(isEdit){
      dispatch(action);
    }
    /* eslint-disable-next-line */
  }, array)
}

MarcaForm.propTypes = {
  className: PropTypes.string
};

export default MarcaForm;
