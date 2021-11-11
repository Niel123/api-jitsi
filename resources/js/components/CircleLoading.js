import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 18
  },
  text: {
    color: '#919191',
    marginLeft: 5,
    fontSize: 12
  },
}));
export default function CircleLoading({loading_message}) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="row">
        <CircularProgress size={15} thickness={5} />
        <div className={`${classes.text} loading `}> {loading_message} </div>
      </Box>
    </div>
  );
}