import React , { useState,  useEffect }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InputMask from 'react-input-mask'

import { toast } from 'react-toastify';

import validation from './../common/validationUtil';
import estados  from './../common/UF';

import { BarragemService as barragemService }  from './../servers/barragem'
import { MoradorService as moradorService }  from './../servers/morador'

toast.configure(
  {
    autoClose: 10000,
  }
)


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      SCA - Sistema de controle ambiental. Todos os direitos reservados.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function Form() {

  const classes = useStyles();

  const [values, setValues] = useState({
    id: '',   
    nome: '',
    idade: '',
    email: '',
    cidade: '',
    endereco: '',
    bairro: '',
    numero: '',
    telefone: '',
    uf: 'sel',
    idBarragem : 'sel'  
  });

  const UFs = estados;

  const [barragens, setBarragens] = useState([]);

  const [showErrors, setShowErrors] = useState(false);


  useEffect(() => {
    async function loadBarragem() {
     const list = await barragemService.findList()
     setBarragens(list);
    }
    loadBarragem();
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (validation.required(values.nome.trim()) 
      || validation.email(values.email) 
      || validation.required(values.endereco.trim()) 
      || validation.required(values.bairro.trim())
      || validation.number(values.idade.trim())
      || validation.number(values.numero.trim())
      || values.idBarragem === 'sel'
      || values.uf === 'sel' 
      || validation.required(values.cidade.trim())
    ) {
      toast.error(`Por favor, preencha os campos obrigatórios.`)
      setShowErrors(true);
    } else {
      
        await moradorService.submitMorador(values) ;  
      
        await toast.success(`Cadastro realizado com sucesso.`)

        setValues({  
          id: '',   
          nome: '',
          idade: '',
          email: '',
          cidade: '',
          endereco: '',
          bairro: '',
          numero: '',
          telefone: '',
          uf: 'sel',
          idBarragem : 'sel' 
        });        
      
      setShowErrors(false);
    }
  }
  return (
    <Container component="main" maxWidth="md">
      <AppBar>
          <Toolbar >
            <Typography variant="h6">SCA</Typography>
          </Toolbar>
        </AppBar>
      <CssBaseline />
      <br/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro de Moradores
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={validation.required(values.nome.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.nome.trim())}
                label="Nome"
                name="nome"
                onChange={handleChange}
                required
                value={values.nome}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                error={validation.email(values.idade) && showErrors}
                fullWidth
                helperText={showErrors && validation.number(values.idade)}
                label="Idade"
                name="idade"
                onChange={handleChange}
                required
                inputProps={{ min: '1', max: '200', step: '1' }}
                type="number" 
                value={values.idade}
                variant="outlined"
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <TextField
                error={validation.email(values.email) && showErrors}
                fullWidth
                helperText={showErrors && validation.email(values.email)}
                label="E-mail"
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
              xs={12}
            >
              <TextField
                error={validation.required(values.endereco.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.endereco.trim())}
                label="Endereço"
                name="endereco"
                onChange={handleChange}
                required
                value={values.endereco}
                variant="outlined"
              />
            </Grid> 
            <Grid
              item
              xs={12}
            >
              <TextField
                error={validation.required(values.bairro.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.bairro.trim())}
                label="Bairro"
                name="bairro"
                onChange={handleChange}
                required
                value={values.bairro}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={validation.required(values.cidade.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.cidade.trim())}
                label="Cidade"
                name="cidade"
                onChange={handleChange}
                required
                value={values.cidade}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                error={values.uf === 'sel' && showErrors}
                fullWidth
                helperText={values.uf === 'sel' && showErrors && 'Por favor, selecione um UF.'}
                label="Estado"
                name="uf"
                onChange={handleChange}
                required
                // eslint-disable-next-line react/jsx-sort-props
                select
                SelectProps={{ native: true }}
                value={values.uf}
                variant="outlined"
              >
                <option
                  value="sel"
                >
                  Selecione
                </option>
                {UFs.map(option => (
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
                error={validation.number(values.numero.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.number(values.numero.trim())}
                label="Numero"
                name="numero"
                onChange={handleChange}
                required
                value={values.numero}
                variant="outlined"
                inputProps={{ min: '1', max: '200', step: '1' }}
                type="number" 
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >  
              <InputMask
                mask="(99) 99999-9999"
                onChange={handleChange}
                value={values.telefone}
              >
                {(inputProps) => 
                  <TextField
                    {...inputProps}
                    fullWidth
                    label="Telefone"
                    name="telefone"
                    variant="outlined"
                  />}
              </InputMask>
            </Grid>

            
            <Grid item xs={12}>
              <TextField
                error={values.idBarragem === 'sel' && showErrors}
                fullWidth
                helperText={values.idBarragem === 'sel' && showErrors && 'Por favor, selecione uma Barragem.'}
                variant="outlined"
                required
                fullWidth
                id="idBarragem"
                label="Barragem próxima da sua residência"
                name="idBarragem"
                SelectProps={{ native: true }}
                onChange={handleChange}
                select
                value={values.idBarragem}
              > 
                <option value="sel" >
                  Selecione
                </option>
                {barragens.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.descricao}
                  </option>
                ))}
            </TextField>

            </Grid>
           

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Salvar
          </Button>
         
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}