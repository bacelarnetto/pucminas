import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import WavesIcon from '@material-ui/icons/Waves';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  },
  icon: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


const AlertaBarragem =  props => {
  const { className, 
    resumeBarragemMoradorRiscoAlto, 
    listQntMoradores ,
    listBarragem ,
    listColor, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: listQntMoradores,
        backgroundColor: listColor,
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels:  listBarragem
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const colorStatus = id => {
    let color = ''
    if (id === 1 ){
      //Baixo
      color = '#107B2D'
    } else if (id === 2) {
      //Medio
      color = '#ff8000'
    } else {
      //Alto
      color = '#BA1717'
    } 
    return color
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Barragens com alto risco de rompimento"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={5}
            md={5}
            xl={5}
            xs={12}
          >
            <div className={classes.chartContainer}>
              <Doughnut
                data={data}
                options={options}
              />
            </div>
          </Grid>
          <Grid
            item
            lg={7}
            md={7}
            xl={7}
            xs={12}
          >
            <List>
              {resumeBarragemMoradorRiscoAlto.map((resume, i)  => (
                <ListItem
                  divider
                  key={resume.idBarragem}
                >
                  <ListItemAvatar>
                    <WavesIcon
                      className={classes.icon}
                      style={{ color:  listColor[i] }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Barragem: ${resume.nomeBarragem}`}
                    secondary={`Total de moradores: ${resume.totalMorador}`}
                  />   
                  <ListItemText >   
                    <Typography  variant="h6">
                      {'Dano potencial: '}
                    </Typography >
                    <Typography 
                      style={{color: colorStatus(resume.danoPotencialAssociado.codigo), textTransform: 'uppercase', fontWeight: 'bold'}}
                      variant="h5"
                    >
                      {resume.danoPotencialAssociado.descricao}
                    </Typography>
                 
                  </ListItemText>


                  <ListItemAvatar>
                    <ErrorIcon
                      className={classes.icon}
                      style={{ color:  '#B22222' }}
                    />
                  </ListItemAvatar> 
                </ListItem>
              ))}
            </List>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AlertaBarragem.propTypes = {
  className: PropTypes.string
};

export default AlertaBarragem;
