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
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

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

const MoradorByBarragem = props => {
  const { className, resumeBarragemMorador, 
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
        title="Morador Por Barragem"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={6}
            md={6}
            xl={6}
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
            lg={6}
            md={6}
            xl={6}
            xs={12}
          >
            <List>
              {resumeBarragemMorador.map((resume, i)  => (
                <ListItem
                  divider
                  key={resume.idBarragem}
                >
                  <ListItemAvatar>
                    <PeopleIcon
                      className={classes.icon}
                      style={{ color:  listColor[i] }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Total de moradores: ${resume.totalMorador}`}
                    secondary={`Barragem: ${resume.nomeBarragem}`}
                  />                
                 
                </ListItem>
              ))}
            </List>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MoradorByBarragem.propTypes = {
  className: PropTypes.string
};

export default MoradorByBarragem;
