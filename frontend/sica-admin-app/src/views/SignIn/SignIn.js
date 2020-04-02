import React, { useState, useEffect } from 'react';
import { useDispatch,  useSelector } from 'react-redux';

import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box
} from '@material-ui/core';

import ErrorIcon from '@material-ui/icons/Error';
import { Creators as actions } from './../../store/actions/auth';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'é necessário' },
    email: true,
    length: {
      maximum: 64
    }
  },
  senha: {
    presence: { allowEmpty: false, message: 'é necessário' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: '#263238',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0),
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
    justifyContent:'center',
    width:'100%'
  },
  messageAlertErro:{
    padding: '10px',   
    borderRadius: 3,
  }
}));

const SignIn = () => {


  const dispatch = useDispatch(); 

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const authRedirectPath = useSelector( state  => state.auth.authRedirectPath );
  const isAuthenticated = useSelector( state  => state.auth.token !== null ); 
  const loading = useSelector( state  => state.auth.loading );
  const errorMessage = useSelector( state  => state.auth.error );

  const handleSignIn = event => {
    event.preventDefault();
    dispatch(actions.auth( formState.values.email, formState.values.senha, true)
      ,[authRedirectPath, isAuthenticated, loading, errorMessage])    
  };

  useEffect(() => {
    dispatch( actions.setAuthRedirectPath( '/' ) )
    /* eslint-disable-next-line */
  }, [])

  let authRedirect = null;
  if ( isAuthenticated ) {
    authRedirect = <Redirect to={authRedirectPath} />
  }

  let errorMessageRedirect = null;
  if ( errorMessage ) {
    errorMessageRedirect =
   
      <Box
        bgcolor="error.main"
        className={classes.messageAlertErro}
        color="error.contrastText"
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            md={1}
            xs={1}
          >
            <ErrorIcon/>
          </Grid>
          <Grid
            item
            md={11}
            xs={11}
          >
            <Typography
              style={{color:'#FFFFFF', paddingTop:'3px'}}
              variant="body1"
            >{errorMessage}</Typography>
          </Grid> 
        </Grid>
          
      </Box>
     
    
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                SCA <br />Sistema de Controle Ambiental
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Seja bem vindo!
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  PUC Minas
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              {authRedirect}
             
              { !loading && (
                <form
                  className={classes.form}
                  onSubmit={handleSignIn}
                >
                  {errorMessageRedirect}
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                  Login 
                  </Typography>
                  <TextField
                    className={classes.textField}
                    error={hasError('email')}
                    fullWidth
                    helperText={
                      hasError('email') ? formState.errors.email[0] : null
                    }
                    label="Endereço de e-mail"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('senha')}
                    fullWidth
                    helperText={
                      hasError('senha') ? formState.errors.senha[0] : null
                    }
                    label="Senha"
                    name="senha"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.senha || ''}
                    variant="outlined"
                  />
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                  Entrar
                  </Button>
                  
                </form>
              )}
              { loading &&  (
                <div className={classes.loadingContent}>
                  <CircularProgress size={100} />
                </div> 
              )}
            </div>
            
          </div>
        </Grid>
        
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
