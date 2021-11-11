import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircleLoading from './CircleLoading';

function Modal(props) {
    const [open, setOpen] = React.useState(false);
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        setOpen(props.open);
    }, [props]);

    const handleClose = () => {
        props.closeModal();
    }

    return (
        <div>
            <Dialog
                open={open}
                maxWidth={props.sm ? props.sm : 'sm'}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
                <DialogContent dividers>
                    {props.is_loading ? <><CircleLoading /> </>: null} 
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {props.cancel ? props.cancel : 'Cancel'}
                    </Button>
                    <Button  variant="contained"  onClick={props.handleSubmit} color="primary" disabled={props.is_loading} >
                         {props.ok ? props.ok : 'Ok'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export {
    Modal
}
