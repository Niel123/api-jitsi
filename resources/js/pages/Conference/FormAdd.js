import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircleLoading from '../../components/CircleLoading';
import Button from '@material-ui/core/Button';
import TextInput from "../../components/TextInput";
import { UniversalValidator } from "../../utils/helper";




function FormAdd({open, close, submit_form, is_submit, reset_form}) {
   
    const [state, setstate] = useState({
        room_name: "",
        nameError: "",

    });

    useEffect(() =>{
        if(reset_form){
            setstate({
                ...state,
                room_name: "",
                nameError: "",
            });
        }
    },[reset_form])

    const submitForm = async event => {
        event.preventDefault();

        const nameError = UniversalValidator({
            value: state.room_name,
            isValidate: true,
            errorMsg: "Conference name is required."
        });
        if (nameError) {
            setstate({
                ...state,
                nameError: nameError,
            });
            return;
        }

        let params = {
            room_name: state.room_name.replace(/\s/g, ''),
        };
        submit_form(params);
    };


    return (
        <React.Fragment>
            <Dialog
                open={open}
                maxWidth={'sm'}
                fullWidth={true}
                onClose={close}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">New Conference</DialogTitle>
                <DialogContent dividers>
                    {is_submit ? <><CircleLoading loading_message="Creating conference" /> </> : null}
                    <form noValidate onSubmit={submitForm}>
                        <TextInput
                            name="room_name"
                            value={state.name}
                            type={"text"}
                            label="Conference"
                            placeholder="e.g. RoomName, room-name"
                            helperText={""}
                            isError={state.nameError}
                            handleChange={event =>
                                setstate({
                                    ...state,
                                    room_name: event.target.value,
                                    nameError: ""
                                })
                            }
                        />
                        <em style={{
                            fontSize: 10,
                            color: 'red',
                        }}>*Spaces will be omitted</em>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={submitForm} color="primary" disabled={is_submit} >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export default FormAdd;
