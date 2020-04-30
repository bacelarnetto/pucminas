import React , { useState,  useEffect }from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Divider,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { toast } from 'react-toastify';

import validation from './../../common/validationUtil';

import { MoradorService as moradorService }  from './../../servers/morador'

import Copyright  from './../../components/Copyright'
import Header  from './../../components/Header'

toast.configure(
  {
    autoClose: 10000,
  }
)

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));

export default function TrocarSenha() {
  const classes = useStyles();
  const [values, setValues] = useState({
    senha: '',
    senha_verf: '',
    email: localStorage.getItem('moradorEmail')
  });

  const [load, setLoad] = useState(false)

  const [showErrors, setShowErrors] = useState(false);


  useEffect(() => {
    
    
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {   
    event.preventDefault();
    setLoad(true)
    if (
      validation.required(values.senha )||
      validation.required(values.senha_verf)
    ) {
      toast.error(`Por favor, preencha os campos obrigatórios.`)
      setShowErrors(true);
      setLoad(false);
    } else if(values.senha !== values.senha_verf){
      toast.error(`Por favor, as senhas tem que serem iguais.`)
      setShowErrors(true);
      setLoad(false);
    }
     else {      
             
      await moradorService.alterarSenha({email:values.email, senha: values.senha}) ;        
      await toast.success(`Alteração de senha realizada com sucesso.`)
        setValues({ 
          senha: '',
          senha_verf: '',
          email: localStorage.getItem('moradorEmail')
        });        
      
      setShowErrors(false);
      setLoad(false);
    }
  }
  return (
    <Container 
      component="main" 
      maxWidth="md">
      <Header/>
      <CssBaseline />
      <br/>
      <div className={classes.paper}>
        <div
            className="contentActionTop"
          >
          <Link to="/home" >
            <Button
              className="buttonVoltar" 
            ><ArrowBackIcon/> Voltar</Button>            
          </Link>
        </div>    
        <Card
          style={{width:'100%'}}
        >
          <CardHeader
            subheader={localStorage.getItem('moradorEmail')}
            title="Alteração de Senha"
          />
          <Divider />

          <CardContent>

        <form className={classes.form} noValidate onSubmit={handleSubmit} >
          <Grid container spacing={2}>


            <Grid item md={6} xs={12}>
              <TextField
                error={validation.required(values.senha) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.senha)}
                label="Senha"
                name="senha"
                onChange={handleChange}
                required
                inputProps={{ min: '1', max: '200', step: '1' }}
                type="password" 
                value={values.senha}
                variant="outlined"
              />
            </Grid>     
            <Grid item md={6} xs={12}>
              <TextField
                error={validation.required(values.senha_verf) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.senha_verf)}
                label="Comfirmar a senha"
                name="senha_verf"
                onChange={handleChange}
                required
                inputProps={{ min: '1', max: '200', step: '1' }}
                type="password" 
                value={values.senha_verf}
                variant="outlined"
              />
            </Grid>            
          

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={load}
          >
            Salvar
          </Button>
         
        </form>
        </CardContent>
      </Card>
      
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}