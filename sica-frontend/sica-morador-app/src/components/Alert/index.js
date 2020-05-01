import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  alert: {
    padding:12,
    backgroundColor: '#BA1717', 
    width: '100%',
    borderRadius: '4px',
    marginBottom: '20px'
    
  },
  alertFont :{
    color:'#fff',
    fontWeight: 'bold',
  }

}))

export default function Alert() {
  const classes = useStyles();
  return (
    <div className={classes.alert} >
      <Typography variant="body1" className={classes.alertFont} >   
        <WarningIcon />    
        &nbsp;&nbsp; Alerta de rompimento de barragem. Evacuar a área
        imediatamente!
      </Typography>
    </div>
  );
}
