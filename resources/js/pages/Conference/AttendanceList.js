import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListComponent from "./ListComponent"



export default function AttendanceList({open, attenadance, handleClose}) {  
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Attendees({attenadance.length})</DialogTitle>
        <DialogContent>
            {attenadance.map((obj,i) => 
            <div key={i}  >
                <ListComponent  obj={obj} name={obj.name}  date={obj.last_attendance} />
            </div>
            )}
            {attenadance.length == 0 ? 'No Attendees!':''}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
