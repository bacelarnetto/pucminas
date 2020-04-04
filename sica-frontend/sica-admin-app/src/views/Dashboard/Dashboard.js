import React, { useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Creators as actions } from './../../store/actions/dashboard'

import {
  TotalInsumo,
  TotalMorador,
  TotalManutencao,
  TotalBarragem,
  MoradorByBarragem,
  AlertaBarragem,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaDashboard());

  const qntInsumo = useSelector( state  => state.dashboard.qntInsumo );
  const qntManutencao = useSelector( state  => state.dashboard.qntManutencao );
  const qntBarragem = useSelector( state  => state.dashboard.qntBarragem );
  const qntMorador = useSelector( state  => state.dashboard.qntMorador );
  const resumeBarragemMorador = useSelector( state  => state.dashboard.resumeBarragemMorador);
  const listQntMoradores = useSelector( state  => state.dashboard.listQntMoradores);
  const listBarragem = useSelector( state  => state.dashboard.listBarragem);
  const listColor = useSelector( state  => state.dashboard.listColor);
  const resumeBarragemMoradorRiscoAlto = useSelector( state  => state.dashboard.resumeBarragemMoradorRiscoAlto);
  const listColorRiscoAlto = useSelector( state  => state.dashboard.listColorRiscoAlto);
  const listQntMoradoresRiscoAlto = useSelector( state => state.dashboard.listQntMoradoresRiscoAlto);
  const listBarragemRiscoAlto = useSelector(state => state.dashboard.listBarragemRiscoAlto)

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalInsumo qntInsumo={qntInsumo} />
        </Grid>
       
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalManutencao qntManutencao={qntManutencao} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalMorador qntMorador={qntMorador}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalBarragem qntBarragem={qntBarragem} />
        </Grid>

        { typeof listBarragemRiscoAlto != 'undefined'  
                        && listBarragemRiscoAlto != null  
                        && listBarragemRiscoAlto.length != null  
                        && listBarragemRiscoAlto.length > 0 &&
       ( 
         <Grid
           item
           lg={12}
           md={12}
           xl={12}
           xs={12}
         >
           <AlertaBarragem 
             listBarragem={listBarragemRiscoAlto}
             listColor={listColorRiscoAlto}
             listQntMoradores ={listQntMoradoresRiscoAlto}
             resumeBarragemMoradorRiscoAlto={resumeBarragemMoradorRiscoAlto}
           />
         </Grid>
       )}
        { typeof listBarragem != 'undefined'  
                        && listBarragem != null  
                        && listBarragem.length != null  
                        && listBarragem.length > 0 &&
       ( 
         <Grid
           item
           lg={12}
           md={12}
           xl={12}
           xs={12}
         >
           <MoradorByBarragem
             listBarragem={listBarragem}
             listColor={listColor}
             listQntMoradores ={listQntMoradores}
             resumeBarragemMorador={resumeBarragemMorador}
           />
         </Grid>
       )}

       
       
      </Grid>
    </div>
  );
};

const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);   
    /* eslint-disable-next-line */
  }, array)
}

export default Dashboard;
