 import React, { useState } from 'react';
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
  import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
    menuButton: {
      marginRight: theme.spacing(2),
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

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(false)
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleLogout () {
    localStorage.clear();
    history.push('/');
  }


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

   return (
     <div>
    <AppBar>
      <Toolbar >
        <RouterLink to="/home">
          <Typography variant="h6" style={{color:'#FFF'}}>SCA</Typography>
        </RouterLink>
      
         

        {auth && (
            <div style={{textAlign:'right', width:'100%'}}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClickOpen}>
                  <InputIcon  style={{ marginRight: '10px', fontSize:'20'}}/> 
                   Sair
                </MenuItem>
              </Menu>
            </div>
          )}   
 
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