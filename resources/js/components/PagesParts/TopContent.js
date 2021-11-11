import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonIcon } from '../Button';
import Search from './Search';

const useStyles = makeStyles((theme) => ({
  root: {
   // flexGrow: 1,
    padding: theme.spacing(4),
    //backgroundColor: '#fff',
   // boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TopContent(props) {

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={`${classes.root} app-page-title`}>
        <Grid container  spacing={0}  >
          <Grid item xs={12} lg={8} align="left"   >
            <h1>{props.title}</h1>
          </Grid>
          <Grid item xs={12} lg={4}  align="right"  >
            <ButtonIcon variant="contained" color="primary" title={props.btn} icon="add" data="data" action={(data) => props.newCustomer(data)} />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}
