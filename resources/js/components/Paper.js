import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';

export default function PaperComponent(props){
    return (
        <React.Fragment>
           <Paper elevation={1} >
               {props.children}
           </Paper>
        </React.Fragment>
    )
}
