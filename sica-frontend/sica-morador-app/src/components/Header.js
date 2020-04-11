 import React, { useState,  useEffect } from 'react';
 import { Link as RouterLink,  useHistory  } from 'react-router-dom';
 import { withStyles, makeStyles } from '@material-ui/styles';

 import { 
  AppBar, 
  Toolbar, 
  Typography,  
  IconButton,  
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button } from '@material-ui/core';
  import Tooltip from '@material-ui/core/Tooltip';
  import InputIcon from '@material-ui/icons/Input';

  const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: 'none',
      backgroundColor: '#eeeeee',
      borderBottomWidth:'thin',
      borderBottomStyle:'solid',
      borderBottomColor:'#cfd8dc',
      color:'#FFF'
    },
    flexGrow: {
      flexGrow: 1
    },
    signOutButton: {
      marginLeft: theme.spacing(1),
      color: '#FFF'
  
    }
  }));

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);
 
 export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleLogout () {
    localStorage.clear();

    history.push('/');
  }

   return (
     <div>
    <AppBar>
      <Toolbar >
        <RouterLink to="/home">
          <Typography variant="h6" style={{color:'#FFF'}}>SCA</Typography>
        </RouterLink>
      
         
        <div style={{textAlign:'right', width:'100%'}} > 
          <LightTooltip title="Sair">
            <IconButton
              className={classes.signOutButton}
              color="inherit"
              onClick={() => handleClickOpen()}
            >
              <InputIcon />
            </IconButton>
          </LightTooltip>
        </div>     
 
      </Toolbar>
    </AppBar>
    <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        keepMounted
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="alert-dialog-slide-title">{'Sair'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonLabel}
            onClick={handleClose}
          >
            Não
          </Button>
         
            <Button
              className={classes.buttonLabel}
              onClick={handleLogout}
            >
            Sim
            </Button>
         
        </DialogActions>
      </Dialog>
    </div>
    )
}