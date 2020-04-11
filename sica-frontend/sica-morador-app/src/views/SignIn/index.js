import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { toast } from 'react-toastify';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BarragemService as service }  from './../../servers/barragem'

import Copyright  from './../../components/Copyright'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(../assets/images/moradores_sica.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

toast.configure(
  {
    autoClose: 10000,
  }
)


export default function SignIn() {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const barragem = await service.findBarragem(email)

      localStorage.setItem('moradorEmail', email);
      localStorage.setItem('moradorBarragem', JSON.stringify(barragem));      

      history.push('/home');
    } catch (error) {
      await toast.error(`Falha no Login. Email não cadastrado.`)
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
     
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br/><br/>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <br/>
          <Typography component="h1" variant="h5">
            Acesso
          </Typography>
          <form className={classes.form} onSubmit={handleLogin} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link className="back-link" to="/register">
                  {"Não possui uma conta? Inscrever-se."}
                </Link>
              </Grid>
              <Grid item> 
               <br/>
                <Typography variant="body1">
                  Cadastre-se para receber alertas com informações das barragens proxiomo a você!
                </Typography>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}