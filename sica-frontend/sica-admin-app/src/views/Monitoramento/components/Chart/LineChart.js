import React from 'react';
import {Line} from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
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

const LineChart = props => {
  const { className, 
    titleHeader,
    titleChart,
    label,
    labels, 
    primaryColor,
    secondaryColor,
    values,...rest } = props;

  const classes = useStyles();


  const data = {
    labels: labels,
    datasets: [
      {
        label: titleChart,
        fill: false,
        lineTension: 0.1,
        backgroundColor: secondaryColor,
        borderColor: primaryColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: primaryColor,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: primaryColor,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values
      }
    ]
  };



  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
       
        title={titleHeader}
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={12}
        >
          <Grid
            xs={12}
            style={{paddingLeft: '20px', paddingRight: '20px'}}
          >
            <div className={classes.chartContainer}>
       
               <Line data={data} />
            </div>
          </Grid>
        </Grid> 
      </CardContent>
    </Card>
  );
};

LineChart.propTypes = {
  className: PropTypes.string
};

export default LineChart;
