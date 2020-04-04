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

import { Creators as actions } from './../../../../store/actions/usuario';
import {  isEdit }  from './../../../../common/util';
import validation from './../../../../common/validationUtil';
import roles  from './../../../../common/roles';

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

const UsuarioForm = props => {
  const { className, keyItem, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    id:  '',
    username: '',
    email: '',
    senha: '',
    tipo: 'sel',
  });
  const optionsRoles = roles;
  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaUsuario(keyItem), isEdit(keyItem));
  const usuario = useSelector( state  => state.usuario.usuario );
  const loading = useSelector( state  => state.usuario.loading );
  
  useEffect(() => {
    if(isEdit(keyItem)){
      setValues({
        id:  usuario.id || '',
        username: usuario.username ||'',
        email: usuario.email ||'',
        senha: usuario.senha ||'',
        tipo: usuario.tipo ||'sel',
      });
    }
  }, [usuario, keyItem])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (validation.required(values.username.trim()) 
    || validation.email(values.email) 
    || validation.required(values.senha.trim()) 
    || values.tipo === 'sel') {
      setShowErrors(true);
    } else {
      if(isEdit(keyItem)) {
        dispatch(actions.editUsuario(values),[])
      }else{
        dispatch(actions.insertUsuario(values),[])
        setValues({ 
          id:  '',
          username: '',
          email: '',
          senha: '',
          tipo: 'sel',
        });        
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
            title="Usuario" 
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
                md={10}
                xs={12}
              >
                <TextField
                  error={validation.required(values.username) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.username)}
                  label="Nome"
                  margin="dense"
                  name="username"
                  onChange={handleChange}
                  required
                  value={values.username}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={7}
                xs={12}
              >
                <TextField
                  error={validation.email(values.email) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.email(values.email)}
                  label="E-mail"
                  margin="dense"
                  name="email"
                  onChange={handleChange}
                  required
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={5}
                xs={12}
              >        

                <TextField
                  error={values.tipo === 'sel' && showErrors}
                  fullWidth
                  helperText={values.tipo === 'sel' && showErrors && 'Por favor, selecione um Permissão.'}
                  label="Tipo de permissão"
                  margin="dense"
                  name="tipo"
                  onChange={handleChange}
                  required
                  // eslint-disable-next-line react/jsx-sort-props
                  select
                  SelectProps={{ native: true }}
                  value={values.tipo}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {optionsRoles.map(option => (
                    <option
                      key={option.key}
                      value={option.key}
                    >
                      {option.value}
                    </option>
                  ))}
                </TextField>

              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={validation.required(values.senha) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.senha)}
                  label="Senha"
                  margin="dense"
                  name="senha"
                  onChange={handleChange}
                  required
                  type="password"
                  value={values.senha}
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
            <RouterLink to="/usuario">
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

UsuarioForm.propTypes = {
  className: PropTypes.string
};

export default UsuarioForm;
