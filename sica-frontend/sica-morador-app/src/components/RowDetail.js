import React from 'react';
import {
  Typography,
  Divider,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  labelDetail:{
    fontWeight: 'bold'
  }
}));

export default function RowDetail(props) {
  const { label, value, style } = props;
  const classes = useStyles();  
  return (
    <div>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          style={{textAlign:'right'}}
          xs={4}
        >
          <Typography
            className={classes.labelDetail}
            variant="body1"
          >
            {label}
          </Typography>
   
        </Grid>
        <Grid
          item
          xs={8}
        >
          <Typography
            className={classes.valueDetail}
            style={style}
            variant="body1"
          >
            {value}
          </Typography>
   
        </Grid>
      </Grid>
      <Divider />
      <br/>
    </div>
  )
}
