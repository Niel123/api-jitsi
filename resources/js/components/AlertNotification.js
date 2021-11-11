import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux
//https://github.com/goldenyz/react-perfect-scrollbar
const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertNotification = (props) => {
  const dispatch = useDispatch();
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);


  // React.useEffect(() => {
  //   if (snackPack.length && !messageInfo) {
  //     // Set a new snack when we don't have an active one
  //     setMessageInfo({ ...snackPack[0] });
  //     setSnackPack((prev) => prev.slice(1));
  //     setOpen(true);
  //   } else if (snackPack.length && messageInfo && open) {
  //     // Close an active snack when a new one is added
  //     setOpen(false);
  //   }
  // }, [snackPack, messageInfo, open]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    dispatch({ type: 'HIDE_NOTIFY' });
  };

  const isOpen = useSelector(state => state.notify.isOpen);
  const message = useSelector(state => state.notify.message);
  const color = useSelector(state => state.notify.color);
  
  const classes = useStyles();
  return (
    <React.Fragment>
      <Snackbar
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={color}>
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}


export default AlertNotification;