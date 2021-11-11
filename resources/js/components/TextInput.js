import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  nameText: {
    fontSize: 20
  },
}));

export default function TextInput(props) {
  const classes = useStyles();
  let custom_attr = {}
  if(props.isError){
    custom_attr = {...custom_attr,  error: true,  helperText: props.isError};
  }

  if(props.multiline){ 
    custom_attr = {...custom_attr, multiline: true, rows: props.rows};
  }

  

  

  //custom_attr = {...custom_attr, disabled: true};
  
  return (
    <React.Fragment>
      <TextField
        id="outlined-full-width"
        label={props.label}
        placeholder={props.placeholder}
        helperText={props.helperText}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        name={props.name}
        value={props.value}
        type={props.type}
        disabled={props.disabled}
        onChange={props.handleChange}
        inputProps={{
          maxLength: props.maxLength,
        }}
        {...custom_attr}
        multiline={props.multiline}
        rows={props.rows}
      />
    </React.Fragment>
  );
}

